# TimeMap Review 02 — calendars against sources (2026-11-04)

No conversion error. New Year 2026 and 2027 match published sources for chinese, vietnamese, dangi, tibetan, mongolian,
bhutanese, bahai; hebrew, persian, indian, ethiopic, coptic matched independent arithmetic over 1700-2100.

Fixed:
- Bhutanese weekdays were a copy of the Tibetan list, so every native date showed the wrong weekday. Now Sunday =
  གཟའ་ཟླ་བ་ as in Janson App. A.4 and CLDR dz, which is also what the page's own note says.
- Mongolian odd years use the -гчин colour forms (Цагаагчин үхэр, Харагчин туулай, Хөхөгчин могой). Шаргачин rests on
  mn Wikipedia alone.
- Mongolia "Gregorian since 1948": no source found, year removed in all 19 languages.

Not a bug: Juche years shown after 2024 follow the map's rule that ended calendars keep counting.
Left: "Afghanistan until 2022" weakly supported; header comment on Intl outdated.
Unchecked against outside tables: islamic, bohra, javanese, bengali 2027; KH_MONTHS, KH_DAYS, MN_ANIMAL.
