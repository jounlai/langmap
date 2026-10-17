<?php
/**
 * seo/hanmap.php — renders a single Han Map language page or the index.
 */

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

/** @var string $seo_id */
/** @var string $seo_ui */
$seo_id = $seo_id ?? '';
$seo_ui = seo_ui_norm($seo_ui ?? 'en') ?? 'en';
$data = seo_data('hanmap');

if (empty($data['langs'])) {
    seo_404('Han Map data not built. Run: node tools/export_seo_data.js', $seo_ui);
    return;
}

if ($seo_id === '') {
    seo_render_hanmap_index($data, $seo_ui);
    return;
}

if (!isset($data['langs'][$seo_id])) {
    // A code this map no longer uses may have moved; the other map may
    // still use it, which is why this runs after the lookup, not before.
    if (seo_redirect_if_renamed('hanmap', $seo_id, $seo_ui)) return;
    seo_404("Unknown Han Map language: " . $seo_id, $seo_ui);
    return;
}

seo_render_hanmap_lang($data, $seo_id, $seo_ui);


/**
 * Readings of a few common characters for the search snippet ("山＝サン、
 * 水＝スイ …"). The snippet used to be the row's description alone, which for
 * Japanese opened mid-history on 漢音 and showed no reading at all.
 */
function seo_hanmap_samples(array $lang): array
{
    $out = [];
    foreach (['人', '山', '水', '心', '日', '月'] as $ch) {
        $r = $lang['readings'][$ch][0] ?? null;
        if (!$r) {
            continue;
        }
        $nat = trim((string) ($r['native'] ?? ''));
        $sur = trim((string) ($r['surface'] ?? ''));
        $read = ($nat !== '' && $nat !== $ch && !preg_match('/^[\x{4E00}-\x{9FFF}]+$/u', $nat)) ? $nat : $sur;
        if ($read === '' || preg_match('/^[\s\x{2014}\x{2013}\-?]*$/u', $read)) {
            continue;
        }
        $out[] = [$ch, $read];
        if (count($out) >= 4) {
            break;
        }
    }
    return $out;
}

function seo_render_hanmap_lang(array $data, string $code, string $ui): void
{
    $lang = $data['langs'][$code];
    $chars = $data['chars'];

    $name = seo_pick($lang['names'] ?? [], $ui) ?: ($lang['name'] ?? $code);
    $native = $lang['native'] ?? '';
    $desc = seo_pick($lang['description'] ?? [], $ui);
    $readingType = seo_pick($lang['readingType'] ?? [], $ui);

    $canonical = SEO_SITE . seo_path($ui, 'hanmap', $code);
    $altPath = '/hanmap/' . rawurlencode($code);
    $title = $name . ($native && $native !== $name ? " ($native)" : '')
        . ' — ' . seo_t($ui, 'hm_lang_title') . ' | Han Map';
    $metaDesc = seo_lang_meta_lead(
        seo_hanmap_samples($lang),
        $desc !== '' ? $desc : seo_t($ui, 'hm_lang_meta', ['name' => $name . ($native ? " ($native)" : '')]),
        $ui
    );

    seo_head([
        'title' => $title,
        'description' => $metaDesc,
        'canonical' => $canonical,
        'image' => SEO_SITE . '/ogp-tree.png',
        'ui' => $ui,
        'altpath' => $altPath,
    ]);
    ?>
<nav class="seo-crumbs" aria-label="<?= e(seo_t($ui, 'crumbs')) ?>"><a href="<?= e(seo_path($ui, 'hanmap')) ?>">Han Map</a> &rsaquo; <?= e($name) ?></nav>

<header class="seo-hero">
  <?php if ($native && $native !== $name): ?>
    <?php $nl = seo_lang_attr($code); ?>
    <?php if ($nl !== ''): ?>
    <p class="native" lang="<?= e($nl) ?>"><?= e($native) ?></p>
    <?php else: // Proto-* rows: Japanese labels (原始漢蔵語), pko adds a Korean one ?>
    <p class="native"><?php foreach (explode(' / ', (string) $native) as $i => $part): ?><?= $i ? ' / ' : '' ?><span lang="<?= preg_match('/\p{Hangul}/u', $part) ? 'ko' : 'ja' ?>"><?= e($part) ?></span><?php endforeach; ?></p>
    <?php endif; ?>
  <?php endif; ?>
  <h1><?= e($name) ?></h1>
  <?php if (!empty($lang['family'])): ?>
    <p class="sub"><?= e(seo_meta_value($ui, $lang['family'])) ?></p>
  <?php endif; ?>
</header>

<?php
    $chips = [];
    // Values, not just labels, are translated — see seo_meta_value().
    if (!empty($lang['family']))      $chips[seo_t($ui, 'family')]   = seo_meta_value($ui, $lang['family']);
    if (!empty($lang['speakers']))    $chips[seo_t($ui, 'speakers')] = seo_meta_value($ui, $lang['speakers']);
    if (!empty($lang['region']))      $chips[seo_t($ui, 'region')]   = seo_meta_value($ui, $lang['region']);
    if (!empty($lang['romanization']))$chips[seo_t($ui, 'romanization')] = $lang['romanization'];
    if ($readingType !== '')          $chips[seo_t($ui, 'reading')]  = $readingType;
    if ($chips): ?>
<div class="seo-meta">
  <?php foreach ($chips as $k => $v): ?>
    <span class="chip"><b><?= e($k) ?></b><?= e($v) ?></span>
  <?php endforeach; ?>
</div>
<?php endif; ?>

<?php if ($desc !== ''): ?>
<p class="seo-desc"><?= e($desc) ?></p>
<?php endif; ?>

<?php
    $lat = $lang['lat'] ?? null;
    $lng = $lang['lng'] ?? null;
    $embed = seo_map_embed(
        is_numeric($lat) ? (float) $lat : null,
        is_numeric($lng) ? (float) $lng : null,
        $name . ($native ? " ($native)" : ''),
        5,
        $ui
    );
    if ($embed !== ''):
?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, 'where')) ?></h2>
  <?= $embed ?>
