import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { useColumnReveal } from '../../sfc/composables/useColumnReveal'

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
    <div class="app">
      <aside class="sidebar"><div>One</div><div>Two</div></aside>
      <main class="book"><div>Body</div></main>
      <aside class="inspector"><div>Card</div></aside>
    </div>
  `
  return host.querySelector('.app') as HTMLElement
}

function wait(ms = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe('useColumnReveal behavior', () => {
  it('stamps a reveal animation on every visible column child on initial paint', () => {
    const app = buildApp()
    const dispose = useColumnReveal(app)

    app.querySelectorAll('.sidebar > *').forEach((el) => {
      expect((el as HTMLElement).style.animation).toContain('reveal-from-left')
    })
    app.querySelectorAll('.book > *').forEach((el) => {
      expect((el as HTMLElement).style.animation).toContain('reveal-from-below')
    })
    app.querySelectorAll('.inspector > *').forEach((el) => {
      expect((el as HTMLElement).style.animation).toContain('reveal-from-right')
    })

    dispose()
  })

  it('re-reveals a column when a data-view swap flips it from hidden to visible', async () => {
    const app = buildApp()
    const sidebar = app.querySelector('.sidebar') as HTMLElement
    // happy-dom has no layout engine; fake "not visible" with an
    // explicit inline display none, same as CSS would do via
    // [data-view] selectors.
    sidebar.style.display = 'none'
    const dispose = useColumnReveal(app)

    const child = sidebar.querySelector('div') as HTMLElement
    expect(child.style.animation).toBe('')

    sidebar.style.display = ''
    app.setAttribute('data-view', 'nav')
    await wait()

    expect(child.style.animation).toContain('reveal-from-left')

    dispose()
  })

  it('dispose disconnects the observer — a later data-view swap no longer re-reveals', async () => {
    const app = buildApp()
    const sidebar = app.querySelector('.sidebar') as HTMLElement
    sidebar.style.display = 'none'
    const dispose = useColumnReveal(app)
    dispose()

    const child = sidebar.querySelector('div') as HTMLElement
    sidebar.style.display = ''
    app.setAttribute('data-view', 'nav')
    await wait()

    expect(child.style.animation).toBe('')
  })
})
