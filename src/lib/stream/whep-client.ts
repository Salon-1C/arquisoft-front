export interface WhepOptions {
  streamUrl: string
  path: string
  videoEl: HTMLVideoElement
  token?: string
}

export interface WhepSession {
  stop: () => Promise<void>
}

export async function startWhep({ streamUrl, path, videoEl, token }: WhepOptions): Promise<WhepSession> {
  // Register as a viewer before negotiating so the counter is accurate.
  await fetch(`${streamUrl}/api/viewers/connect`, { method: 'POST' })

  let sessionURL: string | null = null

  const tokenParam = token ? `&token=${encodeURIComponent(token)}` : ''
  const sessionRes = await fetch(
    `${streamUrl}/api/viewer-session?path=${encodeURIComponent(path)}${tokenParam}`
  )
  if (!sessionRes.ok) {
    await fetch(`${streamUrl}/api/viewers/disconnect`, { method: 'POST' })
    throw new Error(`viewer-session rejected (${sessionRes.status})`)
  }
  const { whep_url } = (await sessionRes.json()) as { whep_url: string }

  const pc = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  })

  pc.ontrack = (event) => {
    videoEl.srcObject = event.streams[0]
  }

  pc.addTransceiver('video', { direction: 'recvonly' })
  pc.addTransceiver('audio', { direction: 'recvonly' })

  const offer = await pc.createOffer()
  await pc.setLocalDescription(offer)

  const whepRes = await fetch(whep_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/sdp' },
    body: offer.sdp,
  })
  if (!whepRes.ok) {
    pc.close()
    await fetch(`${streamUrl}/api/viewers/disconnect`, { method: 'POST' })
    throw new Error(`WHEP negotiation failed (${whepRes.status})`)
  }

  const answerSDP = await whepRes.text()
  sessionURL = whepRes.headers.get('Location')

  await pc.setRemoteDescription({ type: 'answer', sdp: answerSDP })

  const stop = async () => {
    pc.close()
    if (sessionURL) {
      try {
        await fetch(sessionURL, { method: 'DELETE' })
      } catch {
        // best-effort teardown
      }
      sessionURL = null
    }
    await fetch(`${streamUrl}/api/viewers/disconnect`, { method: 'POST' })
  }

  return { stop }
}
