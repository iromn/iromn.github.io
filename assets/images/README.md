# Source images

Drop original, full-resolution images here, then run `npm run images`. Optimised
AVIF and WebP files are written to `public/images/` at 800, 1600 and 2400px wide.

| Put the file here | Then set |
|---|---|
| `work/<slug>.png` (16:10, at least 2400px wide) | `cover: { src: '/images/work/<slug>', alt: '...' }` on the project in `content/projects.ts` |
| `labs/<name>.png` (4:3) | `image: '/images/labs/<name>'` on the item in `content/labs.ts` |
| `about/portrait.jpg` (4:5) | see `docs/ASSETS.md` row 1 |

Specs and art direction: `docs/ASSETS.md`.
