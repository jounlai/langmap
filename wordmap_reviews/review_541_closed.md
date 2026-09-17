# Review 541 — closed

**Rally round 3.** Three threads, 86 rows, **665 cells applied** — 325 Sinitic, 209 Germanic/Uralic,
131 Austronesian. The brief was to maximise findings per round; round 1 produced 3 rows, round 2
66 rows, round 3 **86 rows and 976 adjudicated cells**.

The instruction that did it was the same in all three prompts: **run the cheap structural tests
before opening a single source.** Byte-identity across rows, a cell identical to a different concept
in the same row, a script that does not belong, an IPA that contradicts its own surface, and — the
one that generalised best — **a feature the row applies to only some of the cells that qualify.**

## The three threads

### Sinitic — 31 rows, 336 findings, 325 applied

The lever was new and is worth stating plainly. Instead of judging tone-class consistency against
the 88-character hand table in `sinitic_tone_class_check.js`, the audit **looked every
single-character cell up in the MCPDict syllabary for that same dialect point** and read the tone
index off. That widens the witness set from 88 characters to whatever the row happens to contain
(~25 per row) and reaches 上聲 and 去聲, which the hand table does not.

Each syllabary had to be calibrated first, and the calibrations are findings in their own right:
the digits are **not** a uniform 1–8 etymological numbering. 南寧 uses Jyutping order; 中山 has six
classes with 上 and 去 unsplit; **忻州秀容 has four, with 上聲 merged into 陰平**; 婺源 has six and
**no 入聲**; 吉安 has no 入聲 at all.

**Four rows carry another row's tone layer** — the `cjy_lv` fingerprint from round 1, three more
times:

| row | is wearing | evidence |
|---|---|---|
| `cjy_xz` | Taiyuan (并州片) | 平 ˩˩ / 上 ˥˧ / 去 ˦˥ / 入 ˨, and Taiyuan's *class grouping* — 陰平+陽平 merged, 上聲 apart. 忻州秀容 does the exact opposite: 水 火 手 好 土 狗 五 耳 雨 all sit in tone 1 beside 三 心 星 風. |
| `czh_wy` | `czh` with the Chao letters find-and-replaced | 41 of 46 shared cells byte-identical in **segments**, only 9 in IPA. Independently: 婺源 keeps Middle Chinese **-m codas** (三 sum, 风 fɔm, 红 xɔm) and has lost 入聲 entirely — the row writes no -m and eight glottal stops. |
| `zh_zz` | `zh_kf` with nine cells re-toned into **Jinan's** 上 ˥˥ / 去 ˨˩ | 41 of 60 byte-identical to zh_kf. Zhengzhou and Kaifeng genuinely share 24/42/53/312, so the Kaifeng layer is the right one and the nine are the contamination. |
| `yue_zs` | Guangzhou | 33 of 57 byte-identical to `yue`; 中山 contradicts 你 ni, 女 ny, 四 si, 二 ŋi, 魚 ŋy, 鹽 im, 名 miaŋ. |

**The 耳朵 paste is fourteen rows, not thirteen** — `czh_wy` carries it too; with 耳仔 /ji tsɐi/ in
yue_nn and yue_zs that is sixteen. Twelve are fixed from a syllabary. 合肥 and 天津 gloss the second
syllable outright (朶 tɔ3 "耳~", 朶 tuo1 "耳~", the latter distinct from 花朵 tuo3), and 武漢 settles
that Wuhan's 耳 is **ɯ**, with no rhotic at all. Four stay unsourced: the 耳 syllable is sourced, the
compound is not.

**The same fingerprint in a concept nobody had re-read.** 九十九 writes 十 as **˧˥ in seven Mandarin
rows** (zh_cq zh_jn zh_kf zh_km zh_tj zh_wh zh_xa). ˧˥ is Beijing's 陽平; 十 is 陽入 → 陽平 in all
seven, so each should carry its own value and not one of them did.

