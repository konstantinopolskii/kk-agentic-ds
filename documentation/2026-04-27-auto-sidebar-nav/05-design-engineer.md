---
session: 2026-04-27-auto-sidebar-nav
stage: 5
role: design-engineer (DS-engineer mode)
input: documentation/2026-04-27-auto-sidebar-nav/01-analyst.md
output: kit.js auto-nav generator + scroll-spy update; style.css link-reset; four sidebar HTMLs collapsed to empty shell; index.html post-render hook retired
gate: handing to stages 6b + 6c parallel cold reads
---

# Design engineer — auto sidebar nav

Sidebar TOC now generates from the rendered `.book` heading rank. The hand-curated `<section class="nav-group">` blocks across four consuming pages collapsed to a one-line empty shell. kit.js owns the slug logic, the heading-id stamper, and the post-render refresh listener. Consumers no longer wire `kk:md-rendered` themselves.

## Raw input

This session's spec lives at `documentation/2026-04-27-auto-sidebar-nav/01-analyst.md`. Eight locked decisions act as the build contract.

## Files shipped

- `js/kit.js` — added `slugify`, `headingLabel`, `getPrimaryHeading`, `stampHeadingIds`, `buildSidebarToc`. Wired into `KK.init()` and `KK.refresh()` ahead of `initScrollSpy`. Module-level `kk:md-rendered → KK.refresh` listener at IIFE close. Modified `setActive`, `moveIndicator`, `scrollActiveIntoView`, and the resize handler in scroll-spy to track the active anchor's own rect (tight on the row) instead of the parent element's rect (would stretch across nav-group when a bold label is active).
- `style.css` — extended `.nav-group > h3, .nav-group > h4` rule set to include `.nav-group > a.nav-group__head` for padding, color, transition. Added `.nav-group > a.nav-group__head { display: block; text-decoration: none }` for link reset. Extended `.is-active`, `:hover`, and the narrow-view padding selector list to include the new bold-label anchor.
- `index.html` — sidebar nav collapsed to `<nav class="sidebar__nav" id="toc"><span class="toc__indicator" aria-hidden="true"></span></nav>`. Inline `slugify` + `stampSectionIds` deleted (kit owns them now). Inline `kk:md-rendered` listener deleted (kit auto-fires on the same event). Comment block at the script tags rewritten to name the new flow.
- `demos/fundamental--accepted/index.html` — sidebar nav collapsed to empty shell.
- `demos/comment-persistence/index.html` — sidebar nav collapsed to empty shell.
- `demos/md-renderer-smoke/index.html` — sidebar nav collapsed to empty shell.

## Kit classes used

- `sidebar__nav`, `toc__indicator` — sidebar TOC shell.
- `nav-group` — generated wrapper around each bold label + items pair.
- `nav-group__head` — new modifier on the bold-label anchor inside `.nav-group`. Lives next to existing `nav-group__items`. No new top-level class; it's a head-of-group token under the existing nav-group block.
- `nav-group__items` — existing `<ul>` class for items.
- `t-subtitle` — typography class on the bold label, parity with the legacy `<h4 class="t-subtitle">`.
- `t-caption` — typography class on each item `<li>`, identical to today.

## Attribute gating scheme

- `data-nav="manual"` — opt-out attribute on `<nav class="sidebar__nav">`. When present, `buildSidebarToc` short-circuits and leaves hand-curated content alone. New attribute introduced this session. Default behaviour (attribute absent) is autonav on.
- No new role/stage/state attributes. Scroll-spy continues to use `is-active` as a class on the active anchor's parent (`<li>` for items, `<section class="nav-group">` for bold labels). The `.nav-group.is-active` class continues to drive the existing CSS cascade.

## Build log

1. **Slug helper.** `slugify` lifted from `index.html` post-render hook into kit.js. Identical regex.
2. **Heading-id stamper.** `stampHeadingIds(book)` walks every `article.book__section` descendant of `.book`, stamps a slug-derived id on the article (when missing) and on every direct `:scope > h2, :scope > h3` child (when missing). Hand-authored ids win — the stamper skips already-set ids.
3. **TOC generator.** `buildSidebarToc()` reads top-level `.book > article.book__section`, picks one of three modes from heading rank, clears the nav (preserving `.toc__indicator`), and rebuilds:
   - **Multi-h1 mode** — ≥2 top sections whose primary heading is h1. Each h1 → bold label; each h1's nested book__section with h2 primary → item.
   - **Mixed mode** — single-h1, anywhere in `.book` an h2-rooted section has an h3 direct child. Each non-lead h2 section → bold label; each h3 direct child → item. h2 with no h3 children stands alone as a label.
   - **Flat mode** — single-h1, no h3 direct children anywhere. One nav-group with no head, items = each non-lead h2 section.
