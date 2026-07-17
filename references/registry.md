# Reference registry

Twelve designs studied to the pixel, mapped to kit vocabulary, rebuilt in `demos/reference-recreations/`. This book is the bridge between what the references do and what the kit ships. Read it before composing any product surface; every recreation names the exact classes that carry it.

## Method

Nine sources: SEOmonitor Rank Tracker and its light-theme product screens, kk.consulting and its coaching landing, amicaliuc.com, intuition.team main and planetarium pages, asekachov.com with 97 portfolio captures across six shipped apps, fuckgrechka.ru with the tzlvt and coin landings.

Captures live in `references/2026-07/img/`, numbered in page order. The image directory stays out of git; the capture URLs sit in `references/2026-07/asekachov-image-urls.txt` for refetching. Third-party work is studied here, never redistributed.

Measurements come from 512 px captures with the phone's inner screen normalized to a 375 pt viewport. Read them as design intent, not forensics: type sizes carry a one-step tolerance, spacing reads snapped to the 4 px grid. Where a reference value falls between kit tokens, the study names the kit token that carries the same intent.

## What is common

The references disagree on palette, platform, and product. They agree on structure. Ten shared moves, in order of how hard they work:

1. **Type is the layout.** The biggest thing on every screen is a word, not a picture and not a box. kk.consulting fills the viewport with the word Founder. Oppie fills a card with the word Exercise. The journal app leads with Today. Layout emerges from scale contrast, not from containers.
2. **Muted name, loud statement.** The label whispers and the content shouts. Sekachov renders his own name gray and his positioning white. Joi renders Step 1 small and the instruction huge. The kit already owns this as `t-muted` metadata above full-black prose.
3. **One accent, or none.** Joi is white plus one red logo dot. Must is monochrome with weight carrying state. WeTransfer allows one blue. Nothing uses two accents. The kit's zero-accent stance is the strict end of the same spectrum.
4. **The label-value row is the universal molecule.** Settings, forms, spec sheets, transfer options: label left, value or control right, hairline or gap between rows. Identical to the kit's `field--row` and `book__spec`.
5. **The stat pair: bold value, muted label.** Must person pages, kk.consulting fact blocks, coin's 158K claim, rank positions in SEOmonitor. Two text nodes, one distinction step. The kit's `stat` is this shape; dashboards need its tile-sized sibling.
6. **Primary action pinned to the bottom, full width.** Every asekachov screen ends in one full-width pill: Next, Continue, Transfer, Post update. One per screen. The kit's one-primary-per-card rule is the same law; narrow viewports add the pinning.
7. **Rows, not grids, carry products.** Feeds, rosters, files, keywords: horizontal rows with a leading figure, a two-line body, a trailing meta. Grids appear only for media posters.
8. **Sections breathe, groups touch.** Inside a group, 4 to 12 pt gaps. Between sections, 40 to 80. Inner and outer theory, obeyed by every reference without naming it.
9. **Dark is for immersion, light is for work.** Must and Ayyo go black around media. Every tool screen is white. The kit's `card--shout` is the sanctioned dark moment; no second dark mode needed.
10. **Numbers are text.** Progress is 80% written out, deltas are ▲2 written out, volumes are 12 400 written out. Charts decorate the numbers; they never replace them.

## Layout taxonomy

Six shells cover all nine references:

<table class="registry-table">
  <thead>
    <tr>
      <th scope="col" class="t-caption">Shell</th>
      <th scope="col" class="t-caption">Seen in</th>
      <th scope="col" class="t-caption">Kit answer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="t-body">One column, centered measure</td>
      <td class="t-body">tzlvt, coin, planetarium, blogposts everywhere</td>
      <td class="t-body"><span class="t-code">app--single</span>, new in 1.12.0</td>
    </tr>
    <tr>
      <td class="t-body">Two-column card deck index</td>
      <td class="t-body">fuckgrechka, amicaliuc project pairs</td>
      <td class="t-body"><span class="t-code">card-stack--columns</span>, shipped</td>
    </tr>
    <tr>
      <td class="t-body">Three-rail workbench</td>
      <td class="t-body">SEOmonitor Rank Tracker</td>
      <td class="t-body">Three-column shell, shipped</td>
    </tr>
    <tr>
      <td class="t-body">Panel grid dashboard</td>
      <td class="t-body">SEOmonitor agency dashboard, forecast modules</td>
      <td class="t-body"><span class="t-code">panels</span>, new in 1.12.0</td>
    </tr>
    <tr>
      <td class="t-body">Front page: lead plus rail plus grid</td>
      <td class="t-body">News fronts, Ayyo TV shelf</td>
      <td class="t-body"><span class="t-code">front</span>, new in 1.12.0</td>
    </tr>
    <tr>
      <td class="t-body">Sheet on canvas</td>
      <td class="t-body">Every asekachov modal: location, book note, transfer</td>
      <td class="t-body"><span class="t-code">card</span> on narrow viewport, bottom-pinned CTA rule</td>
    </tr>
  </tbody>
