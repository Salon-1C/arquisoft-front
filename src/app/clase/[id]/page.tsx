import { getStreamById } from '@/lib/streams/store'
import LiveView from './LiveView'

export const dynamic = 'force-dynamic'

export default async function ClasePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const stream = getStreamById(id)

  if (!stream) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-muted-foreground text-sm">Stream no encontrado o ya finalizado.</p>
      </main>
    )
  }

  const streamPath = `/live/${stream.streamKey}`

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">{stream.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{stream.description}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Por {stream.instructorName}</p>
      </div>
      <LiveView classId={id} streamPath={streamPath} initialViewerCount={0} />
    </main>
  )
}
