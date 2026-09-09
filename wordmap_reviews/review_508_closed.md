# Rally 3 — Pass 1: English descriptions and structured metadata

Scope: the 19 China-nationality rows added 2026-09-05..08 — `kmc giq shx peh orh acn lic swi mmd jiu pmi twm dta mlm nuf clk blr rbb srh` in `/home/jounlai/langmap/wordmap_meta.js`.
Lens: `description.en` claims; the fields `family speakers countries official script iso6393 pronunciationType scriptTags`; census-year consistency; `sources` existence/accuracy/URL resolution.
Repo not modified. Checked against commit `ff65db7b`, 2026-09-09.

---

## BLOCKERS

**1. BLOCKER — `kmc` / `sources[2].url` — Glottolog code points at the wrong (and retired) languoid.**
The row cites `https://glottolog.org/resource/languoid/id/sout2748` as "Glottolog: Southern Dong". `sout2748` is not Southern Dong and is not in the current classification: it 301-redirects to `https://glottolog.org/files/glottolog-2.7/sout2748.html`, an archived Glottolog 2.7 page titled "Southwestern Kra [sout2748] superseded" — a **Kra** node, i.e. a different branch of Kra-Dai entirely (its live successor is `sout3143` Southwestern Kra).
Should be **`sout2741`** — Glottolog 5.3 "Southern Dong", ISO `kmc`, Tai-Kadai > Kam-Tai > Kam-Sui > Mulam-Kam > Kamic.
Verified: Glottolog 5.3 JSON for both IDs; and independently, ABVD's own record for the wordlist this row uses (`https://abvd.eva.mpg.de/austronesian/language.php?id=677`, "Dong, Southern") prints `Glottocode: sout2741`.

**2. BLOCKER — `giq` / `sources[0]` — wrong compiler credited; the cited work is not the source of the data.**
The row cites `"ABVD — Gelao (Wanzi), collected by Meng Chaoji"`. ABVD's record for Gelao (Wanzi) (list id 699) gives **`Source/Author: He Jiashan`**, and in full: "贺嘉善/He, Jiashan. 仡佬语简志/Gelao yu jian zhi (A Sketch of Gelao). Beijing: 民族出版社, 1983. … Typed By: Andrew C. Hsiu". Meng Chaoji appears nowhere in the record.
Should be: He Jiashan 贺嘉善 (1983) 仡佬语简志, 民族出版社, via ABVD list 699 (typed by A. C. Hsiu).
Verified: https://abvd.eva.mpg.de/austronesian/language.php?id=699 (raw page text).

**3. BLOCKER — `giq` / `description.en` — the doculect is Central Gelao, not Green Gelao (Hagei).**
The row states: "This row is Green Gelao (Hagei) as recorded at Wanzi near Anshun." ABVD's own note on the list this row uses says the opposite: **"This Central Gelao dialect is spoken in Wanzi village (弯子寨), Anshun (安顺), Guizhou, China. The speakers' autonym is klau55."** Hagei/Green Gelao is a different lect with a different autonym: ABVD's Gelao (Zhenfeng) record (list 695) gives "Community self-designation is ha42 ke42" — *that* is the ha-kei the label refers to.
The independent classification agrees: Wanzi is **Qau / Central Gelao**, ISO 639-3 `gqu` (active since 2012-02-03, CR 2011-054), Glottolog `qaua1234`. English Wikipedia, *Qau language*: "Qau, Central Gelao, or Sinicized Gelao is a Gelao language spoken in Guizhou, China … Wanzi (湾子) or Anshun Qau is one of two actively spoken Qau dialects." English Wikipedia, *Gelao languages*, places Wanzi under the Gao/Central branch: "Wanzi 弯子寨, Anshun 安顺, Guizhou"; Hagei is listed separately for Guanling / Qinglong / Zhenfeng.
The ISO code `giq` on the row is inherited from ABVD's own legacy tag (its `Identifiers:` block does say `ISO-639-3: giq`, `Glottocode: gree1278`), but ABVD's prose contradicts its own tag. Either the row's language identity or its doculect has to move; the description must not assert "Green Gelao (Hagei)" for the Wanzi list.
Verified: https://abvd.eva.mpg.de/austronesian/language.php?id=699 and ?id=695; https://en.wikipedia.org/wiki/Qau_language; https://en.wikipedia.org/wiki/Gelao_languages; https://iso639-3.sil.org/code/gqu; https://iso639-3.sil.org/code/giq

