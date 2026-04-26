# Components

Jobstory: when drilling from a pattern into its parts, find every foundation, component, and forbidden thing in one book with deep links into live examples, so we use kit vocabulary and never invent.

This book is reference. Inventory first, foundations second, components third, kit-doc primitives fourth, forbidden close. Every component section carries pointer prose + HTML snippet + rules + deep link into `demos/fundamental--accepted/index.html`. Every class resolves to the kit. Tokens resolve to `tokens.json`.

## Using the snippets

Every HTML snippet below pastes into a kit page with `vars.css`, `style.css`, and `js/kit.js` loaded. Snippets do not stand alone. Their job is to show the exact class structure a consumer copies into a kit-wrapped surface.

## Component registry

| Class | Role | Deep link |
|-------|------|-----------|
| `card` | Static container. Transparent at rest. | `demos/fundamental--accepted/index.html#cards` |
| `card--interactive` | Sticky active or minimized state with collapsible body. | `demos/fundamental--accepted/index.html#cards` |
| `card--shout` | Inverted surface. One per column. | `demos/fundamental--accepted/index.html#cards` |
| `field` | Label and value sharing one row. No box. | `demos/fundamental--accepted/index.html#fields` |
| `button` | Full-width affordance. Primary or secondary. | `demos/fundamental--accepted/index.html#buttons` |
| `tag` | Metadata pill. Never clickable. | `demos/fundamental--accepted/index.html#tags` |
| `switch` | Binary toggle. | `demos/fundamental--accepted/index.html#switches` |
| `comment` | Draft or thread. Inspector-only. | `demos/fundamental--accepted/index.html#comment` |
| `sidebar__nav` | Scroll-spy navigation with TOC indicator. | `demos/fundamental--accepted/index.html#navigation` |
| `book__signoff` | Canonical document ending. | `demos/fundamental--accepted/index.html#signoff` |
| `book__spec` | Key and value rows inside a card. | `demos/fundamental--accepted/index.html#spec-list` |
| `t-list` | Hairlined prose list. `<ul>` or `<ol>`. | `demos/fundamental--accepted/index.html#lists` |
| `t-code` | Inline code chip. `.t-code--block` for paragraphs. | `demos/fundamental--accepted/index.html#code` |
| `preview-frame` | Scaled iframe for doc surfaces. | `demos/fundamental--accepted/index.html#preview-frame` |
| `registry-table` | Dense two-column inventory for kit docs. | `demos/fundamental--accepted/index.html#registry-table` |

## Foundations

Foundations are the six rule sets every component sits on top of. Each subsection carries the key rules and a pointer to the live inventory in the fundamental demo. Machine-readable source of truth is `tokens.json`.

### Material

No skeuomorphic surfaces. Depth comes from hierarchy and spacing, not from effects.

- No gradients.
- No drop shadows.
- No glass or translucency.
- No blur.

Each fakes light or depth the screen cannot carry. Each trades clarity for decoration.

**FAB exception.** A soft drop shadow is permitted on an active element rendered on a black or inverted surface, where the shadow is the affordance that lifts the element off its background. The floating action button at narrow viewports qualifies because its rest state sits on a black background. No other component clears this bar without a maintainer stamp.

**Flat-geometry box-shadow.** A `box-shadow` with zero blur is a flat-color geometry extension, not a depth illusion. Used on `.highlight` to widen the mark beyond the text bounding box without breaking line rhythm. Permitted on the same logic as the FAB exception: the shadow is shape, not light.

Deep link: `demos/fundamental--accepted/index.html#material`.

### Color

Nine tokens. Two backgrounds, two surface tints, two hairlines, three text alphas. No brand, no status colors, no accent.

- Text renders black at Medium 500. Full weight for body and structural markers.
- `t-muted` and `t-subtle` are metadata only. Bylines, captions, hairlines, placeholders.
- One distinction step per pair. Stacking color tiers creates gray mush.
- Selection renders inverted: `--color-text` background, `--color-bg` text. No native blue.
- If text is ambiguous without color, rewrite the text.

Deep link: `demos/fundamental--accepted/index.html#color`.

### Type

Commissioner. A variable font (SIL OFL 1.1) by Kostas Bartsokas. The kit ships three weights only: 400, 500, 700, across seven sizes (66 to 14 px). No 600. No italics.

