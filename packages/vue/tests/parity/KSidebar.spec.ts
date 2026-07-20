import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KSidebarSfc from '../../sfc/components/KSidebar.vue'
import KSidebarOracle from '../../src/components/KSidebar.js'

describe('KSidebar parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KSidebarSfc, KSidebarOracle, [
      { name: 'no title, no footer, no default', slots: {} },
      { name: 'default slot only', slots: { default: () => 'Nav content' } },
      { name: 'with title', props: { title: 'Docs' }, slots: { default: () => 'Nav content' } },
      {
        name: 'with footer',
        slots: { default: () => 'Nav content', footer: () => 'v1.0.0' },
      },
      {
        name: 'title + footer',
        props: { title: 'Docs' },
        slots: { default: () => 'Nav content', footer: () => 'v1.0.0' },
      },
      {
        name: 'rich default slot',
        props: { title: 'Docs' },
        slots: { default: () => [h('nav', { class: 'sidebar__nav' }, 'Group')] },
      },
    ])
  })
})
