import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KRegistryTableSfc from '../../sfc/components/KRegistryTable.vue'
import KRegistryTableOracle from '../../src/components/KRegistryTable.js'

describe('KRegistryTable parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KRegistryTableSfc, KRegistryTableOracle, [
      { name: 'columns only, no rows', props: { columns: ['Token', 'Value'] } },
      {
        name: 'columns with rows via default slot',
        props: { columns: ['Token', 'Value'] },
        slots: {
          default: () => [
            h('tr', [h('td', { class: 't-body' }, '--k-ink'), h('td', { class: 't-body' }, '#111')]),
            h('tr', [h('td', { class: 't-body' }, '--k-paper'), h('td', { class: 't-body' }, '#fff')]),
          ],
        },
      },
      { name: 'single column', props: { columns: ['Name'] } },
      { name: 'three columns', props: { columns: ['Prop', 'Type', 'Default'] } },
    ])
  })
})
