/**
 * ipa_synth/tract.js — draws a midsagittal vocal tract (face to the left) from the
 * articulatory parameters engine.sample() returns: tongue body circle centre (cx, cy; r 46),
 * tongue tip (tx, ty, curl), lips (lip aperture 0..1, pro protrusion, ll labiodental),
 * velum (vel 0 raised .. 1 lowered), jaw (0..1), glottis (glot: -0.5 shut, 0 voicing, 1 open),
 * and the acoustic amplitudes for airflow cues (AV, AH, AF).
 * Drawing space is 420 × 430; the caller sizes the canvas.
 */
(function () {
    'use strict';
    const W = 344, H = 430, R = 46;
    const PIVOT = [252, 168];          // the mandible turns about the condyle
    const PAL = [[84, 199], [96, 191], [114, 185], [150, 177], [190, 176], [226, 181]];
    const WALL = [[282, 168], [287, 250], [284, 330], [281, 430]];
    const PLACE_XY = {
        BL: [56, 214], LD: [74, 219], DE: [86, 208], AL: [100, 196], PA: [114, 189], RE: [128, 184], AP: [124, 188],
        PL: [165, 180], VE: [212, 185], UV: [240, 194], PH: [278, 262], EP: [276, 296], GL: [268, 374], LV: [212, 185], LP: [165, 180],
    };

    const css = (name, fb) => (getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fb);
    const rot = (p, a) => {
        const dx = p[0] - PIVOT[0], dy = p[1] - PIVOT[1], c = Math.cos(a), s = Math.sin(a);
        return [PIVOT[0] + dx * c - dy * s, PIVOT[1] + dx * s + dy * c];
    };
    // Catmull-Rom through points (open or closed)
    function spline(ctx, pts, closed, moveFirst = true) {
        const n = pts.length;
        const P = i => closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
        if (moveFirst) ctx.moveTo(pts[0][0], pts[0][1]); else ctx.lineTo(pts[0][0], pts[0][1]);
        const last = closed ? n : n - 1;
        for (let i = 0; i < last; i++) {
            const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
            ctx.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]);
        }
        if (closed) ctx.closePath();
    }
    function mul(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

    function draw(canvas, S, info) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const cw = canvas.clientWidth, ch = canvas.clientHeight;
        if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) { canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr); }
        const k = Math.min(cw / W, ch / H);
        ctx.setTransform(dpr * k, 0, 0, dpr * k, dpr * (cw - W * k) / 2, dpr * (ch - H * k) / 2);
        ctx.clearRect(-60, -60, W + 120, H + 120);
        ctx.lineJoin = 'round'; ctx.lineCap = 'round';

        const C = {
            skin: css('--vt-skin', '#f3d9c6'), skinLine: css('--vt-skin-line', '#b98b6e'), air: css('--vt-air', '#fffaf4'),
            bone: css('--vt-bone', '#e9e4d8'), boneLine: css('--vt-bone-line', '#9d927c'), tongue: css('--vt-tongue', '#e07a7a'),
            tongueLine: css('--vt-tongue-line', '#a84848'), tooth: css('--vt-tooth', '#ffffff'), velum: css('--vt-velum', '#d98f8f'),
            flow: css('--vt-flow', '#2e6fb8'), noise: css('--vt-noise', '#d0402f'), text: css('--vt-text', '#333'), nasal: css('--vt-nasal', '#cfe3f7'),
            fold: css('--vt-fold', '#c46a6a'), lip: css('--vt-lip', '#d88b84'),
        };
        const t = info.time || 0;
        const jawA = -S.jaw * 0.2;                         // negative = front of the jaw drops
        const J = p => rot(p, jawA);

        // ---- geometry that moves
        const pro = S.pro * 8;
        const ulBottom = 212 - S.lip * 4;                  // upper lip edge
        const lowInc = J([81, 228]);                       // lower incisor tip
        // the lower lip rides on the jaw: it stays just above the lower teeth and moves back with them
        const llTop = S.ll ? Math.min(lowInc[1] - 6, 219) : Math.max(ulBottom, Math.min(ulBottom + S.lip * 26, lowInc[1] - 6));
        const llX = S.ll ? 72 : 52 - pro + (lowInc[0] - 81) * .8;

        // ---- head: one smooth profile (face left, neck right)
        ctx.beginPath();
        ctx.moveTo(160, 10);
        ctx.bezierCurveTo(118, 12, 94, 40, 90, 78);          // crown to forehead
        ctx.bezierCurveTo(88, 92, 84, 100, 84, 106);         // brow
        ctx.bezierCurveTo(86, 114, 84, 120, 78, 128);        // bridge of the nose
        ctx.bezierCurveTo(64, 142, 48, 152, 40, 162);        // nose ridge
        ctx.bezierCurveTo(34, 170, 40, 178, 52, 178);        // tip and nostril
        ctx.bezierCurveTo(58, 178, 62, 181, 64, 186);        // under the nose
        ctx.bezierCurveTo(56 - pro, 190, 50 - pro, 196, 50 - pro, ulBottom - 3);
        ctx.quadraticCurveTo(54 - pro, ulBottom + 1, 66, ulBottom);
        ctx.lineTo(llX + 14, llTop);
        ctx.quadraticCurveTo(llX - 2, llTop - 1, llX, llTop + 8);
        const fold = J([66, 250]), chinFront = J([60, 280]), chinBottom = J([80, 304]), underChin = J([130, 318]);
        ctx.bezierCurveTo(llX + 1, llTop + 18, fold[0] - 2, fold[1] - 8, fold[0], fold[1]);
        ctx.bezierCurveTo(fold[0] - 6, fold[1] + 10, chinFront[0] - 2, chinFront[1] - 8, chinFront[0], chinFront[1]);
        ctx.bezierCurveTo(chinFront[0] + 2, chinBottom[1] - 6, chinBottom[0] - 10, chinBottom[1], chinBottom[0], chinBottom[1]);
        ctx.bezierCurveTo(chinBottom[0] + 20, chinBottom[1] + 4, underChin[0] - 20, underChin[1], underChin[0], underChin[1]);
        ctx.bezierCurveTo(152, 326, 172, 334, 180, 350);   // into the throat
        ctx.bezierCurveTo(184, 372, 182, 400, 184, 430);
        ctx.lineTo(326, 430);
        ctx.bezierCurveTo(318, 360, 320, 290, 330, 220);    // back of the neck
        ctx.bezierCurveTo(342, 130, 300, 14, 160, 10);      // back of the head
        ctx.closePath();
        ctx.fillStyle = C.skin; ctx.fill(); ctx.strokeStyle = C.skinLine; ctx.lineWidth = 1.4; ctx.stroke();
        // brow and a closed eye, just enough to read as a face
        ctx.strokeStyle = C.skinLine; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(92, 98); ctx.quadraticCurveTo(104, 94, 118, 98); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(98, 112); ctx.quadraticCurveTo(106, 116, 116, 112); ctx.stroke();

        // ---- nasal cavity
        const nasalFlow = S.vel > .4 && (S.AV > .15 || S.AH > .1);
        ctx.beginPath();
        ctx.moveTo(56, 176); ctx.quadraticCurveTo(64, 150, 94, 136); ctx.quadraticCurveTo(160, 122, 232, 133);
        ctx.quadraticCurveTo(270, 142, 282, 168); ctx.lineTo(262, 172); ctx.quadraticCurveTo(244, 168, 226, 176);
        ctx.lineTo(190, 171); ctx.lineTo(112, 177); ctx.lineTo(86, 188); ctx.quadraticCurveTo(70, 184, 56, 176);
        ctx.closePath();
        ctx.fillStyle = nasalFlow ? C.nasal : C.air; ctx.fill(); ctx.strokeStyle = C.skinLine; ctx.lineWidth = 1; ctx.stroke();
        // turbinates
        ctx.strokeStyle = C.skinLine; ctx.globalAlpha = .45;
        for (const y of [146, 158]) { ctx.beginPath(); ctx.moveTo(120, y); ctx.quadraticCurveTo(170, y - 8, 225, y + 2); ctx.stroke(); }
        ctx.globalAlpha = 1;

        // ---- airway: mouth and throat
        ctx.beginPath();
        ctx.moveTo(66, ulBottom); ctx.lineTo(80, 203);
        spline(ctx, PAL, false, false);
        ctx.lineTo(262, 172); ctx.lineTo(282, 168);
        spline(ctx, WALL, false, false);
        ctx.lineTo(244, 430); ctx.lineTo(244, 372); ctx.lineTo(238, 344);
        ctx.lineTo(J([150, 330])[0], J([150, 330])[1]); ctx.lineTo(J([100, 300])[0], J([100, 300])[1]);
        ctx.lineTo(lowInc[0] + 8, lowInc[1] + 6); ctx.lineTo(lowInc[0] + 2, lowInc[1] - 2); ctx.lineTo(llX + 14, llTop);
        ctx.closePath();
        ctx.fillStyle = C.air; ctx.fill();
        ctx.beginPath(); spline(ctx, WALL, false); ctx.strokeStyle = C.skinLine; ctx.lineWidth = 2; ctx.stroke();

        // ---- hard palate
        ctx.beginPath(); spline(ctx, PAL, false);
        ctx.strokeStyle = C.boneLine; ctx.lineWidth = 7; ctx.stroke();
        ctx.strokeStyle = C.bone; ctx.lineWidth = 4.5; ctx.stroke();

        // ---- velum: raised seals the nose, lowered opens it
        const v = S.vel;
        const vEnd = [264 + (246 - 264) * v, 169 + (224 - 169) * v];
        const vMid = [247 + (240 - 247) * v, 172 + (198 - 172) * v];
        ctx.beginPath(); ctx.moveTo(224, 181); ctx.quadraticCurveTo(vMid[0], vMid[1], vEnd[0], vEnd[1]);
        ctx.strokeStyle = C.velum; ctx.lineWidth = 11; ctx.stroke();

        // ---- tongue: a circle-capped body from the tip back to the hyoid
        const cx = S.cx, cy = S.cy;
        // dorsum: the upper arc of a circle; root: the front wall of the pharynx, further back for back/low tongues
        const arc = [];
        for (let a = -160; a <= -20; a += 20) { const r = a * Math.PI / 180; arc.push([Math.min(cx + R * Math.cos(r), 280), cy + R * Math.sin(r)]); }
        const rootX = Math.min(281, Math.max(243 + .25 * (cx - 150) + .2 * (cy - 231), cx + R * .98 - 4));
        const tip = [S.tx, S.ty];
        const a0 = arc[0];
        const curl = S.curl > .2;
        const blade = curl
            ? [(tip[0] + a0[0]) / 2 + 2, Math.max(tip[1] + 5, (tip[1] + a0[1]) / 2)]
            : [tip[0] * .45 + a0[0] * .55, Math.min(tip[1] + 2, (tip[1] + a0[1]) / 2 - 1)];
        const under = curl ? [tip[0] + 3, tip[1] + 9] : [tip[0] + 6, tip[1] + 11];
        const underBlade = [Math.max(under[0] + 8, blade[0] + 4), Math.max(under[1] + 10, blade[1] + 18)];
        const floorFront = J([100, 270]);
        const raised = tip[1] < cy - 8;
        const tipRound = [tip[0] - 2, tip[1] + 5];
        const front = raised ? [floorFront, underBlade, under, tipRound] : [floorFront, under, tipRound];
        const pts = [tip, blade, ...arc, [rootX, Math.max(cy + 20, arc[arc.length - 1][1] + 26)], [rootX - 4, 306], [250, 334], [200, 342], J([130, 318]), ...front];
        ctx.beginPath(); spline(ctx, pts, true);
        ctx.fillStyle = C.tongue; ctx.fill(); ctx.strokeStyle = C.tongueLine; ctx.lineWidth = 1.4; ctx.stroke();
        if (S.lat > .3) {          // lateral: air escapes past the sides of the tongue
            ctx.save(); ctx.setLineDash([3, 3]); ctx.strokeStyle = C.flow; ctx.lineWidth = 1.6; ctx.globalAlpha = S.lat;
            ctx.beginPath(); ctx.moveTo(tip[0] + 10, tip[1] + 8); ctx.quadraticCurveTo(a0[0] + 8, a0[1] + 16, cx, cy - R + 16); ctx.stroke(); ctx.restore();
        }

        // ---- teeth
        ctx.fillStyle = C.tooth; ctx.strokeStyle = C.boneLine; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(86, 192); ctx.quadraticCurveTo(89, 206, 82, 222); ctx.lineTo(76, 221); ctx.quadraticCurveTo(75, 206, 78, 192); ctx.closePath(); ctx.fill(); ctx.stroke();
        const li = [[79, 229], [86, 229], [92, 258], [84, 259]].map(J);
        ctx.beginPath(); ctx.moveTo(li[0][0], li[0][1]); for (const p of li.slice(1)) ctx.lineTo(p[0], p[1]); ctx.closePath(); ctx.fill(); ctx.stroke();

        // ---- lips on top
        ctx.fillStyle = C.lip; ctx.strokeStyle = C.tongueLine; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(64, 188); ctx.quadraticCurveTo(50 - pro, 194, 50 - pro, ulBottom - 3); ctx.quadraticCurveTo(54 - pro, ulBottom + 1, 66, ulBottom);
        ctx.quadraticCurveTo(72, ulBottom - 6, 70, 194); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(llX + 14, llTop); ctx.quadraticCurveTo(llX - 2, llTop - 1, llX, llTop + 8); ctx.quadraticCurveTo(llX + 2, llTop + 16, llX + 10, llTop + 18);
        ctx.quadraticCurveTo(llX + 20, llTop + 12, llX + 18, llTop + 2); ctx.closePath(); ctx.fill(); ctx.stroke();

        // ---- epiglottis and larynx
        ctx.beginPath(); ctx.moveTo(256, 334); ctx.quadraticCurveTo(260, 308, 272, 294);
        ctx.strokeStyle = C.velum; ctx.lineWidth = 5; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(240, 346); ctx.quadraticCurveTo(232, 372, 244, 400); ctx.lineTo(244, 430);
        ctx.strokeStyle = C.skinLine; ctx.lineWidth = 1.5; ctx.stroke();

        // ---- airflow cues
        const seg = info.seg;
        const rnd = mul(Math.floor(t / 40));
        if (S.AF > .005 && seg && seg.type === 'C') {
            const pl = info.phase && info.phase.kind === 'frication' ? (seg.fricPlace || seg.place) : seg.place;
            const xy = PLACE_XY[pl] || PLACE_XY.AL;
            const n = Math.round(8 + 24 * Math.min(1, S.AF * 4));
            ctx.fillStyle = C.noise;
            const lab = pl === 'BL' || pl === 'LD';
            for (let i = 0; i < n; i++) {
                ctx.globalAlpha = .35 + .5 * rnd();
                const x = lab ? xy[0] - 4 - 20 * rnd() : xy[0] - 18 * rnd(), y = lab ? xy[1] - 5 + 10 * rnd() : xy[1] + 4 + 10 * rnd();
                ctx.beginPath(); ctx.arc(x, y, 1.2 + rnd() * 1.4, 0, 7); ctx.fill();
            }
            ctx.globalAlpha = 1;
        }
        if (S.AH > .1) {
            ctx.fillStyle = C.flow;
            for (let i = 0; i < 12; i++) { ctx.globalAlpha = .3 + .4 * rnd(); ctx.beginPath(); ctx.arc(256 + 22 * rnd(), 362 - 40 * rnd(), 1.3, 0, 7); ctx.fill(); }
            ctx.globalAlpha = 1;
        }
        if (nasalFlow) {
            ctx.strokeStyle = C.flow; ctx.lineWidth = 1.6; ctx.globalAlpha = .8;
            ctx.beginPath(); ctx.moveTo(46, 182); ctx.lineTo(26, 192); ctx.moveTo(26, 192); ctx.lineTo(33, 185); ctx.moveTo(26, 192); ctx.lineTo(35, 195); ctx.stroke();
            ctx.globalAlpha = 1;
        }

    }

    window.VocalTract = { draw, W, H };
})();
