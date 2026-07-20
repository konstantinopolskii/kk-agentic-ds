import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { useNarrowView } from '../../sfc/composables/useNarrowView'

let host: HTMLDivElement

beforeEach(() => {
  host = document.createElement('div')
  document.body.appendChild(host)
})

afterEach(() => {
  host.remove()
})

function buildApp(): HTMLElement {
  host.innerHTML = `
    <div class="app" data-view="doc">
      <nav id="toc"><a href="#alpha">Alpha</a></nav>
      <button data-view-target="nav">Nav</button>
      <button data-view-target="inspector">Inspector</button>
      <button data-view-target="doc">Doc</button>
    </div>
  `
  return host.querySelector('.app') as HTMLElement
}

describe('useNarrowView behavior', () => {
  it('a [data-view-target] click sets data-view', () => {
    const app = buildApp()
    const dispose = useNarrowView(app)
    ;(app.querySelector('[data-view-target="nav"]') as HTMLElement).click()
    expect(app.getAttribute('data-view')).toBe('nav')
    dispose()
  })

  it('clicking the active target again returns to doc', () => {
    const app = buildApp()
    const dispose = useNarrowView(app)
    const navBtn = app.querySelector('[data-view-target="nav"]') as HTMLElement
    navBtn.click()
    expect(app.getAttribute('data-view')).toBe('nav')
    navBtn.click()
    expect(app.getAttribute('data-view')).toBe('doc')
    dispose()
  })

  it('the doc target never toggles away from itself', () => {
    const app = buildApp()
    const dispose = useNarrowView(app)
    const docBtn = app.querySelector('[data-view-target="doc"]') as HTMLElement
    docBtn.click()
    expect(app.getAttribute('data-view')).toBe('doc')
    docBtn.click()
    expect(app.getAttribute('data-view')).toBe('doc')
    dispose()
  })

  it('clicking a toc link returns the view to doc', () => {
    const app = buildApp()
    const dispose = useNarrowView(app)
    app.setAttribute('data-view', 'nav')
    ;(app.querySelector('#toc a') as HTMLElement).click()
    expect(app.getAttribute('data-view')).toBe('doc')
    dispose()
  })

  it('dispose removes the listeners', () => {
    const app = buildApp()
    const dispose = useNarrowView(app)
    dispose()
    ;(app.querySelector('[data-view-target="nav"]') as HTMLElement).click()
    expect(app.getAttribute('data-view')).toBe('doc')
  })
})
