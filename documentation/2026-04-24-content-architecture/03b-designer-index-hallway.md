---
session: 2026-04-24-content-architecture
stage: 3b
role: designer
character: Susan Kare — state-thoughtful, pixel-honest
pattern-block: 5. index-hallway
input: 02-design-director.md §Pattern blocks §5 + 01-analyst.md §Per-document jobstories §index.html + 03a-fresh-eyes-pre-index-hallway.md
output: three-column kit-shell hand-off for the rebuilt repo-root index.html — states, interaction variants, edge cases, full html draft, copy drafts, component inventory
gate: pending — feeds stage 3c (fresh-eyes post-designer)
---

Stage 3b, index-hallway pattern block. The repo root folds the kit's own three-column shell back onto itself. Sidebar carries the scroll-spy TOC of the currently-open book; the middle column is the rendered manifesto wrapped in `.book`; the inspector carries eight pointer cards — six canon + two demos — as the only cross-book navigation. No new classes. No new tokens. Future SPA swap is out of scope; every pointer click is a normal page navigation.

## Intent

When a human opens the repo root in a browser, they want the rendered manifesto above the fold + eight pointer cards into canon and demos on the side, so the repo reads as a hallway, not a dumping ground.

When an agent loads canon, it reads `skills/kk-design-system/manifesto.md` (or any other canon `.md`) directly. The agent does not visit `index.html`. The shell serves humans; canon serves agents. One source of truth, two consumers.

## Answered — 20/20

Every question from `03a-fresh-eyes-pre-index-hallway.md` answered verbatim below.

### What I'd want to see first

1. **Three columns at 0.2 s — sidebar, manifesto, inspector visible?** Yes. `app[data-view="doc"]` paints all three columns at ≥1024 px. Sidebar 224 px + middle fluid + inspector 336 px. Column-reveal orchestrator (`kit.js § initColumnReveal`) staggers the three columns on first paint — sidebar slides from left, doc slides from below, inspector slides from right, 160 ms offset each.
2. **Manifesto hero + first paragraph above the fold?** Yes. Markdown renders directly into `.book`; the first render event is the markdown's own `# Manifesto` h1 at `t-hero` (66/66) followed by its lead paragraph at `t-body` (22/32). No shell-owned hero competes — `data-md-heading-offset="0"` lets the markdown carry the full heading stack. On a 900 px tall viewport the hero + lead + first §Why this exists heading fit above the fold.
3. **At least three pointer cards visible without scroll?** Yes. Inspector holds eight cards; the first three (Patterns, Components, Voice) sit above the fold at 900 px tall. Remaining five reveal as the inspector scrolls independently.
4. **"Hallway of the system" signal — clear framing?** Sidebar brand reads "Agentic Design System". Inspector opens with a `card--heading` labeled "Open a book". Middle column carries the manifesto. Three signals — brand, label, content — all name the room the reader is in. No "welcome" or "home" copy. No landing-page framing.

### What I'd try to do

5. **Pointer-card click target — whole card, or small area?** Whole card. The outer `<a class="card card--interactive">` wraps the entire markup. Hit area equals the card's rendered bounds. The `button` inside reads as a visible CTA affordance, not a separate target — clicks on the button bubble to the anchor.
6. **Sidebar TOC click + scroll-spy update?** Yes. `kit.js § initScrollSpy` already handles this. Click a TOC link, the doc scrolls to the target `.book__section`, scroll-spy locks the indicator to the clicked item until scroll settles, then resumes tracking. Works today with the `.doc__section` rename to `.book__section` in stage 5.
7. **Resize to 800 px — narrow pattern engages smoothly?** Yes. The existing `@media (max-width: 1023px)` tablet rule hides the sidebar by default, keeps the inspector, and exposes the `fab--nav` to swap in the sidebar. At ≤800 px phone rule kicks in: one column at a time, driven by `[data-view]` on `.app`. The reader lands in `doc` view by default and toggles `nav` or `inspector` via the two FABs. No new narrow shell.
8. **Phone view — pointer cards reachable via hamburger?** Yes, but via the inspector FAB, not the nav FAB. The nav FAB opens the sidebar TOC (internal to the current book). The inspector FAB — labeled "Open a book" on this surface — opens the pointer-card stack. Two FABs, two intents, kept separate.
9. **Hover pointer card — 3 % lift visible?** Yes. `.card:hover` already fills to 3 % surface. Inherited verbatim from the kit. No custom hover. Focus state inherits from `button:focus-visible` rules already in `style.css`.
10. **Scroll to manifesto bottom — scroll-spy tracks last section?** Yes. The observer's `rootMargin: '0px 0px -60% 0px'` keeps the last section latched once the reader crosses its top. `scrollend` fallback covers smooth-scroll overshoot.

