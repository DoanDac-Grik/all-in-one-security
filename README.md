# All-in-One Security

> Một thời cùng nhau cày cuốc làm đồ án chuyên ngành với Tuấn Anh và Quang Huy. Dòng commit đầu tiên vào ngày 13/10/2021, hôm nay 15/05/2026 Đoàn Đắc bắt đầu refactor lại cho đẹp hơn.

---

Đồ án chuyên ngành An toàn thông tin, được phát triển bởi nhóm ba sinh viên: **Đoàn Đắc**, **Tuấn Anh** và **Quang Huy**.

Dự án xây dựng một nền tảng web tích hợp nhiều công cụ bảo mật thông tin thực tiễn — từ quét mã độc, kiểm tra lỗ hổng web, đến mã hóa file và chia sẻ kiến thức bảo mật qua blog — nhằm giúp người dùng có thể thực hiện các tác vụ pentest và bảo vệ dữ liệu cơ bản ngay trên trình duyệt mà không cần cài đặt thêm công cụ.

Built with Express.js and TypeScript.

## Features

- **Blog** — create and browse security knowledge articles with category filtering and WYSIWYG editor
- **URL/Domain Scanner** — check domain safety via VirusTotal API
- **File Hash Scanner** — scan file hashes via VirusTotal API
- **Web Vulnerability Scanner** — automated scanning via OWASP ZAP integration
- **File Encryption/Decryption** — AES-256 encrypt and decrypt files in-browser

## Tech Stack

| Layer     | Technology               |
| --------- | ------------------------ |
| Runtime   | Node.js                  |
| Framework | Express.js 5.x           |
| Language  | TypeScript 6.x           |
| Templates | EJS (server-rendered)    |
| Database  | MongoDB via Mongoose 9.x |
| Styling   | SCSS → CSS               |

## Prerequisites

- Node.js 20+
- npm 8+
- MongoDB Atlas account (or local MongoDB instance)
- OWASP ZAP installed at `/usr/share/zaproxy/zap.sh` (for web pentest feature — Linux/Kali only)
- VirusTotal API key (free tier available at virustotal.com)

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/DoanDac-Grik/all-in-one-security.git
cd all-in-one-security

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and fill in MONGODB_URI, API_KEY, etc.

# 4. Start development server
npm run dev
```

## Environment Variables

| Variable                   | Description                              | Default    |
| -------------------------- | ---------------------------------------- | ---------- |
| `MONGODB_URI`              | MongoDB connection string                | —          |
| `API_KEY`                  | VirusTotal API key                       | —          |
| `SESSION_SECRET`           | Express session secret                   | `changeme` |
| `PASSWORD_GENERATE_LENGTH` | Length of generated encryption passwords | `20`       |
| `PORT`                     | Server port                              | `3001`     |

See `.env.example` for a template.

## npm Scripts

| Script                 | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Start with ts-node + nodemon (auto-reload on save) |
| `npm run build`        | Compile TypeScript to `dist/`                      |
| `npm start`            | Run compiled production build                      |
| `npm run lint`         | Run ESLint on `src/`                               |
| `npm run lint:fix`     | Auto-fix ESLint issues                             |
| `npm run format`       | Format `src/` with Prettier                        |
| `npm run format:check` | Check formatting without writing                   |
| `npm run watch`        | Compile SCSS to `public/css/`                      |

## Project Structure

```
all-in-one-security/
├── src/
│   ├── server.ts           ← entry point (listen)
│   ├── app.ts              ← Express app setup
│   ├── config/
│   │   └── db.ts           ← MongoDB connection
│   ├── controllers/        ← request handlers (9 files)
│   ├── routes/             ← route definitions (9 files)
│   ├── models/             ← Mongoose models (Blog, Category)
│   ├── helpers/            ← shared utilities (upload, crypto, VirusTotal, ZAP)
│   └── types/              ← TypeScript declaration files
├── public/                 ← static assets (CSS, images)
├── views/                  ← EJS templates
├── scss/                   ← SCSS source files
├── dist/                   ← compiled output (gitignored)
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── lefthook.yml
└── tsconfig.json
```

## Git Hooks

Pre-commit hooks are configured via [Lefthook](https://github.com/evilmartians/lefthook). After `npm install`, hooks are installed automatically via the `prepare` script.

On each commit, staged `.ts` files in `src/` are automatically:

1. Linted and auto-fixed by ESLint
2. Formatted by Prettier
3. Re-staged so fixes are included in the commit

To install hooks manually: `npx lefthook install`

## License

ISC
