<script setup lang="ts">
/* Book — the reading column. Owns the scroll in the doc shell. */
withDefaults(defineProps<{ id?: string }>(), { id: 'doc' })
</script>

<template>
  <main class="book" :id="id">
    <slot />
  </main>
</template>
