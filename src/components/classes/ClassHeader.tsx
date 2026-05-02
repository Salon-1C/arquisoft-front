import LiveBadge from '@/components/common/LiveBadge/LiveBadge'
import Image from 'next/image'

interface ClassHeaderProps {
  title: string
  description?: string
  instructorName: string
  thumbnailUrl?: string
  isLive?: boolean
}

export default function ClassHeader({
  title,
  description,
  instructorName,
  thumbnailUrl,
  isLive,
}: ClassHeaderProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
        {thumbnailUrl ? (
          <Image src={thumbnailUrl} alt={title} fill className="object-cover" />
        ) : (
          <span className="text-xl font-bold text-primary">
            {title.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold leading-tight">{title}</h1>
          {isLive && <LiveBadge />}
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">{instructorName}</p>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}