### What this is for

11. **Audience optimized for — first-time, returning, or agent?** First-time human. Returning maintainer is a subset of first-time human; the shell does not reward familiarity with shortcuts. Agent never visits; agent loads `manifesto.md` directly. The shell is the human-side mirror of what the agent already reads.
12. **Prior step — link, clone, agent load — shell handles both?** Human prior step = browser opens `index.html` (local file or served). Agent prior step = role skill does `Read skills/kk-design-system/manifesto.md`. Two prior steps, two surfaces. `index.html` handles only the human path. The agent path bypasses the shell entirely.
13. **Next step — read + pick, or skim + leave?** Primary next step: read the manifesto end to end, then pick a pointer card for deeper canon. Secondary: skim the manifesto, click a pointer card, leave. Both supported — the pointer cards sit in the inspector at rest state the whole time, never interrupting.

### Unclarities

14. **Pointer-card contents — title + one-line description + target path?** Title + one-line description inside the card body. Target path lives implicitly in the `href` — no visible `skills/kk-design-system/canon/patterns.md` string; that would be noise. The one-line description is jobstory-shaped ("when composing any layout, start here"). A reader decides from title + description without hover.
15. **Pointer-card ordering — pattern-first visible, or alphabetical?** Pattern-first, matching the §Navigation order inside manifesto.md. Order: Patterns → Components → Voice → Pipeline → Protocols → Tokens → Fundamental demo → Renderer smoke. The two demos sit at the bottom as a second inspector group separated by a `card--heading` reading "Demos".
16. **Demo cards — same weight as canon cards, or demoted?** Demoted. Canon cards sit in one `inspector__group`; demos sit in a second group under a "Demos" `card--heading`. Same card shape, same visual weight per card — but the group separator + label tells the reader these are previews of canon, not canon. No `t-muted` on demo cards; muted breaks the no-muted-by-default rule. The grouping carries the rank step.
17. **Click on pointer — middle swap or whole shell re-render?** Whole shell re-render. Future SPA swap is out of scope this session; every pointer-card click is a standard anchor navigation. The target page (`skills/kk-design-system/canon/patterns.md` rendered by its own `.html` wrapper, or the raw `.md` for agents opening in GitHub) loads as a fresh document. Inspector re-renders with its full card stack; sidebar re-renders with the new book's TOC.
18. **Sidebar TOC refresh on book change — seamless or jarring?** A full page load. The sidebar for `patterns.md` is a different sidebar than the one for `manifesto.md`, because scroll-spy TOCs are book-internal. A full reload lets each book ship its own TOC as part of its own shell. Seamless vs jarring is a stage-6 decision, parked as ideation for an SPA swap session.

### 0.2-second check

19. **80/20 visual hierarchy obvious — middle dominates?** Yes. At 1280 px viewport, middle column takes 720 px (56 %), sidebar 224 px (17 %), inspector 336 px (27 %). Visual weight reads middle-dominant because the sidebar carries only t-subtitle nav labels + a thin scroll-spy indicator, and the inspector carries eight transparent cards at rest. The middle carries full t-hero + t-body prose — the densest visual field by a wide margin.
20. **Reading-surface vs product-marketing framing?** Reading surface. No hero banner, no CTA splash, no marketing headline. The first content the reader sees is the manifesto's own `# Manifesto` title followed by philosophy prose. Pointer cards do not shout. Brand is a small t-title in the sidebar header, not a logo lock-up. The room feels like a library floor, not a product page.

## States

Full state map for the three interactive surfaces: pointer cards, scroll-spy indicator, narrow-mobile shell.

### Pointer card (card card--interactive inside .inspector)

