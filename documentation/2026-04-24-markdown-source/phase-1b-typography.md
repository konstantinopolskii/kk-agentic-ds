---
session: 2026-04-24-markdown-source
stage: phase-1b
role: maintainer
input: https://bureau.ru/soviet/20140818/ + current style.css + smoke test
output: style.css audit + fixes + rule canonization + skill updates
gate: KK stamp after screenshots review
---

Phase 1b of the markdown-as-source initiative. Phase 1 shipped the `js/md.js` renderer plus the kit-shell smoke test at `demos/md-renderer-smoke/`. Typography in the smoke read wrong at first glance — headings grouped with the wrong paragraph, gaps between a heading and its first line were tighter than the heading's own line-height, top page margin was thinner than the body line-height. User surfaced Artemy Lebedev's Bureau article "Rule of Inner and Outer" and asked that its fourteen rules become canon plus be applied to the kit's doc-column CSS.

## Raw input

User direction:

> Kit typography + margins read badly in the current smoke test. [...] Artemy Lebedev's Bureau article "Rule of Inner and Outer" (https://bureau.ru/soviet/20140818/). Apply the rules to canon + promote into skill guidance for future work.

Orchestrator brief carried the fourteen rules verbatim plus the three-commit shape.

## Audit table

Tokens on hand (`vars.css`): `--lh-hero: 66`, `--lh-display: 38`, `--lh-title: 28`, `--lh-subtitle: 24`, `--lh-body: 32`, `--lh-caption: 24`.

| # | Rule | Status before | Status after | Old value | New value |
|---|---|---|---|---|---|
| 1 | Caps letter-spacing | pass (n/a) | pass | — | — |
| 2 | Lowercase no letter-spacing | pass | pass | `--track-tight: -0.01em` tightens only | unchanged |
| 3 | Vertical strokes equal intervals | pass | pass | typographic, not code | unchanged |
| 4 | Caps letter-spacing < line-height | pass (n/a) | pass | — | — |
| 5 | Caps line-spacing ≥ cap height | pass (n/a) | pass | — | — |
| 6 | Line-height > word-spacing | pass | pass | browser default word-spacing | unchanged |
| 7 | Descenders touch ascenders at min line-height | pass | pass | display 38/38 intentional | unchanged |
| 8 | Longer lines → greater line-height | pass | pass | 612 px max; body 22/32 | unchanged |
| 9 | Line-height ≤ outer page margins | FAIL | pass | `.doc` padding-top `var(--space-4)` = 16 px vs body 32 px lh | `var(--space-8)` = 32 px |
| 10 | List item spacing > line-height | marginal | marginal | `.t-list > li` 12+12 = 24 vs caption lh 24 | unchanged; judgement call |
| 11 | Page numbers closer to text than to edge | pass (n/a) | pass | digital, no page numbers | — |
| 12 | Heading closer to following paragraph than previous | FAIL | pass | `.doc__section` symmetric `gap: 20` | asymmetric margins; 60 above heading, 40 below |
| 13 | Heading-to-paragraph ≥ heading line-height | FAIL | pass | section gap 20 vs display lh 38; hero-to-intro 24 vs hero lh 66; part-to-section 24 vs hero lh 66 | section below-display 40 ≥ 38; hero-to-intro 72 ≥ 66; part-to-section 80 + 12 gap = 92 ≥ 66 |
| 14 | Inner ≤ outer | pass | pass | inner 20 ≤ outer 52 | unchanged |

## CSS edits — `style.css`

Four edits, contiguous to the doc-column rhythm section.

1. `.doc` padding top `var(--space-4)` → `var(--space-8)`. Rule 9: outer page top margin rises from 16 to 32, matching body line-height.
2. `.doc__intro` padding-top `var(--space-3)` → `var(--space-15)`. Rule 13: hero (66/66) to intro is now 12 px flex gap + 60 px padding = 72 px, clear of the 66 px line-height floor.
3. `.doc__section` — removed `gap: var(--space-5)`. Replaced with explicit sibling-margin rules:
   - `.doc__section > * + *` → 20 px (inner paragraph rhythm).
   - `.doc__section > .t-hero + *` → 80 px (rule 13: hero-class heading rendered inside a section).
   - `.doc__section > .t-display + *, .t-title + *, .t-subtitle + *` → 40 px (rule 13: ≥ 38 display line-height).
   - `.doc__section > * + .t-hero` → 80 px (rule 12: preceding ≥ following).
   - `.doc__section > * + .t-display, * + .t-title, * + .t-subtitle` → 60 px (rule 12: 60 > 40, so heading groups with what follows).
4. `.doc__part + .doc__section` padding-top `var(--space-6)` (24 px) → `var(--space-20)` (80 px). Rule 13: part heading is hero-size (66 px lh); 80 + 12 parent flex gap = 92 px.

No unrelated sections touched.

## Manifesto.md additions

