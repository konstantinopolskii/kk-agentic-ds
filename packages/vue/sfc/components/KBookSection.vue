<script setup lang="ts">
/* Book section — one article per section; the id anchors the nav. */
withDefaults(defineProps<{ id?: string }>(), { id: '' })
</script>

<template>
  <article class="book__section" :id="id || undefined">
    <slot />
  </article>
</template>
