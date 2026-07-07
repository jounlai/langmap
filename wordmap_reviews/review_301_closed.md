# Wordmap review #301 — Other Indo-European (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
私はアナトリア語派・ヘレニック語派・ケルト語派・アルメニア語派を横断して扱う古代印欧語文献学者で、断片言語の再建形評価を専門としています。参照した主な文法書・辞書は以下の通りです。ミュケーナイ・ギリシャ語は Ventris & Chadwick *Documents in Mycenaean Greek* (2nd ed.) および Bartoněk *Handbuch des mykenischen Griechisch*、印欧祖語代名詞の再建は Sihler *New Comparative Grammar of Greek and Latin*。古アイルランド語・中期アイルランド語は Thurneysen *A Grammar of Old Irish* と *Dictionary of the Irish Language (DIL, eDIL)*。ルウィ語(楔形・象形)は Melchert *Cuneiform Luvian Lexicon* と Payne *Hieroglyphic Luwian: An Introduction*。古典アルメニア語(グラバル)は Meillet *Altarmenisches Elementarbuch* と Hübschmann *Armenische Grammatik*。メッサピア語は de Simone、タルテッソス語は Koch (2009) / Untermann (1997) の対立を踏まえ、断片・非解読部分は「—」を維持する方針で査読しました。

## Issues found

### 1. `gmy` — you — Attic σύ imported into a 2nd-millennium Mycenaean cell
- **File:** `words/you.js` — code `gmy`
- **Current:** ["𐀱","suː"]
- **Expected:** ["𐀶","tuː"]
- **Why:** The 2sg nominative pronoun with initial /s-/ (σύ) is a post-Mycenaean Attic-Ionic innovation: PIE *tuH₂ → Proto-Greek *tū, preserved as Doric τύ. The /s-/ of Attic σύ arose analogically from the oblique stem (σε, σοί, σός < *tw-), a change unattested in the 14th–13th c. BCE. A reconstructed Mycenaean form should therefore be *tū = **tu**, written with the "tu" syllabogram 𐀶 (U+10036), not the "su" syllabogram 𐀱 (U+10031). This is also internally consistent with the rest of the cell, which deliberately retains archaic Mycenaean features (e.g. `two` = du-wo /duwoː/ with intervocalic *w, `I` = e-go /eɡɔː/). Cf. Sihler §366; Ventris & Chadwick on the pre-classical retention of *tu-.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
