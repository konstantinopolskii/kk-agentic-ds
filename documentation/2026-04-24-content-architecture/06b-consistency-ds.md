---
session: 2026-04-24-content-architecture
stage: 6b
role: consistency-ds (Dieter Rams)
input: built prototype + canon/components.md + tokens.json
output: per-block strict audit — class resolution, token compliance, off-grid spacing, pattern-language drift
gate: feeds stage 7
---

Cold strict audit of seven shipped surfaces against `canon/components.md` and `tokens.json`. Every flag is a violation of canon as written today. Audit names the rule, the file, the line, the value. Audit does not fix.

## Per-block audit

### `skills/kk-design-system/manifesto.md`

**Class resolution.** Signoff block at lines 115–132 uses `book__signoff`, `book__signoff-stats`, `stat`, `t-caption`, `t-caption--bold`, `book__signoff-signature`, `t-muted`, `book__signoff-signature-img`. Every class resolves to the components.md inventory (registry rows + Forbidden allowlist line 542). Pass.

**Token compliance.** Zero inline color, size, space, radius, motion. Pass.

**Off-grid spacing.** No spacing values declared. Pass.

**Pattern-language drift.** `t-muted` on the timestamp inside signoff matches `Signoff` snippet at components.md line 392. Two-stat shape clears the components.md "two or four, never three" rule (line 401). Pass.

### `skills/kk-design-system/canon/patterns.md`

**Class resolution.** Snippets use `app`, `sidebar`, `sidebar__nav`, `sidebar--collapsed`, `book`, `inspector`, `inspector--modal`, `card-stack`, `card`, `card--interactive`, `card--selectable`, `card__heading`, `card__body`, `t-title`, `t-caption`, `button`, `button--icon`, `registry-table`, `t-body`, `t-mono`, `book__signoff*`, `t-caption--bold`, `t-muted`, `stat`. Two flags:
- **`card-stack`** (lines 34, 97). Used as the canonical pattern wrapper. Not in the components.md component registry (lines 13–28) and not in the Forbidden allowlist prefix list (line 542). The allowlist starts with `card`, so `card-stack` resolves on prefix — pass on the allowlist. But `card-stack` carries no documented snippet, no rules, no deep link in components.md. The component the patterns book opens with does not exist in the components book. Flag — registry gap.
- **`card--selectable`** (lines 35, 45). Same shape — used in the canonical Card stack pattern, no registry row, no rules, no deep link in components.md. Flag — registry gap.

**Token compliance.** No inline values. Pass.

**Off-grid spacing.** No spacing declared. Pass.

**Pattern-language drift.** Two-stat signoff valid (line 142–155). Pass.

### `skills/kk-design-system/canon/components.md`

**Class resolution.** Component registry (lines 13–28) and Forbidden allowlist (line 542) define the inventory the rest of the audit measures against. Audit findings on the registry itself:
- **Missing rows for shipped Tier-1 classes.** `card--heading` (used in index.html line 83 and narrow.html line 56), `card-stack` (used in patterns.md line 34), `card--selectable` (patterns.md line 35), `card--shout`'s `card__body` and `card__collapsible` family (used in component HTML snippets line 175–179 inside this very book), `t-list` is in registry but `t-mono`, `t-muted`, `t-subtle`, `t-caption--bold`, `t-display--medium`, `t-body`, `t-hero`, `t-display`, `t-title`, `t-subtitle`, `t-caption`, `t-micro` only appear in the Type utility table (line 138–152) — not in the component registry. Acceptable since utility classes have their own table. Flag stays only on the missing component rows: `card--heading`, `card-stack`, `card--selectable`.
- **Forbidden allowlist gaps.** Line 542 lists prefixes `t-`, `card`, `field`, `button`, `tag`, `switch`, `sidebar`, `book`, `nav-group`, `inspector`, `comment`, `stat`, `swatch`, `app`, `preview-frame`, `registry-table`. Style.css ships these classes that do **not** match any allowed prefix: `toc__indicator` (line 213), `fab`, `fab--nav`, `fab--inspector`, `fab--comment`, `fab__count` (lines 2152–2196), `tier`, `tiers` (lines 1042–1056), `deck`, `deck-card`, `deck-card__select`, `deck-card__check` (lines 1745–1842), `highlight`, `highlight--active` (lines 1652–1666), `figure` (line 2046), `aside` (line 2066), `quote` (line 1857), `divider` (line 1671), `avatar` (line 1942), `checkbox` (line 1911). Each is a Forbidden-list breach when measured against the allowlist as written. Flag — allowlist incomplete.

