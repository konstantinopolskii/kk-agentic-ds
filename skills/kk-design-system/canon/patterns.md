# Patterns

When composing any layout, start here. Three top-level patterns carry the shells every kit surface uses. Drill into `components.md` when a pattern uses a part we need to customize.

## Three columns (default shell)

Sidebar on the left, book in the middle, inspector on the right. Only the middle column scrolls during reading. This is the shell every kit canon file renders inside. Use it for any surface where the reader needs a map, a primary reading surface, and a margin for actions or references.

```html
<div class="app" data-view="doc">
  <aside class="sidebar" aria-label="Navigation">
    <nav class="sidebar__nav">
      <!-- scroll-spy TOC of the current book -->
    </nav>
  </aside>

  <main class="book" id="doc">
    <!-- rendered prose; t-hero, t-display, t-title, t-body -->
  </main>

  <aside class="inspector" aria-label="References">
    <!-- pointer cards, comments, actions -->
  </aside>
</div>
```

Preview: [demos/fundamental--accepted/patterns/three-column-shell.html](../../../demos/fundamental--accepted/patterns/three-column-shell.html)

## Card stack

Interactive cards stacked vertically. One active at a time. Inactive cards collapse to heading plus minimized CTA; the active card shows its body and both CTAs. Use it wherever the reader picks one option out of a small group and needs to see every option without losing context.

```html
<div class="card-stack">
  <div class="card card--interactive card--selectable" data-state="active">
    <div class="card__heading">
      <h3 class="t-title">Option one</h3>
      <p class="t-caption">One-line description of this option.</p>
    </div>
    <div class="card__body">
      <!-- full body when active -->
    </div>
  </div>

  <div class="card card--interactive card--selectable">
    <div class="card__heading">
      <h3 class="t-title">Option two</h3>
      <p class="t-caption">One-line description of this option.</p>
    </div>
  </div>
</div>
```

Preview: [demos/fundamental--accepted/patterns/card-stack.html](../../../demos/fundamental--accepted/patterns/card-stack.html)

## Card stack, columns

Cards arranged side by side instead of stacked vertically. Reach for it when a small set of parallel options needs to be compared at a glance, like pricing tiers or theme presets. Each child is a regular `.card`; the wrapper handles the rhythm. At narrow viewport, the columns collapse and stack vertically.

```html
<div class="card-stack card-stack--columns">
  <div class="card">
    <div class="card__heading">
      <h3 class="t-title">Free</h3>
      <p class="t-caption">For getting started.</p>
    </div>
  </div>
  <div class="card">
    <div class="card__heading">
      <h3 class="t-title">Pro</h3>
      <p class="t-caption">For working teams.</p>
    </div>
  </div>
  <div class="card">
    <div class="card__heading">
      <h3 class="t-title">Team</h3>
      <p class="t-caption">For shipping at scale.</p>
    </div>
  </div>
</div>
```

Rules:

- Two to four `.card` children. Five-plus columns crowd the row.
- Each card stays a regular `.card`. Hover and active states inherit from the base component.
- Below the narrow breakpoint, the wrapper stacks columns vertically. Same DOM, no class swap.
- Replaces the legacy `.tier` / `.tiers` shape, which the kit no longer ships.

Preview: [demos/fundamental--accepted/patterns/card-stack-columns.html](../../../demos/fundamental--accepted/patterns/card-stack-columns.html)

## Narrow mobile

Below ~800px. The book column goes full width. The sidebar collapses behind a hamburger. The inspector slides over as a modal sheet. A distinct pattern with its own composition rules, invoked by the breakpoint.

```html
<div class="app" data-view="doc">
  <aside class="sidebar sidebar--collapsed" aria-label="Navigation">
    <button class="button button--icon" aria-label="Open navigation">
      <!-- hamburger -->
    </button>
  </aside>

  <main class="book" id="doc">
    <!-- full-width reading -->
  </main>

  <aside class="inspector inspector--modal" aria-hidden="true">
    <!-- slides over when opened -->
  </aside>
</div>
```

