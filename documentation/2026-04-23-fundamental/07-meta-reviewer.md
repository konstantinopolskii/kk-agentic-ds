---
session: 2026-04-23-fundamental
stage: 7-rerun
role: meta-reviewer
input: proposals/2026-04-23-patterns-library.md + demos/fundamental/index.html (current state) + documentation/2026-04-23-fundamental/README.md + 05-design-engineer.md + 05-design-engineer-rerun.md + 06b-consistency-ds.md + 06c-voice.md + user rulings on the first-pass FAIL + kit canon
output: rubric-gated rerun verdict against the adjusted kit-internal rubric
gate: PASS-with-exceptions
---

# Meta-reviewer — fundamental, rerun

Second pass against the adjusted kit-internal rubric declared in `proposals/2026-04-23-patterns-library.md` §Phase 1 + §Review-stage applicability. First pass FAIL-gated; user ruled on each defect group; stage 5 rerun fixed fundamental-owned defects; orchestrator inline-fixed six voice flags raised by 6c after 6c wrote its doc. Current file read directly.

## Verdict

PASS-with-exceptions.

Every rubric item evaluable against fundamental's scope now passes. Three exceptions carry explicit user stamps recorded in the session README. Several residual flags route to the canon maintainer session per user ruling 2 — those are out of scope for fundamental and do not block this gate.

## Rubric result

### 1. Every atom present, every element present, no catalog ceremony retained

PASS.

Completeness walk against kit canon, all atoms and elements located in current `demos/fundamental/index.html`:

- Typography: `t-hero` (80), `t-display` (96), `t-display--medium` (98), `t-body` (82), `t-title` (451), `t-subtitle` (24), `t-caption` (26), `t-caption--bold` (500), `t-micro` (126), `t-mono` (106), `t-muted` (98), `t-list` (143).
- Card variants: static (449), body-wrapper (458), tight (469), shout (474), heading (483), interactive (597).
- Field: row (499), free-text with fake caret (507-509), value (505).
- Button: secondary + primary pair (526-527).
- Tag: plain (547), bold (550), inline (542-544).
- Switch: on + off (565-578).
- Collections: card stack (596), deck (666), signoff (709).
- Prose surfaces: aside (162), quote (173), figure (183).
- Nav with scroll-spy (20-68), three-column shell (12), FABs (975-985), comment stack with new + thread + resolved + archived (832-961).

Ceremony: the display subtitle shape (`<span class="t-display--medium t-muted">`) at the sixteen sites Rams and the first meta-reviewer flagged is stamped by the user as allowed per ruling 1, recorded in `documentation/2026-04-23-fundamental/README.md` §Exceptions shipped. The hard-constraint reading in the first pass is superseded by the user stamp.

### 2. Every direction-doc pattern has an implementation

PASS.

Patterns named in `proposals/2026-04-23-patterns-library.md` §First execution: `fundamental` and §What we are building, every outer container located:

- Three-column shell: `.app[data-view="doc"]` + `.sidebar` + `.doc` + `.inspector` (12, 17, 79, 737).
- Card stack: `.card-stack` (596).
- Deck: `.deck` inside `.card--shout` (665-666).
- Signoff: `.doc__signoff` (709).
- Comments: new-comment card (832), open thread (850), resolved thread (934), archived thread (945).
- Spec list variants: `doc__spec` plain (204), `doc__spec--value` two-column (259, 338), `doc__spec--triple` (382).
- Scroll-spy nav: `#toc` with `.toc__indicator` (20-21).
- Narrow-view FABs: `.fab--nav`, `.fab--inspector`, `.fab--comment` (975, 982, 985).

### 3. Dropped

No 6a for kit-internal artefacts per `proposals/2026-04-23-patterns-library.md` §Review-stage applicability.

### 4. Zero off-inventory components

PASS-with-exceptions.

