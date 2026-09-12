import { build } from "vite";
import { mkdirSync, readFileSync, writeFileSync, existsSync, copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "dist-portable");
const zipPath = resolve(root, "public/redforge-offline.zip");

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c >>> 0;
  }
  return t;
})();

function crc32(data) {
  let c = 0xffffffff;
  for (let i = 0; i < data.length; i++) c = CRC_TABLE[(c ^ data[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function zipStore(files) {
  const enc = new TextEncoder();
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const f of files) {
    const name = enc.encode(f.name.replace(/\\/g, "/"));
    const data = typeof f.data === "string" ? enc.encode(f.data) : f.data;
    const crc = crc32(data);
    const local = new Uint8Array(30 + name.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, data.length, true);
    lv.setUint32(22, data.length, true);
    lv.setUint16(26, name.length, true);
    local.set(name, 30);
    locals.push(local, data);
    const central = new Uint8Array(46 + name.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, data.length, true);
    cv.setUint32(24, data.length, true);
    cv.setUint16(28, name.length, true);
    cv.setUint32(42, offset, true);
    central.set(name, 46);
    centrals.push(central);
    offset += local.length + data.length;
  }
  const centralSize = centrals.reduce((n, b) => n + b.length, 0);
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);
  const total = offset + centralSize + 22;
  const out = new Uint8Array(total);
  let p = 0;
  for (const b of locals) {
    out.set(b, p);
    p += b.length;
  }
  for (const b of centrals) {
    out.set(b, p);
    p += b.length;
  }
  out.set(eocd, p);
  return out;
}

const INDEX_HTML = `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <title>레드포지</title>
    <link rel="icon" href="./favicon.svg" />
    <link rel="stylesheet" href="./redforge.css" />
  </head>
  <body>
    <div id="root"></div>
    <script src="./redforge.js"></script>
  </body>
</html>
`;

const START_BAT = `@echo off
cd /d "%~dp0"
start "" "%~dp0index.html"
`;

const SERVER_BAT = `@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 레드포지를 로컬 주소로 엽니다. 이 창을 닫지 마세요.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
pause
`;

const SERVER_PS1 = `$ErrorActionPreference = "Stop"
$root = (Resolve-Path $PSScriptRoot).Path.TrimEnd("\\") + "\\"
$port = 8765
$listener = $null
while ($port -le 8780) {
  try {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://127.0.0.1:$port/")
    $listener.Start()
    break
  } catch {
    $listener = $null
    $port++
  }
}
if (-not $listener) {
  Write-Host "포트를 열 수 없습니다. index.html 을 더블클릭해 보세요."
  exit 1
}
Start-Process "http://127.0.0.1:$port/"
Write-Host "레드포지  http://127.0.0.1:$port/"
Write-Host "이 창을 닫으면 에디터가 멈춥니다."
$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".json" = "application/json"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".txt"  = "text/plain; charset=utf-8"
}
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $res = $ctx.Response
  try {
    $rel = [Uri]::UnescapeDataString($req.Url.LocalPath.TrimStart("/").Replace("/", "\\"))
    if ([string]::IsNullOrWhiteSpace($rel) -or $rel.EndsWith("\\")) { $rel = "index.html" }
    $path = [IO.Path]::GetFullPath((Join-Path $root $rel))
    if (-not $path.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) {
      $res.StatusCode = 403
    } elseif (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
      $path = Join-Path $root "index.html"
      $bytes = [IO.File]::ReadAllBytes($path)
      $res.ContentType = "text/html; charset=utf-8"
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $bytes = [IO.File]::ReadAllBytes($path)
      $ext = [IO.Path]::GetExtension($path).ToLowerInvariant()
      $res.ContentType = $(if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" })
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    }
  } catch {
    try { $res.StatusCode = 500 } catch {}
  } finally {
    $res.Close()
  }
}
`;

const README = `\uFEFF레드포지 — 인터넷 없이 쓰는 에디터
================================

이 폴더는 인터넷이 전혀 없는 PC에서도 실행됩니다.
게임을 고치려면 Chrome 또는 Edge를 권장합니다.

실행
----
1. zip 압축을 풉니다.
2. start.bat 을 더블클릭합니다.
   또는 index.html 을 Chrome / Edge 로 엽니다.
3. 종족 · 기술 · 야생 값을 고친 뒤 「파일」탭에서 .dat 를 저장합니다.
4. 저장한 파일을 게임 폴더의 Data 에 같은 이름으로 덮어씁니다.

index.html 이 빈 화면이면
------------------------
start-server.bat 을 실행하세요. 검은 창을 닫지 마세요.
브라우저가 http://127.0.0.1:8765 로 열립니다.

참고
----
- 작업 내용은 이 PC의 브라우저에 남습니다.
- 다른 PC로 옮길 때는 「파일」탭의 작업 JSON 백업을 함께 가져가세요.
- 플러그인 zip 도 오프라인에서 그대로 저장할 수 있습니다.
`;

await build({ configFile: resolve(root, "vite.portable.config.ts") });

const jsPath = resolve(outDir, "redforge.js");
if (!existsSync(jsPath)) {
  throw new Error("portable build missing redforge.js");
}

writeFileSync(resolve(outDir, "index.html"), INDEX_HTML);
writeFileSync(resolve(outDir, "start.bat"), START_BAT);
writeFileSync(resolve(outDir, "start-server.bat"), SERVER_BAT);
writeFileSync(resolve(outDir, "start-server.ps1"), SERVER_PS1);
writeFileSync(resolve(outDir, "README.txt"), README);
copyFileSync(resolve(root, "public/favicon.svg"), resolve(outDir, "favicon.svg"));

const cssPath = resolve(outDir, "redforge.css");
const files = [
  { name: "index.html", data: INDEX_HTML },
  { name: "redforge.js", data: new Uint8Array(readFileSync(jsPath)) },
  { name: "start.bat", data: START_BAT },
  { name: "start-server.bat", data: SERVER_BAT },
  { name: "start-server.ps1", data: SERVER_PS1 },
  { name: "README.txt", data: README },
  { name: "favicon.svg", data: new Uint8Array(readFileSync(resolve(root, "public/favicon.svg"))) },
];
if (existsSync(cssPath)) {
  files.splice(2, 0, { name: "redforge.css", data: new Uint8Array(readFileSync(cssPath)) });
}

mkdirSync(resolve(root, "public"), { recursive: true });
const zip = zipStore(files);
writeFileSync(zipPath, zip);
console.log(`portable zip ${zip.length} bytes -> ${zipPath}`);
