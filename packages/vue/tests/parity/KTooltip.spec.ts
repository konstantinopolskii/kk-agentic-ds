import { describe, it, expect } from 'vitest'
import { ssr, normalize } from './util'
import KTooltipSfc from '../../sfc/components/KTooltip.vue'
import KTooltipOracle from '../../src/components/KTooltip.js'

/* The oracle keeps a module-level `uid` counter for the bubble id
   (`tooltip-N-b`); the SFC mirrors it with its own counter so every
   tooltip instance app-wide gets a stable, unique id. Two independent
   counters aren't guaranteed to land on the same N for a given case,
   so each rendered pair is normalized before comparing: replace
   `tooltip-<n>-b` with a fixed placeholder on both sides. */
function stripBubbleId(html: string): string {
  return html.replace(/tooltip-\d+-b/g, 'tooltip-N-b')
}

async function expectTooltipParity(
  name: string,
  props: Record<string, unknown> = {},
  slots: Record<string, () => unknown> | null = null,
) {
  const a = stripBubbleId(normalize(await ssr(KTooltipSfc, props, slots)))
  const b = stripBubbleId(normalize(await ssr(KTooltipOracle, props, slots)))
  expect(a, `case: ${name}`).toBe(b)
  expect(a.length, `case ${name} rendered empty`).toBeGreaterThan(0)
}

describe('KTooltip parity', () => {
  it('matches the h() oracle across all variants', async () => {
    await expectTooltipParity('default')
    await expectTooltipParity('text only', { text: 'Saved to drafts' })
    await expectTooltipParity('custom label', { label: 'i' })
    await expectTooltipParity('text + label', { text: 'Read more', label: 'Help' })
    await expectTooltipParity('trigger slot', { text: 'Custom trigger' }, { trigger: () => 'Learn more' })
  })
})
