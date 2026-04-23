---
session: 2026-04-23-fundamental
stage: 5-rerun
role: design-engineer
input: 07-meta-reviewer.md + user rulings
output: surgical fixes to demos/fundamental/index.html + canon proposals P1 and P2
gate: hand back to 6b + 6c + 7 on rerun
---

# Design engineer — fundamental rerun

We return to stage 5 after stage 7 failed on a defined defect list. User has ruled on each flag. Work is surgical — edit the existing file in place, never rebuild.

## User rulings absorbed

1. `t-muted` on display subtitles stays. Sixteen sites untouched.
2. Canon-level defects route to a maintainer session: `.aside` / `.quote` / `.figure` inventory gap, raw rgba in swatches, signoff stats grid mismatch. Proposals below, canon files untouched.
3. Kit.js bugs route to maintainer session. No workaround in style.css.

## Files touched

- `demos/fundamental/index.html` — A/B/C/D fixes, below.
- `documentation/2026-04-23-fundamental/README.md` — new, session paper trail.
- `documentation/2026-04-23-fundamental/05-design-engineer-rerun.md` — this file.

Canon untouched: `index.html`, `vars.css`, `style.css`, `components.md`, `tokens.json`, `skills/`, `js/kit.js`.

## Change log — demos/fundamental/index.html

### A. Copy rewrites per voice.md §No AI tells

| Line | Before | After |
|------|--------|-------|
| 161 | `<span class="aside">(parenthetical, not bracketed)</span>` inside "a softer beat" sentence | Sentence reshaped around "Numbers, tokens, and the occasional `<span class="aside">softer beat, one notch smaller and muted</span>` all sit on the same line." No "not A, but B" shape, aside is a plain descriptor. |
| 214 | `The 3% whisper. Hover, focus, active share it.` | `The 3% overlay. Hover, focus, active share it.` |
| 312 | `hero breathing room.` | `around the hero.` |
| 317 | `end-of-doc quiet.` | `end of document.` |
| 478 | `Black surface, white content. The moment that matters.` | `Black surface, white content. Reserved for the one card that should interrupt the column.` |
| 599 | `Choose where the next document pass leans.` | `Pick the direction for the next document pass.` |

Soft 6c flags on "breathing room" and "quiet" both fixed above. "Leans" metaphor replaced per 6c's own recommended wording.

### B. Button-label repeat per voice.md §Labels and interface text

| Lines | Before | After |
|-------|--------|-------|
| 649-650 | secondary `Commit` + primary `Commit the change` | secondary `Draft` + primary `Ship the change`. Two distinct affordances: draft stages the edit, ship commits. |
| 795-796 | secondary `Tweak` + primary `Apply tweak` | secondary `Configure` + primary `Apply tweak`. 6b flagged this as spirit-of-rule drift (shared root). Applied the fix per 6b's own recommendation. |

Not touched: `Pick` / `Apply direction` (612-613) and `Scope` / `Apply scope` (634-635). 6b did not flag these. `Scope` / `Apply scope` carries the same near-match shape — deferring to the reviewer unless the user overrides.

### C. Placeholders as labels per voice.md §Placeholders

Precedent already in the prototype: `placeholder="sofia@kk.consulting"` at line 507. Apply the same shape — a real example a user would type.

| Line | Before | After |
|------|--------|-------|
| 608 | `Describe the change` | `drop the shout card, tighten the stack` |
| 645 | `Short memo for the change` | `v1.2.0. stack tightened, shout demoted` |
| 785 | `Describe the change for the agent` | `bump radius to 16, leave weights alone` |
| 839 | `Add a comment` | `the caption reads too thin here` |
| 925 | `Reply…` | `looks right now, thank you` |

### D. Comment thread — readable exchange

Thread now reads: question raised → dispatch → agent reply → resolved.

