---
session: 2026-04-25-wealthy-pipeline
stage: 3b
role: designer
input: 02-design-director.md §Pattern blocks #4 + 03a-fresh-eyes-pre-inspector-comment-stack.md (10 questions)
output: 10/10 answered, full state coverage on threads + draft + replies, 22 copy drafts, inventory clean
gate: pass — no open-to-user items
---

High-fidelity hand-off for the inspector-comment-stack pattern: the comment stack rendering open / resolved / archived threads + draft pin during selection. The product's load-bearing interaction.

## Raw input

- Direction doc § Pattern blocks #4 inspector-comment-stack.
- 03a question list — 10 questions.

## Question-to-answer map

**Q1. At 0.2 seconds, how many open threads do I see, and which one is active (expanded)?**

Top of stack carries a heading with the count: `Comments (7 open)`. Below the heading, threads stack vertically. ONE thread renders with `data-state="active"` (default: the most recently opened); the others render with `data-state="minimized"`. The active thread expands into its `card__collapsible` showing the message list + reply field. Minimized threads show only the heading + first message preview.

**Q2. When I select text in the doc, where does the new draft pin in this stack?**

Top of the stack, ABOVE the heading. The `comment-new` (`card.card--shout` with `comment-new` modifier) pins as the first child of the `inspector__group` containing the comment stack. The shout variant inverts (black surface, white text) so it reads as the active commitment moment.

```
+- inspector with active selection -----+
| [stage card]                          |
| <-- comment-new pinned here -->       |
| Comments (7 open)                     |
| [thread 1 active]                     |
| [thread 2 minimized]                  |
| [thread 3 minimized]                  |
| ...                                   |
+---------------------------------------+
```

The shout's heading quotes the highlighted text: `Re: "через нетворкинг с фаундерами в Германии"`. The body has a `field` with a textarea (`field__input`). One primary button: `Add thread`. One secondary kebab dismisses the draft (`Cancel`). On commit, the shout transforms into a regular `comment-thread` and slots into the stack as the new active thread.

**Q3. Inside an active thread, what visually distinguishes the agent's reply from my own?**

Three signals on the agent message:

1. `data-author-role="agent"` on `comment-msg` — kit applies a 3% surface fill (`--color-surface-overlay`) to the message background, distinct from the operator's transparent message background.
2. Byline reads `Agent` in `t-caption--bold`. Operator's byline reads `Konstantin` in the same style. Same weight, different name.
3. The kebab menu on an agent message exposes Approve in addition to Reply / Archive / Delete (kit shows Approve only when the last message is agent-authored per `components.md § Comment`).

No icons, no color swap, no italics. Operator's voice on the agent's proposed-replacement text (per Q7 stamp).

**Q4. The kebab menu carries Approve, Reply, Archive thread, Delete. Which are visible per state?**

Per `components.md § Comment`:

- **Reply** — always visible.
- **Delete** — always visible.
- **Archive thread** — always visible.
- **Approve** — visible ONLY when the last message in the thread's `comment-thread__list` carries `data-author-role="agent"`.

So a thread with no agent replies yet shows three actions; a thread with an agent's proposed replacement shows four.

**Q5. Approve — what visibly happens?**

Three things, one transaction:

