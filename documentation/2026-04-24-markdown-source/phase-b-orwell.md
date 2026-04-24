---
session: 2026-04-24-markdown-source
stage: phase-b-orwell
role: voice-reviewer
input: demos/md-renderer-smoke/{index.html, sample-a.md, sample-b.md, sample-c.md}
output: Phase B cold voice read against voice.md canon; one defect flagged
gate: FAIL
---

Phase B cold voice read. Every visible UI string in the md-renderer smoke test audited against voice.md.

## Raw input

> Cold read of every visible UI string in the md-renderer smoke test against kit voice canon. Both voice and Jobs must approve.

Source files:

- `demos/md-renderer-smoke/index.html`
- `demos/md-renderer-smoke/sample-a.md`
- `demos/md-renderer-smoke/sample-b.md`
- `demos/md-renderer-smoke/sample-c.md`

Canon: `skills/kk-design-system/voice.md`.

## Strings audited

Headings, body paragraphs, captions, nav labels, footer, inspector cards, table cells, blockquotes, code-fence content, raw-HTML prose. No buttons, no empty states, no errors, no placeholders present in this prototype.

## Defects

### sample-a.md:31 — italics outside quotes or book titles

String:

> `A paragraph can carry **bold text**, *italic text*, a [link](#anchor), and \`inline code\` in one line.`

Rule broken: `voice.md` §Shape — "No italics outside quotes or book titles." The italic span `*italic text*` renders as emphasis in running body prose. The sample is a smoke test whose purpose is exercising the inline pass, and the chosen demo word is a self-label. Canon is canon; italics in body are forbidden regardless of intent. The inline bold in the same sentence (`**bold text**`) stays within permitted body-bold use sparingly but sits in the same demonstrative frame.

Fix vector: swap the demo phrase so the italicised token is a book title or a quote (e.g. italicise a real title, or drop the italic case from the smoke and cover italics in a blockquote fixture).

## Per-vector roll-up

### AI tells
Pass. No filler adjectives, no `-ing` labels, no copula avoidance, no not-just-but, no rule-of-three adjective padding, no moralizing closers, no weasel attribution, no elegant variation. "Dumb" in `Renderer is dumb` is character slang canonised by `pipeline.md` §Dumb-reviewer, not a voice tell.

### Button labels
Pass. No buttons in the prototype. N/A vector.

### Empty states
Pass. No empty states. N/A vector.

### Error messages
Pass. No rendered error surfaces. The `Watch for errors` inspector card describes where to watch in devtools; it is not a user-facing error string.

### Sentence case
Pass. Every heading sentence case. `HTML` treated as acronym — conforms. No Title Case, no ALL CAPS.

### Em-dash and italics
Fail. See sample-a.md:31. Zero em-dashes in any headline. Italics defect isolated to the one smoke-test string.

### Muted and light weight
Pass. Muted color applied only to metadata surfaces — sidebar footer `md.js renderer`, sidebar nav inactive state (kit canon behaviour), caption-class `Example` labels in sample-c (raw-HTML metadata markers), card-heading captions (kit pattern). No muted on body, no muted on structural markers beyond kit defaults.

### Button pairing
Pass. N/A — no button pair in prototype.

## Summary

One defect. Italics in body prose at `sample-a.md:31`. All other vectors clean.

## Gate

FAIL. One flagged string against voice canon.

## Hand-off

→ Orchestrator reconciles Phase B dual approval. Jobs passed Phase A on typography + clarity. This voice pass fails on one italic-in-body violation. Either fix the sample fixture (swap italicised word to a book title or move italic demo into a blockquote) or stamp as a user-approved exception in the direction doc §Exceptions for smoke-test fixtures.
