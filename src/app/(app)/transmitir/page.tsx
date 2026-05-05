'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Radio, Copy, Check, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

function TransmitirContent() {
  const searchParams = useSearchParams()
  const classId = searchParams.get('classId')
  const { token } = useAuth()
  const [copied, setCopied] = useState<string | null>(null)

  // --- Guards ---
  if (!classId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Radio className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Transmitir clase</h1>
            <p className="text-sm text-muted-foreground">Accede desde la página de una clase para iniciar la transmisión</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
          <AlertCircle className="size-4 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Clase no seleccionada. Ve a una clase desde <span className="font-medium">Mis clases</span> y haz clic en &quot;Transmitir esta clase&quot;.
          </p>
        </div>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 flex flex-col gap-6">
        <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
          <AlertCircle className="size-4 text-destructive mt-0.5 shrink-0" />
          <p className="text-sm text-destructive">
            No se encontró el token de sesión. Cierra sesión, vuelve a iniciarla y regresa a esta página.
          </p>
        </div>
      </div>
    )
  }

  // --- Derived values ---
  // streamKey IS the classId — single source of truth, consistent with viewer URL (/live/{classId})
  const streamKey = classId
  const rtmpServer = process.env.NEXT_PUBLIC_STREAM_RTMP_URL ?? 'rtmp://localhost:1935'
  const rtmpUrl = `${rtmpServer}/live/${streamKey}?token=${token}`

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text).catch(() => undefined)
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
          <h1 className="text-xl font-semibold">Transmitir clase</h1>
          <p className="text-sm text-muted-foreground">
            Copia la configuración en OBS para iniciar la transmisión en vivo
          </p>
        </div>
      </div>

      {/* OBS Config Card */}
      <div className="rounded-xl border bg-card p-6 flex flex-col gap-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Configuración para OBS
        </p>

        {/* RTMP Server */}
        <ConfigRow
          label="Servidor RTMP"
          value={`${rtmpServer}/live`}
          copyKey="server"
          copied={copied}
          onCopy={copyToClipboard}
        />

        {/* Stream Key = classId */}
        <ConfigRow
          label="Clave de stream"
          value={`${streamKey}?token=${token}`}
          copyKey="key"
          copied={copied}
          onCopy={copyToClipboard}
          mono
        />

        <div className="border-t border-border pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            O usa la URL completa de RTMP
          </p>
          <ConfigRow
            label="URL completa (alternativa)"
            value={rtmpUrl}
            copyKey="full"
            copied={copied}
            onCopy={copyToClipboard}
            mono
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Una vez que abras OBS y empieces a transmitir, los estudiantes verán el video en vivo en su página de clase.
        </p>
      </div>
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
        className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
        aria-label={`Copiar ${label}`}
      >
        {copied === copyKey ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
      </button>
    </div>
  )
}

export default function TransmitirPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    }>
      <TransmitirContent />
    </Suspense>
  )
}
