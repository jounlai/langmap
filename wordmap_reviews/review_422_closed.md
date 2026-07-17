# Wordmap review #422 — Chữ Nôm tones, native scripts, and the Brahmic font gap

## Why this review exists
Three owner reports, all one underlying theme — **cells not written the way the
corpus writes that language**:
1. sushi's Chữ Nôm surface contained romanization — `𩻐 (mắm)`.
2. "チュノム全般 IPA に声調入れて" — every Chữ Nôm cell must carry tones.
3. "古ジャワ語でローマ字はだめ" — Old Javanese must not be romanized.

Then, once Old Javanese was put into Javanese script: **"パッラヴァ系ブラーフミー
ってフォントない？"** — and the answer was no.

## Deterministic checker first
Three romanization reports in a row is an error *class*, so
`tools/script_family_check.js` was written instead of patching cell-by-cell
([[hanmap-deterministic-checkers]]). It compares each surface's Unicode script
against the script the rest of the corpus uses for that same code. It confirmed
`kaw` and immediately found an **unreported** one: `akk` shipped `šiqqu` in Latin
where the corpus writes Akkadian in cuneiform 100% of the time.

## Native scripts (rally-verified against primary sources)
- **akk** `šiqqu` → **𒅆𒅅𒄣**. Verifier downloaded CAD Š/3 pp.99-100: *"šiqqu s.;
  garum (a brine or sauce made of fish or locusts)"*, syllabic ši-iq-qu attested
  (TLB 4 37:4ff, Emar 6 555:38ff); Oracc corroborates. IPA ʃiqːu.
- **kaw** `ḍeṅ (asin)` → **ꦝꦺꦁ**. Zoetmulder OJED *"ḍeṅ 393:1 dried meat"* with
  three 10th-c. inscriptions (OJO 23, vN 8, TBG 67.205). Vowel corrected ɖəŋ→ɖeŋ
  (taling, not pepet). The gloss "(asin)" dropped — surface is script only.
- **vi_nom** `𩻐 (mắm)` → **𩻐**.

## Chữ Nôm tones — 20 cells
Every toneless `vi_nom` in the corpus. **Tones were NOT taken from the rally.**
Its output split on sắc (˧˥ in five cells, ˧˦ in two) and glottalised nặng as
˨˩ˀ where the corpus writes ˨˩ — so the rally's own tone reasoning was unsound.
The reliable rule is each word's **own `vi` row** (same word, same Hanoi
reading), which is review #108's rule now that vi_nom carries tones. Measured
atlas tones: **ngang ˧ · huyền ˨˩ · sắc ˧˥ · hỏi ˧˩˧ · ngã ˧ˀ˥ · nặng ˨˩**.

### 8 surfaces corrected — the shipped Nôm spelled a *different word*
Each verified against 2+ independent sources (Unihan `kVietnamese`, hvdic,
chunom.org, Wiktionary):

| word | was | actually reads | now |
|---|---|---|---|
| dog | 𤝞 | **chuột** "rat" | 㹥 |
| mother | 𡞕 | **vợ** "wife" | 媄 |
| father | 𤙗 | no kVietnamese (Japanese ホウ) | 布 |
| fire | 𤏬 | **rạng** | 焒 |
| eye | 𥄫 | gấp/mập/ngấp | 眜 |
| hand | 𡬶 | Hán-Việt *tầm* only | 𢬣 |
| heart | 𢣐𢞂 | 𢞂 = **buồn** "sad" | 𢁑𢙭 |
| moon | 𩈘𢁑 | 𢁑 = **trái** | 𩈘𢁋 |

### A self-inflicted error corrected
The two sắc `˧˦` outliers (25:2 against them) were normalised to `˧˥`:
computer `vi` (unreviewed Codex import) and sushi `vi_nom` — **the latter was my
own review #421 fix**, set from the Codex cell as "the atlas norm". That was
circular evidence from an unreviewed outlier. Cf. [[review-vs-manual-fixes]].

## The font gap — Pallava-descended Brahmic was ALL tofu
`fonts/` held only CJK/Hangul subsets. The `.wm-form` chain merely **named**
"Noto Sans Javanese/Brahmi/Tagalog/…" — system fonts almost no device ships
(`fc-list` here: zero hits). So these rendered as tofu, including the **21 kaw
cells that predate this work**. `font_coverage_check.js` missed it because it
audits only the **astral plane**; Javanese (U+A980), Tagalog (U+1700), New Tai
Lue (U+1980) and Tai Viet (U+AA80) are BMP.

Self-hosted Noto subsets, cut to exactly the codepoints used, unicode-range
scoped under a shared `'Brahmic Subset'` family (the `'Nom Serif Subset'`
pattern), layout features kept (Brahmic needs GSUB/GPOS):

| script | size | glyphs | codes |
|---|---|---|---|
| Javanese | 21.3 KB | 29 | kaw |
| New Tai Lue | 5.9 KB | 31 | khb |
| Brahmi | 4.3 KB | 31 | kho, txb, xto |
| Tai Viet | 3.3 KB | 25 | blt |
| Tagalog (Baybayin) | 2.7 KB | 19 | otl |
| **total** | **37.6 KB** | 135 | |

The Nôm subset was also re-cut for 𢬣/𢙭/𢁋 (HanaMin B), retiring the now-unused
U+228D0/U+24657.

## Open follow-ups (found, deliberately NOT fixed here)
Pre-existing bugs in reviewed cells, flagged rather than silently changed:
- `thanks` vi/vi_c/vi_s put **˥** on the ngang syllable *ơn* (convention: ˧) — 3 cells.
- `hello` vi uses **˧˧** for ngang *xin*; the 4 `vi_han` cells also use ˧˧.
- `good` vi_han `tʰien˨˩˨` uses ˨˩˨ for hỏi where the convention is ˧˩˧.
- `font_coverage_check.js` still audits only the astral plane, and only checks
  that a font is *named*, not that it is *self-hosted*. Both limits should go.

## Final
Commits `921927f` (Nôm + native scripts) and `6186f14` (Brahmic fonts). All
guards clean; IPA lint clean (1205 cells); font coverage 0 missing;
script-family check clean. Closed.
