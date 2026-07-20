<script setup lang="ts">
/* SFC twin of demos/reference-recreations/04-joi-onboarding.vue.js, itself
   the h() twin of the frozen static
   demos/reference-recreations/04-joi-onboarding.html. Same DOM, kit
   components where they exist. book__section--stage has no component
   (raw markup, same as the --fill precedent in 07-flashcard). The two
   primary buttons (Next / Continue with three habits) carry no type
   attribute in the static markup, unlike KButton's fixed output — raw
   <button> there too. */
import { KApp, KBook, KCard, KChipWrap, KChip, KField } from '@konstantinopolskii/vue'
</script>

<template>
  <KApp view="single">
    <KBook id="doc">
      <article class="book__section book__section--stage">
        <KCard>
          <p class="t-micro t-muted">Step 1 of 6</p>
          <div class="card__heading">
            <h2 class="t-display">Set your wake-up and wind-down hours</h2>
          </div>
          <KField row label="Wake up" modelValue="09:00" />
          <KField row label="Wind down" modelValue="21:00" />
          <button class="button button--primary t-subtitle">Next</button>
        </KCard>
      </article>
      <article class="book__section book__section--stage">
        <KCard>
          <p class="t-micro t-muted">Step 6 of 6</p>
          <div class="card__heading">
            <h2 class="t-display">Pick a few habits to kickstart your daily routine</h2>
          </div>
          <KChipWrap>
            <KChip :pressed="true">Exercise</KChip>
            <KChip :pressed="true">Meditate</KChip>
            <KChip :pressed="true">Read books</KChip>
            <KChip :pressed="false">Plan a day</KChip>
            <KChip :pressed="false">Do yoga</KChip>
            <KChip :pressed="false">Write in journal</KChip>
            <KChip :pressed="false">Healthy breakfast</KChip>
          </KChipWrap>
          <button class="button button--primary t-subtitle">Continue with three habits</button>
        </KCard>
      </article>
    </KBook>
  </KApp>
</template>
