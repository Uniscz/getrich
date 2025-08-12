import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";

export function LoginPage() {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  // Link de checkout do Asaas. Altere para o link real quando estiver disponível.
  const CHECKOUT_URL = "https://www.asaas.com/c/sf24e6hym93upjk6";

  const onSubmit = async (e) => {
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

  return (
    <section className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">Garanta sua vaga</h1>
        <p className="text-sm opacity-70 mb-1">Insira seu e-mail abaixo. Você receberá um link mágico para acessar o curso.</p>
        <p className="text-sm font-semibold mb-4">Valor: R$ 199,00 (pagamento único)</p>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="seuemail@exemplo.com"
            className="w-full border rounded-xl p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full rounded-xl p-3 font-semibold bg-black text-white" disabled={loading}>Enviar link</button>
        </form>
        <p className="text-sm mt-3">{msg}</p>
        <p className="text-xs mt-2 opacity-60">Após clicar em enviar, abriremos o checkout em uma nova guia. Complete o pagamento para liberar o acesso.</p>
      </div>
    </section>
  );
}

