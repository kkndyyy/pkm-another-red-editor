import type { Move, Species, ValidationIssue } from "./types";
import { bst } from "./pbs";

export function validateWorkspace(species: Species[], moves: Move[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const moveIds = new Set(moves.map((m) => m.internalName));
  const specIds = new Set(species.map((s) => s.internalName));
  const seenSpec = new Set<string>();
  const seenMove = new Set<string>();
  const seenNum = new Set<number>();

  for (const s of species) {
    const key = s.internalName;
    if (seenSpec.has(key)) {
      issues.push({ level: "error", scope: "species", key, message: `내부ID 중복: ${key}` });
    }
    seenSpec.add(key);
    if (seenNum.has(s.id) && !s.internalName.includes("_")) {
      issues.push({ level: "warn", scope: "species", key, message: `번호 중복: ${s.id}` });
    }
    seenNum.add(s.id);
    if (!s.name.trim()) {
      issues.push({ level: "error", scope: "species", key, message: "이름이 비어 있습니다." });
    }
    for (const [stat, v] of Object.entries(s.baseStats)) {
      if (v < 1 || v > 255) {
        issues.push({
          level: "error",
          scope: "species",
          key,
          message: `종족값 ${stat}는 1~255여야 합니다 (${v}).`,
        });
      }
    }
    const total = bst(s);
    if (total > 1200) {
      issues.push({
        level: "warn",
        scope: "species",
        key,
        message: `종족값 합 ${total}이 비정상적으로 높습니다.`,
      });
    }
    for (const mv of s.levelMoves) {
      if (!moveIds.has(mv.move)) {
        issues.push({
          level: "error",
          scope: "species",
          key,
          message: `없는 기술 ${mv.move} (Lv.${mv.level})`,
        });
      }
      if (mv.level < -1 || mv.level > 100) {
        issues.push({
          level: "error",
          scope: "species",
          key,
          message: `기술 레벨 ${mv.level}은 -1~100이어야 합니다.`,
        });
      }
    }
    for (const tm of s.tutorMoves || []) {
      if (tm && !moveIds.has(tm)) {
        issues.push({
          level: "error",
          scope: "species",
          key,
          message: `기술머신에 없는 기술 ${tm}`,
        });
      }
    }
    for (const row of s.wildItems || []) {
      if (!row.item) {
        issues.push({
          level: "error",
          scope: "species",
          key,
          message: "소지 도구가 비어 있습니다.",
        });
      }
      const c = Number(row.chance);
      if (!Number.isFinite(c) || c < 1 || c > 100) {
        issues.push({
          level: "error",
          scope: "species",
          key,
          message: `소지 확률 ${row.chance}은 1~100이어야 합니다.`,
        });
      } else if (![1, 5, 50, 100].includes(c)) {
        issues.push({
          level: "warn",
          scope: "species",
          key,
          message: `소지 확률 ${c}%는 저장 시 50·5·1·100 중 가까운 값으로 바뀝니다.`,
        });
      }
    }
    for (const e of s.evolutions) {
      if (e.target && !specIds.has(e.target)) {
        issues.push({
          level: "error",
          scope: "species",
          key,
          message: `진화 대상 ${e.target}이 도감에 없습니다.`,
        });
      }
      if (e.method === "Level") {
        const n = Number(e.param);
        if (!Number.isFinite(n) || n < 1 || n > 100) {
          issues.push({
            level: "error",
            scope: "species",
            key,
            message: `진화 레벨 ${e.param}이 유효하지 않습니다.`,
          });
        }
      }
    }
  }

  for (const m of moves) {
    const key = m.internalName;
    if (seenMove.has(key)) {
      issues.push({ level: "error", scope: "move", key, message: `기술 내부ID 중복: ${key}` });
    }
    seenMove.add(key);
    if (!m.name.trim()) {
      issues.push({ level: "error", scope: "move", key, message: "기술 이름이 비어 있습니다." });
    }
    if (m.pp < 1 || m.pp > 40) {
      issues.push({
        level: m.pp === 0 ? "error" : "warn",
        scope: "move",
        key,
        message: `PP ${m.pp} (권장 1~40)`,
      });
    }
    if (m.accuracy < 0 || m.accuracy > 100) {
      issues.push({
        level: "error",
        scope: "move",
        key,
        message: `명중 ${m.accuracy}은 0~100이어야 합니다.`,
      });
    }
    if (m.power === 0 && m.category !== "Status") {
      issues.push({
        level: "warn",
        scope: "move",
        key,
        message: "위력 0인데 물리/특수입니다. 변화기로 바꾸는 것을 권장합니다.",
      });
    }
    if (m.power > 0 && m.category === "Status") {
      issues.push({
        level: "warn",
        scope: "move",
        key,
        message: "변화기인데 위력이 있습니다.",
      });
    }
    if (m.effectChance < 0 || m.effectChance > 255) {
      issues.push({
        level: "error",
        scope: "move",
        key,
        message: `부가효과 확률 ${m.effectChance}은 0~255여야 합니다.`,
      });
    }
  }
  return issues;
}

export function issuesFor(issues: ValidationIssue[], scope: "species" | "move", key: string) {
  return issues.filter((i) => i.scope === scope && i.key === key);
}
