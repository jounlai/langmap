# Wordmap review #267 — Sinitic (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am a comparative Sinitic dialectologist working primarily from Yuan Jiahua's 《漢語方言概要》, Jerry Norman's *Chinese* (1988) and his Min reconstruction papers, Hou Jingyi's 《現代晉語的研究》 for the Jin group, the Douglas–Barclay *Chinese–English Dictionary of the Vernacular or Spoken Language of Amoy* (1873/1923) together with 《漳州方言研究》 and 周長楫's Min-Nan work for the Hokkien lects, and 《漢語方音字彙》 for cross-dialect tone-category checking. For the historical reading-layers I lean on Pulleyblank's *Lexicon of Reconstructed Pronunciation in Early Middle, Late Middle, and Early Mandarin Chinese* and Baxter–Sagart Old Chinese. I checked every cell for tone-category consistency (平/上/去 splits) against each lect's citation-tone inventory, and screened initials for the classic diagnostic mergers (疑母 lenition, 心/生母 → ɬ in 邕潯/平話, and the 日母 j-/l- split in Hokkien).

## Issues found

### 1. `nan_zz` — two — Zhangzhou 二 uses /dz/ where the 漳州 accent has /l/
- **File:** `words/two.js` — code `nan_zz`
- **Current:** ["二","d͡zi˧"]
- **Expected:** ["二","li˧"]
- **Why:** The defining phonological feature of the Zhangzhou (漳州) accent within Hokkien is the loss of the 日母 affricate /dz/ (POJ "j"), which merges into /l/ — the textbook example being 二 jī → lī, alongside 熱 loa̍h, 入 li̍p (Douglas 1873, note on the "j" initial: "in Chang-chew it is generally pronounced l"; confirmed in 《漳州方言研究》). The dataset already reflects this correctly in this very lect's `you` = 汝 [li˥˧]; a Zhangzhou entry cannot simultaneously carry /dz/ in 二. Xiamen (`nan_xm`, jī-accent) and prestige Taiwanese (`nan`) legitimately keep [d͡zi]/[dʑi], but the Zhangzhou reflex is [li]. Tone (mid, 阳去) retained per the dataset's Hokkien convention.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fix applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
