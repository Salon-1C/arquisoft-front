import { cookies } from 'next/headers'
import type { Course, CourseStream } from '@/types/course'
import type { Class, ClassDetail, ClassMaterial, ClassRecording } from '@/types/class'

const API_BASE = process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL

interface ChannelStreamResponse {
  id: string
  title: string
  description: string
  status: string
  startedAt: string | null
  endedAt: string | null
}

interface ChannelMaterialResponse {
  id: string
  title: string
  description?: string
  fileUrl: string
  fileType: string
  createdAt: string
}

interface ChannelResponse {
  id: string
  name: string
  description: string
  instructorName: string
  currentStream: ChannelStreamResponse | null
  pastStreams: ChannelStreamResponse[]
  materials: ChannelMaterialResponse[]
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

  const wrapper = (await res.json()) as { data: T }
  return wrapper.data
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
  const streams: CourseStream[] = []
  if (ch.currentStream) {
    const cs = toCourseStream(ch.currentStream)
    if (cs) streams.push(cs)
  }
  for (const s of ch.pastStreams) {
    const cs = toCourseStream(s)
    if (cs) streams.push(cs)
  }
  return {
    id: ch.id,
    name: ch.name,
    description: ch.description,
    instructorName: ch.instructorName,
    streams,
  }
}

export async function getEnrolledChannels(): Promise<Course[]> {
  const channels = await serverFetch<ChannelResponse[]>('/api/cursos')
  return channels.map(toChannel)
}

export async function getPublicChannels(): Promise<Course[]> {
  const channels = await serverFetch<ChannelResponse[]>('/api/cursos/explorar')
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

export async function getPublicChannelById(id: string): Promise<Course | undefined> {
  try {
    const ch = await serverFetch<ChannelResponse>(`/api/cursos/explorar/${id}`)
    return toChannel(ch)
  } catch {
    return undefined
  }
}

export async function getPublicChannelAsClassDetail(id: string): Promise<ClassDetail | undefined> {
  try {
    const ch = await serverFetch<ChannelResponse>(`/api/cursos/explorar/${id}`)
    return channelToClassDetail(ch)
  } catch {
    return undefined
  }
}

function channelToClassDetail(ch: ChannelResponse): ClassDetail {
  const allStreams = [
    ...(ch.currentStream ? [ch.currentStream] : []),
    ...ch.pastStreams,
  ]
  const liveStream = allStreams.find((s) => s.status === 'live')
  const recordedStreams = allStreams.filter((s) => s.status === 'recorded')

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

  const materials: ClassMaterial[] = ch.materials.map((m) => ({
    id: m.id,
    title: m.title,
    description: m.description,
    fileUrl: m.fileUrl,
    fileType: m.fileType,
    createdAt: m.createdAt,
  }))

  return { cls, recordings, materials }
}

export async function getEnrolledChannelAsClassDetail(id: string): Promise<ClassDetail | undefined> {
  try {
    const ch = await serverFetch<ChannelResponse>(`/api/cursos/${id}`)
    return channelToClassDetail(ch)
  } catch {
    return undefined
  }
}
