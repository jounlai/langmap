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
function seo_word_rows(array $data, string $id): array
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
        if (!empty($l['excluded'])) {
            continue;
        }
        $entry = $l['words'][$id] ?? null;
        if (!$entry) {
            continue;
        }
        $surface = (string) ($entry[0] ?? '');
        if ($surface === '' || preg_match('/^[\s\x{2014}\x{2013}\-?]*$/u', $surface)) {
            continue;
        }
        $n++;
        $fam = trim(explode(' (', (string) ($l['meta']['family'] ?? ''))[0]);
        $g = ($fam === 'Sinitic') ? '__zh' : $root((string) $code);
        if (!isset($groups[$g])) {
            $anchor = ($g === '__zh') ? ($langs['zh'] ?? $l) : ($langs[$g] ?? $l);
            $groups[$g] = [
                'key'    => $g,
                'label'  => $g === '__zh' ? '' : (string) ($anchor['name'] ?? $g),
                'names'  => $g === '__zh' ? [] : ($anchor['names'] ?? []),
                'region' => seo_world_region($anchor),
                'size'   => 0,
                'forms'  => [],
            ];
        }
        $groups[$g]['size'] = max($groups[$g]['size'], (int) ($l['meta']['speakerCount'] ?? 0));
        $f = &$groups[$g]['forms'][$surface];
        if ($f === null) {
            $f = ['surface' => $surface, 'ipa' => (string) ($entry[1] ?? ''), 'members' => []];
        }
        $f['members'][] = [
            'code'     => (string) $code,
            'names'    => $l['names'] ?? [],
            'fallback' => (string) ($l['name'] ?? $code),
            'flag'     => seo_country_flag($l),
            'country'  => seo_country_name($l),
            'size'     => (int) ($l['meta']['speakerCount'] ?? 0),
        ];
        unset($f);
    }

    // Inside a group: the most-spoken form first, and inside a form the
    // most-spoken language first, so a reader meets French before Haitian.
    foreach ($groups as &$g) {
        foreach ($g['forms'] as &$f) {
            usort($f['members'], fn($a, $b) => $b['size'] <=> $a['size']);
        }
        unset($f);
        uasort($g['forms'], fn($a, $b) => $b['members'][0]['size'] <=> $a['members'][0]['size']);
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
    $regions = [];
    foreach (SEO_REGION_ORDER as $k) {
        if (!empty($rest[$k])) {
            $regions[$k] = $rest[$k];
        }
    }
    return ['major' => $major, 'regions' => $regions, 'n' => $n];
}


function seo_render_word(array $data, array $word, string $ui): void
{
    $id = (string) $word['id'];
    $label = seo_pick($word['label'] ?? [], $ui) ?: $id;
    $def = seo_pick($word['definition'] ?? [], $ui);

    $r = seo_word_rows($data, $id);
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
    /* Two shapes, because most of the atlas is one language saying one thing
       and it should not be dressed as a container with one item in it.

       SINGLE  the whole card is the link: flag + name, the form, the IPA.
       GROUP   the language name heads the card, then a line per distinct form
               carrying the flags of everyone who writes it that way.

       The group shape is what the reader came for: French water is eight
       varieties and one `eau`; Arabic water is twelve and six words. */
    $groupBlock = function (array $g) use ($ui): void {
        $label = $g['key'] === '__zh'
            ? seo_t($ui, 'wd_zh_group')
            : (seo_pick($g['names'], $ui) ?: $g['label']);
        $one = reset($g['forms']);
        if (count($g['forms']) === 1 && count($one['members']) === 1) {
            $m = $one['members'][0];
            $nm = seo_pick($m['names'], $ui) ?: $m['fallback'];
            echo '<a class="wcard is-single" href="' . e(seo_path($ui, 'wordmap', $m['code'])) . '">'
               . '<span class="wcard-lang">'
               . ($m['flag'] !== '' ? '<span class="flag" aria-hidden="true">' . $m['flag'] . '</span>' : '')
               . e($nm) . '</span>'
               . '<span class="surface" lang="' . e($m['code']) . '">' . e($one['surface']) . '</span>'
               . ($one['ipa'] !== '' ? '<span class="ipa">' . e($one['ipa']) . '</span>' : '')
               . "</a>\n";
            return;
        }
        echo '<article class="wcard"><h3 class="wcard-lang">' . e($label) . '</h3>';
        foreach ($g['forms'] as $f) {
            echo '<div class="wcard-form"><p class="surface" lang="' . e($f['members'][0]['code']) . '">'
               . e($f['surface']) . '</p>';
            if ($f['ipa'] !== '') {
                echo '<p class="ipa">' . e($f['ipa']) . '</p>';
            }
            echo '<p class="wcard-where">';
            foreach ($f['members'] as $m) {
                echo '<a href="' . e(seo_path($ui, 'wordmap', $m['code'])) . '">'
                   . ($m['flag'] !== '' ? '<span class="flag" aria-hidden="true">' . $m['flag'] . '</span>' : '')
                   . e(seo_pick($m['names'], $ui) ?: $m['fallback']) . '</a> ';
            }
            echo "</p></div>";
        }
        echo "</article>\n";
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
        $n = seo_word_rows($data, $wid)['n']; ?>
    <div class="seo-word">
      <p class="label"><a href="<?= e(seo_path($ui, 'word', $wid)) ?>"><?= e($wl) ?></a></p>
      <p class="ipa"><?= e(seo_t($ui, 'wd_forms', ['n' => (string) $n])) ?></p>
    </div>
    <?php endforeach; ?>
  </div>
</section>

<?php
    seo_foot($ui);
}