```
REST
┌────────────────────────────────────────┐
│  Patterns                              │  ← h3 t-title, Bold 700
│  When composing any layout, start      │  ← p t-caption, Medium 500
│  here. Three columns, card stack,      │
│  narrow mobile.                        │
│                                        │
│  [ Open the book ]                     │  ← button, full-width
└────────────────────────────────────────┘
  surface: transparent
  radius:  24 px
  padding: 24 px

HOVER
┌────────────────────────────────────────┐
│  Patterns                              │
│  When composing any layout, start      │
│  here. Three columns, card stack,      │
│  narrow mobile.                        │
│                                        │
│  [ Open the book ]                     │
└────────────────────────────────────────┘
  surface: --color-surface-overlay (3 %)
  cursor:  pointer
  motion:  200 ms ease-out on background

FOCUS (keyboard)
┌────────────────────────────────────────┐
│  Patterns                              │
│  When composing any layout, start      │
│  here. Three columns, card stack,      │
│  narrow mobile.                        │
│                                        │
│  [ Open the book ]                     │
└────────────────────────────────────────┘
  outline: inherited :focus-visible on the anchor
  surface: --color-surface-overlay (3 %)
  (button inside shows its own :focus-visible if tabbed)

ACTIVE (pressed)
┌────────────────────────────────────────┐
│  Patterns                              │
│  When composing any layout, start      │
│  here. Three columns, card stack,      │
│  narrow mobile.                        │
│                                        │
│  [ Open the book ]                     │
└────────────────────────────────────────┘
  transform: scale(0.96)
  motion:    200 ms ease-out (press feedback rule)

DISABLED — target file missing at build time
┌────────────────────────────────────────┐
│  Patterns                              │
│  When composing any layout, start      │
│  here. Three columns, card stack,      │
│  narrow mobile.                        │
│                                        │
│  [ Not yet shipped ]                   │  ← button label flips
└────────────────────────────────────────┘
  anchor → plain div (no href)
  cursor: not-allowed
  body:   unchanged — the content is still a commitment
  NOTE:   only engages if a canon file is legitimately
          missing; default is target present + button reads
          "Open the book". Stage 5 check: every card's href
          must resolve, or the card demotes here.

NARROW-MOBILE STACKED (≤800 px, inspector in [data-view="inspector"])
┌────────────────────────────────────────┐
│  Patterns                              │
│  When composing any layout, start      │
│  here. Three columns, card stack,      │
│  narrow mobile.                        │
│                                        │
│  [ Open the book ]                     │
└────────────────────────────────────────┘
  column: full-width of viewport
  padding and radius inherited (24 / 24)
  no visual change to card itself — the shell moved,
  not the card.
```

### Scroll-spy indicator (.toc__indicator inside .sidebar__nav)

```
REST (before first observation)
│ ▢ Why this exists
│ ▢ Philosophy
│ ▢ Principles
│ ▢ Foundations
  indicator: absent — not .is-positioned yet

ACTIVE SECTION (observer reports "Philosophy" visible)
│ ▢ Why this exists
│ ■ Philosophy                ← .is-active on <li>
│ ▢ Principles                  .toc__indicator slides to
│ ▢ Foundations                 this row, height locks to
                                 the <li>'s bounding rect
  indicator: .is-positioned + .is-tracking
  motion:    translate3d + height on a var(--dur-base) ease-spring

MID-ANIMATION (reader clicks "Principles", scroll smooth-scrolling)
│ ▢ Why this exists
│ ▢ Philosophy
│ ■ Principles                ← indicator locked to this until scrollend
│ ▢ Foundations
  scrollLocked: true in kit.js — the observer is muted
  until scrollend, wheel, or touchstart releases
  the lock; indicator does not chase passing
  sections.
```

### Narrow-mobile shell (three views of .app)

```
DESKTOP ≥1024 px — default
┌──────────┬────────────────────┬──────────┐
│ sidebar  │  book (manifesto)  │ inspect  │
│ 224 px   │  fluid             │ 336 px   │
└──────────┴────────────────────┴──────────┘
  app[data-view="doc"]  — three columns

TABLET 800–1023 px, data-view="doc" (default)
┌────────────────────────────┬──────────┐
│  book (manifesto)          │ inspect  │
│  fluid                     │ 336 px   │
└────────────────────────────┴──────────┘
                                  [≡]  [◼]   ← two FABs: nav, inspector
  sidebar: display:none
  inspector: visible by default (the pointer cards
             are the primary nav at the tablet rank)

TABLET 800–1023 px, data-view="nav" (sidebar swap)
┌────────────────────────────┬──────────┐
│  book (manifesto)          │ sidebar  │
│  fluid                     │ 224 px   │
└────────────────────────────┴──────────┘
                                  [≡]  [◼]
  inspector: display:none
  sidebar: swapped into the inspector slot
           (kit rule: .app[data-view="nav"] .sidebar
           { display: flex; } + .inspector { display:
           none; })

PHONE ≤800 px, data-view="doc"
┌──────────────────────────────────────┐
│  book (manifesto)                    │
│  full width                          │
└──────────────────────────────────────┘
                                  [≡]  [◼]
  sidebar + inspector: display:none
  two FABs float

PHONE ≤800 px, data-view="nav" (sidebar hamburger open)
┌──────────────────────────────────────┐
│  sidebar                             │
│  full width — scroll-spy TOC         │
│  of the current book                 │
└──────────────────────────────────────┘
                                  [≡]  [◼]
  tap any TOC link → kit.js flips data-view back to "doc"
  and scrolls the book to the target
  (kit.js § initNarrowView handles the flip)

PHONE ≤800 px, data-view="inspector" (inspector slide-in)
┌──────────────────────────────────────┐
│  inspector                           │
│  full width — eight pointer cards    │
└──────────────────────────────────────┘
                                  [≡]  [◼]
  tap a pointer card → full page navigation to the
  target .md (no data-view toggle needed — the page
  reloads entirely)
```

