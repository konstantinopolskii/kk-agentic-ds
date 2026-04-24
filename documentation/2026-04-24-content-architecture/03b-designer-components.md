---
session: 2026-04-24-content-architecture
stage: 3b
role: designer
character: Susan Kare — state-thoughtful, pixel-honest
pattern-block: 3 — components
input: documentation/2026-04-24-content-architecture/02-design-director.md §Pattern blocks §3. components + 03a-fresh-eyes-pre-components.md
output: full draft prose for canon/components.md with jobstory, foundations (Lebedev stripped), typography utility registry, component sections with HTML snippets + deep links, kit-doc primitives, forbidden, signoff
gate: pending — feeds stage 3c (post-designer fresh-eyes)
---

Stage 3b draft for the components book. One book, one hand. Every question from 3a answered in full. Every class resolves to the kit inventory. `.book` wrapper throughout; `.doc__*` renamed to `.book__*` in every snippet. Lebedev attribution stripped. Comment runtime stays in `docs/integration/comment.md`.

## Jobstory under test

When drilling from a pattern into its parts, we find every foundation + component + forbidden thing in one doc that deep-links to live examples, so we use kit vocabulary and never invent.

## Reader path

A pattern told me to drill in. I arrive with a class name or a foundation in mind. I want inventory first, prose second. I scan, I find, I copy, I follow the deep link to the live demo, I ship. The book is reference, not pedagogy — every section answers "what is this, what are the rules, where is it live" in that order.

Three entry moments the book must serve:

1. **Search by class.** Reader hits `Cmd-F`, types `card--interactive`. Lands in §Card, reads rules, copies snippet, deep-links out.
2. **Browse foundation.** Reader arrived unsure which token owns a 24 px radius. Scans §Foundations § Radii, finds the token, keeps reading or leaves.
3. **Audit forbidden.** Reader writing product UI wants to know the no-list. Scrolls to §Forbidden at the tail, reads the closing rules.

## Fresh-eyes answers (18/18)

