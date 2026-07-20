/* Parity gate for the markdown port: sfc/markdown.ts's renderMarkdown()
   must produce byte-identical output to legacy js/md.js's
   window.KKMd.render() for the same input. No normalization — the port
   is a 1:1 port, so an exact string diff is the correct bar.

   Legacy side: js/md.js is a vanilla IIFE that attaches window.KKMd. It
   references bare `window`/`document` (no module wrapper), so it is run
   inside a node:vm context whose global object is a happy-dom Window —
   the same trick as running it in a browser, minus the browser.

   New side: sfc/markdown.ts is compiled on the fly with Vite in
   middleware mode (ssrLoadModule) — same pattern as page_check.mjs —
   so the gate needs no build step and no separate cache dir race
   (per-process cacheDir, like page_check.mjs).

   Usage:  node md_check.mjs
   Exit 0 only if every oracle input matches byte-for-byte. */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'
import { Window } from 'happy-dom'
import { createServer } from 'vite'

const repoRoot = fileURLToPath(new URL('../../', import.meta.url))
const legacySrc = readFileSync(new URL('../../js/md.js', import.meta.url), 'utf8')

/* One oracle input per demos/md-renderer-smoke sample plus the
   manifesto.md that index.html renders live, each with the heading
   offset the real page actually uses for that file (all four are
   data-md-heading-offset="0" today — see demos/md-renderer-smoke/
   index.html and index.html at repo root). */
const oracles = [
  { name: 'sample-a', path: 'demos/md-renderer-smoke/sample-a.md', headingOffset: 0 },
  { name: 'sample-b', path: 'demos/md-renderer-smoke/sample-b.md', headingOffset: 0 },
  { name: 'sample-c', path: 'demos/md-renderer-smoke/sample-c.md', headingOffset: 0 },
  { name: 'manifesto', path: 'skills/kk-design-system/manifesto.md', headingOffset: 0 },
]

function legacyRender(src, headingOffset) {
  const window = new Window()
  const document = window.document
  const context = vm.createContext({ window, document, console })
  vm.runInContext(legacySrc, context, { filename: 'md.js' })
  return window.KKMd.render(src, headingOffset)
}

const firstDiff = (a, b) => {
  const n = Math.min(a.length, b.length)
  let i = 0
  while (i < n && a[i] === b[i]) i++
  const from = Math.max(0, i - 40)
  return { at: i, legacy: a.slice(from, i + 60), vue: b.slice(from, i + 60), lenA: a.length, lenB: b.length }
}

const server = await createServer({
  configFile: false,
  appType: 'custom',
  // per-process cache: concurrent gate runs must not race on node_modules/.vite
  cacheDir: `node_modules/.vite-mdcheck-${process.pid}`,
  root: fileURLToPath(new URL('.', import.meta.url)),
  server: { middlewareMode: true },
  logLevel: 'error',
})

let allPass = true
try {
  const mod = await server.ssrLoadModule('/sfc/markdown.ts')
  const { renderMarkdown } = mod

  for (const oracle of oracles) {
    try {
      const src = readFileSync(repoRoot + oracle.path, 'utf8')
      const legacy = legacyRender(src, oracle.headingOffset)
      const vue = renderMarkdown(src, { headingOffset: oracle.headingOffset })
      if (legacy === vue) {
        console.log(`PASS ${oracle.name} — byte-identical (${legacy.length} chars)`)
      } else {
        allPass = false
        const d = firstDiff(legacy, vue)
        console.log(
          `FAIL ${oracle.name} — diverges at char ${d.at} (legacy ${d.lenA} chars, vue ${d.lenB} chars)`,
        )
        console.log(`  legacy: …${d.legacy}…`)
        console.log(`  vue   : …${d.vue}…`)
      }
    } catch (e) {
      allPass = false
      console.log(`FAIL ${oracle.name} — ${e.message}`)
    }
  }
} finally {
  await server.close()
}
process.exit(allPass ? 0 : 1)
