# 瓷韵 · 陶瓷手作平台

连接艺术家与收藏家的陶瓷手作电商平台。

## 功能特性

- **C端商城**：浏览作品、加入购物车、下单购买
- **B端创作中心**：艺术家管理作品、查看订单、财务数据
- **管理后台**：平台运营管理、数据分析

## 技术栈

- 前端：Vue 3 + Vite + Element Plus + Pinia
- 后端：Express.js（内存数据库）
- 桌面端：Electron
- 打包：electron-builder

## 快速开始

### 开发环境

```bash
# 安装依赖
npm install

# 启动后端服务
node server/index.js

# 启动前端开发服务器
npm run dev
```

访问 http://localhost:3000

### 默认账号

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 用户端 | 13800138000 | 123456 |
| 创作端 | 13800138000 | 123456 |
| 管理端 | admin | admin123 |

### 桌面应用

```bash
# 构建 Electron 应用
npm run electron:build:dir

# 或运行开发版本
npm run electron:dev
```

## 项目结构

```
ceramics-creator/
├── src/                 # Vue 前端源码
│   ├── views/          # 页面组件
│   ├── components/     # 通用组件
│   ├── router/         # 路由配置
│   ├── services/       # API 服务
│   └── stores/         # 状态管理
├── server/             # Express 后端
├── electron/           # Electron 主进程
├── public/             # 静态资源
└── docs/              # 文档
```

## 部署

### Vercel 部署（前端）

1. 安装 Vercel CLI 或使用 GitHub Actions
2. 配置 `vercel.json`

### Docker 部署

```bash
docker build -t ceramics-creator .
docker run -p 3000:3000 ceramics-creator
```

## License

MIT
