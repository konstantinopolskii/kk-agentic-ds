<script setup lang="ts">
/* Card body — the kit's content-injection wrapper. Half-inset puts
   children on the 24 px text rail; flex column with the space-4 gap.
   KCardCollapsible wraps its slot in one automatically; reach for it
   directly when a static card groups injected prose. Markup contract
   is gated by tests/parity against the retired h() oracle. */
</script>

<template>
  <div class="card__body"><slot /></div>
</template>