**4. BLOCKER — `giq` / `sources[2].url` — Glottolog code is a retired Bookkeeping entry, not a language.**
`https://glottolog.org/resource/languoid/id/gela1261` resolves (HTTP 200) but Glottolog 5.3 files it under **Bookkeeping** with **no tree position at all**, carrying the retired ISO code `gio` (retired by CR 2011-054, 2012-02-03). It is a placeholder for a dead code, not a languoid. Live successors under Tai-Kadai > Kadaic > Southwestern Kra > Western Kra > Gauic > Gelaoic are `qaua1234` (Central Gelao-Qau, `gqu`) and `aoua1234` (A'ou, `aou`); Green Gelao is `gree1278` (which ABVD itself cites).
Should be `gree1278` if the row stays `giq`, or `qaua1234` if finding 3 is resolved toward the doculect.
Verified: Glottolog 5.3 JSON for gela1261; https://iso639-3.sil.org/code/gqu (code-change history).

**5. BLOCKER — `rbb` / `description.en` — the Myanmar population figure is off by a factor of four and is attributed to the wrong group.**
The row says: "the same people, called Ta'ang or Palaung, number about **139,000** across the border in Shan State, Myanmar." The Palaung / Ta'ang of Myanmar number roughly **557,000–560,000**. English Wikipedia, *Palaung people*: "The Palaung have an estimated total population of 557,000 … It is believed that there are around 560,000 of them"; the 1931 Burma census figure of 140,000 is a historical figure, not a current one.
139,000 is the Ethnologue *speaker* count for **Rumai Palaung `[rbb]` in Myanmar specifically** — one of three Palaung languages (Ruching/Palé `pce`, Rumai `rbb`, Shwe `pll`) — not the population of "the same people, called Ta'ang or Palaung". As written the sentence equates a single-variety speaker count with a whole ethnicity.
Same defect propagates into `speakers: '~20K in China, ~139K in Myanmar'`: the "~20K" half is the whole **De'ang nationality** (all three varieties), not Rumai; the "~139K" half is Rumai speakers. The two halves count different things.
Verified: https://en.wikipedia.org/wiki/Palaung_people ; https://en.wikipedia.org/wiki/Palaung_language

---

## FIX

**6. FIX — `pmi` / `sources[0]` — source label still names the superseded doculect.**
`"Sun Hongkai (1991) 藏缅语语音和词汇 … — Northern Pumi (**Lanping**), via lexibank/suntb"`. The prior rally's Taoba correction landed in `description.en` ("Northern Pumi as recorded at Taoba in Muli, Sichuan") and in `coverageNote` ("The Pumi doculect is Sun's Taoba (桃巴) form, a village in Muli county, Sichuan"), but not in `sources`. The row now cites a Lanping doculect for Taoba data — and Lanping is *Southern* Pumi territory (`pmj`), so the citation as it stands contradicts the row's own ISO code.
Should be "Northern Pumi (Taoba)". `grep -c "Northern Pumi (Lanping)"` in `wordmap_meta.js` = 1, so this is the only leftover.
Verified: https://en.wikipedia.org/wiki/Pumi_language — "Taoba 桃巴 [Muli County]" listed under Northern; Southern Pumi is Lanping / Ludian / Ninglang.

**7. FIX — `nuf` and `clk` / `sources[0]` and `coverageNote` — Sun Hongkai's title is missing a character.**
Both rows write **藏缅语音和词汇**. The book is **藏缅语语音和词汇** (Zangmianyu *yuyin* he cihui), 中国社会科学出版社, 1991, ISBN 7500407971, 1420 pp. The atlas's other three suntb rows (`jiu`, `pmi`, `twm`) spell it correctly — 6 correct occurrences vs 4 wrong ones, all 4 on the `nuf` and `clk` lines.
Verified: https://book.douban.com/subject/6510771/ ; http://staff.iea.cssn.cn/content-BA0c30-20151231011659960587.htm

**8. FIX — `swi` / `sources[3]` — wrong article title.**
The row cites `"Castro, A. (2011) **Sui tone**. Journal of the Southeast Asian Linguistics Society 4.2, Table 1"`. JSEALS 4.2 (2011) contains exactly one Castro article and it is titled **"Southern Sui: a Fourth Sui Dialect", pp. 1–31**. There is no article called "Sui tone" in either JSEALS 4.1 or 4.2.
Volume, issue and author are right; only the title is invented. Should be: Castro, A. (2011) *Southern Sui: a fourth Sui dialect.* JSEALS 4.2:1–31.
Verified: https://sites.google.com/site/sealsjournal/jseals-volumes-and-articles/jseals-volume-4-2-2011 (full TOC) and .../jseals-volume-4-1-2011 (no Castro).

**9. FIX — `peh` / `sources[0]` — first author dropped.**
The row cites `"Liu Zhaoxiong 刘照雄 (1981) 保安语简志. 民族出版社"`. 《保安语简志》 has two authors, **布和 (Bu He) and 刘照雄 (Liu Zhaoxiong)**, and Bu He is the first-listed. ABVD's own Bao'an record (list 942) gives `Source/Author: Bu He and Liuzhaoxiong 布和, 刘照雄` and the note "布和, 刘照雄 (1981) 保安语简志. 北京". Secondary bibliographies of Liu Zhaoxiong give the year as **1982** rather than 1981 — worth resolving, but the missing co-author is the certain error.
Verified: https://abvd.eva.mpg.de/austronesian/language.php?id=942 ; 刘照雄 publication list via search (《保安语简志》(与布和合作)…1982年).

**10. FIX — `mlm` — `speakers` field and `description.en` give different speaker counts.**
`speakers: '~90K (Mulam nationality ~220K)'` vs description: "the language has on the order of **100,000** speakers". Internal contradiction; both cannot be the figure the row asserts. Ethnologue (18th ed., 2015) gives **86,000 (2005)**, which supports the `~90K` field and not the description's 100,000.
Should be: bring the description to ~90K, or cite whatever source gives 100,000.
Verified: https://en.wikipedia.org/wiki/Mulam_language

**11. FIX — `clk` / `speakers` and `description.en` — speaker split is unsupported and conflicts with the published figures.**
The row asserts `~1K in China, ~11K in India` and repeats it in prose ("by roughly 1,000 people … The great majority of Idu speakers, around 11,000, live across the border"). The standard figures are **11,000 = the 2001 total for the language**, with **8,569 in India (1981)** and **7,000 in China (1994)**. So the row treats the total as the India-only figure and substitutes an unsourced 1,000 for China.
The row is probably right to distrust 7,000 — it exceeds the entire Lhoba nationality (3,682 in 2010, 4,237 in 2020) — but that reasoning has to be *stated*, not silently replaced with a number no source gives.
Verified: https://en.wikipedia.org/wiki/Idu_Mishmi_language ; census figures per NBS tabulations (see §Census below).

**12. FIX — `clk` / `family` — "Mishmi" is not a genetic unit and is not the current branch name.**
`family: 'Sino-Tibetan (Mishmi)'`. "Mishmi" is an areal cover term spanning **Digarish** (Idu, Tawrã/Digaru) and **Midzuish** (Miju/Kman), which are not sisters. Glottolog 5.3 classifies `idum1241` Idu as **Sino-Tibetan > Digarish**; Wikipedia notes the taxonomy is contested three ways (Digarish; Greater Siangic; Blench 2024 treats Idu Mishmi as an isolate).
Should be `Sino-Tibetan (Digarish)`, or a string that says the placement is disputed — the row already uses that device for `nuf` ("Nungish / Loloish, branch debated").
Verified: Glottolog 5.3 `idum1241` classification; https://en.wikipedia.org/wiki/Idu_Mishmi_language

**13. FIX — `orh` / `description.en` — the Oroqen were horse-mounted hunters; reindeer herding is the Aoluguya Ewenki.**
The row says the Oroqen were "hunters of the forest, moving with the game and **with their reindeer**". The reindeer-using group of northeast China is the Ewenki 使鹿部, described by Chinese-language sources as **"the only reindeer-keeping group within the PRC"** (使鹿部…是中华人民共和国境内唯一饲养驯鹿的族群); the Oroqen by contrast "relied on horses for hunting". Wikipedia's *Oroqen people* does gloss the endonym as "people who keep reindeer", so the claim is not baseless, but stated flatly as the twentieth-century mode of life it is wrong and it is the single most-confused fact about this nationality.
Should be: horses, with the reindeer etymology (if kept) marked as an etymology and not a practice.
Verified: https://zh.wikipedia.org/wiki/使鹿部 ; https://factsanddetails.com/china/cat5/sub88/item160.html ; https://www.culturalsurvival.org/publications/cultural-survival-quarterly/reminiscences-about-reindeer-herders-china
(The rest of the sentence checks out: settled from the 1950s — "In 1958 the Oroqen were brought 'down from the mountains'" — and "In 1996, a final policy prohibited hunting and banned the possession of hunting guns.")

**14. FIX — `blr` — `countries` omits Pu'er, the prefecture the description's own headline claim sits in.**
`countries: 'China (Yunnan: Xishuangbanna, Lincang), Myanmar, Thailand'`, but `description.en` closes on "the ancient tea forests of **Jingmai Mountain**, which they and the Dai have tended for a thousand years … inscribed on the UNESCO World Heritage list in 2023". Jingmai Mountain is in **Lancang Lahu Autonomous County, Pu'er** — a third prefecture the field does not list. The UNESCO site name is literally "Cultural Landscape of Old Tea Forests of the Jingmai Mountain **in Pu'er**".
Blang do live in Pu'er (Lancang, Mojiang, Jinggu, Jingdong, Simao). Either add Pu'er to `countries` or the description makes a claim about a place the row says Blang are not.
(The 2023 inscription date, the Blang-and-Dai attribution and the thousand-year span are all correct.)
Verified: https://whc.unesco.org/en/list/1665 ; https://www.chinadaily.com.cn/a/202309/17/WS6507a872a310d2dce4bb6390.html ; https://en.wikipedia.org/wiki/Blang_people

---

## NOTE

**15. NOTE — `twm` / `sources[1]` — Glottolog code carries a different ISO code than the row.**
`dakp1242` is Glottolog "Dakpakha", ISO **`dka`**, not `twm`. `twm` (Tawang Monpa) maps to `tawa1289`, itself a Bookkeeping-only languoid with no classification. The row's `coverageNote` already argues the case for keeping `twm`, and separately says "Glottolog files this particular doculect under **Dzalakha (dzal1238)**" — which is a third code, not the one the `sources` entry links. The source label and the coverage note disagree about which Glottolog node the row is pointing at.
Verified: Glottolog 5.3 `dakp1242` (ISO dka, Bodic > Bodish > Dakpa-Dzala).

**16. NOTE — `acn` / `sources[1]` — languoid name is narrower than the label.**
`acha1249` is Glottolog "**Longchuan** Achang" (ISO `acn` matches), with Longchuan, Maingtha and Xiandao `[xia]` as its dialects — not "Achang" flat. Harmless if the row means the Longchuan lect (which the description's "Longchuan, Lianghe and Luxi" implies), but the label as printed overstates the node's scope.
Verified: Glottolog 5.3 `acha1249`.

**17. NOTE — `dta` / `sources[1]` — languoid name is "Dagur", not "Daur".**
Glottolog 5.3 names `daur1238` **Dagur**; "Daur" is only an alternative name. ISO `dta` matches. Cosmetic.

**18. NOTE — `srh` / `description.en` — "the only country where it is spoken" is stated with more confidence than the evidence supports.**
Glottolog `sari1246` does list Countries as "China [CN]" only, so the claim has backing. But English Wikipedia's *Sarikoli language* places speakers in "the Tashkurgan Tajik Autonomous County in Southern Xinjiang, China, **and the Upper Chitral District of Pakistan**", and Omniglot repeats a "small community of Sarikoli speakers in Pakistan near the Chinese border". A flat "the only country" claims a settled fact where sources differ; "essentially all speakers are in China" would be safe.
The rest of the row checks out: ~30,000 Sarikoli and ~10,000 Wakhi within a Tajik nationality of ~51,000 is exactly what the sources give ("Approximately 30,000 Tajik people use the Sarikoli language, while about 10,000 use the Wakhi language"); "Tashkurgan" = Turkic 'stone fortress' is correct; the Shughni/Rushani sisterhood matches Glottolog (Shughni-Yazgulami > Shughnic).
Verified: https://glottolog.org/resource/languoid/id/sari1246 ; https://en.wikipedia.org/wiki/Sarikoli_language ; https://en.wikipedia.org/wiki/Tajiks_in_China

**19. NOTE — `pmi` / `description.en` — the 54,000 figure is Northern Pumi only, and the sentence reads as if it were all Pumi.**
"the nationality figure — about 43,000 in the 2010 census — undercounts the community: roughly 54,000 people speak the language." 54,000 is the **Northern Pumi (`pmi`)** count alone; Wikipedia gives Northern 55,000 and Southern (`pmj`) 22,000 (1999), i.e. ~77,000 Prinmi speakers in total. The argument survives — indeed it gets stronger — but as written a `pmi`-only number is presented as the count for "the language".
Verified: https://en.wikipedia.org/wiki/Pumi_language

**20. NOTE — `blr` / `description.en` — "Its closest relative is Samtao" is contestable.**
English Wikipedia's *Blang language* says "Samtao of Myanmar is a **dialect of** Blang language", which makes Samtao a variety rather than a sister. Glottolog puts Blang under Waic > **Bulangic**, the node that would hold both. Not clearly wrong, but "closest relative" implies a separate language where the main reference says variety.
Verified: https://en.wikipedia.org/wiki/Blang_language ; Glottolog 5.3 `blan1242`.

**21. NOTE — `shx` / `description.en` — "usually put on its own branch" is contradicted by Glottolog.**
Glottolog 5.3 classifies `shee1238` She as Hmong-Mien > Hmongic > Nuclear Hmongic-Ho Ne > **Jiongnai-Ho Ne** > Ho Neic — i.e. inside Hmongic, paired with Jiongnai, not on its own branch. Ratliff (2010), which the row cites, does treat Ho Ne as a separate branch of Hmongic, so "usually" is doing heavy lifting for a position that is one of two.
Verified: Glottolog 5.3 `shee1238`.

**22. NOTE — `mlm` / `countries` — "Yishan" is a defunct administrative name.**
`'China (Guangxi: Luocheng, Yishan; Guizhou)'`. Yishan County 宜山县 became Yizhou City in 1993 and is now **Yizhou District of Hechi**. Wikipedia's *Mulam language* uses "Luocheng County, Hechi" and lists Yizhou among the outlying areas.
Verified: https://en.wikipedia.org/wiki/Mulam_language

**23. NOTE — `swi` / `sources[1]` — the dictionary has a third, first-listed author.**
The row cites "Wei Xuecun & Edmondson, J.A. (2003)". The published volume is catalogued as *Sui (Chui) Chinese-Thai-English Dictionary*, **Somsonge Burusphat**, Wei Xuecun, Jerold A. Edmondson (ISBN 9789749574546, Mahidol University, 395 pp.). ABVD itself cites it the row's way, so this is inherited rather than invented — but the book's own title page carries three names.
Verified: https://www.abebooks.com/9789749574546/Chui-Chinese-Thai-English-Dictionary-Somsonge-Burusphat-9749574540/plp

**24. NOTE — `orh` / `sources[0]` and `rbb` / `sources[0]` — incomplete citations (no journal, volume or year).**
- `orh`: "Johansson, N. et al. (2020) The typology of sound symbolism — cross-linguistic wordlist, via Lexibank". Full reference: Johansson, N. E., Anikin, A., Carling, G. & Holmer, A. (2020) *The typology of sound symbolism: Defining macro-concepts via their semantic and phonetic features.* **Linguistic Typology 24(2):253–310**, doi 10.1515/lingty-2020-2034. Title is truncated at the colon and the journal is missing.
- `rbb`: "Deepadung, S. et al. — Palaung dialect survey, doculect Nan Sang (Ruili, Dehong), via lexibank/deepadungpalaung" — **no year at all**, which is the one field every other source entry in this batch carries. Full reference: Deepadung, S., Buakaw, S. & Rattanapitak, A. (2015) *A lexical comparison of the Palaung dialects spoken in China, Myanmar, and Thailand.* **Mon-Khmer Studies 44:19–38**, doi 10.15144/MKSJ-44.19.
Verified: https://www.degruyterbrill.com/document/doi/10.1515/lingty-2020-2034/html ; https://ezid.cdlib.org/id/doi:10.15144/MKSJ-44.19 ; http://www.sealang.net/mks/

**25. NOTE — `kmc` and `swi` — `scriptTags` does not carry the scripts the `script` field names.**
`kmc`: `script: 'Latin (1958 Dong orthography) / Han characters'` but `scriptTags: ['Latin']`. `swi`: `script: 'Unwritten in daily use (水书 shuishu for divination texts)'` but `scriptTags: ['Latin']`. All 19 rows carry `['Latin']` regardless of what `script` says, so this is a batch convention rather than a per-row slip — but on these two the field and the prose disagree on the face of it.

**26. NOTE — `giq` / `coverageNote` vs the source — "this 210-item list" is not 210 items.**
ABVD's Gelao (Wanzi) record reports `Total Data: 179`. (Flagged here only because it is a claim about the source; the coverage-note pass owns the follow-through.)
Verified: https://abvd.eva.mpg.de/austronesian/language.php?id=699

---

## Census-year consistency (item 3) — GROUP FINDING

**27. FIX (group) — the set silently mixes the 2010 and 2020 censuses, and three rows cite neither.**

Official figures from the NBS Sixth (2010) and Seventh (2020) national census tabulations, cross-checked against en.wikipedia *List of ethnic groups in China*, zh.wikipedia 中国民族列表 and 中华人民共和国第七次全国人口普查:

| code | nationality figure in the row | 2010 | 2020 | matches |
|---|---|---|---|---|
| `kmc` | Dong ~2.9M | 2,879,974 | 3,495,993 | **2010** |
| `giq` | Gelao ~550K | 550,746 | 677,521 | **2010** |
| `shx` | She ~710K | 708,651 | 746,385 | **2010** |
| `peh` | Bonan ~20K | 20,074 | 24,434 | **2010** |
| `orh` | Oroqen ~9K | 8,659 | 9,168 | **ambiguous** (both round to ~9K; leans 2020) |
| `acn` | Achang ~40K | 39,555 | 43,775 | **2010** |
| `lic` | Li ~1.6M | 1,463,064 | 1,602,104 | **2020** |
| `swi` | Sui ~496K | 411,847 | 495,928 | **2020** |
| `mmd` | Maonan ~124K | 101,192 | 124,092 | **2020** |
| `jiu` | — none — | 23,143 | 26,025 | **NEITHER** |
| `pmi` | Pumi ~43K, "in the 2010 census" | 42,861 | 45,012 | **2010, and the only row that names its year** |
| `twm` | Monpa ~11,000 | 10,561 | 11,143 | **2020** |
| `dta` | Daur ~132,000 | 131,992 | 132,299 | **2010** (exact); indistinguishable at this precision |
| `mlm` | Mulam ~220K | 216,257 | 277,233 | **2010** |
| `nuf` | Nu ~37K | 37,523 | 36,575 | **2010** |
| `blr` | Blang ~120K | 119,639 | 127,345 | **2010** |
| `rbb` | De'ang ~20K | 20,556 | 22,354 | **2010** |
| `clk` | — none (Lhoba unquantified) — | 3,682 | 4,237 | **NEITHER** |
| `srh` | — none (Tajik nationality unquantified) — | 51,069 | 50,896 | **NEITHER** |

Tally: **11 rows on 2010, 4 rows on 2020 (`lic`, `swi`, `mmd`, `twm`), 3 rows citing no census figure (`jiu`, `clk`, `srh`), 1 ambiguous (`orh`), 1 indistinguishable (`dta`)**. Exactly one row (`pmi`) tells the reader which census it is quoting.

Two consequences worth naming:
- A reader comparing `mmd` (2020: 124K) against `mlm` (2010: 220K) is comparing across a decade in which Mulam grew 28.2% and Maonan 22.6%. The two Kam-Sui rows sit side by side in the same batch and are ten years apart.
- The three unquantified rows are the three where the nationality figure would have been most informative: `clk` because the Lhoba nationality (3,682 / 4,237) is smaller than the Idu speaker figures in circulation (see finding 11), `srh` because the description's arithmetic (30,000 Sarikoli + 10,000 Wakhi) only makes sense against the ~51,000 Tajik nationality it never states, and `jiu` because "the most recently recognised of China's fifty-six nationalities" invites the number.

Recommendation: pick one census year for the whole batch and name it in every description, as `pmi` already does.

Sources: NBS 《中国2010年人口普查资料》 table 2-1, https://www.stats.gov.cn/sj/pcsj/rkpc/6rp/html/A0201.htm ; NBS 《中国人口普查年鉴-2020》 chapter 2 table 2-1, index at https://www.stats.gov.cn/sj/pcsj/rkpc/7rp/indexch.htm (chapter-2 tables are served as scanned JPEGs, so every secondary source re-keys them) ; https://en.wikipedia.org/wiki/List_of_ethnic_groups_in_China ; https://zh.wikipedia.org/wiki/中华人民共和国第七次全国人口普查
Caveat carried from the census check: the 2020 Mulam figure (277,233) is misreported as 216,257 by at least one popular secondary list; it back-solves correctly from Guangxi's own bureau figure of 180,200 = 64.99% of the national total (http://tjj.gxzf.gov.cn/tjsj/yjbg/qq_267/t19179120.shtml). Nu and Tajik are the only two nationalities in this set that *declined* between the censuses; both declines are real.

---

## Prior-rally fixes: verified as landed

- **Pumi doculect** — Taoba, not Lanping: landed in `description.en` and `coverageNote`; **NOT** landed in `sources` (finding 6).
- **Monpa speaker count** — `twm` now says "about 11,000", which is the 2020 figure (11,143) exactly; correct, and it is one of the four rows that moved the batch onto a second census year (finding 27).
- **Blang speaker count and Laos** — `speakers: '~68K (Blang nationality ~120K)'` matches Wikipedia's Ethnologue-derived 68,000 (1994–2000); `countries` gives China / Myanmar / Thailand, which is exactly Glottolog `blan1242`'s country list (CN, MM, TH) with Laos correctly absent. Landed clean.
- **Sarikoli / Wakhi relationship** — `srh` now states Wakhi "belongs to a different branch of Eastern Iranian and is not mutually intelligible with Sarikoli", and puts Sarikoli's closest relatives as Shughni and Rushani. Matches Glottolog's Shughni-Yazgulami > Shughnic placement. Landed clean.
- **De'ang drum tower** — `rbb` now says "a De'ang village is built around its Buddhist temple, the **zangfang**", not a drum tower. Landed clean. (The drum tower belongs to `kmc` Dong, where it correctly appears.)

---

## Rows clean on this pass

- **`shx`** — clean apart from finding 21 (branch phrasing). She 708,651 (2010) ✓; ~1,000 speakers ✓; She Chinese ≈ Hakka ✓; Boluo / Huidong / Haifeng, Guangdong ✓; Ratliff (2010) *Hmong-Mien Language History*, Pacific Linguistics 613 ✓; Glottolog `shee1238` = She / `shx` ✓.
- **`lic`** — clean. Hlai ~750,000 = Norquest (2007) ✓; Li 1,602,104 (2020) ✓; 1957 Latin orthography on the Ha/Baoding variety ✓; ABVD list 772 resolves to "Hlai (Baoding)", ISO `lic`, source 欧阳觉亚·郑贻青 黎语简志 1980, tones 1=53 2=55 3=11 7=55 8=11 9=53 — matching the row's tone table character for character ✓.
- **`mmd`** — clean. Maonan 124,092 (2020) ✓; ~30,000 speakers (Ethnologue 2005) ✓; Huanjiang Maonan Autonomous County, Guangxi + Guizhou ✓; **Chadong is the closest relative** ✓ ("it is most closely related to the Maonan language"); 梁敏 毛难语简志 1980 ✓; Lu Tian Qiao (2008) *A Grammar of Maonan*, Universal-Publishers ✓; Fenlong festival and nuo ritual opera ✓; ABVD list 784 resolves correctly with the row's exact tone table ✓.
- **`swi`** — clean apart from findings 8, 23, 25. Sui 495,928 (2020) ✓; ~300,000 speakers (Ethnologue 2023) ✓; ~70 initials in the Sandong dialect ✓; Sandu / Libo / Dushan ✓; shuishu "at least 500 characters", divinatory not everyday ✓; ABVD list 736 resolves to Sui (Miaocao, Sandu), Wei Xuecun a native speaker, with the row's exact tone table including the 7/8 length split ✓.
- **`mlm`** — clean apart from findings 10 and 22. ABVD list 761 = "Mulam (Dongmen)", 王均·郑国乔 仫佬语简志 1980, tones 1=42 2=121 3=53 4=24 5=44 6=11, 7S=55 7L=42, 8S=12 8L=11 — matching the row exactly ✓; Glottolog `mula1253` = Mulam / `mlm`, and its **Mulam-Kam** node independently supports the row's "nearest to Kam itself" ✓.
- **`kmc`** — clean apart from findings 1 and 25. ABVD list 677 = "Dong, Southern", **Rongjiang-Zhanglu dialect**, Long Yaohong & Zheng Guoqiao, *The Dong Language in Guizhou Province, China*, SIL/UT Arlington 1998, ISBN 1556710518 — author, year, title and publisher all exactly as cited ✓. Nine tones on open syllables, six on checked ✓. The full orthography tone-letter list is right, letter for letter, against Wikipedia's *Kam language*: -l 55, -p 35, -c 11, **-s 24**, -t 13, -x 31, -v 53, -k 453, -h 33 ✓. Zhanglu village, Rongjiang, is in the First lectal area of **Southern** Kam ✓. ~1.5M Southern Dong speakers ✓ ("Almost 1.5 million speakers of Southern Dong were counted in the 1990 language census"). Grand Song UNESCO 2009 ✓; drum towers and wind-and-rain bridges ✓.
- **`peh`** — clean apart from finding 9. Bonan 20,074 (2010) ✓; ~6,000 speakers ✓; Jishishan (Gansu) and Tongren (Qinghai) ✓; Gansu Muslim / Qinghai Buddhist split, nineteenth-century separation ✓; Amdo / Gansu-Qinghai Sprachbund with Santa, Monguor, Eastern Yugur ✓; Glottolog `bona1250` = Bonan / `peh`, Shirongol > Baoanic, matching `family: 'Mongolic (Shirongolic)'` ✓.
- **`acn`** — clean apart from finding 16. Achang 39,555 (2010) ✓; Longchuan (Husa), Lianghe, Luxi in Dehong ✓ (the row omits Longling in Baoshan, which is a fourth county but not an error); Maingtha / Ngochang in Myanmar ✓; Husa knife from Husa township, Longchuan ✓; Burmish placement ✓; Sagart et al. (2019) PNAS **116**:10317–10322, issue 21, doi 10.1073/pnas.1817972116 ✓.
- **`jiu`** — clean apart from the missing census figure (finding 27). Jino recognised **1979** as the last of the 56 ✓; Youle and Buyuan not mutually intelligible and separately coded (`jiu` / `jiy`) ✓; Jinuo Mountain, Jinghong, Xishuangbanna ✓; zhuoba 卓巴 village elder ✓; Youle Mountain one of the six ancient tea mountains ✓; Glottolog `youl1235` = Youle Jinuo / `jiu`, Loloish > Hani-Jino > Jino ✓.
- **`dta`** — clean apart from finding 17. 1763 Solon Battalion transfer to Ili, descendants in Tacheng ✓ (Wikipedia's *Daur language* names the "Sinkiang Dagur" dialect "in the vicinity of Tacheng city"); nationality 131,992 (2010) ✓; ~96,000 speakers (Wikipedia gives ~91,000 for 1999 — same order, not a conflict worth a fix); Khitan connection debated ✓; script field's "Manchu script historically; Cyrillic and Latin schemes" is supported — Wikipedia's writing-system field reads "Latin script, Mongol script, **Cyrillic script**, Manchu script (historically)" ✓; Robbeets et al. (2021) *Nature* **599**:616–621, doi 10.1038/s41586-021-04108-8 ✓; Daur non-tonal ✓.
- **`nuf`** — clean apart from finding 7. Nu 37,523 (2010) ✓; ~9,000 Nusu speakers ✓; **Bijiang county dissolved 1986 and split between Fugong and Lushui** ✓; the four mutually unintelligible languages of the Nu nationality (Nusu, Anong, Zauzou, a Derung-like variety) ✓; Glottolog `nusu1239` = Nusu / `nuf`, Loloish > Nusoish — consistent with the row's "branch debated" hedge ✓.
- **`twm`** — clean apart from findings 15 and 27. Motuo Monpa speak Tshangla, Cuona Monpa is East Bodish, the two not mutually intelligible ✓; Dakpa is the Indian-side name in Tawang ✓; East Bodish related to but not descended from Tibetan ✓.
- **`rbb`** — apart from finding 5 and 24: De'ang 20,556 (2010) ✓; Dehong and Lincang ✓; three varieties Rumai / Bulei(Ruching) / Raojin not readily mutually intelligible ✓; **renamed from Benglong 崩龙 at their own request in 1985** ✓; zangfang temple ✓; Glottolog `ruma1248` = Rumai Palaung / `rbb`, Palaungic > West Palaungic ✓.
- **`blr`** — apart from findings 14 and 20: Blang 119,639 (2010) ✓; ~68,000 speakers ✓; Menghai the largest concentration (30,678, 33% of all Blang in China) ✓; autonym Plang ✓; Waic alongside Wa, Parauk, Eastern Lawa ✓; Glottolog `blan1242`, Waic > Bulangic, countries CN/MM/TH ✓; Peiros, I. (2004) *Genetic classification of Austroasiatic languages*, doctoral dissertation, Russian State University for the Humanities, Moscow — the work exists and is the basis of lexibank/peirosaustroasiatic (Zenodo record 13168443) ✓.
- **`srh`** — apart from finding 18: all figures, the Tashkurgan etymology, the Tajik-of-Tajikistan contrast and the Shughni/Rushani sisterhood check out; Heggarty et al. (2023) *Science* **381**, IE-CoR, doi 10.1126/science.abg0818 ✓; https://iecor.clld.org/ resolves to the IE-CoR home page ✓.

## URLs: resolution check

All source URLs in the 19 rows were fetched. Every one returns HTTP 200 **except** `kmc`'s `sout2748`, which 301-redirects out of the live classification into the Glottolog 2.7 archive (finding 1). `https://abvd.eva.mpg.de/` , `https://abvd.eva.mpg.de/austronesian/` and `https://iecor.clld.org/` all resolve to the right databases. Of the 16 Glottolog codes in the batch, 11 match both expected name and ISO code; the five that do not are findings 1, 4, 15, 16 and 17.
