---
session: 2026-04-24-content-architecture
stage: 6b (rerun)
role: consistency-ds (Dieter Rams)
input: second-wave build + canon (with new rules)
output: per-block strict audit — verify all in-scope flags from first run resolved; flag any new drift
gate: feeds stage 7 rerun
---

Cold strict re-audit. Same rule book, three new permissions added (FAB shadow, flat-geometry highlight, `.t-code` consolidation). Walk every flag from `06b-consistency-ds.md`. Then walk what the rework introduced.

## First-run flags — resolution check

First run delivered 32 flags across four categories. Resolution per flag:

### Class resolution (7 first-run flags)

1. **patterns.md `card-stack` registry gap.** **Resolved.** patterns.md now ships a top-level `## Card stack` section (lines 29–54) with full snippet, rules, deep link. The class is documented inside the patterns book; the components-book gap is closed by canon adding `card` prefix coverage at the Forbidden allowlist (components.md line 633) and by patterns.md owning the pattern rules.

2. **patterns.md `card--selectable` registry gap.** **Resolved.** patterns.md still uses `card--selectable` (line 35, 45). Components.md line 593 now names the variant explicitly: "Pair with `.card--interactive.card--selectable` in the doc column when the preview is driven by a click-to-select registry." Resolves on the `card` prefix.

3. **components.md missing `card--heading` registry row.** **Partially resolved.** No new registry row; `card--heading` resolves on the `card` prefix. Components.md does not name the variant in any rule paragraph either. Resolves at the allowlist level only — the rule book still does not catalogue the variant. Soft pass.

4. **components.md Forbidden allowlist incomplete.** **Resolved.** components.md line 633 now ships eight new prefixes (`toc-`, `fab`, `deck`, `highlight`, `figure`, `quote`, `divider`, `avatar`). Old prefixes for `aside` / `checkbox` / `tier` are absent because the classes are gone from CSS (verified below).

5. **index.html `toc__indicator` outside allowlist.** **Resolved.** New `toc-` prefix at components.md line 633 covers it.

6. **index.html `fab` family outside allowlist.** **Resolved.** New `fab` prefix at components.md line 633 covers `fab`, `fab--nav`, `fab--inspector`, `fab--comment`, `fab__count`.

7. **narrow.html `card--heading` undocumented.** Same root as flag 3 — **partially resolved** via prefix.

### Token compliance (8 first-run flags)

8. **Drop shadow on `.comment__menu-popover` (style.css line 1335).** **Not addressed.** Line 1330 still ships `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 0.5px var(--color-border)`. The new FAB exception at components.md line 46 names "active element rendered on a black or inverted surface" as the only carve-out. The popover renders on `var(--color-bg)` (line 1327) — white surface, not inverted — so the FAB exception does not apply. Hard canon breach surviving.

9. **Drop shadow on `.fab` (style.css line 2167).** **Resolved.** Now at line 2128: `box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15)`. FAB renders on `background: var(--color-text)` (line 2122) — black/inverted bg. New canon at components.md line 46 permits this. Code carries an inline comment naming the rule: "Permitted: shadow on inverted/black-bg active surfaces. See manifesto § Material."

10. **Blur in `inspector-card-focus` keyframes (style.css lines 1541, 1546).** **Resolved.** Line 1555 + 1560 still carry `filter: blur(4px)` → `filter: blur(0)`, but the canon now documents this keyframe explicitly at components.md line 158–162 with the blur-policy carve-out at line 188: "Blur is permitted in the kit only via reuse of `inspector-card-focus`, or via maintainer-stamped exception."

11. **Fifth radius `20px` on `.deck-card` (style.css line 1770).** **Resolved.** Line 1771 now reads `border-radius: var(--radius-lg)` (24 px). Off-token radius gone.

12. **Off-token weight `600` on `.t-mono` (style.css line 135).** **Resolved.** `.t-mono` is gone from style.css. Replaced by `.t-code` (line 134) at `font-weight: var(--fw-regular)` (line 139). Tokens.json `type.weights` set still holds three.

13. **ALL CAPS via `text-transform: uppercase` on `.tag--inline` (style.css line 1623).** **Resolved.** `.tag--inline` is gone from style.css. Grep for `text-transform: uppercase` returns zero hits.

14. **Off-token color `#cccccc` on `.deck-card` (style.css line 1768).** **Resolved.** Line 1769 now reads `background: var(--color-surface-strong)`. Raw hex outside palette gone.

