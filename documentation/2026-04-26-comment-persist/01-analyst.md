---
session: 2026-04-26-comment-persist
stage: 1
role: analyst
input: 00-brief.md + agreement.html lines 452-597 + js/kit.js + docs/integration/comment.md
output: decomposed brief, three job stories, two priority scenarios, four open questions stamped by user-blanket "don't ask"
gate: stamped — user pre-approved with "execute till done"
---

## Raw input

See 00-brief.md.

## What the source artifact does

`agreement.html` ships a 140-line inline `<script>` that:

1. Reads localStorage at `explee_agreement_comments_v1` on load.
2. Restores `comment-stack` innerHTML from the saved blob.
3. Re-wraps doc highlights via tag-index DOM path walk + text-node search for the saved quote.
4. Saves on every mutation to stack or doc, debounced 200 ms.
5. Exposes `KK.extractComments()` returning a JSON-serialisable array of threads + anchor metadata + messages.
6. Exposes `KK.clearSavedComments()` that wipes localStorage and reloads.

Key against-grain detail: the comment header says "cookie" but the implementation uses localStorage. localStorage is correct (4 kB cookie quota would not hold even one thread). Treat "cookie" in the user brief as the everyday-shorthand for client-side browser storage; ship localStorage.

## Users

| User | Hire | Today |
|---|---|---|
| Document author (Konstantin) | Margin notes that survive reload on a static HTML deliverable | Inline 140-line script copy-pasted per page |
| Consumer with DB-backed app (Wealthy portal, Flask) | Comments live in DB, kit stays out of localStorage | `kk:comment` listener writes to DB; no kit persistence layer |
| Consumer with hybrid sync (future) | Local cache + DB sync | Today: hand-roll. Hoped for: kit hook |
| Dev server | Persistence muted while iterating | Today: clear localStorage manually |

## Job stories

1. **Default persistence on a static doc.** Context: I open a signed deliverable in the browser. Motivation: my comments must survive reload. Step: drop kit.js into the page. Value: comments persist, no inline script.
2. **Off switch for DB-backed apps.** Context: my Flask app already routes `kk:comment` to Postgres. Motivation: localStorage would shadow stale state on top. Step: set `KK.config.persist.enabled = false` before kit loads. Value: kit stays passive; my DB owns state.
3. **Custom sync layer.** Context: I want a hybrid local cache + remote sync. Motivation: offline edits reconcile when online. Step: pass `KK.config.persist.adapter = { load, save, clear }`. Value: kit's restore + observer reuse my adapter.
4. **Copy out comments.** Context: a reviewer wants the threads pasted into Slack. Motivation: extract, paste, done. Step: run `KK.copyComments()`. Value: clipboard carries pretty-printed JSON of every thread.

## Priority scenarios

- **A. Static doc default.** Open agreement.html → highlight a paragraph → write a comment → reload → comment + highlight present.
- **B. DB-backed opt-out.** Wealthy portal sets `enabled: false` → no localStorage writes → DB is the only store.

Both must work in 1.6.0.

## Open questions (resolved by user blanket-stamp)

1. **Cookies vs localStorage?** localStorage. The reference implementation uses it; cookie quota is wrong primitive. Ship localStorage. **Stamped: execute till done.**
2. **Restore via tag-path or via anchor metadata?** Anchor metadata. The kit already mirrors `kkAnchorQuote / kkAnchorPrefix / kkAnchorSuffix / kkAnchorSectionSlug` onto every thread + draft dataset. Tag-path is the agreement.html's workaround for not having those. The kit does — use them. **Stamped: execute till done.**
3. **Persist drafts mid-typing or commit-only?** Mid-typing. The reference observes `characterData`; reload-during-draft retains the unfinished text. That ergonomic matters. **Stamped: execute till done.**
4. **Auto-on tied to `.comment-stack` presence, or to `enableCommentSelectionFlow()`?** Tied to `.comment-stack` presence. The agreement-style consumer never calls enable explicitly in the original — so auto-on must not require it. The Wealthy portal sets `enabled: false` to opt out. **Stamped: execute till done.**

## Hand-off

Stage 5 in DS-engineer mode. Direction doc at 02-direction.md carries the API surface and §Exceptions stamps. Pattern design phase skipped per pipeline.md § Entry point matching § Kit refactor recipe.
