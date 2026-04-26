---
session: 2026-04-26-comments-html-attr
stage: 6c
role: voice (George Orwell)
input: built kit.js + integration doc + CHANGELOG, cold-read against voice.md
output: FAIL on first pass with three defects (one buzz noun in two places, one filler adjective, one em-dash for punch); stage 5 re-spun the fixes
gate: feeds stage 7
---

## First pass — FAIL

Defects:

1. CHANGELOG.md:21 + js/kit.js:1664 — "Easter egg" / "Easter egg for developers." Buzzy noun / metaphor doing nothing.
2. CHANGELOG.md:7 — "Two dev-ergonomic additions on top of 1.7.0." Filler adjective "dev-ergonomic" decorating a sentence the body already explains.
3. CHANGELOG.md:21 — em-dash for punch: "Marked 'for now' — the easter egg can be removed…" Period replacement available.

Stage that owned the fix: stage 5.

## Re-audit (self) after stage 5 re-spin — PASS

1. FIXED — CHANGELOG.md:21 "Marked 'for now'. Removable without breaking consumer code." Period replaces em-dash; "easter egg" cut.
2. FIXED — js/kit.js:1664 "Hidden copy-comments target (0.15.1)." Easter-egg phrase dropped; subsequent comment lines describe the behaviour factually.
3. FIXED — CHANGELOG.md:7 "Two additions on top of 1.7.0: declarative opt-out via html data attributes, and a hidden copy target inside the inspector." Filler word cut; the additions are named directly.

Verified: zero occurrences of "easter" across CHANGELOG, kit.js, and the integration doc.

## Verdict
PASS.
