# TimeMap Review 01 — HNT round 1

**Date:** 2026-10-15. First review TimeMap has had.
Calendars greg_va greg_uk greg_us greg_jp japanese roc juche buddhist chinese
dangi hebrew: 8 patches (5 accepted, 3 amended).
- **Bug fixed:** the Japanese calendar printed "令和NaN年" (and 大正/昭和/平成)
  on the first day of every era, because ICU returns the year as 元; the
  engine now handles it (tested on 1912, 1926, 1989, 2019 changeovers).
- roc/juche: Juche years were dropped by North Korea in October 2024 — notes
  updated to the past tense; greg_uk (Scotland used 1 January from 1600),
  greg_us (1752 applies to the British colonies only), buddhist wording.
UI languages ja ko zh yue: 20 wording fixes in month/date strings.

## Round 2
Calendars (11): islamic — official in Saudi Arabia, with salaries on the
Gregorian calendar since 2016; persian — the year begins on the equinox DAY
(the before/after-noon Tehran rule), not at the exact moment; indian clean
(one Hindi Gazette spelling held, PDF unreadable); bengali …
UI languages vi th id hi: 23 fixes (22 accepted, 1 amended).

## Round 3
Calendars pawukon kurdish akan iceland bahai parsi bohra kiche tibetan
mongolian bhutanese — nine clean (Galungan 2025/26, Tsagaan Sar/Losar,
Navroz 2023–28, Akwasidae checked against the engine), 2 fixes.
UI languages de fr it es: 41 fixes (40 accepted, 1 amended).

## Round 4
Calendars myanmar khmer yuan ming qing ryukyu korean_empire joseon nguyen koki
rattanakosin: 12 fixes — yuan and joseon start dates; the Khmer year is one
ahead of the Thai count only from Visak Bochea to 31 December; myanmar clean
against Yan Naing Aye's mmcal.
UI languages pt ru uk ar (never reviewed before): 58 fixes, 52 of them 13
stale fields × 4 languages that had not followed later English edits.

## Round 5
Calendars iran_imperial french_rep egyptian roman byzantine aztec maya: five
clean; french_rep note — only half the month names are weather words, and
Romme's leap rule was proposed in 1795 and never adopted.
UI languages he sw: 37 fixes.

## The five rounds together
All 51 calendars and all 18 UI-language files reviewed: 229 patches applied;
one real engine bug (Japanese era first year printed NaN) fixed.

## Date-engine cross-check (2026-10-15)
Every day 1950–2050 rendered and compared with reference libraries
(~/langmap-work/tmcheck/, findings ~/langmap-work/hnt2/tm_findings.md):
hebrew, persian, coptic, ethiopic, julian, maya, indian — 0 differences.
- dangi: Korea's own leap months and midnight new moons were wrong (2017
  윤5월; 2005-12 started a day early) — now on KASI's month table 1900–2050.
- islamic: ICU's Umm al-Qura data is right only 1420–1450 AH (1999–2029);
  outside it ICU starts many months a day late. Now on R. H. van Gent's Umm
  al-Qura table for 1356–1500 AH (1937–2077; identical to hijridate, and the
  KACST rules checked against the moon at Mecca); ICU outside. Note updated
  (in advance, may shift by a day after a sighting, pre-1937 approximate).
- bahai, french_rep, chinese: the engine is right — the differences were
  bugs in convertdate (Ayyám-i-Há in leap years; an inconsistent year 200)
  and lunardate (1954-11, 1978-09; HKO tables agree with the engine).
