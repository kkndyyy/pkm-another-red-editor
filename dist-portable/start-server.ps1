$ErrorActionPreference = "Stop"
$root = (Resolve-Path $PSScriptRoot).Path.TrimEnd("\") + "\"
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
    $rel = [Uri]::UnescapeDataString($req.Url.LocalPath.TrimStart("/").Replace("/", "\"))
    if ([string]::IsNullOrWhiteSpace($rel) -or $rel.EndsWith("\")) { $rel = "index.html" }
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
