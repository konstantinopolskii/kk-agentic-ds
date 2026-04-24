# Manifesto

The philosophy, principles, foundations, components, and protocols of the KK Agentic Design System. Canonical. Every rule overrides whatever the training corpus wants you to emit.

## Why this exists

A design system for AI-assisted product work. Four layers: meanings, perception, matter, pipeline. Output is screens with low cognitive load and a small component surface.

Agentic because AI does most of the drafting. The rules below exist so a junior agent (or a junior human) ships coherent work before human review.

Design verifies the business brief before pixels. If the brief has logical holes, the first task is to push it back. Every element on the final screen maps to a metric or a user problem.

- **Signal** — what the user came here for. Obvious in under a second.
- **Noise** — everything else. Ruthlessly isolated, demoted, or removed.
- **Magic** — not placed. Emerges after signal is clear and noise is gone. Last step, never first.

## Philosophy

A product is a document. The document is the UI. The system treats both as one object. Every rule below serves that.

## Job stories

A user hires a product for a job. One priority job per screen. Secondary scenarios are isolated or hidden until requested.

- **Formula:** `context + motivation = step → value`.
- **Anti-pattern:** designing from a component first, then inventing a job to justify it.

Example. Voice transcription during an interview. Context: the interviewer cannot look away. Motivation: do not lose the question. Step: glance. Value: keep flow. So the screen is huge question cards that swipe themselves, every control hidden.

## Time to value

Path length is measured in time to the first insight, not clicks. Cut steps where possible. Deliver value before the first tap when possible.

## Principles

### Pure signal

Utilitarian modernism, not postmodern complexity. Effort spent decoding the interface is proportional to how bad it is. Beauty is a side effect of clarity.

### Expected patterns

Known patterns cost nothing. Fighting them raises cognitive load for no gain.

- Red button = cancel or reset. Red is not used for anything else.
- X in a corner closes the window. Not save, not hide, not minimize.
- Back arrow goes back. Never opens a different section.
- Hamburger = navigation. Nothing else hides behind it.

### Eighty / twenty

Primary signal takes 80% of visual weight. Secondary fits in 20%. Fractal — applies to screen, panel, card, row. Empty space counts toward the 80%.

- **Screen level.** In a Google Meet call, the participant video is 80%. The control bar is 20%.
- **Panel level.** Inside that control bar, the central mic and camera buttons plus their empty space hold 80% of the panel's attention.
- **Card level.** Inside an active inspector card, the primary CTA plus the heading are 80%. Fields, metadata, secondary buttons fit in the remaining 20%.

### Chunking

Working memory handles about seven items. Beyond that, scanning degrades and the list becomes a wall. When a collection grows past seven, break it into categories. Each category becomes its own shorter list.

Fractal. Applies to bullet lists, numbered lists, spec rows, nav items, card stacks, menu items, component inventories. Any flat collection.

- **Sidebar.** 44 items split into nine nav groups of one to nine items.
- **Color tokens.** Nine tokens grouped as two backgrounds, two surface tints, two hairlines, three text alphas.
- **Spacing tokens.** Twelve tokens split into micro, standard, macro bands.
- **Decision tree.** Nine questions split into structural and explanatory cards.
- **Checklist.** Seventeen items split into four cards: before pixels, tokens and grid, interaction and access, text and voice.

### Radical contrast

Gray mush is the default AI failure mode: muted everything, contrast nowhere, signal lost. The cure is hypertrophied contrast — hero 66 px against body 22 px, a 3× jump.

One distinction step between two elements. Bold vs regular, or big vs small, or black vs muted. Never all three at once. Never subtle.

### The iPad feel

Three panes in one frame, each with its own scroll. Only the middle column moves during reading. This is iPad split view, not a scrolling document.

Soft corners on every surface inside. Crisp edges outside, where the document meets the screen. No skeuomorphism, no liquid glass.

## Foundations

Token inventories (swatches, scale tables, space / radii / motion tables) live in the fundamental demo and in `tokens.json`. The sections below carry the why.

### Material

No skeuomorphic surfaces. Depth comes from hierarchy and spacing, not from effects. Four things are forbidden: gradients, drop shadows, glass / translucency, blur. Each fakes light or depth the screen cannot carry; each trades clarity for decoration.

### Color

Nine tokens: two backgrounds, two surface tints, two hairlines, three text alphas. No brand, no status colors, no accent.

