import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createApp, nextTick, type App } from 'vue'
import KDropdown from '../../sfc/components/KDropdown.vue'

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
  app = createApp(KDropdown, { items: ['Alpha', 'Beta', 'Gamma'], ...props })
  app.mount(host)
  return host
}

function trigger(): HTMLButtonElement {
  return host.querySelector('.dropdown__trigger') as HTMLButtonElement
}
function popover(): HTMLElement {
  return host.querySelector('.dropdown__popover') as HTMLElement
}
function items(): HTMLButtonElement[] {
  return Array.from(host.querySelectorAll('.dropdown__item'))
}

describe('KDropdown behavior', () => {
  it('trigger click opens (aria-expanded true)', async () => {
    mount()
    expect(trigger().getAttribute('aria-expanded')).toBe('false')
    expect(popover().getAttribute('data-state')).toBe('closed')

    trigger().click()
    await nextTick()
    expect(trigger().getAttribute('aria-expanded')).toBe('true')
    expect(popover().getAttribute('data-state')).toBe('open')
  })

  it('item click emits select and closes', async () => {
    const selected: unknown[] = []
    mount({ onSelect: (it: unknown) => selected.push(it) })
    trigger().click()
    await nextTick()

    items()[0].click()
    await nextTick()
    expect(selected).toEqual(['Alpha'])
    expect(popover().getAttribute('data-state')).toBe('closed')
    expect(trigger().getAttribute('aria-expanded')).toBe('false')
  })

  it('Escape closes', async () => {
    mount()
    trigger().click()
    await nextTick()
    expect(popover().getAttribute('data-state')).toBe('open')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(popover().getAttribute('data-state')).toBe('closed')
    expect(document.activeElement).toBe(trigger())
  })

  it('outside click closes', async () => {
    mount()
    trigger().click()
    await nextTick()
    expect(popover().getAttribute('data-state')).toBe('open')

    document.body.click()
    await nextTick()
    expect(popover().getAttribute('data-state')).toBe('closed')
  })

  it('opening focuses the first item', async () => {
    mount()
    trigger().click()
    await nextTick()
    await nextTick()
    expect(document.activeElement).toBe(items()[0])
  })

  it('arrow keys rove with wrap, Home and End jump', async () => {
    mount()
    trigger().click()
    await nextTick()
    await nextTick()

    const rove = (key: string) => {
      document.activeElement?.dispatchEvent(
        new KeyboardEvent('keydown', { key, bubbles: true }),
      )
    }

    rove('ArrowDown')
    expect(document.activeElement).toBe(items()[1])
    rove('End')
    expect(document.activeElement).toBe(items()[2])
    rove('ArrowDown')
    expect(document.activeElement).toBe(items()[0])
    rove('ArrowUp')
    expect(document.activeElement).toBe(items()[2])
    rove('Home')
    expect(document.activeElement).toBe(items()[0])
  })

  it('selecting an item returns focus to the trigger', async () => {
    mount()
    trigger().click()
    await nextTick()

    items()[1].click()
    await nextTick()
    await nextTick()
    expect(document.activeElement).toBe(trigger())
  })
})
