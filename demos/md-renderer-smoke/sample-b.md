# Dense blocks

Exercises the denser block types. Tables render with `registry-table`. Blockquotes render with `quote`. Code fences render `pre > code` with `t-mono`.

## Table

| Class | Role | Size |
|---|---|---|
| `t-hero` | Document title | 66 / 66 |
| `t-display` | Section heading | 38 / 38 |
| `t-body` | Body text | 22 / 32 |
| `t-caption` | UI labels | 16 / 24 |

## Blockquote

> The document is the UI. Words are 90% of the design. Getting the voice wrong breaks the system more visibly than any missing pixel.

## Fenced code block

```
// kit.js public surface
KK.init();
KK.refresh();
KK.enableCommentSelectionFlow();
```

## Horizontal rule

A paragraph above a horizontal rule. The rule below renders from `---` on its own line and acts as an inline separator between this paragraph and the quote that follows.

---

> A blockquote after the rule. Renders with the kit's `quote` class: solid left rule, body-sized, black.
