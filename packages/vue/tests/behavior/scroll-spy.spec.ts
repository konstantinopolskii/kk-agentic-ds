import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { useScrollSpy } from '../../sfc/composables/useScrollSpy'

/* happy-dom has no IntersectionObserver. Stub a minimal class that
   records its callback and lets a test fire entries by hand. */
class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = []
  callback: IntersectionObserverCallback
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    FakeIntersectionObserver.instances.push(this)
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  trigger(entries: Array<{ target: Element; isIntersecting: boolean }>) {
    this.callback(entries as unknown as IntersectionObserverEntry[], this as unknown as IntersectionObserver)
  }
}

let host: HTMLDivElement

beforeEach(() => {
  FakeIntersectionObserver.instances = []
  ;(window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = FakeIntersectionObserver
  host = document.createElement('div')
  document.body.appendChild(host)
})

afterEach(() => {
  host.remove()
})

function buildBookNav(bodyHtml: string, navAttrs = ''): { book: HTMLElement; nav: HTMLElement } {
  host.innerHTML = `
    <aside class="sidebar">
      <nav class="sidebar__nav" id="toc" ${navAttrs}><span class="toc__indicator" aria-hidden="true"></span></nav>
    </aside>
    <main class="book" id="doc">${bodyHtml}</main>
  `
  return {
    book: host.querySelector('.book') as HTMLElement,
    nav: host.querySelector('.sidebar__nav') as HTMLElement,
  }
}

describe('useScrollSpy behavior', () => {
  it('stamps ids on book__section and direct h2/h3 children, hand-authored ids win', () => {
    const { book, nav } = buildBookNav(`
      <article class="book__section"><h2>Getting Started</h2></article>
      <article class="book__section" id="kept"><h2 id="kept-heading">Already Has Id</h2></article>
    `)
    const dispose = useScrollSpy(book, nav)

    const sections = book.querySelectorAll('.book__section')
    expect(sections[0].id).toBe('getting-started')
    expect(sections[0].querySelector('h2')!.id).toBe('getting-started')
    // Hand-authored ids win — untouched.
    expect(sections[1].id).toBe('kept')
    expect(sections[1].querySelector('h2')!.id).toBe('kept-heading')

    dispose()
  })

  it('auto-fills a flat nav from h2 headings (no h1, no h3 anywhere)', () => {
    const { book, nav } = buildBookNav(`
      <article class="book__section"><h2>Alpha</h2></article>
      <article class="book__section"><h2>Beta</h2></article>
    `)
    const dispose = useScrollSpy(book, nav)

    const groups = nav.querySelectorAll('.nav-group')
    expect(groups.length).toBe(1)
    expect(groups[0].querySelector('.nav-group__head')).toBeNull()
    const items = Array.from(nav.querySelectorAll('.nav-group__items li a')).map((a) => a.textContent)
    expect(items).toEqual(['Alpha', 'Beta'])

    dispose()
  })

  it('auto-fills a grouped nav (h2 label + h3 items) when any top-level section has an h3', () => {
    const { book, nav } = buildBookNav(`
      <article class="book__section"><h2>Group one</h2><h3>Item one</h3><h3>Item two</h3></article>
    `)
    const dispose = useScrollSpy(book, nav)

    const head = nav.querySelector('.nav-group__head')
    expect(head?.textContent).toBe('Group one')
    const items = Array.from(nav.querySelectorAll('.nav-group__items li a')).map((a) => a.textContent)
    expect(items).toEqual(['Item one', 'Item two'])

    dispose()
  })

  it('manual opt-out skips the id stamp + nav rebuild pass', () => {
    const { book, nav } = buildBookNav(
      '<article class="book__section"><h2>Untouched</h2></article>',
      'data-nav="manual"',
    )
    const customGroup = document.createElement('section')
    customGroup.className = 'nav-group'
    customGroup.innerHTML = '<a class="nav-group__head" href="#custom">Custom</a>'
    nav.appendChild(customGroup)

    const dispose = useScrollSpy(book, nav)

    // Auto-fill never touched the hand-authored group or the section id.
    expect(nav.querySelectorAll('.nav-group').length).toBe(1)
    expect(nav.querySelector('.nav-group__head')!.textContent).toBe('Custom')
    expect(book.querySelector('.book__section')!.id).toBe('')

    dispose()
  })

  it('sets the indicator translate3d transform on scroll-spy trigger', () => {
    const { book, nav } = buildBookNav(`
      <article class="book__section"><h2>Alpha</h2></article>
      <article class="book__section"><h2>Beta</h2></article>
    `)
    const dispose = useScrollSpy(book, nav)

    const sections = book.querySelectorAll('.book__section')
    const observerInstance = FakeIntersectionObserver.instances[FakeIntersectionObserver.instances.length - 1]

    observerInstance.trigger([{ target: sections[1], isIntersecting: true }])

    const indicator = nav.querySelector('.toc__indicator') as HTMLElement
    expect(indicator.classList.contains('is-positioned')).toBe(true)
    expect(indicator.style.transform).toMatch(/^translate3d\(0,-?\d+(\.\d+)?px,0\)$/)

    dispose()
  })
})
