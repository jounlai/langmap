# Wordmap review #102 — Horn of Africa (Ethio-Semitic + Cushitic + Omotic) round-2 auditor

## Reviewer self-introduction (ペルソナ自己紹介)

I am a Horn-of-Africa areal specialist covering Ethio-Semitic, Cushitic and Omotic, returning for the round-2 audit of the codes `am`, `ti`, `tig`, `gez`, `sgw`, `so`, `om`, `aa`, `ssy`, `byn`, `sid`, `kxc`, `drs`, `dsh`, `wal` and `aiw` after the round-1 passes by review #38 (Ethio-Semitic) and #8 (Afro-Asiatic non-Semitic). I work from Leslau (1995) *Reference Grammar of Amharic* and Leslau (2000) *Concise Amharic Dictionary* for Amharic gemination (unwritten in fidel but phonemic — the exact blind spot this round targets), Kane (2000) *Tigrinya–English Dictionary* for Tigrinya, Saeed (1999) *Somali* for the SRC-1972 orthography (`x` = /ħ/, `c` = /ʕ/, `h` = /h/, doubled vowels = length), Griefenow-Mewis (2001) *A Grammatical Sketch of Written Oromo* for Qubee, Parker & Hayward (1985) *An Afar-English-French Dictionary* and Bliese (1981) for the Afar "Qafar feera" orthography (`q` = /ʕ/, `c` = /ħ/, `x` = /ɖ/ — crucially *different* from Somali), and Banti & Vergari (2005) for the matching Saho orthography. I have read `docs/words/CONTRIBUTING.md`, `docs/words/LANG_CODES.md`, and — to avoid re-litigating settled matters — the full closed adjudications of reviews #38, #8 and #81 (the latter fixed the Tigrinya vowel convention: 1st-order fidel = /ə/, 6th-order = /ɨ/ for `ti`; 1st-order = /ɛ/ for `am`). Every Current value below was verified verbatim against the live `words/*.js` files on the review date; all settled won't-fix items (`am` eye `ajn`, `gez`/`tig` drink `satja`, Somali pitch accent, `om` good `ɡaːriː`) are deliberately not re-reported.

---

## Issues found

### 1. `am` — mother/father/dog/cat — phonemic gemination missing in four basic nouns (4 entries)
- **File:** words/mother.js line 151, words/father.js line 151, words/dog.js line 151, words/cat.js line 151
- **Current:** `["እናት", "ɨnat"]`, `["አባት", "abat"]`, `["ውሻ", "wɨʃa"]`, `["ድመት", "dɨmɛt"]`
- **Expected:** `["እናት", "ɨnnat"]`, `["አባት", "abbat"]`, `["ውሻ", "wɨʃʃa"]`, `["ድመት", "dɨmmɛt"]`
- **Why:** Amharic gemination is phonemic and contrastive but unwritten in fidel (Leslau 1995 §3.7), so it must be supplied in the IPA — exactly the rule the dataset already applied when review #38 fixed `am` fire `ɨsat` → `ɨssat` ("matches Tigre əssat"). The same class of error survives in these four nouns: Leslau (2000) gives *ǝnnat* 'mother', *abbat* 'father', *wǝšša* 'dog', and *dǝmmät* 'cat' — all with geminate medials. The dataset's own siblings confirm: `mother.js:915 gez ["እም","əmm"]`, `father.js:1003 tig ["አቦ","ʔabbo"]`, `cat.js:909/1003 gez/tig ["ድሙ","dəmmu"]` all carry the geminate where the cognate `am` cells do not. Doubled-letter notation follows the in-row precedent `ɨssat`.

---

