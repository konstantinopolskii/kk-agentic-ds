# Components

Jobstory: when drilling from a pattern into its parts, find every foundation, component, and forbidden thing in one book with deep links into live examples, so we use kit vocabulary and never invent.

This book is reference. Inventory first, foundations second, components third, kit-doc primitives fourth, forbidden close. Every component section carries pointer prose + HTML snippet + rules + deep link into `demos/fundamental--accepted/index.html`. Every class resolves to the kit. Tokens resolve to `tokens.json`.

## Using the snippets

Vue SFCs are the authoring surface (`packages/vue/sfc/components/*.vue`, composables in `packages/vue/sfc/composables/*.ts`, import surface `packages/vue/sfc/index.ts`). Every component entry below carries the markup contract (HTML snippet, the exact class structure `vars.css` and `style.css` bind to) plus the Vue API that emits it: import name, props, emits, slots, v-model. Author pages with the components; the snippet is what the component must render, not a copy-paste target. `js/kit.js` remains as frozen legacy behind the static demo pages only.

## Component registry

| Class | Role | Deep link |
|-------|------|-----------|
| `card` | Static container. Transparent at rest. | `demos/fundamental--accepted/index.html#cards` |
| `card--interactive` | Sticky active or minimized state with collapsible body. | `demos/fundamental--accepted/index.html#cards` |
| `card--link` | Anchor card. Whole surface navigates. | `demos/fundamental--accepted/index.html#cards` |
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
| `chip` | Pressable pill. Selects among peers. | `demos/reference-recreations/01-rank-tracker.html` |
| `media` | Row molecule: figure, body, trailing meta. | `demos/reference-recreations/08-status-feed.html` |
| `metric` | Number-first stat for panels. | `demos/reference-recreations/02-forecast-module.html` |
| `data-table` | Dense product rows with numeric cells. | `demos/reference-recreations/01-rank-tracker.html` |
| `spark` | Monochrome trend marks under the data-ink policy. | `demos/reference-recreations/02-forecast-module.html` |
| `preview-frame` | Scaled iframe for doc surfaces. | `demos/fundamental--accepted/index.html#preview-frame` |
| `registry-table` | Dense two-column inventory for kit docs. | `demos/fundamental--accepted/index.html#registry-table` |
| `modal` | One decision held over a scrim. White dialog, no shadow. | `demos/kit-snapshot/index.html#modal` |
| `dropdown` | Menu button and popover. Picks one action. | `demos/kit-snapshot/index.html#dropdown` |
| `tabs` | One surface, peer views under a shared strip. | `demos/kit-snapshot/index.html#tabs` |
| `tooltip` | One line of hint on hover or focus. Inverted bubble. | `demos/kit-snapshot/index.html#tooltip` |
| `toast` | Transient confirmation. Inverted, bottom-center, self-clearing. | `demos/kit-snapshot/index.html#toast` |
| `pagination` | Page numerals with CSS-drawn prev and next chevrons. | `demos/kit-snapshot/index.html#pagination` |

## Foundations

Foundations are the seven rule sets every component sits on top of. Each subsection carries the key rules and a pointer to the live inventory in the fundamental demo. Machine-readable source of truth is `tokens.json`.

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

### Data ink

Charts decorate numbers; they never replace them. Every charted value stays readable as text somewhere on the surface.

- Monochrome data ink. Primary series in `--color-text`; a secondary series demotes to `--color-border-strong`. No red, no green, no second hue.
- Bars and lines only. No pies, no donuts, no gauges, no radar.
- Direct labels over legends. Label the first, peak, and last points in text; a legend is a failure to label directly.
- Deltas are direction glyphs plus weight: ↑2 bold for movement, regular muted for flat. If a delta needs color to be understood, the label is wrong. The ↑ and ↓ arrows render from the kit's own face (`Commissioner-Deltas.woff2`, scoped by unicode-range) — Commissioner itself has no arrows, and the system fallback is oversized and off-baseline. ▲ and ▼ are retired: the face still renders them so old content doesn't break, but they never ship in new work.
- Direction glyphs appear in exactly one place: beside a number, inside a delta. Never as list markers, never in buttons or labels, never as decoration. A page whose arrows outnumber its deltas is using them wrong.
- Gridlines and baselines are 0.5 px hairlines.
- Data-driven dimensions (bar heights, line points) ride custom properties or SVG attributes and may fall below the 4 px grid — data ink is not layout. Everything around the chart stays on the grid.
- No hover-only truth. Hover may add precision; it never holds the only copy of a value.

Deep link: `demos/reference-recreations/02-forecast-module.html`.

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

- Mechanics. 320 ms, `--ease-out`. translateX −12 px, scale 0.96, opacity 0 → translateX 0, scale 1, opacity 1. Attached inline by `useColumnReveal`, wired on `KApp` mount.
- Why it exists. The sidebar comes in from its own side of the screen. The motion reads as the column entering from where it lives, not floating up from the page.
- Applications. Sidebar reveal on initial paint or when `data-view="nav"` swaps in at narrow viewport.

**reveal-from-right.**

- Mechanics. 320 ms, `--ease-out`. translateX 12 px, scale 0.96, opacity 0 → translateX 0, scale 1, opacity 1. Attached inline by `useColumnReveal`, wired on `KApp` mount.
- Why it exists. The inspector comes in from its own side. Mirrors the sidebar reveal so the two columns read as a pair.
- Applications. Inspector reveal on initial paint or when `data-view="inspector"` swaps in at narrow viewport.

**reveal-from-below.**

