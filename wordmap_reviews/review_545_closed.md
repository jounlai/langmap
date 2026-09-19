# Review 545 — the `foot` historical fill, a cell-level import checker, and the recodes stopped

Round 9. Six threads. Commits `a4f4e142`, `c68a82e8`, `9e5de2da`, `e5d42112`,
`7bbe14dc`. All 86 guards green at each one.

## What the round was for

The owner asked why `foot` has so few ancient languages when `hand` has many,
and why it is still marked experimental. The first question had a clean
answer: of the historical rows with no `foot` cell, 112 already had `hand`, so
the sources were never the obstacle. 95 cells were added across four threads
and historical coverage went 20 → 93 of 145 rows.

**The second question did not have the answer I gave.** I told the owner the
fill would let `partial: true` come off. It will not, and the measurement says
why: `foot` is missing from **781 modern rows that already have `hand`**.
Historical coverage is now 64%; modern coverage is 24% (251 of 1,043). The
ancient languages were the visible gap, not the big one. Recorded so nobody
re-derives it.

## The fourth route

`foot` gained `unknown`, the mechanism `we` already uses, for 13 rows with a
solid foot word and **no attested leg word at all**. Gothic is the clearest:
`fōtus` renders Greek πούς and nothing else, and σκέλος falls outside the
preserved text, so IDS leaves Gothic 4-350 blank. `distinct` would assert a
second lexeme the corpus does not have; `leg+foot` asserts the opposite just
as baselessly.

It paid for itself the same day. Lardil `jaa` was going to be held with no
cell — not for want of a foot word, but because no source prints a Lardil word
for 'leg', so both other routes would have been a claim. Having somewhere
honest to put the route is what let the word onto the map. All 13 are first
cells; nothing was moved in from a decided route. Ratcheted at 13.

## Findings that inference would have got backwards

- **`cu` / `orv` are leg+foot.** IDS files OCS `golěnĭ` under LEG, but golěnĭ
  is the shin; Derksen glosses *nogà 'foot, leg'. Reading the IDS pair at face
  value would have mis-coloured all of Slavic against the ru/uk/cs rows.
- **Phoenician-Punic is `pʿm`, not `rgl`.** Krahmalkov has no `rgl` noun at
  all. Sabaic *did* take `rgl`. A comparative-Semitic autofill gets exactly
  one of those two wrong and there is no way to tell which without opening
  both dictionaries.
- **All five Sinitic historical rows take 足, not 腳.** 說文解字 (121 CE) is
  in-period for `zh_han` and glosses 腳 as 脛, the shin. For `zh_tang`,
  `zh_song` and `zh_wenyan_edu` the reason is register: 腳 is live in Tang
  colloquial (Du Fu 北征 「垢膩腳不襪」), but those rows write 汝, 我等, 犬, 善,
  目, 食 — Classical Chinese in early-Mandarin phonology.
- **Hurrian 'foot' is `uri`.** `ugri` is the furniture word; Laroche cites it
  only of the feet of a table.
- **`hy_grab` is distinct where modern `hy` is leg+foot.** The merger is
  post-classical, so the two rows disagreeing is the finding.

## Two thread conflicts, adjudicated rather than papered over

- **`hit`: distinct → leg+foot.** The route was inherited, and it had been
  sitting on an EMPTY cell, so nothing ever displayed or checked it. Two
  threads reading Kloekhorst EDHIL 653 and CHD P 231 independently both make
  it one lexeme ("foot, leg" as the head gloss, leg as sense 2), and the
  separate `ektu-/egdu-` is attested only of animals.
- **`psem`: cell kept, reasoning replaced.** The comment had justified
  *rigl- by its "Arabic, Hebrew and Geʿez reflexes", and Militarev calls the
  Geʿez cognation "yet another mythetymology among Semitists". He also labels
  the etymon Common WEST Semitic and withholds his "→ Proto-Semitic" line.
  What licenses a Proto-Semitic row taking it is East Semitic: Akkadian
  `riglu` 'hoof, foot'.

Three rows arrived **byte-identical from two threads working independently** —
`p_ine *pṓds`, `p_sit *r-kaŋ`, `p_jpn *asi` — from different sources each
time. That is the strongest corroboration this method produces.

## The tone-import checker

