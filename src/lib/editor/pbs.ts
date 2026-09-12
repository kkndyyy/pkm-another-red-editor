import type { Move, MoveCategory, ParseIssue, Species } from "./types.ts";
import { CATEGORIES } from "./types.ts";
import { wildItemsFromBuckets, wildItemsToBuckets } from "./wild-items.ts";

const SPECIES_KEY_ORDER = [
  "Name",
  "InternalName",
  "Type1",
  "Type2",
  "BaseStats",
  "GenderRate",
  "GrowthRate",
  "BaseEXP",
  "EffortPoints",
  "Rareness",
  "Happiness",
  "Abilities",
  "HiddenAbility",
  "Moves",
  "EggMoves",
  "TutorMoves",
  "WildItemCommon",
  "WildItemUncommon",
  "WildItemRare",
  "Compatibility",
  "StepsToHatch",
  "Height",
  "Weight",
  "Color",
  "Shape",
  "Habitat",
  "Kind",
  "Pokedex",
  "Generation",
  "Evolutions",
];

const MOVE_KEY_ORDER = [
  "Name",
  "Type",
  "Category",
  "Power",
  "Accuracy",
  "TotalPP",
  "Target",
  "Priority",
  "FunctionCode",
  "EffectChance",
  "Flags",
  "Description",
];

function stripBom(text: string) {
  return text.replace(/^\uFEFF/, "");
}

function parseSections(text: string): { id: string; fields: Record<string, string>; order: string[] }[] {
  const lines = stripBom(text).replace(/\r\n/g, "\n").split("\n");
  const out: { id: string; fields: Record<string, string>; order: string[] }[] = [];
  let cur: { id: string; fields: Record<string, string>; order: string[] } | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const sec = line.match(/^\[([^\]]+)\]$/);
    if (sec) {
      cur = { id: sec[1]!.trim(), fields: {}, order: [] };
      out.push(cur);
      continue;
    }
    if (!cur) continue;
    const eq = line.indexOf("=");
    if (eq < 1) continue;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim();
    if (!(key in cur.fields)) cur.order.push(key);
    cur.fields[key] = val;
  }
  return out;
}

