import { getCourseById } from '@/lib/api/courses'
import { getEnrolledChannelAsClassDetail } from '@/lib/api/channels'
import type { ClassRecording } from '@/types/class'
import CourseHeader from '@/components/cursos/CourseHeader'
import LiveStreamBanner from '@/components/cursos/LiveStreamBanner'
import ChannelTabs from '@/components/cursos/ChannelTabs'
import { notFound } from 'next/navigation'

interface CoursePageProps {
  params: Promise<{ id: string }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params

  const [courseResult, classDetail] = await Promise.all([
    getCourseById(id).catch(() => null),
    getEnrolledChannelAsClassDetail(id),
  ])

  if (!courseResult) notFound()
  const course = courseResult.data

  const featuredStream = course.streams[0] ?? null

  const recordings: ClassRecording[] = course.streams
    .filter((s) => s.status === 'recorded' && (featuredStream?.status === 'live' || s.id !== featuredStream?.id))
    .map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      startedAt: s.startedAt,
      endedAt: s.endedAt ?? '',
    }))

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto">
        <CourseHeader course={course} />

        <div className="border-t border-border/60" />

        {featuredStream && (
          <div className="pt-5">
            <LiveStreamBanner stream={featuredStream} />
          </div>
        )}

        <div className="px-5 md:px-8 pt-5 pb-8">
          <ChannelTabs
            description={course.description}
            recordings={recordings}
            materials={classDetail?.materials ?? []}
          />
        </div>
      </div>

      <div className="hidden md:block w-(--sidebar-width) shrink-0 border-l border-border bg-muted" />
    </div>
  )
}
