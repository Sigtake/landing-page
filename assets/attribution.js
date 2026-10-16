/*
 * Marketing attribution for sigtake.com (spec 129). Same rules and cookie format (v: 1) as the app's
 * frontend/src/lib/attribution-core.ts: change both together and bump `v`.
 *
 * With consent: first/last touch in sg_ft / sg_lt and a random sg_cid, on .sigtake.com, read by the app at signup.
 * Without consent: no cookie. The entry visit stays in sessionStorage and every link to the app is decorated on
 * click with the utm_* the visitor arrived with, sg_cta (which button) and sg_lp (entry page), so the app can
 * still attribute the signup. Our own utm_* are never invented: links carry only what came in.
 */
(function () {
  var CLICK_ID_PARAMS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid', 'li_fat_id'];
  var UTM_KEYS = { utm_source: 's', utm_medium: 'm', utm_campaign: 'c', utm_content: 'ct', utm_term: 'tm' };
  var LONG_KEYS = { c: 1, ct: 1, tm: 1 };
  var TOUCH_MAX_AGE = 90 * 24 * 60 * 60;
  var CID_MAX_AGE = 400 * 24 * 60 * 60;
  var ENTRY_KEY = 'sg_entry';
  var APP_ORIGIN = 'https://app.sigtake.com';

  function clean(v, max) {
    if (!v) return undefined;
    var out = String(v).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9._-]/g, '').slice(0, max);
    return out || undefined;
  }

  function isOwnHost(host) {
    return host === 'sigtake.com' || /\.sigtake\.com$/.test(host) || host === 'localhost' || host === '127.0.0.1';
  }

  function referrerHost(referrer) {
    if (!referrer) return undefined;
    try {
      var host = new URL(referrer).hostname.toLowerCase().replace(/^www\./, '');
      return host && !isOwnHost(host) ? host.slice(0, 255) : undefined;
    } catch (e) {
      return undefined;
    }
  }

  function landingPath(raw, pathname) {
    var candidate = raw && raw.charAt(0) === '/' ? raw : pathname;
    return candidate.split(/[?#]/)[0].replace(/[^A-Za-z0-9/._~%-]/g, '').slice(0, 255) || '/';
  }

  function touchFromVisit(input) {
    var params = new URLSearchParams(input.search);
    var touch = { v: 1, ts: input.now.toISOString(), lp: landingPath(params.get('sg_lp'), input.pathname) };
    Object.keys(UTM_KEYS).forEach(function (param) {
      var key = UTM_KEYS[param];
      var value = clean(params.get(param), LONG_KEYS[key] ? 150 : 100);
      if (value) touch[key] = value;
    });
    var clickParam = null;
    for (var i = 0; i < CLICK_ID_PARAMS.length; i++) {
      if (params.get(CLICK_ID_PARAMS[i])) { clickParam = CLICK_ID_PARAMS[i]; break; }
    }
    if (input.consent && clickParam) {
      touch.cit = clickParam;
      touch.cid = params.get(clickParam).replace(/[^A-Za-z0-9._-]/g, '').slice(0, 200);
    }
    var rh = input.consent ? referrerHost(input.referrer) : undefined;
    if (rh) touch.rh = rh;
    var hasCampaign = !!(touch.s || touch.m || touch.c || clickParam);
    return { touch: touch, hasCampaign: hasCampaign, external: !!referrerHost(input.referrer), cta: clean(params.get('sg_cta'), 64) };
  }

  function nextTouches(prev, input) {
    var visit = touchFromVisit(input);
    var ft = prev.ft || visit.touch;
    var lt = visit.hasCampaign || visit.external ? visit.touch : prev.lt;
    return { ft: ft, lt: lt, cta: visit.cta, changed: ft !== prev.ft || lt !== prev.lt };
  }

  function parseTouchCookie(raw) {
    if (!raw) return null;
    try {
      var parsed = JSON.parse(raw);
      return parsed && parsed.v === 1 && typeof parsed.ts === 'string' ? parsed : null;
    } catch (e) {
      return null;
    }
  }

  /** Page part of sg_cta: "home", "pricing", "academy-<slug>"… The 404 page names itself (its URL is any path). */
  function pageKey(pathname, declared) {
    if (declared) return declared;
    var parts = pathname.split('/').filter(function (p) { return p && p !== 'index.html'; });
    return parts.length ? parts.join('-').replace(/[^a-z0-9-]/gi, '').toLowerCase() : 'home';
  }

  /** Adds what the app needs to attribute the signup without cookies. Never overwrites what the link already says. */
  function decorateHref(href, entry, cta) {
    var url = new URL(href);
    if (entry) {
      var inbound = new URLSearchParams(entry.search);
      Object.keys(UTM_KEYS).forEach(function (param) {
        var value = inbound.get(param);
        if (value && !url.searchParams.has(param)) url.searchParams.set(param, value.slice(0, 150));
      });
      if (!url.searchParams.has('sg_lp')) url.searchParams.set('sg_lp', landingPath(null, entry.pathname));
    }
    if (cta && !url.searchParams.has('sg_cta')) url.searchParams.set('sg_cta', cta);
    return url.toString();
  }

  var core = {
    touchFromVisit: touchFromVisit,
    nextTouches: nextTouches,
    parseTouchCookie: parseTouchCookie,
    pageKey: pageKey,
    decorateHref: decorateHref,
  };
  if (typeof module === 'object' && module.exports) module.exports = core;
  if (typeof document === 'undefined') return;

  // ── Browser ────────────────────────────────────────────────────────────────

  function sharedDomain() {
    var h = location.hostname;
    return h === 'sigtake.com' || /\.sigtake\.com$/.test(h) ? '.sigtake.com' : null;
  }

  function readCookie(name) {
    try {
      var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
      return m ? decodeURIComponent(m[1]) : null;
    } catch (e) {
      return null;
    }
  }

  function writeCookie(name, value, maxAge) {
    try {
      var d = sharedDomain();
      document.cookie = name + '=' + encodeURIComponent(value) + '; Path=/; Max-Age=' + maxAge + '; SameSite=Lax' +
        (location.protocol === 'https:' ? '; Secure' : '') + (d ? '; Domain=' + d : '');
    } catch (e) { /* cookies blocked: the decorated links still carry the visit */ }
  }

  function hasConsent() {
    var raw = readCookie('sg_consent');
    if (!raw) return false;
    try { return JSON.parse(raw).a === 1; } catch (e) { return false; }
  }

  function readEntry() {
    try {
      var raw = sessionStorage.getItem(ENTRY_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeEntry(entry) {
    try { sessionStorage.setItem(ENTRY_KEY, JSON.stringify(entry)); } catch (e) { /* this page still decorates */ }
  }

  function randomId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return null;
  }

  function persist(visit) {
    var input = { search: visit.search, pathname: visit.pathname, referrer: visit.referrer, consent: true, now: new Date() };
    var next = nextTouches({ ft: parseTouchCookie(readCookie('sg_ft')), lt: parseTouchCookie(readCookie('sg_lt')) }, input);
    writeCookie('sg_ft', JSON.stringify(next.ft), TOUCH_MAX_AGE);
    if (next.lt) writeCookie('sg_lt', JSON.stringify(next.lt), TOUCH_MAX_AGE);
    if (!readCookie('sg_cid')) {
      var id = randomId();
      if (id) writeCookie('sg_cid', id, CID_MAX_AGE);
    }
  }

  var here = { search: location.search, pathname: location.pathname, referrer: document.referrer };

  // The session's entry is the first page, or a later one that brought a new campaign or outside referrer
  var entry = readEntry();
  var visit = touchFromVisit({ search: here.search, pathname: here.pathname, referrer: here.referrer, consent: false, now: new Date() });
  if (!entry || visit.hasCampaign || visit.external) {
    entry = here;
    writeEntry(entry);
  }

  if (hasConsent()) persist(here);

  // consent.js announces the choice; accepting later still records how this session started
  window.addEventListener('sg:consent', function (e) {
    if (e.detail && e.detail.granted) persist(readEntry() || here);
  });

  var page = pageKey(location.pathname, document.body && document.body.getAttribute('data-sg-page'));

  function decorate(e) {
    var a = e.target && e.target.closest && e.target.closest('a[href^="' + APP_ORIGIN + '"]');
    if (!a) return;
    var placement = a.getAttribute('data-sg-cta');
    try {
      a.href = decorateHref(a.href, readEntry() || entry, placement ? page + '-' + placement : null);
    } catch (err) { /* the plain link still works */ }
  }

  // Before navigation for every way of following a link: click, middle click, keyboard, context-menu "open in new tab"
  ['mousedown', 'click', 'keydown', 'contextmenu'].forEach(function (type) {
    document.addEventListener(type, decorate, true);
  });
})();
