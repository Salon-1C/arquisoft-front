interface ClasePageProps {
  params: Promise<{ id: string }>
}

export default async function ClasePage({ params }: ClasePageProps) {
  const { id } = await params
  return (
    <main>
      <h1>Clase: {id}</h1>
    </main>
  )
}
