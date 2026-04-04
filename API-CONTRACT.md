# Blume — API Contract

This document defines the HTTP contracts between the frontend, Spring Boot API, and Go + Gin streaming server.

---

## Service 1 — Spring Boot (Backend API, port 8080)

Base URL: `NEXT_PUBLIC_API_URL` (e.g. `http://localhost:8080`)

All requests include `Authorization: Bearer <jwt>` for authenticated routes.

### Auth endpoints

#### POST /api/auth/login

Request:
```json
{ "email": "user@example.com", "password": "secret" }
```

Response 200:
```json
{
  "token": "eyJ...",
  "user": { "id": "uuid", "email": "...", "name": "María García", "role": "estudiante" }
}
```

Errors: 401 (wrong credentials), 422 (validation)

---

#### POST /api/auth/signup

Request:
```json
{ "email": "user@example.com", "password": "secret", "name": "María García", "role": "estudiante" }
```

Response 201: same shape as login response.

---

#### POST /api/auth/logout

Authenticated. Invalidates the server-side session.

Response 204: no body.

---

### Classes endpoints

#### GET /api/clases

Returns all publicly visible classes. No auth required.

Response 200:
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Introducción a React",
      "description": "...",
      "instructorName": "Carlos López",
      "status": "live",
      "type": "public",
      "thumbnailUrl": "https://...",
      "viewerCount": 128,
      "startedAt": "2026-04-03T13:00:00Z"
    }
  ]
}
```

---

#### GET /api/clases/:id

Returns a single class. When `status === 'live'`, Spring Boot calls Go internally to get the `hlsUrl`.

Response 200:
```json
{
  "data": {
    "id": "uuid",
    "title": "Introducción a React",
    "description": "...",
    "instructorName": "Carlos López",
    "status": "live",
    "type": "public",
    "thumbnailUrl": "https://...",
    "viewerCount": 128,
    "startedAt": "2026-04-03T13:00:00Z",
    "hlsUrl": "https://cdn.blume.app/hls/uuid/index.m3u8"
  }
}
```

---

### Notes endpoints (authenticated)

#### GET /api/notas

Returns the authenticated user's notes.

Response 200:
```json
{ "data": [ { "id": "uuid", "userId": "uuid", "classId": "uuid", "className": "Introducción a React", "content": "...", "createdAt": "...", "updatedAt": "..." } ] }
```

---

#### POST /api/notas

Request:
```json
{ "classId": "uuid", "content": "Mi nota aquí" }
```

Response 201:
```json
{ "data": { "id": "uuid", "userId": "uuid", "classId": "uuid", "content": "...", "createdAt": "...", "updatedAt": "..." } }
```

---

#### PATCH /api/notas/:id

Request: `{ "content": "Contenido actualizado" }`

Response 200: updated note object (same shape as POST response).

---

#### DELETE /api/notas/:id

Response 204: no body.

---

## Service 2 — Golang + Gin (Streaming Server, port 9090)

The streaming service is built with Go + Gin and is responsible for:
1. Receiving RTMP streams from instructors (OBS or similar software) on port 1935
2. Transcoding RTMP → HLS using FFmpeg as a subprocess
3. Uploading HLS segments (.ts files) and manifests (.m3u8) to Cloudflare R2
4. Serving SSE connections for real-time viewer counts on port 9090
5. Exposing an internal HTTP API (Gin) for Spring Boot to query stream session state

The browser calls this service directly in two ways:
- hls.js fetches .m3u8 and .ts files from Cloudflare R2 (CDN URL, not the Go server)
- EventSource connects to GET /sse/viewers/:classId on the Go server for viewer counts

Spring Boot calls this service internally to get the hlsUrl when a client requests GET /api/clases/:id.

---

### Public endpoints (browser-facing)

#### GET /sse/viewers/:classId  (browser → Go directly)

Real-time viewer count stream. The browser connects via EventSource.

Response: `text/event-stream`

Events pushed every ~5 seconds or on change:
```
data: {"classId": "uuid", "count": 128}
```

Errors:
- 404 — no active session for this classId

---

### Internal endpoints (Spring Boot → Go, firewall-restricted in production)

#### GET /internal/session/:classId

Returns the active stream session metadata for a class. Called by Spring Boot when
building the GET /api/clases/:id response.

Response 200:
```json
{
  "classId": "uuid",
  "status": "live",
  "hlsUrl": "https://cdn.blume.app/hls/uuid/index.m3u8",
  "viewerCount": 128,
  "startedAt": "2026-04-03T13:00:00Z"
}
```

Errors:
- 404 — no active session

---

#### POST /internal/session/start  (future — Phase 3)

Notifies Go that a stream session should begin. Go generates the RTMP ingest URL
and returns it to Spring Boot, which stores it and returns it to the instructor.

Request:
```json
{ "classId": "uuid" }
```

Response 201:
```json
{
  "classId": "uuid",
  "rtmpUrl": "rtmp://stream.blume.app:1935/live/stream-key-uuid",
  "streamKey": "stream-key-uuid"
}
```

---

#### POST /internal/session/stop  (future — Phase 3)

Ends the RTMP session, finalizes HLS segments, and triggers a webhook back to
Spring Boot to update the class status to 'recorded'.

Request:
```json
{ "classId": "uuid" }
```

Response 200:
```json
{ "classId": "uuid", "recordedUrl": "https://cdn.blume.app/recorded/uuid/index.m3u8" }
```

---

### Go + Gin server structure (for the streaming-server team)

The Gin router exposes two port groups:

```
Port 1935: Raw TCP — handled by a custom RTMP listener, not Gin.
Port 9090: HTTP — handled by Gin:

  Public routes (browser-facing):
    GET  /sse/viewers/:classId     → SSE viewer count stream

  Internal routes (Spring Boot-facing, firewall-restricted in production):
    GET  /internal/session/:classId
    POST /internal/session/start
    POST /internal/session/stop
```

Gin middleware stack:
- CORS (allow frontend origin + Spring Boot origin)
- Request logger
- Recovery (panic → 500)
- JWT validation on `/internal/*` routes (shared secret with Spring Boot)

---

## CORS configuration

### Spring Boot

Standard Spring Security CORS config allowing the frontend origin (`http://localhost:3000` in dev, `https://blume.app` in prod).

### Go + Gin streaming server

The Gin server must allow browser connections for the SSE endpoint:

```go
import "github.com/gin-contrib/cors"

r := gin.New()
r.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"http://localhost:3000", "https://blume.app"},
    AllowMethods:     []string{"GET"},
    AllowHeaders:     []string{"Origin", "Cache-Control"},
    ExposeHeaders:    []string{"Content-Type"},
    AllowCredentials: false,  // SSE does not use cookies
}))
```

Note: SSE connections do not send the `blume_session` cookie (they are public endpoints
or use query param auth in Phase 3). `AllowCredentials` is `false` here.

---

## Environment variables (base URLs)

```
Spring Boot:   http://localhost:8080/api   (Backend API)
Golang + Gin:  http://localhost:9090       (Streaming Server — SSE + internal API)
Cloudflare R2: https://cdn.blume.app      (HLS segments CDN — not a server you run)
```

---

## Error format (both services)

All error responses use the same envelope:

```json
{
  "error": {
    "status": 404,
    "message": "Class not found"
  }
}
```

Frontend maps this to `ApiError` from `src/types/api.ts`.
