import { useState, useEffect, createContext, useContext } from 'react'
import { auth } from '../lib/supabase.jsx'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    auth.getCurrentUser().then(({ user }) => {
      setUser(user)
      if (user) {
        loadUserProfile(user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      
      if (currentUser) {
        await loadUserProfile(currentUser.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (userId) => {
    try {
      const { data, error } = await auth.getUserProfile()
      if (!error && data) {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email) => {
    setLoading(true)
    const result = await auth.signInWithEmail(email)
    setLoading(false)
    return result
  }

  const signInWithPassword = async (email, password) => {
    setLoading(true)
    const result = await auth.signInWithPassword(email, password)
    setLoading(false)
    return result
  }

  const signUpWithPassword = async (email, password, metadata = {}) => {
    setLoading(true)
    const result = await auth.signUpWithPassword(email, password, metadata)
    setLoading(false)
    return result
  }

  const signOut = async () => {
    setLoading(true)
    const result = await auth.signOut()
    setUser(null)
    setProfile(null)
    setLoading(false)
    return result
  }

  const isAdmin = () => {
    return profile?.role === 'admin'
  }

  const isStudent = () => {
    return profile?.role === 'student'
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signInWithPassword,
    signUpWithPassword,
    signOut,
    isAdmin,
    isStudent,
    refreshProfile: () => user && loadUserProfile(user.id)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

