/* ==========================================================
   GALERI — JATUKRAMI (Section 7: Galeri Foto)
   Hero carousel auto-play + thumbnails + lightbox.
   ========================================================== */
(function () {
  'use strict';

  if (typeof window.CONFIG === 'undefined' || !Array.isArray(window.CONFIG.galleryImages)) {
    console.warn('CONFIG.galleryImages belum loaded. Skip gallery.js init.');
    return;
  }

  const images = window.CONFIG.galleryImages;
  if (images.length === 0) return;

  const heroEl = document.getElementById('galeriHero');
  const dotsEl = document.getElementById('galeriDots');
  const thumbsEl = document.getElementById('galeriThumbs');
  const arrowPrev = document.getElementById('galeriArrowPrev');
  const arrowNext = document.getElementById('galeriArrowNext');
  const lightboxEl = document.getElementById('galeriLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!heroEl || !dotsEl || !thumbsEl) {
    console.warn('Galeri elements missing. Skip init.');
    return;
  }

  let currentIndex = 0;
  let autoplayTimer = null;
  let isVisible = true;
  let isHovered = false;
  let isLightboxOpen = false;
  const AUTOPLAY_INTERVAL = 4000;

  // ========== BUILD UI ==========

  function buildHero() {
    heroEl.innerHTML = '';
    images.forEach(function (src, idx) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Foto galeri ' + (idx + 1);
      img.loading = 'lazy';
      if (idx === 0) img.classList.add('is-active');
      heroEl.appendChild(img);
    });
  }

  function buildDots() {
    dotsEl.innerHTML = '';
    images.forEach(function (_, idx) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'galeri-dot';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', 'Foto ' + (idx + 1));
      if (idx === 0) btn.classList.add('is-active');

      const num = document.createElement('span');
      num.className = 'galeri-dot-num';
      num.textContent = (idx + 1);
      num.setAttribute('aria-hidden', 'true');
      btn.appendChild(num);

      btn.addEventListener('click', function () {
        goToImage(idx);
        resetAutoplay();
      });
      dotsEl.appendChild(btn);
    });
  }

  function buildThumbs() {
    thumbsEl.innerHTML = '';
    images.forEach(function (src, idx) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'galeri-thumb';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', 'Pilih foto ' + (idx + 1));
      if (idx === 0) btn.classList.add('is-active');

      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Thumbnail foto ' + (idx + 1);
      img.loading = 'lazy';
      btn.appendChild(img);

      btn.addEventListener('click', function () {
        goToImage(idx);
        resetAutoplay();
        scrollThumbIntoView(idx);
      });

      thumbsEl.appendChild(btn);
    });
  }

  // ========== NAVIGATION ==========

  function goToImage(idx) {
    if (idx === currentIndex) return;
    if (idx < 0 || idx >= images.length) return;

    const heroImgs = heroEl.querySelectorAll('img');
    heroImgs.forEach(function (img, i) {
      img.classList.toggle('is-active', i === idx);
    });

    const dots = dotsEl.querySelectorAll('.galeri-dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === idx);
    });

    const thumbs = thumbsEl.querySelectorAll('.galeri-thumb');
    thumbs.forEach(function (thumb, i) {
      thumb.classList.toggle('is-active', i === idx);
    });

    currentIndex = idx;
  }

  function nextImage() {
    const next = (currentIndex + 1) % images.length;
    goToImage(next);
    scrollThumbIntoView(next);
  }

  function prevImage() {
    const prev = (currentIndex - 1 + images.length) % images.length;
    goToImage(prev);
    scrollThumbIntoView(prev);
  }

  function scrollThumbIntoView(idx) {
    const thumb = thumbsEl.querySelectorAll('.galeri-thumb')[idx];
    if (thumb && typeof thumb.scrollIntoView === 'function') {
      thumb.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }

  // ========== AUTOPLAY ==========

  function startAutoplay() {
    stopAutoplay();
    if (!isVisible || isHovered || isLightboxOpen) return;
    autoplayTimer = setInterval(nextImage, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        isVisible = entry.isIntersecting;
        if (isVisible) startAutoplay();
        else stopAutoplay();
      });
    }, { threshold: 0.2 });

    const section = document.getElementById('galeri');
    if (section) observer.observe(section);
  }

  heroEl.addEventListener('mouseenter', function () {
    isHovered = true;
    stopAutoplay();
  });

  heroEl.addEventListener('mouseleave', function () {
    isHovered = false;
    if (!isLightboxOpen) startAutoplay();
  });

  // ========== ARROW NAV ==========

  if (arrowPrev) {
    arrowPrev.addEventListener('click', function () {
      prevImage();
      resetAutoplay();
    });
  }

  if (arrowNext) {
    arrowNext.addEventListener('click', function () {
      nextImage();
      resetAutoplay();
    });
  }

  // ========== LIGHTBOX ==========

  function openLightbox() {
    if (!lightboxEl || !lightboxImg) return;
    lightboxImg.src = images[currentIndex];
    lightboxImg.alt = 'Foto galeri ' + (currentIndex + 1) + ' fullscreen';
    lightboxEl.classList.remove('is-hidden');
    isLightboxOpen = true;
    stopAutoplay();
    document.body.style.overflow = 'hidden';
    lightboxEl.focus();
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.add('is-hidden');
    isLightboxOpen = false;
    document.body.style.overflow = '';
    if (isVisible && !isHovered) startAutoplay();
  }

  heroEl.addEventListener('click', openLightbox);

  heroEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox();
    }
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxEl) {
    lightboxEl.addEventListener('click', function (e) {
      if (e.target === lightboxEl) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isLightboxOpen) closeLightbox();
  });

  // ========== INIT ==========

  buildHero();
  buildDots();
  buildThumbs();
  startAutoplay();
})();