- Mechanics. 320 ms, `--ease-out`. translateY 16 px, scale 0.98, opacity 0 → translateY 0, scale 1, opacity 1. Attached inline by `useColumnReveal`, wired on `KApp` mount.
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
| `t-subtle` | opacity to `--color-text-subtle` | Placeholders, and metadata on inverted shout surfaces. |

Forbidden: emitting raw `font-size`, `font-weight`, or `color` on elements. Always pick a utility class.

Deep link: `demos/fundamental--accepted/index.html#type`.

## Card

Every widget is a card. Transparent at rest; 3% on focus and active. Hover reacts only on `card--interactive` and `card--link` — a static card is furniture and stays still. Because book cards already rest on the 3% overlay, hover steps one notch further to the 6% strong surface, same ladder as buttons. No borders. No shadows. Three variants share one HTML shape. Reach for a card whenever a widget groups a heading, body, and at most one primary action.

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

<!-- Link card. The whole surface is one navigation affordance. -->
<a class="card card--link" href="./doc.html?src=./skills/kk-design-system/canon/patterns.md">
  <div class="card__heading">
    <h3 class="t-title">Patterns</h3>
    <p class="t-caption">When composing any layout, start here.</p>
  </div>
  <span class="button t-subtitle">Browse patterns</span>
</a>
```

Rules:

- Only `card--interactive` and `card--link` react to hover, and they answer with the strong surface. Static cards never hover — affordance is a promise, and a card that lights up must do something when clicked.
- Interactive cards need hidden content. A card that only fires an action stays static; a card that opens another document is a link card.
- Link cards render as an `<a>`. The button inside is a `<span>` labeling the destination, never a nested `<button>` or second `<a>`. One card, one target.
- The stack script skips link cards: no promotion, no glide, the click just navigates.
- One active per stack.
- One shout per column. If everything shouts, nothing does.
- Primary and minimized button labels never match.
- The rail is the default. Every direct child of a card — prose, lists, spec lists, chip rows, media rosters, metric rows, data tables, sparks, anything — lands on the 24 px text rail automatically. Never add per-child padding or margin to reach the rail; the kit already put you there. The only elements off the default are the kit's own bleeders, a closed list: `card__heading` and `card__body` (pad themselves), `card__collapsible` (inner manages the rail), fields and switches (flush hover fill, hairline inset to the rail), decks, dividers. Extending that list is a kit change, not a page decision. Inside `card__collapsible-inner` wrap prose and rosters in `card__body`; fields, decks, and comment lists sit flush there.
- Used in: card stack, three columns, comment; link cards in: inspector pointer groups, doc shelves.

**Vue.** `KCard` (`variant: 'static' | 'interactive' | 'link' | 'shout' | 'heading' = 'static'`, `href = ''`, `tight = false`, `selectable = false`, `state: 'active' | 'minimized' | null = null`, `span: 'third' | 'half' | 'two-thirds' | 'full' | null = null`, `lead = false`); one default slot. `variant: 'link'` renders an `<a>`, `variant: 'heading'` a `<header>`, everything else a `<div>`. `span` puts the card on the panels grid; `lead` marks it the front-page lead story. `KCardHeading` (`title`, `subtitle = ''`, `muted = false`) renders the `h3.t-title` and optional subtitle — no slot, both are props. `KCardBody` wraps injected content on the text rail, no props. `KCardCollapsible` (`flush = false`) wraps its slot in `card__body` unless `flush`, for children that manage their own bleed. `KCardStack` (`columns = false`) groups cards; the promote/demote/glide the stack script performs comes from `useInspectorStack`, wired automatically when the stack sits inside `<KInspector>` (see Navigation). A stack rendered outside an inspector wires the same composable by hand: `useInspectorStack(rootEl.value)` on mount.

```html
<KCard variant="interactive" :state="state">
  <KCardHeading title="Interactive card" />
  <KCardCollapsible>
    <!-- revealed when active -->
  </KCardCollapsible>
  <KButton cta="minimized">Open</KButton>
  <KButton primary cta="active">Commit</KButton>
</KCard>
```

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

**Vue.** `KField` (`label = ''`, `modelValue = ''`, `placeholder = ''`, `type = 'text'`, `textarea = false`, `row = false`, `fakeCaret = false`) is the editable form: v-model on `modelValue`, emits `update:modelValue`. `row` adds `field--row` for a label-sharing-a-row layout; `textarea` swaps the `<input>` for a `<textarea>`. `KFieldRow` (`label`, `value = ''`) is the read-only display form — a label and a value sharing one row, no input; the default slot overrides `value` for richer content.

```html
<KField label="Email" row v-model="email" placeholder="sofia@kk.consulting" />
<KField placeholder="Type a comment" fake-caret v-model="draft" />
```

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

**Vue.** `KButton` (`primary = false`, `as: 'button' | 'span' = 'button'`, `type = 'button'`, `cta: 'minimized' | 'active' | null = null`, `caption = false`); one default slot, no emits — bind `@click` directly. `as="span"` renders the link-card destination label. `cta` stamps `data-cta` for the interactive-card state pair. `caption` drops the label to caption-bold for the media-trail form instead of the default `t-subtitle`.

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

**Vue.** `KTag` (`bold = false`); one default slot, no emits.

Deep link: `demos/fundamental--accepted/index.html#tags`.

## Switch

Binary toggle. A switch flips a single setting on or off. Anything with three or more states is not a switch.

```html
<label class="switch">
  <input class="switch__input" type="checkbox" />
  <span class="switch__track"></span>
  <span class="t-caption">Label</span>
</label>
```

Rules:

- One label per switch. The label names the setting, not the state.
- The thumb is `.switch__track::after` — no inner thumb element. The track span stays empty.
- `9999 px` radius on the thumb. `12 px` radius on the track.
- Keyboard-operable via `<input type="checkbox">` under the hood.
- Used in: field, spec list, card.

**Vue.** `KSwitch` (`label`, `modelValue = false`); v-model on `modelValue`, emits `update:modelValue`. `label` is required and names the setting, not the state, matching the rule above.

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
- Every `.comment-msg` carries `data-message-id`. `useCommentFlow` stamps it at creation time; consumers pre-rendering server HTML can seed the id, and `useCommentStore` stamps any pre-rendered message still missing one on mount.
- Agent-authored messages carry `data-author-role="agent"`. Consumers set it at render time; the components never classify messages themselves.
- Kebab menu carries five actions: Approve, Edit, Reply, Archive thread, Delete. `useCommentMenus` opens and closes the popover and recomputes Approve's availability each time it opens; Approve stays hidden unless the thread's last list message has `data-author-role="agent"`. `useCommentFlow` runs the five actions. Edit collapses the whole thread into a single field-card prefilled with the targeted message's body; Enter commits and re-forms the thread, Escape (or clicking another card) cancels.
- Archive sets `data-archived="true"` on the thread. DOM retained, hidden via CSS.
- Used in: inspector, three columns.
- Runtime events, config keys, and consumer integration patterns: `docs/integration/comment.md`.

**Vue.** `KCommentNew` (`title = 'Add a comment'`, `placeholder = 'Type a comment'`, `modelValue = ''`, `commitLabel = 'Commit'`) is the draft card: v-model on `modelValue`, emits `update:modelValue` and `commit` (with the draft text). `KCommentThread` (`title`, `state: 'active' | 'minimized' = 'minimized'`, `archived = false`, `messages: KCommentThreadMessage[]`, each `{ id, body, role? }`) is the structural thread render — no emits; the kebab, edit, reply, archive, and approve actions all live in `useCommentFlow`, not in the component. `KCommentStack` is the empty inspector container the comment system owns at runtime; ship it plain (`<KCommentStack />`) or pre-seeded with `KCommentThread` children.

Behavior is composable, not component-owned. Wire `useCommentFlow(bookRef, inspectorRef, { currentAuthor })` once per book/inspector pair — `currentAuthor` is required (no silent demo-author default) and stamps every draft, reply, and edit committed locally; it listens for `kk:comment` on the stack for persistence and drives the whole selection-to-draft-to-thread flow described above. `useCommentStore(bookRef, inspectorRef, options?)` persists the stack (`localStorage` by default, keyed `kk:comments:<pathname>`; pass `adapter` for a DB-backed store or `enabled: false` to disable) and restores it plus its doc-side highlights on mount. `useCommentSecret(inspectorRef)` and the standalone `extractCommentsFromStack(stackEl)` pull the thread data back out as JSON — the hidden `data-kk-action="copy-comments"` strip at the top of the inspector copies it to the clipboard.

```html
<KInspector ref="inspectorRef">
  <KCommentStack />
</KInspector>
```
```ts
useCommentFlow(bookRef, inspectorRef, { currentAuthor: session.name })
useCommentStore(bookRef, inspectorRef)
```

Deep link: `demos/fundamental--accepted/index.html#comment`.

## Navigation

Sidebar nav with scroll-spy indicator. `sidebar__nav` wraps `nav-group` sections; `toc__indicator` animates between active items. Reach for the sidebar nav in any doc surface that carries more than three sections.

`KSidebarNav` auto-fills the nav from the rendered `.book` heading rank on mount, via `useScrollSpy` (2.0.0). Ship the shell empty; the composable reads the heading structure and writes the TOC once, at mount. Hand-curated content is preserved by passing the `manual` prop (renders `data-nav="manual"`) on `<KSidebarNav>`.

### Auto-fill (default)

```html
<aside class="sidebar" aria-label="Navigation">
  <nav class="sidebar__nav" id="toc">
    <span class="toc__indicator" aria-hidden="true"></span>
  </nav>
  <footer class="sidebar__footer t-caption">
    2026, kk.consulting<br />
    Footer text
  </footer>
</aside>
```

`useScrollSpy` runs once, at `KSidebarNav` mount. Generated shape varies by heading rank — see `docs/integration/sidebar-nav.md` for the three-mode resolution rule (multi-h1, mixed, flat).

### Hand-curated (opt-out)

```html
<aside class="sidebar" aria-label="Navigation">
  <nav class="sidebar__nav" id="toc" data-nav="manual">
    <span class="toc__indicator" aria-hidden="true"></span>
    <section class="nav-group">
      <a class="t-subtitle nav-group__head" href="#section-a">Group</a>
      <ul class="nav-group__items">
        <li class="t-caption"><a href="#section-a">Section A</a></li>
        <li class="t-caption"><a href="#section-b">Section B</a></li>
      </ul>
    </section>
  </nav>
</aside>
```

`manual` short-circuits the generator; `KSidebarNav` leaves its children untouched. Author `KNavGroup` directly inside it. The legacy `<h4 class="t-subtitle">` header shape also stays valid for hand-curated nav (`KNavGroup` without `href` renders it), but the anchor form is preferred — it keeps the bold label clickable and scroll-spy-aware.

Rules:

