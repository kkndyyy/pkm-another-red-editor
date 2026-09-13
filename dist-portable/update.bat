@echo off
setlocal
cd /d "%~dp0."
title Redforge Update
echo.
echo Fetching latest editor from GitHub...
echo.
if not exist "%~dp0redforge.js" (
  echo Run this in the unzipped editor folder.
  echo redforge.js and start.bat must be in the same folder.
  echo.
  pause
  exit /b 1
)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0update.ps1"
if errorlevel 1 (
  echo.
  echo UPDATE FAILED
  pause
  exit /b 1
)
echo.
pause
exit /b 0
