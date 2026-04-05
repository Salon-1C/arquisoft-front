import type { Class } from '@/types/class'
import ClassCard from './ClassCard'

interface ClassGridProps {
  classes: Class[]
}

export default function ClassGrid({ classes }: ClassGridProps) {
  return (
    <div className="divide-y divide-border md:divide-y-0 md:space-y-3 md:px-20 md:py-5">
      {classes.map((cls) => (
        <div key={cls.id} className="animate-card-appear">
          <ClassCard class={cls} />
        </div>
      ))}
    </div>
  )
}
