# Wordmap data review #501 — same-day additions

> Single-slice review rally, 2026-09-06. Slice: everything added or changed today —
> Han Map `th` (10 cells + meta), the 42 historical-row cells (black, wine, wheel,
> milk, bear, honey, iron, hundred, rain, wind), the `tea` route change, the seven
> traditional→simplified Sinitic cells, and the two new rows `ivv` / `itb`
> (92 cells + meta). Read-only review; every finding below was checked against the
> live data and its cited source before listing.

## Reviewer self-introduction (ペルソナ自己紹介)

Convention-consistency reviewer. The question asked of every cell was not "is this
word right" but "does this cell obey the rule its own row declares" — the defect
class that produced 齒/齿, 烏/乌 and 儂/侬 earlier the same day.

## Findings (verified real)

### 1. [LOW] ivv / itb — three surfaces depart from the row's declared source, and the row did not say so
- **Issue:** `meta.coverageNote` states without qualification that surfaces are the
  practical orthography of Tsuchida, Yamada & Moriguchi (1987). Three cells are not:
  `ivv.five` is `lima` where Tsuchida's Ivasay list prints `dima`; `itb.wind` is
  `sarawsaw` where the Itbayat list prints `sarasaw`; and for `ivv.nose` and
  `itb.ear` the two sources name different lexemes (Tsuchida mohed / talinya against
  Reid ʔaraavaʔ / tilwan). Each deviation is defensible and each was argued in the
  commit message, but the shipped note claimed a clean rule. A reader collating the
  row against Tsuchida would find mismatches with nothing to explain them.
- **Fix:** APPLIED — `coverageNote` now names all four cells and the reason for each
  (Reid + Wiktionary both give lima for the same lect; Reid and Ivatan salawsaw share
  the -w- of sarawsaw; where the sources name different lexemes the one with a cognate
  in the sister lect is kept).
- **Source:** ABVD language IDs 251/249 (Tsuchida) against 427/425 (Reid), cached at
  `~/langmap-work/lb/abvd_forms.csv`; en.wiktionary Ivatan `lima`.
- **Disposition:** APPLIED

### 2. [LOW] ivv.thanks — the row's ⟨e⟩ = /ɨ/ correspondence is not applied in one cell
- **Issue:** A mechanical sweep of both rows against the six correspondences the note
  declares (ng→ŋ, ny→ɲ, c→tʃ, x→ɣ, '→ʔ, e→ɨ) found exactly one deviation in 92 cells:
  `Dios mamajes` → `dios mamahes`, where ⟨e⟩ stays /e/. It is correct not to assert
  /ɨ/ there — the phrase comes from the Spanish-influenced popular spelling, not from
  Tsuchida — but the note left the reader to infer that.
- **Fix:** APPLIED — the note now says outright that the ⟨e⟩=/ɨ/ correspondence is not
  applied in the two greeting phrases, because they are quoted from the other spelling.
- **Disposition:** APPLIED

## Checked and clean (adversarial verification, no change needed)

### 3. ivv / itb are not a copy of each other
17 of the shared cells are byte-identical. Each was re-checked against the two source
wordlists: in all 17 the sources are identical too (blood raya, earth tana, eye mata,
name ngaran, salt asin, sun araw, tooth nyipen …). The differences that do exist are
systematic — h~x in five places (vahay/vaxay, vohan/voxan, tohang/to'xang,
ma'hep/a'xep, makayceh/makahicex), plus l~d and o~u. Genuine closeness, not a
sourcing artifact.

### 4. p_sit `wind` IPA `qV-lij` — the capital is a cover symbol, and that is house practice
Flagged on sight as a non-IPA character in an IPA field. Checked: `paus` carries C, R,
N and S in 20 cells (*Cumay, *daRaq, *bulaN, *Sapuy …), `p_hmx` carries N and `p_aav`
carries C. The proto rows copy their reconstructions verbatim, cover symbols included.
Consistent; left alone.

### 5. Han Map `th` — all ten tone values are right
Each checked against the Thai tone rules (consonant class × live/dead × tone mark):
ยี่ low-class + mái èk → falling ˥˩; สาม high-class live unmarked → rising ˩˩˦;
สี่ high + mái èk → low ˨˩; ห้า high + mái thō → falling ˥˩; หก/สิบ high-class dead
→ low ˨˩; เจ็ด/แปด mid-class dead → low ˨˩; เก้า mid + mái thō → falling ˥˩;
ม้า low + mái thō → high ˦˥. Ten for ten, and the three taken from the Word Map
(สาม, สี่, ห้า) agree with it exactly.

### 6. `tea` — the new `leaf` route has exactly one member
Every cell routed cha or te whose form matches neither pattern was listed (32 of them)
and inspected: all are genuine chai-branch forms of the overland route (shay, chay,
чай, choy, ceai, ཇ). The tea-homeland rows that could have belonged in `leaf` — Shan,
Lisu, Lahu, Jingpo, Wa, Palaung, Yi, Naxi, Hani, Zhuang — are simply absent from this
partial word. Burmese is the only member, correctly.

### 7. Both new rows' prose agrees with their own cells
The Ivatan description cites the Basco/southern split with `timoy` ~ `chimoy` and the
row's `rain` cell is `timoy`; the Itbayaten description cites vaxay/vahay, voxan/vohan,
to'xang/tohang and mahilak, and all four are in the data; it says five cells are left
unattested and there are exactly five. No claim in either description is contradicted
by the row.

**File status: CLOSED** — 2 applied, 0 deferred, 5 verified clean.
