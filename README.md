<div align="center">
  <img src="https://files.catbox.moe/m2a0ln.jpg" alt="SennaNetBot Banner" style="width:100%;max-width:700px;border-radius:12px;" />
  <br/><br/>
  <a href="https://github.com/swndyyy/telegram-bot/stargazers">
    <img src="https://img.shields.io/github/stars/swndyyy/telegram-bot?color=ffb6c1&label=stars&style=for-the-badge" alt="Stars"/>
  </a>
  <a href="https://github.com/swndyyy/telegram-bot/network/members">
    <img src="https://img.shields.io/github/forks/swndyyy/telegram-bot?color=dda0dd&label=forks&style=for-the-badge" alt="Forks"/>
  </a>
  <a href="https://github.com/swndyyy/telegram-bot">
    <img src="https://visitor-badge.laobi.icu/badge?page_id=swndyyy.telegram-bot&style=for-the-badge&color=87ceeb" alt="Views"/>
  </a>
</div>

---

## ୨୧・˳✧༚ ʚɞ SennaNetBot - Telegraf Modular Bot ɞɞ ✧˳・୨୧

`SennaNetBot` adalah sebuah proyek bot Telegram yang **dikembangkan oleh swndyyy** menggunakan **library [Telegraf.js](https://telegraf.js.org)**.  
Script ini **didisain modular, ringan, dan cute**, cocok untuk kamu yang ingin membuat bot Telegram dengan struktur rapi dan fleksibel.

---

## ✨ Fitur Utama

- Struktur plugin otomatis dari folder `plugins/` dan subfolder-nya
- Logger custom dengan tampilan estetik
- Sistem database lokal berbasis JSON
- Bantuan perintah otomatis (`/help`, `/menu`)
- Format pesan kawaii yang bisa dikustom

---

## ⚙️ Cara Instalasi

1. **Clone repo ini**
```bash
git clone https://github.com/swndyyy/telegram-bot
cd telegram-bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Buat file konfigurasi**
Buat file `bot.config.js` berisi:
```js
module.exports = {
  TOKEN: 'token-telegram-anda-di-sini'
};
```

4. **Jalankan bot**
```bash
node index.js
```

---

## 📁 Struktur Direktori

```
telegram-bot/
├── bot.config.js        // Token konfigurasi
├── core/                // Modul internal (logger, db, serializer)
│   ├── database.js
│   ├── logger.js
│   └── serialize.js
├── plugins/             // Semua plugin (auto-load recursive)
│   ├── help.js
│   ├── user/
│   │   └── register.js
│   └── utility/
│       └── ping.js
├── database.json        // Data pengguna dan konfigurasi lokal
└── index.js             // Entry point bot
```

---

## ʚɞ Butuh Bantuan?

| Pertanyaan Umum | Kontak Support |
|------------------|----------------|
| Cara tambah plugin? | Kirim email ke **support@archivends.my.id** |
| Error saat run?     | Jelaskan detail error dan sistem kamu |
| Ingin request fitur? | Boleh banget~ Kirim aja idemu! |

---

<div align="center" style="margin-top: 30px;">
  <img src="https://files.catbox.moe/m2a0ln.jpg" alt="Footer Banner" width="100%" style="max-width:700px;border-radius:12px;" />
  <br/><br/>
  <i>“Dengan teknologi dan ketulusan, kita bangun dunia digital yang lembut.”</i>
  <br/><br/>
  <strong>© 2025 swndyyy | Archivends Project</strong>
</div>