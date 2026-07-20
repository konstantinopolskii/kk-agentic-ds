/* SSR structural parity check for SFC-authored pattern pages. Compiles a
   page's SFC on the fly with Vite in middleware mode (no dev server port,
   no build step), renders it to a string in Node, and diffs it against the
   frozen fundamental--accepted static twin's <body> markup after
   normalizing whitespace and attribute order. Modeled on page_check.mjs —
   same norm/sortAttrs/decodeText/firstDiff, applied to sfc/pages/pattern-*.vue
   instead of the reference-recreations h() oracle twins.

   Name mapping: pattern-index -> demos/fundamental--accepted/index.html
                 pattern-<x>   -> demos/fundamental--accepted/patterns/<x>.html

   Statics in this oracle carry a kit.js <script> tag (and sometimes an
   inline script) inside <body> — those are stripped from the static body
   before normalizing, since the SFC pages carry no such tag.

   Usage:  node patterns_check.mjs card-stack [index sidebar-nav ...]
   Exit 0 only if every named page matches. */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'

const staticBase = new URL('../../demos/fundamental--accepted/', import.meta.url)
const kitEntry = fileURLToPath(new URL('./sfc/index.ts', import.meta.url))

/* Attribute-level equivalences: order-insensitive attrs and class tokens,
   normalized style whitespace, void self-close slash dropped. All are
   serialization artifacts — none change the rendered DOM — so the gate
   compares meaning, not bytes. Keeps kit components usable on pages whose
   frozen static was hand-authored with a different serializer. */
const sortAttrs = (s) =>
  s.replace(/<([a-zA-Z][\w-]*)((?:\s+[\w:-]+(?:="[^"]*")?)*)\s*(\/?)>/g, (m, tag, attrs) => {
    const parts = (attrs.trim().match(/[\w:-]+(?:="[^"]*")?/g) || [])
      .map((p) => {
        const cm = p.match(/^class="([^"]*)"$/)
        if (cm) return `class="${cm[1].trim().split(/\s+/).sort().join(' ')}"`
        const sm = p.match(/^style="([^"]*)"$/)
        if (sm)
          return `style="${sm[1].replace(/\s*:\s*/g, ':').replace(/\s*;\s*/g, ';').replace(/;$/, '')}"`
        return p
      })
      .sort()
    return `<${tag}${parts.length ? ' ' + parts.join(' ') : ''}>`
  })

/* Decode the text-level entities Vue's SSR escaper emits for characters
   hand-authored HTML carries raw. Order matters: &amp; decodes last. */
const decodeText = (s) =>
  s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')

const norm = (s) =>
  decodeText(
    sortAttrs(
      s
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .replace(/\s+>/g, '>')
        .replace(/<\s+/g, '<')
        .trim(),
    ),
  )

const firstDiff = (a, b) => {
  const n = Math.min(a.length, b.length)
  let i = 0
  while (i < n && a[i] === b[i]) i++
  const from = Math.max(0, i - 40)
  return { at: i, static: a.slice(from, i + 60), vue: b.slice(from, i + 60) }
}

/* Strip <script>...</script> tags (with or without src) from the static
   body — the fundamental--accepted statics carry kit.js + inline wiring
   scripts that the SFC pages do not reproduce. */
const stripScripts = (s) => s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')

const staticPathFor = (name) =>
  name === 'index' ? new URL('index.html', staticBase) : new URL(`patterns/${name}.html`, staticBase)

const names = process.argv.slice(2)
if (!names.length) {
  console.error('usage: node patterns_check.mjs <name> [<name> ...]')
  process.exit(2)
}

const server = await createServer({
  configFile: false,
  appType: 'custom',
  // per-process cache: concurrent gate runs must not race on node_modules/.vite
  cacheDir: `node_modules/.vite-patternscheck-${process.pid}`,
  server: { middlewareMode: true },
  plugins: [vue()],
  resolve: { alias: { '@konstantinopolskii/vue': kitEntry } },
  logLevel: 'error',
})

let allPass = true
try {
  for (const name of names) {
    const pageName = `pattern-${name}`
    try {
      const mod = await server.ssrLoadModule(`/sfc/pages/${pageName}.vue`)
      const App = mod.default
      const rendered = await renderToString(createSSRApp(App))
      const staticHtml = readFileSync(staticPathFor(name), 'utf8')
      const m = staticHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i)
      if (!m) { console.log(`FAIL ${name} — no <body> in static`); allPass = false; continue }
      const a = norm(stripScripts(m[1]))
      const b = norm(rendered)
      if (a === b) {
        console.log(`PASS ${name} — SSR DOM matches static (${a.length} chars)`)
      } else {
        allPass = false
        const d = firstDiff(a, b)
        console.log(`FAIL ${name} — diverges at char ${d.at}`)
        console.log(`  static: …${d.static}…`)
        console.log(`  vue   : …${d.vue}…`)
      }
    } catch (e) {
      allPass = false
      console.log(`FAIL ${name} — ${e.message}`)
    }
  }
} finally {
  await server.close()
}
process.exit(allPass ? 0 : 1)
