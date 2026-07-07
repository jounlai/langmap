# Wordmap review #229 — Tibeto-Burman (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Tenzin Norzang-Klein, a descriptive/historical linguist working on Bodish, Qiangic, Rung and Burmish subgroups. My working references for this domain are Tournadre & Dorje's *Manual of Standard Tibetan* and Tournadre's *L'ergativité en tibétain* for Central Tibetan (Ü-Tsang) register and the ཁྱོད / ཁྱེད་རང plain-vs-elevated distinction; Jackson T.-S. Sun's *Aspects of the Phonology of Amdo Tibetan* (1986) and Roland Bielmeier's Amdo/Balti materials for the Amdo preinitial-conditioned preaspiration/devoicing of sonorants; Bettina Zeisler and the *CDTD* (Comparative Dictionary of Tibetan Dialects) for Ladakhi/Balti; Guillaume Jacques' *Dictionary of Japhug* and Jackson Sun's Caodeng/Situ rGyalrong work for Gyalrongic (incl. the tɯ-/tə- inalienable-noun prefix on "name"); Randy LaPolla for Dulong/Rawang (Nungish) and Qiang; James Matisoff's *Dictionary of Lahu* and STEDT for Loloish; Gwendolyn Hyslop's *A Grammar of Kurtöp* for East Bodish; and George van Driem's Kiranti grammars for Limbu/Thulung. My scrutiny here is heaviest on the Bodish and Qiangic cells, where preinitial reflexes are the most diagnostic and the most error-prone in broad-IPA renderings.

## Issues found
### 1. `adx` — name — unmotivated preaspiration on a plain sonorant onset
- **File:** `words/name.js` — code `adx`
- **Current:** ["མིང","hmɪŋ"]
- **Expected:** ["མིང","mɪŋ"]
- **Why:** In Amdo Tibetan the preaspiration/voicelessness of sonorant onsets (the "hC-" reflex) is strictly conditioned by a Written Tibetan preradical — a superscript (r-, l-, s-) or a prefix (g-, d-, b-, m-, ‘-). The data author applies this correctly elsewhere in the same column: two གཉིས → *hɲi* (from the g- prefix on ཉ) and star སྐར་མ → *hkarma* (from the s- superscript on ཀ). But མིང 'name' is bare m-i-ng with **no** preradical letter, so there is nothing to condition preaspiration; Amdo realizes it as a plain voiced /mɪŋ/ (cf. Central/Khams *miŋ*, Balti/Ladakhi *miŋ*). The *h-* here is an over-generalization of the preinitial rule to an environment that lacks the trigger (Jackson Sun 1986; Bielmeier). Correct to /mɪŋ/.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
