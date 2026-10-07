# Review 548 — rounds 56 (fill) and 57 (copy-suspect audit)

Closed 2026-10-07. Ten concurrent agents: five filling, five auditing.
Working files: ~/langmap-work/r56/, ~/langmap-work/r57/.

## Round 56 — filling (45 cells)

432 living rows with 10,000+ speakers, 2,342 open cells. Yield was low
(45): earlier rounds have worked through these rows' Bibles and datasets,
and most remaining leads collide with another cell in the row, fail the
hail control for snow, or are spelled in a different orthography.
Rows: anu 7, soa 7 (Lao Song Gospels; tones derived from the row's own
class/tone-mark pattern), drs 2, dsh 2, rom 2, and one each in yan shn myx
nzm dds dje cni iru tdh nyo tet gej mev mvf zap mzh ndc kjb poh fan nym sad
kbp grt sip. Held: nan_hai sleep (MCPDict lists xe and xɔi, unranked).

## Round 57 — rows that may hold a neighbour's words (171 FIX, 9 RFIX, 0 DEL)

From r51/ident2.tsv, the highest-identity rows not yet audited.
- Tibetic: khg, bft, sip partly copied (Lhasa readings in the IPA); lbj
  mostly clean. lbj ཁ is both mouth and snow (Wiktionary Ladakhi) — locked
  as a genuine homophone.
- Quechua: qwc 2 cells, quz and quy clean.
- Historical: xct read 22 cells with Lhasa values (now written Tibetan,
  {{bo-IPA}} Old Tibetan); xct_litpr was the xct row with 7 edits, now Lhasa
  values without tone, as its meta states; sukh consonants moved to the
  Sukhothai values (Wikipedia "Thai script", Pittayaporn 2009).
- Creoles / Chavacano / Manyika / Unserdeutsch: gcr, acf, cbk partly
  copied; gcf, mxc, uln clean.
- Arabic / Persian / English-lexifier: afb 7, abv 3, acw 3, ayl 5 fixes;
  haz, bah, hwc clean.

## Overruled

- sukh night ɣɯːn and white xaːw: the auditor took the Proto-Tai consonant
  for words spelled with ค and ข, not ฅ and ฃ. Reverted to kʰɯːn / kʰaːw with
  a source comment; the proto-leak guard caught both.

## Open, for the next audit round

r56 slice 5 flagged 72 published cells against agreeing wordlists and
Bibles: Tsez (11), Hani (9), Tujia (8), Nyamwezi (6), Lak (5), Enga (5),
Muong (5), Wakhi (4), Mezquital Otomi (4), Kabiye IPA (4), and single cells
in Tiv, Fang, Tahitian, Kuna, Mixtec, Ngäbere, Kikuyu, Atayal, Svan, Kurukh.
Others: pwo silk = bird IPA, pwo tooth = name spelling, guc wheel = foot,
hui wheel = foot, ha mountain = stone, ha tooth ƙ in IPA, lol three IPA.
