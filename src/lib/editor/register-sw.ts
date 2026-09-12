import { hasEmbeddedBundle } from "./dat-cache.ts";

const DATA_PATHS = [
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
];

function shouldCacheUrl(href: string): boolean {
  try {
    const u = new URL(href, window.location.origin);
    if (u.origin !== window.location.origin) return false;
    const p = u.pathname;
    if (p.startsWith("/@") || p.startsWith("/node_modules") || p.startsWith("/src/")) return false;
    if (p.startsWith("/api/") || p.startsWith("/auth/")) return false;
    return true;
  } catch {
    return false;
  }
}

function collectCacheUrls(): string[] {
  const urls = new Set<string>(DATA_PATHS.map((p) => new URL(p, window.location.origin).href));
  document.querySelectorAll("script[src], link[href]").forEach((el) => {
    const href = el.getAttribute("src") || el.getAttribute("href");
    if (!href) return;
    try {
      const abs = new URL(href, window.location.origin);
      if (shouldCacheUrl(abs.href)) urls.add(abs.href);
    } catch {
      /* skip */
    }
  });
  if (typeof performance !== "undefined") {
    for (const entry of performance.getEntriesByType("resource")) {
      if (shouldCacheUrl(entry.name)) urls.add(entry.name);
    }
  }
  return [...urls];
}

async function postCacheUrls(urls: string[]) {
  if (!("serviceWorker" in navigator)) return;
  try {
    const ready = await navigator.serviceWorker.ready;
    ready.active?.postMessage({ type: "CACHE_URLS", urls });
  } catch {
    /* 미리보기·권한 */
  }
}

export async function warmOfflineCache(): Promise<{ cached: number }> {
  let cached = 0;
  const urls = collectCacheUrls();
  if ("caches" in window) {
    try {
      const cache = await caches.open("redforge-offline-v2");
      await Promise.all(
        urls.map(async (u) => {
          try {
            const res = await fetch(u, { credentials: "same-origin" });
            if (res.ok) {
              await cache.put(u, res.clone());
              cached += 1;
            }
          } catch {
            /* 개별 실패 무시 */
          }
        }),
      );
    } catch {
      /* Cache API 없음 */
    }
  }
  await postCacheUrls(urls);
  if (typeof navigator.storage?.persist === "function") {
    void navigator.storage.persist();
  }
  return { cached };
}

export function registerOfflineWorker() {
  if (typeof window === "undefined") return;
  if (window.location.protocol === "file:") return;
  if (hasEmbeddedBundle()) return;
  if (!("serviceWorker" in navigator)) {
    void warmOfflineCache();
    return;
  }
  const host = window.location.hostname;
  const local = host === "localhost" || host === "127.0.0.1";

  const afterReady = () => {
    window.setTimeout(() => {
      void warmOfflineCache();
    }, 400);
  };

  if (local) {
    afterReady();
    return;
  }

  void navigator.serviceWorker
    .register("/sw.js", { updateViaCache: "none" })
    .then((reg) => {
      void reg.update();
      afterReady();
    })
    .catch(() => {
      afterReady();
    });
}
