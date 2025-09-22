import React from 'react';

export function NavbarEnhanced({ cta }) {
  return (
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
          href={cta}
          className="inline-flex items-center rounded-full border border-[#0A0A0A] px-4 py-2 text-sm font-medium hover:bg-[#0A0A0A] hover:text-white transition"
        >
          <span className="hidden md:inline">Comprar agora</span>
          <span className="md:hidden">Comprar</span>
        </a>
      </div>
    </nav>
  );
}
