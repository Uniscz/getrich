_content_


// API para buscar pagamentos por CPF/CNPJ ou e-mail
// Este arquivo deve ser deployado como uma função serverless no Vercel

import { createClient } from 'redis';

// Configuração do Redis
const redis = createClient({
  url: process.env.REDIS_URL
});

// Conectar ao Redis
async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
  return redis;
}

export default async function handler(req, res) {
  // Permitir apenas GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'CPF/CNPJ ou e-mail é obrigatório' });
    }

    console.log('Buscando pagamentos para:', query);

    // Conectar ao Redis
    const redisClient = await connectRedis();

    // Buscar todas as chaves de pagamento
    const paymentKeys = await redisClient.keys('payment:*');

    if (!paymentKeys || paymentKeys.length === 0) {
      return res.status(404).json({ message: 'Nenhum pagamento encontrado' });
    }

    // Buscar os dados de cada pagamento
    const payments = await redisClient.mGet(paymentKeys);

    // Filtrar os pagamentos que correspondem à consulta
    const matchingPayments = payments
      .map(paymentStr => JSON.parse(paymentStr))
      .filter(paymentData => 
        paymentData.customerEmail === query || paymentData.customerCpfCnpj === query
      );

    if (matchingPayments.length === 0) {
      return res.status(404).json({ message: 'Nenhum pagamento encontrado para este CPF/CNPJ ou e-mail' });
    }

    // Retornar os pagamentos encontrados
    return res.status(200).json(matchingPayments);

  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
}

// Configuração para o Vercel
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}


