<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/index.html, the frozen static
   oracle for patterns_check.mjs (name pattern-index -> index.html).
   Every kit atom composed the way the kit composes, gated for SSR
   parity. Components are used wherever their emitted shape matches this
   oracle byte-for-byte after normalization; raw markup covers the
   shapes no existing component reproduces:
     - book__spec dl's whose dt/dd carry nested markup (swatch dots,
       inline t-code) — KSpecList's row.key/values are plain-text only.
     - the "Scope" card__heading — it uses h4.t-subtitle, KCardHeading
       always emits h3.t-title.
     - every <button> — KButton always stamps type="button"; this
       oracle's buttons (outside the FABs) do not carry it.
     - every switch — KSwitch wraps its label text in an extra
       <span class="t-caption"> and drops t-caption off the label
       itself, which this oracle's bare-text-node labels do not carry.
     - the read-only Ratio/Memo/Call/Notes field rows — KFieldRow's
       root is a <div>, this oracle's rows are <label>.
     - the plain field with the fake caret — KField always stamps a
       value attribute (empty string by default), which this oracle's
       placeholder-only input does not carry.
     - the code block paragraph — KCode's block variant emits
       <pre class="t-code t-code--block">, this oracle uses
       <p class="t-code--block t-caption">.
     - the deck (.deck > .deck-card) and the signoff block — no K
       component owns either shape (useDeck is the composable port for
       deck behavior, wired here on mount; KSignoff/KStat only support
       one line per stat, this oracle groups two per block).
     - the three FAB buttons and their inline hamburger icon — no K
       component, and the icon's self-closed <rect> children need the
       v-html trick (Vue emits a matching closing tag for non-void SVG
       elements) also used in 06-person-page.vue and pattern-narrow.vue.
     - the comment threads inside "Comments" — same raw shape as
       pattern-comment-thread.vue / pattern-comments-group.vue, the
       structure useCommentFlow's builders construct at runtime.
     - the &check;/&times; entities (resolved stamp, opening's "3x jump",
       motion's "200ms x ease-out") — a plain text run is HTML-entity-
       decoded by the template compiler then re-serialized as the raw
       glyph, byte-diverging from this oracle's literal entities, so
       those runs go through v-html instead (same trick as the FAB icon).
   data-can-approve, data-resolved, data-archived, data-message-id,
   data-author-role are kit.js/useCommentFlow-only attributes reproduced
   here purely for SSR parity; no Vue component in this kit emits them. */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import {
  KApp,
  KSidebar,
  KSidebarNav,
  KBook,
  KBookSection,
  KInspector,
  KInspectorGroup,
  KCard,
  KCardHeading,
  KCardBody,
  KCardCollapsible,
  KCardStack,
  KCode,
  KList,
  KQuote,
  KFigure,
  KTag,
  KField,
  KSpecList,
  KCommentStack,
  useDeck,
} from '@konstantinopolskii/vue'

const weightRows = [
  { key: 'Regular', values: ['reads too thin at 400', 'Regular sits on 500.'] },
  { key: 'Medium', values: ['subtitle under display', '500, paired with bold 700 headline.'] },
  { key: 'Bold', values: ['headings, labels', '700, one step up from the 500 body.'] },
]

const bodyDeckEl = ref<HTMLElement | null>(null)
const inspectorDeckEl = ref<HTMLElement | null>(null)
let disposeBodyDeck: (() => void) | undefined
let disposeInspectorDeck: (() => void) | undefined

onMounted(() => {
  if (bodyDeckEl.value) disposeBodyDeck = useDeck(bodyDeckEl.value)
  if (inspectorDeckEl.value) disposeInspectorDeck = useDeck(inspectorDeckEl.value)
})
onBeforeUnmount(() => {
  disposeBodyDeck?.()
  disposeInspectorDeck?.()
})
</script>

<template>
  <KApp>
    <KSidebar title="Fundamental">
      <KSidebarNav />
      <template #footer>
        2026, kk.consulting<br />
        Fundamental demo
      </template>
    </KSidebar>

    <KBook id="doc">
      <KBookSection>
        <h1 class="t-hero">Fundamental</h1>
        <p class="t-body">
          Every atom the kit owns, composed the way the kit composes.
          A document that reads itself.
        </p>
        <p class="t-body">
          Seven parts, sidebar on the left, margin on the right. The
          middle column is what we read.
        </p>
      </KBookSection>

      <h2 class="book__part">Prose</h2>

      <KBookSection id="opening">
        <h2 class="t-display">
          Opening<br />
          <span class="t-display--medium t-muted">Hero, intro, part break</span>
        </h2>
        <p class="t-body">
          Commissioner is the only typeface. Regular sits on Medium
          500 so the body holds weight on screen. Bold is for
          headings and the short emphasis that earns it.
        </p>
        <p
          class="t-body"
          v-html="' The hero runs at &lt;span class=&quot;t-code&quot;&gt;66 / 66&lt;/span&gt;. Body at &lt;span class=&quot;t-code&quot;&gt;22 / 32&lt;/span&gt;. A 3&amp;times; jump between the two is what the kit calls radical contrast. '"
        ></p>
      </KBookSection>

      <KBookSection id="navigation">
        <h2 class="t-display">
          Navigation<br />
          <span class="t-display--medium t-muted">Sidebar TOC, scroll-spy, nav groups</span>
        </h2>
        <p class="t-body">
          The sidebar to the left carries the doc-internal TOC. Nav
          groups chunk one to nine items each. Scroll-spy tracks the
          active section; the indicator slides between rows on scroll.
        </p>
      </KBookSection>

      <KBookSection id="reading">
        <h2 class="t-display">
          Reading<br />
          <span class="t-display--medium t-muted">Body, caption, micro</span>
        </h2>
        <p class="t-body">
          Paragraphs set in body type. Over three sentences, the
          paragraph becomes a list or a spec card. This one holds
          three and stops.
        </p>
        <p class="t-caption">
          Caption sits at <KCode>16 / 24</KCode>. It is
          the workhorse inside cards.
        </p>
        <p class="t-micro t-muted">
          Micro is <KCode>14 / 20</KCode>, reserved for
          metadata and citations.
        </p>
      </KBookSection>

      <KBookSection id="lists">
        <h2 class="t-display">
          Lists<br />
          <span class="t-display--medium t-muted">Ordered, unordered, inline</span>
        </h2>
        <p class="t-body">
          An unordered list for items where order carries no weight.
          A numbered list for steps and rank. Both sit on the same
          rail.
        </p>

        <KList
          :items="[
            'Pure signal before decoration.',
            'Expected patterns cost nothing.',
            'Eighty to twenty at every nesting.',
            'Chunk past seven items.',
            'Radical contrast, one distinction step.',
          ]"
        />

        <KList
          ordered
          :items="[
            'Name the job before drawing.',
            'Reach for the closest kit component.',
            'Compose. Do not invent.',
            'Sign.',
          ]"
        />

        <p class="t-body">
          A sentence can carry an inline value like
          <KCode>--space-4</KCode> without breaking the
          rhythm. Numbers, tokens, and the occasional softer beat
          all sit on the same line.
        </p>
      </KBookSection>

      <KBookSection id="figures">
        <h2 class="t-display">
          Figures<br />
          <span class="t-display--medium t-muted">Quote, figure, citation</span>
        </h2>

        <KQuote cite="Konstantin Konstantinopolskii">
          Beauty is a side effect of clarity.
        </KQuote>

        <p class="t-body">
          A quote sits black at body weight with a 4 px left rail.
          Citation sits below in micro.
        </p>

        <KFigure caption="Signature, SVG, right-hand rail of every signoff.">
          <img :src="'../../signature.svg'" alt="Handwritten signature of Konstantin Konstantinopolskii" />
        </KFigure>
      </KBookSection>

      <KBookSection id="preview-frame">
        <h2 class="t-display">
          Preview frame<br />
          <span class="t-display--medium t-muted">Scaled iframe for doc surfaces</span>
        </h2>
        <p class="t-body">
          A clipped wrapper with an iframe rendering at 400% and
          scaling to 0.25. Kit docs only. Product prose does not
          embed iframes.
        </p>
      </KBookSection>

      <KBookSection id="registry-table">
        <h2 class="t-display">
          Registry table<br />
          <span class="t-display--medium t-muted">Dense two-column inventory</span>
        </h2>
        <p class="t-body">
          Resets browser table defaults, applies hairline borders and
          text tokens, keeps links inheriting surface type. First
          column reserves 30% width and forbids wrapping.
        </p>
      </KBookSection>

      <KBookSection id="spec-list">
        <h2 class="t-display">
          Spec list<br />
          <span class="t-display--medium t-muted">Key and value rows</span>
        </h2>
        <p class="t-body">
          The workhorse for key-value rows inside a card. Two, three,
          or four-column shapes only. Key cells render at Medium 500,
          full black.
        </p>
      </KBookSection>

      <h2 class="book__part">Spec</h2>

      <KBookSection id="material">
        <h2 class="t-display">
          Material<br />
          <span class="t-display--medium t-muted">No gradients, shadows, glass, blur</span>
        </h2>
        <p class="t-body">
          Depth comes from hierarchy and spacing, not from effects. Each
          skeuomorphic trick fakes light the screen cannot carry.
        </p>
      </KBookSection>

      <KBookSection id="color">
        <h2 class="t-display">
          Color<br />
          <span class="t-display--medium t-muted">Nine tokens</span>
        </h2>
        <p class="t-body">
          Two backgrounds, two surface tints, two hairlines, three
          text alphas. Text is black. Muted and subtle carry
          metadata only.
        </p>
        <KCard>
          <dl class="book__spec">
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="swatch"><span class="swatch__dot" style="background: var(--color-bg)"></span><span class="t-code">--color-bg</span></span></dt>
              <dd class="book__spec-value">Primary background. White.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="swatch"><span class="swatch__dot" style="background: var(--color-bg-muted)"></span><span class="t-code">--color-bg-muted</span></span></dt>
              <dd class="book__spec-value">Soft frame outside the app.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="swatch"><span class="swatch__dot" style="background: var(--color-surface-overlay)"></span><span class="t-code">--color-surface-overlay</span></span></dt>
              <dd class="book__spec-value">The 3% overlay. Hover, focus, active share it.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="swatch"><span class="swatch__dot" style="background: var(--color-surface-strong)"></span><span class="t-code">--color-surface-strong</span></span></dt>
              <dd class="book__spec-value">Row hover, button rest.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="swatch"><span class="swatch__dot" style="background: var(--color-border)"></span><span class="t-code">--color-border</span></span></dt>
              <dd class="book__spec-value">Hairline dividers.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="swatch"><span class="swatch__dot" style="background: var(--color-border-strong)"></span><span class="t-code">--color-border-strong</span></span></dt>
              <dd class="book__spec-value">Focus rings, deeper rules.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="swatch"><span class="swatch__dot" style="background: var(--color-text)"></span><span class="t-code">--color-text</span></span></dt>
              <dd class="book__spec-value">Primary text. Pure black.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="swatch"><span class="swatch__dot" style="background: var(--color-text-muted)"></span><span class="t-code">--color-text-muted</span></span></dt>
              <dd class="book__spec-value">Metadata: bylines, captions, hairlines.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="swatch"><span class="swatch__dot" style="background: var(--color-text-subtle)"></span><span class="t-code">--color-text-subtle</span></span></dt>
              <dd class="book__spec-value">Placeholders, softest labels.</dd>
            </div>
          </dl>
        </KCard>
      </KBookSection>

      <KBookSection id="space">
        <h2 class="t-display">
          Space<br />
          <span class="t-display--medium t-muted">A 4px grid</span>
        </h2>
        <p class="t-body">
          Every gap, padding, margin snaps to a multiple of 4. A
          <KCode>13px</KCode> gap means we need a
          different component.
        </p>
        <KCard>
          <KCardHeading title="Scale" />
          <dl class="book__spec book__spec--value">
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--space-1</span></dt>
              <dd class="book__spec-value"><span class="t-code">4px</span></dd>
              <dd class="book__spec-value">tag gaps, micro stacks.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--space-2</span></dt>
              <dd class="book__spec-value"><span class="t-code">8px</span></dd>
              <dd class="book__spec-value">tight adjacency.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--space-3</span></dt>
              <dd class="book__spec-value"><span class="t-code">12px</span></dd>
              <dd class="book__spec-value">card inset.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--space-4</span></dt>
              <dd class="book__spec-value"><span class="t-code">16px</span></dd>
              <dd class="book__spec-value">row to row.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--space-5</span></dt>
              <dd class="book__spec-value"><span class="t-code">20px</span></dd>
              <dd class="book__spec-value">section inner padding.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--space-6</span></dt>
              <dd class="book__spec-value"><span class="t-code">24px</span></dd>
              <dd class="book__spec-value">card gaps, text rail.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--space-7</span></dt>
              <dd class="book__spec-value"><span class="t-code">28px</span></dd>
              <dd class="book__spec-value">rare, when 24 reads cramped.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--space-8</span></dt>
              <dd class="book__spec-value"><span class="t-code">32px</span></dd>
              <dd class="book__spec-value">section to section.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--space-10</span></dt>
              <dd class="book__spec-value"><span class="t-code">40px</span></dd>
              <dd class="book__spec-value">block separation in long-form.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--space-12</span></dt>
              <dd class="book__spec-value"><span class="t-code">48px</span></dd>
              <dd class="book__spec-value">part breaks.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--space-15</span></dt>
              <dd class="book__spec-value"><span class="t-code">60px</span></dd>
              <dd class="book__spec-value">around the hero.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--space-20</span></dt>
              <dd class="book__spec-value"><span class="t-code">80px</span></dd>
              <dd class="book__spec-value">end of document.</dd>
            </div>
          </dl>
        </KCard>
      </KBookSection>

      <KBookSection id="type">
        <h2 class="t-display">
          Type<br />
          <span class="t-display--medium t-muted">One font, three weights, seven sizes</span>
        </h2>
        <p class="t-body">
          Commissioner. Regular 500, Medium 500, Bold 700. Seven
          sizes from hero down to micro.
        </p>

        <KCard>
          <KCardHeading title="Scale" />
          <dl class="book__spec book__spec--value">
            <div class="book__spec-row">
              <dt class="book__spec-key">Hero</dt>
              <dd class="book__spec-value"><span class="t-code">66 / 66</span></dd>
              <dd class="book__spec-value">the document's own title.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key">Display</dt>
              <dd class="book__spec-value"><span class="t-code">38 / 38</span></dd>
              <dd class="book__spec-value">section headings.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key">Body</dt>
              <dd class="book__spec-value"><span class="t-code">22 / 32</span></dd>
              <dd class="book__spec-value">long-form reading text.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key">Title</dt>
              <dd class="book__spec-value"><span class="t-code">22 / 28</span></dd>
              <dd class="book__spec-value">card headings.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key">Subtitle</dt>
              <dd class="book__spec-value"><span class="t-code">18 / 24</span></dd>
              <dd class="book__spec-value">nav headers, spec keys.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key">Caption</dt>
              <dd class="book__spec-value"><span class="t-code">16 / 24</span></dd>
              <dd class="book__spec-value">UI labels, body inside cards.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key">Micro</dt>
              <dd class="book__spec-value"><span class="t-code">14 / 20</span></dd>
              <dd class="book__spec-value">captions, citations, metadata.</dd>
            </div>
          </dl>
        </KCard>

        <KCard>
          <KCardHeading title="Weight rules" />
          <KSpecList variant="triple" :rows="weightRows" />
        </KCard>
      </KBookSection>

      <KBookSection id="radii">
        <h2 class="t-display">
          Radii<br />
          <span class="t-display--medium t-muted">Four values</span>
        </h2>
        <p class="t-body">
          <KCode>12 px</KCode> for buttons and fields,
          <KCode>16 px</KCode> for preview frames,
          <KCode>24 px</KCode> for cards,
          <KCode>9999 px</KCode> for pills and thumbs. A
          fifth radius is forbidden.
        </p>
      </KBookSection>

      <KBookSection id="motion">
        <h2 class="t-display">
          Motion<br />
          <span class="t-display--medium t-muted">Four easings, four durations</span>
        </h2>
        <p class="t-body">
          Default is <span class="t-code" v-html="'200ms &amp;times; ease-out'"></span>
          on transform and opacity. Reduced motion collapses every
          duration to <KCode>0.01ms</KCode>.
        </p>
        <KCard>
          <dl class="book__spec">
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--ease-out</span></dt>
              <dd class="book__spec-value">Hover, focus, state flips.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--ease-spring</span></dt>
              <dd class="book__spec-value">Switch thumbs, small confirmations.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--ease-swing</span></dt>
              <dd class="book__spec-value">Long reveals, column arrivals.</dd>
            </div>
            <div class="book__spec-row">
              <dt class="book__spec-key"><span class="t-code">--ease-in-out</span></dt>
              <dd class="book__spec-value">Motion that continues past the frame.</dd>
            </div>
          </dl>
        </KCard>
      </KBookSection>

      <h2 class="book__part">Controls</h2>

      <KBookSection id="cards">
        <h2 class="t-display">
          Cards<br />
          <span class="t-display--medium t-muted">Static, interactive, shout</span>
        </h2>
        <p class="t-body">
          Every widget is a card. Transparent at rest, 3% on touch.
          Three variants, one HTML shape.
        </p>

        <KCard>
          <KCardHeading title="Static card" subtitle="A caption under the title. Raw paragraphs pick up the 12px inset without a card__body wrapper." />
          <p class="t-caption">Transparent until a pointer enters.</p>
        </KCard>

        <KCard>
          <KCardHeading title="With body wrapper" />
          <KCardBody>
            <p class="t-caption">The card__body wrapper carries the 24px rail when the inner content is not a raw paragraph, list, or spec.</p>
            <p class="t-caption">Two lines, one rail.</p>
          </KCardBody>
        </KCard>

        <KCard :tight="true">
          <p class="t-caption">Tight card. Smaller inset, tighter gap. For dense stacks.</p>
        </KCard>

        <KCard variant="shout">
          <KCardHeading title="Shout card" subtitle="Inverted. One per column." :muted="true" />
          <p class="t-caption">Black surface, white content. Reserved for the one card that should interrupt the column.</p>
        </KCard>

        <KCard variant="heading">
          <h2 class="t-display">Heading card</h2>
        </KCard>
      </KBookSection>

      <KBookSection id="fields">
        <h2 class="t-display">
          Fields<br />
          <span class="t-display--medium t-muted">A row, a label, a value</span>
        </h2>
        <p class="t-body">
          A label and a value share one row. No box, no outline.
          Hover fills the row with 3%. Focus inverts to black with
          a white caret.
        </p>
        <KCard>
          <KField label="Base" row modelValue="16px" />
          <label class="field field--row">
            <span class="t-caption--bold field__label">Ratio</span>
            <span class="t-caption field__value">1.25</span>
          </label>
          <label class="field">
            <input class="t-caption field__input" type="text" placeholder="sofia@kk.consulting" />
            <span class="field__fake-caret" aria-hidden="true"></span>
          </label>
        </KCard>
      </KBookSection>

      <KBookSection id="buttons">
        <h2 class="t-display">
          Buttons<br />
          <span class="t-display--medium t-muted">Secondary, primary</span>
        </h2>
        <p class="t-body">
          Full-width by default, <KCode>12px</KCode>
          radius, bold label. Imperative verbs. One primary per
          card.
        </p>
        <KCard>
          <p class="t-caption">Pick a theme for the next document pass.</p>
          <button class="button t-subtitle">Pick tokens</button>
          <button class="button button--primary t-subtitle">Apply tokens</button>
        </KCard>
      </KBookSection>

      <KBookSection id="tags">
        <h2 class="t-display">
          Tags<br />
          <span class="t-display--medium t-muted">Metadata only</span>
        </h2>
        <p class="t-body">
          A tag labels a thing. If it looks clickable, reach for a
          button.
        </p>
        <KCard>
          <p class="t-caption">
            Version <KCode>v1.1.0</KCode> ships
            with <KCode>9</KCode> components and
            <KCode>0</KCode> brand colors.
          </p>
          <p class="t-caption">
            <KTag>Foundations</KTag>
            <KTag>9 components</KTag>
            <KTag>18 Apr '26</KTag>
            <KTag :bold="true">Signed</KTag>
          </p>
        </KCard>
      </KBookSection>

      <KBookSection id="code">
        <h2 class="t-display">
          Code<br />
          <span class="t-display--medium t-muted">Inline + block</span>
        </h2>
        <p class="t-body">
          One class for inline tokens, keywords, paths, durations, version
          tags. Surface chip, regular weight, muted text. The block variant
          carries a left rail for multi-line code paragraphs.
        </p>
        <KCard>
          <p class="t-caption">
            Use <KCode>.t-code</KCode> on a <KCode>span</KCode>
            to mark a token like <KCode>--space-4</KCode>
            or a duration like <KCode>200ms</KCode>.
          </p>
          <p class="t-code--block t-caption">
            git tag -a v1.3.0 -m "UI kit 1.3.0 — content architecture"<br />
            git push origin main<br />
            git push origin v1.3.0
          </p>
        </KCard>
      </KBookSection>

      <KBookSection id="switches">
        <h2 class="t-display">
          Switches<br />
          <span class="t-display--medium t-muted">Binary toggle</span>
        </h2>
        <p class="t-body">
          Off is the border tint, on is full text color. Use a
          switch when the change commits instantly.
        </p>
        <KCard>
          <label class="switch t-caption">
            <input type="checkbox" class="switch__input" checked />
            <span class="switch__track"></span>
            Color tokens
          </label>
          <label class="switch t-caption">
            <input type="checkbox" class="switch__input" checked />
            <span class="switch__track"></span>
            Type tokens
          </label>
          <label class="switch t-caption">
            <input type="checkbox" class="switch__input" />
            <span class="switch__track"></span>
            Motion tokens
          </label>
        </KCard>
      </KBookSection>

      <h2 class="book__part">Collections</h2>

      <KBookSection id="stack">
        <h2 class="t-display">
          Card stack<br />
          <span class="t-display--medium t-muted">One active, the rest minimized</span>
        </h2>
        <p class="t-body">
          Interactive cards stack vertically. One active at a time.
          Inactive cards collapse to heading and minimized button.
        </p>
        <KCardStack>
          <KCard variant="interactive" state="active">
            <KCardHeading title="Pick a direction" subtitle="Pick the direction for the next document pass." />
            <KCardCollapsible :flush="true">
              <label class="field field--row">
                <span class="t-caption--bold field__label">Name</span>
                <input class="t-caption field__input" type="text" placeholder="sofia@kk.consulting" />
              </label>
              <label class="field">
                <input class="t-caption field__input" type="text" placeholder="drop the shout card, tighten the stack" />
              </label>
            </KCardCollapsible>
            <button class="button t-subtitle" data-cta="minimized">Pick</button>
            <button class="button button--primary t-subtitle" data-cta="active">Apply direction</button>
          </KCard>
          <KCard variant="interactive">
            <KCardHeading title="Scope the change" subtitle="Name the tokens the agent may touch." />
            <KCardCollapsible :flush="true">
              <label class="switch t-caption">
                <input type="checkbox" class="switch__input" checked />
                <span class="switch__track"></span>
                Color tokens
              </label>
              <label class="switch t-caption">
                <input type="checkbox" class="switch__input" />
                <span class="switch__track"></span>
                Type tokens
              </label>
            </KCardCollapsible>
            <button class="button t-subtitle" data-cta="minimized">Choose</button>
            <button class="button button--primary t-subtitle" data-cta="active">Apply scope</button>
          </KCard>
          <KCard variant="interactive">
            <KCardHeading title="Commit the change" subtitle="Write the memo and ship." />
            <KCardCollapsible :flush="true">
              <label class="field">
                <input class="t-caption field__input" type="text" placeholder="v1.2.0. stack tightened, shout demoted" />
              </label>
            </KCardCollapsible>
            <button class="button t-subtitle" data-cta="minimized">Draft</button>
            <button class="button button--primary t-subtitle" data-cta="active">Ship the change</button>
          </KCard>
        </KCardStack>
      </KBookSection>

      <KBookSection id="comment">
        <h2 class="t-display">
          Comment<br />
          <span class="t-display--medium t-muted">Draft and thread</span>
        </h2>
        <p class="t-body">
          Two shapes, one pattern. Draft uses the shout variant.
          Thread uses the interactive card with a collapsible reveal.
          Kebab menu carries Approve, Reply, Archive thread, Delete.
          Runtime events live in
          <KCode>docs/integration/comment.md</KCode>.
        </p>
      </KBookSection>

      <KBookSection id="deck">
        <h2 class="t-display">
          Deck<br />
          <span class="t-display--medium t-muted">Browse without consequence</span>
        </h2>
        <p class="t-body">
          A horizontal stack. One card active, the rest fanned back
          in perspective. Live inside a shout card.
        </p>
        <KCard variant="shout">
          <div class="deck" ref="bodyDeckEl">
            <div class="deck-card active">
              <p class="t-caption--bold">Monochrome</p>
              <p class="t-caption">Pure black on white. Nine tokens, no brand.</p>
              <button class="tag deck-card__select" type="button">Choose</button>
            </div>
            <div class="deck-card">
              <p class="t-caption--bold">Muted warm</p>
              <p class="t-caption">Same tokens, 2% warm tint in neutrals.</p>
              <button class="tag deck-card__select" type="button">Choose</button>
            </div>
            <div class="deck-card">
              <p class="t-caption--bold">Cool gray</p>
              <p class="t-caption">Slight blue cast in the neutral scale.</p>
              <button class="tag deck-card__select" type="button">Choose</button>
            </div>
            <div class="deck-card">
              <p class="t-caption--bold">High contrast</p>
              <p class="t-caption">Pure black text, borders at 20%.</p>
              <button class="tag deck-card__select" type="button">Choose</button>
            </div>
            <div class="deck-card">
              <p class="t-caption--bold">Ink</p>
              <p class="t-caption">Inverted. White on black. Full system.</p>
              <button class="tag deck-card__select" type="button">Choose</button>
            </div>
          </div>
        </KCard>
      </KBookSection>

      <h2 class="book__part">Margin</h2>

      <KBookSection id="signoff">
        <h2 class="t-display">
          Signoff<br />
          <span class="t-display--medium t-muted">Stats, byline, signature</span>
        </h2>
        <p class="t-body">
          The canonical ending. Stats sit on the left rail. Byline
          and signature close the document on the right.
        </p>
        <div class="book__signoff">
          <div class="book__signoff-stats">
            <div class="stat t-caption">
              <div><span class="t-caption--bold">9</span> components in the kit.</div>
              <div><span class="t-caption--bold">9</span> color tokens, and not one more.</div>
            </div>
            <div class="stat t-caption">
              <div><span class="t-caption--bold">12</span> spacing tokens on a 4px grid.</div>
              <div><span class="t-caption--bold">7</span> type sizes, three weights.</div>
            </div>
          </div>
          <div class="book__signoff-signature">
            <p class="t-caption">
              Signed by
              <span class="t-caption--bold">Konstantin Konstantinopolskii,<br /></span>
              founder at
              <span class="t-caption--bold">kk.consulting<br /></span>
              <span class="t-muted">23 April '26 at 17:30 Tbilisi Time.</span>
            </p>
            <img class="book__signoff-signature-img" :src="'../../signature.svg'" alt="Handwritten signature of Konstantin Konstantinopolskii" />
          </div>
        </div>
      </KBookSection>
    </KBook>

    <KInspector>
      <KInspectorGroup>
        <KCard variant="heading">
          <h2 class="t-display">Tweak</h2>
        </KCard>

        <KCard variant="interactive" state="active">
          <KCardHeading title="Tweak the tokens" subtitle="Brief the agent, pick a direction, scope, commit." />
          <KCardCollapsible :flush="true">
            <div class="deck" ref="inspectorDeckEl">
              <div class="deck-card active">
                <p class="t-caption--bold">Monochrome</p>
                <p class="t-caption">Pure black on white. Nine tokens, no brand.</p>
                <button class="tag deck-card__select" type="button">Choose</button>
              </div>
              <div class="deck-card">
                <p class="t-caption--bold">Muted warm</p>
                <p class="t-caption">Same tokens, 2% warm tint in neutrals.</p>
                <button class="tag deck-card__select" type="button">Choose</button>
              </div>
              <div class="deck-card">
                <p class="t-caption--bold">Ink</p>
                <p class="t-caption">Inverted. White on black.</p>
                <button class="tag deck-card__select" type="button">Choose</button>
              </div>
            </div>

            <label class="switch t-caption">
              <input type="checkbox" class="switch__input" checked />
              <span class="switch__track"></span>
              Color tokens
            </label>
            <label class="switch t-caption">
              <input type="checkbox" class="switch__input" />
              <span class="switch__track"></span>
              Type tokens
            </label>

            <div class="card__heading">
              <h4 class="t-subtitle">Scope</h4>
              <p class="t-caption">Token sets the agent may touch.</p>
            </div>

            <label class="field">
              <input class="t-caption field__input" type="text" placeholder="bump radius to 16, leave weights alone" />
            </label>

            <label class="field field--row">
              <span class="t-caption--bold field__label">Version</span>
              <input class="t-caption field__input" type="text" value="v1.2.0" />
            </label>
          </KCardCollapsible>

          <button class="button t-subtitle" data-cta="minimized">Configure</button>
          <button class="button button--primary t-subtitle" data-cta="active">Apply tweak</button>
        </KCard>

        <KCard variant="interactive">
          <KCardHeading title="Templates" subtitle="Saved configurations from earlier tweaks." />
          <KCardCollapsible :flush="true">
            <label class="field field--row">
              <span class="t-caption--bold field__label">Memo</span>
              <span class="t-caption field__value">monochrome, bold</span>
            </label>
            <label class="field field--row">
              <span class="t-caption--bold field__label">Call</span>
              <span class="t-caption field__value">muted warm, balanced</span>
            </label>
            <label class="field field--row">
              <span class="t-caption--bold field__label">Notes</span>
              <span class="t-caption field__value">high contrast, bold</span>
            </label>
          </KCardCollapsible>
          <button class="button t-subtitle" data-cta="minimized">Browse</button>
          <button class="button button--primary t-subtitle" data-cta="active">Apply template</button>
        </KCard>
      </KInspectorGroup>

      <KInspectorGroup>
        <KCard variant="heading">
          <h2 class="t-display">Comments</h2>
        </KCard>

        <KCommentStack>
          <KCard variant="interactive" class="comment-thread" data-can-approve="true">
            <div class="comment-thread__preview">
              <div class="comment-msg" data-message-id="m-01">
                <div class="comment-msg__header">
                  <div class="t-subtitle">Sofia Hlazunova</div>
                  <button class="comment__menu" type="button" aria-label="Message actions" aria-expanded="false"><span></span></button>
                </div>
                <p class="t-caption">The tag row needs one more variant to cover the metadata case.</p>
                <div class="comment__menu-popover" role="menu">
                  <button class="comment__menu-item comment__menu-item--approve t-caption" type="button" role="menuitem">Approve</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Edit</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Reply</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Archive thread</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Delete</button>
                </div>
              </div>
              <div class="comment-thread__ellipsis" aria-hidden="true">
                <span></span><span></span><span></span>
              </div>
              <div class="comment-msg" data-message-id="m-03" data-author-role="agent">
                <div class="comment-msg__header">
                  <div class="t-subtitle">Claude</div>
                  <button class="comment__menu" type="button" aria-label="Message actions" aria-expanded="false"><span></span></button>
                </div>
                <p class="t-caption">Added a bold tag at the end of the row. Take a look.</p>
                <div class="comment__menu-popover" role="menu">
                  <button class="comment__menu-item comment__menu-item--approve t-caption" type="button" role="menuitem">Approve</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Edit</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Reply</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Archive thread</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Delete</button>
                </div>
              </div>
            </div>
            <KCardCollapsible :flush="true">
              <div class="comment-thread__list">
                <div class="comment-msg" data-message-id="m-01">
                  <div class="comment-msg__header">
                    <div class="t-subtitle">Sofia Hlazunova</div>
                    <button class="comment__menu" type="button" aria-label="Message actions" aria-expanded="false"><span></span></button>
                  </div>
                  <p class="t-caption">The tag row needs one more variant to cover the metadata case.</p>
                  <div class="comment__menu-popover" role="menu">
                    <button class="comment__menu-item comment__menu-item--approve t-caption" type="button" role="menuitem">Approve</button>
                    <button class="comment__menu-item t-caption" type="button" role="menuitem">Edit</button>
                    <button class="comment__menu-item t-caption" type="button" role="menuitem">Reply</button>
                    <button class="comment__menu-item t-caption" type="button" role="menuitem">Archive thread</button>
                    <button class="comment__menu-item t-caption" type="button" role="menuitem">Delete</button>
                  </div>
                </div>
                <div class="comment-msg" data-message-id="m-02">
                  <div class="comment-msg__header">
                    <div class="t-subtitle">Konstantin Konstantinopolskii</div>
                    <button class="comment__menu" type="button" aria-label="Message actions" aria-expanded="false"><span></span></button>
                  </div>
                  <p class="t-caption">Claude, add a bold tag to the row.</p>
                  <div class="comment__menu-popover" role="menu">
                    <button class="comment__menu-item comment__menu-item--approve t-caption" type="button" role="menuitem">Approve</button>
                    <button class="comment__menu-item t-caption" type="button" role="menuitem">Edit</button>
                    <button class="comment__menu-item t-caption" type="button" role="menuitem">Reply</button>
                    <button class="comment__menu-item t-caption" type="button" role="menuitem">Archive thread</button>
                    <button class="comment__menu-item t-caption" type="button" role="menuitem">Delete</button>
                  </div>
                </div>
                <div class="comment-msg" data-message-id="m-03" data-author-role="agent">
                  <div class="comment-msg__header">
                    <div class="t-subtitle">Claude</div>
                    <button class="comment__menu" type="button" aria-label="Message actions" aria-expanded="false"><span></span></button>
                  </div>
                  <p class="t-caption">Added a bold tag at the end of the row. Take a look.</p>
                  <div class="comment__menu-popover" role="menu">
                    <button class="comment__menu-item comment__menu-item--approve t-caption" type="button" role="menuitem">Approve</button>
                    <button class="comment__menu-item t-caption" type="button" role="menuitem">Edit</button>
                    <button class="comment__menu-item t-caption" type="button" role="menuitem">Reply</button>
                    <button class="comment__menu-item t-caption" type="button" role="menuitem">Archive thread</button>
                    <button class="comment__menu-item t-caption" type="button" role="menuitem">Delete</button>
                  </div>
                </div>
              </div>
              <label class="field comment-thread__reply">
                <input class="t-caption field__input" type="text" placeholder="looks right now, thank you" />
                <span class="field__fake-caret" aria-hidden="true"></span>
              </label>
            </KCardCollapsible>
          </KCard>

          <KCard variant="interactive" class="comment-thread" data-resolved="true" data-state="minimized">
            <div class="comment-thread__preview">
              <div class="comment-thread__resolved">
                <span class="comment-thread__resolved-stamp t-caption" aria-hidden="true" v-html="'&amp;check;'"></span>
                <span class="comment-thread__resolved-snippet t-caption">The signoff timestamp should carry the timezone.</span>
                <span class="comment-thread__resolved-byline t-caption t-muted">Konstantin Konstantinopolskii</span>
              </div>
            </div>
          </KCard>

          <KCard variant="interactive" class="comment-thread" data-archived="true">
            <div class="comment-thread__preview">
              <div class="comment-msg" data-message-id="m-99">
                <div class="comment-msg__header">
                  <div class="t-subtitle">Sofia Hlazunova</div>
                  <button class="comment__menu" type="button" aria-label="Message actions" aria-expanded="false"><span></span></button>
                </div>
                <p class="t-caption">Early tag sizing notes. Superseded by v1.1.</p>
                <div class="comment__menu-popover" role="menu">
                  <button class="comment__menu-item comment__menu-item--approve t-caption" type="button" role="menuitem">Approve</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Edit</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Reply</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Archive thread</button>
                  <button class="comment__menu-item t-caption" type="button" role="menuitem">Delete</button>
                </div>
              </div>
            </div>
          </KCard>
        </KCommentStack>
      </KInspectorGroup>
    </KInspector>
  </KApp>

  <button class="fab fab--nav" data-view-target="nav" type="button" aria-label="Navigation">
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      aria-hidden="true"
      v-html="'&lt;rect width=&quot;18&quot; height=&quot;2&quot; rx=&quot;1&quot; fill=&quot;currentColor&quot;/&gt;&lt;rect y=&quot;6&quot; width=&quot;18&quot; height=&quot;2&quot; rx=&quot;1&quot; fill=&quot;currentColor&quot;/&gt;&lt;rect y=&quot;12&quot; width=&quot;18&quot; height=&quot;2&quot; rx=&quot;1&quot; fill=&quot;currentColor&quot;/&gt;'"
    ></svg>
  </button>
  <button class="fab fab--inspector" data-view-target="inspector" type="button" aria-label="Comments">
    <span class="fab__count">2</span>
  </button>
  <button class="fab fab--comment" type="button" aria-label="Add a comment">Add a comment</button>
</template>
