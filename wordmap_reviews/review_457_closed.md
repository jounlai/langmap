# Review 457 — NameMap のデータ（全体ラリー3／10）

**日付:** 2026-08-27
**切り口:** 4つ目のデータセット。50の人名 × 43の国・言語セル、計1069の異形。
455・456 と同じ順で、まず構造、次に汚染、最後に規約。

## 構造 — 無傷

| 検査 | 結果 |
|---|---|
| `NM_LANGS` に無いセルへの参照 | **0** |
| 空の form | **0** |
| IPA の無い form | **0**（1069/1069） |
| 不正な `freq` 値 | **0** |
| 語源樹に根が無い | **0**（50/50） |
| 語源樹に根が2つ以上 | **0** |
| 親を指す先が存在しない辺 | **0** |

50本の語源樹すべてが「根が1つ、断線なし」。ここは触るところが無い。

## 発見の入口 — どの IPA 規約ガードも NameMap を読んでいなかった

456 で `lang_name_coverage.js` が「地図は2つ」という前提のままだったのを見つけた直後なので、
同じ問いを立てた。答えは同じだった:

```
affricate_tie_check   reads: hanmap_data.js, words/
surface_tone_check    reads: words/
stress_mark_check     reads: words/
glide_notation_check  reads: words/
surface_ipa_check     reads: hanmap_data.js
```

**`namemap_data.js` を読む規約ガードは1つも無い。** 1069本の IPA は
一度も家内規約に照らされたことが無かった。照らした。

### 違反1 — タイバー 8件

家内規約は破擦音を**素で書く**（`tʃ` `dʒ`、`tools/affricate_tie_check.js`）。
NameMap だけ 8件が `d͡ʒ`:

`george/ar` `gabriel/ar` `gabriel/fa` `gabriel/tr` `arjun/hi` `arjun/bn` `arjun/id` `arjun/ms`

→ 素に直した。

### 違反2 — 単音節に強勢記号 1件

`george/hu` György `/ˈɟørɟ/`。ハンガリー語 György は1音節。
規約は「多音節の**単語**にのみ ˈ」なので外した。

### 違反3 — ベトナム語だけ声調が付いていない

声調言語のセルは `zh`・`vi`・`th`（`ha` は後述）。

| セル | 形の数 | Chao | 声調記号 | **無調** |
|---|---|---|---|---|
| `zh` | 16 | 16 | 0 | **0** |
| `th` | 4 | 0 | 4 | **0** |
| `vi` | 14 | 1 | 1 | **12** |

`vi` だけが穴だった。しかも残る2形も互いに食い違う —
`mary` は `ma˧˧ zi˧˧ a˧˧`（Chao）、`david` は `ɗa vǐt`（カロン。
この記号はアトラスのどこでもベトナム語に使っていない）。

**ベトナム語の正書法は声調を1対1で符号化する**（無記号＝ngang、鋭アクセント＝sắc）。
だから14形すべての声調は**推測ではなく導出**できる。`zh` セルと既存の `mary` 行に合わせて
Chao 記号で全部に付けた。音節区切りも `.` に統一（14形中8形が既にそうだった）。

| 名 | 正書法 | 前 | 後 |
|---|---|---|---|
| john | Gioan | `zawn` | `zawn˧˧` |
| mary | Ma-ri-a | `ma˧˧ zi˧˧ a˧˧` | `ma˧˧.zi˧˧.a˧˧` |
| joseph | Giu-se | `ziw.sɛ` | `ziw˧˧.sɛ˧˧` |
| david | Đa-**vít** | `ɗa vǐt` | `ɗa˧˧.vit˧˥` |
| peter | Phê-rô | `fe ro` | `fe˧˧.ro˧˧` |
| paul | Pha-o-lô | `faː o lo` | `faː˧˧.o˧˧.lo˧˧` |
| thomas | Tô-ma | `to maː` | `to˧˧.maː˧˧` |
| matthew | **Mát**-thêu | `mat.tʰew` | `mat˧˥.tʰew˧˧` |
| adam | A-đam | `aː.ɗaːm` | `aː˧˧.ɗaːm˧˧` |
| noah | Nô-ê | `no.e` | `no˧˧.e˧˧` |
| gabriel | Ga-bri-el | `ɣaː.bri.el` | `ɣaː˧˧.bri˧˧.el˧˧` |
| elijah | Ê-li-a | `e.li.a` | `e˧˧.li˧˧.a˧˧` |
| philip | Phi-**líp**-phê | `fi.lip.fe` | `fi˧˧.lip˧˥.fe˧˧` |
| anthony | An-tôn | `aːn.toŋ` | `aːn˧˧.toŋ˧˧` |

太字が sắc（˧˥）の音節。**分節音は1つも触っていない。**

## 直さなかったもの — ハウサ語

`ha` は19形すべて無調。ハウサ語は確かに声調言語だが、
**正書法が声調を書かない**ので、ベトナム語と違って導出できない。
名前ごとに出典が要る。埋めれば捏造になるので埋めない。

同じ `ha` 行に、声調言語なのに**強勢記号**が付いた形が3つある
（`adam aˈdamu`・`noah nuˈhu`・`elijah iljaˈsu`）。
ハウサ語は強勢ではなく声調で卓立を作るので、これは範疇の取り違えの疑いが濃い。
ただし外すか声調に置き換えるかは出典なしに決められないので、ハンドオフに送った。

## ガード拡張

`affricate_tie_check.js` と `stress_mark_check.js` が
`namemap_data.js` + `namemap_names_ext.js` を読むようにした。

検証: `george/ar` にタイバーを戻す → `[NameMap] george/ar "d͡ʒirdʒis"` を検出。
`george/hu` に ˈ を戻す → `hu george György /ˈɟørɟ/ — ˈ on a monosyllable` を検出。
どちらも元に戻して 0 を確認。

## まとめ

| 項目 | 結果 |
|---|---|
| 構造の欠陥 | **0** |
| タイバー | 8 → **0** |
| 単音節の強勢 | 1 → **0** |
| 無調の声調セル | vi 12 → **0**（ha 19 は出典待ち） |
| ガードの死角 | 規約ガード2本が NameMap を読むようになった |

455・456・457 で共通していたのは、**データではなくガードの被覆範囲**だった。
地図が2つだった頃に書かれた前提が、3つ目・4つ目のデータセットを素通りさせていた。
