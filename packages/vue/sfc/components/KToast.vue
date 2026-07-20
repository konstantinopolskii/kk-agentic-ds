<script setup lang="ts">
/* Toast — one inverted status message. The kit's imperative
   toast() composable builds and animates these at runtime; this
   component renders a single static toast for snapshots and
   server-rendered markup. Inverted surface, an optional action
   button, always a dismiss ×. */
withDefaults(
  defineProps<{
    text: string
    action?: string
  }>(),
  { action: '' },
)
</script>

<template>
  <div class="toast" data-state="open" role="status">
    <span class="toast__text">{{ text }}</span>
    <button v-if="action" class="toast__action" type="button">{{ action }}</button>
    <button class="toast__close" type="button" aria-label="Dismiss">×</button>
  </div>
</template>
