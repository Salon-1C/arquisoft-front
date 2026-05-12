import type { ApiResponse } from '@/types/api'
import type { Course } from '@/types/course'
import { getEnrolledChannels, getEnrolledChannelAsCourse } from '@/lib/api/channels'

export async function getCourses(): Promise<ApiResponse<Course[]>> {
  const data = await getEnrolledChannels()
  return { data }
}

export async function getCourseById(id: string): Promise<ApiResponse<Course>> {
  const course = await getEnrolledChannelAsCourse(id)
  if (!course) {
    throw new Error(`Course not found: ${id}`)
  }
  return { data: course }
}