| Line | Before | After |
|------|--------|-------|
| 856, 889 (preview + list) | `Could you add one more example?` | `The tag row needs one more variant to cover the metadata case.` |
| 872, 915 (preview + list) | `Added. Take another look.` | `Added a bold tag at the end of the row. Take a look.` |
| 902 | `On it.` | `Claude, add a bold tag to the row.` |
| 937 | `Kit stamps data-message-id at creation time.` | `The signoff timestamp should carry the timezone.` |

Roster unchanged: Sofia Hlazunova (reviewer) + Konstantin Konstantinopolskii (dispatcher) + Claude (agent). Structural shape unchanged — only message text and snippet changed.

## Canon proposals — maintainer picks up

### P1. `.aside` / `.quote` / `.figure` definitions for `components.md`

These three classes live in `style.css` (`.quote` at 1568, `.figure` at 1722, `.aside` at 1742) but are missing from the `components.md` inventory surface. Propose adding a new row in §Typography utility classes for each, matching the shape already used in that table.

Simplest possible rules, single row each:

| Class | Size | Use |
|-------|------|-----|
| `aside` | 0.85em, muted | Inline aside. A softer beat inside a sentence, one notch smaller. |
| `quote` | inherits body, italic | `<blockquote>` surface. Hairline rail on the left, citation line below in micro muted. |
| `figure` | inherits | `<figure>` surface. Image or SVG on top, caption below in micro muted. |

Alternative: §Prose surfaces subsection right after §Typography utility classes, carrying `aside`, `quote`, `figure` together. Taxonomically cleaner since only `.aside` is a true typography utility — `.quote` and `.figure` are block surfaces.

Maintainer call on subsection placement. Text above is ready either way.

### P2. Swatch token proposal

Current drift: six swatches in `demos/fundamental/index.html` emit raw `rgba(0,0,0,0.X)` inline. Every raw value already has a matching token — zero new tokens needed. Reuse existing.

| Line | Current inline | Replace with |
|------|---------------|--------------|
| 213 | `rgba(0,0,0,0.03)` | `var(--color-surface-overlay)` |
| 217 | `rgba(0,0,0,0.06)` | `var(--color-surface-strong)` |
| 221 | `rgba(0,0,0,0.1)` | `var(--color-border)` |
| 225 | `rgba(0,0,0,0.2)` | `var(--color-border-strong)` |
| 233 | `rgba(0,0,0,0.5)` | `var(--color-text-muted)` |
| 237 | `rgba(0,0,0,0.3)` | `var(--color-text-subtle)` |

Token delta: zero. All nine palette tokens already exist in `tokens.json` and `vars.css`. The fix is swap-in-place.

Propagation: canon `index.html:491-515` carries the same drift. Maintainer sweeps both files in one pass.

## Judgement calls

- **Line 161 aside.** Reviewer flagged the "not A, but B" shape. Rewrote to drop the contrast verb. The new string still describes an aside from inside an aside — self-reference remains, but the forbidden shape is gone. If self-reference itself is a defect the reviewer wanted cut, route back.
- **Tweak / Apply tweak pair (795-796).** 6b flagged as spirit-of-rule. Applied the fix. If 6b's spirit-reading was wrong, revert.
- **Scope / Apply scope pair (634-635).** Same near-match shape as Commit / Commit the change and Tweak / Apply tweak. 6b did not flag it. Left untouched per instruction — defer to reviewer unless sure. Routed to the user as a question: do we fix this one too, or is the reviewer's silence correct?
- **Resolved snippet (937).** Replaced dev jargon with a real in-progress thought about the Signoff block. Matches the tiny-story shape the comment thread now carries.

## What the rerun did not touch

- Every `t-muted` on display subtitles — user ruling. Untouched.
- Every CSS rule, token, skill. Canon untouched.
- Kit.js. Untouched.
- Every flag 6b raised that was not in the user-endorsed defect list (Reading block `t-muted` on the prose paragraph at 126; shout card subtitle `t-muted` at 476; Weight-rules triple-column claim ordering at 384; signoff stats grid shape). Out of scope for this rerun.

## Hand-off

→ Stage 6b + 6c rerun on the edited file. Then stage 7 on the adapted rubric. User stamps or re-dispatches.
