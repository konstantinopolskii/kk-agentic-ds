<script setup lang="ts">
/* SFC twin of demos/fundamental--accepted/patterns/card-stack.html, the
   frozen static oracle for patterns_check.mjs. Three interactive cards,
   flush collapsibles (fields/switches manage their own bleed). Raw
   <button> markup — KButton always stamps type="button", which this
   oracle's buttons do not carry. Raw <label class="switch"> markup —
   KSwitch wraps its label text in an extra <span class="t-caption"> and
   drops the t-caption class from the label itself, which does not match
   this oracle's bare text node + "switch t-caption" label class. Raw
   <label class="field"> markup — KField always stamps a value attribute
   (empty string by default), which this oracle's placeholder-only
   inputs do not carry. */
import { KCardStack, KCard, KCardHeading, KCardCollapsible } from '@konstantinopolskii/vue'
</script>

<template>
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
</template>
