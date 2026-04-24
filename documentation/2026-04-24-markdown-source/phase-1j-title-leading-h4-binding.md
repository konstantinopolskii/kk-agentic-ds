# Phase 1j. Title leading matches body, h4 binding codified

Two refinements on top of `e3510d3`. `--lh-title` lifted 28 → 32 so title and body share a line-box. Sidebar nav-group heading tag shifted `<h3>` → `<h4>` across every kit canvas, with the `t-subtitle` class kept as-is. Manifesto absorbs the new rank binding: every `<h4>` in kit surfaces carries `t-subtitle`.

## Change set

### 1. `vars.css`

`--lh-title` 28 → 32. Same value as `--lh-body`.

### 2. `skills/kk-design-system/tokens.json § typography.scale.title`

`lineHeight` 28 → 32. Use note extended: "Card headings. Leading matches body — title and body lines share a vertical rhythm."

### 3. `skills/kk-design-system/components.md § Typography utility classes`

`t-title` row: 22 / 28 → 22 / 32. Use note extended: "Card headings. Leading matches body."

### 4. Nav-group heading tag `<h3>` → `<h4>`, class unchanged

Per-file swap count (nav-group heading pattern only):

| File | h3 → h4 swaps |
|---|---|
| `index.html` | 8 |
| `patterns.html` | 2 |
| `demos/md-renderer-smoke/index.html` | 1 |
| `demos/fundamental--accepted/index.html` | 5 |
| `demos/fundamental--accepted/patterns/sidebar-nav.html` | 4 |
| `demos/fundamental--accepted/patterns/three-column-shell.html` | 1 |
| `prototypes/prototype-alpha/index.html` | 4 |
| `prototypes/prototype-operator-alpha/index.html` | 2 |
| `skills/kk-design-system/patterns/strategy-doc.md` | 1 |

Total: 28 swaps across 9 files.

### 5. `skills/kk-design-system/manifesto.md § Typography rhythm`

Two new paragraphs appended after the weight-step paragraph.

Paragraph one — rank binding. Every `<h4>` element in kit surfaces carries `t-subtitle`. The tag declares the outline position, the class declares the visual rank. `js/md.js` enforces the pair for rendered markdown (source `####` emits `<h4 class="t-subtitle">`); HTML authors write the two together. `<h3 class="t-subtitle">` is not a valid pairing in kit surfaces.

Paragraph two — title leading. `--lh-title` sits at 32, same as `--lh-body`, both at 22 px font size. Mixed-rank lines (title + body on the same row, inline code next to title text) stay on one vertical rhythm.

## Pattern slice coverage

The brief listed eleven pattern slices under `demos/fundamental--accepted/patterns/`. Only two of the eleven carry a sidebar nav-group pattern inside the slice HTML:

- `sidebar-nav.html` — the slice IS the sidebar-nav pattern, demoing the four-group structure. 4 nav-group headings.
- `three-column-shell.html` — the slice demos the full three-column shell, which contains a sidebar column with one nav-group. 1 nav-group heading.

The remaining nine slices (`card-stack.html`, `comment-thread-resolved.html`, `comment-thread.html`, `comments-group.html`, `deck-in-shout.html`, `doc-section.html`, `inspector-group.html`, `signoff.html`, `spec-list.html`) are standalone demos that render their pattern inside a minimal frame and do not carry sidebar-nav markup. Zero nav-group h3s present, zero swaps needed. No drift.

## Non-nav `<h3 class="t-subtitle">` occurrences

Zero. Every `<h3 class="t-subtitle">` in the kit sat inside `<section class="nav-group">`. None left untouched.

## Non-`t-subtitle` `<h4>` occurrences in swept surfaces

One existing `<h4>` found prior to the sweep — already compliant.

| File:line | Tag + classes | Disposition |
|---|---|---|
| `demos/fundamental--accepted/index.html:781` | `<h4 class="t-subtitle">Scope</h4>` | Compliant with the new rule. No change. |

Zero `<h4>` elements in any swept surface land outside the `t-subtitle` class. The new rule is already obeyed.

## `fw-medium` sweep results

Five matches across the repo.

| File:line | Context | Disposition |
|---|---|---|
| `vars.css:58` | `--fw-medium: 500;` — token definition | Legitimate. Keep. |
| `style.css:99` | `.t-display--medium { font-weight: var(--fw-medium); }` — display-heading subtitle variant | Legitimate. Keep. Separate class from t-subtitle. |
| `CHANGELOG.md:70` | Historical Fixed entry describing the round-5 Medium 500 experiment | Historical append-only record. Keep. The narrative already closes with the phase-1h revert entry on line 77. |
| `documentation/2026-04-24-markdown-source/phase-1g-jobs-round-5-rework.md:56` | Session doc recording the Medium 500 decision at round 5 | Historical session doc. Keep. |
| `documentation/2026-04-24-markdown-source/phase-1h-tsubtitle-revert.md:20` | Diff block showing the revert from Medium back to Bold | Historical session doc. Keep. |

Zero stale live references on `t-subtitle`. The phase-1h revert already cleaned every live site; `style.css § .t-subtitle` declares `font-weight: var(--fw-bold)` with no residual comment. Nothing to clean.

## Verification

Server: `python3 -m http.server 8765` from repo root, already running on port 8765.

Measured computed styles at `http://localhost:8765/demos/md-renderer-smoke/` (1440 × 900, 2× DPR):

- `.t-title` — 22 px / 32 px / Bold 700. Line-height matches `.t-body` (22 / 32). Confirms step 1.
- `.t-body` — 22 px / 32 px / Medium 500.
- `.nav-group h4.t-subtitle` — 18 px / 24 px / Bold 700. Confirms the nav-group heading renders as `h4` with `t-subtitle` styling unchanged.
- `.nav-group h3` — `null`. No h3 left inside any nav-group.
- Console: zero errors, zero warnings.

Screenshots:

- `documentation/2026-04-24-markdown-source/screenshots/title-leading-h4-binding-viewport.png` — 1440 × 900 viewport.
- `documentation/2026-04-24-markdown-source/screenshots/title-leading-h4-binding-full.png` — 1440 full-page scroll.
- `documentation/2026-04-24-markdown-source/screenshots/title-leading-h4-binding-1280.png` — 1280 × 800 smaller breakpoint.

## Bundle

| Bundle item | Touched |
|---|---|
| Code | `vars.css`, `index.html`, `patterns.html`, `demos/md-renderer-smoke/index.html`, `demos/fundamental--accepted/index.html`, `demos/fundamental--accepted/patterns/sidebar-nav.html`, `demos/fundamental--accepted/patterns/three-column-shell.html`, `prototypes/prototype-alpha/index.html`, `prototypes/prototype-operator-alpha/index.html`, `skills/kk-design-system/patterns/strategy-doc.md` |
| Doc | `skills/kk-design-system/manifesto.md § Typography rhythm` |
| Skill reference files | `skills/kk-design-system/tokens.json`, `skills/kk-design-system/components.md` |
| CHANGELOG | 1.2.0 block amended: new `### Changed` + extended `### Moved` |
| Version | No bump — mid-1.2.0 refinement, per instructions |
| SKILL.md | No behavior change |
| Integration doc | No public API surface touched |

## Signoff

Rachel Andrew (maintainer skill), 2026-04-24.
