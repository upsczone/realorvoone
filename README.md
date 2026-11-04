# Oneday Exam Prep App (Orvo One)
Orvo One is a responsive exam-preparation app for SSC and Railway aspirants. It combines mock tests, short practice sessions, bilingual current-affairs content, and progress tools in one interface.
## Features
- Choose a target exam, including SSC CGL, SSC CHSL, SSC MTS, RRB NTPC, RRB Group D, and RRB ALP.
- Browse mock and subject tests, take a CBT-style exam, and review results and analysis.
- Practice questions, save questions, and revisit mistakes.
- Read English and Hindi current affairs, notes, and course content.
- Track a demo profile, test attempts, coins, streaks, and preferences.
- Switch between light, dark, and time-based themes.
The app starts with bundled sample content. It can also request questions, test series, courses, and current affairs from the UPSC Zone Partner API; the API client uses the bundled sample data when those requests fail.
## Tech stack
- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4
- Motion for React for animations
- Lucide React for icons
- UPSC Zone Partner API (`https://api.upsczone.in`) with local sample-data fallbacks
## Requirements
- Node.js compatible with the installed Vite version
- Bun (recommended; the repository includes `bun.lock`) or npm
## Getting started
Install dependencies and start the development server:
```bash
bun install
bun run dev
```
Or use npm:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000). Vite provides hot reload during development.
## Configuration
The app works with bundled sample data and does not require an API key to start. The API base URL defaults to `https://api.upsczone.in`. To override it, create a `.env.local` file in the project root:
```dotenv
VITE_API_BASE_URL=https://api.upsczone.in
```
An optional partner API key can be entered in the app's Settings page or supplied as `VITE_UPSCZONE_API_KEY` or `VITE_PARTNER_API_KEY`. Vite embeds `VITE_*` values in browser code, so do not put a private or production secret in these variables. The checked-in `.env.example` also lists `GEMINI_API_KEY` and `APP_URL` for AI Studio runtime use; the current app source does not read those values directly.
## Available scripts
| Command | Description |
| --- | --- |
| `bun run dev` / `npm run dev` | Start Vite on port 3000, listening on all interfaces. |
| `bun run build` / `npm run build` | Create the production build in `dist/`. |
| `bun run preview` / `npm run preview` | Serve the production build locally for a preview. Run the build first. |
| `bun run lint` / `npm run lint` | Run the TypeScript compiler without emitting files. |
| `bun run clean` / `npm run clean` | Remove `dist/` and `server.js` (uses the POSIX `rm` command). |
## Using the app
1. On first launch, follow the setup guide and select a target exam. The guide can be opened again from Settings.
2. Use the dashboard and bottom navigation to open tests, rapid practice, current affairs, and the leaderboard.
3. Open a test to review its details, then start the exam. After submitting, review the result and analysis; mistakes and saved questions can be revisited from their pages.
4. Open Settings to change the theme, exam target, language, profile details, and optional Partner API configuration.
User preferences and several demo features are stored in the browser's `localStorage`; they are not a replacement for server-side accounts or durable cross-device storage.
## Project layout
```text
src/
  components/   App screens and reusable UI
  context/      Shared application state and navigation
  data/         Bundled sample questions, tests, and content
  services/     Partner API client and sample-data fallbacks
  types/        Shared TypeScript types
  utils/        Translation helpers
  App.tsx       Main page composition
  main.tsx      React entry point
```
