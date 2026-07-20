import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/* Behavior for comment persistence — 1:1 port of initCommentPersistence
   plus its rewrap helpers (js/kit.js 1707-1843), scoped to one book +
   inspector pair instead of kit.js's single delegated instance. Same
   localStorage keys and snapshot shape as kit.js: a page migrated from
   the vanilla kit to this composable reads its existing stored
   comments straight off `kk:comments:<pathname>` without a migration
   step. Snapshot is the stack's innerHTML plus a savedAt timestamp;
   restore re-wraps doc highlights via each thread/draft's own
   kkAnchor* dataset. Client-only — every entry point no-ops under SSR
   where `document`/`localStorage` are absent. */

export interface CommentSnapshot {
  v?: number
  savedAt: number
  stack: string
}

export interface CommentStoreAdapter {
  load(): CommentSnapshot | null
  save(snapshot: CommentSnapshot): void
  clear(): void
}

export interface UseCommentStoreOptions {
  /** Set false on DB-backed apps that own their own state. Default true. */
  enabled?: boolean
  /** Default: 'kk:comments:' + location.pathname. */
  key?: string
  /** 'localStorage' (default) | 'none' | a custom adapter. */
  adapter?: 'localStorage' | 'none' | CommentStoreAdapter
}

function isFullAdapter(a: unknown): a is CommentStoreAdapter {
  const c = a as Partial<CommentStoreAdapter> | null
  return !!c && typeof c.load === 'function' && typeof c.save === 'function' && typeof c.clear === 'function'
}

function resolveAdapter(options: UseCommentStoreOptions): CommentStoreAdapter | null {
  if (options.adapter === 'none') return null
  if (options.adapter && typeof options.adapter === 'object') {
    return isFullAdapter(options.adapter) ? options.adapter : null
  }
  const key = options.key ?? 'kk:comments:' + (typeof location !== 'undefined' ? location.pathname : '/')
  return {
    load() {
      try {
        const raw = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
        return raw ? (JSON.parse(raw) as CommentSnapshot) : null
      } catch {
        return null
      }
    },
    save(snap) {
      try {
        window.localStorage.setItem(key, JSON.stringify(snap))
      } catch {
        // Storage full or unavailable (private mode) — drop the save.
      }
    },
    clear() {
      try {
        window.localStorage.removeItem(key)
      } catch {
        // Nothing to clear.
      }
    },
  }
}

// Re-wrap a single quote inside the given scope. Single-text-node match
// only — selections that crossed element boundaries on first wrap
// won't restore as a contiguous span. The thread itself restores fine;
// just the doc-side highlight is lost.
function rewrapQuoteInScope(scope: Element | null, quote: string, threadId: string) {
  if (!scope || !quote) return
  const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, null)
  let node: Node | null
  while ((node = walker.nextNode())) {
    const textNode = node as Text
    // Skip text already inside a highlight (idempotent restore).
    if (textNode.parentElement?.closest('.highlight')) continue
    const idx = textNode.data.indexOf(quote)
    if (idx < 0) continue
    const mid = textNode.splitText(idx)
    mid.splitText(quote.length)
    const span = document.createElement('span')
    span.className = 'highlight'
    span.setAttribute('data-comment-id', threadId)
    span.appendChild(document.createTextNode(mid.data))
    mid.parentNode?.replaceChild(span, mid)
    return
  }
}

function rewrapAllHighlights(doc: HTMLElement, stack: HTMLElement) {
  const threads = stack.querySelectorAll('.comment-thread[data-thread-id], .card.comment-new[data-thread-id]')
  threads.forEach((t) => {
    const id = t.getAttribute('data-thread-id')
    const quote = (t as HTMLElement).dataset.kkAnchorQuote || ''
    if (!id || !quote) return
    const sectionId = (t as HTMLElement).dataset.kkSectionSlug || ''
    const scope = (sectionId ? document.getElementById(sectionId) : null) || doc
    rewrapQuoteInScope(scope, quote, id)
  })
}

export function useCommentStore(
  bookRef: Ref<HTMLElement | null>,
  inspectorRef: Ref<HTMLElement | null>,
  options: UseCommentStoreOptions = {},
) {
  let adapter: CommentStoreAdapter | null = null
  let doc: HTMLElement | null = null
  let stack: HTMLElement | null = null
  let saveObserver: MutationObserver | null = null
  let saveTimer: ReturnType<typeof setTimeout> | null = null

  function onMdRendered() {
    if (doc && stack) rewrapAllHighlights(doc, stack)
  }

  function scheduleSave() {
    if (!adapter || !stack) return
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      adapter!.save({ v: 1, savedAt: Date.now(), stack: stack!.innerHTML })
    }, 200)
  }

  function clear() {
    adapter?.clear()
    location.reload()
  }

  function bind() {
    if (options.enabled === false) return
    adapter = resolveAdapter(options)
    if (!adapter) return

    doc = bookRef.value
    stack = inspectorRef.value?.querySelector('.comment-stack') ?? null
    if (!doc || !stack) return

    // Restore. Accept any snapshot with a string `stack` field — v is
    // optional and assumed 1 when absent, so pre-versioned snapshots
    // restore on first load.
    let snapshot: CommentSnapshot | null = null
    try {
      snapshot = adapter.load()
    } catch {
      snapshot = null
    }
    const compatibleSchema = !snapshot || snapshot.v == null || snapshot.v === 1
    if (snapshot && compatibleSchema && typeof snapshot.stack === 'string') {
      stack.innerHTML = snapshot.stack
      rewrapAllHighlights(doc, stack)
    }

    document.addEventListener('kk:md-rendered', onMdRendered)

    // 200ms debounce; characterData true so mid-typing drafts persist
    // between reloads.
    saveObserver = new MutationObserver(scheduleSave)
    saveObserver.observe(stack, { childList: true, subtree: true, characterData: true })
  }

  function unbind() {
    document.removeEventListener('kk:md-rendered', onMdRendered)
    saveObserver?.disconnect()
    saveObserver = null
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = null
    adapter = null
    doc = null
    stack = null
  }

  onMounted(bind)
  onBeforeUnmount(unbind)

  return { clear }
}