function splitList(v: string | undefined): string[] {
  if (!v) return [];
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseMovesField(v: string | undefined): Species["levelMoves"] {
  const parts = splitList(v);
  const moves: Species["levelMoves"] = [];
  for (let i = 0; i + 1 < parts.length; i += 2) {
    const level = Number(parts[i]);
    const move = parts[i + 1]!;
    if (!move) continue;
    moves.push({ level: Number.isFinite(level) ? level : 1, move: move.toUpperCase() });
  }
  return moves;
}

function parseEvolutions(v: string | undefined): Species["evolutions"] {
  const parts = splitList(v);
  const evo: Species["evolutions"] = [];
  for (let i = 0; i + 2 < parts.length; i += 3) {
    evo.push({
      target: parts[i]!.toUpperCase(),
      method: parts[i + 1]!,
      param: parts[i + 2]!,
    });
  }
  return evo;
}

function parseStats(v: string | undefined) {
  const n = splitList(v).map((x) => Number(x) || 0);
  return {
    hp: n[0] ?? 1,
    atk: n[1] ?? 1,
    def: n[2] ?? 1,
    spd: n[3] ?? 1,
    spa: n[4] ?? 1,
    spdF: n[5] ?? 1,
  };
}

const KNOWN_SPECIES = new Set([
  "Name",
  "InternalName",
  "Type1",
  "Type2",
  "BaseStats",
  "Abilities",
  "HiddenAbility",
  "Moves",
  "TutorMoves",
  "WildItemCommon",
  "WildItemUncommon",
  "WildItemRare",
  "Evolutions",
]);

const KNOWN_MOVE = new Set([
  "Name",
  "InternalName",
  "Type",
  "Category",
  "Power",
  "BaseDamage",
  "Accuracy",
  "TotalPP",
  "PP",
  "Target",
  "Priority",
  "FunctionCode",
  "EffectChance",
  "Flags",
  "Description",
]);

export function parsePokemonPbs(text: string): { species: Species[]; issues: ParseIssue[] } {
  const issues: ParseIssue[] = [];
  const species: Species[] = [];
  const sections = parseSections(text);
  if (sections.length === 0 && text.trim() && !text.includes("[")) {
    issues.push({ file: "pokemon.txt", message: "섹션 헤더 [번호]가 없습니다." });
  }
  for (const sec of sections) {
    const id = Number(sec.id);
    if (!Number.isFinite(id)) {
      issues.push({ file: "pokemon.txt", message: `종족 섹션 ID가 숫자가 아닙니다: ${sec.id}` });
    }
    const extra: Record<string, string> = {};
    for (const [k, v] of Object.entries(sec.fields)) {
      if (!KNOWN_SPECIES.has(k)) extra[k] = v;
    }
    const types = [sec.fields.Type1, sec.fields.Type2].filter(Boolean) as string[];
    species.push({
      id: Number.isFinite(id) ? id : species.length + 1,
      internalName: (sec.fields.InternalName || `SPECIES_${sec.id}`).toUpperCase(),
      name: sec.fields.Name || sec.fields.InternalName || sec.id,
      types: types.length ? types.map((t) => t.toUpperCase()) : ["NORMAL"],
      baseStats: parseStats(sec.fields.BaseStats),
      abilities: splitList(sec.fields.Abilities).map((a) => a.toUpperCase()),
      hiddenAbility: (sec.fields.HiddenAbility || "").toUpperCase(),
      levelMoves: parseMovesField(sec.fields.Moves),
      tutorMoves: splitList(sec.fields.TutorMoves).map((a) => a.toUpperCase()),
      wildItems: wildItemsFromBuckets(
        splitList(sec.fields.WildItemCommon),
        splitList(sec.fields.WildItemUncommon),
        splitList(sec.fields.WildItemRare),
      ),
      evolutions: parseEvolutions(sec.fields.Evolutions),
      extra,
    });
  }
  return { species, issues };
}

function asCategory(v: string | undefined): MoveCategory {
  const c = (v || "Physical").replace(/^[a-z]/, (s) => s.toUpperCase());
  if ((CATEGORIES as readonly string[]).includes(c)) return c as MoveCategory;
  if (c === "Phys") return "Physical";
  if (c === "Spec") return "Special";
  return "Status";
}

export function parseMovesPbs(text: string): { moves: Move[]; issues: ParseIssue[] } {
  const issues: ParseIssue[] = [];
  const trimmed = stripBom(text).trim();
  if (!trimmed) return { moves: [], issues };

  const hasSections = /^\s*\[/m.test(trimmed);
  if (hasSections) {
    const sections = parseSections(text);
    const moves: Move[] = [];
    let i = 1;
    for (const sec of sections) {
      const extra: Record<string, string> = {};
      for (const [k, v] of Object.entries(sec.fields)) {
        if (!KNOWN_MOVE.has(k)) extra[k] = v;
      }
      const power = Number(sec.fields.Power ?? sec.fields.BaseDamage ?? 0) || 0;
      moves.push({
        id: Number(sec.fields.ID) || i,
        internalName: (sec.fields.InternalName || sec.id).toUpperCase(),
        name: sec.fields.Name || sec.id,
        type: (sec.fields.Type || "NORMAL").toUpperCase(),
        category: asCategory(sec.fields.Category),
        power,
        accuracy: Number(sec.fields.Accuracy ?? 100) || 0,
        pp: Number(sec.fields.TotalPP ?? sec.fields.PP ?? 10) || 1,
        functionCode: sec.fields.FunctionCode || "None",
        effectChance: Number(sec.fields.EffectChance ?? 0) || 0,
        priority: Number(sec.fields.Priority ?? 0) || 0,
        flags: sec.fields.Flags || "",
        target: sec.fields.Target || "NearOther",
        description: stripQuotes(sec.fields.Description || ""),
        extra,
      });
      i += 1;
    }
    return { moves, issues };
  }

  // CSV: ID,InternalName,Name,FunctionCode,Power,Type,Category,Accuracy,PP,EffectChance,Target,Priority,Flags,Description
  const moves: Move[] = [];
  const lines = stripBom(text).replace(/\r\n/g, "\n").split("\n");
  let lineNo = 0;
  for (const raw of lines) {
    lineNo += 1;
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const cols = splitCsv(line);
    if (cols.length < 8) {
      issues.push({ file: "moves.txt", line: lineNo, message: "CSV 열이 부족합니다." });
      continue;
    }
    moves.push({
      id: Number(cols[0]) || moves.length + 1,
      internalName: (cols[1] || `MOVE_${cols[0]}`).toUpperCase(),
      name: cols[2] || cols[1] || "",
      functionCode: cols[3] || "None",
      power: Number(cols[4]) || 0,
      type: (cols[5] || "NORMAL").toUpperCase(),
      category: asCategory(cols[6]),
      accuracy: Number(cols[7]) || 0,
      pp: Number(cols[8]) || 1,
      effectChance: Number(cols[9]) || 0,
      target: cols[10] || "00",
      priority: Number(cols[11]) || 0,
      flags: cols[12] || "",
      description: stripQuotes(cols[13] || ""),
      extra: {},
    });
  }
  return { moves, issues };
}

function stripQuotes(s: string) {
  return s.replace(/^"(.*)"$/s, "$1");
}

function splitCsv(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]!;
    if (inQ) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else if (ch === '"') {
        inQ = false;
      } else cur += ch;
    } else if (ch === '"') {
      inQ = true;
    } else if (ch === ",") {
      out.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  out.push(cur.trim());
  return out;
}

export function serializePokemonPbs(species: Species[]): string {
  const blocks = species.map((s) => {
    const extra = { ...s.extra };
    delete extra.TutorMoves;
    delete extra.WildItemCommon;
    delete extra.WildItemUncommon;
    delete extra.WildItemRare;
    const buckets = wildItemsToBuckets(s.wildItems);
    const fields: Record<string, string> = {
      Name: s.name,
      InternalName: s.internalName,
      Type1: s.types[0] || "NORMAL",
      ...(s.types[1] ? { Type2: s.types[1] } : {}),
      BaseStats: [
        s.baseStats.hp,
        s.baseStats.atk,
        s.baseStats.def,
        s.baseStats.spd,
        s.baseStats.spa,
        s.baseStats.spdF,
      ].join(","),
      Abilities: s.abilities.filter(Boolean).join(","),
      ...(s.hiddenAbility ? { HiddenAbility: s.hiddenAbility } : {}),
      Moves: s.levelMoves.map((m) => `${m.level},${m.move}`).join(","),
      ...(s.tutorMoves?.length ? { TutorMoves: s.tutorMoves.join(",") } : {}),
      ...(buckets.common.length ? { WildItemCommon: buckets.common.join(",") } : {}),
      ...(buckets.uncommon.length ? { WildItemUncommon: buckets.uncommon.join(",") } : {}),
      ...(buckets.rare.length ? { WildItemRare: buckets.rare.join(",") } : {}),
      ...(s.evolutions.length
        ? {
            Evolutions: s.evolutions
              .map((e) => `${e.target},${e.method},${e.param}`)
              .join(","),
          }
        : {}),
      ...extra,
    };
    const keys = [
      ...SPECIES_KEY_ORDER.filter((k) => k in fields && fields[k]),
      ...Object.keys(fields).filter((k) => !SPECIES_KEY_ORDER.includes(k)),
    ];
    const body = keys.map((k) => `${k}=${fields[k]}`).join("\n");
    return `[${s.id}]\n${body}`;
  });
  return `# 레드포지 — pokemon.txt (Pokémon Essentials PBS)\n${blocks.join("\n\n")}\n`;
}

export function serializeMovesPbs(moves: Move[]): string {
  const blocks = moves.map((m) => {
    const fields: Record<string, string> = {
      Name: m.name,
      Type: m.type,
      Category: m.category,
      Power: String(m.power),
      Accuracy: String(m.accuracy),
      TotalPP: String(m.pp),
      Target: m.target || "NearOther",
      Priority: String(m.priority),
      FunctionCode: m.functionCode || "None",
      EffectChance: String(m.effectChance),
      Flags: m.flags,
      Description: m.description,
      ...m.extra,
    };
    const keys = [
      ...MOVE_KEY_ORDER.filter((k) => k in fields && fields[k] !== ""),
      ...Object.keys(fields).filter((k) => !MOVE_KEY_ORDER.includes(k) && fields[k] !== ""),
    ];
    const body = keys.map((k) => `${k} = ${fields[k]}`).join("\n");
    return `[${m.internalName}]\n${body}`;
  });
  return `# 레드포지 — moves.txt (Pokémon Essentials PBS)\n${blocks.join("\n\n")}\n`;
}

export function bst(s: Species): number {
  const b = s.baseStats;
  return b.hp + b.atk + b.def + b.spd + b.spa + b.spdF;
}
