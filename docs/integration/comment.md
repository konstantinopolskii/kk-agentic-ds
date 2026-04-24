# Comment — integration

How a consumer hooks the kit's comment component into a persistent backend. Covers everything beyond the `manifesto.md § Components` inventory: the enable/own decision, events, data attributes, i18n, framework patterns, common mistakes.

Scope: comments only. This file does not cover card stack, deck, scroll-spy, or any other component.

## The enable-or-own decision

Two paths. Pick one. Do not mix.

### Path A — enable kit's selection flow, listen for events

```js
KK.enableCommentSelectionFlow();
document.addEventListener('kk:comment', handler);
```

You get the kit's selection UX for free: selection-to-draft, highlight-active observer, kebab menus, add-comment FAB, click-highlight-promote-thread. The only thing you write is a handler that persists events to your backend.

Pick this when:
- Your backend accepts the kit's event shape (with a one-line rename for snake_case servers).
- You are happy with the kit's default strings (English) or you override via `KK.config.i18n`.
- You do not need custom draft UI (richer field, @mentions, attachments, etc.).

### Path B — own your selection flow, do not call enable

You implement `mouseup` on the doc, wrap selections, build drafts, commit, render threads. The kit stays out of it — but you still benefit from the card stack, kebab menus, and every non-comment module.

Pick this when:
- You need custom draft UI (multi-line, rich text, mentions).
- Your language needs translations the `KK.config.i18n` shape does not cover (plural forms, right-to-left scripts, dynamic locale switching).
- You need to inspect or veto selections before kit ever touches the DOM.

Path B consumers reimplement ~200 lines of kit code. Treat as a last resort.

**Do not mix paths.** If you call `enableCommentSelectionFlow()` and also bind your own `doc.mouseup`, every selection creates two drafts — one from each handler.

## Events

All five actions dispatch the same `kk:comment` CustomEvent on `.comment-stack`. Bubbles to `document`. Payload shape per `detail.action`:

### `action: 'new'`

Fires when a draft commits and a thread card is created.

```js
{
  action:       'new',
  threadId:     'c1735012345-123',  // local DOM id — NOT for the wire
  messageId:    'm1735012346-456',  // local id of the seed message
  anchorQuote:  'selected text',
  anchorPrefix: '…up to 20 chars before',
  anchorSuffix: '20 chars after…',
  cluster:      'strategy',          // from nearest [data-cluster] ancestor, null if none
  sectionSlug:  'targeting',         // from nearest .doc__section id
  text:         'comment body'
}
```

### `action: 'reply'`

Fires when a user hits Enter in an active thread's reply input.

```js
{
  action:    'reply',
  threadId:  'c1735012345-123',  // local id of the parent thread
  messageId: 'm1735012789-012',  // local id of the new reply message
  text:      'reply body'
}
```

### `action: 'delete'`

Fires when a user clicks a kebab's Delete item.

```js
{
  action:        'delete',
  threadId:      'c1735012345-123',
  messageId:     'm1735012789-012',  // the deleted message's id
  threadRemoved: true                // true if this was the last message, false otherwise
}
```

When `threadRemoved` is true, the whole `.comment-thread` card is gone from the DOM. Consumer decides whether that means the server-side thread dies too, or just the single message.

### `action: 'approve'`

Fires when a user clicks a kebab's Approve item. Approve is only shown when the thread's last list message carries `data-author-role="agent"` — a hook consumers stamp on agent-authored messages at render time.

```js
{
  action:          'approve',
  threadId:        'c1735012345-123',
  messageId:       'm1735012789-012',  // the agent-reply message whose text is approved
  replacementText: 'approved replacement',
  anchorQuote:     'the original anchored quote',
  anchorPrefix:    '…up to 20 chars before',
  anchorSuffix:    '20 chars after…',
  cluster:         'strategy',         // from the thread's stored anchor; null if none
  sectionSlug:     'targeting'
}
```

The consumer takes `anchorQuote` + `anchorPrefix` + `anchorSuffix` and locates the original span inside `sectionSlug`, then rewrites its text to `replacementText`, then persists the resolution. Kit already collapses the thread to the resolved row; no UI work on the consumer side.

The thread keeps its DOM at `data-resolved="true"`. Consumers re-rendering on subsequent paints can ship the same attribute to skip the interactive form entirely.

### `action: 'archive'`

Fires when a user clicks a kebab's Archive thread item.

```js
{
  action:        'archive',
  threadId:      'c1735012345-123',
  threadRemoved: false               // thread kept; data-archived="true" hides it from the stack
}
```

`threadRemoved: false` is the signal to persist "archived" rather than "deleted". The thread's DOM stays with `data-archived="true"` and `display: none`. A future version will add a re-surface UI; the data is already in place for it.

