import type { Ref } from 'vue'

/* Behavior for KTabs — 1:1 port of the arrow-key/Home/End roving
   selection from kit.js's initTabs (js/kit.js 2402-2461), scoped to one
   component instance instead of kit.js's delegated document listeners.
   Click already calls select() straight from KTabs.vue — matches
   selectTab(tab, false), no forced focus. This composable owns the
   keydown branch — matches selectTab(next, true), select AND focus. */
export function useTabs(listRef: Ref<HTMLElement | null>, select: (index: number) => void) {
  function onKeydown(e: KeyboardEvent) {
    const list = listRef.value
    if (!list) return
    const target = (e.target as HTMLElement).closest?.('.tabs__tab') as HTMLElement | null
    if (!target) return
    const tabs = Array.from(list.querySelectorAll<HTMLElement>('.tabs__tab'))
    const i = tabs.indexOf(target)
    if (i === -1) return

    let next: HTMLElement | null = null
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = tabs[(i + 1) % tabs.length]
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        next = tabs[(i - 1 + tabs.length) % tabs.length]
        break
      case 'Home':
        next = tabs[0]
        break
      case 'End':
        next = tabs[tabs.length - 1]
        break
      default:
        return
    }
    e.preventDefault()
    select(tabs.indexOf(next))
    next.focus()
  }

  return { onKeydown }
}
