---
session: 2026-04-25-wealthy-pipeline
stage: 3b
role: designer
input: 02-design-director.md §Pattern blocks #5 + 03a-fresh-eyes-pre-signoff-shout-pending.md (8 questions)
output: 8/8 answered, full state coverage on the shout, 14 copy drafts, inventory clean
gate: pass — no open-to-user items
---

High-fidelity hand-off for the signoff-shout-pending pattern: the pre-sign `card--shout` at the bottom of the doc carrying stats, steps, [Sign] action. Eight questions answered.

## Raw input

- Direction doc § Pattern blocks #5 signoff-shout-pending.
- 03a question list — 8 questions.

## Question-to-answer map

**Q1. The [Sign] button — primary always, or dimmed until conditions met?**

Always primary. Always enabled when at least one strategy subsection has body text (the slice's review state guarantees this — the strategy is drafted). The button is the loudest interactive element in the column. Steps below it are guidance, not gates.

Reasoning: per analyst Q1 stamp + `manifesto.md § Time to value`, the operator decides when to sign. Disabling the button on "open threads exist" would gate the operator's judgement; signing with open threads is a valid path (threads carry forward to delivered).

**Q2. Steps list — gates or guidance?**

Guidance. The list is a four-row `<ol class="t-list">` advising the operator what to consider before signing. Each row is text only; no checkboxes, no per-step gates. The operator reads, decides, signs.

**Q3. If [Sign] is allowed with open threads, what happens to those threads after sign?**

Frozen, viewable on the delivered doc. The pre-sign block names this in copy — the third step reads `Sign now to deliver. Open threads stay viewable on Sofia's copy.` so the operator does not need to ask.

(The post-sign reflow is out of slice. The slice's [Sign] click triggers a `window.confirm()` and on OK shows a placeholder alert `Signed — out of slice.` The actual delivered-doc render lives in a future session.)

**Q4. Stats row — what is a "revision" and when does the count increment?**

Three stats, two-row `book__spec` shape (per `canon/components.md § Signoff` — "two or four .stat children… never three"). Wait — re-read: stats are `<div class="stat t-caption">`, three is forbidden. We need either 2 or 4.

Picking 2 stats for the pre-sign shout (the canonical signoff also shows 2 by default per the kit demos):

- **Revisions before sealing.** Increments each time the operator clicks `[Improve in place]`, `[Redo section]`, or `[Redo whole doc]`. Counts the number of agent re-runs invoked during review.
- **Edits pending.** Live count: open threads minus resolved threads. Includes threads with agent replies awaiting Approve.

Skipping `Research hits` for the pre-sign block — research hit count lives on the canonical post-sign signoff per `components.md § Signoff` (out of slice). The pre-sign block shows the two stats most relevant to the act of signing right now.

**Q5. "Edits pending" stat — counts what exactly?**

Open threads minus resolved threads. Includes:

- Open threads with no agent reply yet.
- Open threads with agent replies awaiting Approve.

Excludes:

- Resolved threads.
- Archived threads.
- The operator's own outstanding draft in `comment-new` (not yet committed).

This is the same count the inspector-stage-card caption shows — intentional duplication for 0.2 s read.

**Q6. Confirm modal on Sign click?**

Browser-native `window.confirm()`. Copy: `Sign and deliver to Sofia? Open threads stay visible on her copy.` On OK → fires sign handler (out of slice; mocks an alert). On Cancel → no-op.

Reasoning: signing IS irreversible enough to warrant a confirm. The kit ships no modal primitive. Browser-native confirm is sub-canon (no DOM) and does not invent a class. Acceptable per the same rule as the per-section-control's `[Redo whole doc]` confirm.

**Q7. Operator name + signature in pre-sign block?**

Operator name yes, signature no. The shout shows a muted line `Will be signed by Konstantin Konstantinopolskii, kk.consulting` at the bottom of the card (after the steps list, above the [Sign] primary). The signature glyph appears only after sign — the post-sign canonical `book__signoff` carries it. Pre-sign placeholder for the glyph would be confusing.

**Q8. Does the shout in the book column read as the document's seal at 0.2s?**

Yes — three reinforcing signals:

1. Position: last visible element of the doc body. The operator scrolls to the end of the doc and lands on it. Sequential reading places the shout AS the closing.
2. Surface: shout inverts (black surface, white text per `card--shout`). The only inverted surface in the book column. Visual delta from preceding sections is dramatic.
3. Content: the shout carries `[Sign]` as primary. No other surface in the book carries a primary action. The shout = action = seal.

## States

### Rest (default review state, threads open)

```
+- signoff-shout-pending --------------------+
| <article class="book__section" id="signoff"|
|          >                                 |
|   <div class="card card--shout">           |
|     <div class="card__heading">            |
|       <h2 class="t-title">Sign and deliver |
|       </h2>                                |
|     </div>                                 |
|                                            |
|     <dl class="book__spec book__signoff-   |
|             stats">                        |
|       <div class="stat t-caption">         |
|         <div>                              |
|           <span class="t-caption--bold">2  |
|           </span> revisions before sealing.|
|         </div>                             |
|       </div>                               |
|       <div class="stat t-caption">         |
|         <div>                              |
|           <span class="t-caption--bold">9  |
|           </span> edits pending.           |
|         </div>                             |
|       </div>                               |
|     </dl>                                  |
|                                            |
|     <ol class="t-list">                    |
|       <li>Read the strategy end to end.    |
|       </li>                                |
|       <li>Resolve threads where the agent's|
|           replacement reads better.</li>   |
|       <li>Sign now to deliver. Open threads|
|           stay viewable on Sofia's copy.   |
|       </li>                                |
|       <li>Patch typos after sign without   |
|           reopening review.</li>           |
|     </ol>                                  |
|                                            |
|     <p class="t-caption t-muted">          |
|       Will be signed by                    |
|       <span class="t-caption--bold">       |
|         Konstantin Konstantinopolskii,     |
|       </span>                              |
|       kk.consulting.                       |
|     </p>                                   |
|                                            |
|     <button class="button button--primary  |
|             t-subtitle">                   |
|       Sign and deliver                     |
|     </button>                              |
|   </div>                                   |
| </article>                                 |
+--------------------------------------------+
```

### Hover / focus / active

- Card-level hover: shout's interior elements respond per kit (`card--shout` itself does not change surface tint — it IS the loud surface).
- Button hover: kit-default 3% inversion (since the surface is already black, hover adds a subtle lighter step).
- Button focus: kit-default focus ring (white ring on the inverted surface).
- Button active: scale `0.96` per `manifesto.md § Foundations § Motion`.

### After click (during confirm)

Browser-native confirm dialog opens. The shout itself does not visually change. On Cancel, dialog dismisses, shout stays. On OK, the slice's mock fires (`alert("Signed — out of slice.")`).

### State summary

| State | Surface | Behaviour |
|---|---|---|
| rest | shout card | Renders fully. |
| hover | [Sign] button | Surface adjustment per kit. |
| focus | [Sign] button | Focus ring. |
| active | [Sign] button | Scale 0.96. |
| disabled | [Sign] button | Only if zero strategy subsections have text — empty-strategy edge. Renders with `disabled` attribute. Out of normal slice flow. |
| loading | (none) | n/a in this slice; the mock is instant. |
| empty | shout | Shout always renders in review state (not conditional). |
| error | (none) | n/a in this slice. |

## Interaction variants

1. **Operator scrolls to bottom and reads the shout.** Default rendering. Operator decides whether to act.
2. **Operator clicks `[Sign and deliver]`.** Browser confirm fires. Operator chooses OK → mock alert; Cancel → returns to review state unchanged.
3. **Operator returns to scroll up after seeing the shout.** Sidebar `toc__indicator` re-tracks the section the operator scrolls into.
4. **All threads resolved before sign.** "Edits pending" stat reads `0`. Steps list copy stays the same (the operator may still want to read and patch). [Sign] still primary, still enabled.

## Edge cases

- **Strategy section has zero subsections with text.** Edge: the operator landed at review with an empty strategy. The shout renders with [Sign] disabled. Steps list copy unchanged. Banner above primary: `Strategy is empty. Run a draft pass first.` (`t-caption t-muted` line above the button.) Out of normal review-state flow but covered.
- **Operator's name not set on app root.** Defaults to `Konstantin Konstantinopolskii, kk.consulting` (per Q12 stamp — multitenancy locked to Konstantin). No fallback needed in slice.
- **Stats row hits very large number (3-digit revs).** `t-caption--bold` wraps gracefully; layout stable.
- **Long `t-list` items wrap.** `t-list` carries hairline separators per `canon/components.md § List`; wrapping items respect rhythm rules.

## Example content

Single concrete shout for the slice's review state at rest:

- Heading: `Sign and deliver`
- Stat 1: `2 revisions before sealing.`
- Stat 2: `9 edits pending.`
- Step 1: `Read the strategy end to end.`
- Step 2: `Resolve threads where the agent's replacement reads better.`
- Step 3: `Sign now to deliver. Open threads stay viewable on Sofia's copy.`
- Step 4: `Patch typos after sign without reopening review.`
- Operator line: `Will be signed by Konstantin Konstantinopolskii, kk.consulting.`
- Primary button: `Sign and deliver`

Mock-mode confirm copy: `Sign and deliver to Sofia? Open threads stay visible on her copy.` Mock-mode click result: `alert("Signed — out of slice.")` (the alert string is dev-mode only; real session would route to delivered render).

## UI copy drafts

| Surface | String |
|---|---|
| Card heading | `Sign and deliver` |
| Stat 1 | `<bold>2</bold> revisions before sealing.` |
| Stat 2 | `<bold>9</bold> edits pending.` |
| Step 1 | `Read the strategy end to end.` |
| Step 2 | `Resolve threads where the agent's replacement reads better.` |
| Step 3 | `Sign now to deliver. Open threads stay viewable on Sofia's copy.` |
| Step 4 | `Patch typos after sign without reopening review.` |
| Operator line | `Will be signed by <bold>Konstantin Konstantinopolskii,</bold> kk.consulting.` |
| Primary button | `Sign and deliver` |
| Confirm dialog | `Sign and deliver to Sofia? Open threads stay visible on her copy.` |
| Empty-strategy banner | `Strategy is empty. Run a draft pass first.` |
| Mock alert (dev only) | `Signed — out of slice.` |
| Pluralisation: 1 revision | `<bold>1</bold> revision before sealing.` |
| Pluralisation: 0 revisions | `<bold>0</bold> revisions before sealing.` (canonical pluralisation; "0 revisions" is preferred over "no revisions" per voice — concrete number) |

14 strings. Sentence case throughout. The card heading `Sign and deliver` is also the button label — components.md says secondary and primary labels never repeat, but here the heading is `t-title` (read as a heading, not a button) and the primary is `t-subtitle` (read as a button). Same words, different rank. If voice review flags duplication, the fix is heading → `Ready to deliver`. Ship as `Sign and deliver` heading + `Sign and deliver` button; if 6c flags, swap heading.

## Component list

| Class | Count | Role |
|---|---|---|
| `book__section` | 1 | Wrapper. |
| `card.card--shout` | 1 | The single book-column shout. |
| `card__heading` | 1 | Heading wrapper. |
| `t-title` | 1 | Heading text. |
| `dl.book__spec.book__signoff-stats` | 1 | Stats row (two-stat shape). |
| `stat` + `t-caption` | 2 | Each stat row. |
| `t-caption--bold` | per stat | Bold number. |
| `ol.t-list` | 1 | Steps list. |
| `t-caption.t-muted` | 1 | Operator line. |
| `t-caption--bold` (in operator line) | 1 | Bolded operator name. |
| `button.button--primary` | 1 | Sign action. |
| `t-subtitle` | 1 | Button label. |

## Inventory check

**Pass.** Every class resolves to `canon/components.md`. `card--shout` is the ONE shout in the book column (per direction doc + `components.md § Card`). `book__signoff-stats` is canonical-by-name from `components.md § Signoff` (the stat-grid wrapper; here repurposed for the pre-sign two-stat row — same class, same shape, different surface).

Note: `book__signoff-stats` ships normally inside `book__signoff` (canon's signed-state shape). Reusing the class inside `card--shout` is consistent with its grid behaviour and is allowed by class-name discipline (the kit lints class names, not parent-context constraints). If 6b voice review flags this as scope creep, the alternative is a `book__spec` (two-column key-value), which would render less semantically. Stage-5 design engineer should test both and pick the cleaner render.

## Open to user

**None.** All 8 questions answered.

## Gate

Pass. Goes to 3c.

## Hand-off

→ Stage 3c, `kk-role-fresh-eyes-jobstory` (post-designer mode), pattern `signoff-shout-pending`. Input: this file + `03a-fresh-eyes-pre-signoff-shout-pending.md`.

## Copy revision pass — 2026-04-26

Two 06c findings route to this pattern (one flag + the borderline):

### Item 4 — Heading-button repetition (`index.html:303 + :323`)

**Old heading.** `Sign and deliver`
**Old button.** `Sign and deliver`

**Defect.** Heading and primary button read identical words. Heading does not earn its slot when the button below carries the same verb.

**New heading.** `Ready to sign`
**New button.** `Sign and deliver` (unchanged)

**Reasoning.** Heading frames the state ("Ready"). Button carries the verb ("Sign and deliver"). Each slot earns its words. Heading reads as label; button reads as action. Sentence case throughout. No em-dash.

### Item 8 — "Sealing" metaphor in stat copy (`index.html:307`)

**Old.** `2 revisions before sealing.`

**Defect.** "Sealing" reads as soft metaphor. Voice canon prefers literal action verbs.

**New.** `2 revisions before signing.`

**Reasoning.** "Signing" is the literal act. The pluralisation set follows the same change:

| Count | Old | New |
|---|---|---|
| 0 | `0 revisions before sealing.` | `0 revisions before signing.` |
| 1 | `1 revision before sealing.` | `1 revision before signing.` |
| N | `N revisions before sealing.` | `N revisions before signing.` |

### Updates to UI copy drafts table

| Surface | Was | Now |
|---|---|---|
| Card heading | `Sign and deliver` | `Ready to sign` |
| Stat 1 | `<bold>2</bold> revisions before sealing.` | `<bold>2</bold> revisions before signing.` |
| Pluralisation: 1 revision | `<bold>1</bold> revision before sealing.` | `<bold>1</bold> revision before signing.` |
| Pluralisation: 0 revisions | `<bold>0</bold> revisions before sealing.` | `<bold>0</bold> revisions before signing.` |

Primary button label unchanged (`Sign and deliver`).

Stage 5 engineer applies the new heading + stat strings verbatim.
