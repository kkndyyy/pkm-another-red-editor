import { TYPE_KO, TYPE_TONE } from "@/lib/editor/constants";
import { TYPES } from "@/lib/editor/types";
import { cn } from "@/lib/utils";

export function TypeFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (type: string) => void;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto px-3 pb-2">
      {TYPES.map((t) => {
        const on = value === t;
        return (
          <button
            key={t}
            type="button"
            aria-pressed={on}
            aria-label={`${TYPE_KO[t]} 타입`}
            onClick={() => onChange(on ? "" : t)}
            className={cn(
              "h-8 shrink-0 rounded-full px-2.5 text-[11px] font-medium tracking-wide text-[#0c0a0a] transition-[box-shadow,opacity] duration-150",
              on
                ? "ring-2 ring-[var(--color-accent)] ring-offset-1 ring-offset-[var(--color-bg)]"
                : "opacity-75 hover:opacity-100",
            )}
            style={{ background: TYPE_TONE[t] ?? "var(--type-normal)" }}
          >
            {TYPE_KO[t]}
          </button>
        );
      })}
    </div>
  );
}