Nine rows carried tone values belonging to a neighbour. The rule is not
similarity (es_uy/es_ar is 74 of 74 and correct) but **a contour appearing in
a row once, in a cell byte-identical to another row, while the row writes
something else everywhere in the same tone class**. A tone value is a property
of the lect, so a singleton is a fingerprint. 23 cells fixed, every
replacement derived from the importing row's own tone classes.

The `lo` case that motivated it was **already paid** by `1ee1e3f5`, which
re-cut the row from Osatananda (1997:40). That turned the target into the
test: run against `words/` at `1ee1e3f5^` the rule names 5 pairs and 33 cells,
and the independent fix had re-cut 26 of them.

`yue_zs` is a separate finding. `chao_level_notation_check` reserved it as a
4/4 tie where picking a side is house style, and **it is not a tie**: three of
its four `˥` sit on checked syllables (骨 kʷɐt, 屋 ʊk, 一 jɐt), which the
second clause of that same exemption calls correct. Only 星 sɪŋ˥ is unchecked,
against four unchecked `˥˥`. A row can satisfy an exemption for one reason and
be counted for another. Budget 59 → 50.

## Held as policy, not guessed

- **`p_jpk` stays blank.** Francis-Ratte (2016:306) does publish pKJ *parki,
  but the row has 2 filled cells of 34 — `*əpa` and `*əma`, the two nursery
  forms nobody disputes. That is a coherent stance on a contested
  macro-family. If it changes it should change for all 34 cells at once.
- **`xsc` / `omy`** raise one question: may a row take a proxy form from a
  sister language, as `xsc`'s existing `zasta` (Avestan) already does?
- `p_tun`, `puaz`, `p_toc`, `xpg`, `kho`, `osc`, `xum`, `elx`, `amw` — each
  with the specific blocker recorded in the thread JSON.

## Stopped: the three recodes

`pt_gw`→`pov`, `en_ng2`→`en_gh` and the `afb`→`ar_gulf` merge were audited to
a runnable plan and **applied to a byte copy of the tree**: `check_all.js`
output byte-identical to baseline, validator warnings 244 → 237, strict mode
exit 0, `validate_data.py` unchanged, `php -l seo/lib.php` clean.

They are **not applied**, for a reason outside the repo.
`docs/domain-migration-runbook.md` §0-3 and `docs/makoto-goods-link.md` record
that **Makoto Gadgets validates the `https://langmap.heuron.com/lang_words/
<code>.js` prefix on its order pages**, and say in bold that format changes
need advance notice. The recodes rename two of those files and delete a third.
`SEO_RENAMED_CODES` does not cover `/lang_words/` and no guard checks it. That
needs a server-side 301 on a host this session does not control, plus a note
to Makoto. Owner's call.

Seven claims in the recode brief were wrong and are corrected in
`~/langmap-work/rally/r9/recode_plan.json`, including: `afb` has
`scriptTags:['Arabic-derived']`, not `['Latin']`; `en_ng2`/`en_ng` differ on
15 of 73 cells **systematically** (en_ng writes STRUT as `ɔ` and drops length,
en_ng2 keeps `ʌ/ɑ` and `ː`), so it is good data under a wrong key rather than
a near-duplicate; `SEO_RENAMED_CODES` has 54 entries, not 60+.

## Follow-ups this round created

- **`zh_tang` mixes three transcription systems** — Baxter (`hjuwng`,
  `nrjoX`), Zhengzhang (`mʉɐt`, `bˠæk`) and bare Chao letters on 五 我 二 名 星.
  Someone should re-cut that row.
- **`p_hmx` mixes tone notations** — plain `X`/`H` and superscript `ˣ`/`ᴴ` in
  one row, none of them Ratliff's own A/B/C/D.
- **`omc` eye may be wrong.** Eloranta 2020 p.389 gives Mochica `<lecɥ>` =
  HEAD and `<locɥ>~<lucɥ>` = EYE; the row's eye cell reads `lecɥ`. Check
  against Carrera 1644 before touching it.
- **`font_coverage_check` has a blind spot.** It sees astral-plane SCRIPTS, so
  a missing glyph inside a script it already knows is invisible to it — which
  is how the Tangut subset lacked U+17B52 for the new `txg` cell.
- **Rule B of the import checker is triage, not a gate** — hand-reading all 67
  findings put it at 39% wrong on decidable cases. Category rarity and
  provenance have the same signature: `nan_xm` writes 陰去 ˩˩ in exactly the
  six 陰去 concepts on the map, and so does Taiwanese.
