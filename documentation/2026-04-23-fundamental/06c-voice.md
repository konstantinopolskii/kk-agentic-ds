---
session: 2026-04-23-fundamental
stage: 6c-rerun
role: voice
input: demos/fundamental/index.html (stage 5 rerun)
output: per-block voice audit
gate: passes to stage 7
---

# Voice — 2026-04-23-fundamental (rerun)

Cold read against `skills/kk-design-system/voice.md`. Flags only. Silence on a vector = confirmed clean.

## Block — Sidebar

All seven vectors pass.

## Block — Doc intro

All seven vectors pass.

## Block — Prose / Opening

All seven vectors pass.

## Block — Prose / Reading

All seven vectors pass.

## Block — Prose / Lists

### AI tells

- `demos/fundamental/index.html:162` — "softer beat, one notch smaller and muted" — rule-of-three adjective phrase inside the aside illustration. Voice.md §Sentence shapes to cut: "three-item adjective lists for fake completeness. Cut one, or all."

### Button labels, empty states, error messages, sentence case, em-dash + italics, muted + light weight

Pass.

## Block — Prose / Figures

### AI tells

- `demos/fundamental/index.html:181` — "Citation below, micro, muted." — three-item comma list describing the citation. Voice.md §Sentence shapes to cut: rule of three.

### Button labels, empty states, error messages, sentence case, em-dash + italics, muted + light weight

Pass.

## Block — Spec / Color

All seven vectors pass.

## Block — Spec / Space

All seven vectors pass.

## Block — Spec / Type

All seven vectors pass.

## Block — Spec / Motion

All seven vectors pass.

## Block — Controls / Cards

### AI tells

- `demos/fundamental/index.html:452` — "A caption sitting under the title." — `-ing` participle as filler. Voice.md §Words and verbs to cut: "Drop the participle; name the action." Tighter: "A caption under the title."

### Button labels, empty states, error messages, sentence case, em-dash + italics, muted + light weight

Pass.

## Block — Controls / Fields

### AI tells

- `demos/fundamental/index.html:493` — "A label and a value sharing one row." — `-ing` participle as filler. Voice.md §Words and verbs to cut. Tighter: "A label and a value share one row."

### Button labels, empty states, error messages, sentence case, em-dash + italics, muted + light weight

Pass.

## Block — Controls / Buttons

All seven vectors pass.

## Block — Controls / Tags

### AI tells

- `demos/fundamental/index.html:534` — "Metadata, not action" — soft "not A, but B" shape in the sub-heading. Voice.md §Sentence shapes to cut: "Not A, but B: usually just say B." Tighter: "Metadata only."

### Button labels, empty states, error messages, sentence case, em-dash + italics, muted + light weight

Pass.

## Block — Controls / Switches

All seven vectors pass.

## Block — Collections / Card stack

All seven vectors pass.

## Block — Collections / Deck

All seven vectors pass.

## Block — Margin / Signoff

All seven vectors pass.

## Block — Inspector / Tweak

All seven vectors pass.

## Block — Inspector / Comments

### AI tells

- `demos/fundamental/index.html:952` — "Archived for future retrieval." — noun-phrase padding, copula-adjacent. The caption tells the reader nothing beyond the state the card already carries. Voice.md §Words and verbs to cut: "Copula avoidance." Cut or replace with a concrete line.

### Button labels, empty states, error messages, sentence case, em-dash + italics, muted + light weight

Pass.

## Summary

Most flags: Prose / Lists, Prose / Figures, Controls / Cards, Controls / Fields, Controls / Tags, Inspector / Comments each carry one AI-tell flag. Zero-flag blocks: Sidebar, Doc intro, Prose / Opening, Prose / Reading, Spec / Color, Spec / Space, Spec / Type, Spec / Motion, Controls / Buttons, Controls / Switches, Collections / Card stack, Collections / Deck, Margin / Signoff, Inspector / Tweak.

Six defects flagged, all AI tells (rule-of-three, `-ing` participle, soft "not A, but B", copula-adjacent padding). Button-label discipline, empty-state shape, error shape, sentence case, em-dash rule, muted + light-weight rules: all clean across the file.
