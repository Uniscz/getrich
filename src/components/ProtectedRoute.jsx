import React from 'react';
import { useAuth } from '../hooks/useAuthEnhanced.jsx';
import { Loader2, Lock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

export function ProtectedRoute({ children, requiredRole = null, fallbackPath = '#/login' }) {
  const { user, profile, loading } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-600" />
              <p className="text-gray-600">Verificando acesso...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Usuário não autenticado
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Lock className="w-16 h-16 text-red-500 mx-auto" />
              <h2 className="text-2xl font-bold text-red-700">Acesso Restrito</h2>
              <p className="text-gray-600">
                Você precisa estar logado para acessar esta página.
              </p>
              <Button 
                onClick={() => window.location.hash = fallbackPath}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Fazer Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Verificar role específico se necessário
  if (requiredRole && profile?.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Lock className="w-16 h-16 text-orange-500 mx-auto" />
              <h2 className="text-2xl font-bold text-orange-700">Acesso Negado</h2>
              <p className="text-gray-600">
                Você não tem permissão para acessar esta página.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={() => window.location.hash = profile?.role === 'admin' ? '#/admin' : '#/aluno'}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Ir para minha área
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.hash = '#/'}
                  className="w-full"
                >
                  Voltar ao início
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Usuário autenticado e com permissão adequada
  return children;
}

