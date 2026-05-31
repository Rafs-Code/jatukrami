/* ==========================================================
   MUSIC — JATUKRAMI
   Background music toggle (mute/unmute) fixed bottom-right.
   Expose window.MusicToggle.show() untuk dipanggil envelope.js.
   ========================================================== */
(function () {
  'use strict';

  const musicToggle = document.getElementById('musicToggle');

  if (!musicToggle) return;

  let isMuted = false;

  function getAudio() {
    return document.getElementById('bgMusic');
  }

  function showButton() {
    musicToggle.classList.remove('is-hidden');
  }

  function toggleMusic() {
    const audio = getAudio();
    if (!audio) return;

    if (isMuted) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(function (err) {
          console.warn('Music play failed:', err);
        });
      }
      isMuted = false;
      musicToggle.classList.remove('is-muted');
      musicToggle.setAttribute('aria-pressed', 'false');
    } else {
      audio.pause();
      isMuted = true;
      musicToggle.classList.add('is-muted');
      musicToggle.setAttribute('aria-pressed', 'true');
    }
  }

  // Expose showButton globally so envelope.js can trigger it
  window.MusicToggle = {
    show: showButton
  };

  musicToggle.addEventListener('click', toggleMusic);

  musicToggle.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMusic();
    }
  });
})();
