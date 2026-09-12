import type { EncounterArea, EncounterSlot } from "./types.ts";
import { mapDisplayName } from "./map-names.ts";
import {
  RArray,
  RHash,
  RObject,
  RSymbol,
  asNumber,
  isArray,
  isHash,
  isObject,
  ivar,
  marshalDump,
  marshalLoad,
  rsym,
  setIvar,
  symName,
  type RValue,
} from "./marshal.ts";

export function encounterKey(mapId: number, version: number) {
  return `${mapId}:${version}`;
}

export function newEncounterSlot(species: string, existing: EncounterSlot[], min = 5, max = 10): EncounterSlot {
  const used = existing.reduce((sum, row) => sum + (row.chance ?? 0), 0);
  const leftover = 100 - used;
  return {
    species,
    min,
    max,
    chance: leftover > 0 ? leftover : 1,
  };
}

function slotFromRow(row: RValue): EncounterSlot | null {
  if (!isArray(row) || row.items.length < 1) return null;
  const a = row.items;
  const firstSym = a[0] instanceof RSymbol ? a[0].name : symName(a[0]);
  const secondSym = a[1] instanceof RSymbol ? a[1].name : a.length > 1 ? symName(a[1]) : "";
  // Another Red / PBS compiled: [chance, species, min, max]
  if (typeof a[0] === "number" && secondSym) {
    return {
      chance: asNumber(a[0]),
      species: secondSym,
      min: asNumber(a[2]) || 1,
      max: asNumber(a[3]) || asNumber(a[2]) || 1,
    };
  }
  // Essentials v20 compiled: [species, min, max]
  const species = firstSym || secondSym;
  if (!species) return null;
  return {
    species,
    min: asNumber(a[1]) || 1,
    max: asNumber(a[2]) || asNumber(a[1]) || 1,
  };
}

function parseId(key: RValue, obj: RObject): { mapId: number; version: number } {
  const id = ivar(obj, "@id");
  if (isArray(id) && id.items.length >= 1) {
    return { mapId: asNumber(id.items[0]), version: asNumber(id.items[1]) || 0 };
  }
  if (id instanceof RSymbol) {
    const m = id.name.match(/^(\d+)_(\d+)$/);
    if (m) return { mapId: Number(m[1]), version: Number(m[2]) || 0 };
  }
  if (key instanceof RSymbol) {
    const m = key.name.match(/^(\d+)_(\d+)$/);
    if (m) return { mapId: Number(m[1]), version: Number(m[2]) || 0 };
  }
  if (isArray(key) && key.items.length >= 1) {
    return { mapId: asNumber(key.items[0]), version: asNumber(key.items[1]) || 0 };
  }
  const map = asNumber(ivar(obj, "@map")) || asNumber(key);
  return { mapId: map, version: asNumber(ivar(obj, "@version")) || 0 };
}

export function encountersFromDat(bytes: Uint8Array): EncounterArea[] {
  const root = marshalLoad(bytes);
  if (!isHash(root)) throw new Error("encounters.dat 형식이 아닙니다.");
  const out: EncounterArea[] = [];
  for (const [key, val] of root.entries) {
    if (!isObject(val)) continue;
    const { mapId, version } = parseId(key, val);
    const chancesRaw = ivar(val, "@step_chances");
    const stepChances: Record<string, number> = {};
    if (isHash(chancesRaw)) {
      for (const [k, v] of chancesRaw.entries) stepChances[symName(k) || String(asNumber(k))] = asNumber(v);
    }
    const typesRaw = ivar(val, "@types");
    const slots: Record<string, EncounterSlot[]> = {};
    if (isHash(typesRaw)) {
      for (const [k, v] of typesRaw.entries) {
        const t = symName(k);
        if (!t || !isArray(v)) continue;
        slots[t] = v.items.map(slotFromRow).filter((s): s is EncounterSlot => !!s);
      }
    }
    out.push({
      key: encounterKey(mapId, version),
      mapId,
      version,
      label: mapDisplayName(mapId, version),
      stepChances,
      slots,
    });
  }
  out.sort((a, b) => a.mapId - b.mapId || a.version - b.version);
  return out;
}

