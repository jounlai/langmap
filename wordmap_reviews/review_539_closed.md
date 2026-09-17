# Review 539 — closed

**Question:** 24 Romance regional-variety rows carry metadata and no sources at all. Are they real
records of those varieties, or the standard language with a flag on it?

**Mostly real — and the errors were not where the question expected them.** 45 cells fixed out of
~1,700; 72 verified identical to the standard on a citation; 1 row of 24 unsourceable.

## The premise was half wrong, and the audit corrected it

The brief pointed at high similarity: es_ar/es_uy 98.6%, fr_be/fr_ch 100%. **That is not a defect.**
Costa Rican Spanish really does say agua, fuego, sol. The hunt was therefore inverted — look for the
cell where the variety *does* differ and the row shows the standard anyway.

In ~1,700 cells there were exactly **two** such lexical hits:

| row | concept | was | now | source |
|---|---|---|---|---|
| `es_pr` | orange | naranja | **china** /ˈtʃina/ | DRAE s.v. *chino, na*, fem. P. Rico "naranja dulce"; Tesoro lexicográfico de Puerto Rico |
| `fr_lu` | 99 | quatre-vingt-dix-neuf | **nonante-neuf** | Avanzi, *Français de nos régions* (2016) |

**Both had a structural consequence the cell edit alone would have missed.** `orange` is
route-coloured, so `es_pr`'s route had to move from `naranj` to `china` — putting the Caribbean on
the Dutch "apple from China" route for the first time. `n99` is route-coloured too: `fr_lu` was
marked `vig` (vigesimal) and had to become `dec`. **The route guard caught the second one; I had
already fixed the first by hand only because the auditor named it.** A word and its route are one
fact stored twice.

Luxembourg takes nonante but *not* septante — so if a "79" concept is ever added, `fr_lu` must not
be swept along with `fr_be`.

## The real error class was phonetic, and it was 34 cells

Nine Central American and Caribbean Spanish rows transcribe the jota as Castilian **[x] in some
cells and [h] in others**. `es_pr` wrote *pájaro* both ways in two different concepts —
`/ˈpahaɾo/` under cuckoo, `/ˈpaxaɾo/` under bird. Costa Rica's five [x] cells are the outliers
against its own two [h] ones.

Fixed to [h] across es_cr, es_hn, es_ni, es_sv, es_gt, es_pa, es_do, es_pr, es_ve. **Deliberately
left alone: es_ec, es_bo, es_py, es_uy, which are correctly and consistently [x]** — velar jota is
right for the Andes and the Southern Cone, and a blanket sweep would have broken four good rows to
fix nine bad ones. Also `es_pa thanks /ɡɾasjas/`, which failed to aspirate coda /s/ while six other
cells in the same row did.

Three orthographic fixes on top: `pt_ao` and `pt_mz` carried Brazilian **cocô** where every
non-Brazilian CPLP country writes **cocó** — and so did the `pt` row itself, which is the European
norm. `fr_cm` wrote `oeil` where the other nine French rows write `œil`. `ca_va` wrote `gat /ɣat/`
against its own `gos /ɡɔs/`.

## Verified identical — the result that lets the next reviewer stop

- **tú/vos is right in all 13 Spanish rows**, on Calderón Campos (2010) in Aleza & Enguita: Panama,
  Venezuela, Ecuador and the Antilles tuteo; Costa Rica, Nicaragua and Paraguay have "eliminado por
  completo la forma tú". `es_bo` is a genuine coin-flip (the colla zone has both) and is marked as
  such so nobody re-litigates it.
- **The five African and Haitian French rows are near-copies of `fr` for the right reason**: Lafage,
  Blondé, Biloa and the IFA document large regional lexicons that fall entirely outside these 86
  concepts. `fr_ht` now carries an explicit note that it is the French *of* Haiti, not Haitian
  Creole.
- The three African Portuguese rows differ from `pt` in phonology only, which is how the literature
  describes them.

## Two rows that do not earn their place, and one that is at risk

- **`pt_gw` is not Portuguese at all.** Its cells are Guinea-Bissau Kriol — `anos`, `bu`, `pis`,
  `kumé`, `burmedju`, `tris`, `kuatru`, `sinku` — ISO 639-3 **pov**, filed under a `pt_` code with
  41 form differences from its notional parent where every other `pt_` row has 0-2. Left in place
  pending an owner decision: recoding a row changes its name, its description and its place in every
  inheritance pass. Its `water` cell is also `ágwa`, a Portuguese spelling where Kriol is *yagu*.
- **`es_uy` is 74/74 identical to `es_ar`** once one stray stress mark is discounted. It records
  nothing `es_ar` does not.
- **`ca_va` is the best row of the 24** — 46 of 69 cells differ from `ca`, covering every canonical
  Valencian feature — and it is in danger precisely for that reason: a similarity pass flags it as
  an outlier and someone normalises it back. It needs its AVL/DCVB citations more than any other row
  here.

## Carried forward

**12 of 13 Spanish rows omit the stress mark on 21-23 polysyllables**; `es_py` is the only one
written to the stress-mark policy. That is a deterministic-checker job, not a rally job, and is not
listed cell by cell here.

The brief's own row list was stale: five codes on it already had sources, and six qualifying rows
were missing from it. The list came from a grep, not from the guard.
