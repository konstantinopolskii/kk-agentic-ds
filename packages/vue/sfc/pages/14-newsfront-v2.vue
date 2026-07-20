<script setup lang="ts">
/* SFC twin of demos/reference-recreations/14-newsfront-v2.vue.js, itself
   the h() twin of the frozen static demos/reference-recreations/14-newsfront-v2.html.
   Kit components where the shape matches (KApp/KFront/KFrontRail/
   KFrontDesks/KCard/KCardHeading/KMedia/KFigure/KButton/KFieldRow); raw
   markup for the masthead (static uses t-poster, not the t-hero
   KFrontMasthead hardcodes), the glyph specimen inside the figure
   (lab.css bespoke markup, no matching component), the lead card's
   oversized heading (h2.t-display + p.t-body, not KCardHeading's
   h3/t-caption), and the rail's plain media links (no figure element
   at all, which KMedia cannot omit). Pixel-parity target: 0 against
   the static twin. */
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
} from '@konstantinopolskii/vue'

</script>

<template>
  <KApp view="front">
    <KFront>
      <header class="front__masthead">
        <h1 class="t-poster">The Specimen</h1>
        <p class="t-micro t-muted">Design's daily record · Friday, July 18, 2026 · Issue 214</p>
      </header>

      <KCard variant="link" href="#" :lead="true">
        <KFigure caption="Proof sheet: Commissioner across the weight axis, for The Specimen">
          <div
            class="specimen"
            role="img"
            aria-label="Glyph proof sheet: eight Commissioner glyphs across the weight axis, one cell inverted"
          >
            <span style="font-weight: 200">A</span>
            <span style="font-weight: 400">G</span>
            <span class="specimen--ink" style="font-weight: 700">Q</span>
            <span style="font-weight: 900">R</span>
            <span style="font-weight: 200">a</span>
            <span style="font-weight: 400">g</span>
            <span style="font-weight: 700">e</span>
            <span style="font-weight: 900">&amp;</span>
          </div>
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
