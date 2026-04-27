---
session: 2026-04-27-auto-sidebar-nav
stage: 6c
role: voice
input: built artifacts (js/kit.js, style.css, index.html, demos/fundamental--accepted/index.html, demos/comment-persistence/index.html, demos/md-renderer-smoke/index.html), voice.md
output: 14 visible strings audited, 2 flagged
gate: feeds stage 7
---

# Voice — auto sidebar nav

Cold read. Audit reads every visible UI string in the shipped artifacts against `voice.md` only. Code comments and HTML comments are out of scope (read-only to developers, not UI surface).

## Block — kit.js generator

The auto-nav generator emits structural HTML — `<section>`, `<a>`, `<ul>`, `<li>`. Class strings are identifiers, not prose. Heading labels are read from the consumer's rendered `.book` DOM via `headingLabel(h)`; the function returns the heading's own text and emits no fallback string, no default, no error message, no placeholder. Zero prose introduced.

### AI tells
Pass.
### Button labels
Pass — none emitted.
### Empty states
Pass — none emitted.
### Error messages
Pass — none emitted.
### Sentence case
Pass — none emitted.
### Em-dash + italics
Pass — none emitted.
### Muted + light weight
Pass — generator does not set color or weight.

## Block — index.html sidebar surface

Strings shipped:

- `aria-label="Navigation"` (line 19)
- `aria-label="Open a book"` (lines 48, 154)
- `aria-label="Open the sidebar"` (line 147)
- Sidebar header text: `Agentic Design System` (line 20, with `<br>` between "Agentic" and "Design System")
- Sidebar footer text: `2026, fuckgrechka.ru` (line 27)
- Sidebar footer text: `Powered by kk.consulting` (line 28)

### AI tells
Flag — `Powered by kk.consulting`. Passive construction. `voice.md § Shape` voice rule pulls Orwell's "never use the passive where you can use the active". Either drop "Powered by" and let `kk.consulting` stand alone, or replace with an active verb (`Built by`, `Shipped by`, or `kk.consulting` only). Pre-existing string; not introduced this session.

### Button labels
Pass on aria-labels read as labels — `Open a book`, `Open the sidebar` are imperative. `Navigation` is a noun used as a region label (aria-label on `<aside>`), which is the standard a11y pattern, not a button-label rule violation.

### Empty states
Pass — none.

### Error messages
Pass — none.

### Sentence case
Flag — `Agentic Design System` (line 20). Three words, all initial caps. `voice.md § Shape`: "Sentence case in every heading. No Title Case." Strict reading: violation. Defensible-as-brand reading: `Agentic Design System` is the product's proper name, comparable to `Comment persistence` which uses sentence case, suggesting the kit's own product naming should follow sentence case too. The other three demo headers (`Fundamental`, `Comment persistence`, `Renderer`) all use sentence case. The manifesto's own header is the outlier.

### Em-dash + italics
Pass.

### Muted + light weight
Pass. Footer carries `t-caption` and `.sidebar__footer` styles muted color via CSS, which matches the metadata-only rule. No `t-muted` on body text.

## Block — demos/fundamental--accepted/index.html sidebar surface

Strings shipped:

- `aria-label="Navigation"` (line 17)
- Sidebar header text: `Fundamental` (line 18)
- Sidebar footer text: `2026, kk.consulting` (line 25)
- Sidebar footer text: `Fundamental demo` (line 26)

### AI tells
Pass.
### Button labels
Pass.
### Empty states
Pass.
### Error messages
Pass.
### Sentence case
Pass — both `Fundamental` and `Fundamental demo` are sentence case.
### Em-dash + italics
Pass.
### Muted + light weight
Pass.

All seven vectors pass.

## Block — demos/comment-persistence/index.html sidebar surface

Strings shipped:

- `aria-label="Navigation"` (line 53)
- Sidebar header text: `Comment persistence` (line 54, with `<br>` between "Comment" and "persistence")
- Sidebar footer text: `kit 1.6.0, demo` (line 61)

### AI tells
Pass.
### Button labels
Pass.
### Empty states
Pass.
### Error messages
Pass.
### Sentence case
Pass.
### Em-dash + italics
Pass.
### Muted + light weight
Pass.

Note (out of voice scope but flagged for the maintainer): the version literal `kit 1.6.0` is stale. The kit ships at 1.9.0 today and bumps to 1.10.0 with this session's deliverable. Voice canon does not gate version freshness; calling it out so the maintainer pass picks it up.

## Block — demos/md-renderer-smoke/index.html sidebar surface

Strings shipped:

- `aria-label="Navigation"` (line 14)
- Sidebar header text: `Renderer` (line 15)
- Sidebar footer text: `md.js renderer` (line 22)

### AI tells
Pass.
### Button labels
Pass.
### Empty states
Pass.
### Error messages
Pass.
### Sentence case
Pass — `Renderer` is single-word; `md.js renderer` is sentence case (lowercase `md.js` is a file name, sentence-initial position).
### Em-dash + italics
Pass.
### Muted + light weight
Pass.

All seven vectors pass.

## Summary

Most flags: `index.html` sidebar surface — two flags (`Powered by kk.consulting` passive construction, `Agentic Design System` Title Case heading). Both pre-existing strings; neither introduced by this session.

Zero flags: kit.js generator, `fundamental--accepted` sidebar, `md-renderer-smoke` sidebar.

The session's actual surface — the auto-nav generator — emits no prose and introduces zero voice defects. The two flagged strings live in the manifesto page's pre-existing sidebar header and footer. Stage 7 meta-reviewer decides whether pre-existing voice debt counts against a structural-only session.
