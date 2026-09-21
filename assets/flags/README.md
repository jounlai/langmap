# Country flags

191 SVGs from **flag-icons** v7.5.0 (https://github.com/lipis/flag-icons), MIT,
copyright (c) 2013 Panayiotis Lipiridis. `LICENSE` beside this file is theirs,
kept because MIT requires it to travel with the copies.

Only the 191 countries this atlas actually names are here, not the upstream
271, and only the 4x3 aspect. The set is generated from `SEO_COUNTRY_ISO` in
`seo/lib.php`; if a row gains a country that map does not carry, add it there
first and copy the flag in.

Served as individual files rather than a sprite on purpose: there is no
rasteriser on the build box, an inlined sprite would put ~1.1 MB into every
page, and the word pages keep all but ~24 of these inside a closed <details>,
which browsers do not fetch until it is opened. Median file is under 800
bytes; the fourteen coat-of-arms flags are large raw but gzip hard (Serbia
177 KB -> 50 KB) and none of them is in a first-paint position.