## Interaction variants

### First-time human at repo root

1. Clones the repo, opens `index.html` in Chrome.
2. Sees three columns. Middle column renders the manifesto starting at `# Manifesto`.
3. Scrolls the middle column; sidebar TOC indicator tracks the active section.
4. Reaches the end of §Principles, glances right, sees eight pointer cards titled Patterns / Components / Voice / Pipeline / Protocols / Tokens / Fundamental / Renderer smoke.
5. Picks Patterns because they came here to compose a layout. Clicks the card.
6. Browser navigates to `skills/kk-design-system/canon/patterns.md` wrapper page. Different book, same shell.

### Returning maintainer

1. Opens `index.html` to re-ground after a break.
2. Middle column renders manifesto. Starts reading §Why this exists.
3. Remembers they wanted to update the Type foundation. Opens the Components pointer card in a new tab (⌘-click on Mac). Returns to the manifesto tab.
4. Reads end to end in one sitting.

### Agent canon-load

1. Role skill fires `Read skills/kk-design-system/manifesto.md`.
2. Skill reads the raw markdown. `index.html` is not touched.
3. Skill picks off the `## Navigation` section for cross-book pointers, walks into `canon/components.md` or `canon/patterns.md` via the same Read tool.
4. The three-column shell is invisible to the agent. Same source of truth, two consumers.

### Desktop ≥1024 px

Three columns visible. Pointer cards all eight reachable by scrolling the inspector column. Sidebar TOC tracks the book. No FABs. Cursor + keyboard both work.

### Tablet 800–1023 px

Two columns visible by default: middle book + inspector. Sidebar hidden; nav FAB swaps it in over the inspector. Inspector stays visible because pointer cards are the primary nav at this rank — without the sidebar, the reader still needs a way out of the current book.

### Phone <800 px

One column at a time. Default view: doc. Nav FAB opens sidebar over the book; inspector FAB opens inspector over the book. Both FABs float above the app. Tap-through behavior: tapping a TOC link flips back to doc view and scrolls; tapping a pointer card navigates away entirely.

### Pointer-card click behavior

- **Near-term (this session).** Standard anchor navigation. `<a class="card card--interactive" href="...">` — click loads the target URL. Browser history receives a new entry. Back button returns to index.html.
- **Future (out of scope).** SPA-style swap — intercept the click, fetch the target markdown, replace the middle column's `data-md-src`, call `KK.refresh()`, push history state. Deferred to a dedicated session; the current shell leaves hooks (`card--interactive` class, anchor href) that a future SPA layer can upgrade without touching markup.

## Edge cases

### Missing manifesto.md

`data-md-src="skills/kk-design-system/manifesto.md"` fails the fetch. `md.js § load` catches the error and writes `<p class="t-caption t-muted">Markdown source unavailable: skills/kk-design-system/manifesto.md</p>` into the `.book` wrapper. Sidebar TOC renders empty (no `.book__section` elements for the observer to latch onto — scroll-spy degrades to nothing). Inspector cards still work. Repo still navigable. Error is visible in the devtools console.

### Missing demo folder

A demo pointer card's href points at `demos/fundamental--accepted/index.html`. If the folder is absent, the anchor 404s on click. The card itself renders fine — the href is just a string until clicked. Stage 5 ship-discipline check: hit every pointer card once, confirm no 404. If a demo is legitimately removed, the pointer card removes in the same bundle. No orphan cards.

### Deep-linked scroll on first load

Reader lands at `index.html#principles`. Browser native anchor handling scrolls the page to `#principles` — but the `.book__section` nodes do not exist until after md.js renders + the post-render hook wraps h2s into sections. Timing: native scroll fires on paint; section nodes appear on `kk:md-rendered`. Fix already in place: the post-render hook calls `KK.refresh()`, and scroll-spy re-observes. But native scroll has already settled on a placeholder. Workaround in scope: the post-render hook re-reads `location.hash` and calls `location.hash = location.hash` to retrigger anchor resolution after sections exist. Out of scope for this session if the existing behavior is acceptable; flagged for stage 5.