Other classes: **codas the source dialect does not have** — 吉安 has lost 入聲 completely (一 i1,
骨 ku1, 血 ɕyɛ1, 屋 u1, 百 pa1) while `gan_ja` writes -t/-k on six cells, and 宜春 keeps it only as -ʔ
while `gan_yc` writes -t̚/-k̚ on eight. **Beijing values in non-Beijing rows** — 去聲 ˥˩ in zh_tj
(Tianjin is 53) and zh_sc (Chengdu is 213), 去聲 ˥˧ in zh_wh (Wuhan is 35). **`yue_nn` over-applies
its own showcase feature**: ɬ is the 心/生母 reflex only, and the row put it on 手 屎 水 树 食
(書/禪母 → ʃ in 南寧) while writing 三 with θ.

Two candidates were chased and **withdrawn**: wuu_wz 风 /hoŋ˧˧/ looked like a Min paste (identical
to nan_te) but 溫州 really is hoŋ1; and hak_tw 馬 /ma˨˦/ against 五/耳/雨 at ˧˩ is the regular Hakka
次濁上→陰平 shift.

### Germanic + Uralic — 27 rows, 213 findings, 209 applied

**Byte-identity, inverted, and the inversion is the whole result.** en_us, en_ca and en_ke differ
from `en` in *zero* surfaces, eight more English rows in exactly one — and that is not a defect,
because the 86 concepts contain no boot/trunk or petrol/gas pair. So these rows can only differ in
the IPA, and that is where they were audited.

**Rhoticity produced the biggest single class.** Philippine English is rhotic (OED World Englishes;
JIPA *Metro Manila English*, r in all positions, [ɝ] in NURSE). **`en_ph` is non-rhotic in 10 of its
16 r-relevant cells, every one byte-identical to `en`.** `en_wls` and `en_jam` carry the opposite
error, 2–3 rhotic cells in non-rhotic rows; `en_in` is rhotic in 14 and not in bird and father.

**`en` itself is inconsistent and every variety inherits it**: rhotic in bird/four/star/ear — ear
with the American ɚ — and non-rhotic in nine; American /oʊ/ in five GOAT cells against RP /əʊ/ in
one.

The recurring shape is **a defining feature applied to a minority of the cells that qualify**:
Canadian raising 1 of 4, cot–caught 5 of 8, South African PRICE backing 4 of 9 and GOOSE fronting
3 of 9, Nigerian STRUT 3 of 8, Malaysian devoicing 3 of 9 — and Southern PRICE monophthongisation
applied **exactly backwards**, monophthongal in *night* where the rule is blocked and diphthongal in
*five* and *wine* where it is strongest.

Individual findings worth naming:

- **`de_ch` wrote `weiß`.** Swiss Standard German has had no ß since the 1940s–70s; Zurich stopped
  teaching it on 1 January 1938 and it is not on the Swiss keyboard. Its `stone` was `Stei` —
  byte-identical to the Alemannic `gsw` row, a dialect form in a standard-variety row.
- **`de_at one` was `oans`**, byte-identical to `bar` (Bavarian). Same error, same shape.
- **`de_lu` is Luxembourgish in five cells.** Its *only* five surface differences from `de` — Äerd,
  fënnef, schlofen, Steen, Wand — are byte-identical to the `lb` row. The row is named
  "Luxembourg Standard German", so these are not variants, they are the wrong language.
- **`krl` and `olo` hold each other's forms.** `krl` is Karelian Proper and `olo` is Livvi; Livvi
  voices intervocalic stops and takes -u/-y finals. `krl` carried koiru/kodi/sada/maido/hebo/päivy
  (Livvi) while `olo` carried koira/koti (Karelian Proper). **Both sides were corrected**, which the
  audit did not propose: fixing one alone would have made the two rows agree on a form that is wrong
  for one of them.
