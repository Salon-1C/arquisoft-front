'use client'

import { useEffect, useState } from 'react'
import type { Recording } from '@/types/recording'

function formatDate(raw: string): string {
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return raw
  return date.toLocaleString()
}

export default function GrabacionesPage() {
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [error, setError] = useState<string | null>(null)
  const base = process.env.NEXT_PUBLIC_RECORDINGS_URL ?? process.env.NEXT_PUBLIC_API_URL ?? ''

  useEffect(() => {
    fetch(`${base}/api/recordings?limit=50&offset=0`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
        return (await res.json()) as { recordings: Recording[] }
      })
      .then((data) => setRecordings(data.recordings ?? []))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error cargando grabaciones'))
  }, [])

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto px-6 py-6 md:bg-muted">
        <h1 className="text-2xl font-semibold tracking-tight">Transmisiones pasadas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Historial de grabaciones disponibles para toda la comunidad.
        </p>

        {error ? (
          <div className="mt-8 rounded-md border bg-background p-4 text-sm text-destructive">{error}</div>
        ) : recordings.length === 0 ? (
          <div className="mt-8 rounded-md border bg-background p-6 text-sm text-muted-foreground">
            Aun no hay grabaciones procesadas.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {recordings.map((rec) => (
              <article key={rec.id} className="rounded-lg border bg-background p-4">
                <h2 className="text-base font-medium">{rec.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {rec.description || 'Sin descripcion'}
                </p>
                <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <div>
                    <dt className="inline font-medium text-foreground">Instructor: </dt>
                    <dd className="inline">{rec.instructorName}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-foreground">Inicio: </dt>
                    <dd className="inline">{formatDate(rec.startedAt)}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-foreground">Estado: </dt>
                    <dd className="inline capitalize">{rec.status}</dd>
                  </div>
                </dl>
                <div className="mt-4">
                  <video
                    controls
                    preload="metadata"
                    className="w-full rounded-md border bg-black"
                    src={`${base}/api/recordings/${rec.id}/play`}
                  />
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <a
                    href={`${base}/api/recordings/${rec.id}/play`}
                    className="text-sm font-medium text-primary underline underline-offset-4"
                  >
                    Ver en navegador
                  </a>
                  <a
                    href={`${base}/api/recordings/${rec.id}/play?download=1`}
                    className="text-sm font-medium text-primary underline underline-offset-4"
                    download
                  >
                    Descargar
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <div className="hidden w-(--sidebar-width) shrink-0 border-l border-border bg-muted md:block" />
    </div>
  )
}