</table>

## Component taxonomy

Every interface element observed across the twelve studies, resolved against the kit:

<table class="registry-table">
  <thead>
    <tr>
      <th scope="col" class="t-caption">Observed</th>
      <th scope="col" class="t-caption">Kit resolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="t-body">Giant word hero</td>
      <td class="t-body"><span class="t-code">t-hero</span>, shipped</td>
    </tr>
    <tr>
      <td class="t-body">Segment tabs, filter pills, multi-select wraps</td>
      <td class="t-body"><span class="t-code">chip</span>, new. A tag the user can press</td>
    </tr>
    <tr>
      <td class="t-body">Setting row with toggle</td>
      <td class="t-body"><span class="t-code">field--row</span> plus <span class="t-code">switch</span>, shipped</td>
    </tr>
    <tr>
      <td class="t-body">Feed row: avatar, two lines, trailing badge</td>
      <td class="t-body"><span class="t-code">media</span>, new. Row molecule with leading figure</td>
    </tr>
    <tr>
      <td class="t-body">Dense data table with deltas and trends</td>
      <td class="t-body"><span class="t-code">data-table</span>, new, plus <span class="t-code">spark</span></td>
    </tr>
    <tr>
      <td class="t-body">Big-number tile with delta line</td>
      <td class="t-body"><span class="t-code">metric</span>, new. The stat, sized for panels</td>
    </tr>
    <tr>
      <td class="t-body">Inline trend line, tiny bar strip</td>
      <td class="t-body"><span class="t-code">spark</span>, new, under the chart policy</td>
    </tr>
    <tr>
      <td class="t-body">Screenshot-plus-copy feature pair</td>
      <td class="t-body"><span class="t-code">figure</span> plus prose, shipped</td>
    </tr>
    <tr>
      <td class="t-body">Testimonial with byline</td>
      <td class="t-body"><span class="t-code">quote</span> with <span class="t-code">cite</span>, shipped. No stars</td>
    </tr>
    <tr>
      <td class="t-body">Pricing tiers</td>
      <td class="t-body"><span class="t-code">card-stack--columns</span>, shipped</td>
    </tr>
    <tr>
      <td class="t-body">Upsell banner</td>
      <td class="t-body"><span class="t-code">card--shout</span>, shipped. No gradient</td>
    </tr>
    <tr>
      <td class="t-body">Progress percent</td>
      <td class="t-body">Text value in a table cell. No bars, no rings</td>
    </tr>
    <tr>
      <td class="t-body">Onboarding step counter</td>
      <td class="t-body"><span class="t-code">t-micro t-muted</span> above the heading, shipped</td>
    </tr>
    <tr>
      <td class="t-body">Floating round controls on media</td>
      <td class="t-body"><span class="t-code">fab</span>, shipped</td>
    </tr>
    <tr>
      <td class="t-body">Watermark brand in card corner</td>
      <td class="t-body"><span class="t-code">t-subtle</span> caption, shipped</td>
    </tr>
  </tbody>
</table>

Five new names, zero new tokens. Every addition composes from the existing nine colors, seven sizes, twelve spaces, four radii.

## Study 1. Rank Tracker keyword table

Source: SEOmonitor Rank Tracker, dark theme. The working surface of an SEO agency: one keyword per row, hundreds of rows, three rails.

Measured. Left rail 72 pt, icon-led. Work column fluid. Right detail rail 320 pt. Row height 44 pt. Keyword at 14 pt regular, position at 15 pt bold tabular, delta as ▲2 at 12 pt colored, sparkline 64 by 20 pt, search volume right-aligned tabular. Toolbar: segment tabs 32 pt tall, search field, date range. Row hairlines at about 8% white.

