---
session: 2026-04-24-content-architecture
stage: 3b
role: designer
pattern-block: patterns
input: documentation/2026-04-24-content-architecture/02-design-director.md §Pattern blocks §2. patterns + 03a-fresh-eyes-pre-patterns.md
output: full draft prose for canon/patterns.md — pattern-first reading order entry point, three top-level patterns + 11-row registry
gate: pending — feeds stage 3c fresh-eyes post-designer
---

Stage 3b hand-off for the patterns book. Character: Susan Kare — pixel-honest, state-thoughtful. Every question in the 3a list answered in full. Draft prose for `canon/patterns.md` written end to end below under §Example content.

## Raw input

### Pattern block §2. patterns (from 02-design-director.md verbatim)

> ### 2. patterns
>
> **Intent.** Compose-first entry point. Three top-level patterns (three columns, card stack, narrow mobile) plus the registry table absorbing the 11 patterns from the deleted root `patterns.html`. Each top-level pattern carries a pointer paragraph + HTML snippet + preview-frame deep link.
>
> **Guardrails.**
> - Absorbs `patterns.html`. Root file deletes in stage 5.
> - Preview-frame pointers go into `demos/fundamental--accepted/patterns/<slug>.html`. File slug matches pattern name.
> - No component-level HTML — pattern-level composition only.
> - Registry table uses `registry-table` primitive verbatim.
>
> **Expected kit surface.** `.book` wrapper, registry-table, preview-frame (embedded HTML), t-hero, t-display, t-title, t-body, t-caption.

### 16 questions from 03a-fresh-eyes-pre-patterns.md verbatim

1. Which pattern for what I'm building — decision tree, table, or headings?
2. Pattern vs component distinction at 0.2s.
3. Preview visible at a glance, or click-to-see?
4. Preview-frame click — in-page, new tab, navigate?
5. HTML snippet copy-paste — standalone, or needs surrounding markup?
6. Drill from pattern to component — direct link, or search?
7. Registry table size — one screen, many?
8. Opening question match — "which shell / stack / recipe?"
9. Reading flow — prior step was manifesto; next step is pick + copy?
10. Catalogue vs decision tree?
11. Three top-level vs 11 registry — canonical vs supplementary, or peers?
12. Narrow-mobile — pattern or responsive variant?
13. Root patterns.html absorbed — old URL handling?
14. Preview-frame slug missing on disk — broken link or empty preview?
15. Strategy-doc pattern obvious at 0.2s?
16. Three-columns visible as the default / most-used?

## Question-to-answer map

**Q1 — Which pattern for what I'm building: decision tree, table, or headings?**
Headings for the three top-level patterns, table for the 11 in the registry. The three headings are the default answer: most compositions start with a shell, a stack, or a narrow layout. The registry table is the long tail. Jobstory line at the top of the book names the decision out loud — "when composing any layout, start here" — so the reader lands on three big headings, not a tree.

**Q2 — Pattern vs component distinction at 0.2s.**
The jobstory line carries it: "drill into components.md when a pattern uses a part we need to customize." Pattern = composition of two or more parts with a nameable function. Component = the part itself. The deep link under each top-level pattern points at a composition preview; every `.card`, `.sidebar`, `.t-body` inside the snippet points at components.md via the reader's existing nav, not via inline links (that would over-link). 0.2s test passes because the book opens on composition-scale examples — shell, stack, narrow — not on single-class rows.

**Q3 — Preview visible at a glance, or click-to-see?**
Click-to-see for the full live preview. Each top-level pattern carries an HTML snippet inline (visible at a glance — reader sees structure before clicking), plus a preview-frame deep link that opens the live slice. No thumbnails inside the markdown itself — the kit does not carry image previews in canon files. The snippet + filename is the glance-level signal; the live iframe is the click-level payoff.

