# Review 856 — Script filter = the script on the map (owner: 「他にもたくさん似たケースがあるよ」)

2026-11-27. Follows review 855.

## The rule
Review 855 still let a tag stand when the language uses that script anywhere, even though the map doesn't show it. Under that rule Old Malay stayed under Brahmic, Malay under Arabic and Serbian under Latin, and every one of them showed something else on the map. That is the same mismatch the owner reported for Kusunda.

The chip now means **the script you see on the map**. Everything a language has been written in stays in `meta.script` and on the language card.

## Changes (158 rows)
Five rows were set by hand:
- sat (Ol Chiki) → Other
- vai (Vai script) → Other
- otk → Old Turkic
- ttq → Latin
- ium → Latin

Luwian: Cuneiform dropped; it is not on the map.

Rows whose cells are in a script the detector cannot see keep their tags: got, ave, phn, gmy, xpu, xsa, xmr, zkt, pal, myz, dv.

- ayl: Arabic-derived, Latin → Arabic-derived
- blk: Brahmic, Latin → Brahmic
- ms: Latin, Arabic-derived → Latin
- iru: Brahmic, Latin → Latin
- trm: Arabic-derived, Latin → Latin
- sw: Latin, Arabic-derived → Latin
- tl: Latin, Brahmic → Latin
- mn: Cyrillic, Mongolian-derived → Cyrillic
- sah: Cyrillic, Latin → Cyrillic
- evn: Cyrillic, Latin → Cyrillic
- enf: Cyrillic, Latin → Latin
- ykg: Cyrillic, Latin → Cyrillic
- niv: Cyrillic, Latin → Cyrillic
- aiw: Ethiopic, Latin → Latin
- sgw: Ethiopic, Latin → Ethiopic
- mg: Latin, Arabic-derived → Latin
- ain: Latin, Kana → Kana
- lzz: Georgian, Latin → Georgian
- bft: Tibetan, Arabic-derived → Tibetan
- lbj: Tibetan, Latin → Tibetan
- yiz: Latin, Yi → Latin
- sd: Arabic-derived, Brahmic → Arabic-derived
- pa: Brahmic, Arabic-derived → Brahmic
- tg: Cyrillic, Arabic-derived → Cyrillic
- ku: Latin, Arabic-derived → Latin
- az: Arabic-derived, Latin → Latin
- azb: Arabic-derived, Latin → Arabic-derived
- kk: Cyrillic, Latin → Cyrillic
- uz: Cyrillic, Latin → Latin
- ha: Latin, Arabic-derived → Latin
- wo: Latin, Arabic-derived → Latin
- sr: Cyrillic, Latin → Cyrillic
- lad: Latin, Hebrew → Latin
- iu: Canadian Aboriginal Syllabics, Latin → Canadian Aboriginal Syllabics
- non: Other historical, Latin → Latin
- pi_edu: Latin, Brahmic → Latin
- tru: Syriac, Latin → Syriac
- hit: Cuneiform, Hieroglyphs → Cuneiform
- nci: Hieroglyphs, Latin → Latin
- emy: Hieroglyphs, Latin → Latin
- ko_mid: Han, Hangul → Hangul
- ko_em: Han, Hangul → Hangul
- mad: Arabic-derived, Brahmic, Latin → Latin
- ff: Latin, Arabic-derived, Other → Latin
- bm: Arabic-derived, N'Ko, Latin → Latin
- snk: Latin, N'Ko, Arabic-derived → Latin
- mwk: Latin, N'Ko → Latin
- kab: Latin, Tifinagh, Arabic-derived → Latin
- cr: Canadian Aboriginal Syllabics, Latin → Canadian Aboriginal Syllabics
- udi: Cyrillic, Latin → Cyrillic
- adi: Brahmic, Latin → Latin
- nag: Brahmic, Latin → Latin
- min: Latin, Arabic-derived → Latin
- ban: Brahmic, Latin → Latin
- ace: Latin, Arabic-derived → Latin
- bug: Brahmic, Latin → Latin
- mdr: Latin, Brahmic → Latin
- aa: Arabic-derived, Latin → Latin
- shi: Tifinagh, Latin, Arabic-derived → Tifinagh
- rif: Tifinagh, Latin, Arabic-derived → Tifinagh
- shy: Latin, Tifinagh → Latin
- ks: Arabic-derived, Brahmic → Arabic-derived
- kok: Arabic-derived, Brahmic, Latin → Brahmic
- dng: Cyrillic, Arabic-derived, Latin → Cyrillic
- rue: Cyrillic, Latin → Cyrillic
- rup: Greek, Latin → Latin
- vep: Cyrillic, Latin → Latin
- crh: Cyrillic, Arabic-derived, Latin → Latin
- tt: Cyrillic, Latin → Cyrillic
- krc: Cyrillic, Arabic-derived, Latin → Cyrillic
- lis: Other historical, Latin → Latin
- nxq: Other historical, Latin → Latin
- kr: Latin, Arabic-derived → Latin
- dyu: Arabic-derived, N'Ko, Latin → Latin
- sus: Arabic-derived, N'Ko, Latin → Latin
- rhg: Arabic-derived, Brahmic, Latin → Latin
- ctg: Arabic-derived, Brahmic → Brahmic
- doi: Brahmic, Arabic-derived → Brahmic
- cja: Arabic-derived, Latin → Arabic-derived
- cjm: Brahmic, Latin → Brahmic
- brh: Arabic-derived, Latin → Arabic-derived
- bbc: Brahmic, Latin → Latin
- bjn: Latin, Arabic-derived → Latin
- sas: Brahmic, Latin → Latin
- mrw: Arabic-derived, Latin → Latin
- tsg: Arabic-derived, Latin → Latin
- bs: Latin, Cyrillic → Latin
- iba: Latin, Other → Latin
- ljp: Latin, Brahmic → Latin
- tzm: Tifinagh, Latin, Arabic-derived → Tifinagh
- tmh: Tifinagh, Latin, Arabic-derived → Tifinagh
- ttq: Latin, Tifinagh → Latin
- xal: Cyrillic, Mongolian-derived → Cyrillic
- mnk: Arabic-derived, N'Ko, Latin → Latin
- unr: Brahmic, Latin → Latin
- hoc: Brahmic, Other historical, Latin → Latin
- xpr: Aramaic-derived, Other historical, Latin → Latin
- xqa: Arabic-derived, Mongolian-derived, Latin → Latin
- sga: Other historical, Latin → Latin
- bsk: Arabic-derived, Latin → Latin
- yai: Cyrillic, Latin → Latin
- pcc: Han, Other historical, Latin → Latin
- ium: Han, Latin → Latin
- wbl: Cyrillic, Arabic-derived, Latin → Cyrillic
- nan_pn: Han, Latin → Han
- mra: Brahmic, Latin → Latin
- blt: Brahmic, Latin → Brahmic
- mdh: Arabic-derived, Latin → Latin
- gor: Arabic-derived, Latin → Latin
- mak: Brahmic, Latin → Latin
- tly: Latin, Cyrillic, Arabic-derived → Latin
- kaa: Latin, Cyrillic → Latin
- bej: Arabic-derived, Latin → Latin
- byn: Ethiopic, Latin → Ethiopic
- ssy: Arabic-derived, Latin → Latin
- xsc: Other historical, Latin → Latin
- omy: Brahmic, Latin → Latin
- osn: Brahmic, Other historical, Latin → Latin
- juc: Jurchen, Other historical, Latin → Latin
- pyx: Brahmic, Latin → Latin
- ocm: Brahmic, Latin → Latin
- sog: Aramaic-derived, Other historical, Latin → Latin
- mfa: Arabic-derived, Brahmic, Latin → Latin
- kjp: Brahmic, Latin → Brahmic
- pll: Brahmic, Latin → Latin
- grt: Brahmic, Latin → Latin
- wal: Ethiopic, Latin → Latin
- cms: Greek, Latin → Latin
- xht: Cuneiform, Latin → Latin
- bdk: Latin, Cyrillic → Cyrillic
- kjj: Cyrillic, Latin → Cyrillic
- kxv: Brahmic, Latin → Latin
- lhm: Tibetan, Latin → Tibetan
- xag: Other historical, Latin → Latin
- xfa: Other historical, Latin → Latin
- xib: Other historical, Latin → Latin
- xpg: Other historical, Greek, Latin → Latin
- xum: Other historical, Latin → Latin
- xve: Other historical, Latin → Latin
- bbl: Georgian, Cyrillic, Latin → Georgian
- kry: Cyrillic, Latin → Latin
- luz: Arabic-derived, Latin → Latin
- osc: Latin, Other historical → Latin
- qxq: Arabic-derived, Latin → Latin
- yug: Cyrillic, Latin → Cyrillic
- nan_xm: Han, Latin → Han
- nan_zz: Han, Latin → Han
- osa: Other, Latin → Latin
- bew: Arabic-derived, Latin → Latin
- hif: Brahmic, Latin → Latin
- rmt: Arabic-derived, Hebrew, Latin → Latin
- fia: Arabic-derived, Coptic, Latin → Latin
- tsj: Tibetan, Brahmic, Latin → Latin

## Guard
`tools/script_filter_tags_check.js` (in check_all):
- SHOWN: a script in ≥25% of the cells must be a tag.
- ONLY: every tag must be on the map, either a detectable script in ≥5% (or 3) of the cells, or an undetectable historical script while the cells are not mostly Latin.

The ATTESTED list from review 855 is gone.

0 violations.

CLOSED.
