---
session: 2026-04-22-wealthy-operator-alpha
stage: 9
role: ux-copywriter
input: prototype-operator-alpha/{index.html, data.js, app.js} + 08-frontend-engineer.md §Placeholder inventory
output: copy-complete prototype with 75/75 placeholders filled across three files, Russian operator voice matching prototype-alpha, English kit-internal labels untouched
gate: pending — stage-10 reviewers (kk-ds-frontend, kk-role-ux-copy-reviewer, kk-ds-supervisor)
kit: v0.13.0 consumed
---

# UX copywriter — Wealthy operator alpha

Stage 9 fills every placeholder the frontend engineer left. Register locked to Russian for operator-facing strings per prototype-alpha anchor; English stays on kit-dispatch kebab labels (known gap flagged for v0.14.0) and on code-level identifiers. Seventy-five slots filled, zero pushed back.

## Raw input

> Stage 9 copywriter. Fill every `<!-- -->` placeholder in `prototype-operator-alpha/{index.html, data.js, app.js}` honoring the brief each carries (function + tone + length). Russian strategy body text from prototype-alpha is voice anchor — do not rewrite. Button labels imperative, sentence case, under 24 chars. Error and empty states honest, short, no moralizing, no rule-of-three. Thread content in `data.js` in Russian consistent with prototype-alpha's register. Consistency audit before finish.

Stage-8 hand-off — `08-frontend-engineer.md`. Inventory: `index.html` 52 placeholders, `data.js` 21 placeholders, `app.js` 2 placeholders. Total 75.

## Voice decisions logged

**Register split.** Operator-facing UI renders in Russian because prototype-alpha's strategy body is the approved voice anchor and the whole document must read as one voice. Kit-internal English persists in exactly two spots — the four kebab menu items (`Approve` / `Reply` / `Archive thread` / `Delete`) that kit v0.13.0 dispatches on English textContent, and the `data-action` / `data-scope` attribute values which are code identifiers, not user-visible. Both are flagged in `08-frontend-engineer.md` as candidates for v0.14.0 i18n keys.

**Primary verb discipline.** The regen control block repeats three times — brief, research, strategy. Each block has one primary and two secondaries. Primary verb varies by scope because the default action varies by scope: brief and strategy default to `Улучшить на месте` (improve in place); research defaults to `Учесть комментарии` (implement comments). Secondaries differ per block so no two labels collide inside one card.

**Empty-state shape.** `Состояние + действие.` Applied twice — the `Заметки` section empty state (`Пусто. Выделите абзац в документе и оставьте комментарий, чтобы агент дописал сюда строку.`) and the `Вопросы агента` inspector card (`Агент задаст уточнения здесь. Пока тишина.`). Shape: one factual sentence naming the state, one action or expectation.

**Error-state shape.** Not triggered — this is a review-state fixture, no validation errors render. The shape `что пошло не так + что делать` is reserved for the next build pass when real forms enter.

**Section-heading cadence.** Short noun + metadata subtitle in `t-muted`, matching prototype-alpha's pattern (`Точка А / Где стоит сейчас`, `Рынок / Ресерч против гипотез`). Four main doc sections follow this shape — `Бриф / Что кладём в пайплайн`, `Ресерч 1 / Ресерч против гипотез`, `Стратегия / Девять блоков, собранных агентом`, `Заметки / Что стоит добавить от себя`.

**Metadata discipline.** Muted text reserved for metadata only (bylines, captions under counts, hairlines). Body text and structural markers (field labels, spec keys, stage names) render black at medium 500. Stage rows in the inspector (`Бриф`, `Промпт ресерча`, etc.) are structural — not muted. Only the `Доставлено` row, which is future-disabled, wears `t-subtle` because the frontend engineer wired that status class.

**No AI tells.** One pass stripped candidates: the original draft of the signoff subtitle (`Шаги — подсказка, не гейт.`) used the `не X, Y` contrastive shape and was rewritten to `Подписать можно в любой момент.`. The t7 agent proposal's closing (`Риск блокировки становится счётчиком, не гипотезой.`) hit the same shape and was rewritten to `Риск блокировки становится числом.`. No rule-of-three lists. No filler adjectives. No −ing filler verbs. No moralizing closers. Em-dashes appear only in body prose for Russian clause-joining (canonical in the language, matches prototype-alpha) — zero in headings.

## Copy inventory by surface

### Buttons

