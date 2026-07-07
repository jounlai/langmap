# Wordmap review #342 — Other Indo-European (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Sarah Vahradyan, a historical/descriptive linguist working on the peripheral Indo-European branches — Anatolian, pre-classical Hellenic, Insular Celtic, and Classical Armenian. For Armenian I rely on Robert Godel, *An Introduction to the Study of Classical Armenian* (1975) and Rüdiger Schmitt, *Grammatik des Klassisch-Armenischen* (1981), cross-checked against Hrachia Acharyan's *Hayerēn armatakan baṙaran*. For Old and Middle Irish I use Rudolf Thurneysen, *A Grammar of Old Irish* (1946) and the *eDIL* (electronic Dictionary of the Irish Language). For Mycenaean I use Ventris & Chadwick, *Documents in Mycenaean Greek* (2nd ed.) and Bartoněk, *Handbuch des mykenischen Griechisch* (2003). For Hieroglyphic/Cuneiform Luwian I use H. Craig Melchert, *Cuneiform Luvian Lexicon* (1993) and Annick Payne, *Hieroglyphic Luwian* (2010). Messapic (cms) and Tartessian (txr) are genuinely fragmentary/undeciphered for this core vocabulary, so their "—" markers are correct and left untouched. My review found the Anatolian and Celtic rows sound; the errors cluster in the Grabar row, whose IPA consistently gives Modern Eastern Armenian readings.

## Issues found

### 1. `hy_grab` — i — anachronistic prothetic /j/ on Grabar initial ե
- **File:** `words/i.js` — code `hy_grab`
- **Current:** ["ես","jes"]
- **Expected:** ["ես","es"]
- **Why:** In Classical Armenian (5th c., Grabar) word-initial ⟨ե⟩ represented plain /e/. The prothetic glide /j-/ (giving modern /jes/) is a post-classical Middle Armenian development, standard only in Modern Eastern/Western pronunciation. Godel (1975, §1.2) and Schmitt (1981, §21) transcribe Grabar ⟨ես⟩ as /es/. The native spelling is correct; only the IPA is anachronistic.

### 2. `hy_grab` — two — anachronistic /j/ and open vowel /ɛ/ in երկու
- **File:** `words/two.js` — code `hy_grab`
- **Current:** ["երկու","jɛrku"]
- **Expected:** ["երկու","erku"]
- **Why:** Two independent Modern-Armenian intrusions: (a) the prothetic /j-/ before initial ⟨ե⟩ is post-classical (see #1); (b) Grabar ⟨ե⟩ was a close-mid /e/, not the open /ɛ/ of Modern Eastern Armenian. Note the data is even internally inconsistent — cell #1 wrote /e/ but this cell wrote /ɛ/. Godel (1975) and Schmitt (1981) give Classical ⟨երկու⟩ as /erku/. Spelling correct; IPA should be /erku/.

### 3. `hy_grab` — star — ⟨ղ⟩ was a lateral in Grabar, not uvular /ʁ/
- **File:** `words/star.js` — code `hy_grab`
- **Current:** ["աստղ","astʁ"]
- **Expected:** ["աստղ","astɫ"]
- **Why:** The letter ⟨ղ⟩ denotes a velarized lateral /ɫ/ (conventionally transliterated ⟨ł⟩) in Classical Armenian; the uvular fricative /ʁ/ is the Modern Eastern Armenian reflex. This is the same "modern-reading" issue as #1–#2. Godel (1975, §1.4) and Schmitt (1981, §19) describe ⟨ղ⟩ as a lateral for Grabar. The native form ⟨աստղ⟩ is correct; IPA should be /astɫ/.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
