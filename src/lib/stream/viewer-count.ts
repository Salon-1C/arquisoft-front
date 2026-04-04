import { MOCK_VIEWER_COUNTS } from '@/lib/mocks'

export function createViewerCountSSE(
  classId: string,
  onUpdate: (count: number) => void
): () => void {
  const initial = MOCK_VIEWER_COUNTS[classId] ?? 0
  onUpdate(initial)

  const interval = setInterval(() => {
    const current = MOCK_VIEWER_COUNTS[classId] ?? 0
    const delta = Math.random() > 0.5 ? 1 : -1
    const next = Math.max(0, current + delta)
    MOCK_VIEWER_COUNTS[classId] = next
    onUpdate(next)
  }, 8000)

  return () => clearInterval(interval)

  // Phase 3 — connect to Go + Gin SSE endpoint (port 9090):
  // const streamUrl = process.env.NEXT_PUBLIC_STREAM_URL  // e.g. http://localhost:9090
  // const source = new EventSource(`${streamUrl}/sse/viewers/${classId}`)
  // source.onmessage = (e) => {
  //   const { count } = JSON.parse(e.data)
  //   onUpdate(count)
  // }
  // source.onerror = () => source.close()
  // return () => source.close()
}
