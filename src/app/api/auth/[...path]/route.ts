import { type NextRequest, NextResponse } from 'next/server'

const SPRING_BOOT = process.env.API_INTERNAL_URL ?? 'http://localhost:8080'

async function proxy(request: NextRequest, path: string[]): Promise<NextResponse> {
  const url = `${SPRING_BOOT}/api/auth/${path.join('/')}${request.nextUrl.search}`

  try {
    const res = await fetch(url, {
      method: request.method,
      headers: {
        'content-type': 'application/json',
        cookie: request.headers.get('cookie') ?? '',
      },
      body: request.method !== 'GET' && request.method !== 'HEAD'
        ? await request.text()
        : undefined,
    })

    const body = await res.text()
    return new NextResponse(body, {
      status: res.status,
      headers: {
        'content-type': res.headers.get('content-type') ?? 'application/json',
        ...(res.headers.get('set-cookie')
          ? { 'set-cookie': res.headers.get('set-cookie')! }
          : {}),
      },
    })
  } catch {
    return NextResponse.json(
      { message: 'Auth service unavailable' },
      { status: 503 }
    )
  }
}

type RouteContext = { params: Promise<{ path: string[] }> }

export async function GET(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params
  return proxy(req, path)
}

export async function POST(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params
  return proxy(req, path)
}

export async function PUT(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params
  return proxy(req, path)
}

export async function DELETE(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params
  return proxy(req, path)
}
