import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KChipWrapSfc from '../../sfc/components/KChipWrap.vue'
import KChipWrapOracle from '../../src/components/KChipWrap.js'
import KChipOracle from '../../src/components/KChip.js'

describe('KChipWrap parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KChipWrapSfc, KChipWrapOracle, [
      { name: 'empty' },
      { name: 'plain slot text, no v-model', slots: { default: () => 'Not a chip' } },
      {
        name: 'grouped chips, none selected',
        props: { modelValue: undefined },
        slots: {
          default: () => [
            h(KChipOracle, { value: 'a' }, { default: () => 'A' }),
            h(KChipOracle, { value: 'b' }, { default: () => 'B' }),
          ],
        },
      },
      {
        name: 'grouped chips, one selected',
        props: { modelValue: 'a' },
        slots: {
          default: () => [
            h(KChipOracle, { value: 'a' }, { default: () => 'A' }),
            h(KChipOracle, { value: 'b' }, { default: () => 'B' }),
          ],
        },
      },
      {
        name: 'grouped chips, numeric value selected',
        props: { modelValue: 2 },
        slots: {
          default: () => [
            h(KChipOracle, { value: 1 }, { default: () => 'One' }),
            h(KChipOracle, { value: 2 }, { default: () => 'Two' }),
          ],
        },
      },
    ])
  })
})
