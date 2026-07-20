# Toast integration

How a consumer fires toasts from the Vue 2.0 `toast()` composable. Covers the signature, options, the singleton stack, the server-rendered `KToast` component, and reduced motion.

Scope: toast only. This file does not cover modal, dropdown, tabs, tooltip, or pagination.

## The stack is a singleton

There is one `.toast-stack[data-toast-stack]` per page. `toast()` finds it or builds it on first call and appends it to `document.body`; every toast lands in the same bottom-center column. A consumer may ship the empty stack in their own markup:

```html
<div class="toast-stack" data-toast-stack aria-live="polite" aria-atomic="false"></div>
```

If they don't, `toast()` creates it with the same attributes on first call.

## `toast(text, opts)`

Imported directly from the package — not a global, not a directive. Builds one toast, plays it in, and auto-dismisses it.

```js
import { toast } from '../../packages/vue/dist/index.js'

toast('Draft saved')

toast('Conversation moved to Archive', {
  action: 'Undo',
  onAction: () => restoreConversation(id),
  duration: 6000,
})
```

Returns the toast element (`HTMLDivElement`) so the caller can dismiss it early or read its state. Returns `undefined` under SSR, where `document` doesn't exist — the composable no-ops rather than throwing.

### Signature

```ts
function toast(text: string, opts?: ToastOptions): HTMLDivElement | undefined

interface ToastOptions {
  action?: string
  onAction?: () => void
  duration?: number
}
```

### Options

| Key | Type | Default | Meaning |
| --- | --- | --- | --- |
| `action` | `string` | — | Label for the action button. Omit for a message with no action. A verb: `"Undo"`, not `"OK"`. |
| `onAction` | `() => void` | — | Called when the action button is clicked. The toast dismisses itself right after. |
| `duration` | `number` | `4000` | Milliseconds before auto-dismiss. `0` keeps the toast until the user (or code) dismisses it. |

`text` is required and is written with `textContent` — pass a plain string, not markup.

## Server-rendered toasts: `KToast`

`KToast` renders one static, already-open toast for SSR bodies or snapshot tests. It carries no timer and no auto-dismiss logic — the ×/action clicks are inert markup, matching what a static render needs.

```vue
<KToast text="Settings saved" />
<KToast text="Conversation moved to Archive" action="Undo" />
```

| Prop | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `string` | required | Toast body, written into `.toast__text`. |
| `action` | `string` | `''` | Label for the action button. The button renders only when set. |

To make a pre-rendered toast auto-dismiss or wire its action, re-issue it through `toast()` on the client instead.

## Data attributes

| Attribute | On | Meaning |
| --- | --- | --- |
| `data-toast-stack` | `.toast-stack` | Marks the singleton container. `toast()` targets it; presence prevents a second stack. |
| `data-state` | `.toast` | `open` at rest, `closed` for the enter/exit frame. `toast()` flips it; read it, don't set it. |

## Events

None. A toast reports; it doesn't ask. The only callback is `onAction`, passed inline to `toast()`. No CustomEvent, nothing to listen for.

## Reduced motion

The enter and exit run on `--dur-base`/`--ease-out`, which the global reduced-motion rule collapses to `0.01ms`. No bespoke handling. The dismiss teardown carries a `setTimeout` fallback (400ms) so a toast is always removed from the DOM even when `transitionend` doesn't fire.

## Common mistakes

- **Stacking your own container.** Don't add a second `.toast-stack`. One per page; let `toast()` own it.
- **Colors for status.** No green for success, no red for error. One ink surface. If the reader needs a color to know what happened, the copy is wrong.
- **A toast that asks a question.** "Delete this?" is a modal. A toast confirms a thing that already happened.
- **Markup in `text`.** It's set with `textContent`. HTML arrives as literal characters.

## Legacy: kit.js

The pre-2.0 static demos still call the global `KK.toast(text, opts)`, with the same options shape and the same `initToast()` binding for server-rendered `.toast` markup with `.toast__close` / `.toast__action`. That surface is frozen on `js/kit.js`; no new consumers.
