# Wordmap review #219 — Other Indo-European (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Eirene Kováts, a comparative Indo-Europeanist working on the fragmentary and epigraphic branches (Anatolian, pre-classical Hellenic, Insular Celtic, Classical Armenian, and the Messapic/Tartessian problem). My working references for this batch are: H. Craig Melchert, *Cuneiform Luwian Lexicon* (1993) and *The Luwians* (2003) for Anatolian pronominal and nominal stems (*amu*, *ādman*, *tuwi*); the Linear B sign-value tables and lexicon in Michael Ventris & John Chadwick, *Documents in Mycenaean Greek* (2nd ed. 1973) plus the DĀMOS corpus for syllabogram readings; Rudolf Thurneysen, *A Grammar of Old Irish* (1946) and the *electronic Dictionary of the Irish Language* (eDIL, s.v. *mé*, *dá*, *ainm*, *rétla*) for Goidelic; Robert Godel, *An Introduction to the Study of Classical Armenian* (1975) and the *Nor Baṙgirkʿ* for Grabar phonology (the three-way stop system գ/կ/ք = g/k/kʰ); and, for the two epigraphic-only entries, Carlo De Simone on Messapic and the Koch (2009) vs. Untermann (1997) dispute over Tartessian, both of which justify retaining the unattested marker for these five basic-vocabulary concepts.

## Issues found

### 1. `gmy` — two — wrong Linear B syllabogram (DI for DU)
- **File:** `words/two.js` — code `gmy`
- **Current:** ["𐀇𐀺","duwoː"]
- **Expected:** ["𐀉𐀺","duwoː"]
- **Why:** The intended reading is *du-wo* = /duwoː/ (the attested Mycenaean numeral, cf. instrumental dual *du-wo-u-pi*). The first sign given, 𐀇 (U+10007), is the syllabogram **DI**, not DU; the correct sign is 𐀉 (U+10009) **DU**. The IPA cell "duwoː" confirms the glyph is simply mis-set. Sign values per Ventris–Chadwick, *Documents in Mycenaean Greek*.

### 2. `hy_grab` — two — spurious aspiration in IPA
- **File:** `words/two.js` — code `hy_grab`
- **Current:** ["երկու","jɛrkʰu"]
- **Expected:** ["երկու","jɛrku"]
- **Why:** երկու *erku* is spelled with կ, the plain voiceless velar /k/. Classical Armenian (Grabar) has a three-way velar contrast գ /g/ – կ /k/ – ք /kʰ/, and aspiration belongs only to ք. The transcription /jɛrkʰu/ wrongly aspirates կ; it should be /jɛrku/ (matching the non-aspirated stop of անուն, դու, etc.). The native orthography is correct and unchanged. Cf. Godel, *Introduction to Classical Armenian*, §on the stop system.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
