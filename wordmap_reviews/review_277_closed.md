# Wordmap review #277 — Americas (part 3) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Alonso Xicoy-Wynter, a descriptive linguist specializing in the Mayan (Q'anjobalan, Mamean, Ch'olan) and Isthmian Chibchan families. My working references for this review are: the Academia de Lenguas Mayas de Guatemala (ALMG) normalized dictionaries (*Diccionario Q'anjob'al*, *Diccionario Mam / Qyool Mam*, *Diccionario Ixil*, *Diccionario Poqomchi'*); Nora England's *A Grammar of Mam, a Mayan Language* (1983); Vázquez Álvarez's *A Grammar of Chol* (2011); Furbee-Losee on Tojolabal; and for Chibchan, Constenla Umaña's *Bribri* materials and the *Diccionario escolar de la lengua Kuna (Gunagaya)*. I checked each cell for correct sense (independent pronoun vs. absolutive clitic, cardinal vs. ordinal), ALMG-normalized orthography, and phonemically accurate broad IPA (ejectives, implosive ɓ, uvular q, tone).

## Issues found

### 1. `kjb` — star — wrong root shape and ejective
- **File:** `words/star.js` — code `kjb`
- **Current:** ["tʼuxum","tʼuʃum"]
- **Expected:** ["txʼumel","tʃʼumel"]
- **Why:** Q'anjob'al 'star' is **txʼumel**, with the ejective palato-alveolar affricate txʼ [tʃʼ] — the shared Q'anjobalan root (cf. Jakalteko/Popti' *txʼumel*, and the K'ichean cognate *chʼumil*). The stored "tʼuxum" [tʼuʃum] is defective on two counts: it uses a plain ejective tʼ rather than the affricate txʼ, and the segmental shape (t-u-ʃ-u-m) is a scrambled non-form, likely a transcription/metathesis error. ALMG *Diccionario Q'anjob'al* lists *txʼumel*.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
