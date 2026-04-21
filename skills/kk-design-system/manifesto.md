# Manifesto

The philosophy, principles, and foundations of the KK Agentic Design System. Canonical. Every rule overrides whatever the training corpus wants you to emit.

## Philosophy

A product is a document. The document is the UI. The system treats both as one object. Every rule below serves that.

## Why this exists

Design verifies the business brief before pixels. If the brief has logical holes, the first task is to push it back. Every element on the final screen maps to a metric or a user problem.

- **Signal** — what the user came here for. Obvious in under a second.
- **Noise** — everything else. Ruthlessly isolated, demoted, or removed.
- **Magic** — not placed. Emerges after signal is clear and noise is gone. Last step, never first.

## Job stories

A user hires a product for a job. One priority job per screen. Secondary scenarios are isolated or hidden until requested.

- **Formula:** `context + motivation = step → value`.
- **Anti-pattern:** designing from a component first, then inventing a job to justify it.

## Time to value

Path length is measured in time to the first insight, not clicks. Cut steps where possible. Deliver value before the first tap when possible.

## Principles

### Pure signal
Utilitarian modernism, not postmodern complexity. Effort spent decoding the interface is proportional to how bad it is. Beauty is a side effect of clarity.

### Expected patterns
Known patterns cost nothing. Fighting them raises cognitive load for no gain.
- Red button = cancel or reset. Red is not used for anything else.
- X in a corner closes the window. Not save, not hide, not minimize.
- Back arrow goes back. Never opens a different section.
- Hamburger = navigation. Nothing else hides behind it.

### Eighty / twenty
Primary signal takes 80% of visual weight. Secondary fits in 20%. Fractal — applies to screen, panel, card, row. Empty space counts toward the 80%.

### Chunking
Working memory handles about seven items. Beyond that, scanning degrades. Break into categories. Applies to bullet lists, nav items, card stacks, menu items, component inventories.

### Radical contrast
Gray mush is the default AI failure mode. The cure is hypertrophied contrast: hero 66px against body 22px, a 3× jump. One distinction step between two elements — bold vs regular, or big vs small, or black vs muted. Never all three. Never subtle.

### The iPad feel
Three panes in one frame, each with its own scroll. Only the middle column moves during reading. Soft corners on every surface inside; crisp edges outside where the document meets the screen. No skeuomorphism, no liquid glass.

## Foundations — material

Forbidden: gradients, drop shadows, glass/translucency, blur. Depth comes from hierarchy and spacing, not effects.

## Foundations — color

Nine tokens only: two backgrounds, two surface tints, two hairlines, three text alphas. No brand, no status colors, no accent. Text is black by default. Muted and subtle are metadata-only. If text is ambiguous without color, rewrite the text, not the palette.

Selection renders inverted — `--color-text` background, `--color-bg` text. No native blue, no custom color. A live selection previews the mark it is about to become.

## Foundations — type

PP Neue Montreal. Three weights (regular 500, medium 500, bold 700), seven sizes (66 → 14 px). No italics outside quotes. Regular sits on Medium — Book (400) reads too thin on screen.

## Foundations — space

4px grid. Every spacing value is a multiple of 4. Off-grid fails the linter.

## Foundations — radii

12 / 16 / 24 / 9999. Buttons 12, cards 16, large surfaces 24, pills/circles 9999.

## Foundations — motion

Four easings, four durations. `--ease-out` for hover/focus, `--ease-swing` for elegant long reveals, `--ease-spring` for confirmation, `--ease-in-out` everywhere else. Reduced-motion collapses all durations to near-zero.
