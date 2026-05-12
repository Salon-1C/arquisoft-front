import { getCourses } from '@/lib/api/courses'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default async function CursosPage() {
  const result = await getCourses()
  const courses = result.data

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 pt-6 pb-4 md:px-8">
          <h1 className="text-2xl font-bold tracking-tight">Mis Cursos</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Accede a tus cursos y clases grabadas.
          </p>
        </div>

        <div className="flex flex-col gap-2 px-5 pb-8 md:px-8">
          {courses.map((course) => {
            const liveStream = course.streams.find((s) => s.status === 'live')
            const recordedCount = course.streams.filter((s) => s.status === 'recorded').length

            return (
              <Link
                key={course.id}
                href={`/cursos/${course.id}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-shadow hover:shadow-sm"
              >
                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {course.instructorName.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{course.name}</span>
                    {liveStream && (
                      <span className="flex items-center gap-1 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        <span className="relative flex size-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-white" />
                        </span>
                        EN VIVO
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {course.instructorName} · {recordedCount} grabación{recordedCount !== 1 ? 'es' : ''}
                  </span>
                </div>

                <BookOpen className="size-5 shrink-0 text-muted-foreground" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Right panel — same width as left sidebar, desktop only */}
      <div className="hidden md:block w-(--sidebar-width) shrink-0 border-l border-border bg-muted" />
    </div>
  )
}
