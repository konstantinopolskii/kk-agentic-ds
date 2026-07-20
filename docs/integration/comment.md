# Comment integration

How a consumer wires the Vue 2.0 comment system into a persistent backend. Covers the composables that run the flow, the structural components, events, data attributes, the anchoring model, the persistence model, and framework patterns.

Scope: comments only. This file does not cover card stack, deck, scroll-spy, or any other component.

## The Vue surface

Four pieces, each with one job:

- **`KCommentNew` / `KCommentThread` / `KCommentStack`** — structural components. Markup only; no behavior of their own.
- **`useCommentFlow`** — the engine. Selection-to-draft, draft-to-thread commit, kebab actions (Reply / Edit / Approve / Archive / Delete), the highlight-active observer, the add-comment FAB.
- **`useCommentMenus`** — a companion composable that opens and closes the kebab popover itself.
- **`useCommentStore`** — persistence: restore on mount, debounced save on mutation.
- **`useCommentSecret`** + **`extractCommentsFromStack`** — the extract/copy API.

## Wiring it up — no auto-mount

The pre-2.0 kit auto-mounted a `.comment-stack` onto any page shipping its three-column shell. The Vue port drops that: nothing scans the DOM for you. A consumer wires the pieces explicitly, once, at the shell that owns the book and the inspector.

```vue
<script setup>
import { ref } from 'vue'
import { useCommentFlow, useCommentMenus, useCommentStore, useCommentSecret } from '../../packages/vue/dist/index.js'

const bookRef = ref(null)
const inspectorRef = ref(null)

useCommentFlow(bookRef, inspectorRef, { currentAuthor: currentUser.name })
useCommentMenus(inspectorRef)
useCommentStore(bookRef, inspectorRef, { adapter: 'none' }) // backend owns state
useCommentSecret(inspectorRef)
</script>

<template>
  <div class="app" data-view="doc">
    <main ref="bookRef" class="book"><!-- prose --></main>
    <aside ref="inspectorRef" class="inspector" aria-label="Comments">
      <div class="comment-stack"></div>
    </aside>
  </div>
</template>
```

`KBook`/`KInspector` expose the same root elements as their own template refs if you're building on the shell components rather than raw markup — pass those refs through instead of hand-rolled ones.

## `useCommentFlow`

```ts
function useCommentFlow(
  bookRef: Ref<HTMLElement | null>,
  inspectorRef: Ref<HTMLElement | null>,
  options: UseCommentFlowOptions,
): void

interface UseCommentFlowOptions {
  currentAuthor: string       // required — no default
  addCommentLabel?: string    // default: 'Add a comment'
  replyLabel?: string         // default: 'Reply…'
}
```

`currentAuthor` is **required, with no default**. The pre-2.0 vanilla kit hardcoded the demo author (`'Konstantin Konstantinopolskii'`) into every draft and reply; this port takes the signed-in author as a mandatory option instead of shipping a silent placeholder. Pass it once at mount — the value is captured, not reactive, so a `ref` that changes later doesn't update drafts already using the old value. If the author can change mid-session, remount the composable (key the parent component, or call it again after the change).

On mount (`bind()`) it locates `commentStack = inspectorRef.value.querySelector('.comment-stack')` and binds:

- **`mouseup` / `keyup` (Shift+Arrow, Shift+Home/End) on the book** — selection-to-draft. Wraps the selection as one `<span class="highlight">` per text node (never one span across block boundaries, to avoid painting across padding), captures anchor context, and prepends a draft card to the stack.
- **`click` and `keydown` on the stack** — commit (Enter, or a `[data-action="commit"]` click) turns a draft into a thread and fires `kk:comment` (`new`); Escape on an empty draft field removes it and unwraps the highlight; Enter in a reply field appends a message and fires `reply`; the same key bindings drive edit-commit and edit-cancel.
- **`click` on the stack, delegated to `.comment__menu-item`** — the five kebab actions: Reply focuses the reply field and promotes the thread; Edit collapses the thread into a single prefilled field (Enter commits, Escape or a demote cancels, no `kk:comment` on cancel); Approve resolves the thread and fires `approve`; Archive thread sets `data-archived="true"` and fires `archive`; Delete removes a message (or the whole thread, once empty) and fires `delete`.
- **A `MutationObserver` on the inspector**, watching `data-state` — the single source of truth for which highlights render active. It also auto-dismisses an empty draft and cancels an in-flight edit when the card demotes.
- **`document` keydown** — Escape dismisses an unfocused active empty draft; typing any single character while an interactive card is active focuses that card's input (type-anywhere-to-focus).
- **A `.fab--comment` click**, if one exists on the page — switches `.app` to the inspector view on narrow viewports.

