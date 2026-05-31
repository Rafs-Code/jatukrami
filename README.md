# 💌 Jatukrami — Undangan Pernikahan Online

Undangan pernikahan online bertema Sunda untuk Raden Asep Wirajaya & Nyimas 
Euis Nuraeni. Dibangun dengan HTML, CSS, dan JavaScript vanilla (tanpa 
framework).

---

## 📋 Daftar Isi

- [Quick Start](#quick-start)
- [Struktur Project](#struktur-project)
- [Cara Mengubah Data](#cara-mengubah-data)
  - [Mengubah Data Mempelai](#-mengubah-data-mempelai)
  - [Mengubah Detail Acara](#-mengubah-detail-acara)
  - [Menambah atau Mengganti Foto Galeri](#-menambah-atau-mengganti-foto-galeri)
  - [Mengganti Foto Mempelai](#-mengganti-foto-mempelai)
  - [Mengganti Foto Background Intro](#-mengganti-foto-background-intro)
  - [Mengganti Musik Background](#-mengganti-musik-background)
- [Cara Mengubah Tampilan](#cara-mengubah-tampilan)
  - [Mengubah Warna Tema](#-mengubah-warna-tema)
  - [Mengubah Font](#-mengubah-font)
  - [Mengubah Teks Bahasa Sunda](#-mengubah-teks-bahasa-sunda)
- [Setup Formspree (Form Ucapan)](#setup-formspree-form-ucapan)
- [Cara Deploy ke Vercel](#cara-deploy-ke-vercel)
- [Troubleshooting](#troubleshooting)
- [Tech Stack](#tech-stack)

---

## Quick Start

Untuk menjalankan website di komputer:

1. Buka folder project di terminal
2. Jalankan server lokal:
```bash
   # Pilihan 1: Pakai Python
   python -m http.server 8000

   # Pilihan 2: Pakai Node.js
   npx http-server -p 8000

   # Pilihan 3: VS Code "Live Server" extension
   # Klik kanan index.html → "Open with Live Server"
```
3. Buka browser: `http://localhost:8000`

---

## Struktur Project

```

jatukrami/
├── index.html              ← Struktur HTML utama (9 section)
├── README.md               ← File ini
├── css/
│   ├── tokens.css          ← Design tokens (warna, font, spacing)
│   ├── base.css            ← Reset CSS + style dasar
│   ├── style.css           ← Master CSS (import semua file CSS)
│   ├── opening.css         ← Section 1: Opening Amplop
│   ├── intro.css           ← Section 2: Introduction
│   ├── sambutan.css        ← Section 3: Sambutan
│   ├── mempelai.css        ← Section 4: Profil Mempelai
│   ├── acara.css           ← Section 5: Detail Acara
│   ├── countdown.css       ← Section 6: Countdown Timer
│   ├── galeri.css          ← Section 7: Galeri Foto
│   ├── music-toggle.css    ← Tombol musik on/off
│   └── responsive.css      ← Override responsive global
├── js/
│   ├── config.js           ← ★ DATA UTAMA (mempelai, acara, foto, dll)
│   ├── music.js            ← Logic toggle musik
│   ├── scroll-helper.js    ← Smooth scroll helper
│   ├── envelope.js         ← Section 1: Animasi amplop
│   ├── intro.js            ← Section 2: Populate intro dari CONFIG
│   ├── mempelai.js         ← Section 4: Populate profil mempelai
│   ├── acara.js            ← Section 5: Populate detail acara
│   ├── countdown.js        ← Section 6: Logic countdown timer
│   ├── gallery.js          ← Section 7: Logic carousel + lightbox
│   ├── form.js             ← Section 8: Logic form ucapan (Formspree)
│   ├── share.js            ← Section 9: Logic salin tautan
│   └── main.js             ← Init AOS (animasi scroll)
└── assets/
    ├── images/
    │   ├── bride.jpg                ← Foto mempelai wanita
    │   ├── groom.jpg                ← Foto mempelai pria
    │   ├── intro-mobile.jpg         ← BG Section Intro versi mobile
    │   ├── intro-tablet.jpg         ← BG Section Intro versi tablet
    │   ├── intro-desktop.jpg        ← BG Section Intro versi desktop
    │   └── gallery/
    │       ├── 1.jpg ... 8.jpg      ← Foto-foto galeri
    └── music/
        └── bg-music.mp3             ← Musik background

```

**File paling penting yang sering diubah**: `js/config.js`

---

## Cara Mengubah Data

> **⚠️ Sebelum edit apa pun**: Backup folder project dulu! Copy ke folder 
> lain biar kalau ada yang error, bisa balik ke versi sebelumnya.

Semua data utama ada di `js/config.js`. File ini adalah **single source of 
truth** — ubah di sini, semua section ke-update otomatis.

### 👰 Mengubah Data Mempelai

Buka `js/config.js`. Cari section `groom` (pria) dan `bride` (wanita):

```javascript
groom: {
  fullName: 'Raden Asep Wirajaya',
  shortName: 'Asep',
  sundaName: 'ᮛᮓᮦᮔ᮪ ᮃᮞᮨᮕ᮪ ᮝᮤᮛᮏᮚ',  // Aksara Sunda
  child: 'putra kahiji',                  // putra/putri keberapa
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
}
```

**Cara ganti**: Edit string di dalam tanda kutip `'...'`. Tanda kutip 
JANGAN dihapus. Koma di akhir baris JANGAN dihapus.

**Tip aksara Sunda**: Pakai converter online seperti 
[bahtera.org/aksara-sunda](https://www.bahtera.org/) untuk convert nama 
Latin ke aksara Sunda.

---

### 📅 Mengubah Detail Acara

Cari section `event` di `js/config.js`:

```javascript
event: {
  name: "Walimatul 'Urs",
  dateDisplay: 'Saptu, 15 Agustus 2026',
  time: '10.00 — 14.00 WIB',
  venue: 'SMK Negeri 13 Bandung',
  address: 'Jl. Soekarno-Hatta No.10, Jatisari, Kec. Buahbatu, Bandung, Jawa Barat',
  mapsEmbedUrl: '...',  // URL panjang dari Google Maps
  mapsLink: 'https://maps.app.goo.gl/D9keytrSWmBrZxR99'
},

weddingDate: '2026-08-15T08:00:00',   // ★ INI YANG DIPAKAI COUNTDOWN
```

**Penting**: 
- `weddingDate` formatnya `YYYY-MM-DDTHH:MM:SS` (ISO 8601)
- Tahun-Bulan-Tanggal dipisah dengan `-`
- Antara tanggal dan jam pakai huruf `T`
- Jam-Menit-Detik dipisah dengan `:`

**Cara ganti Google Maps embed URL**:

1. Buka [Google Maps](https://maps.google.com)
2. Cari lokasi venue
3. Klik tombol **"Share"** → tab **"Embed a map"**
4. Klik **"COPY HTML"**
5. Dari HTML yang di-copy, ambil URL di dalam `src="..."`
6. Paste ke `mapsEmbedUrl` di config.js

**Cara ganti link Maps biasa**:
1. Buka Google Maps mobile/desktop, cari venue
2. Klik **"Share"** → **"Copy link"**
3. Paste ke `mapsLink` di config.js

---

### 📸 Menambah atau Mengganti Foto Galeri

**Galeri SUDAH OTOMATIS ADAPTIF** — bisa tambah foto sebanyak apa pun tanpa 
ubah HTML/CSS/JS.

#### Cara tambah foto baru:

1. Siapkan foto (rekomendasi: max 2 MB per foto, JPG/PNG)
2. Beri nama sesuai urutan: `9.jpg`, `10.jpg`, dst.
3. Copy ke folder `assets/images/gallery/`
4. Edit `js/config.js`, cari `galleryImages`:

```javascript
galleryImages: [
  'assets/images/gallery/1.jpg',
  'assets/images/gallery/2.jpg',
  'assets/images/gallery/3.jpg',
  'assets/images/gallery/4.jpg',
  'assets/images/gallery/5.jpg',
  'assets/images/gallery/6.jpg',
  'assets/images/gallery/7.jpg',
  'assets/images/gallery/8.jpg',
  'assets/images/gallery/9.jpg',   // ← TAMBAH BARIS BARU
  'assets/images/gallery/10.jpg',  // ← Bisa tambah lagi
],
```

5. Save, refresh browser. Otomatis muncul indicator dots & thumbnail baru.

#### Cara ganti foto yang sudah ada:

Cukup replace file di `assets/images/gallery/`. Nama file harus tetap sama 
(misal `5.jpg`). Refresh browser.

#### Cara hapus foto:

1. Hapus file dari `assets/images/gallery/`
2. Hapus baris yang sesuai di `galleryImages` di `config.js`
3. **Penting**: Rename file sisanya agar berurutan (1, 2, 3, ...). Update 
   path di config.js juga.

---

### 🤵 Mengganti Foto Mempelai

Foto mempelai ada di `assets/images/`:
- `groom.jpg` — foto mempelai pria
- `bride.jpg` — foto mempelai wanita

**Cara ganti**:
1. Siapkan foto baru, rekomendasi portrait 800×1200 pixel, max 1 MB
2. Rename file baru jadi `groom.jpg` atau `bride.jpg`
3. Replace file lama di `assets/images/`
4. Refresh browser

**Tips foto profil bagus**:
- Aspect ratio portrait (lebih tinggi dari lebar)
- Wajah jelas, tidak buram
- Posisi wajah groom menghadap KIRI, bride menghadap KANAN (biar saling 
  hadap di desktop)
- Background tidak terlalu ramai

---

### 🖼️ Mengganti Foto Background Intro

Section Intro pakai 3 foto berbeda untuk responsive:

| File | Ukuran Rekomendasi | Aspect Ratio |
|------|---------------------|--------------|
| `intro-mobile.jpg` | 1080 × 1920 px | Portrait (9:16) |
| `intro-tablet.jpg` | 1536 × 2048 px | Portrait (3:4) |
| `intro-desktop.jpg` | 1920 × 1080 px | Landscape (16:9) |

**Cara ganti**:
1. Siapkan 3 foto sesuai ukuran di atas
2. Rename sesuai daftar
3. Replace file di `assets/images/`
4. Refresh browser

**Tips**: Pakai photo editor (Canva, Photoshop, GIMP) untuk crop foto ke 
ukuran yang tepat. Foto background sebaiknya tidak terlalu ramai di tengah 
karena akan ada teks di atasnya.

---

### 🎵 Mengganti Musik Background

1. Siapkan file MP3 (max 5 MB untuk loading cepat)
2. Rename jadi `bg-music.mp3`
3. Replace file di `assets/music/`
4. Refresh browser

**Tips kompresi MP3**:
- Pakai [tinypng.com/audio](https://tinypng.com) atau aplikasi seperti 
  Audacity untuk kompres
- Bitrate 64-96 kbps mono sudah cukup untuk musik background
- Durasi disarankan 3-8 menit (akan di-loop)

---

## Cara Mengubah Tampilan

### 🎨 Mengubah Warna Tema

Semua warna ada di **satu tempat**: `css/tokens.css`. Ubah di sini, semua 
section ikut berubah.

Buka `css/tokens.css`, cari section COLORS:

```css
/* Primary Brand (Gold) */
--color-primary-100:    #F5E6B8;  /* Gold paling muda */
--color-primary-300:    #E8C77A;  /* Gold muda */
--color-primary-500:    #D4AF37;  /* Gold UTAMA */
--color-primary-700:    #B8860B;  /* Gold gelap */
--color-primary-900:    #8B6508;  /* Gold paling gelap */
```

**Cara ganti warna**:
1. Pilih palette baru di [coolors.co](https://coolors.co) atau 
   [paletton.com](https://paletton.com)
2. Replace nilai hex (`#D4AF37`) dengan warna baru
3. Save, refresh browser

**Penting**: Pakai 5 shade (100, 300, 500, 700, 900) dari light ke dark 
untuk hasil terbaik.

> **⚠️ Catatan**: Ada beberapa hex hardcoded di file CSS untuk ornament SVG 
> (limitasi teknis). Kalau ganti warna utama, cari `#D4AF37` di semua file 
> CSS dan replace manual. Pakai fitur "Find in Files" di VS Code 
> (Ctrl+Shift+F).

---

### 🔤 Mengubah Font

Buka `css/tokens.css`:

```css
--font-heading:         'Cormorant Garamond', serif;   /* Heading */
--font-body:            'Plus Jakarta Sans', sans-serif; /* Body text */
--font-sundanese:       'Noto Sans Sundanese', serif;   /* Aksara Sunda */
```

**Cara ganti font**:
1. Pilih font di [Google Fonts](https://fonts.google.com)
2. Copy nama font (misal `'Playfair Display'`)
3. Replace di tokens.css
4. **Penting**: Update juga import di `index.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=NAMA_FONT_BARU:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

---

### ✏️ Mengubah Teks Bahasa Sunda

Teks UI di setiap section ada di file HTML (`index.html`) dan beberapa 
inject via JS. 

**Untuk teks SAMBUTAN** (Section 3): Edit langsung di `index.html`, cari 
section `id="sambutan"`. Edit isi `<p>` di dalamnya.

**Untuk teks UI pendek** (eyebrow, heading, button): Edit langsung di 
`index.html`.

**Cara mencari kata yang mau diubah**:
1. Buka VS Code, tekan `Ctrl+Shift+F` (Find in Files)
2. Ketik kata yang mau diganti (misal "Sakedap deui")
3. Klik file yang muncul, edit langsung

---

## Setup Formspree (Form Ucapan)

Form ucapan di Section 8 pakai service **Formspree** (gratis untuk 50 
submission/bulan).

### Cara setup:

1. Daftar gratis di [formspree.io](https://formspree.io)
2. Klik **"+ New Form"**
3. Beri nama: "Jatukrami Ucapan"
4. Pilih email penerima (email kamu)
5. Klik **Create Form**
6. Copy form endpoint, biasanya format: `https://formspree.io/f/xxxxxxxxx`
7. Buka `js/config.js`, paste endpoint:

```javascript
formspreeEndpoint: 'https://formspree.io/f/xdajvkbr',  // ← Ganti dengan endpoint kamu
```

8. Save, refresh browser
9. Test kirim ucapan dari website → cek email kamu

---

## Cara Deploy ke Vercel

Vercel = layanan hosting gratis dengan custom domain.

### Step 1: Push ke GitHub

1. Buat repo baru di [github.com](https://github.com) (private/public 
   bebas)
2. Buka terminal di folder project, jalankan:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/jatukrami.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub kamu.

### Step 2: Deploy ke Vercel

1. Daftar di [vercel.com](https://vercel.com) (login pakai GitHub)
2. Klik **"Add New Project"** → pilih repo Jatukrami
3. Framework Preset: **Other** (karena vanilla HTML/CSS/JS)
4. Build Command: kosongkan
5. Output Directory: `.` (titik)
6. Klik **Deploy**
7. Tunggu 30 detik, website siap di `https://jatukrami-xxx.vercel.app`

### Step 3: Custom Domain (Opsional)

1. Beli domain di Namecheap/GoDaddy (misal `asep-euis.com`)
2. Di Vercel dashboard, masuk project → **Settings** → **Domains**
3. Tambah domain custom
4. Ikuti instruksi DNS dari Vercel

---

## Troubleshooting

### ❌ Foto galeri tidak muncul

**Cek**:
- Pastikan file ada di folder `assets/images/gallery/`
- Pastikan nama file sama persis dengan yang di `config.js` (case-sensitive)
- Pastikan ekstensi file `.jpg` (bukan `.JPG` atau `.jpeg`)
- Refresh browser dengan `Ctrl+F5` (clear cache)

### ❌ Musik tidak play

**Penyebab umum**: Browser block autoplay sebelum user interaction.

**Solusi**: User harus klik amplop dulu di Section 1. Musik akan play 
setelah klik.

**Cek juga**:
- File `bg-music.mp3` ada di `assets/music/`
- Buka Console browser (F12) → tab Console → cari error merah

### ❌ Google Maps tidak muncul

**Penyebab**: URL embed salah format.

**Solusi**: Pastikan `mapsEmbedUrl` di config.js dimulai dengan 
`https://www.google.com/maps/embed?...`, BUKAN URL share biasa.

### ❌ Tampilan rusak setelah edit CSS

**Cara revert**:
1. Backup folder project sebelum edit
2. Kalau lupa backup, pakai Git untuk revert:
```bash
   git checkout css/file-yang-error.css
```

### ❌ Form ucapan tidak terkirim

**Cek**:
- `formspreeEndpoint` di config.js valid
- Akun Formspree aktif & belum exceed quota (50/bulan free tier)
- Cek email spam folder

---

## Tech Stack

| Tech | Versi | Fungsi |
|------|-------|--------|
| HTML5 | - | Struktur halaman |
| CSS3 | - | Styling (CSS Variables, Grid, Flexbox) |
| JavaScript ES6+ | Vanilla | Logic interaktif |
| [AOS](https://michalsnik.github.io/aos/) | 2.3.1 | Scroll animations |
| [Google Fonts](https://fonts.google.com) | - | Cormorant Garamond, Plus Jakarta Sans, Noto Sans Sundanese, Amiri |
| [Formspree](https://formspree.io) | - | Form backend (kirim ucapan) |
| [Google Maps Embed](https://developers.google.com/maps) | - | Peta lokasi acara |

**Hosting**: [Vercel](https://vercel.com) (free tier)

---

## Credit

- 🎨 Design & Development: Raffa (`@xirpl2`)
- 💝 Untuk: Asep & Euis (tugas RPL — SMK Negeri 13 Bandung)
- 🌾 Bahasa: Sunda Lemes

---

Made with ❤️ in Bandung
