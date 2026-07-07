# Wordmap review #204 — Dravidian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. R. Chandrashekaran, a descriptive/comparative Dravidianist working primarily from Bhadriraju Krishnamurti's *The Dravidian Languages* (Cambridge, 2003) for the reconstructed pronominal and numeral system, Burrow & Emeneau's *Dravidian Etymological Dictionary Revised* (DEDR) for cognate sets (esp. *cukka(N)* 'star' DEDR 2646, *peẟ* 'name' DEDR 4410, *iraṇṭu* 'two' DEDR 2551), and Sanford Steever's *The Dravidian Languages* (Routledge) for the family survey. For the smaller languages I rely on Emeneau's *Kodagu Dictionary* and *Kolami/Toda* work, Ferdinand Hahn/Grignard's *Kurukh Grammar* and *Oraon–English Dictionary*, M். B. Emeneau & Paul Hockings with Christiane Pilot-Raichoor's *A Badaga–English Dictionary* (Mouton de Gruyter, 1992), and Josef Elfenbein's Brahui materials. I cross-checked every cell for sense (singular informal pronoun vs. plural/honorific, cardinal vs. ordinal, common noun vs. proper name), script appropriateness, and broad-IPA plausibility.

## Issues found
### 1. `bfq` — name — spurious initial /h/ in IPA (Badaga has no h-phoneme)
- **File:** `words/name.js` — code `bfq`
- **Current:** ["esaru","hesaɾu"]
- **Expected:** ["esaru","esaɾu"]
- **Why:** Badaga systematically lost the initial /h/ that Kannada shows in loans/cognates and has no /h/ phoneme (Emeneau; Hockings & Pilot-Raichoor, *A Badaga–English Dictionary*, 1992): cf. Kannada *hāl(u)* → Badaga *ālu* 'milk', Kannada *hattu* → Badaga *attu* 'ten'. The word 'name' follows the same pattern: Kannada *hesaru* → Badaga *esaru* [esaɾu]. The native-orthography field correctly gives *esaru* (h-less), but the IPA field re-inserts the Kannada /h/ as "hesaɾu", contradicting the romanization and mis-transcribing the actual Badaga pronunciation. The internal cell mismatch should be resolved in favour of the h-less form.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
