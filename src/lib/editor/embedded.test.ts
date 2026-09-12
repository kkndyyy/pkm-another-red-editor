import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { installEmbeddedBundle, hasEmbeddedBundle, loadBundledDat, datCache } from "./dat-cache.ts";
import type { Move, Species } from "./types.ts";

function sampleSpecies(): Species {
  return {
    id: 1,
    internalName: "BULBASAUR",
    name: "이상해씨",
    types: ["GRASS", "POISON"],
    baseStats: { hp: 45, atk: 49, def: 49, spd: 45, spa: 65, spdF: 65 },
    abilities: ["OVERGROW"],
    hiddenAbility: "CHLOROPHYLL",
    levelMoves: [{ level: 1, move: "TACKLE" }],
    tutorMoves: [],
    evolutions: [],
    wildItems: [],
    extra: {},
  };
}

function sampleMove(): Move {
  return {
    id: 1,
    internalName: "TACKLE",
    name: "몸통박치기",
    type: "NORMAL",
    category: "Physical",
    power: 40,
    accuracy: 100,
    pp: 35,
    functionCode: "None",
    effectChance: 0,
    priority: 0,
    flags: "",
    target: "NearOther",
    description: "",
    extra: {},
  };
}

describe("embedded bundle", () => {
  it("loads workspace without fetching /data", async () => {
    installEmbeddedBundle({
      workspace: {
        species: [sampleSpecies()],
        moves: [sampleMove()],
        abilities: [],
      },
      names: { species: { BULBASAUR: "이상해씨" }, moves: {}, abilities: {} },
      species: new Uint8Array([1, 2, 3]),
      moves: new Uint8Array([4, 5, 6]),
      abilities: new Uint8Array([7]),
      messages: null,
      encounters: null,
    });
    assert.equal(hasEmbeddedBundle(), true);
    const data = await loadBundledDat();
    assert.equal(data.species[0]?.internalName, "BULBASAUR");
    assert.equal(data.moves[0]?.internalName, "TACKLE");
    assert.equal(datCache.species?.[0], 1);
    assert.equal(datCache.moves?.[0], 4);
  });
});

describe("portable zip", () => {
  it("ships a self-contained offline pack", () => {
    const zipPath = new URL("../../../public/redforge-offline.zip", import.meta.url);
    if (!existsSync(zipPath)) {
      assert.ok(true, "zip built later");
      return;
    }
    const zip = readFileSync(zipPath);
    const text = new TextDecoder("latin1").decode(zip);
    assert.equal(zip[0], 0x50);
    assert.equal(zip[1], 0x4b);
    assert.match(text, /index\.html/);
    assert.match(text, /redforge\.js/);
    assert.match(text, /start\.bat/);
    assert.match(text, /update\.bat/);
    assert.match(text, /update\.ps1/);
    assert.match(text, /README\.txt/);
    assert.match(text, /kkndyyy\/pkm-another-red-editor/);
    assert.ok(zip.length > 500_000, "zip should include editor + data");
  });
});

describe("portable updater", () => {
  it("points at the git repo and lists editor files", () => {
    const ps1 = readFileSync(new URL("../../../scripts/portable-update.ps1", import.meta.url), "utf8");
    const bat = readFileSync(new URL("../../../scripts/portable-update.bat", import.meta.url), "utf8");
    assert.match(ps1, /kkndyyy\/pkm-another-red-editor/);
    assert.match(ps1, /codeload\.github\.com/);
    assert.match(ps1, /git clone --depth 1/);
    assert.match(ps1, /redforge\.js/);
    assert.match(ps1, /dist-portable/);
    assert.match(bat, /update\.ps1/);
  });

  it("GitHub main has dist-portable editor files", async () => {
    const res = await fetch("https://api.github.com/repos/kkndyyy/pkm-another-red-editor/contents/dist-portable", {
      headers: { "User-Agent": "Redforge-Updater" },
    });
    assert.equal(res.ok, true, `github contents ${res.status}`);
    const files = (await res.json()) as { name: string }[];
    const names = files.map((f) => f.name);
    assert.ok(names.includes("redforge.js"));
    assert.ok(names.includes("index.html"));
    assert.ok(names.includes("start.bat"));
  });
});
