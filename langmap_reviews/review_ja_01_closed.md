# LangMap review 01 — the Japanese varieties

**Date:** 2026-08-08
**Trigger:** a reader's report that the Japanese dialects in LangMap are
"sloppy — no more than LLM translations".
**Scope:** the eleven Japanese rows of `data.js` — ja, ja_kyo, ja_osa, ja_hir,
ja_hak, ja_aom, ja_edo, ja_heian, ja_oki, ja_mvi, ja_rys — across all 100
sentences.
**Method:** two `parallel(review) → parallel(adversarial-verify)` rallies. The
mainland rally ran three rounds over six shards; a second, stricter rally
covered Okinawan, Miyako and Yaeyama from four angles (lexicon, morphology,
syntax, and a cross-check against speaker-attested WordMap data). Every
survivor went to a DEFAULT-REJECT skeptic.
**Cost:** 401 agents, ~17.6M tokens. The mainland rally hit the monthly spend
limit in round 3; four of its six round-3 reviews and all 31 of its round-3
verifications died, so those findings are unverified and held.

| rally | raw findings | confirmed | refuted |
|---|---|---|---|
| mainland, 3 rounds | 260 | 122 | 138 |
| Ryukyuan, strict | 119 | 109 | 10 |

## The reader was right, and the two halves are wrong differently

**The mainland dialects are mostly fine.** Osaka produced 3 confirmed findings
and Hiroshima 3, out of 100 sentences each. The adversarial layer pushed back
hard and correctly: うち is not an error in Kyoto (it is the characteristic
first person there, not only female speech), ちょうだい is a real Osaka form,
つかあさい is not exclusively Chugoku. My own opening guess — that うち across
Kyoto, Osaka and Hakata was a pronoun template — was refuted.

**Okinawan is Japanese in disguise.** Four independent reviewers reached that
sentence almost verbatim. Japanese は marks the topic in 44 of 100 sentences
(Okinawan uses や, with vowel coalescence); Japanese に and で serve as case
particles in about 52 (Okinawan has んじ and っし); the row carries 358 kanji
against exactly one in each of the other two Ryukyuan rows; and ids 44, 76, 85,
88 and 94 are Tokyo Japanese with さー or どー stapled on. The desiderative is
the clearest probe: ぶさん appears in eight sentences and Japanese 〜たい in two,
which is what a substitution list looks like when it runs out.

**Miyako and Yaeyama fail a different way: they are each other.** The two rows
are 81% character-identical, four sentences byte-for-byte — impossible for two
languages that are not mutually intelligible. Both are built on *Okinawan*
lexicon, and both contradict the speaker-attested forms already in WordMap:
かむん for "eat" where the speaker gives fai/ɸai, あんまー for mother where they
give anna/appa, すー for father where they give attʃa. There are invented forms
too — かに as a feminine pronoun in a language with no pronoun gender, どぅる as
a Yaeyama 2sg where the documented form is ワー — and lexical collisions, まやー
"cat" used for "room", みー "eye" for "garden". In 100 sentences kakari-musubi
never once occurs: どぅ is used as a bare copula rather than a focus clitic.

**The word order is sound, and that belongs on the record.** 88–90 of 100
sequences match Tokyo Japanese because Japonic word order really is that
conservative — prenominal relative clauses, SOV, postpositions,
quantifier-after-NP, clause-final question marking. The reviewer assigned to
syntax asked explicitly that this be stated, having checked the identical
orders one by one. Exactly one genuine ordering defect exists, at #96, where
the order string claims a 曲がって segment the text does not contain. My opening
framing — "a word-order map whose word order does not move" — was wrong.

## Applied: the Kyoto どす paradigm (12 cells)

This is the one repair the data settles by itself.

どす is a contraction of で + おす and inherits the copula's distribution: nouns
and na-adjectives only. A polite i-adjective in Kyoto takes the u-onbin plus
おす, or nominalises with ん. The file already knows this:

