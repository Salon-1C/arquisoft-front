import { NextResponse } from 'next/server'
import { getStreams, addStream, type StreamRecord } from '@/lib/streams/store'

export function GET() {
  return NextResponse.json({ streams: getStreams() })
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    name: string
    description: string
    instructorName?: string
  }

  if (!body.name?.trim() || !body.description?.trim()) {
    return NextResponse.json(
      { error: 'name y description son requeridos' },
      { status: 400 }
    )
  }

  const stream: StreamRecord = {
    id: crypto.randomUUID(),
    name: body.name.trim(),
    description: body.description.trim(),
    streamKey: crypto.randomUUID().replace(/-/g, '').slice(0, 14),
    instructorName: body.instructorName?.trim() || 'Profesor',
    createdAt: new Date().toISOString(),
  }

  addStream(stream)
  return NextResponse.json({ stream }, { status: 201 })
}
