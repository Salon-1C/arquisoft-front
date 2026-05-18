'use client'

import { useState, useEffect, useMemo } from 'react'
import { GraduationCap, Search, Pencil, Loader2 } from 'lucide-react'
import type { ClassGrade, EnrolledStudent } from '@/types/class'
import { getChannelStudents, getStudentGrades, submitGrade } from '@/lib/api/grades'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface ProfessorGradesSectionProps {
  channelId: string
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

interface GradingTarget {
  gradeId: number
  gradeName: string
  currentScore: number | null
}

export default function ProfessorGradesSection({ channelId }: ProfessorGradesSectionProps) {
  const [students, setStudents] = useState<EnrolledStudent[]>([])
  const [studentsLoading, setStudentsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<EnrolledStudent | null>(null)
  const [grades, setGrades] = useState<ClassGrade[]>([])
  const [gradesLoading, setGradesLoading] = useState(false)
  const [gradingTarget, setGradingTarget] = useState<GradingTarget | null>(null)
  const [scoreInput, setScoreInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    getChannelStudents(channelId)
      .then(setStudents)
      .finally(() => setStudentsLoading(false))
  }, [channelId])

  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return students
    return students.filter(
      (s) => s.fullName.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
    )
  }, [students, search])

  function selectStudent(student: EnrolledStudent) {
    setSelectedStudent(student)
    setGrades([])
    setGradesLoading(true)
    getStudentGrades(channelId, student.studentId)
      .then(setGrades)
      .finally(() => setGradesLoading(false))
  }

  function openGradingDialog(grade: ClassGrade) {
    setGradingTarget({ gradeId: grade.id, gradeName: grade.name, currentScore: grade.score })
    setScoreInput(grade.score !== null ? String(grade.score) : '')
    setSubmitError(null)
  }

  async function handleSubmitGrade() {
    if (!selectedStudent || !gradingTarget) return
    const raw = scoreInput.trim()
    const parsed = raw === '' ? null : parseFloat(raw)
    if (parsed !== null && (isNaN(parsed) || parsed < 0 || parsed > 5)) {
      setSubmitError('La nota debe estar entre 0.0 y 5.0')
      return
    }
    setSubmitting(true)
    setSubmitError(null)
    try {
      await submitGrade(channelId, gradingTarget.gradeId, selectedStudent.studentId, parsed)
      setGrades((prev) =>
        prev.map((g) => (g.id === gradingTarget.gradeId ? { ...g, score: parsed } : g))
      )
      setGradingTarget(null)
    } catch {
      setSubmitError('No se pudo guardar la nota. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  const accumulated = useMemo(() => {
    const totalWeight = grades.reduce((sum, g) => sum + g.weight, 0)
    if (totalWeight === 0) return 0
    return grades.reduce((sum, g) => sum + (g.score ?? 0) * g.weight, 0) / totalWeight
  }, [grades])

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Notas del curso</h2>

      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        {/* Student list */}
        <div className="flex flex-col gap-2 md:w-64 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar estudiante…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            {studentsLoading ? (
              <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground text-sm">
                <Loader2 className="size-4 animate-spin" />
                Cargando estudiantes…
              </div>
            ) : filteredStudents.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                {search ? 'Sin resultados' : 'No hay estudiantes matriculados'}
              </p>
            ) : (
              <ul className="divide-y divide-border max-h-96 overflow-y-auto">
                {filteredStudents.map((student) => {
                  const isSelected = selectedStudent?.studentId === student.studentId
                  return (
                    <li key={student.studentId}>
                      <button
                        type="button"
                        onClick={() => selectStudent(student)}
                        className={[
                          'w-full px-4 py-3 text-left transition-colors',
                          isSelected
                            ? 'bg-primary/10'
                            : 'hover:bg-muted/60',
                        ].join(' ')}
                      >
                        <p className={['text-sm font-medium', isSelected ? 'text-primary' : ''].join(' ')}>
                          {student.fullName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Grades panel */}
        <div className="flex-1">
          {!selectedStudent ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border py-16 text-muted-foreground">
              <GraduationCap className="size-8 opacity-30" />
              <p className="text-sm">Selecciona un estudiante para ver sus notas</p>
            </div>
          ) : gradesLoading ? (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border py-16 text-muted-foreground text-sm">
              <Loader2 className="size-4 animate-spin" />
              Cargando notas…
            </div>
          ) : (
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="px-5 py-3 bg-muted/50 border-b border-border">
                <p className="text-sm font-medium">{selectedStudent.fullName}</p>
                <p className="text-xs text-muted-foreground">{selectedStudent.email}</p>
              </div>

              <div className="hidden grid-cols-[1fr_auto_auto_auto_auto] gap-x-6 border-b border-border bg-muted/50 px-5 py-2 text-xs font-medium text-muted-foreground sm:grid">
                <span>Evaluación</span>
                <span>Tipo</span>
                <span className="text-right">Peso</span>
                <span className="text-right">Nota</span>
                <span />
              </div>

              <div className="divide-y divide-border">
                {grades.map((grade) => (
                  <div
                    key={grade.id}
                    className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-3 sm:grid-cols-[1fr_auto_auto_auto_auto] sm:gap-x-6"
                  >
                    <span className="text-sm font-medium">{grade.name}</span>

                    <span className={['order-2 rounded-full px-2 py-0.5 text-xs font-medium sm:order-none', TYPE_STYLES[grade.type]].join(' ')}>
                      {TYPE_LABELS[grade.type]}
                    </span>

                    <span className="order-3 text-right text-sm text-muted-foreground sm:order-none">
                      {grade.weight.toFixed(0)}%
                    </span>

                    <span className={['order-1 text-right text-sm font-semibold sm:order-none', grade.score !== null ? 'text-foreground' : 'text-muted-foreground'].join(' ')}>
                      {grade.score !== null ? grade.score.toFixed(1) : '—'}
                    </span>

                    <div className="order-4 flex justify-end sm:order-none">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openGradingDialog(grade)}
                        className="gap-1.5 text-xs"
                      >
                        <Pencil className="size-3" />
                        Calificar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border bg-muted/50 px-5 py-3">
                <span className="text-sm font-medium text-muted-foreground">Nota acumulada</span>
                <span className="text-base font-bold text-primary">{accumulated.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grading dialog */}
      <Dialog open={gradingTarget !== null} onOpenChange={(open) => { if (!open) setGradingTarget(null) }}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Calificar evaluación</DialogTitle>
          </DialogHeader>

          {gradingTarget && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Ingresa la nota para <span className="font-medium text-foreground">{gradingTarget.gradeName}</span> de{' '}
                <span className="font-medium text-foreground">{selectedStudent?.fullName}</span>.
              </p>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="score-input" className="text-sm font-medium">
                  Nota <span className="text-muted-foreground font-normal">(0.0 – 5.0)</span>
                </label>
                <Input
                  id="score-input"
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  placeholder="Ej: 3.8"
                  value={scoreInput}
                  onChange={(e) => { setScoreInput(e.target.value); setSubmitError(null) }}
                />
                {submitError && (
                  <p className="text-xs text-destructive">{submitError}</p>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setGradingTarget(null)} disabled={submitting}>
              Cancelar
            </Button>
            <Button onClick={handleSubmitGrade} disabled={submitting}>
              {submitting && <Loader2 className="size-4 animate-spin" />}
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
