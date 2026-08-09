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
**Cost:** 436 agents. The mainland rally died in round 3 the first time — four
of its six round-3 reviews and all 31 of its round-3 verifications — and was
resumed from the run id, which replayed rounds 1 and 2 from cache and ran only
the missing 35. It then completed with 0 errors.

| rally | raw findings | confirmed | refuted |
|---|---|---|---|
| mainland, 3 rounds | 325 | 178 | 147 |
| Ryukyuan, strict | 119 | 109 | 10 |

## The reader was right, and the two halves are wrong differently

**The living mainland dialects are mostly fine; the historical stages are not.**
Osaka ends at 2 defective cells out of 100 and Hiroshima at 3. Hakata has 8,
Aomori 6, Kyoto 7, Edo 8 — and Heian 21, more than the other five put together.
That split is not an accident of effort. A living dialect can absorb a doubtful
form: the adversarial layer pushed back hard and correctly on うち in Kyoto (the
characteristic first person there, not only female speech), on ちょうだい in
Osaka, on どさ in Tsugaru, and my own opening guess that うち across Kyoto, Osaka
and Hakata was a pronoun template was refuted outright. A closed corpus has no
such give: ja_heian ended around 1200, so "undescribed variation" and "a
register I have not met" are not available as defences. Either a form is
attested for the period or it is an anachronism, and 21 of them were.

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

## Applied, 1: the Kyoto どす paradigm (12 cells)

This is the repair the data settles entirely by itself.

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

## Applied, 2: the rest of the mainland (37 cells)

The 31 findings the spend limit had orphaned came back with verdicts on the
resumed run, and they carried the round-1 and round-2 survivors with them. What
follows is every confirmed finding that names one cell and a determinate
replacement.

