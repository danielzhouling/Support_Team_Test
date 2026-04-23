#!/bin/bash
set -e

echo "==> 检查 Node.js 版本"
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi
node --version

echo "==> 检查 npm 版本"
npm --version

echo "==> 检查 Python 版本"
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python3 未安装"
    exit 1
fi
python3 --version

echo "==> 创建项目目录结构"
mkdir -p admin employee shared/css shared/js

echo "==> 安装 Playwright（如果未安装）"
if ! command -npx playwright --version &> /dev/null; then
    npm install -g playwright
    npx playwright install chromium --with-deps
fi

echo "==> 初始化完成"
echo ""
echo "可用命令："
echo "  npx playwright test        运行 E2E 测试"
echo "  open admin/login.html       预览管理端登录页"
echo "  open employee/login.html    预览员工端登录页"
