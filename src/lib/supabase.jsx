import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Cliente Supabase principal
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export direto do cliente para uso como db
export const db = supabase

// Helper functions para autenticação
export const auth = {
  // Sign in with email (magic link)
  signInWithEmail: async (email) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/#/aluno`
      }
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Helper functions para operações de banco
export const database = {
  // Check if user has active enrollment
  checkEnrollment: async (userId) => {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()
    
    return { data, error }
  },

  // Create or update enrollment
  upsertEnrollment: async (enrollment) => {
    const { data, error } = await supabase
      .from('enrollments')
      .upsert(enrollment, { onConflict: 'user_id' })
    
    return { data, error }
  },

  // Get all lessons
  getLessons: async () => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('order_num', { ascending: true })
    
    return { data, error }
  },

  // Add new lesson
  addLesson: async (lesson) => {
    const { data, error } = await supabase
      .from('lessons')
      .insert([lesson])
    
    return { data, error }
  },

  // Update lesson
  updateLesson: async (id, updates) => {
    const { data, error } = await supabase
      .from('lessons')
      .update(updates)
      .eq('id', id)
    
    return { data, error }
  },

  // Delete lesson
  deleteLesson: async (id) => {
    const { data, error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', id)
    
    return { data, error }
  }
}

// Export default do cliente principal
export default supabase

