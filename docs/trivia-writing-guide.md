# Writing the trivia articles

For anyone — human or agent — editing `wordmap_trivia.js`, `hanmap_trivia.js` or the
`wordmap_trivia_*.js` overlays. 70 articles × 19 languages.

This is written after the 2026-08-31 editorial pass
(`docs/trivia-editorial-audit-2026-08-31.md`, commit `781af744`), which fixed a real problem and
introduced a smaller one. Both are recorded here, because the second one is the easier mistake to
make next time.

---

## 1. Three hard rules

These are not style preferences. Breaking them is a defect.

### 1.1 Quotation marks mean verbatim

If a sentence is inside `"…"` or a `<blockquote>` and carries a person's name, that person wrote or
said exactly those words, and you can name the publication. Nothing else may appear in quotation
marks.

The 2026-08-31 pass removed ten blockquotes of this shape:

> "You cannot speak Guugu Yimithirr without always knowing where north is." — paraphrase of Stephen
> Levinson, 1997

Levinson never wrote that sentence. The word "paraphrase" was in the attribution line, and it does
not help: a reader scanning the page sees quotation marks and a real scholar's name. Labelling an
invention does not stop it being read as a quotation.

**Removing them was right and is not up for discussion.** What to do instead:

- Find the real quotation and use it. `sanskrit-panini` now quotes Chomsky's actual 1965 *Aspects of
  the Theory of Syntax* preface, which is better than the invention it replaced.
- Or drop the quotation marks and state the finding in your own voice, keeping the attribution:
  "Núñez and Sweetser filmed elderly Aymara speakers…".

Real citations already in the corpus — Bloomfield's 1929 *Language* review, the Zuckermann BBC
Future interview, Sampson 1985 — are correct and must survive any rewrite.

### 1.2 Facts survive edits

A rewrite may delete a sentence. It may not delete the date, figure, form or name that sentence
carried — re-home it in the replacement.

The pass got this mostly right: number density across the English bodies was unchanged
(171.9 → 174.0 numbers per 10,000 words). But `kokugo-versus-kango` lost 1543 — the year a
Portuguese ship first reached Japan — because it sat inside a sentence being de-hyped, while all 18
other languages kept it. That is a silent regression, and it took a diff to find.

Before committing a rewrite, diff the numbers and proper nouns, not just the prose.

### 1.3 Buttons are data, and they are translated too

`<button class="trivia-action">` labels live inside the body HTML, so translators skip them. The
`tea-tea-cha-cha` controls read "🚢 Pan to Fujian coast" in all 18 non-English bodies until
2026-08-31. Whenever you touch an article, check its button labels in every language.

The attributes are load-bearing on the server-rendered pages — see §6.

---

## 2. The register problem, in both directions

The brief was "remove the AI-ness, make it clearer". Measured over the 39,000 English words:

| marker | before | after |
|---|---|---|
| superlatives (`the most`, `the only`, `the world's`) | 56 | 35 |
| `not just X but Y` | 17 | 2 |
| evaluative adjectives (`remarkable`, `ingenious`, `striking`) | 31 | 12 |
| reader address (`you`, `imagine`, `next time`) | 82 | 63 |
| **hedges** (`often`, `generally`, `can be`, `tends to`) | **39** | **48** |

The first four are the intended result and they are good. The fifth is the problem: hedging went
**up**, and is now the densest marker in the corpus.

**Hype and hedge are the same failure.** Both are register applied on top of the content instead of
content. A reader cannot use "is often used to show how a dialect difference can travel with trade"
any more than they could use "one of the most elegant linguistic puzzles in world history". One
oversells, one says nothing, and both read as machine-written.

The related drift is from the object to the discourse — from what a language does to what linguists
say about it:

> The front-facing past remains the feature most often discussed in cognitive-linguistic research.

That is a sentence about a literature, not about Aymara. Write about the literature only when the
disagreement is itself the story (`bai-language-script` is genuinely about a classification dispute;
say so plainly and name the three proposals).

---

## 3. The rules, in positive form

Each is illustrated with a real before/after from the corpus.

### Lead with the fact, not the frame

