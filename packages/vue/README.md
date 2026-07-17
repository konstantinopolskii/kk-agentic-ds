# @konstantinopolskii/vue

Vue 3 layer for the KK agentic design system. Components are thin emitters of canonical kit markup: they own structure and behavior, `vars.css` + `style.css` own every pixel. No build step — plain ESM modules with `h()` render functions.

## Base rules

1. **CSS is law.** No component ships styles. No scoped styles, no CSS-in-JS, no utility classes. A component that needs new CSS goes through the evolve protocol in the kit repo first.
2. **Props are the canon's variants, nothing else.** No `class` prop, no `style` prop. Off-canon output is unrepresentable.
3. **Every component answers to the parity harness.** Rendered output must match the canonical markup pixel for pixel.
4. **New components take behavior from a headless base and skin in kit vocabulary.** The skin lands in `style.css` so plain-HTML consumers get the same component.
5. **Voice lives in slots.** Components enforce structure, never copy.

## Components

| Component | Canonical markup |
|---|---|
| `KButton` | `<button class="button t-subtitle">` · `primary` · `as="span"` for link cards |
| `KChip` | `<button class="chip" aria-pressed>` · `pressed` |
| `KChipWrap` | `<div class="chip-wrap">` |
| `KTag` | `<span class="tag">` · `bold` |
| `KMetric` | `<div class="metric">` · `value`, `label`, `delta` |
| `KSpark` | `<span class="spark">` · `values`, `label`, `panel`, `soft` |

## Parity harness

`parity/static.html` is the golden: hand-written canonical markup. `parity/vue.html` renders the same surface through the components. Both screenshot at the same viewport through headless Chrome; the diff must be zero pixels.

```
python3 -m http.server 8123          # repo root — ESM needs http, not file://
# screenshot both pages at the same viewport, ImageChops.difference, assert 0
```

Current result: 900×760 at 2x, 2 736 000 pixels compared, 0 different.
