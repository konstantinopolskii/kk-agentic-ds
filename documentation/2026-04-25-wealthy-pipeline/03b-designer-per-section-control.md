---
session: 2026-04-25-wealthy-pipeline
stage: 3b
role: designer
input: 02-design-director.md §Pattern blocks #2 + 03a-fresh-eyes-pre-per-section-control.md (7 questions)
output: 7/7 answered, full state coverage, 12 copy drafts, inventory clean
gate: pass — no open-to-user items
---

High-fidelity hand-off for the per-section-control pattern: static card under each top-level section carrying a thread-count line and a regen action row. Seven questions answered.

## Raw input

- Direction doc § Pattern blocks #2 per-section-control.
- 03a question list — 7 questions.

## Question-to-answer map

**Q1. At 0.2 seconds, which section does this card control?**

The card sits as the LAST child inside its `book__section`, after every body paragraph and before the section's closing `</article>` tag. Vertical position pins it to its section visually. ASCII below shows the position.

The card's heading carries no section name (the section h2 above already names it); the count line and buttons carry the action. Repeating the section name would violate `manifesto.md § Pure signal` (no redundant labels).

**Q2. Three buttons in a row — `[Improve in place]`, `[Redo section]`, `[Redo whole doc]`. Which is the primary?**

`[Improve in place]` is the primary on every per-section-control card (`button.button--primary`). The two right-side buttons are secondaries (`button` only). Reasoning, anchored:

- Primary scope is the most-frequent regen mode per the operator job story (`01-analyst.md § Job stories`): the operator opens 5–10 threads, then asks the agent to "improve" the section using those threads as context. Replacing the section wholesale is rarer; replacing the whole doc rarer still.
- One primary per card per `components.md § Card`. Three buttons with three primaries would dilute the 80/20 signal.

The choice is consistent across every per-section-control card.

**Q3. Zero threads on a section — does the card render?**

No. Card hides entirely when `data-thread-count="0"`. Reasoning: `manifesto.md § Pure signal` rejects a UI element whose only state is a no-op. Operator scrolls through the section, hits the next section header without a control card in the way. When the operator opens the first thread on the section, the card materialises.

