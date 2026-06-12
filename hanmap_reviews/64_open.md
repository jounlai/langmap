# HanMap Review #64 — Mandarin -ian / -üan rime transcribed with /a/ instead of [ɛ]

Scope: every `ipa.<lang>` cell for the three HAN_LIST characters whose Mandarin
reading carries the front-medial rime ⟨-ian⟩ / ⟨-üan⟩ — **天** (tiān), **見**
(jiàn), **犬** (quǎn). No other HAN_LIST char has this rime in Mandarin.

## The issue

In Standard Chinese the rime ⟨-ian⟩ is phonetically **[jɛn]** and ⟨-üan⟩ (after
j/q/x and in yuan) is **[ɥɛn]**: the underlying /a/ is raised and fronted to
[ɛ] before the front coda /n/ with a front (i/y) medial. This is the standard
narrow value in Lee & Zee (2003) *Standard Chinese (Beijing)*, JIPA 33(1), and
Duanmu (2007) *The Phonology of Standard Chinese*. Writing the rime with /a/
(`jan` / `yan`) is a phonemic/broad shorthand that is out of step with the
otherwise-narrow IPA this corpus uses (tone contours, t͡ɕ ligatures, etc.).

Reported by a GitHub reviewer; `zh` itself was already corrected in commit
b46cdc1 (天 `tʰjɛn˥˥`, 見 `t͡ɕjɛn˥˩`, 犬 `t͡ɕʰɥɛn˨˩˦` — 犬 medial also y → ɥ to
match the j glide in 天/見). This review catalogs every **remaining** column.

Convention notes for the proposals below:
- Keep each cell's existing tone value and existing medial notation. Standard
  cells use a glide (`j` / `ɥ`); the dialect cells use a vowel medial (`i` / `y`).
  Only `a → ɛ` is proposed for the dialect cells (and `y → ɥ` is **not** imposed
  on cells that use the `i`/`y`-vowel medial convention).

---

## Category A — Standard Mandarin variants (unambiguous; same value as fixed `zh`)

`zh_tw` (Taiwan), `zh_us` (North-American Putonghua), `zh_th` (Bangkok-diaspora
Mandarin) are Standard Mandarin and must match `zh`.

### A1. 天 — `tʰjan` → `tʰjɛn`
- `zh_th = "tʰjan˥˥"` → `"tʰjɛn˥˥"`
- `zh_tw = "tʰjan˥˥"` → `"tʰjɛn˥˥"`
- `zh_us = "tʰjan˥˥"` → `"tʰjɛn˥˥"`

### A2. 見 — `t͡ɕjan` → `t͡ɕjɛn`
- `zh_th = "t͡ɕjan˥˩"` → `"t͡ɕjɛn˥˩"`
- `zh_tw = "t͡ɕjan˥˩"` → `"t͡ɕjɛn˥˩"`
- `zh_us = "t͡ɕjan˥˩"` → `"t͡ɕjɛn˥˩"`

### A3. 犬 — `t͡ɕʰyan` → `t͡ɕʰɥɛn`  (medial y → ɥ, a → ɛ)
- `zh_th = "t͡ɕʰyan˨˩˦"` → `"t͡ɕʰɥɛn˨˩˦"`
- `zh_tw = "t͡ɕʰyan˨˩˦"` → `"t͡ɕʰɥɛn˨˩˦"`
- (no `zh_us` cell for 犬 — nothing to change.)

**Status: ready to apply** — identical reasoning to the already-fixed `zh`.

---

## Category B — Mandarin dialects (propose `a → ɛ`, but verify per dialect)

These cells use a vowel medial (`tɕian`, `tɕʰyan`). For the Mandarin dialect
groups present here — Southwestern (`zh_sc` Sichuan, `zh_cd` Chengdu, `zh_cq`
Chongqing, `zh_gl` Gui-Liu/Guilin), Central Plains (`zh_kf` Kaifeng, `zh_zz`
Zhengzhou), Ji-Lu (`zh_tj` Tianjin) — ⟨-ian⟩ is likewise [iɛn] and ⟨-üan⟩ is
[yɛn]. Proposed `a → ɛ`, **pending dialect-by-dialect confirmation** (these
realizations are regular but each should be checked against a dialect source,
e.g. 漢語方音字匯 / local 方言志).

