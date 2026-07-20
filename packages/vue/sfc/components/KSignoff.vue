<script setup lang="ts">
/* Signoff — canonical document ending. Stats grid (two or four,
   never three) + byline + handwritten signature SVG. Every doc
   ships signed. */
import KStat from './KStat.vue'

type Stat = { value: string; text: string }

defineProps<{
  stats: Stat[]
  author: string
  role: string
  org: string
  stamp: string
  signatureSrc: string
}>()
</script>

<template>
  <div class="book__signoff">
    <div class="book__signoff-stats">
      <KStat v-for="(stat, i) in stats" :key="i" :value="stat.value" :text="stat.text" />
    </div>
    <div class="book__signoff-signature">
      <p class="t-caption">Signed by <span class="t-caption--bold">{{ author }},</span><br />{{ role }} at <span class="t-caption--bold">{{ org }}</span><br /><span class="t-muted">{{ stamp }}</span></p>
      <img class="book__signoff-signature-img" :src="signatureSrc" alt="Signature" />
    </div>
  </div>
</template>
