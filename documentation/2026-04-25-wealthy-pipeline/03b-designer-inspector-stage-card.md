---
session: 2026-04-25-wealthy-pipeline
stage: 3b
role: designer
input: 02-design-director.md §Pattern blocks #3 + 03a-fresh-eyes-pre-inspector-stage-card.md (7 questions)
output: 7/7 answered, static card with one rendered shape, 8 copy drafts, inventory clean
gate: pass — no open-to-user items
---

High-fidelity hand-off for the inspector-stage-card pattern: single static card at the top of the inspector, ambient stage indicator. Seven questions answered.

## Raw input

- Direction doc § Pattern blocks #3 inspector-stage-card.
- 03a question list — 7 questions.

## Question-to-answer map

**Q1. At 0.2 seconds, which pipeline stage am I on, and how many of the seven remain?**

The card heading reads, in one line: `Stage 5 of 7. Review.` Bold number, sentence-cased label. The position (`5 of 7`) and the name (`Review`) both land in `t-title` text on the same line.

```
+- inspector-stage-card heading -----------+
| <h3 class="t-title">                     |
|   <span class="t-caption--bold">5 of 7   |
|   </span> · Review                       |
| </h3>                                    |
+------------------------------------------+
```

The dot separator (` · `) is a Unicode middle dot, not an em-dash. Voice clean.

**Q2. Are past stages clickable to navigate back, or read-only?**

Read-only. Past stages do not appear in this card at all (card surfaces ONE stage — the current). Stage navigation is out of slice; in production it would live elsewhere (sidebar nav or workflow header). The slice's review state assumes the operator is at stage 5; navigation back is not a review-state concern.

**Q3. Are future stages disabled, or hidden?**

Hidden. Same reasoning as Q2 — the card carries the current stage only. Including all 7 stages as a list would compete with the comment stack below for inspector real estate; per the direction doc's Document-first commitment, the inspector compresses.

**Q4. Does the caption line duplicate what the comment stack shows, or carry information the stack does not?**

Carries one piece the stack does NOT: stage context. The comment stack shows N threads; the card's caption shows `Stage 5 of 7. 9 open threads to resolve.` — the threads count cross-checks the stack at 0.2 s without scrolling, AND the stage position frames the threads as "reviewable now, not premature".

The duplication is intentional (the threads count appears twice — heading caption + stack itself). Per `manifesto.md § Time to value`, the goal is fastest path to insight; redundancy that costs nothing buys the operator a glance-only confirmation.

**Q5. Does the card shape change across the seven stages, or stay consistent?**

Stays consistent in shape. Static `card`, one heading line, one caption line. Copy varies by stage:

| Stage | Heading line | Caption line |
|---|---|---|
| 1 | `1 of 7 · Brief` | `Tell the agent who Sofia is.` |
| 2 | `2 of 7 · Prompt` | `Approve the research prompt the agent drafted.` |
| 3 | `3 of 7 · Research` | `12 sources accepted, 3 pruned. Greenlight or refine.` |
| 4 | `4 of 7 · Draft` | `The agent is writing. 3 sections in.` |
| 5 | `5 of 7 · Review` | `9 open threads to resolve.` |
| 6 | `6 of 7 · Signoff` | `Ready to sign and deliver.` |
| 7 | `7 of 7 · Delivered` | `Sent to Sofia. 0 client comments.` |

