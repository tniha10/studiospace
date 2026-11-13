# StudioSpace

StudioSpace is a creative-studio marketplace. Hosts list photography studios,
sound stages, podcast rooms, music suites, and art workshops. Creators search
the catalog, open a listing, and request a booking. Every booking starts as
`Pending` and only the host's listed studio rate is used for pricing.

This repository contains the **Next.js frontend**. The Express + MongoDB API
lives in [`server/`](./server), a separate TypeScript project with its own
`package.json`. The root `.gitignore` excludes `/server/`, so the API is meant
to be versioned as its own git repository when you submit it.

## Features

- **Authentication** with BetterAuth: email + password, optional Google
  sign-in, persistent sessions, logout, and intended-route redirects.
- **Registration** with name, email, optional profile photo URL, and a password
  that is at least 6 characters and includes uppercase and lowercase letters.
- **Studio CRUD**: hosts create, read, update, and delete their own listings.
  Ownership is checked on the server, not just hidden in the UI.
- **Explore**: full-text search over title and location, category filters,
  min/max hourly price, and sorting.
- **Studio details**: image, description, amenities, host, capacity, opening
  hours, rating or an honest "No reviews yet" state, and a booking form.
- **Bookings**: Pending by default, server-side price calculation, overlap
  prevention, and cancel for Pending bookings only.
- **Homepage**: accessible hero slider, category links, six featured studios
  loaded from MongoDB, a four-step "how it works" section, the Host Guarantee,
  and a host call to action.
- **UX**: loading skeletons, empty states, error states, Sonner toasts, and
  custom confirmation dialogs (no `alert`/`confirm`).
- **Theme**: light/dark/system theme handled by `@wrksz/themes`.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS 4, DaisyUI 5 |
| Icons / toasts | Lucide React, Sonner |
| Auth client | `better-auth/react` |
| Backend | Node.js, Express 5, TypeScript, MongoDB |
| Auth server | BetterAuth + MongoDB adapter, Google OAuth |
| Uploads | ImgBB (optional) |

## Project structure

```text
studiospace/
├─ src/
│  ├─ app/                    # App Router pages
│  │  ├─ page.tsx             # Homepage
│  │  ├─ studios/             # Explore, details, edit
│  │  ├─ login|register/      # Auth screens
│  │  ├─ add-studio/          # Create listing
│  │  ├─ my-listings/         # Host listing management
│  │  ├─ my-bookings/         # Booking management
│  │  └─ dashboard/
│  ├─ components/
│  │  ├─ auth/                # Login and register forms
│  │  ├─ home/                # Slider and featured studios
│  │  ├─ studios/             # Cards, filters, forms, booking form
│  │  └─ ui/                  # Confirm dialog and shared UI
│  ├─ lib/                    # API client, auth client, types, helpers
│  └─ proxy.ts                # Optimistic route protection (Next 16)
├─ server/                    # Express API (separate project)
├─ next.config.ts             # /api proxy + image hosts
└─ .env.example
```

## Local setup

Requirements: Node.js 20+. A MongoDB database (MongoDB Atlas works well) is
only needed for the full setup; there is also a zero-credential local mode for
demos.

### Quick start without credentials (development only)

No Atlas, Google, or ImgBB account? From `server/`:

```bash
npm install
npm run dev:local
```

This starts an **in-memory** MongoDB replica set and the API with generated
per-run development secrets. Then, from the project root, run `npm run dev` and
open `http://localhost:3000`.

Google sign-in and image uploads stay disabled in this mode. MongoDB is in
memory, so accounts, studios, and bookings reset when the process stops. To add
the six example studios, register an account and run `npm run seed` in another
terminal. Production still uses the real environment variables described below.

### 1. Start the API

```bash
cd server
npm install
copy .env.example .env      # Windows
# cp .env.example .env      # macOS / Linux
npm run dev
```

Fill in `server/.env` before starting:

- `MONGODB_URI` — your Atlas connection string (include the database name).
- `BETTER_AUTH_SECRET` and `JWT_SECRET` — generate each with
  `openssl rand -base64 32`.
- `BETTER_AUTH_URL` and `CLIENT_ORIGIN` — `http://localhost:3000` locally.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — optional, needed only for
  Google sign-in.
- `IMGBB_API_KEY` — optional; without it, hosts can still paste an image URL.

The API starts on `http://localhost:5000`. Check it with
`http://localhost:5000/api/health`.

### 2. Start the frontend

```bash
npm install
copy .env.example .env      # Windows
# cp .env.example .env      # macOS / Linux
npm run dev
```

Open `http://localhost:3000`. `API_URL` tells Next.js where to proxy `/api/*`
(see `next.config.ts`).

### 3. Seed example studios (optional)

Register a host account first, then run:

```bash
cd server
npm run seed
```

The script adds six real MongoDB studio documents owned by that account. Set
`SEED_HOST_EMAIL` to choose a specific host; otherwise the first user is used.

### 4. Google OAuth (optional)

In Google Cloud Console, create an OAuth 2.0 client and add this authorized
redirect URI for local development:

