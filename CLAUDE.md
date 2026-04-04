@AGENTS.md

## What is this project

Blume is a live class streaming platform (public and private). Frontend built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, and shadcn/ui. Authentication backend is Spring Boot (Java) and streaming backend is Golang + Gin. This file guides every Claude Code session.

| Component | Technology |
|---|---|
| Frontend | Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui |
| Backend API | Spring Boot (Java) + PostgreSQL |
| Streaming Server | Golang + Gin + FFmpeg + Cloudflare R2 |

**Streaming Server framework:** Gin (github.com/gin-gonic/gin). Chosen for native SSE support,
largest Go community, and lowest learning curve. The server exposes:
- Port 1935 (TCP) — RTMP ingestion from OBS/streaming software
- Port 9090 (HTTP via Gin) — HLS serving, SSE viewer count, internal API

---

## Working rules

### General
- Read this file in full before writing any code
- Do not invent or extrapolate architecture decisions not documented here
- When in doubt, ask before proceeding
- Never modify files outside the explicit scope of the current prompt
- Every session must end with the project in a state that compiles without errors
- All page components with dynamic segments (`[id]`, `[slug]`, etc.) must be `async` and must `await params` before accessing values. `params` is a `Promise<>` in Next.js 16.
- After adding new dynamic routes, run `npx next typegen` to regenerate the global `PageProps` types.

### TypeScript
- Strict typing always. Using `any` is forbidden
- All interfaces live in `src/types/`
- Never duplicate types; import from the source
- Component props must always be typed with an explicit interface, not inline

### Components
- Server Components by default
- `"use client"` only when there is interactivity, state hooks, or effects
- Never access Context directly; always through the corresponding hook
- shadcn/ui for all primitive components (buttons, inputs, modals, etc.)

### Styles
- Tailwind CSS for all styling
- Colors always from CSS variables defined in `globals.css`, never hardcoded values
- Typography: Sora throughout the project
- Mobile-first breakpoints

### Routes and navigation
- Route names in Spanish: `/explorar`, `/mis-notas`, `/configuracion`
- Never use `<a>` directly; always use Next.js `<Link>`
- The `redirect` query param must be propagated through all auth flows

---

## Auth state in development

The file `src/config/dev.ts` exports `AUTH_MOCK_MODE`.

```ts
// 'unauthenticated' → no active session
// 'authenticated'   → active user session
export const AUTH_MOCK_MODE = 'unauthenticated'
```

**Do not change this value** unless the prompt explicitly instructs it. AuthContext reads it to decide which user state to simulate.

---

## Folder structure

```
src/
├── app/
│   ├── layout.tsx                     ← Root layout (providers, fonts)
│   ├── not-found.tsx
│   ├── (marketing)/                   ← Landing. Public navbar + footer.
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (public)/                      ← No auth required. Navbar with "Sign in".
│   │   ├── layout.tsx
│   │   ├── explorar/page.tsx
│   │   └── clase/[id]/page.tsx
│   ├── (auth)/                        ← Clean centered layout.
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── registro/page.tsx
│   │   └── onboarding/page.tsx
│   └── (dashboard)/                   ← Auth required. Sidebar + user navbar.
│       ├── layout.tsx
│       ├── explorar/page.tsx
│       ├── mis-notas/page.tsx
│       └── configuracion/page.tsx
│
├── components/
│   ├── ui/                            ← shadcn (do not edit manually)
│   ├── common/
│   │   ├── Navbar/
│   │   │   ├── NavbarPublic.tsx
│   │   │   └── NavbarDashboard.tsx
│   │   ├── Sidebar/
│   │   │   └── Sidebar.tsx
│   │   ├── AuthModal/
│   │   │   └── AuthModal.tsx
│   │   └── LiveBadge/
│   │       └── LiveBadge.tsx
│   ├── marketing/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   └── CTASection.tsx
│   ├── classes/
│   │   ├── ClassCard.tsx
│   │   ├── ClassGrid.tsx
│   │   └── ClassFilters.tsx
│   ├── notes/
│   │   ├── NotesList.tsx
│   │   ├── NoteCard.tsx
│   │   └── NoteEditor.tsx
│   └── player/
│       ├── VideoPlayer.tsx
│       ├── PlayerControls.tsx
│       └── NotesPanel.tsx
│
├── config/
│   └── dev.ts                         ← AUTH_MOCK_MODE
│
├── context/
│   ├── AuthContext.tsx
│   └── ModalContext.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useRequireAuth.ts
│   └── useRedirectIfAuth.ts
│
├── lib/
│   └── api/
│       ├── auth.ts
│       ├── classes.ts
│       └── notes.ts
│
├── proxy.ts
│
├── styles/
│   └── globals.css                    ← CSS variables, Tailwind base, Sora import
│
└── types/
    ├── auth.ts
    ├── class.ts
    ├── note.ts
    └── api.ts
```

---

## Key types

### auth.ts
```ts
export type UserRole = 'estudiante' | 'profesor'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatarUrl?: string
}

export interface Session {
  user: User
  token: string
}
```

### class.ts
```ts
export type ClassStatus = 'live' | 'recorded'
export type ClassType = 'public' | 'private'

export interface Class {
  id: string
  title: string
  description: string
  instructorName: string
  status: ClassStatus
  type: ClassType
  thumbnailUrl?: string
  viewerCount?: number
  startedAt: string
}
```

### note.ts
```ts
export interface Note {
  id: string
  userId: string
  classId?: string
  className?: string
  content: string
  createdAt: string
  updatedAt: string
}
```

### api.ts
```ts
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  status: number
  message: string
}
```

---

## Design tokens

All defined as CSS variables in `src/styles/globals.css`.

| Variable | Value |
|---|---|
| `--color-primary-500` | `#7439DA` |
| `--color-primary-600` | `#5F2DB8` |
| `--color-primary-700` | `#4A2290` |
| `--color-background` | `#FAFAFA` |
| `--color-surface` | `#FFFFFF` |
| `--color-text` | `#3F3F46` |
| `--color-text-muted` | `#A1A1AA` |
| `--color-border` | `#E4E4E7` |
| `--color-live` | `#EF4444` |
| `--font-sans` | `'Sora', sans-serif` |

---

## Middleware

`src/proxy.ts` protects the following routes:

- `/mis-notas` → requires auth
- `/configuracion` → requires auth
- `/onboarding` → requires auth

Redirects to `/login?redirect=[path]` when there is no active session.
Redirects to `/explorar` if an authenticated user tries to access `/login` or `/registro`.

In development, reads `AUTH_MOCK_MODE` from `src/config/dev.ts`.

**Note:** In Next.js 16, `middleware.ts` is deprecated. This project uses `proxy.ts` which runs
on the Node.js runtime. Do not create or reference `middleware.ts`.

---

## Auth modal

`ModalContext` exposes:

```ts
openAuthModal(redirectPath?: string): void
closeAuthModal(): void
```

Called from `useRequireAuth`. Never called directly from components; always through the hook.

---

## Commit conventions (reference)

```
feat: short description
fix: short description
chore: short description
```

---

## What is NOT implemented yet (do not invent)

- Category filters in `/explorar` — structure is ready, no logic yet
- Post-class recordings — `recorded` type exists, no viewing flow yet
- Instructor class management — no screens or logic
- Real Spring Boot integration — everything is mocked until Phase 3
- Go + Gin + FFmpeg streaming service integration — pending Phase 3
- RTMP ingestion (port 1935) and HLS serving via Cloudflare R2 — pending Phase 3