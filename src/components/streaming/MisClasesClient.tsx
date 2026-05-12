'use client'

import { useState, useMemo } from 'react'
import type { Course } from '@/types/course'
import Link from 'next/link'
import { BookOpen, Search } from 'lucide-react'

interface MisClasesClientProps {
  courses: Course[]
}

export default function MisClasesClient({ courses }: MisClasesClientProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return courses
    return courses.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.instructorName.toLowerCase().includes(q)
    )
  }, [courses, query])

  return (
    <>
      <div className="flex items-center gap-3 px-5 py-3 md:px-20">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en mis clases"
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 px-5 pb-8 md:px-20">
        {filtered.map((course) => {
          const isLive = course.streams.some((s) => s.status === 'live')
          const recordedCount = course.streams.filter((s) => s.status === 'recorded').length

          return (
            <Link
              key={course.id}
              href={`/cursos/${course.id}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-shadow hover:shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {course.instructorName.charAt(0).toUpperCase()}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{course.name}</span>
                  {isLive && (
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

      {filtered.length === 0 && (
        <div className="flex h-40 items-center justify-center px-8 text-center">
          <p className="text-sm text-muted-foreground">
            {query ? 'Sin resultados para tu búsqueda' : 'No hay clases disponibles'}
          </p>
        </div>
      )}
    </>
  )
}
