import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { useInspectorStack } from '../../sfc/composables/useInspectorStack'

let host: HTMLDivElement

beforeEach(() => {
  host = document.createElement('div')
  document.body.appendChild(host)
})

afterEach(() => {
  host.remove()
})

function buildInspector(): HTMLElement {
  host.innerHTML = `
    <aside class="inspector">
      <div class="card card--interactive" data-testid="a"><button class="button">Reply</button></div>
      <div class="card card--interactive" data-testid="b"><button class="button">Reply</button></div>
      <div class="card" data-testid="c">Static card</div>
    </aside>
  `
  return host.querySelector('.inspector') as HTMLElement
}

describe('useInspectorStack behavior', () => {
  it('activates an interactive card on click (data-state flips to active)', () => {
    const inspector = buildInspector()
    const dispose = useInspectorStack(inspector)
    const cardA = inspector.querySelector('[data-testid="a"]') as HTMLElement

    cardA.querySelector('button')!.click()

    expect(cardA.getAttribute('data-state')).toBe('active')
    dispose()
  })

  it('promoting a second card demotes the first — one active at a time', () => {
    const inspector = buildInspector()
    const dispose = useInspectorStack(inspector)
    const cardA = inspector.querySelector('[data-testid="a"]') as HTMLElement
    const cardB = inspector.querySelector('[data-testid="b"]') as HTMLElement

    cardA.querySelector('button')!.click()
    expect(cardA.getAttribute('data-state')).toBe('active')

    cardB.querySelector('button')!.click()
    expect(cardB.getAttribute('data-state')).toBe('active')
    expect(cardA.hasAttribute('data-state')).toBe(false)

    dispose()
  })

  it('clicking empty inspector space collapses the active card', () => {
    const inspector = buildInspector()
    const dispose = useInspectorStack(inspector)
    const cardA = inspector.querySelector('[data-testid="a"]') as HTMLElement
    cardA.querySelector('button')!.click()
    expect(cardA.getAttribute('data-state')).toBe('active')

    inspector.click()
    expect(cardA.hasAttribute('data-state')).toBe(false)

    dispose()
  })

  it('touching a static card does not set data-state but collapses any active card', () => {
    const inspector = buildInspector()
    const dispose = useInspectorStack(inspector)
    const cardA = inspector.querySelector('[data-testid="a"]') as HTMLElement
    const cardC = inspector.querySelector('[data-testid="c"]') as HTMLElement
    cardA.querySelector('button')!.click()
    expect(cardA.getAttribute('data-state')).toBe('active')

    cardC.click()
    expect(cardA.hasAttribute('data-state')).toBe(false)
    expect(cardC.hasAttribute('data-state')).toBe(false)

    dispose()
  })

  it('resolved/archived interactive cards stay inert', () => {
    const inspector = buildInspector()
    const cardA = inspector.querySelector('[data-testid="a"]') as HTMLElement
    cardA.setAttribute('data-resolved', 'true')
    const dispose = useInspectorStack(inspector)

    cardA.querySelector('button')!.click()
    expect(cardA.hasAttribute('data-state')).toBe(false)

    dispose()
  })

  it('dispose removes the listeners', () => {
    const inspector = buildInspector()
    const dispose = useInspectorStack(inspector)
    const cardA = inspector.querySelector('[data-testid="a"]') as HTMLElement
    dispose()

    cardA.querySelector('button')!.click()
    expect(cardA.hasAttribute('data-state')).toBe(false)
  })
})
