# 🏭 Mega Pabrik Tycoon — Panduan Rilis Play Store

## 📁 Isi Paket PWA Ini
```
pabrik-tycoon-pwa/
├── index.html       ← Game utama (PWA-ready)
├── manifest.json    ← Konfigurasi app
├── sw.js            ← Service Worker (offline support)
├── icons/           ← Icon semua ukuran
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
└── README.md        ← File ini
```

---

## 🚀 LANGKAH RILIS KE PLAY STORE

### STEP 1 — Upload ke Hosting Gratis (WAJIB)
PWA harus punya URL online. Gunakan salah satu:

**Opsi A: GitHub Pages (Gratis, Direkomendasikan)**
1. Daftar di github.com (gratis)
2. Buat repository baru, nama: `pabrik-tycoon`
3. Upload semua file dari folder ini
4. Pergi ke Settings → Pages → Source: main branch
5. URL kamu: `https://username.github.io/pabrik-tycoon`

**Opsi B: Netlify (Gratis, Lebih Mudah)**
1. Buka netlify.com
2. Drag & drop folder ini ke Netlify
3. Dapat URL: `https://xxxxxx.netlify.app`

---

### STEP 2 — Test PWA Score
1. Buka URL-mu di Chrome Android
2. Chrome DevTools (F12) → Lighthouse → Generate Report
3. Target: PWA Score 90+

---

### STEP 3 — Buat APK via PWABuilder
1. Buka **pwabuilder.com**
2. Masukkan URL game-mu (dari Step 1)
3. Klik "Start" → tunggu analisis
4. Pilih **"Android"** → Download Package
5. Kamu dapat file `.apk` dan `.aab`

---

### STEP 4 — Daftar Google Play Console
1. Buka play.google.com/console
2. Bayar biaya pendaftaran: **$25 (sekali seumur hidup)**
3. Isi data developer (nama, email, dll)

---

### STEP 5 — Submit Game
1. Di Play Console → Buat App Baru
2. Isi informasi:
   - **Nama**: Mega Pabrik Tycoon
   - **Deskripsi**: Bangun kerajaan industri dari nol!
   - **Kategori**: Games → Simulation/Casual
   - **Rating**: Everyone (semua umur)
3. Upload file `.aab` dari PWABuilder
4. Upload screenshot (minimal 2)
5. Isi Privacy Policy (wajib):
   - Bisa pakai: app-privacy-policy-generator.firebaseapp.com
6. Submit untuk review

**Review time: 1-7 hari kerja**

---

## 💡 TIPS PENTING

### Monetisasi (Cara Dapat Uang)
Setelah di Play Store, kamu bisa tambah:
- 📱 **Google AdMob** — iklan dalam game (gratis setup)
- 💎 **In-App Purchase** — jual upgrade premium
- 🎮 **Remove Ads** — bayar $1-2 untuk tanpa iklan

### Syarat Lolos Review Play Store
✅ Privacy Policy harus ada
✅ Tidak ada konten 18+
✅ Tidak ada malware
✅ Icon harus jelas & profesional
✅ Screenshot harus menampilkan gameplay nyata
✅ Deskripsi tidak menyesatkan

---

## ❓ FAQ

**Q: Berapa lama sampai live?**
A: 1-7 hari setelah submit (biasanya 2-3 hari)

**Q: Apakah harus bayar hosting?**
A: Tidak! GitHub Pages & Netlify gratis selamanya

**Q: Bisa update game setelah rilis?**
A: Ya! Tinggal update file, push ke GitHub, lalu upload APK baru

**Q: Apakah bisa monetisasi langsung?**
A: Ya, tapi perlu setup AdMob dulu (gratis, tapi butuh review)

---

## 📞 Info Kontak
Dibuat dengan Claude AI — Anthropic
Game Engine: HTML5 + Web Audio API + Canvas
PWA Standard: Google PWA Guidelines

Selamat merilis game! 🚀🏭
