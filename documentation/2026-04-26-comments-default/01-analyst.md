---
session: 2026-04-26-comments-default
stage: 1
role: analyst
input: 00-brief.md + the 1.6.0/1.6.1 codebase
output: rule statement, three job stories, four open questions stamped under "execute" mandate
gate: stamped — user pre-approved with "execute"
---

## Raw input

See 00-brief.md.

## The rule, stated

Comments are a default kit affordance. Any page that loads the kit and renders the kit's three-column shell (`.app` containing `.book` or `#doc`) gets a comment surface — whether the consumer's HTML carries one or not.

Three behaviours derive:

1. **Auto-mount.** When `.comment-stack` is missing, the kit injects one. When `.inspector` is also missing, the kit injects an empty inspector first.
2. **Auto-enable.** The kit auto-calls `enableCommentSelectionFlow()` so selection-to-draft works without consumer code.
3. **Persist by default.** Already true since 1.6.0 (localStorage adapter, `.comment-stack` presence triggers it). No change.

## Users

| User | Hire | Today (1.6.1) | Tomorrow (1.7.0) |
|---|---|---|---|
| Author drafting a new doc page | Margin notes work the moment they paste the kit shell | Must wire `.inspector` + `.comment-stack` + `enableCommentSelectionFlow` call by hand | Just paste `.app` + `.book`. Comments work. |
| Consumer with a custom inspector | Their inspector layout stays untouched | Today's behaviour — kit only hooks if `.comment-stack` is present | Same — kit detects existing `.comment-stack` and skips auto-mount |
| DB-backed app (Wealthy portal) | Backend owns state | `KK.config.persist.enabled = false` already opts out of localStorage | Add `KK.config.comments.enabled = false` if they don't want any kit comment UI; or keep mount + selection on and just route events to their DB |
| App that does not want comments | No inspector column at all | Default behaviour stays passive (no `.comment-stack` → no kit comment behaviour) | Set `KK.config.comments.enabled = false` to keep the old inert behaviour |

## Job stories

1. **New doc page, comments out of the box.** Context: I write a new HTML page using the kit shell. Motivation: comments without rebuilding the inspector wiring per page. Step: paste `.app` + `.book` + `<script src="kit.js">`. Value: highlight-to-comment works on first load, persistence runs.
2. **Existing custom inspector, kit stays out.** Context: my page already builds its own `.inspector` + `.comment-stack`. Motivation: kit must not double-inject. Step: kit detects the existing stack and skips auto-mount. Value: no double-stack, no broken layout.
3. **Opt-out on a non-doc kit page.** Context: I use `.app` for a non-doc surface (gallery, settings). Motivation: I don't want a comment column. Step: set `KK.config.comments.enabled = false` before kit.js loads. Value: kit stays passive, no DOM injection.

## Priority scenarios

- **A. Kit shell paste, zero config.** Page: `.app` > `.book` + `<script src="kit.js">`. Reload. Inspector + comment-stack auto-mount. Selection wraps. Comment commits. Reload. Persists.
- **B. Existing comment-stack, no double-injection.** Page already has `.inspector .comment-stack`. Kit detects, does not double-inject.
- **C. Opt-out on a non-doc kit page.** `KK.config.comments.enabled = false` blocks injection + selection-flow auto-enable. Kit stays at its pre-1.7.0 inert state.

## Open questions (resolved by user "execute" mandate)

1. **Auto-mount detection: `.app` + `.book`/`#doc`, or just `.book`?** Use both. `.app` signals the consumer chose the kit's three-column grid; injecting an inspector outside that intent could break custom layouts. **Stamped.**
2. **Auto-enable selection flow always, or only when persistence is enabled?** Always (when `comments.enabled !== false`). Selection is the entry point to commenting; the consumer wants comments by default → they want the entry point too. **Stamped.**
3. **One master switch (`comments.enabled`) or three knobs (`enabled`, `autoMount`, `autoEnable`)?** Three knobs. The most common opt-out is "I want comments but not the auto-injected DOM" or "I want a comment stack but my own selection handler." Three knobs match three real consumer cases. Default all three to `true`. **Stamped.**
4. **Backward compat on consumers calling `enableCommentSelectionFlow()` explicitly today?** Idempotent. The function's `commentFlowEnabled` sentinel already short-circuits a second call. No change needed; existing pages keep working. **Stamped.**

## Hand-off

Stage 5 in DS-engineer mode. Direction doc at 02-direction.md.
