---
session: 2026-04-25-wealthy-pipeline
stage: 4
role: ds-manager
input: 02-design-director.md + 5 × 03b-designer-<slug>.md + canon (manifesto / components / patterns / tokens) + demos/fundamental--accepted/index.html + 13 pattern slices
output: per-block component map, 4 canon corrections, build-order task split (18 pieces), inventory pass
gate: pass — stage 5 unblocked
---

Catalogued every kit class, variant, attribute, and `data-*` hook the five 03b hand-offs rely on. Cross-checked the kit demo for canonical markup. Resolved the two flagged items as pass-through with corrections. Split the build into 18 pieces ordered for the design engineer.

## Raw input

- `documentation/2026-04-25-wealthy-pipeline/02-design-director.md` — direction doc, five pattern blocks, exceptions register empty.
- `documentation/2026-04-25-wealthy-pipeline/03b-designer-strategy-doc-body.md`
- `documentation/2026-04-25-wealthy-pipeline/03b-designer-per-section-control.md`
- `documentation/2026-04-25-wealthy-pipeline/03b-designer-inspector-stage-card.md`
- `documentation/2026-04-25-wealthy-pipeline/03b-designer-inspector-comment-stack.md`
- `documentation/2026-04-25-wealthy-pipeline/03b-designer-signoff-shout-pending.md`
- Kit demo `demos/fundamental--accepted/index.html` (1082 lines).
- 13 pattern slices in `demos/fundamental--accepted/patterns/`.

## Canon corrections (must propagate to stage 5)

The 03b hand-offs answer every 3a question and pass 3c. Cross-checking against `demos/fundamental--accepted/index.html` and `demos/fundamental--accepted/patterns/*.html` surfaces four markup-detail mismatches between designer ASCII and kit demo. None are inventory drift; all are kit shape the engineer must follow verbatim.

### Correction 1 — inspector group heading uses `<header class="card card--heading">`, not `<h3 class="t-title">` inside a `card`

`demos/fundamental--accepted/patterns/inspector-group.html` line 18 ships:

```html
<section class="inspector__group">
  <header class="card card--heading">
    <h2 class="t-display">Tweak</h2>
  </header>
  ...
</section>
```

Designer ASCII in 03b-inspector-stage-card and 03b-inspector-comment-stack used `<h3 class="t-title">` inside a static `card`. Stage 5 ships the heading-card shape per the demo. The `card--heading` modifier is canon-by-demo (the modifier appears in `demos/fundamental--accepted/patterns/inspector-group.html`; the components.md registry lists `card`, `card--interactive`, `card--shout` and the modifiers section ships `card--heading` as the inspector-group heading variant).

For inspector-stage-card, the heading line `5 of 7 · Review` migrates from a card heading inside a card body to a `card--heading`-pattern wrapping the t-title. The supporting caption stays inside an interactive card below.

### Correction 2 — comment-thread resolved variant uses `data-resolved="true"` + `data-state="minimized"` (NOT `data-state="resolved"`)

`demos/fundamental--accepted/patterns/comment-thread-resolved.html` line 16 ships:

```html
<div class="card card--interactive comment-thread"
     data-resolved="true" data-state="minimized">
  <div class="comment-thread__preview">
    <div class="comment-thread__resolved">
      <span class="comment-thread__resolved-stamp t-caption">&check;</span>
      <span class="comment-thread__resolved-snippet t-caption">…</span>
      <span class="comment-thread__resolved-byline t-caption t-muted">…</span>
    </div>
  </div>
</div>
```

Designer 03b-inspector-comment-stack used `data-state="resolved"`. Correction: pair `data-resolved="true"` with `data-state="minimized"`. Sub-classes for the resolved row are kit-defined (`comment-thread__resolved`, `__resolved-stamp`, `__resolved-snippet`, `__resolved-byline`) and the check glyph is the HTML entity `&check;` (Unicode `✓` is also fine — the demo uses `&check;`).

