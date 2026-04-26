---
session: 2026-04-26-comments-default
stage: 6c
role: voice (George Orwell)
input: built kit.js + integration doc + CHANGELOG, cold-read against voice.md
output: FAIL on first pass with three in-scope defects; stage 5 re-spun the fixes
gate: feeds stage 7
---

## First pass — FAIL

In-scope defects (this session's additions only; pre-existing voice debt outside scope):

1. `docs/integration/comment.md:42` — body em-dash for punch in MY new "Three opt-out switches" subsection: "binds their own handler — same path as the prototype-alpha pattern". Rule: "Em-dashes for punch: a period almost always does the same job."
2. `js/kit.js` — body em-dash for punch in MY new auto-mount block comment: "Pages without `.app` skip the injection — the kit will not add columns…". Same rule.
3. `CHANGELOG.md` — filler word "specific" in "one specific shape". Soft flag; "specific" is filler-adjacent and the sentence reads cleaner without it.

Pre-existing defects flagged by the cold-read but outside session scope:

- `docs/integration/comment.md:75, 83` — three-item lists with `etc.`/parenthetical items in the pre-existing "Pick this when:" lists.
- `docs/integration/comment.md:79` — em-dash for punch in the pre-existing "Path B" prose.
- `docs/integration/comment.md:86` — soft moralizing closer "Treat as a last resort".

These belong to a separate voice-cleanup session for `docs/integration/comment.md`. Not blocking 1.7.0.

Stage that owned the fix: stage 5.

## Re-audit (self) after stage 5 re-spin — PASS

Each in-scope item verified on the patched files:

1. FIXED — `docs/integration/comment.md:42` "The consumer binds their own handler. Same path as the prototype-alpha pattern under `§ The enable-or-own decision § Path B`." Period replaces the em-dash.
2. FIXED — `js/kit.js` block comment now reads "Pages without `.app` skip the injection. The kit will not add columns to layouts that did not opt into the three-column shell." Period replaces the em-dash.
3. FIXED — `CHANGELOG.md` "The behavioural change applies to one shape: a page using `.app` + `.book`/`#doc` but NOT carrying its own `.comment-stack`." `specific` cut.

Out-of-scope debt logged at the bottom of this artifact for a future session.

## Verdict
PASS for 1.7.0 in-scope additions.

## Out-of-scope follow-up

A `docs/integration/comment.md` voice cleanup session should address: rule-of-three lists at lines 75 + 83, em-dash for punch at line 79, soft moralizing closer at line 86. Not a 1.7.0 blocker.
