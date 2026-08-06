# Review 433 — the three rows review 432 held open (com, kxc, hop)

**Date:** 2026-08-06
**Scope:** the two rows review 432's verifiers flagged as contaminated beyond
the cells they fixed (`com` Comanche, `kxc` Konso), plus the one held finding
that had no proposed replacement (`hop` tree).
**Method:** no LLM rally. Every cell was checked against a primary source, one
at a time: Ongaye Oda Orkaydo, *A Grammar of Konso* (LOT 326, 2013 — full text
open access); Wiktionary's Comanche and Hopi lemma categories via the MediaWiki
API; the ASJP Comanche wordlist (Canonge's data); Omniglot's Comanche phrase
list; native-languages.org's Comanche and Hopi word lists.
**Result:** 36 cells changed across 3 rows. Every one carries a `wordEvidence`
entry naming its source.

## `kxc` Konso — the row was Oromo

19 of 25 cells held Oromo, not Konso. The row's own comment in `wordmap_data.js`
had cited "Ongaye (2013) Konso grammar" as a source the whole time.

The tell is phonological and mechanical. Konso has **no voiced stops and no
ejectives**; it has the implosives ɓ ɗ ʄ ʛ instead (Ongaye 2013 §2.1, and the
Wikipedia summary of it). The row's IPA column was full of phonemes the
language does not have:

| cell | was | phoneme that gives it away |
|---|---|---|
| `father` | abba /abːa/ | /b/ |
| `mother` | eedda /eːdːa/ | /d/ |
| `name` | maqaa /makʼaː/ | ejective /kʼ/ |
| `love` | jaalla /dʒaːlːa/ | /dʒ/ |
| `thanks` | galta /ɡalta/ | /ɡ/ |
| `star` | urjii /urdʒiː/ | /dʒ/ |

All six are ordinary Oromo words (abbaa, haadha, maqaa, jaalala, galata, urjii).
Cross-checking against the dataset's own `om` row makes it explicit: `adurree`,
`harka`, `maqaa`, `urjii`, `akkam`, `mana`, `ani` are byte-identical between
`kxc` and `om`.

Replacements, all from Ongaye (2013):

| cell | was | now | where in the grammar |
|---|---|---|---|
| house | mana | tika | §2.1.1 (7), the /t/ example |
| dog | kareta | kuta | §2.1.1 (7); noun appendix kuta (M) pl. kuttaa |
| fire | iya | apitta | §2, singulative apitta (M) |
| eye | ila | ilta | §2.2 (31), the /i/ example |
| heart | onna | sataʔta | §2.7, /sataʔta/ [sataatḁ] |
| tree | ergaa | ʛoyra | the /ʛ/ uvular-implosive example |
| star | urjii | hikkitta | noun appendix |
| sun | kawa | piirtuta | noun appendix |
| mother | eedda | aayyaa | §2.1, stated outright |
| father | abba | aappaa | kinship table |
| cat | adurree | aturraata | §13, the call-to-a-cat interjection |
| name | maqaa | maχχa | §2.1.1 |
| i | ani | anti | Table 1, 1SG.NOM |
| good | fayye | paʛaari | §7.1 adjectival root paʛaar-, predicative i=paʛaar-i |
| hello | akkam | nakaytaa | §13.3.1, greetings are built on nakaytaa 'health, peace' |
| eat | ihaa | ɗamiyaa | root ɗam-, infinitive ɗam-iyaa printed in the grammar |
| drink | inakkaa | ikiyaa | root ik- ~ ikk-; infinitive regular but not printed |
| love | jaalla | ʄaalaɗiyaa | ʄaalaɗ- 'to choose, love'; same caveat |
| moon | ayeena | leya | see below |

Six cells were already right and are now cited: `water` piʃaa, `hand` harka,
`one` takka, `two` lakki, `you` atti — and note that `takka`/`lakki` are
distinctively Konso where Oromo has tokko/lama, so the row was never purely a
copy. Two IPA fixes came with them: `harka` was /haɾka/ (Konso's rhotic is the
trill /r/) and `lakki` was /lakki/ without the geminate.

`water` deserves a footnote. Review 432 fixed it from `inanta`, which is
literally **'the girl'** — it appears in the grammar's own example sentences as
inantasiʔ 'the girl'. So the source that would have caught the row was the same
source that had been cited on it.

**The weak cell is `moon` = leya**, marked `inferred`. Ongaye has no entry
glossed 'moon' anywhere in 32,000 lines, and Glosbe has no Konso moon.
`leya` (M), pl. leyaɗɗaa is his 'month'. Moon and month are one lexeme across
much of Lowland East Cushitic (Oromo jiʼa) — but not all of it, since Somali
keeps dayax 'moon' apart from bil 'month'. It replaces a form that was wrong in
both languages. This one needs a speaker or the 2022 English–Afaa Xonso school
dictionary.

`thanks` (was `galta`, Oromo galata) had no replacement either. Unlike moon it
is outside the core-20 concept list, so the validator permits the
unattested marker, and it is blank rather than guessed.

## `com` Comanche

Eleven cells replaced, two flagged and deliberately left alone.

| cell | was | now | source |
|---|---|---|---|
| dog | sʉwʉ | sarii | Wiktionary lemma; Comanche Nation Language Department's own Word of the Day; ASJP sati7 |
| moon | poʰa | mʉa | Wiktionary lemma; native-languages.org |
| good | puʰa | tsaatʉ | Omniglot (Tsaatʉ̱ = the reply to "How are you?"); ASJP ca |
| house | tua | kahni | Wiktionary lemma |
| tree | piʰe | huupi | ASJP hupi |
| mother | miʰa | pia | Wiktionary lemma |
| father | pʊ | ahpʉ | Wiktionary lemma |
| star | tatsinʉʉpʉ | tatsinuupi | Wiktionary lemma + ASJP tacinupi both write -uupi |
| hello | haʊ | marʉawe | Omniglot |
| thanks | (empty) | ʉra | Omniglot (Ʉra / Ʉrako) |
| heart | koroma | — | no source; blanked |

Two of these are worth calling out.

**`good` and `moon` held the same word.** puʰa and poʰa are both *puha*, which
is 'medicine, spiritual power' — a central Comanche concept, and not either of
the things it was filed under.

**`hello` was `haʊ`.** That is the English-language "how" stereotype of Plains
Indian speech. The actual greeting is marʉawe. This is the one cell in the whole
sweep that was not merely wrong but embarrassing, and it had been on a public
map.

Left in place with `evidence: 'disputed'` and a note rather than guessed at:

- `cat` ɨsʉ — mixes ɨ and ʉ in a row that writes ʉ throughout, and its IPA ɪsɨ
  uses /ɪ/, which Comanche does not have. Numic *isa* is 'wolf, coyote'. No
  source for a Comanche word for the domestic cat could be found.
- `love` wʊʊʰa — absent from Wiktionary, ASJP and the Comanche Nation materials.

One more cell was blanked outright: **`cuckoo` held `ebikuyuutsi`**, which is
not Comanche by any reading — e-bi- is a Bantu noun-class prefix, and Comanche
has no word-initial /b/ at all. It is the only `ebi-` form in the entire cuckoo
file, so it is a single stray import rather than a pattern.

Also fixed for internal consistency: `fire` was surface `kohtopu` with IPA
`kohtopʉ`, i.e. the two columns had swapped conventions. The row writes ʉ in the
surface and ɨ in the IPA everywhere else, so it is now kohtopʉ / kohtopɨ.

## `hop` Hopi — tree

`tree` was `suukya`, which is this row's own `one` cell (suukya', confirmed by
native-languages.org) with the glottal stop dropped.

