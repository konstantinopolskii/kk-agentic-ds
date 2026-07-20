<script setup lang="ts">
/* SFC rebuild of root doc.html — the generic ?src= markdown reader the
   manifesto's canon cards link into. Content is entirely client-rendered
   inside an SSR shell: the book stays empty during SSR (this file never
   touches location/window/document outside onMounted), then onMounted
   reads ?src=, fetches the markdown, and injects renderMarkdown's output
   via innerHTML — a post-mount injection cannot mismatch hydration by
   construction.

   TOC: legacy kit.js re-ran KK.refresh on the kk:md-rendered event
   (js/kit.js 2797), so doc.html's sidebar TOC filled AFTER md.js's fetch
   injected the book. KSidebarNav cannot reproduce that — its onMounted
   runs useScrollSpy once, synchronously, before this page's fetch
   resolves, and useScrollSpy has no re-scan hook. So this page skips
   KSidebarNav and hand-rolls the identical nav shell markup (the barrel
   exports useScrollSpy exactly for markup that skips the shell
   components), then calls useScrollSpy(book, nav) itself in onMounted
   after every innerHTML injection settles — success, no-book, and
   fetch-failure branches alike, mirroring kit.js running refresh on
   whatever the book holds (buildSidebarToc no-ops on zero sections).
   Content is injected exactly once per page load, so a single
   post-injection call is the only live spy instance; its dispose runs
   in onBeforeUnmount. */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { KApp, KSidebar, KInspector, KInspectorGroup, KCard, KCardHeading, renderMarkdown, useScrollSpy } from '@konstantinopolskii/vue'

const bookRef = ref<HTMLElement | null>(null)
const navRef = ref<HTMLElement | null>(null)
let disposeSpy: (() => void) | undefined

// Shelf: the same five canon books doc.html's inspector links into, plus
// the return-to-root card. srcPath is normalized (no leading "./") so the
// self-hide compare below matches doc.html's own suffix check without
// needing a DOM query.
interface ShelfLink {
  href: string
  srcPath: string
  title: string
  subtitle: string
  button: string
}
const shelfBooks: ShelfLink[] = [
  {
    href: './doc.html?src=./skills/kk-design-system/canon/patterns.md',
    srcPath: 'skills/kk-design-system/canon/patterns.md',
    title: 'Patterns',
    subtitle: 'When composing any layout, start here. Three columns, card stack, narrow mobile.',
    button: 'Browse patterns',
  },
  {
    href: './doc.html?src=./skills/kk-design-system/canon/components.md',
    srcPath: 'skills/kk-design-system/canon/components.md',
    title: 'Components',
    subtitle: 'When drilling from a pattern into a part, find every foundation, component, and forbidden thing.',
    button: 'Find a component',
  },
  {
    href: './doc.html?src=./skills/kk-design-system/canon/voice.md',
    srcPath: 'skills/kk-design-system/canon/voice.md',
    title: 'Voice',
    subtitle: 'When writing a string, find shape rules and the AI-tells inventory in one place.',
    button: 'Read the voice guide',
  },
  {
    href: './doc.html?src=./skills/kk-design-system/pipeline/pipeline.md',
    srcPath: 'skills/kk-design-system/pipeline/pipeline.md',
    title: 'Pipeline',
    subtitle: 'When entering or evaluating a session, find stages, role roster, and communication protocol.',
    button: 'Walk the pipeline',
  },
  {
    href: './doc.html?src=./skills/kk-design-system/pipeline/protocols.md',
    srcPath: 'skills/kk-design-system/pipeline/protocols.md',
    title: 'Protocols',
    subtitle: 'When shipping, evolving, or logging an exception, find bundle, semver, evolve, backlog, ideation.',
    button: 'Check the protocols',
  },
]

// Self-hide: onMounted sets this to the normalized current ?src=. Starts
// null so SSR and the pre-mount render show every card — same idiom as
// comments-demo.vue's displayMode: the DOM patches to the real value after
// mount instead of branching on window at setup time.
const hiddenSrcPath = ref<string | null>(null)

