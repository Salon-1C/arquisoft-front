import Image from 'next/image'
import { getClassById } from '@/lib/api/classes'
import ChannelStreamStub from '@/components/channels/ChannelStreamStub'
import ChannelTabs from '@/components/channels/ChannelTabs'
import LiveBadge from '@/components/common/LiveBadge/LiveBadge'

export const dynamic = 'force-dynamic'

export default async function CanalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const detail = await getClassById(id)

  if (!detail) {
    return (
      <div className="flex h-full items-center justify-center px-8 text-center">
        <div>
          <p className="text-base font-medium">Clase no encontrada</p>
          <p className="mt-1 text-sm text-muted-foreground">
            La clase que buscas no existe o no está disponible.
          </p>
        </div>
      </div>
    )
  }

  const { cls, recordings, materials } = detail

  return (
    <div className="h-full overflow-y-auto">
      {/* Stream — fills roughly 80% of the viewport before the user scrolls */}
      <ChannelStreamStub
        isLive={cls.isLive}
        liveStreamId={cls.liveStreamId}
        channelName={cls.name}
      />

      {/* Info bar + tabbed content */}
      <div className="mx-auto max-w-4xl px-5 py-6 md:px-10">
        {/* Channel identity */}
        <div className="mb-6 flex items-start gap-4 border-b border-border pb-6">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
            {cls.thumbnailUrl ? (
              <Image src={cls.thumbnailUrl} alt={cls.name} fill className="object-cover" />
            ) : (
              <span className="text-lg font-bold text-primary">
                {cls.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold leading-tight">{cls.name}</h1>
              {cls.isLive && <LiveBadge />}
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">{cls.instructorName}</p>
          </div>
        </div>

        <ChannelTabs
          description={cls.description}
          recordings={recordings}
          materials={materials}
        />
      </div>
    </div>
  )
}
