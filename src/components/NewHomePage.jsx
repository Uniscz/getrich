import React, { useRef, useEffect, useState } from 'react';
import StaticBackground from './StaticBackground.jsx';

const NewHomePage = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <StaticBackground>
      <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
        {/* Navbar */}
        <Navbar />
        
        {/* Hero Section */}
        <HeroSection showVideoModal={showVideoModal} setShowVideoModal={setShowVideoModal} />
        
        {/* Proof Section */}
        <ProofSection />
        
        {/* Final CTA */}
        <FinalCTASection />
        
        {/* Modal do Showreel */}
        <VideoModal showVideoModal={showVideoModal} setShowVideoModal={setShowVideoModal} />
      </div>
    </StaticBackground>
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

const HeroSection = ({ showVideoModal, setShowVideoModal }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-8 pt-24 pb-16">
      <div className="max-w-5xl mx-auto text-center">
        {/* Título Principal */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight mb-12 text-shadow-lg"
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
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed px-4"
          style={{ 
            fontFamily: 'Lato, sans-serif',
            color: '#F5F5F5',
            lineHeight: '1.7',
            marginBottom: '4rem'
          }}
        >
          Sua marca não precisa de mais um post. 
          <br />
          Ela precisa de um <strong>momento inesquecível</strong>.
        </p>
        
        {/* Botão do Showreel */}
        <div className="mb-12">
          <button
            onClick={() => setShowVideoModal(true)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 backdrop-blur-sm border-2 uppercase"
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
            <span>▶️</span>
            ASSISTIR AO MEU SHOWREEL
          </button>
        </div>
        
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
            className="text-center mb-16 text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-4"
            style={{ 
              fontFamily: 'Montserrat, sans-serif', 
              fontWeight: 600,
              color: '#F5F5F5'
            }}
          >
            Alguns Resultados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
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
          className="mb-12 text-2xl sm:text-3xl md:text-4xl lg:text-6xl px-4"
          style={{ 
            fontFamily: 'Montserrat, sans-serif', 
            fontWeight: 600,
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

const VideoModal = ({ showVideoModal, setShowVideoModal }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (showVideoModal && videoRef.current) {
      videoRef.current.play();
    }
  }, [showVideoModal]);

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowVideoModal(false);
  };

  if (!showVideoModal) return null;

  return (
<div 
      className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      style={{ zIndex: 9999 }}
      onClick={closeModal}
    >
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center p-4">
        {/* Botão de fechar elegante e discreto */}
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 w-10 h-10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'rgba(245, 245, 245, 0.8)',
            zIndex: 10000
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
            e.target.style.borderColor = '#FFD700';
            e.target.style.color = '#FFD700';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.target.style.color = 'rgba(245, 245, 245, 0.8)';
          }}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* Vídeo */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain rounded-lg"
          controls
          controlsList="nodownload"
          autoPlay
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.preventDefault()}
        >
          <source src="/video.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
      </div>
    </div>
  );
};