**Q4 — Preview-frame click — in-page, new tab, navigate?**
Navigate in-page. The deep link is a standard anchor to `demos/fundamental--accepted/patterns/<slug>.html`. The rendered kit (index.html at root) may later intercept these to open in the inspector column; for canon file purposes, the link is the source of truth. No `target="_blank"` on canon deep links — they behave like any intra-kit link.

**Q5 — HTML snippet copy-paste — standalone, or needs surrounding markup?**
Needs the kit's CSS loaded. The snippet is a self-contained composition; every class inside it is a kit class and works as-is once `style.css` + `vars.css` are on the page. Snippets do not carry `<html>`, `<head>`, or `<link>` — those are assumed. Each snippet is wrapped in the minimum root the pattern needs (for three columns that's `<div class="app" data-view="doc">`; for narrow mobile that's the same, the responsive breakpoint does the rest).

**Q6 — Drill from pattern to component — direct link, or search?**
One pointer at the jobstory line, no inline links inside the snippet. The reader navigates to components.md the way they arrived here — via the inspector column at the kit root, which carries pointer cards to every canon file. Inlining dozens of `.card` → `components.md#card` links per snippet would out-shout the snippet itself. Reading order: patterns.md first, components.md second when needed.

**Q7 — Registry table size — one screen, many?**
Eleven rows. Fits in one desktop screen, may take a scroll on narrow. Section header `## Registry of additional patterns` sits above it so the reader knows what they are reading. Two columns: name + one-line role. Links on the name column open the slice; no preview thumbnails — the table is the catalogue, not the exhibit.

**Q8 — Opening question match — "which shell / stack / recipe?"**
"Which shell" maps to §Three columns. "Which stack" maps to §Card stack. "Which narrow" maps to §Narrow mobile. Any "which recipe" question past those three goes to the registry table. Three top-level headings carry the three most-asked opening questions; the table catches the rest.

**Q9 — Reading flow — prior step was manifesto; next step is pick + copy?**
Yes. Manifesto §Navigation points the reader to patterns.md first. patterns.md opens on the jobstory line, then the three top-level compositions with copy-ready snippets. Reader picks a pattern, copies the snippet, drills to components.md only if they need to swap a part. Signoff at the bottom closes the book.

**Q10 — Catalogue vs decision tree?**
Catalogue of three plus a registry of eleven. Not a decision tree. The three top-level patterns are ranked by frequency, not by branching logic — the reader already knows whether they need a shell, a stack, or a narrow layout by the time they open the book.

**Q11 — Three top-level vs 11 registry — canonical vs supplementary, or peers?**
Three top-level are **load-bearing**: they describe the shell of every kit surface. Eleven in the registry are **reusable**: they are compositions that appear in more than one product but not every one. Different visual weight matches different role. Top-level: full heading, pointer paragraph, snippet, deep link. Registry: one row each, no snippet, link only. Jobstory line sets the hierarchy: "start with the three. Drill into the registry when the three don't cover the case."

**Q12 — Narrow mobile — pattern or responsive variant?**
Pattern. It has its own composition rules (doc as single column, sidebar collapses to hamburger, inspector slides over as a modal). The breakpoint is part of the pattern, not a variant applied to the three-column shell. Top-level billing because it is the only shell that answers "what does the kit look like below 800px" — as load-bearing as three columns, just for a different viewport.

**Q13 — Root patterns.html absorbed — old URL handling?**
Out of scope for canon/patterns.md. Stage 5 (design engineer) handles the mechanical delete of the root file. If a future session needs redirects, that is a separate protocol decision. The canon file does not reference the old URL.

**Q14 — Preview-frame slug missing on disk — broken link or empty preview?**
Broken link — standard 404 behaviour. No graceful fallback, no empty preview placeholder. Missing slug is a ship-check failure, caught at stage 6 (consistency audit). All 11 slugs currently exist on disk: `card-stack.html`, `three-column-shell.html`, `sidebar-nav.html`, `doc-section.html`, `spec-list.html`, `deck-in-shout.html`, `inspector-group.html`, `comment-thread.html`, `comment-thread-resolved.html`, `comments-group.html`, `signoff.html`.