| Surface | Slot | Final string | Length |
|---|---|---|---|
| Brief control | primary | Улучшить на месте | 17 |
| Brief control | secondary | Пересобрать бриф | 16 |
| Brief control | secondary | Пересобрать весь док | 20 |
| Research control | primary | Учесть комментарии | 18 |
| Research control | secondary | Пересобрать ресерч | 18 |
| Research control | secondary | Добавить ресерч | 15 |
| Strategy control | primary | Улучшить на месте | 17 |
| Strategy control | secondary | Переписать | 10 |
| Strategy control | secondary | Пересобрать весь док | 20 |
| Signoff shout | primary | Подписать | 9 |

`Улучшить на месте` repeats across brief and strategy because the default regen scope is the same mental action; the secondaries differentiate. This matches the voice rule on not repeating labels inside one card — across cards is fine when the action is identical.

### Section headings

| Section | Title | Subtitle |
|---|---|---|
| Brief | Бриф | Что кладём в пайплайн |
| Research 1 | Ресерч 1 | Ресерч против гипотез |
| Strategy | Стратегия | Девять блоков, собранных агентом |
| Additional notes | Заметки | Что стоит добавить от себя |

Signoff shout heading: `Подпись` (14 char limit respected). The `## Strategy` subsections keep prototype-alpha's Russian subheadings verbatim (voice anchor: `Что обсудили`, `Точка А`, `Точка Б`, `Видение и бизнес-модель`, `Позиционирование`, `Гипотезы и каналы`, `Рынок`, `Ближайшие шаги`, `Как мы работаем`).

### Sidebar

`aria-label`: `Навигация`. Header: `Нелли<br />Кам`. Nav-group headings: `Работа`, `Подпись`. TOC rows: `Бриф`, `Ресерч 1`, `Стратегия`, `Заметки`, `Подпись`. Footer: `2026, kk.consulting<br />Ранап #142, 22 апреля` (lifted from prototype-alpha footer pattern — run counter is fixture-fresh).

### Inspector

`aria-label`: `Стадии и треды`. Stages card: `Стадии` with rows `Бриф`, `Промпт ресерча`, `Ресерч`, `Стратегия`, `Заметки`, `Подпись`, `Доставлено`. Future-reserved card: `Вопросы агента` + `Агент задаст уточнения здесь. Пока тишина.`. Threads card: `Треды` + context-count line (rendered live from `app.js`).

### Brief card fields

Four field labels (bold caption): `Транскрипция`, `CV`, `Заметки`, `Глубина`. Switch label: `Deep Research`. Depth caption (metadata muted): `20 USD`. Values stay fixture data as engineer shipped.

### Signoff stats

Three rows, bold numeral + factual label: `цикла ревью закрыто.`, `находок в ресерче.`, `открытых тредов.`. Numerals (2, 11, 7) are fixture data.

### Signoff steps

Four imperative lines under 36 chars: `Сверить ресерч с гипотезами.`, `Пересобрать стратегию с правками.`, `Закрыть открытые треды.`, `Прочитать документ целиком.`. Guidance not gates — per concept. Period-terminated.

### Context-stream count line (`app.js`)

Russian plural-aware template rendered by `updateContextCount()`. Shape: `<N> <тред|треда|тредов> в контексте агента`. Plural rule — 1 тред, 2-4 треда, 5+ тредов. Current fixture open = 7 → `7 тредов в контексте агента` (27 chars). Brief control block also carries a static caption `7 открытых тредов в доке` matching the same metadata register.

### Kebab aria-label (`app.js`)

`Действия треда` (14 chars). Short verb-first noun phrase, matches the kebab's role (open menu of actions on this thread).

### Thread content (`data.js`)

Seven threads. Operator bylines stay `Konstantin Konstantinopolskii` (engineer-seeded, voice-anchor name). Agent byline picked once: **`Wealthy`** — 7 chars, matches session product slug, within the 16-char limit, reads as a named agent without needing a prefix.

