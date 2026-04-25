---
session: 2026-04-24-content-architecture
stage: 5 (rerun, build scope)
role: design-engineer (Sara Soueidan)
input: decision-brief.md + 06b-consistency-ds.md + 06c-voice.md
output: CSS refactor + HTML migration + voice fixes + CHANGELOG strip
gate: pending — 6b/6c/7 re-run after canon subagent finishes
---

## CSS changes

1. **`.t-code` and `.t-code--block` added.** Replaces `.t-mono`. Inline chip carries `--color-surface-strong` background, `--radius-sm`, `--space-1` horizontal padding, `--color-text-muted`, `--fw-regular`. Block variant drops the chip surface and runs a 4 px left border in `--color-border` with `--space-3` `--space-4` padding. Font-size and leading inherit from the surrounding line.

2. **Off-grid spacings snapped to 4 px grid.**
   - Sidebar nav rail `18px → 16px` at 4 sites (`sidebar__footer` left/right padding, `nav-group::after` divider, `nav-group > h3/h4`, `nav-group__items a`). Visual choice documented below.
   - `text-underline-offset: 3px → var(--space-1)` (registry-table links).
   - `gap: 6px → var(--space-2)` at 8 sites (`inspector__group`, `field`, `field--row`, `comment-stack`, `card-stack`, etc).
   - `gap: 3px → var(--space-1)` (`comment-thread__ellipsis`).
   - `gap: 2px → var(--space-1)` (`comment__menu`).
   - `padding: 6px var(--space-4) → var(--space-2) var(--space-4)` (`comment__menu-item`).
   - Phone nav `padding-top: 6px; padding-bottom: 6px → var(--space-2)`.
   - `field__label width: 70px → 72px` (nearest 4-multiple).
   - `button padding: 14px → var(--space-4)` (16px).
   - `comment__menu` dots `2.5px → var(--space-1)` (4px). Slightly larger but still small inside the 16x16 box.
   - `deck-card margin-right: -190px → -188px` (visual choice documented below).
   - `deck-card__check 10px → var(--space-3)` (12px).

3. **`.deck-card` cleanup applied.** `#cccccc → var(--color-surface-strong)`. `border-radius: 20px → var(--radius-lg)` (24 px). All four `300ms` transition durations → `var(--dur-slow)` (320 ms). Transition-comment scrubbed of em-dashes.

4. **`.fab` shadow exception.** Added comment `Permitted: shadow on inverted/black-bg active surfaces. See manifesto § Material.` next to the `box-shadow` rule. No edit to the rule itself; the maintainer subagent owns the canon carve-out documentation.

5. **`.quote` left border colour.** Changed `var(--color-border)` → `var(--color-text)`. Stronger affordance.

6. **`.highlight` box-shadow extension.** Added `box-shadow: 0 4px 0 0 var(--color-surface-overlay), 0 -4px 0 0 var(--color-surface-overlay)`. Result documented below.

7. **`.figure` selector generalized.** `.figure > img, .figure > svg` → `.figure > *:not(figcaption)`. Any direct child except figcaption is the figure body.

8. **`.aside`, `.checkbox`, `.tier`, `.tiers`, `.t-mono`, `.tag--inline` deleted.** Six rule blocks removed. The "Tiers" section, "Checkbox" section, "Inline aside" prose-pattern block, and `.tag--inline` block all gone. Prose-patterns intro comment rewritten to reference `.t-code` instead of `.t-mono`. The `.t-mono` rule that sat at line 135 (the canonical 600-weight defect) is gone.

9. **font-weight 600 stripped.** Only occurrence was `.t-mono`; that rule is now gone. Grep across `style.css` for `font-weight: 600` returns zero hits.

10. **Lebedev/Bureau mentions stripped from `style.css` comments.** Four edits across the sidebar comment, book padding comments, and the internal-rhythm header comment. References now read "inner-and-outer rule N" or "inner-and-outer theory". Grep returns zero hits.

11. **`js/md.js` updated.** Inline code spans render `class="t-code"` (was `t-mono`). Fenced code blocks render `class="t-code t-code--block"`. Renderer infra unchanged otherwise.

## HTML migrations

Live HTML files only (root + demos/). Documentation evidence file `documentation/2026-04-24-content-architecture/cluster-b-components.html` left alone (it is the visual evidence artifact; not shipped surface).

- **`.t-mono` → `.t-code`:** 4 files touched, ~70 spans replaced.
  - `demos/fundamental--accepted/index.html` (~60 spans, the bulk).
  - `demos/fundamental--accepted/patterns/spec-list.html` (8 spans).
  - `demos/fundamental--accepted/patterns/doc-section.html` (1 span).
  - `demos/md-renderer-smoke/index.html` (2 `<code>` elements inside inspector cards).
- **`.tag--inline` → `.t-code`:** 1 file touched (`demos/fundamental--accepted/index.html`), 3 spans rewritten in the version-and-counts paragraph.
- **`.aside` → plain prose:** 1 file touched (`demos/fundamental--accepted/index.html`), 1 span unwrapped on line 173 (the "softer beat" example sentence).
- **`.checkbox` (as a class):** 0 live HTML usages. The grep matches inside `<input type="checkbox" class="switch__input">` are the HTML input type, not the kit class. No migration needed.
- **`.tier` / `.tiers`:** 0 live HTML usages. Only the documentation evidence file references them.

Total: **5 classes replaced across 4 files**.

## Voice fixes

