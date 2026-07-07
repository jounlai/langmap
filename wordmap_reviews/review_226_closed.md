# Wordmap review #226 — Sinitic (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Desikan Wei Lianggong (魏良功), a Sinitic dialectologist trained on the comparative-phonology tradition of the 北京大学中文系《汉语方音字汇》(2nd rev. ed.) and the 《中国语言地图集》(Language Atlas of China) classification of Mandarin, Jin, Wu, Gan, Xiang, Hui, Yue, Hakka and Min. For tone-value citation forms I lean on the individual 方言词典 volumes of the 现代汉语方言大词典 series — in particular 钱曾怡《济南方言词典》(Jinan), 张映庚《昆明方言词典》(Kunming), and 李荣主编 volumes for Xi'an, Kaifeng, Nanjing and Hefei — cross-checked against Jerry Norman, *Chinese* (Cambridge, 1988) and Pulleyblank's *Lexicon of Reconstructed Pronunciation* for the Middle/Old Chinese pedagogical readings. My review method is internal-consistency triangulation: within each variety the 阴平/阳平 anchor cells fix that tone-register's contour, so a 上声 or 去声 morpheme printed with a foreign contour is a detectable slip. The overwhelming majority of the 44 varieties here are clean and well-transcribed; only three cells fail the internal cross-check.

## Issues found

### 1. `zh_km` — two — Kunming 二 given 上声 contour instead of 去声
- **File:** `words/two.js` — code `zh_km`
- **Current:** ["二","ɚ˥˧"]
- **Expected:** ["二","ɚ˨˩˨"]
- **Why:** Kunming Mandarin's four citation tones are 阴平 44 / 阳平 31 / 上声 53 / 去声 212 (张映庚《昆明方言词典》). The dataset's own Kunming cells confirm this system: 名 miŋ˧˩ = 阳平 31, 星 ɕĩ˦ = 阴平 44, and 我/你 = ˥˧ = 上声 53. 二 èr is a 去声 (departing-tone) syllable and must carry 212, but the cell copies the 53 上声 contour of 我/你. Correct value ɚ˨˩˨.

### 2. `zh_jn` — i — Jinan 我 given 阴平 contour instead of 上声
- **File:** `words/i.js` — code `zh_jn`
- **Current:** ["我","uə˨˩˧"]
- **Expected:** ["我","uə˥˥"]
- **Why:** Jinan's tones are 阴平 213 / 阳平 42 / 上声 55 / 去声 21 (钱曾怡《济南方言词典》); the distinctive high-level 上声 55 is a hallmark of the dialect. The dataset's own Jinan cells confirm the register anchors: 星 ɕiŋ˨˩˧ = 阴平 213, 名 miŋ˦˨ = 阳平 42, 二 ɚ˨˩ = 去声 21. 我 wǒ is a 上声 syllable and should read 55, but the cell prints the 阴平 dipping contour 213 (identical to 星). Correct value uə˥˥.

### 3. `zh_jn` — you — Jinan 你 given 阴平 contour instead of 上声
- **File:** `words/you.js` — code `zh_jn`
- **Current:** ["你","ni˨˩˧"]
- **Expected:** ["你","ni˥˥"]
- **Why:** Same slip as #2. 你 nǐ is a 上声 syllable in Jinan and must carry the high-level 55, not the 阴平 213 contour it currently shows (again matching 星 ɕiŋ˨˩˧ rather than the correct 上声). Correct value ni˥˥.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
