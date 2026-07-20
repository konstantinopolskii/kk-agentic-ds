<script setup lang="ts">
/* SFC twin of demos/reference-recreations/14-newsfront.vue.js, itself the
   h() twin of the frozen static demos/reference-recreations/14-newsfront.html.
   Same DOM, kit shells/cards where they match exactly. The lead card's
   heading (h2.t-display + p.t-body) and the rail's plain media anchors
   (no figure/avatar) have no matching component shape, so those stay
   raw markup. Pixel-parity target: 0 against the static twin. */
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
} from '@konstantinopolskii/vue'

/* Vue SSR always emits paired close tags (<rect ...></rect>); the
   static markup self-closes every shape (<rect ... />) with no
   children — non-void elements, so the paired closing tag is an
   irreducible extra the gate's self-close normalization (void
   elements only) doesn't cover. Same fix as 13-blogpost.vue /
   06-person-page.vue: one raw v-html string. */
const leadSvgMarksHtml =
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
  '<circle cx="560" cy="270" r="52" fill="none" stroke="currentColor" stroke-width="1" />'
</script>

<template>
  <KApp view="front">
    <KFront>
      <header class="front__masthead">
        <h1 class="t-hero">The Specimen</h1>
        <p class="t-micro t-muted">Design's daily record · Friday, July 18, 2026 · Issue 214</p>
      </header>

      <KCard variant="link" href="#" :lead="true">
        <KFigure caption="Specimen sheet: Studio Ostra for The Specimen">
          <svg
            viewBox="0 0 640 360"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Abstract specimen sheet: one filled glyph block among outlined ones"
            v-html="leadSvgMarksHtml"
          ></svg>
        </KFigure>
        <p class="t-micro t-muted">Tooling · Exclusive</p>
        <div class="card__heading">
          <h2 class="t-display">Rill ships an agent-readable component format</h2>
          <p class="t-body">Every component now exports as structured JSON next to the visual file, and three plugin makers say the bridge from design to code just lost weeks of glue work. The format lands in the stable channel Monday; the spec is open from day one.</p>
        </div>
        <KMedia title="Renata Sokol" meta="Today, 09:40 · 6 min read" :micro="true" initials="RS" />
        <KButton as="span">Read the story</KButton>
      </KCard>

      <KFrontRail title="Latest">
        <a class="media" href="#">
          <div class="media__body">
            <p class="t-caption--bold">Two foundries settle the variable-font licensing dispute</p>
            <p class="t-micro t-muted">10:12 · Type</p>
          </div>
        </a>
        <a class="media" href="#">
          <div class="media__body">
            <p class="t-caption--bold">Regulator rules a retailer's checkout fails contrast standards</p>
            <p class="t-micro t-muted">09:55 · Accessibility</p>
          </div>
        </a>
        <a class="media" href="#">
          <div class="media__body">
            <p class="t-caption--bold">Two token-format specs merge into one open standard</p>
            <p class="t-micro t-muted">09:20 · Tooling</p>
          </div>
        </a>
        <a class="media" href="#">
          <div class="media__body">
            <p class="t-caption--bold">A 40-year-old branding studio closes its Chicago office</p>
            <p class="t-micro t-muted">08:41 · Business</p>
          </div>
        </a>
        <a class="media" href="#">
          <div class="media__body">
            <p class="t-caption--bold">Design-hiring budgets flat for a third year, survey finds</p>
            <p class="t-micro t-muted">08:05 · Business</p>
          </div>
        </a>
        <KCard>
          <KCardHeading title="The numbers" />
          <KFieldRow label="Foundry deals, YTD">14 <span class="t-caption--bold">↑ 4</span></KFieldRow>
          <KFieldRow label="Median design salary">$118K <span class="t-caption--bold">↑ 2%</span></KFieldRow>
          <KFieldRow label="Open design roles">8 210 <span class="t-caption--bold">↓ 6%</span></KFieldRow>
        </KCard>
      </KFrontRail>

      <KFrontDesks>
        <KCard variant="link" href="#">
          <p class="t-micro t-muted">Product</p>
          <KCardHeading
            title="A prototyping tool adds native voice-interface previews"
            subtitle="The beta reaches every paid seat next month; early testers already script full call flows."
          />
          <KButton as="span">Open product</KButton>
        </KCard>
        <KCard variant="link" href="#">
          <p class="t-micro t-muted">Craft</p>
          <div class="card__heading">
            <h3 class="t-title">Drawing a typeface for low vision took six months of testing</h3>
            <p class="t-caption">Every counter and stroke answered to readers, not to the designer's eye.</p>
          </div>
          <KButton as="span">Open craft</KButton>
        </KCard>
        <KCard variant="link" href="#">
          <p class="t-micro t-muted">Field notes</p>
          <KCardHeading
            title="Inside the studio that still ships everything on paper first"
            subtitle="Sketchbooks outnumber laptops three to one on this floor, and the work shows it."
          />
          <KButton as="span">Open field notes</KButton>
        </KCard>
      </KFrontDesks>
    </KFront>
  </KApp>
</template>
