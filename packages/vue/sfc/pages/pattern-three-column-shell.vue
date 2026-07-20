<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/patterns/three-column-shell.html,
   the frozen static oracle for patterns_check.mjs. Full KApp/KSidebar/
   KSidebarNav/KNavGroup/KBook/KBookSection/KInspector/KInspectorGroup/
   KCard/KCardHeading shell. Raw <button> markup — KButton always stamps
   type="button", which this oracle's buttons do not carry. */
import {
  KApp,
  KSidebar,
  KSidebarNav,
  KNavGroup,
  KBook,
  KBookSection,
  KInspector,
  KInspectorGroup,
  KCard,
  KCardHeading,
} from '@konstantinopolskii/vue'
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
          ]"
        />
      </KSidebarNav>
      <template #footer>
        2026, kk.consulting<br />
        Fundamental demo
      </template>
    </KSidebar>

    <KBook id="doc">
      <KBookSection>
        <h1 class="t-hero">Fundamental</h1>
        <p class="t-body">
          The middle column is what we read. Sidebar on the left carries
          the map. Inspector on the right carries actions and comments.
        </p>
      </KBookSection>
      <KBookSection id="opening">
        <h2 class="t-display">
          Opening<br />
          <span class="t-display--medium t-muted">Hero, intro, part break</span>
        </h2>
        <p class="t-body">
          Document-shaped. Seven parts, each a section in the middle
          column. The sidebar tracks position; the inspector holds
          state.
        </p>
      </KBookSection>
      <KBookSection id="reading">
        <h2 class="t-display">
          Reading<br />
          <span class="t-display--medium t-muted">Body, caption, micro</span>
        </h2>
        <p class="t-body">
          Paragraphs set in body type. Over three sentences, the
          paragraph becomes a list or a spec card.
        </p>
      </KBookSection>
    </KBook>

    <KInspector>
      <KInspectorGroup>
        <KCard variant="heading">
          <h2 class="t-display">Tweak</h2>
        </KCard>
        <KCard variant="interactive" state="active">
          <KCardHeading title="Tweak the tokens" subtitle="Brief the agent, pick a direction, scope, commit." />
          <button class="button t-subtitle" data-cta="minimized">Configure</button>
          <button class="button button--primary t-subtitle" data-cta="active">Apply tweak</button>
        </KCard>
      </KInspectorGroup>
    </KInspector>
  </KApp>
</template>
