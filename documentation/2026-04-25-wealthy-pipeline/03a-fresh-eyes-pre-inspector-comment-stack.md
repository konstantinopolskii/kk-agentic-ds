---
session: 2026-04-25-wealthy-pipeline
stage: 3a
role: fresh-eyes-jobstory (pre-designer)
input: 02-design-director.md §Pattern blocks #4 + 01-analyst.md §Users + §Job stories
output: 10 naive-user questions for the inspector-comment-stack block
gate: pending — designer runs next at 3b
---

Naive operator-POV questions on the inspector-comment-stack block. The stack of threads in the inspector — open, resolved, draft. At 0.2 seconds: a stack that does not name its count, its order, and its action affordances is a defect.

## Raw input

- `documentation/2026-04-25-wealthy-pipeline/02-design-director.md § Pattern blocks #4 inspector-comment-stack`
- `documentation/2026-04-25-wealthy-pipeline/01-analyst.md § Users (operator) + § Job stories + § Priority scenarios (2, 5)`

## What I'd want to see first

I am the operator. I left threads as I read. The inspector stacks them. At 0.2 seconds:

- How many open threads.
- Which one is currently active (expanded).
- Where the new draft pins when I select text in the doc.

If I have to scan the stack to count opens, the stack failed.

## What I'd try to do

- Click an open thread to expand it.
- Reply inside it.
- Approve the agent's proposed replacement (if there is one).
- Reject the agent's reply with a written reason.
- Archive a thread that is done.
- Select a sentence in the doc — a draft should pin somewhere here.

## What this is for

The bidirectional channel between operator and agent on the strategy. Where I leave notes, where the agent answers, where I commit or push back.

The operator's whole edit loop happens here. If this block reads wrong at 0.2 seconds, the product reads wrong.

## Unclarities

- Where does a new draft pin in the stack — top, bottom, replacing a slot?
- The kebab menu — what do its actions do, and which are visible per state?
- Can I have two threads open at once?
- Approve — what visibly happens to the thread, the highlight in the doc, the inspector layout?
- Reject without a written why — does the UI refuse?
- Archived — gone forever, hidden, or recoverable?
- Resolved threads — do they pile at the bottom, fall off, or render as a stamp?
- Agent reply vs my reply inside a thread — what makes them visually distinct?
- Empty state (no threads yet) — what does the inspector show?
- Draft state (mid-selection) — does it visually replace the stack, sit on top, or pin among the threads?

## 0.2-second check

- At 0.2 seconds, how many open threads?
- At 0.2 seconds, which thread is active?
- At 0.2 seconds, where do I add a new thread? (Hint: select text in the doc.)

## All questions

1. At 0.2 seconds, how many open threads do I see, and which one is active (expanded)?
2. When I select text in the doc, where does the new draft (`comment-new`) pin in this stack — top, anchored to the highlight position, or floating outside the stack?
3. Inside an active thread, what visually distinguishes the agent's reply from my own — byline, surface tint, an icon, position in the list, or just text content?
4. The kebab menu carries Approve, Reply, Archive, Delete. Are all four always shown, or do some hide depending on the thread's state (e.g., Approve only when last message is from agent)?
5. Approve — what visibly happens? Does the thread collapse to a resolved stamp? Does the highlight in the doc body update to the agent's proposed replacement? Both? Neither?
6. Reject with a written why — does the UI refuse a reject submission with an empty reason? At 0.2 seconds, does the operator know the why field is required?
7. Archived threads — gone from view forever, or hidden in a "show archived" affordance somewhere?
8. Resolved threads — pile at the bottom of the stack, or fall away after a delay, or stay in place but render as a check stamp?
9. Can I have two threads expanded at once, or does opening one collapse the other (one-active-at-a-time)?
10. Empty state, no threads yet — what does the stack show? An empty card? A sentence? Nothing?

## Gate

Pending — `kk-role-designer` answers all 10 questions at 3b for this pattern.

## Hand-off

→ Stage 3b, `kk-role-designer`, pattern `inspector-comment-stack`. Input: this file + 02-design-director.md §Aligned direction + §Pattern blocks #4.
