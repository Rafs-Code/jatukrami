/* ==========================================================
   CONFIG — JATUKRAMI
   Pusat kontrol data. Ganti tanggal/nama/lokasi cukup di sini.
   ========================================================== */
const CONFIG = {
  // ============ TANGGAL PERNIKAHAN ============
  weddingDate: '2026-08-15T08:00:00',

  // ============ MEMPELAI ============
  groom: {
    fullName: 'Raden Asep Wirajaya',
    shortName: 'Asep',
    sundaName: 'ᮛᮓᮦᮔ᮪ ᮃᮞᮨᮕ᮪ ᮝᮤᮛᮏᮚ',
    child: 'putra kahiji',
    father: 'Bapa H. Endang Wirajaya',
    mother: 'Ibu Hj. Siti Rohmah',
    instagram: 'https://instagram.com/asep_dummy',
    photo: 'assets/images/groom.jpg'
  },
  bride: {
    fullName: 'Nyimas Euis Nuraeni',
    shortName: 'Euis',
    sundaName: 'ᮑᮤᮙᮞ᮪ ᮇᮄᮞ᮪ ᮔᮥᮛᮍᮨᮔᮤ',
    child: 'putri bungsu',
    father: 'Bapa H. Dadang Sutisna',
    mother: 'Ibu Hj. Aisyah',
    instagram: 'https://instagram.com/euis_dummy',
    photo: 'assets/images/bride.jpg'
  },

  // ============ ACARA (resepsi aja) ============
  event: {
    name: 'Walimatul \'Urs',
    dateDisplay: 'Saptu, 15 Agustus 2026',
    time: '10.00 — 14.00 WIB',
    venue: 'Gedung Sasana Budaya Ganesha',
    address: 'Jl. Tamansari No.73, Bandung, Jawa Barat',
    mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
    mapsLink: 'https://maps.app.goo.gl/...'
  },

  // ============ FORMSPREE ENDPOINT ============
  formspreeEndpoint: 'https://formspree.io/f/XXXXXX',

  // ============ BACKGROUND MUSIC ============
  musicFile: 'assets/music/bg-music.mp3',
  musicAutoplay: true,

  // ============ GALERI ============
  galleryImages: [
    'assets/images/gallery/1.jpg',
    'assets/images/gallery/2.jpg',
    'assets/images/gallery/3.jpg',
    'assets/images/gallery/4.jpg',
    'assets/images/gallery/5.jpg',
    'assets/images/gallery/6.jpg',
    'assets/images/gallery/7.jpg',
    'assets/images/gallery/8.jpg'
  ],

  // ============ DUMMY UCAPAN (testimoni section) ============
  dummyWishes: [
    { name: 'Kang Dadang', status: 'Sumping', message: 'Wilujeng nikah, mugia janten kulawarga sakinah.' },
    { name: 'Teh Neneng', status: 'Sumping', message: 'Bagja pisan ningali sadérék bagja, wilujeng!' },
    { name: 'Mang Ujang', status: 'Teu Tiasa Sumping', message: 'Hapunten teu tiasa sumping, mugi lancar acarana.' }
  ],

  // ============ CREDIT ============
  credit: '@xirpl2'
};
