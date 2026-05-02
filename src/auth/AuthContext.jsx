// AuthContext — single source of truth for the current Firebase user.
// Wrap App in <AuthProvider> and use useAuth() anywhere you need user state.
import { createContext, useContext, useEffect, useState } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  onIdTokenChanged,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider, appleProvider, isFirebaseConfigured } from '../services/firebase.js'

const AuthContext = createContext({
  user: null,
  loading: true,
  configured: false,
  signIn: async () => {},
  signUp: async () => {},
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }
    // onIdTokenChanged fires on sign-in, sign-out, AND token refresh —
    // useful since api.js relies on currentUser.getIdToken() being fresh.
    const unsub = onIdTokenChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  const requireConfig = () => {
    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured. Set VITE_FIREBASE_* env vars.')
    }
  }

  const value = {
    user,
    loading,
    configured: isFirebaseConfigured,
    signIn: async (email, password) => {
      requireConfig()
      const cred = await signInWithEmailAndPassword(auth, email, password)
      return cred.user
    },
    signUp: async (email, password, displayName) => {
      requireConfig()
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) {
        await updateProfile(cred.user, { displayName })
      }
      return cred.user
    },
    signInWithGoogle: async () => {
      requireConfig()
      const cred = await signInWithPopup(auth, googleProvider)
      return cred.user
    },
    signInWithApple: async () => {
      requireConfig()
      const cred = await signInWithPopup(auth, appleProvider)
      return cred.user
    },
    signOut: async () => {
      if (!isFirebaseConfigured) return
      await fbSignOut(auth)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
