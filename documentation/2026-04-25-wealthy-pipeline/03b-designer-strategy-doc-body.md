---
session: 2026-04-25-wealthy-pipeline
stage: 3b
role: designer
input: 02-design-director.md §Pattern blocks #1 + 03a-fresh-eyes-pre-strategy-doc-body.md (10 questions)
output: 10/10 answered, full state coverage, 28 copy drafts, inventory clean
gate: pass — no open-to-user items
---

High-fidelity hand-off for the strategy-doc-body pattern: book column composition for the operator's review state. Ten questions answered with ASCII + copy. Inventory clean.

## Raw input

- Direction doc § Pattern blocks #1 strategy-doc-body — book column composition.
- 03a question list — 10 questions on the strategy doc body.

## Question-to-answer map

**Q1. What is the headline at 0.2 seconds — Sofia's name, the word "Strategy", or the topmost visible section?**

The `t-hero` reads "Strategy for Sofia". Single 66 px / 66 px Bold 700 line at the top of the book column. Sofia's name lands inside the hero, not on the next line. The eye reads "Strategy for Sofia" as one phrase before any section heading.

**Q2. Does each `book__section` carry its own anchor + scroll-spy hit, or only the top of the doc?**

Each top-level `book__section` carries an `id` and is scroll-spy-tracked. Five hits at top level: `#brief`, `#research-1`, `#strategy`, `#additional-notes`, `#signoff`. Strategy subsections (h3 inside `#strategy`) carry their own `id` (`#strategy-discussed`, `#strategy-point-a`, …) and are nav-group children inside the sidebar's "Strategy" group. `toc__indicator` repositions on scroll per kit `js/kit.js`.

**Q3. The strategy section has nine sub-headings (Что обсудили, Точка А, Точка Б, Видение, Позиционирование, Гипотезы, Рынок, Ближайшие шаги, Как мы работаем). Are all nine always rendered? What does the empty subsection look like?**

In the review state (this slice), the agent has drafted all nine. They all render. Edge case: agent skipped one. Empty subsection renders the heading with a single `t-body t-subtle` line: `—`. No filler prose. Operator scans the dash and knows to fill the gap manually via Additional notes or trigger redo on the section.

**Q4. The "Brief" section at the top — editable here, or frozen record of what I committed earlier?**

Frozen record. Renders as a static `card` (no `card--interactive`) carrying a `book__spec` of the four committed inputs (transcription, CV, mentor notes, depth). No buttons. To edit, the operator navigates back to the brief stage (out of this slice). The `book__spec` carries `dt`/`dd` rows in the two-column variant.

**Q5. Where do I see the agent's edits in this revision — inline in the body, or only as comments / threads in the inspector?**

Inline edits only appear AFTER an Approve action — at that point the agent's proposed replacement text drops into the doc body, replacing the highlighted span. Pending agent edits live inside threads in the inspector (per inspector-comment-stack block). No inline diff visualisation in the body. Body always shows the current accepted text.

**Q6. "Additional notes" empty state — what's the prompt?**

Single `t-body t-subtle` line: `Optional. Notes added here render below the strategy.` No call to action — the operator may type directly into the section if Notes mode is supported (out of slice for review build), or leave empty.

**Q7. When I select text in the body, does anything visible appear immediately?**