> **Before** — If you had to pick a single book to send back in a time machine to confound a
> 20th-century computer scientist, it would be hard to do better than the Aṣṭādhyāyī…
>
> **After** — Composed in what is now northwestern Pakistan around 500–400 BCE, the Aṣṭādhyāyī — the
> "Eight Chapters" of Pāṇini — gives a generative description of Sanskrit in just under 4,000 sūtras
> (terse aphoristic rules). The complete grammar fits in roughly 35 modern printed pages.

The second is shorter, more surprising, and contains three checkable things. Interest comes from the
facts being interesting, not from being told they are.

### Break the contrast instead of hedging it

> **Before** — Núñez and Sweetser did not just rely on lexical glosses, which can mislead. They
> filmed elderly Aymara speakers…
>
> **After** — Because lexical glosses can mislead, Núñez and Sweetser also filmed elderly Aymara
> speakers discussing events from many decades in the past and future.

`not just X but Y` becomes a causal clause. Nothing is lost and nothing is hedged. This is the model
for the whole pattern.

### A superlative is fine when it is measurable and attributed

Not all superlatives are hype. These are different sentences:

- ✅ Anthony Traill's 1985 study of East ǃXoon yields at least 58 phonemic consonants on the most
  conservative reckoning — English gets by on 24.
- ❌ …one of the most elegant linguistic puzzles in world history.

The first can be checked, names its source, and is the reason the article exists — and note that
`taa-most-consonants` makes it *without* a superlative at all, by giving the number and something to
measure it against. Delete the second kind only.

The 2026-08-31 pass deleted some of both, which is why `tea-tea-cha-cha` lost "almost perfectly
binary" — a real and unusual property of that split — and gained "unusually widespread", which is
weaker prose *and* a weaker claim.

### Be specifically uncertain, not vaguely uncertain

- ❌ Bai's classification is often discussed.
- ✅ Bai's classification is unsettled: it has been argued to be Sinitic, Tibeto-Burman, and an
  independent branch of Sino-Tibetan.

Budget roughly one hedge per claim that actually needs one. Hedging as a default register is the tic
this guide exists to prevent.

### Every paragraph carries something concrete

A form, a number, a date, a place, or a name. A paragraph with none of these is usually a paragraph
of framing and can be cut.

### End on the material, not on the article's own importance

Endings like "this case raises a bigger question" or "linguists were forced to ask again" are the
article advertising itself. End on the open question, the current state of the evidence, or the
thing you can observe:

> **Before** — …it is the only language on Earth that has done so and come back.
>
> **After** — Its return to intergenerational transmission after centuries of mainly liturgical and
> literary use remains unusual among documented language-revival movements.

Still a claim, still interesting, but survivable.

### Keep the voice

De-hyping is not de-voicing. `mohawk-polysynthesis` walks through
*washakotya'tawitsherahetkvhta'se'* morpheme by morpheme, and that is a good article because the
walk-through is fun, not because it is neutral. Cut the unearned; keep the specific, the odd and the
concrete.

---

## 4. Headings

A heading must be entailed by the body under it. If you de-hype a section, fix its heading in the
same edit.

`tangut-3000-syllables` still opens 「威圧するために作られた文字」("A Script Built to Intimidate") in
Japanese while the body under it now says only that Western Xia built a script for state and
cultural purposes. The heading is now writing a cheque the body does not cash.

An evocative heading is allowed when the first paragraph earns it.

---

## 5. Nineteen languages, not one

This is where the 2026-08-31 pass is least finished, and the rules below exist so the next one is
not.

Bodies rewritten, of 70 articles:

| en | ko | zh | vi | ja | each of the other 14 |
|---|---|---|---|---|---|
| 43 | 35 | 34 | 34 | 32 | ~10 |

- **Edit English first, then port.** Every translation's word order and emphasis is inherited from
  the English, so editing a translation before its source means doing it twice.
- **A title change is not done until all 19 are changed.** 33 articles currently carry a plain
  English title beside an older, more promotional title in the other eighteen. Nothing looks broken
  to any single reader — each language is internally consistent — but the de-hyping is only real in
  English.
- **Do not machine-translate the English edit into the other eighteen.** That is how the corpus got
  its translation-shaped prose in the first place. Rewrite the affected paragraph in each language,
  or leave it and record it as outstanding.