| pattern | count | correct? |
|---|---|---|
| noun / na-adjective + どす (田中どす, きれいどすなぁ, 便利どすえ) | 12 | yes |
| i-adjective u-onbin + おす (おいしおすなぁ, よろしおすか) | 4 | yes |
| i-adjective + ん + どす (悲しいんどすえ, #79) | 1 | yes |
| **i-adjective + どす directly** | **11** | **no** |

And the ten 〜たいどす sit in exactly the ten slots where the standard ja row
has 〜たいです. That is a です → どす substitution performed without inflecting
the stem — the reader's complaint, in its purest form.

Repaired by the ん route (#1, 9, 22, 32, 44, 48, 58, 62, 71, 98, 81), because
that is what the file itself does at #79, and because the u-onbin alternatives
carry risk: 試着しとおす invites a 試着し通す reading, and 痛い would have to
become 痛うおす — never 痛おす, which reads いたおす and is not a form. The
reviewer proposed 痛おすえ; the verifier caught it.

Also #33, きれいでしたえ → きれいどしたえ. It is the only です-series *copula*
left in the row. The eleven ました and はりました cells are correct and were not
touched: ます is the ordinary polite in Kyoto and 〜はる is its own honorific.

One verifier dissented, calling 〜たいどす grammatical "because it matches 12
sibling cells". That is circular — the siblings it counted are the cells under
suspicion. The distribution table above is what decides it.

## Not applied

**The Okinawan は → や conversion (44 sentences).** The rule is real and was
verified against NINJAL's own 沖縄語辞典 data, whose particle entry has no は at
all: `-ja 助 は。ii,ee,aa,oo,uu などに終わる語に付く時は -ja のままである…
しかし短い i,a,u に終わる語に付く時は,それらの母音と融合し,ee,aa,oo となる`.
That last clause is why it cannot be applied mechanically: kuri → kuree, kuma →
kumaa, and a word ending in N takes のー. Forty-four individual judgements, and
a blind swap would replace one error with another. The verifier said so
explicitly.

**Miyako and Yaeyama.** Not a patching problem. If the two rows are one
Okinawan-lexicon text split by a mechanical ending swap — which is what 81%
identity, the shared Okinawan vocabulary and the shared invented pronoun all
point to — then fixing 26 cells leaves the other 74 wrong in the same way. This
needs a rebuild against real Miyako and Yaeyama sources, with the WordMap
speaker data as the anchor.

**Round 3 of the mainland rally (31 findings).** The spend limit killed every
verifier in that round. The workflow logged them as "0 confirmed, 31 refuted",
which is misleading: they were not refuted, they were never checked.

## Notes

1. **The adversarial layer earned its cost here more than in any previous
   rally.** It refuted 138 of 260 mainland findings, almost all of them a
   reviewer applying Tokyo norms to a regional variety. The single best catch:
   a reviewer wanted Okinawan 名前 replaced with なー; the verifier read the
   dictionary and found namee is the native word reserved for a *person's* name
   while なー is for things — and that the "fix" would have made the Okinawan
   row character-identical to the Miyako and Yaeyama ones, which is the very
   error the review existed to find, pointed the other way.
2. **Speaker-attested data from one map is evidence in another.** The 17
   Ryukyuan forms collected from @Soda_Limer for WordMap decided 26 findings
   here. Cross-map provenance is worth wiring together deliberately.
3. **Check the renderer before reporting a data defect.** 204 cells across the
   Japanese and Korean rows begin with U+200C, which looked like corruption
   until `app.js:339` turned out to define it: `const GLUE = '‌'; // ZWNJ
   prefix = join to previous segment without space`.
4. `きれいどす` contains the substring `いどす`. A regex written to find
   i-adjective + どす flags it, and きれい is a na-adjective. Two false
   positives, caught by reading the output rather than trusting the count.
