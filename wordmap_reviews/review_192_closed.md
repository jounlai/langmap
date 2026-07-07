# Wordmap review #192 — Afro-Asiatic (non-Semitic) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Halane Wako, a comparative Afro-Asiaticist working across the Cushitic, Chadic, Berber and Omotic branches (with Ancient Egyptian/Coptic as my diachronic anchor). My primary references for this review are: for Cushitic, John Saeed's *Somali Reference Grammar*, Griefenow-Mewis & Bitima's *Learning Oromo* together with Jonathan Owens' *A Grammar of Harar Oromo*, Ongaye Oda Orkaydo's *A Grammar of Konso* (2013), Loren Bliese's *A Generative Grammar of Afar*, and Wedekind/Roper on Beja; for Chadic, Paul Newman's *The Hausa Language*, Zygmunt Frajzyngier's *A Grammar of Hdi*, and Karen Ebert's *Sprache und Tradition der Kera (Tschad)* (1979); for Berber, Maarten Kossmann's Riffian and Tuareg work and Naït-Zerrad's dictionaries; for Omotic, Lamberti & Sottile's *The Wolaytta Language*; and for Egyptian-Coptic, James Allen's *Middle Egyptian* and Loprieno's *Ancient Egyptian*. I paid particular attention to the ejective/pharyngeal series and to Chadic pronominal paradigms, where transcription and data-entry slips are most common.

## Issues found

### 1. `ker` — you — template placeholder left in native cell
- **File:** `words/you.js` — code `ker`
- **Current:** [" kV","kə"]
- **Expected:** ["kə","kə"]
- **Why:** The native-orthography field is a data-entry artifact: a leading whitespace plus the metavariable `kV` (capital-V = "any vowel" schema placeholder), which is not a valid Kera orthographic form. The cell's own IPA is /kə/; per Ebert (*Sprache und Tradition der Kera*, 1979) the 2sg independent pronoun is built on the k-base (cf. the 1sg `kə́ŋ` already in the row), so the concrete surface form should be written to match the transcription. Correcting to `kə` removes the placeholder and aligns the two fields.

### 2. `om` — name — Oromo ⟨q⟩ is ejective, not plain uvular
- **File:** `words/name.js` — code `om`
- **Current:** ["maqaa","maqaː"]
- **Expected:** ["maqaa","makʼaː"]
- **Why:** In Afaan Oromoo the grapheme ⟨q⟩ is the glottalized (ejective) velar /kʼ/, a fully contrastive phoneme (e.g. *qaba* /kʼaba/ 'has'); Oromo has no plain pulmonic uvular /q/. Griefenow-Mewis & Bitima and Owens (*Harar Oromo*) transcribe it /kʼ/. Rendering *maqaa* as /maqaː/ drops the ejective feature — a wrong-segment error, and inconsistent with the rest of this corpus, which does mark ejectives (cf. Wolaytta *xoolinttee* /tʼoːlintːeː/).

### 3. `kxc` — name — Konso ⟨q⟩ ejective not marked
- **File:** `words/name.js` — code `kxc`
- **Current:** ["maqaa","maqaː"]
- **Expected:** ["maqaa","makʼaː"]
- **Why:** Same defect as Oromo. Konso (Konsoid, East Cushitic; Ongaye Oda Orkaydo 2013) has a full ejective series including /kʼ/, and the ⟨q⟩ of *maqaa* represents that ejective, not a plain uvular /q/. IPA should be /makʼaː/ to preserve the phonemic ejective.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
