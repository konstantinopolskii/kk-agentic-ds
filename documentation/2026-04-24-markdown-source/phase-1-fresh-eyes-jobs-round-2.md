---
session: 2026-04-24-markdown-source
stage: phase-1-fresh-eyes-round-2
role: fresh-eyes-jobstory
input: demos/md-renderer-smoke/index.html + sample-a.md + sample-b.md + sample-c.md + screenshots/jobs-rework-*
output: cold re-audit of md-renderer smoke test against 14+2 typography rules
gate: FAIL
---

Second cold pass on the md-renderer smoke test. Read the shell, the three source files, the four fresh screenshots. No self-doc. No prior Jobs pass. No DS audit. No voice audit.

## What I see

Three columns. Left: sidebar. "Smoke" at top. "Samples" below it, then "Sample A, Sample B, Sample C" stacked. Center: a giant "md.js smoke test" headline. A paragraph. Below: another giant headline "Samples". Below that: a third giant headline "Sample A", same weight, same size. A body paragraph. Right: "Notes" title with two small cards "Renderer is dumb" and "Console".

Scroll down: more of the same pattern. Every article opens with a hero-sized name. Inside: "Section heading" at display size. Below that: "Card-level heading" at title. Below that: "Subtitle-level heading" at subtitle. Sample B has a table with four rows. A blockquote in italic. A code block. A horizontal rule. A second blockquote. Sample C embeds two cards drawn from raw HTML.

## What I can do

Read. Click sidebar links to jump. Click the two inline links. Nothing else. No toggles, no filters, no state.

## What this is for

Internal test harness. The engineer renders three markdown files into a real kit shell and eyeballs whether the classes attach cleanly. Target user: the kit maintainer. Not an end user. Job: confirm the renderer produces a doc that reads like a hand-authored doc, not a demo fixture.

## What's great

One thing. The table in Sample B. Classes snap on, row rhythm matches registry-table, scanable at 0.2 s.

The label-list pair pattern works. "Unordered list:" sits visually tight to the list that follows. Eye groups them. Rule 14 holds here.

## What could be better

Typography violations first.

**Defect 1. Three hero-sized headings stack on the first viewport with no hierarchy step.** Rule 12, rule 14. At 0.2 s I count: "md.js smoke test" (hero), "Samples" (hero, as `.doc__part`), "Sample A" (hero, from `h1` → `t-hero`). Same size, same weight, same letter-spacing. The eye cannot tell which is the page title, which is the part label, which is the article name. Flat hierarchy is a defect. Either demote the article `h1` to display or demote the part heading. Pick one hero per scroll. Two hero-sized headings 80 px apart is a rule 14 failure on visual grouping — the "part" wrapper is supposed to be a bigger-than-section outer, but if the section's own opener is the same hero size, the outer never reads as bigger than the inner.

**Defect 2. Sample A opens with "Sample A" and Sample B opens with "Sample B" — so what?** Not a typography rule, but it is a 0.2-second clarity break. In a renderer smoke test the useful title would be what each sample proves, not a file-name echo. "Core prose path", "Dense blocks", "Raw HTML passthrough". I understand this is content, not shell — but the content drives the perceived quality of the shell. At 0.2 s three giant "Sample A / B / C" headings scream fixture, not doc.

**Defect 3. The intro paragraph sits alone above the "Samples" part heading with no rule 12 asymmetry I can verify by eye.** Looking at the viewport crop: gap above "Samples" (from end of intro) reads very close to the gap below (to "Sample A"). Rule 12 demands ≥ 2:1 top-to-bottom on the part heading. I cannot measure from a screenshot, but the eye does not read "Samples belongs to what follows" — it reads as floating between the intro and Sample A. Either the top gap is not ≥ 2× or the fact that both neighbours are also hero-sized kills the asymmetry cue.

**Defect 4. Sample A's h4 "Subtitle-level heading" has a body paragraph immediately below that reads cramped.** Rule 13 demands heading-to-paragraph gap ≥ heading's own line-height. Subtitle line-height is small — the gap still has to clear it. On the full-4800 screenshot the gap under "Subtitle-level heading" reads equal to or smaller than the gap between the paragraphs above it. Cannot tell at 0.2 s whether the subtitle leads the paragraph or trails the one above. Rule 12 smell.

**Defect 5. Blockquote in Sample B renders in muted color and italic book weight.** Check the MEMORY rule: body + structural text renders black + Medium 500. Light weight and muted color forbidden unless metadata. A blockquote is content, not metadata. Voice rule, but it lands visually: the quote looks quieter than the body it cites. On a 0.2 s scan the quote disappears against the surrounding black paragraphs. If the kit's `quote` class does this by design, this is a kit rule to revisit, not a demo fix — but it reads as a defect in the render.

**Defect 6. "After the rule" section reads as if the horizontal rule IS the heading.** The HR sits between the code block and "After the rule" h2. The HR has its own vertical real estate, then the h2 sits a beat below. The eye groups the HR with the heading beneath it, not with the content above. Rule 12 failure — the HR's "below" gap is tighter than its "above" gap, so it reads as a lead-in to what follows instead of a separator from what preceded. The `---` in markdown means "and now something else" — it should read that way, not as decoration under "Fenced code block".

**Defect 7. Sample C's embedded card sits in the flow at full card width and reads as a page-level card, not a demo of what-a-card-looks-like-in-markdown.** At 0.2 s the card does not signal "I am an illustration". It signals "I am a callout you should read". A demo card inside prose needs a framing cue — a caption above, a muted surround, something. Today it competes with the surrounding h2s for attention.

**Defect 8. Sample C's second card has a `t-caption t-muted` line inside.** Inspector area of the shell also leans on `t-caption` for card body. The smoke test renders caption-sized body text inside demo cards, which teaches the wrong thing — readers will copy the pattern of "card body = caption" into real docs. A renderer smoke should model the common case, not the weird one.

**Defect 9. Sidebar footer "md.js renderer / real kit shell preview" is muted at caption size.** That is metadata about the page, so muted is arguably legal. But "real kit shell preview" is the kind of note the engineer wrote for themselves. Strip it or make it the single thing the footer says. Two lines of muted caption under eight pixels of navigation is clutter.

**Defect 10. Inspector's second card title is "Console".** That is a word. It is not a sentence. It does not say what the reader is supposed to do. The caption below explains: open devtools, check an event name. The heading should be the instruction, not the category. At 0.2 s "Console" means nothing.

**Defect 11. The hero "md.js smoke test" uses lowercase `md.js`, a full stop, then "smoke test" — the period between `md` and `js` is load-bearing but reads at 0.2 s as the end of the first sentence.** The eye hits `md.` and pauses. Tiny thing, persistent defect. The file extension breaks the scan. A doc title is not a file name. Call it what it is: "Markdown renderer smoke test".

## Verdict

**FAIL.** 11 defects. Top three:
1. Three hero-sized headings on the first viewport — no hierarchy step between page / part / article.
2. Section content labels ("Sample A/B/C") are fixture names, not job descriptions.
3. Blockquote renders muted + italic book weight — violates the no-muted-by-default rule and disappears against surrounding body.

Return to stage 3b for rework.