Now `hotski`, from hopidictionary.com, which gives it with an example sentence
(*Hotski mokingpu* '(The) tree (is) green'). **This is a weak source** — one
online dictionary, and neither the Hopi Dictionary Project's Third Mesa volume
nor Wiktionary was reachable to cross-check the orthography. Wiktionary's
nearest Hopi lemma is `koho` 'wood, firewood, stick', which is not the same
concept. The cell is marked accordingly.

Two Hopi cells were checked and confirmed while there: `good` hopi (the
ethnonym and the adjective are one word) and `water` paahu. On `water`,
native-languages.org gives kuuyi instead; paahu is natural/spring water and
kuuyi is drawn water, so both are defensible and paahu stays.

## What this says about the dataset

1. **A cited source is not a checked source.** `kxc` named Ongaye (2013) in its
   own comment while holding Oromo, and the grammar contains, in its example
   sentences, the exact word that had been sitting in the `water` cell.
2. **Phoneme inventories are a cheap, mechanical filter for wrong-language
   rows.** Konso's missing voiced stops flagged six cells in one pass, with no
   lexical knowledge at all. `tools/surface_ipa_check.js` already does
   phonotactic legality per language; a rule table for "phonemes this language
   does not have" would have caught this row years earlier. **Worth building.**
3. **Within-row duplicate detection catches a specific and common import bug.**
   `hop` tree = `hop` one, `tcy` mother = `tcy` father (review 432), `bla` heart
   = `bla` dog (review 432). `tools/intra_row_dup_check.js` exists — these got
   through because the duplicate is *near*-identical (suukya vs suukya'), not
   exact. **Worth loosening to catch near-matches.**
4. **`wordEvidence` is the right home for "we know this is weak".** Three cells
   here (kxc moon, hop tree, com cat/love) are recorded as inferred or disputed
   with the reason, instead of looking as confident as the 33 sourced ones.
