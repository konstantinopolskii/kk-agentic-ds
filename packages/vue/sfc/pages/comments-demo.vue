<script setup lang="ts">
/* SFC twin of demos/comment-persistence/index.html, rebuilt on the 2.0 composable
   surface. The legacy demo drove three persistence modes through
   window.KK.config.persist, read from an inline <script> before kit.js loaded.
   This page drives the same three modes — ?persist=on (default) | off | memory —
   through useCommentStore's `adapter` option instead: 'localStorage' (default),
   `{ enabled: false }`, and a hand-rolled CommentStoreAdapter object.

   SSR rule: reading the URL is the only place this file could touch a browser
   global at setup time. readMode() guards on `typeof window !== 'undefined'`,
   the same idiom useCommentStore's own resolveAdapter uses for `location` — SSR
   always renders the 'on' default. The mode splits into two variables on
   purpose: `mode` (behavior) is read synchronously at client setup and only
   picks the adapter shape — invisible to the DOM, so a client/server difference
   can't mismatch hydration; `displayMode` (DOM) starts at the SSR default and
   is set to the real mode in onMounted, so the hydration vdom matches the SSR
   body byte for byte and the patch to the real value lands post-mount. Every
   composable call below is itself SSR-safe already: each one only registers
   onMounted/onBeforeUnmount hooks synchronously and defers its own
   DOM/localStorage work to the mounted callback.

   Deviation: KBook/KInspector are thin single-root wrappers with no
   defineExpose, so a template ref on them yields a component proxy, not the
   HTMLElement the comment composables need. This page ships the same markup
   those components render directly (<main class="book">, <aside
   class="inspector">) and wires useInspectorStack by hand, matching the
   canonical wiring snippet in docs/integration/comment.md. */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import {
  KApp,
  KSidebar,
  KSidebarNav,
  KBookSection,
  KTag,
  KCode,
  KCard,
  KCardHeading,
  KCardCollapsible,
  KButton,
  KList,
  KCommentStack,
  KInspectorGroup,
  KSignoff,
  useCommentFlow,
  useCommentMenus,
  useCommentStore,
  useCommentSecret,
  useInspectorStack,
  type CommentStoreAdapter,
  type CommentSnapshot,
  type UseCommentStoreOptions,
} from '@konstantinopolskii/vue'

type PersistMode = 'on' | 'off' | 'memory'

function readMode(): PersistMode {
  if (typeof window === 'undefined') return 'on'
  const m = new URLSearchParams(window.location.search).get('persist')
  return m === 'off' || m === 'memory' ? m : 'on'
}

/* Behavior-side mode: safe to read at setup — the adapter choice is invisible
   to the DOM, so a client/server difference here can't mismatch hydration. */
const mode = readMode()

/* Display-side mode: everything the template renders from the mode must
   hydrate identical to the SSR body, which always renders the 'on' default.
   Start at that default and patch to the real mode post-mount. */
const displayMode = ref<PersistMode>('on')
onMounted(() => {
  displayMode.value = readMode()
})

// Hand-rolled adapter for ?persist=memory. Snapshot lives in this closure, not
// localStorage: it resets on a full reload (fresh module evaluation) and
// survives any in-tab navigation that keeps this page instance mounted — the
// same trade-off the legacy inline-script version made with its own `var inMem`.
let memorySnapshot: CommentSnapshot | null = null
const memoryAdapter: CommentStoreAdapter = {
  load: () => memorySnapshot,
  save: (snap) => {
    memorySnapshot = snap
  },
  clear: () => {
    memorySnapshot = null
  },
}

const storeOptions: UseCommentStoreOptions =
  mode === 'off' ? { enabled: false } : mode === 'memory' ? { adapter: memoryAdapter } : { adapter: 'localStorage' }

const bookRef = ref<HTMLElement | null>(null)
const inspectorRef = ref<HTMLElement | null>(null)

useCommentFlow(bookRef, inspectorRef, { currentAuthor: 'Demo reader' })
useCommentMenus(inspectorRef)
const { clear } = useCommentStore(bookRef, inspectorRef, storeOptions)
const { extractComments, copyComments } = useCommentSecret(inspectorRef)

let disposeInspectorStack: (() => void) | undefined
onMounted(() => {
  if (inspectorRef.value) disposeInspectorStack = useInspectorStack(inspectorRef.value)
})
onBeforeUnmount(() => disposeInspectorStack?.())

