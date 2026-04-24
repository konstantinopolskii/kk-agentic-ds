# Voice — md-renderer-smoke round 6 (cold)

Character: George Orwell. Cold read. No prior review docs read. Canon: `skills/kk-design-system/voice.md`.

Scope: `demos/md-renderer-smoke/index.html`, `sample-a.md`, `sample-b.md`, `sample-c.md`.

Verdict: **PASS**.

## Block — Shell chrome (index.html)

Strings audited: sidebar header "Renderer", nav heading "Samples", nav items "Core prose path" / "Dense blocks" / "Raw HTML passthrough", footer "md.js renderer", doc intro paragraph, inspector group header "Notes", card headings "Renderer is dumb" / "Watch for errors", card captions.

### AI tells
pass

### Button labels
No buttons in this prototype. N/A.

### Empty states
No empty states. N/A.

### Error messages
No error strings in rendered UI. N/A.

### Sentence case
pass. "Raw HTML passthrough" retains HTML as acronym; rest is sentence case.

### Em-dash + italics
pass. No em-dashes in headings. No italics outside quote sample.

### Muted + light weight
pass. `t-caption` on nav items, footer, inspector captions — all metadata uses. No `t-muted` in shell (restricted to the `Example` metadata labels inside sample-c card headings, which is legitimate metadata).

## Block — sample-a (core prose path)

Strings audited: h1 "Core prose path", intro, h2 "Section heading", body, h3 "Card-level heading", body with links, heading-offset explainer, h2 "Lists", unordered items ("First item, unmarked.", "Second item with a link.", "Third item with inline code."), ordered items ("Fetch the markdown.", "Render to HTML with kit classes.", "Inject into the container."), h2 "Mixed content paragraph", closing body.

### AI tells
pass. No filler adjectives. No −ing titles. No copula avoidance ("The renderer wraps it in…", "Bold lives in headings" — plain `is`/`lives`). No not-just-but. The intro lists four exercised features; this is enumeration of concrete items, not rule-of-three padding. Ordered list uses bare imperatives.

### Button labels
N/A.

### Empty states
N/A.

### Error messages
N/A.

### Sentence case
pass. All four heading levels sentence case.

### Em-dash + italics
pass. No em-dashes in headings. Italics called out in prose but not used in prose.

### Muted + light weight
pass. Body renders `t-body` Medium 500 black per kit. No muted defaults.

## Block — sample-b (dense blocks)

Strings audited: h1 "Dense blocks", intro, h2 "Table", table headers and cells ("Document title", "Section heading", "Body text", "UI labels"), h2 "Blockquote", quote body, h2 "Fenced code block", code fence lines, h2 "After the rule", body, second quote body.

### AI tells
pass. Cells are factual role descriptions. Quote imports the voice.md thesis verbatim.

### Button labels
N/A.

### Empty states
N/A.

### Error messages
N/A.

### Sentence case
pass.

### Em-dash + italics
pass. Italics restricted to the `quote` block per kit rule — sanctioned context.

### Muted + light weight
pass.

## Block — sample-c (raw HTML passthrough)

Strings audited: h1 "Raw HTML passthrough", intro, h2 "Card embedded in markdown", caption "Example", card heading "Card from markdown", card caption "Authored as raw HTML inside a .md file.", card body, h2 "Prose between raw HTML", body, card heading "Shout card", card caption "Raw HTML, one per column.", card body "Everything inside inverts against the kit's shout surface.", h2 "Security note", body.

### AI tells
pass. "Passthrough is safe by construction" is a plain factual claim, not weasel attribution. The three-noun list "card, field, or stat patterns" names specific kit inventory items, not a padded triplet.

### Button labels
N/A.

### Empty states
N/A.

### Error messages
N/A.

### Sentence case
pass.

### Em-dash + italics
pass.

### Muted + light weight
pass. `t-muted` applied only to the "Example" metadata labels and card captions — legitimate metadata slot. Body text in cards renders `t-body` full black medium.

## Summary

Zero flags across all four blocks. Most severe flag: none. Block with most flags: none. Block with zero flags: all four.

Strings audited: ~70 visible strings across shell + three samples. Flagged: 0.

Nothing to return to 3b. Voice canon clean.
