---
session: 2026-04-25-wealthy-pipeline
stage: 3a
role: fresh-eyes-jobstory (pre-designer)
input: 02-design-director.md §Pattern blocks #2 + 01-analyst.md §Users + §Job stories
output: 7 naive-user questions for the per-section-control block
gate: pending — designer runs next at 3b
---

Naive operator-POV questions on the per-section-control block. A card under each section telling me what to do about its threads. At 0.2 seconds: a card that does not name its section, its action, and its scope is a defect.

## Raw input

- `documentation/2026-04-25-wealthy-pipeline/02-design-director.md § Pattern blocks #2 per-section-control`
- `documentation/2026-04-25-wealthy-pipeline/01-analyst.md § Users (operator) + § Job stories + § Priority scenarios (2)`

## What I'd want to see first

I just finished reading a section of the strategy. Beneath the prose I see this card. At 0.2 seconds:

- How many threads sit on this section?
- What is the one action I am supposed to do — redo, improve, leave alone?

If the card requires reading more than the count and the primary button to know what to do, it failed.

## What I'd try to do

- Click the primary button. It should kick off the most-likely action: agent walks open threads on this section, drops in proposed replacements.
- Skim the secondaries. They should read as "narrower" or "broader" actions.
- See zero threads — and wonder if the card disappears or stays as a quiet "nothing to do here" line.

## What this is for

Closing the loop on a section. I leave threads, agent answers, I approve, agent re-runs if I rejected. This card is the trigger for the agent's next pass on this section's threads.

It belongs to the section above it, not the section below.

## Unclarities

- Three buttons in a row. Which is the default I should reach for? Why that one?
- "Improve in place" vs "Redo section" vs "Redo whole doc" — what's the actual difference at the operator's eye? Is one destructive?
- Does "Redo whole doc" appear on every section card, or only on one card? If on every one, that is wasteful repetition.
- The count line — does it tick live as I add threads, or only after a redo?
- Is the primary button enabled when there are zero threads? "Improve in place with no comments" sounds like a no-op.

## 0.2-second check

- Do I know which section this card controls without looking up?
- Do I know which action is the default (the primary)?
- Do I know whether the action is destructive or safe?

## All questions

1. At 0.2 seconds, which section does this card control? Does it sit visibly close enough to its section heading that I never have to scroll up to check?
2. Three buttons sit in a row — `[Improve in place]`, `[Redo section]`, `[Redo whole doc]`. Which is the primary, why, and is the choice consistent across every per-section-control card on the page?
3. Zero threads on a section — does the card render in a "nothing to do" state, or vanish?
4. Does the count line refresh live as I add threads in the inspector, or only on agent run?
5. Is `[Redo whole doc]` an immediate fire, or does it open a confirm? Anything destructive (replaces work) needs a confirm.
6. Does this card appear under every section, including sub-sections of the strategy block, or only at the top-level book__section level?
7. Secondary button labels — read as imperative verbs ("Redo section") or as nouns ("Section redo")? The former wins; flag if the designer reaches for the latter.

## Gate

Pending — `kk-role-designer` answers all 7 questions at 3b for this pattern.

## Hand-off

→ Stage 3b, `kk-role-designer`, pattern `per-section-control`. Input: this file + 02-design-director.md §Aligned direction + §Pattern blocks #2.