- Nav items chunk into `nav-group` sections of one to nine items.
- Bold label is `<a class="t-subtitle nav-group__head">` for click + scroll-spy. Hand-curated nav may still use `<h4 class="t-subtitle">` for non-clickable headers.
- Scroll-spy is doc-internal. Cross-doc navigation lives in the inspector, not the sidebar.
- `toc__indicator` binds once; `useScrollSpy` repositions it on scroll.
- `manual` opts a single nav out of auto-fill. Other navs on the page keep auto-filling.
- Anchor jumps glide via `useScrollSpy`'s own rAF tween. Never declare `scroll-behavior: smooth` on the columns — a CSS glide and a JS glide on the same tree cancel each other and the scroll dies a few pixels in.
- Used in: three columns, narrow mobile.

**Vue.** `KSidebar` (`title = ''`) is the column shell: default slot for the nav, `footer` slot for `sidebar__footer`. `KSidebarNav` (`id = 'toc'`, `manual = false`) owns the `useScrollSpy` wiring described above — no emits. `KNavGroup` (`head`, `href = ''`, `items: { label, href, current? }[]`) renders one section; omit `href` for the non-clickable `<h4>` header. Reach for `KNavGroup` directly when `manual` is set; otherwise ship `<KSidebarNav>` empty and let it build its own children.

```html
<KSidebar>
  <KSidebarNav manual>
    <KNavGroup head="Group" href="section-a" :items="[
      { label: 'Section A', href: 'section-a' },
      { label: 'Section B', href: 'section-b' },
    ]" />
  </KSidebarNav>
  <template #footer>2026, kk.consulting</template>
</KSidebar>
```

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

**Vue.** `KSignoff` (`stats: { value, text }[]`, `author`, `role`, `org`, `stamp`, `signatureSrc`) renders each stat through `KStat` (`value`, `text` — a lone number inside prose, both required) and the byline/signature from the remaining props. No slots, no emits — pass two or four `stats` entries; the component does not enforce the never-three rule, so the caller still owns it.

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

**Vue.** `KSpecList` (`variant: 'plain' | 'value' | 'triple' = 'plain'`, `rows: { key: string, values: string[] }[]`) is fully data-driven — no slots. Column count follows `values.length` per row; the component does not clamp it to two, three, or four, so pick `variant` and row shape to match.

```html
<KSpecList variant="value" :rows="[
  { key: 'Token', values: ['16 px', 'When and why to reach for it.'] },
]" />
```

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
- Custom markers in the left gutter: `ul` gets a 4 px black dot, `ol` a decimal numeral Bold 700.
- Structural markers render black, full ink. No muted defaults, no thin gray dashes.
- Single list class for both prose and tabular data patterns.
- Used in: book, card, spec list.

**Vue.** `KList` (`ordered = false`, `items: string[] | null = null`) renders `<ol>` when `ordered`, else `<ul>`. Author `<li>` markup directly in the default slot, or pass `items` for a plain string list — the slot wins when both are present.

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

**Vue.** `KCode` (`block = false`) renders a `<pre class="t-code t-code--block">` when `block`, else an inline `<span class="t-code">`. One default slot either way.

Deep link: `demos/fundamental--accepted/index.html#code`.

## Chip

A tag the user can press. Chips select among peers: segment tabs, filter rails, multi-select wraps. Tag stays metadata, button commits an outcome, chip picks. Sourced from the reference study: role tabs on kk.consulting, habit picker in Joi, filter rows in Must.

```html
<div class="chip-wrap">
  <button class="chip" type="button" aria-pressed="true">Founder</button>
  <button class="chip" type="button" aria-pressed="false">Strategist</button>
  <button class="chip" type="button" aria-pressed="false">Mentor</button>
</div>
```

Rules:

- Renders as `<button class="chip">` with `aria-pressed`, or `data-state="selected"` when a script owns the state.
- Selected inverts: black surface, white label, bold. One selected per segment group; any number in a multi-select wrap.
- A chip never navigates. A pill that opens a page is a link card or a plain link.
- Groups wrap in `.chip-wrap`; the wrap owns the 8 px gaps.
- Used in: filter rails, segment rows, onboarding multi-selects, data-table toolbars.

**Vue.** `KChipWrap` (`modelValue?: string | number`) is the segment group: v-model, emits `update:modelValue`. `KChip` (`pressed = false`, `value?: string | number`) emits `click`. Inside a `KChipWrap`, a chip carrying `value` reads its pressed state from the group and clicking it selects that value — the `pressed` prop is ignored. Outside a wrap, `KChip` stands alone on `pressed`.

```html
<KChipWrap v-model="role">
  <KChip value="founder">Founder</KChip>
  <KChip value="strategist">Strategist</KChip>
  <KChip value="mentor">Mentor</KChip>
</KChipWrap>
```

Deep link: `demos/reference-recreations/01-rank-tracker.html`.

## Media row

The row molecule every feed, file list, byline, and related list shares: leading figure, two-line body, trailing meta. Sourced from Clique's status feed, WeTransfer's file rows, Must's lists.

```html
<div class="media">
  <span class="avatar media__figure">GR</span>
  <div class="media__body">
    <p class="t-caption--bold">Giana Rosser</p>
    <p class="t-caption t-muted">Is watching Last of Us</p>
  </div>
  <span class="tag media__trail">3</span>
</div>

<!-- Action form: the trail holds one compact button. -->
<div class="media">
  <span class="avatar media__figure"></span>
  <div class="media__body">
    <p class="t-caption--bold">Toki</p>
    <p class="t-micro t-muted">11 291 km away</p>
  </div>
  <div class="media__trail">
    <button class="button t-caption--bold" type="button">Poke</button>
  </div>
</div>

<!-- Anchor form: the whole row is one target, like the link card. -->
<a class="media" href="./doc.html?src=./references/registry.md">
  <span class="media__figure media__figure--square"></span>
  <div class="media__body">
    <p class="t-caption--bold">Reference registry</p>
    <p class="t-micro t-muted">12 studies, 5 components</p>
  </div>
</a>
```

