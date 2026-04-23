---
session: 2026-04-22-wealthy-operator-alpha
stage: 4
role: designer-conservative
input: documentation/2026-04-22-wealthy-operator-alpha/03-concept-1.md (+ stage-3 gate amendments)
output: conservative hand-off — strict kit inventory, canonical three-column shell, no inventions
gate: pending — DS reviewer at stage 7
kit: v0.13.0 (Approve + Archive kebab actions, resolved-state visual, archive-hidden state, kk:comment approve/archive events)
---

# Conservative designer — Wealthy operator alpha

Stage 4, one of three parallel hand-offs on the Signed workshop direction (happy-path concept). Strict mode. Every class sourced from `components.md`. Every token from `tokens.json`. No reorganization beyond what `patterns/strategy-doc.md` and the canonical shell already allow.

## Raw input

Chosen direction: Signed workshop, spec in `02-art-director.md §Chosen direction`.
Chosen concept: happy-path walkthrough, spec in `03-concept-1.md` with stage-3 gate amendments.

Gate amendments carried verbatim into every design decision:

1. Comment threads in inspector render as a FLAT list. No grouping, no section-sort, no collapsible groups. Kit Comment pinned in order.
2. Regeneration scopes per section control block, ranked by frequency: `[Improve in place]` (default), `[Redo section]`, `[Redo whole doc]`.
3. Research control blocks carry: `[Implement comments in research]`, `[Redo research]` (confirm modal), `[+ Add research]` (additive, spawns `## Research N+1`, prompt seeded + operator-editable). Depth regulation deferred.
4. Comments are a context stream — all open comments across the doc with quoted anchors feed every regeneration. Research comments inform strategy. Strategy comments inform research redo.
5. Comment lifecycle: agent reply lands inside the thread, not in doc body. Three operator paths per thread — Approve (kebab action, replacement moves into doc body, thread collapses to resolved visual), Reject with written answer (operator reply, feeds next round), Leave unanswered (still feeds context). Archive kebab action hides thread, preserves `data-archived`.
6. Resolved + archived threads drop out of the context stream.
7. Kit v0.13.0 ships the Approve + Archive kebab actions, resolved-state visual, archive-hidden state, event payload. Background task owned by `kk-ds-maintainer`. Frontend engineer at stage 8 consumes the shipped version.

Prior-stage pointers:

- Direction spec: `documentation/2026-04-22-wealthy-operator-alpha/02-art-director.md §Chosen direction`.
- Concept spec: `documentation/2026-04-22-wealthy-operator-alpha/03-concept-1.md`.
- Pattern reference: `.claude/skills/kk-design-system/patterns/strategy-doc.md`.
- Component inventory: `.claude/skills/kk-design-system/components.md`.
- Tokens: `.claude/skills/kk-design-system/tokens.json`.

## Component list

Kit classes with counts per zone, enumerated for the two layouts the build carries — working (step 5 review state, the stage-8 slice) and delivered (step 7 steady state, for resort coherence).

### Shell (both layouts)

| Class | Count | Role |
|---|---|---|
| `app[data-view="doc"]` | 1 | Root three-column frame. |
| `sidebar` | 1 | Left column, map. |
| `sidebar__header` | 1 | Session header. |
| `sidebar__nav#toc` | 1 | Scroll-spy TOC container. |
| `toc__indicator` | 1 | Active-row pill. |
| `nav-group` | 2–4 | Grouped TOC sections (working: Working / Signoff; delivered: Strategy / Supporting). |
| `nav-group__items` | 2–4 | TOC lists. |
| `sidebar__footer` | 1 | Session metadata. |
| `doc#doc` | 1 | Middle column, territory. |
| `inspector` | 1 | Right column, margin. |
| `inspector__group` | 3 working / 3 delivered | Three pinned zones: stages, future-reserved (working) or delivered (delivered), threads (working) or edit-log (delivered). |

### Sidebar (working + delivered)

| Class | Count | Role |
|---|---|---|
| `t-title` | 1 | Header line "Strategy for Sofia". |
| `t-subtitle` | 2–4 | Nav-group headings. |
| `t-caption` | 7–11 | TOC row links. |
| `t-caption` in footer | 1 | Footer byline + run number. |

No custom sidebar classes. TOC relabel on resort = text swap inside existing `nav-group__items`. Scroll-spy handled by `KK.init()`'s scroll-spy module reading `.doc__section[id]` and moving `toc__indicator` — no new JS.

### Doc body — working layout

| Class | Count | Role |
|---|---|---|
| `t-hero` | 1 | "Strategy for Sofia". |
| `doc__section` | 5 | Brief, Research 1, Strategy, Additional notes, Signoff. |
| `t-display` | 5 | Section titles. |
| `t-display--medium` + `t-muted` | 5 | Section subtitles (job-story line per strategy-doc pattern). |
| `t-body` | 9 | Strategy subsection prose per prototype-alpha voice anchor. |
| `t-display--medium` (subsection heads, not muted) | 9 | Strategy subsection headings. |
| `card` (static) | 7 | Brief input card; Research 1 sources card; five control blocks (one per section that carries one). |
| `card__heading` | 6 | Inside every control block + brief input card. |
| `card.card--shout` | 1 | Signoff block (pending state). |
| `card__collapsible` | 1 | Signoff steps list inside the shout. |
| `card__collapsible-inner` | 1 | Padding wrapper for the collapsible. |
| `field.field--row` | 4 | Brief inputs: transcription picker, CV attach, mentor notes, depth switch row label. |
| `field__label` + `t-caption--bold` | 4 | Brief field labels. |
| `field__input` + `t-caption` | 3 | Brief text/file/select inputs. |
| `switch` | 1 | Depth toggle (shallow / deep). |
| `button.button--primary` + `t-subtitle` | 1 | Signoff `[Sign]` primary. Enabled once draft exists. |
| `button` + `t-subtitle` | 10 | Secondary buttons (see control-block detail below). |
| `tag` | 5 | Thread counts on control blocks (metadata, not action). |
| `doc__spec` | 2 | Research 1 source list; Signoff stats row. |
| `doc__spec-row` / `doc__spec-key` / `doc__spec-value` | per row | Spec rows. |
| `doc__signoff-stats` | 1 | Stats row inside signoff shout. |
| `stat` + `t-caption` | 3 | Revs · research hits · edits pending. |
| `t-caption--bold` (numerics inside stats) | 3 | Numerals. |
| `highlight` | 0–N | Text anchors inside body (one per open or resolved thread). Span injected by selection flow. |

