---
session: 2026-04-25-wealthy-pipeline
stage: 3a
role: fresh-eyes-jobstory (pre-designer)
input: 02-design-director.md §Pattern blocks #5 + 01-analyst.md §Users + §Job stories
output: 8 naive-user questions for the signoff-shout-pending block
gate: pending — designer runs next at 3b
---

Naive operator-POV questions on the signoff-shout-pending block. The shout at the bottom of the doc carrying stats, steps, and the [Sign] button before sign. At 0.2 seconds: a block that does not announce "this is the seal", its readiness state, and the action is a defect.

## Raw input

- `documentation/2026-04-25-wealthy-pipeline/02-design-director.md § Pattern blocks #5 signoff-shout-pending`
- `documentation/2026-04-25-wealthy-pipeline/01-analyst.md § Users (operator) + § Job stories + § Priority scenarios (1)`

## What I'd want to see first

End of the doc. Loud block. At 0.2 seconds:

- The [Sign] button. Where it is, whether I can press it now.
- "How close am I" — number of open threads, edits pending, anything between me and done.
- Stats that earn the signature: revisions, research hits.

If [Sign] is hidden or buried, the block failed. If I cannot tell at a glance whether I can sign right now, the block failed.

## What I'd try to do

- Click [Sign]. The product's pride moment.
- Skim the steps. See what is left.
- Glance at the stats. Confirm the work is recorded.

## What this is for

The seal. The moment I commit to deliver. Everything above this block is preparation; this block is the act.

The shout shape is correct — this is the loudest thing in the column on purpose. After sign it transforms into the canonical signed block.

## Unclarities

- Steps list — gates (sign refused until all steps done) or guidance (sign always allowed if a draft exists)?
- If [Sign] is enabled with open threads, what happens to those threads after I click? They freeze? Vanish? Stay viewable on the delivered doc?
- "Revisions" and "research hits" stats — what counts, when does it tick?
- "Edits pending" stat — counts thread-pending replies, untouched comments, both, neither?
- After sign click — confirm modal, instant lock, or page reflow?
- Is [Sign] always primary (visually prominent), or does it dim to secondary until conditions met?
- Operator name + signature — present in this pre-sign state, or appears only after sign?
- The shout sits inside the book column. Does that read as "the document's seal" rather than "an action card"?

## 0.2-second check

- At 0.2 seconds, can I sign right now? Are there blockers?
- At 0.2 seconds, do I know what the doc's state is — drafted, reviewed, ready?
- At 0.2 seconds, is this the end of the doc, or a section in the middle?

## All questions

1. The [Sign] button — primary (enabled, prominent) at all times, or dimmed until conditions met? At 0.2 seconds the operator should know if they can act.
2. Steps list — gates (sign refused until all complete) or guidance (sign allowed whenever a strategy subsection has text)?
3. If [Sign] is allowed with open threads, what happens to those threads after sign? Frozen, vanished, viewable on delivered? Pick one.
4. Stats row — what is a "revision" and when does the count increment? Per agent run, per operator approve, per signoff?
5. "Edits pending" stat — counts what exactly? Open threads with no agent reply, agent replies awaiting operator approval, doc-body untouched edits, or some combination?
6. After sign click — instant lock + page reflow, or a confirm modal first? "Sign and deliver to Sofia" is irreversible enough to deserve a confirm.
7. Operator name + signature — present in this pre-sign block (showing where the signature will land), or absent until after sign?
8. The shout sits inside the book column, not the inspector. At 0.2 seconds, does it read as "the document's own seal" rather than "an inspector action that drifted into the doc"? If not, the placement failed.

## Gate

Pending — `kk-role-designer` answers all 8 questions at 3b for this pattern.

## Hand-off

→ Stage 3b, `kk-role-designer`, pattern `signoff-shout-pending`. Input: this file + 02-design-director.md §Aligned direction + §Pattern blocks #5.
