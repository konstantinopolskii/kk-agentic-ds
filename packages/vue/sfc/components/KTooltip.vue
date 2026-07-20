<script lang="ts">
// Module-scope counter — one id sequence shared across every tooltip
// instance, mirroring the oracle's module-level `uid`.
let uid = 0

// One bubble at a time, page-wide — mirrors kit.js's closeAll(except).
// The opening instance closes whichever instance is currently open.
let closeActive: (() => void) | null = null
</script>

<script setup lang="ts">
/* Tooltip — a one-line hint on an inline trigger. The bubble is an
   inverted (black) surface that sits above the trigger and never takes
   the pointer. `label` is the trigger content (a help badge, default
   "?"); `text` is the bubble copy. Author a richer trigger via the
   trigger slot. Hover, focus, and Escape flip the bubble's data-state
   here, in place of kit.js's document-delegated initTooltip()
   (kit.js 2478-2539). */
import { ref, onMounted, onBeforeUnmount } from 'vue'

withDefaults(
  defineProps<{
    text?: string
    label?: string
  }>(),
  { text: '', label: '?' },
)

const bubbleId = `tooltip-${(uid += 1)}-b`
const open = ref(false)
const rootEl = ref<HTMLElement | null>(null)

function hide() {
  open.value = false
  if (closeActive === hide) closeActive = null
}

function show() {
  if (closeActive && closeActive !== hide) closeActive()
  open.value = true
  closeActive = hide
}

function onFocusOut(e: FocusEvent) {
  const related = e.relatedTarget as Node | null
  if (related && rootEl.value?.contains(related)) return
  hide()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') hide()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  hide()
})
</script>

<template>
  <span
    ref="rootEl"
    class="tooltip"
    data-tooltip
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="onFocusOut"
  >
    <button class="tooltip__trigger" type="button" :aria-describedby="bubbleId">
      <slot name="trigger">{{ label }}</slot>
    </button>
    <span
      class="tooltip__bubble"
      role="tooltip"
      :id="bubbleId"
      :data-state="open ? 'open' : 'closed'"
      >{{ text }}</span
    >
  </span>
</template>
