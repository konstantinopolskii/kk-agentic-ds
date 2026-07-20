/* Static-page generator for the 2.0 SFC layer. Renders a page module's
   default export to HTML in Node and writes a self-contained page: the
   SSR body paints with zero JS, then a module script hydrates the same
   component over it so the behavior layer (scroll spy, modals, comments)
   wires up. Hydration mounts in place, so onMounted hooks see their
   elements inside the document — the one thing the old mount-and-move
   demo shells got wrong.

   Usage:  node ssg.mjs <page-module.js> <out.html> [--title "Page title"]

   The page module is anything whose default export is a Vue component
   (a compiled SFC from dist, or a hand-authored h() page). Asset hrefs
   in the shell are written relative to the output file's location. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve, relative, join } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'

const args = process.argv.slice(2)
const titleIdx = args.indexOf('--title')
const title = titleIdx > -1 ? args.splice(titleIdx, 2)[1] : 'Generated page'
const [moduleArg, outArg] = args
if (!moduleArg || !outArg) {
  console.error('usage: node ssg.mjs <page-module.js> <out.html> [--title "Page title"]')
  process.exit(2)
}

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const modulePath = resolve(moduleArg)
const outPath = resolve(outArg)
const outDir = dirname(outPath)

const App = (await import(pathToFileURL(modulePath).href)).default
const body = await renderToString(createSSRApp(App))

// Import-map values must parse as URLs: a relative path without a
// ./ or ../ prefix resolves to null and the browser blocks the import.
// Outputs below repo root get ../ from relative() naturally; outputs AT
// repo root get a bare "packages/…" and need the ./ prefix stamped.
const dotted = (p) => (p.startsWith('.') ? p : './' + p)
const toOut = (p) => dotted(relative(outDir, join(repoRoot, p)).split('\\').join('/'))
const moduleHref = dotted(relative(outDir, modulePath).split('\\').join('/'))
const vueHref = toOut('packages/vue/node_modules/vue/dist/vue.esm-browser.prod.js')
const kitHref = toOut('packages/vue/dist/index.js')

// display: contents — the hydration container must not exist in layout:
// .app resolves height: 100% against its parent, and legacy pages put
// .app directly under body. An unstyled wrapper div breaks that chain
// (height resolves to auto, the app grows to content height, and the
// document steals scroll from .book, the kit's one scroll owner).
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${title}</title>
  <link rel="preload" href="${toOut('fonts/commissioner/Commissioner-Latin.woff2')}" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${toOut('vars.css')}">
  <link rel="stylesheet" href="${toOut('style.css')}">
  <script type="importmap">
    { "imports": { "vue": "${vueHref}", "@konstantinopolskii/vue": "${kitHref}" } }
  </script>
</head>
<body>
  <div id="app" style="display: contents">${body}</div>
  <script type="module">
    import { createSSRApp } from 'vue'
    import App from '${moduleHref}'
    createSSRApp(App).mount('#app')
  </script>
</body>
</html>
`

mkdirSync(outDir, { recursive: true })
writeFileSync(outPath, html)
console.log(`wrote ${relative(process.cwd(), outPath)} (${body.length} chars SSR body)`)
