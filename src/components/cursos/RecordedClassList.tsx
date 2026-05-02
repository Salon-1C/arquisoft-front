import type { CourseStream } from '@/types/course'
import RecordedClassRow from './RecordedClassRow'

interface RecordedClassListProps {
  streams: CourseStream[]
}

export default function RecordedClassList({ streams }: RecordedClassListProps) {
  if (streams.length === 0) {
    return (
      <div className="px-5 py-10 text-center text-sm text-muted-foreground md:px-8">
        No hay grabaciones disponibles aún.
      </div>
    )
  }

  return (
    <div className="pb-8">
      <h2 className="px-5 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:px-8">
        Clases anteriores
      </h2>
      <div className="flex flex-col divide-y divide-border/60">
        {streams.map((stream) => (
          <RecordedClassRow key={stream.id} stream={stream} />
        ))}
      </div>
    </div>
  )
}
