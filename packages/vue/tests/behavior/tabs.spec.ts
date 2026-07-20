import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createApp, nextTick, type App } from 'vue'
import KTabs from '../../sfc/components/KTabs.vue'

let host: HTMLDivElement
let app: App | null = null

beforeEach(() => {
  host = document.createElement('div')
  document.body.appendChild(host)
})

afterEach(() => {
  app?.unmount()
  app = null
  host.remove()
})

function mount(props: Record<string, unknown> = {}) {
  app = createApp(KTabs, {
    id: 'demo',
    tabs: [{ label: 'One' }, { label: 'Two' }, { label: 'Three' }],
    ...props,
  })
  app.mount(host)
  return host
}

function tabEls(): HTMLButtonElement[] {
  return Array.from(host.querySelectorAll('.tabs__tab'))
}
function panelEls(): HTMLElement[] {
  return Array.from(host.querySelectorAll('.tabs__panel'))
}
function keydown(el: HTMLElement, key: string) {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
}

describe('KTabs behavior', () => {
  it('click selects: aria-selected + hidden flip together', async () => {
    mount()
    const tabs = tabEls()
    tabs[1].click()
    await nextTick()

    expect(tabEls()[0].getAttribute('aria-selected')).toBe('false')
    expect(tabEls()[1].getAttribute('aria-selected')).toBe('true')
    expect(panelEls()[0].hasAttribute('hidden')).toBe(true)
    expect(panelEls()[1].hasAttribute('hidden')).toBe(false)
  })

  it('ArrowRight/ArrowLeft move with wrap', async () => {
    mount()
    tabEls()[2].focus()
    keydown(tabEls()[2], 'ArrowRight')
    await nextTick()
    expect(document.activeElement).toBe(tabEls()[0])
    expect(tabEls()[0].getAttribute('aria-selected')).toBe('true')

    keydown(tabEls()[0], 'ArrowLeft')
    await nextTick()
    expect(document.activeElement).toBe(tabEls()[2])
    expect(tabEls()[2].getAttribute('aria-selected')).toBe('true')
  })

  it('Home/End jump', async () => {
    mount()
    tabEls()[1].focus()
    keydown(tabEls()[1], 'End')
    await nextTick()
    expect(document.activeElement).toBe(tabEls()[2])

    keydown(tabEls()[2], 'Home')
    await nextTick()
    expect(document.activeElement).toBe(tabEls()[0])
  })

  it('v-model updates on select', async () => {
    const values: number[] = []
    mount({ modelValue: 0, 'onUpdate:modelValue': (v: number) => values.push(v) })
    tabEls()[2].click()
    await nextTick()
    expect(values).toEqual([2])
  })
})
