<script setup lang="ts">
/* Button — canonical: <button class="button t-subtitle">, primary adds
   button--primary. Inside a link card the same shape renders as a
   <span> labeling the destination (as="span"). Inside an interactive
   card, cta stamps data-cta for the state buttons. caption drops the
   label to caption bold for the media-trail form. Markup contract is
   gated by tests/parity against the retired h() oracle. */
withDefaults(
  defineProps<{
    primary?: boolean
    as?: 'button' | 'span'
    type?: string
    cta?: 'minimized' | 'active' | null
    caption?: boolean
  }>(),
  { primary: false, as: 'button', type: 'button', cta: null, caption: false },
)
</script>

<template>
  <component
    :is="as"
    :class="'button' + (primary ? ' button--primary' : '') + (caption ? ' t-caption--bold' : ' t-subtitle')"
    :type="as === 'button' ? type : undefined"
    :data-cta="cta ?? undefined"
    ><slot
  /></component>
</template>