`onBeforeUnmount` tears every listener down and disconnects the observer.

### Companion: `useCommentMenus`

`useCommentMenus(containerRef)` is a separate composable that owns the kebab popover's own open/closed state (`aria-expanded`) and recomputes whether Approve should show (`data-can-approve`, gated on the thread's last list message carrying `data-author-role="agent"`) right before a kebab opens. Mount it alongside `useCommentFlow`, scoped to the same container — without it, kebab buttons render but never open.

## Events

`kk:comment` — the same `CustomEvent` shape from the pre-2.0 kit, unchanged by the port. Dispatched on the `.comment-stack` element, bubbles to `document`.

```ts
type CommentEventDetail =
  | { action: 'new'; threadId: string; messageId: string; anchorQuote: string; anchorPrefix: string; anchorSuffix: string; cluster: string | null; sectionSlug: string; text: string }
  | { action: 'reply'; threadId: string; messageId: string; text: string }
  | { action: 'edit'; threadId: string; messageId: string; text: string }
  | { action: 'delete'; threadId: string; messageId: string; threadRemoved: boolean }
  | { action: 'approve'; threadId: string; messageId: string; replacementText: string; anchorQuote: string; anchorPrefix: string; anchorSuffix: string; cluster: string | null; sectionSlug: string }
  | { action: 'archive'; threadId: string; threadRemoved: boolean }
```

Exported as a type — `import type { CommentEventDetail } from '../../packages/vue/dist/index.js'`. Listen the same way the pre-2.0 kit did:

```js
document.addEventListener('kk:comment', (e) => {
  const d = e.detail
  // d.action: 'new' | 'reply' | 'edit' | 'delete' | 'approve' | 'archive'
})
```

`threadId` is a local DOM id, not a server id — never send it to the wire directly; map it via your own store, or set `data-thread-id` on pre-rendered markup to seed it with the server's own id.

## Data attributes consumers set

