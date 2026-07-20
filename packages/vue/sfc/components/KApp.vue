<script setup lang="ts">
/* App shell — the outermost frame. doc is the three-column reading
   shell (data-view drives narrow-viewport column swapping); single,
   panels, and front are the one-column product shells. behavior
   (default on) wires the column-reveal cascade and the narrow-view
   [data-view] toggle on mount — set :behavior="false" to opt out
   (e.g. a consumer driving its own reveal timing). */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useColumnReveal } from '../composables/useColumnReveal'
import { useNarrowView } from '../composables/useNarrowView'

const props = withDefaults(
  defineProps<{
    view?: 'doc' | 'single' | 'panels' | 'front'
    behavior?: boolean
  }>(),
  { view: 'doc', behavior: true },
)

const classes = computed(() => {
  switch (props.view) {
    case 'single':
      return 'app app--single'
    case 'panels':
      return 'app app--panels'
    case 'front':
      return 'app app--front'
    default:
      return 'app'
  }
})

const rootEl = ref<HTMLElement | null>(null)
let disposeColumnReveal: (() => void) | undefined
let disposeNarrowView: (() => void) | undefined

onMounted(() => {
  if (!props.behavior || !rootEl.value) return
  disposeColumnReveal = useColumnReveal(rootEl.value)
  disposeNarrowView = useNarrowView(rootEl.value)
})

onBeforeUnmount(() => {
  disposeColumnReveal?.()
  disposeNarrowView?.()
})
</script>

<template>
  <div ref="rootEl" :class="classes" :data-view="view === 'doc' ? 'doc' : undefined">
    <slot />
  </div>
</template>
