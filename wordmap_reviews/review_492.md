# Wordmap data review #492 — austroasiatic

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: austroasiatic.

## Reviewer self-introduction (ペルソナ自己紹介)

Austroasiatic reviewer; Vietnamese tones, Khmer script, Chữ Nôm. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] five / kxm (Northern Khmer surface)
- **Issue:** kxm five is written in Latin 'pram' while the rest of the kxm column is native Khmer script (four បួន, hundred រយ, eye ភ្នែក). A mostly-native-script row with one stray Latin cell.
- **Fix:** kxm: ["ប្រាំ", "pram"]  (surface fixed to Khmer script; existing IPA retained)
- **Source:** km five = ['ប្រាំ','praːm'] in words/five.js; Northern Khmer shares the Khmer numeral ប្រាំ.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [MED] thanks / vi, vi_c, vi_s (IPA tone)
- **Issue:** 'ơn' in 'cảm ơn' is transcribed with high ˥ (əːn˥) in all three spoken rows, but 'ơn' has no diacritic so it is ngang (mid level) = ˧, as elsewhere; the vi_nom row for the same phrase correctly uses əːn˧.
- **Fix:** Change only the Northern vi row: words/thanks.js:198 vi ["cảm ơn", "kaːm˧˩˧ əːn˥"] -> ["cảm ơn", "kaːm˧˩˧ əːn˧"] (matches vi_nom's əːn˧ for the identical phrase). Do NOT change vi_c (kaːm˧˩ əːn˥) or vi_s (kaːm˨˩˥ əːn˥): bare ˥ for ngang is the dataset's established Central/Southern convention (cf. moon.js trăng ˥, father.js ba ˥) and Kirby 2011 covers only Hanoi.
- **Source:** Kirby 2011 'Vietnamese' JIPA (ngang = level ~33); internal vi_nom thanks row uses əːn˧.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 3. [MED] nose / vi, vi_c, vi_s (IPA)
- **Issue:** 'mũi' is transcribed 'muˀi' — omits the tone-register digits and writes the coda as vowel 'i' not glide 'j'. The vi_nom row for the same word gives the full 'muj˧ˀ˥' (ngã glottalized rising).
- **Fix:** vi (Hanoi/Northern): ["mũi","muj˧ˀ˥"]; vi_c (Central): ["mũi","muj˨˨"]; vi_s (Southern): ["mũi","muj˨˩˦"] — mirroring the repo's own dialectal ngã realizations in the milk (sữa) cell. The finding's single value muj˧ˀ˥ is correct only for vi.
- **Source:** Internal: vi_nom nose = ['𪖫','muj˧ˀ˥'] in words/nose.js; Hanoi ngã is glottalized rising ˧ˀ˥.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 4. [MED] wind / vi_c and bird / vi_c (IPA tone)
- **Issue:** Two vi_c cells lack any tone digit while every other vi_c cell has one: wind 'gió' = 'ʝɔ' (hỏi) and bird 'chim' = 'cim' (ngang). Omissions, not dialect features.
- **Fix:** wind vi_c → 'ʝɔ˧˩˧' (keep Central ʝ initial); bird vi_c → 'cim˧'. Both match the column's own tone conventions; identical to the suggested fix.
- **Source:** Internal consistency across the tone-marked vi_c column; vi wind = zɔ˧˩˧, vi bird = cim (ngang).
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 5. [LOW] eat/hand/love vs name/star/three — vi_c column (IPA tone)
- **Issue:** vi_c is inconsistent about the ngang (unmarked) tone: ˥ in eat 'ăn' (aːn˥), hand 'tay' (taːj˥), love 'thương' (tʰɨəŋ˥) but ˧ in name 'tên', star 'sao', three 'ba', two 'hai'. One dialect cannot have two values for one tone.
- **Fix:** Change the three outlier vi_c cells from ˥ to ˧ to match the ngang convention used by the other four vi_c cells and the entire standard vi column: eat vi_c ["ăn","aːn˧"], hand vi_c ["tay","taːj˧"], love vi_c ["thương","tʰɨəŋ˧"]. (Same target register as the reviewer's suggested fix.)
- **Source:** Internal inconsistency within the vi_c column across those word files.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 0 applied, 5 awaiting a decision.
