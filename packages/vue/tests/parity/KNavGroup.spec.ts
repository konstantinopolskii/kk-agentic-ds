import { describe, it } from 'vitest'
import { expectParity } from './util'
import KNavGroupSfc from '../../sfc/components/KNavGroup.vue'
import KNavGroupOracle from '../../src/components/KNavGroup.js'

describe('KNavGroup parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KNavGroupSfc, KNavGroupOracle, [
      {
        name: 'head without href (h4)',
        props: { head: 'Getting started', items: [{ label: 'Install', href: '#install' }] },
      },
      {
        name: 'head with href (anchor)',
        props: {
          head: 'Getting started',
          href: '#getting-started',
          items: [{ label: 'Install', href: '#install' }],
        },
      },
      {
        name: 'item with aria-current',
        props: {
          head: 'Getting started',
          href: '#getting-started',
          items: [
            { label: 'Install', href: '#install', current: true },
            { label: 'Configure', href: '#configure' },
          ],
        },
      },
      {
        name: 'single item, no current',
        props: { head: 'Reference', items: [{ label: 'API', href: '#api' }] },
      },
      {
        name: 'many items',
        props: {
          head: 'Components',
          href: '#components',
          items: [
            { label: 'Button', href: '#button' },
            { label: 'Card', href: '#card' },
            { label: 'Chip', href: '#chip' },
          ],
        },
      },
    ])
  })
})
