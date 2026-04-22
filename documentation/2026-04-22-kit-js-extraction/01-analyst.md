---
session: 2026-04-22-kit-js-extraction
stage: 1
role: analyst
input: user brief (inline above) plus prototype-alpha post-mortem in 2026-04-22-wealthy-alpha/10-retro.md
output: decomposed brief with three users, three job stories, five priority scenarios, seven open questions
gate: awaiting human approval
---

# Analyst — kit.js extraction

The kit ships styles (vars, style.css), tokens, components, voice rules, and a pipeline skill set. It does not ship the behavioural JS that makes components behave — that code lives inline in `index.html` at approximately lines 3400-4270 (~700 lines) and is unreachable by any consumer that does not also embed the manifesto page. Every prototype built against the kit re-implements fragments of this JS or goes without and breaks.

## Raw input

User message verbatim:

> Brief for the analyst: Extract kit.js from index.html into a shared file that every consumer loads. The kit's behavioral JS (scroll-spy, deck controller, card stack, comment menu, FABs, selection-to-highlight, dismiss-to-collapse, MutationObserver-based highlight sync) currently lives inline in index.html at approximately lines 3400-4270. Any prototype that consumes the kit via HTML/CSS/classes alone breaks on these interactions — as confirmed by prototype-alpha where the deck hover and left nav scroll-spy failed. The first Wealthy prototype (prototype-alpha/) is the reference that surfaced the bug. Session slug: 2026-04-22-kit-js-extraction. Materials: `../prototype-alpha/app.js` (shows fragments that were ported), `../index.html` inline script (the source to extract). Open this stage 1 and push back on anything under-specified in the brief.

Prior-session reference: `documentation/2026-04-22-wealthy-alpha/10-retro.md` — the retro that identified the missing kit.js as the root cause of the left nav + deck hover failures.

## Users

Three users, one surface (the kit).

1. **Kit maintainer** — Konstantin, or anyone editing the kit itself (components, tokens, behaviours). Today, fixing a card-stack bug means editing inline `<script>` in `index.html` and hoping no consumer has copied a divergent version of that code. Needs one source of truth.
2. **Kit consumer** — any prototype or product that installs `@kk/design-system`. Today, a fresh prototype loads `vars.css` + `style.css`, writes its own HTML with kit classes, and discovers that cards do not promote, decks do not hover, scroll-spy does not move, comments do not anchor. Needs behaviours to work out of the box.
3. **Third-party reader of the manifesto** — a developer browsing the kit's showcase page (`index.html`) to evaluate or learn. Today, every behaviour works because the JS is inline. Must not regress: the manifesto page stays fully interactive after extraction.

## Job stories

- **Maintainer.** When I fix or extend a kit behaviour, I want one file to edit, so that every consumer picks up the change on their next load without me touching each product repo.
- **Consumer.** When I build a new prototype against the kit, I want to include kit.js with a single `<script>` tag, so that scroll-spy, deck, card stack, comment selection, FABs, and highlight sync all work without porting code.
- **Third-party reader.** When I open the manifesto page, I want every live example to still respond to interaction, so that the page demonstrates the kit as designed.

## Priority scenarios

1. **Happy path — new consumer loads kit.js.** A fresh prototype at `/new-thing/index.html` imports `../vars.css`, `../style.css`, `<script src="../kit.js">`, writes its own app.js, and gets every kit behaviour for free. Zero copy-paste from `index.html`.
2. **No manifesto regression.** After extraction, `index.html` loads `kit.js` instead of the inline `<script>` block. Every live example (card stack, deck, scroll-spy, comment flow, narrow-view FABs) behaves identically to 0.6.0.
3. **prototype-alpha recovers.** The frozen alpha prototype loads `../kit.js` and its left nav scroll-spy starts working. Deck hover continues working (already ported manually, will pick up the shared implementation).
4. **Consumer app.js coexists with kit.js.** A prototype that has its own `app.js` (e.g., the Wealthy comment-flow code in `prototype-alpha/app.js`) does not collide with `kit.js`. Shared globals are namespaced under a single `window.KK` object.
5. **Out of scope for this pass.** Minifying, bundling for production, ESM migration, splitting `kit.js` into per-feature files, writing JS tests. Log and defer.

