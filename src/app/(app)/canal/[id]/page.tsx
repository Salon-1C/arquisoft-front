import { getClassById } from '@/lib/api/classes'
import ClassHeader from '@/components/classes/ClassHeader'
import ClassLiveSection from '@/components/classes/ClassLiveSection'
import ClassRecordingsSection from '@/components/classes/ClassRecordingsSection'
import ClassMaterialsSection from '@/components/classes/ClassMaterialsSection'

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
      <div className="mx-auto max-w-4xl space-y-10 px-5 py-8 md:px-10">
        <ClassHeader cls={cls} />
        <ClassLiveSection isLive={cls.isLive} liveStreamId={cls.liveStreamId} />
        <ClassRecordingsSection recordings={recordings} />
        <ClassMaterialsSection materials={materials} />
      </div>
    </div>
  )
}
