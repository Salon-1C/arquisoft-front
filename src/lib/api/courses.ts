import type { ApiResponse } from '@/types/api'
import type { Course } from '@/types/course'
import { MOCK_COURSES } from '@/lib/mocks'

export async function getCourses(): Promise<ApiResponse<Course[]>> {
  return { data: MOCK_COURSES }
}

export async function getCourseById(id: string): Promise<ApiResponse<Course>> {
  const course = MOCK_COURSES.find((c) => c.id === id)
  if (!course) {
    throw new Error(`Course not found: ${id}`)
  }
  return { data: course }
}
