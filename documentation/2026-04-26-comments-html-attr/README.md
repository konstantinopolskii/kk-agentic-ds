# Session — declarative html-attr opt-out for comments

Date: 2026-04-26
Owner: Konstantin Konstantinopolskii
Product: kk-agentic-ds (kit itself)
Entry point: kit refactor — stage 1 + stage 5 + stage 6b + stage 6c + stage 7. Pattern design phase skipped per pipeline.md § Entry point matching. §Exceptions populated by the user.
Kit version: 1.7.0 → 1.7.1 (target — patch)

Follow-up to 1.7.0. The user requested a declarative, no-script-tag opt-out for the comments default. Set on `<html>` (not on `.app`, which is a layout class). Three attributes mapping 1:1 to the existing `KK.config.comments.{enabled, autoMount, autoEnable}` knobs.

## Outcome
1.7.1 PASS. Two additions: `<html data-kk-comments[-mount|-enable]="off|on">` declarative opt-out (precedence: defaults → data attrs → explicit JS), and a hidden copy-comments target at the top of any inspector that hosts a `.comment-stack` (clicking the invisible "Comments" h2 fires `KK.copyComments`). Stage 6c FAILED first pass on three voice defects (Easter-egg buzz noun, dev-ergonomic filler, body em-dash for punch); stage 5 re-spun and re-audit PASS. Stage 6b PASS with two minor non-blocking flags. Stage 7 PASS. Ship.

## File index

| File | Stage | Role | What |
|---|---|---|---|
| [00-brief.md](./00-brief.md) | 0 | user | Original ask |
| [01-direction.md](./01-direction.md) | 1+2 | analyst + direction | Brief + API + precedence + §Exceptions |
| [05-design-engineer.md](./05-design-engineer.md) | 5 | design engineer | What shipped |
| [06b-consistency-ds.md](./06b-consistency-ds.md) | 6b | Dieter Rams | DS audit |
| [06c-voice.md](./06c-voice.md) | 6c | George Orwell | Voice audit |
| [07-meta-reviewer.md](./07-meta-reviewer.md) | 7 | Anna Wintour | Rubric verdict |
