# Voice

The document is the UI. Words are 90% of the design. Getting the voice wrong breaks the system more visibly than any missing pixel.

## Shape

Short sentences, periods, no hedges. If a paragraph doesn't end in a decision, cut it.

- **Voice:** "We" where a subject is needed. No subject when the sentence stands alone. **No "I".**
- **Shape:** Short. Factual. Periods.
- **Bold:** Headings only. Not body scanning.
- **Paragraph length:** Over three sentences, move to a list or spec card.
- **Em-dashes:** Forbidden in headlines. Rare in body.
- **Sentence case** in every heading. No Title Case. No ALL CAPS.

## Labels and interface text

- **Button labels:** imperative verbs. "Apply tokens", not "Proceed". Name the outcome.
- **Primary vs secondary:** labels never repeat. Secondary "Pick tokens"; primary "Apply tokens".
- **Placeholders:** real examples, not labels. `sofia@kk.consulting`, not "Email".
- **Errors:** what went wrong + what to do next. No "Something went wrong". No stack traces.
- **Empty states:** one sentence of purpose + one action that populates.
- **Tooltips:** metadata only. A feature that needs a tooltip is a UI bug.
- **Length:** cut every word that doesn't change meaning.

## Muted text

Forbidden by default. Allowed only for metadata — bylines, captions, hairlines — or when the user explicitly asks. Structural markers like list numerals, bullets, key cells sit in full black at medium weight.

## No AI tells — strip every item below

### Words and verbs to cut
- **Filler adjectives:** vibrant, pivotal, intricate, meticulous, robust, seamless, breathtaking, rich, comprehensive, holistic. If a noun needs an adjective, pick a specific one.
- **Buzzy nouns:** tapestry, testament, landscape, journey, ecosystem, realm. Metaphors that say nothing.
- **−ing filler verbs:** showcasing, fostering, highlighting, emphasizing, reflecting, contributing to, delving into. Drop the participle; name the action.
- **Copula avoidance:** serves as, represents, stands as, features, boasts. Use `is` and `has`.
- **Transitions that pad:** Additionally, Moreover, Furthermore, In conclusion. A period already does the work.

### Sentence shapes to cut
- **"Not just X, but Y":** artificial urgency. Say both facts directly.
- **"Not A, but B":** usually just say B.
- **Rule of three:** three-item adjective lists for fake completeness ("fast, reliable, and scalable"). Cut one, or all.
- **Elegant variation:** swapping synonyms to avoid repeating a word. Repeat the word if it's the right one.
- **Em-dashes for punch:** a period almost always does the same job.
- **Moralizing closers:** "Ultimately, this reminds us…", "In an ever-evolving world…". End on the last fact.

### Structures and signals to cut
- **Summary blocks:** "Key takeaways", "In summary", post-section recaps. The reader just read it.
- **"Challenges and future prospects":** generic closing pattern. Replace with a specific fact or cut.
- **Weasel attribution:** "Industry reports show", "experts argue", "observers note". Name the source or drop the claim.
- **"Such as" exhaustive lists:** naming five examples proves the category isn't clear. Give one, or name the category.
- **Title Case headings:** sentence case everywhere.
- **Mechanical boldface:** bolding every instance of a term turns prose into an instruction manual. Bold the heading, not the concept.

## Signature

Every document ships signed. Author name, role, organization, timestamp, handwritten SVG. See `components.md` → Signoff.
