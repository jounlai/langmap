# Trivia review 01 — the 70 WordMap and HanMap articles

**Date:** 2026-08-10
**Status:** OPEN. Phase 1 (bibliographies, dead buttons, one broken body) is
applied. Phase 2 (363 body findings, each cascading to 19 languages) is not.
**Scope:** all 70 read-aloud articles — `wordmap_trivia.js` (30, en + ja in the
base file and 17 overlay files) and `hanmap_trivia.js` (40, all 19 UI languages
inline). 418 citations between them.
**Method:** one `parallel(review) → parallel(adversarial-verify)` rally. Twelve
topic shards (Japanese reading systems, Korean, dead scripts, Vietnam and
minority scripts, Sinitic dialects, historical phonology and script reform,
phonological extremes, isolates and endangered languages, writing systems,
constructed and revived languages, grammar and cognition) plus three
cross-cutting checks (button targets, contradiction against the site's own map
data, English↔Japanese translation faithfulness). Every finding then went to a
DEFAULT-REJECT skeptic with WebSearch and WebFetch.
**Cost:** 459 agents, 0 errors, ~8.2M tokens, 4,056 tool calls. The run died
once when the session process exited and was resumed from the run id; 225
agents replayed from cache and only the missing ones re-ran.

| | |
|---|---|
| raw findings | 457 → 444 after dedup |
| confirmed | **411** |
| refuted | 33 |

By severity: `wrong` 159, `citation-error` 71, `translation` 55,
`internal-contradiction` 39, `unsourced` 30, `button` 30, `overclaim` 27.
By file: hanmap 234, wordmap 177. **Every one of the 70 articles has at least
one confirmed finding.**

## The 92.6% confirmation rate is real, and that needed checking

A default-reject skeptic that confirms 411 of 444 is either facing genuinely
bad data or not doing its job. In the Japanese-dialect rally three days earlier
the same prompt threw out 53% of the mainland findings, so this needed a
second opinion before anything was applied.

I took the 13 `button` findings — the only class that is mechanically decidable
— and checked each against the data myself. All 13 held: 元 and 経 are not among
the 61 HanMap characters; 行 is sense-split into `行:1` and `行:2` so the bare
character is not a key; `ja_on` is not a language code; `mnc` is Manchu, on an
article about Mongolian script; `zkt` is Khitan, and the Khitan article focused
`zh` instead.

Then I spot-read 13 `wrong` findings and checked them independently. Also all
correct, and several are not small:

- **道** is 呉音 ドウ / 漢音 トウ. The article said 神道 uses the go-on and 道路 the
  kan-on, which is backwards — and the same article correctly states the rule
  that kan-on devoices go-on initials, so it contradicted itself.
- **Cantonese has no voiced obstruents.** The article claimed it "preserves
  voiced initials from Middle Chinese that Mandarin merged away". Cantonese
  devoiced the Middle Chinese voiced series completely; the yin/yang tone split
  is what that devoicing left behind. The claim was inverted, and its own cited
  source (Bauer & Benedict) gives the stop inventory as /p pʰ t tʰ k kʰ/.
- **nn̄g is the vernacular reading of 兩, not 二.** 二 is jī/lī, and that is a
  Zhangzhou-vs-Quanzhou split, not a literary/colloquial one. The article built
  its showcase example on it.
- **Baxter–Sagart reconstruct 山 as \*s-ŋrar**, not the article's `*s.rǝn` —
  wrong initial, wrong rhyme, wrong attachment notation. The site's own
  `hanmap_data.js` already carries `*s-ŋrar`, and the article's own button
  takes the reader to that cell.
- **The Dongguk Jeongun was modelled on the Hongwu Zhengyun and the Gujin
  Yunhui Juyao**, not the Zhongyuan Yinyun — which reflects contemporary
  northern vernacular and is the one rhyme book whose whole character is
  opposed to what the Dongguk Jeongun was for.
- Tangut writing did not stop in 1227 (the Baoding dharani pillars are 1502).
  Mongolia's Latin decision was reversed in March 1941, not 1946. Yi Syllables
  is U+A000–U+A48F, with Yi Radicals a separate block. Chunhyangjeon is 18th
  century. The Liber Linteus mummy is Ptolemaic, not Roman.

The rate is not a verification failure. The 40 HanMap articles were generated
by 20 parallel agents in one pass and had never been content-reviewed — only
their buttons and Korean transliterations were ever touched.

## Applied, 1: the bibliographies (49 entries)

`sources` is one array per article, shared across all 19 languages rather than
translated, so each of these is a single edit instead of a nineteen-fold
cascade. That makes it the cheapest and highest-value part to land first.

The worst of them is the one the rally opened with. `kokugo-versus-kango` cited
*Nomura, Masaaki (1997), National Language Research Institute Report 117*.
CiNii gives report 117 as 『教育基本語彙の基本的研究』(2001), and an author search for
野村雅昭 in that series returns nothing in any year. Report number, year, author
and title all fail at once. The verifier then checked the reviewer's own
proposed replacement and rejected half of it: 『現代雑誌九十種の用語用字』 is a survey
of magazine text and cannot be the source of the article's claims about
*conversation*, so substituting it would have replaced one citation error with
another. That correction is in the body findings, still pending.

