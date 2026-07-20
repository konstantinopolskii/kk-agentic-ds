<script setup lang="ts">
/* Pagination — numeral row with prev/next chevrons and a single ink
   current page. Collapses runs of hidden pages to one gap when the
   page count outruns the window. Chevrons are CSS-drawn (empty edge
   buttons), never a font glyph. Presentational: emits `change` with
   the target page number; `update:current` mirrors it for v-model.
   The consumer owns the fetch and feeds `current` back. */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    pages: number
    current?: number
    window?: number
  }>(),
  { current: 1, window: 5 },
)

const emit = defineEmits<{
  change: [page: number]
  'update:current': [page: number]
}>()

type Item = number | 'gap'

function range(a: number, b: number): number[] {
  const out: number[] = []
  for (let i = a; i <= b; i++) out.push(i)
  return out
}

// Sequence of page numbers, with 'gap' markers where the window
// skips a run. First and last page are always present.
const pageItems = computed<Item[]>(() => {
  const pages = props.pages
  const current = props.current
  const win = Math.max(1, props.window)
  if (pages <= win + 2) return range(1, pages)

  const half = Math.floor(win / 2)
  let start = Math.max(2, current - half)
  const end = Math.min(pages - 1, start + win - 1)
  start = Math.max(2, end - win + 1)

  const items: Item[] = [1]
  if (start > 2) items.push('gap')
  for (let i = start; i <= end; i++) items.push(i)
  if (end < pages - 1) items.push('gap')
  items.push(pages)
  return items
})

function go(page: number) {
  emit('change', page)
  emit('update:current', page)
}
</script>

<template>
  <nav class="pagination" aria-label="Pagination">
    <button
      class="pagination__edge"
      data-dir="prev"
      aria-label="Previous page"
      type="button"
      :disabled="current <= 1"
      @click="current > 1 && go(current - 1)"
    />
    <template v-for="(item, idx) in pageItems" :key="idx">
      <span v-if="item === 'gap'" class="pagination__gap" aria-hidden="true">…</span>
      <button
        v-else
        class="pagination__page"
        type="button"
        :aria-current="item === current ? 'page' : undefined"
        @click="go(item)"
        >{{ item }}</button
      >
    </template>
    <button
      class="pagination__edge"
      data-dir="next"
      aria-label="Next page"
      type="button"
      :disabled="current >= pages"
      @click="current < pages && go(current + 1)"
    />
  </nav>
</template>
