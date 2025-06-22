# HackerNews 中文版qqq

> 实时获取并翻译 Hacker News 内容，为中文开发者提供最新技术资讯

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.10-2D3748)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)](https://tailwindcss.com/)

## 🌟 项目简介

HackerNews 中文版是一个现代化的 Web 应用，旨在为中文开发者提供 Hacker News 的中文翻译版本。项目通过 AI 翻译技术，将英文技术资讯自动翻译成中文，并提供美观的用户界面和良好的阅读体验。

### ✨ 主要特性

- 🔄 **实时同步**：每5分钟自动获取 Hacker News 最新内容
- 🤖 **智能翻译**：使用 OpenAI GPT-4o-mini 进行高质量中英文翻译
- 📱 **响应式设计**：完美适配桌面端和移动端
- 🎨 **现代 UI**：基于 shadcn/ui 组件库的精美界面
- 📊 **分类浏览**：热门、最新、最佳、问答、展示、招聘六大分类
- 🔍 **分页显示**：每个分类支持分页浏览，提升加载性能
- 🌐 **SEO 优化**：完整的SEO优化，支持社交媒体分享
- 🎯 **PWA 支持**：渐进式Web应用，支持离线访问
- 🚀 **性能优化**：服务端渲染，图片优化，代码分割

## 🛠 技术栈

### 前端技术
- **Next.js 14** - React 全栈框架，支持 SSR/SSG
- **TypeScript 5** - 类型安全的 JavaScript 超集
- **Tailwind CSS 3.4** - 实用优先的 CSS 框架
- **shadcn/ui** - 高质量的 React 组件库
- **Lucide Icons** - 现代化的图标库
- **Next.js Image** - 自动图片优化

### 后端技术
- **Prisma ORM 6.10** - 类型安全的数据库 ORM
- **PostgreSQL** - 强大的关系型数据库
- **OpenAI API** - GPT-4o-mini 模型进行翻译
- **Axios** - HTTP 客户端库
- **Zod** - 运行时类型验证

### SEO & 性能优化
- **动态 Sitemap** - 自动生成XML站点地图
- **结构化数据** - Schema.org JSON-LD标记
- **Open Graph** - 社交媒体分享优化
- **Twitter Cards** - Twitter分享卡片
- **Web App Manifest** - PWA配置文件
- **Robots.txt** - 搜索引擎爬虫指导

### 部署与运维
- **Vercel** - 现代化的部署平台
- **Vercel Cron Jobs** - 定时任务调度
- **GitHub Actions** - CI/CD 自动化

## 📋 功能模块

### 1. 数据获取模块
- 通过 HackerNews 官方 API 获取内容
- 支持获取 top、new、best、ask、show、job 六种类型
- 批量处理和错误重试机制

### 2. 翻译模块
- 集成 OpenAI GPT-4o-mini API
- 支持标题、正文、评论的智能翻译
- 异步翻译队列，避免 API 限制
- 翻译结果缓存，避免重复翻译

### 3. 数据存储模块
- 用户信息存储（用户名、karma、简介等）
- 文章信息存储（标题、内容、评分、评论数等）
- 评论信息存储（评论内容、层级关系等）
- 翻译任务管理（翻译状态、错误处理等）

### 4. 前端展示模块
- 响应式卡片布局
- 分页组件
- 动态 header（滚动时背景模糊效果）
- 移动端适配
- Logo和品牌标识

### 5. SEO优化模块
- 完整的Meta标签配置
- Open Graph和Twitter Cards
- 动态Sitemap生成
- 结构化数据标记
- robots.txt配置

## 🏗 项目架构

```
matoutiao/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 路由
│   │   │   └── fetch-hn/      # HN 数据获取接口
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局 (SEO优化)
│   │   ├── page.tsx           # 首页
│   │   └── sitemap.ts         # 动态Sitemap生成
│   ├── components/            # React 组件
│   │   ├── ui/               # shadcn/ui 基础组件
│   │   ├── category-card.tsx  # 分类卡片组件
│   │   ├── header.tsx         # 头部组件 (含Logo)
│   │   ├── footer.tsx         # 底部组件
│   │   └── hero.tsx           # 英雄区域组件
│   ├── lib/                   # 工具库
│   │   ├── db.ts             # Prisma 客户端
│   │   ├── hackernews.ts     # HN API 客户端
│   │   ├── translator.ts     # 翻译服务
│   │   └── utils.ts          # 工具函数
│   └── generated/            # Prisma 生成文件
├── prisma/
│   └── schema.prisma         # 数据库模型定义
├── public/                   # 静态资源
│   ├── logo.svg             # 网站Logo
│   ├── favicon.ico          # 网站图标
│   ├── og.webp              # OG分享图片
│   ├── manifest.json        # PWA配置
│   └── robots.txt           # 爬虫指导
├── .env.example             # 环境变量示例
├── .gitignore              # Git忽略文件
├── vercel.json              # Vercel 部署配置
└── package.json             # 项目依赖
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- PostgreSQL 14+
- OpenAI API Key

### 1. 克隆项目
```bash
git clone https://github.com/your-username/matoutiao.git
cd matoutiao
```

### 2. 安装依赖
```bash
npm install
```

### 3. 环境配置
```bash
# 复制环境变量示例文件
cp .env.example .env

# 编辑 .env 文件，填入你的配置
DATABASE_URL="postgresql://username:password@localhost:5432/hackernews_chinese"
OPENAI_API_KEY="sk-your-openai-api-key-here"
```

### 4. 数据库设置
```bash
# 生成 Prisma 客户端
npx prisma generate

# 运行数据库迁移
npx prisma db push

# (可选) 查看数据库
npx prisma studio
```

### 5. 静态资源准备
```bash
# 替换占位文件为真实文件
# public/favicon.ico - 32x32 ICO格式图标
# public/og.webp - 1200x630 WebP格式分享图片
# 可选：修改 public/logo.svg 为自定义logo
```

### 6. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 7. 获取初始数据
```bash
# 手动触发数据获取
curl http://localhost:3000/api/fetch-hn
```

## 📦 部署指南

### Vercel 部署（推荐）

1. **连接 GitHub 仓库**
   - 登录 [Vercel](https://vercel.com)
   - 导入你的 GitHub 仓库

2. **配置环境变量**
   ```
   DATABASE_URL=your_postgresql_connection_string
   OPENAI_API_KEY=your_openai_api_key
   NEXTAUTH_SECRET=your_secret_key
   ```

3. **更新域名配置**
   ```bash
   # 在以下文件中将 'https://your-domain.com' 替换为实际域名
   - src/app/layout.tsx (metadataBase, openGraph.url)
   - src/app/sitemap.ts (baseUrl)
   - public/robots.txt (Sitemap URL)
   ```

4. **数据库设置**
   ```bash
   # 在 Vercel 项目设置中添加构建命令
   npx prisma generate && npx prisma db push && npm run build
   ```

5. **自动部署**
   - 推送代码到 main 分支自动触发部署
   - Vercel Cron Jobs 会自动运行定时任务

### 其他部署平台

项目也支持部署到其他平台：
- **Railway** - 自动检测 Next.js 项目
- **Netlify** - 需要配置构建设置
- **Docker** - 可以容器化部署

## 🔧 开发指南

### 添加新功能
1. 在 `src/components/` 中创建新组件
2. 在 `src/lib/` 中添加工具函数
3. 在 `src/app/api/` 中添加 API 路由
4. 更新 Prisma schema 如需数据库更改

### 数据库操作
```bash
# 重置数据库
npx prisma db push --force-reset

# 生成迁移文件
npx prisma migrate dev --name migration_name

# 查看数据库
npx prisma studio
```

### SEO优化检查
```bash
# 检查Sitemap
curl https://your-domain.com/sitemap.xml

# 检查robots.txt
curl https://your-domain.com/robots.txt

# 检查manifest
curl https://your-domain.com/manifest.json
```

### 代码规范
- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 组件使用 PascalCase 命名

## 📊 性能优化

- **服务端渲染** - 首屏加载速度优化
- **图片优化** - Next.js Image 组件自动优化
- **代码分割** - 动态导入减少包体积
- **缓存策略** - API 响应缓存和静态资源缓存
- **数据库索引** - 关键字段建立索引
- **预连接优化** - 预连接外部API域名
- **压缩优化** - Gzip/Brotli压缩
- **CDN加速** - Vercel Edge Network

## 🔍 SEO特性

- **完整Meta标签** - 标题、描述、关键词优化
- **Open Graph** - 社交媒体分享优化
- **Twitter Cards** - Twitter分享卡片
- **结构化数据** - Schema.org JSON-LD标记
- **动态Sitemap** - 自动生成XML站点地图
- **Robots.txt** - 搜索引擎爬虫指导
- **语言标识** - 中文本地化设置
- **Canonical URLs** - 规范化URL设置

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Hacker News](https://news.ycombinator.com) - 提供优质的技术内容
- [OpenAI](https://openai.com) - 提供强大的翻译能力
- [Vercel](https://vercel.com) - 提供优秀的部署平台
- [shadcn/ui](https://ui.shadcn.com) - 提供精美的组件库

## 📞 联系方式

- 作者：viggo
- Twitter：[@decohack](https://x.com/decohack)
- 项目赞助：[AlMaker](https://aimaker.dev)

---

**Sponsored by [AlMaker](https://aimaker.dev) ◎ 每5分钟自动更新**
