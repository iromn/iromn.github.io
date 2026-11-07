# Design direction (v2)

## Design read

Freelance developer portfolio for founders, agencies and growing companies hiring a technical partner. Precise, editorial visual language with purposeful high-end motion. The site itself is the proof: it should look considered and behave like something engineered properly.

**Dials:** `DESIGN_VARIANCE 7` · `MOTION_INTENSITY 7` · `VISUAL_DENSITY 3`

## Concept: Surface and Engine

Clients usually have to choose between people who make things look good and people who make things work. The site argues that Nganba does both, and it shows this instead of claiming it.

- **Surface:** the polished, art-directed layer. Calm layout, large type, real imagery.
- **Engine:** the technical layer underneath. Architecture, stack, data flow, real numbers. Rendered in mono type on a blueprint grid in the accent colour.

Wherever it matters, the visitor can look through the Surface to the Engine:

1. **Hero x-ray lens:** a soft circular lens follows the pointer over the headline. Inside the lens the headline renders in its Engine form (outlined, annotated with live measurements). Scrolling away opens a second lens from the bottom edge, so the headline turns into its Engine view as the hero leaves (this is also how touch visitors see it). A toggle switches the whole headline. Behind it, a faint blueprint grid lights up around the pointer. (An automatic touch sweep on load was dropped: it made the decorative copy the page's largest paint.)
2. **Work cards:** each case study has a Surface/Engine switch. Surface shows the product imagery. Engine draws the system architecture as a live diagram (nodes and edges from data, lines drawing themselves in).
3. **Colophon page:** the site's own Engine. How it is built, performance budget and results, accessibility choices.

This is the one signature idea. Everything else stays quiet so it lands.

## What we are deliberately not doing

- No terminal or hacker styling, no boot loader, no neon glow (that was v1).
- No 3D scene for its own sake. Three.js is removed unless a later section genuinely needs it.
- No copying the reference site: different type, palette, layout and signature interaction.
- No custom cursor, no scroll cues, no section-number eyebrows, no decorative dots, no fake UI screenshots built from divs.

## Colour tokens

Defined as CSS variables in `app/globals.css`, consumed through Tailwind v4 `@theme`. Light is default, dark follows `prefers-color-scheme`, with a manual toggle.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#EDEFEC` | `#0D0F0E` | Page background (cool stone, not cream) |
| `--surface` | `#E3E6E2` | `#151816` | Raised areas, form fields |
| `--ink` | `#121513` | `#E7EAE6` | Primary text |
| `--muted` | `#5A615C` | `#9AA29C` | Secondary text (AA on `--bg` in both modes) |
| `--line` | `rgb(18 21 19 / 0.12)` | `rgb(231 234 230 / 0.12)` | Hairlines, blueprint grid |
| `--accent` | `#2F4BFF` | `#7C8CFF` | The only accent: links, focus rings, Engine layer, primary CTA |
| `--accent-ink` | `#FFFFFF` | `#0D0F0E` | Text on accent fills |

Rules: one accent across the whole site. No gradients on text. No pure black or white surfaces. Shadows, if any, are tinted with `--ink` at low opacity.

## Typography

- **Geist Sans** for display and body. **Geist Mono** for the Engine layer, metadata and numbers. Loaded with `next/font` from the `geist` package (self-hosted, no layout shift).
- Display: weight 500 to 600, `tracking-tight`, `leading-[0.95]` to `leading-[1.05]`. Fluid size with `clamp()`. Hero headline max 2 lines on desktop.
- Body: 16 to 18px, `leading-relaxed`, max width 65ch, colour `--muted` for supporting text.
- Emphasis uses weight or italic of the same family, never a second display font.
- Numbers in stats and the Engine layer use Geist Mono with tabular figures.

## Shape and spacing

- **Radius rule:** buttons are full pill. Everything else (images, cards, inputs, panels) is square (radius 0).
- Container: `max-w-[1400px] mx-auto px-4 md:px-8`.
- Section rhythm: `py-16 md:py-24` (tightened after review; the site read as too sparse at `py-36`). Generous negative space; group with hairlines instead of cards where possible.
- 12-column grid on desktop, deliberately asymmetric placements. Every multi-column layout collapses to a single column below 768px, declared in the component.

## Motion system

| Library | Used for | Not used for |
|---|---|---|
| **CSS** | Above-the-fold entrances (`Rise`, hero headline lines), scroll reveals (`Reveal` + one shared IntersectionObserver), diagram draw-in | Anything that needs physics or pointer input |
| **Motion** (`motion/react`) | Hover and press feedback, layout transitions, the hero lens (motion values, no React state), Surface/Engine switch, the work sticky stack (CSS sticky plus scroll-linked scale, no pinning needed) | Pinned horizontal sequences |
| **GSAP + ScrollTrigger** | Pinned sequences: process horizontal pan | Simple fade-ins, anything CSS sticky can do |
| **Lenis** | Smooth scrolling, synced to GSAP's ticker | Anything on touch devices beyond native momentum |

Easing: one house curve `cubic-bezier(0.16, 1, 0.3, 1)` for reveals; springs (`stiffness 120, damping 20`) for interactive feedback. Durations 0.4 to 0.9s; nothing loops forever except where it shows live state.

Every motion has a stated job:

| Moment | Job |
|---|---|
| Headline split-line reveal on load | Hierarchy: the first thing read is the claim |
| Hero x-ray lens, scroll x-ray, grid spotlight | Story: the Surface/Engine idea in one gesture |
| Word-by-word heading rise | Hierarchy: each section announces itself |
| Work panel tilt | Feedback: the panel responds to the hand |
| Service row sweep | Feedback: shows what is open or hovered |
| Footer wordmark fill | Story: the page closes on the name, drawn in as you arrive |
| Page curtain | State change: you moved to a different page |
| Work index and stage wipe | Story: one project at a time, with the full list always in view |
| Architecture diagram drawing in | Story: shows how the system is put together |
| Services accordion with image reveal | Feedback: what you hovered is what opens |
| Count-up on proof numbers | Hierarchy: draws the eye to the evidence, once |
| Process horizontal pan | Story: the engagement as a sequence |
| Magnetic primary CTA | Feedback: the one action that matters responds to you |
| Form field states | Feedback and state change |

**Reduced motion:** with `prefers-reduced-motion: reduce`, Lenis is off, pins become normal stacked sections, reveals are instant, the lens is replaced by the static toggle, diagrams render fully drawn.

**Performance budget:** animate only `transform` and `opacity`. No scroll event listeners. GSAP and Lenis loaded only on the client and only where used. Target 60fps on a mid-range phone.

## Page structure

### Home
1. **Hero:** headline, subtext (max 20 words), primary CTA plus one secondary. Left-aligned, asymmetric. The x-ray lens is the visual.
2. **Selected work:** a pinned frame, one screen of scroll per project. The heading stays pinned at the top with a counter (`02 / 05`, one progress segment per project, scrubbed by scroll) and a "Skip to services" link, so nobody is forced to scroll through every project. The left column lists the projects (number, name, client and period) and highlights the one in view; clicking a name scrolls to it. On the right the projects form a deck: each card slides up over the last, scrubbed by scroll, while the one beneath shrinks back and fades, so every scroll step visibly moves the work forward. Only the active card is focusable. The pinned panel is 16:9 and sized to the viewport height so the one-liner and numbers always fit. Mobile and reduced motion get a plain list. (Replaced the sticky card stack, whose dimming overlay read as a gradient; the deck fades whole cards rather than overlaying them.)
3. **Services:** the services as a list. Desktop rows never change height: hovering (after a short intent delay) or clicking a row swaps the sticky blueprint panel beside it, which shows the description, typical stack and deliverables and is always sized to the longest service. Mobile is an accordion.
4. **Proof:** large numbers that count up once, plus industries served. Plain layout, no cards. The lead number is set in Geist, not Geist Mono, because the mono slashed zero reads as a letter at that size; the supporting numbers stay mono.
5. **Process:** pinned horizontal pan through 5 stages, plus the 3 ways to work together beneath it.
6. **Labs:** personal and experimental builds in a draggable row.
7. **About:** short bio, portrait, the toolbelt. The toolbelt is the page's only marquee (real logos from Simple Icons).
8. **Testimonials:** up to 3 short quotes. Hidden until real quotes exist.
9. **FAQ:** short accordion.
10. **Contact:** project brief form (name, email, service, timeline, message) plus direct email. Full loading, success and error states.

No two sections share a layout family. Eyebrow labels used at most once every three sections.

### Other pages
- `/work/[slug]`: case study (context, constraints, architecture, decisions, results, stack).
- `/colophon`: how the site is built and measured.
- `404`: on-brand, with a way back.

## Accessibility and quality bar

- WCAG AA contrast in both modes, visible focus rings in the accent colour, full keyboard navigation, skip link.
- Real headings in order, labelled form fields (label above, error below), `aria-live` for form status.
- Lighthouse 95+ in all four categories on mobile. LCP under 2.5s, CLS under 0.1, INP under 200ms.
- No layout shift from fonts or images (explicit sizes, `next/font`).

## Copy rules

- No em or en dashes anywhere visible.
- One label per intent: "Start a project" for contact, "See the work" for portfolio. Used identically everywhere.
- Plain, confident sentences. No filler verbs (elevate, seamless, unleash, next-gen).
- Numbers only from `docs/profile.md`.

