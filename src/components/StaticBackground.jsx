import React from 'react';

const StaticBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fundo estático com gradiente */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-[-1]"
        style={{
          background: `
            linear-gradient(135deg, 
              #121212 0%, 
              #1a1a1a 25%, 
              #0f0f0f 50%, 
              #1a1a1a 75%, 
              #121212 100%
            )
          `
        }}
      />

      {/* Conteúdo da aplicação */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default StaticBackground;
