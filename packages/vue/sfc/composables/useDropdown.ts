import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/* Behavior for KDropdown — 1:1 port of the Escape close, outside-click
   close, and roving item focus (ArrowDown/ArrowUp with wrap, Home/End)
   from kit.js's initDropdown (js/kit.js 2291-2386), scoped to one
   component instance instead of kit.js's delegated document listeners.
   Trigger toggle, item-select-close, and the focus choreography around
   open/select live in KDropdown.vue; this composable adds only what
   kit.js binds at the document level. */
export function useDropdown(
  isOpen: () => boolean,
  close: () => void,
  rootRef: Ref<HTMLElement | null>,
) {
  function focusTrigger() {
    rootRef.value?.querySelector<HTMLElement>('.dropdown__trigger')?.focus()
  }

  function onDocClick(e: MouseEvent) {
    if (!isOpen()) return
    const root = rootRef.value
    if (root && !root.contains(e.target as Node)) close()
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      if (!isOpen()) return
      close()
      focusTrigger()
      return
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
      if (!isOpen()) return
      const pop = rootRef.value?.querySelector('.dropdown__popover[data-state="open"]')
      if (!pop || !(e.target instanceof Node) || !pop.contains(e.target)) return
      const list = Array.from(
        rootRef.value?.querySelectorAll<HTMLElement>('.dropdown__item') ?? [],
      )
      if (!list.length) return
      e.preventDefault()
      const i = list.indexOf(document.activeElement as HTMLElement)
      let next: number
      if (e.key === 'Home') next = 0
      else if (e.key === 'End') next = list.length - 1
      else if (e.key === 'ArrowDown') next = i < 0 ? 0 : (i + 1) % list.length
      else next = i <= 0 ? list.length - 1 : i - 1
      list[next].focus()
    }
  }

  onMounted(() => {
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKeydown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', onDocClick)
    document.removeEventListener('keydown', onKeydown)
  })
}
