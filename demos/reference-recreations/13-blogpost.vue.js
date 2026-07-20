import { h } from 'vue'
import { KBook, KBookSection, KMedia, KQuote, KFigure, KList, KStat } from '../../packages/vue/dist/index.js'

/* Vue twin of 13-blogpost.html. Same DOM, kit components where they
   exist, raw h() for the bespoke bits: the diagram's SVG has no
   matching component and its inner marks are self-closed in the
   static markup, so they ride in as a literal innerHTML string; the
   signoff signature paragraph is hand-built (not KSignoff) because
   the static markup's line-wrapped source text collapses to stray
   single spaces around "Signed by" / "founder at" that the component
   does not reproduce, and a couple of text nodes carry an apostrophe
   that Vue's SSR would otherwise escape to &#39;. */
export default {
  render() {
    return h(KBook, { id: 'doc' }, () => [
      h(KBookSection, () => [
        h('p', { class: 't-micro t-muted' }, 'Design systems'),
        h('h1', { class: 't-hero' }, 'The kit grows patterns, not vocabulary'),
        h(
          'p',
          { class: 't-title' },
          'The token count, the component count, and the forbidden list stay fixed by design, even as the pattern count keeps climbing.',
        ),
        h(KMedia, {
          title: 'Konstantin Konstantinopolskii',
          meta: 'July 17, 2026 · 6 min read',
          micro: true,
          initials: 'KK',
        }),
      ]),
      h(KBookSection, { id: 'budget' }, () => [
        h('h2', { class: 't-display' }, 'The element budget stays fixed'),
        h(
          'p',
          { class: 't-body' },
          'The kit ships nine color tokens, three font weights across seven sizes, four corner radii, and twelve spacing steps. Release notes add new patterns and new rows to the component registry. They do not add columns to vars.css.',
        ),
        h(
          'p',
          { class: 't-body' },
          'A tenth token means editing vars.css, tokens.json, and the forbidden list in the same commit, then checking every consuming product that assumed nine. The evolve protocol exists to make that cost visible before a maintainer signs off, not after a product breaks downstream.',
        ),
      ]),
      h(KBookSection, { id: 'pattern-requests' }, () => [
        h('h2', { class: 't-display' }, 'Most component requests are pattern requests'),
        h(
          KQuote,
          { cite: 'Priya Chandrasekaran, design lead' },
          () =>
            ' A new component is a permanent tax on every review that follows it. Most requests for one disappear the moment you ask which pattern already carries the job. ',
        ),
      ]),
      h(KBookSection, { id: 'rules' }, () => [
        h('h2', { class: 't-display' }, 'Three rules keep the count honest'),
        h(
          KFigure,
          {},
          () => [
            h('svg', {
              viewBox: '0 0 640 200',
              xmlns: 'http://www.w3.org/2000/svg',
              stroke: 'currentColor',
              'stroke-width': '1',
              fill: 'none',
              'aria-hidden': 'true',
              innerHTML:
                '<line x1="100" y1="150" x2="620" y2="150" />' +
                '<circle cx="100" cy="150" r="3" fill="currentColor" stroke="none" />' +
                '<circle cx="360" cy="150" r="3" fill="currentColor" stroke="none" />' +
                '<circle cx="620" cy="150" r="3" fill="currentColor" stroke="none" />' +
                '<text x="0" y="154" font-size="13" fill="currentColor" stroke="none">Tokens</text>' +
                '<line x1="100" y1="108" x2="620" y2="108" />' +
                '<circle cx="100" cy="108" r="3" fill="currentColor" stroke="none" />' +
                '<circle cx="360" cy="108" r="3" fill="currentColor" stroke="none" />' +
                '<circle cx="620" cy="108" r="3" fill="currentColor" stroke="none" />' +
                '<text x="0" y="112" font-size="13" fill="currentColor" stroke="none">Components</text>' +
                '<polyline points="100,178 360,122 620,38" />' +
                '<circle cx="100" cy="178" r="3" fill="currentColor" stroke="none" />' +
                '<circle cx="360" cy="122" r="3" fill="currentColor" stroke="none" />' +
                '<circle cx="620" cy="38" r="3" fill="currentColor" stroke="none" />' +
                '<text x="0" y="42" font-size="13" fill="currentColor" stroke="none">Patterns</text>' +
                '<text x="100" y="196" font-size="11" fill="currentColor" stroke="none" text-anchor="middle">0.1.0</text>' +
                '<text x="360" y="196" font-size="11" fill="currentColor" stroke="none" text-anchor="middle">1.6.0</text>' +
                '<text x="620" y="196" font-size="11" fill="currentColor" stroke="none" text-anchor="middle">1.11.0</text>',
            }),
            h('figcaption', {
              innerHTML:
                "Three points on the kit's own timeline. Token count and component count hold flat; pattern count is the only line that climbs.",
            }),
          ],
        ),
        h(KList, () => [
          h('li', 'A new component ships only once three separate products ask for it.'),
          h('li', 'Every addition updates the forbidden list and the registry table in one commit.'),
          h('li', {
            innerHTML:
              "A pattern recombines existing components; it never introduces a class the registry doesn't already carry.",
          }),
        ]),
      ]),
      h(KBookSection, { id: 'related' }, () => [
        h('h2', { class: 't-display' }, 'Related'),
        h(KMedia, {
          href: '#',
          square: true,
          title: 'The chart policy has no exceptions',
          meta: 'June 2, 2026 · 5 min read',
          micro: true,
        }),
        h(KMedia, {
          href: '#',
          square: true,
          title: 'Sentence case is a discipline',
          meta: 'June 19, 2026 · 4 min read',
          micro: true,
        }),
        h(KMedia, {
          href: '#',
          square: true,
          title: 'Why only the middle column scrolls',
          meta: 'July 8, 2026 · 5 min read',
          micro: true,
        }),
      ]),
      h('div', { class: 'book__signoff' }, [
        h('div', { class: 'book__signoff-stats' }, [
          h(KStat, { value: '4', text: 'drafts before this one.' }),
          h(KStat, { value: '0', text: 'new components proposed.' }),
        ]),
        h('div', {
          class: 'book__signoff-signature',
          // Raw innerHTML: the static markup self-closes <br /> and
          // <img /> (XHTML style); Vue's SSR never emits the trailing
          // slash on void elements, so the whole block rides in as a
          // literal string to keep the SSR byte output identical.
          innerHTML:
            '<p class="t-caption"> Signed by ' +
            '<span class="t-caption--bold">Konstantin Konstantinopolskii,</span><br /> founder at ' +
            '<span class="t-caption--bold">kk.consulting</span><br />' +
            '<span class="t-muted">2026-07-17, single-column reading shell.</span></p>' +
            '<img class="book__signoff-signature-img" src="../../signature.svg" alt="Signature" />',
        }),
      ]),
    ])
  },
}
