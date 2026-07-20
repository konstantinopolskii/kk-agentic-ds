import { describe, it } from 'vitest'
import { expectParity } from './util'
import KAppSfc from '../../sfc/components/KApp.vue'
import KAppOracle from '../../src/components/KApp.js'

describe('KApp parity', () => {
  it('matches the h() oracle across all views', async () => {
    await expectParity(KAppSfc, KAppOracle, [
      { name: 'default (doc)', slots: { default: () => 'Doc shell content' } },
      { name: 'doc explicit', props: { view: 'doc' }, slots: { default: () => 'Doc shell content' } },
      { name: 'single', props: { view: 'single' }, slots: { default: () => 'Single shell content' } },
      { name: 'panels', props: { view: 'panels' }, slots: { default: () => 'Panels shell content' } },
      { name: 'front', props: { view: 'front' }, slots: { default: () => 'Front shell content' } },
      // behavior is a sanctioned additive prop with no oracle equivalent
      // (rule 2) — the oracle has no `behavior` prop to declare, so passing
      // it would only leak through as a fallthrough attribute there and
      // never on the SFC, which isn't a fair parity comparison. Its effect
      // (onMounted wiring) is covered by behavior specs instead.
    ])
  })
})
