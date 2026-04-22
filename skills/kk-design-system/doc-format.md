# Documentation format

Shared by every role skill in the pipeline. Each role's `SKILL.md` references this file for output shape so the contract stays in one place.

## Two artifacts per stage

Every role produces two artifacts, both mandatory.

1. **Conversation return** — a short structured message the human reads in under a minute.
2. **Disk artifact** — a file under `documentation/<session>/NN-<role>.md` that preserves raw user input plus the role's output for retros.

A role has not delivered until both exist.

## Session slug

At the top of stage 1 the analyst coins the session slug. Format: `YYYY-MM-DD-<short-product-slug>`. Example: `2026-04-22-wealthy-alpha`. Every stage in the same session writes into `documentation/<slug>/`.

## Disk artifact — frontmatter spec

Every `NN-<role>.md` file starts with this block:

```yaml
---
session: <session slug>
stage: <stage number 1..10, or "retro">
role: <role name, e.g. analyst, art-director, frontend-engineer>
input: <path or short description of this stage's input>
output: <one-line summary of what the stage produced>
gate: <gate result, e.g. "user approved", "passed to stage 2", "failed - returned to stage 4">
---
```

Keep values short — one line each. Anything longer lives in the body.

## Disk artifact — body structure

Every body starts with a one-sentence description of what the stage did, then these sections in order:

1. `## Raw input` — Verbatim user message in a blockquote. If the stage received a file, reference the path and include a short digest. If the stage received prior-stage output, point to that file.
2. `## <role-specific section>` — The role's actual output. What sections exist here depends on the role; each role skill documents its own set.
3. `## Gate` — Pass or fail. On fail, name which earlier stage owns the failure.
4. `## Hand-off` — Which stage runs next, and what file path it will read.

## Conversation return — shape

Short enough to fit in one screen. Markdown, no preamble. Sections match the role's purpose but stay tight:

```
# <Role> — <session slug>

## <section>
<content>

## <section>
<content>

## <section>
<content>
```

A role that cannot fit its return in one screen is returning too much. Split into multiple turns or move detail to the disk artifact.

## README.md

The analyst creates `documentation/<session>/README.md` at stage 1. Each subsequent stage appends to the file index at the bottom.

Initial README:

```markdown
# Session — <product slug>

Date: <YYYY-MM-DD>
Owner: <user name>
Product: <one line>
Entry point: <stage range from analyst>
Kit version: <version>

## Outcome
<to be filled at ship>

## File index

| File | Stage | Role | What |
|---|---|---|---|
| [00-brief.md](./00-brief.md) | 0 | user | Original ask |
| [01-analyst.md](./01-analyst.md) | 1 | analyst | Decomposition |
```

Each subsequent stage adds its own row.

## Pointers, not copies

Build artifacts (HTML, CSS, JS, Figma files) live in their own repo locations. The documentation references them with relative paths plus a one-line digest. Copying bloats the folder and drifts when the code changes.

## Raw input verbatim

The raw input section of every artifact preserves the user's message exactly as typed. Do not summarize, restyle, or translate. A retro reconstructs what the user actually said — the model's interpretation of their words lives in the role sections below, clearly separated.

## Archive, do not delete

Rejected options (unused directions from stage 2, unused concepts from stage 3, unused hand-offs from stage 7) stay in the session folder. Never delete. A retro often learns more from the rejected option than the chosen one.