1. **Scannable component table at the top.** Yes. The book opens with a jobstory paragraph, then a scannable registry table — one row per component (class · role · deep link). Reader sees the inventory before the prose. Answered in the Example content below under §Component registry.
2. **Scannable foundation table at the top.** No separate foundation table — foundations are six short subsections (Material, Color, Type, Space, Radii, Motion) with a tight rule list and a pointer to `tokens.json` for the machine-readable source. Adding a second top-of-book registry would compete with the component one for the first-screen slot; `tokens.json` already holds the scannable inventory the reader needs.
3. **Forbidden placement.** Bottom, as a close. The book opens with inventory (what exists); it closes with the no-list (what never exists). Closing placement lets the reader finish the book with the rule set in working memory — last thing read, first thing remembered. Top placement would read as defensive; bottom reads as the firm close the word deserves.
4. **Search for `button` lands in inventory, not prose.** The component registry table at the top lists `button` in the first column with a deep link. Reader's first `Cmd-F` hit is inventory; the second is the section heading. Prose only appears after both.
5. **Card HTML snippet standalone or needs JS/CSS.** Every snippet in the book is a paste-into-a-kit-page snippet. It needs `vars.css` + `style.css` loaded and `js/kit.js` auto-initialised for interactive states. No snippet stands alone without the kit. The snippet's job is to show the exact class structure, not to be a runnable island. The book states this once, up front, in §Using the snippets.
6. **Card deep link — opens the demo with correct anchor.** Every component section ends with `Deep link: demos/fundamental--accepted/index.html#<anchor>`. For Card that resolves to `#cards` — the existing anchor in the fundamental demo. Inventory check flags the four anchors the demo does not yet carry (Comment, Preview frame, Registry table, Radii) — those deep links point at the nearest parent section with a note in §Inventory check.
7. **Component-to-pattern back-reference.** Yes. Each component section carries a one-line "Used in" pointer at the tail of its rules list, naming the canonical pattern that composes it (`card` → card stack, three columns; `button` → card, comment, signoff; and so on). The pointer resolves to `canon/patterns.md § <pattern-name>`. Back-references let the reader round-trip without guessing.
8. **Component section self-contained.** Yes. One section per component. Shape: pointer prose (why it exists, when to reach for it) → HTML snippet → rules bullets → used-in pointer → deep link. Variants ride inside one snippet with comments; states are rules bullets; examples are the snippet itself. Reader never leaves the section to learn the component.
9. **Next step after reading.** Copy + customize, then ship. The book is reference. Round-trip to `patterns.md` only if the reader needs a second component composed with this one — the used-in pointer names the pattern, not a recipe. No pedagogy loop.
10. **Reference vs pedagogy.** Reference. The book is a field guide — lookup on demand. The manifesto carries the pedagogy (why the system exists). Components.md carries the inventory (what the system is made of). The §Forbidden close and the top registry both read as reference conventions.
11. **§Foundations top-level or buried.** Top-level, second section after the component registry. Order: jobstory → component registry → §Foundations → §Typography utility classes → §Components (one section per) → §Kit-doc primitives → §Forbidden → §Signoff. A reader who knows the word "foundations" lands in §Foundations with one scroll. The foundations-as-subsection placement matches the direction doc.
12. **"Inner and outer theory" introduced.** Yes — one sentence defines it the first time it appears, inside §Foundations § Type. "Space inside a group never exceeds space between groups. Name: inner and outer theory." No attribution, no source line. Reader meeting the name cold gets the definition in one sentence.
13. **14 rhythm rules — checklist, numbered, or prose.** Numbered list under §Foundations § Type § Rhythm rules. Each rule is one sentence. Auditable — reader can read rule N and check the page against it. Numbering matches the canonical rule order. Four kit-addenda rules (Rule 12 ratio floor, next-sibling margin collapse, label-list tightening, quote treatment) ride as separate bullets after the 14, clearly labeled "kit addenda" so a reader does not confuse them with the core rules.
14. **Comment's own rules here, or only integration pointer.** Book-level rules here (two shapes, kebab menu, draft vs thread, approve gating). Runtime detail — `kk:comment` event payloads for `new`, `reply`, `delete`, `approve`, `archive` — stays in `docs/integration/comment.md`. §Comment carries the one-line pointer: "Runtime events, config keys, and consumer patterns: `docs/integration/comment.md`." That line is the only reference to the lifecycle payloads. The kit-side rules stay in the book so a reader composing a comment knows the two shapes without leaving.
15. **Kit-doc primitives — skip or read.** Read once to know they exist. §Kit-doc primitives carries a one-sentence opener: "These two primitives render inside kit docs only. Product prose does not reach for them." A product-UI reader reads that sentence and moves on; a kit-docs reader keeps going for the snippet and rules. The opener protects product readers from wasted attention.
16. **Structure obvious mid-scroll.** Yes. Every top-level section opens with a display heading (`t-display`), every component section opens with a title (`t-title`). The reader lands mid-scroll, sees the rank of the heading above, knows whether they are in §Foundations, in a component, or in §Forbidden within 0.2s. The component registry at the top anchors the mental model.
17. **Component count visible.** Yes. The top registry table lists every component with a class name in the first column. Reader counts rows. Twelve rows today: Card, Field, Button, Tag, Switch, Comment, Navigation, Signoff, Spec list, List, Preview frame, Registry table.
18. **"Forbidden" reads firm.** Yes. §Forbidden closes the book. Display heading. Bullet list of absolute rules (no filler, no softeners). Closing sentence: "Additions run the evolve protocol. See `pipeline/protocols.md § Evolve`." Firmness sits in the shape — short bullets, no hedging verbs, verb-led imperatives.

## States

The book is prose + snippets — it has two render states and one author state.

- **Rendered state.** `canon/components.md` loaded into the three-column shell via `data-md-src`. `.book` wrapper on the middle column. `js/md.js` renders headings (`#` → `t-hero`, `##` → `t-display`, `###` → `t-title`, `####` → `t-subtitle`), paragraphs (`t-body`), lists (`t-list`), code fences (mono), tables (registry-table). Scroll-spy TOC on the left column reflects every h2/h3. Inspector right holds pointer cards to the other canon files.
- **Raw-source state.** Opened in a file viewer. Plain markdown. The snippet fences read as code blocks; the registry tables read as pipe tables. No kit chrome. This is the agent's view — every role skill loads the file verbatim and reads it as text.
- **Authoring state.** Maintainer editing the file during a kit evolve. Uses `.book` wrapper rules, kit typography utility classes inside code fences, and the same deep-link convention on every component section. No diff between rendered and raw beyond the render.

