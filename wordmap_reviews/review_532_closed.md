# Review 532 — closed

**Question:** Is every factual claim in the `head` / `new` prose true, and does each one match the
source the cells beside it use?

**Reviewed at** commit `178765e4`. **31 claims checked, 21 verified, 10 findings, 4 unclosable.**

This is the round that exists because on this atlas the most expensive errors keep turning out to
be in the prose — the part written most confidently and the part nobody else checks. It was right
to run it again: the `head` paragraph had already been corrected five times in four days, **and it
was still wrong in four places, including one the previous correction introduced.**

## The paragraph and the cell agreed with each other while both were wrong

`*ḱr̥rēh₂` survived all six earlier corrections because it appeared in *both* the JSDoc and the
`p_ine` cell, so nothing disagreed with anything. The raw wikitext of Wiktionary's `*ḱerh₂-` page
contains the string **zero times**, and an exact-phrase search returns nothing anywhere.

Round 528 replaced it with `*ḱérh₂os` — a real derivative, but **the three reflexes the prose bundles
under it come from three different ones**: Greek κάρᾱ from `*ḱŕ̥h₂esnh₂` (Beekes I p.641), Sanskrit
śiras via PIIr `*ćŕ̥Has` from `*ḱŕ̥h₂os`, Hittite ḫaršar from `*ḱróur` (Kloekhorst 2008 pp.446–447).

**So PIE has a root here, not a noun.** The cell now carries the root, `*ḱerh₂-`, the way `eye`
carries `*h₃ékʷ-`, and the paragraph says which derivative each daughter's word comes from. Three
strings in three days for one cell; the note at the cell records all three so a fourth pass does not
start over.

## Both of my authorities for "not PIE" were misattributed

- **"Mallory & Adams leave it out of their PIE words for 'head'" is false as stated.** Wiktionary's
  `*káput` lemma cites them *for* the headword — `{{R:ine:Mallory:2006|page=270}}`. p.270 itself
  could not be read, so the claim is at minimum unsourced and contradicted by the only citation
  trail available.
- **"Kroonen files *káput as West-European" is overstated.** Kroonen's entry is `*ha(u)beda- ~
  *ha(u)buda-` (EDPG p.215); the substrate framing on that page is **Beekes'**, cited as "Ancient
  European Loanwords". "West-European" appears in no reachable source.

Rewritten to the part that is simply checkable — only Italic and Germanic have the word — with
Beekes named for the loanword reading and the two misattributions gone.

## Internal contradiction

"Greek kephalḗ and Sanskrit śiras **stand apart**" sat two sentences after śiras was named as a
reflex of the PIE etymon. kephalḗ genuinely does stand apart; śiras cannot. Fixed.

## Prose quoting forms differently from the cells beside it

"Turkic points to **baš**" against `ptrk: ["*baĺč", …]` — every other family in that sentence is
quoted exactly as its cell prints it, and Turkic alone got a daughter form where a proto-form
belongs. Prose `*raʔš` against the cell's `*raʔš-`. Both aligned.

## Hedged rather than reverted

**German Kopf ← Proto-Germanic *kuppaz** was stated flatly on a contested point: DWDS/Pfeifer has
OHG *koph* "**wahrscheinlich entlehnt aus spätlat. cuppa 'Becher'**", and Wiktionary records the
Latin route while preferring *kuppaz. Per the standing rule about rally findings overwriting
hand-made fixes, this parenthesis looks like a prior correction and the paragraph's actual point —
two independent vessel→head shifts — holds under either etymology. Both routes are now named.

Two low-severity `new.js` items fixed the same way: Celtic and Germanic continue the *-yo- variant
`*néwyos` rather than `*néwos` "almost unchanged" (the Brittonic forms require it), and "j-d-d
'renew'" assigned a form-II sense to the bare root.

## Verified clean

Old Chinese 首 `*l̥uʔ`, 頭 `*[m-t]ˤo`, 新 `*s.tsʰi[n]` — all three match Baxter–Sagart 1.1 character
for character. PAn `*quluh` and `*baqeRuh`; Proto-Bantu `*-tʊ́è` / `*-pɪ́à` with tone marks matching
the cells exactly; PIE `*néwos` (NIL p.524, LIPP II p.581); Malay *hulu*; kapāla as a Sanskrit loan;
and the ḥ-d-ṯ / j-d-d swap.

The Uralic claim **holds**: Uralonet #729 labels `päŋe` level **U** and cites Nenets, Enets and
Nganasan, so the "unlike *päŋe" contrast is real on the dictionary the cells follow. Caveat logged:
Wikipedia's Finno-Ugric article asserts the opposite generalisation and Wiktionary's `päŋe` page
lists no Samoyedic descendant, so if UEW's Samoyedic cognates are ever rejected that clause
collapses.

## The 23 definitions

**All 23 agree, in both files**, checked key by key. Every head definition preserves all three
exclusions (not 'chief'; not the head of an object; not the verb) and every new definition all four
('young', 'modern', 'fresh', 'another'). **The `definition.ar` regression has not recurred** —
head.ar excludes زعيم / طرف الشيء / the verb without steering Arabic contributors away from رأس, and
new.ar excludes عصري, the very sense the paragraph says *ḥadīth* drifted to. One deliberate
divergence, `definition.it` for head adding "non 'capo' nel senso di comandante", disambiguates
Italian *capo* and is an improvement.

## Could not close

Mallory & Adams 2006 p.270 (no readable copy anywhere), Kroonen EDPG p.215 verbatim
(lending-restricted), and ACD's own entry text (acd.clld.org is JS-only, trussel2.com 403s — both
forms confirmed through Wiktionary's PAn lemmas instead).
