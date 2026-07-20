import { h } from 'vue'
import { KChip, KChipWrap, KCard, KMetric, KFieldRow, KSparkLabels } from '../../packages/vue/src/index.js'

/* Vue twin of 01-rank-tracker-v2.html. Board shell has no KApp view
   (app--board / data-view="board" is bespoke), so the outer shell and
   every lab.css dashboard class (rail, rail--groups, rail--detail,
   group-card, cols-groups, cols-kw, stat, stat-pair, pill, chart,
   scale, spark-labels container aside) render as raw h(). Sparks and
   any inline --v/flex-grow/color style render as literal style
   strings, never style objects — Vue's SSR renderer stringifies style
   objects as "key:value;" (no space, trailing semicolon) which does
   not char-match the static markup's "key: value" (space, no
   semicolon), so KSpark (style object internally) is not used here.
   Same reasoning kills KTag (static uses "tag t-micro", not
   tag/tag--bold) and KButton on "Review suggestions" (static button
   carries bare class="button", no t-subtitle). KField is skipped for
   the Annotate row: its input class order is "t-caption field__input",
   static has "field__input t-caption". KChip/KChipWrap, KCard(tight),
   KMetric, KFieldRow, KSparkLabels match exactly and are used. */

const stat = (value, delta, flat) =>
  h('span', { class: 'stat' }, [
    h('span', { class: 'stat__v' }, value),
    ...(delta === undefined ? [] : [h('span', { class: flat ? 'stat__d stat__d--flat' : 'stat__d' }, delta)]),
  ])

const statLabel = (value, label) =>
  h('span', { class: 'stat' }, [
    h('span', { class: 'stat__v' }, value),
    h('span', { class: 'stat__d stat__d--label' }, label),
  ])

const sparkBars = (values) =>
  values.map((v) => h('span', { class: 'spark__bar', style: `--v: ${v}%` }))

const spark = (label, values) =>
  h('span', { class: 'spark', role: 'img', 'aria-label': label }, sparkBars(values))

const groupCard = (active, title, note, noteBold, stats) =>
  h('div', { class: 'group-card', ...(active ? { 'data-state': 'active' } : {}) }, [
    h('p', { class: 'group-card__title t-caption t-caption--bold' }, title),
    h('p', { class: noteBold ? 'group-card__note t-micro t-caption--bold' : 'group-card__note t-micro t-muted' }, note),
    h('div', { class: 'cols-groups' }, stats.map((s) => stat(...s))),
  ])

const kwTitle = (text, tags) =>
  h('p', { class: 'kw__title' }, [
    h('span', { class: 't-caption t-caption--bold' }, text),
    ...tags.map((t) => h('span', { class: 'tag t-micro' }, t)),
  ])

const kwRow = (title, tags, serp, vol, volDelta, sparkLabel, sparkValues, rank, pill, pillQuiet, kd, kdLabel) =>
  h('div', { class: 'kw' }, [
    kwTitle(title, tags),
    h('div', { class: 'cols-kw' }, [
      h('span', { class: 'stat' }, [h('span', { class: 'stat__v' }, serp)]),
      h('span', { class: 'stat-pair' }, [stat(vol, volDelta), spark(sparkLabel, sparkValues)]),
      h('span', { class: 'stat-pair' }, [
        h('span', { class: 'stat__v' }, rank),
        h('span', { class: pillQuiet ? 'pill pill--quiet' : 'pill' }, pill),
      ]),
      statLabel(kd, kdLabel),
    ]),
  ])

const groups = [
  [true, 'All keywords', 'Cannibalization · Missing pages · Low relevance', true, [
    ['269'], ['56%'], ['146.2K', '↓ 19%'], ['0.7%', '↑ 1%'], ['8.4K'],
  ]],
  [false, 'Brand', 'Brand keywords', false, [
    ['2'], ['2.1%'], ['6.6K', '↓ 19%'], ['100%', '–', true], ['23K'],
  ]],
  [false, 'First page', 'Low relevance', true, [
    ['4'], ['45%'], ['260', '↓ 19%'], ['35%', '↑ 2%'], ['23K'],
  ]],
  [false, 'Second page', 'Test · Second launch', false, [
    ['8'], ['71%'], ['4.2K', '↓ 19%'], ['19%', '↑ 1.7%'], ['23K'],
  ]],
  [false, 'Main keywords', 'Cannibalization', true, [
    ['87'], ['55%'], ['54.4K', '–', true], ['1.9%', '–', true], ['23K'],
  ]],
  [false, 'Working set', 'Ideas to test', false, [
    ['14'], ['12%'], ['9.8K', '↑ 6%'], ['0.2%', '–', true], ['1.1K'],
  ]],
]

