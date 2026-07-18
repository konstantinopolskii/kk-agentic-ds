# Patterns

When composing any layout, start here. Three top-level patterns carry the shells every kit surface uses. Drill into `components.md` when a pattern uses a part we need to customize.

## Book structure

Every prose unit in `.book` lives inside an `<article class="book__section">`. The first section is the hero section: h1 plus the intro paragraphs that frame the doc. Each subsequent section is a named topic, its h2 anchorable, scroll-spy-trackable. Reach for this structure on every doc surface the kit renders, hand-authored or markdown-rendered.

```html
<main class="book">
  <article class="book__section">
    <h1 class="t-hero">Document title</h1>
    <p class="t-body">Intro paragraph one.</p>
    <p class="t-body">Intro paragraph two.</p>
  </article>

  <article class="book__section" id="opening">
    <h2 class="t-display">First named section</h2>
    <p class="t-body">Section prose.</p>
  </article>

  <!-- more sections -->

  <div class="book__signoff">
    <!-- author + signature -->
  </div>
</main>
```

Rules:

- One rule path. Prose-rhythm rules scope to `.book__section >`. Everything inside a section gets the rhythm automatically. No exception classes, no special-case CSS for prose at `.book` level.
- First `.book__section` flushes against the top of `.book`. No top border, no top padding, handled by the `:first-of-type` selector.
- Hero clears its own line-height via the section's heading rules. 60 px below the hero, the hero-to-intro gap.
- Subsequent sections carry a hairline top border, 32 px top padding, 20 px top margin.
- `.book__signoff` sits at `.book` level, outside any article. Same rule for hand-authored as for md-rendered docs.
- Markdown source: `js/md.js` auto-wraps each h2-rooted region in a section. Authors do not write the article wrapper in source markdown. The renderer does it.

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

## Single column (product shell)

One centered measure, no rails. The shell for landings, community pages, settings sheets, onboarding flows — any product screen that reads top to bottom. The shell owns the page scroll — the wheel works from any gutter and the scrollbar sits at the viewport edge, never mid-screen at the column's edge. The measure caps at 760 px.

A pure reading page — a blogpost, an essay — takes no shell at all: a bare `.book` on the body, body scroll, full book ceremony. The shell exists for product screens; wrapping an article in it trades the reading rhythm for the product one.

```html
<div class="app app--single">
  <main class="book" id="doc">
    <article class="book__section">
      <h1 class="t-hero">One promise</h1>
      <p class="t-body">Lead paragraph.</p>
    </article>
    <!-- sections, figures, one primary CTA per section card -->
  </main>
</div>
```

Rules:

- No sidebar, no inspector in the DOM. A single column with empty rails is the wrong shell.
- Product rhythm applies: sections breathe at 24/32 px, siblings sit at 12 px, a heading holds 20 px below, `* + h2` steps 40 px, cards pad 16/20 with an 8 px gap, media rows tighten to 8 px vertical, and the hero drops its 60 px book ceremony to 20 px. Measured against the reference registry — see `references/registry.md § Density`.
- `book__section--fill` lets one section claim the leftover viewport; its lone card grows with it and spreads content edge to edge. One fill per page.
- `book__section--stage` guarantees a section a full viewport: stage flows (onboarding, wizards) stack stages so the scroll steps one decision at a time. Fill shares what is left; stage claims a whole screen.
- On narrow viewports the hero drops to the display size and the closing action section pins to the viewport bottom, full width, nothing after it.
- Preview: [demos/reference-recreations/10-tzlvt-landing.html](../../../demos/reference-recreations/10-tzlvt-landing.html), [demos/reference-recreations/04-joi-onboarding.html](../../../demos/reference-recreations/04-joi-onboarding.html); bare book: [demos/reference-recreations/13-blogpost.html](../../../demos/reference-recreations/13-blogpost.html)

## Panel grid (dashboard shell)

Cards as panels on a twelve-column grid, macro gutters, one page scroll. The shell for SaaS dashboards, analytics, admin. Span modifiers name intent: `panel--third`, `panel--half`, `panel--two-thirds`, `panel--full`.

```html
<div class="app app--panels">
  <div class="panels">
    <div class="card panel--third">
      <div class="metric">
        <p class="metric__value">12 400</p>
        <p class="metric__label">Sessions</p>
        <p class="metric__delta">↑ 8%</p>
      </div>
    </div>
    <div class="card panel--two-thirds"><!-- chart module --></div>
    <div class="card panel--full"><!-- data table --></div>
  </div>
</div>
```

Rules:

- Every panel is a `card`. The grid owns gutters; panels never carry outer margins.
- Metrics up top, modules mid, tables full-width below. Reading order survives the collapse to one column at 1024.
- One shout maximum on the whole grid.
- Product rhythm applies — same numbers as the single-column shell.
- Preview: [demos/reference-recreations/02-forecast-module.html](../../../demos/reference-recreations/02-forecast-module.html)

## Front (news shell)

Lead story left at two thirds, latest rail right, desk grid below a hairline. The shell for news fronts, magazine homes, media catalogs.

```html
<div class="app app--front">
  <div class="front">
    <header class="front__masthead">
      <h1 class="t-hero">The nameplate</h1>
      <p class="t-micro t-muted">Dateline · issue line</p>
    </header>
    <a class="card card--link front__lead" href="#story">
      <!-- figure, t-display headline, standfirst, byline media row -->
    </a>
    <aside class="front__rail">
      <!-- tight media rows, timestamp muted -->
    </aside>
    <section class="front__desks">
      <!-- three card--link cells per desk -->
    </section>
  </div>
</div>
```

Rules:

- The masthead spans the full grid: nameplate at `t-hero` left, dateline in muted micro right. It closes with the kit's one 1 px rule — the newspaper line. Hairlines everywhere else stay 0.5 px.
- The nameplate is the page's h1 and its only `t-hero`; the lead headline steps down to `t-display`.
- The lead is one link card. One lead; a front with two leads has none.
- Rail rows are `media` anchors: headline bold caption, timestamp muted micro. No images required to hold the layout. A rail may close with one `card` of field rows for standing numbers; movement renders as bold ↑ ↓ deltas.
- Desk cells are link cards with a `t-micro t-muted` kicker naming the desk.
- Collapses to one column at 1024: masthead, lead, rail, desks, in that order.
- Product rhythm applies — same numbers as the single-column shell.
- Preview: [demos/reference-recreations/14-newsfront.html](../../../demos/reference-recreations/14-newsfront.html)

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
- Inside a book, every column after the first keeps the overlay surface — peers read as equals, not as a heading card with followers.
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

Twelve compositions sliced out of shipped prototypes plus one structural wrapper. Each sliced row points at a live preview. The structural wrapper has no preview slice. Drill into `components.md` for the individual parts.

<table class="registry-table">
  <thead>
    <tr>
      <th scope="col" class="t-caption">Pattern</th>
      <th scope="col" class="t-caption">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="t-body"><span class="t-code">book__section</span></td>
      <td class="t-body">Structural article wrapping every prose unit. First section holds the hero; each h2 starts a new section.</td>
    </tr>
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
      <td class="t-body">Heading card above a stack of interactive or link cards inside the right-hand column.</td>
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
      <div><span class="t-caption--bold">8</span> top-level patterns.</div>
    </div>
    <div class="stat t-caption">
      <div><span class="t-caption--bold">13</span> registry compositions.</div>
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