function usesChance(slots: Record<string, EncounterSlot[]>): boolean {
  return Object.values(slots).some((rows) => rows.some((s) => s.chance != null));
}

function slotsValue(slots: EncounterSlot[], withChance: boolean): RValue {
  return new RArray(
    slots.map((s) =>
      withChance
        ? new RArray([s.chance ?? 0, rsym(s.species), s.min, s.max])
        : new RArray([rsym(s.species), s.min, s.max]),
    ),
  );
}

function chancesHash(chances: Record<string, number>): RHash {
  return new RHash(Object.entries(chances).filter(([, n]) => n > 0).map(([k, v]) => [rsym(k), v]));
}

function typesHash(slots: Record<string, EncounterSlot[]>, withChance: boolean): RHash {
  return new RHash(
    Object.entries(slots)
      .filter(([, rows]) => rows.length)
      .map(([k, rows]) => [rsym(k), slotsValue(rows, withChance)]),
  );
}

function makeObject(area: EncounterArea): RObject {
  const withChance = usesChance(area.slots);
  return new RObject("GameData::Encounter", [
    ["@id", rsym(`${area.mapId}_${area.version}`)],
    ["@map", area.mapId],
    ["@version", area.version],
    ["@step_chances", chancesHash(area.stepChances)],
    ["@types", typesHash(area.slots, withChance)],
  ]);
}

function hashKey(area: EncounterArea): RValue {
  return rsym(`${area.mapId}_${area.version}`);
}

export function dumpEncountersDat(areas: EncounterArea[]): Uint8Array {
  const root = new RHash(areas.map((a) => [hashKey(a), makeObject(a)] as [RValue, RValue]));
  return marshalDump(root);
}

export function patchEncountersDat(original: Uint8Array | null, areas: EncounterArea[]): Uint8Array {
  if (!original) return dumpEncountersDat(areas);
  try {
    const root = marshalLoad(original);
    if (!isHash(root)) return dumpEncountersDat(areas);
    const byKey = new Map(areas.map((a) => [a.key, a]));
    const seen = new Set<string>();
    const next: [RValue, RValue][] = [];
    for (const [key, val] of root.entries) {
      if (!isObject(val)) {
        next.push([key, val]);
        continue;
      }
      const { mapId, version } = parseId(key, val);
      const k = encounterKey(mapId, version);
      const area = byKey.get(k);
      if (!area) continue;
      seen.add(k);
      const withChance = usesChance(area.slots);
      setIvar(val, "@step_chances", chancesHash(area.stepChances));
      setIvar(val, "@types", typesHash(area.slots, withChance));
      next.push([key, val]);
    }
    for (const area of areas) {
      if (seen.has(area.key)) continue;
      next.push([hashKey(area), makeObject(area)]);
    }
    return marshalDump(new RHash(next));
  } catch {
    return dumpEncountersDat(areas);
  }
}

export function buildSampleEncounters(): EncounterArea[] {
  const land = (rows: [string, number, number, number?][]): EncounterSlot[] =>
    rows.map(([species, min, max, chance]) => ({ species, min, max, ...(chance != null ? { chance } : {}) }));
  const route = (
    mapId: number,
    label: string,
    chance: number,
    rows: [string, number, number, number?][],
    extra?: Partial<EncounterArea>,
  ): EncounterArea => ({
    key: encounterKey(mapId, 0),
    mapId,
    version: 0,
    label,
    stepChances: { Land: chance, ...(extra?.stepChances || {}) },
    slots: { Land: land(rows), ...(extra?.slots || {}) },
  });
  return [
    route(10, "1번도로", 25, [
      ["PIDGEY", 2, 5, 20],
      ["RATTATA", 2, 5, 20],
      ["CATERPIE", 3, 4, 10],
      ["WEEDLE", 3, 4, 10],
      ["SPRIGATITO", 4, 5, 2],
    ]),
    route(11, "2번도로", 25, [
      ["PIDGEY", 3, 6, 20],
      ["RATTATA", 3, 6, 20],
      ["ODDISH", 4, 6, 10],
      ["NIDORANfE", 4, 5, 10],
      ["NIDORANmA", 4, 5, 10],
    ]),
  ];
}
