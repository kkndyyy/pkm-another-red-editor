import { useEffect, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface SearchOption {
  value: string;
  label: string;
  hint?: string;
}

let closeOpen: (() => void) | null = null;

export function SearchSelect({
  value,
  onChange,
  options,
  placeholder = "이름 · ID 검색",
  allowEmpty = false,
  emptyLabel = "없음",
  emptyValue = "",
  "aria-label": ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SearchOption[];
  placeholder?: string;
  allowEmpty?: boolean;
  emptyLabel?: string;
  emptyValue?: string;
  "aria-label"?: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [hi, setHi] = useState(0);
  const [box, setBox] = useState({ top: 0, left: 0, width: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const setters = useRef({ setOpen, setQ });
  setters.current = { setOpen, setQ };
  const selfClose = useRef(() => {
    setters.current.setOpen(false);
    setters.current.setQ("");
    if (closeOpen === selfClose.current) closeOpen = null;
  });

  const selected = options.find((o) => o.value === value);
  const display = selected?.label || (value && value !== emptyValue ? value : "");

  const filtered = useMemo(() => {
    const extra: SearchOption[] = allowEmpty ? [{ value: emptyValue, label: emptyLabel }] : [];
    const pool = extra.concat(options);
    const needle = q.trim().toLowerCase();
    const list = needle
      ? pool.filter(
          (o) =>
            o.label.toLowerCase().includes(needle) ||
            o.value.toLowerCase().includes(needle) ||
            (o.hint && o.hint.toLowerCase().includes(needle)),
        )
      : pool;
    return list.slice(0, 80);
  }, [q, options, allowEmpty, emptyLabel, emptyValue]);

  function measure() {
    const el = inputRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setBox({ top: r.bottom + 4, left: r.left, width: r.width });
  }

  useLayoutEffect(() => {
    if (!open) return;
    measure();
    const onWin = () => measure();
    window.addEventListener("resize", onWin);
    window.addEventListener("scroll", onWin, true);
    return () => {
      window.removeEventListener("resize", onWin);
      window.removeEventListener("scroll", onWin, true);
    };
  }, [open]);

  useEffect(() => {
    setHi(0);
  }, [q, open]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector("[data-hi='true']");
    el?.scrollIntoView({ block: "nearest" });
  }, [hi, filtered, open]);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      const t = e.target as Node;
      if (wrapRef.current?.contains(t) || listRef.current?.contains(t)) return;
      selfClose.current();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  function openList(nextQ: string) {
    if (closeOpen && closeOpen !== selfClose.current) closeOpen();
    const el = inputRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      setBox({ top: r.bottom + 4, left: r.left, width: r.width });
    }
    setQ(nextQ);
    setOpen(true);
    closeOpen = selfClose.current;
  }

  function pick(next: string) {
    onChange(next);
    setQ("");
    setOpen(false);
    if (closeOpen === selfClose.current) closeOpen = null;
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.stopPropagation();
      if (!open) {
        openList(display);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) openList(q);
      setHi((n) => Math.min(Math.max(filtered.length - 1, 0), n + 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((n) => Math.max(0, n - 1));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const hit = filtered[hi];
      if (hit) pick(hit.value);
      else if (q.trim()) {
        const exact =
          options.find((o) => o.value.toLowerCase() === q.trim().toLowerCase()) ||
          options.find((o) => o.label === q.trim());
        pick(exact?.value ?? q.trim().toUpperCase());
      }
      return;
    }
    if (e.key === "Escape") {
      setOpen(false);
      setQ("");
    }
  }

  return (
    <div ref={wrapRef} className="relative w-full">
      <input
        ref={inputRef}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-autocomplete="list"
        autoComplete="off"
        spellCheck={false}
        role="combobox"
        value={open ? q : display}
        placeholder={placeholder}
        onChange={(e) => {
          openList(e.target.value);
        }}
        onFocus={() => {
          if (!open) openList("");
        }}
        onBlur={() => {
          window.setTimeout(() => {
            if (wrapRef.current?.contains(document.activeElement) || listRef.current?.contains(document.activeElement)) return;
            selfClose.current();
          }, 0);
        }}
        onKeyDown={onKeyDown}
        className="h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-fg)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--color-subtle)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30"
      />
      {open &&
        createPortal(
          <div
            ref={listRef}
            role="listbox"
            style={{ top: box.top, left: box.left, width: Math.max(box.width, 160) }}
            className="fixed z-50 max-h-64 overflow-y-auto rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1"
          >
            {filtered.length === 0 && (
              <p className="px-3 py-2 text-sm text-[var(--color-muted)]">검색 결과가 없습니다.</p>
            )}
            {filtered.map((o, i) => {
              const active = i === hi;
              return (
                <button
                  key={`${o.value}-${i}`}
                  type="button"
                  tabIndex={-1}
                  role="option"
                  aria-selected={o.value === value}
                  data-hi={active ? "true" : "false"}
                  onMouseEnter={() => setHi(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(o.value)}
                  className={cn(
                    "flex w-full items-baseline gap-2 rounded-[var(--radius-xs)] px-3 py-2 text-left text-sm",
                    active ? "bg-[var(--color-raised)]" : "hover:bg-[var(--color-raised)]/60",
                  )}
                >
                  <span className="min-w-0 flex-1 truncate">{o.label}</span>
                  {o.hint && o.hint !== o.label && (
                    <span className="shrink-0 font-mono text-xs text-[var(--color-subtle)]">{o.hint}</span>
                  )}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}
