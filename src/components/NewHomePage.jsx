import React, { useRef, useEffect, useState } from 'react';
import FullscreenVideoBackground from './FullscreenVideoBackground.jsx';

const NewHomePage = () => {
  return (
    <FullscreenVideoBackground>
      <div className="min-h-screen text-white">
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
    <section className="min-h-screen flex items-center justify-center px-4 md:px-6 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Título Principal */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 text-shadow-lg">
          Eu não faço vídeos.
          <br />
          <span className="text-yellow-400">Eu crio eventos culturais</span>
          <br />
          na internet.
        </h1>
        
        {/* Subtítulo */}
        <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
          Sua marca não precisa de mais um post. 
          <br />
          Ela precisa de um <strong>momento inesquecível</strong>.
        </p>
        
        {/* CTA Principal */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#projetos" 
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-full text-lg font-bold transition-all duration-200 hover:scale-105 shadow-2xl"
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
    <section className="py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Alguns Resultados
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                🚀 +150M
              </div>
              <div className="text-lg font-semibold text-white mb-1">
                Visualizações Orgânicas
              </div>
              <div className="text-white/70">
                Alcance total dos projetos
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                🔥 +10
              </div>
              <div className="text-lg font-semibold text-white mb-1">
                Vídeos acima de 1M
              </div>
              <div className="text-white/70">
                Views por projeto
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                👥 100k
              </div>
              <div className="text-lg font-semibold text-white mb-1">
                Seguidores em 4 meses
              </div>
              <div className="text-white/70">
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
    <section className="py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
          Pronto para quebrar a internet?
        </h2>
        
        <a 
          href="#contato" 
          className="inline-block bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-white/20"
        >
          VAMOS CONVERSAR
        </a>
      </div>
    </section>
  );
};

export default NewHomePage;
