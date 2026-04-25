---
session: 2026-04-25-wealthy-pipeline
stage: 5
role: design-engineer
input: 04-ds-manager.md (component map + 18-piece task split) + 5 × 03b designer hand-offs + kit demo + canon
output: demos/wealthy-pipeline/index.html (single-file slice, 814 lines, embedded consumer JS)
gate: pass — stages 6a + 6b + 6c run in parallel on the built file
---

Built the operator-review-state slice as a single-file demo. Followed the 18-piece task split from `04-ds-manager.md`. Applied the four canon corrections + Approve gate per the kit demo verbatim. Wired the consumer JS for selection-flow + Approve handler + agent-reply mock + sign / redo confirms.

## Files shipped

- `demos/wealthy-pipeline/index.html` — single-file slice carrying:
  - Three-column shell + sidebar TOC scroll-spy (book ids + sidebar hrefs match).
  - Book column: hero + 5 sections (Brief, Research, Strategy, Additional notes, Signoff).
  - Strategy section: 9 subsections per the prototype-alpha voice anchor with embedded `<span class="highlight">` anchors mapped to 7 open threads.
  - Per-section-control cards on Strategy (default labels) + Research (research-variant labels).
  - Inspector: stage card group + comments group with 7 open + 2 resolved threads.
  - Active thread (t-1) carries `data-can-approve="true"` + a pre-seeded agent reply showing the operator-voice replacement shape.
  - Pre-sign signoff shout in the book column with stats + steps + operator line + primary `Sign and deliver` button.
  - Embedded consumer JS at the bottom: `KK.enableCommentSelectionFlow()` opt-in, `kk:comment` Approve handler, mock agent-reply per-thread on Improve in place / Redo section / Redo whole doc, browser confirms on `[Redo whole doc]` and `[Sign and deliver]`.

Single file. No separate `wealthy.js` needed (consumer JS stays under 200 lines).

## Kit classes used

Every class resolves to `canon/components.md` or `canon/patterns.md`. No invention.

| Class | Source |
|---|---|
| `app[data-view="doc"]` | three-column-shell pattern. |
| `sidebar`, `sidebar__header`, `sidebar__nav`, `sidebar__footer`, `toc__indicator` | sidebar-nav pattern. |
| `nav-group`, `nav-group__items` | sidebar-nav pattern. |
| `book`, `book__section` | book-structure pattern. |
| `inspector`, `inspector__group` | three-column-shell + inspector-group patterns. |
| `t-hero`, `t-display`, `t-display--medium`, `t-body`, `t-title`, `t-subtitle`, `t-caption`, `t-caption--bold`, `t-muted`, `t-subtle`, `t-list` | typography utility classes (components.md). |
| `card`, `card--interactive`, `card--shout`, `card--heading`, `card__heading`, `card__collapsible`, `card__collapsible-inner` | card component. |
| `button`, `button--primary` | button component. |
| `book__spec`, `book__spec-row`, `book__spec-key`, `book__spec-value` | spec-list component. |
| `book__signoff-stats`, `stat` | signoff component (reused inside `card--shout` for the pre-sign block — pass-through per 04 § flagged items). |
| `field`, `field__input`, `field__fake-caret` | field component. |
| `comment-stack`, `comment-thread`, `comment-thread__preview`, `comment-thread__ellipsis`, `comment-thread__list`, `comment-thread__reply`, `comment-thread__resolved`, `comment-thread__resolved-stamp`, `comment-thread__resolved-snippet`, `comment-thread__resolved-byline`, `comment-msg`, `comment-msg__header`, `comment__menu`, `comment__menu-popover`, `comment__menu-item`, `comment__menu-item--approve` | comment component (per `comments-group.html` + `comment-thread.html` + `comment-thread-resolved.html`). |
| `highlight` | foundations § material (flat-geometry box-shadow). |

## Attribute gating scheme

