import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/* Behavior for the comment selection flow — 1:1 port of
   initCommentSelectionFlow (js/kit.js 839-1643), scoped to one book +
   inspector pair instead of kit.js's single delegated instance.
   Covers: selection-to-draft, draft → thread commit, highlight-active
   MutationObserver, kebab Reply/Edit/Approve/Archive/Delete, the
   add-comment FAB, and click-highlight-promote-thread. Drafts and
   threads are built as plain DOM (same shape kit.js's innerHTML
   builders produce) and mounted straight into the `.comment-stack`
   found under the inspector element — the same "kit owns the runtime
   surface" contract as KCommentStack.vue's empty shell.

   Deviation from kit.js: the vanilla original hardcodes the demo
   author 'Konstantin Konstantinopolskii'. This port takes the signed-
   in author as a required option instead of a silent default. */

export type CommentEventDetail =
  | {
      action: 'new'
      threadId: string
      messageId: string
      anchorQuote: string
      anchorPrefix: string
      anchorSuffix: string
      cluster: string | null
      sectionSlug: string
      text: string
    }
  | { action: 'reply'; threadId: string; messageId: string; text: string }
  | { action: 'edit'; threadId: string; messageId: string; text: string }
  | { action: 'delete'; threadId: string; messageId: string; threadRemoved: boolean }
  | {
      action: 'approve'
      threadId: string
      messageId: string
      replacementText: string
      anchorQuote: string
      anchorPrefix: string
      anchorSuffix: string
      cluster: string | null
      sectionSlug: string
    }
  | { action: 'archive'; threadId: string; threadRemoved: boolean }

export interface UseCommentFlowOptions {
  /** Author stamped on drafts, replies, and edits committed locally. */
  currentAuthor: string
  /** kit.js KK.config.i18n.addComment default: 'Add a comment'. */
  addCommentLabel?: string
  /** kit.js KK.config.i18n.reply default: 'Reply…'. */
  replyLabel?: string
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag)
  if (className) node.className = className
  return node
}

