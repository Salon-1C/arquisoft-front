import type { Session } from '@/types/auth'

export async function login(_email: string, _password: string): Promise<Session> {
  throw new Error('Not implemented')
}

export async function signup(_email: string, _password: string): Promise<Session> {
  throw new Error('Not implemented')
}

export async function logout(): Promise<void> {
  throw new Error('Not implemented')
}
