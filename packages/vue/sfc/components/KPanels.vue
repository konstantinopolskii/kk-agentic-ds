<script setup lang="ts">
/* Panels — the 12-column dashboard grid inside app--panels. Children
   span full width by default; cards take a span prop (third, half,
   two-thirds, full) to claim their columns. */
</script>

<template>
  <div class="panels">
    <slot />
  </div>
</template>
