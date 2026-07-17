# Kit expansion: from doc shell to product surfaces

Initiative proposal. Not canon until stamped. Routes to `kk-ds-maintainer` per archetype session after acceptance.

## The ask

The kit should ship real product surfaces in its one style: dashboards, articles, classifieds, profile homepages, blogs, blogposts, newsletters, news fronts, SaaS dashboards. Same strictness that built the doc shell: nine color tokens, three weights, seven sizes, four radii, seven keyframes. No new element budget. The kit grows patterns, not vocabulary.

## What already holds

The foundation layer is done and battle-tested. Six rule sets (material, color, type, space, radii, motion) with a machine-readable `tokens.json`. Fifteen documented components. Thirteen registry patterns sliced from an accepted prototype. A voice book with the AI-tells inventory. A pipeline that gates every addition through cold-read audits. A pattern-discoverer role that already knows how to slice accepted prototypes into registry rows.

The kit's soul is decided: monochrome, Commissioner, iPad-feel three panes, hypertrophied contrast, one distinction step per pair, signal over noise. Expansion changes none of it.

## What blocks product surfaces today

1. **Inventory truth gap.** CSS ships classes the canon never documents: `deck`, `highlight`, `figure`, `quote`, `divider`, `avatar`, `fab`, `stat` live in the forbidden-list allowlist and in `style.css`, but `components.md` documents only a subset. An agent reading canon cannot use what canon does not name. Either a class earns a section or it leaves the allowlist.
2. **No data display beyond key-value.** `book__spec` and `registry-table` carry doc inventories. Products need a general table, a metric tile, a media row (thumbnail + text + meta). Nothing else is missing for the index and dashboard archetypes — that is the whole gap, three shapes.
3. **No chart policy.** Dashboards need bars, lines, sparklines. The material rules (no gradients, no shadows) and the color rules (nine tokens, no status colors) already imply the answer; a foundation subsection has to state it so agents stop guessing.
4. **Shell assumption.** Every surface today is the three-column book. A newsletter is one column. A dashboard is a panel grid. The shell patterns need two siblings: single-column reader, panel grid. Both compose from existing tokens; neither touches components.

## What the references teach

Nine live surfaces studied before this revision: two SEOmonitor products, kk.consulting and its coaching landing, amicaliuc.com, two intuition.team pages, asekachov.com with its full portfolio image set, and the fuckgrechka trio of one studio index and two app landings. Every one of them wins with the same moves the kit already owns. The gaps they expose are narrow and nameable.

| Reference | What it proves | What the kit takes |
|-----------|----------------|--------------------|
| SEOmonitor Rank Tracker | A dense dashboard is three rails: nav, working table, detail. Rows carry keyword, position, delta, sparkline | The three-column shell already is the dashboard shell. Needs: data table, inline sparkline, delta cell |
| SEOmonitor light screens | Forecast module is one bar-line chart with plain labeled values. Error state is one card: title, reason, action | Chart policy confirmed. Error state is a card recipe, zero new parts |
| kk.consulting | A profile is an identity hero: portrait, fact-dense intro, giant role word, stat blocks, testimonial cards | Identity hero and stat row for the profile archetype. All compose from existing type scale |
| kk.consulting/bdm/career | A coaching landing is module cards, a numbered process, structured testimonials, pricing tiers | Landing archetype composes from card-stack--columns, quote, spec-list. Zero new components |
| amicaliuc.com | A portfolio is numbered sections, project pairs with images, quantified outcomes per project | Work grid rows: figure, title, outcome stat. Composition only |
| intuition.team, both pages | An index can be pure text: linked title, subtitle, arrow. A community page is a roster list, a projects table with progress, one pricing line | Media row works without a thumbnail. The general table carries a percent column as plain text |
| asekachov.com portfolio | Product screens across six apps: giant-type onboarding steps, label-value setting rows, chip wraps for multi-select, full-width pill CTA at sheet bottom, stat rows under media, monochrome person pages where weight carries state | Chip earns component candidacy. Field rows and stat rows confirmed. Bottom-anchored primary CTA becomes the narrow-mobile card rule |
| fuckgrechka.ru | A studio index is a two-column deck of project cards: icon, title, one benefit line | The existing deck and card cover it as is |
| tzlvt + coin landings | An app landing is four screenshot-plus-copy sections, one repeated CTA, testimonial cards with avatar, name, role, quote | Feature section is figure plus prose. Testimonial is card plus quote plus byline. No stars, no new parts |

Three findings change the plan:

1. **Landings are a missing archetype.** Four of nine references are marketing or offer pages. The original four archetypes had no home for them. Landing joins as a fifth archetype, and it is the cheapest: every pattern it needs composes from shipped parts.
2. **The delta question answers itself.** SEOmonitor uses red and green for rank deltas. Asekachov's Must app renders watch stats, person stats, and rating rows in pure monochrome, weight carrying the state, and loses nothing. The kit's no-status-colors rule survives contact with dashboard reality: direction glyphs plus weight, values in text.
3. **Mobile is a rule set, not an archetype.** The asekachov screens all anchor the primary action to the sheet bottom, full width, thumb reach. That lands as rules inside the existing narrow-mobile pattern during each archetype run, not as separate work.

