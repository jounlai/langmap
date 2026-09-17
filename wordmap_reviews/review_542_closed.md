# Review 542 — closed

**Rally round 4.** Three threads, 88 rows, **502 cells applied** — Niger-Congo 31 rows,
Indo-Iranian 26, Afro-Asiatic/Austroasiatic/Turkic/Nilo-Saharan/isolates 31. 1,236 cells
adjudicated. Round 3's brief was repeated with one addition, and the addition was the whole
story: **"a feature the row applies to only SOME of the cells that qualify."** It needs no
source — the row is its own witness — and it produced 230 of the 502.

**Zero drift across 1,236 recorded prior values.** Every thread was told to copy `current` as
`surface /ipa/` byte-exact, and the applier refuses anything that has moved since. The single
refusal was `teo house`, which had changed *because another pass in this same session had already
fixed it the same way*.

## Half-applied features, the biggest class

| row | feature | applied / eligible |
|---|---|---|
| `ve` | the Venda dental series ṱ ḓ ṋ ḽ | dental in 7 cells, retroflex ɖ ɳ ɭ in 11 |
| `ki` | ĩ/ũ | **four** different IPA values across 14 cells (ɪ, i, e, o) |
| `ssw` / `nbl` | the Nguni implosive ɓ | 6 of 10, 4 of 8 |
| `bm` / `dyu` | final ⟨n⟩ | three values — ɲ ×3, nasalisation ×2, n ×4; ɲ is simply impossible |
| `kxm` | the Khmer palatal affricate | **five** ways: c, cʰ, tʃ, tʃʰ, tɕ |
| `tt` | Cyrillic ы | **four** vowels, two of them inside кызыл alone |
| `ckb` | the phonemic ر/ڕ tap–trill contrast | honoured in 13, neutralised in 10 |
| `pms` | ⟨o⟩ = [u], the rule that defines Piedmontese orthography | 11 applied, 2 ignored |
| `sga` | initial palatalisation | 8 of 13 — the killer pair is `cét /kʲeːd/` beside `dét /deːd/` |
| `as` | the Assamese /x/ rule | dropped in exactly 2 of 7 sibilant cells |
| `txb` | the akṣara 𑀘 | `tɕ` in 2 cells, `ts` in 4 — byte-provable from the surface |
| `sd` | the letter ڇ | three ways in one row: tʃʰ, cʰ, ɟː |

**One pattern crossed five rows at once**: `ve`, `ssw`, `nbl`, `nso` and `kg` all mark the
infinitive on *eat* and *drink* and not on *sleep*. Each row was made consistent with its own
practice, which is not the same edit five times — `ssw` writes it solid (kulala), `nso` and `ve`
with a space (go robala, u eḓela), and `kg` had to lose a join (kuleka → ku leka).

`h_vedic` runs **two incompatible accent conventions at once** — the acute for Vedic pitch in 6
cells and ˈ for stress in 7.

## Rows that are partly another language

- **`xpu` (Punic) is 38 of 44 identical to `phn`** with none of Punic's documented guttural loss.
- **`kxm` (Northern Khmer) is 43 of 50 identical to `km`** — in Khmer script, for a language
  written in Thai script — and where its IPA does differ it differs by being wrong.
- **`zdj` and `swb` (Comorian) carry Swahili**: mti, jicho, nyota, moto. ASJP gives the Comorian
  stems for both doculects (-ri, -tso, -yora, -oro), and `swb` additionally had *asante* and
  *Habari* where the `zdj` row next to it already had the Shimaore forms.
- **`xog` (Soga) has five cells byte-identical to Luganda** — sun, name, eye, you, water — with a
  different Soga form in ASJP each time.
- **`men` (Mende) `father` was `nya`, its own first-person pronoun**, which is why
  `men|father|i` sat in the duplicate lock. The lock rested on a defect.
- **`prk` (Parauk Wa) had `miː` in fire AND house, `miːn` in eye, `miːk` in hand** — a template,
  not a transcription. Eleven ASJP Wa doculects and the atlas's own `wbm` row agree on ŋu, ɲiɛʔ,
  ŋai, tai. The row also had the *sun* word sitting in its *star* cell.
- **`kdt` (Kuy) `fire` was `fəj`** — Thai ไฟ standing in for Kuy *ʔuh*.

## Duplicates the checker structurally cannot see

Round 3 found three of these; round 4 found six more, and each is invisible for the same reason —
**the two cells differ by one character that is not a letter difference.**

- `ps` **blue شین and green شين are the same word spelled with two different yehs** (U+06CC vs
  U+064A), identical IPA. Pashto *šin* really does span grue, so the spelling was unified and the
  pair locked.
- `kg` good/hello `mbote`/`mboté` and `bum` four/red `nyin`/`nyín` — identical IPA, one accent
  apart.
- `haz` مه is both 'I' and 'moon', with different IPA and no note.
- `niv` good `пах` beside stone `паӽ`, and `hts` eye `ʼaha` beside tooth `aha` — ASJP refutes the
  copy and confirms the original in both.

## Three negatives, recorded so nobody re-opens them

- **`niv ear` = нос is CORRECT** on three doculects, despite looking exactly like Russian "nose".
- **`sah` vowel length is clean, 19 of 19** — the one Turkic row that is.
- **No Austroasiatic row carries a tone letter**, so the category error the brief warned about for
  register languages is absent, and correctly so.

## Two classes that came out of the guards themselves