### B1. 天 — `tʰian` → `tʰiɛn`
- `zh_gl = "tʰian˦˦"` → `"tʰiɛn˦˦"`

### B2. 見 — `tɕian` → `tɕiɛn`
- `zh_cd = "tɕian˨˩˧"` → `"tɕiɛn˨˩˧"`
- `zh_cq = "tɕian˨˩˦"` → `"tɕiɛn˨˩˦"`
- `zh_gl = "tɕian˨˦"` → `"tɕiɛn˨˦"`
- `zh_kf = "tɕian˧˩˨"` → `"tɕiɛn˧˩˨"`
- `zh_tj = "tɕian˥˧"` → `"tɕiɛn˥˧"`

### B3. 犬 — `tɕʰyan` → `tɕʰyɛn`
- `zh_cd = "tɕʰyan⁵³"` → `"tɕʰyɛn⁵³"`
- `zh_cq = "tɕʰyan⁵³"` → `"tɕʰyɛn⁵³"`
- `zh_gl = "tɕʰyan˥˧"` → `"tɕʰyɛn˥˧"`
- `zh_kf = "tɕʰyan˥˥"` → `"tɕʰyɛn˥˥"`
- `zh_sc = "tɕʰyan⁵³"` → `"tɕʰyɛn⁵³"`
- `zh_tj = "tɕʰyan¹³"` → `"tɕʰyɛn¹³"`
- `zh_zz = "tɕʰyan˥˧"` → `"tɕʰyɛn˥˧"`

**Status: propose, needs verification.** Southwestern/Central-Plains/Ji-Lu
Mandarin -ian/-üan = [iɛn]/[yɛn] is the expected regular outcome, but confirm
against a per-dialect source before applying.

---

## Category B′ — Dungan (`dng`) — separate treatment, do NOT apply `a → ɛ`

- 天 `dng = "tʰjan˦"` (rom `tyan¹`)

Dungan (Gansu/Shaanxi Mandarin written in Cyrillic) **lost nasal codas**: 天 is
realized with a nasalized vowel, roughly **[tʰiæ̃]** (no final -n). So the fix
here is *not* `a → ɛ + n`; the whole `-an` coda is wrong. This is part of a
larger Dungan nasal-coda question and needs a Dungan-specific pass — flagged,
not proposed here.

---

## Category C — Min Nan / Hokkien (`nan_*`) — related but a separate language/decision

The 犬 reading `kʰian` (khián) appears across Hokkien lects: `nan_id`, `nan_my`,
`nan_pera`, `nan_pn`, `nan_qz`, `nan_xm`, `nan_zz`. This is **not** the Mandarin
-üan rime — it is the Hokkien literary rime ⟨-ian⟩, which in Taiwanese/Amoy
Hokkien is phonetically [iɛn] (e.g. 邊 pian = [piɛn]). So by the same narrow-IPA
logic these *could* be `kʰiɛn`, but:
1. it is a different language family branch with its own romanization/IPA
   convention (POJ/Tâi-lô write ⟨ian⟩, often read [iɛn] but sometimes [ian]);
2. it should be decided as a single consistent Hokkien-wide policy, not piecemeal
   under a "Mandarin -ian" fix.

**Status: out of scope for this review** — recorded so it isn't lost. Recommend
a separate Hokkien ⟨-ian⟩ review.

---

## Summary

| Category | Cells | Action |
|---|---|---|
| `zh` (head) | 天/見/犬 | ✅ already fixed (b46cdc1) |
| A — standard variants (zh_tw/us/th) | 8 | ready to apply (`a→ɛ`, 犬 also `y→ɥ`) |
| B — Mandarin dialects (sc/cd/cq/gl/kf/tj/zz) | 13 | propose `a→ɛ`, verify per dialect |
| B′ — Dungan (dng) | 1 | flagged: nasal-coda, needs Dungan pass |
| C — Min Nan (nan_*) | 7 (犬) | out of scope: separate Hokkien decision |

*All values quoted are read-only references as of this review; no data edits made
in this file. `zh` head readings were corrected in a prior commit.*
