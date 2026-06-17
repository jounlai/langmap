# Wordmap review #191 — 30-reviewer × 10-developer rally (all 20 word files, by language family)

## Summary

Large multi-agent rally over words/*.js (20 words × 1000 languages/varieties = ~20,000 [surface, IPA] cells). 30 reviewers (split by language family) audited surface↔IPA correspondence, Chao-tone notation, intra-column and sibling consistency; 10 developers skeptically verified each finding (apply/reject) against the data and each language own column. ~190 prior reviews respected.

- **Total findings: 168** (確実 83 / 蓋然 61 / 要検討 24)
- **Developer-verified: 167** (apply 141 / reject 26)
- **Applied: all 141** — 確実 80 + owner-confirmed 61. Validator PASS.
- Owner policy decisions: ② IPA-consistency (45, apply), ① surface-form change (9, apply), ③ IPA transcription-preference (7, apply — chose the verified single transcription; multi-IPA notation declined).
- 40 agents, ~2.5M tokens, 28 min.

---

## A. Applied — 確実 (80)

### cat — `hmn` 【確実】
- **Applied:** `[miv, mi˨˦]`
- Confirmed against the White Hmong tone literature (Esposito/Garellek, UCLA voice project): the mid-rising tone (RPA -v, [24]) is MODAL; breathy phonation is exclusive to the mid-low tone (RPA -g, here ˦˨ʱ in muag/tsaug). The column correctly maps -g→˦˨ʱ and -m→˨˩ˀ (creaky), so the ʱ on every -v cell is phonologically spurious. Remove the trailing ʱ; tone ˨˦ intact.

### cat — `hni` 【確実】
- **Applied:** `[mil, mi˥˥]`
- Current 'mil' leaves ⟨l⟩ literal/untoned. Hani final ⟨l⟩=high-level ˥˥ tone, not coda (confirmed externally). Dataset's own one 'tiul'→'tiu˥˥' and water 'lol'→'lo˥˥' establish the convention. Fix correct.

### dog — `hmn` 【確実】
- **Applied:** `[dev, tɛ˨˦]`
- Same systematic -v error. -v (mid-rising [24]) is modal, not breathy; breathy is reserved for -g. The ʱ on tɛ˨˦ʱ is spurious. Parallel to miv/txiv/tsev. Remove ʱ.

### dog — `ami` 【確実】
- **Applied:** `[wacu, watsu]`
- Amis ⟨c⟩ = /ts/ (Wikipedia/Omniglot: 'in the practical orthography /ts/ is written ⟨c⟩'), optionally palatalized [tɕ] only before /i/. Before /u/ in wacu there is no palatalization, so the current [watʃu] (postalveolar tʃ) is wrong; correct base value [watsu]. Genuine error.

### dog — `ab` 【確実】
- **Applied:** `[ала, aˈlːa]`
- Abkhaz а-ла 'the dog' is the standard reference pair vs [ˈala] 'the eye'; the Cwyzhy Abkhaz IPA illustration gives [aˈlːa] — final stress + GEMINATE /lː/, not a long vowel. Current [aːla] mislocates length on the vowel. The rest of the ab column correctly uses short /a/ for the article prefix (fire amtsa, water adzə, tree atsʼla). Length belongs on /l/: aˈlːa. (Note: the dataset's 'eye' cell is абла/abla, a different lexeme, so the on-screen minimal pair isn't present, but the cited form for ала 'dog' stands.)

### dog — `bgq` 【確実】
- **Applied:** `[कुत्तो, kutːo]`
- Current IPA 'kutːoʔ' has an unlicensed final ʔ — surface कुत्तो ends in vowel ⟨ो⟩/o/. Every other bgq -o word is plain (drink piːʋɳo, good tʃoːkʰo, heart hivəɽo, moon tʃando); no other bgq cell carries a glottal. ʔ is spurious. kutːo correct. Apply.

### dog — `dur` 【確実】
- **Applied:** `[mvù, mvu˩]`
- Surface 'mvù' (grave=low) but IPA 'mvu' omits tone. Add Chao low ˩ → mvu˩. Same systematic dur tone-dropping. Apply.

### dog — `kgg` 【確実】
- **Applied:** `[agəi, aɡəi]`
- Confirmed placeholder garbage: the cell is literally ["ipa","ipa"], not a Kusunda word. Real form agəi (Watters 2006) restored. NOTE: I adjusted the reviewer's IPA ɐɡəj to aɡəi for column consistency — the kgg column transcribes ⟨a⟩ as /a/ (ama→ama, gam→ɡam), never /ɐ/, and ⟨i⟩ as /i/ (gisi→ɡisi), not /j/. The reviewer's ɐɡəj mixed a surface from one source with an IPA from another and is internally inconsistent with both its own surface and the column.

### dog — `xct` 【確実】
- **Applied:** `[ཁྱི, tɕʰi]`
- Confirmed defect. ཁྱི (khyi) opens with the aspirated radical ཁ; Standard/Lhasa Tibetan ཁྱ→[tɕʰ] (verified). Current xct cell is ['ཁྱི','tɕi'] — aspiration dropped. The identical orthography ཁྱི is correctly rendered tɕʰi in sibling column xct_litpr, and xct aspirates every other aspirated radical (water ཆུ→tɕʰu, father ཕ→pʰa, thanks tʰukdʑe tɕʰe). Restore aspiration: tɕʰi.

### drink — `za` 【確実】
- **Applied:** `[gwnraemx, kɯn˨˦ɣam˦]`
- Verified internal inconsistency. The morpheme gwn 'eat' is kɯn˨˦ in eat.js, and za's tone-1 (unmarked) syllables are uniformly ˨˦ across the column (ma˨˦, da˨˦, sim˨˦, dei˨˦). Here gwn is written kɯn˥, contradicting its own dedicated cell and the column convention. Second syllable raemx=ɣam˦ already matches water 淰=ɣam˦. Only the gwn tone is corrected to ˨˦.

### drink — `nv` 【確実】
- **Applied:** `[yishdlą́, jiʃtɬã́ː]`
- Navajo ⟨dl⟩ is the voiceless unaspirated lateral affricate /tɬ/ (Young & Morgan; confirmed on Navajo phonology). Current jiʃtlã́ː writes a plain t+l cluster, which is wrong and inconsistent with the column's own lateral notation (moon tłʼéhonaaʼéí→tɬʼ…, one tʼááłáʼí→…ɬ…). Fix tl→tɬ: jiʃtɬã́ː. Genuine error.

### drink — `nhe` 【確実】
- **Applied:** `[atli, atɬi]`
- Same ā-tl 'water' root. nhe writes that root's /tɬ/ as the lateral affricate in its own water cell (atl→atɬ), and in fire titl→titɬ, heart yollotl→jolːotɬ, eat tlacua→tɬakʷa. Here it renders atli→atli (plain). Siblings agree on the lateral: ngu atli→atɬi, nci ātli→aːtɬi. Internal + sibling inconsistency. Fix atli→atɬi.

### drink — `hni` 【確実】
- **Applied:** `[dol, do˥˥]`
- Current 'dol' keeps literal /l/. Final ⟨l⟩=˥˥ tone per convention. Same defect class as cat/house/sun. Fix correct.

### drink — `wbp` 【確実】
- **Applied:** `[purrami, purami]`
- Confirmed. Warlpiri ⟨rr⟩ = alveolar trill /r/, single ⟨r⟩ = retroflex approximant /ɻ/ (verified via Warlpiri orthography source: rr=trill, r=retroflex approximant). Current puɻami wrongly renders the trill ⟨rr⟩ as /ɻ/; the column uses /ɻ/ correctly only for single ⟨r⟩ (pira→piɻa, wankaru→waŋkaɻu). Trill = /r/, giving purami. Surface unchanged.

### eat — `czh` 【確実】
- **Applied:** `[吃, t͡ɕʰi˨˦]`
- Verified outlier. czh palatalizes to the alveolo-palatal series before front vowels everywhere in its column (心 ɕin, 谢谢 ɕie, 树/水 ɕy, 眼睛 tɕin). 吃 has the /i/ rime, so the onset must be t͡ɕʰ, not the postalveolar tʃʰ — the lone postalveolar in the column. The fix matches the surface and the column's own convention; rime and tone ˨˦ unchanged.

### eat — `chy` 【確実】
- **Applied:** `[mésehe, mésehe]`
- Current IPA 'méʔsehe' inserts a ʔ the surface 'mésehe' does not license (no apostrophe). Cheyenne writes glottal stop as apostrophe; the chy column carries ʔ only where the surface has an apostrophe (pó'po→poʔpo, ho'ėstá→hoʔɛsta, no'ka→noʔka) and never where it lacks one (mane, pevohto). Acute é (high pitch) retained as elsewhere (néhe'e→néheʔe). Spurious ʔ removed. Apply.

### eat — `dur` 【確実】
- **Applied:** `[kpén, kpen˥]`
- Surface 'kpén' (acute=high) but IPA 'kpen' omits tone. Add Chao high ˥ → kpen˥. Consistent with the systematic dur pattern. Apply.

### eat — `itz` 【確実】
- **Applied:** `[jant, hant]`
- Current 'χant' uses uvular /χ/. Itza ⟨j⟩=/h/; Yucatecan languages lack /χ/ (confirmed externally). Itz's own one 'jun'→'hun', water 'jaʼ'→'haʔ', and sibling yua eat 'jaant'→'haːnt' all confirm ⟨j⟩=/h/. Fix to /h/ correct.

### eat — `rki` 【確実】
- **Applied:** `[စား, sá]`
- Confirmed defect. Current rki cell is ["စား","sa"] with no tone. The surface စား carries the Burmese/Rakhine high-tone marker (◌ား). The rki column itself uses the acute for high tone elsewhere (dog kʰwé, good káuɴ, heart n̥əlóuɴ), and the my sibling column (same word/script) = ["စား","sá"]. Bare 'sa' is a dropped phonemic tone, not an alternate convention. Fix sá is correct and matches surface + my.

### eat — `wbp` 【確実】
- **Applied:** `[ngarni, ŋaɳi]`
- Confirmed. Warlpiri ⟨rn⟩ digraph = retroflex nasal /ɳ/, not a sequence /ɻn/. The SAME column handles ⟨rn⟩ correctly in ngumarna→ŋumaɳa (and ⟨rnt⟩ in jarntu→caɳʈu). Current ŋaɻni mis-splits the digraph. Correct: ŋaɳi. Surface unchanged.

### eye — `hmn` 【確実】
- **Applied:** `[qhov muag, qʰɔ˨˦mua˦˨ʱ]`
- First syllable qhov is -v (modal mid-rising) — its ʱ is spurious and must go. Second syllable muag is -g (mid-low) — its breathy mua˦˨ʱ is correct and kept. Only the first ʱ is removed.

### eye — `csb` 【確実】
- **Applied:** `[òkò, wɔkwɔ]`
- Current IPA 'ʷɔkʷɔ' opens with a floating superscript ʷ that has no host consonant at word-start — malformed. Kashubian ⟨ò⟩ is the labialized onglide [wɔ]; both ⟨ò⟩ in òkò take full [w]. csb already uses full [w] for the onglide in hello (witôj→ˈvitwɔj). wɔkwɔ correct. Apply.

### eye — `mic` 【確実】
- **Applied:** `[pukweck, puɡʷedʒɡ]`
- Confirmed. Mi'kmaq voices voiceless stops only between sonorants; word-initially they stay voiceless. Current buɡʷedʒɡ wrongly voices initial p→b. The column's fire puktew→puɡdew keeps initial p as /p/, confirming the rule. Only initial b→p changes; the rest (intervocalic kw→ɡʷ, c→dʒ, final ck→ɡ) is correct. (Note: hand piten→biden in the same column also violates this rule but is out of scope.)

### eye — `toj` 【確実】
- **Applied:** `[satej, sateh]`
- Confirmed, wrong twice. Tojolabal ⟨j⟩ = /h/ in every other cell: naj→nah, yuj→juh, ja(jaʼ water)→haʔ, jun→hun. Current eye satej→satex renders final ⟨j⟩ as /x/; even ⟨x⟩ in this column = /ʃ/ (ixaw→iʃaw, moon), so /x/ does not occur at all. Correct IPA is sateh. Surface unchanged.

### father — `hmn` 【確実】
- **Applied:** `[txiv, tɕi˨˦]`
- Same -v error: mid-rising tone is modal, the trailing ʱ wrongly imports the -g breathy phonation. Onset tɕ already matches the column's uniform palatalization of tx/ts/z. Remove ʱ.

### father — `hni` 【確実】
- **Applied:** `[adal, ada˥˥]`
- Current 'adal' keeps literal /l/. Disyllabic a.da + final ⟨l⟩=˥˥ tone on last syllable; mid syllables unmarked. Fix correct.

### father — `kpe` 【確実】
- **Applied:** `[laai, laːi]`
- Confirmed. IPA laai is a raw copy of orthography with no length marked. The kpe doubled-vowel = long-vowel convention is exceptionless across the column: yee→jeː, lii→liː, ngaa→ŋaː, taa→taː, woo→woː, nyii→ɲiː, halee→haleː. Only father laai breaks it; ⟨aa⟩→/aː/ gives laːi.

### father — `ssw` 【確実】
- **Applied:** `[babe, ɓaɓe]`
- Confirmed. Nguni orthographic ⟨b⟩ = implosive /ɓ/ (⟨bh⟩ = plosive /b/). The ssw column already transcribes ⟨b⟩ as /ɓ/ in hello (sawubona→sawuɓona) and thanks (ngiyabonga→ŋijaɓoŋɡa). 'babe' (siSwati 'father', plain ⟨b⟩) is the lone ⟨b⟩ cell left as [b], internally inconsistent. ɓaɓe is correct (cf. Zulu ubaba /uɓaɓa/). Surface unchanged.

### father — `wbp` 【確実】
- **Applied:** `[kirda, kiɖa]`
- Confirmed. Warlpiri ⟨rd⟩ digraph = single retroflex stop/flap, transcribed /ɖ/ by this very column at word-initial in rdaka→ɖaka. Current kiɻda wrongly splits it into /ɻ/+/d/. Corrected to kiɖa, matching the column's own rdaka convention. Surface unchanged.

### father — `zap` 【確実】
- **Applied:** `[bixhoze, biʃoze]`
- Confirmed via Wikipedia Isthmus Zapotec consonant table: ⟨xh⟩ = voiceless /ʃ/, ⟨x⟩ = voiced /ʒ/, ⟨dx⟩ = /dʒ/ (footnote: ⟨xh⟩ written plain ⟨x⟩ before a consonant). Current cell ['bixhoze','biʒoze'] maps intervocalic ⟨xh⟩ to the VOICED /ʒ/ — reversed. The column's other branch is already correct: thanks xtiozenu (x before consonant = /ʃ/) → ʃtjozenu, and dx→dʒ in heart ladxi→ladʒi. Fix IPA ʒ→ʃ: biʃoze.

### fire — `pi` 【確実】
- **Applied:** `[अग्गि, aɡːi]`
- Confirmed style inconsistency. The pi column writes geminates with length mark ː (eye चक्खु=tɕakːʰu, hand हत्थ=hatːʰa) and the parallel pi_edu writes this exact word aggi=aɡːi. Only fire अग्गि (aɡɡi) and tree रुक्ख use the doubled-letter style. Fix aɡɡi→aɡːi aligns with the column majority and pi_edu; transcribes the geminate gg correctly.

### fire — `rki` 【確実】
- **Applied:** `[မီး, mí]`
- Confirmed. Current ["မီး","miː"] uses a length mark instead of tone. Surface မီး bears the high-tone marker (◌ီး); my sibling = ["မီး","mí"]. The rki column marks tone with the acute on the same kind of syllables (kʰwé, káuɴ), so writing only length drops the contrastive high tone. mí matches surface + my.

### fire — `wbp` 【確実】
- **Applied:** `[warlu, waɭu]`
- Confirmed. Warlpiri ⟨rl⟩ digraph = retroflex lateral /ɭ/, not /ɻl/. Current waɻlu mis-splits the digraph, parallel to the ⟨rn⟩→/ɳ/ and ⟨rd⟩→/ɖ/ digraphs the column already handles correctly. Correct: waɭu. Surface unchanged.

### good — `ko_mid` 【確実】
- **Applied:** `[됴타, tjotʰa]`
- Confirmed surface-IPA mismatch. The second syllable 타 = ㅌ (tieut) = aspirated /tʰ/, but the current IPA tjota writes plain t, dropping the aspiration. The sibling ko_em has the identical surface 됴타 transcribed correctly as tjotʰa. The fix makes the IPA match the surface ㅌ.

### good — `dur` 【確実】
- **Applied:** `[gáà, ɡa˥a˩]`
- dur is tonal; surface marks tone (gáà = acute+grave = high+low) but IPA 'ɡaa' strips it. Dataset convention is Chao letters in IPA. Standard diacritic mapping acute=˥, grave=˩ → ɡa˥a˩. Defect confirmed systematic across the dur column (every toned surface, zero IPA tone). Apply.

### hand — `pau` 【確実】
- **Applied:** `[chim, ʔim]`
- Confirmed defect. Palauan orthographic ⟨ch⟩ = glottal stop /ʔ/ (standard, Palauan grammar). Current 'tʃim' wrongly treats ⟨ch⟩ as English affricate. The pau column already applies Palauan's other orthographic conventions (⟨d⟩=[ð]: mað, ðɛmak, ðɛlak), so ⟨chim⟩ must be [ʔim]. Fix transcribes the surface correctly.

### hand — `ami` 【確実】
- **Applied:** `[kamay, kamaj]`
- Final ⟨ay⟩ in Amis is the glide diphthong [aj] (cf. citation cecay [tsᵊtsaj]). Current [kamai] treats it as a disyllabic vowel sequence, inconsistent with the language's glide treatment. Fix kamaj.

### hand — `mam` 【確実】
- **Applied:** `[qʼobʼ, qʼoɓ]`
- Confirmed. Surface codepoints q-ʼ-o-b-ʼ: the final b+U+02BC is Mam ⟨bʼ⟩, the glottalized bilabial = implosive /ɓ/, phonemically distinct from plain b. Current IPA qʼob renders it as plain pulmonic /b/, collapsing the contrast. The initial qʼ is correctly transcribed, and other Mam glottalized stops keep their marking (qʼaqʼ, kʼaːn, tʃʼjan, tseʔ). Correct to qʼoɓ.

### hand — `mvc` 【確実】
- **Applied:** `[qʼobʼ, qʼoɓ]`
- Confirmed cur=["qʼobʼ","qʼob"]. ALMG Mam ⟨bʼ⟩=[ɓ] voiced bilabial implosive (verified). Mayan languages contrast pulmonic vs glottalized, so plain b vs glottalized bʼ is a real contrast the file keeps: good baʼnxh→baʔnʃ has plain initial [b]. Current qʼob collapses glottalized ⟨bʼ⟩ to plain [b], losing the contrast. Fix to qʼoɓ.

### heart — `ca` 【確実】
- **Applied:** `[cor, kɔɾ]`
- Confirmed. Catalan post-vocalic/coda single ⟨r⟩ is the tap [ɾ]; the trill [r] occurs only word-initially and in ⟨rr⟩. The current kɔr uses the trill in a coda. Every other rhotic in the Catalan column is the tap ɾ (amor əmoɾ, pare paɾə, mare maɾə, beure bewɾə, arbre aɾbɾə, gràcies ɡɾasiəs). cor is the lone trill — an unmotivated inconsistency. Coda ⟨r⟩ → [ɾ].

### heart — `kry` 【確実】
- **Applied:** `[rik', rikʼ]`
- Confirmed. Surface codepoints are r-i-k-I where the final char is U+0049 LATIN CAPITAL I, an erroneous palochka-substitute standing in for the ejective marker. IPA rikʼ confirms ejective /kʼ/. The kry column writes ejectives with an apostrophe (fire ts'a uses U+0027; dog xveqʼ uses U+02BC). Replace the capital I with an apostrophe (U+0027, matching fire). IPA unchanged.

### hello — `za` 【確実】
- **Applied:** `[mwngz ndei, mɯŋ˧˥dei˨˦]`
- Verified internal inconsistency. The morpheme ndei 'good' is dei˨˦ in good.js and follows za's uniform tone-1=˨˦ pattern, but here it is dei˥. First word mwngz=mɯŋ˧˥ is correct (matches thanks.js, -z tone). Correct only ndei to dei˨˦.

### hello — `mg` 【確実】
- **Applied:** `[manao ahoana, manau ahuana]`
- Confirmed defect. mg column rigorously applies orthographic ⟨o⟩→[u] (masu, afu, fu, tɾanu, vulana, ɾanu, masuandɾu) including the first word here manao→manau. The second word 'ahoana' alone kept [o]. Fix changes only o→u in the second word, matching the column's own convention; surface unchanged.

### hello — `be` 【確実】
- **Applied:** `[прывітанне, prɨvʲitanʲːe]`
- Confirmed defect. Surface прывітанне has geminate ⟨нн⟩ but current IPA prɨvʲitanʲe has a single nʲ. The be column's own love=каханне=kaxanʲːe shows ⟨нн⟩→[nʲː] (soft long n). Belarusian has phonemic length here. Fix adds the length mark (nʲː), matching the love/be convention codepoint-for-codepoint.

### hello — `mez` 【確実】
- **Applied:** `[posoh, posoh]`
- Confirmed. Surface Posoh begins with U+0050 capital P; IPA is already lowercase posoh. Every other mez surface citation form is lowercase (anēm, mīcew, oskēsek, wīkewam, …); only hello and thanks were capitalized. Lowercase the surface to posoh to match the column's citation-form convention.

### hello — `zap` 【確実】
- **Applied:** `[padixhe, padiʃe]`
- Same verified ⟨xh⟩=/ʃ/ rule. Current cell ['padixhe','padiʒe'] has the voiced reversal. Fix IPA ʒ→ʃ: padiʃe. This completes a single systematic ⟨xh⟩→ʒ inversion shared by the three zap cells father/love/hello; all confirmed against the Wikipedia consonant table.

### house — `hmn` 【確実】
- **Applied:** `[tsev, tɕɛ˨˦]`
- Same -v error: stray breathy ʱ on a modal mid-rising syllable. Consistent with miv/dev/txiv. Remove ʱ.

### house — `fon` 【確実】
- **Applied:** `[xwé, xʷé]`
- Verified against all 20 fon cells: every cell whose surface carries a tone diacritic preserves it in the IPA — eye nukún→nukṹ (acute kept), one ɖokpó→ɖokpó (acute), thanks àwǎnú→àwǎnú (grave+caron+acute). The tildes in dog/moon/hello are nasalization, not tone. house xwé→xʷe is the ONLY cell where a surface acute (high tone) is silently dropped in the IPA. Restoring xʷé makes it consistent with the column's own convention. Genuine error.

### house — `hni` 【確実】
- **Applied:** `[nyul, ɲu˥˥]`
- Current 'ɲul' keeps literal /l/. ⟨ny⟩=ɲ correct; final ⟨l⟩=˥˥ tone per dataset convention (tiul→tiu˥˥, lol→lo˥˥). Fix correct.

### house — `wbp` 【確実】
- **Applied:** `[ngurra, ŋura]`
- Confirmed, same defect as drink. ⟨rr⟩ in ngurra is the alveolar trill /r/, not retroflex /ɻ/. Current ŋuɻa conflates ⟨rr⟩ with single ⟨r⟩. Corrected to ŋura (trill /r/). Surface unchanged.

### house — `xct` 【確実】
- **Applied:** `[ཁྱིམ, tɕʰim]`
- Same confirmed aspiration defect as xct dog. ཁྱིམ (khyim) opens with aspirated ཁ → Lhasa [tɕʰím]. Current xct cell is ['ཁྱིམ','tɕim'], missing aspiration, while the column marks aspiration for all other aspirated radicals. Should be tɕʰim. (xct_litpr uses a different lexeme ཁང་པ→kʰaŋpa here, but it too aspirates its ཁ, supporting the general rule.)

### love — `xto` 【確実】
- **Applied:** `[𑀢𑀼𑀁𑀓𑁆, tuŋk]`
- Confirmed the current IPA contains U+1E45 ṅ (Latin n-with-dot-above), a romanization/transliteration letter, not an IPA symbol. Tocharian A tuṅk has /ŋ/ before k. The sibling Tocharian B (txb) column correctly uses IPA ŋ (cat kweŋ, sun kauŋ). Pure IPA-contamination fix; surface Brahmi unchanged. tuŋk.

### love — `dur` 【確実】
- **Applied:** `[kūngí, ku˧ŋɡi˥]`
- Surface 'kūngí' (macron=mid then acute=high) but IPA 'kuŋɡi' drops both tones. mid+high → ku˧ŋɡi˥. Segments (ku, ŋɡ for ng, i) correct. Part of systematic dur tone-loss. Apply.

### love — `dak` 【確実】
- **Applied:** `[thečhíȟida, tʰetʃʰíχida]`
- Current cell uses velar /x/ for ⟨ȟ⟩. Standard Lakota/Dakota orthography: caron ⟨ȟ⟩ = voiceless uvular fricative /χ/ (confirmed externally), distinct from plain ⟨h⟩=/h/ (cf. dak moon 'haŋyétuwí'→'haŋjétuwí' keeps plain h). Fix to /χ/ is correct.

### love — `zap` 【確実】
- **Applied:** `[ranaxhii, ɾanaʃiː]`
- Same verified Isthmus Zapotec rule: intervocalic ⟨xh⟩ = /ʃ/, not /ʒ/. Current cell ['ranaxhii','ɾanaʒiː'] uses the voiced value reserved for single ⟨x⟩. Fix IPA ʒ→ʃ: ɾanaʃiː. Surface unchanged.

### moon — `akk` 【確実】
- **Applied:** `[𒌗, warχu]`
- Current akk is ['𒌗','warḫu']. IPA uses ⟨ḫ⟩ = Latin h-with-breve (U+1E2B), a transliteration grapheme, violating the no-Latin-letter-in-IPA convention (#19/#65/#190). The group transcribes this fricative as χ (U+03C7) everywhere: direct cognate gez ወርኅ=warχ, uga moon jaːriχ, he χatul/jaˈʁeaχ. warḫu→warχu. Surface unchanged.

### moon — `ami` 【確実】
- **Applied:** `[folad, folað]`
- Amis ⟨d⟩ = /ɮ/~[ð] (lateral/median fricative) in standard/Central Amis, not the plosive [d] (plosive realization is Northern-only and not used elsewhere in this column). Final position may devoice toward [ɬ] but is not [d]. Current 'folad' ends in plain [d]; correct to [ð]: folað.

### moon — `dnj` 【確実】
- **Applied:** `[siŋ, siŋ]`
- Confirmed corruption: surface 'siŋŋŋ' (tripled ŋ) and IPA 'siŋːː' (doubled length mark) are both invalid. The same root is correct in dnj's own fire cell ['siŋ','siŋ']. Restore siŋ/siŋ. Apply.

### moon — `hni` 【確実】
- **Applied:** `[hhal, xa˥˥]`
- Current 'xal' has correct onset ⟨hh⟩=x but keeps literal /l/. Final ⟨l⟩=˥˥ tone per convention (lol→lo˥˥). Fix correct.

### moon — `itz` 【確実】
- **Applied:** `[uj, uh]`
- Current 'uχ' uses /χ/. Same ⟨j⟩=/h/ issue; sibling yua moon 'uj'→'uh' is identical, and itz one/water confirm ⟨j⟩=/h/. Yucatecan has no /χ/. Fix correct.

### moon — `ng` 【確実】
- **Applied:** `[omwedhi, omweði]`
- Confirmed cur=["omwedhi","omweðiɲ"]. Surface ends in vowel ⟨i⟩ with no ⟨ny⟩/⟨n⟩; the trailing palatal nasal [ɲ] corresponds to nothing in the surface. Ndonga ⟨dh⟩=[ð] already correct. Removing the spurious ɲ gives omweði.

### mother — `hni` 【確実】
- **Applied:** `[amal, ama˥˥]`
- Current 'amal' keeps literal /l/. Disyllabic a.ma + final ⟨l⟩=˥˥ tone; parallel to father 'adal'→'ada˥˥'. Fix correct.

### one — `de_at` 【確実】
- **Applied:** `[oans, ɑːns]`
- Confirmed surface↔IPA mismatch. IPA 'ɑːns' is the Bavarian-Austrian dialect monophthong (oans/ans); surface 'eins' is Standard-German orthography that reads [aɪns], not [ɑːns]. The de_at column is dialect-coloured throughout (hello=Servus, father=fɑːtɐ, hand=hɑnt, cat=kɑtsə) and the sibling bar column keeps one=[oans, oɐns] aligned. Applying the reviewer's recommended option: restore surface to the dialect form 'oans' to match the [ɑːns] IPA, yielding a coherent dialectal cell.

### one — `brh` 【確実】
- **Applied:** `[اسٹ, asiʈ]`
- Current brh is ['اسٹ','asit']. Surface ends in ٹ (U+0679, RETROFLEX teh, distinct from plain ت U+062A); Brahui has a Dravidian retroflex series, so the final stop is [ʈ], not plain [t] — the retroflexion fix is a genuine surface↔IPA correction. HOWEVER the reviewer's proposed əsɪʈ introduces ə and ɪ which appear NOWHERE in the brh column (brh uses plain a in kann/kaha/kaʃi/pantal/hatʰ and plain i in pisi/dil/kut͡ʃik). Applying the verified retroflex fix while preserving brh's own a/i vowel convention gives asiʈ (the reviewer's own bracketed alternative). Surface unchanged.

### one — `ami` 【確実】
- **Applied:** `[cecay, tsetsaj]`
- Two real errors. (1) ⟨c⟩=/ts/, not /tʃ/ (both c's here are before e and a, plain [ts]). (2) Final ⟨ay⟩ is the glide [aj], not a vowel sequence [ai]; the canonical citation form is [tsᵊtsaj]~[tsetsaj]. Current [tʃetʃai] is wrong on both counts. Fix tsetsaj.

### sun — `ami` 【確実】
- **Applied:** `[cidal, tsiðal]`
- ⟨c⟩ before /i/ is [ts]~[tɕ], never postalveolar [tʃ]; and ⟨d⟩ in standard/Central Amis = /ɮ/~[ð] (Wikipedia: [ð] in Fengbin, [ɮ̪] in Kangko; the plosive [d̪] is only Northern Amis, a feature the rest of this column does not adopt). Current [tʃidal] is wrong on both c and d. Reviewer's [tsiðal] (or [tɕiðal]) corrects both and uses the column's base affricate value [ts]. Apply tsiðal.

### sun — `azo` 【確実】
- **Applied:** `[ŋni, ŋnʲi˧˧]`
- Current surface 'ŋᴊni' confirmed to contain stray U+1D0A (ᴊ, SMALL CAPITAL J) — non-orthographic contamination. All other azo surfaces are plain Latin romanizations (vi, kʰɯ, ɣɯ, amo, ȵi); palatalization is already carried by ʲ in the IPA. Plain 'ŋni' is correct; IPA unchanged. Apply.

### sun — `hni` 【確実】
- **Applied:** `[mol, mo˥˥]`
- Current 'mol' keeps literal /l/. Final ⟨l⟩=˥˥ tone per convention (lol→lo˥˥, tiul→tiu˥˥). Fix correct.

### sun — `nij` 【確実】
- **Applied:** `[matanandau, matanandau]`
- Confirmed cur=["matanandau","matananˈdau"]. The IPA is the only nij cell carrying a primary-stress mark; no other entry marks stress (bahalap, danum, ləŋən, etc.) and the surface has none. The stray ˈ is contamination; remove it to give matanandau.

### sun — `wls` 【確実】
- **Applied:** `[laʻā, laˈʔaː]`
- Confirmed stress error. Wallisian/East Uvean stress falls on the penultimate MORA; long vowels are bimoraic, so a word-final long vowel takes the stress. laʻā = /la.ʔaː/ → laˈʔaː. The data's own cells follow this exactly: the structurally identical mother faʻē /fa.ʔeː/ → faˈʔeː, plus mālō→maːˈloː and māhina→maːˈhina. The current ˈlaʔaː wrongly stresses the short first syllable, contradicting the cell's own faʻē twin.

### thanks — `ami` 【確実】
- **Applied:** `[aray, araj]`
- Same ⟨ay⟩=glide [aj] rule as hand/one. Current [arai] renders it as a vowel; correct to [araj].

### thanks — `hni` 【確実】
- **Applied:** `[gaq sai, ɡa˧˩ sai]`
- Current 'ɡaq sai' leaves ⟨q⟩ literal and untoned. Hani final ⟨q⟩=low-falling ˧˩ tone marker (open-syllable language; confirmed externally). Dataset's own love.js renders the SAME morpheme 'gaq'→'ɡa˧˩' (also fire 'miq'→'mi˧˩', tree 'siq'→'si˧˩'). 'sai' stays as mid-tone open syllable. Fix correct.

### thanks — `kbd` 【確実】
- **Applied:** `[фӏыщӏэ, fʼəʃʼa]`
- Current 'fʼɪʃʼa' transcribes ⟨ы⟩ as /ɪ/. Kabardian ⟨ы⟩=/ə/ (3-vowel system; confirmed externally). Kbd's own good 'фӏы'→'fʼə' (same фӏ+ы) and one 'зы'→'zə', plus cat/eat/father/etc., all render ⟨ы⟩=ə. Final ⟨э⟩=a consistent with dataset. Fix correct.

### tree — `phn` 【確実】
- **Applied:** `[𐤏𐤑, ʕesˤ]`
- Current phn is ['𐤏𐤑','ʕeʦʕ']. Surface = ʿayin+ṣade (2 letters, verified U+1090F U+10911). The IPA has (1) a spurious trailing ʕ with no corresponding letter — cf. phn eye 𐤏𐤍=ʕajin and he cognate עץ=et͡s, neither has a final pharyngeal; (2) plain affricate ʦ for the emphatic ṣade, whereas the group uses sˤ (akk isˤu, gez ʕasˤ, gez sun sˤaħaj). ʕeʦʕ→ʕesˤ. Surface unchanged.

### tree — `uga` 【確実】
- **Applied:** `[𐎓𐎕, ʕasˤu]`
- Current uga is ['𐎓𐎕','ʕaʦʕu']. Same defect as phn: surface = ʿayin+ṣade (2 letters, U+10393 U+10395), but IPA has a stray trailing ʕ before the case vowel and a plain ʦ for emphatic ṣade. uga's own good cell 𐎉𐎁=tˤaːbu uses the ˤ emphatic superscript, and cognates akk isˤu / gez ʕasˤ use sˤ. ʕaʦʕu→ʕasˤu (case vowel u retained). Surface unchanged.

### tree — `hy` 【確実】
- **Applied:** `[ծառ, tsɑɾ]`
- Current hy is ['ծառ','tsaɾ']. Modern East Armenian plain ⟨ա⟩ is transcribed ɑ throughout hy (cat kɑˈtu, eye ɑtʃkʰ, fire kɾɑk, good lɑv, hello bɑˈɾev, sun ɑˈɾev, thanks ʃnoɾhɑkɑluˈtʰjun); the only bare-a tokens are father hajɾ / mother majɾ, where ⟨ա⟩ sits inside the ⟨այ⟩=/aj/ diphthong (different environment). ծ-ա-ռ is plain ⟨ա⟩, so a→ɑ; the tap ɾ is correctly retained (cf. hand ձեռք→dzeɾkʰ). Sibling hy_grab=tsɑr confirms ɑ. Surface unchanged.

### water — `sjo` 【確実】
- **Applied:** `[ᠮᡠᡴᡝ, mukə]`
- Current sjo is ['ᠮᡠᡴᡝ','muku']. Surface is byte-identical to mnc water (U+182E U+1860 U+1874 U+185D), ending in ᡝ (U+185D = 'e'/ə). sjo's OWN cat cell ᡴᡝᠰᡳᡴᡝ=kəsikə renders this same graph ᡝ as ə in both positions, yet water reads the final ᡝ as u — a transliteration error contradicting sjo's own convention and the mnc sibling (mukə). muku→mukə. Surface unchanged.

### water — `pll` 【確実】
- **Applied:** `[ʔoːm, ʔoːm]`
- Confirmed cur=["oːm","ʔoːm"]. The Palaung column writes the glottal stop in BOTH members of every other glottal-initial pair: drink [ʔoːk,ʔoːk], good [ʔɔm,ʔɔm], love [ʔiŋ,ʔiŋ], father [paʔ,paʔ]. Here only the IPA carries the initial ʔ while the surface omits it, so the surface is the typo. Restore ʔ to the surface giving ʔoːm/ʔoːm.

### water — `pqm` 【確実】
- **Applied:** `[samaqan, samakʷan]`
- Confirmed cur=["samaqan","samaːkan"]. Maliseet-Passamaquoddy ⟨q⟩=[kʷ] (verified; intervocalic voiced variant [ɡʷ]). The column already transcribes /kʷ/ as kʷ: fire skwut→skʷut. Current renders ⟨q⟩ as plain [k] and inserts a length mark [maː] not licensed by the surface (no doubled vowel). Fix to samakʷan (q→kʷ, drop spurious ː).

### water — `tue` 【確実】
- **Applied:** `[oko, oko]`
- Real surface/IPA mismatch confirmed in data: cell is ['oko','okó'] — IPA carries a high tone the surface lacks. The tue column omits tone in IPA everywhere (diayi→diaji, sika→sika, kapea→kapea, tree yukɨgɨ→jukɨɡɨ); the ONLY tone-marked cell, mother pakó→pakó, has surface AND IPA agreeing. So 'okó' is doubly inconsistent (with its own bare surface and with the column's no-IPA-tone convention). Aligning IPA to the authoritative orthographic surface gives oko/oko.

---

## B. Applied — owner-confirmed (蓋然/要検討, by policy)

### ② IPA consistency (45)

### tree — `ii` 【蓋然】
- **Applied:** `[ꌩꁧ, sɿ˧˧bo˧˧]`
- The first syllable is the dental-apical (syllabic-fricative) vowel after /s/, written ɹ̩ here but ɿ in the column's own one (tsʰɿ˨˩) and water (ʑɿ˧˧) — identical dental-apical context. Harmonizing to ɿ removes an intra-column inconsistency; ɹ̩ would imply a retroflex/approximant value that the dental onset does not license. Tone ˧˧ unchanged.

### hello — `czh` 【蓋然】
- **Applied:** `[你好, n̩˦˦hau˦˦]`
- 你 is a syllabic nasal bearing its own tone (˦˦), but the current IPA writes a bare n, which cannot carry a tone. The sibling gan writes it correctly as n̩˨˩. Adding the syllabicity ring is required; tone and 好 unchanged.

### moon — `hak_cn` 【蓋然】
- **Applied:** `[月光, ŋiet˧koŋ˥]`
- 月 is 疑母·月韵·入声; the Meixian/Moiyen reflex is -et/-iet (Pha̍k-fa-sṳ ngiet), as in both siblings hak_hl ŋiet˥˥ and hak_tw ŋiet˥. Dialectological sourcing confirms Meixian reads 月 as nget/ngiet, not -iat. The current -iat is the outlier against the siblings and the rhyme class. Onset ŋ, tone ˧, and 光 koŋ˥ unchanged. (蓋然: -iat appears in some popular romanization listings, but -iet is the standard Meixian/sibling form, so the correction is sound.)

### cat — `id` 【蓋然】
- **Applied:** `[kucing, kutʃiŋ]`
- Confirmed defect. ⟨c⟩=tɕ (alveolo-palatal) is paired with ⟨j⟩=dʒ (postalveolar, anjing→andʒiŋ) — different places for a phonologically matched affricate pair. Standard reference (Soderberg & Olson 2008: t͡ʃ/d͡ʒ) and sibling columns (ban tʃitʃiŋ, min kutʃiaŋ, mad kɔtʃɛŋ) use postalveolar tʃ. Fix harmonizes ⟨c⟩ to tʃ, matching the column's own ⟨j⟩ place and the dataset's tʃ-using siblings.

### love — `id` 【蓋然】
- **Applied:** `[cinta, tʃinta]`
- Same confirmed place-mismatch as id cat: ⟨c⟩=tɕ vs ⟨j⟩=dʒ. Fix cinta→tʃinta aligns ⟨c⟩ to the postalveolar place used by ⟨j⟩ and by sibling columns (ban/min/mad) and the standard reference.

### cat — `ms` 【蓋然】
- **Applied:** `[kucing, kutʃiŋ]`
- Confirmed. Malay ⟨c⟩/⟨j⟩ are a matched pair; column splits them tɕ vs dʒ (anjing→andʒiŋ). Standard Malay/Indonesian and siblings (ban/min/mad) use postalveolar tʃ/dʒ. Fix aligns ⟨c⟩ to tʃ.

### love — `ms` 【蓋然】
- **Applied:** `[cinta, tʃinta]`
- Same place-mismatch as ms cat. Fix cinta→tʃinta matches the postalveolar pair of siblings and the column's own ⟨j⟩.

### cat — `jv` 【蓋然】
- **Applied:** `[kucing, kutʃiŋ]`
- Confirmed. Javanese ⟨c⟩=tɕ while ⟨j⟩=dʒ (siji→sidʒi) — unmotivated place split. Sibling Indonesic columns (ban/min/mad) use tʃ/dʒ. Fix aligns ⟨c⟩ to tʃ.

### water — `su` 【蓋然】
- **Applied:** `[cai, tʃai]`
- Confirmed. su cai→tɕai while ⟨j⟩=dʒ; the Old Sundanese ancestor for the SAME word is osu cai→tʃai (postalveolar) — direct ancestor mismatch. Sibling Indonesic columns use tʃ. Fix cai→tʃai.

### eat — `dsb` 【蓋然】
- **Applied:** `[jěsć, jɛɕt͡ɕ]`
- Confirmed internal inconsistency. Current jɛst͡ɕ leaves ⟨s⟩ before ⟨ć⟩[t͡ɕ] unassimilated. dsb's own love=lubosć=ˈlubɔɕt͡ɕ shows the same sć cluster assimilated to ɕt͡ɕ, and Polish eat=jeść=jɛɕt͡ɕ agrees. Fix s→ɕ (regressive place assimilation) matches the dsb love cell and Polish sibling. (Note: hsb love keeps st͡ɕ, but the relevant in-column model here is dsb's own love cell.)

### tree — `pi` 【蓋然】
- **Applied:** `[रुक्ख, rukːʰa]`
- Current pi tree is ['रुक्ख','rukkʰa'] using doubled kk. pi marks gemination with ː in eye (tɕakːʰu) and hand (hatːʰa); the direct cognate pi_edu rukkha = rukːʰa. (Caveat: pi fire aɡɡi still uses doubled gg, so the ː convention isn't universal in pi — but 2 of 3 geminates plus the exact pi_edu cognate support normalization.) Surface unchanged; rukːʰa correctly transcribes रुक्ख and matches pi's majority + sibling.

### love — `hr` 【蓋然】
- **Applied:** `[ljubav, ˈʎuːbaʋ]`
- Current hr is ['ljubav','ˈʎuːbaf']. Standard Croatian has no word-final obstruent devoicing and hr shows no other devoiced finals; final f is an error (it belongs to a devoicing language, cf. bg любов ljubɔf). Siblings: sr ˈʎubaʋ, bs ˈʎubav keep voiced final. v→ʋ matches hr's own labiodental-approximant convention in all 3 other v-cells (ʋatra, ʋoda, xʋaːla) and sr ˈʎubaʋ. Length uː retained (hr marks length, ljȗbav long accent).

### tree — `hr` 【蓋然】
- **Applied:** `[drvo, ˈdr̩ʋo]`
- Current hr is ['drvo','ˈdr̩vo']. hr uses ʋ in all 3 other v-cells (ʋatra, ʋoda, xʋaːla); drvo is the only plain-v outlier. Sibling sr = ˈdr̩ʋo. v→ʋ brings hr into line with its own majority and the Serbian cognate. Surface unchanged.

### love — `ks` 【蓋然】
- **Applied:** `[محبت, muhabːət]`
- Current ks is ['محبت','muhabːətʰ']. Surface محبت ends in plain ت (U+062A) with no aspiration grapheme; ks marks aspiration with ھ (U+06BE), e.g. hand اَتھ=atʰ. The final tʰ is unsupported by spelling. Urdu sibling محبت=mʊhəbːət has no final aspiration. tʰ→t. Surface unchanged.

### hello — `az` 【蓋然】
- **Applied:** `[salam, sɑlɑm]`
- Current az is ['salam','sɑlɑːm']. Azerbaijani has no phonemic vowel length; surface 'salam' is two plain ⟨a⟩. The az column marks no vowel length anywhere (tæʃecːyɾ's cː is consonant gemination, not vowel length). The ɑː in the 2nd syllable is the lone inconsistency. sɑlɑːm→sɑlɑm. Surface unchanged.

### sun — `ve` 【蓋然】
- **Applied:** `[ḓuvha, ɖuvʱa]`
- Current ve is ['ḓuvha','ɖuʋa']. The orthographic digraph ⟨vh⟩ is rendered three ways in ve: good ʋʱ, thanks vʱ, and here ʋ (plain approximant, breathiness dropped) — a real one-digraph-three-renderings inconsistency. Venda ⟨vh⟩ is the (breathy) voiced labiodental FRICATIVE (Poulos 1990); ve has no plain-⟨v⟩ cell to compete. Normalizing to vʱ (matching the unchanged thanks cell livʱuwa) gives ɖuvʱa. Surface unchanged.

### good — `ve` 【要検討】
- **Applied:** `[zwavhuḓi, zwavʱuɖi]`
- Current ve is ['zwavhuḓi','zwaʋʱuɖi']. Part of the same ⟨vh⟩ inconsistency: this cell uses approximant base ʋʱ whereas ⟨vh⟩ is the voiced labiodental fricative (thanks cell livʱuwa uses vʱ). ʋ is the value for plain ⟨v⟩, not ⟨vh⟩. ʋʱ→vʱ so all three ⟨vh⟩ cells (good, sun, thanks) share one rendering. Surface unchanged. (Reviewer 要検討; defect real, target matches thanks.)

### dog — `ve` 【要検討】
- **Applied:** `[mmbwa, mːbwa]`
- Current ve is ['mmbwa','mbːwa']. Surface 'mmbwa' has a doubled ⟨m⟩, but the IPA lengthens the PLOSIVE (mbːwa) — the orthography doubles the nasal, not the stop, so this is a real error. ve's OWN mother cell mme→mːe establishes that doubled ⟨m⟩ = long nasal mː. Applying that exact precedent gives mːbwa (rather than the reviewer's primary m̩bwa, which has no syllabic-nasal precedent in this column). Surface unchanged. (Reviewer 要検討; defect real.)

### thanks — `zu` 【蓋然】
- **Applied:** `[ngiyabonga, ŋɡijaɓoŋɡa]`
- Current IPA ŋijaɓoŋɡa renders the two identical ⟨ng⟩ digraphs differently: initial ngi-→bare ŋ, medial -bonga→ŋɡ. Zulu ⟨ng⟩ (no apostrophe) is the prenasalized voiced velar /ŋɡ/ (plain /ŋ/ is spelled ⟨ng'⟩); the 1sg concord ngi- is [ᵑɡi]. Sibling cells in the column confirm medial ng=ŋɡ (moon iɲaŋɡa, sun ilaŋɡa). The initial should match: ŋɡijaɓoŋɡa. Internal inconsistency, real error.

### drink — `myv` 【蓋然】
- **Applied:** `[симемс, sʲimems]`
- Erzya /s/–/sʲ/ is a phonemic contrast and the spelling encodes it: the vowel и follows palatalized alveolars (Wikipedia: я,е,и,ё,ю follow palatalized; non-palatalized alveolars before front vowels are limited to recent Russian loans). симемс is a native word, so initial с before и = /sʲ/. This matches the column's convention: eye сельме→sʲelʲmʲe, thanks сюкпря→sʲukprʲa. Current 'simems' is under-marked. Final -мс stays plain (word-final, not before a front vowel). Note heart седей→sedej is a parallel under-marked case left as-is, hence the reviewer's low confidence, but the fix is phonologically correct and matches the dominant pattern.

### drink — `xmf` 【蓋然】
- **Applied:** `[წუმა, tsʼuma]`
- Scanned the whole xmf column: affricates are written WITHOUT tie bars everywhere — water წყარი→tsʼqʼari (same წ /tsʼ/, tieless), eat tʃʼkʼomua, dog dʒoʁori, fire datʃxiri, good dʒɡiri, hello ɡeɡadʒanas, tree dʒa. Only drink carries t͡sʼuma with a tie bar — a lone outlier on the exact phoneme water writes tieless. Minimal internally-consistent fix is to detie: tsʼuma. (Georgian ka uses tie bars throughout, but xmf is its own column with a clear tieless majority.)

### hello — `ami` 【蓋然】
- **Applied:** `[nga'ay ho, ŋaʔaj ho]`
- Final ⟨ay⟩ glide [aj], same pattern as hand/thanks/one. Current [ŋaʔai ho] → [ŋaʔaj ho]. The rest of the transcription (ŋ for ng, ʔ for the apostrophe) is already correct.

### drink — `blt` 【蓋然】
- **Applied:** `[ꪀꪲꪙ ꪙꪾꫂ, kin˨˦ nam˦]`
- blt is tonal with Chao letters on nearly every cell, but 'kin nam' is toneless. Both morphemes are toned elsewhere in the same column: eat ꪀꪲꪙ=kin˨˦ and water ꪙꪾꫂ=nam˦ (identical surface morpheme). Restoring kin˨˦ nam˦ matches the language's own forms exactly. Apply.

### sun — `cak` 【蓋然】
- **Applied:** `[qʼij, qʼix]`
- Internal-consistency defect confirmed: cak transcribes ⟨j⟩ as [x] in every other cell (jay→xaj, jun→xun, ajowabʼäl→axowaɓəl). Sun qʼij→qʼih is the lone [h] outlier. Although Kaqchikel ⟨j⟩ phonetically is /x~χ~h/ (so [h] is not absolutely wrong), the dataset's settled representation for cak ⟨j⟩ is [x]; consistency demands qʼix. Apply.

### water — `chk` 【蓋然】
- **Applied:** `[kkonik, kːonik]`
- Current 'kːoɲik' palatalizes /n/→[ɲ] before /i/ with no such rule in Chuukese; the chk column keeps plain [n] everywhere (nimʷomʷ, kinisou, in, múrinnó→muːɾinːo). ɲ unmotivated. Plain alveolar [n] → kːonik (initial geminate retained). Apply.

### love — `din` 【蓋然】
- **Applied:** `[nhiär, n̪iar]`
- Core defect confirmed and verified: Dinka ⟨nh⟩=dental /n̪/, ⟨ny⟩=palatal /ɲ/ (Wikipedia Dinka phonology); the din column already maps ⟨ny⟩→ɲ (nyin→ɲin, alanyiek→alaɲiek). Current 'ɲiar' wrongly treats ⟨nh⟩ as palatal; should be dental n̪. MODIFIED the reviewer's proposal: used n̪iar (plain a), NOT n̪iär, because din's own convention strips the diaeresis vowels in IPA (jɔ̈ŋ→dʒɔŋ, piöu→piɔu, akɔ̈l→akɔl, ɣöt→ɣɔt, yïn→jin). Retaining ä would contradict the column's own treatment. Apply with n̪iar.

### dog — `hni` 【蓋然】
- **Applied:** `[kheel, kʰe˥˥]`
- Current 'kʰeːl' both keeps spurious coda /l/ and reads ⟨ee⟩ as length /eː/. ⟨kh⟩=kʰ correct; final ⟨l⟩=˥˥ tone per convention. Hani has a tense/lax (not phonemic length) vowel system, so dropping ː is defensible and the doubled vowel here marks quality. Fix correct (vowel-length call keeps this 蓋然).

### mother — `inh` 【蓋然】
- **Applied:** `[наьна, næna]`
- Confirmed defect. Surface наьна = н-аь-н-а has a SINGLE intervocalic н, but current IPA nænːa marks a geminate /nː/. The inh column marks geminates only when the letter is doubled in surface (бутт→butː), and single letters stay single (моаршал→moaɾʃal, мала→mala). No doubled нн here, so /nː/ is unjustified. Degemination to næna is correct.

### heart — `huz` 【蓋然】
- **Applied:** `[ракIу, rakʼu]`
- Confirmed isolated inconsistency. Current rɑkʼu uses back /ɑ/ for ⟨а⟩, but every other huz ⟨а⟩ is /a/: гьаре→hare, абу→abu, хулIа→χuɬa, мухъа→muq͡χa. This is the only /ɑ/ in the column. The en-ref hɑːt may have seeded the artifact. Corrected to rakʼu; ejective кI→kʼ unchanged. (Surface keeps the column's palochka-substitute capital I as in other huz/kry ejective cells.)

### hello — `jmc` 【蓋然】
- **Applied:** `[máshàlòmà, maʃaloma]`
- Confirmed. Surface máshàlòmà = ma-sha-lo-ma (4 syllables, final -mà), but current IPA maʃalom drops the final /a/. The jmc IPA omits tone column-wide (a real convention: kùoòko→kuoːko, mòyò→mojo) but transcribes every vowel. Final /a/ restored to maʃaloma to match the surface.

### cat — `kjp` 【蓋然】
- **Applied:** `[ဖၣ်, pə˧]`
- Confirmed place defect: surface onset is ⟨ဖ⟩ (U+1016, labial), but current IPA tʰə˧ is coronal — impossible. The only other ⟨ဖ⟩ cell, father ဖါ→pa˧, transcribes it as plain /p/. I adjusted the reviewer's pʰə˧ to pə˧: the kjp column never marks /pʰ/ anywhere, and its sole ⟨ဖ⟩ datapoint (father) is plain /p/, so column-internal consistency gives /p/, not aspirated /pʰ/. Tone ˧ unchanged.

### thanks — `lmn` 【蓋然】
- **Applied:** `[धन्यवाद, dʱənjəʋaːd]`
- Confirmed two points. (1) The lmn column transcribes the inherent schwa as /ə/ throughout (ɡʱəɾ, mən, suɾədʒ), so the न्य-inherent vowel should be ə not a: dʱənjə-. (2) ⟨व⟩ as labiodental approximant /ʋ/ is the standard Indo-Aryan realization and matches the column's plain-IPA style (β appears nowhere else in the column). Standard Lambadi/Hindi form is dʱənjəʋaːd. Surface unchanged.

### eat — `kwk` 【蓋然】
- **Applied:** `[ha̱'ma̱p, həʔməp]`
- Confirmed internal inconsistency. Surface codepoints show BOTH vowels carry U+0331 (underline = U'mista schwa /ə/): h-a̱-'-m-a̱-p. The column marks ⟨a̱⟩=/ə/ everywhere (wa̱ts'i→ʔwətsʼi, na̱m→ʔnəm, ya̱x̱is→ʔjəxis, sa̱la→səla), and the second a̱ in this very word is already /ə/ (məp). The first ha̱ is wrongly /a/. The ' (U+0027)=/ʔ/. Correct to həʔməp.

### eat — `mxc` 【蓋然】
- **Applied:** `[kudya, kudʒa]`
- Confirmed cur mxc=["kudya","kudja"]; sibling ndc=["kudya","kudʒa"]. Shona ⟨dy⟩ is a single palatal/affricate segment [dʒ~ɟ], not a d+glide sequence. mxc's [dja] (d + Latin/glide j) is the outlier vs the sibling Shona variety ndc which has [dʒa]. Aligning to the single-segment value kudʒa.

### dog — `mwr` 【蓋然】
- **Applied:** `[कुत्तो, kutːo]`
- Confirmed cur=["कुत्तो","kutːoʔ"]. Devanagari कुत्तो ends in vowel ⟨ो⟩(o) with no avagraha/glottal letter. Other vowel-final mwr words lack a final glottal (बढ़िया→bəɽʱijaː, मीनी→miːniː, पाणी→paːɳiː); only the two -o nouns (also heart) carry the stray [ʔ], so it is not a systematic checked-tone convention. Remove to give kutːo.

### heart — `mwr` 【蓋然】
- **Applied:** `[हियो, hijo]`
- Confirmed cur=["हियो","hijoʔ"]. Parallel to dog: हियो ends in vowel ⟨ो⟩ with no glottal letter; the final [ʔ] is unlicensed and matches the same stray-glottal pattern restricted to the two -o nouns. Remove to give hijo.

### sun — `nzm` 【蓋然】
- **Applied:** `[sʰeu, sʰeu]`
- Confirmed cur=["sʰeu","ʃeu"]. The nzm column's invariant is that the phonetically-notated surface is echoed exactly in IPA (kʰemi→kʰemi, hʷu→hʷu, kʰu→kʰu); sun is the only cell where surface [sʰ] and IPA [ʃ] are different consonants. Per the column's own echo convention the IPA must mirror the surface, giving sʰeu. (Defect is the isolated sʰ≠ʃ mismatch; fix follows the column's documented invariant.)

### mother — `osc` 【蓋然】
- **Applied:** `[maatúf, maːtof]`
- Confirmed cur=["maatúf","maːtuːf"]. Oscan ⟨ú⟩ is the dedicated grapheme for mid back /o/ and the acute does NOT mark length (verified). The column applies this correctly elsewhere: house trííbúm→triːbom renders ⟨ú⟩ as [o] with length only from doubled ⟨íí⟩. mother ⟨maatúf⟩ has ⟨aa⟩=[aː] and single ⟨ú⟩ (no doubling), so the consistent value is maːtof; current maːtuːf has both wrong vowel quality and unjustified length.

### cat — `obr` 【蓋然】
- **Applied:** `[ကြောင်, klaŋ]`
- Confirmed cur=["ကြောင်","klyaŋ"]. The IPA contains a Latin letter 'y' which is invalid IPA in a consonant cluster (IPA y = close front rounded vowel). The obr column reconstructs the medial as [l] without any Latin y: eye မ္ယက်→[mlak]. Old Burmese medials *-r-/-l-/-y- merged, so reconstructing ⟨kr⟩(ကြ) as [kl] is consistent with the column's [ml]. Dropping the stray non-IPA 'y' gives klaŋ. (love→klyit is the same defect but outside this finding.)

### sun — `rki` 【蓋然】
- **Applied:** `[နေ, nè]`
- Confirmed. Current ["နေ","neː"] substitutes length for tone. Surface နေ is the inherent low/level tone; my sibling = ["နေ","nè"]. The rki column uses the grave for low tone elsewhere (mìɴ, tìɴ, dɛ̀). nè restores the correct low tone consistent with the column's own practice and my.

### eat — `smj` 【蓋然】
- **Applied:** `[bårråt, porːot]`
- Confirmed quality defect. Lule Sámi ⟨å⟩ = back rounded /o/, verified by the column's own fire dålla→tolːa (post-geminate ⟨å⟩→short [o]). bårråt has ⟨å⟩ in both vowels, but the IPA renders the 2nd as [aː], a value ⟨å⟩ never takes (⟨á⟩ with acute = /aː/, e.g. máno→maːno; ⟨å⟩ ≠ /aː/). Corrected to porːot, matching the dålla→tolːa short-[o] pattern. (Reviewer offered o or oː; chose short o to mirror the column's own parallel cell.)

### eye — `sgw` 【蓋然】
- **Applied:** `[አይን, ajn]`
- Confirmed. Sebat Bet Gurage column drops the predictable word-initial Ethiopic glottal stop in every other አ/ኣ-initial cell — father አባ→aba, one አት→at, thanks ኣምስ…→amɨskɛnɛlɛnt. Only eye አይን carries /ʔ/ (ʔajn), the lone outlier. ajn restores internal consistency. Surface unchanged.

### dog — `sik` 【蓋然】
- **Applied:** `[ཁྱི, tɕʰi]`
- Confirmed. The onset ⟨ཁྱ⟩ (khy-) is the aspirated voiceless (high-register) palatal series; Drenjongke research confirms voiceless/aspirated onsets → high tone. The column marks the same aspiration for ⟨ཆ⟩ in water ཆུ→tɕʰu, and uses bare /tɕ/ for the unaspirated series (one གཅིག→tɕik). Current dog ཁྱི→tɕi drops the aspiration. tɕʰi matches the surface ⟨khy⟩ and the column's own ⟨ch⟩→tɕʰ. (蓋然: Drenjongke low-register devoicing could partially neutralise; parallel house ཁྱིམ→tɕim has the same onset and was not flagged, but that does not invalidate the dog correction.)

### dog — `skr` 【蓋然】
- **Applied:** `[کتا, kʊtːaː]`
- Confirmed notation inconsistency. The dataset writes geminates as Cː and skr itself uses the length mark for cat ٻلی→ɓɪlːiː, but dog/father/hello use doubled letters (kuttaː, əbbaː, əssəlaːm). Harmonising dog to Cː → kʊtːaː. Also /ʊ/ for short u matches Saraiki کُتّا and the column's own short-vowel convention (eye əkʰ, one hɪk = /ɪ/). Surface کتا unchanged.

### mother — `suk` 【蓋然】
- **Applied:** `[mayu, maju]`
- Confirmed. Sukuma final ⟨u⟩ is transcribed /u/ throughout (kalulu, kuhwa, kuʎa, butoɡwa). Only mother uses lax /ʊ/ (majʊ) with no orthographic basis. maju restores consistency. Surface unchanged.

### ① Surface-form change (9)

### eye — `brh` 【蓋然】
- **Applied:** `[کنّ, kanː]`
- Current brh is ['کن','kann']. (a) brh marks gemination with ː everywhere — kunːa (eat), pinːinɡ (drink), lumːaː (mother); kann's doubled ASCII nn is the outlier, so geminate /n/ = kanː. (b) brh's geminate surfaces all carry shadda (verified: کنّا/پنّنگ/لمّا all contain U+0651); the bare کن (U+06A9 U+0646) lacks it, so surface should be کنّ (adds U+0651). Both fixes match brh's own internal convention.

### cat — `kru` 【蓋然】
- **Applied:** `[बिल्ली, bilːiː]`
- Current kru is ['बिलि','bilːiː']. IPA has geminate lː but surface बिलि (U+92C U+93F U+932 U+93F) is a single ल with no conjunct/virama, transliterating to biliː — genuine surface↔IPA mismatch. kru's majority gemination convention uses a conjunct with virama (dog अल्ल, tree मन्न, hello खद्द, thanks धोन्न all use U+094D), so बिल्ली (ल्ल with virama) is the principled surface for bilːiː. te sibling pɪlːɪ confirms the geminate. IPA unchanged.

### thanks — `anp` 【蓋然】
- **Applied:** `[धन्यवाद, dʱənjəbaːd]`
- Current cell ['धइन्यवाद','dʱainjəbaːd'] confirmed: the इ insertion (dhain-) is non-standard. Standard Sanskrit-derived spelling is धन्यवाद (dhanyavād); sibling bgq carries धन्यवाद/dʱanjabaːd. Proposed IPA dʱənjəbaːd uses schwa for the inherent short ⟨a⟩, matching anp's own convention (house ɡʱər, hello prəɳaːm); व→b matches the bgq sibling. Well-formed, transcribes the corrected surface. Apply.

### water — `lif` 【蓋然】
- **Applied:** `[ᤇᤘᤠ, tʃʰwaː]`
- Confirmed corrupt cell. Current surface ᤁᤡᤱ = U+1901 KA + U+1921 vowel-I + U+1931 -ŋ = 'kiŋ' (not water), and current IPA tʃʰwaɾaŋ matches neither. Limbu 'water' is ᤇᤘᤠ = CHA(U+1907)+WA(U+1918)+AA(U+1920). I adjusted the reviewer's IPA tɕʰwa to tʃʰwaː for column consistency: the lif column uses postalveolar /tʃ/ not alveolo-palatal /tɕ/ (eat ᤆᤠ CA→tʃaː), and the AA sign is /aː/ long (father aːbaː, drink tʰuŋmaː). So ᤇᤘᤠ→tʃʰwaː.

### thanks — `mez` 【蓋然】
- **Applied:** `[wāēwāēnen, wɛːwɛːnen]`
- Confirmed cur=["Wāēwāēnen","wɛːwɛːnen"]. 18 of 20 mez surfaces are lowercase; only hello (Posoh) and thanks (Wāēwāēnen) carry a stray leading capital, and the IPA is already lowercase. Lowercasing the surface to wāēwāēnen restores the column's majority convention; IPA unchanged. Reviewer slightly overstates ('every other lowercase' — hello is also capital) but the fix is correct and harmless. Cosmetic, not phonetic.

### moon — `nag` 【蓋然】
- **Applied:** `[chand, tʃaːnd]`
- Confirmed cur=["saand","tʃaːnd"]. Nagamese 'moon' is চান্দ chand [tʃaːnd] (verified; Indo-Aryan source, cf. Hindi/Assamese chand). The IPA tʃaːnd is correct; the surface romanization 'saand' wrongly maps ⟨s⟩→[tʃ] while the same column treats ⟨s⟩=[s] (suruj→suɾudʒ, suku→suku). Aligning the surface to the correct IPA: chand→tʃaːnd.

### fire — `udi` 【蓋然】
- **Applied:** `[арух, arux]`
- Current cell ['ариш','ariʃ'] is wrong on two counts vs the attested Udi word arux (арух), confirmed in running text 'arux-ne' (fire comes out) — wrong vowel (и/i vs у/u) and wrong final consonant (ш/ʃ vs х/x). The udi column maps ⟨х⟩→x in 3 of 4 cases (dog ха→xa, water хе→xe, tree хунч→xunt͡ʃ; sun бех→beχ is the lone /χ/), so /x/ is the column-dominant value. Fix арух/arux is column-consistent.

### dog — `xkk` 【要検討】
- **Applied:** `[cɔ, tʃɔ]`
- Real surface/IPA mismatch verified: cell is ['cɔ̀','tʃɔ'] — the surface carries a combining grave that the IPA does not, and the entire xkk column (all 20 forms: caa, meeo, gee, kee, kruɛŋ, etc.) marks NO register/tone in either field. The lone grave on dog's surface is internally inconsistent. Removing the stray combining mark so the surface matches its own IPA (and the column convention) gives cɔ/tʃɔ. Low-risk consistency cleanup verifiable against the column; only the surface diacritic changes.

### one — `zza` 【蓋然】
- **Applied:** `[yew, jɛw]`
- Current cell ['jew','d͡ʒɛw'] is wrong on both sides. The attested Zazaki masculine numeral 'one' is yew (Omniglot: yew (m) / jû (f)), never the affricate /d͡ʒ/. Moreover the zza column's own ⟨j⟩ = /ʒ/ (sun tîj→tiːʒ), not /d͡ʒ/, so even reading the surface as ⟨jew⟩ would give /ʒɛw/, never /d͡ʒɛw/. The cleanest attested fix uses unambiguous ⟨y⟩=/j/ (confirmed: keye→kɛjɛ, maye→majɛ): surface yew, IPA jɛw.

### ③ IPA transcription choice (7)

### moon — `mh` 【蓋然】
- **Applied:** `[aḷḷōñ, alˠːəŋ]`
- Confirmed defect. Current final is 'nˤ' (pharyngealized alveolar nasal) — an anomaly: no other mh cell uses ˤ, and Marshallese has no such phoneme. Marshallese ⟨ñ⟩ is unambiguously the velar nasal /ŋ/ (heavy series; Bender). Fix [ŋ] correctly transcribes ⟨ñ⟩ and removes the outlier pharyngealization. Note: the eat cell ṃōñā=mˠəɲˠaː still renders ⟨ñ⟩ as ɲˠ, so a follow-up could reconcile, but this cell's fix is independently correct.

### cat — `su` 【蓋然】
- **Applied:** `[ucing, utʃiŋ]`
- Confirmed. su ⟨c⟩=tɕ vs ⟨j⟩=dʒ (anjing→andʒiŋ, hiji→hidʒi). The dataset's own Old Sundanese ancestor transcribes the identical word osu ucing→utʃiŋ (postalveolar) — a direct same-word ancestor mismatch. Fix ucing→utʃiŋ.

### hello — `ts` 【蓋然】
- **Applied:** `[avuxeni, avuʃeni]`
- Current ts is ['avuxeni','aβuʃeni']. ts has exactly two ⟨v⟩ cells: hand voko=voko (v) and hello=aβuʃeni (β) — same orthographic ⟨v⟩, two renderings. Standard Tsonga ⟨v⟩ is the labiodental fricative /v/ (Baumbach 1987), and the language's own voko uses v; the intervocalic β here is the unmotivated outlier. β→v. Surface unchanged.

### drink — `chb` 【蓋然】
- **Applied:** `[biohotysuca, bjohotɨsuka]`
- Current IPA 'bjohoty' truncates the entire -suca suffix AND ends in a bare Latin 'y' (IPA [y]=front rounded vowel, absent from Muisca). Verified: colonial Muisca ⟨y⟩=/ɨ/ (Constenla; Wikipedia 'Lugo's y'; cf. cusmuy→/kusmɨ/), ⟨c⟩=/k/, ⟨u⟩=/u/. Full citation form biohotysuca transcribes as bjohotɨsuka. Both the truncation and the stray-Latin defect are real; fix correct. Apply.

### heart — `chb` 【蓋然】
- **Applied:** `[puyquy, pujkʷɨ]`
- Current 'pujkʷy' ends in a bare Latin 'y' (IPA front rounded vowel, not in Muisca). Minimal fix: first ⟨y⟩→/j/ (glide, kept), ⟨qu⟩→/kʷ/ (kept), only the final ⟨y⟩ vowel →/ɨ/ (verified Muisca value). pujkʷɨ correct. Apply.

### mother — `doi` 【蓋然】
- **Applied:** `[मां, mãː]`
- Current cell ['मां','maː'] drops the anusvara nasalization. Surface ⟨मां⟩ = म + ा (long ā) + ं (nasal mark); Dogri has phonemic nasalized vowels including /ã/. Word 'māṁ' (mother) is /mãː/. Only doi cell with a nasal mark, so no internal counter-pattern; defect is genuine and fix correct.

### good — `myz` 【蓋然】
- **Applied:** `[ࡈࡀࡁࡀ, tˤaba]`
- Confirmed cur=["ࡈࡀࡁࡀ","ʈaba"]. Mandaic letter ࡈ is the Semitic/Aramaic emphatic ṭ — pharyngealized [tˤ] (or ejective), never the retroflex stop [ʈ], which is an articulatorily wrong place for an Aramaic emphatic. Fix ʈ→tˤ giving tˤaba. (thanks ࡈࡀࡁࡅࡕࡀ→ʈabuta has the same defect but is outside this finding's scope.)

---

## C. Rejected (26)

- **good `iuu`** 【要検討】 — Not actionable and not clearly an error. The reviewer flags that -x (tone 4) and -z (tone 5) are both rendered ˨˧ but provides NO corrected value and admits 'cannot assert the exact -x value.' Phonetic documentation (Bruhn; ICPhS 2015 eigenpitch study) shows -
- **mother `wuu`** 【要検討】 — The reviewer self-flags 要検討 and admits the contour is 'owner's call.' While the missing tone on syllable 1 may be a real gap (wuu marks tone on first syllables: pa˧˩pa, tʰa˧˧ɦiã˩˩), the proposed ˧˩ is unverifiable: the two siblings disagree (wuu_sz m̩˥, wuu_jx
- **heart `zh_lz`** 【要検討】 — The PROPOSED fix would introduce an error. Lanzhou (Lanyin Mandarin) 阴平 is documented as 31 (=˧˩), 阳平 53. 心 is 阴平, so the current ɕin˧˩ is CORRECT. The reviewer wanted to align 心 to the column's majority ˧˧ (猫/喝/吃/妈/一), but those ˧˧ cells are the ones that dev
- **cat `de_at`** 【蓋然】 — Reject. The reviewer's premise — that back [ɑ] is reserved for LONG /aː/ in this column — is falsified by the existing short-/a/ cell hand=Hand [hɑnt], which uses back ɑ. The de_at column does NOT apply a clean back=long / front=short rule: short-a is split (K
- **eye `de_at`** 【蓋然】 — Reject. Register/owner-judgement item, not a verifiable single-direction error — the reviewer themselves writes 'Owner judgement on intended register.' The de_at column is pervasively dialectal and monophthongises /aʊ/ in eye=Auge[aːɡə] and tree=Baum[baːm]; on
- **thanks `mk`** 【確実】 — Reject — the current form is already correct and the proposal would INTRODUCE an error. благодарам = bla-go-da-ram (4 syllables): ultima=ram, penult=da, antepenult=go. Macedonian fixed antepenultimate stress therefore falls on 'go' = blaˈɡɔdaram, exactly the c
- **thanks `myn`** 【確実】 — The reviewer's factual premise is wrong. The current IPA is nibʼoːlal where 'bʼ' = b + U+2BC modifier apostrophe (verified by codepoint) — i.e. the glottalization is ALREADY transcribed, not 'rendered as plain b'. The remaining question (apostrophe bʼ vs implo
- **tree `nch`** 【要検討】 — Although nci and nhe both have kʷawitɬ and phonemically Nahuatl final -tl is /tɬ/, the nch column has a SYSTEMATIC sub-pattern: -itl is rendered plain tl in BOTH its occurrences — hand maitl→maitl and tree cuahuitl→kʷawitl — while -tla/-tli and post-vowel -otl
- **eat `ahk`** 【蓋然】 — Defect is real but the fix is not safely verifiable. The ENTIRE ahk column is uniformly mid-tone ˧ (cat a˧ji˧, dog tɕa˧, drink tu˧, eye ɲaʔ˧, ... all 20 cells), i.e. a known column-wide mid-tone default — the reviewer admits this and explicitly flags it 'needs
- **hand `dng`** 【要検討】 — The hand cell itself ['шў','ʂəu'] is internally correct: ў here marks the -ou rime → ʂəu (手 shǒu). The real mis-key is the TREE surface (should be 'шу' plain у for 树 shù /ʂu/), not hand. The proposal leaves the hand cell's surface and ipa unchanged (no-op) and
- **good `dng`** 【要検討】 — This is a flag, not an actionable fix: proposed [surface,ipa] equals the current cell (no change). Dungan tones are not marked in the orthography and the entire dng set (19/20 cells) is tone-less by convention; the lone Chao tone on 'good' is the inconsistency
- **eat `kca`** 【蓋然】 — The inconsistency is real (only 2 ⟨э⟩ cells: eye 'сэм'→'sem' [e] vs eat 'лэты'→'lətɯ' [ə]), but the correct value is not positively verifiable. Khanty has unstressed/non-first-syllable vowel reduction, and ⟨э⟩ can map to a reduced vowel; /ə/ in the first sylla
- **dog `kha`** 【要検討】 — Not positively verifiable. The proposed /ɛ/ for ⟨ew⟩'s ⟨e⟩ is contradicted by the column's own ⟨e⟩ convention: every other ⟨e⟩ is transcribed /e/ (mei→mei, wei→wei, khublei→kʰublei). There is no other ⟨ew⟩ cell to confirm /ɛ/. While the IPA is admittedly a nea
- **eat `koi`** 【要検討】 — Reviewer's own confidence is 要検討 and explicitly flags this for owner decision (dialect variant vs error). The proposed fix changes the SURFACE form (сейны→сёйны), which is a substantive lexical/dialect data change, not a transcription cleanup — koi (Komi-Permy
- **dog `lus`** 【要検討】 — Column-wide convention, not a per-cell defect. The ENTIRE lus IPA column is toneless (mit, tʰla, tʰinluŋ, zɔʔte…) — a systematic uniform transcription choice. Reviewer's own confidence is 要検討 and explicitly states the correction 'ùi' is 'illustrative' to surfa
- **water `ksw`** 【要検討】 — Same as lus: the whole ksw IPA column is toneless (θimaŋ, mu, θiŋ…), a systematic convention. Reviewer's confidence is 要検討 and explicitly says 'the ˧ shown is illustrative pending owner's tone source' — i.e. the tone value is not actually sourced. Column-wide 
- **drink `mic`** 【蓋然】 — The whole mic column systematically voices stops in sonorant/intervocalic-coda contexts: water samqwan→samɡʷan, eye pukweck→buɡʷedʒɡ, fire puktew→puɡdew, good kelu'lk→ɡeluːlɡ, tree nipi→nibi, hand piten→biden. Rendering q as the velar stop ɡ (saːɡ) is part of 
- **cat `nzi`** 【蓋然】 — Current cur=["agyinamoa","adʑinamoa"] is CORRECT. Nzema ⟨gy⟩=[dʑ] (voiced alveolo-palatal AFFRICATE) and ⟨ky⟩=[tɕ], verified against Nzema phonology. The proposed change to plosive [ɟ] (aɟinamoa) would make the cell WRONG. The real inconsistency is the sibling
- **eat `orv`** 【蓋然】 — Confirmed cur=["ѣсти","ěsti"]. The orv column is overwhelmingly scholarly transliteration with háčeks/breves, not IPA: cat kotŭka, dog pĭsŭ, father otĭtsĭ, moon měsętsĭ, hand rǫka, sun sŭlnĭtse, one odinŭ, etc. (15+ cells). Closed review #03 explicitly deferre
- **eat `rhg`** 【確実】 — Reviewer's premise is inverted. Per Wikipedia + Rohingya Language Foundation, the Rohingya verb 'eat' IS the h-form: há / hái ('Añí bát hái' = 'I eat rice'), verbal noun háwa with ⟨h⟩ /h/ — homophonous with háwa 'wind' (Rohingya has two h-sounds written ⟨h⟩ an
- **tree `rut`** 【要検討】 — The duplication defect is REAL — tree ["хыл","χɨl"] is byte-identical to hand ["хыл","χɨl"] in the rut column, and хыл is 'hand' in Rutul/Lezgic (cf. the column's own hand=хыл). But the reviewer supplies NO replacement word ('owner to supply the attested form'
- **good `tyz`** 【蓋然】 — Cannot positively verify. The proposed 'open vowel /aːj/' is contradicted by the etymology: Proto-Tai *ɗɤjᴬ 'good' has reflexes with -i/-ei (Thai ดี dii, Lao ດີ dī, Zhuang ndei), pointing to a close/mid vowel, not /aːj/. The reviewer's only support is an unver
- **love `usp`** 【要検討】 — No localized defect. The current cell ['lóqʼ','lóqʼ'] has surface and IPA in AGREEMENT — there is no surface/IPA mismatch. This is exactly parallel to Tuyuca mother pakó/pakó, which the same reviewer accepted as correct. The proposal is a column-wide tone-mark
- **heart `udi`** 【要検討】 — Genuinely unresolved. The phonological observation is sound (⟨кӏ⟩ k+palochka is conventionally velar /kʼ/ while the column writes uvular /qʼ/ as ⟨кь⟩ in hand кьил→qʼil and ⟨хъ⟩ in good яхъи→jaqʼi), so mapping ⟨кӏ⟩→qʼ does collapse a contrast. BUT the reviewer 
- **eat `xog`** 【蓋然】 — Proposed value is less accurate than the current one. The authoritative Lusoga IPA Illustration (Nabirye, JIPA) transcribes 'to eat' as [ɔ̀kùɺjá] — a PALATALIZED FLAP [ɺj], i.e. a palatalized consonant, NOT the palatal lateral approximant [ʎ] the reviewer prop
- **eat `xct`** 【要検討】 — Reviewer's own confidence is 要検討 and the framing is 'Suggest', not an error claim. The xct (colloquial-Lhasa) and xct_litpr (literary-pedagogical) columns are intentionally designed to show different realizations; forcing xct za→sa would make it identical to x

---

*Rally #191 — 2026-06-17. All 141 dev-approved corrections applied (80 確実 + 61 owner-confirmed). 26 rejected. Validator PASS.*
