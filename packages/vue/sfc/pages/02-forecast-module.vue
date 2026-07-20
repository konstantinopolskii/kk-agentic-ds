<script setup lang="ts">
/* SFC twin of demos/reference-recreations/02-forecast-module.vue.js,
   itself the h() twin of the frozen static demos/reference-recreations/
   02-forecast-module.html. The reconnect button stays raw: the static
   markup has no type attribute, but KButton always stamps one for
   as="button" — a real attribute present vs absent, not a
   serialization artifact. */
import { KApp, KPanels, KCard, KMetric, KCardHeading, KSpark, KSparkLabels, KSpecList } from '@konstantinopolskii/vue'

const sparkValues: number[] = [42, 38, 46, 52, 58, 50, 34, 40, 70, 80, 90, 100]
const softCount = 8
const softIndices = Array.from({ length: softCount }, (_, i) => i)
</script>

<template>
  <KApp view="panels">
    <KPanels>
      <KCard span="third">
        <KMetric value="12 400" label="Sessions in June" delta="↑ 8% vs May" />
      </KCard>

      <KCard span="third">
        <KMetric value="386" label="Conversions in June" delta="↑ 12% vs May" />
      </KCard>

      <KCard span="third">
        <KMetric value="92%" label="Forecast confidence" />
      </KCard>

      <KCard span="full">
        <KCardHeading title="Monthly forecast" subtitle="Organic sessions, actuals against forecast" muted />
        <KMetric value="148 000" label="Forecast for December" delta="↑ 12% vs last December" />
        <KSpark
          panel
          :values="sparkValues"
          :soft="softIndices"
          label="Organic sessions by month. January 96 000, rising and dipping through summer, then climbing from September to a December forecast of 148 000."
        />
        <KSparkLabels :labels="['Jan', 'Jun', 'Dec']" />
        <p class="t-micro t-muted">Jan 96 000 · Jun 118 000 · Dec 148 000 forecast</p>
      </KCard>

      <KCard span="half">
        <KCardHeading title="Search Console is disconnected" subtitle="The forecast runs on data last synced July 2. Reconnect to resume daily updates." />
        <button class="button button--primary t-subtitle">Reconnect Search Console</button>
      </KCard>

      <KCard span="half">
        <KCardHeading title="How the forecast reads" />
        <KSpecList
          variant="plain"
          :rows="[
            { key: 'Model', values: ['Seasonal fit on 24 months'] },
            { key: 'Updated', values: ['Daily at 06:00'] },
            { key: 'Confidence', values: ['92% on current pace'] },
          ]"
        />
      </KCard>
    </KPanels>
  </KApp>
</template>