```text
http://localhost:3000/api/auth/callback/google
```

Then set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `BETTER_AUTH_URL` in
`server/.env`. Google sign-in is shown only when both credentials exist.

## API overview

All routes are served by Express under `/api` and are reached through the
Next.js rewrite so auth cookies stay first-party.

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | Health + database status |
| `GET` | `/api/studios` | Public | Search, filter, sort, list |
| `GET` | `/api/studios/mine` | Session | Current host's listings |
| `GET` | `/api/studios/:id` | Public | Studio details |
| `POST` | `/api/studios` | Session + mutation token | Create a listing |
| `PATCH` | `/api/studios/:id` | Session + mutation token | Update an owned listing |
| `DELETE` | `/api/studios/:id` | Session + mutation token | Delete an owned listing |
| `GET` | `/api/bookings/mine` | Session | Current user's bookings |
| `POST` | `/api/bookings` | Session + mutation token | Create a Pending booking |
| `PATCH` | `/api/bookings/:id/cancel` | Session + mutation token | Cancel a Pending booking |
| `POST` | `/api/mutation-token` | Session | Issue the short-lived JWT + CSRF pair |
| `POST` | `/api/uploads` | Session + mutation token | Upload to ImgBB |
| `*` | `/api/auth/*` | BetterAuth | Sign up, sign in, Google, session, sign out |

## Security challenges

### 1. JWT challenge

The BetterAuth session is the only identity system. Before any state-changing
request, the client calls `POST /api/mutation-token`. The server checks the
session, then issues:

- an HTTPOnly `studiospace_mutation` JWT (15 minutes, issuer
  `studiospace-api`, payload `sub` + `sid`), and
- a readable `studiospace_csrf` cookie.

Mutations require **all** of the following, in this order:

1. A valid BetterAuth session.
2. A valid, unexpired JWT cookie.
3. The JWT `sub`/`sid` matching the current user and session.
4. The CSRF cookie matching the `X-CSRF-Token` header.
5. An allowed request origin.

Studio update/delete and booking cancel also verify that the document belongs
to the logged-in user.

### 2. Password challenge

BetterAuth enforces `minPasswordLength: 6`, and a sign-up hook rejects
passwords that do not contain both an uppercase and a lowercase letter. The
register form applies the same rule before submitting.

### 3. Protected-route challenge

`src/proxy.ts` redirects visitors without a BetterAuth session cookie away
from private pages and preserves the intended path in `?next=`. The API remains
authoritative: every private route re-checks the session server-side, so a
forged cookie cannot access data.

## Verification status

Verified in this repository:

- `npx tsc --noEmit --incremental false` (frontend)
- `npm run lint` (0 warnings)
- `npm run build` (17 routes)
- `npm run typecheck` and `npm run build` (server)
- `npm test` (server unit tests for time/validation helpers)
- `npm run dev:local -- --check` (server; in-memory MongoDB + API start and stop
  cleanly)
- Full local stack through the Next.js proxy: sign-up with photo URL, mutation
  token, studio creation, search, and `/`, `/studios`, `/login` all return 200
  while the API runs in local mode.
- Production smoke test of `/`, `/studios`, `/login`, `/register`,
  `/my-bookings`, and the 404 page while the API was offline.

### API integration suite

`cd server && npm run test:integration` boots the real built API against an
**ephemeral `mongodb-memory-server` replica set**, then exercises the HTTP API
end to end. The database is created for the run and destroyed on exit; no
production or Atlas credentials are used.

Latest result: **59 passed, 0 failed, 0 skipped**.

Covered: password rules, registration (including the profile photo URL),
duplicate email, session read, sign-out, sign-in, mutation-token issuance,
CSRF/JWT/origin guards, studio CRUD, ownership isolation, search/filter/sort,
booking pricing, overlap rejection (including five concurrent overlapping
requests where exactly one succeeds), cancel rules, and upload guards.

Not verified in this workspace, because the required credentials are absent:

- **Google OAuth** — needs `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
- **ImgBB uploads** — needs `IMGBB_API_KEY`. The suite asserts the intended
  `503 UPLOAD_NOT_CONFIGURED` response instead.
- **Atlas connectivity** — the integration suite uses the ephemeral database
  described above, not Atlas. Point `MONGODB_URI` at Atlas and run the app to
  verify that path.

## Deployment notes

- Frontend: deploy to Vercel. Set `API_URL` to the public Express URL.
- Backend: deploy to Render (or similar). Set `BETTER_AUTH_URL` and
  `CLIENT_ORIGIN` to the public frontend origin, and the Google redirect URI to
  `https://<frontend-domain>/api/auth/callback/google`.
- MongoDB Atlas, Google OAuth, and ImgBB credentials belong in environment
  variables only. Never commit `.env` files.

## Test Credentials

- Email: test1@studiospace.com
- Password: Studio123

Google login note: If Google sign-in shows an "unverified app"
warning, click Advanced → Go to StudioSpace to continue.
Email/password login is the recommended way to test.
