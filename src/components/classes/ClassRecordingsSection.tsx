import type { ClassRecording } from '@/types/class'
import ClassRecordingCard from './ClassRecordingCard'
import { VideoOff } from 'lucide-react'

interface ClassRecordingsSectionProps {
  recordings: ClassRecording[]
}

export default function ClassRecordingsSection({ recordings }: ClassRecordingsSectionProps) {
  return (
    <section>
      <h2 className="mb-2 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:px-8">
        Clases anteriores
      </h2>
      {recordings.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
          <VideoOff className="size-8 opacity-30" />
          <p className="text-sm">No hay transmisiones guardadas</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-border/60">
          {recordings.map((recording) => (
            <ClassRecordingCard key={recording.id} recording={recording} />
          ))}
        </div>
      )}
    </section>
  )
}
