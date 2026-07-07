# Wordmap review #274 — Afro-Asiatic (non-Semitic) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Halima Yusuf-Adan, a descriptive/historical linguist specializing in Cushitic, Omotic, Chadic and Berber (with a working knowledge of Egyptian-Coptic and the Neo-Aramaic islands that fall inside this batch). My working reference shelf for this review: for Cushitic, Saeed's *Somali Reference Grammar* and Zaborski's pronominal studies, Mous's Cushitic overview, Parker & Hayward's *Afar–English–French Dictionary*, Reinisch/Roper/Wedekind for Beja, and Ongaye Oda Orkaydo's *A Grammar of Konso*; for Omotic, Wakasa's *A Descriptive Study of the Modern Wolaytta Language*, Lamberti & Sottile's *The Wolaytta Language*, and Hayward's work on Aari and Omotic numerals; for Chadic, Newman's *The Hausa Language*, Frajzyngier's *A Grammar of Hdi*, and Ebert on Kera; for Berber, Naït-Zerrad, Kossmann, and Heath's Tuareg/Tamasheq grammar; for Egyptian-Coptic, Allen's *Middle Egyptian* and Layton's *Coptic Grammar*; and Arnold (Maaloula) plus Jastrow/Khan for the Neo-Aramaic entries. I checked each 1SG/2SG pronoun for register (independent vs. clitic, and against honorific/plural intrusion), each numeral for cardinal-vs-ordinal sense, and each IPA cell for segment fidelity to the language's actual phoneme inventory.

## Issues found
### 1. `wal` — name — spurious aspirated stop for a geminate
- **File:** `words/name.js` — code `wal`
- **Current:** ["sunttaa","suntʰaː"]
- **Expected:** ["sunttaa","suntːaː"]
- **Why:** Wolaytta (Omotic) has no aspiration contrast in its stop series (Wakasa 2008; Lamberti & Sottile 1997): the phonemic oppositions are plain vs. ejective (e.g. *t* ~ *tʼ*, the latter written *x*) and singleton vs. geminate. The orthographic ⟨ntt⟩ in *sunttaa* is /n/ + geminate /tː/, not an aspirate; /tʰ/ is simply not a Wolaytta phoneme. This is confirmed internally by the same language's `star` cell (*xoolinttee* → /tʼoːlintːeː/), which correctly renders the ⟨ntt⟩ cluster as /ntː/. The `name` cell should match: /suntːaː/.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
