<script setup lang="ts">
/* Stat — a lone number inside prose. Bold value, regular sentence.
   Lives in signoff stats grids; panels reach for metric instead. */
defineProps<{
  value: string
  text: string
}>()
</script>

<template>
  <div class="stat t-caption">
    <div><span class="t-caption--bold">{{ value }}</span> {{ text }}</div>
  </div>
</template>
