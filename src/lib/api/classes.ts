import type { ClassDetail } from '@/types/class'
import { getEnrolledChannelAsClassDetail } from '@/lib/api/channels'

export async function getClassById(id: string): Promise<ClassDetail | undefined> {
  return getEnrolledChannelAsClassDetail(id)
}
