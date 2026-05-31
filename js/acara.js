/* ==========================================================
   ACARA — JATUKRAMI (Section 5: Detail Acara)
   Populate konten dari window.CONFIG.event + iframe src + maps link.
   ========================================================== */
(function () {
  'use strict';

  if (typeof window.CONFIG === 'undefined' || !window.CONFIG.event) {
    console.warn('CONFIG.event belum loaded. Skip acara.js init.');
    return;
  }

  const E = window.CONFIG.event;

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && typeof value === 'string') {
      el.textContent = value;
    }
  }

  function setHref(id, url) {
    const el = document.getElementById(id);
    if (el && typeof url === 'string') {
      el.setAttribute('href', url);
    }
  }

  function setIframeSrc(id, url) {
    const el = document.getElementById(id);
    if (el && typeof url === 'string') {
      el.setAttribute('src', url);
    }
  }

  setText('acaraEventName', E.name);
  setText('acaraDate', E.dateDisplay);
  setText('acaraTime', E.time);
  setText('acaraVenue', E.venue);
  setText('acaraAddress', E.address);
  setHref('acaraMapsLink', E.mapsLink);
  setIframeSrc('acaraMapEmbed', E.mapsEmbedUrl);
})();
