$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
try { [Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8 } catch {}
if (-not $PSScriptRoot) { $PSScriptRoot = (Get-Location).Path }

$Repo = "kkndyyy/pkm-another-red-editor"
$Branch = "main"
$Root = $PSScriptRoot
$Headers = @{ "User-Agent" = "Redforge-Updater" }
$EditorFiles = @(
  "index.html",
  "redforge.js",
  "redforge.css",
  "favicon.svg",
  "start.bat",
  "start-server.bat",
  "start-server.ps1",
  "README.txt",
  "update.bat",
  "update.ps1",
  "version.txt"
)

function Write-Step($msg) { Write-Host $msg }

function Save-Url([string]$Url, [string]$Dest) {
  $dir = Split-Path -Parent $Dest
  if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  $tmpOut = "$Dest.download"
  try {
    Invoke-WebRequest -Uri $Url -OutFile $tmpOut -Headers $Headers -UseBasicParsing
    if (-not (Test-Path -LiteralPath $tmpOut) -or (Get-Item -LiteralPath $tmpOut).Length -lt 8) {
      throw "empty download"
    }
    Move-Item -LiteralPath $tmpOut -Destination $Dest -Force
    return $true
  } catch {
    try { Remove-Item -LiteralPath $tmpOut -Force -ErrorAction SilentlyContinue } catch {}
    return $false
  }
}

function Get-LatestSha {
  $info = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo/commits/$Branch" -Headers $Headers
  return @{
    Sha = $info.sha.Substring(0, 7)
    Message = (($info.commit.message -split "`n")[0]).Trim()
  }
}

try {
  Write-Host ""
  Write-Host "레드포지 업데이트"
  Write-Host "GitHub $Repo  ($Branch)"
  Write-Host ""

  if (-not (Test-Path -LiteralPath (Join-Path $Root "redforge.js"))) {
    throw "redforge.js 가 있는 오프라인 에디터 폴더에서 실행하세요."
  }

  $latest = $null
  try { $latest = Get-LatestSha } catch { Write-Step "커밋 정보를 읽지 못했습니다. 파일은 그대로 받습니다." }
  if ($latest) {
    Write-Step ("최신 커밋: {0}  {1}" -f $latest.Sha, $latest.Message)
  }

  $tmp = Join-Path $env:TEMP ("redforge-update-" + [guid]::NewGuid().ToString("n"))
  New-Item -ItemType Directory -Path $tmp | Out-Null
  try {
    Write-Step "에디터 파일만 받는 중..."
    $got = 0
    foreach ($name in $EditorFiles) {
      $urls = @(
        "https://raw.githubusercontent.com/$Repo/$Branch/dist-portable/$name",
        "https://github.com/$Repo/raw/$Branch/dist-portable/$name"
      )
      $ok = $false
      foreach ($url in $urls) {
        if (Save-Url $url (Join-Path $tmp $name)) { $ok = $true; break }
      }
      if ($ok) {
        $got += 1
        Write-Step ("  {0}" -f $name)
      }
    }

    if (-not (Test-Path -LiteralPath (Join-Path $tmp "redforge.js"))) {
      throw "GitHub에서 redforge.js 를 받지 못했습니다. 인터넷 연결을 확인하세요."
    }
    if ($got -lt 2) { throw "받은 파일이 너무 적습니다." }

    $copied = 0
    foreach ($name in $EditorFiles) {
      $from = Join-Path $tmp $name
      if (-not (Test-Path -LiteralPath $from)) { continue }
      $to = Join-Path $Root $name
      $tries = 0
      while ($true) {
        try {
          Copy-Item -LiteralPath $from -Destination $to -Force
          $copied += 1
          break
        } catch {
          $tries += 1
          if ($tries -ge 4) { throw "파일을 덮어쓰지 못했습니다: $name  브라우저를 닫고 다시 실행하세요." }
          Start-Sleep -Seconds 1
        }
      }
    }
    if ($copied -lt 2) { throw "덮어쓸 에디터 파일이 너무 적습니다." }
    if ($latest) {
      Set-Content -LiteralPath (Join-Path $Root "version.txt") -Value $latest.Sha -Encoding ASCII
    }
    Write-Host ""
    Write-Host "업데이트가 끝났습니다. start.bat 으로 실행하세요."
    Write-Host "작업 JSON 백업은 그대로 두었습니다."
    exit 0
  } finally {
    try { Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue } catch {}
  }
} catch {
  Write-Host ""
  Write-Host "오류:"
  Write-Host $_.Exception.Message
  exit 1
}
