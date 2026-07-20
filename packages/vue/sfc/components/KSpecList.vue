<script setup lang="ts">
/* Spec list — key-value rows inside a card. Three shapes: plain
   (key + value), value (key + value + prose), triple (claim /
   reality / resolution). Two, three, or four columns only. */
type Row = { key: string; values: string[] }

withDefaults(
  defineProps<{
    variant?: 'plain' | 'value' | 'triple'
    rows: Row[]
  }>(),
  { variant: 'plain' },
)

const classes: Record<'plain' | 'value' | 'triple', string> = {
  plain: 'book__spec',
  value: 'book__spec book__spec--value',
  triple: 'book__spec book__spec--triple',
}
</script>

<template>
  <dl :class="classes[variant]">
    <div v-for="(row, i) in rows" :key="i" class="book__spec-row">
      <dt class="book__spec-key">{{ row.key }}</dt>
      <dd v-for="(value, j) in row.values" :key="j" class="book__spec-value">{{ value }}</dd>
    </div>
  </dl>
</template>