Control blocks (seven in the maximal working layout — five listed above plus two reserved slots that stay empty in happy path: `## Brief` edit control + `## Additional notes` control). Each is a static `card` with a single row:

- `card > card__heading`: `<span class="tag">N threads</span>` (metadata) + three buttons.
- Three `button` + `t-subtitle` per control block:
  - `[Improve in place]` — default. One primary per block is forbidden (rule: one primary per card), so this is secondary; the primary slot stays empty because none of the three scopes outweighs the others enough to claim 80% weight. See Reasoning §Control block.
  - `[Redo section]`
  - `[Redo whole doc]`

Research 1 control block swaps the two right buttons for:
- `[Implement comments in research]` (default)
- `[Redo research]` (requires a destructive-confirm modal — see Behaviors §Confirm modal)
- `[+ Add research]` (spawns `## Research 2`)

### Doc body — delivered layout (post-sign resort)

| Class | Count | Role |
|---|---|---|
| `t-hero` | 1 | Title (carried across resort). |
| `doc__section` | 7 | Signed title block, Strategy, Research brief, Research, Additional notes, Way of work, Next steps. |
| `card` (static, for signed title block) | 1 | Top anchor. |
| `card__heading` | 1 | Signed block heading. |
| `doc__signoff-stats` + `stat` + `t-caption` + `t-caption--bold` | 1 / 3 / 3 / 3 | Filled stats. |
| `doc__signoff-signature` | 1 | Author line + signature SVG. |
| `doc__signoff-signature-img` | 1 | `signature.svg`. |
| `t-display` | 6 | Section titles. |
| `t-display--medium` | 9 | Strategy subsection heads. |
| `t-body` | 12+ | Body copy. |
| `doc__spec` | 1 | Consolidated research source list. |
| `doc__spec-row` / `doc__spec-key` / `doc__spec-value` | per row | Rows. |

No control blocks in delivered. No signoff shout (consumed by the flying-up resort into the signed title block).

### Inspector — working layout

| Class | Count | Role |
|---|---|---|
| `inspector__group` | 3 | Stages / future-reserved / threads. |
| `card` (static, stages) | 1 | Stages card. |
| `card__heading` | 2 | Stages card + future-reserved card. |
| `t-title` | 2 | Card headings. |
| `doc__spec` | 1 | Seven-row stage list (Brief, Research brief, Research, Strategy, Notes, Signoff, Delivered). Values are status glyphs: ✓ / ● / · in `t-caption`. |
| `card` (static, future-reserved) | 1 | Empty placeholder per concept rabbit-hole constraint. |
| `t-caption` + `t-muted` | 1 | Placeholder caption ("agent summary + clarifying questions — next version"). Metadata, so `t-muted` is permitted. |
| `comment-stack` | 1 | Flat thread list container. |
| `card.card--interactive.comment-thread` | 0–N | One per open thread. Flat list, no grouping. Default `data-state="minimized"`; clicking any expands, others collapse (kit inspector-card-stack rule). |
| `comment-thread__preview` | N | Two-message preview at minimized. |
| `comment-thread__ellipsis` | N | Count of hidden messages. |
| `comment-thread__list` | N | Full message list at active. |
| `comment-msg` (with `data-message-id`) | 2–M per thread | Messages. |
| `comment-msg__header` | M | Author + timestamp row. |
| `comment__menu` | M | Kebab trigger. |
| `comment__menu-popover` + `comment__menu-item` | M | Menu items: Reply, Delete, **Approve** (v0.13.0, on agent-proposal messages only), **Archive thread** (v0.13.0, on seed message only). |
| `field.comment-thread__reply` | N | Reply input row. |
| `field__input` + `t-caption` | N | Reply caret. |
| `card.card--interactive.card--shout.comment-new` | 0–1 | Draft pinned at top when operator has an active selection. Kit selection flow, `KK.enableCommentSelectionFlow()`. |

Resolved threads use the v0.13.0 resolved-state visual — the Comment component's built-in collapse to checkmark stamp + truncated replacement snippet. Archived threads carry `data-archived` and render `display: none` per v0.13.0.

### Inspector — delivered layout

| Class | Count | Role |
|---|---|---|
| `inspector__group` | 3 | Stages (read-only) / Delivered / Edit log. |
| `card` | 3 | Stages, Delivered status, Edit log. |
| `card__heading` | 3 | Headings. |
| `t-title` | 3 | Heading text. |
| `doc__spec` | 1 | Stage list (all ✓). |
| `t-caption` | 2+ | Share URL row + edit-log rows. |
| `button` + `t-subtitle` | 2 | `[Copy]` + `[Patch]` secondaries. |

