# AI Product Designer Portfolio

Personal brand platform for an AI Product Designer. The site is designed as a long-term content hub for portfolio cases, blog posts, resources, and future multi-channel publishing.

Production domain:

```txt
https://pei.design
```

## Collaboration Workflow

GitHub is the single source of truth.

```txt
Company computer (Codex)
        |
        v
GitHub (single source of truth)
        ^
        |
Home computer (Claude Code / Cursor)

        |
        v
Vercel automatic deployment

        |
        v
https://pei.design
```

No manual upload is needed. Vercel deploys automatically after code is pushed to GitHub.

## Daily Development

Clone the repository:

```bash
git clone <repo-url>
cd <project-folder>
```

Start work on any device:

```bash
git pull
pnpm install
pnpm dev
```

Finish work:

```bash
git add .
git commit -m "feat: add new project"
git push
```

Before switching devices, always push. After switching devices, always pull.

## Git Flow

```txt
main        production
develop     integration
feature/*   feature work
release/*   release preparation
hotfix/*    urgent production fixes
```

Recommended flow:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/blog-system

git add .
git commit -m "feat: add blog system"
git push origin feature/blog-system
```

## Content Hub

All content should be managed by Git.

Current implementation uses typed content files for the first working version:

```txt
content/blog.ts
content/projects.ts
content/resources.ts
```

Target MDX structure:

```txt
content
├── blog
├── projects
└── resources
```

The page layer is already separated from the content model, so the project can migrate from typed content to MDX collections without changing the route architecture.

## Routes

```txt
/zh
/en
/zh/projects
/zh/projects/[slug]
/zh/blog
/zh/blog/[slug]
/zh/resources
/zh/resources/[slug]
/zh/about
/zh/contact
/sitemap.xml
/robots.txt
/rss.xml
```

## Content Distribution Adapters

Future publishing channels are reserved under:

```txt
lib/adapters
├── registry.ts
├── types.ts
├── wechat.ts
├── xiaohongshu.ts
├── zhihu.ts
├── notion.ts
└── rss.ts
```

Adapters currently provide `transform()` only. API publishing can be added later through `publish()` without changing the content model.

## SEO

Implemented:

```txt
sitemap.xml
robots.txt
rss.xml
Open Graph metadata
Twitter Card metadata
JSON-LD for blog, projects, and resources
Canonical URL
```

## Tech Stack

```txt
Next.js 15
React 19
TypeScript
Tailwind CSS
GitHub
Vercel
```

Planned:

```txt
MDX
Content Collections
shadcn/ui
Framer Motion
Giscus
Full-text search
Newsletter
AI Chat
Prompt Library
Analytics
```
