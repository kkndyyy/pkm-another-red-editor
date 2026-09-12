import type { Ability, Move, MoveCategory, Species } from "./types.ts";
import {
  RArray,
  RHash,
  RObject,
  RString,
  RSymbol,
  asNumber,
  asString,
  hashGet,
  hashSet,
  isArray,
  isHash,
  isObject,
  ivar,
  marshalDump,
  marshalLoad,
  rstr,
  rsym,
  setIvar,
  symName,
  type RValue,
} from "./marshal.ts";
import { wildItemsFromBuckets, wildItemsToBuckets } from "./wild-items.ts";

const STAT_KEYS = ["HP", "ATTACK", "DEFENSE", "SPEED", "SPECIAL_ATTACK", "SPECIAL_DEFENSE"] as const;
const CAT: MoveCategory[] = ["Physical", "Special", "Status"];

export interface NameMaps {
  species: Record<string, string>;
  moves: Record<string, string>;
  abilities: Record<string, string>;
  forms?: Record<string, string>;
}

export interface DatBundle {
  speciesBytes: Uint8Array;
  movesBytes: Uint8Array;
  abilitiesBytes?: Uint8Array;
  messagesBytes?: Uint8Array;
  names?: NameMaps;
}

const LEVELISH = /^(Level|LevelMale|LevelFemale|LevelDay|LevelNight|LevelMorning|LevelAfternoon|LevelEvening|LevelRain|LevelWalk|LevelUseMoveCount|LevelRecoilDamage|LevelDarkInParty|Beauty)/;

export function emptyNames(): NameMaps {
  return { species: {}, moves: {}, abilities: {} };
}

export function parseNamesKo(json: unknown): NameMaps {
  const o = (json || {}) as Partial<NameMaps>;
  return {
    species: o.species || {},
    moves: o.moves || {},
    abilities: o.abilities || {},
    forms: o.forms || {},
  };
}

function displayName(en: string, map: Record<string, string> | undefined) {
  return (map && map[en]) || en;
}

function listOfSyms(v: RValue): string[] {
  if (!isArray(v)) return [];
  return v.items.map((x) => symName(x)).filter(Boolean);
}

function numHash(v: RValue): Record<string, number> {
  const out: Record<string, number> = {};
  if (!isHash(v)) return out;
  for (const [k, val] of v.entries) out[symName(k)] = asNumber(val);
  return out;
}

export function speciesFromDat(bytes: Uint8Array, names: NameMaps): Species[] {
  const root = marshalLoad(bytes);
  if (!isHash(root)) throw new Error("species.dat 형식이 아닙니다.");
  const out: Species[] = [];
  let dex = 0;
  for (const [, val] of root.entries) {
    if (!isObject(val)) continue;
    const internalName = symName(ivar(val, "@id")) || symName(ivar(val, "@species"));
    const form = asNumber(ivar(val, "@form"));
    if (form === 0) dex += 1;
    const en = asString(ivar(val, "@real_name")) || internalName;
    const formEn = asString(ivar(val, "@real_form_name"));
    let name = displayName(en, names.species);
    if (formEn) {
      const formKo = displayName(formEn, names.forms);
      if (formKo && formKo !== name) name = `${name} (${formKo})`;
    }
    const types = listOfSyms(ivar(val, "@types"));
    const stats = numHash(ivar(val, "@base_stats"));
    const abilities = listOfSyms(ivar(val, "@abilities"));
    const hidden = listOfSyms(ivar(val, "@hidden_abilities"));
    const tutorMoves = listOfSyms(ivar(val, "@tutor_moves"));
    const wildItems = wildItemsFromBuckets(
      listOfSyms(ivar(val, "@wild_item_common")),
      listOfSyms(ivar(val, "@wild_item_uncommon")),
      listOfSyms(ivar(val, "@wild_item_rare")),
    );
    const movesRaw = ivar(val, "@moves");
    const levelMoves: Species["levelMoves"] = [];
    if (isArray(movesRaw)) {
      for (const row of movesRaw.items) {
        if (!isArray(row) || row.items.length < 2) continue;
        levelMoves.push({
          level: asNumber(row.items[0]),
          move: symName(row.items[1]),
        });
      }
    }
    const evoRaw = ivar(val, "@evolutions");
    const evolutions: Species["evolutions"] = [];
    if (isArray(evoRaw)) {
      for (const row of evoRaw.items) {
        if (!isArray(row) || row.items.length < 2) continue;
        const param = row.items[2];
        evolutions.push({
          target: symName(row.items[0]),
          method: symName(row.items[1]) || "None",
          param: param == null ? "" : param instanceof RSymbol ? param.name : String(asNumber(param) || asString(param)),
          reverse: row.items[3] === true,
        });
      }
    }
    out.push({
      id: dex,
      internalName,
      name,
      types: types.length ? types : ["NORMAL"],
      baseStats: {
        hp: stats.HP || 1,
        atk: stats.ATTACK || 1,
        def: stats.DEFENSE || 1,
        spd: stats.SPEED || 1,
        spa: stats.SPECIAL_ATTACK || 1,
        spdF: stats.SPECIAL_DEFENSE || 1,
      },
      abilities,
      hiddenAbility: hidden[0] || "",
      levelMoves,
      tutorMoves,
      wildItems,
      evolutions,
      extra: {
        realName: en,
        form: String(form),
        formName: formEn,
      },
    });
  }
  return out;
}

