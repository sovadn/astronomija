const CACHE = "astro-kviz-v16";
const ASSETS = [
  "./",
  "./index.html",
  "./questions.json",
  "./manifest.json",
  "./icon.svg",
  "./mobile-v9.css",
  "./mobile-v9.js",
  "./mobile-v13.css",
  "./mobile-v14.css",
  "./mobile-v15.css",
  "./mobile-v15.js",
  "./mobile-v15-fix.js",
  "./mobile-v16.css"
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

const ASSET_VERSION = "16";

function injectMobileAssets(html) {
  if (!html.includes("mobile-v9.css")) {
    html = html.replace("</head>", `<link rel="stylesheet" href="mobile-v9.css?v=${ASSET_VERSION}"></head>`);
  }
  if (!html.includes("mobile-v13.css")) {
    html = html.replace("</head>", `<link rel="stylesheet" href="mobile-v13.css?v=${ASSET_VERSION}"></head>`);
  }
  if (!html.includes("mobile-v14.css")) {
    html = html.replace("</head>", `<link rel="stylesheet" href="mobile-v14.css?v=${ASSET_VERSION}"></head>`);
  }
  if (!html.includes("mobile-v15.css")) {
    html = html.replace("</head>", `<link rel="stylesheet" href="mobile-v15.css?v=${ASSET_VERSION}"></head>`);
  }
  if (!html.includes("mobile-v16.css")) {
    html = html.replace("</head>", `<link rel="stylesheet" href="mobile-v16.css?v=${ASSET_VERSION}"></head>`);
  }
  if (!html.includes("mobile-v9.js")) {
    html = html.replace("</body>", `<script src="mobile-v9.js?v=${ASSET_VERSION}"></script></body>`);
  }
  if (!html.includes("mobile-v15.js")) {
    html = html.replace("</body>", `<script src="mobile-v15.js?v=${ASSET_VERSION}"></script></body>`);
  }
  if (!html.includes("mobile-v15-fix.js")) {
    html = html.replace("</body>", `<script src="mobile-v15-fix.js?v=${ASSET_VERSION}"></script></body>`);
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

  // Verzionirani asseti (mobile-*.css/js s ?v=…) mijenjaju se između izdanja,
  // pa idu "network-first": uvijek pokušaj dohvatiti svježu datoteku, a
  // ako nema mreže, posluži spremljenu. Tako nova izdanja stvarno stignu
  // do uređaja bez ručnog brisanja predmemorije.
  const isVersionedAsset = /mobile-v\d+.*\.(css|js)$/.test(url.pathname);

  if (isVersionedAsset) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request, { cache: "no-store" });
        if (request.method === "GET" && fresh.ok) {
          const copy = fresh.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return fresh;
      } catch (_) {
        const cached = await caches.match(request, { ignoreSearch: true });
        return cached || new Response("", { status: 504 });
      }
    })());
    return;
  }

  // Ostali asseti (slike, ikona, questions.json): "cache-first" za brzinu.
  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then(cached => cached || fetch(request).then(response => {
      if (request.method === "GET" && response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
