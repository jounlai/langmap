/* pv_calibrate.js — where do the fourteen known cases land, and where do the
 * rows that are SUPPOSED to look alike land? */
const { execSync } = require('child_process');
const fs = require('fs');

const DIR = process.argv[2] || './pv_snap/pre538/words';
const OUT = __dirname + '/pv_cal.json';
execSync(`node /home/jounlai/langmap-work/rally/r7/provenance_scan.js --words ${DIR} --top 0 --json ${OUT}`, { stdio: 'pipe' });
const J = JSON.parse(fs.readFileSync(OUT, 'utf8'));
const ranked = J.pairs;

const KNOWN = [
    ['cjy_lv', 'cjy'], ['cjy_xz', 'cjy'], ['zh_zz', 'zh_kf'], ['czh_wy', 'czh'],
    ['yue_zs', 'yue'], ['xpu', 'phn'], ['kxm', 'km'], ['blk', 'my'],
    ['qxs', 'cng'], ['ady', 'kbd'], ['xog', 'lg'], ['zdj', 'sw'], ['swb', 'sw'], ['yuy', 'mn'],
];
const CLEARED = [
    ['io', 'eo'], ['ady', 'kbd'], ['es', 'es_mx'], ['hi', 'ur'], ['ms', 'id'], ['bs', 'hr'],
    ['ksw', 'kyu'], ['ksw', 'pww'], ['pt', 'pt_br'], ['cs', 'sk'],
];
function find(a, b) {
    const i = ranked.findIndex(p => (p.a === a && p.b === b) || (p.a === b && p.b === a));
    return i < 0 ? null : { rank: i + 1, p: ranked[i] };
}
console.log(`scanned ${DIR}: ${ranked.length} scored pairs\n`);
console.log('KNOWN DEFECTS');
for (const [a, b] of KNOWN) {
    const f = find(a, b);
    console.log(`  ${(a + ' <- ' + b).padEnd(20)} ` +
        (f ? `rank ${String(f.rank).padStart(4)}  score ${f.p.score.toFixed(3)}  [${f.p.shapes.map(s => s.name).join(', ')}]`
            : 'NOT SCORED'));
}
console.log('\nMUST STAY CLEAR');
for (const [a, b] of CLEARED) {
    const f = find(a, b);
    console.log(`  ${(a + ' / ' + b).padEnd(20)} ` +
        (f ? `rank ${String(f.rank).padStart(4)}  score ${f.p.score.toFixed(3)}  [${f.p.shapes.map(s => s.name).join(', ')}]`
            : 'not scored (clear)'));
}
