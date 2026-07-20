<script setup lang="ts">
/* SFC twin of demos/kit-snapshot/index.vue.js, the whole-kit showcase:
   every component on one page, plain Vue, no kit.js. Each interactive
   component (modal, dropdown, tabs, tooltip, toast, pagination) wires
   its own behavior; this page only holds the one bit of page-level
   state the twin holds — modalOpen — plus the data literals for every
   specimen row. Same components, same props, same classes, same text,
   same DOM order as the twin. There is no frozen static oracle for
   this page: snapshot_check.mjs diffs this SFC's SSR output against
   the h() twin's own SSR output. */
import { ref } from 'vue'
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
} from '@konstantinopolskii/vue'

const modalOpen = ref(false)

// ---- typed data literals, one per specimen row -----------------------

const listItemsPeer: string[] = [
  'Black dot marks each peer item.',
  'The gutter holds the marker.',
  'Hairlines rule the rows.',
]
const listItemsOrdered: string[] = [
  'First the conflict is named.',
  'Then one side is chosen.',
  'Then rule and code move together.',
]

// The code block sample carries a real newline and literal angle
// brackets/quotes as text content — bound through an expression (not
// static template text) so Vue's own text-escaping runs identically on
// both the SFC and the h() twin's dynamic text child.
const codeBlockSample =
  'import { toast } from \'@konstantinopolskii/vue\'\n<KModal v-model="open" title="Publish" />'

interface SpecRow {
  key: string
  values: string[]
}
const specRows: SpecRow[] = [
  { key: 'Radius', values: ['24 px', 'The dialog and shout-card case.'] },
  { key: 'Hairline', values: ['0.5 px', 'Every border the kit draws.'] },
  { key: 'Grid', values: ['4 px', 'Every space token is a multiple.'] },
]

type DataColumn = string | { label: string; num?: boolean }
const dataTableColumns: DataColumn[] = [
  'Keyword',
  { label: 'Rank', num: true },
  { label: 'Δ', num: true },
]

const sparkValues: number[] = [40, 55, 48, 62, 70, 88]
const sparkLabels: string[] = ['6 wk ago', 'Peak', 'This wk']

const registryColumns: string[] = ['Component', 'Role']

interface AcctTab {
  label: string
}
const acctTabs: AcctTab[] = [{ label: 'Overview' }, { label: 'Members' }, { label: 'Billing' }]

interface SignoffStat {
  value: string
  text: string
}
const signoffStats: SignoffStat[] = [
  { value: '50', text: 'components on this page.' },
  { value: '2.1.0', text: 'the kit version it maps.' },
]

interface CommentMessage {
  id: string
  body: string
  role?: string
}
const inspectorMessages: CommentMessage[] = [
  {
    id: 'm1',
    body: 'Six new components land in 1.16.0: modal, dropdown, tabs, tooltip, toast, pagination.',
  },
  { id: 'm2', role: 'agent', body: 'All manifesto-clean: shadows only on the inverted tooltip and toast.' },
]
</script>