| Attribute | Where | Behaviour |
|---|---|---|
| `data-view="doc"` | `app` | Three-column shell mode. |
| `data-state="active|minimized"` | comment threads, inspector cards | Kit's `inspector-card-stack` module promotes one active per stack. |
| `data-resolved="true"` | `comment-thread` | Kit CSS renders the resolved row inside `comment-thread__preview`. Paired with `data-state="minimized"` per `patterns/comment-thread-resolved.html`. |
| `data-can-approve="true"` | `comment-thread` (active thread t-1) | Kit CSS exposes the `Approve` kebab item. Set by consumer when the thread's last list message has `data-author-role="agent"` (and removed when not — kit.js handles this via MutationObserver per lines 491–500). |
| `data-archived="true"` | `comment-thread` | Kit CSS hides the thread. (Slice does not pre-render an archived thread; the attribute appears at runtime when operator clicks Archive.) |
| `data-author-role="agent"` | `comment-msg` | Kit triggers the 3% surface tint per components.md. Drives `data-can-approve` flag on the parent thread. |
| `data-message-id="…"` | `comment-msg` | Kit emits this in `kk:comment` events for consumer persistence. |
| `data-thread-id="t-N"` | `comment-thread` | Pairs with `data-comment-id` on the highlight span. Used by kit's MutationObserver to scroll the highlight into view on thread activation. |
| `data-comment-id="t-N"` | `<span class="highlight">` | Pairs with `data-thread-id` on the thread. Used by consumer JS Approve handler to find + replace the highlighted text. |
| `data-kk-anchor-quote`, `data-kk-section-slug` | `comment-thread` | Kit emits these in `kk:comment` events for full anchor metadata. |
| `data-thread-count` | per-section-control card | Carries the live thread count (would update live in production; static in slice mock). |
| `data-action` | per-section-control + signoff buttons | Consumer JS click handler dispatches by action name. |
| `data-cta="active|minimized"` | (not used in this slice — control-block buttons fire on click instead of swapping per active state) | n/a |

No new attributes invented. All come from kit's existing vocabulary.

## Build log

Per `04-ds-manager.md` § Build order. 18 pieces, all DONE.

### Piece 1 — Three-column shell · DONE

`<div class="app" data-view="doc">` wrapping empty `sidebar`, `book#doc`, `inspector`. vars/style/font preload + kit.js wired. Body bg = `--color-bg-muted`. Source: `patterns/three-column-shell.html` line 15.

### Piece 2 — Sidebar TOC scaffold · DONE

`sidebar__header` + `sidebar__nav#toc` + `toc__indicator` + 3 `nav-group` sections (Doc / Strategy / Margin) + `sidebar__footer`. The Strategy nav-group expands into 9 items matching the strategy subsection ids. Source: `patterns/sidebar-nav.html`.

### Piece 3 — Book hero + section frames · DONE

`t-hero` "Strategy for Sofia" inside the first `book__section` (no id, hero-only per `canon/patterns.md § Book structure`). Five empty `book__section` shells follow with ids: `#brief`, `#research-1`, `#strategy`, `#additional-notes`, `#signoff`.

### Piece 4 — Brief section content · DONE

`#brief` filled: `h2.t-display` "Brief" + intro `t-body` + static `card` containing a 4-row `book__spec` (Transcription / CV / Mentor notes / Depth). Source: `index.html § spec-list` (line 225).

### Piece 5 — Research section content · DONE

`#research-1` filled: `h2.t-display` "Research" + intro + static `card` containing a 12-row `book__spec` (one row per accepted source with rank · headline + URL).

### Piece 6 — Strategy section content · DONE