function onExtract() {
  const arr = extractComments()
  console.log('extractComments returned', arr.length, 'thread(s):', arr)
}
function onCopy() {
  const arr = copyComments()
  console.log('copyComments wrote JSON to clipboard.', arr.length, 'thread(s).')
}

const howToSteps: string[] = [
  'Highlight a sentence in the doc.',
  'A draft opens here. Type, hit enter.',
  'Reload. The thread and highlight come back.',
  'Use a kebab to reply, edit, approve, or archive.',
  'Use the buttons below to extract, copy, or clear.',
]

const offSnippet =
  "useCommentStore(bookRef, inspectorRef, { enabled: false })\n" +
  "// or: { adapter: 'none' } — same effect, reads as intent at the call site."

const customAdapterSnippet =
  'const adapter: CommentStoreAdapter = {\n' +
  '  load()  { /* return a CommentSnapshot or null */ },\n' +
  '  save(snap) { /* snap: { v: 1, savedAt, stack } */ },\n' +
  '  clear() { /* remove */ },\n' +
  '}\n' +
  'useCommentStore(bookRef, inspectorRef, { adapter })'

interface SignoffStat {
  value: string
  text: string
}
const signoffStats: SignoffStat[] = [
  { value: '3', text: 'adapter shapes.' },
  { value: '200 ms', text: 'save debounce.' },
]
</script>