Fundamental-scope reading of `components.md` + `manifesto.md`: every class the prototype uses resolves either to an inventoried pattern or to a class the kit's own `style.css` defines and the kit's own `index.html` already uses. Per user ruling 2, `components.md` is being retired as a doc; `fundamental` + `patterns.html` replace it. Stage 7 does not fail fundamental for "off-components.md" class references — those route to Phase 3 pattern-discoverer for registration, or to the canon maintainer session for canon-level rulings.

Canon-routed (out of scope, per user ruling 2):
- `.aside` (162), `.quote` (173), `.figure` (183) — classes live in `style.css`, missing from `components.md`. Phase 3 registers in `patterns.html`.
- `doc__part`, `doc__intro`, `card--tight`, `card--heading`, `tag--inline`, `field__value`, `inspector__group`, `card-stack`, `deck`, `deck-card`, `fab`, `fab--nav`, `fab--inspector`, `fab--comment`, `fab__count`, `toc__indicator`, `t-list` — same shape, same route.

Fundamental-owned residual flag, user-stamped:
- Nine inline `style="background: var(--color-...)"` on `.swatch__dot` at lines 206, 210, 214, 218, 222, 226, 230, 234, 238. Per user ruling 3: the swatch dots render their own token's value as data; `components.md` §Forbidden names `font-size / font-weight / color`, it does not name `background`. Tokens are correct (`var(--color-*)` across all nine after stage 5 rerun swap). Pragmatic inline on data-rendered swatches is acceptable. Stamp recorded via user ruling 3. If canon wants a `data-token`-attribute pattern later, the maintainer authors it.

### 5. Zero AI-tells

PASS.

Full walk of current file state against `voice.md` §No AI tells inventory.

First-pass fundamental-owned copy defects, verified fixed in stage 5 rerun:
- 161 "not bracketed, but parenthetical" shape — current reads "Numbers, tokens, and the occasional softer beat, one notch smaller all sit on the same line." No not-A-but-B shape.
- 214 "3% whisper" metaphor — current: "The 3% overlay." (215).
- 312 "hero breathing room" — current: "around the hero." (313).
- 317 "end-of-doc quiet" — current: "end of document." (318).
- 478 "The moment that matters" closer — current: "Reserved for the one card that should interrupt the column." (479).
- 599 "leans" metaphor — current: "Pick the direction for the next document pass." (600).
- 649-650 "Commit" + "Commit the change" repeat — current: `Draft` (650) + `Ship the change` (651). Distinct affordances.
- 608, 645, 785, 839, 925 placeholder-as-label — current: all five now carry real examples ("drop the shout card, tighten the stack" 609, "v1.2.0. stack tightened, shout demoted" 646, "bump radius to 16, leave weights alone" 786, "the caption reads too thin here" 840, "looks right now, thank you" 926).

6c rerun flags (six defects at 162, 181, 452, 493, 534, 952), verified fixed inline by the orchestrator after 6c wrote its doc:
- 162 rule-of-three ("softer beat, one notch smaller and muted") — current reads "softer beat, one notch smaller" (162). Third adjective "and muted" removed.
- 181 rule-of-three ("Citation below, micro, muted") — current reads "A quote wears italic and a hairline rail. Citation sits below in micro." (179-180). Three-item list dropped.
- 452 -ing filler ("A caption sitting under the title") — current reads "A caption under the title. Raw paragraphs pick up the 12px inset without a card__body wrapper." (452). Participle stripped.
- 493 -ing filler ("A label and a value sharing one row") — current reads "A label and a value share one row." (493-494). Participle stripped.
- 534 not-A-but-B ("Metadata, not action") — current reads "Metadata only" (534). Shape fixed.
- 952 copula-adjacent padding ("Archived for future retrieval") — current reads "Early tag sizing notes. Superseded by v1.1." (952). Concrete replacement.

Systemic first-pass flag on `t-muted` at sixteen subtitle sites: user ruling 1 stamps as allowed beyond strict metadata. Not a defect. README §Exceptions shipped records the stamp.

