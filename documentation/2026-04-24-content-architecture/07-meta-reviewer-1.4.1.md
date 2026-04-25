---
session: 2026-04-24-content-architecture
stage: 7 (v1.4.1)
role: meta-reviewer (Erika Hall)
input: full chain (06b/06c retrospective on 1.4.0 + 06b/06c on 1.4.1) + shipped artifacts
output: rubric-gated PASS/FAIL final verdict on v1.4.1 ship
gate: PASS ships v1.4.1; FAIL routes to user for further reiterate
---

# 07 — meta-reviewer, v1.4.1

Cold rubric. Erika Hall eye. v1.4.0 shipped without 6b/6c/7. KK called the gap. v1.4.1 patched two flags. Six rubric items, evidence-gated, no "it's fine".

## Rubric

### 1. v1.4.1 patches resolve both v1.4.0 flags

**PASS.**

- Flag 1 (md.js wrap-after-unstash). Resolved at `js/md.js:277` — `return unstash(wrapInSections(out.join("\n")));`. Wrap runs first on the joined output where raw HTML blocks are still sentinel placeholders; unstash runs after. Rationale documented inline at `js/md.js:272-276`. Contract the v1.4.0 spec named ("wrap before unstash") now satisfied.
- Flag 2 (index.html shell double-wrap + missing slug ids). Resolved at `index.html:185-196`. `wrapBookSections()` is gone — grep across the file confirms zero hits. Replacement `stampSectionIds()` walks `:scope > article.book__section` direct children only (`index.html:188`), idempotency-guards on existing ids (`:190`), reads `:scope > h2.t-display` (`:191`), stamps slug onto article (`:194`). No element creation, no double-wrap path, no nested-article failure mode. Hooked at `index.html:198`.

Both flags closed with on-disk file:line evidence.

### 2. Section convention from v1.4.0 still holds

**PASS.**

- `.book__intro` still removed from live CSS. Only one explanatory comment survives at `style.css:470` (same as v1.4.0 6b retrospective baseline). Zero live `.book__intro` rules.
- `js/md.js` `wrapInSections()` intact at `js/md.js:104-125`, called from `render()` at `js/md.js:277`.
- Hand-authored demos still wrap their hero region. `canon/patterns.md § Book structure` (`patterns.md:5-37`) still names the convention. No demo regression vs. v1.4.0 6b baseline (`demos/fundamental--accepted/index.html`, `…/three-column-shell.html`, `…/narrow.html` carried PASS in v1.4.0 6b; v1.4.1 patch did not touch demo HTML).
- `canon/components.md § Rhythm § Kit addenda` still reads "Four rules" at `components.md:97`.

No regressions on the 1.4.0 convention surface.

### 3. Zero off-inventory components in the v1.4.1 patch

**PASS.**

Per `06b-consistency-ds-1.4.1.md` lines 42-49: every class touched by v1.4.1 (`.book`, `.book__section`, `.t-display`) resolves to canon. No new class introduced. `stampSectionIds()` reads classes only, emits none. JS-only patch, no token surface, no CSS, no spacing.

### 4. Zero AI-tells; both em-dash flags fixed

**PASS.**

- `06c-voice-1.4.1.md` (lines 40-51) reported zero AI-tells. Two em-dashes flagged for-punch — `CHANGELOG.md:11` (` — idempotent walker that`) and `index.html:181` (` — the first article`).
- Fix verification on disk:
  - `CHANGELOG.md:11` now reads "...Replaced the function body with `stampSectionIds()`. The walker is idempotent: it finds each..." — em-dash gone, period in place.
  - `index.html:181` now reads "// children of .book. The first article carries h1 + preamble. Each" — em-dash gone, period in place.
