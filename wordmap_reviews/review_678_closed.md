# Review 678: cells whose Wiktionary entry lacks the concept

2026-11-09. Every cell whose surface is a Wiktionary headword in the row's language (30,167 surfaces) was checked for a sense naming the concept or a listed synonym (~/langmap-work/glosscheck: scan.py, cmp.py). 1,087 had none; inflected forms (381), empty glosses (68), romanizations (51) and sibling glosses for older brother were set aside, leaving 568. Three agents (p, q, r) read each cell's line, note and row and gave verdicts with sources (verdicts.jsonl): 556 keep, 7 change, 4 note, 1 remove.

Changed:
- Urhobo horse esi → iyesi (Ukere's dictionary: iyési horse, esi pig).
- Yao moon lwesi → mwesi (lwesi is moonlight).
- Bororo head ao → aora (ao is hair; Wiktionary and ASJP).
- Hupa sleep mił → xokiwung 'he is asleep' (Golla 1996); mił is the postposition 'with it'.
- Mauritian Creole uncle mama → tonton, route one as French; mama is mother.
- Akkadian head 𒊕𒆕 (SAG.KAK, 'triangle') → 𒊕𒁺 SAG.DU; father 𒀊 (AB, 'sea') → 𒀀𒁍 a-bu.
- Haryanvi butterfly पटबीजणा is the firefly (Wiktionary; Rekhta). No Haryanvi butterfly word was found and the validator does not allow "—" for a living language, so the cell now holds Hindi तितली with a note saying so.

Notes added for double meanings: Kikuyu snow/yesterday ira, Nivkh daughter оӻла (Wiktionary child, son), Yurok wonewsleg sun and moon, Acehnese boh fruit and egg.

Weak keeps for a later look: Mooré wheel karga, Huli nose ngui (body count 15), Yukaghir new илльэ, Nùng father pá, Wallisian white hina, Kaskaskia daughter, Mende rain nja, Mizo thunder khawpui, Arpitan tea tè.

Addendum, the 381 form-of flags: nearly all are alternative spellings or script forms the rows use on purpose (Tifinagh, Akhar Thrah, Cree syllabics, Devanagari Pali). Of the 19 Wiktionary calls obsolete or dated: Kimbundu head mutue → mutwe and water menha → menya (the row already writes w and ny elsewhere). Isoko's eleven 'dated' spellings are the Bible orthography the whole row follows, and Huasteca Nahuatl's cahuayo and cuahuitl match that row's colonial-style spelling; both left.

Addendum, the nine weak keeps (agent w, sources in ~/langmap-work/glosscheck/w/dl1):
- Mooré wheel karga → naoore (SIL Mooré dictionary: naoore 'foot, leg, paw, wheel of a vehicle'; karga only leg, foot); recorded in implausible_polysemy_check ACCEPTED.
- Arpitan tea tè → tê (Stich: thé = tê; tè is the pronoun).
- Mizo thunder khawpui kept, note now cites Lorrain & Savidge 1898 khaw-pui ri 'thunder' and the city sense.
- Kept with sources: Huli ngui (Lomas 1988: 15 = nose), Yukaghir илльэ (NorthEuraLex NEW), Nùng pá (Tày–Việt dictionary 'pá mé' father and mother), Wallisian hina (Rensch 1984 'blanc'), Mende nja (Schön 1884 'rain', also water), Kosraean acn.
- Also from the form-of list: Māori daughter tamāhine is the plural; now tamahine.
