<script setup lang="ts">
/* SFC twin of demos/reference-recreations/08-status-feed.vue.js, itself the
   h() twin of the frozen static demos/reference-recreations/08-status-feed.html.
   Static main.book carries no id here (unlike the doc-shell pages), so the
   book element stays raw markup — KBook always stamps an id attribute and
   has no way to omit it. */
import { KApp, KBookSection, KCard, KCardHeading, KMedia, KButton } from '@konstantinopolskii/vue'
</script>

<template>
  <KApp view="single">
    <main class="book">
      <article class="book__section book__section--fill">
        <KCard variant="shout">
          <h2 class="t-display">Clique</h2>
          <p class="t-micro t-subtle">Four friends online right now</p>
        </KCard>
      </article>
      <KBookSection>
        <KCard>
          <KCardHeading title="Poke friends" />
          <KMedia title="Giana Rosser" meta="Last of Us" micro>
            <template #trail>
              <KButton caption>Poke</KButton>
            </template>
          </KMedia>
          <KMedia title="Daniil Starling" meta="Meeting till 15:00" micro>
            <template #trail>
              <KButton caption>Poke</KButton>
            </template>
          </KMedia>
          <KMedia title="Toki" meta="11 291 km away" micro>
            <template #trail>
              <KButton caption>Poke</KButton>
            </template>
          </KMedia>
          <KMedia title="Sam Mamedov" meta="Back in an hour" micro>
            <template #trail>
              <KButton caption>Poke</KButton>
            </template>
          </KMedia>
        </KCard>
      </KBookSection>
    </main>
  </KApp>
</template>
