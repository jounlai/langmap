# Wordmap review #249 — Indo-Iranian (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Farrokh Nariman-Borjian, an Iranist and Indo-Aryanist working across the Old/Middle Iranian corpus and the Caspian, Pamir, Dardic, and Bihari–Rajasthani modern languages. For the ancient layers I rely on Kent, *Old Persian: Grammar, Texts, Lexicon* (1953); Skjærvø's *Introduction to Old Avestan* and Bartholomae's *Altiranisches Wörterbuch*; Durkin-Meisterernst's *Dictionary of Manichaean Middle Persian and Parthian* (2004) and MacKenzie's *Concise Pahlavi Dictionary*; Gharib's *Sogdian Dictionary*; and Bailey's *Dictionary of Khotan Saka*. For the modern Iranian side I use Borjian's work on Mazandarani/Gilaki, Steblin-Kamenskij's *Etymological Dictionary of Wakhi*, Paul's *Zazaki* grammar, and Asatrian & Borjian / Paul on Talyshi. For Indo-Aryan (Pahari, Lahnda, Bihari, Rajasthani, Dardic, and eastern Bengali-adjacent lects) I lean on Masica's *The Indo-Aryan Languages* and Grierson's *Linguistic Survey of India*. I verified all 30 languages × 5 concepts; the overwhelming majority are correct (including the Old/Middle Iranian cuneiform and Pahlavi/Sogdian citation forms, the Dardic and Pahari pronoun systems, and the Bhili/Bagri *be* "two"). Two genuine defects remain.

## Issues found

### 1. `tly` — star — vowel mismatch between orthography and IPA
- **File:** `words/star.js` — code `tly`
- **Current:** ["əstovə","æstovə"]
- **Why:** The Talyshi word for "star" is *əstovə/ostovə* (Asatrian & Borjian; Paul, *Taleshi*), and the native cell correctly writes the initial vowel as ⟨ə⟩. The IPA, however, opens with /æ/ — the phoneme Talyshi uses for the *a*-vowel, which is contrastive with schwa /ə/. This is a wrong-segment transcription internally inconsistent with its own orthography. The initial vowel is a prothetic/reduced schwa, so the IPA should read /əstovə/. (I am leaving the native cell unchanged; only the transcription is corrected.)
- **Expected IPA:** əstovə

### 2. `hno` — star — nonstandard Shahmukhi spelling of native *tārā*
- **File:** `words/star.js` — code `hno`
- **Current:** ["تارہ","t̪aːɾaː"]
- **Why:** The IPA /t̪aːɾaː/ has a long final /aː/, but the native cell ends in gol-he ⟨ہ⟩, which in Perso-Arabic script marks a final short /a/~/e/ (as in the Persian loan ستارہ *sitāra*). For an inherited tadbhava word like *tārā* "star", standard Punjabi/Hindko Shahmukhi writes final long ā with alif ⟨ا⟩ (تارا), reserving ⟨ہ⟩ for Persian-origin final vowels. As written, ⟨تارہ⟩ would be read /t̪aːɾa(e)/, contradicting the transcription. Correct the orthography to تارا to match the IPA.
- **Expected:** ["تارا","t̪aːɾaː"]

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
