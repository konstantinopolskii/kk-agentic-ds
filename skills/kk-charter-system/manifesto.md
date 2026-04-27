# Charter manifesto

What a charter is for. What it is not. The bar.

## What a charter is

A charter is the document a stranger reads to know what a direction is *for* in three months. It frames every downstream decision: which calls route here, which initiatives belong, who owns what, what status really means.

A good charter survives a re-read in three months without context. A bad charter needs you to remember the conversation in which it was written.

## Six things every charter must have

1. **Mission.** One paragraph. What this direction exists to do, framed at the level of the practice — not at the level of any single client, project, or deliverable. The strategic logic, not the tactical state.
2. **Sub-tracks** (when applicable). Named threads that make up the direction. Each gets a one-sentence description and an evidence pointer.
3. **Initiatives + status.** Three to seven persistent threads. Status is one of: `active` / `paused` / `blocked` / `done`. Each cites call IDs or KK comments as evidence.
4. **Time-bound deliverables.** Hard dates. Anything without a date stays in initiatives.
5. **References.** Repos. Calls. Key people. External tools where relevant. Cross-references to other directions.
6. **Open questions for KK.** Sharp. Decision-forcing. Three to seven max. Skip soft "is this right?" — write questions whose answer changes the work.

## What a charter is not

- A roadmap. (Roadmaps live as Project items with deadlines.)
- A meeting log. (Decisions log lives elsewhere.)
- A pitch. (No "we believe X is the future of Y" — that's noise.)
- A deck. (Deck content is for buyers; charters are for the operator.)
- An out-of-scope wishlist. (Decisions about what's out are tracked in a separate decisions log; the charter itself is signal-only.)

## Anti-patterns to fail on sight

- **Filler opener.** "X is a Y that does Z" — drop, just say what it does.
- **Date-anchored mission.** A mission that names "Q2 2026" inside it cannot survive a re-read.
- **Bullet padding.** Listing five sub-bullets to make a section feel substantial. Three real bullets > five hedge-bullets.
- **Bold for emphasis.** Bold marks a term — the first time a key noun appears, or the label of a paragraph. It does not mark "this is important."
- **Italic editorialising.** "*Note that…*" or "*Sourced from…*" gloss is meta-prose, not signal. Drop it.
- **AI tells.** "Comprehensive," "leverage" (verb), "unlock," "navigate the complexities," "delve into," "elevate," "harness," "transformative," "robust," "seamless," "empower." If you wrote one, you stopped thinking.
- **Soft hedge.** "It's worth noting that…" "Importantly…" "It is the case that…" — strip.
- **"Coaching."** KK supervises. Always *supervision*, never *coaching*, never *advisory* (unless KK explicitly calls something advisory, which he tends not to).
- **Disclosing clients.** Named *supervision clients* in published charters expose them. Supervision-client names live in `wealthy`; charters say "active supervision-client list lives in `wealthy`." **Exception: partner-relationship operators.** Cross-direction operators, partners, and contributors KK has named in comments (e.g., a lead-gen partner across two directions, a kit contributor) may appear in charter prose. The rule protects supervision clients specifically — not every named individual. Test: is this person paying KK for supervision? If yes, name lives in `wealthy`. If they're a co-operator on direction work, the charter may name them.

## The "still meaningful in three months" test

Every mission, sub-track summary, and initiative passes this test:

> Strip every date, every name, every active-state language. Read what's left. Does the meaning still hold? If yes, ship. If no, rewrite.

If the answer to "what is this direction for?" depends on a deadline, you wrote a deadline summary, not a mission.

## Initiative vs task

An **initiative** is a *thread* that runs across weeks or months and has multiple sub-actions inside it. An *outcome*, not a single deliverable.

A **task** is a single deliverable. Tasks live as Project items inside an initiative.

If you can finish it in one work session, it's a task. Move it to a Project item.

If it requires multiple parties / weeks / decisions to converge, it's an initiative. Keep it in the charter.

## Three-to-seven rule

Every direction has 3–7 initiatives. Below 3, the direction isn't doing anything. Above 7, focus is leaking — some bullets are tactics masquerading as initiatives.

## Evidence-pointer rule

Every claim that asserts state ("active client," "$5k/month retainer," "festival in 2027") cites either:
- A call ID (e.g., `call 4670`)
- A KK comment ID (`pass-2 #14`)
- A repo (`github.com/konstantinopolskii/kk-agentic-ds`)
- An external URL or doc

If a claim cannot be cited, it must be flagged with `[KK-asserted]` so a future reader knows the source is the operator's word, not a transcript.

## When a charter contradicts the calls digest

The audit chain (`kk-comments-2026-04-26-pass{1,2,3}.json`) wins over the calls digest. KK has the last word. The digest is *evidence*, the audit chain is *verdict*.

When a charter contradicts a previous version, the newest comment pass wins. Older verdicts get superseded silently — no need to log.

## When a direction needs to be paused or archived

- **Paused.** Status field flips to `paused`. The direction stays in `CHARTERS_DRAFT.md` with a current-state note explaining why. Restart conditions named.
- **Archived.** The charter moves out of `CHARTERS_DRAFT.md` into a separate `archive/` folder with a date stamp. Charter content stays intact for re-activation. The master Project board hides archived directions.

Archive only on KK's explicit call. Never on agent judgement.