15. **Inline `font-size: 48px` on phone hero / part (style.css line 2287).** **Not addressed.** Line 2248 still ships `.t-hero, .book__part { font-size: 48px; line-height: 48px; }` inside the `@media (max-width: 768px)` block. Forty-eight is not in the seven-step type scale (`tokens.json type.sizes`: 66 / 38 / 22 / 18 / 16 / 14). Components.md line 70: "No inline `font-size`, `font-weight`, or `color`. Pick a utility class." Surviving breach.

### Off-grid spacing (13 first-run flags)

16. **`18px` sidebar nav rail (style.css lines 240, 257, 275, 284).** **Resolved.** Lines 215, 254, 271–272, 289 now use `var(--space-2)`, `var(--space-4)`, `var(--space-1)`. All on-grid.

17. **`text-underline-offset: 3px` (style.css line 644).** **Resolved.** Line 658 now reads `text-underline-offset: var(--space-1)` (4 px).

18. **`gap: 6px` / `gap: 3px` / `padding: 6px` / `gap: 2px` / `padding-top: 6px` (multiple lines).** **Resolved.** Grep for `gap:\s*\d+px` returns three hits, all `gap: 4px` (lines 837, 1155, 1811) — the space-1 token in raw form, on-grid. Six and three and two are gone.

19. **`width: 70px` on `.field__label` (style.css line 1017).** **Resolved.** Line 1031 now reads `width: 72px`. 72 / 4 = 18, on-grid.

20. **`padding: ... 21px ...` on `.tier` (style.css line 1050).** **Resolved.** `.tier` selector is gone. The legacy shape was replaced by `.card-stack--columns` (style.css line 1457), which uses tokenized padding only.

21. **`padding: 14px ...` on `.button` (style.css line 1065).** **Resolved.** Line 1060 now reads `padding: var(--space-4) var(--space-6)`.

22. **`width / height: 2.5px` on `.comment__menu` dot (style.css line 1317).** **Resolved.** Lines 1312–1313 now read `width: var(--space-1); height: var(--space-1)` (4 px).

23. **`letter-spacing: 0.2px` on `.tag--inline` (style.css line 1622).** **Resolved.** `.tag--inline` is gone.

24. **`margin-right: -190px` on `.deck-card` (style.css line 1774).** **Resolved.** Line 1776 now reads `margin-right: -188px`. 188 / 4 = 47, on-grid.

25. **`transition: 300ms ease-out` on `.deck-card` (style.css line 1789).** **Resolved.** Line 1787 now uses `var(--dur-slow)` (320 ms) and other token durations throughout.

26. **`width / height: 10px` on `.deck-card__check` (style.css line 1830).** **Resolved.** Lines 1831–1832 now read `width: var(--space-3); height: var(--space-3)` (12 px).

27. **`border: 1px` on `.checkbox input` (style.css line 1923).** **Resolved.** `.checkbox` selector is gone entirely.

28. **`width: 200px` and `min-height: 160px` on `.deck-card` (style.css line 1755).** Lines 1755–1756 still ship raw px (200, 160). 200 / 4 = 50, 160 / 4 = 40, both on-grid. Was not flagged in first run; mentioned here only as a sanity check that pre-existing on-grid raw-px declarations were left alone. Not a flag.

### Pattern drift (4 first-run flags)

29. **protocols.md ships without `book__signoff` block (Pattern-language drift on canonical document ending).** **Not addressed.** protocols.md line 91–93 still carries plain prose: "Last edit: 2026-04-24. Maintainer: Konstantin Konstantinopolskii (kk.consulting)." Components.md line 432 still calls signoff "Canonical document ending. Stats + byline + handwritten signature SVG. Every doc ships signed." Drift survives.

30. **narrow.html uses `t-muted` on a structural display subtitle (Color rule says metadata only).** **Not addressed.** narrow.html lines 35 and 45 still ship `<span class="t-display--medium t-muted">`. Components.md line 57 still reads "`t-muted` and `t-subtle` are metadata only — bylines, captions, hairlines, placeholders." The rule book did not carve out display subtitles; the demos still use the pattern. Same drift between code precedent and the rule the book ships. Demos folder also continues the pattern across two dozen sites.

31. **style.css carries Lebedev voice tells in code comments (lines 194, 312, 333, 380).** **Resolved.** Grep returns zero hits for "Lebedev", "lebedev", or "bureau.ru" in style.css.

