# Review 870 — today's 42 words against their rows' own spelling-to-IPA tables

2026-11-28. Follows review 869.

## Method
- `tools/ipa_outlier_check.js` learns each row's spelling-to-IPA table from its own cells and flags the cells that break it. Across the whole map it flags 2,333 cells in 367 rows; 106 of them are in the 42 words added today.
- I read all 106 against the rest of their row.

## Findings
- **Not defects (about 90):** the learned table is wrong, and the row's majority agrees with the new cell:
  - Fijian prenasalised b/d (mb, nd) in all 36 cells;
  - Kinaray-a, Ibanag and Tzotzil write the initial glottal stop;
  - Yurok ue = /u/;
  - Kalam's epenthetic ə;
  - Akan, Fon and Mauritian nasal vowels;
  - Gusii, Khasi and Mohawk vowel quality;
  - Tswana and Sesotho stress marks (already mixed in the rows).
- **Fixed:**
  - cold, Acehnese sijuek: siɟuək → siɟuəʔ. The row writes final k as ʔ (sit duek duəʔ, tree bak baʔ).
  - **Ibanag geminates:** the row had both doubled letters and ː, half each. All are now ː, as in the new cells: egg ʔilːuk, four ʔapːaʔ, one tadːaj, red ʔuzːin, thanks mabːaloʔ, three talːu, wind padːaɡ, spider taɡːalawa.
  - **Greenlandic geminates:** cheese imːusːuaq and paper papːiala, like the other 19 cells of the row.
- **Held:** Proto-Semitic writes many cells in transliteration (š, ṣ, ḥ, ḳ, y, ā) and some in IPA (ʃ). Converting only š would leave the row half-converted, and the emphatics need a decision of their own. Left for a separate review of the proto rows.

11 cells changed.

CLOSED.
