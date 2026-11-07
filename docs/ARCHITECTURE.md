# Architecture and build plan (v2)

## Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 App Router, TypeScript | `output: 'export'` for GitHub Pages. Server Components by default. |
| Styling | Tailwind CSS v4 + CSS variable tokens | Tokens in `app/globals.css` via `@theme`. |
| UI motion | `motion` (`motion/react`) | Replaces `framer-motion`. |
| Scroll choreography | `gsap` + ScrollTrigger | Pinned sequences only. Registered once in a client module. |
| Smooth scroll | `lenis` | Driven by GSAP ticker. Disabled on reduced motion. |
| Fonts | `geist` (Sans + Mono) via `next/font` | Self-hosted. |
| Icons | `@phosphor-icons/react` | Replaces `lucide-react`. One weight site-wide. |
| Logos | `simple-icons` | Toolbelt marquee only. |
| Contact form | Web3Forms (static-site friendly) | Decided. Public access key in `NEXT_PUBLIC_WEB3FORMS_KEY` (safe to expose by design; restrict the allowed domain in the Web3Forms dashboard). |
| Analytics | None at launch | **[DECIDE]** Optional Plausible or Umami later. |

**Removed from v1:** `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`, `embla-carousel-react`, `lucide-react`, `framer-motion`, `gh-pages` (deploy is the Actions workflow).

## Folder structure

```
app/
  layout.tsx            fonts, metadata, theme script, providers
  page.tsx              home: composes sections (server component)
  work/[slug]/page.tsx  case studies (generateStaticParams)
  colophon/page.tsx
  not-found.tsx
  globals.css           tokens, base styles, reduced-motion rules
  opengraph-image.tsx   build-time OG image
  sitemap.ts, robots.ts
components/
  sections/             one file per home section (server where possible)
  motion/               'use client' leaves: Reveal, XrayLens, StickyStack, HorizontalPan,
                        CountUp, Magnetic, EngineDiagram, SmoothScroll
  ui/                   Button, Container, ThemeToggle, Accordion, Field
content/
  site.ts               nav, CTAs, contact details
  projects.ts           case studies incl. architecture graph data
  services.ts, process.ts, faq.ts, labs.ts, proof.ts
lib/
  constants.ts          z-index scale, breakpoints, easing
  utils.ts              cn() etc.
docs/                   design, content, assets, architecture, profile
```

Copy lives in `content/*.ts` (typed), mirrored from `docs/CONTENT.md`. Components never hard-code copy.

## Conventions

- Server Components by default. Anything using Motion, GSAP, Lenis, pointer or scroll APIs is a small `'use client'` leaf.
- GSAP and Motion never in the same component. GSAP code uses `gsap.context()` and reverts on unmount.
- Continuous values (pointer position, scroll progress) use motion values, never `useState`.
- Every animated component reads reduced-motion and has a static fallback.
- z-index only from the scale in `lib/constants.ts`.
- Images: explicit width/height, AVIF + WebP, `loading="lazy"` except the LCP image.
- No `any`. ESLint clean.

## Quality gates (before any merge or deploy)

1. `npm run lint` and `npx tsc --noEmit` pass.
2. `npm run build` succeeds (static export).
3. Lighthouse mobile: 95+ Performance, Accessibility, Best Practices, SEO.
4. Keyboard-only pass of every page; screen-reader check of the form.
5. Checked in light and dark mode, and with reduced motion on.
6. Checked at 375px, 768px, 1280px and 1920px.
7. Copy audit: zero em/en dashes, no invented facts.

## Build phases

| Phase | Scope | Output |
|---|---|---|
| 0 | Archive v1, write docs, commit rules | Done |
| 1 | Foundation: dependency swap, tokens, fonts, theme toggle, layout, nav, footer, smooth scroll, reveal primitive | Done |
| 2 | Hero with x-ray lens | Done |
| 3 | Selected work: sticky stack, Engine diagrams, case study pages | Done |
| 4 | Services, proof, process, labs, about, FAQ, contact form | Done |
| 5 | Assets: pipeline, typographic covers, icons, social cards (AI images and screenshots deferred) | Done |
| 6 | SEO (metadata, JSON-LD, OG, sitemap), colophon, 404, performance and a11y pass | Done |
| 7 | Push `main` to deploy | Live (only on Nganba's go-ahead) |

## Deployment

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. Work happens on `main` locally; nothing is pushed until phase 7.
