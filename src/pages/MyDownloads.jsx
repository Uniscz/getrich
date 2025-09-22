import React, { useState } from 'react';

function MyDownloads() {
  const [query, setQuery] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setPayments([]);

    try {
      const response = await fetch(`/api/find-payments?query=${query}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Erro ao buscar pagamentos');
      }

      setPayments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meus Downloads</h1>
      <p className="mb-4">Insira seu CPF/CNPJ ou e-mail para encontrar seus downloads.</p>

      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 rounded-l w-full"
          placeholder="CPF/CNPJ ou E-mail"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">Erro: {error}</p>}

      {payments.length > 0 && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Pagamentos Encontrados:</h2>
          <ul>
            {payments.map((payment) => (
              <li key={payment.paymentId} className="mb-2 p-2 border-b last:border-b-0">
                <p><strong>ID do Pagamento:</strong> {payment.paymentId}</p>
                <p><strong>Status:</strong> {payment.status}</p>
                {payment.status === 'confirmed' && (
                  <a
                    href={`/api/payment-status/${payment.paymentId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Ver Detalhes e Link de Download
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {payments.length === 0 && !loading && !error && query && (
        <p className="text-gray-600">Nenhum pagamento encontrado para a busca.</p>
      )}
    </div>
  );
}

export default MyDownloads;


