import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Toaster } from "sonner";
import { useEditor, useIssues, bootEditor, watchPersist } from "@/lib/editor/store";
import { registerOfflineWorker } from "@/lib/editor/register-sw";
import { Input } from "@/components/ui/input";
import { SpeciesPanel } from "./species-panel";
import { MovePanel } from "./move-panel";
import { FilesPanel } from "./files-panel";
import { EncounterPanel } from "./encounter-panel";
import { DebugPanel } from "./debug-panel";
import { OfflineBadge } from "./offline-badge";
import type { TabId } from "@/lib/editor/store";

const TABS: { id: TabId; label: string }[] = [
  { id: "species", label: "종족" },
  { id: "moves", label: "기술" },
  { id: "encounters", label: "야생" },
  { id: "debug", label: "디버그" },
  { id: "files", label: "파일" },
];

export function AppShell() {
  const hydrateFromStorage = useEditor((s) => s.hydrateFromStorage);
  const loadBundled = useEditor((s) => s.loadBundled);
  useEffect(() => {
    registerOfflineWorker();
    void bootEditor();
    return watchPersist();
  }, [hydrateFromStorage, loadBundled]);

  const tab = useEditor((s) => s.tab);
  const setTab = useEditor((s) => s.setTab);
  const query = useEditor((s) => s.query);
  const setQuery = useEditor((s) => s.setQuery);
  const sourceLabel = useEditor((s) => s.sourceLabel);
  const ready = useEditor((s) => s.ready);
  const hasData = useEditor((s) => s.species.length > 50);
  const loadError = useEditor((s) => s.loadError);
  const issues = useIssues();
  const errN = issues.filter((i) => i.level === "error").length;
  const stayed = useRef(false);
  const showEditor = ready || hasData;
  if (showEditor) stayed.current = true;
  const visible = showEditor || stayed.current;

  const placeholder =
    tab === "species"
      ? "번호 · 이름 · 타입 · 도구"
      : tab === "moves"
        ? "기술 이름 · 타입"
        : tab === "debug"
          ? "메뉴 · 한글 · 영문"
          : "도로 · 맵 · 포켓몬";

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[var(--color-bg)] text-[var(--color-fg)]">
      <Toaster theme="dark" position="bottom-center" toastOptions={{ className: "redforge-toast" }} />
      <header className="z-20 shrink-0 border-b border-[var(--color-border)] bg-[var(--color-bg)]/92 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-[var(--radius-xs)] bg-[var(--color-accent)] text-[var(--color-accent-fg)]">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                <path d="M4 18h16M7 18V9l5-5 5 5v9" stroke="currentColor" strokeWidth="1.7" />
                <path d="M10 18v-4h4v4" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </span>
            <div>
              <p className="font-display text-lg font-semibold leading-tight tracking-tight">레드포지</p>
              <p className="text-[11px] tracking-wide text-[var(--color-muted)]">PBS 없이 Data 파일을 고칩니다</p>
            </div>
          </div>
          <nav className="flex rounded-[var(--radius-md)] bg-[var(--color-raised)] p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`h-9 rounded-[var(--radius-sm)] px-3 text-sm font-medium transition-colors duration-150 ${
                  tab === t.id
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
          {tab !== "files" && (
            <div className="relative min-w-[12rem] flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[var(--color-subtle)]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="pl-9"
              />
            </div>
          )}
          <div className="ml-auto flex items-center gap-3 text-xs text-[var(--color-muted)]">
            {errN > 0 && <span className="text-[var(--color-danger)]">오류 {errN}</span>}
            <span className="hidden max-w-[14rem] truncate sm:inline">{sourceLabel}</span>
            <OfflineBadge />
          </div>
        </div>
      </header>
      {!visible && (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 overflow-y-auto p-10 text-sm text-[var(--color-muted)]">
          <p className="font-display text-2xl text-[var(--color-fg)]">어나더레드 데이터를 열고 있습니다</p>
          <p>PBS 폴더는 배포본에 없습니다. Data/species.dat · moves.dat를 읽습니다.</p>
          {loadError && <p className="text-[var(--color-danger)]">{loadError}</p>}
        </div>
      )}
      {visible && tab === "species" && <SpeciesPanel />}
      {visible && tab === "moves" && <MovePanel />}
      {visible && tab === "encounters" && <EncounterPanel />}
      {visible && tab === "debug" && <DebugPanel />}
      {visible && tab === "files" && <FilesPanel />}
    </div>
  );
}
