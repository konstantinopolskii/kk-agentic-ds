# Dropdown — integration

How a consumer wires the kit's dropdown into their own state. Covers the data attribute the behavior scans for, the event it dispatches, and the Vue emitter's `select`. Everything visual lives in `manifesto.md § Components` and `components.md § Dropdown`.

Scope: dropdown only.

## What the kit does

`initDropdown()` runs from `KK.init()` and `KK.refresh()`. It binds two delegated document listeners once (idempotent, safe to over-call). For every `.dropdown[data-dropdown]` on the page it:

- toggles the trigger's `aria-expanded` and the popover's `data-state` on trigger click,
- closes any open popover on outside-click and on `Escape`,
- moves roving focus across `.dropdown__item` rows with Up/Down (Home/End jump to the ends),
- activates a row on click or on Enter/Space (each row is a real `<button>`, so activation is native),
- returns focus to the trigger after selection or `Escape`.

The kit does not know what a selection means. It dispatches an event; the consumer decides what happens.

## Data attributes

Set by the consumer on the markup:

| Attribute | On | Purpose |
|-----------|-----|---------|
| `data-dropdown` | `.dropdown` | Marks the wrapper as a live dropdown. Without it the kit skips the element. |
| `data-value` | `.dropdown__item` | Optional payload for a row. Surfaces on the event as `detail.value`. Falls back to the row's trimmed text when absent. |

Set by the kit (do not hand-edit; they are the source of truth for state):

| Attribute | On | Values |
|-----------|-----|--------|
| `aria-expanded` | `.dropdown__trigger` | `"true"` / `"false"` |
| `data-state` | `.dropdown__popover` | `"open"` / `"closed"` |

## Event

`kk:dropdown-select` — `CustomEvent`, dispatched on the `.dropdown` element, bubbles.

```js
document.addEventListener('kk:dropdown-select', function (e) {
  const { label, value, index } = e.detail;
  // label: trimmed text of the chosen row
  // value: the row's data-value, or label when the attribute is absent
  // index: zero-based position of the row within the popover
  applySort(value);
});
```

Listen once on a stable ancestor (`document`, or the container that holds your dropdowns). The event bubbles, so one listener covers every dropdown on the page. Branch on the originating element via `e.target` when you run more than one.

## Vue

`KDropdown` emits `select` with the chosen item — the raw entry from `items` (a string, or the `{ label, value }` object you passed), not the kit's flattened detail.

```vue
<KDropdown
  label="Sort by"
  :items="[
    { label: 'Last edited', value: 'recent' },
    { label: 'Date created', value: 'created' },
    { label: 'Title, A to Z', value: 'title' },
  ]"
  @select="onSort"
/>
```

```js
function onSort(item) {
  // item === { label: 'Last edited', value: 'recent' }
}
```

Open/close state is internal to the component. Override the trigger with the `trigger` slot (it receives `{ open, toggle }`) or author the rows in the default slot when a plain list is not enough. The component renders the same DOM the kit behavior expects, so a page that also loads `js/kit.js` keeps working without conflict.

## Common mistakes

- **Missing `data-dropdown`.** The trigger looks styled but never opens: the kit only wires wrappers carrying the attribute.
- **Reading the trigger label to learn the choice.** The kit never rewrites the trigger. Read `detail.value` from the event, or drive the label yourself from your own state.
- **Two listeners fighting.** Do not add per-dropdown click handlers alongside the kit. Listen once for `kk:dropdown-select` and branch on `e.target`.
