---
session: 2026-04-25-wealthy-pipeline
stage: 6b
role: consistency-ds
input: demos/wealthy-pipeline/index.html (built prototype) + canon (manifesto, components, patterns, tokens)
output: per-block audit, 5 flags across 9 blocks
gate: feeds stage 7
---

Strict kit-pattern conformance audit. Read the built file against canon only. No upstream commentary.

## Raw input

- `demos/wealthy-pipeline/index.html` — the prototype.
- `manifesto.md` — full file.
- `canon/components.md` — full file.
- `canon/patterns.md` — full file.
- `tokens.json` — full file.

## Block — Sidebar (left column)

### Class resolution
Pass. Every class resolves: `sidebar`, `sidebar__header`, `sidebar__nav`, `sidebar__footer`, `toc__indicator`, `nav-group`, `nav-group__items`, `t-title`, `t-subtitle`, `t-caption`. The `sidebar__nav` carries the kit-canonical `id="toc"` for `toc__indicator` to bind to.

### Token compliance
Pass. No inline styles, no hex codes, no off-token references.

### Off-grid spacing
Pass. All spacing inherits from kit CSS.

### Pattern-language drift
Pass. The three-group structure with the h4 + ul pattern is canonical per `canon/components.md § Navigation` and `patterns/sidebar-nav.html`.

## Block — Hero (`book__section` first child of `.book`)

### Class resolution
Pass. `t-hero` on `<h1>` resolves canonically.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
**Flag.** `canon/patterns.md § Book structure` says "the first section is the hero section: h1 plus the intro paragraphs that frame the doc." This prototype's hero section carries only `<h1 class="t-hero">Strategy for Sofia</h1>` — no intro paragraphs. The kit demos at `patterns/three-column-shell.html` (lines 35–41) show the hero with `<p class="t-body">` paragraphs setting context. Bare hero is a deviation from the documented pattern.

Severity: low. The hero communicates the doc's subject; canon's reading is that the hero EARNS its weight by carrying a frame, not just a name. Without intro paragraphs the hero floats.

## Block — Brief section (`#brief`)

### Class resolution
Pass. `t-display`, `t-body`, `card`, `book__spec`, `book__spec-row`, `book__spec-key`, `book__spec-value` all resolve.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass. `canon/components.md § Spec list` — "Two-column: key + value" is the shipped shape, matching kit demo `index.html § spec-list` (line 225).

## Block — Research section (`#research-1`)

### Class resolution
**Flag.** The per-section-control card at the bottom of the section carries `<div class="card__heading"><p class="t-caption">2 threads</p></div>`. `card__heading` is documented in `canon/components.md § Card` as the wrapper for a heading + optional caption pair. The kit's demo at line 511+ and the pattern slice always show `card__heading` containing a heading rank element (`<h3 class="t-title">` or `<h2 class="t-display">`). Using `card__heading` with only a `<p class="t-caption">` and no heading rank is a deviation — the wrapper is named for what it holds, and what it holds here is not a heading.

The fix shape would be either:
- Add a heading rank: `<h3 class="t-title"><span class="t-caption--bold">2</span> threads</h3>`, or
- Drop the `card__heading` wrapper and let the count line render at card level: `<p class="t-caption">2 threads</p>` directly inside the `card`.

Severity: medium. The class name resolves but the semantic shape does not.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass on the source-list card. The control card carries the class-resolution flag above; otherwise the per-section-control composition (1 primary + 2 secondary buttons inside a static card) sits inside `canon/components.md § Card § Static card` rules ("a card whenever a widget groups a heading, body, and at most one primary action").

## Block — Strategy section (`#strategy`)

### Class resolution
**Flag.** Same `card__heading` + `<p class="t-caption">` issue as the research block — the strategy's per-section-control card uses `card__heading` without a heading rank element inside.

