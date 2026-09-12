import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { EVO_KO, STAT_LABELS, TYPE_KO, typeQueryHit } from "@/lib/editor/constants";
import { bst } from "@/lib/editor/pbs";
import { useEditor, useIssues } from "@/lib/editor/store";
import { EVO_METHODS, TYPES } from "@/lib/editor/types";
import { SAMPLE_ABILITIES } from "@/lib/editor/sample-data";
import { issuesFor } from "@/lib/editor/validate";
import { itemNameKo, itemOptions } from "@/lib/editor/items-ko";
import { WILD_CHANCE_PRESETS, snapWildChance } from "@/lib/editor/wild-items";
import { Button } from "@/components/ui/button";
import { Field, NativeSelect } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TypeChip } from "./type-chip";
import { TypeFilter } from "./type-filter";
import { StatBars } from "./stat-bars";
import { SearchSelect } from "./search-select";

export function SpeciesPanel() {
  const species = useEditor((s) => s.species);
  const moves = useEditor((s) => s.moves);
  const selected = useEditor((s) => s.selectedSpecies);
  const query = useEditor((s) => s.query);
  const selectSpecies = useEditor((s) => s.selectSpecies);
  const patchSpecies = useEditor((s) => s.patchSpecies);
  const addLevelMove = useEditor((s) => s.addLevelMove);
  const removeLevelMove = useEditor((s) => s.removeLevelMove);
  const patchLevelMove = useEditor((s) => s.patchLevelMove);
  const addEvolution = useEditor((s) => s.addEvolution);
  const removeEvolution = useEditor((s) => s.removeEvolution);
  const patchEvolution = useEditor((s) => s.patchEvolution);
  const abilities = useEditor((s) => s.abilities);
  const showForms = useEditor((s) => s.showForms);
  const setShowForms = useEditor((s) => s.setShowForms);
  const typeFilter = useEditor((s) => s.typeFilter);
  const setTypeFilter = useEditor((s) => s.setTypeFilter);
  const addTutorMove = useEditor((s) => s.addTutorMove);
  const removeTutorMove = useEditor((s) => s.removeTutorMove);
  const addWildItem = useEditor((s) => s.addWildItem);
  const removeWildItem = useEditor((s) => s.removeWildItem);
  const patchWildItem = useEditor((s) => s.patchWildItem);
  const issues = useIssues();
  const abilityList = abilities.length ? abilities : SAMPLE_ABILITIES;
  const [tmQuery, setTmQuery] = useState("");

  const q = query.trim().toLowerCase();
  const list = species.filter((s) => {
    const isForm = /_\d+$/.test(s.internalName);
    if (!showForms && isForm && !q) return false;
    if (!typeQueryHit(s.types, typeFilter, "")) return false;
    if (!q) return true;
    const hitName =
      s.name.toLowerCase().includes(q) ||
      s.internalName.toLowerCase().includes(q) ||
      String(s.id).includes(q) ||
      typeQueryHit(s.types, "", q);
    if (hitName) return true;
    return (s.wildItems || []).some((w) => {
      const id = (w.item || "").toLowerCase();
      const ko = itemNameKo(w.item).toLowerCase();
      return id.includes(q) || ko.includes(q);
    });
  });
  const current = species.find((s) => s.internalName === selected) ?? list[0];
  const mine = current ? issuesFor(issues, "species", current.internalName) : [];
  const moveOptions = useMemo(
    () => moves.map((m) => ({ value: m.internalName, label: m.name, hint: m.internalName })),
    [moves],
  );
  const abilityOptions = useMemo(
    () => abilityList.map((a) => ({ value: a.internalName, label: a.name, hint: a.internalName })),
    [abilityList],
  );
  const holdOptions = useMemo(
    () => itemOptions((current?.wildItems || []).map((w) => w.item)),
    [current?.wildItems],
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="flex max-h-64 min-h-0 shrink-0 flex-col overflow-hidden border-b border-[var(--color-border)] lg:h-full lg:max-h-none lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between gap-2 p-3 text-xs text-[var(--color-muted)]">
          <span>
            {list.length} / {species.length}
          </span>
          <label className="flex cursor-pointer items-center gap-1.5">
            <input
              type="checkbox"
              checked={showForms}
              onChange={(e) => setShowForms(e.target.checked)}
              className="size-3.5 accent-[var(--color-accent)]"
            />
            폼 포함
          </label>
        </div>
        <TypeFilter value={typeFilter} onChange={setTypeFilter} />
        <div className="list-scroll">
          {list.map((s) => {
            const active = current?.internalName === s.internalName;
            return (
              <button
                key={s.internalName}
                type="button"
                onClick={() => selectSpecies(s.internalName)}
                className={`flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-left transition-colors duration-150 ${
                  active
                    ? "border-[var(--color-accent)] bg-[var(--color-raised)]"
                    : "border-transparent hover:bg-[var(--color-raised)]/60"
                }`}
              >
                <span className="w-10 font-mono text-xs tabular-nums text-[var(--color-subtle)]">
                  {String(s.id).padStart(3, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{s.name}</span>
                  <span className="block truncate font-mono text-[11px] text-[var(--color-subtle)]">
                    {s.internalName}
                  </span>
                </span>
                <span className="hidden sm:flex gap-1">
                  {s.types.map((t) => (
                    <TypeChip key={t} type={t} />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {current ? (
        <div className="min-h-0 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-8">
            <header className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-[var(--color-subtle)]">No.{current.id}</p>
                <h2 className="font-display text-3xl font-semibold tracking-tight">{current.name}</h2>
                <p className="mt-1 font-mono text-xs text-[var(--color-muted)]">{current.internalName}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {current.types.map((t) => (
                  <TypeChip key={t} type={t} />
                ))}
              </div>
            </header>

            {mine.length > 0 && (
              <ul className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-raised)] px-4 py-3 text-sm">
                {mine.map((i, idx) => (
                  <li
                    key={idx}
                    className={i.level === "error" ? "text-[var(--color-danger)]" : "text-[var(--color-warn)]"}
                  >
                    {i.level === "error" ? "오류" : "주의"} · {i.message}
                  </li>
                ))}
              </ul>
            )}

            <section className="grid gap-4 sm:grid-cols-2">
              <Field label="번호">
                <Input
                  type="number"
                  value={current.id}
                  onChange={(e) => patchSpecies(current.internalName, { id: Number(e.target.value) || 0 })}
                />
              </Field>
              <Field label="이름">
                <Input
                  value={current.name}
                  onChange={(e) => patchSpecies(current.internalName, { name: e.target.value })}
                />
              </Field>
              <Field label="내부 ID">
                <Input
                  value={current.internalName}
                  className="font-mono uppercase"
                  onChange={(e) =>
                    patchSpecies(current.internalName, { internalName: e.target.value.toUpperCase() })
                  }
                />
              </Field>
              <Field label="숨겨진 특성">
                <SearchSelect
                  value={current.hiddenAbility}
                  onChange={(v) => patchSpecies(current.internalName, { hiddenAbility: v })}
                  options={abilityOptions}
                  allowEmpty
                  emptyLabel="없음"
                  aria-label="숨겨진 특성"
                />
              </Field>
              <Field label="타입 1">
                <NativeSelect
                  value={current.types[0] || "NORMAL"}
                  onChange={(e) =>
                    patchSpecies(current.internalName, {
                      types: [e.target.value, current.types[1]].filter(Boolean) as string[],
                    })
                  }
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {TYPE_KO[t]}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
              <Field label="타입 2">
                <NativeSelect
                  value={current.types[1] || ""}
                  onChange={(e) =>
                    patchSpecies(current.internalName, {
                      types: e.target.value ? [current.types[0] || "NORMAL", e.target.value] : [current.types[0] || "NORMAL"],
                    })
                  }
                >
                  <option value="">없음</option>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {TYPE_KO[t]}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
              <Field label="특성 1">
                <SearchSelect
                  value={current.abilities[0] || ""}
                  onChange={(v) => {
                    const next = [...current.abilities];
                    next[0] = v;
                    patchSpecies(current.internalName, { abilities: next.filter(Boolean) });
                  }}
                  options={abilityOptions}
                  aria-label="특성 1"
                />
              </Field>
              <Field label="특성 2">
                <SearchSelect
                  value={current.abilities[1] || ""}
                  onChange={(v) => {
                    const a0 = current.abilities[0] || abilityList[0]!.internalName;
                    patchSpecies(current.internalName, { abilities: v ? [a0, v] : [a0] });
                  }}
                  options={abilityOptions}
                  allowEmpty
                  emptyLabel="없음"
                  aria-label="특성 2"
                />
              </Field>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_220px]">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {STAT_LABELS.map(({ key, label }) => (
                  <Field key={key} label={label}>
                    <Input
                      type="number"
                      min={1}
                      max={255}
                      value={current.baseStats[key]}
                      onChange={(e) =>
                        patchSpecies(current.internalName, {
                          baseStats: {
                            ...current.baseStats,
                            [key]: Math.max(0, Number(e.target.value) || 0),
                          },
                        })
                      }
                    />
                  </Field>
                ))}
                <div className="flex flex-col justify-end rounded-[var(--radius-md)] bg-[var(--color-raised)] px-3 py-2">
                  <span className="text-xs text-[var(--color-muted)]">합계</span>
                  <span className="font-mono text-xl tabular-nums">{bst(current)}</span>
                </div>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <StatBars species={current} />
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium">레벨업 기술</h3>
                <Button type="button" variant="outline" size="sm" onClick={() => addLevelMove(current.internalName)}>
                  <Plus className="size-4" />
                  추가
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {current.levelMoves.length === 0 && (
                  <p className="text-sm text-[var(--color-muted)]">아직 배우는 기술이 없습니다.</p>
                )}
                {current.levelMoves.map((row, i) => {
                  const mv = moves.find((m) => m.internalName === row.move);
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-raised)] p-2"
                    >
                      <Input
                        type="number"
                        min={-1}
                        max={100}
                        value={row.level}
                        aria-label="레벨"
                        onChange={(e) =>
                          patchLevelMove(current.internalName, i, { level: Number(e.target.value) || 0 })
                        }
                      />
                      <SearchSelect
                        value={row.move}
                        onChange={(v) => patchLevelMove(current.internalName, i, { move: v })}
                        options={moveOptions}
                        aria-label="기술"
                      />
                      <div className="flex items-center gap-1">
                        {mv && <TypeChip type={mv.type} />}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-11"
                          aria-label="삭제"
                          onClick={() => removeLevelMove(current.internalName, i)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-sm font-medium">
                  기술머신
                  <span className="ml-2 font-mono text-xs text-[var(--color-subtle)]">
                    {(current.tutorMoves || []).length}
                  </span>
                </h3>
              </div>
              <p className="mb-3 text-xs text-[var(--color-muted)]">
                기술머신·비전머신·기술레코드·기술가르침으로 배울 수 있는 기술입니다.
              </p>
              <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_160px]">
                <SearchSelect
                  value=""
                  onChange={(v) => {
                    if (v) addTutorMove(current.internalName, v);
                  }}
                  options={moveOptions.filter((o) => !(current.tutorMoves || []).includes(o.value))}
                  placeholder="기술머신으로 배울 기술 검색"
                  aria-label="기술머신 추가"
                />
                <Input
                  value={tmQuery}
                  onChange={(e) => setTmQuery(e.target.value)}
                  placeholder="목록 필터"
                  aria-label="기술머신 목록 필터"
                />
              </div>
              <div className="flex flex-col gap-2">
                {(current.tutorMoves || []).length === 0 && (
                  <p className="text-sm text-[var(--color-muted)]">기술머신으로 배우는 기술이 없습니다.</p>
                )}
                {(current.tutorMoves || [])
                  .map((move, i) => ({ move, i }))
                  .filter(({ move }) => {
                    const n = tmQuery.trim().toLowerCase();
                    if (!n) return true;
                    const mv = moves.find((m) => m.internalName === move);
                    return (
                      move.toLowerCase().includes(n) ||
                      (mv?.name || "").toLowerCase().includes(n) ||
                      (TYPE_KO[mv?.type || ""] || "").includes(n)
                    );
                  })
                  .map(({ move, i }) => {
                    const mv = moves.find((m) => m.internalName === move);
                    return (
                      <div
                        key={`${move}-${i}`}
                        className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-raised)] px-3 py-2"
                      >
                        <span className="min-w-0 flex-1 truncate text-sm">{mv?.name || move}</span>
                        <span className="hidden font-mono text-[11px] text-[var(--color-subtle)] sm:inline">
                          {move}
                        </span>
                        {mv && <TypeChip type={mv.type} />}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-11"
                          aria-label="기술머신 삭제"
                          onClick={() => removeTutorMove(current.internalName, i)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    );
                  })}
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-sm font-medium">
                  소지 도구
                  <span className="ml-2 font-mono text-xs text-[var(--color-subtle)]">
                    {(current.wildItems || []).length}
                  </span>
                </h3>
              </div>
              <p className="mb-3 text-xs text-[var(--color-muted)]">
                야생에서 만날 때 들고 나오는 도구입니다. 게임 확률은 흔함 50% · 드묾 5% · 희귀 1%이며, 같은 도구를
                항상으로 두면 100%입니다.
              </p>
              <div className="mb-3">
                <SearchSelect
                  value=""
                  onChange={(v) => {
                    if (v) addWildItem(current.internalName, v, 5);
                  }}
                  options={holdOptions}
                  placeholder="소지 도구 검색 · 추가"
                  aria-label="소지 도구 추가"
                />
              </div>
              <div className="flex flex-col gap-2">
                {(current.wildItems || []).length === 0 && (
                  <p className="text-sm text-[var(--color-muted)]">야생에서 도구를 들고 나오지 않습니다.</p>
                )}
                {(current.wildItems || []).map((row, i) => {
                  const chance = snapWildChance(row.chance);
                  const extraChance = ![1, 5, 50, 100].includes(Number(row.chance));
                  return (
                    <div
                      key={`${row.item}-${i}`}
                      className="grid grid-cols-1 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-raised)] p-2 sm:grid-cols-[minmax(0,1fr)_160px_auto]"
                    >
                      <SearchSelect
                        value={row.item}
                        onChange={(v) => patchWildItem(current.internalName, i, { item: v })}
                        options={holdOptions}
                        aria-label="소지 도구"
                      />
                      <NativeSelect
                        value={String(extraChance ? row.chance : chance)}
                        onChange={(e) =>
                          patchWildItem(current.internalName, i, { chance: Number(e.target.value) || 5 })
                        }
                        aria-label="소지 확률"
                      >
                        {extraChance && (
                          <option value={row.chance}>
                            {row.chance}% → {chance}%로 저장
                          </option>
                        )}
                        {WILD_CHANCE_PRESETS.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </NativeSelect>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-11"
                        aria-label="소지 도구 삭제"
                        onClick={() => removeWildItem(current.internalName, i)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium">진화</h3>
                <Button type="button" variant="outline" size="sm" onClick={() => addEvolution(current.internalName)}>
                  <Plus className="size-4" />
                  추가
                </Button>
              </div>
              {current.evolutions.length === 0 && (
                <p className="text-sm text-[var(--color-muted)]">진화하지 않습니다.</p>
              )}
              <div className="flex flex-col gap-2">
                {current.evolutions.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 gap-2 rounded-[var(--radius-md)] bg-[var(--color-raised)] p-2 sm:grid-cols-[1fr_140px_120px_auto]"
                  >
                    <Input
                      list="redforge-species"
                      value={row.target}
                      className="font-mono"
                      placeholder="진화 대상 ID"
                      onChange={(e) => patchEvolution(current.internalName, i, { target: e.target.value.toUpperCase() })}
                    />
                    <NativeSelect
                      value={row.method}
                      onChange={(e) => patchEvolution(current.internalName, i, { method: e.target.value })}
                    >
                      {!EVO_METHODS.includes(row.method as (typeof EVO_METHODS)[number]) && (
                        <option value={row.method}>{row.method}</option>
                      )}
                      {EVO_METHODS.map((m) => (
                        <option key={m} value={m}>
                          {EVO_KO[m] ?? m}
                        </option>
                      ))}
                    </NativeSelect>
                    <Input
                      value={row.param}
                      placeholder={row.method === "Level" ? "레벨" : "값"}
                      onChange={(e) => patchEvolution(current.internalName, i, { param: e.target.value })}
                    />
                    <div className="flex items-center gap-1">
                      {row.reverse && (
                        <span className="text-[10px] tracking-wide text-[var(--color-subtle)]">역</span>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="진화 삭제"
                        onClick={() => removeEvolution(current.internalName, i)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <datalist id="redforge-species">
              {species.map((s) => (
                <option key={s.internalName} value={s.internalName}>
                  {s.name}
                </option>
              ))}
            </datalist>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center p-10 text-sm text-[var(--color-muted)]">종족이 없습니다.</div>
      )}
    </div>
  );
}
