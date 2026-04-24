# Voice — 2026-04-24-markdown-source, round 4 cold

Cold read. No prior review docs consulted. Audited shell plus sample-a, sample-b, sample-c against `voice.md`.

## Block — shell (index.html)

### AI tells
pass

### Button labels
N/A — no buttons in shell.

### Empty states
N/A — none.

### Error messages
N/A — none.

### Sentence case
pass — "Markdown renderer smoke test", "Samples", "Notes", "Renderer", "Renderer is dumb", "Watch for errors" all sentence case.

### Em-dash + italics
pass — no em-dashes in headings, no italics in body.

### Muted + light weight
pass — `t-caption` nav items, footer, and card sub-paragraphs sit on captions (metadata). No body copy renders muted or light.

## Block — sample-a.md (core prose path)

### AI tells
pass — headings "Core prose path", "Section heading", "Card-level heading", "Lists", "Mixed content paragraph" all concrete nominal or imperative; no filler adjectives, no −ing headlines, no copula avoidance, no not-just-but, no rule-of-three adjectives, no moralizing closer, no weasel attribution.

### Button labels
N/A.

### Empty states
N/A.

### Error messages
N/A.

### Sentence case
pass.

### Em-dash + italics
pass — no em-dashes in headings; no italic emphasis in body. Line 31 names italic as a topic, does not apply it.

### Muted + light weight
pass — no muted body; no light weight.

## Block — sample-b.md (dense blocks)

### AI tells
pass — "Dense blocks", "Table", "Blockquote", "Fenced code block", "After the rule" all concrete. Body opens with a three-item enumeration of specific nouns (tables, blockquotes, code fences), which is an inventory, not a rule-of-three padding triple. Closing caption names three visual specs for the quote class — specific nouns, not adjective filler.

### Button labels
N/A.

### Empty states
N/A.

### Error messages
N/A.

### Sentence case
pass.

### Em-dash + italics
pass — no em-dashes in headings. Line 33 names "italic face" as a visual spec of the quote, does not apply italics to body. Blockquote italic is sanctioned by kit (quote context).

### Muted + light weight
pass.

## Block — sample-c.md (raw HTML passthrough)

### AI tells
pass — "Raw HTML passthrough", "Card embedded in markdown", "Prose between raw HTML", "Security note" all concrete. "Renderer magic" reads colloquial and concrete in context, not filler. Closing sentence on the sanitiser is a concrete fact, not a moralizing closer.

### Button labels
N/A.

### Empty states
N/A.

### Error messages
N/A.

### Sentence case
pass.

### Em-dash + italics
pass — no em-dashes in headings; no italic emphasis in body.

### Muted + light weight
pass — every `t-muted` instance sits on `t-caption` metadata ("Example" label, "Authored as raw HTML inside a .md file.", "Raw HTML, one per column."). Body `t-body` paragraphs inside cards render full black medium. No light weight anywhere.

## Summary

Zero flags across four blocks. No block to name as worst; every block passes all seven vectors.

Verdict: PASS. Defect count: 0.
