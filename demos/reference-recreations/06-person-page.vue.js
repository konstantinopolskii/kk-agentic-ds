import { h } from 'vue'
import { KApp, KBook, KBookSection, KCard, KFigure, KChipWrap, KChip, KDataTable, KDataCell } from '../../packages/vue/dist/index.js'

/* Vue twin of 06-person-page.html. Same DOM, kit components where they
   exist, raw h() for the bespoke variants (book__section--fill and
   book__section--stage have no component prop) and for the hand-drawn
   SVG portrait / caption markup that has no matching component. */
export default {
  render() {
    return h(KApp, { view: 'single' }, () => [
      h(KBook, { id: 'doc' }, () => [
        h('article', { class: 'book__section book__section--fill book__section--stage' }, [
          h(KCard, { variant: 'shout' }, () => [
            h(KFigure, () => [
              // Raw innerHTML: static markup self-closes the <path> tags
              // (XML/SVG style); Vue's server renderer always emits a
              // matching closing tag for non-void elements, so the paths
              // are injected as a literal string to keep the SSR byte
              // output identical to the static twin.
              h('svg', {
                viewBox: '0 0 440 330',
                xmlns: 'http://www.w3.org/2000/svg',
                stroke: 'currentColor',
                'stroke-width': '1',
                fill: 'none',
                'aria-hidden': 'true',
                innerHTML:
                  '<g transform="translate(20,15)">' +
                  '<path d="M255,45 C225,40 200,52 190,78 C185,92 195,98 188,113 C182,126 172,122 162,136 C152,150 148,158 166,164 C176,168 168,177 170,184 C173,192 187,193 185,202 C183,210 176,212 178,222 C180,233 196,239 206,251 C214,261 220,270 224,284"/>' +
                  '<path d="M255,45 C288,50 308,72 313,98 C318,124 302,138 308,163 C312,183 298,194 293,214"/>' +
                  '<path d="M188,101 C196,97 206,98 212,104"/>' +
                  '<path d="M224,284 C254,277 296,279 328,268"/>' +
                  '</g>',
              }),
            ]),
            h('div', [
              h('h1', { class: 't-hero' }, 'Margot Robbie'),
              h('p', { class: 't-caption' }, [
                h('span', { class: 't-caption--bold' }, '8 of 32'),
                ' ',
                h('span', { class: 't-muted' }, 'movies watched'),
              ]),
              h('p', { class: 't-caption' }, [
                h('span', { class: 't-caption--bold' }, '195 151'),
                ' ',
                h('span', { class: 't-muted' }, 'fans on Must'),
              ]),
              h('p', { class: 't-caption' }, [
                h('span', { class: 't-caption--bold' }, '7.6'),
                ' ',
                h('span', { class: 't-muted' }, 'average rating'),
              ]),
            ]),
          ]),
        ]),
        h(KBookSection, { id: 'filmography' }, () => [
          h('h2', { class: 't-display' }, 'Filmography'),
          h(KChipWrap, () => [
            h(KChip, { pressed: true }, () => 'All'),
            h(KChip, { pressed: false }, () => 'Want'),
            h(KChip, { pressed: false }, () => 'Watched'),
          ]),
          h(
            KDataTable,
            { columns: [{ label: 'Film' }, { label: 'Year', num: true }, { label: 'Rating', num: true }] },
            () => [
              h('tr', [
                h(KDataCell, { lead: true }, () => 'The Wolf of Wall Street'),
                h(KDataCell, { num: true }, () => '2013'),
                h(KDataCell, { num: true }, () => '8.2'),
              ]),
              h('tr', [
                h(KDataCell, { lead: true }, () => 'Suicide Squad'),
                h(KDataCell, { num: true }, () => '2016'),
                h(KDataCell, { num: true }, () => '5.9'),
              ]),
              h('tr', [
                h(KDataCell, { lead: true }, () => 'I, Tonya'),
                h(KDataCell, { num: true }, () => '2017'),
                h(KDataCell, { num: true }, () => '7.5'),
              ]),
              h('tr', [
                h(KDataCell, { lead: true }, () => 'Once Upon a Time in Hollywood'),
                h(KDataCell, { num: true }, () => '2019'),
                h(KDataCell, { num: true }, () => '7.6'),
              ]),
              h('tr', [
                h(KDataCell, { lead: true }, () => 'Barbie'),
                h(KDataCell, { num: true }, () => '2023'),
                h(KDataCell, { num: true }, () => '6.9'),
              ]),
            ],
          ),
        ]),
        h(KBookSection, { id: 'about' }, () => [
          h('h2', { class: 't-display' }, 'About'),
          h(
            'p',
            { class: 't-body' },
            'Margot Robbie started acting on the Australian soap opera Neighbours in 2008 and moved to Los Angeles in 2011.',
          ),
          h(
            'p',
            { class: 't-body' },
            'She co-founded the production company LuckyChap Entertainment in 2014, with producing credits on Promising Young Woman, Saltburn, and Barbie.',
          ),
        ]),
      ]),
    ])
  },
}
