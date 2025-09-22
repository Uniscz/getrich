import { useState, useEffect } from 'react'
import LandingPremium from './LandingPremium.jsx'
import { ObrigadoPage } from './components/ObrigadoPage.jsx'
import './App.css'

function normalize(hash) {
  if (!hash || hash === '' || hash === '#' || hash === '#/') return '#/'
  return hash
}

function AppSimple() {
  const [route, setRoute] = useState(normalize(window.location.hash))

  useEffect(() => {
    const onHash = () => setRoute(normalize(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Roteamento baseado no hash
  switch (route) {
    case '#/obrigado':
      return <ObrigadoPage />
    
    case '#/':
    default:
      // Mostrar landing page simples para venda
      return <LandingPremium />
  }
}

export default AppSimple
