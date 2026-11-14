# Review 744 — rally 2026-11-14, round 7, UI translations (19 UIs, 390 / 1440, RTL; 7 patches)

Applied: speaker row keeps the total when L1 is a range (Indonesian "L1 25M–40M, total 200M"; was "25M–40M" only); logo badge
tooltip / link name per UI language (was "Wordmap/HanMap/NameMap/TimeMap" everywhere); zh/yue panel label 语系/語系 (语族 means a
branch); tree top-level labels (Smaller families, Creoles and pidgins, Sign languages, Northwest Caucasian, Ainu) in 14 UIs; ar/he
panel word table no longer pushes the pronunciation column out (72–107 px); era help tooltip dir=auto for ar/he; SEO pages in
/es/ and /pt/ list the Word Order sentences in Spanish/Portuguese (es_mx/pt_br, as app.js since round 1).
Held: Han Map drawer labels cut at 390 in 7 UIs with the owner's 11px font (shorter labels vs wrapping vs wider pills); Han Map
reading-table headers in ru/es/fr/it at 390; ~100–158 tree branch labels still English per UI (needs a translation batch like
tree_names_i18n.js); German du/Sie mixed (19 du, 9 Sie; trivia_style/de.md says Sie); German "HanMap" vs "Hanzi-Karte"; za/zkt
script notes stale and internal; Han Map romanisation "authority" field English (vi "codified by Bộ Giáo dục (1651)" misleads);
Han Map region text; LTR panel word table at 1440 in headless; "↩ Plain map" translated as "flat map".
