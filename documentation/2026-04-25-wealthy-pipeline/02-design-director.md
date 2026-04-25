---
session: 2026-04-25-wealthy-pipeline
stage: 2
role: design-director
input: documentation/2026-04-25-wealthy-pipeline/01-analyst.md + canon (manifesto / patterns / components / tokens / voice) + handoff §1-9
output: aligned direction "Document first" + 5 pattern blocks + empty exceptions register
gate: passed — autonomous-mode self-pick at 2a + self-stamp at 2b per canon (user authorised full-pipeline auto-run)
---

Brought six directions, scored against the manifesto principles, picked the strongest, named the five pattern blocks the operator-review-state slice exercises.

## Raw input

User authorisation (from this session, verbatim):

> Commit before the start. And say about that, so we can revert, if needed. And then LET'S GO FULLY AUTOMATIC WAY GOGOGO DON'T ASK ME TILL THE FINAL STAGE WHERE I NEED TO OPEN PROTOTYPE. DO ALL DECISIONS ACCORDING TO OUR PRINCIPLES. FOLLOW THE SOUL AND LOGIC AND PATTERNS AND COMPONENTS.

Stage-1 locks (from `01-analyst.md § Locked decisions`, summarised — full text on disk):

- Q1 vertical slice = operator review state only. ONE flow.
- Q7 agent reply tone = operator's voice.
- Q11 training-signal UI = backend-only.
- Q12 multitenancy = Konstantin only, signature.svg, no switcher.
- Q13 kit head = v1.5.0 (`cb3733b`), exceptions register starts empty.

Other Q stamps deferred to client / brief-state slices.

## Aligned direction

### Direction A — Document first

**Intent.** The operator's review screen reads as a document the operator is reading, not a console the operator is operating. Threads are marginalia in the inspector; workflow stage is a quiet ambient indicator. The eye lands on the strategy's hero title and prose. Approval comes from understanding what's there, not from chasing a queue.

**Primary signal.** The book column. `t-hero` + the strategy `book__section` stack at full width, full type rhythm, full contrast. 80% of optical weight.

**Guardrails.**

- Inspector compresses to a small stage card on top + the comment stack below + nothing else.
- No shouty workflow crown. Stage indicator is a single static `card` with one `t-title` heading and a `t-caption` line.
- Per-section control rows are static `card`s, no `card--shout`. One primary button per row max (the most-used regen scope).
- The pre-sign signoff block IS the one `card--shout` in the book column — single shout per column rule.
- No invention. Every class resolves to `canon/components.md` or `canon/patterns.md`. Exceptions register stays empty.

**Expected kit surface.**

- `patterns/three-column-shell` — the shell.
- `patterns/sidebar-nav` — left column scroll-spy.
- `patterns/book__section` — every prose unit in the doc.
- `patterns/doc-section` — the per-section composition (display heading + body + control card).
- `patterns/inspector-group` — heading card above stack of interactive cards in inspector.
- `patterns/comments-group` + `patterns/comment-thread` + `patterns/comment-thread-resolved` — native comment stack.
- `card--shout` (single instance, in book) — pre-sign signoff steps.
- `book__spec` — possibly inside the stage card and the signoff stats.
- Typography utility classes — `t-hero`, `t-display`, `t-body`, `t-title`, `t-subtitle`, `t-caption`, `t-caption--bold`, `t-muted` (metadata only).
- `field` + `comment-new` — selection-driven draft pinned at top of inspector during active selection.
- `button` + `button--primary` — one primary per card.
- `tag` — counts and metadata.
- `highlight` — inline span on selected text.

### ASCII flow mockup — operator review state at rest