### Scroll-spy on a very short manifesto (< viewport height)

Observer fires once, last section is immediately the only visible section. Indicator locks to the last TOC entry. Correct behavior — there is no other section to latch onto. No visual glitch.

### Scroll-spy on a very long manifesto

Fourteen `.book__section` nodes (one per top-level h2). Observer's `rootMargin: '0px 0px -60% 0px'` keeps the indicator one section ahead of the bottom 60 % of the viewport. Reader scrolls smoothly top to bottom, indicator walks down the sidebar in lockstep. No performance issue — IntersectionObserver handles thousands of entries in practice. The active `nav-group` scrolls itself into view inside the sidebar so the reader never loses the indicator off-screen (`kit.js § scrollActiveIntoView`).

### Pointer card to a not-yet-rendered md file

E.g., the reader clicks Patterns before `canon/patterns.md` is shipped. If the wrapper HTML exists but the `.md` is missing, the wrapper page loads, md.js fails the fetch, the wrapper's `.book` wrapper shows the caption-muted error string. Shell is intact; content is absent. Reader reads the error and clicks back. If the wrapper HTML is also missing: hard 404. Stage 5 ship-discipline check catches both.

## Example content

Full rebuilt `index.html`. Three-column kit shell, `.book` wrapper on the middle column, eight pointer cards in the inspector grouped as 6 canon + 2 demos. `.book__*` names the nested classes. Under 250 lines.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Agentic Design System — signed, by Konstantin Konstantinopolskii</title>
  <link rel="preload" href="./fonts/commissioner/Commissioner-Latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="./vars.css?v=1.3.0">
  <link rel="stylesheet" href="./style.css?v=1.3.0">
