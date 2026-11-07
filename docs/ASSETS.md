# Assets plan

Everything visual the v2 site needs, where each piece comes from, and its status.

## Retiring

The 8 files in `public/images/` (1024x1024 webp) are AI renders of generic glowing holograms with the project title baked into the image and a generator watermark in the corner. They read as stock filler, so they are not used in v2. They stay in the archive branch.

## Sourcing rules

1. **Real screenshots first** for anything that is a real product (Botlune, UploadiT, the FPS game, CI4 CMS). Run the project locally and capture it, then present it in a clean mockup.
2. **Built in code** for anything that explains a system: architecture diagrams, the Engine layer, the blueprint grid, the OG image. These are data-driven components, not images.
3. **Generated images** only for atmosphere: service visuals and case-study covers where no shareable screenshot exists (NDA or legacy work). No text inside generated images, no fake UI with fake words, one consistent art direction.
4. **Never generated:** Nganba's portrait (must be a real photo), client logos, anything presented as a real screenshot.

## Art direction for generated images

Consistent across every generated asset:

> Editorial still-life photography, cool stone grey background (#EDEFEC family), soft directional daylight, shallow depth of field, a single cobalt blue (#2F4BFF) element as the only colour accent, physical materials (paper, glass, aluminium, cables, circuit boards, transit signage hardware), minimal composition with large negative space, no text, no logos, no screens with readable UI, no people's faces. Shot on a medium-format camera, 50mm.

If images are generated later, use any generator with this direction, save the originals to `assets/images/` and run `npm run images`.

## Inventory

| # | Asset | Where used | Size / ratio | Source | Status |
|---|---|---|---|---|---|
| 1 | Animated character (stands in for a portrait) | About, and small cameo in nav/404 | 4:5 stage | Built in code: a stylised character made of simple geometric shapes in the site palette, with idle breathing, blinking, eyes that follow the pointer, and a switch to an "Engine" wireframe version. Respects reduced motion. Swap for a real photo later. | Done (`components/motion/Character.tsx`) |
| 2 | Appyverse cover | Work card, case study | 16:10, 2400x1500 | Real screenshots from Nganba if available, else generated (phone on stone surface with cobalt light, abstract chat bubbles without text). No NDA. | To source |
| 3 | Botlune cover | Work card, case study | 16:10 | Real screenshot from local run, in browser mockup | To capture |
| 4 | HR Portal cover | Work card, case study | 16:10 | Generated (no shareable screenshot): organised paper files, a laptop edge, cobalt clip | To generate |
| 5 | FIDS/PIDS cover | Work card, case study | 16:10 | Generated: close-up of transit departure-board hardware, blank split-flap tiles, cobalt detail | To generate |
| 6-11 | Service visuals (6) | Services accordion | 4:5, 1200x1500 | Generated, one per service: platforms (aluminium modular blocks), AI agents (phone and microphone), WordPress (stacked paper layouts), payments (card terminal, no branding), interactive 3D (glass voxel cubes), performance (stopwatch and circuit board) | To generate |
| 12 | Labs: FPS game | Labs row | 4:3 | Real screenshot / short muted loop from local run | To capture |
| 13 | Labs: UploadiT | Labs row | 4:3 | Real screenshot from local run | To capture |
| 14 | Labs: CI4 CMS | Labs row | 4:3 | Real screenshot from local run | To capture |
| 15 | Toolbelt logos | About marquee | SVG | Simple Icons (`simple-icons` package), single-colour via `currentColor` | In code |
| 16 | Architecture diagrams (4) | Engine view, case studies | SVG in code | Built from data in `content/projects.ts` | In code |
| 17 | Monogram favicon "NI" | Favicon, app icon | SVG + PNG 32/180/512 | Geist Medium wordmark set in code | In code |
| 18 | OG image | Social sharing | 1200x630 | Generated at build with `next/og` from the hero headline | In code |
| 19 | Grain texture | Fixed overlay | CSS/SVG noise | In code, `pointer-events-none`, fixed layer | In code |

## Status after phase 5 (2026-11-07)

- **No AI-generated images for now.** The only generator available runs on someone else's Figma account and paid credits, so it was declined. Rows 2 and 4-11 stay open.
- **No screenshots for now.** Rows 3 and 12-14 stay open; Labs cards show their stack until then.
- **Typographic covers** (`components/ui/CoverPoster.tsx`) fill the Surface view of every project until a real cover exists. Cards open on Engine while a project has no cover.
- **Done in code:** favicon and apple icon (row 17), social cards for the site and each case study (row 18), grain (row 19), character (row 1), diagrams (row 16), toolbelt logos (row 15).
- **Drop-in pipeline ready:** put originals in `assets/images/` and run `npm run images` (see `assets/images/README.md`). It writes AVIF and WebP at 800, 1600 and 2400px to `public/images/`, which `ResponsiveImage` serves with explicit dimensions.
- Social cards and icons are rendered to real `.png` files by `scripts/generate-social.mts`, because static export would otherwise serve them without a file extension.

## Trinket & Layers images (2026-11-07)

The studio logo with a transparent background, supplied by Nganba (`assets/images/trinket/logo.png`), shown on a dark tile. Used on the Labs card and the /trinket-and-layers/ story page. Prime Business Navigator cover is a screenshot of the live client site (`assets/images/work/`).

## Decisions and open questions

- Appyverse and Stratacache: no NDA, both can be named and shown (confirmed 2026-11-07).
- No real photo for now: an animated character stands in (row 1). Portrait can replace it later.
- Still open: Appyverse screenshots if you have them; 2-3 testimonials with name, role and company.
