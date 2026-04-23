---
session: 2026-04-23-fundamental
stage: 6b-rerun
role: consistency-ds
input: demos/fundamental/index.html (stage 5 rerun)
output: Rerun kit-conformance audit. Swatches resolve. Residual drift is inline styles on swatch dots and a kit/components.md inventory gap.
gate: feeds stage 7
---

Cold read of the rerun fundamental demo against components.md and tokens.json. Per-block four-vector audit. File references cite the built HTML line numbers.

## Raw input

> Cold read of the **updated** `demos/fundamental/index.html` against kit canon (`skills/kk-design-system/components.md` + `skills/kk-design-system/tokens.json`). RERUN after stage 5 rerun. Zero upstream context.

Input file: `demos/fundamental/index.html` (988 lines).

## Block — Sidebar

### Class resolution
Flag: `toc__indicator` (line 21) is named in components.md §Navigation prose but carries no allowed prefix from the components.md §What's forbidden whitelist and is not inventoried as a standalone pattern. Accepted by components.md reference; note as documentation gap, not a demo fix.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Doc intro + part break

### Class resolution
- `doc__part` (lines 93, 191, 436, 585, 698): resolves via `doc` prefix, defined in kit style.css. Not inventoried in components.md.
- `doc__intro` (lines 82, 86): same — `doc` prefix, in kit style.css, absent from components.md inventory. Documentation gap.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Prose / Opening

### Class resolution
Pass.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Prose / Reading

### Class resolution
Pass.

### Token compliance
Flag: `p.t-micro.t-muted` (line 126). `t-muted` on a body paragraph. Components.md §Typography: `t-muted` "Metadata only." The content ("Micro is 14 / 20, reserved for metadata and citations.") is descriptive body about the micro type size, not metadata tied to a named artefact. User-memory rule: muted forbidden on body and structural markers. Fix direction: drop `t-muted`, or re-cast the line as a caption attached to a specific figure.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Prose / Lists

