<script setup lang="ts">
/* Card collapsible — the hidden body an interactive card reveals when
   active. Outer grid animates rows; inner holds the content. The slot
   wraps in .card__body, the kit's content-injection wrapper, so prose
   lands on the same text rail as the card's heading. flush drops the
   wrapper for children that manage their own bleed: fields, decks,
   comment lists. Markup contract is gated by tests/parity against the
   retired h() oracle. */
withDefaults(defineProps<{ flush?: boolean }>(), { flush: false })
</script>

<template>
  <div class="card__collapsible">
    <div class="card__collapsible-inner">
      <slot v-if="flush" />
      <div v-else class="card__body"><slot /></div>
    </div>
  </div>
</template>