One primary is deferred to post-patch flow (out of scope per concept No-gos). Both buttons render as secondary — no rule broken because `components.md` permits zero primaries per card (only forbids multiple).

### Inventory sanity — forbidden classes

Zero. No invented classes. Every class above appears in `components.md` or the canonical `index.html` markup for sidebar / doc / inspector / comment. No `field--invented`, no `doc__control-block` (the control block is a plain `card`, not a new class), no `card--resolved` (the v0.13.0 resolved state is a data attribute on the existing `comment-thread` card).

## Behaviors

Kit JS auto-wires on `DOMContentLoaded`. Consumer calls `KK.enableCommentSelectionFlow()` once after mount. No new modules.

### Sidebar — `sidebar__nav` + scroll-spy module

- Scroll-spy watches `.doc__section[id]` in `doc#doc`, moves `toc__indicator` to track the section whose top is above the fold anchor.
- On resort (sign click), doc reflows to delivered order. Scroll-spy naturally follows — no extra work. `KK.refresh()` fires after the DOM reorder so new sections register.
- TOC row text swaps synchronously with the resort endpoint ("Brief" → "Research brief"). Hard swap per concept rabbit-hole constraint. No cross-fade.

### Doc — column reveal + doc-scroll

- Column-reveal module runs once on load. Middle column scrolls; sidebar + inspector are fixed per kit pattern.
- Highlight `.highlight` spans click-promote the matching thread in the inspector stack (kit default — comment lifecycle module).

### Brief card — static `card` with `field` children

- Hover on each `field` row fills with 3% (`--color-surface-overlay`). Focus inverts (black surface, white text, white caret) per Foundation §color.
- Depth switch — kit `switch`, binary, no third state. Labels "shallow" / "deep" in `t-caption--bold`. No price annotation inside the switch — the `($20)` annotation lives as a `t-caption` + `t-muted` line outside the switch (metadata).
- One primary per card is required by `components.md`. Brief card's primary is `[Commit brief]` + `t-subtitle` (lives at the bottom of the same card). This promotes the brief to the collapsed state and advances stages-card.

### Control block — static `card`

- Static (not interactive) because the block has no hidden content — only three buttons in a row. Interactive-card rule: a card that only fires an action stays static.
- Three secondary buttons, no primary. Rationale: the three regeneration scopes are ranked by frequency, not signal weight. Elevating the default `[Improve in place]` to primary (button--primary) would visually claim 80% weight, but UX-amendment ranking is frequency-driven not hierarchy-driven. Keeping all three secondary preserves 80/20 discipline — the control block is 20% noise; doc body text is the 80% signal. If DS review rejects this on "one primary per card" soft-expectation, escalate to stage 7.
- `<span class="tag">N threads</span>` is metadata. If `N === 0`, render `0 threads` — no special empty-state component (concept No-gos §no loading skeletons carries over: no empty-state pantomime).
- Click `[Redo research]` opens a confirm modal. See §Confirm modal.
- Click `[+ Add research]` appends a new `## Research N+1` section after the last research section. Prompt seeded from operator's most recent selection quote + session intro summary. Renders inside that new section's `card` as a `field__input` + `t-caption` the operator edits before clicking the card's primary `[Commit research]` button.

### Signoff card — `card.card--shout`, pending state

- Shout variant inverts everything inside (black surface, white text) per `components.md`. One shout per column — the column here is the doc body; the only shout.
- `doc__signoff-stats` renders filled. `stat` rows show `3 revs`, `11 hits`, `0 edits pending` with `t-caption--bold` on numerics.
- `card__collapsible > card__collapsible-inner` holds the steps list — four `t-caption` rows.
- `[Sign]` = `button.button--primary` + `t-subtitle`. Enabled whenever at least one strategy subsection has text. Per concept rabbit-hole: steps are guidance, not gates. No step-check logic beyond the enable threshold.
- Click `[Sign]` fires the resort (see §Resort sequence).

### Inspector stages card — static `card` + `doc__spec`

- Seven rows, one per pipeline stage. Current row shows ● in `doc__spec-value`; past rows show ✓; future rows show · with `t-subtle`.
- No hover. Static informational.
- Clicking a past row does nothing (concept No-gos §no stage-back-navigation).

### Inspector future-reserved card — static `card`

- Renders headed + one `t-caption.t-muted` line. `t-muted` permitted because the content is metadata ("placeholder — next version"). The muted-by-default feedback rule exempts metadata.
- Zero logic.

### Inspector thread stack — `comment-stack` + `card.card--interactive.comment-thread`

- FLAT list. Order of insertion — first thread opened, first in the stack. No grouping, no section-sort. v0.13.0 resolved + archived threads reorder per the kit default (resolved sinks to bottom, archived hides — the kit owns this; amendment 5 applies).
- One-active-at-a-time rule via inspector card-stack module. Promoting a thread collapses siblings.
- Promoting on highlight click — kit's comment lifecycle module mirrors `data-state` from highlight to thread.
- Kebab popover ships v0.13.0 items (Approve + Archive thread). Approve is conditional on the menu's target message carrying `data-role="agent-proposal"` (frontend engineer stamps it at stage 8 when persisting agent replies). Archive is always on the seed message.
- Reply field uses the kit pattern — `field.comment-thread__reply` with `field__input` + `field__fake-caret`. On commit fires `kk:comment` with `action: 'reply'`.
- Approve click fires `kk:comment` with `action: 'approve'` per v0.13.0 event extension. Consumer intercepts and swaps the doc body's highlighted span text with the agent-proposal message body; thread transitions to resolved-state visual (kit-owned).

