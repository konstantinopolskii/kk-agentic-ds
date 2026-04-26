# Session — comments default-on across the kit

Date: 2026-04-26
Owner: Konstantin Konstantinopolskii
Product: kk-agentic-ds (kit itself)
Entry point: kit refactor — stage 1 + stage 5 + stage 6b + stage 6c + stage 7. Pattern design phase skipped per pipeline.md § Entry point matching. §Exceptions populated by the user.
Kit version: 1.6.1 → 1.7.0 (target)

Follow-up to the 1.6.0/1.6.1 comment-persistence session. The user extended the rule from "persistence everywhere there is a comment stack" to "comments everywhere there is a kit doc page."

## Outcome
1.7.0 PASS. Comments are a default kit affordance. Any page with `.app` + `.book`/`#doc` gets a `.comment-stack` injected when missing, plus an `.inspector` if missing. Selection flow auto-enables. Three opt-out switches: `comments.enabled`, `comments.autoMount`, `comments.autoEnable`. Stage 6c FAILED first pass on three in-scope voice defects (two em-dashes, one filler word); stage 5 re-spun and re-audit passed. Stage 6b PASS. Stage 7 PASS on the adapted kit-internal rubric. Ship.

## File index

| File | Stage | Role | What |
|---|---|---|---|
| [00-brief.md](./00-brief.md) | 0 | user | Original ask |
| [01-analyst.md](./01-analyst.md) | 1 | analyst | Decomposition |
| [02-direction.md](./02-direction.md) | 2 | direction | Auto-mount API + defaults + opt-outs |
| [05-design-engineer.md](./05-design-engineer.md) | 5 | design engineer | What shipped |
| [06b-consistency-ds.md](./06b-consistency-ds.md) | 6b | Dieter Rams | DS audit |
| [06c-voice.md](./06c-voice.md) | 6c | George Orwell | Voice audit |
| [07-meta-reviewer.md](./07-meta-reviewer.md) | 7 | Anna Wintour | Rubric verdict |

## Adapted rubric (kit-internal artifact)

- 6a skipped (kit-internal).
- Completeness item: any page with `.app` + `.book`/`#doc` gets a comment-stack injected when missing. Selection flow auto-enables. Persistence runs by 1.6.0 rules. Three opt-out switches (`comments.enabled`, `comments.autoMount`, `comments.autoEnable`) work cleanly. No regression on the four existing demos (manifesto root, fundamental, renderer smoke, comment-persistence demo).
