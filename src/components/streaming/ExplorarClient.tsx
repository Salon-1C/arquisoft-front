'use client'

import { useState, useMemo } from 'react'
import type { Course } from '@/types/course'
import type { RecommendedStream } from '@/lib/api/recommendations'
import Link from 'next/link'
import { BookOpen, Search, SlidersHorizontal } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import StreamCard from '@/components/streaming/StreamCard'

interface ExplorarClientProps {
  courses: Course[]
  recommendations: RecommendedStream[]
}

export default function ExplorarClient({ courses, recommendations }: ExplorarClientProps) {
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [code, setCode] = useState('')

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
            placeholder="Buscar"
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
        </div>

        <button
          type="button"
          className="flex cursor-pointer items-center justify-center rounded-lg border border-input bg-background p-2 text-muted-foreground transition-colors hover:bg-muted"
        >
          <SlidersHorizontal className="size-4" />
        </button>

        {/* TODO: restore when join-by-code flow is ready */}
        {false && (
          <Button
            onClick={() => setModalOpen(true)}
            className="hidden cursor-pointer shrink-0 md:inline-flex"
          >
            Unirme con código
          </Button>
        )}
      </div>

      {recommendations.length > 0 && (
        <div className="px-5 pb-6 md:px-20">
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Recomendado para ti
          </h2>
          <div className="flex flex-col gap-1 rounded-xl border border-border bg-background overflow-hidden">
            {recommendations.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </div>
      )}

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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Unirme con código</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ingresa el código de la clase"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
            <Button
              className="w-full cursor-pointer"
              onClick={() => { /* TODO: join class with code */ }}
            >
              Ingresar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