### Correction 3 — comment-thread visible heading is `comment-thread__preview` (NOT `card__heading`)

`demos/fundamental--accepted/patterns/comment-thread.html` lines 17–47 ship the always-visible preview as `<div class="comment-thread__preview">` containing the first message + an ellipsis + the last message. The full message list lives below in `card__collapsible > card__collapsible-inner > comment-thread__list`.

Designer 03b-inspector-comment-stack used `card__heading` for the visible heading area. Correction: use `comment-thread__preview`. The thread is structurally:

```
.card.card--interactive.comment-thread
├─ .comment-thread__preview   ← always visible: first msg + ellipsis + last msg
│   ├─ .comment-msg (first)
│   ├─ .comment-thread__ellipsis
│   └─ .comment-msg (last; agent if present)
└─ .card__collapsible
    └─ .card__collapsible-inner
        ├─ .comment-thread__list  ← all messages
        └─ .field.comment-thread__reply  ← reply input
```

A thread with only one message renders only that message in `__preview` (no ellipsis, no last). Stage 5 mirrors this from the demo.

### Correction 4 — message author renders in `<div class="t-subtitle">` inside `.comment-msg__header` (NOT `t-caption--bold` byline)

`demos/fundamental--accepted/patterns/comment-thread.html` line 19–21 ships:

```html
<div class="comment-msg__header">
  <div class="t-subtitle">Sofia Hlazunova</div>
  <button class="comment__menu" type="button" aria-label="Message actions" aria-expanded="false">
    <span></span>
  </button>
</div>
<p class="t-caption">The tag row needs one more variant…</p>
```

Designer 03b used `<p class="t-caption--bold">` for the byline. Correction: author name is `t-subtitle` (18/24 Bold) inside `.comment-msg__header`, message body is `<p class="t-caption">` directly below the header.

### Approve action gate — `data-can-approve="true"` on the thread

`demos/fundamental--accepted/patterns/comment-thread.html` line 16 carries `data-can-approve="true"` on the thread root. The kebab popover always renders all four items (`comment__menu-item--approve`, Reply, Archive thread, Delete); the `data-can-approve` flag on the parent thread gates whether Approve is visible via CSS. Designer's intent (Approve only when last message is agent) maps to: consumer sets `data-can-approve="true"` on the thread when the last message in `comment-thread__list` carries `data-author-role="agent"`. Markup difference; same outcome.

### Two flagged items from 03b — resolved

| Flag | Verdict | Resolution |
|---|---|---|
| `book__signoff-stats` reused inside `card--shout` (novel parent context). | **Pass-through.** | The class is a stats-grid layout primitive. The kit lints class names, not parent context. The pre-sign shout uses `<dl class="book__spec book__signoff-stats">` per the designer's intent. The actual canonical signoff at `demos/fundamental--accepted/index.html#signoff` (line 821) shows the class inside `book__signoff` — the engineer mirrors the same grid markup inside the shout. |
| `comment-thread[data-state="resolved"]`. | **Pass-through with markup correction.** | See Correction 2. The kit supports the resolved state via `data-resolved="true"` + `data-state="minimized"`, not via `data-state="resolved"`. Engineer follows the demo verbatim. |

Neither flag forces a HALT. Stage 5 fires.

## Per-block component map

### Block 1 — strategy-doc-body

