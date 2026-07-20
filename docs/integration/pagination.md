# Pagination integration

How a consumer wires `KPagination`, the Vue 2.0 pager component, to a data source. Covers props, the `change` emit, the `update:current` v-model pair, and the window/gap math. Everything visual lives in `components.md § Pagination`.

Scope: pagination only. This file does not cover data table, status feed, or any other component that hosts a pager.

## Presentational, controlled

`KPagination` owns no data and holds no state of its own — `current` is a prop, not internal. It renders a numeral row, marks the active page with `aria-current="page"`, and emits the target page number. The consumer listens, fetches the slice, and feeds the new `current` back in.

```vue
<KPagination :pages="12" :current="page" :window="5" @change="onPage" />
```

```js
function onPage(target) {
  fetchPage(target).then(() => { page.value = target })
}
```

## Props

| Prop | Type | Default | Meaning |
| --- | --- | --- | --- |
| `pages` | `number` | required | Total page count. |
| `current` | `number` | `1` | The active page. The component does not mutate this itself — feed it back after a fetch resolves. |
| `window` | `number` | `5` | Numerals shown around the current page before the run collapses to a single gap. |

## Emits

| Event | Payload | Fires |
| --- | --- | --- |
| `change` | `page: number` | Click on a numeral, or an enabled prev/next edge. Carries the target page. |
| `update:current` | `page: number` | Emitted alongside `change`, same value — lets `v-model:current` drive the prop directly. |

```vue
<KPagination :pages="12" v-model:current="page" @change="fetchPage" />
```

`v-model:current` keeps `current` in sync locally; still fetch and handle failure in the `change` handler, since the component does not know whether a page request succeeds.

## Window and gap math

Page 1 and the last page are always present. Between the window collapses to one `…` gap on either side once the run of pages around `current` doesn't reach the ends. Edge buttons (`data-dir="prev"` / `data-dir="next"`) are CSS-drawn — no font glyph — and carry `disabled` at the first/last page so the row never reflows.

## Common mistakes

- Removing a disabled edge instead of leaving it at reduced opacity. The row must not reflow as the user reaches the ends.
- Feeding `current` back only on `change` and forgetting `update:current` exists — either works, but mixing a manual `current` ref with `v-model:current` on the same instance fights itself.
- Treating `change` as confirmed navigation. It's a request. The consumer decides whether the fetch succeeds and re-renders `current` accordingly.

## Legacy: kit.js

The pre-2.0 static demos still wire pagination through the DOM: `initPagination()` binds one delegated click listener from `KK.init()`/`KK.refresh()`, reads `aria-current="page"` and `data-dir` off hand-authored markup, and dispatches the bubbling `kk:page-change` CustomEvent (`detail: { page, previous }`) on the `.pagination` nav, moving `aria-current` optimistically before the event fires. That surface is frozen on `js/kit.js`; no new consumers.