const NO_BOOK_HTML =
  '<article class="book__section">' +
  '<h1 class="t-hero">No book selected</h1>' +
  '<p class="t-body">This page renders one canon file, named by the src query param. Pick a book from the shelf on the right, or return to the system root.</p>' +
  '</article>'

function unavailableHtml(src: string): string {
  return '<p class="t-caption t-muted">Markdown source unavailable: ' + src + '</p>'
}

// Wire the TOC + scroll-spy against whatever the book holds now. One
// call per page load (content is injected exactly once), so disposeSpy
// never holds more than one live instance.
function wireSpy() {
  if (disposeSpy || !bookRef.value || !navRef.value) return
  disposeSpy = useScrollSpy(bookRef.value, navRef.value)
}

onMounted(async () => {
  const src = new URLSearchParams(window.location.search).get('src') || ''
  // Same relative-path gate as doc.html's inline script: reject an
  // absolute URL (scheme), a protocol-relative //, or any .. traversal.
  const relative = !!src && !/^[a-z][a-z0-9+.-]*:|^\/\/|\.\./i.test(src)

  if (!relative) {
    if (bookRef.value) bookRef.value.innerHTML = NO_BOOK_HTML
    wireSpy()
    return
  }

  hiddenSrcPath.value = src.replace(/^\.\//, '')

  const name = (src.split('/').pop() || '').replace(/\.md$/, '')
  if (name) {
    document.title = name.charAt(0).toUpperCase() + name.slice(1) + '. The Agentic Design System.'
  }

  try {
    const res = await fetch(src)
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const text = await res.text()
    // Canon books carry their own h1 — same offset doc.html stamps on
    // #doc via data-md-heading-offset="0".
    if (bookRef.value) bookRef.value.innerHTML = renderMarkdown(text, { headingOffset: 0 })
  } catch {
    if (bookRef.value) bookRef.value.innerHTML = unavailableHtml(src)
  }
  wireSpy()
})

onBeforeUnmount(() => {
  disposeSpy?.()
  disposeSpy = undefined
})
</script>

<template>
  <KApp view="doc">
    <KSidebar>
      <div class="sidebar__header t-title">Agentic<br />Design&nbsp;System</div>
      <!-- Hand-rolled KSidebarNav shell: same markup, but the spy is wired
           by this page AFTER the fetch injects content, not at nav mount. -->
      <nav ref="navRef" class="sidebar__nav" id="toc">
        <span class="toc__indicator" aria-hidden="true"></span>
      </nav>
      <template #footer>2026, fuckgrechka.ru<br />Powered by kk.consulting</template>
    </KSidebar>

    <main id="doc" ref="bookRef" class="book"></main>

    <KInspector label="Open another book">
      <KInspectorGroup>
        <KCard variant="heading"><h2 class="t-display">Open another book</h2></KCard>
        <KCard
          v-for="book in shelfBooks"
          :key="book.href"
          variant="link"
          :href="book.href"
          :hidden="hiddenSrcPath === book.srcPath ? true : undefined"
        >
          <KCardHeading :title="book.title" :subtitle="book.subtitle" />
          <span class="button t-subtitle">{{ book.button }}</span>
        </KCard>
      </KInspectorGroup>

      <KInspectorGroup>
        <KCard variant="heading"><h2 class="t-display">Return</h2></KCard>
        <KCard variant="link" href="./index.html">
          <KCardHeading title="The system root" subtitle="Manifesto, principles, agents, and the shelf of every book and demo." />
          <span class="button t-subtitle">Back to the manifesto</span>
        </KCard>
      </KInspectorGroup>
    </KInspector>
  </KApp>

  <button class="fab fab--nav" data-view-target="nav" type="button" aria-label="Open the sidebar">
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <rect width="18" height="2" rx="1" fill="currentColor" />
      <rect y="6" width="18" height="2" rx="1" fill="currentColor" />
      <rect y="12" width="18" height="2" rx="1" fill="currentColor" />
    </svg>
  </button>
  <button class="fab fab--inspector" data-view-target="inspector" type="button" aria-label="Open another book">
    <span class="fab__count">6</span>
  </button>
</template>