## Interaction variants

The book itself is read-only. The interactivity lives in the demo targets the book deep-links to.

- **Pointer click — deep link.** Every component section ends with `Deep link: demos/fundamental--accepted/index.html#<anchor>`. Rendered as a plain markdown link. Click opens the demo scrolled to the anchor. Target always exists (see §Inventory check for the four flags).
- **Copy the HTML snippet.** Triple-click inside the fence selects the snippet. Paste into a kit page. No modification needed beyond filling the content slots.
- **Back-reference via used-in.** Every component's rules list ends with `Used in: <pattern>`. Reader follows the pointer to `canon/patterns.md § <pattern>` to see composition.
- **Scroll-spy.** The left-column TOC tracks the reader's scroll position. Lands on §Foundations, §Typography, §Card, …, §Forbidden. One anchor per h2/h3.

No hover states, no focus states, no active states on the book surface. The book is flowing text.

## Edge cases

- **A component missing its deep link.** If the fundamental demo does not yet carry an anchor for the component, the deep link points at the nearest parent anchor (e.g. Comment → no anchor; closest parent is `#stack` for card stack because comments render as cards inside a stack) and §Inventory check flags it. Stage 5 opens a backlog item to add the missing anchor in a subsequent kit version.
- **A rule that contradicts voice.md.** The book points at `canon/voice.md` for every copy rule it references (button labels, sentence case, no em-dashes in headlines). Components.md never restates voice rules — it references them. Drift impossible.
- **A token referenced in prose.** The book names tokens by their variable (`--color-text`, `--space-4`). No literal hex, no px value. `tokens.json` is the source of truth. Literal values appear only inside the typography registry (size · leading · weight), because the reader needs the scale numbers to choose a class.
- **A snippet that used to say `.doc__*`.** Renamed to `.book__*` in every fence before the draft lands. Mechanical find/replace: `.doc` → `.book`, `.doc__part` → `.book__part`, `.doc__section` → `.book__section`, `.doc__spec` → `.book__spec`, `.doc__spec-row` → `.book__spec-row`, `.doc__spec-key` → `.book__spec-key`, `.doc__spec-value` → `.book__spec-value`, `.doc__signoff` → `.book__signoff`, `.doc__signoff-stats` → `.book__signoff-stats`, `.doc__signoff-signature` → `.book__signoff-signature`, `.doc__signoff-signature-img` → `.book__signoff-signature-img`, `.doc__intro` → `.book__intro`.
- **Heading offset mismatch.** When rendered inside the root `index.html` shell via `data-md-src`, the book's `#` headings land at `t-hero`. Shell must not carry its own h1 or part label, or must set `data-md-heading-offset="1"` to shift. This is the canonical hierarchy-collapse failure mode named in the manifesto's type notes.
- **Reader on narrow-mobile.** The book renders inside the kit's narrow pattern — doc single column, sidebar behind hamburger, inspector slides over. `.book` wrapper carries every Tier-2 adjacency rule; narrow shell does not affect typography.

## Example content

Full draft prose for `canon/components.md` below. Copy the fenced block verbatim when stage 5 writes the file.

````markdown
# Components

Jobstory: when drilling from a pattern into its parts, find every foundation, component, and forbidden thing in one book with deep links into live examples, so we use kit vocabulary and never invent.

This book is reference. Inventory first, foundations second, components third, kit-doc primitives fourth, forbidden close. Every component section carries pointer prose + HTML snippet + rules + deep link into `demos/fundamental--accepted/index.html`. Every class resolves to the kit. Tokens resolve to `tokens.json`.

## Using the snippets

Every HTML snippet below pastes into a kit page with `vars.css`, `style.css`, and `js/kit.js` loaded. Snippets do not stand alone — their job is to show the exact class structure a consumer copies into a kit-wrapped surface.

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
| `comment` | Draft or thread. Inspector-only. | `demos/fundamental--accepted/index.html#stack` |
| `sidebar__nav` | Scroll-spy navigation with TOC indicator. | `demos/fundamental--accepted/index.html#opening` |
| `book__signoff` | Canonical document ending. | `demos/fundamental--accepted/index.html#signoff` |
| `book__spec` | Key and value rows inside a card. | `demos/fundamental--accepted/index.html#lists` |
| `t-list` | Hairlined prose list. `<ul>` or `<ol>`. | `demos/fundamental--accepted/index.html#lists` |
| `preview-frame` | Scaled iframe for doc surfaces. | `demos/fundamental--accepted/index.html#figures` |
| `registry-table` | Dense two-column inventory for kit docs. | `demos/fundamental--accepted/index.html#lists` |

