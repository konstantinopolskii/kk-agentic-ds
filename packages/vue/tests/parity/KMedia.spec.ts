import { describe, it } from 'vitest'
import { h } from 'vue'
import { expectParity } from './util'
import KMediaSfc from '../../sfc/components/KMedia.vue'
import KMediaOracle from '../../src/components/KMedia.js'

describe('KMedia parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectParity(KMediaSfc, KMediaOracle, [
      { name: 'div form, avatar with initials', props: { title: 'Ada Lovelace', initials: 'AL' } },
      { name: 'div form, avatar with no initials', props: { title: 'No initials' } },
      { name: 'anchor form via href', props: { title: 'Open component', href: '/components/button' } },
      { name: 'square figure, no slot', props: { title: 'Screenshot tile', square: true } },
      {
        name: 'square wins is skipped when figure slot present',
        props: { title: 'Custom figure', square: true },
        slots: { figure: () => h('img', { class: 'media__figure', src: '/avatar.png' }) },
      },
      {
        name: 'figure slot overrides avatar-with-initials',
        props: { title: 'Custom figure', initials: 'CF' },
        slots: { figure: () => h('img', { class: 'media__figure', src: '/avatar.png' }) },
      },
      { name: 'meta caption, not micro', props: { title: 'Row title', meta: 'Updated 2h ago' } },
      { name: 'meta micro', props: { title: 'Row title', meta: 'Updated 2h ago', micro: true } },
      { name: 'no meta', props: { title: 'Row title only' } },
      { name: 'trailTag present', props: { title: 'Row title', trailTag: 'Beta' } },
      {
        name: 'trail slot present, no trailTag',
        props: { title: 'Row title' },
        slots: { trail: () => h('button', { class: 'button' }, 'Open') },
      },
      {
        name: 'trailTag wins over trail slot',
        props: { title: 'Row title', trailTag: 'New' },
        slots: { trail: () => h('button', { class: 'button' }, 'Open') },
      },
      { name: 'no trailing content', props: { title: 'Row title' } },
      {
        name: 'full combo: href + meta micro + trailTag',
        props: {
          title: 'Full combo',
          meta: 'Updated 2h ago',
          micro: true,
          href: '/full-combo',
          trailTag: 'Live',
        },
      },
    ])
  })
})
