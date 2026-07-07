# Wordmap review #294 — Mongolic & Tungusic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. B. Otgonbayar, a comparative Altaicist (Mongolic + Tungusic) trained in the Poppe–Janhunen tradition. My working reference shelf for this review: Nicholas Poppe, *Introduction to Mongolian Comparative Studies* and *Grammar of Written Mongolian* (Written/Middle Mongol, Buryat); Juha Janhunen (ed.), *The Mongolic Languages* (Routledge, 2003) and his *Manchu: An Elementary Grammar*; the Monguoric material of Mostaert–de Smedt and Slater/Faehndrich for Mongghul/Mangghuer; Sečenčoɣtu for Eastern Yugur and Kim (2003) for Santa/Dongxiang. For Tungusic I lean on V. I. Cincius et al., *Сравнительный словарь тунгусо-маньчжурских языков* (ССТМЯ, 1975–77), Johannes Benzing *Die tungusischen Sprachen*, Onenko's Nanai (Xȯlȯlik) dictionary, Robbek/Cincius for Even, Nikolaeva & Tolskaya *A Grammar of Udihe* (2001), and Norman's *A Comprehensive Manchu-English Dictionary*. Reconstructed/fragmentary corpora (Khitan per Kane, Jurchen per Kiyose) are treated as reconstructions and left where internally consistent. Overall this is a carefully curated set: the Northern/Southern Tungusic 1sg split *bi* (Evenki/Even/Udege) vs *mi* (Nanai) is respected, the Ewenic *si* vs Even *hi* split is respected, and Even *ōsīkat* is correctly kept distinct from Evenki *ōsīkta*. I found one cell that fails that same standard.

## Issues found
### 1. `ude` — star — Udege form is an Evenki copy, not the Udihe reflex
- **File:** `words/star.js` — code `ude`
- **Current:** ["осикта","oˈsikta"]
- **Expected:** ["эсикта","ǝˈsikta"]
- **Why:** The Udege cell is byte-identical to the Evenki cell (`осикта / oˈsikta`), which is the tell-tale signature of a copy from the neighboring Northern-Tungusic row rather than an independent Udihe attestation. Udege (Udihe) is not Ewenic; it belongs to the Udege–Oroch subgroup and shows a **front/central vowel reflex** of Proto-Tungusic *\*ōsī-kta* "star". Cincius (ССТМЯ) reconstructs *\*ōsī(kta)* with Evenki ōsīkta, Even ōsīkat, Negidal/Oroch ōsikta, Nanai/Orok xōsakta, Manchu usiha, but the **Udihe reflex has the front vowel** (эсикта ~ эхикта, with the regular Udihe medial *\*s* > h lenition also attested). The identical *o*-initial `осикта` therefore cannot be the genuine Udihe form. Correcting to эсикта / ǝˈsikta restores the front-vowel reflex; note the medial may surface as -h- (эхикта) in Nikolaeva–Tolskaya's orthography. (Verdict: PLAUSIBLE — the initial-vowel correction is well supported; only the medial s/h spelling is source-dependent.)

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
