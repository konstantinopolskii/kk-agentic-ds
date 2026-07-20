<script setup lang="ts">
/* Registry table — dense two-column inventory for kit docs only.
   Header cells at t-caption; body rows come through the default
   slot as <tr> of td.t-body cells. */
defineProps<{
  columns: string[]
}>()
</script>

<template>
  <table class="registry-table">
    <thead>
      <tr>
        <th v-for="(label, i) in columns" :key="i" class="t-caption">{{ label }}</th>
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>
