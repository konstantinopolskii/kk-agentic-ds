<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/patterns/spec-list.html, the
   frozen static oracle for patterns_check.mjs. First two cards wrap
   dt/dd keys and values in inline t-code spans — KSpecList's row.key
   and row.values are plain-text only, so those two dl's are raw
   markup. Third card's keys and values are plain text, so it maps
   straight onto KSpecList variant="triple". */
import { KCard, KCardHeading, KSpecList } from '@konstantinopolskii/vue'

const weightRows = [
  { key: 'Regular', values: ['reads too thin at 400', 'Regular sits on 500.'] },
  { key: 'Medium', values: ['subtitle under display', '500, paired with bold 700 headline.'] },
  { key: 'Bold', values: ['headings, labels', '700, one step up from the 500 body.'] },
]
</script>

<template>
  <KCard>
    <dl class="book__spec">
      <div class="book__spec-row">
        <dt class="book__spec-key"><span class="t-code">--ease-out</span></dt>
        <dd class="book__spec-value">Hover, focus, state flips.</dd>
      </div>
      <div class="book__spec-row">
        <dt class="book__spec-key"><span class="t-code">--ease-spring</span></dt>
        <dd class="book__spec-value">Switch thumbs, small confirmations.</dd>
      </div>
      <div class="book__spec-row">
        <dt class="book__spec-key"><span class="t-code">--ease-swing</span></dt>
        <dd class="book__spec-value">Long reveals, column arrivals.</dd>
      </div>
    </dl>
  </KCard>

  <KCard>
    <KCardHeading title="Scale" />
    <dl class="book__spec book__spec--value">
      <div class="book__spec-row">
        <dt class="book__spec-key"><span class="t-code">--space-4</span></dt>
        <dd class="book__spec-value"><span class="t-code">16px</span></dd>
        <dd class="book__spec-value">row to row.</dd>
      </div>
      <div class="book__spec-row">
        <dt class="book__spec-key"><span class="t-code">--space-6</span></dt>
        <dd class="book__spec-value"><span class="t-code">24px</span></dd>
        <dd class="book__spec-value">card gaps, text rail.</dd>
      </div>
      <div class="book__spec-row">
        <dt class="book__spec-key"><span class="t-code">--space-8</span></dt>
        <dd class="book__spec-value"><span class="t-code">32px</span></dd>
        <dd class="book__spec-value">section to section.</dd>
      </div>
    </dl>
  </KCard>

  <KCard>
    <KCardHeading title="Weight rules" />
    <KSpecList variant="triple" :rows="weightRows" />
  </KCard>
</template>