### Comment draft — `card.card--interactive.card--shout.comment-new`

- Pins at top of inspector when operator has an active selection. Kit default, `KK.enableCommentSelectionFlow()`.
- Range wraps in `.highlight` spans, stays selected for clipboard compatibility.
- Commit creates a `comment-thread` card below in the `comment-stack`; fires `kk:comment` with `action: 'new'` + anchor fields per `manifesto.md §Comment lifecycle events`.
- Escape clears the draft and the highlight spans.

### Confirm modal — `[Redo research]` only

`components.md` does not ship a modal component. The conservative path: render the confirm as a `card.card--shout` that inflates inside the research control block itself (inline, not a modal overlay). Text: "This replaces research 1. All accepted sources and comments scoped to research 1 will be lost." Two buttons: `[Redo research]` primary, `[Cancel]` secondary. Operator clicks primary → research section replaces; thread anchors scoped to research 1 archive automatically (per amendment 6).

If the DS reviewer flags the inline-shout as a modal replacement violation, escalate. The alternative is a new modal component — outside conservative's remit.

### Resort sequence — sign click

Doc-level reorder. Kit has no animation primitive for this, so the conservative path is a minimal two-step DOM reflow, no custom keyframes:

1. Sign click → kit's kebab-style state flip (kit JS does not own this; the engineer at stage 8 writes a ~20-line handler).
2. Doc sections re-parent in delivered order. Signoff shout card is removed from its position and a new `doc__section#signed-title` is inserted at top with filled stats + signature SVG. Control blocks detach. Research sections consolidate into one `## Research` with a combined `doc__spec`. Brief renames to Research brief (text swap).
3. `KK.refresh()` runs so scroll-spy rebinds to the new section set.
4. Sidebar TOC relabels via text swap (hard, synced to reflow endpoint).

Transition uses `--duration-slow` + `--ease-in-out` on section opacity only. No custom keyframes. No section-sliding. Concept rabbit-hole constraint: "one pass with kit transitions, no custom keyframes. If it reads rough, punt to stage-8 retro." Conservative accepts the rough read as the cost of strict discipline.

If the UX-driven or revolutionary designer proposes a richer resort, that is their territory.

### Kit JS modules used

- `scroll-spy` — TOC indicator.
- `narrow-view-toggle` — mobile column swap.
- `column-reveal` — initial animation.
- `inspector-card-stack` — one-active-at-a-time for threads.
- `comment-kebab-menus` — kebab popovers, v0.13.0.
- `3d-deck` — not used. No deck in this flow.
- `enableCommentSelectionFlow()` — operator calls once at mount.

`KK.refresh()` calls after the resort + after `[+ Add research]` inserts a new section.

## Flow ASCII

Seven steps carried from concept 1, promoted so every region carries its kit class or attribute. `═══text═══` = `.highlight` span. `●` = current stage. `✓` = past. `·` = future.

### Step 1 — Brief

```
+- sidebar -------+-- doc#doc -------------------------+-- inspector -----+
| sidebar__header | <t-hero> Strategy for Sofia        | inspector__group |
|  t-title        |                                    |  #stages         |
| sidebar__nav    | doc__section#brief                 |  card            |
|  toc__indicator | <t-display> Brief                  |   card__heading  |
|  nav-group      | <t-display--medium t-muted>        |    t-title       |
|   t-subtitle    |   Who are we helping?              |   doc__spec      |
|   nav-group__   | card                               |    Brief      ●  |
|    items        |  card__heading                     |    Rsrch br.  ·  |
|    t-caption    |   t-title  Input                   |    Research   ·  |
|    "Brief" ●    |   t-caption  Fill to start         |    Strategy  ·   |
|    "Rsrch br." ·|  field.field--row                  |    Notes     ·   |
|    "Research" · |   field__label t-caption--bold     |    Signoff   ·   |
|    "Strategy" · |    "Transcription"                 |    Delivered ·   |
|    "Notes"    · |   field__input t-caption           |                  |
|    "Signoff" ·  |    [Nelli call  v]                 | inspector__group |
| sidebar__footer | field.field--row                   |  #future         |
|  t-caption      |   "CV"       [attach]              |  card            |
|                 | field.field--row                   |   card__heading  |
|                 |   "Mentor notes"   [paste…]        |    t-title       |
|                 | field.field--row                   |     Future       |
|                 |   "Depth"  switch [shallow|●deep]  |   t-caption      |
|                 |   t-caption t-muted "$20"          |    t-muted       |
|                 |  button button--primary            |     (placeholder)|
|                 |   t-subtitle "Commit brief"        |                  |
|                 |                                    | inspector__group |
|                 | doc__section#signoff               |  #threads        |
|                 | card card--shout  (pending)        |  comment-stack   |
|                 |  card__heading                     |   (empty)        |
|                 |   t-title "Signoff"                |                  |
|                 |   t-caption t-muted "pending"      |                  |
|                 |  doc__signoff-stats                |                  |
|                 |   stat t-caption  0 revs           |                  |
|                 |   stat t-caption  0 hits           |                  |
|                 |   stat t-caption  0 pending        |                  |
|                 |  card__collapsible                 |                  |
|                 |   card__collapsible-inner          |                  |
|                 |    t-caption  1. Run research      |                  |
|                 |    t-caption  2. Draft strategy    |                  |
|                 |    t-caption  3. Resolve threads   |                  |
|                 |    t-caption  4. Read-through      |                  |
|                 |  button button--primary            |                  |
|                 |   t-subtitle [Sign] (disabled)     |                  |
+-----------------+------------------------------------+------------------+
```

### Step 5 — Review (the stage-8 slice)

