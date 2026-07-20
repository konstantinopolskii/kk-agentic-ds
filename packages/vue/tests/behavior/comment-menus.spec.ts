import { afterEach, describe, expect, it } from 'vitest'
import { createApp, defineComponent, ref, type App } from 'vue'
import { useCommentMenus } from '../../sfc/composables/useCommentMenus'

let host: HTMLDivElement
let app: App | null = null

afterEach(() => {
  app?.unmount()
  app = null
  host?.remove()
})

function threadMarkup(threadId: string, opts: { archived?: boolean; lastAgent?: boolean }) {
  const lastRole = opts.lastAgent ? ' data-author-role="agent"' : ''
  return `
    <div class="comment-thread" data-thread-id="${threadId}" ${opts.archived ? 'data-archived="true"' : ''}>
      <div class="comment-thread__list">
        <div class="comment-msg" data-message-id="${threadId}-m1">
          <div class="comment-msg__header">
            <button class="comment__menu" type="button" aria-expanded="false"><span></span></button>
          </div>
          <div class="comment__menu-popover" role="menu">
            <button class="comment__menu-item comment__menu-item--approve">Approve</button>
          </div>
        </div>
        <div class="comment-msg" data-message-id="${threadId}-m2"${lastRole}>
          <div class="comment-msg__header">
            <button class="comment__menu" type="button" aria-expanded="false"><span></span></button>
          </div>
          <div class="comment__menu-popover" role="menu">
            <button class="comment__menu-item comment__menu-item--approve">Approve</button>
          </div>
        </div>
      </div>
    </div>
  `
}

function mount() {
  host = document.createElement('div')
  document.body.appendChild(host)

  const Harness = defineComponent({
    setup() {
      const rootRef = ref<HTMLElement | null>(null)
      useCommentMenus(rootRef)
      return { rootRef }
    },
    template: `
      <div ref="rootRef">
        ${threadMarkup('t1', { lastAgent: true })}
        ${threadMarkup('t2', { lastAgent: false })}
        ${threadMarkup('t3', { archived: true, lastAgent: true })}
      </div>
    `,
  })

  app = createApp(Harness)
  app.mount(host)
  return host
}

function thread(id: string): HTMLElement {
  return host.querySelector(`.comment-thread[data-thread-id="${id}"]`) as HTMLElement
}
function kebab(id: string): HTMLButtonElement {
  return thread(id).querySelector('.comment__menu') as HTMLButtonElement
}

describe('useCommentMenus behavior', () => {
  it('kebab click opens the popover (aria-expanded true)', () => {
    mount()
    expect(kebab('t1').getAttribute('aria-expanded')).toBe('false')
    kebab('t1').click()
    expect(kebab('t1').getAttribute('aria-expanded')).toBe('true')
  })

  it('kebab click toggles closed on a second click', () => {
    mount()
    kebab('t1').click()
    expect(kebab('t1').getAttribute('aria-expanded')).toBe('true')
    kebab('t1').click()
    expect(kebab('t1').getAttribute('aria-expanded')).toBe('false')
  })

  it('opening a menu closes any other open menu in the container', () => {
    mount()
    kebab('t1').click()
    expect(kebab('t1').getAttribute('aria-expanded')).toBe('true')
    kebab('t2').click()
    expect(kebab('t1').getAttribute('aria-expanded')).toBe('false')
    expect(kebab('t2').getAttribute('aria-expanded')).toBe('true')
  })

  it('opening a menu stamps data-can-approve when the thread is eligible', () => {
    mount()
    kebab('t1').click()
    expect(thread('t1').getAttribute('data-can-approve')).toBe('true')
  })

  it('opening a menu clears data-can-approve when the last message is not an agent reply', () => {
    mount()
    kebab('t2').click()
    expect(thread('t2').hasAttribute('data-can-approve')).toBe(false)
  })

  it('archived threads never get data-can-approve, even with an agent last message', () => {
    mount()
    kebab('t3').click()
    expect(thread('t3').hasAttribute('data-can-approve')).toBe(false)
  })

  it('Escape closes every open menu', () => {
    mount()
    kebab('t1').click()
    expect(kebab('t1').getAttribute('aria-expanded')).toBe('true')
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(kebab('t1').getAttribute('aria-expanded')).toBe('false')
  })

  it('clicking outside any menu closes every open menu', () => {
    mount()
    kebab('t1').click()
    expect(kebab('t1').getAttribute('aria-expanded')).toBe('true')
    document.body.click()
    expect(kebab('t1').getAttribute('aria-expanded')).toBe('false')
  })
})
