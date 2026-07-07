# Wordmap review #391 — Sinitic (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Wei-lin Ang (洪偉霖), a descriptive/comparative dialectologist of the Sinitic family, with fieldwork on Southern Min (Quanzhou/Amoy/Penang) and Taihu Wu. For this pass I worked from the standard reference set: Baxter & Sagart, *Old Chinese: A New Reconstruction* (2014) for the OC layer; the Peking University *漢語方音字彙* (2nd ed.) as the pan-dialectal fixed point; 林連通《泉州市方言志》 and 周長楫《廈門方言詞典》 for the Quanzhou/Amoy tone systems; 錢乃榮《當代吳語研究》 for Suzhou/Ningbo/Wenzhou Wu; 劉丹青《南京方言詞典》 for Jianghuai (Nanjing); 羅肇錦 for Sixian/Hailu Hakka; 詹伯慧・de Sousa for Goulou Yue; and Rimsky-Korsakoff Dyer for Dungan Cyrillic orthography. My method is to fix each lect's tone-value inventory from a source, then check that every cell uses that lect's own register values rather than an imported neighbour's.

## Issues found
### 1. `nan_qz` — i — Quanzhou 陰上 pronoun should be 55, not the Amoy 53
- **File:** `words/i.js` — code `nan_qz`
- **Current:** ["我","ɡua˥˥"]  (data as given: ["我","ɡua˥˧"])
- **Expected:** ["我","ɡua˥˥"]
- **Why:** The colloquial 1sg 我 *góa* carries 陰上 in Southern Min. Quanzhou 陰上 has the value **55**, whereas **53** is the Amoy/Zhangzhou 陰上. The other Quanzhou cells in this row already use genuine Quanzhou values — 陰平 33 (星 tsʰĩ˧˧), 陽平 24 (名 miã˨˦), 陽去 22 (二 dzi˨˨) — so the frame is unambiguously Quanzhou and the 陰上 should follow suit as 55 (林連通《泉州市方言志》: 陰平33 陽平24 陰上55 陽上22 陰去41 陽去22). The 53 here is an imported Amoy value.

### 2. `nan_qz` — you — same Quanzhou 陰上 correction on 汝
- **File:** `words/you.js` — code `nan_qz`
- **Current:** ["汝","lɯ˥˥"]  (data as given: ["汝","lɯ˥˧"])
- **Expected:** ["汝","lɯ˥˥"]
- **Why:** 2sg 汝 *lír* also takes 陰上 in Quanzhou, so the tone must be **55**, parallel to 我. The distinctive Quanzhou centralized vowel [ɯ] (泉 *lír* vs 廈 *lí*) is correct and is retained; only the tone letters are corrected from the Amoy-style 53 to Quanzhou 55.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
