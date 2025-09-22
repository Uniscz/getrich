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
      return (
        <div className="min-h-screen bg-white text-[#0A0A0A] selection:bg-[#0A68FF]/20">
          <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-black/10">
            <div className="mx-auto max-w-7xl h-16 px-4 md:px-6 flex items-center justify-between">
              <a href="#topo" className="font-semibold text-lg tracking-tight">
                <span>Videos</span> <span>Craft</span>{" "}
                <span className="text-[#0A68FF]">IA</span>
              </a>
              
              <div className="hidden md:flex items-center gap-6 text-sm">
                <a href="#exemplos" className="hover:opacity-70">Exemplos</a>
                <a href="#beneficios" className="hover:opacity-70">Benefícios</a>
                <a href="#faq" className="hover:opacity-70">FAQ</a>
                <a href="#autor" className="hover:opacity-70">Autor</a>
              </div>
              
              <a 
                href="https://www.asaas.com/c/sf24e6hym93upjk6"
                className="inline-flex items-center rounded-full border border-[#0A0A0A] px-4 py-2 text-sm font-medium hover:bg-[#0A0A0A] hover:text-white transition"
              >
                <span className="hidden md:inline">Comprar agora</span>
                <span className="md:hidden">Comprar</span>
              </a>
            </div>
          </nav>
          <LandingPremium />
        </div>
      )
  }
}

export default AppSimple
