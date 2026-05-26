/* ==========================================================
   MAIN — JATUKRAMI
   Inisialisasi global: AOS (scroll animation), dll.
   Dimuat paling terakhir setelah semua modul lain.
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Init AOS (scroll reveal) — durasi mengikuti --transition-slower (800ms)
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }
});
