import { useEffect, useState } from "react";
import { CloudOff, Download, HardDrive, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { hasEmbeddedBundle } from "@/lib/editor/dat-cache";
import { warmOfflineCache } from "@/lib/editor/register-sw";

export function useInstallPrompt() {
  const [installEvt, setInstallEvt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const onInstall = (e: Event) => {
      e.preventDefault();
      setInstallEvt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onInstall);
    return () => window.removeEventListener("beforeinstallprompt", onInstall);
  }, []);

  return {
    installEvt,
    promptInstall: () => {
      if (!installEvt) return;
      void installEvt.prompt();
      setInstallEvt(null);
    },
  };
}

export function downloadOfflinePack() {
  const a = document.createElement("a");
  a.href = "/redforge-offline.zip";
  a.download = "레드포지-오프라인.zip";
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast.success("압축을 풀고 start.bat 또는 index.html을 더블클릭하세요. 인터넷이 없는 PC에서도 실행됩니다.");
}

export function OfflineBadge() {
  const [online, setOnline] = useState(true);
  const [ready, setReady] = useState(false);
  const { installEvt, promptInstall } = useInstallPrompt();
  const portable = hasEmbeddedBundle();

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    setOnline(navigator.onLine);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    const check = () => {
      if (!("caches" in window)) return;
      void caches
        .keys()
        .then((keys) => setReady(keys.some((k) => k.startsWith("redforge-offline"))))
        .catch(() => {});
    };
    check();
    const t = window.setTimeout(check, 1200);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      {portable && (
        <span className="inline-flex items-center gap-1 rounded-[var(--radius-xs)] bg-[var(--color-raised)] px-2 py-1 text-[11px] text-[var(--color-ok)]">
          <HardDrive className="size-3" />
          인터넷 없이 실행 중
        </span>
      )}
      {!portable && !online && (
        <span className="inline-flex items-center gap-1 rounded-[var(--radius-xs)] bg-[var(--color-raised)] px-2 py-1 text-[11px] text-[var(--color-warn)]">
          <CloudOff className="size-3" />
          오프라인
        </span>
      )}
      {!portable && online && ready && (
        <span className="hidden items-center gap-1 text-[11px] text-[var(--color-subtle)] sm:inline-flex">
          <HardDrive className="size-3" />
          이 기기 저장됨
        </span>
      )}
      {installEvt && (
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1 rounded-[var(--radius-sm)] bg-[var(--color-raised)] px-2 text-[11px] font-medium text-[var(--color-fg)]"
          onClick={promptInstall}
        >
          <Smartphone className="size-3" />
          홈 화면에 추가
        </button>
      )}
    </div>
  );
}

export function OfflineSetupCard() {
  const [online, setOnline] = useState(true);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [note, setNote] = useState("");
  const { installEvt, promptInstall } = useInstallPrompt();
  const portable = hasEmbeddedBundle();

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    setOnline(navigator.onLine);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    if ("caches" in window) {
      void caches
        .keys()
        .then((keys) => setReady(keys.some((k) => k.startsWith("redforge-offline"))))
        .catch(() => {});
    }
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  async function saveHere() {
    setBusy(true);
    setNote("");
    try {
      const { cached } = await warmOfflineCache();
      setReady(true);
      setNote(
        cached > 0
          ? `이 기기에 ${cached}개 파일을 저장했습니다. 같은 브라우저에서는 인터넷이 없어도 열립니다.`
          : "작업 내용은 이미 이 기기에 남습니다.",
      );
    } catch {
      setNote("저장에 실패했습니다. 인터넷이 연결된 상태에서 한 번 더 눌러 주세요.");
    } finally {
      setBusy(false);
    }
  }

  if (portable) {
    return (
      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
        <p className="text-xs tracking-wide text-[var(--color-subtle)]">인터넷 없이 실행 중</p>
        <p className="mt-1 font-display text-xl font-semibold">이 폴더만 있으면 됩니다</p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          어나더레드 데이터가 이 파일 안에 들어 있습니다. 인터넷에 연결하지 않아도 종족·기술·야생을 고치고 .dat와
          플러그인을 저장할 수 있습니다. 최신 에디터가 필요하면 이 폴더의{" "}
          <span className="font-mono text-[var(--color-fg)]">update.bat</span>을 더블클릭하세요. GitHub 최신본으로
          덮어씁니다.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
      <p className="text-xs tracking-wide text-[var(--color-subtle)]">인터넷이 없는 PC</p>
      <p className="mt-1 font-display text-xl font-semibold">USB · 다른 컴퓨터용 패키지</p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        에디터와 어나더레드 데이터가 통째로 들어 있는 zip입니다. 압축을 풀고{" "}
        <span className="font-mono text-[var(--color-fg)]">start.bat</span> 또는{" "}
        <span className="font-mono text-[var(--color-fg)]">index.html</span>을 더블클릭하면, 인터넷이 전혀 없는
        곳에서도 실행됩니다.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={downloadOfflinePack}
          className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3 text-sm font-medium text-[var(--color-accent-fg)]"
        >
          <Download className="size-4" />
          오프라인 에디터 받기
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void saveHere()}
          className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-raised)] px-3 text-sm font-medium text-[var(--color-fg)] disabled:opacity-60"
        >
          <HardDrive className="size-4" />
          {busy ? "저장 중…" : ready ? "이 브라우저에 다시 저장" : "이 브라우저에 저장"}
        </button>
        {installEvt && (
          <button
            type="button"
            onClick={promptInstall}
            className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-raised)] px-3 text-sm font-medium text-[var(--color-fg)]"
          >
            <Smartphone className="size-4" />
            홈 화면에 추가
          </button>
        )}
      </div>
      <ol className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
        <li>1. 「오프라인 에디터 받기」로 zip을 받아 USB나 폴더에 둡니다.</li>
        <li>2. 인터넷이 없는 PC에서 압축을 풀고 start.bat을 더블클릭합니다. Chrome 또는 Edge가 열립니다.</li>
        <li>3. 빈 화면이면 start-server.bat을 실행하고, 검은 창은 닫지 마세요.</li>
        <li>4. 나중에 최신 에디터로 바꾸려면 압축을 푼 폴더에서 update.bat을 더블클릭하세요. GitHub 최신본을 받습니다.</li>
        <li>
          {online
            ? "같은 브라우저에서만 쓰려면 「이 브라우저에 저장」을 한 번 누르면 됩니다."
            : "지금 오프라인입니다. 이전에 저장해 두었다면 이 창에서 그대로 작업하면 됩니다."}
        </li>
      </ol>
      {note && <p className="mt-3 text-sm text-[var(--color-ok)]">{note}</p>}
    </section>
  );
}

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}
