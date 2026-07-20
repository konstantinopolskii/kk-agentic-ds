import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/* Behavior for comment kebab menus — 1:1 port of initCommentMenus
   (js/kit.js 643-698), scoped to one container element instead of
   kit.js's delegated document listeners. Kebab click toggles its own
   popover and closes every other open one in the container; opening
   recomputes data-can-approve on the owning thread first, since
   Approve only shows when the thread's last list message is an agent
   reply. Escape and any click outside a kebab button close every open
   menu in the container. */
export function useCommentMenus(containerRef: Ref<HTMLElement | null>) {
  function closeAllMenus(except?: Element | null) {
    containerRef.value
      ?.querySelectorAll<HTMLElement>('.comment__menu[aria-expanded="true"]')
      .forEach((btn) => {
        if (btn === except) return
        btn.setAttribute('aria-expanded', 'false')
      })
  }

  // Recompute whether the Approve item should show for this thread,
  // right before the kebab opens. Approve targets the last list
  // message; the rule reads the flag through a CSS selector that
  // points at the thread's data-can-approve attribute.
  function refreshApproveAvailability(thread: Element | null) {
    if (!thread) return
    if (
      thread.getAttribute('data-resolved') === 'true' ||
      thread.getAttribute('data-archived') === 'true'
    ) {
      thread.removeAttribute('data-can-approve')
      return
    }
    const list = thread.querySelector('.comment-thread__list')
    const listMsgs = list ? list.querySelectorAll(':scope > .comment-msg') : []
    const last = listMsgs.length ? listMsgs[listMsgs.length - 1] : null
    if (last && last.getAttribute('data-author-role') === 'agent') {
      thread.setAttribute('data-can-approve', 'true')
    } else {
      thread.removeAttribute('data-can-approve')
    }
  }

  function onClick(e: MouseEvent) {
    const container = containerRef.value
    if (!container) return
    const target = e.target as HTMLElement
    const btn = target.closest('.comment__menu')
    if (btn && container.contains(btn)) {
      const wasOpen = btn.getAttribute('aria-expanded') === 'true'
      closeAllMenus(btn)
      if (!wasOpen) refreshApproveAvailability(btn.closest('.comment-thread'))
      btn.setAttribute('aria-expanded', wasOpen ? 'false' : 'true')
      e.stopPropagation()
      return
    }
    const popover = target.closest('.comment__menu-popover')
    if (popover && container.contains(popover)) {
      closeAllMenus()
      return
    }
    closeAllMenus()
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') closeAllMenus()
  }

  onMounted(() => {
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKeydown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', onClick)
    document.removeEventListener('keydown', onKeydown)
  })
}
