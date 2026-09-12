import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildSampleEncounters, dumpEncountersDat, encountersFromDat, patchEncountersDat } from "./encounters.ts";

describe("encounters dat", () => {
  it("parses Another Red 4-tuple encounters.dat", () => {
    const raw = new Uint8Array(readFileSync("public/data/encounters.dat"));
    const areas = encountersFromDat(raw);
    assert.equal(areas.length, 118);
    const route1 = areas.find((a) => a.mapId === 10);
    assert.ok(route1);
    assert.equal(route1!.label, "1번도로");
    const last = route1!.slots.Land?.at(-1);
    assert.equal(last?.species, "EEVEE");
    assert.equal(last?.chance, 2);
    assert.equal(last?.min, 3);
    const route2 = areas.find((a) => a.mapId === 11);
    assert.equal(route2?.label, "2번도로");
    assert.ok(route2?.slots.Land?.some((s) => s.species === "MUNCHLAX" && s.chance === 2));
    const cave = areas.find((a) => a.mapId === 14);
    assert.equal(cave?.label, "디그다의 굴");
    assert.ok(cave?.slots.Cave?.some((s) => s.species === "LARVITAR"));
    for (const area of areas) {
      assert.equal(area.label.startsWith("맵 "), false, `map ${area.mapId} unlabeled`);
      for (const rows of Object.values(area.slots)) {
        for (const slot of rows) {
          assert.ok(slot.species && /[A-Za-z]/.test(slot.species), slot.species);
          assert.ok(slot.chance != null && slot.chance > 0);
        }
      }
    }
    last!.min = 9;
    const patched = patchEncountersDat(raw, areas);
    const again = encountersFromDat(patched);
    const againLast = again.find((a) => a.mapId === 10)?.slots.Land?.at(-1);
    assert.equal(againLast?.min, 9);
    assert.equal(againLast?.species, "EEVEE");
    assert.equal(againLast?.chance, 2);
  });

  it("roundtrips sample routes with Korean labels and chances", () => {
    const areas = buildSampleEncounters();
    const bytes = dumpEncountersDat(areas);
    const loaded = encountersFromDat(bytes);
    assert.equal(loaded.length, areas.length);
    const r1 = loaded.find((a) => a.mapId === 10);
    assert.ok(r1);
    assert.equal(r1!.label, "1번도로");
    assert.equal(r1!.slots.Land?.[0]?.species, "PIDGEY");
    assert.equal(r1!.slots.Land?.[0]?.chance, 20);
    r1!.slots.Land![0]!.min = 9;
    const patched = patchEncountersDat(bytes, loaded);
    const again = encountersFromDat(patched);
    assert.equal(again.find((a) => a.mapId === 10)?.slots.Land?.[0]?.min, 9);
  });
});
