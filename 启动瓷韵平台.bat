@echo off
chcp 65001 >nul
title 瓷韵 · 陶瓷手作平台

echo ========================================
echo     瓷韵 · 陶瓷手作平台
echo ========================================
echo.
echo 正在启动，请稍候...
echo.

cd /d "%~dp0"

:: 启动后端服务
echo [1/2] 启动后端服务...
start "瓷韵后端服务" /B node server\index.js > logs\backend.log 2>&1

:: 等待后端启动
timeout /t 3 /nobreak >nul

:: 启动前端开发服务器
echo [2/2] 启动前端...
start "瓷韵前端服务" /B npx vite > logs\frontend.log 2>&1

:: 等待前端启动
timeout /t 5 /nobreak >nul

:: 打开浏览器
start http://localhost:3000

echo.
echo ========================================
echo     平台已启动！
echo ========================================
echo.
echo 访问地址: http://localhost:3000
echo.
echo 默认账号:
echo   - 用户端: 13800138000 / 123456
echo   - 创作端: 13800138000 / 123456
echo   - 管理端: admin / admin123
echo.
echo 按任意键退出...
pause >nul
