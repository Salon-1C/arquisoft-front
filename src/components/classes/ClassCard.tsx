import type { Class } from '@/types/class'
import LiveBadge from '@/components/common/LiveBadge/LiveBadge'
import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ClassCardProps {
  cls: Class
}

export default function ClassCard({ cls }: ClassCardProps) {
  return (
    <Link
      href={`/clase/${cls.liveStreamId ?? cls.id}`}
      className="flex cursor-pointer items-center gap-4 px-5 py-4 transition-shadow
        md:rounded-xl md:bg-background md:hover:shadow-sm"
    >
      <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg bg-muted">
        {cls.thumbnailUrl ? (
          <Image
            src={cls.thumbnailUrl}
            alt={cls.name}
            fill
            sizes="160px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen className="size-7 text-muted-foreground/40" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          {cls.isLive && <LiveBadge />}
          <h2 className="text-base font-semibold leading-snug truncate">{cls.name}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{cls.instructorName}</p>
        {cls.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{cls.description}</p>
        )}
      </div>

      <span className="hidden shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground md:inline-flex">
        Ver clase
      </span>
    </Link>
  )
}
