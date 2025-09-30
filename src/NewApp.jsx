import React, { useState, useEffect } from 'react';
import NewHomePage from './components/NewHomePage.jsx';
import ProjectsPage from './components/ProjectsPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import './App.css';
import './VideoBackground.css';

function NewApp() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Handle hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
    };

    // Set initial page based on hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'projetos':
        return <ProjectsPage />;
      case 'sobre':
        return <AboutPage />;
      case 'contato':
        return <ContactPage />;
      default:
        return <NewHomePage />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Global Navigation */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{ 
          backgroundColor: 'rgba(18, 18, 18, 0.2)', 
          borderColor: 'rgba(245, 245, 245, 0.1)' 
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigateTo('home')}
            className="font-bold text-xl transition-colors"
            style={{ 
              color: '#F5F5F5',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600
            }}
            onMouseEnter={(e) => e.target.style.color = '#FFD700'}
            onMouseLeave={(e) => e.target.style.color = '#F5F5F5'}
          >
            VideosCraftIA
          </button>
          
          <div className="hidden md:flex items-center gap-8 text-sm">
            <button
              onClick={() => navigateTo('projetos')}
              className="transition-colors relative"
              style={{ 
                color: currentPage === 'projetos' ? '#FFD700' : 'rgba(245, 245, 245, 0.9)',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 400
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 'projetos') {
                  e.target.style.color = '#FFD700';
                  e.target.style.textDecoration = 'underline';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 'projetos') {
                  e.target.style.color = 'rgba(245, 245, 245, 0.9)';
                  e.target.style.textDecoration = 'none';
                }
              }}
            >
              Projetos
            </button>
            <button
              onClick={() => navigateTo('sobre')}
              className="transition-colors relative"
              style={{ 
                color: currentPage === 'sobre' ? '#FFD700' : 'rgba(245, 245, 245, 0.9)',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 400
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 'sobre') {
                  e.target.style.color = '#FFD700';
                  e.target.style.textDecoration = 'underline';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 'sobre') {
                  e.target.style.color = 'rgba(245, 245, 245, 0.9)';
                  e.target.style.textDecoration = 'none';
                }
              }}
            >
              Sobre
            </button>
            <button
              onClick={() => navigateTo('contato')}
              className="transition-colors relative"
              style={{ 
                color: currentPage === 'contato' ? '#FFD700' : 'rgba(245, 245, 245, 0.9)',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 400
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 'contato') {
                  e.target.style.color = '#FFD700';
                  e.target.style.textDecoration = 'underline';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 'contato') {
                  e.target.style.color = 'rgba(245, 245, 245, 0.9)';
                  e.target.style.textDecoration = 'none';
                }
              }}
            >
              Contato
            </button>
          </div>
          
          <button
            onClick={() => navigateTo('contato')}
            className="px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm uppercase"
            style={{
              backgroundColor: '#FFD700',
              color: '#121212',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 700
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Vamos Conversar
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden px-6 pb-4">
          <div className="flex justify-center gap-6 text-sm">
            <button
              onClick={() => navigateTo('projetos')}
              className="transition-colors"
              style={{ 
                color: currentPage === 'projetos' ? '#FFD700' : 'rgba(245, 245, 245, 0.9)',
                fontFamily: 'Lato, sans-serif'
              }}
            >
              Projetos
            </button>
            <button
              onClick={() => navigateTo('sobre')}
              className="transition-colors"
              style={{ 
                color: currentPage === 'sobre' ? '#FFD700' : 'rgba(245, 245, 245, 0.9)',
                fontFamily: 'Lato, sans-serif'
              }}
            >
              Sobre
            </button>
            <button
              onClick={() => navigateTo('contato')}
              className="transition-colors"
              style={{ 
                color: currentPage === 'contato' ? '#FFD700' : 'rgba(245, 245, 245, 0.9)',
                fontFamily: 'Lato, sans-serif'
              }}
            >
              Contato
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer 
        className="backdrop-blur-md border-t py-12"
        style={{ 
          backgroundColor: 'rgba(18, 18, 18, 0.8)', 
          borderColor: 'rgba(245, 245, 245, 0.1)' 
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div 
              className="text-sm"
              style={{ 
                color: 'rgba(245, 245, 245, 0.7)',
                fontFamily: 'Lato, sans-serif'
              }}
            >
              © 2025 VideosCraftIA. Criando eventos culturais na internet.
            </div>
            
            <div className="flex items-center gap-8 text-sm">
              <a 
                href="https://www.tiktok.com/@euinelegivel" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-colors"
                style={{ 
                  color: 'rgba(245, 245, 245, 0.7)',
                  fontFamily: 'Lato, sans-serif'
                }}
                onMouseEnter={(e) => e.target.style.color = '#FFD700'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(245, 245, 245, 0.7)'}
              >
                TikTok
              </a>
              <a 
                href="https://www.instagram.com/unisc/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-colors"
                style={{ 
                  color: 'rgba(245, 245, 245, 0.7)',
                  fontFamily: 'Lato, sans-serif'
                }}
                onMouseEnter={(e) => e.target.style.color = '#FFD700'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(245, 245, 245, 0.7)'}
              >
                Instagram
              </a>
              <a 
                href="https://www.youtube.com/@euinelegivel" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-colors"
                style={{ 
                  color: 'rgba(245, 245, 245, 0.7)',
                  fontFamily: 'Lato, sans-serif'
                }}
                onMouseEnter={(e) => e.target.style.color = '#FFD700'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(245, 245, 245, 0.7)'}
              >
                YouTube
              </a>
            </div>
          </div>
          
          <div 
            className="mt-8 pt-8 border-t text-center text-xs"
            style={{ borderColor: 'rgba(245, 245, 245, 0.1)' }}
          >
            <p style={{ 
              color: 'rgba(245, 245, 245, 0.5)',
              fontFamily: 'Lato, sans-serif',
              lineHeight: '1.6'
            }}>
              Transformando ideias em momentos virais • Estratégias que quebram a internet • 
              Resultados que falam por si
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default NewApp;
