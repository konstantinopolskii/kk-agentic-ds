import { h } from 'vue'
import { KApp, KBook, KBookSection, KMedia, KMetric, KQuote, KCard, KCardHeading } from '../../packages/vue/src/index.js'

/* Vue twin of 03-identity-hero.html. Same DOM: kit components where
   markup matches exactly, raw h() for metric-row (no wrapper component)
   and the one metric with a rich delta (nested span, KMetric's delta
   prop is string-only), and the plain button in the Now card (static
   omits type="button", KButton always stamps it). */
export default {
  render() {
    return h(KApp, { view: 'single' }, () => [
      h(KBook, { id: 'doc' }, () => [
        h(KBookSection, () => [
          h(KMedia, {
            title: 'Kostia Konstantinopolskii',
            meta: 'kk.consulting, Amsterdam, since 2012',
            initials: 'KK',
          }),
          h(
            'p',
            { class: 't-title' },
            'Growth expert. 30K MAU app owner. $1M+ B2B cases. 18 mentees holding $700K ARR. Two cats.',
          ),
        ]),

        h(KBookSection, { id: 'founder' }, () => [
          h('h1', { class: 't-hero' }, 'Founder'),
          h(
            'p',
            { class: 't-title' },
            'Scaling a self-built budgeting app from 30K users toward 1M. Fully self-funded.',
          ),
          h('div', { class: 'metric-row' }, [
            h('div', { class: 'metric' }, [
              h('p', { class: 'metric__value' }, '30K'),
              h('p', { class: 'metric__label' }, 'Users monthly'),
              h('p', { class: 'metric__delta' }, ['↑ 100% ', h('span', { class: 't-muted' }, 'organic')]),
            ]),
            h(KMetric, { value: '5K', label: 'Users daily' }),
            h(KMetric, { value: '4.7', label: 'From 1 000+ reviews' }),
          ]),
          h('p', { class: 't-caption t-muted' }, 'Top-12 budget apps, featured by T-Bank.'),
        ]),

        h(KBookSection, { id: 'strategist' }, () => [
          h('h2', { class: 't-display' }, 'Strategist'),
          h(
            'p',
            { class: 't-title' },
            'Growth strategy for B2B products that already work and want to grow up.',
          ),
          h('div', { class: 'metric-row' }, [
            h(KMetric, { value: '$1M+', label: 'Case value delivered' }),
            h(KMetric, { value: '14', label: 'Years in product' }),
            h(KMetric, { value: '9', label: 'Ventures built' }),
          ]),
          h(
            'p',
            { class: 't-caption t-muted' },
            'Strategy sprints, growth audits, and the numbers to defend both.',
          ),
        ]),

        h(KBookSection, { id: 'mentor' }, () => [
          h('h2', { class: 't-display' }, 'Mentor'),
          h(
            'p',
            { class: 't-title' },
            'Founders through the jump from first revenue to a business that holds.',
          ),
          h('div', { class: 'metric-row' }, [
            h(KMetric, { value: '18', label: 'Mentees today' }),
            h(KMetric, { value: '$700K', label: 'Their combined ARR' }),
          ]),
          h(KQuote, { cite: 'Priya Nandakumar, mentee, fintech founder' }, () =>
            ' Kostia rebuilt our onboarding funnel in six weeks. Conversion went from 2.1% to 6.4%, and we closed the round that same quarter. ',
          ),
        ]),

        h(KBookSection, { id: 'now' }, () => [
          h('h2', { class: 't-display' }, 'Now'),
          h(
            'p',
            { class: 't-body' },
            'Current work is design systems for agent pipelines: kit vocabulary an agent reads instead of inventing parts on every job. The kit ships 19 components on 7 foundations; two consulting clients run it inside their agent builds today.',
          ),
          h(KCard, () => [
            h(KCardHeading, {
              title: 'Working sessions',
              subtitle: '90 minutes, one decision made before you leave.',
            }),
            h('button', { class: 'button button--primary t-subtitle' }, 'Book a working session'),
          ]),
          h(
            'p',
            { class: 't-micro t-muted' },
            'Amsterdam · kk.consulting · the cats stay in every reference.',
          ),
        ]),
      ]),
    ])
  },
}
