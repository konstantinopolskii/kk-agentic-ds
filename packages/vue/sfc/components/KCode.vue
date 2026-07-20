<script setup lang="ts">
/* Code — inline surface chip hugging the line, or block paragraph
   with a 4 px gray left rail. Commissioner, regular, no bold, no
   caps, no scale shift. */
withDefaults(defineProps<{ block?: boolean }>(), { block: false })
</script>

<template>
  <pre v-if="block" class="t-code t-code--block"><slot
  /></pre><span v-else class="t-code"><slot
  /></span>
</template>
