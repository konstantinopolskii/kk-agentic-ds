import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KButtonSfc from '../../sfc/components/KButton.vue'
import KButtonOracle from '../../src/components/KButton.js'

describe('KButton parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KButtonSfc, KButtonOracle, [
      { name: 'default', slots: { default: () => 'Save draft' } },
      { name: 'primary', props: { primary: true }, slots: { default: () => 'Publish deliverable' } },
      { name: 'as span', props: { as: 'span' }, slots: { default: () => 'Open the doc' } },
      { name: 'cta active', props: { cta: 'active' }, slots: { default: () => 'Collapse' } },
      { name: 'cta minimized', props: { cta: 'minimized' }, slots: { default: () => 'Expand' } },
      { name: 'caption trail', props: { caption: true }, slots: { default: () => 'Follow' } },
      { name: 'primary caption', props: { primary: true, caption: true }, slots: { default: () => 'Go' } },
      { name: 'submit type', props: { type: 'submit' }, slots: { default: () => 'Commit' } },
      { name: 'rich slot', slots: { default: () => [h('span', { class: 't-muted' }, 'Save'), ' now'] } },
    ])
  })
})
