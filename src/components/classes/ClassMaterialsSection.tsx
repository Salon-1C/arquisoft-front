import type { ClassMaterial } from '@/types/class'
import ClassMaterialCard from './ClassMaterialCard'
import { BookOpen } from 'lucide-react'

interface ClassMaterialsSectionProps {
  materials: ClassMaterial[]
}

export default function ClassMaterialsSection({ materials }: ClassMaterialsSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Material de clase</h2>
      {materials.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border py-10 text-muted-foreground">
          <BookOpen className="size-8 opacity-30" />
          <p className="text-sm">No hay material disponible</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {materials.map((material) => (
            <ClassMaterialCard key={material.id} material={material} />
          ))}
        </div>
      )}
    </section>
  )
}
