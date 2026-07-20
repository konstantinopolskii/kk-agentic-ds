<script setup lang="ts">
/* Tabs — underlined tab strip over stacked panels. One step of
   contrast: the selected tab goes full ink with a 2 px underline,
   the rest stay muted. Pass tab labels via `tabs`; author each
   panel's body in the matching `panel-0`, `panel-1`, … slot.
   modelValue is the selected index (v-model). useTabs adds the
   arrow-key/Home/End roving selection kit.js's initTabs() binds
   (js/kit.js 2402-2461); click selects locally, same as the oracle. */
import { ref, watch } from 'vue'
import { useTabs } from '../composables/useTabs'

interface Tab {
  label: string
}

const props = withDefaults(
  defineProps<{
    id: string
    tabs: Tab[]
    modelValue?: number
  }>(),
  { modelValue: 0 },
)

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const selected = ref(props.modelValue)
watch(
  () => props.modelValue,
  (v) => {
    selected.value = v
  },
)

function select(i: number) {
  selected.value = i
  emit('update:modelValue', i)
}

const listRef = ref<HTMLElement | null>(null)
const { onKeydown } = useTabs(listRef, select)
</script>

<template>
  <div class="tabs" data-tabs>
    <div ref="listRef" class="tabs__list" role="tablist" @keydown="onKeydown">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        :id="`${id}-t${i}`"
        class="tabs__tab"
        role="tab"
        :aria-controls="`${id}-p${i}`"
        :aria-selected="i === selected ? 'true' : 'false'"
        @click="select(i)"
        >{{ tab.label }}</button
      >
    </div>
    <div
      v-for="(_, i) in tabs"
      :key="i"
      :id="`${id}-p${i}`"
      class="tabs__panel"
      role="tabpanel"
      :aria-labelledby="`${id}-t${i}`"
      :hidden="i !== selected"
    >
      <slot :name="`panel-${i}`" />
    </div>
  </div>
</template>
