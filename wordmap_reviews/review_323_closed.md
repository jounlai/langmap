# Wordmap review #323 — Bantu (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Njeri Kamau-Bennett, a descriptive/comparative Bantuist specializing in the Northeast-Coast (Sabaki) and Mount-Kenya (E.50/E.60) zones, with secondary competence in Nguni and Sotho-Tswana. My working references for this pass are Nurse & Hinnebusch, *Swahili and Sabaki: A Linguistic History* (1993) for the Comorian/Swahili cells; L. B. Armstrong, *The Phonetic and Tonal Structure of Kikuyu* (1940) and A. R. Barlow, *Studies in Kikuyu Grammar and Idiom* (1951) for Gĩkũyũ; P. R. Bennett's Central-Kenya (Meru/Embu/Kamba) comparative work; Doke & Vilakazi, *Zulu–English Dictionary* (1948) and the *Greater Dictionary of isiXhosa* for Nguni; Guthrie, *Comparative Bantu* (1967–71) for reconstructions; and standard Yao (Ngunga), Bemba (White Fathers), Ciluba and Kikongo lexica. The bulk of the 43-lect table is sound; my only substantive objection is a **systematic phonetic mis-transcription in the Mount-Kenya cluster**, where the orthographic tilde vowel ⟨ĩ⟩ has been rendered as a *nasalized* vowel /ĩ/. In Gĩkũyũ–Kimeru–Kiembu orthography the tilde marks the second-degree **[-ATR] lax high vowel** /ɪ/ (paired with ⟨ũ⟩ = /ʊ/) — it does **not** indicate nasalization; these languages have no contrastive nasal vowels in these lexemes (Armstrong 1940 §I; Barlow 1951). The affected cells therefore carry a phantom nasal segment.

## Issues found

### 1. `ki` — two — spurious vowel nasalization (⟨ĩ⟩ = /ɪ/, not /ĩ/)
- **File:** `words/two.js` — code `ki`
- **Current:** ["igĩrĩ","iɣĩrĩ"]
- **Expected:** ["igĩrĩ","iɣɪɾɪ"]
- **Why:** Gĩkũyũ ⟨ĩ⟩ is the [-ATR] near-close /ɪ/ (Armstrong 1940; Barlow 1951), not a nasal vowel; there is no nasalization in *igĩrĩ*. The velar is the fricative /ɣ/ (correct) and the liquid is a flap /ɾ/. Corrected broad form: /iɣɪɾɪ/.

### 2. `ki` — name — spurious vowel nasalization (⟨ĩ⟩ = /ɪ/, not /ĩ/)
- **File:** `words/name.js` — code `ki`
- **Current:** ["rĩĩtwa","ɾĩːtwa"]
- **Expected:** ["rĩĩtwa","ɾɪːtwa"]
- **Why:** The doubled ⟨ĩĩ⟩ is a long lax /ɪː/, not a nasal /ĩː/. Gĩkũyũ has no phonemic nasal vowels here; the tilde is the standard [-ATR] diacritic. Corrected: /ɾɪːtwa/.

### 3. `mer` — two — spurious vowel nasalization (⟨ĩ⟩ = /ɪ/, not /ĩ/)
- **File:** `words/two.js` — code `mer`
- **Current:** ["ijĩrĩ","idʒĩrĩ"]
- **Expected:** ["ijĩrĩ","idʒɪɾɪ"]
- **Why:** Kimeru shares the Mount-Kenya seven-vowel orthography; ⟨ĩ⟩ = /ɪ/, not nasal. ⟨j⟩ = /dʒ/ (correct). Corrected: /idʒɪɾɪ/.

### 4. `mer` — name — spurious vowel nasalization (⟨ĩ⟩ = /ɪ/, not /ĩ/)
- **File:** `words/name.js` — code `mer`
- **Current:** ["rĩĩtwa","ɾĩːtwa"]
- **Expected:** ["rĩĩtwa","ɾɪːtwa"]
- **Why:** Same as Gĩkũyũ: ⟨ĩĩ⟩ = long lax /ɪː/, not nasal /ĩː/. Corrected: /ɾɪːtwa/.

### 5. `ebu` — two — spurious vowel nasalization (⟨ĩ⟩ = /ɪ/, not /ĩ/)
- **File:** `words/two.js` — code `ebu`
- **Current:** ["ijĩrĩ","idʒĩrĩ"]
- **Expected:** ["ijĩrĩ","idʒɪɾɪ"]
- **Why:** Kiembu (E.52) uses the same tilde orthography; ⟨ĩ⟩ = /ɪ/. No nasalization is present. Corrected: /idʒɪɾɪ/.

### 6. `ebu` — name — spurious vowel nasalization (⟨ĩ⟩ = /ɪ/, not /ĩ/)
- **File:** `words/name.js` — code `ebu`
- **Current:** ["rĩĩtwa","ɾĩːtwa"]
- **Expected:** ["rĩĩtwa","ɾɪːtwa"]
- **Why:** ⟨ĩĩ⟩ = long lax /ɪː/, not nasal /ĩː/. Corrected: /ɾɪːtwa/.

*(Note for the record, not flagged: the sister lect Kikamba `kam` transcribes the same orthographic ⟨ĩ⟩ as plain /i/ — an ATR-neutral broad approximation that is tolerable in a broad transcription and introduces no phantom segment, so it is left as-is. The Kikuyu-cluster cells above are flagged specifically because a nasalized vowel is the wrong **segment**, not merely a broad one.)*

## Worker response (作業者)
Findings: 6 · applied 6 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
