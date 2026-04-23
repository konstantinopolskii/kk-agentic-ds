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

## Foundations

Token inventories (swatches, scale tables, space / radii / motion tables) live in the fundamental demo and in `tokens.json`. The sections below carry the why.

### Material

No skeuomorphic surfaces. Depth comes from hierarchy and spacing, not from effects. Four things are forbidden: gradients, drop shadows, glass / translucency, blur. Each fakes light or depth the screen cannot carry; each trades clarity for decoration.

### Color

Nine tokens: two backgrounds, two surface tints, two hairlines, three text alphas. No brand, no status colors, no accent.

Text is black. Muted and subtle are for metadata only — bylines, captions, hairlines. One distinction step per pair. Stacking color tiers creates [gray mush](#radical-contrast).

If the text is ambiguous without color, rewrite the text, not the palette. The full swatch inventory lives in the fundamental demo.

Selection renders inverted — `--color-text` background, `--color-bg` text. No native blue, no custom color. A live selection previews the mark it is about to become.

### Type

Commissioner. A variable font (SIL OFL 1.1) by Kostas Bartsokas. Three weights used in the kit (regular, medium, bold), seven sizes (66 to 14 px). No italics outside of quotes.

One distinction step between two elements: bold vs regular, or big vs small, or black vs muted. Never all three. Never subtle.

Regular sits on Medium 500 because the 400 axis reads too thin on screen at body size. Light weight is forbidden unless the content is metadata or the user asks.

### Space

All gaps, padding, margins snap to multiples of 4. Larger jumps mean larger semantic distance. A 13 px gap means we need a different component. Off-grid fails the linter.

### Typography rhythm

Source: Artemy Lebedev, Bureau, "Rule of Inner and Outer" (bureau.ru/soviet/20140818/).

Core principle: **inner ≤ outer**. Space inside a group never exceeds space between groups. When that relation inverts, the eye mis-parses structure and the page reads wrong.

Fourteen rules. Each is canonical on every doc surface rendered in the kit.

1. Capitals require letter-spacing.
2. Lowercase never carries letter-spacing.
3. Vertical strokes align at equal intervals.
4. Letter-spacing of capitals stays below their line-height.
5. Line-spacing between capital lines equals or exceeds cap height.
6. Line-height exceeds word-spacing.
7. Descenders nearly touch ascenders at minimum line-height.
8. Longer lines require greater line-height.
9. Line-height stays at or below outer page margins.
10. List item spacing exceeds line-height.
11. Page numbers sit closer to the text block than to the page edge.
12. Headings sit closer to the following paragraph than to the previous.
13. Heading-to-paragraph spacing equals or exceeds the heading's own line-height.
14. Inner spacing stays at or below outer spacing. The core relation, restated.

Rule 12 bites hardest in practice. A heading with equal top and bottom margins visually groups with the wrong paragraph. Fix: top margin greater than bottom, so the heading visibly leads what follows.

Rule 13 is the second most-broken: a heading whose next line sits closer than its own line-height reads as cramped. Measure the heading's line-height, set the space below to at least that value.

Rule 14 audits any vertical list of values. If the padding inside a card exceeds the space between cards, the cards fail to group. Same for section body versus section separator.

Label-list pairs fall under rule 14 too. A paragraph ending in `:` followed by a list is a label-list pair — ship them tight. Gap between label and list sits well below paragraph rhythm so the label reads as caption of the list, not as continuation of the prose above.

Rule 12 ratio floor in practice: top margin ≥ 2× bottom margin on any heading sitting inside a dense text column. 1.5:1 reads roughly equal at the 0.2-second bar; 2:1 reads as clear lead.

Markdown embedded inside a `data-md-src` article renders with heading levels shifted +1 by default. An author writes `#` for their file's top heading and the shell places it at the article's h2 rank — the page already carries its own h1 and the part heading already owns hero size, so a second hero inside the article collapses the hierarchy. A container opts out with `data-md-heading-offset="0"` when the markdown file is the page root. Shifted levels cap at h4 so the kit class map always resolves.

Quotes render black, Medium 500, italic. The italic face carries the citation. Muting the colour would bury the quote against surrounding body and contradict the no-muted-by-default rule. A quote is content, not metadata.

Raw HTML blocks embedded in prose carry a muted caption line above naming what the block is, for example `<p class="t-caption t-muted">Example</p>`. Without the caption the embedded block competes with section headings for attention and reads as a standalone callout rather than an illustration of what the pattern looks like.

### Radii

Two radii plus one pill alias. 12px for buttons, tiers, switches, fields. 24px for cards and anything that holds content. 9999px for pills: switch thumbs, avatars, scrollbars. A third canonical radius is forbidden.

### Motion

Default: `200ms × ease-out` on `transform` and `opacity` only. Four easing curves, four roles: ease-out for functional settles, ease-spring for small confirmations, ease-swing for long reveals, ease-in-out for motion that continues past the frame.

Press feedback: every tappable surface scales to `0.96` on `:active`.

On `prefers-reduced-motion`, every duration drops to `0.01ms`. State changes instantly.

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
  threadId:     'c1735012345-123', // local DOM id; do not send to server
  messageId:    'm1735012346-456', // local id of the seed message
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
  action:    'reply',
  threadId:  'c1735012345-123',
  messageId: 'm1735012789-012', // local id of the new reply message
  text:      'reply body'
}
```

Payload for `action === 'delete'`:

```js
{
  action:        'delete',
  threadId:      'c1735012345-123',
  messageId:     'm1735012789-012',
  threadRemoved: true              // true if deleting this message emptied the thread
}
```

Payload for `action === 'approve'`:

```js
{
  action:          'approve',
  threadId:        'c1735012345-123',
  messageId:       'm1735012789-012',   // the agent-reply message whose text is approved
  replacementText: 'approved replacement text',
  anchorQuote:     'the original quote',
  anchorPrefix:    '…up to 20 chars before',
  anchorSuffix:    '20 chars after…',
  cluster:         'strategy',
  sectionSlug:     'targeting'
}
```

Payload for `action === 'archive'`:

```js
{
  action:        'archive',
  threadId:      'c1735012345-123',
  threadRemoved: false              // thread kept under data-archived="true", not removed
}
```

Approve is gated at the UI level: the kebab's Approve item is hidden unless the thread's last list message carries `data-author-role="agent"`. Consumers set `data-author-role="agent"` on agent-authored `.comment-msg` nodes at render time; kit never classifies messages by itself. The full list of actions in 0.13.0 is `new`, `reply`, `delete`, `approve`, `archive`.

Every `.comment-msg` carries `data-message-id`. Kit stamps it at creation time; consumers pre-rendering server-side HTML can set the attribute to the server's real id and skip the local-to-server mapping layer for seeded threads.

Field names follow JS convention (camelCase). Kit does not know about authentication — servers set the author from session context, not a client-declared field. Kit does not send thread or message ids to the wire; consumers map local ids to server-issued ids through their own state when a persist call returns.

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

Full consumer-facing integration surface (Flask, Next.js, Rails snippets; anti-patterns; the enable-or-own decision tree) lives in `docs/integration/comment.md`. Edit actions and re-surface-archived UI deferred until a consumer asks.

### Integration docs convention

A component earns a file under `docs/integration/<component>.md` the first time it ships a consumer-facing API — events, config keys, data attributes consumers set, exported helpers. The doc carries every API surface in one place plus patterns for the main backend languages. Today only the Comment component qualifies; other components are delegation-based and have no public hooks to document.

Once the doc exists, it is a required part of every bundle that changes its component's API. Maintainers update it in the same PR as the code; frontend engineers flag changes during refactors. The doc stays in the repo under `docs/` so humans browsing on GitHub find it naturally, and it ships in the npm package so consumers read the version they are pinned to.

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

Work moves through eight stages across three phases. Think (stages 1-2) produces approved intent + direction document with per-pattern tasks. Design (stages 3a-3c, with N parallel designers) produces high-fidelity per-pattern ASCII answering fresh-eyes questions. Build (stages 4-7) produces a shipping prototype plus three cold-read audits (jobstory, DS, voice) plus strict meta-review. A meta-retro runs on demand; reiterate-from-any-stage is user-triggered.

Eleven role skills cover the stages. No in-pipeline canon changes — proposals route through `kk-ds-maintainer` via retro.

Pipeline entry matches scope. A typo enters at stage 3b against an affected pattern. A kit refactor enters at stage 1 plus stage 5 in DS-engineer mode. A new page walks all eight. Nothing forces the full walk on work that does not need it.

Full stage list, gates, inputs, outputs, and canon-load per role live in `pipeline.md`.

## Documentation contract

Every stage writes its own file to `documentation/<session>/NN-<role>.md` as its final step. Each file carries frontmatter (`session`, `stage`, `role`, `input`, `output`, `gate`), preserves the raw user input verbatim where the stage received one, names the agent's output, and closes with the gate result.

Raw input is not summarized. Artifacts are linked by pointer, not copied. Rejected options stay in the session folder — a retro often learns more from the rejected branch than the shipped one.

Full contract, template, and README structure in `doc-format.md`.
