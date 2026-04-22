---
name: kk-design-system
description: Agentic Design System by Konstantin Konstantinopolskii. Use when rendering any document, strategy, audit, or UI in the KK system (kk.consulting, Wealthy pipeline, signed deliverables). Orchestrates the 10-stage pipeline (think, hand-off, build) via 9 role skills. Enforces nine-token palette, Commissioner typography, card/field/button inventory, no-AI-tells voice. Forbidden to invent components or off-grid values.
metadata:
  version: 0.1.0
  homepage: https://github.com/konstantinopolskii/kk-agentic-ds
---

# KK Agentic Design System

You are rendering inside the KK Agentic Design System. Every output — a strategy doc, an audit page, a form, an admin screen, a landing — lives inside one monochrome, iPad-feeling three-column shell. The system is not a reference; it is the frame your output must fit.

## Hard rules, before anything else

1. **Read the reference files in order:** `manifesto.md` → `tokens.json` → `components.md` → `voice.md` → `pipeline.md`. They are short. Read them, then write.
2. **Never invent a component.** If the inventory in `components.md` does not hold it, compose from what exists or stop and ask.
3. **Never invent a token.** Colors, spacing, radii, type sizes come from `tokens.json`. Off-grid values get rejected by the supervisor.
4. **Never default to muted or light weight.** Body text and structural markers (list numerals, bullets, key cells) render in `--color-text` (pure black) at `--fw-regular` (500). Muted and Book (400) are reserved for metadata only.
5. **Never use em-dashes in headlines.** Rare in body.
6. **Never emit AI-tells.** Filler adjectives, −ing participles, copula avoidance, not-just-but, rule of three, moralizing closers, weasel attribution, Title Case. See `voice.md` for the full inventory.
7. **One primary CTA per card.** Primary and minimized labels never match.
8. **Sign every document.** Ship with a `.signature` block at the end, authored.

## The pipeline is the protocol

Every UI task runs through five stages. Do not skip stages. Do not reorder them. Each stage has one agent role (you play them in sequence unless a subagent is explicitly wired up). The gate between stages is either a human approval or a check the previous stage's output holds.

### Stage 1 — Hypothesis defense (Analyst)
Decompose the brief into user, job story (`context + motivation = step → value`), and priority scenarios. Surface open questions. **Gate:** human approves the logic. No pixels until the brief holds.

### Stage 2 — Option iteration (UX / CX)
Produce 3–5 structural flow alternatives using only kit components. Mock data, no visual polish. What appears where, in what order, under which state. **Forbidden at this stage:** new components, custom colors, off-grid values, typography choices.

### Stage 3 — Contrast boost (UI)
Take the selected flow and apply hypertrophied visual hierarchy. Hero 3–4× body. Primary action dominates the frame. Secondary shrinks or hides. Every adjacent pair carries one clear distinction step (bold vs regular, big vs small, or black vs muted — never all three). Easier to dial contrast down than up.

### Stage 4 — Supervision (Supervisor)
Check three vectors in order:
1. **Logic** — does the layout still serve the job story from stage 1?
2. **80 / 20** — is one primary signal actually holding 80% of the weight, at every nesting (screen, panel, card, row)?
3. **Inventory** — did a junior agent invent a new component or token? If yes, reject and return to stage 2.

Failures are not patched. They return to iteration. The pipeline only flows forward when every gate passes. The `kk-ds-supervisor` skill runs this stage if wired up.

### Stage 5 — Magic injection (Human)
The layout arriving here is verified. The human art-directs: a specific illustration, a rewarding hover, a better label. Magic lands on a verified frame. It never replaces one.

## What to emit

- Raw HTML using kit classes, wired to `vars.css` + `style.css` (ship with the package).
- No Tailwind. No utility classes outside the kit. No inline styles for tokens (use variables).
- Link `<link rel="stylesheet" href="./vars.css">` and `<link rel="stylesheet" href="./style.css">` at the top. Preload the three Montreal weights.
- Three-column shell by default: `<aside class="sidebar">` + `<main class="doc">` + `<aside class="inspector">`. Narrow viewport collapses to one column, see `components.md` for the narrow pattern.

## When you're unsure

Ask. The user's standing feedback is: "I am a human, better ask than assume." A short clarifying question beats a silent default that misses the manifesto.

## Reference files, in this folder

- `manifesto.md` — philosophy, principles, foundations
- `tokens.json` — every token, machine-readable
- `components.md` — full inventory with class contracts and HTML snippets
- `voice.md` — tone rules, AI-tells to strip
- `pipeline.md` — expanded version of the 5 stages
- `patterns/strategy-doc.md` — the Wealthy / consulting strategy doc pattern (the canonical use case)
