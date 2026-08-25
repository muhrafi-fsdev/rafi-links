# Rafi Links

Static personal links website milik Muhammad Rafi Priyo. Halaman ini menyatukan portfolio, kode, project, dan profil profesional dalam tampilan editorial yang ringan dan mudah dipindai.

Repository ini disiapkan untuk nama `rafi-links` dan dapat diterbitkan langsung melalui GitHub Pages tanpa proses build.

## Preview

![Preview Rafi Links](assets/social-preview.webp)

## About

Rafi Links dirancang sebagai direktori personal yang tenang dan fokus pada informasi. Identitas, foto, dan enam tujuan utama tersedia langsung melalui HTML sehingga konten tetap dapat digunakan ketika JavaScript tidak tersedia.

## Features

- Layout responsif dari viewport mobile hingga ultrawide.
- Direktori tautan yang tersedia tanpa JavaScript.
- Navigasi semantik dan focus state untuk penggunaan keyboard.
- Web Share API dengan clipboard dan legacy copy fallback.
- Dukungan `prefers-reduced-motion` dan forced colors.
- Metadata SEO, Open Graph, canonical URL, dan JSON-LD `Person`.
- Arsitektur statis yang kompatibel dengan GitHub Pages.

## Tech

```text
HTML
CSS
Vanilla JavaScript
```

## Project Structure

```text
rafi-links/
├── assets/
│   ├── apple-touch-icon.png
│   ├── favicon-r.png
│   ├── rafi-profile.jpg
│   └── social-preview.webp
├── css/
│   └── style.css
├── js/
│   └── script.js
├── .gitignore
├── index.html
└── README.md
```

## Running Locally

```bash
git clone https://github.com/muhrafi-fsdev/rafi-links.git
cd rafi-links
python -m http.server 8000
```

Buka `http://localhost:8000`. Karena project ini sepenuhnya statis, `index.html` juga dapat dibuka langsung tanpa server.

## Deployment

1. Buka repository di GitHub.
2. Masuk ke `Settings → Pages`.
3. Pada **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/(root)`.
5. Simpan, lalu periksa kembali URL Pages setelah repository diubah menjadi `rafi-links`.

URL Pages yang diharapkan setelah rename adalah:

```text
https://muhrafi-fsdev.github.io/rafi-links/
```

## Customization

- Nama, deskripsi, tautan, dan metadata berada di `index.html`.
- Warna, spacing, typography, dan breakpoint berada di `css/style.css`.
- Fungsi bagikan dan fallback clipboard berada di `js/script.js`.
- Foto profil berada di `assets/rafi-profile.jpg`.
- Social preview berada di `assets/social-preview.webp`.

Seluruh path asset bersifat relatif agar tetap bekerja setelah repository di-rename.

## Accessibility

Project menggunakan landmark HTML, satu heading `h1`, skip link, urutan heading yang konsisten, alt text, accessible name, focus state yang terlihat, tap target minimum, serta perilaku reduced motion. Tautan eksternal tetap tersedia jika JavaScript gagal atau dinonaktifkan.

## License

Repository ini belum menyertakan file license. Hak penggunaan ulang tidak diberikan secara otomatis.