### 2. `am` — heart/hand — word-final phonemic geminates dropped (2 entries)
- **File:** words/heart.js line 151, words/hand.js line 151
- **Current:** `["ልብ", "lɨb"]`, `["እጅ", "ɨd͡ʒ"]`
- **Expected:** `["ልብ", "lɨbb"]`, `["እጅ", "ɨd͡ʒː"]`
- **Why:** Leslau (1995; 2000 s.vv.) gives Amharic *lǝbb* 'heart' and *ǝǧǧ* 'hand' with final geminates, which surface transparently before vowel-initial suffixes (*lǝbbe* 'my heart', *ǝǧǧu* 'his hand') and are part of the citation form. The dataset itself records the cognates with the geminate: `heart.js:909 gez ["ልብ","ləbb"]` and `heart.js:1003 tig ["ልቢ","ləbbi"]`. The bare `lɨb`/`ɨd͡ʒ` silently degeminates `am` against both Leslau and the sibling rows. (For the affricate, `ː` is used since doubling a tie-bar digraph is unreadable.)

---

### 3. `am` — thanks — `amɛsɛɡnalɛhu` drops both geminates and the epenthetic /ɨ/ of *amäsäggǝnallähu*
- **File:** words/thanks.js line 151
- **Current:** `["አመሰግናለሁ", "amɛsɛɡnalɛhu"]`
- **Expected:** `["አመሰግናለሁ", "amɛsɛɡɡɨnallɛhu"]`
- **Why:** The form is the 1sg compound imperfect of the D-type verb *mäsäggänä* (root with inherently geminate second radical, Leslau 1995 §44 on D-stems) plus the auxiliary *-allähu*, whose /ll/ geminate is invariant in the compound imperfect (Leslau 1995 §63). Standard citation: *amäsäggǝnallähu*. The current IPA (i) degeminates *gg*, (ii) reads the 6th-order ግ as zero instead of the pronounced /ɨ/ (yielding the un-Amharic cluster /ɡn/), and (iii) degeminates the auxiliary's *ll*. Three independent deviations from Leslau in one cell; the dataset's `am` 1st-order = /ɛ/, 6th-order = /ɨ/ convention (review #81 preamble) is otherwise followed.

---

### 4. `am` — drink — infinitive *mäṭäṭṭat* missing the geminate ejective
- **File:** words/drink.js line 151
- **Current:** `["መጠጣት", "mɛtʼɛtʼat"]`
- **Expected:** `["መጠጣት", "mɛtʼɛtʼːat"]`
- **Why:** The verb is *ṭäṭṭa* 'drink' (geminating type; Leslau 2000 s.v. ṭäṭṭa), whose infinitive is *mäṭäṭṭat* with the geminate second ṭ retained. Compare the correctly ungeminated sibling `eat.js:151 am ["መብላት","mɛblat"]` (*mäblat* from *bälla*, where the geminate is broken by the cluster): the contrast between the two infinitive shapes is real Amharic morphophonology, and the current cell levels it. Notation `tʼː` per issue 2.

---

### 5. `ti` — cat/heart/father — Tigrinya phonemic gemination missing, inconsistent with the dataset's own `gez`/`tig` rows (3 entries)
- **File:** words/cat.js line 246, words/heart.js line 246, words/father.js line 246
- **Current:** `["ድሙ", "dɨmu"]`, `["ልቢ", "lɨbi"]`, `["ኣቦ", "ʔabo"]`
- **Expected:** `["ድሙ", "dɨmmu"]`, `["ልቢ", "lɨbbi"]`, `["ኣቦ", "ʔabbo"]`
- **Why:** Kane (2000) gives Tigrinya *dǝmmu* 'cat', *lǝbbi* 'heart', *ʔabbo* 'father' — all geminate. The internal evidence is decisive: the same fidel strings two rows down are transcribed with the geminate — `cat.js:909 gez ["ድሙ","dəmmu"]` and `cat.js:1003 tig ["ድሙ","dəmmu"]`; `heart.js:909 gez ["ልብ","ləbb"]` and `heart.js:1003 tig ["ልቢ","ləbbi"]`; and review #38 itself fixed `father.js tig` to `ʔabbo` while the Tigrinya cognate cell was left as `ʔabo`. Gemination is phonemic in Tigrinya exactly as in Amharic and unwritten in fidel, so the `ti` cells must supply it as the `gez`/`tig` cells already do. (6th-order vowel kept as `ɨ` per the `ti` convention adjudicated in review #81.)

---

### 6. `ti` — mother — `ʔadɛ` misses the geminate of *ʔaddä* and uses the Amharic /ɛ/ for a 1st-order vowel
- **File:** words/mother.js line 252
- **Current:** `["ኣደ", "ʔadɛ"]`
- **Expected:** `["ኣደ", "ʔaddə"]`
- **Why:** Kane (2000) gives Tigrinya *ʔaddä* 'mother' with geminate /dd/ (cf. the possessed form ኣደይ *ʔaddäy* 'my mother'); the geminate also parallels the kinship pattern *ʔabbo* (issue 5) and the dataset's `tig` `əmmo`. Separately, the final ደ is 1st-order, which per the `ti` convention fixed and closed in review #81 (`səlam`, `kəlbi`, `wərħi`) must be /ə/, not the Amharic-rule /ɛ/. This cell carries both residual defects.

---

### 7. `ti` — one & house — residual Amharic-convention /ɛ/ for 1st-order fidel, missed by the #81 pass (2 entries)
- **File:** words/one.js line 252, words/house.js line 253
- **Current:** `["ሓደ", "ħadɛ"]`, `["ገዛ", "ɡɛza"]`
- **Expected:** `["ሓደ", "ħadə"]`, `["ገዛ", "ɡəza"]`
- **Why:** Review #81 (closed) established and applied the Tigrinya vowel rule — 1st-order = /ə/ — fixing `hello` (`səlam`), `dog` (`kəlbi`) and `thanks`, with `sun.js ti tsʼəħaj` and `moon.js ti wərħi` as the convention witnesses. Two cells of the identical defect class were not in #81's list and survive: ደ in ሓደ and ገ in ገዛ are both 1st-order, yet are transcribed with the Amharic /ɛ/. For internal consistency of the `ti` row (Leslau's and Voigt's 1st-order Tigrinya value, per #81's own sourcing), these must be `ħadə` and `ɡəza`.

---

### 8. `gez` & `tig` — mother — alef-onset glottal stop /ʔ/ silently dropped (2 entries)
- **File:** words/mother.js line 915 (`gez`), words/mother.js line 1009 (`tig`)
- **Current:** `["እም", "əmm"]`, `["እሞ", "əmmo"]`
- **Expected:** `["እም", "ʔəmm"]`, `["እሞ", "ʔəmmo"]`
- **Why:** Identical class to review #38's applied-and-verified fixes #13 (`gez` fire `əsaːt` → `ʔəsaːt`) and #15 (`tig` hand `əd` → `ʔəd`): the fidel እ is 1st-order alef and always encodes /ʔ/ + /ə/ (Tropper 2002 §1.3; Leslau 1991). The mother cells were simply not in #38's sample. Sibling evidence in the same files: `father.js:909 gez ["አብ","ʔab"]`, `hand.js:909 gez ["እድ","ʔəd"]`, `hand.js:1003 tig ["እድ","ʔəd"]` all carry the onset.

---

### 9. `tig` — fire — `əssat` missing the same alef-onset /ʔ/ that #38 restored in the `gez` cell directly above it
- **File:** words/fire.js line 1009
- **Current:** `["እሳት", "əssat"]`
- **Expected:** `["እሳት", "ʔəssat"]`
- **Why:** Review #38 fixed `fire.js:915 gez` to `ʔəsaːt` on the rule that alef-initial syllables carry /ʔ/, and fixed two other `tig` alef onsets (`ʔəd`, `ʔabbo`) — but the `tig` fire cell, with the very same fidel string እሳት, was left without the glottal stop. Same rule, same word, same file; the gemination `ss` is correct (noted as correct by review #07 §26) and should be kept.

---

### 10. `so` — moon & sun — Somali orthographic `x` = /ħ/ misread as velar /x/ (2 entries)
- **File:** words/moon.js line 271, words/sun.js line 271
- **Current:** `["dayax", "dajax"]`, `["qorrax", "qɔɾːax"]`
- **Expected:** `["dayax", "dajaħ"]`, `["qorrax", "qɔɾːaħ"]`
- **Why:** In the standard Somali orthography (SRC 1972), the letter `x` represents the voiceless pharyngeal fricative /ħ/ — Saeed (1999 §1.2); the velar/uvular fricative is written `kh`. This is the exact same orthography-misread class as review #8's applied fix for Somali `c` = /ʕ/ (`cab`, `cun`, `gacmo`, `jacayl`), which covered the `c` letter but not `x`. The dataset's own `thanks.js:265 so` cell proves the team can produce /ħ/ — but puts it on the wrong letter (see issue 11). *dayax* /dajaħ/ and *qorrax* /qɔɾːaħ/ per Saeed (1999) and Zorc & Osman (1993).

---

### 11. `so` — thanks — the mirror error: orthographic `h` = /h/ transcribed as pharyngeal /ħ/
- **File:** words/thanks.js line 265
- **Current:** `["mahadsanid", "maħadsanid"]`
- **Expected:** `["mahadsanid", "mahadsanid"]`
- **Why:** Somali distinguishes `h` /h/ (glottal) from `x` /ħ/ (pharyngeal) orthographically and phonemically (Saeed 1999 §1.2 — minimal contrast, e.g. *hawo* vs *xawo*). *Mahadsanid* (< *mahad* 'gratitude') is spelled with `h`, so the IPA must be /h/. Together with issue 10 this shows the `so` row has the two letters systematically swapped in the three cells where they occur: /ħ/ appears where `h` is written and /x/ where `x` is written.

---

### 12. `so` — hand — `gacmo` is the plural 'hands'; the lemma is singular *gacan*
- **File:** words/hand.js line 265
- **Current:** `["gacmo", "ɡaʕmo"]`
- **Expected:** `["gacan", "ɡaʕan"]`
- **Why:** Somali *gacan* 'hand' (f.) pluralizes as *gacmo* with vowel syncope (Saeed 1999 §4.3 declension; Zorc & Osman 1993 s.v. gacan). The dataset's concept files elsewhere use singular citation forms (`so` eye `il`, not *indho* 'eyes'), and review #8 fixed only the IPA of this cell (`c` → /ʕ/) without examining the lemma's number. Surface + IPA replacement, precedent: the reviewer-endorsed surface replacement of `tig` one in closed review #38 round-2. The IPA of the corrected form keeps the established /ʕ/ for `c`.

---

### 13. `aa` — house/good/thanks — Afar orthographic `q` = /ʕ/ misread as a uvular stop (3 entries)
- **File:** words/house.js line 739, words/good.js line 732, words/thanks.js line 732
- **Current:** `["qarí", "qari"]`, `["meqé", "meqe"]`, `["qungúsa", "quŋɡusa"]`
- **Expected:** `["qarí", "ʕari"]`, `["meqé", "meʕe"]`, `["qungúsa", "ʕuŋɡusa"]`
- **Why:** In the Afar Latin orthography ("Qafar feera" — the very name of the language, *Qafar*, is /ʕafar/), the letter `q` writes the voiced pharyngeal fricative /ʕ/; Afar has **no** uvular stop /q/ in its phoneme inventory (Bliese 1981 §1; Parker & Hayward 1985, introduction). Parker & Hayward give *qari* 'house' = [ʕari] and *meqe* 'good' = [meʕe]. The current IPA cells simply copy the orthographic letter into IPA, producing a phoneme the language does not possess. Note this is *not* the Somali convention (where the pharyngeal is `c`): the two orthographies assign the pharyngeals differently, which is presumably how this survived review #8's Somali-focused `c` pass.

---

### 14. `aa` — tree & love — Afar `c` = /ħ/ and `x` = /ɖ/ misread as English-style /tʃ/ and /χ/ (2 entries)
- **File:** words/tree.js line 732, words/love.js line 739
- **Current:** `["caxá", "tʃaχa"]`, `["kicimá", "kitʃima"]`
- **Expected:** `["caxá", "ħaɖa"]`, `["kicimá", "kiħima"]`
- **Why:** Same orthography-misread family as issue 13, on the other two special letters: Afar `c` writes the voiceless pharyngeal /ħ/ and `x` the voiced retroflex plosive /ɖ/ (Bliese 1981; Parker & Hayward 1985 — *caxa* 'tree' = [ħaɖa]). The current `tʃaχa` reads `c` as an affricate and `x` as a velar/uvular fricative — neither value exists for these letters in Afar, and /tʃ/ is not even an Afar phoneme. The accented surfaces (`caxá`, `kicimá`, `qarí`…) match Parker & Hayward's accent-marked dictionary citations, confirming the surfaces are genuine Afar orthography that the IPA pass then mis-decoded letter-by-letter.

---

### 15. `ssy` — good/drink/tree — same pharyngeal/retroflex letter values in the Saho orthography (3 entries)
- **File:** words/good.js line 1005, words/drink.js line 1005, words/tree.js line 1005
- **Current:** `["meqe", "meqe"]`, `["yaaqab", "jaːqab"]`, `["caar", "tʃaːr"]`
- **Expected:** `["meqe", "meʕe"]`, `["yaaqab", "jaːʕab"]`, `["caar", "ħaːr"]`
- **Why:** Saho uses the same Eritrean Latin convention as its closest relative Afar: `q` = /ʕ/, `c` = /ħ/, `x` = /ɖ/ (Banti & Vergari 2005, *A primer of Saho grammar*; Vergari & Vergari 2003 Saho dictionary). Saho, like Afar, has no uvular /q/ and no /tʃ/ in native vocabulary. *meqe* 'good' [meʕe] is the exact cognate of the Afar cell in issue 13 (the dataset even has the Saho–Afar pair `ssy ayro` / `aa ayró` 'sun' showing the rows track each other). The long vowels (`aa` = /aː/) are already correctly decoded in these very cells, which makes the letter-for-letter copying of `q`/`c` the isolated residual error.

---

### 16. `aa` — sun — one-off /ɔ/ in `ajɾɔ` against the row's own /o/ and the identical Saho cell
- **File:** words/sun.js line 738
- **Current:** `["ayró", "ajɾɔ"]`
- **Expected:** `["ayró", "ajɾo"]`
- **Why:** Afar has a five-vowel system /i e a o u/ (plus length) with no /ɔ/–/o/ contrast (Bliese 1981 §1.2). Every other `aa` cell in the dataset transcribes orthographic `o` as /o/ (`dog.js:732 kuduú → kuduː`… cf. `hello.js:725 naɡa`, `father.js:732 abːa` for the convention), and the same word in the sibling row is `sun.js:1011 ssy ["ayro","ajɾo"]` with /o/. The lone /ɔ/ is an internal-consistency defect: same word, same row-pair, two different vowel symbols.

---

*All line numbers reference the state of the files as of the review date (2026-06-11). No data files were modified.*

---

## Worker round-1 response (作業者round-1)

All 16 findings are clear data errors or internal inconsistencies with decisive in-file sibling evidence and cited sources (Leslau, Kane, Saeed, Bliese, Parker & Hayward, Banti & Vergari). They follow rules the dataset already applies elsewhere (phonemic gemination supplied in IPA per #38; alef-onset /ʔ/ per #38; Tigrinya 1st-order /ə/ per #81; orthography-letter decoding per #8). All applied.

- **102-1** am gemination (4): mother `ɨnat`→`ɨnnat`, father `abat`→`abbat`, dog `wɨʃa`→`wɨʃʃa`, cat `dɨmɛt`→`dɨmmɛt` (Leslau 2000; sibling gez/tig geminates). Applied by orchestrator this round.
- **102-2** am final geminates (2): heart `lɨb`→`lɨbb`, hand `ɨd͡ʒ`→`ɨd͡ʒː` (Leslau; gez `ləbb`, tig `ləbbi`). Applied by orchestrator this round.
- **102-3** am thanks: `amɛsɛɡnalɛhu`→`amɛsɛɡɡɨnallɛhu` (D-stem gg + epenthetic ɨ for 6th-order ግ + auxiliary ll; Leslau §44/§63/§81 convention). Applied by orchestrator this round.
- **102-4** am drink: `mɛtʼɛtʼat`→`mɛtʼɛtʼːat` (geminate ejective of *mäṭäṭṭat*; Leslau). Applied by orchestrator this round.
- **102-5** ti gemination (3): cat `dɨmu`→`dɨmmu`, heart `lɨbi`→`lɨbbi`, father `ʔabo`→`ʔabbo` (Kane; gez/tig siblings geminate). Applied by orchestrator this round.
- **102-6** ti mother: `ʔadɛ`→`ʔaddə` (geminate dd + 1st-order /ə/ per #81). Applied by orchestrator this round.
- **102-7** ti 1st-order /ə/ (2): one `ħadɛ`→`ħadə`, house `ɡɛza`→`ɡəza` (#81 convention). Applied by orchestrator this round.
- **102-8** gez/tig mother alef-onset (2): gez `əmm`→`ʔəmm`, tig `əmmo`→`ʔəmmo` (#38 rule; siblings ʔab, ʔəd). Applied by orchestrator this round.
- **102-9** tig fire: `əssat`→`ʔəssat` (same alef rule as gez cell above; ss kept). Applied by orchestrator this round.
- **102-10** so x=/ħ/ (2): moon `dajax`→`dajaħ`, sun `qɔɾːax`→`qɔɾːaħ` (SRC-1972; Saeed 1999). Applied by orchestrator this round.
- **102-11** so thanks: `maħadsanid`→`mahadsanid` (h=/h/ glottal; mirror of 10). Applied by orchestrator this round.
- **102-12** so hand: `["gacmo","ɡaʕmo"]`→`["gacan","ɡaʕan"]` (lemma is singular *gacan*; gacmo is plural; Saeed §4.3, singular-citation precedent). Surface + IPA. Applied by orchestrator this round.
- **102-13** aa q=/ʕ/ (3): house `qari`→`ʕari`, good `meqe`→`meʕe`, thanks `quŋɡusa`→`ʕuŋɡusa` (Afar has no /q/; Bliese, Parker & Hayward). Applied by orchestrator this round.
- **102-14** aa c=/ħ/ x=/ɖ/ (2): tree `tʃaχa`→`ħaɖa`, love `kitʃima`→`kiħima` (Afar letter values; Bliese, Parker & Hayward). Applied by orchestrator this round.
- **102-15** ssy Saho letters (3): good `meqe`→`meʕe`, drink `jaːqab`→`jaːʕab`, tree `tʃaːr`→`ħaːr` (Banti & Vergari 2005; same Eritrean Latin convention as Afar). Applied by orchestrator this round.
- **102-16** aa sun: `ajɾɔ`→`ajɾo` (Afar 5-vowel system, no /ɔ/; sibling ssy `ajɾo`). Applied by orchestrator this round.

Open items left for reviewer: none.

---

## Reviewer round-2 response (再評価 round-2)

I re-verified every claimed fix verbatim against the live `words/*.js` cells on the review date. All 16 items are present in the data exactly as the worker reported.

- **102-1** ✓ `mother.js:151 am ["እናት","ɨnnat"]`, `father.js:151 am ["አባት","abbat"]`, `dog.js:151 am ["ውሻ","wɨʃʃa"]`, `cat.js:151 am ["ድመት","dɨmmɛt"]`. All four geminates now present; matches Leslau and the in-file gez/tig sibling geminates.
- **102-2** ✓ `heart.js:151 am ["ልብ","lɨbb"]`, `hand.js:151 am ["እጅ","ɨd͡ʒː"]`. Final geminates restored.
- **102-3** ✓ `thanks.js:151 am ["አመሰግናለሁ","amɛsɛɡɡɨnallɛhu"]`. gg + epenthetic ɨ + ll all present.
- **102-4** ✓ `drink.js:151 am ["መጠጣት","mɛtʼɛtʼːat"]`. Geminate ejective present.
- **102-5** ✓ `cat.js:246 ti ["ድሙ","dɨmmu"]`, `heart.js:246 ti ["ልቢ","lɨbbi"]`, `father.js:246 ti ["ኣቦ","ʔabbo"]`.
- **102-6** ✓ `mother.js:252 ti ["ኣደ","ʔaddə"]`. Geminate dd + 1st-order /ə/.
- **102-7** ✓ `one.js:252 ti ["ሓደ","ħadə"]`, `house.js:253 ti ["ገዛ","ɡəza"]`. Both 1st-order /ə/.
- **102-8** ✓ `mother.js:915 gez ["እም","ʔəmm"]`, `mother.js:1009 tig ["እሞ","ʔəmmo"]`. Alef-onset /ʔ/ restored.
- **102-9** ✓ `fire.js:1009 tig ["እሳት","ʔəssat"]` (gez sibling at :915 is `ʔəsaːt`); gemination ss correctly kept.
- **102-10** ✓ `moon.js:271 so ["dayax","dajaħ"]`, `sun.js:271 so ["qorrax","qɔɾːaħ"]`. `x`=/ħ/ decoded.
- **102-11** ✓ `thanks.js:265 so ["mahadsanid","mahadsanid"]`. `h`=/h/ corrected (mirror of 10).
- **102-12** ✓ `hand.js:265 so ["gacan","ɡaʕan"]`. Singular lemma + IPA both replaced.
- **102-13** ✓ `house.js:739 aa ["qarí","ʕari"]`, `good.js:732 aa ["meqé","meʕe"]`, `thanks.js:732 aa ["qungúsa","ʕuŋɡusa"]`. `q`=/ʕ/ decoded.
- **102-14** ✓ `tree.js:732 aa ["caxá","ħaɖa"]`, `love.js:739 aa ["kicimá","kiħima"]`. `c`=/ħ/, `x`=/ɖ/ decoded.
- **102-15** ✓ `good.js:1005 ssy ["meqe","meʕe"]`, `drink.js:1005 ssy ["yaaqab","jaːʕab"]`, `tree.js:1005 ssy ["caar","ħaːr"]`. Saho Eritrean-Latin letter values decoded.
- **102-16** ✓ `sun.js:738 aa ["ayró","ajɾo"]`. /ɔ/→/o/, now matches the ssy sibling `ajɾo` and the Afar five-vowel system.

No new issues. During verification I incidentally noted the surrounding sibling cells (e.g. `hand.js:246 ti ["ኢድ","ʔid"]`, `drink.js:265 so ["cab","ʕab"]`, `love.js:272 so ["jacayl","dʒaʕajl"]`) remain consistent with the established `c`=/ʕ/ (Somali) and alef-onset conventions; nothing actionable.

### Scorecard
- Accepted (✓): 16 / 16
- Partial (△): 0
- Rejected (✗): 0
- New issues: 0

Every clear error raised in round-1 is fixed-and-verified in live data. Nothing remains for the dev team.

**File status: CLOSED** — nothing left to address.
