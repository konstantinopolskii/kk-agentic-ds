<script setup lang="ts">
/* SFC twin of demos/reference-recreations/01-rank-tracker.vue.js, itself
   the h() twin of the frozen static demos/reference-recreations/
   01-rank-tracker.html. Same DOM, kit components where they exist.
   The sidebar nav-group here has no clickable head (just a bare ul of
   links) so it has no matching KNavGroup shape — raw markup for that
   one section. metric-row has no wrapper component either — raw div
   around two KMetric. */
import {
  KApp,
  KSidebar,
  KSidebarNav,
  KBook,
  KBookSection,
  KChipWrap,
  KChip,
  KDataTable,
  KDataCell,
  KInspector,
  KCard,
  KCardHeading,
  KMetric,
  KSpark,
  KSparkLabels,
  KSpecList,
} from '@konstantinopolskii/vue'

type Column = string | { label: string; num?: boolean }

interface KeywordRow {
  keyword: string
  position: number
  delta: string
  flat: boolean
  volume: string
  trend: string
  values: number[]
}

const columns: Column[] = [
  'Keyword',
  { label: 'Position', num: true },
  { label: 'Change', num: true },
  'Trend',
  { label: 'Volume', num: true },
]

const keywordRows: KeywordRow[] = [
  {
    keyword: 'design system audit',
    position: 3,
    delta: '↑ 2',
    flat: false,
    volume: '12 400',
    trend: 'rising',
    values: [40, 45, 50, 55, 60, 70, 80, 88],
  },
  {
    keyword: 'product strategy sprint',
    position: 7,
    delta: '↑ 1',
    flat: false,
    volume: '3 200',
    trend: 'rising',
    values: [48, 50, 52, 55, 58, 60, 63, 66],
  },
  {
    keyword: 'agentic pipeline',
    position: 11,
    delta: '0',
    flat: true,
    volume: '880',
    trend: 'steady',
    values: [45, 47, 44, 46, 47, 45, 46, 47],
  },
  {
    keyword: 'design consultancy pricing',
    position: 14,
    delta: '↓ 3',
    flat: false,
    volume: '1 900',
    trend: 'falling',
    values: [70, 66, 62, 58, 52, 46, 40, 35],
  },
  {
    keyword: 'ui kit for startups',
    position: 5,
    delta: '↑ 4',
    flat: false,
    volume: '2 700',
    trend: 'rising',
    values: [30, 36, 42, 50, 58, 66, 75, 85],
  },
  {
    keyword: 'brand identity workshop',
    position: 9,
    delta: '↑ 1',
    flat: false,
    volume: '1 500',
    trend: 'rising',
    values: [48, 49, 50, 52, 53, 55, 56, 58],
  },
  {
    keyword: 'hire a design consultant',
    position: 6,
    delta: '↓ 1',
    flat: false,
    volume: '4 100',
    trend: 'falling',
    values: [60, 59, 58, 57, 56, 55, 53, 50],
  },
  {
    keyword: 'token based design system',
    position: 2,
    delta: '↑ 3',
    flat: false,
    volume: '970',
    trend: 'rising',
    values: [55, 60, 66, 72, 78, 84, 90, 95],
  },
  {
    keyword: 'voice and tone guidelines',
    position: 16,
    delta: '↓ 2',
    flat: false,
    volume: '640',
    trend: 'falling',
    values: [50, 46, 42, 40, 37, 34, 31, 28],
  },
  {
    keyword: 'figma to code handoff',
    position: 8,
    delta: '0',
    flat: true,
    volume: '2 200',
    trend: 'steady',
    values: [50, 52, 49, 51, 50, 52, 51, 50],
  },
]

const detailSpark: number[] = [20, 24, 30, 34, 40, 45, 52, 58, 66, 74, 82, 90]

const introText = "Tracking kk.consulting's brand campaign, Jan 1 – Jul 17, 2026."
</script>

<template>
  <KApp view="doc">
    <KSidebar title="Rank tracker">
      <KSidebarNav id="toc" manual>
        <section class="nav-group">
          <ul class="nav-group__items">
            <li class="t-caption t-caption--bold"><a href="#" aria-current="page">Keywords</a></li>
            <li class="t-caption"><a href="#">Competitors</a></li>
            <li class="t-caption"><a href="#">Reports</a></li>
            <li class="t-caption"><a href="#">Settings</a></li>
          </ul>
        </section>
      </KSidebarNav>
    </KSidebar>

    <KBook id="doc">
      <KBookSection>
        <h1 class="t-hero">Keywords</h1>
        <p class="t-body">{{ introText }}</p>

        <KChipWrap>
          <KChip pressed>All keywords</KChip>
          <KChip>Winners</KChip>
          <KChip>Losers</KChip>
          <KChip>Starred</KChip>
        </KChipWrap>

        <KDataTable :columns="columns">
          <tr v-for="row in keywordRows" :key="row.keyword">
            <KDataCell lead>{{ row.keyword }}</KDataCell>
            <KDataCell num>{{ row.position }}</KDataCell>
            <KDataCell delta :flat="row.flat">{{ row.delta }}</KDataCell>
            <KDataCell><KSpark :values="row.values" :label="`Position, 8 weeks, ${row.trend}`" /></KDataCell>
            <KDataCell num>{{ row.volume }}</KDataCell>
          </tr>
        </KDataTable>
      </KBookSection>
    </KBook>

    <KInspector label="Keyword detail">
      <KCard>
        <KCardHeading title="design system audit" subtitle="Position history, 12 weeks" muted />
        <div class="metric-row">
          <KMetric value="3" label="Position" delta="↑ 2" />
          <KMetric value="12 400" label="Volume" />
        </div>
        <KSpark panel :values="detailSpark" label="Position, 12 weeks, rising" />
        <KSparkLabels :labels="['Week 1', 'Week 6', 'Week 12']" />
      </KCard>

      <KCard>
        <KSpecList
          variant="plain"
          :rows="[
            { key: 'Landing page', values: ['/kit'] },
            { key: 'First seen', values: ['Jan 3, 2026'] },
            { key: 'Best position', values: ['2'] },
          ]"
        />
      </KCard>
    </KInspector>
  </KApp>
</template>
