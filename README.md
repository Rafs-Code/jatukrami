# Jatukrami 🌾

Website undangan pernikahan bertema tradisional **Sunda**. Tugas sekolah RPL (Rekayasa Perangkat Lunak). Seluruh teks website memakai **Bahasa Sunda Lemes**.

## Tech Stack
- HTML5 vanilla
- CSS3 vanilla + CSS Variables (**Design Tokens**)
- JavaScript vanilla (no framework)
- [AOS.js](https://github.com/michalsnik/aos) — animasi scroll (CDN)
- Google Fonts (CDN)
- [Formspree](https://formspree.io) — backend form (gratis)
- Hosting: GitHub → Vercel

## Struktur
```
jatukrami/
├── index.html
├── css/
│   ├── tokens.css      ⭐ DESIGN TOKENS (semua warna, font, spacing, dll)
│   ├── base.css        reset + typography defaults
│   ├── style.css       master (import semua CSS)
│   ├── opening.css     Section 1: amplop
│   ├── intro.css       Section 2: introduction (3 bg responsive)
│   ├── sections.css    Section 3-9
│   └── responsive.css  media queries tambahan
├── js/
│   ├── config.js       ⭐ DATA (tanggal, nama, lokasi, dll)
│   ├── envelope.js     animasi amplop
│   ├── countdown.js    countdown timer
│   ├── gallery.js      galeri & carousel
│   ├── form.js         handler Formspree
│   ├── music.js        toggle background music
│   ├── share.js        salin tautan
│   └── main.js         init AOS dll
└── assets/
    ├── images/  (+ gallery/)
    └── music/
```

## ⭐ Dua Pusat Kontrol
| File | Untuk mengubah |
|------|----------------|
| `css/tokens.css` | Seluruh tampilan visual (warna, font, spacing, shadow, dll). Ganti tema = edit file ini saja. |
| `js/config.js`   | Seluruh data (tanggal, nama mempelai, lokasi, link maps, endpoint Formspree, galeri). |

## Aturan Pengembangan
- 🚫 **NO hardcoded** warna/font/spacing di CSS selain `tokens.css`. Selalu pakai `var(--token-name)`.
- 📱 **Mobile-first** — breakpoint tablet `≥768px`, desktop `≥1024px`.
- 🌾 Semua teks website **Bahasa Sunda Lemes** (halus/formal).
- ⏳ Pengembangan **bertahap**, section demi section.

## Aset yang Disiapkan Manual
Lihat detail ukuran di blueprint. Singkatnya:
- `assets/images/intro-mobile.jpg` (9:16), `intro-tablet.jpg` (3:4), `intro-desktop.jpg` (16:9)
- `assets/images/groom.jpg` & `bride.jpg` (2:3)
- `assets/images/gallery/1.jpg` … `8.jpg` (3:2)
- `assets/music/bg-music.mp3` (instrumental kacapi suling, < 3 MB)

Isi juga di `js/config.js`: `mapsEmbedUrl`, `mapsLink`, `formspreeEndpoint`.

## Cara Menjalankan (lokal)
Buka `index.html` langsung di browser, atau pakai live server:
```bash
npx serve .
```

---
Didamel ku **@xirpl2** 🌾
