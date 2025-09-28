🚀 Web UI & Movie Recommendation Automation

Selamat datang di project automation ini! 🎉
Ikuti langkah di bawah biar semuanya jalan mulus.

📦 Persiapan

Pastikan sudah terpasang:
* Node.js v20
* Clone repo dari GitHub
* Buka di code editor favoritmu

Jalankan ini untuk install semua dependency

```bash
npm i
```



▶️ Cara Menjalankan
Web Automation

Fitur Login

```bash
npm run web:login
```


Fitur Movie Recommendation

```bash
npm run web:mov_rec
```


ℹ️ Secara default, automation berjalan dengan mode headless.
Kalau mau lihat browser-nya jalan, hapus **--headless** di file **wdio.conf.ts.**

🎬 Movie Recommendation Evaluation

Jalankan manual dengan:

```bash
npm run eval:matrics
```

📊 Report

Ada dua jenis report yang bakal terbentuk:

1. Allure Report (untuk Web UI Automation)

Generate report di terminal

```bash
npm run allure:generate
```


Buka report di browser:

```bash
npm run allure:open
```


2. Mochawesome Report (untuk Eval Matrics)

Otomatis terbentuk folder **reports/**

Di dalamnya ada file **.html**

Buka file itu langsung di browser

⚙️ CI/CD GitHub Action

Project ini sudah dilengkapi pipeline CI/CD.

Buka repo di GitHub

Pergi ke tab Actions

Pilih job manual dan jalankan

Tunggu sampai stage **generate-report** selesai

Akan muncul 2 link report:

1. Satu untuk Allure
2. Satu untuk Mochawesome