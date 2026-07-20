import { h } from 'vue'
import { KApp, KPanels, KCard, KMetric, KCardHeading, KSparkLabels, KSpecList } from '../../packages/vue/dist/index.js'

/* Vue twin of 02-forecast-module.html. KSpark is not used here: its
   style binding serializes as an object (`--v:42%;`) while the static
   page writes a literal `style="--v: 42%"` string — raw h() keeps the
   bars byte-identical. The reconnect button likewise stays raw: the
   static markup has no type attribute, but KButton always stamps one
   for as="button". */
const sparkValues = [42, 38, 46, 52, 58, 50, 34, 40, 70, 80, 90, 100]
const softCount = 8

export default {
  render() {
    return h(KApp, { view: 'panels' }, () => [
      h(KPanels, () => [
        h(KCard, { span: 'third' }, () => [
          h(KMetric, { value: '12 400', label: 'Sessions in June', delta: '↑ 8% vs May' }),
        ]),

        h(KCard, { span: 'third' }, () => [
          h(KMetric, { value: '386', label: 'Conversions in June', delta: '↑ 12% vs May' }),
        ]),

        h(KCard, { span: 'third' }, () => [
          h(KMetric, { value: '92%', label: 'Forecast confidence' }),
        ]),

        h(KCard, { span: 'full' }, () => [
          h(KCardHeading, {
            title: 'Monthly forecast',
            subtitle: 'Organic sessions, actuals against forecast',
            muted: true,
          }),
          h(KMetric, {
            value: '148 000',
            label: 'Forecast for December',
            delta: '↑ 12% vs last December',
          }),
          h(
            'div',
            {
              class: 'spark spark--panel',
              role: 'img',
              'aria-label':
                'Organic sessions by month. January 96 000, rising and dipping through summer, then climbing from September to a December forecast of 148 000.',
            },
            sparkValues.map((v, i) =>
              h('span', {
                class: i < softCount ? 'spark__bar spark__bar--soft' : 'spark__bar',
                style: `--v: ${v}%`,
              }),
            ),
          ),
          h(KSparkLabels, { labels: ['Jan', 'Jun', 'Dec'] }),
          h('p', { class: 't-micro t-muted' }, 'Jan 96 000 · Jun 118 000 · Dec 148 000 forecast'),
        ]),

        h(KCard, { span: 'half' }, () => [
          h(KCardHeading, {
            title: 'Search Console is disconnected',
            subtitle: 'The forecast runs on data last synced July 2. Reconnect to resume daily updates.',
          }),
          h('button', { class: 'button button--primary t-subtitle' }, 'Reconnect Search Console'),
        ]),

        h(KCard, { span: 'half' }, () => [
          h(KCardHeading, { title: 'How the forecast reads' }),
          h(KSpecList, {
            variant: 'plain',
            rows: [
              { key: 'Model', values: ['Seasonal fit on 24 months'] },
              { key: 'Updated', values: ['Daily at 06:00'] },
              { key: 'Confidence', values: ['92% on current pace'] },
            ],
          }),
        ]),
      ]),
    ])
  },
}