Cold re-walk of current file for new AI tells not in the prior audits: clean. Sentence case holds in every heading. No em-dashes in headlines. Imperative button labels throughout. Placeholders carry real examples. Empty states and errors: none present in this kit-internal artefact, no violation surface.

### 6. Paper trail for exceptions + new components

PASS.

- `documentation/2026-04-23-fundamental/README.md` exists. Declares adapted rubric (lines 19-28). Declares exceptions shipped (lines 30-34). Names canon-routed defects (lines 36-43) with pointer to 05-design-engineer-rerun.md §Canon proposals (P1, P2).
- User stamps recorded: `t-muted` on sixteen subtitle sites (ruling 1, README line 34); canon-routed defects are owned by maintainer session not fundamental (ruling 2, README lines 36-43); swatch inline-style acceptable on data-rendered dots (ruling 3, recorded here in this 07 rerun since it came after README was written).
- Stage 5 rerun proposals P1 (prose-surface inventory) and P2 (swatch token swaps) are filed in `05-design-engineer-rerun.md` §Canon proposals, waiting on maintainer session.

## Defect list, sorted by ownership

### Fundamental-owned (all resolved in this rerun)

Resolved in stage 5 rerun:
- Six copy rewrites at 161, 214, 312, 317, 478, 599 — done.
- Button-label repeat at 649-650 — renamed to Draft / Ship the change.
- Five placeholder-as-label at 608, 645, 785, 839, 925 — real examples inserted.

Resolved by orchestrator inline after 6c wrote its doc:
- Six voice rewrites at 162, 181, 452, 493, 534, 952 — done. Verified in current file.

### User-stamped exceptions (pass with explicit stamp)

1. **`t-muted` on sixteen display-subtitle sites** — lines 98, 115, 135, 169, 195, 247, 326, 404, 440, 490, 516, 533, 557, 589, 658, 702, plus the line 126 micro-paragraph. Stamp: user ruling 1. Reason: muted legitimately carries structural descriptors in this kit's shape. Paper trail: README §Exceptions shipped line 34.
2. **Swatch dots render their own token value inline at lines 206, 210, 214, 218, 222, 226, 230, 234, 238.** Stamp: user ruling 3. Reason: data-rendered swatch is pragmatic inline; `components.md §Forbidden` names font-size / font-weight / color, not background; tokens are correct `var(--color-*)` refs. Paper trail: this 07 rerun records the ruling.

### Canon-routed (out of scope for fundamental per user ruling 2)

Route to canon maintainer session or Phase 3 pattern-discoverer. Not fundamental's fault. Not a gate blocker.

- `.aside` / `.quote` / `.figure` absent from `components.md` — Phase 3 discoverer registers in `patterns.html`, or maintainer patches canon. Proposal text ready in `05-design-engineer-rerun.md §P1`.
- Kit canon inventory gaps on `doc__part`, `doc__intro`, `card--tight`, `card--heading`, `tag--inline`, `field__value`, `inspector__group`, `card-stack`, `deck`, `deck-card`, `fab*`, `toc__indicator`, `t-list` — same route. Registered by Phase 3 discoverer; `components.md` is being retired anyway.
- Kit.js behaviour bugs (empty comment-new fails to dismiss on blur; `.comment__menu-popover` does not open on click) — canon maintainer session.
- Signoff stats grid CSS mismatch (`style.css:337-339` is `1fr 1fr 1fr` against `components.md §Signoff` two-stat example) — canon maintainer session.
- Proposal P2 swatch token swap: done in fundamental. Propagation to canon `index.html:491-515` remains open for maintainer sweep.

## Gate

PASS-with-exceptions. Two explicit user-stamped exceptions (`t-muted` on structural subtitles; swatch inline-style on data-rendered dots). Canon-routed items do not gate this artefact.

Fundamental earns the `--accepted` suffix. Folder renames to `demos/fundamental--accepted/`. Phase 3 `kk-role-pattern-discoverer` runs next against the accepted folder, per `proposals/2026-04-23-patterns-library.md §Execution plan §Phase 3`.
