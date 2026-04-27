---
session: 2026-04-27-auto-sidebar-nav
stage: 7
role: meta-reviewer
input: 01-analyst.md, 05-design-engineer.md, 06b-consistency-ds.md, 06c-voice.md, built artifacts
output: FAIL on rubric item 5 (AI-tells) due to pre-existing Title Case heading; all session-deliverable items pass
gate: returns to user for reiterate path (a) fix or (b) named exception
---

# Meta-reviewer — auto sidebar nav

Strict rubric. Six items + one adapted (kit-internal). Five pass with evidence; one fails on a pre-existing string the session inherited; one is N/A per the recipe adaptation.

## Verdict

**FAIL**

The session's own deliverable is clean. The failure is on `index.html:20` where the manifesto sidebar header `Agentic Design System` renders Title Case, which `voice.md § No AI tells` explicitly forbids. The string is pre-existing, not introduced this session, and the user has two reiterate-protocol paths to close: fix (a) or stamp as named exception (b).

## Rubric result

### 1. Analyst open-questions answered

PASS. Eight locked decisions in `01-analyst.md § Locked decisions`. Each resolves to shipping code:

| # | Decision | Evidence |
|---|---|---|
| 1 | Section unit = `.book > article.book__section` | `js/kit.js:1972-1974` `book.querySelectorAll(':scope > article.book__section')` |
| 2 | Lead-article exclusion in single-h1 mode | `js/kit.js:2040` (mixed) and `js/kit.js:2057` (flat) `if (primary.tagName === 'H1') return; // lead article` |
| 3 | Signoff inclusion | No exclusion code in mixed-mode or flat-mode loops; every non-lead h2 article is enumerated |
| 4 | h3 id stamping | `js/kit.js:1951-1955` stamps ids on `:scope > h2, :scope > h3` direct children |
| 5 | Multi-h1 trigger = ≥2 book__section whose first heading is h1 | `js/kit.js:1980-1985` `var multiH1 = h1Sections.length >= 2;` |
| 6 | Bold label = `<a class="t-subtitle" href="#id">`, native anchor click | `js/kit.js:2002-2005` generator emits the anchor; `js/kit.js:326` scroll-spy click handler updates URL hash via `history.replaceState` |
| 7 | Autonav opt-out via `data-nav="manual"` | `js/kit.js:1963` `if (nav.getAttribute('data-nav') === 'manual') return;` |
| 8 | Generator inside `KK.refresh()`; fires DOMContentLoaded + kk:md-rendered | `js/kit.js:2075` (init), `js/kit.js:2103` (refresh), `js/kit.js:2143` `document.addEventListener('kk:md-rendered', KK.refresh);` |

### 2. Direction-doc patterns implemented

PASS by inheritance. Kit-refactor recipe per `pipeline.md § Entry point matching`: "Stage 1 + stage 5 in DS-engineer mode + stage 6b + stage 7. Pattern design phase skipped; the direction doc §Exceptions block is populated directly by the human." Analyst's eight locked decisions in `01-analyst.md § Locked decisions` ARE the direction-doc-equivalent for this recipe. Item 1 already audited every decision against shipped code.

### 3. 6a guess matches intent

N/A. Stage 6a skipped per `pipeline.md § Kit-internal review adaptation`. The kit is a kit-internal artifact with no analyst jobstory for the cold read to compare against. Recipe explicitly drops this rubric item.

### 4. Zero off-inventory components

PASS. `06b-consistency-ds.md` flagged three drift items:

