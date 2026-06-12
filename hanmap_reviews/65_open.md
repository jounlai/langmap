# HanMap Review #65 — Wu varieties romanization overhaul (Wugniu)

**Trigger:** GitHub issue "Wu Chinese varieties romanization in hanmap_data needs
an overhaul." The `surface.<wuu_*>` romanizations (outside `wuu_sz`, already
fixed by kori228) are a haphazard mix of French-Wu, Qian, Minidict,
old-Wiktionary and Wugniu, with several non-existent onsets:

> 龍 long (Qian -ng); 羊 hhiang (Qian hh-/-ng); 頭 ddeu (non-existent dd-);
> 肉 nnyioq (non-existent nn- + ny- digraph); 鳥 tio (French-Wu -o); 犬 qhioe /
> 去 qhi (non-existent qh-); 心 xin / 血 xyuoq (French-Wu/Qian x-); 魚 ngu (should
> be syllabic ŋ̍, no vowel); 立 lliq (non-existent ll-); … — kori228

**Target convention:** **Wugniu** (the modern standard; what kori228 used for
`wuu_sz`: `iq7`, `gni6`, `lon2`, …), with **tone-class digits 1–8**.
**Process:** review → confirm → apply (per maintainer).

Wu varieties in scope: `wuu` (Shanghai), `wuu_nb` (Ningbo), `wuu_hz` (Hangzhou),
`wuu_jx` (Jiaxing) — Northern/Taihu Wu; `wuu_jh` (Jinhua, Wuzhou Wu) and
`wuu_wz` (Wenzhou, Ou Wu) — **different Wu groups, treated separately**.
`wuu_sz` (Suzhou) is the already-correct anchor.

---

## Method: regenerate the romanization from the (reliable) IPA layer

The `ipa.<wuu_*>` layer is the ground truth — every error kori228 lists is in the
**surface** layer while the IPA is correct (e.g. 立 ipa `liɪʔ` vs surface `lliq`;
地 ipa `di` vs `ddi`; 犬 ipa `tɕʰyø` vs `qhioe`). So the fix is to **re-derive the
Wugniu surface from the IPA** with the Wugniu onset/rime rules.

An IPA→Wugniu romanizer was built and **validated against kori228's `wuu_sz`**
(IPA → his Wugniu spelling): **56 / 58 onset+rime matches**. Key rules confirmed
from his data (and corrected against the Wikipedia table):
- Affricates: /ts tsʰ/ → `ts tsh` (NOT `tz`); /tɕ tɕʰ dʑ ɕ ʑ/ → `c ch j sh zh`.
- /ɦ/ → `gh`, but `y` before a front glide (and the medial i is absorbed:
  ɦiã → `yan`, ɦʏ → `yeu`), `w` before /u/.
- Checked coda /-ʔ/ → `-q`; syllabic ŋ̍ → `ng`, m̩ → `m`, ɦəl → `er`.
- Rimes (Suzhou IPA → Wugniu): iɪʔ/iəʔ → `iq`, oʔ → `oq`, əʔ → `eq`, ʏ → `ieu`,
  øʏ → `eu`, æ → `au`, iæ → `iau`, ᴇ → `e`, ɪ → `ie`, oŋ → `on`, iɑ̃ → `iaon`, etc.

### Two bugs found in `wuu_sz` itself (the 2 non-matches)
1. **土** `surface.wuu_sz = "thəu3"` — keeps `əu` in the romanization, inconsistent
   with the identical rime in **火** `"hou3"` (both IPA `…əu`). → should be **`thou3`**.
2. **心** `surface.wuu_sz = "sin⁵¹"` — left a superscript Chao tone instead of the
   tone-class digit. IPA is `sin⁴⁴` (陰平 → class 1). → should be **`sin1`**.

Both applied in this review's commit.

---

## Confirms kori228's pan-dialectal caveat (Wugniu is NOT one spelling per char)

Running the romanizer per variety shows the Northern Wu varieties legitimately
**differ** in the rime, exactly as kori228 warned (路 lu Shanghai / lou Suzhou;
火 Suzhou /həu/ → `hou` vs Shanghai /hu/ → `hu`). So each variety must be
romanized from **its own** IPA, not copied from `wuu_sz`. Of 57 chars, ~35–37
per variety already match the Suzhou diasystem; the rest split into:

- **Regular per-variety differences (correct, keep):** 火 sh `hu`, 左 sh `tsu`,
  坐 sh `zu`, 央 sh `iaon`, 行 sh `ghaon` (Shanghai aon vs Suzhou an), …
- **Genuine different readings (correct, keep, but flag for kori228):**
  杭州 人 `zen` (z- reflex, not `gnin`), 杭州 肉 `zoq` (not `gnioq`),
  寧波 牛 `ngieu` (velar ŋ-, not palatal `gnieu`), 寧波 羊 `jia…`/`yan`.
- **Romanizer gaps to extend (vowels absent from the Suzhou-calibrated map):**
  ɛ (三/山/来 `sɛ/lɛ`), ɐ/ɒ (八 `pɐʔ`), ɔ (鳥/貓 `tiɔ/mɔ` → `iau/au`), ɤ (右 `jɤ`),
  ɚ (耳 `ɦɚ`), j-/w- zero-onset glides (右 `jɤ`, 飲 `ʔin`). These need the Wugniu
  rime values for each variety's vowel inventory before the per-char proposal
  table is final.

---

## Status & next steps

- [x] Target convention fixed (Wugniu + tone-class 1–8); IPA confirmed as basis.
- [x] IPA→Wugniu romanizer built & validated on `wuu_sz` (56/58).
- [x] Found & fixed 2 `wuu_sz` bugs (土, 心).
- [ ] Extend the romanizer's rime map for the Shanghai/Ningbo/Hangzhou/Jiaxing
      vowel inventories (ɛ, ɐ/ɒ, ɔ, ɤ, ɚ, glide onsets), validate, then emit the
      full per-character proposal table (onset+rime).
- [ ] Tone-class (1–8): derive from etymological category + initial voicing,
      applying each variety's mergers (濁上歸去 etc.) — flag variety-specific
      uncertainty for kori228.
- [ ] Wenzhou (`wuu_wz`) & Jinhua (`wuu_jh`): separate sub-reviews (different Wu
      groups; Wugniu Taihu rime values do not transfer).
- [ ] Surface the genuine-different-reading set above for kori228's confirmation.

*Proposals will be appended here as tables before any bulk edit; only the two
`wuu_sz` bug-fixes are applied in the opening commit.*
