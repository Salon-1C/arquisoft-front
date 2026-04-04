'use client'

import { useState, useEffect } from 'react'
import { createViewerCountSSE } from '@/lib/stream/viewer-count'

export function useViewerCount(classId: string, initialCount: number): number {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    const cleanup = createViewerCountSSE(classId, setCount)
    return cleanup
  }, [classId])

  return count
}
