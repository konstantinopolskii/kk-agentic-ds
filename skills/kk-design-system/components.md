# Component inventory

The kit stays small. Before adding anything, check this list. If an existing component fits, even awkwardly, use it. Adding a component requires a manifesto change (see `pipeline.md` → stage 4).

Nine components. Two patterns. Everything else is composition.

## Typography utility classes

Use these on any element. No inline styles.

| Class | Size | Use |
|-------|------|-----|
| `t-hero` | 66 / 66 | Document title. Once per page. |
| `t-display` | 38 / 38 | Section headings. |
| `t-display--medium` | 38 / 38 medium | Subtitle under a display heading. |
| `t-body` | 22 / 32 | Long-form body. |
| `t-title` | 22 / 28 | Card headings. |
| `t-subtitle` | 18 / 24 | Nav headers, spec keys. |
| `t-caption` | 16 / 24 | UI labels, body inside cards. |
| `t-caption--bold` | 16 / 24 bold | Emphasized caption. |
| `t-micro` | 14 / 20 | Captions, citations, metadata. |
| `t-mono` | inherited | Inline tokens, values, durations. |
| `t-muted` | — | Opacity to `--color-text-muted`. **Metadata only.** |
| `t-subtle` | — | Opacity to `--color-text-subtle`. Placeholders only. |

Forbidden: emitting raw `font-size` / `font-weight` / `color` on elements. Always pick a utility class.

## Card

Every widget is a card. Transparent at rest, 3% on hover/focus/active. No borders. No shadows.

Three variants, one HTML shape.

```html
<!-- Static card. Default. -->
<div class="card">
  <div class="card__heading">
    <h3 class="t-title">Card title</h3>
    <p class="t-caption">Optional subtitle.</p>
  </div>
  <!-- content -->
</div>

<!-- Interactive card. Sticky active / minimized state. -->
<div class="card card--interactive" data-state="active">
  <div class="card__heading">
    <h3 class="t-title">Interactive card</h3>
  </div>
  <div class="card__collapsible">
    <div class="card__collapsible-inner">
      <!-- revealed when active -->
    </div>
  </div>
  <button class="button t-subtitle" data-cta="minimized">Open</button>
  <button class="button button--primary t-subtitle" data-cta="active">Commit</button>
</div>

<!-- Shout card. One per column. Inverts everything inside. -->
<div class="card card--shout">
  <div class="card__heading">
    <h3 class="t-title">Shout card</h3>
    <p class="t-caption t-muted">For the moments that matter.</p>
  </div>
  <button class="button button--primary t-subtitle">Commit the choice</button>
</div>
```

Rules:
- Interactive cards need hidden content (not just inputs). A card that only fires an action stays static.
- One active per stack.
- One shout per column. If everything shouts, nothing does.
- Primary and minimized button labels never match.

## Field

A label and a value sharing one row. No box, no outline. `0.5px` divider between consecutive fields, never above the first or below the last.

```html
<div class="card">
  <label class="field field--row">
    <span class="t-caption--bold field__label">Label</span>
    <input class="t-caption field__input" type="text" value="value" />
  </label>
  <label class="field">
    <input class="t-caption field__input" type="text" placeholder="sofia@kk.consulting" />
    <span class="field__fake-caret" aria-hidden="true"></span>
  </label>
</div>
```

Hover fills the row with 3%. Focus inverts it — black surface, white text, white caret.

## Button

Full-width by default. `12px` radius. Bold label. Two variants.

```html
<button class="button t-subtitle">Secondary</button>
<button class="button button--primary t-subtitle">Primary</button>
```

Rules:
- Never outline-only, never text-only, never floating over content.
- One primary per card.
- Imperative verbs. "Apply tokens", not "Proceed".
- Sentence case. No Title Case. No ALL CAPS.

## Tag

Metadata, not action. If it looks clickable, it's a button.

```html
<span class="tag">Foundations</span>
<span class="tag">9 components</span>
<span class="tag tag--bold">Signed</span>
```

## Switch

Binary toggle. See `index.html` → `#switch` for the full markup.

## Comment

Two shapes, one pattern. Draft (shout) and thread (interactive card with collapsible reveal). Lives in the inspector. See `index.html` → `#comment` for the complete markup including `comment-new`, `comment-thread`, `comment-msg`, `comment__menu`.

Consumer integration (events, config, delete, persistence patterns per framework) lives in `docs/integration/comment.md`. The `kk:comment` CustomEvent is how a backend hooks in.

## Navigation

Sidebar nav with scroll-spy indicator. `sidebar__nav` wraps `nav-group` sections; `toc__indicator` animates between active items.

## Signoff

Canonical document ending. Stats + byline + handwritten signature SVG.

```html
<div class="doc__signoff-stats">
  <div class="stat t-caption">
    <div><span class="t-caption--bold">3</span> revisions before sealing.</div>
  </div>
  <div class="stat t-caption">
    <div><span class="t-caption--bold">0</span> edits pending.</div>
  </div>
</div>
<div class="doc__signoff-signature">
  <p class="t-caption">
    Signed by <span class="t-caption--bold">Author,</span><br />
    role at <span class="t-caption--bold">organization</span><br />
    <span class="t-muted">day, time, timezone.</span>
  </p>
  <img class="doc__signoff-signature-img" src="signature.svg" alt="Signature" />
</div>
```

Every doc ships signed.

## Spec list (dl.doc__spec)

The workhorse for key/value rows inside a card. Three shapes:

```html
<!-- Two-column: key + value -->
<dl class="doc__spec">
  <div class="doc__spec-row">
    <dt class="doc__spec-key">Key</dt>
    <dd class="doc__spec-value">Value that may wrap.</dd>
  </div>
</dl>

<!-- Three-column: key + value + prose -->
<dl class="doc__spec doc__spec--value">
  <div class="doc__spec-row">
    <dt class="doc__spec-key">Token</dt>
    <dd class="doc__spec-value">16px</dd>
    <dd class="doc__spec-value">When and why to reach for it.</dd>
  </div>
</dl>

<!-- Claim / reality / resolution -->
<dl class="doc__spec doc__spec--triple">...</dl>
```

## Patterns

### Three columns (default shell)

```html
<div class="app" data-view="doc">
  <aside class="sidebar" aria-label="Navigation">...</aside>
  <main class="doc" id="doc">...</main>
  <aside class="inspector">...</aside>
</div>
```

Left is the map. Middle is the territory. Right is the margin — actions, references, comments. Only the middle scrolls during reading.

### Card stack

Stack interactive cards vertically. One active at a time. Inactive cards collapse to heading + minimized CTA. See `#card-stack-3d` in `index.html` for the 3D reveal variant.

### Narrow (mobile)

Below ~800px: doc becomes the single column, inspector slides over, sidebar collapses to a hamburger. See `#narrow`.

## What's forbidden

- Any class not starting with `t-`, `card`, `field`, `button`, `tag`, `switch`, `sidebar`, `doc`, `nav-group`, `inspector`, `comment`, `stat`, `tag`, `swatch`, `app`.
- Inline styles for tokens. Use `var(--token-name)`.
- New color, spacing, or radius values outside `tokens.json`.
- Drop shadows, glass, blur, gradients.
- Any utility-class framework (Tailwind, Bootstrap, Bulma).

When you need something genuinely new: do not add it to the kit. Ask the maintainer. Additions require a manifesto update before code lands.
