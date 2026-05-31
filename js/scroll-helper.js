/* ==========================================================
   SCROLL HELPER — JATUKRAMI
   Smooth scroll dengan duration custom + easing function.
   Expose window.SmoothScroll.to() dan .by().
   Honor prefers-reduced-motion.
   ========================================================== */
(function () {
  'use strict';

  // Easing function: easeOutCubic — responsif di awal, smooth di akhir
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /**
   * Smooth scroll ke element tertentu dengan duration custom.
   * @param {HTMLElement|string} target - element atau selector
   * @param {number} duration - durasi animasi dalam ms (default 1000)
   * @param {number} offset - offset dari top (default 0, untuk fixed header)
   */
  function smoothScrollTo(target, duration, offset) {
    duration = duration || 1000;
    offset = offset || 0;

    // Honor prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      duration = 0;
    }

    const targetEl = typeof target === 'string'
      ? document.querySelector(target)
      : target;

    if (!targetEl) {
      console.warn('smoothScrollTo: target not found', target);
      return;
    }

    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const targetRect = targetEl.getBoundingClientRect();
    const targetY = targetRect.top + startY - offset;
    const distance = targetY - startY;

    if (duration === 0) {
      window.scrollTo(0, targetY);
      return;
    }

    let startTime = null;

    function step(currentTime) {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (elapsed < duration) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  /**
   * Smooth scroll by amount (relative to current position).
   * @param {number} amount - pixels to scroll
   * @param {number} duration - durasi dalam ms
   */
  function smoothScrollBy(amount, duration) {
    duration = duration || 1000;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      window.scrollBy(0, amount);
      return;
    }

    const startY = window.pageYOffset || document.documentElement.scrollTop;
    let startTime = null;

    function step(currentTime) {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutCubic(progress);

      window.scrollTo(0, startY + amount * ease);

      if (elapsed < duration) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  // Expose ke global biar file lain bisa pakai
  window.SmoothScroll = {
    to: smoothScrollTo,
    by: smoothScrollBy
  };
})();
