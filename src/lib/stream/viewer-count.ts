/**
 * viewer-count.ts
 *
 * Provides a real-time viewer count for a live class via SSE.
 * The Go + Gin streaming server exposes GET /sse/viewers/:classId
 * which pushes events as: data: {"classId": "uuid", "count": 128}
 *
 * Phase 3 — connect to Go + Gin SSE endpoint:
 * const streamUrl = process.env.NEXT_PUBLIC_STREAM_URL  // e.g. http://localhost:9090
 * const source = new EventSource(`${streamUrl}/sse/viewers/${classId}`)
 * source.onmessage = (e) => {
 *   const { count } = JSON.parse(e.data)
 *   onUpdate(count)
 * }
 * source.onerror = () => source.close()
 * return () => source.close()
 */

/**
 * Subscribes to real-time viewer count updates for a live class.
 *
 * @param classId - The class UUID to subscribe to
 * @param onUpdate - Callback invoked with the latest viewer count
 * @returns A cleanup function that closes the EventSource connection
 */
export function subscribeToViewerCount(
  _classId: string,
  _onUpdate: (count: number) => void,
): () => void {
  // Not implemented — Phase 3 will connect to the Go + Gin SSE endpoint.
  // See the comment at the top of this file for the implementation.
  return () => {}
}