**Inventory check flag — filename mismatch.** The direction doc §Per-canon-file content structure writes the preview pointer for three columns as `demos/fundamental--accepted/patterns/three-columns.html`. The file on disk is `three-column-shell.html`. Two resolutions: (a) rename the disk file, or (b) keep the disk filename and point the canon deep link at it. Recommending (b) — the disk filename existed first and is referenced from root `patterns.html` today; rename risks breaking the existing pattern card. Draft prose below uses `three-column-shell.html`. Flagging for stage 7 meta-review.

**Q15 — Strategy-doc pattern obvious at 0.2s?**
Not present in the registry and should not be. Per 01-analyst.md §File structure, `skills/kk-design-system/patterns/strategy-doc.md` was moved out of the kit — it is a product-deliverable recipe, not kit canon. Future home: a strategy prototype under `demos/`. When that prototype ships and the pattern-discoverer carves a slice from it, the slice gets a registry row in `canon/patterns.md`. Until then, the book has no strategy-doc entry.

**Q16 — Three-columns visible as the default / most-used?**
Yes. §Three columns is the first section after the jobstory, parenthetical `(default shell)` in the heading to name the status out loud. It occupies the top of the reading column. Card stack follows, then narrow mobile. Visual hierarchy = reading order = frequency of use.

## Example content

Full draft prose for `canon/patterns.md` below. Pattern-first reading order. `.book` wrapper assumed at render time by the index.html shell; canon markdown writes section headings and HTML snippets without nesting its own `.book` div.

```markdown
# Patterns

When composing any layout, start here. Three top-level patterns carry the shells every kit surface uses. Drill into `components.md` when a pattern uses a part we need to customize.

## Three columns (default shell)

Sidebar on the left, book in the middle, inspector on the right. Only the middle column scrolls during reading. This is the shell every kit canon file renders inside. Use it for any surface where the reader needs a map, a primary reading surface, and a margin for actions or references.

```html
<div class="app" data-view="doc">
  <aside class="sidebar" aria-label="Navigation">
    <nav class="sidebar__nav">
      <!-- scroll-spy TOC of the current book -->
    </nav>
  </aside>

  <main class="book" id="doc">
    <!-- rendered prose; t-hero, t-display, t-title, t-body -->
  </main>

  <aside class="inspector" aria-label="References">
    <!-- pointer cards, comments, actions -->
  </aside>
</div>
```

Preview: [demos/fundamental--accepted/patterns/three-column-shell.html](../demos/fundamental--accepted/patterns/three-column-shell.html)

## Card stack

Interactive cards stacked vertically. One active at a time. Inactive cards collapse to heading plus minimized CTA; the active card shows its body and both CTAs. Use it wherever the reader picks one option out of a small group and needs to see every option without losing context.

```html
<div class="card-stack">
  <div class="card card--interactive card--selectable" data-state="active">
    <div class="card__heading">
      <h3 class="t-title">Option one</h3>
      <p class="t-caption">One-line description of this option.</p>
    </div>
    <div class="card__body">
      <!-- full body when active -->
    </div>
  </div>

  <div class="card card--interactive card--selectable">
    <div class="card__heading">
      <h3 class="t-title">Option two</h3>
      <p class="t-caption">One-line description of this option.</p>
    </div>
  </div>
</div>
```

Preview: [demos/fundamental--accepted/patterns/card-stack.html](../demos/fundamental--accepted/patterns/card-stack.html)

## Narrow mobile

Below ~800px. The book column goes full width. The sidebar collapses behind a hamburger. The inspector slides over as a modal sheet. Not a variant of three columns — a distinct pattern with its own composition rules, invoked by the breakpoint.

```html
<div class="app" data-view="doc">
  <aside class="sidebar sidebar--collapsed" aria-label="Navigation">
    <button class="button button--icon" aria-label="Open navigation">
      <!-- hamburger -->
    </button>
  </aside>

  <main class="book" id="doc">
    <!-- full-width reading -->
  </main>

  <aside class="inspector inspector--modal" aria-hidden="true">
    <!-- slides over when opened -->
  </aside>
