import type { Course } from '@/types/course'

interface CourseHeaderProps {
  course: Course
}

export default function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className="px-5 pt-6 pb-5 md:px-8">
      {/* Instructor */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {course.instructorName.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm text-muted-foreground">{course.instructorName}</span>
      </div>

      {/* Course name */}
      <h1 className="text-2xl font-bold tracking-tight">{course.name}</h1>

      {/* Description */}
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
        {course.description}
      </p>
    </div>
  )
}
