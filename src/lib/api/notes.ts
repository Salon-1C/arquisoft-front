import type { ApiResponse } from '@/types/api'
import type { Note } from '@/types/note'

export async function getNotes(): Promise<ApiResponse<Note[]>> {
  throw new Error('Not implemented')
}

export async function createNote(
  _note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<ApiResponse<Note>> {
  throw new Error('Not implemented')
}

export async function updateNote(
  _id: string,
  _content: string,
): Promise<ApiResponse<Note>> {
  throw new Error('Not implemented')
}

export async function deleteNote(_id: string): Promise<ApiResponse<void>> {
  throw new Error('Not implemented')
}
