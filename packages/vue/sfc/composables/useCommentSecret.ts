import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/* Behavior for the comment API + hidden copy target — 1:1 port of
   extractCommentsFromDom, KK.copyComments, and initCommentSecretCopy
   (js/kit.js 1651-1705, 1907-1938), scoped to one inspector element
   instead of kit.js's single delegated instance. Walks the live DOM
   at call time, so extraction works regardless of persistence config.
   The hidden heading is an aria-hidden, opacity-0 "Comments" <h2>
   pinned to the top ~24px of the inspector; clicking that strip
   copies the extracted JSON to the clipboard. Devs find the trigger
   by searching the DOM for data-kk-action="copy-comments". */

export interface CommentThreadMessageData {
  messageId: string
  author: string
  body: string
  role: string
}

export interface CommentThreadData {
  threadId: string
  resolved: boolean
  archived: boolean
  anchorQuote: string
  anchorPrefix: string
  anchorSuffix: string
  sectionSlug: string
  cluster: string | null
  messages: CommentThreadMessageData[]
}

export function extractCommentsFromStack(stack: HTMLElement | null): CommentThreadData[] {
  if (!stack) return []
  const threads = stack.querySelectorAll('.comment-thread')
  const out: CommentThreadData[] = []
  threads.forEach((t) => {
    const listMsgs = t.querySelectorAll('.comment-thread__list > .comment-msg')
    const messages: CommentThreadMessageData[] = []
    listMsgs.forEach((m) => {
      const sub = m.querySelector('.t-subtitle')
      const body = m.querySelector('p.t-caption')
      messages.push({
        messageId: (m as HTMLElement).dataset.messageId || '',
        author: sub ? (sub.textContent || '').trim() : '',
        body: body ? (body.textContent || '').trim() : '',
        role: m.getAttribute('data-author-role') || 'user',
      })
    })
    out.push({
      threadId: t.getAttribute('data-thread-id') || '',
      resolved: t.getAttribute('data-resolved') === 'true',
      archived: t.getAttribute('data-archived') === 'true',
      anchorQuote: (t as HTMLElement).dataset.kkAnchorQuote || '',
      anchorPrefix: (t as HTMLElement).dataset.kkAnchorPrefix || '',
      anchorSuffix: (t as HTMLElement).dataset.kkAnchorSuffix || '',
      sectionSlug: (t as HTMLElement).dataset.kkSectionSlug || '',
      cluster: (t as HTMLElement).dataset.kkCluster || null,
      messages,
    })
  })
  return out
}

const HIDDEN_HEADING_STYLE =
  'position:absolute;top:0;left:0;right:0;' +
  'height:24px;margin:0;padding:0;' +
  'opacity:0;font-size:0;line-height:0;' +
  'cursor:default;z-index:1;'

export function useCommentSecret(inspectorRef: Ref<HTMLElement | null>) {
  function stackEl(): HTMLElement | null {
    return inspectorRef.value?.querySelector('.comment-stack') ?? null
  }

  function extractComments(): CommentThreadData[] {
    return extractCommentsFromStack(stackEl())
  }

  function copyComments(): CommentThreadData[] {
    const data = extractComments()
    const json = JSON.stringify(data, null, 2)
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(json)
    }
    return data
  }

  function onClick(e: MouseEvent) {
    if (!(e.target as HTMLElement).closest('[data-kk-action="copy-comments"]')) return
    e.preventDefault()
    e.stopPropagation()
    copyComments()
  }

  function bind() {
    const inspector = inspectorRef.value
    if (!inspector) return
    if (!inspector.querySelector('.comment-stack')) return

    if (!inspector.querySelector('[data-kk-action="copy-comments"]')) {
      const heading = document.createElement('h2')
      heading.textContent = 'Comments'
      heading.setAttribute('aria-hidden', 'true')
      heading.setAttribute('data-kk-action', 'copy-comments')
      heading.style.cssText = HIDDEN_HEADING_STYLE
      if (getComputedStyle(inspector).position === 'static') {
        inspector.style.position = 'relative'
      }
      inspector.insertBefore(heading, inspector.firstChild)
    }

    document.addEventListener('click', onClick)
  }

  function unbind() {
    document.removeEventListener('click', onClick)
  }

  onMounted(bind)
  onBeforeUnmount(unbind)

  return { extractComments, copyComments }
}