**Token compliance.** Snippets reference `--space-2`, `--color-text`, `--color-bg` correctly. Pass.

**Off-grid spacing.** No spacing declared in body prose. Pass.

**Pattern-language drift.** Quote rules at line 95 say "No italic." Demo prose at `demos/fundamental--accepted/index.html` line 191 says "A quote wears italic and a hairline rail" — but that demo prose is out of scope for this surface. Flag stays on the demo (see below). Within components.md itself, no italics, no shadows, no glass, no blur, no gradients, no Title Case, no ALL CAPS in body prose. Pass on this surface.

### `skills/kk-design-system/pipeline/protocols.md`

**Class resolution.** No class attributes declared. The book renders as plain markdown. The §Signoff block (line 91–93) is plain prose: "Last edit: 2026-04-24. Maintainer: Konstantin Konstantinopolskii (kk.consulting)." Pass on class resolution since no classes are emitted.

**Token compliance.** No inline values. Pass.

**Off-grid spacing.** No spacing declared. Pass.

**Pattern-language drift.** Components.md line 376 declares the `book__signoff` block as the **canonical document ending**: "Every doc ships signed." Voice.md line 57 restates: "Every document ships signed. Author name, role, organization, timestamp, handwritten SVG." Manifesto.md, components.md, patterns.md all ship the canonical block. Protocols.md does not. The closing prose substitutes for the canonical block — pattern-language drift. Flag.

### `index.html` hallway

**Class resolution.** Every class on the surface — `app`, `sidebar`, `sidebar__header`, `sidebar__nav`, `sidebar__footer`, `t-title`, `t-subtitle`, `t-caption`, `t-display`, `nav-group`, `nav-group__items`, `toc__indicator`, `book`, `inspector`, `inspector__group`, `card`, `card--interactive`, `card--heading`, `card__heading`, `button`, `fab`, `fab--nav`, `fab--inspector`, `fab__count`. Cross-reference against the Forbidden allowlist (components.md line 542):
- **`toc__indicator`** (line 23). Does not match any allowed prefix. Flag.
- **`fab`, `fab--nav`, `fab--inspector`, `fab__count`** (lines 221, 228, 229). Do not match any allowed prefix. Flag.
- **`card--heading`** (lines 83, 137). Resolves on the `card` prefix but carries no registry row in components.md. Used as a structural class on the inspector heading card. Flag — undocumented variant.

**Token compliance.** No inline color, size, space, radius, motion. SVG `width="18" height="14"` (line 222) on the hamburger glyph — those are intrinsic SVG geometry, not box layout. Pass on tokens.

**Off-grid spacing.** No inline spacing on the surface. Pass.

**Pattern-language drift.** No drop shadows, glass, blur, gradients, italic, ALL CAPS, or Title Case in the rendered HTML or shell prose. The eight pointer cards each carry a `card__heading` plus a `<span class="button">` as a non-button affordance — `<span>` not `<button>`. Components.md Tag rules (line 263) say "If it looks clickable, it is a button." But this surface uses `<span class="button">` inside an `<a>`, which renders as a clickable button-styled element. Acceptable composition since the wrapping `<a>` carries the click. Pass.

### `style.css` (audited as the kit-internal stylesheet powering every surface above)

**Class resolution.** Tier 1 selectors (`.button`, `.card`, `.field`, `.tag`, `.switch`, `.t-*`) ship unscoped — verified at lines 87–135 (typography utilities), 668 (`.card`), 912 (`.field`), 1061 (`.button`), 1599 (`.tag`), 1683 (`.switch`). Pass on Tier-1 scoping.

