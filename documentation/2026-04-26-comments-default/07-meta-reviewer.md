---
session: 2026-04-26-comments-default
stage: 7
role: meta-reviewer (Anna Wintour)
input: 01-analyst.md + 02-direction.md + 05-design-engineer.md + 06b-consistency-ds.md + 06c-voice.md + the built files
output: PASS
gate: ship
---

## Adapted rubric (kit-internal artifact)

Per `pipeline/pipeline.md § Kit-internal review adaptation`: drop the 6a-vs-analyst comparison item, add a session-specific completeness item.

### 1. Direction-doc API surface has an implementation in the built code.

PASS. The direction doc named four API surfaces. Each grep'd in `js/kit.js`:

| Direction-doc surface | Built |
|---|---|
| `KK.config.comments` defaults block | Same `Object.assign` merge pattern as `KK.config.i18n` / `KK.config.persist`. |
| `autoMountCommentSurface()` with full detection rules | Bails on `enabled === false`, `autoMount === false`, missing `.app`, missing `.book`/`#doc`, or existing `.comment-stack`. Reuses or creates `.inspector`; appends `.comment-stack`. |
| `autoEnableCommentSelectionFlow()` calling `initCommentSelectionFlow` | Bails on `enabled === false`, `autoEnable === false`, missing `.comment-stack`, missing `.book`/`#doc`. Idempotent. |
| Init order in `KK.init` and `KK.refresh` | `autoMountCommentSurface` BEFORE `initColumnReveal`; `autoEnableCommentSelectionFlow` AFTER `initCommentPersistence`. Verified in both. |

13/13 implementation checks pass via static grep (run in stage 5 verification).

### 2. Zero off-inventory components.

PASS. Per stage 6b. Auto-mount injects only `inspector` and `comment-stack` — both resolve to canon. No new classes, no new tokens, no CSS changes.

### 3. Zero AI-tells (in-scope additions).

PASS. Per stage 6c re-audit. First pass FAILED with three in-scope defects (em-dash for punch in `comment.md:42`, em-dash for punch in `kit.js` auto-mount comment, filler word "specific" in CHANGELOG). Stage 5 re-spun. Re-audit returned PASS.

Pre-existing voice debt in `docs/integration/comment.md` (lines 75, 79, 83, 86) is logged for a separate session per the kit-internal review adaptation; not blocking 1.7.0.

### 4. User-agreed exceptions carry paper trail.

PASS. The kit-refactor recipe per `pipeline.md § Entry point matching` allows the user to populate the §Exceptions block directly. `02-direction.md § Exceptions` records four user stamps (auto-mount detector requires `.app` + `.book`/`#doc`; auto-enable not gated on persistence; three knobs default-true; no backward-compat shim needed). All under the user's "execute" mandate.

### 5. Session-specific completeness (per README).

PASS. The README named six completeness criteria; every one resolves:

- Auto-mount on `.app` + `.book`/`#doc` when missing → `autoMountCommentSurface` detects and injects.
- Selection flow auto-enables → `autoEnableCommentSelectionFlow` calls `initCommentSelectionFlow` idempotently.
- Persistence runs by 1.6.0 rules → unchanged from 1.6.0; persistence module sees the auto-mounted stack on the second pass through `KK.init`.
- Three opt-out switches work → `comments.enabled`, `comments.autoMount`, `comments.autoEnable`. Each guarded in the matching function.
- No regression on existing demos → manifesto root, fundamental, renderer smoke all use `.app .book`; auto-mount will inject a `.comment-stack` into their `.inspector` (manifesto) or create one (fundamental, renderer-smoke). Per the user's rule, this is the new default. The comment-persistence demo already had its own `.comment-stack`; auto-mount detects and skips.
- No CSS change → confirmed.

## Verdict

PASS. Ship.
