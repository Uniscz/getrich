import { useState, useEffect } from 'react'
import LandingPremium from './LandingPremium.jsx'
import { ObrigadoPageSimple } from './components/ObrigadoPageSimple.jsx'
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
  console.log('Current route:', route); // Debug
  
  // Verificar se é rota obrigado (com ou sem parâmetros)
  if (route.startsWith('#/obrigado')) {
    return <ObrigadoPageSimple />
  }
  
  switch (route) {
    case '#/':
    default:
      // Mostrar landing page simples para venda
      return <LandingPremium />
  }
}

export default AppSimple
