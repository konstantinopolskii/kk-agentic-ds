<script setup lang="ts">
/* Inspector — the right column. Actions, comments, pointer groups.
   Runs useInspectorStack on mount so one interactive card is active
   at a time, scoped to this element (js/kit.js's card-stack module,
   js/kit.js 548-638). */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useInspectorStack } from '../composables/useInspectorStack'

withDefaults(defineProps<{ label?: string }>(), { label: 'Actions and comments' })

const rootEl = ref<HTMLElement | null>(null)
let dispose: (() => void) | undefined

onMounted(() => {
  if (!rootEl.value) return
  dispose = useInspectorStack(rootEl.value)
})

onBeforeUnmount(() => dispose?.())
</script>

<template>
  <aside ref="rootEl" class="inspector" :aria-label="label">
    <slot />
  </aside>
</template>
