import type { ClassDetail } from '@/types/class'
import { getMockClassById } from '@/lib/mocks/data/classes'

export async function getClassById(id: string): Promise<ClassDetail | undefined> {
  return getMockClassById(id)
}
