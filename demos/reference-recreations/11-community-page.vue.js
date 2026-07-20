import { h } from 'vue'
import { KApp, KBook, KBookSection, KCard, KCardHeading, KDataTable, KDataCell, KList } from '../../packages/vue/dist/index.js'

/* Vue twin of 11-community-page.html. Same DOM, kit components where
   they match exactly. The join button in the static markup has no
   type attribute (unlike KButton's default), so it stays raw h(). */

/* innerHTML (not a text child) so the apostrophe in "O'Connor" stays
   literal — @vue/server-renderer's text-node escaper turns ' into
   &#39; in normal children, which the static markup does not use. */
const MEMBERS_HTML =
  `<a href="#">Sofia Marchetti</a>, <a href="#">Yusuf Demir</a>, <a href="#">Anke Voss</a>, ` +
  `<a href="#">Rafael Souza</a>, <a href="#">Priya Nair</a>, <a href="#">Tomas Novak</a>, ` +
  `<a href="#">Elin Andersson</a>, <a href="#">Marco Ferrari</a>, <a href="#">Nadia Petrova</a>, ` +
  `<a href="#">Julien Moreau</a>, <a href="#">Hana Kobayashi</a>, <a href="#">Liam O'Connor</a>, ` +
  `<a href="#">Greta Lindqvist</a>, <a href="#">Omar Farouk</a>, and 47 more.`

const PROJECTS = [
  { lead: 'A type specimen site', members: 'Sofia Marchetti, Yusuf Demir', progress: '80%', target: 'September' },
  { lead: 'An iOS habit app', members: 'Anke Voss, Rafael Souza, Priya Nair', progress: '45%', target: 'October' },
  { lead: 'A print zine', members: 'Tomas Novak', progress: '65%', target: 'August' },
  { lead: 'A weather widget kit', members: 'Elin Andersson, Marco Ferrari', progress: '30%', target: 'November' },
  { lead: 'A modular font family', members: 'Nadia Petrova, Julien Moreau, Hana Kobayashi', progress: '90%', target: 'September' },
]

export default {
  render() {
    return h(KApp, { view: 'single' }, () => [
      h(KBook, { id: 'doc' }, () => [
        h(KBookSection, () => [
          h('h1', { class: 't-hero' }, 'Planetarium'),
          h('p', { class: 't-title' }, 'First month 1 €, then 9,50 € a month.'),
          h('p', { class: 't-body' }, 'A working community for designers who ship a project a season, with structured feedback every Thursday.'),
        ]),

        h(KBookSection, { id: 'members' }, () => [
          h('h2', { class: 't-display' }, 'Members'),
          h('p', { class: 't-body', innerHTML: MEMBERS_HTML }),
        ]),

        h(KBookSection, { id: 'thursdays' }, () => [
          h('h2', { class: 't-display' }, 'How Thursdays work'),
          h('p', { class: 't-body' }, 'Online, 19:00, three slots of twenty minutes. Bring work in progress.'),
          h(KList, {
            items: ['Name what works before what does not.', 'Critique the work, never the person.'],
          }),
        ]),

        h(KBookSection, { id: 'projects' }, () => [
          h('h2', { class: 't-display' }, 'Active projects'),
          h(KDataTable, { columns: ['Project', 'Members', { label: 'Progress', num: true }, 'Target'] }, () =>
            PROJECTS.map((p) =>
              h('tr', [
                h(KDataCell, { lead: true }, () => p.lead),
                h(KDataCell, () => p.members),
                h(KDataCell, { num: true }, () => p.progress),
                h(KDataCell, () => p.target),
              ]),
            ),
          ),
        ]),

        h(KBookSection, { id: 'join' }, () => [
          h(KCard, { variant: 'shout' }, () => [
            h(KCardHeading, {
              title: 'Join the season',
              subtitle: 'Billing starts after the first month; leave any Thursday.',
              muted: true,
            }),
            h('button', { class: 'button button--primary t-subtitle' }, 'Join for the first month'),
          ]),
          h('p', { class: 't-micro t-muted' }, [
            'Promo codes: ',
            h('span', { class: 't-code' }, 'FIRSTLIGHT'),
            ' ',
            h('span', { class: 't-code' }, 'ORBIT25'),
          ]),
        ]),
      ]),
    ])
  },
}
