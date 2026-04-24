---
session: 2026-04-24-markdown-source
stage: phase-1-fresh-eyes-round-3
role: kk-role-fresh-eyes-jobstory
character: Steve Jobs
input:
  - demos/md-renderer-smoke/index.html
  - demos/md-renderer-smoke/sample-a.md
  - demos/md-renderer-smoke/sample-b.md
  - demos/md-renderer-smoke/sample-c.md
  - documentation/2026-04-24-markdown-source/screenshots/jobs-round-3-viewport.png
  - documentation/2026-04-24-markdown-source/screenshots/jobs-round-3-full.png
  - documentation/2026-04-24-markdown-source/screenshots/jobs-round-3-1280.png
  - skills/kk-design-system/manifesto.md § Typography rhythm
output: Cold-read jobstory audit, round 3. Defect list with typography rhythm violations.
gate: FAIL
---

# Fresh-eyes round 3 — markdown-source smoke

Cold read. No prior docs. No maintainer rework. Just the artefacts.

## What I see

A three-pane shell. Left rail names three samples. Middle column carries a hero "Markdown renderer smoke test", an intro, a part label "Samples", and three articles stacked beneath. Right rail carries two cards under "Notes".

Each article body is markdown rendered to kit classes. Article one runs headings, paragraphs, lists, inline code. Article two runs a table, two blockquotes, a code fence, a rule, a second paragraph. Article three runs two cards embedded in prose, each prefaced with a muted "Example" caption.

## What I can do

Scroll. Click a rail link to jump to an article. Read.

Nothing else. It is a smoke test.

## What this is for

Proof that a markdown file fed through `data-md-src` lands as a kit-class document indistinguishable from hand-authored HTML. Reviewer target: the renderer does not drift typography.

## What's great

- Hero renders at hero. Intro renders at body. The shell owns the h1, the articles shift down one rank. No double-hero.
- Label-list pairs ("Unordered list:", "Ordered list:") sit tight to their list. Caption reads as caption. No float.
- Quote renders black, italic, hairline left. Not muted. Both quotes render the same way.
- HR sits symmetric, 60 above, 60 below. Reads as separator, not as lead-in.
- Embedded cards carry the "Example" muted caption above. Caption convention held.
- Lists render as tabular rows with hairlines. Ordered list numerals sit in the left gutter. Same rhythm across both list types.
- Table renders with the registry-table hairlines. Clean.
- Samples link in the rail highlights when the part is in view. The indicator moves.

## What could be better

Typography rhythm. Three rule-12 defects.

### Defect 1 — "Card embedded in markdown" inverts rule 12

The h3 heading "Card embedded in markdown" sits 91 px below the previous paragraph and 125 px above the "Example" caption. Below exceeds above. The heading groups with what came before, not with the card it introduces. Direct violation of rule 12.

`demos/md-renderer-smoke/sample-c.md` line 5: `## Card embedded in markdown` renders at h3, followed by a raw-HTML `<p class="t-caption t-muted">Example</p>` plus `<div class="card">`. Whatever margin stack the raw-HTML passthrough introduces, the heading loses its lead.

Fix path: the heading's gap-below must drop below its gap-above. At the 0.2-second bar the heading must reach forward, not backward.

### Defect 2 — "Samples" part label sits at 1.49:1

The `doc__part` heading "Samples" sits 139 px below the intro and 93 px above the first article heading. Ratio 139/93 = 1.49:1. The 2:1 floor reads as clear lead; 1.5:1 reads as roughly equal; 1.49 fails. Samples floats between the intro and the first article.

`demos/md-renderer-smoke/index.html` line 45: `<h2 class="doc__part">Samples</h2>`. CSS stack: `.doc` flex-gap 12 + `.doc__part` margin-top 32 + padding-top 80 = 124 above; padding-bottom 0 + gap 12 + `.doc__part + .doc__section` padding-top 80 = 92 below. Ratio 124/92 = 1.35. Measured 1.49. Both below floor.

### Defect 3 — "Table" h3 sits at 1.39:1

The h3 "Table" sits 92 px below its preceding paragraph and 66 px above the registry-table header row. Ratio 1.39:1. Below floor. The table's own `.registry-table { margin-top: 16 }` stacks against the section's `h3 + *` 40 and inflates below-gap past what rule 12 tolerates.

`demos/md-renderer-smoke/sample-b.md` line 5: `## Table` renders at h3. The table follows directly. The heading must sit tighter to the table than to the paragraph above.

## Verdict

FAIL. Three rule-12 defects. The renderer is typographically honest on the easy cases (quotes, HR, label-list, heading offset, caption convention). It breaks on headings that introduce mixed-authorship blocks — raw HTML, tables, part labels — where the kit's default margin stack does not carry the 2:1 asymmetry through to the visible gap.

Pass is pass. Three flags is fail.

## Prioritized defect list

1. `sample-c.md` — h3 "Card embedded in markdown" inverts rule 12. Gap below > gap above.
2. `index.html` — doc__part "Samples" at 1.49:1. Below 2:1 floor.
3. `sample-b.md` — h3 "Table" at 1.39:1. Below 2:1 floor.

Return to the stage that owns the margin stack: DS maintainer for the `.doc__section > h3 + *` and `.doc__part` contracts, design engineer for the raw-HTML passthrough margin path.
