import { getStreams } from '@/lib/streams/store'
import type { Class } from '@/types/class'
import ExplorarClient from '@/components/classes/ExplorarClient'

function streamToClass(s: ReturnType<typeof getStreams>[number]): Class {
  return {
    id: s.id,
    title: s.name,
    description: s.description,
    instructorName: s.instructorName,
    status: 'live',
    type: 'public',
    startedAt: s.createdAt,
  }
}

export const dynamic = 'force-dynamic'

export default function ExplorarPage() {
  const streams = getStreams()
  const classes = streams.map(streamToClass)

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto md:bg-muted">
        {classes.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center px-8">
            <div>
              <p className="text-base font-medium">No hay streams en vivo</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Los profesores pueden crear uno desde{' '}
                <span className="font-medium text-foreground">Transmitir</span>.
              </p>
            </div>
          </div>
        ) : (
          <ExplorarClient classes={classes} />
        )}
      </div>
      <div className="hidden md:block w-(--sidebar-width) shrink-0 border-l border-border bg-muted" />
    </div>
  )
}
