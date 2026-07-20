<script setup lang="ts">
/* SFC twin of root index.html — the manifesto front page. Markdown is
   BAKED at build/SSR time via renderMarkdown (sfc/markdown.ts, the 1:1
   port of legacy js/md.js) instead of fetched client-side by the retired
   js/md.js: no [data-md-src], no fetch, no kk:md-rendered event. The
   ?raw import resolves manifesto.md's text at compile time; renderMarkdown
   runs it through the same deterministic string pipeline once, at setup,
   into a plain const — SSR output and the client's first hydration pass
   render the identical v-html string, so there is no hydration mismatch.

   headingOffset is 0 (index.html's data-md-heading-offset="0"): this
   page has no shell h1 of its own — the manifesto's own `#` IS the page
   hero, same as legacy's opt-out contract in js/md.js's load().

   Legacy js/kit.js gave this page four behaviors. Three come free from
   the 2.0 shell components with zero page-level wiring:
     - Sidebar TOC auto-fill (kit.js buildSidebarToc, 1946-2139) +
       scroll-spy (kit.js initScrollSpy, 266-447) + the rAF glide —
       KSidebarNav calls useScrollSpy on mount, which runs the same
       buildSidebarToc pass against document.querySelector('.book')
       (this page's raw main.book) before wiring the same
       IntersectionObserver + indicator + glide. The book's v-html
       content is already in the DOM by the time any onMounted fires
       (Vue creates the whole initial subtree before flushing mounted
       hooks), so the scan sees every rendered heading.
     - Narrow-view [data-view] toggle (kit.js initNarrowView, 455-480)
       + column-reveal cascade (kit.js initColumnReveal, 488-552) —
       KApp wires useNarrowView + useColumnReveal on mount. useNarrowView
       binds its click listener on `document`, so it resolves
       [data-view-target] clicks from the two FABs below even though
       they sit outside .app (same reach kit.js's own
       document.addEventListener gave the legacy FABs).
   The FABs themselves have no K component (same as
   pattern-index.vue / pattern-narrow.vue: raw <button> markup, the
   hamburger <rect> children injected via v-html so Vue's SVG
   serializer keeps them self-closed like the legacy markup) — no
   extra onMounted wiring needed since useNarrowView's listener is
   already document-level.

   Inspector: eleven card--link pointers, seven canon + four demos, in
   two inspector__groups — reproduced from index.html verbatim except
   two hrefs updated to their 2.0 successors (the legacy targets are
   frozen, not deleted):
     - "Comment persistence" → ./demos/comments/index.html
     - "Reference recreations" → ./demos/generated/index.html
   KCardHeading covers every card whose subtitle is plain text; the
   "Comment persistence" card's caption carries an inline
   <code class="t-code"> so it falls back to raw
   <div class="card__heading"> markup (KCardHeading's subtitle prop is
   text-only), same convention pattern-index.vue documents for its own
   raw-markup exceptions. */
// Vite's `?raw` suffix import — vite/client.d.ts (tsconfig's "types":
// ["vite/client"]) already declares a generic `declare module '*?raw'`
// that matches this specifier, path traversal into the repo-root
// skills/ directory included, so no local ambient declaration is needed.
import manifestoMd from '../../../../skills/kk-design-system/manifesto.md?raw'
import { KApp, KSidebar, KSidebarNav, KInspector, KInspectorGroup, KCard, KCardHeading, renderMarkdown } from '@konstantinopolskii/vue'

const bookHtml = renderMarkdown(manifestoMd, { headingOffset: 0 })
</script>

