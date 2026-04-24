# Phase 1i. Smoke shell simplifies — offset zero

The smoke test shell previously carried a page h1 ("Markdown renderer smoke test") plus a `doc__part` h2 ("Samples") plus three articles rendered at offset=2. Under that contract, source `#` inside each article landed at h3 / t-title — one step below the part label at display rank. Three side effects dragged on the page:

1. Two shell headings competed with the three article headings for the 0.2-second read. The part label at hero size and the page h1 at hero size stacked above three t-title article openers, reading as a three-level hierarchy where the content only expresses one level (each article is a peer document).
2. Round-5 defect 1 landed the offset=2 bump to resolve the part/article collision, but the fix worked around the stack rather than removing the competition.
3. Round-5 defect 2 triggered canon-weight change on `t-subtitle` (Medium 500 → Bold 700 → Medium 500 → Bold 700) chasing a collision downstream of the same offset=2 decision.

We drop the two shell headings. Each article renders its own markdown hierarchy starting at h1 / t-hero. Three article titles read as three sibling documents on an internal test page. Multiple h1 elements on one page is acceptable for internal smoke tests — the semantic cost (screen-reader outline flatter than ideal) loses to the visual cost of a demoted hierarchy.

## Change set

### 1. `demos/md-renderer-smoke/index.html`

Removed:

```diff
-<h1 class="t-hero">Markdown renderer smoke test</h1>
-
-<p class="doc__intro t-body">
-  Three articles below, each fed by a different <code class="t-mono">data-md-src</code>.
-  ...
-</p>
-
-<h2 class="doc__part">Samples</h2>
```

The `doc__intro` paragraph stayed — its content (one body paragraph naming what the page is, with an inline reference to `data-md-src` and `doc__section`) works as a lead-in without a preceding hero. Trimming to one sentence felt cramped; the full paragraph sits above the first article and the hairline divider that opens `.doc__section` marks the transition.

Each article's `data-md-heading-offset` value changed:

```diff
-<article class="doc__section" id="sample-a" data-md-src="./sample-a.md" data-md-heading-offset="2"></article>
-<article class="doc__section" id="sample-b" data-md-src="./sample-b.md" data-md-heading-offset="2"></article>
-<article class="doc__section" id="sample-c" data-md-src="./sample-c.md" data-md-heading-offset="2"></article>
+<article class="doc__section" id="sample-a" data-md-src="./sample-a.md" data-md-heading-offset="0"></article>
+<article class="doc__section" id="sample-b" data-md-src="./sample-b.md" data-md-heading-offset="0"></article>
+<article class="doc__section" id="sample-c" data-md-src="./sample-c.md" data-md-heading-offset="0"></article>
```

Chose explicit `"0"` over dropping the attribute because `js/md.js § load` defaults to `+1` when the attribute is absent. The task note that "0 is the default" describes the `render()` internal default; the container-level default in `load()` is `+1`. Explicit `"0"` locks the contract at the markup level and does not depend on which default any reader assumes.

An HTML comment above the articles names the new contract so maintainers reading the file do not have to chase the offset through `md.js`.

Sidebar nav labels (`Core prose path`, `Dense blocks`, `Raw HTML passthrough`) already matched article titles from round-2 rework. No further change.

### 2. `demos/md-renderer-smoke/sample-a.md` line 13

```diff
-Inline code uses backticks. Under the article's `data-md-heading-offset="2"` contract, source `#` lands at t-title, `##` at t-subtitle, and `###` demotes to caption-bold because the kit has no rank below subtitle.
+Inline code uses backticks. Under the article's `data-md-heading-offset="0"` contract, source `#` lands at h1 / t-hero, `##` at h2 / t-display, `###` at h3 / t-title, `####` at h4 / t-subtitle. Source `#####` and deeper demote to `<p class="t-caption">` regular because the kit has no heading rank below subtitle.
```

Rewrite names the new mapping across all four levels plus the demotion floor. Demotion target updated from "caption-bold" (outdated since phase 1h) to "t-caption regular". Voice pass: no em-dashes, no AI tells, terse. Sample B and C prose unchanged — their heading structure (only `#` and `##`) renders cleanly at offset=0 without prose references to the contract.

### 3. `style.css § Main document § doc__section` — hero-first rescue

Default `.doc__section` opens at `padding-top: var(--space-15)` (60 px) + `margin-top: var(--space-5)` (20 px) = 80 px outer above-gap. With parent flex `gap: var(--space-3)` (12 px) the measured above-gap lands at 92 px for a non-first article and ~112 px for the first article (above the intro).

Under the old offset=2 contract the article opened at t-title (22 / 40 line-height, 40 px below-gap), and 92 / 40 = 2.30 cleared rule 12. Under offset=0 the article opens at t-hero (66 / 66, 80 px below-gap). 92 / 80 = 1.15 — fails rule 12. 112 / 80 = 1.40 — same.

Pre-fix ratios measured from headless Chrome on the live page:

| Article | above (px) | below (px) | ratio | pass? |
|---|---|---|---|---|
| s1h1 (Core prose path) | 112 | 79 | 1.42 | fail |
| s2h1 (Dense blocks) | 127 | 78 | 1.63 | fail |
| s3h1 (Raw HTML passthrough) | 124 | 79 | 1.57 | fail |