- 400 reads as Regular. 500 reads as Medium. 700 reads as Bold. Regular sits on Medium 500 by default; 400 is permitted only on metadata or when the user explicitly requests it.
- One distinction step between two elements: bold vs regular, or big vs small, or black vs muted. Never all three.
- No inline `font-size`, `font-weight`, or `color`. Pick a utility class.
- Every heading rank stays at Bold 700. Weight step only lands at the bottom of the stack, where `#####` demotes to 16 px Regular caption.
- Every `<h4>` in a kit surface carries `t-subtitle`. `<h3 class="t-subtitle">` is not a valid pairing.

#### Rhythm. Inner and outer theory

Space inside a group never exceeds space between groups. When that relation inverts, the eye mis-parses structure and the page reads wrong. Name: inner and outer theory.

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

Rule 12 bites hardest. A heading with equal top and bottom margins visually groups with the wrong paragraph. Rule 13 is the second most-broken: a heading whose next line sits closer than its own line-height reads as cramped.

**Kit addenda.** Four rules the kit layers on top of the fourteen:

- **Rule 12 ratio floor.** Top margin at least 2× bottom margin on any heading in a dense text column. 1.5:1 reads roughly equal at the 0.2-second bar; 2:1 reads as clear lead.
- **Next-sibling margin collapse.** Headings own their below-gap. The next sibling's top margin sits at zero so stacking cannot inflate the below-gap past the 2:1 ratio.
- **Label-list tightening.** A paragraph ending in `:` followed by a list is a label-list pair. `:has(+ ul)` and `:has(+ ol)` tighten the label's `margin-bottom` to `--space-2` and the list's `margin-top` sits at zero.
- **Quote treatment.** Quotes render black, Medium 500, body-sized (22 / 32), with a 4 px left border. No italic. A quote is content, not metadata.

Deep link: `demos/fundamental--accepted/index.html#type`.

### Space

All gaps, padding, margins snap to multiples of 4.

- Twelve spacing tokens split into micro, standard, macro bands.
- Larger jumps mean larger semantic distance. A 13 px gap means the component is wrong.
- Off-grid fails the linter.

Deep link: `demos/fundamental--accepted/index.html#space`.

### Radii

Four values.

- `12 px`. Buttons, tiers, switches, fields.
- `16 px`. Preview frames and medium surfaces.
- `24 px`. Cards and anything that holds content.
- `9999 px`. Pills, switch thumbs, avatars, scrollbars.

A fifth canonical radius is forbidden. `vars.css` defines the set; `tokens.json` mirrors it.

Deep link: `demos/fundamental--accepted/index.html#radii`.

### Motion

Default: `200ms × ease-out` on `transform` and `opacity` only.

- Ease-out for functional settles.
- Ease-spring for small confirmations.
- Ease-swing for long reveals.
- Ease-in-out for motion that continues past the frame.
- Press feedback: every tappable surface scales to `0.96` on `:active`.
- On `prefers-reduced-motion`, every duration drops to `0.01ms`.

Deep link: `demos/fundamental--accepted/index.html#motion`.

#### Animation registry

Seven keyframes ship in the kit. Every motion in a kit surface either reuses one of these or runs the evolve protocol to add an eighth.

**fake-caret-blink.**

- Mechanics. 1.06 s, `steps(1, end)`, infinite. Pure opacity 1 ↔ 0.
- Why it exists. Marks where typing will land before the field has focus, without competing with the cursor of a focused field elsewhere on screen.
- Applications. Placeholder cursor inside `.field__fake-caret` on unfocused comment-new and comment-thread reply inputs.

**menu-in.**

- Mechanics. `--dur-fast` (120 ms), `--ease-out`. Opacity 0 → 1, scale 0.94 → 1.
- Why it exists. Pop affordance for a popover the user just summoned. Fast enough to read as immediate, slow enough to register the origin corner.
- Applications. `.comment__menu-popover` open animation when the kebab toggles.

**inspector-card-focus.**

- Mechanics. `--dur-long` (760 ms), `--ease-swing`. From scale 0.88, skewY −3°, opacity 0.4, blur 4 px to scale 1, skewY 0, opacity 1, blur 0.
- Why it exists. Promotes the active card from the stack with enough drama to read as a state change. The blur is transient, not a resting glass surface, and clears inside the same animation.
- Applications. `.inspector .card--interactive[data-state="active"]` when a card promotes to active. Canonical blur pattern: any other animation needing blur reuses this keyframe.

**check-in.**

