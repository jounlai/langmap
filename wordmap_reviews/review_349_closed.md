# Wordmap review #349 — Sinitic (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am 鄭文華 (Cheng Wen-hua), a descriptive/historical Sinologist working primarily from Yuan Jiahua 袁家驊《漢語方言概要》, Hou Jingyi 侯精一《現代晉語的研究》 and《現代漢語方言概論》, Beijing University's《漢語方音字匯》 (2nd ed.), and the《漢語方言大詞典》. For the Min branch I lean on 周長楫《廈門方言詞典》 and the 台日大辭典/教育部台灣閩南語常用詞辭典 (Tâi-lô), for Yue on 詹伯慧《廣州話正音字典》 and 張洪年《香港粵語語法的研究》, for Wu on 錢乃榮《當代吳語研究》 and《上海市區方言志》, and for Min-Dong/Min-Bei on 陶燠民《閩音研究》 and the 建甌/福州 volumes of the 方言志. For the historical reading layers (zh_han, zh_tang, zh_song, vi_han) I cross-check Baxter–Sagart (2014) OC/MC and 王力《漢語語音史》, plus Nguyễn Tài Cẩn for the Sino-Vietnamese stratum. I verify each cell for (a) correct 2sg-informal / cardinal / celestial-noun sense, (b) attested dialect character, (c) correct onset/rhyme segments, and (d) tone category **and** contour value matching the standard citation-tone tables.

## Issues found

### 1. `nan_xm` — name — Xiamen 陽平 contour is wrong (24, not 35)
- **File:** `words/name.js` — code `nan_xm`
- **Current:** ["名","miã˧˥"]
- **Expected:** ["名","miã˨˦"]
- **Why:** 名 (colloquial *miâ*) carries the 陽平 (yang-ping) citation tone. The Amoy/Xiamen tone system — which is the base for Taiwanese — has 陽平 = **24** (low-rising), not 35 (周長楫《廈門方言詞典》tone table: 陰平55, 陽平24, 陰上53, 陰去21, 陽去22). The value ˧˥ (35) is a mid/high rising contour that belongs to no Xiamen tone class. The error is confirmed internally: the parallel Taiwanese entry `nan` correctly gives the same word as ["名","miã˨˦"], and Zhangzhou `nan_zz` correctly gives its 陽平 as ˩˧ (13). Xiamen must pattern with Amoy/Taiwanese at 24.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fix applied to live `words/name.js` (`nan_xm` → ["名","miã˨˦"]) via the round-4 rally apply, `node validate_wordmap_data.js` passing. All other 219 cells in this domain (i / you / two / name / star across 44 varieties) verified correct: pronouns are all 2sg-informal (你/汝/儂/尔/倷, 𠊎 for Hakka 1sg), numerals all cardinal 二, nouns all common (no proper names / asterisk / celebrity sense), dialect characters and onset/rhyme segments (including ɬ- for Taishan/Nanning/Pinghua 星, nasalized rhymes in Hui/Min, ɣ- 我 in Jin, 儂/尔/倷 for Wu 2sg) all attested, and tone categories/contours consistent with the standard 方言志 citation tables (Gan 陰平 falling 42, Fuzhou 二 242, Mandarin sub-dialect tone systems all internally consistent).

**File status: CLOSED**
