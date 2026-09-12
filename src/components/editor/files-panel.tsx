import { useRef, useState } from "react";
import { toast } from "sonner";
import { Download, FolderOpen, RotateCcw } from "lucide-react";
import { classifyDat } from "@/lib/editor/gamedata";
import {
  exportEncountersDat,
  exportMessagesDat,
  exportMovesDat,
  exportSpeciesDat,
  ensureDats,
} from "@/lib/editor/dat-cache";
import { serializeMovesPbs, serializePokemonPbs } from "@/lib/editor/pbs";
import { buildAllTmsPluginZip, buildDebugKoPluginZip } from "@/lib/editor/plugin";
import { exportWorkspaceJson, useEditor, useIssues } from "@/lib/editor/store";
import { Button } from "@/components/ui/button";
import { OfflineSetupCard } from "./offline-badge";

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

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function classifyPbs(name: string, path: string, text: string): "pokemon" | "moves" | null {
  const n = `${path} ${name}`.toLowerCase();
  if (n.includes("pokemonform")) return null;
  if (/(^|[\\/])pokemon\.txt$/.test(n) || n.includes("pokemon.txt") || n.includes("pokedex")) return "pokemon";
  if (/(^|[\\/])moves\.txt$/.test(n) || (n.includes("move") && n.endsWith(".txt"))) return "moves";
  if (text.includes("[") && /InternalName|BaseStats|Type1/i.test(text)) return "pokemon";
  if (/FunctionCode|TotalPP|Category/i.test(text) || /^[0-9]+,[A-Z]/m.test(text)) return "moves";
  return null;
}

