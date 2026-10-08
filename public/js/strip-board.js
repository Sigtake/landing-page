(function () {
  var doc = document.documentElement;
  var motionOk = doc.classList.contains('st-motion') && 'animate' in Element.prototype;
  var EASE = 'cubic-bezier(.16, 1, .3, 1)';

  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  /* ---------- Nav ---------- */
  var nav = document.querySelector('.st-nav');
  var toggle = document.querySelector('.st-navtoggle');
  var links = document.getElementById('st-nav-links');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  if (toggle && links) {
    var setNav = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      links.classList.toggle('st-closed', !open);
    };
    setNav(false);
    toggle.addEventListener('click', function () { setNav(toggle.getAttribute('aria-expanded') !== 'true'); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setNav(false); toggle.focus(); }
    });
  }

  /* ---------- Tabs (features + code) ---------- */
  function initTabs(list, onChange) {
    var tabs = [].slice.call(list.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
      if (onChange) onChange(tab.getAttribute('aria-controls'));
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t, false); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') n = tabs[0];
        if (e.key === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  }
  var featureTabs = document.querySelector('.st-tabs');
  if (featureTabs) {
    var shots = [].slice.call(document.querySelectorAll('.st-shot[data-for]'));
    initTabs(featureTabs, function (panelId) {
      shots.forEach(function (s) {
        var on = s.getAttribute('data-for') === panelId;
        s.hidden = !on;
        s.classList.remove('is-in');
        if (on && motionOk) { void s.offsetWidth; s.classList.add('is-in'); }
      });
    });
  }
  var codeTabs = document.querySelector('.st-code-tabs');
  if (codeTabs) initTabs(codeTabs);

  /* ---------- Count-ups ---------- */
  function countTo(el, to, ms) {
    if (!motionOk) { el.textContent = '×' + to; return Promise.resolve(); }
    return new Promise(function (resolve) {
      var start = performance.now();
      function frame(now) {
        var p = Math.min(1, (now - start) / ms);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = '×' + Math.max(1, Math.round(eased * to));
        if (p < 1) requestAnimationFrame(frame); else resolve();
      }
      requestAnimationFrame(frame);
    });
  }
  var problemCount = document.querySelector('.st-onerow-count');
  if (problemCount && motionOk && 'IntersectionObserver' in window) {
    problemCount.textContent = '×1';
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { io.disconnect(); countTo(problemCount, 47, 1600); }
    }, { threshold: .6 });
    io.observe(problemCount);
  }

  /* ---------- Hero strip board ---------- */
  var stage = document.querySelector('.st-stage');
  if (!stage) return;
  var dups = [].slice.call(stage.querySelectorAll('.st-row.is-dup'));
  var merged = stage.querySelector('.st-row.is-merged');
  var count = merged && merged.querySelector('.st-count');
  var tally = merged && merged.querySelector('.st-tally');
  var later = [].slice.call(stage.querySelectorAll('.st-group:not(:first-of-type) .st-row'));
  var slack = stage.querySelector('.st-channels li');
  var sources = [].slice.call(stage.querySelectorAll('.st-sources li'));

  function show(el, delay, from) {
    return el.animate([from || { opacity: 0, transform: 'translateX(-28px)' }, { opacity: 1, transform: 'none' }],
      { duration: 460, delay: delay, easing: EASE, fill: 'both' }).finished;
  }

  async function play() {
    later.forEach(function (row) { row.style.opacity = '0'; });
    stage.classList.remove('st-pre');
    sources[0].animate([{ boxShadow: '0 0 0 0 rgba(45,212,191,.55)' }, { boxShadow: '0 0 0 10px rgba(45,212,191,0)' }],
      { duration: 900, easing: 'ease-out' });
    dups.forEach(function (row, i) { show(row, 120 + i * 140); });
    count.textContent = '×1';
    tally.style.clipPath = 'inset(0 100% 0 0)';
    await show(merged, 120 + dups.length * 140, { opacity: 0, transform: 'scaleY(.4)' });

    var target = merged.getBoundingClientRect();
    var ghosts = dups.map(function (row, i) {
      var r = row.getBoundingClientRect();
      var ghost = row.cloneNode(true);
      ghost.classList.add('st-ghost');
      ghost.style.cssText = 'position:absolute;left:' + row.offsetLeft + 'px;top:' + row.offsetTop + 'px;width:' + row.offsetWidth + 'px;margin:0;pointer-events:none;z-index:2';
      stage.querySelector('.st-app').appendChild(ghost);
      return ghost.animate([
        { transform: 'translateY(0)', opacity: .9 },
        { transform: 'translateY(' + (target.top - r.top) + 'px)', opacity: 0 }
      ], { duration: 520, delay: i * 110, easing: 'cubic-bezier(.5, 0, .2, 1)', fill: 'forwards' }).finished
        .then(function () { ghost.remove(); });
    });
    tally.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }],
      { duration: 1500, delay: 200, easing: 'cubic-bezier(.3, 0, .2, 1)', fill: 'forwards' })
      .finished.then(function () { tally.style.clipPath = ''; });
    merged.animate([{ backgroundColor: '#2a1a1d' }, { backgroundColor: '#121821' }], { duration: 1600, easing: 'ease-out' });
    await Promise.all([countTo(count, 25, 1700)].concat(ghosts));

    later.forEach(function (row, i) {
      row.style.opacity = '';
      show(row, i * 140);
    });
    await wait(later.length * 140 + 200);
    slack.animate([
      { boxShadow: '0 0 0 0 rgba(45,212,191,.6), 0 1px 2px rgba(15,50,60,.05)' },
      { boxShadow: '0 0 0 12px rgba(45,212,191,0), 0 1px 2px rgba(15,50,60,.05)' }
    ], { duration: 1100, easing: 'ease-out' });
    stage.classList.add('is-done');
  }

  if (motionOk) {
    var started = false;
    var go = function () { if (!started) { started = true; play(); } };
    if (document.readyState === 'complete') requestAnimationFrame(go);
    else window.addEventListener('load', function () { requestAnimationFrame(go); });
    setTimeout(go, 1800);
  }

  stage.addEventListener('click', function (e) {
    var row = e.target.closest('.st-row');
    if (!row || row.classList.contains('st-ghost')) return;
    var sev = row.getAttribute('data-sev');
    if (sev === 'resolved') return;
    if (sev === 'ack') {
      row.setAttribute('data-sev', 'resolved');
      if (motionOk) row.animate([{ opacity: 1 }, { opacity: .55 }], { duration: 300, fill: 'forwards' });
      else row.style.opacity = '.55';
    } else {
      row.setAttribute('data-sev', 'ack');
    }
  });
})();
