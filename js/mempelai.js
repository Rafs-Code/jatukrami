/* ==========================================================
   MEMPELAI — JATUKRAMI (Section 4: Profil Mempelai)
   Populate konten kedua mempelai dari window.CONFIG.
   ========================================================== */
(function () {
  'use strict';

  if (typeof window.CONFIG === 'undefined') {
    console.warn('CONFIG belum loaded. Skip mempelai.js init.');
    return;
  }

  const C = window.CONFIG;

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && typeof value === 'string') {
      el.textContent = value;
    }
  }

  function setBgImage(id, url) {
    const el = document.getElementById(id);
    if (el && typeof url === 'string') {
      el.style.backgroundImage = "url('" + url + "')";
    }
  }

  function setHref(id, url) {
    const el = document.getElementById(id);
    if (el && typeof url === 'string') {
      el.setAttribute('href', url);
    }
  }

  // BRIDE
  if (C.bride) {
    setBgImage('brideCardPhoto', C.bride.photo);
    setText('brideCardSunda', C.bride.sundaName);
    setText('brideCardLatin', C.bride.fullName);
    setText('brideCardChild', C.bride.child);
    setText('brideCardFather', C.bride.father);
    setText('brideCardMother', C.bride.mother);
    setHref('brideCardIg', C.bride.instagram);
  }

  // GROOM
  if (C.groom) {
    setBgImage('groomCardPhoto', C.groom.photo);
    setText('groomCardSunda', C.groom.sundaName);
    setText('groomCardLatin', C.groom.fullName);
    setText('groomCardChild', C.groom.child);
    setText('groomCardFather', C.groom.father);
    setText('groomCardMother', C.groom.mother);
    setHref('groomCardIg', C.groom.instagram);
  }
})();