</div>
```

Preview: [demos/fundamental--accepted/patterns/narrow.html](../demos/fundamental--accepted/patterns/narrow.html)

## Registry of additional patterns

Eleven compositions sliced out of shipped prototypes. Each row points at a live preview. Drill into `components.md` for the individual parts.

<table class="registry-table">
  <thead>
    <tr>
      <th scope="col" class="t-caption">Pattern</th>
      <th scope="col" class="t-caption">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="t-body"><a href="../demos/fundamental--accepted/patterns/three-column-shell.html"><span class="t-mono">three-column-shell</span></a></td>
      <td class="t-body">Sidebar, book, inspector. The default kit shell, full slice.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../demos/fundamental--accepted/patterns/card-stack.html"><span class="t-mono">card-stack</span></a></td>
      <td class="t-body">Interactive cards stacked vertically. One active, others minimized.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../demos/fundamental--accepted/patterns/sidebar-nav.html"><span class="t-mono">sidebar-nav</span></a></td>
      <td class="t-body">Grouped nav items with a scroll-spy indicator tracking the active section.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../demos/fundamental--accepted/patterns/doc-section.html"><span class="t-mono">doc-section</span></a></td>
      <td class="t-body">Display heading, body paragraph, one example card.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../demos/fundamental--accepted/patterns/spec-list.html"><span class="t-mono">spec-list</span></a></td>
      <td class="t-body">Key and description rows. Three variants: plain, value, triple.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../demos/fundamental--accepted/patterns/deck-in-shout.html"><span class="t-mono">deck-in-shout</span></a></td>
      <td class="t-body">Horizontal deck of cards fanned in perspective, set on a shout surface.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../demos/fundamental--accepted/patterns/inspector-group.html"><span class="t-mono">inspector-group</span></a></td>
      <td class="t-body">Heading card above a stack of interactive cards inside the right-hand column.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../demos/fundamental--accepted/patterns/comment-thread.html"><span class="t-mono">comment-thread</span></a></td>
      <td class="t-body">Preview of first and last messages; full thread and reply field in the collapsible.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../demos/fundamental--accepted/patterns/comment-thread-resolved.html"><span class="t-mono">comment-thread-resolved</span></a></td>
      <td class="t-body">Minimized preview with a check stamp, snippet, and byline.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../demos/fundamental--accepted/patterns/comments-group.html"><span class="t-mono">comments-group</span></a></td>
      <td class="t-body">Inspector section with the Comments heading above open, resolved, and archived threads.</td>
    </tr>
    <tr>
      <td class="t-body"><a href="../demos/fundamental--accepted/patterns/signoff.html"><span class="t-mono">signoff</span></a></td>
      <td class="t-body">Stat pairs on the left rail; byline and signature on the right.</td>
    </tr>
  </tbody>
</table>

## Signoff

<div class="book__signoff">
  <div class="book__signoff-stats">
    <!-- stats -->
  </div>
  <div class="book__signoff-signature">
    <!-- byline + handwritten signature -->
  </div>
</div>
```

## UI copy drafts

Every visible string in the draft. Voice canon: sentence case, short, factual, no AI tells.