**Flag.** Strategy subsections use `<h3 class="t-title">`. Per `canon/components.md § Type § Typography utility classes` table, `t-title` is documented as "Card headings. Leading matches body — title and body lines share a vertical rhythm." The kit's canonical pattern for `t-title` is `<h3 class="t-title">` inside `card__heading`, NOT on body-level subsection headings. Body prose has no canon-documented h3 pairing — the kit demos exclusively use h2 + `t-display` for section headings, with no h3-rank body precedent.

Two reads of this drift:
- Permissive: `t-title` is the only body-rank Bold 700 type class besides `t-display`; using it on h3 in prose extends its scope but stays in inventory.
- Strict (this audit): `t-title` was designed for cards. Using it as a body-prose heading reaches outside the class's documented scope. The kit currently has no h3-prose pairing — that absence may be a kit gap, not a license to repurpose.

Severity: medium. The class is in inventory; the context is novel.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
**Flag.** Inline `<span class="highlight">` spans appear in the body. `canon/components.md § Foundations § Material § Flat-geometry box-shadow` says: "Used on `.highlight` to widen the mark beyond the text bounding box without breaking line rhythm." The class is canonical. However, the kit's documented use of `.highlight` ties it to a comment thread via `data-comment-id` matched against a thread's `data-thread-id` (per the comment-thread mechanic in `canon/components.md § Comment` and the runtime behaviour described in `kit.js` comment integration).

The prototype's highlights carry `data-comment-id` matching threads — which is canonical. Pass on the highlight class itself.

What flags: the highlight surface tint defaults to inverted (`--color-text` background, `--color-bg` text) per `canon/components.md § Foundations § Color` ("Selection renders inverted"). Inline highlights on body prose surface as inverted spans inside flowing text — visually loud per design, but with seven highlights across the strategy section, the doc carries a lot of inverted spans simultaneously. Canon does not forbid this, but `manifesto.md § Eighty/twenty` says "Empty space counts toward the 80%." Seven inverted spans crowd the noise budget.

Severity: low. Class is canonical; density is the question for the human, not for canon.

## Block — Additional notes section (`#additional-notes`)

### Class resolution
Pass. `t-display`, `t-body`, `t-subtle` all resolve.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass. `canon/components.md § Type` permits `t-subtle` for "Placeholders only." An empty-state placeholder line on body prose is in scope.

## Block — Signoff shout (`#signoff`)

### Class resolution
**Flag.** The shout's heading is `<h2 class="t-title">Sign and deliver</h2>`. `t-title` is documented as "Card headings. Leading matches body" — designed for h3 in cards per `canon/components.md § Card` snippet. Using `t-title` on h2 is novel pairing.

The closer canonical reading: an h2 inside a `card__heading` should pair with `t-display` (38/38 Bold 700) per the type scale. The pre-sign shout's heading is a card-level heading; the pairing should be h3 + t-title (per the card example) OR h2 + t-display (per the inspector-group `card--heading` example at `patterns/inspector-group.html` line 19). h2 + t-title is neither.

Severity: medium. The class is in inventory but rank-class pairing is non-canonical.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
**Flag.** `<dl class="book__spec book__signoff-stats">` is rendered inside `card.card--shout`. `canon/components.md § Signoff` documents `book__signoff-stats` as the stats grid wrapper INSIDE `book__signoff`:

> `book__signoff-stats` grids into three columns. Two or four `.stat` children are valid. Never three. … Used in: every book, every product deliverable.

The class is documented as part of the canonical Signoff component, with `book__signoff` as its parent. Using `book__signoff-stats` inside `card--shout` (a different component entirely) reaches across component boundaries. The class is in inventory; the parent context is not.

Two reads:
- Permissive: classes are kit linted by name, not by parent. The grid behaviour applies wherever the class lands.
- Strict (this audit): canon names the parent context as load-bearing — `book__signoff-stats` is a slot within `book__signoff`, not a free-roaming layout primitive.

