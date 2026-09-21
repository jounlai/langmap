<?php
/**
 * seo/word.php — one page per WORD: "chocolate in 164 languages".
 *
 * The counterpart to wordmap.php, which does one page per LANGUAGE. Both read
 * the same data/wordmap_seo.json; this one slices it the other way.
 *
 * WHY IT EXISTS. The unit people share is the word, not the language. Every
 * time the owner posts "the word for chocolate across the map", the link had
 * nowhere to land but the interactive app — no crawlable text, and until
 * 2026-09-21 a deep link Facebook stripped on the way through. Search behaves
 * the same way: "chocolate in different languages" is a real query and
 * "Japanese word list" is not. 86 words x 19 UI languages.
 *
 * It also fixes a crawl problem sideways. The 1,188 language pages are
 * discoverable only by walking an index, and robots.txt deliberately does not
 * declare the big sitemap. Each word page links to every language that has the
 * word — so 86 pages now point at the whole language set from 86 directions.
 *
 * Called by the router with $seo_ui set and $seo_id = '' (index) or a word id.
 */

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

/** How many languages lead the page before the regional groups start.
 *  Declared up here and not beside the function that uses it: this file
 *  dispatches at the top level, so a const further down has not run yet. */
const SEO_WORD_MAJOR = 24;

/** @var string $seo_id */
/** @var string $seo_ui */
$seo_id = $seo_id ?? '';
$seo_ui = seo_ui_norm($seo_ui ?? 'en') ?? 'en';
$data = seo_data('wordmap');

if (empty($data['words'])) {
    seo_404('Word Map data not built. Run: node tools/export_seo_data.js', $seo_ui);
    return;
}

/** id => the word record, so a lookup does not scan the list. */
$byId = [];
foreach ($data['words'] as $w) {
    if (!empty($w['id'])) {
        $byId[$w['id']] = $w;
    }
}

if ($seo_id === '') {
    seo_render_word_index($data, $byId, $seo_ui);
    return;
}

if (!isset($byId[$seo_id])) {
    seo_404('Unknown word: ' . $seo_id, $seo_ui);
    return;
}

seo_render_word($data, $byId[$seo_id], $seo_ui);


/**
 * Every language that has this word, as GROUPS of related languages, split
 * into the biggest and then by part of the world.
 *
 * Three decisions shape this, all from the owner:
 *
 * 1. NOT BY FAMILY. "Atlantic-Congo" is the right axis for a linguist and
 *    means nothing to the reader this page is for. Geography does.
 * 2. VARIETIES TRAVEL WITH THEIR LANGUAGE. Canadian, Swiss and Belgian French
 *    belong beside French, not scattered down a list sorted by speaker count.
 *    parentCode gives that, resolved to the root.
 * 3. SAME FORM, ONE LINE. Inside a group, members that write the word
 *    identically merge into a single line carrying all their flags. French
 *    water is eight varieties and one `eau`; Arabic water is twelve and six
 *    different words. Sameness compresses, difference shows — which is the
 *    whole point of the page, and cuts the biggest pages roughly in half.
 *
 * Sinitic is forced into one group ("Chinese") at the owner's request. That
 * is a reader-facing simplification and NOT the atlas's position: Cantonese,
 * Wu and Min have their own rows and their own language pages, which is where
 * the linguistic account lives.
 *
 * Blank cells are skipped. An empty cell is a real answer here but it is not
 * a form, and a page whose title is a count must not count them.
 */