| Class / variant | Role | Kit demo anchor |
|---|---|---|
| `app[data-view="doc"]` | Outer shell, three-column layout. | `index.html § Three columns` (root demo body) + pattern slice `patterns/three-column-shell.html`. |
| `book` | Middle column wrapper. | `index.html` `<main class="book" id="doc">` (demo root). |
| `t-hero` | "Strategy for Sofia". 66/66 Bold 700. Once. | `index.html § type` (line 383). |
| `book__section` | Each top-level section. 5 instances: `#brief`, `#research-1`, `#strategy`, `#additional-notes`, `#signoff`. | `canon/patterns.md § Book structure` + every demo `<article class="book__section">`. |
| `t-display` | Section h2 headings. 5 instances. | `index.html § type` + every section's h2. |
| `t-display--medium` + `t-muted` | Strategy subtitle. 1 instance. | `index.html § type` (line 383+). |
| `t-title` | Strategy subsection h3 headings. 9 instances. | `index.html § cards` (card heading h3.t-title pattern). h3.t-title is canonical-by-silence (no h3-with-t-subtitle pairing rule violated). |
| `t-body` | Section intros + subsection prose. ~14 instances. | `index.html § type`. |
| `t-body` + `t-subtle` | Empty-state placeholders. | `canon/components.md § Type` + `canon/voice.md § Muted text` (subtle = placeholder). |
| `card` (static) | Brief frozen-record card. | `index.html § cards` (line 511). |
| `book__spec` | Brief inputs spec; Research sources spec. | `index.html § spec-list` (line 225) + pattern slice `patterns/spec-list.html`. |
| `book__spec-row` / `dt` / `dd` | Spec rows. | Same as above. |
| `highlight` | Inline selection mark. 0..N. | `canon/components.md § Foundations § Material` (flat-geometry box-shadow on `.highlight`). |

Cross-block (rendered in this block, owned elsewhere):

- Per-section-control card on `#research-1` and `#strategy` — block 2.
- `card--shout` (signoff) on `#signoff` — block 5.

### Block 2 — per-section-control