Rules:

- Hairline between sibling rows, never above the first or below the last. The field's divider law.
- Body holds at most two lines: bold caption first, muted caption or micro second.
- The figure slot takes an `avatar`, an `<img>`, or stays an empty surface disc; `--square` for artwork and files.
- Trailing slot holds a `tag`, a value, one compact button, or nothing. A button in the trail auto-sizes and drops to the small pads; one action per row, and a row needing more than one is a card.
- Anchor form navigates as one target. One row, one destination. Anchor rows carry no trail button — a row is a link or an action, never both.
- Inside a product shell, rows tighten to 8 px vertical pads. The reading shell keeps the roomy default.
- Used in: feeds, file lists, bylines, related lists, front-page rails, poke lists.

**Vue.** `KMedia` (`title`, `meta = ''`, `micro = false`, `href = ''`, `initials = ''`, `square = false`, `trailTag = ''`); renders an `<a>` when `href` is set, else a `<div>`. `figure` slot overrides the default avatar/square figure; `trail` slot renders inside `media__trail` for the one-compact-button form (ignored when `trailTag` is set — `trailTag` wins). `micro` drops the second body line to `t-micro`.

Deep link: `demos/reference-recreations/08-status-feed.html`.

## Metric

The stat sized for panels: number first, label second, delta third. Tabular numerals keep metric columns aligned. Sourced from Must person pages and the SEOmonitor forecast module.

```html
<div class="metric-row">
  <div class="metric">
    <p class="metric__value">195 151</p>
    <p class="metric__label">Fans on Must</p>
    <p class="metric__delta">↑ 2 340 <span class="t-muted">this month</span></p>
  </div>
  <div class="metric">
    <p class="metric__value">7.6</p>
    <p class="metric__label">Average rating</p>
  </div>
</div>
```

Rules:

- Value renders at display scale, bold, tabular. Label at caption, regular. Delta at micro, bold, glyph-first.
- Delta glyphs are ↑ and ↓ — ▲/▼ are retired. No color. Flat periods drop the delta line instead of printing ↑ 0. Direction glyphs live beside numbers in deltas only, never as decoration.
- Two to four metrics per row. A lone number inside prose is a `stat`, not a metric.
- Thin space groups thousands: 195 151, never 195,151.
- Used in: panel grids, shout cards, person pages, forecast modules.

**Vue.** `KMetric` (`value: string | number`, `label = ''`, `delta = ''`); no slots, no emits. `metric-row` is not componentized — wrap `KMetric` siblings in a plain `<div class="metric-row">`.

Deep link: `demos/reference-recreations/02-forecast-module.html`.

## Data table

Product rows at density: header micros over a strong hairline, body rows on soft hairlines, numbers right-aligned tabular. The registry table stays a doc primitive; this is the working sibling. Sourced from the Rank Tracker keyword table and the planetarium projects table.

```html
<table class="data-table">
  <thead>
    <tr>
      <th scope="col">Keyword</th>
      <th scope="col" class="data-table__num">Position</th>
      <th scope="col" class="data-table__num">Change</th>
      <th scope="col" class="data-table__num">Volume</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="data-table__lead">design system audit</td>
      <td class="data-table__num">3</td>
      <td class="data-table__num data-table__delta">↑ 2</td>
      <td class="data-table__num">12 400</td>
    </tr>
    <tr>
      <td class="data-table__lead">agentic pipeline</td>
      <td class="data-table__num">11</td>
      <td class="data-table__num data-table__delta data-table__delta--flat">0</td>
      <td class="data-table__num">880</td>
    </tr>
  </tbody>
</table>
```

Rules:

- The lead cell is bold; every other cell regular. One distinction step per row.
- Numeric cells carry `data-table__num`: right-aligned, tabular numerals.
- Delta cells carry the glyph in text. Flat deltas demote to regular muted via `--flat`.
- Progress renders as a percent value in text. No bars inside cells; a trend belongs to a `spark` cell.
- Row hover fills 3%. A clickable row wraps its lead in a link; whole-row click stays with cards.
- Used in: dashboards, keyword tables, project rosters, admin lists.

**Vue.** `KDataTable` (`columns: (string | { label: string, num?: boolean })[]`) renders `<thead>` from `columns`; author body `<tr>` rows in the default slot, built from `KDataCell` (`lead = false`, `num = false`, `delta = false`, `flat = false`) in each `<td>`. `delta` implies the numeric class; `flat` demotes a delta cell to regular muted.

```html
<KDataTable :columns="['Keyword', { label: 'Position', num: true }, { label: 'Change', num: true }]">
  <tr>
    <KDataCell lead>design system audit</KDataCell>
    <KDataCell num>3</KDataCell>
    <KDataCell delta>↑ 2</KDataCell>
  </tr>
</KDataTable>
```

Deep link: `demos/reference-recreations/01-rank-tracker.html`.

## Spark

Trend marks under the data-ink policy. Bars for periods, a line for continuity. Inline size rides in tables; panel size carries modules.

