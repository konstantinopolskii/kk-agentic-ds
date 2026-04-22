---
session: 2026-04-22-wealthy-alpha
stage: 0
role: user
input: none
output: referenced materials inventory
gate: hand to analyst
---

# Stage 0 — Inputs

Every referenced document, with a one-paragraph digest so a retro can follow without re-reading the originals.

## Materials provided

### 1. `wealthy-pipeline-handoff.md`

Path: `/Users/kostyantinopolskii/Downloads/wealthy-pipeline-handoff.md` (14 KB, 195 lines)

Canonical product spec. Two surfaces (operator + client) share one document. Seven pipeline stages (`brief → prompt → research → draft → review → signoff → delivered`). Comments are first-class data: operator and client threads both persist, feed back into agent prompts. Subscription tiers belong to the client's right panel. Voice rules passed from `@kk/design-system` v0.4.0. Ten open questions documented including tier pricing, research passthrough, free-path content, operator multitenancy.

### 2. Flask architectural handoff (inline in user brief)

Existing reference implementation (`web/strategy_portal.py`, `web/admin/intro_strategy.py`, `services/intro_strategy/*`, tables in `database.py:749-840`). Lists 17 pain points across critical/architecture/UX. Mentor portal is Notion-like three-column layout. Client portal is token-gated, read-only until signed.

### 3. `KK-Design-System-f7be3b55-dba0.json`

Path: `/Users/kostyantinopolskii/Downloads/KK-Design-System-f7be3b55-dba0.json` (29 KB)

Fireflies call transcript, 2026-04-18, between Konstantin and Денис Бородин. Filename is misleading — this is not a Figma export. Konstantin walks Denis through the UI kit and describes the audit-to-strategy pipeline in his own words. Matches the handoff spec line for line. Useful as the origin story.

### 4. Reference strategy documents (3 files)

Paths:
- `/Users/kostyantinopolskii/Downloads/Стратегия (1).md` — Влад Осипов, pre-press consultant, 83 lines
- `/Users/kostyantinopolskii/Downloads/strategy_Anastasia_Aranovskaya_2.md` — Head of Project Office → PM in IT, 48 lines
- `/Users/kostyantinopolskii/Downloads/strategy_Nelly_Kam_1.md` — Lead Product Designer → Founding Designer, 69 lines

Shared structure: Точка А, Точка Б, позиционирование, бизнес-модель, беглый ресерч, гипотезы, каналы, план на кварталы, условия работы. All three have the "план на ближайшие кварталы" block, which the user later explicitly rejected for the new structure.

User framing: "None of them is ideal. The goal is to find the structure for the document itself. Use it as reference data."

### 5. `KK-Nelly-Kam-2d99cc63-2c68.json`

Path: `/Users/kostyantinopolskii/Downloads/KK-Nelly-Kam-2d99cc63-2c68.json` (83 KB, 345 sentences)

Fireflies call transcript for Нелли Кам, 21 апреля 2026, ~32 minutes. Two speakers: Konstantin and Nelly. Intake for `strategy_Nelly_Kam_1.md`. Cleanest intake→output pair in the reference set, which is why Nelly became the prototype mentee.

## Project architecture (local, where prototype lives)

Working dir: `/Users/kostyantinopolskii/Jupiter/Directions/ui-kit prototype/`
- `index.html` — 205 KB, manifesto (the design system rendered by itself)
- `style.css`, `vars.css` — kit stylesheets
- `fonts/manrope/` — self-hosted Manrope
- `signature.svg` — reusable signature glyph
- `skills/` — kk-design-system, kk-ds-supervisor, kk-ds-frontend, kk-ds-maintainer
- No JS file extracted from `index.html` — the kit's behavioral JS is inline in the manifesto page. This surfaces as a structural failure later in the session.

## Hand-off

→ Stage 1, `02-hypothesis.md`.
