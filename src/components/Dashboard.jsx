import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { db, database } from "../lib/supabase.jsx";

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    (async () => {
      if (!user) { setStatus("inactive"); return; }
      
      try {
        const { data, error } = await database.checkEnrollment(user.id);
        if (error || !data) { 
          setStatus("inactive"); 
          return; 
        }
        setStatus(data.status === "active" ? "active" : "inactive");
      } catch (error) {
        console.error('Erro ao verificar matrícula:', error);
        setStatus("inactive");
      }
    })();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <section className="min-h-screen p-6 max-w-3xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Área do Aluno</h1>
        <button onClick={handleSignOut} className="text-sm underline">Sair</button>
      </header>

      <div className="rounded-2xl border p-4">
        {status === "loading" && <p>Checando sua assinatura...</p>}
        {status === "active" && <p className="text-green-700">✅ Assinatura ativa — acesso liberado.</p>}
        {status === "inactive" && (
          <div>
            <p className="mb-2">⚠️ Assinatura não encontrada ou inativa.</p>
            <a href="#/checkout" className="inline-block rounded-xl px-4 py-2 bg-black text-white">Assinar agora</a>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-4">
        <a href="#/curso" className="block rounded-2xl border p-4 hover:shadow">
          <h2 className="font-semibold">Módulos e Aulas</h2>
          <p className="text-sm opacity-70">Acesse suas aulas quando estiverem liberadas.</p>
        </a>
      </div>
    </section>
  );
}