Out of slice (this designer hand-off ships only stage 5's copy); the table above documents the pattern's behaviour for downstream sessions.

**Q6. Why a card and not a smaller indicator (a single tag, a one-line text)?**

Three reasons:

- The card frame matches the inspector's surface vocabulary. Inspector renders `inspector__group` with cards; tag-only or text-only indicators would break the surface rhythm.
- A `tag` is metadata (`components.md § Tag`: "metadata pill. Never clickable. … never an input trigger."). The stage indicator carries the same semantic — read-only metadata — but with two strings (heading + caption); tag is single-string.
- The card gives the indicator presence without volume. A `card--shout` would shout (forbidden — direction doc reserves the book column shout for signoff). A static `card` carries the right weight: visible, not loud.

**Q7. Is there a glyph next to the active stage?**

No glyph. The single line `5 of 7 · Review` carries the position via the number. A glyph would compete with the number for the same job (mark progress).

## States

```
+- inspector top, with the stage card -------+
| <aside class="inspector"                   |
|        aria-label="References">            |
|   <section class="inspector__group">       |
|     <div class="card">                     |
|       <div class="card__heading">          |
|         <h3 class="t-title">               |
|           <span class="t-caption--bold">   |
|             5 of 7                         |
|           </span> · Review                 |
|         </h3>                              |
|         <p class="t-caption">              |
|           9 open threads to resolve.       |
|         </p>                               |
|       </div>                               |
|     </div>                                 |
|   </section>                               |
|   <!-- comments-group below -->            |
| </aside>                                   |
+--------------------------------------------+
```

Static surface. No interactive states (no hover gain beyond static-card's ambient hover, no focus, no active, no disabled, no loading). Empty-state handling for the caption (zero threads): caption swaps to `All threads resolved. Sign anytime.` — see UI copy table.

| State | Behaviour |
|---|---|
| rest | Always rendered when `data-stage` is set on the app root. |
| hover | Inherits static-card ambient hover (3% surface fill). No additional behaviour. |
| focus | Card is not focusable. |
| active | n/a. |
| disabled | n/a. |
| loading | n/a (stage transitions are instant; inter-stage loading lives elsewhere). |
| empty | Caption swaps copy when thread count = 0; card stays. |
| error | n/a. |

## Interaction variants

1. **Operator at stage 5 with open threads.** Default rendering (above).
2. **Operator at stage 5 with all threads resolved.** Caption: `All threads resolved. Sign anytime.` Heading unchanged.
3. **Operator at stage 5 with mixed open + agent-replied threads.** Caption breaks down: `9 open · 3 awaiting your approve.` Two facts, one line. The "awaiting approve" count is the agent-replied-but-operator-untouched subset.

## Edge cases

- **Stage transition in flight.** Out of slice. The slice is review state at rest.
- **Stage data missing on app root.** Card renders skeleton text `— · —` and the design engineer logs a console warning. Production never reaches this; the slice mocks `data-stage="5"` directly.
- **Caption string longer than the inspector width.** `t-caption` wraps to 2 lines. Spec keeps caption lines short to avoid wrap; if a future stage needs more, refactor to a `book__spec` inside the card.

## Example content

Stage 5 review state, 9 open threads, 3 with agent replies pending operator review:

- Heading: `5 of 7 · Review`
- Caption variant A (default, all open): `9 open threads to resolve.`
- Caption variant B (mixed open + replied): `9 open · 3 awaiting your approve.`
- Caption variant C (all resolved): `All threads resolved. Sign anytime.`

The slice ships variant A as the default render; B and C are stamped for state coverage.

## UI copy drafts

| Surface | String |
|---|---|
| Heading number | `5 of 7` (bold span) |
| Heading separator | ` · ` (Unicode middle dot, no spaces around it broken at the heading level — pattern: `<bold>N of M</bold> · <name>`) |
| Heading name (stage 5) | `Review` |
| Caption, default | `9 open threads to resolve.` |
| Caption, mixed | `9 open · 3 awaiting your approve.` |
| Caption, all resolved | `All threads resolved. Sign anytime.` |
| Skeleton fallback | `— · —` |

Eight strings total (counts + variants). Sentence case. No em-dashes. Numbers render as digits, not words.

## Component list

| Class | Count | Role |
|---|---|---|
| `inspector` | 1 (shared with comment stack) | Right column. |
| `inspector__group` | 1 | Wrapper for the stage card (`inspector-group` pattern from `canon/patterns.md`). |
| `card` (static) | 1 | The stage indicator. |
| `card__heading` | 1 | Holds heading + caption. |
| `t-title` | 1 | Heading line. |
| `t-caption--bold` | 1 | Inline bold number inside heading. |
| `t-caption` | 1 | Caption line. |

## Inventory check

**Pass.** Static `card`, single heading. No interactivity. No invented classes. No off-grid spacing — `card` and `card__heading` carry kit-defined spacing. The `inspector__group` wrapping is canonical per `canon/patterns.md § Registry — inspector-group`.

## Open to user

**None.** All 7 questions answered.

## Gate

Pass. Goes to 3c.

## Hand-off

→ Stage 3c, `kk-role-fresh-eyes-jobstory` (post-designer mode), pattern `inspector-stage-card`. Input: this file + `03a-fresh-eyes-pre-inspector-stage-card.md`.
