<script setup lang="ts">
/* SFC rebuild of demos/md-renderer-smoke/index.html. The legacy page fetched
   three sample .md files at runtime via md.js's [data-md-src] pipeline and
   rendered them one after another in a single column. This page instead
   ?raw-imports the same three samples at build time and calls
   renderMarkdown() directly — deterministic, SSR-renderable, no fetch, no
   client/server mismatch to guard against.

   Deviation from the legacy layout: rather than one render per sample, each
   sample renders twice, side by side — the renderMarkdown() output next to
   the sample's own raw text — so a reader can eyeball render against source
   in one glance instead of opening the .md file separately. Reuses
   KCardStack's `columns` variant (the same "parallel comparison" pattern
   kit-snapshot.vue uses for its metric row) rather than inventing new CSS;
   this file may not add any.

   TOC works here (unlike doc-viewer.vue's page): every sample is inlined at
   setup time, so by the time KSidebarNav's onMounted scans .book (see
   packages/vue/sfc/composables/useScrollSpy.ts), the full DOM — including
   each sample's rendered h1 — is already in place. No fetch-after-mount gap
   to fall into. */
import { KApp, KSidebar, KSidebarNav, KBookSection, KCardStack, KInspector, KInspectorGroup, KCard, KCardHeading, renderMarkdown } from '@konstantinopolskii/vue'

import sampleARaw from '../../../../demos/md-renderer-smoke/sample-a.md?raw'
import sampleBRaw from '../../../../demos/md-renderer-smoke/sample-b.md?raw'
import sampleCRaw from '../../../../demos/md-renderer-smoke/sample-c.md?raw'

interface Sample {
  id: string
  file: string
  raw: string
  rendered: string
}

// Every article carries its own h1 (data-md-heading-offset="0" in the
// legacy page) — offset 0 here matches.
const samples: Sample[] = [
  { id: 'sample-a', file: 'sample-a.md', raw: sampleARaw, rendered: renderMarkdown(sampleARaw, { headingOffset: 0 }) },
  { id: 'sample-b', file: 'sample-b.md', raw: sampleBRaw, rendered: renderMarkdown(sampleBRaw, { headingOffset: 0 }) },
  { id: 'sample-c', file: 'sample-c.md', raw: sampleCRaw, rendered: renderMarkdown(sampleCRaw, { headingOffset: 0 }) },
]
</script>

<template>
  <KApp view="doc">
    <KSidebar title="Renderer">
      <KSidebarNav />
      <template #footer>renderMarkdown() smoke test</template>
    </KSidebar>

    <main id="doc" class="book">
      <KBookSection v-for="sample in samples" :key="sample.id" :id="sample.id">
        <p class="t-caption t-muted">{{ sample.file }}</p>
        <KCardStack columns>
          <div class="card">
            <h3 class="t-title">Render</h3>
            <div v-html="sample.rendered"></div>
          </div>
          <div class="card">
            <h3 class="t-title">Source</h3>
            <pre><code class="t-code t-code--block">{{ sample.raw }}</code></pre>
          </div>
        </KCardStack>
      </KBookSection>
    </main>

    <KInspector label="Inspector">
      <KInspectorGroup>
        <KCard variant="heading"><h2 class="t-display">Notes</h2></KCard>
        <KCard>
          <KCardHeading title="Renderer is dumb" subtitle="Each article.book__section pairs one sample's render output with its raw source. wrapInSections still owns the nested structure inside the render side." />
        </KCard>
        <KCard>
          <KCardHeading title="Fully baked, no fetch" subtitle="renderMarkdown() runs at setup time against a build-time ?raw import — no client fetch, no kk:md-rendered event to wait on. Check devtools for zero console errors." />
        </KCard>
      </KInspectorGroup>
    </KInspector>
  </KApp>
</template>