`skills/kk-design-system/manifesto.md § Foundations § Typography rhythm` — new section inserted after `### Space`.

Content:
- Source cite: Artemy Lebedev, Bureau, "Rule of Inner and Outer" (bureau.ru/soviet/20140818/).
- Core principle stated up front: **inner ≤ outer**.
- Fourteen rules as a numbered list, declarative, sentence case.
- Three emphasis paragraphs on the rules that bite hardest in practice (12, 13, 14).

## Skill additions

Three skill files carry the typography-rhythm rules into role guidance. Each cites `manifesto.md § Typography rhythm` so the canonical list stays single-source.

- `skills/kk-role-design-engineer/SKILL.md` — build rule 8 "Typography rhythm" added under §Build rules, plus typography-rhythm added to the §Load the canonical rules first line for manifesto foundations.
- `skills/kk-role-fresh-eyes-jobstory/SKILL.md` — character paragraph extended: Jobs flags rule-12, rule-13, rule-9, rule-14 violations at the 0.2-second bar.
- `skills/kk-role-consistency-jobstory/SKILL.md` — character paragraph extended with the same four-rule flag list for cold-read audits.

Hardlinks re-established after atomic writes broke inode parity. Verified with `stat -f "%i %N"`:

```
6011169  skills/kk-role-design-engineer/SKILL.md
6011169  .claude/skills/kk-role-design-engineer/SKILL.md
6011195  skills/kk-role-fresh-eyes-jobstory/SKILL.md
6011195  .claude/skills/kk-role-fresh-eyes-jobstory/SKILL.md
6011199  skills/kk-role-consistency-jobstory/SKILL.md
6011199  .claude/skills/kk-role-consistency-jobstory/SKILL.md
6011162  skills/kk-design-system/manifesto.md
6011162  .claude/skills/kk-design-system/manifesto.md
```

Manifesto kept its hardlink through the atomic write; the three SKILL.md writes dropped theirs. Relinked via `ln -f`.

## Verification evidence

Headless Chrome 147 against `http://localhost:8765/demos/md-renderer-smoke/`. Three screenshots landed:

- `screenshots/after-typography-fix.png` — 1440 × 900 viewport. Top of the doc column. Hero "md.js smoke test" sits with full breathing room above; intro paragraph lands 72 px below the hero; "Samples" part heading reads as a clear break; "Sample A" section heading starts well clear of the preceding part heading.
- `screenshots/after-typography-fix-full.png` — 1440 × 3200 viewport. Full-page scroll. Every section reads with the heading glued to what follows, not what precedes. Sample A heading → first paragraph is clear of the 66 px hero line-height. Sample A inner subheadings (Section heading, Card-level heading, Subtitle-level heading) stay on the rhythm. Sample B hero sits cleanly after Sample A's mixed-content paragraph.
- `screenshots/after-typography-fix-1280.png` — 1280 × 900 viewport. Same result at a narrower desktop width.

Console capture: `tail /tmp/chrome-console.log` shows a single page-level log line:
```
[81660:...:INFO:CONSOLE:85] "[smoke] kk:md-rendered fired; articles: 3"
```
Zero errors, zero warnings from the page. (The Chrome process-level chatter from launch — `TASK_CATEGORY_POLICY`, `external_pref_loader` — comes from the headless harness, not the page, and does not appear in a normal devtools session.)

## Judgement calls

- Rule 10 left as-is. List items use `padding: 12 0 12 20` — 24 px total vertical vs caption line-height 24. Equal, not strictly greater. The kit's `.t-list` carries hairlines between rows; the hairline plus padding already signals "each item is its own group" even when the numerical inner spacing equals line-height. Promoting to `var(--space-4)` (16 px padding each side, 32 total) would force every list to grow ~33% taller, affecting every consumer page — a scope expansion outside this audit. Flagged for a future retro.
- Rule 9 at phone (max-width: 768). `@media (max-width: 768px) { .doc { padding: 0 ... 80 0 ... } }` keeps doc top at 0 on phone — deliberate hug-to-top so hero+intro land in the first viewport. Intentional override; manifesto rule reads as desktop-surface canon; phone exception documented in the existing phone rules block.
- Chose `var(--space-20)` (80 px) for `.doc__part + .doc__section` rather than `var(--space-15)` (60). 60 + 12 parent gap = 72 just clears 66, but 80 gives the part-level break room to read as a major hierarchy jump instead of a same-scale section step. The manifesto already treats the part heading as the one true major break in a doc.
- `.doc__section > .t-hero` rules added even though `.t-hero` is not emitted by `.doc__section` children in `index.html`. The renderer (`js/md.js`) maps `#` to `h1.t-hero`, so smoke-test articles DO receive `.t-hero` children. The rule covers that case and keeps the CSS coherent regardless of author pattern.

## Gate

Pending KK review of the three screenshots and the rhythm canon additions. CHANGELOG 1.2.0 block amended; version stays 1.2.0 per brief.
