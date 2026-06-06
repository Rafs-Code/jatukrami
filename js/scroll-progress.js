/* ==========================================================
   SECTION NAVIGATOR RAIL — JATUKRAMI Wave 1 v2 Prompt 1C (FIXED)
   Vertical rail + 8 dots + tooltip + toggle.
   Detection: scroll position-based (reliable untuk semua tinggi section).
   ========================================================== */
(function () {
  'use strict';

  // 8 section configuration (skip #opening — splash modal)
  const SECTIONS = [
    { id: 'intro',     label: 'Pambuka' },
    { id: 'sambutan',  label: 'Sambutan' },
    { id: 'mempelai',  label: 'Mempelai' },
    { id: 'acara',     label: 'Acara' },
    { id: 'countdown', label: 'Énjing' },
    { id: 'galeri',    label: 'Galeri' },
    { id: 'ucapan',    label: 'Ucapan' },
    { id: 'footer',    label: 'Panutup' }
  ];

  const STORAGE_KEY = 'jatukrami_navrail_hidden';
  const TOOLTIP_AUTO_DURATION = 2000;
  // Detection point: 40% dari top viewport (intuitive untuk active section)
  const DETECTION_OFFSET_RATIO = 0.4;

  let railEl = null;
  let progressEl = null;
  let showBtnEl = null;
  let dotEls = [];
  let tooltipTimers = {};
  let currentActiveIdx = -1;
  let scrollTicking = false;

  // ===== BUILD UI =====
  function buildRail() {
    const oldBar = document.getElementById('scrollProgress');
    if (oldBar) oldBar.remove();

    railEl = document.createElement('aside');
    railEl.className = 'section-nav-rail';
    railEl.setAttribute('aria-label', 'Navigasi section undangan');

    const track = document.createElement('div');
    track.className = 'nav-rail-track';

    progressEl = document.createElement('div');
    progressEl.className = 'nav-rail-progress';
    track.appendChild(progressEl);

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'nav-rail-dots';
    dotsContainer.setAttribute('role', 'tablist');

    SECTIONS.forEach(function (section, idx) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'nav-rail-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Ka section ' + section.label);
      dot.setAttribute('data-section-id', section.id);
      dot.setAttribute('data-label', section.label);
      dot.setAttribute('data-section-idx', idx);

      dot.addEventListener('click', function () {
        scrollToSection(section.id);
      });

      dotsContainer.appendChild(dot);
      dotEls.push(dot);
    });

    track.appendChild(dotsContainer);
    railEl.appendChild(track);

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'nav-rail-toggle';
    toggleBtn.setAttribute('aria-label', 'Sumput navigasi');
    toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
    toggleBtn.addEventListener('click', hideRail);
    railEl.appendChild(toggleBtn);

    document.body.appendChild(railEl);

    showBtnEl = document.createElement('button');
    showBtnEl.type = 'button';
    showBtnEl.className = 'nav-rail-show-btn';
    showBtnEl.setAttribute('aria-label', 'Tampilkeun navigasi');
    showBtnEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
    showBtnEl.addEventListener('click', showRail);
    document.body.appendChild(showBtnEl);
  }

  // ===== STATE PERSISTENCE =====
  function loadHiddenState() {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function saveHiddenState(isHidden) {
    try {
      if (isHidden) localStorage.setItem(STORAGE_KEY, '1');
      else localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  function hideRail() {
    railEl.classList.add('is-rail-hidden');
    showBtnEl.classList.add('is-show-btn-visible');
    saveHiddenState(true);
  }

  function showRail() {
    railEl.classList.remove('is-rail-hidden');
    showBtnEl.classList.remove('is-show-btn-visible');
    saveHiddenState(false);
  }

  // ===== SCROLL NAVIGATION =====
  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (window.SmoothScroll && typeof window.SmoothScroll.scrollTo === 'function') {
      window.SmoothScroll.scrollTo(target, { duration: 800 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ===== ACTIVE SECTION DETECTION (scroll position-based) =====
  // Loops through sections and finds which one contains the detection
  // point (40% from top of viewport). Fallback to closest section center
  // if no direct match (handles edge cases at very top/bottom of page).
  function updateActiveSection() {
    const winHeight = window.innerHeight;
    const detectionY = winHeight * DETECTION_OFFSET_RATIO;

    let directMatchIdx = -1;
    let closestIdx = -1;
    let closestDistance = Infinity;

    for (let i = 0; i < SECTIONS.length; i++) {
      const el = document.getElementById(SECTIONS[i].id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();

      // Direct match: detection line is within section bounds
      if (rect.top <= detectionY && rect.bottom >= detectionY) {
        directMatchIdx = i;
        break;
      }

      // Track closest for fallback
      const center = rect.top + (rect.height / 2);
      const distance = Math.abs(center - detectionY);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIdx = i;
      }
    }

    const targetIdx = directMatchIdx !== -1 ? directMatchIdx : closestIdx;

    if (targetIdx !== -1) {
      setActiveSection(targetIdx);
    }
  }

  function setActiveSection(idx) {
    if (idx === currentActiveIdx) return;

    dotEls.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === idx);
    });

    currentActiveIdx = idx;
    triggerAutoTooltip(idx);
  }

  function triggerAutoTooltip(idx) {
    if (idx < 0 || idx >= dotEls.length) return;

    const dot = dotEls[idx];

    if (tooltipTimers[idx]) {
      clearTimeout(tooltipTimers[idx]);
      delete tooltipTimers[idx];
    }

    dot.classList.add('is-tooltip-auto');

    tooltipTimers[idx] = setTimeout(function () {
      dot.classList.remove('is-tooltip-auto');
      delete tooltipTimers[idx];
    }, TOOLTIP_AUTO_DURATION);
  }

  // ===== PROGRESS UPDATE =====
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

    if (progressEl) {
      progressEl.style.height = progress + '%';
    }

    // Update active section di frame yang sama (synced, no flicker)
    updateActiveSection();

    scrollTicking = false;
  }

  function onScroll() {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateProgress);
      scrollTicking = true;
    }
  }

  // ===== INIT =====
  function init() {
    buildRail();

    if (loadHiddenState()) {
      railEl.classList.add('is-rail-hidden');
      showBtnEl.classList.add('is-show-btn-visible');
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial state
    updateProgress();
    // Trigger first detection sedikit delayed biar layout udah stable
    setTimeout(updateActiveSection, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
