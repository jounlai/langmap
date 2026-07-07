# Wordmap review #245 — Dravidian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. S. Ramaswamy, a descriptive-historical Dravidianist working primarily from Bhadriraju Krishnamurti's *The Dravidian Languages* (Cambridge, 2003) and the *Dravidian Etymological Dictionary* (DEDR; Burrow & Emeneau, 2nd ed. 1984) as my comparative backbone, cross-checked against Sanford Steever (ed.), *The Dravidian Languages* (Routledge, 1998/2020). For the individual languages I lean on M. B. Emeneau's Badaga materials and *Kota Texts*, Grignard's *An Oraon (Kurukh)–English Dictionary*, Sir Denys Bray's *The Brāhūī Language* and Elfenbein's *A Vocabulary of Marw Brahui*, D. N. S. Bhat on Tulu, and Balakrishnan on Kodava. My focus in this round was verifying the Southern/South-Central pronoun and numeral cells (all cognate-transparent and clean) and, especially, the transcription of the pan-Dravidian Sanskrit tatsama நக்ஷத்திரம்/नक्षत्रम् *nakṣatra* "star," where I found several IPA cells inconsistent with their own native script and with the correctly-transcribed sister entries.

## Issues found

### 1. `iru` — star — hybrid IPA does not match the Tamil-script spelling
- **File:** `words/star.js` — code `iru`
- **Current:** ["நட்சத்திரம்","nakʃat̪t̪iɾam"]
- **Expected:** ["நட்சத்திரம்","naʈɕat̪t̪iɾam"]
- **Why:** The native cell is the Tamilised orthography நட்சத்திரம் (ட் + ச), which is exactly the Tamil entry `ta` in this same set, correctly transcribed there as `naʈɕat̪t̪iɾam`. Tamil/Irula render Sanskrit *kṣ* as the cluster ṭ‑c [ʈɕ] (colloquially [cc]), never as [kʃ]. The current IPA is a hybrid: it keeps the Tamil geminate t̪t̪ from the த்த but supplies a Sanskritising **k** and a postalveolar **ʃ** that correspond to no grapheme in நட்சத்திரம் (there is no க and no ஷ in the string). The transcription must follow the script it accompanies, so it should read `naʈɕat̪t̪iɾam`, identical to Tamil.

### 2. `kfa` — star — wrong sibilant/stop segments for ನಕ್ಷತ್ರ
- **File:** `words/star.js` — code `kfa`
- **Current:** ["ನಕ್ಷತ್ರ","nakʃatra"]
- **Expected:** ["ನಕ್ಷತ್ರ","nakʂat̪ra"]
- **Why:** The Kannada-script form written for Kodava, ನಕ್ಷತ್ರ, contains ಷ = the retroflex sibilant [ʂ] (not ಶ [ʃ]) and ತ = the dental stop [t̪]. The current IPA uses postalveolar **ʃ** and an unspecified/alveolar **t**, both wrong segments for that spelling. Compare the correctly-transcribed Kannada entry `kn` in this very set, `nakʂat̪ra`, which is the phonemic target for the shared tatsama. Kodava has the retroflex sibilant and the dental/retroflex stop series, so `nakʂat̪ra` is expected.

### 3. `tcy` — star — wrong sibilant/stop segments for ನಕ್ಷತ್ರ
- **File:** `words/star.js` — code `tcy`
- **Current:** ["ನಕ್ಷತ್ರ","nakʃatra"]
- **Expected:** ["ನಕ್ಷತ್ರ","nakʂat̪ra"]
- **Why:** Same defect as `kfa`: the Tulu form is written in Kannada script with ಷ [ʂ] and ತ [t̪], so the transcription should be `nakʂat̪ra`, matching the correctly-rendered Kannada `kn` cell. The current `nakʃatra` substitutes [ʃ] for [ʂ] and drops the dentality of the stop; Tulu maintains the retroflex sibilant in this borrowed tatsama.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing. All pronoun (i/you), numeral (two) and "name" cells across the Dravidian set were verified correct and left untouched (e.g. Gondi *nanna/nimma/reṇḍ/parol/sukkum*, Kuvi *nānu/īnu/rīndi/paru/sukka*, Kurukh *ēn/nīn/ēnḍ/nām/binko*, Brahui *ī/nī/irā/nām/istār*, Tulu *yānu/ī/raḍḍ/pudar*, Badaga *naanu/niinu/eradu/esaru/sukki* — all cognate-consistent with DEDR).

**File status: CLOSED**
