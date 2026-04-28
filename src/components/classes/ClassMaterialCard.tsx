import type { ClassMaterial } from '@/types/class'
import { Download, File, FileText } from 'lucide-react'

interface ClassMaterialCardProps {
  material: ClassMaterial
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function ClassMaterialCard({ material }: ClassMaterialCardProps) {
  const isPDF = material.fileType.toUpperCase() === 'PDF'
  const Icon = isPDF ? FileText : File

  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-background p-4 transition-shadow hover:shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="size-5 text-primary" />
      </div>

      <div className="flex flex-1 min-w-0 items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-medium leading-snug">{material.title}</h3>
          {material.description && (
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {material.description}
            </p>
          )}
          <div className="mt-1.5 flex items-center gap-2">
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {material.fileType}
            </span>
            <span className="text-xs text-muted-foreground">{formatDate(material.createdAt)}</span>
          </div>
        </div>

        <button
          type="button"
          className="flex shrink-0 cursor-pointer items-center justify-center rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Descargar"
        >
          <Download className="size-4" />
        </button>
      </div>
    </div>
  )
}
