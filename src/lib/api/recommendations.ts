import type { Stream } from '@/types/stream'

const RECOMMENDATIONS_BASE =
  process.env.NEXT_PUBLIC_RECOMMENDATIONS_URL ?? 'http://localhost:8001'

export interface RecommendedStream extends Stream {
  score: number
}

export interface RecommendationsResponse {
  items: RecommendedStream[]
  total: number
  algorithm: string
}

export class RecommendationsError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message)
    this.name = 'RecommendationsError'
  }
}

async function recommendationsFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${RECOMMENDATIONS_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 120 },
  })

  if (!res.ok) {
    let message = `HTTP ${res.status}`
    try {
      const body = (await res.json()) as { detail?: string }
      if (body.detail) message = body.detail
    } catch {
      // ignore parse errors
    }
    throw new RecommendationsError(res.status, message)
  }

  return res.json() as Promise<T>
}

export interface GetRecommendationsParams {
  userId?: string
  limit?: number
}

export async function getRecommendations(
  params: GetRecommendationsParams = {}
): Promise<RecommendationsResponse> {
  const query = new URLSearchParams()
  if (params.userId) query.set('user_id', params.userId)
  if (params.limit) query.set('limit', String(params.limit))

  return recommendationsFetch<RecommendationsResponse>(
    `/api/v1/recommendations?${query}`
  )
}

export async function getTrending(limit = 20): Promise<RecommendationsResponse> {
  return recommendationsFetch<RecommendationsResponse>(
    `/api/v1/recommendations/trending?limit=${limit}`
  )
}