(The Strategy section's card is a single card controlling all 9 subsections; if Strategy has zero threads, the Strategy card hides too.)

**Q4. Does the count line refresh live as I add threads, or only at agent run?**

Live. The count is a `t-caption` rendering the live thread count anchored to the section. Add a thread → number ticks up. Approve / archive a thread → number ticks down. The rerun action does not change the count; only thread lifecycle does.

**Q5. Is `[Redo whole doc]` an immediate fire, or does it open a confirm?**

Confirm via `window.confirm()` (browser-native). Copy: `Replace the entire strategy? Open threads stay.` On OK → fire; on Cancel → no-op.

Reasoning: `[Redo whole doc]` is destructive (replaces every accepted body paragraph in the strategy). Browser-native confirm is sub-canon (no DOM-level component) but allowed because the kit ships no modal primitive and the slice already uses one shout per column (the signoff). Adding a second `card--shout` for confirm would violate `components.md § Card` ("One shout per column").

`[Improve in place]` and `[Redo section]` fire instantly without confirm; both are recoverable (operator can rerun, threads stay).

**Q6. Does this card appear under sub-sections of the strategy block, or only at the section level?**

Top-level sections only. Strategy's nine subsections (Что обсудили, Точка А, …) do NOT carry their own per-section-control cards. A single per-section-control card sits at the bottom of the Strategy section, controlling regen across all 9 subsections.

Reasoning: nine cards would create wallpaper noise inside Strategy and burden the operator with subsection-scope ambiguity. Section-scope is the right granularity per `manifesto.md § Chunking` ("seven items").

Cards appear under: Research 1 + Strategy. Brief and Additional notes do not carry control cards (Brief is read-only frozen record; Additional notes is operator-authored prose).

**Q7. Imperative verbs, sentence case?**

Yes. All three labels are imperative-verb sentence-case: `Improve in place`, `Redo section`, `Redo whole doc`. No em-dashes. No Title Case.

## States

```
+- per-section-control (rest, with threads) ----------+
| <div class="card">                                  |
|   <div class="card__heading">                       |
|     <p class="t-caption">                           |
|       <span class="t-caption--bold">7</span> threads|
|     </p>                                            |
|   </div>                                            |
|   <button class="button button--primary t-subtitle">|
|     Improve in place                                |
|   </button>                                         |
|   <button class="button t-subtitle">                |
|     Redo section                                    |
|   </button>                                         |
|   <button class="button t-subtitle">                |
|     Redo whole doc                                  |
|   </button>                                         |
| </div>                                              |
+-----------------------------------------------------+
```

```
+- per-section-control (zero threads, hidden) --------+
| <!-- card not rendered when thread-count = 0 -->    |
+-----------------------------------------------------+
```

```
+- per-section-control (one thread) ------------------+
| <div class="card">                                  |
|   <div class="card__heading">                       |
|     <p class="t-caption">                           |
|       <span class="t-caption--bold">1</span> thread |
|     </p>                                            |
|   </div>                                            |
|   <button class="button button--primary t-subtitle">|
|     Improve in place                                |
|   </button>                                         |
|   ...                                               |
+-----------------------------------------------------+
```

Singular / plural copy: `1 thread` vs `7 threads` (no "s" on 1). Stage-5 templating handles the morpheme.

```
+- per-section-control (loading after click) ---------+
| Primary button shows the kit's button-active        |
| feedback (scale 0.96, 200 ms ease-out per           |
| components.md § Foundations § Motion). After click, |
| primary disables (`disabled` attr) for the duration |
| of the agent run. Count line updates to             |
| "Working… 7 threads." Spinner-free; the disable +   |
| copy change carries the loading signal.             |
+-----------------------------------------------------+
```

| State | Behaviour |
|---|---|
| rest | `data-thread-count >= 1`, all three buttons enabled. |
| hover | Inherits `card` hover surface (3% via `--color-surface-overlay`). Per-button hover inherits `button`. |
| focus | Per-button focus ring per kit. `card` itself is not focusable. |
| active | Pressed button scales to `0.96` per kit motion. |
| disabled (during agent run) | All three buttons get `disabled` attr; count line changes to `Working…`. |
| loading | Same as disabled; no separate loader. |
| empty (zero threads) | Card hides entirely. |
| error (agent run failed) | Buttons re-enable; count line shows `Last run failed. Try again.` for one cycle, then reverts. |

## Interaction variants

1. **Operator clicks `[Improve in place]` (primary).** Buttons disable; count line → `Working… 7 threads.` Agent processes threads in order, posts replacements as agent-author messages inside each thread. On complete: buttons re-enable; count line returns to live thread count.
2. **Operator clicks `[Redo section]` (secondary).** Same handler shape as primary, with broader scope: agent rewrites the section's body paragraphs and posts a single agent-author message in each thread saying "Replaced this section. New text above." No confirm.
3. **Operator clicks `[Redo whole doc]` (secondary).** Browser confirm fires first (`Replace the entire strategy? Open threads stay.`). On OK: ALL per-section-control cards across the doc disable for the duration. Agent rewrites every section. Threads stay visible.
4. **Agent run fails.** Buttons re-enable; count line briefly shows `Last run failed. Try again.` (3-second auto-revert). Operator can retry by clicking the same button. Single-flight: clicks during the run are ignored (button disabled).

## Edge cases

- **Operator clicks two cards' primaries in sequence.** Single agent run queue: the second click queues; the second card disables until first completes. Status line shows `Queued.`
- **Agent run finishes with zero changes.** Threads stay open with no agent reply (no proposal landed). Operator's recourse: edit thread directly with manual reply, or rerun.
- **Network interruption mid-run.** Browser-native: out of slice. The slice mocks the agent run with a 1.5 s `setTimeout`.

## Example content

Three concrete cards:

- Research 1 card: `2 threads.` Buttons fire research-scoped redo (semantic — replace research labels: `Implement comments in research`, `Redo research`, `+ Add research`). **Caveat:** the research card uses different button labels per the canonical handoff §4.3 — not strategy-control labels. See variant below.
- Strategy card: `7 threads.` Standard labels.
- Additional notes card: hidden (no threads expected — the section is operator-authored prose).

Research-section variant (label override):

| Slot | Strategy / default labels | Research card override |
|---|---|---|
| Primary | `Improve in place` | `Implement comments in research` |
| Secondary 1 | `Redo section` | `Redo research` (confirm: `Replace research findings? Open threads stay.`) |
| Secondary 2 | `Redo whole doc` | `Add research` (additive — spawns a new `#research-N` section, prompt seeded from accumulated comments) |

The research card's Primary handler differs in scope from strategy's Primary; both are kit-canonical (`button.button--primary`). The override stays inside this pattern's contract — no new classes.

## UI copy drafts

| Surface | String |
|---|---|
| Count line, plural | `<span class="t-caption--bold">7</span> threads` |
| Count line, singular | `<span class="t-caption--bold">1</span> thread` |
| Strategy primary | `Improve in place` |
| Strategy secondary 1 | `Redo section` |
| Strategy secondary 2 | `Redo whole doc` |
| Research primary | `Implement comments in research` |
| Research secondary 1 | `Redo research` |
| Research secondary 2 | `Add research` |
| Confirm `[Redo whole doc]` | `Replace the entire strategy? Open threads stay.` |
| Confirm `[Redo research]` | `Replace research findings? Open threads stay.` |
| Loading line | `Working… 7 threads.` (live count interpolated) |
| Queued line | `Queued.` |
| Error line | `Last run failed. Try again.` |

All sentence case. All buttons imperative. No em-dashes. "Working…" uses ellipsis (`…` Unicode), not three periods.

## Component list

| Class | Count per card | Role |
|---|---|---|
| `card` (static) | 1 | Wrapper. |
| `card__heading` | 1 | Holds the count line. |
| `t-caption` | 1 | Count line text. |
| `t-caption--bold` | 1 | Number inside count line. |
| `button` | 2 | Secondary buttons. |
| `button.button--primary` | 1 | Primary scope. |
| `t-subtitle` | 3 | Button labels (kit-canonical pairing per components.md § Card). |

Per-doc count (review state): 2 cards rendered at rest (Research, Strategy). Brief and Additional notes do not get cards. Strategy card carries strategy labels; Research card carries research-variant labels.

## Inventory check

**Pass.** Every class resolves to `canon/components.md`. Static `card`, no `card--interactive` (the card has no hidden content; only buttons in a row). One primary per card. No `card--shout` (the slice's single book-column shout is reserved for signoff). No invention.

## Open to user

**None.** All 7 questions answered.

## Gate

Pass. Goes to 3c.

## Hand-off

→ Stage 3c, `kk-role-fresh-eyes-jobstory` (post-designer mode), pattern `per-section-control`. Input: this file + `03a-fresh-eyes-pre-per-section-control.md`.

## Copy revision pass — 2026-04-26

One 06c flag routes to this pattern:

### Item 2 — Research card primary label (`index.html:218`)

**Old.** `Implement comments in research`

**Defect.** 28 chars, exceeds practical button ceiling. Long primary label reads as instruction, not action.

**New.** `Apply comments`

**Reasoning.** 14 chars. Imperative verb. Names the outcome. Sentence case. Same scope (the agent applies operator comments to the research findings). The verb "apply" reads as cleaner action than "implement" without losing meaning.

### Updates to UI copy drafts table

| Surface | Was | Now |
|---|---|---|
| Research primary | `Implement comments in research` | `Apply comments` |

Strategy variant labels unchanged (`Improve in place` / `Redo section` / `Redo whole doc` all under 16 chars).

Stage 5 engineer applies the new label verbatim.
