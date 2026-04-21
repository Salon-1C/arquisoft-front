// Server-only in-memory stream registry.
//
// IMPORTANT: Next.js App Router runs Server Components and Route Handlers in
// separate module contexts (different require() caches), so a plain module-level
// variable would not be shared between them. By using `globalThis` we guarantee
// a single shared array for the lifetime of the Node.js process regardless of
// which context imports this module.

export interface StreamRecord {
  id: string
  name: string
  description: string
  streamKey: string
  instructorName: string
  createdAt: string
}

type GlobalStore = typeof globalThis & {
  __blume_streams?: StreamRecord[]
}

function getStore(): StreamRecord[] {
  const g = globalThis as GlobalStore
  if (!g.__blume_streams) g.__blume_streams = []
  return g.__blume_streams
}

export function getStreams(): StreamRecord[] {
  return [...getStore()]
}

export function getStreamById(id: string): StreamRecord | undefined {
  return getStore().find((s) => s.id === id)
}

export function addStream(stream: StreamRecord): void {
  getStore().push(stream)
}

export function removeStream(id: string): void {
  const store = getStore()
  const index = store.findIndex((s) => s.id === id)
  if (index !== -1) store.splice(index, 1)
}
