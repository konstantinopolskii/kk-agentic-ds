<script setup lang="ts">
/* Spark labels — direct labels under a panel spark. First, peak,
   last. A legend is a failure to label directly. */
defineProps<{
  labels: string[]
}>()
</script>

<template>
  <div class="spark-labels"><span v-for="(label, i) in labels" :key="i">{{ label }}</span></div>
</template>
