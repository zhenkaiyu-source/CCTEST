# 部署指南

## GitHub + Vercel 部署

### 1. 推送代码到 GitHub

```bash
# 创建 GitHub 仓库后执行
git remote add origin https://github.com/你的用户名/ceramics-creator.git
git branch -M main
git push -u origin main
```

### 2. Vercel 部署

**方式一：Vercel CLI**

```bash
npm i -g vercel
vercel login
vercel --prod
```

**方式二：GitHub Actions（自动部署）**

1. 在 Vercel 官网导入 GitHub 仓库
2. 配置构建命令：`npm run build`
3. 配置输出目录：`dist`
4. 点击 Deploy

### 3. 部署后 API 配置

由于 Vercel 无服务器函数有大小限制，建议：

**方案A：前端 + Vercel API（演示用）**
- 前端 → Vercel 托管
- API → `/api` 路由（内置内存数据库）

**方案B：生产部署**
- 前端 → Vercel / Netlify
- 后端 → Railway / Render / Fly.io

### 4. 环境变量

Vercel 后台配置：
```
无需要 - 演示版使用内置数据库
```

### 5. 访问地址

部署成功后访问：
- 前端：https://你的项目.vercel.app
- API：https://你的项目.vercel.app/api/*

### 6. 本地预览 Vercel 构建

```bash
npm run build
npx vercel --prod --local
```

### 7. 演示账号

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 用户端 | 13800138000 | 123456 |
| 创作端 | 13800138000 | 123456 |
| 管理端 | admin | admin123 |