const kws = [
  ['design system audit', ['Kit', 'Second launch', '+23'], '100%', '720', '↑ 83%', 'Search volume, steady', [52, 58, 55, 60, 57, 63, 61, 66], '~13', '↑ 6', false, '150', 'Easy'],
  ['budget app for couples', ['Seasonal'], '44%', '1.6K', '↑ 26%', 'Search volume, steady', [48, 52, 50, 55, 53, 58, 60, 64], '~16', '↑ 5', false, '219', 'Easy'],
  ['agentic pipeline', ['Test'], '70%', '18.1K', '↓ 45%', 'Search volume, falling', [70, 66, 60, 55, 48, 42, 38, 33], '~99', '–', true, '1.6K', 'Hard'],
  ['token based design system', ['Seasonal', 'Test'], '70%', '2.9K', '↓ 19%', 'Search volume, falling', [60, 57, 54, 50, 47, 45, 43, 40], '~99', '–', true, '433', 'Doable'],
  ['ui kit for startups', [], '100%', '1.9K', '↑ 81%', 'Search volume, seasonal', [30, 55, 38, 62, 42, 70, 48, 78], '~99', '–', true, '393', 'Hard'],
  ['voice and tone guidelines', ['Test'], '70%', '1.9K', '↑ 82%', 'Search volume, rising', [35, 40, 46, 51, 57, 62, 68, 74], '~32', '↓ 4', false, '256', 'Hard'],
  ['figma to code handoff', ['Second launch'], '55%', '3.4K', '↑ 12%', 'Search volume, steady', [50, 53, 51, 55, 53, 57, 55, 59], '~21', '↑ 2', false, '512', 'Doable'],
  ['design consultancy pricing', ['Ideas'], '62%', '940', '↓ 8%', 'Search volume, falling', [58, 55, 53, 50, 48, 46, 44, 42], '~34', '↓ 3', false, '188', 'Easy'],
  ['product strategy sprint', ['Test'], '81%', '2.2K', '↑ 9%', 'Search volume, steady', [52, 54, 53, 56, 54, 57, 56, 58], '~44', '–', true, '305', 'Doable'],
  ['hire a design consultant', [], '48%', '4.1K', '↓ 6%', 'Search volume, steady', [55, 54, 52, 53, 51, 52, 50, 49], '~7', '↓ 1', false, '96', 'Easy'],
]

