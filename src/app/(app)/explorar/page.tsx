import { getPublicChannels } from '@/lib/api/channels'
import { getTrending } from '@/lib/api/recommendations'
import ExplorarClient from '@/components/streaming/ExplorarClient'
import type { Course } from '@/types/course'
import type { RecommendedStream } from '@/lib/api/recommendations'

export const dynamic = 'force-dynamic'

export default async function ExplorarPage() {
  let courses: Course[] = []
  let fetchError = false
  let recommendations: RecommendedStream[] = []

  await Promise.all([
    getPublicChannels()
      .then((data) => { courses = data })
      .catch(() => { fetchError = true }),
    getTrending(8)
      .then((res) => { recommendations = res.items })
      .catch(() => { /* MS not available — section stays hidden */ }),
  ])

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto md:bg-muted">
        {fetchError ? (
          <div className="flex h-full items-center justify-center text-center px-8">
            <div>
              <p className="text-base font-medium">No se pudo cargar las clases</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Intenta recargar la página.
              </p>
            </div>
          </div>
        ) : courses.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center px-8">
            <div>
              <p className="text-base font-medium">No hay clases disponibles</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Vuelve más tarde o únete con un código de acceso.
              </p>
            </div>
          </div>
        ) : (
          <ExplorarClient courses={courses} recommendations={recommendations} />
        )}
      </div>
      <div className="hidden md:block w-(--sidebar-width) shrink-0 border-l border-border bg-muted" />
    </div>
  )
}
