import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { supabase } from "../lib/supabase.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function LoginPage() {
  const { signIn, signInWithPassword, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState("password");

  // Link de checkout do Asaas. Altere para o link real quando estiver disponível.
  const CHECKOUT_URL = "https://www.asaas.com/c/sf24e6hym93upjk6";

  const onSubmitMagicLink = async (e) => {
    e.preventDefault();
    setMsg("Enviando link...");
    try {
      await signIn(email);
      // Após enviar o magic link, mostre mensagem e abra o checkout em uma nova guia
      setMsg("Link enviado! Abrindo checkout...");
      setTimeout(() => {
        window.open(CHECKOUT_URL, "_blank");
      }, 300);
    } catch (e) {
      setMsg(e?.message || "Erro ao enviar link.");
    }
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    setMsg("Fazendo login...");
    try {
      const { data, error } = await signInWithPassword(email, password);
      
      if (error) throw error;
      
      setMsg("Login realizado com sucesso!");
      // Redirecionar baseado no perfil do usuário
      if (data?.user) {
        // Aguardar um pouco para o perfil carregar
        setTimeout(() => {
          window.location.hash = '#/aluno';
        }, 1000);
      }
    } catch (e) {
      setMsg(e?.message || "Erro ao fazer login.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <button 
            onClick={() => window.location.hash = '#/'}
            className="inline-flex items-center text-white/70 hover:text-white mb-4"
          >
            ← Voltar
          </button>
        </div>

        <Card className="bg-white/95 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle>Acesse sua conta</CardTitle>
            <CardDescription>Entre para acessar o curso Videos Craft IA</CardDescription>
            <p className="text-sm font-semibold text-purple-600">Valor: R$ 119,90 (pagamento único)</p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="password">Email e Senha</TabsTrigger>
                <TabsTrigger value="magic">Link Mágico</TabsTrigger>
              </TabsList>
              
              <TabsContent value="password" className="space-y-4">
                <p className="text-sm text-gray-600">Faça login com seu email e senha.</p>
                <form onSubmit={onSubmitPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    Fazer Login
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="magic" className="space-y-4">
                <p className="text-sm text-gray-600">Insira seu email e receba um link para acessar o curso.</p>
                <form onSubmit={onSubmitMagicLink} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="magic-email">Email</Label>
                    <Input
                      id="magic-email"
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    Enviar Link Mágico
                  </Button>
                </form>
                <p className="text-xs text-gray-500">
                  Após clicar em email, abriremos o checkout para completar o pagamento.
                </p>
              </TabsContent>
            </Tabs>
            
            {msg && (
              <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
                {msg}
              </div>
            )}
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <button 
                  onClick={() => window.location.hash = '#/checkout'}
                  className="text-purple-600 hover:underline"
                >
                  Registre-se aqui
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

