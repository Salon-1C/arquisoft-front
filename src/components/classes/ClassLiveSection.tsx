import { Radio } from 'lucide-react'
import Link from 'next/link'

interface ClassLiveSectionProps {
  isLive: boolean
  liveStreamId?: string
}

export default function ClassLiveSection({ isLive, liveStreamId }: ClassLiveSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">En vivo</h2>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
        {isLive ? (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-live/10 px-4 py-2 text-live">
              <Radio className="size-4 animate-pulse" />
              <span className="text-sm font-medium">Transmisión en curso</span>
            </div>
            <p className="text-xs text-muted-foreground">
              La integración con el stream estará disponible próximamente
            </p>
            {liveStreamId && (
              <Link
                href={`/clase/${liveStreamId}`}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Ver en pantalla completa
              </Link>
            )}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <Radio className="size-8 opacity-30" />
            <p className="text-sm">No hay transmisión en vivo en este momento</p>
          </div>
        )}
      </div>
    </section>
  )
}
