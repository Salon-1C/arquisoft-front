'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Course } from '@/types/course'
import { apiFetch, ApiError } from '@/lib/api/client'
import { Button } from '@/components/ui/button'

interface CourseHeaderProps {
  course: Course
  enrolled: boolean
}

export default function CourseHeader({ course, enrolled }: CourseHeaderProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleEnroll() {
    setLoading(true)
    setError(null)
    try {
      await apiFetch(`/api/cursos/${course.id}/inscribirse`, { method: 'POST' })
      router.refresh()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Error al inscribirse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-5 pt-6 pb-5 md:px-8">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {course.instructorName.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm text-muted-foreground">{course.instructorName}</span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">{course.name}</h1>
        {!enrolled && (
          <Button onClick={handleEnroll} disabled={loading} className="shrink-0">
            {loading ? 'Inscribiendo...' : 'Inscribirse'}
          </Button>
        )}
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
        {course.description}
      </p>

      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
