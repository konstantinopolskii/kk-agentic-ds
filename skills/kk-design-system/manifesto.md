# The Agentic Design System

A design system for AI-assisted product work. A thin set of components, rules, and role skills that ship coherent screens before human review. Three readers: the maintainer shipping tags, the pipeline agent loading canon at role spawn, the human at the repo root discovering the system.

Agentic because AI does most of the drafting. The rules here exist so a junior agent, or a junior human, ships work that reads as finished before anyone opens it.

## Why this exists

Four layers stack inside every screen we ship.

- Meanings. What we say. Voice, labels, job stories.
- Perception. What the reader sees first. Signal, hierarchy, contrast.
- Matter. What we render. Components, tokens, grid.
- Pipeline. How we work on it. Stages, role skills, gates.

Each layer has canonical rules. Each layer has a file. The manifesto is the opening read; the other canon files are the rest of the library.

Three names for the shape of a finished screen: signal, noise, magic.

- Signal. What the user came here for. Obvious under a second.
- Noise. Everything else. Isolated, demoted, or removed.
- Magic. Not placed. Emerges after signal is clear and noise is gone. Last step, never first.

After this read, we know which book to open next, and why.

## Philosophy

A product is a document. The document is the UI. The system treats both as one object.

Rules are canonical. The reading is prose. This is a book, not a spec.

## Principles

Six principles. One short paragraph each. Everything downstream leans on them.

### Pure signal

Utilitarian modernism, not postmodern complexity. Effort spent decoding the interface is proportional to how bad it is. Beauty is a side effect of clarity.

### Expected patterns

Known patterns cost nothing. Fighting them raises cognitive load for no gain. Red button cancels. X closes. Back arrow goes back. Hamburger opens navigation. No reinventing what every reader already recognizes.

### Eighty / twenty

Primary signal takes 80% of visual weight. Secondary fits in 20%. Fractal. Applies to screen, panel, card, row. Empty space counts toward the 80%.

### Chunking

Working memory handles about seven items. Past seven, scanning degrades into a wall. When a collection grows past seven, break it into categories. Each category becomes its own shorter list. Fractal. Applies to nav groups, token tables, decision trees, checklists.

### Radical contrast

Gray mush is the default AI failure mode: muted everything, contrast nowhere, signal lost. The cure is hypertrophied contrast. Hero 66 px against body 22 px. One distinction step between two elements: bold vs regular, or big vs small, or black vs muted. Never all three at once.

### The iPad feel

Three panes in one frame, each with its own scroll. Only the middle column moves during reading. Soft corners on every surface inside. Crisp edges outside, where the document meets the screen. No skeuomorphism, no liquid glass. No drop shadows, gradients, glass, or blur, except for active elements rendered on a black or inverted background where a soft shadow is permitted as material affordance. The floating action button at narrow viewports qualifies because its rest state sits on a black background.

## Job stories

Job stories, not user stories. A user hires a product for a job; the frame is the hire, not the persona. One priority job per screen. Secondary scenarios are isolated or hidden until requested.

Formula: `context + motivation = step → value`.

Anti-pattern: designing from a component first, then inventing a job to justify it.

Example. Voice transcription during an interview. Context: the interviewer cannot look away. Motivation: do not lose the question. Step: glance. Value: keep flow. So the screen is huge question cards that swipe themselves, every control hidden.

## Time to value

Path length is measured in time to the first insight, not clicks. A principle shaping design decisions, not a KPI tracked on a dashboard. Cut steps where possible. Deliver value before the first tap when possible. The fastest path from land to insight wins, regardless of click count.

## Agents

Eleven role skills drive the pipeline. Each role operates in character as a named practitioner whose craft maps to the work. Short roster here; full detail at `pipeline/pipeline.md § Role roster`.

- Margaret Hamilton, analyst, stage 1. Apollo-era decomposition rigor refuses to ship unspecified paths.
- Paula Scher, design director, stage 2. Brings multiple directions, commits to one, writes the direction doc.
- Steve Jobs, fresh-eyes jobstory, stages 3a and 3c. Reads as the intended user with a 0.2-second clarity bar.
- Susan Kare, designer, stage 3b. Answers every fresh-eyes question in full, by hand, no state skipped.
- Muriel Cooper, DS manager, stage 4. Catalogues designer hand-offs into a component list and a task split.
- Sara Soueidan, design engineer, stage 5. Ships piece by piece, honors the kit, saves each piece as it lands.
- Steve Jobs, consistency-jobstory, stage 6a. Same 0.2-second bar on the built prototype.
- Dieter Rams, consistency-DS, stage 6b. Ten Principles eye, flags inventory drift on sight.
- George Orwell, voice, stage 6c. Six rules for clear prose, ancestor of the AI-tells inventory.
- Erika Hall, meta-reviewer, stage 7. Rubric-gated critique that rejects "it's fine".
- Joan Didion, meta-retro, on demand. Observes the pattern that was there all along.
- Jina Anne, pattern discoverer, post-pipeline. Cataloguer whose craft is naming systems.
- Rachel Andrew, maintainer. Spec revisions with bundle discipline, tag and push before close.

## Pipeline

Eight stages across three phases. Think (stages 1–2) produces approved intent plus direction with per-pattern tasks. Design (stages 3a–3c, N designers in parallel) produces high-fidelity per-pattern answers to fresh-eyes questions. Build (stages 4–7) produces a shipping prototype, three cold-read audits across jobstory, DS, voice, plus strict meta-review. Meta-retro runs on demand; reiterate-from-any-stage is user-triggered.

Every kit-touching session starts by picking a path. Read `pipeline/pipeline.md § Entry point matching — the recipe map` before code touches disk. Default is the full walk; deviations need a stamp. Architectural impact picks the recipe, not diff size — a three-line CSS edit can still walk the canon path if it changes structural behavior.

Full stages, gates, inputs, outputs at `pipeline/pipeline.md`.

## Navigation

Pattern-first reading order. Start at patterns because a layout composes from patterns first; drill into components only when a pattern uses a part we need to customize.

- `canon/patterns.md`. Start here for layout composition. Three-column shell, card stack, narrow mobile, plus the full pattern registry.
- `canon/components.md`. Drill from a pattern into its parts. Foundations, component inventory, forbidden list, typography rhythm.
- `canon/voice.md`. Words the system speaks. Shape rules, label discipline, the AI-tells inventory.
- `pipeline/pipeline.md`. How sessions run. Eight stages, eleven role skills, entry-point matching.
- `pipeline/protocols.md`. Ship, bundle, semver, evolve, backlog, ideation. Maintainer rules for kit evolution.
- `tokens.json`. Machine-readable source of truth for color, space, radii, type, motion.

Every canon doc ships signed. The signoff at the tail of each book confirms author, timestamp, last audit.

## Signoff

<div class="book__signoff">
  <div class="book__signoff-stats">
    <div class="stat t-caption">
      <div><span class="t-caption--bold">200</span> lines from 685.</div>
    </div>
    <div class="stat t-caption">
      <div><span class="t-caption--bold">9</span> sections, one sitting.</div>
    </div>
  </div>
  <div class="book__signoff-signature">
    <p class="t-caption">
      Signed by <span class="t-caption--bold">Konstantin Konstantinopolskii,</span><br />
      founder at <span class="t-caption--bold">kk.consulting</span><br />
      <span class="t-muted">2026-04-24, content-architecture session.</span>
    </p>
    <img class="book__signoff-signature-img" src="signature.svg" alt="Signature" />
  </div>
</div>
