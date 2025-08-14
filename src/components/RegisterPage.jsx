import React, { useState, useEffect } from "react";
import { auth, invitations } from "../lib/supabase_enhanced.jsx";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Loader2, UserPlus, ArrowLeft, CheckCircle } from "lucide-react";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("info");
  const [loading, setLoading] = useState(false);
  const [invitationToken, setInvitationToken] = useState("");
  const [invitationData, setInvitationData] = useState(null);
  const [step, setStep] = useState("validate"); // validate, register, success

  useEffect(() => {
    // Verificar se há um token de convite na URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      setInvitationToken(token);
      validateInvitation(token);
    } else {
      setStep("register");
    }
  }, []);

  const showMessage = (message, type = "info") => {
    setMsg(message);
    setMsgType(type);
    setTimeout(() => setMsg(""), 5000);
  };

  const validateInvitation = async (token) => {
    setLoading(true);
    try {
      const { data, error } = await invitations.validateToken(token);
      
      if (error || !data.success) {
        showMessage(data?.error || "Token de convite inválido", "error");
        setStep("register");
      } else {
        setInvitationData(data);
        setEmail(data.email);
        setStep("register");
        showMessage("Convite válido! Complete seu cadastro abaixo.", "success");
      }
    } catch (e) {
      showMessage("Erro ao validar convite", "error");
      setStep("register");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      showMessage("As senhas não coincidem", "error");
      return;
    }

    if (password.length < 6) {
      showMessage("A senha deve ter pelo menos 6 caracteres", "error");
      return;
    }

    setLoading(true);
    showMessage("Criando sua conta...", "info");
    
    try {
      const { data, error } = await auth.signUpWithPassword(
        email,
        password,
        { full_name: fullName }
      );
      
      if (error) {
        showMessage(error.message, "error");
      } else {
        setStep("success");
        showMessage("Conta criada com sucesso! Verifique seu email para confirmar.", "success");
      }
    } catch (e) {
      showMessage(e?.message || "Erro ao criar conta", "error");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    window.location.hash = '#/';
  };

  const goToLogin = () => {
    window.location.hash = '#/login';
  };

  if (step === "validate") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
              <p>Validando convite...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-green-700">Conta criada!</h2>
              <p className="text-gray-600">
                Sua conta foi criada com sucesso. Verifique seu email para confirmar 
                e depois faça login para acessar o curso.
              </p>
              <Button onClick={goToLogin} className="w-full bg-purple-600 hover:bg-purple-700">
                Ir para Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
            <CardDescription>
              {invitationData 
                ? "Complete seu cadastro para acessar o curso" 
                : "Registre-se para ter acesso ao Videos Craft IA"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {invitationData && (
              <Alert className="mb-4 border-green-500 text-green-700">
                <CheckCircle className="w-4 h-4" />
                <AlertDescription>
                  Você foi convidado para o curso! Complete o cadastro abaixo.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!!invitationData}
                  required
                />
                {invitationData && (
                  <p className="text-xs text-gray-500">
                    Email do convite (não pode ser alterado)
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Digite a senha novamente"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Criando conta...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Criar conta
                  </>
                )}
              </Button>
            </form>

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

            {/* Link para login */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Button
                  variant="link"
                  onClick={goToLogin}
                  className="text-purple-600 p-0 h-auto font-semibold"
                >
                  Faça login
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

