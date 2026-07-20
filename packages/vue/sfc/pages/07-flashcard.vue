<script setup lang="ts">
/* SFC twin of demos/reference-recreations/07-flashcard.vue.js, itself the
   h() twin of the frozen static demos/reference-recreations/07-flashcard.html.
   Same DOM, kit components where they exist, raw markup for the one
   bespoke variant (book__section--fill has no component prop). */
import { KApp, KBook, KBookSection, KCard, KButton } from '@konstantinopolskii/vue'
</script>

<template>
  <KApp view="single">
    <KBook id="doc">
      <article class="book__section book__section--fill">
        <KCard variant="shout">
          <h1 class="t-hero">Exercise</h1>
          <p class="t-caption t-subtle">Tap to flip</p>
        </KCard>
      </article>
      <KBookSection>
        <KButton>Shuffle the deck</KButton>
      </KBookSection>
    </KBook>
  </KApp>
</template>
