import { afterEach, describe, expect, it } from 'vitest'
import { createApp, defineComponent, ref, type App } from 'vue'
import { useCommentFlow, type CommentEventDetail } from '../../sfc/composables/useCommentFlow'

/* Behavior coverage for useCommentFlow — as much of kit.js's
   initCommentSelectionFlow (839-1643) as happy-dom's Selection/Range
   implementation can genuinely drive. See GAPS in the final report for
   the slices this harness cannot exercise (native IME composition,
   cross-block-element selections, and the mobile narrow-view swap's
   exact CSS breakpoint match against a real layout). */

let host: HTMLDivElement
let app: App | null = null

afterEach(() => {
  app?.unmount()
  app = null
  host?.remove()
})

function mount(bookText = 'The tag row needs one more variant to cover it.') {
  host = document.createElement('div')
  document.body.appendChild(host)

  const Harness = defineComponent({
    setup() {
      const bookRef = ref<HTMLElement | null>(null)
      const inspectorRef = ref<HTMLElement | null>(null)
      useCommentFlow(bookRef, inspectorRef, { currentAuthor: 'Konstantin Konstantinopolskii' })
      return { bookRef, inspectorRef }
    },
    template: `
      <div class="app">
        <article class="book" ref="bookRef"><p>${bookText}</p></article>
        <aside class="inspector" ref="inspectorRef"><div class="comment-stack"></div></aside>
      </div>
    `,
  })

  app = createApp(Harness)
  app.mount(host)
  return host
}

function bookP(): HTMLParagraphElement {
  return host.querySelector('.book p') as HTMLParagraphElement
}
function stack(): HTMLElement {
  return host.querySelector('.comment-stack') as HTMLElement
}
function appEl(): HTMLElement {
  return host.querySelector('.app') as HTMLElement
}

function selectSubstring(match: string) {
  const p = bookP()
  const textNode = p.firstChild as Text
  const idx = textNode.data.indexOf(match)
  if (idx < 0) throw new Error(`"${match}" not found in book text`)
  const range = document.createRange()
  range.setStart(textNode, idx)
  range.setEnd(textNode, idx + match.length)
  const sel = window.getSelection()!
  sel.removeAllRanges()
  sel.addRange(range)
  bookP().dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
}

function draftInput(): HTMLInputElement {
  return stack().querySelector('.comment-new__field .field__input') as HTMLInputElement
}

function commitViaEnter(text: string) {
  const input = draftInput()
  input.value = text
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
}

function kebabItem(thread: HTMLElement, label: string): HTMLButtonElement {
  const items = Array.from(thread.querySelectorAll('.comment-thread__list .comment__menu-item')) as HTMLButtonElement[]
  const item = items.find((b) => b.textContent?.trim() === label)
  if (!item) throw new Error(`kebab item "${label}" not found`)
  return item
}

function listenOnce(target: EventTarget, type: string): { detail: CommentEventDetail | null } {
  const box: { detail: CommentEventDetail | null } = { detail: null }
  target.addEventListener(
    type,
    (e) => {
      box.detail = (e as CustomEvent<CommentEventDetail>).detail
    },
    { once: true },
  )
  return box
}

const flush = () => new Promise((resolve) => setTimeout(resolve, 30))

