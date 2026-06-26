# Pei Design

AI Product Designer / UI UX Designer personal brand platform. The site is built as a long-term portfolio and content hub for projects, blog posts, resources, and future multi-channel publishing.

Production:

```txt
https://pei-design.vercel.app
https://pei.design
```

`pei-design.vercel.app` is available without buying a domain. `pei.design` requires domain ownership and DNS setup.

## Tech Stack

```txt
Next.js 15
React 19
TypeScript
Tailwind CSS
GitHub
Vercel
Cloudflare DNS
```

Reserved for later expansion:

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

## Repository

Recommended GitHub repository:

```txt
983447405-wq/pei-design
```

Clone:

```bash
git clone git@github.com:983447405-wq/pei-design.git
cd pei-design
pnpm install
```

Run locally:

```bash
pnpm dev
```

Quality checks:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm run verify
```

## Daily Workflow

GitHub is the single source of truth.

```txt
Company computer (Codex)
        |
        v
GitHub
        ^
        |
Home computer (Codex / Claude Code / Cursor)

        |
        v
Vercel automatic deployment

        |
        v
Cloudflare DNS

        |
        v
https://pei.design
```

Before work on any device:

```bash
git pull
pnpm install
pnpm dev
```

After work:

```bash
pnpm run verify
git add .
git commit -m "feat: add new project"
git push
```

Vercel deploys automatically after `git push`.

## Commit Convention

Use Conventional Commit style:

```txt
feat: new feature, page, project, or content
fix: bug fix
docs: documentation
style: formatting or visual-only CSS changes
refactor: internal code change without behavior change
perf: performance improvement
chore: tooling, dependency, build, or workflow update
```

## Git Flow

For solo, low-risk updates, commit directly to `main` after `pnpm ci` passes.

For larger changes:

```bash
git checkout -b feature/blog-mdx
git add .
git commit -m "feat: add mdx blog"
git push origin feature/blog-mdx
```

Then open a pull request into `main`. GitHub Actions will run lint, typecheck, and build.

## Vercel

Vercel environments:

```txt
Production: main branch
Preview: pull requests and non-production branches
Development: local pnpm dev
```

Current public URL:

```txt
https://pei-design.vercel.app
```

Vercel provides automatic HTTPS, preview URLs, and production deployment from GitHub. `vercel.json` is intentionally small: Next.js routing and asset optimization are handled by Vercel's Next.js integration.

## Cloudflare

Cloudflare Free is used for DNS and optional edge settings after `pei.design` is purchased.

Vercel DNS records:

```txt
Type    Name    Value
A       @       216.198.79.1
CNAME   www     28b164b23897bffb.vercel-dns-017.com.
```

Recommended Cloudflare settings:

```txt
SSL/TLS: Full
Always Use HTTPS: On
Automatic HTTPS Rewrites: On
Brotli: On
HTTP/3: On
Early Hints: On
Caching Level: Standard
Browser Cache TTL: Respect Existing Headers
Rocket Loader: Off
Auto Minify: Off
```

Detailed Cloudflare setup: [docs/cloudflare.md](./docs/cloudflare.md)

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

## Content

Current first working version uses typed content:

```txt
content/blog.ts
content/projects.ts
content/resources.ts
```

Target CMS-free MDX structure:

```txt
content/
  blog/
  projects/
  resources/
```

All articles, portfolio cases, resources, and images should be committed to Git.

## Adapter Architecture

Future publishing adapters live under:

```txt
lib/adapters/
  registry.ts
  types.ts
  wechat.ts
  xiaohongshu.ts
  zhihu.ts
  notion.ts
  rss.ts
```

Adapters currently reserve the transform layer. Later API publishing can add `publish()` without changing the content model.

## SEO

Implemented:

```txt
Metadata API
sitemap.xml
robots.txt
rss.xml
Open Graph
Twitter Card
Canonical URL
JSON-LD on content pages
Favicons
Web app manifest
```

## Future Modules

The architecture is prepared for:

```txt
Blog: migrate typed content to MDX collections.
CMS: keep Git-based Markdown/MDX, no database required.
AI Chat: add app/[locale]/chat and provider adapters.
Prompt Library: add content/prompts and searchable listing pages.
Newsletter: add adapter/service under lib/newsletter.
Analytics: add Vercel Analytics, Umami, Cloudflare Analytics, or Google Analytics behind env vars.
```

See workflow details: [docs/workflows.md](./docs/workflows.md)
