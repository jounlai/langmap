# Wordmap review #198 — Austronesian (W) (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Alisa Wenceslao-Tan, a descriptive/comparative Austronesianist working primarily on the western Malayo-Polynesian (Philippine, Bornean, Sumatran) and western-Micronesian branches, with a comparative sideline in Formosan and western Oceanic. For this batch I lean on Robert Blust & Stephen Trussel's *Austronesian Comparative Dictionary* (ongoing) for cognate sanity-checking of reflexes of PAn/PMP *aku, *(i)kahu, *duSa/*duva, *ŋajan/*aran, and *bituqən; Lewis S. Josephs' *Palauan Reference Grammar* (1975) and the *New Palauan–English Dictionary* for Palauan; McKaughan & Macaraya's *A Maranao Dictionary* for Maranao; John Wolff's *Dictionary of Cebuano Visayan* and Wolff's Tagalog materials for Central Philippine; Alexander Adelaar's Malayic work and Uri Tadmor for Malay/Musi/Indonesian; and Paul Jen-kuei Li's Formosan reconstructions (Kavalan, Pazeh, Favorlang, Rukai) plus the online Amis and Kavalan dictionaries. My review targets sense mismatches, mis-segmented IPA, and truncated citation forms; I leave correct cells unremarked.

## Issues found

### 1. `pau` — two — truncated numeral (missing final -ng)
- **File:** `words/two.js` — code `pau`
- **Current:** ["eru","ʔəru"]
- **Expected:** ["erung","ʔəˈruŋ"]
- **Why:** The Palauan general/non-human cardinal series is *tang, erung, edei, euang, eim, elolem, euid, eai, etiu, tacher* (Josephs 1975; *New Palauan–English Dictionary*). The citation form of "two" is **erung**, with the final velar nasal; **eru** is a truncation and both the orthography and the IPA are missing the /-ŋ/. Correct broad IPA is [ʔəˈruŋ] (Palauan words carry a predictable initial glottal onset and "e" = /ə/).

### 2. `mrw` — two — wrong IPA segment (glottal stop for glide)
- **File:** `words/two.js` — code `mrw`
- **Current:** ["dowa","doʔa"]
- **Expected:** ["dowa","dowa"]
- **Why:** Maranao "two" is **dowa** (McKaughan & Macaraya, *A Maranao Dictionary*), spelled with medial ⟨w⟩ = the glide /w/, pronounced [dowa]. The transcribed [doʔa] inserts an intervocalic glottal stop that the orthography does not indicate and that Maranao does not have here — contrast the compiler's own star entry **bito-on** [bitoʔon], where the hyphen legitimately marks the glottal/hiatus. Native form is unchanged; only the IPA is corrected to [dowa].

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