## Data attributes consumers set

These are the kit's extension surface for per-consumer metadata. Set them in your HTML at render time; kit reads them at event time.

| Attribute | Where to set | Read at | Purpose |
|---|---|---|---|
| `data-cluster` | Any ancestor of the doc section | Anchor creation (selection) | Reports which top-level region the anchor lives in. Flask uses `strategy`/`call`/`research`/`notes`/`cv`. Arbitrary strings work. |
| `data-message-id` | `.comment-msg` | Init scan + delete dispatch | Stable message id. Pre-rendered server HTML can ship the server's real id here, skipping the local-to-server mapping layer entirely for seeded threads. |
| `data-thread-id` | `.comment-thread` | Init + delete dispatch | Same pattern for threads, for consumers that render pre-existing threads on initial paint. |
| `data-author-role` | `.comment-msg` | Kebab open | Consumer stamps `"agent"` on agent-authored messages. Kit shows the Approve item only when the thread's last list message carries the attribute. No value means human-authored. |
| `data-resolved` | `.comment-thread` | CSS + init | Kit sets this to `"true"` when Approve fires. Pre-rendered threads already resolved on the server can ship the attribute directly; the collapsible stays hidden. |
| `data-archived` | `.comment-thread` | CSS | Kit sets this to `"true"` when Archive fires. Thread stays in the DOM; CSS hides it from `.comment-stack`. Pre-rendered archived threads can ship the attribute directly. |

## Config

Overrides go on `window.KK.config`. Set **before** `js/kit.js` loads.

```html
<script>
  window.KK = { config: { i18n: {
    addComment: 'Ваш комментарий',
    reply:      'Ответить…',
    deckChoose: 'Выбрать',
    deckChosen: 'Выбрано'
  } } };
</script>
<script src="../js/kit.js"></script>
```

Four i18n keys in 0.13.0. Kit merges with English defaults — partial overrides work.

## Consumer patterns

### Flask + vanilla JS

Flask's route contract (from the Wealthy portal):
- `POST <comment_url>` for new + reply (distinguished by presence of `parent_comment_id`)
- `DELETE <comment_url>/<id>` for delete

```js
const commentUrl = '/admin/intro-strategy/portal/42/comment';
const threadToServer  = new Map();
const messageToServer = new Map();

KK.enableCommentSelectionFlow();

document.addEventListener('kk:comment', async (e) => {
  const d = e.detail;

  if (d.action === 'new') {
    const res = await fetch(commentUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        cluster:       d.cluster,
        section_slug:  d.sectionSlug,
        anchor_quote:  d.anchorQuote,
        anchor_prefix: d.anchorPrefix,
        anchor_suffix: d.anchorSuffix,
        text:          d.text
      })
    });
    const { comment_id } = await res.json();
    threadToServer.set(d.threadId, comment_id);
    messageToServer.set(d.messageId, comment_id);
    return;
  }

  if (d.action === 'reply') {
    const parentId = threadToServer.get(d.threadId);
    if (!parentId) return;
    const res = await fetch(commentUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ parent_comment_id: parentId, text: d.text })
    });
    const { comment_id } = await res.json();
    messageToServer.set(d.messageId, comment_id);
    return;
  }

  if (d.action === 'delete') {
    const serverId = messageToServer.get(d.messageId);
    if (!serverId) return;
    await fetch(`${commentUrl}/${serverId}`, { method: 'DELETE' });
    messageToServer.delete(d.messageId);
    if (d.threadRemoved) {
      threadToServer.delete(d.threadId);
    }
    return;
  }

  if (d.action === 'approve') {
    const parentId = threadToServer.get(d.threadId);
    if (!parentId) return;
    await fetch(`${commentUrl}/${parentId}/approve`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        replacement_text: d.replacementText,
        anchor_quote:     d.anchorQuote,
        anchor_prefix:    d.anchorPrefix,
        anchor_suffix:    d.anchorSuffix,
        cluster:          d.cluster,
        section_slug:     d.sectionSlug
      })
    });
    // Flask rewrites the doc body server-side using the anchor triple
    // and persists the resolution. On the next render, the thread ships
    // with data-resolved="true" and the body already carries the new text.
    return;
  }

  if (d.action === 'archive') {
    const parentId = threadToServer.get(d.threadId);
    if (!parentId) return;
    await fetch(`${commentUrl}/${parentId}/archive`, { method: 'POST' });
  }
});
```

Alternative — if Flask renders the initial page with `data-message-id="<server_id>"` and `data-thread-id="<server_id>"` directly, the two `Map` objects drop out; the event's `d.messageId` already IS the server id.

### Next.js / Express / any JS-native backend

Backend speaks camelCase. Pass `e.detail` through.

