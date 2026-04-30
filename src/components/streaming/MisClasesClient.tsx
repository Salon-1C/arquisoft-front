'use client'

import { useState, useMemo } from 'react'
import type { Stream } from '@/types/stream'
import StreamCard from '@/components/streaming/StreamCard'
import { Search } from 'lucide-react'

interface MisClasesClientProps {
  streams: Stream[]
}

export default function MisClasesClient({ streams }: MisClasesClientProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return streams
    return streams.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.instructorName.toLowerCase().includes(q)
    )
  }, [streams, query])

  const live = filtered.filter((s) => s.status === 'live')
  const recorded = filtered.filter((s) => s.status === 'recorded')

  return (
    <>
      <div className="flex items-center gap-3 px-5 py-3 md:px-20">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en mis clases"
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
        </div>
      </div>

      {live.length > 0 && (
        <div className="mb-2">
          <p className="px-5 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:px-20">
            En vivo ahora
          </p>
          <div className="divide-y divide-border md:divide-y-0 md:space-y-3 md:px-20">
            {live.map((stream) => (
              <div key={stream.id} className="animate-card-appear">
                <StreamCard stream={stream} />
              </div>
            ))}
          </div>
        </div>
      )}

      {recorded.length > 0 && (
        <div>
          {live.length > 0 && (
            <p className="mt-4 px-5 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:px-20">
              Grabaciones
            </p>
          )}
          <div className="divide-y divide-border md:divide-y-0 md:space-y-3 md:px-20">
            {recorded.map((stream) => (
              <div key={stream.id} className="animate-card-appear">
                <StreamCard stream={stream} />
              </div>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex h-40 items-center justify-center px-8 text-center">
          <p className="text-sm text-muted-foreground">
            {query ? 'Sin resultados para tu búsqueda' : 'No hay clases disponibles'}
          </p>
        </div>
      )}
    </>
  )
}
