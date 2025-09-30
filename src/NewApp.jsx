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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigateTo('home')}
            className="font-bold text-xl text-white hover:text-yellow-400 transition-colors"
          >
            VideosCraftIA
          </button>
          
          <div className="hidden md:flex items-center gap-8 text-sm text-white/90">
            <button
              onClick={() => navigateTo('projetos')}
              className={`hover:text-white transition-colors ${
                currentPage === 'projetos' ? 'text-yellow-400' : ''
              }`}
            >
              Projetos
            </button>
            <button
              onClick={() => navigateTo('sobre')}
              className={`hover:text-white transition-colors ${
                currentPage === 'sobre' ? 'text-yellow-400' : ''
              }`}
            >
              Sobre
            </button>
            <button
              onClick={() => navigateTo('contato')}
              className={`hover:text-white transition-colors ${
                currentPage === 'contato' ? 'text-yellow-400' : ''
              }`}
            >
              Contato
            </button>
          </div>
          
          <button
            onClick={() => navigateTo('contato')}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm"
          >
            Vamos Conversar
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden px-4 pb-4">
          <div className="flex justify-center gap-6 text-sm text-white/90">
            <button
              onClick={() => navigateTo('projetos')}
              className={`hover:text-white transition-colors ${
                currentPage === 'projetos' ? 'text-yellow-400' : ''
              }`}
            >
              Projetos
            </button>
            <button
              onClick={() => navigateTo('sobre')}
              className={`hover:text-white transition-colors ${
                currentPage === 'sobre' ? 'text-yellow-400' : ''
              }`}
            >
              Sobre
            </button>
            <button
              onClick={() => navigateTo('contato')}
              className={`hover:text-white transition-colors ${
                currentPage === 'contato' ? 'text-yellow-400' : ''
              }`}
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
      <footer className="bg-black/80 backdrop-blur-md border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/70 text-sm">
              © 2025 VideosCraftIA. Criando eventos culturais na internet.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-white/70">
              <a href="https://www.tiktok.com/@euinelegivel" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                TikTok
              </a>
              <a href="https://www.instagram.com/unisc/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="https://www.youtube.com/@euinelegivel" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                YouTube
              </a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10 text-center text-white/50 text-xs">
            <p>
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
