<script setup lang="ts">
/* Front masthead — hero title over a micro dateline. Once per front. */
withDefaults(
  defineProps<{
    title: string
    dateline?: string
  }>(),
  { dateline: '' },
)
</script>

<template>
  <header class="front__masthead">
    <h1 class="t-hero">{{ title }}</h1>
    <p v-if="dateline" class="t-micro t-muted">{{ dateline }}</p>
  </header>
</template>
