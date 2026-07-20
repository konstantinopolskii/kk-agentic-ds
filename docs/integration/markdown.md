# Markdown integration

How a consumer renders markdown into kit-classed HTML with `renderMarkdown`. Covers the API, the dialect, the two consumption patterns, and the legacy `js/md.js` relationship.

Scope: markdown only. This file does not cover scroll-spy, the doc shells, or any component.

## The Vue surface

One export, one job:

```ts
import { renderMarkdown } from '@konstantinopolskii/vue'
import type { RenderMarkdownOptions } from '@konstantinopolskii/vue'

const html = renderMarkdown(mdText, { headingOffset: 0 })
```

- **`renderMarkdown(md, opts?)`** — pure function, markdown string in, HTML string out. No DOM, no `window`, no fetch; safe in SSR, Node scripts, and the browser alike.
- **`RenderMarkdownOptions`** — `{ headingOffset?: number }`, default `0`.

The output is the exact dialect the frozen `js/md.js` rendered, ported 1:1 and gated byte-identical by `packages/vue/md_check.mjs` against three samples plus the manifesto.

## The dialect

Every emitted element carries kit classes; nothing unstyled leaves the parser.

| markdown | output |
|---|---|
| `#` … `####` | `t-hero`, `t-display`, `t-title`, `t-subtitle` (after offset) |
| deeper than rank 4 | `p.t-caption` |
| paragraph | `p.t-body` |
| list | `ul/ol.t-list` |
| inline code | `code.t-code` |
| fenced block | `t-code t-code--block`, HTML-escaped |
| table (GFM) | `table.registry-table`, `th.t-caption--bold`, `td.t-caption` |
| blockquote | `.quote` |
| raw HTML | passed through untouched |

Documents split on `h2` into `article.book__section` wrappers, preamble included, so the output drops straight into a `main.book` and scroll-spy picks the sections up.

## `headingOffset`

Shifts every heading down by N ranks before classing, floored at 1, capped at 4. Offset `0` means the document's own `#` is the page hero — right for canon books and the manifesto, which carry their own `h1`. Offset `1` demotes the document under a shell that already owns the hero.

## Two consumption patterns

**Bake at build.** Content known at build time imports as text and renders at setup. Deterministic string, so SSR output and hydration match by construction.

```vue
<script setup>
import md from './content.md?raw'
import { renderMarkdown } from '@konstantinopolskii/vue'
const html = renderMarkdown(md, { headingOffset: 0 })
</script>
<template><main class="book" v-html="html"></main></template>
```

Reference: `packages/vue/sfc/pages/manifesto.vue`, `md-smoke.vue`.

**Fetch after mount.** Content picked at runtime renders client-side into an SSR-empty shell. Inject after mount and the hydration pass never sees it, so there is nothing to mismatch. Re-wire scroll-spy after injection — `KSidebarNav` scans the book once at mount, before your fetch lands.

```vue
<script setup>
import { onMounted, ref } from 'vue'
import { renderMarkdown, useScrollSpy } from '@konstantinopolskii/vue'
const bookRef = ref(null)
const navRef = ref(null)
onMounted(async () => {
  const text = await (await fetch(src)).text()
  bookRef.value.innerHTML = renderMarkdown(text, { headingOffset: 0 })
  useScrollSpy(bookRef.value, navRef.value)
})
</script>
```

Reference: `packages/vue/sfc/pages/doc-viewer.vue`, including the relative-src gate and fail-soft copy.

## Sharp edges

- **Raw HTML passes through unescaped.** The parser trusts its input, same as `md.js` did. Render only markdown you ship or control; user-submitted markdown needs sanitizing upstream.
- **`v-html` on fetched content skips Vue entirely.** Nothing inside the injected HTML is a component; interactive kit parts inside markdown are not a thing.
- **Scroll-spy timing.** Baked content is in the DOM before any `onMounted` fires, so `KSidebarNav` works unmodified. Fetched content needs the hand-wired `useScrollSpy` call above.

## Legacy: js/md.js

The pre-2.0 pipeline fetched `[data-md-src]` targets, rendered, injected, and fired `kk:md-rendered` for `kit.js` to rebuild the TOC. That whole surface is frozen on `js/md.js`; no new consumers. The Vue side owns fetching and injection itself, and `md_check.mjs` keeps the frozen file only as the parser's parity oracle.
