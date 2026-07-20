# Toast — integration

How a consumer fires toasts and wires their actions. Covers everything beyond the `components.md § Toast` inventory: the imperative API, options, the server-rendered path, and reduced-motion behavior.

Scope: toast only. This file does not cover modal, dropdown, tabs, tooltip, or pagination.

## The stack is a singleton

There is one `.toast-stack[data-toast-stack]` per page. `KK.toast()` finds it or builds it on first call and appends it to `<body>`; every toast lands in the same bottom-center column. A consumer may ship the empty stack in their own markup:

```html
<div class="toast-stack" data-toast-stack aria-live="polite" aria-atomic="false"></div>
```

If they do not, the kit creates it with the same attributes on first `KK.toast()`.

## KK.toast(text, opts)

The imperative entry. Builds one toast, plays it in, and auto-dismisses it.

```js
KK.toast('Draft saved');

KK.toast('Conversation moved to Archive', {
  action: 'Undo',
  onAction: function () { restoreConversation(id); },
  duration: 6000,
});
```

Returns the toast element so the caller can dismiss it early or read its state.

### Options

| Key | Type | Default | Meaning |
|-----|------|---------|---------|
| `action` | `String` | — | Label for the action button. Omit for a message with no action. A verb: `"Undo"`, not `"OK"`. |
| `onAction` | `Function` | — | Called when the action button is clicked. The toast dismisses itself right after. |
| `duration` | `Number` | `4000` | Milliseconds before auto-dismiss. `0` keeps the toast until the user (or code) dismisses it. |

`text` is required and is written with `textContent` — pass a plain string, not markup.

## Server-rendered toasts

A toast printed in the initial HTML (or emitted by `<KToast>`) is dismissed by `initToast()`, which delegates clicks on `.toast__close` and `.toast__action` to the same teardown the imperative path uses. It binds one document-level listener, once, and is safe under `KK.refresh()`.

```html
<div class="toast-stack" data-toast-stack aria-live="polite" aria-atomic="false">
  <div class="toast" data-state="open" role="status">
    <span class="toast__text">Settings saved</span>
    <button class="toast__close" aria-label="Dismiss" type="button">×</button>
  </div>
</div>
```

A server-rendered toast does not auto-dismiss (no timer is attached to markup the kit did not create). It clears when the user clicks the × or the action. To auto-dismiss a server toast, re-issue it through `KK.toast()`.

## Data attributes

| Attribute | On | Meaning |
|-----------|-----|---------|
| `data-toast-stack` | `.toast-stack` | Marks the singleton container. `KK.toast()` targets it; presence prevents a second stack. |
| `data-state` | `.toast` | `open` at rest, `closed` for the enter/exit frame. The kit flips it; consumers read it, do not set it. |

## Events

None. A toast reports; it does not ask. The only callback is `onAction`, passed inline to `KK.toast()`. There is no `CustomEvent` and nothing to `addEventListener` for.

## Reduced motion

The enter and exit run on `--dur-base`/`--ease-out`, which the global reduced-motion rule collapses to `0.01ms`. No bespoke handling. The dismissal teardown carries a `setTimeout` fallback so a toast is always removed from the DOM even when the `transitionend` event does not fire.

## Common mistakes

- **Stacking your own container.** Do not add a second `.toast-stack`. One per page; let `KK.toast()` own it.
- **Colors for status.** No green for success, no red for error. One ink surface. If the reader needs a color to know what happened, the copy is wrong.
- **A toast that asks a question.** "Delete this?" is a modal. A toast confirms a thing that already happened.
- **Markup in `text`.** It is set with `textContent`. HTML arrives as literal characters.