**Token compliance.**
- **Drop shadow at line 1335** (`.comment__menu-popover`): `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 0.5px var(--color-border);`. Components.md Material rule line 38: "No drop shadows." Forbidden list line 545: "Drop shadows, glass, blur, gradients." Flag.
- **Drop shadow at line 2167** (`.fab`): `box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);`. Same rule broken. Flag.
- **Blur at lines 1541, 1546** (`@keyframes inspector-card-focus`): `filter: blur(4px); … filter: blur(0);`. Components.md Material rule line 39: "No blur." Forbidden list line 545. Flag.
- **Fifth radius at line 1770** (`.deck-card`): `border-radius: 20px;`. Components.md Radii rule line 117: "A fifth canonical radius is forbidden." Tokens.json defines four radii (12, 16, 24, 9999). 20 px is the fifth. Flag.
- **Off-token weight at line 135** (`.t-mono`): `font-weight: 600;`. Tokens.json `type.weights` lists 500 / 500 / 700 only. Components.md Type rule line 59: "Three weights used in the kit (Regular 500, Medium 500, Bold 700)." 600 is the fourth. Flag.
- **`.tag--inline` at lines 1615–1625**: `text-transform: uppercase;` plus `font-size: 0.8em;`. Components.md Forbidden list line 547: "Italics, ALL CAPS, Title Case." Voice.md line 13: "Sentence case in every heading. No Title Case. No ALL CAPS." Flag — shipped class drives ALL CAPS at the CSS layer.

**Off-grid spacing.** Spacing tokens scale at 4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 40 / 48 / 60 / 80. Off-grid values that fail the Space rule (components.md line 102, tokens.json line 48 "Every value is a multiple of 4. Off-grid spacing fails the linter"):
- Line 240, 257, 275, 284: `18px` (sidebar nav inset rail). Not a multiple of 4. Flag.
- Line 644: `text-underline-offset: 3px;`. Flag.
- Line 659, 916, 1015, 1212, 1295, 1353, 1386, 1455, 1810, 1822, 2264: `gap: 6px` / `gap: 3px` / `padding: 6px ...` / `gap: 2px` / `padding-top: 6px`. Six and three not multiples of 4. Flag.
- Line 985: `font-size: 14px;` is the micro token, OK. Pass.
- Line 988: `-webkit-text-stroke: 0.2px` — sub-pixel rendering hint. Not box geometry. Acceptable.
- Line 1017: `width: 70px;` (`.field__label`). 70 not a multiple of 4. Flag.
- Line 1050: `padding: var(--space-3) 21px var(--space-3) var(--space-3);` (`.tier`). 21 not a multiple of 4. Flag.
- Line 1065: `padding: 14px var(--space-6);` (`.button`). 14 not a multiple of 4. Flag.
- Line 1317: `width: 2.5px; height: 2.5px;` (`.comment__menu` dots). Sub-pixel. Acceptable as glyph rendering, but flag — uses raw decimal value, not 2 / 4.
- Line 1622: `letter-spacing: 0.2px;`. Sub-pixel typographic tracking. Acceptable as letter-spacing; tokens has `--track-tight` and `--track-tighter`. Flag — bypasses tokens.
- Line 1770: `padding: var(--space-5);` OK; but `border-radius: 20px;` already flagged.
- Line 1774: `margin-right: -190px;` (`.deck-card`). 190 not a multiple of 4. Flag.
- Line 1789: `transition: ... 300ms ...`. 300ms not in tokens (`--dur-fast` 120, `--dur-base` 200, `--dur-slow` 320, `--dur-long` 760). Flag — bypasses motion tokens.
- Line 1830, 1933, 1934: `width: 10px; height: 10px;` and `width: 8px; height: 8px;`. 10 not multiple of 4. Flag on 10.
- Line 1923: `border: 1px solid var(--color-border-strong);` (`.checkbox input`). Hairline standard across the kit is 0.5 px. 1 px breaks the hairline rhythm. Flag.
- Line 2287: `font-size: 48px; line-height: 48px;` (phone hero / part). 48 not in the type scale (`--fs-hero` 66, `--fs-display` 38, `--fs-body` 22, `--fs-title` 22, `--fs-subtitle` 18, `--fs-caption` 16, `--fs-micro` 14). Inline px bypasses the token contract. Flag — components.md Type rule line 64: "No inline `font-size`, `font-weight`, or `color`. Pick a utility class."

