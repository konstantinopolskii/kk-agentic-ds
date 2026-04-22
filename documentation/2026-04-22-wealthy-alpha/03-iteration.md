---
session: 2026-04-22-wealthy-alpha
stage: 2
role: ux
input: 02-hypothesis.md
output: single locked structure (manifesto required 3-5)
gate: user approval of the single option
---

# Stage 2 — Option iteration

Structural choices for the document body, operator workflow, client inspector.

> **Failure mode noted in retro.** Manifesto calls for 3-5 flow alternatives at this stage. This session produced one option per decision. No ASCII mocks, no side-by-side. Decisions were driven by ad-hoc user answers in free-form messages, not a structured comparison. See `10-retro.md` for the proposed fix.

## Raw user inputs that drove this stage

### Message 1 — process and comment workflow

Verbatim, long message:

> CV is in hand, needs to be uploaded alongside with additional notes in Telegram. In future those additional notes would be passed automatically alongside with the CV, since we can create a web flow for it. Steps are right. Maybe I would explicitelly tell that each step is triggered by manual approve. Also I want agent to paste his answers right to the places where I left the comments. So he just add the comments with his direct ideas or questions for specific places. I answer. If I click approved, the content from the agent's comment should automatically change the content in strategy. So the agent just sends the end content without anything else around. Or if I answer the question, pipeline again reads all comments to the specific part of the doc and tries to send me the new version. If the comment was approved, it's excluded from the next run. Every comment and rejection goes to pipeline - yes. Sop we can summarize and improve after. But summarization of the comment issues should be a separate process, not automatic. Let it be just a database with known issues sorted by the documents and mentees where they appear. Issues threads, not simple one issue. If we rerun research with expanded scope, agent should move back and propsoe the new research prompt and run again after. Also we should be able to request additional researches, then it will be just added as another document. If we will need to redo one of the researches, agent would be able to find the prompt for it inside of the document. Prompt for the research always live in the document with research. 4. about typo is a good catch. Agree. We don't need 4 quarter plan it's a bit too much, and agent wouldn't be able to do so. We need to specifically outline what was told on the call, the goals and strategy, the direction we discussed the possible plan, if it was on the call too, the market data. In the future - similar mentees who already had to go through such experience. After the strategy I propose to ask for the review section, since it makes sense to ask it there. And after they share the review, we simply propose them to sign the transcription. On the right side I see something that helps them to understand how to work with the document itself, the commentaries they shared, the quick links they can use for transcriptions and their access status. Free with transcriptions. And if they want to get more, they can click and we will scroll to the next phase. To unlock more they should share the review. For transcript downloaded we want txt or md. In the review I would also add an indicator on amount of comments they shared on the doc. And tell that we will pass those comments to the mentor and he will review them in 24 hours. For premium I would say Expert / Pro / Community / Free. For the operator I want to be able to see all possible stages, not only one the most reach. Just give me the hidden tools to switch between. For the documents. /Users/kostyantinopolskii/Downloads/Стратегия\ \(1\).md /Users/kostyantinopolskii/Downloads/strategy_Anastasia_Aranovskaya_2.md /Users/kostyantinopolskii/Downloads/strategy_Nelly_Kam_1.md  None of them is ideal. As I sad, the goal is to find the structure for the document itself as well. Use it more as the reference data. Example of the call is here /Users/kostyantinopolskii/Downloads/KK-Nelly-Kam-2d99cc63-2c68.json

### Message 2 — doc header and section revisions

Verbatim, long message:

> In the header of the doc we also need the amount of reviews that were made by KK, the amount of researches we've done, the type of the researches, short summary of the whole document, the signature, the Strategy + name also. In the left top corner in the nav we actually will write just a name. Poin A should be table. Point B should be table. Not a business model. But Vision + business model. Market should be Market findings. And they should go after the hypothesis. Since we actually validate them and we walidate vision and positioning. Next steps - yes. And we can ask agent to add a couple of new steps in the table with the same structure. It actually important -- agent should see more context than we highlight. Highlighted text is for connection and replacement. But agent actually should get the whole section from md. Like the whole div. The work conditions -- no neeeded in the doc. Instead I would better describe how the work with the mentor is done, how community helps, how did we help for the last year, how many data we have, what's the plans and the potential options. But without money for now. We will give them ability to see the price after they share the review. Nice. And after they share the review they get the ability to get the transcriptions and also they get the ability to switch to the higher plan to get access to all features. Nice! For the operator. Mentee selection should be 3D card, CV upload and notes should be part of the pipeline. Also we need a simple CV parcer, maybe through LLM, since it's more reliable (pictures pdf and so on, output is a simple text + stored uploaded file), also should be ability to doublecheck if the selected transcription is the right one, then start. While writing, we should see how on the left part of the document we get the new data injected: name, dates for strategy after the start we will see the new part of the document with the research and research prompt inside. It's important to build every interaction after around the comments of the actual document, since it gives us the ability to iterate through comments.

## Locked structure — document body

| # | Section | Notes |
|---|---|---|
| Header | Стратегия + имя, counters (ревью, ресерчей, типы), одна фраза резюме | |
| 1 | Что обсудили на звонке | 8 timestamped bullets |
| 2 | Точка А | **table** |
| 3 | Точка Б | **table** |
| 4 | Видение и бизнес-модель | Replaces "business model" per user |
| 5 | Позиционирование | Triple spec list (old vs new) |
| 6 | Гипотезы и каналы | Two lists |
| 7 | Рынок (Market findings) | **table**, moved after hypotheses (validates them). Prompt block attached. |
| 8 | Ближайшие шаги | **table**, agent can add rows via comment |
| 9 | Как мы работаем | Community, data, plans. No money (gated behind review). |
| 10 | *Отзыв* | Inline, client-only |
| 11 | *Подпись транскрипции* | Inline, client-only, locked pre-review |
| 12 | Подпись Konstantin | Operator signoff |

Sidebar top-left: just "Нелли Кам" (per Message 2).

## Locked structure — operator workflow card

Seven stages, dev switcher exposes all. Pills 1-7 in sidebar footer, Shift+1..7 keyboard.

1. Бриф — 3D mentee deck, CV upload, notes, transcript verify, start.
2. Промпт — inline edit, commit.
3. Ресерч — findings list, extend or accept.
4. Ревью — comment threads drive iteration.
5. Ответы агента — replacements arrive in threads, accept/reject.
6. Подпись — lock the body, output stats.
7. Доставлено — shareable URL, client comment replies.

## Locked structure — client inspector

- Shout card "Как работать с документом" — primary CTA rotates: Оставить отзыв → Подписать транскрипцию → Открыть тарифы.
- Static: Мои комментарии (live count).
- Static: Тарифы — Эксперт / Про / Сообщество / Бесплатный, prices gated behind review.

## Locked rules — comment workflow

- Agent puts only the replacement text in a thread, no preamble.
- Approve → replacement inlined, thread closes.
- Reject with why → pipeline re-reads all open comments in the section, proposes new version.
- Approved threads are excluded from the next run.
- All comments + rejections persist to a DB grouped by document × mentee × thread. No auto-summarization.
- Agent context = whole `.doc__section` div. Highlight is anchor + replacement target only.

## Locked rules — unlock chain (client)

Single gate: sharing the review.
- Before: strategy readable, transcript locked, tier prices dim.
- After: transcript download unlocked, prices visible, upgrade path active.

## Gate

Passed implicitly via free-form user answers. No structured approval.

## Hand-off

→ Stage 3, `04-build.md`.
