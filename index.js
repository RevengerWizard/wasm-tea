// Helpers                                                             */

async function get_contents(url)
{
	const response = await fetch(url);
	if(!response.ok) throw new Error("HTTP " + response.status);
	return response.text();
}

function set_editor_text(text)
{
	editor.setValue(text);
	editor.clearSelection();
}

// Service worker (COOP/COEP for SharedArrayBuffer)

const appScriptUrl = document.currentScript ? document.currentScript.src : location.href;

if ("serviceWorker" in navigator && location.protocol !== "file:")
{
	navigator.serviceWorker.addEventListener("controllerchange", function () {
		window.location.reload();
	}, { once: true });
	navigator.serviceWorker.register("sw.js").catch(function (error) {
		console.error("COOP/COEP service worker registration failed:", error);
	});
}

// Editor

ace.config.setModuleUrl("ace/mode/tea", "mode-tea.js");

const editor = ace.edit("editor", {
	theme: "ace/theme/monokai",
	maxLines: 30,
	minLines: 10,
	fontSize: "12px",
	wrap: true,
	tabSize: 4,
	useSoftTabs: false,
	autoScrollEditorIntoView: true
});

editor.session.setMode("ace/mode/tea");
editor.session.setUseWorker(false);
editor.renderer.setScrollMargin(10, 10);

const params = new URLSearchParams(window.location.search);
const githubPath = params.get("github");
const initialCode = params.get("code");

if(githubPath != null)
{
	get_contents(`https://cdn.jsdelivr.net/gh/${githubPath}`)
		.then(set_editor_text)
		.catch(function (error) {
			console.error("Could not load snippet from GitHub:", error);
		});
}
else if(initialCode != null)
{
	set_editor_text(initialCode);
}

// Terminal

const terminalElement = document.getElementById("terminal");
const terminal = new Terminal({
	convertEol: true,
	fontFamily: "monospace",
	fontSize: 14,
	scrollOnUserInput: true,
	scrollback: 3000,
	theme: { background: "#1e1e1e", foreground: "#d4d4d4" }
});
const fitAddon = new FitAddon.FitAddon();
terminal.loadAddon(fitAddon);
terminal.open(terminalElement);

function fit_terminal()
{
    try
    {
		fitAddon.fit();
    }
    catch (error)
    {
		// Container may be hidden or have zero size; ignore until it is visible.
	}
}

fit_terminal();
window.addEventListener("resize", fit_terminal);
if(typeof ResizeObserver !== "undefined")
{
	new ResizeObserver(fit_terminal).observe(terminalElement);
}

function write_output(text, error)
{
	terminal.write(error ? "\x1b[31m" + text + "\x1b[0m" : text);
}

// Worker / stdin handling

const encoder = new TextEncoder();

let worker = null;
let inputBuffer = null;
let inputControl = null;
let waitingForInput = false;
let running = false;
let inputLine = "";

// Bytes available for one stdin delivery (buffer minus the 8-byte header).
function input_capacity()
{
	return inputBuffer.byteLength - 8;
}

// Hand bytes to the worker blocked in fd_read. An empty array signals EOF.
function send_input(bytes)
{
	new Uint8Array(inputBuffer, 8).set(bytes);
	Atomics.store(inputControl, 1, bytes.length);
	Atomics.store(inputControl, 0, 1);
	Atomics.notify(inputControl, 0);
	waitingForInput = false;
	inputLine = "";
}

function submit_input()
{
	if(!waitingForInput) return;
	const bytes = encoder.encode(inputLine + "\n");
    if(bytes.length > input_capacity())
    {
		terminal.write("\x07");
		return;
	}
	terminal.write("\r\n");
	send_input(bytes);
}

function erase_last_char()
{
	if(inputLine.length === 0) return;
	const chars = Array.from(inputLine);
	chars.pop();
	inputLine = chars.join("");
	terminal.write("\b \b");
}

function append_char(char)
{
	const nextLine = inputLine + char;
	// Keep one byte free for the trailing newline.
    if(encoder.encode(nextLine).length + 1 > input_capacity())
    {
		terminal.write("\x07");
		return;
	}
	inputLine = nextLine;
	terminal.write(char);
}

terminal.onData(function(input) {
	if(!waitingForInput) return;
	// Ignore escape sequences (arrows, delete, ...); this is a simple line editor.
	if(input.includes("\u001b")) return;

    for(const char of input)
    {
		if(!waitingForInput) break; // input was submitted mid-paste

		if(char === "\r" || char === "\n") submit_input();
		else if(char === "\x7f" || char === "\b") erase_last_char();
		else if(char >= " ") append_char(char);
	}
});

function reset_run_state()
{
	waitingForInput = false;
	running = false;
	inputLine = "";
}

function kill_worker()
{
	if(worker) worker.terminate();
	worker = null;
}

async function start_worker()
{
    if(typeof SharedArrayBuffer === "undefined" || !crossOriginIsolated)
    {
		write_output("Terminal input requires SharedArrayBuffer. Serve this page with cross-origin isolation enabled.\n", true);
		return false;
	}

	const workerUrl = new URL("worker.js", appScriptUrl);

    try
    {
		const response = await fetch(workerUrl, { cache: "no-store" });
        if(!response.ok)
        {
			throw new Error("HTTP " + response.status + " while loading " + workerUrl.pathname);
		}
    }
    catch (error)
    {
		write_output("Could not load Teascript worker (" + workerUrl.href + "): " + (error.message || String(error)) + "\n", true);
		return false;
	}

    try
    {
		worker = new Worker(workerUrl);
    }
    catch (error)
    {
		write_output("Could not start Teascript worker: " + (error.message || String(error)) + "\n", true);
		return false;
	}

	worker.onmessage = function (event) {
		const message = event.data;
        switch (message.type)
        {
			case "out":
				write_output(message.text, message.error);
				break;
			case "stdin":
				waitingForInput = true;
				inputLine = "";
				terminal.focus();
				break;
			case "done":
				reset_run_state();
				if(message.status !== 0) write_output("Teascript returned error status " + message.status + "\n", true);
				else write_output("\n");
				break;
			case "trap":
				reset_run_state();
				write_output("Teascript trapped: " + message.message + "\n", true);
				kill_worker();
				break;
		}
	};

	worker.onerror = function (event) {
		reset_run_state();
		const detail = event.message || (event.error && event.error.message) || "Worker script could not be evaluated or loaded";
		const where = event.filename ? " (" + event.filename + ":" + event.lineno + ")" : "";
		write_output("Worker failed at " + workerUrl.href + ": " + detail + where + "\n", true);
		kill_worker();
	};

	worker.onmessageerror = function () {
		reset_run_state();
		write_output("Worker message could not be read by the page.\n", true);
		kill_worker();
	};

	return true;
}

// Actions (called from the page)

function clear_output()
{
	if(running) return;
	terminal.reset();
}

async function run_input()
{
	if(running) return;
	clear_output();

	running = true;
    if(!worker && !await start_worker())
    {
		running = false;
		return;
	}

	inputBuffer = new SharedArrayBuffer(8 + 65528);
	inputControl = new Int32Array(inputBuffer, 0, 2);
	worker.postMessage({ code: editor.getValue(), sab: inputBuffer });
}

function share()
{
	const arg = `?code=${encodeURIComponent(editor.getValue())}`;
	const link = `${location.protocol}//${location.host}${location.pathname}${arg}`;
	navigator.clipboard.writeText(link).then(function () {
		alert("Link to the snippet is in your clipboard now");
		window.history.pushState("", "", arg);
	}, function () {
		alert("Failed to copy the link to the clipboard");
	});
}