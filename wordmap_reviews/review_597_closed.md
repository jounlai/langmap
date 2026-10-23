# Review 597 — single-thread rally, part 1: past error classes on existing data (2026-10-23)

Owner asked for a review rally that checks existing data against the kinds of
problems found before. Run in one thread (no agents), mechanical detectors first.

Fixed:
- ext we nusotrus: /nusoˈtɾus/ → /nuˈsotɾus/ (orthographic penult, like nosotros)
- tr olderbrother ağabey: /aːbej/ → /aːˈbej/ (Wiktionary tr-IPA; row marks stress on 97%)

Checked, no change:
- Spanish/Portuguese orthographic stress over all es*/pt*/ast/an/ext cells: the
  remaining hits are checker artefacts (hiatus, nasal vowels), Guinea-Bissau
  Kriol (its own spelling rules), lol 'jajaja', and pt sushi, which matches
  Wiktionary (Brazil final, Portugal initial). es_pr madre/padre mai̯/pai̯ is an
  owner ruling (owner_decisions_check 'owner-pinned-cells') and stays.
- Fixed-stress languages (pl/szl/csb penult; cs sk hu fi et lv is fo hsb dsb
  initial): Faroese loans (appilsin, kalkun, dopamin) and lv šokolāde/apelsīns
  are loan stress; szl dziynkuja initial; none has a source either way — left.
- yesterday/tomorrow 'same' consistency: clean.
- Routed cells with no explanatory note (20 words of this session): none.
- Stress-gap (rows ≥70% marked) on this session's words: 14 unmarked; only tr
  had a source.
- Cells disagreeing with Wiktionary tables (325, mostly script/diacritic
  noise): fi ukkonen ('thunder; thunderstorm') and xal оһтрһу (ru.wiktionary
  sense 2 'гром') confirmed; the rest are documented alternatives.

Detectors: ~/langmap-work/rally1023/{es_stress,fixed_stress,stress_gap,wikt_mismatch}.js