- Mechanics. `--dur-base` (200 ms), `--ease-spring`. Opacity 0 → 1, scale 0 → 1.
- Why it exists. Gestural confirmation when a choice lands. Spring overshoot reads as a small celebration without being loud.
- Applications. `.deck-card__check` when a deck card is chosen.

**reveal-from-left.**

- Mechanics. 320 ms, `--ease-out`. translateX −12 px, scale 0.96, opacity 0 → translateX 0, scale 1, opacity 1. Attached inline by `js/kit.js`.
- Why it exists. The sidebar comes in from its own side of the screen. The motion reads as the column entering from where it lives, not floating up from the page.
- Applications. Sidebar reveal on initial paint or when `data-view="nav"` swaps in at narrow viewport.

**reveal-from-right.**

- Mechanics. 320 ms, `--ease-out`. translateX 12 px, scale 0.96, opacity 0 → translateX 0, scale 1, opacity 1. Attached inline by `js/kit.js`.
- Why it exists. The inspector comes in from its own side. Mirrors the sidebar reveal so the two columns read as a pair.
- Applications. Inspector reveal on initial paint or when `data-view="inspector"` swaps in at narrow viewport.

**reveal-from-below.**

- Mechanics. 320 ms, `--ease-out`. translateY 16 px, scale 0.98, opacity 0 → translateY 0, scale 1, opacity 1. Attached inline by `js/kit.js`.
- Why it exists. The book column has no side of its own. It rises into place from below the fold so the first paint reads as content arriving.
- Applications. Doc/book column reveal on initial paint at narrow viewport.

**Blur policy.** Blur is permitted in the kit only via reuse of `inspector-card-focus`, or via maintainer-stamped exception. New keyframes must justify their need against this list before they are added.

**New-animation policy.** A new motion request first tries to fit one of the seven keyframes above. Only when none matches is a new keyframe added. Either way, the decision is documented inside this registry.

## Typography utility classes

Use these on any element. No inline styles.

| Class | Size · leading · weight | Use |
|-------|-------------------------|-----|
| `t-hero` | 66 / 66 · Bold 700 | Document title. Once per page. |
| `t-display` | 38 / 38 · Bold 700 | Section headings. |
| `t-display--medium` | 38 / 38 · Medium 500 | Subtitle under a display heading. |
| `t-body` | 22 / 32 · Medium 500 | Long-form body. |
| `t-title` | 22 / 32 · Bold 700 | Card headings. Leading matches body. |
| `t-subtitle` | 18 / 24 · Bold 700 | Nav headers, spec keys, h4. |
| `t-caption` | 16 / 24 · Medium 500 | UI labels, body inside cards. |
| `t-caption--bold` | 16 / 24 · Bold 700 | Emphasized caption. |
| `t-micro` | 14 / 20 · Medium 500 | Captions, citations, metadata. |
| `t-muted` | opacity to `--color-text-muted` | Metadata only. |
| `t-subtle` | opacity to `--color-text-subtle` | Placeholders only. |

Forbidden: emitting raw `font-size`, `font-weight`, or `color` on elements. Always pick a utility class.

Deep link: `demos/fundamental--accepted/index.html#type`.

## Card

Every widget is a card. Transparent at rest, 3% on hover/focus/active. No borders. No shadows. Three variants share one HTML shape. Reach for a card whenever a widget groups a heading, body, and at most one primary action.

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
    <p class="t-caption t-muted">One per column. Inverts everything inside.</p>
  </div>
  <button class="button button--primary t-subtitle">Commit the choice</button>
</div>
```

Rules:

- Interactive cards need hidden content. A card that only fires an action stays static.
- One active per stack.
- One shout per column. If everything shouts, nothing does.
- Primary and minimized button labels never match.
- A `<p>`, `<ol>`, `<ul>`, or `<dl>` dropped straight inside a card picks up the 12 px half-inset on its own. No `card__body` wrapper needed.
- Used in: card stack, three columns, comment.

Deep link: `demos/fundamental--accepted/index.html#cards`.

## Field

A label and a value sharing one row. No box, no outline. `0.5 px` divider between consecutive fields, never above the first or below the last. Reach for a field whenever a form needs to read as prose, not a boxed grid.

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

Rules:

- Hover fills the row with 3%.
- Focus inverts the row. Black surface, white text, white caret.
- Placeholders are real examples, not labels.
- Used in: card, spec list.

Deep link: `demos/fundamental--accepted/index.html#fields`.