Severity: medium. The parent-context contract is implicit in canon; this prototype reads against it.

## Block — Inspector stage card group (`inspector__group` #1)

### Class resolution
Pass. `inspector__group`, `card`, `card--heading`, `card__heading` (none in this block — the heading-card uses `card--heading` modifier directly), `t-display`, `t-caption`, `t-caption--bold` all resolve. The `card.card--heading` shape matches `patterns/inspector-group.html` line 18 verbatim.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
**Flag.** The composite uses TWO cards (one `card--heading` for the heading, one static `card` for the caption) for what reads as a single piece of metadata. `canon/components.md § Card`: "Reach for a card whenever a widget groups a heading, body, and at most one primary action."

The static card holding only `<p class="t-caption">9 open threads to resolve.</p>` carries no heading and no action — just a one-line caption. It does not group a heading + body + action; it holds half of one. The pattern slice at `patterns/inspector-group.html` shows `card--heading` followed by `card.card--interactive` cards with their own headings + bodies + buttons — not by stripped-down captions.

Severity: low. The composition reads but does not honour the card's documented job-shape (a card without a heading is half a card).

## Block — Inspector comments group (`inspector__group` #2)

### Class resolution
Pass. `card--heading`, `comment-stack`, `card.card--interactive.comment-thread`, `comment-thread__preview`, `comment-thread__ellipsis`, `comment-thread__list`, `comment-thread__reply`, `comment-thread__resolved`, `comment-thread__resolved-stamp`, `comment-thread__resolved-snippet`, `comment-thread__resolved-byline`, `comment-msg`, `comment-msg__header`, `comment__menu`, `comment__menu-popover`, `comment__menu-item`, `comment__menu-item--approve`, `field`, `field__input`, `field__fake-caret` all resolve. Markup matches `patterns/comment-thread.html`, `patterns/comment-thread-resolved.html`, `patterns/comments-group.html` verbatim.

`data-state="active|minimized"`, `data-resolved="true"`, `data-can-approve="true"`, `data-author-role="agent"`, `data-message-id`, `data-thread-id`, `data-kk-anchor-quote`, `data-kk-section-slug`, `data-archived` are all kit-canonical attributes.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass. The thread count `Comments (7 open · 2 resolved)` rendered inside the `card--heading` h2 is a stretch — the heading carries a parenthetical with two nested bold spans — but `canon/components.md § Type` does not forbid bold spans inside headings. The composition matches the kit demo's heading-card pattern.

The active thread is the only one carrying `data-can-approve="true"`, paired with an agent reply (`data-author-role="agent"`) as its last list message. Per `canon/components.md § Comment` rules, this is canonical — the consumer set the flag because the thread's last message is agent-authored.

## Summary

**Most flags:** Strategy section (3 flags — `card__heading` semantics, `t-title` on body h3, `.highlight` density) and Signoff shout (2 flags — h2 + `t-title` rank-class mismatch, `book__signoff-stats` outside `book__signoff` parent).

**Zero flags:** Sidebar, Brief, Additional notes, Comments group. All four read against canon cleanly.

Five distinct flags fed to stage 7:

1. **Hero** — bare `book__section` missing intro paragraphs per `canon/patterns.md § Book structure` (low severity).
2. **Research + Strategy control cards** — `card__heading` wraps a `<p class="t-caption">` count line with no heading rank element, against the wrapper's documented job (medium).
3. **Strategy subsections** — `t-title` on h3 in body prose; class is in inventory but documented as "card heading" scope (medium).
4. **Signoff shout heading** — h2 + `t-title` is a non-canonical rank-class pairing (medium).
5. **Signoff shout stats grid** — `book__signoff-stats` inside `card--shout` reaches outside its documented parent context `book__signoff` (medium).

No HALT. All flagged items use kit classes; the drift is in pairing, parent context, or composition shape, not in inventory invention. Stage 7 meta-reviewer routes any reiterate.