```
+- sidebar -------+-- doc#doc -------------------------+-- inspector -----+
| sidebar__header | doc__section#strategy              | inspector__group |
|  t-title        | <t-display> Strategy               |  #stages         |
|  "Strategy for  | <t-display--medium t-muted>        |  card            |
|   Sofia"        |   Nine subsections, operator-read  |   doc__spec      |
| sidebar__nav    | <t-display--medium> Что обсудили   |    Brief      ✓  |
|  "Brief"      ✓ | <t-body> text…                     |    Rsrch br.  ✓  |
|  "Rsrch br."  ✓ | <t-display--medium> Точка А        |    Research   ✓  |
|  "Research"   ✓ | <t-body> text…                     |    Strategy   ✓  |
|  "Strategy"   ✓ | <t-display--medium> Точка Б        |    Notes      ✓  |
|   "Обсудили"    | <t-body> text…                     |    Signoff    ●  |
|   "Точка А"     | <t-display--medium> Видение        |    Delivered  ·  |
|   "Точка Б"     | <t-body> text…                     |                  |
|   "Видение"     | <t-display--medium> Позиционир-е   | inspector__group |
|   "Позицион-е"  | <t-body> ═══redrafted text═══      |  #future         |
|   "Гипотезы"    | <t-display--medium> Гипотезы       |  card            |
|   "Рынок"       | <t-body> text…                     |   t-caption      |
|   "Шаги"        | <t-display--medium> Рынок          |    t-muted       |
|   "Как работ-м" | <t-body> text…                     |    (placeholder) |
|  "Notes"      · | <t-display--medium> Ближайшие шаги |                  |
|  "Signoff"    ● | <t-body> text…                     | inspector__group |
| sidebar__footer | <t-display--medium> Как работаем   |  #threads        |
|                 | <t-body> text…                     |  comment-stack   |
|                 |                                    |   card card--    |
|                 | card  (control block)              |    interactive   |
|                 |  span.tag "1 thread"               |    comment-thread|
|                 |  button "Improve in place"         |    (resolved ✓,  |
|                 |  button "Redo section"             |     @Позицион-е) |
|                 |  button "Redo whole doc"           |                  |
|                 |                                    |                  |
|                 | doc__section#notes                 |                  |
|                 | <t-display> Additional notes       |                  |
|                 | <t-body> (empty — operator skips)  |                  |
|                 |                                    |                  |
|                 | doc__section#signoff               |                  |
|                 | card card--shout                   |                  |
|                 |  doc__signoff-stats                |                  |
|                 |   stat  2 revs                     |                  |
|                 |   stat  11 hits                    |                  |
|                 |   stat  0 edits pending            |                  |
|                 |  card__collapsible                 |                  |
|                 |   card__collapsible-inner          |                  |
|                 |    t-caption  1. ✓                 |                  |
|                 |    t-caption  2. ✓                 |                  |
|                 |    t-caption  3. ✓                 |                  |
|                 |    t-caption  4. Read-through ●    |                  |
|                 |  button button--primary            |                  |
|                 |   t-subtitle  [Sign] (enabled)     |                  |
+-----------------+------------------------------------+------------------+
```

### Step 6 — Sign + resort transition

```
+- sidebar -------+-- doc#doc -------------------------+-- inspector -----+
| (relabeling…)   | <t-hero> Strategy for Sofia        | inspector__group |
|  Strategy    ✓  | doc__section#signed-title          |  #stages         |
|  Rsrch br.   ✓  |  card                              |   doc__spec      |
|  Research    ✓  |   card__heading                    |    Brief      ✓  |
|  Notes       ·  |    t-title "Strategy for Sofia"    |    …          ✓  |
|  Way of w.   ·  |    t-caption t-muted               |    Delivered  ●  |
|  Next steps  ·  |     "by Konstantin · 2026-04-22"   |                  |
|                 |   doc__signoff-stats               | (resort fades    |
|                 |    stat  2 revs                    |  future-reserved |
|                 |    stat  11 hits                   |  into Delivered  |
|                 |    stat  0 pending                 |  card; threads   |
|                 |   doc__signoff-signature           |  dormant)        |
|                 |    t-caption "Signed by …"         |                  |
|                 |    img doc__signoff-signature-img  |                  |
|                 |                                    |                  |
|                 | doc__section#strategy (slides up)  |                  |
|                 | doc__section#research-brief (slide)|                  |
|                 | doc__section#research (consolidate)|                  |
|                 | (control blocks fade out)          |                  |
+-----------------+------------------------------------+------------------+
```

### Step 7 — Delivered

```
+- sidebar -------+-- doc#doc -------------------------+-- inspector -----+
| sidebar__header | doc__section#signed-title          | inspector__group |
|  "Strategy for  |  card                              |  #stages         |
|   Sofia"        |   card__heading                    |   card           |
| sidebar__nav    |    t-title                         |    doc__spec     |
|  nav-group      |     "Strategy for Sofia"           |     all ✓        |
|   "Strategy"  ● |    t-caption t-muted               |     Delivered ●  |
|    "Обсудили"   |     "by Konstantin · date"         |                  |
|    "Точка А"    |   doc__signoff-stats               | inspector__group |
|    "Точка Б"    |    stat  2 revs                    |  #delivered      |
|    "Видение"    |    stat  11 hits                   |   card           |
|    "Позицион-е" |    stat  0 pending                 |    card__heading |
|    "Гипотезы"   |   doc__signoff-signature           |     t-title      |
|    "Рынок"      |    t-caption "Signed by…"          |      "Delivered" |
|    "Шаги"       |    img signature.svg               |    t-caption     |
|    "Как работ-м"|                                    |     share URL    |
|  nav-group      | doc__section#strategy              |    button        |
|   "Supporting"  |  t-display "Strategy"              |     t-subtitle   |
|    "Rsrch br."  |  (9 subsections)                   |     "Copy"       |
|    "Research"   |                                    |    button        |
|    "Notes"      | doc__section#research-brief        |     t-subtitle   |
|    "Way of work"|  t-display "Research brief"        |     "Patch"      |
|    "Next steps" |  t-body (operator Brief, renamed)  |                  |
| sidebar__footer |                                    | inspector__group |
|                 | doc__section#research              |  #edit-log       |
|                 |  t-display "Research"              |   card           |
|                 |  doc__spec  11 sources             |    card__heading |
|                 |                                    |     t-title      |
|                 | doc__section#additional-notes      |      "Edit log"  |
|                 | doc__section#way-of-work           |    t-caption     |
|                 | doc__section#next-steps            |     (none)       |
+-----------------+------------------------------------+------------------+
```

