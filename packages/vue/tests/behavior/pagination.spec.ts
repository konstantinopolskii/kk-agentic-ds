import { describe, it, expect, afterEach, vi } from 'vitest'
import { createApp, type App } from 'vue'
import KPagination from '../../sfc/components/KPagination.vue'

let host: HTMLDivElement | null = null
let app: App | null = null

function mount(props: Record<string, unknown>) {
  host = document.createElement('div')
  document.body.appendChild(host)
  app = createApp(KPagination, props)
  app.mount(host)
  return host
}

afterEach(() => {
  app?.unmount()
  host?.remove()
  app = null
  host = null
})

// Sequence for pages=12, current=4, window=5, derived from the oracle's
// pageItems(): win=5, half=2, start=max(2,4-2)=2, end=min(11,2+5-1)=6,
// start=max(2,6-5+1)=2 (unchanged) -> items [1..6, gap, 12]. Edges wrap it.
const EXPECTED_SEQUENCE = ['prev', '1', '2', '3', '4', '5', '6', 'gap', '12', 'next']

function sequenceOf(root: HTMLElement): string[] {
  const nav = root.querySelector('.pagination') as HTMLElement
  return Array.from(nav.children).map((el) => {
    if (el.classList.contains('pagination__edge')) return el.getAttribute('data-dir') ?? ''
    if (el.classList.contains('pagination__gap')) return 'gap'
    return el.textContent ?? ''
  })
}

describe('KPagination behavior', () => {
  it('collapses the window into the expected gap sequence', () => {
    const root = mount({ pages: 12, current: 4, window: 5 })
    expect(sequenceOf(root)).toEqual(EXPECTED_SEQUENCE)
    const current = root.querySelector('.pagination__page[aria-current="page"]')
    expect(current?.textContent).toBe('4')
  })

  it('emits change + update:current when a page is clicked', () => {
    const onChange = vi.fn()
    const onUpdateCurrent = vi.fn()
    const root = mount({
      pages: 12,
      current: 4,
      window: 5,
      onChange,
      'onUpdate:current': onUpdateCurrent,
    })
    const pages = Array.from(root.querySelectorAll('.pagination__page'))
    const page6 = pages.find((el) => el.textContent === '6') as HTMLButtonElement
    page6.click()
    expect(onChange).toHaveBeenCalledWith(6)
    expect(onUpdateCurrent).toHaveBeenCalledWith(6)
  })

  it('clamps prev at the first page', () => {
    const onChange = vi.fn()
    const root = mount({ pages: 12, current: 1, onChange })
    const prev = root.querySelector('[data-dir="prev"]') as HTMLButtonElement
    expect(prev.disabled).toBe(true)
    prev.click()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('clamps next at the last page', () => {
    const onChange = vi.fn()
    const root = mount({ pages: 12, current: 12, onChange })
    const next = root.querySelector('[data-dir="next"]') as HTMLButtonElement
    expect(next.disabled).toBe(true)
    next.click()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('prev/next emit change + update:current one page at a time', () => {
    const onChange = vi.fn()
    const onUpdateCurrent = vi.fn()
    const root = mount({
      pages: 12,
      current: 4,
      onChange,
      'onUpdate:current': onUpdateCurrent,
    })
    const prev = root.querySelector('[data-dir="prev"]') as HTMLButtonElement
    const next = root.querySelector('[data-dir="next"]') as HTMLButtonElement

    prev.click()
    expect(onChange).toHaveBeenLastCalledWith(3)
    expect(onUpdateCurrent).toHaveBeenLastCalledWith(3)

    next.click()
    expect(onChange).toHaveBeenLastCalledWith(5)
    expect(onUpdateCurrent).toHaveBeenLastCalledWith(5)
  })
})
