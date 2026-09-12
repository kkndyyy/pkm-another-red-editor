import { STAT_LABELS } from "@/lib/editor/constants";
import type { Species } from "@/lib/editor/types";
import { bst } from "@/lib/editor/pbs";

export function StatBars({ species }: { species: Species }) {
  const total = bst(species);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-medium tracking-wide text-[var(--color-muted)]">종족값</span>
        <span className="font-mono text-sm tabular-nums text-[var(--color-fg)]">합 {total}</span>
      </div>
      {STAT_LABELS.map(({ key, label }) => {
        const v = species.baseStats[key];
        const pct = Math.min(100, (v / 180) * 100);
        return (
          <div key={key} className="grid grid-cols-[52px_1fr_40px] items-center gap-2">
            <span className="text-xs text-[var(--color-muted)]">{label}</span>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--color-bg)]">
              <div
                className="stat-fill h-full rounded-full bg-[var(--color-accent)]"
                style={{ width: `${pct}%`, opacity: 0.45 + (v / 255) * 0.55 }}
              />
            </div>
            <span className="text-right font-mono text-xs tabular-nums">{v}</span>
          </div>
        );
      })}
    </div>
  );
}