## Foundations

Foundations are the six rule sets every component sits on top of. Each subsection carries the key rules and a pointer to the live inventory in the fundamental demo. Machine-readable source of truth is `tokens.json`.

### Material

No skeuomorphic surfaces. Depth comes from hierarchy and spacing, not from effects.

- No gradients.
- No drop shadows.
- No glass or translucency.
- No blur.

Each fakes light or depth the screen cannot carry; each trades clarity for decoration. Deep link: `demos/fundamental--accepted/index.html#color`.

### Color

Nine tokens. Two backgrounds, two surface tints, two hairlines, three text alphas. No brand, no status colors, no accent.

- Text renders black at Medium 500. Full weight for body and structural markers.
- `t-muted` and `t-subtle` are metadata only — bylines, captions, hairlines, placeholders.
- One distinction step per pair. Stacking color tiers creates gray mush.
- Selection renders inverted: `--color-text` background, `--color-bg` text. No native blue.
- If text is ambiguous without color, rewrite the text.

Deep link: `demos/fundamental--accepted/index.html#color`.

### Type

Commissioner. A variable font (SIL OFL 1.1) by Kostas Bartsokas. Three weights used in the kit (Regular 500, Medium 500, Bold 700), seven sizes (66 to 14 px). No italics.

- One distinction step between two elements: bold vs regular, or big vs small, or black vs muted. Never all three.
- Regular sits on Medium 500. Light weight (400 Book) is forbidden unless the content is metadata or the user asks.
- No inline `font-size`, `font-weight`, or `color`. Pick a utility class.
- Every heading rank stays at Bold 700. Weight step only lands at the bottom of the stack, where `#####` demotes to 16 px Regular caption.
- Every `<h4>` in a kit surface carries `t-subtitle`. `<h3 class="t-subtitle">` is not a valid pairing.

#### Rhythm — inner and outer theory

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

- `12 px` — buttons, tiers, switches, fields.
- `16 px` — preview frames and medium surfaces.
- `24 px` — cards and anything that holds content.
- `9999 px` — pills, switch thumbs, avatars, scrollbars.

A fifth canonical radius is forbidden. `vars.css` defines the set; `tokens.json` mirrors it.

Deep link: `demos/fundamental--accepted/index.html#cards`.

### Motion

Default: `200ms × ease-out` on `transform` and `opacity` only.

- Ease-out for functional settles.
- Ease-spring for small confirmations.
- Ease-swing for long reveals.
- Ease-in-out for motion that continues past the frame.
- Press feedback: every tappable surface scales to `0.96` on `:active`.
- On `prefers-reduced-motion`, every duration drops to `0.01ms`.

Deep link: `demos/fundamental--accepted/index.html#motion`.

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
| `t-mono` | inherited · Medium 500 | Inline tokens, values, durations. |
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
    <p class="t-caption t-muted">For the moments that matter.</p>
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
- Focus inverts the row — black surface, white text, white caret.
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
- Keyboard-operable — `<input type="checkbox">` under the hood.
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
- Kebab menu carries four actions: Approve, Reply, Archive thread, Delete. Approve is hidden unless the thread's last list message has `data-author-role="agent"`.
- Archive sets `data-archived="true"` on the thread. DOM retained, hidden via CSS.
- Used in: inspector, three columns.
- Runtime events, config keys, and consumer integration patterns: `docs/integration/comment.md`.

Deep link: `demos/fundamental--accepted/index.html#stack`.

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

Deep link: `demos/fundamental--accepted/index.html#opening`.

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

- `book__signoff-stats` grids into three columns. Two or four `.stat` children are valid — never three.
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

Deep link: `demos/fundamental--accepted/index.html#lists`.

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

Deep link: `demos/fundamental--accepted/index.html#figures`.

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
- First column reserves 30% width and forbids wrapping — the class or token name column.
- Header row uses `--color-border-strong`; body rows use `--color-border`. Last body row drops its border so the table ends flush with following prose.
- Links inside a registry table inherit `--color-text` and underline on hover or focus.
- Kit docs only. Product prose does not render inventory tables.
- Used in: components registry, patterns registry, voice registry.

