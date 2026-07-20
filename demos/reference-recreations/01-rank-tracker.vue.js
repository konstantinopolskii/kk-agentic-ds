import { h } from 'vue'
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
  KSparkLabels,
  KSpecList,
} from '../../packages/vue/src/index.js'

/* Vue twin of 01-rank-tracker.html. Same DOM, kit components where
   they exist. The sidebar nav-group here has no clickable head (just
   a bare ul of links) so it has no matching KNavGroup shape — raw
   h() for that one section. metric-row has no wrapper component
   either — raw h() div around two KMetric. KSpark is not used: its
   style binding serializes as an object (`--v:40%;`) while the static
   page writes a literal `style="--v: 40%"` string — raw h() with a
   string style keeps the bars byte-identical (same fix as
   02-forecast-module). */
const sparkBars = (values) =>
  values.map((v) => h('span', { class: 'spark__bar', style: `--v: ${v}%` }))

const keywordRows = [
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

export default {
  render() {
    return h(KApp, { view: 'doc' }, () => [
      h(KSidebar, { title: 'Rank tracker' }, () => [
        h(KSidebarNav, { id: 'toc', manual: true }, () => [
          h('section', { class: 'nav-group' }, [
            h('ul', { class: 'nav-group__items' }, [
              h('li', { class: 't-caption t-caption--bold' }, [
                h('a', { href: '#', 'aria-current': 'page' }, 'Keywords'),
              ]),
              h('li', { class: 't-caption' }, [h('a', { href: '#' }, 'Competitors')]),
              h('li', { class: 't-caption' }, [h('a', { href: '#' }, 'Reports')]),
              h('li', { class: 't-caption' }, [h('a', { href: '#' }, 'Settings')]),
            ]),
          ]),
        ]),
      ]),

      h(KBook, { id: 'doc' }, () => [
        h(KBookSection, () => [
          h('h1', { class: 't-hero' }, 'Keywords'),
          h('p', {
            class: 't-body',
            innerHTML: "Tracking kk.consulting's brand campaign, Jan 1 – Jul 17, 2026.",
          }),

          h(KChipWrap, () => [
            h(KChip, { pressed: true }, () => 'All keywords'),
            h(KChip, () => 'Winners'),
            h(KChip, () => 'Losers'),
            h(KChip, () => 'Starred'),
          ]),

          h(
            KDataTable,
            {
              columns: [
                'Keyword',
                { label: 'Position', num: true },
                { label: 'Change', num: true },
                'Trend',
                { label: 'Volume', num: true },
              ],
            },
            () =>
              keywordRows.map((row) =>
                h('tr', [
                  h(KDataCell, { lead: true }, () => row.keyword),
                  h(KDataCell, { num: true }, () => String(row.position)),
                  h(KDataCell, { delta: true, flat: row.flat }, () => row.delta),
                  h(KDataCell, () => [
                    h(
                      'span',
                      {
                        class: 'spark',
                        role: 'img',
                        'aria-label': `Position, 8 weeks, ${row.trend}`,
                      },
                      sparkBars(row.values),
                    ),
                  ]),
                  h(KDataCell, { num: true }, () => row.volume),
                ]),
              ),
          ),
        ]),
      ]),

      h(KInspector, { label: 'Keyword detail' }, () => [
        h(KCard, () => [
          h(KCardHeading, {
            title: 'design system audit',
            subtitle: 'Position history, 12 weeks',
            muted: true,
          }),
          h('div', { class: 'metric-row' }, [
            h(KMetric, { value: '3', label: 'Position', delta: '↑ 2' }),
            h(KMetric, { value: '12 400', label: 'Volume' }),
          ]),
          h(
            'div',
            {
              class: 'spark spark--panel',
              role: 'img',
              'aria-label': 'Position, 12 weeks, rising',
            },
            sparkBars([20, 24, 30, 34, 40, 45, 52, 58, 66, 74, 82, 90]),
          ),
          h(KSparkLabels, { labels: ['Week 1', 'Week 6', 'Week 12'] }),
        ]),

        h(KCard, () => [
          h(KSpecList, {
            variant: 'plain',
            rows: [
              { key: 'Landing page', values: ['/kit'] },
              { key: 'First seen', values: ['Jan 3, 2026'] },
              { key: 'Best position', values: ['2'] },
            ],
          }),
        ]),
      ]),
    ])
  },
}