</head>
<body>
  <div class="app" data-view="doc">

    <!-- ============================================================== -->
    <!-- Sidebar: brand + scroll-spy TOC of the currently-rendered book -->
    <!-- Only internal nav lives here. Cross-book nav lives in the      -->
    <!-- inspector pointer cards. Nav groups are hand-curated per book. -->
    <!-- ============================================================== -->
    <aside class="sidebar" aria-label="Navigation">
      <div class="sidebar__header t-title">Agentic<br />Design&nbsp;System</div>

      <nav class="sidebar__nav" id="toc">
        <span class="toc__indicator" aria-hidden="true"></span>

        <section class="nav-group">
          <h4 class="t-subtitle">Meanings</h4>
          <ul class="nav-group__items">
            <li class="t-caption"><a href="#why-this-exists">Why this exists</a></li>
            <li class="t-caption"><a href="#philosophy">Philosophy</a></li>
            <li class="t-caption"><a href="#job-stories">Job stories</a></li>
            <li class="t-caption"><a href="#time-to-value">Time to value</a></li>
          </ul>
        </section>

        <section class="nav-group">
          <h4 class="t-subtitle">Principles</h4>
          <ul class="nav-group__items">
            <li class="t-caption"><a href="#principles">Principles</a></li>
          </ul>
        </section>

        <section class="nav-group">
          <h4 class="t-subtitle">Agents</h4>
          <ul class="nav-group__items">
            <li class="t-caption"><a href="#agents">Agents</a></li>
            <li class="t-caption"><a href="#pipeline">Pipeline</a></li>
          </ul>
        </section>

        <section class="nav-group">
          <h4 class="t-subtitle">Navigation</h4>
          <ul class="nav-group__items">
            <li class="t-caption"><a href="#navigation">Reading order</a></li>
          </ul>
        </section>
      </nav>

      <footer class="sidebar__footer t-caption">
        2026, fuckgrechka.ru<br />
        Powered by kk.consulting
      </footer>
    </aside>

    <!-- ============================================================== -->
    <!-- Book: the rendered manifesto. No shell hero. Source #Manifesto -->
    <!-- carries the page h1 at t-hero via data-md-heading-offset="0".  -->
    <!-- Post-render hook wraps each top-level ## into a .book__section -->
    <!-- so scroll-spy tracks and the sidebar TOC resolves.             -->
    <!-- ============================================================== -->
    <main class="book" id="doc" data-md-src="./skills/kk-design-system/manifesto.md" data-md-heading-offset="0">
    </main>

    <!-- ============================================================== -->
    <!-- Inspector: eight pointer cards. Six canon + two demos.         -->
    <!-- Each card is a card--interactive anchor wrapping its content.  -->
    <!-- One inspector__group per rank tier (canon vs demos).           -->
    <!-- Pattern-first reading order on canon: patterns → components →  -->
    <!-- voice → pipeline → protocols → tokens.                         -->
    <!-- ============================================================== -->
    <aside class="inspector" aria-label="Open a book">

      <section class="inspector__group">
        <header class="card card--heading">
          <h2 class="t-display">Open a book</h2>
        </header>

        <a class="card card--interactive" href="./skills/kk-design-system/canon/patterns.md">
          <div class="card__heading">
            <h3 class="t-title">Patterns</h3>
            <p class="t-caption">When composing any layout, start here. Three columns, card stack, narrow mobile.</p>
          </div>
          <span class="button t-subtitle">Open the book</span>
        </a>

        <a class="card card--interactive" href="./skills/kk-design-system/canon/components.md">
          <div class="card__heading">
            <h3 class="t-title">Components</h3>
            <p class="t-caption">When drilling from a pattern into a part, find every foundation, component, and forbidden thing.</p>
          </div>
          <span class="button t-subtitle">Open the book</span>
        </a>

        <a class="card card--interactive" href="./skills/kk-design-system/canon/voice.md">
          <div class="card__heading">
            <h3 class="t-title">Voice</h3>
            <p class="t-caption">When writing a string, find shape rules and the AI-tells inventory in one place.</p>
          </div>
          <span class="button t-subtitle">Open the book</span>
        </a>

        <a class="card card--interactive" href="./skills/kk-design-system/pipeline/pipeline.md">
          <div class="card__heading">
            <h3 class="t-title">Pipeline</h3>
            <p class="t-caption">When entering or evaluating a session, find stages, role roster, and communication protocol.</p>
          </div>
          <span class="button t-subtitle">Open the book</span>
        </a>

        <a class="card card--interactive" href="./skills/kk-design-system/pipeline/protocols.md">
          <div class="card__heading">
            <h3 class="t-title">Protocols</h3>
            <p class="t-caption">When shipping, evolving, or logging an exception, find bundle, semver, evolve, backlog, ideation.</p>
          </div>
          <span class="button t-subtitle">Open the book</span>
        </a>

        <a class="card card--interactive" href="./skills/kk-design-system/tokens.json">
          <div class="card__heading">
            <h3 class="t-title">Tokens</h3>
            <p class="t-caption">When code needs a design token, read the machine-readable source of truth.</p>
          </div>
          <span class="button t-subtitle">Open the file</span>
        </a>
      </section>

      <section class="inspector__group">
        <header class="card card--heading">
          <h2 class="t-display">Demos</h2>
        </header>

        <a class="card card--interactive" href="./demos/fundamental--accepted/index.html">
          <div class="card__heading">
            <h3 class="t-title">Fundamental</h3>
            <p class="t-caption">Live component inventory. Deep-link target for every canon class.</p>
          </div>
          <span class="button t-subtitle">Open the demo</span>
        </a>

        <a class="card card--interactive" href="./demos/md-renderer-smoke/index.html">
          <div class="card__heading">
            <h3 class="t-title">Renderer smoke</h3>
            <p class="t-caption">Side-by-side markdown render vs source. Ship-time check for the .md pipeline.</p>
          </div>
          <span class="button t-subtitle">Open the demo</span>
        </a>
      </section>
    </aside>
  </div>

  <!-- ================================================================ -->
  <!-- Scripts: kit.js first (auto-init on DOMContentLoaded); md.js     -->
  <!-- fetches the manifesto into .book. Post-render hook wraps each    -->
  <!-- top-level ## into its own .book__section with a slug id so       -->
  <!-- scroll-spy tracks and sidebar TOC anchors resolve.               -->
  <!-- ================================================================ -->
  <script src="./js/kit.js" defer></script>
  <script src="./js/md.js" defer></script>
  <script defer>
    function slugify(text) {
      return (text || "")
        .toLowerCase()
        .replace(/[–—]/g, "-")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }

    function wrapBookSections() {
      var book = document.querySelector(".book");
      if (!book) return;
      var children = Array.prototype.slice.call(book.childNodes);
      var sections = [];
      var current = null;

      children.forEach(function (node) {
        var isH2 = node.nodeType === 1
          && node.tagName === "H2"
          && node.classList.contains("t-display");
        if (isH2) {
          current = document.createElement("article");
          current.className = "book__section";
          var id = slugify(node.textContent);
          if (id) current.id = id;
          sections.push(current);
          current.appendChild(node);
        } else if (current) {
          current.appendChild(node);
        } else {
          if (!sections.length || sections[0].id) {
            var lead = document.createElement("article");
            lead.className = "book__section";
            sections.unshift(lead);
          }
          sections[0].appendChild(node);
        }
      });

      book.innerHTML = "";
      sections.forEach(function (s) { book.appendChild(s); });
    }

    document.addEventListener("kk:md-rendered", function () {
      wrapBookSections();
      if (window.KK && typeof window.KK.refresh === "function") {
        window.KK.refresh();
      }
    });
  </script>

  <!-- FABs for tablet + phone. Outside .app so overflow:hidden cannot clip. -->
  <button class="fab fab--nav" data-view-target="nav" type="button" aria-label="Open the sidebar">
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <rect width="18" height="2" rx="1" fill="currentColor"/>
      <rect y="6" width="18" height="2" rx="1" fill="currentColor"/>
      <rect y="12" width="18" height="2" rx="1" fill="currentColor"/>
    </svg>
  </button>
  <button class="fab fab--inspector" data-view-target="inspector" type="button" aria-label="Open a book">
    <span class="fab__count">8</span>
  </button>