32. **style.css `.tag--inline` ships ALL CAPS through CSS.** **Resolved.** Same root as flag 13. Class gone, ALL CAPS gone.

### Tally

- **Resolved:** 26 / 32.
- **Partially resolved:** 2 / 32 (flags 3 and 7 — `card--heading` registry row missing; resolves at allowlist level only, not at registry-row level).
- **Not addressed:** 4 / 32 (flag 8 popover shadow; flag 15 inline 48 px; flag 29 protocols signoff; flag 30 demo `t-muted` subtitle).

## New drift introduced by second wave

Cold sweep over every shipped surface for drift that is not on the first-run list.

**Class resolution.** Every class on every audited surface resolves to an allowed prefix at components.md line 633. No new off-inventory classes shipped. Pass.

**Token compliance.** No new off-token declarations in style.css. Sweep through colors, sizes, weights, radii, motion durations:
- Colors: every value reads from a token or an inverted-card override block (lines 762–768 `card--shout`, lines 1574–1581 `inspector active`, lines 1762–1768 `deck-card local light-mode reset`). Allowed by token contract — same shape as before. Pass.
- Sizes: only flag 15 above.
- Weights: zero hits for `font-weight: 600`. Zero hits for `font-weight: 400`. Pass.
- Radii: zero off-token radii.
- Motion: every transition uses a `--dur-*` token. Pass.

**Off-grid spacing.** Three pre-existing intrinsic-geometry declarations not raised in the first run remain — `.toc__indicator { height: 22px }` (line 237), `.book__signoff-signature-img { height: 81px }` (line 375), `.preview-frame { min-height: 420px }` (line 604). Indicator height is set dynamically by JS to match each nav-row's intrinsic line-height; signature is intrinsic SVG geometry; preview-frame floor is a layout-container value. None were flagged in the first run; they survived this rework unchanged. Not raising as new drift.

**Pattern-language drift.** No new shadow, glass, blur, gradient, italic, ALL CAPS, or Title Case on any audited surface. The `.t-display--medium t-muted` pattern persists across narrow.html and demos/fundamental--accepted/index.html (28+ sites) — already accounted for under flag 30, not new. Pass.

**Inline italic in demo prose.** demos/fundamental--accepted/index.html line 190 still says "A quote wears italic and a hairline rail" while style.css line 1864 has `/* font-style: italic; */` (commented out). Demo prose contradicts code reality. This is a content-vs-code drift, surfaced in the first run as an aside but not enumerated as one of the 32 flags. Surviving. Counted as new drift only because the second wave was the chance to align — count: 1.

**New drift count: 1** (the italic-prose-vs-code contradiction in the demo, surfacing into the strict count now that the in-scope canon is reread).

## New canon rules — verification

### FAB shadow exception

Canon at components.md line 46: "A soft drop shadow is permitted on an active element rendered on a black or inverted surface, where the shadow is the affordance that lifts the element off its background. The floating action button at narrow viewports qualifies because its rest state sits on a black background."

Verification in style.css:

- `.fab` background at line 2122: `background: var(--color-text)`. `--color-text` resolves to `#000000` (vars.css line 9). Black bg confirmed.
- `.fab` shadow at line 2128: `box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15)`. Soft drop shadow.
- Inline comment at line 2127: "Permitted: shadow on inverted/black-bg active surfaces. See manifesto § Material." Code carries the rule citation.

**Verified.** The exception holds and the code matches the spec.

### Flat-geometry highlight

Canon at components.md line 48: "A `box-shadow` with zero blur is a flat-color geometry extension, not a depth illusion. Used on `.highlight` to widen the mark beyond the text bounding box without breaking line rhythm. Permitted on the same logic as the FAB exception: the shadow is shape, not light."

Verification in style.css:

- `.highlight` at lines 1648–1662.
- Line 1658–1659: `box-shadow: 0 4px 0 0 var(--color-surface-overlay), 0 -4px 0 0 var(--color-surface-overlay)`.
- Blur radius (third value): zero on both shadows. ✓
- Spread (fourth value): zero. ✓
- Color: `var(--color-surface-overlay)` — opaque-color extension, same color as the rest state. ✓
- Inline comment lines 1655–1657 names the rule: "Vertical extension: flat geometry, no blur. The mark grows 4 px above and below the line-box so the highlight reads as a deliberate band, not a translucent ghost over the cap-height."

**Verified.** Zero blur, opaque-color extension, no depth illusion. Matches the spec.

### `.t-code` consolidation

