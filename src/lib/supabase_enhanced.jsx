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

  // Sign in with email and password
  signInWithPassword: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign up with email and password
  signUpWithPassword: async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
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
  },

  // Check if user is admin
  isAdmin: async () => {
    const { user } = await auth.getCurrentUser()
    if (!user) return false

    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    return data?.role === 'admin'
  },

  // Get user profile
  getUserProfile: async () => {
    const { user } = await auth.getCurrentUser()
    if (!user) return { data: null, error: 'No user found' }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return { data, error }
  }
}

// Helper functions para operações de banco
export const database = {
  // Check if user has active enrollment
  checkEnrollment: async (userId, courseId = null) => {
    let query = supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')

    if (courseId) {
      query = query.eq('course_id', courseId)
    }

    const { data, error } = await query.single()
    return { data, error }
  },

  // Create or update enrollment
  upsertEnrollment: async (enrollment) => {
    const { data, error } = await supabase
      .from('enrollments')
      .upsert(enrollment, { onConflict: 'user_id,course_id' })
    
    return { data, error }
  },

  // Get all courses
  getCourses: async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Get all lessons for a course
  getLessons: async (courseId = null) => {
    let query = supabase
      .from('lessons')
      .select('*')
      .order('order_num', { ascending: true })

    if (courseId) {
      query = query.eq('course_id', courseId)
    }

    const { data, error } = await query
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

// Funções para administração
export const admin = {
  // Criar matrícula manual
  createEnrollment: async (userId, courseId, paymentMethod = 'manual') => {
    const { data, error } = await supabase
      .from('enrollments')
      .insert([{
        user_id: userId,
        course_id: courseId,
        payment_method: paymentMethod,
        status: 'active'
      }])
    return { data, error }
  },

  // Listar todos os usuários
  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Listar todas as matrículas
  getAllEnrollments: async () => {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        profiles (
          email,
          full_name
        ),
        courses (
          title
        )
      `)
      .order('enrolled_at', { ascending: false })
    return { data, error }
  },

  // Gerar token de convite
  generateInvitation: async (email, courseId) => {
    const { data, error } = await supabase
      .rpc('generate_invitation_token', {
        p_email: email,
        p_course_id: courseId
      })
    return { data, error }
  },

  // Atualizar role do usuário
  updateUserRole: async (userId, role) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
    return { data, error }
  },

  // Criar usuário manualmente (admin)
  createUser: async (email, password, fullName, role = 'student') => {
    // Primeiro, criar o usuário no auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        full_name: fullName
      },
      email_confirm: true
    })

    if (authError) return { data: null, error: authError }

    // Depois, atualizar o perfil com o role correto
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .update({ role, full_name: fullName })
      .eq('id', authData.user.id)

    return { data: { auth: authData, profile: profileData }, error: profileError }
  },

  // Deletar usuário
  deleteUser: async (userId) => {
    const { data, error } = await supabase.auth.admin.deleteUser(userId)
    return { data, error }
  },

  // Criar curso
  createCourse: async (course) => {
    const { data, error } = await supabase
      .from('courses')
      .insert([course])
    return { data, error }
  },

  // Atualizar curso
  updateCourse: async (id, updates) => {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
    return { data, error }
  },

  // Deletar curso
  deleteCourse: async (id) => {
    const { data, error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id)
    return { data, error }
  }
}

// Funções para convites
export const invitations = {
  // Validar token de convite
  validateToken: async (token) => {
    const { data, error } = await supabase
      .rpc('use_invitation_token', { p_token: token })
    return { data, error }
  },

  // Listar convites (admin)
  getInvitations: async () => {
    const { data, error } = await supabase
      .from('invitation_tokens')
      .select(`
        *,
        courses (
          title
        ),
        profiles (
          email,
          full_name
        )
      `)
      .order('created_at', { ascending: false })
    return { data, error }
  }
}

// Funções para progresso do aluno
export const progress = {
  // Marcar aula como concluída
  markLessonComplete: async (lessonId) => {
    const { user } = await auth.getCurrentUser()
    if (!user) return { data: null, error: 'User not authenticated' }

    const { data, error } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: user.id,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString()
      }, { onConflict: 'user_id,lesson_id' })
    return { data, error }
  },

  // Atualizar tempo assistido
  updateWatchTime: async (lessonId, watchTimeSeconds) => {
    const { user } = await auth.getCurrentUser()
    if (!user) return { data: null, error: 'User not authenticated' }

    const { data, error } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: user.id,
        lesson_id: lessonId,
        watch_time_seconds: watchTimeSeconds
      }, { onConflict: 'user_id,lesson_id' })
    return { data, error }
  },

  // Obter progresso do usuário
  getUserProgress: async (courseId = null) => {
    const { user } = await auth.getCurrentUser()
    if (!user) return { data: null, error: 'User not authenticated' }

    let query = supabase
      .from('lesson_progress')
      .select(`
        *,
        lessons (
          id,
          title,
          course_id,
          order_num,
          module
        )
      `)
      .eq('user_id', user.id)

    if (courseId) {
      query = query.eq('lessons.course_id', courseId)
    }

    const { data, error } = await query
    return { data, error }
  },

  // Obter estatísticas de progresso
  getProgressStats: async (courseId = null) => {
    const { user } = await auth.getCurrentUser()
    if (!user) return { data: null, error: 'User not authenticated' }

    // Buscar total de aulas
    let lessonsQuery = supabase
      .from('lessons')
      .select('id')

    if (courseId) {
      lessonsQuery = lessonsQuery.eq('course_id', courseId)
    }

    const { data: lessons, error: lessonsError } = await lessonsQuery

    if (lessonsError) return { data: null, error: lessonsError }

    // Buscar aulas concluídas
    let progressQuery = supabase
      .from('lesson_progress')
      .select('id')
      .eq('user_id', user.id)
      .eq('completed', true)

    if (courseId) {
      progressQuery = progressQuery.in('lesson_id', lessons.map(l => l.id))
    }

    const { data: completed, error: progressError } = await progressQuery

    if (progressError) return { data: null, error: progressError }

    const totalLessons = lessons?.length || 0
    const completedLessons = completed?.length || 0
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    return {
      data: {
        totalLessons,
        completedLessons,
        progressPercentage
      },
      error: null
    }
  }
}

// Export default do cliente principal
export default supabase

