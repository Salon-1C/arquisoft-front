import type { Session, User } from '@/types/auth'
import type { ApiResponse } from '@/types/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

function toSession(user: User): Session {
  return { user, token: '' }
}

export async function login(email: string, password: string): Promise<Session> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  const { data } = await handleResponse<ApiResponse<User>>(res)
  return toSession(data)
}

export async function signup(email: string, password: string): Promise<Session> {
  const res = await fetch(`${API_URL}/api/auth/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  const { data } = await handleResponse<ApiResponse<User>>(res)
  return toSession(data)
}

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
}

export async function firebaseLogin(idToken: string): Promise<Session> {
  const res = await fetch(`${API_URL}/api/auth/firebase/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ idToken }),
  })
  const { data } = await handleResponse<ApiResponse<User>>(res)
  return toSession(data)
}

export async function getMe(): Promise<User | null> {
  const res = await fetch(`${API_URL}/api/auth/me`, {
    credentials: 'include',
  })
  if (res.status === 401) return null
  const { data } = await handleResponse<ApiResponse<User>>(res)
  return data
}