**`ipa_ascii_g_check.js` had a hole, and the cell that started the whole investigation fell
through it.** Review 540 built that guard from `es_cr cat` = `["gato", "gato"]` — and `/gato/`
carries no IPA-only letter, so the guard's own first rule left it alone. The Niger-Congo thread
pointed this out from `lg black /ddugavu/` and `tum earth /dongo/`. A second rule now catches it:
**a field byte-identical to its own surface was never transcribed, it was copied**, and in a row
that writes ɡ U+0261 elsewhere the row is its own witness. 29 more cells across 26 rows, `es_cr`
among them at last.

**Voiced aspirates: one cell copied into sixteen rows.** The Indo-Iranian thread reported
`tongue /dʒiːbʰ/` with plain ʰ in five rows that use ʱ everywhere else. The census found
**sixteen** — hi, pa, mr, mag, hif, bho, awa, thr, bra, mwr, bgc, doi, xnr, hne, kfx, hns — plus
mad ×3, new, pi, pi_edu and hns *thanks*. 23 cells fixed, gated on the row using ʱ somewhere, so
`p_ine` (where ʰ is the reconstruction convention) and the rows with no ʱ at all were left alone.

## One correction to an auditor

`srb` writes the glottal stop as ʔ U+0294 in heart and house and ʼ elsewhere, and the thread
proposed moving the others to ʔ. **Backwards.** `heart` is `["suʔun","suʔun"]` and `house` is
`["suʔuŋ","suʔuŋ"]` — surface byte-identical to IPA, which is the same "never transcribed, just
copied" signature as the ASCII-g class above. The ʔ is IPA that leaked into the surface field, so
the majority ʼ is the row's own practice and heart and house were repaired to match it.

## Held

- **Tone, as a policy rather than a fact.** 13 Niger-Congo rows mark tone on 1–8 cells out of
  38–63, and six of those disagree between surface and IPA; seven rows have a single orphan tone
  mark. `fon` is the reverse — 19 of 53 surfaces marked, in a language whose orthography marks
  tone throughout. Same shape in `fia` (23 of 41), `tca` (27 of 36) and `fvr`, whose IPA carries
  nine tones the orthography does not.
- **±ATR in the Nilotic rows** — ach 4 front and 0 of 12 back, teo 2 of 14, kln 1 of 9.
- **The dental diacritic**, the biggest single class by volume in Indo-Aryan (~90 cells): every
  row marks it in a minority of eligible cells, *including the well-sourced hi, bn and pa rows*.
  That makes it an atlas-wide convention question, not a per-row defect.
- **`gbm`/`kfy` are 32 cells byte-identical in surface AND IPA** (73%). Settling it needs
  Grierson's LSI IX.iv, which the thread could not open.
- **`bin mother` is empty** and Wikivoyage gives *iye*. An empty cell is a correct answer and
  filling one deserves better than a tourist phrasebook; held for Melzian's Bini dictionary.
- `xpu` and `kxm` as rows, `hoc`/`unr`, the Comorian u- infinitive, hyphenated Bantu stems in
  seven rows, `ne` and `or` register (tatsama against the everyday word), `yai` dialect mixing.

## Not sourceable, and that is the answer

165 cells in the third thread's block alone. `xht` is 30 of 34 dashed with no `unattestedReason`
anywhere; `egy` keeps 52 (TLA and Faulkner unreachable); **`kln` keeps 34 because ASJP has no
Kalenjin doculect and the row does not say which of six varieties it holds** — that last one is a
metadata defect, not a lexical gap. Nothing was reconstructed into a cell.

## Metadata, outside the cell schema

`iso6393` is absent from prk, kdt, slr and srb; `surfaceType`/`pronunciationType` from ten rows
including `egy`, whose IPA column is a reconstruction that nothing labels as one; and `wbm` says
`surfaceType: native-script` while its script is Latin. `kdt`, `slr` and `srb` are three of the 21
rows already carried by `meta_import_cap_check.js`.

## Addendum — three cells this round got wrong, and what they were trying to say

The owner found `kjg blood` reading `["mham", "hmam or m̥am — one notation, not three"]`. Two more
were the same: `egy ear` and `tca white`. All three came from the third thread, and the shape of
the mistake is worth recording because it is not a linguistic one.

**In each case the auditor had found a real notation problem, could not decide the value, and wrote
its reasoning into the `ipa` slot instead of leaving it null and filing the item under `held`.** The
applier took the string literally. All three are reverted to their prior values.

The three findings underneath are good and stand as held items:

- **`kjg` writes one feature three ways.** Preaspiration/voicelessness is `mham` (blood), `hmɔh`
  (name), `hraŋ` (tooth) and `ʰmaːr` (salt) — four cells, three notations. ASJP KHMU gives *mam*
  for blood.
- **`egy` splits ḏ six-to-three inside one row** — ɟ in green, white and mountain; dʒ in ear, fire,
  hand, nose, sleep and n99. The row also carries no `meta.pronunciationType`, so nothing tells the
  reader its IPA column is a reconstruction at all.
- **`tca white` is the row's only cell marking tone with an acute accent**; the other 27 use Chao
  letters. The repair needs Anderson's Ticuna tone description, which the thread could not reach —
  which is exactly why it should have been held rather than half-written.

Two guards came out of it. `tools/ipa_is_not_prose_check.js` rejects an IPA field containing a
comma, semicolon, em dash or en dash, or `" or "`, or more than 50 characters — thresholds measured
against the corpus rather than assumed, since it contains none of the first two and its longest
legitimate field is 44 characters. And `tools/apply_rally_patch.mjs` now runs the same three tests
*before* writing, because a guard that catches prose afterwards has already let it reach a commit.
