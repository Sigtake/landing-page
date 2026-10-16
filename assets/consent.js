/*
 * Cookie consent for sigtake.com. Same cookie and format as the app (frontend/src/lib/consent.ts):
 * sg_consent on .sigtake.com, {"a":1|0,"v":1,"ts":"..."}, one decision for landing and app.
 * The consent default (denied) is set inline before GTM in every page head; this file only
 * shows the banner, records the choice and opens it again from [data-sg-consent-open].
 */
(function () {
  var COOKIE = 'sg_consent';
  var MAX_AGE = 365 * 24 * 60 * 60;
  var TRACKING = /^(sg_ft|sg_lt|sg_cid|_ga|_ga_.+|_gcl_.+|_gid)$/;

  function sharedDomain() {
    var h = location.hostname;
    return h === 'sigtake.com' || /\.sigtake\.com$/.test(h) ? '.sigtake.com' : null;
  }

  function readChoice() {
    try {
      var m = document.cookie.match(/(?:^|; )sg_consent=([^;]*)/);
      if (!m) return null;
      var a = JSON.parse(decodeURIComponent(m[1])).a;
      return a === 1 ? 'granted' : a === 0 ? 'denied' : null;
    } catch (e) {
      return null;
    }
  }

  function writeCookie(name, value, maxAge) {
    try {
      var d = sharedDomain();
      document.cookie = name + '=' + encodeURIComponent(value) + '; Path=/; Max-Age=' + maxAge + '; SameSite=Lax' +
        (location.protocol === 'https:' ? '; Secure' : '') + (d ? '; Domain=' + d : '');
    } catch (e) { /* cookies blocked: the banner asks again next time */ }
  }

  // GA writes on the shared domain, a local preview has none: delete on both.
  function deleteCookie(name) {
    try {
      var d = sharedDomain();
      document.cookie = name + '=; Path=/; Max-Age=0; SameSite=Lax';
      if (d) document.cookie = name + '=; Path=/; Max-Age=0; SameSite=Lax; Domain=' + d;
    } catch (e) { /* nothing to delete */ }
  }

  function signals(granted) {
    var v = granted ? 'granted' : 'denied';
    return { analytics_storage: v, ad_storage: v, ad_user_data: v, ad_personalization: v };
  }

  function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  var banner = null;

  function setChoice(granted) {
    writeCookie(COOKIE, JSON.stringify({ a: granted ? 1 : 0, v: 1, ts: new Date().toISOString() }), MAX_AGE);
    gtag('consent', 'update', signals(granted));
    if (!granted) {
      document.cookie.split('; ').forEach(function (c) {
        var name = c.split('=')[0];
        if (TRACKING.test(name)) deleteCookie(name);
      });
    }
    // attribution.js listens: accepting mid-visit still records how the visit started
    try { window.dispatchEvent(new CustomEvent('sg:consent', { detail: { granted: granted } })); } catch (e) { /* old browser */ }
    close();
  }

  var CSS =
    '.sg-consent{position:fixed;z-index:1000;right:24px;bottom:24px;width:min(420px,calc(100vw - 32px));box-sizing:border-box;' +
    'padding:20px 22px;border:1px solid var(--line,#e3e8ed);border-radius:18px;background:var(--page,#fff);' +
    'box-shadow:0 12px 32px rgba(10,13,18,.12);font:400 14.5px/1.55 var(--ui,"Inter",system-ui,sans-serif);color:var(--muted,#56677d)}' +
    '.sg-consent h2{margin:0 0 6px;font:600 16px/1.3 var(--display,"Figtree","Inter",system-ui,sans-serif);color:var(--ink,#0a0d12);letter-spacing:-.01em}' +
    '.sg-consent p{margin:0}' +
    '.sg-consent a{color:var(--teal-deep,#0b7d70);text-decoration:underline;text-underline-offset:2px}' +
    '.sg-consent-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}' +
    '.sg-consent button{height:44px;border-radius:999px;border:1px solid var(--ink-2,#2b3a4d);background:var(--page,#fff);' +
    'color:var(--ink,#0a0d12);font:500 15px/1 var(--ui,"Inter",system-ui,sans-serif);cursor:pointer}' +
    '.sg-consent button:hover{background:var(--panel,#f5f7f9)}' +
    '.sg-consent button:focus-visible{outline:2px solid var(--teal-deep,#0b7d70);outline-offset:2px}' +
    '@media (max-width:640px){.sg-consent{right:16px;bottom:16px}}';

  function open() {
    if (banner) return;
    if (!document.getElementById('sg-consent-css')) {
      var style = document.createElement('style');
      style.id = 'sg-consent-css';
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    banner = document.createElement('section');
    banner.className = 'sg-consent';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-labelledby', 'sg-consent-title');
    banner.innerHTML =
      '<h2 id="sg-consent-title">Cookies</h2>' +
      '<p>We use analytics and advertising cookies to learn how people find Sigtake and to measure our ads. ' +
      'They stay off unless you accept. <a href="/privacy/">Privacy policy</a></p>' +
      '<div class="sg-consent-actions">' +
      '<button type="button" data-choice="0">Reject</button>' +
      '<button type="button" data-choice="1">Accept</button>' +
      '</div>';
    banner.addEventListener('click', function (e) {
      var choice = e.target && e.target.getAttribute && e.target.getAttribute('data-choice');
      if (choice !== null && choice !== undefined) setChoice(choice === '1');
    });
    document.body.appendChild(banner);
  }

  function close() {
    if (banner) banner.remove();
    banner = null;
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target && e.target.closest && e.target.closest('[data-sg-consent-open]');
    if (!trigger) return;
    e.preventDefault();
    open();
    var first = banner && banner.querySelector('button');
    if (first) first.focus();
  });

  if (readChoice() === null) open();
})();
