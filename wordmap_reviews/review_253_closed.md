# Wordmap review #253 — Mongolic & Tungusic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Sürengiin Tümen-Ölzii, a comparative Mongolic–Tungusic linguist working from Nicholas Poppe's *Introduction to Mongolian Comparative Studies* and *Grammar of Written Mongolian*, Juha Janhunen's *The Mongolic Languages* (Routledge) and *Manchu: An Elementary Grammar*, Igor de Rachewiltz's readings of the *Secret History* for Middle Mongol, B. Sumiyabaatar and the standard Cyrillic-Khalkha lexicography (Bawden's *Mongolian–English Dictionary*) for Modern Mongolian, G. Kara for Written Mongolian orthographic transliteration, Elena Skribnik / Igor Nedjalkov (*Evenki*, Routledge) and A.L. Malchukov for Tungusic Northern branch, T.A. Bugaeva/V. Avrorin for Nanai, and Kane's *The Kitan Language and Script* for the Para-Mongolic (Khitan) reconstructions. I checked each cell for correct sense (1sg vs plural/honorific pronoun, cardinal vs ordinal, appellative vs proper name), script fidelity (Cyrillic vs traditional Mongolian bichig vs Manchu/Sibe script), and IPA plausibility including final-nasal and vowel-reduction behavior.

## Issues found

### 1. `mn_cn` — star — orthography retains final syllable that the IPA drops
- **File:** `words/star.js` — code `mn_cn`
- **Current:** ["ᠣᠳᠤᠨ","ɔt"]
- **Expected:** ["ᠣᠳᠤᠨ","ɔtŋ̍"]
- **Why:** The traditional Mongolian-script form ᠣᠳᠤᠨ transliterates as *odun/odon* — it explicitly spells the final -un syllable (o-d-u-n). The paired IPA /ɔt/ is the reduced Standard-Khalkha spoken form of Cyrillic **од**, which drops the whole final -un; it does not correspond to the four-graph written form here. The row's own `name` cell sets the convention (full script ᠨᠡᠷᠡ *nere* → reduced IPA nər, dropping only the final vowel), so by parity `star` should retain its stem-final nasal, not delete an entire vowel+n. Every conservative Mongolic witness keeps that nasal: Kalmyk **одн** /odn/, Buryat **одон** /ɔdɔŋ/, Classical Mongolian ᠣᠳᠣᠨ *odun*. Chakhar-based Inner Mongolian likewise realizes it with a syllabic final nasal, /ɔtŋ̍/ (~[ɔdõ]), not bare /ɔt/. The native cell is correct; only the IPA is mismatched.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
