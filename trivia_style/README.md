# Trivia writing and translation guidelines

Owner rulings this follows:
- 2026-10-15: articles must be fun and effortless to read, not only accurate.
- 2026-11-04: read like a native, with no contradictions and no unnatural phrasing.
- 2026-11-06: no sentence a reader cannot follow.
- 2026-11-09: no translationese, no AI-sounding prose, a pleasure to read in every language.

The rules come from the 2026-11 rereads (trivia_reviews/12–14), which found the same faults in every language. Use them for every new article and every translation, and give the language file to anyone, human or agent, who writes or translates one.

**Files:** this README holds the common rules. Each language has its own file: `en.md` `ja.md` `ko.md` `zh.md` `yue.md` `vi.md` `th.md` `id.md` `hi.md` `sw.md` `de.md` `fr.md` `it.md` `es.md` `pt.md` `ru.md` `uk.md` `ar.md` `he.md`.

## 1. Who the reader is

A curious adult who likes languages but is not a linguist. They read on a phone, for fun. Write like a good magazine piece: concrete, lively, exact. Not a textbook, and not a blog.

## 2. Common rules (all languages)

### Facts and form
- **Facts come first.** Every form, date, number and name must be in the source article (English) or in the sources it cites.
  - A translation adds nothing and drops nothing. If you cannot render a clause naturally, rewrite the sentence, not the fact.
- **One point per sentence.** Name the subject. Say who did what to whom, and why.
  - If a native could misread a sentence, the sentence is wrong even when the fact is right.
- **Keep cited forms as given.** This covers HTML tags, quoted foreign forms with their bracketed IPA, dates and numbers. The site's language names and term spellings win (see the language file).

### Write it, don't translate it
- Write the sentence the way a native writer would have written it in the first place.
- Restructure freely. Change word order, voice and sentence boundaries. Turn noun strings into verbs.
- Never copy English punctuation habits:
  - em dashes as asides
  - colons as drumrolls
  - Title Case headings
  - ASCII punctuation inside CJK text
  - straight quotes where the language has its own
- Do not address the reader with anything that is untrue for them. "The Latin letters you are reading now" is false for a reader of Hangul or Thai.

### No AI-sounding prose
Cut these patterns, and their equivalents listed in each language file:
- "It's not X — it's Y" / "not just X but Y" contrasts used for effect.
- Rhetorical questions answered in the next sentence ("Why 210? Because…").
- Openers such as "In fact,", "Interestingly,", "Notably,", "Crucially,", "The result:".
- Fragment drumrolls ("Two words. A whole sentence. That is the point.").
- Triplets used only for rhythm.
- A moral or punchline closing every paragraph.
- Clichés: rich tapestry, testament to, delve, race against time, Rosetta Stone, time capsule, "one X, two worlds", "One Y to rule them all".
- Stacked dashes and parentheses.
- A heading repeated word for word in the first line of its paragraph.

### Make it flow
- Put the interesting fact up front.
- Use concrete subjects and verbs that do work. Vary sentence length naturally.
- A rewrite should be the same length as the original, or shorter.

### One voice per language
- Use one register throughout a language, as its file says. Articles must not switch between registers (ja だ/である, ko 다체).
- Use one spelling for each name and term within a language (tables in ~/langmap-work/l10n_read/x6).

## 3. Process for a new article or translation
1. **Write the English and check its facts.** Run a sense read: can a cold reader state the point of each sentence?
2. **Translate with the language file open.** Then read the translation cold, without the English, and rewrite anything that reads as a translation.
3. **Get a second reader.** A different reader does the same cold read (brief: ~/langmap-work/l10n_read2/BRIEF.md).
4. **Check the mechanics.** Apply, then run `node tools/trivia_style_check.js`, which flags mechanical slips (ASCII punctuation in CJK, English leftovers, banned openers). `check_all.js` runs it too.
5. **Report honestly.** Say plainly when no real native has read the text.
