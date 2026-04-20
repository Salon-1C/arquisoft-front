import LiveView from './LiveView'

export default async function ClasePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const streamKey = process.env.NEXT_PUBLIC_STREAM_KEY
  const streamPath = streamKey ? `/live/${streamKey}` : undefined

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Clase: {id}</h1>
      {streamPath ? (
        <LiveView classId={id} streamPath={streamPath} initialViewerCount={0} />
      ) : (
        <p className="text-muted-foreground text-sm">
          No hay stream disponible en este momento.
        </p>
      )}
    </main>
  )
}
