<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/patterns/deck-in-shout.html, the
   frozen static oracle for patterns_check.mjs. The deck (.deck > .deck-card)
   has no K component — useDeck is the 1:1 kit.js port, wired here on mount
   against the raw markup exactly like a consumer would. The "Choose"
   buttons carry class="tag deck-card__select", not the button/t-subtitle
   shape KButton emits, so they stay raw markup (KButton's type="button"
   default does match this oracle's buttons — the class shape is what
   rules the component out). */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { KCard, useDeck } from '@konstantinopolskii/vue'

const deckEl = ref<HTMLElement | null>(null)
let dispose: (() => void) | undefined

onMounted(() => {
  if (deckEl.value) dispose = useDeck(deckEl.value)
})
onBeforeUnmount(() => dispose?.())
</script>

<template>
  <KCard variant="shout">
    <div class="deck" ref="deckEl">
      <div class="deck-card active">
        <p class="t-caption--bold">Monochrome</p>
        <p class="t-caption">Pure black on white. Nine tokens, no brand.</p>
        <button class="tag deck-card__select" type="button">Choose</button>
      </div>
      <div class="deck-card">
        <p class="t-caption--bold">Muted warm</p>
        <p class="t-caption">Same tokens, 2% warm tint in neutrals.</p>
        <button class="tag deck-card__select" type="button">Choose</button>
      </div>
      <div class="deck-card">
        <p class="t-caption--bold">Cool gray</p>
        <p class="t-caption">Slight blue cast in the neutral scale.</p>
        <button class="tag deck-card__select" type="button">Choose</button>
      </div>
      <div class="deck-card">
        <p class="t-caption--bold">High contrast</p>
        <p class="t-caption">Pure black text, borders at 20%.</p>
        <button class="tag deck-card__select" type="button">Choose</button>
      </div>
      <div class="deck-card">
        <p class="t-caption--bold">Ink</p>
        <p class="t-caption">Inverted. White on black. Full system.</p>
        <button class="tag deck-card__select" type="button">Choose</button>
      </div>
    </div>
  </KCard>
</template>
