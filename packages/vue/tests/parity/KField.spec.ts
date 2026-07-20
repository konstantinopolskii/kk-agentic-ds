import { describe, it } from 'vitest'
import { expectParity } from './util'
import KFieldSfc from '../../sfc/components/KField.vue'
import KFieldOracle from '../../src/components/KField.js'

describe('KField parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KFieldSfc, KFieldOracle, [
      { name: 'default', props: {} },
      { name: 'with label', props: { label: 'Email' } },
      { name: 'row variant', props: { label: 'Email', row: true } },
      { name: 'with placeholder', props: { placeholder: 'name@example.com' } },
      { name: 'custom type + value', props: { type: 'email', modelValue: 'a@b.com' } },
      { name: 'textarea', props: { textarea: true, modelValue: 'Multi-line notes' } },
      { name: 'fake caret', props: { fakeCaret: true } },
      {
        name: 'all combined',
        props: {
          label: 'Bio',
          row: true,
          placeholder: 'Tell us about yourself',
          fakeCaret: true,
          type: 'text',
          modelValue: 'Draft text',
        },
      },
    ])
  })
})
