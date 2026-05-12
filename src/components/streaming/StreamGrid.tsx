import type { Stream } from '@/types/stream'
import StreamCard from './StreamCard'

interface StreamGridProps {
  streams: Stream[]
}

export default function StreamGrid({ streams }: StreamGridProps) {
  return (
    <div className="divide-y divide-border md:divide-y-0 md:space-y-3 md:px-20 md:py-5">
      {streams.map((stream) => (
        <div key={stream.id} className="animate-card-appear">
          <StreamCard stream={stream} />
        </div>
      ))}
    </div>
  )
}
