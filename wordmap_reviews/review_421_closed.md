# Wordmap review #421 — sushi & computer: Chinese script convention + correctness rally

## Why this review exists
The owner flagged that the two new words (**sushi** #29, **computer** #28) wrote
**too many traditional characters** in the Chinese topolect cells and that this
should match the **existing corpus convention**, then asked for a full review
rally covering that and any other errors, recorded here.

This corrects a wrong call in **[review #420](review_420_closed.md)**, which
claimed "the atlas writes the non-Mandarin topolects (Min/Wu/Hakka/Xiang) in
traditional characters, so 電腦 is right." That blanket rule is false. Cf.
[[review-vs-manual-fixes]] — a rally finding must not override the real shipped
convention.

## The real convention (measured, not assumed)
Derived deterministically from the existing 27 words (tree 樹/树, love 愛/爱,
thanks 謝/谢, …) per language code:

- **Simplified (电脑 / 寿司):** mainland Mandarin `zh` + every `zh_*` city, and
  the mainland topolects — Wu `wuu`/`wuu_*`, Jin `cjy`, Gan `gan`, Xiang `hsn`,
  mainland Hakka `hak_cn`, Min-Dong `cdo`, Puxian `cpx`, Northern Min `mnp`,
  Teochew `nan_te`, and the Yue cities `yue_nn` (Nanning) / `yue_ts` (Taishan).
- **Traditional (電腦 / 壽司):** standard Cantonese `yue`, Hokkien
  `nan`/`nan_xm`/`nan_zz`/`nan_qz`/`nan_pn`, Taiwan Hakka `hak_tw`/`hak_hl`, and
  the historical stages (`och`, `ltc`, `zh_song/han/tang`, `zh_wenyan_edu`).

The split is **per code, not "mainland ⇒ simplified"** — Hokkien is written
traditional even on the mainland (Xiamen/Zhangzhou/Quanzhou), while Teochew and
the Yue cities next door are simplified. This is why the convention was measured
from the data rather than guessed. See [[hanmap-deterministic-checkers]].

## Deterministic fix (25 cells)
Two tools were added and are reusable for any future Sinitic script drift:
- `tools/zh_script_convention.js` — loads the corpus, classifies each Sinitic
  code as simplified/traditional from discriminating trad↔simp characters, and
  flags where a new word disagrees.
- `tools/zh_script_fix.js` — rewrites only the mismatched surfaces
  character-by-character (壽司→寿司, 電腦→电脑), IPA untouched.

**25 cells** flipped to simplified (13 sushi + 12 computer): cdo, cpx, hak_cn,
hsn(computer), mnp, nan_te, wuu + wuu_hz/jh/nb/sz/wz, yue_nn, yue_ts. The
convention-correct traditional codes (yue, nan*, hak_tw/hl, historical) were
left unchanged. Checker re-run: **0 mismatches**. Commit `b6189bd`.

## Correctness rally (6 domains → adversarial verify)
Six family-domain researchers re-audited both words end-to-end (Sinitic; Japonic
+ Koreanic; tonal MSEA + Tibetan; Island SEA / Austronesian / Pacific; Europe +
Middle East; South/Central Asia + Africa + all historical analogues), each
finding verified by an independent adversarial checker (10 agents, IPA lint as
the gate). The data held up very well — the many look-alike /ˈsuʃi/ loan cells
were checked and kept (genuine per-language realisation, not errors), and the
just-applied script fix verified clean. **3 IPA-only fixes** survived, **0 of
the confirmed set rejected**:

- **computer `hsn`** (Changsha Xiang): 電 is 陽去 (voiced 定母 + 去聲) → tone
  `˦˥`→`˨˩`; the old ˦˥ was the yin-qu region. Consistent with 壽 陽去 ˨˩ in
  sushi.js.
- **computer `tl`** (Tagalog *kompiyuter*): restore the /j/ glide that the
  spelled "iy" encodes (KWF *Ortograpiyang Pambansa*) — `kompiˈuteɾ` →
  `kompiˈjuteɾ`.
- **sushi `vi_nom`** (Chữ Nôm 𩻐 *mắm*): the old `mǎm` used a **forbidden Latin
  caron** as a tone mark and carried no Chao tone; replaced with `mam˧˦` (sắc),
  matching the atlas's other Vietnamese cells (cf. computer `maj˧˦ tïŋ˧˦`).

Commit `3d80459`. `cuckoo_ipa_lint` clean (1205 partial-word cells); all
`check_all` guards clean.

## Final
sushi **321** cells, computer **355** cells (counts unchanged — all fixes were
in-place). Script convention now matches the corpus and is guarded by a
deterministic checker. Closed.