Deep link: `demos/fundamental--accepted/index.html#lists`.

## Forbidden

- Any class not starting with `t-`, `card`, `field`, `button`, `tag`, `switch`, `sidebar`, `book`, `nav-group`, `inspector`, `comment`, `stat`, `swatch`, `app`, `preview-frame`, `registry-table`.
- Inline styles for tokens. Use `var(--token-name)`.
- New color, spacing, or radius values outside `tokens.json`.
- Drop shadows, glass, blur, gradients.
- Light weight (400 Book) and muted color on body or structural markers.
- Italics, ALL CAPS, Title Case.
- Em-dashes in headlines.
- Utility-class frameworks (Tailwind, Bootstrap, Bulma).

Additions run the evolve protocol. See `pipeline/protocols.md § Evolve`.

## Signoff

<!-- book__signoff at the tail of components.md. Stage 5 fills the stats, byline, timestamp, and signature. -->
````

## UI copy drafts

Every string the components book introduces, in one place. Stage 5 pastes these verbatim.

- Book title: "Components"
- Jobstory line: "Jobstory: when drilling from a pattern into its parts, find every foundation, component, and forbidden thing in one book with deep links into live examples, so we use kit vocabulary and never invent."
- Using-the-snippets caption: "Every HTML snippet below pastes into a kit page with `vars.css`, `style.css`, and `js/kit.js` loaded. Snippets do not stand alone — their job is to show the exact class structure a consumer copies into a kit-wrapped surface."
- Registry header row: "Class · Role · Deep link"
- Foundations opener: "Foundations are the six rule sets every component sits on top of. Each subsection carries the key rules and a pointer to the live inventory in the fundamental demo. Machine-readable source of truth is `tokens.json`."
- Type rhythm opener: "Space inside a group never exceeds space between groups. When that relation inverts, the eye mis-parses structure and the page reads wrong. Name: inner and outer theory."
- Typography registry header: "Class · Size · leading · weight · Use"
- Kit-doc primitives opener: "These two primitives render inside kit docs only. Product prose does not reach for them."
- Forbidden closer: "Additions run the evolve protocol. See `pipeline/protocols.md § Evolve`."
- Card pointer: "Every widget is a card. Transparent at rest, 3% on hover/focus/active. No borders. No shadows. Three variants share one HTML shape. Reach for a card whenever a widget groups a heading, body, and at most one primary action."
- Field pointer: "A label and a value sharing one row. No box, no outline. Reach for a field whenever a form needs to read as prose, not a boxed grid."
- Button pointer: "Full-width by default. 12 px radius. Bold label. Two variants. Reach for a button when the user needs to commit to an outcome."
- Tag pointer: "Metadata, not action. If it looks clickable, it is a button."
- Switch pointer: "Binary toggle. A switch flips a single setting on or off. Anything with three or more states is not a switch."
- Comment pointer: "Two shapes, one pattern. Draft (shout) and thread (interactive card with collapsible reveal). Lives in the inspector."
- Comment runtime pointer: "Runtime events, config keys, and consumer integration patterns: `docs/integration/comment.md`."
- Navigation pointer: "Sidebar nav with scroll-spy indicator. `sidebar__nav` wraps `nav-group` sections; `toc__indicator` animates between active items. Reach for the sidebar nav in any doc surface that carries more than three sections."
- Signoff pointer: "Canonical document ending. Stats + byline + handwritten signature SVG. Every doc ships signed."
- Spec list pointer: "The workhorse for key-value rows inside a card. Three shapes."
- List pointer: "Caption-sized hairlined list for prose or tabular data. Both `<ul>` (disc marker) and `<ol>` (decimal marker). Hairline separates each item from the next."
- Preview frame pointer: "Document-surface primitive for kit docs that embed component or pattern slices. The wrapper clips. The inner iframe renders at 400% and scales to 0.25."
- Registry table pointer: "Document-surface primitive for dense two-column inventories on kit registry pages. Resets browser table defaults, applies the kit's hairline border and text tokens."

## Deep links

