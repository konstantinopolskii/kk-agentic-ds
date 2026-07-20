import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'

/* Behavior for KModal — 1:1 port of KK.openModal / KK.closeModal
   (js/kit.js 2157-2277), scoped to one component instance instead of
   kit.js's delegated document listeners. Flips overflow lock, traps Tab
   within the dialog, restores focus to the opener, and closes on
   Escape. data-state/aria-hidden themselves stay owned by the
   component template (driven straight off modelValue) so the parity
   gate's closed-state markup never touches this file. */
export function useModal(
  isOpen: () => boolean,
  setOpen: (value: boolean) => void,
  dialogRef: Ref<HTMLElement | null>,
) {
  let opener: HTMLElement | null = null

  function focusables(dialog: HTMLElement): HTMLElement[] {
    return Array.prototype.filter.call(
      dialog.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), ' +
          'select:not([disabled]), textarea:not([disabled]), ' +
          '[tabindex]:not([tabindex="-1"])',
      ),
      (el: HTMLElement) => el.offsetWidth || el.offsetHeight || el.getClientRects().length,
    )
  }

  function anyOpen(): boolean {
    return !!document.querySelector('.modal[data-state="open"]')
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      return
    }
    if (e.key !== 'Tab') return
    const dialog = dialogRef.value
    if (!dialog) return
    const f = focusables(dialog)
    if (!f.length) {
      e.preventDefault()
      return
    }
    const first = f[0]
    const last = f[f.length - 1]
    const active = document.activeElement
    if (!dialog.contains(active)) {
      e.preventDefault()
      first.focus()
    } else if (e.shiftKey && active === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  function onRootClick(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (target.closest('[data-modal-close]')) setOpen(false)
  }

  function open() {
    opener = document.activeElement as HTMLElement | null
    document.documentElement.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeydown)
    const dialog = dialogRef.value
    if (!dialog) return
    const f = focusables(dialog)
    if (f.length) {
      f[0].focus()
    } else {
      if (!dialog.hasAttribute('tabindex')) dialog.setAttribute('tabindex', '-1')
      dialog.focus()
    }
  }

  function close() {
    document.removeEventListener('keydown', onKeydown)
    if (!anyOpen()) document.documentElement.style.overflow = ''
    if (opener && typeof opener.focus === 'function' && opener.isConnected) {
      opener.focus()
    }
    opener = null
  }

  // 'post' so the DOM already reflects this modal's own data-state flip
  // before anyOpen() looks for siblings still open — matches kit.js,
  // which flips the attribute before checking anyOpen() itself.
  watch(isOpen, (v) => (v ? open() : close()), { flush: 'post' })

  onMounted(() => {
    if (isOpen()) open()
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
  })

  return { onRootClick }
}
