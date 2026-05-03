import { cookies } from 'next/headers'
import type { Stream } from '@/types/stream'
import { getEnrolledChannelAsClassDetail } from '@/lib/api/channels'
import LiveView from './LiveView'
import ChannelTabs from '@/components/cursos/ChannelTabs'
import ClassHeader from '@/components/classes/ClassHeader'

export const dynamic = 'force-dynamic'

const API_BASE = process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL

async function fetchStream(id: string): Promise<Stream | 'server_error' | undefined> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('blume_session')?.value

    const res = await fetch(`${API_BASE}/api/clases/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(session ? { Cookie: `blume_session=${session}` } : {}),
      },
      cache: 'no-store',
    })

    if (!res.ok) return res.status >= 500 ? 'server_error' : undefined

    const wrapper = (await res.json()) as { data: Stream }
    return wrapper.data
  } catch {
    return 'server_error'
  }
}

export default async function ClasePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const stream = await fetchStream(id)

  if (!stream) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-muted-foreground text-sm">Clase no encontrada o no disponible.</p>
      </main>
    )
  }

  if (stream === 'server_error') {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-muted-foreground text-sm">No se pudo cargar la clase. Intenta de nuevo más tarde.</p>
      </main>
    )
  }

  const channelDetail = await getEnrolledChannelAsClassDetail(stream.channelId)
  const streamPath = `/live/${stream.id}`

  return (
    <div className="h-full overflow-y-auto">
      <main className="mx-auto max-w-4xl px-4 py-8 flex flex-col gap-4">
        <ClassHeader
          title={stream.title}
          description={stream.description}
          instructorName={stream.instructorName}
          thumbnailUrl={stream.thumbnailUrl}
          isLive={stream.status === 'live'}
        />
        <LiveView
          classId={id}
          streamPath={streamPath}
          initialViewerCount={0}
          isLive={stream.status === 'live'}
        />
        <ChannelTabs
          description={channelDetail?.cls.description ?? stream.description}
          recordings={channelDetail?.recordings ?? []}
          materials={channelDetail?.materials ?? []}
        />
      </main>
    </div>
  )
}
