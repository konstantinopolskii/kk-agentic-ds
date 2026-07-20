import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, ref, type App } from 'vue'
import { extractCommentsFromStack, useCommentSecret, type CommentThreadData } from '../../sfc/composables/useCommentSecret'

let host: HTMLDivElement
let app: App | null = null
let instance: { extractComments(): CommentThreadData[]; copyComments(): CommentThreadData[] } | null = null

afterEach(() => {
  app?.unmount()
  app = null
  instance = null
  host?.remove()
})

const THREAD_MARKUP = `
  <div class="comment-thread" data-thread-id="t1" data-resolved="true"
       data-kk-anchor-quote="tag row" data-kk-anchor-prefix="The " data-kk-anchor-suffix=" needs"
       data-kk-section-slug="intro" data-kk-cluster="c1">
    <div class="comment-thread__list">
      <div class="comment-msg" data-message-id="t1-m1">
        <div class="comment-msg__header"><div class="t-subtitle">Konstantin</div></div>
        <p class="t-caption">Looks right, thanks</p>
      </div>
      <div class="comment-msg" data-message-id="t1-m2" data-author-role="agent">
        <div class="comment-msg__header"><div class="t-subtitle">Claude</div></div>
        <p class="t-caption">Fixed it.</p>
      </div>
    </div>
  </div>
`

function mount() {
  host = document.createElement('div')
  document.body.appendChild(host)

  const Harness = defineComponent({
    setup() {
      const inspectorRef = ref<HTMLElement | null>(null)
      const api = useCommentSecret(inspectorRef)
      return { inspectorRef, ...api }
    },
    template: `
      <aside class="inspector" ref="inspectorRef">
        <div class="comment-stack">${THREAD_MARKUP}</div>
      </aside>
    `,
  })

  app = createApp(Harness)
  instance = app.mount(host) as unknown as typeof instance
  return host
}

function inspectorEl(): HTMLElement {
  return host.querySelector('.inspector') as HTMLElement
}

describe('extractCommentsFromStack (pure)', () => {
  it('returns [] for a null stack', () => {
    expect(extractCommentsFromStack(null)).toEqual([])
  })

  it('extracts thread + message fields, defaulting role to "user"', () => {
    const stack = document.createElement('div')
    stack.innerHTML = THREAD_MARKUP
    const data = extractCommentsFromStack(stack)
    expect(data).toEqual([
      {
        threadId: 't1',
        resolved: true,
        archived: false,
        anchorQuote: 'tag row',
        anchorPrefix: 'The ',
        anchorSuffix: ' needs',
        sectionSlug: 'intro',
        cluster: 'c1',
        messages: [
          { messageId: 't1-m1', author: 'Konstantin', body: 'Looks right, thanks', role: 'user' },
          { messageId: 't1-m2', author: 'Claude', body: 'Fixed it.', role: 'agent' },
        ],
      },
    ])
  })
})

describe('useCommentSecret behavior', () => {
  it('inserts a hidden data-kk-action="copy-comments" heading into the inspector', () => {
    mount()
    const heading = inspectorEl().querySelector('[data-kk-action="copy-comments"]')
    expect(heading).not.toBeNull()
    expect(heading?.tagName).toBe('H2')
    expect(heading?.getAttribute('aria-hidden')).toBe('true')
  })

  it('does not insert a second heading if one already exists', () => {
    mount()
    const before = inspectorEl().querySelectorAll('[data-kk-action="copy-comments"]').length
    expect(before).toBe(1)
  })

  it('extractComments() reads the live stack via the composable API', () => {
    mount()
    const data = instance!.extractComments()
    expect(data).toHaveLength(1)
    expect(data[0].threadId).toBe('t1')
    expect(data[0].messages).toHaveLength(2)
  })

  it('copyComments() returns the same data it writes to the clipboard', () => {
    mount()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(() => Promise.resolve())
    const data = instance!.copyComments()
    expect(data).toEqual(extractCommentsFromStack(host.querySelector('.comment-stack')))
    expect(writeText).toHaveBeenCalledWith(JSON.stringify(data, null, 2))
    writeText.mockRestore()
  })

  it('clicking the hidden heading copies extracted JSON to the clipboard', () => {
    mount()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(() => Promise.resolve())
    const heading = inspectorEl().querySelector('[data-kk-action="copy-comments"]') as HTMLElement

    heading.click()

    expect(writeText).toHaveBeenCalledTimes(1)
    const json = writeText.mock.calls[0][0]
    const parsed = JSON.parse(json)
    expect(parsed).toEqual(extractCommentsFromStack(host.querySelector('.comment-stack')))
    writeText.mockRestore()
  })

  it('clicking outside the heading does not copy', () => {
    mount()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(() => Promise.resolve())
    inspectorEl().click()
    expect(writeText).not.toHaveBeenCalled()
    writeText.mockRestore()
  })
})
