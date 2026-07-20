<script setup lang="ts">
/* SFC twin of demos/reference-recreations/10-tzlvt-landing-v2.vue.js, itself
   the h() twin of the frozen static demos/reference-recreations/10-tzlvt-landing-v2.html.
   Kit components where the emitted markup matches exactly; raw markup for
   bespoke variants with no component prop (book__section--fill,
   metric--poster) and for the two buttons, which the static page ships
   without a type attribute (KButton always stamps type="button", so it
   would diverge). */
import { KApp, KBook, KBookSection, KCard, KCardHeading, KCardStack, KFieldRow } from '@konstantinopolskii/vue'
</script>

<template>
  <KApp view="single">
    <KBook id="doc">
      <article class="book__section book__section--fill">
        <h1 class="t-hero">Money that lasts until payday</h1>
        <p class="t-title">Tzlvt divides what you have by the days until income. You get one number a day. Hold it and the month holds.</p>
        <KCard variant="shout">
          <div class="metric metric--poster">
            <p class="metric__value">631</p>
            <p class="metric__label">Today's budget, from 18 939 across 30 days</p>
          </div>
          <button class="button button--primary t-subtitle">Start the budget</button>
          <p class="t-micro t-subtle">4.7 from 1 000+ ratings · iOS, Android, and the browser</p>
        </KCard>
      </article>

      <KBookSection id="how">
        <h2 class="t-display">One number, recalculated as you live</h2>
        <KCardStack columns>
          <KCard>
            <KCardHeading title="The arithmetic" />
            <KFieldRow label="You have" value="18 939" />
            <KFieldRow label="Next income" value="Aug 1" />
            <KFieldRow label="Days left" value="30" />
            <KFieldRow label="Today" value="631" />
          </KCard>
          <KCard>
            <KCardHeading title="The day" />
            <KFieldRow label="Groceries" value="−340" />
            <KFieldRow label="Metro" value="−62" />
            <KFieldRow label="Coffee" value="−180" />
            <KFieldRow label="Tomorrow" value="633" />
          </KCard>
        </KCardStack>
        <ul class="t-list">
          <li>Overspend today and tomorrow's number shrinks.</li>
          <li>Save today and tomorrow's number grows.</li>
          <li>Log income and the day rate rises on the spot.</li>
        </ul>
      </KBookSection>

      <KBookSection id="free">
        <h2 class="t-display">Ten years free</h2>
        <p class="t-body">No ads and no subscriptions. The paid sibling pays the bills, so the budget stays free for the people who need the number most.</p>
        <p class="t-caption t-muted">Written about by Meduza, vc.ru, and Lifehacker.</p>
        <button class="button button--primary t-subtitle">Get the app</button>
      </KBookSection>
    </KBook>
  </KApp>
</template>
