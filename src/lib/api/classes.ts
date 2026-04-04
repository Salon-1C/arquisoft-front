import type { ApiResponse } from '@/types/api'
import type { Class } from '@/types/class'
import type { ClassWithSession } from '@/types/stream'

export async function getClasses(): Promise<ApiResponse<Class[]>> {
  throw new Error('Not implemented')
}

export async function getClassById(_id: string): Promise<ApiResponse<ClassWithSession>> {
  throw new Error('Not implemented')
}
