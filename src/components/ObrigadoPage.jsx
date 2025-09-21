import React, { useState, useEffect } from 'react';
import { CheckCircle, Download, Clock, AlertCircle } from 'lucide-react';

export function ObrigadoPage() {
  const [paymentId, setPaymentId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('checking'); // checking, confirmed, pending, failed
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    // Extrair payment.id da URL
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const pid = urlParams.get('pid');
    
    if (pid) {
      setPaymentId(pid);
      checkPaymentStatus(pid);
    }
  }, []);

  const checkPaymentStatus = async (pid) => {
    try {
      // Verificar status do pagamento
      const response = await fetch(`/api/payment-status/${pid}`);
      const data = await response.json();
      
      if (data.status === 'confirmed' && data.downloadUrl) {
        setPaymentStatus('confirmed');
        setDownloadUrl(data.downloadUrl);
        
        // Calcular tempo restante se houver expiração
        if (data.expiresAt) {
          const expiry = new Date(data.expiresAt);
          const now = new Date();
          const remaining = Math.max(0, expiry - now);
          setTimeRemaining(remaining);
          
          // Atualizar contador a cada segundo
          const interval = setInterval(() => {
            const now = new Date();
            const remaining = Math.max(0, expiry - now);
            setTimeRemaining(remaining);
            
            if (remaining <= 0) {
              clearInterval(interval);
              setDownloadUrl(null);
            }
          }, 1000);
          
          return () => clearInterval(interval);
        }
      } else if (data.status === 'pending') {
        setPaymentStatus('pending');
        // Verificar novamente em 5 segundos
        setTimeout(() => checkPaymentStatus(pid), 5000);
      } else {
        setPaymentStatus('failed');
      }
    } catch (error) {
      console.error('Erro ao verificar pagamento:', error);
      setPaymentStatus('failed');
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {paymentStatus === 'checking' && (
          <>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Verificando pagamento...
            </h1>
            <p className="text-gray-600 mb-6">
              Aguarde enquanto confirmamos seu pagamento.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </>
        )}

        {paymentStatus === 'pending' && (
          <>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Pagamento pendente
            </h1>
            <p className="text-gray-600 mb-6">
              Seu pagamento ainda está sendo processado. Você receberá o acesso assim que for confirmado.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                Verificando automaticamente a cada 5 segundos...
              </p>
            </div>
          </>
        )}

        {paymentStatus === 'confirmed' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Pagamento confirmado!
            </h1>
            <p className="text-gray-600 mb-6">
              Obrigado pela sua compra! Seu curso está pronto para download.
            </p>
            
            {downloadUrl && (
              <div className="space-y-4">
                <button
                  onClick={handleDownload}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Baixar PDF do Curso
                </button>
                
                {timeRemaining && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 mb-2">
                      ⏰ Link expira em: <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
                    </p>
                    <p className="text-xs text-blue-600">
                      Faça o download agora para garantir o acesso ao material.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {paymentStatus === 'failed' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Erro na verificação
            </h1>
            <p className="text-gray-600 mb-6">
              Não foi possível verificar seu pagamento. Entre em contato conosco se o problema persistir.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                ID do Pagamento: <span className="font-mono">{paymentId}</span>
              </p>
            </div>
          </>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Videos Craft IA - Curso de Criação de Vídeos com IA
          </p>
        </div>
      </div>
    </div>
  );
}
