/* 레드포지 오프라인 — 한 번 열면 인터넷 없이 에디터 실행 */
const CACHE = "redforge-offline-v2";
const PRECACHE = [
  "/",
  "/favicon.svg",
  "/data/species.dat",
  "/data/moves.dat",
  "/data/abilities.dat",
  "/data/encounters.dat",
  "/data/messages_kor_core.dat",
  "/data/names-ko.json",
  "/data/workspace.json",
  "/redforge-offline.zip",
  "/__grok/icon-180.png",
  "/__grok/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await Promise.all(PRECACHE.map((url) => cache.add(url).catch(() => {})));
      await precacheDocument(cache);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.type !== "CACHE_URLS" || !Array.isArray(data.urls)) return;
  event.waitUntil(cacheUrlList(data.urls));
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (!sameOrigin(req.url)) return;
  if (isApi(req.url) || isDev(req.url)) return;

  if (isDataPath(req.url) || isStaticAsset(req.url)) {
    event.respondWith(cacheFirst(req));
    return;
  }

  if (req.mode === "navigate" || req.destination === "document") {
    event.respondWith(networkThenCache(req, "/"));
    return;
  }

  event.respondWith(staleWhileRevalidate(req));
});

function sameOrigin(url) {
  try {
    return new URL(url).origin === self.location.origin;
  } catch {
    return false;
  }
}

function isDataPath(url) {
  return new URL(url).pathname.startsWith("/data/");
}

function isApi(url) {
  const p = new URL(url).pathname;
  return p.startsWith("/api/") || p.startsWith("/auth/");
}

function isDev(url) {
  const p = new URL(url).pathname;
  return p.startsWith("/@") || p.startsWith("/node_modules") || p.includes("@vite");
}

function isStaticAsset(url) {
  const p = new URL(url).pathname;
  return (
    p.startsWith("/assets/") ||
    p.startsWith("/__grok/") ||
    p === "/redforge-offline.zip" ||
    /\.(js|css|dat|json|svg|png|woff2?|ico|webmanifest|zip)$/i.test(p)
  );
}

async function precacheDocument(cache) {
  try {
    const res = await fetch("/", { credentials: "same-origin" });
    if (!res.ok) return;
    await cache.put("/", res.clone());
    const html = await res.text();
    const found = new Set();
    for (const m of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
      const raw = m[1];
      if (!raw || raw.startsWith("data:") || raw.startsWith("mailto:")) continue;
      try {
        const abs = new URL(raw, self.location.origin);
        if (abs.origin !== self.location.origin) continue;
        if (isApi(abs.href) || isDev(abs.href)) continue;
        found.add(abs.pathname + abs.search);
      } catch {
        /* skip */
      }
    }
    await Promise.all([...found].map((u) => cache.add(u).catch(() => {})));
  } catch {
    /* 설치 시점 네트워크 없음 */
  }
}

async function cacheUrlList(urls) {
  const cache = await caches.open(CACHE);
  await Promise.all(
    urls.map((u) => {
      try {
        const abs = new URL(u, self.location.origin);
        if (abs.origin !== self.location.origin) return;
        if (isApi(abs.href) || isDev(abs.href)) return;
        return cache.add(abs.href).catch(() => {});
      } catch {
        return;
      }
    }),
  );
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req, { ignoreSearch: true });
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    if (hit) return hit;
    throw err;
  }
}

async function networkThenCache(req, fallbackPath) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    const hit =
      (await cache.match(req, { ignoreSearch: true })) || (await cache.match(fallbackPath));
    if (hit) return hit;
    return new Response("오프라인입니다. 파일 탭에서 오프라인 에디터 zip을 받아 두세요.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req, { ignoreSearch: true });
  const fetchPromise = fetch(req)
    .then((res) => {
      if (res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => hit);
  return hit || fetchPromise;
}
