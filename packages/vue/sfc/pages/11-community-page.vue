<script setup lang="ts">
/* SFC twin of demos/reference-recreations/11-community-page.vue.js, itself
   the h() twin of the frozen static demos/reference-recreations/11-community-page.html.
   Same DOM, kit components where they match exactly. The join button in
   the static markup has no type attribute (unlike KButton's default), so
   it stays raw markup. */
import { KApp, KBook, KBookSection, KCard, KCardHeading, KDataTable, KDataCell, KList } from '@konstantinopolskii/vue'

const thursdayItems = ['Name what works before what does not.', 'Critique the work, never the person.']

interface Project {
  lead: string
  members: string
  progress: string
  target: string
}

const columns: (string | { label: string; num?: boolean })[] = [
  'Project',
  'Members',
  { label: 'Progress', num: true },
  'Target',
]

const projects: Project[] = [
  { lead: 'A type specimen site', members: 'Sofia Marchetti, Yusuf Demir', progress: '80%', target: 'September' },
  { lead: 'An iOS habit app', members: 'Anke Voss, Rafael Souza, Priya Nair', progress: '45%', target: 'October' },
  { lead: 'A print zine', members: 'Tomas Novak', progress: '65%', target: 'August' },
  { lead: 'A weather widget kit', members: 'Elin Andersson, Marco Ferrari', progress: '30%', target: 'November' },
  {
    lead: 'A modular font family',
    members: 'Nadia Petrova, Julien Moreau, Hana Kobayashi',
    progress: '90%',
    target: 'September',
  },
]
</script>

<template>
  <KApp view="single">
    <KBook id="doc">
      <KBookSection>
        <h1 class="t-hero">Planetarium</h1>
        <p class="t-title">First month 1 €, then 9,50 € a month.</p>
        <p class="t-body">A working community for designers who ship a project a season, with structured feedback every Thursday.</p>
      </KBookSection>

      <KBookSection id="members">
        <h2 class="t-display">Members</h2>
        <p class="t-body"><a href="#">Sofia Marchetti</a>, <a href="#">Yusuf Demir</a>, <a href="#">Anke Voss</a>, <a href="#">Rafael Souza</a>, <a href="#">Priya Nair</a>, <a href="#">Tomas Novak</a>, <a href="#">Elin Andersson</a>, <a href="#">Marco Ferrari</a>, <a href="#">Nadia Petrova</a>, <a href="#">Julien Moreau</a>, <a href="#">Hana Kobayashi</a>, <a href="#">Liam O'Connor</a>, <a href="#">Greta Lindqvist</a>, <a href="#">Omar Farouk</a>, and 47 more.</p>
      </KBookSection>

      <KBookSection id="thursdays">
        <h2 class="t-display">How Thursdays work</h2>
        <p class="t-body">Online, 19:00, three slots of twenty minutes. Bring work in progress.</p>
        <KList :items="thursdayItems" />
      </KBookSection>

      <KBookSection id="projects">
        <h2 class="t-display">Active projects</h2>
        <KDataTable :columns="columns">
          <tr v-for="p in projects" :key="p.lead">
            <KDataCell lead>{{ p.lead }}</KDataCell>
            <KDataCell>{{ p.members }}</KDataCell>
            <KDataCell num>{{ p.progress }}</KDataCell>
            <KDataCell>{{ p.target }}</KDataCell>
          </tr>
        </KDataTable>
      </KBookSection>

      <KBookSection id="join">
        <KCard variant="shout">
          <KCardHeading
            title="Join the season"
            subtitle="Billing starts after the first month; leave any Thursday."
            muted
          />
          <button class="button button--primary t-subtitle">Join for the first month</button>
        </KCard>
        <p class="t-micro t-muted">Promo codes: <span class="t-code">FIRSTLIGHT</span> <span class="t-code">ORBIT25</span></p>
      </KBookSection>
    </KBook>
  </KApp>
</template>
