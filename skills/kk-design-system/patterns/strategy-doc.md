# Pattern — strategy / audit document

The canonical output of the Wealthy consulting pipeline. An audit transcription becomes a research-backed strategy, rendered in this design system, commentable, signed.

## Shell

Three columns. Narrow collapses to one.

```html
<div class="app" data-view="doc">
  <aside class="sidebar" aria-label="Navigation">
    <div class="sidebar__header t-title">Strategy<br />for Client Name</div>
    <nav class="sidebar__nav" id="toc">
      <span class="toc__indicator" aria-hidden="true"></span>
      <section class="nav-group">
        <h3 class="t-subtitle">Findings</h3>
        <ul class="nav-group__items">
          <li class="t-caption"><a href="#snapshot">Snapshot</a></li>
          <li class="t-caption"><a href="#signals">Signals</a></li>
        </ul>
      </section>
      <!-- more groups -->
    </nav>
    <footer class="sidebar__footer t-caption">
      2026, kk.consulting<br />
      Strategy pipeline, run #142
    </footer>
  </aside>

  <main class="doc" id="doc">
    <h1 class="t-hero">Strategy for Client Name</h1>
    <p class="t-body">One-paragraph framing, job-story shape.</p>

    <!-- sections -->

    <!-- signoff at the end -->
  </main>

  <aside class="inspector"><!-- comments + actions --></aside>
</div>
```

## Document body shape

Match the canonical document (`index.html`). Every section is:

```html
<h2 class="doc__part">Part name</h2>

<article class="doc__section" id="section-slug">
  <h2 class="t-display">
    Section title<br />
    <span class="t-display--medium t-muted">Subtitle or tagline</span>
  </h2>
  <p class="t-body">One opening paragraph. Job story, framing, stakes.</p>
  <div class="card">
    <dl class="doc__spec">
      <!-- structured evidence -->
    </dl>
  </div>
</article>
```

## Section recipes for strategy docs

### Snapshot
One spec card. Keys: Name, Role, Context, Goal, Constraints. Values stay short — one line each.

### Signals / findings
Spec list with three columns (`doc__spec--value`). Key = signal name. Middle = weight or count. Right = explanation.

### Recommendations
Numbered list `ol.t-list`. Each item is one imperative sentence naming the outcome.

### Evidence / research
Cards of quotes or citations. Use `blockquote.quote` for direct quotes; `cite` for attribution.

### Plan
`doc__spec--triple` when each row is claim / reality / resolution. Otherwise regular spec list.

### Signoff
Always last. Stats + byline + signature. See `components.md`.

## Admin vs client views

Same design system, two states.

- **Admin view** (the consultant driving the pipeline): black inspector column with research controls, prompt editor, accept/reject affordances. `data-view="doc"` on `.app` root; admin-specific classes on the inspector.
- **Client view** (the person the strategy is for): identical document body, inspector shrinks to next-steps card (subscribe, integrate with own AI, try free tier).

The content is identical across views. The margin changes.

## Commenting pattern

Comments live in the inspector. See `components.md` → Comment. When a reader selects text in the body, a draft shout card pins at the top of the inspector with the `field__fake-caret` ready. On commit, it becomes a thread card. Highlights in the body use `.highlight` spans.

Comments feed back into the pipeline. They are data — what the user agreed with, pushed back on, asked to change. Store them, run the pipeline again with them as input.

## Must-have rules for every strategy doc

1. **Signed.** Every doc ends with the signoff block, full author + timestamp + handwritten SVG.
2. **Job-story headers.** Each section title carries a subtitle that names the job it serves.
3. **No muted defaults.** Body text stays black + medium. Muted for bylines and hairlines only.
4. **Supervisor gate** before ship. Run `kk-ds-supervisor` or invoke stage 4 of the pipeline manually.
5. **One primary CTA per card.** In the client view, the primary is often "Subscribe" or "Send to my AI". In admin, it's "Run research" or "Regenerate".
