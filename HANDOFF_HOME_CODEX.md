# Pei Design 家里 Codex 联动交接文档

## 项目定位

这是一个 AI Product Designer / UI UX Designer 个人作品集网站，同时作为长期内容中台使用。

技术栈：

```txt
Next.js 15
React 19
TypeScript
Tailwind CSS
GitHub
Vercel
Cloudflare Pages
```

## 线上链接

GitHub 唯一真源：

```txt
git@github.com:983447405-wq/pei-design.git
https://github.com/983447405-wq/pei-design
```

国外主站 Vercel：

```txt
https://pei-design.vercel.app
https://pei-design.vercel.app/zh
```

Cloudflare 免费备用站：

```txt
https://pei-design.pages.dev
https://pei-design.pages.dev/zh/
```

当前 Cloudflare Pages 项目：

```txt
Project: pei-design
Account ID: 703ccceb017b013cbfebb5ca4a9d327e
```

## 家里电脑首次拉取

前提：

```txt
Node.js 22
pnpm 11.7.0
Git
GitHub SSH key 已配置
```

执行：

```bash
git clone git@github.com:983447405-wq/pei-design.git
cd pei-design
pnpm install
pnpm dev
```

本地访问：

```txt
http://127.0.0.1:3000/zh
http://127.0.0.1:3000/en
```

## 日常开发流程

每次开始开发前：

```bash
git pull
pnpm install
pnpm dev
```

开发完成后：

```bash
pnpm run verify
git add .
git commit -m "feat: update portfolio"
git push
```

推送后：

```txt
GitHub 更新
Vercel 自动部署主站
Cloudflare Pages 可部署备用站
```

## 验证命令

完整验证：

```bash
pnpm run verify
```

包含：

```txt
prettier format check
eslint
typescript typecheck
next build
```

Cloudflare Pages 静态构建：

```bash
pnpm run build:cloudflare
```

构建产物：

```txt
out/
```

`out/` 是构建产物，不需要提交 Git。

## 发布流程

### Vercel 主站

只要推送到 GitHub：

```bash
git push
```

Vercel 会自动部署：

```txt
https://pei-design.vercel.app
```

### Cloudflare Pages 备用站

手动部署：

```bash
pnpm run deploy:cloudflare
```

自动部署已预留：

```txt
.github/workflows/cloudflare-pages.yml
```

如果 GitHub 仓库配置了 secret：

```txt
CLOUDFLARE_API_TOKEN
```

则每次 push 到 `main` 后，GitHub Actions 会自动构建并部署 Cloudflare Pages。

当前 workflow 已做容错：没有 `CLOUDFLARE_API_TOKEN` 时只跳过 Cloudflare 部署，不会影响 Vercel 主站。

## Git 分支策略

当前主分支：

```txt
main
```

小改动可直接提交到 `main`。

较大改动建议：

```bash
git checkout -b feature/blog-mdx
git add .
git commit -m "feat: add mdx blog"
git push origin feature/blog-mdx
```

然后开 PR 合并到 `main`。

## Commit Message 规范

```txt
feat: 新功能、新页面、新项目内容
fix: 修复问题
docs: 文档
style: 视觉或格式调整
refactor: 重构
perf: 性能优化
chore: 构建、依赖、工作流
```

## 内容入口

当前内容仍是 typed content：

```txt
content/blog.ts
content/projects.ts
content/resources.ts
```

未来目标 MDX 结构：

```txt
content/
  blog/
  projects/
  resources/
```

## 关键文件清单

部署与构建：

```txt
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
next.config.ts
vercel.json
```

GitHub Actions：

```txt
.github/workflows/ci.yml
.github/workflows/cloudflare-pages.yml
```

SEO / PWA：

```txt
app/layout.tsx
app/robots.ts
app/sitemap.ts
app/rss.xml/route.ts
lib/seo.ts
public/favicon.svg
public/icon.svg
public/og.svg
public/site.webmanifest
```

页面与组件：

```txt
app/
components/
content/
lib/
```

文档：

```txt
README.md
docs/cloudflare.md
docs/workflows.md
HANDOFF_HOME_CODEX.md
```

代码规范：

```txt
eslint.config.mjs
.prettierrc.json
.prettierignore
.gitignore
.env.example
```

## Cloudflare 说明

Cloudflare 免费方案当前提供：

```txt
HTTPS
Brotli
HTTP/3
基础缓存
pages.dev 免费子域名
```

但它不是中国大陆 CDN，不能保证所有地区稳定访问。

当前备用站已可访问：

```txt
https://pei-design.pages.dev/zh/
```

## 家里 Codex 接手提示词

可以直接把下面这段发给家里的 Codex：

```txt
这是 Pei Design 作品集项目。

仓库：
git@github.com:983447405-wq/pei-design.git

请先执行：
git pull
pnpm install
pnpm run verify

本地开发：
pnpm dev

线上主站：
https://pei-design.vercel.app

Cloudflare 备用站：
https://pei-design.pages.dev

部署规则：
所有源码、内容、配置都以 GitHub 为唯一真源。
开发完成后执行：
pnpm run verify
git add .
git commit -m "feat: update portfolio"
git push

不要提交 node_modules、.next、out。
Vercel 会自动部署主站。
Cloudflare Pages 可用 pnpm run deploy:cloudflare 手动部署。
```