- **`se` devoices initial b/d/g in 20 cells and left 4 voiced** (dákti, dolla, biegga, bátni);
  **`mns` marks vowel length in 16 cells and dropped the macron in 7** the Northern Mansi Swadesh
  list confirms are long. Both purely mechanical.
- **`lb eye` was an em dash** in both fields.
- **`nl_be` inverts the usual pattern.** e-ANS gives Belgian Dutch bilabial [β̞]/[w] against
  Netherlandic [ʋ]; nl_be has [w] in one cell and [ʋ] in six. Here the *minority* cell is the
  correct one — which is why "normalise to the row's majority" is a heuristic and not a rule.

Three negatives were chased and cleared, and they matter as much as the fixes: **Kven `đ` is
genuine** (western Kven retains Proto-Finnic /ð/ and writes it ⟨đ⟩, Söderholm) and not a Sami
intrusion; **Mansi пуӈк really is both head and tooth**, the only true internal duplicate in 27
rows; and **Southern `howdy` stands** — DARE documents it across a century, and DARE's own survey
shows "hey" has spread nationally and become *less* distinctively Southern, not more.

### Austronesian — 28 rows, 366 adjudicated, 131 applied

Byte-identity alone was noise here: 1,180 identical cell pairs against 60 neighbours, nearly all
real cognates (*mata*, *api*, *batu*) plus internationalisms. **Identity plus contradiction** paid,
and so did surface-versus-IPA.

- **Three internal duplicates that the lock file had already accepted, each contradicted by an
  independent source.** `mrq mother = red = kuʻa` — ABVD 38 (POLLEX+Dordillon) and 654 (Pawley) both
  give **kui**. `yap love = star = t'uf` — Jensen has star as **t'uuf**, and the row already gives
  the two identical surfaces *different IPA*, which is internal proof they were never entered as
  homophones. `mad egg = three = tello'` — ABVD 75 has egg **tellor**; the row lost the final -r.
  All three fixed and removed from `intra_row_dup.lock.json`.
- **A duplicate the checker cannot see**: `mad i` = `sengko'` U+0027 and `we` = `sengkoʼ` U+02BC. A
  homoglyph defeating `intra_row_dup_check.js`.
