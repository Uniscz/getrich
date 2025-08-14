import React, { useState } from "react";
import { useAuth } from "../hooks/useAuthEnhanced.jsx";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Loader2, Mail, Lock, ArrowLeft } from "lucide-react";

export function LoginPageEnhanced() {
  const { signIn, signInWithPassword, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("info"); // info, success, error
  const [activeTab, setActiveTab] = useState("password");

  // Link de checkout do Asaas
  const CHECKOUT_URL = "https://www.asaas.com/c/sf24e6hym93upjk6";

  const showMessage = (message, type = "info") => {
    setMsg(message);
    setMsgType(type);
    setTimeout(() => setMsg(""), 5000);
  };

  const onMagicLinkSubmit = async (e) => {
    e.preventDefault();
    showMessage("Enviando link mágico...", "info");
    
    try {
      const { error } = await signIn(email);
      if (error) {
        showMessage(error.message, "error");
      } else {
        showMessage("Link enviado! Verifique seu email.", "success");
        // Opcional: abrir checkout
        setTimeout(() => {
          window.open(CHECKOUT_URL, "_blank");
        }, 1000);
      }
    } catch (e) {
      showMessage(e?.message || "Erro ao enviar link.", "error");
    }
  };

  const onPasswordSubmit = async (e) => {
    e.preventDefault();
    showMessage("Fazendo login...", "info");
    
    try {
      const { error } = await signInWithPassword(email, password);
      if (error) {
        showMessage(error.message, "error");
      } else {
        showMessage("Login realizado com sucesso!", "success");
        // Redirecionar será feito automaticamente pelo useAuth
      }
    } catch (e) {
      showMessage(e?.message || "Erro ao fazer login.", "error");
    }
  };

  const goBack = () => {
    window.location.hash = '#/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Botão Voltar */}
        <Button
          variant="ghost"
          onClick={goBack}
          className="mb-4 text-white hover:text-gray-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Acesse sua conta</CardTitle>
            <CardDescription>
              Entre para acessar o curso Videos Craft IA
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Email e Senha
                </TabsTrigger>
                <TabsTrigger value="magic-link" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Link Mágico
                </TabsTrigger>
              </TabsList>

              {/* Tab: Password */}
              <TabsContent value="password" className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Entre com seu email e senha cadastrados.
                  </p>
                </div>
                
                <form onSubmit={onPasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-password">Email</Label>
                    <Input
                      id="email-password"
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
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Entrar
                      </>
                    )}
                  </Button>
                </form>
                
                <div className="text-center">
                  <Button
                    variant="link"
                    onClick={() => setActiveTab("magic-link")}
                    className="text-sm text-purple-600"
                  >
                    Esqueceu a senha? Use o link mágico
                  </Button>
                </div>
              </TabsContent>

              {/* Tab: Magic Link */}
              <TabsContent value="magic-link" className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Insira seu email e receba um link para acessar o curso.
                  </p>
                  <p className="text-sm font-semibold text-purple-600">
                    Valor: R$ 119,90 (pagamento único)
                  </p>
                </div>
                
                <form onSubmit={onMagicLinkSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-magic">Email</Label>
                    <Input
                      id="email-magic"
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Enviar Link Mágico
                      </>
                    )}
                  </Button>
                </form>
                
                <p className="text-xs text-gray-500 text-center">
                  Após clicar em enviar, abriremos o checkout para completar o pagamento.
                </p>
              </TabsContent>
            </Tabs>

            {/* Mensagens */}
            {msg && (
              <Alert className={`mt-4 ${
                msgType === 'error' ? 'border-red-500 text-red-700' :
                msgType === 'success' ? 'border-green-500 text-green-700' :
                'border-blue-500 text-blue-700'
              }`}>
                <AlertDescription>{msg}</AlertDescription>
              </Alert>
            )}

            {/* Link para registro */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Button
                  variant="link"
                  onClick={() => window.location.hash = '#/registro'}
                  className="text-purple-600 p-0 h-auto font-semibold"
                >
                  Registre-se aqui
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

