🚀 Web UI & Movie Recommendation Automation

Selamat datang di project automation ini! 🎉
Ikuti langkah di bawah biar semuanya jalan mulus.

📦 Persiapan

Pastikan sudah terpasang:

Node.js v20

Clone repo dari GitHub

Buka di code editor favoritmu

Jalankan:

npm i


untuk install semua dependency

▶️ Cara Menjalankan
Web Automation

Fitur Login

npm run web:login


Fitur Movie Recommendation

npm run web:mov_rec


ℹ️ Secara default, automation berjalan dengan mode headless.
Kalau mau lihat browser-nya jalan, hapus --headless di file wdio.conf.ts.

🎬 Movie Recommendation Evaluation

Jalankan manual dengan:

npm run eval:matrics

📊 Report

Ada dua jenis report yang bakal terbentuk:

Allure Report (untuk Web UI Automation)

Generate report di terminal:

npm run allure:generate


Buka report di browser:

npm run allure:open


Mochawesome Report (untuk Eval Matrics)

Otomatis terbentuk folder reports/

Di dalamnya ada file .html

Buka file itu langsung di browser

⚙️ CI/CD GitHub Action

Project ini sudah dilengkapi pipeline CI/CD.

Buka repo di GitHub

Pergi ke tab Actions

Pilih job manual dan jalankan

Tunggu sampai stage generate-report selesai

Akan muncul 2 link report:

Satu untuk Allure

Satu untuk Mochawesome

✨ Selamat mencoba, semoga lancar tanpa drama!