# Wordmap review #404 — Japonic, Koreanic, Turkic, Mongolic, Tungusic, Uralic (full 25-word audit, 10-thread rally)

## Reviewer self-introduction (ペルソナ自己紹介)
I am a historical-comparative linguist specializing in the Transeurasian macro-area (Turkic, Mongolic, Tungusic, Japonic, Koreanic) and Uralic, working from Janhunen's Mongolic and Manchu-Tungus handbooks, Poppe's comparative grammar, Frellesvig's History of the Japanese Language, the Yakut/Dolgan materials of Ubryatova and Stachowski, and standard Buryat (Cheremisov) and Middle Mongolian (de Rachewiltz) lexicography. I read Mongolian, Old Turkic and Korean scripts natively and cross-check each cell against attested cognate sets before flagging.

## Issues found

### cmg (Classical Mongolian) — `cat` — wrong-sense [high]
- Current: `ᠮᠠᠭᠣ` /maɣu/
- Corrected: `ᠮᠢᠭᠤᠢ` /miɣui/
- Rationale: ᠮᠠᠭᠣ /maɣu/ is the Classical Mongolian word for 'bad, evil' (modern муу), not 'cat'. The Mongolic word for cat is miɣui — exactly the form the sibling entry xng (Middle Mongolian) gives as ᠮᠢᠭᠤᠢ /miɣui/. A wrong-lemma error.

### bua (Buryat (bua)) — `eye` — wrong-sense [high]
- Current: `сэргэ` /sərɡə/
- Corrected: `нюдэн` /nʲuden/
- Rationale: сэргэ means 'hitching post / tethering rail' (a culturally salient Buryat-Mongol item), not 'eye'. Buryat 'eye' is нюдэн, exactly as in the sibling entry bxr (Buryat). Wrong lemma.

### bua (Buryat (bua)) — `heart` — wrong-sense [medium]
- Current: `хүрэг` /xʉrəɡ/
- Corrected: `зүрхэн` /zyrxen/
- Rationale: хүрэг means 'portrait / herd', not 'heart'. Buryat 'heart' is зүрхэн (cf. bxr зүрхэн /zyrxen/). Wrong lemma.

### dlg (Dolgan) — `good` — wrong-script [medium]
- Current: `абыlay` /ɑbəlɑj/
- Corrected: `үчүгэй` /ytʃyɡej/
- Rationale: The surface mixes a Latin letter 'l' into an otherwise-Cyrillic string (абы-l-ay), which is impossible in Dolgan orthography. The form itself is also not the Dolgan/Yakut word for 'good', which is үчүгэй.

### dlg (Dolgan) — `fire` — fabricated-or-implausible [medium]
- Current: `ын` /ən/
- Corrected: `уот` /uot/
- Rationale: Dolgan is a close sister of Yakut/Sakha; 'fire' is уот (cf. sah уот /uot/). ын is not an attestable Dolgan word for fire.

### dlg (Dolgan) — `heart` — copied-from-other-language [medium]
- Current: `чүрөк` /tʃʉrɵk/
- Corrected: `сүрэх` /syrex/
- Rationale: чүрөк is a Kipchak-type form (cf. Kyrgyz жүрөк). Dolgan, like Yakut, has сүрэх for 'heart' (cf. sah сүрэх /syrex/); the given form does not belong to the Siberian-Turkic Yakut-Dolgan branch.

### mjg (mjg (Mongolic)) — `drink` — wrong-sense [medium]
- Current: `unu` /ˈunu/
- Corrected: `uu` /uː/
- Rationale: Mongolic unu- means 'to ride / mount', not 'to drink'. The drink verb is uu- (cf. mn уух, mvf uu-). A classic ride/drink lexical confusion; the rest of the entry (eat=ide, hand=gar) confirms it is Mongolic.

### ja_heian (Japanese (Heian)) — `eat` — ipa-surface-mismatch [medium]
- Current: `食ふ` /kaɸu/
- Corrected: `食ふ` /kuɸu/
- Rationale: 食ふ 'to eat' is kufu (< OJ kupu), as the sibling ja_chu correctly gives (/kuɸu/). The vowel /a/ in /kaɸu/ corresponds instead to 飼ふ/養ふ 'to feed/raise animals' — a wrong reading of the eat lemma.

## Domain summary
Reviewed all 110 entries. The dataset is largely sound; most apparent oddities are deliberate dialect phonology (e.g. Karachay-Balkar дж~ж, Tatar back-k [q], Ryukyuan vowel raising) or legitimate loan patterns (Russian кошка/спасибо across Siberian languages), which I left untouched. Eight genuine errors: two high-confidence wrong-lemma slips (Classical Mongolian 'cat' = maɣu 'bad'; Buryat/bua 'eye' = сэргэ 'hitching post'), a second bua wrong-sense ('heart' = хүрэг 'portrait'), a mixed Latin/Cyrillic script error plus two non-Yakut/implausible lemmas in the Dolgan (dlg) entry (which looks partly corrupted), a Mongolic ride/drink confusion in mjg, and a Heian Japanese eat-verb IPA that reads the 'feed animals' vowel. No systematic script or register problems otherwise.

## Worker response (作業者)
Findings: 8 · applied 8 · rejected 0 · skipped 0. All flagged cells verified against the data before applying; none of the flagged values originated in a prior deliberate fix (all came from bulk data-creation commits), so no manual correction was overwritten. Deliberate dialect phonology was explicitly preserved. `node validate_wordmap_data.js` passing.

**File status: CLOSED**