# Voice — 2026-04-24-markdown-source, phase B, Orwell round 3

Cold re-audit. No prior review docs read. Canon reference: `skills/kk-design-system/voice.md`.

Files audited:

- `demos/md-renderer-smoke/index.html`
- `demos/md-renderer-smoke/sample-a.md`
- `demos/md-renderer-smoke/sample-b.md`
- `demos/md-renderer-smoke/sample-c.md`

## Verdict

**FAIL.** One defect.

## Defect count

1

## Defect list

### 1. `demos/md-renderer-smoke/sample-a.md:31`

String:

> Bold and italic render in their sanctioned contexts only — bold in headings, italic in quotes.

Rule broken: `voice.md` §No AI tells → Sentence shapes to cut → **Em-dashes for punch**. "A period almost always does the same job." §Shape also pins the rule as "rare in body". The em-dash joins two clauses where a period, colon, or line break does the same work. Canonical fix shape: `… sanctioned contexts only. Bold in headings, italic in quotes.` or `… sanctioned contexts only: bold in headings, italic in quotes.`

## Per-block audit

### Block — Shell chrome (index.html)

All seven vectors pass.

### Block — Doc hero + intro (index.html)

All seven vectors pass.

### Block — Inspector notes (index.html)

All seven vectors pass.

### Block — Sample A (sample-a.md)

#### AI tells
Pass.

#### Button labels
N/A — no buttons.

#### Empty states
N/A.

#### Error messages
N/A.

#### Sentence case
Pass.

#### Em-dash + italics
FAIL. Line 31 — em-dash in body prose, punch use, period does the same job.

#### Muted + light weight
Pass.

### Block — Sample B (sample-b.md)

All seven vectors pass. Rule-of-three check on line 33 (`hairline rule on the left, black body colour, italic face`) reads as a factual enumeration of three rendering facts, not adjective padding. Within canon.

### Block — Sample C (sample-c.md)

All seven vectors pass. `t-muted` usage sits on caption-role metadata inside `card__heading` and on the `Example` label — within the muted allowance for metadata.

## Summary

- Block with the most flags: Sample A (one flag, line 31 em-dash).
- Blocks with zero flags: Shell chrome, doc hero + intro, inspector notes, Sample B, Sample C.

Single defect. Fix is a one-character swap. Stage 7 meta-reviewer's rubric item on zero AI-tells resolves against this list.
