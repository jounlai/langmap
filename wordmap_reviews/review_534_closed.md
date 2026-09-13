# Review 534 — closed

**Question:** Does each renamed cell denote the right language in that UI language, and is it the
name that language actually uses?

**Scope:** the 22 collision fixes plus the 53-cell capitalisation pass. **This round overturned more
of my calls than any other in the rally.**

## Refuted: `bfa` ja カロ・バリ語 was a coinage, and an attested form exists

I built it from the row's own `native` field "Karo Bari" after failing to find a Japanese
disambiguation. There are two. ja.wikipedia's ナイル諸語 tree names it **バリ語（南スーダン）**, and
Japanese scholarship uses the family parenthetical — 仲尾周一郎 (2025)「**バリ語（東ナイル語派）**概説」,
スワヒリ＆アフリカ研究 36: 133–153. Glottolog bari1284's alternatives are Bari / Beri / Kuku / Kukú /
Nil-Bari — **no Karo**. So the coinage was not the least-bad option, it was the only unattested one.
Now **南スーダン・バリ語**, which is the attested label with the atlas's own bracket rule applied.

## Refuted: `sg` he — I moved the wrong side

The pair is `sg` Sango (the national language of the Central African Republic) against `sbp` Sangu
(Tanzania). I moved **Sango** onto a Wikidata alias and left **Sangu** holding he.wikipedia's actual
Sango string — infobox `שפה רשמית = [[סנגו]], [[צרפתית]]`, body prose, and its own interwiki
template. Swapped: `sg` takes סנגו back, `sbp` takes סאנגו. **`sbp` still carries a spelling of
Sango's name**, because Hebrew has no name for the Tanzanian language at all; that is recorded, not
solved. The same shape is live in Arabic, where `sbp` keeps السانغو, which Wikidata records as an
alias of *Sango*.

## The Chinese fix was not propagated to Cantonese

`lld` zh became 拉定语 and `lld` **yue stayed 拉丁語 — which is Latin**. The guard could not see it
because `la` in yue is 拉丁文, so the two strings differ. Fixed to 拉定語. Swahili had the mirror
problem: sw.wikipedia's *Kiladino* is a disambiguation page pointing at **Kiladin** (Ladin) and
**Kiladino cha Kiyahudi** (Judeo-Spanish), and the atlas had them the other way round. Both fixed.

`pi` ar بالي was also too bare — that is the **island**; ar.wikipedia disambiguates as بالي (لغة) and
its prose uses لغة البالي, which the cell now carries. And sw "cha Klasiki" is lowercased to "cha
klasiki", which is how sw.wikipedia writes *muziki wa klasiki*.

## The capitalisation pass was right, for a better reason than consistency

**CLDR encodes this exact case.** In `common/main/*.xml`, es/it/pt declare
`<contextTransformUsage type="languages">` with both `stand-alone` and `uiListOrMenu` →
`titlecase-firstword`; fr declares `uiListOrMenu`. Language names are *stored* mid-sentence and
*re-cased for labels*, first word only — which is exactly what was done ("Cham occidental", not
"Cham Occidental"). Backed by OQLF's *majuscule de position*, Treccani, and Acordo Ortográfico Base
XIX. fr/es/it/pt now have zero lowercase-initial names each, and no name had a lowercase particle.
**The guard will misfire the day a click-letter name arrives** (ǃXóõ, ǂʼAmkoe); zero today.

## mjg / mvf: confirmed, and the merge direction is the opposite of the obvious one

ISO 639-3 `mvf` is **Peripheral Mongolian**, an individual language inside macrolanguage `mon`
beside Halh; `mjg` is **Tu**, and Glottolog's Mongghul (huzh1238) carries `mjg`. Yet the atlas's
`mvf` row sits at 36.83/102.40 — Huzhu Tu Autonomous County — with native `Mongghul`.

**The word data decides it, and it was not visible from the names.** The two rows are *not*
byte-identical: `mvf` holds genuine conservative Mongghul (nara, sara, *nidu* 'eye', *ana* 'mother',
usu, jürige), while `mjg` holds several plainly **Khalkha** forms (*eej* = ээж, *nüd* = нүд, *zürkh*
= зүрх, *khairakh*) — residue of that row having been labelled モンゴル語 until this week. So the merge
is **onto `mjg`, carrying `mvf`'s content**, not the reverse. 57 files outside `lang_names/` mention
mvf. `mjg` ja 土族語 is attested (ja.wikipedia's article opens 「モングォル語（Monguor）または土族語…」,
and TUFS/ILCAA publish 『土族語文法』) but both labels name the same language, so the rename bought
clarity, not correctness.

## Open, recorded not fixed

- **`cr` → "Cree" is a regression of the same class.** `cre` is a macrolanguage, `crk` exists, and
  their forms match (ᐲᓯᒼ/piːsim, ᐊᑎᒼ/atim, ᓂᐢᑐ/nisto). The honest "Cree (Plains)" became a
  macrolanguage label sitting on Plains Cree data.
- **`afb` → "Qatari Arabic"** moved the ISO-coded row off its own ISO reference name so a non-ISO
  `ar_gulf` could keep it, and `afb`'s native is still خليجي. Another duplicate-row pair wearing a
  naming costume.
- **Four French names are English-shaped**: Nivaclé → nivakié, Makushi → macuxi, Hup → hupda,
  Baniwa → baniwa de l'Içana (with CLDR's first-word capital).
- `vec` sw **Kiveneto** remains unattested — formed by exactly the rule sw.wikipedia uses (Kiliguria,
  Kifriuli, Kisardinia, Kiladino), but it differs from `xve`'s Kiveneti by one vowel and neither is
  attested.

**Verified clean with sources:** all five Arabic pairs (awa/udi, luo/xlu, rom/ro, tyv/kim, sg) — and
in every one the string that *stayed* is the one its own encyclopaedia attests — plus `lld` zh 拉定语,
`kdt` zh 归语, `lad` it Giudeo-spagnolo (it.wikipedia's hatnote confirms the direction), `xve` ja
ウェネティ語, and `vec` uk Венеційська.