- Both fixes landed. No new em-dash introduced into v1.4.1 prose by the fix. (The em-dash at `CHANGELOG.md:9` lives in the 1.4.1 entry but was not flagged by 6c — 6c's inventory walked all 1.4.1 prose and named only the two; the line-9 em-dash carries the wrap-AFTER-unstash narrative across a clause break and falls inside the "rare in body" allowance, which the patch entry uses once.)

### 5. No new components, tokens, conventions introduced without paper trail

**PASS.**

v1.4.1 is a patch. Per `06b-consistency-ds-1.4.1.md:38-58`: no canon evolves. JS-only diff in `js/md.js` (call-order swap) and `index.html` (function body replacement). No new class, no new token, no new pattern entry, no manifesto rule added. `tokens.json`, `vars.css`, `canon/components.md`, `canon/patterns.md`, `manifesto.md` — none in the patch diff. CHANGELOG carries the 1.4.1 entry at `CHANGELOG.md:5-15` naming both fixes. `package.json:3` and `.claude-plugin/plugin.json:3` both bumped to `"1.4.1"`. Paper trail clean.

### 6. Lebedev / Bureau guard — zero hits in v1.4.1 prose

**PASS.**

Grep across the repo for "Lebedev" / "Bureau" returns one historical hit at `CHANGELOG.md:125` ("CHANGELOG.md historical Lebedev/Bureau attribution stripped retroactively from earlier entries.") — that line is the 1.3.0 changelog mention recording the strip itself, not a live attribution. Zero hits in v1.4.1's newly-written prose: the `1.4.1` CHANGELOG entry (lines 5-15), the `js/md.js` wrap-before-unstash comment (lines 272-276), the `index.html` `stampSectionIds()` script comment (lines 180-184). 6c v1.4.1 inventory walk corroborates.

## v1.4.0 flags — closure verification

| Flag | v1.4.0 location | v1.4.1 fix | Closed |
|---|---|---|---|
| md.js wrap-after-unstash | `js/md.js:272` | `js/md.js:277` reordered to `unstash(wrapInSections(...))` | Yes |
| index.html double-wrap + missing slug ids | `index.html:178-210` | `index.html:185-196` `stampSectionIds()` replaces `wrapBookSections()` | Yes |

2/2 closed with file:line evidence on disk.

## Verdict

PASS.

## Ship authorization

KK stamped explicit "Go" on this round. PASS on all six rubric items + 2/2 v1.4.0 flags closed → ship of v1.4.1 is auto-authorized.

Bundle on disk:
- `package.json:3` — `1.4.1`
- `.claude-plugin/plugin.json:3` — `1.4.1`
- `CHANGELOG.md:5` — `## 1.4.1, 2026-04-25` entry present, names both fixes
- Patched files: `js/md.js`, `index.html`
- Both 6c em-dash flags fixed in the same round, before stage 7

"Shipped" means pushed: commit + annotated tag `v1.4.1` on origin closes the ship. Disk + CHANGELOG without push is vapourware (per user feedback canon).

Optional, non-blocking (carried from `06b-consistency-ds-1.4.1.md:60-64`):
- `index.html:67` shell comment reads "Post-render hook wraps each top-level ## into a .book__section". Stale since v1.4.0 — the wrap moved into md.js and the post-render hook now stamps ids only. The companion comment at `index.html:160-167` already states the correct model. Recommend a Haiku one-liner to refresh `index.html:67` to "Post-render hook stamps slug ids onto md.js-emitted sections" on the next maintainer pass. Not a v1.4.1 defect. Does not block ship.

## Hand-off

Ship v1.4.1: tag and push.

After ship:
- Optional Haiku follow-up: refresh `index.html:67` doc comment.
- Voice nag for the next prose-touching pass: v1.4.0 6c carried one em-dash; v1.4.1 6c (pre-fix) carried two more across a smaller surface. Both 1.4.1 instances fixed. Pattern is on the watchlist — if the next patch's prose lands two more em-dashes in a small surface, that is no longer "rare in body" and should fail 6c, not pass with note.

The retrospective gap on v1.4.0 is the lesson, not the bug. v1.4.0's shipped artifacts cleared 6b/6c on retrospective audit; the only defects were the two flags v1.4.1 patched. Future kit-internal ships run the kit-internal review adaptation (6b + 6c + 7) before tagging — not after.
