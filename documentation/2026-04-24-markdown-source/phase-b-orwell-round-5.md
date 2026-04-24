# Voice — md-renderer-smoke round 5

Cold read. Stage 6c. Orwell eye. Audit against full voice canon.

Inputs read:
- `demos/md-renderer-smoke/index.html`
- `demos/md-renderer-smoke/sample-a.md`
- `demos/md-renderer-smoke/sample-b.md`
- `demos/md-renderer-smoke/sample-c.md`
- `skills/kk-design-system/voice.md`

Strings audited: every visible UI string across shell and three samples. Buttons, empty states, error messages, placeholders: none present in this smoke test (N/A vectors noted per block).

Verdict: **PASS**.

## Block — Shell: sidebar

### AI tells
pass

### Button labels
N/A — no buttons.

### Empty states
N/A — no empty states.

### Error messages
N/A — no errors.

### Sentence case
pass. "Renderer", "Samples", "Core prose path", "Dense blocks", "Raw HTML passthrough", "md.js renderer".

### Em-dash + italics
pass. No em-dashes. No italics.

### Muted + light weight
pass. Sidebar footer "md.js renderer" is `t-caption` metadata. Nav items `t-caption` are navigation labels (kit-sanctioned caption use). No `t-muted` applied. No `t-light`.

All seven vectors pass.

## Block — Shell: doc intro

### AI tells
pass. Short factual sentences. No filler adjectives, no −ing headlines, no copula avoidance, no not-just-but, no rule-of-three padding, no moralizing closer, no weasel attribution.

### Button labels
N/A.

### Empty states
N/A.

### Error messages
N/A.

### Sentence case
pass — body prose, no headline.

### Em-dash + italics
pass.

### Muted + light weight
pass. `t-body` in default black Medium. No `t-muted`, no `t-light`.

All seven vectors pass.

## Block — Shell: inspector notes

### AI tells
pass. "Renderer is dumb" is short, concrete, declarative. "Watch for errors" is imperative. Caption bodies are factual ("fires once per article", "Zero errors").

### Button labels
N/A — no buttons in inspector.

### Empty states
N/A.

### Error messages
N/A — "Watch for errors" is a note title, not an error shape.

### Sentence case
pass. "Notes", "Renderer is dumb", "Watch for errors".

### Em-dash + italics
pass.

### Muted + light weight
pass. Captions are metadata. No `t-muted`, no `t-light`.

All seven vectors pass.

## Block — sample-a (core prose path)

### AI tells
pass. The L13 rewrite ("Under the article's `data-md-heading-offset="0"` contract, source `#` lands at h1 / t-hero, `##` at h2 / t-display, `###` at h3 / t-title, `####` at h4 / t-subtitle. Source `#####` and deeper demote to `<p class="t-caption">` regular because the kit has no heading rank below subtitle.") is concrete, factual, mapping specific tokens to specific ranks. No filler, no −ing headline, no copula avoidance, no not-just-but, no rule-of-three padding, no moralizing closer, no weasel attribution. L3 enumerates what the sample exercises — concrete list, not adjectival padding.

### Button labels
N/A.

### Empty states
N/A.

### Error messages
N/A.

### Sentence case
pass. "Core prose path", "Section heading", "Card-level heading", "Lists", "Mixed content paragraph".

### Em-dash + italics
pass. No em-dashes in any headline. No prose italics. L31 statement "Italic lives in quotes" is descriptive, not itself italicised.

### Muted + light weight
pass. No `t-muted`, no `t-light`.

All seven vectors pass.

## Block — sample-b (dense blocks)

### AI tells
pass. Table cells are token-to-role-to-size metadata. Blockquote on L16 is a verbatim quote of voice.md line 3 — canon-authored, permitted in quote context. Second blockquote is factual kit description.

### Button labels
N/A.

### Empty states
N/A.

### Error messages
N/A.

### Sentence case
pass. "Dense blocks", "Table", "Blockquote", "Fenced code block", "After the rule". Table column headers ("Class", "Role", "Size") sentence case.

### Em-dash + italics
pass. No em-dashes in any headline. Italics appear only inside blockquotes — the kit's sanctioned italic context per voice.md §Shape and L31 sample-a rule.

### Muted + light weight
pass. Table and quote render in the kit's default weights and colours. No `t-muted`, no `t-light` on prose.

All seven vectors pass.

## Block — sample-c (raw HTML passthrough)

### AI tells
pass. Body prose is short, factual, concrete. No filler adjectives ("safe by construction" is a technical claim, not fluff). No −ing headlines. No copula avoidance. No not-just-but. L3 "card, field, or stat patterns" is a concrete enumeration of named kit patterns, not rule-of-three padding. No moralizing closer — L33 ends on the sanitiser fact.

### Button labels
N/A.

### Empty states
N/A.

### Error messages
N/A.

### Sentence case
pass. "Raw HTML passthrough", "Card embedded in markdown", "Card from markdown", "Prose between raw HTML", "Shout card", "Security note".

### Em-dash + italics
pass. No em-dashes in headlines. No prose italics.

### Muted + light weight
pass. `t-muted` on L7, L12, L21, L26 is applied only to caption-level metadata ("Example" labels, "Authored as raw HTML inside a .md file.", "Raw HTML, one per column.") — metadata-only use, canon-sanctioned. `t-body` prose and `t-title` cards render default black Medium. No `t-light`.

All seven vectors pass.

## Summary

Every block audited passes every applicable vector. Zero flags. The round-4 rework (dropped shell h1, dropped doc__part, offset explicit 0, rewritten L13 mapping in sample-a) carries no voice regressions. L13 in particular — the new prose describing the `data-md-heading-offset="0"` contract — is concrete, token-specific, and free of AI tells.

Block with the most flags: none.
Block with zero flags: all six (shell sidebar, shell doc intro, shell inspector notes, sample-a, sample-b, sample-c).
