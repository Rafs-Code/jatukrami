/* ==========================================================
   COUNTDOWN — JATUKRAMI (Section 6: Countdown Timer)
   3 state: before, ongoing, ended.
   Update setiap 1 detik saat BEFORE.
   ========================================================== */
(function () {
  'use strict';

  if (typeof window.CONFIG === 'undefined' || !window.CONFIG.weddingDate) {
    console.warn('CONFIG.weddingDate belum loaded. Skip countdown.js init.');
    return;
  }

  const beforeEl = document.getElementById('countdownBefore');
  const ongoingEl = document.getElementById('countdownOngoing');
  const endedEl = document.getElementById('countdownEnded');
  const daysEl = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minutesEl = document.getElementById('cdMinutes');
  const secondsEl = document.getElementById('cdSeconds');
  const dateDisplayEl = document.getElementById('cdDateDisplay');

  if (!beforeEl || !ongoingEl || !endedEl) {
    console.warn('Countdown state elements missing. Skip init.');
    return;
  }

  const weddingISO = window.CONFIG.weddingDate;
  const weddingDateObj = new Date(weddingISO);

  const eventStart = new Date(weddingDateObj);
  eventStart.setHours(10, 0, 0, 0);

  const eventEnd = new Date(weddingDateObj);
  eventEnd.setHours(14, 0, 0, 0);

  if (dateDisplayEl && window.CONFIG.event && window.CONFIG.event.dateDisplay) {
    dateDisplayEl.textContent = window.CONFIG.event.dateDisplay;
  }

  function pad2(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function showState(stateName) {
    beforeEl.classList.add('is-hidden');
    ongoingEl.classList.add('is-hidden');
    endedEl.classList.add('is-hidden');

    if (stateName === 'before') beforeEl.classList.remove('is-hidden');
    else if (stateName === 'ongoing') ongoingEl.classList.remove('is-hidden');
    else if (stateName === 'ended') endedEl.classList.remove('is-hidden');
  }

  let intervalId = null;

  function updateCountdown() {
    const now = new Date();

    if (now > eventEnd) {
      showState('ended');
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      return;
    }

    if (now >= eventStart && now <= eventEnd) {
      showState('ongoing');
      return;
    }

    showState('before');

    const diff = eventStart.getTime() - now.getTime();

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = pad2(days);
    if (hoursEl) hoursEl.textContent = pad2(hours);
    if (minutesEl) minutesEl.textContent = pad2(minutes);
    if (secondsEl) secondsEl.textContent = pad2(seconds);
  }

  updateCountdown();
  intervalId = setInterval(updateCountdown, 1000);
})();
