# Wordmap review #350 — Sinitic (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Mei-lin Kwan, a descriptive/historical Sinitic dialectologist trained on the Beijing University *Hànyǔ Fāngyīn Zìhuì* (漢語方音字彙, 2nd ed.) and *Hànyǔ Fāngyán Cíhuì* (漢語方言詞彙) traditions. For this batch I checked the Mandarin sub-branches (Jianghuai, Ji-Lu/Tianjin, Lan-Yin, Southwestern, Zhongyuan) against Hou Jingyi's *Xiàndài Hànyǔ Fāngyán Yīnkù* and Yuan Jiahua's *Hànyǔ Fāngyán Gàiyào*; Min against Douglas/Barclay's *Amoy* dictionary, Bodman, and de Gijzel's *Penang Hokkien Dictionary* (plus Chen Zhangtai/Li Rulong for Pu-Xian and Woon Wee-lee for Hainanese); Wu against Richard VanNess Simmons and *Sūzhōu/Níngbō/Wēnzhōu fāngyán* monographs; Hakka (Sixian/Hailu) against Hashimoto's *The Hakka Dialect* and the Taiwan MoE 客語 tone charts; Dungan against Rimsky-Korsakoff Dyer; and Old Chinese strictly against Baxter & Sagart, *Old Chinese: A New Reconstruction* (2014). I paid particular attention to internal tone-system consistency (yinping/yangping/shang/qu contours) within each variety, which is the fastest way to catch a mis-keyed cell.

## Issues found

### 1. `och` — star — Old Chinese 星 mixes reconstruction schools
- **File:** `words/star.js` — code `och`
- **Current:** ["星","sˤeŋ"]
- **Expected:** ["星","s-tsʰˤeŋ"]
- **Why:** The other four Old Chinese cells in this row are pure Baxter–Sagart (2014): 我 *ŋˤajʔ, 汝 *naʔ, 二 *nijs, 名 *(C.)meŋ — all with the distinctive B-S pharyngealization diacritic ˤ, glottal *-ʔ and suffixal *-s. Within that same system, 星 "star" is reconstructed *s-tsʰˤeŋ (Baxter & Sagart 2014, connecting it to the 晶/清 *tsʰ-series; MC *seng < *s-tsʰˤeŋ by loss of the affricate after the loosely-attached *s- preinitial). The given *sˤeŋ is a plain *s-initial form belonging to the Karlgren/Schuessler line (Schuessler *sêŋ, tying 星 to 生), not to Baxter–Sagart. Since the cell is otherwise B-S-notated, it should carry the B-S root cluster to avoid school-mixing.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
