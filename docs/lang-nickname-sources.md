# Language nicknames — sources

Every row in `lang_nicknames.js` must appear here with a source, and
`tools/lang_nickname_check.js` fails the build if one does not. The rule the
table exists to enforce: **a nickname must be a name people really use.** Not
an abbreviation invented to save space on a label, not a translation of the
formal name. This dataset is the default on the goods hand-off, so an entry
here can end up printed across someone's chest — a missing nickname costs
nothing and a wrong one costs a lot.

Nicknames are per UI language and only where that language really uses one.
Japanese says シングリッシュ and German says Singlish; neither is a translation
of the other and both are attested. Where a UI has no attested nickname, the
row is simply absent for that UI and the formal name shows in its place.

| ui | code | nickname | source |
|---|---|---|---|
| en | ar | Fusha | Al Jazeera, "The complex language debate in Morocco", 27 Apr 2014: "The complex and unresolved relationship between fus'ha and darija has long fuelled controversy in Morocco." https://www.aljazeera.com/news/2014/4/27/the-complex-language-debate-in-morocco ; Glottolog stan1318 lists "Fusha", "Fus'ha", "Al-FusHa" as alternative names. Chosen over "MSA", which is an initialism of an English descriptive label rather than a name |
| en | ar_gulf | Khaleeji | The National (UAE), "Ask Ali: On Arabic dialects": "Around here, we have Gulf Arabic or Khaleeji - again, not a written but a spoken language." https://www.thenationalnews.com/lifestyle/ask-ali-on-arabic-dialects-1.431795 ; Glottolog gulf1241 lists "Khaliji" |
| en | ar_ma | Darija | Al Jazeera, "The complex language debate in Morocco", 27 Apr 2014: "urged the country to integrate darija, the colloquial form of Arabic, into early childhood education" https://www.aljazeera.com/news/2014/4/27/the-complex-language-debate-in-morocco — safe here only because `arq` Algerian Arabic and `ar_tn` Tunisian Arabic keep their formal names; darija/derja is the pan-Maghrebi word for the vernacular |
| en | cu | OCS | Dictionary.com, "Old Church Slavonic" (Random House): entry carries "Abbreviation: OCS". https://www.dictionary.com/browse/old-church-slavonic — a standard abbreviation genuinely used as a name in Slavistics |
| en | en_aave | AAVE | Concise Oxford Companion to the English Language, "African-American Vernacular English": "AFRICAN-AMERICAN VERNACULAR ENGLISH Short form AAVE" https://www.encyclopedia.com/humanities/encyclopedias-almanacs-transcripts-and-maps/african-american-vernacular-english — the neutral in-use name; "Ebonics" is rejected below |
| en | en_my | Manglish | The Star (Malaysia), "Primer on Manglish", 14 Oct 2011, https://www.thestar.com.my/lifestyle/viewpoints/mind-our-english/2011/10/14/primer-on-manglish — major national-newspaper usage as the name of the variety. No fetchable dictionary entry was obtained (OED/M-W/Collins/Cambridge all blocked), so this rests on press usage |
| en | en_sg | Singlish | OED, "Singlish, n.²", earliest use 1975, Anthropological Linguistics (J. T. Platt, "The Singapore English speech continuum and its basilect 'Singlish' as a 'creoloid'"), https://www.oed.com/dictionary/singlish_n2 ; Dictionary.com, "Singlish": "a variety of English spoken in Singapore, incorporating elements of Chinese and Malay" https://www.dictionary.com/browse/singlish |
| en | en_wls | Wenglish | Nation.Cymru, "Wenglish: Experts research how the English language is used in day-to-day life in Wales" (Speak for Yersel Wales, Prof. Mercedes Durham and Dr Jonathan Morris, Cardiff Univ.): "aspects of 'Wenglish' are still regularly used today" https://nation.cymru/feature/wenglish-experts-research-how-the-english-language-is-used-in-day-to-day-life-in-wales/ — caveat: canonically the South Wales Valleys dialect (cf. Robert Lewis, "Wenglish: The Dialect of the South Wales Valleys"), used popularly for Welsh English at large |
| en | fa | Farsi | Dictionary.com, "Farsi" (Random House): "the modern Iranian language of Iran and western Afghanistan, written in the Arabic alphabet; modern Persian"; British (Collins) sense: "another name for Persian" https://www.dictionary.com/browse/farsi — precise on this map because `prs` Dari and `tg` Tajik are separate rows. Some Persian speakers object to "Farsi" in English on correctness grounds; no source treats it as offensive |
| en | ht | Kreyòl | MIT News / Prof. Michel DeGraff, via Phys.org, "Linguistic scholar on Haiti's new policy for teaching in Kreyòl": "In Haiti, at least 95 percent of the population is fluent in Kreyòl only."; "Article 5 of Haiti's 1987 constitution, which made Kreyòl an official language alongside French." https://phys.org/news/2015-07-linguistic-scholar-haiti-policy-kreyl.html |
| en | hwc | Hawaiian Pidgin | NBC News, "Hawaiian Language, Pidgin Data Revealed in New U.S. Census Bureau Report": "Hawaiian Pidgin or Pidgin, also called Hawaii Creole English, developed from the mix of Chinese, Japanese, Filipino, Portuguese, Hawaiian, and English languages spoken by the diverse workers on Hawaii's sugar plantations." https://www.nbcnews.com/news/asian-america/hawaiian-language-pidgin-data-revealed-new-u-s-census-bureau-n495006 — bare "Pidgin" is the local self-label but is globally ambiguous on a 1,187-pin map, so the two-word form is used |
| en | hy_grab | Grabar | Armenian Institute (London), "All about Old Armenian!": "As the old Armenian literary language, Grabar had been in use from the 5th century well into the middle of the 19th century." https://www.armenianinstitute.org.uk/viewstext/2020/9/28/all-about-old-armenian — the community's own term, used untranslated in English (cf. the textbook "GRABAR: An Introduction to Classical Armenian") |
| en | ja_oki | Uchinaaguchi | Hawai'i Public Radio, "Cultural reconnection could save the Okinawan language from extinction", 30 Sep 2024: "But the words being spoken on the radio weren't Japanese — they were Uchinaaguchi, traditional to Okinawa." https://www.hawaiipublicradio.org/local-news/2024-09-30/okinawan-language-uchinaaguchi-extinction-hawaii ; George Washington Univ. LibGuide, "Shimakutuba and Uchinaaguchi (Ryukyuan Languages and Dialects)" https://libguides.gwu.edu/okinawa/languages . RULE 6: longer than "Okinawan", justified as the name speakers and revitalisation programmes use |
| en | jam | Patwa | Univ. of the West Indies, Mona, "'Patwa' — Official Language in Jamaican Schools?": "The survey indicates that the majority of Jamaicans recognise Jamaican patwa as a language" https://www.mona.uwi.edu/marcom/uwinotebook/entry/1487 . Round 527: the Glottolog clause that stood here was cut — on jama1262 "Patwa" is the SWEDISH label, not an English alternative name |
| en | kaw | Kawi | Univ. of Michigan Press, Mary S. Zurbuchen, "Introduction to Old Javanese Language and Literature: A Kawi Prose Anthology", https://www.fulcrum.org/concern/monographs/dr26z0429 — the title itself equates Old Javanese with Kawi; Kawi is the traditional name of the literary language |
| en | nds | Plattdeutsch | Dictionary.com, "Plattdeutsch": "the Low German vernacular dialects spoken in northern Germany"; British sense "another name for Low German" https://www.dictionary.com/browse/plattdeutsch ; Glottolog nds lists "Plattdeutsch" among alternative names. RULE 6: longer than "Low German", justified as the everyday name. Bare "Platt" could not be sourced and was dropped |
| en | p_ine | PIE | Wiktionary, "PIE", proper noun: "Initialism of Proto-Indo-European", with the quotation "…their descent from a common ancestor, Proto-Indo-European (PIE)." https://en.wiktionary.org/wiki/PIE — a universal abbreviation pronounced as a word, which is the point of printing it |
| en | pal | Pahlavi | Dictionary.com, "Pahlavi" (Collins sense): "the Middle Persian language, esp as used in classical Zoroastrian and Manichean literature" https://www.dictionary.com/browse/pahlavi ; Encyclopaedia Iranica, "MIDDLE PERSIAN LITERATURE i. PAHLAVI" https://www.iranicaonline.org/articles/middle-persian-literature-1-pahlavi/ (URL corrected in round 527). Caveat: strictly Zoroastrian Middle Persian in Book Pahlavi script, and it is also the last Iranian dynasty's name |
| en | pcm | Naijá | IFRA-Nigeria / Naijá Langwej Akedemi, "Guide to Standard Naijá Orthography": "the adoption of Naijá as the new name for the language" and "the term 'pidgin' has helped to encourage derogatory connotations about the language". https://ifra-nigeria.org/research/former-projects/89-guide-to-standard-naija-orthography- — deep link supplied by round 527; the site root cited before contains neither sentence |
| ja | ar | フスハー | 世界大百科事典（旧版）「アラビア語」項の中のフスハーの説明（round 527 で訂正：独立項目ではない）：「現代ではアラブ世界の共通語として習得されるべき〈純正語〉(フスハーal-fuṣḥā)とされ，公式の場面では話し言葉としても用いられ」 https://kotobank.jp/word/ふすはー-1405630 — 独立項目として立項されている |
| ja | en_sg | シングリッシュ | 金井裕美子「新しい英語: シングリッシュ : その誕生と現在に至るまで」慶應義塾大学学術情報リポジトリ(KOARA) https://koara.lib.keio.ac.jp/xoonips/modules/xoonips/download.php/0302-0000-0386.pdf?file_id=15096 — 論文題目に語として採用。国語辞典の見出しは未確認 |
| ja | ja_mvi | ミャークフツ | 内閣府沖縄総合事務局 平良港湾事務所「ミャークフツ ～宮古の方言」 https://www.dc.ogb.go.jp/hirarakou/kenbunroku/hougen/ — 政府機関のページ題に採用。RULE 6: 宮古語より長いが、現地での自称であり継承活動で使われる形 |
| ja | ja_oki | うちなーぐち | 国立国語研究所『うちなーぐち活用辞典』(2021)、国立国会図書館サーチ https://iss.ndl.go.jp/books/R100000002-I031348734-00 — 国研の刊行物名に採用。RULE 6: 沖縄語より長いが、話者自身の呼称。表記ゆれ（ウチナーグチ／沖縄口）あり、国研の書名に合わせ平仮名 |
| ja | pal | パフラヴィー語 | 山川出版社『世界史小辞典』改訂新版「パフラヴィー語」項：「中期ペルシア語の通称。」 https://kotobank.jp/word/ぱふらゔいー語-3131467 — 辞典が明示的に「通称」と記載。RULE 6: 字数はほぼ同じだが、一般的な認知度はこちらが高い |
| ja | sa | 梵語 | デジタル大辞泉「サンスクリット語の異称。」／精選版 日本国語大辞典「サンスクリット語の別称。…中国および日本でいう称。」 https://kotobank.jp/word/梵語-133217 — 三辞典すべてに立項。最も堅い一件 |
| ja | wuu | 上海語 | 改訂新版 世界大百科事典「上海語」項：「中国の上海市で使用される呉語中国語（呉方言）のなかの代表的方言の一つ。〈上海話〉，あるいは〈滬語（こご）〉という。」 https://kotobank.jp/word/上海語-287740 — 辞典の見出し語。地図側の「上海呉語」は呉語諸行との体系的な区別のための命名 . Round 527 suspended this entry because wordmap_data.js called the row "Wu Chinese" while lang_names.js called it Shanghainese; round 533 settled it — the row's own cells are Shanghai (姆妈 m̩ma, 水 sz̩˧˥) and 18 of the 19 UIs already said Shanghai Wu, so English was the outlier and was aligned |

