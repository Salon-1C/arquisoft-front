import { getEnrolledChannelAsCourse, getEnrolledChannelAsClassDetail, getPublicChannelById, getPublicChannelAsClassDetail, getChannelGrades } from '@/lib/api/channels'
import type { ClassGrade, ClassRecording } from '@/types/class'
import type { Course } from '@/types/course'
import CourseHeader from '@/components/cursos/CourseHeader'
import LiveStreamBanner from '@/components/cursos/LiveStreamBanner'
import ChannelTabs from '@/components/cursos/ChannelTabs'
import { notFound } from 'next/navigation'

interface CoursePageProps {
  params: Promise<{ id: string }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params

  let course: Course | undefined = await getEnrolledChannelAsCourse(id)
  let enrolled = true

  if (!course) {
    course = await getPublicChannelById(id)
    if (!course) notFound()
    enrolled = false
  }

  const classDetail = enrolled
    ? await getEnrolledChannelAsClassDetail(id)
    : await getPublicChannelAsClassDetail(id)

  const grades: ClassGrade[] = await getChannelGrades(id)

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
        <CourseHeader course={course} enrolled={enrolled} />

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
            grades={grades}
          />
        </div>
      </div>

      <div className="hidden md:block w-(--sidebar-width) shrink-0 border-l border-border bg-muted" />
    </div>
  )
}
