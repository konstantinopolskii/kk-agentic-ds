# Phase 1h. Revert t-subtitle to Bold 700

The round-5 weight-step fix (phase 1g) dropped `.t-subtitle` from Bold 700 to Medium 500 to resolve a 0.2-second collision between h4/t-subtitle (18 px bold) and demoted `#####` markdown (`<p class="t-caption--bold">`, 16 px bold). The fix resolved the md-renderer collision but regressed every other t-subtitle site in the kit: card headings, sidebar nav group titles, button labels, and doc-section h4 everywhere.

We revert the canon weight and re-solve the original collision by changing the demotion path instead.

## Change set

### 1. `style.css § Typography utilities`

```diff
 .t-subtitle {
   font-size: var(--fs-subtitle);
   line-height: var(--lh-subtitle);
-  /* Medium 500, not bold. The weight step against t-caption--bold (700)
-     at a 2 px size delta (18 vs 16) carries the rank. Same size + same
-     weight made the two ranks read as peers under the 0.2-second bar;
-     the weight drop restores a visible stair. Closes Jobs round 5
-     defect 2. */
-  font-weight: var(--fw-medium);
+  font-weight: var(--fw-bold);
 }
```

### 2. `skills/kk-design-system/tokens.json § typography.scale.subtitle`

```diff
-"subtitle": { "fontSize": "18px", "lineHeight": "24px", "fontWeight": 500, "use": "Nav headers, spec keys. Medium 500, not bold — weight step against t-caption--bold (700) carries the rank." },
+"subtitle": { "fontSize": "18px", "lineHeight": "24px", "use": "Nav headers, spec keys." },
```

Explicit `fontWeight` removed. Default is bold (kit canon for subtitle rank).

### 3. `skills/kk-design-system/components.md § Typography utility classes`

```diff
-| `t-subtitle` | 18 / 24 medium | Nav headers, spec keys. Medium 500, not bold — weight step against `t-caption--bold` carries the rank. |
+| `t-subtitle` | 18 / 24 | Nav headers, spec keys. |
```

### 4. `js/md.js § render heading branch`

Heading level > 4 no longer demotes to `<p class="t-caption--bold">`. New demotion target is `<p class="t-caption">`. Size drop 18 → 16 combines with weight drop Bold 700 → Regular 500, so the stair from h4/t-subtitle to demoted-h5 is unambiguous at the 0.2-second bar.

```diff
-console.info("[md.js] heading level " + level + " demoted to t-caption--bold (no kit rank below h4): " + h[2].trim());
-out.push('<p class="t-caption--bold">' + inner + "</p>");
+console.info("[md.js] heading level " + level + " demoted to t-caption (no kit rank below h4): " + h[2].trim());
+out.push('<p class="t-caption">' + inner + "</p>");
```

Comment block rewritten to name the new demotion path.

### 5. `skills/kk-design-system/manifesto.md § Typography rhythm`

Heading-offset paragraph: demotion target updated from `t-caption--bold` to `t-caption` (regular caption).

Weight-step paragraph rewritten. Prior version said `t-subtitle` sits at Medium 500 so the step against `t-caption--bold` reads as a weight drop. New version says `t-subtitle` stays Bold 700 kit-wide; demoted `#####` drops to regular caption, so the rank step reads as size drop (18 → 16) plus weight drop (Bold 700 → Regular 500) together. No canon weight change.

### 6. `CHANGELOG.md § 1.2.0 § Fixed`

New entry appended to the end of the Fixed block. Names the regression, the original collision, and the new demotion-based resolution. No version bump (still 1.2.0).

## Verification

Server: `python3 -m http.server 8765` from repo root.

Screenshots captured at 1280 and 1440 widths:

- `documentation/2026-04-24-markdown-source/screenshots/t-subtitle-revert-viewport.png` — 1440 × 2400 viewport, shows sidebar + article + inspector.
- `documentation/2026-04-24-markdown-source/screenshots/t-subtitle-revert-scroll.png` — 1440 × 3200 scroll shot capturing Core prose path in full.
- `documentation/2026-04-24-markdown-source/screenshots/t-subtitle-revert-full.png` — 1440 × 6400 full page.
- `documentation/2026-04-24-markdown-source/screenshots/t-subtitle-revert-1280.png` — 1280 × 800 at smaller breakpoint.
- `documentation/2026-04-24-markdown-source/screenshots/t-subtitle-revert-fundamental.png` — side-effect check on `demos/fundamental--accepted/`. Sidebar group titles, card headings ("Tweak the tokens"), h3 "Opening" all bold.
- `documentation/2026-04-24-markdown-source/screenshots/t-subtitle-revert-index.png` — side-effect check on repo-root `index.html`. Sidebar headings all bold.

Checks:

- `## Section heading` in sample-a renders Bold 18 (restored). Reads clearly heavier than the 22 px regular body paragraph beneath.
- `### Card-level heading` in sample-a renders Regular 16 (demoted). Reads as caption-sized regular body, a clear step down from the Bold 18 subtitle above.
- Inspector card headings `Renderer is dumb` + `Watch for errors` render Bold 18 (t-subtitle on `.card__heading > h3` via md-renderer-smoke index.html).
- Sidebar nav group title `Samples` renders Bold 18.
- Sidebar header `Renderer` renders Bold 18.
- Console clean. `[md.js] heading level 5 demoted to t-caption` info lines fire as expected; no errors.

## Why this fix is cleaner

The round-5 fix fixed one collision by touching a canon weight with kit-wide blast radius. The regression surfaced on every t-subtitle site: card headings in inspector cards, sidebar nav, button labels, doc-section h4. The new fix pins the rank distinction to the demotion path itself — a narrow change inside `js/md.js` that affects only headings deeper than h4 coming through the markdown renderer. Canon t-subtitle is untouched.

## Signoff

Rachel Andrew (maintainer skill), 2026-04-24.
