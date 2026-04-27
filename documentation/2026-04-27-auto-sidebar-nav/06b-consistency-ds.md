---
session: 2026-04-27-auto-sidebar-nav
stage: 6b
role: consistency-ds
input: built artifacts (js/kit.js, style.css, index.html, demos/fundamental--accepted/index.html, demos/comment-persistence/index.html, demos/md-renderer-smoke/index.html), manifesto.md §Components, tokens.json
output: four blocks audited; three flagged
gate: feeds stage 7
---

# Consistency — DS — auto sidebar nav

Cold read. Audit reads `manifesto.md § Components` and `tokens.json` only — every shipped class earns its place against inventory, every spacing value lands on the 4 px grid, every color resolves to one of nine tokens.

## Block — static sidebar shell (manifesto + 3 demos)

The four consuming pages each ship the same minimal shell:

```html
<aside class="sidebar" aria-label="...">
  <div class="sidebar__header t-title">...</div>
  <nav class="sidebar__nav" id="toc">
    <span class="toc__indicator" aria-hidden="true"></span>
  </nav>
  <footer class="sidebar__footer t-caption">...</footer>
</aside>
```

### Class resolution

Pass. `sidebar`, `sidebar__header`, `sidebar__nav`, `toc__indicator`, `sidebar__footer`, `t-title`, `t-caption` all resolve to `manifesto.md § Components § Navigation` and the typography ramp.

### Token compliance

Pass. No inline styles, no hex codes.

### Off-grid spacing

Pass. No spacing values introduced.

### Pattern-language drift

Flag — empty render before kit.js executes. The shell ships without a single nav item between the indicator span and the closing `</nav>`. A reader on a no-JS browser, or one inspecting the HTML before kit.js loads, sees a labeled but empty navigation pane. The sidebar is rendered useless until the kit's behavioural layer mutates it. `manifesto.md § Components § Navigation:399` describes the sidebar as "scroll-spy navigation with TOC indicator" — the canon example is fully populated HTML, not a JS-filled shell.

## Block — auto-generated nav (kit.js runtime emission)

`buildSidebarToc()` in `js/kit.js` writes this shape into the empty `<nav class="sidebar__nav">` at runtime:

```html
<section class="nav-group">
  <a class="t-subtitle nav-group__head" href="#section-id">Group label</a>
  <ul class="nav-group__items">
    <li class="t-caption"><a href="#item-id">Item</a></li>
  </ul>
</section>
```

### Class resolution

Flag — `nav-group__head`. The class is emitted on every bold-label anchor at runtime. `manifesto.md § Components § Navigation:401-417` documents only `nav-group`, `nav-group__items`, plus `t-subtitle` on the header element. No `nav-group__head` modifier in canon. Defensible position: it is a BEM-style head modifier under the existing `nav-group` block, structurally consistent with `nav-group__items`. Drift nonetheless — modifier added in shipped code without `manifesto.md § Components` updated to register it.

Pass on the rest. `nav-group`, `nav-group__items`, `t-subtitle`, `t-caption` all resolve.

### Token compliance

Pass. Generator emits structural HTML only. No inline color, no inline padding, no inline font-size. Every visible token resolves through the existing `t-subtitle` / `t-caption` typography classes and the `.nav-group` selector cluster in `style.css`.

### Off-grid spacing

Pass. No spacing values introduced at the runtime level.

### Pattern-language drift

Flag — direct contradiction of `components.md:423`. The canon rule reads: "Each `nav-group` header is `<h4 class=\"t-subtitle\">`." The kit emits `<a class="t-subtitle nav-group__head">` as the header element. The header changed from a heading element to an anchor element. Defensible — bold labels are now click targets that scroll-jump and accept scroll-spy active state, which an `<h4>` cannot. But the canon rule still reads `<h4>` and the shipped code has zero `<h4>` headers in any consuming page's nav. Canon and code disagree.

Flag — kit.js now emits structural HTML on the consumer's behalf. Before this version, `kit.js` bound behaviour to existing DOM. After this version, `kit.js` mutates DOM structure. `manifesto.md § Components § Navigation` does not describe a kit responsibility for emitting nav HTML; the canon example shows fully hand-authored nav-group blocks. The shift in mechanism is significant and unreflected in canon.

## Block — CSS surface for `nav-group__head`

`style.css:291-308` extends the existing `.nav-group > h3, .nav-group > h4` rule cluster to also match `.nav-group > a.nav-group__head`:

