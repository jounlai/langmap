# Review 529 — closed

**Question:** Does each shortened name still denote the same language as before?

**Scope:** the whole rename — 209 codes, 2,937 (ui, code) strings across 19 UIs, baseline
`18e524af~1` against HEAD. Four mechanical sweeps (per-UI exact collision, "bracket content became
the whole name", stem-level content-loss, novel-token detection), then sourcing on what they threw up.

## Wrong — two

- **`de_gsw`, all 19 UIs.** The rename handed it "Swiss Standard German", byte-identical to `de_ch`.
  But `de_gsw` is a Lang Map row and its own sentences are **Alemannic**: "Min Name isch Tanaka",
  "Wo isch de nöchscht Bahnhof", "Ich möcht en Aazug aprobiere". Swiss Standard German is "Mein
  Name ist Tanaka". 376e6ce6 correctly un-paired `de_ch` from `gsw` and then handed `de_ch`'s
  identity to a third code that is precisely the thing `de_ch` is not. The old "German (Swiss)" was
  vague but not false. **Fixed:** `de_gsw` now carries `gsw`'s 19 strings, which also lets the
  collision guard's twin exemption cover the pair automatically.
- **`acw`.** The row is **Hijazi** Arabic — `name: 'Hijazi Arabic'`, `native: الحجازية`, pinned at
  Jeddah, and `meta_desc/acw.js` opens "Hijazi Arabic (ISO 639-3: acw)". ISO 639-3 confirms acw =
  Hijazi and acx = Omani. Every one of the 19 UI names said **Omani Arabic**. 17 of them said it
  before the rename; English carried the only hint ("Omani Arabic (Hijazi-Omani)") and the
  shortening removed it. **This is not a rename defect — the rename deleted the last trace of a
  pre-existing one.** Being fixed in all 19.

## Doubtful — two

- **`pi_edu`** "Pedagogical Pali (Theravada monastic)" → "Theravada Pali". All Pali is Theravāda
  Pali, and plain `pi` is on the same map; `meta_desc/pi_edu.js` says the differentiator is the
  actively **recited/monastic** register, which is the word that was dropped. The map now names one
  thing twice.
- **`tao` in Arabic** — التاو is exactly `ssf` Thao's Arabic name, 200 km away. Already carried in
  the collision guard's UNNAMEABLE list: Arabic has no name for either language.

## Ok-but — seven, recorded not urgent

`ie` zh/yue (bare 西方语 reads as the common noun); `zh_song` ru (Вэньянь is the whole category, of
which three other rows are instances); `cr` (bare "Cree" over Plains Cree data, with `crk` beside
it); `afb` ("Qatari" is narrower than ISO Gulf); `ar_sa` (every UI says Saudi, the row says Najdi —
pre-dates the rename); `ko_hun`/`ja_kun` in ar/sw (the Hanja/Kanji anchor gone entirely);
`hsn_hy` vi (衡陽 = Hành Dương, not Hằng Dương — pre-existing).

## The risk class the brief named came back clean

The 撫州/福州 error has **no further instances**, and the Vietnamese one was fixed *by the rename
itself*: `gan_fz` went "Phúc Châu" (= 福州, the Eastern Min city, a separate row on this map) →
"Phủ Châu" (= 撫州). Every other Sino-Vietnamese place reading checks out — 宜春 Nghi Xuân, 吉安
Cát An, 忻州 Hân Châu, 婺源 Vụ Nguyên, 永州 Vĩnh Châu, 婁底 Lâu Để, 雙峰 Song Phong, 永安 Vĩnh An,
桂林 Quế Lâm, 柳州 Liễu Châu, 青島 Thanh Đảo. The three group→city narrowings (`zh_jiao` Qingdao,
`zh_gl` Liuzhou, `cnp_gl` Guilin) all match where the row is pinned, and 桂北平话 is conventionally
represented by 桂林郊区平话, so that one became more precise, not less.

## One adjacent pre-existing error, found and fixed

In Vietnamese `yue_gz` read **"Tiếng Việt Cao Châu"** — 粵 rendered as *Việt* makes the Gaozhou Yue
row say "Vietnamese of Gaozhou". Its five sibling rows use Tiếng Quảng Đông or a bare place name.
Corrected to "Tiếng Quảng Đông Cao Châu".

## Coverage, honestly

Exhaustive across all 19 UIs for the four mechanical classes and all 209 renamed codes. Cross-row
place confusion was swept row by row for **vi, en, ja, ko, ru, fr**. For **th, hi, he, sw, ar, id**
only token collisions were checked mechanically; each transliterated toponym was not sourced back
to its character, and those scripts collapse the distinction — Thai writes both 抚州 and 福州 as
ฝูโจว. **That is the gap in this round.**
