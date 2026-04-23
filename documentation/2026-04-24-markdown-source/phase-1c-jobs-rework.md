---
session: 2026-04-24-markdown-source
stage: phase-1c
role: maintainer
input: phase-1-fresh-eyes-jobs.md defect list + style.css at a618d07
output: style.css rework + sample-md fixes + smoke-index cleanup + manifesto tightening
gate: KK stamp after screenshot review
---

Phase 1c of the markdown-as-source initiative. Phase 1b landed Lebedev's fourteen rules in canon plus the first asymmetric-rhythm pass on `.doc__section`. A cold-read fresh-eyes round ran against the smoke test and returned FAIL with thirteen defects. This phase fixes each defect, tightens two manifesto bullets so the rule 12 ratio floor and the rule 14 label-list pair are named canon, and re-verifies with three fresh screenshots.

## Per-defect fix log

| # | Jobs defect | Fix applied | Evidence |
|---|---|---|---|
| 1 | Em-dash in Sample A hero headline | Rewrote `# Sample A — headings, paragraphs, lists, links, inline code` as `# Sample A`. Scope phrase moved to body paragraph below. | `demos/md-renderer-smoke/sample-a.md` line 1. `screenshots/jobs-rework-full-4800.png` shows "Sample A" alone on the hero line. |
| 1 (B) | Em-dash in Sample B hero headline | Same fix. `# Sample B — ...` → `# Sample B`. | `demos/md-renderer-smoke/sample-b.md` line 1. Visible in full-page screenshot. |
| 1 (C) | Em-dash in Sample C hero headline | Same fix applied prophylactically — Sample C was cut from the previous screenshot so Jobs never rendered a verdict, but the em-dash was present. | `demos/md-renderer-smoke/sample-c.md` line 1. Visible in full-page screenshot. |
| 2 | Rule 12 — heading top/bottom reads symmetric at 0.2 s across Section heading, Card-level heading, Subtitle-level heading, Samples h2, Lists h2, and the Sample B hero | Ratio tightened from 60/40 (1.5:1) to 80/40 (2:1). `.doc__section > * + .t-display / .t-title / .t-subtitle` and bare `h2/h3/h4` siblings now all get `margin-top: var(--space-20)` (80). Heading-below stays `var(--space-10)` (40) to keep rule 13 ≥ line-height. Added bare-heading selectors as insurance against markdown content that skips the kit class. | `style.css` lines 376–408. Screenshots: every in-body heading in `jobs-rework-full-4800.png` reads as clear lead — the eye lands on the heading then drops into its paragraph, not upward. |
| 2 (outer) | Rule 14 — section outer now had to rise above new 80 inner | `.doc__section` `padding-top` bumped `var(--space-8)` (32) → `var(--space-15)` (60). Outer total = padding 60 + margin-top 20 + parent flex gap 12 = 92 ≥ 80 inner. | `style.css` lines 360–368. |
| 3 | Rule 14 — "Unordered list:" and "Ordered list:" labels sit as far from their items as from prose above | New rule: `.doc__section > p + ul, .doc__section > p + ol { margin-top: var(--space-2); }`. Label-to-list gap drops to 8 px — well under the 20 px paragraph-to-paragraph rhythm. Label reads as the list's caption. | `style.css` lines 410–419. `jobs-rework-full-4800.png` — "Unordered list:" sits visibly tighter to the first dashed item than to the "Lists" heading's paragraph above. |
| 4 | Rule 13 on Sample A four-line hero | After the rework the Sample A headline is one line (`# Sample A`), not four. Original concern was the four-line stack whose cumulative line-height at 4 × 66 = 264 would need a below-gap ≥ 66. With a single-line hero the `.doc__section > .t-hero + *` 80 px rule sits comfortably above the 66 px line-height floor. Pass via content fix. | `jobs-rework-full-4800.png`. |
| 5 | Rule 9 on sidebar-to-viewport edge | Sidebar `padding-top` bumped `var(--space-6)` (24) → `var(--space-8)` (32). Clears the sidebar header `t-title` line-height (28). | `style.css` lines 186–200. `jobs-rework-1280.png` — top gap above "Smoke" label reads clear of the text's own line height. |
| 6 | Two intros in two weights at the top | Muted-caption intro paragraph removed. User-facing prose now carries a single body-weight intro. Shell-command deployment note moved to an HTML source comment directly above the `.doc__part` break. | `demos/md-renderer-smoke/index.html` lines 36–49. `jobs-rework-viewport.png` — only one intro paragraph visible; the doc reads as one document, one weight. |
| 7 | Shell command rendered as muted caption instead of code block | Shell command is no longer user-facing. It lives in an HTML comment for maintainers. An alternative would have been a proper `<pre><code class="t-mono">` block; KK's brief allowed either — I picked the comment path because the smoke test's primary audience is maintainers running it locally and they see the source at least as often as the rendered page. | `demos/md-renderer-smoke/index.html` lines 46–49. |
| 8 | Sample C never verified — screenshot cut at 3200 px | New capture uses `--window-size=1440,6000` and lands at 4800 px tall. Sample C (card, shout card, security note) is fully visible. | `screenshots/jobs-rework-full-4800.png`. |
| 9 | Horizontal rule before Sample B hero groups ambiguous | No longer an issue — the Sample B hero is now a single short word ("Sample B"), its own line-height is intact, and the preceding-section bottom gap plus the Sample B section's padding-top 60 + margin 20 + parent flex 12 = 92 px below-rule gap, versus 20 px inner paragraph gap in the preceding section — the rule groups with Sample B below. | `jobs-rework-full-4800.png`. |