```js
import { useEffect } from 'react';

export function useCommentPersistence(commentUrl) {
  useEffect(() => {
    const handler = async (e) => {
      const d = e.detail;
      if (d.action === 'new' || d.action === 'reply') {
        await fetch(commentUrl, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(d)
        });
      } else if (d.action === 'delete') {
        await fetch(`${commentUrl}/${d.messageId}`, { method: 'DELETE' });
      } else if (d.action === 'approve') {
        await fetch(`${commentUrl}/${d.threadId}/approve`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(d)
        });
        // Server rewrites the body using d.anchorQuote + prefix/suffix
        // and returns the new HTML, or the client reconciles in place.
      } else if (d.action === 'archive') {
        await fetch(`${commentUrl}/${d.threadId}/archive`, { method: 'POST' });
      }
    };
    document.addEventListener('kk:comment', handler);
    return () => document.removeEventListener('kk:comment', handler);
  }, [commentUrl]);
}
```

### Rails / Stimulus

```js
// app/javascript/controllers/kit_comments_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { url: String };

  connect() {
    this.handler = (e) => {
      const d = e.detail;
      if (d.action === 'new' || d.action === 'reply') {
        Rails.ajax({ url: this.urlValue, type: 'POST',
          data: new URLSearchParams(d).toString() });
      } else if (d.action === 'delete') {
        Rails.ajax({ url: `${this.urlValue}/${d.messageId}`, type: 'DELETE' });
      } else if (d.action === 'approve') {
        Rails.ajax({ url: `${this.urlValue}/${d.threadId}/approve`,
          type: 'POST',
          data: new URLSearchParams({
            replacement_text: d.replacementText,
            anchor_quote:     d.anchorQuote,
            anchor_prefix:    d.anchorPrefix,
            anchor_suffix:    d.anchorSuffix,
            cluster:          d.cluster || '',
            section_slug:     d.sectionSlug
          }).toString() });
      } else if (d.action === 'archive') {
        Rails.ajax({ url: `${this.urlValue}/${d.threadId}/archive`, type: 'POST' });
      }
    };
    document.addEventListener('kk:comment', this.handler);
  }

  disconnect() {
    document.removeEventListener('kk:comment', this.handler);
  }
}
```

Mount the controller once at the app shell:

```erb
<body data-controller="kit-comments" data-kit-comments-url-value="/comments">
```

## Anti-patterns

- **Calling `enableCommentSelectionFlow()` AND binding your own `doc.mouseup`.** Every selection creates two drafts. Pick one path (see "The enable-or-own decision").
- **Sending `threadId` to the server.** It is a local DOM id. Your backend has its own stable ids; use those via a mapping table or pre-rendered `data-*` attrs.
- **Sending `author` to the server.** Kit never emits author in the payload. Your server sets the author from session / auth context. A client-declared author is a forgeable identity hole.
- **Treating `anchorPrefix` / `anchorSuffix` as "exact match"** for re-anchoring. They are fuzzy context for when the anchor text drifts. Use a string-similarity library (Python `difflib`, Ruby `StringMetric`) on the server, not `==`.
- **Rebinding `kk:comment` on every render.** One listener, mounted at the app shell. Tear down only on unmount.
- **Calling `KK.config.i18n.addComment = 'X'` after kit.js loads.** kit merges config at module load; later assignments do not propagate to code paths that cached the value. Set config before `<script src="kit.js">`.

## Version history for this component

| Version | Change |
|---|---|
| 0.13.0 | Added `action: 'approve'` and `action: 'archive'`. Kebab menu now carries Approve / Reply / Archive thread / Delete. Approve reads the thread's last list message as the replacement and is gated on `data-author-role="agent"`. Archive sets `data-archived="true"`; thread retained, hidden from the stack. Approved thread collapses to a single resolved row under `data-resolved="true"`. Anchor triple + cluster + sectionSlug mirrored onto `.comment-thread` dataset so Approve re-emits the full payload. |
| 0.11.0 | Added `action: 'delete'`. All three actions now carry `messageId`. `buildMessage` stamps `data-message-id`; init scan assigns ids to any pre-rendered messages. |
| 0.10.0 | Added `kk:comment` event with `new` and `reply` actions. `anchorPrefix`/`anchorSuffix` capture. `[data-cluster]` ancestor read. |
| 0.8.0  | `KK.config.i18n.addComment` and `reply` overridable. |
| 0.7.0  | Kit behaviour extracted from `index.html` into `js/kit.js`. `enableCommentSelectionFlow()` exposed. |

## Future additions — not in 0.13.0

- Re-surface UI for archived threads. Data is preserved under `data-archived="true"`; a future release will add the inspector toggle that un-hides them.
- `action: 'update'` — when a message's text is edited (edit UX not shipped).

Will land when a consumer needs them. Not pre-built.