```css
.nav-group > h3,
.nav-group > h4,
.nav-group > a.nav-group__head {
  padding: var(--space-1) var(--space-4);
  color: var(--color-text-muted);
  transition: color var(--dur-base) var(--ease-out);
}
.nav-group > a.nav-group__head {
  display: block;
  text-decoration: none;
}
.nav-group.is-active > h3,
.nav-group.is-active > h4,
.nav-group.is-active > a.nav-group__head { color: var(--color-text); }
```

Plus the matching narrow-view extension at `style.css:2294-2298`.

### Class resolution

Pass for the new selector. The class hangs off the `nav-group` block grammar.

### Token compliance

Pass. `var(--space-1)` (4 px), `var(--space-4)` (16 px), `var(--space-6)` (24 px on phone), `var(--color-text)`, `var(--color-text-muted)`, `var(--dur-base)` (200 ms), `var(--ease-out)` — every token resolves to `tokens.json`. Link reset uses keyword values (`block`, `none`) — no token needed for those.

### Off-grid spacing

Pass. `var(--space-1)` = 4 px, `var(--space-4)` = 16 px, `var(--space-6)` = 24 px. All multiples of 4.

### Pattern-language drift

Flag — `text-decoration: none`. New utility-flavoured property landing in the kit. The kit's existing CSS does not strip link decoration anywhere else; nav-item anchors inside `<li class="t-caption">` rely on the browser default override that comes through `font-weight` and the `.nav-group__items a` rule, neither of which says `text-decoration: none` explicitly. The bold-label anchor is the first kit anchor that needs an explicit reset. Not necessarily wrong — anchors do carry a default underline that this rule cancels — but it is the first time the kit emits a link reset, and the principle "every property earns its place" wants this called out. Pair with `display: block` is defensible because the bold label needs to own the row width like the `<h4>` did.

## Block — `data-nav="manual"` opt-out attribute

`js/kit.js:1944-1945` reads:

```js
if (nav.getAttribute('data-nav') === 'manual') return;
```

The attribute is consumed at runtime. If a consumer sets `<nav class="sidebar__nav" data-nav="manual">`, the generator skips that nav and leaves whatever HTML is inside untouched.

### Class resolution

Pass. No class introduced.

### Token compliance

Pass. No token usage.

### Off-grid spacing

Pass.

### Pattern-language drift

Flag — new attribute in the kit's vocabulary, not in inventory. The kit already carries `data-kk-comments`, `data-kk-comments-mount`, `data-kk-comments-enable`, `data-kk-deck-bound`, `data-kk-action`, `data-view`, `data-state`, `data-cluster`, `data-resolved`, `data-archived`, `data-thread-id`, `data-message-id`, `data-author-role`, `data-can-approve`, `data-editing`, `data-edit-message-id`, `data-selection`, `data-md-src`, `data-md-heading-offset`, `data-view-target`. The `data-nav` namespace is new (every prior kit attribute uses `data-kk-*` or a domain-specific `data-{view,state,role}`). Inconsistent prefix — should arguably be `data-kk-nav="manual"` to match the comment opt-out family (`data-kk-comments="off"`). The chosen `data-nav="manual"` is shorter and reads cleanly, but breaks the prefix convention the kit established at 0.15.1 for declarative opt-outs.

## Summary

Most flags: Block 2 (auto-generated nav). Three flags — new modifier `nav-group__head` not in inventory, direct contradiction of `components.md:423` (header element changed from `<h4>` to `<a>`), kit.js mechanism now mutates consumer DOM structure rather than only binding behaviour.

Zero flags: Block — none. The static sidebar shell flagged on no-JS render; the CSS surface flagged on the link reset; the attribute flagged on prefix-naming inconsistency.

The shipped code is internally coherent — the generator, the CSS, and the consuming HTMLs all agree with each other. The disagreement is between shipped code and `manifesto.md § Components`. Three canon updates the maintainer pass owes:

1. Register `nav-group__head` modifier under `nav-group` block.
2. Update rule "Each `nav-group` header is `<h4 class=\"t-subtitle\">`" to reflect the anchor-based bold label.
3. Document the new `data-nav` (or `data-kk-nav`) attribute and the kit's new responsibility for emitting nav HTML at runtime.

Without those three updates, a future role skill loading `manifesto.md § Components` to build against canon will follow the documented `<h4>` pattern and ship something that disagrees with what `kit.js` now emits.
