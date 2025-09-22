import { useState, useEffect } from 'react'
import LandingPremium from './LandingPremium.jsx'
import { ObrigadoPageSimple } from './components/ObrigadoPageSimple.jsx'
import { AsaasReturnDetector } from './components/AsaasReturnDetector.jsx'
import './App.css'

function normalize(hash) {
  if (!hash || hash === '' || hash === '#' || hash === '#/') return '#/'
  return hash
}

function AppSimple() {
  const [route, setRoute] = useState(normalize(window.location.hash))
  const [detectedPaymentId, setDetectedPaymentId] = useState(null)

  useEffect(() => {
    const onHash = () => setRoute(normalize(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Função chamada quando um pagamento é detectado
  const handlePaymentDetected = (paymentId) => {
    console.log('Pagamento detectado:', paymentId);
    setDetectedPaymentId(paymentId);
    // Redirecionar para página de obrigado
    window.location.hash = `#/obrigado?pid=${paymentId}`;
  }

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
      return (
        <>
          <LandingPremium />
          <AsaasReturnDetector onPaymentDetected={handlePaymentDetected} />
        </>
      )
  }
}

export default AppSimple
