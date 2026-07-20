<script setup lang="ts">
/* Metric — canonical: value first, label second, delta third. Delta
   direction rides the glyph the author writes (↑ ↓), never a color. */
withDefaults(
  defineProps<{
    value: string | number
    label?: string
    delta?: string
  }>(),
  { label: '', delta: '' },
)
</script>

<template>
  <div class="metric">
    <p class="metric__value">{{ value }}</p>
    <p v-if="label" class="metric__label">{{ label }}</p>
    <p v-if="delta" class="metric__delta">{{ delta }}</p>
  </div>
</template>
