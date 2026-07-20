<script setup lang="ts">
/* SFC twin of demos/reference-recreations/13-blogpost.vue.js, itself the
   h() twin of the frozen static demos/reference-recreations/13-blogpost.html.
   Same DOM, kit components where they exist, raw markup for the bespoke
   bits: the diagram's SVG has no matching component, and its <line>/
   <circle>/<polyline> marks are self-closed with no children in the
   static markup — non-void elements, so Vue's SSR renderer would always
   pair them with a separate closing tag the static text never has (same
   irreducible gap as the SVG <path> self-closes in 06-person-page). They
   stay one literal v-html string. The signoff signature paragraph is
   hand-built (not KSignoff): the static markup's line-wrapped source
   collapses to stray single spaces around "Signed by" / "founder at"
   that KSignoff's template doesn't reproduce — reproduced verbatim as
   plain template markup with the same leading spaces, not v-html. */
import { KBook, KBookSection, KMedia, KQuote, KFigure, KList, KStat } from '@konstantinopolskii/vue'

const diagramMarksHtml =
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
  '<text x="620" y="196" font-size="11" fill="currentColor" stroke="none" text-anchor="middle">1.11.0</text>'
</script>

<template>
  <KBook id="doc">
    <KBookSection>
      <p class="t-micro t-muted">Design systems</p>
      <h1 class="t-hero">The kit grows patterns, not vocabulary</h1>
      <p class="t-title">The token count, the component count, and the forbidden list stay fixed by design, even as the pattern count keeps climbing.</p>
      <KMedia title="Konstantin Konstantinopolskii" meta="July 17, 2026 · 6 min read" :micro="true" initials="KK" />
    </KBookSection>

    <KBookSection id="budget">
      <h2 class="t-display">The element budget stays fixed</h2>
      <p class="t-body">The kit ships nine color tokens, three font weights across seven sizes, four corner radii, and twelve spacing steps. Release notes add new patterns and new rows to the component registry. They do not add columns to vars.css.</p>
      <p class="t-body">A tenth token means editing vars.css, tokens.json, and the forbidden list in the same commit, then checking every consuming product that assumed nine. The evolve protocol exists to make that cost visible before a maintainer signs off, not after a product breaks downstream.</p>
    </KBookSection>

    <KBookSection id="pattern-requests">
      <h2 class="t-display">Most component requests are pattern requests</h2>
      <KQuote cite="Priya Chandrasekaran, design lead">
        A new component is a permanent tax on every review that follows it. Most requests for one disappear the moment you ask which pattern already carries the job.
      </KQuote>
    </KBookSection>

    <KBookSection id="rules">
      <h2 class="t-display">Three rules keep the count honest</h2>
      <KFigure>
        <svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1" fill="none" aria-hidden="true" v-html="diagramMarksHtml"></svg>
        <figcaption>Three points on the kit's own timeline. Token count and component count hold flat; pattern count is the only line that climbs.</figcaption>
      </KFigure>
      <KList>
        <li>A new component ships only once three separate products ask for it.</li>
        <li>Every addition updates the forbidden list and the registry table in one commit.</li>
        <li>A pattern recombines existing components; it never introduces a class the registry doesn't already carry.</li>
      </KList>
    </KBookSection>

    <KBookSection id="related">
      <h2 class="t-display">Related</h2>
      <KMedia href="#" :square="true" title="The chart policy has no exceptions" meta="June 2, 2026 · 5 min read" :micro="true" />
      <KMedia href="#" :square="true" title="Sentence case is a discipline" meta="June 19, 2026 · 4 min read" :micro="true" />
      <KMedia href="#" :square="true" title="Why only the middle column scrolls" meta="July 8, 2026 · 5 min read" :micro="true" />
    </KBookSection>

    <div class="book__signoff">
      <div class="book__signoff-stats">
        <KStat value="4" text="drafts before this one." />
        <KStat value="0" text="new components proposed." />
      </div>
      <div class="book__signoff-signature">
        <p class="t-caption"> Signed by <span class="t-caption--bold">Konstantin Konstantinopolskii,</span><br /> founder at <span class="t-caption--bold">kk.consulting</span><br /><span class="t-muted">2026-07-17, single-column reading shell.</span></p>
        <img class="book__signoff-signature-img" :src="'../../signature.svg'" alt="Signature" />
      </div>
    </div>
  </KBook>
</template>
