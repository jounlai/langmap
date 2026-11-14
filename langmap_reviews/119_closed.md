# LangMap データレビュー #119 — rally 2026-11-14 round 8 (nap scn vec fr fr_qc fr_af fr_be fr_ch oc ca es_eu es_mx es_co es_cl es_ar es_cu es_pe es_an lad gl pt_eu pt_br ro)

Reviewer drafts: ~/langmap-work/rally1114/r08/a1 (lm_fix.json, 304: orthography 137, segment 103, role 48, translation 16).
## Applied (304)
- 147 missing join marks (French "J' ai", "d' ici", "donnez -moi", "Pourriez -vous"; es/gl/pt/lad/vec/ca/oc/ro clitics
  "muéstre me", "dê -me", "dați -mi"; elisions "d' acqua", "n' esperienza") — each cut by a mechanical splitter
  (f3c18c05b 1d60467c7 de42d43fd aefe7d5c7); 28 marks removed from free words ("encontrarla contraseña", "enla próxima").
- Family swaps: #87 copula (23 rows), #31 Monday (14), #9 (scn oc ca ro lad), #33 (nap scn lad gl), #28 ro.
- #35 word order damaged by the re-segmenter df87a81d7 ("mese 'o passato") restored in nap scn vec lad gl.
- Role scrambles traced in history (fr_af/fr_be #24, es_ar #51, pt_br #18, vec #29 #52 #78 #85, #72, oc, fr_be #10, es_pe/es_an
  #95); splits with sibling precedent; text: fr_be #74 #79, fr/fr_ch Puis-je, es_mx #29, gl #49 #77, oc #77 #24 #96, nap #96;
  probable: #46 auxiliary/participle letters, gl/pt contractions, #58 "this", pt_eu soalheiro, lad #23 #93 #19, es_an.
## HOLD
- vec #21 "senar la sena" (review 96); es_pe #86 "pe"; #34; scn #69, vec #29, oc #79, scn #96, vec #30, fr_af #15.
