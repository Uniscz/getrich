import React, { useState, useEffect } from "react";

export function WelcomePage() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Configurações do Asaas
  const CHECKOUT_URL = "https://www.asaas.com/c/sf24e6hym93upjk6";

  const handlePurchase = () => {
    setIsLoading(true);
    // Redirecionar para o checkout do Asaas na mesma janela
    window.location.href = CHECKOUT_URL;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header simples */}
      <nav className="border-b border-black/10">
        <div className="mx-auto max-w-4xl px-4 md:px-6 h-16 flex items-center justify-between">
          <a href="#/" className="font-semibold text-lg tracking-tight">
            <span>Videos</span> <span>Craft</span>{" "}
            <span className="text-[#0A68FF]">IA</span>
          </a>
          <a href="#/" className="text-sm text-black/60 hover:text-black">
            ← Voltar
          </a>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            🎉 Bem-vindo ao Videos Craft IA!
          </h1>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Você está prestes a adquirir o curso mais completo de criação de vídeos com IA. 
            Prepare-se para dominar as ferramentas que estão revolucionando a criação de conteúdo.
          </p>
        </div>

        {/* Card do produto */}
        <div className="bg-white border border-black/10 rounded-2xl p-8 mb-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Videos Craft IA - Curso Completo</h2>
              <div className="space-y-3 text-sm text-black/70 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Pipeline completo: do roteiro à cena final
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Deepfake & Lip-sync profissional
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Assinatura visual consistente
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Estratégias de viralização e conversão
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Acesso vitalício + atualizações
                </div>
              </div>
              
              <div className="border-t border-black/10 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-black/60">Valor do curso:</span>
                  <span className="text-2xl font-bold text-[#0A68FF]">R$ 119,90</span>
                </div>
                <div className="text-xs text-black/50">
                  Pagamento único • Sem mensalidades • Garantia de 7 dias
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="font-semibold mb-2">Oferta Especial</h3>
                <p className="text-sm text-black/70">
                  Pré-venda com vagas limitadas. Garante sua vaga agora e tenha acesso imediato após o pagamento.
                </p>
              </div>
              
              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className="w-full bg-[#0A68FF] text-white rounded-full py-4 px-8 font-semibold text-lg hover:brightness-110 transition disabled:opacity-50"
              >
                {isLoading ? "Redirecionando..." : "Garantir Minha Vaga Agora"}
              </button>
              
              <p className="text-xs text-black/50 mt-3">
                Você será redirecionado para o checkout seguro do Asaas
              </p>
            </div>
          </div>
        </div>

        {/* Garantias */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="font-medium mb-1">Pagamento Seguro</h4>
            <p className="text-sm text-black/60">Processado pelo Asaas, plataforma líder em pagamentos</p>
          </div>
          <div className="p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-medium mb-1">Acesso Imediato</h4>
            <p className="text-sm text-black/60">Liberação automática após confirmação do pagamento</p>
          </div>
          <div className="p-4">
            <div className="text-2xl mb-2">🛡️</div>
            <h4 className="font-medium mb-1">Garantia Total</h4>
            <p className="text-sm text-black/60">7 dias para testar. Não gostou? Devolvemos seu dinheiro</p>
          </div>
        </div>
      </div>
    </div>
  );
}

