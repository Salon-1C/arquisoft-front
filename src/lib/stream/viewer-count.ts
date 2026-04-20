// Polls /api/stats on the stream-engine every 5 s to get the current viewer
// count. The classId parameter is accepted for API compatibility with the hook
// but is not used — stream-engine tracks a single global viewer count.
export function createViewerCountSSE(
  _classId: string,
  onUpdate: (count: number) => void
): () => void {
  const streamUrl = process.env.NEXT_PUBLIC_STREAM_URL

  if (!streamUrl) {
    onUpdate(0)
    return () => {}
  }

  let active = true

  const poll = async () => {
    try {
      const res = await fetch(`${streamUrl}/api/stats`)
      if (!res.ok) return
      const data = (await res.json()) as { viewers: number }
      if (active) onUpdate(data.viewers)
    } catch {
      // network failure — silently skip this tick
    }
  }

  void poll()
  const interval = setInterval(() => void poll(), 5000)

  return () => {
    active = false
    clearInterval(interval)
  }
}
