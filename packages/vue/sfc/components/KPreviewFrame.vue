<script setup lang="ts">
/* Preview frame — kit-doc primitive. The wrapper clips; the iframe
   renders at 400% and scales to 0.25. Both classes are load-bearing. */
defineProps<{
  src: string
  title: string
}>()
</script>

<template>
  <div class="preview-frame">
    <iframe class="preview-frame__iframe" :src="src" :title="title" loading="lazy" />
  </div>
</template>
