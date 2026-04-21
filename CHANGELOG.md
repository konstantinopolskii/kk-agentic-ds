# Changelog

Every release names: what was added, what was removed, what moved. Consumers read this when bumping versions.

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