- **`pmt` is the worst row in the set.** Its `meta.script` declares a glottal-stop orthography and
  the row uses it in **0 of 55 cells**. `tree = "rait"` is not a word in any Polynesian language and
  is phonotactically impossible — no final consonants; ABVD 246 has **rākau**. `good = maiata` →
  maitaki. `water` surface *vai*, IPA */wai/*.
- **23 surface-versus-IPA contradictions across 17 rows** — fud `fa /faː/`, chk `it /iːt/`, tsg
  earth/fish/white with the glottal in the IPA only, mad `kajuh /kaju/`.
- **`woe` has two cells with the fields inverted**: `iimʷe` and `mʷoŋoo` carry Bender's phonemic
  notation (U+02B7, U+014B) in the *surface* while the IPA has the plain digraph.
- Cleared, so nobody re-opens them: **bbc/akb sharing 47 cells is genuine** — bbc differs from akb
  in exactly the cells where ABVD 188 differs from Angkola. `gil` and `mad` blue=green are real grue
  mergers. And several rows are **better than ABVD** — ilo `ngiwat`, jv `mripat`, mad `bengko`, bug
  `toli` — each giving the native word where the database's informant gave a loan.

## Held, and why

**Nothing here is a fix waiting to be typed in; each is a question the corpus cannot answer.**

- **`ban`'s register problem, 5 cells.** The row pairs alus *tiang* 'I' with andap *cai* 'you', and
  no speaker uses that combination. But the proposed repair was itself incoherent — *you* moved to
  alus while head/good/foot/eat moved to andap — and **Balinese *tendas* 'head' is used of animals
  and is insulting of a person**, so ABVD's informant giving it does not make it the everyday word.
  Needs one register decided for the row, then all cells cut to it.
- **`cia` dog/tooth/tongue** — ABVD 1520 and 1524 disagree with each other (ɗahu vs mantoa, ŋii vs
  ŋiʔi, lela vs ela). The five where they agree were applied.
- **`yrk drink` = `я`.** Fixing `earth` from Latin `ya` to Cyrillic `я` was certain and is done — and
  it exposed that **`drink` holds `я` too**, which is the word for *earth*. The drink cell is the
  intruder, and no Nenets source was to hand for the real verb. **Locked as a duplicate so the entry
  names the open question**; inventing the word would have been worse than leaving it.
- **`en_ng2` is coded `en_ng2`, named "Ghanaian English", and is 61 of 73 cells byte-identical to
  `en_ng`** with no `en_gh` anywhere in the atlas. Recoding a row changes its name, its description
  and its place in every inheritance pass — an owner call.
- **Three rows that do not earn their place**: `de_lu` (now exactly `de`), `en_ke` (zero lexical
  difference from `en`; its water, thanks, mother and rain were imported from en_jam and en_ng), and
  `es_uy` from review 539. Same shape as `pt_gw`, still waiting.
- `omy` (Old Malay) has an entry for **sushi**; the row is a closed corpus of 7th–14th-century
  inscriptions and most of its cells should be dashed with `unattestedReason`, as `ocm` already
  does. Row-identity work, not a cell fix.
- `rap tree → miro` and `mrq tree → tumu ʻakau` both rest on ABVD's *stick/wood* slot, which is not
  the same concept.

## Guard effect

- **`ipa_ascii_g_check.js`** (review 540) was corroborated from the other side: the Germanic thread
  independently flagged `en_ph dog /dɔg/`, which that guard had already fixed. Two of the three
  Germanic refusals were the applier's gate catching review 540's own edits — working as designed.
- **`sinitic_tone_outlier_check` 114 → 80** and **`chao_level_notation_check` 80 → 59**, ratcheted so
  the paid debt cannot silently regrow.
- **`sinitic_tone_class_check` lost 8 DEBT entries** — gan_yc/gan_ja 陰平, cjy_xz 陰平+陽平, zh_jh
  陽平, wuu_jh 陰平+陽平, wuu_jx 陰平 — all re-cut against 宜春, 吉安, 忻州秀容, 南京, 金華, 嘉興.
- **`sinitic_tone_present.lock.json`**: 14 toneless cells paid, 9 remain.
- **`sinitic_tone_system_share_check` gained its second ALLOW entry, `zh_kf|zh_zz`.** 鄭開片 is named
  after these two cities and they genuinely share 24/42/53/312. The rows part company where they
  should — 19 of 60 cells, in the segments (熊 ɕyəŋ vs ɕyŋ, 百 pɛ vs pai) and the word choice (爹 vs
  爸爸, 屋 vs 屋里). It only appeared because removing zh_zz's Jinan contamination made the
  inventories match.

## Two classes measured but not acted on

**`meta.script` truncation.** `pmt` and `woe` have script fields cut at exactly 70 characters,
mid-word. **27 rows repo-wide have a 70-character script field**, several ending mid-word (ayl, jya,
atb, sce). The longest in the repo is 263 characters, so no live cap explains it — it is a batch
import artefact. `meta_truncation_check.js` reports clean because it only checks bracket balance.

**Apostrophe character.** The rows are internally split: `ty` writes ʻokina U+02BB in eight cells
and ASCII U+0027 in one; `fud` is 4–4; `tsg` mixes U+A78C saltillo with ASCII; `yap` is ASCII with
one U+02BC. The outliers inside a clearly-decided row were fixed with the round; **choosing between
U+02BB, U+02BC, U+A78C and U+0027 for a row that has never decided is a house-convention call**, and
it is the same shape as the palochka question review 537 settled for Caucasian.
