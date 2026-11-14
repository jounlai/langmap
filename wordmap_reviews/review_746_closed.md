# Review 746 — tree branch names in 14 UI languages (rally follow-up, 2026-11-14)

Applied: tree_names_i18n/{vi,th,id,hi,de,fr,it,es,pt,ru,uk,ar,he,sw}.js (1,644 entries: 1,601 branch labels that showed English,
43 that showed broken half-English text) in the existing window.TREE_NAME_I18N mechanism; tree.html loads the table for the UI
at boot and on every UI switch (the ko/zh/yue table was only loaded at boot: switching left 94–97 labels English). Fixed with it:
"X-based" creoles written word by word (ru "английский-на основе"), "(proposed)" left in English, Latin "Na-"/"Ta-Ne-" glued to
translated stems, Avar-Andic-Tsezic garbled, single de/vi/ru/uk forms.
Measured (Playwright, expand all): English branch labels 1,754 → 61; vi th hi ru uk ar he reach 0; the 61 left are names spelled
the same in that language (id Bantu, Kwa, Tai …; it/es/sw Australia, Eurasia; fr/pt Nivkh, Pidgins). Sources: en.wikipedia
interlanguage titles (231 pages), the site's lang_names, the x6 term tables.
Held: 58–66 direction compounds per UI garbled by translateMetaSmart (ru "западный Германская", es "Este Bantú"); High/Upper German
identical in 5 UIs; Bodic vs Bodish; sw Kiberiberi vs Kiberberi; Galician-Portuguese / Five Nations Iroquois naming; low-confidence
drafts (North Zaire River, Gallo-Rhaetian …). No native reader.
