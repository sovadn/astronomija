const CACHE = "astro-kviz-v13";
const ASSETS = [
  "./",
  "./index.html",
  "./questions.json",
  "./manifest.json",
  "./icon.svg",
  "./mobile-v9.css",
  "./mobile-v9.js",
  "./mobile-v13.css"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    await Promise.all(clients.map(client => client.navigate(client.url).catch(() => null)));
  })());
});

function injectMobileAssets(html) {
  html = html.replace(/<link rel="stylesheet" href="mobile-v13\.css\?v=\d+">/g, "");

  if (!html.includes("mobile-v9.css")) {
    html = html.replace("</head>", '<link rel="stylesheet" href="mobile-v9.css?v=13"></head>');
  }
  if (!html.includes("mobile-v13.css")) {
    html = html.replace("</head>", '<link rel="stylesheet" href="mobile-v13.css?v=13"></head>');
  }
  if (!html.includes("mobile-v9.js")) {
    html = html.replace("</body>", '<script src="mobile-v9.js?v=13"></script></body>');
  }
  return html;
}

async function navigationResponse(request) {
  let response;
  try {
    response = await fetch(request, { cache: "no-store" });
  } catch (_) {
    response = await caches.match("./index.html") || await caches.match("./");
  }
  if (!response) return new Response("Aplikacija trenutačno nije dostupna.", { status: 503 });

  const html = injectMobileAssets(await response.text());
  const headers = new Headers(response.headers);
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("cache-control", "no-store");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
}

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.mode === "navigate" || url.pathname.endsWith("/index.html")) {
    event.respondWith(navigationResponse(request));
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (request.method === "GET" && response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
