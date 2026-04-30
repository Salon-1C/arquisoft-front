import { getEnrolledChannels } from '@/lib/api/channels'
import MisClasesClient from '@/components/streaming/MisClasesClient'
import type { Stream } from '@/types/stream'

export const dynamic = 'force-dynamic'

export default async function MisClasesPage() {
  let streams: Stream[] = []
  let fetchError = false

  try {
    const channels = await getEnrolledChannels()
    streams = channels.flatMap((channel) =>
      channel.streams
        .filter((s) => s.status === 'live' || s.status === 'recorded')
        .map((s) => ({
          id: s.id,
          channelId: channel.id,
          title: s.title,
          description: s.description,
          instructorName: channel.instructorName,
          instructorAvatarUrl: channel.instructorAvatarUrl,
          status: s.status,
          type: 'public' as const,
          thumbnailUrl: s.thumbnailUrl,
          startedAt: s.startedAt,
          endedAt: s.endedAt,
        }))
    )
  } catch {
    fetchError = true
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto md:bg-muted">
        {fetchError ? (
          <div className="flex h-full items-center justify-center text-center px-8">
            <div>
              <p className="text-base font-medium">No se pudo cargar tus clases</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Intenta recargar la página.
              </p>
            </div>
          </div>
        ) : streams.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center px-8">
            <div>
              <p className="text-base font-medium">No estás inscrito en ninguna clase</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Explora clases públicas o únete con un código de acceso.
              </p>
            </div>
          </div>
        ) : (
          <MisClasesClient streams={streams} />
        )}
      </div>
      <div className="hidden md:block w-(--sidebar-width) shrink-0 border-l border-border bg-muted" />
    </div>
  )
}
