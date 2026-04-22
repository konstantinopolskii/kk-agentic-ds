# Session — Wealthy prototype, Nelly Kam, alpha

Date: 2026-04-22
Owner: Konstantin Konstantinopolskii
Product: Wealthy pipeline prototype, operator + client views
Mentee used for the strategy body: Нелли Кам
Kit version consumed: `@kk/design-system` v0.4.0 via local `vars.css` + `style.css`

## Outcome

- Shipped `prototype-alpha/` (HTML + CSS + JS) that renders the strategy, switches between operator and client roles via URL param, walks a seven-stage operator workflow, runs the comment→agent-reply→approve loop, gates client transcript + prices behind a shared review.
- Caught two process failures: inventory drift on the first pass (supervisor stage 4 fail, fixed via rebuild) and missing kit JS (deck hover, nav scroll-spy) not ported from `index.html`.
- Retro concluded the existing pipeline is underspecified. A ten-stage, nine-role pipeline is proposed in `10-retro.md`.

## File index

| File | Stage | Role | What |
|---|---|---|---|
| [00-brief.md](./00-brief.md) | 0 | User | Original ask, verbatim |
| [01-inputs.md](./01-inputs.md) | 0 | User | Referenced materials, pointers + digests |
| [02-hypothesis.md](./02-hypothesis.md) | 1 | Analyst | Decomposition, Q&A, locked decisions |
| [03-iteration.md](./03-iteration.md) | 2 | UX | Single-option structure (this is where the pipeline first went shallow) |
| [04-build.md](./04-build.md) | 3 | UI + Frontend | File artifacts, pointers into `prototype-alpha/` |
| [05-frontend-pass.md](./05-frontend-pass.md) | 4a | Frontend reviewer | Semantics, a11y, mobile fixes |
| [06-supervisor-fail.md](./06-supervisor-fail.md) | 4b | Supervisor | FAIL — 21+ classes outside kit prefixes |
| [07-rebuild.md](./07-rebuild.md) | 2→3 | UX + Frontend | Attribute-scoped gating rebuild |
| [08-supervisor-pass.md](./08-supervisor-pass.md) | 4b | Supervisor | PASS — kit-only inventory |
| [09-user-feedback.md](./09-user-feedback.md) | 5 | Human | Bug report, deck controller port |
| [10-retro.md](./10-retro.md) | — | Human + Analyst | Retro, redesign proposal, conclusions |

## Artifact pointers

| Path | What |
|---|---|
| `prototype-alpha/index.html` | 887 lines. Shell + strategy body + both inspectors + dev switcher. |
| `prototype-alpha/data.js` | 146 lines. Seed threads, mentee deck, tier inventory. |
| `prototype-alpha/app.js` | 526 lines. Role/stage routing, comment flow, review, sign, tiers, ported deck controller. |
| `prototype-alpha/prototype.css` | 114 lines. Attribute-scoped gating + tier heading layout. No new classes. |

## How to replay the session without the conversation

Read the files in the order of the index. Each file carries the raw user input that drove the stage, the agent output, and the gate result. You can reconstruct every decision, every rejected option, every fix — without re-prompting the model.

## Open issues inherited by the next session

1. Kit JS is inline in `index.html` and not shared — port to `kit.js`, un-break every future consumer.
2. Only one option explored at stage 2 — the process skipped the 3-to-5 alternatives the manifesto requires.
3. No per-role reviewers — one supervisor did logic, 80/20, inventory, and voice. Split into role-scoped reviewers.
4. No documentation-as-output contract — this session's docs are written after the fact, not by each stage's agent as it ran.

These are addressed in the proposed pipeline-v2 (`10-retro.md` → Conclusions).