export function movesFromDat(bytes: Uint8Array, names: NameMaps): Move[] {
  const root = marshalLoad(bytes);
  if (!isHash(root)) throw new Error("moves.dat 형식이 아닙니다.");
  const out: Move[] = [];
  let i = 1;
  for (const [, val] of root.entries) {
    if (!isObject(val)) continue;
    const internalName = symName(ivar(val, "@id"));
    const en = asString(ivar(val, "@real_name")) || internalName;
    const catN = asNumber(ivar(val, "@category"));
    const flagsRaw = ivar(val, "@flags");
    const flags = isArray(flagsRaw) ? flagsRaw.items.map((x) => asString(x)).filter(Boolean).join(",") : asString(flagsRaw);
    out.push({
      id: i++,
      internalName,
      name: displayName(en, names.moves),
      type: symName(ivar(val, "@type")) || "NORMAL",
      category: CAT[catN] ?? "Status",
      power: asNumber(ivar(val, "@power")),
      accuracy: asNumber(ivar(val, "@accuracy")),
      pp: asNumber(ivar(val, "@total_pp")) || 1,
      functionCode: asString(ivar(val, "@function_code")) || "None",
      effectChance: asNumber(ivar(val, "@effect_chance")),
      priority: asNumber(ivar(val, "@priority")),
      flags,
      target: symName(ivar(val, "@target")) || "NearOther",
      description: asString(ivar(val, "@real_description")),
      extra: { realName: en },
    });
  }
  return out;
}

export function abilitiesFromDat(bytes: Uint8Array, names: NameMaps): Ability[] {
  const root = marshalLoad(bytes);
  if (!isHash(root)) return [];
  const out: Ability[] = [];
  for (const [, val] of root.entries) {
    if (!isObject(val)) continue;
    const internalName = symName(ivar(val, "@id"));
    const en = asString(ivar(val, "@real_name")) || internalName;
    out.push({
      internalName,
      name: displayName(en, names.abilities),
      description: asString(ivar(val, "@real_description")),
    });
  }
  return out;
}

function flagList(flags: string): RValue {
  const parts = flags
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return new RArray(parts.map((p) => rstr(p)));
}

function evoParam(method: string, param: string, original: RValue): RValue {
  if (!param) return null;
  if (original instanceof RSymbol && original.name === param) return original;
  if (typeof original === "number" && String(original) === param) return original;
  if (LEVELISH.test(method) || /^-?\d+$/.test(param)) {
    const n = Number(param);
    if (Number.isFinite(n)) return n;
  }
  return rsym(param);
}