## Open questions

Seven holes in the brief. Every one is a decision for the human.

1. **Module system.** Plain IIFE script or ES module? Today it is IIFE. ESM requires `type="module"` on `<script>` and adds CORS friction for `file://` dev. Default I would take: plain script, same shape as today. Stamp needed.
2. **File location.** `/kit.js` at repo root (parity with `vars.css`, `style.css`, `signature.svg`), or under `/dist/kit.js`, or `/js/kit.js`? Default: repo root. Stamp.
3. **Initialization model.** Auto-init on `DOMContentLoaded` (what happens today because the inline script runs at the end of body), or expose `window.KK.init()` that consumers call explicitly? Default: auto-init for parity, plus `window.KK.init()` exposed for SPA consumers that mount content after load. Stamp.
4. **Canon change protocol.** Extracting kit.js adds a new file to the kit's inventory. Is this a `kk-ds-maintainer` task or a `kk-role-designer-revolutionary` diff? The manifesto does not mention kit.js today, so we are adding a canon file, not breaking a rule. Default: maintainer task. Stamp.
5. **prototype-alpha treatment.** Alpha was preserved as a voice/content reference. Do we update it to load `kit.js` (active reference), leave it broken as a frozen historical snapshot, or take a copy and freeze the broken copy while the live version gets updated? Default: update in place. It is a reference, it should render.
6. **Dead code pruning.** The inline script has accumulated ~700 lines across versions. Some blocks may be manifesto-demo-only (e.g., a deck demo trigger that only fires on the showcase page, not on consumer pages). Do we extract everything and let stage 8 prune, or prune during extraction? Default: extract everything, let the frontend engineer simplify at stage 8 with explicit prune notes.
7. **Public API surface.** Does `window.KK` expose a public API for consumers (`KK.promoteCard`, `KK.refreshScrollSpy`, `KK.addCommentThread`), or stay internal with only `KK.init()` and `KK.refresh()` public? Default: minimal — `KK.init()` + `KK.refresh()` only. A larger API is a separate, later concern. Stamp.

## Entry point

**Kit refactor** per `pipeline.md` → enters at **stage 1 + stage 8** plus stage 10 reviewers. Plus a `kk-ds-maintainer` pass for canon updates (manifesto reference, index.html + prototype-alpha `<script>` inclusion, CHANGELOG, package.json files array, version bump to 0.7.0). No design phase — stages 2, 3, 4, 5, 6, 7 are skipped.

The `kk-ds-maintainer` pass may fire twice: once at the start to add the canon entry mentioning kit.js exists, and once at the end to bump the version and write the CHANGELOG entry.

## Gate

Passed 2026-04-22. Human stamped every open question. Decisions locked below.

## Locked decisions

1. **Module system.** Plain script (IIFE). Same shape as today's inline block. No ESM this pass.
2. **File location.** `js/kit.js`. New `js/` directory at repo root.
3. **Initialization.** Auto-init on `DOMContentLoaded`. Plus `window.KK.init()` exposed for SPA-style mount-after-load consumers.
4. **Canon protocol.** `kk-ds-maintainer` task. Not a revolutionary diff. Adding a new canonical file, not breaking a rule.
5. **prototype-alpha.** Update in place. Alpha becomes an active reference that loads `../js/kit.js`.
6. **Dead code.** Extract the whole inline block first. Stage 8 (frontend engineer) prunes with explicit notes. See note 6a.
7. **Public API on window.KK.** Minimal for this pass — `KK.init()` and `KK.refresh()` only. Full API is a later concern.

### 6a. DS-engineer mode for this stage 8

Human instruction: the frontend engineer role gets elevated scope for this session because the work is a DS-level refactor, not a product prototype build. Skill updated (narrowly, gated by kit-refactor entry point) to allow: dead-code pruning, structural simplification where inline accumulation hurt clarity, inline maintainer proposals in the artifact. Permanent change to `kk-role-frontend-engineer/SKILL.md` limited to this mode; the normal prototype-build contract is unchanged.

## Hand-off

→ Stage 8, `kk-role-frontend-engineer` in DS-engineer mode. Input: this file plus the annotated line range `index.html:~3400-4270`. Stage 2-7 skipped per the kit-refactor entry point.
