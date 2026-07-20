<script setup lang="ts">
/* SFC twin of demos/reference-recreations/05-joi-settings.vue.js, itself
   the h() twin of the frozen static
   demos/reference-recreations/05-joi-settings.html. Same DOM, kit
   components where their emitted markup matches exactly; raw markup for
   bespoke bits:
   - media row here has no figure element at all (KMedia always emits one)
   - the Upgrade button has no type attribute (KButton always stamps one)
   - the Subscription value is a tag, not KFieldRow's plain value span
   - Preferences rows pair label with a muted caption, not KFieldRow's
     field__value class */
import { KApp, KBook, KBookSection, KCard, KCardHeading, KTag, KField, KSwitch } from '@konstantinopolskii/vue'
</script>

<template>
  <KApp view="single">
    <KBook id="doc">
      <KBookSection>
        <h2 class="t-display">Settings</h2>

        <KCard>
          <div class="media">
            <div class="media__body">
              <p class="t-caption--bold">Joi plus</p>
              <p class="t-micro t-muted">Subscription or one-time purchase</p>
            </div>
            <div class="media__trail">
              <button class="button button--primary t-caption--bold">Upgrade</button>
            </div>
          </div>
        </KCard>

        <KCard>
          <KCardHeading title="Account" />
          <KField row label="Display name" modelValue="Alexey" />
          <div class="field field--row">
            <span class="t-caption--bold field__label">Subscription</span>
            <KTag>Free</KTag>
          </div>
        </KCard>

        <KCard>
          <KCardHeading title="Connections" />
          <KSwitch label="Apple calendars" model-value />
          <KSwitch label="Reminders" model-value />
          <KSwitch label="HealthKit" :model-value="false" />
        </KCard>

        <KCard>
          <KCardHeading title="Preferences" />
          <div class="field field--row">
            <span class="t-caption--bold field__label">Choose calendars</span>
            <span class="t-caption t-muted">Two of five</span>
          </div>
          <div class="field field--row">
            <span class="t-caption--bold field__label">Tasks</span>
            <span class="t-caption t-muted">Grouped by project</span>
          </div>
          <div class="field field--row">
            <span class="t-caption--bold field__label">App icon</span>
            <span class="t-caption t-muted">Classic</span>
          </div>
          <div class="field field--row">
            <span class="t-caption--bold field__label">Notifications</span>
            <span class="t-caption t-muted">Morning summary only</span>
          </div>
        </KCard>
      </KBookSection>
    </KBook>
  </KApp>
</template>
