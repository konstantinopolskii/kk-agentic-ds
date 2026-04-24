---
session: 2026-04-24-content-architecture
stage: 5
role: design-engineer
input: 04-ds-manager.md (17-task split) + all 03b hand-offs
output: built prototype — canon/ + pipeline/ folders + thinned manifesto + new index.html hallway + .doc→.book rename + CSS dedupe + version bump
gate: pending — stages 6b + 6c run next
---

Stage 5 executed the 17-task build-order split on `main` via replay-clean path (no destructive git ops). Every file rewrite, move, delete, and class rename landed in one working tree; no commits made — KK owns that step.

## Tasks completed

1. Skipped destructive revert. Pragmatic replay path used: files rewritten wholesale on the current tree, the diff-at-ship reads clean because old content gets replaced by new content.
2. Created `skills/kk-design-system/canon/` and `skills/kk-design-system/pipeline/` directories; moved `skills/kk-design-system/voice.md` → `skills/kk-design-system/canon/voice.md`.
3. (executed as task 14 — rename pass runs after file-write tasks per the split's own reordering clause.)
4. Wrote thinned `skills/kk-design-system/manifesto.md` (~200 lines) from 03b-designer-manifesto.md §Example content. Replaced the existing 685-line file. Signoff block included verbatim with `.book__signoff` classes.
5. Wrote `skills/kk-design-system/canon/components.md` from 03b-designer-components.md §Example content. Foundations (Material / Color / Type / Space / Radii / Motion), typography rhythm under "inner and outer theory" (Lebedev stripped), typography utility registry, component sections (Card / Field / Button / Tag / Switch / Comment / Navigation / Signoff / Spec list / List), kit-doc primitives (Preview frame / Registry table), Forbidden close. Updated the Component registry deep-link column to point at the seven new anchors that task 13 creates.
6. Wrote `skills/kk-design-system/canon/patterns.md` from 03b-designer-patterns.md §Example content. Three top-level patterns (Three columns / Card stack / Narrow mobile) + 11-row registry table. Used `three-column-shell.html` on-disk slug, as recommended. Path prefixes in HTML hrefs use `../../../demos/...` since the file lives three levels deep under `skills/kk-design-system/canon/`.
7. Wrote `skills/kk-design-system/pipeline/protocols.md` from 03b-designer-protocols.md §Example content. Ship discipline / Bundle rule / Semver (axes + push steps) / Evolve protocol / Backlog / Ideation.
8. Moved `skills/kk-design-system/pipeline.md` → `skills/kk-design-system/pipeline/pipeline.md`. Appended `doc-format.md` content as a new top-level `## Documentation contract` section with sub-headings demoted one rank. Deleted `skills/kk-design-system/doc-format.md`.
9. Moved `skills/kk-design-system/patterns/strategy-doc.md` → `proposals/strategy-doc-interim.md` with a one-line HTML-comment header naming the future home (strategy prototype under `demos/`). Deleted the empty `skills/kk-design-system/patterns/` directory.
10. Deleted root `patterns.html`. Grep confirmed no in-scope hrefs remained after the rewrite (index.html gets rewritten at task 11; style.css + js/patterns.js carry comments-only mentions that don't affect runtime; documentation/ + proposals/ are historical).
11. Rewrote root `index.html` from 03b-designer-index-hallway.md §Example content. Three-column shell, sidebar scroll-spy TOC, `.book` middle column with `data-md-src="./skills/kk-design-system/manifesto.md"`, inspector with two `inspector__group` (canon + demos), post-render hook script, two FABs. 245 lines on disk.
12. Created `demos/fundamental--accepted/patterns/narrow.html` matching the shape of `three-column-shell.html`. Uses the kit's existing narrow-pattern classes (`sidebar--collapsed`, `inspector--modal`).
13. Added seven missing id anchors to `demos/fundamental--accepted/index.html`: `#material` (before `#color`), `#radii` (before `#motion`), `#preview-frame`, `#registry-table`, `#spec-list` (after `#figures`), `#navigation` (between `#opening` and `#reading`), `#comment` (between `#stack` and `#deck`). Each anchor sits on a new `<article class="doc__section">` with a display heading + one-line body.
14. `.doc` → `.book` rename pass. Targets hit: `style.css`, `js/kit.js`, every `.html` under repo root + `demos/` (17 files), every `.md` inside `skills/` and `docs/` (24 files), every `SKILL.md` under `skills/` and `.claude/skills/` (the two sets are hard-linked — one update touches both). Pattern: CSS `.doc__*` → `.book__*`, CSS `.doc\b` → `.book`, HTML `class="doc"` / `class="doc__*"` tokens → `book` / `book__*` (preserving unrelated tokens, never touching `id="doc"` or `data-view="doc"`). Relaxed `#doc` id selector in `kit.js § initScrollSpy` + `initCommentSelectionFlow` to `document.querySelector('.book') || document.getElementById('doc')`. Fixed the one collateral damage: `protocols.md § Semver` worked example rewrote to say "the v1.3.0 wrapper rename renamed every legacy `.doc` / `.doc__*` class...to `.book` / `.book__*`" so the example still names the old class explicitly.
15. CSS dedupe. Audit revealed the existing codebase was already properly scoped — every Tier-2 adjacency rule (`h2 + p`, `p:has(+ ul)`, next-sibling margin-collapse, heading-to-paragraph spacing, quote treatment, list-item spacing) lived under `.book__section` (renamed from `.doc__section`) or under another widget scope (`.inspector__group`, `.card`, `.comment-*`). No unscoped Tier-2 twins found. Tier-1 widget + utility classes (`.button`, `.card`, `.field`, `.tag`, `.switch`, `.t-*`) stayed unscoped as required. Nothing to delete.
16. Updated every SKILL.md reference to changed paths. `../kk-design-system/doc-format.md` → `../kk-design-system/pipeline/pipeline.md § Documentation contract`; `../kk-design-system/patterns/*.md` → `../kk-design-system/canon/patterns.md`; `patterns/strategy-doc.md` → `../../proposals/strategy-doc-interim.md (out of kit since v1.3.0)`; `patterns.html` (pattern-discoverer SKILL.md) → `canon/patterns.md § Registry of additional patterns` with prose rewritten so the discoverer appends rows to the registry table inside canon rather than to a root HTML file. `skills/kk-design-system/SKILL.md` reference list rewritten from scratch to match the new tree (manifesto + canon/{patterns,components,voice} + pipeline/{pipeline,protocols} + tokens). `skills/kk-ds-maintainer/SKILL.md § The bundle` bullet 3 rewritten to name the full new canon set (no more `components.md` stub mention).
17. Updated `CHANGELOG.md` with a new 1.3.0 entry. Replaced the earlier (rejected, unshipped) 1.3.0 markdown-as-source entry wholesale. New shape: Breaking (`.doc` → `.book`) lead, Added (canon/, pipeline/, protocols.md, narrow.html, seven new anchors, hallway index.html), Removed (root patterns.html, doc-format.md, old components.md stub, patterns/ dir, `.doc` namespace), Moved (voice.md, pipeline.md, strategy-doc.md, manifesto.md thinned), Voice (Lebedev strip), Fixed (kit.js selector relax), Unchanged (renderer, tokens.json, comment.md runtime).
18. Confirmed `package.json` + `.claude-plugin/plugin.json` both at `1.3.0`. No drift; no change needed.

## Files created

- `skills/kk-design-system/canon/components.md`
- `skills/kk-design-system/canon/patterns.md`
- `skills/kk-design-system/pipeline/protocols.md`
- `demos/fundamental--accepted/patterns/narrow.html`
- `proposals/strategy-doc-interim.md`
- `documentation/2026-04-24-content-architecture/05-design-engineer.md` (this file)

## Files moved

- `skills/kk-design-system/voice.md` → `skills/kk-design-system/canon/voice.md`
- `skills/kk-design-system/pipeline.md` → `skills/kk-design-system/pipeline/pipeline.md`
- `skills/kk-design-system/patterns/strategy-doc.md` → `proposals/strategy-doc-interim.md` (with one-line header)

## Files deleted

- `skills/kk-design-system/doc-format.md` (folded into pipeline.md § Documentation contract)
- `skills/kk-design-system/components.md` (old re-export stub; canonical home now `canon/components.md`)
- `skills/kk-design-system/patterns/` (empty directory after strategy-doc.md moved out)
- `patterns.html` (root file; content absorbed into `canon/patterns.md § Registry`)

## Files renamed inside

- `skills/kk-design-system/manifesto.md` — 685 lines wholly replaced by ~200-line draft from 03b. Same path.
- `index.html` — old 14k-byte shell wholly replaced by 245-line three-column hallway. Same path.
- `.doc` class namespace renamed to `.book` across: `style.css`, `js/kit.js`, `index.html`, all `demos/` HTML, all `skills/` + `docs/` markdown code fences, every `SKILL.md`. Also `#doc` id selector in two kit.js functions relaxed to query `.book` first.

## Flags resolved

- **P2 (slug mismatch).** Direction doc wrote `three-columns.html`; disk had `three-column-shell.html`. Resolved by using the on-disk slug verbatim in both the top-level §Three columns preview link and the registry-table row. No file renamed.
- **P3 (missing preview slice).** `demos/fundamental--accepted/patterns/narrow.html` did not exist. Created at task 12 matching the shape of `three-column-shell.html`; uses `sidebar--collapsed` + `inspector--modal` states.
- **C1 (#material).** Added as a new `<article class="doc__section" id="material">` before `#color`.
- **C2 (#radii).** Added as a new article before `#motion`.
- **C3 (#comment).** Added as a new article between `#stack` and `#deck`.
- **C4 (#navigation).** Added as a new article between `#opening` and `#reading`.
- **C5 (#preview-frame).** Added as a new article after `#figures`.
- **C6 (#registry-table).** Added as a new article after `#preview-frame`.
- **C7 (#spec-list).** Added as a new article after `#registry-table`.
- **I2 (kit.js #doc selector).** `initScrollSpy` and `initCommentSelectionFlow` both relaxed: `document.querySelector('.book') || document.getElementById('doc')`. Element id `doc` preserved on the hallway's `<main class="book">` element for backward compatibility.

Total: 10/10 flags resolved.

## Open issues for review

- **`js/patterns.js` and `prototypes/` orphans.** The root `patterns.html` is deleted but `js/patterns.js` still exists (its top comment names patterns.html as the only loader). Not in the task-14 rename scope (task 14 enumerates `style.css`, `vars.css`, `js/md.js`, `js/kit.js`, HTML + markdown — not `js/patterns.js`). Task 17 CHANGELOG does not mention deleting patterns.js either. The file is dead code; ship-review can decide to delete in a follow-up patch or accept the orphan. Same question for `prototypes/prototype-alpha/` and `prototypes/prototype-operator-alpha/` which still carry `.doc` class references — they are pre-kit historical prototypes and not in scope for the rename.
- **Signoff signature paths.** Each canon book's signoff block uses `src="../../../signature.svg"` (canon/) or `src="../../signature.svg"` (pipeline/). These resolve correctly when the file is viewed in a markdown viewer under its canon path, but when rendered inside the root `index.html` via `data-md-src` the relative path resolves against `index.html`'s base URL (the repo root), so `signature.svg` works bare. The markdown-rendered-inside-shell case needs one more pass to rewrite signature image srcs on the fly, or each canon file's signoff block should use a root-relative path like `/signature.svg`. Flag for stage 6b / stage 7.
- **`.claude/skills/` vs `skills/` hard links.** Both SKILL.md sets share the same inode (hard-linked). Changes to one side appear on both. Clean today; worth noting for future retros because a cp-without-symlink would silently break this contract.
- **Documentation HTML not renamed.** Per task 14 explicit carve-out ("HTML inside doc artifacts is historical — leave those alone"), `documentation/**/*.html` files retain `.doc` classes. Not a defect; by design. Cold reads at stage 6b should not flag these.

## Flags flagged but not in task split

None. Every flag from the 04 doc that the stage 5 task split owns has been resolved. The P1 flag (preview-frame + registry-table without dedicated anchors at hand-off time) resolved automatically via task 13, which added those anchors.

## Gate

Pending. Working tree in the right shape; no commits made per KK's instruction.

## Hand-off

Stages 6b + 6c run in parallel:
- **Stage 6b — consistency-DS (Dieter Rams).** Cold read of the built prototype against `canon/components.md` + `tokens.json`. Per-block strict audit — every class matches a kit pattern, no off-inventory classes, no off-grid spacing, no off-token color. Inputs: `index.html`, every `canon/*.md` and `pipeline/*.md`, the new `demos/fundamental--accepted/patterns/narrow.html`, `tokens.json`.
- **Stage 6c — voice-reviewer (George Orwell).** Cold read of every visible UI string against `canon/voice.md`. Audits the new manifesto prose, canon/components.md rules, canon/patterns.md pointers, pipeline/protocols.md checklist body, and every string in the rebuilt index.html inspector cards.

Stage 7 (meta-reviewer, Anna Wintour) runs after both 6b + 6c land.