describe('useCommentFlow behavior', () => {
  it('selecting text in the book opens a draft and wraps a highlight', () => {
    mount()
    selectSubstring('tag row')
    expect(appEl().getAttribute('data-selection')).toBe('true')
    expect(stack().querySelector('.card.comment-new')).not.toBeNull()
    expect(draftInput().placeholder).toBe('Add a comment')
    expect(bookP().querySelector('.highlight')?.textContent).toBe('tag row')
  })

  it('typing into the draft mirrors into the preview', () => {
    mount()
    selectSubstring('tag row')
    const input = draftInput()
    input.value = 'Looks right, thanks'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    expect(stack().querySelector('.comment-new__preview')?.textContent).toBe('Looks right, thanks')
  })

  it('Enter on the draft field commits a thread and emits kk:comment "new"', () => {
    mount()
    selectSubstring('tag row')
    const box = listenOnce(stack(), 'kk:comment')
    commitViaEnter('Looks right, thanks')

    expect(stack().querySelector('.card.comment-new')).toBeNull()
    const thread = stack().querySelector('.comment-thread') as HTMLElement
    expect(thread).not.toBeNull()
    expect(thread.querySelector('.comment-msg .t-subtitle')?.textContent).toBe('Konstantin Konstantinopolskii')
    expect(thread.querySelector('.comment-msg p.t-caption')?.textContent).toBe('Looks right, thanks')
    expect(box.detail).toEqual(
      expect.objectContaining({ action: 'new', text: 'Looks right, thanks', anchorQuote: 'tag row' }),
    )
  })

  it('Escape on an empty draft removes it and unwraps the highlight', () => {
    mount()
    selectSubstring('tag row')
    expect(bookP().querySelector('.highlight')).not.toBeNull()
    draftInput().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

    expect(stack().querySelector('.card.comment-new')).toBeNull()
    expect(bookP().querySelector('.highlight')).toBeNull()
    expect(bookP().textContent).toContain('tag row')
  })

  it('kebab Reply promotes the thread and focuses the reply field', async () => {
    mount()
    selectSubstring('tag row')
    commitViaEnter('Looks right, thanks')
    const thread = stack().querySelector('.comment-thread') as HTMLElement
    let clicked = false
    thread.addEventListener('click', () => (clicked = true), { once: true })

    kebabItem(thread, 'Reply').click()
    expect(clicked).toBe(true) // thread promoted via synthetic click, per kit.js
    await flush()
    expect(document.activeElement).toBe(thread.querySelector('.comment-thread__reply .field__input'))
  })

  it('Enter in the reply field appends a message and emits kk:comment "reply"', () => {
    mount()
    selectSubstring('tag row')
    commitViaEnter('Looks right, thanks')
    const thread = stack().querySelector('.comment-thread') as HTMLElement
    const box = listenOnce(stack(), 'kk:comment')

    const reply = thread.querySelector('.comment-thread__reply .field__input') as HTMLInputElement
    reply.value = 'One more pass please'
    reply.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

    const msgs = thread.querySelectorAll('.comment-thread__list > .comment-msg')
    expect(msgs.length).toBe(2)
    expect(msgs[1].querySelector('p.t-caption')?.textContent).toBe('One more pass please')
    expect(reply.value).toBe('')
    expect(box.detail).toEqual(expect.objectContaining({ action: 'reply', text: 'One more pass please' }))
  })

  it('kebab Edit prefills the edit field and commits the new body on Enter', async () => {
    mount()
    selectSubstring('tag row')
    commitViaEnter('Looks right, thanks')
    const thread = stack().querySelector('.comment-thread') as HTMLElement
    const msg = thread.querySelector('.comment-thread__list .comment-msg') as HTMLElement

    kebabItem(thread, 'Edit').click()
    expect(thread.getAttribute('data-editing')).toBe('true')
    const editInput = thread.querySelector('.comment-thread__edit .field__input') as HTMLInputElement
    expect(editInput.value).toBe('Looks right, thanks')

    const box = listenOnce(stack(), 'kk:comment')
    editInput.value = 'Looks right, thank you very much'
    editInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

    expect(thread.hasAttribute('data-editing')).toBe(false)
    expect(msg.querySelector('p.t-caption')?.textContent).toBe('Looks right, thank you very much')
    expect(box.detail).toEqual(expect.objectContaining({ action: 'edit', text: 'Looks right, thank you very much' }))
  })

  it('Escape cancels edit mode without committing', () => {
    mount()
    selectSubstring('tag row')
    commitViaEnter('Looks right, thanks')
    const thread = stack().querySelector('.comment-thread') as HTMLElement
    const msg = thread.querySelector('.comment-thread__list .comment-msg') as HTMLElement

    kebabItem(thread, 'Edit').click()
    const editInput = thread.querySelector('.comment-thread__edit .field__input') as HTMLInputElement
    editInput.value = 'Never mind'
    editInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

    expect(thread.hasAttribute('data-editing')).toBe(false)
    expect(msg.querySelector('p.t-caption')?.textContent).toBe('Looks right, thanks')
  })

  it('kebab Approve resolves the thread using the last agent message', () => {
    mount()
    selectSubstring('tag row')
    commitViaEnter('Looks right, thanks')
    const thread = stack().querySelector('.comment-thread') as HTMLElement

    const agentMsg = document.createElement('div')
    agentMsg.className = 'comment-msg'
    agentMsg.setAttribute('data-message-id', 'agent-1')
    agentMsg.setAttribute('data-author-role', 'agent')
    agentMsg.innerHTML =
      '<div class="comment-msg__header"><div class="t-subtitle">Claude</div></div>' +
      '<p class="t-caption">Added a bold tag at the end of the row.</p>'
    thread.querySelector('.comment-thread__list')!.appendChild(agentMsg)

    const box = listenOnce(stack(), 'kk:comment')
    kebabItem(thread, 'Approve').click()

    expect(thread.getAttribute('data-resolved')).toBe('true')
    expect(thread.getAttribute('data-state')).toBe('minimized')
    expect(thread.querySelector('.comment-thread__resolved-snippet')?.textContent).toBe(
      'Added a bold tag at the end of the row.',
    )
    expect(thread.querySelector('.comment-thread__resolved-byline')?.textContent).toBe('Claude')
    expect(box.detail).toEqual(
      expect.objectContaining({ action: 'approve', replacementText: 'Added a bold tag at the end of the row.' }),
    )
  })

  it('kebab Archive thread hides the thread behind data-archived', () => {
    mount()
    selectSubstring('tag row')
    commitViaEnter('Looks right, thanks')
    const thread = stack().querySelector('.comment-thread') as HTMLElement
    const box = listenOnce(stack(), 'kk:comment')

    kebabItem(thread, 'Archive thread').click()

    expect(thread.getAttribute('data-archived')).toBe('true')
    expect(thread.getAttribute('data-state')).toBe('minimized')
    expect(stack().contains(thread)).toBe(true) // retained, just hidden by CSS
    expect(box.detail).toEqual(expect.objectContaining({ action: 'archive', threadRemoved: false }))
  })

  it('kebab Delete on the only message removes the whole thread', () => {
    mount()
    selectSubstring('tag row')
    commitViaEnter('Looks right, thanks')
    const thread = stack().querySelector('.comment-thread') as HTMLElement
    const box = listenOnce(stack(), 'kk:comment')

    kebabItem(thread, 'Delete').click()

    expect(stack().querySelector('.comment-thread')).toBeNull()
    expect(box.detail).toEqual(expect.objectContaining({ action: 'delete', threadRemoved: true }))
  })

  it('kebab Delete on one of several messages keeps the thread and re-renders the preview', () => {
    mount()
    selectSubstring('tag row')
    commitViaEnter('Looks right, thanks')
    const thread = stack().querySelector('.comment-thread') as HTMLElement
    const reply = thread.querySelector('.comment-thread__reply .field__input') as HTMLInputElement
    reply.value = 'Second message'
    reply.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

    const firstMsg = thread.querySelector('.comment-thread__list .comment-msg') as HTMLElement
    const box = listenOnce(stack(), 'kk:comment')
    const items = Array.from(firstMsg.querySelectorAll('.comment__menu-item')) as HTMLButtonElement[]
    items.find((b) => b.textContent?.trim() === 'Delete')!.click()

    expect(stack().contains(thread)).toBe(true)
    expect(thread.querySelectorAll('.comment-thread__list > .comment-msg').length).toBe(1)
    expect(box.detail).toEqual(expect.objectContaining({ action: 'delete', threadRemoved: false }))
  })

  it('clicking a highlight promotes its thread via a synthetic click', () => {
    mount()
    selectSubstring('tag row')
    commitViaEnter('Looks right, thanks')
    const thread = stack().querySelector('.comment-thread') as HTMLElement
    const mark = bookP().querySelector('.highlight') as HTMLElement
    let clicked = false
    thread.addEventListener('click', () => (clicked = true), { once: true })

    mark.click()

    expect(clicked).toBe(true)
    expect(appEl().hasAttribute('data-view')).toBe(false) // desktop width: no narrow-view swap
  })

  it('the add-comment FAB switches the app to the inspector view', () => {
    // fab must exist BEFORE mount() — bind() queries '.fab--comment' once
    // at onMounted time (faithful to kit.js's own one-time query), so it
    // has to be in the document ahead of app.mount(host).
    const fab = document.createElement('button')
    fab.className = 'fab--comment'
    document.body.appendChild(fab)
    try {
      mount()
      fab.click()
      expect(appEl().getAttribute('data-view')).toBe('inspector')
    } finally {
      fab.remove()
    }
  })

  it('typing a character while a draft is active focuses its input', () => {
    mount()
    selectSubstring('tag row')
    // Real promotion to data-state="active" happens via the out-of-scope
    // inspector-stack module (shells agent) reacting to the draft's
    // synthetic click; stamp it directly here to exercise this
    // composable's own type-to-focus behavior in isolation.
    const draft = stack().querySelector('.card.comment-new') as HTMLElement
    draft.setAttribute('data-state', 'active')
    ;(document.activeElement as HTMLElement | null)?.blur?.()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
    expect(document.activeElement).toBe(draftInput())
  })

  // Split into two single-delivery tests rather than one test asserting
  // both flips in sequence. happy-dom's MutationObserverListener wraps
  // its dispatch callback in a bare WeakRef with nothing else keeping it
  // alive (node_modules/happy-dom/src/mutation-observer/
  // MutationObserverListener.ts); under the allocation pressure of a
  // full suite run, V8 can collect that closure between an observer's
  // first and second delivery, silently dropping the second one — this
  // reproduces deterministically even in isolation by forcing a GC
  // between the two setAttribute calls (`node --expose-gc` +
  // `globalThis.gc()`). Not a useCommentFlow bug: each of these tests
  // only requires ONE delivery to its own fresh observer, which is
  // reliable; the composable's actual add/remove logic is exercised
  // identically to before.
  it('the highlight-active observer adds highlight--active when the card becomes active', async () => {
    mount()
    selectSubstring('tag row')
    commitViaEnter('Looks right, thanks')
    const thread = stack().querySelector('.comment-thread') as HTMLElement
    const mark = bookP().querySelector('.highlight') as HTMLElement
    expect(mark.classList.contains('highlight--active')).toBe(false)

    thread.setAttribute('data-state', 'active')
    await flush()
    expect(mark.classList.contains('highlight--active')).toBe(true)
  })

  it('the highlight-active observer removes highlight--active when the card leaves active state', async () => {
    mount()
    selectSubstring('tag row')
    commitViaEnter('Looks right, thanks')
    const thread = stack().querySelector('.comment-thread') as HTMLElement
    const mark = bookP().querySelector('.highlight') as HTMLElement
    // Establish the "was active" starting condition directly instead of
    // via the observer, so this test also needs only one delivery.
    mark.classList.add('highlight--active')

    thread.setAttribute('data-state', 'minimized')
    await flush()
    expect(mark.classList.contains('highlight--active')).toBe(false)
  })

  it('demoting an empty draft auto-dismisses it', async () => {
    mount()
    selectSubstring('tag row')
    const draft = stack().querySelector('.card.comment-new') as HTMLElement
    draft.setAttribute('data-state', 'minimized')
    await flush()
    expect(stack().querySelector('.card.comment-new')).toBeNull()
    expect(bookP().querySelector('.highlight')).toBeNull()
  })
})