```html
<!-- Inline, in a table cell. Heights are data via --v. -->
<span class="spark" role="img" aria-label="Positions, 12 weeks, rising">
  <span class="spark__bar" style="--v: 30%"></span>
  <span class="spark__bar" style="--v: 45%"></span>
  <span class="spark__bar" style="--v: 80%"></span>
</span>

<!-- Panel scale, with direct labels. -->
<div class="spark spark--panel" role="img" aria-label="Traffic by month">
  <span class="spark__bar spark__bar--soft" style="--v: 40%"></span>
  <span class="spark__bar" style="--v: 65%"></span>
</div>
<div class="spark-labels"><span>Jan</span><span>Jun</span><span>Dec</span></div>
```

Rules:

- `--v` carries each bar's height as a percent. Data ink may fall below the 4 px grid; layout around the chart never does.
- Primary series black; secondary series `--soft` at the 20% hairline tone. Two series maximum.
- Panel sparks earn their width with granularity: 16–32 bars. Six slabs across a module is a poster, not a chart — the ink outweighs the information. Pick the natural fine period (weeks across months, hours across a day) over the coarse one.
- Bars sit 2 px apart and round all four corners — 4 px at panel scale, 2 px inline. Both numbers are data-ink territory, not layout grid.
- Panel sparks spend ink where the reader looks: the history runs `--soft`, one bar — the current or selected period — carries full ink. An all-black panel spark is reserved for the rare module where the whole series is the message. Inline sparks stay all-ink; at cell scale a soft ramp reads as fading, not emphasis.
- Line variant ships a tiny inline SVG: `stroke="currentColor"`, width 1.5, no fill, no markers, wrapped in `.spark--line`.
- Every sparkline carries `role="img"` and an `aria-label` stating the trend in words.
- The chart never holds the only copy of a value. See Data ink under Foundations.
- Used in: data-table cells, forecast modules, metric panels.

**Vue.** `KSpark` (`values: number[]`, `label: string`, `panel = false`, `soft: number[] = []`, `emphasize: number | null = null`) renders `<span>` inline or `<div class="spark--panel">` when `panel`; `role="img"` and `aria-label` come straight from `label`. `emphasize` (a bar index) inverts the spend: that one bar keeps full ink, every other demotes to `--soft`, overriding `soft` when set. `KSparkLabels` (`labels: string[]`) renders the direct-label row underneath. The line variant (`.spark--line`, inline SVG) has no Vue wrapper yet — author it directly per the markup contract.

Deep link: `demos/reference-recreations/02-forecast-module.html`.

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

**Vue.** `KPreviewFrame` (`src`, `title`) — no slots, no emits. Both props required; `title` is the iframe's accessible name.

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

**Vue.** `KRegistryTable` (`columns: string[]`) renders the header row from `columns`; author body `<tr>` markup (`td.t-body`) in the default slot.

Deep link: `demos/fundamental--accepted/index.html#registry-table`.

## Modal

One decision, held over a scrim. The dialog is a white surface at `24 px` radius, centered over 40%-black. No shadow: the scrim and a `0.5 px` hairline carry the edge. Heading is one contrast step, ink title over a muted subtitle. Reach for a modal when the user must confirm, name, or cancel one thing before the page moves on. Anything the page can host inline is not a modal.

```html
<button class="button button--primary t-subtitle">
  Publish deliverable
</button>

<div class="modal" id="publish-modal" data-state="closed" aria-hidden="true">
  <div class="modal__scrim" data-modal-close></div>
  <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="publish-modal-t">
    <button class="modal__close" data-modal-close aria-label="Close">×</button>
    <div class="modal__heading">
      <h3 class="t-title" id="publish-modal-t">Publish deliverable</h3>
      <p class="t-caption t-muted">This shares the signed charter with the client workspace.</p>
    </div>
    <div class="modal__body">
      The document locks after publish. Reopen it from the workspace to draft a revision.
    </div>
    <div class="modal__foot">
      <button class="button t-subtitle" data-modal-close>Cancel</button>
      <button class="button button--primary t-subtitle">Publish</button>
    </div>
  </div>
</div>
```

Rules:

- One dialog surface. Heading, body, foot in that order. Foot is optional; a modal without an action still closes on ×, scrim, or Escape.
- White surface, so no shadow. Radius is `--radius-lg` — the dialog case, never `--radius-md`.
- The × uses the character `×` with `aria-label="Close"`. Never an icon font, never an arrow glyph.
- Cancel is a plain button. Red is never invented for it; a destructive action names itself in the primary label.
- One primary per foot. Full-width buttons split the foot row evenly.
- The trigger toggles the `KModal`'s v-model; any button works, no special attribute needed. Every close control inside the dialog still carries `data-modal-close` — the scrim and the × ship it already, and it is how the component's own click handler recognizes a close.
- Opening traps focus in the dialog and locks body scroll; closing restores focus to the opener. `useModal` drives both, watching the v-model.
- Used in: signoff, three columns, charter workspace.
- The legacy `data-modal-open="id"` trigger attribute is a vanilla-kit convention; `KModal` does not read it — toggle its v-model directly.

**Vue.** `KModal` (`id`, `title = ''`, `subtitle = ''`, `modelValue = false`); v-model on `modelValue` (open state), emits `update:modelValue`. Default slot is the body; `foot` slot holds the action buttons. Teleports to `<body>` once mounted (SSR renders in place, so the closed-state markup still matches the parity oracle). `useModal` is wired internally — nothing to call by hand.

```html
<KButton primary @click="open = true">Publish deliverable</KButton>
<KModal id="publish-modal" v-model="open" title="Publish deliverable"
        subtitle="This shares the signed charter with the client workspace.">
  The document locks after publish. Reopen it from the workspace to draft a revision.
  <template #foot>
    <KButton @click="open = false">Cancel</KButton>
    <KButton primary @click="publish">Publish</KButton>
  </template>
</KModal>
```