function seo_word_rows(array $data, string $id, string $ui = 'en'): array
{
    $langs = $data['langs'];
    $root = static function (string $c) use ($langs): string {
        $seen = [];
        while (!empty($langs[$c]['meta']['parentCode']) && !isset($seen[$c])) {
            $seen[$c] = true;
            $c = (string) $langs[$c]['meta']['parentCode'];
        }
        return $c;
    };

    $groups = [];
    $n = 0;
    foreach ($langs as $code => $l) {
        // `excluded` is NOT a quality flag. It means "hidden from the modern
        // map, shown under the Historical toggle" — EXCLUDED_CODES in
        // wordmap.html — and skipping it here dropped 141 languages from
        // every word page: Latin aqua, Sumerian 𒀀, Gothic 𐍅𐌰𐍄𐍉,
        // Proto-Indo-European *wódr̥. It also left the 古代語 section with
        // five obscure survivors, which is how it was noticed. They are kept
        // and land in that section via meta.period, which is exactly the
        // separation the historical toggle makes on the map.
        //
        // This does not index them: their own language pages stay noindex and
        // out of the sitemap. It only stops a word page pretending they do
        // not exist.
        $entry = $l['words'][$id] ?? null;
        if (!$entry) {
            continue;
        }
        $surface = (string) ($entry[0] ?? '');
        if ($surface === '' || preg_match('/^[\s\x{2014}\x{2013}\-?]*$/u', $surface)) {
            continue;
        }
        $n++;
        // Sinitic is written two ways in this data — "Sinitic (Yue)" on 51
        // rows and "Sino-Tibetan (Sinitic, Yue, Yuehai)" on 12 — so cutting
        // at the first bracket and comparing to 'Sinitic' missed a dozen of
        // them, and 衡陽湘語, 漳州閩南語 and 中山白話 each got a card of their
        // own outside the Chinese group. Reported 2026-09-22. Match the word
        // wherever it sits.
        $famRaw = (string) ($l['meta']['family'] ?? '');
        $g = preg_match('/\bSinitic\b/', $famRaw) ? '__zh' : $root((string) $code);
        if (!isset($groups[$g])) {
            $anchor = ($g === '__zh') ? ($langs['zh'] ?? $l) : ($langs[$g] ?? $l);
            $groups[$g] = [
                'key'    => $g,
                'label'  => $g === '__zh' ? '' : (string) ($anchor['name'] ?? $g),
                'names'  => $g === '__zh' ? [] : ($anchor['names'] ?? []),
                'region' => seo_world_region($anchor),
                'country'=> seo_country_label($ui, $anchor),
                'flag'   => seo_country_flag_img($anchor),
                'size'   => 0,
                'forms'  => [],
            ];
        }
        $groups[$g]['size'] = max($groups[$g]['size'], (int) ($l['meta']['speakerCount'] ?? 0));
        // Keyed on spelling AND sound. Spelling alone was wrong and hid the
        // best fact on the page: 45 Sinitic lects write water 水 and say it 35
        // different ways, and the first cut of this collapsed all 45 into one
        // line. Reported from a PC, 2026-09-22.
        $ipa = (string) ($entry[1] ?? '');
        $f = &$groups[$g]['forms'][$surface . "\x00" . $ipa];
        if ($f === null) {
            $f = ['surface' => $surface, 'ipa' => $ipa, 'members' => []];
        }
        $f['members'][] = [
            'code'     => (string) $code,
            'names'    => $l['names'] ?? [],
            'fallback' => (string) ($l['name'] ?? $code),
            'flag'     => seo_country_flag_img($l),
            'country'  => seo_country_label($ui, $l),
            'bcp47'    => seo_bcp47((string) $code, $l),
            'size'     => (int) ($l['meta']['speakerCount'] ?? 0),
        ];
        unset($f);
    }

    // Inside a group: the most-spoken form first, and inside a form the
    // most-spoken language first, so a reader meets French before Haitian.
    foreach ($groups as &$g) {
        // Biggest first, then by name. The tiebreak matters more than it
        // looks: 253 rows publish no speaker figure at all, so without it a
        // quarter of the atlas sits in whatever order the data file happens
        // to use, which reads as unsorted.
        $bySize = static fn(array $a, array $b): int =>
            ($b['size'] <=> $a['size']) ?: strcoll($a['fallback'], $b['fallback']);
        foreach ($g['forms'] as &$f) {
            usort($f['members'], $bySize);
        }
        unset($f);
        uasort($g['forms'], static fn(array $a, array $b): int =>
            ($b['members'][0]['size'] <=> $a['members'][0]['size'])
            ?: strcoll($a['members'][0]['fallback'], $b['members'][0]['fallback']));
    }
    unset($g);

    // Fold the flat spelling+sound list into two levels: a spelling, and the
        // readings under it. Reported 2026-09-22 — the Arabic star card
        // announced 「2通りの綴り」 and then printed نجم three times in a row,
        // once per pronunciation, because the list was flat.
    foreach ($groups as &$g) {
        $sp = [];
        foreach ($g['forms'] as $f) {
            $k = $f['surface'];
            if (!isset($sp[$k])) {
                $sp[$k] = ['surface' => $k, 'reads' => [], 'size' => 0];
            }
            $sp[$k]['reads'][] = ['ipa' => $f['ipa'], 'members' => $f['members']];
            $sp[$k]['size'] = max($sp[$k]['size'], $f['members'][0]['size']);
        }
        uasort($sp, static fn(array $a, array $b): int =>
            ($b['size'] <=> $a['size'])
            ?: strcoll($a['reads'][0]['members'][0]['fallback'], $b['reads'][0]['members'][0]['fallback']));
        $g['spellings'] = $sp;
    }
    unset($g);

    uasort($groups, fn($a, $b) => $b['size'] <=> $a['size']);
    $major = [];
    $rest = [];
    foreach ($groups as $k => $g) {
        if ($g['size'] > 0 && count($major) < SEO_WORD_MAJOR) {
            $major[$k] = $g;
        } else {
            $rest[$g['region']][$k] = $g;
        }
    }
    // Inside a region, sort by country first so the languages of one place sit
    // together — all of China, then all of India — and only then by size.
    // Asked for after reading a region that jumped country every line.
    $regions = [];
    foreach (SEO_REGION_ORDER as $k) {
        if (empty($rest[$k])) {
            continue;
        }
        uasort($rest[$k], static function (array $a, array $b): int {
            // A group with no country ("Worldwide", the constructed languages)
            // goes last rather than sorting under an empty string.
            $ac = $a['country'] === '' ? 1 : 0;
            $bc = $b['country'] === '' ? 1 : 0;
            return $ac <=> $bc
                ?: strcoll($a['country'], $b['country'])
                ?: ($b['size'] <=> $a['size']);
        });
        $regions[$k] = $rest[$k];
    }
    return ['major' => $major, 'regions' => $regions, 'n' => $n];
}


