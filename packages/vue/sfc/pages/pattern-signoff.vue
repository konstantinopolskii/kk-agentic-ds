<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/patterns/signoff.html, the
   frozen static oracle for patterns_check.mjs. Raw markup throughout:
   KSignoff/KStat only support one line per stat block, but this oracle
   groups two bold-number lines inside each .stat wrapper. */
</script>

<template>
  <div class="book__signoff">
    <div class="book__signoff-stats">
      <div class="stat t-caption">
        <div><span class="t-caption--bold">9</span> components in the kit.</div>
        <div><span class="t-caption--bold">9</span> color tokens, and not one more.</div>
      </div>
      <div class="stat t-caption">
        <div><span class="t-caption--bold">12</span> spacing tokens on a 4px grid.</div>
        <div><span class="t-caption--bold">7</span> type sizes, three weights.</div>
      </div>
    </div>
    <div class="book__signoff-signature">
      <p class="t-caption">
        Signed by
        <span class="t-caption--bold">Konstantin Konstantinopolskii,<br /></span>
        founder at
        <span class="t-caption--bold">kk.consulting<br /></span>
        <span class="t-muted">23 April '26 at 17:30 Tbilisi Time.</span>
      </p>
      <img class="book__signoff-signature-img" :src="'../../../signature.svg'" alt="Handwritten signature of Konstantin Konstantinopolskii" />
    </div>
  </div>
</template>
