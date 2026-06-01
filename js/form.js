/* ==========================================================
   FORM UCAPAN — JATUKRAMI (Section 8: Form Ucapan & Doa)
   Submit ke Formspree + render list ucapan (dummy + new submissions).
   ========================================================== */
(function () {
  'use strict';

  if (typeof window.CONFIG === 'undefined') {
    console.warn('CONFIG belum loaded. Skip form.js init.');
    return;
  }

  // Element refs
  const form = document.getElementById('ucapanForm');
  const nameInput = document.getElementById('ucapanName');
  const nameError = document.getElementById('ucapanNameError');
  const messageInput = document.getElementById('ucapanMessage');
  const messageError = document.getElementById('ucapanMessageError');
  const counterEl = document.getElementById('ucapanCounter');
  const submitBtn = document.getElementById('ucapanSubmit');
  const submitText = submitBtn ? submitBtn.querySelector('.submit-text') : null;
  const statusEl = document.getElementById('ucapanStatus');
  const listEl = document.getElementById('ucapanList');
  const countEl = document.getElementById('ucapanCount');

  if (!form || !nameInput || !messageInput || !listEl) {
    console.warn('Form ucapan elements missing. Skip init.');
    return;
  }

  // State
  let wishes = [];

  // ========== HELPERS ==========

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderWishes() {
    listEl.innerHTML = '';

    if (wishes.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'ucapan-empty';
      empty.textContent = 'Teu acan aya ucapan. Sumangga janten anu kahiji!';
      listEl.appendChild(empty);
    } else {
      wishes.forEach(function (wish) {
        const li = document.createElement('li');
        li.className = 'ucapan-item';

        const isSumping = wish.status === 'Sumping';
        const badgeClass = isSumping ? 'is-sumping' : 'is-not-sumping';

        li.innerHTML =
          '<div class="ucapan-item-header">' +
            '<p class="ucapan-item-name">' + escapeHtml(wish.name) + '</p>' +
            '<span class="ucapan-item-badge ' + badgeClass + '">' +
              escapeHtml(wish.status) +
            '</span>' +
          '</div>' +
          '<p class="ucapan-item-message">' + escapeHtml(wish.message) + '</p>';

        listEl.appendChild(li);
      });
    }

    if (countEl) {
      countEl.textContent = wishes.length;
    }
  }

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove('is-success', 'is-error', 'is-visible');
    if (type) {
      statusEl.classList.add('is-' + type, 'is-visible');
      // Auto-hide success status setelah 5 detik
      if (type === 'success') {
        setTimeout(function () {
          statusEl.classList.remove('is-visible');
        }, 5000);
      }
    }
  }

  function validate() {
    let isValid = true;

    // Reset error states
    nameInput.classList.remove('has-error');
    messageInput.classList.remove('has-error');
    if (nameError) nameError.textContent = '';
    if (messageError) messageError.textContent = '';

    const nameVal = nameInput.value.trim();
    const messageVal = messageInput.value.trim();

    if (nameVal.length < 2) {
      nameInput.classList.add('has-error');
      if (nameError) nameError.textContent = 'Nami kedah diisi (minimal 2 huruf)';
      isValid = false;
    }

    if (messageVal.length < 5) {
      messageInput.classList.add('has-error');
      if (messageError) messageError.textContent = 'Ucapan kedah diisi (minimal 5 huruf)';
      isValid = false;
    }

    return isValid;
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    if (submitText) {
      submitText.textContent = isLoading ? 'Ngintunkeun...' : 'Kintunkeun Ucapan';
    }
  }

  // ========== COUNTER ==========

  function updateCounter() {
    if (!counterEl) return;
    const len = messageInput.value.length;
    const max = messageInput.getAttribute('maxlength') || 500;
    counterEl.textContent = len + ' / ' + max;
  }

  messageInput.addEventListener('input', updateCounter);

  // ========== INIT WISHES (load dummy) ==========

  if (Array.isArray(window.CONFIG.dummyWishes)) {
    wishes = window.CONFIG.dummyWishes.slice(); // copy array
  }

  renderWishes();
  updateCounter();

  // ========== FORM SUBMIT ==========

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData(form);
    const name = nameInput.value.trim();
    const status = formData.get('status') || 'Sumping';
    const message = messageInput.value.trim();

    const endpoint = window.CONFIG.formspreeEndpoint;
    if (!endpoint || typeof endpoint !== 'string') {
      setStatus('Endpoint formspree teu acan disetel. Hapunten.', 'error');
      return;
    }

    setLoading(true);
    setStatus('', null);

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        status: status,
        message: message
      })
    })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response not ok: ' + response.status);
      }
      return response.json();
    })
    .then(function () {
      // Sukses — prepend ucapan baru ke list
      wishes.unshift({
        name: name,
        status: status,
        message: message
      });
      renderWishes();

      // Scroll list ke atas biar ucapan baru keliatan
      if (listEl) {
        listEl.scrollTop = 0;
      }

      setStatus('Hatur nuhun! Ucapan parantos kakintun.', 'success');
      form.reset();
      updateCounter();
    })
    .catch(function (err) {
      console.warn('Form submit error:', err);
      setStatus(
        'Hapunten, aya kasalahan nalika ngintunkeun. Cobian deui.',
        'error'
      );
    })
    .finally(function () {
      setLoading(false);
    });
  });

  // Real-time clear error on input
  nameInput.addEventListener('input', function () {
    if (nameInput.value.trim().length >= 2) {
      nameInput.classList.remove('has-error');
      if (nameError) nameError.textContent = '';
    }
  });

  messageInput.addEventListener('input', function () {
    if (messageInput.value.trim().length >= 5) {
      messageInput.classList.remove('has-error');
      if (messageError) messageError.textContent = '';
    }
  });
})();