Fix scoped to articles opening with an h1 via `:has()`:

```css
.doc__section:has(> h1:first-child),
.doc__section:has(> .t-hero:first-child) {
  padding-top: calc(var(--space-20) + var(--space-15));
}
```

New padding-top 140 (= 80 + 60). Post-fix above-gap = 12 (parent gap) + 20 (article margin-top) + 140 (article padding-top) + prev-content tail = 172 minimum, measured 192-206 including flex-box leading. Below stays at 80.

Post-fix ratios:

| Article | above (px) | below (px) | ratio | pass? |
|---|---|---|---|---|
| s1h1 (Core prose path) | 192 | 79 | 2.43 | pass |
| s2h1 (Dense blocks) | 206 | 79 | 2.61 | pass |
| s3h1 (Raw HTML passthrough) | 204 | 79 | 2.58 | pass |

Rule 13 holds at every article h1: below 80 ≥ hero line-height 66.

`:has()` scope means only articles whose first rendered child is h1 (or `.t-hero`) pick up the 140 px padding. `index.html` at repo root has zero articles opening with h1 (verified via `grep`). `demos/fundamental--accepted/index.html` has zero (verified). Side-effect radius is one demo: the smoke test.

### 4. `skills/kk-design-system/manifesto.md § Typography rhythm`

Heading-offset paragraph rewritten. Prior text described offset `+1` as the container default and offset `2` as the part-label pattern. New text describes:

- Default offset is 0. Source `#` lands at h1 / t-hero, `##` at h2 / t-display, etc.
- Authors opt into a positive offset when the shell already owns higher heading ranks — `"1"` for a page with its own h1, `"2"` for a page with an h1 plus a part label at display rank.
- Multi-article pages with no shell h1 (like the smoke test) set offset 0 and accept multiple h1 elements on one page for internal test surfaces.
- Level 5 and deeper demote to `<p class="t-caption">` regular (unchanged from phase 1h).

### 5. `CHANGELOG.md § 1.2.0 § Fixed`

New entry appended to the Fixed block. Names the shell collapse, the attribute change, the new padding-top rule, the measured ratios before and after, and the side-effect scope. No version bump (still 1.2.0).

## Verification

Server: `python3 -m http.server 8765` from repo root.

Screenshots captured at 1440 × 2400 viewport, 1440 × 6400 full-page, and 1280 × 800:

- `documentation/2026-04-24-markdown-source/screenshots/offset-zero-pre-rhythm-viewport.png` — pre-fix state after the HTML swap but before the `:has()` rule landed. Shows the tight article-h1 rhythm that failed rule 12.
- `documentation/2026-04-24-markdown-source/screenshots/offset-zero-viewport.png` — post-fix 1440 × 2400 viewport. Doc-intro + hairline + first article h1 at t-hero.
- `documentation/2026-04-24-markdown-source/screenshots/offset-zero-full.png` — post-fix 1440 × 6400 full-page. Three article h1s at t-hero with clear breaks between articles.
- `documentation/2026-04-24-markdown-source/screenshots/offset-zero-1280.png` — post-fix 1280 × 800 at smaller breakpoint.

Ratio measurement harness at `measure.html` (repo root, ignored in commit). Iframe loads the smoke page, `getBoundingClientRect` on each article's h1 and its next sibling computes above-gap (distance from previous element's bottom) and below-gap (distance to next sibling's top). Output JSON dumped via Chrome headless `--dump-dom`.

Checks:

- Three article h1s each render at t-hero (66 px line-height, Bold 700 — computed style verified).
- Sample-a `## Section heading` renders at t-display (38 px Bold).
- Sample-a `### Card-level heading` renders at t-title (22 px Bold).
- Sample-b and sample-c only exercise `#` and `##` at offset=0 (t-hero and t-display); no `###` or `####` in their markdown source. Sample-a's prose documents the full mapping including h4 / t-subtitle and the `#####` demotion.
- No shell h1, no `doc__part` heading.
- Sidebar nav items match article titles (already renamed in round 2).
- Rule 12 asymmetry holds on every heading level: h1 at 2.43-2.61 ratio, h2 at 2.30, h3 at 2.30.
- Rule 9 holds: `.doc` padding-top 32 ≥ body line-height 32.
- Console output: `[smoke] kk:md-rendered fired; articles: 3`. Zero errors.

## Side effects

- `style.css § Main document` gains one new selector. Scoped via `:has()` to articles opening with h1; no canon article under `index.html` or `demos/fundamental--accepted/` picks up the new padding (verified with `grep` against `class="doc__section"[^>]*>\s*<h1`).
- No token changes. No component changes. No skill-behaviour changes.
- `measure.html` at repo root is a one-off measurement harness; will be removed before commit.

## Why three h1s on one page

Semantic h1-per-document is the page-level ideal, and the smoke test trades that for visual clarity on an internal surface. The page is not a consumer document — it is a QA harness for the markdown renderer, visible to maintainers and the kit's own tooling, not indexed by search or read by assistive tech outside dev sessions. A consumer document rendered by `md.js` on a published page will sit inside a shell that owns its own h1 and sets `data-md-heading-offset="1"` or `"2"` to push the article root to h2 or h3. The smoke test's three h1s stay scoped to the internal test page.

## Signoff

Rachel Andrew (maintainer skill), 2026-04-24.