function seo_render_word(array $data, array $word, string $ui): void
{
    $id = (string) $word['id'];
    $label = seo_pick($word['label'] ?? [], $ui) ?: $id;
    $def = seo_pick($word['definition'] ?? [], $ui);

    $r = seo_word_rows($data, $id, $ui);
    $nStr = (string) $r['n'];

    $canonical = SEO_SITE . seo_path($ui, 'word', $id);
    $altPath = '/word/' . rawurlencode($id);

    seo_head([
        'title'       => seo_t($ui, 'wd_title', ['name' => $label, 'n' => $nStr]) . ' | Word Map',
        'description' => $def !== '' ? $def : seo_t($ui, 'wd_meta', ['name' => $label, 'n' => $nStr]),
        'canonical'   => $canonical,
        'image'       => SEO_SITE . '/ogp-wordmap.png',
        'ui'          => $ui,
        'altpath'     => $altPath,
    ]);
    ?>
<nav class="seo-crumbs"><a href="<?= e(seo_path($ui, 'word')) ?>"><?= e(seo_t($ui, 'wd_link')) ?></a> &rsaquo; <?= e($label) ?></nav>

<header class="seo-hero">
  <h1><?= e(seo_t($ui, 'wd_title', ['name' => $label, 'n' => $nStr])) ?></h1>
  <p class="sub"><?= e(seo_t($ui, 'wd_forms', ['n' => $nStr])) ?></p>
</header>

<?php if ($def !== ''): ?>
<p class="seo-desc"><?= e($def) ?></p>
<?php endif; ?>

<div class="seo-applink">
  <?php /* ?w= and not #w=: a fragment never reaches the server, and Facebook
           replaced it with the page's og:url, so every shared word opened the
           default one. See the note in wordmap.html's head. */ ?>
  <a href="/wordmap.html?w=<?= e(rawurlencode($id)) ?>"><?= e(seo_t($ui, 'wd_open_app', ['name' => $label])) ?></a>
</div>

<?php
    /* A card leads with the biggest member's form and sound, then says in one
       line what the rest of the group does, and only unfolds if asked.

       Three things were wrong with the first attempt, all found on a PC:
       flag-plus-name repeated down a long row, the 35 Chinese readings of 水
       collapsed into one line, and a grid full of holes.

       So the variation is now the HEADLINE rather than a list. A group whose
       members all agree says "said the same in 8 places"; one that does not
       says "35 readings of the same spelling", which is the interesting case
       and was previously invisible. Either way the card is three lines tall
       until the reader opens it, so the grid packs.

       No flag emoji. They were asked for and tried, and they do not render on
       the owner's PC — a row of tofu is worse than no decoration. Country
       names carry it instead, inside the fold, where they always render. */
    $groupBlock = function (array $g) use ($ui): void {
        $label = $g['key'] === '__zh'
            ? seo_t($ui, 'wd_zh_group')
            : (seo_pick($g['names'], $ui) ?: $g['label']);
        $lead = reset($g['forms']);
        $lm = $lead['members'][0];
        $members = 0;
        foreach ($g['forms'] as $f) { $members += count($f['members']); }
        $readings = count($g['forms']);

        // A one-member group is most of the atlas. Its heading IS its only
        // language, so the heading carries the link and there is no list
        // underneath — printing the name twice was the first thing that
        // looked wrong on screen.
        // The heading carries the flag of the group's anchor. On a one-member
        // card that is simply its country; on a group it is the language's
        // home, and the members' own flags appear inside the fold.
        $head = ($g['flag'] ?? '') . ($members === 1
            ? '<a href="' . e(seo_path($ui, 'wordmap', $lm['code'])) . '">' . e($label) . '</a>'
            : e($label));
        echo '<article class="wcard"><h3 class="wcard-lang">' . $head . '</h3>'
           . '<p class="surface"' . ($lm['bcp47'] !== '' ? ' lang="' . e($lm['bcp47']) . '"' : '')
             . '>' . e($lead['surface']) . '</p>'
           . ($lead['ipa'] !== '' ? '<p class="ipa">/' . e($lead['ipa']) . '/</p>' : '');

        if ($members === 1) {
            echo '</article>' . "\n";
            return;
        }

        // Three different facts, and saying the wrong one is a lie the reader
        // can see. Arabic water is five SPELLINGS and eight spelling+sound
        // pairs, and the first cut announced "8 readings of the same
        // spelling" over a card whose spellings plainly differ.
        $spellings = count(array_unique(array_map(
            static fn(array $f): string => $f['surface'], $g['forms'])));
        if ($readings === 1) {
            $summary = seo_t($ui, 'wd_same_in', ['n' => (string) $members]);
        } elseif ($spellings === 1) {
            $summary = seo_t($ui, 'wd_readings', ['n' => (string) $readings]);
        } else {
            $summary = seo_t($ui, 'wd_forms_n', ['n' => (string) $spellings]);
        }
        echo '<details class="wcard-more"><summary>' . e($summary) . '</summary><div>';
        // When the whole group shares one spelling, that spelling is already
        // the big line at the top of the card and repeating it above every
        // reading is noise — 「同じ表記で35通りの読み」 followed by 水 thirty-five
        // times. Print it only when there is more than one. Reported
        // 2026-09-22, right after the same fault was fixed one level up.
        $oneSpelling = count($g['spellings']) === 1;
        foreach ($g['spellings'] as $sp) {
            $b = $sp['reads'][0]['members'][0]['bcp47'];
            echo '<div class="wcard-form' . ($oneSpelling ? '' : ' is-multi') . '">';
            if (!$oneSpelling) {
                echo '<p class="surface"' . ($b !== '' ? ' lang="' . e($b) . '"' : '')
                   . '>' . e($sp['surface']) . '</p>';
            }
            foreach ($sp['reads'] as $rd) {
                // The spelling is printed once; each reading under it is just
                // its sound and who says it.
                echo '<div class="wcard-read">'
                   . ($rd['ipa'] !== '' ? '<p class="ipa">/' . e($rd['ipa']) . '/</p>' : '')
                   . '<p class="wcard-where">';
                foreach ($rd['members'] as $m) {
                    echo '<a href="' . e(seo_path($ui, 'wordmap', $m['code'])) . '"'
                       . ($m['country'] !== '' ? ' title="' . e($m['country']) . '"' : '') . '>'
                       . $m['flag'] . e(seo_pick($m['names'], $ui) ?: $m['fallback']) . '</a> ';
                }
                echo '</p></div>';
            }
            echo '</div>';
        }
        echo '</div></details></article>' . "\n";
    };
?>

<?php if ($r['major']): ?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, 'wd_major')) ?></h2>
  <div class="wgrid">
    <?php foreach ($r['major'] as $g) $groupBlock($g); ?>
  </div>
