import { TYPE_KO, TYPE_TONE } from "@/lib/editor/constants";
import { cn } from "@/lib/utils";

export function TypeChip({ type, className }: { type: string; className?: string }) {
  const tone = TYPE_TONE[type] ?? "var(--type-normal)";
  return (
    <span
      className={cn(
        "inline-flex h-6 min-w-11 items-center justify-center rounded-full px-2 text-[11px] font-medium tracking-wide text-[#0c0a0a]",
        className,
      )}
      style={{ background: tone }}
    >
      {TYPE_KO[type] ?? type}
    </span>
  );
}
