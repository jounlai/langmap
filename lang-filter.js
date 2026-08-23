/*
 * lang-filter.js — Linguistic filter panel for the Word Map.
 *
 * Adds a floating "🔍 フィルター" button (top-left). Clicking it opens a panel
 * with multi-select chip groups for linguistically meaningful categories:
 *   - 語族 (family)         — auto-extracted from LANG_DATA[*].meta.family
 *   - 文字 (script type)    — auto-extracted from meta.script via keywords
 *   - 語順 (word order)     — hand-curated for ~180 well-known languages
 *   - 声調 (tonal)          — hand-curated set of tonal languages
 *   - 形態論 (morphology)   — hand-curated for the same major set
 *   - 話者数 (speaker tier) — parsed from meta.speakers
 *
 * Filter behavior: AND across categories, OR within. Languages matching all
 * active filters keep full opacity; non-matching dim to 0.15 so the spatial
 * context is preserved. Hand-curated categories treat unknown-tagged langs
 * as non-matching (you only see what you explicitly opted into).
 *
 * No edits required to wordmap.html beyond loading this script and adding
 * `data-code` to the 2D label HTML.
 */
(function () {
    'use strict';

    // ----- Typological data ----------------------------------------------
    //
    // Word order (basic transitive clause): SOV, SVO, VSO, VOS, OVS, OSV
    // Tonal: true if phonemic tones distinguish words
    // Morph: 'isolating' | 'agglutinative' | 'fusional' | 'polysynthetic'
    //
    // Two-tier resolution to cover all 579 languages:
    //   1. FAMILY_DEFAULTS: applied based on meta.family. Most languages in a
    //      family share basic typological tendencies, so a default per family
    //      gives instant coverage for every language. Looked up by full
    //      family string first (e.g. "Sinitic (Min Nan)"), then top-level.
    //   2. F[code]: per-language overrides, applied after the family default.
    //      Used for outliers (e.g. Mandarin within Sinitic, Khmer within
    //      Austroasiatic, Punjabi within Indo-Aryan, etc.).

    // Family defaults — keyed by either full meta.family or its top-level form
    const FAMILY_DEFAULTS = {
        // Indo-European subbranches
        'Romance':         { wo: 'SVO', tone: false, morph: 'fusional' },
        'Germanic':        { wo: 'SVO', tone: false, morph: 'fusional' },
        'Germanic (East)': { wo: 'SVO', tone: false, morph: 'fusional' },
        'Germanic (creole-influenced)': { wo: 'SVO', tone: false, morph: 'isolating' },
        'Slavic':          { wo: 'SVO', tone: false, morph: 'fusional' },
        'Slavic (South)':  { wo: 'SVO', tone: false, morph: 'fusional' },
        'Slavic (West, Sorbian)': { wo: 'SVO', tone: false, morph: 'fusional' },
        'Slavic (West, Lechitic)': { wo: 'SVO', tone: false, morph: 'fusional' },
        'Indo-Aryan':      { wo: 'SOV', tone: false, morph: 'fusional' },
        'Indo-Aryan (Western)': { wo: 'SOV', tone: false, morph: 'fusional' },
        'Indo-Aryan (Eastern)': { wo: 'SOV', tone: false, morph: 'fusional' },
        'Indo-Aryan (Eastern, Bihari)': { wo: 'SOV', tone: false, morph: 'fusional' },
        'Indo-Aryan (Southern)': { wo: 'SOV', tone: false, morph: 'fusional' },
        'Indo-Aryan (Dardic)': { wo: 'SOV', tone: false, morph: 'fusional' },
        'Indo-Aryan (NW, Pahari/Punjabi-related)': { wo: 'SOV', tone: false, morph: 'fusional' },
        'Iranian':         { wo: 'SOV', tone: false, morph: 'fusional' },
        'Iranian (Northwestern)': { wo: 'SOV', tone: false, morph: 'fusional' },
        'Iranian (Northwestern, Caspian)': { wo: 'SOV', tone: false, morph: 'fusional' },
        'Iranian (Eastern)': { wo: 'SOV', tone: false, morph: 'fusional' },
        'Celtic':          { wo: 'VSO', tone: false, morph: 'fusional' },
        'Hellenic':        { wo: 'SVO', tone: false, morph: 'fusional' },
        'Baltic':          { wo: 'SVO', tone: false, morph: 'fusional' },
        'Italic':          { wo: 'SOV', tone: false, morph: 'fusional' },   // Latin
        'Anatolian (Indo-European)': { wo: 'SOV', tone: false, morph: 'fusional' },
        'Indo-European':   { wo: 'SVO', tone: false, morph: 'fusional' },   // generic
        'Indo-European (Armenian)':       { wo: 'SOV', tone: false, morph: 'fusional' },
        'Indo-European (isolate branch)': { wo: 'SOV', tone: false, morph: 'fusional' }, // Albanian/Armenian etc.
        'Tocharian (Indo-European)': { wo: 'SOV', tone: false, morph: 'fusional' },
        // Sino-Tibetan
        'Sinitic':         { wo: 'SVO', tone: true,  morph: 'isolating' },
        'Sino-Tibetan':    { wo: 'SOV', tone: true,  morph: 'agglutinative' },
        'Sino-Tibetan (Loloish)':       { wo: 'SOV', tone: true,  morph: 'isolating' },
        'Sino-Tibetan (Tibeto-Burman)': { wo: 'SOV', tone: true,  morph: 'agglutinative' },
        'Sino-Tibetan (Tibeto-Burman, Bodo-Garo)': { wo: 'SOV', tone: true,  morph: 'agglutinative' },
        'Sino-Tibetan (Tibeto-Burman, Kuki-Chin)': { wo: 'SOV', tone: true,  morph: 'agglutinative' },
        'Sino-Tibetan (Tibeto-Burman, Bodish)':    { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Sino-Tibetan (Karenic)':       { wo: 'SVO', tone: true,  morph: 'isolating' },
        'Sino-Tibetan (Naic/Loloish)':  { wo: 'SOV', tone: true,  morph: 'isolating' },
        'Sino-Tibetan (Tangut)':        { wo: 'SOV', tone: true,  morph: 'isolating' },
        'Sino-Tibetan (Pyu)':           { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Sino-Tibetan (Tibeto-Burman, Burmish)': { wo: 'SOV', tone: true,  morph: 'isolating' },
        // All Sinitic sub-variants explicitly tonal SVO
        // Audit Task 159: Sinitic sub-branches normalized to `Sinitic (X)`
        // (Pass 26). Legacy `Sino-Tibetan (X)` keys retained for back-compat.
        // etc. (parent name) rather than `Sinitic (...)`. Without these
        // explicit aliases the lookup falls back to plain `Sino-Tibetan`
        // (SOV+tonal+agglutinative) which is wrong for Sinitic varieties.
        'Sino-Tibetan (Min Nan)':       { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sino-Tibetan (Wu)':            { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sino-Tibetan (Yue)':           { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Min Nan)':            { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Wu)':                 { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Yue)':                { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Mandarin)':           { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Mandarin, Jianghuai)':{ wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Mandarin, Ji-Lu)':    { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Mandarin, Lan-Yin)':  { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Min Nan, Chao-Shan)': { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Min Bei)':            { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Pu-Xian Min)':        { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Yue, Sze Yap)':       { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Wu, Oujiang)':        { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Wu, Taihu)':          { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Hui)':                { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Pinghua)':            { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Mandarin, Southwestern)': { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Mandarin, Zhongyuan)':    { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Min Nan)':            { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Min Nan, Hainanese)': { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Wu)':                 { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sinitic (Hakka)':              { wo: 'SVO', tone: true, morph: 'isolating' },
        // SE Asian minority-language additions (Phase 16)
        'Austroasiatic (Vietic)':       { wo: 'SVO', tone: true, morph: 'isolating' }, // Vietnamese, Mường
        'Austroasiatic (Palaungic)':    { wo: 'SVO', tone: false, morph: 'isolating' }, // Wa
        'Sino-Tibetan (Karen, Pwo)':    { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sino-Tibetan (Karen, Sgaw)':   { wo: 'SVO', tone: true, morph: 'isolating' },
        'Sino-Tibetan (Sal, Jingpho)':  { wo: 'SOV', tone: true, morph: 'agglutinative' }, // Jingpo/Kachin
        'Sino-Tibetan (Loloish, Hani)': { wo: 'SOV', tone: true, morph: 'isolating' }, // Akha
        'Kra-Dai (Tai, Central)':       { wo: 'SVO', tone: true, morph: 'isolating' }, // Tày, Nung
        'Austronesian (Sabahan)':       { wo: 'VSO', tone: false, morph: 'agglutinative' }, // Kadazan-Dusun
        // Phase 17 — additional 100K+ minority lang families
        'Sino-Tibetan (Tibeto-Burman, Bodo-Garo)': { wo: 'SOV', tone: true, morph: 'agglutinative' }, // Garo, Bodo
        'Sino-Tibetan (Tibeto-Burman, Tujia)':     { wo: 'SOV', tone: true, morph: 'isolating' },     // Tujia
        'Mayan (Quichean)':                        { wo: 'VSO', tone: false, morph: 'agglutinative' },// K'iche', Q'eqchi', Mam — Mayan
        'Afro-Asiatic (Omotic)':                   { wo: 'SOV', tone: true, morph: 'agglutinative' }, // Wolaytta
        'Afro-Asiatic (Cushitic, Highland East)':  { wo: 'SOV', tone: true, morph: 'agglutinative' }, // Sidama
        'Austronesian (West Barito)':              { wo: 'SVO', tone: false, morph: 'agglutinative' },// Ngaju Dayak
        'Austronesian (South Sulawesi, Toraja-Sa\'dan)': { wo: 'SVO', tone: false, morph: 'agglutinative' }, // Toraja
        // Niger-Congo / Bantu
        'Niger-Congo':            { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Atlantic-Congo (Bantu)':    { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Atlantic-Congo (Bantu, Nguni)':           { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Atlantic-Congo (Bantu, Sotho-Tswana)':    { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Atlantic-Congo (Bantu, Tswa-Ronga)':      { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Atlantic-Congo (Bantu, A.70 Yaounde-Fang)':{wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Atlantic-Congo (Bantu, R10)':             { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Atlantic-Congo (Bantu, H21)':             { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Atlantic-Congo (Bantu, R31)':             { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Atlantic-Congo (Bantu, M64)':             { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Atlantic-Congo (Bantu, A70 Beti)':        { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Atlantic-Congo (Bantu, S10 Shona)':       { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Niger-Congo (Atlantic)':               { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Niger-Congo (Mande)':                  { wo: 'SOV', tone: true, morph: 'isolating' },
        'Niger-Congo (Mande, Manding)':         { wo: 'SOV', tone: true, morph: 'isolating' },
        'Niger-Congo (Mande, Southwestern)':    { wo: 'SOV', tone: true, morph: 'isolating' },
        'Niger-Congo (Kwa)':                    { wo: 'SVO', tone: true, morph: 'isolating' },
        'Niger-Congo (Kwa, Gbe)':               { wo: 'SVO', tone: true, morph: 'isolating' },
        'Niger-Congo (Volta-Niger, Gbe)':       { wo: 'SVO', tone: true, morph: 'isolating' },
        'Atlantic (Niger-Congo)':               { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Bantu':                  { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Bantu (Nguni)':          { wo: 'SVO', tone: true, morph: 'agglutinative' },
        // Audit follow-up (2026-05-09): top-level Atlantic-Congo top-token defaults
        // (covers ~30 langs flagged by getFeatures wo coverage check).
        'Atlantic-Congo':         { wo: 'SVO', tone: true, morph: 'agglutinative' }, // Bantu majority + Cross River + Volta-Niger Edoid + Kwa Ga-Adangme + Senegambian Fula
        'Songhai':                { wo: 'SOV', tone: true, morph: 'agglutinative' }, // ses/khq/dje
        'Yukaghir':               { wo: 'SOV', tone: false, morph: 'agglutinative' }, // ykg/yux
        'Na-Dené':                { wo: 'SOV', tone: true, morph: 'polysynthetic' }, // koy/chp; tone in Athabaskan branch
        'Athabaskan':             { wo: 'SOV', tone: true, morph: 'polysynthetic' }, // nv Navajo + others
        'Otomanguean':            { wo: 'VSO', tone: true, morph: 'isolating' }, // zts/maz/mxv
        'Totonacan':              { wo: 'VSO', tone: false, morph: 'agglutinative' }, // toc
        'Arawakan':               { wo: 'SVO', tone: false, morph: 'agglutinative' }, // cni/ame
        'Misumalpan':             { wo: 'SOV', tone: false, morph: 'agglutinative' }, // sum
        'Jivaroan':               { wo: 'SOV', tone: false, morph: 'agglutinative' }, // jiv/agr/acu
        'Cariban':                { wo: 'SOV', tone: false, morph: 'agglutinative' }, // car (some OVS too)
        'Barbacoan':              { wo: 'SOV', tone: true, morph: 'agglutinative' }, // gum
        'Algonquian':             { wo: 'free', tone: false, morph: 'polysynthetic' }, // abe (free / VOS basic)
        'Mochica':                { wo: 'SOV', tone: false, morph: 'agglutinative' }, // omc (extinct)
        'Mande':                  { wo: 'SOV', tone: true, morph: 'isolating' }, // men/dyu/kpe/mnk
        'Eskimo–Aleut':           { wo: 'SOV', tone: false, morph: 'polysynthetic' }, // esu
        'Pidgin':                 { wo: 'SVO', tone: false, morph: 'isolating' }, // English-lexified pidgins
        'Portuguese-based creole': { wo: 'SVO', tone: false, morph: 'isolating' }, // kea
        'Spanish-based creole':    { wo: 'SVO', tone: false, morph: 'isolating' }, // cbk
        'Constructed':            { wo: 'SVO', tone: false, morph: 'agglutinative' }, // ina/ia/vo (Esperanto et al.)
        'Kiowa-Tanoan':           { wo: 'SOV', tone: true, morph: 'agglutinative' }, // kio Kiowa
        'Mataco-Mataguayan':      { wo: 'SVO', tone: false, morph: 'agglutinative' }, // mzh Wichí
        'Pano':                   { wo: 'SOV', tone: false, morph: 'agglutinative' }, // shp Shipibo-Konibo
        'Salishan':               { wo: 'VSO', tone: false, morph: 'polysynthetic' }, // thp Thompson
        'Tyrsenian':              { wo: 'SOV', tone: false, morph: 'agglutinative' }, // ett Etruscan (extinct)
        // Afro-Asiatic
        'Afro-Asiatic':           { wo: 'VSO', tone: false, morph: 'fusional' },
        'Afro-Asiatic (Chadic)':  { wo: 'SVO', tone: true,  morph: 'fusional' },
        'Afro-Asiatic (Berber)':  { wo: 'VSO', tone: false, morph: 'fusional' },
        'Afro-Asiatic (Cushitic)':{ wo: 'SOV', tone: true,  morph: 'agglutinative' },
        'Semitic':                { wo: 'VSO', tone: false, morph: 'fusional' },
        'Cushitic':               { wo: 'SOV', tone: true,  morph: 'agglutinative' },
        // Austronesian
        'Austronesian':                                  { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Austronesian (Polynesian)':                     { wo: 'VSO', tone: false, morph: 'isolating' },
        'Austronesian (Polynesian, Eastern)':            { wo: 'VSO', tone: false, morph: 'isolating' },
        'Austronesian (Polynesian, Tongic)':             { wo: 'VSO', tone: false, morph: 'isolating' },
        'Austronesian (Polynesian, Ellicean)':           { wo: 'VSO', tone: false, morph: 'isolating' },
        'Austronesian (Polynesian, Tahitic)':            { wo: 'VSO', tone: false, morph: 'isolating' },
        'Austronesian (Micronesian)':                    { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Austronesian (Western Malayo-Polynesian)':      { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Austronesian (Central Malayo-Polynesian)':      { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Austronesian (Malayo-Polynesian)':              { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Austronesian (Malayo-Polynesian, Malayic)':     { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Austronesian (Malayic)':                        { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Austronesian (Visayan)':                        { wo: 'VSO', tone: false, morph: 'agglutinative' },
        'Austronesian (Chamic)':                         { wo: 'SVO', tone: false, morph: 'isolating' },
        'Austronesian (South Sulawesi)':                 { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Austronesian (Central Philippine)':             { wo: 'VSO', tone: false, morph: 'agglutinative' },
        // Formosan (Austronesian primary branches in Taiwan): predominantly
        // verb-initial (VSO/VOS), non-tonal, agglutinative with rich
        // verb-focus morphology. Several primary branches recognized in
        // Blust 1999 / Sagart 2004 — they're the deepest Austronesian
        // splits, hence outside the Malayo-Polynesian super-branch.
        'Austronesian (Formosan)':                       { wo: 'VOS', tone: false, morph: 'agglutinative' },
        'Austronesian (East Formosan)':                  { wo: 'VOS', tone: false, morph: 'agglutinative' }, // Amis, Kavalan, Sakizaya
        'Austronesian (Atayalic)':                       { wo: 'VSO', tone: false, morph: 'agglutinative' }, // Atayal, Truku/Seediq
        'Austronesian (Paiwanic)':                       { wo: 'VOS', tone: false, morph: 'agglutinative' }, // Paiwan
        'Austronesian (Bunun)':                          { wo: 'VSO', tone: false, morph: 'agglutinative' }, // Bunun
        'Austronesian (Tsouic)':                         { wo: 'VOS', tone: false, morph: 'agglutinative' }, // Tsou
        'Austronesian (Batanic)':                        { wo: 'VSO', tone: false, morph: 'agglutinative' }, // Yami/Tao
        // Austroasiatic
        'Austroasiatic':            { wo: 'SVO', tone: false, morph: 'isolating' },
        'Austroasiatic (Munda)':    { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Austroasiatic (Mon-Khmer, Monic)': { wo: 'SVO', tone: false, morph: 'isolating' },
        // Tai-Kadai / Hmong-Mien
        'Kra-Dai':                  { wo: 'SVO', tone: true, morph: 'isolating' },
        'Kra-Dai (Tai, Southwestern)': { wo: 'SVO', tone: true, morph: 'isolating' },
        'Hmong-Mien':               { wo: 'SVO', tone: true, morph: 'isolating' },
        // Turkic / Mongolic / Tungusic
        'Turkic':                  { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Turkic (Kipchak)':        { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Turkic (Kipchak, Caucasus)': { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Mongolic':                { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Mongolic (Western/Oirat)':{ wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Mongolic (Para-Mongolic)':{ wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Tungusic':                { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Tungusic (Northern)':     { wo: 'SOV', tone: false, morph: 'agglutinative' },
        // Uralic
        'Uralic':                  { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Uralic (Finnic)':         { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Uralic (Sámi)':           { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Uralic (Ugric)':          { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Uralic (Permic)':         { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Uralic (Mari)':           { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Uralic (Mordvinic)':      { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Uralic (Samoyedic)':      { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Uralic (Ob-Ugric)':       { wo: 'SOV', tone: false, morph: 'agglutinative' },
        // Other Eurasian
        'Dravidian':               { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Japonic':                 { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Japonic (Ryukyuan)':      { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Koreanic':                { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Kartvelian':              { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'NE Caucasian':            { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'NE Caucasian (Nakh)':     { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'NE Caucasian (Avar-Andic)': { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'NE Caucasian (Lezgic)':   { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'NE Caucasian (Dargic)':   { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'NE Caucasian (Lak-Dargic)': { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'NW Caucasian (Circassian)': { wo: 'SOV', tone: false, morph: 'polysynthetic' },
        'NW Caucasian (Abkhaz-Abaza)':{ wo: 'SOV', tone: false, morph: 'polysynthetic' },
        // Americas
        'Uto-Aztecan':             { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Mayan':                   { wo: 'VOS', tone: false, morph: 'agglutinative' },
        "Mayan (K'ichean)":        { wo: 'VOS', tone: false, morph: 'agglutinative' },
        'Mayan (Yucatecan)':       { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Mayan (Cholan-Tseltalan)':{ wo: 'VOS', tone: false, morph: 'agglutinative' },
        'Quechuan':                { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Aymaran':                 { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Chibchan':                { wo: 'SOV', tone: false, morph: 'agglutinative' },
        // Meroitic — language isolate / debated affiliation
        'Meroitic':                { wo: 'SVO', tone: false, morph: 'agglutinative' },
        // Old Nubian — Eastern Sudanic (Nilo-Saharan)
        'Nilo-Saharan (Eastern Sudanic)': { wo: 'SOV', tone: true,  morph: 'agglutinative' },
        'Tupian':                  { wo: 'SVO', tone: false, morph: 'polysynthetic' },
        'Eskimo-Aleut':            { wo: 'SOV', tone: false, morph: 'polysynthetic' },
        'Eskimo-Aleut (Inuit)':    { wo: 'SOV', tone: false, morph: 'polysynthetic' },
        'Algic':                   { wo: 'SOV', tone: false, morph: 'polysynthetic' },
        'Algic (Algonquian)':      { wo: 'SOV', tone: false, morph: 'polysynthetic' },
        'Iroquoian':               { wo: 'SOV', tone: true,  morph: 'polysynthetic' },
        'Siouan':                  { wo: 'SOV', tone: false, morph: 'polysynthetic' },
        'Na-Dené (Athabaskan)':    { wo: 'SOV', tone: true,  morph: 'polysynthetic' },
        'Oto-Manguean (Mixtecan)': { wo: 'VSO', tone: true,  morph: 'isolating' },
        'Oto-Manguean (Zapotecan)':{ wo: 'VSO', tone: true,  morph: 'isolating' },
        'Araucanian (isolate or small family)': { wo: 'SVO', tone: false, morph: 'agglutinative' },
        // Africa
        'Nilo-Saharan':                       { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Nilo-Saharan (Western Nilotic)':     { wo: 'SVO', tone: true, morph: 'agglutinative' },
        'Nilo-Saharan (Eastern Nilotic, Maa)':{ wo: 'VSO', tone: true, morph: 'agglutinative' },
        'Nilo-Saharan (Saharan)':             { wo: 'SOV', tone: true, morph: 'agglutinative' },
        'Khoe-Kwadi (Khoisan)':               { wo: 'SOV', tone: true, morph: 'agglutinative' },
        // Pacific
        'Pama-Nyungan':                  { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Pama-Nyungan (Wati)':           { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Pama-Nyungan (Ngumpin-Yapa)':   { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Trans-New Guinea':              { wo: 'SOV', tone: false, morph: 'agglutinative' },
        // Constructed
        'Constructed (a posteriori)':    { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Constructed (artistic)':        { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Constructed (logical)':         { wo: 'SVO', tone: false, morph: 'agglutinative' },
        'Constructed (philosophical)':   { wo: 'SVO', tone: false, morph: 'isolating' },
        // Creoles
        'English-based creole':          { wo: 'SVO', tone: false, morph: 'isolating' },
        'French-based creole':           { wo: 'SVO', tone: false, morph: 'isolating' },
        'Iberian-based creole':          { wo: 'SVO', tone: false, morph: 'isolating' },
        // Other
        'Yeniseian':                     { wo: 'SOV', tone: false, morph: 'polysynthetic' },
        'Chukotko-Kamchatkan':           { wo: 'SOV', tone: false, morph: 'polysynthetic' },
        'Proto-language (reconstructed)':{ wo: 'SOV', tone: false, morph: 'fusional' },
        // Smaller families & isolates
        'Muskogean':                     { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Na-Dené (Athabaskan, Southern)':{ wo: 'SOV', tone: true,  morph: 'polysynthetic' },
        'Na-Dené (Athabaskan, Northern)':{ wo: 'SOV', tone: true,  morph: 'polysynthetic' },
        'Iwaidjan or unclassified':      { wo: 'SOV', tone: false, morph: 'polysynthetic' },
        'Arawakan (Northern)':           { wo: 'SVO', tone: false, morph: 'polysynthetic' },
        'Arawakan (Northern, with Carib lexical layer)': { wo: 'SVO', tone: false, morph: 'polysynthetic' },
        'Mura (isolate)':                { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Chocoan':                       { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Hurro-Urartian (separate from IE/Semitic)': { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Language isolate (Elamite)':    { wo: 'SOV', tone: false, morph: 'agglutinative' },
        'Wakashan (Northern)':           { wo: 'VSO', tone: false, morph: 'polysynthetic' },
        'Khoisan (proposed isolate or with Hadza)': { wo: 'SOV', tone: true, morph: 'agglutinative' },
        'Salishan (Coast Salish, Central)':{ wo: 'VSO', tone: false, morph: 'polysynthetic' },
        'Tsimshianic (Maritime)':        { wo: 'VSO', tone: false, morph: 'polysynthetic' },
        'Oto-Manguean (Otomian)':        { wo: 'VSO', tone: true,  morph: 'isolating' },
        'Language isolate':              { wo: 'SOV', tone: false, morph: 'agglutinative' },  // generic isolate fallback (Basque, Burushaski, etc.)
        'Language isolate (or proposed Sandawe-Hadza)': { wo: 'SOV', tone: true, morph: 'agglutinative' },
    };

    // Coverage focuses on well-known languages and the major dialects already
    // in the wordmap. F[code] entries below act as overrides on top of the
    // family default and as canonical references for a few isolates.

    const F = {};
    function set(codes, props) {
        if (typeof codes === 'string') codes = [codes];
        for (const c of codes) F[c] = Object.assign({}, F[c] || {}, props);
    }

    // --- SVO ---
    set(['en','en_aave','en_south','en_app','en_ie','en_sco','en_yk','en_ck',
         'en_au','en_in','en_sg','en_ang','enm','sco','jam','hwc','pcm'],
        { wo: 'SVO', tone: false, morph: 'fusional' });
    set(['de','de_at','de_by','de_gsw','nds','nl','af','fy','sv','no','nn','da','is','fo','yi','got'],
        { wo: 'SVO', tone: false, morph: 'fusional' });
    set(['fr','fr_qc','fr_ch','fr_be','fr_af','it','nap','scn','vec','sc','rm',
         'ca','oc','gl','pt_eu','pt_br','es_eu','es_mx','es_an','es_ar','es_co',
         'es_cl','es_pe','es_cu','la','lad','ro'],
        { wo: 'SVO', tone: false, morph: 'fusional' });
    set(['ru','uk','be','pl','cs','sk','sl','bg','mk','sr','hr','bs','cu'],
        { wo: 'SVO', tone: false, morph: 'fusional' });
    set(['zh','zh_sc','zh_db','wuu','nan','yue','cdo','hak_cn','zh_song','zh_han','zh_tang',
         // Other Mandarin / Sinitic varieties + pedagogical Sino-readings.
         // Without these the rows whose family is "Sino-Tibetan (Sinitic, …)"
         // fall through to the Sino-Tibetan family default (morph: agglutinative),
         // which is wrong for any Sinitic descendant.
         'zh_jh','zh_tj','zh_lz','zh_wh','zh_zz',
         'hak_tw','hak_hl','cjy','hsn','gan','cpx','cnp','czh','dng','mnp',
         'wuu_nb','wuu_sz','wuu_wz',
         'nan_hai','nan_pn','nan_qz','nan_te',
         'yue_gz','yue_ts',
         'zh_wenyan_edu','vi_han'],
        { wo: 'SVO', tone: true, morph: 'isolating' });
    set(['vi','vi_c','vi_s','vi_nom'], { wo: 'SVO', tone: true, morph: 'isolating' });
    // Old Chinese predates tonogenesis (tones developed in Middle Chinese);
    // the Sinitic family default (SVO+tonal) needs an override.
    set(['och'], { wo: 'SVO', tone: false, morph: 'isolating' });
    set(['th','th_isan','th_n','th_s','lo','za'], { wo: 'SVO', tone: true, morph: 'isolating' });
    // Western Malayo-Polynesian + creoles: SVO
    set(['id','ms','jv','su','tpi'],
        { wo: 'SVO', tone: false, morph: 'agglutinative' });
    // Polynesian and Philippine languages: VSO/VOS predicate-initial
    set(['tl','ceb','ilo','fj','sm','mi','haw','to','pau'],
        { wo: 'VSO', tone: false, morph: 'agglutinative' });
    set(['zu','xh','sn','ig','yo','ha','ln','ny','rw','om','so','ti','tig','tir'],
        { wo: 'SVO', tone: true, morph: 'agglutinative' });
    // Notable Niger-Congo / Semitic exceptions to the family tonal default:
    // Swahili, Wolof, and Amharic are non-tonal (per WALS).
    set(['sw'], { wo: 'SVO', tone: false, morph: 'agglutinative' });
    set(['wo'], { wo: 'SVO', tone: false, morph: 'agglutinative' });
    set(['am'], { wo: 'SOV', tone: false, morph: 'fusional' });
    set(['eo','tok','jbo','ht','pap'],
        { wo: 'SVO', tone: false, morph: 'isolating' });
    // Klingon: famously OVS by design.
    set(['tlh'], { wo: 'OVS', tone: false, morph: 'agglutinative' });
    set(['el','el_grc','sq','arc','akk','phn','egy','el_med','grc','cop'],
        { wo: 'SVO', tone: false, morph: 'fusional' });
    set(['mt','tig'], { wo: 'SVO', tone: false, morph: 'fusional' });

    // --- SOV ---
    set(['ja','ja_osa','ja_aom','ja_oki','ja_hak','ja_edo','ja_kyo','ja_hir',
         'ja_mvi','ja_rys','ja_heian','ain'],
        { wo: 'SOV', tone: false, morph: 'agglutinative' });
    set(['ko','ko_kp','ko_bus','ko_jeju','ko_mid','ko_em','ko_yb'],
        { wo: 'SOV', tone: false, morph: 'agglutinative' });
    set(['tr','az','tk','kk','ky','uz','mn','mn_cn','mnc','ug','sah'],
        { wo: 'SOV', tone: false, morph: 'agglutinative' });
    // Hungarian is Ugric (SOV-leaning). Finnish, Estonian, and Northern Sámi
    // are Finnic/Sámi (SVO) — leave them to fall back to the family default
    // rather than wrongly bundling them in.
    set(['hu'], { wo: 'SOV', tone: false, morph: 'agglutinative' });
    set(['hi','ur','bn','gu','mr','ne','si','sa','pi','as','or','sd','ks'],
        { wo: 'SOV', tone: false, morph: 'fusional' });
    // Punjabi is Indo-Aryan SOV but uniquely tonal among major Indo-Aryans.
    set(['pa'], { wo: 'SOV', tone: true, morph: 'fusional' });
    set(['fa','ckb','ku','ps','tg'],
        { wo: 'SOV', tone: false, morph: 'fusional' });
    set(['hy','ka','eu','tr_ott'],
        { wo: 'SOV', tone: false, morph: 'agglutinative' });
    set(['ta','te','ml','kn'],
        { wo: 'SOV', tone: false, morph: 'agglutinative' });
    set(['my','bo','ii','dz','new'],
        { wo: 'SOV', tone: true, morph: 'isolating' });
    set(['km','khm'],
        { wo: 'SVO', tone: false, morph: 'isolating' });
    set(['qu','ay','gn','myn'],
        { wo: 'SOV', tone: false, morph: 'agglutinative' });
    set(['nci','iu','sux','akk','hit','sa_ved','non'],
        { wo: 'SOV', tone: false, morph: 'agglutinative' });
    set(['hit','sux'],
        { wo: 'SOV', tone: false, morph: 'agglutinative' });

    // --- VSO ---
    set(['ar','ar_eg','ar_lev','ar_ma','ar_gulf','ar_iq','ar_sd','ar_tn'],
        { wo: 'VSO', tone: false, morph: 'fusional' });
    set(['he','he_anc'],
        { wo: 'VSO', tone: false, morph: 'fusional' });
    set(['ga','gd','cy','br'],
        { wo: 'VSO', tone: false, morph: 'fusional' });
    set(['mg','tgl_classical'],
        { wo: 'VOS', tone: false, morph: 'agglutinative' });

    // --- VOS / OVS / free ---
    set(['nv'], { wo: 'SOV', tone: true, morph: 'polysynthetic' });
    set(['chr'], { wo: 'SOV', tone: true, morph: 'polysynthetic' });
    set(['kal','iku','iu'], { wo: 'SOV', tone: false, morph: 'polysynthetic' });

    // Other tonal-language overrides (in case wo not yet covered)
    set(['hmn','ii','hak_cn','wuu','yue','cdo','nan','zh_db','zh_sc'],
        { tone: true });
    set(['sgs','lt','lv'],
        { wo: 'SVO', tone: false, morph: 'fusional' });
    set(['lt','lv','lt_old'], { wo: 'SVO' });

    // --- Morphology overrides for misc ---
    set(['eu','ka'], { morph: 'agglutinative' });

    // --- Under-documented isolates / small families lacking FAMILY_DEFAULTS coverage ---
    // Tangkic: SOV, atonal, agglutinative case-stacking (Hale, Klokeid; Tangkic-Pama).
    set(['lbz','lbz_damin','nny'], { wo: 'SOV', tone: false, morph: 'agglutinative' });
    // Tukanoan: SOV with nasal-prosody and lexical H/L tone (Barnes 1984, Stenzel).
    set(['tue'], { wo: 'SOV', tone: true, morph: 'agglutinative' });
    // Ubykh: verb-final, ergative, polysynthetic; ~80 consonants but no lexical tone (Dumézil 1975, Fenwick 2011).
    set(['uby'], { wo: 'SOV', tone: false, morph: 'polysynthetic' });
    // ǂ'Amkoe (Tuu/Southern Khoisan): SVO analytic with lexical tone and click consonants (Gerlach & Berthold 2014).
    set(['nmn'], { wo: 'SVO', tone: true, morph: 'isolating' });
    // Rotokas (North Bougainville): SOV agglutinative, atonal, famous 11-phoneme inventory (Firchow & Firchow 1969).
    set(['roo'], { wo: 'SOV', tone: false, morph: 'agglutinative' });
    // Tartessian: SVO fusional per Koch (2009) Celtic reading; classification disputed (Untermann 1997).
    set(['txr'], { wo: 'SVO', tone: false, morph: 'fusional' });

    // ----- Script type auto-detection from meta.script --------------------

    // Returns an Array<string> of script categories. A language with multiple
    // writing systems (Punjabi: Gurmukhi+Shahmukhi, Malay: Latin+Jawi, Hausa:
    // Latin+Ajami, etc.) gets every applicable tag. Patterns are anchored so
    // bare "Han" doesn't match "Shan"/"Hanacaraka" and bare "Traditional"
    // doesn't match "Traditional Mongolian".
    function detectScript(scriptStr) {
        if (!scriptStr) return [];
        const s = String(scriptStr);
        const tags = new Set();

        // Han (Chinese characters and derivatives — Hanzi, Kanji, Hanja,
        // Chữ Nôm, Sawndip). Avoid matching "Shan" / "Hanacaraka" /
        // "Traditional Mongolian" by requiring specific compound phrases.
        // Also covers ancient Chinese script names (Audit Task 130).
        if (/Chinese characters|Han characters|Hanzi|Simplified Chinese|Traditional Chinese|Simplified\/Traditional Chinese|Chinese\/Peng|Chữ Nôm|Hanja|Kanji|Sawndip|Hing-hua romanization|Peng'im|^Chinese$|Oracle bone|Bronze inscriptions|Seal script/i.test(s)) tags.add('Han');

        // Kana (Japanese syllabaries, distinct from Han kanji)
        if (/Hiragana|Katakana|\bkana\b/i.test(s)) tags.add('Kana');

        if (/Hangul/i.test(s)) tags.add('Hangul');
        if (/Cyrillic/i.test(s)) tags.add('Cyrillic');

        // Arabic-derived (Naskh, Nastaliq, Jawi, Perso-Arabic, Ajami, Adlam,
        // Shahmukhi, Saraiki Naskh, etc.)
        if (/Arabic|Nastaliq|Naskh|Jawi|Perso-Arabic|Pegon|Ajami|Adlam|Shahmukhi/i.test(s)) tags.add('Arabic-derived');

        // Tibetan-script chip — distinct from Brahmic umbrella so users can
        // filter for Tibetan-script langs specifically (Audit Task 215).
        // Tibetan-script langs are also tagged 'Brahmic' below for the
        // umbrella chip; both can coexist on the same row.
        if (/Tibetan|Uchen|Umê|Drutsa/i.test(s)) tags.add('Tibetan');

        // Brahmic (Indic + SE Asian Brahmi descendants). Includes Mon,
        // Shan, Karen, Eastern Nagari/Assamese, Cham, Lontara, etc.
        if (/Devanagari|Bengali|Eastern Nagari|Tamil|Telugu|Kannada|Malayalam|Gujarati|Gurmukhi|Oriya|Odia|Sinhala|\bThai\b|\bLao\b|Khmer|Burmese|Tibetan|Brahmi|Brāhmī|Brahmic|Kawi|Balinese|Javanese script|Carakan|Sharada|Mithilakshar|Tirhuta|Sylheti|Kaithi|Ranjana|Bodo Devanagari|Meitei|Tigalari|Mon script|Shan script|Karen script|Cham|Lontara|Aksara Bugis|Hanacaraka|Batak|Surat Batak|Aksara Sasak|Lampung script|Limbu|Takri|Multani|Old Khmer|Brahmi-derived/i.test(s)) tags.add('Brahmic');

        if (/Hebrew/i.test(s)) tags.add('Hebrew');
        if (/Greek/i.test(s)) tags.add('Greek');
        if (/Armenian/i.test(s)) tags.add('Armenian');
        if (/Georgian/i.test(s)) tags.add('Georgian');
        if (/Ethiopic|Ge.?ez|Ge'ez/i.test(s)) tags.add('Ethiopic');
        if (/Coptic/i.test(s)) tags.add('Coptic');
        if (/Cherokee/i.test(s)) tags.add('Cherokee');
        if (/Syriac/i.test(s)) tags.add('Syriac');
        if (/Tifinagh/i.test(s)) tags.add('Tifinagh');
        if (/N'Ko|N.Ko/i.test(s)) tags.add("N'Ko");
        if (/Yi syllabary|Yi script/i.test(s)) tags.add('Yi');
        if (/Cree syllabics|Inuktitut syllabics|Canadian Aboriginal Syllabics/i.test(s)) tags.add('Canadian Aboriginal Syllabics');

        // Vertical Mongolian script family (Old Uyghur → Mongolian → Manchu
        // → Phags-pa). Manchu the language is Tungusic but its script is
        // Mongolic-derived; tag the script, not the language family.
        if (/Mongolian script|Traditional Mongolian|Mongolian alphabet|Phags-pa|\bManchu\b|Uyghur-Mongolian|Old Uyghur|Clear Script/i.test(s)) tags.add('Mongolian-derived');

        if (/Cuneiform/i.test(s)) tags.add('Cuneiform');
        if (/Egyptian hieroglyph|Anatolian hieroglyph|\bHieroglyph/i.test(s)) tags.add('Hieroglyphs');
        if (/Linear B|Linear A|Linear Elamite/i.test(s)) tags.add('Aegean syllabary');
        if (/Maya hieroglyph|Mayan glyphs|Maya script/i.test(s)) tags.add('Mayan');
        if (/Old Turkic|Orkhon|runiform/i.test(s)) tags.add('Old Turkic');
        if (/Tangut/i.test(s)) tags.add('Tangut');
        // Audit Task 130: Khitan / Jurchen (Sinitic-area historical scripts).
        if (/Khitan/i.test(s)) { tags.add('Khitan'); tags.add('Other historical'); }
        if (/Jurchen/i.test(s)) { tags.add('Jurchen'); tags.add('Other historical'); }
        // Sukhothai / Old Thai script (Brahmic descendant).
        if (/Sukhothai/i.test(s)) { tags.add('Brahmic'); tags.add('Other historical'); }
        // None / reconstructed (proto-languages).
        if (/None\s*\(reconstructed\)|reconstructed\)|^None$/i.test(s)) tags.add('None / reconstructed');

        // Aramaic-derived (Sogdian, Pahlavi, Parthian, Manichaean) — distinct
        // from Arabic-derived and Mongolian-derived branches of the same root.
        if (/Sogdian alphabet|Sogdian script|Manichaean|Pahlavi|Parthian script|Aramaic-derived/i.test(s)) tags.add('Aramaic-derived');

        // Other ancient / specialized scripts
        if (/Phoenician|Punic alphabet|Old South Arabian|Musnad|Avestan|Old Persian cuneiform|Ugaritic|Warang Citi|Meroitic|Ogham|Runic|Gothic alphabet|Kpelle script|Mende script|Kikakui|Pollard|Fraser|Lisu script|Dongba|Old Bouyei script|Old Khmer script/i.test(s)) tags.add('Other historical');

        // Latin (catch-all). Word boundary so "Latinised" etc. still match.
        if (/\bLatin\b|\bRumi\b|Modified Roman/i.test(s)) tags.add('Latin');

        if (tags.size === 0) tags.add('Other');
        return [...tags];
    }

    // ----- Speaker tier parsing -------------------------------------------

    function tierFor(count) {
        if (count >= 100_000_000) return '100M+';
        if (count >= 10_000_000)  return '10M+';
        if (count >= 1_000_000)   return '1M+';
        if (count >= 100_000)     return '100K+';
        if (count >= 10_000)      return '10K+';
        if (count >= 1_000)       return '1K+';
        return '<1K';
    }

    // Audit Task 220 Phase 3: prefer structured speakerCount over prose
    // when present — extract a canonical numeric for tier classification.
    // Priority: l1 > total > rangeMax > rangeMin > l1RangeMax > l1RangeMin.
    // Returns null if the structure has no usable number.
    function speakerTierFromStructured(sc) {
        if (!sc || typeof sc !== 'object') return null;
        let n = null;
        if (typeof sc.l1 === 'number')          n = sc.l1;
        else if (typeof sc.total === 'number')  n = sc.total;
        else if (typeof sc.rangeMax === 'number')   n = sc.rangeMax;
        else if (typeof sc.rangeMin === 'number')   n = sc.rangeMin;
        else if (typeof sc.l1RangeMax === 'number') n = sc.l1RangeMax;
        else if (typeof sc.l1RangeMin === 'number') n = sc.l1RangeMin;
        if (n === null || !isFinite(n)) return null;
        return tierFor(n);
    }

    function parseSpeakerTier(spkStr) {
        if (!spkStr) return null;
        const s = String(spkStr);

        // Skip year-range strings like "Extinct (~550-330 BCE)" — those are
        // historical date ranges, not speaker counts. Without this guard the
        // generic digit-stripping path would concat the digits and report
        // 100M+ for an extinct language.
        if (/extinct/i.test(s)) {
            // Allow only if there's an explicit speaker-count phrase
            // (e.g. "Extinct, 100 fluent speakers")
            if (!/(\d+(?:[.,]\d+)?)\s*(?:[KMB]\b|million|billion|thousand|speaker)/i.test(s)) {
                return null;
            }
        }

        // Try B/M/K (or word forms) — match the FIRST occurrence so ranges
        // like "~5,000–10,000" or "~30-50M" use the lower bound.
        const unitRe = /(\d+(?:[.,]\d+)?)\s*(B\b|M\b|K\b|billion|million|thousand)/i;
        const m = s.match(unitRe);
        if (m) {
            const num = parseFloat(m[1].replace(/,/g, ''));
            const u = m[2].toUpperCase();
            let count;
            if (u === 'B' || u === 'BILLION')       count = num * 1_000_000_000;
            else if (u === 'M' || u === 'MILLION')  count = num * 1_000_000;
            else                                    count = num * 1_000;
            return tierFor(count);
        }

        // Plain numeric (with optional commas), take FIRST number group only.
        // "~5,000–10,000" → "5,000" → 5000. "~20–200" → "20" → 20.
        const plain = s.match(/(\d{1,3}(?:,\d{3})+|\d+)/);
        if (plain) {
            const n = parseInt(plain[1].replace(/,/g, ''), 10);
            if (!isNaN(n) && n > 0) return tierFor(n);
        }
        return null;
    }

    const SPEAKER_TIERS = ['100M+', '10M+', '1M+', '100K+', '10K+', '1K+', '<1K'];

    // CJK reads in 億 (10^8) / 万 (10^4) groupings rather than M/K, so the
    // tier labels above don't translate cleanly. Provide per-UI overrides
    // for ja/ko/zh/yue. Other UI langs keep the English K/M form.
    const SPEAKER_TIER_LABELS = {
        ja:  { '100M+':'1億+', '10M+':'1千万+', '1M+':'100万+', '100K+':'10万+', '10K+':'1万+', '1K+':'1千+', '<1K':'千未満' },
        ko:  { '100M+':'1억+', '10M+':'천만+',   '1M+':'백만+', '100K+':'십만+', '10K+':'만+',   '1K+':'천+',   '<1K':'천 미만' },
        zh:  { '100M+':'1亿+', '10M+':'1千万+', '1M+':'100万+', '100K+':'10万+', '10K+':'1万+', '1K+':'1千+', '<1K':'<1千' },
        yue: { title_period:'時期', period_from:'起', period_to:'迄', close:'關閉', '100M+':'1億+', '10M+':'1千萬+', '1M+':'100萬+', '100K+':'10萬+', '10K+':'1萬+', '1K+':'1千+', '<1K':'<1千' },
    };

    // ----- Family aggregation (top-level only, drop parens) ---------------

    function topFamily(famStr) {
        if (!famStr) return null;
        return famStr.split('(')[0].trim();
    }

    // Some languages genuinely belong to more than one family — creoles
    // (substrate + lexifier), pidgins, mixed languages, proto-languages
    // (themselves the family root). Return all applicable family tags so
    // they show under multiple chips in the filter.
    //
    // Per-language overrides win over family-string heuristics.
    const FAMILY_MULTI_OVERRIDES = {
        ine: ['Indo-European', 'Proto-language'],   // Proto-Indo-European: family root
        peo: ['Indo-European', 'Iranian'],          // Old Persian — already Iranian, but flag IE
        ave: ['Indo-European', 'Iranian'],          // Avestan
        sa:  ['Indo-European', 'Indo-Aryan'],       // Sanskrit (already Indo-Aryan, but show under IE)
        vsa: ['Indo-European', 'Indo-Iranian', 'Indo-Aryan'], // Vedic Sanskrit (attested Old Indo-Aryan, NOT a proto)
    };

    // Parent-family normalization (wordmap-check.md §6). Without this,
    // a language tagged "Semitic" produces a "Semitic" chip while another
    // tagged "Afro-Asiatic (Semitic)" produces a separate "Afro-Asiatic"
    // chip — splitting the genealogical group into two. Map every known
    // sub-branch top-token to its parent so chips collapse correctly.
    // The sub-branch chip is also kept (so users can pick fine-grained
    // groups like "Bantu" or "Iranian" specifically).
    const PARENT_FAMILY = {
        // Indo-European
        'Romance':'Indo-European', 'Germanic':'Indo-European', 'Slavic':'Indo-European',
        'Celtic':'Indo-European', 'Baltic':'Indo-European', 'Hellenic':'Indo-European',
        'Italic':'Indo-European', 'Anatolian':'Indo-European', 'Indo-Aryan':'Indo-European',
        'Iranian':'Indo-European', 'Tocharian':'Indo-European',
        // Afro-Asiatic
        'Semitic':'Afro-Asiatic', 'Cushitic':'Afro-Asiatic', 'Berber':'Afro-Asiatic',
        'Omotic':'Afro-Asiatic', 'Egyptian':'Afro-Asiatic',
        // Niger-Congo / Atlantic-Congo (Audit Task 159: keep both visible
        // so legacy `Niger-Congo (Bantu, X)` and modern Glottolog
        // `Atlantic-Congo (Bantu, Y)` tag rows under the same macro).
        'Bantu':'Niger-Congo', 'Atlantic':'Niger-Congo',
        'Atlantic-Congo':'Niger-Congo',
        'Mel':'Atlantic-Congo', 'Kru':'Atlantic-Congo', 'Gur':'Atlantic-Congo',
        'Kwa':'Atlantic-Congo', 'Volta-Niger':'Atlantic-Congo', 'Adamawa':'Atlantic-Congo',
        'Mande':'Niger-Congo',
        // Sino-Tibetan
        'Sinitic':'Sino-Tibetan', 'Tibeto-Burman':'Sino-Tibetan', 'Bodish':'Sino-Tibetan',
        'Loloish':'Sino-Tibetan', 'Karen':'Sino-Tibetan', 'Karenic':'Sino-Tibetan',
        'Burmish':'Sino-Tibetan', 'Naic':'Sino-Tibetan', 'Bodo-Garo':'Sino-Tibetan',
        // Mayan
        'Quichean':'Mayan', 'Mamean':'Mayan', 'Yucatecan':'Mayan',
        'Cholan-Tseltalan':'Mayan',
        // Austroasiatic
        'Vietic':'Austroasiatic', 'Palaungic':'Austroasiatic', 'Munda':'Austroasiatic',
        'Mon-Khmer':'Austroasiatic',
        // Austronesian
        'Polynesian':'Austronesian', 'Micronesian':'Austronesian',
        'Malayo-Polynesian':'Austronesian', 'Formosan':'Austronesian',
        'Malayic':'Austronesian', 'Visayan':'Austronesian', 'Chamic':'Austronesian',
        // Kra-Dai
        'Tai':'Kra-Dai', 'Hlai':'Kra-Dai', 'Kam-Sui':'Kra-Dai',
        // Nilo-Saharan
        'Nilotic':'Nilo-Saharan', 'Saharan':'Nilo-Saharan', 'Songhai':'Nilo-Saharan',
        'Western Nilotic':'Nilo-Saharan', 'Eastern Nilotic':'Nilo-Saharan',
        // Uralic
        'Finnic':'Uralic', 'Samoyedic':'Uralic', 'Permic':'Uralic', 'Ugric':'Uralic',
        'Mordvinic':'Uralic', 'Ob-Ugric':'Uralic',
        'Saami':'Uralic', 'Sámi':'Uralic', 'Sami':'Uralic',
        // Hurro-Urartian (separate macro per the data, but listed)
    };

    // Audit Task 159: spelling normalization. Different rows can use
    // different spellings of the same family — Saami/Sámi, Atlantic/
    // Atlantic-Congo, etc. Collapse them to a single canonical chip so
    // the filter UI does not split a single genealogical group across
    // two chips. The canonical chip is the right-hand side.
    const FAMILY_ALIAS = {
        'Sámi': 'Saami',
        'Sami': 'Saami',
        // Atlantic and Atlantic-Congo are NOT collapsed: Atlantic is a
        // sub-branch (Wolof, Fula); Atlantic-Congo is the macro family
        // covering Bantu + Atlantic + Volta-Niger + … in modern
        // Glottolog. Keep both chips visible so users can pick either.
    };

    // Audit Task 159: sub-branch tokens that should also be added as
    // chips when they appear inside a parenthetical sub-branch label
    // (e.g. `Atlantic-Congo (Bantu, S10)` → both `Atlantic-Congo` and
    // `Bantu` chips). Without this, sub-branches buried inside parens
    // never get their own chip and a user filtering for `Bantu` would
    // miss every `Atlantic-Congo (Bantu, …)` row.
    const SUBBRANCH_TOKENS = new Set([
        'Bantu', 'Atlantic', 'Mel', 'Mande', 'Kwa', 'Gur', 'Kru',
        'Volta-Niger', 'Adamawa',
        'Sinitic', 'Tibeto-Burman', 'Bodish', 'Tibetic', 'Loloish', 'Karen',
        'Karenic', 'Burmish', 'Naic', 'Bodo-Garo',
        'Polynesian', 'Micronesian', 'Malayo-Polynesian', 'Formosan',
        'Malayic', 'Visayan', 'Chamic',
        'Tai', 'Hlai', 'Kam-Sui',
        'Romance', 'Germanic', 'Slavic', 'Celtic', 'Baltic', 'Hellenic',
        'Indo-Aryan', 'Iranian', 'Italic', 'Anatolian', 'Tocharian',
        'Semitic', 'Cushitic', 'Berber', 'Omotic', 'Egyptian',
        'Vietic', 'Palaungic', 'Munda', 'Mon-Khmer', 'Monic', 'Khmuic',
        'Bahnaric',
        'Quichean', 'Mamean', 'Yucatecan', 'Cholan-Tseltalan',
        'Finnic', 'Samoyedic', 'Permic', 'Ugric', 'Mordvinic',
        'Ob-Ugric', 'Saami',
        'Nilotic', 'Saharan', 'Songhai', 'Western Nilotic',
        'Eastern Nilotic',
    ]);

    function canonicalFamily(t) {
        return (t && FAMILY_ALIAS[t]) || t;
    }

    function expandFamilies(famStr, code) {
        const overrides = FAMILY_MULTI_OVERRIDES[code];
        if (overrides) {
            const out = new Set();
            for (const t of overrides) out.add(canonicalFamily(t));
            // Apply parent-family normalization to overrides too
            for (const t of [...out]) {
                const parent = PARENT_FAMILY[canonicalFamily(t)];
                if (parent) out.add(canonicalFamily(parent));
            }
            return [...out];
        }
        if (!famStr) return [];
        const top = topFamily(famStr);
        const out = new Set();
        if (top) out.add(canonicalFamily(top));
        // Audit Task 159: pull explicit sub-branch tokens out of the
        // parenthetical sub-branch label so a row like
        // `Atlantic-Congo (Bantu, S10 Shona)` also produces a `Bantu`
        // chip. Without this, the `Bantu` chip would only catch rows
        // tagged with `Bantu` as the top token (the legacy convention),
        // skipping every `Atlantic-Congo (Bantu, …)` row.
        const parenMatch = famStr.match(/\(([^)]+)\)/);
        if (parenMatch) {
            const sub = parenMatch[1].split(/[,/]/).map(s => s.trim());
            for (const tok of sub) {
                const canon = canonicalFamily(tok);
                if (SUBBRANCH_TOKENS.has(canon)) out.add(canon);
            }
        }
        // Heuristic decomposition for compound family strings.
        const lower = famStr.toLowerCase();
        if (lower.includes('creole')) {
            out.add('Creole');
            if (lower.includes('english-based')) out.add('Germanic');
            if (lower.includes('french-based'))  out.add('Romance');
            if (lower.includes('iberian-based')) out.add('Romance');
            if (lower.includes('portuguese-based')) out.add('Romance');
            if (lower.includes('spanish-based'))    out.add('Romance');
            if (lower.includes('arabic-based'))     out.add('Semitic');
            if (lower.includes('dutch-based'))      out.add('Germanic');
        }
        if (lower.includes('pidgin'))     out.add('Pidgin');
        if (lower.includes('proto'))      out.add('Proto-language');
        if (lower.includes('mixed'))      out.add('Mixed');
        // Parent-family normalization: ensure both sub-branch and parent
        // family tags are present so chips don't fragment (e.g. Semitic +
        // Afro-Asiatic, Iranian + Indo-European, Bantu + Niger-Congo).
        // Iterate via a snapshot because we mutate `out`.
        for (const t of [...out]) {
            const parent = PARENT_FAMILY[t];
            if (parent) out.add(canonicalFamily(parent));
        }
        return [...out];
    }

    // ----- Build per-language feature record on demand --------------------

    function familyDefault(famStr) {
        if (!famStr) return {};
        if (FAMILY_DEFAULTS[famStr]) return FAMILY_DEFAULTS[famStr];
        const top = topFamily(famStr);
        return (top && FAMILY_DEFAULTS[top]) || {};
    }

    const _featCache = new Map();
    function featuresFor(code) {
        if (_featCache.has(code)) return _featCache.get(code);
        if (typeof LANG_DATA === 'undefined' || !LANG_DATA[code]) return null;
        const lang = LANG_DATA[code];
        const meta = lang.meta || {};
        const fam = meta.family || null;
        const fd = familyDefault(fam);
        const curated = F[code] || {};
        // Cascade: per-language override > family default > null.
        // `script` and `family` are both Array<string> — a language can
        // genuinely belong to more than one family (creoles → substrate +
        // lexifier; proto-languages → themselves and the family they root).
        // Audit Task 130: prefer meta.scriptTags (curated) over regex detection.
        const scriptTags = Array.isArray(meta.scriptTags) && meta.scriptTags.length > 0
            ? meta.scriptTags.slice()
            : detectScript(meta.script);
        // Audit Task 117: track provenance of each typological value so the
        // UI/validator can distinguish language-specific facts from family
        // defaults (which may be wrong for any individual language).
        //   'manual-override'  — curated per-language F[code]
        //   'family-default'   — derived from family heuristic
        //   'unknown'          — neither source had a value
        const woProv    = curated.wo   ? 'manual-override' : (fd.wo   ? 'family-default' : 'unknown');
        const toneProv  = (typeof curated.tone === 'boolean') ? 'manual-override'
                        : (typeof fd.tone      === 'boolean') ? 'family-default' : 'unknown';
        const morphProv = curated.morph ? 'manual-override' : (fd.morph ? 'family-default' : 'unknown');
        const rec = {
            family:  expandFamilies(fam, code),
            script:  scriptTags,
            wo:      curated.wo    || fd.wo    || null,
            tone:    typeof curated.tone === 'boolean' ? curated.tone
                   : typeof fd.tone      === 'boolean' ? fd.tone : null,
            morph:   curated.morph || fd.morph || null,
            speaker: speakerTierFromStructured(meta.speakerCount) || parseSpeakerTier(meta.speakers),
            // Audit Task 117 provenance
            provenance: { wo: woProv, tone: toneProv, morph: morphProv },
        };
        // 'Proto-language' filter membership must track the reconstructed-proto
        // flag — NOT family-string 'proto' heuristics or ad-hoc overrides. Tag
        // every reconstructed proto (PIE, Proto-Japonic-Koreanic, Proto-Ryukyuan,
        // the family protos) and ONLY those, so attested ancient languages —
        // Vedic Sanskrit, Old Chinese, etc. — never match the proto chip.
        if (meta.languageKind === 'reconstructed-proto') {
            if (!rec.family.includes('Proto-language')) rec.family.push('Proto-language');
        } else if (rec.family.includes('Proto-language')) {
            rec.family = rec.family.filter(t => t !== 'Proto-language');
        }
        _featCache.set(code, rec);
        return rec;
    }

    // ----- Filter state ---------------------------------------------------
    //
    // Each entry is a Set of allowed values. Empty set = no filter on that
    // category (everything passes that category).

    const filterState = {
        family:  new Set(),
        script:  new Set(),
        wo:      new Set(),
        tone:    new Set(),  // 'tonal' or 'non-tonal'
        morph:   new Set(),
        speaker: new Set(),
    };
    // Set once, the first time init() hydrates filterState from the URL hash,
    // so deferred init() retries don't re-read (and re-clear from) the hash.
    let _filterHydrated = false;

    // ----- Historical period-range filter --------------------------------
    // Only shown / active in historical mode. Selection is a CONTIGUOUS range
    // of centuries; a language passes when its meta.period OVERLAPS that range.
    // The slider works in signed century indices: negative = c BCE,
    // positive = c CE (0 treated as the BCE/CE boundary). Full span =
    // inactive. -100 / +21 span the data's actual earliest start (Proto-
    // Afroasiatic, ~100c BCE) to its latest end (living liturgical langs, 21c).
    const PERIOD_MIN_IDX = -100, PERIOD_MAX_IDX = 21;
    const periodFilter = { fromIdx: PERIOD_MIN_IDX, toIdx: PERIOD_MAX_IDX };
    function periodActive() {
        return periodFilter.fromIdx > PERIOD_MIN_IDX || periodFilter.toIdx < PERIOD_MAX_IDX;
    }
    function fmtIdx(i) { return i < 0 ? (-i) + 'c BCE' : (i <= 0 ? '1c CE' : i + 'c CE'); }
    // Parse a meta.period string ("15cBCE–21cCE", "6–1cBCE", "5–12c") into a
    // [startIdx, endIdx] pair of SIGNED CENTURY INDICES (BCE negative, CE
    // positive — same space as the slider). A bare side inherits the era
    // marker of the other side. Returns null if unparseable.
    //
    // Working in century indices (not years) avoids an off-by-one at century
    // boundaries: a language ending in the 16th c must NOT match a range that
    // starts in the 17th c. Overlap is the plain integer test below.
    function periodToIdxRange(str) {
        if (!str) return null;
        let p = String(str).split('–');
        if (p.length !== 2) p = [p[0], p[0]];
        const era = x => /BCE/i.test(x) ? 'BCE' : (/CE/i.test(x) ? 'CE' : null);
        const cen = x => { const m = x.match(/(\d+)/); return m ? +m[1] : null; };
        let [L, R] = p;
        let eL = era(L), eR = era(R);
        if (!eR) eR = eL || 'CE';
        if (!eL) eL = eR;
        const cL = cen(L), cR = cen(R);
        if (cL == null || cR == null) return null;
        return [eL === 'BCE' ? -cL : cL, eR === 'BCE' ? -cR : cR];
    }
    // Does a language's century-index span overlap the active filter range?
    function periodMatches(code) {
        const rng = periodToIdxRange((LANG_DATA[code] && LANG_DATA[code].meta || {}).period);
        if (!rng) return false;
        return !(rng[0] > periodFilter.toIdx || rng[1] < periodFilter.fromIdx);
    }

    // ----- URL-hash persistence ------------------------------------------
    // Encoded as a single hash param `f=cat:val,val|cat:val|…`.
    // Section/value separators (|, :, ,) chosen to avoid collision with the
    // top-level & separator app.js uses for its own hash params.

    function encodeFilterState() {
        const parts = [];
        for (const cat of Object.keys(filterState)) {
            const set = filterState[cat];
            if (set.size === 0) continue;
            const vals = [...set].map(v => encodeURIComponent(v)).join(',');
            parts.push(cat + ':' + vals);
        }
        // Historical period range (not a Set): serialize as period:from..to so a
        // shared/reloaded URL restores it like the other filters.
        if (periodActive()) parts.push('period:' + periodFilter.fromIdx + '..' + periodFilter.toIdx);
        return parts.join('|');
    }
    function decodeFilterParam(s) {
        const out = {};
        if (!s) return out;
        for (const part of s.split('|')) {
            const idx = part.indexOf(':');
            if (idx < 0) continue;
            const cat = part.slice(0, idx);
            const vals = part.slice(idx + 1);
            if (cat === 'period') {
                const m = vals.match(/^(-?\d+)\.\.(-?\d+)$/);
                if (m) out.period = { fromIdx: parseInt(m[1], 10), toIdx: parseInt(m[2], 10) };
                continue;
            }
            if (!filterState[cat]) continue;
            out[cat] = vals.split(',').map(v => { try { return decodeURIComponent(v); } catch (e) { return v; } });
        }
        return out;
    }
    function syncHash() {
        const enc = encodeFilterState();
        const h = location.hash.slice(1);
        const others = h ? h.split('&').filter(p => p && !p.startsWith('f=')) : [];
        if (enc) others.push('f=' + enc);
        const newHash = others.join('&');
        if (newHash !== h) {
            // replaceState avoids growing the back-button history per click
            try { history.replaceState(null, '', newHash ? '#' + newHash : location.pathname + location.search); }
            catch (e) { location.hash = newHash; }
        }
    }
    function loadFilterFromHash() {
        const h = location.hash.slice(1);
        if (!h) return;
        const fParam = h.split('&').find(p => p.startsWith('f='));
        if (!fParam) return;
        let raw = fParam.slice(2);
        // app.js's updateHash historically routed f= through URLSearchParams,
        // which percent-encodes the : | , separators (f=family%3ARomance),
        // whereas syncHash writes them raw (f=family:Romance). If the separators
        // are encoded, undo exactly one layer so decodeFilterParam (which splits
        // on literal : | , and decodes each value itself) parses both forms.
        // Only when a separator is actually encoded — otherwise a raw value that
        // legitimately contains an encoded comma (a%2Cb) would be over-decoded.
        if (/%3A|%7C/i.test(raw)) { try { raw = decodeURIComponent(raw); } catch (_) {} }
        const decoded = decodeFilterParam(raw);
        for (const cat of Object.keys(decoded)) {
            if (cat === 'period') continue;   // range, not a Set — applied below
            filterState[cat].clear();
            for (const v of decoded[cat]) filterState[cat].add(v);
        }
        if (decoded.period && typeof decoded.period.fromIdx === 'number') {
            const clamp = v => Math.max(PERIOD_MIN_IDX, Math.min(PERIOD_MAX_IDX, v));
            let f = clamp(decoded.period.fromIdx), t = clamp(decoded.period.toIdx);
            if (f > t) { const tmp = f; f = t; t = tmp; }
            periodFilter.fromIdx = f;
            periodFilter.toIdx = t;
        }
    }
    // Expose so app.js's updateHash can preserve the f= param when it
    // rewrites location.hash (otherwise our state gets clobbered).
    window.__langmap = window.__langmap || {};
    window.__langmap.getFilterHashParam = function () {
        const enc = encodeFilterState();
        return enc ? 'f=' + enc : '';
    };
    // Expose filter predicates so wordmap.html's label-collision algorithm
    // can scope cell-bucket competition to active labels only — dimmed
    // (filtered-out) labels no longer push active labels around.
    window.__langmap.passesFilter = function (code) { return passesFilter(code); };
    window.__langmap.anyFilterActive = function () { return anyFilterActive(); };
    // Audit Task 117: expose featuresFor so wordmap.html modal can show
    // typology + provenance. featuresFor caches internally so cheap to call.
    window.__langmap.getFeatures = function (code) { return featuresFor(code); };

    function passesFilter(code) {
        const f = featuresFor(code);
        if (!f) return false;
        for (const cat of Object.keys(filterState)) {
            const allowed = filterState[cat];
            if (allowed.size === 0) continue;
            // Script + family are multi-valued: a language passes if ANY
            // of its tags matches the allowed set (e.g. Punjabi has both
            // Brahmic and Arabic-derived; Singlish has both Germanic and
            // Creole; selecting either should highlight the language).
            if (cat === 'script' || cat === 'family') {
                const tags = f[cat];
                if (!Array.isArray(tags) || tags.length === 0) return false;
                if (!tags.some(s => allowed.has(s))) return false;
                continue;
            }
            let v;
            if (cat === 'tone') {
                if (f.tone == null) return false;
                v = f.tone ? 'tonal' : 'non-tonal';
            } else {
                v = f[cat];
                if (v == null) return false;
            }
            if (!allowed.has(v)) return false;
        }
        // Historical period-range: keep only languages whose attested span
        // OVERLAPS the selected century range. A historical language with an
        // unparseable/absent period can't be range-checked → excluded while
        // the range filter is active.
        if (periodActive() && !periodMatches(code)) return false;
        return true;
    }

    function anyFilterActive() {
        return periodActive() || Object.values(filterState).some(s => s.size > 0);
    }

    function totalActiveFilters() {
        return (periodActive() ? 1 : 0)
             + Object.values(filterState).reduce((s, set) => s + set.size, 0);
    }

    // ----- Visual application (DOM-based) ---------------------------------

    let lastApplyId = 0;
    function applyFilter() {
        const myId = ++lastApplyId;
        const active = anyFilterActive();
        const labels = document.querySelectorAll('.lang-label, .globe-label');
        labels.forEach(el => {
            const code = el.dataset.code;
            if (!code) return;
            const ok = !active || passesFilter(code);
            // Touch the wrapping element (label root with the "vertical" class etc.)
            el.classList.toggle('lf-dimmed', active && !ok);
        });
        // Counter must reflect the full era cohort (not just labels currently
        // rendered on the viewport — zoom gating hides most labels at low
        // zoom and gave misleading "59 languages" totals).
        if (myId !== lastApplyId) return;
        const counter = document.querySelector('.lf-counter');
        if (counter) {
            const cohort = (window.__langmap && typeof window.__langmap.getActiveCodes === 'function')
                ? [...window.__langmap.getActiveCodes()]
                : [...document.querySelectorAll('.lang-label, .globe-label')].map(el => el.dataset.code).filter(Boolean);
            const total = cohort.length;
            const matched = active ? cohort.filter(c => passesFilter(c)).length : total;
            if (active) counter.textContent = t('count_active', { m: matched, n: total });
            else counter.textContent = t('count_total', { n: total });
        }
    }

    function injectStyles() {
        const css = `
        .lf-fab {
            display: inline-flex; align-items: center; gap: 4px;
            font-size: 13px; padding: 5px 12px; border: 1px solid #d0d0d0;
            border-radius: 20px; background: rgba(255,255,255,0.92);
            backdrop-filter: blur(6px); cursor: pointer;
            box-shadow: 0 1px 4px rgba(0,0,0,0.12);
            color: #555; font-weight: 500;
            transition: background 0.2s, border-color 0.2s;
            align-self: flex-start;
        }
        .lf-fab:hover { background: #fff; border-color: #999; }
        .lf-fab.active { background: #4a6cf7; color: #fff; border-color: #3a5ce5; }
        .lf-fab .lf-badge {
            background: #fff; color: #3a5ce5; font-weight: 700;
            font-size: 11px; min-width: 18px; height: 18px; line-height: 18px;
            border-radius: 9px; padding: 0 5px; text-align: center;
        }

        .lf-panel {
            position: absolute; left: 12px; z-index: 1010;
            width: 320px; max-width: calc(100vw - 24px);
            max-height: calc(100vh - 160px); overflow-y: auto;
            background: rgba(255,255,255,0.97); border-radius: 10px;
            padding: 12px 14px 14px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
            font-size: 12px; color: #222; display: none;
        }
        .lf-panel.open { display: block; }
        .lf-panel-header {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 8px;
        }
        .lf-panel-title { font-size: 13px; font-weight: 600; }
        .lf-actions { display: flex; gap: 6px; align-items: center; }
        .lf-counter { font-size: 11px; color: #888; }
        .lf-reset {
            background: transparent; border: 1px solid #ddd; border-radius: 4px;
            font-size: 10px; padding: 2px 6px; cursor: pointer; color: #666;
        }
        .lf-reset:hover { background: #f5f5f5; border-color: #aaa; }
        .lf-close {
            border: none; background: transparent; cursor: pointer; color: #666;
            font-size: 20px; line-height: 1; padding: 0 4px; margin-left: 2px;
            border-radius: 4px; font-weight: 400;
        }
        .lf-close:hover { background: #eee; color: #000; }
        .lf-period-readout { font-size: 12px; font-weight: 600; color: #333; text-align: center; margin: 2px 0 4px; }
        /* Single dual-thumb range: two <input type=range> stacked on one track.
           The inputs are click-through (pointer-events:none) except their
           thumbs, so both handles are independently grabbable. */
        .lf-period-dual { position: relative; height: 26px; margin: 2px 2px 2px; }
        .lf-period-track {
            position: absolute; top: 50%; transform: translateY(-50%); left: 0; right: 0;
            height: 4px; border-radius: 2px; background: #ddd; pointer-events: none;
        }
        /* The fill is a full-height grab zone (drag it to slide the whole range);
           the visible 4px bar is drawn by ::before. */
        .lf-period-fill {
            position: absolute; top: 0; height: 100%;
            background: transparent; pointer-events: auto; cursor: grab; touch-action: none;
        }
        .lf-period-fill::before {
            content: ''; position: absolute; top: 50%; left: 0; right: 0; transform: translateY(-50%);
            height: 4px; border-radius: 2px; background: #4a6cf7;
        }
        .lf-period-fill:active { cursor: grabbing; }
        .lf-period-dual input[type=range] {
            position: absolute; left: 0; top: 0; width: 100%; height: 26px;
            margin: 0; background: none; -webkit-appearance: none; appearance: none;
            pointer-events: none;
        }
        .lf-period-dual input[type=range]::-webkit-slider-runnable-track { background: none; border: none; }
        .lf-period-dual input[type=range]::-moz-range-track { background: none; border: none; }
        .lf-period-dual input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none; appearance: none; pointer-events: auto; cursor: pointer;
            width: 15px; height: 15px; border-radius: 50%; background: #fff;
            border: 2px solid #4a6cf7; box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .lf-period-dual input[type=range]::-moz-range-thumb {
            pointer-events: auto; cursor: pointer; width: 15px; height: 15px;
            border-radius: 50%; background: #fff; border: 2px solid #4a6cf7;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        .lf-section { margin-top: 10px; }
        .lf-section-title {
            font-size: 11px; font-weight: 600; color: #555;
            margin-bottom: 4px; display: flex; justify-content: space-between;
        }
        .lf-section-clear {
            font-size: 10px; color: #4a6cf7; cursor: pointer; user-select: none;
        }
        .lf-section-clear:hover { text-decoration: underline; }
        .lf-chips {
            display: flex; flex-wrap: wrap; gap: 4px;
        }
        .lf-chip {
            font-family: inherit; color: inherit;
            font-size: 11px; padding: 3px 8px;
            border: 1px solid #d0d0d0; border-radius: 12px;
            background: #fafafa; cursor: pointer;
            transition: all 0.15s; user-select: none;
            display: inline-flex; align-items: center; gap: 3px;
            line-height: 1.2;
        }
        .lf-chip:hover:not([disabled]):not(.on) { background: #eef; border-color: #99c; }
        .lf-chip:focus-visible {
            outline: 2px solid #4a6cf7; outline-offset: 1px;
        }
        .lf-chip.on,
        .lf-chip.on:hover,
        .lf-chip.on:focus {
            background: #4a6cf7; color: #fff; border-color: #3a5ce5;
            box-shadow: 0 1px 3px rgba(74,108,247,0.35);
        }
        .lf-chip[disabled] { cursor: not-allowed; }
        .lf-chip-count { opacity: 0.65; font-size: 10px; }

        /* Collapsible long lists (e.g. families) */
        .lf-chip-hidden { display: none !important; }
        .lf-section.lf-expanded .lf-chip-hidden { display: inline-flex !important; }
        /* Disabled chips (zero count in current era) */
        .lf-chip-disabled {
            opacity: 0.35; cursor: not-allowed; background: #f8f8f8;
        }
        .lf-chip-disabled:hover { background: #f8f8f8; border-color: #d0d0d0; }
        .lf-chip-more {
            font-size: 11px; padding: 3px 8px;
            color: #4a6cf7; cursor: pointer; user-select: none;
            background: transparent; border: 1px dashed transparent;
        }
        .lf-chip-more:hover { text-decoration: underline; }

        /* Dim non-matching labels */
        .lf-dimmed { opacity: 0.12 !important; pointer-events: none; }
        .lf-dimmed * { pointer-events: none; }
        @media (max-width: 768px) {
            .lf-panel { left: 6px; max-height: 60vh; width: calc(100vw - 12px); }
        }
        `;
        const style = document.createElement('style');
        style.id = 'lf-styles';
        style.textContent = css;
        document.head.appendChild(style);
    }

    // ----- Available-value enumeration with counts -------------------------

    // Helper: does a language pass all filter categories EXCEPT skipCat?
    function passesFilterExcept(code, skipCat) {
        const f = featuresFor(code);
        if (!f) return false;
        for (const cat of Object.keys(filterState)) {
            if (cat === skipCat) continue;
            const allowed = filterState[cat];
            if (allowed.size === 0) continue;
            if (cat === 'script' || cat === 'family') {
                const tags = f[cat];
                if (!Array.isArray(tags) || tags.length === 0) return false;
                if (!tags.some(s => allowed.has(s))) return false;
                continue;
            }
            let v;
            if (cat === 'tone') {
                if (f.tone == null) return false;
                v = f.tone ? 'tonal' : 'non-tonal';
            } else {
                v = f[cat];
                if (v == null) return false;
            }
            if (!allowed.has(v)) return false;
        }
        // Period range applies to chip counts too (it's never a chip category,
        // so it's always enforced here when active).
        if (periodActive() && !periodMatches(code)) return false;
        return true;
    }

    function enumerateValues() {
        // Universe = union of values across ALL languages (regardless of era
        // or current filter selection) so chip identity stays stable.
        // Counts for chip V in category C = #(languages that pass all OTHER
        // categories' filters AND have V in C). This means: clicking V in C
        // (when nothing in C is selected yet) would match exactly that many.
        // 0-count chips render disabled.
        const universe = {
            family: new Set(), script: new Set(), wo: new Set(),
            morph: new Set(), speaker: new Set(),
        };
        const counts = {
            family: new Map(), script: new Map(), wo: new Map(),
            morph: new Map(), speaker: new Map(),
        };
        let tonal = 0, nonTonal = 0;
        let toneUniverse = { tonal: false, 'non-tonal': false };
        const scope = (window.__langmap && typeof window.__langmap.getActiveCodes === 'function')
            ? window.__langmap.getActiveCodes() : null;
        for (const code of Object.keys(LANG_DATA)) {
            const f = featuresFor(code);
            if (!f) continue;
            if (scope && !scope.has(code)) continue;
            // Build the per-category universe regardless of filter state
            if (Array.isArray(f.family)) for (const v of f.family) universe.family.add(v);
            if (Array.isArray(f.script)) for (const v of f.script) universe.script.add(v);
            if (f.wo)      universe.wo.add(f.wo);
            if (f.morph)   universe.morph.add(f.morph);
            if (f.speaker) universe.speaker.add(f.speaker);
            if (f.tone === true)  toneUniverse.tonal = true;
            if (f.tone === false) toneUniverse['non-tonal'] = true;
            // For each category, count this language toward chip V if it
            // passes all filters EXCEPT this category.
            const passFamily  = passesFilterExcept(code, 'family');
            const passScript  = passesFilterExcept(code, 'script');
            const passWo      = passesFilterExcept(code, 'wo');
            const passTone    = passesFilterExcept(code, 'tone');
            const passMorph   = passesFilterExcept(code, 'morph');
            const passSpeaker = passesFilterExcept(code, 'speaker');
            if (passFamily && Array.isArray(f.family)) for (const v of f.family) counts.family.set(v, (counts.family.get(v) || 0) + 1);
            if (passScript && Array.isArray(f.script)) for (const v of f.script) counts.script.set(v, (counts.script.get(v) || 0) + 1);
            if (passWo      && f.wo)      counts.wo.set(f.wo,           (counts.wo.get(f.wo) || 0) + 1);
            if (passMorph   && f.morph)   counts.morph.set(f.morph,     (counts.morph.get(f.morph) || 0) + 1);
            if (passSpeaker && f.speaker) counts.speaker.set(f.speaker, (counts.speaker.get(f.speaker) || 0) + 1);
            if (passTone) {
                if (f.tone === true)  tonal++;
                if (f.tone === false) nonTonal++;
            }
        }
        const buildEntries = (cat, sortFn) => {
            const entries = [...universe[cat]].map(k => [k, counts[cat].get(k) || 0]);
            return sortFn ? entries.sort(sortFn) : entries.sort((a, b) => b[1] - a[1]);
        };
        return {
            family:  buildEntries('family'),
            script:  buildEntries('script'),
            wo:      buildEntries('wo', (a, b) => SPEAKER_TIERS_ORDER_W.indexOf(a[0]) - SPEAKER_TIERS_ORDER_W.indexOf(b[0])),
            tone:    [['tonal', tonal], ['non-tonal', nonTonal]].filter(([k]) => toneUniverse[k]),
            morph:   buildEntries('morph'),
            speaker: SPEAKER_TIERS.map(t => [t, counts.speaker.get(t) || 0]).filter(t => universe.speaker.has(t[0])),
        };
    }
    const SPEAKER_TIERS_ORDER_W = ['SOV','SVO','VSO','VOS','OVS','OSV'];

    // ----- Panel construction ---------------------------------------------

    // Filter-UI strings translated for all 21 UI languages. {n} = remaining
    // count placeholder (used in show-more toggle and counter).
    const FILTER_UI_TEXT = {
        en: { title_period:'Period', period_from:'From', period_to:'To', close:'Close', title_filter:'Filter', title_family:'Family', title_script:'Script', title_wo:'Word Order', title_tone:'Tone', title_morph:'Morphology', title_speaker:'Speakers', btn_clear:'Clear', btn_show_more:'+ Show {n} more', btn_collapse:'− Collapse', loading:'Loading…', loading_data:'Loading language data…', val_tonal:'tonal', val_non_tonal:'non-tonal', count_total:'{n} languages', count_active:'{m} / {n} languages' },
        ja: { title_period:'時代', period_from:'開始', period_to:'終了', close:'閉じる', title_filter:'フィルター', title_family:'語族', title_script:'文字', title_wo:'語順', title_tone:'声調', title_morph:'形態論', title_speaker:'話者数', btn_clear:'クリア', btn_show_more:'+ もっと表示 ({n}件)', btn_collapse:'− 折りたたむ', loading:'読み込み中…', loading_data:'言語データを読み込み中…', val_tonal:'声調あり', val_non_tonal:'声調なし', count_total:'{n} 言語', count_active:'{m} / {n} 言語' },
        ko: { title_period:'시대', period_from:'시작', period_to:'끝', close:'닫기', title_filter:'필터', title_family:'어족', title_script:'문자', title_wo:'어순', title_tone:'성조', title_morph:'형태론', title_speaker:'화자 수', btn_clear:'지우기', btn_show_more:'+ 더 보기 ({n})', btn_collapse:'− 접기', loading:'로딩 중…', loading_data:'언어 데이터 로딩 중…', val_tonal:'성조 있음', val_non_tonal:'성조 없음', count_total:'{n}개 언어', count_active:'{m} / {n}개 언어' },
        zh: { title_period:'时期', period_from:'起', period_to:'迄', close:'关闭', title_filter:'筛选', title_family:'语系', title_script:'文字', title_wo:'语序', title_tone:'声调', title_morph:'形态学', title_speaker:'使用者人数', btn_clear:'清除', btn_show_more:'+ 显示更多 ({n})', btn_collapse:'− 折叠', loading:'加载中…', loading_data:'正在加载语言数据…', val_tonal:'有声调', val_non_tonal:'无声调', count_total:'{n} 种语言', count_active:'{m} / {n} 种语言' },
        yue: { title_period:'時期', period_from:'起', period_to:'迄', close:'關閉', title_filter:'篩選', title_family:'語系', title_script:'文字', title_wo:'語序', title_tone:'聲調', title_morph:'形態學', title_speaker:'使用者人數', btn_clear:'清除', btn_show_more:'+ 顯示更多 ({n})', btn_collapse:'− 摺疊', loading:'載入中…', loading_data:'正在載入語言數據…', val_tonal:'有聲調', val_non_tonal:'無聲調', count_total:'{n} 種語言', count_active:'{m} / {n} 種語言' },
        vi: { title_period:'Thời kỳ', period_from:'Từ', period_to:'Đến', close:'Đóng', title_filter:'Bộ lọc', title_family:'Họ ngôn ngữ', title_script:'Chữ viết', title_wo:'Trật tự từ', title_tone:'Thanh điệu', title_morph:'Hình thái', title_speaker:'Người nói', btn_clear:'Xóa', btn_show_more:'+ Hiện thêm {n}', btn_collapse:'− Thu gọn', loading:'Đang tải…', loading_data:'Đang tải dữ liệu ngôn ngữ…', val_tonal:'có thanh điệu', val_non_tonal:'không thanh điệu', count_total:'{n} ngôn ngữ', count_active:'{m} / {n} ngôn ngữ' },
        th: { title_period:'ยุคสมัย', period_from:'จาก', period_to:'ถึง', close:'ปิด', title_filter:'ตัวกรอง', title_family:'ตระกูลภาษา', title_script:'อักษร', title_wo:'ลำดับคำ', title_tone:'วรรณยุกต์', title_morph:'สัณฐานวิทยา', title_speaker:'จำนวนผู้พูด', btn_clear:'ล้าง', btn_show_more:'+ แสดงเพิ่ม {n}', btn_collapse:'− ย่อ', loading:'กำลังโหลด…', loading_data:'กำลังโหลดข้อมูลภาษา…', val_tonal:'มีวรรณยุกต์', val_non_tonal:'ไม่มีวรรณยุกต์', count_total:'{n} ภาษา', count_active:'{m} / {n} ภาษา' },
        id: { title_period:'Periode', period_from:'Dari', period_to:'Sampai', close:'Tutup', title_filter:'Filter', title_family:'Rumpun', title_script:'Aksara', title_wo:'Urutan Kata', title_tone:'Tonal', title_morph:'Morfologi', title_speaker:'Jumlah Penutur', btn_clear:'Hapus', btn_show_more:'+ Tampilkan {n} lagi', btn_collapse:'− Ciutkan', loading:'Memuat…', loading_data:'Memuat data bahasa…', val_tonal:'tonal', val_non_tonal:'non-tonal', count_total:'{n} bahasa', count_active:'{m} / {n} bahasa' },
        hi: { title_period:'काल', period_from:'से', period_to:'तक', close:'बंद करें', title_filter:'फ़िल्टर', title_family:'भाषा परिवार', title_script:'लिपि', title_wo:'शब्द क्रम', title_tone:'स्वराघात', title_morph:'आकृति विज्ञान', title_speaker:'वक्ता संख्या', btn_clear:'साफ़ करें', btn_show_more:'+ {n} और दिखाएं', btn_collapse:'− सिकोड़ें', loading:'लोड हो रहा है…', loading_data:'भाषा डेटा लोड हो रहा है…', val_tonal:'स्वराघातिक', val_non_tonal:'गैर-स्वराघातिक', count_total:'{n} भाषाएं', count_active:'{m} / {n} भाषाएं' },
        de: { title_period:'Zeitraum', period_from:'Von', period_to:'Bis', close:'Schließen', title_filter:'Filter', title_family:'Sprachfamilie', title_script:'Schrift', title_wo:'Wortstellung', title_tone:'Ton', title_morph:'Morphologie', title_speaker:'Sprecher', btn_clear:'Löschen', btn_show_more:'+ {n} weitere anzeigen', btn_collapse:'− Einklappen', loading:'Lädt…', loading_data:'Sprachdaten werden geladen…', val_tonal:'tonal', val_non_tonal:'nicht tonal', count_total:'{n} Sprachen', count_active:'{m} / {n} Sprachen' },
        fr: { title_period:'Période', period_from:'De', period_to:'À', close:'Fermer', title_filter:'Filtre', title_family:'Famille', title_script:'Écriture', title_wo:'Ordre des mots', title_tone:'Ton', title_morph:'Morphologie', title_speaker:'Locuteurs', btn_clear:'Effacer', btn_show_more:'+ Afficher {n} de plus', btn_collapse:'− Réduire', loading:'Chargement…', loading_data:'Chargement des données…', val_tonal:'tonale', val_non_tonal:'non tonale', count_total:'{n} langues', count_active:'{m} / {n} langues' },
        it: { title_period:'Periodo', period_from:'Da', period_to:'A', close:'Chiudi', title_filter:'Filtro', title_family:'Famiglia', title_script:'Scrittura', title_wo:'Ordine parole', title_tone:'Tono', title_morph:'Morfologia', title_speaker:'Parlanti', btn_clear:'Cancella', btn_show_more:'+ Mostra altri {n}', btn_collapse:'− Comprimi', loading:'Caricamento…', loading_data:'Caricamento dati lingue…', val_tonal:'tonale', val_non_tonal:'non tonale', count_total:'{n} lingue', count_active:'{m} / {n} lingue' },
        es_eu: { title_period:'Periodo', period_from:'Desde', period_to:'Hasta', close:'Cerrar', title_filter:'Filtro', title_family:'Familia', title_script:'Escritura', title_wo:'Orden de palabras', title_tone:'Tono', title_morph:'Morfología', title_speaker:'Hablantes', btn_clear:'Borrar', btn_show_more:'+ Mostrar {n} más', btn_collapse:'− Contraer', loading:'Cargando…', loading_data:'Cargando datos de idiomas…', val_tonal:'tonal', val_non_tonal:'no tonal', count_total:'{n} idiomas', count_active:'{m} / {n} idiomas' },
        es_mx: { title_period:'Periodo', period_from:'Desde', period_to:'Hasta', close:'Cerrar', title_filter:'Filtro', title_family:'Familia', title_script:'Escritura', title_wo:'Orden de palabras', title_tone:'Tono', title_morph:'Morfología', title_speaker:'Hablantes', btn_clear:'Borrar', btn_show_more:'+ Mostrar {n} más', btn_collapse:'− Contraer', loading:'Cargando…', loading_data:'Cargando datos de idiomas…', val_tonal:'tonal', val_non_tonal:'no tonal', count_total:'{n} idiomas', count_active:'{m} / {n} idiomas' },
        pt_eu: { title_period:'Período', period_from:'De', period_to:'Até', close:'Fechar', title_filter:'Filtro', title_family:'Família', title_script:'Escrita', title_wo:'Ordem das palavras', title_tone:'Tom', title_morph:'Morfologia', title_speaker:'Falantes', btn_clear:'Limpar', btn_show_more:'+ Mostrar mais {n}', btn_collapse:'− Recolher', loading:'A carregar…', loading_data:'A carregar dados de idiomas…', val_tonal:'tonal', val_non_tonal:'não tonal', count_total:'{n} idiomas', count_active:'{m} / {n} idiomas' },
        pt_br: { title_period:'Período', period_from:'De', period_to:'Até', close:'Fechar', title_filter:'Filtro', title_family:'Família', title_script:'Escrita', title_wo:'Ordem das palavras', title_tone:'Tom', title_morph:'Morfologia', title_speaker:'Falantes', btn_clear:'Limpar', btn_show_more:'+ Mostrar mais {n}', btn_collapse:'− Recolher', loading:'Carregando…', loading_data:'Carregando dados de idiomas…', val_tonal:'tonal', val_non_tonal:'não tonal', count_total:'{n} idiomas', count_active:'{m} / {n} idiomas' },
        ru: { title_period:'Период', period_from:'С', period_to:'По', close:'Закрыть', title_filter:'Фильтр', title_family:'Семья', title_script:'Письмо', title_wo:'Порядок слов', title_tone:'Тон', title_morph:'Морфология', title_speaker:'Говорящие', btn_clear:'Очистить', btn_show_more:'+ Показать ещё {n}', btn_collapse:'− Свернуть', loading:'Загрузка…', loading_data:'Загрузка данных…', val_tonal:'тональный', val_non_tonal:'не тональный', count_total:'{n} языков', count_active:'{m} / {n} языков' },
        uk: { title_period:'Період', period_from:'Від', period_to:'До', close:'Закрити', title_filter:'Фільтр', title_family:'Родина', title_script:'Письмо', title_wo:'Порядок слів', title_tone:'Тон', title_morph:'Морфологія', title_speaker:'Мовці', btn_clear:'Очистити', btn_show_more:'+ Показати ще {n}', btn_collapse:'− Згорнути', loading:'Завантаження…', loading_data:'Завантаження даних…', val_tonal:'тональна', val_non_tonal:'не тональна', count_total:'{n} мов', count_active:'{m} / {n} мов' },
        ar: { title_period:'الفترة', period_from:'من', period_to:'إلى', close:'إغلاق', title_filter:'فلتر', title_family:'العائلة', title_script:'الخط', title_wo:'ترتيب الكلمات', title_tone:'النبرة', title_morph:'علم الصرف', title_speaker:'عدد المتحدثين', btn_clear:'مسح', btn_show_more:'+ عرض {n} المزيد', btn_collapse:'− طي', loading:'جارٍ التحميل…', loading_data:'جارٍ تحميل بيانات اللغة…', val_tonal:'نبري', val_non_tonal:'غير نبري', count_total:'{n} لغات', count_active:'{m} / {n} لغات' },
        he: { title_period:'תקופה', period_from:'מ־', period_to:'עד', close:'סגור', title_filter:'סינון', title_family:'משפחה', title_script:'כתב', title_wo:'סדר מילים', title_tone:'טון', title_morph:'מורפולוגיה', title_speaker:'דוברים', btn_clear:'נקה', btn_show_more:'+ הצג עוד {n}', btn_collapse:'− כווץ', loading:'טוען…', loading_data:'טוען נתוני שפה…', val_tonal:'טונאלית', val_non_tonal:'לא טונאלית', count_total:'{n} שפות', count_active:'{m} / {n} שפות' },
        sw: { title_period:'Kipindi', period_from:'Kuanzia', period_to:'Hadi', close:'Funga', title_filter:'Kichujio', title_family:'Familia', title_script:'Mwandiko', title_wo:'Mpangilio wa Maneno', title_tone:'Toni', title_morph:'Mofolojia', title_speaker:'Wazungumzaji', btn_clear:'Futa', btn_show_more:'+ Onyesha {n} zaidi', btn_collapse:'− Kunja', loading:'Inapakia…', loading_data:'Inapakia data ya lugha…', val_tonal:'yenye toni', val_non_tonal:'isiyo na toni', count_total:'lugha {n}', count_active:'{m} / {n} lugha' },
    };

    // Per-chip-value translations for morph + script categories.
    // META_I18N covers most family names but is sparse for these tags, so
    // we ship a self-contained table here.
    const CHIP_LABELS = {
        morph: {
            isolating: { ja:'孤立語', ko:'고립어', zh:'孤立语', yue:'孤立語', vi:'đơn lập', th:'ภาษาคำโดด', id:'isolatif', hi:'वियोगात्मक', de:'isolierend', fr:'isolante', it:'isolante', es_eu:'aislante', es_mx:'aislante', pt_eu:'isolante', pt_br:'isolante', ru:'изолирующий', uk:'ізолятивна', ar:'عازلة', he:'מבודדת', sw:'isiyoambika' },
            fusional: { ja:'屈折語', ko:'굴절어', zh:'屈折语', yue:'屈折語', vi:'biến hình', th:'ภาษาวิภัตติ', id:'fusional', hi:'योगात्मक', de:'flektierend', fr:'fusionnelle', it:'fusiva', es_eu:'flexiva', es_mx:'flexiva', pt_eu:'fusional', pt_br:'fusional', ru:'флективный', uk:'флективна', ar:'اندماجية', he:'פוזיונלית', sw:'iliyoungana' },
            agglutinative: { ja:'膠着語', ko:'교착어', zh:'黏着语', yue:'黏著語', vi:'chắp dính', th:'ภาษาคำติดต่อ', id:'aglutinatif', hi:'श्लिष्टयोगात्मक', de:'agglutinierend', fr:'agglutinante', it:'agglutinante', es_eu:'aglutinante', es_mx:'aglutinante', pt_eu:'aglutinante', pt_br:'aglutinante', ru:'агглютинативный', uk:'аглютинативна', ar:'إلصاقية', he:'אגלוטינטיבית', sw:'iliyoambatishwa' },
            polysynthetic: { ja:'抱合語', ko:'포합어', zh:'复综语', yue:'複綜語', vi:'đa tổng hợp', th:'ภาษาประสาน', id:'polisintetik', hi:'बहुसंश्लिष्ट', de:'polysynthetisch', fr:'polysynthétique', it:'polisintetica', es_eu:'polisintética', es_mx:'polisintética', pt_eu:'polissintética', pt_br:'polissintética', ru:'полисинтетический', uk:'полісинтетична', ar:'متعدد التركيب', he:'פוליסינתטית', sw:'iliyoshikamana sana' },
        },
        script: {
            'Latin':    { ja:'ラテン文字', ko:'라틴 문자', zh:'拉丁字母', yue:'拉丁字母', vi:'Latin', th:'ละติน', id:'Latin', hi:'लैटिन', de:'Lateinisch', fr:'latin', it:'latino', es_eu:'latino', es_mx:'latino', pt_eu:'latino', pt_br:'latino', ru:'латиница', uk:'латиниця', ar:'لاتيني', he:'לטיני', sw:'Kilatini' },
            'Cyrillic': { ja:'キリル文字', ko:'키릴 문자', zh:'西里尔字母', yue:'西里爾字母', vi:'Kirin', th:'ซีริลลิก', id:'Sirilik', hi:'सिरिलिक', de:'Kyrillisch', fr:'cyrillique', it:'cirillico', es_eu:'cirílico', es_mx:'cirílico', pt_eu:'cirílico', pt_br:'cirílico', ru:'кириллица', uk:'кирилиця', ar:'سيريلي', he:'קירילי', sw:'Kisirili' },
            'Han':      { ja:'漢字', ko:'한자', zh:'汉字', yue:'漢字', vi:'chữ Hán', th:'อักษรจีน', id:'aksara Han', hi:'हान', de:'Han-Schrift', fr:'sinogrammes', it:'caratteri cinesi', es_eu:'caracteres chinos', es_mx:'caracteres chinos', pt_eu:'caracteres chineses', pt_br:'caracteres chineses', ru:'иероглифы (хань)', uk:'ієрогліфи (хань)', ar:'الخط الصيني', he:'סינית', sw:'Han' },
            'Kana':     { ja:'仮名', ko:'가나', zh:'假名', yue:'假名', vi:'kana', th:'คานะ', id:'kana', hi:'काना', de:'Kana', fr:'kanas', it:'kana', es_eu:'kana', es_mx:'kana', pt_eu:'kana', pt_br:'kana', ru:'кана', uk:'кана', ar:'كانا', he:'קאנה', sw:'Kana' },
            'Hangul':   { ja:'ハングル', ko:'한글', zh:'谚文', yue:'諺文', vi:'Hangul', th:'ฮันกึล', id:'Hangul', hi:'हंगुल', de:'Hangul', fr:'hangeul', it:'hangŭl', es_eu:'hangul', es_mx:'hangul', pt_eu:'hangul', pt_br:'hangul', ru:'хангыль', uk:'хангиль', ar:'هانغول', he:'האנגול', sw:'Hangul' },
            'Arabic-derived': { ja:'アラビア文字系', ko:'아랍 문자 계통', zh:'阿拉伯字母系', yue:'阿拉伯字母系', vi:'gốc Ả Rập', th:'ตระกูลอาหรับ', id:'turunan Arab', hi:'अरबी-व्युत्पन्न', de:'arabisch-basiert', fr:'dérivé arabe', it:'derivato arabo', es_eu:'derivado del árabe', es_mx:'derivado del árabe', pt_eu:'derivado do árabe', pt_br:'derivado do árabe', ru:'на основе арабицы', uk:'на основі арабиці', ar:'مشتق من العربية', he:'נגזר ערבי', sw:'asili ya Kiarabu' },
            'Brahmic':  { ja:'ブラーフミー系', ko:'브라흐미계', zh:'婆罗米系', yue:'婆羅米系', vi:'gốc Brāhmī', th:'ตระกูลพราหมี', id:'turunan Brahmi', hi:'ब्राह्मी-व्युत्पन्न', de:'brahmisch', fr:'brahmique', it:'brahmico', es_eu:'brahmí', es_mx:'brahmí', pt_eu:'bramica', pt_br:'bramica', ru:'брахмическое', uk:'брахмічне', ar:'برهمية', he:'בראהמית', sw:'asili ya Brahmi' },
            'Hebrew':   { ja:'ヘブライ文字', ko:'히브리 문자', zh:'希伯来字母', yue:'希伯來字母', vi:'Do Thái', th:'ฮีบรู', id:'Ibrani', hi:'हिब्रू', de:'Hebräisch', fr:'hébreu', it:'ebraico', es_eu:'hebreo', es_mx:'hebreo', pt_eu:'hebraico', pt_br:'hebraico', ru:'иврит', uk:'іврит', ar:'العبرية', he:'עברית', sw:'Kiebrania' },
            'Greek':    { ja:'ギリシア文字', ko:'그리스 문자', zh:'希腊字母', yue:'希臘字母', vi:'Hy Lạp', th:'กรีก', id:'Yunani', hi:'यूनानी', de:'Griechisch', fr:'grec', it:'greco', es_eu:'griego', es_mx:'griego', pt_eu:'grego', pt_br:'grego', ru:'греческий', uk:'грецький', ar:'يوناني', he:'יווני', sw:'Kigiriki' },
            'Armenian': { ja:'アルメニア文字', ko:'아르메니아 문자', zh:'亚美尼亚字母', yue:'亞美尼亞字母', vi:'Armenia', th:'อาร์เมเนีย', id:'Armenia', hi:'आर्मेनियाई', de:'Armenisch', fr:'arménien', it:'armeno', es_eu:'armenio', es_mx:'armenio', pt_eu:'arménio', pt_br:'armênio', ru:'армянский', uk:'вірменський', ar:'الأرمنية', he:'ארמנית', sw:'Kiarmenia' },
            'Georgian': { ja:'グルジア文字', ko:'조지아 문자', zh:'格鲁吉亚字母', yue:'格魯吉亞字母', vi:'Gruzia', th:'จอร์เจีย', id:'Georgia', hi:'जॉर्जियाई', de:'Georgisch', fr:'géorgien', it:'georgiano', es_eu:'georgiano', es_mx:'georgiano', pt_eu:'georgiano', pt_br:'georgiano', ru:'грузинский', uk:'грузинський', ar:'الجورجية', he:'גאורגית', sw:'Kijojia' },
            'Ethiopic': { ja:'エチオピア文字', ko:'에티오피아 문자', zh:'吉兹文', yue:'吉茲文', vi:'Ethiopia', th:'เอธิโอเปีย', id:'Etiopia', hi:'इथियोपियाई', de:'Äthiopisch', fr:'éthiopien', it:'etiopico', es_eu:'etíope', es_mx:'etíope', pt_eu:'etíope', pt_br:'etíope', ru:'эфиопский', uk:'ефіопський', ar:'الإثيوبية', he:'אתיופית', sw:'Kiethiopia' },
            'Coptic':   { ja:'コプト文字', ko:'콥트 문자', zh:'科普特字母', yue:'科普特字母', vi:'Copt', th:'คอปติก', id:'Koptik', hi:'कॉप्टिक', de:'Koptisch', fr:'copte', it:'copto', es_eu:'copto', es_mx:'copto', pt_eu:'copta', pt_br:'copta', ru:'коптский', uk:'коптський', ar:'القبطية', he:'קופטית', sw:'Kikopti' },
            'Cherokee': { ja:'チェロキー文字', ko:'체로키 문자', zh:'切罗基字母', yue:'切羅基字母', vi:'Cherokee', th:'เชอโรกี', id:'Cherokee', hi:'चेरोकी', de:'Cherokee', fr:'cherokee', it:'cherokee', es_eu:'cheroqui', es_mx:'cheroqui', pt_eu:'cheroqui', pt_br:'cheroqui', ru:'чероки', uk:'черокі', ar:'الشيروكية', he:"צ'ירוקי", sw:'Cherokee' },
            'Syriac':   { ja:'シリア文字', ko:'시리아 문자', zh:'叙利亚字母', yue:'敘利亞字母', vi:'Syriac', th:'ซีรียัค', id:'Suryani', hi:'सीरिएक', de:'Syrisch', fr:'syriaque', it:'siriaco', es_eu:'siríaco', es_mx:'siríaco', pt_eu:'siríaco', pt_br:'siríaco', ru:'сирийский', uk:'сирійський', ar:'السريانية', he:'סורית', sw:'Kisiria' },
            'Tifinagh': { ja:'ティフィナグ文字', ko:'티피나그 문자', zh:'提非纳文', yue:'提非納文', vi:'Tifinagh', th:'ทิฟินาฆ์', id:'Tifinagh', hi:'तिफिनाघ', de:'Tifinagh', fr:'tifinagh', it:'tifinagh', es_eu:'tifinagh', es_mx:'tifinagh', pt_eu:'tifinague', pt_br:'tifinague', ru:'тифинаг', uk:'тіфінаг', ar:'تيفيناغ', he:"תיפינא'", sw:'Tifinagh' },
            "N'Ko":     { ja:'ンコ文字', ko:'은코 문자', zh:'西非书面语', yue:'西非書面語', vi:"N'Ko", th:'เอ็นโก', id:"N'Ko", hi:"एन'को", de:"N'Ko", fr:"n'ko", it:"n'ko", es_eu:"n'ko", es_mx:"n'ko", pt_eu:"n'ko", pt_br:"n'ko", ru:'нко', uk:'нко', ar:'نكو', he:"נ'קו", sw:"N'Ko" },
            'Yi':       { ja:'イ文字', ko:'이 문자', zh:'彝文', yue:'彝文', vi:'chữ Di', th:'อี้', id:'Yi', hi:'यी', de:'Yi', fr:'yi', it:'yi', es_eu:'yi', es_mx:'yi', pt_eu:'yi', pt_br:'yi', ru:'ицзу', uk:'ицзу', ar:'يي', he:'יי', sw:'Yi' },
            'Canadian Aboriginal Syllabics': { ja:'カナダ先住民音節文字', ko:'캐나다 원주민 음절 문자', zh:'加拿大原住民音节文字', yue:'加拿大原住民音節文字', vi:'âm tiết bản địa Canada', th:'พยางค์อะบอริจินแคนาดา', id:'Suku Kata Aborigin Kanada', hi:'कनाडाई आदिवासी सिलेबिक्स', de:'Kanadische silbische Schrift', fr:'syllabaire autochtone canadien', it:'sillabico aborigeno canadese', es_eu:'silábico aborigen canadiense', es_mx:'silábico aborigen canadiense', pt_eu:'silábico aborígene canadense', pt_br:'silábico aborígene canadense', ru:'канадское слоговое письмо', uk:'канадське складове письмо', ar:'مقطعية السكان الأصليين الكنديين', he:'הברתי קנדי ילידי', sw:'Hijai za Wenyeji wa Kanada' },
            'Mongolian-derived': { ja:'モンゴル文字系', ko:'몽골 문자 계통', zh:'蒙古字母系', yue:'蒙古字母系', vi:'gốc Mông Cổ', th:'ตระกูลมองโกเลีย', id:'turunan Mongol', hi:'मंगोल-व्युत्पन्न', de:'mongolisch-basiert', fr:'dérivé mongol', it:'derivato mongolo', es_eu:'derivado del mongol', es_mx:'derivado del mongol', pt_eu:'derivado do mongol', pt_br:'derivado do mongol', ru:'на основе монгольского', uk:'на основі монгольського', ar:'مشتق من المنغولية', he:'נגזר מונגולי', sw:'asili ya Kimongolia' },
            'Cuneiform': { ja:'楔形文字', ko:'쐐기 문자', zh:'楔形文字', yue:'楔形文字', vi:'chữ hình nêm', th:'อักษรลิ่ม', id:'aksara paku', hi:'कीलाक्षर', de:'Keilschrift', fr:'cunéiforme', it:'cuneiforme', es_eu:'cuneiforme', es_mx:'cuneiforme', pt_eu:'cuneiforme', pt_br:'cuneiforme', ru:'клинопись', uk:'клинопис', ar:'مسماري', he:'יתדות', sw:'Kabari' },
            'Hieroglyphs': { ja:'象形文字', ko:'상형 문자', zh:'象形文字', yue:'象形文字', vi:'chữ tượng hình', th:'อักษรภาพ', id:'hieroglif', hi:'चित्रलिपि', de:'Hieroglyphen', fr:'hiéroglyphes', it:'geroglifici', es_eu:'jeroglíficos', es_mx:'jeroglíficos', pt_eu:'hieróglifos', pt_br:'hieróglifos', ru:'иероглифы', uk:'ієрогліфи', ar:'هيروغليفية', he:'הירוגליפים', sw:'Vibao vya Misri' },
            'Aegean syllabary': { ja:'エーゲ音節文字', ko:'에게 음절 문자', zh:'爱琴海音节文字', yue:'愛琴海音節文字', vi:'âm tiết Aegean', th:'พยางค์อีเจียน', id:'silabari Aegea', hi:'एजियन सिलेबरी', de:'ägäische Silbenschrift', fr:'syllabaire égéen', it:'sillabario egeo', es_eu:'silabario egeo', es_mx:'silabario egeo', pt_eu:'silabário egeu', pt_br:'silabário egeu', ru:'эгейское слоговое письмо', uk:'егейське складове письмо', ar:'مقطعية إيجية', he:'הברתי אגאי', sw:'Silabari ya Aegean' },
            'Mayan':    { ja:'マヤ文字', ko:'마야 문자', zh:'玛雅文字', yue:'瑪雅文字', vi:'chữ Maya', th:'อักษรมายา', id:'aksara Maya', hi:'मायन', de:'Maya-Schrift', fr:'écriture maya', it:'maya', es_eu:'maya', es_mx:'maya', pt_eu:'maia', pt_br:'maia', ru:'майя', uk:'майя', ar:'المايا', he:'מאיה', sw:'Kimaya' },
            'Old Turkic': { ja:'古代テュルク文字', ko:'고대 튀르크 문자', zh:'古突厥文', yue:'古突厥文', vi:'Turk cổ', th:'เติร์กโบราณ', id:'Turki Kuno', hi:'पुरानी तुर्की', de:'alttürkisch', fr:'vieux-turc', it:'antico turco', es_eu:'turco antiguo', es_mx:'turco antiguo', pt_eu:'turco antigo', pt_br:'turco antigo', ru:'древнетюркское', uk:'давньотюркське', ar:'التركية القديمة', he:'טורקית עתיקה', sw:'Kituruki cha Kale' },
            'Tangut':   { ja:'西夏文字', ko:'서하 문자', zh:'西夏文', yue:'西夏文', vi:'chữ Tây Hạ', th:'ตันกุต', id:'Tangut', hi:'तंगुत', de:'Tangutisch', fr:'tangoute', it:'tangut', es_eu:'tangut', es_mx:'tangut', pt_eu:'tangute', pt_br:'tangute', ru:'тангутское', uk:'тангутське', ar:'التانغوتية', he:'טאנגוטית', sw:'Kitangut' },
            'Aramaic-derived': { ja:'アラム文字系', ko:'아람 문자 계통', zh:'阿拉米字母系', yue:'阿拉米字母系', vi:'gốc Aram', th:'ตระกูลอราเมอิก', id:'turunan Aram', hi:'अरामी-व्युत्पन्न', de:'aramäisch-basiert', fr:'dérivé araméen', it:'derivato aramaico', es_eu:'derivado del arameo', es_mx:'derivado del arameo', pt_eu:'derivado do aramaico', pt_br:'derivado do aramaico', ru:'на основе арамейского', uk:'на основі арамейського', ar:'مشتق من الآرامية', he:'נגזר ארמי', sw:'asili ya Kiaramu' },
            'Other historical': { ja:'その他の古代文字', ko:'기타 고대 문자', zh:'其他历史文字', yue:'其他歷史文字', vi:'lịch sử khác', th:'อื่นๆ ในประวัติศาสตร์', id:'historis lainnya', hi:'अन्य ऐतिहासिक', de:'andere historische', fr:'autres historiques', it:'altri storici', es_eu:'otros históricos', es_mx:'otros históricos', pt_eu:'outros históricos', pt_br:'outros históricos', ru:'прочие исторические', uk:'інші історичні', ar:'تاريخية أخرى', he:'היסטורי אחר', sw:'kihistoria nyingine' },
            'Other':    { ja:'その他', ko:'기타', zh:'其他', yue:'其他', vi:'khác', th:'อื่นๆ', id:'lainnya', hi:'अन्य', de:'andere', fr:'autre', it:'altro', es_eu:'otros', es_mx:'otros', pt_eu:'outros', pt_br:'outros', ru:'прочие', uk:'інші', ar:'أخرى', he:'אחר', sw:'nyingine' },
        },
    };

    function getUiLang() {
        return (window.__langmap && window.__langmap.uiLang) || 'en';
    }
    function t(key, params) {
        const ui = getUiLang();
        const dict = FILTER_UI_TEXT[ui] || FILTER_UI_TEXT.en;
        let s = dict[key] || FILTER_UI_TEXT.en[key] || key;
        if (params) for (const k of Object.keys(params)) s = s.split('{' + k + '}').join(params[k]);
        return s;
    }
    // Translate a chip's display text. data-val stays in raw English (filter
    // logic depends on it); only the visible label is localized.
    function translateChipLabel(cat, val) {
        if (cat === 'tone') {
            return val === 'tonal' ? t('val_tonal') : t('val_non_tonal');
        }
        if (cat === 'wo') return val; // SVO/SOV/etc. — universal codes
        if (cat === 'speaker') {
            const ui = getUiLang();
            const dict = SPEAKER_TIER_LABELS[ui];
            return (dict && dict[val]) || val;
        }
        const ui = getUiLang();
        if (ui === 'en') return val;
        // Prefer the dedicated chip-labels table (covers script + morph).
        const chipDict = CHIP_LABELS[cat] && CHIP_LABELS[cat][val];
        if (chipDict && chipDict[ui]) return chipDict[ui];
        // Fall back to the meta translator (covers most family names).
        if (typeof window.translateMetaSmart === 'function') {
            try { return window.translateMetaSmart(val, ui); } catch (e) {}
        }
        return val;
    }

    const SECTIONS = [
        { key: 'family',  titleKey: 'title_family' },
        { key: 'script',  titleKey: 'title_script' },
        { key: 'wo',      titleKey: 'title_wo' },
        { key: 'tone',    titleKey: 'title_tone' },
        { key: 'morph',   titleKey: 'title_morph' },
        { key: 'speaker', titleKey: 'title_speaker' },
    ];

    // Sections with many values (e.g. ~67 families) get truncated to the top
    // entries on first render; the rest are revealed via a "もっと表示" toggle.
    const COLLAPSE_LIMITS = {
        family: 12,  // show top 12 by count, hide the long tail of small families
        script: 10,
    };

    function buildPanel() {
        const panel = document.createElement('div');
        panel.className = 'lf-panel';
        const values = enumerateValues();
        let html = `
            <div class="lf-panel-header">
                <span class="lf-panel-title">${t('title_filter')}</span>
                <div class="lf-actions">
                    <span class="lf-counter"></span>
                    <button class="lf-reset">${t('btn_clear')}</button>
                    <button type="button" class="lf-close" aria-label="${t('close')}" title="${t('close')}">×</button>
                </div>
            </div>
        `;
        // Speaker-tier categorization is meaningless for historical languages
        // (almost all extinct or with negligible/liturgical-only speakers),
        // so hide the entire section in historical mode.
        const histMode = !!(window.__langmap && window.__langmap.historical);
        // Historical-only: a century range slider. Shows only languages whose
        // attested span overlaps [from, to]. Placed first so it's prominent.
        if (histMode) {
            html += `
                <div class="lf-section lf-period-section" data-cat="period">
                    <div class="lf-section-title">
                        <span>${t('title_period')}</span>
                        <span class="lf-section-clear" data-cat="period" style="display:${periodActive() ? '' : 'none'}">${t('btn_clear')}</span>
                    </div>
                    <div class="lf-period-readout"><span class="lf-period-label">${fmtIdx(periodFilter.fromIdx)} – ${fmtIdx(periodFilter.toIdx)}</span></div>
                    <div class="lf-period-dual">
                        <div class="lf-period-track"></div>
                        <div class="lf-period-fill"></div>
                        <input type="range" class="lf-period-from" aria-label="${t('period_from')}" min="${PERIOD_MIN_IDX}" max="${PERIOD_MAX_IDX}" step="1" value="${periodFilter.fromIdx}">
                        <input type="range" class="lf-period-to" aria-label="${t('period_to')}" min="${PERIOD_MIN_IDX}" max="${PERIOD_MAX_IDX}" step="1" value="${periodFilter.toIdx}">
                    </div>
                </div>
            `;
        }
        for (const sec of SECTIONS) {
            if (sec.key === 'speaker' && histMode) continue;
            const items = values[sec.key];
            if (!items || !items.length) continue;
            const limit = COLLAPSE_LIMITS[sec.key];
            const collapsible = limit && items.length > limit;
            // chip is now a <button> for keyboard accessibility (per
            // wordmap-check-4.md §18.1). data-val is HTML-escaped to handle
            // family/script names with quotes/parens.
            const escAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
            const escText = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const renderChip = ([v, c], hidden) => {
                const label = translateChipLabel(sec.key, v);
                const cls = 'lf-chip' + (hidden ? ' lf-chip-hidden' : '') + (c === 0 ? ' lf-chip-disabled' : '');
                return `<button type="button" class="${cls}" data-cat="${escAttr(sec.key)}" data-val="${escAttr(v)}" aria-pressed="false"${c === 0 ? ' disabled' : ''}>
                    ${escText(label)}<span class="lf-chip-count" aria-hidden="true">${c}</span>
                </button>`;
            };
            const visibleHtml = (collapsible ? items.slice(0, limit) : items)
                .map(item => renderChip(item, false)).join('');
            const hiddenHtml = collapsible
                ? items.slice(limit).map(item => renderChip(item, true)).join('')
                : '';
            const remaining = collapsible ? items.length - limit : 0;
            const collapsedLabel = collapsible ? t('btn_show_more', { n: remaining }) : '';
            const expandedLabel = collapsible ? t('btn_collapse') : '';
            const moreToggle = collapsible
                ? `<span class="lf-chip-more" data-collapsed-label="${collapsedLabel}" data-expanded-label="${expandedLabel}">${collapsedLabel}</span>`
                : '';
            html += `
                <div class="lf-section" data-cat="${sec.key}">
                    <div class="lf-section-title">
                        <span>${t(sec.titleKey)}</span>
                        <span class="lf-section-clear" data-cat="${sec.key}" style="display:none">${t('btn_clear')}</span>
                    </div>
                    <div class="lf-chips">
                        ${visibleHtml}${hiddenHtml}${moreToggle}
                    </div>
                </div>
            `;
        }
        panel.innerHTML = html;
        return panel;
    }

    // ----- Init -----------------------------------------------------------

    // The filter needs structured meta (family/script/…) for every category.
    // wordmap.html lazy-loads it via loadMeta() — which now pulls the ~1 MB
    // wordmap_meta_lite.js, not the 19 MB wordmap_meta.js. Delegate to that same
    // loader so we don't double-download (this file used to inject its own
    // <script src="wordmap_meta.js">, racing wordmap.html's copy). Fall back to a
    // direct lite injection only if the page never exposed loadMeta.
    function ensureMeta() {
        if (window._wmMetaLoaded || (typeof META_I18N !== 'undefined')) {
            return Promise.resolve();
        }
        if (window.__langmap && typeof window.__langmap.loadMeta === 'function') {
            return window.__langmap.loadMeta().catch(() => {});
        }
        return new Promise((resolve) => {
            const prev = window._wmMetaResolve;
            window._wmMetaResolve = () => { if (prev) try { prev(); } catch(e) {} resolve(); };
            if (!document.querySelector('script[src*="wordmap_meta"]')) {
                const s = document.createElement('script');
                s.src = 'wordmap_meta_lite.js';
                document.head.appendChild(s);
            }
            const poll = setInterval(() => {
                if (window._wmMetaLoaded || typeof META_I18N !== 'undefined') {
                    clearInterval(poll); resolve();
                }
            }, 200);
        });
    }

    // Family-chip labels localize via meta_i18n_ext.js (window.translateMetaSmart).
    // The Han Map loads that file eagerly, but the Word Map lazy-loads it, so when
    // the filter panel first renders on a non-English UI the family names fall back
    // to English. Load the file on demand (reusing the page's own versioned loader
    // if it exposed one) so the family chips can be re-localized.
    let _metaI18nExtPromise = null;
    function ensureMetaI18n() {
        if (typeof window.translateMetaSmart === 'function') return Promise.resolve();
        if (_metaI18nExtPromise) return _metaI18nExtPromise;
        if (typeof window.loadMetaI18n === 'function') {
            _metaI18nExtPromise = Promise.resolve(window.loadMetaI18n());
            return _metaI18nExtPromise;
        }
        _metaI18nExtPromise = new Promise((resolve) => {
            const ver = (window.WM_ASSET_VERSION && window.WM_ASSET_VERSION.metaI18n);
            const s = document.createElement('script');
            s.src = 'meta_i18n_ext.js' + (ver ? '?v=' + ver : '');
            s.async = false;
            s.onload = s.onerror = () => resolve();
            document.head.appendChild(s);
        });
        return _metaI18nExtPromise;
    }

    function init() {
        // Hydrate filterState from the URL hash IMMEDIATELY — BEFORE the
        // LANG_DATA guard below. loadFilterFromHash() only reads the hash (no
        // meta / LANG_DATA needed), and this MUST run before app.js's first
        // updateHash() fires, otherwise getFilterHashParam() returns empty and
        // the f= param gets clobbered out of the URL on load (e.g. a shared
        // link with a position param triggers setView → moveend → updateHash
        // while wordmap_data.js is still loading and init() is deferred).
        // One-shot so a later retry can't re-read (and re-clear from) a hash
        // that a racing updateHash already stripped f= from.
        if (!_filterHydrated) { _filterHydrated = true; loadFilterFromHash(); }
        if (typeof LANG_DATA === 'undefined') return setTimeout(init, 200);
        injectStyles();

        const fab = document.createElement('button');
        fab.className = 'lf-fab';
        const fabIcon = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M7 12h10m-7 6h4"/></svg>';
        function renderFab() {
            const badgeText = fab.querySelector('.lf-badge')?.textContent || '0';
            const badgeShown = fab.querySelector('.lf-badge')?.style.display !== 'none';
            fab.innerHTML = `${fabIcon}<span class="lf-fab-label">${t('title_filter')}</span><span class="lf-badge" style="display:${badgeShown ? '' : 'none'}">${badgeText}</span>`;
        }
        renderFab();
        // Mount inside the existing top-left controls container so it stacks
        // naturally below the word selector and era switch (no overlap).
        const topLeft = document.querySelector('.top-left-controls');
        if (topLeft) topLeft.appendChild(fab);
        else         document.body.appendChild(fab);

        // Placeholder panel (shown while meta loads). Replaced after load.
        let panel = document.createElement('div');
        panel.className = 'lf-panel';
        function renderPlaceholder() {
            panel.innerHTML = `
                <div class="lf-panel-header">
                    <span class="lf-panel-title">${t('title_filter')}</span>
                    <div class="lf-actions">
                        <span class="lf-counter">${t('loading')}</span>
                        <button type="button" class="lf-close" aria-label="${t('close')}" title="${t('close')}">×</button>
                    </div>
                </div>
                <div style="padding:12px 0;color:#888;font-size:11px;text-align:center">
                    ${t('loading_data')}
                </div>
            `;
        }
        renderPlaceholder();
        document.body.appendChild(panel);

        // Always-on close handler (delegated on the panel, so it survives the
        // innerHTML swap when the real panel is built and works in every state).
        // Gives the user a reliable way to dismiss the panel even if a layout
        // glitch ever left it detached from the fab.
        panel.addEventListener('click', (e) => {
            if (e.target.closest('.lf-close')) panel.classList.remove('open');
        });

        // Position the panel just below the fab. Guard against a fab that
        // isn't laid out yet (rect all-zero, e.g. while the wordmap era-filter
        // shim is relocating it) — writing top:8px then would pin the panel to
        // the very top, over the button, and it would stay there (only resize
        // re-ran this) so the fab could no longer be clicked to close it.
        function positionPanel() {
            const r = fab.getBoundingClientRect();
            if (!r.height && !r.width) return;   // not laid out — keep last good top
            panel.style.top = (r.bottom + 8) + 'px';
        }
        positionPanel();
        window.addEventListener('resize', positionPanel);

        // Toggle panel visibility on fab click (works even before meta loads
        // — panel just shows the loading placeholder). Recompute the position
        // on every open from the fab's CURRENT rect, so layout shifts since the
        // last positionPanel() (fab relocation, row wrap, UI-language relabel)
        // can never leave the panel detached over the button.
        fab.addEventListener('click', () => {
            if (!panel.classList.contains('open')) positionPanel();
            panel.classList.toggle('open');
        });

        // Re-apply filter whenever new labels render (zoom/word/era change).
        // Safe to attach now; applyFilter is a no-op while no filters active.
        const mapEl = document.getElementById('map');
        const globeEl = document.getElementById('globe');
        const observer = new MutationObserver(() => applyFilter());
        if (mapEl) observer.observe(mapEl, { childList: true, subtree: true });
        if (globeEl) observer.observe(globeEl, { childList: true, subtree: true });

        // Once metadata is available, rebuild the panel with the real chips
        // and wire up interactions.
        let metaReady = false;
        let onUiChange = () => { renderFab(); renderPlaceholder(); };
        window.addEventListener('langmap:uichange', () => onUiChange());

        ensureMeta().then(() => {
            // Clear feature cache (placeholder may have polled before meta)
            _featCache.clear();
            metaReady = true;
            // (filterState was already hydrated from URL at init() top.)

            function rebuildPanel() {
                const built = buildPanel();
                panel.innerHTML = built.innerHTML;
                // Re-mark active chips based on current filterState
                panel.querySelectorAll('.lf-chip').forEach(chip => {
                    const cat = chip.dataset.cat;
                    const val = chip.dataset.val;
                    if (filterState[cat] && filterState[cat].has(val)) {
                        chip.classList.add('on');
                        chip.setAttribute('aria-pressed', 'true');
                    }
                });
                updatePeriodUI();   // position the dual-slider fill (no-op if absent)
                positionPanel();
            }
            rebuildPanel();

            // If the UI is non-English but the family translator hasn't loaded
            // yet (Word Map lazy-loads it), pull it in the background and rebuild
            // so the family chips switch from English to the localized names.
            function refreshFamilyI18n() {
                if (getUiLang() === 'en') return;
                // Each UI language now has its own translation slice
                // (meta_i18n/<ui>.js), so translateMetaSmart merely existing is
                // NOT enough — a UI switch needs the NEW slice. loadMetaI18n is
                // memoized per UI in wordmap.html, so this loads the current UI's
                // slice if new and is a no-op once present. Rebuild after so the
                // family chips switch from English to the localized names.
                const p = (typeof window.loadMetaI18n === 'function')
                    ? Promise.resolve(window.loadMetaI18n())
                    : ensureMetaI18n();
                p.then(() => { if (metaReady) rebuildPanel(); });
            }
            refreshFamilyI18n();

            // Swap the on-uichange handler to do a full panel rebuild
            onUiChange = () => { renderFab(); rebuildPanel(); refresh(); refreshFamilyI18n(); };

            // Era change → re-enumerate chip counts (chips themselves don't
            // change, but counts do; 0-count chips will become disabled).
            // Also clear any speaker filter when entering historical mode
            // since that section disappears (and would otherwise dim
            // every historical lang).
            window.addEventListener('langmap:erachange', (e) => {
                if (e.detail && e.detail.historical && filterState.speaker.size > 0) {
                    filterState.speaker.clear();
                }
                // The period range only applies to the historical map. Leaving
                // historical mode must clear it, or a leftover range would dim
                // the whole modern map (modern langs carry no meta.period).
                if (!(e.detail && e.detail.historical)) {
                    periodFilter.fromIdx = PERIOD_MIN_IDX;
                    periodFilter.toIdx = PERIOD_MAX_IDX;
                }
                rebuildPanel();
                refresh();
            });

            const badge = fab.querySelector('.lf-badge');

            function updateBadge() {
                const n = totalActiveFilters();
                if (n > 0) {
                    badge.textContent = n;
                    badge.style.display = '';
                    fab.classList.add('active');
                } else {
                    badge.style.display = 'none';
                    fab.classList.remove('active');
                }
            }

            function refresh() {
                applyFilter();
                updateBadge();
                syncHash();
                // Re-render map markers so the cell-group offsets recompute
                // with only ACTIVE labels competing (per user request).
                if (typeof window._refreshMarkers === 'function') {
                    try { window._refreshMarkers(); } catch (e) {}
                }
                // Recompute cross-category chip counts in-place (don't
                // rebuild the panel — that would lose show-more expanded
                // state and scroll position).
                const values = enumerateValues();
                const valuesByKey = {};
                for (const cat of Object.keys(values)) {
                    valuesByKey[cat] = new Map(values[cat]);
                }
                panel.querySelectorAll('.lf-chip').forEach(chip => {
                    const cat = chip.dataset.cat;
                    const val = chip.dataset.val;
                    if (!valuesByKey[cat]) return;
                    const c = valuesByKey[cat].get(val) || 0;
                    const countEl = chip.querySelector('.lf-chip-count');
                    if (countEl) countEl.textContent = c;
                    // Toggle disabled state based on the new count. Don't
                    // disable a chip that's already selected, even if
                    // count went to 0 (so the user can always toggle off).
                    const isOn = chip.classList.contains('on');
                    chip.classList.toggle('lf-chip-disabled', c === 0 && !isOn);
                });
                panel.querySelectorAll('.lf-section').forEach(sec => {
                    const cat = sec.dataset.cat;
                    const clearEl = sec.querySelector('.lf-section-clear');
                    if (!clearEl) return;
                    // 'period' isn't a Set in filterState — it's the range slider.
                    const active = cat === 'period'
                        ? periodActive()
                        : (filterState[cat] && filterState[cat].size > 0);
                    clearEl.style.display = active ? '' : 'none';
                });
            }
            // Reflect the period slider values/label into the DOM (used on
            // reset / section-clear; slider drag updates them directly).
            function updatePeriodUI() {
                const fromEl = panel.querySelector('.lf-period-from');
                const toEl = panel.querySelector('.lf-period-to');
                if (fromEl) fromEl.value = String(periodFilter.fromIdx);
                if (toEl) toEl.value = String(periodFilter.toIdx);
                const label = panel.querySelector('.lf-period-label');
                if (label) label.textContent = fmtIdx(periodFilter.fromIdx) + ' – ' + fmtIdx(periodFilter.toIdx);
                // Position the highlighted fill between the two thumbs.
                const fill = panel.querySelector('.lf-period-fill');
                if (fill) {
                    const span = PERIOD_MAX_IDX - PERIOD_MIN_IDX;
                    const a = (periodFilter.fromIdx - PERIOD_MIN_IDX) / span * 100;
                    const b = (periodFilter.toIdx - PERIOD_MIN_IDX) / span * 100;
                    fill.style.left = a + '%';
                    fill.style.width = Math.max(0, b - a) + '%';
                }
            }

            panel.addEventListener('click', (e) => {
                const chip = e.target.closest('.lf-chip');
                if (chip) {
                    if (chip.classList.contains('lf-chip-disabled')) return;
                    const cat = chip.dataset.cat;
                    const val = chip.dataset.val;
                    const on = !filterState[cat].has(val);
                    if (on) filterState[cat].add(val);
                    else    filterState[cat].delete(val);
                    chip.classList.toggle('on', on);
                    chip.setAttribute('aria-pressed', String(on));
                    refresh();
                    return;
                }
                const sectionClear = e.target.closest('.lf-section-clear');
                if (sectionClear) {
                    const cat = sectionClear.dataset.cat;
                    if (cat === 'period') {
                        periodFilter.fromIdx = PERIOD_MIN_IDX;
                        periodFilter.toIdx = PERIOD_MAX_IDX;
                        updatePeriodUI();
                    } else {
                        filterState[cat].clear();
                        panel.querySelectorAll(`.lf-chip[data-cat="${cat}"]`).forEach(c => {
                            c.classList.remove('on');
                            c.setAttribute('aria-pressed', 'false');
                        });
                    }
                    refresh();
                    return;
                }
                const reset = e.target.closest('.lf-reset');
                if (reset) {
                    for (const k of Object.keys(filterState)) filterState[k].clear();
                    periodFilter.fromIdx = PERIOD_MIN_IDX;
                    periodFilter.toIdx = PERIOD_MAX_IDX;
                    updatePeriodUI();
                    panel.querySelectorAll('.lf-chip.on').forEach(c => {
                        c.classList.remove('on');
                        c.setAttribute('aria-pressed', 'false');
                    });
                    refresh();
                    return;
                }
                const more = e.target.closest('.lf-chip-more');
                if (more) {
                    const sec = more.closest('.lf-section');
                    sec.classList.toggle('lf-expanded');
                    more.textContent = sec.classList.contains('lf-expanded')
                        ? more.dataset.expandedLabel
                        : more.dataset.collapsedLabel;
                }
            });

            // Period range sliders (delegated 'input' so it survives rebuilds).
            // Keep from ≤ to; live-update the readout and re-filter.
            panel.addEventListener('input', (e) => {
                const cl = e.target.classList;
                const isFrom = cl && cl.contains('lf-period-from');
                const isTo   = cl && cl.contains('lf-period-to');
                if (!isFrom && !isTo) return;
                const v = parseInt(e.target.value, 10);
                if (!Number.isFinite(v)) return;
                if (isFrom) periodFilter.fromIdx = Math.min(v, periodFilter.toIdx);
                else        periodFilter.toIdx   = Math.max(v, periodFilter.fromIdx);
                updatePeriodUI();
                refresh();
            });

            // Drag the middle (fill) to slide the whole range — from and to move
            // together, keeping their gap. Delegated pointerdown survives panel
            // rebuilds; move/up are bound on document for the duration of a drag.
            let periodDrag = null;
            function onPeriodDrag(e) {
                if (!periodDrag) return;
                const dIdx = Math.round((e.clientX - periodDrag.startX) / periodDrag.pxPerIdx);
                let nf = periodDrag.fromIdx + dIdx, nt = periodDrag.toIdx + dIdx;
                if (nf < PERIOD_MIN_IDX) { nf = PERIOD_MIN_IDX; nt = nf + periodDrag.width; }
                if (nt > PERIOD_MAX_IDX) { nt = PERIOD_MAX_IDX; nf = nt - periodDrag.width; }
                periodFilter.fromIdx = nf; periodFilter.toIdx = nt;
                updatePeriodUI();
                refresh();
            }
            function endPeriodDrag() {
                periodDrag = null;
                document.removeEventListener('pointermove', onPeriodDrag);
                document.removeEventListener('pointerup', endPeriodDrag);
            }
            panel.addEventListener('pointerdown', (e) => {
                if (!e.target.classList || !e.target.classList.contains('lf-period-fill')) return;
                const dual = e.target.closest('.lf-period-dual');
                if (!dual) return;
                const rect = dual.getBoundingClientRect();
                if (!rect.width) return;
                e.preventDefault();
                periodDrag = {
                    startX: e.clientX,
                    fromIdx: periodFilter.fromIdx,
                    toIdx: periodFilter.toIdx,
                    width: periodFilter.toIdx - periodFilter.fromIdx,
                    pxPerIdx: rect.width / (PERIOD_MAX_IDX - PERIOD_MIN_IDX),
                };
                document.addEventListener('pointermove', onPeriodDrag);
                document.addEventListener('pointerup', endPeriodDrag);
            });

            refresh();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
