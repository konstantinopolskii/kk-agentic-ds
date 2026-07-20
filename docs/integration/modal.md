# Modal integration

How a consumer opens, closes, and wires `KModal`, the Vue 2.0 dialog component. Covers props, the `v-model` contract, focus and scroll behavior, and the DOM hooks that still matter for a Cancel button.

Scope: modal only. This file does not cover dropdown, toast, or any other overlay.

## The shape

`KModal` is controlled — it never opens itself. A boolean ref drives it through `v-model`; the consumer's own trigger button flips that ref.

```vue
<script setup>
import { ref } from 'vue'
import { KModal } from '../../packages/vue/dist/index.js'

const publishOpen = ref(false)
</script>

<template>
  <button class="button button--primary t-subtitle" @click="publishOpen = true">
    Publish deliverable
  </button>

  <KModal
    v-model="publishOpen"
    id="publish-modal"
    title="Publish deliverable"
    subtitle="This shares the signed charter with the client workspace."
  >
    The document locks after publish. Reopen it from the workspace to draft a revision.
    <template #foot>
      <button class="button t-subtitle" data-modal-close>Cancel</button>
      <button class="button button--primary t-subtitle" @click="publish">Publish</button>
    </template>
  </KModal>
</template>
```

## Props

| Prop | Type | Default | Meaning |
| --- | --- | --- | --- |
| `id` | `string` | required | Stamped on the root `.modal` and used to derive the title's id (`{id}-t`) for `aria-labelledby`. |
| `title` | `string` | `''` | Heading text in `.modal__heading`. |
| `subtitle` | `string` | `''` | Muted caption under the title. The `<p>` renders only when set. |
| `modelValue` | `boolean` | `false` | Open state. Bind with `v-model`, not by hand-toggling an attribute. |

## Emits

| Event | Payload | Fires |
| --- | --- | --- |
| `update:modelValue` | `boolean` | Escape, scrim click, or any `[data-modal-close]` element inside the dialog. Pairs with `v-model` — do not also listen for a separate close event. |

## Slots

Default slot is the body. `foot` is the action row; `.modal__foot` renders only when the slot is provided.

## Behavior the component owns

`KModal` wraps `useModal`, a 1:1 port of the pre-2.0 `KK.openModal` / `KK.closeModal` pair, scoped to this instance instead of a document-level singleton.

- **Close paths.** Scrim click, any element carrying `[data-modal-close]` inside the dialog, and Escape all flip `modelValue` to `false` via `update:modelValue`. Put `data-modal-close` on a Cancel button so it closes even when its own `@click` handler does nothing.
- **Focus trap.** While open, Tab and Shift+Tab cycle within the dialog. Focus that lands outside is pulled back to the first focusable control.
- **Focus restore.** Opening records `document.activeElement`; closing restores focus there if the element is still connected.
- **Body scroll lock.** Opening sets `overflow: hidden` on `document.documentElement`. It lifts only when no `.modal[data-state="open"]` remains anywhere on the page — several modals can stack without the lock releasing early.
- **Teleport to `<body>`.** Disabled until the component mounts, so server-rendered markup paints in place (parity with the closed-state oracle), then the client portals to `document.body` on hydration. Author `KModal` anywhere in your tree; it always resolves its scrim and dialog against the viewport.
- **`data-state` / `aria-hidden`.** Pure template output driven by `modelValue` — `open`/`closed` and `false`/`true`. Never set these by hand; they follow the prop.

## Common mistakes

- **Toggling a local ref without `v-model`.** Bind `v-model="open"` (or the explicit `:model-value` + `@update:model-value` pair). A one-way `:model-value` with no listener means Escape and the scrim never close it.
- **Missing `data-modal-close` on Cancel.** A Cancel button that only runs a consumer handler leaves the modal open if that handler doesn't also flip the `v-model` ref.
- **Mismatched `aria-labelledby`.** Two `KModal` instances sharing an `id` collide on the derived title id. Give every modal a unique `id`.
- **A second dialog surface.** One `.modal__dialog` per `.modal`. Ship two `KModal` instances rather than nesting a second dialog in the slot.

## Legacy: kit.js

The pre-2.0 static demos still open dialogs via `KK.openModal(id)` / `KK.closeModal(id)`, `data-modal-open="id"` triggers, and hand-authored `data-state="closed"` markup, all bound by the frozen `js/kit.js`. No CustomEvent existed for open/close in that era either — state lived in the DOM attribute. That surface is frozen: no new consumers, no new triggers added to it.
