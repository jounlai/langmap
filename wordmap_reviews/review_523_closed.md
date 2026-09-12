# Review 523 — the metadata blocks of `head` and `new`

**Scope.** Not the 900 cells — the top of the two files: the JSDoc etymology
paragraph, the emoji, and the 23-language `label` and `definition` blocks. These
were written by hand before any cell was filled, and the definitions are the
contract every filler and every reviewer read.

**Result.** 17 findings. **This round found more real errors than any of the
four that examined the data**, which is the lesson worth keeping: the part
nobody else was going to check was the part written most confidently.

## Three false claims in the etymology paragraphs

These paragraphs are the most quotable thing in the files. All three errors were
in `head.js` and `new.js` as first written.

**1. Arabic *jadīd* was attributed to the wrong root.** `new.js` said "Semitic
to the root ḥ-d-ṯ 'be new' (Arabic jadīd, Hebrew ḥadaš)". جديد is from ج-د-د;
the Arabic reflex of ḥ-d-ṯ is حديث. Hebrew ḥadaš was the only correct half.

The same mistake had **propagated into `definition.ar`**, which excluded حديث as
the rendering of "modern" — telling Arabic contributors to avoid the one Arabic
word that actually is this concept's Semitic cognate. The exclusion now names
عصري, which is unambiguously 'modern'. An error in a paragraph is embarrassing;
an error in a definition is operational, because people fill cells from it.

**2. German *Kopf* was chained to Latin *testa*.** "Latin testa 'pot' → French
tête, Italian testa, and German Kopf, originally 'cup'" reads as one derivation.
Kopf is Old High German *kopf* 'drinking vessel' < Proto-Germanic \*kuppaz, at
most influenced by Late Latin *cuppa*. The point the sentence was making — that
a vessel word replaced the inherited one — is true **twice over, independently**,
which is more interesting than the false chain, and is what it now says.

**3. Malay *kepala* was called "the innovation".** It is a Sanskrit loan, कपाल
*kapāla* 'skull, bowl' — the same PIE root as the *caput* at the top of the same
paragraph, arriving in Malay from the other direction. Correcting a wrong claim
produced the best sentence in the file.

Also corrected: **\*ḱap-ut- → \*kaput-** (Sanskrit *kapāla-* has k-, so a palatal
is impossible); **\*lu belongs to 首, not 頭**, which is a separate etymon that
displaced it — and the atlas's own `och` cells say so, 首 \*l̥uʔ and 新
\*s.tsʰi[n], which is now what the paragraphs quote.

## Four translation defects

- **`head.js` `definition.yue` was Mandarin with 的→嘅.** That is the exact
  failure mode this atlas checks for. It used 對象 for 'object' — in Cantonese a
  counterpart, a target or a romantic partner, not a physical thing; the `zh`
  line correctly had 物体. And it wrote 也 where every other yue string in the
  corpus has 亦. Rewritten. (`new.js`'s yue line is genuine Cantonese.)
- **`definition.ru`** said "несущая глаза, уши, нос и рот" — a word-for-word
  carry of English 'carrying' that reads as load-bearing. The Ukrainian line
  directly below it already had the natural shape, "де очі, вуха, ніс і рот".
- **`definition.sw`** had `kukuu`, which is not a word; the adjective is
  `kuukuu` (ku-ukuu). And its three verbs were one ki- relative plus two bare
  infinitives; they are now parallel.

Script convention (zh simplified, yue traditional) was correct in both files,
and the es/es_eu/es_mx and pt/pt_eu/pt_br triples match `nose.js` exactly.

## The emoji

`head.js` carried 👤 written as a JS escape, `"\u{1F464}"` — the only one of 31
emoji-bearing word files not using the literal character. And 👤 is `we.js`'s 👥
with one fewer body: indistinguishable at selector size.

Removed rather than replaced. Half the body-part words — eye, hand, heart,
tongue, tooth, blood — carry no emoji at all, so an empty field is the house
pattern and not a loss. `new.js` keeps ✨, which is free and written as a glyph.
