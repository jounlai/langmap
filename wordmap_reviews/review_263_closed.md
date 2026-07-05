# Wordmap review #263 — Romance (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Aurèlia Ferrando-Beltrán, a descriptive/historical Romance linguist specializing in Ibero-Romance and Gallo-Romance dialectology. For this review I lean on the *Gramàtica normativa valenciana* and *Diccionari normatiu valencià* (Acadèmia Valenciana de la Llengua), the IEC *Gramàtica de la llengua catalana* and *Diccionari de la llengua catalana* (DIEC2), Joan Coromines' *Diccionari etimològic i complementari de la llengua catalana*, the *Diccionario de la lengua española* (RAE/ASALE) with Navarro Tomás' *Manual de pronunciación española* and Hualde's *The Sounds of Spanish* for the American Spanish varieties, the *Grande Grammatica Italiana di Consultazione* and Rohlfs' *Grammatica storica* for Italo-Romance, and the *Dictionnaire de la langue française* (Trésor de la Langue Française) plus Walter's regional-French studies. For Uruguayan/Rioplatense žeísmo–šeísmo I rely on Lipski, *Latin American Spanish*, and for Québec affrication on Dumas, *Nos façons de parler*.

## Issues found
### 1. `ca_va` — star — Valencian uses Catalan "estrella" with palatal /ʎ/, not the Portuguese/Galician single-⟨l⟩ form
- **File:** `words/star.js` — code `ca_va`
- **Current:** ["estrela","esˈtɾela"]
- **Expected:** ["estrella","esˈtɾeʎa"]
- **Why:** The form ["estrela","esˈtɾela"] is the Ibero-Romance **Galician/Portuguese** reflex (single ⟨l⟩ = /l/, from *STĒLLA* with degemination to /l/). Valencian is a Catalan variety: the *Diccionari normatiu valencià* (AVL) and DIEC2 give **"estrella"** with the geminate-derived palatal lateral /ʎ/, exactly as the general Catalan entry in this same corpus lists (`ca` = ["estrella","əsˈtɾeʎə"]). Standard Valencian conserves the phonemic /ʎ/ (it does **not** have general yeísmo), so the pronunciation is /esˈtɾeʎa/, not /esˈtɾela/. Both the orthography (missing ⟨ll⟩) and the IPA (plain /l/ for /ʎ/) are wrong here — the cell appears to have been imported from the Portuguese/Galician "estrela".

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
