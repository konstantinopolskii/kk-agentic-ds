# Changelog

Every release names: what was added, what was removed, what moved. Consumers read this when bumping versions.

## 0.5.0 — 2026-04-22

Typeface swap. Commissioner replaces Manrope. Both ship under SIL OFL 1.1, so this is a visual call, not a license fix. Commissioner's humanist letterforms read warmer at hero (66 px) and display (38 px) sizes than Manrope's grotesque, which suits the signed-deliverable tone of the kit.

### Added
- `fonts/commissioner/Commissioner-Latin.woff2` — weights 200–800, Latin + Western European script coverage.
- `fonts/commissioner/Commissioner-Cyrillic.woff2` — weights 200–800, Russian, Ukrainian, Belarusian, and allied scripts.
- `fonts/commissioner/OFL.txt` — SIL OFL 1.1 license for the Commissioner files.

### Removed
- `fonts/manrope/` — all Manrope `.woff2` files and the OFL license. Not purged from git history this time; the outgoing typeface was itself redistributable, so the binaries can stay in prior commits.

### Moved
- `--font-body` in `vars.css` and `type.family` in `tokens.json` now resolve to `Commissioner`. System fallbacks unchanged.
- `style.css` `@font-face` blocks point at `fonts/commissioner/*.woff2`; `index.html` preload points at the Latin subset.
- Typography rule in `manifesto.md` names Commissioner. Regular-on-Medium guidance carries over unchanged.
- `kk-design-system` skill `description` in `SKILL.md` frontmatter now reads "Commissioner typography" instead of "Manrope typography".
- Type credit in `index.html` now reads "Commissioner. A variable font (SIL OFL 1.1) by Kostas Bartsokas."

### Open
- Nothing carried over.

## 0.4.0 — 2026-04-21

Typeface swap. PP Neue Montreal was never licensed for redistribution inside an npm package — Pangram Pangram's EULA §3.7 prohibits distributing copies or uploading the font publicly. The kit now ships Manrope, a variable font under SIL OFL 1.1.

### Added
- `fonts/manrope/Manrope-Latin.woff2` — weights 200–800, Latin + Western European script coverage.
- `fonts/manrope/Manrope-Cyrillic.woff2` — weights 200–800, Russian, Ukrainian, Belarusian, and allied scripts.
- `fonts/manrope/OFL.txt` — SIL OFL 1.1 license for the Manrope files.
- Single `<link rel="preload">` in `index.html` pointing at the Latin subset; Cyrillic lazy-loads via `unicode-range`.

### Removed
- `fonts/montreal/` and every PP Neue Montreal `.woff` / `.woff2` binary. Purged from the entire git history with `git filter-repo --path fonts/ --invert-paths`; all prior commits and tags rewritten. Old commit SHAs are dead.
- The legacy `.woff` fallback. Manrope ships `.woff2` only — evergreen browsers cover it, IE11 is not a support floor.

### Moved
- `--font-body` in `vars.css` and `type.family` in `tokens.json` now resolve to `Manrope`, falling back to the system stack.
- `style.css` `@font-face` blocks collapsed from three weight-specific declarations to two subset-specific declarations. Variable-weight axis (`font-weight: 200 800`) covers the full range per subset.
- Typography rule in `manifesto.md` names Manrope and explains why the 400 axis is still skipped at body size.
- `kk-design-system` skill `description` (in `SKILL.md` frontmatter) now reads "Manrope typography" instead of "PP Neue Montreal". The skill `homepage` field updated to the real repo URL.

### Open
- Nothing carried over. Backlog is empty.

## 0.3.1 — 2026-04-21

Resolves the mobile padding drift open item from 0.3.0.

