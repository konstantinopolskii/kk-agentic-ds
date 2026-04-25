---
session: 2026-04-25-wealthy-pipeline
stage: 3a
role: fresh-eyes-jobstory (pre-designer)
input: 02-design-director.md §Pattern blocks #1 + 01-analyst.md §Users + §Job stories
output: 10 naive-user questions for the strategy-doc-body block
gate: pending — designer runs next at 3b
---

Naive operator-POV questions on the strategy-doc-body block. Zero design context. Steve Jobs at 0.2 seconds: a doc that does not announce itself, name its subject, or flag its state in one glance is a defect.

## Raw input

- `documentation/2026-04-25-wealthy-pipeline/02-design-director.md § Pattern blocks #1 strategy-doc-body`
- `documentation/2026-04-25-wealthy-pipeline/01-analyst.md § Users (operator) + § Job stories (operator) + § Priority scenarios (1, 2)`

## What I'd want to see first

I land on this screen mid-pipeline. Research is done, agent drafted strategy, I am here to review. At 0.2 seconds:

- Whose strategy is this? Sofia's name should hit me before any heading.
- Is this draft mine or the agent's? Has anything changed since I last read it?
- Where do I start reading? Top of strategy or top of doc?

If I cannot answer those three questions in one glance, the screen failed.

## What I'd try to do

- Scroll. The doc better feel like a doc, not a dashboard.
- Click a section heading. Does it anchor a link? Does the sidebar follow?
- Select a sentence. Something should happen — a highlight, a draft pin somewhere — or selection is dead.
- Find the "Sign" button. I want to know how far the bottom is.

## What this is for

This is the strategy I am about to ship to Sofia. Step 5 of 7 in my own workflow. Brief and research live above; signoff lives below. After sign, this becomes her document.

The agent wrote the prose. I am reading it like an editor. My job here is to find what is wrong, leave threads, and approve the rest.

## Unclarities

- "Brief" section sits at the top. I already committed the brief. Is it still editable here, or is it a frozen record of what I sent?
- The strategy section opens with nine sub-headings (Что обсудили, Точка А, ...). Why nine? Are all nine always required? What if a section is empty?
- "Additional notes" is empty by default. Is that empty-state telling me to write something, or telling me the agent will fill it later?
- Where do I see what the agent changed in this revision vs last? Is there a diff somewhere, or do I read the whole thing again every time?
- A control card under each section — does the section heading still read as a heading at 0.2 seconds, or does the card draw the eye away from the prose?

## 0.2-second check

- Do I know whose strategy this is? (Sofia name on screen before headings.)
- Do I know what stage this doc is at? (Review, mid-pipeline, not delivered.)
- Do I know where to start reading? (Strategy section, not Brief, not Research.)

If any of those three answers requires reading more than one element, the doc failed.

## All questions

1. What is the headline at 0.2 seconds — Sofia's name, the word "Strategy", or the topmost visible section?
2. Does each `book__section` carry its own anchor + scroll-spy hit, or only the top of the doc?
3. The strategy section has nine sub-headings (Что обсудили, Точка А, Точка Б, Видение, Позиционирование, Гипотезы, Рынок, Ближайшие шаги, Как мы работаем). Are all nine always rendered, even when empty? What does the empty subsection look like?
4. The "Brief" section at the top — editable here, or frozen record of what I committed earlier?
5. Where do I see the agent's edits in this revision — inline in the body, or only as comments / threads in the inspector?
6. "Additional notes" empty state — is the prompt "write something if you want", "agent will fill this", or "ignore unless relevant"?
7. When I select text in the body, does anything visible appear immediately — a highlight, a draft pin, a marker?
8. Section heading vs subsection heading — at 0.2 seconds can I tell which level I am on, or do they read as the same rank?
9. Does the doc grow as I work (sections accumulate), or is the shape fixed from the first paint of this state?
10. Is the signoff block at the bottom visible from the first paint of this state, or does it appear when I am closer to done?

## Gate

Pending — `kk-role-designer` answers all 10 questions at 3b for this pattern. Unanswered questions fail at 3c.

## Hand-off

→ Stage 3b, `kk-role-designer`, pattern `strategy-doc-body`. Input: this file + 02-design-director.md §Aligned direction + §Pattern blocks #1.