## Rejected, and why

Line 23 of this file used to say "'Ebonics' is rejected below" with no *below* —
every rule-5 rejection lived only in reviewers' memory, which is the worst place
for the one rule `tools/lang_nickname_check.js` cannot enforce. Round 530 filed
that as the repair to prioritise. Here it is, and it is part of the dataset:
a rejection that is not written down gets re-proposed.

| candidate | for | ground | why |
|---|---|---|---|
| Ebonics | en_aave | slur | effectively a pejorative in current use; AAVE is the neutral in-use name |
| 黒人英語 | en_aave | register | not dictionary-offensive, but Japanese scholarship deliberately avoids it — not a thing to put on a garment |
| Anglo-Saxon | ang, en | political | a documented supremacist dog-whistle in English; the International Society of Anglo-Saxonists renamed itself over its use *in public discourse*, while leaving scholarly use alone. A T-shirt is public discourse |
| アングロサクソン語 | ang, ja | rule 6 | the Japanese term carries none of that charge, and the en/ja split was correctly reasoned — but a printed shirt has no UI. Asked what it says, the answer is "Anglo-Saxon", in English. It also fails rule 1: 古英語 is the everyday Japanese name, is shorter, and 世界大百科事典 defines アングロサクソン語 as 「古英語の別称」 — the dependence runs the wrong way |
| Gypsy | rom | slur | — |
| Berber | zgh, tzm and kin | political | exonym from Latin *barbarus*; Amazigh is the communities' own term |
| Eskimo | ik and kin | slur | — |
| Taki-Taki | srn | slur | the weakest of the rejections — it needs a real citation before it could ever be reconsidered |
| 支那語 | zh | slur | — |
| 閩南語 | nan | political | Taiwanese civic groups objected on character grounds (閩 contains 虫, 南 pairs with 蠻夷) and the MOE renamed its certification 臺灣台語. Adding NO nickname was also right: Hakka groups warn that 台語 implies other mother tongues are not Taiwanese, and Kinmen/Matsu speakers resist it. **Where every available nickname belongs to one side, the formal name is the answer.** |
| Strine | en_au | **register, NOT a slur** | round 530 corrected the ground this was filed under. Australians coined it, publish it, and treat it as heritage. The objection is that it is a mock-phonetic respelling of "Australian" in a broad accent — "Emma Chisit" for "how much is it" — so the name works by imitating the accent it names: self-deprecation from inside, mimicry from outside |
| mame-loshn | yi | ownership | it names a RELATIONSHIP, not a language: JEL's first sense is "a mother tongue", and its own cited author glosses it mid-sentence. Printed alone it is a first-person claim by the wearer. "Yiddish" is already short and warm |
| Lallans | sco | scope | the south/central dialects plus the 20th-c literary "synthetic Scots"; Doric and Insular Scots sit outside it, so a Doric speaker choosing "Scots" would be handed a variety that is not theirs. "Scots" is shorter and covers everybody |
| Twi | ak | scope | the collective name for Asante/Akuapem/Bono — it **excludes Fante**, and Ghana chose "Akan" precisely so the cover name would not belong to one group |
| Manc | en_manc | not a language name | attested only attributively ("the *Manc* accent"); standing alone Collins gives "a native or inhabitant of Manchester", so printed alone it says *I am from Manchester* |
| MSA, Sranan, Nynorsk, Kalaallisut, Euskara, Malti, Runasimi, 台語, 漢文, Platt, Tounsi | various | rule 1 | endonyms and ISO reference names are rival FORMAL names, not nicknames |

## Carried as notes, not rejections

- **`en.pal` Pahlavi** — bare across a chest, to an Iranian-diaspora reader, reads
  first as the dynasty. `ja.pal` パフラヴィー語 does not have this problem because
  the 語 suffix disambiguates. Recorded, not acted on.
- **`ja.my`** — ビルマ語 vs ミャンマー語 is not a nickname question but a
  **position**: the Burmese pro-democracy diaspora in Japan says ビルマ because the
  renaming was done unilaterally by a government without popular mandate, while
  the Japanese state changed its own usage in step with SLORC, and ビルマ carries a
  wartime register besides. Round 527 briefly made ビルマ語 the formal Japanese
  name for consistency with English "Burmese"; round 530 reverted it. **This is
  the owner's call to make knowingly, not one to inherit from a dictionary
  headword.**
- **`en.nds` Plattdeutsch inverts the expected direction.** Universität Oldenburg:
  "the term *Low German* has been used pejoratively for centuries" — academics
  reached for it because Plattdeutsch "was probably not refined enough". Here the
  nickname is the speakers' word and the FORMAL name carries the contempt.

