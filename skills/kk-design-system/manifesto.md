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

Commissioner. Variable font, SIL OFL 1.1. Three kit weights (regular 500, medium 500, bold 700), seven sizes (66 → 14 px). No italics outside quotes. Regular sits on Medium — the 400 axis reads too thin on screen at body size.

## Foundations — space

4px grid. Every spacing value is a multiple of 4. Off-grid fails the linter.

## Foundations — radii

12 / 16 / 24 / 9999. Buttons 12, cards 16, large surfaces 24, pills/circles 9999.

## Foundations — motion

Four easings, four durations. `--ease-out` for hover/focus, `--ease-swing` for elegant long reveals, `--ease-spring` for confirmation, `--ease-in-out` everywhere else. Reduced-motion collapses all durations to near-zero.

## Runtime

The kit's behavioural JS ships in `js/kit.js`. One file. Plain script, no build step, no framework. Auto-inits on `DOMContentLoaded`. Six modules auto-wire: scroll-spy, narrow-view toggle, column reveal, inspector card stack, comment kebab menus, 3D deck. A seventh — the selection-to-draft comment flow — is opt-in via `KK.enableCommentSelectionFlow()` because pages with their own localized selection handler would collide with the kit's English default.

Public surface on `window.KK`: `KK.init()`, `KK.refresh()`, `KK.enableCommentSelectionFlow()`. Everything else is private. Consumers that need a deeper API wait for the next release — forcing the minimal surface keeps upgrade paths clean.

`KK.refresh()` re-scans the DOM after the consumer injects new elements (SPA-style swaps, lazy-loaded sections, route-driven content). Each module skips work already done and picks up new iterable elements — new decks, new doc sections, new inspector cards. Global listeners bind once; subsequent calls are near-free. Safe to over-call.

### Comment lifecycle events

Consumers that call `KK.enableCommentSelectionFlow()` and need to persist comments to their own backend listen for `kk:comment`, a `CustomEvent` dispatched on `.comment-stack` (bubbles to document). Two actions in 0.10.0:

- `new` — a draft was committed and a thread card was created.
- `reply` — a message was appended to an existing thread.

Payload for `action === 'new'`:

```js
{
  action:       'new',
  threadId:     'c1735012345-123', // local DOM id, for client-side mapping; do not send to server
  anchorQuote:  'selected text',
  anchorPrefix: '…up to 20 chars before',
  anchorSuffix: '20 chars after…',
  cluster:      'strategy',        // from nearest [data-cluster] ancestor, null if none
  sectionSlug:  'targeting',       // from nearest .doc__section id
  text:         'comment body'
}
```

Payload for `action === 'reply'`:

```js
{
  action:   'reply',
  threadId: 'c1735012345-123', // local id of the parent thread
  text:     'reply body'
}
```

Field names follow JS convention (camelCase). Kit does not know about authentication — servers set the author from session context, not a client-declared field. Kit does not send the thread id to the wire; consumers map local `threadId` to server-issued ids through their own state when a persist call returns.

Universal consumer pattern:

```js
document.addEventListener('kk:comment', function (e) {
  if (e.detail.action === 'new') {
    // fetch('/api/comment', { method: 'POST', body: JSON.stringify(e.detail) })
    // for Python/Ruby/PHP backends that expect snake_case, rename on the way out
  } else if (e.detail.action === 'reply') {
    // fetch('/api/comment', { method: 'POST', body: JSON.stringify({ parent_comment_id: map.get(e.detail.threadId), text: e.detail.text }) })
  }
});
```

Future actions (`delete`, `resolve`) blocked on per-message stable ids inside kit; deferred.

Text strings that kit.js injects into the DOM are overridable via `KK.config.i18n`, set before the script loads:

```html
<script>
  window.KK = { config: { i18n: {
    addComment: 'Ваш комментарий',
    reply: 'Ответить…',
    deckChoose: 'Выбрать',
    deckChosen: 'Выбрано'
  } } };
</script>
<script src="../js/kit.js"></script>
```

Four strings today: the draft input placeholder, the reply input placeholder, the deck's reset and chosen labels. Defaults are English. The consumer's HTML for deck buttons should match `deckChoose` so the reset path stays consistent.

Every consumer loads the same `kit.js` as the manifesto page. Fragments are not copied. Forking the behaviour is a maintainer change; copy-paste is not.

## Pipeline

Work moves through ten stages across three phases. Think (stages 1-3) produces approved intent. Hand-off (stages 4-7) produces three competing design packages and one human pick. Build (stages 8-10) produces a shipping prototype. A meta-retro runs on demand.

Nine role skills own the stages. Two existing review skills (`kk-ds-supervisor`, `kk-ds-frontend`) run as the consistency reviewer and frontend reviewer at stage 10.

Pipeline entry matches scope. A typo enters at stage 9. A kit refactor enters at stage 1 plus stage 8. A new page walks all ten. Nothing forces the full walk on work that does not need it.

Full stage list, gates, inputs, outputs, and canon-load per role live in `pipeline.md`.

## Documentation contract

Every stage writes its own file to `documentation/<session>/NN-<role>.md` as its final step. Each file carries frontmatter (`session`, `stage`, `role`, `input`, `output`, `gate`), preserves the raw user input verbatim where the stage received one, names the agent's output, and closes with the gate result.

Raw input is not summarized. Artifacts are linked by pointer, not copied. Rejected options stay in the session folder — a retro often learns more from the rejected branch than the shipped one.

Full contract, template, and README structure in `doc-format.md`.

## Revolutionary protocol

The revolutionary designer may break a manifesto rule only with a matching diff. Each broken rule ships as an entry in `manifest-diff.md` naming: the rule, the source file and section, the proposed replacement text, the reason tied to the job, the blast radius, and the rollback path.

Two human paths at stage 7. Reject the diff — the revolutionary hand-off falls back to the UX-driven variant and the build proceeds without the change. Accept the diff — `kk-ds-maintainer` runs before stage 8, updates the canon file, bumps the kit version, and then the build proceeds.

Accessibility floors (44×44 touch targets, semantic HTML, contrast) are not subject to the protocol. The revolutionary cannot trade those away.
