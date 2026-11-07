// Serves the static export (out/) with gzip, like GitHub Pages, so local Lighthouse
// runs measure realistic transfer sizes. Usage: npm run build && npm run serve
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { gzipSync } from 'node:zlib'
const root = process.argv[2] || 'out', port = Number(process.argv[3] || 4174)
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.txt': 'text/plain', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.avif': 'image/avif', '.webp': 'image/webp' }
const compressible = new Set(['.html', '.js', '.css', '.json', '.txt', '.svg', '.xml'])
createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '')
  let file = join(root, path)
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html') } catch { file = join(root, '404.html'); res.statusCode = 404 }
  try {
    let body = await readFile(file); const ext = extname(file)
    res.setHeader('Content-Type', types[ext] || 'application/octet-stream')
    if (compressible.has(ext) && /gzip/.test(req.headers['accept-encoding'] || '')) { body = gzipSync(body); res.setHeader('Content-Encoding', 'gzip') }
    res.end(body)
  } catch { res.statusCode = 404; res.end('not found') }
}).listen(port, () => console.log('serving', root, 'on', port))