## Button

Full-width by default. `12 px` radius. Bold label. Two variants. Reach for a button when the user needs to commit to an outcome.

```html
<button class="button t-subtitle">Secondary</button>
<button class="button button--primary t-subtitle">Primary</button>
```

Rules:

- Never outline-only, never text-only, never floating over content.
- One primary per card.
- Imperative verbs. "Apply tokens", not "Proceed".
- Sentence case. No Title Case. No ALL CAPS.
- Secondary and primary labels never repeat.
- Used in: card, comment, signoff.

Deep link: `demos/fundamental--accepted/index.html#buttons`.

## Tag

Metadata, not action. If it looks clickable, it is a button.

```html
<span class="tag">Foundations</span>
<span class="tag">9 components</span>
<span class="tag tag--bold">Signed</span>
```

Rules:

- Never a link, never a button, never an input trigger.
- Reach for a tag to name a category, a count, or a state that the user cannot change from here.
- Used in: card heading, registry table, spec list.

Deep link: `demos/fundamental--accepted/index.html#tags`.

## Switch

Binary toggle. A switch flips a single setting on or off. Anything with three or more states is not a switch.

```html
<label class="switch">
  <input class="switch__input" type="checkbox" />
  <span class="switch__track">
    <span class="switch__thumb"></span>
  </span>
  <span class="t-caption switch__label">Label</span>
</label>
```

Rules:

- One label per switch. The label names the setting, not the state.
- `9999 px` radius on the thumb. `12 px` radius on the track.
- Keyboard-operable via `<input type="checkbox">` under the hood.
- Used in: field, spec list, card.

Deep link: `demos/fundamental--accepted/index.html#switches`.

## Comment

Two shapes, one pattern. Draft (shout) and thread (interactive card with collapsible reveal). Lives in the inspector.

```html
<!-- Draft. Shout variant invites input. -->
<div class="card card--shout comment-new">
  <div class="card__heading">
    <h3 class="t-title">Add a comment</h3>
  </div>
  <label class="field">
    <textarea class="t-caption field__input" placeholder="Type a comment"></textarea>
  </label>
  <button class="button button--primary t-subtitle">Commit</button>
</div>

<!-- Thread. Interactive card with collapsible reveal. -->
<div class="card card--interactive comment-thread" data-state="active">
  <div class="card__heading">
    <h3 class="t-title">Thread title</h3>
  </div>
  <div class="card__collapsible">
    <div class="card__collapsible-inner">
      <div class="comment-msg" data-message-id="m-01">
        <p class="t-caption">First message.</p>
      </div>
      <div class="comment-msg" data-message-id="m-02" data-author-role="agent">
        <p class="t-caption">Agent reply.</p>
        <button class="comment__menu" aria-label="Thread actions">…</button>
      </div>
    </div>
  </div>
</div>
```

Rules:

- Two shapes only. Draft uses `card--shout`. Thread uses `card--interactive`.
- Every `.comment-msg` carries `data-message-id`. Kit stamps it at creation time; consumers pre-rendering server HTML can seed the id.
- Agent-authored messages carry `data-author-role="agent"`. Consumers set it at render time; kit never classifies messages itself.
- Kebab menu carries five actions: Approve, Edit, Reply, Archive thread, Delete. Approve is hidden unless the thread's last list message has `data-author-role="agent"`. Edit collapses the whole thread into a single field-card prefilled with the targeted message's body; Enter commits and re-forms the thread, Escape (or clicking another card) cancels.
- Archive sets `data-archived="true"` on the thread. DOM retained, hidden via CSS.
- Used in: inspector, three columns.
- Runtime events, config keys, and consumer integration patterns: `docs/integration/comment.md`.

Deep link: `demos/fundamental--accepted/index.html#comment`.

## Navigation

Sidebar nav with scroll-spy indicator. `sidebar__nav` wraps `nav-group` sections; `toc__indicator` animates between active items. Reach for the sidebar nav in any doc surface that carries more than three sections.

```html
<aside class="sidebar" aria-label="Navigation">
  <nav class="sidebar__nav" id="toc">
    <span class="toc__indicator" aria-hidden="true"></span>
    <section class="nav-group">
      <h4 class="t-subtitle">Group</h4>
      <ul class="nav-group__items">
        <li class="t-caption"><a href="#section-a">Section A</a></li>
        <li class="t-caption"><a href="#section-b">Section B</a></li>
      </ul>
    </section>
  </nav>
  <footer class="sidebar__footer t-caption">
    2026, kk.consulting<br />
    Footer text
  </footer>
</aside>
```

