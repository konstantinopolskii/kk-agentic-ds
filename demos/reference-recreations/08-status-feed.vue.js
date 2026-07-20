import { h } from 'vue'
import { KApp, KBookSection, KCard, KCardHeading, KMedia, KButton } from '../../packages/vue/dist/index.js'

/* Vue twin of 08-status-feed.html. Static main.book carries no id here
   (unlike the doc-shell pages), so the book element is raw h() — KBook
   always stamps an id attribute and has no way to omit it. */
export default {
  render() {
    return h(KApp, { view: 'single' }, () => [
      h('main', { class: 'book' }, [
        h('article', { class: 'book__section book__section--fill' }, [
          h(KCard, { variant: 'shout' }, () => [
            h('h2', { class: 't-display' }, 'Clique'),
            h('p', { class: 't-micro t-subtle' }, 'Four friends online right now'),
          ]),
        ]),
        h(KBookSection, () => [
          h(KCard, () => [
            h(KCardHeading, { title: 'Poke friends' }),
            h(
              KMedia,
              { title: 'Giana Rosser', meta: 'Last of Us', micro: true },
              { trail: () => h(KButton, { caption: true }, () => 'Poke') },
            ),
            h(
              KMedia,
              { title: 'Daniil Starling', meta: 'Meeting till 15:00', micro: true },
              { trail: () => h(KButton, { caption: true }, () => 'Poke') },
            ),
            h(
              KMedia,
              { title: 'Toki', meta: '11 291 km away', micro: true },
              { trail: () => h(KButton, { caption: true }, () => 'Poke') },
            ),
            h(
              KMedia,
              { title: 'Sam Mamedov', meta: 'Back in an hour', micro: true },
              { trail: () => h(KButton, { caption: true }, () => 'Poke') },
            ),
          ]),
        ]),
      ]),
    ])
  },
}