## Manifesto additions

`skills/kk-design-system/manifesto.md § Foundations § Typography rhythm` — two new paragraphs added under the rule-14 emphasis block.

- **Label-list pairs** declared rule-14 territory: a paragraph ending in `:` followed by a list is one group; ship them tight.
- **Rule 12 ratio floor** named explicitly at 2:1 (top ≥ 2× bottom). 1.5:1 reads roughly equal at the 0.2-second bar.

These tighten what was already implicit in the canon so future fresh-eyes passes can cite the specific rule wording.

## Verification

Headless Chrome 147 against `http://localhost:8765/demos/md-renderer-smoke/`.

Three screenshots, all at `documentation/2026-04-24-markdown-source/screenshots/`:

- `jobs-rework-viewport.png` — 1440 × 900 viewport. Above-the-fold read. One intro, clean hero, "Samples" part heading with generous top space.
- `jobs-rework-1280.png` — 1280 × 900 viewport. Narrower desktop read. Sidebar top padding now clears the header line-height (rule 9 pass).
- `jobs-rework-full-4800.png` — 1440 × 4800 viewport. Full-page capture. Samples A + B + C all rendered. Every in-body heading (Section heading, Card-level heading, Subtitle-level heading, Lists, Mixed content paragraph, Table, Blockquote, Fenced code block, After the rule, Card embedded in markdown, Prose between raw HTML, Security note) reads as clear lead into its paragraph. "Unordered list:" and "Ordered list:" labels sit visibly tighter to their list items than to the prose above.

Console capture (`/tmp/chrome-console.log`): one page-level log line — `[smoke] kk:md-rendered fired; articles: 3`. Zero page errors, zero page warnings. Chrome-harness chatter (`external_pref_loader`, `sqlite_persistent_store_backend_base`) is process-level and does not appear in a normal devtools session.

## Judgement calls

- **Rule 12 selector set expanded to bare `h1`/`h2`/`h3`/`h4`.** md.js always injects the kit class, so the bare selectors are belt-and-braces for future renderers that might miss the class map. Low cost, buys coverage.
- **Rule 14 inner=outer at 80 px.** With `.doc` parent flex gap 12 added, outer becomes 92 — strictly greater. Comment in `.doc__section` names this. If flex gap ever changes, recompute.
- **Shell command moved to HTML comment, not a rendered code block.** Either path meets the brief; the comment path keeps the rendered doc clean at the top and keeps the deploy hint near where a maintainer reads the file. If a future smoke-test audience is a first-time installer who never reads HTML source, promote this back to a `<pre><code>` block below the `.doc__part` break.
- **Rule 12 ratio floor at 2:1, not 3:1.** 2:1 is already a clear visual lead at 40 px vs 80 px; 3:1 would push the outer gap to 120 px and force every consumer doc to re-tune. 2:1 is the ergonomic floor, not the ceiling.

## Pointer

Fresh screenshots live at `documentation/2026-04-24-markdown-source/screenshots/jobs-rework-*.png`. The prior `after-typography-fix-*.png` series stays on disk as the phase-1b audit trail — Jobs's verdict was against that state.

## Gate

Pending KK review. CHANGELOG 1.2.0 block amended with two new Fixed bullets. Version stays 1.2.0 per brief. No push, no tag.
