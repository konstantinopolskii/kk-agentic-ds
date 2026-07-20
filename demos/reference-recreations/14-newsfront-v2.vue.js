import { h } from 'vue'
import {
  KApp,
  KFront,
  KFrontRail,
  KFrontDesks,
  KCard,
  KCardHeading,
  KMedia,
  KFigure,
  KButton,
  KFieldRow,
} from '../../packages/vue/dist/index.js'

/* Vue twin of 14-newsfront-v2.html. Kit components where the shape
   matches (KApp/KFront/KFrontRail/KFrontDesks/KCard/KCardHeading/
   KMedia/KFigure/KButton/KFieldRow); raw h() for the masthead (static
   uses t-poster, not the t-hero KFrontMasthead hardcodes), the glyph
   specimen inside the figure (lab.css bespoke markup, no matching
   component), the lead card's oversized heading (h2.t-display +
   p.t-body, not KCardHeading's h3/t-caption), and the rail's plain
   media links (no figure element at all, which KMedia cannot omit).
   Pixel-parity target: 0 against the static twin.

   Three text nodes carry a real apostrophe ("Design's", "retailer's",
   "designer's"); @vue/server-renderer's text-node escaper turns '
   into &#39; in normal children, which the static markup does not
   use, so those three spots are set via innerHTML instead of a text
   child to keep the literal character. */
export default {
  render() {
    return h(KApp, { view: 'front' }, () => [
      h(KFront, () => [
        h('header', { class: 'front__masthead' }, [
          h('h1', { class: 't-poster' }, 'The Specimen'),
          h('p', { class: 't-micro t-muted', innerHTML: "Design's daily record · Friday, July 18, 2026 · Issue 214" }),
        ]),

        h(KCard, { variant: 'link', href: '#', lead: true }, () => [
          h(KFigure, { caption: 'Proof sheet: Commissioner across the weight axis, for The Specimen' }, () => [
            h(
              'div',
              {
                class: 'specimen',
                role: 'img',
                'aria-label': 'Glyph proof sheet: eight Commissioner glyphs across the weight axis, one cell inverted',
              },
              [
                h('span', { style: 'font-weight: 200;' }, 'A'),
                h('span', { style: 'font-weight: 400;' }, 'G'),
                h('span', { class: 'specimen--ink', style: 'font-weight: 700;' }, 'Q'),
                h('span', { style: 'font-weight: 900;' }, 'R'),
                h('span', { style: 'font-weight: 200;' }, 'a'),
                h('span', { style: 'font-weight: 400;' }, 'g'),
                h('span', { style: 'font-weight: 700;' }, 'e'),
                h('span', { style: 'font-weight: 900;' }, '&'),
              ],
            ),
          ]),
          h('p', { class: 't-micro t-muted' }, 'Tooling · Exclusive'),
          h('div', { class: 'card__heading' }, [
            h('h2', { class: 't-display' }, 'Rill ships an agent-readable component format'),
            h(
              'p',
              { class: 't-body' },
              'Every component now exports as structured JSON next to the visual file, and three plugin makers say the bridge from design to code just lost weeks of glue work. The format lands in the stable channel Monday; the spec is open from day one.',
            ),
          ]),
          h(KMedia, { title: 'Renata Sokol', meta: 'Today, 09:40 · 6 min read', micro: true, initials: 'RS' }),
          h(KButton, { as: 'span' }, () => 'Read the story'),
        ]),

        h(KFrontRail, { title: 'Latest' }, () => [
          h('a', { class: 'media', href: '#' }, [
            h('div', { class: 'media__body' }, [
              h('p', { class: 't-caption--bold' }, 'Two foundries settle the variable-font licensing dispute'),
              h('p', { class: 't-micro t-muted' }, '10:12 · Type'),
            ]),
          ]),
          h('a', { class: 'media', href: '#' }, [
            h('div', { class: 'media__body' }, [
              h('p', { class: 't-caption--bold', innerHTML: "Regulator rules a retailer's checkout fails contrast standards" }),
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
          h(KCard, () => [
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
