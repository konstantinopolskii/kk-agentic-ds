# Manifest diff — 06-revolutionary

Sidecar to `06-revolutionary.md`. One entry.

---

### Rule broken: every comment originates from a text selection and carries an anchor

- **Canon source:**
  - `manifesto.md` §Runtime → Comment lifecycle events. The `kk:comment` payload for `action: 'new'` declares `anchorQuote`, `anchorPrefix`, `anchorSuffix` as required fields plus `sectionSlug` and `cluster` as context. Shape implies every comment has an anchor.
  - `strategy-doc.md` §Commenting pattern. Quote: "When a reader selects text in the body, a draft shout card pins at the top of the inspector with the `field__fake-caret` ready. On commit, it becomes a thread card. Highlights in the body use `.highlight` spans."
  - `components.md` §Comment. Refers consumers to `docs/integration/comment.md` for integration. The selection-originated flow is the only flow documented.

- **Rule as written (composite quote across canon):**
  > "When a reader selects text in the body, a draft shout card pins at the top of the inspector with the `field__fake-caret` ready. On commit, it becomes a thread card. Highlights in the body use `.highlight` spans." (`strategy-doc.md` §Commenting pattern)
  >
  > Payload for `action === 'new'`: `{ action, threadId, messageId, anchorQuote, anchorPrefix, anchorSuffix, cluster, sectionSlug, text }` — anchor fields not declared optional. (`manifesto.md` §Runtime)

- **Proposed change:**

  **In `strategy-doc.md` §Commenting pattern**, add a second paragraph after the existing commenting-pattern paragraph:

  > Cross-cutting steering notes — comments not tied to one span — originate from the `+ Add steering note` button in the threads inspector group header. Click spawns a draft `comment-new` at top of `.comment-stack` without a selection. Thread roots carry `data-anchor="unanchored"`. Steering notes render the "Re: 'quoted text'" heading as "Steering note" and skip the doc-body highlight. They flow into every regeneration regardless of scope.

  **In `manifesto.md` §Runtime → Comment lifecycle events**, mark anchor fields optional in the `action === 'new'` payload shape and add a note:

  > ```js
  > {
  >   action:       'new',
  >   threadId:     'c1735012345-123',
  >   messageId:    'm1735012346-456',
  >   anchorQuote:  'selected text' | null,  // null if unanchored
  >   anchorPrefix: '…up to 20 chars before' | null,
  >   anchorSuffix: '20 chars after…' | null,
  >   cluster:      'strategy' | null,
  >   sectionSlug:  'targeting' | null,
  >   text:         'comment body'
  > }
  > ```
  >
  > Anchor fields are nullable for unanchored steering notes created via `comment-stack__add` (consumer-triggered via the `+ Add steering note` button). Consumers reading the payload null-check anchor fields before rendering a quote block.

  **In `components.md` §Comment**, extend the component description:

  > Two shapes, one pattern. Draft (shout) and thread (interactive card with collapsible reveal). Lives in the inspector. Threads are anchored by default (originated from a text selection) or unanchored (originated from the `+ Add steering note` button, `data-anchor="unanchored"`). Both shapes render identically; unanchored threads replace the "Re: 'quote'" heading with a "Steering note" label. See `index.html` → `#comment` for the complete markup.

  **In `components.md` §What's forbidden**, whitelist the new class in the class-prefix allowlist: add `comment-stack__add` to the permitted sub-classes of `comment-stack`.

  **New kit i18n key** in `manifesto.md` §Runtime i18n block:

  > - `addSteeringNote` — default "What should every run know?" — placeholder for the unanchored draft input.

- **Reason:**

  Gate amendment 4 at stage 3: "Comments as context stream — global steering. Open comments feed every regeneration." The job of the operator is to steer the strategy. Comments are the steering primitive.

  Today's kit anchors every comment to a specific text span. That model fits marginalia — "this thread is about this paragraph." It under-serves cross-cutting steering — "keep the verb tight across every section." An operator with a cross-cutting note has two bad choices: (1) anchor the note to an arbitrary paragraph, misleading every reader who sees the highlight and thinks the thread is local; (2) skip the note entirely, losing the steering signal. Both choices corrupt the context stream that feeds regen.

  The unanchored steering note resolves the mismatch with one primitive. Operator drops a note in the threads stack. Every regen reads it. Every scope (`[Improve in place]`, `[Redo section]`, `[Redo whole doc]`) sees it. No fake anchor. No lost signal. One affordance in the threads group header.

- **Blast radius:**

  - **`kk:comment` payload** — consumers that currently assume `anchorQuote` is always a string need a null-check. Documented in `docs/integration/comment.md` under a new "unanchored" section.
  - **`kit.js`** — `enableCommentSelectionFlow()` stays unchanged. A new public method `KK.addSteeringNote()` (or a delegated click handler on `.comment-stack__add`) handles the unanchored insertion. Stack insertion uses the same DOM shape, so the `.comment-stack` MutationObserver or event listener in consumer code continues to work.
  - **`docs/integration/comment.md`** — gains a new section "Unanchored steering notes" showing the null-anchor payload shape, Flask/Next.js/Rails snippets for persistence, and the anti-pattern (don't persist anchor fields as empty strings; null means no anchor).
  - **Kit v0.13.0 scope** — v0.13.0 currently scoped to Approve + Archive. Either widen v0.13.0 to include the unanchored affordance, or land it as v0.13.1 after Approve + Archive ship. Recommend v0.13.1 — the Approve + Archive lifecycle stabilises first, then the unanchored primitive layers on top.
  - **`strategy-doc.md` §Commenting pattern** — pattern doc gains the second paragraph. Consumers of this pattern (Wealthy operator, future strategy flows) pick up the new primitive.
  - **`components.md` §Comment** — description extended; class-prefix allowlist adds `comment-stack__add`.
  - **`manifesto.md` §Runtime i18n** — one new default string.
  - **No token changes.** No new colors, spacings, radii, or font sizes.
  - **No layout changes.** Three columns intact.
  - **No accessibility floor lowered.** Steering-note spawn uses the same `field__fake-caret` + focus management as the selection-flow path. Keyboard commit (Ctrl+Enter) unchanged.

- **Rollback:**

  1. Remove the `+ Add steering note` button from the threads `inspector__group` header.
  2. Revert `manifesto.md` §Runtime payload shape to non-nullable anchor fields.
  3. Revert `strategy-doc.md` §Commenting pattern to the selection-only description.
  4. Remove `comment-stack__add` from the class-prefix allowlist in `components.md` §What's forbidden.
  5. Remove the `addSteeringNote` i18n key.
  6. Revert `docs/integration/comment.md` to single-flow documentation.
  7. Any persisted steering notes in consumer databases stay — they are valid `comment` rows with null anchor fields, and consumers can migrate them to a separate table later or ignore them in rendering. No data loss.

  Total rollback touches six files; kit bump rolls back with a clean revert commit on the maintainer branch.
