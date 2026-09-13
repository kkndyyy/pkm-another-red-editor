@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Redforge Update
echo.
echo GitHub latest files...
echo.
if not exist "%~dp0redforge.js" (
  echo Run this next to redforge.js / start.bat
  echo redforge.js 가 있는 폴더에서 실행하세요.
  echo.
  pause
  exit /b 1
)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0update.ps1"
set ERR=%ERRORLEVEL%
if not "%ERR%"=="0" (
  echo.
  echo UPDATE FAILED
  pause
  exit /b 1
)
echo.
pause
exit /b 0