</section>
<?php endif; ?>

<section class="seo-section">
  <h2 id="seo-chars-h"><?= e(seo_t($ui, 'chars_heading', ['name' => $name])) ?></h2>
<?php
    // The table is cut into ~30-row tables (whole characters, so rowspans
    // stay inside one table). Each table after the first sits in a
    // content-visibility wrapper and is laid out only near the viewport: the
    // single 190-row table was laid out at load (mobile TBT). Separate tables
    // cannot share auto column widths, so all use table-layout:fixed and one
    // colgroup whose widths come from the longest strings printed in them.
    $romLang = (function (string $t): string { return ($t === '' || $t === 'vi') ? '' : $t . '-Latn'; })(seo_lang_attr($code));
    $groups = []; $wLabel = 0; $wIpa = 0;
    foreach ($chars as $c) {
        $readings = $lang['readings'][$c['key']] ?? null;
        if (!$readings) continue;
        $readings = array_values(array_filter($readings, fn($r) =>
            ($r['surface'] ?? '') !== '' || ($r['ipa'] ?? '') !== '' || ($r['native'] ?? '') !== ''));
        if (!$readings) continue;
        $n = count($readings); $html = ''; $tall = 0;
        foreach ($readings as $i => $r) {
            $native = $r['native'] ?? ''; $surface = $r['surface'] ?? ''; $ipa = $r['ipa'] ?? ''; $label = $r['label'] ?? '';
            if ($native === $surface) $native = '';
            if ($native !== '') $tall++;
            if ($n > 1 && $label !== '') $wLabel = max($wLabel, mb_strwidth($label));
            if ($ipa !== '') $wIpa = max($wIpa, mb_strlen($ipa) + 2);
            $html .= '<tr' . ($i === 0 ? ' class="char-start"' : '') . '>';
            if ($i === 0) {
                $html .= '<td class="c-char" lang="zh" rowspan="' . $n . '">' . e($c['char']) . '</td>'
                       . '<td class="c-gloss" rowspan="' . $n . '">' . e($c['gloss'] ?? '') . '</td>';
            }
            $html .= '<td class="c-read">' . (($n > 1 && $label !== '') ? '<span class="rlabel">' . e($label) . '</span>' : '') . '</td>'
                   . '<td class="c-form" lang="' . e(seo_lang_attr($code)) . '">'
                   . ($native !== '' ? '<span class="c-native">' . e($native) . '</span>' : '')
                   . ($surface !== '' ? '<span class="c-rom"' . (($native !== '' && $romLang !== '') ? ' lang="' . e($romLang) . '"' : '') . '>' . e($surface) . '</span>' : '')
                   . '</td><td class="c-ipa">' . ($ipa !== '' ? '<bdi dir="ltr">/' . e($ipa) . '/</bdi>' : '') . '</td></tr>';
        }
        $groups[] = ['html' => $html, 'rows' => $n, 'tall' => $tall];
    }
    $chunks = []; $cur = []; $rows = 0;
    foreach ($groups as $g) {
        $cur[] = $g; $rows += $g['rows'];
        if ($rows >= 30) { $chunks[] = $cur; $cur = []; $rows = 0; }
    }
    if ($cur) $chunks[] = $cur;
    $th = [seo_t($ui, 'th_char'), seo_t($ui, 'th_gloss'), seo_t($ui, 'th_read'), seo_t($ui, 'th_form'), 'IPA'];
    $hdr = fn(string $s): float => mb_strwidth($s) * 0.5 + 1.7;          // .8rem caps + letter-spacing + padding
    $wC = max(4.2, $hdr($th[0]));
    $wR = max($hdr($th[2]), $wLabel ? $wLabel * 0.36 + 2.5 : 0);        // .68rem chip
    $wI = max($hdr($th[4]), min(14, $wIpa * 0.52 + 1.7));               // .9rem IPA
    $tw = $wC + $wR + $wI + 15;                                         // + gloss ~7rem + form >= 8rem
    $colgroup = sprintf('<colgroup><col style="width:%.1frem"><col class="c-gloss"><col style="width:%.1frem"><col><col style="width:%.1frem"></colgroup>', $wC, $wR, $wI);
    $thead = '<thead><tr>'
        . '<th class="c-char" scope="col">' . e($th[0]) . '</th><th class="c-gloss" scope="col">' . e($th[1]) . '</th>'
        . '<th class="c-read" scope="col">' . e($th[2]) . '</th><th class="c-form" scope="col">' . e($th[3]) . '</th>'
        . '<th class="c-ipa" scope="col">IPA</th></tr></thead>';