Rules:

- Nav items chunk into `nav-group` sections of one to nine items.
- Each `nav-group` header is `<h4 class="t-subtitle">`.
- Scroll-spy is doc-internal. Cross-doc navigation lives in the inspector, not the sidebar.
- `toc__indicator` binds once; kit.js repositions on scroll.
- Used in: three columns, narrow mobile.

Deep link: `demos/fundamental--accepted/index.html#navigation`.

## Signoff

Canonical document ending. Stats + byline + handwritten signature SVG. Every doc ships signed.

```html
<div class="book__signoff">
  <div class="book__signoff-stats">
    <div class="stat t-caption">
      <div><span class="t-caption--bold">3</span> revisions before sealing.</div>
    </div>
    <div class="stat t-caption">
      <div><span class="t-caption--bold">0</span> edits pending.</div>
    </div>
  </div>
  <div class="book__signoff-signature">
    <p class="t-caption">
      Signed by <span class="t-caption--bold">Author,</span><br />
      role at <span class="t-caption--bold">organization</span><br />
      <span class="t-muted">day, time, timezone.</span>
    </p>
    <img class="book__signoff-signature-img" src="signature.svg" alt="Signature" />
  </div>
</div>
```

Rules:

- `book__signoff-stats` grids into three columns. Two or four `.stat` children are valid. Never three.
- Two-stat shape leaves the right column empty for asymmetric breathing room.
- Four-stat shape fills two rows.
- Byline carries author name, role, organization. Timestamp in `t-muted`.
- Signature is an SVG image.
- Used in: every book, every product deliverable.

Deep link: `demos/fundamental--accepted/index.html#signoff`.

## Spec list

The workhorse for key-value rows inside a card. Three shapes.

```html
<!-- Two-column: key + value. -->
<dl class="book__spec">
  <div class="book__spec-row">
    <dt class="book__spec-key">Key</dt>
    <dd class="book__spec-value">Value that may wrap.</dd>
  </div>
</dl>

<!-- Three-column: key + value + prose. -->
<dl class="book__spec book__spec--value">
  <div class="book__spec-row">
    <dt class="book__spec-key">Token</dt>
    <dd class="book__spec-value">16 px</dd>
    <dd class="book__spec-value">When and why to reach for it.</dd>
  </div>
</dl>

<!-- Claim / reality / resolution. -->
<dl class="book__spec book__spec--triple">
  <div class="book__spec-row">
    <dt class="book__spec-key">Claim</dt>
    <dd class="book__spec-value">What we said.</dd>
    <dd class="book__spec-value">What shipped.</dd>
    <dd class="book__spec-value">What we did about it.</dd>
  </div>
</dl>
```

Rules:

- Two, three, or four-column shapes only. No two-row variant.
- `<dt>` is the key. `<dd>` elements are the values in column order.
- Key cells render at Medium 500, full black. No muted defaults.
- Used in: card, signoff stats, book.

Deep link: `demos/fundamental--accepted/index.html#spec-list`.

## List

Caption-sized hairlined list for prose or tabular data. Both `<ul>` (disc marker) and `<ol>` (decimal marker). Hairline separates each item from the next. `js/md.js` emits this class automatically for markdown-rendered lists.

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
- Custom markers: bullet (`ul`) or decimal (`ol`) in the left gutter, Bold 700.
- Structural markers render black, Medium 500. No muted defaults.
- Single list class for both prose and tabular data patterns.
- Used in: book, card, spec list.

Deep link: `demos/fundamental--accepted/index.html#lists`.

## Code

Inline code, tokens, and chip-like phrase emphasis. One class for all inline code shapes. No bold, no caps, no scale shift, no letter-spacing.

```html
<!-- Inline. Surface chip hugging the line. -->
<p class="t-body">Spacing token <span class="t-code">--space-4</span> resolves to 16 px.</p>

<!-- Block. Multi-line code paragraph with a left rail. -->
<pre class="t-code t-code--block">
.card {
  border-radius: var(--radius-lg);
}
</pre>
```

Inline (`.t-code`):