Text is black. Muted and subtle are for metadata only — bylines, captions, hairlines. One distinction step per pair. Stacking color tiers creates [gray mush](#principles-radical-contrast).

If the text is ambiguous without color, rewrite the text, not the palette. The full swatch inventory lives in the fundamental demo.

Selection renders inverted — `--color-text` background, `--color-bg` text. No native blue, no custom color. A live selection previews the mark it is about to become.

### Type

Commissioner. A variable font (SIL OFL 1.1) by Kostas Bartsokas. Three weights used in the kit (regular, medium, bold), seven sizes (66 to 14 px). No italics in the kit.

One distinction step between two elements: bold vs regular, or big vs small, or black vs muted. Never all three. Never subtle.

Regular sits on Medium 500 because the 400 axis reads too thin on screen at body size. Light weight is forbidden unless the content is metadata or the user asks.

### Space

All gaps, padding, margins snap to multiples of 4. Larger jumps mean larger semantic distance. A 13 px gap means we need a different component. Off-grid fails the linter.

### Typography rhythm

Source: Artemy Lebedev, Bureau, "Rule of Inner and Outer" (bureau.ru/soviet/20140818/).

Core principle: **inner ≤ outer**. Space inside a group never exceeds space between groups. When that relation inverts, the eye mis-parses structure and the page reads wrong.

Fourteen rules. Each is canonical on every doc surface rendered in the kit.

1. Capitals require letter-spacing.
2. Lowercase never carries letter-spacing.
3. Vertical strokes align at equal intervals.
4. Letter-spacing of capitals stays below their line-height.
5. Line-spacing between capital lines equals or exceeds cap height.
6. Line-height exceeds word-spacing.
7. Descenders nearly touch ascenders at minimum line-height.
8. Longer lines require greater line-height.
9. Line-height stays at or below outer page margins.
10. List item spacing exceeds line-height.
11. Page numbers sit closer to the text block than to the page edge.
12. Headings sit closer to the following paragraph than to the previous.
13. Heading-to-paragraph spacing equals or exceeds the heading's own line-height.
14. Inner spacing stays at or below outer spacing. The core relation, restated.

Rule 12 bites hardest in practice. A heading with equal top and bottom margins visually groups with the wrong paragraph. Fix: top margin greater than bottom, so the heading visibly leads what follows.

Rule 13 is the second most-broken: a heading whose next line sits closer than its own line-height reads as cramped. Measure the heading's line-height, set the space below to at least that value.

Rule 14 audits any vertical list of values. If the padding inside a card exceeds the space between cards, the cards fail to group. Same for section body versus section separator.

Label-list pairs fall under rule 14 too. A paragraph ending in `:` followed by a list is a label-list pair — ship them tight. Gap between label and list sits well below paragraph rhythm so the label reads as caption of the list, not as continuation of the prose above. The paragraph owns its bottom gap in this pair: `:has(+ ul)` and `:has(+ ol)` tighten the label's `margin-bottom` to `--space-2` (8 px), and the list's `margin-top` sits at 0 so the two gaps do not stack. Tightening only the list's top margin leaves the paragraph's own 20 px below still governing the visible gap, and the pair reads loose.

Rule 12 ratio floor in practice: top margin ≥ 2× bottom margin on any heading sitting inside a dense text column. 1.5:1 reads roughly equal at the 0.2-second bar; 2:1 reads as clear lead.

Next-sibling margin collapse. Headings own their below-gap. The next sibling's top margin sits at zero so stacking from tables, cards, raw HTML, or lists cannot inflate the below-gap past the 2:1 ratio.

Markdown embedded inside a `data-md-src` article renders with heading levels shifted by `data-md-heading-offset`. Default is `0`: markdown `#` lands at h1 / t-hero, `##` at h2 / t-display, `###` at h3 / t-title, `####` at h4 / t-subtitle. The article renders its own heading stack starting at hero, appropriate when the page shell does not already carry a page h1 or part label. Authors opt into a positive offset when the markdown sits inside a shell that already owns higher heading ranks: `data-md-heading-offset="1"` pushes `#` down to h2 / t-display when the page has its own h1; `data-md-heading-offset="2"` pushes `#` to h3 / t-title when the page carries both an h1 and a part label at display rank. Multi-article pages with no shell h1 (like the markdown renderer smoke test) set offset 0 and let each article carry its own hero; multiple h1 elements on one page is acceptable for internal test pages. Levels 1–4 resolve to the kit heading classes (t-hero, t-display, t-title, t-subtitle). Level 5 and deeper demote to a paragraph of regular caption text (`<p class="t-caption">`) — the kit has no heading rank below subtitle, so the renderer steps `#####` source down to 16 px regular caption with a one-line console info. Authors who write `####` then `#####` see a clear step down, not two identical lines.

Weight step at the bottom of the heading stack. `t-subtitle` stays at Bold 700 — the kit-wide canon. The rank step against demoted `#####` reads as size drop (18 → 16) and weight drop (Bold 700 → Regular 500) together, so the stair is unambiguous at the 0.2-second bar without touching the canon weight that card headings, sidebar nav, and button labels depend on. Every heading rank (hero, display, title, subtitle) stays at Bold 700.

Rank binding: every `<h4>` element in kit surfaces carries the `t-subtitle` class. The pair is one thought — the tag declares the outline position, the class declares the visual rank. `js/md.js` enforces the binding for rendered markdown (source `####` emits `<h4 class="t-subtitle">`); authors writing HTML directly pair the two by hand. Sidebar nav-group titles, doc-section sub-headings, and card sub-ranks all land on `<h4 class="t-subtitle">`. `<h3 class="t-subtitle">` is not a valid pairing in kit surfaces.

Title leading matches body leading. `--lh-title` sits at 32, same as `--lh-body`, both at 22 px font size. Inline code plus title text on the same line no longer jumps when the line breaks between them — the title line-box matches the body line-box, so mixed-rank lines stay on a single vertical rhythm. Prior 28 px title leading produced a visible height jog the moment a long title wrapped into a second line or sat next to a body paragraph above.

Quotes render black, Medium 500, body-sized (22 / 32), with a 4 px left border. No italic — the left rule carries the distinction. Size stays at body rank so a quote reads at the same weight as the prose it interrupts — stepping down to caption under a paragraph or after a horizontal rule leaves the quote looking like metadata. Muting the colour would do the same and contradict the no-muted-by-default rule. A quote is content, not metadata. `.quote` declares size explicitly rather than inheriting from the document root (`body` sits at caption size).

Raw HTML embedded in prose (cards, shout callouts) carries its caption **below** the block, not above. The block is the object; the caption describes it. Caption's `margin-top` is `var(--space-3)` — tighter than a regular paragraph — so the caption reads as tethered to the object above. The block itself carries `margin-bottom: var(--space-8)` so the next heading or paragraph has air.

Shell chrome does not compete with rendered content for heading rank. A page that carries markdown via `data-md-src` must either drop all shell-owned h1/h2/doc__part headings and let the markdown carry the full hierarchy (offset=0), or reserve higher ranks for the shell and set offset to match the depth already claimed. Two heading stacks on one scroll is the canonical hierarchy-collapse failure mode.

### Radii

Four radii: 12 px for buttons, tiers, switches, fields; 16 px for preview frames and medium surfaces; 24 px for cards and anything that holds content; 9999 px for pills (switch thumbs, avatars, scrollbars). A fifth canonical radius is forbidden. `vars.css` defines the set; `tokens.json` mirrors it.

### Motion

Default: `200ms × ease-out` on `transform` and `opacity` only. Four easing curves, four roles: ease-out for functional settles, ease-spring for small confirmations, ease-swing for long reveals, ease-in-out for motion that continues past the frame.

Press feedback: every tappable surface scales to `0.96` on `:active`.

On `prefers-reduced-motion`, every duration drops to `0.01ms`. State changes instantly.

## Components

The kit stays small. Before adding anything, check this list. If an existing component fits, even awkwardly, use it. Adding a component runs the evolve protocol (see [§Protocols § Evolve](#protocols-evolve)).

Nine components plus pattern primitives. Everything else is composition.

### Typography utility classes

Use these on any element. No inline styles.

| Class | Size | Use |
|-------|------|-----|
| `t-hero` | 66 / 66 | Document title. Once per page. |
| `t-display` | 38 / 38 | Section headings. |
| `t-display--medium` | 38 / 38 medium | Subtitle under a display heading. |
| `t-body` | 22 / 32 | Long-form body. |
| `t-title` | 22 / 32 | Card headings. Leading matches body. |
| `t-subtitle` | 18 / 24 | Nav headers, spec keys. |
| `t-caption` | 16 / 24 | UI labels, body inside cards. |
| `t-caption--bold` | 16 / 24 bold | Emphasized caption. |
| `t-micro` | 14 / 20 | Captions, citations, metadata. |
| `t-mono` | inherited | Inline tokens, values, durations. |
| `t-muted` | — | Opacity to `--color-text-muted`. **Metadata only.** |
| `t-subtle` | — | Opacity to `--color-text-subtle`. Placeholders only. |

Forbidden: emitting raw `font-size` / `font-weight` / `color` on elements. Always pick a utility class.

### Card

Every widget is a card. Transparent at rest, 3% on hover/focus/active. No borders. No shadows.

Three variants, one HTML shape.

```html
<!-- Static card. Default. -->
<div class="card">
  <div class="card__heading">
    <h3 class="t-title">Card title</h3>
    <p class="t-caption">Optional subtitle.</p>
  </div>
  <!-- content -->
</div>

<!-- Interactive card. Sticky active / minimized state. -->
<div class="card card--interactive" data-state="active">
  <div class="card__heading">
    <h3 class="t-title">Interactive card</h3>
  </div>
  <div class="card__collapsible">
    <div class="card__collapsible-inner">
      <!-- revealed when active -->
    </div>
  </div>
  <button class="button t-subtitle" data-cta="minimized">Open</button>
  <button class="button button--primary t-subtitle" data-cta="active">Commit</button>
</div>

<!-- Shout card. One per column. Inverts everything inside. -->
<div class="card card--shout">
  <div class="card__heading">
    <h3 class="t-title">Shout card</h3>
    <p class="t-caption t-muted">For the moments that matter.</p>
  </div>
  <button class="button button--primary t-subtitle">Commit the choice</button>
</div>

<!-- Raw text or list children of the card get the 24px rail
     without a card__body wrapper. -->
<div class="card">
  <p class="t-caption t-muted">Empty for now.</p>
</div>
```

Rules:

- Interactive cards need hidden content (not just inputs). A card that only fires an action stays static.
- One active per stack.
- One shout per column. If everything shouts, nothing does.
- Primary and minimized button labels never match.
- A `<p>`, `<ol>`, `<ul>`, or `<dl>` dropped straight inside a card picks up the 12 px half-inset on its own. No `card__body` wrapper needed.

### Field

A label and a value sharing one row. No box, no outline. `0.5px` divider between consecutive fields, never above the first or below the last.

```html
<div class="card">
  <label class="field field--row">
    <span class="t-caption--bold field__label">Label</span>
    <input class="t-caption field__input" type="text" value="value" />
  </label>
  <label class="field">
    <input class="t-caption field__input" type="text" placeholder="sofia@kk.consulting" />
    <span class="field__fake-caret" aria-hidden="true"></span>
  </label>
</div>
```

Hover fills the row with 3%. Focus inverts it — black surface, white text, white caret.

### Button

Full-width by default. `12px` radius. Bold label. Two variants.

```html
<button class="button t-subtitle">Secondary</button>
<button class="button button--primary t-subtitle">Primary</button>
```

Rules:

- Never outline-only, never text-only, never floating over content.
- One primary per card.
- Imperative verbs. "Apply tokens", not "Proceed".
- Sentence case. No Title Case. No ALL CAPS.

### Tag

Metadata, not action. If it looks clickable, it's a button.

```html
<span class="tag">Foundations</span>
<span class="tag">9 components</span>
<span class="tag tag--bold">Signed</span>
```

### Switch

Binary toggle. See `index.html` → `#switch` for the full markup.

### Comment

Two shapes, one pattern. Draft (shout) and thread (interactive card with collapsible reveal). Lives in the inspector. See `index.html` → `#comment` for the complete markup including `comment-new`, `comment-thread`, `comment-msg`, `comment__menu`.

Each message's kebab carries four actions in 0.13.0: `Approve`, `Reply`, `Archive thread`, `Delete`. Approve is gated on the thread's last list message having `data-author-role="agent"` (consumer sets this at render time); the kit hides the item otherwise. Approve collapses the thread to a single resolved row (`data-resolved="true"`), emits the approved text as a replacement for the anchored quote, and the consumer rewrites the doc body. Archive sets `data-archived="true"` on the thread — DOM retained, hidden from the stack via CSS.

Consumer integration (events, config, delete, persistence patterns per framework) lives in `docs/integration/comment.md`. The `kk:comment` CustomEvent is how a backend hooks in.

### Navigation

Sidebar nav with scroll-spy indicator. `sidebar__nav` wraps `nav-group` sections; `toc__indicator` animates between active items.

### Signoff

Canonical document ending. Stats + byline + handwritten signature SVG.

`doc__signoff-stats` grids into three columns. Two or four `.stat` children are valid shapes — both ship the three-column grid; the two-stat shape leaves the right column empty for asymmetric breathing room; the four-stat shape fills the grid across two rows. Never three.

```html
<div class="doc__signoff-stats">
  <div class="stat t-caption">
    <div><span class="t-caption--bold">3</span> revisions before sealing.</div>
  </div>
  <div class="stat t-caption">
    <div><span class="t-caption--bold">0</span> edits pending.</div>
  </div>
</div>
<div class="doc__signoff-signature">
  <p class="t-caption">
    Signed by <span class="t-caption--bold">Author,</span><br />
    role at <span class="t-caption--bold">organization</span><br />
    <span class="t-muted">day, time, timezone.</span>
  </p>
  <img class="doc__signoff-signature-img" src="signature.svg" alt="Signature" />
</div>
```

Every doc ships signed.

### Spec list (dl.doc__spec)

The workhorse for key/value rows inside a card. Three shapes:

```html
<!-- Two-column: key + value -->
<dl class="doc__spec">
  <div class="doc__spec-row">
    <dt class="doc__spec-key">Key</dt>
    <dd class="doc__spec-value">Value that may wrap.</dd>
  </div>
</dl>

<!-- Three-column: key + value + prose -->
<dl class="doc__spec doc__spec--value">
  <div class="doc__spec-row">
    <dt class="doc__spec-key">Token</dt>
    <dd class="doc__spec-value">16px</dd>
    <dd class="doc__spec-value">When and why to reach for it.</dd>
  </div>
</dl>

<!-- Claim / reality / resolution -->
<dl class="doc__spec doc__spec--triple">...</dl>
```

### List (.t-list)

Caption-sized hairlined list for prose or tabular data. Both `<ul>` (disc marker) and `<ol>` (decimal marker). Hairline separates each item from the next. Used by `js/md.js` for markdown-rendered `- item` and `1. item` blocks.

```html
<!-- Unordered list with bullet markers. -->
<ul class="t-list">
  <li>First item.</li>
  <li>Second item.</li>
</ul>

<!-- Ordered list with decimal markers. -->
<ol class="t-list">
  <li>First step.</li>
  <li>Second step.</li>
</ol>
```

Rules:

- Caption size (16 / 24) with hairlines between items.
- Custom markers: bullet (`ul`) or decimal (`ol`) in the left gutter, bold weight.
- Single list class for both prose and tabular data patterns.
- `js/md.js` emits this class automatically for markdown lists.

### Preview surfaces

Document-surface primitive for kit docs that embed component or pattern slices. Used on `patterns.html` and any future registry page. The wrapper clips. The inner iframe renders at 400% and scales to 0.25 so the reader sees the preview at full container width regardless of the slice's internal viewport.

```html
<!-- Scaled iframe preview of a kit slice. -->
<div class="preview-frame">
  <iframe class="preview-frame__iframe"
          src="./demos/fundamental--accepted/patterns/some-slice.html"
          title="Slice preview"
          loading="lazy"></iframe>
</div>
```

Rules:

- `.preview-frame` carries the clip, border, radius, and height floor. The iframe inside must carry `.preview-frame__iframe` — the 400% width/height and the 0.25 scale are load-bearing.
- Scale ratio is a constant. If a second ratio is ever needed, ship a modifier class (`.preview-frame--half`) with its own width/height/scale trio.
- Pair with `.card--interactive.card--selectable` in the doc column when the preview is driven by a click-to-select registry. See `patterns.html`.
- Kit docs only. Product prose does not render iframes.

### Registry surfaces

Document-surface primitive for dense two-column inventories on kit registry pages (atoms, elements, and any future flat catalogue). Resets browser table defaults, applies the kit's hairline border and text tokens, and keeps links inheriting surface type. Used on `patterns.html` today.

```html
<!-- Atoms inventory on a registry page. -->
<table class="registry-table">
  <thead>
    <tr>
      <th class="t-caption">Class</th>
      <th class="t-caption">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="t-body"><a href="./index.html#t-body">t-body</a></td>
      <td class="t-body">Body text, 14 px Medium.</td>
    </tr>
  </tbody>
</table>
```

Rules:

- `.registry-table` carries the full table reset. No per-cell inline styles.
- First column reserves 30% width and forbids wrapping — the class name or token name column.
- Header row uses `--color-border-strong`; body rows use `--color-border`. Last body row drops its border so the table ends flush with following prose.
- Links inside a registry table inherit `--color-text` and underline on hover or focus. Do not override.
- Kit docs only. Product prose does not render inventory tables.

### Patterns

#### Three columns (default shell)

```html
<div class="app" data-view="doc">
  <aside class="sidebar" aria-label="Navigation">...</aside>
  <main class="doc" id="doc">...</main>
  <aside class="inspector">...</aside>
</div>
```

Left is the map. Middle is the territory. Right is the margin — actions, references, comments. Only the middle scrolls during reading.

#### Card stack

Stack interactive cards vertically. One active at a time. Inactive cards collapse to heading + minimized CTA. See `#card-stack-3d` in `index.html` for the 3D reveal variant.

#### Narrow (mobile)

Below ~800 px: doc becomes the single column, inspector slides over, sidebar collapses to a hamburger. See `#narrow`.

### What's forbidden

- Any class not starting with `t-`, `card`, `field`, `button`, `tag`, `switch`, `sidebar`, `doc`, `nav-group`, `inspector`, `comment`, `stat`, `tag`, `swatch`, `app`, `preview-frame`, `registry-table`.
- Inline styles for tokens. Use `var(--token-name)`.
- New color, spacing, or radius values outside `tokens.json`.
- Drop shadows, glass, blur, gradients.
- Any utility-class framework (Tailwind, Bootstrap, Bulma).

When you need something genuinely new: do not add it to the kit. Ask the maintainer. Additions run the evolve protocol before code lands.

## Runtime

The kit's behavioural JS ships in `js/kit.js`. One file. Plain script, no build step, no framework. Auto-inits on `DOMContentLoaded`. Six modules auto-wire: scroll-spy, narrow-view toggle, column reveal, inspector card stack, comment kebab menus, 3D deck. A seventh — the selection-to-draft comment flow — is opt-in via `KK.enableCommentSelectionFlow()` because pages with their own localized selection handler would collide with the kit's English default.

Public surface on `window.KK`: `KK.init()`, `KK.refresh()`, `KK.enableCommentSelectionFlow()`. Everything else is private. Consumers that need a deeper API wait for the next release — forcing the minimal surface keeps upgrade paths clean.

`KK.refresh()` re-scans the DOM after the consumer injects new elements (SPA-style swaps, lazy-loaded sections, route-driven content). Each module skips work already done and picks up new iterable elements — new decks, new doc sections, new inspector cards. Global listeners bind once; subsequent calls are near-free. Safe to over-call.

### Comment lifecycle events

Consumers that call `KK.enableCommentSelectionFlow()` and need to persist comments to their own backend listen for `kk:comment`, a `CustomEvent` dispatched on `.comment-stack` (bubbles to document). Two actions in 0.10.0:

- `new` — a draft was committed and a thread card was created.
- `reply` — a message was appended to an existing thread.

Payload for `action === 'new'`:

```js
{
  action:       'new',
  threadId:     'c1735012345-123', // local DOM id; do not send to server
  messageId:    'm1735012346-456', // local id of the seed message
  anchorQuote:  'selected text',
  anchorPrefix: '…up to 20 chars before',
  anchorSuffix: '20 chars after…',
  cluster:      'strategy',        // from nearest [data-cluster] ancestor, null if none
  sectionSlug:  'targeting',       // from nearest .doc__section id
  text:         'comment body'
}
```

Payload for `action === 'reply'`:

```js
{
  action:    'reply',
  threadId:  'c1735012345-123',
  messageId: 'm1735012789-012', // local id of the new reply message
  text:      'reply body'
}
```

Payload for `action === 'delete'`:

```js
{
  action:        'delete',
  threadId:      'c1735012345-123',
  messageId:     'm1735012789-012',
  threadRemoved: true              // true if deleting this message emptied the thread
}
```

Payload for `action === 'approve'`:

```js
{
  action:          'approve',
  threadId:        'c1735012345-123',
  messageId:       'm1735012789-012',   // the agent-reply message whose text is approved
  replacementText: 'approved replacement text',
  anchorQuote:     'the original quote',
  anchorPrefix:    '…up to 20 chars before',
  anchorSuffix:    '20 chars after…',
  cluster:         'strategy',
  sectionSlug:     'targeting'
}
```

Payload for `action === 'archive'`:

```js
{
  action:        'archive',
  threadId:      'c1735012345-123',
  threadRemoved: false              // thread kept under data-archived="true", not removed
}
```

Approve is gated at the UI level: the kebab's Approve item is hidden unless the thread's last list message carries `data-author-role="agent"`. Consumers set `data-author-role="agent"` on agent-authored `.comment-msg` nodes at render time; kit never classifies messages by itself. The full list of actions in 0.13.0 is `new`, `reply`, `delete`, `approve`, `archive`.

Every `.comment-msg` carries `data-message-id`. Kit stamps it at creation time; consumers pre-rendering server-side HTML can set the attribute to the server's real id and skip the local-to-server mapping layer for seeded threads.

Field names follow JS convention (camelCase). Kit does not know about authentication — servers set the author from session context, not a client-declared field. Kit does not send thread or message ids to the wire; consumers map local ids to server-issued ids through their own state when a persist call returns.

Universal consumer pattern:

```js
document.addEventListener('kk:comment', function (e) {
  if (e.detail.action === 'new') {
    // fetch('/api/comment', { method: 'POST', body: JSON.stringify(e.detail) })
    // for Python/Ruby/PHP backends that expect snake_case, rename on the way out
  } else if (e.detail.action === 'reply') {
    // fetch('/api/comment', { method: 'POST', body: JSON.stringify({ parent_comment_id: map.get(e.detail.threadId), text: e.detail.text }) })
  }
});
```

Full consumer-facing integration surface (Flask, Next.js, Rails snippets; anti-patterns; the enable-or-own decision tree) lives in `docs/integration/comment.md`. Edit actions and re-surface-archived UI deferred until a consumer asks.

### Integration docs convention

A component earns a file under `docs/integration/<component>.md` the first time it ships a consumer-facing API — events, config keys, data attributes consumers set, exported helpers. The doc carries every API surface in one place plus patterns for the main backend languages. Today only the Comment component qualifies; other components are delegation-based and have no public hooks to document.

Once the doc exists, it is a required part of every bundle that changes its component's API. Maintainers update it in the same PR as the code; frontend engineers flag changes during refactors. The doc stays in the repo under `docs/` so humans browsing on GitHub find it naturally, and it ships in the npm package so consumers read the version they are pinned to.

Text strings that kit.js injects into the DOM are overridable via `KK.config.i18n`, set before the script loads:

```html
<script>
  window.KK = { config: { i18n: {
    addComment: 'Ваш комментарий',
    reply: 'Ответить…',
    deckChoose: 'Выбрать',
    deckChosen: 'Выбрано'
  } } };
</script>
<script src="../js/kit.js"></script>
```

Four strings today: the draft input placeholder, the reply input placeholder, the deck's reset and chosen labels. Defaults are English. The consumer's HTML for deck buttons should match `deckChoose` so the reset path stays consistent.

Every consumer loads the same `kit.js` as the manifesto page. Fragments are not copied. Forking the behaviour is a maintainer change; copy-paste is not.

## Protocols

### Evolve

Rules in this document are canonical. Code that disagrees with the manifesto is wrong unless the manifesto is. Either the rule updates or the code does — never both separately, never one silently.

On conflict, walk the five steps in order.

1. State the conflict out loud. Name the rule, name the code. No silent overrides.
2. Decide which side is right for the product today, not for the version that wrote the rule.
3. Update both in the same PR. The rule moves in the doc; the code moves in the kit.
4. Log the conflict in [§Backlog](#protocols-backlog) until it ships.
5. Sign the change.

Unresolved issues live in [§Backlog](#protocols-backlog) openly. Hidden issues are worse than visible ones.

### Backlog

Things the prototype does wrong on purpose, unfixed. No priorities; no owners yet. When one lands, move it out of the table and into the section that now describes the fixed behavior.

Empty right now. Last audit cleared the list.

### Ideation

Ideas the project considered but did not build. Kept here so the reasoning survives and so future sessions do not re-propose them without knowing the history.

#### Auto-sync inspector comments to Claude

- **Goal.** Let Konstantin leave comments in the inspector; have Claude pick them up across sessions and improve the doc automatically.
- **Option A.** File System Access API. Browser writes threads to `comments.json`. No server, but Chromium-only and requires a local HTTP server (not `file://`). First commit needs a file-picker click.
- **Option B.** Local Node server + SQLite + MCP. Browser posts each comment; Claude reads and resolves through an MCP tool. Works everywhere; needs a running process.
- **Option C.** Manual export button that downloads a file. Simple. Extra click each time.
- **Round-trip problem.** When Claude marks a thread resolved, the browser does not know. Next write overwrites the resolution unless the browser reads the file first, hides resolved threads on load, and merges state on write. Doable, not cheap.
- **Parked.** Current volume of review feedback does not justify the plumbing. Writing notes directly into the doc or conversation works for now.
- **Revisit if.** Reviews start coming in across many sessions and manual capture gets lossy. Then build Option B — server + SQLite + MCP — as the path that covers all browsers and handles the round-trip cleanly.

## Pipeline

Work moves through eight stages across three phases. Think (stages 1-2) produces approved intent + direction document with per-pattern tasks. Design (stages 3a-3c, with N parallel designers) produces high-fidelity per-pattern ASCII answering fresh-eyes questions. Build (stages 4-7) produces a shipping prototype plus three cold-read audits (jobstory, DS, voice) plus strict meta-review. A meta-retro runs on demand; reiterate-from-any-stage is user-triggered.

Eleven role skills cover the stages. No in-pipeline canon changes — proposals route through `kk-ds-maintainer` via retro.

Pipeline entry matches scope. A typo enters at stage 3b against an affected pattern. A kit refactor enters at stage 1 plus stage 5 in DS-engineer mode. A new page walks all eight. Nothing forces the full walk on work that does not need it.

Full stage list, gates, inputs, outputs, and canon-load per role live in `pipeline.md`.

## Documentation contract

Every stage writes its own file to `documentation/<session>/NN-<role>.md` as its final step. Each file carries frontmatter (`session`, `stage`, `role`, `input`, `output`, `gate`), preserves the raw user input verbatim where the stage received one, names the agent's output, and closes with the gate result.

Raw input is not summarized. Artifacts are linked by pointer, not copied. Rejected options stay in the session folder — a retro often learns more from the rejected branch than the shipped one.

Full contract, template, and README structure in `doc-format.md`.

## Ship discipline

Every browser-affecting change ends with a verified console and screenshot in the self-doc. Reading the code is not enough.

- **Screenshot the rendered page** before and after. The diff reads in one glance.
- **Open the devtools console. Zero errors, zero warnings.** Capture a screenshot of the console state. Paste into the phase's self-doc.
- **Click every interactive affordance on the page once.** Confirm no silent breakage (dead clicks, lost scroll-spy, broken nav anchors, iframe preview stuck).
- **For the renderer specifically:** a smoke test page with a sample markdown covering every supported construct. Side-by-side render-vs-source. Console clean.
- Any regression discovered post-ship routes back to the phase owner, not a hotfix patch.
- **Before shipping a markdown-rendered page, grep the shell for every claim the rendered content also carries.** A page that carries pointer-card copy, nav labels, or signoff stats that restate facts from the rendered body fails the one-home rule on ship. Remove shell-side claims or migrate them to the rendered source.

### Bundle rule

Every kit change moves a fixed set of files together. If one is missing, the PR is not ready.

1. **The code** — `vars.css`, `style.css`, or the skill file you are changing.
2. **The doc** — `index.html` and the markdown under `skills/kk-design-system/`, whichever section owns the rule.
3. **The skill reference files** — `tokens.json`, `voice.md`, `manifesto.md`. These are what the agent reads. Drift between CSS and skill reference files is the worst failure mode, because the agent trusts the skill files.
4. **`CHANGELOG.md`** — one entry, in the format: Added / Removed / Moved.
5. **`package.json`** + **`.claude-plugin/plugin.json`** version bump, in lockstep. Semver:
   - **Major** — removed a component, renamed a class, changed a skill's `description` trigger phrase, broke a consumer's selector.
   - **Minor** — added a component, added a token, added a skill recipe, additive only.
   - **Patch** — fix, typo, clarification, non-breaking internal refactor.
6. **Skill SKILL.md** — if the change affects agent behavior, update the skill's hard rules too.
7. **Integration doc** at `docs/integration/<component>.md` — required when the change touches a component's consumer-facing API.

### Semver

A version bump without a pushed tag is vapourware. Consumers cannot see work that lives only in the maintainer's working tree. Every kit change ends with four steps, in order.

1. **Commit.** Stage explicit paths. Commit message: `UI kit X.Y.Z: short description`. Body names what changed using the CHANGELOG's Added / Removed / Moved breakdown.
2. **Tag.** `git tag -a vX.Y.Z -m "UI kit X.Y.Z — <one-line>"`. Annotated tags only.
3. **Push main.** `git push origin main`. Consumer repos pull from origin, not the maintainer's disk.
4. **Push the tag.** `git push origin vX.Y.Z`. Tags do not auto-push with commits.

Confirm with the human before pushing — push is shared-state and cannot be undone quickly. Close every session with `git status -sb` showing a clean tree on a pushed tag, or flag what is still pending.
