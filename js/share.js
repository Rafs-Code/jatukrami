/* ==========================================================
   SHARE — JATUKRAMI (Section 9: Footer)
   Tombol salin tautan undangan ke clipboard.
   ========================================================== */
(function () {
  'use strict';

  const shareBtn = document.getElementById('footerShareBtn');
  const shareText = document.getElementById('footerShareText');

  if (!shareBtn || !shareText) {
    return;
  }

  const TEXT_DEFAULT = 'Salin Tautan';
  const TEXT_COPIED = 'Tautan Disalin!';
  const TEXT_ERROR = 'Gagal Nyalin';
  const RESET_DELAY = 2000;

  let resetTimeout = null;

  function setCopiedState() {
    shareBtn.classList.add('is-copied');
    shareText.textContent = TEXT_COPIED;
    if (resetTimeout) clearTimeout(resetTimeout);
    resetTimeout = setTimeout(resetState, RESET_DELAY);
  }

  function setErrorState() {
    shareText.textContent = TEXT_ERROR;
    if (resetTimeout) clearTimeout(resetTimeout);
    resetTimeout = setTimeout(resetState, RESET_DELAY);
  }

  function resetState() {
    shareBtn.classList.remove('is-copied');
    shareText.textContent = TEXT_DEFAULT;
    resetTimeout = null;
  }

  function fallbackCopy(text) {
    // Fallback untuk browser lama atau context non-secure
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    textarea.setAttribute('readonly', '');
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 99999);

    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {
      success = false;
    }

    document.body.removeChild(textarea);
    return success;
  }

  function copyLink() {
    const url = window.location.href;

    // Modern Clipboard API (only available in secure context — HTTPS/localhost)
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url)
        .then(setCopiedState)
        .catch(function () {
          // Fallback kalau Clipboard API gagal
          if (fallbackCopy(url)) {
            setCopiedState();
          } else {
            setErrorState();
          }
        });
    } else {
      // Fallback untuk browser lama / non-secure context
      if (fallbackCopy(url)) {
        setCopiedState();
      } else {
        setErrorState();
      }
    }
  }

  shareBtn.addEventListener('click', copyLink);

  shareBtn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyLink();
    }
  });
})();
