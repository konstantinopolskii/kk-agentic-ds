import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KDropdownSfc from '../../sfc/components/KDropdown.vue'
import KDropdownOracle from '../../src/components/KDropdown.js'

describe('KDropdown parity', () => {
  it('matches the h() oracle across all variants (closed state)', async () => {
    await expectParity(KDropdownSfc, KDropdownOracle, [
      { name: 'default (no items)', props: {} },
      { name: 'custom label', props: { label: 'Actions' } },
      { name: 'string items', props: { items: ['Edit', 'Duplicate', 'Delete'] } },
      {
        name: 'object items',
        props: {
          items: [
            { label: 'Edit', value: 'edit' },
            { label: 'Delete', value: 'delete' },
          ],
        },
      },
      {
        name: 'default slot rows',
        props: {},
        slots: {
          default: () => h('button', { class: 'dropdown__item', role: 'menuitem' }, 'Custom row'),
        },
      },
      {
        name: 'trigger slot',
        props: { items: ['Edit'] },
        slots: {
          trigger: () => h('button', { class: 'dropdown__trigger button t-subtitle' }, 'Open'),
        },
      },
    ])
  })
})
