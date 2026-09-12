$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
try { [Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8 } catch {}

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

function Write-Step($msg) {
  Write-Host $msg
}

function Get-LatestSha {
  $url = "https://api.github.com/repos/$Repo/commits/$Branch"
  $info = Invoke-RestMethod -Uri $url -Headers $Headers
  return @{
    Sha = $info.sha.Substring(0, 7)
    Message = (($info.commit.message -split "`n")[0]).Trim()
  }
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

function Get-FromGit($tmp) {
  $git = Get-Command git -ErrorAction SilentlyContinue
  if (-not $git) { return $false }
  Write-Step "git 으로 최신 저장소를 받는 중..."
  $repoDir = Join-Path $tmp "repo"
  & git clone --depth 1 --branch $Branch "https://github.com/$Repo.git" $repoDir
  if ($LASTEXITCODE -ne 0) { return $false }
  $src = Join-Path $repoDir "dist-portable"
  return (Test-Path -LiteralPath (Join-Path $src "redforge.js"))
}

function Get-FromZip($tmp) {
  $zipPath = Join-Path $tmp "repo.zip"
  $urls = @(
    "https://codeload.github.com/$Repo/zip/refs/heads/$Branch",
    "https://github.com/$Repo/archive/refs/heads/$Branch.zip"
  )
  $ok = $false
  foreach ($url in $urls) {
    try {
      Write-Step "GitHub에서 최신 zip을 받는 중..."
      Invoke-WebRequest -Uri $url -OutFile $zipPath -Headers $Headers -UseBasicParsing
      $ok = $true
      break
    } catch {
      Write-Step "다른 주소로 다시 시도합니다."
    }
  }
  if (-not $ok) { throw "GitHub에서 파일을 받지 못했습니다. 인터넷 연결과 저장소 주소를 확인하세요." }
  Expand-Archive -LiteralPath $zipPath -DestinationPath $tmp -Force
  return $true
}

Write-Host ""
Write-Host "레드포지 업데이트"
Write-Host "GitHub $Repo  ($Branch)"
Write-Host ""

if (-not (Test-Path -LiteralPath (Join-Path $Root "redforge.js"))) {
  throw "이 폴더가 오프라인 에디터가 아닙니다. update.bat 은 압축을 푼 에디터 폴더에서 실행하세요."
}

$latest = $null
try { $latest = Get-LatestSha } catch { Write-Step "커밋 정보를 읽지 못했습니다. 파일은 그대로 받습니다." }
if ($latest) {
  Write-Step ("최신 커밋: {0}  {1}" -f $latest.Sha, $latest.Message)
  $curFile = Join-Path $Root "version.txt"
  if (Test-Path -LiteralPath $curFile) {
    $cur = (Get-Content -LiteralPath $curFile -Raw -ErrorAction SilentlyContinue).Trim()
    if ($cur -and $cur -eq $latest.Sha) {
      Write-Host "이미 최신입니다."
      exit 0
    }
  }
}

$tmp = Join-Path $env:TEMP ("redforge-update-" + [guid]::NewGuid().ToString("n"))
New-Item -ItemType Directory -Path $tmp | Out-Null
try {
  $cloned = $false
  try { $cloned = Get-FromGit $tmp } catch { $cloned = $false }
  if (-not $cloned) {
    $repoDir = Join-Path $tmp "repo"
    if (Test-Path -LiteralPath $repoDir) {
      Remove-Item -LiteralPath $repoDir -Recurse -Force -ErrorAction SilentlyContinue
    }
    Get-FromZip $tmp | Out-Null
  }
  $src = Find-EditorDir $tmp
  if (-not $src) { throw "받은 파일에서 dist-portable 에디터를 찾지 못했습니다." }

  $copied = 0
  foreach ($name in $EditorFiles) {
    $from = Join-Path $src $name
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
        if ($tries -ge 4) { throw "파일을 덮어쓰지 못했습니다: $name  에디터 창을 닫고 다시 실행하세요." }
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
} finally {
  try { Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue } catch {}
}