```
+- sidebar (260px) ----+--------------- book (flex) ---------------+--- inspector (420px) ----+
| Strategy for Sofia   | <t-hero> Strategy for Sofia               | + card -----------------+|
|                      |                                           | | Review                ||
| Brief             v  | <book__section id=brief>                  | | <t-caption>           ||
| Research          v  |   <t-display> Brief                       | | Stage 5 of 7. 9 open  ||
| Strategy        v    |   <t-body> Single line of brief intent.   | | threads to resolve.   ||
|   Что обсудили       |   <card> Brief input — collapsed          | +-----------------------+|
|   Точка А            | </book__section>                          |                          |
|   Точка Б            |                                           | + card-stack ----------+|
|   Видение            | <book__section id=research-1>             | | + comment-thread     ||
|   Позиционирование   |   <t-display> Research                    | |   active             ||
|   Гипотезы           |   <t-body> N sources accepted.            | |   "@Точка А"         ||
|   Рынок              |   <book__spec> sources list — collapsed   | | + comment-thread     ||
|   Ближайшие шаги     |   <card> 0 threads · Implement comments   | |   minimized          ||
|   Как мы работаем    | </book__section>                          | |   "@Позиционирование"||
| Notes                |                                           | | + comment-thread-    ||
| Signoff           ●  | <book__section id=strategy>               | |   resolved (×2)      ||
|                      |   <t-display> Strategy                    | | + comment-new        ||
|                      |   <t-display--medium t-muted>             | |   (pinned when       ||
|                      |     Sofia's first months as founder       | |    selecting)        ||
|                      |   <h3 t-subtitle> Что обсудили            | +-----------------------+|
|                      |   <t-body> ═══text═══                     |                          |
|                      |   <h3 t-subtitle> Точка А                 |                          |
|                      |   <t-body> ═══text═══                     |                          |
|                      |   <h3 t-subtitle> Точка Б                 |                          |
|                      |   <t-body> ═══text═══                     |                          |
|                      |   ... 9 subsections per voice anchor ...  |                          |
|                      |   <card> 7 threads · [Improve in place]   |                          |
|                      | </book__section>                          |                          |
|                      |                                           |                          |
|                      | <book__section id=notes>                  |                          |
|                      |   <t-display> Additional notes            |                          |
|                      |   <t-body t-subtle> empty                 |                          |
|                      | </book__section>                          |                          |
|                      |                                           |                          |
|                      | <book__section id=signoff>                |                          |
|                      |   <card card--shout>                      |                          |
|                      |     2 revs · 9 hits · 0 edits pending     |                          |
|                      |     Steps to sign                         |                          |
|                      |     1. Resolve 9 threads                  |                          |
|                      |     2. Implement comments where needed    |                          |
|                      |     3. Final read-through                 |                          |
|                      |     4. [Sign]   primary                   |                          |
|                      |   </card>                                 |                          |
|                      | </book__section>                          |                          |
+----------------------+-------------------------------------------+--------------------------+
```

## Pattern blocks

Five blocks. Each gets a parallel 3a → 3b → 3c track at stage 3. Block names become file slugs (`03b-designer-<slug>.md`).

### 1. `strategy-doc-body`

**Intent.** The book column composition for the operator's strategy review state. Hero + 5 named book__sections (brief / research / strategy / additional-notes / signoff) with the strategy section carrying 9 subsection headings + bodies per the prototype-alpha voice anchor (Что обсудили, Точка А, Точка Б, Видение + бизнес-модель, Позиционирование, Гипотезы + каналы, Рынок, Ближайшие шаги, Как мы работаем). `highlight` spans appear inline on selected text. Section transitions match `patterns/book__section` rules (32 px top padding, 20 px top margin, hairline top border).

**Kit surface.** `patterns/book__section`, `patterns/doc-section`, `t-hero`, `t-display`, `t-display--medium` (subtitle under display), `t-body`, `t-subtitle` (h3 subsection heads), `t-caption`, `t-muted` (metadata), `t-subtle` (empty-state placeholder text), `book__spec` (research sources list), `highlight` (inline selection mark).

**Designer answers needed.** Subsection heading markup (h3 vs h4, `t-subtitle` always per components rules), per-subsection body example content, empty state ("Additional notes" with no operator input), the rhythm at section boundaries with control cards present.

### 2. `per-section-control`

**Intent.** A static card under each top-level strategy section + the research section, carrying a thread-count line and a regen action row. Operator-facing affordance to act on the section's comments. One primary button per card (the most-used scope). No `card--shout`; the shout slot in the book column is reserved for signoff.

**Kit surface.** `card` (static), `t-caption` (count line), `button`, `button--primary`, `tag` (optional thread count badge).

**Designer answers needed.** Button labels (imperative verbs per voice rules), count-line copy when zero threads vs many threads, secondary-button labels (rare and rarest scopes), positioning relative to the section it controls.

### 3. `inspector-stage-card`

**Intent.** A single static card in the inspector top, naming the current pipeline stage and one summary line. Quiet ambient indicator, not a workflow crown. No actions — actions live on per-section controls and signoff.

**Kit surface.** `card` (static), `card__heading`, `t-title`, `t-caption`, `book__spec` (optional — past stages summary).

**Designer answers needed.** What the summary line says ("Stage 5 of 7. 9 open threads to resolve." vs alternative phrasings), whether past stages render as a `book__spec` list inside the card or are omitted entirely, copy for every stage's variant of the summary.

### 4. `inspector-comment-stack`

**Intent.** The comment stack in the inspector below the stage card. Composes from `patterns/comments-group` + `patterns/comment-thread` + `patterns/comment-thread-resolved` + `comment-new` (draft, when operator is mid-selection). Flat list, kit-default ordering (open first, then resolved, then archived hidden). One thread active at a time per `card-stack` rule.

