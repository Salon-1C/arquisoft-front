import { cookies } from 'next/headers'
import type { Course, CourseStream } from '@/types/course'
import type { Class, ClassDetail, ClassRecording } from '@/types/class'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

interface ChannelStreamResponse {
  id: string
  title: string
  description: string
  status: string
  startedAt: string | null
  endedAt: string | null
}

interface ChannelResponse {
  id: string
  name: string
  description: string
  instructorName: string
  streams: ChannelStreamResponse[]
}

async function serverFetch<T>(path: string): Promise<T> {
  const cookieStore = await cookies()
  const session = cookieStore.get('blume_session')?.value

  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(session ? { Cookie: `blume_session=${session}` } : {}),
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    let message = `HTTP ${res.status}`
    try {
      const body = (await res.json()) as { message?: string }
      if (body.message) message = body.message
    } catch {
      /* ignore parse errors */
    }
    throw new Error(message)
  }

  return res.json() as Promise<T>
}

function toCourseStream(s: ChannelStreamResponse): CourseStream | null {
  if (s.status !== 'live' && s.status !== 'recorded') return null
  return {
    id: s.id,
    title: s.title,
    description: s.description,
    startedAt: s.startedAt ?? new Date().toISOString(),
    endedAt: s.endedAt ?? undefined,
    status: s.status as 'live' | 'recorded',
  }
}

function toChannel(ch: ChannelResponse): Course {
  return {
    id: ch.id,
    name: ch.name,
    description: ch.description,
    instructorName: ch.instructorName,
    streams: ch.streams.flatMap((s) => {
      const cs = toCourseStream(s)
      return cs ? [cs] : []
    }),
  }
}

export async function getEnrolledChannels(): Promise<Course[]> {
  const channels = await serverFetch<ChannelResponse[]>('/api/cursos')
  return channels.map(toChannel)
}

export async function getEnrolledChannelAsCourse(id: string): Promise<Course | undefined> {
  try {
    const ch = await serverFetch<ChannelResponse>(`/api/cursos/${id}`)
    return toChannel(ch)
  } catch {
    return undefined
  }
}

export async function getEnrolledChannelAsClassDetail(id: string): Promise<ClassDetail | undefined> {
  try {
    const ch = await serverFetch<ChannelResponse>(`/api/cursos/${id}`)

    const liveStream = ch.streams.find((s) => s.status === 'live')
    const recordedStreams = ch.streams.filter((s) => s.status === 'recorded')

    const cls: Class = {
      id: ch.id,
      name: ch.name,
      description: ch.description,
      instructorName: ch.instructorName,
      isLive: !!liveStream,
      liveStreamId: liveStream?.id,
    }

    const recordings: ClassRecording[] = recordedStreams.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      startedAt: s.startedAt ?? '',
      endedAt: s.endedAt ?? '',
    }))

    return { cls, recordings, materials: [] }
  } catch {
    return undefined
  }
}