Fifteen deep links into `demos/fundamental--accepted/index.html`. Every link resolves to an existing anchor. Four components have no dedicated anchor yet and point at the nearest parent — flagged below.

1. Material → `#color` (parent — no dedicated `#material` anchor; added backlog item for stage 5).
2. Color → `#color`.
3. Type → `#type`.
4. Space → `#space`.
5. Radii → `#cards` (parent — no dedicated `#radii` anchor; added backlog item).
6. Motion → `#motion`.
7. Typography utility classes → `#type`.
8. Card → `#cards`.
9. Field → `#fields`.
10. Button → `#buttons`.
11. Tag → `#tags`.
12. Switch → `#switches`.
13. Comment → `#stack` (parent — no dedicated `#comment` anchor; added backlog item).
14. Navigation → `#opening` (parent — the sidebar nav renders in the shell, not as a doc section; added backlog item).
15. Signoff → `#signoff`.
16. Spec list → `#lists` (parent — no dedicated `#spec-list` anchor).
17. List → `#lists`.
18. Preview frame → `#figures` (parent — no dedicated `#preview-frame` anchor; added backlog item).
19. Registry table → `#lists` (parent — no dedicated `#registry-table` anchor; added backlog item).

## Inventory check

Every class used in the snippets resolves to the kit. Verified against `skills/kk-design-system/manifesto.md § Components` + the fundamental demo:

- `.book`, `.book__part`, `.book__section`, `.book__spec`, `.book__spec-row`, `.book__spec-key`, `.book__spec-value`, `.book__spec--value`, `.book__spec--triple`, `.book__signoff`, `.book__signoff-stats`, `.book__signoff-signature`, `.book__signoff-signature-img`, `.book__intro` — renamed in lockstep from `.doc__*`. The rename is mechanical; every HTML snippet in this draft carries the renamed form.
- `.card`, `.card--interactive`, `.card--shout`, `.card--selectable`, `.card__heading`, `.card__collapsible`, `.card__collapsible-inner` — pass.
- `.field`, `.field--row`, `.field__label`, `.field__input`, `.field__fake-caret` — pass.
- `.button`, `.button--primary` — pass.
- `.tag`, `.tag--bold` — pass.
- `.switch`, `.switch__input`, `.switch__track`, `.switch__thumb`, `.switch__label` — pass.
- `.comment-new`, `.comment-thread`, `.comment-msg`, `.comment-stack`, `.comment__menu`, `data-message-id`, `data-author-role`, `data-archived`, `data-state` — pass.
- `.sidebar`, `.sidebar__nav`, `.sidebar__footer`, `.nav-group`, `.nav-group__items`, `.toc__indicator`, `.inspector`, `.app` — pass.
- `.stat` — pass.
- `.t-hero`, `.t-display`, `.t-display--medium`, `.t-body`, `.t-title`, `.t-subtitle`, `.t-caption`, `.t-caption--bold`, `.t-micro`, `.t-mono`, `.t-muted`, `.t-subtle`, `.t-list` — pass.
- `.preview-frame`, `.preview-frame__iframe`, `.registry-table` — pass.

**Flags.** Four missing anchors in `demos/fundamental--accepted/index.html` — Material, Radii, Comment, Preview frame, Registry table, Navigation, Spec list — deep link to nearest parent. Stage 5 logs a backlog item to add dedicated anchors in a future kit version. No invented class. No off-token literal. No broken rule.

**Lebedev check.** Zero attribution in the draft. "Inner and outer theory" appears as the concept name, defined in one sentence. No "Source:" line. No "Bureau" reference.

**`.doc` rename check.** Zero `.doc__*` occurrences in the draft HTML snippets. Every class renames to `.book__*` in lockstep with the direction doc.

**Comment runtime check.** The book carries kit-side rules (two shapes, kebab, approve gating, `data-message-id`, `data-author-role`, `data-archived`). Runtime payloads for `new`, `reply`, `delete`, `approve`, `archive` do not appear in the draft. One-line pointer to `docs/integration/comment.md` closes the §Comment section.

## Gate

Pending. 18/18 fresh-eyes questions answered. Stage 3c fresh-eyes post-designer runs next.

## Hand-off

`kk-role-fresh-eyes-jobstory` in post-designer mode for pattern block 3 — components. Input: this file + the 3a question list. Expected output: pass/fail per question with evidence pointing into this draft.
