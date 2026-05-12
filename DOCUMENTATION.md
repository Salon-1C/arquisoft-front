# Blume — Project Documentation

## What is Blume

Blume is a live class streaming platform. Instructors broadcast live video classes; students join, watch, and take notes in real time. Classes can be public (anyone) or private (enrolled students only).

---

## Stack

| Component | Technology |
|---|---|
| Frontend | Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui |
| Backend API | Spring Boot (Java) + PostgreSQL |
| Streaming Server | Golang + Gin + FFmpeg |
| CDN / Storage | Cloudflare R2 |

### Why Gin for the Streaming Server

- **Concurrency:** Go's goroutines allow the server to handle thousands of simultaneous SSE connections (viewer counts) with minimal memory overhead. Each viewer connection gets a lightweight goroutine, not a heavy OS thread.
- **Gin:** The most widely used Go HTTP framework (81k+ GitHub stars, ~48% of Go developers). Has native SSE support via `c.Stream()` and `c.SSEvent()` — no extra library needed for the viewer count feature.
- **FFmpeg integration:** Go's `os/exec` package runs FFmpeg as a subprocess cleanly. This is idiomatic Go and avoids the complexity of bindings.
- **University project fit:** Gin has the largest community, most tutorials, and lowest learning curve of all Go frameworks — important when the team may have limited Go experience.

---

## Architecture overview

```
Browser
  │
  ├── HTTPS → Next.js frontend (port 3000)
  │             │
  │             ├── REST calls → Spring Boot API (port 8080)
  │             │                  │
  │             │                  └── Internal calls → Go + Gin (port 9090)
  │             │
  ├── EventSource (SSE) → Go + Gin (port 9090) /sse/viewers/:classId
  │
  └── HLS video → Cloudflare R2 (CDN) — .m3u8 / .ts files

OBS / Streaming software
  └── RTMP → Go server (port 1935) → FFmpeg → HLS segments → Cloudflare R2
```

---

## Fases de desarrollo

### Fase 1 — Frontend skeleton (complete)
- Next.js 16 project with TypeScript, Tailwind CSS v4, shadcn/ui
- Route groups: `(marketing)`, `(public)`, `(auth)`, `(dashboard)`
- Auth context with mock mode (`AUTH_MOCK_MODE`)
- All page and component scaffolding

### Fase 2 — UI implementation (in progress)
- Landing page (HeroSection, FeaturesSection, CTASection)
- Explorar page with ClassGrid, ClassCard, ClassFilters
- AuthModal (login / signup flow)
- Notes system (NotesList, NoteEditor, NoteCard)
- Class player page (VideoPlayer, PlayerControls, NotesPanel)

### Fase 3 — Backend integration
- Integración con Spring Boot API (auth, clases, notas)
- Integración con servicio de streaming en Golang + Gin + Cloudflare R2
- Sustitución del mock `AUTH_MOCK_MODE` por JWT cookie real
- SSE viewer counts conectados al servidor Go (`/sse/viewers/:classId`)

---

## Environment variables

```
NEXT_PUBLIC_API_URL=http://localhost:8080       # Spring Boot
NEXT_PUBLIC_STREAM_URL=http://localhost:9090    # Go + Gin
NEXT_PUBLIC_PHOENIX_URL=ws://localhost:4000   # Phoenix (Elixir)
JWT_SECRET=your-256-bit-secret-here            # Shared between Spring Boot and Go
```

---

## Development setup

```bash
npm install
npm run dev          # Next.js on port 3000
```

Auth state is controlled by `src/config/dev.ts`:

```ts
export const AUTH_MOCK_MODE = 'unauthenticated'  // or 'authenticated'
```
