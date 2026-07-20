/* Gate for sfc/pages/manifesto.vue — the SFC rebuild of root index.html.
   Modeled on page_check.mjs (Vite middleware-mode SSR, per-process
   cacheDir, ssrLoadModule) with two extra checks page_check.mjs does not
   need: (1) the book's rendered content is baked markdown, not a frozen
   static twin, so it is asserted against sfc/markdown.ts's renderMarkdown
   output directly instead of a demos/*.html oracle; (2) the frozen static
   is root index.html itself, still wearing the retired fetch-pipeline's
   two <script src> tags and the empty main.book's data-md-* attributes —
   both stripped before the shell-parity diff, since the new page carries
   neither.

   server.fs.allow: manifesto.vue's `?raw` import reaches outside
   packages/vue (into repo-root skills/kk-design-system/manifesto.md).
   Vite's dev/middleware-mode fs guard would otherwise refuse to serve it.

   Usage:  node manifesto_check.mjs
   Exit 0 only if every check passes (including `npm run typecheck`). */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'

const vuePkgRoot = fileURLToPath(new URL('.', import.meta.url))
const repoRoot = fileURLToPath(new URL('../../', import.meta.url))
const legacyIndexPath = fileURLToPath(new URL('../../index.html', import.meta.url))
const manifestoMdPath = fileURLToPath(
  new URL('../../skills/kk-design-system/manifesto.md', import.meta.url),
)

/* ---- norm/sortAttrs/decodeText — copied from page_check.mjs, plus one
   fold ahead of the whitespace collapse: &nbsp; round-trips through
   Vue's SSR escaper as a literal U+00A0 character (verified empirically
   — the template compiler decodes the named entity at parse time and
   the SSR string escaper only re-encodes &, <, >, ", not high code
   points), while the legacy static HTML keeps the literal 6-char
   entity. JS's `\s` class matches U+00A0, so page_check.mjs's own
   `.replace(/\s+/g, ' ')` step would silently fold the Vue side's real
   nbsp to a plain space while leaving the legacy side's literal
   "&nbsp;" text untouched (it contains no whitespace character at all)
   — a one-sided collapse no page_check.mjs consumer happened to trip
   since none of those oracles compare raw &nbsp; text against a live
   nbsp char. Folding the entity to a plain space FIRST, before the
   generic collapse runs, makes both sides collapse identically. ---- */
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

const decodeText = (s) => s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')

const norm = (s) =>
  decodeText(
    sortAttrs(
      s
        .replace(/&nbsp;/g, ' ')
        .replace(/<!--[\s\S]*?-->/g, '')
        // Legacy index.html pretty-prints every element on its own
        // indented line, so a tag's text child carries source-formatting
        // whitespace (a newline plus indentation) at both edges — e.g.
        // "<footer ...>\n        2026...consulting\n      </footer>".
        // The SFC writes the same text compactly with no such padding.
        // page_check.mjs's own `>\s+<` rule only drops whitespace that
        // sits between two tags with no text in between, so it misses
        // this tag-to-text edge. Strip it here, but only whitespace runs
        // that contain a newline (source formatting) — a plain single
        // space with no newline is a real word-separator (e.g. `</code>
        // by default`) and must survive untouched.
        .replace(/>[ \t]*\n\s*/g, '>')
        .replace(/\s*\n[ \t]*</g, '<')
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
  return { at: i, a: a.slice(from, i + 60), b: b.slice(from, i + 60), lenA: a.length, lenB: b.length }
}

let allPass = true
function report(name, ok, detail) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`)
  if (!ok) allPass = false
  if (detail) console.log(detail)
}

const server = await createServer({
  configFile: false,
  appType: 'custom',
  root: vuePkgRoot,
  // per-process cache: concurrent gate runs must not race on node_modules/.vite
  cacheDir: `node_modules/.vite-manifestocheck-${process.pid}`,
  server: { middlewareMode: true, fs: { allow: [repoRoot] } },
  plugins: [vue()],
  // Same alias page_check.mjs carries: the page imports the package by
  // name; without the alias Node self-reference resolves it to the stale
  // built dist/ instead of the live sfc/ source.
  resolve: { alias: { '@konstantinopolskii/vue': fileURLToPath(new URL('./sfc/index.ts', import.meta.url)) } },
  logLevel: 'error',
})

try {
  // ---- 1. SSR renders without error; book content matches renderMarkdown
  const mdMod = await server.ssrLoadModule('/sfc/markdown.ts')
  const { renderMarkdown } = mdMod
  const manifestoMd = readFileSync(manifestoMdPath, 'utf8')
  const expectedBook = renderMarkdown(manifestoMd, { headingOffset: 0 })

  const pageMod = await server.ssrLoadModule('/sfc/pages/manifesto.vue')
  const App = pageMod.default
  const rendered = await renderToString(createSSRApp(App))

  const bookMatch = rendered.match(/<main\b[^>]*>([\s\S]*)<\/main>/)
  if (!bookMatch) {
    report('ssr-renders', false, '  no <main> found in SSR output')
  } else {
    report('ssr-renders', true)
    const actualBook = bookMatch[1]
    if (actualBook === expectedBook) {
      report('book-content-matches-renderMarkdown', true, `  (${actualBook.length} chars)`)
    } else {
      const d = firstDiff(expectedBook, actualBook)
      report(
        'book-content-matches-renderMarkdown',
        false,
        `  diverges at char ${d.at} (expected ${d.lenA} chars, actual ${d.lenB} chars)\n` +
          `  expected: …${d.a}…\n` +
          `  actual  : …${d.b}…`,
      )
    }
  }

  // ---- 2. Generated static in sync with the source page ----
  // The original oracle — the legacy 174-line fetch-pipeline shell — was
  // consumed when ssg.mjs regenerated index.html in place (the page passed
  // shell-parity against it first; see git history for the frozen shell).
  // What this check guards now: editing manifesto.vue and forgetting to
  // rebuild + regenerate. The static's #app payload must equal a fresh SSR
  // render of the current source, byte-for-byte after norm().
  const staticHtml = readFileSync(legacyIndexPath, 'utf8')
  const appMatch = staticHtml.match(/<div id="app"[^>]*>([\s\S]*)<\/div>\s*<script type="module">/)
  if (!appMatch) {
    report('static-in-sync', false, '  no <div id="app"> payload in root index.html')
  } else {
    const a = norm(appMatch[1])
    const b = norm(rendered)
    if (a === b) {
      report('static-in-sync', true, `  (${a.length} chars)`)
    } else {
      const d = firstDiff(a, b)
      report(
        'static-in-sync',
        false,
        `  diverges at char ${d.at} — rebuild pages + rerun ssg.mjs\n` +
          `  static: …${d.a}…\n` +
          `  source: …${d.b}…`,
      )
    }
  }
} catch (e) {
  allPass = false
  console.log(`FAIL manifesto — ${e.stack || e.message}`)
} finally {
  await server.close()
}

// ---- 3. typecheck ----
try {
  execSync('npm run typecheck', { cwd: vuePkgRoot, stdio: 'pipe' })
  report('typecheck', true)
} catch (e) {
  report('typecheck', false, (e.stdout?.toString() || '') + (e.stderr?.toString() || ''))
}

process.exit(allPass ? 0 : 1)
