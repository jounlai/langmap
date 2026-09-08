# Review A — lic (Baoding Hlai), swi (Sandong Sui), mmd (Maonan)

Repo commit 6a333f7b. Sources read: `/home/jounlai/langmap-work/cn/kamsui.py`,
`/home/jounlai/langmap-work/cn/ks_raw.py`, `/home/jounlai/langmap-work/cn/build.py`,
`/home/jounlai/langmap/words/*.js`, `/home/jounlai/langmap/wordmap_meta.js`.
Raw ABVD pages saved to `/home/jounlai/langmap-work/rally/abvd_772.txt|736.txt|784.txt`.
Every cell was recomputed with an independently written converter
(`chao()` built from a fresh digit→˩˨˧˦˥ map, fresh length test), not by running kamsui.py.

## 1. Tone conversion

**No conversion errors found.** All 127 published lic/swi/mmd cells reproduce exactly from the
quoted tables, and all 19 checked-tone cells (lic ×6, swi ×7, mmd ×6) get the length-correct value:
swi `phjaat7 laak7`→˧˥ long, `pek7 n̥ak7 zət7`→˥˥ short, `paak8`→˦˨ long, `nok8`→˧˩ short;
mmd `phja:t7`→˦˦ long, `da:k8`→˨˦ long, `pɛk7 zət7`→˥˥ short, `nɔk8 pok8`→˨˧ short.
Surfaces match ks_raw byte-for-byte; ks_raw matches ABVD byte-for-byte (no mis-transcriptions).

1. **NOTE — `LONG` regex in kamsui.py, all swi/mmd tone-7/8 cells.** The length test is purely
   orthographic and silently defaults to "short" on any unrecognised notation. It happens to be
   safe here only because the Sui list writes length by doubling throughout and the Maonan list
   writes `:` throughout; nothing asserts that, so a future list that writes `a:` for Sui (or `aa`
   for Maonan) would mis-tone every checked cell with no error. Should be an assert, not a fall-through.
   (Verified by inspection of every checked form in `ks_raw.py`.)
2. **NOTE — mmd `bird` = `nɔk8` → `nɔk˨˧`.** The row's tone table comes from Lu Tianqiao, but the
   *form* comes from Liang Min 1980 via ABVD, and the two sources disagree on this word's tone
   category: Lu writes `nok7 vin1` 'flying bird' (tone 7 → ˥˥ short), ABVD has `nɔk8` (tone 8 → ˨˧).
   Not necessarily wrong — the row's policy is ABVD forms — but it is a live source conflict inside
   a single cell. Lu 2008:170, quoted at https://en.wikipedia.org/wiki/Maonan_language
3. **NOTE (low confidence) — mmd `white` = `pok8` → `pok˨˧`.** If the etymon is Chinese 白 (which
   ABVD annotates: see §4), its Kam-Sui shape elsewhere is long — Sui `paak8`, treated as long → ˦˨.
   A linguist reading Liang Min's form as /paːk⁸/ rather than /pok⁸/ would get ˨˦, not ˨˧. Only
   flagging because the form itself is disputed (finding 12); the regex handles `pok8` correctly as written.

## 2. The tone tables

4. **VERIFIED — swi table is exactly right.** Castro, "Southern Sui: a fourth Sui dialect", JSEALS
   4.2 (2011), p. 3, **Table 1: "Typical Sui tone values (Sandong dialect, Wei & Edmondson
   2003:xxviii)"** gives: 1 = 11, 2 = 31, 3 = 33, 4 = 51, 5 = 35, 6 = 24, 7 = 35 (long)/55 (short),
   8 = 42 (long)/31 (short). Identical to `SWI` in kamsui.py.
   PDF (JSEALS 4.2 full volume, article at pp. 1–31):
   https://drive.google.com/file/d/1RXol8qCiuqlF31skQX50CEWDjWDw5a3Q/view — indexed at
   https://sites.google.com/site/sealsjournal/jseals-volumes-and-articles/jseals-volume-4-2-2011
   *Not verified:* the second half of the citation, Diller/Edmondson/Luo (eds.), *The Tai-Kadai
   Languages* (Routledge 2008) **p. 590** — no accessible copy was reachable. Nothing contradicts it,
   but the row currently rests on Castro alone as far as this review can confirm.
