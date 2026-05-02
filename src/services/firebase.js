// Firebase initialization — single shared app instance.
// All VITE_FIREBASE_* values are public keys; safe to ship in the bundle.
// Project secrets (service-account keys) live only on the backend.
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

// Only initialize Firebase when credentials are actually provided.
// getAuth() throws a hard "auth/invalid-api-key" error if the API key is
// empty/undefined, which kills the entire import chain and produces a blank page.
let firebaseApp = null
let auth = null
let googleProvider = null
let appleProvider = null

if (isFirebaseConfigured) {
  try {
    firebaseApp = initializeApp(firebaseConfig)
    auth = getAuth(firebaseApp)
    googleProvider = new GoogleAuthProvider()
    appleProvider = new OAuthProvider('apple.com')
  } catch (err) {
    console.warn('[NOOD] Firebase init failed — auth will be disabled:', err.message)
  }
} else {
  console.info('[NOOD] Firebase not configured (VITE_FIREBASE_* env vars missing). Auth disabled.')
}

export { firebaseApp, auth, googleProvider, appleProvider }
