/* Kit snapshot — every component on one page, built from the Vue layer.
   Plain Vue, no Reka, no extra deps. Components emit canonical markup;
   vars.css + style.css own every pixel. Every component wires its own
   behavior now — modal, dropdown, tabs, and tooltip are self-contained;
   toast spawns through the `toast()` composable. No behavior layer
   script runs on this page. */
import { h, ref } from 'vue'
import {
  KApp, KSidebar, KSidebarNav, KBook, KBookSection, KInspector, KInspectorGroup,
  KCard, KCardHeading, KCardBody, KCardCollapsible, KCardStack,
  KButton, KChip, KChipWrap, KField, KFieldRow, KSwitch,
  KTag, KMedia, KQuote, KDivider, KList, KCode, KFigure, KSpecList, KStat, KSignoff,
  KMetric, KSpark, KSparkLabels, KDataTable, KDataCell,
  KPreviewFrame, KRegistryTable,
  KModal, KDropdown, KTabs, KTooltip, KToast, KPagination,
  KCommentThread, KCommentNew,
  toast,
} from '../../packages/vue/dist/index.js'

// ---- small builders -------------------------------------------------------

const part = (label) => h('h2', { class: 'book__part' }, label)

// A titled section: heading card + the demonstration rows beneath it.
const section = (id, title, blurb, ...body) =>
  h(KBookSection, { id }, () => [
    h('div', { class: 'card' }, [
      h('h3', { class: 't-title' }, title),
      blurb ? h('p', { class: 't-caption t-muted' }, blurb) : null,
    ]),
    ...body,
  ])

// A plain card wrapper for a cluster of specimens.
const specimen = (...children) => h('div', { class: 'card' }, children)

// ---- render ---------------------------------------------------------------

