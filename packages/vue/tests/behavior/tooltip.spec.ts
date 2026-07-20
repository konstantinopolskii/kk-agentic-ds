import { describe, it, expect, afterEach } from 'vitest'
import { createApp, nextTick, type App } from 'vue'
import KTooltip from '../../sfc/components/KTooltip.vue'

let host: HTMLDivElement | null = null
let app: App | null = null

function mount(props: Record<string, unknown>) {
  host = document.createElement('div')
  document.body.appendChild(host)
  app = createApp(KTooltip, props)
  app.mount(host)
  return host
}

afterEach(() => {
  app?.unmount()
  host?.remove()
  app = null
  host = null
})

describe('KTooltip behavior', () => {
  it('opens on mouseenter, closes on mouseleave', async () => {
    const root = mount({ text: 'Saved to drafts' })
    const wrapper = root.querySelector('.tooltip') as HTMLElement
    const bubble = root.querySelector('.tooltip__bubble') as HTMLElement

    expect(bubble.getAttribute('data-state')).toBe('closed')

    wrapper.dispatchEvent(new MouseEvent('mouseenter'))
    await nextTick()
    expect(bubble.getAttribute('data-state')).toBe('open')

    wrapper.dispatchEvent(new MouseEvent('mouseleave'))
    await nextTick()
    expect(bubble.getAttribute('data-state')).toBe('closed')
  })

  it('opens on focus, closes on blur (focusout past the wrapper)', async () => {
    const root = mount({ text: 'Saved to drafts' })
    const wrapper = root.querySelector('.tooltip') as HTMLElement
    const trigger = root.querySelector('.tooltip__trigger') as HTMLElement
    const bubble = root.querySelector('.tooltip__bubble') as HTMLElement

    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    await nextTick()
    expect(bubble.getAttribute('data-state')).toBe('open')

    trigger.dispatchEvent(
      new FocusEvent('focusout', { bubbles: true, relatedTarget: document.body }),
    )
    await nextTick()
    expect(bubble.getAttribute('data-state')).toBe('closed')
    void wrapper
  })

  it('closes on Escape while open', async () => {
    const root = mount({ text: 'Saved to drafts' })
    const wrapper = root.querySelector('.tooltip') as HTMLElement
    const bubble = root.querySelector('.tooltip__bubble') as HTMLElement

    wrapper.dispatchEvent(new MouseEvent('mouseenter'))
    await nextTick()
    expect(bubble.getAttribute('data-state')).toBe('open')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(bubble.getAttribute('data-state')).toBe('closed')
  })

  it('only one bubble open page-wide — opening one closes the other', async () => {
    // Second instance mounted by hand so afterEach cleanup still covers the first.
    const rootA = mount({ text: 'First hint' })
    const hostB = document.createElement('div')
    document.body.appendChild(hostB)
    const appB = createApp(KTooltip, { text: 'Second hint' })
    appB.mount(hostB)

    try {
      const wrapperA = rootA.querySelector('.tooltip') as HTMLElement
      const bubbleA = rootA.querySelector('.tooltip__bubble') as HTMLElement
      const wrapperB = hostB.querySelector('.tooltip') as HTMLElement
      const bubbleB = hostB.querySelector('.tooltip__bubble') as HTMLElement

      wrapperA.dispatchEvent(new MouseEvent('mouseenter'))
      await nextTick()
      expect(bubbleA.getAttribute('data-state')).toBe('open')

      wrapperB.dispatchEvent(new MouseEvent('mouseenter'))
      await nextTick()
      expect(bubbleB.getAttribute('data-state')).toBe('open')
      expect(bubbleA.getAttribute('data-state')).toBe('closed')
    } finally {
      appB.unmount()
      hostB.remove()
    }
  })
})