- Surface chip via `--color-surface-strong`. Radius via `--radius-sm`.
- Padding `--space-1` (4 px) vertical, `--space-2` (8 px) horizontal. Top equals bottom; horizontal opens the chip enough to read at body size.
- Color `--color-text-muted` (gray, 50% black).
- Font-family `--font-body` (Commissioner). The kit has one typeface; `<code>` elements override the browser's default monospace.
- Font-weight regular (`--fw-regular`, 500).
- Font-size and leading inherit from the surrounding line.

Block (`.t-code--block`):

- Multi-line code paragraph. Color, weight, size match `.t-code`.
- Font-family `--font-body` (Commissioner). Same typeface as surrounding prose.
- Left rail: 4 px solid `--color-border` (gray hairline). Mirrors the `.quote` shape but in gray, not black.
- Padding-left clears the rail. Padding top and bottom equal for breathing room — top never exceeds bottom.
- No surface chip. The rail carries the affordance.

Replaces `.t-mono` and `.tag--inline`. The kit no longer ships those classes.

Deep link: `demos/fundamental--accepted/index.html#code`.

## Kit-doc primitives

These two primitives render inside kit docs only. Product prose does not reach for them.

### Preview frame

Document-surface primitive for kit docs that embed component or pattern slices. The wrapper clips. The inner iframe renders at 400% and scales to 0.25 so the reader sees the preview at full container width regardless of the slice's internal viewport.

```html
<div class="preview-frame">
  <iframe class="preview-frame__iframe"
          src="./demos/fundamental--accepted/patterns/some-slice.html"
          title="Slice preview"
          loading="lazy"></iframe>
</div>
```

Rules:

- `.preview-frame` carries the clip, border, radius, and height floor.
- The inner iframe must carry `.preview-frame__iframe`. The 400% width and the 0.25 scale are load-bearing.
- Scale ratio is a constant. A second ratio ships a modifier class with its own width, height, and scale trio.
- Pair with `.card--interactive.card--selectable` in the doc column when the preview is driven by a click-to-select registry.
- Kit docs only. Product prose does not render iframes.
- Used in: patterns book, registry pages.

Deep link: `demos/fundamental--accepted/index.html#preview-frame`.

### Registry table

Document-surface primitive for dense two-column inventories on kit registry pages. Resets browser table defaults, applies the kit's hairline border and text tokens, and keeps links inheriting surface type.

```html
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
      <td class="t-body">Body text, 22 / 32 Medium.</td>
    </tr>
  </tbody>
</table>
```

Rules:

- `.registry-table` carries the full table reset. No per-cell inline styles.
- First column reserves 30% width and forbids wrapping. The class or token name column.
- Header row uses `--color-border-strong`; body rows use `--color-border`. Last body row drops its border so the table ends flush with following prose.
- Links inside a registry table inherit `--color-text` and underline on hover or focus.
- Kit docs only. Product prose does not render inventory tables.
- Used in: components registry, patterns registry, voice registry.

Deep link: `demos/fundamental--accepted/index.html#registry-table`.

## Forbidden

- Any class not starting with `t-`, `card`, `field`, `button`, `tag`, `switch`, `sidebar`, `book`, `nav-group`, `inspector`, `comment`, `stat`, `swatch`, `app`, `preview-frame`, `registry-table`, `toc-`, `fab`, `deck`, `highlight`, `figure`, `quote`, `divider`, `avatar`.
- Inline styles for tokens. Use `var(--token-name)`.
- New color, spacing, or radius values outside `tokens.json`.
- Drop shadows, glass, blur, gradients.
- Light weight (400 Book) and muted color on body or structural markers.
- Italics, ALL CAPS, Title Case.
- Em-dashes in headlines.
- Utility-class frameworks (Tailwind, Bootstrap, Bulma).

Additions run the evolve protocol. See `pipeline/protocols.md § Evolve`.

## Signoff

<div class="book__signoff">
  <div class="book__signoff-stats">
    <div class="stat t-caption">
      <div><span class="t-caption--bold">14</span> components catalogued.</div>
    </div>
    <div class="stat t-caption">
      <div><span class="t-caption--bold">6</span> foundations rule the rest.</div>
    </div>
  </div>
  <div class="book__signoff-signature">
    <p class="t-caption">
      Signed by <span class="t-caption--bold">Konstantin Konstantinopolskii,</span><br />
      founder at <span class="t-caption--bold">kk.consulting</span><br />
      <span class="t-muted">2026-04-24, content-architecture session.</span>
    </p>
    <img class="book__signoff-signature-img" src="../../signature.svg" alt="Signature" />
  </div>
</div>
