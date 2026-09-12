import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import {
  DEBUG_GROUP_KO,
  DEBUG_ITEMS,
  DEBUG_KIND_KO,
  debugMatch,
  type DebugKind,
} from "@/lib/editor/debug-catalog";
import { buildDebugKoPluginZip } from "@/lib/editor/plugin";
import { useEditor } from "@/lib/editor/store";
import { Button } from "@/components/ui/button";

const KINDS: DebugKind[] = ["debug", "pokemon", "battle", "battle_pokemon"];

function downloadBytes(filename: string, data: Uint8Array) {
  const copy = new ArrayBuffer(data.byteLength);
  new Uint8Array(copy).set(data);
  const blob = new Blob([copy], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function DebugPanel() {
  const query = useEditor((s) => s.query);
  const enableDebugKo = useEditor((s) => s.enableDebugKo);
  const setEnableDebugKo = useEditor((s) => s.setEnableDebugKo);
  const [kind, setKind] = useState<DebugKind>("debug");
  const [parent, setParent] = useState("main");
  const q = query.trim();
  const searching = q.length > 0;

  const filtered = useMemo(() => {
    if (searching) return DEBUG_ITEMS.filter((item) => debugMatch(item, q));
    return DEBUG_ITEMS.filter((item) => item.kind === kind && item.parent === parent);
  }, [kind, parent, q, searching]);

  const groups = useMemo(() => {
    const ids = new Set(DEBUG_ITEMS.filter((item) => item.kind === kind).map((item) => item.parent));
    return ["main", ...[...ids].filter((id) => id !== "main")];
  }, [kind]);

  function savePlugin() {
    downloadBytes("RedforgeDebugKO.zip", buildDebugKoPluginZip());
    toast.success("디버그 한글·검색 플러그인을 저장했습니다. 게임 폴더에 압축을 푼 뒤 Ctrl을 누른 채로 실행하세요.");
  }

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="flex max-h-64 min-h-0 flex-col overflow-hidden border-b border-[var(--color-border)] lg:max-h-none lg:border-r lg:border-b-0">
        <div className="flex flex-wrap gap-1 p-3">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setKind(k);
                setParent("main");
              }}
              className={`h-9 rounded-full px-3 text-sm ${
                kind === k && !searching
                  ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
                  : "bg-[var(--color-raised)] text-[var(--color-muted)] hover:text-[var(--color-fg)]"
              }`}
            >
              {DEBUG_KIND_KO[k]}
            </button>
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {groups.map((g) => {
            const active = !searching && parent === g;
            const n = DEBUG_ITEMS.filter((item) => item.kind === kind && item.parent === g).length;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setParent(g)}
                className={`flex w-full items-center justify-between gap-2 border-l-2 px-3 py-2.5 text-left ${
                  active
                    ? "border-[var(--color-accent)] bg-[var(--color-raised)]"
                    : "border-transparent hover:bg-[var(--color-raised)]/60"
                }`}
              >
                <span className="truncate text-sm font-medium">{DEBUG_GROUP_KO[g] || g}</span>
                <span className="font-mono text-[11px] text-[var(--color-subtle)]">{n}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="min-h-0 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <header className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-[var(--color-subtle)]">게임 F9</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight">디버그 메뉴</h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--color-muted)]">
                게임 안 디버그 화면을 한글로 바꾸고, 메뉴와 포켓몬·기술·도구 목록에서 F 키로 검색합니다. 위 검색창에서
                메뉴 이름을 미리 찾아볼 수 있습니다.
              </p>
            </div>
            <Button type="button" variant={enableDebugKo ? "default" : "outline"} onClick={savePlugin}>
              <Download className="size-4" />
              플러그인
            </Button>
          </header>

          <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
            <input
              type="checkbox"
              checked={enableDebugKo}
              onChange={(e) => setEnableDebugKo(e.target.checked)}
              className="mt-1 size-4 accent-[var(--color-accent)]"
            />
            <span>
              <span className="block text-sm font-medium">게임에 디버그 한글 · 검색 넣기</span>
              <span className="mt-1 block text-sm text-[var(--color-muted)]">
                켜 두면 파일 탭에서 게임에 넣을 파일을 저장할 때 이 플러그인도 함께 내려갑니다. 게임 폴더에 압축을 푼 뒤
                Ctrl을 누른 채로 실행하세요. F9 메뉴가 한글이 되고, F 키로 검색합니다.
              </span>
            </span>
          </label>

          <p className="text-xs text-[var(--color-subtle)]">
            {searching
              ? `"${q}" · ${filtered.length}개`
              : `${DEBUG_KIND_KO[kind]} · ${DEBUG_GROUP_KO[parent] || parent} · ${filtered.length}개`}
          </p>

          {filtered.length === 0 && (
            <p className="text-sm text-[var(--color-muted)]">검색 결과가 없습니다. 한글 이름이나 영문 메뉴명으로 찾아 보세요.</p>
          )}

          <ul className="flex flex-col gap-2">
            {filtered.map((item) => (
              <li
                key={`${item.kind}-${item.id}`}
                className="rounded-[var(--radius-md)] bg-[var(--color-raised)] px-4 py-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium">{item.ko}</p>
                  <p className="font-mono text-[11px] text-[var(--color-subtle)]">{item.en}</p>
                </div>
                {item.descKo && <p className="mt-1 text-sm text-[var(--color-muted)]">{item.descKo}</p>}
                {searching && (
                  <p className="mt-1 text-[11px] text-[var(--color-subtle)]">
                    {DEBUG_KIND_KO[item.kind]} · {DEBUG_GROUP_KO[item.parent] || item.parent}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
