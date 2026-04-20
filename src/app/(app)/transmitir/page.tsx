'use client'

import { useState } from 'react'
import { Radio, Copy, Check, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { StreamRecord } from '@/lib/streams/store'

interface CreatedStream extends StreamRecord {
  rtmpUrl: string
}

export default function TransmitirPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [streams, setStreams] = useState<CreatedStream[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const rtmpBase = 'rtmp://localhost:1935/live'
  const recordingsBase = process.env.NEXT_PUBLIC_RECORDINGS_URL ?? process.env.NEXT_PUBLIC_API_URL ?? ''

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/streams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      })
      if (!res.ok) throw new Error('Error al crear el stream')
      const { stream } = (await res.json()) as { stream: StreamRecord }
      // Best-effort sync so past recordings reuse the same title/description.
      await fetch(`${recordingsBase}/internal/streams/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          streamKey: stream.streamKey,
          title: stream.name,
          description: stream.description,
          instructorName: stream.instructorName,
        }),
      }).catch(() => undefined)
      setStreams((prev) => [...prev, { ...stream, rtmpUrl: `${rtmpBase}/${stream.streamKey}` }])
      setName('')
      setDescription('')
    } catch {
      setError('No se pudo crear el stream. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/streams/${id}`, { method: 'DELETE' })
    setStreams((prev) => prev.filter((s) => s.id !== id))
  }

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 flex flex-col gap-8">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Radio className="size-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Nueva transmisión</h1>
          <p className="text-sm text-muted-foreground">Crea un stream y compártelo con tus estudiantes</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleCreate} className="rounded-xl border bg-card p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Nombre del stream</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Introducción a React — Clase 1"
            required
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Breve descripción de lo que vas a enseñar..."
            required
            rows={3}
            className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full cursor-pointer">
          {loading ? 'Creando...' : 'Crear stream'}
        </Button>
      </form>

      {/* Active streams */}
      {streams.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-semibold">Tus streams activos</h2>
          {streams.map((stream) => (
            <div key={stream.id} className="rounded-xl border bg-card p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{stream.name}</p>
                  <p className="text-sm text-muted-foreground">{stream.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(stream.id)}
                  className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                  aria-label="Eliminar stream"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* OBS Config */}
              <div className="rounded-lg bg-muted p-4 flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Configuración para OBS
                </p>
                <ConfigRow
                  label="Servidor RTMP"
                  value="rtmp://localhost:1935/live"
                  copyKey={`server-${stream.id}`}
                  copied={copied}
                  onCopy={copyToClipboard}
                />
                <ConfigRow
                  label="Clave de stream"
                  value={stream.streamKey}
                  copyKey={`key-${stream.id}`}
                  copied={copied}
                  onCopy={copyToClipboard}
                  mono
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Los estudiantes ya pueden encontrar este stream en{' '}
                <span className="font-medium text-foreground">Explorar clases</span>.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ConfigRow({
  label,
  value,
  copyKey,
  copied,
  onCopy,
  mono = false,
}: {
  label: string
  value: string
  copyKey: string
  copied: string | null
  onCopy: (text: string, key: string) => void
  mono?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-sm truncate ${mono ? 'font-mono' : 'font-medium'}`}>{value}</p>
      </div>
      <button
        onClick={() => onCopy(value, copyKey)}
        className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground cursor-pointer"
        aria-label={`Copiar ${label}`}
      >
        {copied === copyKey ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
      </button>
    </div>
  )
}
