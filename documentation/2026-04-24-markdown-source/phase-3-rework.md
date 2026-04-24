---
session: 2026-04-24-markdown-source
stage: phase-3-rework
role: ds-maintainer
input: proposals/2026-04-24-retro.md — proposals 1, 2, 4, 5, 6 accepted
output: index.html shell rework + manifesto canon additions + 1.3.0 release
gate: screenshots clean, sidebar carries one structure, signoff version + date only, manifesto carries shell-chrome rule + ship-check bullet, package.json + plugin.json at 1.3.0, one commit on main — NOT tagged
---

# Phase 3 rework — retro-driven shell cleanup before v1.3.0 tag

Didion's whole-initiative retro at `proposals/2026-04-24-retro.md` named seven proposed changes. The user accepted five (1, 2, 4, 5, 6) for this maintainer pass. Proposal 3 (full removal of `components.md` stub) is deferred to a v2.0.0 session. Proposal 7 (rollback Phase 3) turned out not to be needed — option (b), rework Phase 3 in place, landed cleanly.

## Raw input

> [User acceptance of retro proposals 1, 2, 4, 5, 6 for a single maintainer pass before shipping v1.3.0. Proposal 3 and Proposal 7 deferred.]

Proposals executed verbatim from `proposals/2026-04-24-retro.md`.

## Per-proposal — before / after

### Proposal 1 — Delete pointer-card subtitles

**Canon target.** `index.html` six `<article class="doc__section" id="inv-*">` blocks.

**Before.** Each pointer card wrapped in:

```html
<article class="doc__section" id="inv-components">
  <h2 class="t-display">
    Components<br />
    <span class="t-display--medium t-muted">Nine in the kit</span>
  </h2>
  <div class="card">
    <div class="card__heading">
      <h3 class="t-title">Components</h3>
      <p class="t-caption">Nine components cover most SAAS flows; ...</p>
    </div>
    <a class="button button--primary t-subtitle" href="...">Open fundamental</a>
    ...
  </div>
</article>
```

**After.** Outer `<h2 class="t-display">...<span class="t-display--medium t-muted">Subtitle</span></h2>` removed on all six blocks. Card heading (h3), caption, button, footnote unchanged.

**Six subtitles deleted.** *Nine in the kit*, *Registry at the repo root*, *Eight stages, eleven roles*, *Values and swatches*, *Evolve here, inventory out*, *The maintainer skill owns it*.

**First-scroll rank step.** Before: part (66 px) → display (38 px) → display-medium (38 px muted) → card title (22 px). Four ranks in the first viewport. After: part (66 px) → card title (22 px). One step.

### Proposal 2 — Rewrite signoff stats structural

**Canon target.** `index.html` `.doc__signoff-stats` block.

**Before.** Four count stats across two `.stat` children:

```
12 top-level sections across Meanings, Matter, Protocols.
9 components in the kit, enough to cover most SAAS flows.
9 color tokens, and not one more. No brand, no status color.
4 radii: 12, 16, 24, and 9999 for pills.
```

**After.** Two structural stats, one `div` per stat, no `<span class="t-caption--bold">` numeral prefix:

```
Signed, kit v1.3.0.
24 April '26, Tbilisi.
```

Rule `manifesto.md § Components § Signoff` — "two or four .stat children are valid shapes — never three" — preserved. The index uses two.

### Proposal 4 — Collapse sidebar duplicates

**Canon target.** `index.html` sidebar nav groups.

**Before.** Seven groups: Inventory (4 items: Components, Patterns, Pipeline, Foundations) + Distribution (2 items: Where it lives, Install and ship) + Meanings + Principles + Matter (Foundations, Components, Runtime) + Protocols + Surfaces. Components and Foundations each appeared twice — once under Inventory (pointer-card anchor) and once under Matter (manifesto-rendered anchor).

**After.** Five groups: Meanings + Principles + Matter + Protocols + Surfaces. Pointer-card nav groups (Inventory, Distribution) dropped entirely. The sidebar carries one structure: the manifesto's rendered TOC. Pointer cards remain reachable by scrolling to the top of the doc.

Sidebar-banner comment rewritten to match — the prior comment said "The Inventory + Distribution groups point at hand-written pointer cards; the other groups point at sections wrapped out of manifesto.md at render time." New comment names the one-structure contract.

### Proposal 5 — Shell-chrome rule in manifesto § Typography rhythm

**Canon target.** `skills/kk-design-system/manifesto.md § Foundations § Typography rhythm`.

**Placement.** Appended after the raw-HTML-caption addendum, immediately before `### Radii`. One paragraph, one rule.

**Text.**

> Shell chrome does not compete with rendered content for heading rank. A page that carries markdown via `data-md-src` must either drop all shell-owned h1/h2/doc__part headings and let the markdown carry the full hierarchy (offset=0), or reserve higher ranks for the shell and set offset to match the depth already claimed. Two heading stacks on one scroll is the canonical hierarchy-collapse failure mode.

### Proposal 6 — Shell-dup ship-check in manifesto § Ship discipline

**Canon target.** `skills/kk-design-system/manifesto.md § Ship discipline`.

**Placement.** Appended to the verification bullet list, after the "regression routes back to phase owner" bullet, before the `### Bundle rule` sub-heading.

