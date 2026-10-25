# Review 599 — Korea (2026-10-25)

Single-thread review of 016e352dc (Korea, 246 cells).

Checked, no change:
- All 62 cells routed 'unknown': fetched the Wiktionary page of each form for
  that language. Only eo Koreio has an etymology (Koreo + -io), which gives the
  make-up, not the path; all stay unknown.
- The 26 Sinitic parity cells drafted before the classifier outage: every 国/國
  equals the same row's China cell (script check); yue_gz has no China cell.
- ko_kp 조선 (joseon): Wiktionary 조선 usage note — North Korea keeps 조선 for
  Korea. Map shows 조선 only on the Munhwa row.
- Display: Mandarin rows store 韩国 (simplified); the 韓 seen in a headless
  screenshot is a font fallback, not data.

Dropped at acceptance: kg Hangu (one stub), ar_gulf r1 (uncertain), zh_nj
(open row question, review 598), zh_wh (韓 read off homophone 寒), nan_ph
(Quanzhou table standing in for Philippine Hokkien).
Corrected at acceptance: de koˈʁeːa (row writes final a short), yi kɔˈrɛə.