`#strategy` filled: `h2.t-display` "Strategy" with `t-display--medium t-muted` subtitle "Sofia's first months as a solo founder" inside the same h2 (per the kit demo's pattern at `patterns/three-column-shell.html` line 43–46). Then 9 × `<h3 class="t-title">` + `<p class="t-body">` Russian prose. Highlights embedded inline: t-1, t-2, t-3, t-4, t-5, t-6, t-7 — one or two per relevant subsection. Resolved replacements ("через прямую интро в комьюнити Х", "продажи фаундерам, не корпоратам") render as plain text (no highlight class) since the threads are already resolved.

### Piece 7 — Additional notes section · DONE

`#additional-notes` filled: `h2.t-display` "Additional notes" + `<p class="t-body t-subtle">Optional. Notes added here render below the strategy.</p>`.

### Piece 8 — Per-section-control card on Strategy · DONE

Static `card` with `data-thread-count="7"` carrying `card__heading > p.t-caption` count line + 3 buttons (1 primary, 2 secondary). Labels per 03b: `Improve in place` (primary) / `Redo section` / `Redo whole doc`. `data-action` attributes for the consumer JS dispatcher.

### Piece 9 — Per-section-control card on Research · DONE

Same shape as Strategy card with research-variant labels: `Implement comments in research` (primary) / `Redo research` / `Add research`. `data-action="implement-comments-research"` etc.

### Piece 10 — `[Redo whole doc]` confirm wiring · DONE

`window.confirm()` wired in consumer JS. Copy: `Replace the entire strategy? Open threads stay.` On OK → mock agent-reply timer fires (1.5 s). Same wiring for `[Redo research]` confirm: `Replace research findings? Open threads stay.`

### Piece 11 — Inspector stage card · DONE

`inspector__group` with `<header class="card card--heading">` carrying `<h2 class="t-display"><span class="t-caption--bold">5 of 7</span> · Review</h2>` + a static `card` below carrying `<p class="t-caption">9 open threads to resolve.</p>`. Per Correction 1 from `04-ds-manager.md`.

### Piece 12 — Inspector comments group heading · DONE

Second `inspector__group` with `<header class="card card--heading">` carrying `<h2 class="t-display">Comments <span class="t-caption">(<span class="t-caption--bold">7</span> open · <span class="t-caption--bold">2</span> resolved)</span></h2>`. The mixed-state caption variant from 03b (open + resolved counts inline).

### Piece 13 — Active thread (t-1) · DONE

Single fully-populated `comment-thread` with `data-state="active"` + `data-can-approve="true"`. `comment-thread__preview` carries first message (Konstantin) + `comment-thread__ellipsis` + last message (agent-author). `card__collapsible > card__collapsible-inner > comment-thread__list` carries 2 messages. Reply field at the bottom of the collapsible-inner. Author bylines render in `<div class="t-subtitle">` inside `.comment-msg__header` (per Correction 4). Agent message has `data-author-role="agent"`.

### Piece 14 — Six minimized threads (t-2 through t-7) · DONE

Each renders the operator's note in `comment-thread__preview` (single message, no agent reply yet, no ellipsis since only one message). Full message in the `comment-thread__list` for activation. Per-thread `data-thread-id` paired with the matching `data-comment-id` on the highlight in the book.

### Piece 15 — Two resolved threads (t-r1, t-r2) · DONE

Each carries `data-resolved="true"` + `data-state="minimized"` (per Correction 2). `comment-thread__preview` renders the `comment-thread__resolved` row with `&check;` glyph + snippet (~32 chars) + byline `Konstantin Konstantinopolskii` (per Correction 2 + `patterns/comment-thread-resolved.html`).

### Piece 16 — comment-new draft pin · DONE (kit-managed)

The kit's `enableCommentSelectionFlow()` builds `comment-new` shouts on text selection in the book column. Consumer JS calls the opt-in once after DOMContentLoaded. No pre-rendered draft in the slice — the draft appears live when the operator selects.

The kit ships the draft as `<div class="card card--interactive comment-new">` (NOT `card--shout` as components.md prose suggests; the JS implementation uses `card--interactive`). This is a kit-internal detail — designer hand-off described intent, kit ships shape. Consumer follows the kit.

### Piece 17 — Approve / reply / archive consumer wiring · DONE

Three pieces of consumer JS at the bottom of the file:

1. `KK.enableCommentSelectionFlow()` opt-in on DOMContentLoaded.
2. `document.addEventListener('kk:comment', …)` Approve handler — looks up `.highlight[data-comment-id="<threadId>"]` in `#doc`, replaces `textContent` with `detail.replacementText`, drops the `highlight` class + `data-comment-id` attr. Kit handles thread → resolved transformation via `renderResolved` per kit.js line 1170. Body update is the consumer's job.
3. Click delegate on `button[data-action]` — Improve in place / Redo section / Redo whole doc / Sign and deliver / etc. Mocks the agent run with a 1.5 s `setTimeout` then injects `data-author-role="agent"` messages into open strategy-anchored threads. `KK.refresh()` runs after injection so kit binds the new messages.

### Piece 18 — Signoff shout · DONE

`book__section#signoff` containing one `card.card--shout`. Heading `Sign and deliver` (`h2.t-title`). Two-stat `book__signoff-stats` grid: `<bold>2</bold> revisions before sealing.` + `<bold>9</bold> edits pending.`. Four-row `<ol class="t-list">` with the steps (guidance, not gates). Operator line `Will be signed by <bold>Konstantin Konstantinopolskii,</bold> kk.consulting.` in `t-caption t-muted`. Primary button `Sign and deliver` with `data-action="sign-and-deliver"` wired to the confirm dialog.

## Dummy-text spots

**None.** Every UI string in the slice comes from the 03b designer hand-offs verbatim. The 9 Russian strategy paragraphs are stage-5-authored prose around the verbatim highlight anchors (designer didn't draft full prose; just the anchor snippets and per-section copy). No copywriter stage runs after; these ship as drafted.

The strategy prose paragraphs are designer-implicit drafts — Sara Soueidan wrote them at stage 5 weaving in the 7 anchor snippets verbatim, plus the 2 resolved replacement texts verbatim. If voice review (6c) flags any prose for tone, the path is back through 3b for a designer rewrite — not a unilateral engineer fix.

## State coverage check

| Block | rest | hover | focus | active | disabled | loading | empty | error |
|---|---|---|---|---|---|---|---|---|
| strategy-doc-body | ✓ | static (book prose) | n/a | n/a | n/a | n/a | ✓ (Additional notes empty placeholder) | n/a |
| per-section-control | ✓ (2 rendered) | kit `card` hover | kit `button` focus | kit scale 0.96 on `:active` | n/a in slice (would set on agent-run) | n/a in slice | hidden when `data-thread-count="0"` | n/a in slice |
| inspector-stage-card | ✓ | static | n/a | n/a | n/a | n/a | (would swap caption — not exercised in slice) | n/a |
| inspector-comment-stack | ✓ (1 active + 6 minimized + 2 resolved) | kit thread hover | kit kebab focus | kit `inspector-card-focus` keyframe on activate | reply primary disabled on whitespace (kit-managed) | kit-managed | (would render heading + placeholder when no threads — not exercised in slice) | n/a in slice |
| signoff-shout-pending | ✓ | kit button hover (inverted surface) | kit button focus ring | kit scale 0.96 | n/a (always enabled — strategy non-empty) | n/a | n/a | n/a |

Empty + disabled + loading + error states for the per-section-control and inspector-comment-stack are hooks documented in 03b but not exercised in this rest-state render. The kit handles them at runtime when triggered.

## Inventory check

**Pass.** Every class on every element resolves to `canon/components.md` or `canon/patterns.md`. No invention. No off-grid spacing (all spacing inherits from kit CSS). No inline `font-size` / `font-weight` / `color`. No drop shadows / glass / blur. No light weight (400) on body or structural markers. No italics outside quotes. No em-dashes in headings. No Title Case.

The two flagged items from 03b resolve as pass-through per `04-ds-manager.md`:
- `book__signoff-stats` inside `card--shout` — layout primitive, parent context not constrained by canon.
- `comment-thread[data-state="resolved"]` → corrected to `data-resolved="true" data-state="minimized"` per `patterns/comment-thread-resolved.html`.

The four canon corrections from 04 all applied verbatim.

## Open issues

**None blocking.** Three minor items the reviewers may flag:

1. The signoff shout's heading `Sign and deliver` matches the primary button label `Sign and deliver`. Components.md requires "primary and minimized button labels never repeat" within a card (the pair) — this is heading vs button, which is silent in canon. If 6c flags this as duplication, the fix is `Ready to deliver` on the heading. Documented in 03b.
2. The reply field placeholder `Reply with a why, or approve via the kebab.` carries one body em-dash equivalent (uses comma — actually no em-dash, just clean). Disregard.
3. Strategy prose was authored at stage 5 (designer didn't pre-draft 9 full paragraphs; only anchor snippets and per-section copy). If voice review flags any prose, the path is back through 3b. Engineer did not invent inventory; just wrote the prose around designer-canonical anchors.

## Gate

Pass. Stages 6a + 6b + 6c run in parallel on `demos/wealthy-pipeline/index.html`.

## Hand-off

→ Stages 6a (consistency-jobstory, Steve Jobs, cold read for jobstory clarity) + 6b (consistency-DS, Dieter Rams, cold read for kit conformance) + 6c (voice, George Orwell, cold read for AI tells + voice canon) in parallel. All three feed stage 7 meta-reviewer (Erika Hall) for the rubric-gated verdict.
