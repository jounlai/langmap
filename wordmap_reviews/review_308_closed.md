# Wordmap review #308 — Sinitic (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Ho Sai-kwong (何世光), a descriptive dialectologist of southern Sinitic trained in the Yuan Jiahua 《漢語方言概要》 tradition and working primarily from Norman's *Chinese* (1988), Branner's *Problems in Comparative Chinese Dialectology* for Min/Hakka reconstruction, the 《漢語方音字匯》 for cross-lect readings, and Hou Jingyi 《現代晉語的研究》 for the Jin group. For the two lects touched by this review I lean on: for Hakka, the Taiwan MOE 《臺灣客家語常用詞辭典》 and Hashimoto's *The Hakka Dialect* (both of which write the 1sg pronoun 𠊎, not 我); and for Chaoshan Min, Lin Lunlun 《新編潮州音字典》 and Li Xinkui 《潮汕方言詞考釋》, whose Chaozhou tone inventory fixes 陽去 (tone 7) at [11] and 陽上 (tone 6) at [35]. I checked every cell against tone-category expectations and native-orthography norms; the Mandarin, Wu, Yue, Jin and Xiang sets are internally coherent and I flag only two genuine errors.

## Issues found

### 1. `hak_cn` — i — wrong native orthography for the Hakka 1sg pronoun
- **File:** `words/i.js` — code `hak_cn`
- **Current:** ["我","ŋai˩"]
- **Expected:** ["𠊎","ŋai˩"]
- **Why:** The IPA ŋai˩ is correct (陽平, Meixian/Sixian value), but it belongs to the dedicated Hakka 1sg morpheme written 𠊎 (Taiwan MOE 《臺灣客家語常用詞辭典》; Hashimoto 1973). The graph 我 in Hakka is read ŋo/ŋɔ (a distinct literary morpheme), so the pairing 我 + ŋai is orthographically inconsistent. Standard Hakka corpora write 𠊎 (occasionally 厓) for ngài. Fix the script only.

### 2. `nan_te` — two — Chaozhou 二 given a 陽上 tone contour instead of 陽去
- **File:** `words/two.js` — code `nan_te`
- **Current:** ["二","zi˧˥"]
- **Expected:** ["二","zi˩"]
- **Why:** 二 is Middle Chinese 日母至韻去聲; in Chaoshan Min (次濁去 → 陽去) it is 陽去 tone 7, whose Chaozhou citation value is [11] (Lin Lunlun 《新編潮州音字典》). The contour ˧˥ [35] is precisely 陽上 (tone 6) and cannot host a 去-category syllable — no Teochew description assigns 二 a rising tone. The rest of this lect's set confirms the scheme (我/汝 = 陰上 53, 名 = 陽平 55, 星 = 陰平 33), so 二 is a stray tone-category error. Correct the tone to low [11] (˩); segment zi is fine.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
