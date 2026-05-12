# Stage 1: install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: build the Next.js app
FROM node:20-alpine AS build
WORKDIR /app

# NEXT_PUBLIC_* variables are baked into the bundle at build time.
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_STREAM_URL
ARG NEXT_PUBLIC_RECORDINGS_URL
ARG NEXT_PUBLIC_PHOENIX_URL
ARG NEXT_PUBLIC_STREAM_KEY
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_STREAM_URL=$NEXT_PUBLIC_STREAM_URL
ENV NEXT_PUBLIC_RECORDINGS_URL=$NEXT_PUBLIC_RECORDINGS_URL
ENV NEXT_PUBLIC_PHOENIX_URL=$NEXT_PUBLIC_PHOENIX_URL
ENV NEXT_PUBLIC_STREAM_KEY=$NEXT_PUBLIC_STREAM_KEY

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: production runtime
FROM node:20-alpine AS run
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S blume && adduser -S -G blume blume

COPY --from=build --chown=blume:blume /app/.next/standalone ./
COPY --from=build --chown=blume:blume /app/.next/static ./.next/static
COPY --from=build --chown=blume:blume /app/public ./public

USER blume

EXPOSE 3000

CMD ["node", "server.js"]
