# Project guide: iromn.github.io (portfolio v2)

Freelance portfolio for Nganba Irom, full-stack developer. Being rebuilt from scratch on `main`.
The previous terminal/3D site is preserved on the `archive/v1-terminal-portfolio` branch. Do not edit that branch.

## Read these before doing anything

| File | What it is |
|---|---|
| `docs/DESIGN.md` | Design direction, tokens, type, motion system, per-section layout. The source of truth for how things look and move. |
| `docs/CONTENT.md` | Every visible string on the new site. Copy changes happen here first, then in code. |
| `docs/ARCHITECTURE.md` | Stack, folder structure, conventions, build phases, quality gates. |
| `docs/ASSETS.md` | Asset inventory, specs, and image-generation prompts. |
| `docs/profile.md` | Raw facts about Nganba (experience, projects, numbers). Never invent facts that are not in here. |

## Git rules (mandatory)

- **Commits and PRs are authored by Nganba only.** Never mention Claude, Anthropic, AI assistance or "Generated with" in a commit message, PR title or PR body. Never add a `Co-Authored-By` trailer.
- Enforced two ways: `.claude/settings.json` sets empty attribution, and `.githooks/commit-msg` rejects offending messages. After a fresh clone run `git config core.hooksPath .githooks` once.
- Use conventional commits: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`, `perf:`, `test:`.
- Only commit or push when Nganba asks.
- **Pushing `main` deploys to GitHub Pages** (`.github/workflows/deploy.yml`). Do not push `main` until v2 is ready to go live.

## Commands

```bash
npm run dev       # local dev server (runs `npm run social` first)
npm run lint      # eslint
npm run typecheck # tsc --noEmit
npm run build     # static export to out/ (runs `npm run social` first)
npm run social    # regenerate social cards and icons in public/
npm run images    # optimise source images in assets/images/ into public/images/
npm run serve     # serve out/ with gzip on :4174, for realistic local Lighthouse runs
```

A change is not done until lint, typecheck and build all pass.

## Non-negotiables (summary; details in docs/DESIGN.md)

- No em dashes or en dashes in any visible copy. Use a hyphen, comma, colon or full stop.
- Every animation must have a reason (hierarchy, story, feedback or state change) and must respect `prefers-reduced-motion`.
- Animate only `transform` and `opacity`. No `window.addEventListener('scroll')`; use Motion `useScroll`, GSAP ScrollTrigger or IntersectionObserver.
- Never mix GSAP and Motion in the same component. Motion/GSAP/Lenis code lives in `'use client'` leaf components.
- Performance: above-the-fold content must never wait for JavaScript to become visible (use `Rise`, CSS only). Scroll reveals use the server `Reveal` component, not per-element Motion. GSAP is dynamically imported where used, never in the layout.
- Re-measure Lighthouse after meaningful changes and update `content/colophon.ts`: `npm run build && npm run serve`, then mobile profile with `--throttling-method=devtools`, median of three runs. Always measure through `npm run serve` (gzip, like GitHub Pages); an uncompressed server understates performance badly.
- Light and dark mode both supported via CSS tokens. One accent colour site-wide.
- Icons from `@phosphor-icons/react` only. No hand-drawn SVG icons.
- Static export (`output: 'export'`): no server actions, no API routes, no runtime image optimisation.
- Facts, numbers and client names come from `docs/profile.md` only. Anything not confirmed there gets flagged, not made up.
