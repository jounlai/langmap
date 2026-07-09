# Wordmap review #400 — Sinitic & Sino-Tibetan / Tibeto-Burman (full 25-word audit, 10-thread rally)

## Reviewer self-introduction (ペルソナ自己紹介)
I am a Sino-Tibetan comparativist and Sinitic dialectologist, working from Thurgood & LaPolla's The Sino-Tibetan Languages, STEDT, Baxter–Sagart Old Chinese, and regional dialect surveys (Hanyu Fangyin Zihui, Karen/Loloish/Qiangic field descriptions). My focus is numeral/kinship/basic-vocabulary reconstruction and the phonology of Tibetic, Loloish, Karenic and Chinese varieties.

## Issues found

### bca (Bai) — `one` — wrong-sense [medium]
- Current: `tshit` /tʃʰɪt/
- Corrected: `yi` /i˧/
- Rationale: 'tshit' is the Bai word for 'seven' (七, tsʰiˀ/qiˀ), not 'one'. Bai 'one' (一) is yiil/i. The rest of the numeral set is intact (two=ko is correct), so the 'one' cell appears to hold the reflex of 'seven'.

### adx (Amdo Tibetan) — `thanks` — ipa-surface-mismatch [medium]
- Current: `དགེ་` /ŋeɕɑ ŋeɕɑ/
- Corrected: `ཐུགས་རྗེ་ཆེ` /tʰoktɕe tɕʰe/
- Rationale: The single syllable དགེ ('dge, virtue') cannot yield the reduplicated disyllable /ŋeɕɑ ŋeɕɑ/ — a clear surface/IPA and length mismatch. Realigned to the standard Amdo expression of thanks. (Exact intended colloquial form uncertain, but the current pairing is impossible.)

### new (Newari (Nepal Bhasa)) — `you` — ipa-surface-mismatch [medium]
- Current: `छ` /tsʰə/
- Corrected: `छ` /tʃʰa/
- Rationale: Everywhere else in this row छ/च are transcribed as the affricate /tʃʰ/ (house छें /tʃʰẽ/, one छ /tʃʰa/, dog खिचा /kʰitʃa/). The 2sg छ 'chã' rendered /tsʰə/ (dental + schwa) is internally inconsistent and does not match the grapheme; it should be /tʃʰa/.

## Domain summary
Reviewed all 112 entries. The dataset is high quality and deliberately encodes dialect-specific phonology, which I preserved rather than normalizing (e.g. s→ɬ in Taishanese/Pinghua/Nanning Yue, khy→retroflex and cluster changes in Amdo, cluster preservation in Ladakhi/Balti, East-Bodish 'zon' for two in Kurtöp, 娘 for mother in Wenzhou, dz→l 二=/li/ in Zhangzhou, Cyrillic for Dungan, native scripts for Meitei/Limbu/Bodo/Newari). Only three genuine cell defects met my confidence bar: a Bai numeral where 'one' holds the form for 'seven' (wrong-sense), an Amdo 'thanks' whose IPA cannot correspond to its one-syllable surface, and an internally inconsistent Newari 2sg IPA. Empty/placeholder rows (xct_litpr, zh_wenyan_edu) and the truncated label 'zh_xa' are data-completeness issues, not linguistic errors, so are not reported here.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. All flagged cells verified against the data before applying; none of the flagged values originated in a prior deliberate fix (all came from bulk data-creation commits), so no manual correction was overwritten. Deliberate dialect phonology was explicitly preserved. `node validate_wordmap_data.js` passing.

**File status: CLOSED**