import { describe, it } from 'vitest'
import { expectParity } from './util'
import KSwitchSfc from '../../sfc/components/KSwitch.vue'
import KSwitchOracle from '../../src/components/KSwitch.js'

describe('KSwitch parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KSwitchSfc, KSwitchOracle, [
      { name: 'unchecked default', props: { label: 'Notifications' } },
      { name: 'checked', props: { label: 'Auto-save', modelValue: true } },
    ])
  })
})