- Book title: **Patterns**
- Jobstory line: **When composing any layout, start here. Three top-level patterns carry the shells every kit surface uses. Drill into `components.md` when a pattern uses a part we need to customize.**
- Section heading 1: **Three columns (default shell)**
- Section 1 pointer paragraph: **Sidebar on the left, book in the middle, inspector on the right. Only the middle column scrolls during reading. This is the shell every kit canon file renders inside. Use it for any surface where the reader needs a map, a primary reading surface, and a margin for actions or references.**
- Section 1 preview label: **Preview:**
- Section heading 2: **Card stack**
- Section 2 pointer paragraph: **Interactive cards stacked vertically. One active at a time. Inactive cards collapse to heading plus minimized CTA; the active card shows its body and both CTAs. Use it wherever the reader picks one option out of a small group and needs to see every option without losing context.**
- Section heading 3: **Narrow mobile**
- Section 3 pointer paragraph: **Below ~800px. The book column goes full width. The sidebar collapses behind a hamburger. The inspector slides over as a modal sheet. Not a variant of three columns — a distinct pattern with its own composition rules, invoked by the breakpoint.**
- Section heading 4: **Registry of additional patterns**
- Section 4 pointer paragraph: **Eleven compositions sliced out of shipped prototypes. Each row points at a live preview. Drill into `components.md` for the individual parts.**
- Registry table header, column 1: **Pattern**
- Registry table header, column 2: **Role**
- Registry row roles: eleven short descriptions listed verbatim in the table above.
- Section heading 5: **Signoff**

Count: 23 strings drafted (one book title, one jobstory, five section headings, four pointer paragraphs, one preview label, two table headers, eleven registry row roles minus one duplicate book-level heading = 23 unique author-written strings, plus eleven table row roles and three aria-labels reused from the kit).

Aria labels reused (not drafted — kit canon):
- `aria-label="Navigation"` on sidebar
- `aria-label="References"` on inspector
- `aria-label="Open navigation"` on narrow hamburger button
- `aria-hidden="true"` on narrow inspector (initial state)

## Component list

Every class referenced in the draft. No inventions.

- `.book` — middle-column wrapper; carries Tier-2 adjacency rules for rendered prose
- `.book__signoff` — signoff block at the end of the book (renamed from `.doc__signoff`)
- `.app` — three-column shell root; `data-view="doc"` selects the default shell layout
- `.sidebar` — left column; nav host
- `.sidebar--collapsed` — narrow-mobile state; hamburger only
- `.sidebar__nav` — scroll-spy TOC inside the sidebar
- `.inspector` — right column; reference and action host
- `.inspector--modal` — narrow-mobile state; slides over as a sheet
- `.preview-frame` — scaled-iframe container (referenced in pointer prose; not rendered inline in the canon markdown itself)
- `.preview-frame__iframe` — scaled iframe (400% width/height, 0.25 scale)
- `.registry-table` — inventory table primitive; resets browser table defaults
- `.card` — static card surface
- `.card--interactive` — card with collapsible body and two CTAs
- `.card--selectable` — click-to-select state affordance paired with interactive cards
- `.card__heading` — title plus optional caption block inside a card
- `.card__body` — body revealed when a card is active
- `.card-stack` — vertical wrapper for interactive cards (Tier-1 widget, exists in kit)
- `.button` — secondary default; primary for commits
- `.button--icon` — square button for icon-only affordances (narrow hamburger)
- `.t-hero` — document title size (not used in this block but reserved for renderer)
- `.t-display` — section heading size (reserved for renderer; markdown `##` maps to it)
- `.t-title` — card heading size
- `.t-body` — body text inside registry-table cells
- `.t-caption` — UI label inside registry-table header cells, inside `.card__heading` captions
- `.t-mono` — inline monospace for pattern names in the registry

Every class above is already in the kit. No new classes proposed.

## Gate

Pending. Stage 3c (fresh-eyes post-designer) runs next — verifies every 3a question is answered. Flagged filename mismatch (`three-columns.html` in direction doc vs `three-column-shell.html` on disk) sent to stage 7 meta-review.

## Hand-off

`kk-role-fresh-eyes-jobstory` in post-designer mode. Input: 03a-fresh-eyes-pre-patterns.md + this file. Expected output: answered/unanswered audit across all 16 questions plus the flagged filename mismatch.
