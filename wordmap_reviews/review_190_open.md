# Wordmap review #190 — Indigenous Americas & isolates: eu, ka, kl, nv, gn, qu/quy/quz/cqu, nci/nch/ngu/nhe/nhw/nhx across all 20 word files

## Reviewer self-introduction (ペルソナ自己紹介)

Cross-cutting auditor for Indigenous Americas & isolates (Nahuatl, Quechua, Navajo, Guaraní, Basque, Georgian, Greenlandic), working from Launey 2011 (Classical Nahuatl), Estigarribia 2020 (Paraguayan Guaraní), Adelaar & Muysken 2004 (Andes), Young & Morgan 1987 (Navajo), Fortescue 1984 (West Greenlandic), Hualde & Ortiz de Urbina 2003 (Basque), against the live words/*.js and the closed-review adjudications (#19, #65, #128).

*Scope: Indigenous Americas & isolates: eu, ka, kl, nv, gn, qu/quy/quz/cqu, nci/nch/ngu/nhe/nhw/nhx across all 20 word files. Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `nci` — love — ipa 【確実】
- **File:** words/love.js
- **Current:** `["tlazōhtla", "tɬasoːtɬa"]`
- **Proposed:** `tɬasoːhtɬa`
- **Why:** Classical Nahuatl tlazōhtla 'to love' contains the saltillo ⟨h⟩ between ⟨ō⟩ and ⟨tla⟩ (Launey 2011 §1.4), exactly parallel to nci thanks tlazōhcāmati. The nci convention for ⟨h⟩-saltillo was adjudicated as the fricative [h] in closed review #19 and left intact by the wave-12 Nahuan reviewer — and is realized that way in this very file's sibling: thanks.js:530 nci = tɬasoːhkaːmati. But the love.js IPA drops the saltillo entirely (tɬasoːtɬa, no [h] and no [ʔ]), making it both internally inconsistent with the nci column's own thanks form and out of line with the daughter dialects (nch/nhw/nhe/ngu all carry the glottal: tɬasoʔtɬa). The [h] should be restored: tɬasoːhtɬa.
- **Worker round-1:** APPLIED ✅ — Certain. Current matched ["tlazōhtla","tɬasoːtɬa"]. Saltillo ⟨h⟩ between ō and tla was dropped; restored as [h] per closed review #19 and the file's own nci thanks form tɬasoːhkaːmati. Applied tɬasoːhtɬa.

### 2. `eu` — thanks — ipa 【蓋然】
- **File:** words/thanks.js
- **Current:** `["eskerrik asko", "esˈkerːik ˈasko"]`
- **Proposed:** `esˈkerik ˈasko`
- **Why:** Basque phonemically contrasts the tap /ɾ/ (single ⟨r⟩) with the trill /r/ (⟨rr⟩); orthographic ⟨rr⟩ in eskerrik is the alveolar trill, conventionally transcribed [r], not a geminate/long tap [rː] (Hualde & Ortiz de Urbina 2003, A Grammar of Basque, ch. on phonology). The eu column already uses the tap [ɾ] for single ⟨r⟩ elsewhere (ilargi → ilaɾɣi, moon.js). Rendering ⟨rr⟩ as length [rː] conflates gemination with the manner contrast that actually distinguishes the two Basque rhotics; the standard transcription is [esˈkerik].
- **Worker round-1:** APPLIED ✅ — Confirmed current ['eskerrik asko','esˈkerːik ˈasko']. Basque contrasts tap /ɾ/ (⟨r⟩) vs trill /r/ (⟨rr⟩); ⟨rr⟩ is trill [r], not geminate [rː]. Replaced rː with r. Applied esˈkerik ˈasko (proposal gave bare ipa string; surface preserved).

---

## Worker round-1 response (作業者)

Findings: 2 · applied 2 · rejected 0 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing. **File status: OPEN** — reviewer round-2 pending.