export default {
  render() {
    return h('div', { class: 'app app--board', 'data-view': 'board' }, [
      h('header', { class: 'board__bar' }, [
        h('div', { class: 'board__brand' }, [
          h('span', { class: 'board__logo', 'aria-hidden': 'true' }, [
            h(
              'svg',
              {
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '2.5',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
              },
              [h('polyline', { points: '3 17 9 11 13 14.5 21 6' })],
            ),
          ]),
          h('div', [
            h('p', { class: 't-micro t-muted' }, 'kk.consulting · EN'),
            h('p', { class: 't-title' }, 'Rank tracker'),
          ]),
        ]),
        h('div', { class: 'board__controls' }, [
          h(KChipWrap, () => [
            h(KChip, { pressed: true }, () => 'Strategy'),
            h(KChip, { pressed: false }, () => 'Analysis'),
            h(KChip, { pressed: false }, () => 'Competition'),
          ]),
          h(KChipWrap, () => [
            h(KChip, { pressed: false }, () => 'Mobile'),
            h(KChip, { pressed: true }, () => 'Desktop'),
          ]),
          h('p', { class: 't-caption' }, 'Jun 8 – Jul 8, 2026'),
        ]),
      ]),

      h('aside', { class: 'rail rail--groups', 'aria-label': 'Keyword groups' }, [
        h('div', { class: 'rail__head' }, [
          h('h2', { class: 't-subtitle' }, 'Groups'),
          h('p', { class: 't-micro t-muted' }, '6 tracked'),
        ]),
        h('div', { class: 'legend cols-groups', 'aria-hidden': 'true' }, [
          h('span', 'Kw.'), h('span', 'Clicks'), h('span', 'Volume'), h('span', 'Visib.'), h('span', 'Traffic'),
        ]),
        ...groups.map((g) => groupCard(...g)),
      ]),

      h('main', { class: 'rail', 'aria-label': 'Keyword list' }, [
        h('div', { class: 'rail__head' }, [
          h('h1', { class: 't-subtitle' }, 'All keywords'),
          h('p', { class: 't-micro t-muted' }, '432 tracked · sorted by rank trend'),
        ]),
        h('div', { class: 'legend cols-kw', 'aria-hidden': 'true' }, [
          h('span', 'SERP'), h('span', 'Volume'), h('span', 'Rank'), h('span', 'Opportunity'),
        ]),
        ...kws.map((k) => kwRow(...k)),
      ]),

      h('aside', { class: 'rail rail--detail', 'aria-label': 'Group detail' }, [
        h('div', { class: 'rail__head' }, [
          h('h2', { class: 't-subtitle' }, 'All keywords'),
          h('p', { class: 't-micro t-caption--bold' }, '3 critical issues'),
        ]),

        h(KCard, { tight: true }, () => [
          h('div', { class: 'card__toprow' }, [
            h('h3', { class: 't-caption t-caption--bold' }, 'Visibility'),
            h('p', { class: 't-micro t-muted' }, '30 days'),
          ]),
          h('div', { class: 'metric-row' }, [
            h(KMetric, { value: '0.7%', label: 'Desktop', delta: '↑ 1%' }),
            h(KMetric, { value: '0.5%', label: 'Mobile', delta: '↓ 0.7%' }),
          ]),
          h('div', { class: 'chart' }, [
            h('div', { class: 'chart__y', 'aria-hidden': 'true' }, [
              h('span', '3%'), h('span', '2%'), h('span', '1%'), h('span', '0%'),
            ]),
            h(
              'div',
              {
                class: 'chart__plot',
                role: 'img',
                'aria-label': 'Visibility, 30 days: desktop climbs to 0.7 percent, mobile eases to 0.5',
              },
              [
                h('svg', { viewBox: '0 0 320 132', preserveAspectRatio: 'none', fill: 'none' }, [
                  h('line', { x1: '0', y1: '0.5', x2: '320', y2: '0.5', stroke: 'rgba(0,0,0,0.1)', 'vector-effect': 'non-scaling-stroke' }),
                  h('line', { x1: '0', y1: '44', x2: '320', y2: '44', stroke: 'rgba(0,0,0,0.1)', 'vector-effect': 'non-scaling-stroke' }),
                  h('line', { x1: '0', y1: '88', x2: '320', y2: '88', stroke: 'rgba(0,0,0,0.1)', 'vector-effect': 'non-scaling-stroke' }),
                  h('line', { x1: '0', y1: '131.5', x2: '320', y2: '131.5', stroke: 'rgba(0,0,0,0.2)', 'vector-effect': 'non-scaling-stroke' }),
                  h('polyline', {
                    points: '0,110 20,96 40,90 60,102 80,108 100,104 120,98 140,100 160,94 180,98 200,92 220,96 240,90 260,94 280,92 300,88 320,90',
                    stroke: 'currentColor',
                    'stroke-width': '1.5',
                    'vector-effect': 'non-scaling-stroke',
                    style: 'color: #000',
                  }),
                  h('polyline', {
                    points: '0,114 20,112 40,104 60,110 80,116 100,112 120,108 140,112 160,106 180,110 200,108 220,112 240,106 260,110 280,108 300,112 320,110',
                    stroke: 'rgba(0,0,0,0.2)',
                    'stroke-width': '1.5',
                    'vector-effect': 'non-scaling-stroke',
                  }),
                ]),
              ],
            ),
          ]),
          h(KSparkLabels, { labels: ['Jun 8', 'Jun 15', 'Jun 22', 'Jun 29', 'Jul 8'] }),
          h('label', { class: 'field' }, [
            h('span', { class: 't-caption--bold field__label' }, 'Annotate'),
            h('input', { class: 'field__input t-caption', type: 'text', placeholder: 'Note what moved this range' }),
          ]),
        ]),

        h(KCard, { tight: true }, () => [
          h('div', { class: 'card__toprow' }, [
            h('h3', { class: 't-caption t-caption--bold' }, 'Search demand'),
            h('p', { class: 't-micro t-muted' }, 'Monthly'),
          ]),
          h('div', { class: 'card__toprow' }, [
            h(KMetric, { value: '146.2K', label: 'Searches a month', delta: '↑ 7% YoY' }),
            h(
              'span',
              { class: 'spark', style: 'width: 128px; height: 40px;', role: 'img', 'aria-label': 'Search demand, 12 months, rising' },
              sparkBars([44, 40, 48, 45, 52, 49, 56, 53, 60, 58, 66, 74]),
            ),
          ]),
          h(KFieldRow, { label: 'Desktop', value: '36% · 52.6K' }),
          h(KFieldRow, { label: 'Mobile', value: '64% · 93.8K' }),
        ]),

        h('div', { class: 'rail-duo' }, [
          h(KCard, { tight: true }, () => [
            h('h3', { class: 't-caption t-caption--bold' }, 'SERP'),
            h(KMetric, { value: '51%', label: 'Organic clicks' }),
          ]),
          h(KCard, { tight: true }, () => [
            h('h3', { class: 't-caption t-caption--bold' }, 'Opportunity'),
            h(KMetric, { value: '233K', label: 'Sessions to gain' }),
            h(
              'div',
              { class: 'scale', role: 'img', 'aria-label': 'Opportunity by difficulty: 133 thousand hard, 67 thousand doable, 33 thousand easy' },
              [
                h('span', { class: 'scale__a', style: 'flex-grow: 4;' }),
                h('span', { class: 'scale__b', style: 'flex-grow: 2;' }),
                h('span', { class: 'scale__c', style: 'flex-grow: 1;' }),
              ],
            ),
            h('p', { class: 't-micro t-muted' }, 'Hard 133K · Doable 67K · Easy 33K'),
          ]),
        ]),

        h(KCard, { tight: true }, () => [
          h('div', { class: 'card__toprow' }, [
            h('h3', { class: 't-caption t-caption--bold' }, 'Suggestions'),
            h('p', { class: 't-micro t-muted' }, 'Refreshed daily'),
          ]),
          h('div', { class: 'metric-row' }, [
            h(KMetric, { value: '121K', label: 'Sessions in reach' }),
            h(KMetric, { value: '78', label: 'Keywords impacted' }),
          ]),
          h('button', { class: 'button', type: 'button' }, 'Review suggestions'),
        ]),
      ]),
    ])
  },
}
