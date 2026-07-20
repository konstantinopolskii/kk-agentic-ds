<script setup lang="ts">
/* SFC twin of demos/reference-recreations/03-identity-hero.vue.js, itself
   the h() twin of the frozen static demos/reference-recreations/03-identity-hero.html.
   Same DOM: kit components where markup matches exactly, raw markup for
   metric-row (no wrapper component) and the one metric with a rich delta
   (nested span, KMetric's delta prop is string-only), and the plain
   button in the Now card (static omits type="button", KButton always
   stamps it). */
import { KApp, KBook, KBookSection, KMedia, KMetric, KQuote, KCard, KCardHeading } from '@konstantinopolskii/vue'
</script>

<template>
  <KApp view="single">
    <KBook id="doc">
      <KBookSection>
        <KMedia
          title="Kostia Konstantinopolskii"
          meta="kk.consulting, Amsterdam, since 2012"
          initials="KK"
        />
        <p class="t-title">Growth expert. 30K MAU app owner. $1M+ B2B cases. 18 mentees holding $700K ARR. Two cats.</p>
      </KBookSection>

      <KBookSection id="founder">
        <h1 class="t-hero">Founder</h1>
        <p class="t-title">Scaling a self-built budgeting app from 30K users toward 1M. Fully self-funded.</p>
        <div class="metric-row">
          <div class="metric">
            <p class="metric__value">30K</p>
            <p class="metric__label">Users monthly</p>
            <p class="metric__delta">↑ 100% <span class="t-muted">organic</span></p>
          </div>
          <KMetric value="5K" label="Users daily" />
          <KMetric value="4.7" label="From 1 000+ reviews" />
        </div>
        <p class="t-caption t-muted">Top-12 budget apps, featured by T-Bank.</p>
      </KBookSection>

      <KBookSection id="strategist">
        <h2 class="t-display">Strategist</h2>
        <p class="t-title">Growth strategy for B2B products that already work and want to grow up.</p>
        <div class="metric-row">
          <KMetric value="$1M+" label="Case value delivered" />
          <KMetric value="14" label="Years in product" />
          <KMetric value="9" label="Ventures built" />
        </div>
        <p class="t-caption t-muted">Strategy sprints, growth audits, and the numbers to defend both.</p>
      </KBookSection>

      <KBookSection id="mentor">
        <h2 class="t-display">Mentor</h2>
        <p class="t-title">Founders through the jump from first revenue to a business that holds.</p>
        <div class="metric-row">
          <KMetric value="18" label="Mentees today" />
          <KMetric value="$700K" label="Their combined ARR" />
        </div>
        <KQuote cite="Priya Nandakumar, mentee, fintech founder">
          Kostia rebuilt our onboarding funnel in six weeks. Conversion went from 2.1% to 6.4%, and we closed the round that same quarter.
        </KQuote>
      </KBookSection>

      <KBookSection id="now">
        <h2 class="t-display">Now</h2>
        <p class="t-body">Current work is design systems for agent pipelines: kit vocabulary an agent reads instead of inventing parts on every job. The kit ships 19 components on 7 foundations; two consulting clients run it inside their agent builds today.</p>
        <KCard>
          <KCardHeading title="Working sessions" subtitle="90 minutes, one decision made before you leave." />
          <button class="button button--primary t-subtitle">Book a working session</button>
        </KCard>
        <p class="t-micro t-muted">Amsterdam · kk.consulting · the cats stay in every reference.</p>
      </KBookSection>
    </KBook>
  </KApp>
</template>