Kit recreation. Rebuilt against the live board, owner-supplied capture at a 2000 px viewport. A `lab.css` board shell: toolbar over three rails on the reference's 27/27/36 split. Groups rail — `group-card` with a warning line and five stat columns under a shared `legend`. Work list — `kw` rows on hairlines: name and `tag` row, then SERP share, volume with delta and `spark`, rank with a `pill` move stamp, opportunity with its difficulty word. Detail rail — `card--tight` modules: Visibility metrics over a two-series axis `chart`, Search demand with a bar spark and `field--row` splits, SERP and Opportunity paired in a `rail-duo`, Suggestions closing on the one action. Light surface; the dark theme stays in the reference. Blur 2 at the matched viewport: +14.5%, in band.

Gap held open: board shell, legend-aligned stat grids, `pill`, axis chart — all live in `demos/reference-recreations/lab.css` as evolve candidates, not canon.

## Study 2. Monthly forecast module

Source: SEOmonitor light screens. One card answers one question: will traffic hit the target.

Measured. Card 480 by 320 pt, 16 pt radius, hairline border. Header row: title 16 pt bold left, info glyph right. Chart area 200 pt tall: twelve gray bars for actual traffic, a line for the forecast, dashed continuation for projection. Month labels 11 pt muted below. Y gridlines hairline. Values appear on hover.

Kit recreation. Retired from the demo set at the owner's call — the study stays as the reference record. The pattern it proved still holds: a `card` states the headline number in text before any chart, the chart decorates the number, direct labels beat legends.

Gap closed by 1.12.0: `metric`, `spark--bars`, chart policy text.

## Study 3. Identity hero

Source: kk.consulting. A profile that opens like a fact sheet and lands like a poster.

Measured. One column, 720 pt measure. Avatar 96 pt round. Intro paragraph 18/28 with bold spans for names and numbers, dense, no fluff sentence anywhere. Role tabs: three text pills 15 pt, active black on white inverted. Then the giant word: Founder at roughly 130 pt bold, full measure width. Stat blocks below: value 22 pt bold, label 14 pt muted.

Kit recreation. `app--single` shell. Byline `media` row and a `t-title` positioning line open the page; then the giant word: Founder as the page's one `t-hero` h1, Strategist and Mentor as `t-display` siblings. Each role section carries a `t-title` standfirst and a `metric-row` of proof; the mentor section closes on a `quote`. Bold stays in headings — the intro's bold spans stay in the reference. One `card` with the working-session offer ends the page.

## Study 4. Joi onboarding step

Source: asekachov.com, Joi app. One decision per screen, giant instruction, two inputs, one exit.

Measured. White, 24 pt side insets. Back chevron and Skip in the top corners, both muted 16 pt. Vertical center-left block: Step 1 at 15 pt medium, then the instruction at 30/36 bold across three lines. Two input rows in soft surface cards: 56 pt tall, 14 pt radius, label 16 pt bold left, value 16 pt regular right with a kebab. 8 pt between rows. Bottom: black full-width pill, 56 pt, white 17 pt bold label Next, 16 pt side insets, 12 pt bottom inset.

Kit recreation. Narrow single card. `t-micro t-muted` step counter, `t-title` instruction (22/32 holds three lines at 375 pt), two `field field--row` inside the card with hairline separation, `button button--primary` pinned last. The kit renders the reference's soft-gray input cards as hairlined rows: same molecule, kit material.

Bottom-CTA rule extracted: on narrow viewports the primary button is the last child of the sheet, full width, nothing after it.

## Study 5. Joi settings

Source: asekachov.com, Joi app. A settings list that reads in one pass.

Measured. Centered nav title 17 pt bold. Upsell banner: full-width card, 16 pt radius, brand gradient, white title 16 pt bold, subtitle 13 pt, Upgrade pill right. Then setting rows 52 pt: leading 28 pt icon tile, label 16 pt regular, trailing switch or chevron or value. Rows group into cards by topic; 24 pt between groups.

Kit recreation. `app--single` narrow. The upsell banner becomes `card--shout`: black surface, white title, one primary button, no gradient, and it counts as the column's one shout. Setting groups become cards of `field field--row` entries with `switch` trailing; icon tiles drop, the label carries the row. Value rows show the value in `t-caption t-muted` with the whole row hoverable.

