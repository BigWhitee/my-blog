#!/bin/bash
# 一键部署脚本

echo "🚀 开始部署博客..."

# 检查环境
if ! command -v vercel &> /dev/null; then
    echo "📦 安装 Vercel CLI..."
    npm i -g vercel
fi

# 部署
echo "🔨 部署到 Vercel..."
vercel --prod

echo "✅ 部署完成！"
