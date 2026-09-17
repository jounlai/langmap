# Review 540 — closed

**Question:** review 539 carried forward "12 of 13 Spanish rows omit the stress mark on 21-23
polysyllables — a deterministic-checker job, not a rally job." Do it deterministically.

**458 cells fixed with no linguistic judgement of any kind**, because each one is settled by the
data already in the file. Two error classes, both found by measuring rather than reading.

## The stress mark: 380 cells, self-evidenced twice

The policy (owner, 2026-07-21) is to *add* the mark to polysyllabic single words. Taken literally
that is tens of thousands of cells and needs the stress rule of every language. The measurement
says it does not have to be:

| | rows |
|---|---|
| polysyllabic single-word cells, ≥8 per row | 1,068 |
| fully marked (>92%) | 29 |
| fully unmarked (<8%) | 596 |
| **mixed** | **443** |

A per-concept cut through the 443 shows the drift is not per-language at all — it tracks **when the
concept was added**. Inside majority-unmarked rows: chocolate 72% marked, dopamine 68%, cuckoo 57%,
sushi 54%, computer 52% … against moon 1%, house 1%, cat 1%, thanks 1%. The old Swadesh core was
written unmarked and the later additions came from sources that mark stress unconditionally. 3,578
stray marks sit in rows that otherwise do not mark.

So the fixable subset was defined without touching the policy question. A cell qualifies when:

1. **another row in the same language group carries a byte-identical IPA *with* the mark**, and
2. **every such sibling puts the mark in the same place** (disagreement disqualifies), and
3. **the row's own marked-rate is ≥50%**, so the row is already committed to marking.

483 cells met 1 and 2; 388 survived 3. `es` 336, `pt` 25, `en` 10, `lij` 7, `ar` 4, `he` 4, `de` 1,
`it` 1 — 43 rows. Spanish alone is exactly the 21-23-per-row shortfall review 539 reported.

**Two exclusions made by hand, and they matter more than the 380:**

- **`fire` /faɪə/, 10 English rows — not applied.** The same owner ruling says fire is treated as
  monosyllabic and base `en` leaves it unmarked. The three "siblings" supplying the mark
  (`en_jam`, `en_ng`, `en_ph`, three consecutive lines in `words/fire.js`) are the defect, not the
  evidence. **Their marks were stripped instead.** A consistency rule run without the policy in
  hand would have propagated the error to ten more rows.
- **`it we noi /noi/` — not applied.** One syllable; the vowel counter read the diphthong as two.
  91 proposals looked like possible monosyllables on that test and 90 were genuinely disyllabic
  (tie-rra, fue-go, a-gua, vien-to, bei-ve) — `noi` was the only real one.

`gracias /ˈɡɾasjas/` is now marked in 12 rows, which is also where review 539 left `es_pa` after
fixing its coda /s/.

## ASCII g for IPA ɡ: 78 cells

`words/cat.js` carried `es_cr: ["gato", "gato"]` — the IPA field copied from the surface, ASCII g
U+0067 where IPA wants ɡ U+0261. The census: **160 cells across 96 rows**, and **115 of them in rows
that write ɡ correctly elsewhere**, which needs no source to settle.

**The trap is that half these fields are not IPA.** Wylie writes `xct` nag po and `bft` nagpo with
ASCII g on purpose; so do Sumerological transcription and PIE reconstruction (`p_ine` *gʰegʰuǵʰ-).
A cell was therefore reported only when it proves it is IPA — it must carry a letter that appears
in IPA and in none of the romanizations this atlas uses (ŋ ʃ ː ʔ ə …). That split 83 real from 77
left alone; minus three reconstruction rows, **78 applied**, `tr rüzgâr /ɾyzˈɡjaːɾ/` and
`fo regn /rɛɡn/` among them.

`tools/ipa_ascii_g_check.js` is new and wired into `check_all.js`, so the class cannot return. Its
exclusion list is three codes long and documented in the file.

## Carried forward

**The 596 fully-unmarked rows and the 3,578 stray marks are untouched.** Neither is decidable from
the corpus: adding a mark to an unmarked row needs that language's stress rule, and removing the
strays needs the ruling that the row's silence — not the newer concept's mark — is the convention.
The per-concept table above is the argument for the second, and it is the cheaper of the two.

Also unresolved and deliberately left: `fr` marks 3 of 28 polysyllables and `ar` 14 of 52, both
against the policy note that pitch-accent, French and tonal languages should not carry ˈ at all.
Four `fr` cells would have been "fixed" by the sibling rule had the ≥50% gate not caught them.
