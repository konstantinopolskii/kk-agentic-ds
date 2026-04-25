---
session: 2026-04-25-wealthy-pipeline
stage: 3a
role: fresh-eyes-jobstory (pre-designer)
input: 02-design-director.md §Pattern blocks #3 + 01-analyst.md §Users + §Job stories
output: 7 naive-user questions for the inspector-stage-card block
gate: pending — designer runs next at 3b
---

Naive operator-POV questions on the inspector-stage-card block. A card at the top of the inspector saying which stage I am on. At 0.2 seconds: a card that does not announce its purpose, its current value, or its bounds is a defect.

## Raw input

- `documentation/2026-04-25-wealthy-pipeline/02-design-director.md § Pattern blocks #3 inspector-stage-card`
- `documentation/2026-04-25-wealthy-pipeline/01-analyst.md § Users (operator) + § Job stories + § Priority scenarios (1)`

## What I'd want to see first

The inspector is the right column. Top of it. Quiet card. At 0.2 seconds I want:

- Which stage am I on (review, signoff, brief — name).
- How many stages remain.
- Anything urgent on this stage that needs my action right now.

If I cannot read those three from one card, the card failed.

## What I'd try to do

- Click a past stage. Does it take me back? Does it expand into a recap?
- Click a future stage. Probably nothing — maybe disabled visual.
- Hover the active stage indicator. Does it tooltip? Does it move?

## What this is for

Letting me know where I am in the pipeline without having to count headings or scroll. A breadcrumb. A pin on the map.

It is not where I act. Actions live on per-section controls and on signoff. This card is read-only by intent.

## Unclarities

- One static card with one heading + one caption. Is that all? No glyph, no list of seven stages?
- If it is just heading + caption, I have to read prose to know which stage I am on. That feels weak.
- Does the card change shape between stages, or stay the same and just swap copy?
- Is there a count somewhere — "5 of 7" — or just the stage name?
- Why a card and not a tag or a single line?

## 0.2-second check

- At 0.2 seconds, which stage am I on?
- At 0.2 seconds, how many stages remain?
- At 0.2 seconds, is the card asking me to do something, or just informing?

## All questions

1. At 0.2 seconds, which pipeline stage am I on, and how many of the seven remain? Single glance — name + position.
2. Are past stages clickable to navigate back, or read-only?
3. Are future stages disabled (visible but greyed), or hidden entirely?
4. The caption line ("Stage 5 of 7. 9 open threads to resolve.") — does it duplicate what the comment stack below already shows, or carry information the stack does not?
5. Does the card shape change across the seven stages (different content for brief vs review vs signoff), or stay consistent in shape and only swap copy?
6. Why a card and not a smaller indicator (a single tag, a one-line text)? What does the card frame add that justifies the space?
7. Is there a glyph or marker next to the active stage, and does it move with progress? If it does not appear, the active stage has to be obvious from the heading alone.

## Gate

Pending — `kk-role-designer` answers all 7 questions at 3b for this pattern.

## Hand-off

→ Stage 3b, `kk-role-designer`, pattern `inspector-stage-card`. Input: this file + 02-design-director.md §Aligned direction + §Pattern blocks #3.
