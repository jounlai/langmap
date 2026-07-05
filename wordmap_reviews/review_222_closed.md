# Wordmap review #222 — Romance (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Aurèli Benazet, a descriptive/historical Romance linguist specializing in Ibero-Romance and Gallo-Italic dialectology. For this review I lean on Max W. Wheeler, Alan Yates & Nicolau Dols, *Catalan: A Comprehensive Grammar* (Routledge) and the Acadèmia Valenciana de la Llengua's *Gramàtica normativa valenciana* and *Diccionari normatiu valencià* for Catalan/Valencian; José Ignacio Hualde, *The Sounds of Spanish* (CUP) and John M. Lipski, *Latin American Spanish* (Longman) for the Spanish diasystem (voseo geography, Caribbean coda-/s/ aspiration and deletion, rioplatense žeísmo/šeísmo); Maria Helena Mira Mateus & Ernesto d'Andrade, *The Phonology of Portuguese* (OUP) for EP/BP; Michel Contini's *Atlas linguistique de la Corse* and Michele Loporcaro, *Profilo linguistico dei dialetti italiani* (Laterza) for Italo-Romance (Neapolitan, Sicilian retroflex ⟨-ll-⟩ > [ɖː], Ligurian, Venetian); and Liddicoat's grammar of the Norman of the Channel Islands for Guernésiais/Jèrriais. I checked every cell for sense (subject-pronoun vs. oblique, cardinal vs. ordinal, informal vs. honorific 2sg), native orthography, and broad IPA plausibility.

## Issues found

### 1. `ca_va` — i — Valencian ⟨j⟩ is an affricate, not a palatal approximant
- **File:** `words/i.js` — code `ca_va`
- **Current:** ["jo","ˈjɔ"]
- **Expected:** ["jo","ˈd͡ʒɔ"]
- **Why:** The spelling "jo" is correct, but the IPA is a wrong segment. The very feature that defines Valencian against Central Catalan for word-initial ⟨j⟩ / soft ⟨g⟩ is that Valencian **preserves the voiced postalveolar affricate [d͡ʒ]** where Central Catalan (cf. `ca` = ˈʒɔ, correctly fricative) has [ʒ] (Wheeler, Yates & Dols 1999 §§2.3–2.4; AVL *Gramàtica normativa valenciana*, phonetics ch.). Valencian "jo" is [ˈd͡ʒɔ] in the general norm (and devoiced [ˈt͡ʃɔ] in apitxat) — never the palatal approximant [ˈjɔ], which would incorrectly imply a glide. Note this is unrelated to Valencian *iodització*, which affects only intervocalic [ʎ] from Latin -LY-/-C'L-/-T'L-, not initial ⟨j⟩ < EGO. Recommend [ˈd͡ʒɔ].

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