<template>
  <KApp view="doc">
    <KSidebar>
      <div class="sidebar__header t-title">Agentic<br />Design&nbsp;System</div>
      <KSidebarNav />
      <template #footer>2026, fuckgrechka.ru<br />Powered by kk.consulting</template>
    </KSidebar>

    <main class="book" id="doc" v-html="bookHtml"></main>

    <KInspector label="Open a book">
      <KInspectorGroup>
        <KCard variant="heading"><h2 class="t-display">Open a book</h2></KCard>

        <KCard variant="link" href="./doc.html?src=./skills/kk-design-system/canon/patterns.md">
          <KCardHeading title="Patterns" subtitle="When composing any layout, start here. Three columns, card stack, narrow mobile." />
          <span class="button t-subtitle">Browse patterns</span>
        </KCard>

        <KCard variant="link" href="./doc.html?src=./skills/kk-design-system/canon/components.md">
          <KCardHeading title="Components" subtitle="When drilling from a pattern into a part, find every foundation, component, and forbidden thing." />
          <span class="button t-subtitle">Find a component</span>
        </KCard>

        <KCard variant="link" href="./doc.html?src=./skills/kk-design-system/canon/voice.md">
          <KCardHeading title="Voice" subtitle="When writing a string, find shape rules and the AI-tells inventory in one place." />
          <span class="button t-subtitle">Read the voice guide</span>
        </KCard>

        <KCard variant="link" href="./doc.html?src=./skills/kk-design-system/pipeline/pipeline.md">
          <KCardHeading title="Pipeline" subtitle="When entering or evaluating a session, find stages, role roster, and communication protocol." />
          <span class="button t-subtitle">Walk the pipeline</span>
        </KCard>

        <KCard variant="link" href="./doc.html?src=./skills/kk-design-system/pipeline/protocols.md">
          <KCardHeading title="Protocols" subtitle="When shipping, evolving, or logging an exception, find bundle, semver, evolve, backlog, ideation." />
          <span class="button t-subtitle">Check the protocols</span>
        </KCard>

        <KCard variant="link" href="./skills/kk-design-system/tokens.json">
          <KCardHeading title="Tokens" subtitle="When code needs a design token, read the machine-readable source of truth." />
          <span class="button t-subtitle">Inspect tokens</span>
        </KCard>

        <KCard variant="link" href="./doc.html?src=./references/registry.md">
          <KCardHeading title="Reference registry" subtitle="Twelve measured studies behind the 1.12.0 components. Common moves, taxonomy, mappings." />
          <span class="button t-subtitle">Study the references</span>
        </KCard>
      </KInspectorGroup>

      <KInspectorGroup>
        <KCard variant="heading"><h2 class="t-display">Demos</h2></KCard>

        <KCard variant="link" href="./demos/fundamental--accepted/index.html">
          <KCardHeading title="Fundamental" subtitle="Live component inventory. Deep-link target for every canon class." />
          <span class="button t-subtitle">Tour the inventory</span>
        </KCard>

        <KCard variant="link" href="./demos/md-renderer-smoke/index.html">
          <KCardHeading title="Renderer smoke" subtitle="Side-by-side markdown render vs source. Ship-time check for the .md pipeline." />
          <span class="button t-subtitle">Run the smoke test</span>
        </KCard>

        <!-- href updated: legacy ./demos/comment-persistence/index.html is
             frozen; this points at its 2.0 sibling. Caption carries inline
             <code>, so KCardHeading (text-only subtitle) cannot reproduce
             it — raw card__heading markup instead. -->
        <KCard variant="link" href="./demos/comments/index.html">
          <div class="card__heading">
            <h3 class="t-title">Comment persistence</h3>
            <p class="t-caption">Highlight, comment, reload. <code class="t-code">localStorage</code> by default; switch off or pass a custom adapter.</p>
          </div>
          <span class="button t-subtitle">Try the loop</span>
        </KCard>

        <!-- href updated: legacy ./demos/reference-recreations/index.html
             is frozen; this points at the 2.0-generated gallery. -->
        <KCard variant="link" href="./demos/generated/index.html">
          <KCardHeading title="Reference recreations" subtitle="Fourteen product surfaces rebuilt in kit vocabulary: dashboards, feeds, landings, blogpost, news front." />
          <span class="button t-subtitle">Open the gallery</span>
        </KCard>
      </KInspectorGroup>
    </KInspector>
  </KApp>

  <button class="fab fab--nav" data-view-target="nav" type="button" aria-label="Open the sidebar">
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      aria-hidden="true"
      v-html="'&lt;rect width=&quot;18&quot; height=&quot;2&quot; rx=&quot;1&quot; fill=&quot;currentColor&quot;/&gt;&lt;rect y=&quot;6&quot; width=&quot;18&quot; height=&quot;2&quot; rx=&quot;1&quot; fill=&quot;currentColor&quot;/&gt;&lt;rect y=&quot;12&quot; width=&quot;18&quot; height=&quot;2&quot; rx=&quot;1&quot; fill=&quot;currentColor&quot;/&gt;'"
    ></svg>
  </button>
  <button class="fab fab--inspector" data-view-target="inspector" type="button" aria-label="Open a book">
    <span class="fab__count">11</span>
  </button>
</template>
