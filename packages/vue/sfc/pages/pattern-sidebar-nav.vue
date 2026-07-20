<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/patterns/sidebar-nav.html, the
   frozen static oracle for patterns_check.mjs. KApp + KSidebar +
   KSidebarNav + KNavGroup cover this pattern exactly — a hand-authored
   TOC with four nav groups, no book/inspector on the page so
   useScrollSpy's onMounted no-ops (no .book/#doc element to bind). */
import { KApp, KSidebar, KSidebarNav, KNavGroup } from '@konstantinopolskii/vue'
</script>

<template>
  <KApp>
    <KSidebar title="Fundamental">
      <KSidebarNav>
        <KNavGroup
          head="Prose"
          :items="[
            { label: 'Opening', href: '#opening' },
            { label: 'Reading', href: '#reading' },
            { label: 'Lists', href: '#lists' },
            { label: 'Figures', href: '#figures' },
          ]"
        />
        <KNavGroup
          head="Spec"
          :items="[
            { label: 'Color', href: '#color' },
            { label: 'Space', href: '#space' },
            { label: 'Type', href: '#type' },
            { label: 'Motion', href: '#motion' },
          ]"
        />
        <KNavGroup
          head="Controls"
          :items="[
            { label: 'Cards', href: '#cards' },
            { label: 'Fields', href: '#fields' },
            { label: 'Buttons', href: '#buttons' },
            { label: 'Tags', href: '#tags' },
            { label: 'Switches', href: '#switches' },
          ]"
        />
        <KNavGroup head="Margin" :items="[{ label: 'Signoff', href: '#signoff' }]" />
      </KSidebarNav>

      <template #footer>
        2026, kk.consulting<br />
        Fundamental demo
      </template>
    </KSidebar>
  </KApp>
</template>
