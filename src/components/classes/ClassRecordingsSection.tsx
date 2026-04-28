import type { ClassRecording } from '@/types/class'
import ClassRecordingCard from './ClassRecordingCard'
import { VideoOff } from 'lucide-react'

interface ClassRecordingsSectionProps {
  recordings: ClassRecording[]
}

export default function ClassRecordingsSection({ recordings }: ClassRecordingsSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Transmisiones guardadas</h2>
      {recordings.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border py-10 text-muted-foreground">
          <VideoOff className="size-8 opacity-30" />
          <p className="text-sm">No hay transmisiones guardadas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {recordings.map((recording) => (
            <ClassRecordingCard key={recording.id} recording={recording} />
          ))}
        </div>
      )}
    </section>
  )
}
