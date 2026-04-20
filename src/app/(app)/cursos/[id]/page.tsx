import { getCourseById } from '@/lib/api/courses'
import CourseHeader from '@/components/courses/CourseHeader'
import LiveStreamBanner from '@/components/courses/LiveStreamBanner'
import RecordedClassList from '@/components/courses/RecordedClassList'
import { notFound } from 'next/navigation'

interface CoursePageProps {
  params: Promise<{ id: string }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params

  let course
  try {
    const result = await getCourseById(id)
    course = result.data
  } catch {
    notFound()
  }

  const liveStream = course.streams.find((s) => s.status === 'live') ?? null
  const recordedStreams = course.streams.filter((s) => s.status === 'recorded')

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <CourseHeader course={course} />

        <div className="border-t border-border/60" />

        {/* Live stream block — only shown if there's an active stream */}
        {liveStream && (
          <div className="pt-5">
            <LiveStreamBanner stream={liveStream} />
          </div>
        )}

        {/* Recorded classes list */}
        <div className={liveStream ? '' : 'pt-5'}>
          <RecordedClassList streams={recordedStreams} />
        </div>
      </div>

      {/* Right panel — same width as left sidebar, desktop only */}
      <div className="hidden md:block w-(--sidebar-width) shrink-0 border-l border-border bg-muted" />
    </div>
  )
}
