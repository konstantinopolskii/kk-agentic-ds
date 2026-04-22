---
session: 2026-04-22-kit-js-extraction
stage: 11 (maintainer close-out)
role: kk-ds-maintainer
input: 08-frontend-engineer.md §Maintainer proposals, 10-reviewers.md
output: canon changes, version bump, CHANGELOG entry. v0.7.0 shipped.
gate: session complete
---

# Stage 11 — Maintainer close-out

`kk-ds-maintainer` runs after stage 10 to land the canon changes flagged by the frontend engineer. Six proposals, all executed.

## Proposal 1 — `js/` in `package.json` files

Added `"js/"` to the `files` array so the new folder ships with the npm package.

File: `package.json` line ~15-17.

## Proposal 2 — Runtime reference in `manifesto.md`

Added a new top-level section `## Runtime` after `## Foundations — motion` and before `## Pipeline`. Names `js/kit.js`, lists the six auto-init modules + one opt-in, names the public API, names the rule that forks go through the maintainer.

File: `skills/kk-design-system/manifesto.md`.

## Proposal 3 — CHANGELOG 0.7.0 entry

Added at the top. Sections: Added (new file, docs, manifesto Runtime section, index.html references), Removed (inline script block, duplicate deck controller in prototype-alpha), Moved (consumers now load kit.js, `files` array, role skill path reference), Open (i18n deferred, `KK.refresh` stub, prototype-alpha deck label regression).

File: `CHANGELOG.md`.

## Proposal 4 — version bump to 0.7.0

`package.json` version: `0.6.0` → `0.7.0`. Description expanded to mention kit.js behaviour.

File: `package.json` line 3-4.

## Proposal 5 — i18n deferred to 0.8.0

Not a code change. Logged in the 0.7.0 CHANGELOG `### Open` block as a named carryover. Consumers reading the changelog before bumping see the gap and decide whether to wait.

## Proposal 6 — `KK.refresh()` real behaviour deferred to 0.8.0

Same as proposal 5. Logged in `### Open`. The stub is documented in the kit.js header comment so callers know to expect no-op for now.

## Side edit — `kk-role-frontend-engineer` SKILL.md

Not in the proposal list but required for correctness: the skill referenced `../kit.js` at the old root location. Updated to `../js/kit.js` and added a note about `KK.enableCommentSelectionFlow()` for pages that want the default comment flow.

File: `.claude/skills/kk-role-frontend-engineer/SKILL.md` §3. Shared kit.js.

## Side edit — `index.html` kit.js references

Three user-facing mentions of what the kit ships. All three updated to name `js/kit.js` and "behavioural JS":
- `#skill` — "Humans get CSS, fonts, behavioural JS, and this document."
- `#install` — package contents line names `js/kit.js`.
- `#ownership` spec card — `Kit files` row lists `js/kit.js` alongside `vars.css`, `style.css`, `fonts/`.

File: `index.html` lines 2546-2550, 2663-2668, 2805.

## Verification

- `node -c js/kit.js` passes.
- `node -c prototype-alpha/app.js` passes.
- `curl http://localhost:8173/js/kit.js` returns 200.
- All changed files tracked in git (no untracked outputs beyond the documentation folder).
- Version, `files` array, CHANGELOG, manifesto, index.html, role skill — all consistent with 0.7.0.

## Gate

Session complete. v0.7.0 is shippable. The kit ships with:
- Tokens, components, voice rules, fonts (unchanged).
- Ten-stage pipeline with eleven role skills (0.6.0).
- Shared behavioural JS at `js/kit.js` with a minimal public API (0.7.0).

Open issues are named carryovers: i18n config and `KK.refresh` real behaviour, both for 0.8.0.
