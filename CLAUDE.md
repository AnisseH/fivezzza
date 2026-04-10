# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Fivezzza Pizzeria — landing page built with **Astro 5 (SSR)** + **Cloudflare Pages**, backed by a **D1 SQLite database** accessed via a **Cloudflare Worker** (the Astro server runtime).

## Commands

```bash
npm install           # Install dependencies
npm run dev           # Astro dev server (uses platformProxy to simulate Workers/D1 locally)
npm run build         # Production build → ./dist
npm run preview       # Run built output through wrangler pages dev

# D1 database
npm run db:create           # Create the D1 database on Cloudflare (run once)
npm run db:migrate:local    # Apply migrations against local D1 (dev)
npm run db:migrate:remote   # Apply migrations against production D1

npm run deploy        # Build + deploy to Cloudflare Pages
```

## First-time setup

1. `npm install`
2. `npm run db:create` → copy the returned `database_id` into `wrangler.toml`
3. `npm run db:migrate:local` (seed local dev DB)
4. `npm run dev`

For production: `npm run db:migrate:remote` then `npm run deploy`.

## Architecture

- **`src/pages/index.astro`** — SSR page. Queries D1 directly via `Astro.locals.runtime.env.DB`. Falls back to hardcoded placeholder data if D1 is unreachable (so `npm run dev` works without a configured DB).
- **`src/pages/api/menu.ts`** — JSON API endpoint (`GET /api/menu`) for the same data; intended for future use (e.g. mobile app, dynamic refresh).
- **`src/components/`** — Astro components: `Nav`, `Hero`, `MenuSection`, `About`, `Hours`, `Footer`. No framework (vanilla Astro + scoped CSS + minimal `<script>` tags).
- **`src/layouts/Layout.astro`** — Base HTML shell. Defines CSS custom properties (brand colors, checker pattern utility classes).
- **`migrations/0001_menu_schema.sql`** — D1 schema + seed data (`categories` + `menu_items` tables).

## Design system

Brand colors (defined as CSS vars in `Layout.astro`):

| Variable   | Value     | Use             |
|------------|-----------|-----------------|
| `--red`    | `#E0442C` | Primary accent  |
| `--blue`   | `#2855B5` | Secondary accent|
| `--cream`  | `#F5EDD8` | Background      |
| `--dark`   | `#1A1720` | Dark sections   |

Fonts (Google Fonts): **Bebas Neue** (display/hero), **Playfair Display** (section headings), **DM Sans** (body).

`.checker` utility class renders the brand checkered divider stripe. Variants: `.checker--blue`, `.checker--dark`.

## Cloudflare binding

D1 is available in any SSR page/endpoint as:
```ts
const db = Astro.locals.runtime.env.DB;         // in .astro files
const db = context.locals.runtime.env.DB;        // in API routes
```

The binding name `DB` is declared in `wrangler.toml` and typed in `src/env.d.ts`.
