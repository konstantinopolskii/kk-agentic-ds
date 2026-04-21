# Changelog

Every release names: what was added, what was removed, what moved. Consumers read this when bumping versions.

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
