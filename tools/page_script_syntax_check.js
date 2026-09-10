#!/usr/bin/env node
/**
 * page_script_syntax_check.js — every inline <script> in every page must parse.
 *
 * Written 2026-09-10, after `Uncaught SyntaxError: Identifier
 * 'UNATTESTED_LABEL' has already been declared` reached production. A block I
 * added for meta.unattestedReason reused a name a flat ui->string map 46 lines
 * below already had. A duplicate top-level `const` is not a runtime error that
 * degrades one feature — it is a parse error, so the ENTIRE script block never
 * executes and the page is dead. 72 data guards were green the whole time,
 * because not one of them had ever asked whether the JavaScript parses.
 *
 * Parsing is the check. `new vm.Script(src)` compiles without running, which
 * catches duplicate declarations, unbalanced braces and stray characters
 * without needing a DOM, a network or a browser. Blocks whose `type` is not
 * JavaScript (application/ld+json, importmap, text/template) are skipped, and
 * JSON ones are parsed as JSON instead.
 *
 * Usage: node tools/page_script_syntax_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')).sort();

// <script ...>…</script>, capturing the attributes and the body.
const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const JSON_TYPE = /application\/(ld\+)?json|importmap|speculationrules/i;
const JS_TYPE = /^(text\/javascript|application\/javascript|module|)$/i;

const errors = [];
let blocks = 0;
for (const page of pages) {
    // Strip HTML comments first. hanmap.html's own comments discuss "<script>
    // tag" in prose, and a scanner that does not skip them matches that as a
    // real block and reports a parse error inside a comment.
    const html = fs.readFileSync(path.join(ROOT, page), 'utf8')
        .replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, ' '));
    let m;
    SCRIPT_RE.lastIndex = 0;
    while ((m = SCRIPT_RE.exec(html))) {
        const [full, attrs, body] = m;
        if (/\bsrc\s*=/.test(attrs)) continue;            // external file, nothing inline
        if (!body.trim()) continue;
        const type = (attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i) || [, ''])[1];
        // Line number of the block's opening tag, for a clickable report.
        const line = html.slice(0, m.index).split('\n').length;
        blocks++;
        if (JSON_TYPE.test(type)) {
            try { JSON.parse(body); } catch (e) { errors.push({ page, line, type, msg: e.message }); }
            continue;
        }
        if (!JS_TYPE.test(type)) continue;                 // text/template and friends
        try {
            new vm.Script(body, { filename: `${page}:${line}` });
        } catch (e) {
            errors.push({ page, line, type: type || 'javascript', msg: e.message });
        }
    }
}

if (CHECK) {
    console.log(`inline script blocks that do not parse: ${errors.length}`);
    for (const e of errors) console.log(`  ${e.page}:${e.line}  ${e.msg}`);
    process.exit(0);
}
console.log(`inline script syntax — ${blocks} block(s) across ${pages.length} page(s)\n`);
if (!errors.length) { console.log('clean — every inline script parses.'); }
for (const e of errors) console.log(`  ${e.page}:${e.line}  [${e.type}]  ${e.msg}`);
