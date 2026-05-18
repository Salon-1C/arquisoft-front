import type { ClassGrade } from '@/types/class'
import { GraduationCap } from 'lucide-react'

interface ClassGradesSectionProps {
  grades: ClassGrade[]
}

const TYPE_LABELS: Record<ClassGrade['type'], string> = {
  EXAM:         'Examen',
  PROJECT:      'Proyecto',
  PRESENTATION: 'Presentación',
  QUIZ:         'Quiz',
}

const TYPE_STYLES: Record<ClassGrade['type'], string> = {
  EXAM:         'bg-primary/10 text-primary',
  PROJECT:      'bg-blue-100 text-blue-700',
  PRESENTATION: 'bg-orange-100 text-orange-700',
  QUIZ:         'bg-green-100 text-green-700',
}

function computeAccumulated(grades: ClassGrade[]): number {
  const totalWeight = grades.reduce((sum, g) => sum + g.weight, 0)
  if (totalWeight === 0) return 0
  const weightedSum = grades.reduce((sum, g) => sum + (g.score ?? 0) * g.weight, 0)
  return weightedSum / totalWeight
}

export default function ClassGradesSection({ grades }: ClassGradesSectionProps) {
  if (grades.length === 0) {
    return (
      <section>
        <h2 className="mb-4 text-lg font-semibold">Notas del curso</h2>
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border py-10 text-muted-foreground">
          <GraduationCap className="size-8 opacity-30" />
          <p className="text-sm">No hay notas registradas para este curso</p>
        </div>
      </section>
    )
  }

  const accumulated = computeAccumulated(grades)

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Notas del curso</h2>

      <div className="rounded-xl border border-border overflow-hidden">
        <div className="hidden grid-cols-[1fr_auto_auto_auto] gap-x-6 border-b border-border bg-muted/50 px-5 py-2 text-xs font-medium text-muted-foreground sm:grid">
          <span>Evaluación</span>
          <span>Tipo</span>
          <span className="text-right">Peso</span>
          <span className="text-right">Nota</span>
        </div>

        <div className="divide-y divide-border">
          {grades.map((grade) => (
            <div
              key={grade.id}
              className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-3 sm:grid-cols-[1fr_auto_auto_auto] sm:gap-x-6"
            >
              <span className="text-sm font-medium">{grade.name}</span>

              <span
                className={[
                  'order-2 rounded-full px-2 py-0.5 text-xs font-medium sm:order-none',
                  TYPE_STYLES[grade.type],
                ].join(' ')}
              >
                {TYPE_LABELS[grade.type]}
              </span>

              <span className="order-3 text-right text-sm text-muted-foreground sm:order-none">
                {grade.weight.toFixed(0)}%
              </span>

              <span
                className={[
                  'order-1 text-right text-sm font-semibold sm:order-none',
                  grade.score !== null ? 'text-foreground' : 'text-muted-foreground',
                ].join(' ')}
              >
                {grade.score !== null ? grade.score.toFixed(1) : '—'}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-muted/50 px-5 py-3">
          <span className="text-sm font-medium text-muted-foreground">Nota acumulada</span>
          <span className="text-base font-bold text-primary">{accumulated.toFixed(2)}</span>
        </div>
      </div>
    </section>
  )
}
