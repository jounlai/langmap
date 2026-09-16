#!/usr/bin/env node
/*
 * inline_call_target_check.js — every function a page calls must exist.
 *
 * Written 2026-09-16, after the Han Map spent two days rendering a blank map
 * in production. `hanmapStripChineseWrapper()` had been deleted with the
 * HAN_SHORT_NAMES table it sat next to; its one call site survived, so
 * getDisplayName() threw ReferenceError on the first Sinitic code of every
 * render, and an empty `catch (_) {}` around updateMarkers() ate the throw.
 * Nothing in the console, nothing on the map.
 *
 * `inline page scripts parse` did not catch it: a call to a function that does
 * not exist is perfectly valid syntax. Parsing proves the file is JavaScript,
 * not that it works. This checks the next layer down — that every bare
 * identifier called as a function is declared somewhere in the same page, or
 * is a known global.
 *
 * Deliberately narrow, because the alternative is a linter and a fight with
 * false positives:
 *   - only BARE calls, `foo(` — never `obj.foo(`, which needs types to judge
 *   - only pages, since that is where the inline script lives
 *   - an allowlist for browser and library globals
 * It cannot see a misspelled property or a wrong argument. It can see the one
 * thing that actually happened.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PAGES = ['wordmap.html', 'hanmap.html', 'index.html', 'tree.html', 'namemap.html'];

/* Globals the pages legitimately call: the browser, Leaflet, globe.gl,
 * analytics, and the handful of cross-file helpers each page loads. */
const KNOWN = new Set([
    // language + browser
    'require', 'eval', 'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'String',
    'Number', 'Boolean', 'Array', 'Object', 'Date', 'Math', 'JSON', 'RegExp',
    'Error', 'TypeError', 'Promise', 'Set', 'Map', 'WeakMap', 'Symbol', 'BigInt',
    'fetch', 'alert', 'confirm', 'prompt', 'setTimeout', 'setInterval',
    'clearTimeout', 'clearInterval', 'requestAnimationFrame',
    'cancelAnimationFrame', 'requestIdleCallback', 'queueMicrotask',
    'encodeURIComponent', 'decodeURIComponent', 'encodeURI', 'decodeURI',
    'getComputedStyle', 'matchMedia', 'structuredClone', 'btoa', 'atob',
    'URL', 'URLSearchParams', 'Blob', 'File', 'FileReader', 'FormData',
    'Image', 'Audio', 'Intl', 'CustomEvent', 'Event', 'MouseEvent',
    'KeyboardEvent', 'IntersectionObserver', 'MutationObserver',
    'ResizeObserver', 'AbortController', 'TextEncoder', 'TextDecoder',
    'scrollTo', 'open', 'close', 'print', 'focus', 'blur', 'postMessage',
    // libraries the pages load from CDN or locally
    'L', 'Globe', 'gtag', 'dataLayer', 'html2canvas', 'JSZip',
]);

/* Declarations that make a name callable inside the page. */
function declaredNames(src) {
    const out = new Set();
    const add = (re, g = 1) => {
        let m;
        while ((m = re.exec(src))) out.add(m[g]);
    };
    add(/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g);
    // Any binding, not only the ones that obviously hold a function:
    // `const random = rng || Math.random` is called as random().
    add(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/g);
    // destructuring: const { a, b } = …   const [ a, b ] = …
    add(/\b(?:const|let|var)\s*[{[]([^}\]]*)[}\]]\s*=/g, 1);
    add(/\bclass\s+([A-Za-z_$][\w$]*)/g);
    // window.foo = …  and  window.foo ||= …  — the cross-file handshake
    add(/\bwindow\.([A-Za-z_$][\w$]*)\s*=/g);
    // function parameters and catch bindings can shadow; treat every
    // identifier that appears as a parameter as declared, which costs recall
    // but keeps the false-positive rate at zero.
    add(/\bfunction\s*[A-Za-z_$\w]*\s*\(([^)]*)\)/g, 1);
    // arrow params: (a, b) => …  and  a => …
    add(/\(([^()]*)\)\s*=>/g, 1);
    add(/(?:^|[^.\w$])([A-Za-z_$][\w$]*)\s*=>/g, 1);
    const expanded = new Set();
    for (const n of out) {
        for (const part of String(n).split(',')) {
            const t = part.trim().replace(/[=:].*$/, '').replace(/^\.\.\./, '').trim();
            if (/^[A-Za-z_$][\w$]*$/.test(t)) expanded.add(t);
        }
    }
    return expanded;
}

/* Comments and string literals, removed before anything is scanned.
 *
 * Without this the check reads English prose as code: a comment saying
 * "vertical stacking handles any residual collision (see below)" looks exactly
 * like a call to collision(). That produced 807 false positives on the first
 * run — a checker that cries wolf 807 times is worse than no checker, because
 * the next person turns it off. */
