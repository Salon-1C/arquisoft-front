import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

function getFirebaseAuth() {
  const app = getApps().length === 0
    ? initializeApp({
        apiKey:     process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId:  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      })
    : getApp()
  return getAuth(app)
}

export async function signInWithGoogle(): Promise<string> {
  const auth = getFirebaseAuth()
  const result = await signInWithPopup(auth, new GoogleAuthProvider())
  return result.user.getIdToken()
}