## The mechanism: archetypes through the existing machine

Nine requested surfaces plus the landing gap collapse into five archetypes. Each archetype is one full pipeline run that ends in an accepted demo; the pattern discoverer slices it; the registry grows. This is the machine the kit already defines — the proposal only aims it.

| Archetype | Covers | New patterns expected |
|-----------|--------|----------------------|
| Reader | article, blogpost, newsletter, news story | single-column shell, article header, byline row, figure with caption, footnote rail, related-list |
| Index | blog home, news front, classifieds, catalogs | card grid, media row, filter rail, pagination row, section front |
| Profile | personal homepage, about page, portfolio | identity hero, links list, work grid, contact block |
| Landing | product page, app landing, offer page, studio index | hero block, feature section, testimonial card, pricing row, closing CTA |
| Dashboard | SaaS dashboard, analytics, admin | panel grid shell, metric tile, data table, sparkline, delta cell, status row |

Order: reader, index, profile, landing, dashboard. Reader is closest to the current strengths. Landing slots fourth because it is pure composition and pays for itself immediately on kk.consulting work. Dashboard needs the chart policy and lands last with the most new ground under it.

Each run stays inside the element budget. A new component (metric tile, media row, table, chip) enters through evolve, one section in `components.md`, one registry row, one changelog entry, one minor version. Expected total: three to five new components across all five archetypes. The likely roster: table, metric tile, media row, chip, and one discovered mid-run. Everything else is composition.

## Sessions, in order

1. **Inventory truth.** Document or deprecate every undocumented class. Audit `style.css` against `components.md`. One patch-or-minor release. No new design.
2. **Chart policy.** One foundation subsection: monochrome data viz, bars and lines only, values labeled in text, no gradients, no legends where direct labeling fits, hairline gridlines. Lands with the dashboard archetype's direction doc.
3. **Reader archetype.** Full pipeline run. Accepted demo at `demos/reader--accepted/`.
4. **Index archetype.** Full pipeline run.
5. **Profile archetype.** Full pipeline run. Direction feeds on kk.consulting, amicaliuc, asekachov.
6. **Landing archetype.** Full pipeline run. Direction feeds on tzlvt, coin, bdm/career. Composition only; any new-component request here fails review by default.
7. **Dashboard archetype.** Full pipeline run, consumes the chart policy. Direction feeds on the SEOmonitor rails and rows.
8. **Tooling.** Token linter (off-grid values fail), class-prefix linter (off-allowlist classes fail), wired as an npm script. The supervisor's inventory vector, automated. Runs in CI on every PR.

Each session ships its own bundle and version per `protocols.md`. No session starts before the previous one's tag is pushed.

## Code reuse

The kit stays classes-plus-fragments. No web components, no framework port — a build step would break the agent-readable contract that makes the pipeline work.

- **Fragments are the API.** Every accepted pattern ships as a standalone HTML slice under `demos/<archetype>--accepted/patterns/`. Consumers and agents copy slices, not screenshots.
- **The npm package is the delivery.** `@konstantinopolskii/design-system` already ships CSS, JS, fonts, skills. Archetype demos join the `files` array.
- **Integration docs cover behavior.** Components with a JS surface (comment today; deck, table sorting if it earns one) each carry `docs/integration/<name>.md`.
- **The viewer is the doc site.** `doc.html?src=` (shipped in 1.11.0) renders canon in the kit's own shell. Every canon book is now a live demo of the system reading itself.

## What this proposal does not do

- No dark mode. Nine tokens stay nine. The shout surface already covers the immersive dark moment the references use for media.
- No second typeface, no fourth weight, no new radius.
- No status colors for dashboards. SEOmonitor paints deltas red and green; asekachov's Must app proves the same rows read fine in monochrome. Direction glyphs and weight carry state; values stay in text; words carry judgment.
- No star ratings. A testimonial is a quote and a byline; the quote either convinces or it does not.
- No CMS, no templating language. Markdown plus fragments.

## Stamp requests

1. Approve the five-archetype order: reader, index, profile, landing, dashboard.
2. Approve the three-to-five component ceiling for the whole expansion (table, metric tile, media row, chip, plus at most one discovered mid-run).
3. Approve the chart policy direction (monochrome, labeled, bars and lines only, deltas as glyph plus weight) before the dashboard session drafts it.
4. Name the first real content for the reader archetype: an existing kk.consulting article or a Wealthy pipeline doc, so stage 1 decomposes a real brief, not a lorem one.

## Signoff

<div class="book__signoff">
  <div class="book__signoff-stats">
    <div class="stat t-caption">
      <div><span class="t-caption--bold">5</span> archetypes cover ten surfaces.</div>
    </div>
    <div class="stat t-caption">
      <div><span class="t-caption--bold">9</span> references studied.</div>
    </div>
    <div class="stat t-caption">
      <div><span class="t-caption--bold">5</span> new components at most.</div>
    </div>
  </div>
  <div class="book__signoff-signature">
    <p class="t-caption">
      Signed by <span class="t-caption--bold">Claude,</span><br />
      maintainer session for <span class="t-caption--bold">Konstantin Konstantinopolskii</span><br />
      <span class="t-muted">2026-07-17, expansion-scoping session.</span>
    </p>
  </div>
</div>
