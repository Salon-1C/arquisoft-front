import { cookies } from 'next/headers'
import type { Stream } from '@/types/stream'
import { getEnrolledChannelAsClassDetail } from '@/lib/api/channels'
import LiveView from './LiveView'
import ChannelTabs from '@/components/channels/ChannelTabs'

export const dynamic = 'force-dynamic'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

async function fetchStream(id: string): Promise<Stream | undefined> {
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

    if (!res.ok) return undefined

    const wrapper = (await res.json()) as { data: Stream }
    return wrapper.data
  } catch {
    return undefined
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

  const channelDetail = await getEnrolledChannelAsClassDetail(stream.channelId)
  const streamPath = `/live/${stream.id}`

  return (
    <div className="h-full overflow-y-auto">
      <main className="mx-auto max-w-4xl px-4 py-8 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">{stream.title}</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">Por {stream.instructorName}</p>
        </div>
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