?>
  <div class="seo-chartable-wrap" tabindex="0" role="region" aria-labelledby="seo-chars-h" style="--tw:<?= sprintf('%.1f', $tw) ?>rem">
  <?php foreach ($chunks as $k => $ch):
      $body = implode('', array_column($ch, 'html'));
      $table = '<table class="seo-chartable">' . $colgroup . $thead . '<tbody>' . $body . '</tbody></table>';
      if ($k === 0): echo $table, "\n";
      else: ?>
  <div class="seo-chartable-chunk" style="--r:<?= array_sum(array_column($ch, 'rows')) ?>;--n:<?= array_sum(array_column($ch, 'tall')) ?>"><?= $table ?></div>
  <?php endif; endforeach; ?>
  </div>
</section>

<?php $sources = $lang['sources'] ?? []; if ($sources): ?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, 'sources')) ?></h2>
  <ul class="seo-sources">
    <?php foreach ($sources as $s):
        $st = $s['title'] ?? ''; $su = $s['url'] ?? '';
        if ($st === '') continue; ?>
      <li><?php if ($su): ?><a href="<?= e($su) ?>" rel="nofollow noopener"><?= e($st) ?></a><?php else: ?><?= e($st) ?><?php endif; ?></li>
    <?php endforeach; ?>
  </ul>
</section>
<?php endif; ?>

<div class="seo-applink">
  <a href="/hanmap.html#lang=<?= e(rawurlencode($code)) ?>"><?= e(seo_t($ui, 'open_app', ['name' => $name])) ?></a>
</div>
<?php
    $wm = seo_data('wordmap');
    seo_comparisons(
        'hanmap', $code, $ui,
        $wm, $data,
        $data['wordorder'][$code] ?? []
    );
    seo_related_links('hanmap', $code, $name, $data['langs'], $wm['langs'] ?? [], $ui);
    seo_foot($ui);
}


function seo_render_hanmap_index(array $data, string $ui): void
{
    $langs = $data['langs'];
    $rows = [];
    foreach ($langs as $code => $l) {
        $name = seo_pick($l['names'] ?? [], $ui) ?: ($l['name'] ?? $code);
        $rows[] = ['code' => $code, 'name' => $name];
    }
    usort($rows, fn($a, $b) => strcasecmp($a['name'], $b['name']));

    seo_head([
        'title' => seo_t($ui, 'hm_index_title', ['n' => (string) count($langs)]) . ' | LangMap',
        'description' => seo_t($ui, 'hm_index_desc', [
            'c' => (string) count($data['chars']),
            'n' => (string) count($langs),
        ]),
        'canonical' => SEO_SITE . seo_path($ui, 'hanmap'),
        'image' => SEO_SITE . '/ogp-tree.png',
        'ui' => $ui,
        'altpath' => '/hanmap/',
    ]);
    ?>
<nav class="seo-crumbs" aria-label="<?= e(seo_t($ui, 'crumbs')) ?>"><a href="<?= e(seo_path($ui, '')) ?>">LangMap</a> &rsaquo; Han Map</nav>
<header class="seo-hero">
  <h1>Han Map</h1>
  <p class="sub"><?= e(seo_t($ui, 'hm_index_sub', ['c' => (string) count($data['chars']), 'n' => (string) count($langs)])) ?></p>
</header>
<div class="seo-applink">
  <a href="/hanmap.html"><?= e(seo_t($ui, 'open_app_hm')) ?></a>
</div>
<p class="seo-crumbs"><?= e(seo_t($ui, 'see_also')) ?>: <a href="<?= e(seo_path($ui, 'wordmap')) ?>"><?= e(seo_t($ui, 'wm_link')) ?></a> · <a href="<?= e(seo_path($ui, 'trivia')) ?>"><?= e(seo_t($ui, 'tri_link')) ?></a> · <a href="<?= e(seo_path($ui, '')) ?>"><?= e(seo_t($ui, 'home')) ?></a></p>

<section class="seo-section">
  <h2><?= e(seo_t($ui, 'languages')) ?> (<?= count($rows) ?>)</h2>
  <ul class="seo-index-list">
    <?php foreach ($rows as $r): ?>
      <li><a href="<?= e(seo_path($ui, 'hanmap', $r['code'])) ?>"><?= e($r['name']) ?></a>
        <span class="code"><?= e($r['code']) ?></span></li>
    <?php endforeach; ?>
  </ul>
</section>
<?php
    seo_foot($ui);
}
