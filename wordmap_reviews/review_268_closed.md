# Wordmap review #268 — Sinitic (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Cheng Wai-lam, a Sinitic dialectologist trained in the descriptive tradition of Yuan Jiahua's 《漢語方言概要》 and Jerry Norman's *Chinese* (1988), working primarily from the character-syllabary of 北京大學《漢語方音字彙》 and the individual 方言志 monograph series. For Old Chinese I take Baxter & Sagart's *Old Chinese: A New Reconstruction* (2014) as my baseline; for Min I lean on Douglas/Barclay and 周長楫《廈門方言詞典》 plus 李如龍 for Quanzhou/Hainan; for Hakka on 羅肇錦 and the 台灣客語 (四縣/海陸) descriptions; for Wu on 錢乃榮《當代吳語研究》 and the city-level 方言志 (葉祥苓《蘇州方言志》, 湯珍珠《寧波方言詞典》, 鄭張尚芳 for 溫州); for Dungan on Rimsky-Korsakoff Dyer's grammar of the Gansu variety. My review privileges internal rhyme-category consistency (同攝同韻字必須同韻母) and correct tone-category-to-contour mapping, which is where transcription slips usually surface.

## Issues found

### 1. `wuu_sz` — star — Suzhou 星 coda mismatch with 名
- **File:** `words/star.js` — code `wuu_sz`
- **Current:** ["星","siŋ˦"]
- **Expected:** ["星","sin˦"]
- **Why:** 星 (青韻) and 名 (清韻) are both 梗攝 open-mouth finals that fall together as a single front-nasal rhyme /in/ in Suzhou Wu. The dataset's own `name` cell correctly gives 名 = min˨˦ with an alveolar **-n** coda, so transcribing 星 with a velar **-ŋ** is internally contradictory — the two characters must share the same rhyme. 葉祥苓《蘇州方言志》 records 星 as /sin⁴⁴/ (陰平 44, matching the ˦ already given). Only the coda is wrong; the initial and tone are fine. Change ŋ → n.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
