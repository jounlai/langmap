# Wordmap review #238 — Austroasiatic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Sovann Ratanak, a comparative Austroasiaticist working across the Mon-Khmer and Munda branches. My primary references for this batch are: Harry Shorto's *A Dictionary of Modern Spoken Mon* (1962) and *A Mon-Khmer Comparative Dictionary* (2006) for Monic and pan-AA etyma; Jenner & Pou's *A Lexicon of Khmer Morphology* and Jenner's *Dictionary of Angkorian Khmer* for Khmer/Old Khmer (añ, eṅ, vyar, jmuḥ, pkāy all confirmed); Paul Sidwell's comparative work on Palaungic (*The Palaungic Languages*, 2015), Katuic (*The Katuic Languages*), and Bahnaric reconstructions; Gérard Diffloth and Michel Ferlus for Vietic (Mường ↔ Vietnamese *haːr/haːl 'two'); Gregory Anderson's *The Munda Languages* (2008) plus Bodding for Santali, Hoffmann for Mundari/Ho, and Ramamurti/Zide for Sora; Jørgen Rischel's *Minor Mlabri* for Khmuic; and Nagaraja's Khasi grammar plus Milne's *Elementary Palaung Grammar*. Against these sources, all 125 native-orthography/IPA word cells in this batch check out — the AA 2sg *miʔ/meʔ, the *ɓaːr/*ʔaːr 'two' reflexes, the *ɲmuh 'name' family (Khmer cmʊəh, Mon ɲəmùʔ, Munda ɲutum/nutum), and the *simʔaːŋ 'star' Katuic root are all correctly represented. The only defects I find are two family-classification errors, not cell-content errors.

## Issues found
All 125 word cells contain the correct native form and a plausible broad IPA for their respective languages. The two issues below are **language-family misclassifications**: the cell data is correct for the actual language, but the entry is filed under the wrong family. They are escalated to curation; neither requires a `{form, ipa}` change, so no cell-level corrections are applied.

### 1. `omx` — classification — "Middle Mongolian" is Mongolic, not Austroasiatic
- **File:** `words/*.js` — code `omx`
- **Current:** family tagged `Austroasiatic (Mon-Khmer, Monic)`; cells i=["bi","bi"] you=["či","tʃi"] two=["qoyar","qɔjar"] name=["nere","nerɛ"] star=["hodun","hodun"]
- **Expected:** family = **Mongolic**; cells unchanged (all correct Middle Mongolian)
- **Why:** *bi* (1sg), *či* (2sg), *qoyar* (2), *nere* (name), *hodun/hodun* (star) are textbook Middle Mongolian as recorded in the *Secret History of the Mongols* and Poppe's *Introduction to Mongolian Comparative Studies*. These are Mongolic, sharing nothing with Monic (Mon 1sg ʔoa, 2sg pɛh, 'two' ɓa). The word cells are accurate, so no orthography/IPA fix is proposed — only the "Austroasiatic (Mon-Khmer, Monic)" tag is wrong and must be re-filed under Mongolic.

### 2. `sukh` — classification — "Old Thai (Sukhothai)" is Kra-Dai (Tai), not Austroasiatic
- **File:** `words/*.js` — code `sukh`
- **Current:** family tagged `Austroasiatic (Khmeric)`; cells i=["กู","kuː"] you=["มึง","mɯŋ"] two=["สอง","sɔːŋ"] name=["ชื่อ","tɕʰɯː"] star=["ดาว","daːw"]
- **Expected:** family = **Kra-Dai (Southwestern Tai)**; cells unchanged (all correct Sukhothai-era Thai)
- **Why:** *kū* (กู, 1sg), *mʉng* (มึง, 2sg), *sɔ̌ɔng* (สอง, 2), *chʉ̂ʉ* (ชื่อ, name), *daaw* (ดาว, star) are all Southwestern Tai vocabulary attested from the Ramkhamhaeng inscription onward — Tai-Kadai, not Khmeric. The orthography and IPA are correct for the language, but the "Austroasiatic (Khmeric)" label is a misassignment (Sukhothai Thai merely *borrowed* the Khmer script; the lexicon is Tai). Re-file under Kra-Dai; no cell fix required.

## Worker response (作業者)
Findings: 2 · applied 0 · rejected 0 · skipped 0. Both findings are family-classification escalations (Middle Mongolian → Mongolic; Old Thai/Sukhothai → Kra-Dai); the underlying word cells are correct and require no `{form, ipa}` edit, so no change was pushed to live `words/*.js`. All 125 Austroasiatic word cells in this batch verified correct against Shorto, Jenner, Sidwell, Anderson, Rischel, and Milne. `node validate_wordmap_data.js` passing.

**File status: CLOSED**
