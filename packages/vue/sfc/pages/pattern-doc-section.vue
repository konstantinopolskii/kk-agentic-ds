<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/patterns/doc-section.html, the
   frozen static oracle for patterns_check.mjs. Plain book__section: a
   display heading, body prose with an inline code token, and a static
   card. Raw <button> markup — KButton always stamps type="button", which
   this oracle's buttons do not carry. */
import { KBookSection, KCard, KCode } from '@konstantinopolskii/vue'
</script>

<template>
  <KBookSection>
    <h2 class="t-display">
      Buttons<br />
      <span class="t-display--medium t-muted">Secondary, primary</span>
    </h2>
    <p class="t-body">
      Full-width by default, <KCode>12px</KCode>
      radius, bold label. Imperative verbs. One primary per card.
    </p>
    <KCard>
      <p class="t-caption">Pick a theme for the next document pass.</p>
      <button class="button t-subtitle">Pick tokens</button>
      <button class="button button--primary t-subtitle">Apply tokens</button>
    </KCard>
  </KBookSection>
</template>
