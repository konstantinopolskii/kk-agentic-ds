<script setup lang="ts">
/* Data table — product rows at density. Header micros over a strong
   hairline, numbers right-aligned tabular. Columns take a string or
   { label, num }. Body rows come through the default slot as <tr>
   elements built from KDataCell. */
type Column = string | { label: string; num?: boolean }

defineProps<{
  columns: Column[]
}>()

function col(c: Column): { label: string; num?: boolean } {
  return typeof c === 'string' ? { label: c } : c
}
</script>

<template>
  <table class="data-table">
    <thead>
      <tr>
        <th
          v-for="(c, i) in columns"
          :key="i"
          scope="col"
          v-bind="col(c).num ? { class: 'data-table__num' } : {}"
          >{{ col(c).label }}</th
        >
      </tr>
    </thead>
    <tbody><slot /></tbody>
  </table>
</template>
