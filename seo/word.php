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
 * Every language that has this word, split into the biggest languages and
 * then the rest by part of the world.
 *
 * Grouping used to be by language family, which is the wrong axis for the
 * reader this page is for: "Atlantic-Congo" is not a category anyone outside
 * linguistics thinks in. Owner's call, 2026-09-22.
 *
 * Blank cells are skipped. An empty cell is a real answer on this atlas but
 * it is not a form, and a page whose title is a count must not count them.
 *
 * @return array{major:array,regions:array<string,array>,n:int}
 */
function seo_word_rows(array $data, string $id): array
{
    $rows = [];
    foreach ($data['langs'] as $code => $l) {
        if (!empty($l['excluded'])) {
            continue;                       // noindex'd rows stay off the page
        }
        $entry = $l['words'][$id] ?? null;
        if (!$entry) {
            continue;
        }
        $surface = (string) ($entry[0] ?? '');
        if ($surface === '' || preg_match('/^[\s\x{2014}\x{2013}\-?]*$/u', $surface)) {
            continue;
        }
        $rows[] = [
            'code'     => (string) $code,
            'names'    => $l['names'] ?? [],
            'fallback' => (string) ($l['name'] ?? $code),
            'surface'  => $surface,
            'ipa'      => (string) ($entry[1] ?? ''),
            'region'   => seo_world_region($l),
            'size'     => (int) ($l['meta']['speakerCount'] ?? 0),
        ];
    }
    $n = count($rows);

    // The biggest languages first, by the row's own published speaker figure.
    // SEO_WORD_MAJOR of them, and only ones that actually have a figure — 394
    // rows do not, and they are small or ancient, so they lose nothing here.
    usort($rows, fn($a, $b) => $b['size'] <=> $a['size']);
    $major = [];
    foreach ($rows as $r) {
        if ($r['size'] <= 0 || count($major) >= SEO_WORD_MAJOR) {
            break;
        }
        $major[] = $r;
    }
    $inMajor = array_flip(array_column($major, 'code'));

    $regions = [];
    foreach ($rows as $r) {
        if (isset($inMajor[$r['code']])) {
            continue;                       // shown above; not repeated
        }
        $regions[$r['region']][] = $r;
    }
    // Fixed display order, and inside a region the biggest languages first so
    // a reader meets Swahili before Sukuma.
    $ordered = [];
    foreach (SEO_REGION_ORDER as $k) {
        if (!empty($regions[$k])) {
            usort($regions[$k], fn($a, $b) => $b['size'] <=> $a['size']);
            $ordered[$k] = $regions[$k];
        }
    }
    return ['major' => $major, 'regions' => $ordered, 'n' => $n];
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
    /* One row of the grid. */
    $cell = function (array $x) use ($ui): void { ?>
    <div class="seo-word">
      <p class="label"><a href="<?= e(seo_path($ui, 'wordmap', $x['code'])) ?>"><?= e(seo_pick($x['names'], $ui) ?: $x['fallback']) ?></a></p>
      <p class="surface" lang="<?= e($x['code']) ?>"><?= e($x['surface']) ?></p>
      <?php if ($x['ipa'] !== ''): ?><p class="ipa"><?= e($x['ipa']) ?></p><?php endif; ?>
    </div>
<?php }; ?>

<?php if ($r['major']): ?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, 'wd_major')) ?></h2>
  <div class="seo-words">
    <?php foreach ($r['major'] as $x) $cell($x); ?>
  </div>
</section>
<?php endif; ?>

<?php /* The rest by part of the world, collapsed. The markup is all in the
         DOM — a crawler reads a closed <details> exactly as an open one — but
         a reader is not handed 1,045 entries in one column. */ ?>
<?php foreach ($r['regions'] as $key => $rows): ?>
<details class="seo-section seo-region">
  <summary><h2><?= e(seo_t($ui, 'wd_' . $key)) ?> <span class="sub">(<?= e((string) count($rows)) ?>)</span></h2></summary>
  <div class="seo-words">
    <?php foreach ($rows as $x) $cell($x); ?>
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
