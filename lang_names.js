/**
 * lang_names.js — translated language names per UI language.
 *
 * Loaded by both index.html (Word Order Map) and wordmap.html (Word Map).
 * Was previously embedded in app.js and extracted at runtime by wordmap.html
 * via fetch + regex + new Function (per wordmap-check.md §12).
 */
const LANG_NAMES = {
    ja: { es_cr:'スペイン語(コスタリカ)', es_hn:'スペイン語', es_ni:'スペイン語(ニカラグア)', es_sv:'スペイン語（エルサルバドル）', ar_jo:'ヨルダンアラビア語', ar_ps:'パレスチナアラビア語', fr_lu:'フランス語', fr_cm:'カメルーンフランス語', de_lu:'ドイツ語(ルクセンブルク)', en_ng2:'英語（ガーナ）', pt_mo:'マカオポルトガル語', lb:'ルクセンブルク語', gcr:'フランス領ギアナ・クレオール語', acf:'セントルシア・クレオール語',  gan_yc:'贛語宜春方言', gan_ja:'吉安贛語', gan_fz:'抚州ガン語', cjy_lv:'吕梁晋語', cjy_xz:'晋語忻州方言', hsn_hy:'衡陽湘語', hsn_yz:'ショウ語（永州方言）', czh_wy:'徽語（婺源）',  bla:'ブラックフット語', hop:'ホピ語', com:'コマンチ語', one:'オネイダ語', ono:'オノンダガ語', win:'ホーチャンク語', cro:'クロウ語', hai:'ハイダ語', cic:'チカショー語', ik:'イヌピアック語', na:'ナウル語', luz:'北部ルーリー語', es_bo:'スペイン語(ボリビア)', es_py:'パラグアイ・スペイン語', es_pa:'パナマスペイン語', en_my:'英語(マレーシア)', pt_gw:'ギニアビサウ・クレオール語', tsz:'プレペチャ語', nez:'ニズパース語', nv2:'西アパッチェ語', woe:'ウォレアイ語', pmt:'トゥアモトゥアン語', bin:'エド語', khw:'コホワール語',  xav:'ザヴァンテ語', ter:'テレナ語', bor:'ボロロ語', trn:'トリニタリオ・モヘーニョ語', ake:'アカワイオ語', aoc:'ペモン語', gun:'ムビア・グアラニー語',  zdj:'コモロ語（シコモリ）', ayl:'リビア・アラビア語', abv:'バフラーニー・アラビア語', afb:'湾岸アラビア語', acw:'オマーンアラビア語', swb:'マオレ・コモロ語',  adx:'アムド・チベット語', qxs:'南川チャン語', duu:'ドゥルン語', jya:'シトゥ・ルギャルロン語', ers:'エルス語', bca:'中央バイ語', atb:'ザイワ語', prk:'パラウク・ワ語', slr:'サラル語', ybe:'西裕固語', yuy:'東ユグル語', mjg:'モンゴル語', sce:'ドンシャン語', peh:'ボナン語', bua:'ブリヤート語', cjs:'ショル語', dlg:'ドルガン語', kdt:'クイ語', blk:'パアオ語', njo:'アオ・ナガ語', srb:'ソラ語', kjg:'クム語', mro:'ムル語', gon:'ゴンド語', bfq:'バダガ語', som:'ソマリ語', har:'ハラリ語',  es_pr:'スペイン語(プエルトリコ)', es_do:'スペイン語(ドミニカ共和国)', es_gt:'スペイン語（グアテマラ）', es_ec:'スペイン語(エクアドル)', es_uy:'スペイン語(ウルグアイ)', ar_sy:'アラビア語(シリア)', ar_ye:'アラビア語(イエメン方言)', ar_dz:'アラビア語(アルジェリア方言)', ar_sa:'アラビア語(サウジアラビア)', ar_lb:'アラビア語(レバノン)', en_wls:'英語(ウェールズ)', en_jam:'英語（ジャマイカ）', en_ng:'英語(ナイジェリア)', en_ph:'英語(フィリピン)', en_ke:'英語(ケニア)', fr_sn:'フランス語(セネガル)', fr_ci:'フランス語(コートジボワール)', fr_ht:'フランス語(ハイチ)', pt_mz:'ポルトガル語(モザンビーク)', pt_cv:'ポルトガル語（カボベルデ）',  nl_be:'オランダ語(ベルギー)', en_us:'英語(アメリカ)', en_ca:'英語(カナダ)', en_za:'英語(南アフリカ)', de_ch:'ドイツ語(スイス)', pt_ao:'undefined(アンゴラ)', es_ve:'undefined(ベネズエラ)', ca_va:'バレンシア語',  nan_pera:'プラナカン華人福建話', zh_th:'タイ華僑普通話', zh_tw:'台灣華語', nan_th:'タイ華僑潮州語', zh_us:'北米華人普通話', yue_us:'北米華人広東語', dng:'東干語', ko_hun:'韓国語訓 (固有語)', ja_kun:'訓読み (日本固有語)', phm:'苗瑶祖語', pmgl:'モンゴル祖語', ptai:'タイ祖語', paa:'オーストロアジア祖語', ptung:'ツングース祖語', pja:'日本祖語', pko:'朝鮮祖語', ptb:'蔵緬祖語', pst:'漢蔵祖語', ko_zai:'在日韓国・朝鮮人漢字音', bo_sino:'現代蔵語漢字音', vi_ohan:'古漢越音', ja_ojp:'上代日本語漢字音', ko_mid:'中世韓国語', sjo:'シベ語 (錫伯語)', nan_id:'インドネシア福建話', nan_my:'マレーシア福建話', nan_sg:'シンガポール福建話', yue_mo:'マカオ粤語', yue_hk:'香港粤語', zh_phagspa:'元代漢語 (八思巴字)', zh_yuan:'元代官話 (中原音韻)', bca:'白語(中部)', ja:'日本語(標準)', ja_osa:'日本語(大阪弁)', ja_aom:'日本語(青森弁)', ja_oki:'沖縄語', ja_hak:'日本語(博多弁)', ja_edo:'日本語(江戸時代)', ja_kanbun:'漢文訓読', ja_heian:'日本語(平安時代)', ko:'韓国語(標準)', ko_kp: "朝鮮語(文化語)", ko_bus:'韓国語(釜山弁)', zh:'中国語(普通話)', yue:'広東語', nan:'台湾語', wuu:'上海呉語', zh_song:'中国語(宋明文言)', zh_wenyan_edu:'文言文(粵音)', vi:'北部ベトナム語', vi_c:'中部ベトナム語', vi_s:'南部ベトナム語', vi_nom:'ベトナム語(字喃)', vi_han:'ベトナム漢文(漢越音)', th:'タイ語', id:'インドネシア語', sa:'サンスクリット語', sa_edu:'現代会話サンスクリット', hi:'ヒンディー語', en:'英語', en_aave:'英語(AAVE)', en_south:'英語(アメリカ南部)', en_app:'英語(アパラチア)', en_ie:'英語(アイルランド)', en_sco:'英語(スコットランド)', en_yk:'英語(ヨークシャー)', en_ck:'英語(コックニー)', de:'ドイツ語', de_lut:'初期新高ドイツ語(ルター期)', fr:'フランス語', fr_class:'古典フランス語(17世紀)', it:'イタリア語', it_dan:'イタリア語(ダンテ期)', es_eu:'スペイン語(欧州)', es_sgl:'黄金世紀スペイン語', es_mx:'スペイン語(メキシコ)', pt_eu:'ポルトガル語(欧州)', pt_br:'ポルトガル語(ブラジル)', la:'ラテン語', ru:'ロシア語', uk:'ウクライナ語', ar:'アラビア語(フスハー)', ar_qur:'クルアーン・アラビア語', ar_eg:'アラビア語(エジプト方言)', he:'ヘブライ語', he_mis:'ヘブライ語(ミシュナー期)', sw:'スワヒリ語', tr:'トルコ語', fa:'ペルシャ語', fa_clas:'ペルシャ語(古典)', tl:'タガログ語', ga:'アイルランド語', eu:'バスク語', mn:'モンゴル語', my:'ミャンマー語', am:'アムハラ語', egy:'古代エジプト語', ta:'タミル語', hu:'ハンガリー語', nl:'オランダ語', pl:'ポーランド語', ms:'マレー語', mg:'マダガスカル語', cy:'ウェールズ語', fi:'フィンランド語', ain:'アイヌ語', bn:'ベンガル語', ur:'ウルドゥー語', te:'テルグ語', jv:'ジャワ語', ko_jeju:'済州語', ko_em:'韓国語(近世)', ka:'ジョージア語', el:'ギリシャ語', el_grc:'ギリシャ語(古代)', el_kath:'ギリシャ語(カサレヴサ)', nv:'ナバホ語', qu:'ケチュア語', mi:'マオリ語', haw:'ハワイ語', km:'クメール語', lo:'ラオ語', yo:'ヨルバ語', zu:'ズールー語', bo:'チベット語', xct_litpr:'チベット語(仏典朗誦)', hy:'アルメニア語', hy_grab:'古典アルメニア語(グラバル)', ilo:'イロカノ語', bho:'ボージュプリー語', th_s:'タイ語(南部)', th_n:'タイ語(北部)', vec:'ヴェネト語', nds:'低地ドイツ語', de_by:'ドイツ語(バイエルン)', de_at:'ドイツ語(オーストリア)', fr_be:'フランス語(ベルギー)', fr_af:'フランス語(アフリカ)', es_an:'スペイン語(アンダルシア)', es_pe:'スペイン語(ペルー)', es_cu:'スペイン語(キューバ)', ar_sd:'アラビア語(スーダン方言)', ar_tn:'アラビア語(チュニジア方言)' , ja_kyo:'日本語(京都弁)', ja_hir:'日本語(広島弁)', ja_mvi:'宮古語', ja_rys:'八重山語', ar_lev:'アラビア語(レバント方言)', ar_ma:'アラビア語(モロッコ方言)', ar_gulf:'アラビア語(湾岸方言)', zh_sc:'四川官話', zh_db:'東北官話', nap:'ナポリ語', scn:'シチリア語', de_gsw:'ドイツ語(スイス)', fr_qc:'フランス語(ケベック)', sco:'スコットランド語', en_sg:'英語(シンガポール)', hwc:'ハワイ・クレオール', pcm:'ナイジェリア・ピジン', tpi:'トク・ピシン', en_ang:'古英語', sv:'スウェーデン語', no:'ノルウェー語', si:'シンハラ語', ro:'ルーマニア語', cs:'チェコ語', ca:'カタルーニャ語', da:'デンマーク語', is:'アイスランド語', lt:'リトアニア語', sq:'アルバニア語', mt:'マルタ語', so:'ソマリ語', ml:'マラヤーラム語', pa:'パンジャーブ語', ku:'クルド語', ug:'ウイグル語', kk:'カザフ語', ha:'ハウサ語', ig:'イグボ語', eo:'エスペラント', tok:'トキポナ', ht:'ハイチクレオール', ps:'パシュトー語', uz:'ウズベク語', mr:'マラーティー語', gu:'グジャラート語', kn:'カンナダ語', ne:'ネパール語', om:'オロモ語', ti:'ティグリニャ語', wo:'ウォロフ語', ln:'リンガラ語', sn:'ショナ語', sr:'セルビア語', bg:'ブルガリア語', sk:'スロバキア語', lv:'ラトビア語', et:'エストニア語', be:'ベラルーシ語', yi:'イディッシュ語', non:'古ノルド語', arc:'アラム語', cop:'コプト語', rom:'ロマニ語', br:'ブルトン語', xh:'コサ語', lad:'ラディーノ語', tlh:'クリンゴン語', jbo:'ロジバン', fj:'フィジー語', sm:'サモア語', en_au:'英語(オーストラリア)', en_in:'英語(インド)', es_ar:'スペイン語(アルゼンチン)', ar_iq:'アラビア語(イラク方言)', hak_cn:'客家語', sux:'シュメール語', akk:'アッカド語', hit:'ヒッタイト語', nci:'古典ナワトル語', myn:'古典マヤ語', ine:'印欧祖語' , zh_han:'中国語(漢代漢文)', zh_tang:'中国語(唐代漢文)', ceb:'セブアノ語', su:'スンダ語', th_isan:'タイ語(イサーン方言)', es_co:'スペイン語(コロンビア)', es_cl:'スペイン語(チリ)', gl:'ガリシア語', oc:'オック語', fo:'フェロー語', jam:'ジャマイカ・パトワ', pap:'パピアメント語', ko_yb:'延辺朝鮮語', mn_cn:'内モンゴルモンゴル語', za:'チワン語', ii:'イ語', hmn:'ミャオ語', mnc:'満州語', af:'アフリカーンス語', az:'アゼルバイジャン語', tg:'タジク語', gn:'グアラニー語', iu:'イヌクティトゥット語', ky:'キルギス語', ckb:'クルド語(ソラニー)', nn:'ノルウェー語(ニーノシュク)', got:'ゴート語', cu:'古教会スラヴ語', pi:'パーリ語', pi_edu:'パーリ語(教学・上座部僧院)', rm:'ロマンシュ語', fy:'フリジア語', sc:'サルデーニャ語', chr:'チェロキー語', or:'オディア語', sd:'シンド語', as:'アッサム語', rw:'キニヤルワンダ語', ny:'チェワ語', tk:'トルクメン語', cdo:'閩東語', gd:'スコットランド・ゲール語', sl:'スロベニア語', enm:'中英語', en_em:'初期近代英語', fr_ch:'フランス語(スイス)', to:'トンガ語', se:'北サーミ語', pau: "パラオ語", sah:'サハ語', tyv:'トゥヴァ語', kjh:'ハカス語', alt:'アルタイ語', bxr:'ブリヤート語', evn:'エヴェンキ語', eve:'エヴェン語', yrk:'ネネツ語', kca:'ハンティ語', ckt:'チュクチ語', niv:'ニヴフ語', ket:'ケット語', cjy:'晋語', hsn:'湘語', gan:'贛語', mai:'マイティリー語', awa:'アワディー語', skr:'サライキ語', sat:'サンタル語', mad:'マドゥラ語', hil:'ヒリガイノン語', bal:'バローチー語', ak:'アカン語', mk:'マケドニア語', lg:'ルガンダ語', ki:'キクユ語', tn:'ツワナ語', st:'南ソト語', ts:'ツォンガ語', ve:'ヴェンダ語', bem:'ベンバ語', lua:'ルバ・カサイ語', kg:'コンゴ語', ff:'フラニ語', bm:'バンバラ語', kab:'カビル語', yua:'ユカテコ・マヤ語', tzo:'ツォツィル語', mix:'ミステコ語', zap:'サポテコ語', ay:'アイマラ語', arn:'マプチェ語', cr:'クリー語(平原)', oj:'オジブウェー語', lkt:'ラコタ語', kl:'グリーンランド語', ce:'チェチェン語', inh:'イングーシ語', av:'アヴァル語', lez:'レズギ語', dar:'ダルギン語', lbe:'ラク語', tab:'タバサラン語', ady:'アディゲ語', kbd:'カバルド語', ab:'アブハズ語', xmf:'ミングレル語', os:'オセット語', ty:'タヒチ語', niu:'ニウエ語', tvl:'ツバル語', rap:'ラパ・ヌイ語', rar:'クック諸島マオリ語', mh:'マーシャル語', gil:'キリバス語', ch:'チャモロ語', tet:'テトゥン語', bi:'ビスラマ語', pjt:'ピチャンチャチャラ語', wbp:'ワルピリ語', mni:'マイテイ語', new:'ネワール語', brx:'ボド語', lus:'ミゾ語', dz:'ゾンカ語', min:'ミナンカバウ語', ban:'バリ語', ace:'アチェ語', bug:'ブギス語', war:'ワライ語', bik:'中部ビコル語', tum:'トゥンブカ語', din:'ディンカ語', nus:'ヌエル語', luo:'ルオ語', mas:'マサイ語', aa:'アファル語', shi:'タシュルヒート語', rif:'タリフィート語', mwr:'マルワーリー語', bgc:'ハリヤーンビー語', ks:'カシミール語', kok:'コンカニ語', mnp:'閩北語', nan_te:'潮州語', yue_ts:'台山語', czh:'徽州語', cnp:'平話', zh_jh:'江淮官話', zh_tj:'天津官話', zh_lz:'蘭銀官話', dng:'東干語', hsb:'高地ソルブ語', csb:'カシューブ語', fur:'フリウリ語', ast:'アストゥリアス語', an:'アラゴン語', rup:'アルーマニア語', wa:'ワロン語', udm:'ウドムルト語', mhr:'マリ語(平地)', myv:'エルジャ語', krl:'カレリア語', mzn:'マーザンダラーン語', glk:'ギラキ語', lrc:'ロル語', crh:'クリミア・タタール語', tt:'タタール語', ba:'バシキール語', krc:'カラチャイ・バルカル語', ksw:'スゴー・カレン語', lhu:'ラフ語', lis:'リス語', nxq:'ナシ語', shn:'シャン語', ee:'エウェ語', nyn:'ルニャンコレ語', luy:'ルヒヤ語', ssw:'スワジ語', nbl:'南ンデベレ語', nso:'北ソト語', fan:'ファン語', naq:'ナマ語', hts:'ハッツァ語', kr:'カヌリ語', men:'メンデ語', dyu:'ジュラ語', syl:'シレッティ語', mag:'マガヒー語', doi:'ドグリ語', xkk:'クム語', moh:'モホーク語', cho:'チョクトー語', esu:'中央アラスカ・ユピック語', ipk:'イヌピアック語', apw:'西アパッチェ語', dak:'ダコタ語', chy:'シャイアン語', lmo:'ロンバルド語', pms:'ピエモンテ語', eml:'エミリア・ロマーニャ語', mwl:'ミランデース語', pnt:'ポントス・ギリシャ語', hno:'ヒンドコ語', bhb:'ビーリ語', cja:'チャム語', hmo:'ヒリ・モトゥ語', pon:'ポンペイ語', vmw:'マクア語', dsb:'低地ソルブ語', gv:'マン島語', kw:'コーンウォール語', zza:'ザザ語', brh:'ブラフーイ語', mrq:'マルケサス語', tiw:'ティウィ語', guc:'ワユー語', myp:'ピダハン語', emp:'北エンベラ語', kpe:'クペレ語', loz:'ロズィ語', bbc:'トバ・バタク語', bjn:'バンジャル語', sas:'ササク語', kha:'カシ語', mns:'マンシ語', mrw:'マラナオ語', tsg:'タウスグ語', yap:'ヤップ語', chk:'チュー語', gbm:'ガルワール語', kfy:'クマウオン語', xnr:'カーングリ語', hr:'クロアチア語', bs:'ボスニア語', iba:'イバン語', ljp:'ランプン語', tzm:'中央アトラス・タマジクト語', ng:'ンドンガ語', umb:'ウンブンドゥ語', kmb:'キンブンドゥ語', her:'ヘレロ語', xal:'カルムイク語', sg:'サンゴ語', toi:'トンガ語(ザンビア)', peo:'古ペルシア語', ave:'アヴェスター語', xto:'トカラ語A', txb:'トカラ語B', phn:'フェニキア語', uga:'ウガリット語', xlu:'ルウィ語', pal:'中世ペルシア語(パフラヴィー)', syc:'古典シリア語', fro:'古フランス語', goh:'古高ドイツ語', gez:'ゲエズ語', gmy:'ミケーネ・ギリシャ語', xct:'古典チベット語', xpu:'ポエニ語', xhu:'フルリ語', elx:'エラム語', xsa:'サバ語', kaw:'古ジャワ語(カウィ)', kho:'コータン語', gmh:'中高ドイツ語', osp:'古スペイン語', okz:'古クメール語', osx:'古ザクセン語', smg:'スクマ語', mos:'モーレ語', kln:'カレンジン語', mfe:'モーリシャス・クレオール', mnk:'マンディンカ語', bqi:'バフティヤーリー語', unr:'ムンダリ語', hoc:'ホ語', enq:'エンガ語', xpr:'パルティア語', xqa:'カラハン語', sga:'古アイルランド語', bsk:'ブルシャスキー語', yag:'ヤグノビ語', srn:'スリナム・トンゴ語', kwk:'クワキウトル語', sad:'サンダウェ語', pcc:'ブイ語', iuu:'イウ・ミエン語', hui:'フリ語', tkl:'トケラウ語', squ:'スクワミッシュ語', mga:'中世アイルランド語', hbo:'聖書ヘブライ語', mpt:'ミアン語', ygr:'ヤガリア語', quz:'クスコ・ケチュア語', quy:'アヤクーチョ・ケチュア語', cab:'ガリフナ語', crx:'キャリア語', tsi:'コースト・ツィムシアン語', wbl:'ワヒ語', psi:'パシャイ語', bgq:'バーグリー語', ach:'アチョリ語', rki:'ラカイン語', kxm:'北方クメール語', xng:'中世モンゴル語', ja_kg:'日本語(鹿児島弁)', ja_sd:'日本語(仙台弁)', ko_hg:'朝鮮語(咸鏡方言)', ko_jl:'韓国語(全羅方言)', nan_pn:'ペナン福建語', mra:'ムラブリ語', wuu_nb:'寧波呉語', yue_gz:'高州粤語', khb:'タイ・ルー語', pam:'カパンパンガン語', pag:'パンガシナン語', mdh:'マギンダナオ語', gor:'ゴロンタロ語', mak:'マカッサル語', fon:'フォン語', kri:'クリオ語', dag:'ダバニ語', xog:'ソガ語', teo:'アテソ語', dyo:'ジョラ・フォニー語', bci:'バウレ語', tcy:'トゥル語', haz:'ハザラギ語', tly:'タリシュ語', kaa:'カラカルパク語', bej:'ベジャ語', tig:'ティグレ語', ssy:'サホ語', ewo:'エウォンド語', bum:'ブル語', ndc:'ンダウ語', ote:'オトミ語', tar:'タラフマラ語', och:'上古漢語', ojp:'上代日本語', vsa:'ヴェーダ語', txg:'西夏語', sog:'ソグド語', otk:'古テュルク語', zkt:'契丹語', juc:'女真語', omx:'古モン語', pyx:'驃語 (ピュー)', obr:'古ビルマ語', occ:'古チャム語', orv:'古東スラヴ語', xsc:'スキタイ語', sukh:'古タイ語(スコータイ)', xmr:'メロエ語', onw:'古ヌビア語', cqu:'古典ケチュア語', omc:'ムチカ語 (ユンガ)', chb:'チブチャ語 (ムイスカ)', oma:'古マレー語', osu:'古スンダ語', otl:'古タガログ語', ami:'アミ語', pwn:'パイワン語', tay:'タイヤル語', bnn:'ブヌン語', trv:'タロコ・セデック語', tsu:'ツォウ語', tao:'タオ語(ヤミ語)', hak_tw:'台湾客家語', wuu_sz:'蘇州呉語', wuu_wz:'温州呉語', nan_qz:'泉州閩南語', nan_hai:'海南語', zh_wh:'武漢官話', zh_zz:'中原官話', hak_hl:'海陸客家語', cpx:'莆仙語', mfa:'パタニ・マレー語', mtq:'ムオン語', tyz:'タイー語', kjp:'プオ・カレン語', kac:'ジンポー語(カチン)', wbm:'ワ語', ahk:'アカ語', dtp:'カダザン・ドゥスン語', hne:"チャッティースガリー語", mnw:"モン語", grt:"ガロ語", nut:"ヌン語", quc:"キチェ語", kek:"ケクチ語", mam:"マム語", wal:"ウォライタ語", sid:"シダモ語", tji:"土家語", nij:"ンガジュ語", sda:"サダン・トラジャ語", arq:'アラビア語(アルジェリア方言)', mey:'ハサニーヤ・アラビア語', tmh:'タマシェク語(トゥアレグ)', azb:'南アゼルバイジャン語', gag:'ガガウズ語', sma:'南サーミ語', vro:'ヴォロ語', pjk:'日韓祖語', oko:'古代韓国語(新羅)', okg:'高句麗語', ko_gor:'高麗語', ja_chu:'中世日本語', pry:'琉球祖語', lld:'ラディン語', stq:'ザーターラント・フリジア語', wym:'ヴィミソリス語', yuc:'ユチ語', kgg:'クスンダ語', ota:'オスマン・トルコ語', cmg:'古典モンゴル語', ett:'エトルリア語', xht:'ハッティ語', txr:'タルテッソス語', roo:'ロトカス語', nmn:'タア語', lbz:'ラーディル語', nny:'ヤンカール語', kky:'グーグ・イミディル語', blc:'ヌハルク語', tue:'トゥユカ語', ncs:'ニカラグア手話', uby:'ウビフ語', lbz_damin:'ダミン語 (ラーディル儀礼語)'},
    en: { es_cr:'Spanish (Costa Rica)', es_hn:'Spanish', es_ni:'Spanish (Nicaragua)', es_sv:'Spanish (Salvadoran)', ar_jo:'Jordanian Arabic', ar_ps:'Palestinian Arabic', fr_lu:'French', fr_cm:'Cameroonian French', de_lu:'German (Luxembourgish)', en_ng2:'English (Ghana)', pt_mo:'Macanese Portuguese', lb:'Luxembourgish', gcr:'French Guianese Creole', acf:'Saint Lucian Creole',  gan_yc:'Gan Chinese (Yichun dialect)', gan_ja:'Gan (Jiʼan)', gan_fz:'Gan Chinese (Fuzhou)', cjy_lv:'Lüliang Jin', cjy_xz:'Jin Chinese (Xinzhou)', hsn_hy:'Xiang (Hengyang)', hsn_yz:'Xiang Chinese (Yongzhou dialect)', czh_wy:'Hui Chinese (Wuyuan)',  bla:'Blackfoot', hop:'Hopi', com:'Comanche', one:'Oneida', ono:'Onondaga', win:'Ho-Chunk', cro:'Crow', hai:'Haida', cic:'Chickasaw', ik:'Inupiaq', na:'Nauruan', luz:'Northern Luri', es_bo:'Spanish (Bolivia)', es_py:'Paraguayan Spanish', es_pa:'Panamanian Spanish', en_my:'English (Malaysia)', pt_gw:'Guinea-Bissau Kriol', tsz:'Purépecha', nez:'Nez Perce', nv2:'Western Apache', woe:'Woleaian', pmt:'Tuamotuan', bin:'Edo language', khw:'Khowar',  xav:'Xavante', ter:'Terena', bor:'Bororo', trn:'Trinitario Mojeño', ake:'Akawaio', aoc:'Pemón', gun:'Mbyá Guaraní',  zdj:'Comorian (Shikomori)', ayl:'Libyan Arabic', abv:'Bahrani Arabic', afb:'Gulf Arabic', acw:'Omani Arabic (Hijazi-Omani)', swb:'Maore Comorian',  adx:'Amdo Tibetan', qxs:'Southern Qiang', duu:'Drung', jya:'Situ rGyalrong', ers:'Ersu', bca:'Central Bai', atb:'Zaiwa', prk:'Parauk Wa', slr:'Salar', ybe:'Western Yugur', yuy:'Eastern Yugur', mjg:'Monguor language', sce:'Dongxiang language', peh:'Bonan', bua:'Buryat language', cjs:'Shor', dlg:'Dolgan', kdt:'Kuy', blk:'Pa\'O language', njo:'Ao Naga', srb:'Sora language', kjg:'Khmu', mro:'Mru', gon:'Gondi', bfq:'Badaga language', som:'Somali', har:'Harari',  es_pr:'Spanish (Puerto Rican)', es_do:'Spanish (Dominican Republic)', es_gt:'Spanish (Guatemalan)', es_ec:'Spanish (Ecuadorian)', es_uy:'Spanish (Uruguayan)', ar_sy:'Arabic (Syrian)', ar_ye:'Arabic (Yemeni)', ar_dz:'Arabic (Algerian)', ar_sa:'Arabic (Saudi Arabia)', ar_lb:'Arabic (Lebanese)', en_wls:'English (Welsh)', en_jam:'English (Jamaican)', en_ng:'English (Nigerian)', en_ph:'English (Philippine)', en_ke:'English (Kenyan)', fr_sn:'French (Senegalese)', fr_ci:'French (Ivorian)', fr_ht:'French (Haitian)', pt_mz:'Portuguese (Mozambique)', pt_cv:'Portuguese (Cape Verdean)',  nl_be:'Dutch (Belgian)', en_us:'English (American)', en_ca:'English (Canadian)', en_za:'English (South African)', de_ch:'German (Swiss)', pt_ao:'undefined (Angolan)', es_ve:'undefined (Venezuelan)', ca_va:'Valencian',  nan_pera:'Peranakan Hokkien', zh_th:'Thai Mandarin (heritage)', zh_tw:'Taiwan Mandarin', nan_th:'Thai Teochew', zh_us:'American Mandarin (heritage)', yue_us:'American Cantonese (heritage)', dng:'Dungan', ko_hun:'Korean Hanja-hun (native reading)', ja_kun:'Japanese kun-yomi', phm:'Proto-Hmong-Mien', pmgl:'Proto-Mongolic', ptai:'Proto-Tai', paa:'Proto-Austroasiatic', ptung:'Proto-Tungusic', pja:'Proto-Japonic', pko:'Proto-Koreanic', ptb:'Proto-Tibeto-Burman', pst:'Proto-Sino-Tibetan', ko_zai:'Zainichi Korean Sino-reading', bo_sino:'Modern Tibetan Sino-reading', vi_ohan:'Old Sino-Vietnamese', ja_ojp:'Old Japanese on-yomi', ko_mid:'Middle Korean', sjo:'Sibe', nan_id:'Indonesian Hokkien (Medan)', nan_my:'Malaysian Hokkien', nan_sg:'Singaporean Hokkien', yue_mo:'Macau Cantonese', yue_hk:'Hong Kong Cantonese', zh_phagspa:'Yuan Phags-pa Chinese', zh_yuan:'Early Mandarin (Yuan)', bca:'Central Bai', ja:'Japanese', ja_osa:'Japanese (Osaka)', ja_aom:'Japanese (Aomori)', ja_oki:'Okinawan', ja_hak:'Japanese (Hakata)', ja_edo: "Japanese (Edo period)", ja_kanbun:'Japanese Kanbun Reading', ja_heian: "Japanese (Heian period)", ko:'Korean', ko_kp: "Korean (DPRK)", ko_bus:'Korean (Busan)', zh:'Chinese (Mandarin)', yue:'Cantonese', nan:'Taiwanese', wuu:'Shanghainese', zh_song:'Chinese (Classical)', zh_wenyan_edu:'Classical Chinese (Cantonese pedagogical)', vi:'Northern Vietnamese', vi_c:'Central Vietnamese', vi_s:'Southern Vietnamese', vi_nom:'Vietnamese (Chữ Nôm)', vi_han:'Vietnamese Hán văn (Sino-reading)', th:'Thai', id:'Indonesian', sa:'Sanskrit', sa_edu:'Modern Spoken Sanskrit', hi:'Hindi', en:'English', en_aave:'English (AAVE)', en_south:'English (Southern US)', en_app:'English (Appalachian)', en_ie:'English (Irish)', en_sco:'English (Scottish)', en_yk:'English (Yorkshire)', en_ck:'English (Cockney)', de:'German', de_lut:'Early New High German (Luther-era)', fr:'French', fr_class:'Classical French (17c., Bel Usage)', it:'Italian', it_dan:'Old Italian (Dantesque)', es_eu:'Spanish (Europe)', es_sgl:'Golden Age Spanish (Siglo de Oro)', es_mx:'Spanish (Mexico)', pt_eu:'Portuguese (Europe)', pt_br:'Portuguese (Brazil)', la:'Latin', ru:'Russian', uk:'Ukrainian', ar:'Arabic (MSA)', ar_qur:'Quranic Arabic', ar_eg:'Arabic (Egyptian)', he:'Hebrew', he_mis:'Mishnaic Hebrew', sw:'Swahili', tr:'Turkish', fa:'Persian', fa_clas:'Persian (Classical)', tl:'Tagalog', ga:'Irish', eu:'Basque', mn:'Mongolian', my:'Burmese', am:'Amharic', egy:'Ancient Egyptian', ta:'Tamil', hu:'Hungarian', nl:'Dutch', pl:'Polish', ms:'Malay', mg:'Malagasy', cy:'Welsh', fi:'Finnish', ain:'Ainu', bn:'Bengali', ur:'Urdu', te:'Telugu', jv:'Javanese', ko_jeju:'Jeju', ko_em: "Korean (Early Modern)", ka:'Georgian', el:'Greek', el_grc:'Greek (Ancient)', el_kath:'Greek (Katharevousa)', nv:'Navajo', qu:'Quechua', mi:'Māori', haw:'Hawaiian', km:'Khmer', lo:'Lao', yo:'Yoruba', zu:'Zulu', bo:'Tibetan', xct_litpr:'Liturgical Classical Tibetan', hy:'Armenian', hy_grab:'Classical Armenian (Grabar)', ilo:'Ilocano', bho:'Bhojpuri', th_s:'Thai (Southern)', th_n:'Thai (Northern)', vec:'Venetian', nds:'Low German', de_by:'German (Bavarian)', de_at:'German (Austrian)', fr_be:'French (Belgian)', fr_af:'French (African)', es_an:'Spanish (Andalusian)', es_pe:'Spanish (Peruvian)', es_cu:'Spanish (Cuban)', ar_sd:'Arabic (Sudanese)', ar_tn:'Arabic (Tunisian)' , ja_kyo:'Japanese (Kyoto)', ja_hir:'Japanese (Hiroshima)', ja_mvi:'Miyako', ja_rys:'Yaeyama', ar_lev:'Arabic (Levantine)', ar_ma:'Arabic (Moroccan)', ar_gulf:'Arabic (Gulf)', zh_sc:'Sichuan Mandarin', zh_db:'Northeastern Mandarin', nap:'Neapolitan', scn:'Sicilian', de_gsw:'German (Swiss)', fr_qc:'French (Québec)', sco:'Scots', en_sg:'English (Singapore)', hwc:'Hawaiian Creole', pcm:'Nigerian Pidgin', tpi:'Tok Pisin', en_ang:'Old English', sv:'Swedish', no:'Norwegian', si:'Sinhala', ro:'Romanian', cs:'Czech', ca:'Catalan', da:'Danish', is:'Icelandic', lt:'Lithuanian', sq:'Albanian', mt:'Maltese', so:'Somali', ml:'Malayalam', pa:'Punjabi', ku:'Kurdish', ug:'Uyghur', kk:'Kazakh', ha:'Hausa', ig:'Igbo', eo:'Esperanto', tok:'Toki Pona', ht:'Haitian Creole', ps:'Pashto', uz:'Uzbek', mr:'Marathi', gu:'Gujarati', kn:'Kannada', ne:'Nepali', om:'Oromo', ti:'Tigrinya', wo:'Wolof', ln:'Lingala', sn:'Shona', sr:'Serbian', bg:'Bulgarian', sk:'Slovak', lv:'Latvian', et:'Estonian', be:'Belarusian', yi:'Yiddish', non:'Old Norse', arc:'Aramaic', cop:'Coptic', rom:'Romani', br:'Breton', xh:'Xhosa', lad:'Ladino', tlh:'Klingon', jbo:'Lojban', fj:'Fijian', sm:'Samoan', en_au:'English (Australian)', en_in:'English (Indian)', es_ar:'Spanish (Argentina)', ar_iq:'Arabic (Iraqi)', hak_cn:'Hakka Chinese', sux:'Sumerian', akk:'Akkadian', hit:'Hittite', nci:'Classical Nahuatl', myn:'Classical Maya', ine:'Proto-Indo-European' , zh_han:'Chinese (Han dynasty Classical)', zh_tang:'Chinese (Tang dynasty Classical)', ceb:'Cebuano', su:'Sundanese', th_isan:'Thai (Isan)', es_co:'Spanish (Colombia)', es_cl:'Spanish (Chile)', gl:'Galician', oc:'Occitan', fo:'Faroese', jam:'Jamaican Patois', pap:'Papiamento', ko_yb:'Yanbian Korean', mn_cn:'Inner Mongolian', za:'Zhuang', ii:'Yi (Nuosu)', hmn:'Hmong', mnc:'Manchu', af:'Afrikaans', az:'Azerbaijani', tg:'Tajik', gn:'Guaraní', iu:'Inuktitut', ky:'Kyrgyz', ckb:'Kurdish (Sorani)', nn:'Norwegian Nynorsk', got:'Gothic', cu:'Old Church Slavonic', pi:'Pali', pi_edu:'Pedagogical Pali (Theravada monastic)', rm:'Romansh', fy:'Frisian', sc:'Sardinian', chr:'Cherokee', or:'Odia', sd:'Sindhi', as:'Assamese', rw:'Kinyarwanda', ny:'Chewa', tk:'Turkmen', cdo:'Eastern Min', gd:'Scottish Gaelic', sl:'Slovenian', enm:'Middle English', en_em:'Early Modern English', fr_ch:'French (Swiss)', to:'Tongan', se:'Northern Sami', pau: "Palauan", sah:'Sakha', tyv:'Tuvan', kjh:'Khakas', alt:'Altai', bxr:'Buryat', evn:'Evenki', eve:'Even (Lamut)', yrk:'Nenets', kca:'Khanty', ckt:'Chukchi', niv:'Nivkh', ket:'Ket', cjy:'Jin (Shanxi)', hsn:'Xiang (Hunan)', gan:'Gan (Jiangxi)', mai:'Maithili', awa:'Awadhi', skr:'Saraiki', sat:'Santali', mad:'Madurese', hil:'Hiligaynon', bal:'Balochi', ak:'Akan (Twi)', mk:'Macedonian', lg:'Luganda', ki:'Kikuyu', tn:'Tswana', st:'Sesotho', ts:'Tsonga', ve:'Venda', bem:'Bemba', lua:'Luba-Kasai', kg:'Kikongo', ff:'Fula', bm:'Bambara', kab:'Kabyle', yua:'Yucatec Maya', tzo:'Tzotzil', mix:'Mixtec', zap:'Zapotec', ay:'Aymara', arn:'Mapudungun', cr:'Cree (Plains)', oj:'Ojibwe', lkt:'Lakota', kl:'Greenlandic', ce:'Chechen', inh:'Ingush', av:'Avar', lez:'Lezgian', dar:'Dargwa', lbe:'Lak', tab:'Tabasaran', ady:'Adyghe', kbd:'Kabardian', ab:'Abkhaz', xmf:'Mingrelian', os:'Ossetian', ty:'Tahitian', niu:'Niuean', tvl:'Tuvaluan', rap:'Rapanui', rar:'Cook Islands Māori', mh:'Marshallese', gil:'Gilbertese', ch:'Chamorro', tet:'Tetum', bi:'Bislama', pjt:'Pitjantjatjara', wbp:'Warlpiri', mni:'Meitei', new:'Newari', brx:'Bodo', lus:'Mizo', dz:'Dzongkha', min:'Minangkabau', ban:'Balinese', ace:'Acehnese', bug:'Buginese', war:'Waray', bik:'Bikol Central', tum:'Tumbuka', din:'Dinka', nus:'Nuer', luo:'Luo', mas:'Maasai', aa:'Afar', shi:'Tashelhit', rif:'Tarifit', mwr:'Marwari', bgc:'Haryanvi', ks:'Kashmiri', kok:'Konkani', mnp:'Min Bei', nan_te:'Teochew', yue_ts:'Taishanese', czh:'Hui Chinese', cnp:'Pinghua', zh_jh:'Jianghuai Mandarin', zh_tj:'Tianjin Mandarin', zh_lz:'Lanyin Mandarin', dng:'Dungan', hsb:'Upper Sorbian', csb:'Kashubian', fur:'Friulian', ast:'Asturian', an:'Aragonese', rup:'Aromanian', wa:'Walloon', udm:'Udmurt', mhr:'Meadow Mari', myv:'Erzya', krl:'Karelian', mzn:'Mazandarani', glk:'Gilaki', lrc:'Lurish', crh:'Crimean Tatar', tt:'Tatar', ba:'Bashkir', krc:'Karachay-Balkar', ksw:'Sgaw Karen', lhu:'Lahu', lis:'Lisu', nxq:'Naxi', shn:'Shan', ee:'Ewe', nyn:'Runyankole', luy:'Luhya', ssw:'Swazi', nbl:'Southern Ndebele', nso:'Northern Sotho', fan:'Fang', naq:'Nama (Khoekhoe)', hts:'Hadza', kr:'Kanuri', men:'Mende', dyu:'Dyula', syl:'Sylheti', mag:'Magahi', doi:'Dogri', xkk:'Khmu', moh:'Mohawk', cho:'Choctaw', esu:'Central Alaskan Yupik', ipk:'Inupiaq', apw:'Western Apache', dak:'Dakota', chy:'Cheyenne', lmo:'Lombard', pms:'Piedmontese', eml:'Emilian-Romagnol', mwl:'Mirandese', pnt:'Pontic Greek', hno:'Hindko', bhb:'Bhili', cja:'Cham', hmo:'Hiri Motu', pon:'Pohnpeian', vmw:'Makhuwa', dsb:'Lower Sorbian', gv:'Manx', kw:'Cornish', zza:'Zaza', brh:'Brahui', mrq:'Marquesan', tiw:'Tiwi', guc:'Wayuu', myp:'Pirahã', emp:'Northern Embera', kpe:'Kpelle', loz:'Lozi', bbc:'Toba Batak', bjn:'Banjar', sas:'Sasak', kha:'Khasi', mns:'Mansi', mrw:'Maranao', tsg:'Tausug', yap:'Yapese', chk:'Chuukese', gbm:'Garhwali', kfy:'Kumaoni', xnr:'Kangri', hr:'Croatian', bs:'Bosnian', iba:'Iban', ljp:'Lampung', tzm:'Central Atlas Tamazight', ng:'Ndonga', umb:'Umbundu', kmb:'Kimbundu', her:'Herero', xal:'Kalmyk', sg:'Sango', toi:'Tonga (Zambia)', peo:'Old Persian', ave:'Avestan', xto:'Tocharian A', txb:'Tocharian B', phn:'Phoenician', uga:'Ugaritic', xlu:'Luwian', pal:'Middle Persian (Pahlavi)', syc:'Classical Syriac', fro:'Old French', goh:'Old High German', gez:'Ge\'ez', gmy:'Mycenaean Greek', xct:'Classical Tibetan', xpu:'Punic', xhu:'Hurrian', elx:'Elamite', xsa:'Sabaean', kaw:'Old Javanese (Kawi)', kho:'Khotanese', gmh:'Middle High German', osp:'Old Spanish', okz:'Old Khmer', osx:'Old Saxon', smg:'Sukuma', mos:'Mooré', kln:'Kalenjin', mfe:'Mauritian Creole', mnk:'Mandinka', bqi:'Bakhtiari', unr:'Mundari', hoc:'Ho', enq:'Enga', xpr:'Parthian', xqa:'Karakhanid', sga:'Old Irish', bsk:'Burushaski', yag:'Yaghnobi', srn:'Sranan Tongo', kwk:'Kwak\'wala', sad:'Sandawe', pcc:'Bouyei', iuu:'Iu Mien', hui:'Huli', tkl:'Tokelauan', squ:'Squamish', mga:'Middle Irish', hbo:'Biblical Hebrew', mpt:'Mian', ygr:'Yagaria', quz:'Cusco Quechua', quy:'Ayacucho Quechua', cab:'Garifuna', crx:'Carrier', tsi:'Coast Tsimshian', wbl:'Wakhi', psi:'Pashai', bgq:'Bagri', ach:'Acholi', rki:'Rakhine', kxm:'Northern Khmer', xng:'Middle Mongol', ja_kg:'Japanese (Kagoshima)', ja_sd:'Japanese (Sendai)', ko_hg:'Korean (Hamgyong)', ko_jl:'Korean (Jeolla)', nan_pn:'Penang Hokkien', mra:'Mlabri', wuu_nb:'Ningbo Wu', yue_gz:'Gaozhou Yue', khb:'Tai Lue', pam:'Kapampangan', pag:'Pangasinan', mdh:'Maguindanao', gor:'Gorontalo', mak:'Makassarese', fon:'Fon', kri:'Krio', dag:'Dagbani', xog:'Soga', teo:'Ateso', dyo:'Jola-Fonyi', bci:'Baoulé', tcy:'Tulu', haz:'Hazaragi', tly:'Talysh', kaa:'Karakalpak', bej:'Beja', tig:'Tigre', ssy:'Saho', ewo:'Ewondo', bum:'Bulu', ndc:'Ndau', ote:'Otomi', tar:'Tarahumara', ami:'Amis', pwn:'Paiwan', tay:'Atayal', bnn:'Bunun', trv:'Truku/Seediq', tsu:'Tsou', tao:'Tao/Yami', hak_tw:'Taiwanese Hakka', wuu_sz:'Suzhou Wu', wuu_wz:'Wenzhou Wu', nan_qz:'Quanzhou Hokkien', nan_hai:'Hainanese', zh_wh:'Wuhan Mandarin', zh_zz:'Zhongyuan Mandarin', hak_hl:'Hailu Hakka', cpx:'Pu-Xian Min', mfa:'Patani Malay', mtq:'Mường', tyz:'Tày', kjp:'Pwo Karen', kac:'Jingpo (Kachin)', wbm:'Wa', ahk:'Akha', dtp:'Kadazan-Dusun', hne:"Chhattisgarhi", mnw:"Mon", grt:"Garo", nut:"Nùng", quc:"Kʼicheʼ", kek:"Qʼeqchiʼ", mam:"Mam", wal:"Wolaytta", sid:"Sidamo", tji:"Tujia", nij:"Ngaju", sda:"Toraja-Sa'dan", orv:'Old East Slavic', xsc:'Scythian', sukh:'Old Thai (Sukhothai)', xmr:'Meroitic', onw:'Old Nubian', cqu:'Classical Quechua', omc:'Mochica', chb:'Chibcha (Muisca)', oma:'Old Malay', osu:'Old Sundanese', otl:'Old Tagalog', zkt:'Khitan', juc:'Jurchen', omx:'Middle Mongolian', pyx:'Pyu', obr:'Old Burmese', occ:'Old Cham', och:'Old Chinese', ojp:'Old Japanese', vsa:'Vedic Sanskrit', txg:'Tangut', sog:'Sogdian', otk:'Old Turkic' , arq:'Arabic (Algerian)', mey:'Hassaniya Arabic', tmh:'Tamasheq (Tuareg)', azb:'South Azerbaijani', gag:'Gagauz', sma:'Southern Sámi', vro:'Võro', pjk:'Proto-Japonic-Koreanic', oko:'Old Korean (Silla)', okg:'Goguryeo', ko_gor:'Goryeo Korean', ja_chu:'Middle Japanese', pry:'Proto-Ryukyuan', lld:'Ladin', stq:'Saterland Frisian', wym:'Wymysorys', yuc:'Yuchi', kgg:'Kusunda', ota:'Ottoman Turkish', cmg:'Classical Mongolian', ett:'Etruscan', xht:'Hattic', txr:'Tartessian', roo:'Rotokas', nmn:'Taa (!Xóõ)', lbz:'Lardil', nny:'Yangkaal', kky:'Guugu Yimithirr', blc:'Nuxalk', tue:'Tuyuca', ncs:'Nicaraguan Sign Language', uby:'Ubykh', lbz_damin:'Damin (Lardil ceremonial register)'},
    ko: { es_cr:'스페인어(코스타리카)', es_hn:'스페인어', es_ni:'스페인어(니카라과)', es_sv:'스페인어(엘살바도르)', ar_jo:'요르단 아랍어', ar_ps:'팔레스타인 아랍어', fr_lu:'프랑스어', fr_cm:'카메룬 프랑스어', de_lu:'독일어(룩셈부르크)', en_ng2:'영어 (가나)', pt_mo:'마카오 포르투갈어', lb:'룩셈부르크어', gcr:'기아나 크리올', acf:'세인트루시아 크레올어',  gan_yc:'간 중국어 (이춘 방언)', gan_ja:'간어 (지안방언)', gan_fz:'푸저우 간어', cjy_lv:'여량 진어', cjy_xz:'진어 (신주 방언)', hsn_hy:'형양상어', hsn_yz:'샹어(영주 방언)', czh_wy:'후이어(우위안)',  bla:'블랙풋어', hop:'호피어', com:'코만치어', one:'오나이다어', ono:'오논다가어', win:'호청크어', cro:'크로우어', hai:'하이다어', cic:'치카소어', ik:'이누피아크어', na:'나우루어', luz:'북부 루리어', es_bo:'스페인어(볼리비아)', es_py:'파라과이 스페인어', es_pa:'파나마 스페인어', en_my:'영어(말레이시아)', pt_gw:'기니비사우 크레올어', tsz:'푸레페차어', nez:'네즈 퍼스어', nv2:'서부 아파치어', woe:'울레아이어', pmt:'투아모투안어', bin:'에도어', khw:'호와르어',  xav:'샤반테어', ter:'테레나어', bor:'보로로어', trn:'트리니타리오 모헤뇨어', ake:'아카와이오어', aoc:'페몬어', gun:'음비아 과라니어',  zdj:'코모로어(시코모리)', ayl:'리비아 아랍어', abv:'바흐라니 아랍어', afb:'걸프 아랍어', acw:'오만 아랍어', swb:'마오레어',  adx:'암도 티베트어', qxs:'남부 강어', duu:'드룽어', jya:'시투 르갈롱어', ers:'에르수어', bca:'중앙바이어', atb:'자이와어', prk:'파라우크 와어', slr:'살라르어', ybe:'서부 유구르어', yuy:'동유구르어', mjg:'몽골어', sce:'동향어', peh:'보난어', bua:'부랴트어', cjs:'쇼르어', dlg:'돌간어', kdt:'쿠이어', blk:'파오 언어', njo:'아오 나가어', srb:'소라어', kjg:'크무어', mro:'므루어', gon:'곤디어', bfq:'바다가어', som:'소말리어', har:'하라리어',  es_pr:'스페인어(푸에르토리코)', es_do:'스페인어(도미니카공화국)', es_gt:'스페인어（과테말라）', es_ec:'스페인어(에콰도르)', es_uy:'스페인어(우루과이)', ar_sy:'아랍어(시리아)', ar_ye:'아랍어(예멘)', ar_dz:'아랍어(알제리 방언)', ar_sa:'아랍어(사우디아라비아)', ar_lb:'아랍어(레바논)', en_wls:'영어(웨일스)', en_jam:'영어(자메이카)', en_ng:'영어(나이지리아)', en_ph:'영어(필리핀)', en_ke:'영어(케냐)', fr_sn:'프랑스어(세네갈)', fr_ci:'프랑스어(코트디부아르)', fr_ht:'프랑스어(아이티)', pt_mz:'포르투갈어(모잠비크)', pt_cv:'포르투갈어（카보베르데）',  nl_be:'네덜란드어(벨기에)', en_us:'영어(미국)', en_ca:'영어(캐나다)', en_za:'영어(남아프리카)', de_ch:'독일어(스위스)', pt_ao:'undefined(앙골라)', es_ve:'undefined(베네수엘라)', ca_va:'발렌시아어',  nan_pera:'프라나칸 호키엔', zh_th:'태국 화교 표준중국어', zh_tw:'타이완 화어', nan_th:'태국 화교 차오저우어', zh_us:'미국 화교 표준중국어', yue_us:'미국 화교 광둥어', dng:'둥간어', ko_hun:'한자훈 (새김)', ja_kun:'훈독 (일본 고유어)', phm:'원시 묘요어', pmgl:'원시 몽골어', ptai:'원시 타이어', paa:'원시 오스트로아시아어', ptung:'원시 퉁구스어', pja:'원시 일본어', pko:'원시 한국어', ptb:'원시 티베트-버마어', pst:'원시 한장어', ko_zai:'재일 한국・조선인 한자음', bo_sino:'현대 티베트어 한자음', vi_ohan:'고대 한월음', ja_ojp:'상대 일본 한자음', ko_mid:'중세 한국어', sjo:'시버어', nan_id:'인도네시아 호키엔', nan_my:'말레이시아 호키엔', nan_sg:'싱가포르 호키엔', yue_mo:'마카오 광둥어', yue_hk:'홍콩 광둥어', zh_phagspa:'원대 한어 (八思巴字)', zh_yuan:'원대 관화 (中原音韻)', bca:'바이어(중부)', ja:'일본어(표준)', ja_osa:'일본어(오사카)', ja_aom:'일본어(아오모리)', ja_oki:'오키나와어', ja_hak:'일본어(하카타)', ja_edo: "일본어(에도 시대)", ja_kanbun:'한문훈독', ko:'한국어(표준)', ko_kp: "조선말(문화어)", ko_bus:'한국어(부산)', zh:'중국어(보통화)', yue:'광둥어', nan:'대만어', wuu:'상하이 우어', zh_song:'중국어(송명문언)', zh_wenyan_edu:'문언문(광동음)', vi:'북부 베트남어', vi_c:'중부 베트남어', vi_s:'남부 베트남어', vi_nom:'베트남어(쯔놈)', vi_han:'베트남 한문(한월음)', th:'태국어', id:'인도네시아어', sa:'산스크리트어', sa_edu:'현대 회화 산스크리트어', hi:'힌디어', en:'영어', en_aave:'영어(AAVE)', en_south:'영어(미국 남부)', en_app:'영어(애팔래치아)', en_ie:'영어(아일랜드)', en_sco:'영어(스코틀랜드)', en_yk:'영어(요크셔)', en_ck:'영어(코크니)', de:'독일어', de_lut:'초기 신고지 독일어(루터 시대)', fr:'프랑스어', fr_class:'고전 프랑스어(17세기)', it:'이탈리아어', it_dan:'이탈리아어(단테 시대)', es_eu:'스페인어(유럽)', es_sgl:'황금세기 스페인어', es_mx:'스페인어(멕시코)', pt_eu:'포르투갈어(유럽)', pt_br:'포르투갈어(브라질)', la:'라틴어', ru:'러시아어', uk:'우크라이나어', ar:'아랍어(푸스하)', ar_qur:'쿠란 아랍어', ar_eg:'아랍어(이집트 방언)', he:'히브리어', he_mis:'미슈나 히브리어', sw:'스와힐리어', tr:'튀르키예어', fa:'페르시아어', fa_clas:'페르시아어(고전)', tl:'타갈로그어', ga:'아일랜드어', eu:'바스크어', mn:'몽골어', my:'미얀마어', am:'암하라어', egy:'고대 이집트어', ta:'타밀어', hu:'헝가리어', nl:'네덜란드어', pl:'폴란드어', ms:'말레이어', mg:'말라가시어', cy:'웨일스어', fi:'핀란드어', ain:'아이누어', bn:'벵골어', ur:'우르두어', te:'텔루구어', jv:'자와어', ko_jeju:'제주어', ko_em: "한국어(근세)", ka:'조지아어', el:'그리스어', el_grc:'그리스어(고대)', el_kath:'그리스어(카타레부사)', nv:'나바호어', qu:'케추아어', mi:'마오리어', haw:'하와이어', km:'크메르어', lo:'라오어', yo:'요루바어', zu:'줄루어', bo:'티베트어', xct_litpr:'불전 송경 고전 티베트어', hy:'아르메니아어', hy_grab:'고전 아르메니아어(그라바르)' , ja_kyo:'일본어(교토)', ja_hir:'일본어(히로시마)', ja_mvi:'미야코어', ja_rys:'야에야마어', ar_lev:'아랍어(레반트 방언)', ar_ma:'아랍어(모로코 방언)', ar_gulf:'아랍어(걸프 방언)', zh_sc:'쓰촨 관화', zh_db:'동북 관화', nap:'나폴리어', scn:'시칠리아어', de_gsw:'독일어(스위스)', fr_qc:'프랑스어(퀘벡)', sco:'스코트어', en_sg:'영어(싱가포르)', hwc:'하와이 크레올', pcm:'나이지리아 피진', tpi:'토크 피신', en_ang:'고대 영어', sv:'스웨덴어', no:'노르웨이어', si:'싱할라어', ro:'루마니아어', cs:'체코어', ca:'카탈루냐어', da:'덴마크어', is:'아이슬란드어', lt:'리투아니아어', sq:'알바니아어', mt:'몰타어', so:'소말리어', ml:'말라얄람어', pa:'펀자브어', ku:'쿠르드어', ug:'위구르어', kk:'카자흐어', ha:'하우사어', ig:'이그보어', eo:'에스페란토', tok:'토키포나', ht:'아이티 크레올', ps:'파슈토어', uz:'우즈베크어', mr:'마라티어', gu:'구자라트어', kn:'칸나다어', ne:'네팔어', om:'오로모어', ti:'티그리냐어', wo:'월로프어', ln:'링갈라어', sn:'쇼나어', sr:'세르비아어', bg:'불가리아어', sk:'슬로바키아어', lv:'라트비아어', et:'에스토니아어', be:'벨라루스어', yi:'이디시어', non:'고대 노르드어', arc:'아람어', cop:'콥트어', rom:'로마니어', br:'브르타뉴어', xh:'코사어', lad:'라디노어', tlh:'클링온어', jbo:'로지반', fj:'피지어', sm:'사모아어' , zh_han:'중국어(한대 한문)', zh_tang:'중국어(당대 한문)', ceb:'세부아노어', su:'순다어', th_isan:'태국어(이산 방언)', es_co:'스페인어(콜롬비아)', es_cl:'스페인어(칠레)', gl:'갈리시아어', oc:'오크어', fo:'페로어', jam:'자메이카 파트와', pap:'파피아멘토어', ko_yb:'연변조선어', mn_cn:'내몽골몽골어', za:'좡어', ii:'이어', hmn:'먀오어', mnc:'만주어', af:'아프리칸스어', az:'아제르바이잔어', tg:'타지크어', gn:'과라니어', iu:'이누크티투트어', ky:'키르기스어', ckb:'쿠르드어(소라니)', nn: "노르웨이어(뉘노르스크)", got:'고트어', cu:'고대 교회 슬라브어', pi:'팔리어', pi_edu:'교학 팔리어(상좌부 사원)', rm:'로만슈어', fy:'프리지아어', sc:'사르데냐어', chr:'체로키어', or:'오디아어', sd:'신디어', as:'아삼어', rw:'킨야르완다어', ny:'체와어', tk:'투르크멘어', cdo:'민동어', gd: "스코틀랜드 게일어", sl: "슬로베니아어", enm: "중세 영어", en_em:'초기 근대 영어', fr_ch: "프랑스어(스위스)", to: "통가어", se: "북부 사미어", af: "아프리칸스어", akk: "아카드어", as: "아삼어", az: "아제르바이잔어", chr: "체로키어", ckb: "쿠르드어 (소라니)", cu: "고대 교회 슬라브어", de_at: "독일어(오스트리아)", de_by: "독일어(바이에른)", es_an: "스페인어(안달루시아)", es_cu: "스페인어(쿠바)", es_pe: "스페인어(페루)", fr_af: "프랑스어(아프리카)", fr_be: "프랑스어(벨기에)", fy: "프리지아어", gn: "과라니어", got: "고트어", hit: "히타이트어", hmn: "몽어", ii: "이어 (누오수)", ilo: "일로카노어", ine: "인도유럽조어", iu: "이누크티투트어", ja_heian: "일본어(헤이안 시대)", ky: "키르기스어", mnc: "만주어", myn: "고전 마야어", nci: "고전 나와틀어", nds: "저지 독일어", nn: "노르웨이어 (뉘노르스크)", ny: "체와어", or: "오리야어", pi: "팔리어", rm: "로망슈어", rw: "키냐르완다어", sc: "사르데냐어", sd: "신디어", sux: "수메르어", tg: "타지크어", tk: "투르크멘어", vec: "베네토어", za: "좡어", bho: "보지푸리어", th_s: "태국어(남부)", th_n: "태국어(북부)", ar_sd: "아랍어(수단)", ar_tn: "아랍어(튀니지)", en_au: "영어(호주)", en_in: "영어(인도)", es_ar: "스페인어(아르헨티나)", ar_iq: "아랍어(이라크)", hak_cn: "하카어", pau: "팔라우어", sah:'사하어', tyv:'투바어', kjh:'하카스어', alt:'알타이어', bxr:'부랴트어', evn:'에벤키어', eve:'에벤어', yrk:'네네츠어', kca:'한티어', ckt:'추크치어', niv:'니브흐어', ket:'케트어', cjy:'진어', hsn:'상어', gan:'간어', mai:'마이틸리어', awa:'아와디어', skr:'사라이키어', sat:'산탈리어', mad:'마두라어', hil:'일롱고어', bal:'발루치어', ak:'아칸어(트위)', mk:'마케도니아어', lg:'루간다어', ki:'키쿠유어', tn:'츠와나어', st:'남부 소토어', ts:'총가어', ve:'벤다어', bem:'벰바어', lua:'루바카사이어', kg:'콩고어', ff:'풀라어', bm:'밤바라어', kab:'카빌어', yua:'유카테크 마야어', tzo:'초칠어', mix:'미스텍어', zap:'사포텍어', ay:'아이마라어', arn:'마푸체어', cr:'크리어(평원)', oj:'오지브웨어', lkt:'라코타어', kl:'그린란드어', ce:'체첸어', inh:'잉구시어', av:'아바르어', lez:'레즈긴어', dar:'다르긴어', lbe:'라크어', tab:'타바사란어', ady:'아디게어', kbd:'카바르드어', ab:'압하스어', xmf:'메그렐어', os:'오세트어', ty:'타히티어', niu:'니우에어', tvl:'투발루어', rap:'라파누이어', rar:'쿡 제도 마오리어', mh:'마셜어', gil:'키리바스어', ch:'차모로어', tet:'테툼어', bi:'비슬라마', pjt:'피찬차차라어', wbp:'왈피리어', mni:'메이테이어', new:'네와르어', brx:'보도어', lus:'미조어', dz:'종카어', min:'미낭카바우어', ban:'발리어', ace:'아체어', bug:'부기스어', war:'와라이어', bik:'비콜어(중부)', tum:'툼부카어', din:'딩카어', nus:'누에르어', luo:'루오어', mas:'마사이어', aa:'아파르어', shi:'타셸히트어', rif:'리피아어', mwr:'마르와리어', bgc:'하리야나어', ks:'카슈미르어', kok:'콘칸어', mnp:'민북어', nan_te:'차오저우어', yue_ts:'타이산어', czh:'후이저우어', cnp:'평화', zh_jh:'강회 관화', zh_tj:'톈진 관화', zh_lz:'난인 관화', dng:'둥간어', hsb:'상소르브어', csb:'카슈비아어', fur:'프리울리어', ast:'아스투리아스어', an:'아라곤어', rup:'아루마니아어', wa:'왈론어', udm:'우드무르트어', mhr:'마리어(평원)', myv:'에르자어', krl:'카렐리야어', mzn:'마잔다란어', glk:'길란어', lrc:'루리어', crh:'크림 타타르어', tt:'타타르어', ba:'바시키르어', krc:'카라차이-발카르어', ksw:'스가우 카렌어', lhu:'라후어', lis:'리수어', nxq:'나시어', shn:'샨어', ee:'에웨어', nyn:'룬얀콜어', luy:'루히야어', ssw:'스와지어', nbl:'남부 은데벨레어', nso:'북부 소토어', fan:'팡어', naq:'나마어(코에코에)', hts:'하자어', kr:'카누리어', men:'멘데어', dyu:'줄라어', syl:'실레티어', mag:'마가히어', doi:'도그리어', xkk:'크무어', moh:'모호크어', cho:'촉토어', esu:'중부 알래스카 유픽어', ipk:'이누피아크어', apw:'서부 아파치어', dak:'다코타어', chy:'샤이엔어', lmo:'롬바르드어', pms:'피에몬테어', eml:'에밀리아-로마냐어', mwl:'미란데스어', pnt:'폰틱 그리스어', hno:'힌드코어', bhb:'빌리어', cja:'참어', hmo:'히리 모투', pon:'폰페이어', vmw:'마쿠아어', dsb:'하소르브어', gv:'맨섬어', kw:'콘월어', zza:'자자어', brh:'브라후이어', mrq:'마르키즈어', tiw:'티위어', guc:'와유어', myp:'피라항어', emp:'북부 엠베라어', kpe:'크펠레어', loz:'로지어', bbc:'토바 바탁어', bjn:'반자르어', sas:'사사크어', kha:'카시어', mns:'만시어', mrw:'마라나오어', tsg:'타우수그어', yap:'야프어', chk:'추크어', gbm:'가르왈어', kfy:'쿠마온어', xnr:'캉그리어', hr:'크로아티아어', bs:'보스니아어', iba:'이반어', ljp:'람풍어', tzm:'중부 아틀라스 타마지트어', ng:'은동가어', umb:'움분두어', kmb:'킴분두어', her:'헤레로어', xal:'칼미크어', sg:'상고어', toi:'통가어(잠비아)', peo:'고대 페르시아어', ave:'아베스타어', xto:'토하라어 A', txb:'토하라어 B', phn:'페니키아어', uga:'우가리트어', xlu:'루위어', pal:'중세 페르시아어', syc:'고전 시리아어', fro:'고대 프랑스어', goh:'고대 고지 독일어', gez:'그으즈어', gmy:'미케네 그리스어', xct:'고전 티베트어', xpu:'포에니어', xhu:'후르리어', elx:'엘람어', xsa:'사바어', kaw:'고대 자와어(카위)', kho:'호탄어', gmh:'중세 고지 독일어', osp:'고대 스페인어', okz:'고대 크메르어', osx:'고대 작센어', smg:'수쿠마어', mos:'모레어', kln:'칼렌진어', mfe:'모리셔스 크리올', mnk:'만딩카어', bqi:'바흐티야리어', unr:'문다리어', hoc:'호어', enq:'엥가어', xpr:'파르티아어', xqa:'카라한어', sga:'고대 아일랜드어', bsk:'부루샤스키어', yag:'야그노비어', srn:'스리난 통고어', kwk:'쿠와키우틀어', sad:'산다웨어', pcc:'부이어', iuu:'이우 미엔어', hui:'훌리어', tkl:'토켈라우어', squ:'스쿼미시어', mga:'중세 아일랜드어', hbo:'성서 히브리어', mpt:'미안어', ygr:'야가리아어', quz:'쿠스코 케추아어', quy:'아야쿠초 케추아어', cab:'가리푸나어', crx:'캐리어어', tsi:'코스트 츠임시안어', wbl:'와히어', psi:'파샤이어', bgq:'바그리어', ach:'아촐리어', rki:'라카인어', kxm:'북부 크메르어', xng:'중세 몽골어', ja_kg:'일본어(가고시마)', ja_sd:'일본어(센다이)', ko_hg:'한국어(함경)', ko_jl:'한국어(전라)', nan_pn:'페낭 호키엔어', mra:'믈라브리어', wuu_nb:'닝보 우어', yue_gz:'가오저우 월어', khb:'타이 르어', pam:'카팜팡안어', pag:'팡가시난어', mdh:'마긴다나오어', gor:'고론탈로어', mak:'마카사르어', fon:'폰어 (Fon)', kri:'크리오어', dag:'다그바니어', xog:'소가어', teo:'아테소어', dyo:'졸라-포니어', bci:'바울레어', tcy:'툴루어', haz:'하자라기어', tly:'탈리시어', kaa:'카라칼파크어', bej:'베자어', tig:'티그레어', ssy:'사호어', ewo:'에원도어', bum:'불루어', ndc:'은다우어', ote:'오토미어', tar:'타라우마라어', och:'상고 한어', ojp:'상대 일본어', vsa:'베다 산스크리트어', txg:'서하어 (탕구트)', sog:'소그드어', otk:'고대 튀르크어', zkt:'거란어', juc:'여진어', omx:'고대 몬어', pyx:'퓨족어 (驃族語)', obr:'고대 버마어', occ:'고대 참어', orv:'고대 동슬라브어', xsc:'스키타이어', sukh:'고대 타이어 (수코타이)', xmr:'메로에어', onw:'고대 누비아어', cqu:'고전 케추아어', omc:'모치카어', chb:'치브차어 (무이스카)', oma:'고대 말레이어', osu:'고대 순다어', otl:'고대 타갈로그어', ami:'아미스어', pwn:'파이완어', tay:'아타얄어', bnn:'부눈어', trv:'타로코어', tsu:'쩌우어', tao:'타오어(야미)', hak_tw:'대만 객가어', wuu_sz:'쑤저우 우어', wuu_wz:'원저우 우어', nan_qz:'취안저우 민난어', nan_hai:'하이난어', zh_wh:'우한 관화', zh_zz:'중원관화', hak_hl:'하이루 객가어', cpx:'푸셴 민어', mfa:'파타니 말레이어', mtq:'므엉어', tyz:'타이어(베트남)', kjp:'프오 카렌어', kac:'징포어(카친)', wbm:'와족어 (Wa)', ahk:'아카어', dtp:'카다잔두순어', hne:"차티스가리어", mnw:"몬어", grt:"가로어", nut:"눙어", quc:"키체어", kek:"케크치어", mam:"맘어 (Mam)", wal:"월라이타어", sid:"시다모어", tji:"토자어", nij:"응아주어", sda:"사단 토라자어", arq:'알제리 아랍어', mey:'핫사니야 아랍어', tmh:'타마셰크어 (투아레그)', azb:'남아제르바이잔어', gag:'가가우즈어', sma:'남사미어', vro:'보로어', pjk:'일본어-한국어 조어', oko:'고대 한국어(신라)', okg:'고구려어', ko_gor:'고려어', ja_chu:'중세 일본어', pry:'류큐 조어', lld:'라딘어', stq:'자터란트 프리지아어', wym:'비미소리스어', yuc:'유치어', kgg:'쿠순다어', ota:'오스만 튀르크어', cmg:'고전 몽골어', ett:'에트루리아어', xht:'하티어', txr:'타르테소스어', roo:'로토카스어', nmn:'타아어', lbz:'라르딜어', nny:'얀카르어', kky:'구구 이미티르어', blc:'누할크어', tue:'투유카어', ncs:'니카라과 수어', uby:'우비흐어', lbz_damin:'다민 (라르딜 의례 화계)'},
    zh: { es_cr:'西班牙语(哥斯达黎加)', es_hn:'西班牙语', es_ni:'西班牙语(尼加拉瓜)', es_sv:'西班牙语（萨尔瓦多）', ar_jo:'约旦阿拉伯语', ar_ps:'巴勒斯坦阿拉伯语', fr_lu:'法语', fr_cm:'喀麦隆法语', de_lu:'德语(卢森堡)', en_ng2:'英语（加纳）', pt_mo:'澳式葡文', lb:'卢森堡语', gcr:'法属圭亚那克里奥尔语', acf:'圣卢西亚克里奥尔语',  gan_yc:'赣语宜春方言', gan_ja:'吉安赣语', gan_fz:'赣语（抚州方言）', cjy_lv:'吕梁晋语', cjy_xz:'晋语（忻州方言）', hsn_hy:'衡陽湘語', hsn_yz:'湘语（永州片）', czh_wy:'徽语（婺源）',  bla:'黑脚语', hop:'霍皮语', com:'科曼切语', one:'奥奈达语', ono:'翁农达加语', win:'何邦克语', cro:'克罗语', hai:'海达语', cic:'奇卡索语', ik:'伊努皮亚克语', na:'瑙鲁语', luz:'北部卢里语', es_bo:'西班牙语(玻利维亚)', es_py:'巴拉圭西班牙语', es_pa:'巴拿马西班牙语', en_my:'英语(马来西亚)', pt_gw:'几内亚比绍克里奥尔语', tsz:'普雷佩查语', nez:'尼兹珀斯语', nv2:'西阿帕奇语', woe:'沃莱艾语', pmt:'图阿莫图语', bin:'埃多语', khw:'科瓦尔语',  xav:'夏万特语', ter:'特雷纳语', bor:'波罗罗语', trn:'特立尼塔里奥莫赫尼奥语', ake:'阿卡瓦约语', aoc:'佩蒙语', gun:'姆比亚瓜拉尼语',  zdj:'科摩罗语（希科莫里语）', ayl:'利比亚阿拉伯语', abv:'巴林阿拉伯语', afb:'海湾阿拉伯语', acw:'阿曼阿拉伯语', swb:'毛里科摩里语',  adx:'安多方言', qxs:'南川羌语', duu:'独龙语', jya:'四土嘉绒语', ers:'尔苏语', bca:'中央白语', atb:'载瓦语', prk:'巴饶克佤语', slr:'撒拉语', ybe:'西裕固语', yuy:'东裕固语', mjg:'土族语', sce:'东乡语', peh:'保安语', bua:'布里亚特语', cjs:'肖尔语', dlg:'多尔干语', kdt:'克罗语', blk:'帕欧语', njo:'敖人语', srb:'索拉语', kjg:'克木语', mro:'姆鲁语', gon:'贡德语', bfq:'巴达加语', som:'索马里语', har:'哈拉里语',  es_pr:'西班牙语(波多黎各)', es_do:'西班牙语(多米尼加共和国)', es_gt:'西班牙语（危地马拉）', es_ec:'西班牙语(厄瓜多尔)', es_uy:'西班牙语(乌拉圭)', ar_sy:'阿拉伯语(叙利亚)', ar_ye:'阿拉伯语(也门方言)', ar_dz:'阿拉伯语(阿尔及利亚方言)', ar_sa:'阿拉伯语(沙特阿拉伯)', ar_lb:'阿拉伯语(黎巴嫩)', en_wls:'英语(威尔士)', en_jam:'英语(牙买加)', en_ng:'英语(尼日利亚)', en_ph:'英语(菲律宾)', en_ke:'英语(肯尼亚)', fr_sn:'法语(塞内加尔)', fr_ci:'法语(科特迪瓦)', fr_ht:'法语（海地）', pt_mz:'葡萄牙语(莫桑比克)', pt_cv:'葡萄牙語（佛得角）',  nl_be:'荷兰语(比利时)', en_us:'英语(米国)', en_ca:'英语(加拿大)', en_za:'英语(南非)', de_ch:'德语(瑞士)', pt_ao:'undefined(安哥拉)', es_ve:'undefined(委内瑞拉)', ca_va:'巴伦西亚语',  nan_pera:'峡海华人福建话(Baba)', zh_th:'泰国华人普通话', zh_tw:'台灣華語', nan_th:'泰国华人潮州话', zh_us:'美籍华人普通话', yue_us:'美籍华人粤语', dng:'东干语', ko_hun:'韩国语训 (固有词)', ja_kun:'训读 (日本固有词)', phm:'原始苗瑶语', pmgl:'原始蒙古语', ptai:'原始台语', paa:'原始南亚语', ptung:'原始通古斯语', pja:'原始日语', pko:'原始韩语', ptb:'原始藏缅语', pst:'原始汉藏语', ko_zai:'在日韩国・朝鲜人汉字音', bo_sino:'现代藏语汉字音', vi_ohan:'古汉越音', ja_ojp:'上代日本汉字音', ko_mid:'中世韩国语', sjo:'锡伯语', nan_id:'印尼福建话 (棉兰)', nan_my:'马来西亚福建话', nan_sg:'新加坡福建话', yue_mo:'澳门粤语', yue_hk:'香港粤语', zh_phagspa:'元代汉语 (八思巴字)', zh_yuan:'元代官话 (中原音韵)', bca:'白语(中部)', ja:'日语(标准)', ja_osa:'日语(大阪)', ja_aom:'日语(青森)', ja_oki:'冲绳语', ja_hak:'日语(博多)', ja_edo: "日语(江户时代)", ja_kanbun:'日式汉文训读', ja_heian: "日语(平安时代)", ko:'韩语(标准)', ko_kp: "朝鲜语(文化语)", ko_bus:'韩语(釜山)', zh:'中文(普通话)', yue:'粤语', nan:'台湾话', wuu:'上海吴语', zh_song: "中文(宋明文言)", zh_wenyan_edu:'文言文(粵音)', vi:'北部越南语', vi_c:'中部越南语', vi_s:'南部越南语', vi_nom:'越南语(字喃)', vi_han:'越南漢文(漢越音)', th:'泰语', id:'印尼语', sa:'梵语', sa_edu:'现代口语梵语', hi:'印地语', en:'英语', en_aave:'英语(AAVE)', en_south:'英语(美国南方)', en_app:'英语(阿巴拉契亚)', en_ie:'英语(爱尔兰)', en_sco:'英语(苏格兰)', en_yk:'英语(约克郡)', en_ck:'英语(伦敦东区)', de:'德语', de_lut:'初期新高地德语(路德时代)', fr:'法语', fr_class:'古典法语(17世纪)', it:'意大利语', it_dan:'意大利语(但丁时代)', es_eu:'西班牙语(欧洲)', es_sgl:'黄金世纪西班牙语', es_mx:'西班牙语(墨西哥)', pt_eu:'葡萄牙语(欧洲)', pt_br:'葡萄牙语(巴西)', la:'拉丁语', ru:'俄语', uk:'乌克兰语', ar:'阿拉伯语(标准)', ar_qur:'古兰阿拉伯语', ar_eg:'阿拉伯语(埃及方言)', he:'希伯来语', he_mis:'米示拿希伯来语', sw:'斯瓦希里语', tr:'土耳其语', fa:'波斯语', fa_clas:'波斯语(古典)', tl:'他加禄语', ga:'爱尔兰语', eu:'巴斯克语', mn:'蒙古语', my:'缅甸语', am:'阿姆哈拉语', egy:'古埃及语', ta:'泰米尔语', hu:'匈牙利语', nl:'荷兰语', pl:'波兰语', ms:'马来语', mg:'马达加斯加语', cy:'威尔士语', fi:'芬兰语', ain:'阿伊努语', bn:'孟加拉语', ur:'乌尔都语', te:'泰卢固语', jv:'爪哇语', ko_jeju:'济州语', ko_em: "韩语(近世)", ka:'格鲁吉亚语', el:'希腊语', el_grc:'希腊语(古代)', el_kath:'希腊语(卡萨雷沃沙)', nv:'纳瓦霍语', qu:'克丘亚语', mi:'毛利语', haw:'夏威夷语', km:'高棉语', lo:'老挝语', yo:'约鲁巴语', zu:'祖鲁语', bo:'藏语', xct_litpr:'佛典诵念古典藏语', hy:'亚美尼亚语', hy_grab:'古典亚美尼亚语(格拉巴尔)', ilo:'伊洛卡诺语', bho:'博杰普尔语', th_s:'泰语(南部)', th_n:'泰语(北部)', vec:'威尼斯语', nds:'低地德语', de_by:'德语(巴伐利亚)', de_at:'德语(奥地利)', fr_be:'法语(比利时)', fr_af:'法语(非洲)', es_an:'西班牙语(安达卢西亚)', es_pe:'西班牙语(秘鲁)', es_cu:'西班牙语(古巴)', ar_sd:'阿拉伯语(苏丹方言)', ar_tn:'阿拉伯语(突尼斯方言)' , ja_kyo:'日语(京都)', ja_hir:'日语(广岛)', ja_mvi:'宫古语', ja_rys:'八重山语', ar_lev:'阿拉伯语(黎凡特方言)', ar_ma:'阿拉伯语(摩洛哥方言)', ar_gulf:'阿拉伯语(海湾方言)', zh_sc:'四川官话', zh_db:'东北官话', nap:'那不勒斯语', scn:'西西里语', de_gsw:'德语(瑞士)', fr_qc:'法语(魁北克)', sco:'苏格兰语', en_sg:'英语(新加坡)', hwc:'夏威夷克里奥尔', pcm:'尼日利亚皮钦语', tpi:'托克皮辛', en_ang:'古英语', sv:'瑞典语', no:'挪威语', si:'僧伽罗语', ro:'罗马尼亚语', cs:'捷克语', ca:'加泰罗尼亚语', da:'丹麦语', is:'冰岛语', lt:'立陶宛语', sq:'阿尔巴尼亚语', mt:'马耳他语', so:'索马里语', ml:'马拉雅拉姆语', pa:'旁遮普语', ku:'库尔德语', ug:'维吾尔语', kk:'哈萨克语', ha:'豪萨语', ig:'伊博语', eo:'世界语', tok:'道本语', ht:'海地克里奥尔语', ps:'普什图语', uz:'乌兹别克语', mr:'马拉地语', gu:'古吉拉特语', kn:'卡纳达语', ne:'尼泊尔语', om:'奥罗莫语', ti:'提格利尼亚语', wo:'沃洛夫语', ln:'林加拉语', sn:'绍纳语', sr:'塞尔维亚语', bg:'保加利亚语', sk:'斯洛伐克语', lv:'拉脱维亚语', et:'爱沙尼亚语', be:'白俄罗斯语', yi:'意第绪语', non:'古诺尔斯语', arc:'阿拉米语', cop:'科普特语', rom:'罗姆语', br:'布列塔尼语', xh:'科萨语', lad:'拉迪诺语', tlh:'克林贡语', jbo:'逻辑语', fj:'斐济语', sm:'萨摩亚语', en_au:'英语(澳大利亚)', en_in:'英语(印度)', es_ar:'西班牙语(阿根廷)', ar_iq:'阿拉伯语(伊拉克方言)', hak_cn:'客家话', sux:'苏美尔语', akk:'阿卡德语', hit:'赫梯语', nci:'古典纳瓦特尔语', myn:'古典玛雅语', ine:'原始印欧语' , zh_han:'中文(汉代汉文)', zh_tang:'中文(唐代汉文)', ceb:'宿雾语', su:'巽他语', th_isan:'泰语(伊桑方言)', es_co:'西班牙语(哥伦比亚)', es_cl:'西班牙语(智利)', gl:'加利西亚语', oc:'奥克语', fo:'法罗语', jam:'牙买加帕特瓦', pap:'帕皮阿门托语', ko_yb: "朝鲜语(延边)", mn_cn:'内蒙古蒙古语', za:'壮语', ii:'彝语', hmn:'苗语', mnc:'满语', af:'南非荷兰语', az:'阿塞拜疆语', tg:'塔吉克语', gn:'瓜拉尼语', iu:'因纽特语', ky:'吉尔吉斯语', ckb:'库尔德语(索拉尼)', nn:'挪威语(尼诺斯克)', got:'哥特语', cu:'古教会斯拉夫语', pi:'巴利语', pi_edu:'教学巴利语(上座部)', rm:'罗曼什语', fy:'弗里斯兰语', sc:'撒丁语', chr:'切罗基语', or:'奥里亚语', sd:'信德语', as:'阿萨姆语', rw:'卢旺达语', ny:'齐切瓦语', tk:'土库曼语', cdo:'闽东语', gd: "苏格兰盖尔语", sl: "斯洛文尼亚语", enm: "中古英语", en_em:'早期现代英语', fr_ch: "法语(瑞士)", to: "汤加语", se: "北萨米语", pau: "帕劳语", sah: '萨哈语', tyv: '图瓦语', kjh: '哈卡斯语', alt: '阿尔泰语', bxr: '布里亚特语', evn: '埃文基语', eve: '埃文语', yrk: '涅涅茨语', kca: '汉特语', ckt: '楚科奇语', niv: '尼夫赫语', ket: '凯特语', cjy: '晋语', hsn: '湘语', gan: '赣语', mai: '迈蒂利语', awa: '阿瓦德语', skr: '西莱基语', sat: '桑塔利语', mad: '马都拉语', hil: '希利盖农语', bal: '俾路支语', ak: '阿坎语 (契维)', mk: '马其顿语', lg: '卢干达语', ki: '基库尤语', tn: '茨瓦纳语', st: '塞索托语', ts: '聪加语', ve: '文达语', bem: '本巴语', lua: '卢巴-卡赛语', kg: '刚果语', ff: '富拉语', bm: '班巴拉语', kab: '卡比尔语', yua: '尤卡坦玛雅语', tzo: '措齐尔语', mix: '米斯特克语', zap: '萨波特克语', ay: '艾马拉语', arn: '马普切语', cr: '克里语 (平原)', oj: '奥吉布瓦语', lkt: '拉科塔语', kl: '格陵兰语', ce: '车臣语', inh: '印古什语', av: '阿瓦尔语', lez: '列兹金语', dar: '达尔金语', lbe: '拉克语', tab: '塔巴萨兰语', ady: '阿迪格语', kbd: '卡巴尔达语', ab: '阿布哈兹语', xmf: '明格列尔语', os: '奥塞梯语', ty: '塔希提语', niu: '纽埃语', tvl: '图瓦卢语', rap: '拉帕努伊语', rar: '库克群岛毛利语', mh: '马绍尔语', gil: '基里巴斯语', ch: '查莫罗语', tet: '德顿语', bi: '比斯拉马语', pjt: '皮詹查查拉语', wbp: '瓦尔皮里语', mni: '曼尼普尔语', new: '尼瓦尔语', brx: '波多语', lus: '米佐语', dz: '宗喀语', min: '米南加保语', ban: '巴厘语', ace: '亚齐语', bug: '布吉语', war: '瓦雷语', bik: '中部比科尔语', tum: '通布卡语', din: '丁卡语', nus: '努尔语', luo: '卢奥语', mas: '马赛语', aa: '阿法尔语', shi: '塔谢勒希特语', rif: '塔里菲特语', mwr: '马尔瓦里语', bgc: '哈里亚纳语', ks: '克什米尔语', kok: '贡根语', mnp: '闽北语', nan_te: '潮州话', yue_ts: '台山话', czh: '徽州语', cnp: '平话', zh_jh: '江淮官话', zh_tj: '天津官话', zh_lz: '兰银官话', dng: '东干语', hsb: '上索布语', csb: '卡舒比语', fur: '弗留利语', ast: '阿斯图里亚斯语', an: '阿拉贡语', rup: '阿罗马尼亚语', wa: '瓦隆语', udm: '乌德穆尔特语', mhr: '草地马里语', myv: '埃尔兹亚语', krl: '卡累利阿语', mzn: '马赞达兰语', glk: '吉拉基语', lrc: '卢尔语', crh: '克里米亚鞑靼语', tt: '鞑靼语', ba: '巴什基尔语', krc: '卡拉恰伊-巴尔卡尔语', ksw: '斯戈克伦语', lhu: '拉祜语', lis: '傈僳语', nxq: '纳西语', shn: '掸语', ee: '埃维语', nyn: '尼安科莱语', luy: '卢希亚语', ssw: '斯瓦蒂语', nbl: '南恩德贝勒语', nso: '北索托语', fan: '芳语', naq: '纳马语 (科伊科伊)', hts: '哈扎语', kr: '卡努里语', men: '门德语', dyu: '迪尤拉语', syl: '锡尔赫特语', mag: '摩揭陀语', doi: '多格拉语', xkk: '克木语', moh: '莫霍克语', cho: '乔克托语', esu: '中阿拉斯加尤皮克语', ipk: '伊努皮亚克语', apw: '西阿帕奇语', dak: '达科他语', chy: '夏延语', lmo: '伦巴第语', pms: '皮埃蒙特语', eml: '艾米利亚-罗马涅语', mwl: '米兰德斯语', pnt: '本都希腊语', hno: '印科语', bhb: '比尔语', cja: '占语', hmo: '希里莫图语', pon: '波纳佩语', vmw: '马库阿语', dsb: '下索布语', gv: '曼克斯语', kw: '康沃尔语', zza: '扎扎语', brh: '布拉灰语', mrq: '马克萨斯语', tiw: '提维语', guc: '瓦尤语', myp: '皮拉罕语', emp: '北恩贝拉语', kpe: '克佩勒语', loz: '洛齐语', bbc: '托巴巴塔克语', bjn: '班贾尔语', sas: '萨萨克语', kha: '卡西语', mns: '曼西语', mrw: '马拉瑙语', tsg: '陶苏格语', yap: '雅浦语', chk: '楚克语', gbm: '加尔瓦尔语', kfy: '库马翁语', xnr: '康格里语', hr: '克罗地亚语', bs: '波斯尼亚语', iba: '伊班语', ljp: '楠榜语', tzm: '中阿特拉斯塔马塞特语', ng: '恩东加语', umb: '翁本杜语', kmb: '金本杜语', her: '赫雷罗语', xal: '卡尔梅克语', sg: '桑戈语', toi: '通加语 (赞比亚)', peo: '古波斯语', ave: '阿维斯陀语', xto: '吐火罗语A', txb: '吐火罗语B', phn: '腓尼基语', uga: '乌加里特语', xlu: '卢维语', pal: '中古波斯语 (巴列维)', syc: '古典叙利亚语', fro: '古法语', goh: '古高地德语', gez: '吉兹语', gmy: '迈锡尼希腊语', xct: '古典藏语', xpu: '布匿语', xhu: '胡里语', elx: '埃兰语', xsa: '萨巴语', kaw: '古爪哇语 (卡维)', kho: '于阗语', gmh: '中古高地德语', osp: '古西班牙语', okz: '古高棉语', osx: '古萨克森语', smg: '苏库马语', mos: '莫雷语', kln: '卡伦金语', mfe: '毛里求斯克里奥尔语', mnk: '曼丁卡语', bqi: '巴赫蒂亚里语', unr: '蒙达里语', hoc: '霍语', enq: '恩加语', xpr: '帕提亚语', xqa: '喀喇汗语', sga: '古爱尔兰语', bsk: '布鲁沙斯基语', yag: '雅格诺比语', srn: '斯拉南通戈语', kwk: '夸夸嘉夸语', sad: '桑达韦语', pcc: '布依语', iuu: '优勉语', hui: '胡利语', tkl: '托克劳语', squ: '斯科米什语', mga: '中世纪爱尔兰语', hbo: '圣经希伯来语', mpt: '米安语', ygr: '雅加利亚语', quz: '库斯科克丘亚语', quy: '阿亚库乔克丘亚语', cab: '加里富纳语', crx: '卡里尔语', tsi: '沿岸钦西安语', wbl: '瓦罕语', psi: '帕沙伊语', bgq: '巴格里语', ach: '阿乔利语', rki: '若开语', kxm: '北部高棉语', xng: '中古蒙古语', ja_kg: '日语(鹿儿岛)', ja_sd: '日语(仙台)', ko_hg: '朝鲜语(咸镜)', ko_jl: '韩语(全罗)', nan_pn: '槟城福建话', mra: '姆拉布里语', wuu_nb: '宁波话', yue_gz: '高州粤语', khb: '傣仂语', pam: '卡邦邦干语', pag: '潘加西楠语', mdh: '马京达瑙语', gor: '哥伦打洛语', mak: '望加锡语', fon: '丰语', kri: '克里奥语', dag: '达班尼语', xog: '索加语', teo: '阿特索语', dyo: '迪奥拉-丰伊语', bci: '巴乌莱语', tcy: '图卢语', haz: '哈扎拉吉语', tly: '塔雷什语', kaa: '卡拉卡尔帕克语', bej: '贝沙语', tig: '提格雷语', ssy: '萨霍语', ewo: '埃翁多语', bum: '布卢语', ndc: '恩道语', ote: '奥托米语', tar: '塔拉乌马拉语', och:'上古汉语', ojp:'上古日语', vsa:'吠陀梵语', txg:'西夏语', sog:'粟特语', otk:'古突厥语', zkt:'契丹语', juc:'女真语', omx:'古孟语', pyx:'骠语', obr:'古缅语', occ:'古占语', orv:'古东斯拉夫语', xsc:'斯基泰语', sukh:'古泰语 (素可泰)', xmr:'麦罗埃语', onw:'古努比亚语', cqu:'古典克丘亚语', omc:'莫切语', chb:'奇布查语 (穆伊斯卡)', oma:'古马来语', osu:'古巽他语', otl:'古他加禄语', ami:'阿美语', pwn:'排湾语', tay:'泰雅语', bnn:'布农语', trv:'太鲁阁语', tsu:'邹语', tao:'达悟语(雅美)', hak_tw:'台湾客家话', wuu_sz:'苏州吴语', wuu_wz:'温州吴语', nan_qz:'泉州闽南语', nan_hai:'海南话', zh_wh:'武汉官话', zh_zz:'中原官话', hak_hl:'海陆客家话', cpx:'莆仙话', mfa:'巴塔尼马来语', mtq:'芒语', tyz:'岱依语', kjp:'勃欧克伦语', kac:'景颇语(克钦)', wbm:'佤语', ahk:'阿卡语', dtp:'卡达山-杜顺语', hne:"恰蒂斯加尔语", mnw:"孟语", grt:"加罗语", nut:"侬语", quc:"基切语", kek:"克查语", mam:"玛姆语", wal:"沃莱塔语", sid:"西达莫语", tji:"土家语", nij:"恩加朱语", sda:"萨丹托拉雅语", arq:'阿尔及利亚阿拉伯语', mey:'哈萨尼亚阿拉伯语', tmh:'塔马谢克语(图阿雷格)', azb:'南阿塞拜疆语', gag:'加告兹语', sma:'南萨米语', vro:'沃罗语', pjk:'原始日韩语', oko:'古代朝鲜语(新罗)', okg:'高句丽语', ko_gor:'高丽朝鲜语', ja_chu:'中世日语', pry:'原始琉球语', lld:'拉丁语', stq:'萨特兰弗里斯语', wym:'维米索里斯语', yuc:'尤奇语', kgg:'库孙达语', ota:'奥斯曼土耳其语', cmg:'古典蒙古语', ett:'伊特鲁里亚语', xht:'哈梯语', txr:'塔尔特索斯语', roo:'罗托卡斯语', nmn:'塔阿语', lbz:'拉迪尔语', nny:'扬卡尔语', kky:'古古依米德希尔语', blc:'努哈尔克语', tue:'图尤卡语', ncs:'尼加拉瓜手语', uby:'乌比赫语', lbz_damin:'达民 (拉迪尔仪礼语)'},
    fr: { es_cr:'Espagnol (Costa Rica)', es_hn:'Espagnol', es_ni:'Espagnol (Nicaragua)', es_sv:'Espagnol (Salvadorien)', ar_jo:'Arabe jordanien', ar_ps:'Arabe palestinien', fr_lu:'Français', fr_cm:'Français camerounais', de_lu:'Allemand (Luxembourg)', en_ng2:'Anglais (Ghana)', pt_mo:'Portugais de Macao', lb:'Luxembourgeois', gcr:'Créole guyanais', acf:'Créole de Sainte-Lucie',  gan_yc:'Gan (dialecte de Yichun)', gan_ja:'Gan (Jiʼan)', gan_fz:'Gan du Fuzhou', cjy_lv:'Jin de Lüliang', cjy_xz:'Chinois Jin (dialecte de Xinzhou)', hsn_hy:'Xiang (Hengyang)', hsn_yz:'Xiang (dialecte de Yongzhou)', czh_wy:'Chinois Hui (Wuyuan)',  bla:'Pieds-Noirs', hop:'Hopi', com:'Comanche', one:'Oneida', ono:'langue onondaga', win:'Ho-Chunk', cro:'Crow', hai:'haïda', cic:'chickasaw', ik:'inupiaq', na:'nauruan', luz:'Lori du Nord', es_bo:'Espagnol (Bolivie)', es_py:'Espagnol du Paraguay', es_pa:'espagnol panaméen', en_my:'Anglais (Malaisie)', pt_gw:'Créole de Guinée-Bissau', tsz:'Purépecha', nez:'Nez-Percé', nv2:'apache de l\'Ouest', woe:'woleaien', pmt:'Tuamotuan', bin:'langue edo', khw:'Khwar',  xav:'Xavante', ter:'Terena', bor:'Bororo', trn:'Mojeño trinitario', ake:'Akawaio', aoc:'Pemón', gun:'Guaraní Mbyá',  zdj:'Comorien (Shikomori)', ayl:'Arabe libyen', abv:'Arabe Bahrani', afb:'Arabe du Golfe', acw:'Arabe omanais', swb:'Mahorais',  adx:'Tibétain de l\'Amdo', qxs:'qiang du sud', duu:'drung', jya:'Langue rGyalrong de Situ', ers:'Ersu', bca:'Bai central', atb:'Zaiwa', prk:'langue wa parauk', slr:'salar', ybe:'Yugur occidental', yuy:'Yugur oriental', mjg:'Monguor', sce:'langue dongxiang', peh:'bonan', bua:'Bouriate', cjs:'Chor', dlg:'Dolgan', kdt:'Kuay', blk:'Langue pa\'o', njo:'Ao naga', srb:'Langue sora', kjg:'khmou', mro:'Mru', gon:'gondi', bfq:'langue badaga', som:'Somali', har:'Harari',  es_pr:'Espagnol (Porto-Rican)', es_do:'Espagnol (République Dominicaine)', es_gt:'Espagnol (Guatémaltèque)', es_ec:'Espagnol (Équatorien)', es_uy:'Espagnol (Uruguay)', ar_sy:'Arabe (Syrien)', ar_ye:'Arabe (Yémeni)', ar_dz:'Arabe (Algérien)', ar_sa:'Arabe (Arabie Saoudite)', ar_lb:'Arabe (libanais)', en_wls:'anglais (gallois)', en_jam:'Anglais (jamaïcain)', en_ng:'Anglais (Nigeria)', en_ph:'Anglais (Philippine)', en_ke:'Anglais (kenyan)', fr_sn:'Français (Sénégalais)', fr_ci:'Français (Ivoirien)', fr_ht:'Français (haïtien)', pt_mz:'Portugais (Mozambique)', pt_cv:'Portugais (Cap-Vert)',  nl_be:'Néerlandais (belge)', en_us:'Anglais (américain)', en_ca:'Anglais (canadien)', en_za:'Anglais (sud-africain)', de_ch:'Allemand (Suisse)', pt_ao:'undefined (angolais)', es_ve:'undefined (vénézuélien)', ca_va:'Valencien',  nan_pera:'hokkien peranakan', zh_th:'mandarin sino-thaï', zh_tw:'Mandarin de Taïwan', nan_th:'teochew sino-thaï', zh_us:'mandarin sino-américain', yue_us:'cantonais sino-américain', dng:'doungane', ko_hun:'hanja-hun (lecture native coréenne)', ja_kun:'kun-yomi (lecture native japonaise)', phm:'proto-hmong-mien', pmgl:'proto-mongolique', ptai:'proto-taï', paa:'proto-austroasiatique', ptung:'proto-toungouse', pja:'proto-japonique', pko:'proto-coréen', ptb:'proto-tibéto-birman', pst:'proto-sino-tibétain', ko_zai:'sino-coréen des Zainichi', bo_sino:'sino-tibétain moderne', vi_ohan:'sino-vietnamien ancien', ja_ojp:'sino-japonais ancien', ko_mid:'moyen coréen', sjo:'sibé', nan_id:'hokkien indonésien', nan_my:'hokkien de Malaisie', nan_sg:'hokkien de Singapour', yue_mo:'cantonais de Macao', yue_hk:'cantonais de Hong Kong', zh_phagspa:'chinois Yuan (Phags-pa)', zh_yuan:'mandarin Yuan', bca:'bai (central)', ja:'Japonais', ja_osa:'Japonais (Osaka)', ja_aom:'Japonais (Aomori)', ja_oki:'Okinawaïen', ja_hak:'Japonais (Hakata)', ja_edo: "Japonais (époque Edo)", ja_kanbun:'Lecture japonaise du kanbun', ko:'Coréen', ko_kp: "Coréen (Corée du Nord)", ko_bus:'Coréen (Busan)', zh:'Chinois (mandarin)', yue:'Cantonais', nan:'Taïwanais', wuu:'wu de Shanghai', zh_song:'Chinois (classique)', zh_wenyan_edu:'Chinois classique (lecture cantonaise)', vi:'Vietnamien du Nord', vi_c:'Vietnamien du Centre', vi_s:'Vietnamien du Sud', vi_nom: "Vietnamien (Chữ Nôm)", vi_han:'Lecture sino-vietnamienne du chinois classique', th:'Thaï', id:'Indonésien', sa:'Sanskrit', sa_edu:'Sanskrit moderne parlé', hi:'Hindi', en:'Anglais', en_aave: "Anglais (AAVE)", en_south:'Anglais (sud des É-U)', en_app:'Anglais (Appalachien)', en_ie:'Anglais (irlandais)', en_sco:'Anglais (écossais)', en_yk:'Anglais (Yorkshire)', en_ck:'Anglais (cockney)', de:'Allemand', de_lut:'Haut allemand moderne précoce (époque de Luther)', fr:'Français', fr_class:'Français classique (XVIIe siècle)', it:'Italien', it_dan:'Italien (époque de Dante)', es_eu:'Espagnol (Europe)', es_sgl:"Espagnol du Siècle d'or", es_mx:'Espagnol (Mexique)', pt_eu:'Portugais (Europe)', pt_br:'Portugais (Brésil)', la:'Latin', ru:'Russe', uk:'Ukrainien', ar:'Arabe (standard)', ar_qur:'Arabe coranique', ar_eg:'Arabe (égyptien)', he:'Hébreu', he_mis:'Hébreu mishnique', sw:'Swahili', tr:'Turc', fa:'Persan', fa_clas:'Persan (Classique)', tl:'Tagalog', ga:'Irlandais', eu:'Basque', mn:'Mongol', my:'Birman', am:'Amharique', egy:'Égyptien ancien', ta:'Tamoul', hu:'Hongrois', nl:'Néerlandais', pl:'Polonais', ms:'Malais', mg:'Malgache', cy:'Gallois', fi:'Finnois', ain:'Aïnou', bn:'Bengali', ur:'Ourdou', te:'Télougou', jv:'Javanais', ko_jeju: "Jeju", ko_em: "Coréen (pré-moderne)", ka:'Géorgien', el:'Grec', el_grc:'Grec (ancien)', el_kath:'Grec (Katharevousa)', nv:'Navajo', qu:'Quechua', mi:'Māori', haw:'Hawaïen', km:'Khmer', lo:'Lao', yo:'Yoruba', zu:'Zoulou', bo:'Tibétain', xct_litpr:'Tibétain classique liturgique', hy:'Arménien', hy_grab:'Arménien classique (grabar)' , ja_kyo:'Japonais (Kyoto)', ja_hir:'Japonais (Hiroshima)', ja_mvi:'Miyako', ja_rys:'Yaeyama', ar_lev:'Arabe (levantin)', ar_ma:'Arabe (marocain)', ar_gulf:'Arabe (golfe)', zh_sc: "Mandarin du Sichuan", zh_db: "Mandarin du Nord-Est", nap:'Napolitain', scn:'Sicilien', de_gsw:'Allemand (suisse)', fr_qc:'Français (Québec)', sco:'Écossais', en_sg: "Anglais (Singapour)", hwc:'Créole hawaïen', pcm:'Pidgin nigérian', tpi:'Tok pisin', en_ang:'Vieil anglais', sv:'Suédois', no:'Norvégien', si:'Cinghalais', ro:'Roumain', cs:'Tchèque', ca:'Catalan', da:'Danois', is:'Islandais', lt:'Lituanien', sq:'Albanais', mt:'Maltais', so:'Somali', ml:'Malayalam', pa:'Pendjabi', ku:'Kurde', ug:'Ouïghour', kk:'Kazakh', ha:'Haoussa', ig:'Igbo', eo:'Espéranto', tok:'Toki Pona', ht:'Créole haïtien', ps:'Pachto', uz:'Ouzbek', mr:'Marathi', gu:'Gujarati', kn:'Kannada', ne:'Népalais', om:'Oromo', ti:'Tigrinya', wo:'Wolof', ln:'Lingala', sn:'Shona', sr:'Serbe', bg:'Bulgare', sk:'Slovaque', lv:'Letton', et:'Estonien', be:'Biélorusse', yi:'Yiddish', non:'Vieux norrois', arc:'Araméen', cop:'Copte', rom:'Romani', br:'Breton', xh:'Xhosa', lad:'Ladino', tlh:'Klingon', jbo:'Lojban', fj:'Fidjien', sm:'Samoan', zh_han:'Chinois (Classique des Han)', zh_tang:'Chinois (Classique des Tang)', ceb:'Cebuano', su:'Soundanais', th_isan:'Thaï (Isan)', es_co:'Espagnol (Colombie)', es_cl:'Espagnol (Chili)', gl:'Galicien', oc:'Occitan', fo:'Féroïen', jam:'Patois jamaïcain', pap:'Papiamento', gd: "Gaélique écossais", sl: "Slovène", enm: "Moyen anglais", en_em:'Anglais moderne naissant', fr_ch: "Français (Suisse)", to: "Tongien", se: "Same du Nord", af: "Afrikaans", akk: "Akkadien", ar_iq: "Arabe (irakien)", ar_sd: "Arabe (soudanais)", ar_tn: "Arabe (tunisien)", as: "Assamais", az: "Azéri", bho: "Bhojpuri", cdo: "Min oriental", chr: "Cherokee", ckb: "Kurde (sorani)", cu: "Vieux slave", de_at: "Allemand (autrichien)", de_by: "Allemand (bavarois)", en_au: "Anglais (australien)", en_in: "Anglais (indien)", es_an: "Espagnol (andalou)", es_ar: "Espagnol (argentin)", es_cu: "Espagnol (cubain)", es_pe: "Espagnol (péruvien)", fr_af: "Français (africain)", fr_be: "Français (belge)", fy: "Frison", gn: "Guarani", got: "Gotique", hak_cn: "Hakka", hit: "Hittite", hmn: "Hmong", ii: "Yi (Nuosu)", ilo: "Ilocano", ine: "Proto-indo-européen", iu: "Inuktitut", ja_heian: "Japonais (époque Heian)", ko_yb: "Coréen (Yanbian)", ky: "Kirghize", mn_cn: "Mongol (Mongolie-Intérieure)", mnc: "Mandchou", myn: "Maya classique", nci: "Nahuatl classique", nds: "Bas allemand", nn: "Norvégien (Nynorsk)", ny: "Chichewa", or: "Odia", pi: "Pali", pi_edu:'Pali pédagogique (Theravada)', rm: "Romanche", rw: "Kinyarwanda", sc: "Sarde", sd: "Sindhi", sux: "Sumérien", tg: "Tadjik", th_n: "Thaï (du Nord)", th_s: "Thaï (du Sud)", tk: "Turkmène", vec: "Vénitien", za: "Zhuang", pau: "Paluan", sah: 'yakoute', tyv: 'touvain', kjh: 'khakasse', alt: 'altaï', bxr: 'bouriate', evn: 'évenki', eve: 'évène', yrk: 'nenets', kca: 'khanty', ckt: 'tchouktche', niv: 'nivkh', ket: 'ket', cjy: 'Jin', hsn: 'Xiang', gan: 'Gan', mai: 'maithili', awa: 'awadhi', skr: 'saraiki', sat: 'santali', mad: 'madourais', hil: 'hiligaïnon', bal: 'baloutchi', ak: 'akan (twi)', mk: 'macédonien', lg: 'luganda', ki: 'kikuyu', tn: 'tswana', st: 'sotho du Sud', ts: 'tsonga', ve: 'venda', bem: 'bemba', lua: 'luba-kasaï', kg: 'kikongo', ff: 'peul', bm: 'bambara', kab: 'kabyle', yua: 'maya yucatèque', tzo: 'tzotzil', mix: 'mixtèque', zap: 'zapotèque', ay: 'aymara', arn: 'mapuche', cr: 'cri (des Plaines)', oj: 'ojibwé', lkt: 'lakota', kl: 'groenlandais', ce: 'tchétchène', inh: 'ingouche', av: 'avar', lez: 'lezghien', dar: 'dargwa', lbe: 'lak', tab: 'tabassaran', ady: 'adyguéen', kbd: 'kabarde', ab: 'abkhaze', xmf: 'mingrélien', os: 'ossète', ty: 'tahitien', niu: 'niouéen', tvl: 'tuvaluan', rap: 'rapanui', rar: 'maori des îles Cook', mh: 'marshallais', gil: 'gilbertin', ch: 'chamorro', tet: 'tétoum', bi: 'bichelamar', pjt: 'pitjantjatjara', wbp: 'warlpiri', mni: 'meitei', new: 'néwari', brx: 'bodo', lus: 'mizo', dz: 'dzongkha', min: 'minangkabau', ban: 'balinais', ace: 'acehnais', bug: 'bugis', war: 'waray', bik: 'bikol central', tum: 'tumbuka', din: 'dinka', nus: 'nuer', luo: 'luo', mas: 'masaï', aa: 'afar', shi: 'tachelhit', rif: 'tarifit', mwr: 'marwari', bgc: 'haryanvi', ks: 'cachemiri', kok: 'konkani', mnp: 'Min Bei', nan_te: 'teochew', yue_ts: 'taishanais', czh: 'Hui', cnp: 'Pinghua', zh_jh: 'mandarin de Jianghuai', zh_tj: 'mandarin de Tianjin', zh_lz: 'mandarin de Lanyin', dng: 'doungan', hsb: 'haut-sorabe', csb: 'cachoube', fur: 'frioulan', ast: 'asturien', an: 'aragonais', rup: 'aroumain', wa: 'wallon', udm: 'oudmourte', mhr: 'mari des prairies', myv: 'erzya', krl: 'carélien', mzn: 'mazandarani', glk: 'guilaki', lrc: 'lori', crh: 'tatar de Crimée', tt: 'tatar', ba: 'bachkir', krc: 'karatchaï-balkar', ksw: 'karen sgaw', lhu: 'lahu', lis: 'lisu', nxq: 'naxi', shn: 'shan', ee: 'éwé', nyn: 'runyankole', luy: 'luhya', ssw: 'swati', nbl: 'ndébélé du Sud', nso: 'sotho du Nord', fan: 'fang', naq: 'nama (khoekhoe)', hts: 'hadza', kr: 'kanouri', men: 'mendé', dyu: 'dioula', syl: 'sylheti', mag: 'magahi', doi: 'dogri', xkk: 'khmou', moh: 'mohawk', cho: 'choctaw', esu: "yupik d'Alaska central", ipk: 'inupiaq', apw: "apache de l'Ouest", dak: 'dakota', chy: 'cheyenne', lmo: 'lombard', pms: 'piémontais', eml: 'émilien-romagnol', mwl: 'mirandais', pnt: 'grec pontique', hno: 'hindko', bhb: 'bhili', cja: 'cham', hmo: 'hiri motu', pon: 'pohnpei', vmw: 'makhuwa', dsb: 'bas-sorabe', gv: 'mannois', kw: 'cornique', zza: 'zazaki', brh: 'brahoui', mrq: 'marquisien', tiw: 'tiwi', guc: 'wayuu', myp: 'pirahã', emp: 'emberá du Nord', kpe: 'kpelle', loz: 'lozi', bbc: 'batak toba', bjn: 'banjar', sas: 'sasak', kha: 'khasi', mns: 'mansi', mrw: 'maranao', tsg: 'tausug', yap: 'yapois', chk: 'chuuk', gbm: 'garhwali', kfy: 'kumaoni', xnr: 'kangri', hr: 'croate', bs: 'bosnien', iba: 'iban', ljp: 'lampung', tzm: "tamazight de l'Atlas central", ng: 'ndonga', umb: 'umbundu', kmb: 'kimbundu', her: 'héréro', xal: 'kalmouk', sg: 'sango', toi: 'tonga (Zambie)', peo: 'vieux-perse', ave: 'avestique', xto: 'tokharien A', txb: 'tokharien B', phn: 'phénicien', uga: 'ougaritique', xlu: 'louvite', pal: 'moyen-perse (pehlevi)', syc: 'syriaque classique', fro: 'ancien français', goh: 'vieux haut-allemand', gez: 'guèze', gmy: 'grec mycénien', xct: 'tibétain classique', xpu: 'punique', xhu: 'hourrite', elx: 'élamite', xsa: 'sabéen', kaw: 'ancien javanais (kawi)', kho: 'khotanais', gmh: 'moyen haut-allemand', osp: 'ancien espagnol', okz: 'vieux khmer', osx: 'vieux saxon', smg: 'sukuma', mos: 'mooré', kln: 'kalendjin', mfe: 'créole mauricien', mnk: 'mandinka', bqi: 'bakhtiari', unr: 'mundari', hoc: 'ho', enq: 'enga', xpr: 'parthe', xqa: 'karakhanide', sga: 'vieil irlandais', bsk: 'bourouchaski', yag: 'yaghnobi', srn: 'sranan tongo', kwk: "kwak'wala", sad: 'sandawe', pcc: 'bouyei', iuu: 'iu mien', hui: 'huli', tkl: 'tokélaouan', squ: 'squamish', mga: 'moyen irlandais', hbo: 'hébreu biblique', mpt: 'mian', ygr: 'yagaria', quz: 'quechua cuzqueño', quy: 'quechua ayacuchano', cab: 'garifuna', crx: 'carrier', tsi: 'tsimshian côtier', wbl: 'wakhi', psi: 'pachayi', bgq: 'bagri', ach: 'acholi', rki: 'rakhine', kxm: 'khmer du Nord', xng: 'mongol moyen', ja_kg: 'japonais (Kagoshima)', ja_sd: 'japonais (Sendai)', ko_hg: 'coréen (Hamgyŏng)', ko_jl: 'coréen (Jeolla)', nan_pn: 'hokkien de Penang', mra: 'mlabri', wuu_nb: 'ningboïen', yue_gz: 'yue de Gaozhou', khb: 'tai lue', pam: 'kapampangan', pag: 'pangasinan', mdh: 'maguindanao', gor: 'gorontalo', mak: 'macassar', fon: 'fon', kri: 'krio', dag: 'dagbani', xog: 'soga', teo: 'ateso', dyo: 'diola-fogny', bci: 'baoulé', tcy: 'toulou', haz: 'hazaragi', tly: 'talyche', kaa: 'karakalpak', bej: 'bedja', tig: 'tigré', ssy: 'saho', ewo: 'éwondo', bum: 'boulou', ndc: 'ndau', ote: 'otomi', tar: 'tarahumara', och:'Vieux chinois', ojp:'Vieux japonais', vsa:'Sanskrit védique', txg:'Tangoute', sog:'Sogdien', otk:'Vieux-turc', zkt:'Khitan', juc:'Jurchen', omx:'Vieux môn', pyx:'Pyu', obr:'Vieux birman', occ:'Vieux cham', orv:'Vieux slave oriental', xsc:'Scythe', sukh:'Vieux thaï (Sukhothai)', xmr:'Méroïtique', onw:'Vieux nubien', cqu:'Quechua classique', omc:'Mochica', chb:'Chibcha', oma:'Vieux malais', osu:'Vieux soundanais', otl:'Vieux tagalog', ami:'amis', pwn:'paiwan', tay:'atayal', bnn:'bunun', trv:'truku/seediq', tsu:'tsou', tao:'tao/yami', hak_tw:'hakka taïwanais', wuu_sz:'wu de Suzhou', wuu_wz:'wu de Wenzhou', nan_qz:'hokkien de Quanzhou', nan_hai:'hainanais', zh_wh:'mandarin de Wuhan', zh_zz:'mandarin du zhongyuan', hak_hl:'hakka de Hailu', cpx:'pu-xian min', mfa:'malais patani', mtq:'mường', tyz:'tày', kjp:'pwo karen', kac:'jingpo (kachin)', wbm:'wa', ahk:'akha', dtp:'kadazan-dusun', hne:"chhattisgarhi", mnw:"mon", grt:"garo", nut:"nùng", quc:"kʼicheʼ", kek:"qʼeqchiʼ", mam:"mam", wal:"wolaytta", sid:"sidamo", tji:"tujia", nij:"ngaju", sda:"toraja-sa'dan", arq:'Arabe algérien', mey:'Arabe hassaniya', tmh:'Tamasheq (Touareg)', azb:'Azéri du Sud', gag:'Gagaouze', sma:'Same du Sud', vro:'Võro', pjk:'Proto-japono-coréen', oko:'Vieux coréen (Silla)', okg:'Goguryeo', ko_gor:'Coréen de Goryeo', ja_chu:'Japonais médiéval', pry:'Proto-ryukyu', lld:'Ladin', stq:'Frison de Saterland', wym:'Wymysorys', yuc:'Yuchi', kgg:'Kusunda', ota:'Turc ottoman', cmg:'Mongol classique', ett:'Étrusque', xht:'Hatti', txr:'Tartessien', roo:'rotokas', nmn:'taa', lbz:'lardil', nny:'yangkaal', kky:'guugu yimithirr', blc:'nuxalk', tue:'tuyuca', ncs:'langue des signes nicaraguayenne', uby:'oubykh', lbz_damin:'damin'},
    de: { es_cr:'Spanisch (Costa Rica)', es_hn:'Spanisch', es_ni:'Spanisch (Nicaragua)', es_sv:'Spanisch (El Salvador)', ar_jo:'Jordanisch-Arabisch', ar_ps:'Palästinensisches Arabisch', fr_lu:'Französisch', fr_cm:'Kamerunisches Französisch', de_lu:'Deutsch (Luxemburg)', en_ng2:'Englisch (Ghana)', pt_mo:'Portugiesisch von Macau', lb:'Luxemburgische Sprache', gcr:'Französisch-Guayanisches Kreol', acf:'Saint-Lucia-Kreolisch',  gan_yc:'Gan-Chinesisch (Yichun-Dialekt)', gan_ja:'Gan (Jiʼan)', gan_fz:'Gan-Chinesisch (Fuzhou)', cjy_lv:'Lüliang-Jin', cjy_xz:'Jin-Chinesisch (Xinzhou-Dialekt)', hsn_hy:'Xiang (Hengyang)', hsn_yz:'Xiang-Chinesisch (Yongzhou-Dialekt)', czh_wy:'Hui-Chinesisch (Wuyuan)',  bla:'Schwarzfuß', hop:'Hopi', com:'Komanche', one:'Oneida', ono:'Onondaga-Sprache', win:'Ho-Chunk-Sprache', cro:'Crow-Sprache', hai:'Haida-Sprache', cic:'Chickasaw-Sprache', ik:'Inupiaq', na:'Nauruisch', luz:'Nordlurisisch', es_bo:'Spanisch (Bolivien)', es_py:'Paraguayisches Spanisch', es_pa:'Panamisches Spanisch', en_my:'Englisch (Malaysia)', pt_gw:'Guinea-Bissau-Kreolisch', tsz:'Purépecha-Sprache', nez:'Nez-Percé', nv2:'West-Apache', woe:'Woleaisch', pmt:'Tuamotuisch', bin:'Edo-Sprache', khw:'Khowar',  xav:'Xavante', ter:'Terena-Sprache', bor:'Bororo', trn:'Trinitario-Mojeño', ake:'Akawaio-Sprache', aoc:'Pemón', gun:'Mbyá-Guaraní',  zdj:'Komorisch (Shikomori)', ayl:'Libysch-Arabisch', abv:'Bahrani-Arabisch', afb:'Arabisch (Golf)', acw:'Arabisch (Oman)', swb:'Maore-Komorisch',  adx:'Amdo-Tibetisch', qxs:'Südliches Qiang', duu:'Drung-Sprache', jya:'Situ-rGyalrong-Sprache', ers:'Ersu-Sprache', bca:'Zentral-Bai', atb:'Zaiwa-Sprache', prk:'Parauk-Wa-Sprache', slr:'Salarisch', ybe:'Westjugurisch', yuy:'Osteugurisch', mjg:'Mongghul', sce:'Dongxiang-Sprache', peh:'Bonan', bua:'Burjatische Sprache', cjs:'Schor', dlg:'Dolgisch', kdt:'Kuy', blk:'Pa\'O-Sprache', njo:'Ao-Naga', srb:'Sora-Sprache', kjg:'Khmu', mro:'Mru-Sprache', gon:'Gondi', bfq:'Badaga-Sprache', som:'Somali', har:'Harari',  es_pr:'Spanisch (Puertoricanisch)', es_do:'Spanisch (Dominikanische Republik)', es_gt:'Spanisch (Guatemala)', es_ec:'Spanisch (Ecuadorianisch)', es_uy:'Spanisch (Uruguay)', ar_sy:'Arabisch (Syrisch)', ar_ye:'Arabisch (Jemenitisch)', ar_dz:'Arabisch (Algerisch)', ar_sa:'Arabisch (Saudi-Arabien)', ar_lb:'Arabisch (libanesisch)', en_wls:'Englisch (walisisch)', en_jam:'Englisch (Jamaika)', en_ng:'Englisch (Nigeria)', en_ph:'Englisch (Philippinen)', en_ke:'Englisch (Kenia)', fr_sn:'Französisch (Senegalese)', fr_ci:'Französisch (Elfenbeinküste)', fr_ht:'Französisch (Haitian)', pt_mz:'Portugiesisch (Mosambik)', pt_cv:'Portugiesisch (Kap Verde)',  nl_be:'Niederländisch (belgisch)', en_us:'Englisch (amerikanisch)', en_ca:'Englisch (kanadisch)', en_za:'Englisch (südafrikanisch)', de_ch:'Deutsch (Schweiz)', pt_ao:'undefined (angolanisch)', es_ve:'undefined (venezolanisch)', ca_va:'Valencianisch',  nan_pera:'Peranakan-Hokkien', zh_th:'Thai-Chinesisches Mandarin', zh_tw:'Taiwan-Mandarin', nan_th:'Thai-Chinesisches Teochew', zh_us:'Heritage-Mandarin (USA)', yue_us:'Heritage-Kantonesisch (USA)', dng:'Dunganisch', ko_hun:'Hanja-hun (koreanische Eigenlesung)', ja_kun:'Kun-yomi (japanische Eigenlesung)', phm:'Proto-Hmong-Mien', pmgl:'Proto-Mongolisch', ptai:'Proto-Tai', paa:'Proto-Austroasiatisch', ptung:'Proto-Tungusisch', pja:'Proto-Japonisch', pko:'Proto-Koreanisch', ptb:'Proto-Tibeto-Burmanisch', pst:'Proto-Sino-Tibetisch', ko_zai:'zainichi-koreanisches Sino', bo_sino:'modernes Sino-Tibetisch', vi_ohan:'altsinovietnamesisch', ja_ojp:'altjapanisch (Sino)', ko_mid:'Mittelkoreanisch', sjo:'Sibe', nan_id:'Indonesisch-Hokkien', nan_my:'Malaysia-Hokkien', nan_sg:'Singapur-Hokkien', yue_mo:'Macau-Kantonesisch', yue_hk:'Hongkong-Kantonesisch', zh_phagspa:'Yuan-Chinesisch (Phags-pa)', zh_yuan:'Yuan-Mandarin', bca:'Zentral-Bai', ja:'Japanisch', ja_osa:'Japanisch (Osaka)', ja_aom:'Japanisch (Aomori)', ja_oki:'Okinawanisch', ja_hak:'Japanisch (Hakata)', ja_edo: "Japanisch (Edo-Zeit)", ja_kanbun:'Japanisches Kanbun-Lesen', ko:'Koreanisch', ko_kp: "Koreanisch (Nordkorea)", ko_bus:'Koreanisch (Busan)', zh:'Chinesisch (Mandarin)', yue:'Kantonesisch', nan:'Taiwanisch', wuu:'Shanghai-Wu', zh_song:'Chinesisch (klassisch)', zh_wenyan_edu:'Klassisches Chinesisch (kantonesische Lesung)', vi:'Nord-Vietnamesisch', vi_c:'Mittel-Vietnamesisch', vi_s:'Süd-Vietnamesisch', vi_nom: "Vietnamesisch (Chữ Nôm)", vi_han:'Sino-Vietnamesische Lesung des Klassischen Chinesisch', th:'Thai', id:'Indonesisch', sa:'Sanskrit', sa_edu:'Modernes gesprochenes Sanskrit', hi:'Hindi', en:'Englisch', en_aave: "Englisch (AAVE)", en_south:'Englisch (US-Süd)', en_app:'Englisch (Appalachen)', en_ie:'Englisch (irisch)', en_sco:'Englisch (schottisch)', en_yk:'Englisch (Yorkshire)', en_ck:'Englisch (Cockney)', de:'Deutsch', de_lut:'Frühneuhochdeutsch (Luther-Zeit)', fr:'Französisch', fr_class:'Klassisches Französisch (17. Jh.)', it: "Italienisch", it_dan:'Italienisch (Dante-Zeit)', es_eu:'Spanisch (Europa)', es_sgl:'Spanisch des Goldenen Zeitalters', es_mx:'Spanisch (Mexiko)', pt_eu:'Portugiesisch (Europa)', pt_br:'Portugiesisch (Brasilien)', la:'Latein', ru:'Russisch', uk:'Ukrainisch', ar:'Arabisch (Standard)', ar_qur:'Koranisches Arabisch', ar_eg:'Arabisch (ägyptisch)', he:'Hebräisch', he_mis:'Mischna-Hebräisch', sw:'Swahili', tr:'Türkisch', fa:'Persisch', fa_clas:'Persisch (Klassisch)', tl:'Tagalog', ga:'Irisch', eu:'Baskisch', mn:'Mongolisch', my:'Birmanisch', am:'Amharisch', egy:'Altägyptisch', ta:'Tamilisch', hu:'Ungarisch', nl:'Niederländisch', pl:'Polnisch', ms:'Malaiisch', mg:'Madagassisch', cy:'Walisisch', fi:'Finnisch', ain:'Ainu', bn:'Bengalisch', ur:'Urdu', te:'Telugu', jv:'Javanisch', ko_jeju: "Jeju", ko_em: "Koreanisch (Frühe Neuzeit)", ka:'Georgisch', el:'Griechisch', el_grc:'Griechisch (antik)', el_kath:'Griechisch (Katharevousa)', nv:'Navajo', qu:'Quechua', mi:'Māori', haw:'Hawaiisch', km:'Khmer', lo:'Lao', yo:'Yoruba', zu:'Zulu', bo:'Tibetisch', xct_litpr:'Liturgisches Klassisches Tibetisch', hy:'Armenisch', hy_grab:'Klassisches Armenisch (Grabar)' , ja_kyo:'Japanisch (Kyoto)', ja_hir:'Japanisch (Hiroshima)', ja_mvi:'Miyako', ja_rys:'Yaeyama', ar_lev:'Arabisch (Levantinisch)', ar_ma:'Arabisch (Marokkanisch)', ar_gulf:'Arabisch (Golf)', zh_sc: "Sichuan-Mandarin", zh_db: "Nordost-Mandarin", nap:'Neapolitanisch', scn:'Sizilianisch', de_gsw:'Deutsch (Schweiz)', fr_qc:'Französisch (Québec)', sco:'Scots', en_sg: "Englisch (Singapur)", hwc:'Hawaiianisches Kreol', pcm:'Nigerianisches Pidgin', tpi:'Tok Pisin', en_ang:'Altenglisch', sv:'Schwedisch', no:'Norwegisch', si:'Singhalesisch', ro:'Rumänisch', cs:'Tschechisch', ca:'Katalanisch', da:'Dänisch', is:'Isländisch', lt:'Litauisch', sq:'Albanisch', mt:'Maltesisch', so:'Somali', ml:'Malayalam', pa:'Pandschabi', ku:'Kurdisch', ug:'Uigurisch', kk:'Kasachisch', ha:'Hausa', ig:'Igbo', eo:'Esperanto', tok:'Toki Pona', ht:'Haitianisches Kreol', ps:'Paschtu', uz:'Usbekisch', mr:'Marathi', gu:'Gujarati', kn:'Kannada', ne:'Nepalesisch', om:'Oromo', ti:'Tigrinya', wo:'Wolof', ln:'Lingala', sn:'Shona', sr:'Serbisch', bg:'Bulgarisch', sk:'Slowakisch', lv:'Lettisch', et:'Estnisch', be:'Belarussisch', yi:'Jiddisch', non:'Altnordisch', arc:'Aramäisch', cop:'Koptisch', rom:'Romani', br:'Bretonisch', xh:'Xhosa', lad:'Ladino', tlh:'Klingonisch', jbo:'Lojban', fj:'Fidschianisch', sm:'Samoanisch', zh_han:'Chinesisch (Han-Klassisch)', zh_tang:'Chinesisch (Tang-Klassisch)', ceb:'Cebuano', su:'Sundanesisch', th_isan:'Thai (Isan)', es_co:'Spanisch (Kolumbien)', es_cl:'Spanisch (Chile)', gl:'Galizisch', oc:'Okzitanisch', fo:'Färöisch', jam:'Jamaika-Patois', pap:'Papiamento', gd: "Schottisch-Gälisch", sl: "Slowenisch", enm: "Mittelenglisch", en_em:'Frühneuenglisch', fr_ch: "Französisch (Schweiz)", to: "Tongaisch", se: "Nordsamisch", af: "Afrikaans", akk: "Akkadisch", ar_iq: "Arabisch (irakisch)", ar_sd: "Arabisch (sudanesisch)", ar_tn: "Arabisch (tunesisch)", as: "Assamesisch", az: "Aserbaidschanisch", bho: "Bhojpuri", cdo: "Ost-Min", chr: "Cherokee", ckb: "Kurdisch (Sorani)", cu: "Altkirchenslawisch", de_at: "Deutsch (österreichisch)", de_by: "Deutsch (bairisch)", en_au: "Englisch (australisch)", en_in: "Englisch (indisch)", es_an: "Spanisch (andalusisch)", es_ar: "Spanisch (argentinisch)", es_cu: "Spanisch (kubanisch)", es_pe: "Spanisch (peruanisch)", fr_af: "Französisch (afrikanisch)", fr_be: "Französisch (belgisch)", fy: "Friesisch", gn: "Guaraní", got: "Gotisch", hak_cn: "Hakka", hit: "Hethitisch", hmn: "Hmong", ii: "Yi (Nuosu)", ilo: "Ilokano", ine: "Urindogermanisch", iu: "Inuktitut", ja_heian: "Japanisch (Heian-Zeit)", ko_yb: "Koreanisch (Yanbian)", ky: "Kirgisisch", mn_cn: "Mongolisch (Innere Mongolei)", mnc: "Mandschurisch", myn: "Klassisches Maya", nci: "Klassisches Nahuatl", nds: "Niederdeutsch", nn: "Norwegisch (Nynorsk)", ny: "Chichewa", or: "Oriya", pi: "Pali", pi_edu:'Pädagogisches Pali (Theravada)', rm: "Rätoromanisch", rw: "Kinyarwanda", sc: "Sardisch", sd: "Sindhi", sux: "Sumerisch", tg: "Tadschikisch", th_n: "Thailändisch (nördlich)", th_s: "Thailändisch (südlich)", tk: "Turkmenisch", vec: "Venetisch", za: "Zhuang", pau: "Palauisch", sah: 'Jakutisch', tyv: 'Tuwinisch', kjh: 'Chakassisch', alt: 'Altaisch', bxr: 'Burjatisch', evn: 'Ewenkisch', eve: 'Ewenisch', yrk: 'Nenzisch', kca: 'Chantisch', ckt: 'Tschuktschisch', niv: 'Nivchisch', ket: 'Ketisch', cjy: 'Jin', hsn: 'Xiang', gan: 'Gan', mai: 'Maithili', awa: 'Awadhi', skr: 'Saraiki', sat: 'Santali', mad: 'Maduresisch', hil: 'Hiligaynon', bal: 'Belutschisch', ak: 'Akan (Twi)', mk: 'Mazedonisch', lg: 'Luganda', ki: 'Kikuyu', tn: 'Tswana', st: 'Süd-Sotho', ts: 'Tsonga', ve: 'Venda', bem: 'Bemba', lua: 'Luba-Kasai', kg: 'Kikongo', ff: 'Ful', bm: 'Bambara', kab: 'Kabylisch', yua: 'Yukatekisches Maya', tzo: 'Tzotzil', mix: 'Mixtekisch', zap: 'Zapotekisch', ay: 'Aymara', arn: 'Mapudungun', cr: 'Cree (Plains)', oj: 'Ojibwe', lkt: 'Lakota', kl: 'Grönländisch', ce: 'Tschetschenisch', inh: 'Inguschisch', av: 'Awarisch', lez: 'Lesgisch', dar: 'Darginisch', lbe: 'Lakisch', tab: 'Tabasaranisch', ady: 'Adygeisch', kbd: 'Kabardinisch', ab: 'Abchasisch', xmf: 'Mingrelisch', os: 'Ossetisch', ty: 'Tahitianisch', niu: 'Niueanisch', tvl: 'Tuvaluisch', rap: 'Rapanui', rar: 'Cookinseln-Maori', mh: 'Marshallesisch', gil: 'Gilbertesisch', ch: 'Chamorro', tet: 'Tetum', bi: 'Bislama', pjt: 'Pitjantjatjara', wbp: 'Warlpiri', mni: 'Meitei', new: 'Newari', brx: 'Bodo', lus: 'Mizo', dz: 'Dzongkha', min: 'Minangkabau', ban: 'Balinesisch', ace: 'Aceh', bug: 'Buginesisch', war: 'Waray', bik: 'Zentral-Bikol', tum: 'Tumbuka', din: 'Dinka', nus: 'Nuer', luo: 'Luo', mas: 'Maa', aa: 'Afar', shi: 'Taschelhit', rif: 'Tarifit', mwr: 'Marwari', bgc: 'Haryanvi', ks: 'Kaschmiri', kok: 'Konkani', mnp: 'Min Bei', nan_te: 'Teochew', yue_ts: 'Taishanesisch', czh: 'Hui', cnp: 'Pinghua', zh_jh: 'Jianghuai-Mandarin', zh_tj: 'Tianjin-Mandarin', zh_lz: 'Lanyin-Mandarin', dng: 'Dunganisch', hsb: 'Obersorbisch', csb: 'Kaschubisch', fur: 'Friaulisch', ast: 'Asturisch', an: 'Aragonesisch', rup: 'Aromunisch', wa: 'Wallonisch', udm: 'Udmurtisch', mhr: 'Wiesenmari', myv: 'Ersjanisch', krl: 'Karelisch', mzn: 'Masanderanisch', glk: 'Gilakisch', lrc: 'Luri', crh: 'Krimtatarisch', tt: 'Tatarisch', ba: 'Baschkirisch', krc: 'Karatschai-Balkarisch', ksw: 'Sgaw-Karen', lhu: 'Lahu', lis: 'Lisu', nxq: 'Naxi', shn: 'Schan', ee: 'Ewe', nyn: 'Runyankole', luy: 'Luhya', ssw: 'Swazi', nbl: 'Süd-Ndebele', nso: 'Nord-Sotho', fan: 'Fang', naq: 'Nama (Khoekhoe)', hts: 'Hadza', kr: 'Kanuri', men: 'Mende', dyu: 'Dioula', syl: 'Sylhetisch', mag: 'Magahi', doi: 'Dogri', xkk: 'Khmu', moh: 'Mohawk', cho: 'Choctaw', esu: 'Zentral-Yupik', ipk: 'Inupiaq', apw: 'West-Apache', dak: 'Dakota', chy: 'Cheyenne', lmo: 'Lombardisch', pms: 'Piemontesisch', eml: 'Emilianisch-Romagnolisch', mwl: 'Mirandesisch', pnt: 'Pontisches Griechisch', hno: 'Hindko', bhb: 'Bhili', cja: 'Cham', hmo: 'Hiri Motu', pon: 'Pohnpeianisch', vmw: 'Makhuwa', dsb: 'Niedersorbisch', gv: 'Manx', kw: 'Kornisch', zza: 'Zazaki', brh: 'Brahui', mrq: 'Marquesanisch', tiw: 'Tiwi', guc: 'Wayuu', myp: 'Pirahã', emp: 'Nord-Emberá', kpe: 'Kpelle', loz: 'Lozi', bbc: 'Toba-Batak', bjn: 'Banjar', sas: 'Sasak', kha: 'Khasi', mns: 'Mansisch', mrw: 'Maranao', tsg: 'Tausug', yap: 'Yapesisch', chk: 'Chuukesisch', gbm: 'Garhwali', kfy: 'Kumaoni', xnr: 'Kangri', hr: 'Kroatisch', bs: 'Bosnisch', iba: 'Iban', ljp: 'Lampung', tzm: 'Zentralatlas-Tamazight', ng: 'Ndonga', umb: 'Umbundu', kmb: 'Kimbundu', her: 'Herero', xal: 'Kalmückisch', sg: 'Sango', toi: 'Tonga (Sambia)', peo: 'Altpersisch', ave: 'Avestisch', xto: 'Tocharisch A', txb: 'Tocharisch B', phn: 'Phönizisch', uga: 'Ugaritisch', xlu: 'Luwisch', pal: 'Mittelpersisch (Pahlavi)', syc: 'Klassisches Syrisch', fro: 'Altfranzösisch', goh: 'Althochdeutsch', gez: "Ge'ez", gmy: 'Mykenisches Griechisch', xct: 'Klassisches Tibetisch', xpu: 'Punisch', xhu: 'Hurritisch', elx: 'Elamisch', xsa: 'Sabäisch', kaw: 'Altjavanisch (Kawi)', kho: 'Khotanesisch', gmh: 'Mittelhochdeutsch', osp: 'Altspanisch', okz: 'Altkhmer', osx: 'Altsächsisch', smg: 'Sukuma', mos: 'Mòoré', kln: 'Kalendjin', mfe: 'Mauritisches Kreol', mnk: 'Mandinka', bqi: 'Bachtiarisch', unr: 'Mundari', hoc: 'Ho', enq: 'Enga', xpr: 'Parthisch', xqa: 'Karachanidisch', sga: 'Altirisch', bsk: 'Burushaski', yag: 'Jaghnobi', srn: 'Sranan Tongo', kwk: "Kwak'wala", sad: 'Sandawe', pcc: 'Bouyei', iuu: 'Iu Mien', hui: 'Huli', tkl: 'Tokelauisch', squ: 'Squamish', mga: 'Mittelirisch', hbo: 'Biblisches Hebräisch', mpt: 'Mian', ygr: 'Yagaria', quz: 'Cusco-Quechua', quy: 'Ayacucho-Quechua', cab: 'Garifuna', crx: 'Carrier', tsi: 'Küsten-Tsimshian', wbl: 'Wakhi', psi: 'Paschai', bgq: 'Bagri', ach: 'Acholi', rki: 'Rakhine', kxm: 'Nord-Khmer', xng: 'Mittelmongolisch', ja_kg: 'Japanisch (Kagoshima)', ja_sd: 'Japanisch (Sendai)', ko_hg: 'Koreanisch (Hamgyŏng)', ko_jl: 'Koreanisch (Jeolla)', nan_pn: 'Penang-Hokkien', mra: 'Mlabri', wuu_nb: 'Ningbo', yue_gz: 'Gaozhou-Yue', khb: 'Tai Lue', pam: 'Kapampangan', pag: 'Pangasinan', mdh: 'Maguindanao', gor: 'Gorontalo', mak: 'Makassar', fon: 'Fon', kri: 'Krio', dag: 'Dagbani', xog: 'Soga', teo: 'Ateso', dyo: 'Jola-Fonyi', bci: 'Baoulé', tcy: 'Tulu', haz: 'Hazaragi', tly: 'Talyschisch', kaa: 'Karakalpakisch', bej: 'Bedscha', tig: 'Tigre', ssy: 'Saho', ewo: 'Ewondo', bum: 'Bulu', ndc: 'Ndau', ote: 'Otomí', tar: 'Tarahumara', och:'Altchinesisch', ojp:'Altjapanisch', vsa:'Vedisches Sanskrit', txg:'Tangutisch', sog:'Sogdisch', otk:'Alttürkisch', zkt:'Kitanisch', juc:'Jurchen', omx:'Altmon', pyx:'Pyu', obr:'Altburmesisch', occ:'Altcham', orv:'Altostslawisch', xsc:'Skythisch', sukh:'Altthai (Sukhothai)', xmr:'Meroitisch', onw:'Altnubisch', cqu:'Klassisches Quechua', omc:'Mochica', chb:'Chibcha', oma:'Altmalaiisch', osu:'Altsundanesisch', otl:'Alttagalog', ami:'Amis', pwn:'Paiwan', tay:'Atayal', bnn:'Bunun', trv:'Truku/Seediq', tsu:'Tsou', tao:'Tao/Yami', hak_tw:'Taiwan-Hakka', wuu_sz:'Suzhou-Wu', wuu_wz:'Wenzhou-Wu', nan_qz:'Quanzhou-Hokkien', nan_hai:'Hainanesisch', zh_wh:'Wuhan-Mandarin', zh_zz:'Zhongyuan-Mandarin', hak_hl:'Hailu-Hakka', cpx:'Pu-Xian-Min', mfa:'Patani-Malayisch', mtq:'Mường', tyz:'Tày', kjp:'Pwo-Karen', kac:'Jingpo (Kachin)', wbm:'Wa', ahk:'Akha', dtp:'Kadazan-Dusun', hne:"Chhattisgarhi", mnw:"Mon", grt:"Garo", nut:"Nùng", quc:"Kʼicheʼ", kek:"Qʼeqchiʼ", mam:"Mam", wal:"Wolaytta", sid:"Sidamo", tji:"Tujia", nij:"Ngaju", sda:"Toraja-Sa'dan", arq:'Algerisches Arabisch', mey:'Hassaniya-Arabisch', tmh:'Tamascheq (Tuareg)', azb:'Süd-Aserbaidschanisch', gag:'Gagausisch', sma:'Südsamisch', vro:'Võro', pjk:'Proto-Japonisch-Koreanisch', oko:'Altkoreanisch (Silla)', okg:'Goguryeo', ko_gor:'Goryeo-Koreanisch', ja_chu:'Mitteljapanisch', pry:'Ur-Ryukyu', lld:'Ladinisch', stq:'Saterfriesisch', wym:'Wilmesaurisch', yuc:'Yuchi', kgg:'Kusunda', ota:'Osmanisch', cmg:'Klassisches Mongolisch', ett:'Etruskisch', xht:'Hattisch', txr:'Tartessisch', roo:'Rotokas', nmn:'Taa', lbz:'Lardil', nny:'Yangkaal', kky:'Guugu Yimithirr', blc:'Nuxalk', tue:'Tuyuca', ncs:'Nicaraguanische Gebärdensprache', uby:'Ubychisch', lbz_damin:'Damin'},
    es: { es_cr:'Español (Costa Rica)', es_hn:'Español', es_ni:'Español (Nicaragua)', es_sv:'Español (Salvadoreño)', ar_jo:'Árabe jordano', ar_ps:'Árabe palestino', fr_lu:'Francés', fr_cm:'Francés cameronés', de_lu:'Alemán (Luxemburgués)', en_ng2:'Inglés (Ghana)', pt_mo:'Portugués de Macao', lb:'Idioma luxemburgués', gcr:'Criollo de Guayana Francesa', acf:'Criollo de Santa Lucía',  gan_yc:'Chino Gan (dialecto de Yichun)', gan_ja:'Gan (Jiʼan)', gan_fz:'Gan (Fuzhou)', cjy_lv:'Jin de Lüliang', cjy_xz:'Chino Jin (dialecto de Xinzhou)', hsn_hy:'Xiang (Hengyang)', hsn_yz:'Chino Xiang (dialecto de Yongzhou)', czh_wy:'Chino Hui (Wuyuan)',  bla:'Pie Negro', hop:'Hopi', com:'Comanche', one:'Oneida', ono:'lengua onondaga', win:'Idioma Ho-Chunk', cro:'Idioma crow', hai:'lengua haida', cic:'chickasaw', ik:'inupiaq', na:'nauruano', luz:'Luri Septentrional', es_bo:'Español (Bolivia)', es_py:'Español paraguayo', es_pa:'español panameño', en_my:'Inglés (Malasia)', pt_gw:'Criollo de Guinea-Bisáu', tsz:'Purépecha', nez:'Nez Perce', nv2:'apache occidental', woe:'woleaiano', pmt:'Tuamotueño', bin:'lengua edo', khw:'Idioma jhowar',  xav:'Idioma xavante', ter:'Lengua Terena', bor:'Bororo', trn:'Mojeño trinitario', ake:'Akawaio', aoc:'Pemón', gun:'Guaraní Mbyá',  zdj:'Comoriano (Shikomori)', ayl:'Árabe libio', abv:'Árabe Bahrení', afb:'Árabe del Golfo', acw:'Árabe omaní', swb:'Mahorés',  adx:'Tibetano Amdo', qxs:'qiang meridional', duu:'idioma drung', jya:'Lengua Situ rGyalrong', ers:'Ersu', bca:'Bai central', atb:'Zaiwa', prk:'idioma wa parauk', slr:'salar', ybe:'Yugur occidental', yuy:'Yugur oriental', mjg:'Monguor', sce:'idioma dongxiang', peh:'bonan', bua:'idioma buriato', cjs:'Chor', dlg:'Dolgan', kdt:'Kuay', blk:'Idioma Pa\'O', njo:'Ao naga', srb:'Lengua sora', kjg:'khmu', mro:'Idioma mru', gon:'gondí', bfq:'lengua badaga', som:'Somalí', har:'Harari',  es_pr:'Español (Puertorriqueño)', es_do:'Español (República Dominicana)', es_gt:'Español (Guatemalteco)', es_ec:'Español (Ecuatoriano)', es_uy:'Español (Uruguay)', ar_sy:'Árabe (Sirio)', ar_ye:'Árabe (Yemení)', ar_dz:'Árabe (Argelino)', ar_sa:'Árabe (Arabia Saudita)', ar_lb:'Árabe (libanés)', en_wls:'inglés (galés)', en_jam:'Inglés (jamaicano)', en_ng:'Inglés (Nigeria)', en_ph:'Inglés (Filipinas)', en_ke:'Inglés (keniata)', fr_sn:'Francés (Senegalés)', fr_ci:'Francés (Marfileño)', fr_ht:'Francés (haitiano)', pt_mz:'Portugués (Mozambique)', pt_cv:'Portugués (Cabo Verde)',  nl_be:'Neerlandés (belga)', en_us:'Inglés (estadounidense)', en_ca:'Inglés (canadiense)', en_za:'Inglés (sudafricano)', de_ch:'Alemán (Suizo)', pt_ao:'undefined (angoleño)', es_ve:'undefined (venezolano)', ca_va:'Valenciano',  nan_pera:'hokkien peranakan', zh_th:'mandarín sino-tailandés', zh_tw:'Mandarín taiwanés', nan_th:'teochew sino-tailandés', zh_us:'mandarín chino-estadounidense', yue_us:'cantonés chino-estadounidense', dng:'dungano', ko_hun:'hanja-hun (lectura nativa coreana)', ja_kun:'kun-yomi (lectura nativa japonesa)', phm:'protohmong-mien', pmgl:'protomongólico', ptai:'prototai', paa:'protoaustroasiático', ptung:'prototungus', pja:'protojapónico', pko:'protocoreánico', ptb:'prototibeto-birmano', pst:'protosinotibetano', ko_zai:'sino-coreano zainichi', bo_sino:'sino-tibetano moderno', vi_ohan:'sino-vietnamita antiguo', ja_ojp:'sino-japonés antiguo', ko_mid:'coreano medio', sjo:'sibé', nan_id:'hokkien indonesio', nan_my:'hokkien malasio', nan_sg:'hokkien de Singapur', yue_mo:'cantonés de Macao', yue_hk:'cantonés de Hong Kong', zh_phagspa:'chino Yuan (Phags-pa)', zh_yuan:'mandarín Yuan', bca:'bai (central)', ja:'Japonés', ja_osa:'Japonés (Osaka)', ja_aom:'Japonés (Aomori)', ja_oki:'Okinawense', ja_hak:'Japonés (Hakata)', ja_edo: "Japonés (período Edo)", ja_kanbun:'Lectura japonesa del kanbun', ko:'Coreano', ko_kp: "Coreano (Corea del Norte)", ko_bus:'Coreano (Busan)', zh:'Chino (mandarín)', yue:'Cantonés', nan:'Taiwanés', wuu:'wu de Shanghái', zh_song:'Chino (clásico)', zh_wenyan_edu:'Chino clásico (lectura cantonesa)', vi:'Vietnamita del Norte', vi_c:'Vietnamita del Centro', vi_s:'Vietnamita del Sur', vi_nom: "Vietnamita (Chữ Nôm)", vi_han:'Lectura sino-vietnamita del chino clásico', th:'Tailandés', id:'Indonesio', sa:'Sánscrito', sa_edu:'Sánscrito hablado moderno', hi:'Hindi', en:'Inglés', en_aave: "Inglés (AAVE)", en_south:'Inglés (sur de EE.UU.)', en_app:'Inglés (Apalaches)', en_ie:'Inglés (irlandés)', en_sco:'Inglés (escocés)', en_yk:'Inglés (Yorkshire)', en_ck:'Inglés (cockney)', de:'Alemán', de_lut:'Alto alemán moderno temprano (era de Lutero)', fr:'Francés', fr_class:'Francés clásico (siglo XVII)', it:'Italiano', it_dan:'Italiano (de Dante)', es_eu:'Español (Europa)', es_sgl:'Español del Siglo de Oro', es_mx:'Español (México)', pt_eu:'Portugués (Europa)', pt_br:'Portugués (Brasil)', la:'Latín', ru:'Ruso', uk:'Ucraniano', ar:'Árabe (estándar)', ar_qur:'Árabe coránico', ar_eg:'Árabe (egipcio)', he:'Hebreo', he_mis:'Hebreo misnaico', sw:'Suajili', tr:'Turco', fa:'Persa', fa_clas:'Persa (Clásico)', tl:'Tagalo', ga:'Irlandés', eu:'Vasco', mn:'Mongol', my:'Birmano', am:'Amárico', egy:'Egipcio antiguo', ta:'Tamil', hu:'Húngaro', nl:'Neerlandés', pl:'Polaco', ms:'Malayo', mg:'Malgache', cy:'Galés', fi:'Finlandés', ain:'Ainu', bn:'Bengalí', ur:'Urdu', te:'Telugu', jv:'Javanés', ko_jeju: "Jeju", ko_em: "Coreano (pre-moderno)", ka:'Georgiano', el:'Griego', el_grc:'Griego (antiguo)', el_kath:'Griego (Katharévusa)', nv:'Navajo', qu:'Quechua', mi:'Maorí', haw:'Hawaiano', km:'Jemer', lo:'Lao', yo:'Yoruba', zu:'Zulú', bo:'Tibetano', xct_litpr:'Tibetano clásico litúrgico', hy:'Armenio', hy_grab:'Armenio clásico (Grabar)' , ja_kyo:'Japonés (Kioto)', ja_hir:'Japonés (Hiroshima)', ja_mvi:'Miyako', ja_rys:'Yaeyama', ar_lev:'Árabe (levantino)', ar_ma:'Árabe (marroquí)', ar_gulf:'Árabe (golfo)', zh_sc:'Mandarín de Sichuan', zh_db:'Mandarín del Noreste', nap:'Napolitano', scn:'Siciliano', de_gsw:'Alemán (suizo)', fr_qc:'Francés (Quebec)', sco:'Escocés', en_sg: "Inglés (Singapur)", hwc:'Criollo hawaiano', pcm:'Pidgin nigeriano', tpi:'Tok pisin', en_ang:'Inglés antiguo', sv:'Sueco', no:'Noruego', si:'Cingalés', ro:'Rumano', cs:'Checo', ca:'Catalán', da:'Danés', is:'Islandés', lt:'Lituano', sq:'Albanés', mt:'Maltés', so:'Somalí', ml:'Malayalam', pa:'Punyabí', ku:'Kurdo', ug:'Uigur', kk:'Kazajo', ha:'Hausa', ig:'Igbo', eo:'Esperanto', tok:'Toki Pona', ht:'Criollo haitiano', ps:'Pastún', uz:'Uzbeko', mr:'Maratí', gu:'Guyaratí', kn:'Canarés', ne:'Nepalí', om:'Oromo', ti:'Tigriña', wo:'Wólof', ln:'Lingala', sn:'Shona', sr:'Serbio', bg:'Búlgaro', sk:'Eslovaco', lv:'Letón', et:'Estonio', be:'Bielorruso', yi:'Yidis', non:'Nórdico antiguo', arc:'Arameo', cop:'Copto', rom:'Romaní', br:'Bretón', xh:'Xhosa', lad:'Ladino', tlh:'Klingon', jbo:'Lojban', fj:'Fiyiano', sm:'Samoano', zh_han:'Chino (Clásico Han)', zh_tang:'Chino (Clásico Tang)', ceb:'Cebuano', su:'Sundanés', th_isan:'Tailandés (Isan)', es_co:'Español (Colombia)', es_cl:'Español (Chile)', gl:'Gallego', oc:'Occitano', fo:'Feroés', jam:'Patois jamaicano', pap:'Papiamento', gd: "Gaélico escocés", sl: "Esloveno", enm: "Inglés medio", en_em:'Inglés moderno temprano', fr_ch: "Francés (Suizo)", to: "Tongano", se: "Sami septentrional", af: "Afrikáans", akk: "Acadio", ar_iq: "Árabe (iraquí)", ar_sd: "Árabe (sudanés)", ar_tn: "Árabe (tunecino)", as: "Asamés", az: "Azerí", bho: "Bhoshpuri", cdo: "Min Oriental", chr: "Cheroqui", ckb: "Kurdo (sorani)", cu: "Eslavo eclesiástico antiguo", de_at: "Alemán (austríaco)", de_by: "Alemán (bávaro)", en_au: "Inglés (australiano)", en_in: "Inglés (indio)", es_an: "Español (andaluz)", es_ar: "Español (argentino)", es_cu: "Español (cubano)", es_pe: "Español (peruano)", fr_af: "Francés (africano)", fr_be: "Francés (belga)", fy: "Frisón", gn: "Guaraní", got: "Gótico", hak_cn: "Hakka", hit: "Hitita", hmn: "Hmong", ii: "Yi (Nuosu)", ilo: "Ilocano", ine: "Protoindoeuropeo", iu: "Inuktitut", ja_heian: "Japonés (período Heian)", ko_yb: "Coreano (Yanbian)", ky: "Kirguís", mn_cn: "Mongol (Mongolia Interior)", mnc: "Manchú", myn: "Maya clásico", nci: "Náhuatl clásico", nds: "Bajo alemán", nn: "Noruego (Nynorsk)", ny: "Chichewa", or: "Oriya", pi: "Pali", pi_edu:'Pali pedagógico (Theravada)', rm: "Romanche", rw: "Kinyarwanda", sc: "Sardo", sd: "Sindhi", sux: "Sumerio", tg: "Tayiko", th_n: "Tailandés (del norte)", th_s: "Tailandés (del sur)", tk: "Turcomano", vec: "Véneto", za: "Zhuang", pau: "Palauano", sah: 'yakuto', tyv: 'tuvano', kjh: 'jakaso', alt: 'altái', bxr: 'buriato', evn: 'evenki', eve: 'even', yrk: 'nenets', kca: 'khanty', ckt: 'chukchi', niv: 'nivjí', ket: 'ket', cjy: 'Jin', hsn: 'Xiang', gan: 'Gan', mai: 'maithili', awa: 'awadhi', skr: 'saraiki', sat: 'santali', mad: 'madurés', hil: 'hiligaynon', bal: 'baluchi', ak: 'acano (twi)', mk: 'macedonio', lg: 'luganda', ki: 'kikuyu', tn: 'tswana', st: 'sotho del sur', ts: 'tsonga', ve: 'venda', bem: 'bemba', lua: 'luba-kasai', kg: 'kikongo', ff: 'fula', bm: 'bambara', kab: 'cabilio', yua: 'maya yucateco', tzo: 'tzotzil', mix: 'mixteco', zap: 'zapoteco', ay: 'aimara', arn: 'mapuche', cr: 'cree (de las Llanuras)', oj: 'ojibwa', lkt: 'lakota', kl: 'groenlandés', ce: 'checheno', inh: 'ingush', av: 'avar', lez: 'lezgui', dar: 'darguá', lbe: 'lak', tab: 'tabasarán', ady: 'adigué', kbd: 'kabardiano', ab: 'abjasio', xmf: 'mingreliano', os: 'oseto', ty: 'tahitiano', niu: 'niueano', tvl: 'tuvaluano', rap: 'rapanui', rar: 'maorí de las Cook', mh: 'marshalés', gil: 'kiribatiano', ch: 'chamorro', tet: 'tetun', bi: 'bislama', pjt: 'pitjantjatjara', wbp: 'warlpiri', mni: 'meitei', new: 'newari', brx: 'bodo', lus: 'mizo', dz: 'dzongkha', min: 'minangkabau', ban: 'balinés', ace: 'achinés', bug: 'buginés', war: 'waray', bik: 'bícol central', tum: 'tumbuka', din: 'dinka', nus: 'nuer', luo: 'luo', mas: 'masái', aa: 'afar', shi: 'tashelhit', rif: 'tarifit', mwr: 'marwari', bgc: 'haryanvi', ks: 'cachemiro', kok: 'konkani', mnp: 'Min Bei', nan_te: 'teochew', yue_ts: 'taishanés', czh: 'Hui', cnp: 'Pinghua', zh_jh: 'mandarín de Jianghuai', zh_tj: 'mandarín de Tianjín', zh_lz: 'mandarín de Lanyin', dng: 'dungán', hsb: 'alto sorabo', csb: 'casubio', fur: 'friulano', ast: 'asturiano', an: 'aragonés', rup: 'arrumano', wa: 'valón', udm: 'udmurto', mhr: 'mari de las praderas', myv: 'erzya', krl: 'careliano', mzn: 'mazandarani', glk: 'guilaki', lrc: 'luri', crh: 'tártaro de Crimea', tt: 'tártaro', ba: 'baskir', krc: 'karachái-bálkaro', ksw: 'karen sgaw', lhu: 'lahu', lis: 'lisu', nxq: 'naxi', shn: 'shan', ee: 'ewé', nyn: 'runyankole', luy: 'luhya', ssw: 'suazi', nbl: 'ndebele del sur', nso: 'sotho del norte', fan: 'fang', naq: 'nama (khoekhoe)', hts: 'hadza', kr: 'kanuri', men: 'mende', dyu: 'diula', syl: 'silheti', mag: 'magahi', doi: 'dogri', xkk: 'khmu', moh: 'mohawk', cho: 'choctaw', esu: 'yupik del Alaska central', ipk: 'inupiaq', apw: 'apache occidental', dak: 'dakota', chy: 'cheyenne', lmo: 'lombardo', pms: 'piamontés', eml: 'emiliano-romañol', mwl: 'mirandés', pnt: 'griego póntico', hno: 'hindko', bhb: 'bhili', cja: 'cham', hmo: 'hiri motu', pon: 'pohnpei', vmw: 'macua', dsb: 'bajo sorabo', gv: 'manés', kw: 'córnico', zza: 'zazaki', brh: 'brahui', mrq: 'marquesano', tiw: 'tiwi', guc: 'wayuu', myp: 'pirahã', emp: 'emberá del norte', kpe: 'kpelle', loz: 'lozi', bbc: 'batak toba', bjn: 'banyar', sas: 'sasak', kha: 'khasi', mns: 'mansi', mrw: 'maranao', tsg: 'tausug', yap: 'yapeano', chk: 'chuuk', gbm: 'garhwali', kfy: 'kumaoni', xnr: 'kangri', hr: 'croata', bs: 'bosnio', iba: 'iban', ljp: 'lampung', tzm: 'tamazight del Atlas Central', ng: 'ndonga', umb: 'umbundu', kmb: 'kimbundu', her: 'herero', xal: 'kalmuko', sg: 'sango', toi: 'tonga (Zambia)', peo: 'persa antiguo', ave: 'avéstico', xto: 'tocario A', txb: 'tocario B', phn: 'fenicio', uga: 'ugarítico', xlu: 'luvio', pal: 'persa medio (pahlavi)', syc: 'siriaco clásico', fro: 'francés antiguo', goh: 'alto alemán antiguo', gez: "ge'ez", gmy: 'griego micénico', xct: 'tibetano clásico', xpu: 'púnico', xhu: 'hurrita', elx: 'elamita', xsa: 'sabeo', kaw: 'javanés antiguo (kawi)', kho: 'jotanés', gmh: 'alto alemán medio', osp: 'español antiguo', okz: 'jemer antiguo', osx: 'sajón antiguo', smg: 'sukuma', mos: 'mòoré', kln: 'kalenjin', mfe: 'criollo mauriciano', mnk: 'mandinka', bqi: 'bajtiarí', unr: 'mundari', hoc: 'ho', enq: 'enga', xpr: 'parto', xqa: 'karajanida', sga: 'irlandés antiguo', bsk: 'burushaski', yag: 'yagnobi', srn: 'sranan tongo', kwk: "kwak'wala", sad: 'sandawe', pcc: 'bouyei', iuu: 'iu mien', hui: 'huli', tkl: 'tokelauano', squ: 'squamish', mga: 'irlandés medio', hbo: 'hebreo bíblico', mpt: 'mian', ygr: 'yagaria', quz: 'quechua cuzqueño', quy: 'quechua ayacuchano', cab: 'garífuna', crx: 'carrier', tsi: 'tsimshian costero', wbl: 'wakhi', psi: 'pashai', bgq: 'bagri', ach: 'acholi', rki: 'rakáin', kxm: 'jemer septentrional', xng: 'mongol medio', ja_kg: 'japonés (Kagoshima)', ja_sd: 'japonés (Sendai)', ko_hg: 'coreano (Hamgyŏng)', ko_jl: 'coreano (Jeolla)', nan_pn: 'hokkien de Penang', mra: 'mlabri', wuu_nb: 'de Ningbo', yue_gz: 'yue de Gaozhou', khb: 'tai lue', pam: 'kapampangan', pag: 'pangasinense', mdh: 'maguindanao', gor: 'gorontalo', mak: 'makasar', fon: 'fon', kri: 'krio', dag: 'dagbani', xog: 'soga', teo: 'ateso', dyo: 'diola-fonyi', bci: 'baulé', tcy: 'tulu', haz: 'hazaragi', tly: 'talysh', kaa: 'karakalpako', bej: 'beja', tig: 'tigré', ssy: 'saho', ewo: 'ewondo', bum: 'bulu', ndc: 'ndau', ote: 'otomí', tar: 'tarahumara', och:'Chino antiguo', ojp:'Japonés antiguo', vsa:'Sánscrito védico', txg:'Tangut', sog:'Sogdiano', otk:'Turco antiguo', zkt:'Kitan', juc:'Yurchen', omx:'Mon antiguo', pyx:'Pyu', obr:'Birmano antiguo', occ:'Cham antiguo', orv:'Eslavo oriental antiguo', xsc:'Escita', sukh:'Tailandés antiguo (Sukhothai)', xmr:'Meroítico', onw:'Nubio antiguo', cqu:'Quechua clásico', omc:'Mochica (Yunga)', chb:'Chibcha (Muisca)', oma:'Malayo antiguo', osu:'Sondanés antiguo', otl:'Tagalo antiguo', ami:'amis', pwn:'paiwán', tay:'atayal', bnn:'bunun', trv:'truku/seediq', tsu:'tsou', tao:'tao/yami', hak_tw:'hakka taiwanés', wuu_sz:'wu de Suzhou', wuu_wz:'wu de Wenzhou', nan_qz:'hokkien de Quanzhou', nan_hai:'hainanés', zh_wh:'mandarín de Wuhan', zh_zz:'mandarín zhongyuan', hak_hl:'hakka de Hailu', cpx:'min pu-xian', mfa:'malayo patani', mtq:'mường', tyz:'tày', kjp:'karen pwo', kac:'jingpo (kachin)', wbm:'wa', ahk:'akha', dtp:'kadazan-dusun', hne:"chhattisgarhi", mnw:"mon", grt:"garo", nut:"nùng", quc:"kʼicheʼ", kek:"qʼeqchiʼ", mam:"mam", wal:"wolaytta", sid:"sidamo", tji:"tujia", nij:"ngaju", sda:"toraja-saʼdan", arq:'Árabe argelino', mey:'Árabe hassaniya', tmh:'Tamasheq (Tuareg)', azb:'Azerí meridional', gag:'Gagauzo', sma:'Sami meridional', vro:'Võro', pjk:'Protojapónico-coreano', oko:'Coreano antiguo (Silla)', okg:'Goguryeo', ko_gor:'Coreano de Goryeo', ja_chu:'Japonés medieval', pry:'Protoryukyuano', lld:'Ladino dolomítico', stq:'Frisón de Saterland', wym:'Wymysorys', yuc:'Yuchi', kgg:'Kusunda', ota:'Turco otomano', cmg:'Mongol clásico', ett:'Etrusco', xht:'Hatti', txr:'Tartesio', roo:'rotokas', nmn:'taa', lbz:'lardil', nny:'yangkaal', kky:'guugu yimithirr', blc:'nuxalk', tue:'tuyuca', ncs:'lengua de señas nicaragüense', uby:'ubico', lbz_damin:'damin'},
    ru: { es_cr:'Испанский (Коста-Рика)', es_hn:'Испанский', es_ni:'Испанский (Никарагуа)', es_sv:'Испанский (Сальвадор)', ar_jo:'Иорданский арабский', ar_ps:'Палестинский арабский язык', fr_lu:'Французский', fr_cm:'Камерунский французский', de_lu:'Немецкий (Люксембург)', en_ng2:'Английский (Гана)', pt_mo:'португальский язык Макао', lb:'Люксембургский язык', gcr:'Гвианский креольский язык', acf:'Сент-люсийский креольский язык',  gan_yc:'Ганьский китайский (Ичуньский диалект)', gan_ja:'Гань (Цзиань)', gan_fz:'Ганьский язык (Фучжоу)', cjy_lv:'Люйляньский цзиньский', cjy_xz:'Цзиньский китайский (синьчжоуский диалект)', hsn_hy:'Сянский (Хэнъян)', hsn_yz:'Сян (диалект Йунчжоу)', czh_wy:'Хуийский китайский (Вуюань)',  bla:'Черноногий', hop:'Хопи', com:'Команчский язык', one:'Онейда', ono:'онондаганский язык', win:'Хо-Чанк', cro:'Язык кроу', hai:'хайда', cic:'чикасо', ik:'Инупиак', na:'науруанский язык', luz:'Северный лури', es_bo:'Испанский (Боливия)', es_py:'Парагвайский испанский', es_pa:'панамский испанский язык', en_my:'Английский (Малайзия)', pt_gw:'Гвинейский креольский язык', tsz:'пурепеча', nez:'Неж Перс', nv2:'Западный апачский', woe:'волеаийский', pmt:'Туамотуанский язык', bin:'язык эдо', khw:'Кховар',  xav:'Жаванте', ter:'Терена', bor:'Бороро', trn:'Тринитарио Мохеньо', ake:'Акавайо', aoc:'Пемон', gun:'Мбья-гуарани',  zdj:'Коморский язык (Шикомори)', ayl:'Ливийский арабский язык', abv:'Бахрейнский арабский язык', afb:'Аравийский залив арабский', acw:'Оманский арабский', swb:'Махоре',  adx:'Амдоский тибетский язык', qxs:'южный цян', duu:'друнский язык', jya:'Язык сицу гъялронг', ers:'Эрсу', bca:'Центральный бай', atb:'Зайва', prk:'язык параук ва', slr:'саларский', ybe:'Западный ойратский', yuy:'восточноюгурский язык', mjg:'Монгорский язык', sce:'Дунсянский язык', peh:'боннский язык', bua:'бурятский язык', cjs:'Шорский язык', dlg:'Долганский язык', kdt:'Куй', blk:'Язык па\'о', njo:'Ао-нага', srb:'Сора', kjg:'Кхму', mro:'Мру', gon:'гонди', bfq:'Бадага', som:'Сомали', har:'Харари',  es_pr:'Испанский (Пуэрто-Риканский)', es_do:'Испанский (Доминиканская Республика)', es_gt:'Испанский (Гватемала)', es_ec:'Испанский (Эквадор)', es_uy:'Испанский (Уругвай)', ar_sy:'Арабский (сирийский)', ar_ye:'Арабский (йеменский диалект)', ar_dz:'Арабский (алжирский диалект)', ar_sa:'Арабский (Саудовская Аравия)', ar_lb:'Арабский (ливанский)', en_wls:'английский язык (валлийский)', en_jam:'Английский (ямайский)', en_ng:'Английский язык (Нигерия)', en_ph:'Английский (Филиппины)', en_ke:'Английский (кенийский)', fr_sn:'Французский (сенегальский)', fr_ci:'Французский (Кот-д\'Ивуар)', fr_ht:'Французский (гаитянский)', pt_mz:'Португальский (Мозамбик)', pt_cv:'Португальский (Кабо-Верде)',  nl_be:'Нидерландский (бельгийский)', en_us:'Английский (американский)', en_ca:'Английский (канадский)', en_za:'Английский (южноафриканский)', de_ch:'Немецкий (Швейцария)', pt_ao:'undefined (ангольский)', es_ve:'undefined (венесуэльский)', ca_va:'Валенсийский',  nan_pera:'Перанаканский хоккиен', zh_th:'Тайский мандарин', zh_tw:'Тайваньский мандарин', nan_th:'Тайский теочиу', zh_us:'Американский мандарин', yue_us:'Американский кантонский', dng:'Дунганский', ko_hun:'Ханча-хун (исконно-корейское чтение)', ja_kun:'Кунъёми (исконно-японское чтение)', phm:'Прахмонг-мьен', pmgl:'Прамонгольский', ptai:'Пратайский', paa:'Праавстроазиатский', ptung:'Пратунгусский', pja:'Праяпонский', pko:'Пракорейский', ptb:'Пратибетско-бирманский', pst:'Прасино-тибетский', ko_zai:'Сино-корейское чтение зайнити', bo_sino:'Современный сино-тибетский', vi_ohan:'Древнее сино-вьетнамское', ja_ojp:'Древнеяпонское сино-чтение', ko_mid:'Среднекорейский', sjo:'Сибинский', nan_id:'Индонезийский хоккиен', nan_my:'Малайзийский хоккиен', nan_sg:'Сингапурский хоккиен', yue_mo:'Макаоский кантонский', yue_hk:'Гонконгский кантонский', zh_phagspa:'Юаньский китайский (Пагспа)', zh_yuan:'Юаньский мандарин', bca:'байский (центральный)', ja:'Японский', ja_osa:'Японский (Осака)', ja_aom:'Японский (Аомори)', ja_oki:'Окинавский', ja_hak:'Японский (Хаката)', ja_edo: "Японский (период Эдо)", ja_kanbun:'Камбун-кундоку (японское чтение классического китайского)', ko:'Корейский', ko_kp: "Корейский (КНДР)", ko_bus:'Корейский (Пусан)', zh:'Китайский (путунхуа)', yue:'Кантонский', nan:'Тайваньский', wuu:'Шанхайский у', zh_song:'Китайский (вэньянь)', zh_wenyan_edu:'Классический китайский (кантонское чтение)', vi:'Северный вьетнамский', vi_c:'Центральный вьетнамский', vi_s:'Южный вьетнамский', vi_nom:'Тьы-ном', vi_han:'Хан-ван (сино-вьетнамское чтение классического китайского)', th:'Тайский', id:'Индонезийский', sa:'Санскрит', sa_edu:'Современный разговорный санскрит', hi:'Хинди', en:'Английский', en_aave: "Английский (AAVE)", en_south:'Английский (южный)', en_app:'Английский (Аппалачи)', en_ie:'Английский (ирландский)', en_sco:'Английский (шотландский)', en_yk:'Английский (Йоркшир)', en_ck:'Английский (кокни)', de:'Немецкий', de_lut:'Ранненововерхненемецкий (эпохи Лютера)', fr:'Французский', fr_class:'Классический французский (XVII в.)', it:'Итальянский', it_dan:'Итальянский (времён Данте)', es_eu:'Испанский (Европа)', es_sgl:'Испанский Золотого века', es_mx:'Испанский (Мексика)', pt_eu:'Португальский (Европа)', pt_br:'Португальский (Бразилия)', la:'Латинский', ru:'Русский', uk:'Украинский', ar:'Арабский (стандарт)', ar_qur:'Коранический арабский', ar_eg:'Арабский (египетский)', he:'Иврит', he_mis:'Мишнаитский иврит', sw:'Суахили', tr:'Турецкий', fa:'Персидский', fa_clas:'Персидский (классический)', tl:'Тагальский', ga:'Ирландский', eu:'Баскский', mn:'Монгольский', my:'Бирманский', am:'Амхарский', egy:'Древнеегипетский', ta:'Тамильский', hu:'Венгерский', nl:'Нидерландский', pl:'Польский', ms:'Малайский', mg:'Малагасийский', cy:'Валлийский', fi:'Финский', ain:'Айнский', bn:'Бенгальский', ur:'Урду', te:'Телугу', jv:'Яванский', ko_jeju:'Чеджуский', ko_em: "Корейский (ранний новый)", ka:'Грузинский', el:'Греческий', el_grc:'Греческий (древний)', el_kath:'Греческий (кафаревуса)', nv:'Навахо', qu:'Кечуа', mi:'Маори', haw:'Гавайский', km:'Кхмерский', lo:'Лаосский', yo:'Йоруба', zu:'Зулу', bo:'Тибетский', xct_litpr:'Классический тибетский (литургический)', hy:'Армянский', hy_grab:'Древнеармянский (грабар)' , ja_kyo:'Японский (Киото)', ja_hir:'Японский (Хиросима)', ja_mvi:'Мияко', ja_rys:'Яэяма', ar_lev:'Арабский (левантийский)', ar_ma:'Арабский (марокканский)', ar_gulf:'Арабский (заливный)', zh_sc:'Сычуаньский мандарин', zh_db:'Северо-восточный мандарин', nap:'Неаполитанский', scn:'Сицилийский', de_gsw:'Немецкий (Швейцария)', fr_qc:'Французский (Квебек)', sco:'Шотландский', en_sg: "Английский (Сингапур)", hwc:'Гавайский креольский', pcm:'Нигерийский пиджин', tpi:'Ток-писин', en_ang:'Древнеанглийский', sv:'Шведский', no:'Норвежский', si:'Сингальский', ro:'Румынский', cs:'Чешский', ca:'Каталанский', da:'Датский', is:'Исландский', lt:'Литовский', sq:'Албанский', mt:'Мальтийский', so:'Сомалийский', ml:'Малаялам', pa:'Панджаби', ku:'Курдский', ug:'Уйгурский', kk:'Казахский', ha:'Хауса', ig:'Игбо', eo:'Эсперанто', tok:'Токи Пона', ht:'Гаитянский креольский', ps:'Пушту', uz:'Узбекский', mr:'Маратхи', gu:'Гуджарати', kn:'Каннада', ne:'Непальский', om:'Оромо', ti:'Тигринья', wo:'Волоф', ln:'Лингала', sn:'Шона', sr:'Сербский', bg:'Болгарский', sk:'Словацкий', lv:'Латышский', et:'Эстонский', be:'Белорусский', yi:'Идиш', non:'Древнескандинавский', arc:'Арамейский', cop:'Коптский', rom:'Цыганский', br:'Бретонский', xh:'Коса', lad:'Ладино', tlh:'Клингонский', jbo:'Ложбан', fj:'Фиджийский', sm:'Самоанский', zh_han:'Китайский (Хань)', zh_tang:'Китайский (Тан)', ceb:'Себуано', su:'Сунданский', th_isan:'Тайский (Исан)', es_co:'Испанский (Колумбия)', es_cl:'Испанский (Чили)', gl:'Галисийский', oc:'Окситанский', fo:'Фарерский', jam:'Ямайский патуа', pap:'Папьяменто', gd: "Шотландский гэльский", sl: "Словенский", enm: "Среднеанглийский", en_em:'Ранненовоанглийский', fr_ch: "Французский (Швейцария)", to: "Тонганский", se: "Северносаамский", af: "Африкаанс", akk: "Аккадский", ar_iq: "Арабский (иракский)", ar_sd: "Арабский (суданский)", ar_tn: "Арабский (тунисский)", as: "Ассамский", az: "Азербайджанский", bho: "Бходжпури", cdo: "Восточноминьский", chr: "Чероки", ckb: "Курдский (сорани)", cu: "Старославянский", de_at: "Немецкий (австрийский)", de_by: "Немецкий (баварский)", en_au: "Английский (австралийский)", en_in: "Английский (индийский)", es_an: "Испанский (андалузский)", es_ar: "Испанский (аргентинский)", es_cu: "Испанский (кубинский)", es_pe: "Испанский (перуанский)", fr_af: "Французский (африканский)", fr_be: "Французский (бельгийский)", fy: "Фризский", gn: "Гуарани", got: "Готский", hak_cn: "Хакка", hit: "Хеттский", hmn: "Хмонг", ii: "И (Носу)", ilo: "Илоканский", ine: "Праиндоевропейский", iu: "Инуктитут", ja_heian: "Японский (период Хэйан)", ko_yb: "Корейский (Яньбянь)", ky: "Киргизский", mn_cn: "Монгольский (Внутренняя Монголия)", mnc: "Маньчжурский", myn: "Классический майя", nci: "Классический науатль", nds: "Нижненемецкий", nn: "Норвежский (нюнорск)", ny: "Чева", or: "Ория", pi: "Пали", pi_edu:'Пали (педагогический, тхеравадинский)', rm: "Романшский", rw: "Киньяруанда", sc: "Сардинский", sd: "Синдхи", sux: "Шумерский", tg: "Таджикский", th_n: "Тайский (северный)", th_s: "Тайский (южный)", tk: "Туркменский", vec: "Венетский", za: "Чжуанский", pau: "Палауский", sah: 'Якутский', tyv: 'Тувинский', kjh: 'Хакасский', alt: 'Алтайский', bxr: 'Бурятский', evn: 'Эвенкийский', eve: 'Эвенский', yrk: 'Ненецкий', kca: 'Хантыйский', ckt: 'Чукотский', niv: 'Нивхский', ket: 'Кетский', cjy: 'Цзиньский', hsn: 'Сянский', gan: 'Ганьский', mai: 'Майтхили', awa: 'Авадхи', skr: 'Сараики', sat: 'Сантали', mad: 'Мадурский', hil: 'Хилигайнон', bal: 'Белуджский', ak: 'Аканский (чви)', mk: 'Македонский', lg: 'Луганда', ki: 'Кикуйю', tn: 'Тсвана', st: 'Южный сото', ts: 'Тсонга', ve: 'Венда', bem: 'Бемба', lua: 'Луба-касаи', kg: 'Конго', ff: 'Фула', bm: 'Бамбара', kab: 'Кабильский', yua: 'Юкатекский майя', tzo: 'Цоциль', mix: 'Миштекский', zap: 'Сапотекский', ay: 'Аймара', arn: 'Мапуче', cr: 'Кри (равнинный)', oj: 'Оджибве', lkt: 'Лакота', kl: 'Гренландский', ce: 'Чеченский', inh: 'Ингушский', av: 'Аварский', lez: 'Лезгинский', dar: 'Даргинский', lbe: 'Лакский', tab: 'Табасаранский', ady: 'Адыгейский', kbd: 'Кабардинский', ab: 'Абхазский', xmf: 'Мегрельский', os: 'Осетинский', ty: 'Таитянский', niu: 'Ниуэ', tvl: 'Тувалу', rap: 'Рапануйский', rar: 'Маори островов Кука', mh: 'Маршалльский', gil: 'Кирибати', ch: 'Чаморро', tet: 'Тетум', bi: 'Бислама', pjt: 'Питьянтьятьяра', wbp: 'Варльпири', mni: 'Манипури', new: 'Невари', brx: 'Бодо', lus: 'Мизо', dz: 'Дзонгха', min: 'Минангкабау', ban: 'Балийский', ace: 'Ачехский', bug: 'Бугийский', war: 'Варай', bik: 'Центральный биколь', tum: 'Тумбука', din: 'Динка', nus: 'Нуэр', luo: 'Луо', mas: 'Масаи', aa: 'Афар', shi: 'Ташельхит', rif: 'Тарифит', mwr: 'Марвари', bgc: 'Харьянви', ks: 'Кашмирский', kok: 'Конкани', mnp: 'Минбэйский', nan_te: 'Чаошаньский', yue_ts: 'Тайшаньский', czh: 'Хуэйчжоуский', cnp: 'Пинхуа', zh_jh: 'Цзянхуайский мандарин', zh_tj: 'Тяньцзиньский мандарин', zh_lz: 'Ланьинь-мандарин', dng: 'Дунганский', hsb: 'Верхнелужицкий', csb: 'Кашубский', fur: 'Фриульский', ast: 'Астурийский', an: 'Арагонский', rup: 'Арумынский', wa: 'Валлонский', udm: 'Удмуртский', mhr: 'Луговой марийский', myv: 'Эрзянский', krl: 'Карельский', mzn: 'Мазандеранский', glk: 'Гилянский', lrc: 'Лурский', crh: 'Крымскотатарский', tt: 'Татарский', ba: 'Башкирский', krc: 'Карачаево-балкарский', ksw: 'Сгау-каренский', lhu: 'Лаху', lis: 'Лису', nxq: 'Наси', shn: 'Шанский', ee: 'Эве', nyn: 'Руньянколе', luy: 'Лухья', ssw: 'Свази', nbl: 'Южный ндебеле', nso: 'Северный сото', fan: 'Фанг', naq: 'Нама (койкой)', hts: 'Хадза', kr: 'Канури', men: 'Менде', dyu: 'Дьюла', syl: 'Силхетский', mag: 'Магахи', doi: 'Догри', xkk: 'Кхму', moh: 'Могавкский', cho: 'Чокто', esu: 'Центрально-аляскинский юпик', ipk: 'Инупиак', apw: 'Западный апачский', dak: 'Дакота', chy: 'Шайенский', lmo: 'Ломбардский', pms: 'Пьемонтский', eml: 'Эмилиано-романьольский', mwl: 'Мирандский', pnt: 'Понтийский греческий', hno: 'Хиндко', bhb: 'Бхили', cja: 'Чамский', hmo: 'Хири-моту', pon: 'Понапе', vmw: 'Макуа', dsb: 'Нижнелужицкий', gv: 'Мэнский', kw: 'Корнский', zza: 'Зазаки', brh: 'Брауи', mrq: 'Маркизский', tiw: 'Тиви', guc: 'Вайю', myp: 'Пираха', emp: 'Северный эмбера', kpe: 'Кпелле', loz: 'Лози', bbc: 'Батак-тоба', bjn: 'Банджарский', sas: 'Сасакский', kha: 'Кхаси', mns: 'Мансийский', mrw: 'Маранский', tsg: 'Таусугский', yap: 'Япский', chk: 'Чуукский', gbm: 'Гархвали', kfy: 'Кумаони', xnr: 'Кангри', hr: 'Хорватский', bs: 'Боснийский', iba: 'Ибан', ljp: 'Лампунг', tzm: 'Центральноатласский тамазигт', ng: 'Ндонга', umb: 'Умбунду', kmb: 'Кимбунду', her: 'Гереро', xal: 'Калмыцкий', sg: 'Санго', toi: 'Тонга (Замбия)', peo: 'Древнеперсидский', ave: 'Авестийский', xto: 'Тохарский A', txb: 'Тохарский B', phn: 'Финикийский', uga: 'Угаритский', xlu: 'Лувийский', pal: 'Среднеперсидский (пехлеви)', syc: 'Классический сирийский', fro: 'Старофранцузский', goh: 'Древневерхненемецкий', gez: 'Геэз', gmy: 'Микенский греческий', xct: 'Классический тибетский', xpu: 'Пунический', xhu: 'Хурритский', elx: 'Эламский', xsa: 'Сабейский', kaw: 'Древнеяванский (кави)', kho: 'Хотаносакский', gmh: 'Средневерхненемецкий', osp: 'Староиспанский', okz: 'Древнекхмерский', osx: 'Древнесаксонский', smg: 'Сукума', mos: 'Море', kln: 'Календжин', mfe: 'Маврикийский креольский', mnk: 'Мандинка', bqi: 'Бахтиарский', unr: 'Мундари', hoc: 'Хо', enq: 'Энга', xpr: 'Парфянский', xqa: 'Караханидский', sga: 'Древнеирландский', bsk: 'Бурушаски', yag: 'Ягнобский', srn: 'Сранан-тонго', kwk: 'Кваквала', sad: 'Сандаве', pcc: 'Буи', iuu: 'Иу-мьен', hui: 'Хули', tkl: 'Токелау', squ: 'Скуомиш', mga: 'Среднеирландский', hbo: 'Библейский иврит', mpt: 'Миан', ygr: 'Ягария', quz: 'Кусканско-кечуанский', quy: 'Аякучанско-кечуанский', cab: 'Гарифуна', crx: 'Кэрриер', tsi: 'Прибрежный цимшианский', wbl: 'Ваханский', psi: 'Пашаи', bgq: 'Багри', ach: 'Ачоли', rki: 'Ракхайн', kxm: 'Северный кхмерский', xng: 'Среднемонгольский', ja_kg: 'Японский (Кагосима)', ja_sd: 'Японский (Сендай)', ko_hg: 'Корейский (Хамгён)', ko_jl: 'Корейский (Чолла)', nan_pn: 'Пенангский хоккиен', mra: 'Млабри', wuu_nb: 'Нинбоский', yue_gz: 'Гаочжоуский юэ', khb: 'Тай-лы', pam: 'Капампанган', pag: 'Пангасинан', mdh: 'Магинданао', gor: 'Горонтало', mak: 'Макасарский', fon: 'Фон', kri: 'Крио', dag: 'Дагбани', xog: 'Сога', teo: 'Атесо', dyo: 'Диола-фоньи', bci: 'Бауле', tcy: 'Тулу', haz: 'Хазараги', tly: 'Талышский', kaa: 'Каракалпакский', bej: 'Беджа', tig: 'Тигре', ssy: 'Саго', ewo: 'Эвондо', bum: 'Булу', ndc: 'Ндау', ote: 'Отоми', tar: 'Тараумара', och:'Древнекитайский', ojp:'Древнеяпонский', vsa:'Ведийский санскрит', txg:'Тангутский', sog:'Согдийский', otk:'Древнетюркский', zkt:'Киданьский', juc:'Чжурчжэньский', omx:'Древнемонский', pyx:'Пью', obr:'Древнебирманский', occ:'Древнечамский', orv:'Древнерусский', xsc:'Скифский', sukh:'Древнетайский (Сукхотхай)', xmr:'Мероитский', onw:'Древненубийский', cqu:'Классический кечуа', omc:'Мочика', chb:'Чибча', oma:'Древнемалайский', osu:'Древнесунданский', otl:'Древнетагальский', ami:'амис', pwn:'пайван', tay:'атаял', bnn:'бунун', trv:'труку/сидик', tsu:'цоу', tao:'тао (ями)', hak_tw:'тайваньский хакка', wuu_sz:'Сучжоуский у', wuu_wz:'Вэньчжоуский у', nan_qz:'Цюаньчжоуский хоккиен', nan_hai:'хайнаньский', zh_wh:'Уханьский мандарин', zh_zz:'мандарин Чжунъюань', hak_hl:'Хайлуский хакка', cpx:'пу-сянь миньский', mfa:'патанийский малайский', mtq:'мыонг', tyz:'тай (Вьетнам)', kjp:'пво-карен', kac:'цзинпо (качинский)', wbm:'ва', ahk:'акха', dtp:'кадазан-дусун', hne:"чхаттисгархи", mnw:"мон", grt:"гаро", nut:"нунг", quc:"кʼичеʼ", kek:"кʼекчиʼ", mam:"мам", wal:"воламо", sid:"сидамо", tji:"туцзя", nij:"нгаджу", sda:"тораджа-садан", arq:'Алжирский арабский', mey:'Хассанийский арабский', tmh:'Тамашек (туареги)', azb:'Южноазербайджанский', gag:'Гагаузский', sma:'Южносаамский', vro:'Выруский', pjk:'Праяпоно-корейский', oko:'Древнекорейский (Силла)', okg:'Когурёский', ko_gor:'Корейский (Корё)', ja_chu:'Среднеяпонский', pry:'Прарюкюский', lld:'Ладинский', stq:'Затерфризский', wym:'Вилямовский', yuc:'Юти', kgg:'Кусунда', ota:'Османский турецкий', cmg:'Классический монгольский', ett:'Этрусский', xht:'Хаттский', txr:'Тартессийский', roo:'ротокас', nmn:'таа', lbz:'лардил', nny:'янгкаал', kky:'гууг-йимитирр', blc:'нухалк', tue:'туюка', ncs:'никарагуанский жестовый язык', uby:'убыхский', lbz_damin:'дамин'},
    ar: { es_cr:'إسبانية (كوستاريكا)', es_hn:'إسبانية', es_ni:'إسبانية (نيكاراغوا)', es_sv:'الإسبانية (السلفادور)', ar_jo:'اللهجة الأردنية', ar_ps:'اللغة العربية الفلسطينية', fr_lu:'الفرنسية', fr_cm:'الفرنسية الكاميرونية', de_lu:'ألمانية (لوكسمبرغية)', en_ng2:'الإنجليزية (غانا)', pt_mo:'البرتغالية الماكاوية', lb:'اللغة اللوكسمبورغية', gcr:'كريول غويانا الفرنسية', acf:'الكريولية سانت لوسيانية',  gan_yc:'الصينية جان (لهجة يتشون)', gan_ja:'غان (جيآن)', gan_fz:'اللغة الغان (فوتشو)', cjy_lv:'الجين من لولِيانغ', cjy_xz:'جيني الصينية (لهجة شينتشو)', hsn_hy:'الشيانغ (هنغيانغ)', hsn_yz:'لغة شيانغ (لهجة يونغتشو)', czh_wy:'الصينية الهوية (وويوان)',  bla:'لغة بلاكفوت', hop:'لغة هوبي', com:'اللغة الكومانش', one:'أونيدا', ono:'لغة أونونداغا', win:'لغة هو تشانك', cro:'لغة كرو', hai:'لغة هايدا', cic:'لغة تشيكاسو', ik:'الإنوبياقية', na:'اللغة النورية', luz:'لغة لور شمالية', es_bo:'الإسبانية (بوليفيا)', es_py:'الإسبانية الباراغوايية', es_pa:'الإسبانية البنمية', en_my:'الإنجليزية (ماليزيا)', pt_gw:'لغة الكريول الغينية', tsz:'لغة بوريبيتشا', nez:'لغة نيز بيرس', nv2:'الأباتشي الغربية', woe:'الوولياني', pmt:'لغة توموتوان', bin:'لغة إيدو', khw:'لغة خوار',  xav:'لغة خافانتي', ter:'لغة تيرينا', bor:'لغة بوروورو', trn:'لغة موخينو ترينيتاريو', ake:'لغة أكاواييو', aoc:'لغة بيمون', gun:'لغة مبيا جوراني',  zdj:'اللغة القمرية (شيكوموري)', ayl:'اللهجة الليبية', abv:'العربية البحرانية', afb:'اللهجة الخليجية', acw:'العربية العمانية', swb:'لغة ماهورية',  adx:'اللغة التبتية الأمدو', qxs:'لغة تشيانج الجنوبية', duu:'لغة درونغ', jya:'لغة سيتو رجيالرونج', ers:'لغة إرسو', bca:'لغة باي الوسطى', atb:'لغة زايوا', prk:'لغة بارواك واه', slr:'اللغة السالار', ybe:'اللغة الغربية يوغور', yuy:'اللغة اليوغورية الشرقية', mjg:'لغة منغور', sce:'لغة دونغشيانغ', peh:'اللغة البونان', bua:'لغة بوريات', cjs:'لغة شور', dlg:'اللغة الدولغانية', kdt:'لغة كوي', blk:'لغة باو', njo:'لغة آو ناغا', srb:'لغة سورا', kjg:'الخمو', mro:'لغة مرو', gon:'لغة غوندي', bfq:'لغة بادغا', som:'الصومالية', har:'الهرري',  es_pr:'الإسبانية (بورتوريكية)', es_do:'إسبانية (جمهورية الدومنيكان)', es_gt:'الإسبانية (غواتيمالا)', es_ec:'الإسبانية (الإكوادورية)', es_uy:'الإسبانية (الأوروغواي)', ar_sy:'العربية (السورية)', ar_ye:'العربية (اليمنية)', ar_dz:'العربية (اللهجة الجزائرية)', ar_sa:'العربية (المملكة العربية السعودية)', ar_lb:'العربية (اللبنانية)', en_wls:'اللغة الإنجليزية (الويلزية)', en_jam:'الإنجليزية (جامايكية)', en_ng:'اللغة الإنجليزية (نيجيريا)', en_ph:'الإنجليزية (الفلبين)', en_ke:'الإنجليزية (الكينية)', fr_sn:'الفرنسية (السنغالية)', fr_ci:'الفرنسية (الساحل العاجي)', fr_ht:'الفرنسية (الهايتية)', pt_mz:'برتغالية (موزمبيق)', pt_cv:'البرتغالية (كابو فيردي)',  nl_be:'هولندية (البلجيكية)', en_us:'الإنجليزية (الأمريكية)', en_ca:'الإنجليزية (الكندية)', en_za:'الإنجليزية (جنوب أفريقية)', de_ch:'ألمانية (السويسرية)', pt_ao:'undefined (الأنغولية)', es_ve:'undefined (الفنزويلية)', ca_va:'الفالنسية',  nan_pera:'الهوكين البيرناكان', zh_th:'الماندرين التايلندية', zh_tw:'الماندرين التايواني', nan_th:'التشاوتشو التايلندية', zh_us:'الماندرين الأمريكية', yue_us:'الكانتونية الأمريكية', dng:'الدنغانية', ko_hun:'هانجا-هون (القراءة الكورية الأصلية)', ja_kun:'القراءة اليابانية الأصلية (kun-yomi)', phm:'الهمونغ-ميين البدائية', pmgl:'المنغولية البدائية', ptai:'التايية البدائية', paa:'الأسترو-آسيوية البدائية', ptung:'التنغوسية البدائية', pja:'اليابانية البدائية', pko:'الكورية البدائية', ptb:'التبتو-البورمية البدائية', pst:'السينو-التبتية البدائية', ko_zai:'السينو-كورية للزينيتشي', bo_sino:'السينو-التبتية الحديثة', vi_ohan:'السينو-فيتنامية القديمة', ja_ojp:'السينو-يابانية القديمة', ko_mid:'الكورية الوسطى', sjo:'السيبية', nan_id:'الهوكين الإندونيسية', nan_my:'الهوكين الماليزية', nan_sg:'الهوكين السنغافورية', yue_mo:'الكانتونية الماكاوية', yue_hk:'الكانتونية الهونغ كونغية', zh_phagspa:'الصينية اليوانية (Phags-pa)', zh_yuan:'الماندرين اليواني', bca:'البايية (الوسطى)', ja: "اليابانية", ja_osa: "اليابانية (أوساكا)", ja_aom: "اليابانية (أوموري)", ja_oki: "الأوكيناوية", ja_hak: "اليابانية (هاكاتا)", ja_edo: "اليابانية (عصر إيدو)", ja_kanbun:'قراءة الكانبون اليابانية', ko: "الكورية", ko_kp: "الكورية (كوريا الشمالية)", ko_bus: "الكورية (بوسان)", zh:'صينية (ماندرين)', yue:'كانتونية', nan:'تايوانية', wuu:'الوو الشنغهائية', zh_song: "الصينية (الكلاسيكية)", zh_wenyan_edu:'الصينية الكلاسيكية (قراءة كانتونية)', vi:'الفيتنامية الشمالية', vi_c:'الفيتنامية الوسطى', vi_s:'الفيتنامية الجنوبية', vi_nom:'تشو نوم', vi_han:'القراءة الصينية-الفيتنامية للصينية الكلاسيكية', th:'تايلاندية', id:'إندونيسية', sa:'سنسكريتية', sa_edu:'السنسكريتية المنطوقة الحديثة', hi:'هندية', en: "الإنجليزية", en_aave: "الإنجليزية (AAVE)", en_south: "الإنجليزية (جنوب أمريكا)", en_app: "الإنجليزية (أبالاتشيا)", en_ie: "الإنجليزية (أيرلندية)", en_sco: "الإنجليزية (اسكتلندية)", en_yk: "الإنجليزية (يوركشاير)", en_ck: "الإنجليزية (كوكني)", de:'ألمانية', de_lut:'الألمانية العليا الحديثة المبكرة (عصر لوثر)', fr:'فرنسية', fr_class:'الفرنسية الكلاسيكية (القرن السابع عشر)', it:'إيطالية', it_dan:'الإيطالية (عصر دانتي)', es_eu:'إسبانية (أوروبا)', es_sgl:'الإسبانية في العصر الذهبي', es_mx:'إسبانية (المكسيك)', pt_eu:'برتغالية (أوروبا)', pt_br:'برتغالية (البرازيل)', la:'لاتينية', ru:'روسية', uk:'أوكرانية', ar: "العربية (الفصحى)", ar_qur:'العربية القرآنية', ar_eg: "العربية (المصرية)", he:'عبرية', he_mis:'العبرية المشنوية', sw:'سواحيلية', tr:'تركية', fa:'فارسية', fa_clas:'الفارسية (الكلاسيكية)', tl:'تاغالوغية', ga:'أيرلندية', eu:'باسكية', mn:'منغولية', my:'بورمية', am:'أمهرية', egy:'مصرية قديمة', ta:'تاميلية', hu:'مجرية', nl:'هولندية', pl:'بولندية', ms:'ملايوية', mg:'ملغاشية', cy:'ويلزية', fi:'فنلندية', ain:'أينوية', bn:'بنغالية', ur:'أردية', te:'تيلوغوية', jv:'جاوية', ko_jeju: "الجيجوية", ko_em: "الكورية (ما قبل الحديثة)", ka:'جورجية', el:'يونانية', el_grc: "اليونانية (القديمة)", el_kath:'اليونانية (الكاثاريفوسا)', nv:'نافاهو', qu:'كتشوية', mi:'ماورية', haw:'هاوايية', km:'خميرية', lo:'لاوية', yo:'يوروبية', zu:'زولوية', bo:'تبتية', xct_litpr:'التبتية الكلاسيكية الطقسية', hy:'أرمنية', hy_grab:'الأرمنية الكلاسيكية (غرابار)' , ja_kyo: "اليابانية (كيوتو)", ja_hir: "اليابانية (هيروشيما)", ja_mvi:'ميياكو', ja_rys:'يايياما', ar_lev: "العربية (الشامية)", ar_ma: "العربية (المغربية)", ar_gulf: "العربية (الخليجية)", zh_sc: "مندرين سيتشوان", zh_db: "مندرين الشمال الشرقي", nap:'نابولية', scn:'صقلية', de_gsw: "الألمانية (السويسرية)", fr_qc: "الفرنسية (كيبيك)", sco:'اسكتلندية', en_sg: "الإنجليزية (سنغافورة)", hwc:'كريول هاوايي', pcm:'بيدجن نيجيري', tpi:'توك بيسين', en_ang:'إنجليزية قديمة', sv:'سويدية', no:'نرويجية', si:'سنهالية', ro:'رومانية', cs:'تشيكية', ca:'كتالونية', da:'دنماركية', is:'آيسلندية', lt:'ليتوانية', sq:'ألبانية', mt:'مالطية', so:'صومالية', ml:'مالايالامية', pa:'بنجابية', ku:'كردية', ug:'أويغورية', kk:'كازاخية', ha:'هوسية', ig:'إيغبوية', eo:'إسبرانتو', tok:'توكي بونا', ht:'كريول هايتي', ps:'بشتوية', uz:'أوزبكية', mr:'ماراثية', gu:'غوجاراتية', kn:'كنادية', ne:'نيبالية', om:'أورومية', ti:'تغرينية', wo:'ولوفية', ln:'لينغالية', sn:'شونية', sr:'صربية', bg:'بلغارية', sk:'سلوفاكية', lv:'لاتفية', et:'إستونية', be:'بيلاروسية', yi:'يديشية', non:'نوردية قديمة', arc:'آرامية', cop:'قبطية', rom:'رومانية', br:'بريتونية', xh:'خوسية', lad:'لادينو', tlh:'كلينغون', jbo:'لوجبان', fj:'فيجية', sm:'ساموية', zh_han:'الصينية (هان)', zh_tang:'الصينية (تانغ)', ceb:'السيبوانية', su:'السوندانية', th_isan:'التايلاندية (إيسان)', es_co:'الإسبانية (كولومبيا)', es_cl:'الإسبانية (تشيلي)', gl:'الجاليقية', oc:'الأكسيتانية', fo:'الفاروية', jam:'الباتوا الجامايكية', pap:'البابيامنتو', gd: "الغيلية الاسكتلندية", sl: "السلوفينية", enm: "الإنجليزية الوسطى", en_em:'الإنجليزية الحديثة المبكرة', fr_ch: "الفرنسية (السويسرية)", to: "التونغية", se: "الصامية الشمالية", af: "الأفريكانية", akk: "الأكدية", ar_iq: "العربية (العراقية)", ar_sd: "العربية (السودانية)", ar_tn: "العربية (التونسية)", as: "الأسامية", az: "الأذربيجانية", bho: "البوجبورية", cdo: "المين الشرقية", chr: "الشيروكية", ckb: "الكردية (السورانية)", cu: "السلافية الكنسية القديمة", de_at: "الألمانية (النمساوية)", de_by: "الألمانية (البافارية)", en_au: "الإنجليزية (الأسترالية)", en_in: "الإنجليزية (الهندية)", es_an: "الإسبانية (الأندلسية)", es_ar: "الإسبانية (الأرجنتينية)", es_cu: "الإسبانية (الكوبية)", es_pe: "الإسبانية (البيروفية)", fr_af: "الفرنسية (الأفريقية)", fr_be: "الفرنسية (البلجيكية)", fy: "الفريزية", gn: "الغوارانية", got: "القوطية", hak_cn: "الهاكا", hit: "الحيثية", hmn: "الهمونغية", ii: "اليي (النوسو)", ilo: "الإيلوكانية", ine: "الهندية الأوروبية البدائية", iu: "الإنكتيتوتية", ja_heian: "اليابانية (عصر هييآن)", ko_yb: "الكورية (يانبيان)", ky: "القيرغيزية", mn_cn: "المغولية (منغوليا الداخلية)", mnc: "المانشو", myn: "المايا الكلاسيكية", nci: "الناهواتل الكلاسيكية", nds: "الألمانية المنخفضة", nn: "النرويجية (نينورسك)", ny: "التشيوا", or: "الأوريا", pi: "البالية", pi_edu:'البالية التعليمية (ثيرافادا)', rm: "الرومانشية", rw: "الكينيارواندية", sc: "السردينية", sd: "السندية", sux: "السومرية", tg: "الطاجيكية", th_n: "التايلاندية (الشمالية)", th_s: "التايلاندية (الجنوبية)", tk: "التركمانية", vec: "البندقية", za: "الجوانغية", pau: "البالاوية", sah: 'الياقوتية', tyv: 'التوفية', kjh: 'الخاكاسية', alt: 'الألطاية', bxr: 'البوريتية', evn: 'الإيفنكية', eve: 'الإيفينية', yrk: 'النينتسية', kca: 'الخانتية', ckt: 'التشوكتشية', niv: 'النيفخية', ket: 'الكتية', cjy: 'الجين', hsn: 'الشيانغ', gan: 'الغان', mai: 'الميثيلية', awa: 'الأودية', skr: 'السرائيكية', sat: 'السانتالية', mad: 'المادورية', hil: 'الهيليغايونية', bal: 'البلوشية', ak: 'الأكانية (التوي)', mk: 'المقدونية', lg: 'اللوغندية', ki: 'الكيكويو', tn: 'التسوانية', st: 'السوتو الجنوبية', ts: 'التسونغية', ve: 'الفيندية', bem: 'البمبا', lua: 'اللوبا-كاساي', kg: 'الكونغوية', ff: 'الفولاوية', bm: 'البامبارا', kab: 'القبائلية', yua: 'المايا اليوكاتية', tzo: 'التسوتسيلية', mix: 'الميشتيكية', zap: 'الزابوتيكية', ay: 'الأيمارية', arn: 'المابوتشية', cr: 'الكرية (السهول)', oj: 'الأوجيبوية', lkt: 'اللاكوتية', kl: 'الغرينلاندية', ce: 'الشيشانية', inh: 'الإنغوشية', av: 'الأفارية', lez: 'اللزغية', dar: 'الدارغوية', lbe: 'اللاكية', tab: 'التبسرانية', ady: 'الأديغية', kbd: 'القباردية', ab: 'الأبخازية', xmf: 'المنغريلية', os: 'الأوسيتية', ty: 'التاهيتية', niu: 'النيوية', tvl: 'التوفالية', rap: 'الرابانوية', rar: 'ماورية جزر كوك', mh: 'المارشالية', gil: 'الكيريباتية', ch: 'التشامورو', tet: 'التيتومية', bi: 'البيسلامية', pjt: 'البيتجانتجاتجارية', wbp: 'الوارلبيرية', mni: 'الميتية', new: 'النوارية', brx: 'البودوية', lus: 'الميزوية', dz: 'الدزونغخا', min: 'الميناغكاباوية', ban: 'البالية', ace: 'الأشيهية', bug: 'البوغية', war: 'الوارية', bik: 'البيكولية الوسطى', tum: 'التومبوكا', din: 'الدنكاوية', nus: 'النويرية', luo: 'اللوية', mas: 'الماساي', aa: 'العفرية', shi: 'الشلحية', rif: 'التاريفيتية', mwr: 'المارواري', bgc: 'الهارياناوية', ks: 'الكشميرية', kok: 'الكونكانية', mnp: 'مين بي', nan_te: 'التيوتشيوية', yue_ts: 'التايشانية', czh: 'هوي', cnp: 'بينغ هوا', zh_jh: 'مندرين جيانغهوي', zh_tj: 'مندرين تيانجين', zh_lz: 'مندرين لانيين', dng: 'الدنغانية', hsb: 'الصوربية العليا', csb: 'الكاشوبية', fur: 'الفريولية', ast: 'الأستورية', an: 'الأراغونية', rup: 'الأرومانية', wa: 'الوالونية', udm: 'الأودمورتية', mhr: 'المارية المرجية', myv: 'الإرزيا', krl: 'الكاريلية', mzn: 'المازندرانية', glk: 'الجيلكية', lrc: 'اللورية', crh: 'التتارية القرمية', tt: 'التتارية', ba: 'الباشكيرية', krc: 'القراتشاي-بلقارية', ksw: 'الكارينية السغاوية', lhu: 'اللاهوية', lis: 'اللسوية', nxq: 'الناشية', shn: 'الشانية', ee: 'الإيوية', nyn: 'الرونيانكولية', luy: 'اللوهية', ssw: 'السوازية', nbl: 'الندبيلية الجنوبية', nso: 'السوتو الشمالية', fan: 'الفانغية', naq: 'الناما (الخويخوي)', hts: 'الهادزا', kr: 'الكنورية', men: 'الميندية', dyu: 'الديولا', syl: 'السلهتية', mag: 'المغهية', doi: 'الدوغرية', xkk: 'الخمو', moh: 'الموهوكية', cho: 'التشوكتو', esu: 'اليوبيكية الوسطى لألاسكا', ipk: 'الإنوبياقية', apw: 'الأباتشي الغربية', dak: 'الداكوتية', chy: 'الشايانية', lmo: 'اللومباردية', pms: 'البييمونتية', eml: 'الإميلية-الرومانية', mwl: 'الميراندية', pnt: 'اليونانية البنطية', hno: 'الهندكوية', bhb: 'البهيلية', cja: 'الشامية', hmo: 'الهيري موتو', pon: 'البوهنبية', vmw: 'الماكوية', dsb: 'الصوربية السفلى', gv: 'المانكية', kw: 'الكورنية', zza: 'الزازاكية', brh: 'البراهوية', mrq: 'الماركيزية', tiw: 'التيوية', guc: 'الواييوية', myp: 'البيراهوية', emp: 'الإمبيرا الشمالية', kpe: 'الكبيلية', loz: 'اللوزية', bbc: 'الباتاك توبا', bjn: 'البانجارية', sas: 'الساساكية', kha: 'الخاسية', mns: 'المانسية', mrw: 'المرناوية', tsg: 'التاوسوغية', yap: 'اليابية', chk: 'التشوكية', gbm: 'الغراوالية', kfy: 'الكوماونية', xnr: 'الكنغرية', hr: 'الكرواتية', bs: 'البوسنية', iba: 'الإيبانية', ljp: 'اللامبونغية', tzm: 'الأمازيغية الأطلسية الوسطى', ng: 'الندونغية', umb: 'الأمبوندو', kmb: 'الكيمبوندو', her: 'الهيريرو', xal: 'الكلموكية', sg: 'السانغو', toi: 'التونغية (زامبيا)', peo: 'الفارسية القديمة', ave: 'الأفستية', xto: 'التخارية أ', txb: 'التخارية ب', phn: 'الفينيقية', uga: 'الأوغاريتية', xlu: 'اللوية', pal: 'الفارسية الوسطى (البهلوية)', syc: 'السريانية الكلاسيكية', fro: 'الفرنسية القديمة', goh: 'الألمانية العليا القديمة', gez: 'الجعزية', gmy: 'اليونانية الميسينية', xct: 'التبتية الكلاسيكية', xpu: 'البونية', xhu: 'الحورية', elx: 'العيلامية', xsa: 'السبئية', kaw: 'الجاوية القديمة (كاوي)', kho: 'الختانية', gmh: 'الألمانية العليا الوسطى', osp: 'الإسبانية القديمة', okz: 'الخميرية القديمة', osx: 'الساكسونية القديمة', smg: 'السوكوما', mos: 'الموري', kln: 'الكالنجين', mfe: 'الكريولية الموريشيوسية', mnk: 'الماندينكا', bqi: 'البختيارية', unr: 'الموندارية', hoc: 'الهو', enq: 'الإنغا', xpr: 'البارثية', xqa: 'القره خانية', sga: 'الأيرلندية القديمة', bsk: 'البوروشسكية', yag: 'اليغنوبية', srn: 'السرانان تونغو', kwk: 'الكواكوالا', sad: 'الساندوية', pcc: 'البويية', iuu: 'الإيو ميان', hui: 'الهولي', tkl: 'التوكيلاوية', squ: 'السكوامية', mga: 'الأيرلندية الوسطى', hbo: 'العبرية الكتابية', mpt: 'الميان', ygr: 'اليغرية', quz: 'كيتشوا كوسكو', quy: 'كيتشوا أياكوتشو', cab: 'الغاريفونا', crx: 'الكاريير', tsi: 'الشيمشيانية الساحلية', wbl: 'الواخية', psi: 'البشائية', bgq: 'البغرية', ach: 'الأشولية', rki: 'الراخينية', kxm: 'الخميرية الشمالية', xng: 'المغولية الوسطى', ja_kg: 'اليابانية (كاغوشيما)', ja_sd: 'اليابانية (سنداي)', ko_hg: 'الكورية (هامغيونغ)', ko_jl: 'الكورية (جيولا)', nan_pn: 'الهوكينية في بينانغ', mra: 'الملابرية', wuu_nb: 'لهجة نينغبو', yue_gz: 'يوي غاوتشو', khb: 'التاي ليو', pam: 'الكابامبانغان', pag: 'البانغاسينان', mdh: 'الماغيندناوية', gor: 'الغورنتالوية', mak: 'الماكاسارية', fon: 'الفون', kri: 'الكريو', dag: 'الدغبانية', xog: 'السوغا', teo: 'الأتيسو', dyo: 'الديولا فوني', bci: 'الباولية', tcy: 'التولوية', haz: 'الهزاراگية', tly: 'التاليشية', kaa: 'القره قلباقية', bej: 'البيجاوية', tig: 'التغرية', ssy: 'الساهو', ewo: 'الإيوندو', bum: 'البولو', ndc: 'الندو', ote: 'الأوتومية', tar: 'التاراهومارا', och:'الصينية القديمة', ojp:'اليابانية القديمة', vsa:'السنسكريتية الفيدية', txg:'التانغوتية', sog:'السغدية', otk:'التركية القديمة', zkt:'الخيتانية', juc:'الجورتشينية', omx:'المون القديمة', pyx:'البيو', obr:'البورمية القديمة', occ:'الشام القديمة', orv:'السلافية الشرقية القديمة', xsc:'السكيثية', sukh:'التايلاندية القديمة (سوكوتاي)', xmr:'المروية', onw:'النوبية القديمة', cqu:'الكيتشوا الكلاسيكية', omc:'الموتشيكا', chb:'التشيبتشا', oma:'المالاوية القديمة', osu:'السوندية القديمة', otl:'التاغالوغية القديمة', ami:'الأميس', pwn:'البايوان', tay:'الأتايال', bnn:'البونون', trv:'التروكو/سيديك', tsu:'التسو', tao:'التاو (يامي)', hak_tw:'الهاكا التايوانية', wuu_sz:'وو سوتشو', wuu_wz:'وو ونتشو', nan_qz:'هوكين تشيوانتشو', nan_hai:'الهاينانية', zh_wh:'مندرين ووهان', zh_zz:'ماندرين تشونغ يوان', hak_hl:'هاكا هايلو', cpx:'بو-شيان مين', mfa:'الملايو الباتانية', mtq:'الموونغ', tyz:'التاي (فيتنام)', kjp:'الكارين البوو', kac:'الجينغبو (كاتشين)', wbm:'الوا', ahk:'الآخا', dtp:'الكدزن-دوسون', hne:"تشاتيسغرية", mnw:"مونية", grt:"غارو", nut:"نونغ", quc:"كيتشيʼ", kek:"كيكتشيʼ", mam:"مام", wal:"ولايتا", sid:"سيدامية", tji:"توجيا", nij:"نغاجو", sda:"توراجا-سعدان", arq:'العربية الجزائرية', mey:'العربية الحسانية', tmh:'تماشق (الطوارق)', azb:'الأذرية الجنوبية', gag:'اللغة الغاغوزية', sma:'السامية الجنوبية', vro:'لغة فورو', pjk:'البروتو-اليابانية الكورية', oko:'الكورية القديمة (سيلا)', okg:'لغة كوغوريو', ko_gor:'الكورية (كوريو)', ja_chu:'اليابانية الوسطى', pry:'البروتو-ريوكيوية', lld:'الرومانشية الدولوميتية', stq:'الفريزية الزاترلاندية', wym:'الفيميسورية', yuc:'اليوتشية', kgg:'الكوسوندية', ota:'التركية العثمانية', cmg:'المنغولية الكلاسيكية', ett:'الإتروسكانية', xht:'الحاتية', txr:'التارتيسية', roo:'الروتوكاس', nmn:'لغة التاآ', lbz:'لارديل', nny:'يانغكال', kky:'غوغو يميتير', blc:'نوكسالك', tue:'تويوكا', ncs:'لغة الإشارة النيكاراغوية', uby:'الأوبيخية', lbz_damin:'دامين'},
    he: { es_cr:'ספרדית (קוסטה ריקה)', es_hn:'ספרדית', es_ni:'ספרדית (ניקאראגווה)', es_sv:'ספרדית (אל סלוודור)', ar_jo:'ערבית ירדנית', ar_ps:'ערבית פלסטינית', fr_lu:'צרפתית', fr_cm:'צרפתית קמרונית', de_lu:'גרמנית (לוקסמבורגית)', en_ng2:'אנגלית (גאנה)', pt_mo:'פורטוגזית מקאו', lb:'לוקסמבורגית', gcr:'קריאול גויאנה הצרפתית', acf:'קריאולית סנט לוסיאנית',  gan_yc:'סינית גן (ניב יצ\'וון)', gan_ja:'גאן (ג\'יאן)', gan_fz:'גן (פוג\'ואו)', cjy_lv:'ג\'ין של לוליאנג', cjy_xz:'סיני ג\'ין (ניב שינג\'ו)', hsn_hy:'שיאנג (הנגיאנג)', hsn_yz:'שיאנג (ניב יונגג\'ואו)', czh_wy:'סינית הוויי (וויוואן)',  bla:'שפת בלקפוט', hop:'הופי', com:'שפת קומנצ\'י', one:'אונידה', ono:'שפת אונונדאגה', win:'שפת הו-צ\'אנק', cro:'שפת קרו', hai:'השפה ההייידה', cic:'שפת צ\'יקסו', ik:'אינופיאק', na:'נורית', luz:'לורי צפוני', es_bo:'ספרדית (בוליביה)', es_py:'ספרדית פרגוואית', es_pa:'ספרדית פנמית', en_my:'אנגלית (מלזיה)', pt_gw:'קריאולית גיניאה ביסאו', tsz:'שפת פורפצ\'ה', nez:'שפת ניז פרס', nv2:'אפאצ\'י מערבית', woe:'וולאיאית', pmt:'טואמוטואנית', bin:'שפת אדו', khw:'כוואר',  xav:'שאוונטה', ter:'טרינה', bor:'בורורו', trn:'שפת מוחניו טרינטריו', ake:'אקוואיו', aoc:'פמון', gun:'גוארני מביה',  zdj:'קומוראית (שיקומורי)', ayl:'ערבית לובית', abv:'ערבית בחריינית', afb:'ערבית גולף', acw:'ערבית עומאנית', swb:'מהורה',  adx:'טיבטית אמדו', qxs:'קיאנג דרומי', duu:'שפת דרונג', jya:'שפת סיטו רג\'יאלרונג', ers:'ארסו', bca:'בײ מרכזי', atb:'זייווה', prk:'שפת פראוק וא', slr:'סלארית', ybe:'יוגור מערבי', yuy:'יוגור מזרחי', mjg:'שפת מונגור', sce:'שפת דונגשיאנג', peh:'בונאן', bua:'בוריאטית', cjs:'שור', dlg:'דולגנית', kdt:'שפת קוי', blk:'שפת פאו', njo:'או נאגה', srb:'שפת סורה', kjg:'חמו', mro:'מרו', gon:'גונדית', bfq:'שפת בדגה', som:'סומלית', har:'הררי',  es_pr:'ספרדית (פוארטורית)', es_do:'ספרדית (הרפובליקה הדומיניקנית)', es_gt:'ספרדית (גואטמלה)', es_ec:'ספרדית (אקוודורית)', es_uy:'ספרדית (אורוגוואי)', ar_sy:'ערבית (סורית)', ar_ye:'ערבית (ימנית)', ar_dz:'ערבית (דיאלקט אלג\'יר)', ar_sa:'ערבית (ערב הסעודית)', ar_lb:'ערבית (לבנונית)', en_wls:'אנגלית (וולשית)', en_jam:'אנגלית (ג\'מייקנית)', en_ng:'אנגלית (ניגריה)', en_ph:'אנגלית (פיליפינית)', en_ke:'אנגלית (קנייה)', fr_sn:'צרפתית (סנגלית)', fr_ci:'צרפתית (קוט ד\'יבואר)', fr_ht:'צרפתית (האיטית)', pt_mz:'פורטוגזית (מוזמביק)', pt_cv:'פורטוגזית (כף ורדה)',  nl_be:'הולנדית (בלגית)', en_us:'אנגלית (אמריקאית)', en_ca:'אנגלית (קנדית)', en_za:'אנגלית (דרום אפריקאית)', de_ch:'גרמנית (שוויצרית)', pt_ao:'undefined (אנגולית)', es_ve:'undefined (ונצואלית)', ca_va:'ולנסית',  nan_pera:'הוקקיינית פרנקנית', zh_th:'מנדרינית תאילנדית', zh_tw:'מנדרינית טייוואנית', nan_th:'צ׳אוֹצ׳ו תאילנדית', zh_us:'מנדרינית אמריקאית', yue_us:'קנטונזית אמריקאית', dng:'דונגנית', ko_hun:'הנג׳ה-הון (קריאה קוריאנית מקומית)', ja_kun:'קונ-יומי (קריאה יפנית מקומית)', phm:'פרוטו המונג-מיין', pmgl:'פרוטו מונגולי', ptai:'פרוטו טאיי', paa:'פרוטו אוסטרואסיאתית', ptung:'פרוטו טונגוסית', pja:'פרוטו יפנית', pko:'פרוטו קוריאני', ptb:'פרוטו טיבטו-בורמית', pst:'פרוטו סינו-טיבטי', ko_zai:"סינו-קוריאנית של זיינצ'י", bo_sino:'סינו-טיבטית מודרנית', vi_ohan:'סינו-וייטנאמית עתיקה', ja_ojp:'סינו-יפנית עתיקה', ko_mid:'קוריאנית ביניימית', sjo:'סיבית', nan_id:'הוקקיינית אינדונזית', nan_my:'הוקקיינית מלזית', nan_sg:'הוקקיינית של סינגפור', yue_mo:'קנטונזית של מקאו', yue_hk:'קנטונזית של הונג קונג', zh_phagspa:'סינית יואן (Phags-pa)', zh_yuan:'מנדרינית יואן', bca:'באי (מרכזית)', ja:'יפנית', ja_osa:'ניב אוסקה', ja_aom:'ניב אאומורי', ja_oki:'אוקינאווית', ja_hak:'ניב הקאטה', ja_edo: "יפנית (תקופת אדו)", ja_kanbun:'קריאת קַנְבּוּן יפנית', ko:'קוריאנית', ko_kp: "צ'וסונמל (מונהוואו)", ko_bus:'ניב בוסאן', zh:'סינית (מנדרינית)', yue:'קנטונזית', nan:'טייוואנית', wuu:'וו של שנגחאי', zh_song:'סינית קלאסית', zh_wenyan_edu:'סינית קלאסית (קריאה קנטונית)', vi:'וייטנאמית צפונית', vi_c:'וייטנאמית מרכזית', vi_s:'וייטנאמית דרומית', vi_nom:"צ'ו נום", vi_han:"קריאה סינו-וייטנאמית של סינית קלאסית", th:'תאית', id:'אינדונזית', sa:'סנסקריט', sa_edu:'סנסקריט מדוברת מודרנית', hi:'הינדי', en:'אנגלית', en_aave: "אנגלית (AAVE)", en_south:'אנגלית (דרום ארה"ב)', en_app:'אנגלית (אפלצ\'יה)', en_ie:'אנגלית (אירית)', en_sco:'אנגלית (סקוטית)', en_yk:'אנגלית (יורקשייר)', en_ck:'אנגלית (קוקני)', de:'גרמנית', de_lut:'גרמנית עילית מודרנית מוקדמת (תקופת לותר)', fr:'צרפתית', fr_class:'צרפתית קלאסית (המאה ה-17)', it:'איטלקית', it_dan:'איטלקית (תקופת דנטה)', es_eu:'ספרדית (אירופה)', es_sgl:'ספרדית של תור הזהב', es_mx:'ספרדית (מקסיקו)', pt_eu:'פורטוגזית (אירופה)', pt_br:'פורטוגזית (ברזיל)', la:'לטינית', ru:'רוסית', uk:'אוקראינית', ar:'ערבית (ספרותית)', ar_qur:'ערבית קוראנית', ar_eg:'ערבית (מצרית)', he:'עברית', he_mis:'עברית משנאית', sw:'סווהילי', tr:'טורקית', fa:'פרסית', fa_clas:'פרסית (קלאסית)', tl:'טגלוג', ga:'אירית', eu:'בסקית', mn:'מונגולית', my:'בורמזית', am:'אמהרית', egy:'מצרית עתיקה', ta:'טמילית', hu:'הונגרית', nl:'הולנדית', pl:'פולנית', ms:'מלאית', mg:'מלגשית', cy:'וולשית', fi:'פינית', ain:'אינו', bn:'בנגלית', ur:'אורדו', te:'טלוגו', jv:'ג׳אוונית', ko_jeju:'ג׳ג׳ואית', ko_em: "קוריאנית (ראשית העת החדשה)", ka:'גאורגית', el:'יוונית', el_grc:'יוונית עתיקה', el_kath:"יוונית (קת'רבוסה)", nv:'נאוואחו', qu:'קצ׳ואה', mi:'מאורית', haw:'הוואית', km:'חמרית', lo:'לאוסית', yo:'יורובה', zu:'זולו', bo:'טיבטית', xct_litpr:'טיבטית קלאסית ליטורגית', hy:'ארמנית', hy_grab:'ארמנית קלאסית (גראבאר)' , ja_kyo:'ניב קיוטו', ja_hir:'ניב הירושימה', ja_mvi:'מיאקו', ja_rys:'יאאיאמה', ar_lev:'ערבית (לבנטינית)', ar_ma:'ערבית (מרוקאית)', ar_gulf:'ערבית (מפרצית)', zh_sc:'סצ\'ואנית', zh_db:'מנדרינית צפון-מזרחית', nap:'נאפוליטנית', scn:'סיציליאנית', de_gsw:'גרמנית שוויצרית', fr_qc:'צרפתית קוויבקית', sco:'סקוטית', en_sg:'סינגליש', hwc:'קריאולית הוואית', pcm:'פידג\'ין ניגרי', tpi:'טוק פיסין', en_ang:'אנגלית עתיקה', sv:'שוודית', no:'נורווגית', si:'סינהלית', ro:'רומנית', cs:'צ׳כית', ca:'קטלאנית', da:'דנית', is:'איסלנדית', lt:'ליטאית', sq:'אלבנית', mt:'מלטזית', so:'סומלית', ml:'מלאיאלאם', pa:'פנג׳אבית', ku:'כורדית', ug:'אויגורית', kk:'קזחית', ha:'האוסה', ig:'איגבו', eo:'אספרנטו', tok:'טוקי פונה', ht:'קריאולית האיטית', ps:'פשטו', uz:'אוזבקית', mr:'מראטהי', gu:'גוג׳ראטי', kn:'קאנאדה', ne:'נפאלית', om:'אורומו', ti:'תגרינית', wo:'וולוף', ln:'לינגלה', sn:'שונה', sr:'סרבית', bg:'בולגרית', sk:'סלובקית', lv:'לטבית', et:'אסטונית', be:'בלארוסית', yi:'יידיש', non:'נורדית עתיקה', arc:'ארמית', cop:'קופטית', rom:'רומאני', br:'ברטונית', xh:'קוסה', lad:'לאדינו', tlh:'קלינגון', jbo:'לוז׳באן', fj:'פיג׳ית', sm:'סמואית', zh_han:'סינית (האן)', zh_tang:'סינית (טאנג)', ceb:'סבואנו', su:'סונדנזית', th_isan:'תאית (איסאן)', es_co:'ספרדית (קולומביה)', es_cl:'ספרדית (צ\'ילה)', gl:'גליסית', oc:'אוקסיטנית', fo:'פארואזית', jam:'פטואה ג\'מייקנית', pap:'פפיאמנטו', gd: "גאלית סקוטית", sl: "סלובנית", enm: "אנגלית תיכונה", en_em:'אנגלית מודרנית מוקדמת', fr_ch: "צרפתית (שוויצרית)", to: "טונגית", se: "סאמית צפונית", af: "אפריקאנס", akk: "אכדית", ar_iq: "ערבית (עיראקית)", ar_sd: "ערבית (סודנית)", ar_tn: "ערבית (תוניסאית)", as: "אסאמית", az: "אזרית", bho: "בהוג'פורי", cdo: "מין מזרחית", chr: "צ'ירוקי", ckb: "כורדית (סוראני)", cu: "סלאבית כנסייתית עתיקה", de_at: "גרמנית (אוסטרית)", de_by: "גרמנית (בווארית)", en_au: "אנגלית (אוסטרלית)", en_in: "אנגלית (הודית)", es_an: "ספרדית (אנדלוסית)", es_ar: "ספרדית (ארגנטינאית)", es_cu: "ספרדית (קובנית)", es_pe: "ספרדית (פרואנית)", fr_af: "צרפתית (אפריקאית)", fr_be: "צרפתית (בלגית)", fy: "פריזית", gn: "גוארני", got: "גותית", hak_cn: "הקא", hit: "חיתית", hmn: "המונג", ii: "יי (נוסו)", ilo: "אילוקנו", ine: "הודו-אירופית פרוטו", iu: "אינוקטיטוט", ja_heian: "יפנית (תקופת הייאן)", ko_yb: "קוריאנית (ינביאן)", ky: "קירגיזית", mn_cn: "מונגולית (מונגוליה הפנימית)", mnc: "מנצ'ורית", myn: "מאיה קלאסית", nci: "נאואטל קלאסית", nds: "גרמנית תחתית", nn: "נורווגית (נינושק)", ny: "צ'יצ'ווה", or: "אוריה", pi: "פאלי", pi_edu:'פאלי פדגוגית (תרוואדה)', rm: "רומאנש", rw: "קיניארואנדה", sc: "סרדית", sd: "סינדהית", sux: "שומרית", tg: "טג'יקית", th_n: "תאית (צפונית)", th_s: "תאית (דרומית)", tk: "תורכמנית", vec: "ונציאנית", za: "ז'ואנג", pau: "פלאואית", sah: 'יקוטית', tyv: 'טובאית', kjh: 'חקסית', alt: 'אלטאית', bxr: 'בוריאטית', evn: 'אוונקית', eve: 'אוונית', yrk: 'ננצית', kca: 'חנטית', ckt: "צ'וקצ'ית", niv: 'ניבחית', ket: 'קטית', cjy: "ג'ין", hsn: 'שיאנג', gan: 'גאן', mai: 'מאיתילית', awa: 'אוודהי', skr: 'סראיקית', sat: 'סנטאלית', mad: 'מדורית', hil: 'היליגאינון', bal: "בלוצ'ית", ak: 'אקאן (טווי)', mk: 'מקדונית', lg: 'לוגנדה', ki: 'קיקויו', tn: 'טסוואנה', st: 'סוטו דרומית', ts: 'טסונגה', ve: 'וונדה', bem: 'במבה', lua: 'לובה-קסאי', kg: 'קונגו', ff: 'פולה', bm: 'במברה', kab: 'קבילית', yua: 'מאיה יוקטקית', tzo: 'צוצילית', mix: 'מישטקית', zap: 'זאפוטקית', ay: 'איימרה', arn: "מאפוצ'ה", cr: 'קרי (המישורים)', oj: "אוג'יבווה", lkt: 'לקוטה', kl: 'גרינלנדית', ce: "צ'צ'נית", inh: 'אינגושית', av: 'אווארית', lez: 'לזגינית', dar: 'דרגווה', lbe: 'לאק', tab: 'טבסרנית', ady: 'אדיגית', kbd: 'קברדינית', ab: 'אבחזית', xmf: 'מגרלית', os: 'אוסטית', ty: 'טאהיטית', niu: 'ניואה', tvl: 'טובלואית', rap: 'רפנואית', rar: 'מאורית איי קוק', mh: 'מרשלית', gil: 'גילברטית', ch: "צ'מורו", tet: 'טטום', bi: 'בישלמה', pjt: "פיטג'נטג'טג'רה", wbp: 'וורלפירי', mni: 'מייטיי', new: 'נווארי', brx: 'בודו', lus: 'מיזו', dz: 'דזונגקה', min: 'מיננגקבאו', ban: 'בלית', ace: "אצ'ינית", bug: 'בוגיס', war: 'וואראי', bik: 'ביקול מרכזית', tum: 'טומבוקה', din: 'דינקה', nus: 'נואר', luo: 'לואו', mas: 'מאסאית', aa: 'עפר', shi: 'תאשלחית', rif: 'תאריפית', mwr: 'מארווארי', bgc: 'הרינווי', ks: 'קשמירית', kok: 'קונקני', mnp: 'מין ביי', nan_te: "טאוצ'ו", yue_ts: 'טאישאנית', czh: 'חוואי', cnp: 'פינגחווא', zh_jh: "מנדרינית ג'יאנגחואי", zh_tj: "מנדרינית טיאנג'ין", zh_lz: 'מנדרינית לאנייאן', dng: 'דונגאנית', hsb: 'סורבית עילית', csb: 'קשובית', fur: 'פריאולית', ast: 'אסטורית', an: 'אראגונית', rup: 'ארומנית', wa: 'וולונית', udm: 'אודמורטית', mhr: 'מארי הערבות', myv: 'ארזיה', krl: 'קרלית', mzn: 'מזנדרני', glk: 'גילקית', lrc: 'לורית', crh: 'טטארית קרים', tt: 'טטארית', ba: 'בשקירית', krc: "קרצ'אי-בלקרית", ksw: 'קארן סגאו', lhu: 'להו', lis: 'ליסו', nxq: 'נאשי', shn: 'שאן', ee: 'אווה', nyn: 'ניאנקולה', luy: 'לוהיה', ssw: 'סוואזית', nbl: 'נדבלה דרומית', nso: 'סוטו צפונית', fan: 'פאנג', naq: 'נאמה (חוקואה)', hts: 'הדזה', kr: 'קנורי', men: 'מנדה', dyu: 'דיולה', syl: 'סילהטית', mag: 'מגאהי', doi: 'דוגרי', xkk: 'חמו', moh: 'מוהוק', cho: "צ'וקטו", esu: 'יופיק מרכז אלסקה', ipk: 'אינופיאק', apw: "אפאצ'י מערבית", dak: 'דקוטה', chy: 'שאיין', lmo: 'לומברדית', pms: 'פיימונטית', eml: 'אמיליאנית-רומאנית', mwl: 'מירנדית', pnt: 'יוונית פונטית', hno: 'הינדקו', bhb: 'בהילי', cja: "צ'אם", hmo: 'הירי מוטו', pon: 'פוהנפיי', vmw: 'מחוואית', dsb: 'סורבית תחתית', gv: 'מאנקס', kw: 'קורנית', zza: 'זאזה', brh: 'בראהוי', mrq: 'מרקיזית', tiw: 'טיווי', guc: 'וואיו', myp: 'פיראהא', emp: 'אמברה צפונית', kpe: 'קפלה', loz: 'לוזי', bbc: 'בטק טובה', bjn: "בנג'ארית", sas: 'ססקית', kha: 'חסי', mns: 'מאנסי', mrw: 'מרנאו', tsg: 'טאוסוג', yap: 'יאפית', chk: "צ'וק", gbm: 'גרהוואלי', kfy: 'קומאוני', xnr: 'קנגרי', hr: 'קרואטית', bs: 'בוסנית', iba: 'איבן', ljp: 'לאמפונג', tzm: 'תמאזיגת אטלס המרכזי', ng: 'נדונגה', umb: 'אומבונדו', kmb: 'קימבונדו', her: 'הררו', xal: 'קלמיקית', sg: 'סנגו', toi: 'טונגה (זמביה)', peo: 'פרסית עתיקה', ave: 'אווסטית', xto: 'תוכרית א', txb: 'תוכרית ב', phn: 'פניקית', uga: 'אוגריתית', xlu: 'לוּוית', pal: 'פרסית תיכונה (פהלוית)', syc: 'סורית קלאסית', fro: 'צרפתית עתיקה', goh: 'גרמנית עליונה עתיקה', gez: 'געז', gmy: 'יוונית מיקנית', xct: 'טיבטית קלאסית', xpu: 'פונית', xhu: 'חורית', elx: 'עילמית', xsa: 'סבאית', kaw: 'יוואית עתיקה (קאווי)', kho: 'חוטאנית', gmh: 'גרמנית עליונה תיכונה', osp: 'ספרדית עתיקה', okz: 'חמרית עתיקה', osx: 'סקסונית עתיקה', smg: 'סוקומה', mos: 'מורה', kln: "קלנג'ין", mfe: 'קריאולית מאוריציאנית', mnk: 'מנדינקה', bqi: 'בכתיארית', unr: 'מונדארית', hoc: 'הו', enq: 'אנגה', xpr: 'פרתית', xqa: 'קראחנידית', sga: 'אירית עתיקה', bsk: 'בורושסקית', yag: 'יגנובית', srn: 'סראנאן טונגו', kwk: 'קווקוואלה', sad: 'סנדאווה', pcc: 'בויאית', iuu: 'איו מין', hui: 'הולי', tkl: 'טוקלאוית', squ: 'סקוואמיש', mga: 'אירית תיכונה', hbo: 'עברית מקראית', mpt: 'מיאן', ygr: 'יגארית', quz: "קצ'ואה קוסקו", quy: "קצ'ואה איאקוצ'ו", cab: 'גריפונה', crx: 'קאריאר', tsi: "צ'ימשיאן חופית", wbl: 'ואחית', psi: 'פשאי', bgq: 'בגרי', ach: "אצ'ולי", rki: 'ראקין', kxm: 'חמרית הצפונית', xng: 'מונגולית התיכונה', ja_kg: 'יפנית (קגושימה)', ja_sd: 'יפנית (סנדאי)', ko_hg: 'קוריאנית (המגיונג)', ko_jl: "קוריאנית (ג'ולה)", nan_pn: 'הוקיין פנאנג', mra: 'מלאברי', wuu_nb: 'נינגבו', yue_gz: "יו של גאוג'ואו", khb: 'תאי לו', pam: 'קפמפנגן', pag: 'פנגסיננית', mdh: 'מגינדנאו', gor: 'גורונטאלו', mak: 'מקסר', fon: 'פון', kri: 'קריאו', dag: 'דגבני', xog: 'סוגה', teo: 'אטסו', dyo: 'דיולה-פוני', bci: 'באולה', tcy: 'טולו', haz: 'הזרגית', tly: 'טאלישית', kaa: 'קרקלפקית', bej: "בג'ה", tig: 'תיגרה', ssy: 'סאהו', ewo: 'אוונדו', bum: 'בולו', ndc: 'נדאו', ote: 'אוטומי', tar: 'תרהומרה', och:'סינית עתיקה', ojp:'יפנית עתיקה', vsa:'סנסקריט וודית', txg:'טנגוטית', sog:'סוגדית', otk:'טורקית עתיקה', zkt:'ח\'יתאנית', juc:'ג\'ורצ\'נית', omx:'מון עתיקה', pyx:'פיו', obr:'בורמזית עתיקה', occ:'צ\'אם עתיקה', orv:'סלאבית מזרחית עתיקה', xsc:'סקיתית', sukh:'תאית עתיקה (סוחותאי)', xmr:'מרואית', onw:'נובית עתיקה', cqu:'קצ\'ואה קלאסית', omc:'מוצ\'יקה', chb:'צ\'יבצ\'ה', oma:'מלאית עתיקה', osu:'סונדאית עתיקה', otl:'טאגאלוגית עתיקה', ami:'אמיס', pwn:'פאיוואן', tay:'אטאיאל', bnn:'בונון', trv:'טרוקו/סדיק', tsu:'צאו', tao:'טאו (יאמי)', hak_tw:'הקה טייוואנית', wuu_sz:'וו של סוז״ו', wuu_wz:'וו של וונז״ו', nan_qz:'הוקיין צ״ואנז״ו', nan_hai:'הייננית', zh_wh:'מנדרינית ווהאן', zh_zz:'מנדרינית ז״ונגיואן', hak_hl:'הקה היילו', cpx:'פו-שיאן מין', mfa:'מלאית פאטאני', mtq:'מואונג', tyz:'טאי (וייטנאם)', kjp:'פוו קארן', kac:'ג׳ינגפו (קאצ׳ין)', wbm:'ווה', ahk:'אקה', dtp:'קדזן-דוסון', hne:"צ׳הטיסגארהי", mnw:"מון", grt:"גארו", nut:"נונג", quc:"קיצ'ה", kek:"קקצ'י", mam:"מאם", wal:"וולייטה", sid:"סידמו", tji:"טוג׳יה", nij:"נגאג׳ו", sda:"טוראג׳ה-סא'דאן", arq:"ערבית אלג'יראית", mey:'ערבית חסאנייה', tmh:'תמאשק (טוארג)', azb:"אזרבייג'נית דרומית", gag:'גגאוזית', sma:'סאמית דרומית', vro:'ווֹרוֹ', pjk:'פרוטו-יפנית-קוריאנית', oko:'קוריאנית עתיקה (סילה)', okg:'גוגוריאו', ko_gor:'קוריאנית (גוריאו)', ja_chu:'יפנית של ימי הביניים', pry:'פרוטו-ריוקיו', lld:'לדינית דולומיטית', stq:'פריזית סאטרלנד', wym:'וימיסוריס', yuc:'יוצ׳י', kgg:'קוסונדה', ota:'טורקית עות׳מאנית', cmg:'מונגולית קלאסית', ett:'אטרוסקית', xht:'חטית', txr:'טרטסית', roo:'רוטוקאס', nmn:'טאא', lbz:'לרדיל', nny:'יאנגקאל', kky:'גוגו ימיתיר', blc:'נוקסלק', tue:'טויוקה', ncs:'שפת הסימנים הניקרגואית', uby:'אוביכית', lbz_damin:'דמין'},
    sw: { es_cr:'Kihispania (Costa Rica)', es_hn:'Kispanya', es_ni:'Kihispania (Nikaragua)', es_sv:'Kihispania (El Salvador)', ar_jo:'Kiarabu cha Urduni', ar_ps:'Kiarabu cha Palestina', fr_lu:'Kifaranga', fr_cm:'Kifaranga cha Kameruni', de_lu:'Kijerumani (Kiluksemburgo)', en_ng2:'Kiingereza (Ghana)', pt_mo:'Kiifaranga cha Macau', lb:'Kiluxemburg', gcr:'Kikreoli cha Guyana ya Ufaransa', acf:'Kikreoli cha Saint Lucia',  gan_yc:'Kichina cha Gan (Kichina cha Yichun)', gan_ja:'Kigan (Jiʼan)', gan_fz:'Kigani (Fuzhou)', cjy_lv:'Kijin cha Lüliang', cjy_xz:'Kichina cha Jin (lahaja ya Xinzhou)', hsn_hy:'Kixiang (Hengyang)', hsn_yz:'Kichina cha Xiang (lahaja ya Yongzhou)', czh_wy:'Kichina Hui (Wuyuan)',  bla:'Lugha ya Blackfoot', hop:'Hopi', com:'Kkomanche', one:'Kieida', ono:'Onondaga', win:'Ho-Chunk', cro:'Kingereza cha Crow', hai:'Kihaid', cic:'Chickasaw', ik:'Kiinupiaq', na:'Kinauruan', luz:'Luri Kaskazini', es_bo:'Kihispania (Bolivia)', es_py:'Kihispania cha Paraguay', es_pa:'Kispania cha Panama', en_my:'Kiingereza (Malesia)', pt_gw:'Kikreoli cha Guinea-Bissau', tsz:'Lugha ya Purépecha', nez:'Kinezpersian', nv2:'Kiapache cha Magharibi', woe:'Kiwoleai', pmt:'Kituamotu', bin:'Kiedo', khw:'Khowar',  xav:'Xavante', ter:'Kiswahili cha Terena', bor:'Kibororo', trn:'Lugha ya Mojeño Trinitario', ake:'Lugha ya Akawaio', aoc:'Kipemón', gun:'Kigurarani cha Mbyá',  zdj:'Kikimaore / Shikomori', ayl:'Kiarabu cha Libya', abv:'Kiarabu cha Bahrain', afb:'Kiarabu cha Khaliji', acw:'Kiarabu cha Oman', swb:'Shimaore',  adx:'Kiamdo cha Kitibechi', qxs:'Kichiang cha Kusini', duu:'Kidrung', jya:'Lugha ya Situ rGyalrong', ers:'Kiersu', bca:'Bai Kati', atb:'Kizaiwa', prk:'Kiparauk Wa', slr:'Kisalar', ybe:'Yugur wa Magharibi', yuy:'Kiyugur cha Mashariki', mjg:'Lugha ya Monguor', sce:'Lugha ya Dongxiang', peh:'Kibonan', bua:'Lugha ya Kiburyati', cjs:'Kishora', dlg:'Kldolgan', kdt:'Kuy', blk:'Lugha ya Pa\'O', njo:'Kioo naga', srb:'Lugha ya Sora', kjg:'Kikhmu', mro:'Kiamru', gon:'Kingondi', bfq:'Lugha ya Badaga', som:'Somali', har:'Kiharari',  es_pr:'Kispania (Kipeuto-Riko)', es_do:'Kihispania (Jamhuri ya Dominika)', es_gt:'Kihispania (Guatemala)', es_ec:'Kihispania (Kiingereza cha Ecuador)', es_uy:'Kispania (Uruguay)', ar_sy:'Kiarabu (Kusyria)', ar_ye:'Kiarabu (Kiyemeni)', ar_dz:'Kiarabu (Kialjeriya)', ar_sa:'Kiarabu (Saudi Arabia)', ar_lb:'Kiarabu (Libani)', en_wls:'Kiingereza (Kiwelshi)', en_jam:'Kiingereza (Jamaica)', en_ng:'Kiingereza (Nigeria)', en_ph:'Kiingereza (Ufilipino)', en_ke:'Kiingereza (Kinjenya)', fr_sn:'Kifaranga (Kisenegal)', fr_ci:'Kifaransa (Côte d\'Ivoire)', fr_ht:'Kifaranga (Kihaiti)', pt_mz:'Kireno (Msumbiji)', pt_cv:'Kireno cha Ureno (Cape Verde)',  nl_be:'Kiholanzi (Ubelgiji)', en_us:'Kiingereza (Marekani)', en_ca:'Kiingereza (Kanada)', en_za:'Kiingereza (Afrika Kusini)', de_ch:'Kijerumani (Uswisi)', pt_ao:'undefined (Angola)', es_ve:'undefined (Venezuela)', ca_va:'Kivalensia',  nan_pera:'Kihokkien cha Peranakan', zh_th:'Kimandarini cha Thailand', zh_tw:'Kichina cha Taiwan', nan_th:'Teochew cha Thailand', zh_us:'Kimandarini cha Amerika', yue_us:'Kikanton cha Amerika', dng:'Kidongan', ko_hun:'Hanja-hun (usomaji wa asili wa Kikorea)', ja_kun:'Kun-yomi (usomaji wa asili wa Kijapani)', phm:'Prohmong-Mien', pmgl:'Promongoli', ptai:'Protai', paa:'Proaustroasia', ptung:'Pratungus', pja:'Projapani', pko:'Prokorea', ptb:'Prototibetobirma', pst:'Protosinotibet', ko_zai:'Sinokoria cha Zainichi', bo_sino:'Sinotibet cha Kisasa', vi_ohan:'Sinovietnam cha Kale', ja_ojp:'Sinojapani cha Kale', ko_mid:'Kikorea cha Kati', sjo:'Kisibe', nan_id:'Kihokkien cha Indonesia', nan_my:'Kihokkien cha Malaysia', nan_sg:'Kihokkien cha Singapore', yue_mo:'Kikanton cha Macau', yue_hk:'Kikanton cha Hong Kong', zh_phagspa:'Kichina cha Yuan (Phags-pa)', zh_yuan:'Kimandarini cha Yuan', bca:'Kibai (cha Kati)', ja:'Kijapani', ja_osa:'Lahaja ya Osaka', ja_aom:'Lahaja ya Aomori', ja_oki:'Kiokinawa', ja_hak:'Lahaja ya Hakata', ja_edo: "Kijapani (enzi ya Edo)", ja_kanbun:'Usomaji wa Kanbun (Kijapani)', ko:'Kikorea', ko_kp: "Kikorea (Korea Kaskazini)", ko_bus:'Lahaja ya Busan', zh:'Kichina (Mandarin)', yue:'Kikantoni', nan:'Kitaiwani', wuu:'Kiwu cha Shanghai', zh_song:'Kichina cha kale', zh_wenyan_edu:'Kichina cha Kale (usomaji wa Kikantoni)', vi:'Kivietinamu cha Kaskazini', vi_c:'Kivietinamu cha Kati', vi_s:'Kivietinamu cha Kusini', vi_nom: "Kivietnam (Chữ Nôm)", vi_han:'Usomaji wa Kichina-Kivietinamu (Kichina cha Kale)', th:'Kithai', id:'Kiindonesia', sa:'Kisanskriti', sa_edu:'Kisanskriti cha Kisasa cha Mazungumzo', hi:'Kihindi', en:'Kiingereza', en_aave: "Kiingereza (AAVE)", en_south:'Kiingereza (Kusini mwa Marekani)', en_app:'Kiingereza (Appalachia)', en_ie:'Kiingereza (Kiayalandi)', en_sco:'Kiingereza (Uskoti)', en_yk:'Kiingereza (Yorkshire)', en_ck:'Kiingereza (Cockney)', de:'Kijerumani', de_lut:'Kijerumani cha Juu Kipya cha Mapema (enzi ya Luther)', fr:'Kifaransa', fr_class:'Kifaransa cha Kale (karne ya 17)', it:'Kiitaliano', it_dan:'Kiitaliano (cha enzi ya Dante)', es_eu:'Kihispania (Ulaya)', es_sgl:'Kihispania cha Zama za Dhahabu', es_mx:'Kihispania (Meksiko)', pt_eu:'Kireno (Ulaya)', pt_br:'Kireno (Brazili)', la:'Kilatini', ru:'Kirusi', uk:'Kiukraini', ar:'Kiarabu (sanifu)', ar_qur:"Kiarabu cha Qur'ani", ar_eg:'Kiarabu (Misri)', he:'Kiebrania', he_mis:'Kiebrania cha Mishna', sw:'Kiswahili', tr:'Kituruki', fa:'Kiajemi', fa_clas:'Kiajemi (Cha Kale)', tl:'Kitagalog', ga:'Kiayalandi', eu:'Kibasque', mn:'Kimongolia', my:'Kiburma', am:'Kiamhari', egy:'Kimisri cha kale', ta:'Kitamil', hu:'Kihungari', nl:'Kiholanzi', pl:'Kipolandi', ms:'Kimalei', mg:'Kimalagasi', cy:'Kiwelshi', fi:'Kifinlandi', ain:'Kiainu', bn:'Kibengali', ur:'Kiurdu', te:'Kitelugu', jv:'Kijava', ko_jeju:'Kijeju', ko_em: "Kikorea (ya Kisasa cha Awali)", ka:'Kijojia', el:'Kigiriki', el_grc:'Kigiriki cha kale', el_kath:'Kigiriki (Katharevousa)', nv:'Kinavaho', qu:'Kikechua', mi:'Kimaori', haw:'Kihawai', km:'Kikhmeri', lo:'Kilao', yo:'Kiyoruba', zu:'Kizulu', bo:'Kitibeti', xct_litpr:'Kitibeti cha Kale (Liturujia)', hy:'Kiarmenia', hy_grab:'Kiarmenia cha Kale (Grabar)' , ja_kyo:'Lahaja ya Kyoto', ja_hir:'Lahaja ya Hiroshima', ja_mvi:'Kimiyako', ja_rys:'Kiyaeyama', ar_lev:'Kiarabu (Levanti)', ar_ma:'Kiarabu (Moroko)', ar_gulf:'Kiarabu (Ghuba)', zh_sc:'Kisichuan', zh_db:'Kimandarini cha Kaskazini-Mashariki', nap:'Kinapoli', scn:'Kisisilia', de_gsw:'Kijerumani cha Uswisi', fr_qc:'Kifaransa cha Quebec', sco:'Kiskoti', en_sg: "Kiingereza (Singapura)", hwc:'Krioli ya Hawaii', pcm:'Pidgin ya Nigeria', tpi:'Tok Pisin', en_ang:'Kiingereza cha Kale', sv:'Kiswidi', no:'Kinorwe', si:'Kisinhala', ro:'Kiromania', cs:'Kicheki', ca:'Kikatalani', da:'Kidenmaki', is:'Kiaisilandi', lt:'Kilithuania', sq:'Kialbania', mt:'Kimalta', so:'Kisomali', ml:'Kimalayalamu', pa:'Kipunjabi', ku:'Kikurdi', ug:'Kiuygur', kk:'Kikazaki', ha:'Kihausa', ig:'Kiigbo', eo:'Kiesperanto', tok:'Toki Pona', ht:'Krioli ya Haiti', ps:'Kipashto', uz:'Kiuzbeki', mr:'Kimarathi', gu:'Kigujarati', kn:'Kikannada', ne:'Kinepali', om:'Kioromo', ti:'Kitigrinya', wo:'Kiwolof', ln:'Kilingala', sn:'Kishona', sr:'Kiserbia', bg:'Kibulgaria', sk:'Kislovakia', lv:'Kilatvia', et:'Kiestonia', be:'Kibelarusi', yi:'Kiyidishi', non:'Kinordi cha Kale', arc:'Kiaramu', cop:'Kikopti', rom:'Kiromani', br:'Kibretoni', xh:'Kixhosa', lad:'Kiladino', tlh:'Kiklingon', jbo:'Kilojban', fj:'Kifiji', sm:'Kisamoa', zh_han:'Kichina (Han)', zh_tang:'Kichina (Tang)', ceb:'Kisebuano', su:'Kisunda', th_isan:'Kithai (Isan)', es_co:'Kihispania (Kolombia)', es_cl:'Kihispania (Chile)', gl:'Kigalisia', oc:'Kioksitani', fo:'Kifaroe', jam:'Kijamaika Patwah', pap:'Kipapiamento', gd: "Kigaeli cha Skotlandi", sl: "Kislovenia", enm: "Kiingereza cha Kati", en_em:'Kiingereza cha Kisasa cha Mapema', fr_ch: "Kifaransa (Uswisi)", to: "Kitonga", se: "Kisami cha Kaskazini", af: "Kiafrikaans", akk: "Kiakadi", ar_iq: "Kiarabu (Iraq)", ar_sd: "Kiarabu (Sudan)", ar_tn: "Kiarabu (Tunisia)", as: "Kiassam", az: "Kiazabajani", bho: "Kibhojpuri", cdo: "Kimin Mashariki", chr: "Kicherokee", ckb: "Kikurdi (Sorani)", cu: "Kislavoni cha Kale", de_at: "Kijerumani (Austria)", de_by: "Kijerumani (Bavaria)", en_au: "Kiingereza (Australia)", en_in: "Kiingereza (India)", es_an: "Kihispania (Andalusia)", es_ar: "Kihispania (Argentina)", es_cu: "Kihispania (Cuba)", es_pe: "Kihispania (Peru)", fr_af: "Kifaransa (Afrika)", fr_be: "Kifaransa (Ubelgiji)", fy: "Kifrisia", gn: "Kiguarani", got: "Kigothi", hak_cn: "Kihakka", hit: "Kihiti", hmn: "Kihmong", ii: "Kiyi (Nuosu)", ilo: "Kiilocano", ine: "Kihindi-Ulaya Asilia", iu: "Kiinuktitut", ja_heian: "Kijapani (enzi ya Heian)", ko_yb: "Kikorea (Yanbian)", ky: "Kikirigizi", mn_cn: "Kimongolia (Mongolia ya Ndani)", mnc: "Kimanchu", myn: "Kimaya cha Kale", nci: "Kinahuatl cha Kale", nds: "Kijerumani cha Chini", nn: "Kinorwe (Nynorsk)", ny: "Kichewa", or: "Kiodia", pi: "Kipali", pi_edu:'Kipali cha Kielimu (Theravada)', rm: "Kiromansh", rw: "Kinyarwanda", sc: "Kisardinia", sd: "Kisindhi", sux: "Kisumeri", tg: "Kitajiki", th_n: "Kithai (Kaskazini)", th_s: "Kithai (Kusini)", tk: "Kiturkmeni", vec: "Kiveneti", za: "Kizhuang", pau: "Kipalau", sah: 'Kisakha', tyv: 'Kituva', kjh: 'Kikhakas', alt: 'Kialtai', bxr: 'Kiburyat', evn: 'Kievenki', eve: 'Kieven', yrk: 'Kinenets', kca: 'Kikhanty', ckt: 'Kichukchi', niv: 'Kinivkh', ket: 'Kiket', cjy: 'Kijin', hsn: 'Kixiang', gan: 'Kigan', mai: 'Kimaithili', awa: 'Kiawadhi', skr: 'Kisaraiki', sat: 'Kisantali', mad: 'Kimadura', hil: 'Kihiligaynon', bal: 'Kibalochi', ak: 'Kiakan (Twi)', mk: 'Kimakedonia', lg: 'Kiganda', ki: 'Kikikuyu', tn: 'Kitswana', st: 'Kisotho cha Kusini', ts: 'Kitsonga', ve: 'Kivenda', bem: 'Kibemba', lua: 'Kiluba-Kasai', kg: 'Kikongo', ff: 'Kifula', bm: 'Kibambara', kab: 'Kikabyle', yua: 'Kimaya cha Yucatec', tzo: 'Kitzotzil', mix: 'Kimixtec', zap: 'Kizapotec', ay: 'Kiaymara', arn: 'Kimapuche', cr: 'Kicree (Tambarare)', oj: 'Kiojibwe', lkt: 'Kilakota', kl: 'Kigrinland', ce: 'Kichechen', inh: 'Kiingush', av: 'Kiavar', lez: 'Kilezgi', dar: 'Kidargwa', lbe: 'Kilak', tab: 'Kitabasaran', ady: 'Kiadyghe', kbd: 'Kikabardian', ab: 'Kiabkhaz', xmf: 'Kimingreli', os: 'Kiosseti', ty: 'Kitahiti', niu: 'Kiniue', tvl: 'Kituvalu', rap: 'Kirapanui', rar: 'Kimaori cha Visiwa vya Cook', mh: 'Kimarshall', gil: 'Kikiribati', ch: 'Kichamorro', tet: 'Kitetum', bi: 'Kibislama', pjt: 'Kipitjantjatjara', wbp: 'Kiwarlpiri', mni: 'Kimeitei', new: 'Kinewari', brx: 'Kibodo', lus: 'Kimizo', dz: 'Kidzongkha', min: 'Kiminangkabau', ban: 'Kibali', ace: 'Kiace', bug: 'Kibugis', war: 'Kiwaray', bik: 'Kibikol cha Kati', tum: 'Kitumbuka', din: 'Kidinka', nus: 'Kinuer', luo: 'Kiluo', mas: 'Kimasai', aa: 'Kiafar', shi: 'Kitashelhit', rif: 'Kitarifit', mwr: 'Kimarwari', bgc: 'Kiharyanvi', ks: 'Kikashmiri', kok: 'Kikonkani', mnp: 'Min Bei', nan_te: 'Kiteochew', yue_ts: 'Kitaishan', czh: 'Hui', cnp: 'Pinghua', zh_jh: 'Kimandarini cha Jianghuai', zh_tj: 'Kimandarini cha Tianjin', zh_lz: 'Kimandarini cha Lanyin', dng: 'Kidungan', hsb: 'Kisorbia cha Juu', csb: 'Kikashubia', fur: 'Kifriuli', ast: 'Kiasturia', an: 'Kiaragon', rup: 'Kiaromani', wa: 'Kiwallon', udm: 'Kiudmurt', mhr: 'Kimari cha Tambarare', myv: 'Kierzya', krl: 'Kikarelia', mzn: 'Kimazandarani', glk: 'Kigilaki', lrc: 'Kilori', crh: 'Kitatar cha Krimea', tt: 'Kitatar', ba: 'Kibashkir', krc: 'Kikarachay-Balkar', ksw: 'Kikaren cha Sgaw', lhu: 'Kilahu', lis: 'Kilisu', nxq: 'Kinaxi', shn: 'Kishan', ee: 'Kiewe', nyn: 'Kinyankole', luy: 'Kiluhya', ssw: 'Kiswati', nbl: 'Kindebele cha Kusini', nso: 'Kisotho cha Kaskazini', fan: 'Kifang', naq: 'Kinama (Khoekhoe)', hts: 'Kihadza', kr: 'Kikanuri', men: 'Kimende', dyu: 'Kidyula', syl: 'Kisylheti', mag: 'Kimagahi', doi: 'Kidogri', xkk: 'Kikhmu', moh: 'Kimohawk', cho: 'Kichoctaw', esu: 'Kiyupik cha Kati cha Alaska', ipk: 'Kiinupiaq', apw: 'Kiapache cha Magharibi', dak: 'Kidakota', chy: 'Kicheyenne', lmo: 'Kilombardia', pms: 'Kipiemonte', eml: 'Kiemiliano-Romanyolo', mwl: 'Kimiranda', pnt: 'Kigiriki cha Pontus', hno: 'Kihindko', bhb: 'Kibhili', cja: 'Kicham', hmo: 'Kihiri Motu', pon: 'Kipohnpei', vmw: 'Kimakhuwa', dsb: 'Kisorbia cha Chini', gv: 'Kimanx', kw: 'Kicornish', zza: 'Kizazaki', brh: 'Kibrahui', mrq: 'Kimarquesa', tiw: 'Kitiwi', guc: 'Kiwayuu', myp: 'Kipirahã', emp: 'Kiembera cha Kaskazini', kpe: 'Kikpelle', loz: 'Kilozi', bbc: 'Kibatak Toba', bjn: 'Kibanjar', sas: 'Kisasak', kha: 'Kikhasi', mns: 'Kimansi', mrw: 'Kimaranao', tsg: 'Kitausug', yap: 'Kiyap', chk: 'Kichuuk', gbm: 'Kigarhwali', kfy: 'Kikumaoni', xnr: 'Kikangri', hr: 'Kikroatia', bs: 'Kibosnia', iba: 'Kiiban', ljp: 'Kilampung', tzm: 'Kitamazight cha Atlas ya Kati', ng: 'Kindonga', umb: 'Kiumbundu', kmb: 'Kimbundu', her: 'Kiherero', xal: 'Kikalmyk', sg: 'Kisango', toi: 'Kitonga (Zambia)', peo: 'Kiajemi cha kale', ave: 'Kiavestiani', xto: 'Kitochari A', txb: 'Kitochari B', phn: 'Kifoinike', uga: 'Kiugarit', xlu: 'Kiluvian', pal: 'Kiajemi cha kati (Pahlavi)', syc: 'Kisuriani cha kale', fro: 'Kifaransa cha kale', goh: 'Kijerumani cha juu cha kale', gez: "Kige'ez", gmy: 'Kigiriki cha Kimycenae', xct: 'Kitibet cha kale cha kawaida', xpu: 'Kipuniki', xhu: 'Kihurri', elx: 'Kielami', xsa: 'Kisaba', kaw: 'Kijava cha kale (Kawi)', kho: 'Kikhotani', gmh: 'Kijerumani cha juu cha kati', osp: 'Kihispania cha kale', okz: 'Kikhmer cha kale', osx: 'Kisaxon cha kale', smg: 'Kisukuma', mos: 'Kimoore', kln: 'Kikalenjin', mfe: 'Kikreoli cha Mauritius', mnk: 'Kimandinka', bqi: 'Kibakhtiari', unr: 'Kimundari', hoc: 'Kiho', enq: 'Kienga', xpr: 'Kiparthi', xqa: 'Kikarakhanid', sga: 'Kiairishi cha kale', bsk: 'Kiburushaski', yag: 'Kiyagnobi', srn: 'Kisranan Tongo', kwk: 'Kikwakwala', sad: 'Kisandawe', pcc: 'Kibouyei', iuu: 'Kiumien', hui: 'Kihuli', tkl: 'Kitokelau', squ: 'Kisquamish', mga: 'Kiairishi cha kati', hbo: 'Kiebrania cha Kibiblia', mpt: 'Kimian', ygr: 'Kiyagaria', quz: 'Kikecha cha Cuzco', quy: 'Kikecha cha Ayacucho', cab: 'Kigarifuna', crx: 'Kicarrier', tsi: 'Kitsimshian cha pwani', wbl: 'Kiwakhi', psi: 'Kipashai', bgq: 'Kibagri', ach: 'Kiacholi', rki: 'Kirakhine', kxm: 'Kikhmer cha Kaskazini', xng: 'Kimongoli cha kati', ja_kg: 'Kijapani (Kagoshima)', ja_sd: 'Kijapani (Sendai)', ko_hg: 'Kikorea (Hamgyŏng)', ko_jl: 'Kikorea (Jeolla)', nan_pn: 'Kihokkien cha Penang', mra: 'Kimlabri', wuu_nb: 'Kiningbo', yue_gz: 'Kiyue cha Gaozhou', khb: 'Kitai Lue', pam: 'Kikapampangan', pag: 'Kipangasinan', mdh: 'Kimaguindanao', gor: 'Kigorontalo', mak: 'Kimakasari', fon: 'Kifon', kri: 'Kikrio', dag: 'Kidagbani', xog: 'Kisoga', teo: 'Kiateso', dyo: 'Kijola-Fonyi', bci: 'Kibaoulé', tcy: 'Kitulu', haz: 'Kihazaragi', tly: 'Kitalysh', kaa: 'Kikarakalpak', bej: 'Kibeja', tig: 'Kitigre', ssy: 'Kisaho', ewo: 'Kiewondo', bum: 'Kibulu', ndc: 'Kindau', ote: 'Kiotomi', tar: 'Kitarahumara', och:'Kichina cha Kale', ojp:'Kijapani cha Kale', vsa:'Kisanskriti cha Veda', txg:'Kitangut', sog:'Kisogdian', otk:'Kituruki cha Kale', zkt:'Kikhitan', juc:'Kijurchen', omx:'Kimon cha Kale', pyx:'Kipyu', obr:'Kiburma cha Kale', occ:'Kicham cha Kale', orv:'Kislav cha Mashariki cha Kale', xsc:'Kiskutia', sukh:'Kithai cha Kale (Sukhothai)', xmr:'Kimeroe', onw:'Kinubia cha Kale', cqu:'Kikechua cha Klassiki', omc:'Kimochica', chb:'Kichibcha', oma:'Kimalei cha Kale', osu:'Kisunda cha Kale', otl:'Kitagalog cha Kale', ami:'Kiamis', pwn:'Kipaiwan', tay:'Kiatayal', bnn:'Kibunun', trv:'Kitruku/Seediq', tsu:'Kitsou', tao:'Kitao (Yami)', hak_tw:'Kihakka cha Taiwan', wuu_sz:'Kiwu cha Suzhou', wuu_wz:'Kiwu cha Wenzhou', nan_qz:'Kihokkien cha Quanzhou', nan_hai:'Kihainan', zh_wh:'Kimandarini cha Wuhan', zh_zz:'Mandarin ya Zhongyuan', hak_hl:'Kihakka cha Hailu', cpx:'Min Pu-Xian', mfa:'Kimalayu cha Patani', mtq:'Kimuong', tyz:'Kitày', kjp:'Karen ya Pwo', kac:'Kijingpo (Kachin)', wbm:'Kiwa', ahk:'Kiakha', dtp:'Kikadazan-Dusun', hne:"Kichattisgarhi", mnw:"Kimon", grt:"Kigaro", nut:"Kinùng", quc:"Kʼiche", kek:"Qʼeqchi", mam:"Kimam", wal:"Kiwolaytta", sid:"Kisidamo", tji:"Kitujia", nij:"Kingaju", sda:"Kitoraja-Saʼdan", arq:'Kiarabu cha Algeria', mey:'Kiarabu cha Hassaniya', tmh:'Kituareki (Tamasheq)', azb:'Kiazerbaijani cha Kusini', gag:'Kigagauz', sma:'Kisami cha Kusini', vro:'Kivõro', pjk:'Proto-Kijaponi-Kikorea', oko:'Kikorea cha Kale (Silla)', okg:'Kigoguryeo', ko_gor:'Kikorea cha Goryeo', ja_chu:'Kijapani cha Kati', pry:'Proto-Kiryūkyū', lld:'Kiladini', stq:'Kifrisi cha Saterland', wym:'Kiwymysorys', yuc:'Kiyuchi', kgg:'Kikusunda', ota:'Kituruki cha Ottoman', cmg:'Kimongolia cha Kale', ett:'Kietruska', xht:'Kihati', txr:'Kitartessian', roo:'Kirotokas', nmn:'Kitaa', lbz:'Kilardil', nny:'Kiyangkaal', kky:'Kiguugu yimithirr', blc:'Kinuxalk', tue:'Kituyuca', ncs:'Lugha ya Ishara ya Nikaragua', uby:'Kiubykh', lbz_damin:'Kidamin'},
    yue: { es_cr:'西班牙語(哥斯達黎加)', es_hn:'西班牙話', es_ni:'西班牙語(尼加拉瓜)', es_sv:'西班牙文（薩爾瓦多）', ar_jo:'約旦阿拉伯語', ar_ps:'巴勒斯坦阿拉伯語', fr_lu:'法文', fr_cm:'喀麥隆法文', de_lu:'德語(盧森堡)', en_ng2:'英語（加納）', pt_mo:'澳門葡萄牙語', lb:'盧森堡語', gcr:'法屬圭亞那克裡奧爾語', acf:'聖露西亞克里奧爾語',  gan_yc:'贛語宜春方言', gan_ja:'吉安贛語', gan_fz:'贛語（撫州方言）', cjy_lv:'呂梁晉語', cjy_xz:'晉語（忻州方言）', hsn_hy:'衡陽湘語', hsn_yz:'湘語（永州片）', czh_wy:'徽語（婺源）',  bla:'黑脚語', hop:'霍皮語', com:'科曼切語', one:'奧奈達語', ono:'翁農達加語', win:'何邦克語', cro:'克羅語', hai:'海達語', cic:'切卡索語', ik:'伊努皮亞克語', na:'瑙魯語', luz:'北部盧里語', es_bo:'西班牙語(玻利維亞)', es_py:'巴拉圭西班牙語', es_pa:'巴拿馬西班牙語', en_my:'英語 (馬來西亞)', pt_gw:'幾內亞比紹克里奧爾語', tsz:'普雷佩查語', nez:'尼茲珀斯語', nv2:'西阿帕奇語', woe:'沃莱艾語', pmt:'圖阿莫圖語', bin:'埃多文', khw:'科瓦爾語',  xav:'夏萬特語', ter:'特雷納語', bor:'波羅羅語', trn:'特立尼塔里奧莫赫尼奧語', ake:'阿卡瓦約語', aoc:'佩蒙語', gun:'姆比亞瓜拉尼語',  zdj:'科摩羅語（希科莫里語）', ayl:'利比亞阿拉伯語', abv:'巴林阿拉伯語', afb:'灣岸阿拉伯語', acw:'阿曼阿拉伯語', swb:'毛里科摩里語',  adx:'安多藏語', qxs:'南川羌話', duu:'獨龍語', jya:'西圖嘉絨語', ers:'尔苏话', bca:'中央白話', atb:'載瓦語', prk:'巴饶克佤语', slr:'撒拉語', ybe:'西裕固語', yuy:'東裕固語', mjg:'土族話', sce:'東鄉語', peh:'保安語', bua:'布里亚特语', cjs:'肖爾語', dlg:'多爾干語', kdt:'古依語', blk:'帕欧語', njo:'敖人語', srb:'索拉語', kjg:'克木語', mro:'姆魯語', gon:'貢德語', bfq:'巴達加語', som:'索馬里語', har:'哈剌里語',  es_pr:'西班牙語(波多黎各)', es_do:'西班牙語(多米尼加共和國)', es_gt:'西班牙文（危地馬拉）', es_ec:'西班牙語(厄瓜多爾)', es_uy:'西班牙语(乌拉圭)', ar_sy:'阿拉伯語(敘利亞)', ar_ye:'阿拉伯語(葉門方言)', ar_dz:'阿拉伯文(阿爾及利亞方言)', ar_sa:'阿拉伯語(沙地阿拉伯)', ar_lb:'阿拉伯語(黎巴嫩)', en_wls:'英文(威爾斯)', en_jam:'英文(牙買加)', en_ng:'英文(尼日利亞)', en_ph:'英語(菲律賓)', en_ke:'英文(肯尼亞)', fr_sn:'法文(塞內加爾)', fr_ci:'法語(象牙海岸)', fr_ht:'法文(海地)', pt_mz:'葡萄牙語(莫桑比克)', pt_cv:'葡萄牙語（佛得角）',  nl_be:'荷蘭文(比利時)', en_us:'英語(美國)', en_ca:'英語(加拿大)', en_za:'英語(南非)', de_ch:'德語(瑞士)', pt_ao:'undefined(安哥拉)', es_ve:'undefined(委內瑞拉)', ca_va:'巴倫西亞語',  nan_pera:'峽海華人福建話(Baba)', zh_th:'泰國華人普通話', zh_tw:'台灣華語', nan_th:'泰國華人潮州話', zh_us:'美籍華人普通話', yue_us:'美籍華人粵語', dng:'東干語', ko_hun:'韓國語訓 (固有詞)', ja_kun:'訓讀 (日本固有詞)', phm:'原始苗瑤語', pmgl:'原始蒙古語', ptai:'原始台語', paa:'原始南亞語', ptung:'原始通古斯語', pja:'原始日語', pko:'原始韓語', ptb:'原始藏緬語', pst:'原始漢藏語', ko_zai:'在日韓國・朝鮮人漢字音', bo_sino:'現代藏語漢字音', vi_ohan:'古漢越音', ja_ojp:'上代日本漢字音', ko_mid:'中世韓國語', sjo:'錫伯語', nan_id:'印尼福建話 (棉蘭)', nan_my:'馬來西亞福建話', nan_sg:'新加坡福建話', yue_mo:'澳門粵語', yue_hk:'香港粵語', zh_phagspa:'元代漢語 (八思巴字)', zh_yuan:'元代官話 (中原音韻)', bca:'白語(中部)', ja: "日語(標準)", ja_osa: "日語 (大阪)", ja_aom: "日語 (青森)", ja_oki: "沖繩語", ja_hak: "日語 (博多)", ja_edo: "日語 (江戶時代)", ja_kanbun:'日式漢文訓讀', ko: "韓語(標準)", ko_kp: "朝鮮語(文化語)", ko_bus: "韓語 (釜山)", zh: "中文(普通話)", yue:'廣東話', nan:'台灣話', wuu:'上海吳語', zh_song: "中文 (宋明文言)", zh_wenyan_edu:'文言文(粵音)', vi:'北部越南話', vi_c:'中部越南話', vi_s:'南部越南話', vi_nom:'越南语(字喃)', vi_han:'越南漢文(漢越音)', th:'泰文', id:'印尼話', sa:'梵文', sa_edu:'現代口語梵語', hi:'印地話', en: "英語", en_aave: "英語 (AAVE)", en_south:'英文(美國南方)', en_app:'英文(阿巴拉契亞)', en_ie:'英文(愛爾蘭)', en_sco:'英文(蘇格蘭)', en_yk:'英文(約克郡)', en_ck:'英文(倫敦東區)', de: "德語", de_lut:'初期新高地德語(路德時代)', fr: "法語", fr_class:'古典法語(17世紀)', it:'意大利文', it_dan:'意大利語(但丁時代)', es_eu: "西班牙語(歐洲)", es_sgl:'黃金世紀西班牙語', es_mx: "西班牙語(墨西哥)", pt_eu: "葡萄牙語(歐洲)", pt_br: "葡萄牙語(巴西)", la:'拉丁文', ru:'俄文', uk:'烏克蘭文', ar: "阿拉伯語(標準)", ar_qur:'古蘭阿拉伯語', ar_eg: "阿拉伯語(埃及)", he:'希伯來文', he_mis:'米示拿希伯來語', sw:'斯瓦希里文', tr:'土耳其文', fa:'波斯文', fa_clas:'波斯語(古典)', tl:'他加祿文', ga:'愛爾蘭文', eu:'巴斯克文', mn:'蒙古文', my:'緬甸文', am:'阿姆哈拉文', egy:'古埃及文', ta:'泰米爾文', hu:'匈牙利文', nl:'荷蘭文', pl:'波蘭文', ms:'馬來文', mg:'馬達加斯加語', cy:'威爾斯語', fi:'芬蘭語', ain:'阿伊努語', bn:'孟加拉語', ur:'烏爾都語', te:'泰盧固語', jv:'爪哇語', ko_jeju: "濟州語", ko_em: "韓語 (近世)", ka:'格魯吉亞語', el:'希臘語', el_grc: "希臘語 (古代)", el_kath:'希臘語(卡薩雷沃沙)', nv:'納瓦霍語', qu:'克丘亞語', mi:'毛利語', haw:'夏威夷語', km:'高棉語', lo:'老撾語', yo:'約魯巴語', zu:'祖魯語', bo:'藏語', xct_litpr:'佛典誦念古典藏語', hy:'亞美尼亞語', hy_grab:'古典亞美尼亞語(格拉巴爾)' , ja_kyo: "日語 (京都)", ja_hir: "日語 (廣島)", ja_mvi:'宮古語', ja_rys:'八重山語', ar_lev: "阿拉伯語(黎凡特)", ar_ma: "阿拉伯語(摩洛哥)", ar_gulf: "阿拉伯語(海灣)", zh_sc:'四川官話', zh_db:'東北官話', nap:'那不勒斯語', scn:'西西里語', de_gsw: "德語(瑞士)", fr_qc: "法語(魁北克)", sco:'蘇格蘭語', en_sg: "英語 (新加坡)", hwc:'夏威夷克里奧爾', pcm:'尼日利亞皮欽語', tpi:'托克皮辛', en_ang:'古英語', sv:'瑞典語', no:'挪威語', si:'僧伽羅語', ro:'羅馬尼亞語', cs:'捷克語', ca:'加泰羅尼亞語', da:'丹麥語', is:'冰島語', lt:'立陶宛語', sq:'阿爾巴尼亞語', mt:'馬耳他語', so:'索馬里語', ml:'馬拉雅拉姆語', pa:'旁遮普語', ku:'庫爾德語', ug:'維吾爾語', kk:'哈薩克語', ha:'豪薩語', ig:'伊博語', eo:'世界語', tok:'道本語', ht:'海地克里奧爾語', ps:'普什圖語', uz:'烏茲別克語', mr:'馬拉地語', gu:'古吉拉特語', kn:'卡納達語', ne:'尼泊爾語', om:'奧羅莫語', ti:'提格利尼亞語', wo:'沃洛夫語', ln:'林加拉語', sn:'紹納語', sr:'塞爾維亞語', bg:'保加利亞語', sk:'斯洛伐克語', lv:'拉脫維亞語', et:'愛沙尼亞語', be:'白俄羅斯語', yi:'意第緒語', non:'古諾爾斯語', arc:'阿拉米語', cop:'科普特語', rom:'羅姆語', br:'布列塔尼語', xh:'科薩語', lad:'拉迪諾語', tlh:'克林貢語', jbo:'邏輯語', fj:'斐濟語', sm:'薩摩亞語', zh_han:'中文(漢代漢文)', zh_tang:'中文(唐代漢文)', ceb:'宿霧語', su:'巽他語', th_isan:'泰語(伊桑方言)', es_co:'西班牙語(哥倫比亞)', es_cl:'西班牙語(智利)', gl:'加利西亞語', oc:'奧克語', fo:'法羅語', jam:'牙買加帕特瓦', pap:'帕皮阿門托語', ko_yb:'延邊朝鮮語', mn_cn:'內蒙古蒙古語', za:'壯語', ii:'彝語', hmn:'苗語', mnc:'滿語', gd: "蘇格蘭蓋爾語", sl: "斯洛文尼亞語", enm: "中古英語", en_em:'早期現代英語', fr_ch: "法語(瑞士)", to: "湯加語", se: "北薩米語", af: "南非荷蘭語", akk: "阿卡德語", as: "阿薩姆語", az: "阿塞拜疆語", cdo: "閩東語", chr: "切羅基語", ckb: "庫爾德語(索拉尼)", cu: "古教會斯拉夫語", de_at: "德語(奧地利)", de_by: "德語(巴伐利亞)", es_an: "西班牙語(安達盧西亞)", es_cu: "西班牙語(古巴)", es_pe: "西班牙語(秘魯)", fr_af: "法語(非洲)", fr_be: "法語(比利時)", fy: "弗里西語", gn: "瓜拉尼語", got: "哥德語", hit: "赫梯語", hmn: "苗語", ii: "彝語(諾蘇)", ilo: "伊洛卡諾語", ine: "原始印歐語", iu: "因紐特語", ja_heian: "日語 (平安時代)", ky: "吉爾吉斯語", mnc: "滿洲語", myn: "古典瑪雅語", nci: "古典納瓦特爾語", nds: "低地德語", nn: "挪威語(新挪威語)", ny: "齊切瓦語", or: "奧里亞語", pi: "巴利語", pi_edu:'教學巴利語(上座部)', rm: "羅曼什語", rw: "盧安達語", sc: "撒丁語", sd: "信德語", sux: "蘇美爾語", tg: "塔吉克語", tk: "土庫曼語", vec: "威尼斯語", za: "壯語", bho: "博傑普爾語", th_s: "泰語(南部)", th_n: "泰語(北部)", ar_sd: "阿拉伯語(蘇丹)", ar_tn: "阿拉伯語(突尼西亞)", en_au: "英語(澳洲)", en_in: "英語(印度)", es_ar: "西班牙語(阿根廷)", ar_iq: "阿拉伯語(伊拉克)", hak_cn: "客家話", pau: "帛琉語", sah: '薩哈語', tyv: '圖瓦語', kjh: '哈卡斯語', alt: '阿爾泰語', bxr: '布里亞特語', evn: '埃文基語', eve: '埃文語', yrk: '涅涅茨語', kca: '漢特語', ckt: '楚科奇語', niv: '尼夫赫語', ket: '凱特語', cjy: '晉語', hsn: '湘語', gan: '贛語', mai: '邁蒂利語', awa: '阿瓦德語', skr: '西萊基語', sat: '桑塔利語', mad: '馬都拉語', hil: '希利蓋農語', bal: '俾路支語', ak: '阿坎語 (契維)', mk: '馬其頓語', lg: '盧干達語', ki: '基庫尤語', tn: '茨瓦納語', st: '塞索托語', ts: '聰加語', ve: '文達語', bem: '本巴語', lua: '盧巴-卡賽語', kg: '剛果語', ff: '富拉語', bm: '班巴拉語', kab: '卡比爾語', yua: '尤卡坦瑪雅語', tzo: '措齊爾語', mix: '米斯特克語', zap: '薩波特克語', ay: '艾馬拉語', arn: '馬普切語', cr: '克里語 (平原)', oj: '奧吉布瓦語', lkt: '拉科塔語', kl: '格陵蘭語', ce: '車臣語', inh: '印古什語', av: '阿瓦爾語', lez: '列茲金語', dar: '達爾金語', lbe: '拉克語', tab: '塔巴薩蘭語', ady: '阿迪格語', kbd: '卡巴爾達語', ab: '阿布哈茲語', xmf: '明格列爾語', os: '奧塞梯語', ty: '塔希提語', niu: '紐埃語', tvl: '圖瓦盧語', rap: '拉帕努伊語', rar: '庫克群島毛利語', mh: '馬紹爾語', gil: '基里巴斯語', ch: '查莫羅語', tet: '德頓語', bi: '比斯拉馬語', pjt: '皮詹查查拉語', wbp: '瓦爾皮里語', mni: '曼尼普爾語', new: '尼瓦爾語', brx: '波多語', lus: '米佐語', dz: '宗喀語', min: '米南加保語', ban: '峇里語', ace: '亞齊語', bug: '布吉語', war: '瓦雷語', bik: '中部比科爾語', tum: '通布卡語', din: '丁卡語', nus: '努爾語', luo: '盧奧語', mas: '馬賽語', aa: '阿法爾語', shi: '塔謝勒希特語', rif: '塔里菲特語', mwr: '馬爾瓦里語', bgc: '哈里亞納語', ks: '克什米爾語', kok: '貢根語', mnp: '閩北語', nan_te: '潮州話', yue_ts: '台山話', czh: '徽州語', cnp: '平話', zh_jh: '江淮官話', zh_tj: '天津官話', zh_lz: '蘭銀官話', dng: '東干語', hsb: '上索布語', csb: '卡舒比語', fur: '弗留利語', ast: '阿斯圖里亞斯語', an: '阿拉貢語', rup: '阿羅馬尼亞語', wa: '瓦隆語', udm: '烏德穆爾特語', mhr: '草地馬里語', myv: '埃爾茲亞語', krl: '卡累利阿語', mzn: '馬贊達蘭語', glk: '吉拉基語', lrc: '盧爾語', crh: '克里米亞韃靼語', tt: '韃靼語', ba: '巴什基爾語', krc: '卡拉恰伊-巴爾卡爾語', ksw: '斯戈克倫語', lhu: '拉祜語', lis: '傈僳語', nxq: '納西語', shn: '撣語', ee: '埃維語', nyn: '尼安科萊語', luy: '盧希亞語', ssw: '斯瓦蒂語', nbl: '南恩德貝勒語', nso: '北索托語', fan: '芳語', naq: '納馬語 (科伊科伊)', hts: '哈扎語', kr: '卡努里語', men: '門德語', dyu: '迪尤拉語', syl: '錫爾赫特語', mag: '摩揭陀語', doi: '多格拉語', xkk: '克木語', moh: '莫霍克語', cho: '喬克托語', esu: '中阿拉斯加尤皮克語', ipk: '伊努皮亞克語', apw: '西阿帕奇語', dak: '達科他語', chy: '夏延語', lmo: '倫巴第語', pms: '皮埃蒙特語', eml: '艾米利亞-羅馬涅語', mwl: '米蘭德斯語', pnt: '本都希臘語', hno: '印科語', bhb: '比爾語', cja: '占語', hmo: '希里莫圖語', pon: '波納佩語', vmw: '馬庫阿語', dsb: '下索布語', gv: '曼克斯語', kw: '康沃爾語', zza: '扎扎語', brh: '布拉灰語', mrq: '馬克薩斯語', tiw: '提維語', guc: '瓦尤語', myp: '皮拉罕語', emp: '北恩貝拉語', kpe: '克佩勒語', loz: '洛齊語', bbc: '托巴巴塔克語', bjn: '班賈爾語', sas: '薩薩克語', kha: '卡西語', mns: '曼西語', mrw: '馬拉瑙語', tsg: '陶蘇格語', yap: '雅浦語', chk: '楚克語', gbm: '加爾瓦爾語', kfy: '庫馬翁語', xnr: '康格里語', hr: '克羅地亞語', bs: '波斯尼亞語', iba: '伊班語', ljp: '楠榜語', tzm: '中阿特拉斯塔馬塞特語', ng: '恩東加語', umb: '翁本杜語', kmb: '金本杜語', her: '赫雷羅語', xal: '卡爾梅克語', sg: '桑戈語', toi: '通加語 (贊比亞)', peo: '古波斯語', ave: '阿維斯陀語', xto: '吐火羅語A', txb: '吐火羅語B', phn: '腓尼基語', uga: '烏加里特語', xlu: '盧維語', pal: '中古波斯語 (巴列維)', syc: '古典敘利亞語', fro: '古法語', goh: '古高地德語', gez: '吉茲語', gmy: '邁錫尼希臘語', xct: '古典藏語', xpu: '布匿語', xhu: '胡里語', elx: '埃蘭語', xsa: '薩巴語', kaw: '古爪哇語 (卡維)', kho: '于闐語', gmh: '中古高地德語', osp: '古西班牙語', okz: '古高棉語', osx: '古薩克森語', smg: '蘇庫馬語', mos: '莫雷語', kln: '卡倫金語', mfe: '毛里求斯克里奧爾語', mnk: '曼丁卡語', bqi: '巴赫蒂亞里語', unr: '蒙達里語', hoc: '霍語', enq: '恩加語', xpr: '帕提亞語', xqa: '喀喇汗語', sga: '古愛爾蘭語', bsk: '布魯沙斯基語', yag: '雅格諾比語', srn: '斯拉南通戈語', kwk: '夸夸嘉夸語', sad: '桑達韋語', pcc: '布依語', iuu: '優勉語', hui: '胡利語', tkl: '托克勞語', squ: '斯科米什語', mga: '中世紀愛爾蘭語', hbo: '聖經希伯來語', mpt: '米安語', ygr: '雅加利亞語', quz: '庫斯科克丘亞語', quy: '阿亞庫喬克丘亞語', cab: '加里富納語', crx: '卡里爾語', tsi: '沿岸欽西安語', wbl: '瓦罕語', psi: '帕沙伊語', bgq: '巴格里語', ach: '阿喬利語', rki: '若開語', kxm: '北部高棉語', xng: '中古蒙古語', ja_kg: '日語(鹿兒島)', ja_sd: '日語(仙台)', ko_hg: '朝鮮語(咸鏡)', ko_jl: '韓語(全羅)', nan_pn: '檳城福建話', mra: '姆拉布里語', wuu_nb: '寧波話', yue_gz: '高州粵語', khb: '傣仂語', pam: '卡邦邦幹語', pag: '潘加西楠語', mdh: '馬京達瑙語', gor: '哥倫打洛語', mak: '望加錫語', fon: '豐語', kri: '克里奧語', dag: '達班尼語', xog: '索加語', teo: '阿特索語', dyo: '迪奧拉-豐伊語', bci: '巴烏萊語', tcy: '圖盧語', haz: '哈扎拉吉語', tly: '塔雷什語', kaa: '卡拉卡爾帕克語', bej: '貝沙語', tig: '提格雷語', ssy: '薩霍語', ewo: '埃翁多語', bum: '布盧語', ndc: '恩道語', ote: '奧托米語', tar: '塔拉烏馬拉語', och:'上古漢語', ojp:'上古日語', vsa:'吠陀梵語', txg:'西夏語', sog:'粟特語', otk:'古突厥語', zkt:'契丹語', juc:'女真語', omx:'古孟語', pyx:'驃語', obr:'古緬語', occ:'古占語', orv:'古東斯拉夫語', xsc:'斯基泰語', sukh:'古泰語 (素可泰)', xmr:'麥羅埃語', onw:'古努比亞語', cqu:'古典克丘亞語', omc:'莫切語', chb:'奇布查語 (穆伊斯卡)', oma:'古馬來語', osu:'古巽他語', otl:'古他加祿語', ami:'阿美語', pwn:'排灣語', tay:'泰雅語', bnn:'布農語', trv:'太魯閣語', tsu:'鄒語', tao:'達悟語(雅美)', hak_tw:'台灣客家話', wuu_sz:'蘇州吳語', wuu_wz:'溫州吳語', nan_qz:'泉州閩南語', nan_hai:'海南話', zh_wh:'武漢官話', zh_zz:'中原官話', hak_hl:'海陸客家話', cpx:'莆仙話', mfa:'巴塔尼馬來語', mtq:'芒語', tyz:'岱依語', kjp:'勃歐克倫語', kac:'景頗語(克欽)', wbm:'佤語', ahk:'阿卡語', dtp:'卡達山-杜順語', hne:"恰蒂斯加爾語", mnw:"孟語", grt:"加羅語", nut:"儂語", quc:"基切語", kek:"克查語", mam:"瑪姆語", wal:"沃萊塔語", sid:"西達莫語", tji:"土家語", nij:"恩加朱語", sda:"薩丹托拉雅語", arq:'阿爾及利亞阿拉伯話', mey:'哈薩尼亞阿拉伯話', tmh:'塔馬謝克語(圖阿雷格)', azb:'南阿塞拜疆語', gag:'加告茲語', sma:'南薩米語', vro:'沃羅語', pjk:'原始日韓語', oko:'古代朝鮮語(新羅)', okg:'高句麗語', ko_gor:'高麗朝鮮語', ja_chu:'中世日語', pry:'原始琉球語', lld:'拉丁語', stq:'薩特蘭弗里斯語', wym:'維米索里斯語', yuc:'尤奇語', kgg:'庫孫達語', ota:'奧斯曼土耳其語', cmg:'古典蒙古語', ett:'伊特魯里亞語', xht:'哈梯語', txr:'塔爾特索斯語', roo:'羅托卡斯語', nmn:'塔阿語', lbz:'拉迪爾語', nny:'揚卡爾語', kky:'古古依米德希爾語', blc:'努哈爾克語', tue:'圖尤卡語', ncs:'尼加拉瓜手語', uby:'烏比赫語', lbz_damin:'達民 (拉迪爾儀禮語)'},
    vi: { es_cr:'Tiếng Tây Ban Nha (Costa Rica)', es_hn:'Tiếng Tây Ban Nha', es_ni:'Tiếng Tây Ban Nha (Nicaragua)', es_sv:'Tiếng Tây Ban Nha (El Salvador)', ar_jo:'Tiếng Ả Rập Jordani', ar_ps:'Tiếng Ả Rập Palestine', fr_lu:'Tiếng Pháp', fr_cm:'Tiếng Pháp Cameroon', de_lu:'Tiếng Đức (Luxembourg)', en_ng2:'Tiếng Anh (Ghana)', pt_mo:'Tiếng Bồ Đào Nha Macau', lb:'Tiếng Luxembourg', gcr:'Tiếng Creole Guyana Pháp', acf:'Tiếng Creole Saint Lucia',  gan_yc:'Tiếng Trung Quốc Gan (phương ngữ Duy Xuân)', gan_ja:'Tiếng Cám (Jiʼan)', gan_fz:'Tiếng Gan (Phúc Châu)', cjy_lv:'Tiếng Tấn Lữ Lương', cjy_xz:'Tiếng Trung Quốc Jin (phương ngữ Tân Châu)', hsn_hy:'Tiếng Tương (Hằng Dương)', hsn_yz:'Tiếng Xiang (phương ngữ Yongzhou)', czh_wy:'Tiếng Huy (Wuyuan)',  bla:'Tiếng Blackfoot', hop:'Tiếng Hopi', com:'Tiếng Comanche', one:'Tiếng Oneida', ono:'tiếng Onondaga', win:'Tiếng Ho-Chunk', cro:'Tiếng Crow', hai:'tiếng Haida', cic:'Tiếng Chickasaw', ik:'tiếng Inupiaq', na:'Tiếng Nauru', luz:'Tiếng Luri Bắc', es_bo:'Tiếng Tây Ban Nha (Bolivia)', es_py:'Tiếng Tây Ban Nha Paraguay', es_pa:'Tiếng Tây Ban Nha Panama', en_my:'Tiếng Anh (Malaysia)', pt_gw:'Tiếng Creole Guinea-Bissau', tsz:'Tiếng Purépecha', nez:'Tiếng Nez Perce', nv2:'tiếng Apache Tây', woe:'tiếng Woleai', pmt:'Tiếng Tuamotuan', bin:'Tiếng Edo', khw:'Tiếng Khowar',  xav:'Tiếng Xavante', ter:'Tiếng Terena', bor:'Tiếng Bororo', trn:'Tiếng Mojeño Trinitario', ake:'Tiếng Akawaio', aoc:'Tiếng Pemón', gun:'Tiếng Mbyá Guaraní',  zdj:'Tiếng Comoros (Shikomori)', ayl:'Tiếng Ả Rập Libya', abv:'Tiếng Ả Rập Bahrani', afb:'Tiếng Ả Rập vùng Vịnh', acw:'Tiếng Ả Rập Oman', swb:'Tiếng Mahorais',  adx:'Tiếng Tây Tạng Amdo', qxs:'tiếng Qiang phía nam', duu:'Tiếng Drung', jya:'Tiếng Situ rGyalrong', ers:'Tiếng Ersu', bca:'Tiếng Bai Trung tâm', atb:'Tiếng Zaiwa', prk:'Ngôn ngữ Parauk Wa', slr:'tiếng Salar', ybe:'Yugur Tây', yuy:'Tiếng Yugur Đông', mjg:'Tiếng Monguor', sce:'Tiếng Đông Tương', peh:'tiếng Bonan', bua:'Tiếng Buryat', cjs:'Tiếng Shor', dlg:'Tiếng Dolgan', kdt:'Tiếng Kuay', blk:'Tiếng Pa\'O', njo:'Tiếng Ao Naga', srb:'Tiếng Sora', kjg:'tiếng Khơ Mú', mro:'Tiếng Mru', gon:'Tiếng Gondi', bfq:'tiếng Badaga', som:'Tiếng Somali', har:'Tiếng Harari',  es_pr:'Tiếng Tây Ban Nha (Puerto Rico)', es_do:'Tiếng Tây Ban Nha (Cộng hòa Dominica)', es_gt:'Tiếng Tây Ban Nha (Guatemala)', es_ec:'Tiếng Tây Ban Nha (Ecuador)', es_uy:'Tiếng Tây Ban Nha (Uruguay)', ar_sy:'Tiếng Ả Rập (Syria)', ar_ye:'Tiếng Ả Rập (Yemen)', ar_dz:'Tiếng Ả Rập (Bình Luận Algeria)', ar_sa:'Tiếng Ả Rập (Ả Rập Xê-út)', ar_lb:'Tiếng Ả Rập (Liban)', en_wls:'tiếng Anh (xứ Wales)', en_jam:'Tiếng Anh (Jamaica)', en_ng:'Tiếng Anh (Nigeria)', en_ph:'Tiếng Anh (Philippines)', en_ke:'Tiếng Anh (Kenya)', fr_sn:'Tiếng Pháp (Senegal)', fr_ci:'Tiếng Pháp (Bờ Biển Ngà)', fr_ht:'Tiếng Pháp (Haiti)', pt_mz:'Tiếng Bồ Đào Nha (Mozambique)', pt_cv:'Tiếng Bồ Đào Nha (Cape Verde)',  nl_be:'Tiếng Hà Lan (Bỉ)', en_us:'Tiếng Anh (Mỹ)', en_ca:'Tiếng Anh (Canada)', en_za:'Tiếng Anh (Nam Phi)', de_ch:'Tiếng Đức (Thụy Sĩ)', pt_ao:'undefined (Angola)', es_ve:'undefined (Venezuela)', ca_va:'Tiếng Valencia',  nan_pera:'Phúc Kiến Peranakan', zh_th:'Tiếng Phổ thông người Thái gốc Hoa', zh_tw:'Quan thoại Đài Loan', nan_th:'Tiếng Triều Châu người Thái gốc Hoa', zh_us:'Tiếng Phổ thông người Mỹ gốc Hoa', yue_us:'Tiếng Quảng người Mỹ gốc Hoa', dng:'Tiếng Đông Can', ko_hun:'Huấn Hán Triều (âm Hàn bản địa)', ja_kun:'Huấn độc (âm Nhật bản địa)', phm:'Hmong-Mien nguyên thủy', pmgl:'Mông Cổ nguyên thủy', ptai:'Tai nguyên thủy', paa:'Nam Á nguyên thủy', ptung:'Tungus nguyên thủy', pja:'Nhật Bản nguyên thủy', pko:'Triều Tiên nguyên thủy', ptb:'Tạng-Miến nguyên thủy', pst:'Hán-Tạng nguyên thủy', ko_zai:'Hán âm người Hàn-Triều ở Nhật', bo_sino:'Âm Hán-Tạng hiện đại', vi_ohan:'Cổ Hán Việt', ja_ojp:'Âm Hán-Nhật cổ', ko_mid:'Tiếng Triều Tiên trung đại', sjo:'Tiếng Tích Bá', nan_id:'Phúc Kiến Indonesia', nan_my:'Phúc Kiến Malaysia', nan_sg:'Phúc Kiến Singapore', yue_mo:'Tiếng Quảng Ma Cao', yue_hk:'Tiếng Quảng Hồng Kông', zh_phagspa:'Tiếng Hán Nguyên (Phags-pa)', zh_yuan:'Quan thoại Nguyên đại', bca:'Tiếng Bạch (trung)', ja:'Tiếng Nhật', ja_osa: "Tiếng Nhật (Osaka)", ja_aom: "Tiếng Nhật (Aomori)", ja_oki: "Tiếng Okinawa", ja_hak: "Tiếng Nhật (Hakata)", ja_edo: "Tiếng Nhật (thời Edo)", ja_kanbun:'Hán văn huấn đọc (Nhật)', ko:'Tiếng Hàn', ko_kp: "Tiếng Hàn (CHDCND Triều Tiên)", ko_bus: "Tiếng Hàn (Busan)", zh:'Tiếng Trung (Phổ thông)', yue:'Tiếng Quảng Đông', nan:'Tiếng Đài Loan', wuu:'Tiếng Ngô Thượng Hải', zh_song: "Tiếng Trung (cổ điển)", zh_wenyan_edu:'Văn ngôn (đọc theo Quảng Đông)', vi:'Tiếng Việt Bắc bộ', vi_c:'Tiếng Việt Trung bộ', vi_s:'Tiếng Việt Nam bộ', vi_nom: "Tiếng Việt (Chữ Nôm)", vi_han:'Hán văn (âm Hán Việt)', th:'Tiếng Thái', id:'Tiếng Indonesia', sa:'Tiếng Phạn', sa_edu:'Tiếng Phạn nói hiện đại', hi:'Tiếng Hindi', en:'Tiếng Anh', en_aave: "Tiếng Anh (AAVE)", en_south:'Tiếng Anh (miền Nam Mỹ)', en_app:'Tiếng Anh (Appalachia)', en_ie:'Tiếng Anh (Ireland)', en_sco:'Tiếng Anh (Scotland)', en_yk:'Tiếng Anh (Yorkshire)', en_ck:'Tiếng Anh (Cockney)', de:'Tiếng Đức', de_lut:'Tiếng Đức Cao địa Tân kỳ Sơ kỳ (thời Luther)', fr:'Tiếng Pháp', fr_class:'Tiếng Pháp cổ điển (thế kỷ 17)', it:'Tiếng Ý', it_dan:'Tiếng Ý (thời Dante)', es_eu:'Tiếng Tây Ban Nha (châu Âu)', es_sgl:'Tiếng Tây Ban Nha Thời Hoàng kim', es_mx:'Tiếng Tây Ban Nha (Mexico)', pt_eu:'Tiếng Bồ Đào Nha (châu Âu)', pt_br:'Tiếng Bồ Đào Nha (Brazil)', la:'Tiếng Latin', ru:'Tiếng Nga', uk:'Tiếng Ukraina', ar:'Tiếng Ả Rập (chuẩn)', ar_qur:"Tiếng Ả Rập của Qur'an", ar_eg:'Tiếng Ả Rập (Ai Cập)', he:'Tiếng Do Thái', he_mis:'Tiếng Hebrew Mishnah', sw:'Tiếng Swahili', tr:'Tiếng Thổ Nhĩ Kỳ', fa:'Tiếng Ba Tư', fa_clas:'Tiếng Ba Tư (Cổ điển)', tl:'Tiếng Tagalog', ga:'Tiếng Ireland', eu:'Tiếng Basque', mn:'Tiếng Mông Cổ', my:'Tiếng Miến Điện', am:'Tiếng Amhara', egy:'Tiếng Ai Cập cổ đại', ta:'Tiếng Tamil', hu:'Tiếng Hungary', nl:'Tiếng Hà Lan', pl:'Tiếng Ba Lan', ms:'Tiếng Mã Lai', mg:'Tiếng Malagasy', cy:'Tiếng Wales', fi:'Tiếng Phần Lan', ain:'Tiếng Ainu', bn:'Tiếng Bengal', ur:'Tiếng Urdu', te:'Tiếng Telugu', jv:'Tiếng Java', ko_jeju: "Tiếng Jeju", ko_em: "Tiếng Hàn (cận đại)", ka:'Tiếng Gruzia', el:'Tiếng Hy Lạp', el_grc:'Tiếng Hy Lạp cổ đại', el_kath:'Tiếng Hy Lạp (Katharevousa)', nv:'Tiếng Navajo', qu:'Tiếng Quechua', mi:'Tiếng Māori', haw:'Tiếng Hawaii', km:'Tiếng Khmer', lo:'Tiếng Lào', yo:'Tiếng Yoruba', zu:'Tiếng Zulu', bo:'Tiếng Tây Tạng', xct_litpr:'Tiếng Tạng cổ điển phụng vụ', hy:'Tiếng Armenia', hy_grab:'Tiếng Armenia Cổ điển (Grabar)' , ja_kyo: "Tiếng Nhật (Kyoto)", ja_hir: "Tiếng Nhật (Hiroshima)", ja_mvi:'Tiếng Miyako', ja_rys:'Tiếng Yaeyama', ar_lev:'Tiếng Ả Rập (Levant)', ar_ma:'Tiếng Ả Rập (Maroc)', ar_gulf:'Tiếng Ả Rập (Vùng Vịnh)', zh_sc: "Tiếng Trung (Tứ Xuyên)", zh_db: "Quan thoại Đông Bắc", nap:'Tiếng Napoli', scn:'Tiếng Sicilia', de_gsw: "Tiếng Đức (Thụy Sĩ)", fr_qc: "Tiếng Pháp (Québec)", sco:'Tiếng Scotland', en_sg: "Tiếng Anh (Singapore)", hwc: "Tiếng Creole Hawaii", pcm: "Tiếng Pidgin Nigeria", tpi:'Tok Pisin', en_ang: "Tiếng Anh (cổ đại)", sv:'Tiếng Thụy Điển', no:'Tiếng Na Uy', si:'Tiếng Sinhala', ro:'Tiếng Romania', cs:'Tiếng Séc', ca:'Tiếng Catalan', da:'Tiếng Đan Mạch', is:'Tiếng Iceland', lt:'Tiếng Litva', sq:'Tiếng Albania', mt:'Tiếng Malta', so:'Tiếng Somali', ml:'Tiếng Malayalam', pa:'Tiếng Punjab', ku:'Tiếng Kurd', ug:'Tiếng Duy Ngô Nhĩ', kk:'Tiếng Kazakh', ha:'Tiếng Hausa', ig:'Tiếng Igbo', eo:'Tiếng Esperanto', tok:'Toki Pona', ht:'Tiếng Creole Haiti', ps:'Tiếng Pashto', uz:'Tiếng Uzbek', mr:'Tiếng Marathi', gu:'Tiếng Gujarati', kn:'Tiếng Kannada', ne:'Tiếng Nepal', om:'Tiếng Oromo', ti:'Tiếng Tigrinya', wo:'Tiếng Wolof', ln:'Tiếng Lingala', sn:'Tiếng Shona', sr:'Tiếng Serbia', bg:'Tiếng Bulgaria', sk:'Tiếng Slovak', lv:'Tiếng Latvia', et:'Tiếng Estonia', be:'Tiếng Belarus', yi:'Tiếng Yiddish', non:'Tiếng Bắc Âu cổ', arc:'Tiếng Aramaic', cop:'Tiếng Coptic', rom:'Tiếng Romani', br:'Tiếng Breton', xh:'Tiếng Xhosa', lad:'Tiếng Ladino', tlh:'Tiếng Klingon', jbo:'Tiếng Lojban', fj:'Tiếng Fiji', sm:'Tiếng Samoa', zh_han: "Tiếng Trung (Hán đại)", zh_tang: "Tiếng Trung (Đường đại)", ceb:'Cebuano', su:'Sunda', th_isan: "Tiếng Thái (Isan)", es_co: "Tiếng Tây Ban Nha (Colombia)", es_cl: "Tiếng Tây Ban Nha (Chile)", gl:'Galicia', oc:'Occitan', fo:'Faroe', jam: "Tiếng Patois Jamaica", pap: "Tiếng Papiamento", gd: "Tiếng Gaelic Scotland", sl: "Tiếng Slovenia", enm: "Tiếng Anh trung đại", en_em:'Tiếng Anh Cận đại Sơ kỳ', fr_ch: "Tiếng Pháp (Thụy Sĩ)", to: "Tiếng Tonga", se: "Tiếng Sami Bắc", af: "Tiếng Afrikaans", akk: "Tiếng Akkad", ar_iq: "Tiếng Ả Rập (Iraq)", ar_sd: "Tiếng Ả Rập (Sudan)", ar_tn: "Tiếng Ả Rập (Tunisia)", as: "Tiếng Assam", az: "Tiếng Azerbaijan", bho: "Tiếng Bhojpuri", cdo: "Tiếng Mân Đông", chr: "Tiếng Cherokee", ckb: "Tiếng Kurd (Sorani)", cu: "Tiếng Slav Giáo hội cổ", de_at: "Tiếng Đức (Áo)", de_by: "Tiếng Đức (Bayern)", en_au: "Tiếng Anh (Úc)", en_in: "Tiếng Anh (Ấn Độ)", es_an: "Tiếng Tây Ban Nha (Andalusia)", es_ar: "Tiếng Tây Ban Nha (Argentina)", es_cu: "Tiếng Tây Ban Nha (Cuba)", es_pe: "Tiếng Tây Ban Nha (Peru)", fr_af: "Tiếng Pháp (châu Phi)", fr_be: "Tiếng Pháp (Bỉ)", fy: "Tiếng Frisia", gn: "Tiếng Guaraní", got: "Tiếng Goth", hak_cn: "Tiếng Khách Gia", hit: "Tiếng Hittite", hmn: "Tiếng Hmông", ii: "Tiếng Di (Nuosu)", ilo: "Tiếng Ilocano", ine: "Tiếng Ấn-Âu nguyên thủy", iu: "Tiếng Inuktitut", ja_heian: "Tiếng Nhật (thời Heian)", ko_yb: "Tiếng Hàn (Diên Biên)", ky: "Tiếng Kyrgyz", mn_cn: "Tiếng Mông Cổ (Nội Mông)", mnc: "Tiếng Mãn", myn: "Tiếng Maya cổ điển", nci: "Tiếng Nahuatl cổ điển", nds: "Tiếng Hạ Đức", nn: "Tiếng Na Uy (Nynorsk)", ny: "Tiếng Chewa", or: "Tiếng Odia", pi: "Tiếng Pali", pi_edu:'Tiếng Pali sư phạm (Theravada)', rm: "Tiếng Romansh", rw: "Tiếng Kinyarwanda", sc: "Tiếng Sardegna", sd: "Tiếng Sindh", sux: "Tiếng Sumer", tg: "Tiếng Tajik", th_n: "Tiếng Thái (miền Bắc)", th_s: "Tiếng Thái (miền Nam)", tk: "Tiếng Turkmen", vec: "Tiếng Venezia", za: "Tiếng Tráng", pau: "Tiếng Palau", sah: 'tiếng Sakha', tyv: 'tiếng Tuva', kjh: 'tiếng Khakas', alt: 'tiếng Altai', bxr: 'tiếng Buryat', evn: 'tiếng Evenki', eve: 'tiếng Even', yrk: 'tiếng Nenets', kca: 'tiếng Khanty', ckt: 'tiếng Chukchi', niv: 'tiếng Nivkh', ket: 'tiếng Ket', cjy: 'Tiếng Tấn', hsn: 'Tiếng Tương', gan: 'Tiếng Cám', mai: 'tiếng Maithili', awa: 'tiếng Awadhi', skr: 'tiếng Saraiki', sat: 'tiếng Santali', mad: 'tiếng Madura', hil: 'tiếng Hiligaynon', bal: 'tiếng Baloch', ak: 'tiếng Akan (Twi)', mk: 'tiếng Macedonia', lg: 'tiếng Luganda', ki: 'tiếng Kikuyu', tn: 'tiếng Tswana', st: 'tiếng Sesotho', ts: 'tiếng Tsonga', ve: 'tiếng Venda', bem: 'tiếng Bemba', lua: 'tiếng Luba-Kasai', kg: 'tiếng Kongo', ff: 'tiếng Fula', bm: 'tiếng Bambara', kab: 'tiếng Kabyle', yua: 'tiếng Maya Yucatec', tzo: 'tiếng Tzotzil', mix: 'tiếng Mixtec', zap: 'tiếng Zapotec', ay: 'tiếng Aymara', arn: 'tiếng Mapuche', cr: 'tiếng Cree (đồng bằng)', oj: 'tiếng Ojibwe', lkt: 'tiếng Lakota', kl: 'tiếng Greenland', ce: 'tiếng Chechen', inh: 'tiếng Ingush', av: 'tiếng Avar', lez: 'tiếng Lezgi', dar: 'tiếng Dargwa', lbe: 'tiếng Lak', tab: 'tiếng Tabasaran', ady: 'tiếng Adyghe', kbd: 'tiếng Kabardian', ab: 'tiếng Abkhaz', xmf: 'tiếng Mingrelia', os: 'tiếng Ossetia', ty: 'tiếng Tahiti', niu: 'tiếng Niue', tvl: 'tiếng Tuvalu', rap: 'tiếng Rapanui', rar: 'tiếng Māori Quần đảo Cook', mh: 'tiếng Marshall', gil: 'tiếng Kiribati', ch: 'tiếng Chamorro', tet: 'tiếng Tetum', bi: 'tiếng Bislama', pjt: 'tiếng Pitjantjatjara', wbp: 'tiếng Warlpiri', mni: 'tiếng Manipur', new: 'tiếng Newar', brx: 'tiếng Bodo', lus: 'tiếng Mizo', dz: 'tiếng Dzongkha', min: 'tiếng Minangkabau', ban: 'tiếng Bali', ace: 'tiếng Aceh', bug: 'tiếng Bugis', war: 'tiếng Waray', bik: 'tiếng Bikol Trung', tum: 'tiếng Tumbuka', din: 'tiếng Dinka', nus: 'tiếng Nuer', luo: 'tiếng Luo', mas: 'tiếng Maasai', aa: 'tiếng Afar', shi: 'tiếng Tashelhit', rif: 'tiếng Tarifit', mwr: 'tiếng Marwari', bgc: 'tiếng Haryana', ks: 'tiếng Kashmir', kok: 'tiếng Konkani', mnp: 'Tiếng Mân Bắc', nan_te: 'Tiếng Triều Châu', yue_ts: 'Tiếng Đài Sơn', czh: 'Tiếng Huy Châu', cnp: 'Tiếng Bình thoại', zh_jh: 'Quan thoại Giang Hoài', zh_tj: 'Quan thoại Thiên Tân', zh_lz: 'Quan thoại Lan-Ngân', dng: 'tiếng Đông Can', hsb: 'tiếng Sorb Thượng', csb: 'tiếng Kashubia', fur: 'tiếng Friuli', ast: 'tiếng Asturia', an: 'tiếng Aragon', rup: 'tiếng Aroman', wa: 'tiếng Wallon', udm: 'tiếng Udmurt', mhr: 'tiếng Mari đồng cỏ', myv: 'tiếng Erzya', krl: 'tiếng Karelia', mzn: 'tiếng Mazandarani', glk: 'tiếng Gilaki', lrc: 'tiếng Lori', crh: 'tiếng Tatar Krym', tt: 'tiếng Tatar', ba: 'tiếng Bashkir', krc: 'tiếng Karachay-Balkar', ksw: 'tiếng Karen Sgaw', lhu: 'tiếng Lahu', lis: 'tiếng Lisu', nxq: 'tiếng Nạp Tây', shn: 'tiếng Shan', ee: 'tiếng Ewe', nyn: 'tiếng Runyankole', luy: 'tiếng Luhya', ssw: 'tiếng Swazi', nbl: 'tiếng Ndebele Nam', nso: 'tiếng Sotho Bắc', fan: 'tiếng Fang', naq: 'tiếng Nama (Khoekhoe)', hts: 'tiếng Hadza', kr: 'tiếng Kanuri', men: 'tiếng Mende', dyu: 'tiếng Dyula', syl: 'tiếng Sylhet', mag: 'tiếng Magadhi', doi: 'tiếng Dogri', xkk: 'tiếng Khơ Mú', moh: 'tiếng Mohawk', cho: 'tiếng Choctaw', esu: 'tiếng Yupik Trung Alaska', ipk: 'tiếng Inupiaq', apw: 'tiếng Apache Tây', dak: 'tiếng Dakota', chy: 'tiếng Cheyenne', lmo: 'tiếng Lombardia', pms: 'tiếng Piemonte', eml: 'tiếng Emilia-Romagna', mwl: 'tiếng Miranda', pnt: 'tiếng Hy Lạp Pontus', hno: 'tiếng Hindko', bhb: 'tiếng Bhili', cja: 'tiếng Chăm', hmo: 'tiếng Hiri Motu', pon: 'tiếng Pohnpei', vmw: 'tiếng Makhuwa', dsb: 'tiếng Sorb Hạ', gv: 'tiếng Manx', kw: 'tiếng Cornwall', zza: 'tiếng Zaza', brh: 'tiếng Brahui', mrq: 'tiếng Marquesa', tiw: 'tiếng Tiwi', guc: 'tiếng Wayuu', myp: 'tiếng Pirahã', emp: 'tiếng Embera Bắc', kpe: 'tiếng Kpelle', loz: 'tiếng Lozi', bbc: 'tiếng Batak Toba', bjn: 'tiếng Banjar', sas: 'tiếng Sasak', kha: 'tiếng Khasi', mns: 'tiếng Mansi', mrw: 'tiếng Maranao', tsg: 'tiếng Tausug', yap: 'tiếng Yap', chk: 'tiếng Chuuk', gbm: 'tiếng Garhwal', kfy: 'tiếng Kumaon', xnr: 'tiếng Kangri', hr: 'tiếng Croatia', bs: 'tiếng Bosnia', iba: 'tiếng Iban', ljp: 'tiếng Lampung', tzm: 'tiếng Tamazight Trung Atlas', ng: 'tiếng Ndonga', umb: 'tiếng Umbundu', kmb: 'tiếng Kimbundu', her: 'tiếng Herero', xal: 'tiếng Kalmyk', sg: 'tiếng Sango', toi: 'tiếng Tonga (Zambia)', peo: 'tiếng Ba Tư cổ', ave: 'tiếng Avesta', xto: 'tiếng Tochari A', txb: 'tiếng Tochari B', phn: 'tiếng Phoenicia', uga: 'tiếng Ugarit', xlu: 'tiếng Luwi', pal: 'tiếng Ba Tư trung đại (Pahlavi)', syc: 'tiếng Syriac cổ điển', fro: 'tiếng Pháp cổ', goh: 'tiếng Đức Cao thượng cổ', gez: "tiếng Ge'ez", gmy: 'tiếng Hy Lạp Mycenae', xct: 'tiếng Tạng cổ điển', xpu: 'tiếng Punic', xhu: 'tiếng Hurri', elx: 'tiếng Elam', xsa: 'tiếng Saba', kaw: 'tiếng Java cổ (Kawi)', kho: 'tiếng Khotan', gmh: 'tiếng Đức Cao thượng trung đại', osp: 'tiếng Tây Ban Nha cổ', okz: 'tiếng Khmer cổ', osx: 'tiếng Saxon cổ', smg: 'tiếng Sukuma', mos: 'tiếng Mòoré', kln: 'tiếng Kalenjin', mfe: 'tiếng Creole Mauritius', mnk: 'tiếng Mandinka', bqi: 'tiếng Bakhtiari', unr: 'tiếng Mundari', hoc: 'tiếng Ho', enq: 'tiếng Enga', xpr: 'tiếng Parthia', xqa: 'tiếng Karakhanid', sga: 'tiếng Ireland cổ', bsk: 'tiếng Burushaski', yag: 'tiếng Yagnobi', srn: 'tiếng Sranan Tongo', kwk: 'tiếng Kwakwala', sad: 'tiếng Sandawe', pcc: 'tiếng Bố Y', iuu: 'tiếng Iu Mien', hui: 'tiếng Huli', tkl: 'tiếng Tokelau', squ: 'tiếng Squamish', mga: 'tiếng Ireland trung đại', hbo: 'tiếng Hebrew Kinh Thánh', mpt: 'tiếng Mian', ygr: 'tiếng Yagaria', quz: 'tiếng Quechua Cuzco', quy: 'tiếng Quechua Ayacucho', cab: 'tiếng Garifuna', crx: 'tiếng Carrier', tsi: 'tiếng Tsimshian ven biển', wbl: 'tiếng Wakhi', psi: 'tiếng Pashai', bgq: 'tiếng Bagri', ach: 'tiếng Acholi', rki: 'tiếng Rakhine', kxm: 'tiếng Khmer Bắc', xng: 'tiếng Mông Cổ trung đại', ja_kg: 'tiếng Nhật (Kagoshima)', ja_sd: 'tiếng Nhật (Sendai)', ko_hg: 'tiếng Triều Tiên (Hamgyŏng)', ko_jl: 'tiếng Hàn (Jeolla)', nan_pn: 'tiếng Phúc Kiến Penang', mra: 'tiếng Mlabri', wuu_nb: 'tiếng Ninh Ba', yue_gz: 'tiếng Việt Cao Châu', khb: 'tiếng Tai Lue', pam: 'tiếng Kapampangan', pag: 'tiếng Pangasinan', mdh: 'tiếng Maguindanao', gor: 'tiếng Gorontalo', mak: 'tiếng Makassar', fon: 'tiếng Fon', kri: 'tiếng Krio', dag: 'tiếng Dagbani', xog: 'tiếng Soga', teo: 'tiếng Ateso', dyo: 'tiếng Jola-Fonyi', bci: 'tiếng Baoulé', tcy: 'tiếng Tulu', haz: 'tiếng Hazaragi', tly: 'tiếng Talysh', kaa: 'tiếng Karakalpak', bej: 'tiếng Beja', tig: 'tiếng Tigre', ssy: 'tiếng Saho', ewo: 'tiếng Ewondo', bum: 'tiếng Bulu', ndc: 'tiếng Ndau', ote: 'tiếng Otomi', tar: 'tiếng Tarahumara', och:'Hán thượng cổ', ojp:'Tiếng Nhật cổ', vsa:'Tiếng Phạn Vệ-đà', txg:'Tiếng Tangut (Tây Hạ)', sog:'Tiếng Sogdia', otk:'Tiếng Turk cổ', zkt:'Tiếng Khiết Đan', juc:'Tiếng Nữ Chân', omx:'Tiếng Môn cổ', pyx:'Tiếng Pyu', obr:'Tiếng Miến cổ', occ:'Tiếng Chăm cổ', orv:'Tiếng Đông Slav cổ', xsc:'Tiếng Scythia', sukh:'Tiếng Thái cổ (Sukhothai)', xmr:'Tiếng Meroe', onw:'Tiếng Nubia cổ', cqu:'Tiếng Quechua cổ điển', omc:'Tiếng Mochica', chb:'Tiếng Chibcha', oma:'Tiếng Mã Lai cổ', osu:'Tiếng Sunda cổ', otl:'Tiếng Tagalog cổ', ami:'Tiếng Amis', pwn:'Tiếng Paiwan', tay:'Tiếng Atayal', bnn:'Tiếng Bunun', trv:'Tiếng Truku', tsu:'Tiếng Tsou', tao:'Tiếng Tao (Yami)', hak_tw:'Tiếng Khách Gia Đài Loan', wuu_sz:'Tiếng Ngô Tô Châu', wuu_wz:'Tiếng Ngô Ôn Châu', nan_qz:'Tiếng Mân Nam Tuyền Châu', nan_hai:'Tiếng Hải Nam', zh_wh:'Quan thoại Vũ Hán', zh_zz:'Quan thoại Trung Nguyên', hak_hl:'Khách Gia Hải Lục', cpx:'Tiếng Phổ Tiên', mfa:'Tiếng Mã Lai Patani', mtq:'Tiếng Mường', tyz:'Tiếng Tày', kjp:'Tiếng Karen Pwo', kac:'Tiếng Jingpo (Kachin)', wbm:'Tiếng Wa', ahk:'Tiếng Akha', dtp:'Tiếng Kadazan-Dusun', hne:"Tiếng Chhattisgarhi", mnw:"Tiếng Môn", grt:"Tiếng Garo", nut:"Tiếng Nùng", quc:"Tiếng Kʼicheʼ", kek:"Tiếng Qʼeqchiʼ", mam:"Tiếng Mam", wal:"Tiếng Wolaytta", sid:"Tiếng Sidama", tji:"Tiếng Thổ Gia", nij:"Tiếng Ngaju", sda:"Tiếng Toraja-Saʼdan", arq:'Tiếng Ả Rập Algeria', mey:'Tiếng Ả Rập Hassaniya', tmh:'Tiếng Tamasheq (Tuareg)', azb:'Tiếng Azerbaijan Nam', gag:'Tiếng Gagauz', sma:'Tiếng Sámi Nam', vro:'Tiếng Võro', pjk:'Ngôn ngữ Nhật-Hàn nguyên thủy', oko:'Tiếng Hàn cổ (Silla)', okg:'Tiếng Cao Câu Ly', ko_gor:'Tiếng Cao Ly', ja_chu:'Tiếng Nhật Trung cổ', pry:'Ngôn ngữ Lưu Cầu nguyên thủy', lld:'Tiếng Ladin', stq:'Tiếng Frisia Saterland', wym:'Tiếng Wymysorys', yuc:'Tiếng Yuchi', kgg:'Tiếng Kusunda', ota:'Tiếng Thổ Nhĩ Kỳ Ottoman', cmg:'Tiếng Mông Cổ cổ điển', ett:'Tiếng Etrusca', xht:'Tiếng Hatti', txr:'Tiếng Tartessos', roo:'tiếng Rotokas', nmn:'tiếng Taa', lbz:'tiếng Lardil', nny:'tiếng Yangkaal', kky:'tiếng Guugu Yimithirr', blc:'tiếng Nuxalk', tue:'tiếng Tuyuca', ncs:'Ngôn ngữ Ký hiệu Nicaragua', uby:'tiếng Ubykh', lbz_damin:'tiếng Damin'},
    th: { es_cr:'ภาษาสเปน (คอสตาริกา)', es_hn:'ภาษาสเปน', es_ni:'ภาษาสเปน (นิการากัว)', es_sv:'ภาษาสเปน (เอลซัลวาดอร์)', ar_jo:'ภาษาอาหรับจอร์แดน', ar_ps:'ภาษาอาหรับปาเลสไตน์', fr_lu:'ภาษาฝรั่งเศส', fr_cm:'ภาษาฝรั่งเศสแคเมอรูน', de_lu:'ภาษาเยอรมัน (ลักเซมเบิร์ก)', en_ng2:'ภาษาอังกฤษ (กานา)', pt_mo:'ภาษาโปรตุเกสของมาเก๊า', lb:'ภาษาลักเซมเบิร์ก', gcr:'ภาษาครีโอลฝรั่งเศสเกียนา', acf:'ภาษาครีโอลเซนต์ลูเซีย',  gan_yc:'ภาษาจีนกาน (สำเนียงอี่ชุน)', gan_ja:'ภาษากั้น (จิ่านว)', gan_fz:'ภาษากัน (ฟูโจว)', cjy_lv:'ภาษาจิ้นของลู่หลวง', cjy_xz:'ภาษาจินจีน (สำเนียงซินโจว)', hsn_hy:'ภาษาเซียง (เฮงหยาง)', hsn_yz:'ภาษาเซียง (สำเนียงยงโจว)', czh_wy:'ภาษาฮุ่ย (อุหวี่ยวน)',  bla:'ภาษาแบลกฟุต', hop:'ภาษาโฮปี', com:'ภาษาโคมแนช', one:'ภาษาโอนีดา', ono:'ภาษาโอนอนดากา', win:'ภาษาโฮ-ชังค์', cro:'ภาษาครั่ว', hai:'ภาษาไฮดา', cic:'ภาษาชิคคาซอ', ik:'ภาษาอีนูเปียก', na:'ภาษานาอูรู', luz:'ภาษาลูรี่ตอนเหนือ', es_bo:'สเปน (โบลิเวีย)', es_py:'สเปนพารากวัย', es_pa:'ภาษาสเปนของปานามา', en_my:'อังกฤษ (มาเลเซีย)', pt_gw:'ภาษาครีโอลแอฟริกาตะวันตก', tsz:'ภาษาปูเรเปชา', nez:'ภาษานีซเพร์ส', nv2:'ภาษาอาปาชีตะวันตก', woe:'ภาษาวอเลอัย', pmt:'ภาษาตั๋วม็อตวัน', bin:'ภาษาเอโด', khw:'ภาษาโควาร',  xav:'ภาษาชาวันเต', ter:'ภาษาเทเรนา', bor:'ภาษาโบรอโร', trn:'ภาษาโมเฮนยัว ทรินิตาริโอ', ake:'ภาษาอากาวาโย', aoc:'ภาษาเปมอน', gun:'ภาษามบยากวารานี',  zdj:'ภาษาโคโมโร (ชิโคโมริ)', ayl:'ภาษาอาหรับลิเบีย', abv:'ภาษาอาหรับบาห์ไรนี', afb:'ภาษาอาหรับแบบอ่าวเปอร์เซีย', acw:'ภาษาอาหรับโอมาน', swb:'ภาษามาโฮเรส',  adx:'ภาษาทิเบตแอมโด', qxs:'ภาษาเชียงใต้', duu:'ภาษาดรุง', jya:'ภาษาสิตุ rgyal rong', ers:'ภาษาเอร์ซู', bca:'ภาษาไบกลาง', atb:'ภาษาไซวา', prk:'ภาษาปาราุกวา', slr:'ภาษาซาลาร์', ybe:'ภาษายูกูร์ตะวันตก', yuy:'ยูกูร์ตะวันออก', mjg:'ภาษามองกูร', sce:'ภาษาต้งเซียง', peh:'ภาษาบูนัน', bua:'ภาษาบูเรียต', cjs:'ภาษาชอร์', dlg:'ภาษาดอลกัน', kdt:'ภาษากูย', blk:'ภาษาปะโอ', njo:'ภาษา Ao Naga', srb:'ภาษาโสระ', kjg:'ภาษาขมุ', mro:'ภาษามรู', gon:'ภาษากอนดี', bfq:'ภาษาบาดากา', som:'ภาษาโซมาลี', har:'ภาษาฮาหารี',  es_pr:'ภาษาสเปน (เปอร์โตริโก)', es_do:'ภาษาสเปน (สาธารณรัฐโดมินิกัน)', es_gt:'ภาษาสเปน (กัวเตมาลา)', es_ec:'ภาษาสเปน (เอกวาดอร์)', es_uy:'ภาษาสเปน(อุรุกวัย)', ar_sy:'ภาษาอาหรับ(ซีเรีย)', ar_ye:'ภาษาอาหรับ (เยเมน)', ar_dz:'ภาษาอาหรับ (สำเนียงแอลจีเรีย)', ar_sa:'ภาษาอาหรับ (ซาอุดีอาระเบีย)', ar_lb:'อาหรับ (เลบานอน)', en_wls:'ภาษาอังกฤษ (เวลส์)', en_jam:'ภาษาอังกฤษ (จาเมกา)', en_ng:'ภาษาอังกฤษ (ไนจีเรีย)', en_ph:'ภาษาอังกฤษ (ฟิลิปปินส์)', en_ke:'ภาษาอังกฤษ (เคนยา)', fr_sn:'ภาษาฝรั่งเศส (เซเนกัล)', fr_ci:'ภาษาฝรั่งเศส (ไอวอรี่โคสต์)', fr_ht:'ฝรั่งเศส (ไฮติ)', pt_mz:'ภาษาโปรตุเกส (โมซัมบิก)', pt_cv:'ภาษาโปรตุเกส（เคปเวิร์ด）',  nl_be:'ภาษาดัตช์ (เบลเยียม)', en_us:'ภาษาอังกฤษ (อเมริกัน)', en_ca:'ภาษาอังกฤษ (แคนาดา)', en_za:'ภาษาอังกฤษ (แอฟริกาใต้)', de_ch:'ภาษาเยอรมัน (สวิส)', pt_ao:'undefined (แองโกลา)', es_ve:'undefined (เวเนซุเอลา)', ca_va:'ภาษาบาเลนเซีย',  nan_pera:'ฮกเกี้ยนเปอรานากัน', zh_th:'จีนกลางจีน-ไทย', zh_tw:'ภาษาจีนกลางไต้หวัน', nan_th:'จีนแต้จิ๋วไทย', zh_us:'จีนกลางจีน-อเมริกัน', yue_us:'กวางตุ้งจีน-อเมริกัน', dng:'ภาษาตงกาน', ko_hun:'อักษรจีนแบบดั้งเดิมเกาหลี', ja_kun:'คุนโยมิ (อ่านแบบญี่ปุ่น)', phm:'ภาษาม้ง-เมี่ยนดั้งเดิม', pmgl:'ภาษามองโกลดั้งเดิม', ptai:'ภาษาไทดั้งเดิม', paa:'ภาษาออสโตรเอเชียติกดั้งเดิม', ptung:'ภาษาตุงกุสดั้งเดิม', pja:'ภาษาญี่ปุ่นดั้งเดิม', pko:'ภาษาเกาหลีดั้งเดิม', ptb:'ภาษาทิเบต-พม่าดั้งเดิม', pst:'ภาษาจีน-ทิเบตดั้งเดิม', ko_zai:'อักษรจีนของชาวเกาหลีในญี่ปุ่น', bo_sino:'อักษรจีนทิเบตสมัยใหม่', vi_ohan:'อักษรจีนเวียดนามโบราณ', ja_ojp:'อักษรจีนญี่ปุ่นโบราณ', ko_mid:'ภาษาเกาหลีกลาง', sjo:'ภาษาซีเบ', nan_id:'ฮกเกี้ยนอินโดนีเซีย', nan_my:'ฮกเกี้ยนมาเลเซีย', nan_sg:'ฮกเกี้ยนสิงคโปร์', yue_mo:'กวางตุ้งมาเก๊า', yue_hk:'กวางตุ้งฮ่องกง', zh_phagspa:'จีนสมัยหยวน (อักษรพักปา)', zh_yuan:'จีนกลางสมัยหยวน', bca:'ภาษาไป๋ (กลาง)', ja:'ภาษาญี่ปุ่น', ja_osa: "ญี่ปุ่น (โอซากะ)", ja_aom: "ญี่ปุ่น (อาโอโมริ)", ja_oki: "ภาษาโอกินาวา", ja_hak: "ญี่ปุ่น (ฮากาตะ)", ja_edo: "ญี่ปุ่น (สมัยเอโดะ)", ja_kanbun:'การอ่านคันบุน (ฮัมบุน-คุนโดะกุ)', ko:'ภาษาเกาหลี', ko_kp: "เกาหลี (เกาหลีเหนือ)", ko_bus: "เกาหลี (ปูซาน)", zh:'ภาษาจีน (กลาง)', yue:'ภาษากวางตุ้ง', nan:'ภาษาไต้หวัน', wuu:'ภาษาอู๋เซี่ยงไฮ้', zh_song: "จีน (คลาสสิก)", zh_wenyan_edu:'ภาษาจีนคลาสสิก (สำเนียงกวางตุ้ง)', vi:'ภาษาเวียดนามเหนือ', vi_c:'ภาษาเวียดนามกลาง', vi_s:'ภาษาเวียดนามใต้', vi_nom:'จื๋อโนม', vi_han:'หานวันเวียดนาม (อ่านแบบจีน-เวียดนาม)', th:'ภาษาไทย', id:'ภาษาอินโดนีเซีย', sa:'ภาษาสันสกฤต', sa_edu:'ภาษาสันสกฤตพูดสมัยใหม่', hi:'ภาษาฮินดี', en:'ภาษาอังกฤษ', en_aave: "อังกฤษ (AAVE)", en_south: "อังกฤษ (ภาคใต้สหรัฐ)", en_app: "อังกฤษ (แอปพาเลเชีย)", en_ie: "อังกฤษ (ไอร์แลนด์)", en_sco: "อังกฤษ (สกอตแลนด์)", en_yk: "อังกฤษ (ยอร์กเชียร์)", en_ck: "อังกฤษ (ค็อกนีย์)", de:'ภาษาเยอรมัน', de_lut:'ภาษาเยอรมันสูงใหม่ตอนต้น (สมัยลูเทอร์)', fr:'ภาษาฝรั่งเศส', fr_class:'ภาษาฝรั่งเศสคลาสสิก (ศตวรรษที่ 17)', it:'ภาษาอิตาลี', it_dan:'ภาษาอิตาลี (ยุคดันเต)', es_eu:'ภาษาสเปน (ยุโรป)', es_sgl:'ภาษาสเปนสมัยทอง', es_mx:'ภาษาสเปน (เม็กซิโก)', pt_eu:'ภาษาโปรตุเกส (ยุโรป)', pt_br:'ภาษาโปรตุเกส (บราซิล)', la:'ภาษาละติน', ru:'ภาษารัสเซีย', uk:'ภาษายูเครน', ar:'ภาษาอาหรับ (มาตรฐาน)', ar_qur:'ภาษาอาหรับคัมภีร์อัลกุรอาน', ar_eg: "อาหรับ (อียิปต์)", he:'ภาษาฮีบรู', he_mis:'ภาษาฮีบรูสมัยมิชนาห์', sw:'ภาษาสวาฮีลี', tr:'ภาษาตุรกี', fa:'ภาษาเปอร์เซีย', fa_clas:'ภาษาเปอร์เซีย (คลาสสิก)', tl:'ภาษาตากาล็อก', ga:'ภาษาไอริช', eu:'ภาษาบาสก์', mn:'ภาษามองโกล', my:'ภาษาพม่า', am:'ภาษาอัมฮาริก', egy:'ภาษาอียิปต์โบราณ', ta:'ภาษาทมิฬ', hu:'ภาษาฮังการี', nl:'ภาษาดัตช์', pl:'ภาษาโปแลนด์', ms:'ภาษามลายู', mg:'ภาษามาลากาซี', cy:'ภาษาเวลส์', fi:'ภาษาฟินแลนด์', ain:'ภาษาไอนุ', bn:'ภาษาเบงกาลี', ur:'ภาษาอูรดู', te:'ภาษาเตลูกู', jv:'ภาษาชวา', ko_jeju: "ภาษาเชจู", ko_em: "เกาหลี (ยุคใหม่ตอนต้น)", ka:'ภาษาจอร์เจีย', el:'ภาษากรีก', el_grc:'ภาษากรีกโบราณ', el_kath:'ภาษากรีก (กาธาเรวูซา)', nv:'ภาษานาวาโฮ', qu:'ภาษาเกชัว', mi:'ภาษาเมารี', haw:'ภาษาฮาวาย', km:'ภาษาเขมร', lo:'ภาษาลาว', yo:'ภาษาโยรูบา', zu:'ภาษาซูลู', bo:'ภาษาทิเบต', xct_litpr:'ภาษาทิเบตคลาสสิกเชิงพิธีกรรม', hy:'ภาษาอาร์เมเนีย', hy_grab:'ภาษาอาร์เมเนียคลาสสิก (กราบาร์)' , ja_kyo: "ญี่ปุ่น (เกียวโต)", ja_hir: "ญี่ปุ่น (ฮิโรชิมะ)", ja_mvi:'ภาษามิยาโกะ', ja_rys:'ภาษายาเอยามะ', ar_lev: "อาหรับ (เลแวนต์)", ar_ma: "อาหรับ (โมร็อกโก)", ar_gulf: "อาหรับ (อ่าวเปอร์เซีย)", zh_sc: "จีน (เสฉวน)", zh_db: "ภาษาแมนดารินตะวันออกเฉียงเหนือ", nap:'ภาษาเนเปิลส์', scn:'ภาษาซิซิลี', de_gsw: "เยอรมัน (สวิส)", fr_qc: "ฝรั่งเศส (เควเบก)", sco:'ภาษาสกอต', en_sg: "อังกฤษ (สิงคโปร์)", hwc:'ครีโอลฮาวาย', pcm:'พิดจินไนจีเรีย', tpi:'ต็อกพิซิน', en_ang:'ภาษาอังกฤษโบราณ', sv:'ภาษาสวีเดน', no:'ภาษานอร์เวย์', si:'ภาษาสิงหล', ro:'ภาษาโรมาเนีย', cs:'ภาษาเช็ก', ca:'ภาษาคาตาลัน', da:'ภาษาเดนมาร์ก', is:'ภาษาไอซ์แลนด์', lt:'ภาษาลิทัวเนีย', sq:'ภาษาแอลเบเนีย', mt:'ภาษามอลตา', so:'ภาษาโซมาลี', ml:'ภาษามาลายาลัม', pa:'ภาษาปัญจาบ', ku:'ภาษาเคิร์ด', ug:'ภาษาอุยกูร์', kk:'ภาษาคาซัค', ha:'ภาษาเฮาซา', ig:'ภาษาอิกโบ', eo:'ภาษาเอสเปรันโต', tok:'โทกิโปนา', ht:'ครีโอลเฮติ', ps:'ภาษาปาชโต', uz:'ภาษาอุซเบก', mr:'ภาษามราฐี', gu:'ภาษาคุชราต', kn:'ภาษากันนาดา', ne:'ภาษาเนปาล', om:'ภาษาโอโรโม', ti:'ภาษาติกรินยา', wo:'ภาษาโวลอฟ', ln:'ภาษาลิงกาลา', sn:'ภาษาโชนา', sr:'ภาษาเซอร์เบีย', bg:'ภาษาบัลแกเรีย', sk:'ภาษาสโลวัก', lv:'ภาษาลัตเวีย', et:'ภาษาเอสโตเนีย', be:'ภาษาเบลารุส', yi:'ภาษายิดดิช', non:'ภาษานอร์สโบราณ', arc:'ภาษาอาราเมอิก', cop:'ภาษาคอปติก', rom:'ภาษาโรมานี', br:'ภาษาเบรอตง', xh:'ภาษาโคซา', lad:'ภาษาลาดีโน', tlh:'ภาษาคลิงออน', jbo:'ภาษาโลจบัน', fj:'ภาษาฟิจิ', sm:'ภาษาซามัว', zh_han:'จีน (ฮั่น)', zh_tang:'จีน (ถัง)', ceb:'เซบูอาโน', su:'ซุนดา', th_isan:'ไทย (อีสาน)', es_co:'สเปน (โคลอมเบีย)', es_cl:'สเปน (ชิลี)', gl:'กาลิเซีย', oc:'อ็อกซิตัน', fo:'แฟโร', jam:'จาเมกาปาตัว', pap:'ปาเปียเมนโต', gd: "เกลิกสกอต", sl: "สโลวีเนีย", enm: "อังกฤษยุคกลาง", en_em:'ภาษาอังกฤษสมัยใหม่ตอนต้น', fr_ch: "ฝรั่งเศส (สวิส)", to: "ตองกา", se: "ซามิเหนือ", af: "อาฟรีกานส์", akk: "อัคคาเดียน", ar_iq: "อาหรับ (อิรัก)", ar_sd: "อาหรับ (ซูดาน)", ar_tn: "อาหรับ (ตูนิเซีย)", as: "อัสสัม", az: "อาเซอร์ไบจาน", bho: "โภชปุรี", cdo: "หมิ่นตะวันออก", chr: "เชอโรกี", ckb: "เคิร์ด (โซรานี)", cu: "สลาโวนิกคริสตจักรโบราณ", de_at: "เยอรมัน (ออสเตรีย)", de_by: "เยอรมัน (บาวาเรีย)", en_au: "อังกฤษ (ออสเตรเลีย)", en_in: "อังกฤษ (อินเดีย)", es_an: "สเปน (อันดาลูเซีย)", es_ar: "สเปน (อาร์เจนตินา)", es_cu: "สเปน (คิวบา)", es_pe: "สเปน (เปรู)", fr_af: "ฝรั่งเศส (แอฟริกา)", fr_be: "ฝรั่งเศส (เบลเยียม)", fy: "ฟริเซีย", gn: "กวารานี", got: "กอทิก", hak_cn: "แคะ", hit: "ฮิตไทต์", hmn: "ม้ง", ii: "อี๋ (นู้ซู)", ilo: "อีโลกาโน", ine: "อินโด-ยูโรเปียนดั้งเดิม", iu: "อินุกติตุต", ja_heian: "ญี่ปุ่น (สมัยเฮอัน)", ko_yb: "เกาหลี (หยานเปียน)", ky: "คีร์กีซ", mn_cn: "มองโกล (มองโกเลียใน)", mnc: "แมนจู", myn: "มายาคลาสสิก", nci: "นาวาตล์คลาสสิก", nds: "เยอรมันต่ำ", nn: "นอร์เวย์ (นือนอชก์)", ny: "เชวา", or: "โอเดีย", pi: "บาลี", pi_edu:'ภาษาบาลีเชิงสอน (เถรวาท)', rm: "โรมานช์", rw: "คินยาร์วันดา", sc: "ซาร์ดิเนีย", sd: "สินธี", sux: "สุเมเรียน", tg: "ทาจิก", th_n: "ไทย (เหนือ)", th_s: "ไทย (ใต้)", tk: "เติร์กเมน", vec: "เวเนโต", za: "จ้วง", pau: "ปาเลา", sah: 'ภาษาซาฮา', tyv: 'ภาษาตูวา', kjh: 'ภาษาคาคัส', alt: 'ภาษาอัลไต', bxr: 'ภาษาบูเรียต', evn: 'ภาษาเอเวนกิ', eve: 'ภาษาเอเวน', yrk: 'ภาษาเนเนตส์', kca: 'ภาษาคันตี', ckt: 'ภาษาชุกชี', niv: 'ภาษานิฟค์', ket: 'ภาษาเคต', cjy: 'ภาษาจิ้น', hsn: 'ภาษาเซียง', gan: 'ภาษากั้น', mai: 'ภาษาไมถิลี', awa: 'ภาษาอวาธี', skr: 'ภาษาสารัยกี', sat: 'ภาษาสันตาลี', mad: 'ภาษามาดูรา', hil: 'ภาษาฮีลีไกนอน', bal: 'ภาษาบาโลจ', ak: 'ภาษาอาคัน (ตวี)', mk: 'ภาษามาซิโดเนีย', lg: 'ภาษาลูกันดา', ki: 'ภาษากีกูยู', tn: 'ภาษาทสวานา', st: 'ภาษาเซโซโท', ts: 'ภาษาซองกา', ve: 'ภาษาเวนดา', bem: 'ภาษาเบมบา', lua: 'ภาษาลูบา-คาไซ', kg: 'ภาษากองโก', ff: 'ภาษาฟูลา', bm: 'ภาษาบัมบารา', kab: 'ภาษาคาไบล์', yua: 'ภาษามายายูคาเทค', tzo: 'ภาษาโซตซิล', mix: 'ภาษามิกซ์เตค', zap: 'ภาษาซาโปเทค', ay: 'ภาษาไอย์มารา', arn: 'ภาษามาปูเช', cr: 'ภาษาครี (ที่ราบ)', oj: 'ภาษาโอจิบเว', lkt: 'ภาษาลาโกตา', kl: 'ภาษากรีนแลนด์', ce: 'ภาษาเชเชน', inh: 'ภาษาอินกุช', av: 'ภาษาอาวาร์', lez: 'ภาษาเลซกี', dar: 'ภาษาดาร์กวา', lbe: 'ภาษาลัก', tab: 'ภาษาทาบาซารัน', ady: 'ภาษาอะดีเก', kbd: 'ภาษาคาบาร์ดิอัน', ab: 'ภาษาอับฮาซ', xmf: 'ภาษามินเกรเลีย', os: 'ภาษาออสเซเตีย', ty: 'ภาษาตาฮีตี', niu: 'ภาษานีอูเอ', tvl: 'ภาษาตูวาลู', rap: 'ภาษาราปานูอี', rar: 'ภาษาเมารีหมู่เกาะคุก', mh: 'ภาษามาร์แชลล์', gil: 'ภาษาคิริบาส', ch: 'ภาษาชามอร์โร', tet: 'ภาษาเตตุม', bi: 'ภาษาบีสลามา', pjt: 'ภาษาพิตจันท์จาทจารา', wbp: 'ภาษาวาร์ลปีรี', mni: 'ภาษามณีปุระ', new: 'ภาษาเนวาร์', brx: 'ภาษาโบโด', lus: 'ภาษามิโซ', dz: 'ภาษาซองคา', min: 'ภาษามีนังกาเบา', ban: 'ภาษาบาหลี', ace: 'ภาษาอาเจะห์', bug: 'ภาษาบูกิส', war: 'ภาษาวาราย', bik: 'ภาษาบีโกลกลาง', tum: 'ภาษาตุมบูกา', din: 'ภาษาดิงกา', nus: 'ภาษานูเอร์', luo: 'ภาษาลูโอ', mas: 'ภาษามาไซ', aa: 'ภาษาอาฟาร์', shi: 'ภาษาทาเชลฮิต', rif: 'ภาษาทาริฟิต', mwr: 'ภาษามารวารี', bgc: 'ภาษาหรยาณวี', ks: 'ภาษากัศมีร', kok: 'ภาษากอนกานี', mnp: 'หมิ่นเป่ย', nan_te: 'ภาษาแต้จิ๋ว', yue_ts: 'ภาษาไทซาน', czh: 'ภาษาหุยโจว', cnp: 'ภาษาผิงฮว่า', zh_jh: 'ภาษาแมนดารินเจียงหวย', zh_tj: 'ภาษาแมนดารินเทียนจิน', zh_lz: 'ภาษาแมนดารินหลานยิน', dng: 'ภาษาตงกาน', hsb: 'ภาษาซอร์เบียบน', csb: 'ภาษาคาชูเบีย', fur: 'ภาษาฟริอูลี', ast: 'ภาษาอัสตูเรียส', an: 'ภาษาอารากอน', rup: 'ภาษาอาโรมาเนีย', wa: 'ภาษาวอลลูน', udm: 'ภาษาอุดมูร์ต', mhr: 'ภาษามารี (ที่ราบ)', myv: 'ภาษาเอร์ซยา', krl: 'ภาษาคาเรเลีย', mzn: 'ภาษามาซานดารานี', glk: 'ภาษากีลากี', lrc: 'ภาษาลูรี', crh: 'ภาษาตาตาร์ไครเมีย', tt: 'ภาษาตาตาร์', ba: 'ภาษาบัชคีร์', krc: 'ภาษาคาราชาย-บัลคาร์', ksw: 'ภาษากะเหรี่ยงสะกอ', lhu: 'ภาษาลาหู่', lis: 'ภาษาลีซู', nxq: 'ภาษานาซี', shn: 'ภาษาฉาน', ee: 'ภาษาเอเว', nyn: 'ภาษานยานโคเร', luy: 'ภาษาลูฮยา', ssw: 'ภาษาสวาซี', nbl: 'ภาษาเอนเดเบเลใต้', nso: 'ภาษาโซโทเหนือ', fan: 'ภาษาฟัง', naq: 'ภาษานามา (โคเอโคเอ)', hts: 'ภาษาฮัดซา', kr: 'ภาษากานูรี', men: 'ภาษาเมนเด', dyu: 'ภาษาดิยูลา', syl: 'ภาษาซีลเฮต', mag: 'ภาษามคหี', doi: 'ภาษาโดกรี', xkk: 'ภาษาขมุ', moh: 'ภาษาโมฮอว์ก', cho: 'ภาษาช็อกทอ', esu: 'ภาษายูปิกกลางอลาสกา', ipk: 'ภาษาอีนูเปียก', apw: 'ภาษาอาปาชีตะวันตก', dak: 'ภาษาดาโกตา', chy: 'ภาษาเชเยน', lmo: 'ภาษาลอมบาร์ด', pms: 'ภาษาเปียมอนเต', eml: 'ภาษาเอมีลีอา-โรมัญญา', mwl: 'ภาษามีรันดา', pnt: 'ภาษากรีกพอนทุส', hno: 'ภาษาฮินด์โก', bhb: 'ภาษาภิลี', cja: 'ภาษาจาม', hmo: 'ภาษาฮีรีโมตู', pon: 'ภาษาโปนเปย์', vmw: 'ภาษามากูวา', dsb: 'ภาษาซอร์เบียล่าง', gv: 'ภาษาแมงซ์', kw: 'ภาษาคอร์นิช', zza: 'ภาษาซาซา', brh: 'ภาษาบราหุย', mrq: 'ภาษามาร์เคซัส', tiw: 'ภาษาทิวี', guc: 'ภาษาวายู', myp: 'ภาษาปีราฮา', emp: 'ภาษาเอ็มเบราเหนือ', kpe: 'ภาษาคเปลเล', loz: 'ภาษาโลซี', bbc: 'ภาษาโตบาบาตัก', bjn: 'ภาษาบันจาร์', sas: 'ภาษาซาซัก', kha: 'ภาษาคาซี', mns: 'ภาษามันซี', mrw: 'ภาษามาราเนา', tsg: 'ภาษาเตาซุก', yap: 'ภาษายัป', chk: 'ภาษาชูค', gbm: 'ภาษาครหวาลี', kfy: 'ภาษากุมาออน', xnr: 'ภาษากันกรี', hr: 'ภาษาโครเอเชีย', bs: 'ภาษาบอสเนีย', iba: 'ภาษาอีบัน', ljp: 'ภาษาลัมปุง', tzm: 'ภาษาทามาไซต์แอตลาสกลาง', ng: 'ภาษาเอ็นดองกา', umb: 'ภาษาอุมบุนดู', kmb: 'ภาษากิมบุนดู', her: 'ภาษาเฮเรโร', xal: 'ภาษาคาลมึก', sg: 'ภาษาซังโก', toi: 'ภาษาตองกา (แซมเบีย)', peo: 'ภาษาเปอร์เซียโบราณ', ave: 'ภาษาอเวสตะ', xto: 'ภาษาโทคารี A', txb: 'ภาษาโทคารี B', phn: 'ภาษาฟีนิเชีย', uga: 'ภาษาอูการิต', xlu: 'ภาษาลูเวียน', pal: 'ภาษาเปอร์เซียกลาง (ปาห์ลาวี)', syc: 'ภาษาซีเรียคคลาสสิก', fro: 'ภาษาฝรั่งเศสโบราณ', goh: 'ภาษาเยอรมันสูงเก่า', gez: 'ภาษากีเอซ', gmy: 'ภาษากรีกไมซีเนียน', xct: 'ภาษาทิเบตคลาสสิก', xpu: 'ภาษาพิวนิก', xhu: 'ภาษาฮูร์เรียน', elx: 'ภาษาเอลาม', xsa: 'ภาษาสะบาเอียน', kaw: 'ภาษาชวาโบราณ (กาวี)', kho: 'ภาษาโคตันี', gmh: 'ภาษาเยอรมันสูงสมัยกลาง', osp: 'ภาษาสเปนโบราณ', okz: 'ภาษาเขมรโบราณ', osx: 'ภาษาแซกซันเก่า', smg: 'ภาษาซูคูมา', mos: 'ภาษาโมเร', kln: 'ภาษากาเลนจิน', mfe: 'ภาษาครีโอลมอริเชียส', mnk: 'ภาษามันดิงกา', bqi: 'ภาษาบักห์ติยารี', unr: 'ภาษามุนดารี', hoc: 'ภาษาโฮ', enq: 'ภาษาเองงา', xpr: 'ภาษาพาร์เธียน', xqa: 'ภาษาคารา-คานิด', sga: 'ภาษาไอริชเก่า', bsk: 'ภาษาบุรุชาสกี', yag: 'ภาษายาก์โนบี', srn: 'ภาษาสรานันตองโก', kwk: 'ภาษากวากวาลา', sad: 'ภาษาซันดาเว', pcc: 'ภาษาบูยี', iuu: 'ภาษาอิว-เมี่ยน', hui: 'ภาษาฮูลี', tkl: 'ภาษาโทเคเลา', squ: 'ภาษาสควอมิช', mga: 'ภาษาไอริชยุคกลาง', hbo: 'ภาษาฮีบรูในพระคัมภีร์', mpt: 'ภาษามีอัน', ygr: 'ภาษายาการ์เรีย', quz: 'ภาษาคูซโกเกชัว', quy: 'ภาษาเกชัวอายาคูโช', cab: 'ภาษาการิฟูนา', crx: 'ภาษาแคร์ริเออร์', tsi: 'ภาษาชิมเชียนชายฝั่ง', wbl: 'ภาษาวาคี', psi: 'ภาษาปาชาย', bgq: 'ภาษาบักรี', ach: 'ภาษาอาโชลี', rki: 'ภาษายะไข่', kxm: 'ภาษาเขมรเหนือ', xng: 'ภาษามองโกเลียยุคกลาง', ja_kg: 'ญี่ปุ่น (คาโกชิมะ)', ja_sd: 'ญี่ปุ่น (เซ็นได)', ko_hg: 'เกาหลี (ฮัมกย็อง)', ko_jl: 'เกาหลี (ช็อนลา)', nan_pn: 'ภาษาฮกเกี้ยนปีนัง', mra: 'ภาษามลาบรี', wuu_nb: 'ภาษาหนิงโป', yue_gz: 'ภาษากวางตุ้งเกาเจา', khb: 'ภาษาไทลื้อ', pam: 'ภาษากาปัมปังกัน', pag: 'ภาษาปังกาซินัน', mdh: 'ภาษามากินดาเนา', gor: 'ภาษากอรนตาโล', mak: 'ภาษามากัสซาร์', fon: 'ภาษาฟอน', kri: 'ภาษาคริโอ', dag: 'ภาษาดักบานี', xog: 'ภาษาโซกา', teo: 'ภาษาอาเตโซ', dyo: 'ภาษาโจลา-โฟนี', bci: 'ภาษาบาวเล', tcy: 'ภาษาตูลู', haz: 'ภาษาฮาซาราจิ', tly: 'ภาษาตาลึช', kaa: 'ภาษาคาราคัลปัก', bej: 'ภาษาเบจา', tig: 'ภาษาทิเกร', ssy: 'ภาษาซาโฮ', ewo: 'ภาษาเอวันโด', bum: 'ภาษาบูลู', ndc: 'ภาษาเอ็นเดา', ote: 'ภาษาโอโตมี', tar: 'ภาษาตาราอูมารา', och:'จีนโบราณ', ojp:'ญี่ปุ่นโบราณ', vsa:'สันสกฤตพระเวท', txg:'ภาษาตังกุต', sog:'ภาษาซ็อกเดียน', otk:'ภาษาเตอร์กิกโบราณ', zkt:'ภาษาขีตัน', juc:'ภาษาจูร์เชน', omx:'ภาษามอญโบราณ', pyx:'ภาษาปยู', obr:'ภาษาพม่าโบราณ', occ:'ภาษาจามโบราณ', orv:'ภาษาสลาฟตะวันออกเก่า', xsc:'ภาษาสกีเทียน', sukh:'ภาษาไทยโบราณ (สุโขทัย)', xmr:'ภาษาเมโรอิติก', onw:'ภาษานูเบียโบราณ', cqu:'ภาษาเกชวาคลาสสิก', omc:'ภาษาโมชิกา', chb:'ภาษาชิบชา', oma:'ภาษามลายูโบราณ', osu:'ภาษาซุนดาโบราณ', otl:'ภาษาตากาล็อกโบราณ', ami:'ภาษาอามิส', pwn:'ภาษาไป่หวาน', tay:'ภาษาไต๋หย่า', bnn:'ภาษาบู๋นง', trv:'ภาษาไท่ลู่เก๋อ', tsu:'ภาษาโจว', tao:'ภาษาต๋าหวู (ยา่หม่าย)', hak_tw:'ภาษาแคะไต้หวัน', wuu_sz:'ภาษาอู๋ซูโจว', wuu_wz:'ภาษาอู๋เวินโจว', nan_qz:'ฮกเกี้ยนฉวนโจว', nan_hai:'ภาษาไหหลำ', zh_wh:'ภาษาแมนดารินอู่ฮั่น', zh_zz:'จีนกลางจงหยวน', hak_hl:'แคะไห่ลู่', cpx:'ภาษาผูเซียน', mfa:'ภาษามลายูปาตานี', mtq:'ภาษาเหมื่อง', tyz:'ภาษาไต้ (เวียดนาม)', kjp:'ภาษากะเหรี่ยงโป', kac:'ภาษาจิงโป (กะฉิ่น)', wbm:'ภาษาว้า', ahk:'ภาษาอ่าข่า', dtp:'ภาษากาดาซัน-ดูซุน', hne:"ภาษาฉัตติสครห์", mnw:"ภาษามอญ", grt:"ภาษาการอ", nut:"ภาษาหนุ่ง", quc:"ภาษาคีเช", kek:"ภาษาเคชี", mam:"ภาษามาม", wal:"ภาษาโวลายตา", sid:"ภาษาซิดามา", tji:"ภาษาถู่เจีย", nij:"ภาษางาจู", sda:"ภาษาโตราจาซาดัน", arq:'อารบิกแอลจีเรีย', mey:'อารบิกฮัสซานิยา', tmh:'ทามาเชค (ทูเอเร็ก)', azb:'อาเซอร์ไบจานใต้', gag:'ภาษากากาอุซ', sma:'ซามีใต้', vro:'ภาษาโวรู', pjk:'ภาษาญี่ปุ่น-เกาหลีดั้งเดิม', oko:'เกาหลีโบราณ (ซิลลา)', okg:'โกคูรยอ', ko_gor:'ภาษาโครยอ', ja_chu:'ญี่ปุ่นยุคกลาง', pry:'ภาษาริวกิวดั้งเดิม', lld:'ภาษาลาดิน', stq:'ภาษาฟรีเซียซาเทอร์แลนด์', wym:'ภาษาวีมีโซรีส', yuc:'ภาษายูชี', kgg:'ภาษากุสุนดะ', ota:'ภาษาตุรกีออตโตมัน', cmg:'ภาษามองโกลคลาสสิก', ett:'ภาษาเอทรัสคัน', xht:'ภาษาฮัตตี', txr:'ภาษาทาร์เตสซอส', roo:'ภาษาโรโทกัส', nmn:'ภาษาตาอา', lbz:'ภาษาลาร์ดิล', nny:'ภาษายางคาล', kky:'ภาษากูกูยีมิทิร์', blc:'ภาษานูฮอล์ค', tue:'ภาษาตูยูคา', ncs:'ภาษามือนิการากัว', uby:'ภาษาอูบึค', lbz_damin:'ภาษาดามิน'},
    id: { es_cr:'Bahasa Spanyol (Kosta Rika)', es_hn:'Bahasa Spanyol', es_ni:'Bahasa Spanyol (Nicaragua)', es_sv:'Spanyol (El Salvador)', ar_jo:'Bahasa Arab Yordania', ar_ps:'Bahasa Arab Palestina', fr_lu:'Bahasa Perancis', fr_cm:'Bahasa Prancis Kamerun', de_lu:'Bahasa Jerman (Luksemburg)', en_ng2:'Bahasa Inggris (Ghana)', pt_mo:'Bahasa Portugis Makau', lb:'Bahasa Luksemburg', gcr:'Bahasa Kreol Guiana Perancis', acf:'Kreol Saint Lucia',  gan_yc:'Bahasa Gan Cina (dialek Yichun)', gan_ja:'Bahasa Gan (Jiʼan)', gan_fz:'Gan (Fuzhou)', cjy_lv:'Bahasa Jin Lüliang', cjy_xz:'Bahasa Mandarin Jin (dialek Xinzhou)', hsn_hy:'Bahasa Xiang (Hengyang)', hsn_yz:'Bahasa Xiang (dialek Yongzhou)', czh_wy:'Bahasa Hui (Wuyuan)',  bla:'Bahasa Blackfoot', hop:'Bahasa Hopi', com:'Bahasa Comanche', one:'Bahasa Oneida', ono:'bahasa Onondaga', win:'Bahasa Ho-Chunk', cro:'Bahasa Crow', hai:'bahasa Haida', cic:'Bahasa Chickasaw', ik:'bahasa Iñupiaq', na:'Nauruan', luz:'Bahasa Luri Utara', es_bo:'Spanyol (Bolivia)', es_py:'Spanyol Paraguay', es_pa:'Bahasa Spanyol Panama', en_my:'Inggris (Malaysia)', pt_gw:'Kriol Guinea-Bissau', tsz:'Bahasa Purépecha', nez:'Bahasa Nez Perce', nv2:'bahasa Apache Barat', woe:'bahasa Woleai', pmt:'Bahasa Tuamotuan', bin:'bahasa Edo', khw:'Bahasa Khowar',  xav:'Bahasa Xavante', ter:'Bahasa Terena', bor:'Bahasa Bororo', trn:'Bahasa Mojeño Trinitario', ake:'Bahasa Akawaio', aoc:'Bahasa Pemón', gun:'Bahasa Mbyá Guaraní',  zdj:'Bahasa Komori (Shikomori)', ayl:'Bahasa Arab Libya', abv:'Bahasa Arab Bahrani', afb:'Bahasa Arab Golf', acw:'Bahasa Arab Oman', swb:'Bahasa Mahorais',  adx:'Bahasa Tibet Amdo', qxs:'bahasa Qiang Selatan', duu:'bahasa Drung', jya:'Bahasa Situ rGyalrong', ers:'Bahasa Ersu', bca:'Bai Tengah', atb:'Bahasa Zaiwa', prk:'bahasa Parauk Wa', slr:'bahasa Salar', ybe:'Yugur Barat', yuy:'Yugur Timur', mjg:'Bahasa Monguor', sce:'bahasa Dongxiang', peh:'bahasa Bonan', bua:'Bahasa Buryat', cjs:'Bahasa Shor', dlg:'Bahasa Dolgan', kdt:'Bahasa Kuay', blk:'Bahasa Pa\'O', njo:'Bahasa Ao Naga', srb:'Bahasa Sora', kjg:'bahasa Khmu', mro:'Bahasa Mru', gon:'Bahasa Gondi', bfq:'bahasa Badaga', som:'Somali', har:'Bahasa Harari',  es_pr:'Spanyol (Puerto Riko)', es_do:'Bahasa Spanyol (Republik Dominika)', es_gt:'Spanyol (Guatemala)', es_ec:'Bahasa Spanyol (Ekuador)', es_uy:'Bahasa Spanyol (Uruguay)', ar_sy:'Arab (Suriah)', ar_ye:'Bahasa Arab (Yemeni)', ar_dz:'Bahasa Arab (Dialek Aljazair)', ar_sa:'Bahasa Arab (Arab Saudi)', ar_lb:'Arab (Lebanon)', en_wls:'bahasa Inggris (Wales)', en_jam:'Bahasa Inggris (Jamaika)', en_ng:'Bahasa Inggris (Nigeria)', en_ph:'Bahasa Inggris (Filipina)', en_ke:'Bahasa Inggris (Kenia)', fr_sn:'Perancis (Senegalese)', fr_ci:'Bahasa Perancis (Pantai Gading)', fr_ht:'Prancis (Haiti)', pt_mz:'Bahasa Portugis (Mozambik)', pt_cv:'Bahasa Portugis (Kep. Verde)',  nl_be:'Bahasa Belanda (Belgia)', en_us:'Bahasa Inggris (Amerika)', en_ca:'Bahasa Inggris (Kanada)', en_za:'Bahasa Inggris (Afrika Selatan)', de_ch:'Bahasa Jerman (Swiss)', pt_ao:'undefined (Angola)', es_ve:'undefined (Venezuela)', ca_va:'Bahasa Valencia',  nan_pera:'Hokkien Peranakan (Baba-Nyonya)', zh_th:'Mandarin Tionghoa Thailand', zh_tw:'Mandarin Taiwan', nan_th:'Teochew Tionghoa Thailand', zh_us:'Mandarin Tionghoa Amerika', yue_us:'Kanton Tionghoa Amerika', dng:'Dungan', ko_hun:'Hanja-hun (bacaan asli Korea)', ja_kun:'Kun-yomi (bacaan asli Jepang)', phm:'Proto-Hmong-Mien', pmgl:'Proto-Mongolik', ptai:'Proto-Tai', paa:'Proto-Austroasia', ptung:'Proto-Tungusik', pja:'Proto-Japonik', pko:'Proto-Korea', ptb:'Proto-Tibet-Burma', pst:'Proto-Sino-Tibet', ko_zai:'Sino-Korea Zainichi', bo_sino:'Sino-Tibet Modern', vi_ohan:'Sino-Vietnam Kuno', ja_ojp:'Sino-Jepang Kuno', ko_mid:'Korea Pertengahan', sjo:'Sibe', nan_id:'Hokkien Medan', nan_my:'Hokkien Malaysia', nan_sg:'Hokkien Singapura', yue_mo:'Kanton Makau', yue_hk:'Kanton Hong Kong', zh_phagspa:'Cina Yuan (Phags-pa)', zh_yuan:'Mandarin Yuan', bca:'Bai (Tengah)', ja:'Bahasa Jepang', ja_osa: "Jepang (Osaka)", ja_aom: "Jepang (Aomori)", ja_oki: "Bahasa Okinawa", ja_hak: "Jepang (Hakata)", ja_edo: "Jepang (zaman Edo)", ja_kanbun:'Pembacaan Kanbun Jepang', ko:'Bahasa Korea', ko_kp: "Korea (Korea Utara)", ko_bus: "Korea (Busan)", zh:'Bahasa Mandarin', yue:'Bahasa Kanton', nan:'Bahasa Taiwan', wuu:'Wu Shanghai', zh_song: "Tionghoa (Klasik)", zh_wenyan_edu:'Bahasa Cina Klasik (lafal Kanton)', vi:'Bahasa Vietnam Utara', vi_c:'Bahasa Vietnam Tengah', vi_s:'Bahasa Vietnam Selatan', vi_nom: "Vietnam (Chữ Nôm)", vi_han:'Bahasa Cina Klasik (bacaan Sino-Vietnam)', th:'Bahasa Thai', id:'Bahasa Indonesia', sa:'Bahasa Sanskerta', sa_edu:'Bahasa Sanskerta Lisan Modern', hi:'Bahasa Hindi', en:'Bahasa Inggris', en_aave: "Inggris (AAVE)", en_south: "Inggris (AS Selatan)", en_app: "Inggris (Appalachia)", en_ie: "Inggris (Irlandia)", en_sco: "Inggris (Skotlandia)", en_yk: "Inggris (Yorkshire)", en_ck: "Inggris (Cockney)", de:'Bahasa Jerman', de_lut:'Bahasa Jerman Tinggi Baru Awal (era Luther)', fr:'Bahasa Prancis', fr_class:'Bahasa Prancis Klasik (abad ke-17)', it:'Bahasa Italia', it_dan:'Bahasa Italia (era Dante)', es_eu:'Bahasa Spanyol (Eropa)', es_sgl:'Bahasa Spanyol Zaman Keemasan', es_mx:'Bahasa Spanyol (Meksiko)', pt_eu:'Bahasa Portugis (Eropa)', pt_br:'Bahasa Portugis (Brasil)', la:'Bahasa Latin', ru:'Bahasa Rusia', uk:'Bahasa Ukraina', ar:'Bahasa Arab (standar)', ar_qur:"Bahasa Arab Al-Qur'an", ar_eg: "Arab (Mesir)", he:'Bahasa Ibrani', he_mis:'Ibrani Misyna', sw:'Bahasa Swahili', tr:'Bahasa Turki', fa:'Bahasa Persia', fa_clas:'Bahasa Persia (Klasik)', tl:'Bahasa Tagalog', ga:'Bahasa Irlandia', eu:'Bahasa Basque', mn:'Bahasa Mongolia', my:'Bahasa Myanmar', am:'Bahasa Amhara', egy:'Bahasa Mesir Kuno', ta:'Bahasa Tamil', hu:'Bahasa Hungaria', nl:'Bahasa Belanda', pl:'Bahasa Polandia', ms:'Bahasa Melayu', mg:'Bahasa Malagasi', cy:'Bahasa Wales', fi:'Bahasa Finlandia', ain:'Bahasa Ainu', bn:'Bahasa Bengali', ur:'Bahasa Urdu', te:'Bahasa Telugu', jv:'Bahasa Jawa', ko_jeju: "Bahasa Jeju", ko_em: "Korea (Awal Modern)", ka:'Bahasa Georgia', el:'Bahasa Yunani', el_grc:'Bahasa Yunani Kuno', el_kath:'Bahasa Yunani (Katharevousa)', nv:'Bahasa Navajo', qu:'Bahasa Quechua', mi:'Bahasa Māori', haw:'Bahasa Hawaii', km:'Bahasa Khmer', lo:'Bahasa Lao', yo:'Bahasa Yoruba', zu:'Bahasa Zulu', bo:'Bahasa Tibet', xct_litpr:'Bahasa Tibet Klasik Liturgis', hy:'Bahasa Armenia', hy_grab:'Bahasa Armenia Klasik (Grabar)' , ja_kyo: "Jepang (Kyoto)", ja_hir: "Jepang (Hiroshima)", ja_mvi:'Bahasa Miyako', ja_rys:'Bahasa Yaeyama', ar_lev: "Arab (Levant)", ar_ma: "Arab (Maroko)", ar_gulf: "Arab (Teluk)", zh_sc: "Tionghoa (Sichuan)", zh_db: "Bahasa Mandarin Timur Laut", nap:'Bahasa Napoli', scn:'Bahasa Sisilia', de_gsw: "Jerman (Swiss)", fr_qc: "Prancis (Québec)", sco:'Bahasa Skotlandia', en_sg: "Inggris (Singapura)", hwc: "Kreol Hawaii", pcm:'Pidgin Nigeria', tpi:'Tok Pisin', en_ang:'Bahasa Inggris Kuno', sv:'Bahasa Swedia', no:'Bahasa Norwegia', si:'Bahasa Sinhala', ro:'Bahasa Romania', cs:'Bahasa Ceko', ca:'Bahasa Katalan', da:'Bahasa Denmark', is:'Bahasa Islandia', lt:'Bahasa Lituania', sq:'Bahasa Albania', mt:'Bahasa Malta', so:'Bahasa Somali', ml:'Bahasa Malayalam', pa:'Bahasa Punjabi', ku:'Bahasa Kurdi', ug:'Bahasa Uyghur', kk:'Bahasa Kazakh', ha:'Bahasa Hausa', ig:'Bahasa Igbo', eo:'Bahasa Esperanto', tok:'Toki Pona', ht:'Bahasa Kreol Haiti', ps:'Bahasa Pashto', uz:'Bahasa Uzbek', mr:'Bahasa Marathi', gu:'Bahasa Gujarat', kn:'Bahasa Kannada', ne:'Bahasa Nepal', om:'Bahasa Oromo', ti:'Bahasa Tigrinya', wo:'Bahasa Wolof', ln:'Bahasa Lingala', sn:'Bahasa Shona', sr:'Bahasa Serbia', bg:'Bahasa Bulgaria', sk:'Bahasa Slowakia', lv:'Bahasa Latvia', et:'Bahasa Estonia', be:'Bahasa Belarus', yi:'Bahasa Yiddish', non:'Bahasa Norse Kuno', arc:'Bahasa Aram', cop:'Bahasa Koptik', rom:'Bahasa Romani', br:'Bahasa Breton', xh:'Bahasa Xhosa', lad:'Bahasa Ladino', tlh:'Bahasa Klingon', jbo:'Bahasa Lojban', fj:'Bahasa Fiji', sm:'Bahasa Samoa', zh_han: "Tionghoa (Han Klasik)", zh_tang: "Tionghoa (Tang Klasik)", ceb:'Cebuano', su:'Sunda', th_isan:'Thai (Isan)', es_co:'Spanyol (Kolombia)', es_cl:'Spanyol (Chili)', gl:'Galisia', oc:'Oksitan', fo:'Faroe', jam:'Patois Jamaika', pap:'Papiamento', gd: "Gaelik Skotlandia", sl: "Slovenia", enm: "Inggris Pertengahan", en_em:'Bahasa Inggris Modern Awal', fr_ch: "Prancis (Swiss)", to: "Tonga", se: "Sami Utara", af: "Afrikaans", akk: "Akkadia", ar_iq: "Arab (Irak)", ar_sd: "Arab (Sudan)", ar_tn: "Arab (Tunisia)", as: "Assam", az: "Azerbaijan", bho: "Bhojpuri", cdo: "Min Timur", chr: "Cherokee", ckb: "Kurdi (Sorani)", cu: "Slavonik Gereja Kuno", de_at: "Jerman (Austria)", de_by: "Jerman (Bavaria)", en_au: "Inggris (Australia)", en_in: "Inggris (India)", es_an: "Spanyol (Andalusia)", es_ar: "Spanyol (Argentina)", es_cu: "Spanyol (Kuba)", es_pe: "Spanyol (Peru)", fr_af: "Prancis (Afrika)", fr_be: "Prancis (Belgia)", fy: "Frisia", gn: "Guaraní", got: "Gothik", hak_cn: "Hakka", hit: "Hittit", hmn: "Hmong", ii: "Yi (Nuosu)", ilo: "Ilocano", ine: "Proto-Indo-Eropa", iu: "Inuktitut", ja_heian: "Jepang (zaman Heian)", ko_yb: "Korea (Yanbian)", ky: "Kirgiz", mn_cn: "Mongolia (Mongolia Dalam)", mnc: "Manchu", myn: "Maya Klasik", nci: "Nahuatl Klasik", nds: "Jerman Rendah", nn: "Norwegia (Nynorsk)", ny: "Chewa", or: "Odia", pi: "Pali", pi_edu:'Bahasa Pali Pedagogis (Theravada)', rm: "Romansh", rw: "Kinyarwanda", sc: "Sardinia", sd: "Sindhi", sux: "Sumeria", tg: "Tajik", th_n: "Thai (Utara)", th_s: "Thai (Selatan)", tk: "Turkmen", vec: "Venetia", za: "Zhuang", pau: "Palau", sah: 'bahasa Sakha', tyv: 'bahasa Tuva', kjh: 'bahasa Khakas', alt: 'bahasa Altai', bxr: 'bahasa Buryat', evn: 'bahasa Evenki', eve: 'bahasa Even', yrk: 'bahasa Nenets', kca: 'bahasa Khanty', ckt: 'bahasa Chukchi', niv: 'bahasa Nivkh', ket: 'bahasa Ket', cjy: 'Bahasa Jin', hsn: 'Bahasa Xiang', gan: 'Bahasa Gan', mai: 'bahasa Maithili', awa: 'bahasa Awadhi', skr: 'bahasa Saraiki', sat: 'bahasa Santali', mad: 'bahasa Madura', hil: 'bahasa Hiligaynon', bal: 'bahasa Balochi', ak: 'bahasa Akan (Twi)', mk: 'bahasa Makedonia', lg: 'bahasa Luganda', ki: 'bahasa Kikuyu', tn: 'bahasa Tswana', st: 'bahasa Sotho Selatan', ts: 'bahasa Tsonga', ve: 'bahasa Venda', bem: 'bahasa Bemba', lua: 'bahasa Luba-Kasai', kg: 'bahasa Kongo', ff: 'bahasa Fula', bm: 'bahasa Bambara', kab: 'bahasa Kabyle', yua: 'bahasa Maya Yucatec', tzo: 'bahasa Tzotzil', mix: 'bahasa Mixtec', zap: 'bahasa Zapotec', ay: 'bahasa Aymara', arn: 'bahasa Mapuche', cr: 'bahasa Cree (Dataran)', oj: 'bahasa Ojibwe', lkt: 'bahasa Lakota', kl: 'bahasa Greenland', ce: 'bahasa Chechen', inh: 'bahasa Ingush', av: 'bahasa Avar', lez: 'bahasa Lezgi', dar: 'bahasa Dargwa', lbe: 'bahasa Lak', tab: 'bahasa Tabasaran', ady: 'bahasa Adyghe', kbd: 'bahasa Kabardian', ab: 'bahasa Abkhaz', xmf: 'bahasa Mingrelia', os: 'bahasa Ossetia', ty: 'bahasa Tahiti', niu: 'bahasa Niue', tvl: 'bahasa Tuvalu', rap: 'bahasa Rapanui', rar: 'bahasa Māori Kepulauan Cook', mh: 'bahasa Marshall', gil: 'bahasa Kiribati', ch: 'bahasa Chamorro', tet: 'bahasa Tetum', bi: 'bahasa Bislama', pjt: 'bahasa Pitjantjatjara', wbp: 'bahasa Warlpiri', mni: 'bahasa Manipur', new: 'bahasa Newar', brx: 'bahasa Bodo', lus: 'bahasa Mizo', dz: 'bahasa Dzongkha', min: 'bahasa Minangkabau', ban: 'bahasa Bali', ace: 'bahasa Aceh', bug: 'bahasa Bugis', war: 'bahasa Waray', bik: 'bahasa Bikol Tengah', tum: 'bahasa Tumbuka', din: 'bahasa Dinka', nus: 'bahasa Nuer', luo: 'bahasa Luo', mas: 'bahasa Maasai', aa: 'bahasa Afar', shi: 'bahasa Tashelhit', rif: 'bahasa Tarifit', mwr: 'bahasa Marwari', bgc: 'bahasa Haryanvi', ks: 'bahasa Kashmir', kok: 'bahasa Konkani', mnp: 'Min Bei', nan_te: 'Bahasa Teochew', yue_ts: 'Bahasa Taishan', czh: 'Bahasa Hui', cnp: 'Bahasa Pinghua', zh_jh: 'Bahasa Mandarin Jianghuai', zh_tj: 'Bahasa Mandarin Tianjin', zh_lz: 'Bahasa Mandarin Lanyin', dng: 'bahasa Dungan', hsb: 'bahasa Sorbia Hulu', csb: 'bahasa Kashubia', fur: 'bahasa Friuli', ast: 'bahasa Asturia', an: 'bahasa Aragon', rup: 'bahasa Aroman', wa: 'bahasa Walloon', udm: 'bahasa Udmurt', mhr: 'bahasa Mari Padang', myv: 'bahasa Erzya', krl: 'bahasa Karelia', mzn: 'bahasa Mazandarani', glk: 'bahasa Gilaki', lrc: 'bahasa Lori', crh: 'bahasa Tatar Krimea', tt: 'bahasa Tatar', ba: 'bahasa Bashkir', krc: 'bahasa Karachay-Balkar', ksw: 'bahasa Karen Sgaw', lhu: 'bahasa Lahu', lis: 'bahasa Lisu', nxq: 'bahasa Naxi', shn: 'bahasa Shan', ee: 'bahasa Ewe', nyn: 'bahasa Runyankole', luy: 'bahasa Luhya', ssw: 'bahasa Swati', nbl: 'bahasa Ndebele Selatan', nso: 'bahasa Sotho Utara', fan: 'bahasa Fang', naq: 'bahasa Nama (Khoekhoe)', hts: 'bahasa Hadza', kr: 'bahasa Kanuri', men: 'bahasa Mende', dyu: 'bahasa Dyula', syl: 'bahasa Sylhet', mag: 'bahasa Magahi', doi: 'bahasa Dogri', xkk: 'bahasa Khmu', moh: 'bahasa Mohawk', cho: 'bahasa Choctaw', esu: 'bahasa Yupik Alaska Tengah', ipk: 'bahasa Iñupiaq', apw: 'bahasa Apache Barat', dak: 'bahasa Dakota', chy: 'bahasa Cheyenne', lmo: 'bahasa Lombardia', pms: 'bahasa Piemonte', eml: 'bahasa Emilia-Romagna', mwl: 'bahasa Mirandese', pnt: 'bahasa Yunani Pontus', hno: 'bahasa Hindko', bhb: 'bahasa Bhili', cja: 'bahasa Cham', hmo: 'bahasa Hiri Motu', pon: 'bahasa Pohnpei', vmw: 'bahasa Makhuwa', dsb: 'bahasa Sorbia Hilir', gv: 'bahasa Manx', kw: 'bahasa Kornwall', zza: 'bahasa Zaza', brh: 'bahasa Brahui', mrq: 'bahasa Marquesa', tiw: 'bahasa Tiwi', guc: 'bahasa Wayuu', myp: 'bahasa Pirahã', emp: 'bahasa Emberá Utara', kpe: 'bahasa Kpelle', loz: 'bahasa Lozi', bbc: 'bahasa Batak Toba', bjn: 'bahasa Banjar', sas: 'bahasa Sasak', kha: 'bahasa Khasi', mns: 'bahasa Mansi', mrw: 'bahasa Maranao', tsg: 'bahasa Tausug', yap: 'bahasa Yap', chk: 'bahasa Chuuk', gbm: 'bahasa Garhwal', kfy: 'bahasa Kumaoni', xnr: 'bahasa Kangri', hr: 'bahasa Kroasia', bs: 'bahasa Bosnia', iba: 'bahasa Iban', ljp: 'bahasa Lampung', tzm: 'bahasa Tamazight Atlas Tengah', ng: 'bahasa Ndonga', umb: 'bahasa Umbundu', kmb: 'bahasa Kimbundu', her: 'bahasa Herero', xal: 'bahasa Kalmyk', sg: 'bahasa Sango', toi: 'bahasa Tonga (Zambia)', peo: 'bahasa Persia Kuno', ave: 'bahasa Avesta', xto: 'bahasa Tokharia A', txb: 'bahasa Tokharia B', phn: 'bahasa Fenisia', uga: 'bahasa Ugarit', xlu: 'bahasa Luwi', pal: 'bahasa Persia Pertengahan (Pahlavi)', syc: 'bahasa Suryani Klasik', fro: 'bahasa Prancis Kuno', goh: 'bahasa Jerman Atas Kuno', gez: "bahasa Ge'ez", gmy: 'bahasa Yunani Mykenae', xct: 'bahasa Tibet Klasik', xpu: 'bahasa Punik', xhu: 'bahasa Hurri', elx: 'bahasa Elam', xsa: 'bahasa Saba', kaw: 'bahasa Jawa Kuno (Kawi)', kho: 'bahasa Khotan', gmh: 'bahasa Jerman Atas Pertengahan', osp: 'bahasa Spanyol Kuno', okz: 'bahasa Khmer Kuno', osx: 'bahasa Saxon Kuno', smg: 'bahasa Sukuma', mos: 'bahasa Mòoré', kln: 'bahasa Kalenjin', mfe: 'bahasa Kreol Mauritius', mnk: 'bahasa Mandinka', bqi: 'bahasa Bakhtiari', unr: 'bahasa Mundari', hoc: 'bahasa Ho', enq: 'bahasa Enga', xpr: 'bahasa Parthia', xqa: 'bahasa Karakhanid', sga: 'bahasa Irlandia Kuno', bsk: 'bahasa Burushaski', yag: 'bahasa Yaghnobi', srn: 'bahasa Sranan Tongo', kwk: "bahasa Kwak'wala", sad: 'bahasa Sandawe', pcc: 'bahasa Bouyei', iuu: 'bahasa Iu Mien', hui: 'bahasa Huli', tkl: 'bahasa Tokelau', squ: 'bahasa Squamish', mga: 'bahasa Irlandia Pertengahan', hbo: 'bahasa Ibrani Alkitabiah', mpt: 'bahasa Mian', ygr: 'bahasa Yagaria', quz: 'bahasa Quechua Cusco', quy: 'bahasa Quechua Ayacucho', cab: 'bahasa Garifuna', crx: 'bahasa Carrier', tsi: 'bahasa Tsimshian Pesisir', wbl: 'bahasa Wakhi', psi: 'bahasa Pashai', bgq: 'bahasa Bagri', ach: 'bahasa Acholi', rki: 'bahasa Rakhine', kxm: 'bahasa Khmer Utara', xng: 'bahasa Mongol Pertengahan', ja_kg: 'Jepang (Kagoshima)', ja_sd: 'Jepang (Sendai)', ko_hg: 'Korea (Hamgyŏng)', ko_jl: 'Korea (Jeolla)', nan_pn: 'Hokkien Penang', mra: 'bahasa Mlabri', wuu_nb: 'bahasa Ningbo', yue_gz: 'Yue Gaozhou', khb: 'bahasa Tai Lue', pam: 'bahasa Kapampangan', pag: 'bahasa Pangasinan', mdh: 'bahasa Maguindanao', gor: 'bahasa Gorontalo', mak: 'bahasa Makassar', fon: 'bahasa Fon', kri: 'bahasa Krio', dag: 'bahasa Dagbani', xog: 'bahasa Soga', teo: 'bahasa Ateso', dyo: 'bahasa Jola-Fonyi', bci: 'bahasa Baoulé', tcy: 'bahasa Tulu', haz: 'bahasa Hazaragi', tly: 'bahasa Talysh', kaa: 'bahasa Karakalpak', bej: 'bahasa Beja', tig: 'bahasa Tigre', ssy: 'bahasa Saho', ewo: 'bahasa Ewondo', bum: 'bahasa Bulu', ndc: 'bahasa Ndau', ote: 'bahasa Otomi', tar: 'bahasa Tarahumara', och:'Tionghoa Kuno', ojp:'Jepang Kuno', vsa:'Sanskerta Weda', txg:'Tangut', sog:'Sogdia', otk:'Turkik Kuno', zkt:'Khitan', juc:'Jurchen', omx:'Mon Kuno', pyx:'Pyu', obr:'Burma Kuno', occ:'Cham Kuno', orv:'Slavia Timur Kuno', xsc:'Skithia', sukh:'Thai Kuno (Sukhothai)', xmr:'Meroitik', onw:'Nubia Kuno', cqu:'Quechua Klasik', omc:'Mochica', chb:'Chibcha', oma:'Melayu Kuno', osu:'Sunda Kuno', otl:'Tagalog Kuno', ami:'Amis', pwn:'Paiwan', tay:'Atayal', bnn:'Bunun', trv:'Truku/Seediq', tsu:'Tsou', tao:'Tao/Yami', hak_tw:'Hakka Taiwan', wuu_sz:'Wu Suzhou', wuu_wz:'Wu Wenzhou', nan_qz:'Hokkien Quanzhou', nan_hai:'Hainan', zh_wh:'Bahasa Mandarin Wuhan', zh_zz:'Mandarin Zhongyuan', hak_hl:'Hakka Hailu', cpx:'Min Pu-Xian', mfa:'Melayu Patani', mtq:'Mường', tyz:'Tày', kjp:'Karen Pwo', kac:'Jingpo (Kachin)', wbm:'Wa', ahk:'Akha', dtp:'Kadazan-Dusun', hne:"Chhattisgarhi", mnw:"Mon", grt:"Garo", nut:"Nùng", quc:"Kʼicheʼ", kek:"Qʼeqchiʼ", mam:"Mam", wal:"Wolaytta", sid:"Sidama", tji:"Tujia", nij:"Ngaju", sda:"Toraja-Sa'dan", arq:'Bahasa Arab Aljazair', mey:'Bahasa Arab Hassaniya', tmh:'Bahasa Tamasheq (Tuareg)', azb:'Bahasa Azerbaijan Selatan', gag:'Bahasa Gagauz', sma:'Bahasa Sámi Selatan', vro:'Bahasa Võro', pjk:'Proto-Japonik-Koreanik', oko:'Bahasa Korea Kuno (Silla)', okg:'Bahasa Goguryeo', ko_gor:'Bahasa Goryeo', ja_chu:'Bahasa Jepang Pertengahan', pry:'Proto-Ryukyu', lld:'Bahasa Ladin', stq:'Bahasa Frisia Saterland', wym:'Bahasa Wymysorys', yuc:'Bahasa Yuchi', kgg:'Bahasa Kusunda', ota:'Bahasa Turki Utsmaniyah', cmg:'Bahasa Mongolia Klasik', ett:'Bahasa Etruska', xht:'Bahasa Hatti', txr:'Bahasa Tartessos', roo:'bahasa Rotokas', nmn:'bahasa Taa', lbz:'bahasa Lardil', nny:'bahasa Yangkaal', kky:'bahasa Guugu Yimithirr', blc:'bahasa Nuxalk', tue:'bahasa Tuyuca', ncs:'Bahasa Isyarat Nikaragua', uby:'bahasa Ubykh', lbz_damin:'bahasa Damin'},
    hi: { es_cr:'स्पेनिश (कोस्टा रिका)', es_hn:'स्पेनिश', es_ni:'स्पेनिश (निकारागुआ)', es_sv:'स्पेनिश (एल सल्वाडोर)', ar_jo:'जॉर्डन अरबी', ar_ps:'फ़िलिस्तीनी अरबी', fr_lu:'फ्रेंच', fr_cm:'कैमेरून फ्रेंच', de_lu:'जर्मन (लक्समबर्ग)', en_ng2:'अंग्रेज़ी (घाना)', pt_mo:'मकाऊ पुर्तगाली भाषा', lb:'लक्जमबर्गिश भाषा', gcr:'फ्रेंच गुयाना क्रिओल', acf:'सेंट लूसियाई क्रिएल भाषा',  gan_yc:'गान चीनी (यिचुन बोली)', gan_ja:'गान (जीआन)', gan_fz:'गान (फुज़ो)', cjy_lv:'लुलियांग जिन', cjy_xz:'जिन चीनी (शिनज़ु बोली)', hsn_hy:'शियांग (हेंग्यांग)', hsn_yz:'शिआंग भाषा (योंगझोउ बोली)', czh_wy:'हुई चीनी (वुयुआन)',  bla:'ब्लैकफुट भाषा', hop:'होपी भाषा', com:'कोमांचे भाषा', one:'ओनीडा भाषा', ono:'ओनोंडागा भाषा', win:'हो-चंक भाषा', cro:'क्रो भाषा', hai:'हैडा भाषा', cic:'चिकेसॉ भाषा', ik:'इनुपियाक', na:'नाउरुआन भाषा', luz:'उत्तरी लूरी भाषा', es_bo:'स्पेनी (बोलीविया)', es_py:'पराग्वेयन स्पेनिश', es_pa:'पनामा स्पेनिश', en_my:'अंग्रेजी (मलेशिया)', pt_gw:'गिनी-बिसाऊ क्रेओल', tsz:'पुरेपेचा भाषा', nez:'नेज पर्स भाषा', nv2:'पश्चिमी अपाचे', woe:'वोलेयाई', pmt:'तुआमोतुआन भाषा', bin:'एडो भाषा', khw:'खोवार भाषा',  xav:'जवंते भाषा', ter:'तेरेना भाषा', bor:'बोरोरो', trn:'त्रिनिटारियो मोजेनो भाषा', ake:'अकावायो भाषा', aoc:'पेमॉन', gun:'म्ब्या गुआरानी भाषा',  zdj:'कोमोरी भाषा (शिकोमोरी)', ayl:'लीबियाई अरबी', abv:'बहरैनी अरबी भाषा', afb:'खाड़ी अरबी', acw:'ओमानी अरबी', swb:'माहोरेस',  adx:'आम्दो तिब्बती भाषा', qxs:'दक्षिणी क्यांग भाषा', duu:'ड्रुंग भाषा', jya:'सिटु र्ग्यालरोंग भाषा', ers:'एर्सु भाषा', bca:'मध्य बाई भाषा', atb:'ज़ैवा भाषा', prk:'पराउक वा भाषा', slr:'सालार भाषा', ybe:'पश्चिमी युगुर', yuy:'पूर्वी युगुर', mjg:'मोंगुओर भाषा', sce:'डोंगक्सिआंग भाषा', peh:'बोनान भाषा', bua:'बुर्यात भाषा', cjs:'शोर भाषा', dlg:'डोलगन भाषा', kdt:'कुय भाषा', blk:'पा\'ओ भाषा', njo:'आओ नागा भाषा', srb:'सोरा भाषा', kjg:'खमु', mro:'मरू भाषा', gon:'गोंडी', bfq:'बडगा भाषा', som:'सोमाली', har:'हरारी भाषा',  es_pr:'स्पेनिश (प्यूर्टोरिकान)', es_do:'स्पेनिश (डोमिनिकन गणराज्य)', es_gt:'स्पेनिश (ग्वाटेमाला)', es_ec:'स्पेनिश (इक्वेडोर)', es_uy:'स्पेनिश (उरुग्वे)', ar_sy:'अरबी (सीरियाई)', ar_ye:'अरबी (येमनी)', ar_dz:'अरबी (अल्जीरियाई बोली)', ar_sa:'अरबी (सऊदी अरब)', ar_lb:'अरबी (लेबनानी)', en_wls:'अंग्रेजी (वेल्श)', en_jam:'अंग्रेजी (जमैका)', en_ng:'अंग्रेजी (नाइजीरिया)', en_ph:'अंग्रेजी (फिलीपींस)', en_ke:'अंग्रेजी (केन्या)', fr_sn:'फ्रेंच (सेनेगली)', fr_ci:'फ्रेंच (आइवरी कोस्ट)', fr_ht:'फ्रेंच (हैती)', pt_mz:'पुर्तगाली (मोजाम्बिक)', pt_cv:'पुर्तगाली (केप वर्डे)',  nl_be:'डच (बेल्जियन)', en_us:'अंग्रेज़ी (अमेरिकी)', en_ca:'अंग्रेज़ी (कनाडाई)', en_za:'अंग्रेज़ी (दक्षिण अफ़्रीकी)', de_ch:'जर्मन (स्विस)', pt_ao:'undefined (अंगोलाई)', es_ve:'undefined (वेनेज़ुएलाई)', ca_va:'वालेंसियाई',  nan_pera:'पेरानाकन होक्किएन', zh_th:'थाई-चीनी मंदारिन', zh_tw:'ताइवानी मंदारिन', nan_th:'थाई-चीनी चाओझाओ', zh_us:'अमेरिकी मंदारिन', yue_us:'अमेरिकी कैंटोनीज़', dng:'दुंगन', ko_hun:'हानजा-हुन (मूल कोरियाई पठन)', ja_kun:'कुन-योमि (जापानी मूल पठन)', phm:'आद्य मियाओ-याओ', pmgl:'आद्य मंगोलिक', ptai:'आद्य ताई', paa:'आद्य ऑस्ट्रोएशियाई', ptung:'आद्य तुंगुस', pja:'आद्य जापानी', pko:'आद्य कोरियाई', ptb:'आद्य तिब्बती-बर्मी', pst:'आद्य चीन-तिब्बती', ko_zai:'ज़ैनिची कोरियाई सिनो', bo_sino:'आधुनिक तिब्बती सिनो', vi_ohan:'पुराना सिनो-वियतनामी', ja_ojp:'प्राचीन जापानी सिनो', ko_mid:'मध्य-कोरियाई', sjo:'सीबे', nan_id:'इंडोनेशियाई होक्किएन', nan_my:'मलेशियाई होक्किएन', nan_sg:'सिंगापुर होक्किएन', yue_mo:'मकाओ कैंटोनीज़', yue_hk:'हांगकांग कैंटोनीज़', zh_phagspa:'युआन-काल चीनी (फग्स-पा)', zh_yuan:'युआन-काल मानक चीनी', bca:'बाई (मध्य)', ja:'जापानी', ja_osa:'ओसाका बोली', ja_aom:'आओमोरी बोली', ja_oki:'ओकिनावान', ja_hak:'हकाता बोली', ja_edo: "जापानी (एदो काल)", ja_kanbun:'जापानी कानबुन वाचन', ko:'कोरियाई', ko_kp: "कोरियाई (उत्तर कोरिया)", ko_bus:'बुसान बोली', zh:'चीनी (मंदारिन)', yue:'कैंटोनीज़', nan:'ताइवानी', wuu:'शंघाई वू', zh_song:'शास्त्रीय चीनी', zh_wenyan_edu:'शास्त्रीय चीनी (कैंटोनी उच्चारण)', vi:'उत्तरी वियतनामी', vi_c:'मध्य वियतनामी', vi_s:'दक्षिणी वियतनामी', vi_nom:'चू नोम', vi_han:'वियतनामी हान-वान (चीनी-वियतनामी पाठ)', th:'थाई', id:'इंडोनेशियाई', sa:'संस्कृत', sa_edu:'सरल आधुनिक संस्कृत', hi:'हिन्दी', en:'अंग्रेज़ी', en_aave: "अंग्रेज़ी (AAVE)", en_south:'अंग्रेज़ी (दक्षिणी अमेरिका)', en_app:'अंग्रेज़ी (ऐपलेशिया)', en_ie:'अंग्रेज़ी (आयरिश)', en_sco:'अंग्रेज़ी (स्कॉटिश)', en_yk:'अंग्रेज़ी (यॉर्कशायर)', en_ck:'अंग्रेज़ी (कॉकनी)', de:'जर्मन', de_lut:'प्रारंभिक नव उच्च जर्मन (लूथर युग)', fr:'फ़्रेंच', fr_class:'शास्त्रीय फ़्रेंच (17वीं सदी)', it:'इतालवी', it_dan:'इतालवी (दान्ते-कालीन)', es_eu:'स्पेनिश (यूरोप)', es_sgl:'स्वर्ण युग की स्पेनी', es_mx:'स्पेनिश (मेक्सिको)', pt_eu:'पुर्तगाली (यूरोप)', pt_br:'पुर्तगाली (ब्राज़ील)', la:'लैटिन', ru:'रूसी', uk:'यूक्रेनी', ar:'अरबी (मानक)', ar_qur:'क़ुरआनी अरबी', ar_eg:'अरबी (मिस्री)', he:'हिब्रू', he_mis:'मिश्नाई हिब्रू', sw:'स्वाहिली', tr:'तुर्की', fa:'फ़ारसी', fa_clas:'फ़ारसी (शास्त्रीय)', tl:'तागालोग', ga:'आयरिश', eu:'बास्क', mn:'मंगोलियाई', my:'बर्मी', am:'अम्हारी', egy:'प्राचीन मिस्री', ta:'तमिल', hu:'हंगेरियन', nl:'डच', pl:'पोलिश', ms:'मलय', mg:'मालागासी', cy:'वेल्श', fi:'फ़िनिश', ain:'ऐनु', bn:'बांग्ला', ur:'उर्दू', te:'तेलुगु', jv:'जावानी', ko_jeju:'जेजू', ko_em: "कोरियाई (आरंभिक आधुनिक)", ka:'जॉर्जियाई', el:'यूनानी', el_grc:'प्राचीन यूनानी', el_kath:'यूनानी (काथारेवुसा)', nv:'नवाहो', qu:'क्वेचुआ', mi:'माओरी', haw:'हवाईयन', km:'ख्मेर', lo:'लाओ', yo:'योरूबा', zu:'ज़ुलू', bo:'तिब्बती', xct_litpr:'धार्मिक शास्त्रीय तिब्बती', hy:'आर्मेनियाई', hy_grab:'शास्त्रीय अर्मेनियाई (ग्राबार)' , ja_kyo:'क्योतो बोली', ja_hir:'हिरोशिमा बोली', ja_mvi:'मियाको', ja_rys:'याएयामा', ar_lev:'अरबी (लेवेंटाइन)', ar_ma:'अरबी (मोरक्को)', ar_gulf:'अरबी (खाड़ी)', zh_sc:'सिचुआनी', zh_db:'उत्तर-पूर्वी मंदारिन', nap:'नेपोलिटन', scn:'सिसिलियन', de_gsw:'स्विस जर्मन', fr_qc:'क्वेबेक फ़्रेंच', sco:'स्कॉट्स', en_sg:'सिंग्लिश', hwc:'हवाईयन क्रियोल', pcm:'नाइजीरियन पिजिन', tpi:'टोक पिसिन', en_ang:'पुरानी अंग्रेज़ी', sv:'स्वीडिश', no:'नॉर्वेजियन', si:'सिंहली', ro:'रोमानियाई', cs:'चेक', ca:'कातालान', da:'डेनिश', is:'आइसलैंडिक', lt:'लिथुआनियाई', sq:'अल्बानियाई', mt:'माल्टीज़', so:'सोमाली', ml:'मलयालम', pa:'पंजाबी', ku:'कुर्दी', ug:'उइगुर', kk:'कज़ाख़', ha:'हौसा', ig:'इग्बो', eo:'एस्पेरांतो', tok:'तोकी पोना', ht:'हैतियन क्रियोल', ps:'पश्तो', uz:'उज़्बेक', mr:'मराठी', gu:'गुजराती', kn:'कन्नड', ne:'नेपाली', om:'ओरोमो', ti:'तिग्रिन्या', wo:'वोलोफ़', ln:'लिंगाला', sn:'शोना', sr:'सर्बियाई', bg:'बुल्गारियाई', sk:'स्लोवाक', lv:'लातवियाई', et:'एस्तोनियाई', be:'बेलारूसी', yi:'यिद्दिश', non:'पुरानी नॉर्स', arc:'अरामी', cop:'कॉप्टिक', rom:'रोमानी', br:'ब्रेटन', xh:'कोसा', lad:'लाडिनो', tlh:'क्लिंगॉन', jbo:'लोज्बान', fj:'फ़ीजी', sm:'सामोन', zh_han:'चीनी (हान)', zh_tang:'चीनी (तांग)', ceb:'सेबुआनो', su:'सुंडानी', th_isan:'थाई (ईसान)', es_co:'स्पेनी (कोलंबिया)', es_cl:'स्पेनी (चिली)', gl:'गैलिशियन', oc:'ऑक्सिटन', fo:'फ़ैरोइज़', jam:'जमैकन पटवा', pap:'पापियामेंतो', gd: "स्कॉटिश गेलिक", sl: "स्लोवेनियाई", enm: "मध्य अंग्रेज़ी", en_em:'प्रारंभिक आधुनिक अंग्रेज़ी', fr_ch: "फ़्रेंच (स्विस)", to: "टोंगन", se: "उत्तरी सामी", af: "अफ़्रीकांस", akk: "अक्कादी", ar_iq: "अरबी (इराकी)", ar_sd: "अरबी (सूडानी)", ar_tn: "अरबी (ट्यूनीशियाई)", as: "असमिया", az: "अज़रबैजानी", bho: "भोजपुरी", cdo: "पूर्वी मिन", chr: "चेरोकी", ckb: "कुर्दी (सोरानी)", cu: "पुरानी चर्च स्लावोनिक", de_at: "जर्मन (ऑस्ट्रियाई)", de_by: "जर्मन (बवेरियन)", en_au: "अंग्रेज़ी (ऑस्ट्रेलियाई)", en_in: "अंग्रेज़ी (भारतीय)", es_an: "स्पेनिश (अंडालूसी)", es_ar: "स्पेनिश (अर्जेंटीना)", es_cu: "स्पेनिश (क्यूबाई)", es_pe: "स्पेनिश (पेरूवी)", fr_af: "फ़्रेंच (अफ़्रीकी)", fr_be: "फ़्रेंच (बेल्जियन)", fy: "फ़्रिसियन", gn: "गुआरानी", got: "गोथिक", hak_cn: "हक्का", hit: "हित्ती", hmn: "ह्मोंग", ii: "यी (नुओसू)", ilo: "इलोकानो", ine: "प्रोटो-भारोपीय", iu: "इनुक्तितूत", ja_heian: "जापानी (हेइआन काल)", ko_yb: "कोरियाई (यानबियान)", ky: "किर्गिज़", mn_cn: "मंगोलियाई (भीतरी मंगोलिया)", mnc: "मांचू", myn: "शास्त्रीय माया", nci: "शास्त्रीय नाहुआत्ल", nds: "निम्न जर्मन", nn: "नॉर्वेजियन (नीनोशक)", ny: "चेवा", or: "ओड़िया", pi: "पाली", pi_edu:'शिक्षणीय पालि (थेरवाद)', rm: "रोमान्श", rw: "किन्यारवांडा", sc: "सार्डिनियन", sd: "सिंधी", sux: "सुमेरियन", tg: "ताजिक", th_n: "थाई (उत्तरी)", th_s: "थाई (दक्षिणी)", tk: "तुर्कमेन", vec: "वेनेशियन", za: "ज़ुआंग", pau: "पलाउआन", sah: 'साखा भाषा', tyv: 'तुवा भाषा', kjh: 'खाकास भाषा', alt: 'अल्ताई भाषा', bxr: 'बुर्यात भाषा', evn: 'एवेन्की भाषा', eve: 'एवेन भाषा', yrk: 'नेनेट्स भाषा', kca: 'खांती भाषा', ckt: 'चुकची भाषा', niv: 'निवख़ भाषा', ket: 'केट भाषा', cjy: 'जिन', hsn: 'शियांग', gan: 'गान', mai: 'मैथिली', awa: 'अवधी', skr: 'सराइकी', sat: 'संताली', mad: 'मादुरी', hil: 'हिलीगायनोन', bal: 'बलोची', ak: 'आकान (ट्वि)', mk: 'मकदूनियाई', lg: 'लुगांडा', ki: 'किकुयू', tn: 'त्स्वाना', st: 'सेसोथो', ts: 'त्सोंगा', ve: 'वेंदा', bem: 'बेम्बा', lua: 'लूबा-कसाई', kg: 'कोंगो', ff: 'फुला', bm: 'बम्बारा', kab: 'काबाइल', yua: 'युकातेक माया', tzo: 'त्सोत्सिल', mix: 'मिक्सटेक', zap: 'सापोटेक', ay: 'आयमारा', arn: 'मापुचे', cr: 'क्री (मैदानी)', oj: 'ओजिब्वे', lkt: 'लकोटा', kl: 'ग्रीनलैंडिक', ce: 'चेचन', inh: 'इंगुश', av: 'अवार', lez: 'लेज़्गी', dar: 'दर्ग्वा', lbe: 'लाक', tab: 'तबासरान', ady: 'आदिघे', kbd: 'कबार्दियन', ab: 'अबखाज़', xmf: 'मिंगरेलियन', os: 'ओसेतिक', ty: 'ताहितियाई', niu: 'नियुएआन', tvl: 'तुवालुआन', rap: 'रापानुइ', rar: 'कुक द्वीप माओरी', mh: 'मार्शली', gil: 'किरिबाती', ch: 'चमोरो', tet: 'तेतुम', bi: 'बिस्लामा', pjt: 'पिचानचाचारा', wbp: 'वारलपीरी', mni: 'मणिपुरी', new: 'नेवाड़ी', brx: 'बोडो', lus: 'मिज़ो', dz: 'ज़ोंगखा', min: 'मिनांगकबाउ', ban: 'बाली', ace: 'आचेहनीज़', bug: 'बुगिनीज़', war: 'वाराई', bik: 'मध्य बिकोल', tum: 'तुम्बुका', din: 'डिंका', nus: 'नुएर', luo: 'लुओ', mas: 'मासाई', aa: 'अफ़ार', shi: 'ताशेल्हित', rif: 'तारिफ़ित', mwr: 'मारवाड़ी', bgc: 'हरियाणवी', ks: 'कश्मीरी', kok: 'कोंकणी', mnp: 'मिन बेइ', nan_te: 'छाओझोऊ', yue_ts: 'ताईशानी', czh: 'हुइझोऊ', cnp: 'पिंगहुआ', zh_jh: 'जियांगहुआई मंदारिन', zh_tj: 'तियानजिन मंदारिन', zh_lz: 'लानयिन मंदारिन', dng: 'दुंगन', hsb: 'उच्च सोर्बियन', csb: 'कशुबियन', fur: 'फ़्रिउलियन', ast: 'अस्तुरियाई', an: 'आरागोन', rup: 'अरोमानी', wa: 'वालून', udm: 'उद्मुर्त', mhr: 'मेडो मारी', myv: 'एर्ज्या', krl: 'करेलियन', mzn: 'माज़ंदरानी', glk: 'गिलाकी', lrc: 'लोरी', crh: 'क्रीमियन तातार', tt: 'तातार', ba: 'बशकीर', krc: 'कराचाय-बाल्कर', ksw: 'स्गाव कारेन', lhu: 'लाहू', lis: 'लिसु', nxq: 'नाक्सी', shn: 'शान', ee: 'एवे', nyn: 'न्यंकोल', luy: 'लुहया', ssw: 'स्वाजी', nbl: 'दक्षिणी न्देबेले', nso: 'उत्तरी सोथो', fan: 'फ़ांग', naq: 'नामा (खोएखोए)', hts: 'हडज़ा', kr: 'कनुरी', men: 'मेन्डे', dyu: 'द्युला', syl: 'सिलहटी', mag: 'मगही', doi: 'डोगरी', xkk: 'खमु', moh: 'मोहोक', cho: 'चोक्तॉ', esu: 'मध्य अलास्का युपिक', ipk: 'इनुपियाक', apw: 'पश्चिमी अपाचे', dak: 'डकोटा', chy: 'शायेन', lmo: 'लोम्बार्ड', pms: 'पिएमोंती', eml: 'एमिलियन-रोमाञोल', mwl: 'मिरांदी', pnt: 'पोंटिक यूनानी', hno: 'हिंदको', bhb: 'भीली', cja: 'चाम', hmo: 'हिरी मोटू', pon: 'पोंपेइ', vmw: 'माखुवा', dsb: 'निम्न सोर्बियन', gv: 'मैंक्स', kw: 'कोर्निश', zza: 'ज़ाज़ा', brh: 'ब्राहुई', mrq: 'मार्केसन', tiw: 'तिवी', guc: 'वायू', myp: 'पिराहा', emp: 'उत्तरी एम्बेरा', kpe: 'क्पेल्ले', loz: 'लोज़ी', bbc: 'तोबा बाटक', bjn: 'बंजार', sas: 'सासक', kha: 'खासी', mns: 'मानसी', mrw: 'मारानाओ', tsg: 'तौसुग', yap: 'याप', chk: 'चूक', gbm: 'गढ़वाली', kfy: 'कुमाऊँनी', xnr: 'कांगड़ी', hr: 'क्रोएशियाई', bs: 'बोस्नियाई', iba: 'इबान', ljp: 'लम्पुंग', tzm: 'मध्य एटलस तमाज़ाइट', ng: 'न्डोंगा', umb: 'उम्बुन्डू', kmb: 'किम्बुन्डू', her: 'हेरेरो', xal: 'काल्मिक', sg: 'सांगो', toi: 'टोंगा (जाम्बिया)', peo: 'पुरानी फ़ारसी', ave: 'अवेस्ता', xto: 'तोखारियन A', txb: 'तोखारियन B', phn: 'फ़ोनीशियन', uga: 'उगारिटिक', xlu: 'लुवियन', pal: 'मध्य फ़ारसी (पहलवी)', syc: 'शास्त्रीय सिरीयक', fro: 'पुरानी फ्रांसीसी', goh: 'पुरानी ऊँची जर्मन', gez: 'गीज़', gmy: 'माइसीनियाई यूनानी', xct: 'शास्त्रीय तिब्बती', xpu: 'पूनिक', xhu: 'हुर्रियन', elx: 'एलामाइट', xsa: 'सबाई', kaw: 'पुरानी जावाई (कावी)', kho: 'ख़ोतानी', gmh: 'मध्यकालीन ऊँची जर्मन', osp: 'पुरानी स्पैनिश', okz: 'पुरानी ख़मेर', osx: 'पुरानी सैक्सन', smg: 'सुकुमा', mos: 'मोरे', kln: 'कलेंजिन', mfe: 'मॉरिशियन क्रेओल', mnk: 'मांदिंका', bqi: 'बख़्तियारी', unr: 'मुंडारी', hoc: 'हो', enq: 'एंगा', xpr: 'पार्थियन', xqa: 'काराहानिड', sga: 'पुरानी आयरिश', bsk: 'बुरुषास्की', yag: 'याग़्नोबी', srn: 'श्रीनान टोंगो', kwk: 'क्वाक्क्वला', sad: 'सान्डावे', pcc: 'बूयेइ', iuu: 'इउ मियेन', hui: 'हुली', tkl: 'टोकेलाउअन', squ: 'स्क्वामिश', mga: 'मध्यकालीन आयरिश', hbo: 'बाइबिल हिब्रू', mpt: 'मियान', ygr: 'यागारिया', quz: 'कुस्को क्वेचुआ', quy: 'अयाकूचो क्वेचुआ', cab: 'गारिफुना', crx: 'कैरियर', tsi: 'तटीय शिमशियन', wbl: 'वखी', psi: 'पशाई', bgq: 'बागड़ी', ach: 'अचोली', rki: 'राखीन', kxm: 'उत्तरी ख़मेर', xng: 'मध्यकालीन मंगोलियन', ja_kg: 'जापानी (कागोशिमा)', ja_sd: 'जापानी (सेंदाई)', ko_hg: 'कोरियाई (हमग्योंग)', ko_jl: 'कोरियाई (जोल्ला)', nan_pn: 'पेनांग होक्किन', mra: 'मलाब्री', wuu_nb: 'निंगपो', yue_gz: 'गाओझोऊ क्वांगतुंगी', khb: 'ताई लू', pam: 'कापम्पंगन', pag: 'पंगासिनान', mdh: 'मागिंदानाओ', gor: 'गोरोनतालो', mak: 'मकासर', fon: 'फ़ोन', kri: 'क्रिओ', dag: 'दगबानी', xog: 'सोगा', teo: 'अतेसो', dyo: 'जोला-फोनी', bci: 'बाउले', tcy: 'तुलू', haz: 'हज़ारगी', tly: 'तालिश', kaa: 'काराकल्पाक', bej: 'बेजा', tig: 'तिगरे', ssy: 'साहो', ewo: 'एवोंडो', bum: 'बुलू', ndc: 'न्दाउ', ote: 'ओतोमी', tar: 'तराहूमारा', och:'पुरानी चीनी', ojp:'पुरानी जापानी', vsa:'वैदिक संस्कृत', txg:'तंगुत', sog:'सोग्दियाई', otk:'पुरानी तुर्किक', zkt:'खितान', juc:'जुरचेन', omx:'पुरानी मोन', pyx:'प्यू', obr:'पुरानी बर्मी', occ:'पुरानी चाम', orv:'पुरानी पूर्व स्लाव', xsc:'स्किथियन', sukh:'पुरानी थाई (सुखोथाई)', xmr:'मेरोइटिक', onw:'पुरानी नूबियन', cqu:'शास्त्रीय क्वेचुआ', omc:'मोचिका', chb:'चिब्चा', oma:'पुरानी मलय', osu:'पुरानी सुंडानी', otl:'पुरानी तगालोग', ami:'अमिस', pwn:'पाइवान', tay:'अताया', bnn:'बुनुन', trv:'त्रुकू', tsu:'त्सोऊ', tao:'ताओ (यामी)', hak_tw:'ताइवानी हक्का', wuu_sz:'सूज़ौ वू', wuu_wz:'वेन्ज़ौ वू', nan_qz:'क्वान्ज़ौ होक्किएन', nan_hai:'हाइनानी', zh_wh:'वूहान मंदारिन', zh_zz:'मंदारिन (झोंग्युआन)', hak_hl:'हाइलू हक्का', cpx:'पू-शियान मिन', mfa:'पतानी मलय', mtq:'म्वोंग', tyz:'ताय (वियतनाम)', kjp:'प्वो करेन', kac:'जिंगपो (काचिन)', wbm:'वा', ahk:'अखा', dtp:'कदज़न-दूसुन', hne:"छत्तीसगढ़ी", mnw:"मोन", grt:"गारो", nut:"नूङ्ग", quc:"किचे", kek:"क्वेक्ची", mam:"मम", wal:"वोलायता", sid:"सिदामा", tji:"तूचिया", nij:"न्गाजू", sda:"तोराजा-सादान", arq:'अरबी (अल्जीरियाई)', mey:'हसानिया अरबी', tmh:'तमाशेक (तुआरेग)', azb:'दक्षिणी अज़रबैजानी', gag:'गागौज़', sma:'दक्षिणी सामी', vro:'वोरो', pjk:'प्रोटो-जापोनिक-कोरियाई', oko:'पुरानी कोरियाई (सिल्ला)', okg:'गोगुर्यो', ko_gor:'गोर्यो कोरियाई', ja_chu:'मध्यकालीन जापानी', pry:'प्रोटो-र्यूक्यू', lld:'लाडिन', stq:'सैटरलैंड फ्रिसियन', wym:'विमिसोरिस', yuc:'युची', kgg:'कुसुंदा', ota:'ऑटोमन तुर्की', cmg:'क्लासिकल मंगोलियन', ett:'इत्रुस्कन', xht:'हत्ती', txr:'टार्टेसियन', roo:'रोटोकस भाषा', nmn:'ताआ', lbz:'लार्दिल', nny:'यांगकाल', kky:'गूगू इमिथिर', blc:'नूहल्क', tue:'तुयुका', ncs:'निकारागुअन साइन लैंग्वेज', uby:'उबीख़', lbz_damin:'दामिन'},
    it: { es_cr:'Spagnolo (Costa Rica)', es_hn:'Spagnolo', es_ni:'Spagnolo (Nicaragua)', es_sv:'Spagnolo (El Salvador)', ar_jo:'Arabo giordano', ar_ps:'Arabo palestinese', fr_lu:'Francese', fr_cm:'Francese camerunese', de_lu:'Tedesco (Lussemburghese)', en_ng2:'Inglese (Ghana)', pt_mo:'Portoghese di Macao', lb:'Lingua lussemburghese', gcr:'Lingua creola della Guyana francese', acf:'Creolo di Santa Lucia',  gan_yc:'Cinese Gan (dialetto di Yichun)', gan_ja:'Gan (Jiʼan)', gan_fz:'Gan (Fuzhou)', cjy_lv:'Jin di Lüliang', cjy_xz:'Cinese Jin (dialetto di Xinzhou)', hsn_hy:'Xiang (Hengyang)', hsn_yz:'Cinese Xiang (dialetto di Yongzhou)', czh_wy:'Cinese Hui (Wuyuan)',  bla:'Lingua Piedi Neri', hop:'Hopi', com:'Comanche', one:'Oneida', ono:'lingua onondaga', win:'Lingua Ho-Chunk', cro:'Lingua crow', hai:'lingua haida', cic:'lingua chickasaw', ik:'inupiaq', na:'nauruano', luz:'Luri Settentrionale', es_bo:'Spagnolo (Bolivia)', es_py:'Spagnolo paraguayano', es_pa:'spagnolo panamense', en_my:'Inglese (Malesia)', pt_gw:'Creolo della Guinea-Bissau', tsz:'Lingua purépecha', nez:'Nez Perce', nv2:'apache occidentale', woe:'woleaiano', pmt:'Tuamotuano', bin:'lingua edo', khw:'Lingua khowar',  xav:'Lingua xavante', ter:'Lingua Terena', bor:'Bororo', trn:'Mojeño trinitario', ake:'Akawaio', aoc:'Pemón', gun:'Guaraní Mbyá',  zdj:'Comoriano (Shikomori)', ayl:'Arabo libico', abv:'Arabo Bahreno', afb:'Arabo del Golfo', acw:'Arabo omanita', swb:'Mahoraise',  adx:'Tibetano Amdo', qxs:'qiang meridionale', duu:'lingua drung', jya:'Lingua Situ rGyalrong', ers:'Lingua Ersu', bca:'Bai centrale', atb:'Zaiwa', prk:'lingua wa parauk', slr:'salar', ybe:'Yugur occidentale', yuy:'Yugur orientale', mjg:'Lingua Monguor', sce:'lingua dongxiang', peh:'bonan', bua:'lingua buriatia', cjs:'Scoro', dlg:'Dolgan', kdt:'Kuay', blk:'Lingua pa\'o', njo:'Ao naga', srb:'Lingua sora', kjg:'khmu', mro:'Lingua mru', gon:'gondi', bfq:'lingua badaga', som:'Somali', har:'Harari',  es_pr:'Spagnolo (Portoricano)', es_do:'Spagnolo (Repubblica Dominicana)', es_gt:'Spagnolo (Guatemala)', es_ec:'Spagnolo (Ecuadoriano)', es_uy:'Spagnolo (Uruguay)', ar_sy:'Arabo (Siriano)', ar_ye:'Arabo (Yemenita)', ar_dz:'Arabo (Dialetto Algerino)', ar_sa:'Arabo (Arabia Saudita)', ar_lb:'Arabo (libanese)', en_wls:'inglese (gallese)', en_jam:'Inglese (giamaicano)', en_ng:'Inglese (Nigeria)', en_ph:'Inglese (Filippine)', en_ke:'Inglese (keniota)', fr_sn:'Francese (Senegalese)', fr_ci:'Francese (Costa d\'Avorio)', fr_ht:'Francese (haitiano)', pt_mz:'Portoghese (Mozambico)', pt_cv:'Portoghese (Capo Verde)',  nl_be:'Olandese (belga)', en_us:'Inglese (americano)', en_ca:'Inglese (canadese)', en_za:'Inglese (sudafricano)', de_ch:'Tedesco (Svizzero)', pt_ao:'undefined (angolano)', es_ve:'undefined (venezuelano)', ca_va:'Valenciano',  nan_pera:'hokkien peranakan', zh_th:'mandarino sino-thailandese', zh_tw:'Mandarino taiwanese', nan_th:'teochew sino-thailandese', zh_us:'mandarino sino-americano', yue_us:'cantonese sino-americano', dng:'dungano', ko_hun:'hanja-hun (lettura nativa coreana)', ja_kun:'kun-yomi (lettura nativa giapponese)', phm:'proto-hmong-mien', pmgl:'proto-mongolo', ptai:'proto-tai', paa:'proto-austroasiatico', ptung:'proto-tunguso', pja:'proto-giapponico', pko:'proto-coreanico', ptb:'proto-tibeto-birmano', pst:'proto-sino-tibetano', ko_zai:'sino-coreano zainichi', bo_sino:'sino-tibetano moderno', vi_ohan:'sino-vietnamita antico', ja_ojp:'sino-giapponese antico', ko_mid:'coreano medio', sjo:'sibe', nan_id:'hokkien indonesiano', nan_my:'hokkien malesiano', nan_sg:'hokkien di Singapore', yue_mo:'cantonese di Macao', yue_hk:'cantonese di Hong Kong', zh_phagspa:'cinese Yuan (Phags-pa)', zh_yuan:'mandarino Yuan', bca:'bai (centrale)', ja:'Giapponese', ja_osa:'Giapponese (Osaka)', ja_aom:'Giapponese (Aomori)', ja_oki:'Okinawano', ja_hak:'Giapponese (Hakata)', ja_edo: "Giapponese (periodo Edo)", ja_kanbun:'Lettura giapponese del kanbun', ko:'Coreano', ko_kp: "Coreano (Corea del Nord)", ko_bus:'Coreano (Busan)', zh:'Cinese (mandarino)', yue:'Cantonese', nan:'Taiwanese', wuu:'wu di Shanghai', zh_song:'Cinese (classico)', zh_wenyan_edu:'Cinese classico (lettura cantonese)', vi:'Vietnamita settentrionale', vi_c:'Vietnamita centrale', vi_s:'Vietnamita meridionale', vi_nom: "Vietnamita (Chữ Nôm)", vi_han:'Lettura sino-vietnamita del cinese classico', th:'Tailandese', id:'Indonesiano', sa:'Sanscrito', sa_edu:'Sanscrito moderno parlato', hi:'Hindi', en:'Inglese', en_aave: "Inglese (AAVE)", en_south:'Inglese (sud USA)', en_app:'Inglese (Appalachia)', en_ie:'Inglese (irlandese)', en_sco:'Inglese (scozzese)', en_yk:'Inglese (Yorkshire)', en_ck:'Inglese (cockney)', de:'Tedesco', de_lut:'Alto tedesco protomoderno (epoca di Lutero)', fr:'Francese', fr_class:'Francese classico (XVII secolo)', it:'Italiano', it_dan:'Italiano (dantesco)', es_eu:'Spagnolo (Europa)', es_sgl:"Spagnolo del Secolo d'oro", es_mx:'Spagnolo (Messico)', pt_eu:'Portoghese (Europa)', pt_br:'Portoghese (Brasile)', la:'Latino', ru:'Russo', uk:'Ucraino', ar:'Arabo (standard)', ar_qur:'Arabo coranico', ar_eg:'Arabo (egiziano)', he:'Ebraico', he_mis:'Ebraico mishnaico', sw:'Swahili', tr:'Turco', fa:'Persiano', fa_clas:'Persiano (Classico)', tl:'Tagalog', ga:'Irlandese', eu:'Basco', mn:'Mongolo', my:'Birmano', am:'Amarico', egy:'Egizio antico', ta:'Tamil', hu:'Ungherese', nl:'Olandese', pl:'Polacco', ms:'Malese', mg:'Malgascio', cy:'Gallese', fi:'Finlandese', ain:'Ainu', bn:'Bengalese', ur:'Urdu', te:'Telugu', jv:'Giavanese', ko_jeju: "Jeju", ko_em: "Coreano (pre-moderno)", ka:'Georgiano', el:'Greco', el_grc:'Greco (antico)', el_kath:'Greco (Katharevousa)', nv:'Navajo', qu:'Quechua', mi:'Māori', haw:'Hawaiano', km:'Khmer', lo:'Lao', yo:'Yoruba', zu:'Zulu', bo:'Tibetano', xct_litpr:'Tibetano classico liturgico', hy:'Armeno', hy_grab:'Armeno classico (Grabar)' , ja_kyo:'Giapponese (Kyoto)', ja_hir:'Giapponese (Hiroshima)', ja_mvi:'Miyako', ja_rys:'Yaeyama', ar_lev:'Arabo (levantino)', ar_ma:'Arabo (marocchino)', ar_gulf:'Arabo (del Golfo)', zh_sc: "Mandarino del Sichuan", zh_db:'Mandarino nordorientale', nap:'Napoletano', scn:'Siciliano', de_gsw:'Tedesco (svizzero)', fr_qc:'Francese (Québec)', sco:'Scots', en_sg: "Inglese (Singapore)", hwc:'Creolo hawaiano', pcm:'Pidgin nigeriano', tpi:'Tok Pisin', en_ang:'Inglese antico', sv:'Svedese', no:'Norvegese', si:'Singalese', ro:'Rumeno', cs:'Ceco', ca:'Catalano', da:'Danese', is:'Islandese', lt:'Lituano', sq:'Albanese', mt:'Maltese', so:'Somalo', ml:'Malayalam', pa:'Punjabi', ku:'Curdo', ug:'Uiguro', kk:'Kazako', ha:'Hausa', ig:'Igbo', eo:'Esperanto', tok:'Toki Pona', ht:'Creolo haitiano', ps:'Pashto', uz:'Uzbeco', mr:'Marathi', gu:'Gujarati', kn:'Kannada', ne:'Nepalese', om:'Oromo', ti:'Tigrino', wo:'Wolof', ln:'Lingala', sn:'Shona', sr:'Serbo', bg:'Bulgaro', sk:'Slovacco', lv:'Lettone', et:'Estone', be:'Bielorusso', yi:'Yiddish', non:'Norreno antico', arc:'Aramaico', cop:'Copto', rom:'Romanì', br:'Bretone', xh:'Xhosa', lad:'Ladino', tlh:'Klingon', jbo:'Lojban', fj:'Figiano', sm:'Samoano', zh_han:'Cinese (Han classico)', zh_tang:'Cinese (Tang classico)', ceb:'Cebuano', su:'Sundanese', th_isan:'Tailandese (Isan)', es_co:'Spagnolo (Colombia)', es_cl:'Spagnolo (Cile)', gl:'Galiziano', oc:'Occitano', fo:'Faroese', jam:'Patois giamaicano', pap:'Papiamento', gd: "Gaelico scozzese", sl: "Sloveno", enm: "Inglese medio", en_em:'Inglese protomoderno', fr_ch: "Francese (Svizzero)", to: "Tongano", se: "Sami settentrionale", af: "Afrikaans", akk: "Accadico", ar_iq: "Arabo (iracheno)", ar_sd: "Arabo (sudanese)", ar_tn: "Arabo (tunisino)", as: "Assamese", az: "Azero", bho: "Bhojpuri", cdo: "Min orientale", chr: "Cherokee", ckb: "Curdo (sorani)", cu: "Antico slavo ecclesiastico", de_at: "Tedesco (austriaco)", de_by: "Tedesco (bavarese)", en_au: "Inglese (australiano)", en_in: "Inglese (indiano)", es_an: "Spagnolo (andaluso)", es_ar: "Spagnolo (argentino)", es_cu: "Spagnolo (cubano)", es_pe: "Spagnolo (peruviano)", fr_af: "Francese (africano)", fr_be: "Francese (belga)", fy: "Frisone", gn: "Guaraní", got: "Gotico", hak_cn: "Hakka", hit: "Ittita", hmn: "Hmong", ii: "Yi (Nuosu)", ilo: "Ilocano", ine: "Proto-indoeuropeo", iu: "Inuktitut", ja_heian: "Giapponese (periodo Heian)", ko_yb: "Coreano (Yanbian)", ky: "Kirghiso", mn_cn: "Mongolo (Mongolia Interna)", mnc: "Manciù", myn: "Maya classico", nci: "Nahuatl classico", nds: "Basso tedesco", nn: "Norvegese (Nynorsk)", ny: "Chichewa", or: "Oriya", pi: "Pali", pi_edu:'Pali pedagogico (Theravada)', rm: "Romancio", rw: "Kinyarwanda", sc: "Sardo", sd: "Sindhi", sux: "Sumerico", tg: "Tagico", th_n: "Thai (settentrionale)", th_s: "Thai (meridionale)", tk: "Turkmeno", vec: "Veneto", za: "Zhuang", pau: "Palauano", sah: 'yakuto', tyv: 'tuvano', kjh: 'khakaso', alt: 'altaico', bxr: 'buriato', evn: 'evenco', eve: 'eveno', yrk: 'nenets', kca: 'chanti', ckt: 'ciukci', niv: 'nivkh', ket: 'ket', cjy: 'Jin', hsn: 'Xiang', gan: 'Gan', mai: 'maithili', awa: 'awadhi', skr: 'saraiki', sat: 'santali', mad: 'madurese', hil: 'hiligaynon', bal: 'beluci', ak: 'akan (twi)', mk: 'macedone', lg: 'luganda', ki: 'kikuyu', tn: 'tswana', st: 'sotho meridionale', ts: 'tsonga', ve: 'venda', bem: 'bemba', lua: 'luba-kasai', kg: 'kikongo', ff: 'fula', bm: 'bambara', kab: 'cabilo', yua: 'maya yucateco', tzo: 'tzotzil', mix: 'mixteco', zap: 'zapoteco', ay: 'aymara', arn: 'mapuche', cr: 'cree (delle Pianure)', oj: 'ojibwa', lkt: 'lakota', kl: 'groenlandese', ce: 'ceceno', inh: 'ingush', av: 'avaro', lez: 'lezgo', dar: 'darghino', lbe: 'lak', tab: 'tabasarano', ady: 'adighè', kbd: 'cabardo', ab: 'abcaso', xmf: 'mingrelio', os: 'osseto', ty: 'tahitiano', niu: 'niueano', tvl: 'tuvaluano', rap: 'rapanui', rar: 'maori delle Isole Cook', mh: 'marshallese', gil: 'kiribati', ch: 'chamorro', tet: 'tetum', bi: 'bislama', pjt: 'pitjantjatjara', wbp: 'warlpiri', mni: 'meitei', new: 'newari', brx: 'bodo', lus: 'mizo', dz: 'dzongkha', min: 'minangkabau', ban: 'balinese', ace: 'acehnese', bug: 'bugis', war: 'waray', bik: 'bikol centrale', tum: 'tumbuka', din: 'dinka', nus: 'nuer', luo: 'luo', mas: 'maa', aa: 'afar', shi: 'tashelhit', rif: 'tarifit', mwr: 'marwari', bgc: 'haryanvi', ks: 'cashmiro', kok: 'konkani', mnp: 'Min Bei', nan_te: 'teochew', yue_ts: 'taishanese', czh: 'Hui', cnp: 'Pinghua', zh_jh: 'mandarino di Jianghuai', zh_tj: 'mandarino di Tianjin', zh_lz: 'mandarino di Lanyin', dng: 'dungano', hsb: 'alto sorabo', csb: 'casciubo', fur: 'friulano', ast: 'asturiano', an: 'aragonese', rup: 'arumeno', wa: 'vallone', udm: 'udmurto', mhr: 'mari delle praterie', myv: 'erzya', krl: 'careliano', mzn: 'mazandarano', glk: 'ghilaki', lrc: 'luri', crh: 'tataro di Crimea', tt: 'tataro', ba: 'baschiro', krc: 'caraciaio-balcaro', ksw: 'karen sgaw', lhu: 'lahu', lis: 'lisu', nxq: 'naxi', shn: 'shan', ee: 'ewe', nyn: 'runyankole', luy: 'luhya', ssw: 'swazi', nbl: 'ndebele meridionale', nso: 'sotho settentrionale', fan: 'fang', naq: 'nama (khoekhoe)', hts: 'hadza', kr: 'kanuri', men: 'mende', dyu: 'dyula', syl: 'sylheti', mag: 'magahi', doi: 'dogri', xkk: 'khmu', moh: 'mohawk', cho: 'choctaw', esu: "yupik dell'Alaska centrale", ipk: 'inupiaq', apw: 'apache occidentale', dak: 'dakota', chy: 'cheyenne', lmo: 'lombardo', pms: 'piemontese', eml: 'emiliano-romagnolo', mwl: 'mirandese', pnt: 'greco pontico', hno: 'hindko', bhb: 'bhili', cja: 'cham', hmo: 'hiri motu', pon: 'pohnpei', vmw: 'makhuwa', dsb: 'basso sorabo', gv: 'mannese', kw: 'cornico', zza: 'zazaki', brh: 'brahui', mrq: 'marchesano', tiw: 'tiwi', guc: 'wayuu', myp: 'pirahã', emp: 'emberá settentrionale', kpe: 'kpelle', loz: 'lozi', bbc: 'batak toba', bjn: 'banjar', sas: 'sasak', kha: 'khasi', mns: 'mansi', mrw: 'maranao', tsg: 'tausug', yap: 'yapese', chk: 'chuuk', gbm: 'garhwali', kfy: 'kumaoni', xnr: 'kangri', hr: 'croato', bs: 'bosniaco', iba: 'iban', ljp: 'lampung', tzm: "tamazight dell'Atlante centrale", ng: 'ndonga', umb: 'umbundu', kmb: 'kimbundu', her: 'herero', xal: 'kalmuko', sg: 'sango', toi: 'tonga (Zambia)', peo: 'persiano antico', ave: 'avestico', xto: 'tocario A', txb: 'tocario B', phn: 'fenicio', uga: 'ugaritico', xlu: 'luvio', pal: 'medio-persiano (pahlavi)', syc: 'siriaco classico', fro: 'antico francese', goh: 'alto tedesco antico', gez: 'geez', gmy: 'greco miceneo', xct: 'tibetano classico', xpu: 'punico', xhu: 'hurrita', elx: 'elamita', xsa: 'sabeo', kaw: 'giavanese antico (kawi)', kho: 'khotanese', gmh: 'medio alto tedesco', osp: 'spagnolo antico', okz: 'khmer antico', osx: 'sassone antico', smg: 'sukuma', mos: 'mòoré', kln: 'kalenjin', mfe: 'creolo mauriziano', mnk: 'mandinka', bqi: 'bakhtiari', unr: 'mundari', hoc: 'ho', enq: 'enga', xpr: 'partico', xqa: 'caracànide', sga: 'vecchio irlandese', bsk: 'burushaski', yag: 'yaghnobi', srn: 'sranan tongo', kwk: "kwak'wala", sad: 'sandawe', pcc: 'bouyei', iuu: 'iu mien', hui: 'huli', tkl: 'tokelauano', squ: 'squamish', mga: 'medio irlandese', hbo: 'ebraico biblico', mpt: 'mian', ygr: 'yagaria', quz: 'quechua del Cusco', quy: 'quechua di Ayacucho', cab: 'garifuna', crx: 'carrier', tsi: 'tsimshian costiero', wbl: 'wakhi', psi: 'pashai', bgq: 'bagri', ach: 'acholi', rki: 'rakhine', kxm: 'khmer settentrionale', xng: 'mongolo medio', ja_kg: 'giapponese (Kagoshima)', ja_sd: 'giapponese (Sendai)', ko_hg: 'coreano (Hamgyŏng)', ko_jl: 'coreano (Jeolla)', nan_pn: 'hokkien di Penang', mra: 'mlabri', wuu_nb: 'ningbo', yue_gz: 'yue di Gaozhou', khb: 'tai lue', pam: 'kapampangan', pag: 'pangasinan', mdh: 'maguindanao', gor: 'gorontalo', mak: 'makassar', fon: 'fon', kri: 'krio', dag: 'dagbani', xog: 'soga', teo: 'ateso', dyo: 'jola-fonyi', bci: 'baoulé', tcy: 'tulu', haz: 'hazaragi', tly: 'talysh', kaa: 'caracalpacco', bej: 'bedja', tig: 'tigré', ssy: 'saho', ewo: 'ewondo', bum: 'bulu', ndc: 'ndau', ote: 'otomí', tar: 'tarahumara', och:'Cinese antico', ojp:'Giapponese antico', vsa:'Sanscrito vedico', txg:'Tangut', sog:'Sogdiano', otk:'Antico turco', zkt:'Kitan', juc:'Jurchen', omx:'Mon antico', pyx:'Pyu', obr:'Birmano antico', occ:'Cham antico', orv:'Antico slavo orientale', xsc:'Scita', sukh:'Thai antico (Sukhothai)', xmr:'Meroitico', onw:'Nubiano antico', cqu:'Quechua classico', omc:'Mochica', chb:'Chibcha', oma:'Malese antico', osu:'Sundanese antico', otl:'Tagalog antico', ami:'amis', pwn:'paiwan', tay:'atayal', bnn:'bunun', trv:'truku/seediq', tsu:'tsou', tao:'tao/yami', hak_tw:'hakka taiwanese', wuu_sz:'wu di Suzhou', wuu_wz:'wu di Wenzhou', nan_qz:'hokkien di Quanzhou', nan_hai:'hainanese', zh_wh:'mandarino di Wuhan', zh_zz:'mandarino di zhongyuan', hak_hl:'hakka di Hailu', cpx:'min pu-xian', mfa:'malese patani', mtq:'mường', tyz:'tày', kjp:'karen pwo', kac:'jingpo (kachin)', wbm:'wa', ahk:'akha', dtp:'kadazan-dusun', hne:"chhattisgarhi", mnw:"mon", grt:"garo", nut:"nùng", quc:"kʼicheʼ", kek:"qʼeqchiʼ", mam:"mam", wal:"wolaytta", sid:"sidamo", tji:"tujia", nij:"ngaju", sda:"toraja-sa'dan", arq:'Arabo algerino', mey:'Arabo hassaniyya', tmh:'Tamasheq (Tuareg)', azb:'Azero meridionale', gag:'Gagauzo', sma:'Sami meridionale', vro:'Võro', pjk:'Proto-giapponese-coreano', oko:'Coreano antico (Silla)', okg:'Goguryeo', ko_gor:'Coreano di Goryeo', ja_chu:'Giapponese medievale', pry:'Proto-ryukyuano', lld:'Ladino', stq:'Frisone del Saterland', wym:'Wymysorys', yuc:'Yuchi', kgg:'Kusunda', ota:'Turco ottomano', cmg:'Mongolo classico', ett:'Etrusco', xht:'Hattico', txr:'Tartessiano', roo:'rotokas', nmn:'taa', lbz:'lardil', nny:'yangkaal', kky:'guugu yimithirr', blc:'nuxalk', tue:'tuyuca', ncs:'lingua dei segni nicaraguense', uby:'ubico', lbz_damin:'damin'},
    pt: { es_cr:'Espanhol (Costa Rica)', es_hn:'Espanhol', es_ni:'Espanhol (Nicarágua)', es_sv:'Espanhol (Salvadorenho)', ar_jo:'Árabe jordaniano', ar_ps:'Árabe palestiniano', fr_lu:'Francês', fr_cm:'Francês camaronês', de_lu:'Alemão (Luxemburguês)', en_ng2:'Inglês (Gana)', pt_mo:'Português Macaense', lb:'Língua luxemburguesa', gcr:'Língua crioula da Guiana Francesa', acf:'Crioulo de Santa Lúcia',  gan_yc:'Chinês Gan (dialeto de Yichun)', gan_ja:'Gan (Jiʼan)', gan_fz:'Gan (Fuzhou)', cjy_lv:'Jin de Lüliang', cjy_xz:'Chinês Jin (dialeto de Xinzhou)', hsn_hy:'Xiang (Hengyang)', hsn_yz:'Chinês Xiang (dialeto de Yongzhou)', czh_wy:'Chinês Hui (Wuyuan)',  bla:'Língua Pé-Negro', hop:'Hopi', com:'Comanche', one:'Oneida', ono:'língua onondaga', win:'Língua Ho-Chunk', cro:'Língua crow', hai:'língua haida', cic:'chickasaw', ik:'inupiaque', na:'nauruano', luz:'Luri do Norte', es_bo:'Espanhol (Bolívia)', es_py:'Espanhol do Paraguai', es_pa:'espanhol panamenho', en_my:'Inglês (Malásia)', pt_gw:'Crioulo da Guiné-Bissau', tsz:'Língua Purépecha', nez:'Nez Perce', nv2:'apache ocidental', woe:'woleaiano', pmt:'Tuamotuano', bin:'língua edo', khw:'Língua khowar',  xav:'Língua xavante', ter:'Terena', bor:'Bororo', trn:'Mojeño trinitário', ake:'Akawaio', aoc:'Pemón', gun:'Guarani Mbyá',  zdj:'Comoriano (Shikomori)', ayl:'Árabe líbio', abv:'Árabe Bahreno', afb:'Árabe do Golfo', acw:'Árabe omanita', swb:'Mahorês',  adx:'Tibetano Amdo', qxs:'qiang do sul', duu:'língua drung', jya:'Língua Situ rGyalrong', ers:'Ersu', bca:'Bai central', atb:'Zaiwa', prk:'língua wa parauk', slr:'salar', ybe:'Yugur ocidental', yuy:'Yugur Oriental', mjg:'Língua Monguor', sce:'língua dongxiang', peh:'bonan', bua:'língua buriata', cjs:'Chor', dlg:'Dolgan', kdt:'Kuay', blk:'Língua Pa\'O', njo:'Ao naga', srb:'Língua sora', kjg:'khmu', mro:'Língua mru', gon:'gondí', bfq:'língua badaga', som:'Somali', har:'Harari',  es_pr:'Espanhol (Porto-Riquenho)', es_do:'Espanhol (República Dominicana)', es_gt:'Espanhol (Guatemalteco)', es_ec:'Espanhol (Equatoriano)', es_uy:'Espanhol (Uruguaio)', ar_sy:'Árabe (Sírio)', ar_ye:'Árabe (Iemenita)', ar_dz:'Árabe (Dialeto Argelino)', ar_sa:'Árabe (Arábia Saudita)', ar_lb:'Árabe (libanês)', en_wls:'inglês (galês)', en_jam:'Inglês (jamaicano)', en_ng:'Inglês (Nigéria)', en_ph:'Inglês (Filipinas)', en_ke:'Inglês (queniano)', fr_sn:'Francês (Senegalês)', fr_ci:'Francês (Costa do Marfim)', fr_ht:'Francês (haitiano)', pt_mz:'Português (Moçambique)', pt_cv:'Portugués (Cabo Verde)',  nl_be:'Neerlandês (belga)', en_us:'Inglês (americano)', en_ca:'Inglês (canadense)', en_za:'Inglês (sul-africano)', de_ch:'Alemão (Suíço)', pt_ao:'undefined (angolano)', es_ve:'undefined (venezuelano)', ca_va:'Valenciano',  nan_pera:'hokkien peranakan', zh_th:'mandarim sino-tailandês', zh_tw:'Mandarim de Taiwan', nan_th:'teochew sino-tailandês', zh_us:'mandarim sino-americano', yue_us:'cantonês sino-americano', dng:'dunganês', ko_hun:'hanja-hun (leitura nativa coreana)', ja_kun:'kun-yomi (leitura nativa japonesa)', phm:'protohmong-mien', pmgl:'protomongólico', ptai:'prototai', paa:'protoaustroasiático', ptung:'prototungue', pja:'protojapônico', pko:'protocoreânico', ptb:'prototibeto-birmano', pst:'protossino-tibetano', ko_zai:'sino-coreano zainichi', bo_sino:'sino-tibetano moderno', vi_ohan:'sino-vietnamita antigo', ja_ojp:'sino-japonês antigo', ko_mid:'coreano médio', sjo:'sibé', nan_id:'hokkien indonésio', nan_my:'hokkien malaio', nan_sg:'hokkien de Singapura', yue_mo:'cantonês de Macau', yue_hk:'cantonês de Hong Kong', zh_phagspa:'chinês Yuan (Phags-pa)', zh_yuan:'mandarim Yuan', bca:'bai (central)', ja:'Japonês', ja_osa:'Dialeto de Osaka', ja_aom:'Dialeto de Aomori', ja_oki:'Okinawano', ja_hak:'Dialeto de Hakata', ja_edo: "Japonês (período Edo)", ja_kanbun:'Leitura japonesa do kanbun', ko:'Coreano', ko_kp: "Coreano (Coreia do Norte)", ko_bus:'Dialeto de Busan', zh:'Chinês (mandarim)', yue:'Cantonês', nan:'Taiwanês', wuu:'wu de Xangai', zh_song:'Chinês clássico', zh_wenyan_edu:'Chinês clássico (leitura cantonesa)', vi:'Vietnamita do Norte', vi_c:'Vietnamita do Centro', vi_s:'Vietnamita do Sul', vi_nom: "Vietnamita (Chữ Nôm)", vi_han:'Leitura sino-vietnamita do chinês clássico', th:'Tailandês', id:'Indonésio', sa:'Sânscrito', sa_edu:'Sânscrito falado moderno', hi:'Hindi', en:'Inglês', en_aave: "Inglês (AAVE)", en_south:'Inglês (sul dos EUA)', en_app:'Inglês (Apalaches)', en_ie:'Inglês (irlandês)', en_sco:'Inglês (escocês)', en_yk:'Inglês (Yorkshire)', en_ck:'Inglês (cockney)', de:'Alemão', de_lut:'Alto-alemão protomoderno (era de Lutero)', fr:'Francês', fr_class:'Francês clássico (séc. XVII)', it:'Italiano', it_dan:'Italiano (dantesco)', es_eu:'Espanhol (Europa)', es_sgl:'Espanhol do Século de Ouro', es_mx:'Espanhol (México)', pt_eu:'Português (Europa)', pt_br:'Português (Brasil)', la:'Latim', ru:'Russo', uk:'Ucraniano', ar:'Árabe (padrão)', ar_qur:'Árabe corânico', ar_eg:'Árabe (egípcio)', he:'Hebraico', he_mis:'Hebraico mixnaico', sw:'Suaíli', tr:'Turco', fa:'Persa', fa_clas:'Persa (Clássico)', tl:'Tagalo', ga:'Irlandês', eu:'Basco', mn:'Mongol', my:'Birmanês', am:'Amárico', egy:'Egípcio antigo', ta:'Tâmil', hu:'Húngaro', nl:'Neerlandês', pl:'Polonês', ms:'Malaio', mg:'Malgaxe', cy:'Galês', fi:'Finlandês', ain:'Ainu', bn:'Bengali', ur:'Urdu', te:'Telugu', jv:'Javanês', ko_jeju: "Jeju", ko_em: "Coreano (pré-moderno)", ka:'Georgiano', el:'Grego', el_grc:'Grego antigo', el_kath:'Grego (Katharévussa)', nv:'Navajo', qu:'Quíchua', mi:'Māori', haw:'Havaiano', km:'Khmer', lo:'Lao', yo:'Iorubá', zu:'Zulu', bo:'Tibetano', xct_litpr:'Tibetano clássico litúrgico', hy:'Arménio', hy_grab:'Armênio clássico (Grabar)' , ja_kyo:'Dialeto de Quioto', ja_hir:'Dialeto de Hiroshima', ja_mvi:'Miyako', ja_rys:'Yaeyama', ar_lev:'Árabe (levantino)', ar_ma:'Árabe (marroquino)', ar_gulf:'Árabe (do Golfo)', zh_sc:'Sichuanês', zh_db:'Mandarim do Nordeste', nap:'Napolitano', scn:'Siciliano', de_gsw:'Alemão suíço', fr_qc:'Francês quebequense', sco:'Escocês', en_sg: "Inglês (Singapura)", hwc:'Crioulo havaiano', pcm:'Pidgin nigeriano', tpi:'Tok Pisin', en_ang:'Inglês antigo', sv:'Sueco', no:'Norueguês', si:'Cingalês', ro:'Romeno', cs:'Tcheco', ca:'Catalão', da:'Dinamarquês', is:'Islandês', lt:'Lituano', sq:'Albanês', mt:'Maltês', so:'Somali', ml:'Malaiala', pa:'Punjabi', ku:'Curdo', ug:'Uigur', kk:'Cazaque', ha:'Hauçá', ig:'Igbo', eo:'Esperanto', tok:'Toki Pona', ht:'Crioulo haitiano', ps:'Pastó', uz:'Uzbeque', mr:'Marata', gu:'Guzerate', kn:'Canarês', ne:'Nepalês', om:'Oromo', ti:'Tigrínia', wo:'Uolofe', ln:'Lingala', sn:'Xona', sr:'Sérvio', bg:'Búlgaro', sk:'Eslovaco', lv:'Letão', et:'Estoniano', be:'Bielorrusso', yi:'Iídiche', non:'Nórdico antigo', arc:'Aramaico', cop:'Copta', rom:'Romani', br:'Bretão', xh:'Xhosa', lad:'Ladino', tlh:'Klingon', jbo:'Lojban', fj:'Fijiano', sm:'Samoano', zh_han:'Chinês (Clássico Han)', zh_tang:'Chinês (Clássico Tang)', ceb:'Cebuano', su:'Sundanês', th_isan:'Tailandês (Isan)', es_co:'Espanhol (Colômbia)', es_cl:'Espanhol (Chile)', gl:'Galego', oc:'Occitano', fo:'Feroês', jam:'Patois jamaicano', pap:'Papiamento', gd: "Gaélico escocês", sl: "Esloveno", enm: "Inglês médio", en_em:'Inglês moderno inicial', fr_ch: "Francês (Suíço)", to: "Tonganês", se: "Sami setentrional", af: "Africâner", akk: "Acádio", ar_iq: "Árabe (iraquiano)", ar_sd: "Árabe (sudanês)", ar_tn: "Árabe (tunisino)", as: "Assamês", az: "Azerbaijano", bho: "Bhojpuri", cdo: "Min Oriental", chr: "Cheroqui", ckb: "Curdo (sorani)", cu: "Eslavo eclesiástico antigo", de_at: "Alemão (austríaco)", de_by: "Alemão (bávaro)", en_au: "Inglês (australiano)", en_in: "Inglês (indiano)", es_an: "Espanhol (andaluz)", es_ar: "Espanhol (argentino)", es_cu: "Espanhol (cubano)", es_pe: "Espanhol (peruano)", fr_af: "Francês (africano)", fr_be: "Francês (belga)", fy: "Frísio", gn: "Guarani", got: "Gótico", hak_cn: "Hacá", hit: "Hitita", hmn: "Hmong", ii: "Yi (Nuosu)", ilo: "Ilocano", ine: "Proto-indo-europeu", iu: "Inuktitut", ja_heian: "Japonês (período Heian)", ko_yb: "Coreano (Yanbian)", ky: "Quirguiz", mn_cn: "Mongol (Mongólia Interior)", mnc: "Manchu", myn: "Maia clássico", nci: "Náuatle clássico", nds: "Baixo-alemão", nn: "Norueguês (Nynorsk)", ny: "Chichewa", or: "Oriá", pi: "Páli", pi_edu:'Páli pedagógico (Theravada)', rm: "Romanche", rw: "Quiniaruanda", sc: "Sardo", sd: "Sindi", sux: "Sumério", tg: "Tadjique", th_n: "Tailandês (do norte)", th_s: "Tailandês (do sul)", tk: "Turcomano", vec: "Vêneto", za: "Zhuang", pau: "Palauano", sah: 'iacuto', tyv: 'tuvano', kjh: 'khakas', alt: 'altaico', bxr: 'buriata', evn: 'evenki', eve: 'even', yrk: 'nenets', kca: 'khanty', ckt: 'tchuktchi', niv: 'nivkh', ket: 'ket', cjy: 'Jin', hsn: 'Xiang', gan: 'Gan', mai: 'maithili', awa: 'awadhi', skr: 'saraiki', sat: 'santali', mad: 'madurês', hil: 'hiligaynon', bal: 'balúchi', ak: 'acã (twi)', mk: 'macedônio', lg: 'luganda', ki: 'kikuiu', tn: 'tsuana', st: 'sotho do sul', ts: 'tsonga', ve: 'venda', bem: 'bemba', lua: 'luba-cassai', kg: 'quicongo', ff: 'fula', bm: 'bambara', kab: 'cabila', yua: 'maia iucateca', tzo: 'tzotzil', mix: 'misteca', zap: 'zapoteca', ay: 'aimará', arn: 'mapuche', cr: 'cree (das Planícies)', oj: 'ojíbua', lkt: 'lakota', kl: 'groenlandês', ce: 'checheno', inh: 'ingush', av: 'avar', lez: 'lezgui', dar: 'darguá', lbe: 'lak', tab: 'tabassarão', ady: 'adigueu', kbd: 'cabardiano', ab: 'abcázio', xmf: 'mingreliano', os: 'osseta', ty: 'taitiano', niu: 'niueano', tvl: 'tuvaluano', rap: 'rapanui', rar: 'maori das Ilhas Cook', mh: 'marshalês', gil: 'quiribatiano', ch: 'chamorro', tet: 'tétum', bi: 'bislama', pjt: 'pitjantjatjara', wbp: 'warlpiri', mni: 'meitei', new: 'newari', brx: 'bodo', lus: 'mizo', dz: 'dzonga', min: 'minangkabau', ban: 'balinês', ace: 'achém', bug: 'buginês', war: 'waray', bik: 'bicol central', tum: 'tumbuca', din: 'dinca', nus: 'nuer', luo: 'luo', mas: 'massai', aa: 'afar', shi: 'tashelhit', rif: 'tarifit', mwr: 'marwari', bgc: 'hariânvi', ks: 'caxemira', kok: 'concani', mnp: 'Min Bei', nan_te: 'teochew', yue_ts: 'taishanês', czh: 'Hui', cnp: 'Pinghua', zh_jh: 'mandarim de Jianghuai', zh_tj: 'mandarim de Tianjin', zh_lz: 'mandarim de Lanyin', dng: 'dungane', hsb: 'alto sórbio', csb: 'caxúbio', fur: 'friulano', ast: 'asturiano', an: 'aragonês', rup: 'arromeno', wa: 'valão', udm: 'udmurte', mhr: 'mari da pradaria', myv: 'erzia', krl: 'careliano', mzn: 'mazandarani', glk: 'gilaki', lrc: 'lúri', crh: 'tártaro da Crimeia', tt: 'tártaro', ba: 'baquir', krc: 'caracai-balcar', ksw: 'karen sgaw', lhu: 'lahu', lis: 'lisu', nxq: 'naxi', shn: 'shan', ee: 'eve', nyn: 'nyankole', luy: 'luhya', ssw: 'suázi', nbl: 'ndebele do sul', nso: 'sotho do norte', fan: 'fangue', naq: 'nama (khoekhoe)', hts: 'hadza', kr: 'canúri', men: 'mendê', dyu: 'diúla', syl: 'silheti', mag: 'magai', doi: 'dogri', xkk: 'khmu', moh: 'mohawk', cho: 'chocta', esu: 'iupique do Alasca central', ipk: 'inupiaque', apw: 'apache ocidental', dak: 'dacota', chy: 'cheyenne', lmo: 'lombardo', pms: 'piemontês', eml: 'emiliano-romanholo', mwl: 'mirandês', pnt: 'grego pôntico', hno: 'hindko', bhb: 'bhili', cja: 'cham', hmo: 'hiri motu', pon: 'ponapeano', vmw: 'macua', dsb: 'baixo sórbio', gv: 'manês', kw: 'córnico', zza: 'zazaki', brh: 'brahui', mrq: 'marquesano', tiw: 'tiwi', guc: 'wayuu', myp: 'pirahã', emp: 'emberá do norte', kpe: 'kpelle', loz: 'lozi', bbc: 'batak toba', bjn: 'banjar', sas: 'sasak', kha: 'khasi', mns: 'mansi', mrw: 'maranao', tsg: 'tausug', yap: 'iapense', chk: 'chuuk', gbm: 'garhwali', kfy: 'cumáoni', xnr: 'kangri', hr: 'croata', bs: 'bósnio', iba: 'ibã', ljp: 'lampung', tzm: 'tamazight do Atlas Central', ng: 'ndonga', umb: 'umbundu', kmb: 'quimbundo', her: 'herero', xal: 'calmuco', sg: 'sango', toi: 'tonga (Zâmbia)', peo: 'persa antigo', ave: 'avéstico', xto: 'tocário A', txb: 'tocário B', phn: 'fenício', uga: 'ugarítico', xlu: 'luvita', pal: 'persa médio (pálavi)', syc: 'siríaco clássico', fro: 'francês antigo', goh: 'alto-alemão antigo', gez: 'guèze', gmy: 'grego micênico', xct: 'tibetano clássico', xpu: 'púnico', xhu: 'hurrita', elx: 'elamita', xsa: 'sabeu', kaw: 'javanês antigo (kawi)', kho: 'cotanense', gmh: 'alto-alemão médio', osp: 'espanhol antigo', okz: 'quemer antigo', osx: 'saxão antigo', smg: 'sucuma', mos: 'mooré', kln: 'calenjin', mfe: 'crioulo mauriciano', mnk: 'mandinga', bqi: 'bactiari', unr: 'mundari', hoc: 'ho', enq: 'enga', xpr: 'parta', xqa: 'caracânida', sga: 'irlandês antigo', bsk: 'burushaski', yag: 'iaguenóbi', srn: 'sranan tongo', kwk: "kwak'wala", sad: 'sandauê', pcc: 'bouyei', iuu: 'iu-mien', hui: 'huli', tkl: 'toquelauano', squ: 'squamish', mga: 'irlandês médio', hbo: 'hebraico bíblico', mpt: 'mian', ygr: 'yagaria', quz: 'quéchua cuzquenho', quy: 'quéchua de Ayacucho', cab: 'garífuna', crx: 'carrier', tsi: 'tsimshian costeiro', wbl: 'wakhi', psi: 'pashai', bgq: 'bagri', ach: 'acoli', rki: 'rakhine', kxm: 'quemer setentrional', xng: 'mongol médio', ja_kg: 'japonês (Kagoshima)', ja_sd: 'japonês (Sendai)', ko_hg: 'coreano (Hamgyŏng)', ko_jl: 'coreano (Jeolla)', nan_pn: 'hokkien de Penang', mra: 'mlabri', wuu_nb: 'de Ningbo', yue_gz: 'yue de Gaozhou', khb: 'tai lue', pam: 'kapampangan', pag: 'pangasinense', mdh: 'maguindanao', gor: 'gorontalo', mak: 'macaçar', fon: 'fom', kri: 'crioulo de Serra Leoa', dag: 'dagbani', xog: 'soga', teo: 'ateso', dyo: 'diola-fonyi', bci: 'baulé', tcy: 'tulu', haz: 'hazaragui', tly: 'talysh', kaa: 'karakalpaque', bej: 'beja', tig: 'tigré', ssy: 'saho', ewo: 'ewondo', bum: 'bulu', ndc: 'ndau', ote: 'otomi', tar: 'tarahumara', och:'Chinês antigo', ojp:'Japonês antigo', vsa:'Sânscrito védico', txg:'Tangut', sog:'Sogdiano', otk:'Turco antigo', zkt:'Kitan', juc:'Jurchen', omx:'Mon antigo', pyx:'Pyu', obr:'Birmanês antigo', occ:'Cham antigo', orv:'Eslavo oriental antigo', xsc:'Cita', sukh:'Tailandês antigo (Sukhothai)', xmr:'Meroítico', onw:'Núbio antigo', cqu:'Quíchua clássico', omc:'Mochica', chb:'Chibcha', oma:'Malaio antigo', osu:'Sundanês antigo', otl:'Tagalo antigo', ami:'amis', pwn:'paiwan', tay:'atayal', bnn:'bunun', trv:'truku/seediq', tsu:'tsou', tao:'tao/yami', hak_tw:'hakka de Taiwan', wuu_sz:'wu de Suzhou', wuu_wz:'wu de Wenzhou', nan_qz:'hokkien de Quanzhou', nan_hai:'hainanês', zh_wh:'mandarim de Wuhan', zh_zz:'mandarim de Zhongyuan', hak_hl:'hakka de Hailu', cpx:'min pu-xian', mfa:'malaio patani', mtq:'mường', tyz:'tày', kjp:'karen pwo', kac:'jingpo (kachin)', wbm:'wa', ahk:'akha', dtp:'kadazan-dusun', hne:"chhattisgarhi", mnw:"mon", grt:"garo", nut:"nùng", quc:"kʼicheʼ", kek:"qʼeqchiʼ", mam:"mam", wal:"wolaytta", sid:"sidamo", tji:"tujia", nij:"ngaju", sda:"toraja-saʼdan", arq:'Árabe argelino', mey:'Árabe hassaniya', tmh:'Tamasheq (Tuaregue)', azb:'Azeri meridional', gag:'Gagauzo', sma:'Sami meridional', vro:'Võro', pjk:'Protojapónico-coreano', oko:'Coreano antigo (Silla)', okg:'Goguryeo', ko_gor:'Coreano de Goryeo', ja_chu:'Japonês medieval', pry:'Protoryukyuano', lld:'Ladino dolomítico', stq:'Frísio de Saterland', wym:'Wymysorys', yuc:'Yuchi', kgg:'Kusunda', ota:'Turco otomano', cmg:'Mongol clássico', ett:'Etrusco', xht:'Hatti', txr:'Tartesso', roo:'rotokas', nmn:'taa', lbz:'lardil', nny:'yangkaal', kky:'guugu yimithirr', blc:'nuxalk', tue:'tuyuca', ncs:'língua de sinais nicaraguense', uby:'ubique', lbz_damin:'damin'},
    uk: { es_cr:'Іспанська (Коста-Рика)', es_hn:'Іспанська мова', es_ni:'Іспанська (Нікарагуа)', es_sv:'Іспанська (Сальвадор)', ar_jo:'Йорданська арабська', ar_ps:'Палестинська арабська мова', fr_lu:'Французька', fr_cm:'Камеруньский французький', de_lu:'Німецька (Люксембург)', en_ng2:'Англійська (Гана)', pt_mo:'португальська мова Макао', lb:'Люксембурзька мова', gcr:'Французька гвіанська креольська мова', acf:'Сент-люсійська креольська мова',  gan_yc:'Ганьська китайська мова (Ічуньський діалект)', gan_ja:'Гань (Цзиань)', gan_fz:'Ганьська мова (Фучжоу)', cjy_lv:'Люйляньська цзіньська', cjy_xz:'Цзіньська китайська (синьчжоуський діалект)', hsn_hy:'Сянська (Хенян)', hsn_yz:'Сян (діалект Юнчжоу)', czh_wy:'Гуійська китайська (Вуюань)',  bla:'Мова Чорноногих', hop:'Хопі', com:'Команчська мова', one:'Онейда', ono:'мова онондага', win:'Мова хо-чанк', cro:'Мова крау', hai:'мова хайда', cic:'мова чикасо', ik:'Інупіак', na:'науруанська мова', luz:'Північна мова лури', es_bo:'Іспанська (Болівія)', es_py:'Парагвайська іспанська', es_pa:'панамська іспанська мова', en_my:'Англійська (Малайзія)', pt_gw:'Гвінейський креольський', tsz:'мова пурепеча', nez:'Мова Нез Перс', nv2:'Західна апачі', woe:'волеаійська', pmt:'Туамотуанська мова', bin:'мова едо', khw:'Мова кховар',  xav:'Мова жаванте', ter:'Мова Терена', bor:'Бороро', trn:'Тринітаріо Мохеньйо', ake:'Акавайо', aoc:'Пемон', gun:'Мб\'я-гуарані',  zdj:'Коморська мова (Шикомори)', ayl:'Ліванський арабський', abv:'Бахрейнський арабський', afb:'Арабська мова Перської затоки', acw:'Оманська арабська', swb:'Махорез',  adx:'Амдоська тибетська мова', qxs:'південна мова цян', duu:'друнька мова', jya:'Мова сицу гъялронг', ers:'Мова Ерсу', bca:'Центральна бай', atb:'Зайва', prk:'мова параук ва', slr:'Саларська', ybe:'Західна югур', yuy:'східнойугурська мова', mjg:'Монгорська мова', sce:'Дунсянська мова', peh:'бонанька мова', bua:'бурятська мова', cjs:'Шорська мова', dlg:'Долганська мова', kdt:'Куй', blk:'Мова па\'о', njo:'Ао-нага', srb:'Мова сора', kjg:'Кхму', mro:'Мру', gon:'гондійська', bfq:'Мова бадага', som:'Сомалі', har:'Харарі',  es_pr:'Іспанська (Пуерто-Риканська)', es_do:'Іспанська (Домініканська Республіка)', es_gt:'Іспанська (Гватемала)', es_ec:'Іспанська (Еквадор)', es_uy:'Іспанська (Уругвай)', ar_sy:'Арабська (сирійська)', ar_ye:'Арабська (йеменський діалект)', ar_dz:'Арабська (алжирський діалект)', ar_sa:'Арабська (Саудівська Аравія)', ar_lb:'Арабська (ліванська)', en_wls:'англійська мова (валлійська)', en_jam:'Англійська (ямайська)', en_ng:'Англійська мова (Нігерія)', en_ph:'Англійська (Філіппіни)', en_ke:'Англійська (кенійська)', fr_sn:'Французька (сенегальська)', fr_ci:'Французька (Берег Слонової Кістки)', fr_ht:'Французька (гаїтянська)', pt_mz:'Португальська (Мозамбік)', pt_cv:'Португальська (Кабо-Верде)',  nl_be:'Нідерландська (бельгійська)', en_us:'Англійська (американська)', en_ca:'Англійська (канадська)', en_za:'Англійська (південноафриканська)', de_ch:'Німецька (Швейцарія)', pt_ao:'undefined (ангольська)', es_ve:'undefined (венесуельська)', ca_va:'Валенсійська',  nan_pera:'Перанаканський хоккієн', zh_th:'Тайська мандарин', zh_tw:'Тайванський мандарин', nan_th:'Тайська теочіу', zh_us:'Американська мандарин', yue_us:'Американська кантонська', dng:'Дунганська', ko_hun:'Ханча-хун (питомо-корейське читання)', ja_kun:'Кунйомі (питомо-японське читання)', phm:'Прахмонг-мієн', pmgl:'Прамонгольська', ptai:'Пратайська', paa:'Праавстроазійська', ptung:'Пратунгуська', pja:'Праяпонська', pko:'Пракорейська', ptb:'Пратибето-бірманська', pst:'Прасино-тибетська', ko_zai:'Сіно-корейське читання зайніті', bo_sino:'Сучасний сіно-тибетський', vi_ohan:"Давнє сіно-в'єтнамське", ja_ojp:'Давньояпонське сіно-читання', ko_mid:'Середньокорейський', sjo:'Сибинська', nan_id:'Індонезійський хоккієн', nan_my:'Малайзійський хоккієн', nan_sg:'Сингапурський хоккієн', yue_mo:'Макаоська кантонська', yue_hk:'Гонконзька кантонська', zh_phagspa:'Юанська китайська (Паґспа)', zh_yuan:'Юанська мандарин', bca:'байська (центральна)', ja:'Японська', ja_osa:'Осакський діалект', ja_aom:'Аоморійський діалект', ja_oki:'Окінавська', ja_hak:'Хакатський діалект', ja_edo: "Японська (період Едо)", ja_kanbun:'Камбун-кундоку (японське читання класичної китайської)', ko:'Корейська', ko_kp: "Корейська (КНДР)", ko_bus:'Пусанський діалект', zh:'Китайська (путунхуа)', yue:'Кантонська', nan:'Тайванська', wuu:'Шанхайський у', zh_song:'Веньянь', zh_wenyan_edu:'Класична китайська (кантонське читання)', vi:'Північна в\'єтнамська', vi_c:'Центральна в\'єтнамська', vi_s:'Південна в\'єтнамська', vi_nom:'Тьи-ном', vi_han:"Хан-ван (сино-в'єтнамське читання класичної китайської)", th:'Тайська', id:'Індонезійська', sa:'Санскрит', sa_edu:'Сучасний розмовний санскрит', hi:'Гінді', en:'Англійська', en_aave: "Англійська (AAVE)", en_south:'Англійська (південь США)', en_app:'Англійська (Аппалачі)', en_ie:'Англійська (ірландська)', en_sco:'Англійська (шотландська)', en_yk:'Англійська (Йоркшир)', en_ck:'Англійська (кокні)', de:'Німецька', de_lut:'Ранньонововерхньонімецька (доби Лютера)', fr:'Французька', fr_class:'Класична французька (XVII ст.)', it:'Італійська', it_dan:'Італійська (часів Данте)', es_eu:'Іспанська (Європа)', es_sgl:'Іспанська Золотої доби', es_mx:'Іспанська (Мексика)', pt_eu:'Португальська (Європа)', pt_br:'Португальська (Бразилія)', la:'Латинська', ru:'Російська', uk:'Українська', ar:'Арабська (стандарт)', ar_qur:'Коранічна арабська', ar_eg:'Арабська (єгипетська)', he:'Іврит', he_mis:'Мішнаїтський іврит', sw:'Суахілі', tr:'Турецька', fa:'Перська', fa_clas:'Перська (класична)', tl:'Тагальська', ga:'Ірландська', eu:'Баскська', mn:'Монгольська', my:'Бірманська', am:'Амхарська', egy:'Давньоєгипетська', ta:'Тамільська', hu:'Угорська', nl:'Нідерландська', pl:'Польська', ms:'Малайська', mg:'Малагасійська', cy:'Валлійська', fi:'Фінська', ain:'Айнська', bn:'Бенгальська', ur:'Урду', te:'Телугу', jv:'Яванська', ko_jeju:'Чеджуська', ko_em: "Корейська (ранньонова)", ka:'Грузинська', el:'Грецька', el_grc:'Давньогрецька', el_kath:'Грецька (катаревуса)', nv:'Навахо', qu:'Кечуа', mi:'Маорі', haw:'Гавайська', km:'Кхмерська', lo:'Лаоська', yo:'Йоруба', zu:'Зулу', bo:'Тибетська', xct_litpr:'Класична тибетська (літургічна)', hy:'Вірменська', hy_grab:'Давньовірменська (грабар)' , ja_kyo:'Кіотський діалект', ja_hir:'Хіросімський діалект', ja_mvi:'Мійяко', ja_rys:'Яеяма', ar_lev:'Арабська (левантійська)', ar_ma:'Арабська (марокканська)', ar_gulf:'Арабська (затоцька)', zh_sc:'Сичуаньська', zh_db:'Північно-східний мандарин', nap:'Неаполітанська', scn:'Сицилійська', de_gsw:'Швейцарська німецька', fr_qc:'Квебекська французька', sco:'Шотландська', en_sg:'Сінгліш', hwc:'Гавайська креольська', pcm:'Нігерійський піджин', tpi:'Ток-пісін', en_ang:'Давньоанглійська', sv:'Шведська', no:'Норвезька', si:'Сингальська', ro:'Румунська', cs:'Чеська', ca:'Каталанська', da:'Данська', is:'Ісландська', lt:'Литовська', sq:'Албанська', mt:'Мальтійська', so:'Сомалійська', ml:'Малаялам', pa:'Панджабі', ku:'Курдська', ug:'Уйгурська', kk:'Казахська', ha:'Хауса', ig:'Ігбо', eo:'Есперанто', tok:'Токі Пона', ht:'Гаїтянська креольська', ps:'Пушту', uz:'Узбецька', mr:'Маратхі', gu:'Гуджараті', kn:'Каннада', ne:'Непальська', om:'Оромо', ti:'Тигринья', wo:'Волоф', ln:'Лінгала', sn:'Шона', sr:'Сербська', bg:'Болгарська', sk:'Словацька', lv:'Латвійська', et:'Естонська', be:'Білоруська', yi:'Їдиш', non:'Давньоскандинавська', arc:'Арамейська', cop:'Коптська', rom:'Циганська', br:'Бретонська', xh:'Коса', lad:'Ладіно', tlh:'Клінгонська', jbo:'Ложбан', fj:'Фіджійська', sm:'Самоанська', zh_han:'Китайська (Хань)', zh_tang:'Китайська (Тан)', ceb:'Себуано', su:'Сунданська', th_isan:'Тайська (Ісан)', es_co:'Іспанська (Колумбія)', es_cl:'Іспанська (Чилі)', gl:'Галісійська', oc:'Окситанська', fo:'Фарерська', jam:'Ямайський патуа', pap:'Папʼяменто', gd: "Шотландська гельська", sl: "Словенська", enm: "Середньоанглійська", en_em:'Ранньоновоанглійська', fr_ch: "Французька (Швейцарія)", to: "Тонганська", se: "Північносаамська", af: "Африкаанс", akk: "Аккадська", ar_iq: "Арабська (іракська)", ar_sd: "Арабська (суданська)", ar_tn: "Арабська (туніська)", as: "Ассамська", az: "Азербайджанська", bho: "Бходжпурі", cdo: "Східноміньська", chr: "Черокі", ckb: "Курдська (сорані)", cu: "Старослов'янська", de_at: "Німецька (австрійська)", de_by: "Німецька (баварська)", en_au: "Англійська (австралійська)", en_in: "Англійська (індійська)", es_an: "Іспанська (андалузька)", es_ar: "Іспанська (аргентинська)", es_cu: "Іспанська (кубинська)", es_pe: "Іспанська (перуанська)", fr_af: "Французька (африканська)", fr_be: "Французька (бельгійська)", fy: "Фризька", gn: "Гуарані", got: "Готська", hak_cn: "Хакка", hit: "Хетська", hmn: "Хмонг", ii: "І (Носу)", ilo: "Ілоканська", ine: "Праіндоєвропейська", iu: "Інуктитут", ja_heian: "Японська (період Хейан)", ko_yb: "Корейська (Яньбянь)", ky: "Киргизька", mn_cn: "Монгольська (Внутрішня Монголія)", mnc: "Маньчжурська", myn: "Класична мая", nci: "Класичний науатль", nds: "Нижньонімецька", nn: "Норвезька (нюношк)", ny: "Чева", or: "Орія", pi: "Палі", pi_edu:'Палі (педагогічна, тхеравадинська)', rm: "Ретороманська", rw: "Кіньяруанда", sc: "Сардинська", sd: "Синдхі", sux: "Шумерська", tg: "Таджицька", th_n: "Тайська (північна)", th_s: "Тайська (південна)", tk: "Туркменська", vec: "Венетська", za: "Чжуанська", pau: "Палауська", sah: 'Якутська', tyv: 'Тувинська', kjh: 'Хакаська', alt: 'Алтайська', bxr: 'Бурятська', evn: 'Евенкійська', eve: 'Евенська', yrk: 'Ненецька', kca: 'Хантийська', ckt: 'Чукотська', niv: 'Нівхська', ket: 'Кетська', cjy: 'Цзиньська', hsn: 'Сянська', gan: 'Ганьська', mai: 'Майтхілі', awa: 'Авадхі', skr: 'Сараїкі', sat: 'Сантальська', mad: 'Мадурська', hil: 'Хілігайнон', bal: 'Белуджська', ak: 'Аканська (чві)', mk: 'Македонська', lg: 'Луганда', ki: 'Кікуйю', tn: 'Тсвана', st: 'Південна сото', ts: 'Тсонга', ve: 'Венда', bem: 'Бемба', lua: 'Луба-касаї', kg: 'Конго', ff: 'Фула', bm: 'Бамбара', kab: 'Кабільська', yua: 'Юкатекський мая', tzo: 'Цоциль', mix: 'Міштекська', zap: 'Сапотекська', ay: 'Аймара', arn: 'Мапуче', cr: 'Крі (рівнинний)', oj: 'Оджибве', lkt: 'Лакота', kl: 'Гренландська', ce: 'Чеченська', inh: 'Інгуська', av: 'Аварська', lez: 'Лезгинська', dar: 'Даргинська', lbe: 'Лакська', tab: 'Табасаранська', ady: 'Адигейська', kbd: 'Кабардинська', ab: 'Абхазька', xmf: 'Мегрельська', os: 'Осетинська', ty: 'Таїтянська', niu: 'Ніуе', tvl: 'Тувалу', rap: 'Рапануйська', rar: 'Маорі островів Кука', mh: 'Маршалльська', gil: 'Кірибаті', ch: 'Чаморро', tet: 'Тетум', bi: 'Біслама', pjt: 'Пітьянтьятьяра', wbp: 'Варльпірі', mni: 'Маніпурі', new: 'Неварська', brx: 'Бодо', lus: 'Мізо', dz: 'Дзонг-ке', min: 'Мінангкабау', ban: 'Балійська', ace: 'Ачехська', bug: 'Бугійська', war: 'Варай', bik: 'Центральна біколь', tum: 'Тумбука', din: 'Дінка', nus: 'Нуер', luo: 'Луо', mas: 'Масаї', aa: 'Афар', shi: 'Ташельхіт', rif: 'Тарифіт', mwr: 'Марварі', bgc: 'Хар’янві', ks: 'Кашмірська', kok: 'Конкані', mnp: 'Мінбейська', nan_te: 'Чаошаньська', yue_ts: 'Тайшаньська', czh: 'Хуейчжоуська', cnp: 'Пінхуа', zh_jh: 'Цзянхуайський мандарин', zh_tj: 'Тяньцзіньський мандарин', zh_lz: 'Ланьїнь-мандарин', dng: 'Дунганська', hsb: 'Верхньолужицька', csb: 'Кашубська', fur: 'Фріульська', ast: 'Астурійська', an: 'Арагонська', rup: 'Аромунська', wa: 'Валлонська', udm: 'Удмуртська', mhr: 'Лугова марійська', myv: 'Ерзянська', krl: 'Карельська', mzn: 'Мазандеранська', glk: 'Гілянська', lrc: 'Лурська', crh: 'Кримськотатарська', tt: 'Татарська', ba: 'Башкирська', krc: 'Карачаєво-балкарська', ksw: 'Сґау-каренська', lhu: 'Лаху', lis: 'Лісу', nxq: 'Насі', shn: 'Шанська', ee: 'Еве', nyn: 'Руньянколе', luy: 'Лухья', ssw: 'Сваті', nbl: 'Південна ндебеле', nso: 'Північна сото', fan: 'Фанг', naq: 'Нама (хойхой)', hts: 'Хадза', kr: 'Канурі', men: 'Менде', dyu: 'Дьюла', syl: 'Силхетська', mag: 'Магахі', doi: 'Догрі', xkk: 'Кхму', moh: 'Могавкська', cho: 'Чокто', esu: 'Центральноаляскинська юпік', ipk: 'Інупіак', apw: 'Західна апачі', dak: 'Дакота', chy: 'Шаєнська', lmo: 'Ломбардська', pms: 'П’ємонтська', eml: 'Емілієво-романьольська', mwl: 'Мірандська', pnt: 'Понтійська грецька', hno: 'Хіндко', bhb: 'Бхілі', cja: 'Чамська', hmo: 'Хірі-моту', pon: 'Понапе', vmw: 'Макуа', dsb: 'Нижньолужицька', gv: 'Менська', kw: 'Корнська', zza: 'Зазакі', brh: 'Брауї', mrq: 'Маркізька', tiw: 'Тіві', guc: 'Вайю', myp: 'Піраха', emp: 'Північна ембера', kpe: 'Кпелле', loz: 'Лозі', bbc: 'Батак-тоба', bjn: 'Банджарська', sas: 'Сасакська', kha: 'Кхасі', mns: 'Мансійська', mrw: 'Маранська', tsg: 'Таусугська', yap: 'Япська', chk: 'Чууцька', gbm: 'Гархвалі', kfy: 'Кумаоні', xnr: 'Кангрі', hr: 'Хорватська', bs: 'Боснійська', iba: 'Ібан', ljp: 'Лампунг', tzm: 'Центральноатласький тамазігт', ng: 'Ндонга', umb: 'Умбунду', kmb: 'Кімбунду', her: 'Гереро', xal: 'Калмицька', sg: 'Санго', toi: 'Тонга (Замбія)', peo: 'Давньоперська', ave: 'Авестійська', xto: 'Тохарська A', txb: 'Тохарська B', phn: 'Фінікійська', uga: 'Угаритська', xlu: 'Лувійська', pal: 'Середньоперська (пехлеві)', syc: 'Класична сирійська', fro: 'Старофранцузька', goh: 'Давньоверхньонімецька', gez: 'Геез', gmy: 'Мікенська грецька', xct: 'Класична тибетська', xpu: 'Пунічна', xhu: 'Хурритська', elx: 'Еламська', xsa: 'Сабейська', kaw: 'Давньояванська (каві)', kho: 'Хотаносакська', gmh: 'Середньоверхньонімецька', osp: 'Староіспанська', okz: 'Давньокхмерська', osx: 'Давньосаксонська', smg: 'Сукума', mos: 'Море', kln: 'Календжин', mfe: 'Маврикійська креольська', mnk: 'Мандінка', bqi: 'Бахтіарська', unr: 'Мундарі', hoc: 'Хо', enq: 'Енґа', xpr: 'Парфянська', xqa: 'Караханідська', sga: 'Давньоірландська', bsk: 'Бурушаскі', yag: 'Ягнобська', srn: 'Сранан-тонго', kwk: 'Кваквала', sad: 'Сандаве', pcc: 'Буї', iuu: "Іу-м'єн", hui: 'Хулі', tkl: 'Токелау', squ: 'Скуоміш', mga: 'Середньоірландська', hbo: 'Біблійний іврит', mpt: 'Міан', ygr: 'Ягарія', quz: 'Куський кечуа', quy: 'Аякучанська кечуа', cab: 'Гарифуна', crx: 'Керрієр', tsi: 'Прибережна цимшіанська', wbl: 'Ваханська', psi: 'Пашаї', bgq: 'Багрі', ach: 'Ачолі', rki: 'Ракхайн', kxm: 'Північна кхмерська', xng: 'Середньомонгольська', ja_kg: 'Японська (Каґосіма)', ja_sd: 'Японська (Сендай)', ko_hg: 'Корейська (Хамґьон)', ko_jl: 'Корейська (Чхольла)', nan_pn: 'Пенанґський хоккіен', mra: 'Млабрі', wuu_nb: 'Нінбоська', yue_gz: 'Гаочжоуський юе', khb: 'Тай-ли', pam: 'Капампанган', pag: 'Пангасінан', mdh: 'Магинданао', gor: 'Горонтало', mak: 'Макасарська', fon: 'Фон', kri: 'Кріо', dag: 'Дагбані', xog: 'Сога', teo: 'Атесо', dyo: 'Діола-фоні', bci: 'Бауле', tcy: 'Тулу', haz: 'Хазараджі', tly: 'Талиська', kaa: 'Каракалпацька', bej: 'Беджа', tig: 'Тигре', ssy: 'Сахо', ewo: 'Евондо', bum: 'Булу', ndc: 'Ндау', ote: 'Отомі', tar: 'Тараумара', och:'Давньокитайська', ojp:'Давньояпонська', vsa:'Ведійський санскрит', txg:'Тангутська', sog:'Согдійська', otk:'Давньотюркська', zkt:'Кіданьська', juc:'Чжурчженська', omx:'Давньомонська', pyx:'Пью', obr:'Давньобірманська', occ:'Давньочамська', orv:'Давньоруська', xsc:'Скіфська', sukh:'Давньотайська (Сукхотхай)', xmr:'Мероїтська', onw:'Давньонубійська', cqu:'Класична кечуа', omc:'Мочика', chb:'Чибча', oma:'Давньомалайська', osu:'Давньосунданська', otl:'Давньотагальська', ami:'аміс', pwn:'пайван', tay:'атаял', bnn:'бунун', trv:'труку/сидик', tsu:'цоу', tao:'тао (ямі)', hak_tw:'тайванський хакка', wuu_sz:'Сучжоуський у', wuu_wz:'Веньчжоуський у', nan_qz:'Цюаньчжоуський хокієн', nan_hai:'хайнаньська', zh_wh:'Уханьський мандарин', zh_zz:'мандарин Чжунюань', hak_hl:'Хайлуський хакка', cpx:'пу-сянь міньська', mfa:'патанійська малайська', mtq:'мионг', tyz:'тай (Вʼєтнам)', kjp:'пво-карен', kac:'цзінпо (качин)', wbm:'ва', ahk:'акха', dtp:'кадазан-дусун', hne:"чхатісгархі", mnw:"мон", grt:"гаро", nut:"нунг", quc:"кʼіче", kek:"кʼекчі", mam:"мам", wal:"воламо", sid:"сідамо", tji:"туцзя", nij:"нгаджу", sda:"тораджа-садан", arq:'Алжирська арабська', mey:'Хассанійська арабська', tmh:'Тамашек (туареги)', azb:'Південноазербайджанська', gag:'Гагаузька', sma:'Південносаамська', vro:'Виру', pjk:'Праяпоно-корейська', oko:'Давньокорейська (Сілла)', okg:'Когурьоська', ko_gor:'Корейська (Корьо)', ja_chu:'Середньояпонська', pry:'Прарюкюська', lld:'Ладинська', stq:'Затерфризька', wym:'Вілямовська', yuc:'Юті', kgg:'Кусунда', ota:'Османська турецька', cmg:'Класична монгольська', ett:'Етруська', xht:'Хаттська', txr:'Тартесійська', roo:'ротокас', nmn:'таа', lbz:'лардил', nny:'янгкаал', kky:'гууг-їмітирр', blc:'нухалк', tue:'туюка', ncs:'нікарагуанська жестова мова', uby:'убихська', lbz_damin:'дамін'},
};

// Audit Task 141: backfill display names for newly-added languages
// (cv, mdf, dv, tzh) across all UI languages. Done as a post-assignment
// block so the giant single-line dicts above don't need to be re-edited
// for every new code. New codes added later should also go here.
(function backfillNames() {
    const ADDED = {
        cv:  { en: 'Chuvash',  ja: 'チュヴァシ語', ko: '추바시어', zh: '楚瓦什语', yue: '楚瓦什語',
               vi: 'Tiếng Chuvash', th: 'ภาษาชูวัช', id: 'Chuvash', hi: 'चूवाश',
               de: 'Tschuwaschisch', fr: 'Tchouvache', it: 'Ciuvascio',
               es_eu: 'Chuvasio', es_mx: 'Chuvasio', pt_eu: 'Chuvache', pt_br: 'Chuvache',
               ru: 'Чувашский', uk: 'Чуваська', ar: 'التشوفاشية', he: 'צ\'ובאשית', sw: 'Kichuvash' },
        mdf: { en: 'Moksha',   ja: 'モクシャ語',     ko: '목샤어',   zh: '莫克沙语', yue: '莫克沙語',
               vi: 'Tiếng Moksha', th: 'ภาษามอกชา', id: 'Moksha', hi: 'मोक्षा',
               de: 'Mokscha', fr: 'Mokcha', it: 'Mokscia',
               es_eu: 'Moksha', es_mx: 'Moksha', pt_eu: 'Moksha', pt_br: 'Moksha',
               ru: 'Мокшанский', uk: 'Мокшанська', ar: 'الموكشية', he: 'מוקשה', sw: 'Kimoksha' },
        dv:  { en: 'Dhivehi',  ja: 'ディベヒ語',     ko: '디베히어', zh: '迪维希语', yue: '迪維希語',
               vi: 'Tiếng Dhivehi', th: 'ภาษาดิเวฮี', id: 'Dhivehi', hi: 'धिवेही',
               de: 'Dhivehi', fr: 'Divéhi', it: 'Divehi',
               es_eu: 'Maldivo', es_mx: 'Maldivo', pt_eu: 'Maldívio', pt_br: 'Maldívio',
               ru: 'Мальдивский', uk: 'Дівехі', ar: 'الديفيهية', he: 'דיבהי', sw: 'Kidhivehi' },
        tzh: { en: 'Tzeltal',  ja: 'ツェルタル語',   ko: '첼탈어',   zh: '泽塔尔语', yue: '澤塔爾語',
               vi: 'Tiếng Tzeltal', th: 'ภาษาเซลตัล', id: 'Tzeltal', hi: 'त्ज़ेल्ताल',
               de: 'Tzeltal', fr: 'Tzeltal', it: 'Tzeltal',
               es_eu: 'Tzeltal', es_mx: 'Tzeltal', pt_eu: 'Tzeltal', pt_br: 'Tzeltal',
               ru: 'Цельталь', uk: 'Цельталь', ar: 'تسلتال', he: 'צלטל', sw: 'Kitzeltal' },
        // Audit Task 141 part 2 + Task 142 (2026-05-06)
        kpv: { en: 'Komi-Zyrian', ja: 'コミ・ジリエン語', ko: '코미지리안어', zh: '科米-济良语',
               de: 'Syrjänisch', fr: 'Komi-Zyriène', it: 'Komi-Zyrieno',
               es_eu: 'Komi zyriano', es_mx: 'Komi zyriano', pt_eu: 'Komi zíria', pt_br: 'Komi zíria',
               ru: 'Коми-зырянский', uk: 'Комі-зирянська', ar: 'الكومية الزيرية', he: 'קומי זיריאן', sw: 'Kikomi-Zyrian' },
        koi: { en: 'Komi-Permyak', ja: 'コミ・ペルミャク語', ko: '코미페르먀크어', zh: '科米-彼尔米亚克语',
               de: 'Komi-Permjakisch', fr: 'Komi-Permiak', it: 'Komi-Permiacco',
               es_eu: 'Komi permiaco', es_mx: 'Komi permiaco', pt_eu: 'Komi-Permiaca', pt_br: 'Komi-Permiaca',
               ru: 'Коми-пермяцкий', uk: 'Комі-перм\'яцька', ar: 'الكومية البيرمية', he: 'קומי-פרמיאק', sw: 'Kikomi-Permyak' },
        rmy: { en: 'Vlax Romani', ja: 'ヴラフ・ロマ語', ko: '블락스 로마니어', zh: '弗拉克斯罗姆语',
               de: 'Vlax-Romani', fr: 'Romani vlax', it: 'Romani vlax',
               es_eu: 'Romaní vlax', es_mx: 'Romaní vlax', pt_eu: 'Romani vlax', pt_br: 'Romani vlax',
               ru: 'Влашский цыганский', uk: 'Власька циганська', ar: 'الرومانية الفلاشية', he: 'רומאני ולאשי', sw: 'Kiromani cha Vlax' },
        smj: { en: 'Lule Sámi', ja: 'ルレ・サーミ語', ko: '룰레 사미어', zh: '吕勒萨米语',
               de: 'Lulesamisch', fr: 'Same de Lule', it: 'Sami di Lule',
               es_eu: 'Sami de Lule', es_mx: 'Sami de Lule', pt_eu: 'Sami de Lule', pt_br: 'Sami de Lule',
               ru: 'Луле-саамский', uk: 'Луле-саамська', ar: 'السامية اللولية', he: 'סאמית לולה', sw: 'Kisami cha Lule' },
        smn: { en: 'Inari Sámi', ja: 'イナリ・サーミ語', ko: '이나리 사미어', zh: '伊纳里萨米语',
               de: 'Inarisamisch', fr: 'Same d\'Inari', it: 'Sami di Inari',
               es_eu: 'Sami de Inari', es_mx: 'Sami de Inari', pt_eu: 'Sami de Inari', pt_br: 'Sami de Inari',
               ru: 'Инари-саамский', uk: 'Інарі-саамська', ar: 'السامية الإيناريّة', he: 'סאמית אינארי', sw: 'Kisami cha Inari' },
        sms: { en: 'Skolt Sámi', ja: 'スコルト・サーミ語', ko: '스콜트 사미어', zh: '斯科尔特萨米语',
               de: 'Skoltsamisch', fr: 'Same skolt', it: 'Sami skolt',
               es_eu: 'Sami skolt', es_mx: 'Sami skolt', pt_eu: 'Sami skolt', pt_br: 'Sami skolt',
               ru: 'Колтта-саамский', uk: 'Колтта-саамська', ar: 'السامية السكولتية', he: 'סאמית סקולט', sw: 'Kisami cha Skolt' },
        vep: { en: 'Veps', ja: 'ヴェプス語', ko: '베프스어', zh: '维普森语',
               de: 'Wepsisch', fr: 'Vepse', it: 'Vepso',
               es_eu: 'Vepso', es_mx: 'Vepso', pt_eu: 'Vepse', pt_br: 'Vepse',
               ru: 'Вепсский', uk: 'Вепська', ar: 'الفيبسية', he: 'וופסית', sw: 'Kiveps' },
        vot: { en: 'Votic', ja: 'ヴォート語', ko: '보트어', zh: '沃特语',
               de: 'Wotisch', fr: 'Vote', it: 'Voto',
               es_eu: 'Voto', es_mx: 'Voto', pt_eu: 'Vótico', pt_br: 'Vótico',
               ru: 'Водский', uk: 'Водська', ar: 'الفوتية', he: 'ווטית', sw: 'Kivoti' },
    };
    for (const code of Object.keys(ADDED)) {
        for (const ui of Object.keys(ADDED[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED[code][ui];
            }
        }
    }
    // Audit Task 141 part 2 / Task 142: yue/vi/th/id/hi backfill for the
    // 8 newer language additions (kpv/koi/rmy/smj/smn/sms/vep/vot).
    const ADDED2 = {
        kpv: { yue: '科米-濟良語', vi: 'Tiếng Komi-Zyrian', th: 'ภาษาโกมิ-ไซเรียน', id: 'Komi-Zyrian', hi: 'कोमी-जिर्यान' },
        koi: { yue: '科米-彼爾米亞克語', vi: 'Tiếng Komi-Permyak', th: 'ภาษาโกมิ-เปอร์เมียค', id: 'Komi-Permyak', hi: 'कोमी-पर्म्याक' },
        rmy: { yue: '弗拉克斯羅姆語', vi: 'Tiếng Romani Vlax', th: 'ภาษาโรมานีฟลาช', id: 'Romani Vlax', hi: 'व्लाख रोमानी' },
        smj: { yue: '呂勒薩米語', vi: 'Tiếng Sami Lule', th: 'ภาษาซามิลูเล', id: 'Sami Lule', hi: 'लूले सामी' },
        smn: { yue: '伊納里薩米語', vi: 'Tiếng Sami Inari', th: 'ภาษาซามิอินาริ', id: 'Sami Inari', hi: 'इनारी सामी' },
        sms: { yue: '斯科爾特薩米語', vi: 'Tiếng Sami Skolt', th: 'ภาษาซามิสคอลต์', id: 'Sami Skolt', hi: 'स्कोल्ट सामी' },
        vep: { yue: '維普森語', vi: 'Tiếng Veps', th: 'ภาษาเวปส์', id: 'Veps', hi: 'वेप्स' },
        vot: { yue: '沃特語', vi: 'Tiếng Votic', th: 'ภาษาโวติก', id: 'Voti', hi: 'वोटिक' },
    };
    for (const code of Object.keys(ADDED2)) {
        for (const ui of Object.keys(ADDED2[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED2[code][ui];
            }
        }
    }
    // Audit Task 149/150: Tier 3 / 3.5 additions (tah/en_nz/vo/ia/byn)
    const ADDED3 = {
        tah:   { en: 'Tahitian', ja: 'タヒチ語', ko: '타히티어', zh: '塔希提语', yue: '塔希提語',
                 vi: 'Tiếng Tahiti', th: 'ภาษาตาฮีตี', id: 'Tahiti', hi: 'ताहिती',
                 de: 'Tahitianisch', fr: 'Tahitien', it: 'Tahitiano',
                 es_eu: 'Tahitiano', es_mx: 'Tahitiano', pt_eu: 'Taitiano', pt_br: 'Taitiano',
                 ru: 'Таитянский', uk: 'Таїтянська', ar: 'التاهيتية', he: 'טהיטית', sw: 'Kitahiti' },
        en_nz: { en: 'English (New Zealand)', ja: '英語(ニュージーランド)', ko: '영어(뉴질랜드)', zh: '英语(新西兰)', yue: '英語(紐西蘭)',
                 vi: 'Tiếng Anh (New Zealand)', th: 'อังกฤษ (นิวซีแลนด์)', id: 'Inggris (Selandia Baru)', hi: 'अंग्रेज़ी (न्यूज़ीलैंड)',
                 de: 'Englisch (Neuseeland)', fr: 'Anglais (Nouvelle-Zélande)', it: 'Inglese (Nuova Zelanda)',
                 es_eu: 'Inglés (Nueva Zelanda)', es_mx: 'Inglés (Nueva Zelanda)', pt_eu: 'Inglês (Nova Zelândia)', pt_br: 'Inglês (Nova Zelândia)',
                 ru: 'Английский (Новая Зеландия)', uk: 'Англійська (Нова Зеландія)', ar: 'الإنجليزية (نيوزيلندا)', he: 'אנגלית (ניו זילנד)', sw: 'Kiingereza (NZ)' },
        vo:    { en: 'Volapük', ja: 'ヴォラピュク', ko: '볼라퓌크', zh: '沃拉普克语', yue: '沃拉普克語',
                 vi: 'Tiếng Volapük', th: 'ภาษาวอลาปุค', id: 'Volapük', hi: 'वोलापुक',
                 de: 'Volapük', fr: 'Volapük', it: 'Volapük',
                 es_eu: 'Volapük', es_mx: 'Volapük', pt_eu: 'Volapük', pt_br: 'Volapük',
                 ru: 'Волапюк', uk: 'Волапюк', ar: 'فولابوك', he: 'וולאפיק', sw: 'Kivolapük' },
        ia:    { en: 'Interlingua', ja: 'インターリングア', ko: '인테르링구아', zh: '国际语', yue: '國際語',
                 vi: 'Interlingua', th: 'อินเตอร์ลิงกัว', id: 'Interlingua', hi: 'इंटरलिंगुआ',
                 de: 'Interlingua', fr: 'Interlingua', it: 'Interlingua',
                 es_eu: 'Interlingua', es_mx: 'Interlingua', pt_eu: 'Interlíngua', pt_br: 'Interlíngua',
                 ru: 'Интерлингва', uk: 'Інтерлінгва', ar: 'إنترلينغوا', he: 'אינטרלינגואה', sw: 'Interlingua' },
        byn:   { en: 'Blin', ja: 'ブリン語', ko: '블린어', zh: '布林语', yue: '布林語',
                 vi: 'Tiếng Bilen', th: 'ภาษาบีเลน', id: 'Blin', hi: 'ब्लिन',
                 de: 'Blin', fr: 'Blin (bilen)', it: 'Blin',
                 es_eu: 'Blin', es_mx: 'Blin', pt_eu: 'Blin', pt_br: 'Blin',
                 ru: 'Билин', uk: 'Білен', ar: 'البلينية', he: 'בלין', sw: 'Kibilen' },
    };
    for (const code of Object.keys(ADDED3)) {
        for (const ui of Object.keys(ADDED3[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED3[code][ui];
            }
        }
    }
    // Audit Task 149/150 batch additions: Uganda + Kamba + creoles
    const ADDED4 = {
        cgg: { en: 'Chiga', ja: 'チガ語', ko: '치가어', zh: '奇加语', yue: '奇加語',
               vi: 'Tiếng Chiga', th: 'ภาษาชิกา', id: 'Chiga', hi: 'चिगा',
               de: 'Chiga', fr: 'Chiga', it: 'Chiga',
               es_eu: 'Chiga', es_mx: 'Chiga', pt_eu: 'Chiga', pt_br: 'Chiga',
               ru: 'Чига', uk: 'Чига', ar: 'الشيغية', he: 'צ\'יגה', sw: 'Kichiga' },
        ttj: { en: 'Tooro', ja: 'トーロ語', ko: '토로어', zh: '托罗语', yue: '托羅語',
               vi: 'Tiếng Tooro', th: 'ภาษาตูโร', id: 'Tooro', hi: 'टूरो',
               de: 'Tooro', fr: 'Tooro', it: 'Tooro',
               es_eu: 'Tooro', es_mx: 'Tooro', pt_eu: 'Tooro', pt_br: 'Tooro',
               ru: 'Тооро', uk: 'Тооро', ar: 'التورية', he: 'טורו', sw: 'Kitooro' },
        nyo: { en: 'Nyoro', ja: 'ニョロ語', ko: '뇨로어', zh: '尼奥罗语', yue: '尼奧羅語',
               vi: 'Tiếng Nyoro', th: 'ภาษานิโอโร', id: 'Nyoro', hi: 'न्योरो',
               de: 'Nyoro', fr: 'Nyoro', it: 'Nyoro',
               es_eu: 'Nyoro', es_mx: 'Nyoro', pt_eu: 'Nyoro', pt_br: 'Nyoro',
               ru: 'Ньоро', uk: 'Ньоро', ar: 'النيورية', he: 'ניורו', sw: 'Kinyoro' },
        laj: { en: 'Lango', ja: 'ランゴ語', ko: '랑고어', zh: '兰戈语', yue: '蘭戈語',
               vi: 'Tiếng Lango', th: 'ภาษาลังโก', id: 'Lango', hi: 'लांगो',
               de: 'Lango', fr: 'Lango', it: 'Lango',
               es_eu: 'Lango', es_mx: 'Lango', pt_eu: 'Lango', pt_br: 'Lango',
               ru: 'Ланго', uk: 'Ланго', ar: 'اللانغو', he: 'לאנגו', sw: 'Kilango' },
        kam: { en: 'Kamba', ja: 'カンバ語', ko: '캄바어', zh: '坎巴语', yue: '坎巴語',
               vi: 'Tiếng Kamba', th: 'ภาษากัมบา', id: 'Kamba', hi: 'कांबा',
               de: 'Kamba', fr: 'Kamba', it: 'Kamba',
               es_eu: 'Kamba', es_mx: 'Kamba', pt_eu: 'Kamba', pt_br: 'Kamba',
               ru: 'Камба', uk: 'Камба', ar: 'الكامبا', he: 'קמבה', sw: 'Kikamba' },
        kea: { en: 'Cape Verdean Creole', ja: 'カーボベルデ・クレオール', ko: '카보베르데 크레올어', zh: '佛得角克里奥尔语', yue: '佛得角克里奧爾語',
               vi: 'Tiếng Creole Cape Verde', th: 'ภาษาครีโอลกาบูเวร์ดี', id: 'Kreol Tanjung Verde', hi: 'कैप वर्डियन क्रियोल',
               de: 'Kabuverdianu', fr: 'Capverdien', it: 'Capoverdiano',
               es_eu: 'Caboverdiano', es_mx: 'Caboverdiano', pt_eu: 'Cabo-Verdiano', pt_br: 'Cabo-Verdiano',
               ru: 'Кабувердьяну', uk: 'Капвердійська креольська', ar: 'الكريولية الرأسخضراوية', he: 'קריאולית כף ורדה', sw: 'Kikabuverdianu' },
        pis: { en: 'Pijin', ja: 'ピジン語', ko: '솔로몬 피진어', zh: '所罗门皮金语', yue: '所羅門皮金語',
               vi: 'Tiếng Pijin', th: 'ภาษาพิจิน', id: 'Pijin', hi: 'पिजिन',
               de: 'Pijin', fr: 'Pijin', it: 'Pijin',
               es_eu: 'Pijín', es_mx: 'Pijín', pt_eu: 'Pijin', pt_br: 'Pijin',
               ru: 'Пиджин', uk: 'Піджин', ar: 'البيجين', he: 'פיג\'ין', sw: 'Kipijin' },
    };
    for (const code of Object.keys(ADDED4)) {
        for (const ui of Object.keys(ADDED4[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED4[code][ui];
            }
        }
    }
    // Audit Task 149 Batch 2/3 remaining: 5 more languages
    const ADDED5 = {
        rcf: { en: 'Réunion Creole', ja: 'レユニオン・クレオール', ko: '레위니옹 크레올어', zh: '留尼汪克里奥尔语', yue: '留尼汪克里奧爾語',
               vi: 'Tiếng Creole Réunion', th: 'ภาษาครีโอลเรอูนียง', id: 'Kreol Réunion', hi: 'रेयूनियन क्रियोल',
               de: 'Réunion-Kreolisch', fr: 'Créole réunionnais', it: 'Creolo riunionese',
               es_eu: 'Criollo reunionés', es_mx: 'Criollo reunionés', pt_eu: 'Crioulo reunionês', pt_br: 'Crioulo reunionês',
               ru: 'Реюньонский креольский', uk: 'Реюньйонська креольська', ar: 'الكريولية الريونيونية', he: 'קריאולית ראוניון', sw: 'Kikreol cha Reunion' },
        crs: { en: 'Seychellois Creole', ja: 'セーシェル・クレオール', ko: '세이셸 크레올어', zh: '塞舌尔克里奥尔语', yue: '塞舌爾克里奧爾語',
               vi: 'Tiếng Creole Seychelles', th: 'ภาษาครีโอลเซเชลส์', id: 'Kreol Seychelles', hi: 'सेशेल्स क्रियोल',
               de: 'Seychellen-Kreolisch', fr: 'Créole seychellois', it: 'Creolo seychellese',
               es_eu: 'Criollo seychellense', es_mx: 'Criollo seychellense', pt_eu: 'Crioulo seichelense', pt_br: 'Crioulo seichelense',
               ru: 'Сейшельский креольский', uk: 'Сейшельська креольська', ar: 'الكريولية السيشلية', he: 'קריאולית סיישל', sw: 'Kikreol cha Seychelles' },
        gcf: { en: 'Guadeloupean Creole', ja: 'グアドループ・クレオール', ko: '과들루프 크레올어', zh: '瓜德罗普克里奥尔语', yue: '瓜德羅普克里奧爾語',
               vi: 'Tiếng Creole Guadeloupe', th: 'ภาษาครีโอลกวาเดอลูป', id: 'Kreol Guadeloupe', hi: 'गुआडेलूप क्रियोल',
               de: 'Guadeloupe-Kreolisch', fr: 'Créole guadeloupéen', it: 'Creolo guadalupeño',
               es_eu: 'Criollo guadalupeño', es_mx: 'Criollo guadalupeño', pt_eu: 'Crioulo guadalupense', pt_br: 'Crioulo guadalupense',
               ru: 'Гваделупский креольский', uk: 'Гваделупська креольська', ar: 'الكريولية الغوادلوبية', he: 'קריאולית גוואדלופ', sw: 'Kikreol cha Guadeloupe' },
        tem: { en: 'Themne', ja: 'テムネ語', ko: '템네어', zh: '泰姆奈语', yue: '泰姆奈語',
               vi: 'Tiếng Themne', th: 'ภาษาเทมเน', id: 'Themne', hi: 'टेमने',
               de: 'Themne', fr: 'Themné', it: 'Themne',
               es_eu: 'Themne', es_mx: 'Themne', pt_eu: 'Themne', pt_br: 'Themne',
               ru: 'Темне', uk: 'Темне', ar: 'التمنية', he: 'תמנה', sw: 'Kithemne' },
        ses: { en: 'Koyraboro Senni', ja: 'コイラボロ・センニ語', ko: '코이라보로 센니어', zh: '科伊拉博罗森尼语', yue: '科伊拉博羅森尼語',
               vi: 'Tiếng Koyraboro Senni', th: 'ภาษาคอยราโบโรเซนนี', id: 'Koyraboro Senni', hi: 'कोयराबोरो सेन्नी',
               de: 'Koyraboro Senni', fr: 'Koyraboro senni', it: 'Koyraboro Senni',
               es_eu: 'Koyraboro senni', es_mx: 'Koyraboro senni', pt_eu: 'Koyraboro senni', pt_br: 'Koyraboro senni',
               ru: 'Койраборо-сенни', uk: 'Койраборо сенні', ar: 'الكويرابورو سنّي', he: 'קוירבורו סני', sw: 'Kikoyraboro Senni' },
    };
    for (const code of Object.keys(ADDED5)) {
        for (const ui of Object.keys(ADDED5[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED5[code][ui];
            }
        }
    }
    // Audit Task 142 (Tier 2): Hill Mari (mrj), Rohingya (rhg), Chittagonian (ctg)
    const ADDED6 = {
        mrj: { en: 'Hill Mari', ja: '西部マリ語', ko: '서부 마리어', zh: '西马里语', yue: '西馬里語',
               vi: 'Tiếng Mari Tây', th: 'ภาษามารีตะวันตก', id: 'Mari Pegunungan', hi: 'पहाड़ी मारी',
               de: 'Bergmari', fr: 'Mari des collines', it: 'Mari delle colline',
               es_eu: 'Mari occidental', es_mx: 'Mari occidental', pt_eu: 'Mari ocidental', pt_br: 'Mari ocidental',
               ru: 'Горномарийский', uk: 'Гірськомарійська', ar: 'المارية الجبلية', he: 'מארי הררית', sw: 'Kimari cha Milimani' },
        rhg: { en: 'Rohingya', ja: 'ロヒンギャ語', ko: '로힝야어', zh: '罗兴亚语', yue: '羅興亞語',
               vi: 'Tiếng Rohingya', th: 'ภาษาโรฮีนจา', id: 'Rohingya', hi: 'रोहिंग्या',
               de: 'Rohingya', fr: 'Rohingya', it: 'Rohingya',
               es_eu: 'Rohinyá', es_mx: 'Rohinyá', pt_eu: 'Rohingya', pt_br: 'Rohingya',
               ru: 'Рохинджа', uk: 'Рохінджа', ar: 'الروهينغية', he: 'רוהינגיה', sw: 'Kirohingya' },
        ctg: { en: 'Chittagonian', ja: 'チッタゴン語', ko: '치타공어', zh: '吉大港语', yue: '吉大港語',
               vi: 'Tiếng Chittagong', th: 'ภาษาจิตตะกอง', id: 'Chittagong', hi: 'चिट्टागोनी',
               de: 'Chittagonisch', fr: 'Chittagonien', it: 'Chittagoniano',
               es_eu: 'Chitagoniano', es_mx: 'Chitagoniano', pt_eu: 'Chitagoniano', pt_br: 'Chitagoniano',
               ru: 'Читтагонский', uk: 'Читтагонська', ar: 'الشيتاغونغية', he: 'צ׳יטגוניאנית', sw: 'Kichittagong' },
    };
    for (const code of Object.keys(ADDED6)) {
        for (const ui of Object.keys(ADDED6[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED6[code][ui];
            }
        }
    }
    // Audit Task 142 (Tier 2 optional): Itelmen (itl), Tundra Yukaghir (ykg)
    const ADDED7 = {
        itl: { en: 'Itelmen', ja: 'イテリメン語', ko: '이텔멘어', zh: '伊捷尔缅语', yue: '伊捷爾緬語',
               vi: 'Tiếng Itelmen', th: 'ภาษาอีเทลเมน', id: 'Itelmen', hi: 'इतेलमेन',
               de: 'Itelmenisch', fr: 'Itelmène', it: 'Itelmeno',
               es_eu: 'Itelmeno', es_mx: 'Itelmeno', pt_eu: 'Itelmeno', pt_br: 'Itelmeno',
               ru: 'Ительменский', uk: 'Ітельменська', ar: 'الإيتلمن', he: 'איטלמן', sw: 'Kiitelmen' },
        ykg: { en: 'Tundra Yukaghir', ja: 'ツンドラ・ユカギール語', ko: '툰드라 유카기르어', zh: '苔原尤卡吉尔语', yue: '苔原尤卡吉爾語',
               vi: 'Tiếng Yukaghir Lãnh Nguyên', th: 'ภาษายูคากีร์ทุนดรา', id: 'Yukaghir Tundra', hi: 'टुंड्रा युकागिर',
               de: 'Tundra-Jukagirisch', fr: 'Iukaguir de la toundra', it: 'Yukaghir della tundra',
               es_eu: 'Yucaguir de la tundra', es_mx: 'Yucaguir de la tundra', pt_eu: 'Yukaghir da tundra', pt_br: 'Yukaghir da tundra',
               ru: 'Тундренный юкагирский', uk: 'Тундровий юкагирський', ar: 'يوكاغيرية التندرا', he: 'יוקאגיר טונדרה', sw: 'Kiyukaghir cha Tundra' },
    };
    for (const code of Object.keys(ADDED7)) {
        for (const ui of Object.keys(ADDED7[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED7[code][ui];
            }
        }
    }
    // Pennsylvania German (pdc), Livonian (liv), Aleut (ale)
    const ADDED8 = {
        pdc: { en: 'Pennsylvania German', ja: 'ペンシルベニア・ドイツ語', ko: '펜실베이니아 독일어', zh: '宾夕法尼亚德语', yue: '賓夕法尼亞德語',
               vi: 'Tiếng Đức Pennsylvania', th: 'ภาษาเยอรมันเพนซิลเวเนีย', id: 'Jerman Pennsylvania', hi: 'पेंसिल्वेनिया जर्मन',
               de: 'Pennsylvaniadeutsch', fr: 'Allemand de Pennsylvanie', it: 'Tedesco di Pennsylvania',
               es_eu: 'Alemán de Pensilvania', es_mx: 'Alemán de Pensilvania', pt_eu: 'Alemão da Pensilvânia', pt_br: 'Alemão da Pensilvânia',
               ru: 'Пенсильванский немецкий', uk: 'Пенсильванська німецька', ar: 'الألمانية البنسلفانية', he: 'גרמנית פנסילבניה', sw: 'Kijerumani cha Pennsylvania' },
        liv: { en: 'Livonian', ja: 'リーヴ語', ko: '리보니아어', zh: '利沃尼亚语', yue: '利沃尼亞語',
               vi: 'Tiếng Liv', th: 'ภาษาลิโวเนีย', id: 'Liv', hi: 'लिवोनियन',
               de: 'Livisch', fr: 'Live', it: 'Livone',
               es_eu: 'Livonio', es_mx: 'Livonio', pt_eu: 'Livónio', pt_br: 'Livônio',
               ru: 'Ливский', uk: 'Лівська', ar: 'الليفية', he: 'ליבונית', sw: 'Kiliv' },
        ale: { en: 'Aleut', ja: 'アリュート語', ko: '알류트어', zh: '阿留申语', yue: '阿留申語',
               vi: 'Tiếng Aleut', th: 'ภาษาอาเลอุต', id: 'Aleut', hi: 'अलेउत',
               de: 'Aleutisch', fr: 'Aléoute', it: 'Aleutino',
               es_eu: 'Aleutiano', es_mx: 'Aleutiano', pt_eu: 'Aleúte', pt_br: 'Aleúte',
               ru: 'Алеутский', uk: 'Алеутська', ar: 'الأليوتية', he: 'אלאוטית', sw: 'Kialeut' },
    };
    for (const code of Object.keys(ADDED8)) {
        for (const ui of Object.keys(ADDED8[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED8[code][ui];
            }
        }
    }
    // Corsican (co), Ligurian (lij), Arpitan (frp), Limburgish (li), Shipibo-Conibo (shp)
    const ADDED9 = {
        co: { en: 'Corsican', ja: 'コルシカ語', ko: '코르시카어', zh: '科西嘉语', yue: '科西嘉語',
              vi: 'Tiếng Corse', th: 'ภาษาคอร์ซิกา', id: 'Korsika', hi: 'कोर्सीकन',
              de: 'Korsisch', fr: 'Corse', it: 'Corso',
              es_eu: 'Corso', es_mx: 'Corso', pt_eu: 'Corso', pt_br: 'Corso',
              ru: 'Корсиканский', uk: 'Корсиканська', ar: 'الكورسيكية', he: 'קורסיקנית', sw: 'Kikorsika' },
        lij: { en: 'Ligurian', ja: 'リグーリア語', ko: '리구리아어', zh: '利古里亚语', yue: '利古里亞語',
               vi: 'Tiếng Liguria', th: 'ภาษาลิกูเรีย', id: 'Liguria', hi: 'लिगुरियन',
               de: 'Ligurisch', fr: 'Ligurien', it: 'Ligure',
               es_eu: 'Ligur', es_mx: 'Ligur', pt_eu: 'Lígure', pt_br: 'Lígure',
               ru: 'Лигурский', uk: 'Лігурська', ar: 'الليغورية', he: 'ליגורית', sw: 'Kiliguria' },
        frp: { en: 'Arpitan', ja: 'アルピタン語', ko: '아르피탄어', zh: '阿尔皮坦语', yue: '阿爾皮坦語',
               vi: 'Tiếng Arpitan', th: 'ภาษาอาร์ปีตัน', id: 'Arpitan', hi: 'अर्पीतान',
               de: 'Frankoprovenzalisch', fr: 'Arpitan', it: 'Arpitano',
               es_eu: 'Arpitano', es_mx: 'Arpitano', pt_eu: 'Arpitano', pt_br: 'Arpitano',
               ru: 'Арпитанский', uk: 'Арпітанська', ar: 'الأربيتانية', he: 'ארפיטנית', sw: 'Kiarpitan' },
        li: { en: 'Limburgish', ja: 'リンブルフ語', ko: '림뷔르흐어', zh: '林堡语', yue: '林堡語',
              vi: 'Tiếng Limburg', th: 'ภาษาลิมเบิร์ก', id: 'Limburg', hi: 'लिमबर्गिश',
              de: 'Limburgisch', fr: 'Limbourgeois', it: 'Limburghese',
              es_eu: 'Limburgués', es_mx: 'Limburgués', pt_eu: 'Limburguês', pt_br: 'Limburguês',
              ru: 'Лимбургский', uk: 'Лімбурзька', ar: 'الليمبورغية', he: 'לימבורגית', sw: 'Kilimburg' },
        shp: { en: 'Shipibo-Conibo', ja: 'シピボ・コニボ語', ko: '시피보-코니보어', zh: '希皮博-科尼博语', yue: '希皮博-科尼博語',
               vi: 'Tiếng Shipibo-Conibo', th: 'ภาษาชิปีโบ-โคนีโบ', id: 'Shipibo-Conibo', hi: 'शिपीबो-कोनीबो',
               de: 'Shipibo-Conibo', fr: 'Shipibo-Conibo', it: 'Shipibo-Conibo',
               es_eu: 'Shipibo-Conibo', es_mx: 'Shipibo-Conibo', pt_eu: 'Shipibo-Conibo', pt_br: 'Shipibo-Conibo',
               ru: 'Шипибо-конибо', uk: 'Шипібо-коніво', ar: 'الشيبيبو-كونيبو', he: 'שיפיבו-קוניבו', sw: 'Kishipibo-Conibo' },
    };
    for (const code of Object.keys(ADDED9)) {
        for (const ui of Object.keys(ADDED9[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED9[code][ui];
            }
        }
    }
    // Kirundi (rn), Swiss German (gsw), Sukuma (suk) — high-speaker family-coverage gaps.
    const ADDED10 = {
        rn:  { en: 'Kirundi', ja: 'キルンディ語', ko: '키룬디어', zh: '基隆迪语', yue: '基隆迪語',
               vi: 'Tiếng Kirundi', th: 'ภาษาคีรุนดี', id: 'Kirundi', hi: 'किरुंदी',
               de: 'Kirundi', fr: 'Kirundi', it: 'Kirundi',
               es_eu: 'Kirundi', es_mx: 'Kirundi', pt_eu: 'Quirundi', pt_br: 'Quirundi',
               ru: 'Рунди', uk: 'Рунді', ar: 'الكيروندية', he: 'קירונדי', sw: 'Kirundi' },
        gsw: { en: 'Swiss German', ja: 'スイス・ドイツ語', ko: '스위스 독일어', zh: '瑞士德语', yue: '瑞士德語',
               vi: 'Tiếng Đức Thụy Sĩ', th: 'ภาษาเยอรมันสวิส', id: 'Jerman Swiss', hi: 'स्विस जर्मन',
               de: 'Schweizerdeutsch', fr: 'Suisse alémanique', it: 'Tedesco svizzero',
               es_eu: 'Alemán suizo', es_mx: 'Alemán suizo', pt_eu: 'Alemão suíço', pt_br: 'Alemão suíço',
               ru: 'Швейцарский немецкий', uk: 'Швейцарська німецька', ar: 'الألمانية السويسرية', he: 'גרמנית שוויצרית', sw: 'Kijerumani cha Uswisi' },
        suk: { en: 'Sukuma', ja: 'スクマ語', ko: '수쿠마어', zh: '苏库马语', yue: '蘇庫馬語',
               vi: 'Tiếng Sukuma', th: 'ภาษาซูคูมา', id: 'Sukuma', hi: 'सुकुमा',
               de: 'Sukuma', fr: 'Sukuma', it: 'Sukuma',
               es_eu: 'Sukuma', es_mx: 'Sukuma', pt_eu: 'Sucumá', pt_br: 'Sucumá',
               ru: 'Сукума', uk: 'Сукума', ar: 'السوكوما', he: 'סוקומה', sw: 'Kisukuma' },
    };
    for (const code of Object.keys(ADDED10)) {
        for (const ui of Object.keys(ADDED10[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED10[code][ui];
            }
        }
    }
    // Zarma (dje), Meru (mer) — Niger + Kenya gaps.
    const ADDED11 = {
        dje: { en: 'Zarma', ja: 'ザルマ語', ko: '자르마어', zh: '扎尔马语', yue: '扎爾馬語',
               vi: 'Tiếng Zarma', th: 'ภาษาซาร์มา', id: 'Zarma', hi: 'ज़ार्मा',
               de: 'Zarma', fr: 'Zarma', it: 'Zarma',
               es_eu: 'Zarma', es_mx: 'Zarma', pt_eu: 'Zarma', pt_br: 'Zarma',
               ru: 'Зарма', uk: 'Зарма', ar: 'الزرما', he: 'זרמה', sw: 'Kizarma' },
        mer: { en: 'Meru', ja: 'メル語', ko: '메루어', zh: '梅鲁语', yue: '梅魯語',
               vi: 'Tiếng Meru', th: 'ภาษาเมรู', id: 'Meru', hi: 'मेरू',
               de: 'Meru', fr: 'Méru', it: 'Meru',
               es_eu: 'Meru', es_mx: 'Meru', pt_eu: 'Meru', pt_br: 'Meru',
               ru: 'Меру', uk: 'Меру', ar: 'الميرو', he: 'מרו', sw: 'Kimeru' },
    };
    for (const code of Object.keys(ADDED11)) {
        for (const ui of Object.keys(ADDED11[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED11[code][ui];
            }
        }
    }
    // Nyamwezi (nym), Embu (ebu), Limbu (lif) — Tanzania + Kenya + Nepal Bantu/Sino-Tibetan gaps.
    const ADDED12 = {
        nym: { en: 'Nyamwezi', ja: 'ニャムウェジ語', ko: '냠웨지어', zh: '尼亚姆韦齐语', yue: '尼亞姆韋齊語',
               vi: 'Tiếng Nyamwezi', th: 'ภาษาเนียมเวซี', id: 'Nyamwezi', hi: 'न्यामवेज़ी',
               de: 'Nyamwezi', fr: 'Nyamwezi', it: 'Nyamwezi',
               es_eu: 'Nyamwezi', es_mx: 'Nyamwezi', pt_eu: 'Nyamwezi', pt_br: 'Nyamwezi',
               ru: 'Ньямвези', uk: 'Ньямвезі', ar: 'النيامويزية', he: 'ניאמווזי', sw: 'Kinyamwezi' },
        ebu: { en: 'Embu', ja: 'エンブ語', ko: '엠부어', zh: '恩布语', yue: '恩布語',
               vi: 'Tiếng Embu', th: 'ภาษาเอ็มบู', id: 'Embu', hi: 'एम्बु',
               de: 'Embu', fr: 'Embu', it: 'Embu',
               es_eu: 'Embu', es_mx: 'Embu', pt_eu: 'Embu', pt_br: 'Embu',
               ru: 'Эмбу', uk: 'Ембу', ar: 'الإمبو', he: 'אמבו', sw: 'Kiembu' },
        lif: { en: 'Limbu', ja: 'リンブー語', ko: '림부어', zh: '林布语', yue: '林布語',
               vi: 'Tiếng Limbu', th: 'ภาษาลิมบู', id: 'Limbu', hi: 'लिम्बू',
               de: 'Limbu', fr: 'Limbou', it: 'Limbu',
               es_eu: 'Limbu', es_mx: 'Limbu', pt_eu: 'Limbu', pt_br: 'Limbu',
               ru: 'Лимбу', uk: 'Лімбу', ar: 'اللمبو', he: 'לימבו', sw: 'Kilimbu' },
    };
    for (const code of Object.keys(ADDED12)) {
        for (const ui of Object.keys(ADDED12[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED12[code][ui];
            }
        }
    }
    // Northern Ndebele (nd), Kuanyama (kj), Luvale (lue) — Southern African Bantu.
    const ADDED13 = {
        nd:  { en: 'Northern Ndebele', ja: '北ンデベレ語', ko: '북부 응데벨레어', zh: '北恩德贝勒语', yue: '北恩德貝勒語',
               vi: 'Tiếng Ndebele Bắc', th: 'ภาษาเอ็นเดเบเลเหนือ', id: 'Ndebele Utara', hi: 'उत्तरी न्डेबेले',
               de: 'Nord-Ndebele', fr: 'Ndébélé du Nord', it: 'Ndebele del Nord',
               es_eu: 'Ndebele del Norte', es_mx: 'Ndebele del Norte', pt_eu: 'Ndebele do Norte', pt_br: 'Ndebele do Norte',
               ru: 'Северный ндебеле', uk: 'Північна ндебеле', ar: 'الندبيلية الشمالية', he: 'נדבלה צפונית', sw: 'Kindebele cha Kaskazini' },
        kj:  { en: 'Kuanyama', ja: 'クワニヤマ語', ko: '콰니야마어', zh: '夸尼亚马语', yue: '誇尼亞馬語',
               vi: 'Tiếng Kuanyama', th: 'ภาษาควานยามา', id: 'Kuanyama', hi: 'कुआन्यामा',
               de: 'Kwanyama', fr: 'Kwanyama', it: 'Kuanyama',
               es_eu: 'Kuanyama', es_mx: 'Kuanyama', pt_eu: 'Cuanhama', pt_br: 'Cuanhama',
               ru: 'Кваньяма', uk: 'Кваньяма', ar: 'الكوانياما', he: 'קוואניאמה', sw: 'Kikwanyama' },
        lue: { en: 'Luvale', ja: 'ルヴァレ語', ko: '루발레어', zh: '卢瓦莱语', yue: '盧瓦萊語',
               vi: 'Tiếng Luvale', th: 'ภาษาลูวาเล', id: 'Luvale', hi: 'लुवाले',
               de: 'Luvale', fr: 'Luvale', it: 'Luvale',
               es_eu: 'Luvale', es_mx: 'Luvale', pt_eu: 'Luvale', pt_br: 'Luvale',
               ru: 'Луваль', uk: 'Лувале', ar: 'اللوفالية', he: 'לובלה', sw: 'Kiluvale' },
    };
    for (const code of Object.keys(ADDED13)) {
        for (const ui of Object.keys(ADDED13[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED13[code][ui];
            }
        }
    }
    // Ibibio (ibb), Kabiye (kbp), Kurukh (kru), Braj Bhasha (bra) — Nigeria + Togo + India.
    const ADDED14 = {
        ibb: { en: 'Ibibio', ja: 'イビビオ語', ko: '이비비오어', zh: '伊比比奥语', yue: '伊比比奧語',
               vi: 'Tiếng Ibibio', th: 'ภาษาอีบีบีโอ', id: 'Ibibio', hi: 'इबिबियो',
               de: 'Ibibio', fr: 'Ibibio', it: 'Ibibio',
               es_eu: 'Ibibio', es_mx: 'Ibibio', pt_eu: 'Ibibio', pt_br: 'Ibibio',
               ru: 'Ибибио', uk: 'Ібібіо', ar: 'الإيبيبيو', he: 'איביביו', sw: 'Kiibibio' },
        kbp: { en: 'Kabiye', ja: 'カビエ語', ko: '카비예어', zh: '卡比耶语', yue: '卡比耶語',
               vi: 'Tiếng Kabiyè', th: 'ภาษากาบีเย', id: 'Kabiyè', hi: 'काबीये',
               de: 'Kabiye', fr: 'Kabiyè', it: 'Kabiyè',
               es_eu: 'Kabiyé', es_mx: 'Kabiyé', pt_eu: 'Cabiê', pt_br: 'Cabiê',
               ru: 'Кабийе', uk: 'Кабіє', ar: 'الكابية', he: 'קביה', sw: 'Kikabiye' },
        kru: { en: 'Kurukh', ja: 'クルク語', ko: '쿠루크어', zh: '库鲁克语', yue: '庫魯克語',
               vi: 'Tiếng Kurukh', th: 'ภาษากุรุข', id: 'Kurukh', hi: 'कुरुख़',
               de: 'Kurukh', fr: 'Kurukh', it: 'Kurukh',
               es_eu: 'Kurukh', es_mx: 'Kurukh', pt_eu: 'Kurukh', pt_br: 'Kurukh',
               ru: 'Курух', uk: 'Курух', ar: 'الكوروخية', he: 'קורוך', sw: 'Kikurukh' },
        bra: { en: 'Braj Bhasha', ja: 'ブラジ・バーシャ', ko: '브라지 바샤', zh: '布拉吉语', yue: '布拉吉語',
               vi: 'Tiếng Braj', th: 'ภาษาพรัช', id: 'Braj Bhasha', hi: 'ब्रज भाषा',
               de: 'Braj-Bhasha', fr: 'Braj bhasha', it: 'Braj bhasha',
               es_eu: 'Braj bhasha', es_mx: 'Braj bhasha', pt_eu: 'Braj-bhasha', pt_br: 'Braj-bhasha',
               ru: 'Браджа-бхаша', uk: 'Браджа-бгаша', ar: 'البراج بهاشا', he: 'בראג׳ בהאשה', sw: 'Braj Bhasha' },
    };
    for (const code of Object.keys(ADDED14)) {
        for (const ui of Object.keys(ADDED14[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED14[code][ui];
            }
        }
    }
    // Mi'kmaq (mic), Asháninka (cni), Páez (pbb) — Algic + Arawakan + Colombia isolate.
    const ADDED15 = {
        mic: { en: "Mi'kmaq", ja: 'ミクマク語', ko: '미크마크어', zh: '米克马克语', yue: '米克馬克語',
               vi: "Tiếng Mi'kmaq", th: 'ภาษามิคมัก', id: "Mi'kmaq", hi: 'मिक्माक',
               de: "Mi'kmaq", fr: 'Mi’gmaq', it: "Mi'kmaq",
               es_eu: "Mi'kmaq", es_mx: "Mi'kmaq", pt_eu: "Mi'kmaq", pt_br: "Mi'kmaq",
               ru: 'Микмак', uk: 'Мікмак', ar: 'الميكماك', he: 'מיקמאק', sw: "Mi'kmaq" },
        cni: { en: 'Asháninka', ja: 'アシャニンカ語', ko: '아샤닌카어', zh: '阿沙宁卡语', yue: '阿沙寧卡語',
               vi: 'Tiếng Asháninka', th: 'ภาษาอาชานินกา', id: 'Asháninka', hi: 'आशानिंका',
               de: 'Asháninka', fr: 'Asháninka', it: 'Asháninka',
               es_eu: 'Asháninka', es_mx: 'Asháninka', pt_eu: 'Axaninca', pt_br: 'Axaninca',
               ru: 'Ашанинка', uk: 'Ашанінка', ar: 'الأشانينكا', he: 'אשנינקה', sw: 'Asháninka' },
        pbb: { en: 'Páez', ja: 'パエス語', ko: '파에스어', zh: '帕埃斯语', yue: '帕埃斯語',
               vi: 'Tiếng Páez', th: 'ภาษาปาเอซ', id: 'Páez', hi: 'पाएज़',
               de: 'Páez', fr: 'Páez', it: 'Páez',
               es_eu: 'Páez (nasa yuwe)', es_mx: 'Páez (nasa yuwe)', pt_eu: 'Páez', pt_br: 'Páez',
               ru: 'Паэс (наса юве)', uk: 'Паес (наса юве)', ar: 'الباييث', he: 'פאאס', sw: 'Páez' },
    };
    for (const code of Object.keys(ADDED15)) {
        for (const ui of Object.keys(ADDED15[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED15[code][ui];
            }
        }
    }
    // Muscogee (mus), Mongo (lol), Nagamese (nag) — Native American + DRC + NE India.
    const ADDED16 = {
        mus: { en: 'Muscogee', ja: 'マスコギ語', ko: '머스코기어', zh: '马斯科吉语', yue: '馬斯科吉語',
               vi: 'Tiếng Muscogee', th: 'ภาษามัสโคจี', id: 'Muscogee', hi: 'मस्कोगी',
               de: 'Muskogee', fr: 'Muscogee', it: 'Muscogee',
               es_eu: 'Muscogui', es_mx: 'Muscogui', pt_eu: 'Muscogui', pt_br: 'Muscogui',
               ru: 'Маскоги', uk: 'Маскогі', ar: 'الماسكوكية', he: 'מסקוגי', sw: 'Muscogee' },
        lol: { en: 'Mongo', ja: 'モンゴ語', ko: '몽고어', zh: '蒙戈语', yue: '蒙戈語',
               vi: 'Tiếng Mongo', th: 'ภาษามองโก', id: 'Mongo', hi: 'मोंगो',
               de: 'Mongo', fr: 'Mongo', it: 'Mongo',
               es_eu: 'Mongo', es_mx: 'Mongo', pt_eu: 'Mongo', pt_br: 'Mongo',
               ru: 'Монго', uk: 'Монго', ar: 'المونغو', he: 'מונגו', sw: 'Kimongo' },
        nag: { en: 'Nagamese', ja: 'ナガミーズ語', ko: '나가미스어', zh: '纳加米斯语', yue: '納加米斯語',
               vi: 'Tiếng Nagamese', th: 'ภาษานากามีส', id: 'Nagamese', hi: 'नागामीज़',
               de: 'Nagamesisch', fr: 'Nagamese', it: 'Nagamese',
               es_eu: 'Nagamés', es_mx: 'Nagamés', pt_eu: 'Nagamês', pt_br: 'Nagamês',
               ru: 'Нагамезе', uk: 'Нагамезе', ar: 'الناغاميسية', he: 'נגאמזית', sw: 'Nagamese' },
    };
    for (const code of Object.keys(ADDED16)) {
        for (const ui of Object.keys(ADDED16[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED16[code][ui];
            }
        }
    }
    // Rusyn (rue), Kaqchikel (cak), Kumyk (kum) — East Slavic + Mayan + Caucasus Turkic.
    const ADDED17 = {
        rue: { en: 'Rusyn', ja: 'ルシン語', ko: '루신어', zh: '卢森尼亚语', yue: '盧森尼亞語',
               vi: 'Tiếng Rusyn', th: 'ภาษารูซิน', id: 'Rusyn', hi: 'रुसिन',
               de: 'Russinisch', fr: 'Roussinien', it: 'Ruteno',
               es_eu: 'Rusyn', es_mx: 'Rusyn', pt_eu: 'Rusyn', pt_br: 'Rusyn',
               ru: 'Русинский', uk: 'Русинська', ar: 'الروسينية', he: 'רוסינית', sw: 'Kirusyn' },
        cak: { en: 'Kaqchikel', ja: 'カクチケル語', ko: '카크치켈어', zh: '卡克奇克尔语', yue: '卡克奇克爾語',
               vi: 'Tiếng Kaqchikel', th: 'ภาษากัคชิเกล', id: 'Kaqchikel', hi: 'काकचिकेल',
               de: 'Kaqchikel', fr: 'Cakchiquel', it: 'Kaqchikel',
               es_eu: 'Kaqchikel', es_mx: 'Kaqchikel', pt_eu: 'Cakchiquel', pt_br: 'Cakchiquel',
               ru: 'Какчикель', uk: 'Какчикель', ar: 'الكاكشيكلية', he: 'קקצ׳יקל', sw: 'Kaqchikel' },
        kum: { en: 'Kumyk', ja: 'クムク語', ko: '쿠믹어', zh: '库梅克语', yue: '庫梅克語',
               vi: 'Tiếng Kumyk', th: 'ภาษาคูมีก', id: 'Kumyk', hi: 'कुमिक',
               de: 'Kumükisch', fr: 'Koumyk', it: 'Kumyk',
               es_eu: 'Kumyk', es_mx: 'Kumyk', pt_eu: 'Cumique', pt_br: 'Cumique',
               ru: 'Кумыкский', uk: 'Кумицька', ar: 'القومانية', he: 'קומיקית', sw: 'Kikumyk' },
    };
    for (const code of Object.keys(ADDED17)) {
        for (const ui of Object.keys(ADDED17[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED17[code][ui];
            }
        }
    }
    // Hakha Chin (cnh), Susu (sus), Samogitian (sgs) — Sino-Tibetan + Mande + Baltic.
    const ADDED18 = {
        cnh: { en: 'Hakha Chin', ja: 'ハカ・チン語', ko: '하카 친어', zh: '哈卡钦语', yue: '哈卡欽語',
               vi: 'Tiếng Hakha Chin', th: 'ภาษาฮากาชิน', id: 'Hakha Chin', hi: 'हाखा चिन',
               de: 'Hakha-Chin', fr: 'Hakha tchin', it: 'Hakha Chin',
               es_eu: 'Chin de Hakha', es_mx: 'Chin de Hakha', pt_eu: 'Chin de Hakha', pt_br: 'Chin de Hakha',
               ru: 'Хакха-чин', uk: 'Хакха-чин', ar: 'الشين هاخا', he: 'הקה צ׳ין', sw: 'Hakha Chin' },
        sus: { en: 'Susu', ja: 'スース語', ko: '수수어', zh: '苏苏语', yue: '蘇蘇語',
               vi: 'Tiếng Susu', th: 'ภาษาซูซู', id: 'Susu', hi: 'सुसु',
               de: 'Susu', fr: 'Soussou', it: 'Susu',
               es_eu: 'Susu', es_mx: 'Susu', pt_eu: 'Sosso', pt_br: 'Sosso',
               ru: 'Сусу', uk: 'Сусу', ar: 'السوسو', he: 'סוסו', sw: 'Kisusu' },
        sgs: { en: 'Samogitian', ja: 'サモギティア語', ko: '사모기티아어', zh: '萨莫吉提亚语', yue: '薩莫吉提亞語',
               vi: 'Tiếng Samogiti', th: 'ภาษาซาโมจิเทีย', id: 'Samogitian', hi: 'समोगिटियन',
               de: 'Schemaitisch', fr: 'Samogitien', it: 'Samogitico',
               es_eu: 'Samogitio', es_mx: 'Samogitio', pt_eu: 'Samogício', pt_br: 'Samogício',
               ru: 'Жемайтский', uk: 'Жемайтська', ar: 'السامويتية', he: 'ז׳מאיטית', sw: 'Kisamogitian' },
    };
    for (const code of Object.keys(ADDED18)) {
        for (const ui of Object.keys(ADDED18[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED18[code][ui];
            }
        }
    }
    // Lomwe (ngl), Gayo (gay), Kosraean (kos) — Mozambique Bantu + Sumatra Austronesian + Micronesia.
    const ADDED19 = {
        ngl: { en: 'Lomwe', ja: 'ロムウェ語', ko: '로무에어', zh: '洛姆韦语', yue: '洛姆韋語',
               vi: 'Tiếng Lomwe', th: 'ภาษาโลมเว', id: 'Lomwe', hi: 'लोम्वे',
               de: 'Lomwe', fr: 'Lomwé', it: 'Lomwe',
               es_eu: 'Lomwe', es_mx: 'Lomwe', pt_eu: 'Lomué', pt_br: 'Lomué',
               ru: 'Ломве', uk: 'Ломве', ar: 'اللومويه', he: 'לומבה', sw: 'Kilomwe' },
        gay: { en: 'Gayo', ja: 'ガヨ語', ko: '가요어', zh: '加约语', yue: '加約語',
               vi: 'Tiếng Gayo', th: 'ภาษากาโย', id: 'Gayo', hi: 'गायो',
               de: 'Gayo', fr: 'Gayo', it: 'Gayo',
               es_eu: 'Gayo', es_mx: 'Gayo', pt_eu: 'Gayo', pt_br: 'Gayo',
               ru: 'Гайо', uk: 'Гайо', ar: 'الغايو', he: 'גאיו', sw: 'Gayo' },
        kos: { en: 'Kosraean', ja: 'コスラエ語', ko: '코스라에어', zh: '科斯拉伊语', yue: '科斯拉伊語',
               vi: 'Tiếng Kosrae', th: 'ภาษาคอสแร', id: 'Kosrae', hi: 'कोस्राई',
               de: 'Kosraeisch', fr: 'Kosraéen', it: 'Kosraeano',
               es_eu: 'Kosraeano', es_mx: 'Kosraeano', pt_eu: 'Kosraeano', pt_br: 'Kosraeano',
               ru: 'Косраэ', uk: 'Косрае', ar: 'الكوسرايية', he: 'קוסראית', sw: 'Kikosrae' },
    };
    for (const code of Object.keys(ADDED19)) {
        for (const ui of Object.keys(ADDED19[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED19[code][ui];
            }
        }
    }
    // Makonde (kde), Nanai (gld), Shuar (jiv) — Bantu + Tungusic + Jivaroan.
    const ADDED20 = {
        kde: { en: 'Makonde', ja: 'マコンデ語', ko: '마콘데어', zh: '马孔德语', yue: '馬孔德語',
               vi: 'Tiếng Makonde', th: 'ภาษามาคอนเด', id: 'Makonde', hi: 'माकोंडे',
               de: 'Makonde', fr: 'Makondé', it: 'Makonde',
               es_eu: 'Makonde', es_mx: 'Makonde', pt_eu: 'Maconde', pt_br: 'Maconde',
               ru: 'Маконде', uk: 'Маконде', ar: 'الماكوندي', he: 'מקונדה', sw: 'Kimakonde' },
        gld: { en: 'Nanai', ja: 'ナナイ語', ko: '나나이어', zh: '那乃语', yue: '那乃語',
               vi: 'Tiếng Nanai', th: 'ภาษานานาย', id: 'Nanai', hi: 'नानाई',
               de: 'Nanaiisch', fr: 'Nanaï', it: 'Nanai',
               es_eu: 'Nanai', es_mx: 'Nanai', pt_eu: 'Nanai', pt_br: 'Nanai',
               ru: 'Нанайский', uk: 'Нанайська', ar: 'الناناي', he: 'נאנאית', sw: 'Kinanai' },
        jiv: { en: 'Shuar', ja: 'シュアル語', ko: '슈아르어', zh: '舒阿尔语', yue: '舒阿爾語',
               vi: 'Tiếng Shuar', th: 'ภาษาชูอาร์', id: 'Shuar', hi: 'शुआर',
               de: 'Shuar', fr: 'Shuar', it: 'Shuar',
               es_eu: 'Shuar', es_mx: 'Shuar', pt_eu: 'Xuar', pt_br: 'Xuar',
               ru: 'Шуар', uk: 'Шуар', ar: 'الشوار', he: 'שואר', sw: 'Kishuar' },
    };
    for (const code of Object.keys(ADDED20)) {
        for (const ui of Object.keys(ADDED20[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED20[code][ui];
            }
        }
    }
    // Sena (seh), Urhobo (urh), Rotuman (rtm) — Mozambique Bantu + Niger Delta Edoid + Pacific outlier.
    const ADDED21 = {
        seh: { en: 'Sena', ja: 'セナ語', ko: '세나어', zh: '塞纳语', yue: '塞納語',
               vi: 'Tiếng Sena', th: 'ภาษาเซนา', id: 'Sena', hi: 'सेना',
               de: 'Sena', fr: 'Sena', it: 'Sena',
               es_eu: 'Sena', es_mx: 'Sena', pt_eu: 'Sena', pt_br: 'Sena',
               ru: 'Сена', uk: 'Сена', ar: 'السينا', he: 'סנה', sw: 'Kisena' },
        urh: { en: 'Urhobo', ja: 'ウルホボ語', ko: '우르호보어', zh: '乌尔霍博语', yue: '烏爾霍博語',
               vi: 'Tiếng Urhobo', th: 'ภาษาอูร์โฮโบ', id: 'Urhobo', hi: 'उर्होबो',
               de: 'Urhobo', fr: 'Urhobo', it: 'Urhobo',
               es_eu: 'Urhobo', es_mx: 'Urhobo', pt_eu: 'Urhobo', pt_br: 'Urhobo',
               ru: 'Урхобо', uk: 'Урхобо', ar: 'الأورهوبو', he: 'אורהובו', sw: 'Kiurhobo' },
        rtm: { en: 'Rotuman', ja: 'ロツマ語', ko: '로투마어', zh: '罗图马语', yue: '羅圖馬語',
               vi: 'Tiếng Rotuma', th: 'ภาษาโรทูมา', id: 'Rotuma', hi: 'रोटूमा',
               de: 'Rotumanisch', fr: 'Rotuman', it: 'Rotumano',
               es_eu: 'Rotumano', es_mx: 'Rotumano', pt_eu: 'Rotumano', pt_br: 'Rotumano',
               ru: 'Ротуманский', uk: 'Ротуманська', ar: 'الروتومانية', he: 'רוטומאנית', sw: 'Kirotuma' },
    };
    for (const code of Object.keys(ADDED21)) {
        for (const ui of Object.keys(ADDED21[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED21[code][ui];
            }
        }
    }
    // Adangme (ada), Nganasan (nio), Koyukon (koy) — Ghana Kwa + Russian Arctic + Alaska Athabaskan.
    const ADDED22 = {
        ada: { en: 'Adangme', ja: 'アダンメ語', ko: '아당메어', zh: '阿当梅语', yue: '阿當梅語',
               vi: 'Tiếng Adangme', th: 'ภาษาอาดังเม', id: 'Adangme', hi: 'आदांगमे',
               de: 'Adangme', fr: 'Adangme', it: 'Adangme',
               es_eu: 'Adangme', es_mx: 'Adangme', pt_eu: 'Adangme', pt_br: 'Adangme',
               ru: 'Адангме', uk: 'Адангме', ar: 'الأدانغمي', he: 'אדנגמה', sw: 'Kiadangme' },
        nio: { en: 'Nganasan', ja: 'ヌガナサン語', ko: '응가나산어', zh: '恩加纳桑语', yue: '恩加納桑語',
               vi: 'Tiếng Nganasan', th: 'ภาษางานาซัน', id: 'Nganasan', hi: 'न्गानासान',
               de: 'Nganasanisch', fr: 'Nganassane', it: 'Nganasan',
               es_eu: 'Nganasán', es_mx: 'Nganasán', pt_eu: 'Nganassano', pt_br: 'Nganassano',
               ru: 'Нганасанский', uk: 'Нганасанська', ar: 'النغاناسانية', he: 'נגנסנית', sw: 'Kinganasan' },
        koy: { en: 'Koyukon', ja: 'コユコン語', ko: '코유콘어', zh: '科尤孔语', yue: '科尤孔語',
               vi: 'Tiếng Koyukon', th: 'ภาษาคอยูกอน', id: 'Koyukon', hi: 'कोयूकोन',
               de: 'Koyukon', fr: 'Koyukon', it: 'Koyukon',
               es_eu: 'Koyukon', es_mx: 'Koyukon', pt_eu: 'Koyukon', pt_br: 'Koyukon',
               ru: 'Коюкон', uk: 'Коюкон', ar: 'الكويوكون', he: 'קויוקון', sw: 'Kikoyukon' },
    };
    for (const code of Object.keys(ADDED22)) {
        for (const ui of Object.keys(ADDED22[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED22[code][ui];
            }
        }
    }
    // Kölsch (ksh), Ixil (ixl), Khams Tibetan (khg) — Cologne Germanic + Guatemala Mayan + East Tibet.
    const ADDED23 = {
        ksh: { en: 'Kölsch', ja: 'ケルシュ語', ko: '쾰슈어', zh: '科隆方言', yue: '科隆方言',
               vi: 'Tiếng Kölsch', th: 'ภาษาเคิลช์', id: 'Kölsch', hi: 'कोलोनिश',
               de: 'Kölsch', fr: 'Cologné', it: 'Kölsch',
               es_eu: 'Colonio', es_mx: 'Colonio', pt_eu: 'Colónio', pt_br: 'Colônio',
               ru: 'Кёльнский', uk: 'Кельнський', ar: 'الكولشية', he: 'קלשית', sw: 'Kikölsch' },
        ixl: { en: 'Ixil', ja: 'イシル語', ko: '이실어', zh: '伊希尔语', yue: '伊希爾語',
               vi: 'Tiếng Ixil', th: 'ภาษาอิชิล', id: 'Ixil', hi: 'इशिल',
               de: 'Ixil', fr: 'Ixil', it: 'Ixil',
               es_eu: 'Ixil', es_mx: 'Ixil', pt_eu: 'Ixil', pt_br: 'Ixil',
               ru: 'Иксиль', uk: 'Ішіль', ar: 'الإكسيل', he: 'איקסיל', sw: 'Ixil' },
        khg: { en: 'Khams Tibetan', ja: 'カム・チベット語', ko: '캄 티베트어', zh: '康巴藏语', yue: '康巴藏語',
               vi: 'Tiếng Tạng Khams', th: 'ภาษาคาม', id: 'Tibet Khams', hi: 'खाम्स तिब्बती',
               de: 'Khams-Tibetisch', fr: 'Tibétain Khams', it: 'Tibetano Kham',
               es_eu: 'Tibetano de Kham', es_mx: 'Tibetano de Kham', pt_eu: 'Tibetano Khams', pt_br: 'Tibetano Khams',
               ru: 'Хамский тибетский', uk: 'Хамська тибетська', ar: 'تبتية خام', he: 'טיבטית חאמס', sw: 'Kitibet cha Khams' },
    };
    for (const code of Object.keys(ADDED23)) {
        for (const ui of Object.keys(ADDED23[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED23[code][ui];
            }
        }
    }
    // Adi (adi), Shambala (ksb), Aghem (agq) — NE India Tani + Tanzania Bantu + Cameroon Grassfields.
    const ADDED24 = {
        adi: { en: 'Adi', ja: 'アディ語', ko: '아디어', zh: '阿迪语', yue: '阿迪語',
               vi: 'Tiếng Adi', th: 'ภาษาอาดี', id: 'Adi', hi: 'आदि',
               de: 'Adi', fr: 'Adi', it: 'Adi',
               es_eu: 'Adi', es_mx: 'Adi', pt_eu: 'Adi', pt_br: 'Adi',
               ru: 'Ади', uk: 'Аді', ar: 'الأدي', he: 'אדי', sw: 'Kiadi' },
        ksb: { en: 'Shambala', ja: 'シャンバラ語', ko: '샴발라어', zh: '尚巴拉语', yue: '尚巴拉語',
               vi: 'Tiếng Shambala', th: 'ภาษาชัมบาลา', id: 'Shambala', hi: 'शम्बला',
               de: 'Schambala', fr: 'Shambala', it: 'Shambala',
               es_eu: 'Shambala', es_mx: 'Shambala', pt_eu: 'Xambala', pt_br: 'Xambala',
               ru: 'Шамбала', uk: 'Шамбала', ar: 'الشمبالا', he: 'שמבלה', sw: 'Kishambaa' },
        agq: { en: 'Aghem', ja: 'アゲム語', ko: '아겜어', zh: '阿盖姆语', yue: '阿蓋姆語',
               vi: 'Tiếng Aghem', th: 'ภาษาอาเก็ม', id: 'Aghem', hi: 'अगेम',
               de: 'Aghem', fr: 'Aghem', it: 'Aghem',
               es_eu: 'Aghem', es_mx: 'Aghem', pt_eu: 'Aguem', pt_br: 'Aguem',
               ru: 'Агхем', uk: 'Агхем', ar: 'الأغهم', he: 'אגהם', sw: 'Kiaghem' },
    };
    for (const code of Object.keys(ADDED24)) {
        for (const ui of Object.keys(ADDED24[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED24[code][ui];
            }
        }
    }
    // Vai (vai), Isoko (iso), Torres Strait Creole (tcs) — Liberia syllabary + Niger Delta Edoid + Australia creole.
    const ADDED25 = {
        vai: { en: 'Vai', ja: 'ヴァイ語', ko: '바이어', zh: '瓦伊语', yue: '瓦伊語',
               vi: 'Tiếng Vai', th: 'ภาษาวาย', id: 'Vai', hi: 'वाइ',
               de: 'Vai', fr: 'Vaï', it: 'Vai',
               es_eu: 'Vai', es_mx: 'Vai', pt_eu: 'Vai', pt_br: 'Vai',
               ru: 'Ваи', uk: 'Ваї', ar: 'الفاي', he: 'ואי', sw: 'Kivai' },
        iso: { en: 'Isoko', ja: 'イソコ語', ko: '이소코어', zh: '伊索科语', yue: '伊索科語',
               vi: 'Tiếng Isoko', th: 'ภาษาอีโซโก', id: 'Isoko', hi: 'इसोको',
               de: 'Isoko', fr: 'Isoko', it: 'Isoko',
               es_eu: 'Isoko', es_mx: 'Isoko', pt_eu: 'Isoko', pt_br: 'Isoko',
               ru: 'Исоко', uk: 'Ісоко', ar: 'الإيسوكو', he: 'איסוקו', sw: 'Kiisoko' },
        tcs: { en: 'Torres Strait Creole', ja: 'トレス海峡クレオール語', ko: '토레스 해협 크리올어', zh: '托雷斯海峡克里奥尔语', yue: '托雷斯海峽克里奧爾語',
               vi: 'Tiếng Creole Eo Torres', th: 'ภาษาครีโอลตอร์เรส', id: 'Kreol Selat Torres', hi: 'टोरेस जलडमरूमध्य क्रेओल',
               de: 'Torres-Strait-Kreolisch', fr: 'Créole du détroit de Torrès', it: 'Creolo dello Stretto di Torres',
               es_eu: 'Criollo del estrecho de Torres', es_mx: 'Criollo del estrecho de Torres', pt_eu: 'Crioulo do Estreito de Torres', pt_br: 'Crioulo do Estreito de Torres',
               ru: 'Креол Торресова пролива', uk: 'Креольська Торресової протоки', ar: 'كريولية مضيق توريس', he: 'קריאולית מצרי טורס', sw: 'Kreoli ya Mlango-Torres' },
    };
    for (const code of Object.keys(ADDED25)) {
        for (const ui of Object.keys(ADDED25[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED25[code][ui];
            }
        }
    }
    // Machame (jmc), Sebat Bet Gurage (sgw), Dotyali (dty) — Tanzania Chaga + Ethiopia Semitic + Nepal Indo-Aryan.
    const ADDED26 = {
        jmc: { en: 'Machame', ja: 'マチャメ語', ko: '마차메어', zh: '马查梅语', yue: '馬查梅語',
               vi: 'Tiếng Machame', th: 'ภาษามาชาเม', id: 'Machame', hi: 'मचमे',
               de: 'Machame', fr: 'Machame', it: 'Machame',
               es_eu: 'Machame', es_mx: 'Machame', pt_eu: 'Machame', pt_br: 'Machame',
               ru: 'Мачаме', uk: 'Мачаме', ar: 'الماشامي', he: 'מצ׳מה', sw: 'Kimashami' },
        sgw: { en: 'Sebat Bet Gurage', ja: 'セバト・ベト・グラゲ語', ko: '세바트 베트 구라게어', zh: '七家古拉格语', yue: '七家古拉格語',
               vi: 'Tiếng Sebat Bet Gurage', th: 'ภาษากูราเก', id: 'Sebat Bet Gurage', hi: 'सेबत बेत गुरागे',
               de: 'Sebat-Bet-Gurage', fr: 'Sebat Bet Gourage', it: 'Sebat Bet Gurage',
               es_eu: 'Gurage de Sebat Bet', es_mx: 'Gurage de Sebat Bet', pt_eu: 'Gurage de Sebat Bet', pt_br: 'Gurage de Sebat Bet',
               ru: 'Себат-Бет гураге', uk: 'Себат-Бет гураге', ar: 'سبات بت غوراجي', he: 'סבט בט גוראג׳ה', sw: 'Sebat Bet Gurage' },
        dty: { en: 'Dotyali', ja: 'ドティアーリ語', ko: '도티알리어', zh: '多帝亚利语', yue: '多帝亞利語',
               vi: 'Tiếng Dotyali', th: 'ภาษาโดเทียลี', id: 'Dotyali', hi: 'डोटेली',
               de: 'Doteli', fr: 'Dotyali', it: 'Dotyali',
               es_eu: 'Dotyali', es_mx: 'Dotyali', pt_eu: 'Dotyali', pt_br: 'Dotyali',
               ru: 'Дотьяли', uk: 'Дотьялі', ar: 'الدوتيالية', he: 'דוטיאלי', sw: 'Kidotyali' },
    };
    for (const code of Object.keys(ADDED26)) {
        for (const ui of Object.keys(ADDED26[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED26[code][ui];
            }
        }
    }
    // Yao (yao), Tetun Dili (tdt), Extremaduran (ext) — Mozambique Bantu + Timor-Leste lingua franca + Spain Iberian-Romance.
    const ADDED27 = {
        yao: { en: 'Yao', ja: 'ヤオ語', ko: '야오어', zh: '瑶语', yue: '瑤語',
               vi: 'Tiếng Yao', th: 'ภาษาเหยา', id: 'Yao', hi: 'याओ',
               de: 'Yao', fr: 'Yao', it: 'Yao',
               es_eu: 'Yao', es_mx: 'Yao', pt_eu: 'Iao', pt_br: 'Iao',
               ru: 'Яо', uk: 'Яо', ar: 'الياو', he: 'יאו', sw: 'Kiyao' },
        ext: { en: 'Extremaduran', ja: 'エストレマドゥーラ語', ko: '에스트레마두라어', zh: '埃斯特雷马杜拉语', yue: '埃斯特雷馬杜拉語',
               vi: 'Tiếng Estremenho', th: 'ภาษาเอ็กซ์เตรมาดูรา', id: 'Estremenyo', hi: 'एस्ट्रेमाडुरान',
               de: 'Extremadurisch', fr: 'Estrémègne', it: 'Estremegno',
               es_eu: 'Extremeño', es_mx: 'Extremeño', pt_eu: 'Estremenho', pt_br: 'Estremenho',
               ru: 'Эстремадурский', uk: 'Естремадурська', ar: 'الإكستريمادورية', he: 'אקסטרמדורית', sw: 'Kiekstremadura' },
    };
    for (const code of Object.keys(ADDED27)) {
        for (const ui of Object.keys(ADDED27[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED27[code][ui];
            }
        }
    }
    // Tetela (tll), Sangu (sbp), Masaaba (myx) — DRC Bantu + Tanzania Bantu + Uganda Bantu.
    const ADDED28 = {
        tll: { en: 'Tetela', ja: 'テテラ語', ko: '테텔라어', zh: '特特拉语', yue: '特特拉語',
               vi: 'Tiếng Tetela', th: 'ภาษาเตเตลา', id: 'Tetela', hi: 'टेटेला',
               de: 'Tetela', fr: 'Tetela', it: 'Tetela',
               es_eu: 'Tetela', es_mx: 'Tetela', pt_eu: 'Tetela', pt_br: 'Tetela',
               ru: 'Тетела', uk: 'Тетела', ar: 'التيتيلا', he: 'טטלה', sw: 'Kitetela' },
        sbp: { en: 'Sangu', ja: 'サング語', ko: '상구어', zh: '桑古语', yue: '桑古語',
               vi: 'Tiếng Sangu', th: 'ภาษาซางู', id: 'Sangu', hi: 'सांगू',
               de: 'Sangu', fr: 'Sangu', it: 'Sangu',
               es_eu: 'Sangu', es_mx: 'Sangu', pt_eu: 'Sangu', pt_br: 'Sangu',
               ru: 'Сангу', uk: 'Сангу', ar: 'السانغو', he: 'סנגו', sw: 'Kisangu' },
        myx: { en: 'Masaaba', ja: 'マサーバ語', ko: '마사바어', zh: '马萨巴语', yue: '馬薩巴語',
               vi: 'Tiếng Masaaba', th: 'ภาษามาซาบา', id: 'Masaaba', hi: 'मसाबा',
               de: 'Masaaba', fr: 'Masaba', it: 'Masaaba',
               es_eu: 'Masaaba', es_mx: 'Masaaba', pt_eu: 'Masaba', pt_br: 'Masaba',
               ru: 'Масаба', uk: 'Масаба', ar: 'الماسابا', he: 'מסאבה', sw: 'Kimasaaba' },
    };
    for (const code of Object.keys(ADDED28)) {
        for (const ui of Object.keys(ADDED28[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED28[code][ui];
            }
        }
    }
    // Mandar (mdr), East Franconian (vmf), Motu (meu) — 700-language milestone! Sulawesi Austronesian + German dialect + PNG Austronesian.
    const ADDED29 = {
        mdr: { en: 'Mandar', ja: 'マンダル語', ko: '만다르어', zh: '曼达尔语', yue: '曼達爾語',
               vi: 'Tiếng Mandar', th: 'ภาษามันดาร์', id: 'Mandar', hi: 'मंदार',
               de: 'Mandar', fr: 'Mandar', it: 'Mandar',
               es_eu: 'Mandar', es_mx: 'Mandar', pt_eu: 'Mandar', pt_br: 'Mandar',
               ru: 'Мандар', uk: 'Мандар', ar: 'الماندار', he: 'מנדר', sw: 'Mandar' },
        vmf: { en: 'East Franconian', ja: '東フランケン語', ko: '동프랑켄어', zh: '东法兰克语', yue: '東法蘭克語',
               vi: 'Tiếng Đông Franken', th: 'ภาษาฟรังเคินตะวันออก', id: 'Franken Timur', hi: 'पूर्वी फ्रैंकोनियन',
               de: 'Ostfränkisch', fr: 'Francique oriental', it: 'Francone orientale',
               es_eu: 'Franconio oriental', es_mx: 'Franconio oriental', pt_eu: 'Frâncico oriental', pt_br: 'Frâncico oriental',
               ru: 'Восточнофранкский', uk: 'Східнофранконська', ar: 'الفرنكونية الشرقية', he: 'פרנקונית מזרחית', sw: 'Kifranken cha Mashariki' },
        meu: { en: 'Motu', ja: 'モツ語', ko: '모투어', zh: '莫图语', yue: '莫圖語',
               vi: 'Tiếng Motu', th: 'ภาษาโมตู', id: 'Motu', hi: 'मोटू',
               de: 'Motu', fr: 'Motu', it: 'Motu',
               es_eu: 'Motu', es_mx: 'Motu', pt_eu: 'Motu', pt_br: 'Motu',
               ru: 'Моту', uk: 'Моту', ar: 'الموتو', he: 'מוטו', sw: 'Kimotu' },
    };
    for (const code of Object.keys(ADDED29)) {
        for (const ui of Object.keys(ADDED29[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED29[code][ui];
            }
        }
    }
    // Soninke (snk), Dan/Yacouba (dnj), Walser (wae) — Sahel Mande + Côte d'Ivoire Mande + Alps Highest Alemannic.
    const ADDED30 = {
        snk: { en: 'Soninke', ja: 'ソニンケ語', ko: '소닌케어', zh: '索宁克语', yue: '索寧克語',
               vi: 'Tiếng Soninke', th: 'ภาษาโซนินเก', id: 'Soninke', hi: 'सोनिंके',
               de: 'Soninke', fr: 'Soninké', it: 'Soninke',
               es_eu: 'Soninké', es_mx: 'Soninké', pt_eu: 'Soninquê', pt_br: 'Soninquê',
               ru: 'Сонинке', uk: 'Сонінке', ar: 'السوننكية', he: 'סונינקה', sw: 'Kisoninke' },
        dnj: { en: 'Dan', ja: 'ダン語', ko: '단어', zh: '丹语', yue: '丹語',
               vi: 'Tiếng Dan', th: 'ภาษาแดน', id: 'Dan', hi: 'डान',
               de: 'Dan', fr: 'Dan (Yacouba)', it: 'Dan',
               es_eu: 'Dan', es_mx: 'Dan', pt_eu: 'Dan', pt_br: 'Dan',
               ru: 'Дан', uk: 'Дан', ar: 'الدان', he: 'דן', sw: 'Kidan' },
        wae: { en: 'Walser', ja: 'ヴァルサー語', ko: '발저어', zh: '瓦尔泽语', yue: '瓦爾澤語',
               vi: 'Tiếng Walser', th: 'ภาษาวอลเซอร์', id: 'Walser', hi: 'वालसर',
               de: 'Walserdeutsch', fr: 'Walser', it: 'Walser',
               es_eu: 'Walser', es_mx: 'Walser', pt_eu: 'Walser', pt_br: 'Walser',
               ru: 'Вальзерский', uk: 'Вальзерська', ar: 'الوالسرية', he: 'וולסרית', sw: 'Kiwalser' },
    };
    for (const code of Object.keys(ADDED30)) {
        for (const ui of Object.keys(ADDED30[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED30[code][ui];
            }
        }
    }
    // Tai Dam (blt), Mongghul (mvf), Atoni (aoz) — Vietnam Tai + China Mongolic + West Timor.
    const ADDED31 = {
        blt: { en: 'Tai Dam', ja: 'タイ・ダム語', ko: '타이담어', zh: '傣端语', yue: '傣端語',
               vi: 'Tiếng Thái Đen', th: 'ภาษาไทดำ', id: 'Tai Dam', hi: 'ताई दाम',
               de: 'Tai Dam (Schwarz-Tai)', fr: 'Tai dam', it: 'Tai Dam',
               es_eu: 'Tai dam', es_mx: 'Tai dam', pt_eu: 'Tai dam', pt_br: 'Tai dam',
               ru: 'Тай-дам', uk: 'Тай-дам', ar: 'الطاي دام', he: 'טאי דם', sw: 'Tai Dam' },
        mvf: { en: 'Mongghul', ja: 'モングォル語', ko: '몽굴어', zh: '蒙古尔语', yue: '蒙古爾語',
               vi: 'Tiếng Mongghul', th: 'ภาษามองกูล', id: 'Mongghul', hi: 'मोंगुल',
               de: 'Mongghul', fr: 'Mongghul', it: 'Mongghul',
               es_eu: 'Mongghul', es_mx: 'Mongghul', pt_eu: 'Mongol-Tu', pt_br: 'Mongol-Tu',
               ru: 'Монгор', uk: 'Монгор', ar: 'المنغل', he: 'מונגול', sw: 'Mongghul' },
        aoz: { en: 'Atoni', ja: 'アトニ語', ko: '아토니어', zh: '阿托尼语', yue: '阿托尼語',
               vi: 'Tiếng Atoni', th: 'ภาษาอาโตนิ', id: 'Atoni', hi: 'अतोनी',
               de: 'Atoni', fr: 'Atoni', it: 'Atoni',
               es_eu: 'Atoni', es_mx: 'Atoni', pt_eu: 'Atoni', pt_br: 'Atoni',
               ru: 'Атони', uk: 'Атоні', ar: 'الأتوني', he: 'אטוני', sw: 'Atoni' },
    };
    for (const code of Object.keys(ADDED31)) {
        for (const ui of Object.keys(ADDED31[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED31[code][ui];
            }
        }
    }
    // Irula (iru), Dii (dur), Thulung (tdh) — S India Dravidian + Cameroon Adamawa + Nepal Kiranti.
    const ADDED32 = {
        iru: { en: 'Irula', ja: 'イルラ語', ko: '이룰라어', zh: '伊鲁拉语', yue: '伊魯拉語',
               vi: 'Tiếng Irula', th: 'ภาษาอิรูลา', id: 'Irula', hi: 'इरुला',
               de: 'Irula', fr: 'Irula', it: 'Irula',
               es_eu: 'Irula', es_mx: 'Irula', pt_eu: 'Irula', pt_br: 'Irula',
               ru: 'Ирула', uk: 'Ірула', ar: 'الإيرولا', he: 'אירולה', sw: 'Kiirula' },
        dur: { en: 'Dii', ja: 'ディー語', ko: '디어', zh: '迪伊语', yue: '迪伊語',
               vi: 'Tiếng Dii', th: 'ภาษาดิอิ', id: 'Dii', hi: 'डी',
               de: 'Dii', fr: 'Dii', it: 'Dii',
               es_eu: 'Dii', es_mx: 'Dii', pt_eu: 'Dii', pt_br: 'Dii',
               ru: 'Дии', uk: 'Дії', ar: 'الديي', he: 'דיי', sw: 'Kidii' },
        tdh: { en: 'Thulung', ja: 'トゥルン語', ko: '툴룽어', zh: '图隆语', yue: '圖隆語',
               vi: 'Tiếng Thulung', th: 'ภาษาทูลุง', id: 'Thulung', hi: 'थुलुङ',
               de: 'Thulung', fr: 'Thoulung', it: 'Thulung',
               es_eu: 'Thulung', es_mx: 'Thulung', pt_eu: 'Thulung', pt_br: 'Thulung',
               ru: 'Тхулунг', uk: 'Тхулунг', ar: 'الثولونغ', he: 'תולונג', sw: 'Kithulung' },
    };
    for (const code of Object.keys(ADDED32)) {
        for (const ui of Object.keys(ADDED32[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED32[code][ui];
            }
        }
    }
    // Rangpuri (rkt), Judeo-Persian (jpr), Munsee (umu) — Bangladesh + Iranian Jewish + Lenape Algonquian.
    const ADDED33 = {
        rkt: { en: 'Rangpuri', ja: 'ラングプリ語', ko: '랑푸리어', zh: '兰格普里语', yue: '蘭格普里語',
               vi: 'Tiếng Rangpuri', th: 'ภาษารังปุระ', id: 'Rangpuri', hi: 'रंगपुरी',
               de: 'Rangpuri', fr: 'Rangpuri', it: 'Rangpuri',
               es_eu: 'Rangpuri', es_mx: 'Rangpuri', pt_eu: 'Rangpuri', pt_br: 'Rangpuri',
               ru: 'Рангпури', uk: 'Рангпурі', ar: 'الرانغبورية', he: 'רנגפורי', sw: 'Rangpuri' },
        jpr: { en: 'Judeo-Persian', ja: 'ユダヤ・ペルシア語', ko: '유대 페르시아어', zh: '犹太波斯语', yue: '猶太波斯語',
               vi: 'Tiếng Ba Tư Do Thái', th: 'ภาษายิว-เปอร์เซีย', id: 'Yahudi-Persia', hi: 'यहूदी फ़ारसी',
               de: 'Judäo-Persisch', fr: 'Judéo-persan', it: 'Giudeo-persiano',
               es_eu: 'Judeopersa', es_mx: 'Judeopersa', pt_eu: 'Judeo-persa', pt_br: 'Judeo-persa',
               ru: 'Еврейско-персидский', uk: 'Єврейсько-перська', ar: 'اليهودية الفارسية', he: 'יהודית-פרסית', sw: 'Kiyahudi-Kiajemi' },
        umu: { en: 'Munsee', ja: 'ムンジー語', ko: '먼시어', zh: '芒西语', yue: '芒西語',
               vi: 'Tiếng Munsee', th: 'ภาษามันซี', id: 'Munsee', hi: 'मुंसी',
               de: 'Munsee', fr: 'Munsee', it: 'Munsee',
               es_eu: 'Munsee', es_mx: 'Munsee', pt_eu: 'Munsee', pt_br: 'Munsee',
               ru: 'Манси (делавар)', uk: 'Манси (делавар)', ar: 'الموسني', he: 'מונסי', sw: 'Munsee' },
    };
    for (const code of Object.keys(ADDED33)) {
        for (const ui of Object.keys(ADDED33[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED33[code][ui];
            }
        }
    }
    // Cayuga (cay), Onondaga (onn), Sikkimese (sik) — Iroquoian + Tibetic.
    const ADDED34 = {
        cay: { en: 'Cayuga', ja: 'カユガ語', ko: '카유가어', zh: '卡尤加语', yue: '卡尤加語',
               vi: 'Tiếng Cayuga', th: 'ภาษาคายูกา', id: 'Cayuga', hi: 'कायुगा',
               de: 'Cayuga', fr: 'Cayuga', it: 'Cayuga',
               es_eu: 'Cayuga', es_mx: 'Cayuga', pt_eu: 'Cayuga', pt_br: 'Cayuga',
               ru: 'Кайюга', uk: 'Каюґа', ar: 'الكايوغا', he: 'קיוגה', sw: 'Cayuga' },
        onn: { en: 'Onondaga', ja: 'オノンダガ語', ko: '오논다가어', zh: '奥农达加语', yue: '奧農達加語',
               vi: 'Tiếng Onondaga', th: 'ภาษาโอนอนดากา', id: 'Onondaga', hi: 'ओनोंडागा',
               de: 'Onondaga', fr: 'Onondaga', it: 'Onondaga',
               es_eu: 'Onondaga', es_mx: 'Onondaga', pt_eu: 'Onondaga', pt_br: 'Onondaga',
               ru: 'Онондага', uk: 'Онондага', ar: 'الأونونداغا', he: 'אונונדגה', sw: 'Onondaga' },
        sik: { en: 'Sikkimese', ja: 'シッキム語', ko: '시킴어', zh: '锡金语', yue: '錫金語',
               vi: 'Tiếng Sikkim', th: 'ภาษาสิกขิม', id: 'Sikkim', hi: 'सिक्किमी',
               de: 'Sikkimesisch', fr: 'Sikkimais', it: 'Sikkimese',
               es_eu: 'Sikkimés', es_mx: 'Sikkimés', pt_eu: 'Siquimês', pt_br: 'Siquimês',
               ru: 'Сиккимский', uk: 'Сіккімська', ar: 'السيكيمية', he: 'סיקימית', sw: 'Kisikkim' },
    };
    for (const code of Object.keys(ADDED34)) {
        for (const ui of Object.keys(ADDED34[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED34[code][ui];
            }
        }
    }
    // Tuscarora (tus), Mandaic (myz), Caribbean Javanese (jvn).
    const ADDED35 = {
        tus: { en: 'Tuscarora', ja: 'タスカローラ語', ko: '터스커로러어', zh: '塔斯卡罗拉语', yue: '塔斯卡羅拉語',
               vi: 'Tiếng Tuscarora', th: 'ภาษาทัสคารอรา', id: 'Tuscarora', hi: 'टस्करोरा',
               de: 'Tuscarora', fr: 'Tuscarora', it: 'Tuscarora',
               es_eu: 'Tuscarora', es_mx: 'Tuscarora', pt_eu: 'Tuscarora', pt_br: 'Tuscarora',
               ru: 'Тускарора', uk: 'Тускарора', ar: 'التوسكارورا', he: 'טוסקרורה', sw: 'Tuscarora' },
        myz: { en: 'Mandaic', ja: 'マンダ語', ko: '만다이어', zh: '曼达语', yue: '曼達語',
               vi: 'Tiếng Mandaic', th: 'ภาษามันดาอิก', id: 'Mandaic', hi: 'मंडाइक',
               de: 'Mandäisch', fr: 'Mandéen', it: 'Mandeo',
               es_eu: 'Mandeo', es_mx: 'Mandeo', pt_eu: 'Mandeu', pt_br: 'Mandeu',
               ru: 'Мандейский', uk: 'Мандейська', ar: 'المندائية', he: 'מנדאית', sw: 'Kimanda' },
        jvn: { en: 'Caribbean Javanese', ja: 'カリブ・ジャワ語', ko: '카리브 자바어', zh: '加勒比爪哇语', yue: '加勒比爪哇語',
               vi: 'Tiếng Java Caribe', th: 'ภาษาชวาแคริบเบียน', id: 'Jawa Suriname', hi: 'कैरिबियन जावानीज़',
               de: 'Karibisches Javanisch', fr: 'Javanais des Caraïbes', it: 'Giavanese caraibico',
               es_eu: 'Javanés caribeño', es_mx: 'Javanés caribeño', pt_eu: 'Javanês caribenho', pt_br: 'Javanês caribenho',
               ru: 'Карибский яванский', uk: 'Карибська яванська', ar: 'الجاوية الكاريبية', he: 'יוואנית קריבית', sw: 'Kijava cha Karibea' },
    };
    for (const code of Object.keys(ADDED35)) {
        for (const ui of Object.keys(ADDED35[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED35[code][ui];
            }
        }
    }

    const ADDED36 = {
        prs: { en: 'Dari', ja: 'ダリー語', ko: '다리어', zh: '达里语', yue: '達里語',
               vi: 'Tiếng Dari', th: 'ภาษาดารี', id: 'Bahasa Dari', hi: 'दारी',
               de: 'Dari', fr: 'Dari', it: 'Dari',
               es_eu: 'Dari', es_mx: 'Dari', pt_eu: 'Dari', pt_br: 'Dari',
               ru: 'Дари', uk: 'Дарі', ar: 'الدرية', he: 'דארי', sw: 'Kidari' },
        szl: { en: 'Silesian', ja: 'シレジア語', ko: '실레시아어', zh: '西里西亚语', yue: '西里西亞語',
               vi: 'Tiếng Silesia', th: 'ภาษาซิลีเซีย', id: 'Bahasa Silesia', hi: 'सिलेसियाई',
               de: 'Schlesisch', fr: 'Silésien', it: 'Slesiano',
               es_eu: 'Silesio', es_mx: 'Silesio', pt_eu: 'Silesiano', pt_br: 'Silesiano',
               ru: 'Силезский', uk: 'Сілезька', ar: 'السيليزية', he: 'שלזית', sw: 'Kisilesia' },
        udi: { en: 'Udi', ja: 'ウディ語', ko: '우디어', zh: '乌迪语', yue: '烏迪語',
               vi: 'Tiếng Udi', th: 'ภาษาอูดี', id: 'Bahasa Udi', hi: 'उदी',
               de: 'Udisch', fr: 'Oudi', it: 'Udi',
               es_eu: 'Udi', es_mx: 'Udi', pt_eu: 'Udi', pt_br: 'Udi',
               ru: 'Удинский', uk: 'Удинська', ar: 'الأودية', he: 'אודית', sw: 'Kiudi' },
    };
    for (const code of Object.keys(ADDED36)) {
        for (const ui of Object.keys(ADDED36[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED36[code][ui];
            }
        }
    }

    const ADDED37 = {
        sva: { en: 'Svan', ja: 'スヴァン語', ko: '스반어', zh: '斯瓦涅季亚语', yue: '斯瓦涅季亞語',
               vi: 'Tiếng Svan', th: 'ภาษาสวาน', id: 'Bahasa Svan', hi: 'स्वान',
               de: 'Swanisch', fr: 'Svane', it: 'Svano',
               es_eu: 'Svano', es_mx: 'Svano', pt_eu: 'Svano', pt_br: 'Svano',
               ru: 'Сванский', uk: 'Сванська', ar: 'السفانية', he: 'סוואנית', sw: 'Kisvani' },
        sdh: { en: 'Southern Kurdish', ja: '南クルド語', ko: '남쿠르드어', zh: '南库尔德语', yue: '南庫爾德語',
               vi: 'Tiếng Kurd Miền Nam', th: 'ภาษาเคิร์ดใต้', id: 'Kurdi Selatan', hi: 'दक्षिणी कुर्दी',
               de: 'Südkurdisch', fr: 'Kurde méridional', it: 'Curdo meridionale',
               es_eu: 'Kurdo meridional', es_mx: 'Kurdo meridional', pt_eu: 'Curdo meridional', pt_br: 'Curdo meridional',
               ru: 'Южнокурдский', uk: 'Південнокурдська', ar: 'الكردية الجنوبية', he: 'כורדית דרומית', sw: 'Kikurdi cha Kusini' },
        crk: { en: 'Plains Cree', ja: 'プレーンズ・クリー語', ko: '평원 크리어', zh: '平原克里语', yue: '平原克里語',
               vi: 'Tiếng Cree Đồng Bằng', th: 'ภาษาเพลนส์ครี', id: 'Cree Dataran', hi: 'प्लेन्स क्री',
               de: 'Plains-Cree', fr: 'Cri des Plaines', it: 'Cree delle Pianure',
               es_eu: 'Cree de las Llanuras', es_mx: 'Cree de las Llanuras', pt_eu: 'Cree das Planícies', pt_br: 'Cree das Planícies',
               ru: 'Равнинный кри', uk: 'Рівнинна крі', ar: 'الكرية السهلية', he: 'קרי הערבות', sw: 'Kicree cha Mwambao' },
    };
    for (const code of Object.keys(ADDED37)) {
        for (const ui of Object.keys(ADDED37[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED37[code][ui];
            }
        }
    }

    const ADDED38 = {
        aii: { en: 'Assyrian Neo-Aramaic', ja: 'アッシリア新アラム語', ko: '아시리아 신아람어', zh: '亚述新阿拉米语', yue: '亞述新阿拉米語',
               vi: 'Tiếng Aram Tân Assyria', th: 'ภาษาอราเมอิกใหม่อัสซีเรีย', id: 'Aram Neo-Asyur', hi: 'असीरियन नव-अरामी',
               de: 'Assyrisch-Neuaramäisch', fr: 'Néo-araméen assyrien', it: 'Neoaramaico assiro',
               es_eu: 'Neoarameo asirio', es_mx: 'Neoarameo asirio', pt_eu: 'Neoaramaico assírio', pt_br: 'Neoaramaico assírio',
               ru: 'Ассирийский новоарамейский', uk: 'Ассирійська новоарамейська', ar: 'الآشورية الحديثة', he: 'ארמית חדשה אשורית', sw: 'Kiaramu Kipya cha Kiashuru' },
        jaq: { en: 'Jaqaru', ja: 'ハカル語', ko: '하카루어', zh: '哈卡鲁语', yue: '哈卡魯語',
               vi: 'Tiếng Jaqaru', th: 'ภาษาฮาการู', id: 'Bahasa Jaqaru', hi: 'जाकारू',
               de: 'Jaqaru', fr: 'Jaqaru', it: 'Jaqaru',
               es_eu: 'Jaqaru', es_mx: 'Jaqaru', pt_eu: 'Jaqaru', pt_br: 'Jaqaru',
               ru: 'Хакару', uk: 'Хакару', ar: 'الجاكارو', he: 'ג׳קארו', sw: 'Kijaqaru' },
    };
    for (const code of Object.keys(ADDED38)) {
        for (const ui of Object.keys(ADDED38[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED38[code][ui];
            }
        }
    }

    const ADDED39 = {
        tkr: { en: 'Tsakhur', ja: 'ツァフール語', ko: '차후르어', zh: '查胡尔语', yue: '查胡爾語',
               vi: 'Tiếng Tsakhur', th: 'ภาษาซาคูร์', id: 'Bahasa Tsakhur', hi: 'त्साखुर',
               de: 'Tsachurisch', fr: 'Tsakhour', it: 'Tsakhur',
               es_eu: 'Tsajur', es_mx: 'Tsajur', pt_eu: 'Tsacur', pt_br: 'Tsacur',
               ru: 'Цахурский', uk: 'Цахурська', ar: 'التساخورية', he: 'צאחורית', sw: 'Kitsakur' },
        kmh: { en: 'Kalam', ja: 'カラム語', ko: '칼람어', zh: '卡兰姆语', yue: '卡蘭姆語',
               vi: 'Tiếng Kalam', th: 'ภาษากาลัม', id: 'Bahasa Kalam', hi: 'कलाम',
               de: 'Kalam', fr: 'Kalam', it: 'Kalam',
               es_eu: 'Kalam', es_mx: 'Kalam', pt_eu: 'Kalam', pt_br: 'Kalam',
               ru: 'Калам', uk: 'Калам', ar: 'الكالامية', he: 'קלאם', sw: 'Kikalam' },
        nej: { en: 'Neko', ja: 'ネコ語', ko: '네코어', zh: '内科语', yue: '內科語',
               vi: 'Tiếng Neko', th: 'ภาษาเนโก', id: 'Bahasa Neko', hi: 'नेको',
               de: 'Neko', fr: 'Néko', it: 'Neko',
               es_eu: 'Neko', es_mx: 'Neko', pt_eu: 'Neko', pt_br: 'Neko',
               ru: 'Неко', uk: 'Неко', ar: 'النيكو', he: 'נקו', sw: 'Kineko' },
        alq: { en: 'Algonquin', ja: 'アルゴンキン語', ko: '알공킨어', zh: '阿尔冈昆语', yue: '阿爾岡昆語', vi: 'Tiếng Algonquin', th: 'ภาษาแอลกองควิน', id: 'Bahasa Algonquin', hi: 'अल्गोंक्विन', de: 'Algonkin', fr: 'Algonquin', it: 'Algonchino', es_eu: 'Algonquino', es_mx: 'Algonquino', pt_eu: 'Algonquino', pt_br: 'Algonquino', ru: 'Алгонкинский', uk: 'Алгонкінська', ar: 'الألغونكوية', he: 'אלגונקווין', sw: 'Kialgonkin' },
        ckv: { en: 'Kavalan', ja: 'カバラン語', ko: '카발란어', zh: '噶玛兰语', yue: '噶瑪蘭語', vi: 'Tiếng Kavalan', th: 'ภาษากาวาลัน', id: 'Bahasa Kavalan', hi: 'कवालन', de: 'Kavalan', fr: 'Kavalan', it: 'Kavalan', es_eu: 'Kavalán', es_mx: 'Kavalán', pt_eu: 'Kavalan', pt_br: 'Kavalan', ru: 'Кавалан', uk: 'Кавалан', ar: 'الكافالان', he: 'קוואלאן', sw: 'Kikavalan' },
        haj: { en: 'Hajong', ja: 'ハジョン語', ko: '하종어', zh: '哈絨語', yue: '哈絨語', vi: 'Tiếng Hajong', th: 'ภาษาฮาจง', id: 'Bahasa Hajong', hi: 'हाजोंग', de: 'Hajong', fr: 'hajong', it: 'hajong', es_eu: 'hajong', es_mx: 'hajong', pt_eu: 'hajong', pt_br: 'hajong', ru: 'Хаджонг', uk: 'Хаджонг', ar: 'الهاجونغ', he: 'האג׳ונג', sw: 'Kihajong' },
        kzj: { en: 'Coastal Kadazan', ja: '沿岸カダザン語', ko: '연안 카다잔어', zh: '沿海卡达赞语', yue: '沿海卡達讚語', vi: 'Tiếng Kadazan ven biển', th: 'ภาษากาดาซันชายฝั่ง', id: 'Bahasa Kadazan Pesisir', hi: 'तटीय कडज़ान', de: 'Küsten-Kadazan', fr: 'Kadazan côtier', it: 'Kadazan costiero', es_eu: 'Kadazan costero', es_mx: 'Kadazán costero', pt_eu: 'Kadazan costeiro', pt_br: 'Cadazã costeiro', ru: 'Прибрежный кадазан', uk: 'Прибережна кадазан', ar: 'الكادازانية الساحلية', he: 'קדאזאן חופי', sw: 'Kikadazan cha Pwani' },
        mez: { en: 'Menominee', ja: 'メノミニー語', ko: '메노미니어', zh: '梅诺米尼语', yue: '梅諾米尼語', vi: 'Tiếng Menominee', th: 'ภาษาเมโนมินี', id: 'Bahasa Menominee', hi: 'मेनोमिनी', de: 'Menominee', fr: 'Ménominee', it: 'Menominee', es_eu: 'Menominee', es_mx: 'Menominee', pt_eu: 'Menominee', pt_br: 'Menominee', ru: 'Меномини', uk: 'Меноміні', ar: 'المينومينية', he: 'מנומיני', sw: 'Kimenominee' },
        nan_xm: { en: 'Xiamen Hokkien', ja: '厦門閩南語', ko: '샤먼 민난어', zh: '厦门话', yue: '廈門話', vi: 'Tiếng Hạ Môn', th: 'ฮกเกี้ยนเซี่ยเหมิน', id: 'Hokkien Xiamen', hi: 'श्यामन होक्किएन', de: 'Xiamen-Hokkien', fr: 'Hokkien de Xiamen', it: 'Hokkien di Xiamen', es_eu: 'Hokkien de Xiamen', es_mx: 'Hokkien de Xiamen', pt_eu: 'Hokkien de Xiamen', pt_br: 'Hokkien de Xiamen', ru: 'Сямэньский хоккиен', uk: 'Сямєньський хоккієн', ar: 'هوكين شيامن', he: 'הוקיאן שיאמן', sw: 'Kihokkien cha Xiamen' },
        nan_zz: { en: 'Zhangzhou Hokkien', ja: '漳州閩南語', ko: '장저우 민난어', zh: '漳州话', yue: '漳州話', vi: 'Tiếng Chương Châu', th: 'ฮกเกี้ยนจางโจว', id: 'Hokkien Zhangzhou', hi: 'झांगझोउ होक्किएन', de: 'Zhangzhou-Hokkien', fr: 'Hokkien de Zhangzhou', it: 'Hokkien di Zhangzhou', es_eu: 'Hokkien de Zhangzhou', es_mx: 'Hokkien de Zhangzhou', pt_eu: 'Hokkien de Zhangzhou', pt_br: 'Hokkien de Zhangzhou', ru: 'Чжанчжоуский хоккиен', uk: 'Чжанчжоуський хоккієн', ar: 'هوكين تشانغتشو', he: 'הוקיאן ז\'אנגז\'ואו', sw: 'Kihokkien cha Zhangzhou' },
        osa: { en: 'Osage', ja: 'オセージ語', ko: '오세이지어', zh: '奥塞奇语', yue: '奧塞奇語', vi: 'Tiếng Osage', th: 'ภาษาโอเซจ', id: 'Bahasa Osage', hi: 'ओसेज', de: 'Osage', fr: 'Osage', it: 'Osage', es_eu: 'Osage', es_mx: 'Osage', pt_eu: 'Osage', pt_br: 'Osage', ru: 'Осейджи', uk: 'Осейдж', ar: 'الأوسيجية', he: 'אוסיג׳', sw: 'Kiosage' },
        pgz: { en: 'Papuan Malay', ja: 'パプア・マレー語', ko: '파푸아 말레이어', zh: '巴布亚马来语', yue: '巴布亞馬來語', vi: 'Tiếng Mã Lai Papua', th: 'ภาษามลายูปาปัว', id: 'Bahasa Melayu Papua', hi: 'पापुआ मलय', de: 'Papua-Malaiisch', fr: 'Malais papou', it: 'Malese papuano', es_eu: 'Malayo papú', es_mx: 'Malayo papú', pt_eu: 'Malaio papua', pt_br: 'Malaio papua', ru: 'Папуасский малайский', uk: 'Папуаська малайська', ar: 'الملايوية البابوية', he: 'מלאית פפואית', sw: 'Kimalei cha Papua' },
        pot: { en: 'Potawatomi', ja: 'ポタワトミ語', ko: '포타와토미어', zh: '波塔瓦托米语', yue: '波塔瓦托米語', vi: 'Tiếng Potawatomi', th: 'ภาษาโพทาวาโทมี', id: 'Bahasa Potawatomi', hi: 'पोटावाटोमी', de: 'Potawatomi', fr: 'Potawatomi', it: 'Potawatomi', es_eu: 'Potawatomi', es_mx: 'Potawatomi', pt_eu: 'Potawatomi', pt_br: 'Potawatomi', ru: 'Потаватоми', uk: 'Потаватомі', ar: 'البوتاواتومي', he: 'פוטאוואטומי', sw: 'Kipotawatomi' },
        uun: { en: 'Kulon-Pazeh', ja: 'クーロン・パゼヘ語', ko: '쿨론-파제흐어', zh: '巴宰語', yue: '巴宰語', vi: 'Tiếng Kulon-Pazeh', th: 'ภาษากูลน-ปาเซะฮ์', id: 'Bahasa Kulon-Pazeh', hi: 'कुलोन-पाज़ेह', de: 'Kulon-Pazeh', fr: 'kulon-pazeh', it: 'kulon-pazeh', es_eu: 'kulon-pazeh', es_mx: 'kulon-pazeh', pt_eu: 'kulon-pazeh', pt_br: 'kulon-pazeh', ru: 'Кулон-пазех', uk: 'Кулон-пазех', ar: 'الكولون-بازيه', he: 'קולון־פאזה', sw: 'Kikulon-Pazeh' },
        wch: { en: 'Wichita', ja: 'ウィチタ語', ko: '위치타어', zh: '威奇托语', yue: '威奇托語', vi: 'Tiếng Wichita', th: 'ภาษาวิชิตา', id: 'Bahasa Wichita', hi: 'विचिता', de: 'Wichita', fr: 'Wichita', it: 'Wichita', es_eu: 'Wichita', es_mx: 'Wichita', pt_eu: 'Wichita', pt_br: 'Wichita', ru: 'Уичита', uk: 'Уічіта', ar: 'الويتشيتية', he: 'וויצ׳יטה', sw: 'Kiwichita' },
        wuu_jh: { en: 'Jinhua Wu', ja: '金華呉語', ko: '진화 우어', zh: '金华话', yue: '金華話', vi: 'Tiếng Ngô Kim Hoa', th: 'ภาษาอู๋จินหัว', id: 'Bahasa Wu Jinhua', hi: 'जिनहुआ वू', de: 'Jinhua-Wu', fr: 'Wu de Jinhua', it: 'Wu di Jinhua', es_eu: 'Wu de Jinhua', es_mx: 'Wu de Jinhua', pt_eu: 'Wu de Jinhua', pt_br: 'Wu de Jinhua', ru: 'Цзиньхуаский диалект у', uk: 'Цзіньхуаський діалект у', ar: 'لهجة جينهوا الوو', he: 'וו ג׳ינחואה', sw: 'Kiwu cha Jinhua' },
        wuu_jx: { en: 'Jiaxing Wu', ja: '嘉興呉語', ko: '자싱 우어', zh: '嘉兴话', yue: '嘉興話', vi: 'Tiếng Ngô Gia Hưng', th: 'ภาษาอู๋เจียซิง', id: 'Bahasa Wu Jiaxing', hi: 'जिआशिंग वू', de: 'Jiaxing-Wu', fr: 'Wu de Jiaxing', it: 'Wu di Jiaxing', es_eu: 'Wu de Jiaxing', es_mx: 'Wu de Jiaxing', pt_eu: 'Wu de Jiaxing', pt_br: 'Wu de Jiaxing', ru: 'Цзясинский диалект у', uk: 'Цзясинський діалект у', ar: 'لهجة جياشينغ الوو', he: 'וו ג׳יאשינג', sw: 'Kiwu cha Jiaxing' },
        yue_zs: { en: 'Zhongshan Yue', ja: '中山白話', ko: '중산백화', zh: '中山白话', yue: '中山白話', vi: 'Tiếng Trung Sơn', th: 'จงชาน', id: 'Yue Zhongshan', hi: 'झोंगशान कैंटोनी', de: 'Zhongshan-Yue', fr: 'Yue de Zhongshan', it: 'Yue di Zhongshan', es_eu: 'Yue de Zhongshan', es_mx: 'Yue de Zhongshan', pt_eu: 'Yue de Zhongshan', pt_br: 'Yue de Zhongshan', ru: 'Чжуншаньский юэ', uk: 'Чжуншаньський юе', ar: 'يوي تشونغشان', he: 'יואה ז\'ונגשאן', sw: 'Kiyue cha Zhongshan' },
        zh_cd: { en: 'Chengdu Mandarin', ja: '成都官話', ko: '청두말', zh: '成都话', yue: '成都話', vi: 'Tiếng Thành Đô', th: 'ภาษาเฉิงตู', id: 'Bahasa Mandarin Chengdu', hi: 'चेंगदू मंदारिन', de: 'Chengdu-Mandarin', fr: 'Mandarin de Chengdu', it: 'Mandarino di Chengdu', es_eu: 'Mandarín de Chengdú', es_mx: 'Mandarín de Chengdú', pt_eu: 'Mandarim de Chengdu', pt_br: 'Mandarim de Chengdu', ru: 'Чэндуский диалект', uk: 'Ченду́ський діалект', ar: 'الماندرينية التشينغدوية', he: 'מנדרינית של צ\'נגדו', sw: 'Kimandarini cha Chengdu' },
        zh_hf: { en: 'Hefei Mandarin', ja: '合肥官話', ko: '허페이 관화', zh: '合肥官话', yue: '合肥話', vi: 'Tiếng Hợp Phì', th: 'ภาษาเหอเฝย', id: 'Bahasa Hefei', hi: 'हेफ़ेई भाषा', de: 'Hefei-Chinesisch', fr: 'Chinois de Hefei', it: 'Cinese di Hefei', es_eu: 'Chino de Hefei', es_mx: 'Chino de Hefei', pt_eu: 'Chinês de Hefei', pt_br: 'Chinês de Hefei', ru: 'Хэфэйский диалект', uk: 'Хефейський діалект', ar: 'لهجة خفي', he: 'ניב חפיי', sw: 'Kihefei' },
        zh_kf: { en: 'Kaifeng Mandarin', ja: '開封官話', ko: '카이펑말', zh: '开封话', yue: '開封話', vi: 'Tiếng Khai Phong', th: 'ภาษาไคเฟิง', id: 'Bahasa Mandarin Kaifeng', hi: 'काइफ़ेंग मंदारिन', de: 'Kaifeng-Mandarin', fr: 'Mandarin de Kaifeng', it: 'Mandarino di Kaifeng', es_eu: 'Mandarín de Kaifeng', es_mx: 'Mandarín de Kaifeng', pt_eu: 'Mandarim de Kaifeng', pt_br: 'Mandarim de Kaifeng', ru: 'Кайфэнский диалект', uk: 'Кайфе́нський діалект', ar: 'الماندرينية الكايفنغية', he: 'מנדרינית של קאיפנג', sw: 'Kimandarini cha Kaifeng' },
        zh_nj: { en: 'Nanjing Mandarin', ja: '南京官話', ko: '난징말', zh: '南京话', yue: '南京話', vi: 'Tiếng Nam Kinh', th: 'ภาษาหนานจิง', id: 'Bahasa Mandarin Nanjing', hi: 'नानजिंग मंदारिन', de: 'Nanjing-Mandarin', fr: 'Mandarin de Nankin', it: 'Mandarino di Nanchino', es_eu: 'Mandarín de Nankín', es_mx: 'Mandarín de Nankín', pt_eu: 'Mandarim de Nanquim', pt_br: 'Mandarim de Nanquim', ru: 'Нанкинский диалект', uk: 'Нанкі́нський діалект', ar: 'الماندرينية النانجينغية', he: 'מנדרינית של נאנג\'ינג', sw: 'Kimandarini cha Nanjing' },
        nan_xm: { en: 'Xiamen Hokkien', ja: '厦門閩南語', ko: '샤먼 민난어', zh: '厦门话', yue: '廈門話', vi: 'Tiếng Hạ Môn', th: 'ฮกเกี้ยนเซี่ยเหมิน', id: 'Hokkien Xiamen', hi: 'श्यामन होक्किएन', de: 'Xiamen-Hokkien', fr: 'Hokkien de Xiamen', it: 'Hokkien di Xiamen', es_eu: 'Hokkien de Xiamen', es_mx: 'Hokkien de Xiamen', pt_eu: 'Hokkien de Xiamen', pt_br: 'Hokkien de Xiamen', ru: 'Сямэньский хоккиен', uk: 'Сямєньський хоккієн', ar: 'هوكين شيامن', he: 'הוקיאן שיאמן', sw: 'Kihokkien cha Xiamen' },
        nan_zz: { en: 'Zhangzhou Hokkien', ja: '漳州閩南語', ko: '장저우 민난어', zh: '漳州话', yue: '漳州話', vi: 'Tiếng Chương Châu', th: 'ฮกเกี้ยนจางโจว', id: 'Hokkien Zhangzhou', hi: 'झांगझोउ होक्किएन', de: 'Zhangzhou-Hokkien', fr: 'Hokkien de Zhangzhou', it: 'Hokkien di Zhangzhou', es_eu: 'Hokkien de Zhangzhou', es_mx: 'Hokkien de Zhangzhou', pt_eu: 'Hokkien de Zhangzhou', pt_br: 'Hokkien de Zhangzhou', ru: 'Чжанчжоуский хоккиен', uk: 'Чжанчжоуський хоккієн', ar: 'هوكين تشانغتشو', he: 'הוקיאן ז\'אנגז\'ואו', sw: 'Kihokkien cha Zhangzhou' },
        wuu_jh: { en: 'Jinhua Wu', ja: '金華呉語', ko: '진화 우어', zh: '金华话', yue: '金華話', vi: 'Tiếng Ngô Kim Hoa', th: 'ภาษาอู๋จินหัว', id: 'Bahasa Wu Jinhua', hi: 'जिनहुआ वू', de: 'Jinhua-Wu', fr: 'Wu de Jinhua', it: 'Wu di Jinhua', es_eu: 'Wu de Jinhua', es_mx: 'Wu de Jinhua', pt_eu: 'Wu de Jinhua', pt_br: 'Wu de Jinhua', ru: 'Цзиньхуаский диалект у', uk: 'Цзіньхуаський діалект у', ar: 'لهجة جينهوا الوو', he: 'וו ג׳ינחואה', sw: 'Kiwu cha Jinhua' },
        wuu_jx: { en: 'Jiaxing Wu', ja: '嘉興呉語', ko: '자싱 우어', zh: '嘉兴话', yue: '嘉興話', vi: 'Tiếng Ngô Gia Hưng', th: 'ภาษาอู๋เจียซิง', id: 'Bahasa Wu Jiaxing', hi: 'जिआशिंग वू', de: 'Jiaxing-Wu', fr: 'Wu de Jiaxing', it: 'Wu di Jiaxing', es_eu: 'Wu de Jiaxing', es_mx: 'Wu de Jiaxing', pt_eu: 'Wu de Jiaxing', pt_br: 'Wu de Jiaxing', ru: 'Цзясинский диалект у', uk: 'Цзясинський діалект у', ar: 'لهجة جياشينغ الوو', he: 'וו ג׳יאשינג', sw: 'Kiwu cha Jiaxing' },
        yue_zs: { en: 'Zhongshan Yue', ja: '中山白話', ko: '중산백화', zh: '中山白话', yue: '中山白話', vi: 'Tiếng Trung Sơn', th: 'จงชาน', id: 'Yue Zhongshan', hi: 'झोंगशान कैंटोनी', de: 'Zhongshan-Yue', fr: 'Yue de Zhongshan', it: 'Yue di Zhongshan', es_eu: 'Yue de Zhongshan', es_mx: 'Yue de Zhongshan', pt_eu: 'Yue de Zhongshan', pt_br: 'Yue de Zhongshan', ru: 'Чжуншаньский юэ', uk: 'Чжуншаньський юе', ar: 'يوي تشونغشان', he: 'יואה ז\'ונגשאן', sw: 'Kiyue cha Zhongshan' },
        zh_cd: { en: 'Chengdu Mandarin', ja: '成都官話', ko: '청두말', zh: '成都话', yue: '成都話', vi: 'Tiếng Thành Đô', th: 'ภาษาเฉิงตู', id: 'Bahasa Mandarin Chengdu', hi: 'चेंगदू मंदारिन', de: 'Chengdu-Mandarin', fr: 'Mandarin de Chengdu', it: 'Mandarino di Chengdu', es_eu: 'Mandarín de Chengdú', es_mx: 'Mandarín de Chengdú', pt_eu: 'Mandarim de Chengdu', pt_br: 'Mandarim de Chengdu', ru: 'Чэндуский диалект', uk: 'Ченду́ський діалект', ar: 'الماندرينية التشينغدوية', he: 'מנדרינית של צ\'נגדו', sw: 'Kimandarini cha Chengdu' },
        zh_hf: { en: 'Hefei Mandarin', ja: '合肥官話', ko: '허페이 관화', zh: '合肥官话', yue: '合肥話', vi: 'Tiếng Hợp Phì', th: 'ภาษาเหอเฝย', id: 'Bahasa Hefei', hi: 'हेफ़ेई भाषा', de: 'Hefei-Chinesisch', fr: 'Chinois de Hefei', it: 'Cinese di Hefei', es_eu: 'Chino de Hefei', es_mx: 'Chino de Hefei', pt_eu: 'Chinês de Hefei', pt_br: 'Chinês de Hefei', ru: 'Хэфэйский диалект', uk: 'Хефейський діалект', ar: 'لهجة خفي', he: 'ניב חפיי', sw: 'Kihefei' },
        zh_kf: { en: 'Kaifeng Mandarin', ja: '開封官話', ko: '카이펑말', zh: '开封话', yue: '開封話', vi: 'Tiếng Khai Phong', th: 'ภาษาไคเฟิง', id: 'Bahasa Mandarin Kaifeng', hi: 'काइफ़ेंग मंदारिन', de: 'Kaifeng-Mandarin', fr: 'Mandarin de Kaifeng', it: 'Mandarino di Kaifeng', es_eu: 'Mandarín de Kaifeng', es_mx: 'Mandarín de Kaifeng', pt_eu: 'Mandarim de Kaifeng', pt_br: 'Mandarim de Kaifeng', ru: 'Кайфэнский диалект', uk: 'Кайфе́нський діалект', ar: 'الماندرينية الكايفنغية', he: 'מנדרינית של קאיפנג', sw: 'Kimandarini cha Kaifeng' },
        zh_nj: { en: 'Nanjing Mandarin', ja: '南京官話', ko: '난징말', zh: '南京话', yue: '南京話', vi: 'Tiếng Nam Kinh', th: 'ภาษาหนานจิง', id: 'Bahasa Mandarin Nanjing', hi: 'नानजिंग मंदारिन', de: 'Nanjing-Mandarin', fr: 'Mandarin de Nankin', it: 'Mandarino di Nanchino', es_eu: 'Mandarín de Nankín', es_mx: 'Mandarín de Nankín', pt_eu: 'Mandarim de Nanquim', pt_br: 'Mandarim de Nanquim', ru: 'Нанкинский диалект', uk: 'Нанкі́нський діалект', ar: 'الماندرينية النانجينغية', he: 'מנדרינית של נאנג\'ינג', sw: 'Kimandarini cha Nanjing' },
        bbl: { en: 'Bats', ja: 'バツビ語', ko: '바츠어', zh: '巴茨语', yue: '巴茨語', vi: 'Tiếng Bats', th: 'ภาษาบัตส์', id: 'Bahasa Bats', hi: 'बात्स भाषा', de: 'Batisch', fr: 'Bats', it: 'Bats', es_eu: 'Bats', es_mx: 'Bats', pt_eu: 'Bats', pt_br: 'Bats', ru: 'Бацбийский язык', uk: 'Бацбійська мова', ar: 'الباتسية', he: 'באצית', sw: 'Kibats' },
        bzg: { en: 'Babuza (Favorlang)', ja: 'バブザ語（フェルラング）', ko: '바부자어(파보를랑)', zh: '巴布薩語（華武壠）', yue: '巴布薩語（華武壠）', vi: 'Tiếng Babuza (Favorlang)', th: 'ภาษาบาบูซา', id: 'Bahasa Babuza', hi: 'बाबूज़ा भाषा', de: 'Babuza (Favorlang)', fr: 'babuza (favorlang)', it: 'babuza (favorlang)', es_eu: 'babuza (favorlang)', es_mx: 'babuza (favorlang)', pt_eu: 'babuza (favorlang)', pt_br: 'babuza (favorlang)', ru: 'бабуза (фаворланг)', uk: 'бабуза (фаворланг)', ar: 'البابوزا (فافورلانغ)', he: 'בּאבּוּזה', sw: 'Kibabuza' },
        dru: { en: 'Rukai', ja: 'ルカイ語', ko: '루카이어', zh: '鲁凯语', yue: '魯凱話', vi: 'Tiếng Rukai', th: 'ภาษารูไก', id: 'Bahasa Rukai', hi: 'रुकाई', de: 'Rukai', fr: 'Rukai', it: 'Rukai', es_eu: 'Rukai', es_mx: 'Rukai', pt_eu: 'Rukai', pt_br: 'Rukai', ru: 'Рукай', uk: 'Рукай', ar: 'الروكاي', he: 'רוקאית', sw: 'Kirukai' },
        hup: { en: 'Hupa', ja: 'フーパ語', ko: '후파어', zh: '胡帕语', yue: '胡帕語', vi: 'Tiếng Hupa', th: 'ภาษาฮูปา', id: 'Bahasa Hupa', hi: 'हूपा भाषा', de: 'Hupa', fr: 'Hupa', it: 'Hupa', es_eu: 'Hupa', es_mx: 'Hupa', pt_eu: 'Hupa', pt_br: 'Hupa', ru: 'Хупа', uk: 'Хупа', ar: 'الهوبا', he: 'הוּפָּה', sw: 'Kihupa' },
        kfa: { en: 'Kodava', ja: 'コダヴァ語', ko: '코다바어', zh: '科达瓦语', yue: '科達瓦語', vi: 'Tiếng Kodava', th: 'ภาษาโกฑวะ', id: 'Bahasa Kodava', hi: 'कोडव', de: 'Kodava', fr: 'Kodava', it: 'Kodava', es_eu: 'Kodava', es_mx: 'Kodava', pt_eu: 'Kodava', pt_br: 'Kodava', ru: 'Кодава', uk: 'Кодава', ar: 'الكودافية', he: 'קודאווה', sw: 'Kikodava' },
        kfr: { en: 'Kachhi', ja: 'カッチー語', ko: '카치어', zh: '卡奇语', yue: '卡奇話', vi: 'Tiếng Kachhi', th: 'ภาษากัจฉี', id: 'Bahasa Kachhi', hi: 'कच्छी', de: 'Kachchi', fr: 'Kutchi', it: 'Kutchi', es_eu: 'Kachi', es_mx: 'Kachi', pt_eu: 'Kachhi', pt_br: 'Kachhi', ru: 'Каччхи', uk: 'Каччхі', ar: 'الكاتشية', he: 'קצ׳י', sw: 'Kikachhi' },
        kry: { en: 'Kryts', ja: 'クリッツ語', ko: '크리츠어', zh: '克里茨语', yue: '克里茨話', vi: 'Tiếng Kryts', th: 'ภาษาคริซ', id: 'Bahasa Kryts', hi: 'क्रिज़', de: 'Kryz', fr: 'Kryz', it: 'Kryz', es_eu: 'Kryz', es_mx: 'Kryz', pt_eu: 'Kryz', pt_br: 'Kryz', ru: 'Крызский', uk: 'Кризька', ar: 'قريصية', he: 'קריצית', sw: 'Kikryz' },
        lrr: { en: 'Southern Luri', ja: '南ロル語', ko: '남부 로르어', zh: '南洛尔语', yue: '南洛爾話', vi: 'Tiếng Luri Nam', th: 'ภาษาลูรีใต้', id: 'Bahasa Luri Selatan', hi: 'दक्षिणी लुरी', de: 'Süd-Luri', fr: 'Lori du Sud', it: 'Luri meridionale', es_eu: 'Luri meridional', es_mx: 'Luri meridional', pt_eu: 'Luri meridional', pt_br: 'Luri meridional', ru: 'Южнолурский', uk: 'Південнолурська', ar: 'لورية جنوبية', he: 'לורית דרומית', sw: 'Kiluri cha Kusini' },
        osc: { en: 'Oscan', ja: 'オスク語', ko: '오스크어', zh: '奧斯坎語', yue: '奧斯坎語', vi: 'Tiếng Osca', th: 'ภาษาออสคัน', id: 'Bahasa Oska', hi: 'ओस्कन भाषा', de: 'Oskisch', fr: 'osque', it: 'osco', es_eu: 'osco', es_mx: 'osco', pt_eu: 'osco', pt_br: 'osco', ru: 'оскский язык', uk: 'оскська мова', ar: 'الأوسكية', he: 'אוֹסְקִית', sw: 'Kioska' },
        pkp: { en: 'Pukapukan', ja: 'プカプカ語', ko: '푸카푸카어', zh: '普卡普卡语', yue: '普卡普卡話', vi: 'Tiếng Pukapuka', th: 'ภาษาปูกาปูกา', id: 'Bahasa Pukapuka', hi: 'पुकापुकन', de: 'Pukapukanisch', fr: 'Pukapukan', it: 'Pukapukano', es_eu: 'Pukapukano', es_mx: 'Pukapukano', pt_eu: 'Pukapukano', pt_br: 'Pukapukano', ru: 'Пукапука', uk: 'Пукапуканська', ar: 'البوكابوكية', he: 'פוקאפוקאית', sw: 'Kipukapuka' },
        qxq: { en: 'Qashqai', ja: 'カシュガイ語', ko: '카슈카이어', zh: '卡什加伊语', yue: '卡什加伊話', vi: 'Tiếng Qashqai', th: 'ภาษาคัชไค', id: 'Bahasa Qashqai', hi: 'क़श्क़ाई', de: 'Kaschkaisch', fr: 'Qashqaï', it: 'Qashqai', es_eu: 'Qashqai', es_mx: 'Qashqai', pt_eu: 'Qashqai', pt_br: 'Qashqai', ru: 'Кашкайский', uk: 'Кашкайська', ar: 'قشقائية', he: 'קשקאית', sw: 'Kiqashqai' },
        wls: { en: 'Wallisian', ja: 'ウォリス語', ko: '월리스어', zh: '瓦利斯语', yue: '瓦利斯話', vi: 'Tiếng Wallis', th: 'ภาษาวอลลิส', id: 'Bahasa Wallis', hi: 'वालिसी', de: 'Wallisianisch', fr: 'Wallisien', it: 'Wallisiano', es_eu: 'Wallisiano', es_mx: 'Wallisiano', pt_eu: 'Wallisiano', pt_br: 'Walisiano', ru: 'Уоллисский', uk: 'Уоллісійська', ar: 'الواليسية', he: 'ואליסית', sw: 'Kiwallis' },
        yug: { en: 'Yugh', ja: 'ユグ語', ko: '유그어', zh: '尤格语', yue: '尤格語', vi: 'Tiếng Yugh', th: 'ภาษายุค', id: 'Bahasa Yugh', hi: 'युग भाषा', de: 'Jugisch', fr: 'Yougue', it: 'Yugh', es_eu: 'Yugh', es_mx: 'Yugh', pt_eu: 'Yugh', pt_br: 'Iugue', ru: 'Югский язык', uk: 'Юзька мова', ar: 'اليوغية', he: 'יוּגית', sw: 'Kiyugh' },
        aau: { en: 'Abau', ja: 'アバウ語', ko: '아바우어', zh: '阿包语', yue: '阿包語', vi: 'Tiếng Abau', th: 'ภาษาอาเบา', id: 'Bahasa Abau', hi: 'अबाउ', de: 'Abau', fr: 'Abau', it: 'Abau', es_eu: 'Abau', es_mx: 'Abau', pt_eu: 'Abau', pt_br: 'Abau', ru: 'Абау', uk: 'Абау', ar: 'الأباوية', he: 'אבאו', sw: 'Kiabau' },
        ani: { en: 'Andi', ja: 'アンディ語', ko: '안디어', zh: '安迪语', yue: '安迪語', vi: 'Tiếng Andi', th: 'ภาษาอันดี', id: 'Bahasa Andi', hi: 'अंदी भाषा', de: 'Andisch', fr: 'Andi', it: 'Andi', es_eu: 'Andi', es_mx: 'Andi', pt_eu: 'Andi', pt_br: 'Andi', ru: 'Андийский язык', uk: 'Андійська мова', ar: 'الأندية', he: 'אנדית', sw: 'Kiandi' },
        bdk: { en: 'Budukh', ja: 'ブドゥフ語', ko: '부두흐어', zh: '布杜赫语', yue: '布杜赫語', vi: 'Tiếng Budukh', th: 'ภาษาบูดูค', id: 'Bahasa Budukh', hi: 'बुदुख भाषा', de: 'Budukhisch', fr: 'Budoukh', it: 'Budukh', es_eu: 'Budukh', es_mx: 'Budukh', pt_eu: 'Budukh', pt_br: 'Budukh', ru: 'Будухский язык', uk: 'Будуська мова', ar: 'البوضخية', he: 'בודוכית', sw: 'Kibudukh' },
        bvu: { en: 'Bukar-Sadong Bidayuh', ja: 'ブカル＝サドン・ビダユ語', ko: '부카르사동 비다유어', zh: '布卡尔—萨东比达友语', yue: '布卡爾—薩東比達友語', vi: 'Tiếng Bidayuh Bukar-Sadong', th: 'ภาษาบีดายูห์บูการ์-ซาดง', id: 'Bahasa Bidayuh Bukar-Sadong', hi: 'बुकर-सादोंग बिदायुह', de: 'Bukar-Sadong-Bidayuh', fr: 'bidayuh bukar-sadong', it: 'bidayuh bukar-sadong', es_eu: 'bidayuh bukar-sadong', es_mx: 'bidayuh bukar-sadong', pt_eu: 'bidayuh bukar-sadong', pt_br: 'bidayuh bukar-sadong', ru: 'Букар-садонг бидаю', uk: 'Букар-садонг бідаю', ar: 'لغة البيدايوه بوكار-سادونغ', he: 'בידאיוּה בוקאר-סאדונג', sw: 'Kibidayuh-Bukar' },
        dbl: { en: 'Dyirbal', ja: 'ジルバル語', ko: '지르발어', zh: '迪尔巴尔语', yue: '迪爾巴爾語', vi: 'Tiếng Dyirbal', th: 'ภาษาเดียร์บัล', id: 'Bahasa Dyirbal', hi: 'दिर्बल भाषा', de: 'Dyirbal', fr: 'Dyirbal', it: 'Dyirbal', es_eu: 'Dyirbal', es_mx: 'Dyirbal', pt_eu: 'Dyirbal', pt_br: 'Dyirbal', ru: 'Дьирбал', uk: 'Дьїрбал', ar: 'الديربالية', he: 'דירבל', sw: 'Kidyirbal' },
        dgr: { en: 'Guernésiais', ja: 'ゲルネジエ語', ko: '게르네지에어', zh: '格恩西诺曼语', yue: '格恩西諾曼語', vi: 'Tiếng Guernésiais', th: 'ภาษาแกร์เนซีแยส์', id: 'Bahasa Guernésiais', hi: 'गर्न्जी नॉर्मन भाषा', de: 'Guernésiais', fr: 'Guernesiais', it: 'Guernesiais', es_eu: 'Guernesiais', es_mx: 'Guernesiais', pt_eu: 'Guernesiais', pt_br: 'Guernesiais', ru: 'Гернсийский язык', uk: 'Гернсійська мова', ar: 'اللغة الغيرنزية', he: 'גרנזיאית', sw: 'Kiguernésiais' },
        fra_jer: { en: 'Jèrriais', ja: 'ジェリエ語', ko: '저리에어', zh: '泽西诺曼语', yue: '澤西諾曼語', vi: 'Tiếng Jèrriais', th: 'ภาษาเฌร์รีแยส์', id: 'Bahasa Jèrriais', hi: 'जर्सी नॉर्मन भाषा', de: 'Jèrriais', fr: 'Jersiais', it: 'Jersiais', es_eu: 'Jersiais', es_mx: 'Jersiais', pt_eu: 'Jersiais', pt_br: 'Jersiais', ru: 'Джерсийский язык', uk: 'Джерсійська мова', ar: 'اللغة الجيرسية', he: 'ג׳רסיאית', sw: 'Kijèrriais' },
        gsw_w: { en: 'Walliser German', ja: 'ヴァリス・ドイツ語', ko: '발리저 독일어', zh: '瓦莱州德语', yue: '瓦萊州德語', vi: 'Tiếng Đức Wallis', th: 'ภาษาเยอรมันวัลลิส', id: 'Bahasa Jerman Wallis', hi: 'वालिसी जर्मन', de: 'Walliserdeutsch', fr: 'Allemand valaisan', it: 'Tedesco vallesano', es_eu: 'Alemán valesano', es_mx: 'Alemán valesano', pt_eu: 'Alemão valesano', pt_br: 'Alemão valesano', ru: 'Валлисский немецкий', uk: 'Валліський німецький', ar: 'الألمانية الفاليسية', he: 'גרמנית ואלזית', sw: 'Kijerumani cha Wallis' },
        huz: { en: 'Hunzib', ja: 'ガンジブ語', ko: '훈집어', zh: '洪兹布语', yue: '洪茲布語', vi: 'Tiếng Hunzib', th: 'ภาษาฮุนซิบ', id: 'Bahasa Hunzib', hi: 'हुंज़िब भाषा', de: 'Hunsibisch', fr: 'Hunzib', it: 'Hunzib', es_eu: 'Hunzib', es_mx: 'Hunzib', pt_eu: 'Hunzib', pt_br: 'Hunzib', ru: 'Гунзибский', uk: 'Гунзибська', ar: 'الهنزيبية', he: 'הונזיב', sw: 'Kihunzib' },
        khv: { en: 'Khvarshi', ja: 'フヴァルシ語', ko: '흐바르시어', zh: '赫瓦尔什语', yue: '赫瓦爾什語', vi: 'Tiếng Khvarshi', th: 'ภาษาควาร์ชี', id: 'Bahasa Khvarshi', hi: 'ख्वारशी भाषा', de: 'Chwarschisch', fr: 'Khvarshi', it: 'Khvarshi', es_eu: 'Jvarshi', es_mx: 'Jvarshi', pt_eu: 'Khvarshi', pt_br: 'Khvarshi', ru: 'Хваршинский', uk: 'Хваршинська', ar: 'الخفارشية', he: 'חוורשי', sw: 'Kikhvarshi' },
        kjj: { en: 'Khinalug', ja: 'ヒナルグ語', ko: '키날룩어', zh: '希纳卢格语', yue: '希納盧格語', vi: 'Tiếng Khinalug', th: 'ภาษาคีนาลุก', id: 'Bahasa Khinalug', hi: 'खिनालुग भाषा', de: 'Chinalug', fr: 'Khinalug', it: 'Chinalug', es_eu: 'Jinalug', es_mx: 'Jinalug', pt_eu: 'Khinalug', pt_br: 'Khinalug', ru: 'Хиналугский', uk: 'Хіналузька', ar: 'الخينالوغية', he: 'חינאלוגית', sw: 'Kikhinalug' },
        kpf: { en: 'Komba', ja: 'コンバ語', ko: '콤바어', zh: '孔巴语', yue: '孔巴語', vi: 'Tiếng Komba', th: 'ภาษากอมบา', id: 'Bahasa Komba', hi: 'कोम्बा', de: 'Komba', fr: 'Komba', it: 'Komba', es_eu: 'Komba', es_mx: 'Komba', pt_eu: 'Komba', pt_br: 'Komba', ru: 'Комба', uk: 'Комба', ar: 'كومبا', he: 'קומבה', sw: 'Kikomba' },
        kqz: { en: 'Korana', ja: 'コラナ語', ko: '코라나어', zh: '科拉纳语', yue: '科拉納語', vi: 'Tiếng Korana', th: 'ภาษาโครานา', id: 'Bahasa Korana', hi: 'कोराना भाषा', de: 'Korana', fr: 'Korana', it: 'Korana', es_eu: 'Korana', es_mx: 'Korana', pt_eu: 'Corana', pt_br: 'Corana', ru: 'Корана', uk: 'Корана', ar: 'لغة كورانا', he: 'קוראנה', sw: 'Kikorana' },
        ktz: { en: 'Juǀ\'hoan', ja: 'ジュホアン語', ko: '주호안어', zh: '朱乎安语', yue: '朱乎安語', vi: 'Tiếng Juǀhoan', th: 'ภาษาจูฮวน', id: 'Bahasa Juǀhoan', hi: 'जूहोआन भाषा', de: 'Juǀʼhoan', fr: 'Juǀʼhoan', it: 'Juǀʼhoan', es_eu: 'Juǀʼhoan', es_mx: 'Juǀʼhoan', pt_eu: 'Juǀʼhoan', pt_br: 'Juǀʼhoan', ru: 'Жуцхоан', uk: 'Жуцхоан', ar: 'اللغة الجوهوان', he: 'ז\'והואן', sw: 'Kijuhoan' },
        kxv: { en: 'Kuvi', ja: 'クヴィ語', ko: '쿠비어', zh: '库维语', yue: '庫維語', vi: 'Tiếng Kuvi', th: 'ภาษากูวี', id: 'Bahasa Kuvi', hi: 'कुवी', de: 'Kuvi', fr: 'kuvi', it: 'kuvi', es_eu: 'kuvi', es_mx: 'kuvi', pt_eu: 'kuvi', pt_br: 'kuvi', ru: 'Куви', uk: 'Куві', ar: 'لغة الكوفي', he: 'קוּבי', sw: 'Kikuvi' },
        lhm: { en: 'Lhomi', ja: 'ロミ語', ko: '로미어', zh: '洛米语', yue: '洛米語', vi: 'Tiếng Lhomi', th: 'ภาษาโลมี', id: 'Bahasa Lhomi', hi: 'लोमी भाषा', de: 'Lhomi', fr: 'lhomi', it: 'lhomi', es_eu: 'lhomi', es_mx: 'lhomi', pt_eu: 'lhomi', pt_br: 'lhomi', ru: 'ломи', uk: 'ломі', ar: 'اللومية', he: 'לומי', sw: 'Kilhomi' },
        lij_t: { en: 'Tabarchino', ja: 'タバルキーノ語', ko: '타바르키노어', zh: '塔巴尔基诺语', yue: '塔巴爾基諾語', vi: 'Tiếng Tabarchino', th: 'ภาษาตาบาร์กีโน', id: 'Bahasa Tabarchino', hi: 'ताबारकीनो', de: 'Tabarchino', fr: 'Tabarquin', it: 'Tabarchino', es_eu: 'Tabarquino', es_mx: 'Tabarquino', pt_eu: 'Tabarquino', pt_br: 'Tabarquino', ru: 'Табаркинский', uk: 'Табаркинська', ar: 'التاباركينية', he: 'טברקינו', sw: 'Kitabarchino' },
        mcf: { en: 'Matsés', ja: 'マツェス語', ko: '마체스어', zh: '马采斯语', yue: '馬采斯語', vi: 'Tiếng Matsés', th: 'ภาษามัตเซส', id: 'Bahasa Matsés', hi: 'मात्सेस भाषा', de: 'Matsés', fr: 'matsés', it: 'matsés', es_eu: 'matsés', es_mx: 'matsés', pt_eu: 'matsés', pt_br: 'matsés', ru: 'Матсес', uk: 'Матсес', ar: 'لغة الماتسيس', he: 'מאטסס', sw: 'Kimatsés' },
        mkz: { en: 'Makasae', ja: 'マカサエ語', ko: '마카사에어', zh: '马卡赛语', yue: '馬卡賽語', vi: 'Tiếng Makasae', th: 'ภาษามาคาไซ', id: 'Bahasa Makasae', hi: 'मकासाई', de: 'Makasae', fr: 'Makasaé', it: 'Makasae', es_eu: 'Makasae', es_mx: 'Makasae', pt_eu: 'Makasae', pt_br: 'Makasae', ru: 'Макасае', uk: 'Макасае', ar: 'الماكاساي', he: 'מקסאה', sw: 'Kimakasae' },
        mpj: { en: 'Martu Wangka', ja: 'マルトゥ・ワンカ語', ko: '마르투 왕카어', zh: '马尔图旺卡语', yue: '馬爾圖旺卡語', vi: 'Tiếng Martu Wangka', th: 'ภาษามาร์ตูวังกา', id: 'Bahasa Martu Wangka', hi: 'मार्तु वांका', de: 'Martu Wangka', fr: 'Martu wangka', it: 'Martu wangka', es_eu: 'Martu wangka', es_mx: 'Martu wangka', pt_eu: 'Martu wangka', pt_br: 'Martu wangka', ru: 'Марту-ванка', uk: 'Марту-ванка', ar: 'مارتو وانغكا', he: 'מארטו ואנגקה', sw: 'Kimartu Wangka' },
        oar: { en: 'Old Aramaic', ja: '古アラム語', ko: '고대 아람어', zh: '古亚拉姆语', yue: '古亞拉姆語', vi: 'Tiếng Aram cổ', th: 'ภาษาอารามิกโบราณ', id: 'Bahasa Aram Kuno', hi: 'पुरातनी अरामी भाषा', de: 'Altaramäisch', fr: 'Araméen ancien', it: 'Aramaico antico', es_eu: 'Arameo antiguo', es_mx: 'Arameo antiguo', pt_eu: 'Aramaico antigo', pt_br: 'Aramaico antigo', ru: 'Древнеарамейский язык', uk: 'Давньоарамейська мова', ar: 'الآرامية القديمة', he: 'ארמית עתיקה', sw: 'Kiaramu cha Kale' },
        pao: { en: 'Northern Paiute', ja: '北パイユート語', ko: '북부 파이우트어', zh: '北派尤特语', yue: '北派尤特語', vi: 'Tiếng Paiute Bắc', th: 'ภาษาไพยูตเหนือ', id: 'Bahasa Paiute Utara', hi: 'उत्तरी पाइयूट', de: 'Nord-Paiute', fr: 'paiute du Nord', it: 'paiute settentrionale', es_eu: 'paiute septentrional', es_mx: 'paiute del norte', pt_eu: 'paiute setentrional', pt_br: 'paiute do norte', ru: 'северный пайют', uk: 'північна паютська', ar: 'البايوتية الشمالية', he: 'פאיוטית צפונית', sw: 'Kipaiute cha Kaskazini' },
        rut: { en: 'Rutul', ja: 'ルトゥル語', ko: '루툴어', zh: '鲁图尔语', yue: '魯圖爾語', vi: 'Tiếng Rutul', th: 'ภาษารูตูล', id: 'Bahasa Rutul', hi: 'रुतुल भाषा', de: 'Rutulisch', fr: 'Routoul', it: 'Rutulo', es_eu: 'Rutul', es_mx: 'Rutul', pt_eu: 'Rutul', pt_br: 'Rutul', ru: 'Рутульский язык', uk: 'Рутульська мова', ar: 'الروتولية', he: 'רוטולית', sw: 'Kirutul' },
        tof: { en: 'Tofa', ja: 'トファ語', ko: '토파어', zh: '托法语', yue: '托法語', vi: 'Tiếng Tofa', th: 'ภาษาโตฟา', id: 'Bahasa Tofa', hi: 'तोफ़ा भाषा', de: 'Tofa', fr: 'tofalar', it: 'tofa', es_eu: 'tofa', es_mx: 'tofa', pt_eu: 'tofa', pt_br: 'tofa', ru: 'тофаларский', uk: 'тофаларська', ar: 'التوفية', he: 'טופה', sw: 'Kitofa' },
        tup: { en: 'Tupinambá', ja: 'トゥピナンバ語', ko: '투피남바어', zh: '图皮南巴语', yue: '圖皮南巴語', vi: 'Tiếng Tupinambá', th: 'ภาษาตูปีนัมบา', id: 'Bahasa Tupinambá', hi: 'तुपीनम्बा', de: 'Tupinambá', fr: 'Tupinambá', it: 'Tupinambá', es_eu: 'Tupinambá', es_mx: 'Tupinambá', pt_eu: 'Tupinambá', pt_br: 'Tupinambá', ru: 'Тупинамба', uk: 'Тупінамба', ar: 'التوبينامبا', he: 'טופינמבה', sw: 'Kitupinamba' },
        uln: { en: 'Unserdeutsch', ja: 'ウンザードイチュ', ko: '운저도이치', zh: '我们的德语', yue: '我哋德語', vi: 'Tiếng Unserdeutsch', th: 'อุนเซอร์ดอยช์', id: 'Bahasa Unserdeutsch', hi: 'उन्ज़र्डॉयच', de: 'Unserdeutsch', fr: 'Unserdeutsch (créole germano-rabaulais)', it: 'Unserdeutsch', es_eu: 'Unserdeutsch', es_mx: 'Unserdeutsch', pt_eu: 'Unserdeutsch', pt_br: 'Unserdeutsch', ru: 'Унзердойч', uk: 'Унзердойч', ar: 'أُنزردويتش', he: 'אונזרדויטש', sw: 'Kiunserdeutsch' },
        wmt: { en: 'Walmajarri', ja: 'ワルマジャリ語', ko: '왈마자리어', zh: '瓦尔马贾里语', yue: '瓦爾馬賈里語', vi: 'Tiếng Walmajarri', th: 'ภาษาวัลมาจาร์รี', id: 'Bahasa Walmajarri', hi: 'वालमजरी भाषा', de: 'Walmajarri', fr: 'Walmajarri', it: 'Walmajarri', es_eu: 'Walmajarri', es_mx: 'Walmajarri', pt_eu: 'Walmajarri', pt_br: 'Walmajarri', ru: 'Валмаджарри', uk: 'Валмаджаррі', ar: 'الوالماجارية', he: 'ואלמג׳ארי', sw: 'Kiwalmajarri' },
        wuu_hz: { en: 'Hangzhou Wu', ja: '杭州呉語', ko: '항저우 우어', zh: '杭州话', yue: '杭州話', vi: 'Tiếng Hàng Châu', th: 'ภาษาหังโจว', id: 'Bahasa Wu Hangzhou', hi: 'हांगज़ौ वू', de: 'Hangzhou-Wu', fr: 'Wu de Hangzhou', it: 'Wu di Hangzhou', es_eu: 'Wu de Hangzhou', es_mx: 'Wu de Hangzhou', pt_eu: 'Uu de Hangzhou', pt_br: 'Uu de Hangzhou', ru: 'Ханчжоуский у', uk: 'Ханчжоуська у', ar: 'لهجة هانغتشو الووّية', he: 'וו של האנגג׳ואו', sw: 'Kihangzhou (Wu)' },
        xag: { en: 'Caucasian Albanian', ja: 'カフカース・アルバニア語', ko: '캅카스 알바니아어', zh: '高加索阿尔巴尼亚语', yue: '高加索阿爾巴尼亞語', vi: 'Tiếng Albania Kavkaz', th: 'ภาษาแอลเบเนียคอเคซัส', id: 'Bahasa Albania Kaukasia', hi: 'कॉकेशियन अल्बानियाई', de: 'Kaukasisch-Albanisch', fr: 'Albanien du Caucase', it: 'Albanese caucasico', es_eu: 'Albanés caucásico', es_mx: 'Albanés caucásico', pt_eu: 'Albanês caucásico', pt_br: 'Albanês caucasiano', ru: 'Кавказско-албанский', uk: 'Кавказько-албанська', ar: 'الألبانية القوقازية', he: 'אלבנית קווקזית', sw: 'Kialbania cha Kaukasia' },
        xfa: { en: 'Faliscan', ja: 'ファリスク語', ko: '팔리스크어', zh: '法利斯坎语', yue: '法利斯坎語', vi: 'Tiếng Falisca', th: 'ภาษาฟาลิสกัน', id: 'Bahasa Faliska', hi: 'फालिस्की', de: 'Faliskisch', fr: 'Falisque', it: 'Falisco', es_eu: 'Falisco', es_mx: 'Falisco', pt_eu: 'Falisco', pt_br: 'Falisco', ru: 'Фалискский', uk: 'Фаліскська', ar: 'الفاليسكية', he: 'פליסקית', sw: 'Kifaliska' },
        xib: { en: 'Iberian', ja: 'イベリア語', ko: '이베리아어', zh: '伊比利亚语', yue: '伊比利亞語', vi: 'Tiếng Iberia', th: 'ภาษาไอบีเรีย', id: 'Bahasa Iberia', hi: 'इबेरियन भाषा', de: 'Iberisch', fr: 'Ibère', it: 'Iberico', es_eu: 'Ibero', es_mx: 'Ibero', pt_eu: 'Ibérico', pt_br: 'Ibérico', ru: 'Иберский', uk: 'Іберська', ar: 'الإيبيرية', he: 'איברית', sw: 'Kiiberia' },
        xli: { en: 'Liburnian', ja: 'リブルニア語', ko: '리부르니아어', zh: '利布尔尼亚语', yue: '利布爾尼亞語', vi: 'Tiếng Liburnia', th: 'ภาษาลิเบอร์เนีย', id: 'Bahasa Liburnia', hi: 'लिबर्नियन भाषा', de: 'Liburnisch', fr: 'Liburne', it: 'Liburnico', es_eu: 'Liburnio', es_mx: 'Liburnio', pt_eu: 'Liburnio', pt_br: 'Libúrnio', ru: 'Либурнский', uk: 'Лібурнська', ar: 'اللبرنية', he: 'ליבורנית', sw: 'Kiliburnia' },
        xpg: { en: 'Phrygian', ja: 'フリュギア語', ko: '프리기아어', zh: '弗里吉亚语', yue: '弗里吉亞語', vi: 'Tiếng Phrygia', th: 'ภาษาฟริเจีย', id: 'Bahasa Frigia', hi: 'फ़्रिजियन भाषा', de: 'Phrygisch', fr: 'Phrygien', it: 'Frigio', es_eu: 'Frigio', es_mx: 'Frigio', pt_eu: 'Frígio', pt_br: 'Frígio', ru: 'Фригийский язык', uk: 'Фрігійська мова', ar: 'اللغة الفريجية', he: 'פריגית', sw: 'Kifrigia' },
        xum: { en: 'Umbrian', ja: 'ウンブリア語', ko: '움브리아어', zh: '翁布里亚语', yue: '翁布里亞語', vi: 'Tiếng Umbria', th: 'ภาษาอุมเบรีย', id: 'Bahasa Umbria', hi: 'अम्ब्रियाई', de: 'Umbrisch', fr: 'Ombrien', it: 'Umbro', es_eu: 'Umbro', es_mx: 'Umbro', pt_eu: 'Úmbrio', pt_br: 'Úmbrio', ru: 'Умбрский', uk: 'Умбрська', ar: 'الأومبرية', he: 'אומברית', sw: 'Kiumbria' },
        xve: { en: 'Venetic', ja: 'ヴェネト語', ko: '베네티어', zh: '威尼托语', yue: '威尼托語', vi: 'Tiếng Veneti', th: 'ภาษาเวเนติก', id: 'Bahasa Venetik', hi: 'वेनेटिक', de: 'Venetisch', fr: 'Vénète', it: 'Venetico', es_eu: 'Venético', es_mx: 'Venético', pt_eu: 'Venético', pt_br: 'Venético', ru: 'Венетский', uk: 'Венетська', ar: 'الفينيتية', he: 'ונטית', sw: 'Kiveneti' },
        yle: { en: 'Yele', ja: 'イェリ・ドニェ語', ko: '예리 드녜어', zh: '耶利德涅语', yue: '耶利德涅語', vi: 'Tiếng Yele', th: 'ภาษาเยลี', id: 'Bahasa Yele', hi: 'येले', de: 'Yele', fr: 'Yele', it: 'Yele', es_eu: 'Yele', es_mx: 'Yele', pt_eu: 'Yele', pt_br: 'Yele', ru: 'Йеле', uk: 'Єле', ar: 'اليلية', he: 'ילה', sw: 'Kiyele' },
        yue_dg: { en: 'Dongguan Yue', ja: '東莞粤語', ko: '둥관 광둥어', zh: '东莞粤语', yue: '東莞粵語', vi: 'Tiếng Quảng Đông Đông Hoản', th: 'ภาษากวางตุ้งตงก่วน', id: 'Bahasa Yue Dongguan', hi: 'दोङगुआन क्वांगतुंगी', de: 'Dongguan-Yue', fr: 'Yue de Dongguan', it: 'Yue di Dongguan', es_eu: 'Yue de Dongguan', es_mx: 'Yue de Dongguan', pt_eu: 'Yue de Dongguan', pt_br: 'Yue de Dongguan', ru: 'Дунгуаньский юэ', uk: 'Дунгуаньський юе', ar: 'يوي دونغ‌غوان', he: 'יוּ של דונגגואן', sw: 'Kiyue cha Dongguan' },
        yue_nn: { en: 'Nanning Yue', ja: '南寧白話', ko: '난닝 백화', zh: '南宁白话', yue: '南寧白話', vi: 'Tiếng Bạch thoại Nam Ninh', th: 'ภาษาไป๋ฮว่าหนานหนิง', id: 'Baihua Nanning', hi: 'नानिङ बाइहुआ', de: 'Nanning-Yue', fr: 'Yue de Nanning', it: 'Yue di Nanning', es_eu: 'Yue de Nanning', es_mx: 'Yue de Nanning', pt_eu: 'Yue de Nanning', pt_br: 'Yue de Nanning', ru: 'Наньнинский байхуа', uk: 'Наньнінський байхуа', ar: 'بايهوا نانينغ', he: 'בייהואה של ננינג', sw: 'Kibaihua cha Nanning' },
        zh_cq: { en: 'Chongqing Mandarin', ja: '重慶官話', ko: '충칭 관화', zh: '重庆官话', yue: '重慶官話', vi: 'Quan thoại Trùng Khánh', th: 'ภาษาแมนดารินฉงชิ่ง', id: 'Bahasa Mandarin Chongqing', hi: 'छोंगछिंग मंदारिन', de: 'Chongqing-Mandarin', fr: 'Mandarin de Chongqing', it: 'Mandarino di Chongqing', es_eu: 'Mandarín de Chongqing', es_mx: 'Mandarín de Chongqing', pt_eu: 'Mandarim de Chongqing', pt_br: 'Mandarim de Chongqing', ru: 'Чунцинский мандарин', uk: 'Чунцинський мандарин', ar: 'مندرين تشونغتشينغ', he: 'מנדרינית צ׳ונגצ׳ינג', sw: 'Kimandarini cha Chongqing' },
        zh_jn: { en: 'Jinan Mandarin', ja: '済南官話', ko: '지난 관화', zh: '济南官话', yue: '濟南官話', vi: 'Quan thoại Tế Nam', th: 'ภาษาแมนดารินจี่หนาน', id: 'Bahasa Mandarin Jinan', hi: 'जिनान मंदारिन', de: 'Jinan-Mandarin', fr: 'Mandarin de Jinan', it: 'Mandarino di Jinan', es_eu: 'Mandarín de Jinan', es_mx: 'Mandarín de Jinan', pt_eu: 'Mandarim de Jinan', pt_br: 'Mandarim de Jinan', ru: 'Цзинаньский мандарин', uk: 'Цзінаньський мандарин', ar: 'مندرين جينان', he: 'מנדרינית ג׳ינאן', sw: 'Kimandarini cha Jinan' },
        zh_km: { en: 'Kunming Mandarin', ja: '昆明官話', ko: '쿤밍 관화', zh: '昆明话', yue: '昆明話', vi: 'Quan thoại Côn Minh', th: 'ภาษาแมนดารินคุนหมิง', id: 'Bahasa Mandarin Kunming', hi: 'कुनमिंग मंदारिन', de: 'Kunming-Mandarin', fr: 'Mandarin de Kunming', it: 'Mandarino di Kunming', es_eu: 'Mandarín de Kunming', es_mx: 'Mandarín de Kunming', pt_eu: 'Mandarim de Kunming', pt_br: 'Mandarim de Kunming', ru: 'Куньминский мандарин', uk: 'Куньмінський мандарин', ar: 'مندرين كونمينغ', he: 'מנדרינית קונמינג', sw: 'Kimandarin cha Kunming' },
        zh_xa: { en: 'Xi\'an Mandarin', ja: '西安官話', ko: '시안 관화', zh: '西安话', yue: '西安話', vi: 'Quan thoại Tây An', th: 'ภาษาแมนดารินซีอาน', id: 'Bahasa Mandarin Xi\'an', hi: 'शीआन मंदारिन', de: 'Xi\'an-Mandarin', fr: 'Mandarin de Xi\'an', it: 'Mandarino di Xi\'an', es_eu: 'Mandarín de Xi\'an', es_mx: 'Mandarín de Xi\'an', pt_eu: 'Mandarim de Xi\'an', pt_br: 'Mandarim de Xi\'an', ru: 'Сианьский мандарин', uk: 'Сіаньський мандарин', ar: 'مندرين شيآن', he: 'מנדרינית שיאן', sw: 'Kimandarin cha Xi\'an' },
        wba: { en: 'Warao', ja: 'ワラオ語', ko: '와라오어', zh: '瓦劳语', yue: '瓦勞語',
               vi: 'Tiếng Warao', th: 'ภาษาวาราโอ', id: 'Bahasa Warao', hi: 'वाराओ',
               de: 'Warao', fr: 'Warao', it: 'Warao',
               es_eu: 'Warao', es_mx: 'Warao', pt_eu: 'Warao', pt_br: 'Warao',
               ru: 'Варао', uk: 'Варао', ar: 'الواراو', he: 'ווראו', sw: 'Kiwarao' },
    };
    for (const code of Object.keys(ADDED39)) {
        for (const ui of Object.keys(ADDED39[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED39[code][ui];
            }
        }
    }

    const ADDED40 = {
        sjd: { en: 'Kildin Sámi', ja: 'キルディン・サーミ語', ko: '킬딘 사미어', zh: '希尔丁萨米语', yue: '希爾丁薩米語',
               vi: 'Tiếng Sami Kildin', th: 'ภาษาซามีคิลดิน', id: 'Sami Kildin', hi: 'किल्डिन सामी',
               de: 'Kildinsamisch', fr: 'Same de Kildin', it: 'Sami di Kildin',
               es_eu: 'Sami de Kildin', es_mx: 'Sami de Kildin', pt_eu: 'Sami de Kildin', pt_br: 'Sami de Kildin',
               ru: 'Кильдинский саамский', uk: 'Кільдинська саамська', ar: 'الصامي الكلديني', he: 'סאמית קילדינית', sw: 'Kisami cha Kildin' },
        cbk: { en: 'Chavacano', ja: 'チャバカノ語', ko: '차바카노어', zh: '查瓦卡诺语', yue: '查瓦卡諾語',
               vi: 'Tiếng Chavacano', th: 'ภาษาชาวากาโน', id: 'Bahasa Chavacano', hi: 'चावाकानो',
               de: 'Chavacano', fr: 'Chavacano', it: 'Chavacano',
               es_eu: 'Chabacano', es_mx: 'Chabacano', pt_eu: 'Chavacano', pt_br: 'Chavacano',
               ru: 'Чавакано', uk: 'Чавакано', ar: 'التشافاكانو', he: 'צ׳וואקאנו', sw: 'Kichavacano' },
        djk: { en: 'Aukan (Ndyuka)', ja: 'アウカン語', ko: '아우칸어', zh: '奥坎语', yue: '奧坎語',
               vi: 'Tiếng Aukan', th: 'ภาษาอูคัน', id: 'Bahasa Aukan', hi: 'औकान',
               de: 'Aukanisch', fr: 'Aukan', it: 'Aukan',
               es_eu: 'Aukan', es_mx: 'Aukan', pt_eu: 'Aukan', pt_br: 'Aukan',
               ru: 'Ауканский', uk: 'Ауканська', ar: 'الأوكان', he: 'אאוקאן', sw: 'Kiaukan' },
    };
    for (const code of Object.keys(ADDED40)) {
        for (const ui of Object.keys(ADDED40[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED40[code][ui];
            }
        }
    }

    const ADDED41 = {
        bzj: { en: 'Belize Kriol', ja: 'ベリーズ・クリオール語', ko: '벨리즈 크리올어', zh: '伯利兹克里奥尔语', yue: '伯利茲克里奧爾語',
               vi: 'Tiếng Kriol Belize', th: 'ภาษาครีโอลเบลีซ', id: 'Kriol Belize', hi: 'बेलीज़ क्रिओल',
               de: 'Belize-Kreol', fr: 'Créole bélizien', it: 'Creolo del Belize',
               es_eu: 'Criollo beliceño', es_mx: 'Criollo beliceño', pt_eu: 'Crioulo belizenho', pt_br: 'Crioulo belizenho',
               ru: 'Белизский креольский', uk: 'Белізька креольська', ar: 'الكريولية البليزية', he: 'קריאולית בליז', sw: 'Kikriol cha Belize' },
        ude: { en: 'Udege', ja: 'ウデゲ語', ko: '우데게어', zh: '乌德盖语', yue: '烏德蓋語',
               vi: 'Tiếng Udege', th: 'ภาษาอูเดเก', id: 'Bahasa Udege', hi: 'उडेगे',
               de: 'Udehe', fr: 'Oudihé', it: 'Udege',
               es_eu: 'Udege', es_mx: 'Udege', pt_eu: 'Udege', pt_br: 'Udege',
               ru: 'Удэгейский', uk: 'Удегейська', ar: 'الأوديغية', he: 'אודגית', sw: 'Kiudege' },
        rmf: { en: 'Finnish Romani', ja: 'フィンランド・ロマ語', ko: '핀란드 로마어', zh: '芬兰罗姆语', yue: '芬蘭羅姆語',
               vi: 'Tiếng Romani Phần Lan', th: 'ภาษาโรมานีฟินแลนด์', id: 'Romani Finlandia', hi: 'फिनिश रोमानी',
               de: 'Finnisches Romani', fr: 'Romani finlandais', it: 'Romaní finlandese',
               es_eu: 'Romaní finés', es_mx: 'Romaní finés', pt_eu: 'Romani finlandês', pt_br: 'Romani finlandês',
               ru: 'Финский цыганский', uk: 'Фінська циганська', ar: 'الغجرية الفنلندية', he: 'רומאני פיני', sw: 'Kiromani cha Kifini' },
    };
    for (const code of Object.keys(ADDED41)) {
        for (const ui of Object.keys(ADDED41[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED41[code][ui];
            }
        }
    }

    const ADDED42 = {
        rwk: { en: 'Rwa', ja: 'ルワ語', ko: '르와어', zh: '卢瓦语', yue: '盧瓦語',
               vi: 'Tiếng Rwa', th: 'ภาษารวา', id: 'Bahasa Rwa', hi: 'रवा',
               de: 'Rwa', fr: 'Rwa', it: 'Rwa',
               es_eu: 'Rwa', es_mx: 'Rwa', pt_eu: 'Rwa', pt_br: 'Rwa',
               ru: 'Рва', uk: 'Рва', ar: 'الروا', he: 'רווה', sw: 'Kirwa' },
        sel: { en: 'Selkup', ja: 'セリクプ語', ko: '셀쿠프어', zh: '塞尔库普语', yue: '塞爾庫普語',
               vi: 'Tiếng Selkup', th: 'ภาษาเซลคุป', id: 'Bahasa Selkup', hi: 'सेल्कुप',
               de: 'Selkupisch', fr: 'Selkoupe', it: 'Selkup',
               es_eu: 'Selkup', es_mx: 'Selkup', pt_eu: 'Selkup', pt_br: 'Selkup',
               ru: 'Селькупский', uk: 'Селькупська', ar: 'السلكوبية', he: 'סלקופית', sw: 'Kiselkup' },
        yur: { en: 'Yurok', ja: 'ユロク語', ko: '유록어', zh: '尤罗克语', yue: '尤羅克語',
               vi: 'Tiếng Yurok', th: 'ภาษายูร็อก', id: 'Bahasa Yurok', hi: 'युरोक',
               de: 'Yurok', fr: 'Yurok', it: 'Yurok',
               es_eu: 'Yurok', es_mx: 'Yurok', pt_eu: 'Yurok', pt_br: 'Yurok',
               ru: 'Юрок', uk: 'Юрок', ar: 'اليوروك', he: 'יורוק', sw: 'Kiyurok' },
    };
    for (const code of Object.keys(ADDED42)) {
        for (const ui of Object.keys(ADDED42[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED42[code][ui];
            }
        }
    }

    const ADDED43 = {
        kxc: { en: 'Konso', ja: 'コンソ語', ko: '콘소어', zh: '孔索语', yue: '孔索語',
               vi: 'Tiếng Konso', th: 'ภาษาคอนโซ', id: 'Bahasa Konso', hi: 'कोंसो',
               de: 'Konso', fr: 'Konso', it: 'Konso',
               es_eu: 'Konso', es_mx: 'Konso', pt_eu: 'Konso', pt_br: 'Konso',
               ru: 'Консо', uk: 'Консо', ar: 'الكونسو', he: 'קונסו', sw: 'Kikonso' },
        ess: { en: 'Central Siberian Yupik', ja: '中央シベリア・ユピック語', ko: '중앙 시베리아 유픽어', zh: '中西伯利亚尤皮克语', yue: '中西伯利亞尤皮克語',
               vi: 'Tiếng Yupik Trung Siberia', th: 'ภาษายูปิกไซบีเรียกลาง', id: 'Yupik Siberia Tengah', hi: 'मध्य साइबेरियाई युपिक',
               de: 'Zentralsibirisches Yupik', fr: 'Youpik de Sibérie centrale', it: 'Yupik della Siberia centrale',
               es_eu: 'Yupik de Siberia central', es_mx: 'Yupik de Siberia central', pt_eu: 'Iúpique da Sibéria central', pt_br: 'Iúpique da Sibéria central',
               ru: 'Центральносибирский юпикский', uk: 'Центральносибірська юпіцька', ar: 'اليوبيكية السيبيرية الوسطى', he: 'יופיק סיבירי מרכזי', sw: 'Kiyupik cha Siberia ya Kati' },
        srm: { en: 'Saramaccan', ja: 'サラマッカ語', ko: '사라마카어', zh: '萨拉马卡语', yue: '薩拉馬卡語',
               vi: 'Tiếng Saramaca', th: 'ภาษาซารามักกัน', id: 'Bahasa Saramaccan', hi: 'सरमक्कन',
               de: 'Saramaccan', fr: 'Saramaca', it: 'Saramaccano',
               es_eu: 'Saramacano', es_mx: 'Saramacano', pt_eu: 'Saramacano', pt_br: 'Saramacano',
               ru: 'Сарамаккский', uk: 'Сарамакканська', ar: 'السرامكانية', he: 'סרמקנית', sw: 'Kisaramakkani' },
    };
    for (const code of Object.keys(ADDED43)) {
        for (const ui of Object.keys(ADDED43[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED43[code][ui];
            }
        }
    }

    const ADDED44 = {
        sjo: { en: 'Xibe', ja: 'シボ語', ko: '시보어', zh: '锡伯语', yue: '錫伯語',
               vi: 'Tiếng Tích Bá', th: 'ภาษาซีเป่อ', id: 'Bahasa Xibe', hi: 'शिबे',
               de: 'Sibo', fr: 'Sibe', it: 'Sibe',
               es_eu: 'Sibe', es_mx: 'Sibe', pt_eu: 'Sibe', pt_br: 'Sibe',
               ru: 'Сибинский', uk: 'Сибінська', ar: 'الشيبية', he: 'שיבית', sw: 'Kixibe' },
        atj: { en: 'Atikamekw', ja: 'アティカメク語', ko: '아티카멕어', zh: '阿蒂卡梅克语', yue: '阿蒂卡梅克語',
               vi: 'Tiếng Atikamekw', th: 'ภาษาอาทิคาเมก', id: 'Bahasa Atikamekw', hi: 'अतिकामेक्व',
               de: 'Atikamekw', fr: 'Atikamekw', it: 'Atikamekw',
               es_eu: 'Atikamekw', es_mx: 'Atikamekw', pt_eu: 'Atikamekw', pt_br: 'Atikamekw',
               ru: 'Атикамеки', uk: 'Атикамек', ar: 'الأتيكامكوية', he: 'אטיקמקווית', sw: 'Kiatikamekw' },
        bsq: { en: 'Bassa', ja: 'バサ語', ko: '바사어', zh: '巴萨语', yue: '巴薩語',
               vi: 'Tiếng Bassa', th: 'ภาษาบาซา', id: 'Bahasa Bassa', hi: 'बासा',
               de: 'Bassa', fr: 'Bassa', it: 'Bassa',
               es_eu: 'Bassa', es_mx: 'Bassa', pt_eu: 'Bassa', pt_br: 'Bassa',
               ru: 'Басса', uk: 'Басса', ar: 'الباسا', he: 'בסה', sw: 'Kibassa' },
    };
    for (const code of Object.keys(ADDED44)) {
        for (const ui of Object.keys(ADDED44[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED44[code][ui];
            }
        }
    }

    const ADDED45 = {
        srr: { en: 'Serer', ja: 'セレル語', ko: '세레르어', zh: '塞雷尔语', yue: '塞雷爾語',
               vi: 'Tiếng Serer', th: 'ภาษาเซเรอร์', id: 'Bahasa Serer', hi: 'सेरेर',
               de: 'Serer', fr: 'Sérère', it: 'Serer',
               es_eu: 'Serer', es_mx: 'Serer', pt_eu: 'Serer', pt_br: 'Serer',
               ru: 'Серер', uk: 'Серер', ar: 'السيريرية', he: 'סרר', sw: 'Kiserer' },
        abq: { en: 'Abaza', ja: 'アバザ語', ko: '아바자어', zh: '阿巴扎语', yue: '阿巴扎語',
               vi: 'Tiếng Abaza', th: 'ภาษาอาบาซา', id: 'Bahasa Abaza', hi: 'अबाज़ा',
               de: 'Abasinisch', fr: 'Abaza', it: 'Abaza',
               es_eu: 'Abasino', es_mx: 'Abasino', pt_eu: 'Abazá', pt_br: 'Abazá',
               ru: 'Абазинский', uk: 'Абазинська', ar: 'الأباظية', he: 'אבזה', sw: 'Kiabaza' },
        agr: { en: 'Aguaruna', ja: 'アグアルナ語', ko: '아구아루나어', zh: '阿瓜鲁纳语', yue: '阿瓜魯納語',
               vi: 'Tiếng Aguaruna', th: 'ภาษาอกัวรูนา', id: 'Bahasa Aguaruna', hi: 'अगुआरुना',
               de: 'Aguaruna', fr: 'Aguaruna', it: 'Aguaruna',
               es_eu: 'Aguaruna', es_mx: 'Aguaruna', pt_eu: 'Aguaruna', pt_br: 'Aguaruna',
               ru: 'Агуаруна', uk: 'Агуаруна', ar: 'الأغوارونا', he: 'אגוארונה', sw: 'Kiawajun' },
    };
    for (const code of Object.keys(ADDED45)) {
        for (const ui of Object.keys(ADDED45[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED45[code][ui];
            }
        }
    }

    const ADDED46 = {
        yux: { en: 'Kolyma Yukaghir', ja: 'コリマ・ユカギール語', ko: '콜리마 유카기르어', zh: '科雷马尤卡吉尔语', yue: '科雷馬尤卡吉爾語',
               vi: 'Tiếng Yukaghir Kolyma', th: 'ภาษายูคากีร์โคลีมา', id: 'Yukaghir Kolyma', hi: 'कोलिमा युकाघिर',
               de: 'Kolyma-Jukagirisch', fr: 'Youkaghir de Kolyma', it: 'Yucaghir di Kolyma',
               es_eu: 'Yukaghir de Kolimá', es_mx: 'Yukaghir de Kolimá', pt_eu: 'Iucaguir de Kolyma', pt_br: 'Iucaguir de Kolyma',
               ru: 'Колымский юкагирский', uk: 'Колимська юкагірська', ar: 'اليوكاجيرية كوليمية', he: 'יוקגירית קולימה', sw: 'Kiyukaghir cha Kolyma' },
        acu: { en: 'Achuar', ja: 'アチュアル語', ko: '아추아르어', zh: '阿丘阿尔语', yue: '阿丘阿爾語',
               vi: 'Tiếng Achuar', th: 'ภาษาอาชัวร์', id: 'Bahasa Achuar', hi: 'आचुआर',
               de: 'Achuar', fr: 'Achuar', it: 'Achuar',
               es_eu: 'Achuar', es_mx: 'Achuar', pt_eu: 'Achuar', pt_br: 'Achuar',
               ru: 'Ачуар', uk: 'Ачуар', ar: 'الأتشوار', he: 'אצ׳ואר', sw: 'Kiachuar' },
        akb: { en: 'Batak Angkola', ja: 'バタック・アンコラ語', ko: '바타크 앙골라어', zh: '巴塔克安戈拉语', yue: '巴塔克安戈拉語',
               vi: 'Tiếng Batak Angkola', th: 'ภาษาบาตัคอังโกลา', id: 'Bahasa Batak Angkola', hi: 'बाटक अंगकोला',
               de: 'Angkola-Batak', fr: 'Batak angkola', it: 'Batak angkola',
               es_eu: 'Batak angkola', es_mx: 'Batak angkola', pt_eu: 'Batak angkola', pt_br: 'Batak angkola',
               ru: 'Батак-Ангкола', uk: 'Батак-Ангкола', ar: 'الباتاك الأنغكولا', he: 'בטק אנגקולה', sw: 'Kibatak cha Angkola' },
    };
    for (const code of Object.keys(ADDED46)) {
        for (const ui of Object.keys(ADDED46[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED46[code][ui];
            }
        }
    }

    const ADDED47 = {
        saq: { en: 'Samburu', ja: 'サンブル語', ko: '삼부루어', zh: '桑布鲁语', yue: '桑布魯語',
               vi: 'Tiếng Samburu', th: 'ภาษาซัมบูรู', id: 'Bahasa Samburu', hi: 'साम्बुरू',
               de: 'Samburu', fr: 'Samburu', it: 'Samburu',
               es_eu: 'Samburu', es_mx: 'Samburu', pt_eu: 'Samburu', pt_br: 'Samburu',
               ru: 'Самбуру', uk: 'Самбуру', ar: 'السامبورو', he: 'סמבורו', sw: 'Kisamburu' },
        dsh: { en: 'Daasanach', ja: 'ダーサナック語', ko: '다사나치어', zh: '达萨纳奇语', yue: '達薩納奇語',
               vi: 'Tiếng Daasanach', th: 'ภาษาดาซานาช', id: 'Bahasa Daasanach', hi: 'दासनाच',
               de: 'Daasanach', fr: 'Daasanach', it: 'Daasanach',
               es_eu: 'Daasanach', es_mx: 'Daasanach', pt_eu: 'Daasanach', pt_br: 'Daasanach',
               ru: 'Дасанач', uk: 'Дасанач', ar: 'الدسناخية', he: 'דסנך', sw: 'Kidasanach' },
        kao: { en: 'Xaasongaxango', ja: 'カソンケ語', ko: '카손케어', zh: '卡松凯语', yue: '卡松凱語',
               vi: 'Tiếng Khassonké', th: 'ภาษาคาซอนเก', id: 'Bahasa Khassonké', hi: 'खासोंके',
               de: 'Khassonké', fr: 'Khassonké', it: 'Khassonké',
               es_eu: 'Khassonké', es_mx: 'Khassonké', pt_eu: 'Khassonké', pt_br: 'Khassonké',
               ru: 'Хасонке', uk: 'Хасонке', ar: 'الخاسونكة', he: 'חסונקה', sw: 'Kikhassonke' },
    };
    for (const code of Object.keys(ADDED47)) {
        for (const ui of Object.keys(ADDED47[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED47[code][ui];
            }
        }
    }

    const ADDED48 = {
        xed: { en: 'Hdi', ja: 'ヒディ語', ko: '흐디어', zh: '赫迪语', yue: '赫迪語',
               vi: 'Tiếng Hdi', th: 'ภาษาฮดี', id: 'Bahasa Hdi', hi: 'हदी',
               de: 'Hdi', fr: 'Hdi', it: 'Hdi',
               es_eu: 'Hdi', es_mx: 'Hdi', pt_eu: 'Hdi', pt_br: 'Hdi',
               ru: 'Хди', uk: 'Хді', ar: 'الهدية', he: 'הדי', sw: 'Kihdi' },
        bzh: { en: 'Mapos Buang', ja: 'マポス・ブアン語', ko: '마포스 부앙어', zh: '马波斯布昂语', yue: '馬波斯布昂語',
               vi: 'Tiếng Mapos Buang', th: 'ภาษามาโพสบวง', id: 'Bahasa Mapos Buang', hi: 'मापोस बुआंग',
               de: 'Mapos-Buang', fr: 'Buang de Mapos', it: 'Buang di Mapos',
               es_eu: 'Buang de Mapos', es_mx: 'Buang de Mapos', pt_eu: 'Buang de Mapos', pt_br: 'Buang de Mapos',
               ru: 'Мапос-буанг', uk: 'Мапос-буанг', ar: 'بوانج مابوس', he: 'בואנג מאפוס', sw: 'Kibuang cha Mapos' },
        pqm: { en: 'Maliseet-Passamaquoddy', ja: 'マリシート＝パッサマクオディ語', ko: '말리싯-파사마쿼디어', zh: '马利赛特-帕萨马夸迪语', yue: '馬利賽特-帕薩馬夸迪語',
               vi: 'Tiếng Maliseet-Passamaquoddy', th: 'ภาษามาลีซีท-พาสซามาควอดดี', id: 'Maliseet-Passamaquoddy', hi: 'मलिसीट-पसमक्वोडी',
               de: 'Maliseet-Passamaquoddy', fr: 'Malécite-Passamaquoddy', it: 'Maliseet-Passamaquoddy',
               es_eu: 'Maliseet-Passamaquoddy', es_mx: 'Maliseet-Passamaquoddy', pt_eu: 'Maliseet-Passamaquoddy', pt_br: 'Maliseet-Passamaquoddy',
               ru: 'Малисет-пассамакуодди', uk: 'Малісет-пассамакводді', ar: 'الماليسيت-البساماكودي', he: 'מליסט-פסמקווודי', sw: 'Kimaliseet-Passamaquoddy' },
    };
    for (const code of Object.keys(ADDED48)) {
        for (const ui of Object.keys(ADDED48[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED48[code][ui];
            }
        }
    }

    const ADDED49 = {
        kpy: { en: 'Koryak', ja: 'コリャーク語', ko: '코랴크어', zh: '科里亚克语', yue: '科里亞克語',
               vi: 'Tiếng Koryak', th: 'ภาษาคอร์ยัค', id: 'Bahasa Koryak', hi: 'कोर्याक',
               de: 'Korjakisch', fr: 'Koriak', it: 'Coriaco',
               es_eu: 'Koriaco', es_mx: 'Koriaco', pt_eu: 'Coriaque', pt_br: 'Coriaque',
               ru: 'Корякский', uk: 'Коряцька', ar: 'الكورياكية', he: 'קוריאקית', sw: 'Kikoryak' },
        nha: { en: 'Nhanda', ja: 'ナンダ語', ko: '난다어', zh: '恩汉达语', yue: '恩漢達語',
               vi: 'Tiếng Nhanda', th: 'ภาษาเอ็นฮันดา', id: 'Bahasa Nhanda', hi: 'न्हाण्डा',
               de: 'Nhanda', fr: 'Nhanda', it: 'Nhanda',
               es_eu: 'Nhanda', es_mx: 'Nhanda', pt_eu: 'Nhanda', pt_br: 'Nhanda',
               ru: 'Нанда', uk: 'Нанда', ar: 'النهاندا', he: 'נהאנדה', sw: 'Kinhanda' },
        azo: { en: 'Azhe', ja: 'アジェ語', ko: '아제어', zh: '阿哲语', yue: '阿哲語',
               vi: 'Tiếng Azhe', th: 'ภาษาอาเซ๋อ', id: 'Bahasa Azhe', hi: 'अझे',
               de: 'Azhe', fr: 'Azhe', it: 'Azhe',
               es_eu: 'Azhe', es_mx: 'Azhe', pt_eu: 'Azhe', pt_br: 'Azhe',
               ru: 'Аже', uk: 'Аже', ar: 'الأزهية', he: 'אז׳ה', sw: 'Kiazhe' },
    };
    for (const code of Object.keys(ADDED49)) {
        for (const ui of Object.keys(ADDED49[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED49[code][ui];
            }
        }
    }

    const ADDED50 = {
        kio: { en: 'Kiowa', ja: 'カイオワ語', ko: '키오와어', zh: '凯欧瓦语', yue: '凱歐瓦語',
               vi: 'Tiếng Kiowa', th: 'ภาษาไคโอวา', id: 'Bahasa Kiowa', hi: 'कायोवा',
               de: 'Kiowa', fr: 'Kiowa', it: 'Kiowa',
               es_eu: 'Kiowa', es_mx: 'Kiowa', pt_eu: 'Kiowa', pt_br: 'Kiowa',
               ru: 'Кайова', uk: 'Кайова', ar: 'الكايوا', he: 'קיובה', sw: 'Kikiowa' },
        xtm: { en: 'Mixtepec Mixtec', ja: 'ミクステペック・ミクステコ語', ko: '믹스테펙 믹스테코어', zh: '米斯特佩克米斯特克语', yue: '米斯特佩克米斯特克語',
               vi: 'Tiếng Mixtec Mixtepec', th: 'ภาษามิกซ์เตเปกมิกซ์เตค', id: 'Mixtec Mixtepec', hi: 'मिक्सटेपेक मिक्सटेक',
               de: 'Mixtepec-Mixteco', fr: 'Mixtèque de Mixtepec', it: 'Mixteco di Mixtepec',
               es_eu: 'Mixteco de Mixtepec', es_mx: 'Mixteco de Mixtepec', pt_eu: 'Mixteco de Mixtepec', pt_br: 'Mixteco de Mixtepec',
               ru: 'Мистепек-миштекский', uk: 'Мікстепек-міштекська', ar: 'الميشتيكية ميشتبيك', he: 'מישטק מיקסטפק', sw: 'Kimixtec cha Mixtepec' },
        bbo: { en: 'Konabéré', ja: 'コナベレ語', ko: '코나베레어', zh: '科纳贝雷语', yue: '科納貝雷語',
               vi: 'Tiếng Konabéré', th: 'ภาษาโคนาเบเร', id: 'Bahasa Konabéré', hi: 'कोनाबेरे',
               de: 'Konabéré', fr: 'Konabéré', it: 'Konabéré',
               es_eu: 'Konabéré', es_mx: 'Konabéré', pt_eu: 'Konabéré', pt_br: 'Konabéré',
               ru: 'Конабере', uk: 'Конабере', ar: 'الكوناباري', he: 'קונאברה', sw: 'Kikonabere' },
    };
    for (const code of Object.keys(ADDED50)) {
        for (const ui of Object.keys(ADDED50[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED50[code][ui];
            }
        }
    }

    const ADDED51 = {
        prg: { en: 'Old Prussian', ja: '古プロイセン語', ko: '고대 프로이센어', zh: '古普鲁士语', yue: '古普魯士語',
               vi: 'Tiếng Phổ cổ', th: 'ภาษาปรัสเซียโบราณ', id: 'Bahasa Prusia Kuno', hi: 'पुरानी प्रशियाई',
               de: 'Altpreußisch', fr: 'Vieux-prussien', it: 'Antico prussiano',
               es_eu: 'Antiguo prusiano', es_mx: 'Antiguo prusiano', pt_eu: 'Antigo prussiano', pt_br: 'Antigo prussiano',
               ru: 'Прусский', uk: 'Прусська', ar: 'البروسية القديمة', he: 'פרוסית עתיקה', sw: 'Kiprussia cha Kale' },
        aqc: { en: 'Archi', ja: 'アルチ語', ko: '아르치어', zh: '阿尔奇语', yue: '阿爾奇語',
               vi: 'Tiếng Archi', th: 'ภาษาอาร์ชี', id: 'Bahasa Archi', hi: 'आर्ची',
               de: 'Archi', fr: 'Artchi', it: 'Archi',
               es_eu: 'Archi', es_mx: 'Archi', pt_eu: 'Archi', pt_br: 'Archi',
               ru: 'Арчинский', uk: 'Арчинська', ar: 'الأرشية', he: 'ארצ׳י', sw: 'Kiarchi' },
        adt: { en: 'Adnyamathanha', ja: 'アドニャマザンハ語', ko: '아드니아마탄하어', zh: '阿德尼亚玛塔哈语', yue: '阿德尼亞瑪塔哈語',
               vi: 'Tiếng Adnyamathanha', th: 'ภาษาแอดเนียมาทันฮา', id: 'Bahasa Adnyamathanha', hi: 'अद्न्यमथन्हा',
               de: 'Adnyamathanha', fr: 'Adnyamathanha', it: 'Adnyamathanha',
               es_eu: 'Adnyamathanha', es_mx: 'Adnyamathanha', pt_eu: 'Adnyamathanha', pt_br: 'Adnyamathanha',
               ru: 'Аднямаятанха', uk: 'Аднямаятанха', ar: 'الأدنياماتانها', he: 'אדנימתנהה', sw: 'Kiadnyamathanha' },
    };
    for (const code of Object.keys(ADDED51)) {
        for (const ui of Object.keys(ADDED51[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED51[code][ui];
            }
        }
    }

    const ADDED52 = {
        bft: { en: 'Balti', ja: 'バルティ語', ko: '발티어', zh: '巴尔蒂语', yue: '巴爾蒂語',
               vi: 'Tiếng Balti', th: 'ภาษาบัลติ', id: 'Bahasa Balti', hi: 'बल्ती',
               de: 'Balti', fr: 'Balti', it: 'Balti',
               es_eu: 'Baltí', es_mx: 'Baltí', pt_eu: 'Balti', pt_br: 'Balti',
               ru: 'Балти', uk: 'Балті', ar: 'البلطية', he: 'בלטית', sw: 'Kibalti' },
        mwk: { en: 'Kita Maninkakan', ja: 'キタ・マニンカ語', ko: '키타 마닌카어', zh: '基塔曼宁卡语', yue: '基塔曼寧卡語',
               vi: 'Tiếng Maninkakan Kita', th: 'ภาษามานินกาคันคิตา', id: 'Maninkakan Kita', hi: 'किता मानिनकाकान',
               de: 'Kita-Maninkakan', fr: 'Kita maninkakan', it: 'Maninkakan di Kita',
               es_eu: 'Maninkakan de Kita', es_mx: 'Maninkakan de Kita', pt_eu: 'Maninkakan de Kita', pt_br: 'Maninkakan de Kita',
               ru: 'Кита-манинкакан', uk: 'Кіта-манінкакан', ar: 'المانينكاكان كيتا', he: 'מנינקקאן קיטה', sw: 'Kimaninkakan cha Kita' },
        nys: { en: 'Noongar', ja: 'ヌンガル語', ko: '눈가르어', zh: '努恩格语', yue: '努恩格語',
               vi: 'Tiếng Noongar', th: 'ภาษานูงการ์', id: 'Bahasa Noongar', hi: 'नूंगार',
               de: 'Noongar', fr: 'Noongar', it: 'Noongar',
               es_eu: 'Noongar', es_mx: 'Noongar', pt_eu: 'Noongar', pt_br: 'Noongar',
               ru: 'Нунгар', uk: 'Нунгар', ar: 'النوونغار', he: 'נונגר', sw: 'Kinoongar' },
    };
    for (const code of Object.keys(ADDED52)) {
        for (const ui of Object.keys(ADDED52[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED52[code][ui];
            }
        }
    }

    const ADDED53 = {
        ang: { en: 'Old English', ja: '古英語', ko: '고대 영어', zh: '古英语', yue: '古英語',
               vi: 'Tiếng Anh cổ', th: 'ภาษาอังกฤษโบราณ', id: 'Bahasa Inggris Kuno', hi: 'पुरानी अंग्रेज़ी',
               de: 'Altenglisch', fr: 'Vieil anglais', it: 'Anglosassone',
               es_eu: 'Inglés antiguo', es_mx: 'Inglés antiguo', pt_eu: 'Inglês antigo', pt_br: 'Inglês antigo',
               ru: 'Древнеанглийский', uk: 'Давньоанглійська', ar: 'الإنجليزية القديمة', he: 'אנגלית עתיקה', sw: 'Kiingereza cha Kale' },
        rgn: { en: 'Romagnol', ja: 'ロマーニョ語', ko: '로마뇰어', zh: '罗马涅语', yue: '羅馬涅語',
               vi: 'Tiếng Romagnol', th: 'ภาษาโรมัญญอล', id: 'Bahasa Romagnol', hi: 'रोमान्योल',
               de: 'Romagnolisch', fr: 'Romagnol', it: 'Romagnolo',
               es_eu: 'Romañol', es_mx: 'Romañol', pt_eu: 'Romanholo', pt_br: 'Romanholo',
               ru: 'Романьольский', uk: 'Романьольська', ar: 'الرومانية', he: 'רומאניולית', sw: 'Kiromagnol' },
    };
    for (const code of Object.keys(ADDED53)) {
        for (const ui of Object.keys(ADDED53[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED53[code][ui];
            }
        }
    }

    const ADDED54 = {
        ohu: { en: 'Old Hungarian', ja: '古ハンガリー語', ko: '고대 헝가리어', zh: '古匈牙利语', yue: '古匈牙利語',
               vi: 'Tiếng Hungary cổ', th: 'ภาษาฮังการีโบราณ', id: 'Bahasa Hungaria Kuno', hi: 'पुरानी हंगेरियन',
               de: 'Altungarisch', fr: 'Vieux hongrois', it: 'Antico ungherese',
               es_eu: 'Húngaro antiguo', es_mx: 'Húngaro antiguo', pt_eu: 'Húngaro antigo', pt_br: 'Húngaro antigo',
               ru: 'Древневенгерский', uk: 'Давньоугорська', ar: 'الهنغارية القديمة', he: 'הונגרית עתיקה', sw: 'Kihungari cha Kale' },
        egl: { en: 'Emilian', ja: 'エミリア語', ko: '에밀리아어', zh: '艾米利亚语', yue: '艾米利亞語',
               vi: 'Tiếng Emilia', th: 'ภาษาเอมีเลีย', id: 'Bahasa Emilian', hi: 'एमिलियन',
               de: 'Emilianisch', fr: 'Émilien', it: 'Emiliano',
               es_eu: 'Emiliano', es_mx: 'Emiliano', pt_eu: 'Emiliano', pt_br: 'Emiliano',
               ru: 'Эмильянский', uk: 'Емільянська', ar: 'الإميلية', he: 'אמיליאנית', sw: 'Kiemiliani' },
        fla: { en: 'Fala', ja: 'ファラ語', ko: '파라어', zh: '法拉语', yue: '法拉語',
               vi: 'Tiếng Fala', th: 'ภาษาฟาลา', id: 'Bahasa Fala', hi: 'फला',
               de: 'Fala', fr: 'Fala', it: 'Fala',
               es_eu: 'Fala', es_mx: 'Fala', pt_eu: 'Fala', pt_br: 'Fala',
               ru: 'Фала', uk: 'Фала', ar: 'الفالا', he: 'פאלה', sw: 'Kifala' },
    };
    for (const code of Object.keys(ADDED54)) {
        for (const ui of Object.keys(ADDED54[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED54[code][ui];
            }
        }
    }

    const ADDED55 = {
        ruq: { en: 'Megleno-Romanian', ja: 'メグレノ・ルーマニア語', ko: '메글레노-루마니아어', zh: '梅格莱诺-罗马尼亚语', yue: '梅格萊諾-羅馬尼亞語',
               vi: 'Tiếng România Megleno', th: 'ภาษาเมเกลโน-โรมาเนีย', id: 'Bahasa Megleno-Rumania', hi: 'मेग्लेनो-रोमानियाई',
               de: 'Meglenorumänisch', fr: 'Méglénoroumain', it: 'Megleno-romeno',
               es_eu: 'Meglenorrumano', es_mx: 'Meglenorrumano', pt_eu: 'Meglenorromeno', pt_br: 'Meglenorromeno',
               ru: 'Мегленорумынский', uk: 'Мегленорумунська', ar: 'الميغلينو-رومانية', he: 'מגלנו-רומנית', sw: 'Kiromania cha Megleno' },
        nhx: { en: 'Isthmus Nahuatl', ja: 'イスムス・ナワトル語', ko: '이스무스 나우아틀어', zh: '伊斯穆斯纳瓦特尔语', yue: '伊斯穆斯納瓦特爾語',
               vi: 'Tiếng Nahuatl Eo Đất', th: 'ภาษานาวาตล์อิสมุส', id: 'Nahuatl Tanah Genting', hi: 'इस्थमस नहुआतल',
               de: 'Isthmus-Nahuatl', fr: "Nahuatl de l'isthme", it: "Nahuatl dell'istmo",
               es_eu: 'Náhuatl del Istmo', es_mx: 'Náhuatl del Istmo', pt_eu: 'Nauatle do Istmo', pt_br: 'Nauatle do Istmo',
               ru: 'Истмус-науатль', uk: 'Істмус-науатль', ar: 'النواتل البرزخية', he: 'נאוואטל מצרי', sw: 'Kinahuatl cha Istmo' },
        dge: { en: 'Degema', ja: 'デゲマ語', ko: '데게마어', zh: '德格马语', yue: '德格馬語',
               vi: 'Tiếng Degema', th: 'ภาษาดีเกมา', id: 'Bahasa Degema', hi: 'देगेमा',
               de: 'Degema', fr: 'Dégéma', it: 'Degema',
               es_eu: 'Degema', es_mx: 'Degema', pt_eu: 'Degema', pt_br: 'Degema',
               ru: 'Дегема', uk: 'Дегема', ar: 'الدجيمة', he: 'דגמה', sw: 'Kidegema' },
    };
    for (const code of Object.keys(ADDED55)) {
        for (const ui of Object.keys(ADDED55[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED55[code][ui];
            }
        }
    }

    const ADDED56 = {
        ker: { en: 'Kera', ja: 'ケラ語', ko: '케라어', zh: '凯拉语', yue: '凱拉語',
               vi: 'Tiếng Kera', th: 'ภาษาเคระ', id: 'Bahasa Kera', hi: 'केरा',
               de: 'Kera', fr: 'Kera', it: 'Kera',
               es_eu: 'Kera', es_mx: 'Kera', pt_eu: 'Kera', pt_br: 'Kera',
               ru: 'Кера', uk: 'Кера', ar: 'الكيرا', he: 'קרה', sw: 'Kikera' },
        dbq: { en: 'Daba', ja: 'ダバ語', ko: '다바어', zh: '达巴语', yue: '達巴語',
               vi: 'Tiếng Daba', th: 'ภาษาดาบา', id: 'Bahasa Daba', hi: 'दाबा',
               de: 'Daba', fr: 'Daba', it: 'Daba',
               es_eu: 'Daba', es_mx: 'Daba', pt_eu: 'Daba', pt_br: 'Daba',
               ru: 'Даба', uk: 'Даба', ar: 'الدابا', he: 'דאבה', sw: 'Kidaba' },
        nzm: { en: 'Zeme Naga', ja: 'ゼメ・ナガ語', ko: '제메 나가어', zh: '泽米那加语', yue: '澤米那加語',
               vi: 'Tiếng Naga Zeme', th: 'ภาษาเซเมนากา', id: 'Naga Zeme', hi: 'जेमे नागा',
               de: 'Zeme-Naga', fr: 'Zeme naga', it: 'Zeme naga',
               es_eu: 'Zeme naga', es_mx: 'Zeme naga', pt_eu: 'Zeme naga', pt_br: 'Zeme naga',
               ru: 'Земе нага', uk: 'Земе-нага', ar: 'النجاوية الزيمة', he: 'נגה זמה', sw: 'Kinaga cha Zeme' },
    };
    for (const code of Object.keys(ADDED56)) {
        for (const ui of Object.keys(ADDED56[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED56[code][ui];
            }
        }
    }

    const ADDED57 = {
        cms: { en: 'Messapic', ja: 'メッサピア語', ko: '메사프어', zh: '梅萨皮语', yue: '梅薩皮語',
               vi: 'Tiếng Messap', th: 'ภาษาเมสซาปิก', id: 'Bahasa Mesapik', hi: 'मेसापिक',
               de: 'Messapisch', fr: 'Messapien', it: 'Messapico',
               es_eu: 'Mesápico', es_mx: 'Mesápico', pt_eu: 'Messápico', pt_br: 'Messápico',
               ru: 'Мессапский', uk: 'Мессапська', ar: 'الميسابية', he: 'מסאפית', sw: 'Kimesapi' },
        xul: { en: 'Ngunnawal', ja: 'ングンナワル語', ko: '응군나왈어', zh: '恩贡纳沃语', yue: '恩貢納沃語',
               vi: 'Tiếng Ngunnawal', th: 'ภาษางันนาวัล', id: 'Bahasa Ngunnawal', hi: 'गुनावल',
               de: 'Ngunnawal', fr: 'Ngunnawal', it: 'Ngunnawal',
               es_eu: 'Ngunnawal', es_mx: 'Ngunnawal', pt_eu: 'Ngunnawal', pt_br: 'Ngunnawal',
               ru: 'Нгуннавал', uk: 'Нгуннавал', ar: 'النغوناوال', he: 'נגונוואל', sw: 'Kingunnawal' },
        soa: { en: 'Thai Song', ja: 'タイ・ソング語', ko: '타이 송어', zh: '泰松语', yue: '泰松語',
               vi: 'Tiếng Thái Song', th: 'ภาษาไทยซง', id: 'Bahasa Thai Song', hi: 'थाई सोंग',
               de: 'Thai Song', fr: 'Thaï song', it: 'Thai song',
               es_eu: 'Tai song', es_mx: 'Tai song', pt_eu: 'Tai song', pt_br: 'Tai song',
               ru: 'Тай-сонг', uk: 'Тай-сонг', ar: 'التايسونغية', he: 'תאי סונג', sw: 'Kithai cha Song' },
    };
    for (const code of Object.keys(ADDED57)) {
        for (const ui of Object.keys(ADDED57[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED57[code][ui];
            }
        }
    }

    const ADDED58 = {
        kau: { en: 'Kanuri', ja: 'カヌリ語', ko: '카누리어', zh: '卡努里语', yue: '卡努里語',
               vi: 'Tiếng Kanuri', th: 'ภาษาคานูรี', id: 'Bahasa Kanuri', hi: 'कनुरी',
               de: 'Kanuri', fr: 'Kanouri', it: 'Kanuri',
               es_eu: 'Kanuri', es_mx: 'Kanuri', pt_eu: 'Kanuri', pt_br: 'Kanuri',
               ru: 'Канури', uk: 'Канурі', ar: 'الكانورية', he: 'קנורי', sw: 'Kikanuri' },
        trm: { en: 'Tregami', ja: 'トレガミ語', ko: '트레가미어', zh: '特雷加米语', yue: '特雷加米語',
               vi: 'Tiếng Tregami', th: 'ภาษาเตรกามี', id: 'Bahasa Tregami', hi: 'त्रेगामी',
               de: 'Tregami', fr: 'Trégami', it: 'Tregami',
               es_eu: 'Tregami', es_mx: 'Tregami', pt_eu: 'Tregami', pt_br: 'Tregami',
               ru: 'Трегами', uk: 'Трегамі', ar: 'التريغامية', he: 'טרגאמי', sw: 'Kitregami' },
        nia: { en: 'Nias', ja: 'ニアス語', ko: '니아스어', zh: '尼亚斯语', yue: '尼亞斯語',
               vi: 'Tiếng Nias', th: 'ภาษานียัส', id: 'Bahasa Nias', hi: 'नियास',
               de: 'Nias', fr: 'Nias', it: 'Nias',
               es_eu: 'Nias', es_mx: 'Nias', pt_eu: 'Nias', pt_br: 'Nias',
               ru: 'Ниасский', uk: 'Ніаська', ar: 'النياسية', he: 'ניאס', sw: 'Kinias' },
    };
    for (const code of Object.keys(ADDED58)) {
        for (const ui of Object.keys(ADDED58[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED58[code][ui];
            }
        }
    }

    const ADDED59 = {
        anp: { en: 'Angika', ja: 'アンギカ語', ko: '앙기카어', zh: '安格语', yue: '安格語',
               vi: 'Tiếng Angika', th: 'ภาษาอังคิกา', id: 'Bahasa Angika', hi: 'अंगिका',
               de: 'Angika', fr: 'Angika', it: 'Angika',
               es_eu: 'Angika', es_mx: 'Angika', pt_eu: 'Angika', pt_br: 'Angika',
               ru: 'Ангика', uk: 'Ангіка', ar: 'الأنغية', he: 'אנגיקה', sw: 'Kiangika' },
        khq: { en: 'Koyra Chiini', ja: 'コイラ・チーニ語', ko: '코이라 치니어', zh: '科伊拉奇尼语', yue: '科伊拉奇尼語',
               vi: 'Tiếng Koyra Chiini', th: 'ภาษาคอยราชีนี', id: 'Bahasa Koyra Chiini', hi: 'कोइरा चीनी',
               de: 'Koyra Chiini', fr: 'Koyra chiini', it: 'Koyra chiini',
               es_eu: 'Koyra chiini', es_mx: 'Koyra chiini', pt_eu: 'Koyra chiini', pt_br: 'Koyra chiini',
               ru: 'Койра-чиини', uk: 'Койра-чіїні', ar: 'الكويرا تشينية', he: 'קוירה צ׳ייני', sw: 'Kikoyra Chiini' },
        asu: { en: 'Asu', ja: 'アス語', ko: '아수어', zh: '阿苏语', yue: '阿蘇語',
               vi: 'Tiếng Asu', th: 'ภาษาอาซู', id: 'Bahasa Asu', hi: 'आसू',
               de: 'Asu', fr: 'Asu', it: 'Asu',
               es_eu: 'Asu', es_mx: 'Asu', pt_eu: 'Asu', pt_br: 'Asu',
               ru: 'Асу', uk: 'Асу', ar: 'الآسو', he: 'אסו', sw: 'Kichasu' },
    };
    for (const code of Object.keys(ADDED59)) {
        for (const ui of Object.keys(ADDED59[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED59[code][ui];
            }
        }
    }

    const ADDED60 = {
        bpy: { en: 'Bishnupriya Manipuri', ja: 'ビシュヌプリヤ・マニプリ語', ko: '비슈누프리야 마니푸리어', zh: '比什奴普里亚曼尼普尔语', yue: '比什奴普里亞曼尼普爾語',
               vi: 'Tiếng Bishnupriya Manipuri', th: 'ภาษาบิชนุปริยามณีปุรี', id: 'Bahasa Bishnupriya Manipuri', hi: 'विष्णुप्रिया मणिपुरी',
               de: 'Bishnupriya-Manipuri', fr: 'Bishnupriya-manipuri', it: 'Bishnupriya manipuri',
               es_eu: 'Bishnupriya manipuri', es_mx: 'Bishnupriya manipuri', pt_eu: 'Bishnupriya manipuri', pt_br: 'Bishnupriya manipuri',
               ru: 'Бишнуприя-манипури', uk: 'Бішнупрія-маніпурі', ar: 'البيشنوبريا الماني펣ورية', he: 'בישנופריה מניפורי', sw: 'Kibishnupriya cha Manipuri' },
        mch: { en: 'Maquiritari', ja: 'マキリタレ語', ko: '마키리타리어', zh: '马基里塔雷语', yue: '馬基里塔雷語',
               vi: 'Tiếng Maquiritari', th: 'ภาษามากีรีตารี', id: 'Bahasa Maquiritari', hi: 'मकीरीटारी',
               de: 'Maquiritari', fr: 'Maquiritari', it: 'Maquiritari',
               es_eu: 'Maquiritari', es_mx: 'Maquiritari', pt_eu: 'Maquiritari', pt_br: 'Maquiritari',
               ru: 'Макиритаре', uk: 'Макірітаре', ar: 'الماكيريتارية', he: 'מקיריטרי', sw: 'Kimaquiritari' },
        drs: { en: 'Gedeo', ja: 'ゲデオ語', ko: '게데오어', zh: '格德奥语', yue: '格德奧語',
               vi: 'Tiếng Gedeo', th: 'ภาษาเกเดโอ', id: 'Bahasa Gedeo', hi: 'गेदेओ',
               de: 'Gedeo', fr: 'Gedeo', it: 'Gedeo',
               es_eu: 'Gedeo', es_mx: 'Gedeo', pt_eu: 'Gedeo', pt_br: 'Gedeo',
               ru: 'Гедео', uk: 'Гедео', ar: 'الجيديو', he: 'גדאו', sw: 'Kigedeo' },
    };
    for (const code of Object.keys(ADDED60)) {
        for (const ui of Object.keys(ADDED60[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED60[code][ui];
            }
        }
    }

    const ADDED61 = {
        lmn: { en: 'Lambadi', ja: 'ランバディ語', ko: '람바디어', zh: '兰巴迪语', yue: '蘭巴迪語',
               vi: 'Tiếng Lambadi', th: 'ภาษาลัมบาดี', id: 'Bahasa Lambadi', hi: 'लम्बाडी',
               de: 'Lambadi', fr: 'Lambadi', it: 'Lambadi',
               es_eu: 'Lambadi', es_mx: 'Lambadi', pt_eu: 'Lambadi', pt_br: 'Lambadi',
               ru: 'Ламбади', uk: 'Ламбаді', ar: 'اللامبادية', he: 'למבדי', sw: 'Kilambadi' },
        gym: { en: 'Ngäbere', ja: 'ンガベレ語', ko: '응가베레어', zh: '恩加贝雷语', yue: '恩加貝雷語',
               vi: 'Tiếng Ngäbere', th: 'ภาษางาเบเร', id: 'Bahasa Ngäbere', hi: 'न्गाबेरे',
               de: 'Ngäbere', fr: 'Ngäbéré', it: 'Ngäbere',
               es_eu: 'Ngäbere', es_mx: 'Ngäbere', pt_eu: 'Ngäbere', pt_br: 'Ngäbere',
               ru: 'Нгабере', uk: 'Нгабере', ar: 'النغابري', he: 'נגאברה', sw: 'Kingäbere' },
        kfx: { en: 'Kullui', ja: 'クルウィー語', ko: '쿨루이어', zh: '库卢伊语', yue: '庫盧伊語',
               vi: 'Tiếng Kullui', th: 'ภาษากุลลุย', id: 'Bahasa Kullui', hi: 'कुल्लूई',
               de: 'Kullui', fr: 'Kullui', it: 'Kullui',
               es_eu: 'Kullui', es_mx: 'Kullui', pt_eu: 'Kullui', pt_br: 'Kullui',
               ru: 'Куллуи', uk: 'Куллуї', ar: 'الكولوية', he: 'קולואי', sw: 'Kikullui' },
    };
    for (const code of Object.keys(ADDED61)) {
        for (const ui of Object.keys(ADDED61[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED61[code][ui];
            }
        }
    }

    const ADDED62 = {
        ame: { en: 'Yanesha', ja: 'ヤネシャ語', ko: '야네샤어', zh: '雅内沙语', yue: '雅內沙語',
               vi: 'Tiếng Yanesha', th: 'ภาษายาเนชา', id: 'Bahasa Yanesha', hi: 'यानेशा',
               de: 'Yanesha', fr: 'Yanesha', it: 'Yanesha',
               es_eu: 'Yanesha', es_mx: 'Yanesha', pt_eu: 'Yanesha', pt_br: 'Yanesha',
               ru: 'Янеша', uk: 'Янеша', ar: 'الياناشية', he: 'יאנשה', sw: 'Kiyanesha' },
        cnd: { en: 'Northern Qiang', ja: '北部チャン語', ko: '북부 챠어', zh: '北羌语', yue: '北羌語',
               vi: 'Tiếng Khương Bắc', th: 'ภาษาเชียงเหนือ', id: 'Qiang Utara', hi: 'उत्तरी क्यांग',
               de: 'Nord-Qiang', fr: 'Qiang du Nord', it: 'Qiang settentrionale',
               es_eu: 'Qiang del Norte', es_mx: 'Qiang del Norte', pt_eu: 'Qiang do Norte', pt_br: 'Qiang do Norte',
               ru: 'Северный цян', uk: 'Північна цян', ar: 'القيانغ الشمالية', he: 'צ׳יאנג צפוני', sw: 'Kiqiang cha Kaskazini' },
        yrl: { en: 'Nheengatu', ja: 'ニェンガトゥ語', ko: '녀엔가투어', zh: '尼恩加图语', yue: '尼恩加圖語',
               vi: 'Tiếng Nheengatu', th: 'ภาษาเนงกาตู', id: 'Bahasa Nheengatu', hi: 'न्येंगाटू',
               de: 'Nheengatu', fr: 'Nheengatu', it: 'Nheengatu',
               es_eu: "Ñe'engatú", es_mx: "Ñe'engatú", pt_eu: 'Nheengatu', pt_br: 'Nheengatu',
               ru: 'Ньенгату', uk: 'Ньенгату', ar: 'النيينغاتو', he: 'נייאנגטו', sw: 'Kinheengatu' },
    };
    for (const code of Object.keys(ADDED62)) {
        for (const ui of Object.keys(ADDED62[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED62[code][ui];
            }
        }
    }

    const ADDED63 = {
        hni: { en: 'Hani', ja: 'ハニ語', ko: '하니어', zh: '哈尼语', yue: '哈尼語',
               vi: 'Tiếng Hà Nhì', th: 'ภาษาฮานี', id: 'Bahasa Hani', hi: 'हानी',
               de: 'Hani', fr: 'Hani', it: 'Hani',
               es_eu: 'Hani', es_mx: 'Hani', pt_eu: 'Hani', pt_br: 'Hani',
               ru: 'Хани', uk: 'Хані', ar: 'الهانية', he: 'האני', sw: 'Kihani' },
        tsm: { en: 'Turoyo', ja: 'トゥロヨ語', ko: '투로요어', zh: '图罗约语', yue: '圖羅約語',
               vi: 'Tiếng Turoyo', th: 'ภาษาตูโรโย', id: 'Bahasa Turoyo', hi: 'तुरोयो',
               de: 'Turoyo', fr: 'Turoyo', it: 'Turoyo',
               es_eu: 'Turoyo', es_mx: 'Turoyo', pt_eu: 'Turoyo', pt_br: 'Turoyo',
               ru: 'Туройо', uk: 'Туройо', ar: 'التورويو', he: 'טורויו', sw: 'Kituroyo' },
        pmh: { en: 'Maharastri Prakrit', ja: 'マハーラーシュトリー・プラークリット語', ko: '마하라슈트리 프라크리트어', zh: '摩诃拉施特利俗语', yue: '摩訶拉施特利俗語',
               vi: 'Tiếng Maharastri Prakrit', th: 'ภาษามหาราษฏีปรากฤต', id: 'Bahasa Maharastri Prakrit', hi: 'महाराष्ट्री प्राकृत',
               de: 'Maharashtri-Prakrit', fr: 'Maharashtri prakrit', it: 'Maharashtri prakrit',
               es_eu: 'Prácrito Maharashtri', es_mx: 'Prácrito Maharashtri', pt_eu: 'Prácrito Maharastri', pt_br: 'Prácrito Maharastri',
               ru: 'Махараштри пракрит', uk: 'Махараштрі пракрит', ar: 'الماهاراشترية البراكريت', he: 'מהאראשטרי פרקריט', sw: 'Pracrito ya Maharashtri' },
    };
    for (const code of Object.keys(ADDED63)) {
        for (const ui of Object.keys(ADDED63[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED63[code][ui];
            }
        }
    }

    const ADDED64 = {
        wbt: { en: 'Warnman', ja: 'ワーンマン語', ko: '워언만어', zh: '瓦尔曼语', yue: '瓦爾曼語',
               vi: 'Tiếng Warnman', th: 'ภาษาวาร์นมัน', id: 'Bahasa Warnman', hi: 'वार्नमान',
               de: 'Warnman', fr: 'Warnman', it: 'Warnman',
               es_eu: 'Warnman', es_mx: 'Warnman', pt_eu: 'Warnman', pt_br: 'Warnman',
               ru: 'Уанман', uk: 'Уанман', ar: 'الوارنمان', he: 'וורנמן', sw: 'Kiwarnman' },
        bah: { en: 'Bahamian Creole', ja: 'バハマ・クレオール語', ko: '바하마 크리올어', zh: '巴哈马克里奥尔语', yue: '巴哈馬克里奧爾語',
               vi: 'Tiếng Creole Bahama', th: 'ภาษาครีโอลบาฮามาส', id: 'Kreol Bahama', hi: 'बहामियाई क्रिओल',
               de: 'Bahamaisch-Kreolisch', fr: 'Créole bahaméen', it: 'Creolo bahamiano',
               es_eu: 'Criollo bahameño', es_mx: 'Criollo bahameño', pt_eu: 'Crioulo baamiano', pt_br: 'Crioulo baamiano',
               ru: 'Багамский креольский', uk: 'Багамська креольська', ar: 'الكريولية الباهامية', he: 'קריאולית בהאמית', sw: 'Kikriol cha Bahama' },
    };
    for (const code of Object.keys(ADDED64)) {
        for (const ui of Object.keys(ADDED64[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED64[code][ui];
            }
        }
    }

    const ADDED65 = {
        mlq: { en: 'Western Maninkakan', ja: '西部マニンカ語', ko: '서부 마닌카어', zh: '西部马宁卡语', yue: '西部馬寧卡語',
               vi: 'Tiếng Maninka Tây', th: 'ภาษามานินกาตะวันตก', id: 'Maninkakan Barat', hi: 'पश्चिमी मनिंकाकान',
               de: 'West-Maninkakan', fr: 'Maninkakan occidental', it: 'Maninkakan occidentale',
               es_eu: 'Maninkakan occidental', es_mx: 'Maninkakan occidental', pt_eu: 'Maninkakan ocidental', pt_br: 'Maninkakan ocidental',
               ru: 'Западный манинка', uk: 'Західна маніка', ar: 'المانينكاكان الغربية', he: 'מנינקקאן מערבי', sw: 'Kimaninkakan cha Magharibi' },
        mev: { en: 'Mano', ja: 'マノ語', ko: '마노어', zh: '马诺语', yue: '馬諾語',
               vi: 'Tiếng Mano', th: 'ภาษามาโน', id: 'Bahasa Mano', hi: 'मानो',
               de: 'Mano', fr: 'Mano', it: 'Mano',
               es_eu: 'Mano', es_mx: 'Mano', pt_eu: 'Mano', pt_br: 'Mano',
               ru: 'Мано', uk: 'Мано', ar: 'المانوية', he: 'מאנו', sw: 'Kimano' },
        lwl: { en: 'Eastern Lawa', ja: '東部ラワ語', ko: '동부 라와어', zh: '东部拉瓦语', yue: '東部拉瓦語',
               vi: 'Tiếng Lawa Đông', th: 'ภาษาลัวะตะวันออก', id: 'Lawa Timur', hi: 'पूर्वी लावा',
               de: 'Ost-Lawa', fr: 'Lawa oriental', it: 'Lawa orientale',
               es_eu: 'Lawa oriental', es_mx: 'Lawa oriental', pt_eu: 'Lawa oriental', pt_br: 'Lawa oriental',
               ru: 'Восточный лава', uk: 'Східна лава', ar: 'اللاوا الشرقية', he: 'לאווה מזרחי', sw: 'Kilawa cha Mashariki' },
    };
    for (const code of Object.keys(ADDED65)) {
        for (const ui of Object.keys(ADDED65[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED65[code][ui];
            }
        }
    }

    const ADDED66 = {
        hyw: { en: 'Western Armenian', ja: '西アルメニア語', ko: '서아르메니아어', zh: '西亚美尼亚语', yue: '西亞美尼亞語',
               vi: 'Tiếng Armenia Tây', th: 'ภาษาอาร์เมเนียตะวันตก', id: 'Armenia Barat', hi: 'पश्चिमी अर्मेनियाई',
               de: 'Westarmenisch', fr: 'Arménien occidental', it: 'Armeno occidentale',
               es_eu: 'Armenio occidental', es_mx: 'Armenio occidental', pt_eu: 'Arménio ocidental', pt_br: 'Armênio ocidental',
               ru: 'Западноармянский', uk: 'Західновірменська', ar: 'الأرمنية الغربية', he: 'ארמנית מערבית', sw: 'Kiarmenia cha Magharibi' },
        mgo: { en: "Meta'", ja: 'メタ語', ko: '메타어', zh: '梅塔语', yue: '梅塔語',
               vi: "Tiếng Meta'", th: "ภาษาเมตา'", id: "Bahasa Meta'", hi: 'मेटा',
               de: "Meta'", fr: "Méta'", it: "Meta'",
               es_eu: "Meta'", es_mx: "Meta'", pt_eu: "Meta'", pt_br: "Meta'",
               ru: 'Мета', uk: 'Мета', ar: 'الميتا', he: 'מטה', sw: 'Kimeta' },
        nmf: { en: 'Tangkhul Naga', ja: 'タングフル・ナガ語', ko: '탕쿨 나가어', zh: '坦库尔那加语', yue: '坦庫爾那加語',
               vi: 'Tiếng Naga Tangkhul', th: 'ภาษาตังคุลนากา', id: 'Naga Tangkhul', hi: 'तंगखुल नागा',
               de: 'Tangkhul-Naga', fr: 'Tangkhul naga', it: 'Tangkhul naga',
               es_eu: 'Tangkhul naga', es_mx: 'Tangkhul naga', pt_eu: 'Tangkhul naga', pt_br: 'Tangkhul naga',
               ru: 'Тангкхул нага', uk: 'Тангкхул-нага', ar: 'النجاوية تانغكول', he: 'טנגכול נגה', sw: 'Kinaga cha Tangkhul' },
    };
    for (const code of Object.keys(ADDED66)) {
        for (const ui of Object.keys(ADDED66[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED66[code][ui];
            }
        }
    }

    const ADDED67 = {
        pyu: { en: 'Puyuma', ja: 'プユマ語', ko: '푸유마어', zh: '卑南语', yue: '卑南語',
               vi: 'Tiếng Puyuma', th: 'ภาษาพุยุมา', id: 'Bahasa Puyuma', hi: 'पुयुमा',
               de: 'Puyuma', fr: 'Puyuma', it: 'Puyuma',
               es_eu: 'Puyuma', es_mx: 'Puyuma', pt_eu: 'Puyuma', pt_br: 'Puyuma',
               ru: 'Пуюма', uk: 'Пуюма', ar: 'البويوما', he: 'פויומה', sw: 'Kipuyuma' },
        szy: { en: 'Sakizaya', ja: 'サキザヤ語', ko: '사키자야어', zh: '撒奇莱雅语', yue: '撒奇萊雅語',
               vi: 'Tiếng Sakizaya', th: 'ภาษาซากิซายา', id: 'Bahasa Sakizaya', hi: 'सकीज़ाया',
               de: 'Sakizaya', fr: 'Sakizaya', it: 'Sakizaya',
               es_eu: 'Sakizaya', es_mx: 'Sakizaya', pt_eu: 'Sakizaya', pt_br: 'Sakizaya',
               ru: 'Сакизая', uk: 'Сакізая', ar: 'الساكيزايا', he: 'סקיזיה', sw: 'Kisakizaya' },
        ssf: { en: 'Thao', ja: 'サオ語', ko: '사오어', zh: '邵语', yue: '邵語',
               vi: 'Tiếng Thao', th: 'ภาษาเถา', id: 'Bahasa Thao', hi: 'थाओ',
               de: 'Thao', fr: 'Thao', it: 'Thao',
               es_eu: 'Thao', es_mx: 'Thao', pt_eu: 'Thao', pt_br: 'Thao',
               ru: 'Тхао', uk: 'Тхао', ar: 'التاو', he: 'תאו', sw: 'Kithao' },
    };
    for (const code of Object.keys(ADDED67)) {
        for (const ui of Object.keys(ADDED67[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED67[code][ui];
            }
        }
    }

    const ADDED68 = {
        bfa: { en: 'Bari', ja: 'バリ語', ko: '바리어', zh: '巴里语', yue: '巴里語',
               vi: 'Tiếng Bari', th: 'ภาษาบารี', id: 'Bahasa Bari', hi: 'बारी',
               de: 'Bari', fr: 'Bari', it: 'Bari',
               es_eu: 'Bari', es_mx: 'Bari', pt_eu: 'Bari', pt_br: 'Bari',
               ru: 'Бари', uk: 'Барі', ar: 'الباري', he: 'ברי', sw: 'Kibari' },
        spp: { en: 'Senoufo Supyire', ja: 'セヌフォ・スプイレ語', ko: '세누포 수피레어', zh: '塞努福苏皮雷语', yue: '塞努福蘇皮雷語',
               vi: 'Tiếng Senufo Supyire', th: 'ภาษาเซนูโฟซูปีเร', id: 'Senufo Supyire', hi: 'सेनुफो सुप्यिरे',
               de: 'Senoufo Supyire', fr: 'Sénoufo supyiré', it: 'Senoufo supyire',
               es_eu: 'Senufo supyire', es_mx: 'Senufo supyire', pt_eu: 'Senufo supyire', pt_br: 'Senufo supyire',
               ru: 'Сенуфо супире', uk: 'Сенуфо-супіре', ar: 'السنوفو سوبيري', he: 'סנופו סופירה', sw: 'Kisenufo cha Supyire' },
        emi: { en: 'Mussau-Emira', ja: 'ムッサウ・エミラ語', ko: '무사우-에미라어', zh: '穆索-埃米拉语', yue: '穆索-埃米拉語',
               vi: 'Tiếng Mussau-Emira', th: 'ภาษามุสเซา-เอมีรา', id: 'Bahasa Mussau-Emira', hi: 'मुसाउ-एमिरा',
               de: 'Mussau-Emira', fr: 'Mussau-emira', it: 'Mussau-Emira',
               es_eu: 'Mussau-emira', es_mx: 'Mussau-emira', pt_eu: 'Mussau-emira', pt_br: 'Mussau-emira',
               ru: 'Муссау-эмира', uk: 'Муссау-еміра', ar: 'الموسو-إميرا', he: 'מוסאו-אמירה', sw: 'Kimussau-Emira' },
    };
    for (const code of Object.keys(ADDED68)) {
        for (const ui of Object.keys(ADDED68[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED68[code][ui];
            }
        }
    }

    // Batch 59 cleanup: remove kau (Kanuri) from ADDED58 since duplicate of kr
    delete LANG_NAMES.en.kau;

    const ADDED69 = {
        ofs: { en: 'Old Frisian', ja: '古フリジア語', ko: '고대 프리지아어', zh: '古弗里西语', yue: '古弗里西語',
               vi: 'Tiếng Frisia cổ', th: 'ภาษาฟรีเซียนโบราณ', id: 'Bahasa Frisia Kuno', hi: 'पुरानी फ्रिशियाई',
               de: 'Altfriesisch', fr: 'Vieux frison', it: 'Antico frisone',
               es_eu: 'Frisón antiguo', es_mx: 'Frisón antiguo', pt_eu: 'Frísio antigo', pt_br: 'Frísio antigo',
               ru: 'Древнефризский', uk: 'Давньофризька', ar: 'الفريزية القديمة', he: 'פריזית עתיקה', sw: 'Kifrisia cha Kale' },
        mzh: { en: 'Wichí', ja: 'ウィチ語', ko: '위치어', zh: '维奇语', yue: '維奇語',
               vi: 'Tiếng Wichí', th: 'ภาษาวีชี', id: 'Bahasa Wichí', hi: 'विची',
               de: 'Wichí', fr: 'Wichí', it: 'Wichí',
               es_eu: 'Wichí', es_mx: 'Wichí', pt_eu: 'Wichí', pt_br: 'Wichí',
               ru: 'Вичи', uk: 'Вічі', ar: 'الويتشي', he: 'ויצ׳י', sw: 'Kiwichi' },
    };
    for (const code of Object.keys(ADDED69)) {
        for (const ui of Object.keys(ADDED69[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED69[code][ui];
            }
        }
    }

    const ADDED70 = {
        tiv: { en: 'Tiv', ja: 'ティブ語', ko: '티브어', zh: '蒂夫语', yue: '蒂夫語',
               vi: 'Tiếng Tiv', th: 'ภาษาทิฟ', id: 'Bahasa Tiv', hi: 'टिव',
               de: 'Tiv', fr: 'Tiv', it: 'Tiv',
               es_eu: 'Tiv', es_mx: 'Tiv', pt_eu: 'Tiv', pt_br: 'Tiv',
               ru: 'Тив', uk: 'Тів', ar: 'التيفية', he: 'טיב', sw: 'Kitiv' },
        efi: { en: 'Efik', ja: 'エフィク語', ko: '에피크어', zh: '埃菲克语', yue: '埃菲克語',
               vi: 'Tiếng Efik', th: 'ภาษาเอฟิก', id: 'Bahasa Efik', hi: 'एफिक',
               de: 'Efik', fr: 'Efik', it: 'Efik',
               es_eu: 'Efik', es_mx: 'Efik', pt_eu: 'Efik', pt_br: 'Efik',
               ru: 'Эфик', uk: 'Ефік', ar: 'الإفيكية', he: 'אפיק', sw: 'Kiefik' },
        ekp: { en: 'Ekpeye', ja: 'エクペイェ語', ko: '에크페예어', zh: '埃克佩耶语', yue: '埃克佩耶語',
               vi: 'Tiếng Ekpeye', th: 'ภาษาเอกเปเย', id: 'Bahasa Ekpeye', hi: 'एक्पेये',
               de: 'Ekpeye', fr: 'Ekpeye', it: 'Ekpeye',
               es_eu: 'Ekpeye', es_mx: 'Ekpeye', pt_eu: 'Ekpeye', pt_br: 'Ekpeye',
               ru: 'Экпейе', uk: 'Екпеє', ar: 'الإكبيي', he: 'אקפיה', sw: 'Kiekpeye' },
    };
    for (const code of Object.keys(ADDED70)) {
        for (const ui of Object.keys(ADDED70[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED70[code][ui];
            }
        }
    }

    const ADDED71 = {
        izi: { en: 'Izii', ja: 'イジ語', ko: '이지어', zh: '伊兹语', yue: '伊茲語',
               vi: 'Tiếng Izii', th: 'ภาษาอีซี', id: 'Bahasa Izii', hi: 'इज़ी',
               de: 'Izii', fr: 'Izii', it: 'Izii',
               es_eu: 'Izii', es_mx: 'Izii', pt_eu: 'Izii', pt_br: 'Izii',
               ru: 'Изии', uk: 'Іззі', ar: 'الإزية', he: 'איזי', sw: 'Kiizi' },
        hot: { en: 'Hote', ja: 'ホテ語', ko: '호테어', zh: '霍特语', yue: '霍特語',
               vi: 'Tiếng Hote', th: 'ภาษาโฮเต', id: 'Bahasa Hote', hi: 'होते',
               de: 'Hote', fr: 'Hote', it: 'Hote',
               es_eu: 'Hote', es_mx: 'Hote', pt_eu: 'Hote', pt_br: 'Hote',
               ru: 'Хоте', uk: 'Хоте', ar: 'الهوتي', he: 'הותה', sw: 'Kihote' },
        nlc: { en: 'Nalca', ja: 'ナルカ語', ko: '날차어', zh: '纳尔卡语', yue: '納爾卡語',
               vi: 'Tiếng Nalca', th: 'ภาษานัลคา', id: 'Bahasa Nalca', hi: 'नाल्का',
               de: 'Nalca', fr: 'Nalca', it: 'Nalca',
               es_eu: 'Nalca', es_mx: 'Nalca', pt_eu: 'Nalca', pt_br: 'Nalca',
               ru: 'Налка', uk: 'Налка', ar: 'النالكا', he: 'נלקה', sw: 'Kinalca' },
    };
    for (const code of Object.keys(ADDED71)) {
        for (const ui of Object.keys(ADDED71[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED71[code][ui];
            }
        }
    }

    const ADDED72 = {
        nhe: { en: 'Eastern Huasteca Nahuatl', ja: '東部ウアステカ・ナワトル語', ko: '동부 우아스테카 나우아틀어', zh: '东瓦斯特卡纳瓦特尔语', yue: '東瓦斯特卡納瓦特爾語',
               vi: 'Tiếng Nahuatl Huasteca Đông', th: 'ภาษานาวาตล์ฮัวสเตกาตะวันออก', id: 'Nahuatl Huasteca Timur', hi: 'पूर्वी हुआस्तेका नहुआतल',
               de: 'Östliches Huasteka-Nahuatl', fr: 'Nahuatl huastéca oriental', it: 'Nahuatl huasteca orientale',
               es_eu: 'Náhuatl huasteca oriental', es_mx: 'Náhuatl de la Huasteca Oriental', pt_eu: 'Nauatle huasteco oriental', pt_br: 'Nauatle huasteca oriental',
               ru: 'Восточный уастекский науатль', uk: 'Східна гуастекська науатль', ar: 'النواتل الهواستيكية الشرقية', he: 'נאוואטל הואסטקה מזרחי', sw: 'Kinahuatl cha Huasteca cha Mashariki' },
        sum: { en: 'Sumo', ja: 'スモ語', ko: '수모어', zh: '苏摩语', yue: '蘇摩語',
               vi: 'Tiếng Sumo', th: 'ภาษาซูโม', id: 'Bahasa Sumo', hi: 'सुमो',
               de: 'Sumo', fr: 'Sumo', it: 'Sumo',
               es_eu: 'Sumo', es_mx: 'Sumo', pt_eu: 'Sumo', pt_br: 'Sumo',
               ru: 'Сумо', uk: 'Сумо', ar: 'السومو', he: 'סומו', sw: 'Kisumo' },
        ets: { en: 'Yekhee', ja: 'イェキー語', ko: '예키어', zh: '耶克伊语', yue: '耶克伊語',
               vi: 'Tiếng Yekhee', th: 'ภาษาเยกี', id: 'Bahasa Yekhee', hi: 'येखी',
               de: 'Yekhee', fr: 'Yekhee', it: 'Yekhee',
               es_eu: 'Yekhee', es_mx: 'Yekhee', pt_eu: 'Yekhee', pt_br: 'Yekhee',
               ru: 'Йекхе', uk: 'Єкхе', ar: 'اليخية', he: 'יקה', sw: 'Kiyekhee' },
    };
    for (const code of Object.keys(ADDED72)) {
        for (const ui of Object.keys(ADDED72[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED72[code][ui];
            }
        }
    }

    const ADDED73 = {
        thp: { en: 'Thompson', ja: 'トンプソン語', ko: '톰슨어', zh: '汤普森语', yue: '湯普森語',
               vi: 'Tiếng Thompson', th: 'ภาษาทอมป์สัน', id: 'Bahasa Thompson', hi: 'थॉम्पसन',
               de: 'Thompson', fr: 'Thompson', it: 'Thompson',
               es_eu: 'Thompson', es_mx: 'Thompson', pt_eu: 'Thompson', pt_br: 'Thompson',
               ru: 'Томпсон', uk: 'Томпсон', ar: 'التومبسون', he: 'תומפסון', sw: 'Kithompson' },
        fai: { en: 'Faiwol', ja: 'ファイウォル語', ko: '파이월어', zh: '法伊沃尔语', yue: '法伊沃爾語',
               vi: 'Tiếng Faiwol', th: 'ภาษาไฟวอล', id: 'Bahasa Faiwol', hi: 'फ़ाइवोल',
               de: 'Faiwol', fr: 'Faiwol', it: 'Faiwol',
               es_eu: 'Faiwol', es_mx: 'Faiwol', pt_eu: 'Faiwol', pt_br: 'Faiwol',
               ru: 'Файвол', uk: 'Файвол', ar: 'الفايول', he: 'פאיוול', sw: 'Kifaiwol' },
        olg: { en: 'Olkol', ja: 'オルコル語', ko: '올콜어', zh: '奥尔科尔语', yue: '奧爾科爾語',
               vi: 'Tiếng Olkol', th: 'ภาษาโอลโคล', id: 'Bahasa Olkol', hi: 'ओलकोल',
               de: 'Olkol', fr: 'Olkol', it: 'Olkol',
               es_eu: 'Olkol', es_mx: 'Olkol', pt_eu: 'Olkol', pt_br: 'Olkol',
               ru: 'Олкол', uk: 'Олкол', ar: 'الأولكول', he: 'אולקול', sw: 'Kiolkol' },
    };
    for (const code of Object.keys(ADDED73)) {
        for (const ui of Object.keys(ADDED73[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED73[code][ui];
            }
        }
    }

    const ADDED74 = {
        nch: { en: 'Central Huasteca Nahuatl', ja: '中央ウアステカ・ナワトル語', ko: '중부 우아스테카 나우아틀어', zh: '中瓦斯特卡纳瓦特尔语', yue: '中瓦斯特卡納瓦特爾語',
               vi: 'Tiếng Nahuatl Huasteca Trung', th: 'ภาษานาวาตล์ฮัวสเตกากลาง', id: 'Nahuatl Huasteca Tengah', hi: 'मध्य हुआस्तेका नहुआतल',
               de: 'Zentrales Huasteka-Nahuatl', fr: 'Nahuatl huastéca central', it: 'Nahuatl huasteca centrale',
               es_eu: 'Náhuatl huasteca central', es_mx: 'Náhuatl de la Huasteca Central', pt_eu: 'Nauatle huasteco central', pt_br: 'Nauatle huasteca central',
               ru: 'Центральный уастекский науатль', uk: 'Центральна гуастекська науатль', ar: 'النواتل الهواستيكية الوسطى', he: 'נאוואטל הואסטקה מרכזי', sw: 'Kinahuatl cha Huasteca cha Kati' },
        nhw: { en: 'Western Huasteca Nahuatl', ja: '西部ウアステカ・ナワトル語', ko: '서부 우아스테카 나우아틀어', zh: '西瓦斯特卡纳瓦特尔语', yue: '西瓦斯特卡納瓦特爾語',
               vi: 'Tiếng Nahuatl Huasteca Tây', th: 'ภาษานาวาตล์ฮัวสเตกาตะวันตก', id: 'Nahuatl Huasteca Barat', hi: 'पश्चिमी हुआस्तेका नहुआतल',
               de: 'Westliches Huasteka-Nahuatl', fr: 'Nahuatl huastéca occidental', it: 'Nahuatl huasteca occidentale',
               es_eu: 'Náhuatl huasteca occidental', es_mx: 'Náhuatl de la Huasteca Occidental', pt_eu: 'Nauatle huasteco ocidental', pt_br: 'Nauatle huasteca ocidental',
               ru: 'Западный уастекский науатль', uk: 'Західна гуастекська науатль', ar: 'النواتل الهواستيكية الغربية', he: 'נאוואטל הואסטקה מערבי', sw: 'Kinahuatl cha Huasteca cha Magharibi' },
        poh: { en: "Poqomchi'", ja: 'ポコムチ語', ko: '포코므치어', zh: '波科姆奇语', yue: '波科姆奇語',
               vi: 'Tiếng Poqomchi', th: 'ภาษาโปกอมชี', id: 'Bahasa Poqomchi', hi: 'पोकोमची',
               de: 'Pocomchí', fr: 'Pocomchí', it: 'Pocomchí',
               es_eu: 'Pocomchí', es_mx: 'Pocomchí', pt_eu: 'Pocomchí', pt_br: 'Pocomchí',
               ru: 'Покомчи', uk: 'Покомчі', ar: 'البوكومتشي', he: 'פוקומצ׳י', sw: 'Kipoqomchi' },
    };
    for (const code of Object.keys(ADDED74)) {
        for (const ui of Object.keys(ADDED74[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED74[code][ui];
            }
        }
    }

    const ADDED75 = {
        kjb: { en: "Q'anjob'al", ja: 'カンジョバル語', ko: '칸호발어', zh: '康霍巴尔语', yue: '康霍巴爾語',
               vi: "Tiếng Q'anjob'al", th: 'ภาษาคานโจบาล', id: "Bahasa Q'anjob'al", hi: 'कानहोबाल',
               de: 'Kanjobal', fr: "Q'anjob'al", it: "Q'anjob'al",
               es_eu: 'Kanjobal', es_mx: 'Kanjobal', pt_eu: 'Kanjobal', pt_br: 'Kanjobal',
               ru: 'Канжобаль', uk: 'Канхобаль', ar: 'الكانخوبال', he: 'קנחובאל', sw: 'Kikanjobal' },
        ctu: { en: 'Chol', ja: 'チョル語', ko: '촐어', zh: '乔尔语', yue: '喬爾語',
               vi: 'Tiếng Chol', th: 'ภาษาโชล', id: 'Bahasa Chol', hi: 'चोल',
               de: 'Chol', fr: 'Chol', it: 'Chol',
               es_eu: "Ch'ol", es_mx: "Ch'ol", pt_eu: 'Chol', pt_br: 'Chol',
               ru: 'Чоль', uk: 'Чоль', ar: 'التشول', he: "צ'ול", sw: 'Kichol' },
        agu: { en: 'Aguacateco', ja: 'アグアカテコ語', ko: '아과카테코어', zh: '阿瓜卡特科语', yue: '阿瓜卡特科語',
               vi: 'Tiếng Aguacateco', th: 'ภาษาอาวากาเตโก', id: 'Bahasa Aguacateco', hi: 'अगुआकातेको',
               de: 'Aguacateco', fr: 'Aguacatèque', it: 'Aguacateco',
               es_eu: 'Aguacateco', es_mx: 'Aguacateco', pt_eu: 'Aguacateco', pt_br: 'Aguacateco',
               ru: 'Агуакатеко', uk: 'Агуакатеко', ar: 'الأغواكاتيكو', he: 'אגוואקטקו', sw: 'Kiaguacateco' },
    };
    for (const code of Object.keys(ADDED75)) {
        for (const ui of Object.keys(ADDED75[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED75[code][ui];
            }
        }
    }
    const ADDED83 = {
        mvc: { en: "Central Mam", ja: "中部マム語", ko: "중부 맘어", zh: "中部玛姆语", yue: "中部瑪姆語",
               vi: "Tiếng Mam Trung", th: "ภาษามัมกลาง", id: "Bahasa Mam Tengah", hi: "मध्य माम",
               de: "Zentral-Mam", fr: "Mam central", it: "Mam centrale",
               es_eu: "Mam central", es_mx: "Mam central", pt_eu: "Mam central", pt_br: "Mam central",
               ru: "Центральный мам", uk: "Центральний мам", ar: "المام الوسطى", he: "מאם מרכזית", sw: "Kimam cha Kati" },
        zts: { en: "Tlacolula Zapotec", ja: "トラコルラ・サポテク語", ko: "틀라콜룰라 사포텍어", zh: "特拉科卢拉萨波特克语", yue: "特拉科盧拉薩波特克語",
               vi: "Tiếng Zapotec Tlacolula", th: "ภาษาซาโปเตกตลาโกลูลา", id: "Bahasa Zapotek Tlacolula", hi: "त्लाकोलूला सैपोटेक",
               de: "Tlacolula-Zapotekisch", fr: "Zapotèque de Tlacolula", it: "Zapoteco di Tlacolula",
               es_eu: "Zapoteco de Tlacolula", es_mx: "Zapoteco de Tlacolula", pt_eu: "Zapoteca de Tlacolula", pt_br: "Zapoteco de Tlacolula",
               ru: "Тлаколульский сапотекский", uk: "Тлаколульська сапотекська", ar: "السابوتيك التلاكولولي", he: "זאפוטק טלאקולולה", sw: "Kizapoteki cha Tlacolula" },
        chf: { en: "Tabasco Chontal", ja: "タバスコ・チョンタル語", ko: "타바스코 촌탈어", zh: "塔巴斯科乔恩塔尔语", yue: "塔巴斯科喬恩塔爾語",
               vi: "Tiếng Chontal Tabasco", th: "ภาษาชนตัลตาบัสโก", id: "Bahasa Chontal Tabasco", hi: "तबास्को चोंटाल",
               de: "Tabasco-Chontal", fr: "Chontal de Tabasco", it: "Chontal di Tabasco",
               es_eu: "Chontal de Tabasco", es_mx: "Chontal de Tabasco", pt_eu: "Chontal de Tabasco", pt_br: "Chontal de Tabasco",
               ru: "Чонталь Табаско", uk: "Чонталь Табаско", ar: "تشونتال تاباسكو", he: "צ'ונטל טבסקו", sw: "Kichontal cha Tabasco" },
    };
    for (const code of Object.keys(ADDED83)) {
        for (const ui of Object.keys(ADDED83[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED83[code][ui];
            }
        }
    }
    const ADDED84 = {
        mxv: { en: "Metlatónoc Mixtec", ja: "メトラトノク・ミシュテコ語", ko: "메틀라토녹 믹스테코어", zh: "梅特拉托诺克米斯特克语", yue: "梅特拉托諾克米斯特克語",
               vi: "Tiếng Mixtec Metlatónoc", th: "ภาษามิกซ์เตกเมตลาโตน็อก", id: "Bahasa Mixtec Metlatónoc", hi: "मेत्लातोनोक मिक्सटेक",
               de: "Metlatónoc-Mixtekisch", fr: "Mixtèque de Metlatónoc", it: "Mixteco di Metlatónoc",
               es_eu: "Mixteco de Metlatónoc", es_mx: "Mixteco de Metlatónoc", pt_eu: "Mixteca de Metlatónoc", pt_br: "Mixteco de Metlatónoc",
               ru: "Метлатонокский миштекский", uk: "Метлатонокська міштекська", ar: "الميشتيك الميتلاتونوكي", he: "מישטק מטלאטונוק", sw: "Kimixteki cha Metlatónoc" },
        toc: { en: "Coyutla Totonac", ja: "コユトラ・トトナック語", ko: "코유틀라 토토낙어", zh: "科尤特拉托托纳克语", yue: "科尤特拉托托納克語",
               vi: "Tiếng Totonac Coyutla", th: "ภาษาโตโตนากโกยุตลา", id: "Bahasa Totonak Coyutla", hi: "कोयुत्ला तोतोनाक",
               de: "Coyutla-Totonakisch", fr: "Totonaque de Coyutla", it: "Totonaco di Coyutla",
               es_eu: "Totonaco de Coyutla", es_mx: "Totonaco de Coyutla", pt_eu: "Totonaca de Coyutla", pt_br: "Totonaco de Coyutla",
               ru: "Коютлинский тотонакский", uk: "Коютланська тотонацька", ar: "التوتوناك الكويوتلي", he: "טוטונאק קויוטלה", sw: "Kitotonaki cha Coyutla" },
        huv: { en: "San Mateo del Mar Huave", ja: "サン・マテオ・デル・マル・ウアベ語", ko: "산마테오델마르 우아베어", zh: "圣马特奥德尔马尔瓦韦语", yue: "聖馬特奧德爾馬爾瓦韋語",
               vi: "Tiếng Huave San Mateo del Mar", th: "ภาษาฮัวเวซานมาเตโอเดลมาร์", id: "Bahasa Huave San Mateo del Mar", hi: "सान मातेओ देल मार हुआवे",
               de: "Huave (San Mateo del Mar)", fr: "Huave de San Mateo del Mar", it: "Huave di San Mateo del Mar",
               es_eu: "Huave de San Mateo del Mar", es_mx: "Huave de San Mateo del Mar", pt_eu: "Huave de San Mateo del Mar", pt_br: "Huave de San Mateo del Mar",
               ru: "Уаве Сан-Матео-дель-Мар", uk: "Уаве Сан-Матео-дель-Мар", ar: "الهوافي سان ماتيو ديל مار", he: "וואווה סן מטאו דל מאר", sw: "Kihuave cha San Mateo del Mar" },
    };
    for (const code of Object.keys(ADDED84)) {
        for (const ui of Object.keys(ADDED84[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED84[code][ui];
            }
        }
    }

    const ADDED87 = {
        lbj: { en: 'Ladakhi', ja: 'ラダック語', ko: '라다크어', zh: '拉达克语', yue: '拉達克語',
               vi: 'Tiếng Ladakh', th: 'ภาษาลาดักห์', id: 'Bahasa Ladakhi', hi: 'लद्दाखी',
               de: 'Ladakhi', fr: 'Ladakhi', it: 'Ladakhi',
               es_eu: 'Ladakhi', es_mx: 'Ladakhi', pt_eu: 'Ladakhi', pt_br: 'Ladakhi',
               ru: 'Ладакхи', uk: 'Ладакхі', ar: 'اللاداخية', he: 'לדאקית', sw: 'Kiladakhi' },
        xkz: { en: 'Kurtöp', ja: 'クルテプ語', ko: '쿠르퇴프어', zh: '库尔特普语', yue: '庫爾特普語',
               vi: 'Tiếng Kurtöp', th: 'ภาษากูร์เติพ', id: 'Bahasa Kurtöp', hi: 'कुर्तेप',
               de: 'Kurtöp', fr: 'Kurtöp', it: 'Kurtöp',
               es_eu: 'Kurtöp', es_mx: 'Kurtöp', pt_eu: 'Kurtöp', pt_br: 'Kurtöp',
               ru: 'Куртёп', uk: 'Куртеп', ar: 'الكورتوب', he: 'קורטופ', sw: 'Kikurtöp' },
        kmu: { en: 'Kanite', ja: 'カニテ語', ko: '카니테어', zh: '卡尼特语', yue: '卡尼特語',
               vi: 'Tiếng Kanite', th: 'ภาษาคานีเต', id: 'Bahasa Kanite', hi: 'कनीते',
               de: 'Kanite', fr: 'Kanite', it: 'Kanite',
               es_eu: 'Kanite', es_mx: 'Kanite', pt_eu: 'Kanite', pt_br: 'Kanite',
               ru: 'Каните', uk: 'Каніте', ar: 'الكانيتي', he: 'קניטה', sw: 'Kikanite' },
    };
    for (const code of Object.keys(ADDED87)) {
        for (const ui of Object.keys(ADDED87[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED87[code][ui];
            }
        }
    }

    const ADDED88 = {
        agt: { en: 'Central Cagayan Agta', ja: '中部カガヤン・アグタ語', ko: '중부 카가얀 아그타어', zh: '中部卡加延阿格塔语', yue: '中部卡加延阿格塔語',
               vi: 'Tiếng Agta Cagayan Trung', th: 'ภาษาอักตากากายันกลาง', id: 'Bahasa Agta Cagayan Tengah', hi: 'मध्य कागायन अग्ता',
               de: 'Zentral-Cagayan-Agta', fr: 'Agta du Cagayan central', it: 'Agta del Cagayan centrale',
               es_eu: 'Agta de Cagayán Central', es_mx: 'Agta de Cagayán Central', pt_eu: 'Agta de Cagayán Central', pt_br: 'Agta de Cagayán Central',
               ru: 'Центральнокагаянский агта', uk: 'Центральнокагаянська агта', ar: 'الأغتا الكاجايان الوسطى', he: 'אגטה קגיין מרכזית', sw: 'Kiagta cha Cagayán cha Kati' },
        bto: { en: 'Iriga Bicolano', ja: 'イリガ・ビコラノ語', ko: '이리가 비콜라노어', zh: '伊里加比科拉诺语', yue: '伊里加比科拉諾語',
               vi: 'Tiếng Bicolano Iriga', th: 'ภาษาบีโกลาโนอิริกา', id: 'Bahasa Bicolano Iriga', hi: 'इरिगा बिकोलानो',
               de: 'Iriga-Bicolano', fr: 'Bicolano d’Iriga', it: 'Bicolano di Iriga',
               es_eu: 'Bicolano de Iriga', es_mx: 'Bicolano de Iriga', pt_eu: 'Bicolano de Iriga', pt_br: 'Bicolano de Iriga',
               ru: 'Иригский биколано', uk: 'Іригська біколано', ar: 'البيكولانو الإيريغي', he: 'ביקולנו איריגה', sw: 'Kibicolano cha Iriga' },
        pll: { en: 'Shwe Palaung', ja: 'シュエ・パラウン語', ko: '슈웨 팔라웅어', zh: '瑞掸佤语', yue: '瑞撣佤語',
               vi: 'Tiếng Palaung Shwe', th: 'ภาษาปลังชเว', id: 'Bahasa Palaung Shwe', hi: 'श्वे पलाउंग',
               de: 'Schwe-Palaung', fr: 'Palaung shwe', it: 'Palaung shwe',
               es_eu: 'Palaung shwe', es_mx: 'Palaung shwe', pt_eu: 'Palaung shwe', pt_br: 'Palaung shwe',
               ru: 'Шве-палаунг', uk: 'Шве-палаунг', ar: 'البالاونغ الشوي', he: 'שווה פלאונג', sw: 'Kishwepalaung' },
    };
    for (const code of Object.keys(ADDED88)) {
        for (const ui of Object.keys(ADDED88[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED88[code][ui];
            }
        }
    }

    const ADDED89 = {
        frr: { en: 'North Frisian', ja: '北フリジア語', ko: '북프리지아어', zh: '北弗里西语', yue: '北弗里西語',
               vi: 'Tiếng Bắc Frisia', th: 'ภาษาฟริเซียนเหนือ', id: 'Bahasa Frisia Utara', hi: 'उत्तरी फ़्रिसियाई',
               de: 'Nordfriesisch', fr: 'Frison septentrional', it: 'Frisone settentrionale',
               es_eu: 'Frisón septentrional', es_mx: 'Frisón septentrional', pt_eu: 'Frísio setentrional', pt_br: 'Frísio setentrional',
               ru: 'Севернофризский', uk: 'Північнофризька', ar: 'الفريزية الشمالية', he: 'פריזית צפונית', sw: 'Kifrisia cha Kaskazini' },
        olo: { en: 'Livvi-Karelian', ja: 'リヴヴィ・カレリア語', ko: '리비-카렐리아어', zh: '利维-卡累利阿语', yue: '利維-卡累利阿語',
               vi: 'Tiếng Livvi-Karelia', th: 'ภาษาลิฟวี-คาเรเลีย', id: 'Bahasa Livvi-Karelia', hi: 'लिव्वि-करेलियाई',
               de: 'Olonetzisch', fr: 'Carélien livvi', it: 'Careliano livvi',
               es_eu: 'Carelio livvi', es_mx: 'Carelio livvi', pt_eu: 'Cario livvi', pt_br: 'Cário livvi',
               ru: 'Ливвиковский', uk: 'Ливвиківська', ar: 'الليفية الكاريلية', he: 'ליווי-קארלית', sw: 'Kikarjala cha Livvi' },
    };
    for (const code of Object.keys(ADDED89)) {
        for (const ui of Object.keys(ADDED89[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED89[code][ui];
            }
        }
    }
    // Batch B1 (2026-05-07): African languages bxk / kqn / gej.
    const ADDED85 = {
        bxk: { ja: 'ブクス語', en: 'Bukusu', ko: '부쿠수어', zh: '布库苏语', yue: '布庫蘇語',
               vi: 'Tiếng Bukusu', th: 'ภาษาบูคูซู', id: 'Bahasa Bukusu', hi: 'बुकुसु',
               de: 'Bukusu', fr: 'Bukusu', it: 'Bukusu',
               es_eu: 'Bukusu', es_mx: 'Bukusu', pt_eu: 'Bukusu', pt_br: 'Bukusu',
               ru: 'Букусу', uk: 'Букусу', ar: 'البوكوسو', he: 'בוקוסו', sw: 'Kibukusu' },
        kqn: { ja: 'カオンデ語', en: 'Kaonde', ko: '카온데어', zh: '卡翁德语', yue: '卡翁德語',
               vi: 'Tiếng Kaonde', th: 'ภาษาเคาน์เด', id: 'Bahasa Kaonde', hi: 'काऊन्डे',
               de: 'Kaonde', fr: 'Kaonde', it: 'Kaonde',
               es_eu: 'Kaonde', es_mx: 'Kaonde', pt_eu: 'Kaonde', pt_br: 'Kaonde',
               ru: 'Каонде', uk: 'Каонде', ar: 'الكاوندي', he: 'קאונדה', sw: 'Kikaonde' },
        gej: { ja: 'ゲン語', en: 'Gen (Mina)', ko: '겐어', zh: '根语', yue: '根語',
               vi: 'Tiếng Gen', th: 'ภาษาเกน', id: 'Bahasa Gen', hi: 'गेन',
               de: 'Gen (Mina)', fr: 'Guin (Mina)', it: 'Gen (Mina)',
               es_eu: 'Gen (Mina)', es_mx: 'Gen (Mina)', pt_eu: 'Gen (Mina)', pt_br: 'Gen (Mina)',
               ru: 'Ген (мина)', uk: 'Ген (міна)', ar: 'الجن (مينا)', he: 'גן (מינה)', sw: 'Kigen' },
    };
    for (const code of Object.keys(ADDED85)) {
        for (const ui of Object.keys(ADDED85[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED85[code][ui];
            }
        }
    }
    // Batch B2 (2026-05-07): African languages anu / mxc / rim.
    const ADDED86 = {
        anu: { ja: 'アヌアク語', en: 'Anuak', ko: '아누아크어', zh: '阿努阿克语', yue: '阿努阿克語',
               vi: 'Tiếng Anuak', th: 'ภาษาอนูอัก', id: 'Bahasa Anuak', hi: 'अनुआक',
               de: 'Anuak', fr: 'Anuak', it: 'Anuak',
               es_eu: 'Anuak', es_mx: 'Anuak', pt_eu: 'Anuak', pt_br: 'Anuak',
               ru: 'Ануак', uk: 'Ануак', ar: 'الأنواك', he: 'אנואק', sw: 'Kianuak' },
        mxc: { ja: 'マニカ語', en: 'Manyika', ko: '마니카어', zh: '马尼卡语', yue: '馬尼卡語',
               vi: 'Tiếng Manyika', th: 'ภาษามานยีกา', id: 'Bahasa Manyika', hi: 'मन्यिका',
               de: 'Manyika', fr: 'Manyika', it: 'Manyika',
               es_eu: 'Manyika', es_mx: 'Manyika', pt_eu: 'Manyika', pt_br: 'Manyika',
               ru: 'Маньика', uk: 'Маньїка', ar: 'الماني-كا', he: 'מאניקה', sw: 'Kimanyika' },
        rim: { ja: 'ニャトゥル語', en: 'Nyaturu', ko: '냐투루어', zh: '尼亚图鲁语', yue: '尼亞圖魯語',
               vi: 'Tiếng Nyaturu', th: 'ภาษาญาตูรู', id: 'Bahasa Nyaturu', hi: 'न्यातुरु',
               de: 'Nyaturu', fr: 'Nyaturu', it: 'Nyaturu',
               es_eu: 'Nyaturu', es_mx: 'Nyaturu', pt_eu: 'Nyaturu', pt_br: 'Nyaturu',
               ru: 'Ньятуру', uk: 'Ньятуру', ar: 'النياتورو', he: 'ניאטורו', sw: 'Kinyaturu' },
    };
    for (const code of Object.keys(ADDED86)) {
        for (const ui of Object.keys(ADDED86[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED86[code][ui];
            }
        }
    }

    const ADDED90 = {
        bar: { en: 'Bavarian', ja: 'バイエルン語', ko: '바이에른어', zh: '巴伐利亚语', yue: '巴伐利亞語',
               vi: 'Tiếng Bayern', th: 'ภาษาบาวาเรียน', id: 'Bahasa Bavaria', hi: 'बवेरियन',
               de: 'Bairisch', fr: 'Bavarois', it: 'Bavarese',
               es_eu: 'Bávaro', es_mx: 'Bávaro', pt_eu: 'Bávaro', pt_br: 'Bávaro',
               ru: 'Баварский', uk: 'Баварська', ar: 'البافارية', he: 'בוואריאנית', sw: 'Kibavaria' },
        agx: { en: 'Aghul', ja: 'アグル語', ko: '아굴어', zh: '阿古尔语', yue: '阿古爾語',
               vi: 'Tiếng Aghul', th: 'ภาษาอาฆุล', id: 'Bahasa Aghul', hi: 'अगुल',
               de: 'Aghulisch', fr: 'Aghoul', it: 'Aghul',
               es_eu: 'Agul', es_mx: 'Agul', pt_eu: 'Agul', pt_br: 'Agul',
               ru: 'Агульский', uk: 'Агульська', ar: 'الأغولية', he: 'אגולית', sw: 'Kiaghul' },
        toj: { en: 'Tojolabal', ja: 'トホラバル語', ko: '토홀라발어', zh: '托霍拉巴尔语', yue: '托霍拉巴爾語',
               vi: "Tiếng Tojol-ab'al", th: 'ภาษาโตโคลาบัล', id: 'Bahasa Tojolabal', hi: 'तोहोलाबाल',
               de: 'Tojolabal', fr: 'Tojolabal', it: 'Tojolabal',
               es_eu: 'Tojolabal', es_mx: 'Tojolabal', pt_eu: 'Tojolabal', pt_br: 'Tojolabal',
               ru: 'Тохолабаль', uk: 'Тохолабаль', ar: 'التوهولابال', he: 'טוחולבל', sw: 'Kitojolabal' },
    };
    for (const code of Object.keys(ADDED90)) {
        for (const ui of Object.keys(ADDED90[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED90[code][ui];
            }
        }
    }

    const ADDED91 = {
        ddo: { en: 'Tsez', ja: 'ツェズ語', ko: '체즈어', zh: '采兹语', yue: '采茲語',
               vi: 'Tiếng Tsez', th: 'ภาษาเซซ', id: 'Bahasa Tsez', hi: 'त्सेज़',
               de: 'Tsesisch', fr: 'Tsez', it: 'Tsez',
               es_eu: 'Tsez', es_mx: 'Tsez', pt_eu: 'Tsez', pt_br: 'Tsez',
               ru: 'Цезский', uk: 'Цезька', ar: 'الصزية', he: 'צזית', sw: 'Kitsez' },
        bzd: { en: 'Bribri', ja: 'ブリブリ語', ko: '브리브리어', zh: '布里布里语', yue: '布里布里語',
               vi: 'Tiếng Bribri', th: 'ภาษาบรีบรี', id: 'Bahasa Bribri', hi: 'ब्रिब्री',
               de: 'Bribri', fr: 'Bribri', it: 'Bribri',
               es_eu: 'Bribri', es_mx: 'Bribri', pt_eu: 'Bribri', pt_br: 'Bribri',
               ru: 'Брибри', uk: 'Брибрі', ar: 'البريبري', he: 'בריברי', sw: 'Kibribri' },
        thr: { en: 'Tharu', ja: 'タール語', ko: '타루어', zh: '塔鲁语', yue: '塔魯語',
               vi: 'Tiếng Tharu', th: 'ภาษาทารู', id: 'Bahasa Tharu', hi: 'थारू',
               de: 'Tharu', fr: 'Tharou', it: 'Tharu',
               es_eu: 'Tharu', es_mx: 'Tharu', pt_eu: 'Tharu', pt_br: 'Tharu',
               ru: 'Тхару', uk: 'Тхару', ar: 'الثارو', he: 'תארו', sw: 'Kitharu' },
    };
    for (const code of Object.keys(ADDED91)) {
        for (const ui of Object.keys(ADDED91[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED91[code][ui];
            }
        }
    }

    const ADDED92 = {
        arp: { en: 'Arapaho', ja: 'アラパホ語', ko: '아라파호어', zh: '阿拉帕霍语', yue: '阿拉帕霍語',
               vi: 'Tiếng Arapaho', th: 'ภาษาอาราปาโฮ', id: 'Bahasa Arapaho', hi: 'अरापाहो',
               de: 'Arapaho', fr: 'Arapaho', it: 'Arapaho',
               es_eu: 'Arapaho', es_mx: 'Arapaho', pt_eu: 'Arapaho', pt_br: 'Arapaho',
               ru: 'Арапахо', uk: 'Арапахо', ar: 'الأراباهو', he: 'אראפהו', sw: 'Kiarapaho' },
        hch: { en: 'Wixarika', ja: 'ウイチョル語', ko: '위차리카어', zh: '维拉里卡语', yue: '維拉里卡語',
               vi: 'Tiếng Wixárika', th: 'ภาษาวีฮาริกา', id: 'Bahasa Wixárika', hi: 'विक्सारिका',
               de: 'Huichol', fr: 'Wixárika', it: 'Wixárika',
               es_eu: 'Huichol', es_mx: 'Wixárika', pt_eu: 'Huichol', pt_br: 'Wixárika',
               ru: 'Уичоль', uk: 'Уічоль', ar: 'الويتشول', he: 'ויקסאריקה', sw: 'Kiwixarika' },
        pwo: { en: 'Western Pwo Karen', ja: '西部ポー・カレン語', ko: '서부 포 카렌어', zh: '西部坡瓦克伦语', yue: '西部坡瓦克倫語',
               vi: 'Tiếng Pwo Karen Tây', th: 'ภาษาโพว์ตะวันตก', id: 'Bahasa Pwo Karen Barat', hi: 'पश्चिमी पवो करेन',
               de: 'Westliches Pwo-Karen', fr: 'Karen pwo occidental', it: 'Karen pwo occidentale',
               es_eu: 'Karen pwo occidental', es_mx: 'Karen pwo occidental', pt_eu: 'Karen pwo ocidental', pt_br: 'Karen pwo ocidental',
               ru: 'Западный по-карен', uk: 'Західна по-карен', ar: 'الكارن البوية الغربية', he: 'פוו-קארן מערבית', sw: 'Kikareni cha Pwo Magharibi' },
    };
    for (const code of Object.keys(ADDED92)) {
        for (const ui of Object.keys(ADDED92[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED92[code][ui];
            }
        }
    }

    const ADDED93 = {
        crn: { en: 'Cora', ja: 'コラ語', ko: '코라어', zh: '科拉语', yue: '科拉語',
               vi: 'Tiếng Cora', th: 'ภาษาโกรา', id: 'Bahasa Cora', hi: 'कोरा',
               de: 'Cora', fr: 'Cora', it: 'Cora',
               es_eu: 'Cora', es_mx: 'Cora', pt_eu: 'Cora', pt_br: 'Cora',
               ru: 'Кора', uk: 'Кора', ar: 'الكورا', he: 'קורה', sw: 'Kicora' },
        pcd: { en: 'Picard', ja: 'ピカール語', ko: '피카르드어', zh: '皮卡尔语', yue: '皮卡爾語',
               vi: 'Tiếng Picard', th: 'ภาษาปีการ์', id: 'Bahasa Picard', hi: 'पिकार्ड',
               de: 'Pikardisch', fr: 'Picard', it: 'Piccardo',
               es_eu: 'Picardo', es_mx: 'Picardo', pt_eu: 'Picardo', pt_br: 'Picardo',
               ru: 'Пикардский', uk: 'Пікардська', ar: 'البيكاردية', he: 'פיקארדית', sw: 'Kipicard' },
        aer: { en: 'Eastern Arrernte', ja: '東部アレンテ語', ko: '동부 아레른테어', zh: '东部阿雷尔特语', yue: '東部阿雷爾特語',
               vi: 'Tiếng Arrernte Đông', th: 'ภาษาอาร์เรินเตตะวันออก', id: 'Bahasa Arrernte Timur', hi: 'पूर्वी अरेर्न्टे',
               de: 'Ost-Arrernte', fr: 'Arrernte oriental', it: 'Arrernte orientale',
               es_eu: 'Arrernte oriental', es_mx: 'Arrernte oriental', pt_eu: 'Arrernte oriental', pt_br: 'Arrernte oriental',
               ru: 'Восточный аррернте', uk: 'Східна аррернте', ar: 'الأرّيرنتي الشرقية', he: 'אררנטה מזרחית', sw: 'Kiarrernte cha Mashariki' },
    };
    for (const code of Object.keys(ADDED93)) {
        for (const ui of Object.keys(ADDED93[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED93[code][ui];
            }
        }
    }

    const ADDED94 = {
        nrf: { en: 'Norman', ja: 'ノルマン語', ko: '노르만어', zh: '诺曼语', yue: '諾曼語',
               vi: 'Tiếng Norman', th: 'ภาษานอร์มัน', id: 'Bahasa Norman', hi: 'नॉर्मन',
               de: 'Normannisch', fr: 'Normand', it: 'Normanno',
               es_eu: 'Normando', es_mx: 'Normando', pt_eu: 'Normando', pt_br: 'Normando',
               ru: 'Нормандский', uk: 'Нормандська', ar: 'النورمانية', he: 'נורמנית', sw: 'Kinormani' },
        gaa: { en: 'Ga', ja: 'ガー語', ko: '가어', zh: '加语', yue: '加語',
               vi: 'Tiếng Ga', th: 'ภาษากา', id: 'Bahasa Ga', hi: 'गा',
               de: 'Ga', fr: 'Ga', it: 'Ga',
               es_eu: 'Ga', es_mx: 'Ga', pt_eu: 'Ga', pt_br: 'Ga',
               ru: 'Га', uk: 'Га', ar: 'الغا', he: 'גא', sw: 'Kiga' },
        nzi: { en: 'Nzima', ja: 'ンゼマ語', ko: '은제마어', zh: '恩泽马语', yue: '恩澤馬語',
               vi: 'Tiếng Nzima', th: 'ภาษานเซมา', id: 'Bahasa Nzima', hi: 'न्ज़ेमा',
               de: 'Nzima', fr: 'Nzéma', it: 'Nzima',
               es_eu: 'Nzima', es_mx: 'Nzima', pt_eu: 'Nzima', pt_br: 'Nzima',
               ru: 'Нзима', uk: 'Нзіма', ar: 'النزيمة', he: 'נזימה', sw: 'Kinzima' },
    };
    for (const code of Object.keys(ADDED94)) {
        for (const ui of Object.keys(ADDED94[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED94[code][ui];
            }
        }
    }

    const ADDED95 = {
        aja: { en: 'Aja', ja: 'アジャ語', ko: '아자어', zh: '阿贾语', yue: '阿賈語',
               vi: 'Tiếng Aja', th: 'ภาษาอะจะ', id: 'Bahasa Aja', hi: 'अजा',
               de: 'Aja', fr: 'Adja', it: 'Aja',
               es_eu: 'Adya', es_mx: 'Adya', pt_eu: 'Adja', pt_br: 'Adja',
               ru: 'Аджа', uk: 'Аджа', ar: 'الأجا', he: 'אג\'ה', sw: 'Kiaja' },
        shy: { en: 'Shawiya', ja: 'シャウィヤ語', ko: '샤위야어', zh: '沙维亚语', yue: '沙維亞語',
               vi: 'Tiếng Shawiya', th: 'ภาษาชอวียา', id: 'Bahasa Shawiya', hi: 'शविया',
               de: 'Schawiya', fr: 'Chaoui', it: 'Sciauiya',
               es_eu: 'Chaoui', es_mx: 'Chaoui', pt_eu: 'Chaoui', pt_br: 'Chaoui',
               ru: 'Шауи', uk: 'Шауі', ar: 'الشاوية', he: 'שאוויה', sw: 'Kishawiya' },
        zne: { en: 'Zande', ja: 'ザンデ語', ko: '잔데어', zh: '赞德语', yue: '贊德語',
               vi: 'Tiếng Zande', th: 'ภาษาซานเด', id: 'Bahasa Zande', hi: 'ज़ांदे',
               de: 'Zande', fr: 'Zandé', it: 'Zande',
               es_eu: 'Zande', es_mx: 'Zande', pt_eu: 'Zande', pt_br: 'Zande',
               ru: 'Занде', uk: 'Занде', ar: 'الزاندي', he: 'זנדה', sw: 'Kizande' },
    };
    for (const code of Object.keys(ADDED95)) {
        for (const ui of Object.keys(ADDED95[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED95[code][ui];
            }
        }
    }

    const ADDED96 = {
        aae: { en: 'Arbëresh', ja: 'アルブレシュ語', ko: '아르브레쉬어', zh: '阿尔伯雷什语', yue: '阿爾伯雷什語',
               vi: 'Tiếng Arbëresh', th: 'ภาษาอาร์เบรซ', id: 'Bahasa Arbëresh', hi: 'अर्बरेश',
               de: 'Italo-Albanisch', fr: 'Arbërisht', it: 'Arbëresh',
               es_eu: 'Arbëresh', es_mx: 'Arbëresh', pt_eu: 'Arbërisht', pt_br: 'Arbërisht',
               ru: 'Арбрешский', uk: 'Арбрешська', ar: 'الأربيريشية', he: 'ארברשית', sw: 'Kiarbëresh' },
        cuk: { en: 'San Blas Kuna', ja: 'サンブラス・グナ語', ko: '산블라스 구나어', zh: '圣布拉斯古纳语', yue: '聖布拉斯古納語',
               vi: 'Tiếng Kuna San Blas', th: 'ภาษาคูนาซานบลาส', id: 'Bahasa Kuna San Blas', hi: 'सान ब्लास कूना',
               de: 'San-Blas-Kuna', fr: 'Kuna de San Blas', it: 'Kuna di San Blas',
               es_eu: 'Kuna de San Blas', es_mx: 'Kuna de San Blas', pt_eu: 'Kuna de San Blas', pt_br: 'Kuna de San Blas',
               ru: 'Куна Сан-Бласа', uk: 'Куна Сан-Бласу', ar: 'الكونا سان بلاس', he: 'קונה סן בלאס', sw: 'Kikuna cha San Blas' },
        chp: { en: 'Chipewyan', ja: 'チペワイアン語', ko: '치페와이언어', zh: '奇佩怀安语', yue: '奇佩懷安語',
               vi: 'Tiếng Chipewyan', th: 'ภาษาชิเปวิยัน', id: 'Bahasa Chipewyan', hi: 'चिपेवियन',
               de: 'Chipewyan', fr: 'Chipewyan', it: 'Chipewyan',
               es_eu: 'Chipewyan', es_mx: 'Chipewyan', pt_eu: 'Chipewyan', pt_br: 'Chipewyan',
               ru: 'Чипевьян', uk: 'Чіпевян', ar: 'التشيبيوية', he: "צ'יפוויאן", sw: 'Kichipewyan' },
    };
    for (const code of Object.keys(ADDED96)) {
        for (const ui of Object.keys(ADDED96[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED96[code][ui];
            }
        }
    }

    const ADDED97 = {
        pdt: { en: 'Plautdietsch', ja: 'プラウトディーチェ語', ko: '플라우트디치어', zh: '普劳特迪特语', yue: '普勞特迪特語',
               vi: 'Tiếng Plautdietsch', th: 'ภาษาเพลาท์ดีตช์', id: 'Bahasa Plautdietsch', hi: 'प्लाउटडीच',
               de: 'Plautdietsch', fr: 'Plautdietsch', it: 'Plautdietsch',
               es_eu: 'Plautdietsch', es_mx: 'Plautdietsch', pt_eu: 'Plautdietsch', pt_br: 'Plautdietsch',
               ru: 'Плаутдич', uk: 'Плаутдіч', ar: 'البلاودييتش', he: 'פלאוטדיטש', sw: 'Kiplautdietsch' },
        maz: { en: 'Mazahua', ja: 'マサワ語', ko: '마사와어', zh: '马萨瓦语', yue: '馬薩瓦語',
               vi: 'Tiếng Mazahua', th: 'ภาษามาซาวา', id: 'Bahasa Mazahua', hi: 'मासाहुआ',
               de: 'Mazahua', fr: 'Mazahua', it: 'Mazahua',
               es_eu: 'Mazahua', es_mx: 'Mazahua', pt_eu: 'Mazahua', pt_br: 'Mazahua',
               ru: 'Масауа', uk: 'Масауа', ar: 'الماساهوا', he: 'מסוואה', sw: 'Kimazahua' },
        car: { en: 'Galibi Carib', ja: 'ガリビ・カリブ語', ko: '갈리비 카리브어', zh: '加利比加勒比语', yue: '加利比加勒比語',
               vi: "Tiếng Kari'na", th: 'ภาษาคาริบ', id: 'Bahasa Karib', hi: 'कारिब',
               de: 'Karib', fr: 'Caribe', it: 'Caribe',
               es_eu: 'Caribe', es_mx: 'Caribe', pt_eu: 'Caribe', pt_br: 'Caribe',
               ru: 'Кариб', uk: 'Карибська', ar: 'الكاريبية', he: 'קריבית', sw: 'Kikarib' },
    };
    for (const code of Object.keys(ADDED97)) {
        for (const ui of Object.keys(ADDED97[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED97[code][ui];
            }
        }
    }

    const ADDED98 = {
        lzz: { en: 'Laz', ja: 'ラズ語', ko: '라즈어', zh: '拉兹语', yue: '拉茲語',
               vi: 'Tiếng Laz', th: 'ภาษาลาซ', id: 'Bahasa Laz', hi: 'लाज़',
               de: 'Lasisch', fr: 'Laze', it: 'Laz',
               es_eu: 'Laz', es_mx: 'Laz', pt_eu: 'Laz', pt_br: 'Laz',
               ru: 'Лазский', uk: 'Лазька', ar: 'اللازية', he: 'לאז', sw: 'Kilaz' },
        nog: { en: 'Nogai', ja: 'ノガイ語', ko: '노가이어', zh: '诺盖语', yue: '諾蓋語',
               vi: 'Tiếng Nogai', th: 'ภาษาโนไก', id: 'Bahasa Nogai', hi: 'नोगाई',
               de: 'Nogaisch', fr: 'Nogaï', it: 'Nogai',
               es_eu: 'Nogayo', es_mx: 'Nogayo', pt_eu: 'Nogai', pt_br: 'Nogai',
               ru: 'Ногайский', uk: 'Ногайська', ar: 'النوغاي', he: 'נוגאית', sw: 'Kinogai' },
        amw: { en: 'Western Neo-Aramaic', ja: '西方新アラム語', ko: '서방 신아람어', zh: '西新亚拉姆语', yue: '西新亞拉姆語',
               vi: 'Tiếng Aramaic Tân Tây', th: 'ภาษาอราเมอิกใหม่ตะวันตก', id: 'Bahasa Neo-Aram Barat', hi: 'पश्चिमी नवीन-अराइमी',
               de: 'Westliches Neuaramäisch', fr: 'Néo-araméen occidental', it: 'Neoaramaico occidentale',
               es_eu: 'Neoarameo occidental', es_mx: 'Neoarameo occidental', pt_eu: 'Neoaramaico ocidental', pt_br: 'Neoaramaico ocidental',
               ru: 'Западноарамейский', uk: 'Західноарамейська', ar: 'الآرامية الجديدة الغربية', he: 'נאו-ארמית מערבית', sw: 'Kiaramayika cha Magharibi' },
    };
    for (const code of Object.keys(ADDED98)) {
        for (const ui of Object.keys(ADDED98[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED98[code][ui];
            }
        }
    }

    const ADDED99 = {
        emk: { en: 'Eastern Maninka', ja: '東部マニンカ語', ko: '동부 마닌카어', zh: '东部马宁卡语', yue: '東部馬寧卡語',
               vi: 'Tiếng Maninka Đông', th: 'ภาษามานินกาตะวันออก', id: 'Bahasa Maninka Timur', hi: 'पूर्वी मनिंका',
               de: 'Ost-Maninka', fr: 'Maninka oriental', it: 'Maninka orientale',
               es_eu: 'Maninka oriental', es_mx: 'Maninka oriental', pt_eu: 'Maninka oriental', pt_br: 'Maninka oriental',
               ru: 'Восточный манинка', uk: 'Східна манінка', ar: 'المانينكا الشرقية', he: 'מנינקה מזרחית', sw: 'Kimaninka cha Mashariki' },
        gum: { en: 'Misak', ja: 'ミサク語', ko: '미삭어', zh: '米萨克语', yue: '米薩克語',
               vi: 'Tiếng Misak', th: 'ภาษามิซัค', id: 'Bahasa Misak', hi: 'मिसाक',
               de: 'Misak', fr: 'Guambien', it: 'Misak',
               es_eu: 'Guambiano', es_mx: 'Guambiano', pt_eu: 'Misak', pt_br: 'Misak',
               ru: 'Гуамбиано', uk: 'Гуамбіано', ar: 'الميساك', he: 'מיסאק', sw: 'Kimisak' },
    };
    for (const code of Object.keys(ADDED99)) {
        for (const ui of Object.keys(ADDED99[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED99[code][ui];
            }
        }
    }

    const ADDED100 = {
        otq: { en: 'Querétaro Otomi', ja: 'ケレタロ・オトミ語', ko: '케레타로 오토미어', zh: '克雷塔罗奥托米语', yue: '克雷塔羅奧托米語',
               vi: 'Tiếng Otomi Querétaro', th: 'ภาษาโอโตมีเกเรทาโร', id: 'Bahasa Otomi Querétaro', hi: 'क्वेरेटारो ओतोमी',
               de: 'Querétaro-Otomi', fr: 'Otomi de Querétaro', it: 'Otomi di Querétaro',
               es_eu: 'Otomí de Querétaro', es_mx: 'Otomí de Querétaro', pt_eu: 'Otomi de Querétaro', pt_br: 'Otomi de Querétaro',
               ru: 'Керетарское отоми', uk: 'Керетарська отомі', ar: 'الأوتومي الكيريتارية', he: 'אוטומי קרטארו', sw: 'Kiotomi cha Querétaro' },
        piu: { en: 'Pintupi-Luritja', ja: 'ピントゥピ・ルリチャ語', ko: '핀투피-루리차어', zh: '品图皮-卢里查语', yue: '品圖皮-盧里查語',
               vi: 'Tiếng Pintupi-Luritja', th: 'ภาษาปินตูปี-ลูริชา', id: 'Bahasa Pintupi-Luritja', hi: 'पिंटुपी-लुरीचा',
               de: 'Pintupi-Luritja', fr: 'Pintupi-Luritja', it: 'Pintupi-Luritja',
               es_eu: 'Pintupi-Luritja', es_mx: 'Pintupi-Luritja', pt_eu: 'Pintupi-Luritja', pt_br: 'Pintupi-Luritja',
               ru: 'Пинтупи-Луричья', uk: 'Пінтупі-Лурича', ar: 'البنتوبي-لوريتجا', he: "פינטופי-לוריטג'ה", sw: 'Kipintupi-Luritja' },
        bru: { en: 'Eastern Bru', ja: '東部ブル語', ko: '동부 브루어', zh: '东部布鲁语', yue: '東部布魯語',
               vi: 'Tiếng Bru Đông', th: 'ภาษาบรูตะวันออก', id: 'Bahasa Bru Timur', hi: 'पूर्वी ब्रू',
               de: 'Ost-Bru', fr: 'Bru oriental', it: 'Bru orientale',
               es_eu: 'Bru oriental', es_mx: 'Bru oriental', pt_eu: 'Bru oriental', pt_br: 'Bru oriental',
               ru: 'Восточный бру', uk: 'Східна бру', ar: 'البرو الشرقية', he: 'ברו מזרחית', sw: 'Kibru cha Mashariki' },
    };
    for (const code of Object.keys(ADDED100)) {
        for (const ui of Object.keys(ADDED100[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED100[code][ui];
            }
        }
    }

    const ADDED101 = {
        itz: { en: 'Itzá Maya', ja: 'イツァ・マヤ語', ko: '이차 마야어', zh: '伊察玛雅语', yue: '伊察瑪雅語',
               vi: 'Tiếng Itzá Maya', th: 'ภาษาอิตซามายา', id: 'Bahasa Itzá Maya', hi: 'इत्ज़ा माया',
               de: 'Itzá-Maya', fr: 'Maya itzá', it: 'Maya itzá',
               es_eu: 'Maya itzá', es_mx: 'Maya itzá', pt_eu: 'Maia itzá', pt_br: 'Maia itzá',
               ru: 'Ица', uk: 'Іца', ar: 'الإيتزا', he: "איצא", sw: 'Kiitza' },
        usp: { en: 'Uspanteko', ja: 'ウスパンテコ語', ko: '우스판테코어', zh: '乌斯潘特科语', yue: '烏斯潘特科語',
               vi: 'Tiếng Uspanteko', th: 'ภาษาอุสปันเทโก', id: 'Bahasa Uspanteko', hi: 'उस्पान्तेको',
               de: 'Uspantekisch', fr: 'Uspantèque', it: 'Uspanteko',
               es_eu: 'Uspanteko', es_mx: 'Uspanteko', pt_eu: 'Uspanteco', pt_br: 'Uspanteco',
               ru: 'Успантекский', uk: 'Успантекська', ar: 'الأوسبانتيكية', he: 'אוספנטקו', sw: 'Kiuspanteko' },
        xsr: { en: 'Sherpa', ja: 'シェルパ語', ko: '셰르파어', zh: '夏尔巴语', yue: '夏爾巴語',
               vi: 'Tiếng Sherpa', th: 'ภาษาเชอร์ปา', id: 'Bahasa Sherpa', hi: 'शेरपा',
               de: 'Sherpa', fr: 'Sherpa', it: 'Sherpa',
               es_eu: 'Sherpa', es_mx: 'Sherpa', pt_eu: 'Sherpa', pt_br: 'Sherpa',
               ru: 'Шерпский', uk: 'Шерпа', ar: 'الشيربا', he: 'שרפה', sw: 'Kisherpa' },
    };
    for (const code of Object.keys(ADDED101)) {
        for (const ui of Object.keys(ADDED101[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED101[code][ui];
            }
        }
    }

    const ADDED102 = {
        ngu: { en: 'Guerrero Nahuatl', ja: 'ゲレーロ・ナワトル語', ko: '게레로 나우아틀어', zh: '格雷罗那瓦特尔语', yue: '格雷羅那瓦特爾語',
               vi: 'Tiếng Nahuatl Guerrero', th: 'ภาษานาวาตล์เกร์เรโร', id: 'Bahasa Nahuatl Guerrero', hi: 'गेरेरो नावाहुआटल',
               de: 'Guerrero-Nahuatl', fr: 'Nahuatl du Guerrero', it: 'Nahuatl di Guerrero',
               es_eu: 'Náhuatl de Guerrero', es_mx: 'Náhuatl de Guerrero', pt_eu: 'Náuatle de Guerrero', pt_br: 'Náuatle de Guerrero',
               ru: 'Герреро науатль', uk: 'Герреро науатль', ar: 'الناهواتل الغيريرية', he: 'נאוואטל גררו', sw: 'Kinahuatl cha Guerrero' },
        ppl: { en: 'Nawat', ja: 'ナワト語', ko: '나와트어', zh: '纳瓦特语', yue: '納瓦特語',
               vi: 'Tiếng Nawat', th: 'ภาษานาวาต', id: 'Bahasa Nawat', hi: 'नवात',
               de: 'Pipil', fr: 'Pipil', it: 'Pipil',
               es_eu: 'Pipil', es_mx: 'Pipil', pt_eu: 'Pipil', pt_br: 'Pipil',
               ru: 'Пипиль', uk: 'Піпіль', ar: 'البيبيل', he: 'פיפיל', sw: 'Kipipil' },
        bts: { en: 'Simalungun Batak', ja: 'シマルングン・バタク語', ko: '시말룽군 바타크어', zh: '西马伦贡巴塔克语', yue: '西馬倫貢巴塔克語',
               vi: 'Tiếng Batak Simalungun', th: 'ภาษาบาตักซีมาลุงกุน', id: 'Bahasa Batak Simalungun', hi: 'सिमालुंगुन बाताक',
               de: 'Simalungun', fr: 'Batak simalungun', it: 'Batak simalungun',
               es_eu: 'Batak simalungun', es_mx: 'Batak simalungun', pt_eu: 'Batak simalungun', pt_br: 'Batak simalungun',
               ru: 'Сималунгунский батак', uk: 'Сімалунгунська батак', ar: 'الباتاك السيمالنغونية', he: 'בטאק סימלונגון', sw: 'Kibatak cha Simalungun' },
    };
    for (const code of Object.keys(ADDED102)) {
        for (const ui of Object.keys(ADDED102[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED102[code][ui];
            }
        }
    }

    const ADDED103 = {
        abs: { en: 'Ambon Malay', ja: 'アンボン・マレー語', ko: '암본 말레이어', zh: '安汶马来语', yue: '安汶馬來語',
               vi: 'Tiếng Mã Lai Ambon', th: 'ภาษามลายูอัมบน', id: 'Bahasa Melayu Ambon', hi: 'अम्बोन मलय',
               de: 'Ambon-Malay', fr: 'Malais d\'Ambon', it: 'Malay di Ambon',
               es_eu: 'Malayo de Ambón', es_mx: 'Malayo de Ambón', pt_eu: 'Malaio de Ambom', pt_br: 'Malaio de Ambom',
               ru: 'Амбонский малайский', uk: 'Амбонська малайська', ar: 'الملايو الأمبونية', he: 'מלאית אמבון', sw: 'Kimalay cha Ambon' },
        mui: { en: 'Musi', ja: 'ムシ語', ko: '무시어', zh: '穆西语', yue: '穆西語',
               vi: 'Tiếng Musi', th: 'ภาษามูซี', id: 'Bahasa Musi', hi: 'मूसी',
               de: 'Musi', fr: 'Musi', it: 'Musi',
               es_eu: 'Musi', es_mx: 'Musi', pt_eu: 'Musi', pt_br: 'Musi',
               ru: 'Муси', uk: 'Мусі', ar: 'الموسي', he: 'מוסי', sw: 'Kimusi' },
        ho: { en: 'Hiri Motu', ja: 'ヒリ・モツ語', ko: '히리 모투어', zh: '希里莫图语', yue: '希里莫圖語',
               vi: 'Tiếng Hiri Motu', th: 'ภาษาฮีรีโมตู', id: 'Bahasa Hiri Motu', hi: 'हिरी मोटू',
               de: 'Hiri Motu', fr: 'Hiri Motu', it: 'Hiri Motu',
               es_eu: 'Hiri Motu', es_mx: 'Hiri Motu', pt_eu: 'Hiri Motu', pt_br: 'Hiri Motu',
               ru: 'Хири-моту', uk: 'Хірі-моту', ar: 'الهيري موتو', he: 'הירי מוטו', sw: 'Kihiri Motu' },
    };
    for (const code of Object.keys(ADDED103)) {
        for (const ui of Object.keys(ADDED103[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED103[code][ui];
            }
        }
    }

    const ADDED104 = {
        bdq: { en: 'Bahnar', ja: 'バフナル語', ko: '바흐나르어', zh: '巴拿语', yue: '巴拿語',
               vi: 'Tiếng Ba Na', th: 'ภาษาบานา', id: 'Bahasa Bahnar', hi: 'बाह्नार',
               de: 'Bahnar', fr: 'Bahnar', it: 'Bahnar',
               es_eu: 'Bahnar', es_mx: 'Bahnar', pt_eu: 'Bahnar', pt_br: 'Bahnar',
               ru: 'Бахнар', uk: 'Бахнар', ar: 'الباهنار', he: 'באהנאר', sw: 'Kibahnar' },
        ddn: { en: 'Donno So', ja: 'ドノ・ソ語', ko: '돈노소어', zh: '多诺索语', yue: '多諾索語',
               vi: 'Tiếng Donno So', th: 'ภาษาโดนโนโซ', id: 'Bahasa Donno So', hi: 'दोन्नो सो',
               de: 'Donno So', fr: 'Dogon de Donno So', it: 'Donno So',
               es_eu: 'Donno So', es_mx: 'Donno So', pt_eu: 'Donno So', pt_br: 'Donno So',
               ru: 'Донно-со', uk: 'Донно-со', ar: 'الدونو-سو', he: "דונו סו", sw: 'Kidonno So' },
        aiw: { en: 'Aari', ja: 'アアリ語', ko: '아리어', zh: '阿里语', yue: '阿里語',
               vi: 'Tiếng Aari', th: 'ภาษาอาริ', id: 'Bahasa Aari', hi: 'आरि',
               de: 'Aari', fr: 'Aari', it: 'Aari',
               es_eu: 'Aari', es_mx: 'Aari', pt_eu: 'Aari', pt_br: 'Aari',
               ru: 'Аари', uk: 'Аарі', ar: 'الآري', he: 'אארי', sw: 'Kiaari' },
    };
    for (const code of Object.keys(ADDED104)) {
        for (const ui of Object.keys(ADDED104[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED104[code][ui];
            }
        }
    }

    const ADDED105 = {
        enf: { en: 'Forest Enets', ja: '森林エネツ語', ko: '산림 에네츠어', zh: '林地恩内茨语', yue: '林地恩內茨語',
               vi: 'Tiếng Enets Rừng', th: 'ภาษาเอเนตส์ป่า', id: 'Bahasa Enets Hutan', hi: 'वन एनेट्स',
               de: 'Wald-Enzisch', fr: 'Énètse forestier', it: 'Enzo forestale',
               es_eu: 'Enets del bosque', es_mx: 'Enets del bosque', pt_eu: 'Enets da floresta', pt_br: 'Enets da floresta',
               ru: 'Лесной энецкий', uk: 'Лісовий енецький', ar: 'الإنتس الغابوية', he: 'אנץ יערית', sw: 'Kienets cha Msitu' },
        abe: { en: 'Western Abenaki', ja: '西部アベナキ語', ko: '서부 아베나키어', zh: '西阿贝纳基语', yue: '西阿貝納基語',
               vi: 'Tiếng Abenaki Tây', th: 'ภาษาอาเบนากีตะวันตก', id: 'Bahasa Abenaki Barat', hi: 'पश्चिमी अबेनाकी',
               de: 'West-Abenaki', fr: 'Abénaquis occidental', it: 'Abenaki occidentale',
               es_eu: 'Abenaki occidental', es_mx: 'Abenaki occidental', pt_eu: 'Abenaki ocidental', pt_br: 'Abenaki ocidental',
               ru: 'Западно-абенакский', uk: 'Західноабенакська', ar: 'الأبيناكي الغربية', he: 'אבנקי מערבית', sw: 'Kiabenaki cha Magharibi' },
        bom: { en: 'Berom', ja: 'ベロム語', ko: '베롬어', zh: '贝罗姆语', yue: '貝羅姆語',
               vi: 'Tiếng Berom', th: 'ภาษาเบรอม', id: 'Bahasa Berom', hi: 'बेरोम',
               de: 'Berom', fr: 'Birom', it: 'Berom',
               es_eu: 'Berom', es_mx: 'Berom', pt_eu: 'Berom', pt_br: 'Berom',
               ru: 'Беромский', uk: 'Беромська', ar: 'البيروم', he: 'בירום', sw: 'Kiberom' },
    };
    for (const code of Object.keys(ADDED105)) {
        for (const ui of Object.keys(ADDED105[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED105[code][ui];
            }
        }
    }

    const ADDED106 = {
        max: { en: 'North Moluccan Malay', ja: '北モルッカ・マレー語', ko: '북모루카 말레이어', zh: '北马鲁古马来语', yue: '北馬魯古馬來語',
               vi: 'Tiếng Mã Lai Bắc Maluku', th: 'ภาษามลายูมาลูกูเหนือ', id: 'Bahasa Melayu Maluku Utara', hi: 'उत्तरी मलूकी मलय',
               de: 'Nord-Maluku-Malay', fr: 'Malais du Nord Maluku', it: 'Malay del Nord Maluku',
               es_eu: 'Malayo del Maluku Norte', es_mx: 'Malayo del Maluku Norte', pt_eu: 'Malaio do Maluku Norte', pt_br: 'Malaio do Maluku Norte',
               ru: 'Северномолуккский малайский', uk: 'Північномолукська малайська', ar: 'الملايو المالوكية الشمالية', he: 'מלאית מלוקו צפונית', sw: 'Kimalay cha Maluku Kaskazini' },
        swg: { en: 'Swabian', ja: 'シュヴァーベン語', ko: '슈바벤어', zh: '施瓦本语', yue: '施瓦本語',
               vi: 'Tiếng Schwaben', th: 'ภาษาชวาเบีย', id: 'Bahasa Swabia', hi: 'श्वाबियन',
               de: 'Schwäbisch', fr: 'Souabe', it: 'Svevo',
               es_eu: 'Suabo', es_mx: 'Suabo', pt_eu: 'Suábio', pt_br: 'Suábio',
               ru: 'Швабский', uk: 'Швабська', ar: 'الشوابية', he: 'שוואבית', sw: 'Kishwabia' },
        maw: { en: 'Mampruli', ja: 'マンプルリ語', ko: '맘프룰리어', zh: '曼普鲁利语', yue: '曼普魯利語',
               vi: 'Tiếng Mampruli', th: 'ภาษามัมปรูลี', id: 'Bahasa Mampruli', hi: 'मम्प्रूली',
               de: 'Mampruli', fr: 'Mampruli', it: 'Mampruli',
               es_eu: 'Mampruli', es_mx: 'Mampruli', pt_eu: 'Mampruli', pt_br: 'Mampruli',
               ru: 'Мампрули', uk: 'Мампрулі', ar: 'الممبروليّة', he: 'ממפרולי', sw: 'Kimampruli' },
    };
    for (const code of Object.keys(ADDED106)) {
        for (const ui of Object.keys(ADDED106[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED106[code][ui];
            }
        }
    }

    const ADDED107 = {
        pnb: { en: 'Western Punjabi', ja: '西部パンジャブ語', ko: '서부 펀자브어', zh: '西旁遮普语', yue: '西旁遮普語',
               vi: 'Tiếng Punjabi Tây', th: 'ภาษาปัญจาบตะวันตก', id: 'Bahasa Punjabi Barat', hi: 'पश्चिमी पंजाबी',
               de: 'West-Pandschabisch', fr: 'Pendjabi occidental', it: 'Punjabi occidentale',
               es_eu: 'Panyabí occidental', es_mx: 'Panyabí occidental', pt_eu: 'Panjabi ocidental', pt_br: 'Panjabi ocidental',
               ru: 'Западный панджаби', uk: 'Західна панджабі', ar: 'البنجابية الغربية', he: 'פונג\'אבית מערבית', sw: 'Kipanjabi cha Magharibi' },
        jia: { en: 'Jiamao', ja: 'ジアマオ語', ko: '지아마오어', zh: '加茂语', yue: '加茂語',
               vi: 'Tiếng Jiamao', th: 'ภาษาจาเหมา', id: 'Bahasa Jiamao', hi: 'जियामाओ',
               de: 'Jiamao', fr: 'Jiamao', it: 'Jiamao',
               es_eu: 'Jiamao', es_mx: 'Jiamao', pt_eu: 'Jiamao', pt_br: 'Jiamao',
               ru: 'Цзямао', uk: 'Цзямао', ar: 'الجياماو', he: 'צ\'יאמאו', sw: 'Kijiamao' },
        hns: { en: 'Caribbean Hindustani', ja: 'カリビアン・ヒンドゥスターニー語', ko: '카리브 힌두스탄어', zh: '加勒比印度斯坦语', yue: '加勒比印度斯坦語',
               vi: 'Tiếng Hindustani Caribe', th: 'ภาษาฮินดูสตานีแคริบเบียน', id: 'Bahasa Hindustani Karibia', hi: 'कैरिबियाई हिंदुस्तानी',
               de: 'Karibisches Hindustani', fr: 'Hindoustani caribéen', it: 'Hindustani caraibico',
               es_eu: 'Hindustaní caribeño', es_mx: 'Hindustaní caribeño', pt_eu: 'Hindustani caribenho', pt_br: 'Hindustani caribenho',
               ru: 'Карибский хиндустани', uk: 'Карибська гіндустані', ar: 'الهندوستانية الكاريبية', he: 'הינדוסטני קריבי', sw: 'Kihindustani cha Karibia' },
    };
    for (const code of Object.keys(ADDED107)) {
        for (const ui of Object.keys(ADDED107[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED107[code][ui];
            }
        }
    }

    // Pass 108: 3 new Sinitic dialect codes for Hanmap (zh_jiao, hak_mz, zh_gl).
    const ADDED108 = {
        zh_jiao: { en: 'Jiao-Liao Mandarin', ja: '膠遼官話 (青島音)', ko: '자오랴오 관화 (칭다오 음)', zh: '胶辽官话（青岛音）', yue: '膠遼官話（青島音）',
                   vi: 'Quan thoại Giao-Liêu (Thanh Đảo)', th: 'ภาษาแมนดารินเจียวเหลียว (ชิงเต่า)', id: 'Mandarin Jiao-Liao (Qingdao)', hi: 'जिआओ-लियाओ मंदारिन (छिंगदाओ)',
                   de: 'Jiao-Liao-Mandarin (Qingdao)', fr: 'Mandarin Jiao-Liao (Qingdao)', it: 'Mandarino Jiao-Liao (Qingdao)',
                   es_eu: 'Mandarín Jiao-Liao (Qingdao)', es_mx: 'Mandarín Jiao-Liao (Qingdao)', pt_eu: 'Mandarim Jiao-Liao (Qingdao)', pt_br: 'Mandarim Jiao-Liao (Qingdao)',
                   ru: 'Цзяо-ляоский мандарин (Циндао)', uk: 'Цзяо-ляоський мандарин (Циндао)', ar: 'ماندرين جياو-لياو (تشينغداو)', he: 'מנדרינית ג׳יאו-ליאו (צ׳ינגדאו)', sw: 'Mandarin ya Jiao-Liao (Qingdao)' },
        hak_mz: { en: 'Meixian Hakka', ja: '梅縣客家語', ko: '메이셴 객가어', zh: '梅县客家话', yue: '梅縣客家話',
                  vi: 'Tiếng Khách Gia Mai Huyện', th: 'ภาษาแคะเหมยเซี่ยน', id: 'Hakka Meixian', hi: 'मेइसिएन हक्का',
                  de: 'Meixian-Hakka', fr: 'Hakka de Meixian', it: 'Hakka di Meixian',
                  es_eu: 'Hakka de Meixian', es_mx: 'Hakka de Meixian', pt_eu: 'Hakka de Meixian', pt_br: 'Hakka de Meixian',
                  ru: 'Мэйсяньский хакка', uk: 'Мейсяньський хакка', ar: 'هكّا ميشيان', he: 'האקה מייסיאן', sw: 'Hakka ya Meixian' },
        zh_gl: { en: 'Gui-Liu Mandarin', ja: '桂柳官話 (柳州音)', ko: '구이류 관화 (류저우 음)', zh: '桂柳官话（柳州音）', yue: '桂柳官話（柳州音）',
                 vi: 'Quan thoại Quế-Liễu (Liễu Châu)', th: 'ภาษาแมนดารินกุ้ย-หลิว (หลิ่วโจว)', id: 'Mandarin Gui-Liu (Liuzhou)', hi: 'गुई-लियू मंदारिन (लिउझोऊ)',
                 de: 'Gui-Liu-Mandarin (Liuzhou)', fr: 'Mandarin Gui-Liu (Liuzhou)', it: 'Mandarino Gui-Liu (Liuzhou)',
                 es_eu: 'Mandarín Gui-Liu (Liuzhou)', es_mx: 'Mandarín Gui-Liu (Liuzhou)', pt_eu: 'Mandarim Gui-Liu (Liuzhou)', pt_br: 'Mandarim Gui-Liu (Liuzhou)',
                 ru: 'Гуй-лючжоуский мандарин (Лючжоу)', uk: 'Гуй-лючжоуський мандарин (Лючжоу)', ar: 'ماندرين غوي-ليو (ليوتشو)', he: 'מנדרינית גוּי-ליוּ (ליוּג׳וֹאוּ)', sw: 'Mandarin ya Gui-Liu (Liuzhou)' },
    };
    for (const code of Object.keys(ADDED108)) {
        for (const ui of Object.keys(ADDED108[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED108[code][ui];
            }
        }
    }

    // Pass 109: 3 new Japanese-dialect Sino-Xenic reading layers for Hanmap
    // (ja_okn = Okinawan Sino-Japanese reading layer; ja_kgs = Kagoshima /
    // Satsugū Sino-Japanese; ja_thk = Tōhoku zūzū-ben Sino-Japanese).
    // These are the kanji-reading layers, NOT the dialects themselves.
    const ADDED109 = {
        ja_okn: { en: 'Okinawan Sino-Japanese', ja: '沖縄漢字音', ko: '오키나와 한자음', zh: '沖繩漢字音', yue: '沖繩漢字音',
                  vi: 'Hán-Nhật Okinawa', th: 'จีน-ญี่ปุ่นโอกินาวะ', id: 'Sino-Jepang Okinawa', hi: 'सिनो-जापानी (ओकिनावा)',
                  de: 'Sino-Japanisch (Okinawa)', fr: 'Sino-japonais d\'Okinawa', it: 'Sino-giapponese di Okinawa',
                  es: 'Sino-japonés de Okinawa', pt: 'Sino-japonês de Okinawa',
                  ru: 'Японо-китайское чтение (Окинава)', uk: 'Японо-китайське читання (Окінава)', ar: 'الصينية اليابانية (أوكيناوا)', he: 'סינו-יפנית (אוקינאווה)', sw: 'Sino-Kijapani cha Okinawa' },
        ja_kgs: { en: 'Kagoshima Sino-Japanese', ja: '鹿児島漢字音', ko: '가고시마 한자음', zh: '鹿兒島漢字音', yue: '鹿兒島漢字音',
                  vi: 'Hán-Nhật Kagoshima', th: 'จีน-ญี่ปุ่นคาโงชิมะ', id: 'Sino-Jepang Kagoshima', hi: 'सिनो-जापानी (कागोशिमा)',
                  de: 'Sino-Japanisch (Kagoshima)', fr: 'Sino-japonais de Kagoshima', it: 'Sino-giapponese di Kagoshima',
                  es: 'Sino-japonés de Kagoshima', pt: 'Sino-japonês de Kagoshima',
                  ru: 'Японо-китайское чтение (Кагосима)', uk: 'Японо-китайське читання (Каґосіма)', ar: 'الصينية اليابانية (كاغوشيما)', he: 'סינو-יפנית (קאגושימה)', sw: 'Sino-Kijapani cha Kagoshima' },
        ja_thk: { en: 'Tōhoku Sino-Japanese', ja: '東北漢字音', ko: '도호쿠 한자음', zh: '東北漢字音', yue: '東北漢字音',
                  vi: 'Hán-Nhật Tōhoku', th: 'จีน-ญี่ปุ่นโทโฮกุ', id: 'Sino-Jepang Tōhoku', hi: 'सिनो-जापानी (तोहोकु)',
                  de: 'Sino-Japanisch (Tōhoku)', fr: 'Sino-japonais du Tōhoku', it: 'Sino-giapponese del Tōhoku',
                  es: 'Sino-japonés de Tōhoku', pt: 'Sino-japonês de Tōhoku',
                  ru: 'Японо-китайское чтение (Тохоку)', uk: 'Японо-китайське читання (Тохоку)', ar: 'الصينية اليابانية (توهوكو)', he: 'סינו-יפנית (טוהוקו)', sw: 'Sino-Kijapani cha Tōhoku' },
    };
    for (const code of Object.keys(ADDED109)) {
        for (const ui of Object.keys(ADDED109[code])) {
            if (LANG_NAMES[ui] && LANG_NAMES[ui][code] === undefined) {
                LANG_NAMES[ui][code] = ADDED109[code][ui];
            }
        }
    }
})();