**Kyoto (5 more).** 方 is honorific and does not take the plural ら (#72). 使う
is a w-stem, so its Kansai te-form is つこうて — written that way, because 使うて
reads つかうて (#86). を on the subject of an intransitive なる (#71). 〜とる is
the Osaka/播州/中国 progressive, not Kyoto city speech (#15). 〜なはれ is the
Osaka honorific imperative; Kyoto's is お + 連用形 + やす (#82).

**Osaka (2).** Uncontracted 〜ておる is not the Osaka progressive (#26), and
読み終える had been reduced to 読む, losing "finish" (#62).

**Hakata (8).** つかぁさい is the loudest one: it is Chūgoku, it appears twice in
the Hakata row and zero times in the Hiroshima row where it belongs. The
interesting part is that it *is* attested for Fukuoka — but for 福岡弁, the
castle-town samurai speech that came in with the Kuroda lords from Okayama and
is now extinct, and whose own dictionary marks the forms that crossed into
博多弁 with 「博多弁に吸収」. つかぁさい carries no such note. Also: きれかー has a
long vowel with no source (#65); っち is the quotative and cannot nominalise the
object of 習う, so #60 said "I am learning that someone makes Korean food"; 買った
is the eastern geminate where Kyushu has u-onbin (#11); と needs an adnominal
clause and cannot close a bare noun predicate (#4); ようけ stops at Ōita and is
absent from the native-compiled 博多弁大辞典 (#36); and #34 was the one ja_hak row
with no Hakata feature in it at all — the ja string with もっと → もうちょっと,
which is not a dialect form.

**Hiroshima (3).** けぇ is the causal subordinator, as the row itself uses it at
#79; sentence-finally on an aphorism it just dangles (#94). 言う appeared twice
in #82, so the doctor "said, saying rest". And とる/よる is an aspect pair, not a
spelling choice: 遊びよる is progressive, 遊んどる resultative (#26).

**Edo (8).** The 不定時法 numerals run *backwards* — 九つ八つ七つ六つ五つ四つ — and
had been read as if they were clock numbers. 三つ is not an hour name at all.
So 3 p.m. became 昼八つ半, 7 a.m. 明け六つ半, 8 p.m. 五つ, and 9 p.m. 亥の刻 (酉の刻
is 17–19時). 一刻 is two hours, not one (#46). 活動写真 is Meiji, fixed in both
cells that carried it (#16, #48) because fixing one would have been worse than
fixing neither. And 「来る七日の初日」 has no compositional reading: 来る＋数詞＋日 is
a frozen date formula, Edo 初日 is the opening day of a 芝居 run, and the Edo
calendar had no seven-day week to have a first day of (#31).

**Tsugaru (6).** めぇ is うまい "tasty", used as a general-purpose positive
adjective — cherry blossoms cannot be tasty (#12). だがや is Nagoya. めぇんめ
matches no word list; the 津軽弁対訳集 has なもかも (#100). さ is allative and has
not been extended to clock times, which the same row marks with に six times
elsewhere (#70). Tsugaru voices medial /t/, including before the benefactive
け- — #49 writes 教えでけれじゃ and #24 was the only cell left unvoiced. And
いっちゃん is a western superlative with no Tōhoku attestation, which also breaks
the row's own voicing: いぢばん (#4).

## Applied, 3: ja_heian (21 cells)

The largest single block, and the one where the verifiers had the least room to
manoeuvre. Three defect classes cover almost all of it.

**Modern grammar leaking through.** 食さ- exists only after the 四段化 of 漢語+す
verbs (食さない), a 近世 development; the Heian 未然形 is 食せ, and the plain verb is
食ふ (#32). 上達させ- is the modern causative spliced into a classical frame, with
the stray さ even sitting inside a segment boundary (#71). わかる did not mean
"understand" (#47). 毎 is a bound element and cannot head a 〜の phrase in any
period, where the row's own idiom is 〜ごとに (#3, #83).

**The wrong century.** たし is post-Heian, in a row that uses まほし six times
(#1). もそっと presupposes もう, which Heian lacks, and is first attested in 狂言
and the 日葡辞書 of 1603 (#34, #85). 座る "sit down" is post-Heian; the verb is
ゐる (#68). 経験 as a count noun is a Meiji translation word (#80). And the hours
had drifted into the Edo bell-count — 七つの時, 八つの時 — in a row that reckons by
十二辰刻 correctly at #17 and #70, so they became 辰の刻 and 戌の刻; 酉の刻 for 9 p.m.
was two hours off (#70).

**係り結び not applied.** A wh-question takes か with a 連体形 結び; や is the polar
particle and cannot license 何の時に or いづこに (#4, #16). Sentence-final や
attaches to a 終止形, not to the 連体形 なる (#99). And #93 ended in a 連体形 with
no 係助詞 to license it, its subject marked with the subordinate-clause の.

Two more worth naming. 賜はる is the *humble* verb "to receive", so 賜はれ ordered
the addressee to humbly receive — the opposite of the request. It appeared in
three cells, and the row already writes 給へ in three others (#13, #28, #96).
And #89 was the only ja_heian cell in all 100 containing katakana or Latin
script: the modern string with ない swapped for ず. The row calques everything
else — 黒き湯, 影絵, 遠声, 遠声の器, 器の技, 作り知恵, 空の港, 牛車, and ateji for
フランス — so Wi-Fi standing bare was an oversight, not a policy. It is now
空の網の合言葉え見出でず, with 空の網 coined in the row's established style and え…ず
for the negative potential, since 見えず would only say "is not visible".

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

**Six things the verdicts named in passing but did not themselves rule on.**
Each is a real inconsistency; none was put to a skeptic, so none was applied.

- ja_aom writes だがや in five question cells (#10, #16, #40, #68, #99), all from
  the same bulk pass. Only #99 was raised as a finding and only #99 was fixed;
  the other four need their own replacements, since べ does not fit every frame.
- ja_hak has 新しか at #72 but 新しい at #11, #22, #94. か-adjective harmonisation
  is a dataset-wide style decision, not a by-product of a verb-morphology fix.
- ja_heian uses 宿 for both "hotel" (#1, #33) and "station" (#4, #36, #97). A
  verifier suggested うまや for the latter three; nobody checked it.
- ja_edo #89 carries the same bare "Wi-Fi" that ja_heian #89 was just fixed for,
  in a row that otherwise writes 珈琲 and 活動写真.
- ja_osa #86 has 使っとるわ, the same w-stem defect fixed in ja_kyo #86.
- ja_heian #46 renders 一時間 as 一時 while historically ひととき is two hours. The
  file is internally consistent (#74 半時 = 30 min, #59 now 四半時 = 15 min), so
  this is a coherent convention rather than an error — but it is a convention,
  and it is undocumented.

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
5. **A dead verifier is not a refutation, and the log said it was.** When the
   round-3 agents died, the workflow recorded "0 confirmed, 31 refuted" — the
   same string it would have printed for 31 findings a skeptic had actually
   demolished. On the resumed run 56 of round 3's 96 findings confirmed, and
   they include the Edo hour system and most of ja_heian. A tally that cannot
   distinguish "checked and rejected" from "never checked" will quietly bury
   the second kind, and the more expensive the round, the more it buries.
6. **Resuming beat re-running, by a wide margin.** `resumeFromRunId` replayed
   rounds 1 and 2 from cache and ran only the 35 missing agents. Cost aside,
   this matters for correctness: a fresh rally would have produced a different
   set of round-1 findings, and the round-3 reviewers were prompted with the
   earlier rounds' results.