4. **Heading label extractor.** `headingLabel(h)` walks the heading's child nodes until the first `<br>` and concatenates `textContent` from prior children. Drops the `t-display--medium` sub-label that some static-body pages render after a `<br>`. Used for both the nav label and the slug stamp so the two stay aligned.
5. **Scroll-spy update.** `setActive` tracks `activeAnchor` (the `<a>`) instead of `activeLi` (the parent). `moveIndicator(activeAnchor)` measures the anchor's own rect — tight on the row whether the anchor is a `<li>` item or a bold-label sitting directly inside a `<section class="nav-group">`. The is-active class cascade is unchanged: `<li>` for items or `<section class="nav-group">` for bold labels gets the class, and the existing `.nav-group.is-active`-anchored CSS rules light up the heading + items together. Resize handler reads `.nav-group__items li.is-active > a, .nav-group.is-active > a.nav-group__head` to repick the active anchor on viewport change.
6. **CSS parity.** `.nav-group > a.nav-group__head` joins the rule list that previously matched `.nav-group > h3, .nav-group > h4`. Same padding, same color, same transition, same hover, same active state, same narrow-view padding override. Block display + link reset on top.
7. **Module-level kk:md-rendered listener.** `document.addEventListener('kk:md-rendered', KK.refresh)` at IIFE close. Replaces the per-page hook in `index.html`. Retains the in-`initCommentPersistence` listener for the highlight-rewrap path; both fire on the event without conflict (the persistence listener's only side effect is `rewrapAllHighlights`, which is idempotent).
8. **Sidebar HTML collapse.** Manifesto + three demos all reduced to the single empty-shell shape. 49 lines deleted from `index.html`'s sidebar block; 50 lines from `fundamental--accepted`; 9 lines from `comment-persistence`; 9 lines from `md-renderer-smoke`.
9. **Index.html script block.** Inline `<script defer>` carrying the duplicated slug logic and the post-render hook deleted. The `<script>` lines for kit.js + md.js remain, with a fresh comment naming the new flow.

## Dummy-text spots

None. Every visible string the kit emits comes from the rendered `.book` headings via `headingLabel`. No new prose introduced.

## State coverage check

| Element | rest | hover | active (scroll-spy) | active (click) | narrow view |
|---|---|---|---|---|---|
| Bold label `a.nav-group__head` | muted text, block, no underline | full-text on group hover (existing rule extended) | `nav-group.is-active` cascade colors heading + indicator tracks anchor's rect | scroll-spy locks during smooth scroll, `setActive(id)` runs on click | extended padding via `.sidebar .nav-group > a.nav-group__head` rule |
| Item `<li><a>` | unchanged | existing item-hover rule | unchanged | unchanged | unchanged |
| `.toc__indicator` | hidden until first setActive | n/a | rides anchor rect (anchor measure, not parent) | smooth-tracks during transitions | flush-left on phone (existing rule unchanged) |

No state introduced without a kit mechanism.

## Inventory check

- All classes used by the generator (`nav-group`, `nav-group__items`, `t-subtitle`, `t-caption`) exist in `manifesto.md § Components`.
- One new modifier introduced under an existing block: `nav-group__head`. Goes into the §Maintainer proposals below for canon update.
- One new attribute: `data-nav="manual"`. Goes into §Maintainer proposals.
- Token usage: no new tokens. CSS uses `var(--space-1)`, `var(--space-4)`, `var(--space-6)`, `var(--color-text)`, `var(--color-text-muted)`, `var(--dur-base)`, `var(--ease-out)` — every var resolves to an existing token.

Pass.

## Pruned

- `index.html` inline `<script defer>` block carrying `slugify` + `stampSectionIds` + a per-page `kk:md-rendered` listener. The kit now owns slug logic + section-id stamping; the kit-level listener replaces the per-page one. Net delete: 33 lines.
- Each of the four consuming pages deletes its `<section class="nav-group">` blocks. Net delete across pages: 117 lines.
- Total deletion: ~150 lines. Net add (kit.js + style.css): ~210 lines. Mostly in kit.js for the generator + helpers; style.css adds 7 lines of selector extension.

## Maintainer proposals

Picked up by `kk-ds-maintainer` at session close.

1. **Version bump.** `package.json` 1.9.0 → 1.10.0. Minor (new behaviour, no breaking change to existing class API).
2. **CHANGELOG entry.** New `1.10.0` section under "Sidebar TOC auto-generation". Name the heading-rank rule, the `data-nav="manual"` opt-out, the four pages collapsed.
3. **Canon: `manifesto.md § Components § Sidebar`.** Add `nav-group__head` as a labeled modifier under the `nav-group` block. Note that the kit auto-fills the nav from rendered headings unless the consumer sets `data-nav="manual"`.
4. **Canon: `manifesto.md § Runtime` (or wherever kit.js public API is documented).** Mention that `KK.refresh()` now also rebuilds the sidebar TOC, and that kit.js auto-listens for `kk:md-rendered`.
5. **Integration doc.** `docs/integration/sidebar-nav.md` — new file. Document the heading-rank rule, the opt-out attribute, the bold-label-is-an-anchor expectation. The auto-nav is the first kit feature that emits structural HTML on the consumer's behalf; consumers need a doc to understand when to opt out and what the generated shape looks like.
6. **Asset cache-busting.** `index.html` carries `?v=1.3.0` on the CSS links. Bump to `?v=1.10.0` so the new `.nav-group > a.nav-group__head` rule lands on existing browsers without a hard reload. (Maintainer judgment whether this is worth the diff.)

## Hand-off

→ Stage 6b `kk-role-consistency-ds` (Dieter Rams, kit-pattern + token + grid + class resolution) and stage 6c `kk-role-voice-reviewer` (George Orwell, voice + AI-tells) running in parallel cold reads on the built artifacts. Stage 6a skipped per kit-internal review adaptation. Then stage 7 meta-reviewer.

Reviewer inputs: the four consuming HTMLs, `js/kit.js`, `style.css` (just the diff). No upstream context allowed.
