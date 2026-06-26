# Development and Deployment Workflows

## Architecture

```txt
Company computer (Codex)
        |
        v
GitHub: 983447405-wq/pei-design
        ^
        |
Home computer (Codex / Claude Code / Cursor)

        |
        v
Vercel automatic deployment

        |
        v
Cloudflare Pages mirror + optional DNS

        |
        v
https://pei-design.vercel.app
https://pei-design.pages.dev
https://pei.design
```

GitHub is the only source of truth. Vercel deploys from GitHub. Cloudflare only manages DNS and optional edge settings.
Cloudflare Pages also serves a free mirror at `https://pei-design.pages.dev`.

## Daily Flow

On every machine before work:

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

Then:

```txt
GitHub receives commit
Vercel builds automatically
Cloudflare Pages mirror deploys automatically when CLOUDFLARE_API_TOKEN is configured
Production or preview URLs update
Next device runs git pull
```

## Commit Convention

Use:

```txt
feat: new user-facing feature or content module
fix: bug fix
docs: documentation only
style: formatting or visual-only CSS changes
refactor: internal rewrite without behavior change
perf: performance improvement
chore: tooling, build, dependency, or workflow update
```

## Branching

Small solo changes can go directly to `main` after `pnpm run verify` passes.

For larger changes:

```bash
git checkout -b feature/blog-mdx
git push origin feature/blog-mdx
```

Open a pull request into `main`; GitHub Actions will run lint, typecheck, and build.

## Vercel Environments

```txt
Production: main branch
Preview: every pull request and non-production branch
Development: local pnpm dev
```

No manual upload is needed.

## Tool Compatibility

Codex, Claude Code, and Cursor are compatible as long as they follow the same Git workflow:

```txt
pull before work
commit focused changes
push after work
never use local-only content as source of truth
```
