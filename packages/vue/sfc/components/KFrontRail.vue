<script setup lang="ts">
/* Front rail — the latest column. A tight stack of media rows under
   a title. */
withDefaults(defineProps<{ title?: string }>(), { title: '' })
</script>

<template>
  <aside class="front__rail">
    <h3 v-if="title" class="t-title">{{ title }}</h3>
    <slot />
  </aside>
</template>
