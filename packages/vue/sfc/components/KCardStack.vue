<script setup lang="ts">
/* Card stack — one active per stack. Structure only: promotion,
   glide, and collapse animation belong to useInspectorStack, which
   KInspector wires on mount against the same DOM this component
   emits (opt out via :behavior="false"). Markup contract is gated by
   tests/parity against the retired h() oracle. */
withDefaults(defineProps<{ columns?: boolean }>(), { columns: false })
</script>

<template>
  <div :class="columns ? 'card-stack card-stack--columns' : 'card-stack'"><slot /></div>
</template>