<template>
  <KApp view="doc">
    <KSidebar title="Comment persistence">
      <KSidebarNav />
      <template #footer>kit 2.1.1, comments demo</template>
    </KSidebar>

    <main id="doc" ref="bookRef" class="book">
      <KBookSection>
        <h1 class="t-hero">Comment persistence</h1>
        <p class="t-body">
          Highlight a sentence below. A draft opens in the inspector. Type a comment, hit enter. Reload the page — the thread and the highlight come back.
        </p>
        <p class="t-body">
          <code class="t-code">useCommentStore</code> ships a <code class="t-code">localStorage</code> adapter by default. It writes a snapshot 200 ms after the last stack mutation; the next mount restores the thread stack and re-wraps doc highlights from each thread's own anchor metadata.
        </p>
        <p class="t-body">
          Three URL modes test the three adapter shapes: <code class="t-code">?persist=on</code> (default), <code class="t-code">?persist=off</code>, <code class="t-code">?persist=memory</code>. Current mode: <KTag bold>{{ displayMode }}</KTag>. Switch:
          <a href="?persist=on">on</a> ·
          <a href="?persist=off">off</a> ·
          <a href="?persist=memory">memory</a>
        </p>
      </KBookSection>

      <KBookSection id="how-to-try">
        <h2 class="t-display">
          How to try it<br />
          <span class="t-display--medium">Five steps, end to end</span>
        </h2>
        <p class="t-body">
          Highlight the next paragraph, then the one after it. A separate draft opens for each selection. Type a sentence into either field, hit enter, and watch the thread land in the stack on the right.
        </p>
        <p class="t-body">This sentence is a good first target. Drag across it now.</p>
        <p class="t-body">
          This second sentence runs across an em dash and a few words, to prove the highlight survives the kind of body prose the kit actually ships.
        </p>
        <p class="t-body">
          Reload the page. Both threads come back, highlights and all. Replies inside a thread persist the same way. Drafts persist mid-typing — the save observer watches character data on the stack, not just child additions.
        </p>
      </KBookSection>

      <KBookSection id="what-persists">
        <h2 class="t-display">
          What persists<br />
          <span class="t-display--medium">The full comment loop</span>
        </h2>
        <p class="t-body">
          Threads with anchor, author, and body. Replies inside a thread. Resolved threads (Approve from the kebab) and archived threads (Archive thread from the kebab). Drafts mid-typing. Highlights on the doc body, re-wrapped from the anchor metadata each thread carries on its dataset.
        </p>
        <p class="t-body">
          The snapshot is the stack's <code class="t-code">innerHTML</code> plus a <code class="t-code">savedAt</code> timestamp. No separate highlights array — <code class="t-code">data-kk-anchor-quote</code> on the thread is the source of truth for re-wrapping.
        </p>
      </KBookSection>

      <KBookSection id="switch-off">
        <h2 class="t-display">
          Switching it off<br />
          <span class="t-display--medium">For DB-backed apps</span>
        </h2>
        <p class="t-body">
          Apps that route the <code class="t-code">kk:comment</code> event to their own backend should not also write to localStorage. Pass <code class="t-code">enabled: false</code> to <code class="t-code">useCommentStore</code>:
        </p>
        <KCode block>{{ offSnippet }}</KCode>
        <p class="t-body">
          Append <code class="t-code">?persist=off</code> to this page's URL (or use the switch above) to see it live. The stack stays empty across reloads. <code class="t-code">useCommentStore</code>'s returned <code class="t-code">clear()</code> stays callable; it just has nothing to clear.
        </p>
      </KBookSection>

      <KBookSection id="custom-adapter">
        <h2 class="t-display">
          Custom adapter<br />
          <span class="t-display--medium">Three methods, your store</span>
        </h2>
        <p class="t-body">
          Pass an object carrying <code class="t-code">load</code>, <code class="t-code">save</code>, and <code class="t-code">clear</code> as the <code class="t-code">adapter</code> option. <code class="t-code">useCommentStore</code> calls <code class="t-code">load()</code> once at mount, <code class="t-code">save(snapshot)</code> on every batch of stack mutations (200 ms debounce), and <code class="t-code">clear()</code> only when the consumer calls the composable's own returned <code class="t-code">clear()</code>:
        </p>
        <KCode block>{{ customAdapterSnippet }}</KCode>
        <p class="t-body">
          Append <code class="t-code">?persist=memory</code> to this page's URL (or use the switch above) to see a custom adapter at work. The snapshot lives in a plain JS closure. The stack survives in-tab navigation; a full reload resets it.
        </p>
      </KBookSection>

      <KBookSection id="api">
        <h2 class="t-display">
          Public API<br />
          <span class="t-display--medium">Three always-on methods</span>
        </h2>
        <p class="t-body">
          <code class="t-code">useCommentSecret</code>'s <code class="t-code">extractComments()</code> walks the live stack and returns an array of threads with anchor metadata plus messages — same shape as the <code class="t-code">kk:comment</code> event payload. <code class="t-code">copyComments()</code> returns the same array and writes pretty-printed JSON to the clipboard. <code class="t-code">useCommentStore</code>'s <code class="t-code">clear()</code> wipes the adapter and reloads.
        </p>
        <p class="t-body">Three buttons in the inspector run each method against this page. Open the browser console first; output lands there.</p>
      </KBookSection>

      <KBookSection id="anchor">
        <h2 class="t-display">
          Anchor metadata<br />
          <span class="t-display--medium">How highlights find their way home</span>
        </h2>
        <p class="t-body">
          Each thread mirrors the selection that made it. <code class="t-code">useCommentFlow</code> writes <code class="t-code">data-kk-anchor-quote</code>, <code class="t-code">-prefix</code>, <code class="t-code">-suffix</code>, and <code class="t-code">-section-slug</code> onto the thread at draft commit. <code class="t-code">useCommentStore</code>'s restore reads those attributes, finds the section, walks text nodes for the first single-node match, and wraps it as <code class="t-code">&lt;span class="highlight" data-comment-id="…"&gt;</code>.
        </p>
        <p class="t-body">
          Selections that crossed element boundaries on first wrap (across a <code class="t-code">&lt;strong&gt;</code>, for example) restore as a single-node match only. The thread restores intact; the doc-side highlight is partially lost. Same trade-off as the pre-2.0 kit.js implementation this composable replaces.
        </p>
      </KBookSection>

      <KSignoff
        :stats="signoffStats"
        author="Konstantin Konstantinopolskii"
        role="founder"
        org="kk.consulting"
        stamp="2026-07-20, comment persistence demo."
        signature-src="../../signature.svg"
      />
    </main>

    <aside ref="inspectorRef" class="inspector" aria-label="Comments">
      <KInspectorGroup>
        <KCard variant="interactive">
          <KCardHeading
            title="How to use this page"
            subtitle="Highlight any sentence on the left to draft a comment. Reload to see persistence. Switch modes via the links above the doc, or edit the URL directly."
          />
          <KCardCollapsible>
            <KList ordered :items="howToSteps" />
          </KCardCollapsible>
        </KCard>

        <KCard variant="interactive" id="api-panel">
          <KCardHeading title="Run the public API" subtitle="Output lands in the browser console. Open it before clicking." />
          <KCardCollapsible>
            <p class="t-body">Each button runs against the current state of the comment stack on this page.</p>
            <KButton @click="onExtract">Extract comments</KButton>
            <KButton @click="onCopy">Copy as JSON</KButton>
            <KButton primary @click="clear">Clear and reload</KButton>
          </KCardCollapsible>
        </KCard>
      </KInspectorGroup>

      <KCommentStack />
    </aside>
  </KApp>
</template>