**Kit surface.** `patterns/comments-group`, `patterns/inspector-group`, `patterns/comment-thread`, `patterns/comment-thread-resolved`, `card--shout.comment-new` (draft variant per components.md § Comment), `field` (textarea inside draft), `button--primary` (commit), `comment__menu` + `comment-msg[data-author-role=agent]` + Approve / Reply / Archive / Delete kebab actions per kit canon.

**Designer answers needed.** Empty-state copy (no threads yet), draft-pinned state during active selection, agent-reply rendering inside a thread, resolved-state visual after Approve, archive-hidden behaviour, reject-with-why field shape and refusal of empty submit.

### 5. `signoff-shout-pending`

**Intent.** The pre-sign signoff block as a single `card--shout` inside the book column at the bottom (`#signoff` book__section). Carries stats row (revs · research hits · edits pending), steps-to-sign list, primary [Sign] action. Once signed (out of this slice), this block swaps to a real `book__signoff`. Within the slice we render the pending shape only.

**Kit surface.** `card--shout` (one per column rule honoured — the only shout in the book column), `card__heading`, `t-title`, `book__spec` (stats row, two- or four-stat shape per signoff rules — never three), `t-list` (steps as `<ol class="t-list">`), `button--primary` (Sign), `t-caption`.

**Designer answers needed.** Stats labels and copy ("revisions" vs "revs" vs "review cycles"), step-list copy with imperative verbs, [Sign] enable rule (per analyst Q1 lock: signoff steps are guidance, [Sign] enabled whenever a strategy subsection has text), pre-sign byline ("by Konstantin Konstantinopolskii, kk.consulting" present from the start in the same shape `book__signoff` will carry, or absent until sign).

## Exceptions

**None.** Empty register per Q13 stamp.

The slice composes entirely from canon. Every component used resolves to `canon/components.md`. Every pattern used resolves to `canon/patterns.md` (top-level patterns + registry). No new tokens, no new classes, no off-grid spacing, no new keyframes.

If a designer at stage 3b discovers the slice forces an exception, the protocol is: halt, document the case here, surface to user gate before stage 5 ships.

## Rejected directions

Five. Archived per `pipeline.md § Archive, do not delete`. Each carries the score that lost it the pick.

### Direction B — Thread queue (action mode wins)

**Intent.** Inspector dominates. The first object the eye lands on is a count card ("9 open · Redo with my notes") followed by the comment stack as the page's lede. Doc body is reference for the threads, not the headline.

**Primary signal.** The thread queue + count.

**Guardrails.** Doc demoted to ambient reading; stage card becomes a pinned action card; per-section control cards collapse into the single inspector queue.

**Expected kit surface.** `card--shout` in the inspector for the count, `comments-group`, `comment-thread`. Doc renders normally but with reduced optical priority via inspector growth.

**Why rejected.**

- Violates `manifesto.md § Pure signal` ("Beauty is a side effect of clarity"). The doc IS the product; demoting it to reference for threads inverts the artefact.
- Violates `manifesto.md § Job stories` ("one priority job per screen"). The operator's job here is "review the strategy and approve". "Review" is a reading job, not a queue-clearing job. Threads exist BECAUSE of reading; reversing the relation reads the wrong job.
- Violates `manifesto.md § The iPad feel` ("only the middle column moves during reading"). The middle column is the reading surface. Inspector dominance breaks the canonical relation between columns.

### Direction C — Stage-card crown (workflow as headline)

**Intent.** A loud `card--shout` at the top of the inspector reading "Stage 5 — Review" with a one-line context strip ("9 threads to resolve") and one primary action ("Redo with my notes"). Workflow IS the headline. Stage transitions are the most dramatic moment of each screen.

**Primary signal.** The workflow crown.

**Guardrails.** Doc renders unchanged; inspector reduces to crown + comment stack; per-section controls remain.

**Expected kit surface.** `card--shout` in inspector, `t-title`, `t-caption`, `button--primary`, `comments-group` below.

**Why rejected.**

- Violates the "one shout per column" rule (`canon/components.md § Card`). The signoff in the book column is already a shout. A second shout in the inspector would compete.
- Violates `manifesto.md § Pure signal`. The operator does not need to be told "you are at stage 5" loudly — the doc state is self-evident (research above, strategy in progress, signoff at bottom). A crown explaining the screen is a UI bug per voice rules ("Tooltips: a feature that needs a tooltip is a UI bug").
- Trades signal for ceremony. `manifesto.md § Eighty/twenty`: 80% of the visual weight goes to primary signal. Workflow is metadata, not primary.

### Direction D — Signoff in sight (artefact-in-becoming)

**Intent.** The `book__signoff` shape sits at the bottom of the doc from the first paint, in a pre-sign placeholder state. Stats fill as work progresses. The operator scrolls toward sign. Primary signal: the signoff destination is visible.