Deep link: `demos/kit-snapshot/index.html#modal`.

## Dropdown

A menu button and its popover. The trigger carries the label; the popover holds a short list of actions the user picks one from. Reach for a dropdown when a handful of related commands would crowd the surface as separate buttons. The popover is a white surface, so it earns no shadow: a `0.5px` hairline and the page behind it do the separating.

```html
<div class="dropdown" data-dropdown>
  <button class="dropdown__trigger button t-subtitle" aria-haspopup="menu" aria-expanded="false">Export</button>
  <div class="dropdown__popover" role="menu" data-state="closed">
    <button class="dropdown__item" role="menuitem" type="button">Download PDF</button>
    <button class="dropdown__item" role="menuitem" type="button">Copy share link</button>
    <button class="dropdown__item" role="menuitem" type="button">Send to inspector</button>
  </div>
</div>
```

Rules:

- The trigger is a `.button`. It commits to opening the menu, so it looks like every other button.
- Items are actions, not settings. A row that toggles a state is a switch; a row that names a category is a tag.
- One contrast step: a hovered or focused item fills to the 3% overlay. No bold, no color shift.
- Escape closes the popover and returns focus to the trigger. Outside-click closes it too. `useDropdown` drives both; the component itself handles the trigger toggle and closing on item select.
- Popover radius is `16 px`, item radius `12 px`. Never a shadow.
- Used in: card heading, data table row, toolbar.

**Vue.** `KDropdown` (`label = 'Options'`, `items: (string | { label: string, value?: unknown })[] = []`); emits `select` with the chosen item. `trigger` slot overrides the default `.button` trigger (scoped: `{ open, toggle }`); default slot overrides the item list markup entirely.

```html
<KDropdown label="Export" :items="['Download PDF', 'Copy share link']" @select="onExport" />
```

Deep link: `demos/kit-snapshot/index.html#dropdown`.

## Tabs

One surface, several views. Tabs swap the panel under a shared strip without a page change. The selected tab is the only ink on the row; every other tab waits at muted weight under the same hairline. Reach for tabs when the views are peers. If one view must come before the next, that is a flow, not tabs.

```html
<div class="tabs" data-tabs>
  <div class="tabs__list" role="tablist">
    <button class="tabs__tab" role="tab" id="acct-t0" aria-controls="acct-p0" aria-selected="true">Overview</button>
    <button class="tabs__tab" role="tab" id="acct-t1" aria-controls="acct-p1" aria-selected="false">Members</button>
    <button class="tabs__tab" role="tab" id="acct-t2" aria-controls="acct-p2" aria-selected="false">Billing</button>
  </div>
  <div class="tabs__panel" role="tabpanel" id="acct-p0" aria-labelledby="acct-t0">
    <p class="t-caption">Nine seats in use across two workspaces.</p>
  </div>
  <div class="tabs__panel" role="tabpanel" id="acct-p1" aria-labelledby="acct-t1" hidden>
    <p class="t-caption">Invite a teammate by email to add them to this workspace.</p>
  </div>
  <div class="tabs__panel" role="tabpanel" id="acct-p2" aria-labelledby="acct-t2" hidden>
    <p class="t-caption">Next invoice posts on 1 August for $240.</p>
  </div>
</div>
```

Rules:

- One tab is selected at all times. It carries full ink and a 2 px ink underline; the rest stay muted.
- One step of contrast. Muted goes to ink and the underline appears. Weight never changes and the label never fills.
- Tabs are peers. Ordered or gated views belong in a flow, not a strip.
- Label the view, not its state. "Billing", not "Billing (open)".
- Sentence case. One or two words a tab.
- Arrow keys move and select across the strip; Home and End jump to the ends. `useTabs` drives the roving keyboard selection; click-select is the component's own local state.
- Used in: card, inspector, panels.

**Vue.** `KTabs` (`id`, `tabs: { label: string }[]`, `modelValue = 0`); v-model on `modelValue` (selected index), emits `update:modelValue`. Named slots `panel-0`, `panel-1`, … hold each panel's body, matched by tab index.

```html
<KTabs id="acct" v-model="tab" :tabs="[{ label: 'Overview' }, { label: 'Members' }, { label: 'Billing' }]">
  <template #panel-0>Nine seats in use across two workspaces.</template>
  <template #panel-1>Invite a teammate by email to add them to this workspace.</template>
  <template #panel-2>Next invoice posts on 1 August for $240.</template>
</KTabs>
```

Deep link: `demos/kit-snapshot/index.html#tabs`.

## Tooltip

A hint on demand. An inline trigger reveals one line of micro copy on hover or keyboard focus; the bubble is an inverted black surface that floats above the trigger and never takes the pointer. Reach for a tooltip to explain a control the label alone cannot carry — never to store text the user needs to finish the task.

```html
<span class="tooltip" data-tooltip>
  <button class="tooltip__trigger" type="button" aria-describedby="tt-net">?</button>
  <span class="tooltip__bubble" role="tooltip" id="tt-net" data-state="closed">Gross minus refunds and platform fees.</span>
</span>
```

Rules:

- One line only. If the hint wraps, it belongs in the body, not a bubble.
- The bubble is inverted (black) and carries a soft shadow — the one place a shadow is earned. A tooltip on a white surface would take none.
- `pointer-events: none` on the bubble. It is a hint, never a target; put no links or buttons inside it.
- Opens on hover and on keyboard focus; Escape or leaving closes it. The component drives this itself (no exported composable) and keeps one bubble open page-wide, closing whichever tooltip was already open when a new one shows. `aria-describedby` on the trigger points at the bubble id.
- Never load-bearing. If the user cannot finish without the text, it is not a tooltip.
- Used in: field label, spec list, card heading, data-table header.

