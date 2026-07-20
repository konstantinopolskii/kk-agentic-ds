<script setup lang="ts">
/* Data table cell — the lead cell is bold, numeric cells right-align
   tabular, delta cells carry the glyph in text. Flat deltas demote
   to regular muted. delta implies num. */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    lead?: boolean
    num?: boolean
    delta?: boolean
    flat?: boolean
  }>(),
  { lead: false, num: false, delta: false, flat: false },
)

const cls = computed<string | undefined>(() =>
  props.lead
    ? 'data-table__lead'
    : props.delta
      ? `data-table__num data-table__delta${props.flat ? ' data-table__delta--flat' : ''}`
      : props.num
        ? 'data-table__num'
        : undefined,
)
</script>

<template>
  <td v-bind="cls ? { class: cls } : {}"><slot /></td>
</template>
