import { h } from 'vue'
import { KApp, KBook, KCard, KCardHeading, KChipWrap, KChip, KMedia } from '../../packages/vue/src/index.js'

/* Vue twin of 09-create-transfer.html. Same DOM, kit components where
   their emitted markup matches exactly; raw h() for bespoke bits:
   - book__section--fill has no component (same precedent as 07-flashcard)
   - the two text inputs (Email, Title and message) use raw h('label',
     {innerHTML}) instead of KField: the static markup self-closes its
     <input/> (XHTML-style) and Vue's server renderer never emits a
     self-close slash on void elements, so the only byte-identical
     route is an innerHTML string on the non-void label parent (same
     precedent as the Wake up/Wind down fields in 04-joi-onboarding)
   - the two field--row rows (Expires in, Downloads) reverse the value
     span's class order to `field__value t-caption`, unlike KFieldRow's
     fixed `t-caption field__value` — raw h() to keep the exact order
   - the Transfer button carries no type attribute, unlike KButton's
     fixed stamped type (same precedent as the Next/Continue buttons
     in 04-joi-onboarding) */
export default {
  render() {
    return h(KApp, { view: 'single' }, () => [
      h(KBook, { id: 'doc' }, () => [
        h('article', { class: 'book__section book__section--fill' }, [
          h(KCard, () => [
            h(KCardHeading, { title: 'Create a transfer' }),

            h(KChipWrap, () => [
              h(KChip, { pressed: true }, () => 'Get a link'),
              h(KChip, { pressed: false }, () => 'Send as email'),
            ]),

            h(KMedia, { title: 'Upload files', meta: 'Up to 3 GB on the free plan', micro: true, initials: '+' }),

            h('label', {
              class: 'field',
              innerHTML: '<input class="t-caption field__input" type="text" placeholder="Email" />',
            }),

            h('label', {
              class: 'field',
              innerHTML: '<input class="t-caption field__input" type="text" placeholder="Title and message" />',
            }),

            h('div', { class: 'field field--row' }, [
              h('span', { class: 't-caption--bold field__label' }, 'Expires in'),
              h('span', { class: 'field__value t-caption' }, '3 days'),
            ]),

            h('div', { class: 'field field--row' }, [
              h('span', { class: 't-caption--bold field__label' }, 'Downloads'),
              h('span', { class: 'field__value t-caption' }, 'Up to 50'),
            ]),

            h('button', { class: 'button t-subtitle' }, 'Transfer'),
          ]),
        ]),
      ]),
    ])
  },
}
