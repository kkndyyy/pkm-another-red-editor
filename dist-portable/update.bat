@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Redforge Update
echo.
echo GitHub 최신 에디터를 받습니다.
echo.
if not exist "%~dp0redforge.js" (
  echo 이 파일은 오프라인 에디터 폴더에서 실행하세요.
  echo redforge.js 와 start.bat 이 있는 폴더에 두고 다시 실행하세요.
  echo.
  pause
  exit /b 1
)
if exist "%~dp0update.ps1" (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0update.ps1"
) else (
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$p='%~f0'; $t=Get-Content -LiteralPath $p -Raw -Encoding UTF8; $i=$t.IndexOf('<#PS#>'); if($i -lt 0){ throw 'script missing' }; Invoke-Expression $t.Substring($i)"
)
if errorlevel 1 (
  echo.
  echo 업데이트에 실패했습니다. 인터넷이 되는 PC에서, 에디터 창을 닫고 다시 실행하세요.
  pause
  exit /b 1
)
echo.
pause
exit /b 0

<#PS#>
$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
try { [Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8 } catch {}
if (-not $PSScriptRoot) { $PSScriptRoot = (Get-Location).Path }
$Repo = "kkndyyy/pkm-another-red-editor"
$Branch = "main"
$Root = $PSScriptRoot
$Headers = @{ "User-Agent" = "Redforge-Updater" }
$EditorFiles = @("index.html","redforge.js","redforge.css","favicon.svg","start.bat","start-server.bat","start-server.ps1","README.txt","update.bat","update.ps1","version.txt")
function Write-Step($msg) { Write-Host $msg }
function Get-LatestSha {
  $info = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo/commits/$Branch" -Headers $Headers
  return @{ Sha = $info.sha.Substring(0,7); Message = (($info.commit.message -split "`n")[0]).Trim() }
}
function Find-EditorDir($dir) {
  if (Test-Path -LiteralPath (Join-Path $dir "redforge.js")) { return $dir }
  $nested = Get-ChildItem -LiteralPath $dir -Directory -ErrorAction SilentlyContinue
  foreach ($d in $nested) {
    $portable = Join-Path $d.FullName "dist-portable"
    if (Test-Path -LiteralPath (Join-Path $portable "redforge.js")) { return $portable }
    if (Test-Path -LiteralPath (Join-Path $d.FullName "redforge.js")) { return $d.FullName }
  }
  $js = Get-ChildItem -LiteralPath $dir -Recurse -Filter "redforge.js" -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($js) { return $js.DirectoryName }
  return $null
}
Write-Host ""
Write-Host "레드포지 업데이트"
Write-Host "GitHub $Repo  ($Branch)"
Write-Host ""
if (-not (Test-Path -LiteralPath (Join-Path $Root "redforge.js"))) {
  throw "이 폴더가 오프라인 에디터가 아닙니다. redforge.js 가 있는 폴더에서 실행하세요."
}
$latest = $null
try { $latest = Get-LatestSha } catch { Write-Step "커밋 정보를 읽지 못했습니다. 파일은 그대로 받습니다." }
if ($latest) { Write-Step ("최신 커밋: {0}  {1}" -f $latest.Sha, $latest.Message) }
$tmp = Join-Path $env:TEMP ("redforge-update-" + [guid]::NewGuid().ToString("n"))
New-Item -ItemType Directory -Path $tmp | Out-Null
try {
  $cloned = $false
  $git = Get-Command git -ErrorAction SilentlyContinue
  if ($git) {
    try {
      Write-Step "git 으로 최신 저장소를 받는 중..."
      & git clone --depth 1 --branch $Branch "https://github.com/$Repo.git" (Join-Path $tmp "repo")
      if ($LASTEXITCODE -eq 0 -and (Test-Path -LiteralPath (Join-Path $tmp "repo\dist-portable\redforge.js"))) { $cloned = $true }
    } catch { $cloned = $false }
  }
  if (-not $cloned) {
    $zipPath = Join-Path $tmp "repo.zip"
    Write-Step "GitHub에서 최신 zip을 받는 중..."
    Invoke-WebRequest -Uri "https://codeload.github.com/$Repo/zip/refs/heads/$Branch" -OutFile $zipPath -Headers $Headers -UseBasicParsing
    Expand-Archive -LiteralPath $zipPath -DestinationPath $tmp -Force
  }
  $src = Find-EditorDir $tmp
  if (-not $src) { throw "받은 파일에서 dist-portable 에디터를 찾지 못했습니다." }
  $copied = 0
  foreach ($name in $EditorFiles) {
    $from = Join-Path $src $name
    if (-not (Test-Path -LiteralPath $from)) { continue }
    Copy-Item -LiteralPath $from -Destination (Join-Path $Root $name) -Force
    $copied += 1
  }
  if ($copied -lt 2) { throw "덮어쓸 에디터 파일이 너무 적습니다." }
  if ($latest) { Set-Content -LiteralPath (Join-Path $Root "version.txt") -Value $latest.Sha -Encoding ASCII }
  Write-Host ""
  Write-Host "업데이트가 끝났습니다. start.bat 으로 실행하세요."
} finally {
  try { Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue } catch {}
}
