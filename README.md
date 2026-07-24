# Muhammad Rafi Priyo — Personal Link Hub

Website link-in-bio bergaya Linktree untuk personal branding developer. Project ini dibuat sebagai website statis sehingga dapat langsung dipublikasikan melalui GitHub Pages tanpa backend dan tanpa proses build.

## Struktur

```text
rafi-personal-link-hub/
├── index.html
├── css/style.css
├── js/script.js
├── assets/rafi-logo.png
├── README.md
└── .gitignore
```

## Mengubah tautan

Buka `js/script.js`, kemudian edit array `links` di bagian paling atas.

```js
{
  title: "Nama tautan",
  description: "Deskripsi singkat.",
  url: "https://contoh.com",
  icon: "portfolio",
  enabled: true,
}
```

Tautan Shopee dan Tokopedia sudah disiapkan tetapi disembunyikan karena URL asli belum diberikan. Isi `url`, kemudian ubah `enabled: false` menjadi `enabled: true`.

## Menjalankan secara lokal

Website bisa langsung dibuka melalui `index.html`. Untuk pengujian yang lebih konsisten, jalankan server lokal:

```bash
python -m http.server 8080
```

Kemudian buka `http://localhost:8080`.

## Upload ke GitHub Pages

1. Buat repository baru di GitHub.
2. Upload seluruh isi folder ini ke branch `main`.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`.
6. Simpan dan tunggu proses deployment selesai.

## Tautan yang sudah aktif

- Portfolio Website
- GitHub: `muhrafi-fsdev`
- LinkedIn: `rafipriyo`
- Instagram: `riyoooooo`
- Academic Organizer
- NusaMind AI