<template>
  <KApp view="doc">
    <KSidebar title="Kit snapshot">
      <KSidebarNav />
      <template #footer>UI kit 2.1.0<br />50 components, one page.</template>
    </KSidebar>

    <KBook id="doc">
      <KBookSection>
        <div class="card card--shout">
          <h1 class="t-hero">Every component</h1>
          <p class="t-caption t-subtle">The whole kit on one surface. Built from the Vue layer, styled by the kit, each component driving its own behavior.</p>
        </div>
      </KBookSection>

      <h2 class="book__part">Prose</h2>

      <KBookSection id="typography">
        <div class="card">
          <h3 class="t-title">Typography</h3>
          <p class="t-caption t-muted">One scale, one weight step. Ink carries signal; muted carries context.</p>
        </div>
        <div class="card">
          <p class="t-hero">Hero 66</p>
          <p class="t-display">Display 38</p>
          <p class="t-title">Title 22</p>
          <p class="t-body">Body 22 — the reading size for prose that runs more than a line.</p>
          <p class="t-subtitle">Subtitle 18</p>
          <p class="t-caption">Caption 16 — dense supporting copy.</p>
          <p class="t-micro t-muted">Micro 14, muted — the smallest label the kit ships.</p>
        </div>
      </KBookSection>

      <KBookSection id="lists">
        <div class="card">
          <h3 class="t-title">Lists</h3>
          <p class="t-caption t-muted">Hairlined, caption-sized. Bullet for peers, decimal for order.</p>
        </div>
        <div class="card">
          <KList :items="listItemsPeer" />
          <KDivider />
          <KList ordered :items="listItemsOrdered" />
        </div>
      </KBookSection>

      <KBookSection id="code">
        <div class="card">
          <h3 class="t-title">Code</h3>
          <p class="t-caption t-muted">Monospace chip inline, block for a run of lines.</p>
        </div>
        <div class="card">
          <p class="t-caption">Call <KCode>toast()</KCode> after a draft saves.</p>
          <KCode block>{{ codeBlockSample }}</KCode>
        </div>
      </KBookSection>

      <KBookSection id="quote">
        <div class="card">
          <h3 class="t-title">Quote</h3>
          <p class="t-caption t-muted">One pulled line, attributed.</p>
        </div>
        <div class="card">
          <KQuote cite="Rachel Andrew">Every change is bundled, documented, tagged, and released. Nothing half-shipped.</KQuote>
        </div>
      </KBookSection>

      <h2 class="book__part">Controls</h2>

      <KBookSection id="buttons">
        <div class="card">
          <h3 class="t-title">Buttons</h3>
          <p class="t-caption t-muted">Full-width affordance. Primary is ink; secondary is hairline.</p>
        </div>
        <div class="card">
          <KButton primary>Publish deliverable</KButton>
          <KButton>Save draft</KButton>
          <KButton caption>Caption button</KButton>
        </div>
      </KBookSection>

      <KBookSection id="chips">
        <div class="card">
          <h3 class="t-title">Chips</h3>
          <p class="t-caption t-muted">Pressable pills that select among peers. One pressed at a time.</p>
        </div>
        <div class="card">
          <KChipWrap>
            <KChip pressed>This week</KChip>
            <KChip>This month</KChip>
            <KChip>This quarter</KChip>
            <KChip>All time</KChip>
          </KChipWrap>
        </div>
      </KBookSection>

      <KBookSection id="fields">
        <div class="card">
          <h3 class="t-title">Fields</h3>
          <p class="t-caption t-muted">Label and value share a row. No box, no fill at rest.</p>
        </div>
        <div class="card">
          <KField label="Workspace name" model-value="Client charter" placeholder="Name this workspace" />
          <KField label="Brief" textarea placeholder="What is this document for?" />
          <KFieldRow label="Owner" value="Konstantin K." />
        </div>
      </KBookSection>

      <KBookSection id="switches">
        <div class="card">
          <h3 class="t-title">Switches</h3>
          <p class="t-caption t-muted">Binary toggle. The label names the setting, never the state.</p>
        </div>
        <div class="card">
          <KSwitch label="Lock after publish" model-value />
          <KSwitch label="Notify the workspace" :model-value="false" />
        </div>
      </KBookSection>

      <KBookSection id="tags">
        <div class="card">
          <h3 class="t-title">Tags</h3>
          <p class="t-caption t-muted">Metadata pills. Never clickable.</p>
        </div>
        <div class="card">
          <div class="chip-wrap">
            <KTag>Draft</KTag>
            <KTag>Strategy</KTag>
            <KTag bold>Signed</KTag>
          </div>
        </div>
      </KBookSection>

      <h2 class="book__part">Content</h2>

      <KBookSection id="cards">
        <div class="card">
          <h3 class="t-title">Cards</h3>
          <p class="t-caption t-muted">Every widget is one. Five variants share one shape.</p>
        </div>
        <KCard variant="static">
          <KCardHeading title="Static card" subtitle="Transparent at rest" />
          <KCardBody><p class="t-caption">The default container. It holds content and never lights up.</p></KCardBody>
        </KCard>
        <KCard variant="interactive" state="active">
          <KCardHeading title="Interactive card" subtitle="Sticky active state" />
          <KCardCollapsible><p class="t-caption">The collapsible body reveals under the heading when the card is active.</p></KCardCollapsible>
        </KCard>
        <KCard variant="link" href="#cards">
          <KCardHeading title="Link card" subtitle="The whole surface navigates" />
        </KCard>
        <KCard variant="shout">
          <h3 class="t-title">Shout card</h3>
          <p class="t-caption t-subtle">Inverted surface. One per column, for the single loudest thing.</p>
        </KCard>
      </KBookSection>

      <KBookSection id="spec-list">
        <div class="card">
          <h3 class="t-title">Spec list</h3>
          <p class="t-caption t-muted">Key and value rows inside a card. Plain, value, or triple.</p>
        </div>
        <div class="card">
          <KSpecList variant="value" :rows="specRows" />
        </div>
      </KBookSection>

      <KBookSection id="media">
        <div class="card">
          <h3 class="t-title">Media rows</h3>
          <p class="t-caption t-muted">Leading figure, two-line body, trailing meta.</p>
        </div>
        <div class="card">
          <KMedia title="Konstantin K." meta="Signed the charter 2 hours ago" initials="KK" trail-tag="Owner" />
          <KDivider />
          <KMedia title="Forecast module" meta="Updated by the pipeline" square micro />
        </div>
      </KBookSection>

      <KBookSection id="figure">
        <div class="card">
          <h3 class="t-title">Figure</h3>
          <p class="t-caption t-muted">Framed block with a caption.</p>
        </div>
        <div class="card">
          <KFigure caption="A framed figure sits on the same rail as prose.">
            <div class="card card--shout"><p class="t-title">Framed</p></div>
          </KFigure>
        </div>
      </KBookSection>

      <h2 class="book__part">Data</h2>

      <KBookSection id="metric">
        <div class="card">
          <h3 class="t-title">Metric and stat</h3>
          <p class="t-caption t-muted">Number first. The delta glyph carries direction, never a color.</p>
        </div>
        <KCardStack columns>
          <div class="card"><KMetric value="$48.2k" label="Signed this quarter" delta="↑ 12%" /></div>
          <div class="card"><KMetric value="19" label="Live deliverables" delta="↓ 2" /></div>
          <div class="card"><KMetric value="4.0s" label="Median render" delta="↑ 0.3s" /></div>
        </KCardStack>
        <div class="card">
          <KStat value="50" text="components catalogued." />
          <KStat value="7" text="foundations rule the rest." />
        </div>
      </KBookSection>

      <KBookSection id="data-table">
        <div class="card">
          <h3 class="t-title">Data table</h3>
          <p class="t-caption t-muted">Dense rows, right-aligned tabular numbers, deltas in text.</p>
        </div>
        <div class="card">
          <KDataTable :columns="dataTableColumns">
            <tr>
              <KDataCell lead>strategy consulting</KDataCell>
              <KDataCell num>3</KDataCell>
              <KDataCell delta>↑ 2</KDataCell>
            </tr>
            <tr>
              <KDataCell lead>charter template</KDataCell>
              <KDataCell num>7</KDataCell>
              <KDataCell delta flat>0</KDataCell>
            </tr>
            <tr>
              <KDataCell lead>deliverable review</KDataCell>
              <KDataCell num>12</KDataCell>
              <KDataCell delta>↓ 4</KDataCell>
            </tr>
          </KDataTable>
        </div>
      </KBookSection>

      <KBookSection id="spark">
        <div class="card">
          <h3 class="t-title">Spark</h3>
          <p class="t-caption t-muted">Monochrome trend marks. History demotes; the current period keeps full ink.</p>
        </div>
        <div class="card">
          <KSpark panel :emphasize="5" label="Six weeks of signed value, trending up" :values="sparkValues" />
          <KSparkLabels :labels="sparkLabels" />
        </div>
      </KBookSection>

      <h2 class="book__part">Kit-doc</h2>

      <KBookSection id="preview-frame">
        <div class="card">
          <h3 class="t-title">Preview frame</h3>
          <p class="t-caption t-muted">Scaled iframe for doc surfaces. Renders at 400%, scales to 0.25.</p>
        </div>
        <div class="card">
          <KPreviewFrame src="../reference-recreations/13-blogpost.html" title="Blog post preview" />
        </div>
      </KBookSection>

      <KBookSection id="registry-table">
        <div class="card">
          <h3 class="t-title">Registry table</h3>
          <p class="t-caption t-muted">Dense two-column inventory for kit docs only.</p>
        </div>
        <div class="card">
          <KRegistryTable :columns="registryColumns">
            <tr><td class="t-body">modal</td><td class="t-body">One decision over a scrim.</td></tr>
            <tr><td class="t-body">dropdown</td><td class="t-body">Menu button and popover.</td></tr>
            <tr><td class="t-body">toast</td><td class="t-body">Transient confirmation.</td></tr>
          </KRegistryTable>
        </div>
      </KBookSection>

      <h2 class="book__part">Interactive</h2>

      <KBookSection id="modal">
        <div class="card">
          <h3 class="t-title">Modal</h3>
          <p class="t-caption t-muted">One decision held over a scrim. White dialog, no shadow. Opens with a trigger, closes on ×, scrim, or Escape.</p>
        </div>
        <div class="card">
          <button class="button button--primary t-subtitle" type="button" @click="modalOpen = true">Publish deliverable</button>
        </div>
        <KModal
          id="snapshot-modal"
          title="Publish deliverable"
          subtitle="This shares the signed charter with the client workspace."
          v-model="modalOpen"
        >The document locks after publish. Reopen it from the workspace to draft a revision.<template #foot
          ><button class="button t-subtitle" type="button" data-modal-close>Cancel</button
          ><button class="button button--primary t-subtitle" type="button" data-modal-close>Publish</button
        ></template></KModal>
      </KBookSection>

      <KBookSection id="dropdown">
        <div class="card">
          <h3 class="t-title">Dropdown</h3>
          <p class="t-caption t-muted">Menu button and popover. Picks one action. Escape and outside-click close it.</p>
        </div>
        <div class="card">
          <KDropdown label="Export">
            <template #trigger="{ open, toggle }">
              <button
                class="dropdown__trigger button t-subtitle"
                type="button"
                aria-haspopup="menu"
                :aria-expanded="open ? 'true' : 'false'"
                @click="toggle"
              >Export</button>
            </template>
            <button class="dropdown__item" role="menuitem" type="button">Download PDF</button>
            <button class="dropdown__item" role="menuitem" type="button">Copy share link</button>
            <button class="dropdown__item" role="menuitem" type="button">Send to inspector</button>
          </KDropdown>
        </div>
      </KBookSection>

      <KBookSection id="tabs">
        <div class="card">
          <h3 class="t-title">Tabs</h3>
          <p class="t-caption t-muted">One surface, peer views under a shared strip. Arrow keys move and select.</p>
        </div>
        <div class="card">
          <KTabs id="acct" :tabs="acctTabs">
            <template #panel-0><p class="t-caption">Nine seats in use across two workspaces.</p></template>
            <template #panel-1><p class="t-caption">Invite a teammate by email to add them to this workspace.</p></template>
            <template #panel-2><p class="t-caption">Next invoice posts on 1 August for $240.</p></template>
          </KTabs>
        </div>
      </KBookSection>

      <KBookSection id="tooltip">
        <div class="card">
          <h3 class="t-title">Tooltip</h3>
          <p class="t-caption t-muted">One line of hint on hover or keyboard focus. Inverted bubble, never load-bearing.</p>
        </div>
        <div class="card">
          <p class="t-caption">Net revenue <KTooltip text="Gross minus refunds and platform fees." /> is the figure the charter reports.</p>
        </div>
      </KBookSection>

      <KBookSection id="toast">
        <div class="card">
          <h3 class="t-title">Toast</h3>
          <p class="t-caption t-muted">Transient confirmation. Inverted, bottom-center, self-clearing after four seconds.</p>
        </div>
        <div class="card">
          <button class="button t-subtitle" type="button" @click="toast('Draft saved', { action: 'Undo' })">Save draft</button>
          <p class="t-micro t-muted">Static specimen:</p>
          <div>
            <KToast text="Draft saved" action="Undo" />
          </div>
        </div>
      </KBookSection>

      <KBookSection id="pagination">
        <div class="card">
          <h3 class="t-title">Pagination</h3>
          <p class="t-caption t-muted">Page numerals with CSS-drawn prev and next chevrons. One ink current page.</p>
        </div>
        <div class="card">
          <KPagination :pages="12" :current="4" :window="5" />
        </div>
      </KBookSection>

      <h2 class="book__part">Page archetypes</h2>

      <KBookSection id="archetypes">
        <div class="card">
          <h3 class="t-title">Whole-page shells</h3>
          <p class="t-caption t-muted">Front, panels, and single are 100vh archetypes. They own the page, so they live in their own demos rather than a doc column.</p>
        </div>
        <KCardStack columns>
          <KCard variant="link" href="../reference-recreations/14-newsfront.html">
            <KCardHeading title="Front" subtitle="Masthead, rail, desks" />
          </KCard>
          <KCard variant="link" href="../reference-recreations/12-studio-index.html">
            <KCardHeading title="Panels" subtitle="Spanning grid of cards" />
          </KCard>
          <KCard variant="link" href="../reference-recreations/07-flashcard.html">
            <KCardHeading title="Single" subtitle="One centered column" />
          </KCard>
        </KCardStack>
      </KBookSection>

      <KBookSection>
        <KSignoff
          :stats="signoffStats"
          author="Konstantin Konstantinopolskii"
          role="founder"
          org="kk.consulting"
          stamp="2026-07-20, snapshot session."
          signature-src="../../signature.svg"
        />
      </KBookSection>
    </KBook>

    <KInspector>
      <KInspectorGroup>
        <KCard variant="heading"><h3 class="t-title">Inspector</h3></KCard>
        <KCommentThread title="On the interactive set" state="active" :messages="inspectorMessages" />
        <KCommentNew title="Add a comment" placeholder="Type a comment" />
      </KInspectorGroup>
    </KInspector>
  </KApp>
</template>