### Fixed
- Phone columns now fill the viewport. The 0.3.0 phone grid `.app { grid-template-columns: 1fr }` was losing the cascade to the tablet rule `.app[data-view="nav"] { grid-template-columns: minmax(220px, var(--sidebar-w)) 1fr }` on specificity (0,1,0 vs 0,2,0), so sidebar stayed pinned at 260 px even at 392 px viewport. Phone selector raised to `.app[data-view]` to tie on specificity and win on source order.
- Inspector goes flush on phone. Zero horizontal column padding so shout cards own the full viewport width; card-internal `--card-inset-x` (12 px) is the only horizontal rhythm.
- Doc and nav move to a 24 px rail on phone (`--space-6`, up from 16 px).
- Nav-group dividers run edge-to-edge on phone. `left: 0; right: 0;` override for `.nav-group::after`.
- Doc intro sits snug against the top of the column on phones. `.doc__intro { padding-top: 0 }`.

### Added
- `viewport-fit=cover` on the meta viewport so iOS safe areas are reported; pages can draw under the status bar and home indicator.
- `html, body { width: 100% }` in the base reset (defensive).

### Moved
- `homepage` in `package.json` and `.claude-plugin/plugin.json` updated from the placeholder `github.com/kk-consulting/kk-design-system` to the actual repo `github.com/konstantinopolskii/kk-agentic-ds`. Added a `repository` field to `package.json` so `npm` can resolve the git install.

## 0.3.0 — 2026-04-21

### Added
- Global `::selection` rule in `style.css`. Selection renders inverted using `--color-text` on `--color-bg`. No native blue, no custom color. Documented as a color foundation in `manifesto.md`.
- `Dismiss` row under `#states` in `index.html`. Clicking empty space inside the inspector collapses whatever is active.

### Fixed
- 3D card stack on mobile. Tap handlers now scope per card; the runtime overlay that swallowed every touch is gone.
- Comment selection. The native range re-anchors onto the freshly-wrapped `.highlight` spans, so `⌘/Ctrl+C` copies the marked text again.
- Inspector glide scroll when a draft dismisses mid-promotion. `setActive` defers its layout measurement one frame so the `MutationObserver` that removes an empty draft flushes before `cardRect.top` is read.
- Tablet column resize across 1025–1440 px. `.app` grid-template-columns uses clamp-based widths, so sidebar and inspector shrink smoothly with the viewport instead of gluing to their max until the tablet breakpoint. `#columns` spec table updated.

### Moved
- `clearDomSelection` helper removed from `index.html`. Unused after the selection-preserving rewrite.

### Open
- Mobile padding drift logged in `#backlog` with specifics: phone `.doc` rail is 16 px, `.inspector` rail is 8 px. Unify or justify — pending review.

## 0.2.0 — 2026-04-21

### Added
- Frontend sub-skill `kk-ds-frontend` in `skills/kk-ds-frontend/` — stage 4 code pass. Rewrites the stage-three draft for semantics, accessibility, JS simplicity, mobile behavior, and cross-browser safety. Visual is frozen; kit classes, tokens, and layout structure stay untouched. Runs before `kk-ds-supervisor`.
- `#implementation` section in `index.html` describing the new stage-4 role.

### Moved
- Stage 4 in `pipeline.md` expanded into two sub-stages: `4a` frontend rewrite, `4b` supervisor audit. Supervisor behavior and output shape unchanged.
- `#stack` card in `index.html` now lists three skills. Supervisor entry narrowed to "stage 4, audit".
- Step 4 row in the `#pipeline` overview card names both roles.

## 0.1.0 — 2026-04-21

### Added
- npm package `@kk/design-system` shipping `vars.css`, `style.css`, `fonts/`, `signature.svg`.
- Claude skill `kk-design-system` in `skills/kk-design-system/` — SKILL.md, tokens.json, manifesto.md, pipeline.md, components.md, voice.md, patterns/strategy-doc.md.
- Supervisor sub-skill `kk-ds-supervisor` in `skills/kk-ds-supervisor/` — stage 4 audit.
- Claude Code plugin manifest at `.claude-plugin/plugin.json`.
- Postinstall symlinks `skills/` into consumer's `.claude/skills/`.

### Removed
- Old copy-files install instructions from the documentation.
