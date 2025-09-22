import React, { useEffect, useState } from 'react';

export function AsaasReturnDetector({ onPaymentDetected }) {
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    // Verificar se o usuário veio do Asaas
    const checkAsaasReturn = () => {
      const referrer = document.referrer;
      const hasAsaasReferrer = referrer && referrer.includes('asaas.com');
      
      // Verificar se há dados de pagamento no localStorage do Asaas
      const asaasData = localStorage.getItem('asaas_payment_data');
      
      // Verificar se a URL tem parâmetros que indicam retorno de pagamento
      const urlParams = new URLSearchParams(window.location.search);
      const hasPaymentParams = urlParams.has('payment_id') || urlParams.has('transaction_id');
      
      console.log('Verificando retorno do Asaas:', {
        referrer,
        hasAsaasReferrer,
        asaasData,
        hasPaymentParams,
        currentUrl: window.location.href
      });

      if (hasAsaasReferrer || asaasData || hasPaymentParams) {
        setIsChecking(true);
        
        // Tentar obter o payment ID de diferentes fontes
        let paymentId = null;
        
        // 1. Tentar pegar da URL
        paymentId = urlParams.get('payment_id') || urlParams.get('transaction_id');
        
        // 2. Tentar pegar do localStorage
        if (!paymentId && asaasData) {
          try {
            const data = JSON.parse(asaasData);
            paymentId = data.payment_id || data.id;
          } catch (e) {
            console.error('Erro ao parsear dados do Asaas:', e);
          }
        }
        
        // 3. Se não encontrou, buscar pagamentos recentes
        if (!paymentId) {
          searchRecentPayments();
        } else {
          onPaymentDetected(paymentId);
        }
      }
    };

    // Buscar pagamentos recentes (últimos 5 minutos)
    const searchRecentPayments = async () => {
      try {
        // Fazer uma busca nos logs do webhook para encontrar pagamentos recentes
        const response = await fetch('/api/recent-payments');
        if (response.ok) {
          const data = await response.json();
          if (data.recentPayment) {
            onPaymentDetected(data.recentPayment.id);
          } else {
            // Se não encontrou, mostrar opção manual
            showManualInput();
          }
        } else {
          showManualInput();
        }
      } catch (error) {
        console.error('Erro ao buscar pagamentos recentes:', error);
        showManualInput();
      }
    };

    const showManualInput = () => {
      const paymentId = prompt(
        'Não conseguimos detectar automaticamente seu pagamento.\n\n' +
        'Por favor, digite o ID do seu pagamento (você pode encontrar no e-mail de confirmação ou na fatura):'
      );
      
      if (paymentId && paymentId.trim()) {
        onPaymentDetected(paymentId.trim());
      } else {
        setIsChecking(false);
      }
    };

    // Executar verificação após um pequeno delay
    const timer = setTimeout(checkAsaasReturn, 1000);
    
    return () => clearTimeout(timer);
  }, [onPaymentDetected]);

  if (isChecking) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Detectando seu pagamento...
          </h2>
          <p className="text-gray-600">
            Aguarde enquanto verificamos seu pagamento no Asaas.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