export function useCommentFlow(
  bookRef: Ref<HTMLElement | null>,
  inspectorRef: Ref<HTMLElement | null>,
  options: UseCommentFlowOptions,
) {
  const currentAuthor = options.currentAuthor
  const addCommentLabel = options.addCommentLabel ?? 'Add a comment'
  const replyLabel = options.replyLabel ?? 'Reply…'

  let doc: HTMLElement | null = null
  let inspector: HTMLElement | null = null
  let commentStack: HTMLElement | null = null
  let observer: MutationObserver | null = null
  let fab: HTMLElement | null = null

  function nodeInDoc(node: Node | null): boolean {
    while (node && node !== document) {
      if (node === doc) return true
      node = node.parentNode
    }
    return false
  }

  // Highlight a selection as one span per text node — never one
  // wrapper around the whole range. surroundContents would promote
  // the span up to the common ancestor when the selection crosses
  // block elements, painting across padding and gaps.
  function wrapRangeAsHighlight(range: Range): HTMLSpanElement[] {
    const spans: HTMLSpanElement[] = []
    const startContainer = range.startContainer
    const startOffset = range.startOffset
    const endContainer = range.endContainer
    const endOffset = range.endOffset
    const root = range.commonAncestorContainer

    const textNodes: Text[] = []
    if (root.nodeType === Node.TEXT_NODE) {
      textNodes.push(root as Text)
    } else {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null)
      let n: Node | null
      while ((n = walker.nextNode())) {
        if (range.intersectsNode(n)) textNodes.push(n as Text)
      }
    }

    textNodes.forEach((tn) => {
      const so = tn === startContainer ? startOffset : 0
      const eo = tn === endContainer ? endOffset : tn.data.length
      if (so >= eo) return
      const mid = tn.data.slice(so, eo)
      // Skip pure-whitespace slices — they would produce invisible
      // spans from formatting whitespace between block elements.
      if (!mid.trim()) return
      const before = tn.data.slice(0, so)
      const after = tn.data.slice(eo)

      const span = el('span', 'highlight')
      span.appendChild(document.createTextNode(mid))

      const parent = tn.parentNode
      if (!parent) return
      if (before) parent.insertBefore(document.createTextNode(before), tn)
      parent.insertBefore(span, tn)
      if (after) parent.insertBefore(document.createTextNode(after), tn)
      parent.removeChild(tn)
      spans.push(span)
    })

    return spans
  }

  function unwrapHighlight(spans: HTMLElement[] | HTMLElement | null) {
    if (!spans) return
    const list = Array.isArray(spans) ? spans : [spans]
    list.forEach((span) => {
      const parent = span?.parentNode
      if (!span || !parent) return
      while (span.firstChild) parent.insertBefore(span.firstChild, span)
      parent.removeChild(span)
      parent.normalize()
    })
  }

  function setAppSelection(on: boolean) {
    const app = document.querySelector('.app')
    if (!app) return
    if (on) app.setAttribute('data-selection', 'true')
    else app.removeAttribute('data-selection')
  }

  function buildDraft(author: string, threadId: string): HTMLDivElement {
    const d = el('div', 'card card--interactive comment-new')
    d.setAttribute('data-thread-id', threadId)

    const header = el('div', 'comment-new__header')
    const name = el('div', 't-subtitle')
    name.textContent = author
    const preview = el('p', 't-caption comment-new__preview')
    header.append(name, preview)

    const collapsible = el('div', 'card__collapsible')
    const inner = el('div', 'card__collapsible-inner')
    const label = el('label', 'field comment-new__field')
    const input = el('input', 't-caption field__input')
    input.type = 'text'
    input.placeholder = addCommentLabel
    const caret = el('span', 'field__fake-caret')
    caret.setAttribute('aria-hidden', 'true')
    label.append(input, caret)
    inner.append(label)
    collapsible.append(inner)

    d.append(header, collapsible)
    return d
  }

  function removeDraftAndUnwrapMarks(draft: HTMLElement | null) {
    if (!draft || !doc || !inspector) return
    const tid = draft.dataset.threadId
    if (tid) {
      doc.querySelectorAll(`.highlight[data-comment-id="${tid}"]`).forEach((span) => {
        unwrapHighlight([span as HTMLElement])
      })
    }
    draft.remove()
    if (!inspector.querySelector('.card.comment-new')) setAppSelection(false)
  }

  // Per-message stable id. Pre-rendered server HTML may set
  // data-message-id directly (with the server's own id); ensureMessageId
  // respects existing values.
  function ensureMessageId(msg: HTMLElement): string {
    if (!msg.dataset.messageId) {
      msg.dataset.messageId = 'm' + Date.now() + '-' + Math.floor(Math.random() * 1000)
    }
    return msg.dataset.messageId
  }

  function buildMessage(author: string, body: string): HTMLDivElement {
    const msg = el('div', 'comment-msg')

    const header = el('div', 'comment-msg__header')
    const name = el('div', 't-subtitle')
    name.textContent = author
    const menuBtn = el('button', 'comment__menu')
    menuBtn.type = 'button'
    menuBtn.setAttribute('aria-label', 'Message actions')
    menuBtn.setAttribute('aria-expanded', 'false')
    menuBtn.appendChild(el('span'))
    header.append(name, menuBtn)

    const bodyEl = el('p', 't-caption')
    bodyEl.textContent = body

    const popover = el('div', 'comment__menu-popover')
    popover.setAttribute('role', 'menu')
    ;[
      ['comment__menu-item comment__menu-item--approve t-caption', 'Approve'],
      ['comment__menu-item t-caption', 'Edit'],
      ['comment__menu-item t-caption', 'Reply'],
      ['comment__menu-item t-caption', 'Archive thread'],
      ['comment__menu-item t-caption', 'Delete'],
    ].forEach(([cls, label]) => {
      const item = el('button', cls)
      item.type = 'button'
      item.setAttribute('role', 'menuitem')
      item.textContent = label
      popover.appendChild(item)
    })

    msg.append(header, bodyEl, popover)
    ensureMessageId(msg)
    return msg
  }

  // Re-render preview from the full list. 1 msg → that one;
  // 2 msgs → both, no ellipsis; 3+ → first + 3-dot ellipsis + last.
  function renderPreview(thread: HTMLElement) {
    const list = thread.querySelector('.comment-thread__list')
    const preview = thread.querySelector('.comment-thread__preview')
    if (!list || !preview) return
    const msgs = list.querySelectorAll(':scope > .comment-msg')
    preview.innerHTML = ''
    if (msgs.length === 0) return
    preview.appendChild(msgs[0].cloneNode(true))
    if (msgs.length > 2) {
      const dots = el('div', 'comment-thread__ellipsis')
      dots.setAttribute('aria-hidden', 'true')
      dots.append(el('span'), el('span'), el('span'))
      preview.appendChild(dots)
    }
    if (msgs.length > 1) {
      preview.appendChild(msgs[msgs.length - 1].cloneNode(true))
    }
  }

  function buildThread(author: string, body: string, threadId?: string): HTMLDivElement {
    const thread = el('div', 'card card--interactive comment-thread')
    if (threadId) thread.setAttribute('data-thread-id', threadId)

    thread.appendChild(el('div', 'comment-thread__preview'))

    const editSlot = el('div', 'comment-thread__edit')
    const editInner = el('div', 'comment-thread__edit-inner')
    const editLabel = el('label', 'field comment-thread__edit-field')
    const editInput = el('input', 't-caption field__input')
    editInput.type = 'text'
    editLabel.appendChild(editInput)
    editInner.appendChild(editLabel)
    editSlot.appendChild(editInner)
    thread.appendChild(editSlot)

    const collapsible = el('div', 'card__collapsible')
    const inner = el('div', 'card__collapsible-inner')
    const list = el('div', 'comment-thread__list')
    const replyLabelEl = el('label', 'field comment-thread__reply')
    const replyInput = el('input', 't-caption field__input')
    replyInput.type = 'text'
    replyInput.placeholder = replyLabel
    const caret = el('span', 'field__fake-caret')
    caret.setAttribute('aria-hidden', 'true')
    replyLabelEl.append(replyInput, caret)
    inner.append(list, replyLabelEl)
    collapsible.appendChild(inner)
    thread.appendChild(collapsible)

    list.appendChild(buildMessage(author, body))
    renderPreview(thread)
    return thread
  }

  // Edit mode. Kebab → Edit collapses the whole thread into a single
  // field-card prefilled with the targeted message's body. Enter
  // commits the new text back to that message, exits edit. Escape and
  // any data-state demote (clicking outside the card) cancel.
  //
  // Threads restored from a snapshot built before the edit slot
  // shipped do not carry it. ensureEditSlot lazily injects one on
  // first edit so the feature works against any restore.
  function ensureEditSlot(thread: HTMLElement): HTMLElement {
    let slot = thread.querySelector(':scope > .comment-thread__edit') as HTMLElement | null
    if (slot) return slot
    slot = el('div', 'comment-thread__edit')
    const inner = el('div', 'comment-thread__edit-inner')
    const label = el('label', 'field comment-thread__edit-field')
    const input = el('input', 't-caption field__input')
    input.type = 'text'
    label.appendChild(input)
    inner.appendChild(label)
    slot.appendChild(inner)
    const collapsible = thread.querySelector(':scope > .card__collapsible')
    if (collapsible) thread.insertBefore(slot, collapsible)
    else thread.appendChild(slot)
    return slot
  }

  function enterEditMode(thread: HTMLElement, msg: HTMLElement) {
    const bodyEl = msg.querySelector('.t-caption')
    const bodyText = bodyEl ? bodyEl.textContent || '' : ''
    const slot = ensureEditSlot(thread)
    const input = slot.querySelector('.field__input') as HTMLInputElement
    input.value = bodyText
    // Mirror to the value attribute so a snapshot taken mid-edit
    // restores with the typed text intact (innerHTML serializes the
    // attribute, not the live DOM property).
    input.setAttribute('value', bodyText)
    thread.setAttribute('data-editing', 'true')
    thread.setAttribute('data-edit-message-id', msg.dataset.messageId || '')
    requestAnimationFrame(() => {
      input.focus()
      const len = input.value.length
      try {
        input.setSelectionRange(len, len)
      } catch {
        // Non-text inputs throw on setSelectionRange; harmless no-op.
      }
    })
  }

  function exitEditMode(thread: HTMLElement, opts?: { commit?: boolean }) {
    const commit = !!opts?.commit
    const slot = thread.querySelector(':scope > .comment-thread__edit')
    const input = slot?.querySelector('.field__input') as HTMLInputElement | null
    const msgId = thread.getAttribute('data-edit-message-id') || ''
    thread.removeAttribute('data-editing')
    thread.removeAttribute('data-edit-message-id')

    if (!commit || !input) {
      if (input) {
        input.value = ''
        input.removeAttribute('value')
      }
      return
    }

    const newText = input.value.trim()
    input.value = ''
    input.removeAttribute('value')

    if (!newText || !msgId) return
    const list = thread.querySelector('.comment-thread__list')
    const msg = list?.querySelector(`.comment-msg[data-message-id="${msgId}"]`)
    if (!msg) return
    const bodyEl = msg.querySelector('.t-caption')
    if (bodyEl && bodyEl.textContent !== newText) {
      bodyEl.textContent = newText
      renderPreview(thread)
      commentStack?.dispatchEvent(
        new CustomEvent<CommentEventDetail>('kk:comment', {
          bubbles: true,
          detail: { action: 'edit', threadId: thread.dataset.threadId || '', messageId: msgId, text: newText },
        }),
      )
    }
  }

  // Collect the ±20-char context around the first occurrence of `quote`
  // inside the nearest .book__section. Consumers use this for fuzzy
  // re-anchoring on the server side — quote + prefix + suffix survives
  // DOM rebuilds where numeric offsets would not.
  function captureAnchorContext(quote: string, anchorEl: Element | null): { prefix: string; suffix: string } {
    if (!anchorEl?.closest) return { prefix: '', suffix: '' }
    const scope = anchorEl.closest('.book__section') || anchorEl.closest('p, dd, li') || anchorEl.parentNode
    const full = (scope as Element | null)?.textContent || ''
    const idx = full.indexOf(quote)
    if (idx === -1) return { prefix: '', suffix: '' }
    return {
      prefix: full.slice(Math.max(0, idx - 20), idx),
      suffix: full.slice(idx + quote.length, idx + quote.length + 20),
    }
  }

  function commitDraft(draft: HTMLElement) {
    if (!commentStack || !inspector) return
    const inp = draft.querySelector('.comment-new__field .field__input') as HTMLInputElement | null
    if (!inp) return
    const text = inp.value.trim()
    if (!text) return
    const tid = draft.dataset.threadId || ''
    const thread = buildThread(currentAuthor, text, tid)

    // Snapshot anchor metadata before the draft's dataset is lost on
    // replaceWith. This feeds the kk:comment event consumers listen
    // for to persist the comment on their own backend.
    const anchorQuote = draft.dataset.kkAnchorQuote || ''
    const anchorPrefix = draft.dataset.kkAnchorPrefix || ''
    const anchorSuffix = draft.dataset.kkAnchorSuffix || ''
    const sectionSlug = draft.dataset.kkSectionSlug || ''
    const cluster = draft.dataset.kkCluster || null

    // Mirror anchor metadata onto the thread so later actions on the
    // thread — approve in particular — can re-emit the full anchor
    // payload without a consumer-side lookup.
    thread.dataset.kkAnchorQuote = anchorQuote
    thread.dataset.kkAnchorPrefix = anchorPrefix
    thread.dataset.kkAnchorSuffix = anchorSuffix
    thread.dataset.kkSectionSlug = sectionSlug
    if (cluster) thread.dataset.kkCluster = cluster

    // The seed message inside the brand-new thread. buildMessage has
    // already stamped its data-message-id; grab it so consumers can
    // tie their server comment id to this specific message.
    const seedMsg = thread.querySelector('.comment-thread__list > .comment-msg') as HTMLElement | null
    const mid = seedMsg ? seedMsg.dataset.messageId || '' : ''

    draft.replaceWith(thread)
    // Promote via synthetic click — the inspector-stack module flips
    // data-state, runs the blur dance, scrolls. The observer sees the
    // new data-state="active" and flips matching highlights to --active.
    requestAnimationFrame(() => thread.click())
    if (!inspector.querySelector('.card.comment-new')) setAppSelection(false)

    // Emit kk:comment for consumers to persist. Bubbles to document so
    // listeners can attach anywhere. Fire-and-forget.
    commentStack.dispatchEvent(
      new CustomEvent<CommentEventDetail>('kk:comment', {
        bubbles: true,
        detail: {
          action: 'new',
          threadId: tid,
          messageId: mid,
          anchorQuote,
          anchorPrefix,
          anchorSuffix,
          cluster,
          sectionSlug,
          text,
        },
      }),
    )
  }

  function maybeOpenFromSelection() {
    if (!doc || !commentStack) return
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed) return
    if (!nodeInDoc(sel.anchorNode) || !nodeInDoc(sel.focusNode)) return
    const range = sel.getRangeAt(0).cloneRange()
    const quoteText = sel.toString()
    const spans = wrapRangeAsHighlight(range)
    if (!spans.length) return

    // Re-anchor the native selection onto the freshly-wrapped spans
    // so ⌘/Ctrl+C still copies.
    const first = spans[0].firstChild
    const last = spans[spans.length - 1].firstChild
    if (first && last) {
      const restored = document.createRange()
      restored.setStart(first, 0)
      restored.setEnd(last, (last as Text).data.length)
      sel.removeAllRanges()
      sel.addRange(restored)
    }

    const threadId = 'c' + Date.now() + '-' + Math.floor(Math.random() * 1000)
    spans.forEach((span) => span.setAttribute('data-comment-id', threadId))

    // Capture anchor metadata on the draft for the kk:comment event to
    // emit at commit time. Stored on the draft's dataset so empty-
    // draft dismissal discards it automatically.
    const ctx = captureAnchorContext(quoteText, spans[0])
    const sectionEl = spans[0].closest('.book__section')
    const clusterEl = spans[0].closest('[data-cluster]')

    const draft = buildDraft(currentAuthor, threadId)
    draft.dataset.kkAnchorQuote = quoteText
    draft.dataset.kkAnchorPrefix = ctx.prefix
    draft.dataset.kkAnchorSuffix = ctx.suffix
    draft.dataset.kkSectionSlug = sectionEl ? (sectionEl as HTMLElement).id : ''
    draft.dataset.kkCluster = clusterEl ? clusterEl.getAttribute('data-cluster') || '' : ''

    commentStack.insertBefore(draft, commentStack.firstChild)
    setAppSelection(true)

    requestAnimationFrame(() => draft.click())
  }

  // Render a resolved thread in place — the approved checkmark, a
  // truncated snippet of the approved replacement, and the byline.
  function renderResolved(thread: HTMLElement, replacementText: string, approvedBy: string) {
    const snippetMax = 40
    const snippet =
      replacementText.length > snippetMax ? replacementText.slice(0, snippetMax - 1) + '…' : replacementText
    thread.setAttribute('data-resolved', 'true')
    thread.setAttribute('data-state', 'minimized')
    const preview = thread.querySelector('.comment-thread__preview')
    if (!preview) return
    preview.innerHTML = ''
    const resolved = el('div', 'comment-thread__resolved')
    const stamp = el('span', 'comment-thread__resolved-stamp t-caption')
    stamp.setAttribute('aria-hidden', 'true')
    stamp.textContent = '✓'
    const snippetEl = el('span', 'comment-thread__resolved-snippet t-caption')
    snippetEl.textContent = snippet
    const byline = el('span', 'comment-thread__resolved-byline t-caption t-muted')
    byline.textContent = approvedBy
    resolved.append(stamp, snippetEl, byline)
    preview.appendChild(resolved)
  }

  // --- Event handlers bound in bind() below ---

  function onDocMouseUp() {
    maybeOpenFromSelection()
  }

  function onDocKeyUp(e: KeyboardEvent) {
    if (e.shiftKey && (e.key.indexOf('Arrow') === 0 || e.key === 'Home' || e.key === 'End')) {
      maybeOpenFromSelection()
    }
  }

  function onStackClickCommit(e: MouseEvent) {
    const trigger = (e.target as HTMLElement).closest('[data-action="commit"]')
    if (!trigger) return
    const draft = trigger.closest('.card.comment-new') as HTMLElement | null
    if (!draft) return
    e.stopPropagation()
    commitDraft(draft)
  }

  function onStackKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement
    const draftInput = target.closest('.card.comment-new .comment-new__field .field__input')
    if (draftInput) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        commitDraft(draftInput.closest('.card.comment-new') as HTMLElement)
        return
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        removeDraftAndUnwrapMarks(draftInput.closest('.card.comment-new') as HTMLElement)
        return
      }
    }

    const editInput = target.closest('.comment-thread__edit .field__input')
    if (editInput) {
      const editThread = editInput.closest('.comment-thread') as HTMLElement | null
      if (editThread && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        exitEditMode(editThread, { commit: true })
        return
      }
      if (editThread && e.key === 'Escape') {
        e.preventDefault()
        exitEditMode(editThread, { commit: false })
        return
      }
    }

    const replyInput = target.closest('.comment-thread__reply .field__input') as HTMLInputElement | null
    if (replyInput && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const body = replyInput.value.trim()
      if (!body) return
      const thread = replyInput.closest('.comment-thread') as HTMLElement
      const list = thread.querySelector('.comment-thread__list') as HTMLElement
      const replyMsg = buildMessage(currentAuthor, body)
      list.appendChild(replyMsg)
      replyInput.value = ''
      renderPreview(thread)

      commentStack?.dispatchEvent(
        new CustomEvent<CommentEventDetail>('kk:comment', {
          bubbles: true,
          detail: {
            action: 'reply',
            threadId: thread.dataset.threadId || '',
            messageId: replyMsg.dataset.messageId || '',
            text: body,
          },
        }),
      )
    }
  }

  function onStackInput(e: Event) {
    const target = e.target as HTMLElement
    const di = target.closest('.card.comment-new .comment-new__field .field__input') as HTMLInputElement | null
    if (di) {
      const draft = di.closest('.card.comment-new')
      const preview = draft?.querySelector('.comment-new__preview')
      if (preview) preview.textContent = di.value
      return
    }
    // Sync the value attribute on the edit field so the snapshot
    // taken by the persistence MutationObserver carries the typed
    // text on reload.
    const ei = target.closest('.comment-thread__edit .field__input') as HTMLInputElement | null
    if (ei) ei.setAttribute('value', ei.value)
  }

  function onDocKeydownEscapeDraft(e: KeyboardEvent) {
    if (e.key !== 'Escape' || !inspector) return
    const activeDraft = inspector.querySelector('.card.comment-new[data-state="active"]') as HTMLElement | null
    if (!activeDraft) return
    if (activeDraft.contains(document.activeElement)) return
    e.preventDefault()
    removeDraftAndUnwrapMarks(activeDraft)
  }

  // Type-anywhere-to-focus the active comment card's input.
  function onDocKeydownTypeToFocus(e: KeyboardEvent) {
    if (e.key.length !== 1 || !inspector) return
    if (e.ctrlKey || e.metaKey || e.altKey) return
    const activeCard = inspector.querySelector('.comment-stack .card--interactive[data-state="active"]') as HTMLElement | null
    if (!activeCard) return
    let inp: HTMLElement | null
    if (activeCard.getAttribute('data-editing') === 'true') {
      inp = activeCard.querySelector('.comment-thread__edit .field__input')
    } else {
      inp = activeCard.querySelector('.comment-new__field .field__input, .comment-thread__reply .field__input')
    }
    if (!inp || document.activeElement === inp) return
    const ae = document.activeElement as HTMLElement | null
    if (ae?.tagName) {
      const t = ae.tagName
      if (t === 'INPUT' || t === 'TEXTAREA' || ae.isContentEditable) return
      if (t === 'BUTTON' || t === 'A' || t === 'SELECT') return
    }
    inp.focus()
  }

  function onDocClickHighlight(e: MouseEvent) {
    if (!commentStack) return
    const mark = (e.target as HTMLElement).closest('.highlight')
    if (!mark) return
    const id = mark.getAttribute('data-comment-id')
    if (!id) return
    const card = commentStack.querySelector(`[data-thread-id="${id}"]`) as HTMLElement | null
    if (!card) return
    const app = document.querySelector('.app')
    let swapped = false
    if (app && window.matchMedia('(max-width: 768px)').matches) {
      if (app.getAttribute('data-view') !== 'inspector') {
        app.setAttribute('data-view', 'inspector')
        swapped = true
      }
    }
    if (swapped) requestAnimationFrame(() => card.click())
    else card.click()
  }

  function onFabClick() {
    document.querySelector('.app')?.setAttribute('data-view', 'inspector')
  }

  // Highlight-active observer — single source of truth for mark state.
  // Any .card--interactive[data-thread-id] with data-state="active"
  // inverts its marks; minimized drops them back to the resting overlay.
  // Empty drafts that demote get auto-dismissed.
  function onMutation(mutations: MutationRecord[]) {
    if (!doc) return
    mutations.forEach((m) => {
      if (m.type !== 'attributes' || m.attributeName !== 'data-state') return
      const card = m.target as HTMLElement
      if (!card.classList?.contains('card--interactive')) return
      const isActive = card.getAttribute('data-state') === 'active'

      // Cancel an in-flight edit when the thread leaves active state.
      // No commit; matches the empty-draft dismiss policy: explicit
      // Enter is the only commit path.
      if (!isActive && card.getAttribute('data-editing') === 'true') {
        exitEditMode(card, { commit: false })
      }

      // Empty-draft dismiss runs first and independent of thread id.
      if (!isActive && card.classList.contains('comment-new')) {
        const inp = card.querySelector('.comment-new__field .field__input') as HTMLInputElement | null
        const val = inp ? inp.value.trim() : ''
        if (!val) {
          removeDraftAndUnwrapMarks(card)
          return
        }
        // Snapshot input value into preview in case demote missed a
        // final 'input' event.
        const preview = card.querySelector('.comment-new__preview')
        if (preview && inp) preview.textContent = inp.value
      }

      const tid = card.getAttribute('data-thread-id')
      if (!tid) return

      const marks = doc!.querySelectorAll(`.highlight[data-comment-id="${tid}"]`)
      marks.forEach((span) => {
        if (isActive) span.classList.add('highlight--active')
        else span.classList.remove('highlight--active')
      })

      if (isActive && marks.length) {
        marks[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
  }

  // Kebab actions — Reply focuses the thread reply field and promotes
  // the thread; Edit enters edit mode; Approve collapses the thread to
  // the resolved stamp and emits the replacement payload; Archive
  // hides the thread behind data-archived (data retained); Delete
  // removes the message (preview kebab maps to first/last of the
  // list) and empties threads remove.
  function onStackKebabAction(e: MouseEvent) {
    if (!commentStack) return
    const item = (e.target as HTMLElement).closest('.comment__menu-item')
    if (!item) return
    const thread = item.closest('.comment-thread') as HTMLElement | null
    if (!thread) return
    const msg = item.closest('.comment-msg') as HTMLElement | null
    const label = (item.textContent || '').trim()

    if (label === 'Reply') {
      if (thread.getAttribute('data-state') !== 'active') thread.click()
      const reply = thread.querySelector('.comment-thread__reply .field__input') as HTMLInputElement | null
      if (reply) requestAnimationFrame(() => reply.focus())
      return
    }

    if (label === 'Edit') {
      if (!msg) return
      if (thread.getAttribute('data-state') !== 'active') thread.click()
      enterEditMode(thread, msg)
      return
    }

    if (label === 'Approve') {
      // Approve takes the last list message's text and emits it as the
      // replacement for the anchored quote. Silent no-op if the last
      // message is not an agent reply.
      const approveList = thread.querySelector('.comment-thread__list')
      const approveMsgs = approveList ? approveList.querySelectorAll(':scope > .comment-msg') : []
      const lastMsg = approveMsgs.length ? (approveMsgs[approveMsgs.length - 1] as HTMLElement) : null
      if (!lastMsg || lastMsg.getAttribute('data-author-role') !== 'agent') return

      const approveBody = lastMsg.querySelector('.t-caption')
      const replacementText = approveBody ? (approveBody.textContent || '').trim() : ''
      let approvedBy = ''
      const approveHeader = lastMsg.querySelector('.comment-msg__header .t-subtitle')
      if (approveHeader) approvedBy = (approveHeader.textContent || '').trim()

      const approveThreadId = thread.dataset.threadId || ''
      const approveMessageId = lastMsg.dataset.messageId || ''

      renderResolved(thread, replacementText, approvedBy)

      commentStack.dispatchEvent(
        new CustomEvent<CommentEventDetail>('kk:comment', {
          bubbles: true,
          detail: {
            action: 'approve',
            threadId: approveThreadId,
            messageId: approveMessageId,
            replacementText,
            anchorQuote: thread.dataset.kkAnchorQuote || '',
            anchorPrefix: thread.dataset.kkAnchorPrefix || '',
            anchorSuffix: thread.dataset.kkAnchorSuffix || '',
            cluster: thread.dataset.kkCluster || null,
            sectionSlug: thread.dataset.kkSectionSlug || '',
          },
        }),
      )
      return
    }

    if (label === 'Archive thread') {
      // Archive retains the thread DOM but hides it from the stack.
      thread.setAttribute('data-archived', 'true')
      thread.setAttribute('data-state', 'minimized')
      const archivedThreadId = thread.dataset.threadId || ''
      commentStack.dispatchEvent(
        new CustomEvent<CommentEventDetail>('kk:comment', {
          bubbles: true,
          detail: { action: 'archive', threadId: archivedThreadId, threadRemoved: false },
        }),
      )
      return
    }

    if (label === 'Delete') {
      if (!msg) return
      const list = thread.querySelector('.comment-thread__list')
      if (!list) return
      const listMsgs = Array.from(list.querySelectorAll(':scope > .comment-msg'))

      // Resolve the preview kebab to the actual list message the user
      // targeted (preview shows the first and last of the full list).
      let targetMsg: HTMLElement | null = msg
      if (msg.closest('.comment-thread__preview')) {
        const previewMsgs = Array.from(thread.querySelectorAll('.comment-thread__preview > .comment-msg'))
        const idx = previewMsgs.indexOf(msg)
        if (idx === 0 && listMsgs.length) targetMsg = listMsgs[0] as HTMLElement
        else if (idx === 1 && listMsgs.length > 1) targetMsg = listMsgs[listMsgs.length - 1] as HTMLElement
        else targetMsg = null
      }
      if (!targetMsg) return

      const deletedThreadId = thread.dataset.threadId || ''
      const deletedMessageId = targetMsg.dataset.messageId || ''

      targetMsg.remove()

      const remaining = list.querySelectorAll(':scope > .comment-msg')
      const threadRemoved = remaining.length === 0
      if (threadRemoved) thread.remove()
      else renderPreview(thread)

      commentStack.dispatchEvent(
        new CustomEvent<CommentEventDetail>('kk:comment', {
          bubbles: true,
          detail: {
            action: 'delete',
            threadId: deletedThreadId,
            messageId: deletedMessageId,
            threadRemoved,
          },
        }),
      )
    }
  }

  function bind() {
    doc = bookRef.value
    inspector = inspectorRef.value
    if (!doc || !inspector) return
    commentStack = inspector.querySelector('.comment-stack')
    if (!commentStack) return

    // Stamp every pre-rendered .comment-msg with a data-message-id so
    // the 'delete' action can address it by stable identity instead
    // of DOM position.
    commentStack.querySelectorAll('.comment-msg').forEach((m) => ensureMessageId(m as HTMLElement))

    doc.addEventListener('mouseup', onDocMouseUp)
    doc.addEventListener('keyup', onDocKeyUp)
    doc.addEventListener('click', onDocClickHighlight)

    commentStack.addEventListener('click', onStackClickCommit)
    commentStack.addEventListener('click', onStackKebabAction)
    commentStack.addEventListener('keydown', onStackKeydown)
    commentStack.addEventListener('input', onStackInput)

    document.addEventListener('keydown', onDocKeydownEscapeDraft)
    document.addEventListener('keydown', onDocKeydownTypeToFocus)

    fab = document.querySelector('.fab--comment')
    fab?.addEventListener('click', onFabClick)

    observer = new MutationObserver(onMutation)
    observer.observe(inspector, { attributes: true, attributeFilter: ['data-state'], subtree: true })
  }

  function unbind() {
    doc?.removeEventListener('mouseup', onDocMouseUp)
    doc?.removeEventListener('keyup', onDocKeyUp)
    doc?.removeEventListener('click', onDocClickHighlight)

    commentStack?.removeEventListener('click', onStackClickCommit)
    commentStack?.removeEventListener('click', onStackKebabAction)
    commentStack?.removeEventListener('keydown', onStackKeydown)
    commentStack?.removeEventListener('input', onStackInput)

    document.removeEventListener('keydown', onDocKeydownEscapeDraft)
    document.removeEventListener('keydown', onDocKeydownTypeToFocus)

    fab?.removeEventListener('click', onFabClick)
    observer?.disconnect()

    doc = null
    inspector = null
    commentStack = null
    observer = null
    fab = null
  }

  onMounted(bind)
  onBeforeUnmount(unbind)
}
