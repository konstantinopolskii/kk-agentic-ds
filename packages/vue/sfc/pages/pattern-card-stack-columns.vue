<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/patterns/card-stack-columns.html,
   the frozen static oracle for patterns_check.mjs. Three static pricing
   cards on the columns grid. Raw <button> markup — KButton always stamps
   type="button", which this oracle's buttons do not carry. */
import { KCardStack, KCard, KCardHeading } from '@konstantinopolskii/vue'
</script>

<template>
  <KCardStack :columns="true">
    <KCard>
      <KCardHeading title="Free" subtitle="For getting started." />
      <button class="button t-subtitle">Pick free</button>
    </KCard>
    <KCard>
      <KCardHeading title="Pro" subtitle="For working teams." />
      <button class="button button--primary t-subtitle">Pick pro</button>
    </KCard>
    <KCard>
      <KCardHeading title="Team" subtitle="For shipping at scale." />
      <button class="button t-subtitle">Pick team</button>
    </KCard>
  </KCardStack>
</template>
