import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('ENV faltando: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'vc-auth' // evita conflito com outras instâncias
  }
})

// reexport opcional
export const db = supabase

export const auth = {
  signInWithEmail: async (email) =>
    supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/#/aluno` }
    }),

  signInWithPassword: (email, password) =>
    supabase.auth.signInWithPassword({ email, password }),

  signOut: () => supabase.auth.signOut(),

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  getUserProfile: () =>
    supabase.from('profiles').select('*').single(),

  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  onAuthStateChange: (cb) => supabase.auth.onAuthStateChange(cb)
}

export const database = {
  checkEnrollment: (userId) =>
    supabase.from('enrollments').select('*')
      .eq('user_id', userId).eq('status', 'active').single(),

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
