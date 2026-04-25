---
session: 2026-04-24-content-architecture
stage: 5 (rerun, canon scope)
role: ds-maintainer (Rachel Andrew)
input: decision-brief.md + cluster-b-components.html
output: canon evolves — manifesto + components.md + patterns.md + tokens.json
gate: pending — engineer subagent runs in parallel; 6b/6c/7 re-run after
---

## Files modified

- `skills/kk-design-system/manifesto.md` — added FAB shadow exception inside §Principles § The iPad feel as a single sentence in voice.
- `skills/kk-design-system/canon/components.md` — forbidden allowlist updated; `.t-code` and `.t-code--block` introduced; `.t-mono` row dropped from typography utility table; type-rules tightened to strict 400/500/700; FAB exception and flat-geometry box-shadow rule added under §Foundations § Material; seven-keyframe animation registry plus blur policy and new-animation policy added under §Foundations § Motion; component registry table gained `t-code` row.
- `skills/kk-design-system/canon/patterns.md` — added §Card stack — columns top-level pattern; registry table gained `card-stack-columns` row; legacy `t-mono` references in registry table swapped to `t-code`; counts bumped to four top-level / twelve registry.
- `skills/kk-design-system/tokens.json` — `weights` block now lists 400/500/700 numeric, drops the "Book" wording, and the `philosophy` line names the three numeric weights explicitly.

## Files created

- None inside the kit. Self-doc only — this file.

## New rules added

- FAB shadow exception. Soft shadow permitted on active elements on a black or inverted background. Floating action button at narrow viewports qualifies. Lives in manifesto §The iPad feel and components.md §Foundations § Material.
- Highlight as flat-geometry box-shadow. `box-shadow` with zero blur is shape, not light, and is permitted on the same logic as the FAB exception. Lives in components.md §Foundations § Material.
- Animation registry. Seven keyframes named with mechanics, intent, and applications. Lives in components.md §Foundations § Motion.
- Blur policy. Blur permitted only via reuse of `inspector-card-focus` or maintainer stamp.
- New-animation policy. New motion fits one of the seven keyframes first, evolves the registry second.
- `.t-code` and `.t-code--block` component. One class for inline code, modifier for block paragraphs with a left rail. Replaces `.t-mono` and `.tag--inline`.
- §Card stack — columns pattern. Two-to-four cards arranged horizontally; collapses to vertical stack at narrow viewport. Replaces the legacy `.tier` shape.

## Rules removed

- Font-weight 600 — never tokenised, now explicitly forbidden in components.md §Foundations § Type.
- `.t-mono` typography utility class — dropped from the utility table; superseded by `.t-code`.
- `.tag--inline` — superseded by `.t-code` (inline) and `.t-code--block` (block); engineer removes the CSS.
- `.aside`, `.checkbox` — engineer removes the CSS; allowlist drops the prefixes.
- `.tier` / `.tiers` — replaced by `.card-stack--columns` pattern; engineer removes the CSS.
- "Book (400)" wording in tokens.json `weights.note` — replaced with numeric-only language.

## Open issues

- Engineer (parallel) needs to ship `demos/fundamental--accepted/patterns/card-stack-columns.html` so the deep link in patterns.md resolves. Same for `#code` anchor inside `demos/fundamental--accepted/index.html`.
- 6b/6c/7 will re-run on the new build to confirm the new prefixes resolve and the prose carries no AI tells in the added paragraphs.

## Hand-off

- kk-role-design-engineer (parallel) — owns CSS, JS, HTML changes. Adds `.t-code` styles, removes `.t-mono` / `.tag--inline` / `.aside` / `.checkbox` / `.tier` / `.tiers`, removes the `.fab` shadow if KK chose that branch (this maintainer wave kept the FAB shadow as a documented exception per brief), keeps the `inspector-card-focus` blur, ships the `card-stack-columns` slice, lands the `#code` anchor in the fundamental demo.
- kk-role-consistency-ds (6b rerun) — re-cold-reads the build against the new components.md and tokens.json. Expects the previous 21 cluster-A flags to drop to whatever survives after the engineer pass.
- kk-role-voice-reviewer (6c rerun) — checks the new prose blocks added in this wave (FAB exception sentence, type-rules rewrite, animation registry, code component, column-stack pattern) against the AI-tells inventory.
- kk-role-meta-reviewer (7 rerun) — gates ship.
