<script setup lang="ts">
/* SFC twin of demos/reference-recreations/06-person-page.vue.js, itself
   the h() twin of the frozen static
   demos/reference-recreations/06-person-page.html. Same DOM, kit
   components where they exist, raw markup for the bespoke variants
   (book__section--fill and book__section--stage have no component prop)
   and for the hand-drawn SVG portrait / caption markup that has no
   matching component. The SVG's inner <path> elements are self-closed
   (XML/SVG style) in the static twin; Vue's SSR renderer always emits a
   matching closing tag for non-void elements, so the paths are injected
   via v-html (literal string) to keep the SSR byte output identical to
   the static twin. */
import { KApp, KBook, KBookSection, KCard, KFigure, KChipWrap, KChip, KDataTable, KDataCell } from '@konstantinopolskii/vue'

const columns = [{ label: 'Film' }, { label: 'Year', num: true }, { label: 'Rating', num: true }]
</script>

<template>
  <KApp view="single">
    <KBook id="doc">
      <article class="book__section book__section--fill book__section--stage">
        <KCard variant="shout">
          <KFigure>
            <svg
              viewBox="0 0 440 330"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              stroke-width="1"
              fill="none"
              aria-hidden="true"
              v-html="'&lt;g transform=&quot;translate(20,15)&quot;&gt;&lt;path d=&quot;M255,45 C225,40 200,52 190,78 C185,92 195,98 188,113 C182,126 172,122 162,136 C152,150 148,158 166,164 C176,168 168,177 170,184 C173,192 187,193 185,202 C183,210 176,212 178,222 C180,233 196,239 206,251 C214,261 220,270 224,284&quot;/&gt;&lt;path d=&quot;M255,45 C288,50 308,72 313,98 C318,124 302,138 308,163 C312,183 298,194 293,214&quot;/&gt;&lt;path d=&quot;M188,101 C196,97 206,98 212,104&quot;/&gt;&lt;path d=&quot;M224,284 C254,277 296,279 328,268&quot;/&gt;&lt;/g&gt;'"
            ></svg>
          </KFigure>
          <div>
            <h1 class="t-hero">Margot Robbie</h1>
            <p class="t-caption"><span class="t-caption--bold">8 of 32</span> <span class="t-muted">movies watched</span></p>
            <p class="t-caption"><span class="t-caption--bold">195 151</span> <span class="t-muted">fans on Must</span></p>
            <p class="t-caption"><span class="t-caption--bold">7.6</span> <span class="t-muted">average rating</span></p>
          </div>
        </KCard>
      </article>

      <KBookSection id="filmography">
        <h2 class="t-display">Filmography</h2>
        <KChipWrap>
          <KChip :pressed="true">All</KChip>
          <KChip :pressed="false">Want</KChip>
          <KChip :pressed="false">Watched</KChip>
        </KChipWrap>
        <KDataTable :columns="columns">
          <tr>
            <KDataCell lead>The Wolf of Wall Street</KDataCell>
            <KDataCell num>2013</KDataCell>
            <KDataCell num>8.2</KDataCell>
          </tr>
          <tr>
            <KDataCell lead>Suicide Squad</KDataCell>
            <KDataCell num>2016</KDataCell>
            <KDataCell num>5.9</KDataCell>
          </tr>
          <tr>
            <KDataCell lead>I, Tonya</KDataCell>
            <KDataCell num>2017</KDataCell>
            <KDataCell num>7.5</KDataCell>
          </tr>
          <tr>
            <KDataCell lead>Once Upon a Time in Hollywood</KDataCell>
            <KDataCell num>2019</KDataCell>
            <KDataCell num>7.6</KDataCell>
          </tr>
          <tr>
            <KDataCell lead>Barbie</KDataCell>
            <KDataCell num>2023</KDataCell>
            <KDataCell num>6.9</KDataCell>
          </tr>
        </KDataTable>
      </KBookSection>

      <KBookSection id="about">
        <h2 class="t-display">About</h2>
        <p class="t-body">Margot Robbie started acting on the Australian soap opera Neighbours in 2008 and moved to Los Angeles in 2011.</p>
        <p class="t-body">She co-founded the production company LuckyChap Entertainment in 2014, with producing credits on Promising Young Woman, Saltburn, and Barbie.</p>
      </KBookSection>
    </KBook>
  </KApp>
</template>
