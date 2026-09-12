import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildAllTmsPluginZip, buildDebugKoPluginZip } from "./plugin.ts";
import { DEBUG_ITEMS, debugKoMap, debugMatch } from "./debug-catalog.ts";

function zipHas(buf: Uint8Array, needle: string) {
  return new TextDecoder().decode(buf).includes(needle);
}

describe("plugins", () => {
  it("packs All TMs plugin", () => {
    const zip = buildAllTmsPluginZip();
    assert.ok(zip.length > 100);
    assert.equal(zip[0], 0x50);
    assert.equal(zip[1], 0x4b);
    assert.equal(zipHas(zip, "Redforge All TMs"), true);
    assert.equal(zipHas(zip, "on_new_game"), true);
  });

  it("packs debug Korean search plugin", () => {
    const zip = buildDebugKoPluginZip();
    assert.ok(zip.length > 400);
    assert.equal(zipHas(zip, "Redforge Debug KO"), true);
    assert.equal(zipHas(zip, "필드 설정"), true);
    assert.equal(zipHas(zip, "포켓몬 추가"), true);
    assert.equal(zipHas(zip, "검색 (이름·번호·ID)"), true);
    assert.equal(zipHas(zip, "triggerex?(:F)"), true);
    assert.equal(zipHas(zip, "pbCommandsSortable"), true);
    assert.equal(zipHas(zip, "배틀러"), true);
    assert.equal(zipHas(zip, "검색..."), true);
    assert.equal(zipHas(zip, "redforge_search"), true);
    assert.equal(zipHas(zip, "pbListScreen"), true);
  });
});

describe("debug catalog", () => {
  it("translates core F9 commands", () => {
    const map = debugKoMap();
    assert.equal(map["Field options..."], "필드 설정...");
    assert.equal(map["Add Pokémon"], "포켓몬 추가");
    assert.equal(map["Warp to map"], "맵으로 이동");
    assert.ok(DEBUG_ITEMS.length > 80);
  });

  it("matches Korean, English, and compact query", () => {
    const item = DEBUG_ITEMS.find((x) => x.id === "add_pokemon");
    assert.ok(item);
    assert.equal(debugMatch(item!, "포켓몬"), true);
    assert.equal(debugMatch(item!, "add pokemon"), true);
    assert.equal(debugMatch(item!, "addpokemon"), true);
    const warp = DEBUG_ITEMS.find((x) => x.id === "warp");
    assert.ok(warp);
    assert.equal(debugMatch(warp!, "맵 이동"), true);
    assert.equal(debugMatch(item!, "스위치"), false);
  });
});
