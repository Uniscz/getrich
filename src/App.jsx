import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './hooks/useAuth.jsx'
import { db } from './lib/supabase.jsx'
import LandingPremium from './LandingPremium.jsx'
import { LoginPage } from './components/LoginPage.jsx'
import { Dashboard } from './components/Dashboard.jsx'
import { CheckoutPage } from './components/CheckoutPage.jsx'
import { WelcomePage } from './components/WelcomePage.jsx'
import { AdminPanel } from './components/AdminPanel.jsx'
import './App.css'

function normalize(hash) {
  if (!hash || hash === '' || hash === '#' || hash === '#/') return '#/'
  return hash
}

function AppContent() {
  const { user, loading, signIn } = useAuth()
  const [route, setRoute] = useState(normalize(window.location.hash))
  const [userEmail, setUserEmail] = useState('')
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    const onHash = () => setRoute(normalize(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Check if user has access to the course
  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        const { data, error } = await db.checkEnrollment(user.id)
        if (data && !error) {
          setHasAccess(true)
        } else {
          setHasAccess(false)
        }
      }
    }

    if (user && !loading) {
      checkAccess()
    }
  }, [user, loading])

  const handleGetAccess = async (email) => {
    setUserEmail(email)
    window.location.hash = '#/checkout'
  }

  const handleSignIn = async (email) => {
    const result = await signIn(email)
    return result
  }

  const handleCheckoutSuccess = async (payment) => {
    // Here you would typically wait for webhook confirmation
    // For now, we'll just redirect to login
    window.location.hash = '#/login'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  // If user is authenticated and has access, show dashboard
  if (user && hasAccess) {
    return <Dashboard />
  }

  // Show appropriate page based on current state
  switch (route) {
    case '#/login':
      return (
        <LoginPage
          onSignIn={handleSignIn}
        />
      )
    case '#/checkout':
      return <WelcomePage />
    case '#/aluno':
      return <Dashboard />
    case '#/admin':
      return <AdminPanel />
    case '#/curso':
      // TODO: Implement CursoPage
      return <div>Página do Curso (Em construção)</div>
    case '#/':
    default:
      return <LandingPremium />
  }
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
