# 我的博客

一个使用 Next.js + Markdown 构建的个人博客。

## 快速开始

```bash
# 安装依赖
npm install

# 开发
npm run dev

# 构建
npm run build

# 生产运行
npm start
```

## 添加新文章

在 `posts/` 目录下创建 `.md` 文件：

```markdown
---
title: 文章标题
date: '2025-03-04'
tags: ['标签1', '标签2']
---

正文内容...
```

## 部署到 Vercel

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 自动部署完成！
```

cat > /root/.openclaw/workspace/projects/my-blog/.gitignore << 'EOF'
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
