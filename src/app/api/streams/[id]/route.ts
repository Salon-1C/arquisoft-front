import { NextResponse } from 'next/server'
import { removeStream } from '@/lib/streams/store'

export function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  params.then(({ id }) => removeStream(id))
  return NextResponse.json({ ok: true })
}
