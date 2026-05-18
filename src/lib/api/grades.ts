import { apiFetch } from './client'
import type { ClassGrade, EnrolledStudent } from '@/types/class'

interface EnrolledStudentApiItem {
  studentId: string
  fullName: string
  email: string
}

interface EnrolledStudentsApiResponse {
  channelId: string
  students: EnrolledStudentApiItem[]
}

interface GradeApiItem {
  id: number
  name: string
  type: string
  weight: number
  score: number | null
}

interface ChannelGradesApiResponse {
  channelId: string
  grades: GradeApiItem[]
}

export async function getChannelStudents(channelId: string): Promise<EnrolledStudent[]> {
  const res = await apiFetch<EnrolledStudentsApiResponse>(`/api/canales/${channelId}/estudiantes`)
  return res.data.students.map((s) => ({
    studentId: s.studentId,
    fullName: s.fullName,
    email: s.email,
  }))
}

export async function getStudentGrades(channelId: string, studentId: string): Promise<ClassGrade[]> {
  const res = await apiFetch<ChannelGradesApiResponse>(
    `/api/canales/${channelId}/notas?studentId=${studentId}`
  )
  return res.data.grades.map((g) => ({
    id: g.id,
    name: g.name,
    type: g.type as ClassGrade['type'],
    weight: g.weight,
    score: g.score,
  }))
}

export async function submitGrade(
  channelId: string,
  gradeDefinitionId: number,
  studentId: string,
  score: number | null
): Promise<void> {
  await apiFetch(`/api/canales/${channelId}/notas/${gradeDefinitionId}`, {
    method: 'PUT',
    body: JSON.stringify({ studentId, score }),
  })
}
