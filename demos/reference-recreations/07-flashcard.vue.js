import { h } from 'vue'
import { KApp, KBook, KBookSection, KCard, KButton } from '../../packages/vue/src/index.js'

/* Vue twin of 07-flashcard.html. Same DOM, kit components where they
   exist, raw h() for the one bespoke variant (book__section--fill has
   no component prop). Pixel-parity target: 0 against the static twin. */
export default {
  render() {
    return h(KApp, { view: 'single' }, () => [
      h(KBook, { id: 'doc' }, () => [
        h('article', { class: 'book__section book__section--fill' }, [
          h(KCard, { variant: 'shout' }, () => [
            h('h1', { class: 't-hero' }, 'Exercise'),
            h('p', { class: 't-caption t-subtle' }, 'Tap to flip'),
          ]),
        ]),
        h(KBookSection, () => [
          h(KButton, () => 'Shuffle the deck'),
        ]),
      ]),
    ])
  },
}
