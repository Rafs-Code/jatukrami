/* ==========================================================
   ENVELOPE — JATUKRAMI (Section 1 logic)
   Animasi amplop opening + trigger music + scroll ke #intro.
   ========================================================== */
(function () {
  'use strict';

  const opening = document.getElementById('opening');
  const envelopeBtn = document.getElementById('envelopeBtn');

  if (!opening || !envelopeBtn) return;

  let isOpened = false;

  function openEnvelope() {
    if (isOpened) return;
    isOpened = true;

    envelopeBtn.classList.add('is-opening');
    envelopeBtn.setAttribute('disabled', 'true');

    playBackgroundMusic();

    setTimeout(function () {
      opening.classList.add('is-opened');
      document.body.style.overflow = '';

      if (window.SmoothScroll && typeof window.SmoothScroll.to === 'function') {
        window.SmoothScroll.to('#intro', 1200);
      } else {
        // Fallback kalau scroll-helper belum loaded
        const intro = document.getElementById('intro');
        if (intro) {
          intro.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 1400);
  }

  function playBackgroundMusic() {
    if (typeof window.CONFIG === 'undefined' || !window.CONFIG.music) return;

    let audio = document.getElementById('bgMusic');
    if (!audio) {
      audio = document.createElement('audio');
      audio.id = 'bgMusic';
      audio.src = window.CONFIG.music.file;
      audio.loop = true;
      audio.volume = window.CONFIG.music.defaultVolume || 0.4;
      document.body.appendChild(audio);
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(function () {
        if (window.MusicToggle && typeof window.MusicToggle.show === 'function') {
          window.MusicToggle.show();
        }
      }).catch(function (err) {
        console.warn('Music autoplay blocked:', err);
        // Show button anyway so user can manually try toggling
        if (window.MusicToggle && typeof window.MusicToggle.show === 'function') {
          window.MusicToggle.show();
        }
      });
    }
  }

  document.body.style.overflow = 'hidden';

  envelopeBtn.addEventListener('click', openEnvelope);

  envelopeBtn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });
})();
