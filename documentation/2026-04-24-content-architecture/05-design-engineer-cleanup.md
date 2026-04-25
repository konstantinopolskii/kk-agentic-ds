---
session: 2026-04-24-content-architecture
stage: 5 (cleanup pass)
role: design-engineer (Sara Soueidan)
input: 06b-consistency-ds-rerun.md + 06c-voice-rerun.md
output: final cleanup. Popover shadow removed, phone hero utility-class-ized, protocols signoff added, em-dash density reduced, four hard AI tells fixed.
gate: pending. Stage 7 rerun.
---

Final cleanup pass on the five live 6b flags + the four hard 6c carryovers + the body-em-dash density reduction across canon prose. Path (b) chosen for em-dashes: rewrite to colon or period. No carve-out request to the maintainer.

## 6b fixes

**Flag 8. `.comment__menu-popover` drop shadow on white surface.** Dropped the `box-shadow` declaration. Replaced with a flat `border: 0.5px solid var(--color-border)` so the popover edge still reads against the white doc surface without leaning on a depth illusion. FAB exception unchanged. `style.css` lines around 1320.

**Flag 15. Inline 48 px hero on phone.** The rule was already inside the `@media (max-width: 768px)` block, but the comma-combined selector + line-height pair read as inline override. Split into two single-selector utility-class overrides (`.t-hero { font-size: 48px; line-height: 48px; }` and the same for `.book__part`) with a comment explaining the 48 px is the phone-only step between 38 and 66. `style.css` lines around 2247.

**Flag 29. `protocols.md` missing `book__signoff` block.** Replaced the plain-prose `Last edit: ... Maintainer: ...` line with the canonical `<div class="book__signoff">` shape matching `manifesto.md`, `canon/components.md`, `canon/patterns.md`. Stats: `5 protocol sections / 7 bundle files per ship`. Author: Konstantin Konstantinopolskii, kit maintainer at kk.consulting. Timestamp: 2026-04-25. Signature path: `../../../signature.svg`.

**Flag 30. `t-muted` on display subtitles in `demos/fundamental--accepted/index.html`.** Deferred per task scope. Pre-existing kit pattern across 28+ demo sites; not edited this round. Flag for stage 7 as a ship-with-exception case if the meta-reviewer raises it.

**Italic-prose contradiction in demo.** `demos/fundamental--accepted/index.html` line 190 said "A quote wears italic and a hairline rail." `.quote` no longer renders italic in CSS. Rewrote to "A quote sits black at body weight with a 4 px left rail. Citation sits below in micro." Demo prose now matches the rendered reality.

## 6c fixes

### Em-dash sweep, body density

Path (b) applied: rewrite every body em-dash to a colon, period, comma, parenthesis, or restructured sentence. Headlines fully purged.

| File | Before | After | Notes |
|------|--------|-------|-------|
| `manifesto.md` | 31 | 0 | All bullets and prose converted to period or comma. Agents roster (12 lines) and Navigation pointers (6 lines) rewritten without em-dash separator. |
| `canon/components.md` | 11 | 0 | All resolved. Including the `#### Rhythm — inner and outer theory` h4 fix. |
| `canon/patterns.md` | 3 | 0 | Including the `## Card stack — columns` h2 fix. |
| `canon/voice.md` | 2 | 0 | Including the `## No AI tells — strip every item below` h2 fix. |
| `pipeline/pipeline.md` | 74 | 2 (both inside fenced code blocks, exempt per scope) | Massive sweep. Stage headlines, role roster table cells, inline body prose, all converted. |
| `pipeline/protocols.md` | 16 | 0 | All bundle-rule and semver-axis bullets converted. Tag-message template literal also rewritten with colon (`UI kit X.Y.Z: <one-line>`) so shipped tags propagate clean voice. |
| `index.html` | 1 (inside a JS regex literal) | 1 (same, code-exempt) | Code, untouched. |

**Total in-scope canon body em-dashes: 138 → 0** (3 remaining hits all live inside fenced code blocks or JS regex literals, exempt by the scope rule).

### Four hard AI tells

| File:line | Defect | Fix |
|-----------|--------|-----|
| `components.md:74` | h4 em-dash | `#### Rhythm — inner and outer theory` → `#### Rhythm. Inner and outer theory`. |
| `components.md:246` | Moralizing closer | `For the moments that matter.` → `One per column. Inverts everything inside.` (factual restatement of the shout-card rule). |
| `pipeline.md:194` | Three-adjective filler stack | `extremely self-evident, clear, simple design ... — no thinking, no hover-to-learn, no tooltip archaeology.` → `self-evident design ... 0.2 seconds just by looking. No thinking, no hover-to-learn, no tooltip archaeology.` Cut to one strong adjective. Em-dash also gone. |
| `pipeline.md:327` | Not-just-but | `enforces shape, not just presence — if the answer is a deflection, mark unanswered and return.` → `enforces answer shape. A deflection marks unanswered and returns.` Direct facts, no urgency. |

All four hard AI tells landed.

## Skipped

- **Flag 30 (`t-muted` on demo display subtitles).** Out of scope per task instruction. Flag survives across `demos/fundamental--accepted/index.html` and `narrow.html`. Recommendation for stage 7: ship-with-exception if raised; the pattern is precedent across 28+ kit sites and the task explicitly defers the call.
- **`demos/**/*.html`** (other than the italic-prose claim). Out of scope per task.
- **`CHANGELOG.md` 1.2.0 entries.** Out of scope per task.
- **`docs/integration/comment.md`.** Out of scope per task.
- **`documentation/`** historical artifacts. Out of scope per task.
- **Pipeline.md em-dashes inside fenced code blocks** (lines 377, 398). Code template, exempt per "code/paths" carve-out.
- **index.html regex literal** at line 172 (`/[–—]/g`). Code, exempt.
- **Soft AI-tell carryovers** (rule-of-three soft flags, "such as" exhaustive lists, Not-A-But-B at protocols.md:44 / 69, soft `card--heading` registry-row gap). Not in the task fix list. Stage 7 can weigh against the rubric.

## Hand-off

Feeds **stage 7 rerun (meta-reviewer, Anna Wintour)**. The five live 6b flags reduce to one deferred (flag 30, `t-muted` on demo display subtitles). The 138 body em-dashes in canon prose drop to 0 in-scope. The four hard 6c AI tells all land. The italic-prose-vs-code contradiction in the demo also lands.

Open items for stage 7:

- One deferred flag (flag 30, demo `t-muted` subtitles) to weigh as ship-with-exception or rule carve-out.
- Soft AI-tell carryovers (rule-of-three, such-as lists, Not-A-But-B). Audit-rated as soft, not hard. Meta-reviewer can rule.

Build state: every in-scope cleanup landed. Stage 7 can rerun against this disk.
