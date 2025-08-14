import React from 'react';
import { useAuth } from '../hooks/useAuthEnhanced.jsx';
import { Button } from './ui/button';
import { User, LogOut } from 'lucide-react';

export function NavbarEnhanced({ cta }) {
  const { user, profile, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.hash = '#/';
  };

  const goToLogin = () => {
    window.location.hash = '#/login';
  };

  const goToDashboard = () => {
    if (profile?.role === 'admin') {
      window.location.hash = '#/admin';
    } else {
      window.location.hash = '#/aluno';
    }
  };

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
        
        <div className="flex items-center gap-3">
          {user && profile ? (
            // Usuário logado
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToDashboard}
                className="hidden md:flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                {profile.role === 'admin' ? 'Admin' : 'Área do Aluno'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline ml-1">Sair</span>
              </Button>
            </div>
          ) : (
            // Usuário não logado
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="default"
                onClick={goToLogin}
                className="text-[#0A68FF] hover:bg-[#0A68FF]/10 px-3"
                aria-label="Login"
              >
                <User className="w-5 h-5" />
                <span className="ml-2">Login</span>
              </Button>
              
              <Button
                variant="outline"
                size="default"
                onClick={() => window.location.hash = '#/checkout'}
                className="border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition"
              >
                <span className="hidden md:inline">Garantir minha vaga</span>
                <span className="md:hidden">Comprar</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

