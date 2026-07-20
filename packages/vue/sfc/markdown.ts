/* markdown.ts — 1:1 port of js/md.js's render pipeline (js/md.js is frozen
   legacy; this file is the live 2.0 surface). Only the pure md-string →
   HTML-string conversion is ported. The fetch/init half of md.js — reading
   [data-md-src], injecting innerHTML, dispatching kk:md-rendered — stays
   legacy; Vue pages fetch or `?raw`-import their own markdown and pass the
   text straight to renderMarkdown.

   No DOM, no window, no fetch — SSR-safe by construction. Every helper
   below (stash/unstash, inline, renderTable, wrapInSections, renderList,
   isRawHtmlLine, the block-scanning loop) mirrors js/md.js's function of
   the same name; the output contract is byte-identical to
   `window.KKMd.render(src, headingOffset)` for the same input. See
   packages/vue/md_check.mjs for the parity gate against the legacy file.

   Supported markdown dialect (unchanged from js/md.js):
     headings h1..h4 (deeper levels demote to `<p class="t-caption">`),
     paragraphs, unordered + ordered lists, links, inline code, fenced
     code blocks (```), bold, italic, GFM pipe tables, blockquotes,
     horizontal rules (---), raw HTML passthrough.

   Heading-level offset: mirrors js/md.js's `render(src, headingOffset)`
   second argument — every level shifts by `opts.headingOffset` (default
   0, matching legacy render's own default; the legacy `load()`/`init()`
   wrapper defaulted the DOM attribute to +1, but that default lived in
   the retired fetch/init half, not in render itself). Shifted level
   floors at 1 and caps at 4 so it always resolves in CLASS_MAP.

   Section auto-wrap: wraps each h2-rooted region in
   `<article class="book__section">`, exactly as js/md.js's
   wrapInSections — the first article spans everything before the first
   h2 (source h1, preamble, intro paragraphs); each subsequent h2 starts
   a new article.

   Security: markdown source is author-controlled (lives in the repo).
   Raw HTML passthrough is by design, same as legacy. */

export interface RenderMarkdownOptions {
  headingOffset?: number
}

const CLASS_MAP: Record<string, string> = {
  h1: 't-hero',
  h2: 't-display',
  h3: 't-title',
  h4: 't-subtitle',
  p: 't-body',
  ul: 't-list',
  ol: 't-list',
  blockquote: 'quote',
  table: 'registry-table',
  th: 't-caption--bold',
  td: 't-caption',
}

// Placeholder sentinel for stashed raw spans (inline code, later restored
// raw HTML). Two private-use unicode chars, same as js/md.js, so the
// sentinel cannot collide with prose an author writes.
const STASH_OPEN = ''
const STASH_CLOSE = ''

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Raw HTML block heuristic: starts at column 0 with < plus a letter or /.
function isRawHtmlLine(line: string): boolean {
  return /^<[a-zA-Z/!]/.test(line)
}

// Section auto-wrap. Splits the rendered HTML on every <h2 ...> opener
// and wraps each h2-rooted region in <article class="book__section">.
// The first article spans pre-h2 content (h1, preamble, intros). Each
// subsequent h2 starts a new article. Source markdown without an h2
// wraps as a single section.
function wrapInSections(html: string): string {
  const parts = html.split(/(<h2\b[^>]*>)/)
  if (parts.length === 1) {
    const only = parts[0].trim()
    return only ? '<article class="book__section">' + parts[0] + '</article>' : ''
  }
  const sections: string[] = []
  if (parts[0].trim()) {
    sections.push('<article class="book__section">' + parts[0] + '</article>')
  }
  for (let i = 1; i < parts.length; i += 2) {
    const h2tag = parts[i]
    const content = parts[i + 1] || ''
    sections.push('<article class="book__section">' + h2tag + content + '</article>')
  }
  return sections.join('\n')
}

/** Pure port of js/md.js's render(src, headingOffset). No DOM, no window,
 *  no fetch — safe to call from SSR or plain Node. Output is byte-identical
 *  to `window.KKMd.render(md, opts?.headingOffset)` for the same input. */
