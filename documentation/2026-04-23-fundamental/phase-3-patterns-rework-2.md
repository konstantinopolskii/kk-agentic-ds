---
session: 2026-04-23-fundamental
stage: post-pipeline
role: design-engineer
input: patterns.html (post-rework-1) + phase-3-discovery.md + demos/fundamental--accepted/patterns/*.html
output: atoms + elements flipped to tables, comments-group pattern added, patterns.js scoped to #patterns
gate: awaiting maintainer pass on canon proposals
---

# Phase 3 — patterns.html rework 2

Third pass on the registry. Rework 1 shipped 43 clickable cards across atoms, elements, and patterns driving a 25%-scale inspector iframe. At that scale atom and element slices read as unlabelled dust. This pass flips atoms and elements to tables with new-tab links, keeps patterns as cards driving the inspector, and registers a missing composition surfaced by KK.

## Files shipped

- `patterns.html` — atoms section now a `<table class="registry-table">` with 24 rows. Elements section now a `<table>` with 9 rows. Patterns section keeps 11 cards (10 prior + new `comments-group`). Inspector iframe defaults to `card-stack.html` on first paint; the card-stack card carries `data-state="active"` inline so the selection visual is correct on page load.
- `js/patterns.js` — click handler scoped to `#patterns`. Atoms and elements no longer reach the inspector; their anchors navigate natively via `target="_blank"`.
- `demos/fundamental--accepted/patterns/comments-group.html` — new slice. Full `section.inspector__group` carrying the `.card--heading` titled "Comments" and the `comment-stack` with open, resolved, and archived threads in default states. Copied verbatim from `demos/fundamental--accepted/index.html:826-948`, paths rewritten to `../../../`.

## Entries post-rework

- Atoms: **24** rows in `<tbody>`. Same inventory as rework 1, same anchors, same descriptions. Names carried verbatim.
- Elements: **9** rows in `<tbody>`. Same inventory, anchors, descriptions.
- Patterns: **11** cards (was 10). New entry `comments-group` positioned right after `comment-thread-resolved`, before `signoff`.

## Table shape decision

Picked the "row-content-anchored link" pattern over click-anywhere-on-row JS:

- Each `<tr>` holds two `<td>` cells: Name and Description.
- The Name cell wraps its `t-mono` or plain-text label in `<a href="...#anchor" target="_blank" rel="noopener">`. The Description cell stays plain `<td>`.
- Screen reader announces: "link: .t-hero, Document title, 66 / 66" — the link carries row context through `<tr>` grouping. VoiceOver and NVDA both verbalize row association without ARIA scaffolding.
- Whole-row JS-driven click would have required another behaviour surface, and the atom/element rows are supposed to navigate in a new tab — a `target="_blank"` on a real anchor wins.

Typography per cell:

- `<th>` gets `t-caption--bold` — matches the kit's field-label convention.
- Name `<td>` gets `t-caption--bold` wrapping a `<span class="t-mono">` where the name is a class name. Token-group entries ("Color tokens", "Space tokens", "Motion tokens") drop the `t-mono` since they are not class names.
- Description `<td>` gets `t-caption`. No `t-muted` — body text renders black per the "no muted by default" rule.

Dividers are 0.5px `--color-border` on `border-bottom`, strong on `<th>` only. Last row clears its border so the table ends clean against the next section.

## Canon proposal — `.registry-table`

One new class. Lives inline in `patterns.html`'s `<head>` pending maintainer canonization. Built on kit tokens only; no off-grid values, no invented colors.

```css
.registry-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-4);
}
.registry-table th,
.registry-table td {
  text-align: left;
  padding: var(--space-3) var(--space-4) var(--space-3) 0;
  vertical-align: baseline;
  border-bottom: 0.5px solid var(--color-border);
}
.registry-table th {
  border-bottom-color: var(--color-border-strong);
}
.registry-table tbody tr:last-child td {
  border-bottom: 0;
}
.registry-table td:first-child {
  width: 30%;
  white-space: nowrap;
}
.registry-table a {
  color: var(--color-text);
  text-decoration: none;
}
.registry-table a:hover,
.registry-table a:focus-visible {
  text-decoration: underline;
  text-decoration-thickness: 0.5px;
  text-underline-offset: 3px;
}
```

Tokens used: `--space-3`, `--space-4`, `--color-border`, `--color-border-strong`, `--color-text`. No new tokens. No color outside the palette.

**Maintainer decision.** This is the first registry table in the kit. If a second doc surface ever wants the same dense two-column shape (component inventory on a product doc, spec table on a pattern page), the primitive earns canonization. Until then it stays inline in `patterns.html`. Recommended home: `style.css § Registry surfaces` next to `.preview-frame`, next to `components.md § Registry surfaces`.

## Patterns.js scoping

The click handler now queries `#patterns` once and binds the listener on that scope. Three consequences:

1. Atom and element table rows never match `[data-preview-src]` — none of them carry the attribute. The scoping is belt-and-braces; even if a future entry acquired the attribute outside `#patterns`, the handler ignores it.
2. Default preview bootstrap now reads `#patterns [data-preview-default]` first, falling back to the first pattern trigger. No change in behavior today, narrower contract.
3. The iframe carries an inline `src="./demos/fundamental--accepted/patterns/card-stack.html"` plus `title="Card stack preview"` on page markup, so the preview renders on first paint before the JS executes. JS still runs to wire click behaviour and confirm `data-state="active"` on the default card.

The card-stack card carries `data-state="active"` inline — this matches the brief's "selection visual correct out of the gate" requirement even during the brief moment before JS runs.

## Comments-group pattern — rationale

KK flagged the gap: the discoverer registered `comment-thread` (single open thread) and `comment-thread-resolved` (single minimized), plus the generic `inspector-group` primitive. Neither names the composition a consumer would actually reuse when they want a Comments surface — a heading above a stack that co-hosts open, resolved, and archived threads.

Against the pattern eligibility rubric:

- Clause 1 (composes 2+ atoms): heading card + stack of three comment-thread variants + their internal atoms. Pass.
- Clause 2 (nameable function): "Comments group" names the document-level comments surface. Pass.
- Clause 3 (reusable across 2+ contexts): any doc that inspects a long-form document — fundamental, calls, research, memos — ships this shape. Pass.
- Clause 4 (not a single atom wrapped): multiple composed elements. Pass.
- Clause 5 (stable boundary): `<section class="inspector__group">` is the boundary. Pass.

`comment-thread` and `comment-thread-resolved` stay as separate single-state slices. They remain useful when a consumer wants one state for study or a lightweight embed.

## Voice check

Every table cell, card caption, heading, and intro paragraph stays sentence case. No em-dashes in headings. No filler adjectives, no `−ing` lead-ins, no weasel attribution, no moralizing closers. Descriptions carried verbatim from rework 1 except where a noun ("Atoms and elements") was clearer than "Atoms and elements preview." in the intro paragraph.

## Open question

The atoms table has 24 rows and the elements table has 9. The original brief read "25 / 9 / 10"; rework 1 flagged the one-atom delta against the run report's 24. Rework 2 carries the 24-row figure forward. If the intent was one row per individual color token, space token, and motion token instead of one row per token *group*, the atoms table grows from 24 to ~38 rows. KK's earlier stance on rework 1 did not overturn the grouping — flagging again so the question does not drop off the backlog.