| Flag | Stamp | Maintainer follow-up |
|---|---|---|
| `nav-group__head` modifier not in canon | `01-analyst.md § Locked decisions §6` ("Bold label is `<a class="t-subtitle" href="#id">`. Native anchor behaviour."). Class-name choice follows the existing `nav-group__items` BEM grammar. | `05-design-engineer.md § Maintainer proposals §3` — register modifier in canon |
| `data-nav="manual"` attribute not in canon | `01-analyst.md § Locked decisions §7` (full attribute name + behaviour stamped) | `05-design-engineer.md § Maintainer proposals §3` |
| Direct contradiction of `components.md:423` ("Each nav-group header is `<h4 class="t-subtitle">`") | `01-analyst.md § Locked decisions §6` (header element changes from h4 to anchor; bold label must be clickable + scroll-spy active) | `05-design-engineer.md § Maintainer proposals §3` — update rule 423 |

All three flags resolve to stamped decisions. Canon update is queued for the maintainer pass at session close. PASS.

`06b` also flagged `text-decoration: none` as the first kit link reset — defensible as "ensure style from h4 will be kept" stamped in user's third turn (`01-analyst.md § Raw input` line 3). PASS.

### 5. Zero AI-tells

**FAIL.**

Two strings flagged by `06c-voice.md`:

1. `index.html:20` — `Agentic Design System` renders Title Case in the manifesto sidebar header. `voice.md § No AI tells` line: "Title Case headings: sentence case everywhere." Direct violation. Pre-existing string; predates this session.
2. `index.html:28` — `Powered by kk.consulting` passive construction. Borderline against the AI-tells inventory (passive voice is an Orwell rule but not explicitly listed). Soft flag.

Strict rubric: one rubric-named violation = FAIL. The other three demos all use sentence case (`Fundamental`, `Comment persistence`, `Renderer`); the manifesto is the lone outlier. The voice canon was last hardened at the 2026-04-24 content-architecture session and the Title Case heading survived that pass — likely because the canon work focused on body prose, not the sidebar header. The debt has been hiding in plain sight.

The session's own deliverable — the auto-nav generator at `js/kit.js:1908-2078` — emits zero prose. The flag is on inherited surface, not generated surface.

### 6. Exception paper trail

PASS, conditional on the maintainer pass landing the queued proposals.

For each flagged drift item, paper trail check:

| Item | Stamped reason | CHANGELOG entry | Job-grounded |
|---|---|---|---|
| `nav-group__head` modifier | `01-analyst.md § Locked decisions §6` | Queued in `05-design-engineer.md § Maintainer proposals §2` | Yes — bold label needs clickable + scroll-spy state, anchor element required |
| `data-nav="manual"` attribute | `01-analyst.md § Locked decisions §7` | Queued | Yes — consumers must be able to opt out of autonav |
| Header element change (h4 → anchor) | `01-analyst.md § Locked decisions §6` | Queued | Yes — same job as above |

Maintainer pass runs after stage 7 per `pipeline.md` (the kit-js-extraction reference session shipped its maintainer pass at stage 11 after the stage-10 reviewer round). The CHANGELOG entry exists as a queued instruction in `05-design-engineer.md`, not yet executed. PASS conditional on the maintainer landing the proposals before the kit version tags.

### Adapted item — auto-nav completeness

PASS.

| Sub-check | Evidence |
|---|---|
| Eight locked decisions ship | Item 1 audit |
| Four consuming pages collapsed | `index.html:22-24`, `demos/fundamental--accepted/index.html:20-22`, `demos/comment-persistence/index.html:56-58`, `demos/md-renderer-smoke/index.html:17-19` — all reduced to the `<nav class="sidebar__nav" id="toc"><span class="toc__indicator"></span></nav>` shell |
| Kit owns slug + heading-id stamping + post-render refresh | `js/kit.js:178-186` slugify, `js/kit.js:1936-1958` stampHeadingIds, `js/kit.js:2143` module-level kk:md-rendered listener |

## Open items

1. **Pre-existing voice debt in manifesto sidebar.** `index.html:20` Title Case heading violates `voice.md § No AI tells` inventory. Companion soft flag at line 28 (`Powered by kk.consulting` passive). Two reiterate paths:
   - **(a) Fix.** Edit `index.html:20` to sentence case (`Agentic design system`); edit `index.html:28` to drop the passive (`kk.consulting`). Re-run stage 6c + stage 7. Cycle cost: a few minutes.
   - **(b) Ship with named exception.** User stamps a `## Exceptions shipped` section in `documentation/2026-04-27-auto-sidebar-nav/README.md` naming both strings, the reason (pre-existing voice debt; session scope is structural), and the deferral target (follow-up canon-rework session decides whether `Agentic Design System` is a stylized brand exception or flattens to sentence case).

## Recommended reiterate target

Path (b) — ship with named exception. Reasoning: the session's own deliverable is clean, the flagged strings predate this work, and the brand-name-vs-sentence-case question is a separate canon discussion that should not gate a structural release. Path (a) is also clean and cheap if the user prefers to close the debt while we are here.

User owns the path choice per `pipeline.md § Reiterate protocol`.
