# Sidebar nav — integration

How a consumer hooks the kit's auto-generated sidebar TOC. Covers the heading-rank rule that drives the generator, the opt-out path for hand-curated nav, the bold-label-is-an-anchor expectation, and the per-mode generated shape.

Scope: sidebar nav only. This file does not cover the inspector, the FAB, or any other navigation surface.

## Default — autonav on

As of 1.10.0 the sidebar TOC auto-generates from the rendered `.book` heading rank. The consumer ships an empty shell:

```html
<aside class="sidebar" aria-label="Navigation">
  <div class="sidebar__header t-title">Page name</div>
  <nav class="sidebar__nav" id="toc">
    <span class="toc__indicator" aria-hidden="true"></span>
  </nav>
  <footer class="sidebar__footer t-caption">Footer text</footer>
</aside>
<script src="../js/kit.js"></script>
```

The kit fills the nav at `KK.init()` (DOMContentLoaded) and again at every `kk:md-rendered` (markdown body re-render). No per-page hook required — `js/kit.js` listens for the event at the module level.

## Heading-rank rule

The generator reads `.book > article.book__section` as the section unit and resolves one of three modes from the heading structure inside.

### Multi-h1 mode

Two or more top-level `book__section` whose primary heading is `h1`. Triggered by the `data-md-src` pattern that gives each markdown article its own `h1.t-hero` (offset 0). Each article becomes a navigable sample.

Generated shape:

```html
<section class="nav-group">
  <a class="t-subtitle nav-group__head" href="#sample-a">Sample h1 text</a>
  <ul class="nav-group__items">
    <li class="t-caption"><a href="#sample-a-section-1">h2 inside the article</a></li>
    <li class="t-caption"><a href="#sample-a-section-2">another h2</a></li>
  </ul>
</section>
<section class="nav-group">
  <a class="t-subtitle nav-group__head" href="#sample-b">Second sample h1</a>
  <ul class="nav-group__items"><!-- ... --></ul>
</section>
```

Items are nested `book__section` children whose own primary heading is `h2`. md.js's `wrapInSections` produces this nesting automatically.

### Mixed mode

One top-level section with `h1` primary (or zero) and at least one `h3` direct child anywhere in `.book`. The manifesto page is the canonical mixed-mode case.

Generated shape:

```html
<!-- h2 section with h3 direct children -->
<section class="nav-group">
  <a class="t-subtitle nav-group__head" href="#principles">Principles</a>
  <ul class="nav-group__items">
    <li class="t-caption"><a href="#pure-signal">Pure signal</a></li>
    <li class="t-caption"><a href="#expected-patterns">Expected patterns</a></li>
  </ul>
</section>
<!-- h2 section with no h3 direct children stands alone -->
<section class="nav-group">
  <a class="t-subtitle nav-group__head" href="#agents">Agents</a>
</section>
```

The lead article (`h1.t-hero` page-title section) is excluded from the nav. Its `h1` is the page title, not a navigable section.

### Flat mode

Single `h1` (or zero), no `h3` direct children anywhere. Most demo pages and product surfaces fall here.

Generated shape:

```html
<section class="nav-group">
  <ul class="nav-group__items">
    <li class="t-caption"><a href="#section-a">Section A</a></li>
    <li class="t-caption"><a href="#section-b">Section B</a></li>
    <li class="t-caption"><a href="#section-c">Section C</a></li>
  </ul>
</section>
```

No bold label. One ungrouped list. Lead article still excluded.

## Bold label is an anchor

The auto-fill emits `<a class="t-subtitle nav-group__head">` for every group head. Two reasons:

- **Click target.** The reader can click a group head and scroll-jump to that section's anchor, the same way they click an item.
- **Scroll-spy active state.** Scroll-spy tracks the active anchor's own rect; an anchor element gets the active indicator when its section is visible. An `<h4>` element cannot.

The `<h4 class="t-subtitle">` shape from pre-1.10.0 is still valid CSS — the existing rules cover both. Hand-curated nav may use either form. Auto-filled nav always uses the anchor form.

## Opt-out — `data-nav="manual"`

The consumer who wants hand-curated content sets `data-nav="manual"` on the `<nav class="sidebar__nav">` element:

```html
<nav class="sidebar__nav" id="toc" data-nav="manual">
  <span class="toc__indicator" aria-hidden="true"></span>
  <section class="nav-group">
    <h4 class="t-subtitle">Curated group</h4>
    <ul class="nav-group__items">
      <li class="t-caption"><a href="#a">Curated item A</a></li>
    </ul>
  </section>
</nav>
```

`buildSidebarToc` short-circuits when the attribute is present. The kit does not touch the nav children. Scroll-spy still binds against the anchors inside.

When to opt out:

- The page has an editorial overlay that does not match the rendered heading shape (e.g., grouping eight `h2` sections under four conceptual labels that do not appear in the source).
- The page renders content from an external source whose headings do not map cleanly to the kit's three modes.
- The page is testing or A/B'ing a custom nav layout that should not be replaced on each `kk:md-rendered`.

The attribute is per-`<nav>`, not per-page. A page with multiple sidebars can opt one out and leave others on autonav.

## Slug rules

The generator stamps ids on every `book__section` direct child of `.book`, plus every `:scope > h2` and `:scope > h3` child of those sections. Slug rule: lowercase, ASCII only, hyphens for whitespace, em/en dashes flatten to hyphens, every other non-alphanumeric drops.

```js
function slugify(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
```

Hand-authored ids win — the stamper checks `if (!h.id)` before assigning. A consumer can stamp deterministic ids in the markdown source or static HTML and the slug logic skips them.

The label text used for both the nav label and the slug stamp comes through `headingLabel(h)`, which walks the heading's child nodes until the first `<br>`. Static-body pages that use `<h2>Primary<br /><span class="t-display--medium">Subtitle</span></h2>` see only the primary text in the nav.

## Public API touch points

- `KK.refresh()` — public entry that rebuilds the sidebar TOC. Runs `buildSidebarToc` early, then re-binds scroll-spy and the rest of the kit's modules. Call this after any DOM mutation that adds, removes, or reorders `book__section` articles.
- `kk:md-rendered` — bubbling CustomEvent dispatched by `md.js` after every `[data-md-src]` article finishes loading. The kit listens at the module level and calls `KK.refresh()` automatically. Consumers no longer need a per-page listener.

## Migration from pre-1.10.0

A page that hand-curated `<section class="nav-group">` blocks under a hand-curated `<nav class="sidebar__nav">` keeps working without change — the legacy CSS rules cover the `<h4 class="t-subtitle">` header form. To turn off the autonav for that page, add `data-nav="manual"` to the nav element. To switch to autonav, delete the `nav-group` blocks and let the kit fill the empty shell.

A page that wired its own `kk:md-rendered` listener to call `KK.refresh()` can delete the listener — the kit binds its own at module load.

## Version history

| Version | Change |
|---|---|
| 1.10.0 | Auto-generated sidebar TOC. `nav-group__head` modifier. `data-nav="manual"` opt-out. Module-level `kk:md-rendered` listener. |
