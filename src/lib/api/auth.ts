import { apiFetch } from './client'
import type { Session, User, UserRole } from '@/types/auth'

interface UserResponse {
  id: string
  email: string
  name: string
  username: string | null
  role: string
  avatarUrl: string | null
  onboardingComplete: boolean
}

function toUser(u: UserResponse): User {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    username: u.username ?? undefined,
    role: u.role as UserRole,
    avatarUrl: u.avatarUrl ?? undefined,
    onboardingComplete: u.onboardingComplete,
  }
}

export async function login(email: string, password: string): Promise<Session> {
  const res = await apiFetch<UserResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  // The JWT is stored in the blume_session cookie by the server.
  // We only need the user profile client-side.
  return { user: toUser(res.data), token: '' }
}

export async function signup(
  email: string,
  password: string,
  fullName?: string
): Promise<Session> {
  const res = await apiFetch<UserResponse>('/api/auth/registro', {
    method: 'POST',
    body: JSON.stringify({ email, password, fullName: fullName ?? '' }),
  })
  return { user: toUser(res.data), token: '' }
}

export async function logout(): Promise<void> {
  await apiFetch<null>('/api/auth/logout', { method: 'POST' })
}

export async function firebaseLogin(idToken: string): Promise<Session> {
  const res = await apiFetch<UserResponse>('/api/auth/firebase/login', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
  })
  return { user: toUser(res.data), token: '' }
}

export async function getMe(): Promise<User | null> {
  try {
    const res = await apiFetch<UserResponse>('/api/auth/me')
    return toUser(res.data)
  } catch {
    return null
  }
}

export async function completeOnboarding(
  username: string,
  roleCode: 'STUDENT' | 'PROFESSOR'
): Promise<Session> {
  const res = await apiFetch<UserResponse>('/api/auth/onboarding', {
    method: 'POST',
    body: JSON.stringify({ username, roleCode }),
  })
  return { user: toUser(res.data), token: '' }
}
