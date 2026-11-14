# Time Map review 04 — rally 2026-11-14 round 8 (51 calendars, engine + 18 translations)

Applied 457 entries:
- 258 translated values restored: commit c40bd0994 (2026-11-04) rebuilt timemap_i18n/*.js from stale
  ~/langmap-work/timemap/i18n/*.json and silently undid the 2026-10-15 review rounds 1–5, r27/r32/r33 and trivia fact
  fixes in all 18 UI languages (Umm al-Qura paragraph in islamic.note, buddhist.used 1912, kiche.note dates, Bohra count,
  Hebrew month spellings, nav labels). Values taken from c40bd0994^; mongolian.used (the one intended change) kept.
- 198 translations that never followed the English corrections of 2026-10-15 brought in line (french_rep.note, egyptian.used,
  khmer.note/epoch, rattanakosin.used, qing.used, joseon.note, mongolian.note, bohra.note, persian.note, ja/ko/zh/yue Juche
  and ROC tense, greg_uk/greg_us/chinese/dangi). Drafted wording — no native has read it.
- Engine: Joseon year numeral 開國五百三年 (洪範十四條), not 五百零三年.
- The stale source JSONs in ~/langmap-work/timemap/i18n/ replaced by the corrected drafts (old ones in i18n_backup_1114/),
  so the next build no longer reverts them. timemap.html I18N_VERSION 9 → 10.
Checks: lunisolar new moons vs Meeus 1840–2100, Tibetan Losar 120/120 vs Janson, Tết 2028–2040, Persian noon rule 1925–2150,
Bahá'í Naw-Rúz, ~80 anchor dates; 51 calendars × 6 dates × 18 languages render clean.
Held: Tsagaan Sar vs Wikipedia (engine matches Janson); Persian 2124 (5-minute margin); yue Coptic month names; og:description
"Reiwa 8 …" goes stale in 2027; Joseon year 1 元年.
