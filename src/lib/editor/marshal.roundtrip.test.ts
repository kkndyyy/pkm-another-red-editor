import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { marshalDump, marshalLoad, isHash, isObject } from "./marshal.ts";
import { movesFromDat, patchMovesDat, patchSpeciesDat, speciesFromDat } from "./gamedata.ts";

const names = { species: {}, moves: {}, abilities: {} };

describe("essentials dat marshal", () => {
  it("roundtrips moves.dat bytes", () => {
    const raw = new Uint8Array(readFileSync("public/data/moves.dat"));
    const loaded = marshalLoad(raw);
    const out = marshalDump(loaded);
    assert.equal(out.length, raw.length);
    assert.deepEqual(Array.from(out.subarray(0, 64)), Array.from(raw.subarray(0, 64)));
    assert.equal(Buffer.from(out).equals(Buffer.from(raw)), true);
  });

  it("roundtrips species.dat bytes", () => {
    const raw = new Uint8Array(readFileSync("public/data/species.dat"));
    const loaded = marshalLoad(raw);
    assert.ok(isHash(loaded));
    const first = loaded.entries[0]?.[1];
    assert.ok(isObject(first));
    assert.match(first.className, /Species/);
    const out = marshalDump(loaded);
    assert.equal(out.length, raw.length);
    assert.equal(Buffer.from(out).equals(Buffer.from(raw)), true);
  });

  it("patches move power and reloads", () => {
    const raw = new Uint8Array(readFileSync("public/data/moves.dat"));
    const moves = movesFromDat(raw, names);
    const mega = moves.find((m) => m.internalName === "MEGAHORN");
    assert.ok(mega);
    assert.equal(mega!.power, 120);
    mega!.power = 150;
    const patched = patchMovesDat(raw, moves);
    const again = movesFromDat(patched, names);
    assert.equal(again.find((m) => m.internalName === "MEGAHORN")?.power, 150);
  });

  it("patches species stats and level moves", () => {
    const raw = new Uint8Array(readFileSync("public/data/species.dat"));
    const species = speciesFromDat(raw, names);
    const sprig = species.find((s) => s.internalName === "SPRIGATITO");
    assert.ok(sprig);
    assert.equal(sprig!.name, "Sprigatito");
    sprig!.baseStats.hp = 99;
    sprig!.levelMoves[0]!.level = 5;
    const patched = patchSpeciesDat(raw, species);
    const again = speciesFromDat(patched, names);
    const s2 = again.find((s) => s.internalName === "SPRIGATITO")!;
    assert.equal(s2.baseStats.hp, 99);
    assert.equal(s2.levelMoves[0]?.level, 5);
  });

  it("parses and patches tutor moves", () => {
    const raw = new Uint8Array(readFileSync("public/data/species.dat"));
    const species = speciesFromDat(raw, names);
    const sprig = species.find((s) => s.internalName === "SPRIGATITO")!;
    assert.ok(sprig.tutorMoves.includes("ENERGYBALL"));
    assert.ok(sprig.tutorMoves.length > 10);
    sprig.tutorMoves = [...sprig.tutorMoves, "HYPERBEAM"];
    const patched = patchSpeciesDat(raw, species);
    const again = speciesFromDat(patched, names);
    const s2 = again.find((s) => s.internalName === "SPRIGATITO")!;
    assert.ok(s2.tutorMoves.includes("HYPERBEAM"));
    assert.ok(s2.tutorMoves.includes("ENERGYBALL"));
  });

  it("parses wild hold items and chances", () => {
    const raw = new Uint8Array(readFileSync("public/data/species.dat"));
    const species = speciesFromDat(raw, names);
    const pika = species.find((s) => s.internalName === "PIKACHU")!;
    assert.deepEqual(pika.wildItems, [{ item: "LIGHTBALL", chance: 5 }]);
    const chansey = species.find((s) => s.internalName === "CHANSEY")!;
    assert.deepEqual(chansey.wildItems, [{ item: "LUCKYPUNCH", chance: 50 }]);
    const snorlax = species.find((s) => s.internalName === "SNORLAX")!;
    assert.deepEqual(snorlax.wildItems, [{ item: "LEFTOVERS", chance: 100 }]);
    const staryu = species.find((s) => s.internalName === "STARYU")!;
    assert.deepEqual(staryu.wildItems, [
      { item: "STARDUST", chance: 50 },
      { item: "STARPIECE", chance: 5 },
    ]);
  });

  it("patches wild hold items", () => {
    const raw = new Uint8Array(readFileSync("public/data/species.dat"));
    const species = speciesFromDat(raw, names);
    const pika = species.find((s) => s.internalName === "PIKACHU")!;
    pika.wildItems = [
      { item: "LIGHTBALL", chance: 50 },
      { item: "ORANBERRY", chance: 5 },
    ];
    const patched = patchSpeciesDat(raw, species);
    const again = speciesFromDat(patched, names);
    const s2 = again.find((s) => s.internalName === "PIKACHU")!;
    assert.deepEqual(s2.wildItems, [
      { item: "LIGHTBALL", chance: 50 },
      { item: "ORANBERRY", chance: 5 },
    ]);
    const snorlax = species.find((s) => s.internalName === "SNORLAX")!;
    snorlax.wildItems = [{ item: "LEFTOVERS", chance: 5 }];
    const patched2 = patchSpeciesDat(patched, species);
    const again2 = speciesFromDat(patched2, names);
    assert.deepEqual(again2.find((s) => s.internalName === "SNORLAX")?.wildItems, [
      { item: "LEFTOVERS", chance: 5 },
    ]);
  });
});
