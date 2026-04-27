---
session: 2026-04-27-auto-sidebar-nav
stage: maintainer
role: kk-ds-maintainer
input: 05-design-engineer.md §Maintainer proposals; user stamp on path (b) ship with named exception
output: bundle landed on disk (version, CHANGELOG, canon, integration doc, cache-bust, kit.js docstring); commit + tag + push held for user stamp
gate: awaiting user stamp on git ship steps
---

# Maintainer — auto sidebar nav

Disk changes for v1.10.0 landed. Six proposals from `05-design-engineer.md` executed plus one drift correction (plugin.json had skipped the 1.9.0 release). Commit, tag, and push held back for explicit user stamp per the session brief.

## Bundle landed

| File | Change |
|---|---|
| `package.json` | 1.9.0 → 1.10.0 |
| `.claude-plugin/plugin.json` | 1.8.0 → 1.10.0 (drift from 1.9.0 corrected; brought back into lockstep) |
| `CHANGELOG.md` | New `## 1.10.0, 2026-04-27` section. Heading-rank rule, three modes named, Added / Changed / Removed / Migration / Exceptions shipped breakdown |
| `skills/kk-design-system/canon/components.md` § Navigation | Snippet + rules updated. Auto-fill default + hand-curated opt-out shape both shown. Bold label = `<a class="t-subtitle nav-group__head">`. `data-nav="manual"` attribute documented |
| `docs/integration/sidebar-nav.md` | New file. Full integration pattern: heading-rank rule, three-mode generated shape, opt-out, slug rules, public API touch points, migration |
| `js/kit.js` | Docstring updated to name the sidebar TOC auto-fill alongside the existing comment-stack declarative opt-outs |
| `index.html` | CSS link cache-bust `?v=1.3.0` → `?v=1.10.0` (both `vars.css` and `style.css`) |

Hardlink between `skills/kk-design-system/canon/components.md` and `.claude/skills/kk-design-system/canon/components.md` verified intact post-edit (`stat -f "%i %N"` returns the same inode `7399280` for both paths).

## Decisions made by the maintainer

1. **Kept `data-nav="manual"` over `data-kk-nav`.** `06b-consistency-ds.md` flagged the prefix inconsistency with the `data-kk-comments` family. The kit carries two attribute conventions: `data-kk-*` for page-level declarative opt-outs (set on `<html>`, configures kit-wide behaviour), and `data-*` for per-element functional attributes (`data-md-src`, `data-view-target`, `data-md-heading-offset`). `data-nav="manual"` is per-element scope on a specific `<nav>`, which aligns with the second convention. Documented the distinction in `docs/integration/sidebar-nav.md`. Kept the analyst-stamped attribute name to honour chain integrity.

2. **`KK.version` literal in `js/kit.js:134` left at `'0.16.0'`.** Internal version field has historically drifted from the package version; not in scope to align this session. Flagged for a future clean-up pass.

3. **Skipped a separate `Runtime` section in `manifesto.md`.** Maintainer proposal 4 suggested documenting `KK.refresh()` + `kk:md-rendered` listener at a central runtime API location. The kit's pattern is per-component integration docs (`docs/integration/<name>.md`); the new behaviours land in `docs/integration/sidebar-nav.md § Public API touch points` instead. Keeps the canon focused on inventory; runtime behaviour lives in the integration files.

4. **Component registry table (`canon/components.md:11-30`) unchanged.** `nav-group__head` is a modifier under `nav-group`, which itself is not a registry row (the registry lists top-level component blocks like `sidebar__nav`, not modifiers). Modifiers under the same block do not earn registry rows; the §Navigation section explanation is sufficient.

## Stamps remaining

Per the session brief, the git ship steps are held for user confirmation. The four-step ship protocol per `kk-ds-maintainer/SKILL.md § Ship protocol`:

1. **Commit.** Stage the explicit paths landed above. Commit message format: `UI kit 1.10.0: auto-generated sidebar nav`. Body uses the CHANGELOG's Added / Changed / Removed breakdown.
2. **Tag.** `git tag -a v1.10.0 -m "UI kit 1.10.0 — auto-generated sidebar nav"`.
3. **Push main.** `git push origin main`.
4. **Push the tag.** `git push origin v1.10.0`.

User stamp required before step 1 and again (per the maintainer skill's standing rule) before step 3. The kit version is not shipped until both pushes complete.

## Open follow-ups (logged for the user)

1. **Voice debt in `index.html` sidebar.** `Agentic Design System` Title Case heading and `Powered by kk.consulting` passive footer. Logged as named exceptions in session README + CHANGELOG `## 1.10.0 § Exceptions shipped`. Follow-up canon-rework session decides whether the brand name is exempt or flattens to sentence case.

2. **`KK.version` internal drift.** Out of session scope; flagged here so the next maintainer pass can decide whether to align.

3. **Manifesto restructure.** The user opted not to restructure `manifesto.md` to the four-layer model in this session — they wanted to see the auto-nav rule produce the natural shape from existing headings first. The readback at stage 7 did not surface a request to flip; the rule produced 9 bold labels for the manifesto, only Principles expanding. Whether that reads worse than the prior hand-curated four groups is a question for the user's first browser session against v1.10.0; if so, a follow-up canon-rework session can restructure the manifesto to introduce h2 group headers under the four-layer model.

## Hand-off

→ User stamps the four ship steps. On stamp, maintainer executes commit + tag + push. On hold, the bundle stays on disk in working state.