Others in the same shape: *Lee, Ki-Moon (1997), A History of the Korean
Language* (it is Lee & Ramsey 2011); *Wiersma, 'A Grammar of Bai', Oregon 2003*
(a historical study, Berkeley 1990); *Lau, C. (2005), Hakka Chinese Confront
Protestant Christianity* (Lutz & Lutz 1998, M.E. Sharpe); *Jin Qizong (1984),
女真文字书* (his 1984 Wenwu book is 女真文辞典); *Janhunen (2003), SCRIPTA 4*
(SCRIPTA vol. 4 is 2012 and the journal did not exist in 2003); *白语简志* by
Wang Fushi (it is Xu Lin & Zhao Yansun, and Wang Fushi wrote 苗语简志).

Three were real books cited for things they have nothing to do with: Ramsey's
*The Languages of China* as a source on Korean hanja glossing, Unger's *The
Fifth Generation Fallacy* in a tea-etymology article, and the **Comparative
Bantu Online Dictionary** in an article about Sino-Tibetan cognates — the last
with an invented parenthetical rationale attached ("methodological reference
for cognate criteria").

Where a URL was involved I checked it with curl rather than trusting either
side, and every one of those findings held:

| claim | check |
|---|---|
| glottolog `vaii1244` is wrong for Vai | 404; `vaii1241` resolves |
| `wals_code_rot` is not Rotokas | page title reads **Rotuman**; `wals_code_rtk` reads Rotokas |
| WALS 137A is not "M in First Person Singular" | 137A is **N-M Pronouns**; 136B is the right one |
| `wu-chinese.com` is not 吳語學堂 | it is 吳語協會; `wugniu.com` is 吳語學堂 |
| `numismaticsociety.jp` | does not resolve |

One Khitan entry was deleted rather than corrected: sources [4] and [5] both
pointed at `U18B00.pdf`/`U18D00.pdf` as "Khitan Large" and "Khitan Small", but
U+18B00–U+18CFF *is* the Small Script block and U+18D00–U+18D7F is Tangut
Supplement. Khitan Large Script is not encoded at all. The two became one
correct entry.

## Applied, 2: the dead buttons (78 buttons, 4 distinct targets)

`元` and `経` are not among the 61 characters. `行` is not a key because the map
splits it into `行:1` "go" and `行:2` "row" — the go-on/kan-on article wanted
`行:1`. `ja_on` is not a language code (the Sino-Japanese column is just `ja`,
with `ja_kun` for the native readings), and the dead code was also printed in
the visible label of all nineteen buttons. `es_eu` and `ine` are not LANG_DATA
keys; the map does carry Proto-Indo-European, as `p_ine`.

The `tang-empire-multilingual-coins` button promised 元 in its label while
passing 行, and neither exists. Seventeen of the nineteen language bodies carry
no button there at all, so the two broken ones were deleted rather than
repointed — that makes the article consistent instead of leaving a stub.

**The existing checker had a hole.** `tools/trivia_button_check.js` was already
in the tree, untracked and unwired, and it worked — but it only opened
`wordmap_trivia.js` and `hanmap_trivia.js`. The 30 WordMap articles keep only
en and ja there; the other 17 languages live in `wordmap_trivia_<lang>.js`
overlays, each with its own copy of every button. So it was seeing 2 of 19
copies of every WordMap defect. Folding the overlays in took the scan from
1,579 buttons to 3,447. It now has a `--check` mode and runs as the 26th guard
in `check_all.js`.

What it still cannot see is the class the rally caught: a button whose target
exists but is the wrong one — the Khitan article focusing Mandarin, the
Mongolian-script article focusing Manchu, a label promising 「一」 while the
payload passes 人. That is in the body findings.

## Applied, 3: one broken body

`min-nan-wenbai`'s Japanese body had a stray `</strong>` and a garbled
sentence that mixed 「一」 into a bullet about 二 — a translation-time accident,
found by an HTML balance check rather than by a reader. Repaired to mirror the
current English. The English claim in that bullet is *itself* wrong (see the
nn̄g/兩 finding above), but that is a 19-language body fix and belongs to
phase 2; fixing the markup now and the content later beats shipping malformed
HTML in the meantime.

## Not applied: 363 body findings

Every one of these edits a body, and every body exists in 19 languages, so the
full application is roughly 6,900 text edits. The translations are authored
rather than glossed — they differ in wording, structure and length — so a
find-and-replace does not work, and fixing only the English would recreate
exactly the defect the previous Codex review complained about ("英語原文だけ弱めたが
各翻訳へ cascade していない").

This needs its own pass: correct the English, then reflect each change into the
other 18 languages in the register that translation already uses.

## Notes

1. **A deterministic checker existed and was never wired in.** It found 44 dead
   targets and exited 0. Nothing in `check_all.js` called it. Two of the four
   defects it could see had been in the tree since the articles shipped.
2. **Shared vs. translated fields decide the cost of a fix.** 71 citation
   errors cost 49 edits because `sources` is shared; 159 factual errors cost
   ~3,000 because bodies are not. Worth knowing before choosing what to review.
3. **The verifiers corrected the reviewers, not just judged them.** 325 of 411
   confirmations carry a `correctedProposal`, and several reject the reviewer's
   replacement outright — the Nomura case, where the proposed substitute was a
   magazine-text corpus being asked to source claims about conversation, is the
   clearest.
4. **I introduced a defect while fixing one.** Rewriting the 19 `ja_on` button
   labels, I typed the Hindi one with a Cyrillic а and г inside the Devanagari.
   A mixed-script scan caught it. Any hand-edit across 19 scripts needs that
   check afterwards, not trust.
