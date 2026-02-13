@echo off
chcp 65001 >nul
title 瓷韵 · 陶瓷手作平台

echo ========================================
echo     瓷韵 · 陶瓷手作平台
echo ========================================
echo.
echo [1/3] 检查环境...

cd /d "%~dp0"

:: 检查 Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未安装 Node.js！
    echo 请访问 https://nodejs.org/ 下载安装
    pause
    exit /b 1
)

:: 检查应用目录
if not exist "dist\electron\win-unpacked\resources\app.asar" (
    echo [错误] 未找到打包的应用！
    echo 请先运行: npm install && npm run build && npm run electron:build:win
    echo.
    pause
    exit /b 1
)

echo [2/3] 启动后端服务...
:: 启动后端服务
start "瓷韵后端服务 [端口:3003]" /B node server\index.js > logs\backend.log 2>&1

:: 等待后端启动
echo      等待后端启动 (3秒)...
timeout /t 3 /nobreak >nul

echo [3/3] 启动客户端应用...
echo.
start "瓷韵 · 陶瓷手作平台" "dist\electron\win-unpacked\瓷韵 · 陶瓷手作平台.exe"

echo.
echo ========================================
echo     瓷韵 · 陶瓷手作平台已启动！
echo ========================================
echo.
echo 访问地址: http://localhost:3000
echo.
echo 默认账号:
echo   - 用户端: 13800138000 / 123456
echo   - 创作端: 13800138000 / 123456
echo   - 管理端: admin / admin123
echo.
echo 提示: 查看 logs\backend.log 了解后端运行状态
echo.
echo关闭窗口将退出应用
echo.
pause
