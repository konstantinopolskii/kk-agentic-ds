---
session: 2026-04-24-content-architecture
stage: 6b (v1.4.1)
role: consistency-ds (Dieter Rams)
input: v1.4.1 patches against the v1.4.0 6b flags + spot-check of section convention
output: verify both 1.4.0 flags resolved + zero new drift
gate: feeds stage 7
---

## v1.4.0 flags — resolution check

Two flags from v1.4.0 6b. Both resolved.

### Flag 1 — md.js wrap order (resolved)

`js/md.js:277` reads:

```
return unstash(wrapInSections(out.join("\n")));
```

Wrap runs first on the joined output. `wrapInSections` operates on a string where raw HTML blocks are still sentinel placeholders (stashed by `stashRawHtml` earlier in `render`, line 109 region defines `wrapInSections`). The h2 split regex therefore only sees md-emitted `<h2>` tags. `unstash` then restores raw HTML inside whichever section it landed in. The hazard the v1.4.0 6b note flagged — an `<h2>` nested inside a raw HTML block splitting that block mid-way — is closed by the call order.

The block comment on lines 272–276 documents the rationale in-code, which is welcome — the next reader will not undo this without thinking.

### Flag 2 — index.html post-render hook (resolved)

`wrapBookSections()` is gone. Grep across `index.html` returns zero hits for the legacy name. The replacement `stampSectionIds()` lives at `index.html:185–196`:

- Line 186: `var book = document.querySelector(".book");` — null-guarded at line 187.
- Line 188: `var sections = book.querySelectorAll(":scope > article.book__section");` — direct-child scope, no descendant pickup, will not double-walk nested articles.
- Line 190: `if (section.id) return;` — idempotent. A second `kk:md-rendered` event (or hand-authored articles already carrying ids) is a no-op.
- Line 191: `var h2 = section.querySelector(":scope > h2.t-display");` — direct child only. The lead article (h1 + preamble) has no `:scope > h2.t-display`, returns null at line 192, no id stamped. Lead article correctly keeps no id.
- Line 193–194: slug derived from `h2.textContent` via `slugify()` at line 171, copied onto `section.id`.

`document.addEventListener("kk:md-rendered", …)` at line 198 wires the hook. No double-wrap path remains — the function does not create elements, only reads and stamps an attribute.

## v1.4.1 — new drift check

### Class resolution

Every class touched by the patch resolves to canon:

- `.book` — manifesto § Book, components.md § Book.
- `.book__section` — patterns.md § Book structure (added 1.4.0).
- `.t-display` — components.md § Type § Display.

No new class introduced by the patch. `stampSectionIds` reads classes only.

### Token compliance

Patch is JS-only. No CSS, no token surface touched. `vars.css` and `tokens.json` not in the diff. No off-token risk.

### Off-grid

No spacing values in the patch. The `space-15` step on `.book__section > h1` margin from 1.4.0 stays untouched.

### Pattern-language drift

One minor doc-comment staleness, not a code defect:

- `index.html:67` comment reads `<!-- Post-render hook wraps each top-level ## into a .book__section -->`. The wrap moved into `js/md.js` at 1.4.0; the post-render hook now stamps ids only. The comment overstates what the script element does. A future reader scanning shell comments will get a false mental model. Recommend a one-line edit to "Post-render hook stamps slug ids onto md.js-emitted sections" — but this is a comment, not behaviour. Out-of-scope for a 1.4.1 sign-off; flag for the next maintainer pass.

The companion comment at lines 161–167 already states the correct model. The stale line 67 is a leftover from before the hook split.

### Spot-check — no regression on 1.4.0 section convention

- `style.css` carries zero live `.book__intro` rules. The single hit (line 470) is inside a block comment explaining the new `space-15` margin. No CSS regression.
- `index.html` source markup contains no `<p class="book__intro">` and no hand-authored `<article class="book__section">` — the manifesto renders entirely through md.js, so the patch's idempotency clause (`if (section.id) return`) is the only line that runs. Correct path exercised.
- `canon/patterns.md` is the single canon file referencing `book__section`, consistent with 1.4.0's stated home for the convention.

### Version surface

- `package.json:3` — `"version": "1.4.1"`.
- `.claude-plugin/plugin.json:3` — `"version": "1.4.1"`.
- `CHANGELOG.md:5` — `## 1.4.1, 2026-04-25` heading sits above `## 1.4.0`. Entry names both fixes with file paths and rationale. Correct shape.

## Verdict

**PASS.**

Both v1.4.0 6b flags resolved with file:line evidence. Zero new drift introduced by the patch. One pre-existing doc-comment staleness (`index.html:67`) noted for a future maintainer pass — not a 1.4.1 defect, does not block.

## Hand-off

Feeds stage 7 (meta-reviewer). Recommended verdict for the rerun gate: ship 1.4.1.

Optional follow-up for the next maintainer pass (not blocking):
- Refresh `index.html:67` shell comment to match the post-1.4.0 hook responsibility.
