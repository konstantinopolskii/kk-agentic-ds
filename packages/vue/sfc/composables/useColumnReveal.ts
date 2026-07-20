/* Behavior for KApp — 1:1 port of the column reveal orchestrator
   (js/kit.js 476-546), scoped to one .app element instead of kit.js's
   document.querySelector('.app') singleton. Staggers a fade/scale/
   slide keyframe across each visible column's children on first
   paint, then re-reveals a column whenever a data-view swap flips it
   from hidden to visible (tracked via a MutationObserver on the app's
   data-view attribute). Call after the app element is mounted;
   returns a dispose function for onBeforeUnmount. */
interface Column {
  selector: string
  keyframe: string
}

const COLUMNS: Column[] = [
  { selector: '.book', keyframe: 'reveal-from-below' },
  { selector: '.sidebar', keyframe: 'reveal-from-left' },
  { selector: '.inspector', keyframe: 'reveal-from-right' },
]

const STAGGER_STEP_MS = 48
const STAGGER_CAP = 12
const COLUMN_OFFSET_MS = 160

export function useColumnReveal(app: HTMLElement): () => void {
  function revealColumn(col: Column, baseDelay: number) {
    const column = app.querySelector<HTMLElement>(col.selector)
    if (!column) return
    if (getComputedStyle(column).display === 'none') return

    const children = column.children
    for (let i = 0; i < children.length; i++) {
      const el = children[i] as HTMLElement
      const delay = baseDelay + Math.min(i, STAGGER_CAP) * STAGGER_STEP_MS
      el.style.animation = 'none'
      void el.offsetWidth
      el.style.animation = `${col.keyframe} var(--dur-long) var(--ease-swing) ${delay}ms both`
    }
  }

  function isVisible(selector: string): boolean {
    const el = app.querySelector<HTMLElement>(selector)
    return !!(el && getComputedStyle(el).display !== 'none')
  }

  const wasVisible: Record<string, boolean> = {}
  COLUMNS.forEach((col) => {
    wasVisible[col.selector] = isVisible(col.selector)
  })

  const observer = new MutationObserver(() => {
    COLUMNS.forEach((col) => {
      const now = isVisible(col.selector)
      if (now && !wasVisible[col.selector]) revealColumn(col, 0)
      wasVisible[col.selector] = now
    })
  })
  observer.observe(app, { attributes: true, attributeFilter: ['data-view'] })

  let cascadeIndex = 0
  COLUMNS.forEach((col) => {
    if (!isVisible(col.selector)) return
    revealColumn(col, cascadeIndex * COLUMN_OFFSET_MS)
    cascadeIndex++
  })

  return function dispose() {
    observer.disconnect()
  }
}
