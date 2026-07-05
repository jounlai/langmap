# Wordmap review #227 — Sinitic (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Auwyn Sōng, a comparative Sinitic dialectologist trained in the Norman–Coblin tradition, working primarily from Jerry Norman's *Chinese* (1988), the *漢語方音字彙* (Hanyu Fangyin Zihui, 2nd ed.) and *漢語方言詞彙* for cross-lect segment/tone checks, Baxter & Sagart's *Old Chinese: A New Reconstruction* (2014) for the OCH column, Douglas–Barclay's *Chinese–English Dictionary of the Vernacular or Spoken Language of Amoy* plus Bodman for the Min/Hakka rows, 汤珍珠 et al. *宁波方言词典* and 叶祥苓 *苏州方言词典* for the Wu rows, and S. Rimsky-Korsakoff Dyer's work together with Hai Feng's grammar for Dungan (the Cyrillic literary norm built on the Gansu/甘肃 dialect, three tones: I 陰平 ˨˦, II 陽平+上 ˥˩, III 去 ˦˦). On the objective axes the table is clean: every native graph is correct (汝/倷/侬/во etc. all right), every gloss is the intended singular-informal / cardinal / common-noun / celestial sense (no 您, no 兩, no 第二, no asterisk/celebrity), the Baxter-Sagart OCH cells (*ŋˤajʔ, *naʔ, *nijs, *meŋ, *sˤeŋ) are all correct, and the Tianjin, Wuhan and Hakka tone systems are internally coherent. The only genuine defects are two Dungan cells that carry no tone marks at all — inadmissible in a broad IPA of a tonal language and inconsistent with the tone-bearing monosyllables in the same row.

## Issues found

### 1. `dng` — name — Dungan 名字 transcribed with no tone
- **File:** `words/name.js` — code `dng`
- **Current:** ["минзы","miŋt͡sɿ"]
- **Expected:** ["минзы","miŋ˥˩t͡sɿ"]
- **Why:** Dungan is fully tonal, yet this cell alone (with `star`) drops every tone mark, whereas the pronoun/numeral cells in the same row (vɔ˧, ni˧, ɚ˥˩) all carry them. 名 is 陽平, which in the Gansu-based literary norm underlying the Cyrillic orthography falls in tone II (˥˩); the second syllable 字 (-зы) is a neutral/轻声 enclitic and stays toneless. Cf. Rimsky-Korsakoff Dyer's Dungan tone values (I ˨˦ / II ˥˩ / III ˦˦) and 名字 = *míngzi* in the standard Dungan lexicon.

### 2. `dng` — star — Dungan 星星 transcribed with no tone
- **File:** `words/star.js` — code `dng`
- **Current:** ["синсин","ɕiŋɕiŋ"]
- **Expected:** ["синсин","ɕiŋ˨˦ɕiŋ"]
- **Why:** Same defect: the reduplicated noun 星星 (синсин) is given with a bare segmental string and no pitch. 星 is 陰平 = Dungan tone I (˨˦); the reduplicated second syllable is neutral (轻声) and is left unmarked, matching the pattern used elsewhere in the corpus. A tonal Sinitic broad-IPA cell must show at least the tone of the head syllable.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
