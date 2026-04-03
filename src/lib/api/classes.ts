import type { ApiResponse } from '@/types/api'
import type { Class } from '@/types/class'

export async function getClasses(): Promise<ApiResponse<Class[]>> {
  throw new Error('Not implemented')
}

export async function getClassById(_id: string): Promise<ApiResponse<Class>> {
  throw new Error('Not implemented')
}
