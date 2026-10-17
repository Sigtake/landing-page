# CLAUDE.md

Plain HTML on GitHub Pages — no build step and no shared layout. Every page owns its full `<head>`.

## Every new page must carry Google Tag Manager

Copy both blocks from `index.html` verbatim (container `GTM-N5834SWZ`):

- `<!-- Google Tag Manager -->` … `<!-- End Google Tag Manager -->` — last thing before `</head>`
- `<!-- Google Tag Manager (noscript) -->` … `<!-- End Google Tag Manager (noscript) -->` — first thing after `<body>`

The templates in `tools/` deliberately do not include it, so a page built from one must have it added by hand.

Check: `grep -L GTM-N5834SWZ $(git ls-files '*.html' | grep -v '^tools/')` must print nothing.

## …and the consent default, before GTM

Copy `<!-- Consent default -->` … `<!-- End Consent default -->` from `index.html` verbatim, immediately before
`<!-- Google Tag Manager -->`. It sets Consent Mode to denied before the container loads and loads
`/assets/consent.js` (banner, `sg_consent` cookie on `.sigtake.com`, shared with the app). Without it GTM sets
analytics and ad cookies without asking. The Legal footer list also carries
`<li><a href="#cookie-settings" data-sg-consent-open>Cookie settings</a></li>`.

Check: `grep -L 'End Consent default' $(git ls-files '*.html' | grep -v '^tools/')` and
`grep -L data-sg-consent-open $(git ls-files '*.html' | grep -v '^tools/')` must print nothing.

## Every link to the app names its button

The same block also loads `/assets/attribution.js` (first/last touch for the signup, spec 129). Every
`<a href="https://app.sigtake.com…">` carries `data-sg-cta="<placement>"` (`nav-start`, `nav-login`, `menu-login`,
`hero`, `footer`, `close`…); the script prefixes the page (`pricing-hero`, `academy-<slug>-footer`) and, on click,
adds the visitor's inbound `utm_*`, `sg_lp` and `sg_cta` to the link. Never put our own `utm_*` on these links: it
would make every signup look like it came from us. `attribution.js` mirrors `frontend/src/lib/attribution-core.ts`
in the app repo: change both together. The 404 page declares `<body data-sg-page="404">` because its URL is any path.

Check: `grep -n '<a [^>]*href="https://app.sigtake.com' $(git ls-files '*.html' | grep -v '^tools/') | grep -v data-sg-cta`
must print nothing.