## Study 6. Must person page

Source: asekachov.com, Must app. A person is a portrait, a name, three numbers.

Measured. Full-bleed black and white portrait. Bottom third: name 28 pt bold white, then three stats: value 17 pt bold, label 11 pt muted across two lines: 8 of 32 movies watched, 195 151 fans on Must, 7.6 average rating. A gradient scrim carries legibility. Chevron hints the sheet below.

Kit recreation. `card--shout` holding a `figure` with the portrait, `t-display` name, then a `metric` row of three: the kit states the numbers on the black surface with weight only. The scrim gradient is refused; the shout card's solid black is the legibility surface, the portrait sits above the text block instead of behind it. Honest structure over simulated depth.

## Study 7. Oppie flashcard

Source: asekachov.com, Oppie app. The whole screen is one word.

Measured. White canvas, 12 pt inset. Black card fills the viewport, 28 pt radius. The word Exercise top-left inside at 34 pt bold white, 24 pt inset. Brand watermark Oppie bottom-left at 17 pt, roughly 25% white. Below the card, three floating controls: round menu button left, Shuffle pill center, round plus right, all 48 pt tall.

Kit recreation. `card--shout` at full column height, `t-display` word, `t-subtle` watermark caption pinned to the card's bottom inset. Controls become the shipped `fab` pair plus a secondary `button` between them; on wide viewports they resolve to a plain button row under the card. The 28 pt radius snaps to the kit's 24.

## Study 8. Clique status feed

Source: asekachov.com, Clique app. Presence as a list.

Measured. Brand word 22 pt bold top-left, filter glyph with a red dot top-right. Feed rows 64 pt: avatar 44 pt round, name 16 pt bold with inline presence dot, status line 15 pt muted, distance 11 pt muted with a location glyph, trailing blue count badge 24 pt round or gray dot. Stale section: label 13 pt muted, rows repeat with grayscale avatars and last update 5 days ago meta. Bottom: full-width surface pill Post update, plus glyph, 52 pt.

Kit recreation. The feed row is the `media` molecule verbatim: `avatar` leading, `media__body` holding `t-caption--bold` name and `t-caption t-muted` status, `media__trail` holding a `tag` count. The unread badge's blue becomes a bold black count tag; the presence dot becomes text, online, in the meta line. Stale section heads with `t-micro t-muted`. The bottom action is `button button--primary` pinned by the narrow rule.

Gap closed by 1.12.0: `media`.

## Study 9. WeTransfer create transfer

Source: asekachov.com, WeTransfer mobile. A five-field form that feels like one card.

Measured. Sheet radius 20 pt top corners. Title 22 pt bold left, close glyph right. Segmented control: two options in a 36 pt surface track, active option white card. Files row: label 16 pt bold, chevron; thumbnail rail of 72 pt tiles, 12 pt radius, add tile first; meta line 16 files added, 13 pt, storage 170 MB of 3 GB in 11 pt muted; blue Upgrade pill right. Fields Email, Title, Message as 52 pt ghost rows with hairlines. Expiry row label plus 3 days value. Blue full-width pill Transfer, 56 pt.

Kit recreation. One `card` as the sheet. Segmented control is two `chip` elements in a row, one selected. The thumbnail rail is a `media` row per file with a square `media__figure`, name, size, remove control; the add tile is a secondary `button`. Storage meta is a `field--row` with value; the upsell link rides the same row as a `t-caption--bold` link, not a second button. Email, Title, Message are stock `field` entries. Transfer is the one primary, pinned last. WeTransfer's blue collapses to black; nothing else changes.

## Study 10. Tzlvt landing

Source: fuckgrechka.ru/tzlvt. Four screens of proof, one promise, no decoration.

Measured. One column, roughly 640 pt measure. Brand word, then h1 at 40 pt bold, lead 20/30. Four feature sections: h2 at 28 pt bold, two to three bullets at 17/26, phone screenshot figure per section. Press strip: outlet names as plain text. Free forever section: one bold claim, 10 years free, no ads, no subscriptions. Repeated CTA between sections: black pill Вести бюджет. Footer with platform links.