- **Translations may diverge in content only deliberately.** The ko/zh/vi Hebrew articles now carry
  a sentence about Yiddish and Russian influence that the English does not. That happens to be
  accurate, but it was not a decision — it was drift. If a language should say more, say so in the
  handoff.
- **Per-language conventions hold**: `zh` is simplified, `yue` is traditional. Numerals follow local
  convention (`1.700` in Vietnamese, `1,700` in English).

---

## 6. What the server-rendered pages do with your markup

Articles are also served as static HTML at `/{ui}/trivia/{slug}` with no JavaScript, so the map
controls are rewritten by `seo/trivia.php` (see handoff 69 and 71):

| control | becomes on the SSR page |
|---|---|
| `data-action="compare"` / `focus` with 2+ codes | a real comparison table (family, speakers, word forms) |
| `data-action="focus"` with 1 code | a link to that language's page |
| `data-action="panto"` | a locator map drawn from `countries.geojson` |
| `setchar` / `setword` | a link into the article inside the interactive map |

Consequences for writing:

- **A `compare` control is worth more than a `focus` control**, because it renders as a table. If an
  article compares languages in prose, give it the control and let the page show the forms.
- Put `data-word="…"` on a `compare` control when the article is about one concept; it becomes the
  table's first column.
- Adding a new `panto` coordinate needs `node tools/build_seo_minimaps.js` — `check_all` will tell
  you.
- Keep controls inside `<div class="trivia-actions">`. Tables and figures are block-level and a
  control inside a `<p>` would produce invalid HTML.

---

## 7. The checker

`node tools/trivia_style_check.js` enforces §1 and reports on the rest. Every defect this corpus has
actually shipped was invisible to a reader of any single page — a year that survived in 18 languages
and vanished from the 19th, an English button label under Japanese prose, an invented quotation with
a real name on it — so they are found by comparing bodies, not by reading them.

**Hard (exit code 1):**

| check | what it catches |
|---|---|
| §1.1 | a `<blockquote>` or quoted sentence attributed to a named person while admitting it is a paraphrase, in any of `paraphrase / 意訳 / 의역 / 转述 / diễn giải / …` |
| ~~§1.2~~ | *(now advisory)* years present in English and missing from a translation — see below |
| §1.3 | a button label byte-identical to its English original in a non-English body |

**Advisory (never fails):** hedge density per 10k words with the worst articles named; English headings
making a superlative claim, for a human to check against the body; and titles carrying an unhedged
superlative counted per language, so an English-only pass shows up as `en 1` beside `yue 4`.

Two deliberate limits, stated rather than hidden:

- **Only years are compared, not all figures.** English "750,000" is 「75万」 in Japanese and
  "750 mil" in Portuguese; a check that flagged those would report hundreds of non-problems and be
  switched off within a week. Everything other than a year stays a human diff.
- **The year check is advisory, not hard, and the demotion is itself instructive.** It was written
  to catch an edit that dropped a fact. Once its regex was fixed — it could not see a thousands
  separator, and `\b` fails between "1200" and "km" in 「約1,200km」 — the findings turned out to be
  something else: **235 HanMap bodies run under 45% of their English length**, so a year they skip
  is a translation nobody finished rather than a fact somebody deleted. It reports a count and names
  the few sitting in otherwise full-length bodies.
- **Superlative patterns are written for `en ja ko zh yue vi` only.** The other thirteen are named in
  the output as unchecked rather than silently passing.

The checker is **not** wired into `check_all.js`, because it currently reports four pre-existing
translation gaps (see the handoff) and a guard that starts red gets ignored. Wire it in once those
are closed.

---

## 8. Before committing

1. `node tools/check_all.js` green.
2. `node tools/trivia_style_check.js` — no new hard problems (§7).
3. Diff the numbers and proper nouns, not just the prose (§1.2).
4. Every `<blockquote>` and quoted sentence traces to a real source (§1.1).
5. Button labels translated in all 19 bodies (§1.3).
6. Headings still entailed by their bodies (§4).
7. If the English title changed, the other 18 changed too — or it is recorded as outstanding (§5).
8. `node tools/export_trivia_seo.js` and `node tools/build_trivia_index_links.js`, then
   `node tools/bump_versions.js`.
