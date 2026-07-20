import { afterAll, afterEach, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, ref, type App, type PropType } from 'vue'
import { useCommentStore, type UseCommentStoreOptions } from '../../sfc/composables/useCommentStore'

// Node ships its own global `localStorage` (stable since Node 22). Without
// --localstorage-file it resolves to an inert stub with no Storage methods,
// and in this vitest/happy-dom setup `window` is the same object as
// globalThis — so window.localStorage hits that same broken stub instead of
// a real Storage. Irrelevant in production (a real browser's window.localStorage
// always works); here it just means the test file needs a working
// polyfill installed for the duration of this file.
class MemoryStorage implements Storage {
  private store = new Map<string, string>()
  get length() {
    return this.store.size
  }
  clear(): void {
    this.store.clear()
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null
  }
  removeItem(key: string): void {
    this.store.delete(key)
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value))
  }
}

vi.stubGlobal('localStorage', new MemoryStorage())
afterAll(() => vi.unstubAllGlobals())

const storage = window.localStorage

let host: HTMLDivElement
let app: App | null = null

function storageKey(): string {
  return 'kk:comments:' + window.location.pathname
}

afterEach(() => {
  app?.unmount()
  app = null
  host?.remove()
  storage.clear()
})

function mount(options: UseCommentStoreOptions = {}) {
  host = document.createElement('div')
  document.body.appendChild(host)

  const Harness = defineComponent({
    props: { options: { type: Object as PropType<UseCommentStoreOptions>, default: () => ({}) } },
    setup(props) {
      const bookRef = ref<HTMLElement | null>(null)
      const inspectorRef = ref<HTMLElement | null>(null)
      const store = useCommentStore(bookRef, inspectorRef, props.options)
      return { bookRef, inspectorRef, clear: store.clear }
    },
    template: `
      <div>
        <article class="book" ref="bookRef">Hello there, this needs review before shipping.</article>
        <aside class="inspector" ref="inspectorRef"><div class="comment-stack"></div></aside>
        <button class="clear-btn" type="button" @click="clear">Clear</button>
      </div>
    `,
  })

  app = createApp(Harness, { options })
  app.mount(host)
  return host
}

function stackEl(): HTMLElement {
  return host.querySelector('.comment-stack') as HTMLElement
}
function bookEl(): HTMLElement {
  return host.querySelector('.book') as HTMLElement
}

describe('useCommentStore behavior', () => {
  it('debounce-saves the stack innerHTML to localStorage on mutation', async () => {
    mount()
    stackEl().innerHTML = '<div class="comment-thread" data-thread-id="c1"></div>'
    await new Promise((resolve) => setTimeout(resolve, 300))
    const raw = storage.getItem(storageKey())
    expect(raw).not.toBeNull()
    const snap = JSON.parse(raw!)
    expect(snap.v).toBe(1)
    expect(typeof snap.savedAt).toBe('number')
    expect(snap.stack).toContain('data-thread-id="c1"')
  })

  it('restores a stored snapshot on mount and re-wraps the anchored quote', () => {
    storage.setItem(
      storageKey(),
      JSON.stringify({
        v: 1,
        savedAt: Date.now(),
        stack: '<div class="comment-thread" data-thread-id="c1" data-kk-anchor-quote="needs review"></div>',
      }),
    )
    mount()
    expect(stackEl().innerHTML).toContain('data-thread-id="c1"')
    const mark = bookEl().querySelector('.highlight[data-comment-id="c1"]')
    expect(mark).not.toBeNull()
    expect(mark?.textContent).toBe('needs review')
  })

  it('accepts a snapshot missing the v field (pre-versioned compatibility)', () => {
    storage.setItem(
      storageKey(),
      JSON.stringify({ savedAt: Date.now(), stack: '<div class="comment-thread" data-thread-id="legacy"></div>' }),
    )
    mount()
    expect(stackEl().innerHTML).toContain('data-thread-id="legacy"')
  })

  it('ignores a snapshot with an incompatible schema version', () => {
    storage.setItem(
      storageKey(),
      JSON.stringify({ v: 2, savedAt: Date.now(), stack: '<div data-thread-id="future"></div>' }),
    )
    mount()
    expect(stackEl().innerHTML).toBe('')
  })

  it('enabled: false skips restore and save entirely', async () => {
    storage.setItem(
      storageKey(),
      JSON.stringify({ v: 1, savedAt: Date.now(), stack: '<div data-thread-id="should-not-load"></div>' }),
    )
    mount({ enabled: false })
    expect(stackEl().innerHTML).toBe('')

    stackEl().innerHTML = '<div class="comment-thread" data-thread-id="c1"></div>'
    await new Promise((resolve) => setTimeout(resolve, 300))
    expect(storage.getItem(storageKey())).toContain('should-not-load')
  })

  it('adapter: "none" disables persistence the same way', async () => {
    mount({ adapter: 'none' })
    stackEl().innerHTML = '<div class="comment-thread" data-thread-id="c1"></div>'
    await new Promise((resolve) => setTimeout(resolve, 300))
    expect(storage.getItem(storageKey())).toBeNull()
  })

  it('a custom adapter routes load/save/clear instead of localStorage', async () => {
    const backing: { snap?: string } = {}
    const adapter = {
      load: vi.fn(() => (backing.snap ? JSON.parse(backing.snap) : null)),
      save: vi.fn((snap: unknown) => {
        backing.snap = JSON.stringify(snap)
      }),
      clear: vi.fn(() => {
        delete backing.snap
      }),
    }
    mount({ adapter })
    expect(adapter.load).toHaveBeenCalled()

    stackEl().innerHTML = '<div class="comment-thread" data-thread-id="c1"></div>'
    await new Promise((resolve) => setTimeout(resolve, 300))
    expect(adapter.save).toHaveBeenCalled()
    const saved = JSON.parse(backing.snap!)
    expect(saved.stack).toContain('data-thread-id="c1"')
    expect(storage.getItem(storageKey())).toBeNull()
  })

  it('clear() clears the adapter and reloads the page', () => {
    storage.setItem(storageKey(), JSON.stringify({ v: 1, savedAt: Date.now(), stack: '' }))
    mount()
    const reloadSpy = vi.spyOn(window.location, 'reload').mockImplementation(() => {})

    host.querySelector<HTMLButtonElement>('.clear-btn')!.click()

    expect(storage.getItem(storageKey())).toBeNull()
    expect(reloadSpy).toHaveBeenCalledTimes(1)
    reloadSpy.mockRestore()
  })
})