function stripNonCode(src) {
    let out = '';
    let i = 0;
    const n = src.length;
    // Last significant character emitted, used for the one genuinely hard
    // decision in JS lexing: is `/` a division or the start of a regex
    // literal? Getting it wrong is not cosmetic — reading /['"]/ as a string
    // swallows the rest of the file, and the first version of this checker
    // did exactly that, reporting live functions as undefined.
    let prev = '';
    const REGEX_OK_AFTER = new Set(['', '(', ',', '=', ':', '[', '!', '&', '|',
        '?', '{', '}', ';', '+', '-', '*', '%', '~', '^', '<', '>', '\n']);
    const KW_BEFORE_REGEX = /\b(return|typeof|instanceof|in|of|new|delete|void|do|else|case|yield|await)$/;
    while (i < n) {
        const c = src[i], d = src[i + 1];
        if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; continue; }
        if (c === '/' && d === '*') { i += 2; while (i < n && !(src[i] === '*' && src[i + 1] === '/')) i++; i += 2; continue; }
        if (c === '/') {
            const isRegex = REGEX_OK_AFTER.has(prev) || KW_BEFORE_REGEX.test(out.slice(-12));
            if (isRegex) {
                i++;
                let inClass = false;
                while (i < n) {
                    const r = src[i];
                    if (r === '\\') { i += 2; continue; }
                    if (r === '[') inClass = true;
                    else if (r === ']') inClass = false;
                    else if (r === '/' && !inClass) { i++; break; }
                    else if (r === '\n') break;
                    i++;
                }
                while (i < n && /[gimsuyd]/.test(src[i])) i++;
                out += '0'; prev = '0'; continue;
            }
            out += c; prev = c; i++; continue;
        }
        if (c === '"' || c === "'" || c === '`') {
            const q = c; i++;
            while (i < n && src[i] !== q) { if (src[i] === '\\') i++; i++; }
            i++; out += '""'; prev = '"'; continue;
        }
        out += c;
        if (!/\s/.test(c)) prev = c;
        else if (c === '\n') prev = prev === '' ? '\n' : prev;
        i++;
    }
    return out;
}

/* Bare `name(` calls, skipping property access, declarations and keywords. */
const KEYWORDS = new Set(['if', 'for', 'while', 'switch', 'catch', 'function',
    'return', 'typeof', 'new', 'delete', 'void', 'in', 'of', 'do', 'else',
    'try', 'throw', 'case', 'await', 'yield', 'super', 'this', 'class', 'const',
    'let', 'var', 'import', 'export', 'default', 'extends', 'instanceof']);

function calledNames(src) {
    const out = new Map();
    // No whitespace allowed between the name and the paren. Hand-rolled
    // lexing leaks the occasional comment fragment, and prose reaches the
    // paren on the NEXT line ("… the Middle Korean\n    (…)"); real call
    // sites in this codebase never do.
    const re = /(^|[^.\w$])([A-Za-z_$][\w$]*)\(/g;
    let m;
    while ((m = re.exec(src))) {
        const name = m[2];
        if (KEYWORDS.has(name)) continue;
        if (out.has(name)) continue;
        const line = src.slice(0, m.index).split('\n').length;
        out.set(name, line);
    }
    return out;
}

let _rootCache = null;
function rootDeclarations() {
    if (_rootCache) return _rootCache;
    _rootCache = new Set();
    for (const f of fs.readdirSync(ROOT)) {
        if (!f.endsWith('.js')) continue;
        const full = path.join(ROOT, f);
        if (fs.statSync(full).isDirectory()) continue;
        for (const n of declaredNames(stripNonCode(fs.readFileSync(full, 'utf8')))) _rootCache.add(n);
    }
    return _rootCache;
}

const problems = [];
for (const page of PAGES) {
    const file = path.join(ROOT, page);
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');

    // Only the inline scripts. External files declare their own names, and the
    // pages reach them through `window.` or a documented global, so anything
    // they define is picked up by the window.* rule above plus this scan of
    // every .js the page loads.
    const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
        .map(m => m[1]).join('\n');
    if (!inline.trim()) continue;

    const code = stripNonCode(inline);
    const declared = declaredNames(code);
    // Declarations from every .js in the repo root, not only the ones in a
    // literal <script src> tag: several are loaded through assetUrl() at
    // runtime (meta_i18n_engine.js is how translateMetaSmart arrives), and a
    // checker that does not know that reports live functions as missing.
    for (const n of rootDeclarations()) declared.add(n);

    for (const [name, line] of calledNames(code)) {
        if (declared.has(name) || KNOWN.has(name)) continue;
        // `typeof foo === 'function' && foo()` is a declared optional
        // dependency, not a mistake.
        if (new RegExp("typeof\\s+" + name + "\\s*===?\\s*[\"']function").test(inline)) continue;
        problems.push(`${page}:${line} calls ${name}() — not declared in the page or anything it loads`);
    }
}

for (const p of problems) console.log('  ✗ ' + p);
console.log(`inline call targets — problems: ${problems.length}`);
process.exitCode = problems.length ? 1 : 0;