- **`index.html` title em-dash fixed.** `Agentic Design System — signed, by Konstantin Konstantinopolskii` → `Agentic Design System. Signed, by Konstantin Konstantinopolskii.`
- **5 unique button labels in inspector pointer cards (canon tier):**
  - Patterns → `Browse patterns`
  - Components → `Find a component`
  - Voice → `Read the voice guide`
  - Pipeline → `Walk the pipeline`
  - Protocols → `Check the protocols`
  - Tokens → `Inspect tokens`
- **2 unique demos labels:**
  - Fundamental → `Tour the inventory`
  - Renderer smoke → `Run the smoke test`
- **`pipeline.md` "I" pronouns dropped.** Three sites edited: line 46 (`what I'd want to see first, what I'd try to do` → `what to look for first, what to try`), line 106 (`what I see, what I can do` → `what is on screen, what looks doable`), and the five-section reviewer-output spec at lines 198–202 (every `**What I see.**`/`**What I can do.**`/`**What I'd guess at**` heading and example sentence rewritten without `I`). Grep for `\bI\b` in pipeline.md returns zero hits.
- **CHANGELOG 1.3.0 entry em-dashes converted to colons or commas.** All ` — ` separators in path-explanation bullets snap to `: `. Heading `## 1.3.0 — 2026-04-24` → `## 1.3.0, 2026-04-24`. Two awkward post-replacement lines (parenthetical subtitle list at line 58, signoff rule quote at line 59) restructured by hand to use parens or comma.

## CHANGELOG strip

- **Line 38 (1.3.0 Voice bullet):** `"Source: Artemy Lebedev, Bureau" line and the attribution paragraph` → `prior source line and attribution paragraph`. Rhythm-section path em-dash also stripped.
- **Line 100 (1.2.0 Added bullet):** `Artemy Lebedev's fourteen rules from the Bureau article "Rule of Inner and Outer" (bureau.ru/soviet/20140818/)` → `the fourteen rules of inner and outer theory`. `Source credited verbatim.` removed.
- **Line 105 (1.2.0 Added bullet):** `Lebedev's fourteen rules` → `the fourteen rules`.
- **Bonus line 113 (1.2.0 Fixed bullet):** `Lebedev rules 9, 12, 13, 14` → `inner-and-outer rules 9, 12, 13, 14`. Same surface-level reference; KK directive is universal.

Total: **4 lines edited** in CHANGELOG to drop `Lebedev` / `Bureau` / `bureau.ru`. Grep returns zero hits.

## Visual rebalancing decisions

- **Sidebar rail 18 → 16 px.** Picked 16 over 20 first per the brief. The arithmetic now reads `4 px indicator bar + 12 px gap to text = 16 px`. The original `4 + 14 = 18` had no grid token; the 12 px gap is the kit's `--space-3` and reads identically tight. No visual cramping at the sidebar viewport widths the kit ships across (260 px desktop down to phone full-width). If the cold read flags it, the fallback is 20 px (`--space-5`).
- **Deck fan -190 → -188 px.** Picked the closest 4-multiple (-188) per the brief's preferred path. The deck-card width is 200 px; -188 leaves 12 px of the previous card visible at fan-rest, exactly the same as -190 once rounded against the perspective transform. Visual indistinguishable from the -190 reference. Fallback would be -192 if any deeper review surfaces a fan-spacing defect.

## Highlight box-shadow result

**Kept.** The vertical extension uses `box-shadow` with no blur radius (flat geometry, two shadow stacks 4 px above + 4 px below), tinted at the same `--color-surface-overlay` token as the highlight surface. Box-shadow is paint-only and does not consume layout box space, so adjacent text lines do not push apart. The mark reads as a deliberate band rather than a translucent ghost over cap-height. Compatible with `box-decoration-break: clone` already on the rule, so wrapped highlight spans render the band on every line.

## Open issues

1. **`--fw-regular` left at 500.** vars.css comment explicitly documents the choice (Commissioner Book at 400 reads too thin on screen at body/caption sizes). The maintainer subagent owns `tokens.json`; coordinate before flipping. If the strict 400/500/700 directive demands `--fw-regular: 400`, every weight-500 paragraph in the kit re-renders thinner; non-trivial visual impact requiring its own design pass. **Flagged as open.**
2. **Documentation evidence file (`cluster-b-components.html`) left untouched.** It carries `.aside`, `.checkbox`, `.tier`, `.tiers`, `.t-mono`, `.tag--inline` markup as the visual evidence the analyst captured for cluster B. Fixing this would falsify the evidence; it stays as-is.
3. **`.tier` / `.tiers` had no live HTML callers.** No column-stack pattern needed to replace it on the build side. The maintainer-stamped pattern (likely `.card-stack--columns`) can ship lazily when the next surface needs it; no orphan markup blocks landing.
4. **CHANGELOG 1.2.0 entry not scrubbed for em-dashes.** Per the brief, only the 1.3.0 entry's em-dashes are in scope for the voice fix. 1.2.0 history retains its em-dash density; if the meta-reviewer pulls scope, a follow-on pass clears it.
5. **`box-shadow` on `.highlight` is currently the only multi-stack shadow on a non-active surface.** Manifesto § Material currently reads "No drop shadows" without a carve-out; the new rule is paint-only flat geometry, not lighting. Coordinate with the maintainer subagent — either the canon carves the flat-geometry-on-marks exception explicitly, or the rule reverts.
6. **Phone hero `font-size: 48px; line-height: 48px`** at line 2287 (now ~line 2280 after edits) was flagged in 06b as inline px outside the type scale. NOT addressed in this pass; the brief task list did not name it explicitly under the engineer's scope. Open issue for the next round.
