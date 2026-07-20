<script setup lang="ts">
/* SFC twin of demos/reference-recreations/index.vue.js, itself the
   h() twin of the frozen static demos/reference-recreations/index.html.
   Same DOM: KApp(single) > KBook > five KBookSection articles, each a
   heading + KMedia rows (KMedia's markup matches the static
   <a class="media"> rows exactly). */
import { KApp, KBook, KBookSection, KMedia } from '@konstantinopolskii/vue'

interface LinkRow {
  href: string
  initials: string
  title: string
  meta: string
}

const productSurfaces: LinkRow[] = [
  { href: './01-rank-tracker-v2.html', initials: '01', title: 'Rank tracker', meta: 'Board shell: groups rail, keyword work list, analytics rail. Study 1, lab components.' },
  { href: './04-joi-onboarding.html', initials: '04', title: 'Onboarding steps', meta: 'Step counter, field rows, chip multi-select, pinned primary. Study 4.' },
  { href: './05-joi-settings.html', initials: '05', title: 'Settings list', meta: 'Shout upsell, switch rows, value rows. Study 5.' },
  { href: './07-flashcard.html', initials: '07', title: 'Flashcard', meta: 'One word on a shout card. Study 7.' },
  { href: './08-status-feed.html', initials: '08', title: 'Status feed', meta: 'Media rows, avatars, count tags, one primary. Study 8.' },
  { href: './09-create-transfer.html', initials: '09', title: 'Create a transfer', meta: 'One-card form: chips, file rows, fields, one commit. Study 9.' },
]

const profilesAndMedia: LinkRow[] = [
  { href: './03-identity-hero-v2.html', initials: '03', title: 'Identity hero', meta: 'Muted name, loud statement, role chips, metric row. Study 3.' },
  { href: './06-person-page.html', initials: '06', title: 'Person page', meta: 'Shout hero, metric row, filmography table. Study 6.' },
]

const landingsAndIndexes: LinkRow[] = [
  { href: './10-tzlvt-landing-v2.html', initials: '10', title: 'App landing', meta: 'One column, four proof sections, one shout. Study 10.' },
  { href: './11-community-page.html', initials: '11', title: 'Community page', meta: 'Roster prose, projects table, subscribe shout. Study 11.' },
  { href: './12-studio-index-v2.html', initials: '12', title: 'Studio index', meta: 'Hero word, two link cards, one screen. Study 12.' },
]

const commissioned: LinkRow[] = [
  { href: './13-blogpost.html', initials: '13', title: 'Blogpost, one column', meta: 'Article header, byline row, quote, figure, related rows, signoff.' },
  { href: './14-newsfront-v2.html', initials: '14', title: 'News front, multi column', meta: 'Lead story, latest rail, desk grid. The front shell.' },
]
</script>

<template>
  <KApp view="single">
    <KBook id="doc">
      <KBookSection>
        <h1 class="t-hero">Reference recreations</h1>
        <p class="t-body"
          >Eleven reference designs and two commissioned surfaces, rebuilt with kit classes. Each page answers one study from the
          <a href="../../doc.html?src=./references/registry.md">reference registry</a>: same structure, kit material. One exception to
          the zero-custom-CSS rule: the rank tracker runs on <span class="t-code">lab.css</span>, the experiment layer for components
          the canon does not carry yet.</p
        >
      </KBookSection>

      <KBookSection id="product-surfaces">
        <h2 class="t-display">Product surfaces</h2>
        <KMedia v-for="row in productSurfaces" :key="row.href" :href="row.href" :initials="row.initials" :title="row.title" :meta="row.meta" micro />
      </KBookSection>

      <KBookSection id="profiles-and-media">
        <h2 class="t-display">Profiles and media</h2>
        <KMedia v-for="row in profilesAndMedia" :key="row.href" :href="row.href" :initials="row.initials" :title="row.title" :meta="row.meta" micro />
      </KBookSection>

      <KBookSection id="landings-and-indexes">
        <h2 class="t-display">Landings and indexes</h2>
        <KMedia v-for="row in landingsAndIndexes" :key="row.href" :href="row.href" :initials="row.initials" :title="row.title" :meta="row.meta" micro />
      </KBookSection>

      <KBookSection id="commissioned">
        <h2 class="t-display">Commissioned surfaces</h2>
        <p class="t-body">No single reference parent. Composed from the common moves the registry names.</p>
        <KMedia v-for="row in commissioned" :key="row.href" :href="row.href" :initials="row.initials" :title="row.title" :meta="row.meta" micro />
      </KBookSection>
    </KBook>
  </KApp>
</template>
