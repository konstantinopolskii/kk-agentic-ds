<script setup lang="ts">
/* SFC twin of demos/reference-recreations/09-create-transfer.vue.js, itself
   the h() twin of the frozen static demos/reference-recreations/09-create-transfer.html.
   Same DOM, kit components where their emitted markup matches exactly; raw
   markup for bespoke bits:
   - book__section--fill has no component (same precedent as 07-flashcard)
   - the two text inputs (Email, Title and message) stay raw <label><input>,
     not KField: KField always binds `:value="modelValue"`, which renders a
     bare `value` attribute even when empty — these two static inputs carry
     no value attribute at all, only placeholder, so the component would
     add an attribute the static markup doesn't have
   - the two field--row rows (Expires in, Downloads) reverse the value
     span's class order to `field__value t-caption`, unlike KFieldRow's
     fixed `t-caption field__value` — raw markup to keep the exact order
   - the Transfer button carries no type attribute, unlike KButton's fixed
     stamped type (same precedent as the Next/Continue buttons in
     04-joi-onboarding) */
import { KApp, KBook, KCard, KCardHeading, KChipWrap, KChip, KMedia } from '@konstantinopolskii/vue'
</script>

<template>
  <KApp view="single">
    <KBook id="doc">
      <article class="book__section book__section--fill">
        <KCard>
          <KCardHeading title="Create a transfer" />

          <KChipWrap>
            <KChip :pressed="true">Get a link</KChip>
            <KChip :pressed="false">Send as email</KChip>
          </KChipWrap>

          <KMedia title="Upload files" meta="Up to 3 GB on the free plan" micro initials="+" />

          <label class="field">
            <input class="t-caption field__input" type="text" placeholder="Email" />
          </label>

          <label class="field">
            <input class="t-caption field__input" type="text" placeholder="Title and message" />
          </label>

          <div class="field field--row">
            <span class="t-caption--bold field__label">Expires in</span>
            <span class="field__value t-caption">3 days</span>
          </div>

          <div class="field field--row">
            <span class="t-caption--bold field__label">Downloads</span>
            <span class="field__value t-caption">Up to 50</span>
          </div>

          <button class="button t-subtitle">Transfer</button>
        </KCard>
      </article>
    </KBook>
  </KApp>
</template>
