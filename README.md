# Nganba Irom: portfolio

Freelance portfolio for Nganba Irom, full-stack developer. Live at https://iromn.github.io.

Built with Next.js (static export), TypeScript, Tailwind CSS v4, Motion, GSAP and Lenis. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build      # static export to out/
npm run serve      # serve out/ with gzip on :4174, for realistic local Lighthouse runs
npm run images     # optimise source images in assets/images/ into public/images/
npm run social     # regenerate social cards and icons (runs before dev and build)
```

The contact form posts to Web3Forms. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WEB3FORMS_KEY` for local testing; in CI it comes from the `WEB3FORMS_KEY` Actions variable.

Project docs live in `docs/` (design, content, architecture, assets). The previous version of the site is kept on the `archive/v1-terminal-portfolio` branch.
