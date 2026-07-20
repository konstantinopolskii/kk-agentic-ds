import { h } from 'vue'
import {
  KApp,
  KBook,
  KBookSection,
  KCard,
  KCardHeading,
  KCardStack,
  KFieldRow,
} from '../../packages/vue/src/index.js'

/* Vue twin of 10-tzlvt-landing-v2.html. Kit components where the emitted
   markup matches exactly; raw h() for bespoke variants with no component
   prop (book__section--fill, metric--poster) and for the two buttons,
   which the static page ships without a type attribute (KButton always
   stamps type="button", so it would diverge). */
export default {
  render() {
    return h(KApp, { view: 'single' }, () => [
      h(KBook, { id: 'doc' }, () => [
        h('article', { class: 'book__section book__section--fill' }, [
          h('h1', { class: 't-hero' }, 'Money that lasts until payday'),
          h(
            'p',
            { class: 't-title' },
            "Tzlvt divides what you have by the days until income. You get one number a day. Hold it and the month holds.",
          ),
          h(KCard, { variant: 'shout' }, () => [
            h('div', { class: 'metric metric--poster' }, [
              h('p', { class: 'metric__value' }, '631'),
              h('p', {
                class: 'metric__label',
                innerHTML: "Today's budget, from 18 939 across 30 days",
              }),
            ]),
            h('button', { class: 'button button--primary t-subtitle' }, 'Start the budget'),
            h(
              'p',
              { class: 't-micro t-subtle' },
              '4.7 from 1 000+ ratings · iOS, Android, and the browser',
            ),
          ]),
        ]),

        h(KBookSection, { id: 'how' }, () => [
          h('h2', { class: 't-display' }, 'One number, recalculated as you live'),
          h(KCardStack, { columns: true }, () => [
            h(KCard, {}, () => [
              h(KCardHeading, { title: 'The arithmetic' }),
              h(KFieldRow, { label: 'You have', value: '18 939' }),
              h(KFieldRow, { label: 'Next income', value: 'Aug 1' }),
              h(KFieldRow, { label: 'Days left', value: '30' }),
              h(KFieldRow, { label: 'Today', value: '631' }),
            ]),
            h(KCard, {}, () => [
              h(KCardHeading, { title: 'The day' }),
              h(KFieldRow, { label: 'Groceries', value: '−340' }),
              h(KFieldRow, { label: 'Metro', value: '−62' }),
              h(KFieldRow, { label: 'Coffee', value: '−180' }),
              h(KFieldRow, { label: 'Tomorrow', value: '633' }),
            ]),
          ]),
          h('ul', { class: 't-list' }, [
            h('li', { innerHTML: "Overspend today and tomorrow's number shrinks." }),
            h('li', { innerHTML: "Save today and tomorrow's number grows." }),
            h('li', {}, 'Log income and the day rate rises on the spot.'),
          ]),
        ]),

        h(KBookSection, { id: 'free' }, () => [
          h('h2', { class: 't-display' }, 'Ten years free'),
          h(
            'p',
            { class: 't-body' },
            'No ads and no subscriptions. The paid sibling pays the bills, so the budget stays free for the people who need the number most.',
          ),
          h('p', { class: 't-caption t-muted' }, 'Written about by Meduza, vc.ru, and Lifehacker.'),
          h('button', { class: 'button button--primary t-subtitle' }, 'Get the app'),
        ]),
      ]),
    ])
  },
}
