# Wordmap review #270 — Tibeto-Burman (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Kelsang Norbu-Whitaker, a descriptive/historical linguist specializing in the Tibeto-Burman branch of Sino-Tibetan, with fieldwork on Bodish and Burmish lects. My primary references for this review are: Tournadre & Sangda Dorje, *Manual of Standard Tibetan* (2003) and Tournadre's work on the Tibetic family for Lhasa/Classical registers; Gwendolyn Hyslop, *A Grammar of Kurtöp* (2017) for East Bodish; Jackson T.-S. Sun's papers on rGyalrong and Amdo; Randy LaPolla's *A Grammar of Qiang* (2003) and his Dulong/Rawang studies; James A. Matisoff, *The Dictionary of Lahu* (1988) and *Handbook of Proto-Tibeto-Burman* (2003); Julian Wheatley / Hla Pe for Burmese and Xu Xijian's Jingpho-Zaiwa materials for Burmish; Gong Hwang-cherng and Marc Miyake for Old Burmese and Tangut reconstructions; and Robbins Burling for Bodo-Garo. I checked each [native, IPA] cell against these for correct sense, register, script, and segment/tone transcription, treating the "informal" specification of the *you* concept as a strict T-vs-V distinction.

## Issues found

### 1. `bo` — you — honorific/polite form given for an *informal* slot
- **File:** `words/you.js` — code `bo`
- **Current:** ["ཁྱེད་རང","cʰeːraŋ˥"]
- **Expected:** ["ཁྱོད","cʰøː˥"]
- **Why:** The concept is explicitly the **2sg *informal*** pronoun. Standard (Lhasa) Tibetan ཁྱེད་རང *khyed-rang* is built on the honorific stem ཁྱེད and functions as the polite/deferential V-form (Tournadre & Sangda Dorje 2003, §pronouns). The genuine plain/familiar T-form 2sg is ཁྱོད *khyö* [cʰøː˥]. Every other Tibetic lect in this domain correctly fills the informal slot with ཁྱོད (adx tɕʰo, khg cʰø˥, dz tɕʰøː, lhm kʰjø˥, xct/xct_litpr tɕʰø), so `bo` is the outlier placing the honorific form in the informal cell — a T/V register error analogous to putting *vous* in a French "informal you" slot.

### 2. `atb` — name — IPA drops the nominal a- prefix present in the native form
- **File:** `words/name.js` — code `atb`
- **Current:** ["amying","mjiŋ"]
- **Expected:** ["amying","amjiŋ"]
- **Why:** Zaiwa (Atsi) 'name' carries the nominal prefix *a-*, written in the native cell as **a**-mying, but the IPA "mjiŋ" silently deletes it. The corpus convention is to retain the a- prefix in both fields when it is part of the citation form (cf. adi *amin*/amin, nmf *amin*/amin, njo *atü*/atɯ). The IPA must match the native: [amjiŋ].

### 3. `obr` — name — reconstructed IPA omits the written အ (ʔa-) prefix
- **File:** `words/name.js` — code `obr`
- **Current:** ["အမည်","mɲaɲ"]
- **Expected:** ["အမည်","ʔamɲaɲ"]
- **Why:** The Old Burmese inscriptional spelling အမည် *a-maññ* explicitly writes the prefix vowel အ /ʔa/, but the IPA "mɲaɲ" gives only the root. The disyllable /ʔamɲaɲ/ (root *mɲaɲ* with nominal ʔa-) is what the orthography encodes, and the parallel later Burmish forms keep both syllables in IPA (my/rki နာမည် nàmɛ̀/nàmì). Restore the prefix: [ʔamɲaɲ].

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
