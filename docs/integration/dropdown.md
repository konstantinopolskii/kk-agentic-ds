# Dropdown integration

How a consumer wires `KDropdown`, the Vue 2.0 menu-button popover. Covers the `items` shape, the `select` emit, the scoped trigger slot, and open/close behavior. Everything visual lives in `manifesto.md § Components` and `components.md § Dropdown`.

Scope: dropdown only.

## The shape

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

Open state (`open` ref) is internal to the component — nothing to wire.

## Props

| Prop | Type | Default | Meaning |
| --- | --- | --- | --- |
| `label` | `string` | `'Options'` | Text on the default trigger button. Ignored when the `trigger` slot is used. |
| `items` | `(string \| { label: string; value?: unknown })[]` | `[]` | Rows rendered in the popover when the default slot is not overridden. A plain string is normalized to `{ label: string, value: string }`. |

## Emits

| Event | Payload | Fires |
| --- | --- | --- |
| `select` | the chosen entry from `items` — a string or `{ label, value }`, whichever shape you passed | Click on a `.dropdown__item` row. The popover closes right after. |

`select` hands back the raw entry, not a flattened `{ label, value, index }` detail — read `item.value` directly.

## Slots

- **`trigger`** — scoped, receives `{ open, toggle }`. Replace the default button entirely; call `toggle()` from your own markup, or read `open` to style an active state.
- **default** — replace the generated `.dropdown__item` rows with hand-authored ones when a plain list isn't enough. The component still renders the `.dropdown__popover` wrapper and its open/close state around whatever you put in the slot.

```vue
<KDropdown>
  <template #trigger="{ open, toggle }">
    <button class="button t-subtitle" :aria-expanded="open" @click="toggle">
      Custom trigger
    </button>
  </template>
  <button class="dropdown__item" role="menuitem" type="button" @click="pick('a')">Option A</button>
</KDropdown>
```

## Behavior the component owns

`KDropdown` wraps `useDropdown`, a 1:1 port of the Escape close, outside-click close, and roving item focus from the pre-2.0 `initDropdown`, scoped to this instance instead of a document-level delegated listener.

- **Outside click.** A click anywhere outside the root `.dropdown` element closes the popover.
- **Escape.** Closes the popover and returns focus to the trigger.
- **Roving focus.** Opening focuses the first `.dropdown__item`; ArrowDown/ArrowUp move with wrap, Home/End jump to the ends. Selecting an item returns focus to the trigger.
- **Trigger toggle, select-close, and the open/select focus moves** live directly in `KDropdown.vue` against its own local `open` ref, not in the composable.

## Common mistakes

- **Reading the trigger label to learn the choice.** `KDropdown` never rewrites its own trigger text. Read the `select` payload, or drive the label from your own state.
- **Binding `data-dropdown` by hand.** That attribute was the pre-2.0 kit's opt-in marker for its delegated listener; `KDropdown` needs no such marker; it wires its own instance on mount.

## Legacy: kit.js

The pre-2.0 static demos still run `initDropdown()` from `KK.init()`/`KK.refresh()`: `data-dropdown` marks a live wrapper, `data-value` supplies a row's payload, and a chosen row dispatches the bubbling `kk:dropdown-select` CustomEvent (`detail: { label, value, index }`) on the `.dropdown` element. That surface is frozen on `js/kit.js`; no new consumers.
