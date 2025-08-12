import React, { useEffect } from "react";

const CHECKOUT_URL = "https://www.asaas.com/c/sf24e6hym93upjk6";

export function CheckoutPage() {
  useEffect(() => {
    const t = setTimeout(() => { window.open(CHECKOUT_URL, "_blank"); }, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Assinar o curso</h1>
      <p className="text-sm opacity-70 mb-4">Ao finalizar o pagamento, seu acesso é liberado automaticamente (quando ativarmos o webhook).</p>
      <a href={CHECKOUT_URL} target="_blank" rel="noopener" className="inline-block rounded-xl px-4 py-3 bg-black text-white font-semibold">
        Ir para o checkout
      </a>
      <p className="text-xs opacity-60 mt-3">Se não abrir, clique no botão acima.</p>
    </section>
  );
}

