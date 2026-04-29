import { Play, Radio } from 'lucide-react'
import Link from 'next/link'
import LiveBadge from '@/components/common/LiveBadge/LiveBadge'

interface ChannelStreamStubProps {
  isLive: boolean
  liveStreamId?: string
  channelName: string
}

export default function ChannelStreamStub({
  isLive,
  liveStreamId,
  channelName,
}: ChannelStreamStubProps) {
  return (
    <div className="flex min-h-[80svh] items-center justify-center bg-zinc-950">
      {isLive ? (
        <div className="flex flex-col items-center gap-5 px-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-live/10 ring-1 ring-live/20">
            <Radio className="size-9 text-live animate-pulse" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <LiveBadge />
            <p className="text-lg font-semibold text-white">{channelName}</p>
            <p className="text-sm text-white/40">
              La integración con el stream estará disponible próximamente
            </p>
          </div>
          {liveStreamId && (
            <Link
              href={`/clase/${liveStreamId}`}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ver en pantalla completa
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 px-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
            <Play className="size-9 text-white/20" />
          </div>
          <div>
            <p className="text-base font-medium text-white/50">Sin transmisión activa</p>
            <p className="mt-1 text-sm text-white/25">
              Las sesiones grabadas están disponibles abajo
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
