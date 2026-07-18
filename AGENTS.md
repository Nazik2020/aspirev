# AGENTS.md — Invikt AI Web App

## Project Layout

Two independent packages at repo root. No monorepo manager — each has its own `node_modules/` and `package.json`.

```
frontend/   — React 19 + Vite + Tailwind CSS v4 (JSX, no TypeScript)
backend/    — Express 5 + Mongoose 9 (Node.js)
```

## Dev Commands

Both must run simultaneously for full-stack development.

```bash
cd frontend && npm run dev     # Vite on :5173
cd backend && npm run dev      # Nodemon on :5000
cd frontend && npm run build   # Production build
cd frontend && npm run lint    # ESLint (only lint step available)
```

There is **no test framework** configured in either package. No jest, vitest, or pytest exists.

## Critical Tech Quirks

- **Express 5** (not v4): error handling differs — async errors propagate automatically, `app.listen` returns a Promise.
- **Tailwind CSS v4**: uses `@import "tailwindcss"` and `@theme {}` in `index.css`. There is **no `tailwind.config.js`** — all customization lives in the CSS file's `@theme` block.
- **Dark mode is default**: class-based via `.dark` on `<html>`. Theme stored in `localStorage`, toggled by inline script in `index.html`.
- **No TypeScript anywhere**: entire codebase is plain JS/JSX.
- **React 19** with StrictMode.
- **Dual User models**: `models/auth/User.js` (used by auth system, has bcrypt) and `models/User.js` (legacy, simpler). Auth system uses `models/auth/User.js` — new code should use that path.

## API Auto-Detection

`frontend/src/config/api.js` picks the API URL automatically:
- Dev: `http://localhost:5000/api`
- Prod: `https://invikt-backend.onrender.com/api`
- Override: `VITE_API_URL` env var

## Backend Environment

Required env vars (validated at startup in `server.js`):
- `MONGO_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — Access token signing
- `JWT_REFRESH_SECRET` — Refresh token signing (must differ from JWT_SECRET)

See `backend/.env.example` for full template.

**Warning**: `backend/.env` with real credentials is committed to git (added before `.gitignore` rule). Treat it as public — rotate secrets if repo is public.

## Backend Middleware Stack (order matters)

1. HTTPS redirect (production only)
2. CORS (localhost:5173, Azure, Render)
3. Helmet security headers
4. Rate limiting (100 req/15min on `/api/`, 10 req/15min on `/api/auth`)
5. Body parsing (JSON, 2MB limit)
6. NoSQL injection sanitization (`$` prefix stripping)
7. XSS cleaning (HTML entity escaping)

## Auth System

- JWT with access (1h) + refresh (30d) tokens
- Refresh rotation: old refresh token blacklisted on each refresh
- Password: bcrypt, 12 salt rounds, requires 8+ chars with uppercase, number, special char
- Roles: `student` (default), `admin`
- Protected routes use `protect` middleware from `middleware/auth/authMiddleware.js`

## Frontend Styling

Design tokens live in `frontend/src/index.css` under `@theme {}` (Tailwind v4 syntax). Key custom classes: `.glass-card`, `.glass-panel`, `.glow-orb`, `.text-gradient`. Fonts: Manrope (headlines), Inter (body). Icons: Google Material Symbols Outlined.

**Never use borders at full opacity** — use 15% opacity ghost borders or background tone shifts per the glassmorphism design system.

## Routing

Routes defined in `frontend/src/App.jsx`. Protected routes use `ProtectedRoute` component (`components/common/ProtectedRoute.jsx`) which redirects to `/signin`. Admin routes live under `/admin/*` with `AdminLayout`.

## Deployment

| Component | Platform | Notes |
|-----------|----------|-------|
| Frontend | Azure Static Web Apps | SPA fallback, built from `frontend/dist` |
| Backend | Render | `https://invikt-backend.onrender.com` |
| Database | MongoDB Atlas | `invikt_ai` database |
| Storage | Azure Blob | `invikt-uploads`, `resume-uploads`, `portfolio-uploads` containers |

CI: GitHub Actions deploys frontend to Azure Static Web Apps on push/PR to `main` (`.github/workflows/azure-static-web-apps-mango-field-0f043dd0f.yml`).
