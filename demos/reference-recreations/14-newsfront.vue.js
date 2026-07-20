import { h } from 'vue'
import {
  KApp,
  KFront,
  KFrontRail,
  KFrontDesks,
  KCard,
  KCardHeading,
  KFieldRow,
  KMedia,
  KFigure,
  KButton,
} from '../../packages/vue/src/index.js'

/* Vue twin of 14-newsfront.html. Same DOM, kit shells/cards where they
   match exactly. The lead card's heading (h2.t-display + p.t-body) and
   the rail's plain media anchors (no figure/avatar) have no matching
   component shape, so those stay raw h(). Three text nodes contain an
   apostrophe: Vue's SSR text-child path escapes it to `&#39;`, which the
   static markup never does, so those three go through innerHTML on a
   raw element (matching the established fix in 01-rank-tracker and
   10-tzlvt-landing) instead of a component prop / text child. Pixel-
   parity target: 0 against the static twin. */
export default {
  render() {
    return h(KApp, { view: 'front' }, () => [
      h(KFront, () => [
        h('header', { class: 'front__masthead' }, [
          h('h1', { class: 't-hero' }, 'The Specimen'),
          h('p', {
            class: 't-micro t-muted',
            innerHTML: "Design's daily record · Friday, July 18, 2026 · Issue 214",
          }),
        ]),

        h(KCard, { variant: 'link', href: '#', lead: true }, () => [
          h(KFigure, { caption: 'Specimen sheet: Studio Ostra for The Specimen' }, () => [
            h('svg', {
              viewBox: '0 0 640 360',
              xmlns: 'http://www.w3.org/2000/svg',
              role: 'img',
              'aria-label': 'Abstract specimen sheet: one filled glyph block among outlined ones',
              /* Vue SSR always emits paired close tags (<rect ...></rect>);
                 the static markup self-closes every shape (<rect ... />).
                 Same fix as 13-blogpost.vue.js: assemble the children as one
                 raw string via innerHTML so the serialized syntax matches
                 exactly instead of just the DOM shape. */
              innerHTML:
                '<rect x="1" y="1" width="638" height="358" fill="none" stroke="currentColor" stroke-width="1" />' +
                '<line x1="160" y1="0" x2="160" y2="360" stroke="currentColor" stroke-width="1" />' +
                '<line x1="320" y1="0" x2="320" y2="360" stroke="currentColor" stroke-width="1" />' +
                '<line x1="480" y1="0" x2="480" y2="360" stroke="currentColor" stroke-width="1" />' +
                '<line x1="0" y1="180" x2="640" y2="180" stroke="currentColor" stroke-width="1" />' +
                '<circle cx="80" cy="90" r="52" fill="none" stroke="currentColor" stroke-width="1" />' +
                '<rect x="200" y="38" width="80" height="104" fill="currentColor" />' +
                '<circle cx="400" cy="90" r="52" fill="currentColor" />' +
                '<rect x="520" y="38" width="80" height="104" fill="none" stroke="currentColor" stroke-width="1" />' +
                '<rect x="40" y="218" width="80" height="104" fill="none" stroke="currentColor" stroke-width="1" />' +
                '<circle cx="240" cy="270" r="52" fill="none" stroke="currentColor" stroke-width="1" />' +
                '<rect x="360" y="218" width="80" height="104" fill="none" stroke="currentColor" stroke-width="1" />' +
                '<circle cx="560" cy="270" r="52" fill="none" stroke="currentColor" stroke-width="1" />',
            }),
          ]),
          h('p', { class: 't-micro t-muted' }, 'Tooling · Exclusive'),
          h('div', { class: 'card__heading' }, [
            h('h2', { class: 't-display' }, 'Rill ships an agent-readable component format'),
            h(
              'p',
              { class: 't-body' },
              "Every component now exports as structured JSON next to the visual file, and three plugin makers say the bridge from design to code just lost weeks of glue work. The format lands in the stable channel Monday; the spec is open from day one.",
            ),
          ]),
          h(KMedia, { title: 'Renata Sokol', meta: 'Today, 09:40 · 6 min read', micro: true, initials: 'RS' }),
          h(KButton, { as: 'span' }, () => 'Read the story'),
        ]),

        h(KFrontRail, { title: 'Latest' }, () => [
          h('a', { class: 'media', href: '#' }, [
            h('div', { class: 'media__body' }, [
              h('p', { class: 't-caption--bold' }, "Two foundries settle the variable-font licensing dispute"),
              h('p', { class: 't-micro t-muted' }, '10:12 · Type'),
            ]),
          ]),
          h('a', { class: 'media', href: '#' }, [
            h('div', { class: 'media__body' }, [
              h('p', {
                class: 't-caption--bold',
                innerHTML: "Regulator rules a retailer's checkout fails contrast standards",
              }),
              h('p', { class: 't-micro t-muted' }, '09:55 · Accessibility'),
            ]),
          ]),
          h('a', { class: 'media', href: '#' }, [
            h('div', { class: 'media__body' }, [
              h('p', { class: 't-caption--bold' }, 'Two token-format specs merge into one open standard'),
              h('p', { class: 't-micro t-muted' }, '09:20 · Tooling'),
            ]),
          ]),
          h('a', { class: 'media', href: '#' }, [
            h('div', { class: 'media__body' }, [
              h('p', { class: 't-caption--bold' }, 'A 40-year-old branding studio closes its Chicago office'),
              h('p', { class: 't-micro t-muted' }, '08:41 · Business'),
            ]),
          ]),
          h('a', { class: 'media', href: '#' }, [
            h('div', { class: 'media__body' }, [
              h('p', { class: 't-caption--bold' }, 'Design-hiring budgets flat for a third year, survey finds'),
              h('p', { class: 't-micro t-muted' }, '08:05 · Business'),
            ]),
          ]),
          h(KCard, {}, () => [
            h(KCardHeading, { title: 'The numbers' }),
            h(KFieldRow, { label: 'Foundry deals, YTD' }, () => ['14 ', h('span', { class: 't-caption--bold' }, '↑ 4')]),
            h(KFieldRow, { label: 'Median design salary' }, () => ['$118K ', h('span', { class: 't-caption--bold' }, '↑ 2%')]),
            h(KFieldRow, { label: 'Open design roles' }, () => ['8 210 ', h('span', { class: 't-caption--bold' }, '↓ 6%')]),
          ]),
        ]),

        h(KFrontDesks, () => [
          h(KCard, { variant: 'link', href: '#' }, () => [
            h('p', { class: 't-micro t-muted' }, 'Product'),
            h(KCardHeading, {
              title: 'A prototyping tool adds native voice-interface previews',
              subtitle: 'The beta reaches every paid seat next month; early testers already script full call flows.',
            }),
            h(KButton, { as: 'span' }, () => 'Open product'),
          ]),
          h(KCard, { variant: 'link', href: '#' }, () => [
            h('p', { class: 't-micro t-muted' }, 'Craft'),
            h('div', { class: 'card__heading' }, [
              h('h3', { class: 't-title' }, 'Drawing a typeface for low vision took six months of testing'),
              h('p', {
                class: 't-caption',
                innerHTML: "Every counter and stroke answered to readers, not to the designer's eye.",
              }),
            ]),
            h(KButton, { as: 'span' }, () => 'Open craft'),
          ]),
          h(KCard, { variant: 'link', href: '#' }, () => [
            h('p', { class: 't-micro t-muted' }, 'Field notes'),
            h(KCardHeading, {
              title: 'Inside the studio that still ships everything on paper first',
              subtitle: 'Sketchbooks outnumber laptops three to one on this floor, and the work shows it.',
            }),
            h(KButton, { as: 'span' }, () => 'Open field notes'),
          ]),
        ]),
      ]),
    ])
  },
}
