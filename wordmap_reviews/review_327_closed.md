# Wordmap review #327 — Dravidian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. S. Kāmatchi-Rao, a descriptive/comparative Dravidianist. My review is anchored in Burrow & Emeneau's *Dravidian Etymological Dictionary* (DEDR, 2nd ed.) as the master etymological control, cross-checked against Krishnamurti's *The Dravidian Languages* (CUP 2003). For the individual languages I rely on: Emeneau, *Kodagu Grammar* and *Kodagu Dictionary*; Bhat & Upadhyaya on Tuḷu; Sridhar's *Kannada* and Steever's Telugu/Tamil sketches; Asher & Kumari, *Malayalam*; Israel, *A Grammar of the Kuvi Language*; Burrow & Bhattacharya on Gondi/Pengo; Grignard's *An Oraon–English Dictionary* and Hahn's *Kurukh Grammar* for the Northern branch; and Sir Denys Bray's *The Brāhūī Language*. Numerals were checked against DEDR 474 (*iraṇṭu* "two"), pronouns against DEDR 1/*yān/nān* and *nīn*, "name" against DEDR 4410 (*peyar*), and "star" against DEDR 2646 (*cukka*).

## Issues found

### 1. `kru` — two — wrong Devanagari grapheme (retroflex flap for a stop)
- **File:** `words/two.js` — code `kru`
- **Current:** ["एन्ड़","eːɳɖ"]
- **Expected:** ["एण्ड","eːɳɖ"]
- **Why:** Kurukh "two" is *ēnd* (DEDR 474 *iraṇṭu*; Grignard, Hahn), whose cluster is the retroflex nasal+stop **ṇḍ**, consistent with the supplied IPA `eːɳɖ`. The written form uses **ड़** (ḍa with nuqta), which in every Devanagari-based Kurukh orthography denotes the retroflex **flap ɽ/ṛ** — a distinct phoneme in Kurukh — so एन्ड़ reads *eːnɽ* and contradicts its own IPA. The stop should be plain **ड** in the cluster ण्ड, i.e. एण्ड. This is a grapheme error (flap ↔ stop), not a stylistic variant.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
