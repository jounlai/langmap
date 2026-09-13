/**
 * lang_nicknames.js — the short, colloquial name a language is actually
 * called by, kept separate from its formal name in lang_names.js.
 *
 * Owner, 2026-09-13: 「地図やTシャツへの描画のためにはSinglishのような俗称・
 * 簡略化した名称もいいね。既存の正式名称とは別で、略称を追加してください。」
 *
 * The Word Map prints a label under every marker, thousands at a time, and the
 * goods hand-off prints one across a chest. "Singapore English" is the right
 * name for an atlas; "Singlish" is the right name for a T-shirt. Both are
 * true, so both are kept, and the reader picks.
 *
 *   lang_names.js      the formal name. The map's default. Never abbreviated.
 *   lang_nicknames.js  the nickname. Opt-in on the map, default on goods.
 *
 * THE RULES, because a nickname is easier to get wrong than a formal name:
 *
 * 1. **It must be a name people really use.** Singlish, Manglish, AAVE, PIE,
 *    Pahlavi, Wenyan, Fusha. NOT an abbreviation invented here to save space.
 *    If a language has no nickname, it has no entry and the formal name shows.
 *    A missing nickname costs nothing; an invented one is a wrong answer
 *    printed on a shirt.
 * 2. **Per UI language, and only where that language really uses it.** Japanese
 *    says シングリッシュ and German says Singlish; neither is a translation of
 *    the other, both are attested. Where a UI has no attested nickname the
 *    entry is simply absent for that UI and the formal name shows in its place
 *    — never the English nickname in a Russian sentence.
 * 3. **It must be unambiguous on a map with 1,187 pins.** A nickname may not
 *    equal another row's formal name, and no two rows may share one. Enforced
 *    by tools/lang_nickname_check.js, gated at 0.
 * 4. **No brackets**, same as the formal names (handoff item 92).
 * 5. **Not a slur, and not a claim the wearer cannot make.** Several varieties
 *    have a colloquial name used as an insult at least as often as a label;
 *    the test is whether speakers use it of themselves. Two softer failures
 *    count too: a name that belongs to one variety inside the row (Lallans
 *    excludes Doric and Insular Scots), and a name that denotes a
 *    RELATIONSHIP rather than a language (mame-loshn is 'a mother tongue', so
 *    printed alone it is a first-person claim, not a label).
 * 6. **It has to survive leaving the browser.** Rule 2's per-UI firewall is a
 *    property of the session; a printed object has no UI. Before keeping a
 *    nickname in one UI that transliterates a term rejected in another, ask
 *    what it says to a reader of the other language. アングロサクソン語 was kept
 *    for Japanese and then dropped on exactly this: asked what the shirt says,
 *    the answer is "Anglo-Saxon", in English, to an English reader.
 *
 * Sources for every entry: docs/lang-nickname-sources.md.
 * Consumed via lang_names/<ui>.js (built by tools/build_lang_names.js) and
 * received by lang_names_shim.js into window.LANG_NICKNAMES.
 */
const LANG_NICKNAMES = {
    en: {
        ar: "Fusha",
        ar_gulf: "Khaleeji",
        ar_ma: "Darija",
        cu: "OCS",
        en_aave: "AAVE",
        en_my: "Manglish",
        en_sg: "Singlish",
        en_wls: "Wenglish",
        fa: "Farsi",
        ht: "Kreyòl",
        hwc: "Hawaiian Pidgin",
        hy_grab: "Grabar",
        ja_oki: "Uchinaaguchi",
        jam: "Patwa",
        kaw: "Kawi",
        nds: "Plattdeutsch",
        p_ine: "PIE",
        pal: "Pahlavi",
        pcm: "Naijá",
    },
    ja: {
        ar: "フスハー",
        en_sg: "シングリッシュ",
        ja_mvi: "ミャークフツ",
        ja_oki: "うちなーぐち",
        pal: "パフラヴィー語",
        sa: "梵語",
        wuu: "上海語",
    },
};

if (typeof window !== 'undefined') window.LANG_NICKNAMES_SRC = LANG_NICKNAMES;
if (typeof module !== 'undefined' && module.exports) module.exports = LANG_NICKNAMES;
