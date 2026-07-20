/* Behavior for KInspector — 1:1 port of the inspector card stack
   (js/kit.js 548-638), scoped to one .inspector element instead of
   kit.js's document.querySelector('.inspector') singleton. One
   interactive card active at a time; touching a static card or empty
   space demotes whatever is active and glides the tapped surface to
   the top of the column. Threads are cards too — the comments
   selection/promotion flow (owned by the comments agent) rides this
   same data-state flip, so the DOM contract (data-state="active",
   .card--interactive, .card--heading exclusion, data-resolved /
   data-archived guards) must stay exact. Call after the inspector
   element is mounted; returns a dispose function for onBeforeUnmount. */
const glideIds = new WeakMap<HTMLElement, number>()
function glideScroll(el: HTMLElement, target: number, duration: number) {
  const startTop = el.scrollTop
  const distance = target - startTop
  if (Math.abs(distance) < 1) return
  const startTime = performance.now()
  const myId = (glideIds.get(el) ?? 0) + 1
  glideIds.set(el, myId)
  function step(now: number) {
    if (glideIds.get(el) !== myId) return
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    el.scrollTop = startTop + distance * eased
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function useInspectorStack(inspector: HTMLElement): () => void {
  function collapseAllActive() {
    inspector.querySelectorAll('.card--interactive[data-state="active"]').forEach((c) => {
      const collapsible = c.querySelector<HTMLElement>('.card__collapsible')
      if (collapsible) collapsible.style.transition = 'none'
      c.removeAttribute('data-state')
      if (collapsible) {
        void collapsible.offsetHeight // force layout commit
        collapsible.style.transition = ''
      }
    })
  }

  function promoteCard(card: Element) {
    if (card.getAttribute('data-state') !== 'active') {
      collapseAllActive()
      card.setAttribute('data-state', 'active')

      // Blur any input that accidentally caught focus when the
      // minimized-label button was hidden by the CTA-swap rule.
      requestAnimationFrame(() => {
        const focused = document.activeElement as HTMLElement | null
        if (focused && card.contains(focused) && focused.matches('input, textarea')) {
          focused.blur()
        }
      })
    }

    // Defer the scroll measurement one frame so any MutationObserver
    // that dismisses an empty draft has flushed before we read
    // cardRect.top.
    requestAnimationFrame(() => {
      if (!card.isConnected) return
      const inspectorRect = inspector.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()
      const target = inspector.scrollTop + (cardRect.top - inspectorRect.top)
      glideScroll(inspector, Math.max(0, target), 320)
    })
  }

  function handleTrigger(e: Event) {
    const eventTarget = e.target as HTMLElement

    // Kebab menu + popover are isolated surfaces — they open/close
    // without promoting or demoting any card in the stack.
    if (eventTarget.closest('.comment__menu, .comment__menu-popover')) return

    // Link cards navigate. The stack neither promotes nor glides them —
    // any scroll before a page swap reads as jank.
    if (eventTarget.closest('a.card, .card--link')) return

    const card = eventTarget.closest('.card')
    // Empty space inside the inspector deactivates whatever is
    // promoted. focusin never lands outside a card in practice.
    if (!card) {
      if (e.type === 'click') collapseAllActive()
      return
    }
    if (card.classList.contains('card--heading')) return
    if (card.getAttribute('data-resolved') === 'true' || card.getAttribute('data-archived') === 'true') {
      return
    }

    if (card.classList.contains('card--interactive')) {
      promoteCard(card)
    } else {
      // Static card touched — demote active, glide the tapped card
      // to the top.
      collapseAllActive()
      const inspectorRect = inspector.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()
      const target = inspector.scrollTop + (cardRect.top - inspectorRect.top)
      glideScroll(inspector, Math.max(0, target), 320)
    }
  }

  inspector.addEventListener('click', handleTrigger)
  inspector.addEventListener('focusin', handleTrigger)

  return function dispose() {
    inspector.removeEventListener('click', handleTrigger)
    inspector.removeEventListener('focusin', handleTrigger)
  }
}
