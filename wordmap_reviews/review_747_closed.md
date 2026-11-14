# Review 747 — rally 2026-11-14/15, round 10, regression of all UI changes + RTL first paint

Re-verified every UI claim of rounds 1–9 together (presence of ~90 patches + ~70 browser assertions); the pronunciation panel,
changed by three rounds, works as one (Tab order, Escape layers, history, legends, highlight). Smoke: 150 page loads (25 pages ×
en/ja/ar × 1440/390), 0 errors, 0 failed requests, no overflow.
Applied: Name/Time Map popup dialog name follows a UI switch and a date step (r04/07 and r08/10 clashed: German popup named in
English, Time Map popup named with yesterday's date); ar/he pages lay out right-to-left from the first paint (nav-short.js early
guess sets <html lang>/dir; header URL uses margin-inline-start; Name/Time panels dir at parse) — CLS index ar 0.743 → 0.027,
namemap 0.207 → 0.007, timemap 0.207 → 0.019; lang_names_shim sends zh-TW/zh-Hant browsers to zh, not yue (as the pages do).
Held: Name Map — a pasted link with another l= while a popup is open is treated as Back (predates the rally).
