/* ==========================================================
   SCROLL PROGRESS BAR — JATUKRAMI
   Simple horizontal bar di top, update width based on scroll position.
   ========================================================== */
(function () {
  'use strict';

  let barEl = null;
  let fillEl = null;
  let scrollTicking = false;

  function buildBar() {
    // Remove old element if exists (defensive)
    const oldBar = document.getElementById('scrollProgress');
    if (oldBar) oldBar.remove();

    // Build new bar
    barEl = document.createElement('div');
    barEl.id = 'scrollProgress';
    barEl.className = 'scroll-progress';
    barEl.setAttribute('aria-hidden', 'true');

    fillEl = document.createElement('div');
    fillEl.className = 'scroll-progress-fill';

    barEl.appendChild(fillEl);
    document.body.appendChild(barEl);
  }

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollableHeight = docHeight - winHeight;

    let progress = 0;
    if (scrollableHeight > 0) {
      progress = (scrollTop / scrollableHeight) * 100;
      progress = Math.min(Math.max(progress, 0), 100);
    }

    if (fillEl) {
      fillEl.style.width = progress + '%';
    }

    scrollTicking = false;
  }

  function onScroll() {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateProgress);
      scrollTicking = true;
    }
  }

  function init() {
    buildBar();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