**Text.**

> **Before shipping a markdown-rendered page, grep the shell for every claim the rendered content also carries.** A page that carries pointer-card copy, nav labels, or signoff stats that restate facts from the rendered body fails the one-home rule on ship. Remove shell-side claims or migrate them to the rendered source.

## Judgement calls

1. **CHANGELOG reshape.** The prior `## 1.2.0 — 2026-04-23` entry had absorbed a 1.3.0-unreleased block for the Phase 2b prose migration and the Phase 3 rewire. A 1.3.0 release block never existed at the top of the file. The reshape extracts the 1.3.0-unreleased content into a new `## 1.3.0 — 2026-04-24` entry above the 1.2.0 entry, adds Added/Fixed/Moved/Open sections covering the retro-rework (proposals 1, 2, 4, 5, 6), and removes the 1.3.0-unreleased block from the 1.2.0 entry. The 1.2.0 entry retains its own Open bullet for `patterns.html` not-yet-created. Did not re-tidy the 1.2.0 entry beyond removing the 1.3.0 bleed — scope was extraction, not 1.2.0 rewrite.

2. **Sidebar comment block.** Dropped the sentence that said "The Inventory + Distribution groups point at hand-written pointer cards." Kept the comment as a short banner naming that the TOC is hand-curated and carries one structure. The banner was about what the sidebar does — post-rework it does one thing, the comment says so.

3. **Screenshot capture.** `retro-rework-full.png` captured at 40000 px viewport to reach the signoff; the rendered markdown is ~35000 px tall. The file is ~4.5 MB. `retro-rework-viewport.png` at 1440 × 900 for the first-scroll check. Both inside the documentation/screenshots folder.

4. **Version bump.** Both `package.json` and `.claude-plugin/plugin.json` from 1.2.0 to 1.3.0 in lockstep. The retro rework is additive canon (two rules to the manifesto) plus a shell cleanup (no consumer class renamed, no component dropped); minor bump fits.

## Verification

### Console
Dumped DOM via headless Chrome (`--virtual-time-budget=3000`) — the manifesto renders (18 matches for "Manifesto/manifesto"), 20 `doc__section` elements (6 pointer cards + 14 wrapped manifesto sections), 5 `nav-group` elements in the sidebar, 3 `doc__signoff-stats` references (two in rendered manifesto example block, one in the live signoff). No `[ERROR]` or `[WARNING]` surfaced from the page's own scripts.

### Visual (first scroll)
`retro-rework-viewport.png` (1440 × 900): sidebar reads *Meanings / Principles / Matter / Protocols / Surfaces* — no duplicate *Components* or *Foundations*. Main column opens with *Inventory* (part, 66 px), then the *Components* card heading (22 px). No subtitle between them. One rank step.

### Visual (signoff)
Bottom of `retro-rework-full.png` (crop at y=34500): *Signed, kit v1.3.0.* and *24 April '26, Tbilisi.* in two stat columns. Byline below reads *Signed by Konstantin Konstantinopolskii, founder at kk.consulting / 24 April '26 at 12:00 Tbilisi Time.* Signature SVG renders right of the byline.

### Visual (full)
`retro-rework-full.png` at 40000 px: six pointer cards in the Inventory + Distribution part blocks render without subtitles. Manifesto hero (Manifesto, t-hero) opens the rendered body. Twelve rendered manifesto top-level sections follow. Signoff closes the doc.

## Screenshots

- `screenshots/retro-rework-viewport.png` — first-scroll check, 1440 × 900.
- `screenshots/retro-rework-full.png` — full page, 1440 × 40000, signoff visible at page bottom.

## Bundle

Files touched in this pass:

- `index.html` — pointer-card subtitles dropped, signoff stats rewritten, sidebar trimmed to five nav groups, sidebar-banner comment rewritten.
- `skills/kk-design-system/manifesto.md` — shell-chrome rule added to §Typography rhythm; shell-dup ship-check bullet added to §Ship discipline. Hardlink to `.claude/skills/kk-design-system/manifesto.md` verified intact (directory symlink resolves both paths to same file).
- `package.json` — version 1.2.0 → 1.3.0.
- `.claude-plugin/plugin.json` — version 1.2.0 → 1.3.0.
- `CHANGELOG.md` — new `## 1.3.0 — 2026-04-24` entry above 1.2.0; 1.3.0-unreleased block extracted from the 1.2.0 entry into the new 1.3.0 entry.
- `documentation/2026-04-24-markdown-source/phase-3-rework.md` — this doc.
- `documentation/2026-04-24-markdown-source/screenshots/retro-rework-viewport.png` + `retro-rework-full.png`.

## Gate

- index.html has no pointer-card subtitles. Pass.
- Signoff shows version + date, no counts. Pass.
- Sidebar has no duplicate entries. Pass.
- manifesto §Typography rhythm carries the shell-chrome rule. Pass.
- manifesto §Ship discipline carries the shell-dup ship-check. Pass.
- `package.json` + `.claude-plugin/plugin.json` at 1.3.0. Pass.
- CHANGELOG reshaped into a 1.3.0 release entry. Pass.
- Screenshots captured, console clean. Pass.

**Pushed to origin main. Not tagged.** Tag + tag-push run after user verifies this commit on main.
