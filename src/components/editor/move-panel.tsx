import { CATEGORY_KO, FLAG_HELP, FUNCTION_CODES, TYPE_KO, typeQueryHit } from "@/lib/editor/constants";
import { useEditor, useIssues } from "@/lib/editor/store";
import { CATEGORIES, TYPES } from "@/lib/editor/types";
import { issuesFor } from "@/lib/editor/validate";
import { Field, NativeSelect } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TypeChip } from "./type-chip";
import { TypeFilter } from "./type-filter";

export function MovePanel() {
  const moves = useEditor((s) => s.moves);
  const species = useEditor((s) => s.species);
  const selected = useEditor((s) => s.selectedMove);
  const query = useEditor((s) => s.query);
  const typeFilter = useEditor((s) => s.typeFilter);
  const setTypeFilter = useEditor((s) => s.setTypeFilter);
  const selectMove = useEditor((s) => s.selectMove);
  const selectSpecies = useEditor((s) => s.selectSpecies);
  const patchMove = useEditor((s) => s.patchMove);
  const issues = useIssues();

  const q = query.trim().toLowerCase();
  const list = moves.filter((m) => {
    if (!typeQueryHit(m.type, typeFilter, "")) return false;
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.internalName.toLowerCase().includes(q) ||
      typeQueryHit(m.type, "", q)
    );
  });
  const current = moves.find((m) => m.internalName === selected) ?? list[0];
  const mine = current ? issuesFor(issues, "move", current.internalName) : [];
  const learners = current
    ? species.filter((s) => s.levelMoves.some((lm) => lm.move === current.internalName))
    : [];
  const tmLearners = current
    ? species.filter((s) => (s.tutorMoves || []).includes(current.internalName) && !/_\d+$/.test(s.internalName))
    : [];

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="flex max-h-64 min-h-0 flex-col overflow-hidden border-b border-[var(--color-border)] lg:max-h-none lg:border-r lg:border-b-0">
        <div className="p-3 text-xs text-[var(--color-muted)]">
          {list.length} / {moves.length}
        </div>
        <TypeFilter value={typeFilter} onChange={setTypeFilter} />
        <div className="min-h-0 flex-1 overflow-y-auto">
          {list.map((m) => {
            const active = current?.internalName === m.internalName;
            return (
              <button
                key={m.internalName}
                type="button"
                onClick={() => selectMove(m.internalName)}
                className={`flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-left transition-colors duration-150 ${
                  active
                    ? "border-[var(--color-accent)] bg-[var(--color-raised)]"
                    : "border-transparent hover:bg-[var(--color-raised)]/60"
                }`}
              >
                <TypeChip type={m.type} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{m.name}</span>
                  <span className="block font-mono text-[11px] text-[var(--color-subtle)]">
                    {CATEGORY_KO[m.category]} · {m.power || "—"} / {m.accuracy || "필중"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {current ? (
        <div className="min-h-0 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-8">
            <header>
              <div className="flex flex-wrap items-center gap-2">
                <TypeChip type={current.type} />
                <span className="text-xs text-[var(--color-muted)]">{CATEGORY_KO[current.category]}</span>
              </div>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">{current.name}</h2>
              <p className="font-mono text-xs text-[var(--color-muted)]">{current.internalName}</p>
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
              <Field label="이름">
                <Input value={current.name} onChange={(e) => patchMove(current.internalName, { name: e.target.value })} />
              </Field>
              <Field label="내부 ID">
                <Input
                  className="font-mono uppercase"
                  value={current.internalName}
                  onChange={(e) => patchMove(current.internalName, { internalName: e.target.value.toUpperCase() })}
                />
              </Field>
              <Field label="타입">
                <NativeSelect
                  value={current.type}
                  onChange={(e) => patchMove(current.internalName, { type: e.target.value })}
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {TYPE_KO[t]}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
              <Field label="분류">
                <NativeSelect
                  value={current.category}
                  onChange={(e) =>
                    patchMove(current.internalName, { category: e.target.value as typeof current.category })
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {CATEGORY_KO[c]}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
              <Field label="위력">
                <Input
                  type="number"
                  min={0}
                  max={250}
                  value={current.power}
                  onChange={(e) => patchMove(current.internalName, { power: Number(e.target.value) || 0 })}
                />
              </Field>
              <Field label="명중 (0 = 필중)">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={current.accuracy}
                  onChange={(e) => patchMove(current.internalName, { accuracy: Number(e.target.value) || 0 })}
                />
              </Field>
              <Field label="PP">
                <Input
                  type="number"
                  min={1}
                  max={64}
                  value={current.pp}
                  onChange={(e) => patchMove(current.internalName, { pp: Number(e.target.value) || 0 })}
                />
              </Field>
              <Field label="우선도">
                <Input
                  type="number"
                  min={-7}
                  max={7}
                  value={current.priority}
                  onChange={(e) => patchMove(current.internalName, { priority: Number(e.target.value) || 0 })}
                />
              </Field>
              <Field label="부가효과" className="sm:col-span-2">
                <NativeSelect
                  value={
                    FUNCTION_CODES.some((f) => f.code === current.functionCode)
                      ? current.functionCode
                      : "__custom"
                  }
                  onChange={(e) => {
                    if (e.target.value === "__custom") return;
                    patchMove(current.internalName, { functionCode: e.target.value });
                  }}
                >
                  {FUNCTION_CODES.map((f) => (
                    <option key={f.code} value={f.code}>
                      {f.label}
                    </option>
                  ))}
                  {!FUNCTION_CODES.some((f) => f.code === current.functionCode) && (
                    <option value="__custom">원본 코드: {current.functionCode}</option>
                  )}
                </NativeSelect>
              </Field>
              <Field label="부가효과 코드 (고급)">
                <Input
                  className="font-mono"
                  value={current.functionCode}
                  onChange={(e) => patchMove(current.internalName, { functionCode: e.target.value })}
                />
              </Field>
              <Field label="부가효과 확률 %">
                <Input
                  type="number"
                  min={0}
                  max={255}
                  value={current.effectChance}
                  onChange={(e) => patchMove(current.internalName, { effectChance: Number(e.target.value) || 0 })}
                />
              </Field>
              <Field label={`플래그  ${FLAG_HELP}`} className="sm:col-span-2">
                <Input
                  className="font-mono"
                  value={current.flags}
                  onChange={(e) => patchMove(current.internalName, { flags: e.target.value })}
                />
              </Field>
              <Field label="설명" className="sm:col-span-2">
                <Textarea
                  value={current.description}
                  onChange={(e) => patchMove(current.internalName, { description: e.target.value })}
                />
              </Field>
            </section>

            <section>
              <h3 className="mb-3 text-sm font-medium">레벨업으로 배우는 종족</h3>
              {learners.length === 0 ? (
                <p className="text-sm text-[var(--color-muted)]">레벨업으로 배우는 종족이 없습니다.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {learners.slice(0, 36).map((s) => {
                    const lv = s.levelMoves.find((lm) => lm.move === current.internalName)?.level;
                    return (
                      <button
                        key={s.internalName}
                        type="button"
                        onClick={() => selectSpecies(s.internalName)}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-raised)] px-3 py-1.5 text-sm hover:border-[var(--color-accent)]"
                      >
                        {s.name}
                        <span className="ml-1.5 font-mono text-xs text-[var(--color-subtle)]">Lv.{lv}</span>
                      </button>
                    );
                  })}
                  {learners.length > 36 && (
                    <span className="self-center text-xs text-[var(--color-subtle)]">+{learners.length - 36}</span>
                  )}
                </div>
              )}
            </section>

            <section>
              <h3 className="mb-3 text-sm font-medium">기술머신으로 배우는 종족</h3>
              {tmLearners.length === 0 ? (
                <p className="text-sm text-[var(--color-muted)]">기술머신으로 배우는 종족이 없습니다.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tmLearners.slice(0, 36).map((s) => (
                    <button
                      key={s.internalName}
                      type="button"
                      onClick={() => selectSpecies(s.internalName)}
                      className="rounded-full border border-[var(--color-border)] bg-[var(--color-raised)] px-3 py-1.5 text-sm hover:border-[var(--color-accent)]"
                    >
                      {s.name}
                    </button>
                  ))}
                  {tmLearners.length > 36 && (
                    <span className="self-center text-xs text-[var(--color-subtle)]">+{tmLearners.length - 36}</span>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center p-10 text-sm text-[var(--color-muted)]">기술이 없습니다.</div>
      )}
    </div>
  );
}
