import React, { useRef, useEffect, useState } from 'react';
import FullscreenVideoBackground from './FullscreenVideoBackground.jsx';

const NewHomePage = () => {
  return (
    <FullscreenVideoBackground>
      <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
        {/* Navbar */}
        <Navbar />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Proof Section */}
        <ProofSection />
        
        {/* Final CTA */}
        <FinalCTASection />
      </div>
    </FullscreenVideoBackground>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="font-bold text-xl text-white">
          VideosCraftIA
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/90">
          <a href="#projetos" className="hover:text-white transition-colors">Projetos</a>
          <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
          <a href="#contato" className="hover:text-white transition-colors">Contato</a>
        </div>
        <a 
          href="#contato" 
          className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm"
        >
          Vamos Conversar
        </a>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-8 pt-24 pb-16">
      <div className="max-w-5xl mx-auto text-center">
        {/* Título Principal */}
        <h1 
          className="text-6xl md:text-8xl leading-tight mb-12 text-shadow-lg"
          style={{ 
            fontFamily: 'Montserrat, sans-serif', 
            fontWeight: 600,
            color: '#F5F5F5',
            marginBottom: '3rem'
          }}
        >
          Eu não faço vídeos.
          <br />
          <span style={{ color: '#FFD700' }}>Eu crio eventos culturais</span>
          <br />
          na internet.
        </h1>
        
        {/* Subtítulo */}
        <p 
          className="text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed"
          style={{ 
            fontFamily: 'Lato, sans-serif',
            color: '#F5F5F5',
            fontSize: '18px',
            lineHeight: '1.7',
            marginBottom: '4rem'
          }}
        >
          Sua marca não precisa de mais um post. 
          <br />
          Ela precisa de um <strong>momento inesquecível</strong>.
        </p>
        
        {/* CTA Principal */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href="#projetos" 
            className="px-10 py-5 rounded-lg text-lg font-bold transition-all duration-300 hover:brightness-110 shadow-2xl uppercase"
            style={{
              backgroundColor: '#FFD700',
              color: '#121212',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 700
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            VER MEUS PROJETOS
          </a>
        </div>
      </div>
    </section>
  );
};

const ProofSection = () => {
  return (
    <section className="py-24 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div 
          className="backdrop-blur-lg rounded-2xl p-12 md:p-16 border"
          style={{ 
            backgroundColor: 'rgba(18, 18, 18, 0.6)', 
            borderColor: 'rgba(245, 245, 245, 0.1)' 
          }}
        >
          <h2 
            className="text-center mb-16"
            style={{ 
              fontFamily: 'Montserrat, sans-serif', 
              fontWeight: 600,
              fontSize: '3rem',
              color: '#F5F5F5'
            }}
          >
            Alguns Resultados
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              {/* Ícone Line-art para Visualizações */}
              <div className="mb-6">
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#FFD700" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mx-auto"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <div 
                className="mb-3"
                style={{ 
                  fontSize: '3rem', 
                  fontWeight: 600, 
                  color: '#FFD700',
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                +150M
              </div>
              <div 
                className="mb-2"
                style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 600, 
                  color: '#F5F5F5',
                  fontFamily: 'Lato, sans-serif'
                }}
              >
                Visualizações Orgânicas
              </div>
              <div style={{ color: 'rgba(245, 245, 245, 0.7)', fontFamily: 'Lato, sans-serif' }}>
                Alcance total dos projetos
              </div>
            </div>
            
            <div className="text-center">
              {/* Ícone Line-art para Vídeos */}
              <div className="mb-6">
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#FFD700" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mx-auto"
                >
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
              </div>
              <div 
                className="mb-3"
                style={{ 
                  fontSize: '3rem', 
                  fontWeight: 600, 
                  color: '#FFD700',
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                +10
              </div>
              <div 
                className="mb-2"
                style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 600, 
                  color: '#F5F5F5',
                  fontFamily: 'Lato, sans-serif'
                }}
              >
                Vídeos acima de 1M
              </div>
              <div style={{ color: 'rgba(245, 245, 245, 0.7)', fontFamily: 'Lato, sans-serif' }}>
                Views por projeto
              </div>
            </div>
            
            <div className="text-center">
              {/* Ícone Line-art para Seguidores */}
              <div className="mb-6">
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#FFD700" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mx-auto"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div 
                className="mb-3"
                style={{ 
                  fontSize: '3rem', 
                  fontWeight: 600, 
                  color: '#FFD700',
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                100k
              </div>
              <div 
                className="mb-2"
                style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 600, 
                  color: '#F5F5F5',
                  fontFamily: 'Lato, sans-serif'
                }}
              >
                Seguidores em 4 meses
              </div>
              <div style={{ color: 'rgba(245, 245, 245, 0.7)', fontFamily: 'Lato, sans-serif' }}>
                De 0 a 100 mil
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTASection = () => {
  return (
    <section className="py-32 px-6 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 
          className="mb-12"
          style={{ 
            fontFamily: 'Montserrat, sans-serif', 
            fontWeight: 600,
            fontSize: '4rem',
            color: '#F5F5F5',
            lineHeight: '1.2'
          }}
        >
          Pronto para quebrar a internet?
        </h2>
        
        <a 
          href="#contato" 
          className="inline-block px-10 py-5 rounded-lg text-lg font-bold transition-all duration-300 backdrop-blur-sm border uppercase"
          style={{
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            borderColor: '#FFD700',
            color: '#FFD700',
            fontFamily: 'Lato, sans-serif',
            fontWeight: 700
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#FFD700';
            e.target.style.color = '#121212';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
            e.target.style.color = '#FFD700';
            e.target.style.transform = 'scale(1)';
          }}
        >
          VAMOS CONVERSAR
        </a>
      </div>
    </section>
  );
};

export default NewHomePage;
