import { h } from 'vue'
import { KApp, KBook, KBookSection, KCard, KCardHeading, KTag } from '../../packages/vue/src/index.js'

/* Vue twin of 05-joi-settings.html. Same DOM, kit components where
   their emitted markup matches exactly; raw h() for bespoke bits:
   - media row here has no figure element at all (KMedia always emits one)
   - the Upgrade button has no type attribute (KButton always stamps one)
   - the Subscription value is a tag, not KFieldRow's plain value span
   - Preferences rows pair label with a muted caption, not KFieldRow's
     field__value class
   - the Display-name input and the three switch inputs are self-closed
     (`/>`) in the static twin; Vue's SSR renderer never emits a
     self-closing slash for void elements, so those four rows are
     reproduced with `innerHTML` (verbatim string, byte-identical to the
     static markup) instead of nested h() children */
export default {
  render() {
    return h(KApp, { view: 'single' }, () => [
      h(KBook, { id: 'doc' }, () => [
        h(KBookSection, () => [
          h('h2', { class: 't-display' }, 'Settings'),

          h(KCard, () => [
            h('div', { class: 'media' }, [
              h('div', { class: 'media__body' }, [
                h('p', { class: 't-caption--bold' }, 'Joi plus'),
                h('p', { class: 't-micro t-muted' }, 'Subscription or one-time purchase'),
              ]),
              h('div', { class: 'media__trail' }, [
                h('button', { class: 'button button--primary t-caption--bold' }, 'Upgrade'),
              ]),
            ]),
          ]),

          h(KCard, () => [
            h(KCardHeading, { title: 'Account' }),
            h('label', {
              class: 'field field--row',
              innerHTML:
                '<span class="t-caption--bold field__label">Display name</span>' +
                '<input class="t-caption field__input" type="text" value="Alexey" />',
            }),
            h('div', { class: 'field field--row' }, [
              h('span', { class: 't-caption--bold field__label' }, 'Subscription'),
              h(KTag, () => 'Free'),
            ]),
          ]),

          h(KCard, () => [
            h(KCardHeading, { title: 'Connections' }),
            h('label', {
              class: 'switch',
              innerHTML:
                '<input class="switch__input" type="checkbox" checked />' +
                '<span class="switch__track"></span>' +
                '<span class="t-caption ">Apple calendars</span>',
            }),
            h('label', {
              class: 'switch',
              innerHTML:
                '<input class="switch__input" type="checkbox" checked />' +
                '<span class="switch__track"></span>' +
                '<span class="t-caption ">Reminders</span>',
            }),
            h('label', {
              class: 'switch',
              innerHTML:
                '<input class="switch__input" type="checkbox" />' +
                '<span class="switch__track"></span>' +
                '<span class="t-caption ">HealthKit</span>',
            }),
          ]),

          h(KCard, () => [
            h(KCardHeading, { title: 'Preferences' }),
            h('div', { class: 'field field--row' }, [
              h('span', { class: 't-caption--bold field__label' }, 'Choose calendars'),
              h('span', { class: 't-caption t-muted' }, 'Two of five'),
            ]),
            h('div', { class: 'field field--row' }, [
              h('span', { class: 't-caption--bold field__label' }, 'Tasks'),
              h('span', { class: 't-caption t-muted' }, 'Grouped by project'),
            ]),
            h('div', { class: 'field field--row' }, [
              h('span', { class: 't-caption--bold field__label' }, 'App icon'),
              h('span', { class: 't-caption t-muted' }, 'Classic'),
            ]),
            h('div', { class: 'field field--row' }, [
              h('span', { class: 't-caption--bold field__label' }, 'Notifications'),
              h('span', { class: 't-caption t-muted' }, 'Morning summary only'),
            ]),
          ]),
        ]),
      ]),
    ])
  },
}
