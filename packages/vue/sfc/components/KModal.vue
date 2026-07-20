<script setup lang="ts">
/* Modal — centered dialog over a scrim. One surface: heading (ink title
   plus optional muted subtitle), body (default slot), foot (action
   buttons via the foot slot). data-state/aria-hidden are the styling
   API; useModal flips them 1:1 with KK.openModal/KK.closeModal
   (js/kit.js 2157-2277): focus trap, focus restore, body scroll lock,
   Escape + scrim + [data-modal-close] close. Teleport stays disabled
   until mounted so SSR renders in place (parity holds against the
   closed-state oracle) while the client portal to <body> escapes any
   transformed ancestor (docs/integration/modal.md). */
import { computed, onMounted, ref } from 'vue'
import { useModal } from '../composables/useModal'

const props = withDefaults(
  defineProps<{
    id: string
    title?: string
    subtitle?: string
    modelValue?: boolean
  }>(),
  { title: '', subtitle: '', modelValue: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const titleId = computed(() => props.id + '-t')

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

const dialogRef = ref<HTMLElement | null>(null)
const { onRootClick } = useModal(
  () => props.modelValue,
  (value) => emit('update:modelValue', value),
  dialogRef,
)
</script>

<template>
  <Teleport to="body" :disabled="!mounted">
    <div
      :id="id"
      class="modal"
      :data-state="modelValue ? 'open' : 'closed'"
      :aria-hidden="modelValue ? 'false' : 'true'"
      @click="onRootClick"
    >
      <div class="modal__scrim" data-modal-close></div>
      <div
        ref="dialogRef"
        class="modal__dialog"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
      >
        <button class="modal__close" data-modal-close aria-label="Close">×</button>
        <div class="modal__heading">
          <h3 class="t-title" :id="titleId">{{ title }}</h3>
          <p v-if="subtitle" class="t-caption t-muted">{{ subtitle }}</p>
        </div>
        <div class="modal__body"><slot /></div>
        <div v-if="$slots.foot" class="modal__foot"><slot name="foot" /></div>
      </div>
    </div>
  </Teleport>
</template>
