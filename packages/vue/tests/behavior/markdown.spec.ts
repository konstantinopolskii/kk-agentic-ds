import { describe, expect, it } from 'vitest'
import { renderMarkdown } from '../../sfc/markdown'

/* Coverage mirrors js/md.js's documented dialect (headings h1..h4,
   paragraphs, lists, links, inline code, fenced code, bold, italic,
   GFM tables, blockquotes, hr, raw HTML passthrough) plus the
   heading-offset and book__section auto-wrap behavior. Parity against
   the legacy renderer itself is covered by md_check.mjs against the
   real oracle files; these assertions pin the contract at the
   unit level. */
describe('renderMarkdown', () => {
  it('renders headings h1..h4 with kit classes, no offset by default', () => {
    const out = renderMarkdown('# One\n\n## Two\n\n### Three\n\n#### Four')
    expect(out).toContain('<h1 class="t-hero">One</h1>')
    expect(out).toContain('<h2 class="t-display">Two</h2>')
    expect(out).toContain('<h3 class="t-title">Three</h3>')
    expect(out).toContain('<h4 class="t-subtitle">Four</h4>')
  })

  it('shifts heading level by headingOffset, floors at 1, demotes past h4 to t-caption', () => {
    const shifted = renderMarkdown('# Root', { headingOffset: 1 })
    expect(shifted).toContain('<h2 class="t-display">Root</h2>')

    const floored = renderMarkdown('# Root', { headingOffset: -5 })
    expect(floored).toContain('<h1 class="t-hero">Root</h1>')

    const demoted = renderMarkdown('##### Deep', { headingOffset: 0 })
    expect(demoted).toContain('<p class="t-caption">Deep</p>')
    expect(demoted).not.toMatch(/<h\d/)
  })

  it('renders unordered and ordered lists as t-list', () => {
    const ul = renderMarkdown('- First\n- Second')
    expect(ul).toContain('<ul class="t-list"><li>First</li><li>Second</li></ul>')

    const ol = renderMarkdown('1. First\n2. Second')
    expect(ol).toContain('<ol class="t-list"><li>First</li><li>Second</li></ol>')
  })

  it('renders fenced code blocks as pre > code.t-code--block, escaping HTML', () => {
    const out = renderMarkdown('```\nconst x = 1 < 2;\n```')
    expect(out).toContain('<pre><code class="t-code t-code--block">const x = 1 &lt; 2;</code></pre>')
  })

  it('renders inline code as code.t-code, protected from the bold/italic pass', () => {
    const out = renderMarkdown('Use `*not-italic*` here.')
    expect(out).toContain('<code class="t-code">*not-italic*</code>')
    expect(out).not.toContain('<em>')
  })

  it('renders links as <a href>', () => {
    const out = renderMarkdown('See the [docs](https://example.com/docs).')
    expect(out).toContain('<a href="https://example.com/docs">docs</a>')
  })

  it('renders bold and italic', () => {
    const out = renderMarkdown('**bold** and *italic* text.')
    expect(out).toContain('<strong>bold</strong>')
    expect(out).toContain('<em>italic</em>')
  })

  it('renders blockquotes and horizontal rules', () => {
    const quote = renderMarkdown('> A quoted line.')
    expect(quote).toContain('<blockquote class="quote">A quoted line.</blockquote>')

    const hr = renderMarkdown('Above.\n\n---\n\nBelow.')
    expect(hr).toContain('<hr />')
  })

  it('renders a GFM pipe table as registry-table', () => {
    const out = renderMarkdown('| A | B |\n|---|---|\n| 1 | 2 |')
    expect(out).toContain('<table class="registry-table">')
    expect(out).toContain('<th class="t-caption--bold">A</th>')
    expect(out).toContain('<td class="t-caption">1</td>')
  })

  it('passes raw HTML blocks through unchanged', () => {
    const out = renderMarkdown('<div class="card">\n  <p>Raw</p>\n</div>')
    expect(out).toContain('<div class="card">\n  <p>Raw</p>\n</div>')
  })

  it('wraps a single section with no h2 in one book__section', () => {
    const out = renderMarkdown('# Title\n\nJust a paragraph, no h2.')
    expect(out).toBe(
      '<article class="book__section"><h1 class="t-hero">Title</h1>\n<p class="t-body">Just a paragraph, no h2.</p></article>',
    )
  })

  it('splits multiple h2 regions into separate book__section articles, preamble in the first', () => {
    const out = renderMarkdown('# Title\n\nIntro.\n\n## First\n\nBody one.\n\n## Second\n\nBody two.')
    const sections = out.split('\n').filter((l) => l.startsWith('<article class="book__section">'))
    expect(sections.length).toBe(3)
    expect(out.indexOf('<h1 class="t-hero">Title</h1>')).toBeLessThan(out.indexOf('<h2 class="t-display">First</h2>'))
    expect(out.indexOf('<h2 class="t-display">First</h2>')).toBeLessThan(
      out.indexOf('<h2 class="t-display">Second</h2>'),
    )
  })
})