**Vue.** `KTooltip` (`text = ''`, `label = '?'`); `trigger` slot overrides the default `?` badge. No v-model, no emits — the open state is internal.

Deep link: `demos/kit-snapshot/index.html#tooltip`.

## Toast

Transient confirmation. A toast reports that an action landed, then leaves on its own. Inverted surface, bottom-center, one line of copy with an optional action and a dismiss. If the user has to decide something, reach for a modal. A toast never asks a question.

```html
<div class="toast-stack" data-toast-stack aria-live="polite" aria-atomic="false">
  <div class="toast" data-state="open" role="status">
    <span class="toast__text">Draft saved</span>
    <button class="toast__action" type="button">Undo</button>
    <button class="toast__close" aria-label="Dismiss" type="button">×</button>
  </div>
</div>
```

Rules:

- One stack per page. It is a singleton; the `toast()` composable finds it or builds it, and every toast lands in the same bottom-center column.
- Inverted surface. The black background earns the soft shadow. Nothing else about the toast carries depth.
- No status colors. Success, warning, and error share one ink surface. The words carry the meaning, not a green or a red.
- At most one action, labelled with a verb. "Undo", not "OK". Clicking it dismisses the toast.
- The dismiss × always ships. A toast clears itself after four seconds; the × lets the user clear it sooner.
- `aria-live="polite"` so a screen reader announces the message without cutting off what it was already reading.
- Used in: save flows, undo affordances, copy-to-clipboard, background job completion.

**Vue.** `toast(text, opts?)` is the imperative call for real usage, not a component. `opts` takes `action` (verb label), `onAction` (callback, fires before dismiss), and `duration` (ms; default 4000, `0` keeps it open until the user dismisses it or triggers the action). It builds and animates the toast into the singleton stack on `document.body` and is a client-only no-op under SSR. `KToast` (`text`, `action = ''`) is the presentational counterpart — a single static, already-open toast for snapshots and server-rendered markup; it does not auto-dismiss.

```ts
toast('Draft saved', { action: 'Undo', onAction: () => restoreDraft() })
```

Deep link: `demos/kit-snapshot/index.html#toast`.

## Pagination

One row of page numerals with a prev and a next chevron. The current page is the only ink numeral, sitting on a surface-strong fill; the rest stay muted until hovered. Reach for pagination when a list outgrows one screen and the user moves through it a page at a time. Runs of hidden pages collapse to a single gap, so the row never scrolls.

```html
<nav class="pagination" aria-label="Pagination">
  <button class="pagination__edge" data-dir="prev" aria-label="Previous page" type="button"></button>
  <button class="pagination__page" type="button">1</button>
  <span class="pagination__gap" aria-hidden="true">…</span>
  <button class="pagination__page" type="button">3</button>
  <button class="pagination__page" type="button" aria-current="page">4</button>
  <button class="pagination__page" type="button">5</button>
  <span class="pagination__gap" aria-hidden="true">…</span>
  <button class="pagination__page" type="button">12</button>
  <button class="pagination__edge" data-dir="next" aria-label="Next page" type="button"></button>
</nav>
```

Rules:

- Chevrons are CSS-drawn from a rotated bordered square, never a font glyph. The Commissioner face carries no chevron; a `‹` falls back to the system font and breaks.
- One current page per nav. Mark it with `aria-current="page"`; that is the only ink numeral.
- Numerals sit muted. The current page is the single distinction step: muted to ink, plus the surface-strong fill.
- Disable prev on the first page and next on the last. Drop the edge to 0.3 opacity, never remove it.
- Collapse a run of skipped pages to one `…` gap. The gap is `aria-hidden` and never clickable.
- Used in: data table, status feed.

**Vue.** `KPagination` (`pages`, `current = 1`, `window = 5`); emits `change` (page number) and `update:current` (mirrors it, for v-model:current). Fully presentational — it computes the gapped page sequence but owns no fetch; the consumer feeds `current` back in.

```html
<KPagination :pages="12" v-model:current="page" @change="fetchPage" />
```

Deep link: `demos/kit-snapshot/index.html#pagination`.

## Forbidden

- Any class not starting with `t-`, `card`, `field`, `button`, `tag`, `switch`, `sidebar`, `book`, `nav-group`, `inspector`, `comment`, `stat`, `swatch`, `app`, `preview-frame`, `registry-table`, `toc-`, `fab`, `deck`, `highlight`, `figure`, `quote`, `divider`, `avatar`, `chip`, `media`, `metric`, `data-table`, `spark`, `panels`, `panel-`, `front`, `modal`, `dropdown`, `tabs`, `tooltip`, `toast`, `pagination`.
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
      <div><span class="t-caption--bold">25</span> components catalogued.</div>
    </div>
    <div class="stat t-caption">
      <div><span class="t-caption--bold">7</span> foundations rule the rest.</div>
    </div>
  </div>
  <div class="book__signoff-signature">
    <p class="t-caption">
      Signed by <span class="t-caption--bold">Konstantin Konstantinopolskii,</span><br />
      founder at <span class="t-caption--bold">kk.consulting</span><br />
      <span class="t-muted">2026-07-20, Vue 2.0 migration session.</span>
    </p>
    <img class="book__signoff-signature-img" src="../../signature.svg" alt="Signature" />
  </div>
</div>