| Class / variant | Role | Kit demo anchor |
|---|---|---|
| `card` (static) | Wrapper. No `card--interactive` (no hidden content). | `index.html § cards` (static card example). |
| `card__heading` | Holds the count line. | Same. |
| `t-caption` | Count line text. | `index.html § type`. |
| `t-caption--bold` | Bold number inside count line. | Same. |
| `button` (secondary) × 2 | `[Redo section]` + `[Redo whole doc]`. Or research variant. | `index.html § buttons` (line 587). |
| `button.button--primary` | `[Improve in place]` (or research's `[Implement comments…]`). One per card. | Same. |
| `t-subtitle` (button label) | Kit-canonical pairing per `canon/components.md § Card`. | Same. |

Per-doc count: 2 cards rendered when threads > 0 — Research card + Strategy card. Card hides entirely when `data-thread-count="0"`. Brief and Additional notes do not get cards.

### Block 3 — inspector-stage-card

| Class / variant | Role | Kit demo anchor |
|---|---|---|
| `inspector` | Right column. | `canon/patterns.md § Three columns` + `index.html` `<aside class="inspector">`. |
| `inspector__group` | Wrapper. One group for the stage card. | Pattern slice `patterns/inspector-group.html` (full markup). |
| `header.card.card--heading` | **Group heading wrapper. Per Correction 1.** Holds h2.t-display "Review" with the position number inline. | `patterns/inspector-group.html` line 18. |
| `t-display` (h2) | Heading line. Holds `<span class="t-caption--bold">5 of 7</span> · Review` (or just "Review"). | Same. |
| OR `t-title` (h3) inside a regular `card` for the heading + caption pair | Alternate canonical shape: heading card uses h2.t-display when card--heading; if engineer prefers heading + caption inside one body, use static `card` with `card__heading > t-title + t-caption`. | `patterns/inspector-group.html` (interactive card heading shape). |

**Decision for stage 5:** use `<header class="card card--heading">` carrying `<h2 class="t-display">5 of 7 · Review</h2>`. The caption line ("9 open threads to resolve.") moves to a separate static `card` below the heading (still inside the same `inspector__group`). This honors the demo's group-heading shape AND keeps the caption on a distinct card.

Final structure:

```
<section class="inspector__group">
  <header class="card card--heading">
    <h2 class="t-display">
      <span class="t-caption--bold">5 of 7</span> · Review
    </h2>
  </header>
  <div class="card">
    <p class="t-caption">9 open threads to resolve.</p>
  </div>
</section>
```

Two cards, but the group reads as one composite indicator. Caption swaps copy for the empty / mixed states per 03b's variant table.

### Block 4 — inspector-comment-stack

This is the heaviest block. Markup MUST follow `demos/fundamental--accepted/patterns/comment-thread.html` and `comment-thread-resolved.html` verbatim.

| Class / variant | Role | Kit demo anchor |
|---|---|---|
| `inspector__group` | Wrapper for the comments group (separate group from the stage card). | `patterns/inspector-group.html`. |
| `header.card.card--heading` | Group heading carrying "Comments (7 open)". h2.t-display with the count inline. | `patterns/inspector-group.html` line 18. |
| `comments-group` | Inner wrapper around the thread cards. | Pattern slice `patterns/comments-group.html`. |
| `card.card--interactive.comment-thread[data-state="active|minimized"]` | Each thread card. | `patterns/comment-thread.html` line 16. |
| `[data-can-approve="true"]` | On thread when last message is agent-authored. **Per Correction 5.** | Same line. |
| `[data-resolved="true"]` + `[data-state="minimized"]` | Resolved variant. **Per Correction 2.** | `patterns/comment-thread-resolved.html` line 16. |
| `[data-archived="true"]` | Hidden via CSS. | `canon/components.md § Comment`. |
| `comment-thread__preview` | Always-visible heading area. **Per Correction 3.** | `patterns/comment-thread.html` line 17. |
| `comment-thread__ellipsis` | Three-dot separator inside preview between first + last messages. | Line 31. |
| `comment-thread__resolved` | Resolved row inside preview. | `patterns/comment-thread-resolved.html` line 18. |
| `comment-thread__resolved-stamp` | `&check;` glyph. | Line 19. |
| `comment-thread__resolved-snippet` | Snippet of approved text. | Line 20. |
| `comment-thread__resolved-byline` | Approver byline (t-muted). | Line 21. |
| `card__collapsible` + `card__collapsible-inner` | Body of active thread, holds list + reply. | Lines 48–95. |
| `comment-thread__list` | Full message list. | Line 50. |
| `comment-msg[data-message-id="m-XX"]` | Each message. | Lines 18, 51, 64, 77. |
| `comment-msg__header` | Holds author name + kebab. **Per Correction 4.** | Lines 19–22. |
| `<div class="t-subtitle">` (author) | Author name, 18/24 Bold. **Per Correction 4.** | Line 20. |
| `<button class="comment__menu">` | Kebab trigger. | Line 21. |
| `<p class="t-caption">` | Message body. | Line 23. |
| `[data-author-role="agent"]` | Agent message marker. | Line 34, 77. |
| `comment__menu-popover` | Popover carrying actions. | Line 24. |
| `comment__menu-item` × 4 | Approve / Reply / Archive thread / Delete. | Lines 25–28. |
| `comment__menu-item--approve` | Approve modifier. Hidden when thread lacks `data-can-approve`. | Line 25. |
| `field.comment-thread__reply` | Reply input row. | Line 91. |
| `field__input` | Textarea / input inside the reply field. | Line 92. |
| `field__fake-caret` | Placeholder caret (kit's `fake-caret-blink` keyframe). | Line 93. |
| `card.card--shout.comment-new` | Draft pinned during selection. | `canon/components.md § Comment` (Draft shape). |

The Approve handler is consumer-implemented per `canon/components.md § Comment`. Engineer wires:

- Click on `.comment__menu-item--approve` fires a custom event `kk:comment` with `action: "approve"`.
- Consumer listens and: replaces `<span class="highlight">` text in doc body with the agent message body; removes `highlight` class; sets `data-resolved="true"` + `data-state="minimized"` on the thread; rebuilds `comment-thread__preview` to use the resolved row.

### Block 5 — signoff-shout-pending

| Class / variant | Role | Kit demo anchor |
|---|---|---|
| `book__section[id="signoff"]` | Wrapper section at end of book. | `canon/patterns.md § Book structure`. |
| `card.card--shout` | The single book-column shout. | `index.html § cards` (line 511) + `canon/components.md § Card § Shout`. |
| `card__heading` | Holds the heading. | Same. |
| `t-title` (h2) | "Sign and deliver" heading text. | `index.html § cards`. |
| `dl.book__spec.book__signoff-stats` | Stats grid (two-stat shape). | `index.html § signoff` (line 811) + pattern slice `patterns/signoff.html`. |
| `stat` + `t-caption` | Two stat rows. | `index.html § signoff`. |
| `t-caption--bold` | Bold number inside each stat. | Same. |
| `ol.t-list` | Steps list. | `index.html § lists` (line 145) + pattern slice `patterns/spec-list.html` (or use `t-list` directly). |
| `t-caption.t-muted` | Operator line at bottom of shout. | `canon/voice.md § Muted text` (metadata). |
| `t-caption--bold` (in operator line) | Bolded operator name. | `index.html § type`. |
| `button.button--primary` | Sign action. | `index.html § buttons`. |
| `t-subtitle` (button label) | Kit pairing. | Same. |

The shout inverts surface (black bg, white text) per `card--shout`. All text + button + spec inside the shout inherit the inverted treatment automatically.

## Build order — task split

18 pieces. Easiest first, hardest last. The engineer ships each piece, saves to disk, the human can peek mid-build.

| # | Piece | Block | Deliverable | Demo anchor |
|---|---|---|---|---|
| 1 | Three-column shell | shell | `<div class="app" data-view="doc">` with empty `sidebar`, `book#doc`, `inspector`. Vars + style + kit.js wired. | `patterns/three-column-shell.html` |
| 2 | Sidebar TOC scaffold | shell | `<aside class="sidebar">` with `sidebar__nav#toc` + `toc__indicator` + 5 nav-groups (Strategy expanded with 9 items) + `sidebar__footer`. Empty hrefs first; ids land in piece 3. | `patterns/sidebar-nav.html` |
| 3 | Book hero + section frames | strategy-doc-body | `t-hero` "Strategy for Sofia" + 5 empty `book__section` shells with ids matching sidebar hrefs. | `patterns/book__section` (canon prose) + `index.html` root. |
| 4 | Brief section content | strategy-doc-body | `#brief` filled with h2.t-display + intro + static card with `book__spec` (4 rows). | `index.html § spec-list` (line 225). |
| 5 | Research section content | strategy-doc-body | `#research-1` filled with h2.t-display + intro + `book__spec` listing 12 sources. | Same. |
| 6 | Strategy section content | strategy-doc-body | `#strategy` filled with h2.t-display + t-display--medium subtitle + 9 × (h3.t-title + p.t-body) Russian prose. | `index.html § type`. |
| 7 | Additional notes section | strategy-doc-body | `#additional-notes` with h2.t-display + empty placeholder t-body.t-subtle. | Canon `voice.md § Muted text`. |
| 8 | Per-section-control card on Strategy | per-section-control | Static card under Strategy section with count line + 3 buttons (one primary). Imperative-verb labels per 03b copy. | `index.html § cards` + `§ buttons`. |
| 9 | Per-section-control card on Research | per-section-control | Same shape with research-variant button labels. | Same. |
| 10 | `[Redo whole doc]` confirm wiring | per-section-control | `window.confirm()` wired to the secondary button via JS. Copy from 03b. | n/a (browser API). |
| 11 | Inspector stage card | inspector-stage-card | `inspector__group` with `card--heading` (h2.t-display "5 of 7 · Review") + caption card below. | `patterns/inspector-group.html`. |
| 12 | Inspector comments group heading | inspector-comment-stack | Second `inspector__group` with `card--heading` (h2.t-display "Comments (7 open)"). | Same. |
| 13 | Single open `comment-thread` (active) | inspector-comment-stack | One thread fully populated: preview (first msg + ellipsis + last agent msg) + collapsible list (3 messages) + reply field. Author bylines via `comment-msg__header > t-subtitle` per Correction 4. | `patterns/comment-thread.html`. |
| 14 | Six minimized `comment-thread` cards | inspector-comment-stack | Six more threads, `data-state="minimized"`, each with one or two messages in `__preview`. | Same. |
| 15 | Two resolved threads | inspector-comment-stack | Two threads with `data-resolved="true"` + `data-state="minimized"` + `comment-thread__resolved` row inside `__preview`. Per Correction 2. | `patterns/comment-thread-resolved.html`. |
| 16 | `comment-new` draft pin | inspector-comment-stack | `card.card--shout.comment-new` ABOVE the comments group heading. Hidden by default; shown via JS when text selection in book column. Selection wraps in `<span class="highlight">`. | `canon/components.md § Comment § Draft`. |
| 17 | Approve / reply / archive wiring | inspector-comment-stack | Consumer JS for `kk:comment` action handler — Approve replaces highlight text in body, sets `data-resolved="true"` + `data-state="minimized"` on thread, rebuilds preview to resolved row. Reply commit disabled on whitespace. Archive sets `data-archived="true"`. | `canon/components.md § Comment` (events). |
| 18 | Signoff shout | signoff-shout-pending | `book__section#signoff` carrying single `card.card--shout` with heading + 2-stat grid + steps `<ol class="t-list">` + operator line + primary button. `window.confirm()` on click. | `patterns/signoff.html` + `index.html § signoff` + `index.html § cards § Shout`. |

Each piece compiles to a peek-able state. After piece 3, the page renders the doc shell. After piece 7, the doc reads top to bottom. After piece 11, the inspector shows the stage card. After piece 18, the slice is complete.

## Kit-demo references

Top-level anchors in `demos/fundamental--accepted/index.html`:

| Anchor | What it shows | Used by piece(s) |
|---|---|---|
| `#cards` (line 511) | Static / interactive / shout cards | 4, 8, 9, 11, 18 |
| `#fields` (line 561) | Field with label + input + fake caret | 13 |
| `#buttons` (line 587) | Primary + secondary | 8, 9, 18 |
| `#tags` (line 604) | Metadata pill | (none in this slice — no tags rendered) |
| `#comment` (line 753) | Comment shapes (draft + thread) | 13, 14, 15, 16 |
| `#navigation` (line 113) | Sidebar with scroll-spy | 2 |
| `#signoff` (line 811) | Signoff stats + signature | 18 |
| `#spec-list` (line 225) | book__spec variants | 4, 5 |
| `#lists` (line 145) | t-list ul / ol | 18 |
| `#type` (line 383) | Hero / display / body / title / subtitle / caption | 3, 6 |

Pattern slices in `demos/fundamental--accepted/patterns/`:

| File | Used by piece(s) |
|---|---|
| `three-column-shell.html` | 1 |
| `sidebar-nav.html` | 2 |
| `inspector-group.html` | 11, 12 |
| `comment-thread.html` | 13, 14 |
| `comment-thread-resolved.html` | 15 |
| `comments-group.html` | 12 |
| `signoff.html` | 18 |
| `spec-list.html` | 4, 5 |

## Inventory check

**Pass.** All components resolve to kit inventory. Two flagged items resolve as pass-through (with markup corrections for the engineer to apply per the kit demo). No exceptions claimed.

Direction doc § Exceptions: empty.

## Exceptions carried forward

**None.**

## Gate

Pass. Stage 5 fires.

## Hand-off

→ Stage 5, `kk-role-design-engineer`. Input: this file + every 03b designer hand-off + the kit demo + the pattern slices. Builds the 18 pieces in order, saves each to disk, runs `KK.refresh()` after structural changes per kit JS.

Output target: `demos/wealthy-pipeline/index.html` (or whatever path the engineer picks under `demos/`).
