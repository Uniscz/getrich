import React, { useRef, useEffect, useState } from 'react';

const FullscreenVideoBackground = ({ children }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Configurar vídeo com som ativado
      video.muted = false;
      video.volume = 0.5; // Volume médio
      
      // Tentar reproduzir o vídeo com som
      const playVideo = async () => {
        try {
          await video.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay com som bloqueado pelo navegador:', error);
          // Se falhar com som, tenta sem som primeiro
          video.muted = true;
          setIsMuted(true);
          try {
            await video.play();
            setIsPlaying(true);
            // Mostrar controles para o usuário ativar o som
            setShowControls(true);
          } catch (mutedError) {
            console.log('Erro ao reproduzir vídeo:', mutedError);
            setIsPlaying(false);
          }
        }
      };

      playVideo();

      // Event listener para interação do usuário ativar som
      const handleUserInteraction = () => {
        if (video.muted) {
          video.muted = false;
          video.volume = 0.5;
          setIsMuted(false);
        }
      };

      // Adicionar listeners apenas uma vez
      document.addEventListener('click', handleUserInteraction, { once: true });
      document.addEventListener('touchstart', handleUserInteraction, { once: true });

      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      };
    }
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Vídeo de fundo fullscreen */}
      <video
        ref={videoRef}
        className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
        autoPlay
        loop
        playsInline
        preload="auto"
      >
        <source src="/video.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>

      {/* Overlay escuro para melhorar legibilidade */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-[-1]" />

      {/* Conteúdo da aplicação */}
      <div className="relative z-10 content-fade-in">
        {children}
      </div>

      {/* Controles de vídeo */}
      {showControls && (
        <div className="fixed bottom-4 right-4 z-50 flex gap-2">
          {/* Botão de som */}
          <button
            onClick={toggleMute}
            className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-105"
            title={isMuted ? "Ativar som" : "Desativar som"}
          >
            {isMuted ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.146 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.146l4.237-3.793zm7.824 9.17a1 1 0 01-1.414 1.414L14 12.414l-1.793 1.793a1 1 0 01-1.414-1.414L12.586 11l-1.793-1.793a1 1 0 011.414-1.414L14 9.586l1.793-1.793a1 1 0 011.414 1.414L15.414 11l1.793 1.793z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.146 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.146l4.237-3.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.414A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Botão de play/pause */}
          <button
            onClick={togglePlay}
            className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-105"
            title={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Botão para esconder controles */}
          <button
            onClick={() => setShowControls(false)}
            className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-105"
            title="Esconder controles"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
          </button>
        </div>
      )}

      {/* Botão para mostrar controles quando escondidos */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="fixed bottom-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-105"
          title="Mostrar controles"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default FullscreenVideoBackground;