1. Doc body's `<span class="highlight">` for that thread's anchor swaps text content to the agent's `proposed_replacement` (the message body); the `highlight` class drops. Now plain text.
2. Thread collapses to resolved — re-rendered as `comment-thread-resolved` per `canon/patterns.md § Registry — comment-thread-resolved`. The resolved card shows a check stamp, a 2-line snippet of the new accepted text, and the byline `Approved by Konstantin`.
3. The next minimized thread auto-promotes to `data-state="active"` (kit's `inspector-card-stack` JS handles the promotion). Operator can keep moving without clicking.

**Q6. Reject with a written why — does the UI refuse empty submissions?**

Yes. There is no separate "Reject" action — rejection is `Reply with a why`. The reply field's commit button is `disabled` whenever the textarea contains only whitespace. Empty submission attempt: the kit's button never fires (HTML disabled). Visual cue: the button appears in the kit's secondary-disabled style (per `button` rules; not a custom dim).

If the operator tries Enter / Cmd-Enter shortcut on an empty field, the same disabled rule applies. No error toast; the affordance not firing IS the signal.

The kebab menu's `Delete` action is for trashing the thread entirely, not for rejection. `Archive thread` hides the thread (recoverable in DOM but not from UI); rejection-with-why uses the reply field.

**Q7. Archived threads — gone, or hidden?**

Hidden via CSS. Per `components.md § Comment`: "Archive sets `data-archived="true"` on the thread. DOM retained, hidden via CSS." The slice does not render an "Archived (N)" group; archived threads are invisible to the operator on the surface. A future "Show archived" affordance would surface them — out of slice.

**Q8. Resolved threads — pile at bottom, fall away, or render as a check stamp?**

Render as a check stamp. Per `canon/patterns.md § Registry — comment-thread-resolved`: "Minimized preview with a check stamp, snippet, and byline." Position: below the open threads, in DOM order. The `comments-group` pattern (`canon/patterns.md`) implicitly orders open → resolved → archived (last hidden).

Resolved threads stack with smaller visual weight (`t-caption` snippet vs full thread heading). They never auto-collapse out of the stack — the operator can read what was approved by glancing down.

**Q9. Two threads expanded at once?**

No. One active per stack per `components.md § Card` ("One active per stack"). Clicking a minimized thread fires the kit's `inspector-card-stack` module: previously active thread minimizes, clicked thread activates. The kit handles this — consumer does not write the swap logic.

**Q10. Empty state, no threads yet?**

The `inspector__group` wrapping the comment stack renders the heading and a single `t-caption t-muted` line below it:

```
+- empty comment stack -----------+
| Comments                        |
| <p class="t-caption t-muted">   |
|   No threads yet. Select text   |
|   in the strategy to start one. |
| </p>                            |
+---------------------------------+
```

Heading drops the count parenthetical when zero. `t-muted` is allowed here per `canon/voice.md § Muted text` ("Allowed only for metadata… or when the user explicitly asks") — empty-state guidance is metadata-class.

## States

### Stack-level state: open + resolved threads

```
+- inspector__group (comments) ----------------+
| <h3 class="t-title">                         |
|   Comments <span class="t-caption">          |
|     (<span class="t-caption--bold">7</span>  |
|      open)                                   |
|   </span>                                    |
| </h3>                                        |
|                                              |
| <div class="comments-group">                 |
|   <div class="card card--interactive         |
|              comment-thread"                 |
|        data-state="active">                  |
|     <div class="card__heading">              |
|       <h4 class="t-subtitle">                |
|         "через нетворкинг с фаундерами…"     |
|       </h4>                                  |
|       <p class="t-caption t-muted">          |
|         Strategy · Гипотезы и каналы · 2 msgs|
|       </p>                                   |
|     </div>                                   |
|     <div class="card__collapsible">          |
|       <div class="card__collapsible-inner">  |
|         <div class="comment-msg"             |
|              data-message-id="m-01">         |
|           <p class="t-caption--bold">        |
|             Konstantin                       |
|           </p>                               |
|           <p class="t-caption">              |
|             Sharpen the verb here.           |
|             "Через" reads soft.              |
|           </p>                               |
|           <button class="comment__menu"      |
|                   aria-label="Thread         |
|                   actions">…</button>        |
|         </div>                               |
|         <div class="comment-msg"             |
|              data-message-id="m-02"          |
|              data-author-role="agent">       |
|           <p class="t-caption--bold">Agent</p>|
|           <p class="t-caption">              |
|             Sofia находит первого клиента    |
|             через нетворкинг с фаундерами…   |
|             (operator-voice replacement)     |
|           </p>                               |
|           <button class="comment__menu"      |
|                   aria-label="Thread         |
|                   actions">…</button>        |
|         </div>                               |
|         <label class="field                  |
|                 comment-thread__reply">      |
|           <textarea                          |
|             class="t-caption field__input"   |
|             placeholder="Reply with a why,   |
|             or approve via the kebab.">      |
|           </textarea>                        |
|           <span class="field__fake-caret"    |
|                 aria-hidden="true">          |
|           </span>                            |
|         </label>                             |
|         <button class="button                |
|                 button--primary t-subtitle"  |
|                 disabled>                    |
|           Reply                              |
|         </button>                            |
|       </div>                                 |
|     </div>                                   |
|   </div>                                     |
|                                              |
|   <div class="card card--interactive         |
|              comment-thread"                 |
|        data-state="minimized">               |
|     <div class="card__heading">              |
|       <h4 class="t-subtitle">                |
|         "первый клиент через холодные…"      |
|       </h4>                                  |
|       <p class="t-caption t-muted">          |
|         Strategy · Точка А · 1 msg           |
|       </p>                                   |
|     </div>                                   |
|   </div>                                     |
|                                              |
|   ... 5 more minimized threads ...           |
|                                              |
|   <!-- resolved threads below -->            |
|   <div class="card card--interactive         |
|              comment-thread"                 |
|        data-state="resolved">                |
|     <div class="card__heading">              |
|       <h4 class="t-subtitle">                |
|         ✓ Approved snippet ~20 chars…        |
|       </h4>                                  |
|       <p class="t-caption t-muted">          |
|         Approved by Konstantin · 14:02       |
|       </p>                                   |
|     </div>                                   |
|   </div>                                     |
|                                              |
|   <!-- archived threads, hidden via CSS -->  |
|   <div class="card card--interactive         |
|              comment-thread"                 |
|        data-state="active"                   |
|        data-archived="true">                 |
|     ...                                      |
|   </div>                                     |
| </div>                                       |
+----------------------------------------------+
```

The check glyph in resolved heading is a Unicode `✓` (U+2713) inline in the `t-subtitle`, NOT an icon font / SVG. Voice clean.

### Draft state (during text selection)

```
+- comment-new shout pinned ABOVE the heading -+
| <div class="card card--shout comment-new">   |
|   <div class="card__heading">                |
|     <h3 class="t-title">                     |
|       Re: "через нетворкинг с фаундерами     |
|       в Германии"                            |
|     </h3>                                    |
|     <p class="t-caption t-muted">            |
|       Strategy · Гипотезы и каналы           |
|     </p>                                     |
|   </div>                                     |
|   <label class="field">                      |
|     <textarea class="t-caption field__input" |
|               placeholder="Type your note —  |
|               sharpen, soften, replace.">    |
|     </textarea>                              |
|   </label>                                   |
|   <button class="button button--primary      |
|             t-subtitle" disabled>            |
|     Add thread                               |
|   </button>                                  |
| </div>                                       |
+----------------------------------------------+
```

Shout disabled-primary state until textarea has non-whitespace content. The kebab on `comment-new` carries one action: `Cancel` (dismiss draft, clear `.highlight` from doc body).

### State summary

| State | Surface | Behaviour |
|---|---|---|
| rest | thread (active) | Heading + first 2 messages + reply field. |
| rest | thread (minimized) | Heading only, hidden body. |
| rest | thread (resolved) | Heading with `✓` + snippet + approver byline. |
| rest | thread (archived) | DOM present, `display: none` via `data-archived="true"`. |
| hover | thread heading | Heading row gains 3% surface (`--color-surface-overlay`) per kit `card`. |
| focus | message kebab | Kebab gets focus ring per kit `button`. |
| active | message kebab | Kit's `inspector-card-focus` keyframe runs on the `card--interactive[data-state="active"]` per components.md when the thread promotes. |
| disabled | reply primary | `disabled` attr when textarea is empty / whitespace-only. |
| loading | (none) | The mock pipeline does not loading-skeleton individual threads. |
| empty | comments group | Heading + `t-muted` placeholder. |
| error | reply commit | Server-side reject — out of slice. The slice's `setTimeout` mock never errors. |

## Interaction variants

1. **Operator selects text in doc body.** `comment-new` shout pins at top of the inspector__group. Doc body span wraps in `.highlight`. Operator types in textarea → primary `Add thread` enables. Click commit → shout transforms into `comment-thread`, slots into stack as new active. Previously active thread minimizes.
2. **Operator clicks a minimized thread heading.** Kit's `inspector-card-stack` module: previously active thread minimizes; clicked thread activates with the `inspector-card-focus` keyframe. Operator reads the messages.
3. **Agent run completes (per-section-control fires Improve in place).** Each open thread receives a new `comment-msg` with `data-author-role="agent"`. The kebab menus on agent messages now show the Approve action. Operator has 4 actions per agent message: Approve, Reply, Archive, Delete.
4. **Operator clicks kebab → Approve on an agent message.** Doc body span swaps text, drops `.highlight`. Thread re-renders in `data-state="resolved"` (`comment-thread-resolved` shape). Next minimized thread auto-promotes.
5. **Operator types a reject-with-why reply.** Textarea gets non-whitespace content → primary `Reply` enables. Click commit → `comment-msg` from `Konstantin` posts; thread stays open (no agent reply yet); textarea clears. Operator can fire Improve in place again to send the new reply context to the agent.
6. **Operator clicks kebab → Archive thread.** Thread gets `data-archived="true"`; CSS hides it. The `inspector-card-stack` promotes the next thread to active.
7. **Operator clicks kebab → Delete on a message.** Single `comment-msg` removes from DOM. Thread stays. Used to fix typos in operator's own messages.

## Edge cases

- **Long agent reply (over 8 lines).** `comment-msg` allows full height; `card__collapsible-inner` does not clip. Long replies wrap and the thread scrolls within the collapsible body if needed.
- **Operator opens 50 threads.** Stack scrolls. The `inspector` column has its own scroll context per `manifesto.md § The iPad feel` ("Three panes in one frame, each with its own scroll").
- **Selection in the inspector itself (e.g., copy a thread message).** Browser-native text selection in inspector does NOT trigger `comment-new`. The kit's selection handler scopes to `.book` (doc column) only.
- **Selection clears (operator clicks elsewhere).** `comment-new` stays pinned for 5 seconds, then dismisses if no commit. Doc-body `.highlight` clears with the dismiss.
- **Operator edits the `.highlight` text content via doc-body re-render after Approve.** Highlight drops, span unwraps to plain text — the consumer's Approve handler manages the unwrap.
- **All threads resolved.** Stack carries only `comment-thread-resolved` cards. Heading reads `Comments (0 open · 7 resolved)`. Empty-state placeholder does not render (resolved threads ARE the content).

## Example content

Seven open threads + two resolved threads + zero archived. Threads anchor to strategy subsections.

| Anchor (snippet) | Section · subsection | Operator's note | Agent reply (when present) |
|---|---|---|---|
| `через нетворкинг с фаундерами в Германии` | Strategy · Гипотезы и каналы | `Sharpen the verb here. "Через" reads soft.` | (operator voice) `Sofia находит первого клиента через нетворкинг с фаундерами…` |
| `первый клиент через холодные рассылки` | Strategy · Точка А | `Replace "холодные рассылки" with the actual channel from research.` | — |
| `позиция фаундера-консультанта` | Strategy · Позиционирование | `Tighten this. "Фаундер-консультант" sounds like a job title from a deck.` | — |
| `на горизонте 90 дней` | Strategy · Ближайшие шаги | `90 days too long. 30.` | — |
| `customer-development интервью` | Strategy · Гипотезы и каналы | `Spell out — interview WHO, ASKING WHAT.` | — |
| `немецкий рынок выглядит дорого` | Strategy · Рынок | `"Дорого" needs a number.` | — |
| `оплата за цикл` | Strategy · Как мы работаем | `Replace "за цикл" with "за стратегию".` | — |
| (resolved) `было: «через сообщество»; стало: «через прямую интро в комьюнити Х»` | Strategy · Что обсудили | (Konstantin's resolution) | Approved by Konstantin · 14:02 |
| (resolved) `было: «B2B-продажи»; стало: «продажи фаундерам, не корпоратам»` | Strategy · Точка Б | (Konstantin's resolution) | Approved by Konstantin · 13:48 |

Stage 5 templating fills these into the kit comment markup.

## UI copy drafts

Sentence case throughout. Imperative on actions.

| Surface | String |
|---|---|
| Comments group heading (with open threads) | `Comments (<bold>7</bold> open)` |
| Comments group heading (zero open) | `Comments` |
| Comments group heading (mixed open + resolved) | `Comments (<bold>7</bold> open · <bold>2</bold> resolved)` |
| Empty-state placeholder | `No threads yet. Select text in the strategy to start one.` |
| Thread heading | quoted highlight, prefixed implicitly via card position |
| Thread sub-caption | `Strategy · <subsection> · <N> msgs` |
| Resolved thread heading | `✓ <approved snippet, ~30 chars>` |
| Resolved thread sub-caption | `Approved by Konstantin · <hh:mm>` |
| comment-new heading | `Re: "<highlighted text>"` |
| comment-new sub-caption | `<section> · <subsection>` |
| comment-new placeholder | `Type your note — sharpen, soften, replace.` |
| comment-new primary | `Add thread` |
| comment-new kebab | `Cancel` |
| Reply field placeholder | `Reply with a why, or approve via the kebab.` |
| Reply primary | `Reply` |
| Kebab Approve | `Approve` |
| Kebab Reply | `Reply` |
| Kebab Archive thread | `Archive thread` |
| Kebab Delete | `Delete` |
| Kebab actions aria-label | `Thread actions` |
| Operator byline | `Konstantin` |
| Agent byline | `Agent` |

22 strings. No em-dashes. The reply placeholder uses an em-dash inside body — voice rules permit em-dashes in body, rare. Scan: this is the one body em-dash in the slice; replace with a comma if voice review flags it. Decision: keep — it sets up the option list with a beat.

## Component list

| Class | Count | Role |
|---|---|---|
| `inspector__group` | 1 | Wrapper for the comments group (separate from the stage-card group). |
| `comments-group` | 1 | Inner wrapper per `canon/patterns.md` registry. |
| `card.card--interactive.comment-thread` | N (open + resolved + archived) | Each thread. |
| `card.card--shout.comment-new` | 0..1 | Draft, pinned during selection. |
| `card__heading` | per thread + draft | Holds the thread heading + sub-caption. |
| `card__collapsible` + `card__collapsible-inner` | per active thread | Body of active thread. |
| `comment-msg[data-message-id]` | per message | Each message; `data-author-role="agent"` on agent messages. |
| `comment__menu` | per message | Kebab trigger. |
| `comment__menu-popover` + `comment__menu-item` | per kebab open | Action list. |
| `field` + `field__input` + `field__fake-caret` | per draft + per active reply | Input shapes. |
| `field.comment-thread__reply` | per active thread | Reply input row inside the collapsible. |
| `t-title` | per thread heading + draft heading | Heading text. |
| `t-subtitle` | per thread `<h4>` heading | Quoted snippet. |
| `t-caption` | sub-captions, message bodies | Reading text. |
| `t-caption--bold` | bylines, count numbers | Emphasis. |
| `t-caption.t-muted` | sub-captions, empty-state placeholder | Metadata. |
| `button` + `button--primary` | per draft / reply commit | Action. |
| `t-subtitle` (button label) | per button | Kit-canonical pairing. |
| `[data-state="active|minimized|resolved"]` | per thread | Kit state attribute. |
| `[data-archived="true"]` | per archived thread | Kit hide-via-CSS. |

All from `canon/components.md` + `canon/patterns.md`.

## Inventory check

**Pass.** Every class is canon. The `comment-new` and `comment-thread` modifiers are kit-defined. The `data-state` and `data-archived` attributes are kit-defined. The `comments-group` wrapper is canon-registry. The `inspector__group` wrapping is canon-registry.

The `data-state="resolved"` is reading the canon registry's `comment-thread-resolved` row as a state on the same `comment-thread` card; if the kit ships a separate class instead, the engineer at stage 5 reconciles. Either reading sits inside canon.

## Open to user

**None.** All 10 questions answered.

## Gate

Pass. Goes to 3c.

## Hand-off

→ Stage 3c, `kk-role-fresh-eyes-jobstory` (post-designer mode), pattern `inspector-comment-stack`. Input: this file + `03a-fresh-eyes-pre-inspector-comment-stack.md`.

## Copy revision pass — 2026-04-26

Two 06c flags route to this pattern:

### Item 5 — Reply field placeholder (`index.html:404`)

**Old.** `Reply with a why, or approve via the kebab.`

**Defect.** Instructional placeholder. Voice canon: "Placeholders: real examples, not labels." This placeholder explained the UI rather than showing what a real reply looks like.

**New.** `Sharpen the verb. Make it concrete.`

**Reasoning.** Reads as a real reply an operator might type — the kind of feedback the field IS meant to capture. Two short imperative sentences. Six words. Demonstrates the shape without instructing.

### Item 6 — Thread t-5 ALL CAPS body (`index.html:557`)

**Old.** `Spell out — interview WHO, ASKING WHAT.`

**Defect.** `voice.md § Forbidden` lists ALL CAPS as forbidden across the system, not just headings.

**New.** `Spell out: which founders, asking which questions.`

**Reasoning.** Em-dash replaced with colon (cleaner pause for the kit's voice). ALL CAPS dropped — the explicit prose ("which founders, asking which questions") carries the same emphasis without shouting. Sentence case throughout.

### Updates to UI copy drafts table

| Surface | Was | Now |
|---|---|---|
| Reply field placeholder | `Reply with a why, or approve via the kebab.` | `Sharpen the verb. Make it concrete.` |
| Thread t-5 operator note | `Spell out — interview WHO, ASKING WHAT.` | `Spell out: which founders, asking which questions.` |

Stage 5 engineer applies these strings verbatim. Other 22 strings in this pattern unchanged.