| id | Anchor | Seed | Agent proposal |
|---|---|---|---|
| t1 | `Ничего не заканчивается` | Прямая цитата со звонка. В «Точке А» звучит как диагноз, а не как блок к снятию. | Блок — микроменеджмент и работа в стол. Дословно: «Ничего не заканчивается до успешного успеха». Снимается делегированием UI двум спецам и фиксированным релиз-коридором. |
| t2 | `Прекратить транслировать неуверенность` | Какую именно фразу вычёркиваем? «Не шарю в UI» или всю цепочку самоописания? | Убрать из CV и первого письма строку «не шарю в UI». На её месте — «AI-интерфейсы и Conversational UX, основная ниша, семь лет, Alan AI в портфолио». Остальное самоописание переходит в финальный абзац. |
| t3 | `Делегирование двум проверенным спецам` | Два спеца сразу — много. Начать с одного на два месяца, иначе сплит внимания уйдёт в менеджмент. | Делегирование начинается с одного проверенного UI-спеца на два месяца, один проект, десять часов в неделю. Нелли держит архитектуру и ревью. Второй спец подключается после закрытия первого контракта. |
| t4 | `Фаундеры читают прямые сообщения в LinkedIn` | Гипотеза годится, но без правила для первой строки письма она не работает. | Фаундеры читают прямые сообщения в LinkedIn, если первая строка цитирует их последний релиз или питч. Правило — одна фраза по их продукту, одна по Founding Designer, остальное в следующем письме. |
| t5 | `Ассистентка и 25 инвайтов` | Перед полной воронкой стоит один короткий тестовый контракт, 1-2k USD, чтобы проверить сам оффер. | Шаг первый — один короткий тестовый контракт 1-2 000 USD на две недели, через прямой контакт из нетворка. Шаг второй — ассистентка и 25 инвайтов в день целевым ролям, 30 разговоров в месяц к концу июня. |
| t6 | `LinkedIn Jobs, апрель 2026` | Одного источника мало. Нужен кросс-чек по тому же временному окну. | Источник — LinkedIn Jobs, апрель 2026. Кросс-чек — Wellfound (бывший AngelList), та же выборка AI-стартапов Seed и Series A. Расхождение в пределах 8% по объёму вакансий. |
| t7 | `Taplio, Dripify работают` | Риск блокировки — слово, не число. Дайте срок жизни аккаунта под двумя режимами автоматизации. | Taplio и Dripify работают. Щадящий режим 25 инвайтов в день — срок жизни аккаунта 14-20 недель. Агрессивный 50+ действий в день — 4-6 недель. Риск блокировки становится числом. |

## Placeholder push-back on frontend-engineer briefs

None within scope. Every brief fit a string that honored its length, function, and tone. Two soft observations recorded for retro, neither requested a brief change:

1. **Agent byline length.** The 16-char limit on agent byline is generous for a single-word name (`Wealthy` = 7) but would pinch a signed compound like `Wealthy Agent v2`. Current fixture ships a single word so no conflict. If future iterations want a richer agent identity (name + role + build number), the byline slot wants 24 chars — worth raising at stage 8 next build, not now.

2. **Strategy subtitle.** The 60-char brief was comfortable for `Девять блоков, собранных агентом` (31 chars). If future sessions want to name the specific agent model or the research depth, the subtitle could pressure 60. Not a today-problem.

No placeholder required brief renegotiation. No HTML, CSS, or JS structure touched.

## Consistency audit before finish

- **Button register.** All ten buttons imperative, sentence case, under 24 chars. Primary and secondary never repeat inside a card. `Пересобрать весь док` appears on both brief and strategy control blocks — same action, same verb, intentional.
- **Section-heading shape.** Every `h2.t-display` follows `noun<br />t-muted subtitle`. Four doc sections and one shout consistent.
- **Empty-state shape.** Two instances, both follow `состояние. действие.` pattern.
- **Metadata in muted.** Footer, sidebar stage labels in subtle only on `Доставлено`, depth price caption, future-reserved note, signoff pending byline, threads context-count line. Body text stays black medium 500.
- **No placeholder left behind.** Grep on `<!-- ` templated placeholders returned only the engineer's intent-comments (which are retained on purpose for retro). No empty span, dt, h3, p, div, or title element remains. No `<!-- ... -->` inside a string attribute or body.
- **No AI tells.** Stripped two `не X, Y` shapes on second pass. No rule-of-three, no moralizing closers, no filler adjectives, no buzzy nouns. Em-dashes confined to body prose in Russian clause-joining register, zero in headings.
- **Russian-English boundary.** English persists only in kit-dispatch kebab literals (`Approve` / `Reply` / `Archive thread` / `Delete`), already flagged in `08-frontend-engineer.md` as a v0.14.0 target, and in code-level attribute values (`data-action`, `data-scope`) which never render to the operator.

## Gate

Pending — hand to stage 10. Three reviewers run in parallel:
- `kk-ds-frontend` on the copy-complete HTML/JS for semantics, a11y, JS collapse.
- `kk-role-ux-copy-reviewer` on voice, button discipline, error/empty-state shapes, placeholder quality, AI-tells.
- `kk-ds-supervisor` on cross-file consistency and inventory drift.

If any reviewer fails the work, the failing vector returns to its owning stage. Voice or copy regressions return here. Semantic or inventory regressions return to stage 8.

## Hand-off

→ Stage 10, three parallel reviewers. Input for each: `prototype-operator-alpha/index.html`, `prototype-operator-alpha/data.js`, `prototype-operator-alpha/app.js`, plus this file for voice-decision context.
