# Modal — integration

How a consumer opens, closes, and wires the kit's modal. Covers everything beyond the `manifesto.md § Components` inventory: the data attributes, the imperative API, focus and scroll behavior, framework patterns, common mistakes.

Scope: modal only. This file does not cover dropdown, toast, or any other overlay.

## The shape

The dialog is a self-contained block with an `id`. The trigger lives anywhere in page markup and points at that id.

```html
<button class="button button--primary t-subtitle" data-modal-open="publish-modal">
  Publish deliverable
</button>

<div class="modal" id="publish-modal" data-state="closed" aria-hidden="true">
  <div class="modal__scrim" data-modal-close></div>
  <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="publish-modal-t">
    <button class="modal__close" data-modal-close aria-label="Close">×</button>
    <div class="modal__heading">
      <h3 class="t-title" id="publish-modal-t">Publish deliverable</h3>
      <p class="t-caption t-muted">This shares the signed charter with the client workspace.</p>
    </div>
    <div class="modal__body"><!-- your content --></div>
    <div class="modal__foot">
      <button class="button t-subtitle" data-modal-close>Cancel</button>
      <button class="button button--primary t-subtitle">Publish</button>
    </div>
  </div>
</div>
```

Ship the modal in the closed state (`data-state="closed"` + `aria-hidden="true"`). The kit toggles both on open and close. No consumer JS is required for open/close — `js/kit.js` binds the triggers on `KK.init()`.

## Data attributes

Set by the consumer:

| Attribute | On | Meaning |
| --- | --- | --- |
| `data-modal-open="id"` | any element (a button) | Click opens the modal whose `id` matches. |
| `data-modal-close` | scrim, ×, any control inside the dialog | Click closes the containing modal. Present on `.modal__scrim` and `.modal__close`; add it to Cancel-style foot buttons. |

Set by the kit (do not hand-toggle):

| Attribute | On | Values |
| --- | --- | --- |
| `data-state` | `.modal` | `open` / `closed`. `closed` sets `display:none`; the open transition plays on the closed → open flip. |
| `aria-hidden` | `.modal` | `true` when closed, `false` when open. |

The `id` is the contract between trigger and dialog. `aria-labelledby` points at the title's `id` (`{id}-t` by convention); keep them in sync so screen readers announce the dialog title.

## Imperative API

Two methods on `window.KK`, available after `KK.init()`:

```js
KK.openModal('publish-modal');   // open by id
KK.closeModal('publish-modal');  // close by id
```

- `KK.openModal(id)` — no-op if the id resolves to nothing, to a non-`.modal` element, or to an already-open modal. Records the current `document.activeElement` as the opener, flips `data-state`/`aria-hidden`, locks body scroll, and moves focus to the first focusable control in the dialog (or the dialog itself when there is none).
- `KK.closeModal(id)` — no-op unless the modal is open. Flips the attributes back, releases the scroll lock once no modal remains open, and restores focus to the recorded opener when it is still connected.

Use these to open a modal from your own code (after a fetch resolves, from a keyboard shortcut, etc.) instead of synthesizing a click.

## Behavior the kit owns

- **Close paths.** Scrim click, any `[data-modal-close]`, and Escape all close. Escape closes the open modal.
- **Focus trap.** While open, Tab and Shift+Tab cycle within the dialog; focus that lands outside is pulled back to the first control.
- **Focus restore.** Closing returns focus to the element that opened the modal.
- **Body scroll lock.** `document.documentElement` gets `overflow:hidden` while any modal is open; the lock lifts when the last one closes.
- **Portal to `<body>`.** On open the modal is moved to `document.body` so its fixed scrim and dialog resolve against the viewport, not a transformed ancestor (the doc shell's column-reveal leaves an identity transform on every `.book__section`, which would trap the scrim to the reading column). The move is idempotent and permanent; author the dialog anywhere, it lands on `body` the first time it opens.

The kit does not dispatch a CustomEvent for open/close — the state lives in the DOM (`data-state` on `.modal`). Consumers that need a hook can wrap `KK.openModal` / `KK.closeModal`, or read the attribute.

## Vue

`KModal` (`packages/vue/src/components/KModal.js`) emits the markup above. It renders no behavior; `js/kit.js` still owns open/close.

```vue
<KModal id="publish-modal" title="Publish deliverable"
        subtitle="This shares the signed charter with the client workspace.">
  The document locks after publish. Reopen it from the workspace to draft a revision.
  <template #foot>
    <button class="button t-subtitle" data-modal-close>Cancel</button>
    <button class="button button--primary t-subtitle" @click="publish">Publish</button>
  </template>
</KModal>

<button class="button button--primary t-subtitle" data-modal-open="publish-modal">
  Publish deliverable
</button>
```

Props: `id` (required), `title`, `subtitle`. Slots: default (body), `foot` (action buttons). The subtitle `<p>` and the foot row render only when their prop / slot is provided.

## Common mistakes

- **Toggling `data-state` by hand.** Call `KK.openModal` / `KK.closeModal`, or click a `[data-modal-open]` / `[data-modal-close]` element. Hand-flipping skips the focus trap, scroll lock, and focus restore.
- **Missing `data-modal-close` on Cancel.** A Cancel button that only runs consumer JS leaves the modal open. Add `data-modal-close` so it closes even when your handler does nothing.
- **Mismatched `aria-labelledby`.** The dialog's `aria-labelledby` must point at the title's `id`. Reusing one id across two modals breaks the label link.
- **A second dialog surface.** One `.modal__dialog` per `.modal`. Two dialogs in one modal is off-pattern; ship two modals.
