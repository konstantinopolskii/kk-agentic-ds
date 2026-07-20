import { h } from 'vue'
import { KApp, KBook, KBookSection, KCard, KCardHeading, KCardStack, KButton } from '../../packages/vue/dist/index.js'

/* Vue twin of 12-studio-index.html. Same DOM, kit components where
   they exist, raw h() for the bespoke shout-card heading (h1.t-hero +
   p.t-title, not the KCardHeading h3/caption shape) and the
   book__section--fill variant (no component prop for --fill). */
export default {
  render() {
    return h(KApp, { view: 'single' }, () => [
      h(KBook, { id: 'doc' }, () => [
        h('article', { class: 'book__section book__section--fill' }, [
          h(KCard, { variant: 'shout' }, () => [
            h('div', { class: 'card__heading' }, [
              h('h1', { class: 't-hero' }, 'Buckwheat'),
              h(
                'p',
                { class: 't-title' },
                'Digging out of the mess, one grain at a time. A two-person studio that ships tools for money and work, then keeps them alive for a decade.',
              ),
            ]),
            h(
              'p',
              { class: 't-micro t-subtle' },
              'Two people and a cat · 2014 to 2026 · both tools still shipping',
            ),
          ]),
        ]),
        h(KBookSection, { id: 'deck' }, () => [
          h(KCardStack, { columns: true }, () => [
            h(KCard, { variant: 'link', href: '10-tzlvt-landing.html' }, () => [
              h(KCardHeading, {
                title: 'Tzlvt',
                subtitle: 'Controls the budget in a plain calculator. One number a day. Ten years free.',
              }),
              h(KButton, { as: 'span' }, () => 'Open Tzlvt'),
            ]),
            h(KCard, { variant: 'link', href: '#' }, () => [
              h(KCardHeading, {
                title: 'Coin',
                subtitle: 'Career leverage with the market behind it, from 158 000 real cases. Paid.',
              }),
              h(KButton, { as: 'span' }, () => 'Open Coin'),
            ]),
          ]),
        ]),
      ]),
    ])
  },
}
