// Renders social cards and icons to real .png files in public/, so static hosting
// serves them with the right content type. Runs before `dev` and `build`.
//   public/og/site.png, public/og/work/<slug>.png, public/icon.png, public/apple-icon.png
// Colours mirror the light theme tokens in app/globals.css.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createElement as h, type ReactNode } from 'react'
import { ImageResponse } from 'next/og.js'
import { hero, site } from '../content/site.ts'
import { projects } from '../content/projects.ts'

const C = { bg: '#edefec', ink: '#121513', muted: '#5a615c', accent: '#2f4bff', grid: 'rgba(47, 75, 255, 0.12)' }
const OG = { width: 1200, height: 630 }
const fontDir = join(process.cwd(), 'node_modules/geist/dist/fonts')

const fonts = [
    { name: 'Geist', data: await readFile(join(fontDir, 'geist-sans/Geist-Medium.ttf')), weight: 500 as const, style: 'normal' as const },
    { name: 'Geist Mono', data: await readFile(join(fontDir, 'geist-mono/GeistMono-Regular.ttf')), weight: 400 as const, style: 'normal' as const },
]

async function render(path: string, element: ReactNode, size: { width: number; height: number }) {
    const response = new ImageResponse(element as React.ReactElement, { ...size, fonts })
    await mkdir(join('public', path, '..'), { recursive: true })
    await writeFile(join('public', path), Buffer.from(await response.arrayBuffer()))
    console.log(`  public/${path}`)
}

type Palette = { bg: string; ink: string; muted: string; accent: string; grid: string }

function card(eyebrow: string, title: readonly string[], footer: string, palette: Palette = C) {
    const long = title.join('').length > 40
    return h(
        'div',
        {
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 72,
                backgroundColor: palette.bg,
                backgroundImage: `linear-gradient(${palette.grid} 1px, transparent 1px), linear-gradient(90deg, ${palette.grid} 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
            },
        },
        h(
            'div',
            { style: { display: 'flex', justifyContent: 'space-between', fontFamily: 'Geist Mono', fontSize: 24, color: palette.accent } },
            h('span', null, eyebrow),
            h('span', null, site.url.replace('https://', '')),
        ),
        h(
            'div',
            { style: { display: 'flex', flexDirection: 'column', fontFamily: 'Geist', fontSize: long ? 84 : 104, lineHeight: 1, letterSpacing: '-0.04em', color: palette.ink } },
            ...title.map((line) => h('span', { key: line }, line)),
        ),
        h('div', { style: { display: 'flex', fontFamily: 'Geist', fontSize: 30, color: palette.muted } }, footer),
    )
}

function monogram(size: number) {
    return h(
        'div',
        {
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // Near-black ink rather than pure #000, matching the site's darkest token.
                background: C.ink,
                color: C.bg,
                fontFamily: 'Geist',
                fontSize: size * 0.66,
                letterSpacing: '-0.07em',
                paddingBottom: size * 0.06,
            },
        },
        'NI',
    )
}

console.log('Generating social images and icons')
await render('og/site.png', card(site.name, hero.headline, 'Full-stack developer for web platforms, AI agents and interactive sites.'), OG)
for (const project of projects) {
    await render(`og/work/${project.slug}.png`, card(`Case study, ${site.name}`, [project.title], project.oneLiner), OG)
}
await render('og/trinket.png', card(`Side studio, ${site.name}`, ['Trinket & Layers'], 'Why I started a 3D print studio.'), OG)
await render('icon.png', monogram(64), { width: 64, height: 64 })
await render('apple-icon.png', monogram(180), { width: 180, height: 180 })
