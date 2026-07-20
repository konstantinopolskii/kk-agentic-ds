<script setup lang="ts">
/* Sidebar nav — scroll-spy navigation with the TOC indicator. By
   default the shell ships empty and useScrollSpy auto-fills it from
   the book's heading rank on mount (kit.js's KK.init() equivalent).
   manual opts out of the auto-fill and preserves hand-curated
   KNavGroup children — same as kit.js, this only skips the DOM
   rebuild (useScrollSpy's own buildSidebarToc guards on the rendered
   data-nav="manual" attribute); the indicator + IntersectionObserver
   spy still track whichever links the nav ends up with, hand-authored
   or generated, since both use the same #hash-anchor convention. */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useScrollSpy } from '../composables/useScrollSpy'

withDefaults(
  defineProps<{
    id?: string
    manual?: boolean
  }>(),
  { id: 'toc', manual: false },
)

const rootEl = ref<HTMLElement | null>(null)
let dispose: (() => void) | undefined

onMounted(() => {
  if (!rootEl.value) return
  const book = (document.querySelector('.book') as HTMLElement | null) ?? document.getElementById('doc')
  if (!book) return
  dispose = useScrollSpy(book, rootEl.value)
})

onBeforeUnmount(() => dispose?.())
</script>

<template>
  <nav ref="rootEl" class="sidebar__nav" :id="id" :data-nav="manual ? 'manual' : undefined">
    <span class="toc__indicator" aria-hidden="true"></span>
    <slot />
  </nav>
</template>