export function renderMarkdown(md: string, opts?: RenderMarkdownOptions): string {
  const offset = opts?.headingOffset == null ? 0 : opts.headingOffset | 0

  // Stash for raw spans pulled out during the inline pass (inline code)
  // so their contents survive the bold/italic/link regexes untouched,
  // then get restored after block structure — including section
  // wrapping — is decided. Scoped to this call (js/md.js used a
  // module-level array reset per render; a local array makes concurrent
  // renderMarkdown calls safe without changing the output).
  const blocks: string[] = []
  function stash(html: string): string {
    blocks.push(html)
    return STASH_OPEN + (blocks.length - 1) + STASH_CLOSE
  }
  function unstash(html: string): string {
    const re = new RegExp(STASH_OPEN + '(\\d+)' + STASH_CLOSE, 'g')
    return html.replace(re, (_match: string, i: string) => blocks[+i])
  }

  // Inline formatting: runs after block structure is decided.
  // Order: inline code, then bold, then italic, then links.
  function inline(text: string): string {
    // Inline code. Stash the rendered span so inner * or _ are left alone.
    text = text.replace(/`([^`\n]+)`/g, (_match: string, code: string) =>
      stash('<code class="t-code">' + escHtml(code) + '</code>'),
    )
    // Bold. Run before italic so ** is not eaten by the * rule.
    text = text.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
    // Italic. Require a non-* prefix so remnants of ** cannot match.
    text = text.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    // Links [text](href). Authors who need target/rel drop raw <a> HTML.
    text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    return text
  }

  // Table: GFM pipe syntax. Receives the raw block (header + separator + rows).
  function renderTable(block: string): string | null {
    const lines = block.split('\n').filter((l) => l.trim().length)
    if (lines.length < 2) return null
    function cells(line: string): string[] {
      const t = line.trim().replace(/^\|/, '').replace(/\|$/, '')
      return t.split('|').map((c) => c.trim())
    }
    const header = cells(lines[0])
    const sep = lines[1]
    if (!/^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(sep)) return null
    const rows = lines.slice(2).map(cells)
    let html = '<table class="registry-table"><thead><tr>'
    header.forEach((h) => {
      html += '<th class="t-caption--bold">' + inline(h) + '</th>'
    })
    html += '</tr></thead><tbody>'
    rows.forEach((r) => {
      html += '<tr>'
      r.forEach((c) => {
        html += '<td class="t-caption">' + inline(c) + '</td>'
      })
      html += '</tr>'
    })
    html += '</tbody></table>'
    return html
  }

  // List: renders a consecutive run of ul or ol items.
  function renderList(items: string[], ordered: boolean): string {
    const tag = ordered ? 'ol' : 'ul'
    let out = '<' + tag + ' class="t-list">'
    items.forEach((it) => {
      out += '<li>' + inline(it.trim()) + '</li>'
    })
    out += '</' + tag + '>'
    return out
  }

  // Main block converter. Heading levels shift by headingOffset — floors
  // at 1, caps at 4 so the shifted level always resolves in CLASS_MAP.
  const src = md.replace(/\r\n?/g, '\n')
  const lines = src.split('\n')
  const out: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Blank line between blocks.
    if (!line.trim()) {
      i++
      continue
    }

    // Fenced code block.
    if (/^```/.test(line)) {
      const buf: string[] = []
      i++
      while (i < lines.length && !/^```/.test(lines[i])) {
        buf.push(lines[i])
        i++
      }
      i++
      out.push('<pre><code class="t-code t-code--block">' + escHtml(buf.join('\n')) + '</code></pre>')
      continue
    }

    // Horizontal rule.
    if (/^---+\s*$/.test(line)) {
      out.push('<hr />')
      i++
      continue
    }

    // Heading.
    const h = /^(#{1,6})\s+(.*)$/.exec(line)
    if (h) {
      let level = h[1].length + offset
      if (level < 1) level = 1
      const inner = inline(h[2].trim())
      if (level > 4) {
        out.push('<p class="t-caption">' + inner + '</p>')
      } else {
        const tag = 'h' + level
        out.push('<' + tag + ' class="' + CLASS_MAP[tag] + '">' + inner + '</' + tag + '>')
      }
      i++
      continue
    }

    // Blockquote. Consecutive lines starting with >.
    if (/^>\s?/.test(line)) {
      const qbuf: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        qbuf.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      out.push('<blockquote class="quote">' + inline(qbuf.join(' ')) + '</blockquote>')
      continue
    }

    // Table. Current line has a pipe, next is a separator row.
    if (
      /\|/.test(line) &&
      i + 1 < lines.length &&
      /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(lines[i + 1])
    ) {
      const tbuf = [line]
      i++
      while (i < lines.length && lines[i].trim() && /\|/.test(lines[i])) {
        tbuf.push(lines[i])
        i++
      }
      const tbl = renderTable(tbuf.join('\n'))
      if (tbl) {
        out.push(tbl)
        continue
      }
    }

    // Unordered list.
    if (/^[-*+]\s+/.test(line)) {
      const uitems: string[] = []
      while (i < lines.length && /^[-*+]\s+/.test(lines[i])) {
        uitems.push(lines[i].replace(/^[-*+]\s+/, ''))
        i++
      }
      out.push(renderList(uitems, false))
      continue
    }

    // Ordered list.
    if (/^\d+\.\s+/.test(line)) {
      const oitems: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        oitems.push(lines[i].replace(/^\d+\.\s+/, ''))
        i++
      }
      out.push(renderList(oitems, true))
      continue
    }

    // Raw HTML block. Passes through until a blank line.
    if (isRawHtmlLine(line)) {
      const rbuf = [line]
      i++
      while (i < lines.length && lines[i].trim()) {
        rbuf.push(lines[i])
        i++
      }
      out.push(rbuf.join('\n'))
      continue
    }

    // Paragraph. Collect until blank line or another block opener.
    const pbuf = [line]
    i++
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4}\s|```|>|---+\s*$|[-*+]\s|\d+\.\s)/.test(lines[i])
    ) {
      if (isRawHtmlLine(lines[i])) break
      pbuf.push(lines[i])
      i++
    }
    out.push('<p class="t-body">' + inline(pbuf.join(' ')) + '</p>')
  }

  // Wrap before unstash — see js/md.js's comment on this ordering: raw
  // HTML blocks are sentinel tokens during the wrap pass, so the <h2>
  // split only finds md-emitted heading tags. Unstashing afterward
  // restores raw HTML inside whichever section it landed in.
  return unstash(wrapInSections(out.join('\n')))
}
