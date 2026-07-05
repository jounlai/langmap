# Wordmap review #341 — Other Indo-European (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Móirín Ó Súileabháin, a comparative Indo-Europeanist specializing in the fragmentary Italic and Anatolian corpora and the peripheral IE branches (Celtic, Armenian, Indo-Aryan, Tocharian). For this review I lean on Untermann's *Wörterbuch des Oskisch-Umbrischen* (2000) and Buck's *Grammar of Oscan and Umbrian* (1928) for the Sabellic languages; de Vaan's *Etymological Dictionary of Latin and the other Italic Languages* (2008); Kloekhorst's *Etymological Dictionary of the Hittite Inherited Lexicon* (2008); Adams' *Dictionary of Tocharian B* (2013) and Malzahn's *Tocharian Verbal System*; Mažiulis' *Prūsų kalbos etimologijos žodynas* for Old Prussian; Matasović's *Etymological Dictionary of Proto-Celtic* (2009); and the *EDAL/Orel* and Demiraj for Albanian. I cross-checked every cell against its native orthography and the standard broad-IPA conventions used for reconstructed vs. attested material.

## Issues found

### 1. `osc` — star — form not attested in the Oscan corpus; phonologically malformed reflex
- **File:** `words/star.js` — code `osc`
- **Current:** ["stéla","stela"]
- **Expected:** ["—","—"]
- **Why:** There is no attested Oscan word for the celestial "star." The Oscan corpus (Tabula Bantina, Tabula Agnonensis, curse tablets, the Cippus Abellanus, dedicatory and magistratal inscriptions) yields administrative/religious vocabulary only and contains no astronomical lexeme. More decisively, "stéla" is phonologically impossible as an Italic reflex of the word for star: PIE *h₂stḗr gives Latin *stella* < *sterla*, retaining the *-r-*; a genuine Oscan reflex would show the *ster-* cluster (cf. Umbrian, Faliscan, Venetic — all correctly marked "—" here for exactly this reason). The r-less "stéla" instead matches the Greek loan στήλη 'stele, upright slab/pillar' — a wrong sense (pillar, not star) and/or a fabrication modeled on Latin *stella*. Consistent with the sister Sabellic/Italic fragmentary languages in this same dataset, this cell should carry the deliberate-unattested marker.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