Canon at components.md line 567: "Replaces `.t-mono` and `.tag--inline`. The kit no longer ships those classes."

Verification:

- `.t-mono` and `.tag--inline` selectors in style.css: grep returns the comment-only mention at line 132 ("Replaces `.t-mono` (which carried a forbidden 600 weight)"). No live selectors. ✓
- `.t-mono` / `.tag--inline` in HTML on in-scope surfaces (index.html, manifesto.md, patterns.md, components.md, demos/fundamental--accepted/**): zero hits. ✓ (The cluster-b-components.html in `documentation/` is a session-discussion artifact, out of scope.)
- `.t-code` definition at style.css lines 134–140 against the canon spec:
  - Surface chip via `--color-surface-strong`. ✓ (line 135)
  - Radius via `--radius-sm`. ✓ (line 136)
  - Padding `--space-1` (4 px) horizontal, zero vertical. ✓ (line 137: `padding: 0 var(--space-1)`)
  - Color `--color-text-muted`. ✓ (line 138)
  - Font-weight regular (`--fw-regular`, 500). ✓ (line 139)
  - Font-size and leading inherit. ✓ (no font-size declared)
  - No caps. ✓ (no `text-transform`)
  - No letter-spacing. ✓ (no `letter-spacing`)
- `.t-code--block` at style.css lines 144–149 carries the left-rail spec. ✓

**Verified.** Old classes are gone from CSS and from in-scope HTML. `.t-code` matches the canon spec on every property.

## Animation registry — verification

Canon at components.md lines 142–190 documents seven keyframes. Verify each in `style.css`:

| Canon keyframe | style.css line | Mechanics match |
|----------------|----------------|-----------------|
| `fake-caret-blink` | 1271 | 1.06 s steps(1, end), opacity 1 ↔ 0 ✓ |
| `menu-in` | 1343 | opacity 0 → 1, scale 0.94 → 1; runs at `--dur-fast var(--ease-out)` per line 1335 ✓ |
| `inspector-card-focus` | 1551 | scale 0.88, skewY −3°, opacity 0.4, blur 4 px → scale 1, skewY 0, opacity 1, blur 0; runs at `--dur-long var(--ease-swing)` per line 1548 ✓ |
| `check-in` | 1840 | opacity 0 → 1, scale 0 → 1; runs at `--dur-base var(--ease-spring)` per line 1837 ✓ |
| `reveal-from-left` | 2282 | translateX −12 px, scale 0.96, opacity 0 → translateX 0, scale 1, opacity 1 ✓ |
| `reveal-from-right` | 2286 | translateX 12 px, scale 0.96, opacity 0 → translateX 0, scale 1, opacity 1 ✓ |
| `reveal-from-below` | 2290 | translateY 16 px, scale 0.98, opacity 0 → translateY 0, scale 1, opacity 1 ✓ |

**7 / 7 verified.** Every named keyframe lives at the documented mechanics.

**Blur policy.** Canon line 188: "Blur is permitted in the kit only via reuse of `inspector-card-focus`, or via maintainer-stamped exception." Grep for `filter:\s*blur` in style.css returns two hits, both on lines 1555 and 1560 — inside `@keyframes inspector-card-focus`. Zero other blur sites. **Verified.**

**Off-registry keyframes.** Grep for `@keyframes` returns exactly seven hits (lines 1271, 1343, 1551, 1840, 2282, 2286, 2290). No keyframe in CSS is missing from the canon registry. **Verified.**

## Forbidden allowlist — verification

Canon at components.md line 633 ships these 24 prefixes: `t-`, `card`, `field`, `button`, `tag`, `switch`, `sidebar`, `book`, `nav-group`, `inspector`, `comment`, `stat`, `swatch`, `app`, `preview-frame`, `registry-table`, `toc-`, `fab`, `deck`, `highlight`, `figure`, `quote`, `divider`, `avatar`.

Eight new prefixes (toc-, fab, deck, highlight, figure, quote, divider, avatar) cover the eight class families that lived in style.css but failed the first-run audit on prefix grounds.

**Every shipped class in style.css resolves to a prefix.** Walked the full class inventory in style.css (140 distinct selectors); every one starts with one of the 24 allowed prefixes. Concrete cross-check on the first-run trouble list:

| Class | Prefix | Resolves |
|-------|--------|----------|
| `.toc__indicator` | `toc-` | ✓ |
| `.fab`, `.fab--nav`, `.fab--inspector`, `.fab--comment`, `.fab__count` | `fab` | ✓ |
| `.deck`, `.deck-card`, `.deck-card__select`, `.deck-card__check` | `deck` | ✓ |
| `.highlight`, `.highlight--active` | `highlight` | ✓ |
| `.figure` | `figure` | ✓ |
| `.quote` | `quote` | ✓ |
| `.divider` | `divider` | ✓ |
| `.avatar` | `avatar` | ✓ |

**Killed prefixes.** Grep for live `.t-mono`, `.tag--inline`, `.aside`, `.checkbox`, `.tier`, `.tiers` selectors in style.css and on the in-scope HTML (index.html, narrow.html, card-stack-columns.html, demos/fundamental--accepted/**, skills/kk-design-system/**): zero live hits. The only mentions are the comment at style.css line 132 ("Replaces `.t-mono`") and line 1456 ("Replaces the legacy `.tier` / `.tiers` shape") — comments, not selectors.

**Verified.** Forbidden allowlist passes on every audited surface.

## Drift summary

- **First-run flags resolved:** 26 / 32.
- **First-run flags partially resolved:** 2 / 32 (`card--heading` registry row gap on flags 3 and 7 — covered at allowlist level only).
- **First-run flags not addressed:** 4 / 32:
  - flag 8 — `.comment__menu-popover` drop shadow on white surface (FAB exception does not apply).
  - flag 15 — inline `font-size: 48px` on `.t-hero, .book__part` in phone media query.
  - flag 29 — protocols.md still ships plain-prose signoff, not the canonical `book__signoff` block.
  - flag 30 — narrow.html (and demos/fundamental--accepted/index.html across 28 sites) still ship `t-muted` on display subtitles, against the metadata-only color rule.
- **New drift introduced by second wave:** 1 (demo prose at demos/fundamental--accepted/index.html line 190 still claims a quote "wears italic" while `.quote` no longer renders italic in CSS).
- **New canon rules verified:** 3 / 3 (FAB shadow ✓, flat-geometry highlight ✓, `.t-code` consolidation ✓).
- **Animation registry verified:** 7 / 7 keyframes; blur policy holds; zero off-registry keyframes.
- **Forbidden allowlist verified:** every shipped class resolves; zero killed-prefix hits.

Total live flags after the rerun: **5** (4 first-run unresolved + 1 new). Down from 32.

## Verdict

**FAIL.**

Per the role contract, pass = zero flags. Five live flags remain. The build closed 26 / 32 flags from the first run, fully verified all three new canon rules, and added zero new off-inventory classes. The five surviving flags split into:

- **Two hard canon breaches still on disk** — flag 8 (popover drop shadow on a white surface, outside the FAB exception) and flag 15 (inline 48 px font-size on phone). Both name a single line in components.md.
- **Two pattern drifts unchanged from the first run** — flag 29 (protocols.md missing canonical signoff) and flag 30 (`t-muted` on structural display subtitles, repeating across narrow.html and demos). Either the rule needs a carve-out or the code needs to stop using the pattern.
- **One soft demo-prose contradiction** — italic claim on a quote that no longer renders italic.

The progression from 32 → 5 is a clean compliance pass on the in-scope code paths the maintainer + engineer chose to land. The unresolved set is real and the meta-reviewer should weigh it against the rubric.

## Hand-off

Feeds **stage 7 rerun (meta-reviewer, Anna Wintour)**. The rubric-gated re-evaluation weighs this audit against the analyst brief and the direction doc, alongside any rerun of stages 6a + 6c. The 5 live flags here become rubric item 4 evidence ("Zero off-inventory components"); the 26 resolved flags become evidence of progress on the same rubric line.

Reiterate-protocol routing per surviving flag, if path (a) Fix + re-dispatch is selected:

- Flag 8 — stage 5 (design engineer): drop the popover shadow or carve out a "popover-on-light-surface" exception.
- Flag 15 — stage 5 (design engineer): replace `font-size: 48px` with a token-based size or extend the type scale via the evolve protocol.
- Flag 29 — stage 3b (designer-protocols): emit the canonical `book__signoff` block.
- Flag 30 — stage 3b (designer-components): either carve out display-subtitle as an allowed `t-muted` site, or convert demo subtitles to a non-muted treatment.
- Italic prose flag — stage 3b (designer-components): align demo prose with the rendered `.quote` reality, or restore italic in CSS.

Reiteration cannot originate from this role. Audit hands the 5-flag list to the meta-reviewer; the human picks the path.