Kit recreation. `app--single`, number first. `t-hero` promise and a `t-title` lead, then the column's one `card--shout` fills the first viewport (`book__section--fill`) carrying a `metric` with today's number, the primary CTA, and a `t-micro t-subtle` proof line — the kit's answer to the reference's black calculator screen. A columns stack pairs two cards, The arithmetic and The day, as `field--row` ledgers; a `t-list` states the feedback loop; the free-forever section closes with a bare primary button. This study is the Landing archetype's direct ancestor.

## Study 11. Planetarium community page

Source: intuition.team/ru/planetarium. A community sold with a roster and a table.

Measured. Header: logo plus inline nav at 15 pt. Price banner as one bold line: first month 1 ruble, then 950 per month. Mission prose 17/26. Roster: 60 plus names as underlined links, wrapped inline, 15 pt. Meeting rules as short prose sections. Projects table: title link, member names, progress percent as plain text, target date; rows 44 pt with hairlines. Subscribe block with promo codes. Footer with legal lines.

Kit recreation. `app--single`. Price banner as `t-title` line inside the opening section, no box. Roster as prose paragraph of comma-separated links, hover-underlined, muted never. Projects table is `data-table`: name, members, percent as `data-table__num` text, date; no progress bars. Subscribe block is the column's one `card--shout` with a single primary. Promo codes render as `t-code` chips.

## Study 12. Studio index

Source: new.fuckgrechka.ru. Two projects, one screen, nothing else.

Measured. Brand word at 48 to 64 pt bold, stacked tagline at 20 pt muted, hairline divider. Then a two-column grid: each cell an icon at 48 pt, project title 22 pt bold, one benefit line 16 pt muted. Whole cell clickable. Footer credits in micro type with a year.

Kit recreation. `app--single`, poster first. The column's one `card--shout` fills the viewport (`book__section--fill`): `t-hero` brand, `t-title` attitude line, the studio credit pinned to the slab's foot in `t-micro t-subtle` — the kit's answer to the reference's black void page. Below, `card-stack card-stack--columns` of two `card--link` cells: title, one-line benefit, span-button naming the destination. One screen, nothing else; still the smallest complete surface in the set.

## The two commissioned surfaces

Blogpost and news front have no single reference parent; they compose from the taxonomy above and land in the same recreation batch.

**Blogpost, one column.** `app--single` at reading measure. Article header: kicker in `t-micro t-muted`, `t-hero` title, standfirst in `t-display--medium` at caption scale, byline as a `media` row: avatar, author bold, date muted. Body prose with `quote` pull, `figure` with caption, `t-list`. Related pieces as three `card--link` entries. `book__signoff` closes.

**News front, multi column.** `front` shell: lead story left as a large `card--link` with figure, headline `t-display`, standfirst, byline; latest rail right as tight `media` rows, timestamp muted; below, section grid of `card--link` cells per desk. Every headline black, every timestamp muted, zero images required to hold the layout.

## What 1.12.0 adds

Run through evolve, one conflict statement each:

1. **`chip`.** The kit has no pressable filter. Tag is metadata by law; buttons commit outcomes. A chip selects among peers: segment tabs, filters, multi-select. Pill radius, hairline border, selected state inverts. Renders as `<button class="chip">`.
2. **`media`.** The kit has no row molecule with a leading figure. Feeds, files, bylines, related lists all need it. Avatar or square figure, two-line body, trailing slot, hairlines between siblings.
3. **`metric`.** The `stat` reads as a sentence; dashboards need the number first. Value in display scale with tabular numerals, label in caption, optional delta line as glyph plus weight. No color.
4. **`data-table`.** The `registry-table` is a doc primitive by law. Products need sortable-looking dense rows: header caption bold, body rows hairlined, numeric cells right-aligned tabular, delta cells glyph plus weight, row hover 3%.
5. **`spark`.** Inline trend, bars or line, monochrome, hairline baseline. Data-driven heights ride a custom property per bar; the chart policy legalizes sub-4 data-ink dimensions while layout stays on the grid.
6. **Shells: `app--single`, `panels`, `front`.** One-column reading measure; dashboard panel grid; front-page lead plus rail plus grid. Grid gaps on macro tokens, panels are cards, nothing new below the shell line.

Chart policy, stated once: monochrome data ink, bars and lines only, every value readable as text without hover, direct labels over legends, hairline gridlines, deltas as ▲ ▼ glyphs with weight, no red, no green, no gradients, no pie.

