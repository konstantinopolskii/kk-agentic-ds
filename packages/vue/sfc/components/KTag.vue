<script setup lang="ts">
/* Tag — canonical: <span class="tag">. Never a link, never a button.
   Bold variant marks a state worth ink. */
withDefaults(defineProps<{ bold?: boolean }>(), { bold: false })
</script>

<template>
  <span :class="bold ? 'tag tag--bold' : 'tag'"><slot
  /></span>
</template>
