function get_contents(url, callback)
{
	var request = new XMLHttpRequest();

	request.open('GET', url, true);
	request.send(null);

	request.onreadystatechange = function() {
		if(request.readyState === 4 && request.status === 200)
		{
			var type = request.getResponseHeader('Content-Type');
			if(type.indexOf("text") !== 1)
			{
				callback(request.responseText);
			}
		}
	}
}

ace.config.setModuleUrl("ace/mode/tea", "mode-tea.js");
var appScriptUrl = document.currentScript ? document.currentScript.src : location.href;

if ("serviceWorker" in navigator && location.protocol !== "file:") {
	navigator.serviceWorker.addEventListener("controllerchange", function() {
		window.location.reload();
	}, { once: true });
	navigator.serviceWorker.register("sw.js").catch(function(error) {
		console.error("COOP/COEP service worker registration failed:", error);
	});
}

var editor = ace.edit("editor", {
	theme: "ace/theme/monokai",
	maxLines: 30,
	minLines: 10,
	fontSize: "12px",
	wrap: true,
	tabSize: 4,
	useSoftTabs: false,
	autoScrollEditorIntoView: true
});

var params = new URLSearchParams(window.location.search);
var file = params.get("github");

if(file != null)
{
	get_contents(`https://cdn.jsdelivr.net/gh/${file}`, function(content) {
		editor.setValue(content);
		editor.clearSelection();
	});
}
else
{
	var code = params.get("code");

	if(code != null)
	{
		editor.setValue(code);
		editor.clearSelection();
	}
}

editor.session.setMode("ace/mode/tea");
editor.session.setUseWorker(false);
editor.renderer.setScrollMargin(10, 10);

var worker;
var inputBuffer;
var inputControl;
var waitingForInput = false;
var running = false;

function write_output(text, error) {
	const output = document.getElementById("output");
	if (error) {
		const span = document.createElement("span");
		span.className = "error";
		span.textContent = text;
		output.appendChild(span);
	} else {
		output.insertBefore(document.createTextNode(text), document.getElementById("output-input"));
	}
}

function show_terminal_input() {
	const output = document.getElementById("output");
	const line = document.createElement("span");
	line.id = "output-input";
	line.contentEditable = "true";
	line.setAttribute("role", "textbox");
	line.setAttribute("aria-label", "Terminal input");
	line.setAttribute("spellcheck", "false");
	output.appendChild(line);
	line.focus();
}

function remove_terminal_input() {
	const line = document.getElementById("output-input");
	if (line) line.remove();
}

async function start_worker() {
	if (typeof SharedArrayBuffer === "undefined" || !crossOriginIsolated) {
		write_output("Terminal input requires SharedArrayBuffer. Serve this page with cross-origin isolation enabled.\n", true);
		return false;
	}
	const workerUrl = new URL("worker.js", appScriptUrl);
	try {
		const response = await fetch(workerUrl, { cache: "no-store" });
		if (!response.ok) {
			throw new Error("HTTP " + response.status + " while loading " + workerUrl.pathname);
		}
	} catch (error) {
		write_output("Could not load Teascript worker (" + workerUrl.href + "): " + (error.message || String(error)) + "\n", true);
		return false;
	}
	try {
		worker = new Worker(workerUrl);
	} catch (error) {
		write_output("Could not start Teascript worker: " + (error.message || String(error)) + "\n", true);
		return false;
	}
	worker.onmessage = function(event) {
		const message = event.data;
		if (message.type === "out") write_output(message.text, message.error);
		else if (message.type === "stdin") {
			waitingForInput = true;
			show_terminal_input();
		}
		else if (message.type === "done") {
			remove_terminal_input();
			running = false;
			if (message.status !== 0) write_output("Teascript returned error status " + message.status + "\n", true);
			else write_output("\n");
			worker.terminate();
			worker = null;
		}
		else if (message.type === "trap") {
			remove_terminal_input();
			running = false;
			write_output("Teascript trapped: " + message.message + "\n", true);
			worker.terminate();
			worker = null;
		}
	};
	worker.onerror = function(event) {
		remove_terminal_input();
		running = false;
		const detail = event.message || (event.error && event.error.message) || "Worker script could not be evaluated or loaded";
		const location = event.filename ? " (" + event.filename + ":" + event.lineno + ")" : "";
		write_output("Worker failed at " + workerUrl.href + ": " + detail + location + "\n", true);
		worker.terminate();
		worker = null;
	};
	worker.onmessageerror = function() {
		remove_terminal_input();
		running = false;
		write_output("Worker message could not be read by the page.\n", true);
		worker.terminate();
		worker = null;
	};
	return true;
}

function submit_input() {
	if (!waitingForInput) return;
	const line = document.getElementById("output-input");
	if (!line) return;
	const value = line.textContent.replace(/[\r\n]/g, "");
	const bytes = new TextEncoder().encode(value + "\n");
	if (bytes.length > inputBuffer.byteLength - 8) {
		write_output("Input line is too long.\n", true);
		return;
	}
	new Uint8Array(inputBuffer, 8).set(bytes);
	line.replaceWith(document.createTextNode(value + "\n"));
	Atomics.store(inputControl, 1, bytes.length);
	Atomics.store(inputControl, 0, 1);
	Atomics.notify(inputControl, 0);
	waitingForInput = false;
}

document.getElementById("output").addEventListener("keydown", function(event) {
	if (event.key === "Enter" && event.target.id === "output-input") {
		event.preventDefault();
		submit_input();
	}
});

function clear_output()
{
	if (waitingForInput) return;
	document.getElementById("output").innerHTML = "";
}

async function run_input()
{
	if (running) return;
	clear_output();
	if (!worker) {
		running = true;
		if (!await start_worker()) {
			running = false;
			return;
		}
	}
	inputBuffer = new SharedArrayBuffer(8 + 65528);
	inputControl = new Int32Array(inputBuffer, 0, 2);
	running = true;
	worker.postMessage({ code: editor.getValue(), sab: inputBuffer });
}

function share()
{
	var arg = `?code=${encodeURIComponent(editor.getValue())}`;
	var clipboard = `${location.protocol + '//' + location.host + location.pathname}${arg}`;
	navigator.clipboard.writeText(clipboard).then(function() {
		alert("Link to the snippet is in your clipboard now");
		window.history.pushState("", "", arg);
	}, function() {
		alert("Failed to copy the link to the clipboard");
	});
}
