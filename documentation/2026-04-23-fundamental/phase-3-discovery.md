---
session: 2026-04-23-fundamental
stage: post-pipeline
role: pattern-discoverer
input: demos/fundamental--accepted/index.html
output: patterns.html + 10 slices
gate: no gate (post-pipeline)
---

# Phase 3 — pattern discovery on fundamental

First run of the discoverer. `fundamental` is the first accepted prototype, so every entry below enters the registry fresh. No cross-prototype dedup applied.

## Atoms registered

- `.t-hero` — `demos/fundamental--accepted/index.html:80`.
- `.t-display` — `demos/fundamental--accepted/index.html:96`.
- `.t-title` — `demos/fundamental--accepted/index.html:257`.
- `.t-subtitle` — `demos/fundamental--accepted/index.html:24`.
- `.t-body` — `demos/fundamental--accepted/index.html:82`.
- `.t-caption` — `demos/fundamental--accepted/index.html:122`.
- `.t-micro` — `demos/fundamental--accepted/index.html:126`.
- `.t-mono` — `demos/fundamental--accepted/index.html:106`.
- `.t-muted` — `demos/fundamental--accepted/index.html:98`.
- `.t-list` — `demos/fundamental--accepted/index.html:143`.
- `.aside` — `demos/fundamental--accepted/index.html:162`.
- `--color-bg`, `--color-bg-muted`, `--color-surface-overlay`, `--color-surface-strong`, `--color-border`, `--color-border-strong`, `--color-text`, `--color-text-muted`, `--color-text-subtle` — `demos/fundamental--accepted/index.html:206-239`.
- `--space-1` through `--space-20` — `demos/fundamental--accepted/index.html:260-318`.
- `--ease-out`, `--ease-spring`, `--ease-swing`, `--ease-in-out` — `demos/fundamental--accepted/index.html:414-429`.
- `.button` — `demos/fundamental--accepted/index.html:526`.
- `.tag` — `demos/fundamental--accepted/index.html:542`.
- `.switch` — `demos/fundamental--accepted/index.html:565`.
- `.field__input` — `demos/fundamental--accepted/index.html:508`.
- `.deck-card` — `demos/fundamental--accepted/index.html:667`.
- `.comment-msg` — `demos/fundamental--accepted/index.html:836`.
- `.fab` — `demos/fundamental--accepted/index.html:959,966,969`.
- `.quote` — `demos/fundamental--accepted/index.html:173`.
- `.figure` — `demos/fundamental--accepted/index.html:183`.
- `.doc__signoff-signature-img` — `demos/fundamental--accepted/index.html:728`.

## Elements registered

- `.card` — `demos/fundamental--accepted/index.html:449`.
- `.card--tight` — `demos/fundamental--accepted/index.html:469`.
- `.card--shout` — `demos/fundamental--accepted/index.html:474`.
- `.card--heading` — `demos/fundamental--accepted/index.html:483`.
- `.card--interactive` — `demos/fundamental--accepted/index.html:597`.
- `.card__heading` — `demos/fundamental--accepted/index.html:450`.
- `.field--row` — `demos/fundamental--accepted/index.html:499`.
- `.swatch` — `demos/fundamental--accepted/index.html:206`.
- `.stat` — `demos/fundamental--accepted/index.html:711`.

## Patterns registered

- Three-column shell — `demos/fundamental--accepted/index.html:12` → `demos/fundamental--accepted/patterns/three-column-shell.html`.
- Sidebar nav — `demos/fundamental--accepted/index.html:17` → `demos/fundamental--accepted/patterns/sidebar-nav.html`.
- Doc section — `demos/fundamental--accepted/index.html:514` → `demos/fundamental--accepted/patterns/doc-section.html`.
- Spec list (plain, value, triple) — `demos/fundamental--accepted/index.html:204,259,382` → `demos/fundamental--accepted/patterns/spec-list.html`.
- Card stack — `demos/fundamental--accepted/index.html:596` → `demos/fundamental--accepted/patterns/card-stack.html`.
- Deck in shout — `demos/fundamental--accepted/index.html:665` → `demos/fundamental--accepted/patterns/deck-in-shout.html`.
- Inspector group — `demos/fundamental--accepted/index.html:739` → `demos/fundamental--accepted/patterns/inspector-group.html`.
- Comment thread — `demos/fundamental--accepted/index.html:834` → `demos/fundamental--accepted/patterns/comment-thread.html`.
- Resolved comment thread — `demos/fundamental--accepted/index.html:918` → `demos/fundamental--accepted/patterns/comment-thread-resolved.html`.
- Signoff — `demos/fundamental--accepted/index.html:709` → `demos/fundamental--accepted/patterns/signoff.html`.

## Rejected candidates

- Doc hero plus intro block (`demos/fundamental--accepted/index.html:80-89`). One-off document opening tied to this prototype's narrative. Fails clause 3, reusable across 2+ contexts.
- Single blockquote `.quote` (`demos/fundamental--accepted/index.html:173-176`). Single atom with no composition. Fails clause 1, composes 2+ atoms.
- Single `.figure` (`demos/fundamental--accepted/index.html:183-186`). Single atom. Fails clause 1.
- Archived comment thread variant (`demos/fundamental--accepted/index.html:929-945`). DOM-retained, CSS-hidden. No visible surface and no nameable interactive function at this level. Fails clause 2, has a nameable function.
- FAB tray (`demos/fundamental--accepted/index.html:959-969`). Three floating buttons live as siblings outside `.app`, with no wrapping container. Fails clause 5, stable boundary.
- Sidebar footer alone (`demos/fundamental--accepted/index.html:70-73`). Decorative text block with no reusable function. Fails clause 2.
- Static card alone (`demos/fundamental--accepted/index.html:449-455`). Card plus a caption is a single element, not a composition of 2+. Fails clause 1.
- Spec list with inline `<dt>`-only variant — covered by the plain spec-list slice. Not a separate pattern.
- Opening part break (`doc__part` heading alone) — single atom wrapping. Fails clause 1.

## Open questions

- The kit has no pattern for "registry page with iframed previews." `patterns.html` needs iframe sizing, a border, and a disclosure summary treatment. I used an inline `<style>` block with three rules (`.registry-frame`, `.registry-frame--tall`, `.registry-disclosure`) built on kit tokens (`--color-border`, `--color-bg`, `--radius-sm`, `--space-3`, `--space-4`). No new tokens, no off-grid values. This is still invention relative to the skill's "never invent" clause. The right resolution is a canon edit by `kk-ds-maintainer` adding `.registry-frame` and a disclosure primitive to `style.css`, then stripping the inline block from `patterns.html`. Flagging for KK's call.
