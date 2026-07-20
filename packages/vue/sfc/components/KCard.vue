<script setup lang="ts">
/* Card — every widget is one. Five variants share one shape: static
   (default), interactive (sticky active/minimized), link (anchor,
   whole surface navigates), shout (inverted, one per column),
   heading (inspector group header, never lights up).
   Placement modifiers are canon too: span puts the card on the
   panels grid, lead makes it the front-page lead story. Markup
   contract is gated by tests/parity against the retired h() oracle. */
withDefaults(
  defineProps<{
    variant?: 'static' | 'interactive' | 'link' | 'shout' | 'heading'
    href?: string
    tight?: boolean
    selectable?: boolean
    state?: 'active' | 'minimized' | null
    span?: 'third' | 'half' | 'two-thirds' | 'full' | null
    lead?: boolean
  }>(),
  {
    variant: 'static',
    href: '',
    tight: false,
    selectable: false,
    state: null,
    span: null,
    lead: false,
  },
)

const variantClass: Record<string, string> = {
  static: '',
  interactive: ' card--interactive',
  link: ' card--link',
  shout: ' card--shout',
  heading: ' card--heading',
}
</script>

<template>
  <component
    :is="variant === 'link' ? 'a' : variant === 'heading' ? 'header' : 'div'"
    :class="
      'card' +
      variantClass[variant] +
      (selectable ? ' card--selectable' : '') +
      (tight ? ' card--tight' : '') +
      (span ? ` panel--${span}` : '') +
      (lead ? ' front__lead' : '')
    "
    :href="variant === 'link' ? href : undefined"
    :data-state="variant === 'interactive' && state ? state : undefined"
    ><slot
  /></component>
</template>