## Density

The first recreation batch matched structure but not weight: too much air, book ceremony on product screens. The density pass measured the gap instead of eyeballing it.

**Metric.** Both sides render to grayscale, crop the device bezel from portfolio exports, inset 6% to drop frame edges, downscale to the reference's logical width (375 phone, 1280 desktop — downscale only, never upscale), Gaussian blur 2 px, edge filter, mean energy. The ratio ours over theirs is the density difference. Screenshots come from headless Chrome at true device metrics with `deviceScaleFactor` 2; references are full-resolution exports, not thumbnails. Target band: 10–20% absolute difference. Pipeline lives with the session scratch; the numbers below are round seven.

| Study | Ref | Ours | Diff |
|---|---:|---:|---:|
| 04 Joi onboarding | 0.0127 | 0.0154 | +21.1% |
| 05 Joi settings | 0.0126 | 0.0144 | +13.9% |
| 06 Person page | 0.0099 | 0.0077 | −22.1% |
| 07 Flashcard | 0.0068 | 0.0082 | +20.8% |
| 08 Status feed | 0.0090 | 0.0114 | +26.6% |
| 09 Create transfer | 0.0117 | 0.0117 | −0.2% |
| 03 Identity hero | 0.0165 | 0.0126 | −23.6% |
| 10 Tzlvt landing | 0.0084 | 0.0089 | +6.6% |
| 11 Community page | 0.0117 | 0.0104 | −10.9% |
| 12 Studio index | 0.0045 | 0.0059 | +30.9% |

Mean 17.7%, inside the band. First honest run measured 42.8%; seven rounds of rhythm work closed it.

Study 01 measures against the real Rank Tracker board (owner-supplied capture) at its own 2000 px viewport: +14.5% at blur 2, in band. The same pair at blur 5 reads +80% — a documented artifact, not a density gap: heavy blur erases a dark theme's low-contrast fine detail while light-theme ink survives, so pairs that cross theme polarity only compare fairly at low blur. Study 02's recreation is retired; its earlier blur-5 number (−14.5% against the forecast module) stands as record.

**What the pass changed.** Product rhythm on all three shells (section pads 24/32, sibling gap 12, heading-below 20, `* + h2` 40, card pads 16/20 with 8 px gap, media rows at 8 px vertical, hero ceremony 60 → 20). `book__section--fill` and `book__section--stage` for full-viewport product screens. The affordance hover law. The trail button on media rows. Pure reading pages left the shell entirely — a blogpost is a bare `.book` with body scroll and full ceremony.

**Documented gaps.** Four studies sit outside the band for structural reasons the metric cannot close and the kit will not chase: 06 and 08 rest on photographs, and photo texture blurs softer than our line art and text UI measure; 03 sets 150 px poster type against our 66 px cap; 12 is a poster void, where a 0.0014 absolute delta inflates to 30.9% on tiny denominators. These are the kit's constitution holding, not recreations failing.

**The lab answer.** An owner-sanctioned experiment layer (`demos/reference-recreations/lab.css`) now tests closures the canon refused: `t-poster` and `metric--poster` give 03, 10, 12, and 14 the poster step the 66 px cap denied (each as a `-v2` page beside the shipped original), the board shell gives study 1 its three-rail product skeleton, and `specimen` sets a glyph proof sheet in the kit's own face. Everything in the layer rides kit tokens; each class either earns an evolve into canon or dies in the lab.

## Signoff

<div class="book__signoff">
  <div class="book__signoff-stats">
    <div class="stat t-caption">
      <div><span class="t-caption--bold">12</span> studies measured and mapped.</div>
    </div>
    <div class="stat t-caption">
      <div><span class="t-caption--bold">10</span> common moves named.</div>
    </div>
    <div class="stat t-caption">
      <div><span class="t-caption--bold">5</span> components earn entry.</div>
    </div>
    <div class="stat t-caption">
      <div><span class="t-caption--bold">0</span> new tokens.</div>
    </div>
  </div>
  <div class="book__signoff-signature">
    <p class="t-caption">
      Signed by <span class="t-caption--bold">Claude,</span><br />
      architect session for <span class="t-caption--bold">Konstantin Konstantinopolskii</span><br />
      <span class="t-muted">2026-07-17, reference-study session.</span>
    </p>
  </div>
</div>
