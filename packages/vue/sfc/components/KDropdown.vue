<script setup lang="ts">
/* Dropdown — a menu-button popover. The trigger reuses the .button shape;
   the popover is a role="menu" list of .dropdown__item buttons. Pass plain
   strings or {label,value} objects via items, or author the rows in the
   default slot. Override the trigger through the trigger slot (receives
   { open, toggle }). Emits `select` with the chosen item. useDropdown adds
   the Escape-close, outside-click-close, and roving item focus kit.js
   binds at the document level (js/kit.js 2291-2386); toggle, select-close,
   focus-first-on-open, and refocus-trigger-on-select stay local, ported
   straight off the oracle's own open ref and kit.js's openDropdown/activate. */
import { nextTick, ref, watch } from 'vue'
import { useDropdown } from '../composables/useDropdown'

interface DropdownItem {
  label: string
  value?: unknown
}
type Item = string | DropdownItem

const props = withDefaults(
  defineProps<{
    label?: string
    items?: Item[]
  }>(),
  { label: 'Options', items: () => [] },
)

const emit = defineEmits<{ select: [item: Item] }>()

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

function toggle() {
  open.value = !open.value
}
function norm(it: Item): DropdownItem {
  return typeof it === 'string' ? { label: it, value: it } : it
}
function choose(it: Item) {
  emit('select', it)
  open.value = false
  nextTick(() => rootRef.value?.querySelector<HTMLElement>('.dropdown__trigger')?.focus())
}

watch(open, (is) => {
  if (!is) return
  // Focus lands after the DOM flips data-state to open; re-check open so a
  // close racing the same tick doesn't get its focus stolen back.
  nextTick(() => {
    if (open.value) rootRef.value?.querySelector<HTMLElement>('.dropdown__item')?.focus()
  })
})

useDropdown(
  () => open.value,
  () => {
    open.value = false
  },
  rootRef,
)
</script>

<template>
  <div ref="rootRef" class="dropdown" data-dropdown>
    <slot name="trigger" :open="open" :toggle="toggle">
      <button
        class="dropdown__trigger button t-subtitle"
        aria-haspopup="menu"
        :aria-expanded="open ? 'true' : 'false'"
        @click="toggle"
        >{{ label }}</button
      >
    </slot>
    <div class="dropdown__popover" role="menu" :data-state="open ? 'open' : 'closed'">
      <slot>
        <button
          v-for="(it, i) in items"
          :key="i"
          class="dropdown__item"
          role="menuitem"
          type="button"
          @click="choose(it)"
          >{{ norm(it).label }}</button
        >
      </slot>
    </div>
  </div>
</template>