</section>
<?php endif; ?>

<?php /* The rest by part of the world, collapsed. All of it stays in the DOM —
         a crawler reads a closed <details> exactly as an open one — but a
         reader is not handed a thousand entries in one column. */ ?>
<?php foreach ($r['regions'] as $key => $gs): ?>
<details class="seo-section seo-region">
  <summary><h2><?= e(seo_t($ui, 'wd_' . $key)) ?> <span class="sub">(<?= e((string) count($gs)) ?>)</span></h2></summary>
  <div class="wgrid">
    <?php foreach ($gs as $g) $groupBlock($g); ?>
  </div>
</details>
<?php endforeach; ?>

<nav class="seo-section">
  <h2><?= e(seo_t($ui, 'wd_index_h1', ['w' => (string) count($data['words'])])) ?></h2>
  <p class="seo-otherwords">
    <?php foreach ($data['words'] as $w):
        $wid = (string) ($w['id'] ?? '');
        if ($wid === '' || $wid === $id) continue;
        $wl = seo_pick($w['label'] ?? [], $ui) ?: $wid; ?>
      <a href="<?= e(seo_path($ui, 'word', $wid)) ?>"><?= e($wl) ?></a>
    <?php endforeach; ?>
  </p>
</nav>

<?php
    seo_foot($ui);
}


