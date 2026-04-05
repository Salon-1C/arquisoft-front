export default async function ClasePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <main>
      <h1>Clase: {id}</h1>
    </main>
  )
}
