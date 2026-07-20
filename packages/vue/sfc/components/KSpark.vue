<script setup lang="ts">
/* Spark — canonical: bar heights are data (--v percent per bar), the
   chart is monochrome ink, the label states the trend in words.
   Inline sparks render as <span>, panel scale as <div>. `soft` lists
   bar indices demoted to the 20% hairline tone (secondary series).
   `emphasize` inverts the spend: one index keeps full ink, every
   other bar demotes — the canon default for panel sparks, where the
   history is context and the current period is the message. */
const props = withDefaults(
  defineProps<{
    values: number[]
    label: string
    panel?: boolean
    soft?: number[]
    emphasize?: number | null
  }>(),
  { panel: false, soft: () => [], emphasize: null },
)

function isSoft(i: number): boolean {
  return props.emphasize !== null ? i !== props.emphasize : props.soft!.includes(i)
}
</script>

<template>
  <component
    :is="panel ? 'div' : 'span'"
    :class="panel ? 'spark spark--panel' : 'spark'"
    role="img"
    :aria-label="label"
    ><span
      v-for="(v, i) in values"
      :key="i"
      :class="isSoft(i) ? 'spark__bar spark__bar--soft' : 'spark__bar'"
      :style="{ '--v': `${v}%` }"
  /></component>
</template>
