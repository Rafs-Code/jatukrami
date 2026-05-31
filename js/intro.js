/* ==========================================================
   INTRO — JATUKRAMI (Section 2: Introduction)
   Populate konten (nama mempelai, tanggal) dari window.CONFIG.
   Handler tombol "Lajeng" → smooth scroll ke #sambutan.
   ========================================================== */
(function () {
  'use strict';

  if (typeof window.CONFIG === 'undefined') {
    console.warn('CONFIG belum loaded. Skip intro.js init.');
    return;
  }

  const C = window.CONFIG;

  const groomLatinEl = document.getElementById('introGroomLatin');
  const brideLatinEl = document.getElementById('introBrideLatin');
  const dateEl = document.getElementById('introDate');
  const scrollBtn = document.getElementById('introScrollBtn');

  if (groomLatinEl && C.groom && C.groom.fullName) {
    groomLatinEl.textContent = C.groom.fullName;
  }
  if (brideLatinEl && C.bride && C.bride.fullName) {
    brideLatinEl.textContent = C.bride.fullName;
  }
  if (dateEl && C.event && C.event.dateDisplay) {
    dateEl.textContent = C.event.dateDisplay;
  }

  // Tombol Lajeng sekarang pakai anchor link native (<a href="#sambutan">).
  // Browser handle smooth scroll via CSS scroll-behavior. Tidak perlu JS handler.
})();