export function patchSpeciesDat(bytes: Uint8Array, species: Species[]): Uint8Array {
  const root = marshalLoad(bytes);
  if (!isHash(root)) throw new Error("species.dat 형식이 아닙니다.");
  const byId = new Map(species.map((s) => [s.internalName, s]));
  for (const [key, val] of root.entries) {
    if (!isObject(val)) continue;
    const id = symName(key) || symName(ivar(val, "@id"));
    const s = byId.get(id);
    if (!s) continue;
    const types = new RArray(s.types.filter(Boolean).map((t) => rsym(t)));
    setIvar(val, "@types", types);
    const stats = ivar(val, "@base_stats");
    if (isHash(stats)) {
      hashSet(stats, rsym("HP"), s.baseStats.hp);
      hashSet(stats, rsym("ATTACK"), s.baseStats.atk);
      hashSet(stats, rsym("DEFENSE"), s.baseStats.def);
      hashSet(stats, rsym("SPEED"), s.baseStats.spd);
      hashSet(stats, rsym("SPECIAL_ATTACK"), s.baseStats.spa);
      hashSet(stats, rsym("SPECIAL_DEFENSE"), s.baseStats.spdF);
    } else {
      setIvar(
        val,
        "@base_stats",
        new RHash(
          STAT_KEYS.map((k) => {
            const map: Record<string, number> = {
              HP: s.baseStats.hp,
              ATTACK: s.baseStats.atk,
              DEFENSE: s.baseStats.def,
              SPEED: s.baseStats.spd,
              SPECIAL_ATTACK: s.baseStats.spa,
              SPECIAL_DEFENSE: s.baseStats.spdF,
            };
            return [rsym(k), map[k]!] as [RValue, RValue];
          }),
        ),
      );
    }
    setIvar(val, "@abilities", new RArray(s.abilities.filter(Boolean).map((a) => rsym(a))));
    setIvar(
      val,
      "@hidden_abilities",
      new RArray(s.hiddenAbility ? [rsym(s.hiddenAbility)] : []),
    );
    setIvar(
      val,
      "@moves",
      new RArray(s.levelMoves.map((m) => new RArray([m.level, rsym(m.move)]))),
    );
    const tutors = [...new Set((s.tutorMoves || []).map((m) => m.trim().toUpperCase()).filter(Boolean))];
    setIvar(val, "@tutor_moves", new RArray(tutors.map((m) => rsym(m))));
    const buckets = wildItemsToBuckets(s.wildItems);
    setIvar(val, "@wild_item_common", new RArray(buckets.common.map((id) => rsym(id))));
    setIvar(val, "@wild_item_uncommon", new RArray(buckets.uncommon.map((id) => rsym(id))));
    setIvar(val, "@wild_item_rare", new RArray(buckets.rare.map((id) => rsym(id))));
    const origEvo = ivar(val, "@evolutions");
    const origRows = isArray(origEvo) ? origEvo.items : [];
    const nextEvos = s.evolutions.map((e, i) => {
      const prev = origRows[i];
      const prevItems = isArray(prev) ? prev.items : [];
      const param = evoParam(e.method, e.param, prevItems[2] ?? null);
      const reverse = e.reverse ?? (prevItems[3] === true);
      return new RArray([rsym(e.target), rsym(e.method), param, reverse]);
    });
    setIvar(val, "@evolutions", new RArray(nextEvos));
    const real = s.extra.realName || asString(ivar(val, "@real_name"));
    if (real) setIvar(val, "@real_name", rstr(real));
  }
  return marshalDump(root);
}

