@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Redforge Update
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0update.ps1"
if errorlevel 1 (
  echo.
  echo UPDATE FAILED
  pause
  exit /b 1
)
pause
