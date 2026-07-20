/* Toast service — faithful port of KK.toast (kit.js 2544-2646).
   Finds or builds the singleton `.toast-stack[data-toast-stack]` on
   document.body, appends a toast closed, forces a reflow, then flips
   it open so the enter transition plays. Auto-dismisses after
   `duration` (default 4000ms; 0 keeps it until dismissed), wires the
   dismiss × plus an optional action button. Direct DOM, no per-toast
   Vue app — the simplest faithful port of the vanilla original.
   Client-only: no-ops under SSR where `document` is absent. */

export interface ToastOptions {
  action?: string
  onAction?: () => void
  duration?: number
}

function toastStackEl(): HTMLDivElement {
  const existing = document.querySelector<HTMLDivElement>('.toast-stack[data-toast-stack]')
  if (existing) return existing
  const stack = document.createElement('div')
  stack.className = 'toast-stack'
  stack.setAttribute('data-toast-stack', '')
  stack.setAttribute('aria-live', 'polite')
  stack.setAttribute('aria-atomic', 'false')
  document.body.appendChild(stack)
  return stack
}

function dismissToast(toastEl: HTMLDivElement | null): void {
  if (!toastEl || toastEl.getAttribute('data-state') === 'closed') return
  toastEl.setAttribute('data-state', 'closed')
  let removed = false
  function remove() {
    if (removed) return
    removed = true
    toastEl?.parentNode?.removeChild(toastEl)
  }
  toastEl.addEventListener('transitionend', remove, { once: true })
  // Fallback: if no transition fires (reduced-motion collapses the
  // token to ~0), tear down anyway so the node never lingers.
  setTimeout(remove, 400)
}

export function toast(text: string, opts: ToastOptions = {}): HTMLDivElement | undefined {
  if (typeof document === 'undefined') return undefined

  const stack = toastStackEl()

  const toastEl = document.createElement('div')
  toastEl.className = 'toast'
  toastEl.setAttribute('role', 'status')
  toastEl.setAttribute('data-state', 'closed')

  const span = document.createElement('span')
  span.className = 'toast__text'
  span.textContent = text == null ? '' : String(text)
  toastEl.appendChild(span)

  if (opts.action) {
    const action = document.createElement('button')
    action.className = 'toast__action'
    action.type = 'button'
    action.textContent = String(opts.action)
    action.addEventListener('click', () => {
      if (typeof opts.onAction === 'function') opts.onAction()
      dismissToast(toastEl)
    })
    toastEl.appendChild(action)
  }

  const close = document.createElement('button')
  close.className = 'toast__close'
  close.type = 'button'
  close.setAttribute('aria-label', 'Dismiss')
  close.textContent = '×'
  close.addEventListener('click', () => dismissToast(toastEl))
  toastEl.appendChild(close)

  stack.appendChild(toastEl)

  // Force a reflow so the from-state paints before we flip to open —
  // otherwise the enter transition is skipped and the toast pops in.
  void toastEl.offsetWidth
  toastEl.setAttribute('data-state', 'open')

  const duration = typeof opts.duration === 'number' ? opts.duration : 4000
  if (duration > 0) setTimeout(() => dismissToast(toastEl), duration)

  return toastEl
}
