/* SSR structural parity check. Renders a page's Vue twin to a string
   in Node (no browser, no port) and diffs it against the static twin's
   <body> markup after normalizing whitespace and attribute order.
   Lives under packages/vue so bare `vue` / `@vue/server-renderer`
   resolve from packages/vue/node_modules. Dev harness, not published.

   Usage:  node port_check.mjs 07-flashcard [08-status-feed ...]
   Exit 0 only if every named page matches. */
import { readFileSync } from 'node:fs'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'

const base = new URL('../../demos/reference-recreations/', import.meta.url)

const sortAttrs = (s) =>
  s.replace(/<([a-zA-Z][\w-]*)((?:\s+[\w:-]+(?:="[^"]*")?)*)\s*(\/?)>/g, (m, tag, attrs, close) => {
    const parts = (attrs.trim().match(/[\w:-]+(?:="[^"]*")?/g) || []).sort()
    return `<${tag}${parts.length ? ' ' + parts.join(' ') : ''}${close}>`
  })

const norm = (s) =>
  sortAttrs(
    s
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .replace(/\s+>/g, '>')
      .replace(/<\s+/g, '<')
      .trim(),
  )

const firstDiff = (a, b) => {
  const n = Math.min(a.length, b.length)
  let i = 0
  while (i < n && a[i] === b[i]) i++
  const from = Math.max(0, i - 40)
  return { at: i, static: a.slice(from, i + 60), vue: b.slice(from, i + 60) }
}

const names = process.argv.slice(2)
if (!names.length) {
  console.error('usage: node port_check.mjs <name> [<name> ...]')
  process.exit(2)
}

let allPass = true
for (const name of names) {
  try {
    const App = (await import(new URL(`${name}.vue.js`, base))).default
    const rendered = await renderToString(createSSRApp(App))
    const staticHtml = readFileSync(new URL(`${name}.html`, base), 'utf8')
    const m = staticHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i)
    if (!m) { console.log(`FAIL ${name} — no <body> in static`); allPass = false; continue }
    const a = norm(m[1])
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
process.exit(allPass ? 0 : 1)