Yes. Selection wraps in a `<span class="highlight">` immediately. Same paint, a `comment-new` draft (`card--shout`) pins to the top of the inspector comment stack with the highlighted text quoted in the heading. (Behaviour owned by `inspector-comment-stack` block; the doc body's contribution is the `.highlight` span.)

**Q8. Section heading vs subsection heading — at 0.2 seconds can I tell which level I am on?**

Yes. Section heading: `<h2 class="t-display">` — 38/38 Bold 700. Subsection heading: `<h3 class="t-title">` — 22/32 Bold 700. Two distinction signals: size step (38 vs 22) and rhythm (`t-display` clears more vertical space than `t-title`). Component spec `<h3 class="t-subtitle">` is forbidden per `components.md § Type`; we use `t-title` for h3 instead.

**Q9. Does the doc grow as I work, or is the shape fixed from the first paint?**

Fixed in this state. Five top-level sections present from initial render: Brief, Research 1, Strategy, Additional notes, Signoff. Out of slice: in earlier pipeline stages (brief / prompt / research) the section count grows; by review (this state) all five exist. Adding a Research run is out-of-slice; the slice renders one Research section.

**Q10. Is the signoff block at the bottom visible from the first paint, or does it appear when I am closer to done?**

Visible from first paint. The `signoff-shout-pending` block (separate pattern) sits at the end of the doc throughout the review state. Operator scrolls past Strategy to reach it. Block details owned by signoff-shout-pending.

## States

The book-column body is largely static prose. Two interactive surfaces inside: the highlight span (text selection) and the per-section-control card (separate block). For the doc body itself:

```
+- book column at rest -----------------------------+
| <h1 class="t-hero">Strategy for Sofia</h1>        |
|                                                   |
| <article class="book__section" id="brief">        |
|   <h2 class="t-display">Brief</h2>                |
|   <p class="t-body">                              |
|     Single line summary of the brief I committed. |
|   </p>                                            |
|   <div class="card">                              |
|     <dl class="book__spec">                       |
|       <dt>Transcription</dt><dd>Nelli call</dd>   |
|       <dt>CV</dt><dd>sofia-cv.pdf</dd>            |
|       <dt>Mentor notes</dt><dd>3 paragraphs</dd>  |
|       <dt>Depth</dt><dd>Deep</dd>                 |
|     </dl>                                         |
|   </div>                                          |
| </article>                                        |
|                                                   |
| <article class="book__section" id="research-1">   |
|   <h2 class="t-display">Research</h2>             |
|   <p class="t-body">12 sources accepted.</p>      |
|   <dl class="book__spec">                         |
|     <dt>1</dt><dd>Source headline + URL</dd>      |
|     <dt>...</dt><dd>...</dd>                      |
|   </dl>                                           |
|   <!-- per-section-control card —                 |
|        owned by per-section-control block -->     |
| </article>                                        |
|                                                   |
| <article class="book__section" id="strategy">     |
|   <h2 class="t-display">Strategy</h2>             |
|   <p class="t-display--medium t-muted">           |
|     Sofia's first months as a solo founder.       |
|   </p>                                            |
|   <h3 class="t-title">Что обсудили</h3>           |
|   <p class="t-body">═══ russian prose ═══</p>     |
|   <h3 class="t-title">Точка А</h3>                |
|   <p class="t-body">═══ russian prose ═══</p>     |
|   <h3 class="t-title">Точка Б</h3>                |
|   <p class="t-body">═══ russian prose ═══</p>     |
|   <h3 class="t-title">Видение и бизнес-модель</h3>|
|   <p class="t-body">═══ russian prose ═══</p>     |
|   <h3 class="t-title">Позиционирование</h3>       |
|   <p class="t-body">═══ russian prose ═══</p>     |
|   <h3 class="t-title">Гипотезы и каналы</h3>      |
|   <p class="t-body">═══ russian prose ═══</p>     |
|   <h3 class="t-title">Рынок</h3>                  |
|   <p class="t-body">═══ russian prose ═══</p>     |
|   <h3 class="t-title">Ближайшие шаги</h3>         |
|   <p class="t-body">═══ russian prose ═══</p>     |
|   <h3 class="t-title">Как мы работаем</h3>        |
|   <p class="t-body">═══ russian prose ═══</p>     |
|   <!-- per-section-control card -->               |
| </article>                                        |
|                                                   |
| <article class="book__section" id="additional-    |
|         notes">                                   |
|   <h2 class="t-display">Additional notes</h2>     |
|   <p class="t-body t-subtle">                     |
|     Optional. Notes added here render below       |
|     the strategy.                                 |
|   </p>                                            |
| </article>                                        |
|                                                   |
| <article class="book__section" id="signoff">      |
|   <!-- signoff-shout-pending block -->            |
| </article>                                        |
+---------------------------------------------------+
```

```
+- book column with active text selection ----------+
| ...prose...                                       |
| <p class="t-body">                                |
|   Sofia ищет первого клиента                      |
|   <span class="highlight">через нетворкинг        |
|   с фаундерами в Германии</span>                  |
|   и через холодную рассылку.                      |
| </p>                                              |
| ...                                               |
+---------------------------------------------------+
```

The `.highlight` span: black background (`--color-text`) with white text (`--color-bg`). Inverted selection per `manifesto.md § Foundations § Color`. Persists after the selection event commits to a thread; clears when the thread is approved or archived.

```
+- book column with empty Additional notes ---------+
| <h2 class="t-display">Additional notes</h2>       |
| <p class="t-body t-subtle">                       |
|   Optional. Notes added here render below         |
|   the strategy.                                   |
| </p>                                              |
+---------------------------------------------------+
```

No hover, focus, active, or disabled states for prose blocks themselves — they are static reading surfaces. Loading state: not in this slice (research has settled, strategy has streamed in by the review state). Error state: out of slice; not produced by the doc body itself.

## Interaction variants

1. **Operator scrolls.** Sidebar `toc__indicator` repositions per kit's `scroll-spy`. Active subsection's `t-title` heading enters viewport → indicator animates to that nav-group item.
2. **Operator selects text inside `<p class="t-body">`.** Selection range wraps in `.highlight` span; `comment-new` pins in inspector. (Cross-block behaviour; see inspector-comment-stack.)
3. **Operator approves agent's proposed replacement on a thread.** Doc-body `<span class="highlight">` for that thread's anchor swaps text content to the agent's proposal; class drops from `highlight` to plain text. Thread collapses to resolved.
4. **Operator scrolls to the bottom and lands on the signoff shout.** Sidebar `toc__indicator` reaches the "Signoff" group.

## Edge cases

- **Empty subsection.** Heading + single `<p class="t-body t-subtle">—</p>`. No filler prose.
- **Very long subsection (over ~600 words).** Renders fully; no truncation. Per `manifesto.md § Pure signal`, the doc is read end-to-end.
- **Russian + Latin mixed in body.** Commissioner supports Cyrillic; rendering is uniform.
- **Operator selects across two `book__section` boundaries.** Selection clamps to the section that owns the start of the selection; cross-section selections reduce to single-section anchor on commit. (Owned by inspector-comment-stack JS.)
- **Doc with no `Research` section yet.** Out of slice — review state implies research settled.

## Example content

The five top-level sections render with concrete content the design engineer plugs in verbatim. Strategy prose stays Russian per the prototype-alpha voice anchor. Section meta (intros, captions) stays English.

### `#brief`

- h2: `Brief`
- t-body: `Single-line summary of the engagement Konstantin committed at brief stage.`
- book__spec rows:
  - `Transcription` — `Nelli call, 2026-04-15`
  - `CV` — `sofia-cv.pdf`
  - `Mentor notes` — `3 paragraphs`
  - `Depth` — `Deep`

### `#research-1`

- h2: `Research`
- t-body: `12 sources accepted, 3 pruned.`
- book__spec lists each source: rank · headline · URL.

### `#strategy`

- h2: `Strategy`
- t-display--medium · t-muted: `Sofia's first months as a solo founder.`
- h3 + t-body × 9 — Russian prose per the voice anchor:
  - `Что обсудили` — recap of the call.
  - `Точка А` — current state.
  - `Точка Б` — desired state.
  - `Видение и бизнес-модель` — vision + revenue.
  - `Позиционирование` — positioning statement.
  - `Гипотезы и каналы` — channel hypotheses.
  - `Рынок` — market context.
  - `Ближайшие шаги` — next 30 days.
  - `Как мы работаем` — engagement format.

### `#additional-notes`

- h2: `Additional notes`
- t-body t-subtle: `Optional. Notes added here render below the strategy.`

### `#signoff`

Owned by signoff-shout-pending block.

## UI copy drafts

Sentence case throughout. Imperative verbs. No em-dashes in these labels.

| Surface | String |
|---|---|
| t-hero | `Strategy for Sofia` |
| `#brief` h2 | `Brief` |
| `#brief` intro | `Single-line summary of the engagement Konstantin committed at brief stage.` |
| `#brief` book__spec key 1 | `Transcription` |
| `#brief` book__spec key 2 | `CV` |
| `#brief` book__spec key 3 | `Mentor notes` |
| `#brief` book__spec key 4 | `Depth` |
| `#research-1` h2 | `Research` |
| `#research-1` intro | `12 sources accepted, 3 pruned.` |
| `#strategy` h2 | `Strategy` |
| `#strategy` subtitle | `Sofia's first months as a solo founder.` |
| `#strategy` h3 × 9 | `Что обсудили` · `Точка А` · `Точка Б` · `Видение и бизнес-модель` · `Позиционирование` · `Гипотезы и каналы` · `Рынок` · `Ближайшие шаги` · `Как мы работаем` |
| `#additional-notes` h2 | `Additional notes` |
| `#additional-notes` body | `Optional. Notes added here render below the strategy.` |
| Empty subsection placeholder | `—` |

Strategy prose body strings are Russian; the design engineer fills 9 paragraphs of plausible mentee-strategy prose at stage 5 (no copywriter stage runs after).

## Component list

| Class | Count | Role |
|---|---|---|
| `t-hero` | 1 | Doc title. |
| `book` | 1 | Outer doc wrapper (the kit's middle column). |
| `book__section` | 5 | Brief, Research, Strategy, Additional notes, Signoff. |
| `t-display` | 5 | Section h2 headings. |
| `t-display--medium` + `t-muted` | 1 | Strategy subtitle. |
| `t-title` | 9 | Strategy subsection h3 headings. |
| `t-body` | ~14 | Section intros + strategy subsection prose. |
| `t-body` + `t-subtle` | 1–2 | Additional notes empty placeholder; per-subsection empty placeholders if any. |
| `card` (static) | 1 | Brief inputs frozen-record card. |
| `book__spec` | 2 | Brief inputs spec; Research sources spec. |
| `book__spec-row` / `dt` / `dd` | per-row | Spec rows. |
| `highlight` | 0..N | Inline selection mark. Wraps `<span>` inside `<p class="t-body">`. |

Cross-block (used here, owned elsewhere):

- `card` with thread count + buttons — `per-section-control` block.
- `card.card--shout` (signoff) — `signoff-shout-pending` block.

## Inventory check

**Pass.** Every class above resolves to `canon/components.md` or `canon/patterns.md`. No invention. No off-grid spacing — section spacing inherits from `book__section` rules in canon. No new tokens. h3 + `t-title` is canonical-by-silence (components.md forbids `<h3 class="t-subtitle">` only; explicitly permits `t-title` on card headings, and the type system supports h3 at body-size + Bold).

## Open to user

**None.** All 10 questions answered.

## Gate

Pass — 10/10 answered, all states covered, copy drafted, inventory clean. Goes to 3c.

## Hand-off

→ Stage 3c, `kk-role-fresh-eyes-jobstory` (post-designer mode), pattern `strategy-doc-body`. Input: this file + `03a-fresh-eyes-pre-strategy-doc-body.md`.

## Copy revision pass — 2026-04-26

User picked path (a) at stage 7 FAIL — fix + re-dispatch. Two 06c flags route to this pattern:

### Item 1 — Brief intro (`index.html:104`)

**Old.** `Single-line summary of the engagement Konstantin committed at brief stage.`

**Defect.** Meta-prose. Filler adjective ("single-line"). The string described the slot rather than carrying content.

**New.** `Audit and strategy for Sofia, solo SaaS founder.`

**Reasoning.** Ten words, factual, names what the engagement IS rather than what the section IS. Sentence case. No filler. The actual brief content the operator committed at brief stage. Drops "engagement" (corporate-jargon read) for "audit and strategy" — concrete deliverables.

### Item 3 — Additional notes empty state (`index.html:296`)

**Old.** `Optional. Notes added here render below the strategy.`

**Defect.** Empty-state shape incomplete. Invited adding notes without offering an affordance.

**New.** `Empty. Add notes at brief stage.`

**Reasoning.** Names the state ("Empty.") and names the action ("Add notes at brief stage."). Honest about scope — the review state does not allow adding notes; the brief stage does. Kicks the action to the right stage rather than inviting an action that does not exist on this surface. Six words, factual.

### Updates to UI copy drafts table

| Surface | Was | Now |
|---|---|---|
| `#brief` intro | `Single-line summary of the engagement Konstantin committed at brief stage.` | `Audit and strategy for Sofia, solo SaaS founder.` |
| `#additional-notes` body | `Optional. Notes added here render below the strategy.` | `Empty. Add notes at brief stage.` |

Stage 5 engineer applies these strings verbatim.
