'use client'

import { useState } from 'react'
import { AlignLeft, Film, GraduationCap, Paperclip } from 'lucide-react'
import type { ClassGrade, ClassMaterial, ClassRecording } from '@/types/class'
import { useAuth } from '@/hooks/useAuth'
import ClassRecordingsSection from '@/components/classes/ClassRecordingsSection'
import ClassMaterialsSection from '@/components/classes/ClassMaterialsSection'
import ClassGradesSection from '@/components/classes/ClassGradesSection'
import ProfessorGradesSection from '@/components/classes/ProfessorGradesSection'

interface ChannelTabsProps {
  channelId: string
  description?: string
  recordings: ClassRecording[]
  materials: ClassMaterial[]
  grades: ClassGrade[]
}

type TabId = 'descripcion' | 'grabaciones' | 'material' | 'notas'

interface TabDef {
  id: TabId
  label: string
  Icon: React.ElementType
}

const TABS: TabDef[] = [
  { id: 'descripcion', label: 'Descripción',          Icon: AlignLeft      },
  { id: 'grabaciones', label: 'Transmisiones pasadas', Icon: Film           },
  { id: 'material',    label: 'Material de apoyo',     Icon: Paperclip      },
  { id: 'notas',       label: 'Notas',                 Icon: GraduationCap  },
]

export default function ChannelTabs({ channelId, description, recordings, materials, grades }: ChannelTabsProps) {
  const [active, setActive] = useState<TabId>('descripcion')
  const { user } = useAuth()
  const isProfessor = user?.role === 'profesor'

  return (
    <div>
      <div className="flex overflow-x-auto border-b border-border">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={[
                'flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? '-mb-px border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              <Icon className="size-4" />
              {label}
            </button>
          )
        })}
      </div>

      <div className="pt-6">
        {active === 'descripcion' && (
          description ? (
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Sin descripción disponible.</p>
          )
        )}
        {active === 'grabaciones' && <ClassRecordingsSection recordings={recordings} />}
        {active === 'material'    && <ClassMaterialsSection  materials={materials}  />}
        {active === 'notas'       && (
          isProfessor
            ? <ProfessorGradesSection channelId={channelId} />
            : <ClassGradesSection grades={grades} />
        )}
      </div>
    </div>
  )
}
