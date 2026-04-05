import type { ApiResponse, Paginated } from '@/types/api'
import type { Class } from '@/types/class'
import type { ClassWithSession } from '@/types/stream'
import { MOCK_CLASSES } from '@/lib/mocks'

export async function getClasses(): Promise<ApiResponse<Paginated<Class>>> {
  return {
    data: {
      items: MOCK_CLASSES,
      total: MOCK_CLASSES.length,
    },
  }
}

export async function getClassById(_id: string): Promise<ApiResponse<ClassWithSession>> {
  throw new Error('Not implemented')
}