</body>
</html>
```

Line count: 237 (under 250). No inline styles. No new classes. Shell carries no signoff — the manifesto's own §Signoff section already closes the book inside the rendered markdown.

Note on `id="doc"`: kit.js § initScrollSpy + initCommentSelectionFlow both query `#doc`. Keeping the id on the `.book` main element preserves the JS contract without renaming every selector. The **class** renames to `.book`; the **element id** stays `doc` until the kit-internal rename session touches kit.js itself. Stage 5 owns that decision; this hand-off matches the stage-2 direction ("Rename is mechanical — every occurrence of `.doc`/`.doc__*` in CSS selectors, JS class toggles, HTML class attributes") and flags the `#doc` id as a JS-only string that kit.js will relax in the same bundle.

Note on `card card--interactive` as an anchor: the kit's interactive-card contract expects `data-state` promotion inside the inspector stack JS (`kit.js § initInspectorStack`). On the index-hallway surface the anchor navigates on click before any JS state flip matters. An anchor can carry `card card--interactive` classes — the classes are CSS-only; the click behavior is standard anchor navigation. `kit.js § handleTrigger` does call `promoteCard()` on click, but since the click also fires the anchor's navigation, the promotion is a discarded side effect — the page unloads. No conflict. Stage 5 may want to add a `data-nav="true"` attribute to suppress the promotion flicker; flagged as a micro-polish, not a blocker.

## UI copy drafts

Every visible string on the shell. Sentence case. Imperative on CTAs. No first-person. No em-dashes in headlines. Passes the voice audit.

### Sidebar

| Role | String |
|------|--------|
| Brand (t-title, line-break preserved) | `Agentic<br />Design System` |
| Nav group header 1 | `Meanings` |
| Nav group item 1a | `Why this exists` |
| Nav group item 1b | `Philosophy` |
| Nav group item 1c | `Job stories` |
| Nav group item 1d | `Time to value` |
| Nav group header 2 | `Principles` |
| Nav group item 2a | `Principles` |
| Nav group header 3 | `Agents` |
| Nav group item 3a | `Agents` |
| Nav group item 3b | `Pipeline` |
| Nav group header 4 | `Navigation` |
| Nav group item 4a | `Reading order` |
| Footer line 1 | `2026, fuckgrechka.ru` |
| Footer line 2 | `Powered by kk.consulting` |

### Inspector — canon group

| Card | Title | Description | Button |
|------|-------|-------------|--------|
| Patterns | `Patterns` | `When composing any layout, start here. Three columns, card stack, narrow mobile.` | `Open the book` |
| Components | `Components` | `When drilling from a pattern into a part, find every foundation, component, and forbidden thing.` | `Open the book` |
| Voice | `Voice` | `When writing a string, find shape rules and the AI-tells inventory in one place.` | `Open the book` |
| Pipeline | `Pipeline` | `When entering or evaluating a session, find stages, role roster, and communication protocol.` | `Open the book` |
| Protocols | `Protocols` | `When shipping, evolving, or logging an exception, find bundle, semver, evolve, backlog, ideation.` | `Open the book` |
| Tokens | `Tokens` | `When code needs a design token, read the machine-readable source of truth.` | `Open the file` |

### Inspector — demos group

| Card | Title | Description | Button |
|------|-------|-------------|--------|
| Fundamental | `Fundamental` | `Live component inventory. Deep-link target for every canon class.` | `Open the demo` |
| Renderer smoke | `Renderer smoke` | `Side-by-side markdown render vs source. Ship-time check for the .md pipeline.` | `Open the demo` |

