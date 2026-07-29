# AGENTS.md — Portfolio

## Stack

Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion. Turbopack in dev. Light mode only (no theme toggle).

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server on `localhost:3000` (Turbopack) |
| `npm run build` | Static export to `out/` |
| `npm run lint` | ESLint (next/core-web-vitals + next/typescript) |
| `npm run type-check` | `tsc --noEmit` |
| `npm run deploy` | Runs `scripts/deploy.sh` (npm ci → build → .nojekyll) |

Order: `lint → type-check → build` before pushing.

## Key Config

- **Static export** (`next.config.ts`): `output: "export"`, `images.unoptimized: true`, `trailingSlash: true` — required for GitHub Pages compatibility. Build output lands in `out/`.
- **GitHub Pages deploy**: CI (`.github/workflows/deploy.yml`) runs on push/PR to `main`. Node 18, `npm ci`, `npm run build`, uploads `out/` artifact. Also adds `.nojekyll` via deploy script.
- **Path alias**: `@/*` → `src/*`.


- **Tailwind v4**: Uses `@tailwindcss/postcss` plugin + `@import "tailwindcss"` in `globals.css`. Custom `.btn`, `.chip`, `.card`, `.surface`, `.gradient-text` utilities defined there.
- **ESLint**: Flat config via `@eslint/eslintrc` compat, extends `next/core-web-vitals`.

## Architecture

- `src/app/` — App Router pages (layout, home, about, resume, projects/[slug], contact).
- `src/components/` — Client components (navbar, theme-toggle, projects-carousel, case-study-modal, etc.). Most are `"use client"`.
- `src/data/` — Static data (projects, experiences).
- `src/content/case/` — Case study React components keyed by slug.
- `src/components/gauge.tsx` — SVG semicircular gauge (monitoring-dashboard style). Animates on scroll via IntersectionObserver.
- `src/components/radar-chart.tsx` — SVG radar/spider chart for skills profile. Animates on scroll.

## Conventions

- All pages/components use `"use client"` where interactivity is needed (framer-motion, searchParams, etc.) — no server components besides layout.
- Case studies open in a modal via `?case=<slug>` query param, driven by `CASE_REGISTRY` in `case-study-modal.tsx`.
- CSS is in `globals.css` using `@layer components` and `@layer utilities` — no CSS modules or inline Tailwind exceptions.
- `public/` contains resume PDF (`resume_FS.pdf`) and static assets.
- `.next/` and `out/` are gitignored.

## Roadmap (page-by-page rework)

### Phase 1 — Font & cleanup
- Add Geist / Geist Mono via `next/font/google`
- Remove Contact component and page entirely
- Remove Resume page (`/resume`)
- Update Navbar links
- Clean up unused dependencies (lucide icons, dead imports)

### Phase 2 — Home page
- Compact hero: tagline, bio, resume pill, email, gauges (keep existing)
- Right column: AI chat panel placeholder (chat UI shell, no backend)
- Remove ProjectsCarousel, ExperienceStepper, DropReveal from home page
- Remove ScrollCue
- Target: ~1.5 viewports, fits without scroll on laptop

### Phase 3 — About page (`/about`)
- Keep radar chart + bio (already done)
- Move experience timeline here (DAG nodes)
- Add skills groups (categorized badges, like reference)
- Add education section
- Add resume download pill
- Target: compact sections, all visible with moderate scroll

### Phase 4 — Projects page (`/projects`)
- Already exists and looks good — minor polish only

### Phase 5 — AI Chat (future)
- Wire up actual chat backend (beyond scope of current plan)
