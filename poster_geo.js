/* poster_geo.js — pure geo/math for the WordMap poster. Browser + Node. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.PosterGeo = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  // Natural Earth forward (Šavrič polynomial, as in d3-geo-projection).
  const X_MAX = 2.73539; // |x| at (λ=±180°, φ=0)
  const Y_MAX = 1.42246; // |y| at (φ=±90°)

  function projectNaturalEarth(lng, lat, opts) {
    const width = (opts && opts.width) || 1600;
    const scale = width / (2 * X_MAX);
    const height = 2 * Y_MAX * scale;
    const l = lng * Math.PI / 180;
    const p = lat * Math.PI / 180;
    const p2 = p * p, p4 = p2 * p2;
    const nx = l * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4)));
    const ny = p * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)));
    return { x: nx * scale + width / 2, y: height / 2 - ny * scale, height: height };
  }

  return { projectNaturalEarth: projectNaturalEarth };
});