**Pattern-language drift.**
- **Drop shadows** (lines 1335, 2167) — flagged above under Material.
- **Blur** (lines 1541, 1546) — flagged above under Material.
- **Fifth radius** (line 1770) — flagged.
- **`.deck-card { background: #cccccc; }`** at line 1768. `#cccccc` is not in the nine-token palette (tokens.json `color`). Components.md Color rule line 49: "Nine tokens. Two backgrounds, two surface tints, two hairlines, three text alphas. No brand, no status colors, no accent." Flag — raw hex outside the palette.
- **Lebedev voice tells in code comments** (lines 194, 312, 333, 380): "per Lebedev rule 9", "Lebedev rule 13", "asymmetric per Lebedev's rules 12, 13, 14". Per the user-memory directive the maintainer asked Lebedev / Bureau / bureau.ru stripped from kit surfaces. Canon markdown is clean; style.css comments still ship the name. Flag — voice defect surviving in code prose. (CHANGELOG.md and proposals/*.md also retain the name; both are out of scope for this audit.)
- **Forbidden hard-coded colors elsewhere** (`#ffffff` at line 749, 751, 1372 etc.; `#000000` at line 747, 1495, 1568, 1576, 1779, 1799). These appear inside theme-flip blocks (`.card--shout`, `.inspector .card--interactive[data-state="active"]`, `.deck-card`) where the kit redefines `--color-bg` and `--color-text` as raw hex on purpose so child components rethemes through the cascade. Allowed by token contract since the redefinition stays inside the variable system. Pass.

### `demos/fundamental--accepted/patterns/narrow.html`

**Class resolution.** Classes used: `app`, `sidebar`, `sidebar--collapsed`, `button`, `button--icon`, `book`, `t-hero`, `book__intro`, `t-body`, `book__section`, `t-display`, `t-display--medium`, `t-muted`, `inspector`, `inspector--modal`, `inspector__group`, `card`, `card--heading`, `card--interactive`, `card__heading`, `t-title`, `t-caption`, `t-subtitle`, `button--primary`. Same `card--heading` registry gap as index.html. Flag.

**Token compliance.** Inline `<style>` block at line 11: `body { margin: 0; background: var(--color-bg-muted); }`. Uses the token. Pass.

**Off-grid spacing.** No inline spacing. Pass.

**Pattern-language drift.**
- Line 35, 45: heading break uses `<br />` plus `<span class="t-display--medium t-muted">…</span>`. `t-muted` here applies to the secondary line, which is structural (display heading subtitle), not metadata. Components.md Color rule line 51: "`t-muted` and `t-subtle` are metadata only — bylines, captions, hairlines, placeholders." A subtitle under a display heading is content, not metadata. The same pattern ships in `demos/fundamental--accepted/index.html` lines 97–99 etc. and was endorsed there as kit canon, but components.md as written today says metadata only. Flag — drift between code precedent and the rule the book ships.
- Two `data-cta` buttons inside the inspector card at lines 64–65: `Close` (minimized) and `Confirm` (active). Components.md Button rules line 248: "Secondary and primary labels never repeat." Close vs Confirm — different verbs. Pass.
- Page lacks the canonical `book__signoff` block. Pattern slice may be exempt — narrow.html is a pattern preview, not a finished document. Acceptable as a pattern slice. Pass.
- No drop shadows, blur, glass, gradients in this file. Pass.

## Style.css scoping audit

**Tier 1 (unscoped).** `.button`, `.card`, `.field`, `.tag`, `.switch`, `.t-*` declarations live without `.book` ancestor:
- `.t-hero` line 87, `.t-display` line 93, `.t-title` line 100, `.t-subtitle` line 105, `.t-body` line 110, `.t-caption` line 116, `.t-micro` line 122, `.t-muted` line 127, `.t-subtle` line 128, `.t-mono` line 135 — unscoped. Pass.
- `.card` line 668, `.card--shout` line 746, `.card--interactive` line 762, `.card__heading` line 822, `.card__body` line 826 — unscoped. Pass.
- `.field` line 912, `.field--row` line 1012, `.field__label` line 1017, `.field__input` line 1025 — unscoped. Pass.
- `.button` line 1061, `.button--primary` line 1078 — unscoped. Pass.
- `.tag` line 1599, `.tag--bold` line 1607, `.tag--inline` line 1615 — unscoped. Pass.
- `.switch` line 1683, `.switch__track` line 1711, `.switch__input` line 1696 — unscoped. Pass.

**Tier 2 (inside `.book`).** Sibling selectors, heading-to-paragraph spacing, list adjacency, quote treatment, label-list pairs sit under `.book__section` or `.book` ancestor:
- Sibling rhythm (`* + *`, `* + .t-display`, `* + h2`, etc.) all scoped to `.book__section >` (lines 392–425). Pass.
- Heading-below margins all scoped to `.book__section >` (lines 439–463). Pass.
- Label-list pairs (`p:has(+ ul)`, `p + ul`) scoped to `.book__section >` (lines 490–497). Pass.
- Quote treatment (`* + .quote`, `h2 + .quote`, `hr + .quote`) scoped to `.book__section >` (lines 1885–1898). Pass.
- Doc-rule card surface (`.book .card:not(.card--heading)` line 1477, `.book .card-stack > .card` line 1480, `.book .card.card--shout` line 1493) — scoped to `.book` ancestor. Pass.

No tier violations found. Tier 1 stays unscoped; Tier 2 lives under `.book` or `.book__section`. Pass on scoping.

## Drift summary

Flag counts by category:

- **Class resolution:** 7 flags.
  - patterns.md: `card-stack` registry gap.
  - patterns.md: `card--selectable` registry gap.
  - components.md: `card--heading` missing registry row.
  - components.md: Forbidden allowlist incomplete (misses `toc-`, `fab`, `tier`, `deck`, `highlight`, `figure`, `aside`, `quote`, `divider`, `avatar`, `checkbox` prefixes).
  - index.html: `toc__indicator` outside allowlist.
  - index.html: `fab` family outside allowlist.
  - narrow.html: `card--heading` undocumented (same root as components.md flag).

- **Token compliance:** 8 flags (style.css).
  - Drop shadow on `.comment__menu-popover` (line 1335).
  - Drop shadow on `.fab` (line 2167).
  - Blur in `inspector-card-focus` keyframes (lines 1541, 1546).
  - Fifth radius `20px` on `.deck-card` (line 1770).
  - Off-token font-weight `600` on `.t-mono` (line 135).
  - ALL CAPS via `text-transform: uppercase` on `.tag--inline` (line 1623).
  - Off-token color `#cccccc` on `.deck-card` (line 1768).
  - Inline `font-size: 48px` on phone hero / part (line 2287) — outside the type scale.

- **Off-grid:** 13 flags (style.css).
  - `18px` sidebar nav rail (lines 240, 257, 275, 284).
  - `text-underline-offset: 3px` (line 644).
  - `gap: 6px` (lines 659, 1015, 1386, 1455 etc.) and `gap: 3px` (line 1212), `gap: 2px` (line 1295).
  - `padding-top: 6px` / `padding-bottom: 6px` (line 2264), `padding: 6px` (line 1353).
  - `width: 70px` on `.field__label` (line 1017).
  - `padding: ... 21px ...` on `.tier` (line 1050).
  - `padding: 14px ...` on `.button` (line 1065).
  - `width / height: 2.5px` on `.comment__menu` dot (line 1317).
  - `letter-spacing: 0.2px` on `.tag--inline` (line 1622).
  - `margin-right: -190px` on `.deck-card` (line 1774).
  - `transition: 300ms ease-out` on `.deck-card` (line 1789) — bypasses motion tokens.
  - `width / height: 10px` on `.deck-card__check` (line 1830).
  - `border: 1px` on `.checkbox input` (line 1923) — breaks 0.5 px hairline rhythm.

- **Pattern drift:** 4 flags.
  - protocols.md ships without `book__signoff` (Pattern-language drift on canonical document ending).
  - narrow.html uses `t-muted` on a structural display subtitle (Color rule says metadata only).
  - style.css carries Lebedev voice tells in code comments (lines 194, 312, 333, 380) — voice defect surviving in code prose.
  - style.css `.tag--inline` ships ALL CAPS through CSS — also counted under tokens above; named here as the voice-pattern broken alongside the token breach.

Verdict line per category — class resolution: **7 flags** · token compliance: **8 flags** · off-grid: **13 flags** · pattern drift: **4 flags** · style.css scoping: **0 flags / pass**.

## Notable observations

- The audit-on-the-audit pattern. Components.md is itself one of the seven shipped surfaces, and its own Forbidden allowlist is the rule the rest of the audit measures against. The book is incomplete as a measuring stick — fab, toc, tier, deck, highlight, figure, aside, quote, divider, avatar, checkbox all live in style.css but no allowlist prefix accommodates them. The book ships a stricter contract than the kit can hold today.
- Drop shadow on `.fab` and `.comment__menu-popover` survived a manifesto session whose stated job is to scrub the kit's pattern language. Both shadow lines pre-date the rename and rode the wave through. The visual depth is genuinely small (12 px / 16 px blur, 0.08–0.15 alpha) but the rule reads "No drop shadows" without an exemption clause.
- The `inspector-card-focus` keyframe uses `filter: blur(4px)` as transient choreography — not a resting glass surface. The Material rule does not carve out transient effects; "No blur" reads absolute.
- Three-column shell and card stack and narrow mobile patterns ride atop two undocumented variants (`card-stack`, `card--selectable`) that the patterns book itself depends on. The component book the patterns book points to does not catalog them.
- `t-mono` shipping at weight 600 is a long-running quiet drift — tokens.json names three weights, the kit class quietly uses a fourth.
- Style.css scoping is clean. Tier 1 / Tier 2 split holds in every selector audited. The discipline is real even where the inventory drifts.

## Verdict

**FAIL.**

Per the role contract pass = zero flags. The audit returns 32 flags across class resolution (7), token compliance (8), off-grid spacing (13), and pattern drift (4). Style.css scoping passes cleanly.

The flags split into three tiers of severity for the meta-reviewer to weight:

- **Hard canon breaches** that the rule book names by name: drop shadow ×2, blur ×2 frames, fifth radius, ALL CAPS, off-token color `#cccccc`, off-token weight 600, inline font-size 48 px. Eight flags. Each maps to a single line in components.md or tokens.json.
- **Inventory gaps** between the kit's own books and what the kit actually ships: `card-stack`, `card--selectable`, `card--heading`, fab family, toc indicator, tier, deck, highlight, figure, aside, quote, divider, avatar, checkbox. Either the books grow registry rows + allowlist prefixes, or the classes leave the kit. The strict reading is the books are wrong; the practical reading is the books undersell what's shipped.
- **Off-grid sub-pixel and rail-width drift** in nav, button, tier, field, deck. Thirteen flags. Each is a small number outside the 4 px grid the kit pledges. The kit's own comments (lines 191–195) acknowledge the rail-width arithmetic the 18 px figure reads from — but the rule the book ships is "Every value is a multiple of 4."

Pattern drift on protocols.md missing signoff and narrow.html `t-muted` on structural subtitle round out the four pattern-language flags.

## Hand-off

Feeds **stage 7 meta-reviewer**. Anna Wintour will weigh this audit against the analyst brief and the direction doc, alongside stage 6a (jobstory cold read) and stage 6c (voice cold read), before issuing the rubric-gated verdict. The 32 flags here become rubric item 4 evidence ("Zero off-inventory components") plus Material/Color/Type rule citations for the strict canon line.

If the meta-reviewer routes via reiterate protocol path (a) Fix + re-dispatch, the natural stage owner per flag tier is:

- Hard canon breaches: stage 5 (design engineer) for the CSS fixes; stage 1 (analyst) only if the rules themselves are wrong rather than the code.
- Inventory gaps: stage 3b (designer-components) to write the missing registry rows + Forbidden allowlist prefixes; or stage 1 to scope a kit-internal evolve protocol pass.
- Off-grid drift: stage 5 (design engineer).
- Pattern drift on protocols.md signoff: stage 3b (designer-protocols).
- Pattern drift on `t-muted` structural subtitle: stage 3b (designer-components) — the rule needs a carve-out or the demos need to stop using `t-muted` on display subtitles.

Reiteration cannot originate from this role. Audit hands the flag list to the meta-reviewer; the human picks the path.
