@echo off
cd /d "%~dp0."
echo Redforge local server. Keep this window open.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
pause
