```js
// main.js
if ("serviceWorker" in navigator) {
  // Register service worker
  navigator.serviceWorker.register(new URL("./sw.js", import.meta.url)).then(
    function (registration) {
      console.log("COOP/COEP Service Worker registered", registration.scope);
      // If the registration is active, but it's not controlling the page
      if (registration.active && !navigator.serviceWorker.controller) {
          window.location.reload();
      }
    },
    function (err) {
      console.log("COOP/COEP Service Worker failed to register", err);
    }
  );
} else {
  console.warn("Cannot register a service worker");
}
```

```js
// sw.js
self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (event) {
  if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        // It seems like we only need to set the headers for index.html
        // If you want to be on the safe side, comment this out
        // if (!response.url.includes("index.html")) return response;

        const newHeaders = new Headers(response.headers);
        newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
        newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

        const moddedResponse = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        });

        return moddedResponse;
      })
      .catch(function (e) {
        console.error(e);
      })
  );
});
```