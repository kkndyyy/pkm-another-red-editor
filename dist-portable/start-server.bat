@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 레드포지를 로컬 주소로 엽니다. 이 창을 닫지 마세요.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
pause
