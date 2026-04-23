# Raw HTML passthrough

Markdown cannot express the kit's card, field, or stat patterns. Authors drop raw HTML inline. The renderer passes it through unchanged.

## Card embedded in markdown

<p class="t-caption t-muted">Example</p>

<div class="card">
  <div class="card__heading">
    <h3 class="t-title">Card from markdown</h3>
    <p class="t-caption t-muted">Authored as raw HTML inside a .md file.</p>
  </div>
  <p class="t-body">Body paragraph inside the card. The kit's card CSS still applies. No renderer magic needed beyond passthrough.</p>
</div>

## Prose between raw HTML

A paragraph between two raw HTML blocks. The block pass resumes after the card closes.

<p class="t-caption t-muted">Example</p>

<div class="card card--shout">
  <div class="card__heading">
    <h3 class="t-title">Shout card</h3>
    <p class="t-caption t-muted">Raw HTML, one per column.</p>
  </div>
  <p class="t-body">Everything inside inverts against the kit's shout surface.</p>
</div>

## Security note

Markdown source is author-controlled. The `.md` files live in the repo alongside the renderer. Passthrough is safe by construction. A future use case that renders user-submitted markdown requires a sanitiser at the render boundary.
