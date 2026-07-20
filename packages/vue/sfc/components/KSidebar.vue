<script setup lang="ts">
/* Sidebar — brand header, nav, footer. The left column of the
   reading shell. */
withDefaults(defineProps<{ title?: string }>(), { title: '' })
</script>

<template>
  <aside class="sidebar" aria-label="Navigation">
    <div v-if="title" class="sidebar__header t-title">{{ title }}</div>
    <slot />
    <footer v-if="$slots.footer" class="sidebar__footer t-caption"><slot name="footer" /></footer>
  </aside>
</template>