### Class resolution
- `t-list` (lines 143, 151): `t-` prefix, defined in kit style.css. Not listed in components.md typography inventory. Documentation gap.
- `span.aside` (line 162): `aside` is not on the components.md allowed-prefix list (§What's forbidden). Kit style.css defines `.aside`. Flag as unregistered atom.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Prose / Figures

### Class resolution
- `blockquote.quote` (line 173): `quote` is not on the components.md allowed-prefix list. Kit style.css defines it. Unregistered atom.
- `figure.figure` + `figcaption` (lines 183–186): `figure` is not on the components.md allowed-prefix list. Kit style.css defines it. Unregistered atom.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass — italic inside a quote is the sanctioned exception.

## Block — Spec / Color

### Class resolution
Pass. `swatch`, `swatch__dot` both resolve via the `swatch` prefix on the components.md allow list.

### Token compliance
Flag, nine instances: inline `style="background: var(--color-...)"` on `.swatch__dot` at lines 206, 210, 214, 218, 222, 226, 230, 234, 238. Components.md §What's forbidden: "Inline styles for tokens. Use `var(--token-name)`." SKILL.md vector 2 flags any inline `style=""` setting `background`, regardless of whether the value references a kit var. The color tokens themselves are correct; the delivery is wrong. Fix direction: move per-dot backgrounds into kit CSS via `.swatch__dot--bg`, `.swatch__dot--text`, etc., or bind off a `data-token` attribute with CSS attribute selectors. The HTML should carry no inline style.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Spec / Space

### Class resolution
Pass.

### Token compliance
Pass. `13px` at line 253 is body copy naming a forbidden value, not a CSS value.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Spec / Type

### Class resolution
Pass.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Spec / Motion

### Class resolution
Pass.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Controls / Cards

### Class resolution
- `card--tight` (line 469): kit style.css defines the modifier. Components.md §Card lists only static, interactive, shout as variants. Unregistered variant.
- `card--heading` (line 483 and inspector lines 740, 827): kit style.css defines it. Not inventoried in components.md Card variants. Unregistered variant.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Controls / Fields

### Class resolution
- `field__value` (lines 505, 809, 813, 817): kit style.css defines the read-only value sibling. Components.md §Field snippet inventories `field__label` + `field__input` only. Unregistered field part.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Controls / Buttons

### Class resolution
Pass.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Controls / Tags

### Class resolution
- `tag--inline` (lines 542, 543, 544): kit style.css defines the modifier. Components.md §Tag lists only `tag` and `tag--bold`. Unregistered variant.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Controls / Switches

### Class resolution
Pass.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Collections / Card stack

### Class resolution
Flag: `card-stack` (line 596) — `card` prefix, sanctioned. Components.md §Patterns names the pattern in prose but fixes no class. Documentation gap only.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Collections / Deck

### Class resolution
- `deck`, `deck-card`, `deck-card__select` (lines 666, 667, 670, 675, 680, 685, 690, plus inspector lines 751, 752, 755, 757, 760, 762, 765): none of the `deck` prefixes appear on the components.md allowed-prefix list. Kit style.css and index.html define the deck. Unregistered pattern.
- Bare `active` class on `deck-card` (lines 667, 752): state expressed as a class rather than `data-state="active"` as used elsewhere on cards. Kit index.html uses the same shape, so sanctioned by precedent; still unregistered in components.md.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Margin / Signoff

### Class resolution
Pass. `doc__signoff`, `doc__signoff-stats`, `doc__signoff-signature`, `doc__signoff-signature-img`, `stat` all resolve under `doc` and `stat` prefixes.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Inspector / Tweak group

### Class resolution
- `inspector__group` (lines 739, 826): `inspector` prefix, allowed. Not explicitly documented in components.md §Patterns. Documentation gap.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — Inspector / Comments group

### Class resolution
Pass. `comment-new`, `comment-new__header`, `comment-new__preview`, `comment-new__field`, `comment-stack`, `comment-thread`, `comment-thread__preview`, `comment-thread__list`, `comment-thread__ellipsis`, `comment-thread__reply`, `comment-thread__resolved`, `comment-thread__resolved-stamp`, `comment-thread__resolved-snippet`, `comment-thread__resolved-byline`, `comment-msg`, `comment-msg__header`, `comment__menu`, `comment__menu-popover`, `comment__menu-item`, `comment__menu-item--approve` all resolve under the `comment` prefix and match kit style.css.

### Token compliance
Pass.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Block — FABs

### Class resolution
Flag: `fab`, `fab--nav`, `fab--inspector`, `fab--comment`, `fab__count` (lines 975, 982, 983, 985). `fab` is not on the components.md allowed-prefix list. Kit style.css defines all five. Unregistered component.

### Token compliance
Pass. SVG `width="18"`, `height="14"`, `rx="1"` etc. at lines 976–980 are SVG coordinate space, not CSS sizing.

### Off-grid spacing
Pass.

### Pattern-language drift
Pass.

## Summary

Most flags: **Spec / Color** — nine inline `style` attributes on `.swatch__dot`. The rerun corrected the swatch colors (all nine resolve to `--color-*` vars), but the mechanism is still inline style, which components.md §What's forbidden rules out.

Zero flags: Opening, Space, Type, Motion, Buttons, Switches, Signoff, Comments group.

The recurring non-demo pattern is a kit/canon inventory gap: `doc__part`, `doc__intro`, `t-list`, `.aside`, `.quote`, `.figure`, `card--tight`, `card--heading`, `tag--inline`, `field__value`, `inspector__group`, `.card-stack`, `.deck`/`deck-card`, `.fab` live in kit style.css and are used by the demo, but components.md either omits them from its inventory or excludes their prefix from §What's forbidden. The demo consumes the shipped kit faithfully. Stage 7 routes whether the fix is components.md (document the atoms) or the demo (drop them). The one clean kit-inventory defect the demo owns is the inline-style swatch dots.

## Gate

Feeds stage 7 meta-reviewer alongside 06a and 06c.

## Hand-off

→ `kk-role-meta-reviewer`. Input: this file plus 06a + 06c + prior-stage artefacts.
