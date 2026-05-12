import type { ApiResponse, Paginated } from '@/types/api'
import type { Stream, StreamStatus, StreamType } from '@/types/stream'
import { apiFetch } from './client'

export interface GetStreamsParams {
  status: StreamStatus
  type?: StreamType
  limit?: number
  offset?: number
}

export async function getStreams(params: GetStreamsParams): Promise<ApiResponse<Paginated<Stream>>> {
  const query = new URLSearchParams({
    status: params.status,
    type: params.type ?? 'public',
    limit: String(params.limit ?? 20),
    offset: String(params.offset ?? 0),
  })
  return apiFetch<Paginated<Stream>>(`/api/clases?${query}`)
}
