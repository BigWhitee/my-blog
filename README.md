# 🐰 我的博客

一个使用 Next.js + Markdown 构建的高性能个人博客。

![Demo](https://img.shields.io/badge/Next.js-14+-000000?style=flat&logo=next.js)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ 功能特性

- 🌓 **暗色主题** - 支持手动切换，记住偏好
- 📱 **响应式设计** - 完美适配手机/平板/桌面
- ⚡ **静态生成** - SSG 架构，访问速度极快
- 🏷️ **标签分类** - 文章按标签分类展示
- 🔍 **SEO 优化** - sitemap、robots.txt 配置
- 🧪 **单元测试** - Jest 测试覆盖

## 🚀 快速部署

### 方式一：Vercel（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

或推送 GitHub 后在 [Vercel](https://vercel.com) 导入自动部署。

### 方式二：Docker

```bash
# 构建
docker build -t my-blog .

# 运行
docker run -p 3000:3000 my-blog
```

### 方式三：传统部署

```bash
# 安装依赖
npm install

# 构建
npm run build

# 生产运行
npm start
```

## 📁 项目结构

```
my-blog/
├── pages/           # 页面路由
│   ├── index.js    # 首页
│   └── posts/      # 文章详情
├── components/     # 组件
├── lib/           # 工具函数
├── posts/         # Markdown 文章
├── public/        # 静态资源
├── styles/        # 样式文件
├── __tests__/     # 测试文件
└── public/        # 静态资源
```

## 🖊️ 添加新文章

在 `posts/` 目录创建 `.md` 文件：

```markdown
---
title: 文章标题
date: '2025-03-04'
tags: ['标签1', '标签2']
---

正文内容...
```

## 🧪 运行测试

```bash
npm test           # 运行测试
npm run test:coverage  # 生成覆盖率报告
```

## 📄 License

MIT License - © 2025 我的博客
