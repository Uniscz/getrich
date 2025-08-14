import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('ENV faltando: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'vc-auth'
  }
})

export const db = supabase

export const auth = {
  signInWithEmail: (email) =>
    supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/#/aluno` }
    }),

  signInWithPassword: (email, password) =>
    supabase.auth.signInWithPassword({ email, password }),

  signUpWithPassword: (email, password, metadata = {}) =>
    supabase.auth.signUp({
      email,
      password,
      options: { data: metadata, emailRedirectTo: `${window.location.origin}/#/aluno` }
    }),

  signOut: () => supabase.auth.signOut(),

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  sendRecovery: (email) =>
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/#/nova-senha`
    }),

  updatePassword: (password) =>
    supabase.auth.updateUser({ password }),

  onAuthStateChange: (cb) => supabase.auth.onAuthStateChange(cb)
}

export const database = {
  checkEnrollment: (userId) =>
    supabase.from('enrollments').select('*').eq('user_id', userId).eq('status', 'active').single(),

  upsertEnrollment: (enrollment) =>
    supabase.from('enrollments').upsert(enrollment, { onConflict: 'user_id' }),

  getLessons: () =>
    supabase.from('lessons').select('*').order('order_num', { ascending: true }),

  addLesson: (lesson) =>
    supabase.from('lessons').insert([lesson]),

  updateLesson: (id, updates) =>
    supabase.from('lessons').update(updates).eq('id', id),

  deleteLesson: (id) =>
    supabase.from('lessons').delete().eq('id', id)
}

export default supabase
