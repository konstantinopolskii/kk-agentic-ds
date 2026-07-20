<script setup lang="ts">
/* Field, display form — a read-only label and value sharing one row.
   The 0.5 px divider between consecutive fields comes from the CSS,
   never above the first or below the last. */
withDefaults(
  defineProps<{
    label: string
    value?: string
  }>(),
  { value: '' },
)
</script>

<template>
  <div class="field field--row">
    <span class="t-caption--bold field__label">{{ label }}</span>
    <span class="t-caption field__value"><slot>{{ value }}</slot></span>
  </div>
</template>
