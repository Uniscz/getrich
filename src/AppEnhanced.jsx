import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './hooks/useAuthEnhanced.jsx'
import { database } from './lib/supabase_enhanced.jsx'
import LandingPremium from './LandingPremium.jsx'
import { LoginPageEnhanced } from './components/LoginPageEnhanced.jsx'
import { RegisterPage } from './components/RegisterPage.jsx'
import { Dashboard } from './components/Dashboard.jsx'
import { CheckoutPage } from './components/CheckoutPage.jsx'
import { WelcomePage } from './components/WelcomePage.jsx'
import { AdminPanelEnhanced } from './components/AdminPanelEnhanced.jsx'
import { StudentPortal } from './components/StudentPortal.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { NavbarEnhanced } from './components/NavbarEnhanced.jsx'
import './App.css'

function normalize(hash) {
  if (!hash || hash === '' || hash === '#' || hash === '#/') return '#/'
  return hash
}

function AppContent() {
  const { user, profile, loading } = useAuth()
  const [route, setRoute] = useState(normalize(window.location.hash))
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    const onHash = () => setRoute(normalize(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Check if user has access to the course
  useEffect(() => {
    const checkAccess = async () => {
      if (user && profile) {
        // Admins sempre têm acesso
        if (profile.role === 'admin') {
          setHasAccess(true)
          return
        }

        // Verificar matrícula para estudantes
        const { data, error } = await database.checkEnrollment(user.id)
        if (data && !error) {
          setHasAccess(true)
        } else {
          setHasAccess(false)
        }
      }
    }

    if (user && profile && !loading) {
      checkAccess()
    }
  }, [user, profile, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  // Roteamento baseado no hash
  switch (route) {
    case '#/login':
      return <LoginPageEnhanced />
    
    case '#/registro':
    case '#/register':
      return <RegisterPage />
    
    case '#/checkout':
      return <WelcomePage />
    
    case '#/aluno':
    case '#/student':
      return (
        <ProtectedRoute>
          {hasAccess ? <StudentPortal /> : <Dashboard />}
        </ProtectedRoute>
      )
    
    case '#/admin':
      return (
        <ProtectedRoute requiredRole="admin">
          <AdminPanelEnhanced />
        </ProtectedRoute>
      )
    
    case '#/curso':
      return (
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Página do Curso</h1>
              <p className="text-gray-600">Em construção...</p>
            </div>
          </div>
        </ProtectedRoute>
      )
    
    case '#/':
    default:
      // Se o usuário está logado e tem acesso, redirecionar para área apropriada
      if (user && profile && hasAccess) {
        if (profile.role === 'admin') {
          window.location.hash = '#/admin'
          return null
        } else {
          window.location.hash = '#/aluno'
          return null
        }
      }
      
      // Mostrar landing page com navbar aprimorada
      return (
        <div className="min-h-screen bg-white text-[#0A0A0A] selection:bg-[#0A68FF]/20">
          <NavbarEnhanced cta="#/checkout" />
          <div className="pt-16">
            <LandingPremium />
          </div>
        </div>
      )
  }
}

function AppEnhanced() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default AppEnhanced

