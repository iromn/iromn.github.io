// Turns source images in assets/images/ into AVIF and WebP at the widths the site uses.
//   assets/images/work/botlune.png  ->  public/images/work/botlune-{800,1600,2400}.{avif,webp}
// Widths larger than the source are skipped (the largest available is used instead).
// Usage: npm run images
import { mkdir, readdir, stat } from 'node:fs/promises'
import { dirname, extname, join, relative } from 'node:path'
import sharp from 'sharp'

const SRC = 'assets/images'
const OUT = 'public/images'
const WIDTHS = [800, 1600, 2400] // keep in sync with IMAGE_WIDTHS in lib/constants.ts
const INPUT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'])

async function* walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) yield* walk(path)
        else if (INPUT.has(extname(entry.name).toLowerCase())) yield path
    }
}

let count = 0
for await (const file of walk(SRC)) {
    const base = join(OUT, relative(SRC, file)).slice(0, -extname(file).length)
    await mkdir(dirname(base), { recursive: true })
    const { width: sourceWidth = 0, height: sourceHeight = 0 } = await sharp(file).metadata()

    for (const width of WIDTHS) {
        const resize = Math.min(width, sourceWidth)
        const pipeline = sharp(file).rotate().resize({ width: resize, withoutEnlargement: true })
        await pipeline.clone().avif({ quality: 55, effort: 6 }).toFile(`${base}-${width}.avif`)
        await pipeline.clone().webp({ quality: 78, effort: 5 }).toFile(`${base}-${width}.webp`)
    }
    const kb = Math.round((await stat(`${base}-1600.avif`)).size / 1024)
    console.log(`${relative(SRC, file)}  ${sourceWidth}x${sourceHeight}  ->  ${relative(OUT, base)}-*.{avif,webp}  (1600w avif ${kb} KB)`)
    count++
}
console.log(count ? `Done: ${count} image(s).` : `No images found in ${SRC}/.`)
