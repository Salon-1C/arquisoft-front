import type { RecordingsResponse } from '@/types/recording'

const RECORDINGS_BASE =
  process.env.NEXT_PUBLIC_RECORDINGS_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost'

export async function getRecordings(limit = 50, offset = 0): Promise<RecordingsResponse> {
  const url = `${RECORDINGS_BASE}/api/recordings?limit=${limit}&offset=${offset}`
  const res = await fetch(url, {
    next: { revalidate: 0 },
  })
  if (!res.ok) {
    throw new Error(`Could not load recordings (HTTP ${res.status})`)
  }
  return (await res.json()) as RecordingsResponse
}
