import { h } from 'vue'
import { KApp, KBook, KCard, KChipWrap, KChip } from '../../packages/vue/dist/index.js'

/* Vue twin of 04-joi-onboarding.html. Same DOM, kit components where
   they exist. book__section--stage has no component (raw h, same as
   the --fill precedent in 07-flashcard). The two primary buttons
   (Next / Continue with three habits) carry no type attribute in the
   static markup, unlike KButton's fixed output — raw h() there too.
   The two wake-up/wind-down fields use raw h('label', {innerHTML})
   instead of KField: the static markup self-closes its <input/>
   (XHTML-style) and Vue's server renderer never emits a self-close
   slash on void elements, so the only byte-identical route is an
   innerHTML string on the non-void label parent. */
export default {
  render() {
    return h(KApp, { view: 'single' }, () => [
      h(KBook, { id: 'doc' }, () => [
        h('article', { class: 'book__section book__section--stage' }, [
          h(KCard, () => [
            h('p', { class: 't-micro t-muted' }, 'Step 1 of 6'),
            h('div', { class: 'card__heading' }, [
              h('h2', { class: 't-display' }, 'Set your wake-up and wind-down hours'),
            ]),
            h('label', {
              class: 'field field--row',
              innerHTML:
                '<span class="t-caption--bold field__label">Wake up</span>' +
                '<input class="t-caption field__input" type="text" value="09:00" />',
            }),
            h('label', {
              class: 'field field--row',
              innerHTML:
                '<span class="t-caption--bold field__label">Wind down</span>' +
                '<input class="t-caption field__input" type="text" value="21:00" />',
            }),
            h('button', { class: 'button button--primary t-subtitle' }, 'Next'),
          ]),
        ]),
        h('article', { class: 'book__section book__section--stage' }, [
          h(KCard, () => [
            h('p', { class: 't-micro t-muted' }, 'Step 6 of 6'),
            h('div', { class: 'card__heading' }, [
              h('h2', { class: 't-display' }, 'Pick a few habits to kickstart your daily routine'),
            ]),
            h(KChipWrap, () => [
              h(KChip, { pressed: true }, () => 'Exercise'),
              h(KChip, { pressed: true }, () => 'Meditate'),
              h(KChip, { pressed: true }, () => 'Read books'),
              h(KChip, { pressed: false }, () => 'Plan a day'),
              h(KChip, { pressed: false }, () => 'Do yoga'),
              h(KChip, { pressed: false }, () => 'Write in journal'),
              h(KChip, { pressed: false }, () => 'Healthy breakfast'),
            ]),
            h('button', { class: 'button button--primary t-subtitle' }, 'Continue with three habits'),
          ]),
        ]),
      ]),
    ])
  },
}
