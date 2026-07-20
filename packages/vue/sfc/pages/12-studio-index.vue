<script setup lang="ts">
/* SFC twin of demos/reference-recreations/12-studio-index.vue.js, itself the
   h() twin of the frozen static demos/reference-recreations/12-studio-index.html.
   Same DOM, kit components where they exist, raw markup for the bespoke
   shout-card heading (h1.t-hero + p.t-title, not the KCardHeading h3/caption
   shape) and the book__section--fill variant (no component prop for --fill). */
import { KApp, KBook, KBookSection, KCard, KCardHeading, KCardStack, KButton } from '@konstantinopolskii/vue'
</script>

<template>
  <KApp view="single">
    <KBook id="doc">
      <article class="book__section book__section--fill">
        <KCard variant="shout">
          <div class="card__heading">
            <h1 class="t-hero">Buckwheat</h1>
            <p class="t-title">Digging out of the mess, one grain at a time. A two-person studio that ships tools for money and work, then keeps them alive for a decade.</p>
          </div>
          <p class="t-micro t-subtle">Two people and a cat · 2014 to 2026 · both tools still shipping</p>
        </KCard>
      </article>
      <KBookSection id="deck">
        <KCardStack :columns="true">
          <KCard variant="link" href="10-tzlvt-landing.html">
            <KCardHeading title="Tzlvt" subtitle="Controls the budget in a plain calculator. One number a day. Ten years free." />
            <KButton as="span">Open Tzlvt</KButton>
          </KCard>
          <KCard variant="link" href="#">
            <KCardHeading title="Coin" subtitle="Career leverage with the market behind it, from 158 000 real cases. Paid." />
            <KButton as="span">Open Coin</KButton>
          </KCard>
        </KCardStack>
      </KBookSection>
    </KBook>
  </KApp>
</template>
