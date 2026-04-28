import type { Class } from '@/types/class'
import LiveBadge from '@/components/common/LiveBadge/LiveBadge'
import Image from 'next/image'

interface ClassHeaderProps {
  cls: Class
}

export default function ClassHeader({ cls }: ClassHeaderProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
        {cls.thumbnailUrl ? (
          <Image src={cls.thumbnailUrl} alt={cls.name} fill className="object-cover" />
        ) : (
          <span className="text-xl font-bold text-primary">
            {cls.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold leading-tight">{cls.name}</h1>
          {cls.isLive && <LiveBadge />}
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">{cls.instructorName}</p>
        {cls.description && (
          <p className="mt-2 text-sm text-muted-foreground">{cls.description}</p>
        )}
      </div>
    </div>
  )
}
