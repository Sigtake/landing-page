(function () {
  var nav = document.querySelector('.st-nav');
  var toggle = document.querySelector('.st-navtoggle');
  var links = document.getElementById('st-nav-links');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  if (!toggle || !links) return;
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
})();
