# Session — auto sidebar nav

Date: 2026-04-27
Owner: Konstantin Konstantinopolskii
Product: kk-agentic-ds kit itself — sidebar TOC generator
Entry point: kit refactor (stages 1 → 5 in DS-engineer mode → 6b → 7). Pattern phase skipped. Stage 6a skipped per kit-internal review adaptation.
Kit version going in: 1.9.0 → 1.10.0 (minor bump on ship; new behaviour, no breaking class change)

## Outcome

v1.10.0 deliverable lands. Sidebar TOC auto-generates from rendered `.book` heading rank across the manifesto + three demos. Kit owns slug, heading-id stamping, and the post-render refresh. Four consuming pages collapsed to the `<nav class="sidebar__nav"><span class="toc__indicator"></span></nav>` shell. Stage 7 returned FAIL on a pre-existing Title Case heading; user stamped path (b) ship with named exception. Canon updates queued for the maintainer pass.

## Exceptions shipped

| File:line | String | Rule broken | Reason | Deferral |
|---|---|---|---|---|
| `index.html:20` | `Agentic Design System` | `voice.md § No AI tells`: "Title Case headings: sentence case everywhere" | Pre-existing string; predates this session. Session scope is structural, not voice. The brand-name-vs-sentence-case question is a separate canon discussion. | Follow-up session decides whether to flatten to sentence case (`Agentic design system`) or stamp as a stylized brand exception in `voice.md`. |
| `index.html:28` | `Powered by kk.consulting` | Passive construction (Orwell) — soft flag, not in the AI-tells inventory verbatim | Same. Pre-existing. | Same follow-up session. |

User stamp: 2026-04-27.

## Purpose

The four pages that consume the kit (`index.html`, `demos/fundamental--accepted/index.html`, `demos/comment-persistence/index.html`, `demos/md-renderer-smoke/index.html`) hand-curate their sidebar TOC as `<section class="nav-group">` blocks. Every section rename, reorder, or addition forces hand-edits in two places — markdown body plus sidebar HTML — and the manifesto's editorial overlay drifts away from the actual rendered structure. This session ships a generator in `kit.js` that builds the TOC from heading rank in the rendered `.book` DOM. Same scroll-spy, same visual, same `.toc__indicator`. Hand-curated `<section class="nav-group">` blocks retire across all four pages.

## File index

| File | Stage | Role | What |
|---|---|---|---|
| [01-analyst.md](./01-analyst.md) | 1 | analyst | Decomposition |
| [05-design-engineer.md](./05-design-engineer.md) | 5 | design-engineer (DS-engineer mode) | Generator + scroll-spy update + four sidebar HTMLs collapsed |
| [06b-consistency-ds.md](./06b-consistency-ds.md) | 6b | consistency-ds | Four blocks audited; three flagged. Most severe: `nav-group__head` modifier + `data-nav` attribute not in canon, contradicts `components.md:423` |
| [06c-voice.md](./06c-voice.md) | 6c | voice | 14 strings audited, 2 flagged (both pre-existing in `index.html` sidebar). Generator emits zero prose |
| [07-meta-reviewer.md](./07-meta-reviewer.md) | 7 | meta-reviewer | FAIL on rubric item 5 (Title Case heading at `index.html:20`, pre-existing). All session-deliverable items pass. User picks reiterate path (a) fix or (b) ship with named exception |
| [08-maintainer.md](./08-maintainer.md) | maintainer | kk-ds-maintainer | Bundle landed (version, CHANGELOG, canon, integration doc, cache-bust, kit.js docstring). Commit + tag + push held for user stamp |
