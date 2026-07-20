<script setup lang="ts">
/* SFC twin of demos/reference-recreations/01-rank-tracker-v2.vue.js,
   itself the h() twin of the frozen static demos/reference-recreations/
   01-rank-tracker-v2.html. Board shell has no KApp view (app--board /
   data-view="board" is bespoke), so the outer shell and every lab.css
   dashboard class (rail, rail--groups, rail--detail, group-card,
   cols-groups, cols-kw, stat, stat-pair, pill, chart, scale,
   spark-labels container aside) render as raw markup. Sparks use
   KSpark (the gate normalizes style whitespace now, so its style-object
   "--v" serialization matches the static's literal string). The demand
   spark carries an explicit width/height — passed as a plain `style`
   attr on <KSpark>, which Vue falls through onto the component's root
   element same as any non-prop attr. KTag and KButton stay raw: KTag
   has no variant that adds "t-micro" (static wants "tag t-micro"),
   and KButton's default class always appends "t-subtitle" (static
   button carries bare class="button") — both are real token
   differences, not serialization. KField is skipped for the Annotate
   row too: its `:value="modelValue"` always renders a `value` attr
   (empty or not); the static input has no value attr at all, only
   placeholder — presence-vs-absence of an attribute is not normalized
   by the gate. KChip/KChipWrap, KCard(tight), KMetric, KFieldRow,
   KSparkLabels match exactly and are used. */
import { KChip, KChipWrap, KCard, KMetric, KSpark, KFieldRow, KSparkLabels } from '@konstantinopolskii/vue'

interface StatDatum {
  value: string
  delta?: string
  flat?: boolean
}

interface GroupCard {
  active: boolean
  title: string
  note: string
  noteBold: boolean
  stats: StatDatum[]
}

interface KwRow {
  title: string
  tags: string[]
  serp: string
  vol: string
  volDelta: string
  sparkLabel: string
  sparkValues: number[]
  rank: string
  pill: string
  pillQuiet: boolean
  kd: string
  kdLabel: string
}

const groups: GroupCard[] = [
  {
    active: true,
    title: 'All keywords',
    note: 'Cannibalization · Missing pages · Low relevance',
    noteBold: true,
    stats: [
      { value: '269' },
      { value: '56%' },
      { value: '146.2K', delta: '↓ 19%' },
      { value: '0.7%', delta: '↑ 1%' },
      { value: '8.4K' },
    ],
  },
  {
    active: false,
    title: 'Brand',
    note: 'Brand keywords',
    noteBold: false,
    stats: [
      { value: '2' },
      { value: '2.1%' },
      { value: '6.6K', delta: '↓ 19%' },
      { value: '100%', delta: '–', flat: true },
      { value: '23K' },
    ],
  },
  {
    active: false,
    title: 'First page',
    note: 'Low relevance',
    noteBold: true,
    stats: [
      { value: '4' },
      { value: '45%' },
      { value: '260', delta: '↓ 19%' },
      { value: '35%', delta: '↑ 2%' },
      { value: '23K' },
    ],
  },
  {
    active: false,
    title: 'Second page',
    note: 'Test · Second launch',
    noteBold: false,
    stats: [
      { value: '8' },
      { value: '71%' },
      { value: '4.2K', delta: '↓ 19%' },
      { value: '19%', delta: '↑ 1.7%' },
      { value: '23K' },
    ],
  },
  {
    active: false,
    title: 'Main keywords',
    note: 'Cannibalization',
    noteBold: true,
    stats: [
      { value: '87' },
      { value: '55%' },
      { value: '54.4K', delta: '–', flat: true },
      { value: '1.9%', delta: '–', flat: true },
      { value: '23K' },
    ],
  },
  {
    active: false,
    title: 'Working set',
    note: 'Ideas to test',
    noteBold: false,
    stats: [
      { value: '14' },
      { value: '12%' },
      { value: '9.8K', delta: '↑ 6%' },
      { value: '0.2%', delta: '–', flat: true },
      { value: '1.1K' },
    ],
  },
]