| Attribute | Where to set | Read at | Purpose |
| --- | --- | --- | --- |
| `data-cluster` | any ancestor of the doc section | anchor creation (selection) | Reports which top-level region the anchor lives in. Arbitrary strings work. |
| `data-message-id` | `.comment-msg` (`KCommentThread`'s `messages[].id`) | init scan + delete dispatch | Stable message id. Pre-rendered ids skip local-to-server mapping for seeded threads. |
| `data-thread-id` | `.comment-thread` | init + delete dispatch | Same pattern for threads. |
| `data-author-role` | `.comment-msg` (`KCommentThread`'s `messages[].role === 'agent'`) | kebab open | Approve shows only when the thread's last list message carries this. No value means human-authored. |
| `data-resolved` | `.comment-thread` | CSS + init | Set to `"true"` when Approve fires. `KCommentThread` has no `resolved` prop — pass `data-resolved="true"` directly and it falls through to the root element, for pre-rendering an already-resolved thread. |
| `data-archived` | `.comment-thread` (`KCommentThread`'s `archived` prop) | CSS | Set to `"true"` when Archive fires. Thread stays in the DOM; CSS hides it from `.comment-stack`. |

## The structural components

**`KCommentStack`** — an empty `.comment-stack` div plus a default slot. Ship it inside your inspector (optionally with pre-rendered thread content); `useCommentFlow` and `useCommentStore` both find it via `inspectorRef.value.querySelector('.comment-stack')`.

**`KCommentThread`** props: `title` (string, required), `state` (`'active' | 'minimized'`, default `'minimized'`), `archived` (boolean, default `false`), `messages` (`{ id: string | number; body: string; role?: string }[]`). Purely structural — no emits; the kebab, edit, reply, and archive behaviors all come from `useCommentFlow`'s DOM-level bindings, not from the component.

**`KCommentNew`** props: `title` (default `'Add a comment'`), `placeholder` (default `'Type a comment'`), `modelValue` (default `''`), `commitLabel` (default `'Commit'`). Emits `update:modelValue` (string) and `commit` (string, the draft text at commit time).

**Important nuance:** `KCommentNew` is for hand-authored draft UI — a place a consumer wants their own commit button and `v-model`, outside the selection flow. The selection-to-draft flow inside `useCommentFlow` does **not** instantiate `KCommentNew`. It builds matching plain DOM nodes directly (same class names, same `.comment-new__field .field__input` shape, same dataset keys) so the kit's own DOM queries work identically whether a draft came from the composable's own builder or from markup you authored. Don't expect a `commit` emit from a selection-created draft — there's no component instance to emit from.

## Anchoring model

A selection is captured as three strings, not a DOM range or an offset: `anchorQuote` (the selected text), `anchorPrefix` and `anchorSuffix` (roughly 20 characters of surrounding text on each side, read from the nearest `.book__section`, or failing that the nearest `p`/`dd`/`li`, or the parent node). `sectionSlug` comes from the nearest `.book__section` id; `cluster` from the nearest `[data-cluster]` ancestor, or `null`.

This triple is fuzzy re-anchoring context for the server side, not an exact-match key. Selections that cross element boundaries (e.g. across a `<strong>`) wrap as multiple highlight spans on first paint. Use a string-similarity comparison server-side (Python `difflib`, Ruby `StringMetric`), not `==`.

## Persistence model

```ts
function useCommentStore(
  bookRef: Ref<HTMLElement | null>,
  inspectorRef: Ref<HTMLElement | null>,
  options?: UseCommentStoreOptions,
): { clear(): void }

interface UseCommentStoreOptions {
  enabled?: boolean                                    // default: true
  key?: string                                          // default: 'kk:comments:' + location.pathname
  adapter?: 'localStorage' | 'none' | CommentStoreAdapter // default: 'localStorage'
}

interface CommentStoreAdapter {
  load(): CommentSnapshot | null
  save(snapshot: CommentSnapshot): void
  clear(): void
}
```

Mount it (typically alongside `useCommentFlow`, at the same shell) and it restores on mount, then saves on a 200ms debounce whenever the stack mutates (`childList`, `subtree`, and `characterData`, so mid-typing drafts survive a reload).

- **`'localStorage'`** (default). Reads and writes JSON at `key`, `window.localStorage`. `key` defaults to `'kk:comments:' + location.pathname` — a page migrating from the pre-2.0 inline-script pattern can pass its old key to keep existing reader comments readable.
- **`'none'`**. No reads, no writes — equivalent to `enabled: false`. Use this when the backend owns state and a `kk:comment` listener already persists everything server-side.
- **Custom adapter object** — supply `load`/`save`/`clear` and route the snapshot through your own store (IndexedDB, a remote-sync cache, anything).

Snapshot shape: `{ v: 1, savedAt: number, stack: string }` — `stack` is the `.comment-stack`'s `innerHTML`. Threads carry their own anchor metadata via `data-kk-anchor-*` dataset attributes, so restore needs nothing beyond the snapshot: it replaces the stack's `innerHTML`, then re-wraps each thread's `anchorQuote` inside `sectionSlug`, single-text-node match only (a selection that originally crossed element boundaries restores the thread intact but loses the doc-side highlight). Restore also re-runs against a `kk:md-rendered` document event, for pages that render their body through client-side markdown after mount.

`useCommentStore` returns `{ clear }` — call it yourself; it runs `adapter.clear()` then `location.reload()`. There's no global to reach for.

## Extract and copy — `useCommentSecret`

```ts
function useCommentSecret(inspectorRef: Ref<HTMLElement | null>): {
  extractComments(): CommentThreadData[]
  copyComments(): CommentThreadData[]
}

function extractCommentsFromStack(stack: HTMLElement | null): CommentThreadData[]
```

`useCommentSecret` mounts an invisible, `aria-hidden` "Comments" heading pinned across the top ~24px of the inspector, tagged `data-kk-action="copy-comments"`. Clicking that strip copies pretty-printed JSON to the clipboard — the same "secret" trigger from the pre-2.0 kit, ported as-is. `extractComments()`/`copyComments()` are also callable directly, and `extractCommentsFromStack(stack)` is exported standalone for a one-off extraction (tests, SSR snapshots) with no composable mounted.

Per-thread shape, same field names as the `kk:comment` payload:

```ts
interface CommentThreadData {
  threadId: string
  resolved: boolean
  archived: boolean
  anchorQuote: string
  anchorPrefix: string
  anchorSuffix: string
  sectionSlug: string
  cluster: string | null
  messages: { messageId: string; author: string; body: string; role: string }[]
}
```

## Consumer patterns

`kk:comment` bubbles to `document` exactly as it did pre-2.0 — the backend side of these recipes is unchanged. Mount the listener from `onMounted`/`onBeforeUnmount` instead of a page-level `<script>` block.

### Flask + Vue

```js
// commentUrl set from your route; useCommentFlow already mounted elsewhere on this page.
const commentUrl = '/admin/intro-strategy/portal/42/comment'
const threadToServer  = new Map()
const messageToServer = new Map()

onMounted(() => document.addEventListener('kk:comment', onComment))
onBeforeUnmount(() => document.removeEventListener('kk:comment', onComment))

async function onComment(e) {
  const d = e.detail
  if (d.action === 'new') {
    const res = await fetch(commentUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        cluster: d.cluster, section_slug: d.sectionSlug,
        anchor_quote: d.anchorQuote, anchor_prefix: d.anchorPrefix, anchor_suffix: d.anchorSuffix,
        text: d.text,
      }),
    })
    const { comment_id } = await res.json()
    threadToServer.set(d.threadId, comment_id)
    messageToServer.set(d.messageId, comment_id)
  } else if (d.action === 'delete') {
    const serverId = messageToServer.get(d.messageId)
    if (!serverId) return
    await fetch(`${commentUrl}/${serverId}`, { method: 'DELETE' })
    messageToServer.delete(d.messageId)
    if (d.threadRemoved) threadToServer.delete(d.threadId)
  }
  // reply / approve / archive follow the same shape as new/delete above
}
```

Alternative: if the server renders the initial page with `data-message-id`/`data-thread-id` set to its own ids directly, the two `Map`s drop out — `d.messageId` already **is** the server id.

### Next.js / Express / any JS-native backend

Backend speaks camelCase; pass `e.detail` straight through.

```js
onMounted(() => document.addEventListener('kk:comment', onComment))
onBeforeUnmount(() => document.removeEventListener('kk:comment', onComment))

async function onComment(e) {
  const d = e.detail
  if (d.action === 'new' || d.action === 'reply') {
    await fetch(commentUrl, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(d) })
  } else if (d.action === 'delete') {
    await fetch(`${commentUrl}/${d.messageId}`, { method: 'DELETE' })
  } else if (d.action === 'approve' || d.action === 'archive') {
    await fetch(`${commentUrl}/${d.threadId}/${d.action}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(d) })
  }
}
```

### Rails / Stimulus

A non-Vue frontend can still ride the same event, unchanged, from anywhere on the page (Stimulus, or a plain script): bind `document.addEventListener('kk:comment', handler)` in `connect()`, tear it down in `disconnect()`, and branch on `e.detail.action` the same way as the recipes above. The event contract doesn't care which framework mounted `useCommentFlow`.

## Anti-patterns

- **Mounting `useCommentFlow` twice against the same book/inspector pair.** Two engines bind duplicate listeners; every selection creates two drafts.
- **Sending `threadId` to the server.** It's a local DOM id. Use a mapping table, or seed `data-thread-id` with the server's own id on pre-rendered markup.
- **Sending `author` to the server.** The composable never emits an author in the payload. Set the author from session/auth context server-side; a client-declared author is a forgeable identity hole.
- **Treating `anchorPrefix`/`anchorSuffix` as an exact match** for re-anchoring. They're fuzzy context for when the anchor text drifts.
- **Rebinding `kk:comment` on every render.** One listener, mounted once, torn down on unmount.
- **Expecting `currentAuthor` to update reactively.** It's read once when `useCommentFlow` binds. Remount the composable if the signed-in author can change mid-session.

## Future additions — not yet in the kit

Re-surface UI for archived threads. Data is preserved under `data-archived="true"`; a future release adds the inspector toggle that un-hides them. Not pre-built.

## Legacy: kit.js

The pre-2.0 static demos still run the same comment system through `js/kit.js`: `KK.enableCommentSelectionFlow()` plus a `kk:comment` listener (Path A), or a fully hand-rolled `mouseup` handler (Path B); `KK.config.comments.{enabled,autoMount,autoEnable}` and the mirrored `data-kk-comments*` `<html>` attributes gate the auto-mount decision tree that doesn't exist in Vue; `KK.config.i18n.{addComment,reply,deckChoose,deckChosen}` overrides copy; `KK.config.persist.{enabled,key,adapter}` configures the same three-adapter persistence; `KK.extractComments()`, `KK.copyComments()`, and `KK.clearSavedComments()` are the global equivalents of `useCommentSecret`'s functions and `useCommentStore`'s `clear()`. That whole surface is frozen on `js/kit.js`; no new consumers.
