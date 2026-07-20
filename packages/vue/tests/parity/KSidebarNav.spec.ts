import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KSidebarNavSfc from '../../sfc/components/KSidebarNav.vue'
import KSidebarNavOracle from '../../src/components/KSidebarNav.js'

describe('KSidebarNav parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KSidebarNavSfc, KSidebarNavOracle, [
      { name: 'default (empty, auto id)', slots: {} },
      { name: 'custom id', props: { id: 'sections' } },
      { name: 'manual opt-out', props: { manual: true } },
      {
        name: 'manual with hand-curated nav groups',
        props: { manual: true },
        slots: { default: () => [h('section', { class: 'nav-group' }, 'Group one')] },
      },
      {
        name: 'non-manual with default slot content',
        slots: { default: () => 'Prebuilt nav' },
      },
    ])
  })
})
