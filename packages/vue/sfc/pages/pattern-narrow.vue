<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/patterns/narrow.html, the
   frozen static oracle for patterns_check.mjs. KApp + KBook/KBookSection
   for the shell and reading column. The collapsed sidebar and the modal
   inspector are raw <aside> markup: KSidebar has no "collapsed" variant
   and always renders aria-label="Navigation" with an optional title/
   footer (not a bare hamburger button); KInspector always stamps its own
   aria-label and has no "modal" variant, while this oracle's modal aside
   carries aria-hidden="true" and no aria-label at all. KInspectorGroup/
   KCard/KCardHeading still apply inside the modal aside. Raw <button>
   markup throughout — KButton always stamps type="button", which this
   oracle's buttons do not carry. The hamburger icon's <rect> children are
   self-closed in the static; Vue has no void-element rule for SVG tags
   and always emits a matching closing tag for non-void elements, so the
   rects are injected via v-html (same trick as 06-person-page.vue's
   inline path icon) to keep the literal self-closing markup. */
import { KApp, KBook, KBookSection, KInspectorGroup, KCard, KCardHeading } from '@konstantinopolskii/vue'
</script>

<template>
  <KApp>
    <aside class="sidebar sidebar--collapsed" aria-label="Navigation">
      <button class="button button--icon" aria-label="Open navigation">
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          aria-hidden="true"
          v-html="'&lt;rect width=&quot;18&quot; height=&quot;2&quot; rx=&quot;1&quot; fill=&quot;currentColor&quot;/&gt;&lt;rect y=&quot;6&quot; width=&quot;18&quot; height=&quot;2&quot; rx=&quot;1&quot; fill=&quot;currentColor&quot;/&gt;&lt;rect y=&quot;12&quot; width=&quot;18&quot; height=&quot;2&quot; rx=&quot;1&quot; fill=&quot;currentColor&quot;/&gt;'"
        ></svg>
      </button>
    </aside>

    <KBook id="doc">
      <KBookSection>
        <h1 class="t-hero">Narrow</h1>
        <p class="t-body">
          Below 800 px the book takes the full column. Sidebar collapses
          behind a hamburger. Inspector slides over as a modal sheet.
        </p>
      </KBookSection>
      <KBookSection id="full-width">
        <h2 class="t-display">
          Full width<br />
          <span class="t-display--medium t-muted">Book column carries the read</span>
        </h2>
        <p class="t-body">
          Only one column shows at a time. The hamburger on the left
          opens the sidebar; the FAB on the right opens the inspector.
        </p>
      </KBookSection>
      <KBookSection id="slide-over">
        <h2 class="t-display">
          Slide over<br />
          <span class="t-display--medium t-muted">Inspector as a sheet</span>
        </h2>
        <p class="t-body">
          Tapping the inspector FAB reveals the inspector as a modal
          sheet above the book. Tap outside to dismiss.
        </p>
      </KBookSection>
    </KBook>

    <aside class="inspector inspector--modal" aria-hidden="true">
      <KInspectorGroup>
        <KCard variant="heading">
          <h2 class="t-display">Sheet</h2>
        </KCard>
        <KCard variant="interactive">
          <KCardHeading title="Modal inspector" subtitle="Opens from the right at narrow widths. Same content, different shell." />
          <button class="button t-subtitle" data-cta="minimized">Close</button>
          <button class="button button--primary t-subtitle" data-cta="active">Confirm</button>
        </KCard>
      </KInspectorGroup>
    </aside>
  </KApp>
</template>