Steps 2 / 3 / 4 omitted — same shell, incremental content. Concept `03-concept-1.md §ASCII flows` is load-bearing for those and carries kit-consistent content. No reshape between steps 1 → 5; only content additions into `doc#doc`.

## Component trees

Block level, kit classes only. Verified against `components.md`.

### Working-review state (step 5, the stage-8 slice)

```json
{
  "app[data-view=doc]": {
    "sidebar": [
      "sidebar__header.t-title",
      {
        "sidebar__nav#toc": [
          "toc__indicator",
          {
            "nav-group": [
              "t-subtitle",
              { "nav-group__items": ["t-caption", "t-caption", "t-caption"] }
            ]
          },
          {
            "nav-group": [
              "t-subtitle",
              { "nav-group__items": ["t-caption", "t-caption"] }
            ]
          }
        ]
      },
      "sidebar__footer.t-caption"
    ],
    "doc#doc": [
      "t-hero",
      {
        "doc__section#brief": [
          "t-display",
          "t-display--medium.t-muted",
          {
            "card": [
              { "card__heading": ["t-title", "t-caption"] },
              { "field.field--row": ["field__label.t-caption--bold", "field__input.t-caption"] },
              { "field.field--row": ["field__label.t-caption--bold", "field__input.t-caption"] },
              { "field.field--row": ["field__label.t-caption--bold", "field__input.t-caption"] },
              { "field.field--row": ["field__label.t-caption--bold", "switch", "t-caption.t-muted"] },
              "button.button--primary.t-subtitle"
            ]
          }
        ]
      },
      {
        "doc__section#research-1": [
          "t-display",
          "t-display--medium.t-muted",
          { "card": [{ "doc__spec": ["doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row"] }] },
          {
            "card": [
              "tag",
              "button.t-subtitle",
              "button.t-subtitle",
              "button.t-subtitle"
            ]
          }
        ]
      },
      {
        "doc__section#strategy": [
          "t-display",
          "t-display--medium.t-muted",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body",
          {
            "card": [
              "tag",
              "button.t-subtitle",
              "button.t-subtitle",
              "button.t-subtitle"
            ]
          }
        ]
      },
      {
        "doc__section#additional-notes": [
          "t-display",
          "t-display--medium.t-muted",
          "t-body"
        ]
      },
      {
        "doc__section#signoff": [
          {
            "card.card--shout": [
              { "card__heading": ["t-title", "t-caption.t-muted"] },
              { "doc__signoff-stats": [
                { "stat.t-caption": ["t-caption--bold"] },
                { "stat.t-caption": ["t-caption--bold"] },
                { "stat.t-caption": ["t-caption--bold"] }
              ] },
              {
                "card__collapsible": [
                  { "card__collapsible-inner": [
                    "t-caption", "t-caption", "t-caption", "t-caption"
                  ] }
                ]
              },
              "button.button--primary.t-subtitle"
            ]
          }
        ]
      }
    ],
    "inspector": [
      {
        "inspector__group": [
          {
            "card": [
              { "card__heading": ["t-title"] },
              { "doc__spec": ["doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row"] }
            ]
          }
        ]
      },
      {
        "inspector__group": [
          {
            "card": [
              { "card__heading": ["t-title"] },
              "t-caption.t-muted"
            ]
          }
        ]
      },
      {
        "inspector__group": [
          {
            "comment-stack": [
              {
                "card.card--interactive.comment-thread[data-state=minimized]": [
                  {
                    "comment-thread__preview": [
                      {
                        "comment-msg[data-message-id]": [
                          { "comment-msg__header": ["t-caption", "comment__menu"] },
                          "t-caption",
                          {
                            "comment__menu-popover": [
                              "comment__menu-item.t-caption",
                              "comment__menu-item.t-caption",
                              "comment__menu-item.t-caption"
                            ]
                          }
                        ]
                      },
                      "comment-thread__ellipsis",
                      {
                        "comment-msg[data-message-id][data-role=agent-proposal]": [
                          { "comment-msg__header": ["t-caption", "comment__menu"] },
                          "t-caption",
                          {
                            "comment__menu-popover": [
                              "comment__menu-item.t-caption",
                              "comment__menu-item.t-caption",
                              "comment__menu-item.t-caption"
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "card__collapsible": [
                      { "card__collapsible-inner": [
                        { "comment-thread__list": ["comment-msg", "comment-msg"] },
                        { "field.comment-thread__reply": ["field__input.t-caption", "field__fake-caret"] }
                      ] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Delivered state (step 7)

```json
{
  "app[data-view=doc]": {
    "sidebar": [
      "sidebar__header.t-title",
      {
        "sidebar__nav#toc": [
          "toc__indicator",
          {
            "nav-group": [
              "t-subtitle",
              { "nav-group__items": ["t-caption", "t-caption", "t-caption", "t-caption", "t-caption", "t-caption", "t-caption", "t-caption", "t-caption"] }
            ]
          },
          {
            "nav-group": [
              "t-subtitle",
              { "nav-group__items": ["t-caption", "t-caption", "t-caption", "t-caption", "t-caption"] }
            ]
          }
        ]
      },
      "sidebar__footer.t-caption"
    ],
    "doc#doc": [
      "t-hero",
      {
        "doc__section#signed-title": [
          {
            "card": [
              { "card__heading": ["t-title", "t-caption.t-muted"] },
              { "doc__signoff-stats": [
                { "stat.t-caption": ["t-caption--bold"] },
                { "stat.t-caption": ["t-caption--bold"] },
                { "stat.t-caption": ["t-caption--bold"] }
              ] },
              { "doc__signoff-signature": ["t-caption", "doc__signoff-signature-img"] }
            ]
          }
        ]
      },
      {
        "doc__section#strategy": [
          "t-display",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body",
          "t-display--medium", "t-body"
        ]
      },
      { "doc__section#research-brief": ["t-display", "t-body"] },
      { "doc__section#research": ["t-display", { "doc__spec": ["doc__spec-row"] }] },
      { "doc__section#additional-notes": ["t-display", "t-body"] },
      { "doc__section#way-of-work": ["t-display", "t-body"] },
      { "doc__section#next-steps": ["t-display", "t-body"] }
    ],
    "inspector": [
      {
        "inspector__group": [
          {
            "card": [
              { "card__heading": ["t-title"] },
              { "doc__spec": ["doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row", "doc__spec-row"] }
            ]
          }
        ]
      },
      {
        "inspector__group": [
          {
            "card": [
              { "card__heading": ["t-title"] },
              "t-caption",
              "button.t-subtitle",
              "button.t-subtitle"
            ]
          }
        ]
      },
      {
        "inspector__group": [
          {
            "card": [
              { "card__heading": ["t-title"] },
              "t-caption"
            ]
          }
        ]
      }
    ]
  }
}
```

## Reasoning

One paragraph per non-trivial choice. Each tied back to manifesto, components, or pattern.

### Canonical three-column shell, no deviation

Stage-3 gate amendment 1 and the `patterns/strategy-doc.md §Shell` both nail the three-column frame. The concept chose this over every iteration-1 experiment. Conservative role obeys without elaboration: `app[data-view="doc"]` + `sidebar` + `doc` + `inspector`. Any deviation is territory for stages 5 or 6.

### Inspector is three `inspector__group` zones stacked, matched to the concept

Concept 1 prescribes stages card on top, future-reserved placeholder middle, thread stack below. The kit's `inspector__group` is the canonical container used in `index.html` for the inspector's own sections. No invention. The future-reserved group carries a labeled empty `card` — concept's rabbit-hole constraint. `t-muted` is permitted here because the caption is explicit metadata per manifesto's muted-exemption for bylines, placeholders, and metadata.

### Control block is a static `card`, not a new component

Stage-3 amendment 2 introduces three-action regeneration scopes. The conservative response is to render them in a plain static `card` — single row, three `button` children, one `tag` for the thread count. `components.md` explicitly permits a `card` with no heading when the direct children include `<p>`, `<ol>`, `<ul>`, `<dl>`; a row of `<button>` elements is functionally analogous and lands on the card's 24px rail. A new `doc__control-block` class would be invention; this is composition.

### No primary button inside the control block

`components.md` requires "one primary per card" phrased as an inventory rule plus an 80/20 reading: the primary CTA gets 80% weight. Amendment 2 ranks the three scopes by frequency (`[Improve in place]` default), not by hierarchy. Elevating the default to primary would overstate its signal weight — the operator's next action after reading a section is usually no-op (the draft is good) — so 20% of the time they reach for any of the three. Rendering all three as secondary preserves 80/20 at the section scale: the doc-body prose is 80%, the control block is 20%, and inside that 20% the three options split evenly. Flagging this for DS review because it may read as a soft-rule friction.

### Research control block mirrors strategy control block shape, different verbs

Amendment 3 names three research actions. Same `card` + three `button` shape keeps visual consistency — operator learns one pattern, applies it twice. `[+ Add research]` is additive (spawns section), `[Redo research]` is destructive (replace — requires confirm), `[Implement comments in research]` is the in-place default matching strategy's `[Improve in place]`. The shape alignment is 80/20 applied to learning cost — one pattern, two deployments.

### Confirm for `[Redo research]` inline, not modal

`components.md` ships no modal. A conservative hand-off may not invent one. Path of least invention: render the confirm as an inline `card.card--shout` that inflates inside the research control block — `shout` is the kit's "this matters, pay attention" affordance; one shout per column is fine because the signoff shout lives in doc body and this confirm only renders transiently on click. Acceptable stretch, but flag for DS review because "inline expanding shout" reads as modal-substitute rather than confirm-substitute. If the reviewer rejects, escalate to the revolutionary designer — modal is a new component.

### Signoff as the single shout in doc body

`components.md §Card` limits one shout per column. The signoff is the doc body's moment-that-matters — it's where the work becomes a signed artifact. The brief-input card, research source card, and control blocks are all static. The `[Sign]` button-primary lives inside the shout, not as a standalone sibling, so the shout owns the 80% visual weight of the whole signoff zone.

### Flat thread stack, no grouping, v0.13.0 behaviors

Amendment 1 is explicit: flat list, insertion order. Amendment 5 lists three lifecycle paths (Approve, Reject with reply, Leave) + Archive; v0.13.0 ships Approve + Archive kebab items. Conservative leans on the shipped kit — no custom grouping logic, no section-sort JS. The kit owns resolved + archived state transitions. Consumer writes one `kk:comment` listener that handles `action: 'approve'` by replacing the anchor text in doc body with the agent-proposal message body. Out-of-scope for design, but named here so the stage-8 engineer knows the data flow.

### Inspector stages card = `card` + `doc__spec`

Seven rows, key=stage name, value=glyph (✓ / ● / ·). `doc__spec` is the workhorse for key-value rows inside a card per `components.md §Spec list`. No new table component, no timeline visual (timeline was iteration-2 direction 3, rejected for conservative's scope — picked direction is Signed workshop, not Timeline-native).

### No sign-step enforcement logic

Concept rabbit-hole: "Keep [Sign] enabled whenever draft exists." The steps list inside the shout is guidance only. Conservative wires the enable threshold (has at least one strategy subsection text) and no further gating. The four step rows render as plain `t-caption` — no checkbox component, no progress bar.

### Resort on sign uses only kit transitions

Concept rabbit-hole: "one pass with kit transitions, no custom keyframes." Conservative accepts the rough read. `--duration-slow` (320ms) + `--ease-in-out` on section opacity. No section-sliding. The engineer reorders DOM nodes and calls `KK.refresh()`. If reviewer wants the dramatic flight-to-top animation from the concept, that is UX-driven's territory (may reorganize within kit rules) or revolutionary's (may propose a new motion token).

### `[+ Add research]` seed prompt renders as a `field__input`

Amendment 3 requires the additive research section to spawn with a prompt seeded from operator's note + session intro summary, editable before commit. The kit's field component covers this exactly — `field__input + t-caption + field__fake-caret` — and the new research section wraps the input in a `card` with a `[Commit research]` primary. Matches the brief card shape — same learning pattern.

### Highlight spans, comment selection flow opt-in

`manifesto.md §Runtime` names `KK.enableCommentSelectionFlow()` as opt-in. The consumer (Wealthy) owns English text and wants the default flow — call it once at mount. Highlights render as `.highlight` spans. Kit's comment module mirrors `data-state` between highlight and thread on click. Zero new JS.

### Caveman protocol does not apply to this document

`pipeline.md §Agent communication protocol` governs agent-to-user conversation. `voice.md` governs rendered document prose. This file is a rendered designer hand-off — voice rules apply, not caveman. ASCII and JSON blocks are untouched by either. The conversation return above this file DOES render caveman per skill contract.

## Inventory check

Every class in the component list and component trees resolves to `components.md` or the canonical `index.html`. No exceptions.

- Typography: `t-hero`, `t-display`, `t-display--medium`, `t-body`, `t-title`, `t-subtitle`, `t-caption`, `t-caption--bold`, `t-micro`, `t-mono`, `t-muted`, `t-subtle`. ✓ All in `components.md §Typography utility classes`.
- Card: `card`, `card--interactive`, `card--shout`, `card__heading`, `card__collapsible`, `card__collapsible-inner`, `data-state="active"|"minimized"`, `data-cta="active"|"minimized"`. ✓ `components.md §Card`.
- Field: `field`, `field--row`, `field__label`, `field__input`, `field__fake-caret`. ✓ `components.md §Field`.
- Button: `button`, `button--primary`. ✓ `components.md §Button`.
- Tag: `tag`, `tag--bold`. ✓ `components.md §Tag`.
- Switch: `switch`. ✓ `components.md §Switch` + `index.html#switch`.
- Comment: `comment-stack`, `comment-new`, `comment-thread`, `comment-thread__preview`, `comment-thread__ellipsis`, `comment-thread__list`, `comment-thread__reply`, `comment-msg`, `comment-msg__header`, `comment__menu`, `comment__menu-popover`, `comment__menu-item`, `data-message-id`, `data-archived`. ✓ `components.md §Comment` + `index.html#comment` + v0.13.0.
- Sidebar: `sidebar`, `sidebar__header`, `sidebar__nav`, `sidebar__footer`, `toc__indicator`, `nav-group`, `nav-group__items`. ✓ `components.md §Navigation` + `patterns/strategy-doc.md §Shell`.
- Doc body: `doc`, `doc__section`, `doc__spec`, `doc__spec-row`, `doc__spec-key`, `doc__spec-value`, `doc__spec--value`, `doc__spec--triple`, `doc__signoff`, `doc__signoff-stats`, `doc__signoff-signature`, `doc__signoff-signature-img`, `stat`, `highlight`. ✓ `components.md §Spec list` + `§Signoff` + `patterns/strategy-doc.md`.
- Inspector: `inspector`, `inspector__group`. ✓ `patterns/strategy-doc.md §Shell` + `index.html` inspector section.
- App shell: `app[data-view="doc"]`. ✓ `components.md §Three columns`.

Zero invented classes. Zero off-grid values. Zero unfamiliar compositions. Two soft flags for DS reviewer: the no-primary-in-control-block choice, and the inline-shout confirm for `[Redo research]`.

## Gate

Pending — DS reviewer at stage 7 compares this hand-off against `05-ux.md` and `06-revolutionary.md`.

## Hand-off

→ Stage 7, `kk-role-ds-reviewer`. Input: this file + `05-ux.md` + `06-revolutionary.md`. Reviewer writes `07-ds-reviewer.md` and the human picks one hand-off.