export function patchMovesDat(bytes: Uint8Array, moves: Move[]): Uint8Array {
  const root = marshalLoad(bytes);
  if (!isHash(root)) throw new Error("moves.dat 형식이 아닙니다.");
  const byId = new Map(moves.map((m) => [m.internalName, m]));
  for (const [key, val] of root.entries) {
    if (!isObject(val)) continue;
    const id = symName(key) || symName(ivar(val, "@id"));
    const m = byId.get(id);
    if (!m) continue;
    setIvar(val, "@type", rsym(m.type));
    setIvar(val, "@category", CAT.indexOf(m.category));
    setIvar(val, "@power", m.power);
    setIvar(val, "@accuracy", m.accuracy);
    setIvar(val, "@total_pp", m.pp);
    setIvar(val, "@function_code", rstr(m.functionCode || "None"));
    setIvar(val, "@effect_chance", m.effectChance);
    setIvar(val, "@priority", m.priority);
    setIvar(val, "@target", rsym(m.target || "NearOther"));
    const origFlags = ivar(val, "@flags");
    if (isArray(origFlags) || m.flags.includes(",")) setIvar(val, "@flags", flagList(m.flags));
    else setIvar(val, "@flags", rstr(m.flags));
    if (m.description) setIvar(val, "@real_description", rstr(m.description));
    const real = m.extra.realName || asString(ivar(val, "@real_name"));
    if (real) setIvar(val, "@real_name", rstr(real));
  }
  return marshalDump(root);
}

export function patchMessagesNames(
  bytes: Uint8Array,
  species: Species[],
  moves: Move[],
): Uint8Array {
  const root = marshalLoad(bytes);
  if (!isArray(root)) return bytes;
  const specMap = root.items[1];
  const moveMap = root.items[5];
  if (isHash(specMap)) {
    for (const s of species) {
      const en = s.extra.realName;
      if (!en || !s.name) continue;
      const base = s.extra.formName ? s.name.replace(/ \([^)]+\)$/, "") : s.name;
      if (base === en) continue;
      const cur = hashGet(specMap, en);
      if (asString(cur ?? null) !== base) {
        const key = specMap.entries.find(([k]) => asString(k) === en)?.[0] ?? rstr(en);
        hashSet(specMap, key, rstr(base));
      }
    }
  }
  if (isHash(moveMap)) {
    for (const m of moves) {
      const en = m.extra.realName;
      if (!en || !m.name || m.name === en) continue;
      const cur = hashGet(moveMap, en);
      if (asString(cur ?? null) !== m.name) {
        const key = moveMap.entries.find(([k]) => asString(k) === en)?.[0] ?? rstr(en);
        hashSet(moveMap, key, rstr(m.name));
      }
    }
  }
  return marshalDump(root);
}

export function looksLikeMarshal(buf: Uint8Array) {
  return buf.length >= 2 && buf[0] === 0x04 && buf[1] === 0x08;
}

export function classifyDat(
  name: string,
  path: string,
  buf: Uint8Array,
): "species" | "moves" | "abilities" | "messages" | "encounters" | null {
  const n = `${path} ${name}`.toLowerCase();
  if (!looksLikeMarshal(buf)) return null;
  if (n.includes("encounter")) return "encounters";
  if (n.includes("species") && !n.includes("metric")) return "species";
  if (n.includes("moves") || /(^|[\\/])moves\.dat$/.test(n)) return "moves";
  if (n.includes("abilit")) return "abilities";
  if (n.includes("messages") && n.includes("kor") && n.includes("core")) return "messages";
  if (n.includes("messages_kor_core")) return "messages";
  try {
    const root = marshalLoad(buf);
    if (isHash(root) && root.entries[0]) {
      const v = root.entries[0][1];
      if (isObject(v)) {
        if (v.className.includes("Encounter")) return "encounters";
        if (v.className.includes("Species")) return "species";
        if (v.className.includes("Move") && !v.className.includes("Species")) return "moves";
        if (v.className.includes("Ability")) return "abilities";
      }
    }
    if (isArray(root) && root.items.length >= 6 && isHash(root.items[1]) && isHash(root.items[5])) {
      return "messages";
    }
  } catch {
    return null;
  }
  return null;
}

export function detectDatOrPbs(name: string, buf: Uint8Array): "dat" | "pbs" | "json" | null {
  if (looksLikeMarshal(buf)) return "dat";
  const head = new TextDecoder("utf-8").decode(buf.subarray(0, 200)).trim();
  if (head.startsWith("{") || head.startsWith("[")) return "json";
  if (head.includes("[") || /Name\s*=/.test(head) || /^[0-9]+,[A-Z]/.test(head)) return "pbs";
  if (name.toLowerCase().endsWith(".txt")) return "pbs";
  return null;
}
