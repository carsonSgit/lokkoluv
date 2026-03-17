# AGENTS.md

## Cursor Cloud specific instructions

### Overview

LOKKOLUV is a single Next.js 15 (App Router) artist portfolio website. Public pages render with hardcoded fallback data when Supabase is unavailable; the admin panel (`/admin/*`) requires Supabase credentials.

### Running the dev server

```
pnpm dev          # starts Next.js on http://localhost:3000
```

### Lint and code quality

- **Linter/Formatter:** Biome (`pnpm run lint` / `pnpm run lint:fix`). Config in `biome.json`.
- **Dead-code analysis:** Knip (`npx knip`). Config in `knip.json`.
- The repo has pre-existing lint errors (style warnings like `noNonNullAssertion`); these are not caused by your changes.

### Build

`pnpm run build` runs `next build`. In environments without network access to the Supabase host (`wvgofeblqbwfqpxqblbd.supabase.co`), static page generation will emit fetch-failure warnings and may time out on some pages. The dev server (`pnpm dev`) works fine without Supabase because pages use on-demand rendering with fallback data.

### Key caveats

- The `packageManager` field specifies `pnpm@10.22.0`; use pnpm for all package operations.
- `sharp` build scripts are ignored by pnpm's default security policy. This does not affect dev-mode image handling. If you need optimized images in production builds, run `pnpm approve-builds` (interactive) or add `"pnpm": { "onlyBuiltDependencies": ["sharp"] }` to `package.json`.
- Supabase env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are optional for public pages but required for admin features.
