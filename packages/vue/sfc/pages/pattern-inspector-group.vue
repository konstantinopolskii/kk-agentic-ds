<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/patterns/inspector-group.html,
   the frozen static oracle for patterns_check.mjs. KInspectorGroup +
   KCard/KCardHeading/KCardCollapsible for the card chrome, KField for the
   one live input (its value="v1.2.0" round-trips through KField exactly).
   Raw markup for: the switches (KSwitch adds a wrapping span and drops
   t-caption off the label, which this oracle's bare-text-node label does
   not carry); the read-only Memo/Call rows (KFieldRow's root is a <div>,
   this oracle's rows are <label>); and the buttons (KButton always stamps
   type="button", which this oracle's buttons do not carry). */
import { KInspectorGroup, KCard, KCardHeading, KCardCollapsible, KField } from '@konstantinopolskii/vue'
</script>

<template>
  <div class="wrap">
    <KInspectorGroup>
      <KCard variant="heading">
        <h2 class="t-display">Tweak</h2>
      </KCard>

      <KCard variant="interactive" state="active">
        <KCardHeading title="Tweak the tokens" subtitle="Brief the agent, pick a direction, scope, commit." />
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
          <KField label="Version" row modelValue="v1.2.0" />
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
        </KCardCollapsible>
        <button class="button t-subtitle" data-cta="minimized">Browse</button>
        <button class="button button--primary t-subtitle" data-cta="active">Apply template</button>
      </KCard>
    </KInspectorGroup>
  </div>
</template>
