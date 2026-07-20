# Sidebar nav integration

How a consumer hooks `KSidebarNav` and `useScrollSpy`, the Vue 2.0 auto-generated TOC. Covers the heading-rank rule that drives the generator, the `manual` opt-out for hand-curated nav, the bold-label-is-an-anchor expectation, and the per-mode generated shape.

Scope: sidebar nav only. This file does not cover the inspector, the FAB, or any other navigation surface.

## Default — autonav on

`KSidebarNav` fills itself from the rendered `.book` heading rank on mount. The consumer ships the shell; no per-page wiring is required.

```vue
<aside class="sidebar" aria-label="Navigation">
  <div class="sidebar__header t-title">Page name</div>
  <KSidebarNav />
  <footer class="sidebar__footer t-caption">Footer text</footer>
</aside>
```

On mount, `KSidebarNav` finds the reading column (`document.querySelector('.book')`, falling back to `document.getElementById('doc')` for markup that doesn't use `KBook`) and calls `useScrollSpy(book, nav)` against its own root element. `useScrollSpy` does the same two-pass job the pre-2.0 kit ran at `KK.init()`: stamp heading ids, build the nav DOM, then wire the scroll-spy observer.

```ts
import { useScrollSpy } from '../../packages/vue/dist/index.js'

const dispose = useScrollSpy(bookEl, navEl) // call once both elements are mounted
// dispose() on unmount — disconnects the IntersectionObserver and removes every listener
```

`KSidebarNav` calls this for you and disposes on `onBeforeUnmount`; reach for `useScrollSpy` directly only when hand-rolling a shell that skips the `KSidebarNav`/`KBook` components.

## Heading-rank rule

The generator reads `.book > article.book__section` as the section unit and resolves one of three modes from the heading structure inside. This logic is unchanged from the pre-2.0 generator — it's the same rank rule, now scoped to one `(book, nav)` pair per call instead of a page-level singleton.

### Multi-h1 mode

Two or more top-level `book__section` whose primary heading is `h1`. Each becomes a navigable sample, with its own nested `h2` sections as items.

```html
<section class="nav-group">
  <a class="t-subtitle nav-group__head" href="#sample-a">Sample h1 text</a>
  <ul class="nav-group__items">
    <li class="t-caption"><a href="#sample-a-section-1">h2 inside the article</a></li>
  </ul>
</section>
```

### Mixed mode

One top-level section with `h1` primary (or zero) and at least one `h3` direct child anywhere in `.book`. The manifesto page is the canonical mixed-mode case.

```html
<section class="nav-group">
  <a class="t-subtitle nav-group__head" href="#principles">Principles</a>
  <ul class="nav-group__items">
    <li class="t-caption"><a href="#pure-signal">Pure signal</a></li>
  </ul>
</section>
<section class="nav-group">
  <a class="t-subtitle nav-group__head" href="#agents">Agents</a>
</section>
```

The lead article (`h1.t-hero` page-title section) is excluded from the nav in every mode. Its `h1` is the page title, not a navigable section.

### Flat mode

Single `h1` (or zero), no `h3` direct children anywhere. Most demo pages and product surfaces fall here.

```html
<section class="nav-group">
  <ul class="nav-group__items">
    <li class="t-caption"><a href="#section-a">Section A</a></li>
    <li class="t-caption"><a href="#section-b">Section B</a></li>
  </ul>
</section>
```

No bold label. One ungrouped list.

## Bold label is an anchor

The auto-fill emits `<a class="t-subtitle nav-group__head">` for every group head, not an `<h4>`:

- **Click target.** The reader clicks a group head to scroll-jump to that section's anchor, same as an item.
- **Scroll-spy active state.** The spy tracks the active anchor's own rect; an `<h4>` can't carry that.

Hand-curated nav (`KNavGroup` without an `href`) may still render the non-clickable `<h4 class="t-subtitle">` form — the CSS covers both. Auto-filled nav always uses the anchor form.

## Opt-out — the `manual` prop

```vue
<KSidebarNav manual>
  <KNavGroup head="Curated group" href="#a" :items="[{ label: 'Curated item A', href: '#a-1' }]" />
</KSidebarNav>
```

`manual` renders `data-nav="manual"` on the `<nav>`; `useScrollSpy`'s `buildSidebarToc` pass short-circuits when it sees that attribute and leaves the nav's children untouched. The scroll-spy observer still binds against whatever anchors the nav ends up with, hand-authored or generated — both use the same `#hash-anchor` convention.

`KNavGroup` props: `head` (string, required), `href` (string, default `''` — renders the anchor form when set, the legacy `<h4>` form when absent), `items` (`{ label, href, current? }[]`).

When to opt out:

- The page has an editorial overlay that doesn't match the rendered heading shape.
- The page renders content from an external source whose headings don't map cleanly to the three modes.
- The page is testing or A/B'ing a custom nav layout that shouldn't be rebuilt from headings.

## Slug rules

The generator stamps ids on every `book__section` (any depth), plus every `:scope > h2` and `:scope > h3` child of a top-level section. Slug rule: lowercase, ASCII only, hyphens for whitespace, em/en dashes flatten to hyphens, every other non-alphanumeric character drops.

```ts
function slugify(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}
```

Hand-authored ids win — the stamper checks `if (!section.id)` (and per-heading, `if (!h.id)`) before assigning. A consumer can stamp deterministic ids in their template and the slug logic skips them.

The label text used for both the nav label and the slug stamp walks the heading's child nodes until the first `<br>`. An `<h2>Primary<br /><span class="t-display--medium">Subtitle</span></h2>` heading contributes only "Primary" to the nav and the slug.

## No re-run on later mutation

`useScrollSpy` runs `buildSidebarToc` once, at the moment you call it (`KSidebarNav`'s `onMounted`). There is no Vue-side equivalent of the pre-2.0 kit's module-level `kk:md-rendered` listener that re-ran `KK.refresh()` automatically after a markdown body re-render. A page that mutates the `.book` heading structure after mount (injecting sections dynamically, swapping markdown bodies) needs to re-run the build itself — remount `KSidebarNav`, or call `useScrollSpy(book, nav)` again after the DOM settles.

## Common mistakes

- Expecting a rebuild after a dynamic content swap. See above — call `useScrollSpy` again; nothing does it for you.
- Two `<nav>` elements without deciding per-instance: `manual` is set per `<KSidebarNav>`, so one sidebar can auto-fill while a second on the same page stays hand-curated.
- Forgetting `dispose()` when calling `useScrollSpy` directly outside `KSidebarNav`. Skipping it leaks the `IntersectionObserver`, the resize listener, and the nav click handler on unmount.

## Legacy: kit.js

The pre-2.0 static demos still generate the same three-mode TOC through `js/kit.js`: `KK.init()`/`KK.refresh()` runs `buildSidebarToc` against the page-level `#toc` singleton, and the module-level `kk:md-rendered` CustomEvent listener re-triggers `KK.refresh()` after every markdown re-render — the auto-rebuild-on-mutation behavior this Vue port does not carry over. `data-nav="manual"` opts a hand-authored `<nav class="sidebar__nav">` out there too. That surface is frozen on `js/kit.js`; no new consumers.
