# Review 598 — new country word China and new row Qingdao (2026-10-25)

Single-thread review of today's additions (20d34ca16 China, f0f1e3265 Qingdao).

Fixed:
- zu iShayina: route unknown → cina (Wiktionary iShayina: borrowed from English China).

Checked, no change:
- All 92 China cells routed 'unknown': fetched the Wiktionary page of each form.
  Only zu gives a chain for that language. jv Cina's chain is on the Old
  Javanese section, nds matched the German section, hy/hyw/dv/lt/shn give only
  the native make-up (չինք + -աստան, ސީނު + ކަރަ, kinas + -ija), haw is an
  rfe with a question mark; the Russian-identical Китай rows (lez os udm kpv
  myv lbe ab mdf) have no page naming Russian as donor. All stay unknown.
- zh_jiao 中国 tʂəŋ˨˩˧ kuə˥˥: MCPDict 青島 中 tʂəŋ1 (213), 國 kuə3 (55); 国 matches
  the row's germany cell.
- 21 uncertain China drafts dropped at acceptance (hsn ne xh hil tk mad bo ilo
  bik lmo tig hsb gv ltg lb xal sgs koi zh_nj …), listed in nw10/held.tsv.

- zh_nj China added as 中国 tʂoŋ˧˩ koʔ˥, tied to the row's 德国 koʔ˥.

Open:
- zh_nj row mixes MCPDict 南京 (山 ʂan, 手 ʂəu, 嘴 tsuəi: old retroflex) and 新南京
  vowels (德 təʔ, 黑 xəʔ, 百 pəʔ, 國 koʔ; 南京 has tɜʔ xɜʔ pɛʔ kuɛʔ). Needs one
  stated convention for the whole row; 国 in germany and china move together.
- Qingdao second sourcing pass (语保 1200-word survey) running.

Detector: ~/langmap-work/rev1025/ (unk_raw.json).