export function FilesPanel() {
  const fileInput = useRef<HTMLInputElement>(null);
  const dirInput = useRef<HTMLInputElement>(null);
  const [dropHint, setDropHint] = useState(false);
  const species = useEditor((s) => s.species);
  const moves = useEditor((s) => s.moves);
  const encounters = useEditor((s) => s.encounters);
  const encountersIsSample = useEditor((s) => s.encountersIsSample);
  const startWithAllTms = useEditor((s) => s.startWithAllTms);
  const setStartWithAllTms = useEditor((s) => s.setStartWithAllTms);
  const enableDebugKo = useEditor((s) => s.enableDebugKo);
  const setEnableDebugKo = useEditor((s) => s.setEnableDebugKo);
  const sourceLabel = useEditor((s) => s.sourceLabel);
  const importTexts = useEditor((s) => s.importTexts);
  const importDat = useEditor((s) => s.importDat);
  const importWorkspaceJson = useEditor((s) => s.importWorkspaceJson);
  const loadBundled = useEditor((s) => s.loadBundled);
  const issues = useIssues();
  const errors = issues.filter((i) => i.level === "error");
  const warns = issues.filter((i) => i.level === "warn");

  async function ingestFiles(files: FileList | File[]) {
    const list = Array.from(files);
    let poke: string | null = null;
    let mv: string | null = null;
    const dats: {
      species?: Uint8Array;
      moves?: Uint8Array;
      abilities?: Uint8Array;
      messages?: Uint8Array;
      encounters?: Uint8Array;
    } = {};
    const msgs: string[] = [];
    for (const f of list) {
      const path = ("webkitRelativePath" in f && f.webkitRelativePath) || f.name;
      const buf = new Uint8Array(await f.arrayBuffer());
      if (/\.json$/i.test(f.name)) {
        const jsonText = new TextDecoder("utf-8").decode(buf);
        if (importWorkspaceJson(jsonText)) {
          msgs.push("작업 백업을 열었습니다");
          continue;
        }
      }
      const datKind = classifyDat(f.name, path, buf);
      if (datKind) {
        dats[datKind] = buf;
        continue;
      }
      const text = new TextDecoder("utf-8").decode(buf);
      const kind = classifyPbs(f.name, path, text);
      if (kind === "pokemon") poke = text;
      if (kind === "moves") mv = text;
    }
    if (dats.species || dats.moves || dats.abilities || dats.messages || dats.encounters) {
      msgs.push(...importDat(dats, "불러온 Data"));
    }
    if (poke || mv) {
      msgs.push(...importTexts(poke, mv, "불러온 텍스트"));
    }
    if (!msgs.length) {
      const names = list
        .slice(0, 8)
        .map((f) => f.name)
        .join(", ");
      toast.error(
        `PBS 폴더는 배포본에 없습니다. 게임 안의 Data 폴더(species.dat, moves.dat, encounters.dat)를 넣어 주세요.${names ? ` 받은 파일: ${names}` : ""}`,
      );
      return;
    }
    toast.success(msgs.join(" · "));
  }

  function savePlugin() {
    downloadBytes("RedforgeAllTMs.zip", buildAllTmsPluginZip());
    toast.success("플러그인을 저장했습니다. 게임 폴더에 압축을 풀면 Plugins/Redforge All TMs가 생깁니다.");
  }

  function saveDebugPlugin() {
    downloadBytes("RedforgeDebugKO.zip", buildDebugKoPluginZip());
    toast.success("디버그 한글·검색 플러그인을 저장했습니다. 게임 폴더에 압축을 푼 뒤 Ctrl을 누른 채로 실행하세요.");
  }

  async function saveDat(kind: "species" | "moves" | "messages" | "encounters") {
    if (kind !== "encounters" && errors.length) {
      toast.error("오류를 고친 뒤 저장하세요.");
      return;
    }
    try {
      await ensureDats();
      if (kind === "species") {
        downloadBytes("species.dat", exportSpeciesDat(species));
        toast.success("species.dat 저장 — 게임 Data 폴더에 덮어쓰세요.");
      } else if (kind === "moves") {
        downloadBytes("moves.dat", exportMovesDat(moves));
        toast.success("moves.dat 저장 — 게임 Data 폴더에 덮어쓰세요.");
      } else if (kind === "encounters") {
        if (!encounters.length) {
          toast.error("저장할 야생 출현이 없습니다.");
          return;
        }
        downloadBytes("encounters.dat", exportEncountersDat(encounters));
        toast.success(
          encountersIsSample
            ? "encounters.dat 저장 — 샘플 맵 번호가 게임과 다를 수 있습니다. Data에 덮어쓰기 전에 확인하세요."
            : "encounters.dat 저장 — 게임 Data 폴더에 덮어쓰세요.",
        );
      } else {
        const bytes = exportMessagesDat(species, moves);
        if (!bytes) {
          toast.error("한국어 이름 파일이 없습니다.");
          return;
        }
        downloadBytes("messages_kor_core.dat", bytes);
        toast.success("messages_kor_core.dat 저장");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "저장에 실패했습니다.");
    }
  }

  async function saveBoth() {
    if (errors.length) {
      toast.error("오류를 고친 뒤 저장하세요.");
      return;
    }
    try {
      await ensureDats();
      downloadBytes("species.dat", exportSpeciesDat(species));
      window.setTimeout(() => downloadBytes("moves.dat", exportMovesDat(moves)), 350);
      let delay = 700;
      if (encounters.length) {
        window.setTimeout(() => downloadBytes("encounters.dat", exportEncountersDat(encounters)), delay);
        delay += 350;
      }
      if (startWithAllTms) {
        window.setTimeout(() => savePlugin(), delay);
        delay += 350;
      }
      if (enableDebugKo) {
        window.setTimeout(() => saveDebugPlugin(), delay);
      }
      toast.success("게임에 넣을 파일을 저장합니다. Data 폴더에 .dat를 덮어쓰세요.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "저장에 실패했습니다.");
    }
  }

  function savePbs() {
    downloadText("pokemon.txt", serializePokemonPbs(species));
    window.setTimeout(() => downloadText("moves.txt", serializeMovesPbs(moves)), 350);
    toast.message("텍스트 백업입니다. 게임은 이 파일을 읽지 않습니다. Data의 .dat만 덮어쓰세요.");
  }

  function saveWorkspaceBackup() {
    try {
      downloadText("redforge-workspace.json", exportWorkspaceJson());
      toast.success("작업 백업을 저장했습니다. 나중에 파일로 다시 넣을 수 있습니다.");
    } catch {
      toast.error("백업을 만들지 못했습니다.");
    }
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header>
          <h2 className="font-display text-3xl font-semibold tracking-tight">파일</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            어나더레드 배포본에는 PBS 폴더가 없습니다. 종족·기술 값은 게임 폴더{" "}
            <span className="font-mono text-[var(--color-fg)]">Data/species.dat</span>,{" "}
            <span className="font-mono text-[var(--color-fg)]">Data/moves.dat</span>에 들어 있습니다. 야생 출현은{" "}
            <span className="font-mono text-[var(--color-fg)]">Data/encounters.dat</span>입니다.
          </p>
        </header>

        <OfflineSetupCard />

        <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
          <p className="text-xs tracking-wide text-[var(--color-subtle)]">지금 열린 데이터</p>
          <p className="mt-1 font-display text-xl font-semibold">{sourceLabel}</p>
          <p className="mt-1 font-mono text-sm tabular-nums text-[var(--color-muted)]">
            종족 {species.length} · 기술 {moves.length} · 야생 {encounters.length}곳
          </p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            이미 게임 데이터가 열려 있습니다. 종족·기술·야생 탭에서 바로 고치고, 아래에서 .dat만 저장하면 됩니다.
          </p>
        </section>

        <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="text-xs tracking-wide text-[var(--color-subtle)]">게임 플러그인</p>
          <label className="mt-3 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={startWithAllTms}
              onChange={(e) => setStartWithAllTms(e.target.checked)}
              className="mt-1 size-4 accent-[var(--color-accent)]"
            />
            <span>
              <span className="block text-sm font-medium">게임 시작 시 모든 기술머신 보유</span>
              <span className="mt-1 block text-sm text-[var(--color-muted)]">
                새 게임을 시작하면 TM·HM·TR을 가방에 넣습니다. 이미 진행 중인 세이브에는 적용되지 않습니다.
              </span>
            </span>
          </label>
          <label className="mt-4 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={enableDebugKo}
              onChange={(e) => setEnableDebugKo(e.target.checked)}
              className="mt-1 size-4 accent-[var(--color-accent)]"
            />
            <span>
              <span className="block text-sm font-medium">디버그 메뉴 한글 · 검색</span>
              <span className="mt-1 block text-sm text-[var(--color-muted)]">
                F9 디버그를 한글로 바꾸고, 메뉴·포켓몬·기술·도구 목록에서 F 키로 검색합니다.
              </span>
            </span>
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" variant={startWithAllTms ? "default" : "outline"} onClick={savePlugin}>
              <Download className="size-4" />
              기술머신 플러그인
            </Button>
            <Button type="button" variant={enableDebugKo ? "default" : "outline"} onClick={saveDebugPlugin}>
              <Download className="size-4" />
              디버그 플러그인
            </Button>
          </div>
          <p className="mt-3 text-xs text-[var(--color-subtle)]">
            체크한 항목은 「게임에 넣을 파일」을 누를 때 zip으로 함께 내려갑니다. 게임 폴더에 압축을 푼 뒤 Ctrl을 누른
            채로 실행하세요.
          </p>
        </section>

        <ol className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 text-sm text-[var(--color-muted)]">
          <li>1. 종족·기술·야생 탭에서 값을 고칩니다. 파일을 다시 넣을 필요 없습니다.</li>
          <li>2. 아래 버튼으로 .dat를 저장합니다. 기술머신이나 디버그 한글을 켰으면 플러그인 zip도 함께 내려갑니다.</li>
          <li>
            3. 게임을 종료한 다음{" "}
            <span className="font-mono text-[var(--color-fg)]">Data</span> 폴더에 같은 이름으로 덮어쓰고, 플러그인은
            게임 폴더에 압축을 푼 뒤 Ctrl을 누른 채로 다시 켭니다.
          </li>
        </ol>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDropHint(true);
          }}
          onDragLeave={() => setDropHint(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDropHint(false);
            if (e.dataTransfer.files.length) void ingestFiles(e.dataTransfer.files);
          }}
          className={`rounded-[var(--radius-lg)] border border-dashed p-5 text-center transition-colors duration-150 ${
            dropHint ? "border-[var(--color-accent)] bg-[var(--color-raised)]" : "border-[var(--color-border-strong)]"
          }`}
        >
          <p className="text-sm text-[var(--color-muted)]">
            다른 버전을 쓰려면 게임의 Data 폴더만 넣습니다. 필요한 파일은 species.dat, moves.dat, encounters.dat입니다.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button type="button" variant="outline" onClick={() => fileInput.current?.click()}>
              <FolderOpen className="size-4" />
              파일 불러오기
            </Button>
            <Button type="button" variant="outline" onClick={() => dirInput.current?.click()}>
              <FolderOpen className="size-4" />
              Data 폴더
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                void loadBundled(true).then(() => toast.message("어나더레드 원본으로 되돌렸습니다."));
              }}
            >
              <RotateCcw className="size-4" />
              원본으로 리셋
            </Button>
          </div>
          <input
            ref={fileInput}
            type="file"
            accept=".dat,.txt,.pbs,.json,text/plain,application/json"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) void ingestFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <input
            type="file"
            className="hidden"
            multiple
            onChange={(e) => {
              if (e.target.files) void ingestFiles(e.target.files);
              e.target.value = "";
            }}
            ref={(node) => {
              dirInput.current = node;
              if (node) node.webkitdirectory = true;
            }}
          />
        </div>

        <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h3 className="text-sm font-medium">검증</h3>
          <p className="mt-1 font-mono text-sm tabular-nums text-[var(--color-muted)]">
            종족 {species.length} · 기술 {moves.length} · 야생 {encounters.length} · 오류 {errors.length} · 주의 {warns.length}
          </p>
          <ul className="mt-3 max-h-36 space-y-1 overflow-y-auto text-sm">
            {issues.length === 0 && <li className="text-[var(--color-ok)]">저장해도 됩니다.</li>}
            {issues.slice(0, 40).map((issue, idx) => (
              <li key={idx} className={issue.level === "error" ? "text-[var(--color-danger)]" : "text-[var(--color-warn)]"}>
                [{issue.scope === "species" ? "종족" : "기술"} {issue.key}] {issue.message}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h3 className="text-sm font-medium">게임에 넣을 파일</h3>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            저장한 파일을 게임 폴더의 Data에 덮어씁니다. 이름은 그대로 species.dat, moves.dat, encounters.dat이어야
            합니다. PBS txt는 게임이 읽지 않습니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" onClick={() => void saveBoth()} disabled={species.length === 0 || moves.length === 0}>
              <Download className="size-4" />
              게임에 넣을 파일
            </Button>
            <Button type="button" variant="outline" onClick={() => void saveDat("species")} disabled={species.length === 0}>
              species.dat만
            </Button>
            <Button type="button" variant="outline" onClick={() => void saveDat("moves")} disabled={moves.length === 0}>
              moves.dat만
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => void saveDat("encounters")}
              disabled={encounters.length === 0}
            >
              encounters.dat만
            </Button>
            <Button type="button" variant="ghost" onClick={() => void saveDat("messages")}>
              한국어 이름
            </Button>
          </div>
        </section>

        <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h3 className="text-sm font-medium">텍스트 백업 (선택)</h3>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            개발용 pokemon.txt / moves.txt입니다. 배포된 게임은 이 파일을 쓰지 않으니 Data의 .dat만 덮어쓰세요.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={savePbs} disabled={species.length === 0}>
              <Download className="size-4" />
              pokemon.txt + moves.txt
            </Button>
            <Button type="button" variant="ghost" onClick={saveWorkspaceBackup} disabled={species.length === 0}>
              <Download className="size-4" />
              작업 JSON 백업
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}