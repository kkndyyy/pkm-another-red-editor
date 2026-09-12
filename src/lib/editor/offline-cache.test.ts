import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

describe("offline assets", () => {
  it("service worker precaches bundled data files and caches runtime urls", () => {
    const sw = readFileSync(new URL("../../../public/sw.js", import.meta.url), "utf8");
    for (const path of [
      "/data/species.dat",
      "/data/moves.dat",
      "/data/workspace.json",
      "/data/encounters.dat",
      "/redforge-offline.zip",
    ]) {
      assert.match(sw, new RegExp(path.replaceAll(".", "\\.")));
    }
    assert.match(sw, /cacheFirst/);
    assert.match(sw, /skipWaiting/);
    assert.match(sw, /CACHE_URLS/);
    assert.match(sw, /precacheDocument/);
    assert.match(sw, /redforge-offline-v2/);
  });
});