export default {
  name: 'KitSnapshot',
  setup() {
    const modalOpen = ref(false)
    return () =>
      h(KApp, { view: 'doc' }, () => [
        // ---- sidebar: brand + auto-filled scroll-spy TOC ----
        h(KSidebar, { title: 'Kit snapshot' }, {
          default: () => h(KSidebarNav),
          footer: () => ['UI kit 1.16.0', h('br'), '50 components, one page.'],
        }),

        // ---- book: the reading column ----
        h(KBook, { id: 'doc' }, () => [
          // masthead
          h(KBookSection, {}, () => [
            h('div', { class: 'card card--shout' }, [
              h('h1', { class: 't-hero' }, 'Every component'),
              h('p', { class: 't-caption t-subtle' },
                'The whole kit on one surface. Built from the Vue layer, styled by the kit, each component driving its own behavior.'),
            ]),
          ]),

          // ═══ PROSE ═══
          part('Prose'),
          section('typography', 'Typography', 'One scale, one weight step. Ink carries signal; muted carries context.',
            specimen(
              h('p', { class: 't-hero' }, 'Hero 66'),
              h('p', { class: 't-display' }, 'Display 38'),
              h('p', { class: 't-title' }, 'Title 22'),
              h('p', { class: 't-body' }, 'Body 22 — the reading size for prose that runs more than a line.'),
              h('p', { class: 't-subtitle' }, 'Subtitle 18'),
              h('p', { class: 't-caption' }, 'Caption 16 — dense supporting copy.'),
              h('p', { class: 't-micro t-muted' }, 'Micro 14, muted — the smallest label the kit ships.'),
            ),
          ),
          section('lists', 'Lists', 'Hairlined, caption-sized. Bullet for peers, decimal for order.',
            specimen(
              h(KList, { items: ['Black dot marks each peer item.', 'The gutter holds the marker.', 'Hairlines rule the rows.'] }),
              h(KDivider),
              h(KList, { ordered: true, items: ['First the conflict is named.', 'Then one side is chosen.', 'Then rule and code move together.'] }),
            ),
          ),
          section('code', 'Code', 'Monospace chip inline, block for a run of lines.',
            specimen(
              h('p', { class: 't-caption' }, ['Call ', h(KCode, {}, () => 'toast()'), ' after a draft saves.']),
              h(KCode, { block: true }, () => 'import { toast } from \'@konstantinopolskii/vue\'\n<KModal v-model="open" title="Publish" />'),
            ),
          ),
          section('quote', 'Quote', 'One pulled line, attributed.',
            specimen(
              h(KQuote, { cite: 'Rachel Andrew' }, () => 'Every change is bundled, documented, tagged, and released. Nothing half-shipped.'),
            ),
          ),

          // ═══ CONTROLS ═══
          part('Controls'),
          section('buttons', 'Buttons', 'Full-width affordance. Primary is ink; secondary is hairline.',
            specimen(
              h(KButton, { primary: true }, () => 'Publish deliverable'),
              h(KButton, {}, () => 'Save draft'),
              h(KButton, { caption: true }, () => 'Caption button'),
            ),
          ),
          section('chips', 'Chips', 'Pressable pills that select among peers. One pressed at a time.',
            specimen(
              h(KChipWrap, {}, () => [
                h(KChip, { pressed: true }, () => 'This week'),
                h(KChip, {}, () => 'This month'),
                h(KChip, {}, () => 'This quarter'),
                h(KChip, {}, () => 'All time'),
              ]),
            ),
          ),
          section('fields', 'Fields', 'Label and value share a row. No box, no fill at rest.',
            specimen(
              h(KField, { label: 'Workspace name', modelValue: 'Client charter', placeholder: 'Name this workspace' }),
              h(KField, { label: 'Brief', textarea: true, placeholder: 'What is this document for?' }),
              h(KFieldRow, { label: 'Owner', value: 'Konstantin K.' }),
            ),
          ),
          section('switches', 'Switches', 'Binary toggle. The label names the setting, never the state.',
            specimen(
              h(KSwitch, { label: 'Lock after publish', modelValue: true }),
              h(KSwitch, { label: 'Notify the workspace', modelValue: false }),
            ),
          ),
          section('tags', 'Tags', 'Metadata pills. Never clickable.',
            specimen(
              h('div', { class: 'chip-wrap' }, [
                h(KTag, {}, () => 'Draft'),
                h(KTag, {}, () => 'Strategy'),
                h(KTag, { bold: true }, () => 'Signed'),
              ]),
            ),
          ),

          // ═══ CONTENT ═══
          part('Content'),
          section('cards', 'Cards', 'Every widget is one. Five variants share one shape.',
            h(KCard, { variant: 'static' }, () => [
              h(KCardHeading, { title: 'Static card', subtitle: 'Transparent at rest' }),
              h(KCardBody, {}, () => h('p', { class: 't-caption' }, 'The default container. It holds content and never lights up.')),
            ]),
            h(KCard, { variant: 'interactive', state: 'active' }, () => [
              h(KCardHeading, { title: 'Interactive card', subtitle: 'Sticky active state' }),
              h(KCardCollapsible, {}, () => h('p', { class: 't-caption' }, 'The collapsible body reveals under the heading when the card is active.')),
            ]),
            h(KCard, { variant: 'link', href: '#cards' }, () => [
              h(KCardHeading, { title: 'Link card', subtitle: 'The whole surface navigates' }),
            ]),
            h(KCard, { variant: 'shout' }, () => [
              h('h3', { class: 't-title' }, 'Shout card'),
              h('p', { class: 't-caption t-subtle' }, 'Inverted surface. One per column, for the single loudest thing.'),
            ]),
          ),
          section('spec-list', 'Spec list', 'Key and value rows inside a card. Plain, value, or triple.',
            specimen(
              h(KSpecList, { variant: 'value', rows: [
                { key: 'Radius', values: ['24 px', 'The dialog and shout-card case.'] },
                { key: 'Hairline', values: ['0.5 px', 'Every border the kit draws.'] },
                { key: 'Grid', values: ['4 px', 'Every space token is a multiple.'] },
              ] }),
            ),
          ),
          section('media', 'Media rows', 'Leading figure, two-line body, trailing meta.',
            specimen(
              h(KMedia, { title: 'Konstantin K.', meta: 'Signed the charter 2 hours ago', initials: 'KK', trailTag: 'Owner' }),
              h(KDivider),
              h(KMedia, { title: 'Forecast module', meta: 'Updated by the pipeline', square: true, micro: true }),
            ),
          ),
          section('figure', 'Figure', 'Framed block with a caption.',
            specimen(
              h(KFigure, { caption: 'A framed figure sits on the same rail as prose.' }, () =>
                h('div', { class: 'card card--shout' }, [h('p', { class: 't-title' }, 'Framed')]),
              ),
            ),
          ),

          // ═══ DATA ═══
          part('Data'),
          section('metric', 'Metric and stat', 'Number first. The delta glyph carries direction, never a color.',
            h(KCardStack, { columns: true }, () => [
              h('div', { class: 'card' }, [h(KMetric, { value: '$48.2k', label: 'Signed this quarter', delta: '↑ 12%' })]),
              h('div', { class: 'card' }, [h(KMetric, { value: '19', label: 'Live deliverables', delta: '↓ 2' })]),
              h('div', { class: 'card' }, [h(KMetric, { value: '4.0s', label: 'Median render', delta: '↑ 0.3s' })]),
            ]),
            specimen(
              h(KStat, { value: '50', text: 'components catalogued.' }),
              h(KStat, { value: '7', text: 'foundations rule the rest.' }),
            ),
          ),
          section('data-table', 'Data table', 'Dense rows, right-aligned tabular numbers, deltas in text.',
            specimen(
              h(KDataTable, { columns: ['Keyword', { label: 'Rank', num: true }, { label: 'Δ', num: true }] }, () => [
                h('tr', [
                  h(KDataCell, { lead: true }, () => 'strategy consulting'),
                  h(KDataCell, { num: true }, () => '3'),
                  h(KDataCell, { delta: true }, () => '↑ 2'),
                ]),
                h('tr', [
                  h(KDataCell, { lead: true }, () => 'charter template'),
                  h(KDataCell, { num: true }, () => '7'),
                  h(KDataCell, { delta: true, flat: true }, () => '0'),
                ]),
                h('tr', [
                  h(KDataCell, { lead: true }, () => 'deliverable review'),
                  h(KDataCell, { num: true }, () => '12'),
                  h(KDataCell, { delta: true }, () => '↓ 4'),
                ]),
              ]),
            ),
          ),
          section('spark', 'Spark', 'Monochrome trend marks. History demotes; the current period keeps full ink.',
            specimen(
              h(KSpark, { panel: true, emphasize: 5, label: 'Six weeks of signed value, trending up',
                values: [40, 55, 48, 62, 70, 88] }),
              h(KSparkLabels, { labels: ['6 wk ago', 'Peak', 'This wk'] }),
            ),
          ),

          // ═══ KIT-DOC ═══
          part('Kit-doc'),
          section('preview-frame', 'Preview frame', 'Scaled iframe for doc surfaces. Renders at 400%, scales to 0.25.',
            specimen(
              h(KPreviewFrame, { src: '../reference-recreations/13-blogpost.html', title: 'Blog post preview' }),
            ),
          ),
          section('registry-table', 'Registry table', 'Dense two-column inventory for kit docs only.',
            specimen(
              h(KRegistryTable, { columns: ['Component', 'Role'] }, () => [
                h('tr', [h('td', { class: 't-body' }, 'modal'), h('td', { class: 't-body' }, 'One decision over a scrim.')]),
                h('tr', [h('td', { class: 't-body' }, 'dropdown'), h('td', { class: 't-body' }, 'Menu button and popover.')]),
                h('tr', [h('td', { class: 't-body' }, 'toast'), h('td', { class: 't-body' }, 'Transient confirmation.')]),
              ]),
            ),
          ),

          // ═══ INTERACTIVE — the 1.16.0 stars ═══
          part('Interactive'),
          section('modal', 'Modal', 'One decision held over a scrim. White dialog, no shadow. Opens with a trigger, closes on ×, scrim, or Escape.',
            specimen(
              h('button', {
                class: 'button button--primary t-subtitle',
                type: 'button',
                onClick: () => { modalOpen.value = true },
              }, 'Publish deliverable'),
            ),
            // the dialog owns its own open state: modelValue in, update:modelValue out
            h(KModal, {
              id: 'snapshot-modal', title: 'Publish deliverable',
              subtitle: 'This shares the signed charter with the client workspace.',
              modelValue: modalOpen.value,
              'onUpdate:modelValue': (v) => { modalOpen.value = v },
            }, {
              default: () => 'The document locks after publish. Reopen it from the workspace to draft a revision.',
              foot: () => [
                h('button', { class: 'button t-subtitle', type: 'button', 'data-modal-close': '' }, 'Cancel'),
                h('button', { class: 'button button--primary t-subtitle', type: 'button', 'data-modal-close': '' }, 'Publish'),
              ],
            }),
          ),
          section('dropdown', 'Dropdown', 'Menu button and popover. Picks one action. Escape and outside-click close it.',
            specimen(
              // trigger slot gets { open, toggle } straight off KDropdown's own state
              h(KDropdown, { label: 'Export' }, {
                trigger: ({ open, toggle }) => h('button', {
                  class: 'dropdown__trigger button t-subtitle',
                  type: 'button',
                  'aria-haspopup': 'menu',
                  'aria-expanded': open ? 'true' : 'false',
                  onClick: toggle,
                }, 'Export'),
                default: () => [
                  h('button', { class: 'dropdown__item', role: 'menuitem', type: 'button' }, 'Download PDF'),
                  h('button', { class: 'dropdown__item', role: 'menuitem', type: 'button' }, 'Copy share link'),
                  h('button', { class: 'dropdown__item', role: 'menuitem', type: 'button' }, 'Send to inspector'),
                ],
              }),
            ),
          ),
          section('tabs', 'Tabs', 'One surface, peer views under a shared strip. Arrow keys move and select.',
            specimen(
              h(KTabs, { id: 'acct', tabs: [{ label: 'Overview' }, { label: 'Members' }, { label: 'Billing' }] }, {
                'panel-0': () => h('p', { class: 't-caption' }, 'Nine seats in use across two workspaces.'),
                'panel-1': () => h('p', { class: 't-caption' }, 'Invite a teammate by email to add them to this workspace.'),
                'panel-2': () => h('p', { class: 't-caption' }, 'Next invoice posts on 1 August for $240.'),
              }),
            ),
          ),
          section('tooltip', 'Tooltip', 'One line of hint on hover or keyboard focus. Inverted bubble, never load-bearing.',
            specimen(
              h('p', { class: 't-caption' }, [
                'Net revenue ',
                h(KTooltip, { text: 'Gross minus refunds and platform fees.' }),
                ' is the figure the charter reports.',
              ]),
            ),
          ),
          section('toast', 'Toast', 'Transient confirmation. Inverted, bottom-center, self-clearing after four seconds.',
            specimen(
              // live trigger — calls the toast() composable straight
              h('button', {
                class: 'button t-subtitle',
                type: 'button',
                onClick: () => toast('Draft saved', { action: 'Undo' }),
              }, 'Save draft'),
              h('p', { class: 't-micro t-muted' }, 'Static specimen:'),
              // Plain wrapper, not .toast-stack: the stack is fixed bottom-center,
              // and toast() builds its own on <body>, not this demo.
              // The .toast styles itself, so it shows inline as-is.
              h('div', {}, [
                h(KToast, { text: 'Draft saved', action: 'Undo' }),
              ]),
            ),
          ),
          section('pagination', 'Pagination', 'Page numerals with CSS-drawn prev and next chevrons. One ink current page.',
            specimen(
              h(KPagination, { pages: 12, current: 4, window: 5 }),
            ),
          ),

          // ═══ PAGE ARCHETYPES ═══
          part('Page archetypes'),
          section('archetypes', 'Whole-page shells', 'Front, panels, and single are 100vh archetypes. They own the page, so they live in their own demos rather than a doc column.',
            h(KCardStack, { columns: true }, () => [
              h(KCard, { variant: 'link', href: '../reference-recreations/14-newsfront.html' }, () => [
                h(KCardHeading, { title: 'Front', subtitle: 'Masthead, rail, desks' }),
              ]),
              h(KCard, { variant: 'link', href: '../reference-recreations/12-studio-index.html' }, () => [
                h(KCardHeading, { title: 'Panels', subtitle: 'Spanning grid of cards' }),
              ]),
              h(KCard, { variant: 'link', href: '../reference-recreations/07-flashcard.html' }, () => [
                h(KCardHeading, { title: 'Single', subtitle: 'One centered column' }),
              ]),
            ]),
          ),

          // signoff closes the doc
          h(KBookSection, {}, () => [
            h(KSignoff, {
              stats: [
                { value: '50', text: 'components on this page.' },
                { value: '2.0.0', text: 'the kit version it maps.' },
              ],
              author: 'Konstantin Konstantinopolskii',
              role: 'founder',
              org: 'kk.consulting',
              stamp: '2026-07-20, snapshot session.',
              signatureSrc: '../../signature.svg',
            }),
          ]),
        ]),

        // ---- inspector: comments + actions ----
        h(KInspector, {}, () => [
          h(KInspectorGroup, {}, () => [
            h(KCard, { variant: 'heading' }, () => [h('h3', { class: 't-title' }, 'Inspector')]),
            h(KCommentThread, {
              title: 'On the interactive set',
              state: 'active',
              messages: [
                { id: 'm1', body: 'Six new components land in 1.16.0: modal, dropdown, tabs, tooltip, toast, pagination.' },
                { id: 'm2', role: 'agent', body: 'All manifesto-clean: shadows only on the inverted tooltip and toast.' },
              ],
            }),
            h(KCommentNew, { title: 'Add a comment', placeholder: 'Type a comment' }),
          ]),
        ]),
      ])
  },
}
