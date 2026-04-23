---
session: 2026-04-23-fundamental
stage: post-pipeline
role: design-engineer
input: patterns.html (pre-rework) + phase-3-discovery.md + demos/fundamental--accepted/patterns/*.html
output: patterns.html rewritten to three-column shell with always-visible 25%-scale preview
gate: awaiting maintainer pass on canon proposals
---

# Phase 3 — patterns.html rework

Second pass on the registry. First pass used iframe-in-`<details>` inside the doc column. That UX broke on clipping and scroll inheritance. Rework drops disclosure entirely, promotes the iframe to the right column, scales it to 25%, and lets the whole doc column become a list of clickable cards that drive the preview.

## Files shipped

- `patterns.html` — full rewrite. Three-column shell, 44 clickable cards in the doc column, always-visible scaled preview in the inspector.
- `js/patterns.js` — local behavioural layer. Wires `[data-preview-src]` triggers to the inspector's `[data-preview-target]` iframe.

## Entries landed

- Atoms: **24**. One card per bullet in `phase-3-discovery.md § Atoms registered`. Color tokens, space tokens, and motion tokens each ship as one card — the run report grouped those on one line apiece, so the registry reflects that granularity. If per-token rows are wanted, that is a data split, not a layout change.
- Elements: **9**. One card per bullet in `§ Elements registered`.
- Patterns: **10**. One card per bullet in `§ Patterns registered`. Card stack carries `data-preview-default`; it loads on first paint.

The brief said "25 / 9 / 10." Run report has 24 / 9 / 10. Flagging the one-atom delta below.

## Shell structure

Matches `demos/fundamental--accepted/index.html`:

- `.app[data-view="doc"]` wraps three siblings.
- `.sidebar` carries the Patterns title, a Registry nav group (Atoms / Elements / Patterns), a Sources nav group (Kit canon → `./index.html`, Fundamental → `./demos/fundamental--accepted/index.html`), and the footer.
- `.doc` carries the three `.doc__section` articles.
- `.inspector` carries one `.inspector__group` with a `.card.card--heading` titled "Preview" and the `.preview-frame` wrapper around the iframe.

## Doc card contract

Every atom, element, and pattern entry is a `.card.card--interactive` directly in the doc column. No `.card__collapsible` child, so the kit's collapsible animation does not fire. `cursor: pointer` and the default hover surface come from existing canon rules. Active state is flagged by `data-state="active"` on the card itself.

Each card carries:

- `data-preview-src` — the iframe source.
- `data-preview-label` — the label used in the iframe `title` attribute.
- (Patterns only) `data-preview-default` on the first pattern card (Card stack), so it loads on page render.

Atom and element cards point at `demos/fundamental--accepted/index.html#<anchor>` — same anchors the previous registry used. Anchors verified against `demos/fundamental--accepted/index.html`: opening, reading, lists, figures, color, space, motion, cards, fields, buttons, tags, switches, stack, deck, signoff — all present. Two atoms have no anchor in the fundamental demo (`.comment-msg`, `.fab`) and point at the demo's root; those are exception cards flagged for a separate fix pass.

Pattern cards carry a small `t-micro` file:line citation under the caption plus a `.preview-escape` link at the bottom opening the slice in a new tab. The link carries `data-preview-escape` so the click handler skips it and lets the native anchor fire.

## Inspector preview

One `.preview-frame` wrapper inside the inspector. The iframe inside renders at `width: 400%; height: 400%; transform: scale(0.25); transform-origin: top left`. The wrapper carries `overflow: hidden`, a 0.5px border, and a height of `calc(100vh - var(--space-20) - var(--space-20))` with a 420px floor. At 25% that gives a preview equivalent to four viewports tall, which is enough to show the full shape of every slice.

`--inspector-w` sits at 420px in `vars.css`. Column grid floors at 340px at 1024 viewport width (per `style.css § .app`), so the preview survives the breakpoint. Below 1024 the inspector hides by default on `[data-view="doc"]` — same behavior as every other kit prototype; we accept the narrow-view loss until someone asks for a mobile preview flow.

## JS wiring decision — Option B

**Picked Option B** — a local `js/patterns.js` file loaded only by `patterns.html` after `kit.js`.

Reason: the feature is one-page-specific today. Option A (a generic `[data-preview-src]` module in kit.js) ships infrastructure before a second consumer exists. Option C (inline `<script>`) is the same anti-pattern we just paid down in the inline `<style>` — no.

The handler in `js/patterns.js`:

```js
document.addEventListener('click', function (e) {
  if (e.target.closest('[data-preview-escape]')) return;
  var trigger = e.target.closest('[data-preview-src]');
  if (!trigger) return;
  e.preventDefault();
  frame.setAttribute('src', trigger.getAttribute('data-preview-src'));
  triggers.forEach(function (t) {
    if (t === trigger) t.setAttribute('data-state', 'active');
    else t.removeAttribute('data-state');
  });
});
```

Plus an initial-paint bootstrap that honors `[data-preview-default]` (Card stack today) with a fall-through to the first `[data-preview-src]` inside `#patterns`.

**Flag for maintainer:** if a second consumer lands (any doc page that wants a scaled-iframe preview), promote this handler into `kit.js` as a generic module keyed off `[data-preview-src]` + `[data-preview-target]`. The API is stable enough to land verbatim. Until then, local file keeps the consumer surface thin.

## Canon proposals

All proposals stay on disk here. No canon edits shipped this pass.

### 1. `.preview-frame` — new primitive (land in `style.css § Registry surfaces`)

```css
.preview-frame {
  position: relative;
  width: 100%;
  height: calc(100vh - var(--space-20) - var(--space-20));
  min-height: 420px;
  border: 0.5px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  overflow: hidden;
}
.preview-frame__iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 400%;
  height: 400%;
  border: 0;
  transform: scale(0.25);
  transform-origin: top left;
}
```

Built on kit tokens only (`--color-border`, `--radius-md`, `--color-bg`, `--space-20`). No new tokens. Scale ratio (0.25) and the 400% mirror are load-bearing and should stay constants; if a second ratio is ever needed, a modifier class `.preview-frame--half` with its own width/height/scale trio earns its keep.

### 2. `.registry-frame` — recommend retire

Currently canonized (`style.css:400`, `components.md:200-215`). After the rework there are no consumers in the repo. Recommend retire — the scaled preview primitive covers the only registry need and the unscaled frame was only ever used because the old UX could not afford 4x height.

If we want to preserve an unscaled `.registry-frame` as a base rule and `.preview-frame` as a scale variant, the cleaner shape is a single class with the scale opt-in as a modifier. My vote is retire outright and ship `.preview-frame` as the only registry-preview primitive.

### 3. `.registry-disclosure` — retire

Currently canonized (`style.css:412`, `components.md:206-215`). Rework drops the `<details>` shape. Zero consumers. Retire.

### 4. `.preview-escape` — local utility, flag for canonization decision

Small inline-flex link used for the "Open in new tab" escape hatch on pattern cards. Built on `--space-1`, `--space-2`, `--color-text-muted`, `--color-text`. Could ship as `.t-micro--escape` if we want it under the type system, or as a doc-only utility. My vote: wait to see if a second consumer wants it before canonizing.

### 5. `.card--interactive[data-state="active"]:not(.inspector *)` override — flag

The inspector's shout-inversion rule only scopes to `.inspector .card--interactive[data-state="active"]`. In the doc column, an active `.card--interactive` has no canonical active surface — the kit never promotes interactive cards outside the inspector. I added a local `--color-surface-strong` background so the active card reads distinct from its minimized siblings.

Maintainer decision: do we canonize an active-state surface for doc-column `.card--interactive`, or keep the interactive-card behavior scoped to the inspector and treat the doc use as a registry-only exception? If the registry is the only outside-inspector use, this override stays local.

### 6. `kit.js` preview-loader — defer

Covered in the wiring-decision section above. Proposal is live in `js/patterns.js` today; maintainer decides on promotion.

## Voice check

Every label is sentence case. No em-dashes in headings. No filler adjectives, no `−ing` lead-ins, no weasel attribution. Captions are factual single-sentence beats pulled from the prior registry and the run report. No AI tells.

## Open question

The one-atom count mismatch between the brief (25) and the run report (24). The brief also groups color, space, and motion tokens as "25 atoms" — if the intent is one card per individual token (so `--color-bg`, `--color-bg-muted`, etc each become their own card), the registry grows from 24 to ~35 atom cards. Flagging for KK's call on granularity. Current ship: one card per run-report bullet, which gives 24.