**Primary signal.** The signoff block, present from the start.

**Guardrails.** Doc reads normally; inspector unchanged; the signoff block uses `book__signoff` shape with empty signature slot.

**Expected kit surface.** `book__signoff` (pending variant), `book__spec` for stats, signature slot empty.

**Why rejected.**

- Conflicts with `canon/components.md § Signoff` ("Every doc ships signed"). The `book__signoff` shape is canonically the FINISHED state of a doc. Rendering it in a pending shape teaches a wrong reading of the component.
- Adds optical noise to the bottom of every scroll without changing the operator's next action. `manifesto.md § Pure signal` rejects this.
- Direction A's `signoff-shout-pending` block achieves the "destination visible" intent more cleanly via `card--shout` in the book column — same effect, kit-canonical shape (a shout is *meant* to be the moment, signoff is meant to be the seal).

### Direction E — Single column (contrarian)

**Intent.** Doc body and threads collapse into one column. Each thread renders inline as marginalia attached to its highlighted span via a CSS `:has()` or pseudo-element trick. Sidebar still scroll-spy. No separate inspector group of threads.

**Primary signal.** The doc-with-marginalia.

**Guardrails.** Inspector becomes the stage card only; threads render in book-column flow.

**Expected kit surface.** `patterns/book__section`, `comment-thread` rendered inline (not in `comments-group`), `highlight`.

**Why rejected.**

- Violates `canon/patterns.md § Three columns` — the canonical kit shell is three columns; inspector exists to hold "pointer cards, comments, actions". Removing inspector for desktop reading is a structural break.
- Single column is `narrow-mobile` only per `canon/patterns.md § Narrow mobile`. At desktop, the kit demands the three-column pattern.
- Inline threads break `comment` component rules ("Lives in the inspector" — `canon/components.md § Comment`). Would need a stamped exception. The slice has no good reason to need one.

### Direction F — Inspector group as command center (chrome-and-content balanced)

**Intent.** Doc and inspector at 50/50 optical weight. Inspector becomes a balanced command center: stage card + comment stack + an actions card. Doc retains full prose rhythm. Neither dominates.

**Primary signal.** Balance — the eye reads both columns evenly.

**Guardrails.** Stage card and comment stack get equal real estate; doc body retains its rhythm but visually shares weight.

**Expected kit surface.** `inspector-group` pattern, `card--interactive` cards stacked, doc renders normally.

**Why rejected.**

- Violates `manifesto.md § Eighty/twenty` directly: "Primary signal takes 80% of visual weight. Secondary fits in 20%." 50/50 is the failure shape.
- Picks no fight. `manifesto.md § Radical contrast`: "Gray mush is the default AI failure mode: muted everything, contrast nowhere, signal lost. The cure is hypertrophied contrast." Balanced design does not have a primary signal — it has two secondaries pretending to be one primary.
- Direction A's "Document first" makes the reading-vs-action commitment that direction F refuses to make.

## Alignment transcript

Autonomous mode. The "alignment" is the user's authorisation to self-pick + self-stamp per canon. Recorded verbatim above under `## Raw input`. No back-and-forth.

The pick is defended on canon evidence (file:line citations to manifesto, patterns, components) — not on stylistic preference. The four-rule scoring (§Pure signal, §Eighty/twenty, §The iPad feel, §Job stories) returns Direction A as the only direction that does not break a canonical rule. B, C, E break a structural rule each; D conflicts with component canon; F refuses the manifesto's commitment-to-primary-signal.

## Gate

Passed — autonomous mode. Round 2a (direction pick) self-stamped on canon evidence. Round 2b (pattern blocks + exceptions) self-stamped: 5 blocks named, exceptions register empty.

## Hand-off

→ Stage 3a, `kk-role-fresh-eyes-jobstory` (pre-designer mode), 5 parallel instances:

1. `03a-fresh-eyes-pre-strategy-doc-body.md`
2. `03a-fresh-eyes-pre-per-section-control.md`
3. `03a-fresh-eyes-pre-inspector-stage-card.md`
4. `03a-fresh-eyes-pre-inspector-comment-stack.md`
5. `03a-fresh-eyes-pre-signoff-shout-pending.md`

Each instance reads this file's `## Aligned direction` + the relevant `## Pattern blocks` entry only. Per `pipeline.md § Phase 2 — Design` + `§Dumb-reviewer character`: zero design context, strictly user POV, 0.2-second clarity bar.

After 3a passes, 5 parallel `kk-role-designer` instances spawn at 3b. After 3b ships per pattern, 5 parallel `kk-role-fresh-eyes-jobstory` (post-designer mode) instances run 3c. All five must pass 3c before stage 4 fires.