5. **VERIFIED — mmd table is exactly right.** Lu Tianqiao's own published tone table (he is the
   author of *A Grammar of Maonan*) gives 调值 42 / 231 / 51 / 24 / 44 / 213, 阴入 55 (short) ~ 44
   (long), 阳入 23 (short) ~ 24 (long) — identical to `MMD`, including both length splits:
   https://web.archive.org/web/20150213001212/http://maonan.org/wenzi/shengdiao.asp
   *Not verified:* that these are Table 28, pp. 90–91 of the 2008 book, or the mapping on p. 93
   (the book is behind archive.org lending; en.wikipedia cites "8 tones (Lu 2008:90–91)" but prints
   no values). The numbers are right; the page reference is unchecked.
6. **NOTE — lic table: Norquest gives only four of the six values.** Norquest 2007 confirms
   Lauhut (= Baoding) A = 53, B = 55, C = 11, D = 55, i.e. tones 1/2/3/7, in example (16)
   ("Lhut 53 55 11 55") and again in (52) ("Lauhut 53 55 11 55"). He gives **no** value for tone 8
   or tone 9 anywhere for Lauhut — on the contrary he writes that "the tone indicated with 8 does
   not occur in Bouhin, Lauhut, or Moyfaw forms of native origin". So the docstring's "quoted …
   Norquest … tables 16 and 52" is inaccurate for `'8':'11','9':'53'`.
   Those two values are, however, independently correct: ABVD's own Notes field for list 772 states
   "Tones: 1 = /53/ 2 = /55/ 3 = /11/ 7 = /55/ 8 = /11/ 9 = /53/", and zh.wikipedia 黎语 (sourced to
   欧阳觉亚, 中国大百科全书) gives 保定村 as 第一調 53, 第二調 55, 第三調 11, 第七調 55ʔ, 第八調 11ʔ,
   第九調 53ʔ. No lic cell in the atlas uses tone 8 or 9 anyway.
   Norquest OCR text: https://repository.arizona.edu/server/api/core/bitstreams/5960db91-9579-4bac-8a5b-bc8ba4c66fe6/content
   (item: https://repository.arizona.edu/handle/10150/194203); zh.wikipedia: https://zh.wikipedia.org/wiki/黎语
7. **NOTE — provenance of all three tables.** Each table is *verbatim* the Notes field of the
   corresponding ABVD list (772, 736, 784), including the short/long ordering. The docstring and the
   coverageNotes present them as quoted out of three books. The numbers survive independent
   checking (findings 4–6), but the citation chain as written is not the one that was actually used,
   and for lic ABVD cites Ouyang & Zheng **1980** (黎语简志), not the 1983 survey named in kamsui.py
   and in the lic coverageNote.

## 3. The forms

All 131 raw forms occur verbatim in the cited ABVD lists — no typos, no invented forms. Six forms
are not the first-listed entry; ks_raw documents four of them. Defects:

8. **BLOCKER — lic `sun` = `hwan1` (`words/sun.js`).** Wrong-concept pick. ABVD item 168 "day"
   carries two entries with explicit annotations: `tsha1 hwan1` annotated **"sun"** and `hwan1`
   annotated **"day"**. The atlas prints the word the source labels 'day' in the SUN row. It should
   be `tsha1 hwan1` → `tsha˥˧ hwan˥˧` (both tone 1; `tsha1` is the row's own 'eye', item 45 — an
   eye-of-day compound exactly like Thai ตะวัน). This deviation is also undocumented in ks_raw's
   "except for these four" list. https://abvd.eva.mpg.de/austronesian/language.php?id=772 (item 168)
9. **BLOCKER — mmd `sun` = `van1` (`words/sun.js`), and the coverageNote sentence that defends it.**
   Same structure: ABVD item 168 gives `la:k8 van1` annotated **"sun"** and `van1` annotated
   **"day"**. The build deliberately overrode the source's own annotation. `la:k8` is the row's
   'child' (item 56, "la:k8 | son"), and Lu Tianqiao glosses `vaen` as 天/日 'day' — so `van1` alone
   is 'day', and 'sun' is the compound, which should print as `la:k8 van1` → `la:k˨˦ van˦˨`
   (tone 8 long → 24; tone 1 → 42). https://abvd.eva.mpg.de/austronesian/language.php?id=784 (items 56, 168);
   https://web.archive.org/web/20160812182852/http://maonan.org/wenzi/bayabian.asp ("vaen se nyauh yan" = 白天你们在家)
10. **NOTE — swi `sun` = `van1`.** The Sui list has no entry annotated 'sun'; item 168 has only
    `van1`, unannotated, and the same list's 'moon' shows the areal orb-compound pattern
    (`ʔdaaŋ1 njen2` beside simplex `njen2`). So swi 'sun' is a reasonable but unmarked guess that
    the day-word doubles as the sun-word; nothing in the source supports it, and the mmd/lic
    evidence (findings 8–9) suggests Kam-Sui/Hlai normally compound for 'sun'.
11. **NOTE — swi `earth` = `hum5` and lic `we` = `fa1` are undocumented deviations.** ks_raw's
    docstring says "First-listed ABVD form for each concept, except [four mmd cells]". In fact
    swi `earth` takes the second entry (first is `ti5 ti6`, a 地 loan — the better choice, but
    undocumented) and lic `we` takes the second entry `fa1` (first is `ga`). Six deviations, four documented.
12. **NOTE — swi/mmd `one` = `to2` / `tɔ2` (medium confidence).** `to2` looks like the general
    classifier rather than the numeral: the same Sui list uses it as such at item 97, "bird | to2 nok8".
    ABVD's second-listed Maonan form `dɛu2` is what Lu Tianqiao's own texts use for 'one'
    (orthographic `dreuz`, e.g. "vaen dreuz" 有一天, "ywaiz dreuz" 一会儿). Worth a second look
    before the ONE cells are treated as settled.
13. **NOTE — mmd `moon` = `ni4 njen2`.** Literally 'mother-moon': `ni4` is the same morpheme the
    row prints as 'mother'. ABVD offers no simplex for Maonan (the alternative is `njen2 ta:i6`), so
    there is nothing to fix, but the coverageNote should say so — as printed, the row shows the
    identical string `ni4` in two cells with no explanation, unlike the lic row, whose homophones
    are explained.

## 4. The four mmd judgement calls

14. **CORRECT — father `tɛ2` / mother `ni4`.** Verified directly from Maonan, not via Sui.
    Lu Tianqiao's initials page glosses `deez` (= tone-2 /tɛ/) as **父亲** 'father'; his tone page
    glosses `nix` (= tone-4 /ni/) as **妈** 'mother'; and his Baya-Bian text has `ya deez nix`
    glossed 两个父母 'the two parents' — father first, mother second, exactly the assignment used.
    https://web.archive.org/web/20150212223454/http://maonan.org/wenzi/shengmu.asp ("如 deez 父亲") ·
    https://web.archive.org/web/20150213001212/http://maonan.org/wenzi/shengdiao.asp ("nix 妈") ·
    https://web.archive.org/web/20160812182852/http://maonan.org/wenzi/bayabian.asp
15. **WRONG — sun `van1` not `la:k8 van1`.** See finding 9. The source annotates the compound as
    'sun' and the simplex as 'day'; the cross-check inverted it. The Sui form used to justify the
    call (`van1`) is itself the unannotated item-168 'day' entry, so it cannot settle anything.
16. **FIX — white `pok8` not `kwa3`.** The stated reason ("both matching Sui") matches Maonan's
    Chinese loan to Sui's Chinese loan: ABVD annotates Sui `paak8` "Chinese" **and** flags it `L`
    (loan), and annotates Maonan `pok8` "Chinese" (i.e. 白). `kwa3` is the first-listed Maonan form.
    The Maonan entry is internally inconsistent (the `L` flag sits on the `kwa3` row while the
    "Chinese" annotation sits on `pok8`), which is a reason to treat the cell as unsettled, not as
    settled by Sui. Recommend reverting to first-listed `kwa3` (→ `kwa˥˩`, tone 3 = 51) or dashing,
    and in either case dropping the "matching Sui" argument from the coverageNote. I could not find
    'white' in Lu Tianqiao's materials to arbitrate the two forms.
    https://abvd.eva.mpg.de/austronesian/language.php?id=784 (item 148) and ?id=736 (item 148)

## 5. coverageNote claims

17. **BLOCKER — "Its HEART slot is filled from the same entry as LIVER in these three lists" (all
    three rows).** False. There is no heart slot. The word "heart" does not occur anywhere in any of
    the three ABVD pages (0 hits in all three); the body-part run is 15 bone, 16 intestines,
    17 liver, 18 breast. The lists simply have no HEART item, and 'liver' is a separate item filled
    with a real liver word (lic `ŋa:n1`, swi `tap7`, mmd `tap7`). The dash is right; the stated
    reason is a fabrication and appears in three published rows.
18. **BLOCKER — "It gives a single first-person-plural form with no inclusive/exclusive label" (all
    three rows), and lic's "The ABVD 1PL is given as ga/fa1, but with no clusivity label".** False in
    all three lists. Item 185 in each gives two forms, each explicitly labelled:
    lic `ga` **inclusive** / `fa1` **exclusive**; swi `ȶən1 ⁿdaau1` **inclusive** / `ȶən1 ⁿdiu1`
    **exclusive**; mmd `ⁿda:u1` **inclusive** / `ⁿde1` **exclusive**. These are free pronouns, so
    under the WE row's own rule ("Where a language has both forms, both are printed, inclusive
    first" — `words/we.js` header) swi and mmd should be *filled*, not dashed, and all three
    languages count as clusivity-marking. The only genuine obstacle is lic's inclusive `ga`, which
    carries no tone digit and so cannot be given an IPA tone. Three rows are dashed and one of the
    map's typological colours is wrong on the strength of a claim the cited source contradicts.
19. **FIX — lic "This row is the Baoding (保定) lect of Baoting county".** Wrong county. 保定村 is in
    抱由镇, **乐东黎族自治县 (Ledong)**, and the lect is 哈(侾)方言, 罗活 (Lauhut) subdialect. The
    rest of the sentence is right: the 1957 《黎文方案》 took 乐东黎族自治县抱由镇保定村 as its
    standard pronunciation. The error is not cosmetic: "Baoting" (保亭/Baocheng) is the name of a
    *different* Hlai lect, in the Qi branch, in Norquest's own classification — the note names the
    wrong variety. https://zh.wikipedia.org/wiki/黎文 · https://zh.wikipedia.org/wiki/黎语 ·
    Norquest 2007 Table 1 ("Lauhut (Baoding)" under Ha; "Baoting (Baocheng)" under Qi)
20. **FIX — mmd "DRINK and EAT are printed with the same form na4, which cannot both be right, so
    drink is left unattested rather than guessed".** The premise is wrong. ABVD annotates *both*
    entries "to eat/drink" (item 37 `na4` "to eat/drink"; item 40 `na4` "to eat/drink") — Liang Min
    is deliberately reporting one verb for both, not making a slip. Lu Tianqiao's own example
    sentence uses it with a liquid: `man2 na4 kʰaːu3` "S/He drinks wine" (Lu 2008, quoted on
    en.wikipedia). Maonan does also have a narrower 'drink' verb — `cuet` glossed 喝 in Lu's tone
    table (tone 7, long → 44). So drink is sourceable either way; what is not defensible is the
    published sentence saying the data "cannot both be right".
    https://en.wikipedia.org/wiki/Maonan_language · https://web.archive.org/web/20150213001212/http://maonan.org/wenzi/shengdiao.asp
21. **NOTE — swi "TREE is given as mai52 … and is left unattested".** True of item 79
    ("stick/wood | mai52"), but the *same* Sui list supplies a category-numbered tree word at item
    113: "branch | pe5 mai4" with the annotation "mai4 = tree". That converts on exactly the same
    footing as the rest of the row (tone 4 = 51 → `mai˥˩`) and matches mmd `mai4`. The row can be
    filled without leaving the source.
22. **NOTE — lic "the rare tone 9 (53) rests on 欧阳觉亚's 中国大百科全书 article alone".** Not alone:
    ABVD's own Notes for list 772 give 9 = /53/ (from Ouyang & Zheng 1980), and Norquest's data show
    tone 9 as a live category in neighbouring lects. Also, no published lic cell uses tone 9 — the
    only tone-9 form in the list is a non-selected 'to drink' variant `o:k9` — so the sentence
    hedges a value the row never prints. Same paragraph: "whose tone numbers are those of Ouyang &
    Zheng (1983)" should be 1980 if it is describing ABVD's source (see finding 7).
23. **TRUE — swi "The English Wikipedia tone table for Sui disagrees with both and was not used."**
    Confirmed: en.wikipedia gives 1 = 13, 2 = 31, 3 = 33, 4 = 53, 5 = 35, 6 = 55 (6b 24),
    7 = 55/35 long, 8 = 42; zh.wikipedia 水語 gives the same with 8 = 53. Both differ from Wei &
    Edmondson's 1 = 11, 4 = 51, 6 = 24, 8 = 42/31. Worth knowing that en.wikipedia's Phonology
    section is tagged unreferenced ({{urs}}, Feb 2026), which strengthens the row's choice.
    https://en.wikipedia.org/wiki/Sui_language · https://zh.wikipedia.org/wiki/水語
24. **TRUE — "no word for cat, no verb 'to love' and no greeting or thanks formula".** Confirmed:
    zero occurrences of cat / love / thank in all three lists.
25. **TRUE — lic "dog and five are both pa1, and hand and the 2sg pronoun are both meɯ1".** Confirmed
    against ABVD items 96/201 and 1/183; Norquest reconstructs PHl *hma: behind both 'dog' and
    'five', so the merger is inherited, not a typo. (Norquest transcribes the Hlai reflexes with a
    long vowel, `pa:`; ABVD writes `pa1` — irrelevant to tone in Hlai, which has no length split.)
26. **TRUE — swi "the Sandong (三洞) lect of Sandu, the reference variety".** ABVD: data from a
    native speaker of Miaocao village (苗草村), Sandu county; Castro 2011:2 calls Sandong "the
    'standard dialect'".

## Summary

- BLOCKERS: 8 (lic sun = the 'day' word), 9 (mmd sun = the 'day' word), 17 (heart/liver claim is
  invented, ×3 rows), 18 (clusivity claim contradicted by the source, ×3 rows; swi and mmd WE cells
  are dashable no longer).
- FIXES: 16 (mmd white picks the annotated Chinese loan on a loan-matches-loan argument),
  19 (wrong county, and the name of a different lect), 20 (mmd drink dashed on a false premise).
- Tone arithmetic and the three tone tables themselves are sound; the defects are in form selection,
  in the citation chain, and in the prose claims about what ABVD contains.