const kws: KwRow[] = [
  {
    title: 'design system audit',
    tags: ['Kit', 'Second launch', '+23'],
    serp: '100%',
    vol: '720',
    volDelta: '↑ 83%',
    sparkLabel: 'Search volume, steady',
    sparkValues: [52, 58, 55, 60, 57, 63, 61, 66],
    rank: '~13',
    pill: '↑ 6',
    pillQuiet: false,
    kd: '150',
    kdLabel: 'Easy',
  },
  {
    title: 'budget app for couples',
    tags: ['Seasonal'],
    serp: '44%',
    vol: '1.6K',
    volDelta: '↑ 26%',
    sparkLabel: 'Search volume, steady',
    sparkValues: [48, 52, 50, 55, 53, 58, 60, 64],
    rank: '~16',
    pill: '↑ 5',
    pillQuiet: false,
    kd: '219',
    kdLabel: 'Easy',
  },
  {
    title: 'agentic pipeline',
    tags: ['Test'],
    serp: '70%',
    vol: '18.1K',
    volDelta: '↓ 45%',
    sparkLabel: 'Search volume, falling',
    sparkValues: [70, 66, 60, 55, 48, 42, 38, 33],
    rank: '~99',
    pill: '–',
    pillQuiet: true,
    kd: '1.6K',
    kdLabel: 'Hard',
  },
  {
    title: 'token based design system',
    tags: ['Seasonal', 'Test'],
    serp: '70%',
    vol: '2.9K',
    volDelta: '↓ 19%',
    sparkLabel: 'Search volume, falling',
    sparkValues: [60, 57, 54, 50, 47, 45, 43, 40],
    rank: '~99',
    pill: '–',
    pillQuiet: true,
    kd: '433',
    kdLabel: 'Doable',
  },
  {
    title: 'ui kit for startups',
    tags: [],
    serp: '100%',
    vol: '1.9K',
    volDelta: '↑ 81%',
    sparkLabel: 'Search volume, seasonal',
    sparkValues: [30, 55, 38, 62, 42, 70, 48, 78],
    rank: '~99',
    pill: '–',
    pillQuiet: true,
    kd: '393',
    kdLabel: 'Hard',
  },
  {
    title: 'voice and tone guidelines',
    tags: ['Test'],
    serp: '70%',
    vol: '1.9K',
    volDelta: '↑ 82%',
    sparkLabel: 'Search volume, rising',
    sparkValues: [35, 40, 46, 51, 57, 62, 68, 74],
    rank: '~32',
    pill: '↓ 4',
    pillQuiet: false,
    kd: '256',
    kdLabel: 'Hard',
  },
  {
    title: 'figma to code handoff',
    tags: ['Second launch'],
    serp: '55%',
    vol: '3.4K',
    volDelta: '↑ 12%',
    sparkLabel: 'Search volume, steady',
    sparkValues: [50, 53, 51, 55, 53, 57, 55, 59],
    rank: '~21',
    pill: '↑ 2',
    pillQuiet: false,
    kd: '512',
    kdLabel: 'Doable',
  },
  {
    title: 'design consultancy pricing',
    tags: ['Ideas'],
    serp: '62%',
    vol: '940',
    volDelta: '↓ 8%',
    sparkLabel: 'Search volume, falling',
    sparkValues: [58, 55, 53, 50, 48, 46, 44, 42],
    rank: '~34',
    pill: '↓ 3',
    pillQuiet: false,
    kd: '188',
    kdLabel: 'Easy',
  },
  {
    title: 'product strategy sprint',
    tags: ['Test'],
    serp: '81%',
    vol: '2.2K',
    volDelta: '↑ 9%',
    sparkLabel: 'Search volume, steady',
    sparkValues: [52, 54, 53, 56, 54, 57, 56, 58],
    rank: '~44',
    pill: '–',
    pillQuiet: true,
    kd: '305',
    kdLabel: 'Doable',
  },
  {
    title: 'hire a design consultant',
    tags: [],
    serp: '48%',
    vol: '4.1K',
    volDelta: '↓ 6%',
    sparkLabel: 'Search volume, steady',
    sparkValues: [55, 54, 52, 53, 51, 52, 50, 49],
    rank: '~7',
    pill: '↓ 1',
    pillQuiet: false,
    kd: '96',
    kdLabel: 'Easy',
  },
]

