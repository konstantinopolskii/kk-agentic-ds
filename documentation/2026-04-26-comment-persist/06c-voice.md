---
session: 2026-04-26-comment-persist
stage: 6c
role: voice (George Orwell)
input: built kit.js + integration doc + CHANGELOG, cold-read against voice.md
output: FAIL on first pass with seven defect classes; re-audit after stage 5 re-spin returned PASS
gate: feeds stage 7
---

## First pass — FAIL

Defect ranks (file:line evidence):

1. Headline em-dashes inside code-comment section banners (`js/kit.js:1357`, `:1411`). Rule: "Em-dashes: forbidden in headlines."
2. Body em-dashes for punch (`docs/integration/comment.md:188`, `:216`). Rule: "Em-dashes for punch: a period almost always does the same job."
3. Rule of three (`CHANGELOG.md:22`, `:24`; `docs/integration/comment.md:179`).
4. "Such as" exhaustive lists (`CHANGELOG.md:33`).
5. Filler adjective "cleanly" (`docs/integration/comment.md:225`).
6. `-ing` filler verbs ("matching" `js/kit.js:1357`; "iterating" `docs/integration/comment.md:262`).
7. Colloquial tell "baked into" (`CHANGELOG.md:7`).
8. Brand capitalisation: "explee partnership proposal" → "Explee" (`CHANGELOG.md:22`).

Stage that owned the fix: stage 5.

## Re-audit after stage 5 re-spin — PASS

Each item verified on the patched files:

1. FIXED — `js/kit.js:1359` "Comment API: extract + copy." / `js/kit.js:1421` "Comment persistence. Default-on whenever a `.comment-stack`...". Banner heads carry colons + periods, no em-dashes.
2. FIXED — `js/kit.js:1361-1362` "Same shape as the kk:comment event so consumers see one schema across both surfaces." No "matching" participle.
3. FIXED — `js/kit.js:34-37` `KK.clearSavedComments` docstring describes the no-op accurately.
4. CHANGELOG 1.6.0:
   - FIXED — `CHANGELOG.md:7` "Comment persistence ships in the kit."
   - FIXED — `CHANGELOG.md:22` "Generalised and moved into the kit." Two items, not three.
   - FIXED — `CHANGELOG.md:22` "Explee partnership proposal" capitalised.
   - FIXED — "Three adapter shapes:" names the category, no "such as" inventory.
   - FIXED — `CHANGELOG.md:24` "Switch persistence off when the backend owns state. Set `enabled: false` (or `adapter: 'none'`) so localStorage does not shadow your DB. Same flag for dev iteration when stale cache masks your edits." Collapsed to prose.
5. `docs/integration/comment.md § Persistence`:
   - FIXED — `comment.md:179` "(any DB-backed app)".
   - FIXED — `comment.md:188` "Routes the kit's snapshot through your own store. The shape fits IndexedDB...". Period replaces em-dash.
   - FIXED — `comment.md:216` "Restore reads those attributes to re-wrap doc highlights. No separate highlights array needed." Period replaces em-dash.
   - FIXED — `comment.md:225` "Single-text-node selections survive." `cleanly` gone.
   - FIXED — `comment.md:262` "Dev iteration. Set `enabled: false` while editing the doc body so a stale cache does not shadow your edits." `iterating on` gone.

Fresh sweep: no new defects.

## Verdict
PASS.