Preview: [demos/fundamental--accepted/patterns/narrow.html](../../../demos/fundamental--accepted/patterns/narrow.html)

## Registry of additional patterns

Twelve compositions sliced out of shipped prototypes. Each row points at a live preview. Drill into `components.md` for the individual parts.

<table class="registry-table">
  <thead>
    <tr>
      <th scope="col" class="t-caption">Pattern</th>
      <th scope="col" class="t-caption">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="t-body"><a href="../../../demos/fundamental--accepted/patterns/three-column-shell.html"><span class="t-code">three-column-shell</span></a></td>
      <td class="t-body">Sidebar, book, inspector. The default kit shell, full slice.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../../../demos/fundamental--accepted/patterns/card-stack.html"><span class="t-code">card-stack</span></a></td>
      <td class="t-body">Interactive cards stacked vertically. One active, others minimized.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../../../demos/fundamental--accepted/patterns/card-stack-columns.html"><span class="t-code">card-stack-columns</span></a></td>
      <td class="t-body">Cards arranged side by side. Compare parallel options. Stacks vertically at narrow viewport.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../../../demos/fundamental--accepted/patterns/sidebar-nav.html"><span class="t-code">sidebar-nav</span></a></td>
      <td class="t-body">Grouped nav items with a scroll-spy indicator tracking the active section.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../../../demos/fundamental--accepted/patterns/doc-section.html"><span class="t-code">doc-section</span></a></td>
      <td class="t-body">Display heading, body paragraph, one example card.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../../../demos/fundamental--accepted/patterns/spec-list.html"><span class="t-code">spec-list</span></a></td>
      <td class="t-body">Key and description rows. Three variants: plain, value, triple.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../../../demos/fundamental--accepted/patterns/deck-in-shout.html"><span class="t-code">deck-in-shout</span></a></td>
      <td class="t-body">Horizontal deck of cards fanned in perspective, set on a shout surface.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../../../demos/fundamental--accepted/patterns/inspector-group.html"><span class="t-code">inspector-group</span></a></td>
      <td class="t-body">Heading card above a stack of interactive cards inside the right-hand column.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../../../demos/fundamental--accepted/patterns/comment-thread.html"><span class="t-code">comment-thread</span></a></td>
      <td class="t-body">Preview of first and last messages; full thread and reply field in the collapsible.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../../../demos/fundamental--accepted/patterns/comment-thread-resolved.html"><span class="t-code">comment-thread-resolved</span></a></td>
      <td class="t-body">Minimized preview with a check stamp, snippet, and byline.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../../../demos/fundamental--accepted/patterns/comments-group.html"><span class="t-code">comments-group</span></a></td>
      <td class="t-body">Inspector section with the Comments heading above open, resolved, and archived threads.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../../../demos/fundamental--accepted/patterns/signoff.html"><span class="t-code">signoff</span></a></td>
      <td class="t-body">Stat pairs on the left rail; byline and signature on the right.</td>
    </tr>
  </tbody>
</table>

## Signoff

<div class="book__signoff">
  <div class="book__signoff-stats">
    <div class="stat t-caption">
      <div><span class="t-caption--bold">4</span> top-level patterns.</div>
    </div>
    <div class="stat t-caption">
      <div><span class="t-caption--bold">12</span> registry compositions.</div>
    </div>
  </div>
  <div class="book__signoff-signature">
    <p class="t-caption">
      Signed by <span class="t-caption--bold">Konstantin Konstantinopolskii,</span><br />
      founder at <span class="t-caption--bold">kk.consulting</span><br />
      <span class="t-muted">2026-04-24, content-architecture session.</span>
    </p>
    <img class="book__signoff-signature-img" src="../../../signature.svg" alt="Signature" />
  </div>
</div>
