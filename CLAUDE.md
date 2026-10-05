# CLAUDE.md

Plain HTML on GitHub Pages — no build step and no shared layout. Every page owns its full `<head>`.

## Every new page must carry Google Tag Manager

Copy both blocks from `index.html` verbatim (container `GTM-N5834SWZ`):

- `<!-- Google Tag Manager -->` … `<!-- End Google Tag Manager -->` — last thing before `</head>`
- `<!-- Google Tag Manager (noscript) -->` … `<!-- End Google Tag Manager (noscript) -->` — first thing after `<body>`

The templates in `tools/` deliberately do not include it, so a page built from one must have it added by hand.

Check: `grep -L GTM-N5834SWZ $(git ls-files '*.html' | grep -v '^tools/')` must print nothing.