### Group headings

| Location | String |
|----------|--------|
| Inspector group 1 heading | `Open a book` |
| Inspector group 2 heading | `Demos` |

### Narrow-mobile toggle labels (aria-label on FABs)

| Control | aria-label |
|---------|------------|
| Nav FAB | `Open the sidebar` |
| Inspector FAB | `Open a book` |

### Error string (md.js fallback)

Emitted when `data-md-src` fetch fails. Not shell copy per se, but visible:

| Location | String |
|----------|--------|
| md.js fallback | `Markdown source unavailable: <path>` |

Total copy drafts: 27 strings across sidebar, inspector, toggles, group headings, and one error fallback.

### Voice audit check

- No "I" anywhere. Every description is "when X, [we] do Y" or a bare noun phrase.
- No em-dashes in any headline or button label.
- Sentence case throughout.
- No AI tells: no "simply", no "seamlessly", no "empowers", no "robust", no not-just-but, no rule-of-three, no moralizing closers.
- No muted-by-default: every caption is Medium 500 black.
- No light-weight (400) anywhere — CSS defaults handle this.

## Component list

Every class used on the rebuilt `index.html`, counted. Every entry resolves to an existing kit primitive — no inventions.

| Class | Count | Kit section |
|-------|-------|-------------|
| `app` | 1 | Components §Patterns §Three columns |
| `sidebar` | 1 | Components §Navigation |
| `sidebar__header` | 1 | Components §Navigation |
| `sidebar__nav` | 1 | Components §Navigation |
| `sidebar__footer` | 1 | Components §Navigation |
| `toc__indicator` | 1 | Components §Navigation |
| `nav-group` | 4 | Components §Navigation |
| `nav-group__items` | 4 | Components §Navigation |
| `book` | 1 | Components §Patterns §Three columns (renamed from `.doc`) |
| `inspector` | 1 | Components §Patterns §Three columns |
| `inspector__group` | 2 | Components §Patterns §Three columns |
| `card` | 10 | Components §Card |
| `card--heading` | 2 | Components §Card |
| `card--interactive` | 8 | Components §Card (variant) |
| `card__heading` | 8 | Components §Card |
| `button` | 8 | Components §Button |
| `fab` | 2 | Components §Patterns §Narrow (mobile) |
| `fab--nav` | 1 | Components §Patterns §Narrow (mobile) |
| `fab--inspector` | 1 | Components §Patterns §Narrow (mobile) |
| `fab__count` | 1 | Components §Patterns §Narrow (mobile) |
| `t-hero` | 0 (shell) — 1 (rendered) | Components §Typography utility classes |
| `t-display` | 2 | Components §Typography utility classes |
| `t-title` | 9 | Components §Typography utility classes |
| `t-body` | 0 (shell) — many (rendered) | Components §Typography utility classes |
| `t-subtitle` | 12 | Components §Typography utility classes |
| `t-caption` | 13 | Components §Typography utility classes |
| `t-micro` | 0 | Components §Typography utility classes (available, not used here) |
| `book__section` | N (one per ## in manifesto) | Components §Patterns (renamed from `.doc__section`) |
| `book__signoff` | 0 (shell) — 1 (inside manifesto's rendered §Signoff block) | Components §Signoff (renamed from `.doc__signoff`) |

`t-hero` count note: the shell itself renders no t-hero. The rendered manifesto's source `# Manifesto` becomes the single `<h1 class="t-hero">` on the page via `data-md-heading-offset="0"`. One hero per page, rule preserved.

`book__signoff` count note: the shell itself renders no signoff. The manifesto's §Signoff section lives inside the rendered markdown and ships with `book__signoff` naming (stage 5 replaces the existing raw-HTML signoff block in manifesto.md with the renamed classes).

### Inventory check

- Every class appears in `skills/kk-design-system/manifesto.md § Components` or is a rename-in-progress (`book`, `book__section`, `book__signoff`) stamped by the stage-2 direction document.
- No new classes.
- No new tokens.
- No off-grid spacing — all spacing inherited from `.card`, `.sidebar`, `.inspector` kit rules.
- No off-token color — text black, surface transparent, hover 3 %, all via existing tokens.

Pass.

## Gate

Pending. Stage 3c (fresh-eyes post-designer) runs next against this hand-off.

## Hand-off

`kk-role-fresh-eyes-jobstory` in post-designer mode for pattern block 5 — index-hallway. Input: this file + `03a-fresh-eyes-pre-index-hallway.md`. Expected: every numbered question 1–20 checked answered, gate passes or returns to designer.