function seo_render_word_index(array $data, array $byId, string $ui): void
{
    $wc = (string) count($data['words']);
    seo_head([
        'title'       => seo_t($ui, 'wd_index_h1', ['w' => $wc]) . ' | Word Map',
        'description' => seo_t($ui, 'wd_index_meta', ['w' => $wc]),
        'canonical'   => SEO_SITE . seo_path($ui, 'word'),
        'image'       => SEO_SITE . '/ogp-wordmap.png',
        'ui'          => $ui,
        'altpath'     => '/word/',
    ]);
    ?>
<header class="seo-hero">
  <h1><?= e(seo_t($ui, 'wd_index_h1', ['w' => $wc])) ?></h1>
  <p class="sub"><?= e(seo_t($ui, 'wd_index_meta', ['w' => $wc])) ?></p>
</header>

<section class="seo-section">
  <div class="seo-words">
    <?php foreach ($data['words'] as $w):
        $wid = (string) ($w['id'] ?? '');
        if ($wid === '') continue;
        $wl = seo_pick($w['label'] ?? [], $ui) ?: $wid;
        $n = seo_word_rows($data, $wid, $ui)['n']; ?>
    <div class="seo-word widx">
      <?php /* The word is the thing you click, so it is the big line. It used
               to borrow .label (0.8rem, grey, uppercase) while the language
               count borrowed .ipa (1.1rem, accent) — the target was the
               smallest text on its own card. Caught in the persona review. */ ?>
      <p class="widx-word"><a href="<?= e(seo_path($ui, 'word', $wid)) ?>"><?= e($wl) ?></a></p>
      <p class="widx-count"><?= e(seo_t($ui, 'wd_forms', ['n' => (string) $n])) ?></p>
    </div>
    <?php endforeach; ?>
  </div>
</section>

<?php
    seo_foot($ui);
}
