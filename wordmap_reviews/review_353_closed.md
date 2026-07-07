# Wordmap review #353 — Tibeto-Burman (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Rangkhu A. Marak, a descriptive linguist working on Bodo-Garo and Karenic microvarieties, cross-checking Loloish and Jingphoic data against the standard reference literature. For this domain I lean on Robbins Burling, *The Language of the Modhupur Mandi (Garo)*, vols. 1–2 (2004), and Burling's earlier *Garo phonology* work for the raka (glottal) orthography; Atsuhiko Kato's *A Grammar of Pwo Karen* and his Eastern/Western Pwo comparative pronoun and numeral tables; Inga-Lill Hansson's Akha lexical materials and the Akha Common-Language orthography; La Raw Maran and Keita Kurabe's Jingpho (Kachin) lexicon; Chen Kang / Tian Desheng on Tujia (Bizika); and, for the Batanic outlier tao, D. Victoria Rau & Maa-Neu Dong, *Yami Texts with Reference Grammar and Dictionary* (2006). My focus in this round is on the segmental/tonal IPA, the native orthographies of the standardized varieties, and sense (guarding against honorific/plural pronouns, ordinals, and Chinese/Burmese loans displacing native etyma).

## Issues found
### 1. `grt` — star — Garo raka (glottal) unmarked in orthography
- **File:** `words/star.js` — code `grt`
- **Current:** ["aski","aʔski"]
- **Expected:** ["a·ski","aʔski"]
- **Why:** The broad IPA correctly encodes the glottal stop, [aʔski], but the native cell drops it. In standardized Garo orthography the syllable-internal glottal stop is obligatorily written with the raka (middle dot ·): the word for "star" is *a·ski*. The same dataset already marks a glottal in the Garo 2sg pronoun `nang'a` [naŋʔa] (words/you.js), so omitting it here is an internal inconsistency, not a stylistic choice. Cf. Burling, *The Language of the Modhupur Mandi*, on the raka and on *a·ski* 'star'. The IPA is fine; only the orthography needs the raka restored.

(All other cells verified correct: tao yaken/imo/doa/ngaran/vituen — canonical Yami free pronouns and Batanic *ŋajan, *bituqən reflexes; kjp Pwo Karen ya/na/ni/mi/sha with Proto-Karen *na, *ni; kac Jingpho ngai/nang/lahkawng/mying/shagan; ahk Akha nga/naw/nyi/myeh/aqgeu; tji Tujia nga/ni/nie/mingzi/sei. Tujia `mingzi` 名字 is a Chinese loan but is the ordinarily attested Bizika term for "name," so it is not flagged.)

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
