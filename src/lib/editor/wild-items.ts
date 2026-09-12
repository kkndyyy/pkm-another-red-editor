import type { WildItem } from "./types.ts";

export const WILD_CHANCE_PRESETS = [
  { value: 100, label: "항상 100%" },
  { value: 50, label: "흔함 50%" },
  { value: 5, label: "드묾 5%" },
  { value: 1, label: "희귀 1%" },
] as const;

export function snapWildChance(n: number): number {
  const v = Number(n);
  if (!Number.isFinite(v) || v >= 100) return 100;
  if (v >= 20) return 50;
  if (v >= 3) return 5;
  return 1;
}

export function uniqueIds(ids: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of ids) {
    const id = raw.trim().toUpperCase();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

/** 세 칸이 모두 같은 도구 하나면 게임에서 100%. */
export function wildItemsFromBuckets(common: string[], uncommon: string[], rare: string[]): WildItem[] {
  const c = uniqueIds(common);
  const u = uniqueIds(uncommon);
  const r = uniqueIds(rare);
  if (c.length === 1 && u.length === 1 && r.length === 1 && c[0] === u[0] && u[0] === r[0]) {
    return [{ item: c[0]!, chance: 100 }];
  }
  const out: WildItem[] = [];
  for (const item of c) out.push({ item, chance: 50 });
  for (const item of u) out.push({ item, chance: 5 });
  for (const item of r) out.push({ item, chance: 1 });
  return out;
}

export function wildItemsToBuckets(items: WildItem[] | undefined): {
  common: string[];
  uncommon: string[];
  rare: string[];
} {
  const common: string[] = [];
  const uncommon: string[] = [];
  const rare: string[] = [];
  const always: string[] = [];
  for (const row of items || []) {
    const id = (row.item || "").trim().toUpperCase();
    if (!id) continue;
    const chance = snapWildChance(row.chance);
    if (chance >= 100) always.push(id);
    else if (chance >= 50) common.push(id);
    else if (chance >= 5) uncommon.push(id);
    else rare.push(id);
  }
  if (always.length) {
    const all = uniqueIds(always);
    return {
      common: uniqueIds([...all, ...common]),
      uncommon: uniqueIds([...all, ...uncommon]),
      rare: uniqueIds([...all, ...rare]),
    };
  }
  return {
    common: uniqueIds(common),
    uncommon: uniqueIds(uncommon),
    rare: uniqueIds(rare),
  };
}