const demandSpark: number[] = [44, 40, 48, 45, 52, 49, 56, 53, 60, 58, 66, 74]
</script>

<template>
  <div class="app app--board" data-view="board">
    <header class="board__bar">
      <div class="board__brand">
        <span class="board__logo" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 17 9 11 13 14.5 21 6"></polyline>
          </svg>
        </span>
        <div>
          <p class="t-micro t-muted">kk.consulting · EN</p>
          <p class="t-title">Rank tracker</p>
        </div>
      </div>
      <div class="board__controls">
        <KChipWrap>
          <KChip pressed>Strategy</KChip>
          <KChip :pressed="false">Analysis</KChip>
          <KChip :pressed="false">Competition</KChip>
        </KChipWrap>
        <KChipWrap>
          <KChip :pressed="false">Mobile</KChip>
          <KChip pressed>Desktop</KChip>
        </KChipWrap>
        <p class="t-caption">Jun 8 – Jul 8, 2026</p>
      </div>
    </header>

    <aside class="rail rail--groups" aria-label="Keyword groups">
      <div class="rail__head">
        <h2 class="t-subtitle">Groups</h2>
        <p class="t-micro t-muted">6 tracked</p>
      </div>
      <div class="legend cols-groups" aria-hidden="true">
        <span>Kw.</span><span>Clicks</span><span>Volume</span><span>Visib.</span><span>Traffic</span>
      </div>

      <div v-for="(g, gi) in groups" :key="gi" class="group-card" :data-state="g.active ? 'active' : undefined">
        <p class="group-card__title t-caption t-caption--bold">{{ g.title }}</p>
        <p :class="g.noteBold ? 'group-card__note t-micro t-caption--bold' : 'group-card__note t-micro t-muted'">{{ g.note }}</p>
        <div class="cols-groups">
          <span v-for="(s, si) in g.stats" :key="si" class="stat"
            ><span class="stat__v">{{ s.value }}</span
            ><span v-if="s.delta !== undefined" :class="s.flat ? 'stat__d stat__d--flat' : 'stat__d'">{{ s.delta }}</span
          ></span>
        </div>
      </div>
    </aside>

    <main class="rail" aria-label="Keyword list">
      <div class="rail__head">
        <h1 class="t-subtitle">All keywords</h1>
        <p class="t-micro t-muted">432 tracked · sorted by rank trend</p>
      </div>
      <div class="legend cols-kw" aria-hidden="true">
        <span>SERP</span><span>Volume</span><span>Rank</span><span>Opportunity</span>
      </div>

      <div v-for="(k, ki) in kws" :key="ki" class="kw">
        <p class="kw__title"
          ><span class="t-caption t-caption--bold">{{ k.title }}</span
          ><span v-for="(t, ti) in k.tags" :key="ti" class="tag t-micro">{{ t }}</span
        ></p>
        <div class="cols-kw">
          <span class="stat"><span class="stat__v">{{ k.serp }}</span></span>
          <span class="stat-pair">
            <span class="stat"><span class="stat__v">{{ k.vol }}</span><span class="stat__d">{{ k.volDelta }}</span></span>
            <KSpark :values="k.sparkValues" :label="k.sparkLabel" />
          </span>
          <span class="stat-pair">
            <span class="stat__v">{{ k.rank }}</span><span :class="k.pillQuiet ? 'pill pill--quiet' : 'pill'">{{ k.pill }}</span>
          </span>
          <span class="stat"><span class="stat__v">{{ k.kd }}</span><span class="stat__d stat__d--label">{{ k.kdLabel }}</span></span>
        </div>
      </div>
    </main>

    <aside class="rail rail--detail" aria-label="Group detail">
      <div class="rail__head">
        <h2 class="t-subtitle">All keywords</h2>
        <p class="t-micro t-caption--bold">3 critical issues</p>
      </div>

      <KCard :tight="true">
        <div class="card__toprow">
          <h3 class="t-caption t-caption--bold">Visibility</h3>
          <p class="t-micro t-muted">30 days</p>
        </div>
        <div class="metric-row">
          <KMetric value="0.7%" label="Desktop" delta="↑ 1%" />
          <KMetric value="0.5%" label="Mobile" delta="↓ 0.7%" />
        </div>
        <div class="chart">
          <div class="chart__y" aria-hidden="true">
            <span>3%</span><span>2%</span><span>1%</span><span>0%</span>
          </div>
          <div class="chart__plot" role="img" aria-label="Visibility, 30 days: desktop climbs to 0.7 percent, mobile eases to 0.5">
            <svg viewBox="0 0 320 132" preserveAspectRatio="none" fill="none">
              <line x1="0" y1="0.5" x2="320" y2="0.5" stroke="rgba(0,0,0,0.1)" vector-effect="non-scaling-stroke"></line>
              <line x1="0" y1="44" x2="320" y2="44" stroke="rgba(0,0,0,0.1)" vector-effect="non-scaling-stroke"></line>
              <line x1="0" y1="88" x2="320" y2="88" stroke="rgba(0,0,0,0.1)" vector-effect="non-scaling-stroke"></line>
              <line x1="0" y1="131.5" x2="320" y2="131.5" stroke="rgba(0,0,0,0.2)" vector-effect="non-scaling-stroke"></line>
              <polyline
                points="0,110 20,96 40,90 60,102 80,108 100,104 120,98 140,100 160,94 180,98 200,92 220,96 240,90 260,94 280,92 300,88 320,90"
                stroke="currentColor"
                stroke-width="1.5"
                vector-effect="non-scaling-stroke"
                style="color: #000"
              ></polyline>
              <polyline
                points="0,114 20,112 40,104 60,110 80,116 100,112 120,108 140,112 160,106 180,110 200,108 220,112 240,106 260,110 280,108 300,112 320,110"
                stroke="rgba(0,0,0,0.2)"
                stroke-width="1.5"
                vector-effect="non-scaling-stroke"
              ></polyline>
            </svg>
          </div>
        </div>
        <KSparkLabels :labels="['Jun 8', 'Jun 15', 'Jun 22', 'Jun 29', 'Jul 8']" />
        <label class="field">
          <span class="t-caption--bold field__label">Annotate</span>
          <input class="field__input t-caption" type="text" placeholder="Note what moved this range" />
        </label>
      </KCard>

      <KCard :tight="true">
        <div class="card__toprow">
          <h3 class="t-caption t-caption--bold">Search demand</h3>
          <p class="t-micro t-muted">Monthly</p>
        </div>
        <div class="card__toprow">
          <KMetric value="146.2K" label="Searches a month" delta="↑ 7% YoY" />
          <KSpark style="width: 128px; height: 40px" :values="demandSpark" label="Search demand, 12 months, rising" />
        </div>
        <KFieldRow label="Desktop" value="36% · 52.6K" />
        <KFieldRow label="Mobile" value="64% · 93.8K" />
      </KCard>

      <div class="rail-duo">
        <KCard :tight="true">
          <h3 class="t-caption t-caption--bold">SERP</h3>
          <KMetric value="51%" label="Organic clicks" />
        </KCard>
        <KCard :tight="true">
          <h3 class="t-caption t-caption--bold">Opportunity</h3>
          <KMetric value="233K" label="Sessions to gain" />
          <div class="scale" role="img" aria-label="Opportunity by difficulty: 133 thousand hard, 67 thousand doable, 33 thousand easy">
            <span class="scale__a" style="flex-grow: 4"></span>
            <span class="scale__b" style="flex-grow: 2"></span>
            <span class="scale__c" style="flex-grow: 1"></span>
          </div>
          <p class="t-micro t-muted">Hard 133K · Doable 67K · Easy 33K</p>
        </KCard>
      </div>

      <KCard :tight="true">
        <div class="card__toprow">
          <h3 class="t-caption t-caption--bold">Suggestions</h3>
          <p class="t-micro t-muted">Refreshed daily</p>
        </div>
        <div class="metric-row">
          <KMetric value="121K" label="Sessions in reach" />
          <KMetric value="78" label="Keywords impacted" />
        </div>
        <button class="button" type="button">Review suggestions</button>
      </KCard>
    </aside>
  </div>
</template>
