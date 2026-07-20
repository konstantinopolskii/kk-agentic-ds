import { describe, it } from 'vitest'
import { expectParity } from './util'
import KTabsSfc from '../../sfc/components/KTabs.vue'
import KTabsOracle from '../../src/components/KTabs.js'

const tabs = [{ label: 'Overview' }, { label: 'Activity' }, { label: 'Settings' }]

describe('KTabs parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KTabsSfc, KTabsOracle, [
      { name: 'default selection', props: { id: 'tabs1', tabs } },
      { name: 'selected index 1', props: { id: 'tabs2', tabs, modelValue: 1 } },
      { name: 'selected last index', props: { id: 'tabs3', tabs, modelValue: 2 } },
      {
        name: 'with panel slots',
        props: { id: 'tabs4', tabs, modelValue: 0 },
        slots: {
          'panel-0': () => 'Overview body',
          'panel-1': () => 'Activity body',
          'panel-2': () => 'Settings body',
        },
      },
      {
        name: 'two tabs',
        props: { id: 'tabs5', tabs: [{ label: 'One' }, { label: 'Two' }], modelValue: 1 },
      },
    ])
  })
})
