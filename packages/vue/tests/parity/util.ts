/* Parity harness: the retired h() layer at src/ is the markup oracle.
   Every SFC must renderToString to the same normalized HTML as its
   oracle for the same props and slots. Normalization strips SSR
   fragment comments, collapses inter-tag whitespace, and sorts
   attributes and class tokens so cosmetic ordering never fails a
   genuinely identical tree. */
import { createSSRApp, h, type Component } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { expect } from 'vitest'

type Slots = Record<string, () => unknown>

export async function ssr(
  comp: Component,
  props: Record<string, unknown> = {},
  slots: Slots | null = null,
): Promise<string> {
  const app = createSSRApp({
    render: () => (slots ? h(comp as never, props, slots) : h(comp as never, props)),
  })
  return renderToString(app)
}

export function normalize(html: string): string {
  let out = html.replace(/<!--[\s\S]*?-->/g, '')
  out = out.replace(/>\s+</g, '><').trim()
  // Sort attributes inside every opening tag, and class tokens inside class.
  out = out.replace(/<([a-zA-Z][\w-]*)((?:\s+[^<>]*?)?)(\s*\/?)>/g, (_m, tag, rawAttrs, close) => {
    const attrs: string[] = []
    const re = /([\w:@.-]+)(="[^"]*")?/g
    let a: RegExpExecArray | null
    while ((a = re.exec(rawAttrs)) !== null) {
      if (!a[1]) continue
      let attr = a[1] + (a[2] ?? '')
      if (a[1] === 'class' && a[2]) {
        const tokens = a[2].slice(2, -1).split(/\s+/).filter(Boolean).sort()
        attr = `class="${tokens.join(' ')}"`
      }
      attrs.push(attr)
    }
    attrs.sort()
    return `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}${close}>`
  })
  return out
}

export interface ParityCase {
  name: string
  props?: Record<string, unknown>
  slots?: Slots
}

/* Assert the SFC and the oracle emit identical normalized markup for
   every case. Also guards against silently-empty output. */
export async function expectParity(
  sfc: Component,
  oracle: Component,
  cases: ParityCase[],
): Promise<void> {
  for (const c of cases) {
    const a = normalize(await ssr(sfc, c.props ?? {}, c.slots ?? null))
    const b = normalize(await ssr(oracle, c.props ?? {}, c.slots ?? null))
    expect(a, `case: ${c.name}`).toBe(b)
    expect(a.length, `case ${c.name} rendered empty`).toBeGreaterThan(0)
  }
}
