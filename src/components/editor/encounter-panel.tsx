import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ENCOUNTER_TYPE_KO } from "@/lib/editor/constants";
import { ENCOUNTER_TYPES } from "@/lib/editor/types";
import { useEditor } from "@/lib/editor/store";
import { Button } from "@/components/ui/button";
import { Field, NativeSelect } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SearchSelect } from "./search-select";
import { TypeChip } from "./type-chip";

function slotShare(chance: number | undefined, total: number) {
  if (!total || chance == null) return null;
  const pct = (chance / total) * 100;
  const rounded = Math.round(pct * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export function EncounterPanel() {
  const species = useEditor((s) => s.species);
  const encounters = useEditor((s) => s.encounters);
  const isSample = useEditor((s) => s.encountersIsSample);
  const selected = useEditor((s) => s.selectedEncounter);
  const query = useEditor((s) => s.query);
  const selectEncounter = useEditor((s) => s.selectEncounter);
  const loadSampleEncounters = useEditor((s) => s.loadSampleEncounters);
  const patchEncounter = useEditor((s) => s.patchEncounter);
  const addEncounterArea = useEditor((s) => s.addEncounterArea);
  const removeEncounterArea = useEditor((s) => s.removeEncounterArea);
  const addEncounterSlot = useEditor((s) => s.addEncounterSlot);
  const removeEncounterSlot = useEditor((s) => s.removeEncounterSlot);
  const patchEncounterSlot = useEditor((s) => s.patchEncounterSlot);
  const setEncounterTypeChance = useEditor((s) => s.setEncounterTypeChance);
  const addEncounterType = useEditor((s) => s.addEncounterType);
  const removeEncounterType = useEditor((s) => s.removeEncounterType);

  const q = query.trim().toLowerCase();
  const list = encounters.filter((a) => {
    if (!q) return true;
    if (a.label.toLowerCase().includes(q) || String(a.mapId).includes(q) || a.key.includes(q)) return true;
    return Object.values(a.slots).some((rows) =>
      rows.some((r) => {
        const sp = species.find((s) => s.internalName === r.species);
        return r.species.toLowerCase().includes(q) || (sp?.name || "").toLowerCase().includes(q);
      }),
    );
  });
  const current = encounters.find((a) => a.key === selected) ?? list[0];
  const types = current ? Object.keys(current.slots) : [];
  const [kind, setKind] = useState(types[0] || "Land");
  const activeKind = current && current.slots[kind] ? kind : types[0] || "Land";
  const rows = current?.slots[activeKind] || [];
  const totalChance = rows.reduce((sum, r) => sum + (r.chance ?? 0), 0);
  const speciesOptions = useMemo(
    () => species.map((s) => ({ value: s.internalName, label: s.name, hint: s.internalName })),
    [species],
  );
  const unusedTypes = ENCOUNTER_TYPES.filter((t) => current && !current.slots[t]);

  if (encounters.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="max-w-md">
          <h2 className="font-display text-2xl font-semibold">야생 출현</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            출현 데이터가 없습니다. 게임 Data의 encounters.dat를 넣거나 샘플 도로로 구성을 연습할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button type="button" onClick={() => loadSampleEncounters()}>
            샘플 도로 불러오기
          </Button>
          <Button type="button" variant="outline" onClick={() => addEncounterArea()}>
            빈 맵 추가
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="flex max-h-64 min-h-0 shrink-0 flex-col overflow-hidden border-b border-[var(--color-border)] lg:h-full lg:max-h-none lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between gap-2 p-3 text-xs text-[var(--color-muted)]">
          <span>
            {list.length} / {encounters.length}
          </span>
          <Button type="button" variant="ghost" size="sm" onClick={() => addEncounterArea()}>
            <Plus className="size-4" />
            장소
          </Button>
        </div>
        <div className="list-scroll">
          {list.map((a) => {
            const active = current?.key === a.key;
            const n = Object.values(a.slots).reduce((sum, r) => sum + r.length, 0);
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => selectEncounter(a.key)}
                className={`flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-left transition-colors duration-150 ${
                  active
                    ? "border-[var(--color-accent)] bg-[var(--color-raised)]"
                    : "border-transparent hover:bg-[var(--color-raised)]/60"
                }`}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{a.label}</span>
                  <span className="block truncate text-[11px] text-[var(--color-subtle)]">
                    {n}마리 · {Object.keys(a.slots).map((t) => ENCOUNTER_TYPE_KO[t] || t).join(" · ")}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {current ? (
        <div className="min-h-0 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {isSample && (
              <p className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-raised)] px-4 py-3 text-sm text-[var(--color-muted)]">
                샘플 도로입니다. 실제 출현을 고치려면 파일 탭에서 원본으로 리셋하거나 encounters.dat를 넣으세요.
              </p>
            )}
            <header className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-[var(--color-subtle)]">맵 {current.mapId}</p>
                <h2 className="font-display text-3xl font-semibold tracking-tight">{current.label}</h2>
              </div>
              <Button type="button" variant="ghost" onClick={() => removeEncounterArea(current.key)}>
                <Trash2 className="size-4" />
                이 장소 삭제
              </Button>
            </header>

            <section className="grid gap-4 sm:grid-cols-3">
              <Field label="장소 이름">
                <Input
                  value={current.label}
                  onChange={(e) => patchEncounter(current.key, { label: e.target.value })}
                />
              </Field>
              <Field label="맵 번호">
                <Input
                  type="number"
                  min={1}
                  value={current.mapId}
                  onChange={(e) =>
                    patchEncounter(current.key, { mapId: Math.max(1, Number(e.target.value) || 1) })
                  }
                />
              </Field>
              <Field label="버전">
                <Input
                  type="number"
                  min={0}
                  value={current.version}
                  onChange={(e) =>
                    patchEncounter(current.key, { version: Math.max(0, Number(e.target.value) || 0) })
                  }
                />
              </Field>
            </section>

            <div className="flex flex-wrap gap-1">
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setKind(t)}
                  className={`h-9 rounded-full px-3 text-sm ${
                    activeKind === t
                      ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
                      : "bg-[var(--color-raised)] text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                  }`}
                >
                  {ENCOUNTER_TYPE_KO[t] || t}
                  <span className="ml-1.5 font-mono text-[11px] opacity-80">
                    {current.slots[t]?.length || 0}
                  </span>
                </button>
              ))}
            </div>

            {unusedTypes.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <NativeSelect
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      addEncounterType(current.key, e.target.value);
                      setKind(e.target.value);
                    }
                  }}
                >
                  <option value="">출현 종류 추가</option>
                  {unusedTypes.map((t) => (
                    <option key={t} value={t}>
                      {ENCOUNTER_TYPE_KO[t] || t}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            )}

            {types.length > 0 && (
              <section className="flex flex-col gap-3">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <Field label={`${ENCOUNTER_TYPE_KO[activeKind] || activeKind} 발걸음 확률`}>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={current.stepChances[activeKind] ?? 0}
                      onChange={(e) =>
                        setEncounterTypeChance(current.key, activeKind, Number(e.target.value) || 0)
                      }
                    />
                  </Field>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addEncounterSlot(current.key, activeKind)}
                    >
                      <Plus className="size-4" />
                      슬롯
                    </Button>
                    {types.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          removeEncounterType(current.key, activeKind);
                          setKind(types.find((t) => t !== activeKind) || "Land");
                        }}
                      >
                        이 종류 삭제
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-xs text-[var(--color-subtle)]">
                  슬롯 확률은 상대 비율입니다. 합이 100이면 퍼센트와 같고, 게임은 합계 대비로 뽑습니다.
                  {totalChance > 0 && (
                    <span className="ml-1 font-mono text-[var(--color-muted)]">합계 {totalChance}</span>
                  )}
                </p>
                {rows.length === 0 && (
                  <p className="text-sm text-[var(--color-muted)]">이 종류의 출현이 없습니다.</p>
                )}
                {rows.length > 0 && (
                  <div className="hidden grid-cols-[minmax(0,1fr)_4.5rem_4.5rem_4.5rem_auto] gap-2 px-2 text-[11px] text-[var(--color-subtle)] sm:grid">
                    <span>포켓몬</span>
                    <span>확률</span>
                    <span>최소</span>
                    <span>최대</span>
                    <span />
                  </div>
                )}
                {rows.map((row, i) => {
                  const sp = species.find((s) => s.internalName === row.species);
                  const share = slotShare(row.chance, totalChance);
                  return (
                    <div
                      key={`${row.species}-${i}`}
                      className="grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem_4.5rem_auto] items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-raised)] p-2"
                    >
                      <SearchSelect
                        value={row.species}
                        onChange={(v) =>
                          patchEncounterSlot(current.key, activeKind, i, { species: v })
                        }
                        options={speciesOptions}
                        aria-label="출현 포켓몬"
                      />
                      <div className="flex flex-col">
                        <Input
                          type="number"
                          min={0}
                          max={1000}
                          value={row.chance ?? 0}
                          aria-label="출현 확률"
                          onChange={(e) =>
                            patchEncounterSlot(current.key, activeKind, i, {
                              chance: Math.max(0, Number(e.target.value) || 0),
                            })
                          }
                        />
                        {share != null && (
                          <span className="mt-0.5 text-center font-mono text-[10px] text-[var(--color-subtle)]">
                            {share}%
                          </span>
                        )}
                      </div>
                      <Input
                        type="number"
                        min={1}
                        max={100}
                        value={row.min}
                        aria-label="최소 레벨"
                        onChange={(e) =>
                          patchEncounterSlot(current.key, activeKind, i, {
                            min: Number(e.target.value) || 1,
                          })
                        }
                      />
                      <Input
                        type="number"
                        min={1}
                        max={100}
                        value={row.max}
                        aria-label="최대 레벨"
                        onChange={(e) =>
                          patchEncounterSlot(current.key, activeKind, i, {
                            max: Number(e.target.value) || 1,
                          })
                        }
                      />
                      <div className="flex items-center gap-1">
                        {sp?.types[0] && <TypeChip type={sp.types[0]} />}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-11"
                          aria-label="슬롯 삭제"
                          onClick={() => removeEncounterSlot(current.key, activeKind, i)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </section>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center p-10 text-sm text-[var(--color-muted)]">
          출현 장소가 없습니다.
        </div>
      )}
    </div>
  );
}
